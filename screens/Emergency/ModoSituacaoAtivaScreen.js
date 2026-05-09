import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function ModoSituacaoAtivaScreen({ route, navigation }) {
    const { t } = useTranslation('common');
  const { type = 'reforma', durationDays = 7, tempIndex = 75 } = route.params || {};

  function encerrar() {
    navigation.navigate('EncerrarSituacao', { type, durationDays, tempIndex });
  }

  return (
    <AppBackground variant="subtle">
        <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.banner}>⚠️ {type === 'reforma' ? 'Modo Reforma Ativo' : 'Situação Temporária Ativa'}</Text>
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>{t('headersFirst.NdiceAtual', 'Índice atual')}</Text>
          <Text style={styles.summaryValue}>{tempIndex}%</Text>
          <Text style={styles.summaryNote}>{t('headersFirst.riscoTemporRioDetectadoSigaAsRecomendaEs', 'Risco temporário detectado — siga as recomendações')}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.sectionTitle}>{t('headersFirst.recomendaEsPrincipais', 'Recomendações principais')}</Text>
          <View style={styles.recoCard}>
            {type === 'reforma' && (
              <>
                <Text>{t('headersFirst.RecolhaFerramentasAoFinalDoDia', '• Recolha ferramentas ao final do dia.')}</Text>
                <Text>{t('headersFirst.EviteImprovisarConexEsElTricas', '• Evite improvisar conexões elétricas.')}</Text>
                <Text>{t('headersFirst.MantenhaReasDeCirculaOLivres', '• Mantenha áreas de circulação livres.')}</Text>
              </>
            )}
            {type === 'visita' && (
              <>
                <Text>{t('headersFirst.MantenhaASupervisOConstante', '• Mantenha a supervisão constante.')}</Text>
                <Text>{t('headersFirst.VerifiqueTrancasEPortEsRegularmente', '• Verifique trancas e portões regularmente.')}</Text>
                <Text>{t('headersFirst.AtenORedobradaComPiscinaECozinha', '• Atenção redobrada com piscina e cozinha.')}</Text>
              </>
            )}
            {type !== 'reforma' && type !== 'visita' && (
              <Text>{t('headersFirst.SigaOChecklistDeSeguranA', '• Siga o checklist de segurança.')}</Text>
            )}
          </View>
        </View>

        <View style={{ marginTop: 18 }}>
          <TouchableOpacity style={styles.ghost} onPress={() => navigation.navigate('ChecklistReforma')}>
            <Text style={{ color: Neo.colors.neutral[900], fontWeight: '700' }}>{t('headersFirst.revisarChecklist', 'Revisar checklist')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primary} onPress={encerrar}>
            <Text style={{ color: Neo.colors.neutral.white, fontWeight: '700' }}>{t('headersFirst.encerrarSituaO', 'Encerrar situação')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
      </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  inner: { padding: 20 },
  banner: { fontSize: 16, fontWeight: '700', color: Neo.colors.feedback.warning },
  summary: { backgroundColor: Neo.colors.neutral.white, padding: 14, borderRadius: 12, marginTop: 12, ...Neo.shadows?.sm },
  summaryLabel: { color: Neo.colors.neutral[500] },
  summaryValue: { fontSize: 28, fontWeight: '800', color: Neo.colors.feedback.warning },
  summaryNote: { color: Neo.colors.neutral[600], marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Neo.colors.neutral[900] },
  recoCard: { backgroundColor: Neo.colors.neutral.white, padding: 12, borderRadius: 12, marginTop: 8, ...Neo.shadows?.sm },
  ghost: { marginTop: 12, alignItems: 'center' },
  primary: {
    marginTop: 12,
    backgroundColor: Neo.colors.feedback.warning,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});


