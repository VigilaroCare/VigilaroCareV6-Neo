import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ActivityIndicator, Text } from 'react-native';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

/**
 * PerfilWizardScreen.js (DEPRECATED)
 * Esta tela foi descontinuada em favor do AddPerfilScreen padronizado.
 * Este arquivo serve apenas como redirecionador para evitar quebras em chamadas legadas.
 */
export default function PerfilWizardScreen({ navigation, route }) {
    const { t } = useTranslation('common');
  useEffect(() => {
    console.log("⚠️ Redirecionando PerfilWizard legado para AddPerfil padronizado.");
    // Redireciona para a tela nova, repassando os parâmetros de forma segura
    navigation.replace('AddPerfil', route.params || {});
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
      <Text style={{ marginTop: 20, color: Neo.colors.neutral[500] }}>{t('headersFirst.carregandoPerfilPadronizado', 'Carregando perfil padronizado...')}</Text>
    </View>
  );
}
