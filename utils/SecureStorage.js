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
 *   3. IMPORTANTE: migre TODOS os leitores/escritores de uma mesma chave de
 *      uma vez — adoção parcial causa split-brain (um lado escreve no plano,
 *      o outro lê do seguro e enxerga dado obsoleto).
 *
 * MIGRAÇÃO AUTOMÁTICA (migration-on-read):
 *   Na primeira leitura de uma chave sensível, se o valor ainda estiver no
 *   AsyncStorage legado (texto plano), ele é copiado para o SecureStore e
 *   removido do plano. Nenhum dado do usuário é perdido — inclusive contatos
 *   de emergência e medicamentos.
 *
 * VALORES GRANDES (chunking):
 *   O SecureStore do Android limita valores a ~2048 bytes. Valores maiores
 *   (ex.: histórico de medicação) são fatiados em chunks `<key>__c0..cN` com
 *   um marcador `__chunked:N` na chave principal. Transparente para o caller.
 */

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chaves que contêm PII ou dados de saúde e DEVEM ser criptografadas em
// repouso. Esta lista espelha as chaves REALMENTE usadas no código — ao
// criar uma chave sensível nova, adicione aqui E use Storage em vez de
// AsyncStorage em todos os pontos de leitura/escrita.
//
// NOTA: '@vigilaro_data' (perfis) fica fora por decisão documentada — é lida
// no caminho crítico de boot (App.js) e pode crescer além do razoável para o
// Keystore; contém nomes/idades, sensibilidade menor que medicação/contatos.
//
// VEREDITO das demais chaves avaliadas (auditoria 2026-06-12, item C15) —
// permanecem em AsyncStorage por decisão consciente:
//   '@home_mapping', 'historicoAvaliacoes', '@asilo/@escola_segura_responses'
//     -> avaliações de risco do ambiente (sem identidade vinculada); volume
//        pode crescer além do confortável para o Keystore.
//   '@active_trip' -> configuração de viagem (flags de composição familiar);
//        ciclo de vida curto, apagada no fim da viagem.
// Reavaliar se qualquer uma passar a carregar nome/saúde/identificadores.
const SENSITIVE_KEYS = new Set([
    '@emergency_contacts',      // SOS*, PanicButtonService, OpenAIService
    '@medications',             // OpenAIService (chave legada, só leitura)
    '@medications_timeline',    // MedicationsScreen
    '@medications_history',     // MedicationsScreen
    '@vigilaro_medications_v1', // HealthService, MedicationService
    '@medical_history',         // HealthService
    '@treatments',              // HealthService
    '@appointments',            // HealthService
    '@procedures',              // HealthService
]);

// expo-secure-store só aceita [A-Za-z0-9._-] na chave; '@' não é válido.
const secureKey = (key) => 'vgl_' + key.replace(/[^A-Za-z0-9._-]/g, '_');

const serialize = (value) =>
    typeof value === 'string' ? value : JSON.stringify(value);

// ---------------------------------------------------------------------------
// CHUNKING — contorna o limite de ~2048 bytes do Keystore Android.
// Folga deixada para overhead de encoding do provider.
// ---------------------------------------------------------------------------
const CHUNK_SIZE = 1800;
const CHUNK_MARKER = '__chunked:';
const MAX_CHUNKS = 64; // ~115KB — acima disso o dado não pertence ao Keystore

async function setSecureValue(sKey, data) {
    if (data.length <= CHUNK_SIZE) {
        await SecureStore.setItemAsync(sKey, data);
        await clearChunks(sKey, 0);
        return;
    }
    const total = Math.ceil(data.length / CHUNK_SIZE);
    if (total > MAX_CHUNKS) {
        throw new Error(`[SecureStorage] Valor de ${sKey} excede o máximo suportado (${MAX_CHUNKS * CHUNK_SIZE} bytes)`);
    }
    for (let i = 0; i < total; i++) {
        await SecureStore.setItemAsync(
            `${sKey}__c${i}`,
            data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
        );
    }
    // O marcador leva também o TAMANHO total (`__chunked:N:LEN`): se uma
    // regravação for interrompida entre os chunks e o marcador, a leitura
    // poderia juntar chunks novos+velhos — o LEN detecta a mistura e a
    // leitura devolve null (ausente) em vez de JSON corrompido ao caller.
    await SecureStore.setItemAsync(sKey, `${CHUNK_MARKER}${total}:${data.length}`);
    await clearChunks(sKey, total);
}

async function getSecureValue(sKey) {
    const main = await SecureStore.getItemAsync(sKey);
    if (main == null || !main.startsWith(CHUNK_MARKER)) return main;

    // Formato: `__chunked:N` (legado) ou `__chunked:N:LEN` (com validação).
    const [totalStr, lenStr] = main.slice(CHUNK_MARKER.length).split(':');
    const total = parseInt(totalStr, 10);
    const expectedLen = lenStr != null ? parseInt(lenStr, 10) : null;
    if (!Number.isFinite(total) || total <= 0) return null;

    const parts = [];
    for (let i = 0; i < total; i++) {
        const part = await SecureStore.getItemAsync(`${sKey}__c${i}`);
        if (part == null) return null; // chunk perdido => trata como ausente
        parts.push(part);
    }
    const joined = parts.join('');
    // Tamanho diverge do gravado => gravação interrompida misturou gerações
    // de chunks. Melhor "ausente" que JSON corrompido em dado de saúde.
    if (Number.isFinite(expectedLen) && joined.length !== expectedLen) return null;
    return joined;
}

// Remove chunks residuais de uma gravação anterior maior que a atual.
async function clearChunks(sKey, fromIndex) {
    for (let i = fromIndex; i < MAX_CHUNKS; i++) {
        const existing = await SecureStore.getItemAsync(`${sKey}__c${i}`).catch(() => null);
        if (existing == null) break; // chunks são sequenciais — pode parar
        await SecureStore.deleteItemAsync(`${sKey}__c${i}`).catch(() => {});
    }
}

// ---------------------------------------------------------------------------
// API PÚBLICA — drop-in para AsyncStorage (getItem/setItem/removeItem)
// ---------------------------------------------------------------------------
export const Storage = {
    async setItem(key, value) {
        const data = serialize(value);
        if (SENSITIVE_KEYS.has(key)) {
            try {
                await setSecureValue(secureKey(key), data);
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
                const secure = await getSecureValue(secureKey(key));
                if (secure != null) return secure;

                // migration-on-read: valor ainda no AsyncStorage legado.
                const legacy = await AsyncStorage.getItem(key);
                if (legacy != null) {
                    await setSecureValue(secureKey(key), legacy);
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
            const sKey = secureKey(key);
            await SecureStore.deleteItemAsync(sKey).catch(() => {});
            await clearChunks(sKey, 0).catch(() => {});
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
