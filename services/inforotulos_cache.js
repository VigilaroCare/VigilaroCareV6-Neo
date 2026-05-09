/**
 * inforotulos_cache.js
 * Cache AsyncStorage para dados de substâncias (InfoRótulos)
 * 
 * - Limite: 200 entradas (LRU — Least Recently Used)
 * - Expiração: 30 dias
 * - Chave: @vigilaro_inforotulos_cache
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = '@vigilaro_inforotulos_cache';
const MAX_ENTRIES = 200;
const EXPIRY_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

/**
 * Carrega o cache inteiro do AsyncStorage.
 * @returns {Object} { [key]: { data, cachedAt, lastAccessed } }
 */
async function loadCache() {
    try {
        const raw = await AsyncStorage.getItem(CACHE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

/**
 * Persiste o cache no AsyncStorage.
 */
async function saveCache(cache) {
    try {
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (e) {
        if (__DEV__) console.warn('[InfoRotulosCache] save error:', e.message);
    }
}

/**
 * Aplica eviction LRU se o cache ultrapassar MAX_ENTRIES.
 */
function evictIfNeeded(cache) {
    const keys = Object.keys(cache);
    if (keys.length <= MAX_ENTRIES) return cache;

    // Ordena por lastAccessed (mais antigo primeiro)
    const sorted = keys.sort(
        (a, b) => (cache[a].lastAccessed || 0) - (cache[b].lastAccessed || 0)
    );

    // Remove os mais antigos até caber
    const toRemove = sorted.slice(0, keys.length - MAX_ENTRIES);
    for (const key of toRemove) {
        delete cache[key];
    }

    return cache;
}

/**
 * Busca entrada no cache.
 * @param {string} key - Nome normalizado da substância
 * @returns {{ data: Object, fresh: boolean } | null}
 */
export async function getCached(key) {
    if (!key) return null;
    const normalizedKey = key.trim().toLowerCase();

    const cache = await loadCache();
    const entry = cache[normalizedKey];

    if (!entry) return null;

    const age = Date.now() - (entry.cachedAt || 0);
    const fresh = age < EXPIRY_MS;

    // Atualiza lastAccessed (LRU touch)
    cache[normalizedKey].lastAccessed = Date.now();
    // Salva sem await para não bloquear
    saveCache(cache);

    return { data: entry.data, fresh };
}

/**
 * Salva entrada no cache.
 * @param {string} key - Nome normalizado da substância
 * @param {Object} data - Dados da substância
 */
export async function setCached(key, data) {
    if (!key || !data) return;
    const normalizedKey = key.trim().toLowerCase();

    const cache = await loadCache();

    cache[normalizedKey] = {
        data,
        cachedAt: Date.now(),
        lastAccessed: Date.now(),
    };

    const trimmed = evictIfNeeded(cache);
    await saveCache(trimmed);
}

/**
 * Verifica se uma entrada existe (independente de frescor).
 */
export async function hasCached(key) {
    if (!key) return false;
    const cache = await loadCache();
    return !!cache[key.trim().toLowerCase()];
}

/**
 * Remove uma entrada específica.
 */
export async function removeCached(key) {
    if (!key) return;
    const cache = await loadCache();
    delete cache[key.trim().toLowerCase()];
    await saveCache(cache);
}

/**
 * Limpa todo o cache.
 */
export async function clearCache() {
    try {
        await AsyncStorage.removeItem(CACHE_KEY);
    } catch {
        // silencioso
    }
}

// ─────────────────────────────────
// Cache de histórico de consultas
// ─────────────────────────────────

const HISTORY_KEY = '@vigilaro_inforotulos_history';
const MAX_HISTORY = 10;

/**
 * Salva uma consulta no histórico.
 */
export async function addToHistory(item) {
    try {
        const raw = await AsyncStorage.getItem(HISTORY_KEY);
        let history = raw ? JSON.parse(raw) : [];

        // Remove duplicata se existir
        history = history.filter(h => h.id !== item.id);

        // Adiciona no topo
        history.unshift({
            ...item,
            consultedAt: Date.now(),
        });

        // Limita
        if (history.length > MAX_HISTORY) {
            history = history.slice(0, MAX_HISTORY);
        }

        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
        if (__DEV__) console.warn('[InfoRotulosCache] history error:', e.message);
    }
}

/**
 * Retorna o histórico de consultas.
 * @param {number} limit - Máximo de itens
 */
export async function getHistory(limit = 5) {
    try {
        const raw = await AsyncStorage.getItem(HISTORY_KEY);
        const history = raw ? JSON.parse(raw) : [];
        return history.slice(0, limit);
    } catch {
        return [];
    }
}
