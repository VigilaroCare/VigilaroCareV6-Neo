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
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationService from '../services/NavigationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import haptic from '../utils/Haptics';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

// Corpo do avião do glifo Phosphor "AirplaneInFlight" (peso regular), SEM a
// barra horizontal inferior (o "chão"). O glifo original junta avião + chão num
// único path; aqui isolamos só o avião para o estado "decolando" (Modo Viagem
// ativo): mesmo desenho, sem o chão, livre para inclinar e subir.
// viewBox padrão do Phosphor: 0 0 256 256.
const PLANE_NO_GROUND = 'M248 136v24a8 8 0 0 1-8 8H61.07a39.75 39.75 0 0 1-38.31-28.51L8.69 92.6A16 16 0 0 1 24 72h8a8 8 0 0 1 5.65 2.34L59.32 96h22.49l-9-26.94A16 16 0 0 1 88 48h8a8 8 0 0 1 5.66 2.34L147.32 96H208a40 40 0 0 1 40 40m-16 0a24 24 0 0 0-24-24h-64a8 8 0 0 1-5.65-2.34L92.69 64H88l12.49 37.47A8 8 0 0 1 92.91 112H56a8 8 0 0 1-5.66-2.34L28.69 88H24l14.07 46.9a23.85 23.85 0 0 0 23 17.1H232Z';

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
  KnowledgeTab: new Set(['KnowledgeHubScreen', 'KnowledgeTab', 'TravelSafetyGuide', 'TeoriaFogo']),
  RelatorioTab: new Set(['ProfileRiskSummaryScreen', 'ProfileRiskSummary', 'RelatorioTab']),
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
// Iconografia unificada via NeoIcon (contrato único: "Bold ancora, Linear atua").
// Bold + cor da marca no item ativo; Linear + neutro no inativo.
// Glifos escolhidos para assimilar o footer de referência (recorte antigo):
// casa, livro ABERTO, avião, hambúrguer (3 linhas) — agora via NeoIcon/Phosphor.
const TAB_BUTTONS = [
  { labelKey: 'navigation.home',      route: 'HomeTab',       icon: 'HouseSimple' },
  { labelKey: 'navigation.education', route: 'KnowledgeTab',  icon: 'GraduationCap' },
  null, // espaçador central para o SOS
  { labelKey: 'navigation.report',    route: 'RelatorioTab',  icon: 'ClipboardText' },
  { labelKey: 'navigation.menu',      route: 'MenuTab',       icon: 'SquaresFour' },
];

