import React, { useState, useEffect, useRef } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import NeoIcon from './NeoIcon';
import NetInfo from '@react-native-community/netinfo';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoText, { H3, Body, Small } from './NeoTypography';
import NeoCard from './NeoCard';
import { useThemeColors } from '../utils/ThemeContext';

const { width } = Dimensions.get('window');

export default function OfflineModeModal() {
    const colors = useThemeColors();
    const [visible, setVisible] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    // Evitar flash inicial (só mostrar se conexão cair DEPOIS do load)
    const isFirstLoad = useRef(true);
    const offlineTimeout = useRef(null);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            // Lógica: Se estiver conectado, limpa qualquer aviso pendente ou ativo
            if (state.isConnected) {
                if (offlineTimeout.current) {
                    clearTimeout(offlineTimeout.current);
                    offlineTimeout.current = null;
                }
                setIsOffline(false);
                // Usamos uma referência interna ou checamos o estado atual para fechar
                slideDown(() => setVisible(false));
            }
            // Se estiver desconectado e não for o primeiro carregamento
            else if (state.isConnected === false && !isFirstLoad.current) {
                // Se já houver um timer ou o modal já estiver visível, não faz nada
                if (offlineTimeout.current) return;

                // Inicia carência de 3 segundos (tempo comum de handover entre WiFi e 4G)
                offlineTimeout.current = setTimeout(() => {
                    // Após 3 segundos, se ainda estiver offline, mostramos o modal
                    NetInfo.fetch().then(currentState => {
                        if (!currentState.isConnected) {
                            setIsOffline(true);
                            setVisible(true);
                            slideUp();
                        }
                        offlineTimeout.current = null;
                    });
                }, 3000);
            }

            if (isFirstLoad.current) {
                isFirstLoad.current = false;
            }
        });

        return () => {
            unsubscribe();
            if (offlineTimeout.current) clearTimeout(offlineTimeout.current);
        };
    }, []);

    const slideUp = () => {
        Animated.spring(slideAnim, {
            toValue: 0,
            damping: 20,
            stiffness: 180,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = (cb) => {
        Animated.timing(slideAnim, {
            toValue: Dimensions.get('window').height,
            duration: 200,
            useNativeDriver: true,
        }).start(cb);
    };

    const handleDismiss = () => {
        slideDown(() => setVisible(false));
    };

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={handleDismiss}
        >
            <View style={styles.overlay}>
                {/* Fundo semi-transparente */}
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleDismiss} />

                {/* Card Flutuante Animado */}
                <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <NeoCard style={styles.card}>

                        {/* Header Warning */}
                        <View style={styles.header}>
                            <View style={styles.iconContainer}>
                                <NeoIcon name="CloudCross" size={32} color={colors.neutral.white} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <H3 style={{ color: colors.feedback.error, fontSize: 18 }}>Modo Offline Ativado</H3>
                                <Body style={{ fontSize: 13, color: Neo.colors.neutral[600] }}>
                                    Detectamos falta de sinal de rede.
                                </Body>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Conteúdo Seguro */}
                        <Body style={{ marginBottom: 12, fontWeight: '600' }}>
                            Fique tranquilo. Você ainda tem acesso a:
                        </Body>

                        <View style={styles.featuresList}>
                            <FeatureItem icon="medical" text="Fichas Médicas & Saúde" />
                            <FeatureItem icon="medkit" text="Guias de Primeiros Socorros" />
                            <FeatureItem icon="flashlight" text="Kits de Emergência" />
                            <FeatureItem icon="call" text="Telefones de Utilidade Pública" />
                        </View>

                        <View style={styles.divider} />

                        {/* Ação */}
                        <TouchableOpacity onPress={handleDismiss}>
                            <View style={styles.button}>
                                <Body style={{ color: colors.neutral.white, fontWeight: 'bold' }}>Entendi, manter protegido</Body>
                            </View>
                        </TouchableOpacity>

                    </NeoCard>
                </Animated.View>
            </View>
        </Modal>
    );
}

const FeatureItem = ({ icon, text }) => (
    <View style={styles.featureItem}>
        <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: Neo.colors.primary[50], alignItems: 'center', justifyContent: 'center' }}>
            <NeoIcon name={icon || "checkmark-circle"} size={18} color={Neo.colors.feedback.success} />
        </View>
        <Body style={{ fontSize: 14, flex: 1 }}>{text}</Body>
    </View>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        width: '100%',
        padding: 20,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 24,
        padding: 20,
        ...Neo.shadows.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(239, 68, 68, 0.08)', // DS: feedback.error with subtle opacity
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: Neo.colors.neutral[200],
        marginVertical: 16,
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        backgroundColor: Neo.colors.primary[500],
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    }
});
