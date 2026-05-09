/**
 * RemoteConfigService.js
 * Pilar III: Inteligência de Produto - Experimentação (Testes A/B)
 * 
 * Infraestrutura para configuração remota de parâmetros da UI.
 * Permite testes A/B sem novo lançamento do app.
 * 
 * Usage:
 * import { remoteConfig, RC_KEYS } from '../services/RemoteConfigService';
 * const buttonText = remoteConfig.getString(RC_KEYS.CTA_ONBOARDING);
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = '@vigilaro_remote_config';
const CACHE_EXPIRY = 12 * 60 * 60 * 1000; // 12 horas

// ========================
// CHAVES DE CONFIGURAÇÃO
// ========================
export const RC_KEYS = {
    // CTAs e Textos
    CTA_ONBOARDING: 'cta_onboarding_text',
    CTA_START_CHECKLIST: 'cta_start_checklist_text',
    CTA_ADD_PROFILE: 'cta_add_profile_text',
    CTA_SOS: 'cta_sos_text',

    // Cores e Visual
    PRIMARY_COLOR: 'primary_color',
    ACCENT_COLOR: 'accent_color',
    HEADER_GRADIENT_START: 'header_gradient_start',
    HEADER_GRADIENT_END: 'header_gradient_end',

    // Feature Flags
    FEATURE_AI_ASSISTANT: 'feature_ai_assistant_enabled',
    FEATURE_GAMIFICATION: 'feature_gamification_enabled',
    FEATURE_VOICE_COMMANDS: 'feature_voice_commands_enabled',
    FEATURE_DARK_MODE: 'feature_dark_mode_enabled',

    // Onboarding
    ONBOARDING_STEPS_COUNT: 'onboarding_steps_count',
    ONBOARDING_SKIP_ENABLED: 'onboarding_skip_enabled',

    // Conteúdo Promocional
    PROMO_BANNER_ENABLED: 'promo_banner_enabled',
    PROMO_BANNER_TEXT: 'promo_banner_text',
    PROMO_BANNER_ACTION: 'promo_banner_action',

    // Limites e Thresholds
    MIN_SAFETY_SCORE_ALERT: 'min_safety_score_alert',
    CHECKLIST_REMINDER_DAYS: 'checklist_reminder_days',

    // Experimentos A/B
    AB_HOME_LAYOUT: 'ab_home_layout', // 'classic' | 'modern' | 'compact'
    AB_ONBOARDING_FLOW: 'ab_onboarding_flow', // 'full' | 'quick' | 'skip'
};

// ========================
// VALORES PADRÃO
// ========================
const DEFAULT_VALUES = {
    // CTAs
    [RC_KEYS.CTA_ONBOARDING]: 'Começar Agora',
    [RC_KEYS.CTA_START_CHECKLIST]: 'Iniciar Verificação',
    [RC_KEYS.CTA_ADD_PROFILE]: 'Adicionar Perfil',
    [RC_KEYS.CTA_SOS]: 'SOS Emergência',

    // Visual
    [RC_KEYS.PRIMARY_COLOR]: '#1A73E8',
    [RC_KEYS.ACCENT_COLOR]: '#FF5722',
    [RC_KEYS.HEADER_GRADIENT_START]: '#1A73E8',
    [RC_KEYS.HEADER_GRADIENT_END]: '#64B5F6',

    // Feature Flags
    [RC_KEYS.FEATURE_AI_ASSISTANT]: true,
    [RC_KEYS.FEATURE_GAMIFICATION]: true,
    [RC_KEYS.FEATURE_VOICE_COMMANDS]: true,
    [RC_KEYS.FEATURE_DARK_MODE]: false,

    // Onboarding
    [RC_KEYS.ONBOARDING_STEPS_COUNT]: 4,
    [RC_KEYS.ONBOARDING_SKIP_ENABLED]: false,

    // Promo
    [RC_KEYS.PROMO_BANNER_ENABLED]: false,
    [RC_KEYS.PROMO_BANNER_TEXT]: '',
    [RC_KEYS.PROMO_BANNER_ACTION]: '',

    // Thresholds
    [RC_KEYS.MIN_SAFETY_SCORE_ALERT]: 60,
    [RC_KEYS.CHECKLIST_REMINDER_DAYS]: 30,

    // A/B Tests
    [RC_KEYS.AB_HOME_LAYOUT]: 'modern',
    [RC_KEYS.AB_ONBOARDING_FLOW]: 'full',
};

// ========================
// REMOTE CONFIG SERVICE
// ========================
class RemoteConfigService {
    constructor() {
        this.config = { ...DEFAULT_VALUES };
        this.lastFetch = null;
        this.initialized = false;
    }

    // ========================
    // INICIALIZAÇÃO
    // ========================
    async initialize() {
        try {
            // Carrega do cache local primeiro (resposta instantânea)
            const cached = await this._loadFromCache();
            if (cached) {
                this.config = { ...DEFAULT_VALUES, ...cached.config };
                this.lastFetch = cached.timestamp;
            }

            // Busca valores atualizados em background
            this._fetchRemoteConfig();

            this.initialized = true;
            console.log('[RemoteConfig] Inicializado');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('[RemoteConfig] Erro ao inicializar:', error); }
            return false;
        }
    }

    async _loadFromCache() {
        try {
            const cached = await AsyncStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                // Verifica se expirou
                if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
                    return parsed;
                }
            }
        } catch {
            // Ignora
        }
        return null;
    }

    async _fetchRemoteConfig() {
        try {
            // TODO: Integrar com Firebase Remote Config
            // const remoteConfig = firebase.remoteConfig();
            // await remoteConfig.fetchAndActivate();
            // const newConfig = remoteConfig.getAll();

            // Por enquanto, simula fetch bem-sucedido
            // Em produção, substituir por chamada real

            this.lastFetch = Date.now();

            // Salva em cache
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
                config: this.config,
                timestamp: this.lastFetch,
            }));

        } catch (error) {
            if (__DEV__) { console.error('[RemoteConfig] Erro ao buscar config:', error); }
        }
    }

    // ========================
    // GETTERS
    // ========================
    getString(key, defaultValue = '') {
        const value = this.config[key];
        return typeof value === 'string' ? value : (defaultValue || DEFAULT_VALUES[key] || '');
    }

    getNumber(key, defaultValue = 0) {
        const value = this.config[key];
        return typeof value === 'number' ? value : (defaultValue || DEFAULT_VALUES[key] || 0);
    }

    getBoolean(key, defaultValue = false) {
        const value = this.config[key];
        return typeof value === 'boolean' ? value : (defaultValue || DEFAULT_VALUES[key] || false);
    }

    getJSON(key, defaultValue = {}) {
        const value = this.config[key];
        if (typeof value === 'object') return value;
        try {
            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    }

    // ========================
    // FEATURE FLAGS
    // ========================
    isFeatureEnabled(featureKey) {
        return this.getBoolean(featureKey, false);
    }

    // ========================
    // A/B TESTING
    // ========================
    getVariant(experimentKey) {
        return this.getString(experimentKey);
    }

    isVariant(experimentKey, variantName) {
        return this.getString(experimentKey) === variantName;
    }

    // ========================
    // SETTERS (para desenvolvimento/testes)
    // ========================
    async setOverride(key, value) {
        this.config[key] = value;
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
            config: this.config,
            timestamp: Date.now(),
        }));
    }

    async clearOverrides() {
        this.config = { ...DEFAULT_VALUES };
        await AsyncStorage.removeItem(CACHE_KEY);
    }

    // ========================
    // DEBUG
    // ========================
    getAll() {
        return { ...this.config };
    }

    getStatus() {
        return {
            initialized: this.initialized,
            lastFetch: this.lastFetch ? new Date(this.lastFetch).toISOString() : null,
            configCount: Object.keys(this.config).length,
        };
    }
}

export const remoteConfig = new RemoteConfigService();

export default remoteConfig;
