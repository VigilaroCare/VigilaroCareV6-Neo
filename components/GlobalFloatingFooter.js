/**
 * GlobalFloatingFooter.js
 * Footer de navegação flutuante — renderizado acima de todas as telas.
 * 
 * Tactical Calm UX/UI Overhaul:
 * - SOS button: pulse animation (scale 3s cycle) + upgraded label (fs 11, ls 2)
 * - Haptics: Light impact on navigation touches
 */

import React, { useEffect, useRef, useCallback } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
  Platform, Vibration, DeviceEventEmitter, Animated, Easing
} from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { displayFont } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationService from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useTranslation } from 'react-i18next';

// ---------------------------------------------------------------------------
// ROTAS ONDE O FOOTER NÃO DEVE APARECER
// ---------------------------------------------------------------------------
const HIDDEN_ROUTES = new Set([
  // Onboarding
  'BoasVindas', 'PerfilWizard', 'Briefing', 'NewHomeWizard',
  'SecretBriefing', 'SafetyPermit', 'FamilyComposition',
  'FamilyCompositionScreen', 'QuemProtegerScreenNeo', 'QuemProteger',
  // Splash
  'Splash', 'CustomSplashScreen',
  // Câmera / Scanner
  'ScannerScreen', 'Camera',
  // Assistente de Voz / IA
  'AssistenteVoz', 'AssistenteVozScreen', 'AssistenteIA',
  'AssistenteIAScreen', 'ConversationalAgent', 'AITextChat',
  // Auth legacy
  'Login', 'Intro',
  // Emergência — não exibe footer sobre telas de SOS
  'SOSEmergencyMode', 'SOSCountdown',
  'ModoSituacaoAtiva', 'EncerrarSituacao', 'EmergenciaRapida',
  // Premium
  'UpgradePremium',
]);

// ---------------------------------------------------------------------------
// MAPEAMENTO DE ROTAS POR ABA — puro, fora do componente
// ---------------------------------------------------------------------------
const TAB_ROUTES = {
  HomeTab: new Set(['Dashboard', 'HomeScreen', 'Relatorios', 'MainTabNavigator', 'MainTabs']),
  KnowledgeTab: new Set(['KnowledgeHubScreen', 'KnowledgeTab', 'TravelSafetyGuide', 'TeoriaFogoScreen']),
  TravelModeTab: new Set(['TravelModeScreen', 'TravelModeTab']),
  MenuTab: new Set(['MenuScreen', 'MenuTab', 'Settings']),
  AcessibilidadeTab: new Set(['AccessibilitySettingsScreen', 'AcessibilidadeTab']),
};

// Função pura — fora do componente, sem closure em currentRouteName
const isTabActive = (tab, currentRouteName) => {
  if (currentRouteName === tab) return true;
  return TAB_ROUTES[tab]?.has(currentRouteName) ?? false;
};

// ---------------------------------------------------------------------------
// DEFINIÇÃO DOS BOTÕES DE ABA
// ---------------------------------------------------------------------------
const TAB_BUTTONS = [
  { labelKey: 'navigation.home',      route: 'HomeTab',      iconActive: 'home',     iconInactive: 'home-outline',    size: 24 },
  { labelKey: 'navigation.education', route: 'KnowledgeTab', iconActive: 'book',     iconInactive: 'book-outline',    size: 24 },
  null, // espaçador central para o SOS
  { labelKey: 'navigation.travel',    route: 'TravelModeTab', iconActive: 'airplane', iconInactive: 'airplane-outline', size: 26, rotate: true },
  { labelKey: 'navigation.menu',      route: 'MenuTab',       iconActive: 'menu',     iconInactive: 'menu-outline',    size: 28 },
];

