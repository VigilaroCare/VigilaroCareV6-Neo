import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Easing,
  ScrollView,
  Vibration,
  AccessibilityInfo,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { useAccessibility } from '../context/AccessibilityContext';
import { CameraView, useCameraPermissions } from 'expo-camera';
import NeoIcon from '../components/NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';
import { VisionService } from '../services/VisionService';
import GamificationService from '../services/GamificationService';
import { buscarProduto } from '../data/produtos_scanner';
import { resolveBarcode } from '../services/InfoRotulosSubstanceService';
import { Config } from '../utils/Config';
import { useTranslation } from 'react-i18next';
import AppBackground from '../components/AppBackground';
import NeoAlert from '../utils/NeoAlert';


const { width, height } = Dimensions.get('window');

// INTRO COMPONENT
const ScannerIntro = ({ onSelectMode, onClose }) => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  return (
  <AppBackground>
    <View style={styles.introContainer}>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <View style={styles.introHeader}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel={t('common.close', 'Fechar')}
        >
          <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[800]} />
        </TouchableOpacity>
        <View style={styles.iconBadge}>
          <NeoIcon name="Scan" size={48} color={Neo.colors.primary[600]} />
        </View>
        <Text style={styles.introTitle}>{t('scanner.introTitle')}</Text>
        <Text style={styles.introSubtitle}>
          {t('scanner.introSub')}
        </Text>
      </View>

    <ScrollView contentContainerStyle={styles.introContent}>
      <TouchableOpacity
        style={styles.modeCard}
        activeOpacity={0.9}
        onPress={() => onSelectMode('environment')}
        accessibilityRole="button"
        accessibilityLabel={`${t('scanner.modeEnv')} — ${t('scanner.modeEnvDesc')}`}
      >
        <View style={[styles.modeIcon, { backgroundColor: 'rgba(33, 150, 243, 0.12)' }]}>
          <NeoIcon name="Home2" size={32} color={colors.secondary[500]} variant="Bold" />
        </View>
        <View style={styles.modeInfo}>
          <Text style={styles.modeTitle}>{t('scanner.modeEnv')}</Text>
          <Text style={styles.modeDesc}>{t('scanner.modeEnvDesc')}</Text>
        </View>
        <NeoIcon name="ArrowRight2" size={24} color={Neo.colors.neutral[300]} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modeCard}
        activeOpacity={0.9}
        onPress={() => onSelectMode('label_scan')}
        accessibilityRole="button"
        accessibilityLabel={`${t('scanner.modeLabel')} — ${t('scanner.modeLabelDesc')}`}
      >
        <View style={[styles.modeIcon, { backgroundColor: 'rgba(156, 39, 176, 0.12)' }]}>
          <NeoIcon name="DocumentText" size={32} color={colors.secondary[500]} variant="Bold" />
        </View>
        <View style={styles.modeInfo}>
          <Text style={styles.modeTitle}>{t('scanner.modeLabel')}</Text>
          <Text style={styles.modeDesc}>{t('scanner.modeLabelDesc')}</Text>
        </View>
        <NeoIcon name="Camera" size={24} color={Neo.colors.neutral[300]} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modeCard}
        activeOpacity={0.9}
        onPress={() => onSelectMode('barcode_scan')}
        accessibilityRole="button"
        accessibilityLabel={`${t('scanner.modeBarcode')} — ${t('scanner.modeBarcodeDesc')}`}
      >
        <View style={[styles.modeIcon, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}>
          <NeoIcon name="Barcode" size={32} color={colors.primary[500]} variant="Bold" />
        </View>
        <View style={styles.modeInfo}>
          <Text style={styles.modeTitle}>{t('scanner.modeBarcode')}</Text>
          <Text style={styles.modeDesc}>{t('scanner.modeBarcodeDesc')}</Text>
        </View>
        <NeoIcon name="ArrowRight2" size={24} color={Neo.colors.neutral[300]} />
      </TouchableOpacity>

      {/* Info Box */}
      <View style={[styles.infoBox, { backgroundColor: colors.neutral[100] }]}>
        <NeoIcon name="LampOn" size={20} color={colors.feedback.warning} />
        <Text style={styles.infoText}>
          {t('scanner.hint')}
        </Text>
      </View>
    </ScrollView>
    </View>
  </AppBackground>
)};

