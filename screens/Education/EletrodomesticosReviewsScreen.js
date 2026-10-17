/**
 * EletrodomesticosReviewsScreen.js
 * Lista de Reviews Educativos — Eletrodomésticos
 * Vigilaro Care V6 Neo
 */

import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import { ELETRODOMESTICOS_REVIEWS } from '../../data/eletrodomesticos_reviews';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

// DS: data-level color
const RISK_COLORS = {
    critico: '#D32F2F', // TODO: map to DS token
    alto: Neo.colors.categoria.ocre.fill, // TODO: map to DS token
    medio: Neo.colors.categoria.ocre.fill, // TODO: map to DS token
    baixo: '#388E3C', // TODO: map to DS token
};

const RISK_LABELS = {
    critico: 'Crítico',
    alto: 'Alto',
    medio: 'Médio',
    baixo: 'Baixo',
};

// DS: data-level color
const RISK_BG = {
    critico: '#FFEBEE', // TODO: map to DS token
    alto: Neo.colors.categoria.ocre.tint, // TODO: map to DS token
    medio: '#FFFDE7', // TODO: map to DS token
    baixo: '#E8F5E9', // TODO: map to DS token
};

export default function EletrodomesticosReviewsScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : Neo.colors.neutral.white;

    const THEME_COLOR = themeColors.secondary[500];
    const ITEMS = ELETRODOMESTICOS_REVIEWS;

    const handlePress = (item) => {
        navigation.navigate('SafetyReviewDetail', { item });
    };

    const capaUrl = require('../../assets/illustrations/pad/eletrodomesticos_eletrodomesticos_005.jpg');

    const title = t('headersFirst.homeAppliances', 'Eletrodomésticos');

        const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 280;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ];

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors.neutral[800],
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }}>
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={textMuted} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                {ITEMS.length}{t('telas.EletrodomesticosReviewsScreen.itensToqueParaVerOReview', ' itens • Toque para ver o review completo')}</Text>
                        </View>
                    </FadeInView>

                {ITEMS.map((item, idx) => {
                    const riskColor = RISK_COLORS[item.nivelRisco] || themeColors.neutral[500];
                    const riskBg = RISK_BG[item.nivelRisco] || themeColors.neutral[200];
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
                                                    source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
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
                                                    <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{t('telas.EletrodomesticosReviewsScreen.uso', 'Uso ')}{item.frequenciaUso.toLowerCase()}</Text>
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
        </AppBackground>
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
        flexDirection: 'row',
        alignItems: 'center',
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
        shadowColor: Neo.colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: Neo.colors.neutral[200],
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
        color: Neo.colors.neutral.white,
        fontSize: 10,
        fontWeight: '700',
    },
    freqText: {
        fontSize: 10,
        color: Neo.colors.neutral[500],
        fontWeight: '500',
    },
});
