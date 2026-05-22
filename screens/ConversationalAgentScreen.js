import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../components/NeoIcon';
import OpenAIService from '../services/OpenAIService';
import VoiceService from '../services/VoiceService'; // Já migrado para expo-audio
import { Shadows } from '../utils/Theme';
import { useAudioRecorder, AudioModule, RecordingPresets, createAudioPlayer } from 'expo-audio'; // [MIG-AV-07]
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

const STATES = {
    IDLE: 'idle',
    LISTENING: 'listening',
    THINKING: 'thinking',
    SPEAKING: 'speaking',
    ERROR: 'error',
};

export default function ConversationalAgentScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const [status, setStatus] = useState(STATES.IDLE);
    const [messages, setMessages] = useState([]);
    const [conversationHistory, setConversationHistory] = useState([]); // Para contexto da IA

    const scrollViewRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    
    // [MIG-AV-07] Using the official hook for better lifecycle management
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const soundRef = useRef(null); // Para playback de TTS

    // Animação de pulso para o microfone
    useEffect(() => {
        if (status === STATES.LISTENING) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 1.2, duration: 400, useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 400, useNativeDriver: true })
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [status]);

    // Cleanup de áudio ao desmontar
    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.stop(); // [MIG-AV-07]
            }
            VoiceService.stopSpeaking();
        };
    }, []);

    const appendMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const toggleListening = async () => {
        if (status === STATES.IDLE || status === STATES.ERROR) {
            await startListening();
        } else if (status === STATES.LISTENING) {
            await stopListening();
        } else if (status === STATES.SPEAKING) {
            await stopSpeaking();
        }
    };

    const startListening = async () => {
        try {
            const { granted } = await AudioModule.requestRecordingPermissionsAsync(); // [MIG-AV-07]
            if (!granted) {
                alert('Permissão de microfone necessária');
                setStatus(STATES.ERROR);
                return;
            }

            await AudioModule.setAudioModeAsync({ // [MIG-AV-07]
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // [MIG-AV-07] recorder is managed by the useAudioRecorder hook
            await recorder.prepareToRecordAsync();
            recorder.record();

            setStatus(STATES.LISTENING);
            appendMessage('agent', 'Estou ouvindo...');

        } catch (e) {
            console.error('Erro ao iniciar gravação:', e);
            alert('Erro ao acessar microfone');
            setStatus(STATES.ERROR);
        }
    };

    const stopListening = async () => {
        if (!recorder) return; // [MIG-AV-07]

        try {
            setStatus(STATES.THINKING);
            appendMessage('agent', 'Processando...');

            await recorder.stop(); // [MIG-AV-07]
            const uri = recorder.uri; // [MIG-AV-07]

            if (!uri) {
                appendMessage('agent', 'Erro na gravação. Tente novamente.');
                setStatus(STATES.ERROR);
                return;
            }

            // 1. Transcrever áudio
            const userTranscript = await OpenAIService.transcribeAudio(uri);
            appendMessage('user', userTranscript);

            if (!userTranscript || userTranscript.trim() === '') {
                appendMessage('agent', 'Não entendi. Pode repetir?');
                setStatus(STATES.IDLE);
                return;
            }

            // 2. Obter resposta da IA
            const agentResponse = await OpenAIService.sendMessage(userTranscript, conversationHistory);
            appendMessage('agent', agentResponse);

            // Atualizar histórico de conversa
            setConversationHistory(prev => [
                ...prev.slice(-4), // Manter as últimas 2 trocas (user + agent)
                { role: 'user', content: userTranscript },
                { role: 'assistant', content: agentResponse }
            ]);

            // 3. Falar resposta (TTS)
            await speakText(agentResponse);

        } catch (e) {
            console.error('Erro no fluxo de voz:', e);
            const errorMsg = e.message?.includes('API') || e.message?.includes('401') || e.message?.includes('429')
                ? 'Sua chave de API pode estar expirada ou sem créditos. Verifique em platform.openai.com.'
                : e.message?.includes('network') || e.message?.includes('fetch')
                    ? 'Sem conexão com a internet. Verifique sua rede.'
                    : 'Desculpe, tive um problema na conexão. Pode repetir?';
            appendMessage('agent', errorMsg);
            setStatus(STATES.ERROR);
        }
    };

    const speakText = async (text) => {
        try {
            setStatus(STATES.SPEAKING);

            await AudioModule.setAudioModeAsync({ // [MIG-AV-07]
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            });

            const fileUri = await OpenAIService.generateSpeech(text);

            // [MIG-AV-07] createAudioPlayer() factory (AudioPlayer constructor is not public)
            const player = createAudioPlayer({ uri: fileUri });
            player.addListener('playbackStatusUpdate', (playbackStatus) => {
                if (playbackStatus.didJustFinish) {
                    setStatus(STATES.IDLE);
                }
            });
            player.play();
            soundRef.current = player; // [MIG-AV-07]

        } catch (e) {
            console.error('Erro no TTS:', e);
            setStatus(STATES.ERROR);
        }
    };

    const stopSpeaking = async () => {
        if (soundRef.current) {
            soundRef.current.stop(); // [MIG-AV-07]
            soundRef.current = null;
        }
        setStatus(STATES.IDLE);
    };

    const getStatusText = () => {
        switch (status) {
            case STATES.LISTENING: return 'Escutando... (Toque para parar)';
            case STATES.THINKING: return 'Pensando...';
            case STATES.SPEAKING: return 'Respondendo...';
            case STATES.ERROR: return 'Tente novamente';
            default: return 'Toque no microfone e fale';
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case STATES.LISTENING: return '#10B981';
            case STATES.THINKING: return '#F59E0B';
            case STATES.SPEAKING: return '#3B82F6';
            case STATES.ERROR: return '#EF4444';
            default: return '#7C3AED';
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#0F0A1E" />
            <SafeAreaView edges={['top']} style={styles.headerSafe}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <NeoIcon name="ArrowDown2" size={28} color="rgba(255,255,255,0.7)" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t('headersFirst.vigilaroVoice', 'Vigilaro Voice')}</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <ScrollView
                style={styles.chatArea}
                contentContainerStyle={{ padding: 20, paddingBottom: 320 }}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((msg, idx) => (
                    <View key={idx} style={[styles.msgBubble, msg.role === 'agent' ? styles.agentBubble : styles.userBubble]}>
                        <Text style={styles.msgText}>{msg.text}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.orbWrapper}>
                <Animated.View style={[styles.orbRing, {
                    borderColor: getStatusColor(),
                    transform: [{ scale: pulseAnim }],
                    opacity: pulseAnim.interpolate({ inputRange: [1, 1.2], outputRange: [0.5, 0] })
                }]} />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.orb, { backgroundColor: getStatusColor() }]}
                    onPress={toggleListening}
                    disabled={status === STATES.THINKING}
                >
                    <NeoIcon
                        name={
                            status === STATES.LISTENING ? "microphone" :
                                status === STATES.SPEAKING ? "volume-high" :
                                    status === STATES.THINKING ? "dots-horizontal" : "microphone-outline"
                        }
                        size={54}
                        color="#FFF"
                    />
                </TouchableOpacity>

                <Text style={styles.statusLabel}>{getStatusText()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F0A1E' },
    headerSafe: { backgroundColor: '#0F0A1E' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { color: '#FFF', fontSize: 17, fontWeight: '700' },
    chatArea: { flex: 1 },
    msgBubble: { padding: 14, borderRadius: 16, marginBottom: 12, maxWidth: '85%' },
    agentBubble: { backgroundColor: 'rgba(124,58,237,0.2)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.3)', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
    userBubble: { backgroundColor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
    msgText: { color: '#FFF', fontSize: 15, lineHeight: 22 },
    orbWrapper: { position: 'absolute', bottom: 90, left: 0, right: 0, alignItems: 'center', paddingBottom: 30, paddingTop: 20, backgroundColor: 'rgba(15,10,30,0.9)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', borderRadius: 24, marginHorizontal: 16 },
    orbRing: { position: 'absolute', top: 20, width: 120, height: 120, borderRadius: 60, borderWidth: 3 },
    orb: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 15, elevation: 10 },
    statusLabel: { color: '#FFF', fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 4 },
    statusSub: { color: 'rgba(255,255,255,0.5)', fontSize: 13 }
});