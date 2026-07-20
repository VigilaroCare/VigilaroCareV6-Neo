import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { useIsDark } from '../utils/ThemeContext';
import ScoreService from '../services/ScoreService';
import ProfileService from '../services/ProfileService';
import { AMBIENTES, hydrateChecklistItem } from '../data/mapeamento_dados';
import { getDynamicAreaName } from '../utils/ProfileFilterEngine';
import { t_field } from '../utils/getLocalizedField';

const STATUS_COLOR_BY_BAND = {
    maxima: '#16A34A',
    controle: '#16A34A',
    atencao: '#D97706',
    critico: '#DC2626',
    inicio: Neo.colors.neutral[500],
};

export default function HeroScoreCard({ scoreData, onPress, onOpenHomeXRay, heroHeadline, isExpanded = false }) {
    const { t, i18n } = useTranslation();
    const isDark = useIsDark();
    const [mapping, setMapping] = useState([]);

    const score = scoreData?.geral || 0;
    const banda = ScoreService.getBanda(score);
    const headline = heroHeadline || banda.headline;
    const scoreColor = STATUS_COLOR_BY_BAND[banda.key] || STATUS_COLOR_BY_BAND.inicio;
    const statsGeral = scoreData?.statsGeral || { total: 0, checked: 0, warning: 0, critical: 0 };
    const ambientesAllSorted = Object.entries(scoreData?.ambientes || {}).sort((a, b) => a[1] - b[1]);
    const ambientesSorted = ambientesAllSorted.slice(0, 6);
    const pendingAmbientes = ambientesAllSorted.filter(([id]) => {
        const stats = scoreData?.statsAmbientes?.[id];
        return !!stats && ((stats.warning || 0) > 0 || (stats.critical || 0) > 0 || (stats.failedItems || []).length > 0);
    });

    useEffect(() => {
        let mounted = true;
        ProfileService.getMapping()
            .then(data => {
                if (mounted) setMapping(data || []);
            })
            .catch(() => {
                if (mounted) setMapping([]);
            });
        return () => { mounted = false; };
    }, [scoreData]);

    const getAmbienteName = (id) => {
        const found = AMBIENTES.find(a => a.id === id);
        if (!found) return id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');

        const lang = i18n.language || 'pt-BR';
        let name = found.nome;
        if (lang.startsWith('en') && found.nome_en) name = found.nome_en;
        if (lang.startsWith('es') && found.nome_es) name = found.nome_es;
        return getDynamicAreaName(id, name, mapping, t);
    };

    const getScoreTextColor = (value) => {
        if (value >= 80) return Neo.colors.feedback.success;
        if (value >= 50) return '#B7791F';
        if (value > 0) return Neo.colors.feedback.error;
        return Neo.colors.neutral[500];
    };

    const getScoreBarColor = (value) => {
        if (value >= 80) return Neo.colors.feedback.success;
        if (value >= 50) return Neo.colors.feedback.warning;
        if (value > 0) return Neo.colors.feedback.error;
        return Neo.colors.neutral[300];
    };

    const getSegments = (stats, fallbackScore = 0) => {
        const total = stats?.total || 0;
        if (total <= 0) {
            return {
                safePct: Math.max(0, Math.min(100, fallbackScore)),
                warningPct: 0,
                criticalPct: 0,
            };
        }
        return {
            safePct: ((stats.checked || 0) / total) * 100,
            warningPct: ((stats.warning || 0) / total) * 100,
            criticalPct: ((stats.critical || 0) / total) * 100,
        };
    };

    const renderSegmentBar = (stats, height = 5, fallbackScore = 0) => {
        const { safePct, warningPct, criticalPct } = getSegments(stats, fallbackScore);
        const remainder = Math.max(0, 100 - safePct - warningPct - criticalPct);

        return (
            <View style={[styles.segmentTrack, { height, borderRadius: height / 2 }]}>
                {safePct > 0 && <View style={{ width: `${safePct}%`, backgroundColor: Neo.colors.feedback.success }} />}
                {warningPct > 0 && <View style={{ width: `${warningPct}%`, backgroundColor: Neo.colors.feedback.warning }} />}
                {criticalPct > 0 && <View style={{ width: `${criticalPct}%`, backgroundColor: Neo.colors.feedback.error }} />}
                {remainder > 0 && <View style={{ width: `${remainder}%`, backgroundColor: 'transparent' }} />}
            </View>
        );
    };

    const renderAmbienteItem = ([id, value]) => {
        const stats = scoreData?.statsAmbientes?.[id] || null;
        return (
            <View key={id} style={styles.ambienteRow}>
                <View style={[styles.ambienteDot, { backgroundColor: getScoreBarColor(value) }]} />
                <Text style={[styles.ambienteName, { color: mutedText }]} numberOfLines={1}>{getAmbienteName(id)}</Text>
                <View style={styles.ambienteBarWrap}>
                    {renderSegmentBar(stats, 4, value)}
                </View>
                <Text style={[styles.ambienteScore, { color: getScoreTextColor(value) }]}>{value}%</Text>
            </View>
        );
    };

    const renderPendingItem = ([id, value]) => {
        const stats = scoreData?.statsAmbientes?.[id] || {};
        const failedItems = stats.failedItems || [];
        const firstIssue = failedItems[0];
        const hydratedIssue = firstIssue ? hydrateChecklistItem(firstIssue) : null;
        const issueTitle = hydratedIssue ? t_field(hydratedIssue, 'titulo') : '';
        const issueTip = hydratedIssue ? t_field(hydratedIssue, 'dica') : '';
        const pendingCount = (stats.warning || 0) + (stats.critical || 0);
        const isCritical = firstIssue?.isCritical || (stats.critical || 0) > 0;
        const issueLabel = isCritical
            ? t('home.criticalRisk', 'Risco crítico')
            : t('home.attentionPoint', 'Ponto de atenção');
        const issueText = firstIssue
            ? (issueTip || t('home.verifyItem', {
                item: (issueTitle || getAmbienteName(id)).toLowerCase(),
                defaultValue: `Verifique: ${(issueTitle || getAmbienteName(id)).toLowerCase()}`,
            }))
            : t(pendingCount === 1 ? 'home.pendingItemOne' : 'home.pendingItemsMany', {
                count: pendingCount,
                defaultValue: pendingCount === 1 ? '1 pendência' : `${pendingCount} pendências`,
            });

        return (
            <View key={id} style={[styles.pendingRow, { borderTopColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(8, 68, 47, 0.12)' }]}>
                <View style={styles.pendingHeader}>
                    <View style={[styles.pendingDot, { backgroundColor: isCritical ? Neo.colors.feedback.error : Neo.colors.feedback.warning }]} />
                    <Text style={[styles.pendingName, { color: primaryText }]} numberOfLines={1}>{getAmbienteName(id)}</Text>
                    <Text style={[styles.pendingScore, { color: getScoreTextColor(value) }]}>{value}%</Text>
                </View>
                <Text style={[styles.pendingIssueLabel, { color: isCritical ? Neo.colors.feedback.error : '#B7791F' }]} numberOfLines={1}>
                    {issueLabel}
                </Text>
                <Text style={[styles.pendingIssueText, { color: mutedText }]} numberOfLines={2}>
                    {issueText}
                </Text>
            </View>
        );
    };

    const bgColors = isDark ? [Neo.colors.neutral[800], Neo.colors.neutral[900]] : ['#E1F4EA', '#C8EAD7'];
    const cardBorderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(8, 68, 47, 0.16)';
    const titleColor = isDark ? Neo.colors.neutral[100] : 'rgba(21, 52, 40, 0.78)';
    const primaryText = isDark ? Neo.colors.neutral[0] : Neo.colors.neutral[900];
    const mutedText = isDark ? Neo.colors.neutral[300] : 'rgba(48, 54, 47, 0.72)';
    const helperText = isDark ? Neo.colors.neutral[400] : Neo.colors.neutral[500];

    return (
        <LinearGradient
            colors={bgColors}
            style={[styles.card, { borderColor: cardBorderColor, borderWidth: isDark ? 1 : 1.5 }]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <TouchableOpacity
                activeOpacity={0.88}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityState={{ expanded: isExpanded }}
            >
                <Text style={[styles.heroTitle, { color: titleColor }]} numberOfLines={1}>
                    {t('home.inspectedEnvironments', 'Ambientes Vistoriados').toUpperCase()}
                </Text>

                <View style={styles.compactPanel}>
                    <View style={styles.compactMain}>
                        <View style={styles.scoreColumn}>
                            <Text style={[styles.scoreValue, { color: scoreColor }]} numberOfLines={1}>
                                {score}%
                            </Text>
                            <Text style={[styles.scoreHeadline, { color: primaryText }]} numberOfLines={2}>
                                {headline}
                            </Text>
                            <View style={styles.globalBarWrap}>
                                {renderSegmentBar(statsGeral, 8, score)}
                            </View>
                        </View>

                        <View style={styles.verticalDivider} />

                        <View style={styles.ambientesColumn}>
                            {ambientesSorted.length > 0 ? (
                                ambientesSorted.map(renderAmbienteItem)
                            ) : (
                                <Text style={[styles.noAmbienteText, { color: helperText }]}>{t('home.noInspectedEnvironment', 'Nenhum ambiente vistoriado.')}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.footerChevron}>
                        <NeoIcon
                            name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'}
                            size={18}
                            color={isDark ? Neo.colors.neutral[300] : 'rgba(8, 68, 47, 0.30)'}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isExpanded && (
                <View style={[styles.heroWell, { borderTopColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(8, 68, 47, 0.13)' }]}>
                    <Text style={[styles.pendingTitle, { color: titleColor }]} numberOfLines={1}>
                        {t('home.pendingEnvironmentsTitle', 'Ambientes com pendência')}
                    </Text>
                    {pendingAmbientes.length > 0 ? (
                        pendingAmbientes.map(renderPendingItem)
                    ) : (
                        <Text style={[styles.noPendingText, { color: mutedText }]}>
                            {t('home.noPendingEnvironments', 'Nenhum ambiente com pendência ativa.')}
                        </Text>
                    )}

                    {onOpenHomeXRay && (
                        <TouchableOpacity
                            style={[styles.xrayAction, { borderTopColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(8, 68, 47, 0.14)' }]}
                            activeOpacity={0.82}
                            onPress={onOpenHomeXRay}
                            accessibilityRole="button"
                            accessibilityLabel={t('home.homeXRay', 'Raio-X da Casa')}
                        >
                            <View style={[styles.xrayIconBox, { backgroundColor: isDark ? 'rgba(52, 211, 153, 0.16)' : 'rgba(8, 68, 47, 0.10)' }]}>
                                <NeoIcon name="Home2" size={17} color={isDark ? Neo.colors.primary[200] : Neo.colors.primary[800]} variant="Bold" />
                            </View>
                            <View style={styles.xrayTextGroup}>
                                <Text style={[styles.xrayTitle, { color: primaryText }]} numberOfLines={1}>
                                    {t('home.homeXRay', 'Raio-X da Casa')}
                                </Text>
                                <Text style={[styles.xraySubtitle, { color: mutedText }]} numberOfLines={1}>
                                    {t('home.homeXRayDesc', 'Resumo da casa, dos moradores e dos cômodos')}
                                </Text>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={isDark ? Neo.colors.neutral[300] : 'rgba(8, 68, 47, 0.48)'} />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 6,
        marginTop: 6,
        marginBottom: 2,
        shadowColor: '#073B2A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.14,
        shadowRadius: 18,
        elevation: 7,
    },
    heroTitle: {
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '900',
        letterSpacing: 0,
        marginBottom: 3,
    },
    compactPanel: {
        paddingHorizontal: 14,
        paddingTop: 7,
        paddingBottom: 1,
    },
    compactMain: {
        minHeight: 94,
        flexDirection: 'row',
        alignItems: 'center',
    },
    scoreColumn: {
        flex: 0.88,
        minWidth: 0,
        paddingRight: 12,
    },
    scoreValue: {
        fontSize: 40,
        lineHeight: 42,
        fontWeight: '900',
        letterSpacing: 0,
    },
    scoreHeadline: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0,
    },
    globalBarWrap: {
        marginTop: 11,
    },
    verticalDivider: {
        width: 1,
        height: 92,
        backgroundColor: 'rgba(8, 68, 47, 0.14)',
        marginRight: 12,
    },
    ambientesColumn: {
        flex: 1.42,
        justifyContent: 'center',
        minWidth: 0,
        paddingTop: 1,
    },
    ambienteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 15,
        marginBottom: 0,
    },
    ambienteDot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        marginRight: 6,
    },
    ambienteName: {
        width: 82,
        fontSize: 10.5,
        lineHeight: 13,
        fontWeight: '800',
    },
    ambienteBarWrap: {
        flex: 1,
        minWidth: 42,
        marginHorizontal: 7,
    },
    ambienteScore: {
        width: 32,
        textAlign: 'right',
        fontSize: 10.5,
        lineHeight: 13,
        fontWeight: '900',
    },
    segmentTrack: {
        flexDirection: 'row',
        overflow: 'hidden',
        backgroundColor: 'rgba(8, 68, 47, 0.10)',
    },
    noAmbienteText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
        textAlign: 'center',
    },
    footerChevron: {
        height: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
    },
    heroWell: {
        marginTop: 8,
        paddingTop: 8,
        paddingHorizontal: 14,
        borderTopWidth: 1,
    },
    pendingTitle: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0,
        marginBottom: 6,
    },
    pendingRow: {
        paddingVertical: 7,
        borderTopWidth: 1,
    },
    pendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    pendingDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        marginRight: 7,
    },
    pendingName: {
        flex: 1,
        minWidth: 0,
        fontSize: 13,
        lineHeight: 16,
        fontWeight: '900',
    },
    pendingScore: {
        marginLeft: 8,
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '900',
    },
    pendingIssueLabel: {
        fontSize: 10.5,
        lineHeight: 13,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0,
        marginBottom: 2,
    },
    pendingIssueText: {
        fontSize: 11.5,
        lineHeight: 15,
        fontWeight: '600',
    },
    noPendingText: {
        paddingTop: 2,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
    },
    xrayAction: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
        paddingTop: 9,
        paddingBottom: 1,
        borderTopWidth: 1,
    },
    xrayIconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    xrayTextGroup: {
        flex: 1,
        minWidth: 0,
    },
    xrayTitle: {
        fontSize: 13,
        lineHeight: 16,
        fontWeight: '900',
        letterSpacing: 0,
    },
    xraySubtitle: {
        marginTop: 1,
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '600',
    },
});
