/**
 * FerramentasIAScreenNeo.js
 * Central de Ferramentas — Vigilaro Care V6 Neo
 *
 * Filosofia: ferramentas inteligentes acessíveis SEM virar "showroom de IA".
 * Labels humanas, sem auto-branding ('Vigilaro X') nem 'IA' decorativo em
 * cada subtítulo. A inteligência fica subentendida no comportamento.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import FadeInView from '../../components/FadeInView';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function FerramentasIAScreenNeo() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textSecondary = themeColors.neutral[700];

    // Análise visual (1 ferramenta principal)
    const analysisTool = {
        title: t('ferramentasIA.scannerAmbienteTitle', 'Análise do ambiente'),
        desc: t('ferramentasIA.scannerAmbienteDesc', 'Aponte a câmera para mapear riscos de queda, objetos perigosos e condições do ambiente.'),
        iconName: 'ScanBarcode',
        color: '#10B981', // emerald
        route: 'Scanner',
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER consistente com Accessibility/Reports/Activity */}
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
                            {t('ferramentasIA.headerTitle', 'Ferramentas IA')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('ferramentasIA.headerSubtitle', 'Análise visual do ambiente')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* ANÁLISE — destaque, 1 card horizontal */}
                    <FadeInView delay={80}>
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                            {t('ferramentasIA.sectionAnaliseVisual', 'Análise')}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate(analysisTool.route)}
                        >
                            <NeoCard variant="elevated" style={s.analysisCard}>
                                <View style={[s.analysisIconWrap, { backgroundColor: analysisTool.color + '33' }]}>
                                    <NeoIcon name={analysisTool.iconName} size={28} color={analysisTool.color} variant="Bold" />
                                </View>
                                <View style={{ flex: 1, marginLeft: 14 }}>
                                    <Body style={s.analysisTitle}>{analysisTool.title}</Body>
                                    <Small style={s.analysisDesc} numberOfLines={3}>{analysisTool.desc}</Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                            </NeoCard>
                        </TouchableOpacity>
                    </FadeInView>

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

    // Section labels (consistente com outras telas)
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Análise (card destacado horizontal)
    analysisCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
    },
    analysisIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    analysisTitle: {
        fontWeight: '800',
        fontSize: 16,
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    analysisDesc: {
        color: Neo.colors.neutral[600],
        lineHeight: 17,
    },

});
