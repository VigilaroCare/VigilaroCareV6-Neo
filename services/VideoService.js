/**
 * VideoService.js
 * ServiÃ§o para gerenciamento de vÃ­deos com cache inteligente
 * Suporta streaming CDN + cache local para offline
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import NetInfo from '@react-native-community/netinfo';

const VIDEO_CACHE_DIR = `${FileSystem.cacheDirectory}videos/`;
const CACHE_INDEX_KEY = '@video_cache_index';
const MAX_CACHE_SIZE_MB = 200; // Limite de 200MB para cache de vÃ­deos
const MAX_CACHE_SIZE_BYTES = MAX_CACHE_SIZE_MB * 1024 * 1024;

// ConfiguraÃ§Ã£o do CDN (serÃ¡ configurado quando vÃ­deos estiverem prontos)
const CDN_CONFIG = {
    baseUrl: 'https://cdn.vigilaro.care/videos', // Placeholder - serÃ¡ configurado
    fallbackUrl: null,
};

class VideoService {
    constructor() {
        this.cacheIndex = {};
        this.isOnline = true;
        this.initialized = false;
    }

    // ==========================================
    // INICIALIZAÃ‡ÃƒO
    // ==========================================
    async initialize() {
        try {
            // Criar diretÃ³rio de cache se nÃ£o existir (SDK 54+)
            try {
                await FileSystem.makeDirectoryAsync(VIDEO_CACHE_DIR, { intermediates: true });
            } catch (e) {
                // DiretÃ³rio jÃ¡ existe, ignorar
            }

            // Carregar Ã­ndice de cache
            const stored = await AsyncStorage.getItem(CACHE_INDEX_KEY);
            if (stored) {
                this.cacheIndex = JSON.parse(stored);
            }

            // Monitorar conectividade
            NetInfo.addEventListener(state => {
                this.isOnline = state.isConnected;
            });

            // Verificar conectividade inicial
            const netState = await NetInfo.fetch();
            this.isOnline = netState.isConnected;

            this.initialized = true;
            console.log('[VideoService] Inicializado');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('[VideoService] Erro ao inicializar:', error); }
            return false;
        }
    }

    // ==========================================
    // OBTER URL DO VÃDEO
    // ==========================================

    /**
     * ObtÃ©m URL do vÃ­deo (cache local ou CDN)
     * @param {string} procedureId - ID do procedimento
     * @param {string} language - CÃ³digo do idioma (pt-BR, es, en)
     * @returns {Promise<{url: string, source: 'cache'|'cdn'|'offline', available: boolean}>}
     */
    async getVideoUrl(procedureId, language = 'pt-BR') {
        const cacheKey = `${procedureId}_${language}`;

        // Verificar cache local primeiro
        if (this.cacheIndex[cacheKey]) {
            const cachedPath = `${VIDEO_CACHE_DIR}${cacheKey}.mp4`;
            // Verificar se arquivo existe tentando ler info (SDK 54+)
            try {
                const fileContent = await FileSystem.readAsStringAsync(cachedPath, { length: 1 });
                // Se chegou aqui, arquivo existe
                // Atualizar timestamp de Ãºltimo acesso
                this.cacheIndex[cacheKey].lastAccess = Date.now();
                await this._saveCacheIndex();

                return {
                    url: cachedPath,
                    source: 'cache',
                    available: true,
                };
            } catch (e) {
                // Arquivo nÃ£o existe ou erro, continuar para CDN
            }
        }

        // Se offline e nÃ£o tem cache, retornar indisponÃ­vel
        if (!this.isOnline) {
            return {
                url: null,
                source: 'offline',
                available: false,
            };
        }

        // Retornar URL do CDN
        const cdnUrl = this._buildCdnUrl(procedureId, language);
        return {
            url: cdnUrl,
            source: 'cdn',
            available: true,
        };
    }

    // ==========================================
    // CACHE DE VÃDEOS
    // ==========================================

    /**
     * Baixa e cacheia um vÃ­deo para uso offline
     */
    async cacheVideo(procedureId, language = 'pt-BR', onProgress = null) {
        const cacheKey = `${procedureId}_${language}`;
        const localPath = `${VIDEO_CACHE_DIR}${cacheKey}.mp4`;
        const cdnUrl = this._buildCdnUrl(procedureId, language);

        try {
            // Verificar espaÃ§o disponÃ­vel
            await this._ensureCacheSpace();

            // Download com progresso
            const downloadResumable = FileSystem.createDownloadResumable(
                cdnUrl,
                localPath,
                {},
                (downloadProgress) => {
                    const progress = downloadProgress.totalBytesWritten /
                        downloadProgress.totalBytesExpectedToWrite;
                    if (onProgress) onProgress(progress);
                }
            );

            const result = await downloadResumable.downloadAsync();

            if (result?.uri) {
                // Atualizar Ã­ndice de cache (estimativa de tamanho)
                this.cacheIndex[cacheKey] = {
                    path: localPath,
                    size: 0, // Tamanho serÃ¡ estimado
                    cachedAt: Date.now(),
                    lastAccess: Date.now(),
                    procedureId,
                    language,
                };
                await this._saveCacheIndex();

                return { success: true, path: localPath };
            }

            return { success: false, error: 'Download failed' };
        } catch (error) {
            if (__DEV__) { console.error('[VideoService] Erro ao cachear vÃ­deo:', error); }
            return { success: false, error: error.message };
        }
    }

    /**
     * Remove vÃ­deo do cache
     */
    async removeFromCache(procedureId, language = 'pt-BR') {
        const cacheKey = `${procedureId}_${language}`;
        const localPath = `${VIDEO_CACHE_DIR}${cacheKey}.mp4`;

        try {
            // Tentar deletar arquivo (ignorar se nÃ£o existir)
            try {
                await FileSystem.deleteAsync(localPath, { idempotent: true });
            } catch (e) {
                // Arquivo nÃ£o existe, ignorar
            }

            delete this.cacheIndex[cacheKey];
            await this._saveCacheIndex();

            return { success: true };
        } catch (error) {
            if (__DEV__) { console.error('[VideoService] Erro ao remover do cache:', error); }
            return { success: false, error: error.message };
        }
    }

    /**
     * Verifica se vÃ­deo estÃ¡ em cache
     */
    async isVideoCached(procedureId, language = 'pt-BR') {
        const cacheKey = `${procedureId}_${language}`;

        if (!this.cacheIndex[cacheKey]) return false;

        const localPath = `${VIDEO_CACHE_DIR}${cacheKey}.mp4`;
        try {
            // Tentar ler 1 byte para verificar existÃªncia
            await FileSystem.readAsStringAsync(localPath, { length: 1 });
            return true;
        } catch (e) {
            return false;
        }
    }

    // ==========================================
    // GERENCIAMENTO DE CACHE
    // ==========================================

    /**
     * ObtÃ©m informaÃ§Ãµes do cache
     */
    async getCacheInfo() {
        let totalSize = 0;
        const videos = [];

        for (const [key, info] of Object.entries(this.cacheIndex)) {
            totalSize += info.size || 0;
            videos.push({
                key,
                ...info,
            });
        }

        return {
            totalSize,
            totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
            maxSizeMB: MAX_CACHE_SIZE_MB,
            videoCount: videos.length,
            videos: videos.sort((a, b) => b.lastAccess - a.lastAccess),
        };
    }

    /**
     * Limpa todo o cache
     */
    async clearCache() {
        try {
            // Deletar e recriar diretÃ³rio
            try {
                await FileSystem.deleteAsync(VIDEO_CACHE_DIR, { idempotent: true });
            } catch (e) {
                // DiretÃ³rio nÃ£o existe, ignorar
            }
            try {
                await FileSystem.makeDirectoryAsync(VIDEO_CACHE_DIR, { intermediates: true });
            } catch (e) {
                // JÃ¡ existe
            }

            this.cacheIndex = {};
            await this._saveCacheIndex();

            return { success: true };
        } catch (error) {
            if (__DEV__) { console.error('[VideoService] Erro ao limpar cache:', error); }
            return { success: false, error: error.message };
        }
    }

    /**
     * Garante espaÃ§o no cache removendo vÃ­deos menos usados
     */
    async _ensureCacheSpace(requiredSpace = 20 * 1024 * 1024) { // 20MB default
        const cacheInfo = await this.getCacheInfo();
        let currentSize = cacheInfo.totalSize;

        // Se jÃ¡ tem espaÃ§o suficiente, retorna
        if (currentSize + requiredSpace <= MAX_CACHE_SIZE_BYTES) {
            return;
        }

        // Ordenar por Ãºltimo acesso (menos recente primeiro)
        const sortedVideos = cacheInfo.videos.sort((a, b) => a.lastAccess - b.lastAccess);

        // Remover atÃ© ter espaÃ§o suficiente
        for (const video of sortedVideos) {
            if (currentSize + requiredSpace <= MAX_CACHE_SIZE_BYTES) {
                break;
            }

            await this.removeFromCache(video.procedureId, video.language);
            currentSize -= video.size || 0;
        }
    }

    // ==========================================
    // MÃ‰TODOS PRIVADOS
    // ==========================================

    _buildCdnUrl(procedureId, language) {
        // Formato: https://cdn.vigilaro.care/videos/pt-BR/cpr_adult.mp4
        return `${CDN_CONFIG.baseUrl}/${language}/${procedureId}.mp4`;
    }

    async _saveCacheIndex() {
        try {
            await AsyncStorage.setItem(CACHE_INDEX_KEY, JSON.stringify(this.cacheIndex));
        } catch (error) {
            if (__DEV__) { console.error('[VideoService] Erro ao salvar Ã­ndice:', error); }
        }
    }

    // ==========================================
    // PREFETCH (Download antecipado)
    // ==========================================

    /**
     * Baixa vÃ­deos prioritÃ¡rios em segundo plano
     */
    async prefetchPriorityVideos(language = 'pt-BR') {
        const priorityProcedures = [
            'cpr_adult',
            'choking_adult',
            'choking_baby',
            'burn',
            'poisoning',
        ];

        const results = [];

        for (const procedureId of priorityProcedures) {
            const isCached = await this.isVideoCached(procedureId, language);

            if (!isCached && this.isOnline) {
                const result = await this.cacheVideo(procedureId, language);
                results.push({ procedureId, ...result });
            } else {
                results.push({ procedureId, success: true, skipped: isCached });
            }
        }

        return results;
    }
}

export const videoService = new VideoService();

export default videoService;

