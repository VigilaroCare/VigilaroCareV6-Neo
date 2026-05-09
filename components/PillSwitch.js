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
import { LinearGradient } from 'expo-linear-gradient';
import { Home2, ArrowDown2 } from 'iconsax-react-native';
import { DS as Neo } from '../utils/DesignSystem2026';

/**
 * HousePill — Pílula glassmorphism do seletor de residência.
 *
 * @param {string}  label           - Nome da residência ativa
 * @param {boolean} isModalOpen     - Se o modal de residências está aberto (controla rotação da seta)
 * @param {function} onPress        - Callback ao pressionar
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
            {/* Gradiente de fundo sutil — glassmorphism premium */}
            <LinearGradient
                colors={['rgba(255,255,255,0.92)', 'rgba(209,250,229,0.45)', 'rgba(255,255,255,0.85)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.housePillGradient}
            >
                {/* Status dot — verde indica "conectado" */}
                <View style={styles.houseIconContainer}>
                    <View style={styles.houseIconBg}>
                        <Home2 size={16} color="#FFF" variant="Bold" />
                    </View>
                    <View style={styles.statusDot} />
                </View>

                <Text
                    style={styles.housePillLabel}
                    numberOfLines={1}
                >
                    {label}
                </Text>

                <Animated.View style={[styles.arrowContainer, { transform: [{ rotate }] }]}>
                    <ArrowDown2 size={14} color={Neo.colors.neutral[500]} />
                </Animated.View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    housePillOuter: {
        flex: 1,
        marginRight: 10,
        borderRadius: 22,
        overflow: 'hidden',
        // Sombra colorida premium (iOS)
        shadowColor: Neo.colors.primary[500],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    housePillGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.95)',
        borderTopColor: 'rgba(255,255,255,1)',
        borderTopWidth: 2,
    },
    houseIconContainer: {
        marginRight: 8,
        position: 'relative',
    },
    houseIconBg: {
        width: 30,
        height: 30,
        borderRadius: 15,
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
    housePillLabel: {
        fontSize: 13.5,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        flex: 1,
        letterSpacing: -0.1,
    },
    arrowContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.04)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HousePill;
