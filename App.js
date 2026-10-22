// App.js
// Vigilaro Care V6 Neo
// Última revisão: 2026-03-31
//
// HISTÓRICO DE CORREÇÕES:
//  [FIX-1]   VitalCheckService.logout() no cleanup do useEffect
//  [FIX-2]   MedicalDisclaimerModal como gate de boot
//  [FIX-3]   NavigationBar com guard apiLevel < 35
//  [FIX-4]   BatteryMonitor fora do NavigationContainer
//  [FIX-5]   KitPrimeirosSocorros: duplicata removida
//  [FIX-6]   TermsModal: sem dupla montagem
//  [FIX-7]   SplashScreen.hideAsync() protegido por ref
//  [FIX-8]   cardStyle via constante BG_COLOR
//  [FIX-9]   hasCompletedOnboarding valida existência de perfis
//  [FIX-10]  Nomenclatura de rotas padronizada
//  [FIX-12]  Timeout com flag cancelled (sem Promise.race)
//  [FIX-13]  Disclaimer: persistência exclusivamente no modal
//  [FIX-14]  navigatorReady como estado dedicado
//  [FIX-15]  startServices com await
//  [FIX-16]  DISCLAIMER_VERSION declarada
//  [FIX-A03] setInterval usa ref — sem stale closure, com cleanup
//  [FIX-A04] Disclaimer boot valida versão além do accepted
//  [FIX-C17] HomeCompletaScreen apontava para HomeScreenNeo — rota removida em
//            24/09: era registro duplicado da aba Início, sem nenhum caminho
//            de navegação. Mesmo caso de KnowledgeHub, duplicata da aba Educação.
//  [FIX-C18] Copyright atualizado para 2026 (SobreScreen)
//  [FIX-C19] BriefingScreen (stub) removido — rota Briefing → SecretBriefingScreen
//  [FIX-C20] Arquivos legados movidos para _legacy/screens (ou já removidos)
//  [FEAT-RA01] Adicionado RecentActivityScreen

import { useState, useEffect, useRef, useCallback } from "react";
import { View, Platform, LogBox, AppState } from "react-native";

// Supressões de warning — cada item documentado com motivo.
// Revisar esta lista a cada bump de dependência major.
LogBox.ignoreLogs([
  // expo-notifications: push remoto não é suportado no Expo Go (apenas em build
  // dev/produção). Esperado em desenvolvimento; sem impacto funcional no app.
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported',
  // React Native / Reanimated: LayoutAnimation virou no-op na New Architecture.
  // Aviso informativo; as animações relevantes usam Animated/Reanimated.
  'setLayoutAnimationEnabledExperimental is currently a no-op',
]);

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import './i18n'; // Configuração do i18next
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "./utils/SecureStorage";
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
const PlusJakartaSans_400Regular = require('@expo-google-fonts/plus-jakarta-sans/400Regular/PlusJakartaSans_400Regular.ttf');
const PlusJakartaSans_500Medium = require('@expo-google-fonts/plus-jakarta-sans/500Medium/PlusJakartaSans_500Medium.ttf');
const PlusJakartaSans_600SemiBold = require('@expo-google-fonts/plus-jakarta-sans/600SemiBold/PlusJakartaSans_600SemiBold.ttf');
const PlusJakartaSans_700Bold = require('@expo-google-fonts/plus-jakarta-sans/700Bold/PlusJakartaSans_700Bold.ttf');
const PlusJakartaSans_800ExtraBold = require('@expo-google-fonts/plus-jakarta-sans/800ExtraBold/PlusJakartaSans_800ExtraBold.ttf');
import { setFontsLoaded } from './utils/DesignSystem2026';
import { ThemeProvider } from "./utils/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";

// ---------------------------------------------------------------------------
// ONBOARDING
// ---------------------------------------------------------------------------
import BoasVindasScreen           from "./screens/BoasVindasScreen";
import WelcomeTourScreen          from "./screens/WelcomeTourScreenNeo";
import PerfilWizardScreen         from "./screens/Profiles/PerfilWizardScreen";
import NewHomeWizardScreen        from "./screens/NewHomeWizardScreenNeo";
import ChecklistWizardScreen     from './screens/Checklists/ChecklistWizardScreen';
import AddPerfilScreen            from './screens/Profiles/AddPerfilScreenNeo';
import QuemProtegerScreenNeo      from "./screens/Profiles/QuemProtegerScreenNeo";
import SecretBriefingScreen       from "./screens/SecretBriefingScreen";
import RadarVigilaroScreen        from './screens/Engajamento/RadarVigilaroScreen';
import RadarArticleScreen         from './screens/Engajamento/RadarArticleScreen';

// ---------------------------------------------------------------------------
// NAVEGAÇÃO PRINCIPAL
// ---------------------------------------------------------------------------
import MainTabNavigator from "./navigation/MainTabNavigator";

