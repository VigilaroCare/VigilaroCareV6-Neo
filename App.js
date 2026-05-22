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
//  [FIX-C17] HomeCompletaScreen aponta para HomeScreenNeo
//  [FIX-C18] Copyright atualizado para 2026 (SobreScreen)
//  [FIX-C19] BriefingScreen (stub) removido — rota Briefing → SecretBriefingScreen
//  [FIX-C20] Arquivos legados movidos para _legacy/screens (ou já removidos)
//  [FEAT-RA01] Adicionado RecentActivityScreen

import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Platform, LogBox } from "react-native";

LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported',
  'setLayoutAnimationEnabledExperimental is currently a no-op',
]);

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import './i18n'; // Configuração do i18next
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import SafetyPermitScreen         from './screens/SafetyPermitScreen';
import FamilyCompositionScreen    from './screens/Profiles/FamilyCompositionScreen';
import MapeamentoRiscosScreen     from './screens/Checklists/MapeamentoRiscosScreen';
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
import MedicationsScreen                 from './screens/MedicationsScreen';
import SobreScreen                       from './screens/SobreScreen';
import TermsOfUseScreen                  from './screens/TermsOfUseScreen';
import PrivacyPolicyScreen               from './screens/PrivacyPolicyScreen';
import HomeCompletaScreen                from './screens/HomeScreenNeo';
import EmergenciaPetScreen               from './screens/Emergency/EmergenciaPetScreen';
import CustomSplashScreen                from './screens/CustomSplashScreen';
import KnowledgeHubScreen                from './screens/Education/KnowledgeHubScreen';
import EletrodomesticosScreen            from "./screens/EletrodomesticosScreen";
import PrimeirosSocorrosEmergenciaScreen from './screens/Emergency/PrimeirosSocorrosEmergenciaScreen';
import SOSEmergencyModeScreen            from './screens/Emergency/SOSEmergencyModeScreenNeo';
import SOSCountdownScreen                from './screens/Emergency/SOSCountdownScreen';
import ModoPreventivoScreenNeo           from "./screens/ModoPreventivoScreenNeo";
import EmergenciaRapidaScreen            from './screens/Emergency/EmergenciaRapidaScreen';
import HistoricoMelhorasScreen           from './screens/Checklists/HistoricoMelhorasScreen';
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
import AreasExternasScreen   from "./screens/Checklists/AreasExternasScreen";

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
import ChecklistReportScreen       from "./screens/Checklists/ChecklistReportScreen";
import RelatoriosScreen            from "./screens/Checklists/RelatoriosScreenNeo";
import JardinagemSeguraScreen      from "./screens/Education/JardinagemSeguraScreen";
import KitsMenuScreen              from "./screens/Checklists/KitsMenuScreen";
import MicroBlogScreen             from "./screens/Education/MicroBlogScreen";
import MicroArticleScreen          from "./screens/Education/MicroArticleScreen";
import RiscosMenuScreen            from "./screens/Education/RiscosMenuScreen";
import KitsHubScreen               from "./screens/Emergency/KitsHubScreen";
import GuiaKitsEmergenciaScreen    from "./screens/Education/GuiaKitsEmergenciaScreen";
import OndeProtegerScreen          from "./screens/Checklists/OndeProtegerScreen";
import UtensiliosDomesticosScreen  from "./screens/Education/UtensiliosDomesticosScreen";
import FerramentasTrabalhoScreen   from "./screens/Education/FerramentasTrabalhoScreen";

// Reviews de Segurança (NEW)
import UtensiliosReviewsScreen            from "./screens/Education/UtensiliosReviewsScreen";
import EletrodomesticosReviewsScreen      from "./screens/Education/EletrodomesticosReviewsScreen";
import DispositivosEletronicosReviewsScreen from "./screens/Education/DispositivosEletronicosReviewsScreen";
import SafetyReviewDetailScreen           from "./screens/Education/SafetyReviewDetailScreen";
import EnvironmentGuideScreen      from "./screens/Education/EnvironmentGuideScreen";
import EnvironmentGuideNeoScreen   from "./screens/Education/EnvironmentGuideNeoScreen";
import FasesVidaMenuScreen         from "./screens/Education/FasesVidaMenuScreen";
import TravelSafetyGuideScreen     from "./screens/Education/TravelSafetyGuideScreen";
import LazerFeriasMenuScreen       from "./screens/Education/LazerFeriasMenuScreen";
import SegurancaLazerScreen        from "./screens/SegurancaLazerScreen";
import SegurancaFeriasScreen       from "./screens/SegurancaFeriasScreen";
import MobilidadeSeguraScreen      from "./screens/MobilidadeSeguraScreen";
import AcessoriosSegurancaScreen   from "./screens/AcessoriosSegurancaScreen";
import EpiDomesticoScreen          from "./screens/EPIDomesticoScreen";

