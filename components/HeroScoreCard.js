import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import NeoIcon from './NeoIcon';
import CompactActiveMonitor from './CompactActiveMonitor';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { useIsDark } from '../utils/ThemeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HeroScoreCard({ scoreData, onPress, heroHeadline, isExpanded = false, scoreMessage = {} }) {
    const { t } = useTranslation();
    const isDark = useIsDark();
    const animValue = useRef(new Animated.Value(0)).current;

    const score = scoreData?.geral || 0;
    const pendencias = scoreData?.pendencias || 0;
    
    // Calcula quantos ambientes estão com score 100% ou sem riscos.
    const totalAmbientes = Object.keys(scoreData?.ambientes || {}).length;
    const ambientesOk = Math.max(0, totalAmbientes - (pendencias > 0 ? 1 : 0)); // Simplificação visual rápida
    
    const circumference = 2 * Math.PI * 38; // radius = 38
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Cores Dinâmicas
    const getRingColor = () => {
        if (score >= 80) return '#6EE7B7'; // Verde Claro
        if (score >= 50) return '#FCD34D'; // Amarelo/Laranja Claro
        return '#FCA5A5'; // Vermelho Claro
    };

    const getBgColor = () => {
        // Usa as cores do tile cerâmico da Home (warm cream/ivory) no modo claro
        return isDark ? [Neo.colors.neutral[800], Neo.colors.neutral[900]] : ['#FCFBF8', '#F4F2EC'];
    };

    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const textMuted = isDark ? '#A1A1AA' : Neo.colors.neutral[600];
    const badgeBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
    const badgeBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const ringTrack = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
    const cardBorderColor = isDark ? 'rgba(255,255,255,0.1)' : Neo.colors.primary[800];

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
            <LinearGradient
                colors={getBgColor()}
                style={[styles.card, { borderColor: cardBorderColor, borderWidth: isDark ? 1 : 1.5 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.topRow}>
                    <Text style={[styles.topLabel, { color: textMuted }]}>
                        {score >= 80 ? t('home.heroControl', 'CASA SOB CONTROLE') : 
                         score >= 50 ? t('home.heroAttention', 'ATENÇÃO NECESSÁRIA') : 
                         t('home.heroAct', 'AJA IMEDIATAMENTE')}
                    </Text>
                    <NeoIcon name="ArrowDown2" size={14} color={textMuted} style={{ opacity: 0.7, transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }} />
                </View>

                <View style={styles.mainRow}>
                    {/* Lado Esquerdo: Anel */}
                    <View style={styles.ringContainer}>
                        <Svg width={100} height={100} viewBox="0 0 100 100">
                            <Circle
                                cx="50"
                                cy="50"
                                r={38}
                                stroke={ringTrack}
                                strokeWidth={8}
                                fill="none"
                            />
                            {/* Progresso estático (sem Animated para evitar freeze no Android) */}
                            <Circle
                                cx="50"
                                cy="50"
                                r={38}
                                stroke={getRingColor()}
                                strokeWidth={8}
                                fill="none"
                                strokeDasharray={`${circumference} ${circumference}`}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                            />
                        </Svg>
                        {/* Score no centro */}
                        <View style={styles.scoreTextContainer}>
                            <Text style={[styles.scoreText, { color: textColor }]}>{score}</Text>
                        </View>
                    </View>

                    {/* Lado Direito: Textos e Pílulas */}
                    <View style={styles.infoContainer}>
                        <Text style={[styles.heroHeadline, { color: textColor }]} numberOfLines={2}>
                            {heroHeadline}
                        </Text>

                        <View style={styles.badgesWrapper}>
                            <View style={[styles.badge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
                                <NeoIcon name="TickSquare" size={12} color={getRingColor()} variant="Bold" />
                                <Text style={[styles.badgeText, { color: textColor }]}>
                                    {t('home.okEnvs', '{{count}} ambientes ok', { count: ambientesOk })}
                                </Text>
                            </View>

                            {pendencias > 0 && (
                                <View style={[styles.badge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
                                    <NeoIcon name="Warning2" size={12} color="#F59E0B" variant="Bold" />
                                    <Text style={[styles.badgeText, { color: textColor }]}>
                                        {t('home.pendingItems', '{{count}} pendência(s)', { count: pendencias })}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {isExpanded && (
                    <View style={styles.heroWell}>
                        <CompactActiveMonitor
                            scoreData={scoreData}
                            scoreMessage={scoreMessage}
                            isExpanded={isExpanded}
                            hideScore
                        />
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 16,
        marginTop: 10,
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 8,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 12,
    },
    topLabel: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.2,
        marginRight: 4,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ringContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    scoreTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -1,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    heroHeadline: {
        fontSize: 26,
        lineHeight: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    badgesWrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 6,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    heroWell: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
        marginTop: 16,
    }
});