// ---------------------------------------------------------------------------
// CONTEÚDO PRINCIPAL
// ---------------------------------------------------------------------------
import TeoriaFogoScreen                  from './screens/Education/TeoriaFogoScreen';
import KitEmergenciaScreen               from './screens/Emergency/KitEmergenciaScreen';
import KitPrimeirosSocorrosScreen        from './screens/Emergency/KitPrimeirosSocorrosScreen';
import KitRemediosScreen                 from './screens/Emergency/KitRemediosScreen';
import SobreScreen                       from './screens/SobreScreen';
import ContatoScreen                     from './screens/ContatoScreen';
import TermsOfUseScreen                  from './screens/TermsOfUseScreen';
import PrivacyPolicyScreen               from './screens/PrivacyPolicyScreen';
import EmergenciaPetScreen               from './screens/Emergency/EmergenciaPetScreen';
import CustomSplashScreen                from './screens/CustomSplashScreen';
import SOSEmergencyModeScreen            from './screens/Emergency/SOSEmergencyModeScreenNeo';
import SOSCountdownScreen                from './screens/Emergency/SOSCountdownScreen';
import ModoPreventivoScreenNeo           from "./screens/ModoPreventivoScreenNeo";
import EmergenciaRapidaScreen            from './screens/Emergency/EmergenciaRapidaScreen';
import PrimeirosSocorrosScreen           from './screens/Emergency/PrimeirosSocorrosScreen';
import RecentActivityScreen              from './screens/RecentActivityScreen';

// ---------------------------------------------------------------------------
// SITUAÇÕES TEMPORÁRIAS
// ---------------------------------------------------------------------------
import SituacoesTemporariasScreen from "./screens/SituacoesTemporariasScreen";
import ModoSituacaoAtivaScreen    from "./screens/Emergency/ModoSituacaoAtivaScreen";
import EncerrarSituacaoScreen     from "./screens/Emergency/EncerrarSituacaoScreen";
import GenericCategoryScreen      from "./screens/GenericCategoryScreen";

// ---------------------------------------------------------------------------
// FLUXOS (REFORMA / VISITA)
// ---------------------------------------------------------------------------
import RenovationTypeScreen  from "./screens/RenovationFlow/RenovationTypeScreen";
import ChecklistReformaScreen from "./screens/Checklists/ChecklistReformaScreen";
import VisitTypeScreen       from "./screens/VisitFlow/VisitTypeScreen";
import VisitRiskFormScreen   from "./screens/VisitFlow/VisitRiskFormScreen"; // Caminho CORRIGIDO
import ChecklistVisitScreen  from "./screens/Checklists/ChecklistVisitScreen";
import AreasInternasScreen   from "./screens/Checklists/AreasInternasScreen";

// ---------------------------------------------------------------------------
// EDUCAÇÃO E RISCOS
// ---------------------------------------------------------------------------
import ConceitoDetailScreen        from "./screens/Education/ConceitoDetailScreen";
import AgeGroupDetailScreen        from "./screens/AgeGroupDetailScreen";
import IntroSafetyMenuScreen       from "./screens/IntroSafetyMenuScreen";
import PlanoIncendioScreen         from "./screens/Emergency/PlanoIncendioScreen";
import EducationEnvironmentsScreen from "./screens/Education/EducationEnvironmentsScreen";
import PlantasToxicasScreen        from "./screens/Education/PlantasToxicasScreen";
import AnimaisPeconhentosScreen    from "./screens/Education/AnimaisPeconhentosScreen";
import ProdutosPerigososScreen     from "./screens/Education/ProdutosPerigososScreen";
import RiscosFisicosScreen         from "./screens/Education/RiscosFisicosScreen";
import ChecklistDetailScreen       from "./screens/Checklists/ChecklistDetailScreen";
import RelatoriosScreen            from "./screens/Checklists/RelatoriosScreenNeo";
import AmbientesVistoriadosScreen  from "./screens/AmbientesVistoriadosScreen";
import JardinagemSeguraScreen      from "./screens/Education/JardinagemSeguraScreen";
import RiscosMenuScreen            from "./screens/Education/RiscosMenuScreen";
import MicroArticleScreen          from "./screens/Education/MicroArticleScreen";
import PremiumArticleScreen        from "./screens/Education/PremiumArticleScreen";
import MicroBlogScreen             from "./screens/Education/MicroBlogScreen";
import KitsHubScreen               from "./screens/Emergency/KitsHubScreen";
import GuiaKitsEmergenciaScreen    from "./screens/Education/GuiaKitsEmergenciaScreen";
import KitsMenuScreen              from "./screens/Checklists/KitsMenuScreen";
import OndeProtegerScreen          from "./screens/Checklists/OndeProtegerScreen";
import FerramentasTrabalhoScreen   from "./screens/Education/FerramentasTrabalhoScreen";

