/**
 * MapaDeRiscosScreen.js — Mapa de Riscos Domésticos
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Mapeamento ATIVO: a análise nasce do que o usuário já declarou — a moradia e
 * quem mora nela —, não de respostas de vistoria. Abrir o app recém-cadastrado
 * já produz mapa; nenhuma pergunta precisa ter sido respondida antes.
 *
 * Duas gerações anteriores desta tela erravam o alvo pelo mesmo motivo:
 *   • "Mapa de Calor" coloria cômodos por % de checklist concluído.
 *   • A 1ª versão deste mapa agregava pendências de checklist.
 * Ambas mediam progresso de preenchimento e chamavam aquilo de risco.
 *
 * Divisão de papéis que esta tela respeita:
 *   • Mapa    → diagnóstico.  "Estes são os pontos de atenção da sua casa."
 *   • Vistoria→ verificação.  "Vá conferir item a item."
 * Por isso o toque num ambiente abre o DETALHE do risco daquele ambiente
 * (AmbienteRisco), não o checklist. A vistoria é oferecida lá, como ação.
 *
 * Anatomia Editorial: 2º nível (hub) — header fixo, seções, listas em 1 card.
 */
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
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
import { Body, Small, Caption, Eyebrow } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { t_field } from '../../utils/getLocalizedField';

import RiscoService from '../../services/RiscoService';
import { CATEGORIAS_RISCO } from '../../data/categoriasRisco';

