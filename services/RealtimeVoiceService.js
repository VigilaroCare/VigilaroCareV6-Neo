/**
 * RealtimeVoiceService.js
 * Serviço de Voz em Tempo Real usando OpenAI Realtime API
 * Vigilaro Care V5 - PREMIUM FEATURE
 * 
 * FLUXO:
 * 1. Conecta via WebSocket
 * 2. Streaming bidirecional de áudio
 * 3. Resposta em tempo real (~300ms latência)
 */

import { Audio } from './_compat/LegacyAudioRecorder';
import { Config } from '../utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Conversão determinística http→ws / https→wss ancorada no início da string.
// .replace('http','ws') ingênuo substituiria a 1ª ocorrência em qualquer posição
// (subdomínio/path), podendo quebrar o URL em produção.
const PROXY_WS_URL = Config.VIGILARO_PROXY_URL
    .replace(/^https:\/\//, 'wss://')
    .replace(/^http:\/\//, 'ws://');
const REALTIME_API_URL = `${PROXY_WS_URL}/v1/realtime?model=gpt-4o-mini-realtime-preview`;
const USAGE_KEY = '@realtime_minutes_used';

class RealtimeVoiceService {
    constructor() {
        this.ws = null;
        this.isConnected = false;
        this.isListening = false;
        this.recording = null;
        this.onTranscript = null;
        this.onResponse = null;
        this.onAudioResponse = null;
        this.onError = null;
        this.onStateChange = null;

        this.sessionStartTime = null;
        this.monthlyLimitMinutes = 15; // Premium default
    }

    /**
     * Verificar se usuário tem minutos disponíveis
     */
    async checkUsage() {
        try {
            const usage = await AsyncStorage.getItem(USAGE_KEY);
            if (!usage) return { used: 0, remaining: this.monthlyLimitMinutes };

            const data = JSON.parse(usage);
            const now = new Date();
            const usageMonth = new Date(data.month);

            // Reset se mudou o mês
            if (now.getMonth() !== usageMonth.getMonth() ||
                now.getFullYear() !== usageMonth.getFullYear()) {
                await this.resetUsage();
                return { used: 0, remaining: this.monthlyLimitMinutes };
            }

            return {
                used: data.minutesUsed || 0,
                remaining: Math.max(0, this.monthlyLimitMinutes - (data.minutesUsed || 0))
            };
        } catch (e) {
            if (__DEV__) { console.error('Erro ao verificar uso:', e); }
            return { used: 0, remaining: this.monthlyLimitMinutes };
        }
    }

    async resetUsage() {
        await AsyncStorage.setItem(USAGE_KEY, JSON.stringify({
            month: new Date().toISOString(),
            minutesUsed: 0
        }));
    }

    async recordUsage(minutes) {
        try {
            const usage = await this.checkUsage();
            await AsyncStorage.setItem(USAGE_KEY, JSON.stringify({
                month: new Date().toISOString(),
                minutesUsed: usage.used + minutes
            }));
        } catch (e) {
            if (__DEV__) { console.error('Erro ao registrar uso:', e); }
        }
    }

    /**
     * Conectar ao WebSocket da OpenAI Realtime API
     */
    async connect() {
        return new Promise((resolve, reject) => {
            try {
                // Verificar uso antes de conectar
                this.checkUsage().then(usage => {
                    if (usage.remaining <= 0) {
                        reject(new Error('Limite mensal de minutos atingido'));
                        return;
                    }
                });

                this.ws = new WebSocket(REALTIME_API_URL, {
                    headers: {
                        'x-vigilaro-token': Config.VIGILARO_APP_SECRET,
                        'OpenAI-Beta': 'realtime=v1'
                    }
                });

                this.ws.onopen = () => {
                    if (__DEV__) console.log('🎙️ Realtime API conectada');
                    this.isConnected = true;
                    this.sessionStartTime = Date.now();

                    // Configurar sessão com personalidade do Vigilaro
                    this.configureSession();

                    if (this.onStateChange) this.onStateChange('connected');
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    this.handleMessage(JSON.parse(event.data));
                };

                this.ws.onerror = (error) => {
                    if (__DEV__) { console.error('❌ Realtime API erro:', error); }
                    if (this.onError) this.onError(error);
                    reject(error);
                };

                this.ws.onclose = () => {
                    if (__DEV__) console.log('🔌 Realtime API desconectada');
                    this.isConnected = false;
                    this.recordSessionDuration();
                    if (this.onStateChange) this.onStateChange('disconnected');
                };

            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Configurar sessão com personalidade do Vigilaro
     */
    configureSession() {
        if (!this.ws || !this.isConnected) return;

        const sessionConfig = {
            type: 'session.update',
            session: {
                modalities: ['text', 'audio'],
                instructions: `
ATENÇÃO: Você é o VIGILARO.
Sua voz é feminina, madura, calorosa e segura.

SUA PERSONA:
Você é uma parceira de segurança, uma "co-piloto" do lar.
Você NÃO é uma assistente submissa, nem uma professora infantil.
Você conversa de igual para igual com o usuário (adulto responsável).

DIRETRIZES DE TOM (CALIBRAÇÃO FINA):
1. CALOROSO, NÃO MELOSO:
   - Use: "Entendo a preocupação", "Vamos resolver isso juntos", "Fico feliz que esteja tudo bem".
   - NÃO USE: Diminutivos excessivos ("amorzinho", "queridinho"), voz de "falar com bebê", ou excesso de exclamações.
   - Seja cordial como uma vizinha de confiança ou uma irmã mais velha sensata.

2. EMPATIA REAL:
   - Valide os sentimentos do usuário. Se ele relatar um susto, diga: "Imagino que tenha sido assustador. Respire fundo, estou aqui."
   - Demonstre interesse genuíno pela segurança da família dele.

3. CONCISÃO FALADA:
   - Respostas curtas (máximo 2 frases por vez).
   - Fale como gente: use marcadores naturais ("Certo...", "Olha...", "Vejamos").
   - Não dê palestras. Se o assunto for complexo, dê a manchete e pergunte: "Quer os detalhes?".

CONHECIMENTO TÉCNICO:
- Você é autoridade em Prevenção 3D (Diária, Dinâmica, Duradoura).
- Em emergências (fogo, engasgo), abandone a cordialidade e seja IMEDIATISTA e DIRETIVA.
`.trim(),
                voice: 'shimmer', // Voz mais quente e expressiva
                input_audio_format: 'pcm16',
                output_audio_format: 'pcm16',
                input_audio_transcription: {
                    model: 'whisper-1'
                },
                turn_detection: {
                    type: 'server_vad',
                    threshold: 0.5,
                    prefix_padding_ms: 300,
                    silence_duration_ms: 800 // Aumentado para evitar interrupções bruscas
                }
            }
        };

        this.ws.send(JSON.stringify(sessionConfig));
    }

    /**
     * Processar mensagens do WebSocket
     */
    handleMessage(message) {
        switch (message.type) {
            case 'conversation.item.input_audio_transcription.completed':
                // Usuário terminou de falar - mostrar transcrição
                if (this.onTranscript) {
                    this.onTranscript(message.transcript);
                }
                break;

            case 'response.audio_transcript.delta':
                // Resposta de texto em streaming
                if (this.onResponse) {
                    this.onResponse(message.delta, false);
                }
                break;

            case 'response.audio_transcript.done':
                // Resposta de texto completa
                if (this.onResponse) {
                    this.onResponse(message.transcript, true);
                }
                break;

            case 'response.audio.delta':
                // Áudio de resposta em streaming
                if (this.onAudioResponse) {
                    this.onAudioResponse(message.delta);
                }
                break;

            case 'input_audio_buffer.speech_started':
                if (this.onStateChange) this.onStateChange('listening');
                break;

            case 'input_audio_buffer.speech_stopped':
                if (this.onStateChange) this.onStateChange('processing');
                break;

            case 'response.done':
                if (this.onStateChange) this.onStateChange('idle');
                break;

            case 'error':
                if (__DEV__) { console.error('API Error:', message.error); }
                if (this.onError) this.onError(message.error);
                break;
        }
    }

    /**
     * Enviar áudio para o servidor
     */
    sendAudio(audioData) {
        if (!this.ws || !this.isConnected) return;

        const message = {
            type: 'input_audio_buffer.append',
            audio: audioData // Base64 encoded PCM16
        };

        this.ws.send(JSON.stringify(message));
    }

    /**
     * Iniciar captura de áudio
     */
    async startListening() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permissão de microfone negada');
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });

            // Configuração para PCM16 que a API espera
            const recordingOptions = {
                android: {
                    extension: '.wav',
                    outputFormat: Audio.AndroidOutputFormat.DEFAULT,
                    audioEncoder: Audio.AndroidAudioEncoder.DEFAULT,
                    sampleRate: 24000,
                    numberOfChannels: 1,
                    bitRate: 384000,
                },
                ios: {
                    extension: '.wav',
                    outputFormat: Audio.IOSOutputFormat.LINEARPCM,
                    audioQuality: Audio.IOSAudioQuality.HIGH,
                    sampleRate: 24000,
                    numberOfChannels: 1,
                    bitRate: 384000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
                web: {}
            };

            const { recording } = await Audio.Recording.createAsync(recordingOptions);
            this.recording = recording;
            this.isListening = true;

            if (this.onStateChange) this.onStateChange('listening');

            // Stream de áudio (simplificado - na prática precisaria de chunks)
            if (__DEV__) console.log('🎤 Gravação iniciada');

        } catch (error) {
            if (__DEV__) { console.error('Erro ao iniciar gravação:', error); }
            if (this.onError) this.onError(error);
        }
    }

    /**
     * Parar captura e enviar áudio final
     */
    async stopListening() {
        if (!this.recording) return;

        try {
            await this.recording.stopAndUnloadAsync();
            const uri = this.recording.getURI();
            this.recording = null;
            this.isListening = false;

            // OTIMIZAÇÃO UX: Feedback imediato
            if (this.onStateChange) this.onStateChange('processing');

            // Ler arquivo e converter para base64
            const response = await fetch(uri);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64Audio = reader.result.split(',')[1];
                this.sendAudio(base64Audio);

                // Commit o buffer para processar
                if (this.ws && this.isConnected) {
                    this.ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
                }
            };

            reader.readAsDataURL(blob);

        } catch (error) {
            if (__DEV__) { console.error('Erro ao parar gravação:', error); }
            if (this.onError) this.onError(error);
        }
    }

    /**
     * Cancelar resposta atual da IA (Interrupção)
     */
    cancelResponse() {
        if (this.ws && this.isConnected) {
            this.ws.send(JSON.stringify({ type: 'response.cancel' }));
            // Também limpar buffer de input pendente se houver
            this.ws.send(JSON.stringify({ type: 'input_audio_buffer.clear' }));
            if (__DEV__) console.log('🛑 Resposta cancelada pelo usuário');
        }
    }

    /**
     * Registrar duração da sessão
     */
    recordSessionDuration() {
        if (this.sessionStartTime) {
            const durationMs = Date.now() - this.sessionStartTime;
            const durationMinutes = Math.ceil(durationMs / 60000);
            this.recordUsage(durationMinutes);
            this.sessionStartTime = null;
        }
    }

    /**
     * Desconectar
     */
    disconnect() {
        if (this.recording) {
            this.recording.stopAndUnloadAsync().catch(() => { });
            this.recording = null;
        }

        if (this.ws) {
            this.recordSessionDuration();
            this.ws.close();
            this.ws = null;
        }

        this.isConnected = false;
        this.isListening = false;
    }

    /**
     * Enviar mensagem de texto (para debug/fallback)
     */
    sendTextMessage(text) {
        if (!this.ws || !this.isConnected) return;

        const message = {
            type: 'conversation.item.create',
            item: {
                type: 'message',
                role: 'user',
                content: [{
                    type: 'input_text',
                    text: text
                }]
            }
        };

        this.ws.send(JSON.stringify(message));
        this.ws.send(JSON.stringify({ type: 'response.create' }));
    }
}

export default new RealtimeVoiceService();
