import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';

const ACCENT = Neo.colors.feedback.warning;

export default function ModoSituacaoAtivaScreen({ route, navigation }) {
  const { t } = useTranslation('common');
  const { type = 'reforma', durationDays = 7, tempIndex = 75 } = route.params || {};

  const encerrar = () => {
    navigation.navigate('EncerrarSituacao', { type, durationDays, tempIndex });
  };

  const tituloModo = type === 'reforma' ? t('telas.ModoSituacaoAtivaScreen.modoReformaAtivo', 'Modo Reforma ativo') : t('telas.ModoSituacaoAtivaScreen.situacaoTemporariaAtiva', 'Situação temporária ativa');

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
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
            <H1 style={s.title}>{tituloModo}</H1>
            <Caption style={s.subtitle}>
              {durationDays} {durationDays === 1 ? 'dia' : 'dias'}{t('telas.ModoSituacaoAtivaScreen.deDuracao', ' de duração')}</Caption>
          </View>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* Banner laranja sutil */}
          <View style={s.bannerCard}>
            <NeoIcon name="Warning2" size={18} color={ACCENT} variant="Bold" />
            <Body style={s.bannerText}>{t('telas.ModoSituacaoAtivaScreen.riscoTemporarioDetectadoSigaAsRecomendac', 'Risco temporário detectado — siga as recomendações.')}</Body>
          </View>

          {/* Índice */}
          <NeoCard variant="elevated" style={s.summaryCard}>
            <Caption style={s.summaryLabel}>
              {t('headersFirst.NdiceAtual', 'ÍNDICE ATUAL')}
            </Caption>
            <Text style={s.summaryValue}>{tempIndex}%</Text>
            <Small style={s.summaryNote}>
              {t('headersFirst.riscoTemporRioDetectadoSigaAsRecomendaEs', 'Risco temporário detectado.')}
            </Small>
          </NeoCard>

          {/* Recomendações */}
          <Small style={s.sectionLabel}>
            {(t('headersFirst.recomendaEsPrincipais', 'Recomendações principais') || '').toUpperCase()}
          </Small>
          <NeoCard variant="elevated" style={s.recoCard}>
            {type === 'reforma' && (
              <>
                <RecoItem text={t('headersFirst.RecolhaFerramentasAoFinalDoDia', 'Recolha ferramentas ao final do dia.')} />
                <RecoItem text={t('headersFirst.EviteImprovisarConexEsElTricas', 'Evite improvisar conexões elétricas.')} />
                <RecoItem text={t('headersFirst.MantenhaReasDeCirculaOLivres', 'Mantenha áreas de circulação livres.')} />
              </>
            )}
            {type === 'visita' && (
              <>
                <RecoItem text={t('headersFirst.MantenhaASupervisOConstante', 'Mantenha a supervisão constante.')} />
                <RecoItem text={t('headersFirst.VerifiqueTrancasEPortEsRegularmente', 'Verifique trancas e portões regularmente.')} />
                <RecoItem text={t('headersFirst.AtenORedobradaComPiscinaECozinha', 'Atenção redobrada com piscina e cozinha.')} />
              </>
            )}
            {type !== 'reforma' && type !== 'visita' && (
              <RecoItem text={t('headersFirst.SigaOChecklistDeSeguranA', 'Siga o checklist de segurança.')} />
            )}
          </NeoCard>

          {/* CTAs */}
          <TouchableOpacity
            style={s.ghost}
            onPress={() => navigation.navigate('ChecklistReforma')}
            activeOpacity={0.85}
          >
            <NeoIcon name="DocumentText" size={18} color={Neo.colors.neutral[800]} variant="Bold" />
            <Text style={s.ghostText}>
              {t('headersFirst.revisarChecklist', 'Revisar checklist')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.primary} onPress={encerrar} activeOpacity={0.85}>
            <NeoIcon name="TickCircle" size={20} color="#FFF" variant="Bold" />
            <Text style={s.primaryText}>
              {t('headersFirst.encerrarSituaO', 'Encerrar situação')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const RecoItem = ({ text }) => (
  <View style={s.recoRow}>
    <View style={s.recoDot} />
    <Body style={s.recoText}>{text}</Body>
  </View>
);

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
  title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
  subtitle: { color: Neo.colors.neutral[600] },

  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ACCENT + '14',
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    gap: 10,
  },
  bannerText: { flex: 1, color: Neo.colors.neutral[800], fontSize: 13.5, fontWeight: '700' },

  summaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  summaryLabel: {
    color: Neo.colors.neutral[600],
    fontWeight: '800',
    letterSpacing: 1.2,
    fontSize: 11,
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: '800',
    color: ACCENT,
    marginTop: 4,
    letterSpacing: -1,
  },
  summaryNote: {
    color: Neo.colors.neutral[700],
    marginTop: 6,
    fontSize: 12.5,
    lineHeight: 17,
  },

  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  recoCard: {
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
  },
  recoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recoDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
    marginTop: 8,
    marginRight: 10,
  },
  recoText: {
    flex: 1,
    color: Neo.colors.neutral[800],
    fontSize: 13.5,
    lineHeight: 19,
  },

  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  ghostText: {
    color: Neo.colors.neutral[900],
    fontWeight: '800',
    fontSize: 14,
  },

  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10,
    backgroundColor: ACCENT,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 15,
  },
});
