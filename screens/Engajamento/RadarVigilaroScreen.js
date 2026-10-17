/**
 * RadarVigilaroScreen.js — Radar da Prevenção.
 *
 * D17 (17/10/2026): o Radar deixou de ser "um alerta por mês do calendário
 * brasileiro" e passou a ser um calendário de riscos por PAÍS, REGIÃO e DATA,
 * personalizado pela casa (services/RadarSazonalEngine):
 *   Agora → riscos ativos, com fase (pico, contagem regressiva do evento);
 *   Nas próximas semanas → o que começa em até 21 dias;
 *   O seu ano → os 12 meses seguintes;
 *   Alertas oficiais → como receber o aviso do órgão do país;
 *   Para saber mais → acervo de fatos e protocolos.
 * Antes a tela nunca recebia os perfis (a "priorização por família" não
 * funcionava), mostrava tokens crus e só falava português.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import RadarVigilaroService from '../../services/RadarVigilaroService';
import ProfileService from '../../services/ProfileService';
import { AMBIENTES } from '../../data/mapeamento_dados';
import { TEXTOS_RADAR } from '../../data/radarSazonal/textos';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const tx = (campo, vars) => {
  let s = t_field(TEXTOS_RADAR, campo);
  if (vars && typeof s === 'string') Object.entries(vars).forEach(([k, v]) => { s = s.split(`{${k}}`).join(String(v)); });
  return s;
};

const ROTULO_FORMATO = { caso: 'formatoCaso', fato: 'formatoFato', protocolo: 'formatoProtocolo', sazonal: 'formatoSazonal' };

/** Texto da fase: "Pico agora", "Faltam 9 dias — São João", "Começa em 12 dias". */
function textoFase(item) {
  if (item.fase === 'evento') {
    const evento = RadarVigilaroService.nomeDoEvento(item) || '';
    const n = item.diasParaEvento;
    if (n > 1) return tx('faseEventoDias', { n, evento });
    if (n === 1) return tx('faseEventoAmanha', { evento });
    if (n === 0) return tx('faseEventoHoje', { evento });
    return tx('faseEventoDepois', { evento });
  }
  if (item.fase === 'pico') return tx('fasePico');
  if (item.fase === 'chegando') return tx('faseChegando', { n: item.diasParaInicio });
  return tx('faseAgora');
}

/** "Por que para você: Ana, Rex — a casa tem piscina". */
function textoParaQuem(item) {
  const nomes = (item.quem || []).map((p) => p.nome).filter(Boolean);
  const ambientes = (item.ambientesCasa || [])
    .map((id) => AMBIENTES.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => t_field(a, 'nome').toLowerCase());
  const partes = [];
  if (nomes.length) partes.push(nomes.join(', '));
  if (ambientes.length) partes.push(tx('casaTem', { lista: ambientes.join(', ') }));
  return partes.length ? tx('paraQuem', { nomes: partes.join(' — ') }) : null;
}

function textoRegioes(item, regioes) {
  if (!item.regioesAlvo) return null;
  const nomes = item.regioesAlvo.map((id) => (regioes.find((r) => r.id === id) || {}).nome).filter(Boolean);
  return nomes.length ? tx('valePara', { lista: nomes.join(', ') }) : null;
}

