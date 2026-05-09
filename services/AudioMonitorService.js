// services/AudioMonitorService.js
// [MIG-AV-05] expo-av substituído por expo-audio

import { AudioRecorder, AudioModule, RecordingPresets } from 'expo-audio'; // [MIG-AV-05]

class AudioMonitorService {
    constructor() {
        this.recorder        = null; // [MIG-AV-05] era: this.recording
        this.isMonitoring    = false;
        this.onLevelUpdate   = null;
        this.onAlert         = null;
        this.threshold       = -10;
        this.monitorInterval = null;
    }

    async requestPermissions() {
        const { granted } = await AudioModule.requestRecordingPermissionsAsync();
        return granted;
    }

    async startMonitoring(onLevelUpdate, onAlert) {
        if (this.isMonitoring) return;

        try {
            // [MIG-AV-05] AudioRecorder substitui Audio.Recording
            // LOW_QUALITY é o preset mais leve — adequado para metering
            this.recorder      = new AudioRecorder(RecordingPresets.LOW_QUALITY);
            this.onLevelUpdate = onLevelUpdate;
            this.onAlert       = onAlert;
            this.isMonitoring  = true;

            await this.recorder.record();

            // Loop de monitoramento via polling
            this.monitorInterval = setInterval(async () => {
                if (!this.recorder) return;

                try {
                    // expo-audio expõe currentMeteringLevel (0.0 a 1.0)
                    // Convertemos para escala 0-100 para compatibilidade com a UI
                    const rawLevel   = this.recorder.currentMeteringLevel ?? 0;
                    const level      = Math.min(100, Math.max(0, rawLevel * 100));

                    if (this.onLevelUpdate) this.onLevelUpdate(level);

                    if (level > 80) {
                        if (this.onAlert) this.onAlert(level);
                        console.log(`🚨 ALERTA DE RUÍDO: ${level.toFixed(1)}%`);
                    }
                } catch (e) {
                    // Falha silenciosa no polling — não interrompe o monitoramento
                }
            }, 200); // 5x por segundo

        } catch (error) {
            if (__DEV__) { console.error('Falha ao iniciar Audio Monitor:', error); }
            this.stopMonitoring();
        }
    }

    async stopMonitoring() {
        this.isMonitoring = false;

        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }

        try {
            if (this.recorder) {
                await this.recorder.stop();
            }
        } catch (e) {
            console.log('Erro ao parar gravação:', e);
        }

        this.recorder = null;
    }
}

export default new AudioMonitorService();