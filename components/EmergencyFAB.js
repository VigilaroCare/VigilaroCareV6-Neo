/**
 * EmergencyFAB.js
 * Botão de Emergência Unificado
 * Vigilaro Care V5
 * 
 * FUNÇÕES:
 * - Toque simples: Abre tela SOS (chamadas 190/192/193)
 * - Segurar 3 segundos: Ativa modo pânico silencioso
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Vibration,
    TouchableWithoutFeedback,
} from 'react-native';
import NeoIcon from './NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadows } from '../utils/Theme';
import PanicButtonService from '../services/PanicButtonService';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

const PANIC_ACTIVATION_TIME = 3000; // 3 segundos para pânico

export default function EmergencyFAB({ style, navigation }) {
    const insets = useSafeAreaInsets();
    const { fabPosition, tooltipPosition } = useLeftHandedStyle();

    const [isPressing, setIsPressing] = useState(false);
    const [pressProgress, setPressProgress] = useState(0);
    const [isPanicActive, setIsPanicActive] = useState(false);

    const pressStartTime = useRef(null);
    const progressInterval = useRef(null);
    const tapTimeout = useRef(null);
    const progressAnim = useRef(new Animated.Value(0)).current;

    // Verificar estado do pânico
    useEffect(() => {
        const unsubscribe = PanicButtonService.addListener((active) => {
            setIsPanicActive(active);
        });

        const status = PanicButtonService.getStatus();
        setIsPanicActive(status.isActive);

        return () => unsubscribe();
    }, []);

    // Limpar intervalos ao desmontar
    useEffect(() => {
        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
            if (tapTimeout.current) clearTimeout(tapTimeout.current);
        };
    }, []);

    // Início do toque
    const handlePressIn = () => {
        // Se pânico ativo, desativar
        if (isPanicActive) {
            handleDeactivatePanic();
            return;
        }

        setIsPressing(true);
        pressStartTime.current = Date.now();

        // Vibração inicial leve
        Vibration.vibrate(30);

        // Timer de progresso
        progressInterval.current = setInterval(() => {
            const elapsed = Date.now() - pressStartTime.current;
            const progress = Math.min(elapsed / PANIC_ACTIVATION_TIME, 1);
            setPressProgress(progress);

            // Vibração a cada segundo
            if (progress >= 0.33 && progress < 0.34) Vibration.vibrate(20);
            if (progress >= 0.66 && progress < 0.67) Vibration.vibrate(20);

            // Ativar pânico quando completo
            if (progress >= 1) {
                clearInterval(progressInterval.current);
                activatePanic();
            }
        }, 50);

        // Animação
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: PANIC_ACTIVATION_TIME,
            useNativeDriver: false,
        }).start();
    };

    // Fim do toque
    const handlePressOut = () => {
        if (!isPressing) return;

        const elapsed = Date.now() - pressStartTime.current;

        // Limpar timer
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }

        // Se soltou antes de 3s, é um toque simples → SOS
        if (elapsed < PANIC_ACTIVATION_TIME && !isPanicActive) {
            openSOSScreen();
        }

        setIsPressing(false);
        setPressProgress(0);

        // Resetar animação
        Animated.timing(progressAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    // Abrir tela SOS
    const openSOSScreen = () => {
        Vibration.vibrate(50);
        navigation.navigate('SOSEmergencyMode');
    };

    // Ativar modo pânico
    const activatePanic = async () => {
        setIsPressing(false);
        setPressProgress(0);

        // Vibração de confirmação (discreta)
        Vibration.vibrate([0, 100, 50, 100]);

        await PanicButtonService.activate();
    };

    // Desativar pânico
    const handleDeactivatePanic = async () => {
        Vibration.vibrate(50);
        await PanicButtonService.deactivate();
    };

    // Cores e estilos animados
    const backgroundColor = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#DC2626', '#B91C1C', '#7F1D1D']
    });

    const scale = progressAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.05, 1.1]
    });

    const buttonSize = 56;

    return (
        <Animated.View
            style={[
                styles.container,
                { bottom: 100 + insets.bottom },
                { transform: [{ scale: isPressing ? scale : 1 }] },
                fabPosition('right'),
                style
            ]}
        >
            <TouchableWithoutFeedback
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Animated.View
                    style={[
                        styles.button,
                        {
                            width: buttonSize,
                            height: buttonSize,
                            borderRadius: buttonSize / 2,
                            backgroundColor: isPanicActive ? '#16A34A' : backgroundColor,
                        }
                    ]}
                >
                    {isPressing && !isPanicActive ? (
                        // Contador durante pressão
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>
                                {Math.ceil((1 - pressProgress) * 3)}
                            </Text>
                        </View>
                    ) : (
                        // Ícone normal
                        <View style={styles.iconContainer}>
                            {isPanicActive ? (
                                <NeoIcon name="ShieldTick" size={24} color="#FFF" />
                            ) : (
                                <Text style={styles.sosText}>SOS</Text>
                            )}
                            {isPanicActive && (
                                <View style={styles.recBadge}>
                                    <Text style={styles.recText}>REC</Text>
                                </View>
                            )}
                        </View>
                    )}
                </Animated.View>
            </TouchableWithoutFeedback>

            {/* Dica visual (aparece ao segurar) */}
            {isPressing && (
                <View style={[styles.tooltip, tooltipPosition('right')]}>
                    <Text style={styles.tooltipText}>Modo Pânico</Text>
                </View>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 9999,
        elevation: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.lg,
        shadowColor: '#DC2626',
    },
    iconContainer: {
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
    recBadge: {
        position: 'absolute',
        bottom: -8,
        backgroundColor: '#DC2626',
        paddingHorizontal: 4,
        paddingVertical: 1,
        borderRadius: 4,
    },
    recText: {
        color: '#FFF',
        fontSize: 8,
        fontWeight: 'bold',
    },
    tooltip: {
        position: 'absolute',
        top: 15,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sosText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