// ─── Cartão de risco sazonal ────────────────────────────────────────────────
function CartaoRisco({ item, regioes, onPress, cores }) {
  const art = RadarVigilaroService.localizarJanela(item);
  const fase = textoFase(item);
  const quem = textoParaQuem(item);
  const vale = textoRegioes(item, regioes);
  const corFase = item.fase === 'chegando' ? cores.info
    : (item.janela.severidade >= 3 ? cores.erro : cores.alerta);
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(art, { fase, quem, vale })}
      style={[s.card, { backgroundColor: cores.cartao }]}
      accessibilityRole="button"
      accessibilityLabel={`${fase}. ${art.titulo}`}
    >
      <View style={s.cardInner}>
        <View style={s.cardHeader}>
          <View style={[s.badge, { backgroundColor: corFase + '22' }]}>
            <NeoIcon name={item.fase === 'evento' ? 'Calendar' : 'Danger'} size={12} color={corFase} variant="Bold" />
            <Text style={[s.badgeText, { color: corFase }]}>{fase}</Text>
          </View>
          <NeoIcon name={art.icone || 'ShieldTick'} size={22} color={corFase} variant="Bold" />
        </View>
        <Text style={[s.titulo, { color: cores.texto }]} numberOfLines={3}>{art.titulo}</Text>
        <Text style={[s.resumo, { color: cores.corpo }]} numberOfLines={3}>{art.resumo}</Text>
        {quem ? (
          <View style={s.linhaInfo}>
            <NeoIcon name="Profile2User" size={14} color={Neo.colors.primary[600]} variant="Bold" />
            <Text style={[s.infoTexto, { color: Neo.colors.primary[700] }]}>{quem}</Text>
          </View>
        ) : null}
        {vale ? (
          <View style={s.linhaInfo}>
            <NeoIcon name="Location" size={14} color={cores.mudo} />
            <Text style={[s.infoTexto, { color: cores.mudo }]}>{vale}</Text>
          </View>
        ) : null}
        <View style={[s.footer, { borderTopColor: cores.borda }]}>
          <Text style={[s.fonteText, { color: cores.mudo }]} numberOfLines={1}>{tx('fonte')}: {art.fonte}</Text>
          <View style={s.ctaBtn}>
            <Text style={s.ctaText}>{tx('verCompleto')}</Text>
            <NeoIcon name="ArrowRight2" size={12} color={Neo.colors.neutral.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Cartão do acervo (fatos e protocolos) ──────────────────────────────────
function CartaoAcervo({ item, onPress, cores }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={[s.card, { backgroundColor: cores.cartao }]} accessibilityRole="button">
      <View style={s.cardInner}>
        <View style={s.cardHeader}>
          <View style={[s.badge, { backgroundColor: Neo.colors.primary[500] + '1A' }]}>
            <NeoIcon name="ShieldTick" size={12} color={Neo.colors.primary[600]} />
            <Text style={[s.badgeText, { color: Neo.colors.primary[700] }]}>{tx(ROTULO_FORMATO[item.formato] || 'formatoCaso')}</Text>
          </View>
        </View>
        <Text style={[s.titulo, { color: cores.texto }]} numberOfLines={3}>{item.titulo}</Text>
        <Text style={[s.resumo, { color: cores.corpo }]} numberOfLines={3}>{item.narrativa || item.resumo}</Text>
        <View style={[s.footer, { borderTopColor: cores.borda }]}>
          <Text style={[s.fonteText, { color: cores.mudo }]} numberOfLines={1}>{item.fonte ? `${tx('fonte')}: ${item.fonte}` : ''}</Text>
          <View style={s.ctaBtn}>
            <Text style={s.ctaText}>{tx('verCompleto')}</Text>
            <NeoIcon name="ArrowRight2" size={12} color={Neo.colors.neutral.white} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Tela ────────────────────────────────────────────────────────────────────
export default function RadarVigilaroScreen({ navigation }) {
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const cores = useMemo(() => ({
    cartao: isDark ? themeColors.neutral[200] : themeColors.neutral.white,
    texto: themeColors.neutral[900],
    corpo: themeColors.neutral[700],
    mudo: themeColors.neutral[500],
    borda: themeColors.neutral[200],
    erro: Neo.colors.feedback.error,
    alerta: Neo.colors.feedback.warning,
    info: Neo.colors.feedback.info,
  }), [themeColors, isDark]);

  const [radar, setRadar] = useState(null);
  const [acervo, setAcervo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [escolhendoRegiao, setEscolhendoRegiao] = useState(false);
  const [mesAberto, setMesAberto] = useState(0);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const [perfis, moradia, mapping] = await Promise.all([
        ProfileService.getPerfis().catch(() => []),
        ProfileService.getMoradia().catch(() => null),
        ProfileService.getMapping().catch(() => []),
      ]);
      const r = await RadarVigilaroService.getRadarSazonal({ perfis: perfis || [], moradia, mapping: mapping || [] });
      setRadar(r);
      setAcervo(RadarVigilaroService.getFeed(perfis || [], 12));
    } catch (e) {
      if (__DEV__) console.error('[Radar] falha ao carregar:', e);
      setRadar({ suportado: false, agora: [], chegando: [], ano: [] });
      setAcervo(RadarVigilaroService.getFeed([], 12));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  const regioes = radar ? RadarVigilaroService.getRegioes(radar.pais) : [];
  const nomeRegiao = radar && radar.regiao ? (regioes.find((r) => r.id === radar.regiao) || {}).nome : null;
  const alertas = radar ? RadarVigilaroService.getAlertasOficiais(radar.pais) : null;

  const escolherRegiao = async (id) => {
    await RadarVigilaroService.setRegiao(id, radar.pais);
    setEscolhendoRegiao(false);
    carregar();
  };

  const abrirSazonal = (art, contexto) => navigation.navigate('RadarArticle', { article: { ...art, contexto } });
  const abrirAcervo = (item) => navigation.navigate('RadarArticle', { article: item });

  const mes = radar && radar.ano && radar.ano[mesAberto];
  const meses = t_field(TEXTOS_RADAR, 'meses') || [];

  return (
    <AppBackground>
      <SafeAreaView style={s.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

        <View style={s.header}>
          <TouchableOpacity
            style={[s.backBtn, { backgroundColor: cores.cartao }]}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel={tx('voltar')}
          >
            <NeoIcon name="ArrowLeft" size={24} color={cores.texto} />
          </TouchableOpacity>
          <View style={[s.headerTitle, { backgroundColor: Neo.colors.primary[500] + '1A' }]}>
            <NeoIcon name="Radar" size={20} color={Neo.colors.primary[600]} variant="Bold" />
            <Text style={[s.headerTitleText, { color: Neo.colors.primary[700] }]} accessibilityRole="header">{tx('titulo')}</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          contentContainerStyle={s.listContent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={carregar} />}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[s.subText, { color: cores.corpo }]}>{tx('subtitulo')}</Text>

          {/* Região (opcional) */}
          {radar && radar.suportado && radar.temRegioes ? (
            <View style={{ marginBottom: 12 }}>
              <TouchableOpacity
                style={[s.chipRegiao, { backgroundColor: cores.cartao, borderColor: cores.borda }]}
                onPress={() => setEscolhendoRegiao(!escolhendoRegiao)}
                accessibilityRole="button"
              >
                <NeoIcon name="Location" size={14} color={Neo.colors.primary[600]} variant="Bold" />
                <Text style={[s.chipTexto, { color: cores.texto }]}>
                  {nomeRegiao ? `${tx('regiao')}: ${nomeRegiao}` : tx('regiaoEscolher')}
                </Text>
                <NeoIcon name={escolhendoRegiao ? 'ArrowUp2' : 'ArrowDown2'} size={14} color={cores.mudo} />
              </TouchableOpacity>
              {escolhendoRegiao && (
                <View style={[s.painelRegiao, { backgroundColor: cores.cartao }]}>
                  <Text style={[s.ajuda, { color: cores.mudo }]}>{tx('regiaoAjuda')}</Text>
                  <View style={s.chips}>
                    {[{ id: null, nome: tx('regiaoTodas') }, ...regioes].map((r) => {
                      const ativo = (radar.regiao || null) === r.id;
                      return (
                        <TouchableOpacity
                          key={r.id || 'todas'}
                          onPress={() => escolherRegiao(r.id)}
                          style={[s.chipOpcao, { borderColor: ativo ? Neo.colors.primary[500] : cores.borda, backgroundColor: ativo ? Neo.colors.primary[500] + '1A' : 'transparent' }]}
                          accessibilityRole="button"
                          accessibilityState={{ selected: ativo }}
                        >
                          <Text style={[s.chipTexto, { color: ativo ? Neo.colors.primary[700] : cores.corpo }]}>{r.nome}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}
            </View>
          ) : null}

          {radar && !radar.suportado ? (
            <Text style={[s.vazio, { color: cores.corpo, backgroundColor: cores.cartao }]}>{tx('semPais')}</Text>
          ) : null}

          {/* Agora */}
          {radar && radar.suportado ? (
            <>
              <Text style={[s.secao, { color: cores.texto }]}>{tx('secaoAgora')}</Text>
              {radar.agora.length === 0 ? (
                <Text style={[s.vazio, { color: cores.corpo, backgroundColor: cores.cartao }]}>{tx('nadaAgora')}</Text>
              ) : radar.agora.map((item) => (
                <CartaoRisco key={item.janela.id} item={item} regioes={regioes} onPress={abrirSazonal} cores={cores} />
              ))}

              {radar.chegando.length > 0 && (
                <>
                  <Text style={[s.secao, { color: cores.texto }]}>{tx('secaoChegando')}</Text>
                  {radar.chegando.map((item) => (
                    <CartaoRisco key={item.janela.id} item={item} regioes={regioes} onPress={abrirSazonal} cores={cores} />
                  ))}
                </>
              )}

              {/* O seu ano */}
              <Text style={[s.secao, { color: cores.texto }]}>{tx('secaoAno')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.meses}>
                {radar.ano.map((m, i) => {
                  const ativo = i === mesAberto;
                  const graves = m.janelas.filter((j) => j.severidade >= 3).length;
                  return (
                    <TouchableOpacity
                      key={`${m.ano}-${m.mes}`}
                      onPress={() => setMesAberto(i)}
                      style={[s.mes, { backgroundColor: ativo ? Neo.colors.primary[500] : cores.cartao, borderColor: cores.borda }]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: ativo }}
                    >
                      <Text style={[s.mesNome, { color: ativo ? Neo.colors.neutral.white : cores.texto }]}>{meses[m.mes - 1]}</Text>
                      <Text style={[s.mesConta, { color: ativo ? Neo.colors.neutral.white : (graves ? cores.erro : cores.mudo) }]}>{m.janelas.length}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {mes ? (
                <View style={[s.listaMes, { backgroundColor: cores.cartao }]}>
                  {mes.janelas.length === 0 ? (
                    <Text style={[s.itemMes, { color: cores.mudo }]}>{tx('nenhumNoMes')}</Text>
                  ) : mes.janelas.map((j) => (
                    <TouchableOpacity
                      key={j.id}
                      style={s.linhaMes}
                      onPress={() => abrirSazonal(RadarVigilaroService.localizarJanela(j), {})}
                      accessibilityRole="button"
                    >
                      <NeoIcon name={j.icone || 'Danger'} size={16} color={j.severidade >= 3 ? cores.erro : cores.alerta} variant="Bold" />
                      <Text style={[s.itemMes, { color: cores.corpo }]}>{t_field(j, 'titulo')}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : null}
            </>
          ) : null}

          {/* Alertas oficiais do país */}
          {alertas ? (
            <View style={[s.cardOficial, { backgroundColor: Neo.colors.feedback.info + '14', borderColor: Neo.colors.feedback.info + '40' }]}>
              <View style={s.linhaInfo}>
                <NeoIcon name="Bell" size={18} color={Neo.colors.feedback.info} variant="Bold" />
                <Text style={[s.oficialTitulo, { color: cores.texto }]}>{alertas.titulo}</Text>
              </View>
              {alertas.itens.map((it, i) => (
                <Text key={i} style={[s.oficialItem, { color: cores.corpo }]}>• {it}</Text>
              ))}
              <Text style={[s.fonteText, { color: cores.mudo, marginTop: 6 }]}>{tx('fonte')}: {alertas.fonte}</Text>
            </View>
          ) : null}

          {/* Acervo */}
          {acervo.length > 0 && <Text style={[s.secao, { color: cores.texto }]}>{tx('secaoAcervo')}</Text>}
          {acervo.map((item) => (
            <CartaoAcervo key={item.id} item={item} onPress={() => abrirAcervo(item)} cores={cores} />
          ))}

          <View style={{ height: 120 }} />
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  headerTitleText: { fontSize: 15, fontWeight: '700' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  subText: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  secao: { fontSize: 17, fontWeight: '800', marginTop: 18, marginBottom: 10 },
  vazio: { fontSize: 14, lineHeight: 20, padding: 16, borderRadius: 16, overflow: 'hidden' },
  chipRegiao: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, borderWidth: 1 },
  chipTexto: { fontSize: 13, fontWeight: '600' },
  painelRegiao: { marginTop: 8, padding: 12, borderRadius: 16 },
  ajuda: { fontSize: 12, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipOpcao: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16, borderWidth: 1 },
  card: { marginBottom: 14, borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardInner: { padding: 18 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, flexShrink: 1 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  titulo: { fontSize: 16, fontWeight: '700', lineHeight: 22, marginBottom: 8 },
  resumo: { fontSize: 14, lineHeight: 21, marginBottom: 10 },
  linhaInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 6 },
  infoTexto: { fontSize: 12, fontWeight: '600', flex: 1, lineHeight: 17 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, marginTop: 4 },
  fonteText: { fontSize: 11, flex: 1, marginRight: 8 },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Neo.colors.primary[500], paddingHorizontal: 12, paddingVertical: 7, borderRadius: 16 },
  ctaText: { fontSize: 12, fontWeight: '700', color: Neo.colors.neutral.white },
  meses: { gap: 8, paddingBottom: 4 },
  mes: { width: 54, paddingVertical: 8, borderRadius: 14, alignItems: 'center', borderWidth: 1 },
  mesNome: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  mesConta: { fontSize: 16, fontWeight: '800', marginTop: 2 },
  listaMes: { marginTop: 10, padding: 12, borderRadius: 16, gap: 8 },
  linhaMes: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  itemMes: { fontSize: 13, lineHeight: 18, flex: 1 },
  cardOficial: { marginTop: 18, padding: 16, borderRadius: 18, borderWidth: 1 },
  oficialTitulo: { fontSize: 15, fontWeight: '800', flex: 1 },
  oficialItem: { fontSize: 13, lineHeight: 19, marginTop: 4 },
});
