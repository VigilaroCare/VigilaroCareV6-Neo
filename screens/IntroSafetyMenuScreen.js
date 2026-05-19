import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import AppBackground from '../components/AppBackground';
import { H1, Caption } from '../components/NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { INTRO_CONCEPTS } from '../data/intro_safety';
import { t_field } from '../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

/**
 * Ordem de exibição preferida pelo usuário (independente da ordem do array):
 * 1. Introdução à Segurança    (intro_01)
 * 2. Quase Acidentes           (piramide_bird)
 * 3. Metodologia 3D            (prevencao_3d)
 */
const PREFERRED_ORDER = ['intro_01', 'piramide_bird', 'prevencao_3d'];

export default function IntroSafetyMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    // Ordena conforme PREFERRED_ORDER; itens fora da lista vão ao final
    const orderedConcepts = useMemo(() => {
        const byId = Object.fromEntries(INTRO_CONCEPTS.map(c => [c.id, c]));
        const ordered = PREFERRED_ORDER.map(id => byId[id]).filter(Boolean);
        const extras = INTRO_CONCEPTS.filter(c => !PREFERRED_ORDER.includes(c.id));
        return [...ordered, ...extras];
    }, []);

    const renderCard = (concept) => (
        <TouchableOpacity
            key={concept.id}
            onPress={() => navigation.navigate('ConceitoDetail', { conceito: concept })}
            activeOpacity={0.85}
            style={{ marginBottom: 12 }}
        >
            <NeoCard variant="elevated" style={s.card}>
                <View style={[s.cardIcon, { backgroundColor: (concept.bg || '#EDE7F6') }]}>
                    {concept.icone ? (
                        <NeoIcon name={concept.icone} size={22} color={concept.cor || Neo.colors.primary[600]} variant="Bold" />
                    ) : (
                        <Text style={s.cardEmoji}>{concept.emoji || '💡'}</Text>
                    )}
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={[s.cardTitle, { color: textPrimary }]} numberOfLines={1}>
                        {t_field(concept, 'titulo')}
                    </Text>
                    <Text style={[s.cardDesc, { color: textBody }]} numberOfLines={2}>
                        {t_field(concept, 'definicao')}
                    </Text>
                </View>

                <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[500]} />
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER padronizado (igual outras telas premium) */}
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
                            {t('headersFirst.conceitosFundamentais', 'Conceitos Fundamentais')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('intro.subtitle', 'Base da prevenção doméstica')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.content}
                    showsVerticalScrollIndicator={false}
                >
                    {orderedConcepts.map(renderCard)}
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
        fontSize: 24,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    // Content
    content: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Card
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        gap: 12,
    },
    cardIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardEmoji: {
        fontSize: 22,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        marginBottom: 3,
        letterSpacing: -0.2,
    },
    cardDesc: {
        fontSize: 12.5,
        color: Neo.colors.neutral[600],
        lineHeight: 17,
    },
});
