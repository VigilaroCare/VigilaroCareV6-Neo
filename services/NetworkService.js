/**
 * NetworkService.js
 * Pilar 3: Robustez Resiliente - Camada de Rede Resiliente
 * 
 * Implementa:
 * - Retry with Exponential Backoff
 * - Circuit Breaker pattern
 * - Request timeout
 * - Offline queue para sincronização
 * 
 * Usage:
 * import { resilientFetch, networkService } from '../services/NetworkService';
 * const data = await resilientFetch('https://api.example.com/data');
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

// ========================
// CONFIGURAÇÕES
// ========================
const CONFIG = {
    // Retry
    maxRetries: 3,
    baseDelay: 1000, // 1 segundo
    maxDelay: 30000, // 30 segundos

    // Circuit Breaker
    failureThreshold: 5, // Falhas antes de abrir o circuito
    resetTimeout: 300000, // 5 minutos para tentar novamente

    // Timeout
    requestTimeout: 15000, // 15 segundos

    // Offline Queue
    offlineQueueKey: '@vigilaro_offline_queue',
};

// ========================
// CIRCUIT BREAKER
// ========================
class CircuitBreaker {
    constructor(name) {
        this.name = name;
        this.failures = 0;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.lastFailureTime = null;
        this.successCount = 0;
    }

    recordSuccess() {
        this.failures = 0;
        this.successCount++;
        if (this.state === 'HALF_OPEN') {
            this.state = 'CLOSED';
            console.log(`[CircuitBreaker:${this.name}] Fechado após sucesso`);
        }
    }

    recordFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();
        this.successCount = 0;

        if (this.failures >= CONFIG.failureThreshold) {
            this.state = 'OPEN';
            console.log(`[CircuitBreaker:${this.name}] ABERTO após ${this.failures} falhas`);
        }
    }

    canRequest() {
        if (this.state === 'CLOSED') {
            return true;
        }

        if (this.state === 'OPEN') {
            const timeSinceLastFailure = Date.now() - this.lastFailureTime;
            if (timeSinceLastFailure >= CONFIG.resetTimeout) {
                this.state = 'HALF_OPEN';
                console.log(`[CircuitBreaker:${this.name}] HALF_OPEN - testando conexão`);
                return true;
            }
            return false;
        }

        // HALF_OPEN - permite uma requisição de teste
        return true;
    }

    getState() {
        return {
            name: this.name,
            state: this.state,
            failures: this.failures,
            canRequest: this.canRequest(),
        };
    }
}

// Circuitos por domínio/serviço
const circuits = new Map();

function getCircuit(url) {
    try {
        const domain = new URL(url).hostname;
        if (!circuits.has(domain)) {
            circuits.set(domain, new CircuitBreaker(domain));
        }
        return circuits.get(domain);
    } catch {
        return new CircuitBreaker('default');
    }
}

// ========================
// RETRY WITH EXPONENTIAL BACKOFF
// ========================
function calculateDelay(attempt) {
    // Exponential backoff: 1s, 2s, 4s, 8s... até maxDelay
    const delay = Math.min(
        CONFIG.baseDelay * Math.pow(2, attempt),
        CONFIG.maxDelay
    );
    // Adiciona jitter (variação aleatória) para evitar thundering herd
    const jitter = delay * 0.2 * Math.random();
    return delay + jitter;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================
// TIMEOUT WRAPPER
// ========================
function fetchWithTimeout(url, options = {}, timeout = CONFIG.requestTimeout) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('TIMEOUT')), timeout)
        )
    ]);
}

// ========================
// RESILIENT FETCH (Função Principal)
// ========================
export async function resilientFetch(url, options = {}) {
    const circuit = getCircuit(url);

    // Verifica circuit breaker
    if (!circuit.canRequest()) {
        const error = new Error('CIRCUIT_OPEN');
        error.code = 'CIRCUIT_OPEN';
        error.circuitState = circuit.getState();
        throw error;
    }

    let lastError;

    for (let attempt = 0; attempt <= CONFIG.maxRetries; attempt++) {
        try {
            // Adiciona headers padrão
            const mergedOptions = {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            };

            const response = await fetchWithTimeout(url, mergedOptions);

            // Erros de servidor (5xx) são retriable
            if (response.status >= 500) {
                throw new Error(`SERVER_ERROR_${response.status}`);
            }

            // Sucesso ou erro de cliente (4xx - não retriable)
            circuit.recordSuccess();
            return response;

        } catch (error) {
            lastError = error;
            circuit.recordFailure();

            // Não faz retry para erros de cliente (4xx)
            if (error.message?.includes('4')) {
                throw error;
            }

            // Não faz retry se é a última tentativa
            if (attempt === CONFIG.maxRetries) {
                break;
            }

            // Espera com exponential backoff antes do próximo retry
            const delay = calculateDelay(attempt);
            console.log(`[NetworkService] Retry ${attempt + 1}/${CONFIG.maxRetries} em ${delay}ms`);
            await sleep(delay);
        }
    }

    // Todas as tentativas falharam
    throw lastError;
}

// ========================
// OFFLINE QUEUE
// ========================
class OfflineQueue {
    async add(request) {
        try {
            const queue = await this.getQueue();
            queue.push({
                id: Date.now().toString(),
                timestamp: new Date().toISOString(),
                ...request,
            });
            await AsyncStorage.setItem(CONFIG.offlineQueueKey, JSON.stringify(queue));
            console.log('[OfflineQueue] Requisição adicionada à fila');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('[OfflineQueue] Erro ao adicionar à fila:', error); }
            return false;
        }
    }

    async getQueue() {
        try {
            const data = await AsyncStorage.getItem(CONFIG.offlineQueueKey);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    async processQueue() {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            console.log('[OfflineQueue] Sem conexão, mantendo fila');
            return { processed: 0, failed: 0, remaining: 0 };
        }

        const queue = await this.getQueue();
        if (queue.length === 0) {
            return { processed: 0, failed: 0, remaining: 0 };
        }

        console.log(`[OfflineQueue] Processando ${queue.length} itens`);

        const results = { processed: 0, failed: 0, remaining: 0 };
        const remaining = [];

        for (const item of queue) {
            try {
                await resilientFetch(item.url, item.options);
                results.processed++;
            } catch (error) {
                console.log(`[OfflineQueue] Falha ao processar item ${item.id}:`, error.message);
                remaining.push(item);
                results.failed++;
            }
        }

        results.remaining = remaining.length;
        await AsyncStorage.setItem(CONFIG.offlineQueueKey, JSON.stringify(remaining));

        return results;
    }

    async clear() {
        await AsyncStorage.removeItem(CONFIG.offlineQueueKey);
    }
}

export const offlineQueue = new OfflineQueue();

// ========================
// NETWORK SERVICE (Singleton)
// ========================
class NetworkService {
    constructor() {
        this.isConnected = true;
        this.connectionType = null;
        this.listeners = new Set();

        // Inicia monitoramento
        this.unsubscribe = NetInfo.addEventListener(state => {
            const wasConnected = this.isConnected;
            this.isConnected = state.isConnected && state.isInternetReachable !== false;
            this.connectionType = state.type;

            // Notifica listeners
            this.listeners.forEach(listener => listener(this.isConnected, state));

            // Auto-processa fila quando reconecta
            if (!wasConnected && this.isConnected) {
                console.log('[NetworkService] Conexão restaurada, processando fila offline');
                offlineQueue.processQueue();
            }
        });
    }

    addListener(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    getStatus() {
        return {
            isConnected: this.isConnected,
            connectionType: this.connectionType,
            circuits: Array.from(circuits.entries()).map(([name, circuit]) => circuit.getState()),
        };
    }

    async checkConnectivity() {
        const state = await NetInfo.fetch();
        return state.isConnected && state.isInternetReachable !== false;
    }

    // Helper para requisições com fallback offline
    async fetchWithOfflineFallback(url, options = {}, cacheKey = null) {
        try {
            // Tenta requisição normal
            const response = await resilientFetch(url, options);
            const data = await response.json();

            // Salva em cache se tiver cacheKey
            if (cacheKey) {
                await AsyncStorage.setItem(`@cache_${cacheKey}`, JSON.stringify({
                    data,
                    timestamp: Date.now(),
                }));
            }

            return { data, fromCache: false };
        } catch (error) {
            // Tenta cache se disponível
            if (cacheKey) {
                try {
                    const cached = await AsyncStorage.getItem(`@cache_${cacheKey}`);
                    if (cached) {
                        const parsed = JSON.parse(cached);
                        return { data: parsed.data, fromCache: true, cacheAge: Date.now() - parsed.timestamp };
                    }
                } catch {
                    // Ignora erro de cache
                }
            }

            // Se for operação de escrita e estiver offline, adiciona à fila
            if (options.method && options.method !== 'GET' && !this.isConnected) {
                await offlineQueue.add({ url, options });
                throw new Error('QUEUED_OFFLINE');
            }

            throw error;
        }
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

export const networkService = new NetworkService();

export default {
    resilientFetch,
    offlineQueue,
    networkService,
};
