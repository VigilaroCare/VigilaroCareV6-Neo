/**
 * DiscretePanicButton.js
 * Botão de Pânico Discreto com Pressão Longa
 * Vigilaro Care V5
 * 
 * CARACTERÍSTICAS:
 * - Acionamento por pressão longa (3 segundos)
 * - Contador visual durante pressão
 * - Feedback discreto (vibração apenas)
 * - Modo invisível quando ativo (tela continua normal)
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    Vibration,
    Modal,
    TouchableOpacity,
    Alert
} from 'react-native';
import NeoIcon from './NeoIcon';
import * as Speech from 'expo-speech';
import { Colors, Spacing, BorderRadius, Shadows } from '../utils/Theme';
import PanicButtonService from '../services/PanicButtonService';

const ACTIVATION_TIME = 3000; // 3 segundos para ativar

export default function DiscretePanicButton({ style, size = 'normal' }) {
    const [isPressing, setIsPressing] = useState(false);
    const [pressProgress, setPressProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    const pressStartTime = useRef(null);
    const progressInterval = useRef(null);
    const progressAnim = useRef(new Animated.Value(0)).current;

    // Registrar listener para mudanças de estado
    useEffect(() => {
        const unsubscribe = PanicButtonService.addListener((active) => {
            setIsActive(active);
        });

        // Verificar estado inicial
        const status = PanicButtonService.getStatus();
        setIsActive(status.isActive);

        return () => unsubscribe();
    }, []);

    // Iniciar pressão
    const handlePressIn = () => {
        console.log('🔴 PANIC BUTTON: PressIn detected!');
        setIsPressing(true);
        pressStartTime.current = Date.now();

        // Vibração inicial leve
        Vibration.vibrate(50);

        // Iniciar animação de progresso
        progressInterval.current = setInterval(() => {
            const elapsed = Date.now() - pressStartTime.current;
            const progress = Math.min(elapsed / ACTIVATION_TIME, 1);
            setPressProgress(progress);

            // Vibração a cada 1 segundo de progresso
            if (progress >= 0.33 && progress < 0.34) Vibration.vibrate(30);
            if (progress >= 0.66 && progress < 0.67) Vibration.vibrate(30);

            // Ativar quando completo
            if (progress >= 1) {
                clearInterval(progressInterval.current);
                activatePanic();
            }
        }, 50);

        // Animação suave
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: ACTIVATION_TIME,
            useNativeDriver: false,
        }).start();
    };

    // Soltar pressão
    const handlePressOut = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }

        setIsPressing(false);
        setPressProgress(0);

        // Resetar animação
        Animated.timing(progressAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    // Ativar modo pânico
    const activatePanic = async () => {
        setIsPressing(false);
        setPressProgress(0);

        // Ativar o serviço
        await PanicButtonService.activate();

        // Modal não aparece - modo discreto!
        // O usuário sabe que está ativo pela vibração
    };

    // Falar mensagem discreta (via fone de ouvido se conectado)
    const speakDiscrete = (message, options = {}) => {
        Speech.speak(message, {
            language: 'pt-BR',
            pitch: 1.0,
            rate: 0.9,
            volume: 0.7, // Volume moderado
            ...options
        });
    };

    // Desativar modo pânico
    const handleDeactivate = async () => {
        const result = await PanicButtonService.deactivate();
        setShowDeactivateModal(false);

        // Feedback por VOZ no encerramento (pessoa já está segura)
        if (result) {
            const duration = Math.round(result.duration);
            const hasRecording = result.recordingPath ? 'Áudio gravado e salvo.' : '';
            speakDiscrete(
                `Modo de proteção desativado. Duração: ${duration} segundos. ${hasRecording}`,
                { rate: 0.85 }
            );
        }
    };

    // Pressão no botão quando ativo - mostrar opção de desativar
    const handleActivePress = () => {
        setShowDeactivateModal(true);
    };

    // Calcular tamanho baseado na prop
    const buttonSize = size === 'small' ? 48 : size === 'large' ? 72 : 56;
    const iconSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;

    // Cor de fundo animada
    const backgroundColor = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#DC2626', '#B91C1C', '#7F1D1D']
    });

    // Escala animada
    const scale = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1.15]
    });

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    style,
                    {
                        width: buttonSize,
                        height: buttonSize,
                        borderRadius: buttonSize / 2,
                        backgroundColor: isActive ? '#16A34A' : backgroundColor,
                        transform: [{ scale: isPressing ? scale : 1 }]
                    }
                ]}
            >
                <TouchableOpacity
                    style={styles.touchable}
                    onPressIn={isActive ? undefined : handlePressIn}
                    onPressOut={isActive ? undefined : handlePressOut}
                    onPress={isActive ? handleActivePress : undefined}
                    activeOpacity={0.9}
                    delayLongPress={0}
                >
                    {isPressing ? (
                        // Mostrar progresso durante pressão
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>
                                {Math.ceil((1 - pressProgress) * 3)}
                            </Text>
                        </View>
                    ) : (
                        // Ícone normal ou ativo
                        <NeoIcon
                            name={isActive ? 'shield-checkmark' : 'finger-print'}
                            size={iconSize}
                            color="#FFF"
                        />
                    )}
                </TouchableOpacity>

                {/* Indicador de Ativo (discreto) */}
                {isActive && (
                    <View style={styles.activeIndicator}>
                        <View style={styles.activeDot} />
                    </View>
                )}
            </Animated.View>

            {/* Modal de Desativação */}
            <Modal
                visible={showDeactivateModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDeactivateModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIcon}>
                            <NeoIcon name="ShieldTick" size={48} color="#16A34A" />
                        </View>

                        <Text style={styles.modalTitle}>Modo de Proteção Ativo</Text>
                        <Text style={styles.modalSubtitle}>
                            Gravação e rastreamento em andamento.{'\n'}
                            Contatos foram alertados.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowDeactivateModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Manter Ativo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deactivateButton}
                                onPress={handleDeactivate}
                            >
                                <NeoIcon name="StopCircle" size={20} color="#FFF" />
                                <Text style={styles.deactivateButtonText}>Desativar</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.modalHint}>
                            Pressione "Manter Ativo" para fechar este aviso discretamente.
                        </Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.lg,
        shadowColor: '#DC2626',
    },
    touchable: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    activeIndicator: {
        position: 'absolute',
        top: -4,
        right: -4,
    },
    activeDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#16A34A',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.lg,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        width: '100%',
        maxWidth: 340,
        alignItems: 'center',
    },
    modalIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 14,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.lg,
        lineHeight: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    deactivateButton: {
        flex: 1,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        backgroundColor: '#DC2626',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    deactivateButtonText: {
        color: '#FFF',
        fontWeight: '600',
    },
    modalHint: {
        marginTop: Spacing.md,
        fontSize: 12,
        color: Colors.textTertiary,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
