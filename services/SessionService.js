/**
 * SessionService.js
 * Pilar 1: Utilidade Máxima - Inteligência de Interface
 * 
 * Gerencia estado da sessão do usuário:
 * - Salva/restaura posição na navegação
 * - Rastreia uso recente para personalização
 * - Mantém estado de formulários para não perder dados
 * 
 * Usage:
 * import { sessionService } from '../services/SessionService';
 * sessionService.saveNavigationState(state);
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
    NAVIGATION_STATE: '@vigilaro_nav_state',
    RECENT_SCREENS: '@vigilaro_recent_screens',
    FORM_DRAFTS: '@vigilaro_form_drafts',
    USER_PREFERENCES: '@vigilaro_user_prefs',
    LAST_ACTIVE: '@vigilaro_last_active',
};

const MAX_RECENT_SCREENS = 10;
const FORM_DRAFT_EXPIRY = 24 * 60 * 60 * 1000; // 24 horas

class SessionService {
    constructor() {
        this.navigationState = null;
        this.recentScreens = [];
        this.formDrafts = new Map();
        this.userPreferences = {};
    }

    // ========================
    // INICIALIZAÇÃO
    // ========================
    async initialize() {
        try {
            const [navState, recent, drafts, prefs] = await Promise.all([
                AsyncStorage.getItem(KEYS.NAVIGATION_STATE),
                AsyncStorage.getItem(KEYS.RECENT_SCREENS),
                AsyncStorage.getItem(KEYS.FORM_DRAFTS),
                AsyncStorage.getItem(KEYS.USER_PREFERENCES),
            ]);

            this.navigationState = navState ? JSON.parse(navState) : null;
            this.recentScreens = recent ? JSON.parse(recent) : [];
            this.userPreferences = prefs ? JSON.parse(prefs) : {};

            // Limpa drafts expirados
            if (drafts) {
                const parsed = JSON.parse(drafts);
                const now = Date.now();
                for (const [key, value] of Object.entries(parsed)) {
                    if (now - value.timestamp < FORM_DRAFT_EXPIRY) {
                        this.formDrafts.set(key, value);
                    }
                }
            }

            // Atualiza última atividade
            await AsyncStorage.setItem(KEYS.LAST_ACTIVE, Date.now().toString());

            console.log('[SessionService] Inicializado com sucesso');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('[SessionService] Erro ao inicializar:', error); }
            return false;
        }
    }

    // ========================
    // NAVEGAÇÃO
    // ========================
    async saveNavigationState(state) {
        try {
            this.navigationState = state;
            await AsyncStorage.setItem(KEYS.NAVIGATION_STATE, JSON.stringify(state));
        } catch (error) {
            if (__DEV__) { console.error('[SessionService] Erro ao salvar estado de navegação:', error); }
        }
    }

    async getNavigationState() {
        if (this.navigationState) {
            return this.navigationState;
        }
        try {
            const data = await AsyncStorage.getItem(KEYS.NAVIGATION_STATE);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    async clearNavigationState() {
        this.navigationState = null;
        await AsyncStorage.removeItem(KEYS.NAVIGATION_STATE);
    }

    // ========================
    // TELAS RECENTES (para personalização)
    // ========================
    async recordScreenVisit(screenName, params = {}) {
        try {
            // Remove duplicatas
            this.recentScreens = this.recentScreens.filter(s => s.name !== screenName);

            // Adiciona no início
            this.recentScreens.unshift({
                name: screenName,
                params,
                timestamp: Date.now(),
                count: 1,
            });

            // Limita tamanho
            if (this.recentScreens.length > MAX_RECENT_SCREENS) {
                this.recentScreens = this.recentScreens.slice(0, MAX_RECENT_SCREENS);
            }

            await AsyncStorage.setItem(KEYS.RECENT_SCREENS, JSON.stringify(this.recentScreens));
        } catch (error) {
            if (__DEV__) { console.error('[SessionService] Erro ao registrar tela:', error); }
        }
    }

    getRecentScreens(limit = 5) {
        return this.recentScreens.slice(0, limit);
    }

    getMostUsedScreens(limit = 5) {
        // Agrupa por nome e conta ocorrências
        const counts = {};
        this.recentScreens.forEach(s => {
            counts[s.name] = (counts[s.name] || 0) + 1;
        });

        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([name, count]) => ({ name, count }));
    }

    // ========================
    // DRAFTS DE FORMULÁRIO
    // ========================
    async saveFormDraft(formId, data) {
        try {
            const draft = {
                data,
                timestamp: Date.now(),
            };
            this.formDrafts.set(formId, draft);

            // Salva todos os drafts
            const allDrafts = Object.fromEntries(this.formDrafts);
            await AsyncStorage.setItem(KEYS.FORM_DRAFTS, JSON.stringify(allDrafts));

            return true;
        } catch (error) {
            if (__DEV__) { console.error('[SessionService] Erro ao salvar draft:', error); }
            return false;
        }
    }

    getFormDraft(formId) {
        const draft = this.formDrafts.get(formId);
        if (!draft) return null;

        // Verifica se expirou
        if (Date.now() - draft.timestamp > FORM_DRAFT_EXPIRY) {
            this.formDrafts.delete(formId);
            return null;
        }

        return draft.data;
    }

    async clearFormDraft(formId) {
        this.formDrafts.delete(formId);
        const allDrafts = Object.fromEntries(this.formDrafts);
        await AsyncStorage.setItem(KEYS.FORM_DRAFTS, JSON.stringify(allDrafts));
    }

    hasFormDraft(formId) {
        return this.formDrafts.has(formId);
    }

    // ========================
    // PREFERÊNCIAS DO USUÁRIO
    // ========================
    async setPreference(key, value) {
        this.userPreferences[key] = value;
        await AsyncStorage.setItem(KEYS.USER_PREFERENCES, JSON.stringify(this.userPreferences));
    }

    getPreference(key, defaultValue = null) {
        return this.userPreferences[key] ?? defaultValue;
    }

    async clearPreferences() {
        this.userPreferences = {};
        await AsyncStorage.removeItem(KEYS.USER_PREFERENCES);
    }

    // ========================
    // ÚLTIMA ATIVIDADE
    // ========================
    async getTimeSinceLastActive() {
        try {
            const lastActive = await AsyncStorage.getItem(KEYS.LAST_ACTIVE);
            if (!lastActive) return null;
            return Date.now() - parseInt(lastActive, 10);
        } catch {
            return null;
        }
    }

    async updateLastActive() {
        await AsyncStorage.setItem(KEYS.LAST_ACTIVE, Date.now().toString());
    }

    // ========================
    // LIMPEZA
    // ========================
    async clearAll() {
        this.navigationState = null;
        this.recentScreens = [];
        this.formDrafts.clear();
        this.userPreferences = {};

        await Promise.all([
            AsyncStorage.removeItem(KEYS.NAVIGATION_STATE),
            AsyncStorage.removeItem(KEYS.RECENT_SCREENS),
            AsyncStorage.removeItem(KEYS.FORM_DRAFTS),
            AsyncStorage.removeItem(KEYS.USER_PREFERENCES),
        ]);
    }

    // ========================
    // SUGESTÕES PERSONALIZADAS
    // ========================
    getSuggestedActions() {
        const suggestions = [];
        const mostUsed = this.getMostUsedScreens(3);

        // Sugere telas mais usadas que não são a atual
        mostUsed.forEach(({ name }) => {
            if (name.includes('Checklist')) {
                suggestions.push({
                    type: 'quick_action',
                    label: 'Continuar Checklist',
                    screen: name,
                    icon: 'checkbox-outline',
                });
            }
            if (name.includes('Perfil')) {
                suggestions.push({
                    type: 'quick_action',
                    label: 'Ver Perfis',
                    screen: name,
                    icon: 'people-outline',
                });
            }
        });

        return suggestions.slice(0, 3);
    }
}

export const sessionService = new SessionService();

export default sessionService;
