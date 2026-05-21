/**
 * PillSwitch.js
 * Componente glassmorphism premium para o header da HomeScreen.
 * Encapsula o seletor de casa (com seta animada) e o card de perfil.
 *
 * Tactical Calm Design System — Epic Redesign 2026
 * 
 * Nota: Usa View com fundo translúcido em vez de BlurView para
 * máxima compatibilidade Android (BlurView tem rendering inconsistente).
 */

import React, { useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import { Home2, ArrowDown2 } from 'iconsax-react-native';
import { DS as Neo } from '../utils/DesignSystem2026';

/**
 * HousePill — Card seletor de residência ativa.
 * Segue o mesmo vocabulário visual do profileCardInner da Home:
 * fundo rgba(255,255,255,0.88), borderRadius 18, sem gradiente.
 *
 * @param {string}  label       - Nome da residência ativa
 * @param {boolean} isModalOpen - Controla rotação da seta
 * @param {function} onPress    - Callback ao pressionar
 */
export function HousePill({ label, isModalOpen = false, onPress }) {
    const arrowRotation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(arrowRotation, {
            toValue: isModalOpen ? 1 : 0,
            duration: 280,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, [isModalOpen]);

    const rotate = arrowRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.housePillOuter}
        >
            <View style={styles.housePillInner}>
                {/* Ícone de casa com dot de status */}
                <View style={styles.houseIconContainer}>
                    <View style={styles.houseIconBg}>
                        <Home2 size={16} color="#FFF" variant="Bold" />
                    </View>
                    <View style={styles.statusDot} />
                </View>

                {/* Sublabel + nome da residência */}
                <View style={styles.houseLabelGroup}>
                    <Text style={styles.houseSublabel} numberOfLines={1}>
                        Moradia ativa
                    </Text>
                    <Text style={styles.housePillLabel} numberOfLines={1}>
                        {label}
                    </Text>
                </View>

                {/* Seta animada */}
                <Animated.View style={[styles.arrowContainer, { transform: [{ rotate }] }]}>
                    <ArrowDown2 size={14} color={Neo.colors.neutral[500]} />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    housePillOuter: {
        flex: 1,
        marginRight: 10,
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: Neo.colors.primary[500],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    housePillInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.88)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.95)',
        borderTopColor: 'rgba(255,255,255,1)',
        borderTopWidth: 2,
    },
    houseIconContainer: {
        marginRight: 10,
        position: 'relative',
    },
    houseIconBg: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: Neo.colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusDot: {
        position: 'absolute',
        bottom: -1,
        right: -2,
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: '#34D399',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    houseLabelGroup: {
        flex: 1,
    },
    houseSublabel: {
        fontSize: 10,
        fontWeight: '600',
        color: Neo.colors.neutral[500],
        letterSpacing: 0.2,
        marginBottom: 1,
    },
    housePillLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        letterSpacing: -0.2,
    },
    arrowContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.04)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
});

export default HousePill;
