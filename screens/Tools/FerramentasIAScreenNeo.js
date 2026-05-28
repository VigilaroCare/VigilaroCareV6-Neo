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
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
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

    // Assistentes (voz + texto)
    const assistants = [
        {
            id: 'voice',
            title: t('ferramentasIA.voiceTitle', 'Por voz'),
            sub: t('ferramentasIA.voiceSubtitle', 'Pergunte falando'),
            iconName: 'Microphone2',
            color: '#7C3AED', // violet
            route: 'AssistentePrevencaoIA',
        },
        {
            id: 'text',
            title: t('ferramentasIA.chatTitle', 'Por texto'),
            sub: t('ferramentasIA.chatSubtitle', 'Pergunte escrevendo'),
            iconName: 'Bubble',
            color: '#0EA5E9', // sky
            route: 'AITextChat',
        },
    ];

    // Visualizações & Dados (ações secundárias)
    const records = [
        {
            id: 'heatmap',
            title: t('ferramentasIA.heatmapTitle', 'Mapa de calor de riscos'),
            sub: t('ferramentasIA.heatmapSub', 'Riscos por cômodo'),
            iconName: 'Map',
            color: '#DC2626',
            route: 'MapaDeCalor',
        },
        {
            id: 'activity',
            title: t('ferramentasIA.recentTitle', 'Atividade recente'),
            sub: t('ferramentasIA.recentSub', 'Eventos e ações do app'),
            iconName: 'Activity',
            color: '#F59E0B',
            route: 'RecentActivity',
        },
        {
            id: 'datahealth',
            title: t('ferramentasIA.dataHealthTitle', 'Saúde dos dados'),
            sub: t('ferramentasIA.dataHealthSub', 'Diagnóstico de integridade'),
            iconName: 'ShieldTick',
            color: '#16A34A',
            route: 'DataHealth',
        },
    ];

    // Em breve (subtle — só itens ainda não implementados)
    const upcoming = [
        t('ferramentasIA.detectorTitle', 'Detector de áudio do ambiente'),
    ];

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
                            {t('ferramentasIA.headerSubtitle', 'Análise visual, voz e dados')}
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

                    {/* ASSISTENTES — 2-col grid */}
                    <FadeInView delay={150}>
                        <Text style={[s.sectionLabel, { marginTop: 22 }]}>
                            {t('ferramentasIA.sectionAssistentes', 'Assistentes')}
                        </Text>
                        <View style={s.assistGrid}>
                            {assistants.map(item => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.85}
                                    style={s.assistCell}
                                    onPress={() => navigation.navigate(item.route)}
                                >
                                    <NeoCard variant="elevated" style={s.assistCard}>
                                        <View style={[s.assistIconWrap, { backgroundColor: item.color + '33' }]}>
                                            <NeoIcon name={item.iconName} size={24} color={item.color} variant="Bold" />
                                        </View>
                                        <H3 style={s.assistTitle}>{item.title}</H3>
                                        <Small style={s.assistSub}>{item.sub}</Small>
                                    </NeoCard>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </FadeInView>

                    {/* HISTÓRICO & DADOS — 2 cards horizontais */}
                    <FadeInView delay={220}>
                        <Text style={[s.sectionLabel, { marginTop: 22 }]}>
                            {t('ferramentasIA.sectionRecords', 'Histórico & Dados')}
                        </Text>
                        {records.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate(item.route)}
                                style={{ marginBottom: 10 }}
                            >
                                <NeoCard variant="elevated" style={s.recordCard}>
                                    <View style={[s.recordIconWrap, { backgroundColor: item.color + '33' }]}>
                                        <NeoIcon name={item.iconName} size={22} color={item.color} variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.recordTitle}>{item.title}</Body>
                                        <Small style={s.recordSub}>{item.sub}</Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                        ))}
                    </FadeInView>

                    {/* EM BREVE — linha sutil em texto, sem cards lockados */}
                    {upcoming.length > 0 && (
                        <FadeInView delay={300}>
                            <View style={s.upcomingBlock}>
                                <Text style={s.upcomingLabel}>
                                    {t('ferramentasIA.sectionEmBreve', 'Em breve')}
                                </Text>
                                {upcoming.map((text, idx) => (
                                    <View key={idx} style={s.upcomingRow}>
                                        <View style={s.upcomingDot} />
                                        <Small style={s.upcomingText}>{text}</Small>
                                    </View>
                                ))}
                            </View>
                        </FadeInView>
                    )}
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

    // Assistentes (2-col grid)
    assistGrid: {
        flexDirection: 'row',
        gap: 10,
    },
    assistCell: {
        flex: 1,
    },
    assistCard: {
        padding: 16,
        borderRadius: 18,
        alignItems: 'center',
        minHeight: 130,
    },
    assistIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    assistTitle: {
        fontSize: 14,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 3,
    },
    assistSub: {
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        fontSize: 11,
    },

    // Histórico & Dados (cards horizontais)
    recordCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
    },
    recordIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordTitle: {
        fontWeight: '800',
        fontSize: 14.5,
        color: Neo.colors.neutral[900],
    },
    recordSub: {
        color: Neo.colors.neutral[600],
        marginTop: 1,
    },

    // Em breve (subtle, texto)
    upcomingBlock: {
        marginTop: 28,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.06)',
    },
    upcomingLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: Neo.colors.neutral[500],
        letterSpacing: 1.4,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    upcomingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 4,
    },
    upcomingDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: Neo.colors.neutral[400],
    },
    upcomingText: {
        color: Neo.colors.neutral[600],
        fontSize: 12.5,
    },
});
