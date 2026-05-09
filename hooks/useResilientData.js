/**
 * useResilientData.js
 * Hook customizado para dados resilientes
 * 
 * Combina:
 * - Loading states com skeleton
 * - Error states com retry
 * - Empty states com CTAs
 * - Cache local com fallback
 * 
 * Usage:
 * const { data, loading, error, retry, isEmpty } = useResilientData(
 *   'profiles',
 *   () => AsyncStorage.getItem('@perfis'),
 *   { cacheKey: 'profiles' }
 * );
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorLogger } from '../services/ErrorLogger';

export function useResilientData(
    key,
    fetchFn,
    options = {}
) {
    const {
        cacheKey = key,
        transform = (data) => data,
        initialData = null,
        refreshOnMount = true,
        onError = null,
        retryCount = 2,
    } = options;

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromCache, setFromCache] = useState(false);
    const attemptsRef = useRef(0);
    const mountedRef = useRef(true);

    const loadFromCache = useCallback(async () => {
        try {
            const cached = await AsyncStorage.getItem(`@cache_${cacheKey}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                return transform(parsed);
            }
        } catch {
            // Ignora erro de cache
        }
        return null;
    }, [cacheKey, transform]);

    const saveToCache = useCallback(async (value) => {
        try {
            await AsyncStorage.setItem(`@cache_${cacheKey}`, JSON.stringify(value));
        } catch {
            // Ignora erro de cache
        }
    }, [cacheKey]);

    const fetch = useCallback(async (isRetry = false) => {
        if (!mountedRef.current) return;

        if (!isRetry) {
            setLoading(true);
            setError(null);
        }

        try {
            const result = await fetchFn();

            if (!mountedRef.current) return;

            const transformed = transform(result);
            setData(transformed);
            setFromCache(false);
            setLoading(false);
            attemptsRef.current = 0;

            // Salva em cache
            if (transformed !== null) {
                await saveToCache(result);
            }

        } catch (err) {
            if (!mountedRef.current) return;

            // Log do erro
            errorLogger.logHandled(err, { hook: 'useResilientData', key });

            // Tenta cache como fallback
            const cached = await loadFromCache();
            if (cached !== null) {
                setData(cached);
                setFromCache(true);
                setLoading(false);
                setError({ ...err, cached: true });
                return;
            }

            // Retry automático
            if (attemptsRef.current < retryCount) {
                attemptsRef.current++;
                const delay = Math.pow(2, attemptsRef.current) * 500;
                setTimeout(() => fetch(true), delay);
                return;
            }

            setError(err);
            setLoading(false);

            if (onError) {
                onError(err);
            }
        }
    }, [fetchFn, transform, loadFromCache, saveToCache, retryCount, onError, key]);

    const retry = useCallback(() => {
        attemptsRef.current = 0;
        fetch();
    }, [fetch]);

    const refresh = useCallback(async () => {
        setLoading(true);
        await fetch();
    }, [fetch]);

    useEffect(() => {
        mountedRef.current = true;

        if (refreshOnMount) {
            fetch();
        }

        return () => {
            mountedRef.current = false;
        };
    }, []);

    return {
        data,
        loading,
        error,
        fromCache,
        isEmpty: !loading && !error && (data === null || (Array.isArray(data) && data.length === 0)),
        retry,
        refresh,
        setData,
    };
}

/**
 * Hook para formulários com draft automático
 */
export function useFormDraft(formId, initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [isDirty, setIsDirty] = useState(false);
    const DRAFT_KEY = `@draft_${formId}`;

    // Carrega draft existente
    useEffect(() => {
        const loadDraft = async () => {
            try {
                const draft = await AsyncStorage.getItem(DRAFT_KEY);
                if (draft) {
                    const parsed = JSON.parse(draft);
                    setValues(prev => ({ ...prev, ...parsed }));
                    setIsDirty(true);
                }
            } catch {
                // Ignora
            }
        };
        loadDraft();
    }, [formId]);

    // Salva draft quando valores mudam
    const updateValue = useCallback((key, value) => {
        setValues(prev => {
            const updated = { ...prev, [key]: value };
            // Salva draft de forma assíncrona
            AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(updated)).catch(() => { });
            return updated;
        });
        setIsDirty(true);
    }, [DRAFT_KEY]);

    const clearDraft = useCallback(async () => {
        await AsyncStorage.removeItem(DRAFT_KEY);
        setIsDirty(false);
    }, [DRAFT_KEY]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        clearDraft();
    }, [initialValues, clearDraft]);

    return {
        values,
        setValues,
        updateValue,
        isDirty,
        clearDraft,
        resetForm,
    };
}

/**
 * Hook para estado de conexão
 */
export function useNetworkStatus() {
    const [isConnected, setIsConnected] = useState(true);
    const [connectionType, setConnectionType] = useState(null);

    useEffect(() => {
        let NetInfo;
        try {
            NetInfo = require('@react-native-community/netinfo').default;
        } catch {
            return;
        }

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected && state.isInternetReachable !== false);
            setConnectionType(state.type);
        });

        return () => unsubscribe();
    }, []);

    return { isConnected, connectionType };
}

export default useResilientData;
