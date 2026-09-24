/**
 * AmbienteRiscoScreen.js — Detalhe de risco de um ambiente
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Destino do toque no Mapa de Riscos. Responde, para UM ambiente: quais são os
 * pontos de atenção, de que categoria, e — o diferencial — POR QUE cada um se
 * aplica a esta casa e a quem.
 *
 * Antes, o mapa levava direto ao checklist. Dois problemas: duplicava um
 * caminho que a Home já oferece, e transformava o diagnóstico em índice de
 * questionário. Aqui a vistoria vira o CTA do fim da página — ação disponível,
 * não destino obrigatório.
 *
 * Nenhum estado de vistoria é lido: tudo vem do RiscoService, que analisa os
 * dados declarados (moradia + moradores).
 *
 * Anatomia Editorial: 3º nível (folha) — header fixo, hero-lead, seções de
 * conteúdo, CTA no fim do scroll.
 */
import { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import EmptyState from '../../components/EmptyState';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import TappablePressable from '../../components/TappablePressable';
import { Body, Small, Caption, Eyebrow, H3 } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { t_field } from '../../utils/getLocalizedField';

import RiscoService from '../../services/RiscoService';
import { CATEGORIAS_RISCO, CATEGORIA_PREPARACAO, SEVERIDADES } from '../../data/categoriasRisco';

// Severidade → chave em themeColors.textOn (existe nos 4 temas).
const SEV_TEXT = { alta: 'error', media: 'warning', baixa: 'muted' };

export default function AmbienteRiscoScreen({ navigation, route }) {
    const { areaId, areaNome } = route.params || {};
    const { t } = useTranslation('common');
    const colors = useThemeColors();
    const isDark = useIsDark();

    const [loading, setLoading] = useState(true);
    const [dados, setDados] = useState(null);

    useFocusEffect(useCallback(() => {
        let vivo = true;
        (async () => {
            setLoading(true);
            const d = await RiscoService.getAmbiente(areaId);
            if (vivo) { setDados(d); setLoading(false); }
        })();
        return () => { vivo = false; };
    }, [areaId]));

    const nome = dados ? t_field(dados.ambiente, 'nome') : (areaNome || '');

    // A vistoria deste ambiente: ação oferecida, não destino do mapa.
    // Params no contrato da ChecklistDetail (roomId/roomName).
    const irParaVistoria = () => {
        navigation.navigate('ChecklistDetail', {
            roomId: dados.id,
            roomName: nome,
            roomColor: dados.ambiente.cor,
            roomIcon: dados.ambiente.emoji,
        });
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={s.safe}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={nome}
                    subtitle={dados ? t('mapaRiscos.title', 'Mapa de riscos') : undefined}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <View style={s.loading}><ActivityIndicator color={colors.primary[600]} /></View>
                    ) : !dados ? (
                        <EmptyState
                            icon="Warning2"
                            title={t('ambienteRisco.erroTitle', 'Ambiente indisponível')}
                            description={t('ambienteRisco.erroDesc', 'Não foi possível analisar este ambiente com os dados atuais.')}
                        />
                    ) : (
                        <>
                            {/* ── LEAD ─────────────────────────────────────── */}
                            <NeoCard variant="premium" style={s.lead}>
                                <Body style={[s.leadTexto, { color: colors.neutral[800] }]}>
                                    {t('ambienteRisco.lead', {
                                        count: dados.totalPontos,
                                        defaultValue: 'De acordo com as informações da sua moradia e dos moradores, encontramos {{count}} ponto(s) de atenção neste ambiente.',
                                    })}
                                </Body>

                                {/* Por que o cômodo entrou no mapa (quarto de idoso
                                    existe por causa da idosa, e por aí vai). */}
                                {dados.motivo.origem === 'morador' && dados.motivo.perfis.length > 0 && (
                                    <View style={[s.motivoBox, { backgroundColor: colors.categoria.ardosia.tint }]}>
                                        <NeoIcon name="InfoCircle" size={15} color={colors.categoria.ardosia.fill} variant="Bold" />
                                        <Small style={[s.motivoTexto, { color: colors.categoria.ardosia.texto }]}>
                                            {t('ambienteRisco.motivoMorador', {
                                                nomes: dados.motivo.perfis.map(p => p.primeiroNome).join(', '),
                                                defaultValue: 'Este ambiente entra no mapa por causa de {{nomes}}.',
                                            })}
                                        </Small>
                                    </View>
                                )}

                                <View style={s.ocupantesBloco}>
                                    <Caption style={[s.ocupantesLabel, { color: colors.textOn.muted }]}>
                                        {t('ambienteRisco.ocupantesLabel', 'Quem usa este ambiente')}
                                    </Caption>
                                    {dados.ocupantes.length > 0 ? (
                                        <View style={s.ocupantesRow}>
                                            {dados.ocupantes.map(p => (
                                                <View key={p.id} style={[s.pessoaChip, { backgroundColor: colors.neutral[200] }]}>
                                                    <Caption style={[s.pessoaTexto, { color: colors.neutral[800] }]}>
                                                        {p.primeiroNome}
                                                    </Caption>
                                                </View>
                                            ))}
                                        </View>
                                    ) : (
                                        <Caption style={{ color: colors.textOn.muted, lineHeight: 16 }}>
                                            {t('ambienteRisco.semOcupantes', 'Ninguém declarou usar este ambiente. Se isso mudou, atualize em Quem Proteger.')}
                                        </Caption>
                                    )}
                                </View>
                            </NeoCard>

                            {/* ── CATEGORIAS DE RISCO ──────────────────────── */}
                            {dados.categorias.map(cat => (
                                <SecaoCategoria
                                    key={cat.id}
                                    meta={CATEGORIAS_RISCO[cat.id]}
                                    cat={cat}
                                    colors={colors}
                                    t={t}
                                />
                            ))}

                            {/* ── PREPARAÇÃO (barreira, não agente) ────────── */}
                            {dados.preparacao && (
                                <SecaoCategoria
                                    meta={CATEGORIA_PREPARACAO}
                                    cat={dados.preparacao}
                                    colors={colors}
                                    t={t}
                                    neutra
                                />
                            )}

                            {/* ── CTA: a vistoria como ação, não como destino ── */}
                            <TappablePressable
                                onPress={irParaVistoria}
                                style={[s.cta, { backgroundColor: colors.primary[600] }]}
                                accessibilityLabel={t('ambienteRisco.ctaVistoria', 'Vistoriar este ambiente')}
                            >
                                <NeoIcon name="ClipboardText" size={19} color={colors.neutral.white} variant="Bold" />
                                <H3 style={[s.ctaTexto, { color: colors.neutral.white }]}>
                                    {t('ambienteRisco.ctaVistoria', 'Vistoriar este ambiente')}
                                </H3>
                            </TappablePressable>
                            <Caption style={[s.ctaNota, { color: colors.textOn.muted }]}>
                                {t('ambienteRisco.ctaVistoriaNota', 'A vistoria confere, item a item, o que está listado aqui.')}
                            </Caption>
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// Subcomponentes
// ════════════════════════════════════════════════════════════════════════════

function SecaoCategoria({ meta, cat, colors, t, neutra }) {
    // Preparação não é agente de risco: sem cor de categoria, por desenho.
    const tom = neutra || !meta.tomDS ? null : colors.categoria[meta.tomDS];
    const corIcone = tom ? tom.fill : colors.textOn.brand;
    const fundoIcone = tom ? tom.tint : colors.neutral[200];

    return (
        <>
            <Eyebrow style={[s.eyebrow, { color: colors.textOn.muted }]}>
                {t(meta.labelKey, meta.label)}
            </Eyebrow>
            <NeoCard variant="glass" style={s.secao}>
                <View style={s.secaoHeader}>
                    <View style={[s.secaoIcone, { backgroundColor: fundoIcone }]}>
                        <NeoIcon name={meta.icone} size={18} color={corIcone} variant="Bold" />
                    </View>
                    <Small style={[s.secaoDesc, { color: colors.neutral[700] }]}>
                        {t(meta.descKey, meta.desc)}
                    </Small>
                </View>

                <View style={[s.divisorH, { backgroundColor: colors.neutral[300] }]} />

                {cat.pontos.map((p, i) => (
                    <Ponto
                        key={`${p.item.titulo}-${i}`}
                        ponto={p}
                        colors={colors}
                        t={t}
                        primeiro={i === 0}
                    />
                ))}
            </NeoCard>
        </>
    );
}

function Ponto({ ponto, colors, t, primeiro }) {
    const sev = SEVERIDADES[ponto.severidade];
    const corSev = colors.textOn[SEV_TEXT[ponto.severidade] || 'muted'];
    const titulo = t_field(ponto.item, 'titulo');

    const causa = ponto.causa.origem === 'morador'
        ? t('ambienteRisco.porCausaDe', {
            nomes: ponto.causa.perfis.map(p => p.primeiroNome).join(', '),
            defaultValue: 'Por causa de {{nomes}}',
        })
        : t('ambienteRisco.porCausaDaMoradia', 'Condição da moradia');

    return (
        <View style={[s.ponto, !primeiro && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.neutral[300] }]}>
            <Body style={[s.pontoTitulo, { color: colors.neutral[900] }]}>{titulo}</Body>

            <View style={s.pontoMeta}>
                {/* Severidade nunca só por cor: rótulo textual acompanha. */}
                <View style={s.metaChip}>
                    <NeoIcon
                        name={ponto.severidade === 'alta' ? 'WarningOctagon' : 'Warning2'}
                        size={11}
                        color={corSev}
                        variant="Bold"
                    />
                    <Caption style={[s.metaTexto, { color: corSev }]}>
                        {t('ambienteRisco.severidadeChip', {
                            nivel: t(sev.labelKey, sev.label),
                            defaultValue: 'Severidade {{nivel}}',
                        })}
                    </Caption>
                </View>

                <View style={[s.metaChip, ponto.ativoEnvolvido && { backgroundColor: colors.categoria.ardosia.tint, paddingHorizontal: 6, borderRadius: 6 }]}>
                    <NeoIcon
                        name={ponto.causa.origem === 'morador' ? 'UserFocus' : 'House'}
                        size={11}
                        color={ponto.ativoEnvolvido ? colors.categoria.ardosia.fill : colors.textOn.muted}
                        variant="Bold"
                    />
                    <Caption style={[s.metaTexto, { color: ponto.ativoEnvolvido ? colors.categoria.ardosia.texto : colors.textOn.muted }]}>
                        {causa}
                    </Caption>
                </View>
            </View>

        </View>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'transparent' },
    scroll: {
        paddingHorizontal: Neo.layout.screenHPadding,
        paddingBottom: Neo.layout.scrollBottomFooter,
    },
    loading: { paddingVertical: 60, alignItems: 'center' },

    lead: { gap: Neo.spacing.sm + 2, marginTop: Neo.spacing.sm },
    leadTexto: { fontSize: 14.5, lineHeight: 20 },
    motivoBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 12 },
    motivoTexto: { flex: 1, fontSize: 12.5, lineHeight: 17, fontWeight: '600' },
    ocupantesBloco: { gap: 6 },
    ocupantesLabel: { fontSize: 10.5, fontWeight: '800', letterSpacing: 0.6, textTransform: 'uppercase' },
    ocupantesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    pessoaChip: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
    pessoaTexto: { fontSize: 11.5, fontWeight: '700' },

    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    secao: { padding: 0, overflow: 'hidden' },
    secaoHeader: {
        flexDirection: 'row', alignItems: 'center', gap: 10,
        paddingHorizontal: Neo.spacing.md, paddingVertical: 12,
    },
    secaoIcone: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
    secaoDesc: { flex: 1, fontSize: 12.5, lineHeight: 17 },
    divisorH: { height: StyleSheet.hairlineWidth },

    ponto: { paddingHorizontal: Neo.spacing.md, paddingVertical: 12, gap: 6 },
    pontoTitulo: { fontSize: 14, lineHeight: 19, fontWeight: '600' },
    pontoMeta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 10 },
    metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 2 },
    metaTexto: { fontSize: 10.5, fontWeight: '700' },

    cta: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9,
        marginTop: Neo.spacing.lg, paddingVertical: 15,
        borderRadius: Neo.borderRadius.md,
    },
    ctaTexto: { fontSize: 15.5, fontWeight: '800' },
    ctaNota: { textAlign: 'center', marginTop: 8, lineHeight: 16 },
});
