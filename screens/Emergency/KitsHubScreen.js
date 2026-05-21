import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import {
    Health, Briefcase, Hammer, ShieldTick, ArrowRight2, LampOn,
} from 'iconsax-react-native';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { useIsDark } from '../../utils/ThemeContext';

export default function KitsHubScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const isDark = useIsDark();

    const kits = [
        {
            id: 'socorros',
            title: t('kitsHub.firstAid', 'Primeiros Socorros'),
            sub: t('kitsHub.firstAidSub', 'Curativos e itens básicos'),
            Icon: Health,
            color: '#DC2626', // red
            route: 'KitPrimeirosSocorros',
        },
        {
            id: 'remedios',
            title: t('kitsHub.pharmacy', 'Farmácia em casa'),
            sub: t('kitsHub.pharmacySub', 'Controle de remédios'),
            Icon: Health,
            color: '#0EA5E9', // sky
            route: 'KitRemedios',
        },
        {
            id: 'emergencia',
            title: t('kitsHub.emergency', 'Kit de Emergência'),
            sub: t('kitsHub.emergencySub', 'Sobrevivência por 72h'),
            Icon: Briefcase,
            color: '#7C3AED', // violet
            route: 'KitEmergencia',
        },
        {
            id: 'ferramentas',
            title: t('kitsHub.tools', 'Ferramentas'),
            sub: t('kitsHub.toolsSub', 'Manutenção e reparos básicos'),
            Icon: Hammer,
            color: '#F59E0B', // amber
            route: 'FerramentasTrabalho', // FIX: era KitFerramentas (rota inexistente)
        },
        {
            id: 'epis',
            title: t('kitsHub.ppe', 'EPIs'),
            sub: t('kitsHub.ppeSub', 'Equipamentos de proteção'),
            Icon: ShieldTick,
            color: '#16A34A', // green
            route: 'EpiDomestico', // FIX: era KitEPIs (rota inexistente)
        },
    ];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER consistente */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('kitsHub.headerTitle', 'Kits')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('kitsHub.headerSubtitle', 'Preparação para emergências')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
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
                                        <item.Icon size={24} color={item.color} variant="Bold" />
                                    </View>
                                    <View style={s.textCol}>
                                        <Body style={s.kitTitle}>{item.title}</Body>
                                        <Small style={s.kitSub}>{item.sub}</Small>
                                    </View>
                                    <ArrowRight2 size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                        </FadeInView>
                    ))}

                    {/* DICA — card glass discreto */}
                    <NeoCard variant="elevated" style={s.tipCard}>
                        <View style={s.tipIconWrap}>
                            <LampOn size={20} color="#F59E0B" variant="Bold" />
                        </View>
                        <Body style={s.tipText}>
                            {t('kitsHub.tipText', 'Verifique a validade dos itens a cada 6 meses para manter seus kits sempre prontos.')}
                        </Body>
                    </NeoCard>
                </ScrollView>
            </SafeAreaView>
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
