/**
 * HandednessDetector.js
 * Serviço de detecção heurística da mão dominante do usuário.
 * Vigilaro Care V6 Neo — Modo Canhoto
 *
 * ALGORITMO:
 * - Coleta coordenada X de N toques (normalizados 0..1)
 * - Calcula proporção de toques na "zona esquerda" (< 35% da largura)
 * - Se > 60% dos toques são no terço esquerdo → sugere modo canhoto
 * - Ignora se já sugeriu ou se usuário já configurou manualmente
 *
 * PRIVACIDADE:
 * - Nenhum dado de toque é enviado para servidores
 * - Apenas a coordenada X é armazenada temporariamente em memória
 * - Após análise, os dados de toque são descartados
 */

import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_SUGGESTED = '@left_handed_suggested';
const STORAGE_KEY_MANUAL = '@acc_left_handed';

const SAMPLE_SIZE = 30;          // Toques necessários para análise
const LEFT_ZONE_THRESHOLD = 0.38; // 38% da largura = zona esquerda
const DETECTION_RATIO = 0.60;     // 60% dos toques na zona esquerda → sugere

class HandednessDetector {
    constructor() {
        this.touches = [];
        this.isAnalyzed = false;
        this.isDisabled = false;
        this.onDetection = null; // Callback quando detecta padrão canhoto
    }

    /**
     * Inicializa o detector. Verifica se já sugeriu antes.
     * @param {Function} onDetection - Callback chamado com 'left' quando detecta canhoto
     */
    async init(onDetection) {
        this.onDetection = onDetection;

        try {
            // Se já sugeriu antes, não detectar novamente
            const alreadySuggested = await AsyncStorage.getItem(STORAGE_KEY_SUGGESTED);
            if (alreadySuggested) {
                this.isDisabled = true;
                return;
            }

            // Se usuário já configurou manualmente, não sugerir
            const manualSetting = await AsyncStorage.getItem(STORAGE_KEY_MANUAL);
            if (manualSetting !== null) {
                this.isDisabled = true;
                return;
            }
        } catch (e) {
            // AsyncStorage error — desabilita por segurança
            this.isDisabled = true;
        }
    }

    /**
     * Registra um toque. Chamado pelo observer no App.js.
     * @param {number} pageX - Coordenada X absoluta do toque
     */
    recordTouch(pageX) {
        if (this.isDisabled || this.isAnalyzed) return;
        if (this.touches.length >= SAMPLE_SIZE) return;

        const screenWidth = Dimensions.get('window').width;
        if (screenWidth <= 0) return;

        // Normaliza para 0..1
        const normalized = pageX / screenWidth;
        this.touches.push(normalized);

        // Analisar quando atingir amostra suficiente
        if (this.touches.length >= SAMPLE_SIZE) {
            this._analyze();
        }
    }

    /**
     * Analisa os toques coletados e determina mão dominante.
     * @private
     */
    _analyze() {
        if (this.isAnalyzed) return;
        this.isAnalyzed = true;

        const leftZoneTouches = this.touches.filter(x => x < LEFT_ZONE_THRESHOLD);
        const ratio = leftZoneTouches.length / this.touches.length;

        if (__DEV__) {
            console.log(`[HandednessDetector] Análise: ${leftZoneTouches.length}/${this.touches.length} toques na zona esquerda (${(ratio * 100).toFixed(1)}%)`);
        }

        // Limpar dados de toque (privacidade)
        this.touches = [];

        if (ratio >= DETECTION_RATIO) {
            // Provável uso com mão esquerda
            this._markAsSuggested();
            if (this.onDetection) {
                this.onDetection('left');
            }
        } else {
            // Uso com mão direita ou ambíguo — não sugerir
            this._markAsSuggested();
        }
    }

    /**
     * Marca que a sugestão já foi feita para não repetir.
     * @private
     */
    async _markAsSuggested() {
        try {
            await AsyncStorage.setItem(STORAGE_KEY_SUGGESTED, JSON.stringify({
                timestamp: Date.now(),
                version: '1.0',
            }));
        } catch (e) {
            // Silently fail
        }
    }

    /**
     * Reseta o detector (para testes ou re-detecção).
     */
    async reset() {
        this.touches = [];
        this.isAnalyzed = false;
        this.isDisabled = false;
        try {
            await AsyncStorage.removeItem(STORAGE_KEY_SUGGESTED);
        } catch (e) {
            // Silently fail
        }
    }
}

// Singleton
export default new HandednessDetector();
