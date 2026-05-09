// screens/Emergency/SOSCountdownScreen.js
// [MIG-AV-01] Migrado de expo-av para expo-audio (SDK 54+)

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Vibration, Linking, Alert, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Warning2 } from 'iconsax-react-native';
import * as ExpoLocation from 'expo-location';
import { AudioPlayer } from 'expo-audio'; // [MIG-AV-01] substituiu: import { Audio } from 'expo-av'
import ProfileService from '../../services/ProfileService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function SOSCountdownScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { triggerReason } = route.params || {};
    const [countdown, setCountdown] = useState(triggerReason ? 10 : 5);
    const [sending, setSending] = useState(false);

    const pulseAnim   = useRef(new Animated.Value(1)).current;
    const playerRef   = useRef(null); // [MIG-AV-01] era: soundRef

    useEffect(() => {
        const startAlert = async () => {
            try {
                // [MIG-AV-01] AudioPlayer substitui Audio.Sound.createAsync()
                // Não precisa de unloadAsync() — o GC cuida do ciclo de vida
                const player = new AudioPlayer(
                    require('../../assets/sounds/sos_alert.mp3')
                );
                player.loop   = true;
                player.volume = 1.0;
                await player.play();
                playerRef.current = player;
            } catch (error) {
                // Asset ausente — usa apenas vibração (comportamento preservado)
                console.log('Audio SOS não encontrado. Usando apenas vibração.');
            }

            if (triggerReason) {
                Vibration.vibrate([500, 500, 500, 500], true);
            } else {
                Vibration.vibrate([0, 100, 100, 100]);
            }
        };

        startAlert();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
            ])
        ).start();

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    triggerSOSAction();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            if (playerRef.current) { // [MIG-AV-01]
                playerRef.current.stop(); // [MIG-AV-01]
            }
            Vibration.cancel();
        };
    }, []);

    const triggerSOSAction = async () => {
        setSending(true);
        try {
            let locationText = '';
            const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const loc = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Balanced });
                locationText = ` Estou em: https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;
            }

            let unifiedContacts = [];
            const profile = await ProfileService.getPerfilAtivo();
            if (profile?.contatos && Array.isArray(profile.contatos)) {
                profile.contatos.forEach(c => {
                    if (c.telefone) unifiedContacts.push(c.telefone.replace(/\D/g, ''));
                });
            }

            try {
                const manualJson = await AsyncStorage.getItem('@emergency_contacts');
                if (manualJson) {
                    const manual = JSON.parse(manualJson);
                    manual.forEach(c => {
                        if (c.phone) {
                            const num = c.phone.replace(/\D/g, '');
                            if (!unifiedContacts.includes(num)) unifiedContacts.push(num);
                        }
                    });
                }
            } catch (e) { console.log("Erro ao carregar contatos manuais:", e); }

            if (unifiedContacts.length === 0) {
                setSending(false);
                Alert.alert(t('sosCountdown.noContactsTitle'), t('sosCountdown.noContacts'));
                navigation.goBack();
                return;
            }

            let messagePrefix = t('sosCountdown.defaultMsg');
            if (triggerReason === 'FALL') messagePrefix = t('sosCountdown.fallMsg');
            if (triggerReason === 'VITAL_CHECK') messagePrefix = t('sosCountdown.vitalMsg');

            const message = `${messagePrefix}${locationText} (Envio automático Vigilaro)`;
            const phones = unifiedContacts.join(Platform.OS === 'ios' ? '&' : ';');

            const separator = Platform.OS === 'ios' ? '&' : '?';
            const url = `sms:${phones}${separator}body=${encodeURIComponent(message)}`;

            await Linking.openURL(url);

            setTimeout(() => {
                navigation.goBack();
            }, 1500);

        } catch (error) {
            console.error("Erro ao disparar SOS:", error);
            Alert.alert(t('sosCountdown.sosErrorTitle'), t('sosCountdown.sosError'));
            navigation.goBack();
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={s.overlay}>
            <AppBackground variant="subtle">
        <SafeAreaView style={s.container}>
                {!sending ? (
                    <>
                        <Warning2 size={64} color="#FFF" variant="Bold" style={{ marginBottom: 20 }} />
                        <Text style={s.title}>
                            {triggerReason === 'FALL' ? t('sosCountdown.fallDetected') :
                             triggerReason === 'VITAL_CHECK' ? t('sosCountdown.vitalCheck') : t('sosCountdown.sendingSOS')}
                        </Text>

                        <Animated.View style={[s.circle, { transform: [{ scale: pulseAnim }] }]}>
                            <Text style={s.countdownText}>{countdown}</Text>
                        </Animated.View>

                        <Text style={s.subtitle}>
                            {t('sosCountdown.locationMsg')}
                        </Text>

                        <TouchableOpacity style={s.cancelBtn} onPress={handleCancel} activeOpacity={0.8}>
                            <Text style={s.cancelText}>{t('sosCountdown.cancelBtn')}</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={s.title}>{t('sosCountdown.sendingAlert')}</Text>
                        <Text style={s.subtitle}>{t('sosCountdown.confirmSend')}</Text>
                        <TouchableOpacity style={[s.cancelBtn, { backgroundColor: '#333' }]} onPress={handleCancel}>
                            <Text style={s.cancelText}>{t('sosCountdown.closeBtn')}</Text>
                        </TouchableOpacity>
                    </>
                )}
            </SafeAreaView>
            </AppBackground>
        </View>
    );
}

const s = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(220, 38, 38, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        width: '100%',
    },
    title: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 30,
        textAlign: 'center',
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    countdownText: {
        color: '#DC2626',
        fontSize: 64,
        fontWeight: '900',
    },
    subtitle: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 60,
        paddingHorizontal: 20,
        lineHeight: 24,
        fontWeight: '500',
    },
    cancelBtn: {
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    cancelText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});