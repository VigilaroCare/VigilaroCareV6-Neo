/**
 * ScannerScreen.js — a câmera do app.
 *
 * Três modos, escolhidos por quem abre a tela (route.params.mode):
 *   - 'environment'  (padrão)  foto de um cômodo; a IA lista os riscos que enxerga.
 *                              É o que o ícone "Scanner Ambiente" da Home abre.
 *   - 'barcode_scan'           lê o código de barras; resultado no Info Rótulos.
 *   - 'label_scan'             foto do rótulo; a IA lê o que está impresso;
 *                              resultado no Info Rótulos.
 *
 * Até 28/10/2026 esta tela abria numa "intro" de três cards ("Scanner
 * Inteligente") que levavam todos à mesma câmera, e dois deles eram do Info
 * Rótulos. A intro saiu: o ícone chama a câmera do que o nome promete, e as duas
 * formas de consultar produto passaram a morar no Info Rótulos.
 */
import { useState, useRef, useEffect } from "react";
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useAccessibility } from '../context/AccessibilityContext';
import { CameraView, useCameraPermissions } from 'expo-camera';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import NeoPill from '../components/NeoPill';
import NeoScreenHeader from '../components/NeoScreenHeader';
import AppBackground from '../components/AppBackground';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Body, Small, H3 } from '../components/NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import { VisionService } from '../services/VisionService';
import ConsentimentoIAService from '../services/ConsentimentoIAService';
import GamificationService from '../services/GamificationService';
import { resolveBarcode } from '../services/InfoRotulosSubstanceService';
import { Config } from '../utils/Config';
import { useTranslation } from 'react-i18next';
import NeoAlert from '../utils/NeoAlert';
import { tomDoPerigo, rotuloDoPerigo } from '../utils/perigoProduto';

const { width } = Dimensions.get('window');