export default function GlobalFloatingFooter({ currentRouteName }) {
  // ─── TODOS OS HOOKS ANTES DE QUALQUER RETORNO CONDICIONAL ───────────────
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { isLeftHanded } = useLeftHandedStyle();
  const sosTimer = useRef(null);
  const longPressTriggered = useRef(false);
  const [isTravelModeOn, setIsTravelModeOn] = React.useState(false);

  // SOS Pulse Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Infinite pulse: scale 1.0 → 1.08 → 1.0 over 3s
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  useEffect(() => {
    // Atualiza status do modo de viagem a cada mudança de tela
    AsyncStorage.getItem('@active_trip').then(val => {
      setIsTravelModeOn(!!val);
    }).catch(() => {});

    // Escuta ativações e desativações instantâneas na própria tela (Realtime)
    const subscription = DeviceEventEmitter.addListener('travel_mode_changed', (status) => {
        setIsTravelModeOn(status);
    });

    return () => subscription.remove();
  }, [currentRouteName]);

  // Cleanup do timer SOS ao desmontar — previne memory leak
  useEffect(() => {
    return () => {
      if (sosTimer.current) {
        clearTimeout(sosTimer.current);
        sosTimer.current = null;
      }
    };
  }, []);

  const handleNavigate = useCallback((name) => {
    // Haptic feedback on tab navigation
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const tabRoutes = Object.keys(TAB_ROUTES);
    if (tabRoutes.includes(name)) {
      NavigationService.navigate('MainTabs', { screen: name });
    } else {
      NavigationService.navigate(name);
    }
  }, []);

  // SOS handlers separados para clareza
  const handleSOSPressIn = useCallback(() => {
    longPressTriggered.current = false;
    // Heavy haptic on SOS press-in
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    sosTimer.current = setTimeout(() => {
      longPressTriggered.current = true;

      // iOS ignora padrão de vibração — vibra apenas uma vez
      // Android: [delay, duration, pause, duration]
      if (Platform.OS === 'android') {
        Vibration.vibrate([0, 150, 80, 150]);
      } else {
        Vibration.vibrate();
      }

      NavigationService.navigate('EmergenciaRapida');
    }, 1000);
  }, []);

  const handleSOSPressOut = useCallback(() => {
    if (sosTimer.current) {
      clearTimeout(sosTimer.current);
      sosTimer.current = null;
    }
  }, []);

  const handleSOSPress = useCallback(() => {
    // Se long press foi disparado, ignora o press normal
    if (longPressTriggered.current) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    NavigationService.navigate('SOSEmergencyMode');
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  // Retorno condicional somente APÓS todos os hooks
  if (currentRouteName && HIDDEN_ROUTES.has(currentRouteName)) {
    return null;
  }

  const bottomPadding = insets.bottom > 0 ? insets.bottom : 10;
  const buttons = isLeftHanded ? [...TAB_BUTTONS].reverse() : TAB_BUTTONS;

  return (
    <View style={styles.containerWrapper}>
      <View style={[
        styles.container,
        { paddingBottom: bottomPadding, height: 60 + bottomPadding },
      ]}>
        {buttons.map((tab, index) => {
          // Espaçador central para o botão SOS
          if (tab === null) {
            return <View key="sos-spacer" style={{ flex: 1 }} />;
          }

          const active = isTabActive(tab.route, currentRouteName);
          const forceTravelHighlight = tab.route === 'TravelModeTab' && isTravelModeOn;
          const isIconActive = active || forceTravelHighlight;
          
          const color = isIconActive ? Neo.colors.primary[500] : Neo.colors.neutral[500];
          const iconName = isIconActive ? tab.iconActive : tab.iconInactive;
          
          // Avião só voa (-45deg) se o modo de viagem ESTIVER ON. Se for apenas a tab ativa, não decola.
          const iconStyle = tab.rotate && forceTravelHighlight ? { transform: [{ rotate: '-45deg' }] } : {};

          return (
            <TouchableOpacity
              key={tab.route}
              onPress={() => handleNavigate(tab.route)}
              style={styles.tabButton}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityLabel={t(tab.labelKey)}
              accessibilityState={{ selected: active }}
            >
              <View style={iconStyle}>
                <Ionicons name={iconName} size={tab.size} color={color} />
              </View>
              <Text style={[styles.tabLabel, { color }]}>{t(tab.labelKey)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botão SOS flutuante com PULSE animation */}
      <Animated.View style={[
        styles.sosPulseWrapper,
        {
          bottom: insets.bottom > 0 ? insets.bottom + 10 : 15,
          transform: [{ scale: pulseAnim }],
        },
      ]}>
        <TouchableOpacity
          onPress={handleSOSPress}
          onPressIn={handleSOSPressIn}
          onPressOut={handleSOSPressOut}
          style={styles.sosFloatingButton}
          activeOpacity={0.8}
          accessibilityLabel={t('navigation.sosLabel')}
          accessibilityHint={t('navigation.sosHint')}
          accessibilityRole="button"
        >
          <NeoIcon name="Call" size={26} color="#FFF" variant="Bold" />
          <Text style={styles.sosLabel}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch', // evita height: '100%' que gera warning no Android
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  // SOS pulse wrapper — Animated.View replaces direct TouchableOpacity styling
  sosPulseWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10000,
  },
  sosFloatingButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#C62828',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#C62828',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  sosLabel: {
    color: '#FFF',
    fontSize: 11,           // Upgraded from 9 → 11
    fontWeight: '800',       // Bolder
    letterSpacing: 2,        // Upgraded from 1 → 2
    marginTop: 1,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});