import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark } from '../utils/ThemeContext';

/**
 * ScoreMiniCard — Mini card retangular para o centro do Hub Modo Preventivo.
 * Substitui o PremiumRingChart circular. Design "semi-retangular" (borderRadius
 * leve) que encaixa no recorte retangular entre os 4 quadrantes.
 *
 * Props:
 *   scoreData  — { geral: number, ... }
 *   width      — largura do card (px)
 *   height     — altura do card (px)
 */
export default function ScoreMiniCard({ scoreData, width = 80, height = 80 }) {
    const isDark = useIsDark();
    const animValue = useRef(new Animated.Value(0)).current;

    const score = scoreData?.geral || 0;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: score,
            duration: 1200,
            useNativeDriver: false,
        }).start();
    }, [score]);

    // Cor semântica baseada no score
    const getAccentColor = (val) => {
        if (val >= 80) return Neo.colors.primary[700];   // Verde floresta (marca)
        if (val >= 50) return '#B45309';                  // Âmbar
        return '#B91C1C';                                 // Vermelho
    };

    const accentColor = getAccentColor(score);
    const bgColor = isDark ? Neo.colors.neutral[800] : '#FDFBF7';
    const borderColor = isDark ? 'rgba(255,255,255,0.15)' : Neo.colors.primary[800];
    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const subtextColor = isDark ? '#A1A1AA' : '#6B7280';

    return (
        <View style={[
            styles.container,
            {
                width,
                height,
                backgroundColor: bgColor,
                borderColor,
                // Borda accent sutil na base para reforçar o score
                borderBottomColor: accentColor,
                borderBottomWidth: 2.5,
            }
        ]}>
            {/* Score numérico grande */}
            <Text style={[
                styles.scoreText,
                { color: textColor, fontSize: Math.min(width, height) * 0.38 }
            ]}>
                {score}
            </Text>

            {/* Affordance "VER" */}
            <Text style={[styles.actionText, { color: subtextColor }]}>
                VER
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        // Sombra sutil para destacar do fundo
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    scoreText: {
        fontWeight: '900',
        letterSpacing: -1,
    },
    actionText: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
        marginTop: 1,
        opacity: 0.8,
    },
});
