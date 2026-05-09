/**
 * ElevenLabsService.js
 * IntegraÃ§Ã£o WebSocket com ElevenLabs Conversational AI
 * CompatÃ­vel com Expo Go (sem SDK nativo)
 *
 * Fluxo:
 * 1. connect(agentId) â†’ abre WebSocket
 * 2. startMicStreaming() â†’ grava PCM 16kHz e envia chunks base64
 * 3. handleMessage() â†’ recebe Ã¡udio base64 e faz fila de reproduÃ§Ã£o
 * 4. AudioQueuePlayer â†’ toca chunks em sequÃªncia sem gaps
 */

import { Audio } from './_compat/LegacyAudioRecorder';
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONFIGURAÃ‡ÃƒO
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ELEVEN_AGENT_ID = 'agent_5601kj0q4a3nezyrhyjq1bba6rkq';
const ELEVEN_API_KEY = ''; // â† Cole aqui sua API Key da ElevenLabs (Settings â†’ API Keys)


// Prompt expressivo do agente (configure tambÃ©m no painel ElevenLabs)
export const AGENT_SYSTEM_PROMPT = `
VocÃª Ã© o Assistente Vigilaro, especialista em seguranÃ§a domÃ©stica e prevenÃ§Ã£o de acidentes.
Seu tom Ã©: caloroso, empÃ¡tico e direto. Fale como um especialista amigo, nÃ£o como um robÃ´.

Regras expressivas:
- Use [excited] ao encontrar uma boa notÃ­cia ou progresso
- Use [serious] ao relatar um risco crÃ­tico
- Use [empathetic] ao falar sobre uma situaÃ§Ã£o delicada (idoso, bebÃª)
- Use [whispers] apenas para dicas confidenciais ou alertas silenciosos
- Nunca leia em voz alta as tags â€” elas sÃ£o instruÃ§Ãµes de entonaÃ§Ã£o

Exemplos:
"[excited] Ã“tima notÃ­cia! Sua sala estÃ¡ 100% protegida."
"[serious] AtenÃ§Ã£o: identificamos uma irregularidade crÃ­tica no banheiro."
"[empathetic] Compreendo sua preocupaÃ§Ã£o com o bebÃª. Vamos resolver juntos."

Responda sempre em portuguÃªs brasileiro. Seja conciso (mÃ¡x. 3 frases por resposta).
`;

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AUDIO QUEUE PLAYER
// Toca chunks base64 (PCM/MP3) em sequÃªncia sem gaps
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
class AudioQueuePlayer {
    constructor() {
        this.queue = [];
        this.isPlaying = false;
        this.currentSound = null;
        this.onPlayingChange = null; // callback: (isPlaying) => void
    }

    enqueue(base64Chunk) {
        this.queue.push(base64Chunk);
        if (!this.isPlaying) {
            this._playNext();
        }
    }

    async _playNext() {
        if (this.queue.length === 0) {
            this.isPlaying = false;
            if (this.onPlayingChange) this.onPlayingChange(false);
            return;
        }

        this.isPlaying = true;
        if (this.onPlayingChange) this.onPlayingChange(true);

        const chunk = this.queue.shift();

        try {
            // Escrever chunk em arquivo temporÃ¡rio
            const fileUri = `${FileSystem.cacheDirectory}eleven_chunk_${Date.now()}.mp3`;
            await FileSystem.writeAsStringAsync(fileUri, chunk, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Configurar modo de Ã¡udio antes de tocar
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });

            const { sound } = await Audio.Sound.createAsync(
                { uri: fileUri },
                { shouldPlay: true, volume: 1.0 }
            );

            this.currentSound = sound;

            // Ao terminar, tocar prÃ³ximo
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync().catch(() => { });
                    // Limpar arquivo temp
                    FileSystem.deleteAsync(fileUri, { idempotent: true }).catch(() => { });
                    this._playNext();
                }
            });

        } catch (e) {
            if (__DEV__) { console.warn('[AudioQueue] Erro ao tocar chunk:', e); }
            this._playNext(); // Pular chunk com erro
        }
    }

    interrupt() {
        this.queue = [];
        if (this.currentSound) {
            this.currentSound.stopAsync().catch(() => { });
            this.currentSound.unloadAsync().catch(() => { });
            this.currentSound = null;
        }
        this.isPlaying = false;
        if (this.onPlayingChange) this.onPlayingChange(false);
    }

    clear() {
        this.interrupt();
    }
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ELEVENLABS SERVICE
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
class ElevenLabsService {
    constructor() {
        this.socket = null;
        this.status = 'disconnected';
        this.audioPlayer = new AudioQueuePlayer();
        this.recording = null;
        this.recordingInterval = null;

        this.callbacks = {
            onConnect: null,
            onDisconnect: null,
            onError: null,
            onTranscript: null,      // TranscriÃ§Ã£o do usuÃ¡rio
            onAgentText: null,        // Texto do agente (para exibir na tela)
            onStatusChange: null,     // 'listening' | 'thinking' | 'speaking' | 'idle'
        };
    }

