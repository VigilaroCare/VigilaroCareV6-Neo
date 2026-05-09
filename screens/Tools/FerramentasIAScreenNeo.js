/**
 * FerramentasIAScreenNeo.js
 * Central de Ferramentas com IA — Vigilaro Care V6 Neo
 *
 * Correções aplicadas (Lote Maio — Task 5):
 * - Todas as strings hardcoded dos grupos "Análise Visual", "Assistentes" e
 *   "Chegando em breve" envolvidas em t() com chaves ferramentasIA.*
 * - Títulos, subtítulos, descrições e labels de cada ferramenta internacionalizados
 * - Import de Text nativo (usado apenas no banner contextual) mantido pois era
 *   intencional no original — comentário preservado
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Iconsax
import {
    ScanBarcode,
    Microphone2,
    ChemicalGlass,
    Map,
    Bubble,
    Flashy,
    ArrowRight2,
    ShieldTick,
} from 'iconsax-react-native';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import NeoText, { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import FadeInView from '../../components/FadeInView';
import { getFamilySummary } from '../../services/InfoRotulosRuleEngine';

const { width } = Dimensions.get('window');

export default function FerramentasIAScreenNeo() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const [familySummary, setFamilySummary] = useState(null);

    useEffect(() => {
        getFamilySummary().then(setFamilySummary).catch(() => {});
    }, []);

    // ── Grupo: Análise Visual ──
    const analysisTools = [
        {
            id: 'scanner',
            title: t('ferramentasIA.scannerAmbienteTitle', 'Scanner Ambiente'),
            subtitle: t('ferramentasIA.scannerAmbienteSubtitle', 'Análise Visual IA'),
            description: t('ferramentasIA.scannerAmbienteDesc', 'Aponte a câmera para analisar riscos de queda, objetos perigosos e condições do ambiente.'),
            icon: ScanBarcode,
            color: '#4CAF50',
            route: 'Scanner',
        },
    ];

    // ── Grupo: Assistentes ──
    const assistantTools = [
        {
            id: 'voice',
            title: t('ferramentasIA.voiceTitle', 'Vigilaro Voice'),
            subtitle: t('ferramentasIA.voiceSubtitle', 'Assistente de Áudio'),
            description: t('ferramentasIA.voiceDesc', 'Converse por voz com a IA de segurança para tirar dúvidas imediatas.'),
            icon: Microphone2,
            color: '#9C27B0',
            route: 'AssistentePrevencaoIA',
        },
        {
            id: 'text',
            title: t('ferramentasIA.chatTitle', 'Vigilaro Chat'),
            subtitle: t('ferramentasIA.chatSubtitle', 'Dúvidas e Orientações'),
            description: t('ferramentasIA.chatDesc', 'Assistente textual rápido para dicas de segurança e protocolos.'),
            icon: Bubble,
            color: '#2196F3',
            route: 'AITextChat',
        },
    ];

    // ── Chegando em breve ──
    const upcomingTools = [
        {
            id: 'audio_detect',
            title: t('ferramentasIA.detectorTitle', 'Detector Ambiente'),
            description: t('ferramentasIA.detectorDesc', 'Analisa ruídos (ex: choro, vidro quebrando) e nível de segurança luminosa do cômodo.'),
            icon: Flashy,
            color: '#607D8B',
        },
        {
            id: 'heatmap',
            title: t('ferramentasIA.heatmapTitle', 'Mapa de Calor IA'),
            description: t('ferramentasIA.heatmapDesc', 'Mapeamento topográfico 3D dos pontos cegos e áreas de risco da sua casa.'),
            icon: Map,
            color: '#E91E63',
        },
    ];

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowRight2
                            size={24}
                            color={Neo.colors.neutral[800]}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </TouchableOpacity>
                    <View>
                        <H2>{t('headersFirst.ferramentasIA', 'Ferramentas IA')}</H2>
                        <Caption>{t('headersFirst.caniveteSuODeSeguranA', 'Canivete suíço de segurança')}</Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* ═══ ANÁLISE VISUAL ═══ */}
                    <FadeInView delay={100}>
                        <NeoText style={styles.sectionTitle}>
                            {t('ferramentasIA.sectionAnaliseVisual', 'Análise Visual')}
                        </NeoText>
                        {analysisTools.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate(item.route)}
                                style={styles.cardWrapper}
                            >
                                <NeoCard
                                    variant="elevated"
                                    style={[styles.toolCard, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', borderBottomWidth: 3, borderBottomColor: item.color }]}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                                        <item.icon size={28} color={item.color} variant="Bulk" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <H3 style={styles.toolTitle}>{item.title}</H3>
                                        <Caption style={styles.toolSubtitle}>{item.subtitle}</Caption>
                                        <Small style={styles.toolDesc} numberOfLines={3}>{item.description}</Small>
                                    </View>
                                </NeoCard>
                            </TouchableOpacity>
                        ))}
                    </FadeInView>

                    {/* ═══ ASSISTENTES ═══ */}
                    <FadeInView delay={200}>
                        <NeoText style={[styles.sectionTitle, { marginTop: Neo.spacing.lg }]}>
                            {t('ferramentasIA.sectionAssistentes', 'Assistentes')}
                        </NeoText>
                        <View style={styles.assistantGrid}>
                            {assistantTools.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate(item.route)}
                                    style={styles.assistantCard}
                                >
                                    <NeoCard
                                        variant="elevated"
                                        style={[
                                            styles.assistantInner,
                                            { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', borderBottomWidth: 3, borderBottomColor: item.color },
                                        ]}
                                    >
                                        <View style={[
                                            styles.iconContainer,
                                            { backgroundColor: item.color + '15', marginRight: 0, marginBottom: 8 },
                                        ]}>
                                            <item.icon size={24} color={item.color} variant="Bulk" />
                                        </View>
                                        <H3 style={[styles.toolTitle, { fontSize: 14, textAlign: 'center' }]}>
                                            {item.title}
                                        </H3>
                                        <Caption style={[styles.toolSubtitle, { textAlign: 'center' }]}>
                                            {item.subtitle}
                                        </Caption>
                                    </NeoCard>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </FadeInView>

                    {/* ═══ HISTÓRICO ═══ */}
                    <FadeInView delay={250}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Historico')}
                            style={{ marginTop: Neo.spacing.md }}
                        >
                            <NeoCard variant="elevated" style={[styles.historyRow, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }]}>
                                <View style={[styles.iconContainer, { backgroundColor: '#FF980015' }]}>
                                    <ChemicalGlass size={24} color="#FF9800" variant="Bulk" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <H3 style={[styles.toolTitle, { fontSize: 15 }]}>
                                        {t('headersFirst.histRicoAnalTico', 'Histórico Analítico')}
                                    </H3>
                                    <Caption style={styles.toolSubtitle}>
                                        {t('headersFirst.resultadosSalvos', 'Resultados salvos')}
                                    </Caption>
                                </View>
                                <ArrowRight2 size={18} color={Neo.colors.neutral[400]} />
                            </NeoCard>
                        </TouchableOpacity>
                    </FadeInView>

                    {/* ═══ DIAGNÓSTICO ═══ */}
                    <FadeInView delay={275}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('DataHealth')}
                            style={{ marginTop: Neo.spacing.md }}
                        >
                            <NeoCard variant="elevated" style={[styles.historyRow, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }]}>
                                <View style={[styles.iconContainer, { backgroundColor: '#4CAF5015' }]}>
                                    <ShieldTick size={24} color="#4CAF50" variant="Bulk" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <H3 style={[styles.toolTitle, { fontSize: 15 }]}>
                                        Saúde dos Dados
                                    </H3>
                                    <Caption style={styles.toolSubtitle}>
                                        Diagnóstico de integridade
                                    </Caption>
                                </View>
                                <ArrowRight2 size={18} color={Neo.colors.neutral[400]} />
                            </NeoCard>
                        </TouchableOpacity>
                    </FadeInView>

                    {/* ═══ EM BREVE ═══ */}
                    <FadeInView delay={300}>
                        <NeoText style={[styles.sectionTitle, { marginTop: Neo.spacing.xl, color: Neo.colors.neutral[400] }]}>
                            {t('ferramentasIA.sectionEmBreve', 'Chegando em breve')}
                        </NeoText>

                        <View style={styles.upcomingContainer}>
                            {upcomingTools.map((item) => (
                                <View key={item.id} style={styles.upcomingItem}>
                                    <View style={[
                                        styles.iconContainer,
                                        { backgroundColor: '#F0F0F0', marginRight: 16, opacity: 0.6 },
                                    ]}>
                                        <item.icon size={24} color={item.color} variant="Linear" />
                                    </View>
                                    <View style={{ flex: 1, opacity: 0.7 }}>
                                        <H3 style={{ fontSize: 15, color: Neo.colors.neutral[600] }}>
                                            {item.title}
                                        </H3>
                                        <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>
                                            {item.description}
                                        </Small>
                                    </View>
                                    <View style={styles.lockBadge}>
                                        <Small style={{ color: '#999', fontSize: 9, fontWeight: 'bold' }}>
                                            {t('headersFirst.eMBREVE', 'EM BREVE')}
                                        </Small>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </FadeInView>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.md,
        paddingBottom: Neo.spacing.sm,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Neo.spacing.md,
    },
    scrollContent: {
        padding: Neo.spacing.lg,
        paddingBottom: 100,
    },

    // Section titles
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: Neo.colors.neutral[500],
        marginBottom: Neo.spacing.md,
        letterSpacing: 0.5,
    },

    // Tool cards
    cardWrapper: {
        width: '100%',
        marginBottom: 12,
    },
    toolCard: {
        flexDirection: 'row',
        padding: Neo.spacing.md,
        borderRadius: 24,
        alignItems: 'center',
        minHeight: 100,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    toolTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
    },
    toolSubtitle: {
        fontSize: 12,
        color: Neo.colors.neutral[500],
        marginBottom: 4,
    },
    toolDesc: {
        color: Neo.colors.neutral[600],
        lineHeight: 18,
    },

    // Assistants grid (2 col)
    assistantGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    assistantCard: {
        flex: 1,
    },
    assistantInner: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: Neo.spacing.md,
        borderRadius: 20,
        minHeight: 130,
    },

    // History row
    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Neo.spacing.md,
        borderRadius: 20,
    },

    // Upcoming
    upcomingContainer: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 24,
        padding: Neo.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    upcomingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)',
    },
    lockBadge: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginLeft: 8,
    },
});