export default function ScannerScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [facing, setFacing] = useState('back');
  const { t } = useTranslation();
  const { reduceMotion } = useAccessibility();
  const colors = useThemeColors();

  // Hook at the top level to avoid rules of hooks issues
  const isFocused = useIsFocused();

  // Mode Selection State
  // If passed via route (e.g. shortcut), use it. Otherwise null to show intro.
  const [currentMode, setCurrentMode] = useState(route.params?.mode || null);

  useEffect(() => {
    if (route.params?.mode) {
      setCurrentMode(route.params.mode);
      // Reset any existing analysis when mode changes via navigation
      setPhoto(null);
      setAnalysisResult(null);
      setIsAnalyzing(false);
    }
  }, [route.params?.mode]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isAnalyzing && !reduceMotion) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isAnalyzing, reduceMotion]);

  useEffect(() => {
    if (currentMode && permission?.granted && !reduceMotion) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, { toValue: 1, duration: 2000, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: true })
        ])
      ).start();
    } else {
      scanLineAnim.setValue(0);
    }
  }, [permission, currentMode, reduceMotion]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        // Captura com qualidade baixa (0.3) — apenas para preview na tela
        // A compressão real para IA é feita via ImageManipulator
        const photoData = await cameraRef.takePictureAsync({
          quality: 0.3,
          base64: false,  // Não gera base64 aqui (economia de memória)
          skipProcessing: true, // Pula pós-processamento do device (mais rápido)
        });
        setPhoto(photoData.uri);
        setIsAnalyzing(true);
        analyzePhoto(photoData.uri);
      } catch (error) {
        NeoAlert.alert("Erro", "Não foi possível capturar a foto.");
        console.error(error);
      }
    }
  };

  const analyzePhoto = async (imageUri) => {
    const startTime = Date.now();
    AccessibilityInfo.announceForAccessibility(t('scanner.analyzing', 'Analisando imagem…'));
    try {
      // ① Verificar conectividade com proxy antes de comprimir
      if (__DEV__) console.log('[Scanner] Verificando proxy...');
      try {
        const proxyCheck = await Promise.race([
          fetch(Config.VIGILARO_PROXY_URL, { method: 'GET' }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Proxy timeout')), 4000)),
        ]);
        if (__DEV__) console.log('[Scanner] ✅ Proxy online:', proxyCheck.status);
      } catch (proxyErr) {
        if (__DEV__) console.error('[Scanner] ❌ Proxy offline:', proxyErr.message);
        NeoAlert.alert(
          '⚠️ Servidor indisponível',
          'O servidor de análise (proxy) não está acessível.\n\n' +
          'Verifique se o backend proxy está rodando:\n' +
          `📍 ${Config.VIGILARO_PROXY_URL}\n\n` +
          'Execute: node server.js na pasta backend-proxy',
        );
        setIsAnalyzing(false);
        return;
      }

      // ② Comprimir imagem (1024px, JPEG 0.6)
      if (__DEV__) console.log('[Scanner] Comprimindo imagem...');
      const ImageManipulator = require('expo-image-manipulator');
      const compressed = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1024 } }],
        {
          compress: 0.6,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      const sizeKB = Math.round((compressed.base64?.length || 0) * 0.75 / 1024);
      if (__DEV__) {
        console.log(`[Scanner] 📷 Imagem pronta: ${compressed.width}x${compressed.height} | ~${sizeKB}KB | ${Date.now() - startTime}ms`);
      }

      // ③ Enviar para IA (Passamos o currentMode para a Vision AI injetar o contexto correto)
      if (__DEV__) console.log('[Scanner] Enviando para GPT-4o-mini...');
      const base64 = compressed.base64;

      const result = await VisionService.analyzeImage(base64, currentMode);

      if (__DEV__) console.log(`[Scanner] ✅ Análise concluída em ${Date.now() - startTime}ms`);

      setAnalysisResult(result);
      AccessibilityInfo.announceForAccessibility(t('scanner.analysisComplete', { count: result?.analises?.length || 0, defaultValue: `Análise concluída. ${result?.analises?.length || 0} riscos detectados.` }));
      await GamificationService.addPoints('USE_SCANNER');
    } catch (error) {
      const elapsed = Date.now() - startTime;
      if (__DEV__) console.error(`[Scanner] ❌ Análise falhou (${elapsed}ms):`, error.name, error.message);

      // Mensagem específica por tipo de erro
      if (error.name === 'AbortError') {
        NeoAlert.alert(
          '⏱️ Tempo esgotado',
          'A análise demorou mais que o esperado.\n\nSugestões:\n• Tente com melhor conexão Wi-Fi\n• Fotografe em boa iluminação\n• Foque apenas no rótulo/ingredientes',
        );
      } else if (error.message?.includes('Network') || error.message?.includes('fetch')) {
        NeoAlert.alert('📡 Sem conexão', 'Verifique sua conexão com a internet e tente novamente.');
      } else {
        NeoAlert.alert('Erro', 'Falha na análise. Tente novamente.');
      }
      AccessibilityInfo.announceForAccessibility(t('scanner.analysisFailed', 'Falha na análise. Tente novamente.'));
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setPhoto(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    // Optional: Return to Intro? No, simpler to just scan again in same mode.
    // If user wants to change mode, they back out or maybe we add a 'Change Mode' button.
  };

  const changeMode = () => {
    resetScanner();
    setCurrentMode(null);
  }

   const handleBarcodeScanned = async ({ type, data }) => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    // Feedback tátil
    Vibration.vibrate(50);

    if (__DEV__) console.log(`[Scanner] Barcode lido: ${data} (tipo: ${type})`);
    AccessibilityInfo.announceForAccessibility(t('scanner.lookupBarcode', 'Buscando dados do produto…'));

    // Filtrar URLs (QR codes com links) — não são códigos de produto
    if (data.startsWith('http') || data.startsWith('www') || data.includes('://')) {
      if (__DEV__) console.log('[Scanner] ⏭️ URL detectada, mudando para foto do rótulo');
      setCurrentMode('label_scan');
      AccessibilityInfo.announceForAccessibility(t('scanner.barcodeUrlDetected', 'Código lido é um link. Câmera alternada para foto do rótulo.'));
      NeoAlert.alert('📷 Fotografe o rótulo', 'O código lido é um link, não um código de barras.\nA câmera foi preparada para foto do rótulo.');
      setTimeout(() => setIsAnalyzing(false), 500);
      return;
    }

    try {
      // Tenta resolver o código de barras (Local → OFF → OBF → OPF → UPCitemdb)
      const result = await resolveBarcode(data);
      
      if (result && result.found && result.product) {
          if (__DEV__) console.log(`[Scanner] ✅ Produto encontrado via: ${result.source}`, result.product.nome);
          AccessibilityInfo.announceForAccessibility(t('scanner.barcodeSuccess', 'Produto encontrado. Redirecionando.'));

          navigation.navigate('InfoRotulosResult', {
            product: result.product,
            source: result.source,
            searchQuery: data,
            ingredientes_texto: result.product.ingredientes_texto || '',
            marca: result.product.marca || '',
          });
      } else {
          // Produto NÃO encontrado — switch automático para foto do rótulo
          if (__DEV__) console.log('[Scanner] ❌ Não encontrado → auto-switch para foto do rótulo');

          // Feedback tátil duplo para indicar mudança de modo
          Vibration.vibrate([0, 50, 100, 50]);

          // Muda direto para modo label_scan — fluxo automático
          setCurrentMode('label_scan');
          AccessibilityInfo.announceForAccessibility(t('scanner.barcodeNotFound', 'Produto não cadastrado. Câmera alternada para foto do rótulo.'));

          // Alerta breve informativo — atribui causa ao fabricante, não ao app
          NeoAlert.alert(
            '📷 Fotografe o rótulo',
            `O fabricante deste produto ainda não o cadastrou nas bases de dados públicas mundiais (código ${data}).\n\nMas não se preocupe — fotografe o rótulo e nossa IA analisará os ingredientes e riscos em segundos.`,
            [{ text: 'Entendi' }],
          );
      }
    } catch (e) {
      console.warn('Erro ao ler código de barras:', e);
      NeoAlert.alert('Erro', 'Falha ao buscar dados do produto. Tente novamente.');
    } finally {
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };


  // 1. Permissions Check
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.neutral.white, fontSize: 18, marginBottom: 20 }}>{t('scanner.permReq')}</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>{t('scanner.grant')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Intro Screen (if no mode selected)
  if (!currentMode) {
    return <ScannerIntro onSelectMode={setCurrentMode} onClose={() => navigation.goBack()} />;
  }

  // 3. Main Scanner UI (Camera or Result)
  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      {isFocused && (
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{ barcodeTypes: ["qr", "ean13", "ean8", "upc_a", "upc_e"] }}
          onBarcodeScanned={isAnalyzing || currentMode !== 'barcode_scan' ? undefined : handleBarcodeScanned}
          ref={(ref) => setCameraRef(ref)}
        />
      )}

      {/* Overlay */}
      <View style={styles.overlayContainer}>
        {/* Dark Frame */}
        <View style={styles.darkOverlay} />
        <View style={styles.middleOverlay}>
          <View style={styles.darkOverlaySide} />
          <View style={styles.scanWindow}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <Animated.View style={[styles.scanLine, {
              transform: [{ translateY: scanLineAnim.interpolate({ inputRange: [0, 1], outputRange: [0, width * 0.7] }) }]
            }]} />
          </View>
          <View style={styles.darkOverlaySide} />
        </View>
        <View style={styles.darkOverlayBottom}>
          <Text style={styles.instructionText}>
            {currentMode === 'label_scan' ? t('scanner.guideLabel') : 
             currentMode === 'barcode_scan' ? t('scanner.guideBarcode') : t('scanner.guideEnv')}
          </Text>
          <View style={styles.controls}>
            {currentMode !== 'barcode_scan' && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
                accessibilityRole="button"
                accessibilityLabel={t('scanner.capturePhoto', 'Tirar foto')}
              >
                <View style={styles.captureInner}>
                  <NeoIcon name="Camera" size={32} color={Neo.colors.primary[600]} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Header */}
      <View style={[styles.floatingHeader, { top: insets.top }]}>
        <TouchableOpacity
          onPress={changeMode}
          style={styles.glassButton}
          accessibilityRole="button"
          accessibilityLabel={t('common.back', 'Voltar')}
        >
          <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.glassBadge}>
          <Text style={styles.glassBadgeText}>
            {currentMode === 'label_scan' ? t('scanner.modeLabel') : 
             currentMode === 'barcode_scan' ? t('scanner.modeBarcode') : t('scanner.modeEnv')}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          style={styles.glassButton}
          accessibilityRole="button"
          accessibilityLabel={t('scanner.flipCamera', 'Alternar câmera')}
        >
          <NeoIcon name="Camera" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAnalysis = () => (
    <View style={styles.analysisContainer}>
      <Image source={{ uri: photo }} style={styles.previewImage} />

      <View style={[styles.floatingHeader, { top: insets.top }]}>
        <TouchableOpacity
          onPress={resetScanner}
          style={styles.glassButton}
          accessibilityRole="button"
          accessibilityLabel={t('common.close', 'Fechar')}
        >
          <NeoIcon name="CloseSquare" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {isAnalyzing && (
        <View style={styles.loadingOverlay}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <View style={styles.pulseCircle}>
              <NeoIcon name="Eye" size={48} color="#FFF" />
            </View>
          </Animated.View>
          <Text style={styles.analyzingText}>{t('scanner.analyzing')}</Text>
        </View>
      )}

      {!isAnalyzing && analysisResult && analysisResult.analises && (
        <ScrollView style={styles.resultSheet} contentContainerStyle={{ paddingBottom: 190 }}>
          <View style={styles.dragIndicator} />
          
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.neutral[900], marginBottom: 16, marginTop: 10, alignSelf: 'center' }}>
            {analysisResult.analises.length} risco(s) detectado(s)
          </Text>

          {analysisResult.analises.map((item, index) => (
            <View key={index} style={{ marginBottom: 24, backgroundColor: colors.neutral[100], borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.neutral[300] }}>
              {/* Header */}
              <View style={[styles.resultHeader, { marginBottom: 12 }]}>
                <View style={[styles.severityBadge, { backgroundColor: item.cor || colors.neutral[500] }]}>
                  <Text style={styles.severityText}>{item.risco || 'Info'}</Text>
                </View>
              </View>

              <Text style={[styles.resultTitle, { marginTop: 0 }]}>{item.titulo}</Text>
              <Text style={styles.resultDescription}>{item.descricao}</Text>

              {/* Actions */}
              <View style={[styles.actionBox, { marginTop: 12 }]}>
                <View style={styles.actionHeader}>
                  <NeoIcon name="LampOn" size={24} color={Neo.colors.primary[600]} />
                  <Text style={styles.actionTitle}>{t('headersFirst.recomendaEs', 'Recomendações')}</Text>
                </View>
                <Text style={styles.actionText}>{item.acao || item.recomendacao}</Text>
              </View>

              {/* Emergency Actions Section */}
              {item.emergencia && (
                <View style={[styles.actionBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeftColor: colors.feedback.error, marginTop: 12 }]}>
                  <View style={styles.actionHeader}>
                    <NeoIcon name="Health" size={24} color={colors.feedback.error} />
                    <Text style={[styles.actionTitle, { color: colors.feedback.error }]}>{t('headersFirst.emCasoDeExposiO', 'Em Caso de Exposição')}</Text>
                  </View>
                  <Text style={[styles.actionText, { color: colors.feedback.error, fontWeight: 'bold' }]}>{item.emergencia}</Text>
                  <Text style={{ marginTop: 8, fontSize: 13, color: colors.feedback.error, fontStyle: 'italic' }}>
                    {t('headersFirst.fonteOrientaEsDeSeguranAEProtocolosDeEme', 'Fonte: Orientações de segurança e protocolos de emergência.')}
                  </Text>
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity style={[styles.primaryButton, { marginTop: 16 }]} onPress={resetScanner}>
            <NeoIcon name="Scan" size={20} color="#FFF" />
            <Text style={styles.primaryButtonText}>{t('scanner.newScan')}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {photo ? renderAnalysis() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },

  // INTRO STYLES
  introContainer: { flex: 1, backgroundColor: 'transparent' },
  introHeader: {
    padding: 24, paddingTop: 60, backgroundColor: 'transparent',
    alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[100]
  },
  closeButton: { position: 'absolute', top: 50, left: 20, padding: 8 },
  iconBadge: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: Neo.colors.primary[50],
    justifyContent: 'center', alignItems: 'center', marginBottom: 16
  },
  introTitle: { fontSize: 28, fontWeight: 'bold', color: Neo.colors.neutral[900], marginBottom: 8 },
  introSubtitle: { fontSize: 16, color: Neo.colors.neutral[600], textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 },
  introContent: { padding: 24 },
  modeCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Neo.colors.surface, padding: 16, borderRadius: 20,
    marginBottom: 16, borderWidth: 1, borderColor: Neo.colors.neutral[100],
    ...Neo.shadows.sm
  },
  modeIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  modeInfo: { flex: 1 },
  modeTitle: { fontSize: 18, fontWeight: 'bold', color: Neo.colors.neutral[800], marginBottom: 4 },
  modeDesc: { fontSize: 14, color: Neo.colors.neutral[600], lineHeight: 20 },
  infoBox: {
    flexDirection: 'row', padding: 16,
    borderRadius: 12, alignItems: 'center', gap: 12, marginTop: 8
  },
  infoText: { flex: 1, fontSize: 14, fontWeight: '500', color: Neo.colors.neutral[800] },

  // PERMISSION
  permissionButton: { backgroundColor: Neo.colors.primary[600], paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  permissionButtonText: { color: Neo.colors.surface, fontWeight: 'bold' },

  // CAMERA STYLES
  cameraContainer: { flex: 1 },
  camera: { flex: 1 },

  // OVERLAY
  overlayContainer: { ...StyleSheet.absoluteFillObject, zIndex: 1 },
  darkOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  middleOverlay: { flexDirection: 'row', height: width * 0.7 },
  darkOverlaySide: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' },
  darkOverlayBottom: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', paddingTop: 40 },
  scanWindow: { width: width * 0.7, height: width * 0.7, position: 'relative' },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: '#FFF', borderWidth: 4 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanLine: { width: '100%', height: 2, backgroundColor: Neo.colors.primary[600], shadowColor: Neo.colors.primary[600], shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },

  // CONTROLS
  floatingHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  glassButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  glassBadge: { paddingHorizontal: 16, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 4 },
  glassBadgeText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  instructionText: { color: '#FFF', fontSize: 16, marginBottom: 40, fontWeight: '500' },
  controls: { marginBottom: 80 },
  captureButton: { width: 84, height: 84, borderRadius: 42, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  captureInner: { width: 68, height: 68, borderRadius: 34, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', ...Neo.shadows.md },

  // RESULT
  analysisContainer: { flex: 1, backgroundColor: '#000' },
  previewImage: { flex: 1, resizeMode: 'cover', opacity: 0.6 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  pulseCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Neo.colors.primary[600], justifyContent: 'center', alignItems: 'center', marginBottom: Neo.spacing.lg, ...Neo.shadows.lg },
  analyzingText: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: Neo.spacing.md },
  resultSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    padding: Neo.spacing.xl, paddingTop: 12, ...Neo.shadows.xl
  },
  dragIndicator: { width: 40, height: 5, backgroundColor: Neo.colors.neutral[200], borderRadius: 3, alignSelf: 'center', marginBottom: 20 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  severityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  severityText: { color: '#FFF', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' },
  resultTitle: { fontSize: 24, fontWeight: 'bold', color: Neo.colors.neutral[900], marginBottom: 8 },
  resultDescription: { fontSize: 16, color: Neo.colors.neutral[600], marginBottom: 24, lineHeight: 24 },
  actionBox: { backgroundColor: 'rgba(33, 150, 243, 0.1)', padding: 20, borderRadius: 16, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: Neo.colors.primary[600] },
  actionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  actionTitle: { fontSize: 16, fontWeight: 'bold', color: Neo.colors.primary[600] },
  actionText: { fontSize: 15, color: Neo.colors.neutral[700], lineHeight: 22 },
  primaryButton: { backgroundColor: Neo.colors.primary[600], paddingVertical: 18, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 10, marginBottom: 30 },
  primaryButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});
