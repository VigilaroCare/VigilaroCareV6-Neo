/**
 * Config.js
 * Central de configuração do Vigilaro Care V5
 *
 * ⚠️ SEGURANÇA CRÍTICA — LEIA ANTES DE MODIFICAR ⚠️
 *
 * 1. CHAVES SECRETAS NÃO PERTENCEM A ESTE ARQUIVO
 *    - API keys privadas vivem exclusivamente no backend proxy
 *    - Tokens sensíveis são armazenados via EAS Secrets (`eas secret:create`)
 *    - Qualquer chave aqui é extraível por engenharia reversa de APK/IPA
 *
 * 2. VARIÁVEIS DE AMBIENTE
 *    - Prefixo EXPO_PUBLIC_ = lidas em tempo de build do arquivo .env
 *    - NUNCA commite .env com valores reais (use .env.example como template)
 *    - Valores ausentes causam fallback para defaults seguros
 *
 * 3. CHAVES PÚBLICAS vs PRIVADAS
 *    - RevenueCat API Keys: PÚBLICAS (seguro expor no código)
 *    - OpenAI API Key: PRIVADA (deve ficar no backend proxy)
 *    - ElevenLabs API Key: PRIVADA (deve ficar no backend proxy)
 *    - Voice IDs: PÚBLICOS (são apenas identificadores)
 */

import { Platform } from 'react-native';

// ---------------------------------------------------------------------------
// AMBIENTE E MODO DE OPERAÇÃO
// ---------------------------------------------------------------------------
const ENV = process.env.EXPO_PUBLIC_ENV || 'development';
const IS_DEV = __DEV__;
const IS_PRODUCTION = ENV === 'production';

// ---------------------------------------------------------------------------
// CONFIGURAÇÕES PRINCIPAIS
// ---------------------------------------------------------------------------
const ConfigData = {
  // Ambiente
  ENV,
  IS_DEV,
  IS_PRODUCTION,

  // ---------------------------------------------------------------------------
  // VISÃO COMPUTACIONAL
  // True por padrão (mock ativo para desenvolvimento).
  // False apenas quando EXPO_PUBLIC_USE_MOCK_VISION === "false" (string).
  // ---------------------------------------------------------------------------
  USE_MOCK_VISION: process.env.EXPO_PUBLIC_USE_MOCK_VISION !== 'false',

  // ---------------------------------------------------------------------------
  // OPENAI E PROXY — Scanner Inteligente
  // ---------------------------------------------------------------------------
  OPENAI_API_URL:
    process.env.EXPO_PUBLIC_OPENAI_API_URL ||
    'https://api.openai.com/v1/chat/completions',

  VIGILARO_PROXY_URL: process.env.EXPO_PUBLIC_VIGILARO_PROXY_URL || 'http://192.168.100.65:3000',
  VIGILARO_APP_SECRET: process.env.EXPO_PUBLIC_VIGILARO_APP_SECRET || '',

  // ---------------------------------------------------------------------------
  // REVENUECAT — Assinaturas (In-App Purchases)
  // ✅ Estas chaves SÃO PÚBLICAS — RevenueCat usa chaves públicas no cliente.
  // A segurança real acontece no backend do RevenueCat, não aqui.
  // ---------------------------------------------------------------------------
  REVENUECAT_API_KEY_IOS: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS || '',
  REVENUECAT_API_KEY_ANDROID:
    process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID || '',

  // ---------------------------------------------------------------------------
  // ELEVENLABS — Voz Ultra Realista
  // ✅ Voice ID é público (apenas um identificador de modelo de voz).
  // ⚠️ API Key deve ficar no backend proxy, NÃO aqui.
  // ---------------------------------------------------------------------------
  ELEVENLABS_VOICE_ID: 'cgSgspJ2msm6clMCkdW9', // Jessica (pt-BR)
};

