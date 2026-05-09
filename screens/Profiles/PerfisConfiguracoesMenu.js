import React from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H2, Body } from '../../components/NeoTypography';

export default function PerfisConfiguracoesMenu({ navigation }) {
  const { t } = useTranslation();

  const menuItems = [
    {
      icon: 'Profile2User',
      title: t('configMenu.familyProfiles', 'Perfis Familiares'),
      route: 'PerfilWizard',
      color: Neo.colors.primary[500]
    },
    {
      icon: 'Microphone2',
      title: t('configMenu.assistantVoice', 'Voz da Assistente'),
      route: 'VoiceConfig',
      color: Neo.colors.secondary[500]
    },
    {
      icon: 'ShieldTick',
      title: t('configMenu.securityDevices', 'Dispositivos de Segurança'),
      route: 'DispositivosSeguranca',
      color: Neo.colors.feedback.success
    },
    {
      icon: 'InfoCircle',
      title: t('configMenu.aboutApp', 'Sobre o App'),
      route: 'Sobre',
      color: Neo.colors.neutral[500]
    },
  ];

  return (
    <AppBackground variant="subtle">
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
          </TouchableOpacity>
          <H2 style={styles.headerTitle}>{t('configMenu.title', 'Configurações')}</H2>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.route)}
              activeOpacity={0.8}
              style={{ marginBottom: 12 }}
            >
              <NeoCard variant="elevated" style={styles.menuItem}>
                <View style={[styles.itemBorder, { backgroundColor: item.color }]} />
                <View style={[styles.iconWrap, { backgroundColor: item.color + '15' }]}>
                    <NeoIcon name={item.icon} size={24} color={item.color} variant="Bold" />
                </View>
                <Body style={styles.itemTitle}>{item.title}</Body>
                <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[400]} />
              </NeoCard>
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    color: Neo.colors.neutral[900],
    textAlign: 'center',
    marginHorizontal: 8,
  },
  headerSpacer: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Neo.colors.neutral.white,
    borderRadius: 16,
    padding: 16,
    paddingLeft: 20,
    overflow: 'hidden',
  },
  itemBorder: {
    width: 4,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemTitle: {
    flex: 1,
    fontWeight: '600',
    color: Neo.colors.neutral[900],
  },
});

