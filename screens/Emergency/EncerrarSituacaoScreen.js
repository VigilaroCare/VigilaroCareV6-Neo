import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Body, Caption } from "../../components/NeoTypography";
import { DS as Neo } from '../../utils/DesignSystem2026';
import { tx } from '../../utils/txFixo';

const POST_ITEMS = [
  { key: 'residuos',   get label() { return tx('telas.EncerrarSituacaoScreen.posResiduos', 'Resíduos e ferramentas recolhidos'); } },
  { key: 'protetores', get label() { return tx('telas.EncerrarSituacaoScreen.posProtetores', 'Protetores reinstalados'); } },
  { key: 'ventilacao', get label() { return tx('telas.EncerrarSituacaoScreen.posVentilacao', 'Áreas ventiladas e limpas'); } },
];

export default function EncerrarSituacaoScreen({ route, navigation }) {
  const { t } = useTranslation('common');
  const { type = 'reforma', tempIndex = 75 } = route.params || {};
  const [done, setDone] = useState(() => POST_ITEMS.reduce((acc, it) => ({ ...acc, [it.key]: false }), {}));

  const completed = Object.values(done).filter(Boolean).length;
  const restoredIndex = Math.min(100, tempIndex + Math.round((completed / POST_ITEMS.length) * 20));

  const toggle = (k) => setDone(prev => ({ ...prev, [k]: !prev[k] }));

  const finalizar = () => {
    // 'DashboardPersonalizado' nao existe em App.js: o botao de concluir do
    // encerramento de situacao nao levava a lugar nenhum. Volta para as abas,
    // que e o destino que as outras telas deste fluxo usam.
    navigation.navigate('MainTabs');
  };

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style="dark" />

        {/* HEADER padronizado */}
        <View style={s.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={s.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <H1 style={s.title}>{t('telas.EncerrarSituacaoScreen.encerrar', 'Encerrar ')}{type === 'reforma' ? 'reforma' : type}
            </H1>
            <Caption style={s.subtitle}>{t('telas.EncerrarSituacaoScreen.restaurarSegurancaDoLar', 'Restaurar segurança do lar')}</Caption>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
        >
          <Body style={s.intro}>
            {t('headersFirst.reviseOsItensAbaixoParaRestaurarASeguran', 'Revise os itens abaixo para restaurar a segurança do lar.')}
          </Body>

          <View style={{ marginTop: 14 }}>
            {POST_ITEMS.map(it => {
              const isDone = done[it.key];
              return (
                <NeoCard
                  key={it.key}
                  variant="elevated"
                  style={[s.row, isDone && s.rowDone]}
                >
                  <TouchableOpacity onPress={() => toggle(it.key)} style={s.rowInner} activeOpacity={0.85}>
                    <View style={{ flex: 1 }}>
                      <Body style={[s.rowLabel, isDone && { color: Neo.colors.neutral[600], textDecorationLine: 'line-through' }]}>
                        {it.label}
                      </Body>
                    </View>
                    <View style={[s.checkbox, isDone && s.checkboxDone]}>
                      {isDone ? (
                        <NeoIcon name="Tick" size={14} color="#FFF" variant="Bold" />
                      ) : (
                        <Text style={{ color: Neo.colors.neutral[500], fontWeight: '700' }}>—</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </NeoCard>
              );
            })}
          </View>

          <NeoCard variant="elevated" style={s.indexCard}>
            <Caption style={{ color: Neo.colors.neutral[600] }}>
              {t('headersFirst.NdiceRestauradoEstimado', 'Índice restaurado estimado')}
            </Caption>
            <Text style={s.indexValue}>{restoredIndex}%</Text>
          </NeoCard>

          <TouchableOpacity style={s.primary} onPress={finalizar} activeOpacity={0.85}>
            <NeoIcon name="TickCircle" size={20} color="#FFF" variant="Bold" />
            <Body style={s.primaryText}>
              {t('headersFirst.concluirEVoltarAoDashboard', 'Concluir e voltar ao painel')}
            </Body>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
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
  subtitle: {
    color: Neo.colors.neutral[600],
  },

  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },
  intro: {
    color: Neo.colors.neutral[700],
    fontSize: 14,
    lineHeight: 20,
  },

  row: {
    padding: 0,
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  rowDone: {
    backgroundColor: Neo.colors.feedback.success + '12',
    borderWidth: 1,
    borderColor: Neo.colors.feedback.success + '40',
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  rowLabel: {
    fontWeight: '600',
    color: Neo.colors.neutral[900],
    fontSize: 14.5,
  },
  checkbox: {
    width: 38,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxDone: {
    backgroundColor: Neo.colors.feedback.success,
  },

  indexCard: {
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  indexValue: {
    fontSize: 28,
    fontWeight: '800',
    color: Neo.colors.feedback.success,
    marginTop: 4,
    letterSpacing: -0.5,
  },

  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Neo.colors.primary[600],
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 18,
  },
  primaryText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
