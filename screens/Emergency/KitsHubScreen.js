import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import ReviewImage from '../../components/ReviewImage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { useThemeColors } from '../../utils/ThemeContext';

export default function KitsHubScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();

    const kits = [
        {
            id: 'socorros',
            title: t('kitsHub.firstAid', 'Primeiros Socorros'),
            sub: t('kitsHub.firstAidSub', 'Curativos e itens básicos'),
            iconName: 'Health',
            color: '#DC2626', // red
            route: 'KitPrimeirosSocorros',
        },
        {
            id: 'remedios',
            title: t('kitsHub.pharmacy', 'Farmácia em casa'),
            sub: t('kitsHub.pharmacySub', 'Controle de remédios'),
            iconName: 'Health',
            color: '#0EA5E9', // sky
            route: 'KitRemedios',
        },
        {
            id: 'emergencia',
            title: t('kitsHub.emergency', 'Kit de Emergência'),
            sub: t('kitsHub.emergencySub', 'Sobrevivência por 72h'),
            iconName: 'Briefcase',
            color: Neo.colors.categoria.ameixa.fill,
            route: 'KitEmergencia',
        },
        {
            id: 'ferramentas',
            title: t('kitsHub.tools', 'Ferramentas'),
            sub: t('kitsHub.toolsSub', 'Manutenção e reparos básicos'),
            iconName: 'Hammer',
            color: '#F59E0B', // amber
            route: 'FerramentasTrabalho', // FIX: era KitFerramentas (rota inexistente)
        },
        {
            id: 'epis',
            title: t('kitsHub.ppe', 'EPIs'),
            sub: t('kitsHub.ppeSub', 'Equipamentos de proteção'),
            iconName: 'ShieldTick',
            color: '#16A34A', // green
            route: 'EpiDomestico', // FIX: era KitEPIs (rota inexistente)
        },
    ];

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

    const title = t('kitsHub.headerTitle', 'Kits');
    const capaSource = require('../../assets/illustrations/pad/hero_kits.png');

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
                    {/* LISTA DE KITS */}
                    {kits.map((item, index) => (
                        <FadeInView key={item.id} delay={120 + index * 40}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(item.route)}
                                activeOpacity={0.85}
                                style={{ marginBottom: 10 }}
                            >
                                <NeoCard variant="elevated" style={s.kitCard}>
                                    <View style={[s.iconCircle, { backgroundColor: item.color + '33' }]}>
                                        <NeoIcon name={item.iconName} size={24} color={item.color} variant="Bold" />
                                    </View>
                                    <View style={s.textCol}>
                                        <Body style={s.kitTitle}>{item.title}</Body>
                                        <Small style={s.kitSub}>{item.sub}</Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                        </FadeInView>
                    ))}

                    {/* DICA — card glass discreto */}
                    <NeoCard variant="elevated" style={s.tipCard}>
                        <View style={s.tipIconWrap}>
                            <NeoIcon name="LampOn" size={20} color="#F59E0B" variant="Bold" />
                        </View>
                        <Body style={s.tipText}>
                            {t('kitsHub.tipText', 'Verifique a validade dos itens a cada 6 meses para manter seus kits sempre prontos.')}
                        </Body>
                    </NeoCard>
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
        paddingBottom: 18,
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
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Kit card
    kitCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
    },
    iconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    textCol: {
        flex: 1,
    },
    kitTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    kitSub: {
        color: Neo.colors.neutral[600],
        lineHeight: 16,
    },

    // Tip card
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        marginTop: 18,
        gap: 12,
    },
    tipIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(245,158,11,0.22)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipText: {
        flex: 1,
        color: Neo.colors.neutral[700],
        fontSize: 13,
        lineHeight: 18,
    },
});
