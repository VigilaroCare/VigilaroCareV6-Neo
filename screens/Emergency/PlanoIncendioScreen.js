import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { getFirePreventionContent } from '../../data/fire_prevention_content';

export default function PlanoIncendioScreen({ navigation }) {
  const { t } = useTranslation('common');
  const [secaoSelecionada, setSecaoSelecionada] = useState(null);

  const FIRE_PREVENTION_CONTENT = getFirePreventionContent();

  const secoes = [
    {
      id: 'prevention',
      nome: FIRE_PREVENTION_CONTENT?.prevention?.title || 'Prevenção',
      emoji: FIRE_PREVENTION_CONTENT?.prevention?.emoji || '🛡️',
      cor: '#4CAF50',
      itens: FIRE_PREVENTION_CONTENT?.prevention?.sections
        ? FIRE_PREVENTION_CONTENT.prevention.sections.map(s => s.title)
        : [],
      detalhes: FIRE_PREVENTION_CONTENT?.prevention?.sections,
    },
    {
      id: 'action',
      nome: FIRE_PREVENTION_CONTENT?.action?.title || 'Ação',
      emoji: FIRE_PREVENTION_CONTENT?.action?.emoji || '🔥',
      cor: '#F44336',
      itens: FIRE_PREVENTION_CONTENT?.action?.steps || [],
      detalhes: null,
    },
    {
      id: 'plan',
      nome: 'Plano de fuga',
      emoji: '🗺️',
      cor: '#2196F3',
      itens: [
        'Desenhe a planta da casa e marque 2 saídas por cômodo.',
        'COMBINE UM PONTO DE ENCONTRO seguro fora da casa (ex: poste, árvore vizinha).',
        'Se houver fumaça: RASTEJE. O ar é mais limpo e fresco junto ao chão.',
        'Toque na porta com as costas da mão antes de abrir. Se quente, NÃO ABRA.',
        'Se suas roupas pegarem fogo: PARE, DEITE e ROLE no chão.',
      ],
      detalhes: null,
    },
  ];

  // SUB-SCREEN (DETAIL)
  if (secaoSelecionada) {
    const accent = secaoSelecionada.cor || '#6366F1';
    return (
      <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
          <StatusBar style="dark" />

          <View style={s.header}>
            <TouchableOpacity
              onPress={() => setSecaoSelecionada(null)}
              style={s.backBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <H1 style={s.title}>{secaoSelecionada.nome}</H1>
              <Caption style={s.subtitle}>
                {secaoSelecionada.itens ? `${secaoSelecionada.itens.length} passos` : ''}
              </Caption>
            </View>
          </View>

          <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
            {secaoSelecionada.detalhes ? (
              secaoSelecionada.detalhes.map((item, idx) => (
                <NeoCard variant="elevated" key={idx} style={s.itemCard}>
                  <Text style={[s.itemDetailTitle, { color: accent }]}>{item.title}</Text>
                  <Text style={s.itemDetailText}>{item.content}</Text>
                </NeoCard>
              ))
            ) : (
              secaoSelecionada.itens.map((item, idx) => (
                <NeoCard variant="elevated" key={idx} style={s.itemCardRow}>
                  <View style={[s.itemNumero, { backgroundColor: accent }]}>
                    <Text style={s.itemNumeroTexto}>{idx + 1}</Text>
                  </View>
                  <Text style={s.itemTexto}>{item}</Text>
                </NeoCard>
              ))
            )}

            <View style={s.lembreteBox}>
              <NeoIcon name="Warning2" size={18} color="#EF4444" variant="Bold" />
              <View style={{ flex: 1 }}>
                <Text style={s.lembreteTitle}>{t('headersFirst.lembreSe', 'Lembre-se')}</Text>
                <Text style={s.lembreteTexto}>
                  {t('headersFirst.aVidaVemPrimeiroObjetosPodemSerSubstituD', 'A vida vem primeiro. Objetos podem ser substituídos. NUNCA volte para uma casa em chamas.')}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
  }

  // MAIN
  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
        <StatusBar style="dark" />

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
              {t('headersFirst.firePlan', 'Plano de incêndio')}
            </H1>
            <Caption style={s.subtitle}>
              {t('headersFirst.preparaOSalvaVidas', 'Preparação salva vidas')}
            </Caption>
          </View>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* ALERT */}
          <View style={s.alertCard}>
            <NeoIcon name="Warning2" size={22} color="#F97316" variant="Bold" />
            <Text style={s.alertText}>
              <Text style={{ fontWeight: '800' }}>{t('headersFirst.critical', 'CRÍTICO:')} </Text>
              Você tem menos de 3 minutos para sair em um incêndio. Ter um plano pode salvar sua família.
            </Text>
          </View>

          {/* STATS */}
          <NeoCard variant="elevated" style={s.statsCard}>
            <View style={s.statItem}>
              <Text style={s.statNumber}>3min</Text>
              <Text style={s.statLabel}>
                {t('headersFirst.tempoParaEvacuar', 'Tempo para evacuar')}
              </Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statNumber}>2×</Text>
              <Text style={s.statLabel}>
                {t('headersFirst.treinarPorAno', 'Treinar por ano')}
              </Text>
            </View>
          </NeoCard>

          <Small style={s.sectionLabel}>
            {(t('headersFirst.monteSeuPlano', 'Monte seu plano') || '').toUpperCase()}
          </Small>

          {secoes.map(secao => (
            <TouchableOpacity
              key={secao.id}
              onPress={() => setSecaoSelecionada(secao)}
              activeOpacity={0.85}
            >
              <NeoCard variant="elevated" style={s.secaoCard}>
                <View style={[s.secaoIconBox, { backgroundColor: secao.cor + '20' }]}>
                  <Text style={s.secaoEmoji}>{secao.emoji}</Text>
                </View>
                <View style={s.secaoInfo}>
                  <H3 style={s.secaoNome}>{secao.nome}</H3>
                  <Small style={s.secaoItens}>
                    {secao.itens ? secao.itens.length : 0} passos essenciais
                  </Small>
                </View>
                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
              </NeoCard>
            </TouchableOpacity>
          ))}

          {/* INFO 3D */}
          <View style={s.infoBox}>
            <NeoIcon name="InfoCircle" size={20} color="#4F46E5" variant="Bold" />
            <View style={{ flex: 1 }}>
              <Text style={s.infoTitle}>
                {t('headersFirst.prevenO3DAplicada', 'Prevenção 3D aplicada')}
              </Text>
              <Text style={s.infoText}>
                • DIÁRIA: verificar extintores{'\n'}
                • DINÂMICA: atualizar plano{'\n'}
                • DURADOURA: treinar regularmente
              </Text>
            </View>
          </View>

          {/* EMERGÊNCIA — vermelho urgente */}
          <View style={s.emergenciaBox}>
            <NeoIcon name="Call" size={28} color="#FFF" variant="Bold" />
            <Text style={s.emergenciaTitle}>
              {t('headersFirst.emCasoDeIncNdio', 'Em caso de incêndio')}
            </Text>
            <Text style={s.emergenciaTexto}>
              Bombeiros · 193{'\n'}
              SAMU · 192{'\n'}
              {'\n'}
              SAIA PRIMEIRO, LIGUE DEPOIS!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },

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
    fontSize: 22,
  },
  subtitle: { color: Neo.colors.neutral[600] },

  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 3,
    borderLeftColor: '#F97316',
    gap: 10,
  },
  alertText: { flex: 1, fontSize: 13, color: '#9A3412', lineHeight: 19 },

  statsCard: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 26, fontWeight: '800', color: '#F44336', marginBottom: 4, letterSpacing: -0.5 },
  statLabel: { fontSize: 11.5, color: Neo.colors.neutral[600], textAlign: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.08)', marginHorizontal: 16 },

  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  secaoCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: 'center',
    gap: 12,
  },
  secaoIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secaoEmoji: { fontSize: 22 },
  secaoInfo: { flex: 1 },
  secaoNome: { fontSize: 15, fontWeight: '800', color: Neo.colors.neutral[900], marginBottom: 2 },
  secaoItens: { fontSize: 11.5, color: Neo.colors.neutral[600] },

  itemCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  itemCardRow: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: 'flex-start',
    gap: 12,
  },
  itemNumero: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  itemNumeroTexto: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  itemTexto: { flex: 1, fontSize: 14, lineHeight: 20, color: Neo.colors.neutral[800] },
  itemDetailTitle: { fontSize: 15, fontWeight: '800', marginBottom: 6 },
  itemDetailText: { fontSize: 13.5, lineHeight: 20, color: Neo.colors.neutral[800] },

  infoBox: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
    marginBottom: 20,
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 3,
    borderLeftColor: '#4F46E5',
    gap: 12,
  },
  infoTitle: { fontSize: 14, fontWeight: '800', color: '#3730A3', marginBottom: 6 },
  infoText: { fontSize: 12.5, lineHeight: 19, color: Neo.colors.neutral[800] },

  emergenciaBox: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#F44336',
    gap: 12,
  },
  emergenciaTitle: { fontSize: 16, fontWeight: '800', color: '#FFF', letterSpacing: -0.2 },
  emergenciaTexto: { fontSize: 14, color: '#FFF', lineHeight: 22, textAlign: 'center', fontWeight: '600' },

  lembreteBox: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
    gap: 10,
  },
  lembreteTitle: { fontSize: 14, fontWeight: '800', color: '#B91C1C', marginBottom: 4 },
  lembreteTexto: { fontSize: 12.5, lineHeight: 18, color: '#991B1B' },
});
