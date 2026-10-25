import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../components/NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { DS as Neo } from '../utils/DesignSystem2026';
import { tx } from '../utils/txFixo';

const T = 'telas.SituacoesTemporariasScreen.';
const OPTIONS = [
  { key: 'reforma', get title() { return tx(T + 'reformaTitulo', 'Reforma / Manutenção'); }, get subtitle() { return tx(T + 'reformaSubtitulo', 'Trabalhos temporários em casa'); }, icon: 'construct-outline', color: Neo.colors.feedback.warning },
  { key: 'festa', get title() { return tx(T + 'festaTitulo', 'Festa / Visita'); }, get subtitle() { return tx(T + 'festaSubtitulo', 'Reuniões e eventos sociais'); }, icon: 'people-outline', color: Neo.colors.feedback.error },
  { key: 'mudanca', get title() { return tx(T + 'mudancaTitulo', 'Mudança de Moradia'); }, get subtitle() { return tx(T + 'mudancaSubtitulo', 'Novo lar, novos riscos'); }, icon: 'home-outline', color: Neo.colors.secondary[500] },
  { key: 'outro', get title() { return tx(T + 'outroTitulo', 'Outro Evento'); }, get subtitle() { return tx(T + 'outroSubtitulo', 'Cuidador, técnico, etc.'); }, icon: 'ellipsis-horizontal-circle-outline', color: Neo.colors.primary[500] },
];

export default function SituacoesTemporariasScreen({ navigation }) {
    const { t } = useTranslation('common');
  const insets = useSafeAreaInsets();

  function abrir(tipo) {
    if (tipo === 'reforma') {
      navigation.navigate('RenovationType');
      return;
    }
    if (tipo === 'festa') {
      navigation.navigate('VisitType');
      return;
    }
    navigation.navigate('ModoSituacaoAtiva', { type: tipo, title: OPTIONS.find(o => o.key === tipo)?.title || tx(T + 'situacao', 'Situação') });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Neo.colors.primary[900]} />

      <LinearGradient
        colors={[Neo.colors.primary[800], Neo.colors.primary[600]]}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('headersFirst.gestODeEventos', 'Gestão de Eventos')}</Text>
        <Text style={styles.headerSubtitle}>{t('headersFirst.monitoreRiscosTemporRios', 'Monitore riscos temporários')}</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>{t('headersFirst.selecioneOEvento', 'Qual evento?')}</Text>
        <Text style={styles.sectionSubtitle}>
          {t('headersFirst.ajustaremosAsRecomendaEsDeSeguranAComBas', 'Ajustaremos as recomendações de segurança com base no cenário escolhido.')}
        </Text>

        <View style={styles.grid}>
          {OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={styles.card}
              onPress={() => abrir(opt.key)}
              activeOpacity={0.9}
            >
              <View style={[styles.iconWrap, { backgroundColor: opt.color + '20' }]}>
                <NeoIcon name={opt.icon} size={28} color={opt.color} />
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{opt.title}</Text>
                <Text style={styles.cardSub}>{opt.subtitle}</Text>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[500]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Shadows.md,
  },
  backBtn: {
    marginBottom: Spacing.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Neo.colors.neutral.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Neo.colors.neutral.white + 'E6',
  },
  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
    color: Neo.colors.neutral[900],
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: Typography.sizes.sm,
    color: Neo.colors.neutral[600],
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  grid: {
    gap: Spacing.md,
  },
  card: {
    backgroundColor: Neo.colors.neutral.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
    borderWidth: 1,
    borderColor: Neo.colors.neutral[200],
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  cardBody: { flex: 1 },
  cardTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: 'bold',
    color: Neo.colors.neutral[900],
    marginBottom: 2,
  },
  cardSub: {
    fontSize: Typography.sizes.sm,
    color: Neo.colors.neutral[600],
  },
});


