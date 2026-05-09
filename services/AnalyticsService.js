/**
 * AnalyticsService.js
 * Pilar III: Inteligência de Produto - Análise Comportamental
 * 
 * Instrumentação para rastrear eventos, funis de conversão e propriedades de usuário.
 * Preparado para integração com Firebase Analytics, Amplitude ou Mixpanel.
 * 
 * Usage:
 * import { analytics } from '../services/AnalyticsService';
 * analytics.trackEvent('checklist_completed', { area: 'cozinha', score: 85 });
 */

const DEBUG = __DEV__;

// ========================
// EVENTOS PADRONIZADOS
// ========================
export const EVENTS = {
    // Onboarding & Primeiro Valor
    ONBOARDING_STARTED: 'onboarding_started',
    ONBOARDING_STEP_COMPLETED: 'onboarding_step_completed',
    ONBOARDING_COMPLETED: 'onboarding_completed',
    FIRST_PROFILE_CREATED: 'first_profile_created',
    FIRST_CHECKLIST_COMPLETED: 'first_checklist_completed',

    // Engajamento Core
    SCREEN_VIEW: 'screen_view',
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',

    // Perfis
    PROFILE_CREATED: 'profile_created',
    PROFILE_EDITED: 'profile_edited',
    PROFILE_DELETED: 'profile_deleted',

    // Checklists & Segurança
    CHECKLIST_STARTED: 'checklist_started',
    CHECKLIST_COMPLETED: 'checklist_completed',
    CHECKLIST_ABANDONED: 'checklist_abandoned',
    RISK_IDENTIFIED: 'risk_identified',
    SAFETY_SCORE_CALCULATED: 'safety_score_calculated',

    // Emergência
    SOS_ACTIVATED: 'sos_activated',
    EMERGENCY_CONTACT_CALLED: 'emergency_contact_called',
    CIATOX_ACCESSED: 'ciatox_accessed',

    // IA & Scanner
    AI_ASSISTANT_USED: 'ai_assistant_used',
    PRODUCT_SCANNED: 'product_scanned',
    RISK_ANALYSIS_COMPLETED: 'risk_analysis_completed',

    // Conteúdo
    CONTENT_VIEWED: 'content_viewed',
    CONTENT_SHARED: 'content_shared',
    SEARCH_PERFORMED: 'search_performed',

    // Gamificação
    ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
    LEVEL_UP: 'level_up',
    XP_EARNED: 'xp_earned',

    // Erros & Performance
    ERROR_OCCURRED: 'error_occurred',
    FEATURE_UNAVAILABLE: 'feature_unavailable',
    OFFLINE_ACTION_QUEUED: 'offline_action_queued',
};

// ========================
// PROPRIEDADES DE USUÁRIO
// ========================
export const USER_PROPERTIES = {
    PROFILE_COUNT: 'profile_count',
    HAS_PET: 'has_pet',
    HAS_CHILD: 'has_child',
    HAS_ELDERLY: 'has_elderly',
    SAFETY_SCORE: 'safety_score',
    CHECKLISTS_COMPLETED: 'checklists_completed',
    APP_VERSION: 'app_version',
    ONBOARDING_COMPLETED: 'onboarding_completed',
    DAYS_SINCE_INSTALL: 'days_since_install',
    USER_LEVEL: 'user_level',
};

// ========================
// FUNIS DE CONVERSÃO
// ========================
export const FUNNELS = {
    ONBOARDING: [
        'onboarding_started',
        'onboarding_step_completed',
        'first_profile_created',
        'onboarding_completed',
    ],
    FIRST_VALUE: [
        'onboarding_completed',
        'first_checklist_started',
        'first_checklist_completed',
        'safety_score_calculated',
    ],
    ENGAGEMENT_LOOP: [
        'session_start',
        'checklist_started',
        'risk_identified',
        'content_viewed',
    ],
};

// ========================
// ANALYTICS SERVICE
// ========================
class AnalyticsService {
    constructor() {
        this.userId = null;
        this.sessionId = null;
        this.userProperties = {};
        this.eventQueue = [];
        this.initialized = false;
    }

