import * as Speech from 'expo-speech';
import { AudioPlayer, AudioRecorder, AudioModule, RecordingPresets } from 'expo-audio'; // [MIG-AV-06]

class VoiceService {
    constructor() {
        this.recorder = null; // [MIG-AV-06] era: this.recording
        this.player   = null; // [MIG-AV-06] era: this.sound
        this.isSpeaking = false;
    }

    // --- Legacy TTS (Expo Speech) - Fallback ---
    async speak(text) {
        try {
            const isSpeaking = await Speech.isSpeakingAsync();
            if (isSpeaking) {
                await Speech.stop();
            }

            Speech.speak(text, {
                language: 'pt-BR',
                pitch: 1.0,
                rate: 0.9,
                onDone: () => { this.isSpeaking = false; },
                onStopped: () => { this.isSpeaking = false; },
                if (__DEV__) {
                  onError: (e) => { console.error("TTS Error", e); this.isSpeaking = false; }
                }
            });
            this.isSpeaking = true;
        } catch (e) {
            if (__DEV__) { console.error("Erro ao falar:", e); }
        }
    }

    // --- OpenAI TTS Playback ---
    async playAudio(base64Uri) {
        return new Promise(async (resolve) => {
            try {
                if (this.player) { // [MIG-AV-06]
                    this.player.stop(); // [MIG-AV-06]
                }
                if (await Speech.isSpeakingAsync()) {
                    await Speech.stop();
                }

                await AudioModule.setAudioModeAsync({ // [MIG-AV-06]
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: false,
                    shouldDuckAndroid: true,
                });

                // [MIG-AV-06] AudioPlayer substitui Audio.Sound.createAsync()
                const player = new AudioPlayer({ uri: base64Uri });
                player.setOnPlaybackStatusUpdate(async (status) => {
                    if (status.didJustFinish) {
                        this.isSpeaking = false;
                        resolve(true);
                    }
                });
                await player.play();
                this.player = player; // [MIG-AV-06]
                this.isSpeaking = true;

            } catch (error) {
                if (__DEV__) { console.error("Erro ao reproduzir áudio natural:", error); }
                this.isSpeaking = false;
                resolve(false);
            }
        });
    }

    async stopSpeaking() {
        if (await Speech.isSpeakingAsync()) {
            await Speech.stop();
        }
        if (this.player) { // [MIG-AV-06]
            try {
                this.player.stop(); // [MIG-AV-06]
            } catch (ignore) {
                // Ignorar erro se o player já tiver sido parado
            }
            this.player = null; // [MIG-AV-06]
        }
        this.isSpeaking = false;
    }

    // --- Recording Logic (Whisper Compatible) ---

    async startRecording() {
        try {
            if (this.recorder) { // [MIG-AV-06]
                try {
                    await this.recorder.stop(); // [MIG-AV-06]
                } catch (e) {
                    // Ignora erro se já estava parado
                }
                this.recorder = null; // [MIG-AV-06]
            }

            const { granted } = await AudioModule.requestRecordingPermissionsAsync(); // [MIG-AV-06]
            if (!granted) return null;

            await AudioModule.setAudioModeAsync({ // [MIG-AV-06]
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // [MIG-AV-06] AudioRecorder substitui Audio.Recording.createAsync()
            const recorder = new AudioRecorder(RecordingPresets.HIGH_QUALITY); // Usando preset para simplificar
            await recorder.record();

            this.recorder = recorder; // [MIG-AV-06]
            return true;
        } catch (err) {
            if (__DEV__) { console.error('Failed to start recording', err); }
            return false;
        }
    }

    async stopRecording() {
        if (!this.recorder) return null; // [MIG-AV-06]

        await this.recorder.stop(); // [MIG-AV-06]
        const uri = this.recorder.uri; // [MIG-AV-06]
        this.recorder = null; // [MIG-AV-06]
        return uri;
    }
}

export default new VoiceService();