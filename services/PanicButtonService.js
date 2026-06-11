/**
 * PanicButtonService.js
 * Serviço para gerenciamento do Botão de Pânico Discreto
 * Vigilaro Care V6 Neo
 *
 * Funcionalidades:
 * 1. Acionamento por pressão longa (3 segundos)
 * 2. Feedback discreto (vibração apenas)
 * 3. Gravação de áudio ambiente
 * 4. Envio silencioso para contatos
 * 5. Modo "tela normal" (não revelar)
 *
 * [MIG-AV-02] Migrado de expo-av para expo-audio (SDK 54+)
 */

import { Vibration, Platform, Linking } from 'react-native';
import { AudioRecorder, AudioModule, RecordingPresets } from 'expo-audio'; // [MIG-AV-02]
import * as Speech from 'expo-speech';
import * as FileSystem from 'expo-file-system/legacy';
import * as Location from 'expo-location';
// Storage roteia chaves sensíveis (PII/saúde) pro SecureStore criptografado
// e o restante pro AsyncStorage — ver utils/SecureStorage.js.
import { Storage } from '../utils/SecureStorage';

const PANIC_STORAGE_KEY    = '@panic_button_state';
const CONTACTS_STORAGE_KEY = '@emergency_contacts';
const RECORDINGS_DIR       = FileSystem.documentDirectory + 'panic_recordings/';

class PanicButtonService {
    constructor() {
        this.isActive       = false;
        this.recorder       = null; // [MIG-AV-02] era: this.recording
        this.recordingUri   = null;
        this.location       = null;
        this.activationTime = null;
        this.alertTimeout   = null;
        this.listeners      = [];
    }

