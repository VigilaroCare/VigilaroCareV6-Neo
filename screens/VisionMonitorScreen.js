import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Easing, Dimensions, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { Colors } from '../utils/Theme';
import * as Speech from 'expo-speech';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';

const { width, height } = Dimensions.get('window');

export default function VisionMonitorScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [permission, requestPermission] = useCameraPermissions();
    const [isMonitoring, setIsMonitoring] = useState(false);
    const [showInstructions, setShowInstructions] = useState(true);
    const [statusText, setStatusText] = useState("Vigilância Ativa");

    // Tactical States
    const [torchEnabled, setTorchEnabled] = useState(false);
    const [sirenActive, setSirenActive] = useState(false);
    const [stealthMode, setStealthMode] = useState(false);

    // Animation for "Scanner"
    const scanLineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isMonitoring) {
            startScanAnimation();
        } else {
            scanLineAnim.setValue(0);
        }
        return () => stopSiren(); // Cleanup
    }, [isMonitoring]);

    // Siren Logic (Strobe + Speech)
    useEffect(() => {
        let strobeInterval;
        if (sirenActive) {
            setStatusText("🚨 ALARME DISPARADO 🚨");
            // 1. Speech Loop
            const speakAlert = () => {
                Speech.speak("Alerta de Segurança! Afaste-se imediatamente!", {
                    language: 'pt-BR',
                    pitch: 0.8,
                    rate: 1.1,
                    onDone: () => {
                        if (sirenActive) speakAlert(); // Loop manually if needed, or rely on interval re-trigger
                    }
                });
            };
            speakAlert();

            // 2. Strobe Light
            let toggle = false;
            strobeInterval = setInterval(() => {
                toggle = !toggle;
                setTorchEnabled(toggle);
            }, 500); // Fast blink
        } else {
            if (isMonitoring) setStatusText("Vigilância Ativa");
            Speech.stop();
            if (strobeInterval) clearInterval(strobeInterval);
            setTorchEnabled(false);
        }
        return () => {
            if (strobeInterval) clearInterval(strobeInterval);
            Speech.stop();
        };
    }, [sirenActive]);

    const startScanAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanLineAnim, {
                    toValue: height * 0.8,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scanLineAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    const handleStartMonitoring = async () => {
        if (!permission) {
            // Permission status not loaded yet
            return;
        }

        if (!permission.granted) {
            const result = await requestPermission();
            if (!result.granted) {
                Alert.alert("Permissão Negada", "Precisamos da câmera para vigiar o ambiente.");
                return;
            }
        }

        setShowInstructions(false);
        setIsMonitoring(true);
    };

    const stopSiren = () => {
        setSirenActive(false);
        setTorchEnabled(false);
        Speech.stop();
    };

    const handleStop = () => {
        stopSiren();
        setIsMonitoring(false);
        setShowInstructions(true);
        setStealthMode(false);
    };

    const toggleStealth = () => setStealthMode(!stealthMode);
    const toggleSiren = () => setSirenActive(!sirenActive);
    const toggleTorch = () => setTorchEnabled(!torchEnabled);

    if (!permission) {
        return <View style={styles.container} />; // Loading
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden={isMonitoring} />

            {/* Camera Layer */}
            {isMonitoring ? (
                <CameraView
                    style={styles.camera}
                    facing="back"
                    enableTorch={torchEnabled}
                    animateShutter={false}
                >
                    {/* Stealth Overlay (Blackout) */}
                    {stealthMode && (
                        <TouchableOpacity
                            style={styles.stealthOverlay}
                            onPress={toggleStealth}
                            activeOpacity={1}
                        >
                            <Text style={styles.stealthText}>{t('headersFirst.toqueParaAtivarHUD', 'Toque para ativar HUD')}</Text>
                        </TouchableOpacity>
                    )}

                    {/* HUD Layer (Visible only if NOT stealth) */}
                    {!stealthMode && (
                        <AppBackground variant="subtle">
        <SafeAreaView style={styles.hudContainer}>

                            {/* Status Header */}
                            <View style={styles.hudHeader}>
                                <View style={[styles.statusBadge, sirenActive && styles.statusBadgeAlert]}>
                                    <View style={[styles.recordingDot, sirenActive && styles.recordingDotAlert]} />
                                    <Text style={[styles.statusText, sirenActive && styles.statusTextAlert]}>
                                        {statusText}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={handleStop} style={styles.closeButton}>
                                    <NeoIcon name="CloseSquare" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>

                            {/* Scanning Animation */}
                            <Animated.View
                                style={[
                                    styles.scanLine,
                                    { transform: [{ translateY: scanLineAnim }] }
                                ]}
                            />

                            {/* Artificial Bounding Box */}
                            <View style={styles.boundingBox}>
                                <View style={[styles.corner, styles.tl]} />
                                <View style={[styles.corner, styles.tr]} />
                                <View style={[styles.corner, styles.bl]} />
                                <View style={[styles.corner, styles.br]} />
                                <Text style={styles.aiLabel}>{t('headersFirst.sCANNINGAREA', 'SCANNING AREA...')}</Text>
                            </View>

                            {/* Tactical Controls Footer */}
                            <View style={styles.hudFooter}>
                                <View style={styles.tacticalRow}>

                                    {/* Torch Toggle */}
                                    <TouchableOpacity style={[styles.tacticalBtn, torchEnabled && styles.tacticalBtnActive]} onPress={toggleTorch}>
                                        <NeoIcon name={torchEnabled ? "flash" : "flash-off"} size={24} color={torchEnabled ? "#000" : "#FFF"} />
                                        <Text style={[styles.tacticalLabel, torchEnabled && { color: '#000' }]}>{t('headersFirst.lUZ', 'LUZ')}</Text>
                                    </TouchableOpacity>

                                    {/* Siren/Panic */}
                                    <TouchableOpacity style={[styles.tacticalBtn, styles.tacticalBtnDanger, sirenActive && styles.tacticalBtnDangerActive]} onPress={toggleSiren}>
                                        <NeoIcon name="Warning2" size={32} color="#FFF" />
                                        <Text style={styles.tacticalLabel}>{t('headersFirst.sIRENE', 'SIRENE')}</Text>
                                    </TouchableOpacity>

                                    {/* Stealth Toggle */}
                                    <TouchableOpacity style={styles.tacticalBtn} onPress={toggleStealth}>
                                        <NeoIcon name="EyeSlash" size={24} color="#FFF" />
                                        <Text style={styles.tacticalLabel}>{t('headersFirst.oCULTAR', 'OCULTAR')}</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </SafeAreaView>
                        </AppBackground>
                    )}
                </CameraView>
            ) : (
                <SafeAreaView style={styles.instructionContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
                            <NeoIcon name="ArrowLeft2" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{t('headersFirst.monitorDeVisO', 'Monitor de Visão')}</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.iconCircle}>
                            <NeoIcon name="Video" size={64} color={Colors.primary} />
                        </View>

                        <Text style={styles.title}>{t('headersFirst.painelSentinelaIA', 'Painel Sentinela (IA)')}</Text>

                        <View style={styles.stepBox}>
                            <NeoIcon name="Flash" size={24} color="#666" style={{ marginRight: 10 }} />
                            <Text style={styles.stepText}>{t('headersFirst.controleRemotoDeLanternaParaIluminarReas', 'Controle remoto de Lanterna para iluminar áreas escuras.')}</Text>
                        </View>

                        <View style={styles.stepBox}>
                            <NeoIcon name="Warning2" size={24} color="#666" style={{ marginRight: 10 }} />
                            <Text style={styles.stepText}>{t('headersFirst.sireneDePNicoComEfeitoEstroboscPicoParaE', 'Sirene de Pânico com efeito estroboscópico para emergências.')}</Text>
                        </View>

                        <View style={styles.stepBox}>
                            <NeoIcon name="EyeSlash" size={24} color="#666" style={{ marginRight: 10 }} />
                            <Text style={styles.stepText}>{t('headersFirst.modoFurtivoTelaApagadaParaMonitoramentoD', 'Modo Furtivo (Tela Apagada) para monitoramento discreto.')}</Text>
                        </View>

                        <TouchableOpacity style={styles.startButton} onPress={handleStartMonitoring}>
                            <Text style={styles.startButtonText}>{t('headersFirst.iNICIARVIGILNCIA', 'INICIAR VIGILÂNCIA')}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    // Stealth
    stealthOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        zIndex: 999,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stealthText: {
        color: '#333',
        fontSize: 12
    },
    // Instructions Styles
    instructionContainer: { flex: 1, backgroundColor: 'transparent' },
    header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#333' },
    content: { padding: 24, alignItems: 'center', flex: 1, justifyContent: 'center' },
    iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: '#333' },
    stepBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', padding: 16, borderRadius: 12, marginBottom: 16, width: '100%' },
    stepText: { fontSize: 14, color: '#555', flex: 1, lineHeight: 20 },
    startButton: { backgroundColor: Colors.primary, paddingVertical: 18, paddingHorizontal: 32, borderRadius: 16, width: '100%', alignItems: 'center', marginTop: 16, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    startButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },

    // HUD Styles
    hudContainer: { flex: 1, justifyContent: 'space-between' },
    hudHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#00FF00' },
    statusBadgeAlert: { borderColor: '#F44336', backgroundColor: 'rgba(244, 67, 54, 0.3)' },
    recordingDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00FF00', marginRight: 8 },
    recordingDotAlert: { backgroundColor: '#F44336' },
    statusText: { color: '#00FF00', fontWeight: 'bold', fontSize: 12 },
    statusTextAlert: { color: '#F44336' },
    closeButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },

    // Visuals
    scanLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, backgroundColor: 'rgba(0, 255, 0, 0.5)', shadowColor: '#00FF00', shadowOpacity: 1, shadowRadius: 10 },
    boundingBox: { position: 'absolute', top: height * 0.3, left: width * 0.1, width: width * 0.8, height: height * 0.4, justifyContent: 'center', alignItems: 'center' },
    corner: { position: 'absolute', width: 20, height: 20, borderColor: 'rgba(255,255,255,0.7)', borderWidth: 3 },
    tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    aiLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 180, fontWeight: 'bold', letterSpacing: 2 },

    // Controls Footer
    hudFooter: { padding: 20, paddingBottom: 40 },
    tacticalRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    tacticalBtn: { alignItems: 'center', justifyContent: 'center', width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
    tacticalBtnActive: { backgroundColor: 'transparent' },
    tacticalBtnDanger: { backgroundColor: 'rgba(244, 67, 54, 0.3)', borderColor: '#F44336', width: 90, height: 90, borderRadius: 45 },
    tacticalBtnDangerActive: { backgroundColor: '#F44336' },
    tacticalLabel: { color: '#FFF', fontSize: 10, marginTop: 4, fontWeight: 'bold' }
});
