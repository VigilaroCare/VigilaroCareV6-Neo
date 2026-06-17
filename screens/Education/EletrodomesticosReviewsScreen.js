/**
 * EletrodomesticosReviewsScreen.js
 * Lista de Reviews Educativos — Eletrodomésticos
 * Vigilaro Care V6 Neo
 */

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { ELETRODOMESTICOS_REVIEWS } from '../../data/eletrodomesticos_reviews';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const RISK_COLORS = {
    critico: '#D32F2F',
    alto: '#E65100',
    medio: '#F57F17',
    baixo: '#388E3C',
};

const RISK_LABELS = {
    critico: 'Crítico',
    alto: 'Alto',
    medio: 'Médio',
    baixo: 'Baixo',
};

const RISK_BG = {
    critico: '#FFEBEE',
    alto: '#FFF3E0',
    medio: '#FFFDE7',
    baixo: '#E8F5E9',
};

export default function EletrodomesticosReviewsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    const THEME_COLOR = '#1565C0';
    const ITEMS = ELETRODOMESTICOS_REVIEWS;

    const handlePress = (item) => {
        navigation.navigate('SafetyReviewDetail', { item });
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);
    const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    const capaUrl = 'https://images.pexels.com/photos/208933/pexels-photo-208933.jpeg?auto=compress&cs=tinysrgb&w=1200'; // Washing machine / Appliances

    const title = t('headersFirst.homeAppliances', 'Eletrodomésticos');
    const subtitle = t('headersFirst.riscosPrevenOEOQueFazerEmCasoDeAcidente', 'Riscos, prevenção e o que fazer em caso de acidente');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: THEME_COLOR,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={{ uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    
                    {/* Gradient para legibilidade do título e fusão com o fundo */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', surface]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.9)',
                            marginTop: 6,
                            fontWeight: '600'
                        }}>
                            {subtitle}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                📋 {ITEMS.length} itens • Toque para ver o review completo
                            </Text>
                        </View>
                    </FadeInView>

                {ITEMS.map((item, idx) => {
                    const riskColor = RISK_COLORS[item.nivelRisco] || '#999';
                    const riskBg = RISK_BG[item.nivelRisco] || '#F5F5F5';
                    const riskLabel = RISK_LABELS[item.nivelRisco] || '';

                    return (
                        <FadeInView key={item.id} delay={150 + idx * 50}>
                            <TouchableOpacity
                                onPress={() => handlePress(item)}
                                activeOpacity={0.8}
                                style={{ marginBottom: 16 }}
                            >
                                {/* Padrão de card alinhado com Plantas/Animais */}
                                <View style={styles.guideCardOuter}>
                                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                        <View style={[styles.guideImageContainer, { backgroundColor: riskBg }]}>
                                            {item.imagemUrl ? (
                                                <ReviewImage
                                                    source={{ uri: item.imagemUrl }}
                                                    tint={THEME_COLOR}
                                                    accessibilityLabel={item.nome}
                                                />
                                            ) : (
                                                <Text style={{ fontSize: 48 }}>{item.emoji}</Text>
                                            )}
                                        </View>
                                        <View style={styles.guideContent}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <View style={{ flex: 1, paddingRight: 8 }}>
                                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{item.nome}</Text>
                                                    <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>Uso {item.frequenciaUso.toLowerCase()}</Text>
                                                </View>
                                                <View style={[styles.toxicBadge, { backgroundColor: riskColor + '15' }]}>
                                                    <Text style={[styles.toxicText, { color: riskColor }]}>{riskLabel}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }} />
                                            <Text style={[styles.sptText, { color: textBody }]} numberOfLines={2}>{item.resumo}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>
                    );
                })}

                <View style={{ height: 200 }} />
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    headerSubtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 6,
    },
    infoBar: {
        backgroundColor: 'rgba(150,150,150,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    infoText: {
    },
    // Card grande estilo Plantas/Animais
    guideCardOuter: {
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideImage: {
        width: '100%',
        height: '100%',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    guideSubtitle: {
        fontSize: 11.5,
        fontStyle: 'italic',
        color: Neo.colors.neutral[500],
        marginBottom: 6,
    },
    toxicBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    toxicText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    sptText: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        lineHeight: 16,
    },

    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    emojiCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiText: {
        fontSize: 24,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        marginBottom: 3,
    },
    itemDesc: {
        fontSize: 12,
        color: Neo.colors.neutral[600],
        lineHeight: 16,
        marginBottom: 6,
    },
    badgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '700',
    },
    freqText: {
        fontSize: 10,
        color: Neo.colors.neutral[500],
        fontWeight: '500',
    },
});
