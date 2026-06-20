/**
 * MedicalDisclaimerModal.js
 * Gate de boot obrigatório — exibido antes de qualquer conteúdo do app.
 *
 * Conformidade:
 * - handleAccept salva objeto JSON com accepted, timestamp ISO 8601, version e appVersion
 * - presentationStyle="overFullScreen" bloqueia swipe-to-dismiss no iOS
 * - hasScrolledToEnd desabilita o botão de aceite até o usuário rolar até o final
 * - onMomentumScrollEnd como fallback ao onScroll para usuários que rolam rápido
 * - accessibilityViewIsModal para VoiceOver/TalkBack
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NeoIcon from './NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoText, { H3, Body, Small } from './NeoTypography';
import NeoAlert from '../utils/NeoAlert';

const DISCLAIMER_KEY = '@medical_disclaimer_accepted';
const DISCLAIMER_VERSION = '1.0.0';

let appVersion = '1.0.0';
try {
  const Constants = require('expo-constants').default;
  appVersion = Constants.expoConfig?.version || Constants.manifest?.version || '1.0.0';
} catch (_) {}

/**
 * Props:
 *  - onAccept:  () => void  — callback chamado ao aceitar (gate de boot no App.js)
 *  - onDismiss: () => void  — alias legado, chamado apenas se onAccept não for fornecido
 */
export default function MedicalDisclaimerModal({ onAccept, onDismiss }) {
  const { height: screenHeight } = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

  useEffect(() => {
    checkDisclaimer();
  }, []);

  // Bloqueia botão voltar do Android enquanto o modal estiver visível
  useEffect(() => {
    if (!visible) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, [visible]);

  const checkDisclaimer = async () => {
    try {
      const raw = await AsyncStorage.getItem(DISCLAIMER_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // Válido somente se accepted === true E versão corresponde
        // Se version estiver ausente ou diferente, reexibe o disclaimer
        if (data?.accepted === true && data?.version === DISCLAIMER_VERSION) {
          return;
        }
      }
      setVisible(true);
    } catch (e) {
      if (__DEV__) {
        console.warn('[MedicalDisclaimerModal] checkDisclaimer:', e?.message);
      }
      // Na dúvida, exibe — nunca pula o disclaimer por erro de leitura
      setVisible(true);
    }
  };

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem(
        DISCLAIMER_KEY,
        JSON.stringify({
          accepted: true,
          timestamp: new Date().toISOString(),
          version: DISCLAIMER_VERSION,
          appVersion,
        })
      );

      setVisible(false);

      // Chama onAccept preferencialmente; onDismiss é fallback legado
      if (typeof onAccept === 'function') {
        onAccept();
      } else if (typeof onDismiss === 'function') {
        onDismiss();
      }
    } catch (e) {
      if (__DEV__) {
        console.warn('[MedicalDisclaimerModal] handleAccept: erro ao salvar aceite:', e?.message);
      }
      // Informa o usuário — aceite não foi persistido
      NeoAlert.alert(
        'Erro ao salvar',
        'Não foi possível registrar seu aceite. Verifique o armazenamento do dispositivo e tente novamente.',
        [{ text: 'OK' }]
      );
    }
  };

  // Detecta rolagem até o final — tolerância de 20px para densidades variadas
  const checkScrollEnd = useCallback((event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtEnd = contentOffset.y + layoutMeasurement.height >= contentSize.height - 20;
    if (isAtEnd && !hasScrolledToEnd) {
      setHasScrolledToEnd(true);
    }
  }, [hasScrolledToEnd]);

  // maxHeight responsivo — 45% da altura da tela para funcionar no iPhone SE
  const scrollViewMaxHeight = screenHeight * 0.45;

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      accessibilityViewIsModal={true}
      onRequestClose={() => {
        // Intencional: bloqueado — usuário deve rolar e aceitar
      }}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <NeoIcon name="Health" size={32} color={Neo.colors.feedback.error} />
            <H3 style={{ marginLeft: 12, color: Neo.colors.feedback.error }}>
              Aviso Importante
            </H3>
          </View>

          <ScrollView
            style={{ maxHeight: scrollViewMaxHeight }}
            onScroll={checkScrollEnd}
            onMomentumScrollEnd={checkScrollEnd}
            onContentSizeChange={(w, h) => {
                // Se o conteúdo for menor que a tela, libera automaticamente
                if (h <= scrollViewMaxHeight) {
                    setHasScrolledToEnd(true);
                }
            }}
            onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                // Double check no layout
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={true}
          >
            <Body style={{ marginBottom: 16 }}>
              O Vigilaro Care é uma ferramenta de apoio à prevenção e organização familiar.
            </Body>

            <Body style={{ fontWeight: 'bold', marginBottom: 8 }}>
              Este aplicativo NÃO fornece aconselhamento médico, diagnóstico ou tratamento.
            </Body>

            <Body style={{ marginBottom: 16 }}>
              Todas as informações, conteúdos e materiais disponíveis neste aplicativo têm fins
              meramente informativos e educativos. As informações não substituem o aconselhamento
              médico profissional.
            </Body>

            <Body style={{ marginBottom: 16 }}>
              Sempre procure o conselho do seu médico ou outro profissional de saúde qualificado
              para qualquer dúvida que possa ter sobre uma condição médica, tratamento, medicamentos
              ou procedimentos. Nunca desconsidere o conselho médico profissional por causa de algo
              que tenha lido neste aplicativo.
            </Body>

            <Body style={{ marginBottom: 16 }}>
              As informações sobre primeiros socorros, produtos perigosos, plantas tóxicas e animais
              peçonhentos são de caráter preventivo e educativo. Em qualquer situação de risco,
              acione os serviços de emergência imediatamente.
            </Body>

            <Body style={{ fontWeight: 'bold', color: Neo.colors.feedback.error, marginBottom: 8 }}>
              Em caso de emergência médica, ligue imediatamente para o 192 (SAMU) ou dirija-se ao
              hospital mais próximo.
            </Body>

            <Small style={{ color: Neo.colors.neutral[500], marginBottom: 8 }}>
              Ao continuar, você confirma que leu e compreendeu este aviso e concorda com nossos
              Termos de Uso e Política de Privacidade. Versão do aviso: {DISCLAIMER_VERSION}.
            </Small>
          </ScrollView>

          {/* Indicador de rolagem quando o botão ainda está desabilitado */}
          {!hasScrolledToEnd && (
            <Small style={styles.scrollHint}>
              Role até o final para continuar
            </Small>
          )}

          <TouchableOpacity
            style={[styles.button, !hasScrolledToEnd && styles.buttonDisabled]}
            onPress={handleAccept}
            disabled={!hasScrolledToEnd}
            accessibilityLabel="Aceitar aviso médico e continuar"
            accessibilityHint="Disponível após rolar todo o texto do aviso"
            accessibilityState={{ disabled: !hasScrolledToEnd }}
          >
            <Body style={styles.buttonText}>
              {hasScrolledToEnd ? 'Entendi e Concordo' : 'Role para continuar'}
            </Body>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'android' ? 16 : 0,
  },
  card: {
    backgroundColor: Neo.colors.neutral[0] || Neo.colors.neutral.white,
    borderRadius: 20,
    padding: 24,
    ...Neo.shadows.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Neo.colors.neutral[200],
    paddingBottom: 16,
  },
  scrollHint: {
    textAlign: 'center',
    color: Neo.colors.neutral[400],
    marginTop: 8,
    marginBottom: 4,
  },
  button: {
    backgroundColor: Neo.colors.primary[500],
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: Neo.colors.neutral[300],
  },
  buttonText: {
    color: Neo.colors.neutral.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});