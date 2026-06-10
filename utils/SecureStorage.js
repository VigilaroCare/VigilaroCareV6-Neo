/**
 * SecureStorage.js
 * Wrapper unificado de persistência que roteia chaves SENSÍVEIS (PII / saúde)
 * para expo-secure-store (criptografado pelo Keychain/Keystore) e mantém o
 * restante em AsyncStorage.
 *
 * COMO ADOTAR (incremental e seguro):
 *   1. Troque `import AsyncStorage from '@react-native-async-storage/async-storage'`
 *      por `import { Storage } from '../utils/SecureStorage'` no arquivo.
 *   2. Troque as chamadas AsyncStorage.xxx(key, ...) por Storage.xxx(key, ...).
 *   3. Teste o fluxo no Expo Go (a migração de dados legados acontece sozinha
 *      na primeira leitura — ver `migration-on-read` abaixo).
 *
 * MIGRAÇÃO AUTOMÁTICA (migration-on-read):
 *   Na primeira leitura de uma chave sensível, se o valor ainda estiver no
 *   AsyncStorage legado (texto plano), ele é copiado para o SecureStore e
 *   removido do plano. Nenhum dado do usuário é perdido — inclusive contatos
 *   de emergência e medicamentos.
 *
 * LIMITE DE TAMANHO:
 *   O SecureStore avisa para valores > 2KB no Android. Listas grandes
 *   (ex.: histórico extenso) devem ser fatiadas (chunking) ou mantidas em
 *   AsyncStorage com conteúdo cifrado por chave derivada. Por isso a lista
 *   SENSITIVE_KEYS abaixo é conservadora: apenas dados de identidade/saúde
 *   tipicamente pequenos.
 */

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves que contêm PII ou dados de saúde e DEVEM ser criptografadas em repouso.
const SENSITIVE_KEYS = new Set([
    '@medications',
    '@emergency_contacts',
    '@fall_config',
    '@health_profile',
    '@family_profiles',
]);

// expo-secure-store só aceita [A-Za-z0-9._-] na chave; '@' não é válido.
const secureKey = (key) => 'vgl_' + key.replace(/[^A-Za-z0-9._-]/g, '_');

const serialize = (value) =>
    typeof value === 'string' ? value : JSON.stringify(value);

export const Storage = {
    async setItem(key, value) {
        const data = serialize(value);
        if (SENSITIVE_KEYS.has(key)) {
            try {
                await SecureStore.setItemAsync(secureKey(key), data);
                // Remove eventual resíduo legado em texto plano.
                await AsyncStorage.removeItem(key).catch(() => {});
                return;
            } catch (e) {
                // Fallback defensivo: nunca quebrar gravação de dado crítico.
                if (__DEV__) console.warn('[SecureStorage] setItem fallback:', key, e?.message);
            }
        }
        return AsyncStorage.setItem(key, data);
    },

    async getItem(key) {
        if (SENSITIVE_KEYS.has(key)) {
            try {
                const secure = await SecureStore.getItemAsync(secureKey(key));
                if (secure != null) return secure;

                // migration-on-read: valor ainda no AsyncStorage legado.
                const legacy = await AsyncStorage.getItem(key);
                if (legacy != null) {
                    await SecureStore.setItemAsync(secureKey(key), legacy);
                    await AsyncStorage.removeItem(key).catch(() => {});
                    return legacy;
                }
                return null;
            } catch (e) {
                if (__DEV__) console.warn('[SecureStorage] getItem fallback:', key, e?.message);
                return AsyncStorage.getItem(key);
            }
        }
        return AsyncStorage.getItem(key);
    },

    async removeItem(key) {
        if (SENSITIVE_KEYS.has(key)) {
            await SecureStore.deleteItemAsync(secureKey(key)).catch(() => {});
            await AsyncStorage.removeItem(key).catch(() => {});
            return;
        }
        return AsyncStorage.removeItem(key);
    },

    isSensitive(key) {
        return SENSITIVE_KEYS.has(key);
    },
};

export default Storage;