// ---------------------------------------------------------------------------
// SAÚDE
// ---------------------------------------------------------------------------
import MedicationSchedulerScreen from "./screens/MedicationSchedulerScreen";
import MinhaSaudeScreen          from "./screens/Health/MinhaSaudeScreen";
import AddEventScreen            from "./screens/Health/AddEventScreen";
import AddTreatmentScreen        from "./screens/Health/AddTreatmentScreen";
import AddAppointmentScreen      from "./screens/Health/AddAppointmentScreen";
import AddExamScreen             from "./screens/Health/AddExamScreen";
import AddProcedureScreen        from "./screens/Health/AddProcedureScreen";
import AddMedicalRecordScreen    from "./screens/Health/AddMedicalRecordScreen";
import ShareHealthRecordScreen   from "./screens/Health/ShareHealthRecordScreen";
import SaudePetScreen            from "./screens/Health/SaudePetScreen";

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
import KitViagemScreen       from "./screens/Travel/KitViagemScreen";
import InspecaoChegadaScreen from "./screens/Travel/InspecaoChegadaScreen";
import InspecaoPartidaScreen from "./screens/Travel/InspecaoPartidaScreen";
import InspecaoRetornoScreen from "./screens/Travel/InspecaoRetornoScreen";
import FazendoAsMalasScreen  from "./screens/Travel/FazendoAsMalasScreen";

