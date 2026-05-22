import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AudioMonitorService from '../services/AudioMonitorService';
import { Colors, Shadows } from '../utils/Theme';
import { useIsFocused } from '@react-navigation/native';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoAlert from '../utils/NeoAlert';

export default function AudioMonitorScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [dbLevel, setDbLevel] = useState(0);
    const [status, setStatus] = useState('Seguro'); // Seguro, Alerta, Perigo

    // Animation Values
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rippleAnim = useRef(new Animated.Value(0)).current;

    const isFocused = useIsFocused();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/active/) && nextAppState !== 'active' && isMonitoring) {
                AudioMonitorService.stopMonitoring();
                setIsMonitoring(false);
            }
            appState.current = nextAppState;
        });

        if (!isFocused && isMonitoring) {
            AudioMonitorService.stopMonitoring();
            setIsMonitoring(false);
        }

        return () => {
            subscription.remove();
            AudioMonitorService.stopMonitoring();
        };
    }, [isFocused, isMonitoring]);

    const toggleMonitoring = async () => {
        if (isMonitoring) {
            await AudioMonitorService.stopMonitoring();
            setIsMonitoring(false);
            setDbLevel(0);
            setStatus('Inativo');
            stopAnimations();
        } else {
            const permission = await AudioMonitorService.requestPermissions();
            if (!permission) {
                NeoAlert.alert('Permissão Necessária', 'Precisamos acessar o microfone para ouvir o ambiente.');
                return;
            }

            setIsMonitoring(true);
            setStatus('Ouvindo...');
            startAnimations();

            AudioMonitorService.startMonitoring(
                (level) => {
                    setDbLevel(level);
                    updateVisuals(level);
                },
                (alertLevel) => {
                    setStatus('BARULHO DETECTADO!');
                    // Aqui poderia disparar vibração ou notificação push local
                }
            );
        }
    };

    const updateVisuals = (level) => {
        // Mudar status e cor baseada no nível (0-100)
        if (level > 80) setStatus('CRÍTICO (Gritos/Quebra)');
        else if (level > 50) setStatus('Alerta (Conversa Alta)');
        else setStatus('Ambiente Seguro');

        // Animação de pulso baseada no volume
        const scale = 1 + (level / 100) * 0.5; // Scale up to 1.5x
        Animated.timing(pulseAnim, {
            toValue: scale,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const startAnimations = () => {
        // Ripple Effect Loop
        Animated.loop(
            Animated.timing(rippleAnim, {
                toValue: 1,
                duration: 2000,
                easing: Easing.out(Easing.circle),
                useNativeDriver: true,
            })
        ).start();
    };

    const stopAnimations = () => {
        pulseAnim.setValue(1);
        rippleAnim.setValue(0);
    };

    // Interpolation for Ripple
    const rippleScale = rippleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 3]
    });
    const rippleOpacity = rippleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 0]
    });

    const getStatusColor = () => {
        if (!isMonitoring) return '#9E9E9E';
        if (dbLevel > 80) return '#F44336'; // Red
        if (dbLevel > 50) return '#FF9800'; // Orange
        return '#4CAF50'; // Green
    };

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <NeoIcon name="ArrowLeft2" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.monitorDeUdio', 'Monitor de Áudio')}</Text>
                <TouchableOpacity style={styles.helpButton}>
                    <NeoIcon name="Question" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Visualizer Circle */}
                <View style={styles.visualizerContainer}>
                    {/* Ripple Ring (Only when active) */}
                    {isMonitoring && (
                        <Animated.View style={[
                            styles.rippleRing,
                            {
                                borderColor: getStatusColor(),
                                transform: [{ scale: rippleScale }],
                                opacity: rippleOpacity
                            }
                        ]} />
                    )}

                    {/* Main Pulse Circle */}
                    <Animated.View style={[
                        styles.pulseCircle,
                        {
                            backgroundColor: getStatusColor(),
                            transform: [{ scale: pulseAnim }],
                            shadowColor: getStatusColor(),
                        }
                    ]}>
                        <NeoIcon name={isMonitoring ? "mic" : "mic-off"} size={48} color="#FFF" />
                    </Animated.View>
                </View>

                {/* Status Text */}
                <Text style={[styles.statusTitle, { color: getStatusColor() }]}>
                    {status}
                </Text>
                <Text style={styles.statusDesc}>
                    {isMonitoring
                        ? `Nível de Ruído: ${dbLevel.toFixed(0)}%`
                        : "Toque para ativar a escuta de segurança"}
                </Text>

                {/* Tips Card */}
                <View style={styles.tipsCard}>
                    <NeoIcon name="InfoCircle" size={24} color={Colors.primary} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.tipTitle}>{t('headersFirst.comoFunciona', 'Como funciona?')}</Text>
                        <Text style={styles.tipText}>
                            {t('headersFirst.deixeEsteCelularNoQuartoDoBebOuAmbienteM', `Deixe este celular no quarto do bebê ou ambiente monitorado.
                            Se houver choro ou barulho alto, ele emitirá um alerta visual.`)}
                        </Text>
                    </View>
                </View>

                {/* Control Button */}
                <TouchableOpacity
                    style={[styles.mainButton, { backgroundColor: isMonitoring ? '#FF3B30' : '#4CAF50' }]}
                    onPress={toggleMonitoring}
                >
                    <Text style={styles.buttonText}>
                        {isMonitoring ? "DESATIVAR ESCUTA" : "ATIVAR MONITOR"}
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    backButton: {
        padding: 8,
        borderRadius: 12,
        backgroundColor: 'transparent',
        ...Shadows.sm
    },
    helpButton: {
        padding: 8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    visualizerContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    pulseCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        zIndex: 2,
    },
    rippleRing: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        zIndex: 1,
    },
    statusTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 8,
        textAlign: 'center',
    },
    statusDesc: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    tipsCard: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 40,
        width: '100%',
        ...Shadows.sm
    },
    tipTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    tipText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    mainButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        ...Shadows.md
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
