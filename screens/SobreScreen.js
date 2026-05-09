import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Spacing } from '../utils/Theme';

import Constants from 'expo-constants';
import ProfileService from '../services/ProfileService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import { H1, H2, H3, Body, Small } from '../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { getLocalizedLogo } from '../utils/getLocalizedLogo';

export default function SobreScreen({ navigation }) {
  const { t } = useTranslation();
  const appVersion = Constants.expoConfig?.version || '1.0.0';

  const handleLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <AppBackground variant="subtle">
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
        <StatusBar barStyle="dark-content" />

        {/* Header Neo Glass */}
        <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
                <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
            <NeoCard variant="glass"
                style={Object.assign({
                    width: "100%",
                    padding: 16,
                    justifyContent: "space-between",
                    minHeight: 140, alignItems: "center"
                }, Neo.shadows ? Neo.shadows.sm : {})}
            >
                <View style={{
                    width: 44, height: 44, borderRadius: 12,
                    backgroundColor: Neo.colors.primary[100], alignItems: "center", justifyContent: "center",
                    marginBottom: 12
                }}>
                    <NeoIcon name="InfoCircle" size={24} color={Neo.colors.primary[600]} variant="Bulk" />
                </View>
                <View style={{ alignItems: "center" }}>
                    <H3 style={{ color: Neo.colors.primary[600], fontSize: 16, marginBottom: 4, lineHeight: 18 }}>{t('about.title')}</H3>
                    <Small style={{ color: Neo.colors.neutral[800], fontWeight: "bold", lineHeight: 14 }}>{t('about.subtitle')}</Small>
                </View>
            </NeoCard>
        </View>

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
          <NeoCard variant="glass" style={styles.card}>
            <View style={styles.cardHeader}>
              <NeoIcon name="Heart" size={24} color={Neo.colors.feedback.error} variant="Bold" />
              <H3 style={styles.cardTitle}>{t('about.mission')}</H3>
            </View>
            <Body style={styles.cardText}>
              {t('about.missionText')}
            </Body>
          </NeoCard>

          {/* Links Section */}
          <Small style={styles.sectionTitle}>{t('about.legalInfo')}</Small>
          <NeoCard variant="glass" style={styles.menuGroup}>
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
          <NeoCard variant="glass" style={styles.menuGroup}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleLink('mailto:suporte@vigilaro.com')}>
              <View style={styles.menuIconRow}>
                <NeoIcon name="Sms" size={20} color={Neo.colors.primary[500]} variant="Bold" />
                <Body style={styles.menuText}>{t('about.contactUs')}</Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => handleLink('https://vigilaro.com')}>
              <View style={styles.menuIconRow}>
                <NeoIcon name="Global" size={20} color={Neo.colors.primary[500]} variant="Bold" />
                <Body style={styles.menuText}>{t('about.visitSite')}</Body>
              </View>
              <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[300]} />
            </TouchableOpacity>
          </NeoCard>

          {/* Danger Zone */}
          <Small style={[styles.sectionTitle, { color: Neo.colors.feedback.error }]}>{t('about.advancedSettings')}</Small>
          <NeoCard variant="glass" style={[styles.menuGroup, { borderColor: 'rgba(220,53,69,0.2)' }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                Alert.alert(
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
    paddingBottom: 120,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  logo: {
    width: 120,
    height: 120,
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