// Reviews de Segurança (NEW)
import UtensiliosReviewsScreen            from "./screens/Education/UtensiliosReviewsScreen";
import EletrodomesticosReviewsScreen      from "./screens/Education/EletrodomesticosReviewsScreen";
import DispositivosEletronicosReviewsScreen from "./screens/Education/DispositivosEletronicosReviewsScreen";
import SafetyReviewDetailScreen           from "./screens/Education/SafetyReviewDetailScreen";
import DispositivosProtecaoScreen         from "./screens/Education/DispositivosProtecaoScreen";
import EnvironmentGuideScreen      from "./screens/Education/EnvironmentGuideScreen";
import EnvironmentGuideNeoScreen   from "./screens/Education/EnvironmentGuideNeoScreen";
import FasesVidaMenuScreen         from "./screens/Education/FasesVidaMenuScreen";
import TravelSafetyGuideScreen     from "./screens/Education/TravelSafetyGuideScreen";
import TravelModeScreen            from "./screens/Travel/TravelModeScreen";
import LazerFeriasMenuScreen       from "./screens/Education/LazerFeriasMenuScreen";
import NeurodivergenceMenuScreen   from "./screens/Education/NeurodivergenceMenuScreen";
import VigilaroScanHubScreen       from "./screens/VigilaroScanHubScreen";
import CuidarProtegerHubScreen     from "./screens/CuidarProtegerHubScreen";
import EduContentDetailScreen      from './screens/EduContentDetailScreen';
import SegurancaLazerScreen        from "./screens/SegurancaLazerScreen";
import SegurancaFeriasScreen       from "./screens/SegurancaFeriasScreen";
import MobilidadeSeguraScreen      from "./screens/MobilidadeSeguraScreen";
import EpiDomesticoScreen          from "./screens/EPIDomesticoScreen";

// ---------------------------------------------------------------------------
// PERFIS E SEGURANÇA INSTITUCIONAL
// ---------------------------------------------------------------------------
import ProfileRiskSummaryScreen  from "./screens/Profiles/ProfileRiskSummaryScreen";
import HomeXRayScreen            from "./screens/Profiles/HomeXRayScreen";
import EscolaSeguraScreen        from "./screens/Safety/EscolaSeguraScreen";
import EscolaSeguraReportScreen  from "./screens/Safety/EscolaSeguraReportScreen";
import VistoriaAsiloScreen       from "./screens/Safety/VistoriaAsiloScreen";
import VistoriaAsiloReportScreen from "./screens/Safety/VistoriaAsiloReportScreen";
import SafetyActionPlanScreen    from "./screens/Checklists/SafetyActionPlanScreen";
import ContatosEmergenciaScreen  from "./screens/Emergency/ContatosEmergenciaScreen";

// ---------------------------------------------------------------------------
// PETS
// ---------------------------------------------------------------------------
import PetsMenuScreen        from "./screens/Pets/PetsMenuScreen";
import PetPregnancyScreen    from "./screens/Pets/PetPregnancyScreen";
import PetPregnancyGuideScreen from "./screens/Pets/PetPregnancyGuideScreen";
import PetWellnessScreen     from "./screens/Pets/PetWellnessScreen";
import PetFoodSafetyScreen   from "./screens/Pets/PetFoodSafetyScreen";
import AvesSegurasScreen     from "./screens/Pets/AvesSegurasScreen";

// ---------------------------------------------------------------------------
// VIAGEM
// ---------------------------------------------------------------------------
import InspecaoChegadaScreen from "./screens/Travel/InspecaoChegadaScreen";
import InspecaoPartidaScreen from "./screens/Travel/InspecaoPartidaScreen";
import InspecaoRetornoScreen from "./screens/Travel/InspecaoRetornoScreen";
import FazendoAsMalasScreen  from "./screens/Travel/FazendoAsMalasScreen";

// ---------------------------------------------------------------------------
// PREMIUM & TOOLS
// ---------------------------------------------------------------------------
import UpgradePremiumScreen        from './screens/UpgradePremiumScreen';
import ScannerScreen               from "./screens/ScannerScreen";
import HistoricoAuditoriaScreen    from './screens/HistoricoAuditoriaScreen';
import AccessibilitySettingsScreen from "./screens/AccessibilitySettingsScreen";
import MapaDeRiscosScreen           from "./screens/Tools/MapaDeRiscosScreen";
import AmbienteRiscoScreen          from "./screens/Tools/AmbienteRiscoScreen";
import ProdutoScannerScreen        from "./screens/ProdutoScannerScreen";
import InfoRotulosScreen           from "./screens/InfoRotulosScreen";
import InfoRotulosResultScreen     from "./screens/InfoRotulosResultScreen";
import MinhaSaudeScreen            from "./screens/Health/MinhaSaudeScreen";
import SaudePetScreen              from "./screens/Health/SaudePetScreen";
import MedicationRemindersScreen   from "./screens/Health/MedicationRemindersScreen";
import MedicationReminderFormScreen from "./screens/Health/MedicationReminderFormScreen";
import MedicationDoseHistoryScreen  from "./screens/Health/MedicationDoseHistoryScreen";

