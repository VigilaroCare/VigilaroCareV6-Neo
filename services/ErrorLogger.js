/**
 * ErrorLogger.js
 * Pilar 2: Estabilidade Absoluta - Instrumentação de Falhas
 * 
 * Centraliza logging de erros com contexto para diagnóstico rápido
 * Preparado para integração com Crashlytics/Sentry
 * 
 * Usage:
 * import { errorLogger } from '../services/ErrorLogger';
 * errorLogger.log(error, { screen: 'HomeScreen', action: 'loadData' });
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const ERROR_LOG_KEY = '@vigilaro_error_log';
const MAX_STORED_ERRORS = 50;
const ERROR_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 dias

class ErrorLogger {
    constructor() {
        this.context = {};
        this.errorQueue = [];
        this.initialized = false;
    }

    // ========================
    // INICIALIZAÇÃO
    // ========================
    async initialize() {
        try {
            const stored = await AsyncStorage.getItem(ERROR_LOG_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Filtra erros expirados
                const now = Date.now();
                this.errorQueue = parsed.filter(e => now - e.timestamp < ERROR_EXPIRY);
            }
            this.initialized = true;
            console.log(`[ErrorLogger] Inicializado com ${this.errorQueue.length} erros armazenados`);
        } catch (error) {
            if (__DEV__) { console.error('[ErrorLogger] Falha ao inicializar:', error); }
        }
    }

    // ========================
    // CONTEXTO GLOBAL
    // ========================
    setGlobalContext(context) {
        this.context = { ...this.context, ...context };
    }

    setUser(userId, userInfo = {}) {
        this.context.user = { id: userId, ...userInfo };
    }

    setScreen(screenName) {
        this.context.currentScreen = screenName;
    }

    // ========================
    // LOGGING
    // ========================
    async log(error, additionalContext = {}) {
        const errorEntry = this._createErrorEntry(error, additionalContext);

        // Log no console em desenvolvimento
        if (__DEV__) {
            console.error('[ErrorLogger]', errorEntry);
        }

        // Adiciona à fila
        this.errorQueue.unshift(errorEntry);
        if (this.errorQueue.length > MAX_STORED_ERRORS) {
            this.errorQueue = this.errorQueue.slice(0, MAX_STORED_ERRORS);
        }

        // Persiste
        await this._persist();

        // TODO: Integrar com Crashlytics/Sentry
        // crashlytics().recordError(error);
        // Sentry.captureException(error, { extra: errorEntry.context });

        return errorEntry.id;
    }

    // Log sem throw (para erros tratados)
    async logHandled(error, context = {}) {
        return this.log(error, { ...context, handled: true });
    }

    // Log com severidade
    async logWarning(message, context = {}) {
        return this.log(new Error(message), { ...context, severity: 'warning' });
    }

    async logInfo(message, context = {}) {
        return this.log(new Error(message), { ...context, severity: 'info' });
    }

    // ========================
    // BREADCRUMBS (rastro de ações)
    // ========================
    breadcrumbs = [];
    maxBreadcrumbs = 30;

    addBreadcrumb(action, data = {}) {
        this.breadcrumbs.push({
            action,
            data,
            timestamp: Date.now(),
        });

        if (this.breadcrumbs.length > this.maxBreadcrumbs) {
            this.breadcrumbs.shift();
        }
    }

    clearBreadcrumbs() {
        this.breadcrumbs = [];
    }

    // ========================
    // RECUPERAÇÃO DE LOGS
    // ========================
    getRecentErrors(count = 10) {
        return this.errorQueue.slice(0, count);
    }

    getErrorsByScreen(screenName) {
        return this.errorQueue.filter(e => e.context.screen === screenName);
    }

    getErrorStats() {
        const now = Date.now();
        const last24h = this.errorQueue.filter(e => now - e.timestamp < 24 * 60 * 60 * 1000);
        const lastHour = this.errorQueue.filter(e => now - e.timestamp < 60 * 60 * 1000);

        // Agrupa por tipo
        const byType = {};
        this.errorQueue.forEach(e => {
            byType[e.type] = (byType[e.type] || 0) + 1;
        });

        return {
            total: this.errorQueue.length,
            last24h: last24h.length,
            lastHour: lastHour.length,
            byType,
        };
    }

    async clearLogs() {
        this.errorQueue = [];
        await AsyncStorage.removeItem(ERROR_LOG_KEY);
    }

    // ========================
    // HELPERS PRIVADOS
    // ========================
    _createErrorEntry(error, additionalContext) {
        return {
            id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: Date.now(),
            type: error.name || 'Error',
            message: error.message || 'Unknown error',
            stack: error.stack?.split('\n').slice(0, 5).join('\n'),
            code: error.code,
            context: {
                ...this.context,
                ...additionalContext,
            },
            breadcrumbs: [...this.breadcrumbs].slice(-10),
            device: {
                // Expandir com info do dispositivo se necessário
                timestamp: new Date().toISOString(),
            },
        };
    }

    async _persist() {
        try {
            await AsyncStorage.setItem(ERROR_LOG_KEY, JSON.stringify(this.errorQueue));
        } catch (error) {
            if (__DEV__) { console.error('[ErrorLogger] Falha ao persistir logs:', error); }
        }
    }
}

export const errorLogger = new ErrorLogger();

// ========================
// ERROR BOUNDARY HELPER
// ========================
export function withErrorLogging(fn, context = {}) {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            await errorLogger.log(error, context);
            throw error;
        }
    };
}

// ========================
// SAFE ASYNC WRAPPER
// ========================
export async function safeAsync(fn, fallback = null, context = {}) {
    try {
        return await fn();
    } catch (error) {
        await errorLogger.logHandled(error, context);
        return fallback;
    }
}

export default errorLogger;
