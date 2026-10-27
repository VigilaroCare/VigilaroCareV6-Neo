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
import NeoIcon from './NeoIcon';
import Svg, { Path, Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
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
// GEOMETRIA DO FOOTER — FONTE ÚNICA
// ---------------------------------------------------------------------------
// Quem desenha conteúdo por baixo do footer flutuante precisa saber quanta
// altura ele realmente ocupa. Antes cada tela chutava um número fixo (a Home
// usava 90), e o número fixo funcionava em aparelho sem barra de gestos e
// falhava em aparelho com ela — porque a altura ocupada DEPENDE do
// insets.bottom. Foi assim que os rótulos da última fileira de pictogramas
// foram parar atrás do footer mais de uma vez.
//
// Duas coisas ocupam espaço, e a maior manda:
//   • a barra:  60 + bottomPadding   (ver style `container` abaixo)
//   • o SOS:    (insets.bottom + 16) + 64, porque ele flutua ACIMA da barra
export const FOOTER_BAR_BASE_HEIGHT = 60;
export const SOS_BUTTON_SIZE = 64;
export const FOOTER_BREATHING_ROOM = 8;

/**
 * Clearance da BARRA — a que vale para conteúdo em toda a largura do ecrã.
 *
 * É esta que a maior parte das telas quer. O botão SOS é mais alto, mas é um
 * círculo de 64px CENTRADO (alignSelf: 'center'), não uma faixa: ele só tapa
 * a coluna do meio. Reservar a altura do SOS em toda a largura cobra ~20px a
 * mais do que o necessário — foi o que fez os pictogramas da Home encolherem
 * sem precisar.
 *
 * @param {number} insetBottom - de useSafeAreaInsets().bottom
 */
export function getFooterClearance(insetBottom = 0) {
    const bottomPadding = insetBottom > 0 ? insetBottom : 10;
    return FOOTER_BAR_BASE_HEIGHT + bottomPadding + FOOTER_BREATHING_ROOM;
}

/**
 * Clearance do SOS — só para conteúdo que fica na COLUNA CENTRAL do ecrã,
 * onde o botão flutuante realmente passa por cima.
 */
export function getSosClearance(insetBottom = 0) {
    return (insetBottom > 0 ? insetBottom + 16 : 22) + SOS_BUTTON_SIZE + FOOTER_BREATHING_ROOM;
}

/** Largura ocupada pelo SOS, para quem precisar saber o que ele tapa. */
export const SOS_OCCLUSION_WIDTH = SOS_BUTTON_SIZE;

// ---------------------------------------------------------------------------
// ROTAS ONDE O FOOTER NÃO DEVE APARECER
// ---------------------------------------------------------------------------
// REGRA (decisão de produto 2026-07-31): o rodapé é permanente no app em uso
// normal. Esconder é a exceção, e só se justifica em três situações — antes de
// o app existir para o utilizador, durante uma emergência, e com a câmera
// aberta. Fora disso, some da lista.
//
// Saíram nesta revisão, por serem telas de uso normal onde esconder era ruído:
// QuemProteger, QuemProtegerScreenNeo, FamilyComposition,
// FamilyCompositionScreen, SafetyPermit, UpgradePremium, Login, Intro.
const HIDDEN_ROUTES = new Set([
  // 1. Antes de o app existir — sem casa, perfil ou vistoria, as abas levariam
  //    a telas vazias. E o botão SOS chegou a cobrir metade do "Próximo" do
  //    tour (corrigido em 2026-07-31 ao acrescentar 'WelcomeTour' aqui).
  'Splash', 'CustomSplashScreen',
  'BoasVindas', 'WelcomeTour', 'PerfilWizard', 'Briefing', 'NewHomeWizard',
  'SecretBriefing',

  // 2. Emergência em tela cheia — o rodapé poria um botão SOS por cima da
  //    própria tela de SOS.
  'SOSEmergencyMode', 'SOSCountdown',
  'ModoSituacaoAtiva', 'EncerrarSituacao', 'EmergenciaRapida',

  // 3. Câmera — a barra tapa o enquadramento.
  'ScannerScreen', 'Camera',
]);

// ---------------------------------------------------------------------------
// MAPEAMENTO DE ROTAS POR ABA — puro, fora do componente
// ---------------------------------------------------------------------------
const TAB_ROUTES = {
  HomeTab: new Set(['Dashboard', 'HomeScreen', 'Relatorios', 'MainTabNavigator', 'MainTabs']),
  KnowledgeTab: new Set(['KnowledgeHubScreen', 'KnowledgeTab', 'TravelSafetyGuide', 'TeoriaFogo']),
  TravelModeTab: new Set(['TravelModeScreen', 'TravelModeTab', 'TravelSafetyGuide']),
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
// Glifos PRÓPRIOS da família "eco do tile" (custom Vigilaro): cada glifo mora
// dentro de um quadrado de cantos arredondados que cita os tiles cerâmicos, e
// "acende" preenchido no ativo. Casa = telhado duas-águas contemporâneo;
// Menu = grade 2×2 (a própria grade de tiles).
const TAB_BUTTONS = [
  { labelKey: 'navigation.home',      route: 'HomeTab',       icon: 'HomeTile' },
  { labelKey: 'navigation.education', route: 'KnowledgeTab',  icon: 'EducationTile' },
  null, // espaçador central para o SOS
  // 2026-07-31: 'Relatório' saiu daqui e virou um card ao lado do Mapa de
  // Calor, dentro de Vistorias — onde já vivia o outro relatório e onde os
  // dois finalmente deixam de competir pelo mesmo nome. A vaga ficou para o
  // Modo Viagem, que já teve esta aba antes: o desenho do avião, a animação
  // de ascensão e os ícones por modal de transporte nunca foram removidos,
  // só ficaram órfãos quando o tab saiu desta lista.
  { labelKey: 'navigation.travel',    route: 'TravelModeTab', icon: 'TravelTile' },
  { labelKey: 'navigation.menu',      route: 'MenuTab',       icon: 'MenuTile' },
];

/**
 * A MOLDURA SAIU DOS GLIFOS em 25/10/2026. Até ali a família de ícones do
 * rodapé citava o tile cerâmico: cada glifo morava dentro de um quadrado de
 * cantos arredondados, e o ativo se preenchia. Os tiles saíram das telas quando
 * o card retroiluminado entrou (ANATOMIA §9.5), e o rodapé ficou citando um
 * padrão que não existe mais. Ver `components/icons/HomeTileIcon.js` para o
 * reescalonamento que a remoção exigiu.
 */
let seqLuz = 0;

/**
 * CardDaAba — cada aba é um card, como os da Home.
 *
 * A primeira tentativa foi só a LUZ atrás do glifo, mantendo a barra leve. O
 * Agnaldo olhou e recusou, com um diagnóstico que eu não tinha previsto: *"a
 * maior diferença que percebi foi o distanciamento do pictograma do seu nome
 * correspondente"*. Ao crescer os glifos (a moldura saiu e `K` devolveu a
 * extensão que ela ocupava), o rótulo passou a parecer solto do ícone — e a luz
 * sozinha não ancorava os dois.
 *
 * Com o card, ícone e rótulo moram no mesmo campo e o distanciamento acaba por
 * construção. A barra fica mais presente do que eu teria escolhido; é decisão
 * dele, e o custo está contido: o tom dos inativos é `muted`, não um matiz
 * saturado, então a barra não compete com o conteúdo.
 *
 * A gramática é a do seletor do Viagem, que é o que a barra de abas é: escolhido
 * em verde, preteridos em grafite. O glifo continua Bold no ativo e Linear no
 * inativo — o sinal nunca pode ser só cor (WCAG 1.4.1).
 */
function CardDaAba({ tom, children }) {
    const id = useRef(`cardaba${++seqLuz}`).current;
    const r = Neo.gradients.radiais;
    const cores = r[tom] || r.muted;
    return (
        <View style={styles.cardAba}>
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
                <Defs>
                    <RadialGradient id={id} cx={r.foco.cx} cy={r.foco.cy} rx={r.foco.rx} ry={r.foco.ry}>
                        {cores.map((c, i) => (
                            <Stop key={i} offset={r.paradas[i]} stopColor={c} stopOpacity="1" />
                        ))}
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
            </Svg>
            {children}
        </View>
    );
}

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
          
          // Tinta BRANCA nos dois estados: o campo do card e saturado tanto no
          // ativo (verde) quanto no inativo (grafite), e tinta de tema sumiria
          // sobre ele. O estado se diz pelo TOM do card e pelo peso do glifo.
          const color = '#FFFFFF';
          const tomDaAba = isIconActive ? 'success' : 'muted';
          
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
              <CardDaAba tom={tomDaAba}>
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
                        if (activeTransportMode === 'carro') return <NeoIcon name="CarProfile" variant="Bold" size={32} color={color} />;
                        if (activeTransportMode === 'onibus') return <NeoIcon name="Bus" variant="Bold" size={32} color={color} />;
                        if (activeTransportMode === 'trem') return <NeoIcon name="Train" variant="Bold" size={32} color={color} />;
                        if (activeTransportMode === 'navio') return <NeoIcon name="Boat" variant="Bold" size={32} color={color} />;
                        // Moto faltava desde 23/10/2026, quando ela entrou no
                        // seletor: caía no fallback e a aba mostrava um AVIÃO
                        // para quem viajava de moto. O fallback existe para
                        // modal desconhecido, não para um que está na lista.
                        if (activeTransportMode === 'moto') return <NeoIcon name="Motorcycle" variant="Bold" size={32} color={color} />;
                        
                        // Fallback (avião decolando - corpo do avião sem o chão)
                        return (
                          <Svg width={26} height={26} viewBox="0 0 256 256">
                            <Path d={PLANE_NO_GROUND} fill={color} />
                          </Svg>
                        );
                    })()
                  ) : (
                    // Inativo (avião pousado dentro do tile).
                    // size 32 e variant conforme o estado, como as outras abas:
                    // o 26 fixo e o 'Linear' cravado vinham de quando o ícone
                    // era um avião solto, sem moldura — aí ele precisava ser
                    // menor para não brigar com os vizinhos e nunca acendia.
                    // Com o TravelTile, tem de seguir a mesma régua dos irmãos.
                    <NeoIcon name={tab.icon} variant={isIconActive ? 'Bold' : 'Linear'} size={32} color={color} />
                  )}
                </Animated.View>
              ) : (
                <NeoIcon
                  name={tab.icon}
                  variant={isIconActive ? 'Bold' : 'Linear'}
                  size={32}
                  color={color}
                />
              )}
                <Text style={[styles.tabLabel, { color }]} numberOfLines={1}>{t(tab.labelKey)}</Text>
              </CardDaAba>
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
          <Text style={styles.sosLabel}>{t('telas.GlobalFloatingFooter.sos', 'SOS')}</Text>
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
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch', // evita height: '100%' que gera warning no Android
  },
  // O CARD DA ABA. Ícone e rótulo moram dentro dele, que é o que resolve o
  // distanciamento entre os dois (Agnaldo, 25/10/2026). A altura cabe no
  // orçamento de 60px da barra: 48 de card mais 6 de folga em cima e embaixo.
  cardAba: {
    flex: 1,
    alignSelf: 'stretch',
    marginVertical: 4,
    // 8 e não 4. No papel a proporção já batia com a da Home — card de aba
    // 70x52 (1,35) contra card da Home 173x130 (1,33) — mas o olho lia esticado,
    // e o Agnaldo apontou. A diferença é o CONTEÚDO: no card da Home um
    // pictograma grande preenche a caixa; no da aba sobra vazio horizontal em
    // volta de um glifo pequeno, e vazio alongado lê como alongamento. Em 8pt o
    // card fica 62x52 (1,19) e a mancha fecha.
    marginHorizontal: 8,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 9.5,
    fontWeight: '700',
    marginTop: 1,
    letterSpacing: -0.05,
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