// ---------------------------------------------------------------------------
// COMPONENTS / SERVICES
// ---------------------------------------------------------------------------
import TermsModal             from "./components/TermsModal";
import MedicalDisclaimerModal from "./components/MedicalDisclaimerModal";
import OfflineModeModal       from "./components/OfflineModeModal";
import ErrorBoundary          from "./components/ErrorBoundary";
import AchievementToast       from "./components/AchievementToast";
import ProfileService         from "./services/ProfileService";
import GlobalFloatingFooter   from "./components/GlobalFloatingFooter";
import BatteryMonitor         from "./components/BatteryMonitor";
import NeoAlertHost           from "./components/NeoAlertHost";
import * as NavigationService from "./services/NavigationService";
import VitalCheckService      from "./services/VitalCheckService";
import AchievementService     from "./services/AchievementService";
import SubscriptionService    from "./services/SubscriptionService";
import PaisAtualService       from "./services/PaisAtualService";
import HandednessDetector     from "./services/HandednessDetector";
import LeftHandedSuggestionModal from "./components/LeftHandedSuggestionModal";
import { initSentry }          from "./services/SentryService";

// Telemetria de crash ligada o mais cedo possível — antes de qualquer render,
// para capturar falhas de inicialização. Sem DSN configurado, é no-op.
// Todo evento passa por scrubbing de PII (ver services/SentryService.js).
initSentry();

