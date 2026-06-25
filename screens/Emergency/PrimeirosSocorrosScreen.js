import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { getPrimeirosSocorros } from '../../data/primeiros_socorros';
import { getEmergenciasPets } from '../../data/primeiros_socorros_pets';
import DisclaimerModal from '../../components/DisclaimerModal';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';

const HUMAN_ACCENT = '#EF4444'; // red — pessoas (urgência)
const PET_ACCENT = '#10B981';   // green — pets (cuidado)

export default function PrimeirosSocorrosScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[800];
    const petHero = route?.params?.petHero;
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const [type, setType] = useState(petHero ? 'PET' : 'HUMAN');

    const getData = () => {
        if (type === 'HUMAN') {
            return getPrimeirosSocorros().map(item => ({
                ...item,
                isPet: false
            }));
        }
        return getEmergenciasPets().map(pet => ({
            id: pet.id,
            emoji: pet.emoji || '🐾',
            titulo: pet.titulo,
            situacao: pet.descricao,
            imagemUrl: pet.imagemUrl,
            imagem: pet.imagem,
            isPet: true,
            rawPetData: pet,
        }));
    };

    const handlePress = (item) => {
        const isPet = item.isPet;
        const THEME_COLOR = isPet ? PET_ACCENT : HUMAN_ACCENT;

        let conceito = {
            titulo: item.titulo,
            subtitulo: item.situacao,
            icon: isPet ? 'Heart' : 'Health',
            emoji: item.emoji,
            color: THEME_COLOR,
            tags: [isPet ? 'Pets' : 'Pessoas'],
            imagemUrl: item.imagem || item.imagemUrl,
        };

        if (isPet) {
            const petData = item.rawPetData || {};
            conceito.passos = (petData.passos || []).map(p => ({ titulo: p.titulo, descricao: p.descricao, critico: p.critico }));
            if (petData.alertas && petData.alertas.length > 0) {
                conceito.alertaVeterinario = petData.alertas.join('\n');
            }
        } else {
            conceito.passos = (item.oQueFazer || []).map(step => ({ titulo: step, descricao: '' }));
            conceito.naoFazer = item.oQueNaoFazer || [];
            conceito.sinaisCriticos = item.quandoChamarAjuda || [];
        }

        navigation.navigate('PremiumArticle', {
            conceito: conceito
        });
    };

    const accent = type === 'HUMAN' ? HUMAN_ACCENT : PET_ACCENT;
    const items = getData();

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

    const capaUrl = type === 'HUMAN' 
        ? require('../../assets/illustrations/pad/fotos-stock-genericas_kit-primeiros-socorros_044.jpg') 
        : require('../../assets/illustrations/pad/fotos-stock-genericas_kit-primeiros-socorros_044.jpg');

    const title = t('headersFirst.firstAid', 'Primeiros socorros');
    const subtitle = t('headersFirst.respostaRPidaEmEmergNcias', 'Resposta rápida em emergências');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />
            <DisclaimerModal visible={showDisclaimer} onClose={() => setShowDisclaimer(false)} />

            {/* Float Header / Back Button (fixo no topo da tela) */}
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
                    backgroundColor: accent,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
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

                    {/* TABS Pessoas / Pets */}
                    <View style={styles.tabsWrap}>
                        <View style={[styles.tabsTrack, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                            <TouchableOpacity
                                onPress={() => setType('HUMAN')}
                                style={[
                                    styles.tabBtn,
                                    type === 'HUMAN' && { backgroundColor: isDark ? Neo.colors.neutral[800] : '#FFF' },
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        { color: type === 'HUMAN' ? HUMAN_ACCENT : Neo.colors.neutral[500] },
                                    ]}
                                >
                                    {t('headersFirst.people', 'Pessoas')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setType('PET')}
                                style={[
                                    styles.tabBtn,
                                    type === 'PET' && { backgroundColor: isDark ? Neo.colors.neutral[800] : '#FFF' },
                                ]}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        { color: type === 'PET' ? PET_ACCENT : Neo.colors.neutral[500] },
                                    ]}
                                >
                                    {t('headersFirst.pets', 'Pets')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                {/* Vertical List */}
                <View style={{ paddingBottom: 120 }}>
                    {petHero && type === 'PET' && (
                        <PetHeroBanner
                            image={petHero.imagem}
                            imageUrl={petHero.imagemUrl}
                            tint={petHero.cor || PET_ACCENT}
                            resizeMode={petHero.resizeMode || 'cover'}
                            accessibilityLabel={petHero.titulo}
                            marginHorizontal={0}
                            marginBottom={14}
                            height={140}
                        />
                    )}

                    {items.map((item, idx) => (
                        <NeoHorizontalCard
                            key={`ps-${idx}`}
                            title={item.titulo}
                            description={item.situacao}
                            emoji={item.emoji}
                            iconName={item.isPet ? 'Heart' : 'Health'}
                            color={accent}
                            imageUrl={item.imagem || item.imagemUrl}
                            onPress={() => handlePress(item)}
                        />
                    ))}
                </View>
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
    tabsWrap: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    tabsTrack: {
        flexDirection: 'row',
        height: 48,
        borderRadius: 16,
        padding: 4,
    },
    tabBtn: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 4,
        paddingBottom: 120,
    },
});
