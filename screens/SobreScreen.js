import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Spacing } from '../utils/Theme';

import Constants from 'expo-constants';
import ProfileService from '../services/ProfileService';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import NeoScreenHeader from '../components/NeoScreenHeader';
import { H1, H3, Body, Small } from "../components/NeoTypography";
import { useTranslation } from 'react-i18next';
import { getLocalizedLogo } from '../utils/getLocalizedLogo';
import NeoAlert from '../utils/NeoAlert';

export default function SobreScreen({ navigation }) {
  const { t } = useTranslation();
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <AppBackground>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
        <StatusBar style="dark" />

        {/* Padrão "Anatomia Editorial": título solto H1 à esquerda,
            sem card-moldura (PADRAO_ANATOMIA_PAGINAS.md) */}
        <NeoScreenHeader
            title={t('about.title')}
            subtitle={t('about.subtitle')}
            onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

          {/* Brand Section */}
          <View style={styles.brandSection}>
            <Image
              source={getLocalizedLogo()}
              style={styles.logo}
              resizeMode="contain"
            />
            <H1 style={styles.appName}>{t('headersFirst.vigilaroCare', 'Vigilaro Care')}</H1>
            <Small style={styles.version}>{t('about.version')} {appVersion}</Small>
          </View>

          {/* Mission Card */}
          <NeoCard variant="elevated" style={styles.card}>
            <View style={styles.cardHeader}>
              <NeoIcon name="Heart" size={24} color={Neo.colors.feedback.error} variant="Bold" />
              <H3 style={styles.cardTitle}>{t('about.mission')}</H3>
            </View>
            <Body style={styles.cardText}>
              {t('about.missionText')}
            </Body>
          </NeoCard>

          {/* Autoria — quem responde pelo conteúdo. Não é vaidade nem marketing:
              num app que orienta prevenção, a qualificação de quem escreve é o
              que sustenta a orientação, e é o que a revisão das lojas procura
              em app de saúde e segurança.

              A empresa empregadora NÃO é nomeada, de propósito. Trajetória
              profissional é fato biográfico e pode ser declarada, mas citar a
              marca do empregador num produto comercial sugere patrocínio ou
              chancela que não existem — e cria problema com a empresa antes de
              criar com a lei. O que dá autoridade aqui é o ambiente (refinaria,
              terminal de combustíveis), não o nome no contracheque.

              O authorScope fecha o cartão fixando a fronteira da qualificação:
              segurança do trabalho não é medicina. É a mesma linha que já
              derrubou a gestão de medicamentos no Minha Saúde. */}
          <NeoCard variant="elevated" style={styles.card}>
            <View style={styles.cardHeader}>
              <NeoIcon name="ShieldTick" size={24} color={Neo.colors.primary[600]} />
              <H3 style={styles.cardTitle}>{t('about.authorTitle')}</H3>
            </View>
            <Body style={styles.cardText}>{t('about.authorText')}</Body>
            <Body style={[styles.cardText, { marginTop: 12 }]}>{t('about.authorMethod')}</Body>
            <Small style={styles.authorBook}>{t('about.authorBook')}</Small>
            <View style={styles.authorDivider} />
            <Small style={styles.authorScope}>{t('about.authorScope')}</Small>
          </NeoCard>

          {/* Créditos e fontes — obrigação, não cortesia: a base de produtos
              Open Food Facts é licenciada em ODbL, que EXIGE atribuição. A
              última linha declara o uso de IA nas ilustrações, seguindo a
              prática de transparência que as lojas e o EU AI Act cobram. */}
          <Small style={styles.sectionTitle}>{t('about.creditsTitle')}</Small>
          <NeoCard variant="elevated" style={styles.card}>
            <View style={styles.cardHeader}>
              <NeoIcon name="DocumentText" size={22} color={Neo.colors.primary[600]} variant="Bold" />
              <H3 style={styles.cardTitle}>{t('about.creditsTitle')}</H3>
            </View>
            <Body style={styles.cardText}>{t('about.creditsIntro')}</Body>
            {['creditsOFF', 'creditsUPC', 'creditsEPA', 'creditsCiatox', 'creditsMapas', 'creditsPhotos', 'creditsIllustrations'].map((chave) => (
              <Body key={chave} style={[styles.cardText, { marginTop: 10 }]}>
                {`• ${t(`about.${chave}`)}`}
              </Body>
            ))}
          </NeoCard>

          {/* Links Section */}
          <Small style={styles.sectionTitle}>{t('about.legalInfo')}</Small>
          <NeoCard variant="elevated" style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TermsOfUse')}>
              <Body style={styles.menuText}>{t('about.termsOfUse')}</Body>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Body style={styles.menuText}>{t('about.privacyPolicy')}</Body>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
          </NeoCard>

          {/* Credits / Contact */}
          <Small style={styles.sectionTitle}>{t('about.contactSupport')}</Small>
          <NeoCard variant="elevated" style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleLink('mailto:contato@vigilarocare.ia.br')}>
              <View style={styles.menuIconRow}>
                <NeoIcon name="Sms" size={20} color={Neo.colors.primary[500]} variant="Bold" />
                <Body style={styles.menuText}>{t('about.contactUs')}</Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => handleLink('https://www.vigilarocare.ia.br')}>
              <View style={styles.menuIconRow}>
                <NeoIcon name="Global" size={20} color={Neo.colors.primary[500]} variant="Bold" />
                <Body style={styles.menuText}>{t('about.visitSite')}</Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
          </NeoCard>

          {/* Danger Zone */}
          <Small style={[styles.sectionTitle, { color: Neo.colors.feedback.error }]}>{t('about.advancedSettings')}</Small>
          <NeoCard variant="elevated" style={[styles.menuGroup, { borderColor: 'rgba(220,53,69,0.2)' }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                NeoAlert.alert(
                  t('about.resetTitle'),
                  t('about.resetMsg'),
                  [
                    { text: t('about.cancel'), style: 'cancel' },
                    {
                      text: t('about.yesDeleteAll'),
                      style: 'destructive',
                      onPress: async () => {
                        await ProfileService.resetAllData();
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'BoasVindas' }],
                        });
                      }
                    }
                  ]
                );
              }}
            >
              <View style={styles.menuIconRow}>
                <NeoIcon name="Trash" size={20} color={Neo.colors.feedback.error} variant="Bold" />
                <Body style={[styles.menuText, { color: Neo.colors.feedback.error, fontWeight: 'bold' }]}>{t('about.resetApp')}</Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
          </NeoCard>

          {/* Footer */}
          <Small style={styles.footerText}>
            {t('about.madeWith')}
          </Small>
          <Small style={styles.copyright}>
            © {t('about.copyright')}
          </Small>

        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
    paddingTop: 0,
    paddingBottom: 190,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: Neo.colors.neutral[900],
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: Neo.colors.neutral[400],
  },
  card: {
    padding: 20,
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    color: Neo.colors.neutral[800],
  },
  cardText: {
    color: Neo.colors.neutral[600],
    lineHeight: 22,
  },
  authorBook: {
    color: Neo.colors.neutral[500],
    marginTop: 12,
    lineHeight: 18,
  },
  authorDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginVertical: 14,
  },
  authorScope: {
    color: Neo.colors.neutral[500],
    lineHeight: 18,
  },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 16,
    color: Neo.colors.neutral[500],
  },
  menuGroup: {
    marginBottom: 24,
    overflow: 'hidden',
    padding: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: {
    fontSize: 16,
    color: Neo.colors.neutral[900],
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginLeft: 16,
  },
  footerText: {
    textAlign: 'center',
    color: Neo.colors.neutral[500],
    marginBottom: 4,
  },
  copyright: {
    textAlign: 'center',
    color: Neo.colors.neutral[400],
    marginBottom: 40,
  },
});

