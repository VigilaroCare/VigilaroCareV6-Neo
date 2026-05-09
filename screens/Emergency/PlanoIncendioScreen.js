
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { ArrowLeft, EmojiHappy, Warning2, InfoCircle, Call } from 'iconsax-react-native';
import { Shadows } from '../../utils/Theme';
import { getFirePreventionContent } from '../../data/fire_prevention_content';
import { useTranslation } from 'react-i18next';

export default function PlanoIncendioScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const [secaoSelecionada, setSecaoSelecionada] = useState(null);

  const FIRE_PREVENTION_CONTENT = getFirePreventionContent();

  const secoes = [
    {
      id: 'prevention',
      nome: FIRE_PREVENTION_CONTENT?.prevention?.title || 'Prevenção',
      emoji: FIRE_PREVENTION_CONTENT?.prevention?.emoji || '🛡️',
      cor: '#4CAF50', // Green
      itens: FIRE_PREVENTION_CONTENT?.prevention?.sections ? FIRE_PREVENTION_CONTENT.prevention.sections.map(s => s.title) : [],
      detalhes: FIRE_PREVENTION_CONTENT?.prevention?.sections
    },
    {
      id: 'action',
      nome: FIRE_PREVENTION_CONTENT?.action?.title || 'Ação',
      emoji: FIRE_PREVENTION_CONTENT?.action?.emoji || '🔥',
      cor: '#F44336', // Red
      itens: FIRE_PREVENTION_CONTENT?.action?.steps || [],
      detalhes: null
    },
    {
      id: 'plan',
      nome: 'Plano de Fuga',
      emoji: '🗺️',
      cor: '#2196F3', // Blue
      itens: [
        'Desenhe a planta da casa e marque 2 saídas por cômodo.',
        'COMBINE UM PONTO DE ENCONTRO seguro fora da casa (ex: poste, árvore vizinha).',
        'Se houver fumaça: RASTEJE. O ar é mais limpo e fresco junto ao chão.',
        'Toque na porta com as costas da mão antes de abrir. Se quente, NÃO ABRA.',
        'Se suas roupas pegarem fogo: PARE, DEITE e ROLE no chão.'
      ],
      detalhes: null
    }
  ];

  if (!secaoSelecionada) {
    const HEADER_COLOR = '#F44336'; // Red 500

    return (
      <AppBackground variant="subtle">
      <View style={[s.container, { backgroundColor: 'transparent' }]}>
        <StatusBar style="dark" backgroundColor="transparent" />

        {/* Main Header Standardized */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
            <NeoCard variant="glass"
                style={{
                    width: '100%',
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    ...Neo.shadows?.sm
                }}
            >
                <View style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: HEADER_COLOR + '20', alignItems: 'center', justifyContent: 'center',
                    marginRight: 16
                }}>
                    <Text style={{ fontSize: 24 }}>🧯</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: HEADER_COLOR, fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('headersFirst.firePlan', 'Plano de Incêndio')}</Text>
                    <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{t('headersFirst.preparaOSalvaVidas', 'Preparação salva vidas')}</Text>
                </View>
            </NeoCard>
        </View>

        <ScrollView style={s.content} showsVerticalScrollIndicator={false}>

          <View style={s.alertCard}>
            <Warning2 size={32} color="#F97316" variant="Bold" style={{ marginRight: 16 }} />
            <Text style={s.alertText}>
              <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.critical', 'CRÍTICO:')}</Text> Você tem menos de 3 minutos para sair em um incêndio. Ter um plano pode salvar sua família!
            </Text>
          </View>

          <View style={s.statsCard}>
            <View style={s.statItem}>
              <Text style={s.statNumber}>{t('headersFirst.3min', '3min')}</Text>
              <Text style={s.statLabel}>{t('headersFirst.tempoParaEvacuar', 'Tempo para evacuar')}</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statNumber}>2x</Text>
              <Text style={s.statLabel}>{t('headersFirst.treinarPorAno', 'Treinar por ano')}</Text>
            </View>
          </View>

          <Text style={s.sectionTitle}>{t('headersFirst.monteSeuPlano', 'Monte seu Plano:')}</Text>

          {secoes.map(secao => (
            <TouchableOpacity
              key={secao.id}
              style={s.secaoCard}
              onPress={() => setSecaoSelecionada(secao)}
              activeOpacity={0.8}
            >
              <View style={[s.secaoIconBox, { backgroundColor: secao.cor + '20' }]}>
                <Text style={s.secaoEmoji}>{secao.emoji}</Text>
              </View>
              <View style={s.secaoInfo}>
                <Text style={s.secaoNome}>{secao.nome}</Text>
                <Text style={s.secaoItens}>
                  {secao.itens ? secao.itens.length : 0} passos essenciais
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={s.infoBox}>
            <InfoCircle size={24} color="#4F46E5" variant="Bold" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={s.infoTitle}>{t('headersFirst.prevenO3DAplicada', 'Prevenção 3D Aplicada')}</Text>
              <Text style={s.infoText}>
                • DIÁRIA: Verificar extintores{'\n'}
                • DINÂMICA: Atualizar plano{'\n'}
                • DURADOURA: Treinar regularmente
              </Text>
            </View>
          </View>

          <View style={s.emergenciaBox}>
            <Call size={32} color="#FFF" variant="Bold" style={{ marginBottom: 16 }} />
            <Text style={s.emergenciaTitle}>{t('headersFirst.emCasoDeIncNdio', 'Em Caso de Incêndio')}</Text>
            <Text style={s.emergenciaTexto}>
              🚒 Bombeiros: 193{'\n'}
              🚑 SAMU: 192{'\n'}
              {'\n'}
              SAIA PRIMEIRO, LIGUE DEPOIS!
            </Text>
          </View>

          <View style={{ height: 40 }} />

        </ScrollView>
      </View>
      </AppBackground>
    );
  }

  // SUB-SCREEN (DETAIL)
  const SUB_HEADER_COLOR = secaoSelecionada.cor || '#6366F1';

  return (
    <AppBackground variant="subtle">
    <View style={[s.container, { backgroundColor: 'transparent' }]}>
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Sub Header Standardized */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
          <TouchableOpacity onPress={() => setSecaoSelecionada(null)} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
              <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
          <NeoCard variant="glass"
              style={{
                  width: '100%',
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  ...Neo.shadows?.sm
              }}
          >
              <View style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: SUB_HEADER_COLOR + '20', alignItems: 'center', justifyContent: 'center',
                  marginRight: 16
              }}>
                  <Text style={{ fontSize: 24 }}>{secaoSelecionada.emoji || '💡'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                  <Text style={{ color: SUB_HEADER_COLOR, fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{secaoSelecionada.nome}</Text>
                  <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{secaoSelecionada.itens ? `${secaoSelecionada.itens.length} passos essenciais` : ''}</Text>
              </View>
          </NeoCard>
      </View>

      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {secaoSelecionada.detalhes ? (
          secaoSelecionada.detalhes.map((item, idx) => (
            <View key={idx} style={s.itemCard}>
              <Text style={[s.itemDetailTitle, { color: secaoSelecionada.cor }]}>{item.title}</Text>
              <Text style={s.itemDetailText}>{item.content}</Text>
            </View>
          ))
        ) : (
          secaoSelecionada.itens.map((item, idx) => (
            <View key={idx} style={s.itemCard}>
              <View style={[s.itemNumero, { backgroundColor: secaoSelecionada.cor }]}>
                <Text style={s.itemNumeroTexto}>{idx + 1}</Text>
              </View>
              <Text style={s.itemTexto}>{item}</Text>
            </View>
          ))
        )}

        <View style={s.lembreteBox}>
          <Warning2 size={24} color="#EF4444" variant="Bold" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={s.lembreteTitle}>{t('headersFirst.lembreSe', 'Lembre-se')}</Text>
            <Text style={s.lembreteTexto}>
              {t('headersFirst.aVidaVemPrimeiroObjetosPodemSerSubstituD', 'A vida vem primeiro! Objetos podem ser substituídos. NUNCA volte para uma casa em chamas.')}
            </Text>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  content: { flex: 1, padding: 24 },

  alertCard: {
    padding: 16, borderRadius: 16, marginBottom: 20, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF3E0', borderWidth: 1, borderColor: '#FFE0B2', ...Shadows.sm
  },
  alertText: { flex: 1, fontSize: 13, color: '#E65100', lineHeight: 20 },

  statsCard: {
    flexDirection: 'row', padding: 20, borderRadius: 16, marginBottom: 24,
    backgroundColor: '#FFF', ...Shadows.sm, alignItems: 'center'
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: '#F44336', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6B7280', textAlign: 'center' },
  statDivider: { width: 1, height: 40, backgroundColor: '#E5E7EB', marginHorizontal: 20 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' },

  secaoCard: {
    flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12,
    backgroundColor: '#FFF', ...Shadows.sm, alignItems: 'center',
    borderWidth: 1, borderColor: '#F3F4F6'
  },
  secaoIconBox: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  secaoEmoji: { fontSize: 24 },
  secaoInfo: { flex: 1 },
  secaoNome: { fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 },
  secaoItens: { fontSize: 12, color: '#6B7280' },

  itemCard: {
    flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12,
    backgroundColor: '#FFF', ...Shadows.sm, alignItems: 'flex-start',
    borderWidth: 1, borderColor: '#F3F4F6'
  },
  itemNumero: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
  itemNumeroTexto: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  itemTexto: { flex: 1, fontSize: 14, lineHeight: 22, color: '#374151' },

  itemDetailTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  itemDetailText: { fontSize: 14, lineHeight: 22, color: '#374151' },

  infoBox: {
    flexDirection: 'row', padding: 16, borderRadius: 16, marginTop: 12, marginBottom: 24,
    backgroundColor: '#EEF2FF', borderLeftWidth: 4, borderLeftColor: '#4F46E5'
  },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#4F46E5', marginBottom: 8 },
  infoText: { fontSize: 13, lineHeight: 22, color: '#374151' },

  emergenciaBox: {
    padding: 24, borderRadius: 24, marginBottom: 40, alignItems: 'center',
    backgroundColor: '#F44336', ...Shadows.md
  },
  emergenciaTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  emergenciaTexto: { fontSize: 15, color: '#FFFFFF', lineHeight: 26, textAlign: 'center', fontWeight: '500' },

  lembreteBox: {
    padding: 16, borderRadius: 16, marginTop: 12, marginBottom: 30,
    backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', flexDirection: 'row'
  },
  lembreteTitle: { fontSize: 15, fontWeight: 'bold', color: '#B91C1C', marginBottom: 4 },
  lembreteTexto: { fontSize: 13, lineHeight: 20, color: '#991B1B' }
});