    // ========================
    // INICIALIZAÇÃO
    // ========================
    async initialize() {
        try {
            // TODO: Inicializar Firebase Analytics
            // await firebase.analytics().setAnalyticsCollectionEnabled(true);

            this.sessionId = `session_${Date.now()}`;
            this.initialized = true;

            // Registra início de sessão
            this.trackEvent(EVENTS.SESSION_START, {
                session_id: this.sessionId,
            });

            if (DEBUG) console.log('[Analytics] Inicializado');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('[Analytics] Erro ao inicializar:', error); }
            return false;
        }
    }

    // ========================
    // IDENTIFICAÇÃO
    // ========================
    setUserId(userId) {
        this.userId = userId;
        // TODO: firebase.analytics().setUserId(userId);
        if (DEBUG) console.log('[Analytics] UserId:', userId);
    }

    setUserProperties(properties) {
        this.userProperties = { ...this.userProperties, ...properties };

        // TODO: Enviar para Firebase
        // Object.entries(properties).forEach(([key, value]) => {
        //     firebase.analytics().setUserProperty(key, String(value));
        // });

        if (DEBUG) console.log('[Analytics] UserProperties:', properties);
    }

    // ========================
    // RASTREAMENTO DE EVENTOS
    // ========================
    trackEvent(eventName, params = {}) {
        const event = {
            name: eventName,
            params: {
                ...params,
                timestamp: Date.now(),
                session_id: this.sessionId,
            },
        };

        // TODO: Enviar para Firebase
        // firebase.analytics().logEvent(eventName, event.params);

        if (DEBUG) {
            console.log(`[Analytics] Event: ${eventName}`, event.params);
        }

        // Armazena para batch sending se offline
        this.eventQueue.push(event);

        return event;
    }

    // ========================
    // HELPERS DE EVENTOS COMUNS
    // ========================
    trackScreenView(screenName, screenClass = null) {
        return this.trackEvent(EVENTS.SCREEN_VIEW, {
            screen_name: screenName,
            screen_class: screenClass || screenName,
        });
    }

    trackChecklistCompleted(area, score, itemsTotal, itemsCompleted) {
        return this.trackEvent(EVENTS.CHECKLIST_COMPLETED, {
            checklist_area: area,
            safety_score: score,
            items_total: itemsTotal,
            items_completed: itemsCompleted,
            completion_rate: Math.round((itemsCompleted / itemsTotal) * 100),
        });
    }

    trackProfileCreated(profileType, ageGroup = null) {
        return this.trackEvent(EVENTS.PROFILE_CREATED, {
            profile_type: profileType, // 'child', 'adult', 'elderly', 'pet'
            age_group: ageGroup,
        });
    }

    trackSOSActivated(sosType, contactsCalled = 0) {
        return this.trackEvent(EVENTS.SOS_ACTIVATED, {
            sos_type: sosType, // 'human', 'pet'
            contacts_called: contactsCalled,
            is_emergency: true,
        });
    }

    trackContentShared(contentType, contentId, shareMethod) {
        return this.trackEvent(EVENTS.CONTENT_SHARED, {
            content_type: contentType,
            content_id: contentId,
            share_method: shareMethod, // 'whatsapp', 'copy', 'native'
        });
    }

    trackError(errorType, errorMessage, screen = null) {
        return this.trackEvent(EVENTS.ERROR_OCCURRED, {
            error_type: errorType,
            error_message: errorMessage?.substring(0, 100),
            screen_name: screen,
        });
    }

    // ========================
    // FUNIL DE CONVERSÃO
    // ========================
    trackFunnelStep(funnelName, stepIndex, stepName, success = true) {
        return this.trackEvent('funnel_step', {
            funnel_name: funnelName,
            step_index: stepIndex,
            step_name: stepName,
            success: success,
        });
    }

    // ========================
    // TEMPO DE ENGAJAMENTO
    // ========================
    startTimer(timerName) {
        this[`_timer_${timerName}`] = Date.now();
    }

    endTimer(timerName, eventName = null) {
        const startTime = this[`_timer_${timerName}`];
        if (!startTime) return 0;

        const duration = Date.now() - startTime;
        delete this[`_timer_${timerName}`];

        if (eventName) {
            this.trackEvent(eventName, {
                duration_ms: duration,
                duration_seconds: Math.round(duration / 1000),
            });
        }

        return duration;
    }

    // ========================
    // SESSÃO
    // ========================
    endSession() {
        this.trackEvent(EVENTS.SESSION_END, {
            session_id: this.sessionId,
            events_count: this.eventQueue.length,
        });
    }

    // ========================
    // DEBUG & EXPORT
    // ========================
    getEventQueue() {
        return [...this.eventQueue];
    }

    clearEventQueue() {
        this.eventQueue = [];
    }

    exportEvents() {
        return JSON.stringify(this.eventQueue, null, 2);
    }
}

export const analytics = new AnalyticsService();

export default analytics;
