/**
 * PetsMenuScreen.js
 * Hub de Saúde Pet — Vigilaro Care V6 Neo
 *
 * Layout: cards grandes com imagem retangular 120×120 à esquerda
 * (mesmo padrão de AcessoriosSegurancaScreen).
 * Imagens: require() local (assets/images/prevencao/) ou imagemUrl Pexels.
 * 3 seções: Por tipo/idade · Bem-estar · Emergência
 */

import { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import { Shadows } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import ReviewImage from '../../components/ReviewImage';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { PET_SAFETY_CONTENT } from '../../data/pet_safety_content';

// ── Imagens bundladas do acervo ──────────────────────────────────────────────
// Apenas fotos com enquadramento landscape que funcionam em cover.
// adultos e pequenos usam Pexels (não havia equivalente no acervo).
const IMG = {
    header:    null,
    filhotes:  null,
    wellness:  null,
    socorros:  null,
};

// ── Placeholder para cards sem foto local (retorna null → fallback emoji/ícone) ──
const PEXELS = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export default function PetsMenuScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary  = themeColors.neutral[900];
    const textBody     = themeColors.neutral[700];
    const cardBg       = isDark ? themeColors.neutral[200] : '#FFFFFF';

    // ── Por tipo/idade ────────────────────────────────────────────────────────
    const sectionTipos = [
        {
            id: 'prenhez',
            cor: themeColors.categoria.rose.fill,
            imagem: null,
            imagemUrl: PEXELS('34793866'),   // mamãe cachorra com filhotes (landscape)
            titulo: t('petsMenu.prenhez.titulo'),
            descricao: t('petsMenu.prenhez.descricao'),
            tela: 'PetPregnancyGuide',
        },
        {
            id: 'filhotes',
            cor: themeColors.categoria.ardosia.fill,
            imagem: null,
            imagemUrl: PEXELS('4588435'), // Pexels puppy
            titulo: t('petsMenu.filhotes.titulo'),
            descricao: t('petsMenu.filhotes.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['filhotes']?.risks,
            checklist: PET_SAFETY_CONTENT['filhotes']?.checklist,
        },
        {
            id: 'adultos',
            cor: '#4CAF50',
            imagem: null,
            imagemUrl: PEXELS('32635851'),   // Border Collie sorrindo close-up (landscape)
            titulo: t('petsMenu.adultos.titulo'),
            descricao: t('petsMenu.adultos.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['adultos']?.risks,
            checklist: PET_SAFETY_CONTENT['adultos']?.checklist,
        },
        {
            id: 'pequenos',
            cor: '#FF7043',
            imagem: null,
            imagemUrl: PEXELS('16509406'),   // hamster europeu na grama (landscape)
            titulo: t('petsMenu.pequenos.titulo'),
            descricao: t('petsMenu.pequenos.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['pequenos_mamiferos']?.risks,
            checklist: PET_SAFETY_CONTENT['pequenos_mamiferos']?.checklist,
        },
        {
            id: 'aves',
            cor: '#FBC02D',
            imagem: null,
            imagemUrl: PEXELS('14413302'),   // papagaio verde em cerca (landscape verificada)
            titulo: t('petsMenu.aves.titulo'),
            descricao: t('petsMenu.aves.descricao'),
            tela: 'AvesSeguras',
        },
        {
            id: 'peixes',
            cor: '#0EA5E9',
            imagem: null,
            imagemUrl: PEXELS('128756'),    // aquário doméstico colorido
            titulo: t('petsMenu.peixes.titulo'),
            descricao: t('petsMenu.peixes.descricao'),
            tela: 'AgeGroupDetail',
            risks: PET_SAFETY_CONTENT['peixes']?.risks,
            checklist: PET_SAFETY_CONTENT['peixes']?.checklist,
        },
    ];

    // ── Bem-estar & alimentação ───────────────────────────────────────────────
    const sectionBemEstar = [
        {
            id: 'wellness',
            cor: '#16A34A',
            imagem: null,
            imagemUrl: PEXELS('1741205'), // Pexels cat and dog
            titulo: t('petsMenu.wellness.titulo'),
            descricao: t('petsMenu.wellness.descricao'),
            tela: 'PetWellness',
        },
        {
            id: 'alimentos',
            cor: '#D32F2F',
            imagem: null,
            imagemUrl: PEXELS('918327'),    // chocolate partido (perigo)
            titulo: t('petsMenu.alimentos.titulo'),
            descricao: t('petsMenu.alimentos.descricao'),
            tela: 'PetFoodSafety',
        },
    ];

    // ── Emergência ────────────────────────────────────────────────────────────
    // Híbrido: 1 card único de primeiros socorros (guia + ação rápida).
    // O destino PrimeirosSocorros já mostra todas as situações com modal de
    // passos — atende tanto estudo prévio quanto consulta em emergência.
    const sectionEmergencia = [
        {
            id: 'primeiros_socorros_pet',
            cor: '#DC2626',
            imagem: null,
            imagemUrl: PEXELS('7468202'), // Pexels vet/first aid
            titulo: t('petsMenu.primeiros_socorros_pet.titulo', 'Primeiros socorros pet'),
            descricao: t('petsMenu.primeiros_socorros_pet.descricao', 'Guia completo + ação rápida em emergências'),
            tela: 'PrimeirosSocorros',
        },
        {
            id: 'kit_pet_checklist',
            cor: '#F59E0B',
            imagem: null,
            imagemUrl: PEXELS('8434633'),   // tigela inox com petiscos (landscape)
            titulo: t('petsMenu.kit_pet_checklist.titulo'),
            descricao: t('petsMenu.kit_pet_checklist.descricao'),
            tela: 'GuiaKitsEmergencia',
            params: {},
        },
    ];

    const handlePress = (item) => {
        // Hero comum a propagar para todas as telas de destino
        const petHero = {
            imagem: item.imagem || null,
            imagemUrl: item.imagemUrl || null,
            cor: item.cor,
            titulo: item.titulo,
            resizeMode: item.resizeMode || 'cover',
        };

        if (item.tela === 'AgeGroupDetail') {
            navigation.navigate(item.tela, {
                group: {
                    title: item.titulo,
                    subtitle: t(`petsMenu.${item.id}.subtitulo`, ''),
                    description: item.descricao,
                    color: item.cor,
                    icon: 'paw',
                    risks: item.risks,
                    checklist: item.checklist,
                    // Hero para banner no topo da tela de destino
                    imagem: item.imagem || null,
                    imagemUrl: item.imagemUrl || null,
                    resizeMode: item.resizeMode || 'cover',
                },
            });
        } else {
            navigation.navigate(item.tela, {
                ...(item.params || {}),
                petHero,
            });
        }
    };

    const renderItem = (item) => {
        const imgSource = item.imagem || (item.imagemUrl ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : null);

        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => handlePress(item)}
                activeOpacity={0.85}
                style={{ marginBottom: 14 }}
            >
                <View style={s.cardOuter}>
                    <View style={[s.cardInner, {
                        backgroundColor: cardBg,
                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)',
                    }]}>
                        {/* Imagem à esquerda */}
                        <View style={[s.imageContainer, { backgroundColor: item.cor + '18' }]}>
                            {imgSource ? (
                                <ReviewImage
                                    source={imgSource}
                                    tint={item.cor}
                                    tintOpacity={item.resizeMode === 'contain' ? 0.05 : 0.10}
                                    resizeMode={item.resizeMode || 'cover'}
                                    accessibilityLabel={item.titulo}
                                />
                            ) : (
                                <NeoIcon name="ShieldTick" size={40} color={item.cor} variant="Bold" />
                            )}
                        </View>

                        {/* Texto */}
                        <View style={s.textCol}>
                            <Text style={[s.cardTitle, { color: textPrimary }]} numberOfLines={2}>
                                {item.titulo}
                            </Text>
                            <View style={{ flex: 1 }} />
                            <Text style={[s.cardDesc, { color: textBody }]} numberOfLines={3}>
                                {item.descricao}
                            </Text>
                        </View>

                        {/* Chevron */}
                        <View style={s.chevron}>
                            <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[400]} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

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

    const title = t('knowledgeHub.protectPet', 'Proteção para Pets');
    const { heroImage } = route?.params || {};
    const capaSource = heroImage ? (typeof heroImage === 'string' ? { uri: heroImage } : heroImage) : require('../../assets/illustrations/pad/hero_pets.png');

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

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
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={title}
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
                    {/* POR TIPO/IDADE */}
                    <Text style={[s.sectionLabel, { color: themeColors.neutral[700] }]}>
                        {t('petsMenu.sectionTipos', 'Por tipo / idade')}
                    </Text>
                    {sectionTipos.map(renderItem)}

                    {/* BEM-ESTAR */}
                    <Text style={[s.sectionLabel, { color: themeColors.neutral[700], marginTop: 22 }]}>
                        {t('petsMenu.sectionBemEstar', 'Bem-estar')}
                    </Text>
                    {sectionBemEstar.map(renderItem)}

                    {/* EMERGÊNCIA */}
                    <Text style={[s.sectionLabel, { color: themeColors.neutral[700], marginTop: 22 }]}>
                        {t('petsMenu.sectionEmergencia', 'Emergência')}
                    </Text>
                    {sectionEmergencia.map(renderItem)}
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
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
    subtitle: {
        // cor dinâmica via inline
    },

    // Hero banner — composite com todos os tipos de pets
    heroBanner: {
        marginHorizontal: Neo.spacing.lg,
        height: 140,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        ...Shadows.sm,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },

    // Scroll
    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 2,
        paddingBottom: 240,
    },

    // Section labels
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Card — mesmo padrão AcessoriosSegurancaScreen
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