// ---------------------------------------------------------------------------
// VALIDAÇÕES DE CONFIGURAÇÃO
// Previne crashes silenciosos por configurações ausentes ou inválidas.
// ---------------------------------------------------------------------------
const validateConfig = () => {
  const errors = [];
  const warnings = [];

  // Validar RevenueCat (crítico para funcionalidades premium)
  if (Platform.OS === 'ios' && !ConfigData.REVENUECAT_API_KEY_IOS) {
    errors.push('❌ REVENUECAT_API_KEY_IOS não configurada (iOS)');
  }

  if (Platform.OS === 'android' && !ConfigData.REVENUECAT_API_KEY_ANDROID) {
    errors.push('❌ REVENUECAT_API_KEY_ANDROID não configurada (Android)');
  }

  // Validar URL da OpenAI (deve ser HTTPS)
  if (!ConfigData.OPENAI_API_URL.startsWith('https://')) {
    errors.push(
      `❌ OPENAI_API_URL deve usar HTTPS: ${ConfigData.OPENAI_API_URL}`
    );
  }

  // Validar APP_SECRET (autenticação com o proxy)
  if (!ConfigData.VIGILARO_APP_SECRET) {
    errors.push('❌ VIGILARO_APP_SECRET não configurado. Chamadas de API falharão.');
  } else if (ConfigData.VIGILARO_APP_SECRET.length < 20) {
    warnings.push('⚠️ VIGILARO_APP_SECRET é muito curto. Use um segredo com 20+ caracteres.');
  }

  // Warning se estiver usando mock em produção
  if (IS_PRODUCTION && ConfigData.USE_MOCK_VISION) {
    warnings.push(
      '⚠️ USE_MOCK_VISION=true em produção. Escaneamento de perigos não funcionará.'
    );
  }

  // Logar resultados
  if (errors.length > 0) {
    console.error('🚨 ERROS CRÍTICOS DE CONFIGURAÇÃO:', errors);
    
    if (!IS_DEV) {
      // Em produção, poderia lançar erro fatal ou desabilitar features
      // throw new Error(`Config inválida: ${errors.join(', ')}`);
      console.error('⚠️ App pode ter comportamento inesperado!');
    }
  }

  if (warnings.length > 0) {
    console.warn('⚠️ AVISOS DE CONFIGURAÇÃO:', warnings);
  }

  if (IS_DEV && errors.length === 0 && warnings.length === 0) {
    console.log('✅ Configuração validada com sucesso');
  }
};

// ---------------------------------------------------------------------------
// DEBUG INFO (apenas em desenvolvimento)
// ---------------------------------------------------------------------------
const logConfigDebug = () => {
  if (!IS_DEV) return;

  console.log('📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📱 VIGILARO CARE V5 — CONFIG DEBUG');
  console.log('📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Ambiente: ${ENV}`);
  console.log(`   Plataforma: ${Platform.OS}`);
  console.log(`   Dev Mode: ${IS_DEV}`);
  console.log(`   Produção: ${IS_PRODUCTION}`);
  console.log('📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`   Mock Vision: ${ConfigData.USE_MOCK_VISION ? '✅ Ativo' : '❌ Desativado'}`);
  console.log(`   OpenAI URL: ${ConfigData.OPENAI_API_URL}`);
  console.log(`   RevenueCat iOS: ${ConfigData.REVENUECAT_API_KEY_IOS ? '✅ Configurado' : '❌ Ausente'}`);
  console.log(`   RevenueCat Android: ${ConfigData.REVENUECAT_API_KEY_ANDROID ? '✅ Configurado' : '❌ Ausente'}`);
  console.log(`   ElevenLabs Voice: ${ConfigData.ELEVENLABS_VOICE_ID}`);
  console.log('📱 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

// ---------------------------------------------------------------------------
// EXECUTAR VALIDAÇÕES NA INICIALIZAÇÃO
// ---------------------------------------------------------------------------
validateConfig();
logConfigDebug();

// ---------------------------------------------------------------------------
// EXPORTAR CONFIGURAÇÃO IMUTÁVEL
// Object.freeze() previne modificações acidentais em runtime.
// ---------------------------------------------------------------------------
export const Config = Object.freeze(ConfigData);

// ---------------------------------------------------------------------------
// HELPERS UTILITÁRIOS
// ---------------------------------------------------------------------------

/**
 * Verifica se todas as configurações críticas estão presentes
 * @returns {boolean} true se config está completa
 */
export const isConfigComplete = () => {
  const hasRevenueCat =
    (Platform.OS === 'ios' && !!Config.REVENUECAT_API_KEY_IOS) ||
    (Platform.OS === 'android' && !!Config.REVENUECAT_API_KEY_ANDROID);

  const hasOpenAI = !!Config.OPENAI_API_URL;

  return hasRevenueCat && hasOpenAI;
};

/**
 * Retorna mensagem de diagnóstico de configuração
 * @returns {string} status da configuração
 */
export const getConfigStatus = () => {
  if (isConfigComplete()) {
    return '✅ Todas as configurações críticas estão presentes';
  }

  const missing = [];
  
  if (Platform.OS === 'ios' && !Config.REVENUECAT_API_KEY_IOS) {
    missing.push('RevenueCat iOS');
  }
  
  if (Platform.OS === 'android' && !Config.REVENUECAT_API_KEY_ANDROID) {
    missing.push('RevenueCat Android');
  }
  
  if (!Config.OPENAI_API_URL) {
    missing.push('OpenAI URL');
  }

  return `⚠️ Configurações ausentes: ${missing.join(', ')}`;
};

/**
 * Verifica se está em modo de desenvolvimento seguro
 * (mock ativo + ambiente dev)
 * @returns {boolean}
 */
export const isSafeDevelopment = () => {
  return IS_DEV && Config.USE_MOCK_VISION;
};

// ---------------------------------------------------------------------------
// EXPORT DEFAULT PARA COMPATIBILIDADE
// ---------------------------------------------------------------------------
export default Config;
