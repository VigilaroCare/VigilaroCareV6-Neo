/**
 * EducationEnvironmentsScreen.js
 * Hub de Riscos e Orientações por Ambiente.
 *
 * Padrão card-imagem (igual PetsMenuScreen): 120x120 da foto Pexels
 * do ambiente à esquerda, título + resumo + chevron à direita.
 * Foto vem de MAPA_PREVENCAO.capa[0] (cascade fallback no destino).
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Animated, Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Shadows } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import {
    EDUCATIONAL_GUIDES,
    LISTA_CONVIVENCIA,
    LISTA_INTIMA,
    LISTA_SERVICOS,
    LISTA_LAZER,
    LISTA_CIRCULACAO,
} from '../../data/educational_guides';
import { MAPA_PREVENCAO } from '../../data/knowledge_prevencao';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import ReviewImage from '../../components/ReviewImage';
import { H1, H3 } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

/**
 * Card de ambiente com cascade fallback de imagem.
 * Tenta capa[0] → capa[1] → ícone NeoIcon (último recurso).
 * Mesma lógica usada no EnvironmentGuideNeoScreen para o hero.
 */
function EnvironmentCard({ id, item, ambiente, onPress, theme }) {
    const capaList = useMemo(() => {
        if (Array.isArray(ambiente?.capa)) return ambiente.capa.filter(Boolean);
        if (typeof ambiente?.capa === 'string' && ambiente.capa) return [ambiente.capa];
        return [];
    }, [ambiente]);

    const [imgIndex, setImgIndex] = useState(0);
    const [allFailed, setAllFailed] = useState(false);

    const handleImgError = useCallback(() => {
        if (imgIndex < capaList.length - 1) {
            setImgIndex(imgIndex + 1);
        } else {
            setAllFailed(true);
        }
    }, [imgIndex, capaList.length]);

    const currentUrl = capaList[imgIndex];
    const showImage = !allFailed && !!currentUrl;
    const color = item.color || themeColors.categoria.ocre.fill;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={{ marginBottom: 14 }}
        >
            <View style={styles.cardOuter}>
                <View style={[styles.cardInner, {
                    backgroundColor: theme.cardBg,
                    borderColor: theme.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
                }]}>
                    {/* Imagem à esquerda — cascade fallback p/ capa[1] → ícone */}
                    <View style={[styles.imageContainer, { backgroundColor: color + '18' }]}>
                        {showImage ? (
                            <ReviewImage
                                key={`${id}-${imgIndex}`}
                                source={typeof currentUrl === 'string' ? { uri: currentUrl } : currentUrl}
                                tint={color}
                                tintOpacity={0.10}
                                accessibilityLabel={item.label}
                                onError={handleImgError}
                            />
                        ) : (
                            <NeoIcon name={item.iconName || 'Home2'} size={40} color={color} variant="Bold" />
                        )}
                    </View>

                    {/* Texto */}
                    <View style={styles.textCol}>
                        <Text style={[styles.cardTitle, { color: theme.textPrimary }]} numberOfLines={2}>
                            {item.label}
                        </Text>
                        <View style={{ flex: 1 }} />
                        <Text style={[styles.cardDesc, { color: theme.textBody }]} numberOfLines={3}>
                            {item.content}
                        </Text>
                    </View>

                    {/* Chevron */}
                    <View style={styles.chevron}>
                        <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[400]} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default function EducationEnvironmentsScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
    const theme = { textPrimary, textBody, cardBg, isDark };

    const { heroImage } = route?.params || {};
    const scrollY = React.useRef(new Animated.Value(0)).current;
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

    const renderCard = (id) => {
        const item = EDUCATIONAL_GUIDES?.[id];
        const ambiente = MAPA_PREVENCAO?.[id];
        if (!item) return null;

        return (
            <EnvironmentCard
                key={id}
                id={id}
                item={item}
                ambiente={ambiente}
                theme={theme}
                onPress={() => navigation.navigate('EnvironmentGuideNeo', { ambienteId: id })}
            />
        );
    };

    const renderSection = (title, iconName, color, list) => (
        <View style={styles.sectionContainer} key={title}>
            <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconBg, { backgroundColor: color + '25' }]}>
                    <NeoIcon name={iconName} size={18} color={color} variant="Bold" />
                </View>
                <H3 style={[styles.sectionTitle, { color: textPrimary }]}>{title}</H3>
            </View>
            {list.map(renderCard)}
        </View>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={heroImage ? 'light' : (isDark ? 'light' : 'dark')} translucent={true} backgroundColor="transparent" />

                {/* HEADER padronizado */}
                <View style={[styles.header, heroImage && { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'transparent' }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, heroImage && { backgroundColor: 'rgba(255,255,255,0.25)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' }]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={heroImage ? '#FFF' : Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={[styles.title, heroImage && { color: '#FFF' }]}>
                            {t('knowledgeHub.envPrevention', 'Prevenção por ambientes')}
                        </H1>
                    </View>
                </View>

                <Animated.ScrollView 
                    contentContainerStyle={[styles.content, heroImage && { paddingTop: 0 }]} 
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    scrollEventThrottle={16}
                >
                    {heroImage && (
                        <Animated.View style={{
                            width: '100%',
                            height: HERO_HEIGHT,
                            transform: heroTransform,
                            marginBottom: 24,
                            marginHorizontal: -Neo.spacing.lg,
                        }}>
                            <Image
                                source={typeof heroImage === 'string' ? { uri: heroImage } : heroImage}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                            <LinearGradient
                                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)', isDark ? '#1A1A1A' : '#FCFBF8']}
                                locations={[0, 0.4, 1]}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            />
                        </Animated.View>
                    )}

                    {renderSection(t('envScreens.living', 'Convivência e Estar'), 'People', themeColors.categoria.ocre.fill, LISTA_CONVIVENCIA)}
                    {renderSection(t('envScreens.rest', 'Área de Descanso'), 'MagicStar', '#673AB7', LISTA_INTIMA)}
                    {renderSection(t('envScreens.services', 'Serviços e Utilidades'), 'Briefcase', '#607D8B', LISTA_SERVICOS)}
                    {renderSection(t('envScreens.leisure', 'Lazer e Exterior'), 'Sun1', '#4CAF50', LISTA_LAZER)}
                    {renderSection(t('envScreens.circulation', 'Circulação e Acessos'), 'RouteSquare', '#F44336', LISTA_CIRCULACAO)}
                </Animated.ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },

    // Scroll
    content: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Seções
    sectionContainer: { marginBottom: 22 },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 10,
    },
    sectionIconBg: {
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
    },

    // Cards — padrão idêntico a PetsMenuScreen
    cardOuter: {
        borderRadius: 20,
        ...Shadows.sm,
    },
    cardInner: {
        flexDirection: 'row',
        height: 120,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
    },
    imageContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCol: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 20,
    },
    cardDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
    chevron: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 12,
    },
});
