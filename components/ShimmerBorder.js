/**
 * ShimmerBorder.js
 * Efeito de shimmer dramático na borda de cards.
 * Ativa na primeira renderização com múltiplos pulsos.
 *
 * Tactical Calm Design System — Epic Redesign 2026
 */

import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';

/**
 * @param {React.ReactNode} children     - Conteúdo do card
 * @param {string}          color        - Cor do shimmer (default: primary[500])
 * @param {number}          borderRadius - Raio da borda (default: 16)
 * @param {object}          style        - Estilos adicionais
 * @param {number}          pulses       - Número de pulsos de shimmer (default: 3)
 */
export default function ShimmerBorder({
    children,
    color = Neo.colors.primary[500],
    borderRadius = 16,
    style,
    pulses = 3,
}) {
    const shimmerOpacity = useRef(new Animated.Value(0)).current;
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        // Delay para dar tempo da tela renderizar
        const timeout = setTimeout(() => {
            // Criar sequência de pulsos
            const pulseSequence = [];
            for (let i = 0; i < pulses; i++) {
                pulseSequence.push(
                    Animated.timing(shimmerOpacity, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(shimmerOpacity, {
                        toValue: 0.1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                );
            }
            // Fade out final
            pulseSequence.push(
                Animated.timing(shimmerOpacity, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                })
            );

            Animated.sequence(pulseSequence).start();
        }, 800);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={[{ position: 'relative', borderRadius }, style]}>
            {/* Borda shimmer animada */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        borderRadius,
                        borderWidth: 2.5,
                        borderColor: color,
                        opacity: shimmerOpacity,
                    },
                ]}
                pointerEvents="none"
            />

            {/* Glow externo animado */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        borderRadius,
                        opacity: shimmerOpacity,
                        shadowColor: color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.6,
                        shadowRadius: 16,
                        elevation: 0,
                    },
                ]}
                pointerEvents="none"
            />

            {children}
        </View>
    );
}
