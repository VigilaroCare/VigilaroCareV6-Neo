/**
 * EmergenciaRapidaScreen.js
 * Tela DELIBERADAMENTE em modo-pânico: alto contraste, fontes
 * imensas, decisão em segundos. NÃO usa AppBackground mist nem
 * NeoCard glass — esta é a única tela do app onde "calmo" prejudica
 * a UX. Mantém visual escuro + cards coloridos por severidade.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, Text, StyleSheet, TouchableOpacity, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import { DS as Neo } from '../../utils/DesignSystem2026';

const EMERGENCIA_TIPOS = [
  {
    id: 'engasgo', titulo: 'ENGASGO', icon: 'Danger', cor: Neo.colors.accent?.champagne || '#D97706',
    passos: [
      '1. Posicione-se atrás da pessoa.',
      '2. Abrace a cintura.',
      '3. Puxe forte para dentro e para cima (Manobra de Heimlich).',
    ],
  },
  {
    id: 'parada', titulo: 'PARADA CARDÍACA', icon: 'Heart', cor: Neo.colors.emergency?.panic || '#DC2626',
    passos: [
      '1. Deite a pessoa no chão duro.',
      '2. Coloque as mãos no centro do peito.',
      '3. Comprima forte e rápido (100 a 120 vezes por minuto) sem parar.',
    ],
  },
  {
    id: 'queda', titulo: 'QUEDA GRAVE', icon: 'Flash', cor: '#EA580C',
    passos: [
      '1. Não tente levantar a pessoa!',
      '2. Estanque qualquer sangramento com pano limpo.',
      '3. Acalme e aguarde o socorro.',
    ],
  },
  {
    id: 'intoxicacao', titulo: 'INTOXICAÇÃO', icon: 'Drop', cor: '#7C3AED',
    passos: [
      '1. NÃO provoque vômito!',
      '2. Identifique o produto ou medicamento.',
      '3. Ligue imediatamente para o CIT: 0800 722 6001.',
    ],
  },
  {
    id: 'incendio', titulo: 'INCÊNDIO', icon: 'Flash', cor: Neo.colors.feedback.error,
    passos: [
      '1. Saia do local o mais rápido possível.',
      '2. Se houver fumaça, engatinhe.',
      '3. Feche as portas atrás de você para atrasar o fogo.',
    ],
  },
];

export default function EmergenciaRapidaScreen({ navigation }) {
  const { t } = useTranslation('common');
  const [tipoSelecionado, setTipoSelecionado] = useState(null);

  const LigarSamu = () => Linking.openURL('tel:192');
  const LigarBombeiros = () => Linking.openURL('tel:193');
  const LigarCIT = () => Linking.openURL('tel:08007226001');

  if (tipoSelecionado) {
    return (
      <SafeAreaView style={[s.container, { backgroundColor: tipoSelecionado.cor }]}>
        <StatusBar style="light" />

        {/* Cabeçalho */}
        <View style={s.headerProtocol}>
          <TouchableOpacity
            onPress={() => setTipoSelecionado(null)}
            style={s.btnVoltar}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <NeoIcon name="ArrowLeft2" size={28} color={Neo.colors.neutral.white} variant="Bold" />
          </TouchableOpacity>
          <Text style={s.protocolTitle}>{tipoSelecionado.titulo}</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Passos */}
        <View style={s.contentProtocol}>
          <Text style={s.passosHeader}>{t('headersFirst.fAAAGORA', 'FAÇA AGORA:')}</Text>
          {tipoSelecionado.passos.map((passo, i) => (
            <Text key={i} style={s.passoText}>{passo}</Text>
          ))}
        </View>

        {/* Botões Telefone no Rodapé */}
        <View style={s.footerCall}>
          {tipoSelecionado.id === 'intoxicacao' ? (
            <TouchableOpacity onPress={LigarCIT} style={[s.callBtn, { backgroundColor: '#5B21B6' }]}>{/* TODO: map #5B21B6 to DS token */}
              <NeoIcon name="Call" size={28} color={Neo.colors.neutral.white} variant="Bold" />
              <Text style={s.callText}>CIT 0800 722 6001</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={LigarSamu} style={[s.callBtn, { backgroundColor: Neo.colors.emergency?.panicDark || '#B91C1C' }]}>
              <NeoIcon name="Call" size={28} color={Neo.colors.neutral.white} variant="Bold" />
              <Text style={s.callText}>{t('headersFirst.sAMU192', 'SAMU 192')}</Text>
            </TouchableOpacity>
          )}
          {tipoSelecionado.id === 'incendio' && (
            <TouchableOpacity onPress={LigarBombeiros} style={[s.callBtn, { backgroundColor: Neo.colors.emergency?.panicDark || '#991B1B', marginTop: 12 }]}>
              <NeoIcon name="Call" size={28} color={Neo.colors.neutral.white} variant="Bold" />
              <Text style={s.callText}>{t('headersFirst.bOMBEIROS193', 'BOMBEIROS 193')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[s.container, { backgroundColor: Neo.colors.neutral[900] }]}>
      <StatusBar style="light" />
      <View style={s.headerSelect}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={s.btnVoltarMenu}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={s.fecharText}>{t('headersFirst.sAIR', 'SAIR')}</Text>
        </TouchableOpacity>
        <Text style={s.mainTitle}>{t('headersFirst.oQUEACONTECEU', 'O QUE ACONTECEU?')}</Text>
      </View>

      <View style={s.cardsGrid}>
        {EMERGENCIA_TIPOS.map((tipo) => (
          <TouchableOpacity
            key={tipo.id}
            activeOpacity={0.85}
            style={[s.tipoCard, { backgroundColor: tipo.cor }]}
            onPress={() => setTipoSelecionado(tipo)}
          >
            <NeoIcon name={tipo.icon} size={32} color={Neo.colors.neutral.white} variant="Bold" />
            <Text style={s.cardLabel}>{tipo.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  // Select Mode
  headerSelect: { alignItems: 'center', marginVertical: 32 },
  btnVoltarMenu: { position: 'absolute', right: 0, padding: 8 },
  fecharText: { color: Neo.colors.neutral[400], fontWeight: '800', fontSize: 16 },
  mainTitle: { color: Neo.colors.neutral.white, fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  cardsGrid: { flex: 1, gap: 16, justifyContent: 'center' },
  tipoCard: {
    flexDirection: 'row', alignItems: 'center', padding: 24,
    borderRadius: 20, gap: 16,
  },
  cardLabel: { color: Neo.colors.neutral.white, fontSize: 24, fontWeight: '900' },

  // Protocol Mode
  headerProtocol: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginVertical: 16,
  },
  btnVoltar: {
    padding: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 24,
    width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
  },
  protocolTitle: { color: Neo.colors.neutral.white, fontSize: 22, fontWeight: '900', flex: 1, textAlign: 'center' },
  contentProtocol: { flex: 1, justifyContent: 'center', paddingHorizontal: 8 },
  passosHeader: {
    color: 'rgba(255,255,255,0.85)', fontSize: 20, fontWeight: '800',
    marginBottom: 24, letterSpacing: 1,
  },
  passoText: {
    color: Neo.colors.neutral.white, fontSize: 26, fontWeight: '800',
    lineHeight: 34, marginBottom: 24,
  },
  footerCall: { paddingBottom: 24 },
  callBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20, borderRadius: 100, gap: 12,
  },
  callText: { color: Neo.colors.neutral.white, fontSize: 22, fontWeight: '900' },
});