// O que muda de um modo para o outro. `ia`: a foto sai do aparelho (com permissão).
const MODOS = {
  environment:  { tituloKey: 'scanner.titleEnv',     titulo: 'Scanner Ambiente', guiaKey: 'scanner.guideEnv',     guia: 'Aponte para o ambiente',               avisoKey: 'scanner.aiNoticeEnv',   aviso: 'A IA pode errar e não substitui a vistoria.', ia: true },
  label_scan:   { tituloKey: 'scanner.titleLabel',   titulo: 'Foto do rótulo',   guiaKey: 'scanner.guideLabel',   guia: 'Fotografe o verso: composição e advertências',   avisoKey: 'scanner.aiNoticeLabel', aviso: 'A IA lê o rótulo: confira o que está impresso.', ia: true },
  barcode_scan: { tituloKey: 'scanner.titleBarcode', titulo: 'Código de barras', guiaKey: 'scanner.guideBarcode', guia: 'Enquadre o código de barras',          ia: false },
};

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
  const isDark = useIsDark();

  // Hook at the top level to avoid rules of hooks issues
  const isFocused = useIsFocused();

  // Sem parâmetro, é o scanner de ambiente — o que o nome do ícone promete.
  const [currentMode, setCurrentMode] = useState(MODOS[route.params?.mode] ? route.params.mode : 'environment');
  const modo = MODOS[currentMode];

  useEffect(() => {
    if (MODOS[route.params?.mode]) {
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
    if (permission?.granted && !reduceMotion) {
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
        // Ambiente: qualidade baixa (0.3) basta — é cena, não texto — e é mais rápido.
        // Rótulo: é TEXTO miúdo, e foto muito comprimida o borra. Qualidade alta e com o ajuste
        // de orientação do aparelho, para a IA receber o texto reto. Esta é a foto que a IA
        // recebe: o ImageManipulator só a reduz depois, então a qualidade daqui vale até o fim.
        const ehRotulo = currentMode === 'label_scan';
        const photoData = await cameraRef.takePictureAsync({
          quality: ehRotulo ? 0.8 : 0.3,
          base64: false,  // Não gera base64 aqui (economia de memória)
          skipProcessing: !ehRotulo, // Ambiente: pula o pós-processamento (mais rápido)
        });
        setPhoto(photoData.uri);
        setIsAnalyzing(true);
        analyzePhoto(photoData.uri);
      } catch (error) {
        NeoAlert.alert(t('telas.ScannerScreen.erro', 'Erro'), t('telas.ScannerScreen.naoFoiPossivelCapturarAFoto', 'Não foi possível capturar a foto.'));
        console.error(error);
      }
    }
  };

  // Volta à câmera. Usado depois de recusa, falha ou de entregar o resultado.
  const voltarACamera = () => {
    setIsAnalyzing(false);
    setPhoto(null);
  };

  const analyzePhoto = async (imageUri) => {
    // A análise da foto É feita por IA de terceiro: sem permissão explícita,
    // a foto não sai do aparelho (Apple 5.1.2(i); LGPD art. 33).
    if (!(await ConsentimentoIAService.pedir())) {
      voltarACamera();
      NeoAlert.alert(
        t('consentimentoIA.semPermissaoTitulo', 'Análise não enviada'),
        t('consentimentoIA.semPermissaoScanner', 'A análise de fotos usa inteligência artificial e precisa da sua permissão. A foto não saiu do aparelho. Você pode permitir em Privacidade → Suas escolhas.'),
      );
      return;
    }
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
        if (__DEV__) console.log('[Scanner] ❌ Proxy offline:', proxyErr.message); // o alerta abaixo já avisa: não é erro de programa
        NeoAlert.alert(
          t('telas.ScannerScreen.servidorIndisponivel', 'Servidor indisponível'),
          // Endereço e instrução técnica só em desenvolvimento: em produção o
          // usuário via "node server.js na pasta backend-proxy" e a URL do proxy.
          __DEV__
            ? 'O servidor de análise (proxy) não está acessível.\n\n' +
              'Verifique se o backend proxy está rodando:\n' +
              `📍 ${Config.VIGILARO_PROXY_URL}\n\n` +
              'Execute: node server.js na pasta backend-proxy'
            : t('telas.ScannerScreen.servidorIndisponivelMsg', 'O serviço de análise está fora do ar no momento. Tente novamente em alguns minutos.'),
        );
        voltarACamera(); // volta à câmera, como na recusa da permissão de IA
        return;
      }

      // ② Comprimir imagem (1024px, JPEG 0.6)
      if (__DEV__) console.log('[Scanner] Comprimindo imagem...');
      const ImageManipulator = require('expo-image-manipulator');
      const compressed = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 1024 } }],
        {
          compress: currentMode === 'label_scan' ? 0.85 : 0.6, // texto precisa de menos compressão que cena,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        }
      );

      const sizeKB = Math.round((compressed.base64?.length || 0) * 0.75 / 1024);
      if (__DEV__) {
        console.log(`[Scanner] 📷 Imagem pronta: ${compressed.width}x${compressed.height} | ~${sizeKB}KB | ${Date.now() - startTime}ms`);
      }

      const base64 = compressed.base64;

      // ③ Rótulo: a IA LÊ, e o resultado vai para a tela de resultado do Info
      // Rótulos — a mesma do código de barras e da busca. Ambiente: lista de riscos aqui.
      if (currentMode === 'label_scan') {
        const rotulo = await VisionService.analyzeProductLabel(base64);
        await GamificationService.addPoints('USE_SCANNER');
        voltarACamera(); // ao voltar do resultado, a câmera está pronta
        navigation.navigate('InfoRotulosResult', {
          product: {
            nome: rotulo.nome || t('scanner.unnamedProduct', 'Produto sem nome'),
            marca: rotulo.marca || '',
            categoria: rotulo.categoria || t('scanner.labelCategory', 'Produto lido do rótulo'),
            indicacao: rotulo.indicacao || '',
            palavraSinal: rotulo.palavraSinal || '',
            componentes: rotulo.componentes,
            riscos: rotulo.riscos,
            prevencao: rotulo.prevencao,
            ingredientes_texto: rotulo.componentes.join(', '),
            icone: 'TestTube',
          },
          source: 'ai_label',
          searchQuery: rotulo.nome || '',
        });
        return;
      }

      const result = await VisionService.analyzeImage(base64);

      if (__DEV__) console.log(`[Scanner] ✅ Análise concluída em ${Date.now() - startTime}ms`);

      setAnalysisResult(result);
      AccessibilityInfo.announceForAccessibility(t('scanner.analysisComplete', { count: result.analises.length }));
      await GamificationService.addPoints('USE_SCANNER');
    } catch (error) {
      const elapsed = Date.now() - startTime;
      // Rótulo ilegível é resultado esperado (a pessoa vê o alerta): log comum, não erro.
      if (__DEV__) (error.name === 'RotuloIlegivel' ? console.log : console.error)(`[Scanner] ❌ Análise falhou (${elapsed}ms):`, error.name, error.message);

      // Mensagem específica por tipo de erro
      if (error.name === 'AbortError') {
        NeoAlert.alert(
          t('telas.ScannerScreen.tempoEsgotado', 'Tempo esgotado'),
          t('telas.ScannerScreen.aAnaliseDemorouMaisQueO', 'A análise demorou mais que o esperado.\n\nSugestões:\n• Tente com melhor conexão Wi-Fi\n• Fotografe em boa iluminação\n• Foque apenas no rótulo/ingredientes'),
        );
      } else if (error.name === 'RotuloIlegivel') {
        NeoAlert.alert(
          t('scanner.labelUnreadableTitle', 'Não consegui ler o rótulo'),
          t('scanner.labelUnreadable', 'Tente de novo com mais luz, bem de perto e com o texto reto na imagem.'),
        );
      } else if (error.message?.includes('Network') || error.message?.includes('fetch')) {
        NeoAlert.alert(t('telas.ScannerScreen.semConexao', 'Sem conexão'), t('telas.ScannerScreen.verifiqueSuaConexaoComAInternet', 'Verifique sua conexão com a internet e tente novamente.'));
      } else {
        NeoAlert.alert(t('telas.ScannerScreen.erro2', 'Erro'), t('telas.ScannerScreen.falhaNaAnaliseTenteNovamente', 'Falha na análise. Tente novamente.'));
      }
      AccessibilityInfo.announceForAccessibility(t('scanner.analysisFailed', 'Falha na análise. Tente novamente.'));
      setAnalysisResult(null);
      // Volta à câmera para tentar de novo. Sem isto a foto ficava parada na
      // tela, sem resultado, e a pessoa tinha que descobrir o botão de fechar.
      setPhoto(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetScanner = () => {
    setPhoto(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const handleBarcodeScanned = async ({ data }) => {
    if (isAnalyzing) return;
    setIsAnalyzing(true);

    // Feedback tátil
    Vibration.vibrate(50);

    if (__DEV__) console.log(`[Scanner] Barcode lido (${String(data).length} caracteres)`);
    AccessibilityInfo.announceForAccessibility(t('scanner.lookupBarcode', 'Buscando dados do produto…'));

    try {
      // Tenta resolver o código de barras (Local → OFF → OBF → OPF → UPCitemdb)
      const result = await resolveBarcode(data);

      if (result && result.found && result.product) {
        if (__DEV__) console.log(`[Scanner] ✅ Produto encontrado via: ${result.source}`);
        AccessibilityInfo.announceForAccessibility(t('scanner.barcodeSuccess', 'Produto encontrado. Redirecionando.'));

        navigation.navigate('InfoRotulosResult', {
          product: result.product,
          source: result.source,
          searchQuery: data,
          ingredientes_texto: result.product.ingredientes_texto || '',
          marca: result.product.marca || '',
        });
      } else if (result?.source === 'invalid') {
        // Não é código de produto (um link, um QR de Wi-Fi, texto qualquer). Não
        // é culpa de ninguém e não há o que fotografar: só avisa e segue lendo.
        // O conteúdo lido NÃO é mostrado: pode ser qualquer coisa.
        NeoAlert.alert(
          t('scanner.barcodeInvalidTitle', 'Código não reconhecido'),
          t('scanner.barcodeInvalidMsg', 'Este não parece um código de barras de produto. Aponte para o código de barras da embalagem.'),
          [{ text: t('telas.ScannerScreen.entendi', 'Entendi') }],
        );
      } else {
        // Código válido, produto fora das bases consultadas: o rótulo é o caminho.
        Vibration.vibrate([0, 50, 100, 50]);
        setCurrentMode('label_scan');
        AccessibilityInfo.announceForAccessibility(t('scanner.barcodeNotFound', 'Produto não cadastrado. Câmera alternada para foto do rótulo.'));
        NeoAlert.alert(
          t('scanner.barcodeNotFoundTitle', 'Produto não encontrado'),
          t('scanner.barcodeNotFoundMsg', { code: String(data).trim(), defaultValue: 'Não encontrei o código {{code}} nas bases consultadas. Fotografe o rótulo: a inteligência artificial lê os ingredientes.' }),
          [{ text: t('telas.ScannerScreen.entendi', 'Entendi') }],
        );
      }
    } catch (e) {
      console.warn('Erro ao ler código de barras:', e);
      NeoAlert.alert(t('telas.ScannerScreen.erro3', 'Erro'), t('telas.ScannerScreen.falhaAoBuscarDadosDoProduto', 'Falha ao buscar dados do produto. Tente novamente.'));
    } finally {
      setTimeout(() => setIsAnalyzing(false), 2000);
    }
  };

  // 1. Permissão da câmera
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <AppBackground>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={{ paddingTop: insets.top }}>
          <NeoScreenHeader title={t(modo.tituloKey, modo.titulo)} onBack={() => navigation.goBack()} />
        </View>
        <View style={styles.permissao}>
          <NeoCard variant="elevated" style={styles.permissaoCard}>
            <NeoIcon name="Camera" size={32} color={colors.textOn.brand} variant="Bold" />
            <Body style={styles.permissaoTexto}>{t('scanner.permReq')}</Body>
            <TouchableOpacity
              style={styles.permissaoBotao}
              onPress={requestPermission}
              accessibilityRole="button"
            >
              <Text style={styles.permissaoBotaoTexto}>{t('scanner.grant')}</Text>
            </TouchableOpacity>
          </NeoCard>
        </View>
      </AppBackground>
    );
  }

  // 2. Câmera ou resultado
  const ehBarras = currentMode === 'barcode_scan';
  const janelaW = width * 0.85;
  const janelaH = ehBarras ? width * 0.5 : width * 0.85;

  const renderCamera = () => (
    <View style={styles.cameraContainer}>
      {isFocused && (
        <CameraView
          style={styles.camera}
          facing={facing}
          // Só códigos de PRODUTO. O QR ficou de fora: não é código de barras de
          // produto, e lê-lo só servia para cair no aviso de "código não reconhecido".
          barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"] }}
          onBarcodeScanned={isAnalyzing || !ehBarras ? undefined : handleBarcodeScanned}
          ref={(ref) => setCameraRef(ref)}
        />
      )}

      {/* Mira */}
      <View style={styles.overlayContainer} pointerEvents="box-none">
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', height: janelaH }}>
          <View style={{ flex: 1 }} />
          <View style={{ width: janelaW, height: janelaH, position: 'relative' }}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <Animated.View style={[styles.scanLine, {
              transform: [{ translateY: scanLineAnim.interpolate({ inputRange: [0, 1], outputRange: [0, janelaH] }) }]
            }]} />
          </View>
          <View style={{ flex: 1 }} />
        </View>

        {/* Instrução, aviso de IA e disparador */}
        <View style={[styles.rodape, { paddingBottom: insets.bottom + 36 }]}>
          <Text style={styles.guia}>{t(modo.guiaKey, modo.guia)}</Text>
          {modo.ia && (
            // Antes da foto, não só depois: a pessoa precisa saber que é IA e que
            // ela erra ANTES de apontar a câmera.
            <View style={styles.aviso} accessibilityRole="text">
              <NeoIcon name="InfoCircle" size={14} color="#FFFFFF" variant="Bold" />
              <Text style={styles.avisoTexto}>{t(modo.avisoKey, modo.aviso)}</Text>
            </View>
          )}
          {!ehBarras && (
            <TouchableOpacity
              style={styles.disparador}
              onPress={takePicture}
              accessibilityRole="button"
              accessibilityLabel={t('scanner.capturePhoto', 'Tirar foto')}
            >
              <View style={styles.disparadorMiolo}>
                <NeoIcon name="Camera" size={32} color="#FFF" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Cabeçalho flutuante */}
      <View style={[styles.floatingHeader, { top: insets.top }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.glassButton}
          accessibilityRole="button"
          accessibilityLabel={t('common.back', 'Voltar')}
        >
          <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.glassBadge}>
          <Text style={styles.glassBadgeText}>{t(modo.tituloKey, modo.titulo)}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
          style={styles.glassButton}
          accessibilityRole="button"
          accessibilityLabel={t('scanner.flipCamera', 'Alternar câmera')}
        >
          <NeoIcon name="CameraRotate" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Resultado da análise de AMBIENTE (o de rótulo vai para o Info Rótulos).
  const superficie = isDark ? colors.neutral[200] : colors.neutral.white;
  const analises = analysisResult?.analises || [];

  const renderAnalysis = () => (
    <View style={styles.analysisContainer}>
      <Image source={{ uri: photo }} style={styles.previewImage} blurRadius={isAnalyzing ? 40 : 0} />

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
          <Text style={styles.analyzingText}>{t('scanner.analyzing', 'Analisando imagem…')}</Text>
        </View>
      )}

      {!isAnalyzing && analysisResult && (
        <ScrollView
          style={[styles.folha, { backgroundColor: superficie }]}
          contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomBare + insets.bottom }}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.alca, { backgroundColor: colors.neutral[300] }]} />

          {/* O resultado diz QUANTOS riscos foram vistos — e, quando são zero, diz
              que isso não é atestado de segurança: a IA só vê o que está na foto. */}
          <H3 style={styles.folhaTitulo} accessibilityRole="header">
            {t('scanner.risksFound', { count: analises.length })}
          </H3>
          {analises.length === 0 && (
            <Body style={[styles.folhaNota, { color: colors.textOn.muted }]}>
              {t('scanner.noRisksNote', 'Isso não significa que o ambiente esteja seguro: a IA só vê o que aparece na foto.')}
            </Body>
          )}

          {/* Identifica a origem do resultado antes da lista: o usuário precisa
              saber que é análise de IA ANTES de agir sobre os riscos. */}
          <SafetyDisclaimer variant="ia" style={{ marginBottom: Neo.spacing.md }} />

          {analises.map((item, index) => (
            <NeoCard key={index} variant="elevated" style={styles.risco}>
              <View style={styles.riscoTopo}>
                {/* Cor E texto: o nível está escrito, a cor só reforça. */}
                <NeoPill solida tom={tomDoPerigo(item.risco)} label={rotuloDoPerigo(item.risco)} icone={item.risco === 'Baixo' ? 'InfoCircle' : 'Warning2'} />
              </View>
              <Text style={[styles.riscoTitulo, { color: colors.neutral[900] }]}>{item.titulo}</Text>
              {!!item.descricao && <Body style={{ color: colors.neutral[700] }}>{item.descricao}</Body>}
              {!!item.acao && (
                <View style={[styles.oQueFazer, { backgroundColor: colors.tile?.track || 'rgba(6,95,70,0.08)' }]}>
                  <View style={styles.oQueFazerTopo}>
                    <NeoIcon name="LampOn" size={18} color={colors.textOn.brand} variant="Bold" />
                    <Small style={[styles.oQueFazerRotulo, { color: colors.textOn.brand }]}>
                      {t('scanner.whatToDo', 'O que fazer')}
                    </Small>
                  </View>
                  <Body style={{ color: colors.neutral[900] }}>{item.acao}</Body>
                </View>
              )}
            </NeoCard>
          ))}

          <TouchableOpacity
            style={styles.novaFoto}
            onPress={resetScanner}
            accessibilityRole="button"
          >
            <NeoIcon name="Scan" size={20} color="#FFF" />
            <Text style={styles.novaFotoTexto}>{t('scanner.newScan', 'Nova foto')}</Text>
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
  container: { flex: 1, backgroundColor: '#000' },

  // PERMISSÃO
  permissao: { flex: 1, justifyContent: 'center', paddingHorizontal: Neo.layout.screenHPadding, paddingBottom: Neo.layout.scrollBottomFooter },
  permissaoCard: { alignItems: 'center', gap: Neo.spacing.md, paddingVertical: Neo.spacing.xl },
  permissaoTexto: { textAlign: 'center' },
  permissaoBotao: { backgroundColor: Neo.colors.primary[700], paddingHorizontal: 24, paddingVertical: 12, borderRadius: Neo.radius.md },
  permissaoBotaoTexto: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },

  // CÂMERA
  cameraContainer: { flex: 1 },
  camera: { flex: 1 },
  overlayContainer: { ...StyleSheet.absoluteFillObject, zIndex: 1 },
  corner: { position: 'absolute', width: 30, height: 30, borderColor: 'rgba(255,255,255,0.8)', borderWidth: 4, borderRadius: 12 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanLine: { width: '100%', height: 4, borderRadius: 2, backgroundColor: '#4CAF50', shadowColor: '#4CAF50', shadowOpacity: 0.8, shadowRadius: 12, elevation: 8 },
  rodape: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: 24 },
  guia: { color: '#FFF', fontSize: 16, marginBottom: 12, fontWeight: '600', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.8)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  aviso: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.55)', marginBottom: 24 },
  avisoTexto: { color: '#FFF', fontSize: 12.5, fontWeight: '600' },
  disparador: { width: 84, height: 84, borderRadius: 42, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)' },
  disparadorMiolo: { width: 68, height: 68, borderRadius: 34, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },

  // CABEÇALHO FLUTUANTE
  floatingHeader: { position: 'absolute', left: 0, right: 0, zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  glassButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  glassBadge: { paddingHorizontal: 16, height: 36, borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', marginTop: 4 },
  glassBadgeText: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  // RESULTADO DO AMBIENTE
  analysisContainer: { flex: 1, backgroundColor: '#000' },
  previewImage: { flex: 1, resizeMode: 'cover', opacity: 0.6 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' },
  pulseCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: Neo.colors.primary[700], justifyContent: 'center', alignItems: 'center', marginBottom: Neo.spacing.lg },
  analyzingText: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginTop: Neo.spacing.md },
  folha: {
    position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: '88%',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: Neo.layout.screenHPadding, paddingTop: 12,
  },
  alca: { width: 40, height: 5, borderRadius: 3, alignSelf: 'center', marginBottom: 16 },
  folhaTitulo: { marginBottom: Neo.spacing.sm },
  folhaNota: { marginBottom: Neo.spacing.md },
  risco: { marginBottom: Neo.spacing.md, gap: Neo.spacing.sm },
  riscoTopo: { flexDirection: 'row' },
  riscoTitulo: { fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  oQueFazer: { borderRadius: 14, padding: 14, gap: 6, marginTop: Neo.spacing.xs },
  oQueFazerTopo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  oQueFazerRotulo: { fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.8 },
  novaFoto: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: Neo.colors.primary[700], borderRadius: Neo.radius.md, paddingVertical: 14, marginTop: Neo.spacing.sm },
  novaFotoTexto: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
