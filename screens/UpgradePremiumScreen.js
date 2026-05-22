/**
 * UpgradePremiumScreen.js
 * Tela de Upgrade para Premium/Família
 * Vigilaro Care V6 Neo
 *
 * Regra 4: Nenhum preço hardcoded — preços sempre vêm da API da loja via RevenueCat.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Linking,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Shadows } from '../utils/Theme';
import SubscriptionService from '../services/SubscriptionService';
import { useTranslation } from 'react-i18next';
import NeoAlert from '../utils/NeoAlert';

const { width } = Dimensions.get('window');

const TERMS_URL = 'https://vigilaro.com.br/termos-de-uso';
const PRIVACY_URL = 'https://vigilaro.com.br/politica-de-privacidade';

// Identificadores RevenueCat em lowercase — packageType é $rc_annual / $rc_monthly
// Referência: https://www.revenuecat.com/docs/api-reference
const RC_PACKAGE_TYPE = {
  ANNUAL: '$rc_annual',
  MONTHLY: '$rc_monthly',
};

// Features are now inside the component to use translation

// ---------------------------------------------------------------------------
// Helper: abre URL com tratamento de erro
// ---------------------------------------------------------------------------
const openURL = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      NeoAlert.alert('Erro', 'Não foi possível abrir este link.');
    }
  } catch {
    NeoAlert.alert('Erro', 'Não foi possível abrir este link.');
  }
};

// ---------------------------------------------------------------------------
// Helper: resolve pacote pelo período (usa RC_PACKAGE_TYPE correto)
// ---------------------------------------------------------------------------
const resolvePackage = (packages, tier, period) => {
  if (!packages) return null;
  const tierPackages = tier === 'premium' ? packages.premium : packages.familia;
  const rcType = period === 'annual' ? RC_PACKAGE_TYPE.ANNUAL : RC_PACKAGE_TYPE.MONTHLY;
  return (
    tierPackages.find(p => p.packageType === rcType) ||
    tierPackages.find(p => p.identifier.includes(period === 'annual' ? 'annual' : 'monthly')) ||
    null
  );
};

export default function UpgradePremiumScreen({ navigation }) {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState('premium');
  const [selectedPeriod, setSelectedPeriod] = useState('annual');
  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);

  const FEATURES = {
    free: [
      { icon: 'checkmark-circle-outline', text: t('upgrade.featFree1'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featFree2'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featFree3'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featFree4'), included: true },
      { icon: 'close-circle-outline', text: t('upgrade.featFree5'), included: false },
      { icon: 'close-circle-outline', text: t('upgrade.featFree6'), included: false },
    ],
    premium: [
      { icon: 'checkmark-circle-outline', text: t('upgrade.featPrem1'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featPrem2'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featPrem3'), included: true },
      { icon: 'sparkles', text: t('upgrade.featPrem4'), included: true, highlight: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featPrem5'), included: true },
      { icon: 'checkmark-circle-outline', text: t('upgrade.featPrem6'), included: true },
    ],
    familia: [
      { icon: 'checkmark-circle-outline', text: t('upgrade.featFam1'), included: true },
      { icon: 'sparkles', text: t('upgrade.featFam2'), included: true, highlight: true },
      { icon: 'people-outline', text: t('upgrade.featFam3'), included: true, highlight: true },
      { icon: 'location-outline', text: t('upgrade.featFam4'), included: true },
      { icon: 'heart-outline', text: t('upgrade.featFam5'), included: true },
      { icon: 'headset-outline', text: t('upgrade.featFam6'), included: true },
    ],
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    setLoadError(false);
    setLoading(true);
    try {
      await SubscriptionService.refreshCustomerInfo();
      const status = SubscriptionService.getSubscriptionStatus();
      setCurrentStatus(status);
      setPackages(SubscriptionService.getAvailablePackages()); // null é tratado pela UI
    } catch (error) {
      if (__DEV__) {
        console.warn('[UpgradePremiumScreen] loadData:', error?.message);
      }
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Preços calculados uma vez por render — sem recalcular em cada filho
  const priceMonthly = useMemo(
    () => resolvePackage(packages, selectedTier, 'monthly')?.product?.priceString ?? null,
    [packages, selectedTier]
  );
  const priceAnnual = useMemo(
    () => resolvePackage(packages, selectedTier, 'annual')?.product?.priceString ?? null,
    [packages, selectedTier]
  );

  // Desconto calculado dinamicamente — nunca hardcoded (Regra 4)
  const discountLabel = useMemo(() => {
    if (!priceMonthly || !priceAnnual) return null;

    // Tenta extrair valor numérico dos strings de preço da loja
    const parseValue = (str) => {
      const match = str.replace(',', '.').match(/[\d.]+/);
      return match ? parseFloat(match[0]) : null;
    };

    const monthly = parseValue(priceMonthly);
    const annual = parseValue(priceAnnual);

    if (!monthly || !annual || monthly <= 0) return null;

    const monthlyEquivalent = annual / 12;
    const savings = Math.round((1 - monthlyEquivalent / monthly) * 100);

    return savings > 0 ? `${t('upgrade.save')} ${savings}%` : null;
  }, [priceMonthly, priceAnnual]);

  const currentPrice = selectedPeriod === 'annual' ? priceAnnual : priceMonthly;
  const isPriceLoaded = packages !== null;

  const handlePurchase = useCallback(async () => {
    // Verificação de conectividade com tratamento de erro
    try {
      const network = await NetInfo.fetch();
      if (!network.isConnected) {
        NeoAlert.alert(t('upgrade.offline'), t('upgrade.offlineMsg'));
        return;
      }
    } catch {
      NeoAlert.alert(t('upgrade.error'), t('upgrade.offlineMsg'));
      return;
    }

    if (!packages) return;

    const selectedPackage = resolvePackage(packages, selectedTier, selectedPeriod);

    if (!selectedPackage?.product?.priceString) {
      NeoAlert.alert(t('upgrade.error'), t('upgrade.invalidProduct'));
      return;
    }

    setPurchasing(true);
    try {
      const result = await SubscriptionService.purchasePackage(selectedPackage);

      if (result.success) {
        NeoAlert.alert(
          t('upgrade.protectionActive'),
          `${t('upgrade.understood')} Vigilaro ${selectedTier === 'premium' ? t('upgrade.premium') : t('upgrade.family')}.`,
          [{
            text: t('upgrade.understood'),
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            },
          }]
        );
      } else if (!result.cancelled) {
        NeoAlert.alert(t('upgrade.purchaseError'), result.error || t('upgrade.purchaseErrorFallback'));
      }
    } catch {
      NeoAlert.alert(t('upgrade.error'), t('upgrade.unexpectedError'));
    } finally {
      setPurchasing(false);
    }
  }, [packages, selectedTier, selectedPeriod, navigation]);

  const handleRestore = useCallback(async () => {
    setLoading(true);
    try {
      const result = await SubscriptionService.restorePurchases();
      if (result.restored) {
        NeoAlert.alert(t('upgrade.subscriptionRestored'), t('upgrade.restoredMsg'));
        await loadData(); // await para evitar race condition
      } else if (result.success) {
        NeoAlert.alert(
          t('upgrade.noSubscription'),
          t('upgrade.noSubscriptionMsg')
        );
      } else {
        NeoAlert.alert(t('upgrade.error'), result.error || t('upgrade.restoreError'));
      }
    } catch {
      NeoAlert.alert(t('upgrade.error'), t('upgrade.unexpectedRestore'));
    } finally {
      setLoading(false);
    }
  }, [loadData]);

  // ---------------------------------------------------------------------------
  // ESTADOS DA UI
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <NeoIcon name="CloseSquare" size={48} color={Colors.textSecondary} />
          <Text style={styles.errorTitle}>{t('upgrade.cannotLoad')}</Text>
          <Text style={styles.errorSubtitle}>
            {t('upgrade.checkConnection')}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadData}>
            <Text style={styles.retryButtonText}>{t('upgrade.tryAgain')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            style={{ marginTop: 12 }}
          >
            <Text style={styles.restoreText}>{t('upgrade.back')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (currentStatus?.tier !== 'free') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subscribedContainer}>
          <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.subscribedBadge}>
            <NeoIcon name="Diamonds" size={48} color="#FFF" />
          </LinearGradient>
          <Text style={styles.subscribedTitle}>{t('upgrade.alreadyProtected')}</Text>
          <Text style={styles.subscribedText}>
            {t('upgrade.allFeatures')}
          </Text>
          {currentStatus.expirationDate && (
            <Text style={styles.expirationText}>
              {t('upgrade.validUntil')} {new Date(currentStatus.expirationDate).toLocaleDateString(t('common.locale', {defaultValue: 'pt-BR'}))}
            </Text>
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.canGoBack() && navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{t('upgrade.back')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------------------------------------------------------------
  // TELA PRINCIPAL
  // ---------------------------------------------------------------------------

  return (
    <AppBackground>
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.canGoBack() && navigation.goBack()}
          >
            <NeoIcon name="CloseSquare" size={28} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.heroIcon}>
            <NeoIcon name="Diamonds" size={40} color="#FFF" />
          </LinearGradient>
          <Text style={styles.heroTitle}>{t('upgrade.heroTitle')}</Text>
          <Text style={styles.heroSubtitle}>
            {t('upgrade.heroSub')}
          </Text>
        </View>

        {/* Tier Selector */}
        <View style={styles.tierSelector}>
          {['premium', 'familia'].map(tier => (
            <TouchableOpacity
              key={tier}
              style={[styles.tierTab, selectedTier === tier && styles.tierTabActive]}
              onPress={() => setSelectedTier(tier)}
            >
              <Text style={[styles.tierTabText, selectedTier === tier && styles.tierTabTextActive]}>
                {tier === 'premium' ? t('upgrade.premium') : t('upgrade.family')}
              </Text>
              {tier === 'familia' && (
                <View style={styles.bestValueBadge}>
                  <Text style={styles.bestValueText}>{t('upgrade.mostComplete')}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {FEATURES[selectedTier].map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <NeoIcon
                name={feature.icon}
                size={22}
                color={feature.highlight ? '#6366F1' : feature.included ? '#10B981' : '#9CA3AF'}
              />
              <Text style={[
                styles.featureText,
                feature.highlight && styles.featureHighlight,
                !feature.included && styles.featureDisabled,
              ]}>
                {feature.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Period Selector */}
        <View style={styles.periodContainer}>
          <TouchableOpacity
            style={[styles.periodOption, selectedPeriod === 'monthly' && styles.periodOptionActive]}
            onPress={() => setSelectedPeriod('monthly')}
          >
            <Text style={styles.periodLabel}>{t('upgrade.monthly')}</Text>
            <Text style={styles.periodPrice}>
              {priceMonthly ?? t('upgrade.loading')}
            </Text>
            <Text style={styles.periodSub}>{t('upgrade.perMonth')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.periodOption, selectedPeriod === 'annual' && styles.periodOptionActive]}
            onPress={() => setSelectedPeriod('annual')}
          >
            {/* Badge de desconto calculado dinamicamente — nunca hardcoded */}
            {discountLabel && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveText}>{discountLabel}</Text>
              </View>
            )}
            <Text style={styles.periodLabel}>{t('upgrade.annual')}</Text>
            <Text style={styles.periodPrice}>
              {priceAnnual ?? t('upgrade.loading')}
            </Text>
            <Text style={styles.periodSub}>{t('upgrade.perYear')}</Text>
          </TouchableOpacity>
        </View>

        {/* Purchase Button */}
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            (!isPriceLoaded || purchasing) && styles.purchaseButtonDisabled,
          ]}
          onPress={handlePurchase}
          disabled={!isPriceLoaded || purchasing}
        >
          <LinearGradient
            colors={isPriceLoaded ? ['#6366F1', '#8B5CF6'] : ['#9CA3AF', '#6B7280']}
            style={styles.purchaseGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            {purchasing ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.purchaseText}>
                  {isPriceLoaded
                    ? `${t('upgrade.subscribe')} ${selectedTier === 'premium' ? t('upgrade.premium') : t('upgrade.family')}`
                    : t('upgrade.loadingPlans')}
                </Text>
                {isPriceLoaded && <NeoIcon name="ArrowRight2" size={20} color="#FFF" />}
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleRestore}>
            <Text style={styles.restoreText}>{t('upgrade.restorePurchases')}</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            {t('upgrade.termsFooter')}
          </Text>

          <View style={styles.legalLinks}>
            <TouchableOpacity onPress={() => openURL(TERMS_URL)}>
              <Text style={styles.legalLink}>{t('about.termsOfUse')}</Text>
            </TouchableOpacity>
            <Text style={styles.legalSeparator}> · </Text>
            <TouchableOpacity onPress={() => openURL(PRIVACY_URL)}>
              <Text style={styles.legalLink}>{t('about.privacyPolicy')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  errorTitle: { fontSize: 18, fontWeight: '600', color: Colors.textPrimary, textAlign: 'center', marginTop: 16, marginBottom: 8 },
  errorSubtitle: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', marginBottom: 24 },
  retryButton: { paddingHorizontal: 32, paddingVertical: 14, backgroundColor: '#6366F1', borderRadius: 12 },
  retryButtonText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  header: { flexDirection: 'row', justifyContent: 'flex-end', padding: 16 },
  closeButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
  hero: { alignItems: 'center', paddingHorizontal: 24, marginBottom: 24 },
  heroIcon: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary, textAlign: 'center', marginBottom: 8 },
  heroSubtitle: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center' },
  tierSelector: { flexDirection: 'row', marginHorizontal: 24, backgroundColor: '#F3F4F6', borderRadius: 12, padding: 4, marginBottom: 24 },
  tierTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'center' },
  tierTabActive: { backgroundColor: '#FFF', ...Shadows.sm },
  tierTabText: { fontSize: 16, fontWeight: '600', color: Colors.textSecondary },
  tierTabTextActive: { color: Colors.textPrimary },
  bestValueBadge: { backgroundColor: '#10B981', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 },
  bestValueText: { fontSize: 12, fontWeight: 'bold', color: '#FFF' },
  featuresContainer: { paddingHorizontal: 24, marginBottom: 24 },
  featureRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  featureText: { fontSize: 15, color: Colors.textPrimary, marginLeft: 12, flex: 1 },
  featureHighlight: { fontWeight: '600', color: '#6366F1' },
  featureDisabled: { color: '#9CA3AF' },
  periodContainer: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 },
  periodOption: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  periodOptionActive: { borderColor: '#6366F1', backgroundColor: '#EEF2FF' },
  periodLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 4 },
  periodPrice: { fontSize: 22, fontWeight: 'bold', color: Colors.textPrimary },
  periodSub: { fontSize: 12, color: Colors.textSecondary },
  saveBadge: { position: 'absolute', top: -10, backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  saveText: { fontSize: 11, fontWeight: 'bold', color: '#FFF' },
  purchaseButton: { marginHorizontal: 24, marginBottom: 16 },
  purchaseButtonDisabled: { opacity: 0.7 },
  purchaseGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, gap: 8 },
  purchaseText: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  footer: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 32 },
  restoreText: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginBottom: 12 },
  termsText: { fontSize: 11, color: Colors.textSecondary, textAlign: 'center', lineHeight: 16, marginBottom: 12 },
  legalLinks: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' },
  legalLink: { fontSize: 12, color: '#6366F1', fontWeight: '600', textDecorationLine: 'underline' },
  legalSeparator: { fontSize: 12, color: Colors.textSecondary },
  subscribedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  subscribedBadge: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  subscribedTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.textPrimary, marginBottom: 8 },
  subscribedText: { fontSize: 16, color: Colors.textSecondary, textAlign: 'center', marginBottom: 16 },
  expirationText: { fontSize: 14, color: Colors.textSecondary },
  backButton: { marginTop: 24, paddingHorizontal: 32, paddingVertical: 12, backgroundColor: '#F3F4F6', borderRadius: 12 },
  backButtonText: { fontSize: 16, fontWeight: '600', color: Colors.textPrimary },
});