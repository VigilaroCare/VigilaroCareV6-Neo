/**
 * RealtimeVoiceModal.js
 * Interface de Voz em Tempo Real - PREMIUM
 * Vigilaro Care V5
 * 
 * Visual estilo "Her" - minimalista e elegante
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    Vibration,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import NeoIcon from './NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RealtimeVoiceService from '../services/RealtimeVoiceService';
import { Colors, Shadows } from '../utils/Theme';

const { width, height } = Dimensions.get('window');

const STATES = {
    CONNECTING: 'connecting',
    IDLE: 'idle',
    LISTENING: 'listening',
    PROCESSING: 'processing',
    SPEAKING: 'speaking',
    ERROR: 'error',
};

export default function RealtimeVoiceModal({ visible, onClose, isPremium = false }) {
    const insets = useSafeAreaInsets();
    const [state, setState] = useState(STATES.CONNECTING);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [usage, setUsage] = useState({ used: 0, remaining: 15 });
    const [error, setError] = useState(null);

    const pulseAnim = useRef(new Animated.Value(1)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;

    // Animação de pulso
    useEffect(() => {
        if (state === STATES.LISTENING || state === STATES.SPEAKING) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 600,
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

    // Animação de ondas (speaking)
    useEffect(() => {
        if (state === STATES.SPEAKING) {
            const wave = Animated.loop(
                Animated.timing(waveAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                })
            );
            wave.start();
            return () => wave.stop();
        }
    }, [state]);

    // Conectar quando abrir
    useEffect(() => {
        if (visible && isPremium) {
            connectToRealtime();
        }

        return () => {
            RealtimeVoiceService.disconnect();
        };
    }, [visible, isPremium]);

    const connectToRealtime = async () => {
        try {
            setState(STATES.CONNECTING);

            // Verificar uso
            const currentUsage = await RealtimeVoiceService.checkUsage();
            setUsage(currentUsage);

            if (currentUsage.remaining <= 0) {
                setError('Limite mensal atingido. Aguarde o próximo mês ou faça upgrade.');
                setState(STATES.ERROR);
                return;
            }

            // Configurar callbacks
            RealtimeVoiceService.onStateChange = (newState) => {
                switch (newState) {
                    case 'connected':
                        setState(STATES.IDLE);
                        break;
                    case 'listening':
                        setState(STATES.LISTENING);
                        setResponse('');
                        break;
                    case 'processing':
                        setState(STATES.PROCESSING);
                        break;
                    case 'idle':
                        setState(STATES.IDLE);
                        break;
                    case 'disconnected':
                        if (visible) setState(STATES.CONNECTING);
                        break;
                }
            };

            RealtimeVoiceService.onTranscript = (text) => {
                setTranscript(text);
            };

            RealtimeVoiceService.onResponse = (text, isDone) => {
                if (isDone) {
                    setResponse(text);
                    setState(STATES.SPEAKING);
                } else {
                    setResponse(prev => prev + text);
                }
            };

            RealtimeVoiceService.onError = (err) => {
                console.error('Realtime error:', err);
                setError(err.message || 'Erro de conexão');
                setState(STATES.ERROR);
            };

            // Conectar
            await RealtimeVoiceService.connect();

            Vibration.vibrate(50);

        } catch (err) {
            console.error('Erro ao conectar:', err);
            setError(err.message || 'Não foi possível conectar');
            setState(STATES.ERROR);
        }
    };

    const handleMicPress = async () => {
        if (state === STATES.LISTENING) {
            await RealtimeVoiceService.stopListening();
        } else if (state === STATES.IDLE) {
            setTranscript('');
            setResponse('');
            await RealtimeVoiceService.startListening();
        } else if (state === STATES.SPEAKING) {
            // Interromper resposta real via API
            RealtimeVoiceService.cancelResponse();
            setState(STATES.IDLE);
        }
    };

    const handleClose = () => {
        RealtimeVoiceService.disconnect();
        onClose();
    };

    const getStateColor = () => {
        switch (state) {
            case STATES.LISTENING:
                return ['#DC2626', '#EF4444'];
            case STATES.SPEAKING:
                return ['#6366F1', '#8B5CF6'];
            case STATES.PROCESSING:
                return ['#F59E0B', '#FBBF24'];
            default:
                return ['#10B981', '#34D399'];
        }
    };

    const getStateText = () => {
        switch (state) {
            case STATES.CONNECTING:
                return 'Conectando...';
            case STATES.LISTENING:
                return 'Ouvindo...';
            case STATES.PROCESSING:
                return 'Pensando...';
            case STATES.SPEAKING:
                return 'Vigilaro';
            case STATES.ERROR:
                return 'Erro';
            default:
                return 'Toque para falar';
        }
    };

    const getStateIcon = () => {
        switch (state) {
            case STATES.LISTENING:
                return 'mic';
            case STATES.SPEAKING:
                return 'volume-high';
            case STATES.PROCESSING:
                return 'hourglass';
            default:
                return 'mic-outline';
        }
    };

    // Não mostrar se não for premium
    if (!isPremium) {
        return (
            <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
                <View style={styles.premiumRequired}>
                    <NeoIcon name="Diamonds" size={64} color="#6366F1" />
                    <Text style={styles.premiumTitle}>Recurso Premium</Text>
                    <Text style={styles.premiumText}>
                        Voz em tempo real está disponível apenas para assinantes Premium.
                    </Text>
                    <TouchableOpacity style={styles.upgradeButton} onPress={onClose}>
                        <Text style={styles.upgradeButtonText}>Fazer Upgrade</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={handleClose}
        >
            <View style={styles.container}>
                {/* Background gradiente escuro */}
                <LinearGradient
                    colors={['#0F172A', '#1E293B']}
                    style={StyleSheet.absoluteFill}
                />

                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <NeoIcon name="CloseSquare" size={28} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.usageContainer}>
                        <Text style={styles.usageText}>
                            {usage.remaining} min restantes
                        </Text>
                    </View>
                </View>

                {/* Centro - Orb animado */}
                <View style={styles.centerContainer}>
                    {state === STATES.CONNECTING ? (
                        <ActivityIndicator size="large" color="#6366F1" />
                    ) : state === STATES.ERROR ? (
                        <View style={styles.errorContainer}>
                            <NeoIcon name="Warning2" size={64} color="#EF4444" />
                            <Text style={styles.errorText}>{error}</Text>
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={connectToRealtime}
                            >
                                <Text style={styles.retryText}>Tentar Novamente</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={handleMicPress}
                            activeOpacity={0.9}
                        >
                            <Animated.View
                                style={[
                                    styles.orb,
                                    { transform: [{ scale: pulseAnim }] }
                                ]}
                            >
                                <LinearGradient
                                    colors={getStateColor()}
                                    style={styles.orbGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <NeoIcon
                                        name={getStateIcon()}
                                        size={48}
                                        color="#FFF"
                                    />
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>
                    )}

                    {/* Status text */}
                    <Text style={styles.stateText}>{getStateText()}</Text>
                </View>

                {/* Transcrição e Resposta */}
                <View style={[styles.textContainer, { paddingBottom: insets.bottom + 24 }]}>
                    {transcript && (
                        <View style={styles.transcriptBox}>
                            <Text style={styles.transcriptLabel}>Você:</Text>
                            <Text style={styles.transcriptText}>{transcript}</Text>
                        </View>
                    )}

                    {response && (
                        <View style={styles.responseBox}>
                            <Text style={styles.responseLabel}>Vigilaro:</Text>
                            <Text style={styles.responseText}>{response}</Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    usageContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    usageText: {
        color: '#94A3B8',
        fontSize: 14,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    orb: {
        width: 160,
        height: 160,
        borderRadius: 80,
        ...Shadows.lg,
        shadowColor: '#6366F1',
    },
    orbGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24,
    },
    textContainer: {
        paddingHorizontal: 24,
        maxHeight: height * 0.35,
    },
    transcriptBox: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    transcriptLabel: {
        color: '#94A3B8',
        fontSize: 12,
        marginBottom: 4,
    },
    transcriptText: {
        color: '#E2E8F0',
        fontSize: 16,
        lineHeight: 24,
    },
    responseBox: {
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: 16,
        padding: 16,
        borderLeftWidth: 3,
        borderLeftColor: '#6366F1',
    },
    responseLabel: {
        color: '#A5B4FC',
        fontSize: 12,
        marginBottom: 4,
    },
    responseText: {
        color: '#FFF',
        fontSize: 16,
        lineHeight: 24,
    },
    errorContainer: {
        alignItems: 'center',
        padding: 24,
    },
    errorText: {
        color: '#FCA5A5',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    retryButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    retryText: {
        color: '#FFF',
        fontWeight: '600',
    },
    premiumRequired: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        padding: 32,
    },
    premiumTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 24,
        marginBottom: 12,
    },
    premiumText: {
        color: '#94A3B8',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
    upgradeButton: {
        backgroundColor: '#6366F1',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 28,
        marginBottom: 16,
    },
    upgradeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    closeText: {
        color: '#94A3B8',
        fontSize: 16,
    },
});
