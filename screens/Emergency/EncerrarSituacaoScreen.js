import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

const POST_ITEMS = [
  { key: 'residuos', label: 'Resíduos e ferramentas recolhidos' },
  { key: 'protetores', label: 'Protetores reinstalados' },
  { key: 'ventilacao', label: 'Áreas ventiladas e limpas' },
];

export default function EncerrarSituacaoScreen({ route, navigation }) {
    const { t } = useTranslation('common');
  const { type = 'reforma', tempIndex = 75 } = route.params || {};
  const [done, setDone] = useState(() => POST_ITEMS.reduce((s, it) => ({ ...s, [it.key]: false }), {}));

  const completed = Object.values(done).filter(Boolean).length;
  const restoredIndex = Math.min(100, tempIndex + Math.round((completed / POST_ITEMS.length) * 20));

  function toggle(k) {
    setDone(prev => ({ ...prev, [k]: !prev[k] }));
  }

  function finalizar() {
    navigation.navigate('DashboardPersonalizado'); // ajuste conforme seu nome de rota
  }

  return (
    <AppBackground variant="subtle">
        <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Encerrar: {type === 'reforma' ? 'Reforma' : type}</Text>
        <Text style={styles.subtitle}>{t('headersFirst.reviseOsItensAbaixoParaRestaurarASeguran', 'Revise os itens abaixo para restaurar a segurança do lar.')}</Text>

        <View style={{ marginTop: 12 }}>
          {POST_ITEMS.map(it => (
            <TouchableOpacity key={it.key} style={styles.row} onPress={() => toggle(it.key)}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowLabel}>{it.label}</Text>
              </View>
              <View style={[styles.checkbox, done[it.key] && styles.checkboxDone]}>
                {done[it.key] ? <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>OK</Text> : <Text style={{ color: '#6B7280' }}>—</Text>}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 18 }}>
          <Text style={{ color: '#6B7280' }}>{t('headersFirst.NdiceRestauradoEstimado', 'Índice restaurado estimado')}</Text>
          <Text style={{ fontSize: 28, fontWeight: '800', color: '#16A34A', marginTop: 6 }}>{restoredIndex}%</Text>
        </View>

        <TouchableOpacity style={styles.primary} onPress={finalizar}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{t('headersFirst.concluirEVoltarAoDashboard', 'Concluir e voltar ao Dashboard')}</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
      </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F8FA' },
  inner: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', color: '#0F172A' },
  subtitle: { color: '#475569', marginTop: 6 },
  row: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLabel: { fontWeight: '600', color: '#0F172A' },
  checkbox: { width: 48, height: 32, borderRadius: 8, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  checkboxDone: { backgroundColor: '#16A34A' },
  primary: {
    marginTop: 18,
    backgroundColor: '#3A7BD5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
});