export default function GlobalFloatingFooter({ currentRouteName }) {
  // ─── TODOS OS HOOKS ANTES DE QUALQUER RETORNO CONDICIONAL ───────────────
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { isLeftHanded } = useLeftHandedStyle();
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const sosTimer = useRef(null);
  const longPressTriggered = useRef(false);
  const [isTravelModeOn, setIsTravelModeOn] = React.useState(false);
  const [activeTransportMode, setActiveTransportMode] = React.useState('aviao');
  // Retorno concluído ("checkout seguro" feito): avião inverte = voltando pra casa.
  const [isReturning, setIsReturning] = React.useState(false);

  // SOS Pulse Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Modo Viagem: "ascensão" do aviãozinho — sobe e flutua suavemente quando
  // o modo está ativo (micro-interação restaurada do footer antigo).
  const ascentAnim = useRef(new Animated.Value(0)).current;

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

  // Loop de ascensão do tab Viagem — só roda enquanto o Modo Viagem está ativo.
  // translateY 0 → -4 → 0 dá a sensação de o avião "decolar"/flutuar subindo.
  useEffect(() => {
    if (!isTravelModeOn) {
      ascentAnim.stopAnimation();
      Animated.timing(ascentAnim, { toValue: 0, duration: 220, useNativeDriver: true }).start();
      return;
    }
    const climb = Animated.loop(
      Animated.sequence([
        Animated.timing(ascentAnim, { toValue: -4, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(ascentAnim, { toValue: 0,  duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    climb.start();
    return () => climb.stop();
  }, [isTravelModeOn, ascentAnim]);

  useEffect(() => {
    // Atualiza status do modo de viagem (e fase de retorno) a cada mudança de tela
    AsyncStorage.getItem('@active_trip').then(val => {
      setIsTravelModeOn(!!val);
      let returning = false;
      let transport = 'aviao';
      try { 
        if (val) {
          const tripData = JSON.parse(val);
          returning = !!tripData.retornoConcluido;
          if (tripData.transportMode) transport = tripData.transportMode;
        }
      } catch (e) {}
      setIsReturning(returning);
      setActiveTransportMode(transport);
    }).catch(() => {});

    // Escuta ativações e desativações instantâneas na própria tela (Realtime)
    const subMode = DeviceEventEmitter.addListener('travel_mode_changed', (status) => {
        setIsTravelModeOn(status);
        if (!status) {
            setIsReturning(false); // viagem encerrada zera o retorno
            setActiveTransportMode('aviao');
        } else {
            // Em caso de ativação (status=true), precisamos recarregar os dados do AsyncStorage para saber qual é o transportMode
            AsyncStorage.getItem('@active_trip').then(val => {
                if (val) {
                    try {
                        const tripData = JSON.parse(val);
                        if (tripData.transportMode) setActiveTransportMode(tripData.transportMode);
                    } catch (e) {}
                }
            }).catch(() => {});
        }
    });
    // Conclusão do "checkout seguro" → fase de retorno
    const subReturn = DeviceEventEmitter.addListener('travel_return_changed', (returning) => {
        setIsReturning(!!returning);
    });

    return () => { subMode.remove(); subReturn.remove(); };
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
    // Haptic feedback semântico para navegação entre tabs
    haptic.tap();

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
    // Press-in do SOS = heavy
    haptic.heavy();

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
    haptic.sos(); // heavy + warning sequencial — gatilho crítico
    NavigationService.navigate('SOSEmergencyMode');
  }, []);
  // ────────────────────────────────────────────────────────────────────────

  // Retorno condicional somente APÓS todos os hooks
  if (currentRouteName && HIDDEN_ROUTES.has(currentRouteName)) {
    return null;
  }

  const bottomPadding = insets.bottom > 0 ? insets.bottom : 10;
  const buttons = isLeftHanded ? [...TAB_BUTTONS].reverse() : TAB_BUTTONS;

  // Fundo suave que remete à identidade visual do app (leve toque de verde/teal)
  const containerThemed = isDark
    ? { backgroundColor: 'rgba(20, 28, 26, 0.96)', borderTopColor: 'rgba(255,255,255,0.15)' }
    : { backgroundColor: 'rgba(244, 251, 250, 0.96)', borderTopColor: 'rgba(0,0,0,0.12)' };
  const inactiveTabColor = isDark ? themeColors.neutral[700] : Neo.colors.neutral[500];

  return (
    <View style={styles.containerWrapper}>
      <View style={[
        styles.container,
        containerThemed,
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
          
          const color = isIconActive ? Neo.colors.primary[500] : inactiveTabColor;
          
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
              {tab.route === 'TravelModeTab' ? (
                // Narrativa: ícone inativo (pousado) quando viagem está desligada.
                // Quando ativo, usamos a animação de flutuação e ícone dinâmico baseado no modal.
                <Animated.View
                  style={{
                    transform: [
                      { translateY: ascentAnim },
                      { rotate: (isTravelModeOn && activeTransportMode === 'aviao') ? '-18deg' : '0deg' },
                      // Fase de retorno: espelha o ícone (aponta pra casa).
                      { scaleX: isReturning ? -1 : 1 },
                    ],
                  }}
                >
                  {isTravelModeOn ? (
                    // Ícone dinâmico do transporte (ativo)
                    (() => {
                        if (activeTransportMode === 'carro') return <NeoIcon name="CarProfile" variant="Bold" size={26} color={color} />;
                        if (activeTransportMode === 'onibus') return <NeoIcon name="Bus" variant="Bold" size={26} color={color} />;
                        if (activeTransportMode === 'trem') return <NeoIcon name="Train" variant="Bold" size={26} color={color} />;
                        if (activeTransportMode === 'navio') return <NeoIcon name="Boat" variant="Bold" size={26} color={color} />;
                        
                        // Fallback (avião decolando - corpo do avião sem o chão)
                        return (
                          <Svg width={26} height={26} viewBox="0 0 256 256">
                            <Path d={PLANE_NO_GROUND} fill={color} />
                          </Svg>
                        );
                    })()
                  ) : (
                    // Inativo (avião no chão)
                    <NeoIcon name={tab.icon} variant="Linear" size={26} color={color} />
                  )}
                </Animated.View>
              ) : (
                <NeoIcon
                  name={tab.icon}
                  variant={isIconActive ? 'Bold' : 'Linear'}
                  size={26}
                  color={color}
                />
              )}
              <Text style={[styles.tabLabel, { color }]}>{t(tab.labelKey)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botão SOS flutuante com PULSE animation */}
      <Animated.View style={[
        styles.sosPulseWrapper,
        {
          bottom: insets.bottom > 0 ? insets.bottom + 16 : 22,
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
