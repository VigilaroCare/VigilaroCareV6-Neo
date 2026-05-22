// screens/Emergency/SOSCountdownScreen.js
// Tela de countdown SOS — modo-pânico INTENCIONAL.
// Vermelho intenso, fontes imensas, contraste máximo.
// NÃO usa AppBackground/NeoCard glass — quebraria a UX de emergência.

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Vibration, Linking, Alert, Platform, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AudioPlayer } from 'expo-audio';
import * as ExpoLocation from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import ProfileService from '../../services/ProfileService';
import ActivityLogService from '../../services/ActivityLogService';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function SOSCountdownScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { triggerReason } = route.params || {};
  const [countdown, setCountdown] = useState(triggerReason ? 10 : 5);
  const [sending, setSending] = useState(false);
  const [showSensitivityPrompt, setShowSensitivityPrompt] = useState(false);
  // WhatsApp como canal complementar — exposto na view "sending" após o SMS sair.
  // Não é envio automático: precisa de interação do usuário (limitação técnica:
  // WhatsApp não suporta múltiplos destinatários num único link Linking.openURL).
  const [canUseWhatsApp, setCanUseWhatsApp] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);
  const { reduceMotion } = useAccessibility();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const playerRef = useRef(null);
  // Mensagem e primeiro contato — guardados para o botão de WhatsApp usar
  // após o disparo automático de SMS.
  const sosMessageRef = useRef('');
  const firstContactRef = useRef('');
  // Timer de auto-fechamento da view "sending" — cancelável se o usuário
  // tocar em "Enviar via WhatsApp também", pra dar tempo da ação completar.
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const startAlert = async () => {
      try {
        const player = new AudioPlayer(require('../../assets/sounds/sos_alert.mp3'));
        player.loop = true;
        player.volume = 1.0;
        await player.play();
        playerRef.current = player;
      } catch (error) {
        if (__DEV__) console.log('Audio SOS não encontrado. Usando apenas vibração.');
      }

      if (triggerReason) {
        Vibration.vibrate([500, 500, 500, 500], true);
      } else {
        Vibration.vibrate([0, 100, 100, 100]);
      }
    };

    startAlert();

    // Pulse desabilitado quando o user prefere movimento reduzido (vertigem, idosos)
    if (!reduceMotion) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerSOSAction();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (playerRef.current) {
        playerRef.current.stop();
      }
      Vibration.cancel();
    };
  }, []);

  // Normaliza número pra WhatsApp. WhatsApp exige código de país.
  // Heurística pragmática: se o número tem 10-11 dígitos (formato BR sem DDI),
  // prepende 55. Caso já tenha 12-13 dígitos começando com 55, mantém.
  // Para outros formatos (ex: usuário já salvou com DDI estrangeiro), mantém.
  const normalizeForWhatsApp = (phone) => {
    const clean = (phone || '').replace(/\D/g, '');
    if (!clean) return '';
    if (clean.startsWith('55') && clean.length >= 12) return clean;
    if (clean.length === 10 || clean.length === 11) return `55${clean}`;
    return clean;
  };

  // Botão "Enviar via WhatsApp também" — visível na view "sending".
  // Manda a mesma mensagem do SMS pro primeiro contato (limitação técnica:
  // WhatsApp não aceita múltiplos destinatários num único link).
  const handleSendWhatsApp = async () => {
    if (whatsappOpened || !firstContactRef.current) return;
    // Cancela o auto-fechamento — o usuário fecha manualmente após voltar
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setWhatsappOpened(true);
    const phone = normalizeForWhatsApp(firstContactRef.current);
    const text = encodeURIComponent(sosMessageRef.current);
    const nativeUrl = `whatsapp://send?phone=${phone}&text=${text}`;
    try {
      await Linking.openURL(nativeUrl);
    } catch (_) {
      // Fallback pra wa.me (abre WhatsApp Web ou app conforme o sistema)
      try {
        await Linking.openURL(`https://wa.me/${phone}?text=${text}`);
      } catch (e) {
        if (__DEV__) console.warn('Falha ao abrir WhatsApp:', e);
        setWhatsappOpened(false);
      }
    }
  };

  const triggerSOSAction = async () => {
    setSending(true);
    try {
      let locationText = '';
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Balanced });
        locationText = ` Estou em: https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;
      }

      let unifiedContacts = [];
      const profile = await ProfileService.getPerfilAtivo();
      if (profile?.contatos && Array.isArray(profile.contatos)) {
        profile.contatos.forEach(c => {
          if (c.telefone) unifiedContacts.push(c.telefone.replace(/\D/g, ''));
        });
      }

      try {
        const manualJson = await AsyncStorage.getItem('@emergency_contacts');
        if (manualJson) {
          const manual = JSON.parse(manualJson);
          manual.forEach(c => {
            if (c.phone) {
              const num = c.phone.replace(/\D/g, '');
              if (!unifiedContacts.includes(num)) unifiedContacts.push(num);
            }
          });
        }
      } catch (e) {
        if (__DEV__) console.log('Erro ao carregar contatos manuais:', e);
      }

      if (unifiedContacts.length === 0) {
        setSending(false);
        Alert.alert(t('sosCountdown.noContactsTitle'), t('sosCountdown.noContacts'));
        navigation.goBack();
        return;
      }

      let messagePrefix = t('sosCountdown.defaultMsg');
      if (triggerReason === 'FALL') messagePrefix = t('sosCountdown.fallMsg');
      if (triggerReason === 'VITAL_CHECK') messagePrefix = t('sosCountdown.vitalMsg');

      const message = `${messagePrefix}${locationText} (Envio automático Vigilaro)`;
      const phones = unifiedContacts.join(Platform.OS === 'ios' ? '&' : ';');

      const separator = Platform.OS === 'ios' ? '&' : '?';
      const url = `sms:${phones}${separator}body=${encodeURIComponent(message)}`;

      await Linking.openURL(url);

      // Guarda dados pro botão de WhatsApp complementar
      sosMessageRef.current = message;
      firstContactRef.current = unifiedContacts[0];

      // Detecta disponibilidade de WhatsApp (não bloqueia o fluxo se falhar)
      try {
        const wa = await Linking.canOpenURL('whatsapp://send?phone=5511999999999');
        if (wa) setCanUseWhatsApp(true);
      } catch (_) { /* silent — WhatsApp não disponível */ }

      // Log de atividade — APENAS quando o SMS de SOS foi efetivamente
      // disparado (não loga se o usuário tiver cancelado o countdown).
      try {
        const nome = profile?.nome || t('common.activeUser', 'usuário ativo');
        if (triggerReason === 'FALL') {
          await ActivityLogService.logActivity(
            t('activityLog.fallSosTitle', 'SOS por queda enviado'),
            t('activityLog.fallSosDesc', {
              nome,
              defaultValue: `Queda detectada para ${nome}. Alerta de SOS disparado para os contatos.`,
            }),
            'Warning2',
            '#EF4444',
            'fall'
          );
        } else if (triggerReason === 'VITAL_CHECK') {
          await ActivityLogService.logActivity(
            t('activityLog.vitalSosTitle', 'Check-in não respondido'),
            t('activityLog.vitalSosDesc', {
              nome,
              defaultValue: `${nome} não respondeu ao check-in. Alerta de SOS disparado para os contatos.`,
            }),
            'Timer1',
            '#F59E0B',
            'vital'
          );
        } else {
          await ActivityLogService.logActivity(
            t('activityLog.manualSosTitle', 'SOS manual enviado'),
            t('activityLog.manualSosDesc', {
              nome,
              defaultValue: `Alerta de SOS disparado manualmente por ${nome}.`,
            }),
            'Warning2',
            '#DC2626',
            'manual'
          );
        }
      } catch (logErr) {
        if (__DEV__) console.warn('Falha ao registrar log de SOS:', logErr);
      }

      // Auto-fechar a view "sending" em 6s — dá tempo do usuário ver o
      // botão de WhatsApp e decidir tocar. Cancelado se ele tocar.
      closeTimerRef.current = setTimeout(() => {
        navigation.goBack();
      }, 6000);

    } catch (error) {
      if (__DEV__) console.error('Erro ao disparar SOS:', error);
      Alert.alert(t('sosCountdown.sosErrorTitle'), t('sosCountdown.sosError'));
      navigation.goBack();
    }
  };

  // Para áudio e vibração imediatamente — o usuário tomou uma decisão.
  // Útil tanto pra cancelar quanto pra "sair via prompt de sensibilidade".
  const stopAlerts = () => {
    try {
      if (playerRef.current) playerRef.current.stop();
    } catch (_) { /* silent */ }
    Vibration.cancel();
  };

  const handleCancel = () => {
    // Trigger contextual: se o SOS veio de FALL e ainda não saiu SMS,
    // oferece o caminho pra ajustar sensibilidade em vez de simplesmente sair.
    // Não dispara pra VITAL_CHECK (semântica diferente) nem pra SOS manual.
    if (triggerReason === 'FALL' && !sending) {
      stopAlerts();
      setShowSensitivityPrompt(true);
      return;
    }
    navigation.goBack();
  };

  const handleAdjustSensitivity = () => {
    setShowSensitivityPrompt(false);
    // replace pra não deixar a tela vermelha na stack ao voltar de Sensibilidade
    navigation.replace('FallSensitivity');
  };

  const handleDismissPrompt = () => {
    setShowSensitivityPrompt(false);
    navigation.goBack();
  };

  const titleText = triggerReason === 'FALL'
    ? t('sosCountdown.fallDetected', 'QUEDA DETECTADA')
    : triggerReason === 'VITAL_CHECK'
      ? t('sosCountdown.vitalCheck', 'VERIFICAÇÃO VITAL')
      : t('sosCountdown.sendingSOS', 'ENVIANDO SOS');

  return (
    <View style={s.overlay} accessibilityViewIsModal accessibilityLiveRegion="assertive">
      <StatusBar style="light" />
      <SafeAreaView style={s.container}>
        {!sending ? (
          <>
            <View style={s.iconCircle} accessible={false} importantForAccessibility="no">
              <NeoIcon name="Warning2" size={42} color="#FFF" variant="Bold" />
            </View>

            <Text style={s.title} accessibilityRole="header">
              {titleText}
            </Text>

            <Animated.View
              style={[s.circle, { transform: [{ scale: pulseAnim }] }]}
              accessibilityLiveRegion="assertive"
              accessibilityLabel={t('sosCountdown.secondsLeft', { count: countdown, defaultValue: `${countdown} segundos restantes` })}
            >
              <Text style={s.countdownText}>{countdown}</Text>
            </Animated.View>

            <Text style={s.subtitle}>
              {t('sosCountdown.locationMsg', 'Seus contatos receberão sua localização.')}
            </Text>

            <TouchableOpacity
              style={s.cancelBtn}
              onPress={handleCancel}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={t('sosCountdown.cancelBtn', 'CANCELAR')}
              accessibilityHint={t('sosCountdown.cancelHint', 'Interrompe o envio do alerta SOS e fecha esta tela.')}
            >
              <Text style={s.cancelText}>
                {t('sosCountdown.cancelBtn', 'CANCELAR')}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={s.iconCircle} accessible={false} importantForAccessibility="no">
              <NeoIcon name="Send2" size={42} color="#FFF" variant="Bold" />
            </View>
            <Text style={s.title} accessibilityRole="header">
              {t('sosCountdown.sendingAlert', 'ENVIANDO ALERTA…')}
            </Text>
            <Text style={s.subtitle}>
              {t('sosCountdown.confirmSend', 'Confirme o envio no app de mensagens.')}
            </Text>

            {/* Botão complementar de WhatsApp — só aparece se o WhatsApp
                estiver instalado e houver contato. Envia a mesma mensagem
                pro primeiro contato (limitação técnica: WhatsApp não aceita
                múltiplos destinatários). */}
            {canUseWhatsApp && !!firstContactRef.current && (
              <TouchableOpacity
                style={[s.whatsappBtn, whatsappOpened && s.whatsappBtnDone]}
                onPress={handleSendWhatsApp}
                activeOpacity={0.85}
                disabled={whatsappOpened}
                accessibilityRole="button"
                accessibilityLabel={t('sosCountdown.alsoWhatsApp', 'Enviar via WhatsApp também')}
              >
                <NeoIcon
                  name={whatsappOpened ? 'TickCircle' : 'Send2'}
                  size={20}
                  color="#FFF"
                  variant="Bold"
                />
                <Text style={s.whatsappBtnText}>
                  {whatsappOpened
                    ? t('sosCountdown.whatsappOpened', 'WhatsApp aberto')
                    : t('sosCountdown.alsoWhatsApp', 'Enviar via WhatsApp também')}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[s.cancelBtn, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
              onPress={handleCancel}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={t('sosCountdown.closeBtn', 'FECHAR')}
            >
              <Text style={s.cancelText}>
                {t('sosCountdown.closeBtn', 'FECHAR')}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>

      {/* TRIGGER CONTEXTUAL — só pra FALL cancelado antes do SMS sair.
          Tom calmo (sem vermelho-pânico), oferece caminho direto pra
          ajustar sensibilidade. Não fecha por toque fora — força escolha. */}
      <Modal
        visible={showSensitivityPrompt}
        transparent
        animationType="fade"
        onRequestClose={handleDismissPrompt}
      >
        <View style={s.promptBackdrop}>
          <View style={s.promptCard}>
            <View style={s.promptIconWrap}>
              <NeoIcon name="Activity" size={28} color="#10B981" variant="Bold" />
            </View>
            <Text style={s.promptTitle}>
              {t('sosCountdown.sensitivityPromptTitle', 'Pareceu que não foi uma queda?')}
            </Text>
            <Text style={s.promptDesc}>
              {t(
                'sosCountdown.sensitivityPromptDesc',
                'Se o alerta está disparando à toa, dá pra reduzir a sensibilidade aqui mesmo.'
              )}
            </Text>

            <TouchableOpacity
              style={s.promptPrimaryBtn}
              onPress={handleAdjustSensitivity}
              activeOpacity={0.85}
              accessibilityRole="button"
            >
              <Text style={s.promptPrimaryText}>
                {t('sosCountdown.sensitivityPromptAdjust', 'Ajustar sensibilidade')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={s.promptSecondaryBtn}
              onPress={handleDismissPrompt}
              activeOpacity={0.6}
              accessibilityRole="button"
            >
              <Text style={s.promptSecondaryText}>
                {t('sosCountdown.sensitivityPromptDismiss', 'Agora não')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#DC2626', // vermelho sólido — sem opacity (overlay confiável)
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: '100%',
  },
  iconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 28,
    textAlign: 'center',
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    // BUG FIX: era 'transparent' → countdown vermelho ficava invisível
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  countdownText: {
    color: '#DC2626',
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -2,
  },
  subtitle: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 20,
    lineHeight: 22,
    fontWeight: '600',
    opacity: 0.95,
  },
  cancelBtn: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 2,
  },

  // Botão WhatsApp complementar — verde do WhatsApp (#25D366) sobre o
  // vermelho da tela. Contraste alto, fica claro que é uma ação secundária
  // mas premium (não escondida). Estado "done" muda o fundo pra escuro.
  whatsappBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 100,
    width: '100%',
    marginBottom: 14,
    gap: 10,
  },
  whatsappBtnDone: {
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  whatsappBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Modal contextual de sensibilidade — tom calmo, branco/cinza,
  // contrasta com o overlay vermelho atrás. Não usa o vermelho de pânico.
  promptBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  promptIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16,185,129,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  promptDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
    paddingHorizontal: 4,
  },
  promptPrimaryBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  promptSecondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  promptSecondaryText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