// ---------------------------------------------------------------------------
// PREMIUM & TOOLS
// ---------------------------------------------------------------------------
import UpgradePremiumScreen        from './screens/UpgradePremiumScreen';
import ScannerScreen               from "./screens/ScannerScreen";
import AudioMonitorScreen          from './screens/AudioMonitorScreen';
import VisionMonitorScreen         from './screens/VisionMonitorScreen';
import HistoricoAuditoriaScreen    from './screens/HistoricoAuditoriaScreen';
import AssistentePrevencaoIAScreen from './screens/AssistentePrevencaoIAScreen';
import ConversationalAgentScreen   from './screens/ConversationalAgentScreen';
import ChatScreen                  from './screens/ChatScreen';
import AITextChatScreen            from './screens/AITextChatScreen';
import AccessibilitySettingsScreen from "./screens/AccessibilitySettingsScreen";
import FallSensitivityScreen      from "./screens/FallSensitivityScreen";
import FerramentasIAScreenNeo      from "./screens/Tools/FerramentasIAScreenNeo";
import DataHealthScreen             from "./screens/Tools/DataHealthScreen";
import MapaDeCalorScreen            from "./screens/Tools/MapaDeCalorScreen";
import ProdutoScannerScreen        from "./screens/ProdutoScannerScreen";
import InfoRotulosScreen           from "./screens/InfoRotulosScreen";
import InfoRotulosResultScreen     from "./screens/InfoRotulosResultScreen";

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
import FallDetectionService   from "./services/FallDetectionService";
import VitalCheckService      from "./services/VitalCheckService";
import AchievementService     from "./services/AchievementService";
import SubscriptionService    from "./services/SubscriptionService";
import HandednessDetector     from "./services/HandednessDetector";
import LeftHandedSuggestionModal from "./components/LeftHandedSuggestionModal";

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

        // 1. SubscriptionService — determina features disponíveis
        await SubscriptionService.initialize();

        // 2. Polling de onboarding com ref — sem stale closure
        _onboardingIntervalRef.current = setInterval(async () => {
          const d = await AsyncStorage.getItem('@vigilaro_data');
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
  // SERVIÇOS PESADOS — só após onboarding completo
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!appIsReady || !hasCompletedOnboarding) return;

    let mounted = true;

    const startServices = async () => {
      // Carrega preset e on/off salvos antes de iniciar
      await FallDetectionService.loadPersistedConfig();
      await FallDetectionService.start(({ reason }) => {
        if (!mounted) return;
        const current = NavigationService.getCurrentRoute();
        if (current !== 'SOSCountdown') {
          // O log de "Queda Detectada / SOS enviado" é gravado pelo próprio
          // SOSCountdownScreen quando o SMS é disparado — não aqui, para
          // evitar gravar evento quando o usuário cancela antes do envio.
          NavigationService.navigate('SOSCountdown', { triggerReason: reason || 'FALL' });
        }
      });

      await VitalCheckService.init(({ reason }) => {
        if (!mounted) return;
        const current = NavigationService.getCurrentRoute();
        if (current !== 'SOSCountdown') {
          // Idem — log gravado dentro do SOSCountdownScreen.
          NavigationService.navigate('SOSCountdown', { triggerReason: reason || 'VITAL_CHECK' });
        }
      });
    };

    startServices();

    return () => {
      mounted = false;
      FallDetectionService.stop();
      VitalCheckService.logout();
    };
  }, [appIsReady, hasCompletedOnboarding]);

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
                      <Stack.Screen name="FallSensitivity" component={FallSensitivityScreen} />
                      <Stack.Screen
                        name="FamilyComposition"
                        component={FamilyCompositionScreen}
                        options={{ animationEnabled: false }}
                      />
                      <Stack.Screen name="MapeamentoRiscos" component={MapeamentoRiscosScreen} />
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
                      <Stack.Screen name="SafetyPermit" component={SafetyPermitScreen} options={{ presentation: 'modal', headerShown: false }} />
                      <Stack.Screen name="AddPerfil" component={AddPerfilScreen} />
                      <Stack.Screen name="QuemProteger" component={QuemProtegerScreenNeo} />
                      <Stack.Screen name="SecretBriefing" component={SecretBriefingScreen} />
                      <Stack.Screen name="UpgradePremium" component={UpgradePremiumScreen} options={{ presentation: 'modal' }} />

                      {/* ---- Conteúdo ---- */}
                      <Stack.Screen name="TeoriaFogo" component={TeoriaFogoScreen} />
                      <Stack.Screen name="KitEmergencia" component={KitEmergenciaScreen} />
                      <Stack.Screen name="KitPrimeirosSocorros" component={KitPrimeirosSocorrosScreen} />
                      <Stack.Screen name="KitRemedios" component={KitRemediosScreen} />
                      <Stack.Screen name="Medications" component={MedicationsScreen} />
                      <Stack.Screen name="Sobre" component={SobreScreen} />
                      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
                      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
                      <Stack.Screen name="HomeCompleta" component={HomeCompletaScreen} />
                      <Stack.Screen name="EmergenciaPet" component={EmergenciaPetScreen} />
                      <Stack.Screen name="KnowledgeHub" component={KnowledgeHubScreen} />
                      <Stack.Screen name="Eletrodomesticos" component={EletrodomesticosScreen} />
                      <Stack.Screen name="RenovationType" component={RenovationTypeScreen} />
                      <Stack.Screen name="ChecklistReforma" component={ChecklistReformaScreen} />
                      <Stack.Screen name="VisitType" component={VisitTypeScreen} />
                      <Stack.Screen name="VisitRiskForm" component={VisitRiskFormScreen} />
                      <Stack.Screen name="ChecklistVisit" component={ChecklistVisitScreen} />
                      <Stack.Screen name="JardinagemSegura" component={JardinagemSeguraScreen} />
                      <Stack.Screen name="Scanner" component={ScannerScreen} />
                      <Stack.Screen name="ProdutoScanner" component={ProdutoScannerScreen} />
                      <Stack.Screen name="PrimeirosSocorrosEmergencia" component={PrimeirosSocorrosEmergenciaScreen} />
                      <Stack.Screen name="PrimeirosSocorros" component={PrimeirosSocorrosScreen} />
                      <Stack.Screen name="EmergenciaRapida" component={EmergenciaRapidaScreen} options={{ headerShown: false, presentation: 'modal', animationEnabled: false }} />
                      <Stack.Screen name="GenericCategory" component={GenericCategoryScreen} />
                      <Stack.Screen name="ConceitoDetail" component={ConceitoDetailScreen} />
                      <Stack.Screen name="AgeGroupDetail" component={AgeGroupDetailScreen} />
                      <Stack.Screen name="MicroBlog" component={MicroBlogScreen} />
                      <Stack.Screen name="MicroArticle" component={MicroArticleScreen} />
                      <Stack.Screen name="RecentActivity" component={RecentActivityScreen} options={{ headerShown: false }} />

                      {/* ---- Educação & Emergência ---- */}
                      <Stack.Screen name="PlanoIncendio" component={PlanoIncendioScreen} />
                      <Stack.Screen name="EducationEnvironments" component={EducationEnvironmentsScreen} />
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
                      
                      {/* ---- Lazer & Mobilidade ---- */}
                      <Stack.Screen name="LazerFeriasMenu" component={LazerFeriasMenuScreen} />
                      <Stack.Screen name="SegurancaLazer" component={SegurancaLazerScreen} />
                      <Stack.Screen name="SegurancaFerias" component={SegurancaFeriasScreen} />
                      <Stack.Screen name="MobilidadeSegura" component={MobilidadeSeguraScreen} />

                      {/* ---- EPIs & Acessórios ---- */}
                      <Stack.Screen name="AcessoriosSeguranca" component={AcessoriosSegurancaScreen} />
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
                      <Stack.Screen name="FerramentasIA" component={FerramentasIAScreenNeo} />
                      <Stack.Screen name="InfoRotulos" component={InfoRotulosScreen} />
                      <Stack.Screen name="InfoRotulosResult" component={InfoRotulosResultScreen} />
                      <Stack.Screen name="AudioMonitor" component={AudioMonitorScreen} />
                      <Stack.Screen name="VisionMonitor" component={VisionMonitorScreen} />
                      <Stack.Screen name="HistoricoAuditoria" component={HistoricoAuditoriaScreen} />
                      <Stack.Screen name="AssistentePrevencaoIA" component={AssistentePrevencaoIAScreen} />
                      <Stack.Screen name="ConversationalAgent" component={ConversationalAgentScreen} options={{ presentation: 'modal', headerShown: false }} />
                      <Stack.Screen name="Chat" component={ChatScreen} />
                      <Stack.Screen name="AITextChat" component={AITextChatScreen} options={{ headerShown: false }} />
                      <Stack.Screen name="DataHealth" component={DataHealthScreen} />
                      <Stack.Screen name="MapaDeCalor" component={MapaDeCalorScreen} />

                      {/* ---- Hubs ---- */}
                      <Stack.Screen name="RiscosMenu" component={RiscosMenuScreen} />
                      <Stack.Screen name="KitsHub" component={KitsHubScreen} />
                      <Stack.Screen name="GuiaKitsEmergencia" component={GuiaKitsEmergenciaScreen} />
                      <Stack.Screen name="OndeProteger" component={OndeProtegerScreen} />
                      <Stack.Screen name="UtensiliosDomesticos" component={UtensiliosDomesticosScreen} />
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
                      <Stack.Screen name="KitViagem" component={KitViagemScreen} />
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
                      <Stack.Screen name="ChecklistReport" component={ChecklistReportScreen} />
                      <Stack.Screen name="MedicationScheduler" component={MedicationSchedulerScreen} />
                      <Stack.Screen name="MinhaSaude" component={MinhaSaudeScreen} />
                      <Stack.Screen name="AddEvent" component={AddEventScreen} />
                      <Stack.Screen name="AddTreatment" component={AddTreatmentScreen} />
                      <Stack.Screen name="AddAppointment" component={AddAppointmentScreen} />
                      <Stack.Screen name="AddExam" component={AddExamScreen} />
                      <Stack.Screen name="AddProcedure" component={AddProcedureScreen} />
                      <Stack.Screen name="AddMedicalRecord" component={AddMedicalRecordScreen} />
                      <Stack.Screen name="ShareHealthRecord" component={ShareHealthRecordScreen} />
                      <Stack.Screen name="SaudePet" component={SaudePetScreen} />
                      <Stack.Screen name="EscolaSegura" component={EscolaSeguraScreen} />
                      <Stack.Screen name="EscolaSeguraReport" component={EscolaSeguraReportScreen} />
                      <Stack.Screen name="HistoricoMelhoras" component={HistoricoMelhorasScreen} />
                      <Stack.Screen name="AreasInternas" component={AreasInternasScreen} />
                      <Stack.Screen name="AreasExternas" component={AreasExternasScreen} />
                      <Stack.Screen name="VistoriaAsilo" component={VistoriaAsiloScreen} />
                      <Stack.Screen name="VistoriaAsiloReport" component={VistoriaAsiloReportScreen} />
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