// ---------------------------------------------------------------------------
// CONSTANTES
// ---------------------------------------------------------------------------
const DISCLAIMER_ACCEPTED_KEY = '@medical_disclaimer_accepted';
const DISCLAIMER_VERSION = '1.0.0';
const BG_COLOR = '#F2F8F4';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady]                       = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showCustomSplash, setShowCustomSplash]           = useState(true);
  const [toastVisible, setToastVisible]                   = useState(false);
  const [toastData, setToastData]                         = useState(null);
  const [currentRouteName, setCurrentRouteName]           = useState(undefined);
  const [disclaimerAccepted, setDisclaimerAccepted]       = useState(false);
  const [navigatorReady, setNavigatorReady]               = useState(false);
  const [suggestionModalVisible, setSuggestionModalVisible] = useState(false);

  const splashHiddenRef        = useRef(false);
  const _onboardingIntervalRef = useRef(null);

  // Carregar fontes Plus Jakarta Sans
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  // Quando fontes carregarem, marcar no DS para NeoTypography usar
  useEffect(() => {
    if (fontsLoaded) {
      setFontsLoaded();
      if (__DEV__) console.log('[App] ✓ Plus Jakarta Sans carregada');
    }
  }, [fontsLoaded]);

  const hideSplash = useCallback(async () => {
    if (!splashHiddenRef.current) {
      splashHiddenRef.current = true;
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, []);

  // ---------------------------------------------------------------------------
  // BOOT
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function prepare() {
      try {
        // 0. Inicializa Detector de Mão Dominante
        HandednessDetector.init((mode) => {
          if (mode === 'left' && !cancelled) {
            setSuggestionModalVisible(true);
          }
        });

        // 0b. País onde a pessoa ESTÁ (números de emergência de quem viaja).
        // Sem await: não atrasa o boot; nunca pede permissão, só consulta.
        PaisAtualService.iniciar();

        // 1. SubscriptionService — determina features disponíveis
        await SubscriptionService.initialize();

        // 2. Polling de onboarding com ref — sem stale closure
        _onboardingIntervalRef.current = setInterval(async () => {
          const d = await Storage.getItem('@vigilaro_data');
          if (d) {
            try {
              const parsed = JSON.parse(d);
              if (parsed?.onboardingCompleto === true) {
                setHasCompletedOnboarding(true);
                if (_onboardingIntervalRef.current) {
                  clearInterval(_onboardingIntervalRef.current);
                  _onboardingIntervalRef.current = null;
                }
              }
            } catch (_) {}
          }
        }, 1000);

        // 3. AchievementService — listener de conquistas (F-07)
        AchievementService.setToastCallback((data) => {
          setToastData(data);
          setToastVisible(true);
        });

        // 4. Valida accepted E version — re-exibe modal se disclaimer for atualizado
        const disclaimerRaw = await AsyncStorage.getItem(DISCLAIMER_ACCEPTED_KEY);
        if (disclaimerRaw) {
          try {
            const parsed = JSON.parse(disclaimerRaw);
            if (parsed?.accepted === true && parsed?.version === DISCLAIMER_VERSION) {
              if (!cancelled) setDisclaimerAccepted(true);
            }
          } catch {
            // JSON inválido — trata como não aceito
          }
        }

        // 5. Valida onboarding + existência real de perfis
        const completed = await ProfileService.isOnboardingCompleto();
        if (completed && !cancelled) {
          try {
            const profiles = await ProfileService.getPerfis();
            if (profiles?.length > 0) {
              setHasCompletedOnboarding(true);
              if (__DEV__) {
                console.log('[App Boot] hasCompletedOnboarding = true');
              }
            }
          } catch {
            // Falha ao ler perfis — mantém onboarding como incompleto
          }
        }

        // 5b. Migração de schema V2 (campo comodosUsados em perfis).
        // Idempotente — roda só uma vez. Estratégia conservadora:
        // perfis legados recebem todos os cômodos do mapping atual,
        // preservando o comportamento de filtragem existente.
        try {
          const migrationResult = await ProfileService.migrateProfilesV2();
          if (__DEV__ && migrationResult.migrated > 0) {
            console.log(`[App Boot] Migração V2: ${migrationResult.migrated} perfil(is) atualizado(s).`);
          }
        } catch (migErr) {
          if (__DEV__) console.warn('[App Boot] Migração V2 falhou:', migErr?.message);
        }

        // 6. NavigationBar no Android (sem suporte no Android 15+ / edge-to-edge)
        if (Platform.OS === 'android') {
          try {
            const apiLevel = Platform.Version;
            if (typeof apiLevel === 'number' && apiLevel < 35) {
              await NavigationBar.setBackgroundColorAsync('#FFFFFF');
              await NavigationBar.setButtonStyleAsync('dark');
            }
          } catch {
            // edge-to-edge ativo — ignorar
          }
        }



      } catch (e) {
        if (__DEV__) {
          console.warn('[App Boot] Erro na inicialização:', e?.message);
        }
      } finally {
        if (!cancelled) {
          setAppIsReady(true);
          await hideSplash();
        }
      }
    }

    // Timeout de segurança — máx 1500ms (limite Apple)
    const timeoutId = setTimeout(async () => {
      if (!cancelled) {
        setAppIsReady(true);
        await hideSplash();
      }
    }, 1500);

    prepare().finally(() => clearTimeout(timeoutId));

    return () => {
      cancelled = true;
      // Cleanup do polling ao desmontar
      if (_onboardingIntervalRef.current) {
        clearInterval(_onboardingIntervalRef.current);
        _onboardingIntervalRef.current = null;
      }
    };
  }, [hideSplash]);

  // ---------------------------------------------------------------------------
  // PAÍS ATUAL — ao voltar ao app (quem desembarca abre o app já em outro
  // país; quem negou a localização nos Ajustes perde o país físico na hora).
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const sub = AppState.addEventListener('change', (estado) => {
      if (estado === 'active') PaisAtualService.atualizar();
    });
    return () => sub.remove();
  }, []);

  // ---------------------------------------------------------------------------
  // SERVIÇOS PESADOS — só após onboarding completo
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!appIsReady || !hasCompletedOnboarding) return;

    let mounted = true;

    const startServices = async () => {
      await VitalCheckService.init(({ reason }) => {
        if (!mounted) return;
        const current = NavigationService.getCurrentRoute();
        if (current !== 'SOSCountdown') {
          // Log gravado dentro do SOSCountdownScreen.
          NavigationService.navigate('SOSCountdown', { triggerReason: reason || 'VITAL_CHECK' });
        }
      });
    };

    startServices();

    return () => {
      mounted = false;
      VitalCheckService.logout();
    };
  }, [appIsReady, hasCompletedOnboarding]);

  // ---------------------------------------------------------------------------
  // TOQUE NAS NOTIFICAÇÕES PROATIVAS (D23, 17/10/2026)
  // As notificações proativas levavam `route` no payload, mas nada no app
  // tratava o toque: abriam o app na tela inicial. Só rotas conhecidas são
  // aceitas — o payload não decide para onde o app navega. O check-in de
  // bem-estar (VitalCheckService) tem tratamento próprio e não passa aqui.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!navigatorReady || !hasCompletedOnboarding) return;
    const ROTAS_PROATIVAS = new Set(['RadarVigilaro', 'Relatorios', 'ModoPreventivo']);
    const tratar = (response) => {
      const data = response?.notification?.request?.content?.data || {};
      if (data.proactive && ROTAS_PROATIVAS.has(data.route)) {
        NavigationService.navigate(data.route);
      }
    };
    let sub = null;
    try {
      const Notifications = require('expo-notifications');
      sub = Notifications.addNotificationResponseReceivedListener(tratar);
      // App aberto pelo toque, a frio: a resposta chega antes do listener.
      // Limpa depois de tratar: senão um toque antigo reabriria a tela em
      // toda montagem.
      Notifications.getLastNotificationResponseAsync()
        .then((r) => {
          if (!r) return;
          tratar(r);
          if (Notifications.clearLastNotificationResponseAsync) Notifications.clearLastNotificationResponseAsync().catch(() => {});
        })
        .catch(() => {});
    } catch (_) { /* notificações indisponíveis neste ambiente */ }
    return () => { if (sub) sub.remove(); };
  }, [navigatorReady, hasCompletedOnboarding]);

  // ---------------------------------------------------------------------------
  // GUARDS DE RENDERIZAÇÃO
  // ---------------------------------------------------------------------------
  if (!appIsReady) return null;

  if (showCustomSplash) {
    return <CustomSplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  // Gate de boot — modal exibido até disclaimer ser aceito
  if (!disclaimerAccepted) {
    return (
      <MedicalDisclaimerModal
        onAccept={() => setDisclaimerAccepted(true)}
      />
    );
  }

  // ---------------------------------------------------------------------------
  // JSX PRINCIPAL
  // ---------------------------------------------------------------------------
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <ProfileProvider>
        <AccessibilityProvider>
          <ThemeProvider>
            <SafeAreaProvider>

              {/* BatteryMonitor fora do NavigationContainer */}
              <BatteryMonitor />

              {/* Wrapper para observar toques globais para detecção de mão dominante */}
              <View 
                style={{ flex: 1 }}
                onStartShouldSetResponderCapture={(evt) => {
                  HandednessDetector.recordTouch(evt.nativeEvent.pageX);
                  return false; // Não bloqueia os toques para os filhos
                }}
              >

                <OfflineModeModal />
                <TermsModal />
                <LeftHandedSuggestionModal
                  visible={suggestionModalVisible}
                  onDismiss={() => setSuggestionModalVisible(false)}
                />
                <AchievementToast
                  visible={toastVisible}
                  data={toastData}
                  onHide={() => setToastVisible(false)}
                />

                {/* NeoAlertHost — substitui Alert.alert nativo do Android
                    por modal premium em todo o app. Drop-in via NeoAlert
                    de utils/NeoAlert.js. Precisa estar dentro do
                    ThemeProvider pra dark mode funcionar. */}
                <NeoAlertHost />

                <NavigationContainer
                  ref={NavigationService.navigationRef}
                  onReady={() => {
                    setNavigatorReady(true);
                    if (__DEV__) { console.log('[App] NavigationContainer pronto.'); }
                    setCurrentRouteName(
                      NavigationService.navigationRef.getCurrentRoute()?.name
                    );
                  }}
                  onStateChange={() => {
                    setCurrentRouteName(
                      NavigationService.navigationRef.getCurrentRoute()?.name
                    );
                  }}
                >
                  <Stack.Navigator
                    initialRouteName={hasCompletedOnboarding ? "MainTabs" : "BoasVindas"}
                    screenOptions={{
                      headerShown: false,
                      cardStyle: { backgroundColor: BG_COLOR },
                    }}
                  >
                    <Stack.Group>
                      {/* ---- Onboarding ---- */}
                      <Stack.Screen name="BoasVindas" component={BoasVindasScreen} />
                      <Stack.Screen name="WelcomeTour" component={WelcomeTourScreen} />
                      <Stack.Screen name="AccessibilitySettings" component={AccessibilitySettingsScreen} />
                      <Stack.Screen name="PerfilWizard" component={PerfilWizardScreen} />
                      <Stack.Screen name="Briefing" component={SecretBriefingScreen} />
                      <Stack.Screen name="NewHomeWizard" component={NewHomeWizardScreen} options={{ headerShown: false }} />

                      {/* ---- App Principal ---- */}
                      <Stack.Screen
                        name="MainTabs"
                        component={MainTabNavigator}
                        options={{ cardStyle: { backgroundColor: 'transparent' } }}
                      />

                      {/* ---- Modais e Apoio ---- */}
                      <Stack.Screen name="AddPerfil" component={AddPerfilScreen} />
                      <Stack.Screen name="QuemProteger" component={QuemProtegerScreenNeo} />
                      <Stack.Screen name="SecretBriefing" component={SecretBriefingScreen} />
                      <Stack.Screen name="UpgradePremium" component={UpgradePremiumScreen} options={{ presentation: 'modal' }} />

                      {/* ---- Conteúdo ---- */}
                      <Stack.Screen name="TeoriaFogo" component={TeoriaFogoScreen} />
                      <Stack.Screen name="KitEmergencia" component={KitEmergenciaScreen} />
                      <Stack.Screen name="KitPrimeirosSocorros" component={KitPrimeirosSocorrosScreen} />
                      <Stack.Screen name="KitRemedios" component={KitRemediosScreen} />
                      <Stack.Screen name="Sobre" component={SobreScreen} />
                      <Stack.Screen name="Contato" component={ContatoScreen} />
                      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
                      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                      <Stack.Screen name="EmergenciaPet" component={EmergenciaPetScreen} />
                      <Stack.Screen name="RenovationType" component={RenovationTypeScreen} />
                      <Stack.Screen name="ChecklistReforma" component={ChecklistReformaScreen} />
                      <Stack.Screen name="VisitType" component={VisitTypeScreen} />
                      <Stack.Screen name="VisitRiskForm" component={VisitRiskFormScreen} />
                      <Stack.Screen name="ChecklistVisit" component={ChecklistVisitScreen} />
                      <Stack.Screen name="JardinagemSegura" component={JardinagemSeguraScreen} />
                      <Stack.Screen name="Scanner" component={ScannerScreen} />
                      <Stack.Screen name="ProdutoScanner" component={ProdutoScannerScreen} />
                      <Stack.Screen name="PrimeirosSocorros" component={PrimeirosSocorrosScreen} />
                      <Stack.Screen name="EmergenciaRapida" component={EmergenciaRapidaScreen} options={{ headerShown: false, presentation: 'modal', animationEnabled: false }} />
                      <Stack.Screen name="GenericCategory" component={GenericCategoryScreen} />
                      <Stack.Screen name="ConceitoDetail" component={ConceitoDetailScreen} />
                      <Stack.Screen name="AgeGroupDetail" component={AgeGroupDetailScreen} />
                      <Stack.Screen name="PremiumArticle" component={PremiumArticleScreen} />
                      <Stack.Screen name="MicroBlog" component={MicroBlogScreen} />
                      <Stack.Screen name="MicroArticle" component={MicroArticleScreen} />
                      <Stack.Screen name="RecentActivity" component={RecentActivityScreen} options={{ headerShown: false }} />

                      {/* ---- Educação & Emergência ---- */}
                      <Stack.Screen name="PlanoIncendio" component={PlanoIncendioScreen} />
                      <Stack.Screen name="EducationEnvironments" component={EducationEnvironmentsScreen} />
                      <Stack.Screen name="NeurodivergenceMenu" component={NeurodivergenceMenuScreen} />
                      <Stack.Screen name="PlantasToxicas" component={PlantasToxicasScreen} />
                      <Stack.Screen name="AnimaisPeconhentos" component={AnimaisPeconhentosScreen} />
                      <Stack.Screen name="ProdutosPerigosos" component={ProdutosPerigososScreen} />
                      <Stack.Screen name="RiscosFisicos" component={RiscosFisicosScreen} />
                      <Stack.Screen name="IntroSafetyMenu" component={IntroSafetyMenuScreen} />

                      {/* ---- Reviews de Segurança ---- */}
                      <Stack.Screen name="UtensiliosReviews" component={UtensiliosReviewsScreen} />
                      <Stack.Screen name="EletrodomesticosReviews" component={EletrodomesticosReviewsScreen} />
                      <Stack.Screen name="DispositivosEletronicosReviews" component={DispositivosEletronicosReviewsScreen} />
                      <Stack.Screen name="SafetyReviewDetail" component={SafetyReviewDetailScreen} />
                      <Stack.Screen name="DispositivosProtecao" component={DispositivosProtecaoScreen} />
                      
                      {/* ---- Lazer & Mobilidade ---- */}
                      <Stack.Screen name="LazerFeriasMenu" component={LazerFeriasMenuScreen} />
                                            <Stack.Screen name="EduContentDetail" component={EduContentDetailScreen} />
                      <Stack.Screen name="SegurancaLazer" component={SegurancaLazerScreen} />
                      <Stack.Screen name="SegurancaFerias" component={SegurancaFeriasScreen} />
                      <Stack.Screen name="MobilidadeSegura" component={MobilidadeSeguraScreen} />

                      {/* ---- EPIs & Acessórios ---- */}
                      <Stack.Screen name="EpiDomestico" component={EpiDomesticoScreen} />

                      {/* ---- Situações Temporárias ---- */}
                      <Stack.Screen name="SituacoesTemporarias" component={SituacoesTemporariasScreen} />
                      <Stack.Screen name="ProfileRiskSummary" component={ProfileRiskSummaryScreen} />
                      <Stack.Screen name="HomeXRay" component={HomeXRayScreen} />
                      <Stack.Screen name="ModoSituacaoAtiva" component={ModoSituacaoAtivaScreen} />
                      <Stack.Screen name="ModoPreventivo" component={ModoPreventivoScreenNeo} />
                      <Stack.Screen name="SOSEmergencyMode" component={SOSEmergencyModeScreen} />
                      <Stack.Screen
                        name="SOSCountdown"
                        component={SOSCountdownScreen}
                        options={{ presentation: 'transparentModal' }}
                      />
                      <Stack.Screen name="EncerrarSituacao" component={EncerrarSituacaoScreen} />

                      {/* ---- IA & Ferramentas ---- */}
                      <Stack.Screen name="InfoRotulos" component={InfoRotulosScreen} />
                      <Stack.Screen name="InfoRotulosResult" component={InfoRotulosResultScreen} />
                      <Stack.Screen name="HistoricoAuditoria" component={HistoricoAuditoriaScreen} />
                      {/* "MapaDeCalor" até 2026-08-07. A tela deixou de derivar
                          risco de respostas de checklist e passou a analisar os
                          dados declarados — moradia e moradores (RiscoService).
                          AmbienteRisco é o detalhe de um ambiente; é ele o
                          destino do toque no mapa, não a vistoria. */}
                      <Stack.Screen name="MapaDeRiscos" component={MapaDeRiscosScreen} />
                      <Stack.Screen name="AmbienteRisco" component={AmbienteRiscoScreen} />

                      {/* ---- Hubs ---- */}
                      <Stack.Screen name="RiscosMenu" component={RiscosMenuScreen} />
                      <Stack.Screen name="KitsHub" component={KitsHubScreen} />
                      <Stack.Screen name="GuiaKitsEmergencia" component={GuiaKitsEmergenciaScreen} />
                      <Stack.Screen name="OndeProteger" component={OndeProtegerScreen} />
                      <Stack.Screen name="FerramentasTrabalho" component={FerramentasTrabalhoScreen} />
                      <Stack.Screen name="EnvironmentGuide" component={EnvironmentGuideScreen} />
                      <Stack.Screen name="EnvironmentGuideNeo" component={EnvironmentGuideNeoScreen} />
                      <Stack.Screen name="PetsMenu" component={PetsMenuScreen} />
                      <Stack.Screen name="FasesVidaMenu" component={FasesVidaMenuScreen} />
                      <Stack.Screen name="PetPregnancy" component={PetPregnancyScreen} />
                      <Stack.Screen name="PetPregnancyGuide" component={PetPregnancyGuideScreen} />
                      <Stack.Screen name="PetWellness" component={PetWellnessScreen} />
                      <Stack.Screen name="PetFoodSafety" component={PetFoodSafetyScreen} />
                      <Stack.Screen name="AvesSeguras" component={AvesSegurasScreen} />
                      <Stack.Screen name="TravelSafetyGuide" component={TravelSafetyGuideScreen} />
                      <Stack.Screen name="TravelModeScreen" component={TravelModeScreen} />
                      <Stack.Screen name="InspecaoChegada" component={InspecaoChegadaScreen} />
                      <Stack.Screen name="InspecaoPartida" component={InspecaoPartidaScreen} />
                      <Stack.Screen name="InspecaoRetorno" component={InspecaoRetornoScreen} />
                      <Stack.Screen name="FazendoAsMalas" component={FazendoAsMalasScreen} />
                      <Stack.Screen name="SafetyActionPlan" component={SafetyActionPlanScreen} />

                      {/* ---- Checklists & Saúde ---- */}
                      <Stack.Screen name="UrgentContacts" component={ContatosEmergenciaScreen} />
                      <Stack.Screen name="ChecklistDetail" component={ChecklistDetailScreen} />
                      <Stack.Screen name="Checklist" component={ChecklistWizardScreen} />
                      <Stack.Screen name="RadarVigilaro" component={RadarVigilaroScreen} />
                      <Stack.Screen name="RadarArticle" component={RadarArticleScreen} />
                      <Stack.Screen name="KitsMenu" component={KitsMenuScreen} />
                      <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
                      <Stack.Screen name="AmbientesVistoriados" component={AmbientesVistoriadosScreen} />
                      <Stack.Screen name="EscolaSegura" component={EscolaSeguraScreen} />
                      <Stack.Screen name="EscolaSeguraReport" component={EscolaSeguraReportScreen} />
                      <Stack.Screen name="AreasInternas" component={AreasInternasScreen} />
                      <Stack.Screen name="VistoriaAsilo" component={VistoriaAsiloScreen} />
                      <Stack.Screen name="VistoriaAsiloReport" component={VistoriaAsiloReportScreen} />
                      <Stack.Screen name="MinhaSaude" component={MinhaSaudeScreen} />
                      <Stack.Screen name="SaudePet" component={SaudePetScreen} />
                      <Stack.Screen name="MedicationReminders" component={MedicationRemindersScreen} />
                      <Stack.Screen name="MedicationReminderForm" component={MedicationReminderFormScreen} options={{ presentation: 'modal' }} />
                      <Stack.Screen name="MedicationDoseHistory" component={MedicationDoseHistoryScreen} />

                      {/* ---- Novos Hubs da Home ---- */}
                      <Stack.Screen name="VigilaroScanHub" component={VigilaroScanHubScreen} />
                      <Stack.Screen name="CuidarProtegerHub" component={CuidarProtegerHubScreen} />
                    </Stack.Group>
                  </Stack.Navigator>
                </NavigationContainer>

                {/* Footer só após navigator pronto */}
                {hasCompletedOnboarding && navigatorReady && (
                  <GlobalFloatingFooter
                    navigationRef={NavigationService.navigationRef}
                    currentRouteName={currentRouteName}
                  />
                )}

              </View>
            </SafeAreaProvider>
          </ThemeProvider>
        </AccessibilityProvider>
      </ProfileProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
