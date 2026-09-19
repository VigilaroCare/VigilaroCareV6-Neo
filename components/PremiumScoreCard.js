import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark } from '../utils/ThemeContext';
import NeoIcon from './NeoIcon';
import SafeGradient from './SafeGradient';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PremiumScoreCard({ scoreData, onPress }) {
    const isDark = useIsDark();
    const animValue = useRef(new Animated.Value(0)).current;

    const scoreGeral = scoreData?.geral || 0;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: scoreGeral,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, [scoreGeral]);

    const getScoreColor = (score) => {
        if (score >= 80) return ['#34D399', '#059669'];
        if (score >= 50) return ['#FBBF24', '#D97706'];
        return ['#F87171', '#DC2626'];
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return 'Excelente';
        if (score >= 50) return 'Atenção';
        return 'Crítico';
    };

    const colors = getScoreColor(scoreGeral);
    const label = getScoreLabel(scoreGeral);

    const size = 100;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = animValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0]
    });

    const bgColors = isDark 
        ? [Neo.colors.neutral[800], Neo.colors.neutral[900]] 
        : ['#FFFFFF', '#F8F9FA'];
        
    const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)';
    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const textMuted = isDark ? '#A1A1AA' : Neo.colors.neutral[500];
    const trackColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.container}>
            <SafeGradient
                colors={bgColors}
                style={[styles.card, { borderColor, borderWidth: 1 }]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.content}>
                    <View style={styles.chartContainer}>
                        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                            <Defs>
                                <LinearGradient id="gradScore" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <Stop offset="0%" stopColor={colors[0]} />
                                    <Stop offset="100%" stopColor={colors[1]} />
                                </LinearGradient>
                            </Defs>
                            
                            <Circle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke={trackColor}
                                strokeWidth={strokeWidth}
                                fill="none"
                            />
                            
                            <AnimatedCircle
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                stroke="url(#gradScore)"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                style={{ transform: [{ rotate: '-90deg' }], transformOrigin: 'center' }}
                            />
                        </Svg>
                        
                        <View style={styles.scoreTextContainer}>
                            <Text style={[styles.scoreValue, { color: textColor }]}>
                                {scoreGeral}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.title, { color: textMuted }]}>
                            Pontuação de Prevenção
                        </Text>
                        <Text style={[styles.status, { color: colors[0] }]}>
                            {label}
                        </Text>
                        
                        <View style={styles.actionRow}>
                            <Text style={[styles.actionText, { color: textMuted }]}>
                                Ver detalhes
                            </Text>
                            <NeoIcon name="ArrowRight2" size={14} color={textMuted} />
                        </View>
                    </View>
                </View>
            </SafeGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    card: {
        borderRadius: 24,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chartContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    scoreTextContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreValue: {
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -1,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    status: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
    }
});