export default function MapaDeRiscosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const colors = useThemeColors();
    const isDark = useIsDark();

    const [loading, setLoading] = useState(true);
    const [mapa, setMapa] = useState(null);
    const [categoriaFiltro, setCategoriaFiltro] = useState(null);

    useFocusEffect(useCallback(() => {
        let vivo = true;
        (async () => {
            setLoading(true);
            const data = await RiscoService.getMapaDeRiscos();
            if (vivo) { setMapa(data); setLoading(false); }
        })();
        return () => { vivo = false; };
    }, []));

    const ambientes = mapa?.ambientes || [];
    const categorias = mapa?.categorias || [];
    const totais = mapa?.totais || {};
    const foco = mapa?.perfilAtivo || null;

    const visiveis = categoriaFiltro
        ? ambientes.filter(a => a.categorias.some(c => c.id === categoriaFiltro))
        : ambientes;

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={s.safe}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('mapaRiscos.title', 'Mapa de riscos')}
                    subtitle={mapa?.residencia?.nome || t('mapaRiscos.subtitle', 'O que analisamos na sua casa')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
                    {loading ? (
                        <View style={s.loading}><ActivityIndicator color={colors.primary[600]} /></View>
                    ) : ambientes.length === 0 ? (
                        <EmptyState
                            icon="MapTrifold"
                            title={t('mapaRiscos.emptyTitle', 'Ainda não dá pra analisar')}
                            description={t('mapaRiscos.emptyDesc', 'Cadastre os ambientes da sua casa e quem mora nela. É a partir dessas informações que montamos o mapa — não é preciso fazer vistoria antes.')}
                            cta={{
                                label: t('mapaRiscos.emptyCta', 'Ir pra Onde Proteger'),
                                onPress: () => navigation.navigate('OndeProteger'),
                            }}
                        />
                    ) : (
                        <>
                            {/* ── PANORAMA ─────────────────────────────────── */}
                            <Eyebrow style={[s.eyebrow, { color: colors.textOn.muted }]}>
                                {t('mapaRiscos.panoramaLabel', 'Panorama da casa')}
                            </Eyebrow>
                            <NeoCard variant="premium" style={s.panorama}>
                                <Body style={[s.lead, { color: colors.neutral[800] }]}>
                                    {t('mapaRiscos.lead', 'De acordo com o que você informou sobre a moradia e os moradores, encontramos estes pontos de atenção.')}
                                </Body>

                                <View style={s.statsRow}>
                                    <Stat valor={totais.ambientes} label={t('mapaRiscos.statAmbientes', 'Ambientes')} colors={colors} />
                                    <View style={[s.divisor, { backgroundColor: colors.neutral[300] }]} />
                                    <Stat valor={totais.pontos} label={t('mapaRiscos.statPontos', 'Pontos de atenção')} colors={colors} />
                                    <View style={[s.divisor, { backgroundColor: colors.neutral[300] }]} />
                                    <Stat
                                        valor={totais.severidadeAlta}
                                        label={t('mapaRiscos.statAlta', 'Severidade alta')}
                                        colors={colors}
                                        destaque={totais.severidadeAlta > 0 ? colors.textOn.error : null}
                                    />
                                </View>

                                {/* Recorte da pessoa em foco: destaca, não filtra —
                                    esconder os demais riscos da casa perderia informação. */}
                                {!!foco && (
                                    <View style={[s.focoBox, { backgroundColor: colors.categoria.ardosia.tint }]}>
                                        <NeoIcon name="UserFocus" size={16} color={colors.categoria.ardosia.fill} variant="Bold" />
                                        <Small style={[s.focoTexto, { color: colors.categoria.ardosia.texto }]}>
                                            {totais.doPerfilAtivo > 0
                                                ? t('mapaRiscos.focoResumo', {
                                                    count: totais.doPerfilAtivo,
                                                    nome: foco.primeiroNome,
                                                    defaultValue: '{{count}} ponto(s) de atenção existem por causa de {{nome}}.',
                                                })
                                                : t('mapaRiscos.focoNenhum', {
                                                    nome: foco.primeiroNome,
                                                    defaultValue: 'Nenhum ponto de atenção decorre especificamente do perfil de {{nome}}.',
                                                })}
                                        </Small>
                                    </View>
                                )}
                            </NeoCard>

                            {/* ── CATEGORIAS ───────────────────────────────── */}
                            <Eyebrow style={[s.eyebrow, { color: colors.textOn.muted }]}>
                                {t('mapaRiscos.categoriasLabel', 'Categorias de risco')}
                            </Eyebrow>
                            <Caption style={[s.nota, { color: colors.textOn.muted }]}>
                                {t('mapaRiscos.categoriasNota', 'Toque numa categoria para ver onde ela se concentra.')}
                            </Caption>
                            <NeoCard variant="glass" padding={0} style={s.lista}>
                                {categorias.map((c, i) => (
                                    <LinhaCategoria
                                        key={c.id}
                                        cat={c}
                                        colors={colors}
                                        t={t}
                                        ativo={categoriaFiltro === c.id}
                                        primeiro={i === 0}
                                        onPress={() => setCategoriaFiltro(categoriaFiltro === c.id ? null : c.id)}
                                    />
                                ))}
                            </NeoCard>

                            {/* ── AMBIENTES ────────────────────────────────── */}
                            <Eyebrow style={[s.eyebrow, { color: colors.textOn.muted }]}>
                                {categoriaFiltro
                                    ? t('mapaRiscos.ambientesFiltrados', 'Onde esta categoria aparece')
                                    : t('mapaRiscos.ambientesLabel', 'Ambientes analisados')}
                            </Eyebrow>
                            <Caption style={[s.nota, { color: colors.textOn.muted }]}>
                                {foco
                                    ? t('mapaRiscos.ambientesNota', { nome: foco.primeiroNome, defaultValue: 'Ordenados pelos ambientes de {{nome}} e pela severidade dos pontos.' })
                                    : t('mapaRiscos.ambientesNotaSemFoco', 'Ordenados pela severidade dos pontos encontrados.')}
                            </Caption>
                            <NeoCard variant="glass" padding={0} style={s.lista}>
                                {visiveis.map((amb, i) => (
                                    <LinhaAmbiente
                                        key={amb.id}
                                        amb={amb}
                                        colors={colors}
                                        t={t}
                                        foco={foco}
                                        categoriaFiltro={categoriaFiltro}
                                        primeiro={i === 0}
                                        onPress={() => navigation.navigate('AmbienteRisco', {
                                            areaId: amb.id,
                                            areaNome: t_field(amb.ambiente, 'nome'),
                                        })}
                                    />
                                ))}
                            </NeoCard>

                            {/* Limpar filtro no FIM da lista filtrada: é aqui que
                                quem percorreu o recorte quer voltar ao mapa todo. */}
                            {categoriaFiltro && (
                                <TappablePressable
                                    onPress={() => setCategoriaFiltro(null)}
                                    style={[s.limpar, { borderColor: colors.neutral[300] }]}
                                    accessibilityLabel={t('mapaRiscos.limparFiltro', 'Ver todas as categorias')}
                                >
                                    <NeoIcon name="ArrowLeft2" size={15} color={colors.textOn.muted} variant="Linear" />
                                    <Small style={{ color: colors.textOn.muted, fontWeight: '700' }}>
                                        {t('mapaRiscos.limparFiltro', 'Ver todas as categorias')}
                                    </Small>
                                </TappablePressable>
                            )}
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

function Stat({ valor, label, colors, destaque }) {
    return (
        <View style={s.stat}>
            <Text style={[s.statValor, { color: destaque || colors.neutral[900] }]}>{valor}</Text>
            <Caption style={[s.statLabel, { color: colors.textOn.muted }]} numberOfLines={2}>{label}</Caption>
        </View>
    );
}

/** Chip de categoria: cor + contagem + rótulo acessível (nunca só cor). */
function ChipCategoria({ catId, count, colors, t, apagado }) {
    const c = CATEGORIAS_RISCO[catId];
    if (!c) return null;
    const tom = colors.categoria[c.tomDS];
    return (
        <View
            style={[s.chip, { backgroundColor: tom.tint }, apagado && s.chipApagado]}
            accessibilityRole="text"
            accessibilityLabel={`${t(c.labelKey, c.label)}: ${count}`}
        >
            <View style={[s.chipDot, { backgroundColor: tom.fill }]} />
            <Text style={[s.chipCount, { color: tom.texto }]}>{count}</Text>
        </View>
    );
}

function LinhaCategoria({ cat, colors, t, ativo, primeiro, onPress }) {
    const c = CATEGORIAS_RISCO[cat.id];
    const tom = colors.categoria[c.tomDS];
    const nome = t(c.labelKey, c.label);

    return (
        <TappablePressable
            onPress={onPress}
            style={[
                s.linha,
                !primeiro && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.neutral[300] },
                ativo && { backgroundColor: tom.tint },
            ]}
            accessibilityLabel={t('mapaRiscos.a11yCategoria', {
                nome, pontos: cat.pontos, ambientes: cat.ambientes,
                defaultValue: '{{nome}}. {{pontos}} pontos em {{ambientes}} ambientes',
            })}
            accessibilityState={{ selected: ativo }}
        >
            <View style={[s.iconeQuadro, { backgroundColor: tom.tint }]}>
                <NeoIcon name={c.icone} size={19} color={tom.fill} variant="Bold" />
            </View>
            <View style={s.corpo}>
                <Body style={[s.titulo, { color: colors.neutral[900] }]}>{nome}</Body>
                <Caption style={{ color: colors.textOn.muted }} numberOfLines={1}>
                    {t('mapaRiscos.categoriaResumo', {
                        pontos: cat.pontos, ambientes: cat.ambientes,
                        defaultValue: '{{pontos}} ponto(s) em {{ambientes}} ambiente(s)',
                    })}
                </Caption>
            </View>
            <NeoIcon name={ativo ? 'CloseCircle' : 'ArrowRight2'} size={16} color={colors.neutral[500]} variant="Linear" />
        </TappablePressable>
    );
}

function LinhaAmbiente({ amb, colors, t, foco, categoriaFiltro, primeiro, onPress }) {
    const nome = t_field(amb.ambiente, 'nome');

    return (
        <TappablePressable
            onPress={onPress}
            style={[
                s.linha,
                s.linhaAmbiente,
                !primeiro && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.neutral[300] },
            ]}
            accessibilityLabel={t('mapaRiscos.a11yAmbiente', {
                nome, pontos: amb.totalPontos, alta: amb.severidadeAlta,
                defaultValue: '{{nome}}. {{pontos}} pontos de atenção, {{alta}} de severidade alta',
            })}
        >
            <View style={[s.iconeQuadro, { backgroundColor: colors.neutral[200], marginTop: 2 }]}>
                <NeoIcon name={amb.icone} size={19} color={colors.neutral[700]} variant="Bold" />
            </View>

            <View style={s.corpo}>
                <Body style={[s.titulo, { color: colors.neutral[900] }]} numberOfLines={1}>{nome}</Body>

                <View style={s.chipsRow}>
                    {amb.categorias.map(c => (
                        <ChipCategoria
                            key={c.id}
                            catId={c.id}
                            count={c.total}
                            colors={colors}
                            t={t}
                            apagado={!!categoriaFiltro && categoriaFiltro !== c.id}
                        />
                    ))}
                </View>

                <Caption style={{ color: colors.textOn.muted }} numberOfLines={1}>
                    {t('mapaRiscos.ambienteResumo', { count: amb.totalPontos, defaultValue: '{{count}} ponto(s) de atenção' })}
                    {amb.severidadeAlta > 0
                        ? ` · ${t('mapaRiscos.ambienteAlta', { count: amb.severidadeAlta, defaultValue: '{{count}} de severidade alta' })}`
                        : ''}
                </Caption>

                {/* Vínculo com a pessoa em foco — os dois sinais são distintos:
                    usar o ambiente é exposição; "por causa de" é origem. */}
                {!!foco && (amb.ativoOcupa || amb.doPerfilAtivo > 0) && (
                    <View style={s.focoRow}>
                        {amb.ativoOcupa && (
                            <View style={[s.focoChip, { backgroundColor: colors.categoria.ardosia.tint }]}>
                                <NeoIcon name="UserFocus" size={10} color={colors.categoria.ardosia.fill} variant="Bold" />
                                <Caption style={[s.focoChipTexto, { color: colors.categoria.ardosia.texto }]}>
                                    {t('mapaRiscos.usaEsteAmbiente', { nome: foco.primeiroNome, defaultValue: '{{nome}} usa' })}
                                </Caption>
                            </View>
                        )}
                        {amb.doPerfilAtivo > 0 && (
                            <View style={[s.focoChip, { backgroundColor: colors.categoria.ardosia.tint }]}>
                                <Caption style={[s.focoChipTexto, { color: colors.categoria.ardosia.texto }]}>
                                    {t('mapaRiscos.porCausaDe', {
                                        count: amb.doPerfilAtivo, nome: foco.primeiroNome,
                                        defaultValue: '{{count}} por causa de {{nome}}',
                                    })}
                                </Caption>
                            </View>
                        )}
                    </View>
                )}
            </View>

            <NeoIcon name="ArrowRight2" size={16} color={colors.neutral[500]} variant="Linear" />
        </TappablePressable>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'transparent' },
    scroll: {
        paddingHorizontal: Neo.layout.screenHPadding,
        paddingBottom: Neo.layout.scrollBottomFooter,
    },
    loading: { paddingVertical: 60, alignItems: 'center' },

    eyebrow: { marginTop: Neo.spacing.lg, marginBottom: Neo.spacing.sm },
    nota: { marginTop: -4, marginBottom: Neo.spacing.sm + 2, lineHeight: 16 },

    panorama: { gap: Neo.spacing.md },
    lead: { fontSize: 14.5, lineHeight: 20 },
    statsRow: { flexDirection: 'row', alignItems: 'stretch' },
    stat: { flex: 1, alignItems: 'center', gap: 2 },
    statValor: { fontSize: 26, fontWeight: '900', letterSpacing: -0.8 },
    statLabel: { textAlign: 'center', fontSize: 10.5, lineHeight: 13 },
    divisor: { width: StyleSheet.hairlineWidth, marginHorizontal: Neo.spacing.sm },
    focoBox: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        padding: 10, borderRadius: 12,
    },
    focoTexto: { flex: 1, fontSize: 12.5, lineHeight: 17, fontWeight: '600' },

    lista: { overflow: 'hidden' },
    linha: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: Neo.spacing.md, paddingVertical: 12,
    },
    linhaAmbiente: { alignItems: 'flex-start' },
    corpo: { flex: 1, minWidth: 0, gap: 3 },
    titulo: { fontWeight: '700', fontSize: 14.5 },
    iconeQuadro: {
        width: 38, height: 38, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center',
    },

    chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 3 },
    chip: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        paddingHorizontal: 7, paddingVertical: 3, borderRadius: 9,
    },
    chipApagado: { opacity: 0.3 },
    chipDot: { width: 8, height: 8, borderRadius: 4 },
    chipCount: { fontSize: 11, fontWeight: '800' },

    focoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 3 },
    focoChip: {
        flexDirection: 'row', alignItems: 'center', gap: 3,
        paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8,
    },
    focoChipTexto: { fontSize: 10, fontWeight: '700' },

    limpar: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
        marginTop: Neo.spacing.sm + 4, paddingVertical: 11,
        borderRadius: 12, borderWidth: StyleSheet.hairlineWidth,
    },
});
