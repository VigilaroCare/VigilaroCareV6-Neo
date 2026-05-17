import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ActivityIndicator } from 'react-native';
import AppBackground from '../../components/AppBackground';
import { Body } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';

/**
 * PerfilWizardScreen.js (DEPRECATED)
 * Redireciona para AddPerfil padronizado.
 */
export default function PerfilWizardScreen({ navigation, route }) {
  const { t } = useTranslation('common');

  useEffect(() => {
    if (__DEV__) console.log('[PerfilWizard] redirecionando para AddPerfil');
    navigation.replace('AddPerfil', route.params || {});
  }, []);

  return (
    <AppBackground>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
        <ActivityIndicator size="large" color={Neo.colors.primary[600]} />
        <Body style={{ marginTop: 16, color: Neo.colors.neutral[700] }}>
          {t('headersFirst.carregandoPerfilPadronizado', 'Carregando…')}
        </Body>
      </View>
    </AppBackground>
  );
}