    // â”€â”€â”€ CONEXÃƒO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    async connect(agentId = ELEVEN_AGENT_ID) {
        if (!agentId || agentId === 'YOUR_AGENT_ID_HERE') {
            if (__DEV__) { console.error('[ElevenLabs] âš ï¸ Configure o Agent ID em ElevenLabsService.js'); }
            if (this.callbacks.onError) {
                this.callbacks.onError(new Error('Agent ID nÃ£o configurado'));
            }
            return false;
        }

        if (this.socket) this.disconnect();

        console.log('[ElevenLabs] Conectando ao Agent:', agentId);
        this._setStatus('connecting');

        const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;

        try {
            this.socket = new WebSocket(wsUrl);

            this.socket.onopen = () => {
                console.log('[ElevenLabs] âœ… Conectado!');
                this._setStatus('listening');
                if (this.callbacks.onConnect) this.callbacks.onConnect();
                // ComeÃ§ar a escutar o microfone automaticamente
                this.startMicStreaming();
            };

            this.socket.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);
                    this._handleMessage(msg);
                } catch (e) {
                    if (__DEV__) { console.warn('[ElevenLabs] Mensagem invÃ¡lida:', event.data); }
                }
            };

            this.socket.onerror = (error) => {
                if (__DEV__) { console.error('[ElevenLabs] Erro:', error.message); }
                this._setStatus('error');
                if (this.callbacks.onError) this.callbacks.onError(error);
            };

            this.socket.onclose = (event) => {
                console.log(`[ElevenLabs] Desconectado. CÃ³digo: ${event.code} | Motivo: ${event.reason || 'sem motivo'} | Limpo: ${event.wasClean}`);
                this._setStatus('disconnected');
                this.stopMicStreaming();
                if (this.callbacks.onDisconnect) this.callbacks.onDisconnect();
            };

            return true;
        } catch (e) {
            if (__DEV__) { console.error('[ElevenLabs] ExceÃ§Ã£o ao conectar:', e); }
            if (this.callbacks.onError) this.callbacks.onError(e);
            return false;
        }
    }

    // â”€â”€â”€ STREAMING DE MICROFONE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Expo Go nÃ£o permite ler o arquivo durante gravaÃ§Ã£o (getURI() = null).
    // SoluÃ§Ã£o: ciclo gravar(1.2s) â†’ parar â†’ ler base64 â†’ enviar â†’ regravar
    async startMicStreaming() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                if (__DEV__) { console.warn('[ElevenLabs] PermissÃ£o de microfone negada'); }
                return;
            }

            this.isStreaming = true;
            console.log('[ElevenLabs] ðŸŽ¤ Iniciando ciclo de microfone...');
            this._runRecordingCycle();
        } catch (e) {
            if (__DEV__) { console.error('[ElevenLabs] Erro ao iniciar microfone:', e); }
        }
    }

    async _runRecordingCycle() {
        if (!this.isStreaming || this.status === 'disconnected') {
            console.log('[ElevenLabs] ðŸ”‡ Ciclo de microfone encerrado');
            return;
        }

        // Pausar gravaÃ§Ã£o enquanto o agente fala ou pensa
        if (this.status === 'speaking' || this.status === 'thinking') {
            console.log(`[ElevenLabs] â¸ï¸ Aguardando agente (${this.status})...`);
            setTimeout(() => this._runRecordingCycle(), 500);
            return;
        }

        try {
            // 1. Configurar Ã¡udio para gravaÃ§Ã£o
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // 2. Criar e iniciar gravaÃ§Ã£o
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync({
                android: {
                    extension: '.m4a',
                    outputFormat: 2,  // MPEG_4
                    audioEncoder: 3,  // AAC
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 64000,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.IOSOutputFormat?.MPEG4AAC || 'aac',
                    audioQuality: Audio.IOSAudioQuality?.HIGH || 127,
                    sampleRate: 16000,
                    numberOfChannels: 1,
                    bitRate: 64000,
                },
                isMeteringEnabled: false,
            });

            await recording.startAsync();
            this.recording = recording;

            // 3. Gravar por 1.2 segundos
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Se parou durante a espera, abortar
            if (!this.isStreaming) {
                await recording.stopAndUnloadAsync().catch(() => { });
                return;
            }

            // 4. Parar gravaÃ§Ã£o e ler o Ã¡udio
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();

            if (uri) {
                const base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: 'base64',
                });

                if (base64 && base64.length > 100) {
                    // Envia o Ã¡udio completo (sem strip de header)
                    this._sendAudioChunk(base64);
                    console.log(`[ElevenLabs] ðŸ“¤ Chunk enviado (${Math.round(base64.length / 1024)}KB) | primeiros chars: ${base64.substring(0, 16)}`);
                }

                // Limpar arquivo temporÃ¡rio
                FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => { });
            }

            this.recording = null;

            // 5. Iniciar prÃ³ximo ciclo
            if (this.isStreaming) {
                this._runRecordingCycle();
            }

        } catch (e) {
            if (__DEV__) { console.warn('[ElevenLabs] Erro no ciclo de gravaÃ§Ã£o:', e.message); }
            this.recording = null;
            // Tentar novamente apÃ³s 500ms
            if (this.isStreaming) {
                setTimeout(() => this._runRecordingCycle(), 500);
            }
        }
    }

    stopMicStreaming() {
        this.isStreaming = false;
        if (this.recording) {
            this.recording.stopAndUnloadAsync().catch(() => { });
            this.recording = null;
        }
    }

    // â”€â”€â”€ TRATAR MENSAGENS RECEBIDAS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    _handleMessage(msg) {
        console.log('[ElevenLabs] ðŸ“© Msg recebida:', msg.type, JSON.stringify(msg).substring(0, 200));
        switch (msg.type) {
            case 'audio':
                // Ãudio do agente falando â†’ fila de reproduÃ§Ã£o
                this._setStatus('speaking');
                const audioChunk = msg.audio_event?.audio_base_64 || msg.audio_event?.audio_base64_chunk || msg.audio;
                if (audioChunk) this.audioPlayer.enqueue(audioChunk);
                break;

            case 'agent_response':
                // Texto que o agente estÃ¡ falando (remover audio tags para display)
                const rawText = msg.agent_response_event?.agent_response || '';
                const cleanText = rawText.replace(/\[.*?\]/g, '').trim();
                if (cleanText && this.callbacks.onAgentText) {
                    this.callbacks.onAgentText(cleanText);
                }
                break;

            case 'agent_response_end':
                // Agente terminou de falar â†’ voltar a escutar
                console.log('[ElevenLabs] ðŸ”„ Agente terminou. Voltando a escutar...');
                this._setStatus('listening');
                break;

            case 'user_transcript':
                // TranscriÃ§Ã£o do que o usuÃ¡rio disse
                const transcript = msg.user_transcription_event?.user_transcript || '';
                if (transcript && this.callbacks.onTranscript) {
                    this.callbacks.onTranscript(transcript);
                }
                this._setStatus('thinking');
                break;

            case 'interruption':
                // UsuÃ¡rio interrompeu o agente
                this.audioPlayer.interrupt();
                this._setStatus('listening');
                break;

            case 'ping':
                // Keep-alive â€” responder com pong
                this._sendRaw({ type: 'pong', event_id: msg.ping_event?.event_id });
                break;

            case 'internal_tentative_agent_response':
                // Agente comeÃ§ando a pensar a resposta
                this._setStatus('thinking');
                break;

            default:
                break;
        }
    }

    // â”€â”€â”€ ENVIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    _sendAudioChunk(base64) {
        this._sendRaw({ user_audio_chunk: base64 });
    }

    _sendRaw(payload) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(payload));
        }
    }

    // â”€â”€â”€ STATUS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    _setStatus(newStatus) {
        this.status = newStatus;
        if (this.callbacks.onStatusChange) this.callbacks.onStatusChange(newStatus);
    }

    // â”€â”€â”€ DESCONEXÃƒO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    disconnect() {
        this.stopMicStreaming();
        this.audioPlayer.clear();
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
        this.status = 'disconnected';
    }

    // â”€â”€â”€ CALLBACKS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    on(event, callback) {
        if (Object.prototype.hasOwnProperty.call(this.callbacks, event)) {
            this.callbacks[event] = callback;
        }
    }

    // Atalho para configurar AudioQueue callback
    onAudioPlayingChange(callback) {
        this.audioPlayer.onPlayingChange = callback;
    }
}

export default new ElevenLabsService();
export { ELEVEN_AGENT_ID };

