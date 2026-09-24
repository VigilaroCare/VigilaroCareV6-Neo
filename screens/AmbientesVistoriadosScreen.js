import { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import { AMBIENTES, hydrateChecklistItem } from '../data/mapeamento_dados';
import { t_field } from '../utils/getLocalizedField';
import { getDynamicAreaName } from '../utils/ProfileFilterEngine';
import ProfileService from '../services/ProfileService';
import ScoreService from '../services/ScoreService';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import i18n from '../i18n';

export default function AmbientesVistoriadosScreen({ navigation, route }) {
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const scoreData = route?.params?.scoreData || { geral: 0, ambientes: {}, statsAmbientes: {}, statsGeral: {} };
    const [mapping, setMapping] = useState([]);

    useEffect(() => {
        ProfileService.getMapping().then(m => setMapping(m || [])).catch(() => {});
    }, []);

    // Limiar do ScoreService, nunca local: com 80/50 aqui, um score 75 saia
    // verde no hero da Home e ambar nesta tela, para o mesmo ambiente.
    const TOM_FEEDBACK = {
        success: Neo.colors.feedback.success,
        warning: Neo.colors.feedback.warning,
        error: Neo.colors.feedback.error,
        muted: Neo.colors.neutral[500],
    };

    const getScoreColor = (s) => TOM_FEEDBACK[ScoreService.getTom(s)];

    // A frase também vinha de limiar próprio, repetindo o que o ScoreService
    // já decide. Aqui só mora o de-para banda → chave de tradução.
    const FRASE_POR_BANDA = {
        maxima:   'home.homeSafe',
        controle: 'home.homeSafe',
        atencao:  'home.homeNeedsAttention',
        critico:  'home.actImmediately',
        inicio:   'home.actImmediately',
    };

    const getScoreTextColor = (s) => {
        const tom = ScoreService.getTom(s);
        // ambar de TEXTO e mais escuro que o de preenchimento, por contraste
        return tom === 'warning' ? '#B7791F' : TOM_FEEDBACK[tom];
    };

    const getAmbienteName = (id) => {
        const found = AMBIENTES.find(a => a.id === id);
        if (found) {
            const lang = i18n.language || 'pt-BR';
            let name = found.nome;
            if (lang.startsWith('en') && found.nome_en) name = found.nome_en;
            else if (lang.startsWith('es') && found.nome_es) name = found.nome_es;
            return getDynamicAreaName(id, name, mapping, t);
        }
        return id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');
    };

    const ambientesSorted = scoreData.ambientes
        ? Object.entries(scoreData.ambientes).sort((a, b) => a[1] - b[1])
        : [];

    const globalStats = scoreData.statsGeral || { total: 1, checked: 1, warning: 0, critical: 0 };
    const score = scoreData.geral || 0;

    const renderLinearBar = (stats, height = 6) => {
        const total = stats?.total || 1;
        const safePct = (stats?.checked || 0) / total * 100;
        const warningPct = (stats?.warning || 0) / total * 100;
        const criticalPct = (stats?.critical || 0) / total * 100;

        return (
            <View style={{ height, backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', borderRadius: height / 2, flexDirection: 'row', overflow: 'hidden' }}>
                {safePct > 0 && <View style={{ width: `${safePct}%`, backgroundColor: Neo.colors.feedback.success }} />}
                {warningPct > 0 && <View style={{ width: `${warningPct}%`, backgroundColor: Neo.colors.feedback.warning }} />}
                {criticalPct > 0 && <View style={{ width: `${criticalPct}%`, backgroundColor: Neo.colors.feedback.error }} />}
            </View>
        );
    };

    const renderAmbienteCard = ([id, s]) => {
        const stats = scoreData.statsAmbientes?.[id] || { total: 1, checked: 1, warning: 0, critical: 0, failedItems: [] };
        const failedItems = stats.failedItems || [];

        return (
            <View key={id} style={[styles.ambienteCard, { backgroundColor: isDark ? Neo.colors.neutral[800] : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                <View style={styles.ambienteHeader}>
                    <View style={styles.ambienteNameRow}>
                        <View style={[styles.dot, { backgroundColor: getScoreColor(s) }]} />
                        <Text style={[styles.ambienteName, { color: isDark ? '#FFFFFF' : Neo.colors.neutral[900] }]}>{getAmbienteName(id)}</Text>
                    </View>
                    <Text style={[styles.ambienteScore, { color: getScoreTextColor(s) }]}>{s}%</Text>
                </View>
                <View style={{ marginTop: 8 }}>
                    {renderLinearBar(stats, 6)}
                </View>
                <View style={styles.statsRow}>
                    <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                        {t('home.labelSafe', { pct: Math.round((stats?.checked || 0) / (stats?.total || 1) * 100) })}
                    </Text>
                    <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                        {t('home.labelAttention', { pct: Math.round((stats?.warning || 0) / (stats?.total || 1) * 100) })}
                    </Text>
                    <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                        {t('home.labelCritical', { pct: Math.round((stats?.critical || 0) / (stats?.total || 1) * 100) })}
                    </Text>
                </View>
                {failedItems.length > 0 && (
                    <View style={[styles.alertBox, { borderLeftColor: failedItems[0].isCritical ? Neo.colors.feedback.error : Neo.colors.feedback.warning }]}>
                        <Text style={[styles.alertTitle, { color: isDark ? '#FFFFFF' : Neo.colors.neutral[800] }]}>
                            {failedItems[0].isCritical ? t('home.criticalRisk', '⚠️ Risco Crítico:') : t('home.attentionPoint', '⚠️ Ponto de Atenção:')}
                        </Text>
                        <Text style={[styles.alertText, { color: isDark ? '#D4D4D8' : Neo.colors.neutral[700] }]}>
                            {failedItems[0].dica || t('home.verifyItem', {
                                item: t_field(hydrateChecklistItem(failedItems[0]), 'titulo').toLowerCase(),
                                defaultValue: `Verifique: ${t_field(hydrateChecklistItem(failedItems[0]), 'titulo').toLowerCase()}`
                            })}
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <NeoIcon name="ArrowLeft" size={22} color={isDark ? '#FFFFFF' : Neo.colors.neutral[900]} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : Neo.colors.neutral[900] }]}>
                        {t('home.inspectedEnvironments', 'Ambientes Vistoriados')}
                    </Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Score Global */}
                    <View style={[styles.globalCard, { backgroundColor: isDark ? Neo.colors.neutral[800] : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }]}>
                        <View style={styles.globalRow}>
                            <View>
                                <Text style={[styles.globalScore, { color: getScoreTextColor(score) }]}>{score}%</Text>
                                <View style={styles.globalSubRow}>
                                    <NeoIcon name="ShieldTick" variant="Bold" size={14} color={getScoreTextColor(score)} />
                                    <Text style={[styles.globalSubtitle, { color: isDark ? '#A1A1AA' : 'rgba(120, 80, 40, 0.80)' }]}>
                                        {t(FRASE_POR_BANDA[ScoreService.getBanda(score).key] || 'home.actImmediately')}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[styles.ambienteCount, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                                {ambientesSorted.length} {ambientesSorted.length === 1 ? t('home.environment', 'ambiente') : t('home.environments', 'ambientes')}
                            </Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            {renderLinearBar(globalStats, 8)}
                        </View>
                        <View style={styles.statsRow}>
                            <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                                {t('home.labelSafe', { pct: Math.round((globalStats?.checked || 0) / (globalStats?.total || 1) * 100) })}
                            </Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                                {t('home.labelAttention', { pct: Math.round((globalStats?.warning || 0) / (globalStats?.total || 1) * 100) })}
                            </Text>
                            <Text style={[styles.statLabel, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                                {t('home.labelCritical', { pct: Math.round((globalStats?.critical || 0) / (globalStats?.total || 1) * 100) })}
                            </Text>
                        </View>
                    </View>

                    {/* Lista de Ambientes */}
                    {ambientesSorted.length > 0 ? (
                        ambientesSorted.map(item => renderAmbienteCard(item))
                    ) : (
                        <View style={styles.emptyState}>
                            <NeoIcon name="SearchNormal1" size={40} color={isDark ? '#52525B' : Neo.colors.neutral[300]} />
                            <Text style={[styles.emptyText, { color: isDark ? '#A1A1AA' : Neo.colors.neutral[500] }]}>
                                {t('home.noInspectedEnvironment', 'Nenhum ambiente vistoriado.')}
                            </Text>
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    globalCard: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
    },
    globalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    globalScore: {
        fontSize: 36,
        fontWeight: '800',
        lineHeight: 38,
    },
    globalSubRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 4,
    },
    globalSubtitle: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0,
        textTransform: 'uppercase',
    },
    ambienteCount: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    statLabel: {
        fontSize: 9,
        fontWeight: '600',
    },
    ambienteCard: {
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 10,
    },
    ambienteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ambienteNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    ambienteName: {
        fontSize: 14,
        fontWeight: '700',
    },
    ambienteScore: {
        fontSize: 16,
        fontWeight: '900',
        marginLeft: 8,
    },
    alertBox: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.03)',
        borderRadius: 8,
        borderLeftWidth: 3,
    },
    alertTitle: {
        fontSize: 11,
        fontWeight: '800',
        marginBottom: 2,
    },
    alertText: {
        fontSize: 11,
        lineHeight: 15,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
    emptyText: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
    },
});
