import React from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import AppBackground from '../../components/AppBackground';
import ProfileService from '../../services/ProfileService';
import { useThemeColors } from '../../utils/ThemeContext';
import { getPoisonControlDial, getPoisonControlLabel } from '../../utils/emergencyTokens';

export default function EmergenciaPetScreen({ navigation }) {
  const { t } = useTranslation('common');
  const colors = useThemeColors();
  const [species, setSpecies] = React.useState([]);

  React.useEffect(() => {
    async function loadData() {
      try {
        const pets = await ProfileService.getPets();
        const uniqueSpecies = [...new Set(pets.map(p => p.especie?.toLowerCase() || ''))].filter(s => s !== '');
        setSpecies(uniqueSpecies);
      } catch (e) {
        if (__DEV__) console.warn('[EmergenciaPet] loadData', e);
      }
    }
    loadData();
  }, []);

  const callCiatox = () => Linking.openURL(`tel:${getPoisonControlDial()}`);
  const callVet = () => Linking.openURL('geo:0,0?q=veterinario 24h');

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
            <H1 style={s.title}>
              {t('headersFirst.sosPet', 'S.O.S Pet')}
            </H1>
            <Caption style={s.subtitle}>
              {t('headersFirst.centralDeAOImediata', 'Central de ação imediata')}
            </Caption>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }}
          showsVerticalScrollIndicator={false}
        >
          {/* PROTOCOLOS DE SOBREVIVÊNCIA */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('PrimeirosSocorros', {
              petHero: {
                titulo: t('headersFirst.survivalProtocols', 'Protocolos de sobrevivência'),
                cor: Neo.colors.primary[500],
              }
            })}
          >
            <NeoCard variant="elevated" style={s.heroAction}>
              <View style={[s.heroIconBox, { backgroundColor: Neo.colors.primary[500] }]}>
                <NeoIcon name="Pet" size={26} color={colors.neutral.white} variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={s.heroActionTitle}>
                  {t('headersFirst.survivalProtocols', 'Protocolos de sobrevivência')}
                </H3>
                <Body style={s.heroActionDesc}>
                  {t('headersFirst.guiasPassoAPassoRPidosParaEngasgoEnvenen', 'Guias passo a passo para engasgo, envenenamento e quedas.')}
                </Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.primary[500]} />
            </NeoCard>
          </TouchableOpacity>

          {/* LIGAÇÕES DE RISCO */}
          <Small style={s.sectionLabel}>
            {(t('headersFirst.lifeThreateningCall', 'Risco de morte') || '').toUpperCase()}
          </Small>

          {/* PÂNICO: INTOXICAÇÃO */}
          <TouchableOpacity activeOpacity={0.85} onPress={callCiatox}>
            <View style={[s.panicCard, { backgroundColor: Neo.colors.feedback.error }]}>
              <View style={[s.panicIcon, { backgroundColor: Neo.emergency?.panicDark || '#B91C1C' }]}>
                <NeoIcon name="Danger" size={26} color={colors.neutral.white} variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={s.panicTitle}>
                  {t('headersFirst.poisoning', 'Envenenamento / tóxicos')}
                </H3>
                <Body style={s.panicSub}>
                  {t('headersFirst.callPoisonControl', { defaultValue: 'Ligue para {{poisonControl}}', poisonControl: getPoisonControlLabel() })}
                </Body>
              </View>
              <View style={s.panicBtn}>
                <Small style={s.panicBtnText}>LIGAR</Small>
              </View>
            </View>
          </TouchableOpacity>

          {/* PÂNICO: TRAUMA */}
          <TouchableOpacity activeOpacity={0.85} onPress={callVet}>
            <View style={[s.panicCard, { backgroundColor: Neo.colors.feedback.warning }]}>
              <View style={[s.panicIcon, { backgroundColor: Neo.colors.accent?.copper || '#B45309' }]}>
                <NeoIcon name="Location" size={26} color={colors.neutral.white} variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={s.panicTitle}>
                  {t('headersFirst.hemorrhage', 'Hemorragia / traumas')}
                </H3>
                <Body style={s.panicSub}>
                  {t('headersFirst.buscarClNicas24hNaRegiO', 'Clínicas 24h na região')}
                </Body>
              </View>
              <View style={s.panicBtn}>
                <Small style={s.panicBtnText}>BUSCAR</Small>
              </View>
            </View>
          </TouchableOpacity>

          {/* PROTOCOLO ESPECIAL: AVE */}
          {species && species.length > 0 && species.includes('ave') && (
            <View style={{ marginTop: 20 }}>
              <Small style={s.sectionLabel}>
                PROTOCOLOS DETECTADOS
              </Small>
              <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('AvesSeguras')}>
                <NeoCard variant="elevated" style={s.specialCard}>
                  <View style={[s.heroIconBox, { backgroundColor: 'rgba(2, 136, 209, 0.14)', width: 44, height: 44, borderRadius: 12 }]}>
                    <NeoIcon name="Health" size={22} color={Neo.colors.secondary[500]} variant="Bold" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <H3 style={{ color: Neo.colors.gridAccents?.vistorias?.color || '#0369A1', fontSize: 15 }}>
                      {t('headersFirst.atenOAveNaCasa', 'Atenção: ave na casa')}
                    </H3>
                    <Body style={{ color: Neo.colors.secondary[500], fontSize: 12, marginTop: 2 }}>
                      {t('headersFirst.riscoRespiratRioCrTicoTeflonVapores', 'Risco respiratório crítico (Teflon/vapores)')}
                    </Body>
                  </View>
                  <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.secondary[500]} />
                </NeoCard>
              </TouchableOpacity>
            </View>
          )}

          {/* CARTEIRINHA */}
          <Small style={[s.sectionLabel, { marginTop: 24 }]}>
            DOCUMENTOS
          </Small>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Perfil' })}
          >
            <NeoCard variant="elevated" style={s.docCard}>
              <View style={s.docIconBox}>
                <NeoIcon name="Card" size={20} color={Neo.colors.primary[600]} variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={{ color: Neo.colors.neutral[900], fontSize: 15 }}>
                  {t('headersFirst.carteirinhaDeVacinaO', 'Carteirinha de vacinação')}
                </H3>
                <Body style={{ color: Neo.colors.neutral[600], fontSize: 12.5, marginTop: 2 }}>
                  {t('headersFirst.histRicoParaApresentarAoVeterinRio', 'Histórico para apresentar ao veterinário.')}
                </Body>
              </View>
              <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
            </NeoCard>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = {
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

  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  heroIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActionTitle: {
    color: Neo.colors.neutral[900],
    fontSize: 16,
    marginBottom: 3,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  heroActionDesc: {
    color: Neo.colors.neutral[700],
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

  panicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 14,
  },
  panicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panicTitle: {
    color: Neo.colors.neutral.white,
    fontSize: 15,
    marginBottom: 2,
    fontWeight: '800',
  },
  panicSub: {
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '700',
    fontSize: 12.5,
  },
  panicBtn: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  panicBtnText: {
    color: Neo.colors.neutral.white,
    fontWeight: '800',
    fontSize: 11.5,
    letterSpacing: 0.5,
  },

  specialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(2, 136, 209, 0.25)',
  },

  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  docIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Neo.colors.primary[500] + '1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
