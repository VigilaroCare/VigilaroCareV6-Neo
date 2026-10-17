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

import { tx } from '../utils/txFixo';
import { useEffect, useRef, useMemo } from "react";
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
import { useThemeColors } from '../utils/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LeftHandedSuggestionModal({ visible, onDismiss }) {
    const { toggleLeftHanded } = useAccessibility();
    const colors = useThemeColors();
    const slideAnim = useRef(new Animated.Value(300)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const themed = useMemo(() => ({
        sheet: { backgroundColor: colors.neutral.white },
        handleBar: { backgroundColor: colors.neutral[300] },
        title: { color: colors.neutral[900] },
        description: { color: colors.neutral[500] },
        bold: { color: colors.neutral[800] },
        benefitText: { color: colors.neutral[700] },
        dismissButton: { backgroundColor: colors.neutral[200] },
        dismissText: { color: colors.neutral[500] },
        activateText: { color: colors.neutral.white },
    }), [colors]);

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

                <Animated.View style={[styles.sheet, themed.sheet, { transform: [{ translateY: slideAnim }] }]}>
                    {/* Handle bar */}
                    <View style={[styles.handleBar, themed.handleBar]} />

                    {/* Icon */}
                    <View style={styles.iconContainer}>
                        <View style={styles.iconCircle}>
                            <NeoIcon name="Hand" size={32} color={Neo.colors.primary[600]} />
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={[styles.title, themed.title]}>{tx('telas.LeftHandedSuggestionModal.modoCanhotoDetectado', 'Modo Canhoto Detectado')}</Text>

                    {/* Description */}
                    <Text style={[styles.description, themed.description]}>{tx('telas.LeftHandedSuggestionModal.notamosQueVoceUsaMaisO', 'Notamos que você usa mais o lado esquerdo da tela. Ative o')}{' '}
                        <Text style={[styles.bold, themed.bold]}>{tx('telas.LeftHandedSuggestionModal.modoCanhoto', 'Modo Canhoto')}</Text>{tx('telas.LeftHandedSuggestionModal.paraBotoesEControlesMaisAcessiveis', ' para botões e controles mais acessíveis à sua mão.')}</Text>

                    {/* Benefits mini-list */}
                    <View style={styles.benefitsList}>
                        {[
                            tx('telas.LeftHandedSuggestionModal.beneficio1', 'Botões de ação mais perto do polegar'),
                            tx('telas.LeftHandedSuggestionModal.beneficio2', 'Menu e navegação otimizados'),
                            tx('telas.LeftHandedSuggestionModal.beneficio3', 'Pode mudar a qualquer momento'),
                        ].map((item, idx) => (
                            <View key={idx} style={styles.benefitRow}>
                                <NeoIcon name="TickCircle" size={16} color={Neo.colors.primary[500]} />
                                <Text style={[styles.benefitText, themed.benefitText]}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.dismissButton, themed.dismissButton]} onPress={handleDismiss}>
                            <Text style={[styles.dismissText, themed.dismissText]}>{tx('telas.LeftHandedSuggestionModal.manterPadrao', 'Manter Padrão')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.activateButton} onPress={handleActivate}>
                            <NeoIcon name="Hand" size={18} color={colors.neutral.white} />
                            <Text style={[styles.activateText, themed.activateText]}>{tx('telas.LeftHandedSuggestionModal.ativar', 'Ativar')}</Text>
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
        backgroundColor: Neo.colors.neutral.white,
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
        backgroundColor: Neo.colors.neutral[300],
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
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    description: {
        fontSize: 14,
        lineHeight: 21,
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    bold: {
        fontWeight: '700',
        color: Neo.colors.neutral[800],
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
        color: Neo.colors.neutral[700],
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
        backgroundColor: Neo.colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
    },
    dismissText: {
        fontSize: 15,
        fontWeight: '600',
        color: Neo.colors.neutral[500],
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
        color: Neo.colors.neutral.white,
    },
});
