/**
 * LeftHandedSuggestionModal.js
 * Modal discreto que sugere ativar o Modo Canhoto após detecção automática.
 * Vigilaro Care V6 Neo
 *
 * DESIGN:
 * - Bottom sheet estilo sutil (não intrusivo)
 * - Aparece apenas uma vez após HandednessDetector detectar uso com mão esquerda
 * - Dois botões: "Ativar" e "Manter Padrão"
 */

import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
    Platform,
} from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';
import { useAccessibility } from '../context/AccessibilityContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LeftHandedSuggestionModal({ visible, onDismiss }) {
    const { toggleLeftHanded } = useAccessibility();
    const slideAnim = useRef(new Animated.Value(300)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleActivate = async () => {
        await toggleLeftHanded(true);
        onDismiss();
    };

    const handleDismiss = () => {
        onDismiss();
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="none" onRequestClose={handleDismiss}>
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity style={styles.overlayTouch} activeOpacity={1} onPress={handleDismiss} />

                <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                    {/* Handle bar */}
                    <View style={styles.handleBar} />

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <NeoIcon name="Hand" size={32} color={Neo.colors.primary[600]} />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>Modo Canhoto Detectado</Text>

                    {/* Description */}
                    <Text style={styles.description}>
                        Notamos que você usa mais o lado esquerdo da tela. Ative o{' '}
                        <Text style={styles.bold}>Modo Canhoto</Text> para botões e controles mais
                        acessíveis à sua mão.
                    </Text>

                    {/* Benefits mini-list */}
                    <View style={styles.benefitsList}>
                        {[
                            'Botões de ação mais perto do polegar',
                            'Menu e navegação otimizados',
                            'Pode mudar a qualquer momento',
                        ].map((item, idx) => (
                            <View key={idx} style={styles.benefitRow}>
                                <NeoIcon name="TickCircle" size={16} color={Neo.colors.primary[500]} />
                                <Text style={styles.benefitText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.dismissButton} onPress={handleDismiss}>
                            <Text style={styles.dismissText}>Manter Padrão</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.activateButton} onPress={handleActivate}>
                            <NeoIcon name="Hand" size={18} color="#FFF" />
                            <Text style={styles.activateText}>Ativar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    overlayTouch: {
        flex: 1,
    },
    sheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    },
    handleBar: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D5DB',
        alignSelf: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Neo.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    bold: {
        fontWeight: '700',
        color: '#374151',
    },
    benefitsList: {
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    benefitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    benefitText: {
        fontSize: 13,
        color: '#4B5563',
        fontWeight: '500',
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    dismissButton: {
        flex: 1,
        height: 50,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dismissText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6B7280',
    },
    activateButton: {
        flex: 1.2,
        height: 50,
        borderRadius: 16,
        backgroundColor: Neo.colors.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    activateText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
