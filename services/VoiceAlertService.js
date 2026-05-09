/**
 * VoiceAlertService.js
 * Serviço Centralizado de Alertas por Voz
 * Vigilaro Care V5
 * 
 * FUNCIONALIDADE:
 * Quando um alerta aparece na tela, o Vigilaro também FALA o conteúdo
 * de forma natural, como um assistente de segurança pessoal.
 * 
 * USO:
 * import VoiceAlert from '../services/VoiceAlertService';
 * VoiceAlert.speak('Queda detectada. Você está bem?');
 * VoiceAlert.alert('Alerta Importante', 'Detecção de movimento...');
 */

import * as Speech from 'expo-speech';
import { Alert, Vibration, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VOICE_SETTINGS_KEY = '@vigilaro_voice_settings';

class VoiceAlertService {
    constructor() {
        this.isEnabled = true;
        this.volume = 1.0;
        this.rate = 1.0; // Velocidade natural (aumentada para parecer menos artificial)
        this.pitch = 1.0;
        this.language = 'pt-BR';
        this.isSpeaking = false;
        this.queue = [];

        // Carregar configurações do usuário
        this.loadSettings();
    }

    // Carregar configurações salvas
    async loadSettings() {
        try {
            const json = await AsyncStorage.getItem(VOICE_SETTINGS_KEY);
            if (json) {
                const settings = JSON.parse(json);
                this.isEnabled = settings.isEnabled ?? true;
                this.volume = settings.volume ?? 1.0;
                this.rate = settings.rate ?? 0.9;
                this.pitch = settings.pitch ?? 1.0;
            }
        } catch (error) {
            if (__DEV__) { console.error('Erro ao carregar configurações de voz:', error); }
        }
    }

    // Salvar configurações
    async saveSettings() {
        try {
            const settings = {
                isEnabled: this.isEnabled,
                volume: this.volume,
                rate: this.rate,
                pitch: this.pitch
            };
            await AsyncStorage.setItem(VOICE_SETTINGS_KEY, JSON.stringify(settings));
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar configurações de voz:', error); }
        }
    }

    // Habilitar/Desabilitar voz
    setEnabled(enabled) {
        this.isEnabled = enabled;
        this.saveSettings();
    }

    // Ajustar volume (0.0 a 1.0)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    // Ajustar velocidade (0.5 a 2.0)
    setRate(rate) {
        this.rate = Math.max(0.5, Math.min(2, rate));
        this.saveSettings();
    }

    /**
     * FALAR TEXTO
     * Método principal para falar qualquer mensagem
     * 
     * @param {string} message - Texto para falar
     * @param {object} options - Opções adicionais
     * @param {string} options.priority - 'high' | 'normal' | 'low'
     * @param {boolean} options.interrupt - Se deve interromper fala atual
     * @param {function} options.onDone - Callback ao terminar
     */
    speak(message, options = {}) {
        if (!this.isEnabled) {
            console.log('[VoiceAlert] Voz desabilitada');
            return;
        }

        const {
            priority = 'normal',
            interrupt = false,
            onDone = null,
            rate = this.rate,
            pitch = this.pitch
        } = options;

        // Se alta prioridade ou interrupt, para mensagem atual
        if ((priority === 'high' || interrupt) && this.isSpeaking) {
            Speech.stop();
        }

        // Adicionar à fila ou falar imediatamente
        if (this.isSpeaking && !interrupt) {
            this.queue.push({ message, options });
            return;
        }

        this.isSpeaking = true;

        Speech.speak(message, {
            language: this.language,
            pitch: pitch,
            rate: rate,
            volume: this.volume,
            onDone: () => {
                this.isSpeaking = false;
                if (onDone) onDone();
                this.processQueue();
            },
            onError: (error) => {
                if (__DEV__) { console.error('[VoiceAlert] Erro:', error); }
                this.isSpeaking = false;
                this.processQueue();
            }
        });
    }

    // Processar fila de mensagens
    processQueue() {
        if (this.queue.length > 0 && !this.isSpeaking) {
            const { message, options } = this.queue.shift();
            this.speak(message, options);
        }
    }

    // Parar fala atual
    stop() {
        Speech.stop();
        this.isSpeaking = false;
        this.queue = [];
    }

    /**
     * ALERTA COM VOZ
     * Mostra Alert visual E fala o conteúdo
     * 
     * @param {string} title - Título do alerta
     * @param {string} message - Mensagem do alerta
     * @param {array} buttons - Botões do Alert (opcional)
     * @param {object} options - Opções de voz
     */
    alert(title, message, buttons = [{ text: 'OK' }], options = {}) {
        // Falar primeiro (mais natural)
        const spokenMessage = `${title}. ${message}`;
        this.speak(spokenMessage, { priority: 'high', ...options });

        // Vibrar para chamar atenção
        if (options.vibrate !== false) {
            Vibration.vibrate(Platform.OS === 'ios' ? 200 : [0, 200, 100, 200]);
        }

        // Mostrar Alert visual
        Alert.alert(title, message, buttons, { cancelable: options.cancelable ?? true });
    }

    /**
     * ALERTA DE EMERGÊNCIA
     * Alta prioridade, fala mais lenta e clara
     */
    emergency(title, message, buttons = [{ text: 'OK' }]) {
        // Vibração de emergência
        if (Platform.OS === 'android') {
            Vibration.vibrate([0, 500, 200, 500, 200, 500]);
        } else {
            Vibration.vibrate(1000);
        }

        // Falar com urgência mas clareza
        this.speak(`Atenção! ${title}. ${message}`, {
            priority: 'high',
            interrupt: true,
            rate: 0.8 // Mais lento para emergências
        });

        // Alert visual
        Alert.alert(`🚨 ${title}`, message, buttons, { cancelable: false });
    }

    /**
     * CONFIRMAÇÃO RÁPIDA
     * Para ações que precisam de confirmação do usuário
     */
    confirm(message, onConfirm, onCancel = null) {
        this.speak(message, { priority: 'high' });

        Alert.alert(
            'Confirmação',
            message,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: () => {
                        this.speak('Cancelado');
                        if (onCancel) onCancel();
                    }
                },
                {
                    text: 'Confirmar',
                    onPress: () => {
                        this.speak('Confirmado');
                        onConfirm();
                    }
                }
            ]
        );
    }

    /**
     * NOTIFICAÇÃO SUAVE
     * Para informações não urgentes
     */
    notify(message, duration = 3000) {
        this.speak(message, { priority: 'low', rate: 1.0 });
        // Pode integrar com Toast/Snackbar aqui se houver
    }

    /**
     * ALERTA DE STATUS DO SISTEMA
     * Para atualizações de status (bateria, conexão, etc.)
     */
    status(title, message) {
        this.speak(`${title}. ${message}`, { priority: 'normal', rate: 1.0 });
    }

    // ==========================================
    // ALERTAS PRÉ-DEFINIDOS (como nas simulações)
    // ==========================================

    /**
     * ALERTA DE QUEDA DETECTADA
     */
    fallDetected(userName = 'usuário') {
        this.emergency(
            'Queda Detectada',
            `Detectamos uma possível queda de ${userName}. Você está bem? Toque para cancelar o alerta.`,
            [
                {
                    text: 'ESTOU BEM',
                    onPress: () => this.speak('Que bom! Alerta cancelado. Monitoramento continua.', { rate: 0.9 })
                },
                {
                    text: 'PRECISO DE AJUDA',
                    style: 'destructive',
                    onPress: () => this.speak('Enviando alerta para seus contatos de emergência.', { rate: 0.85 })
                }
            ]
        );
    }

    /**
     * ALERTA DE VIOLAÇÃO DE PERÍMETRO
     */
    geofenceViolation(personName, location) {
        this.emergency(
            'Saída de Área Segura',
            `${personName} saiu da zona segura. Última localização conhecida: ${location}. Verifique imediatamente.`,
            [
                { text: 'RASTREAR', onPress: () => this.speak('Abrindo rastreamento em tempo real.') },
                { text: 'LIGAR', onPress: () => this.speak('Iniciando chamada.') }
            ]
        );
    }

    /**
     * ALERTA DE PÂNICO RECEBIDO
     * (Para contatos que recebem o alerta)
     */
    panicReceived(personName, time) {
        this.emergency(
            'ALERTA DE PÂNICO',
            `${personName} acionou o botão de emergência às ${time}. Verifique imediatamente.`,
            [
                { text: 'VER LOCALIZAÇÃO', onPress: () => { } },
                { text: 'LIGAR', onPress: () => { } }
            ]
        );
    }

    /**
     * ALERTA DE BATERIA BAIXA
     */
    lowBattery(deviceName, percentage) {
        this.alert(
            'Bateria Baixa',
            `O dispositivo de ${deviceName} está com ${percentage}% de bateria. Solicite o carregamento para manter o monitoramento ativo.`,
            [{ text: 'OK' }],
            { vibrate: true }
        );
    }

    /**
     * ALERTA DE MEDICAMENTO (agenda)
     */
    medicationReminder(medicationName, dosage, time) {
        this.alert(
            'Hora do Medicamento',
            `${medicationName}, ${dosage}. Horário programado: ${time}.`,
            [
                { text: 'TOMEI', onPress: () => this.speak('Medicamento registrado como tomado.') },
                { text: 'ADIAR 10 MIN', onPress: () => this.speak('Lembrete adiado por 10 minutos.') }
            ]
        );
    }

    /**
     * ALERTA DE RISCO CONTEXTUAL
     * (Ex: criança na cozinha)
     */
    contextualRisk(riskType, recommendation) {
        this.alert(
            `Atenção: ${riskType}`,
            recommendation,
            [{ text: 'ENTENDI' }],
            { vibrate: false }
        );
    }
}

// Singleton para uso global
const VoiceAlert = new VoiceAlertService();
export default VoiceAlert;

// Também exportar a classe para testes
export { VoiceAlertService };
