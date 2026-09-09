import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Modal, ScrollView, Dimensions } from "react-native";
import NeoIcon from '../components/NeoIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import ProfileService from "../services/ProfileService";
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useTranslation } from 'react-i18next';
import { getLocalizedLogo } from '../utils/getLocalizedLogo';
import { H1, Body, Small, Caption } from '../components/NeoTypography';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function BoasVindasScreen({ navigation }) {
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const [accepted, setAccepted] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);
  const [scrolledToBottom, setScrolledToBottom] = React.useState(false);

  // Cores semânticas do tema (sem hex cravado)
  const primaryColor = themeColors.primary[500];
  const primaryDark = themeColors.primary[700];
  const textPrimary = themeColors.neutral[900];
  const textSecondary = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  const surfaceBg = isDark ? themeColors.neutral[200] : themeColors.neutral.white || '#FFFFFF';
  const borderSubtle = themeColors.neutral[300];

  // Acessibilidade rápida logo no início (Inclusão by Design)
  const openAccessibility = () => {
    navigation.navigate('AccessibilitySettings');
  };

  const iniciar = async () => {
    if (!accepted) return;

    try {
      const completo = await ProfileService.isOnboardingCompleto();
      const perfis = await ProfileService.getPerfis();
      const activeResId = await ProfileService.getActiveResidenceId();

      if (completo && perfis.length > 0) {
        navigation.replace("MainTabs");
      } else {
        // Briefing vivo (B++ D6): introduzir o app antes do wizard.
        // WelcomeTour apresenta a Prevenção 3D e o tom da casa antes
        // de pedir dados — coerente com "briefing não é cadastro".
        navigation.replace("WelcomeTour", {
          nextRoute: 'NewHomeWizard',
          nextParams: { fromOnboarding: true, residenceId: activeResId },
        });
      }

    } catch (error) {
      console.log("Erro ao validar perfis:", error);
      // Fallback: mesmo caminho do fluxo normal. Antes caía numa tela de
      // mapeamento paralela que refazia todo o briefing por conta própria.
      navigation.replace("WelcomeTour", {
        nextRoute: 'NewHomeWizard',
        nextParams: { fromOnboarding: true },
      });
    }
  };

  return (
    <AppBackground>
        <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Botão de Acessibilidade (Canto Direito Superior) */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.acessibilidadeBtn, {
            backgroundColor: primaryColor + '15',
            borderColor: primaryColor + '30',
          }]}
          onPress={openAccessibility}
          accessibilityLabel={t('welcome.accessibilityLabel')}
          accessibilityRole="button"
        >
          <NeoIcon name="Eye" size={24} color={primaryColor} />
          <Small style={{ color: primaryDark, fontWeight: '600', marginLeft: 6, marginRight: 4 }}>
            {t('welcome.accessibility')}
          </Small>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image
          source={getLocalizedLogo()}
          style={{ width: 220, height: 80, marginBottom: 20 }}
          resizeMode="contain"
        />

        <H1 align="center" style={{ marginBottom: 10 }}>
          {t('welcome.title')}
        </H1>
        <Body align="center" style={{ marginBottom: 40, lineHeight: 24, paddingHorizontal: 20 }}>
          {t('welcome.description')}
        </Body>

        {/* LGPD Consent */}
        <TouchableOpacity
          style={[styles.checkboxContainer, { borderColor: borderSubtle }]}
          onPress={() => {
            if (!accepted) {
                setScrolledToBottom(false);
                setShowTermsModal(true);
            } else {
                setAccepted(false);
            }
          }}
          activeOpacity={0.8}
        >
          <NeoIcon
            name={accepted ? 'TickSquare' : 'Stop'}
            size={22}
            color={accepted ? primaryColor : textMuted}
            variant={accepted ? 'Bold' : 'Linear'}
          />
          <Body style={{ marginLeft: 10, flex: 1, lineHeight: 18 }}>
            {t('welcome.lgpdConsent')}{' '}
            <Body style={{ fontWeight: 'bold', color: primaryColor }}>{t('welcome.termsOfUse')}</Body>
            {' '}{t('welcome.lgpdAnd')}{' '}
            <Body style={{ fontWeight: 'bold', color: primaryColor }}>{t('welcome.privacyPolicy')}</Body>.
          </Body>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {
            opacity: accepted ? 1 : 0.5,
            backgroundColor: accepted ? primaryColor : textMuted,
            shadowColor: primaryColor,
          }]}
          onPress={iniciar}
          disabled={!accepted}
        >
          <Body style={{ color: themeColors.neutral.white || '#FFF', fontWeight: 'bold' }}>
            {t('welcome.startButton')}
          </Body>
          <NeoIcon name="ArrowRight2" size={24} color={themeColors.neutral.white || '#FFF'} />
        </TouchableOpacity>
      </View>

      {/* TERMOS E CONDIÇÕES MODAL (SCROLL OBRIGATÓRIO) */}
      <Modal visible={showTermsModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 24 }}>
            <View style={[styles.modalContainer, { backgroundColor: surfaceBg }]}>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <NeoIcon name="ShieldTick" size={28} color={primaryColor} />
                  <H1 style={{ marginLeft: 12, fontSize: 20 }}>
                    {t('welcome.termsTitle')}
                  </H1>
              </View>
              
              <ScrollView
                style={{ maxHeight: Dimensions.get('window').height * 0.45 }}
                onScroll={(e) => {
                  const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
                  // Tolera 20px de margem
                  if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20) {
                    setScrolledToBottom(true);
                  }
                }}
                onContentSizeChange={(w, h) => {
                    const maxHeight = Dimensions.get('window').height * 0.45;
                    if (h <= maxHeight) {
                        setScrolledToBottom(true);
                    }
                }}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={true}
              >
                  <Body style={{ fontWeight: 'bold', marginTop: 10 }}>{t('welcome.termsNature')}</Body>
                  <Body style={{ marginBottom: 10, color: textSecondary, lineHeight: 22 }}>{t('welcome.termsNatureDesc')}</Body>
                  
                  <Body style={{ fontWeight: 'bold', marginTop: 10 }}>{t('welcome.termsProfessionals')}</Body>
                  <Body style={{ marginBottom: 10, color: textSecondary, lineHeight: 22 }}>{t('welcome.termsProfessionalsDesc')}</Body>

                  <Body style={{ fontWeight: 'bold', marginTop: 10 }}>{t('welcome.termsPrivacy')}</Body>
                  <Body style={{ marginBottom: 10, color: textSecondary, lineHeight: 22 }}>{t('welcome.termsPrivacyDesc')}</Body>

                  <Body style={{ fontWeight: 'bold', marginTop: 10 }}>{t('welcome.termsLiability')}</Body>
                  <Body style={{ marginBottom: 10, color: textSecondary, lineHeight: 22 }}>{t('welcome.termsLiabilityDesc')}</Body>

                  {!scrolledToBottom && (
                      <Caption align="center" style={{ marginTop: 24, fontStyle: 'italic' }}>
                          {t('welcome.scrollToAccept')}
                      </Caption>
                  )}
              </ScrollView>

              <TouchableOpacity 
                style={[styles.modalButton, { 
                    backgroundColor: scrolledToBottom ? primaryColor : themeColors.neutral[300], 
                }]}
                disabled={!scrolledToBottom}
                onPress={() => {
                  setAccepted(true);
                  setShowTermsModal(false);
                }}
              >
                <Body style={{ color: scrolledToBottom ? (themeColors.neutral.white || '#FFF') : textMuted, fontWeight: 'bold' }}>
                    {scrolledToBottom ? t('welcome.agreeButton') : t('welcome.scrollToContinue')}
                </Body>
              </TouchableOpacity>
              
              <TouchableOpacity style={{ marginTop: 16, alignItems: 'center', padding: 8 }} onPress={() => setShowTermsModal(false)}>
                <Small style={{ color: textMuted, fontWeight: '600' }}>{t('welcome.cancelButton')}</Small>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

    </SafeAreaView>
      </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Sem backgroundColor cravado — AppBackground cuida do fundo
  },
  topBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'flex-end', // Botão à direita
  },
  acessibilidadeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    marginTop: -40 // Compensar topBar visualmente
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  modalContainer: {
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
    ...Neo.shadows.lg,
  },
  modalButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
});