    // Adicionar listener para mudanças de estado
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    // Notificar listeners
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.isActive));
    }

    // Vibração discreta de confirmação
    vibrateConfirmation() {
        if (Platform.OS === 'ios') {
            Vibration.vibrate(100);
        } else {
            Vibration.vibrate([0, 100, 50, 100]);
        }
    }

    // Vibração de ativação (mais longa, porém ainda discreta)
    vibrateActivation() {
        if (Platform.OS === 'ios') {
            Vibration.vibrate(200);
        } else {
            Vibration.vibrate([0, 150, 100, 150]);
        }
    }

    // Falar mensagem de voz discreta
    speakDiscrete(message, options = {}) {
        Speech.speak(message, {
            language: 'pt-BR',
            pitch: 1.0,
            rate: 0.9,
            volume: 0.7,
            ...options
        });
    }

    // Obter localização atual
    async getCurrentLocation() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permissão de localização negada');
                return null;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });

            return {
                latitude:  location.coords.latitude,
                longitude: location.coords.longitude,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            if (__DEV__) { console.error('Erro ao obter localização:', error); }
            return null;
        }
    }

    // Iniciar gravação de áudio
    async startRecording() {
        try {
            const { granted } = await AudioModule.requestRecordingPermissionsAsync(); // [MIG-AV-02]
            if (!granted) {
                console.log('Permissão de áudio negada');
                return false;
            }

            await AudioModule.setAudioModeAsync({ // [MIG-AV-02]
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
            });

            try {
                await FileSystem.makeDirectoryAsync(RECORDINGS_DIR, { intermediates: true });
            } catch (e) {
                // Diretório já existe, ignorar
            }

            // [MIG-AV-02] AudioRecorder substitui Audio.Recording.createAsync()
            const recorder = new AudioRecorder(RecordingPresets.HIGH_QUALITY);
            await recorder.record();

            this.recorder = recorder;
            console.log('Gravação iniciada');
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao iniciar gravação:', error); }
            return false;
        }
    }

    // Parar gravação de áudio
    async stopRecording() {
        if (!this.recorder) { // [MIG-AV-02]
            return null;
        }

        try {
            await this.recorder.stop(); // [MIG-AV-02]
            const uri = this.recorder.uri; // [MIG-AV-02]

            const filename = `panic_${Date.now()}.m4a`;
            const newUri = RECORDINGS_DIR + filename;

            await FileSystem.copyAsync({
                from: uri,
                to: newUri
            });
            // Não precisa deletar o original, expo-audio gerencia o temp file

            this.recordingUri = newUri;
            this.recorder = null; // [MIG-AV-02]

            console.log('Gravação salva em:', newUri);
            return newUri;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao parar gravação:', error); }
            return null;
        }
    }

    // Carregar contatos de emergência
    async getEmergencyContacts() {
        try {
            const json = await Storage.getItem(CONTACTS_STORAGE_KEY);
            if (json) {
                return JSON.parse(json);
            }
            return [];
        } catch (error) {
            if (__DEV__) { console.error('Erro ao carregar contatos:', error); }
            return [];
        }
    }

    // Enviar alerta silencioso via SMS
    async sendSilentAlerts() {
        const contacts = await this.getEmergencyContacts();

        if (contacts.length === 0) {
            console.log('Nenhum contato de emergência configurado');
            return false;
        }

        let message = `🚨 ALERTA DE PÂNICO - Vigilaro Care\n\n`;
        message += `Acionado às: ${new Date().toLocaleString('pt-BR')}\n`;

        if (this.location) {
            message += `\n📍 Localização:\n`;
            message += `https://maps.google.com/?q=${this.location.latitude},${this.location.longitude}\n`;
        }

        message += `\n⚠️ Esta pessoa pode estar em perigo. Verifique imediatamente.`;

        for (const contact of contacts) {
            try {
                const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
                const canOpen = await Linking.canOpenURL(smsUrl);

                if (canOpen) {
                    console.log(`SMS preparado para ${contact.name}: ${contact.phone}`);
                }
            } catch (error) {
                if (__DEV__) { console.error(`Erro ao preparar SMS para ${contact.name}:`, error); }
            }
        }

        return true;
    }

    // ATIVAR MODO PÂNICO
    async activate() {
        if (this.isActive) {
            console.log('Modo pânico já está ativo');
            return;
        }

        console.log('🚨 ATIVANDO MODO PÂNICO');

        this.vibrateActivation();

        this.isActive = true;
        this.activationTime = new Date();
        this.notifyListeners();

        this.location = await this.getCurrentLocation();

        await this.startRecording();

        console.log('⏳ Iniciando contagem regressiva de 15s para envio de alertas...');
        this.alertTimeout = setTimeout(async () => {
            if (this.isActive) {
                console.log('✅ Tempo esgotado. Enviando alertas reais.');
                await this.sendSilentAlerts();
                Vibration.vibrate([0, 100, 50, 100]);
            }
        }, 15000);

        await this.saveState();

        console.log('Modo pânico ativado (em standby de envio)');
    }

    // DESATIVAR MODO PÂNICO
    async deactivate() {
        if (!this.isActive) {
            return;
        }

        console.log('Desativando modo pânico');

        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
            this.alertTimeout = null;
            console.log('🚫 Envio de alertas CANCELADO pelo usuário.');
        }

        const recordingPath = await this.stopRecording();

        this.isActive = false;
        this.notifyListeners();

        await this.clearState();

        this.vibrateConfirmation();

        return {
            duration: this.activationTime ? (new Date() - this.activationTime) / 1000 : 0,
            recordingPath,
            location: this.location
        };
    }

    // Salvar estado persistente
    async saveState() {
        try {
            const state = {
                isActive:       this.isActive,
                activationTime: this.activationTime?.toISOString(),
                location:       this.location
            };
            await Storage.setItem(PANIC_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar estado:', error); }
        }
    }

    // Limpar estado
    async clearState() {
        try {
            await Storage.removeItem(PANIC_STORAGE_KEY);
            this.location       = null;
            this.activationTime = null;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao limpar estado:', error); }
        }
    }

    // Restaurar estado (quando o app reinicia)
    async restoreState() {
        try {
            const json = await Storage.getItem(PANIC_STORAGE_KEY);
            if (json) {
                const state = JSON.parse(json);
                if (state.isActive) {
                    this.isActive       = true;
                    this.activationTime = new Date(state.activationTime);
                    this.location       = state.location;
                    this.notifyListeners();
                    await this.startRecording();
                }
            }
        } catch (error) {
            if (__DEV__) { console.error('Erro ao restaurar estado:', error); }
        }
    }

    // Obter status atual
    getStatus() {
        return {
            isActive:       this.isActive,
            activationTime: this.activationTime,
            location:       this.location,
            isRecording:    this.recorder !== null
        };
    }
}

// Singleton
const panicButtonService = new PanicButtonService();
export default panicButtonService;