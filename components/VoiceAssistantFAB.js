/**
 * VoiceAssistantFAB.js
 * Botão Flutuante para Assistente de Voz
 * Vigilaro Care V6 Neo
 *
 * MODOS:
 * - Toque: Modo básico (Whisper + GPT + OpenAI TTS Neural)
 * - Long-press (2s): Modo Premium Realtime (WebSocket streaming)
 *
 * [MIG-AV-08] Migrado de expo-av para expo-audio (SDK 54+)
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Vibration,
    ActivityIndicator,
} from 'react-native';
import NeoIcon from './NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { AudioRecorder, AudioModule, RecordingPresets } from 'expo-audio'; // [MIG-AV-08]
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Shadows, Colors } from '../utils/Theme';
import OpenAIService from '../services/OpenAIService';
import VoiceService from '../services/VoiceService';
import RealtimeVoiceModal from './RealtimeVoiceModal';
import SubscriptionService from '../services/SubscriptionService';
import UsageLimitsService from '../services/UsageLimitsService';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useTranslation } from 'react-i18next';

const STATES = {
    IDLE: 'idle',
    LISTENING: 'listening',
    PROCESSING: 'processing',
    SPEAKING: 'speaking',
};

const LONG_PRESS_TIME = 2000; // 2 segundos para modo Premium

export default function VoiceAssistantFAB({ style, isPremium = false, navigation }) {
    const insets = useSafeAreaInsets();
    const { fabPosition } = useLeftHandedStyle();
    const [state, setState] = useState(STATES.IDLE);
    const { t } = useTranslation();

    const [showModal, setShowModal] = useState(false);
    const [showRealtimeModal, setShowRealtimeModal] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [limitMessage, setLimitMessage] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    const [userIsPremium, setUserIsPremium] = useState(isPremium);

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const recorderRef = useRef(null); // [MIG-AV-08] era: recordingRef
    const longPressTimer = useRef(null);
    const pressStartTime = useRef(null);

    // Verificar status Premium ao montar
    useEffect(() => {
        checkPremiumStatus();
    }, []);

    const checkPremiumStatus = async () => {
        try {
            const premium = await SubscriptionService.isPremium();
            setUserIsPremium(premium || isPremium);
        } catch (e) {
            setUserIsPremium(isPremium);
        }
    };

    // Animação de escuta
    useEffect(() => {
        if (state === STATES.LISTENING) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.3,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulse.start();
            return () => pulse.stop();
        } else {
            pulseAnim.setValue(1);
        }
    }, [state]);

    // Long-press para ativar modo Premium Realtime
    const handlePressIn = () => {
        pressStartTime.current = Date.now();

        // Timer para long-press (modo Premium)
        if (userIsPremium) {
            longPressTimer.current = setTimeout(() => {
                Vibration.vibrate([0, 50, 50, 50]); // Feedback de ativação Premium
                setShowRealtimeModal(true);
                pressStartTime.current = null;
            }, LONG_PRESS_TIME);
        }
    };

    const handlePressOut = async () => {
        // Cancelar timer de long-press
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }

        // Se foi um toque curto (não long-press), usar modo básico
        if (pressStartTime.current) {
            const elapsed = Date.now() - pressStartTime.current;
            pressStartTime.current = null;

            if (elapsed < LONG_PRESS_TIME) {
                await handleFABPress();
            }
        }
    };

    // Toggle: toque para iniciar/parar (modo básico)
    const handleFABPress = async () => {
        if (state === STATES.IDLE) {
            await startListening();
        } else if (state === STATES.LISTENING) {
            await stopListening();
        } else if (state === STATES.SPEAKING) {
            cancel();
        }
    };

    // Iniciar gravação
    const startListening = async () => {
        try {
            // Verificar limite de uso (FREE: 20/mês)
            const canUse = await UsageLimitsService.canUse('voiceAssistant');
            if (!canUse.allowed) {
                const msg = UsageLimitsService.getLimitMessage('voiceAssistant');
                setLimitMessage(msg);
                setShowLimitModal(true);
                Vibration.vibrate(50);
                return;
            }

            // LIMPEZA PREVENTIVA OBRIGATÓRIA (Crucial para Android)
            if (recorderRef.current) { // [MIG-AV-08]
                try {
                    await recorderRef.current.stop(); // [MIG-AV-08]
                } catch (e) {
                    console.log('VoiceAssistantFAB: Cleanup error', e);
                }
                recorderRef.current = null;
            }

            // Solicitar permissão
            const { granted } = await AudioModule.requestRecordingPermissionsAsync(); // [MIG-AV-08]
            if (!granted) {
                alert(t('ai_assistant.micPermission'));
                return;
            }

            // Configurar áudio
            await AudioModule.setAudioModeAsync({ // [MIG-AV-08]
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Iniciar gravação
            // [MIG-AV-08] AudioRecorder substitui Audio.Recording.createAsync()
            const recorder = new AudioRecorder(RecordingPresets.HIGH_QUALITY);
            await recorder.record();

            recorderRef.current = recorder;
            setState(STATES.LISTENING);
            setShowModal(true);
            setTranscript('');
            setResponse('');

            Vibration.vibrate(50);

        } catch (error) {
            console.error('Erro ao iniciar gravação:', error);
            alert(t('ai_assistant.micError'));
        }
    };

    // Parar gravação e processar
    const stopListening = async () => {
        console.log('VoiceAssistantFAB: stopListening called');
        if (!recorderRef.current) { // [MIG-AV-08]
            console.log('VoiceAssistantFAB: No recording ref found');
            return;
        }

        try {
            setState(STATES.PROCESSING);
            Vibration.vibrate(30);

            // Parar gravação
            try {
                await recorderRef.current.stop(); // [MIG-AV-08]
            } catch (err) {
                console.log('VoiceAssistantFAB: Error stopping recording', err);
            }

            const uri = recorderRef.current.uri; // [MIG-AV-08]
            console.log('VoiceAssistantFAB: Recording URI:', uri);
            recorderRef.current = null;

            if (!uri) {
                console.error('VoiceAssistantFAB: No URI generated');
                setTranscript('Erro na gravação.');
                setState(STATES.IDLE);
                setTimeout(() => setShowModal(false), 1500);
                return;
            }

            // Transcrever
            setTranscript(t('ai_assistant.transcribing'));
            const text = await OpenAIService.transcribeAudio(uri);
            console.log('VoiceAssistantFAB: Transcribed text:', text);

            if (!text || text.trim() === '') {
                setTranscript(t('ai_assistant.notUnderstood'));
                setState(STATES.IDLE);
                setTimeout(() => setShowModal(false), 1500);
                return;
            }

            setTranscript(text);

            // Processar com IA (resposta curta para velocidade)
            const aiResponse = await OpenAIService.sendMessage(
                text + " (responda de forma breve e direta)",
                conversationHistory
            );
            setResponse(aiResponse);

            // Atualizar histórico
            setConversationHistory(prev => [
                ...prev.slice(-4), // Manter só últimas 2 trocas para velocidade
                { role: 'user', content: text },
                { role: 'assistant', content: aiResponse }
            ]);

            // Falar resposta com OpenAI TTS Neural (voz mais natural!)
            setState(STATES.SPEAKING);

            // Registrar uso (sucesso!)
            await UsageLimitsService.recordUsage('voiceAssistant');

            try {
                // Gerar áudio neural via OpenAI
                const audioData = await OpenAIService.generateSpeech(aiResponse);

                // Tocar áudio
                await VoiceService.playAudio(audioData);

                // Aguardar término do áudio (polling simples)
                const checkFinished = setInterval(() => {
                    if (!VoiceService.isSpeaking) {
                        clearInterval(checkFinished);
                        setState(STATES.IDLE);
                        setTimeout(() => setShowModal(false), 1000);
                    }
                }, 500);

            } catch (ttsError) {
                console.warn('OpenAI TTS falhou, usando fallback expo-speech:', ttsError);
                // Fallback para expo-speech se OpenAI falhar
                const Speech = require('expo-speech');
                Speech.speak(aiResponse, {
                    language: 'pt-BR',
                    rate: 1.0,
                    onDone: () => {
                        setState(STATES.IDLE);
                        setTimeout(() => setShowModal(false), 1000);
                    },
                    onError: () => {
                        setState(STATES.IDLE);
                        setShowModal(false);
                    }
                });
            }

        } catch (error) {
            console.error('Erro ao processar:', error);
            setResponse(t('ai_assistant.networkError'));
            setState(STATES.IDLE);
            setTimeout(() => setShowModal(false), 1500);
        }
    };

    // Cancelar
    const cancel = async () => {
        if (recorderRef.current) { // [MIG-AV-08]
            try {
                await recorderRef.current.stop(); // [MIG-AV-08]
            } catch (e) { }
            recorderRef.current = null;
        }
        // Parar VoiceService (OpenAI TTS) e fallback Speech
        await VoiceService.stopSpeaking();
        setState(STATES.IDLE);
        setShowModal(false);
    };

    // Renderizar estado do modal
    const renderModalContent = () => {
        switch (state) {
            case STATES.LISTENING:
                return (
                    <View style={styles.modalContent}>
                        <Animated.View style={[styles.micCircle, { transform: [{ scale: pulseAnim }] }]}>
                            <NeoIcon name="Microphone2" size={48} color="#FFF" />
                        </Animated.View>
                        <Text style={styles.statusText}>{t('ai_assistant.listening')}</Text>
                        <Text style={styles.hintText}>{t('ai_assistant.tapToSend')}</Text>
                    </View>
                );

            case STATES.PROCESSING:
                return (
                    <View style={styles.modalContent}>
                        <ActivityIndicator size="large" color="#6366F1" />
                        <Text style={styles.statusText}>{t('ai_assistant.processing')}</Text>
                        {transcript && transcript !== t('ai_assistant.transcribing') && (
                            <Text style={styles.transcriptText}>"{transcript}"</Text>
                        )}
                    </View>
                );

            case STATES.SPEAKING:
                return (
                    <View style={styles.modalContent}>
                        <View style={styles.speakingCircle}>
                            <NeoIcon name="VolumeHigh" size={48} color="#FFF" />
                        </View>
                        <Text style={styles.responseText} numberOfLines={5}>{response}</Text>
                        <TouchableOpacity style={styles.stopButton} onPress={cancel}>
                            <Text style={styles.stopButtonText}>{t('ai_assistant.stop')}</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* FAB de Voz */}
            <TouchableOpacity
                style={[
                    styles.fab,
                    { bottom: 100 + insets.bottom },
                    state === STATES.LISTENING && styles.fabRecording,
                    fabPosition('left'),
                    style
                ]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
            >
                <LinearGradient
                    colors={state === STATES.LISTENING ? ['#DC2626', '#EF4444'] : ['#6366F1', '#8B5CF6']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <NeoIcon
                        name={state === STATES.LISTENING ? "stop" : "mic-outline"}
                        size={26}
                        color="#FFF"
                    />
                </LinearGradient>
            </TouchableOpacity>

            {/* Modal de Interação */}
            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={cancel}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={state === STATES.LISTENING ? stopListening : cancel}
                >
                    <View style={styles.modalCard}>
                        <View style={styles.modalHeader}>
                            <View style={styles.headerIcon}>
                                <NeoIcon name="MagicStar" size={20} color="#FFF" />
                            </View>
                            <Text style={styles.headerTitle}>Vigilaro</Text>
                            <TouchableOpacity onPress={cancel} style={styles.closeButton}>
                                <NeoIcon name="CloseSquare" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        {renderModalContent()}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Modal de Voz em Tempo Real (Premium) */}
            <RealtimeVoiceModal
                visible={showRealtimeModal}
                onClose={() => setShowRealtimeModal(false)}
                isPremium={userIsPremium}
            />

            {/* Modal de Limite Atingido */}
            <Modal
                visible={showLimitModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowLimitModal(false)}
            >
                <View style={styles.limitOverlay}>
                    <View style={styles.limitCard}>
                        <NeoIcon name="Timer1" size={48} color="#F59E0B" />
                        <Text style={styles.limitTitle}>{limitMessage?.title || t('ai_assistant.limitReached')}</Text>
                        <Text style={styles.limitText}>{limitMessage?.message}</Text>

                        <TouchableOpacity
                            style={styles.upgradeButton}
                            onPress={() => {
                                setShowLimitModal(false);
                                if (navigation) {
                                    navigation.navigate('UpgradePremium');
                                }
                            }}
                        >
                            <LinearGradient
                                colors={['#6366F1', '#8B5CF6']}
                                style={styles.upgradeGradient}
                            >
                                <Text style={styles.upgradeText}>{t('ai_assistant.bePremium')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.laterButton}
                            onPress={() => setShowLimitModal(false)}
                        >
                            <Text style={styles.laterText}>{t('ai_assistant.later')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        zIndex: 9999,
        elevation: 10,
    },
    fabRecording: {
        // Estilo extra quando gravando
    },
    gradient: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.lg,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        width: '85%',
        maxWidth: 340,
        padding: 24,
        ...Shadows.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
    modalContent: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    micCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    speakingCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#6366F1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 6,
    },
    hintText: {
        fontSize: 14,
        color: '#6B7280',
    },
    transcriptText: {
        fontSize: 14,
        color: '#6B7280',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
    },
    responseText: {
        fontSize: 15,
        color: '#1F2937',
        textAlign: 'center',
        lineHeight: 22,
    },
    stopButton: {
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 10,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
    },
    stopButtonText: {
        color: '#6B7280',
        fontWeight: '600',
    },
    // Limit Modal Styles
    limitOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    limitCard: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 32,
        width: '85%',
        maxWidth: 340,
        alignItems: 'center',
        ...Shadows.lg,
    },
    limitTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginTop: 16,
        marginBottom: 8,
    },
    limitText: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    upgradeButton: {
        width: '100%',
        marginBottom: 12,
    },
    upgradeGradient: {
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    upgradeText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    laterButton: {
        paddingVertical: 10,
    },
    laterText: {
        color: '#9CA3AF',
        fontSize: 14,
    },
});