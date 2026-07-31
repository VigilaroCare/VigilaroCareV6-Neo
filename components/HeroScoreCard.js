/**
 * HeroScoreCard.js — card do score da Home
 *
 * ── REVISÃO DE COR E ACESSIBILIDADE (2026-07) ─────────────────────────────
 * O card era a ÚNICA superfície tingida da Home: gradiente menta
 * ['#E1F4EA','#C8EAD7'] contra os oito tiles creme (#F4EBDC) e o lavado frio
 * do fundo. Medido: 1.01:1 de diferença de luminância entre o card e os tiles
 * — mesma claridade, temperaturas opostas, encostados. É isso que produzia a
 * sensação de "elemento colado por cima".
 *
 * Agora o card usa colors.tile.cream — o mesmo creme que os PNGs dos
 * pictogramas já carregam impresso. A tela passa de três superfícies para duas.
 *
 * Outras correções desta passagem:
 *  - colors.textOn.* no lugar de hex cravados. O laranja do score (#D97706)
 *    dava 2.63:1 sobre o menta: o número mais importante da tela era o texto
 *    menos legível dela.
 *  - useThemeColors() em vez do DS estático: o componente lia Neo.colors.*
 *    (paleta light) mesmo em dark, e Neo.colors.neutral[0] não existe em
 *    paleta nenhuma — primaryText saía undefined no dark.
 *  - Limiar único. getScoreTextColor/getScoreBarColor tinham 80/50 próprios,
 *    concorrendo com as faixas 90/70/40 do ScoreService.getBanda — a mesma
 *    duplicação que o docblock do serviço diz ter eliminado. Tudo consome
 *    getBanda agora. MUDANÇA DE COMPORTAMENTO: cômodo entre 70–79 passa de
 *    âmbar para verde, e entre 40–49 passa de vermelho para âmbar.
 *  - STATUS_COLOR_BY_BAND lia Neo.colors no escopo do módulo — o mesmo padrão
 *    que já derrubou o app no Hermes. Virou função pura do tema.
 *  - accessibilityLabel no card: antes o leitor de tela anunciava a subárvore
 *    inteira sem dizer o que o número significa.
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { useThemeColors } from '../utils/ThemeContext';
import ScoreService from '../services/ScoreService';
import ProfileService from '../services/ProfileService';
import { AMBIENTES, hydrateChecklistItem } from '../data/mapeamento_dados';
import { getDynamicAreaName } from '../utils/ProfileFilterEngine';
import { t_field } from '../utils/getLocalizedField';

/**
 * Faixa do score → tom semântico. Só o nome do tom mora aqui; a cor concreta
 * vem do tema em tempo de render, nunca do módulo.
 */
const TONE_BY_BAND = {
    maxima: 'success',
    controle: 'success',
    atencao: 'warning',
    critico: 'error',
    inicio: 'muted',
};

/**
 * Altura (px) que o modo compacto poupa. Exportada para que a Home possa
 * contabilizar essa poupanca ao decidir quanto o grid de pictogramas ainda
 * precisa encolher — se este numero mudar aqui, o calculo la acompanha.
 * 94 - 78 (minHeight) + 7 - 4 (paddingTop) = 19.
 */
// A altura do hero é ditada pela scoreColumn, não pelo minHeight:
//   scoreValue lineHeight 42 + headline (marginTop 4 + 2 linhas × 14 = 32)
//   + globalBarWrap marginTop 11 + barra 8  ≈  93px
// e o verticalDivider tem height: 92 rígido acompanhando isso.
//
// A primeira versão do modo compacto mexia só no minHeight (94 → 78) e por
// isso poupava 2px, não 19 — o divider de 92 segurava a altura. O grid de
// pictogramas acabou absorvendo a diferença toda e encolheu à vista.
// Agora o corte é onde a altura realmente mora:
//   scoreValue  42 → 36   (-6)
//   headline    marginTop 4 → 2, lineHeight 14 → 13 em 2 linhas   (-4)
//   barra       marginTop 11 → 7, altura 8 → 6   (-6)
//   paddingTop  7 → 4   (-3)
export const HERO_COMPACT_SAVING = 19;

