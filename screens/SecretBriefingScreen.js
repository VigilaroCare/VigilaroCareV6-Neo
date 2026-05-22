/**
 * SecretBriefingScreen.js
 * Tela de Revelação de Protocolos Ocultos (Pós-Onboarding)
 * Estilo "Confidencial" / Segurança
 */

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Vibration } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

export default function SecretBriefingScreen({ navigation }) {
    const { t } = useTranslation('common');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Efeito dramático de entrada
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Vibração tática para chamar atenção
        setTimeout(() => Vibration.vibrate([0, 50, 100, 50]), 500);
    }, []);

    const handleFinish = () => {
        // Limpa stack e vai para Home
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#111" />

            <LinearGradient
                colors={['#1F2937', '#111827']}
                style={styles.gradient}
            >
                <AppBackground>
        <SafeAreaView style={styles.content}>

                    <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                        <View style={styles.iconContainer}>
                            <NeoIcon name="Lock" size={48} color="#F59E0B" />
                        </View>

                        <Text style={styles.title}> {t('headersFirst.pROTOCOLOSOCULTOS', 'PROTOCOLOS OCULTOS')} </Text>
                        <Text style={styles.subtitle}>{t('headersFirst.confidencialLeiaApenasSeEstiverSozinho', 'Confidencial - Leia apenas se estiver sozinho')}</Text>

                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <NeoIcon name="EyeSlash" size={24} color="#EF4444" />
                                <Text style={styles.cardTitle}>{t('headersFirst.mODOPNICODISCRETO', 'MODO PÂNICO DISCRETO')}</Text>
                            </View>
                            <Text style={styles.cardText}>
                                {t('headersFirst.emSituaEsDeCoaOOndeVocNOPodeRevelarQueEs', 'Em situações de coação onde você não pode revelar que está pedindo ajuda:')}
                            </Text>
                            <View style={styles.instructionBox}>
                                <Text style={styles.instructionText}>
                                    Segure o botão <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>{t('headersFirst.sOS', 'SOS')}</Text> no rodapé por <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.3Segundos', '3 segundos')}</Text>.
                                </Text>
                            </View>
                            <Text style={styles.cardDetail}>
                                • O app vibrará discretamente.{'\n'}
                                • Gravação de áudio e GPS iniciam na hora.{'\n'}
                                • Alertas são enviados após 15s se não cancelar.
                            </Text>
                        </View>

                        <Text style={styles.disclaimer}>
                            {t('headersFirst.estaTelaNOAparecerNovamenteParaSuaSegura', 'Esta tela não aparecerá novamente para sua segurança.')}
                        </Text>
                    </Animated.View>

                    <TouchableOpacity style={styles.burnButton} onPress={handleFinish}>
                        <NeoIcon name="Trash" size={20} color="#FFF" style={{ marginRight: 8 }} />
                        <Text style={styles.burnButtonText}>{t('headersFirst.mEMORIZAREDESTRUIRMENSAGEM', 'MEMORIZAR E DESTRUIR MENSAGEM')}</Text>
                    </TouchableOpacity>

                </SafeAreaView>
                </AppBackground>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.3)',
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: 2,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 40,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        width: '100%',
        padding: 20,
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    cardText: {
        color: '#E5E7EB',
        fontSize: 15,
        marginBottom: 16,
        lineHeight: 22,
    },
    instructionBox: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
    },
    instructionText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
    },
    cardDetail: {
        color: '#9CA3AF',
        fontSize: 13,
        lineHeight: 20,
    },
    disclaimer: {
        marginTop: 40,
        color: '#6B7280',
        fontSize: 12,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    burnButton: {
        backgroundColor: '#DC2626',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 8,
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    burnButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