/**
 * @param {boolean} compact - trima a altura do hero em aparelhos onde a barra
 *   de gestos consome espaco extra no fundo. Sem isso, a ultima fileira de
 *   pictogramas da Home fica escondida atras do footer flutuante.
 */
export default function HeroScoreCard({ scoreData, onPress, onOpenHomeXRay, heroHeadline, isExpanded = false, compact = false }) {
    const { t, i18n } = useTranslation();
    const colors = useThemeColors();
    const [mapping, setMapping] = useState([]);

    const score = scoreData?.geral || 0;
    const banda = ScoreService.getBanda(score);
    const headline = heroHeadline || banda.headline;
    const statsGeral = scoreData?.statsGeral || { total: 0, checked: 0, warning: 0, critical: 0 };
    const ambientesAllSorted = Object.entries(scoreData?.ambientes || {}).sort((a, b) => a[1] - b[1]);
    const ambientesSorted = ambientesAllSorted.slice(0, 6);
    const pendingAmbientes = ambientesAllSorted.filter(([id]) => {
        const stats = scoreData?.statsAmbientes?.[id];
        return !!stats && ((stats.warning || 0) > 0 || (stats.critical || 0) > 0 || (stats.failedItems || []).length > 0);
    });

    // ── Cores derivadas do tema ──────────────────────────────────────────
    const surface = colors.tile.cream;
    const borderColor = colors.tile.border;
    const borderWidth = colors.tile.borderWidth;
    const track = colors.tile.track;

    const inkText = colors.textOn.ink;
    const mutedText = colors.textOn.muted;

    /** Cor de TEXTO da faixa (>= 4.5:1 sobre o creme). */
    const bandTextColor = (value) => {
        const tone = TONE_BY_BAND[ScoreService.getBanda(value).key] || 'muted';
        return colors.textOn[tone];
    };

    /** Cor de PREENCHIMENTO da faixa — pontos e segmentos de barra. */
    const bandFillColor = (value) => {
        const tone = TONE_BY_BAND[ScoreService.getBanda(value).key] || 'muted';
        if (tone === 'muted') return colors.neutral[400];
        return colors.feedback[tone];
    };

    const scoreColor = bandTextColor(score);

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

    /**
     * Barra segmentada: proporção de itens verificados / em atenção / críticos.
     * Carrega informação que o número sozinho não dá — por isso os três
     * segmentos permanecem. O que saiu foi a redundância de cor ao redor dela.
     */
    const renderSegmentBar = (stats, height = 5, fallbackScore = 0) => {
        const { safePct, warningPct, criticalPct } = getSegments(stats, fallbackScore);
        const remainder = Math.max(0, 100 - safePct - warningPct - criticalPct);

        return (
            <View style={[styles.segmentTrack, { height, borderRadius: height / 2, backgroundColor: track }]}>
                {safePct > 0 && <View style={{ width: `${safePct}%`, backgroundColor: colors.feedback.success }} />}
                {warningPct > 0 && <View style={{ width: `${warningPct}%`, backgroundColor: colors.feedback.warning }} />}
                {criticalPct > 0 && <View style={{ width: `${criticalPct}%`, backgroundColor: colors.feedback.error }} />}
                {remainder > 0 && <View style={{ width: `${remainder}%`, backgroundColor: 'transparent' }} />}
            </View>
        );
    };

    const renderAmbienteItem = ([id, value]) => {
        const stats = scoreData?.statsAmbientes?.[id] || null;
        return (
            <View key={id} style={styles.ambienteRow}>
                <View style={[styles.ambienteDot, { backgroundColor: bandFillColor(value) }]} />
                <Text style={[styles.ambienteName, { color: mutedText }]} numberOfLines={1}>{getAmbienteName(id)}</Text>
                <View style={styles.ambienteBarWrap}>
                    {renderSegmentBar(stats, 4, value)}
                </View>
                <Text style={[styles.ambienteScore, { color: bandTextColor(value) }]}>{value}%</Text>
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
            <View key={id} style={[styles.pendingRow, { borderTopColor: track }]}>
                <View style={styles.pendingHeader}>
                    <View style={[styles.pendingDot, { backgroundColor: isCritical ? colors.feedback.error : colors.feedback.warning }]} />
                    <Text style={[styles.pendingName, { color: inkText }]} numberOfLines={1}>{getAmbienteName(id)}</Text>
                    <Text style={[styles.pendingScore, { color: bandTextColor(value) }]}>{value}%</Text>
                </View>
                <Text
                    style={[styles.pendingIssueLabel, { color: isCritical ? colors.textOn.error : colors.textOn.warning }]}
                    numberOfLines={1}
                >
                    {issueLabel}
                </Text>
                <Text style={[styles.pendingIssueText, { color: mutedText }]} numberOfLines={2}>
                    {issueText}
                </Text>
            </View>
        );
    };

    const sectionTitle = t('home.inspectedEnvironments', 'Ambientes Vistoriados');

    // O leitor de tela precisa do número COM o que ele significa. Antes,
    // anunciava a subárvore inteira sem dizer que 61% é o score da casa.
    const a11yLabel = t('home.scoreCardA11y', {
        section: sectionTitle,
        score,
        headline,
        defaultValue: `${sectionTitle}: ${score} por cento. ${headline}.`,
    });
    // Score 0: o poco ja fica sempre aberto (nada pra recolher), entao o hint
    // de expandir/recolher nao se aplica — auditoria UX 2026-07-30, achado 1.
    const a11yHint = score === 0
        ? undefined
        : (isExpanded
            ? t('home.collapsePending', 'Toque para recolher os ambientes com pendência')
            : t('home.expandPending', 'Toque para ver os ambientes com pendência'));

    return (
        <View
            style={[styles.card, { backgroundColor: surface, borderColor, borderWidth }]}
        >
            <TouchableOpacity
                activeOpacity={0.88}
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={a11yLabel}
                accessibilityHint={a11yHint}
                accessibilityState={{ expanded: isExpanded }}
            >
                <Text style={[styles.heroTitle, { color: mutedText }]} numberOfLines={1}>
                    {sectionTitle.toUpperCase()}
                </Text>

                {scoreData?.pendencias > 0 && (
                    <View style={styles.pendenciaPillWrap}>
                        <View style={[styles.pendenciaPill, { backgroundColor: colors.feedback.error }]}>
                            <NeoIcon name="Warning2" size={12} color={colors.neutral.white} variant="Bold" />
                            <Text style={styles.pendenciaPillText} numberOfLines={1}>
                                {t('home.pendenciasPill', {
                                    count: scoreData.pendencias,
                                    defaultValue: scoreData.pendencias === 1 ? '1 pendência' : `${scoreData.pendencias} pendências`,
                                })}
                            </Text>
                        </View>
                    </View>
                )}

                <View style={[styles.compactPanel, compact && styles.compactPanelTight]}>
                    <View style={[styles.compactMain, compact && styles.compactMainTight]}>
                        <View style={styles.scoreColumn}>
                            <Text style={[styles.scoreValue, compact && styles.scoreValueTight, { color: scoreColor }]} numberOfLines={1}>
                                {score}%
                            </Text>
                            <Text style={[styles.scoreHeadline, compact && styles.scoreHeadlineTight, { color: inkText }]} numberOfLines={2}>
                                {headline}
                            </Text>
                            <View style={[styles.globalBarWrap, compact && styles.globalBarWrapTight]}>
                                {renderSegmentBar(statsGeral, compact ? 6 : 8, score)}
                            </View>
                        </View>

                        <View style={[styles.verticalDivider, compact && styles.verticalDividerTight, { backgroundColor: track }]} />

                        <View style={styles.ambientesColumn}>
                            {ambientesSorted.length > 0 ? (
                                ambientesSorted.map(renderAmbienteItem)
                            ) : (
                                <Text style={[styles.noAmbienteText, { color: mutedText }]}>
                                    {t('home.noInspectedEnvironment', 'Nenhum ambiente vistoriado.')}
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.footerChevron}>
                        <NeoIcon
                            name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'}
                            size={18}
                            color={mutedText}
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {(isExpanded || score === 0) && (
                <View style={[styles.heroWell, { borderTopColor: track }]}>
                    {score === 0 ? (
                        <Text style={[styles.noPendingText, { color: mutedText }]}>
                            {ScoreService.getMensagemImpacto(score, scoreData?.pendencias || 0).alerta}
                        </Text>
                    ) : (
                        <>
                            <Text style={[styles.pendingTitle, { color: mutedText }]} numberOfLines={1}>
                                {t('home.pendingEnvironmentsTitle', 'Ambientes com pendência')}
                            </Text>
                            {pendingAmbientes.length > 0 ? (
                                pendingAmbientes.map(renderPendingItem)
                            ) : (
                                <Text style={[styles.noPendingText, { color: mutedText }]}>
                                    {t('home.noPendingEnvironments', 'Nenhum ambiente com pendência ativa.')}
                                </Text>
                            )}
                        </>
                    )}

                    {onOpenHomeXRay && (
                        <TouchableOpacity
                            style={[styles.xrayAction, { borderTopColor: track }]}
                            activeOpacity={0.82}
                            onPress={onOpenHomeXRay}
                            accessibilityRole="button"
                            accessibilityLabel={t('home.homeXRay', 'Raio-X da Casa')}
                        >
                            <View style={[styles.xrayIconBox, { backgroundColor: track }]}>
                                <NeoIcon name="Home2" size={17} color={colors.textOn.brand} variant="Bold" />
                            </View>
                            <View style={styles.xrayTextGroup}>
                                <Text style={[styles.xrayTitle, { color: inkText }]} numberOfLines={1}>
                                    {t('home.homeXRay', 'Raio-X da Casa')}
                                </Text>
                                <Text style={[styles.xraySubtitle, { color: mutedText }]} numberOfLines={1}>
                                    {t('home.homeXRayDesc', 'Resumo da casa, dos moradores e dos cômodos')}
                                </Text>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={mutedText} />
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
}

/**
 * Nenhuma cor mora aqui. StyleSheet.create roda no escopo do módulo, antes de
 * o tema existir — cor sai como prop inline, sempre.
 */
const styles = StyleSheet.create({
    card: {
        borderRadius: Neo.radius.lg,
        paddingHorizontal: 12,
        paddingTop: 4,
        paddingBottom: 6,
        marginTop: 6,
        marginBottom: 2,
        // Sombra discreta: os tiles de pictograma são planos com moldura, e o
        // card do score agora pertence à mesma família.
        ...Neo.shadows.sm,
    },
    heroTitle: {
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '700',
        letterSpacing: 1.2,
        marginBottom: 3,
    },
    // Selo de pendencias — so aparece quando ha alguma (soma zero visual em
    // relacao ao card de hoje quando pendencias=0). Consolidado aqui em vez
    // de duplicado num tile do grid, a pedido do Agnaldo (2026-07-30): o Hero
    // ja e "o campo onde aparecem as pendencias", nao faz sentido replicar.
    pendenciaPillWrap: {
        alignItems: 'center',
        marginBottom: 6,
    },
    pendenciaPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    pendenciaPillText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '800',
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
    // ── MODO COMPACTO ───────────────────────────────────────────────────────
    // Ver HERO_COMPACT_SAVING no topo do ficheiro: a soma destes cortes tem de
    // bater com aquela constante, senao a Home calcula errado quanto o grid
    // de pictogramas ainda precisa ceder.
    compactPanelTight: {
        paddingTop: 4,          // era 7   (-3)
    },
    compactMainTight: {
        minHeight: 78,          // deixa de ser o limitante
    },
    scoreValueTight: {
        fontSize: 34,           // era 40
        lineHeight: 36,         // era 42  (-6)
    },
    scoreHeadlineTight: {
        marginTop: 2,           // era 4   (-2)
        lineHeight: 13,         // era 14  (-2 em 2 linhas)
    },
    globalBarWrapTight: {
        marginTop: 7,           // era 11  (-4)
    },                          // + barra 8 → 6 (-2), passada em renderSegmentBar
    verticalDividerTight: {
        height: 73,             // era 92; acompanha a coluna encolhida
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
    // flex em vez de width fixa: "Lavanderia / Área de Serviço" truncava em
    // 82dp mesmo sobrando espaço na linha.
    ambienteName: {
        flex: 1,
        minWidth: 0,
        fontSize: 10.5,
        lineHeight: 13,
        fontWeight: '800',
    },
    ambienteBarWrap: {
        width: 46,
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
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
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