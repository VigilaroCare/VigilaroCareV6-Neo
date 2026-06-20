import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';

const { width: SCREEN_W } = Dimensions.get('window');

/**
 * SkeletonLoader
 * Placeholder animado com shimmer (gradiente deslizante) para indicar
 * carregamento — substitui ActivityIndicator quando faz sentido mostrar
 * a estrutura do conteúdo que vai aparecer.
 *
 * Compõe naturalmente com light/dark mode (cor base muda).
 * Respeita `reduceMotion` (mostra um placeholder estático sem shimmer).
 *
 * @param {number|string} width  - default 100%
 * @param {number}        height - default 14
 * @param {number}        borderRadius - default 8
 * @param {object}        style  - estilos adicionais (ex: marginBottom)
 */
export default function SkeletonLoader({
    width = '100%',
    height = 14,
    borderRadius = 8,
    style,
}) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const { reduceMotion } = useAccessibility() || {};

    const baseColor = isDark ? themeColors.neutral[200] : themeColors.neutral[200];
    const shimmerColors = isDark
        ? ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0)']
        : ['rgba(255,255,255,0)', 'rgba(255,255,255,0.65)', 'rgba(255,255,255,0)'];

    const translateX = useRef(new Animated.Value(-SCREEN_W)).current;

    useEffect(() => {
        if (reduceMotion) return;

        const loop = Animated.loop(
            Animated.timing(translateX, {
                toValue: SCREEN_W,
                duration: 1400,
                useNativeDriver: true,
            })
        );
        loop.start();
        return () => loop.stop();
    }, [reduceMotion, translateX]);

    return (
        <View
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: baseColor,
                    overflow: 'hidden',
                },
                style,
            ]}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            {!reduceMotion && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        { transform: [{ translateX }] },
                    ]}
                >
                    <LinearGradient
                        colors={shimmerColors}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>
            )}
        </View>
    );
}

/**
 * Bloco de skeleton típico de "card de contato" — para uso direto em
 * telas de listagem (Contatos, Medicamentos, Receitas, etc).
 */
export function SkeletonContactCard({ style }) {
    const themeColors = useThemeColors();
    return (
        <View
            style={[
                {
                    padding: 14,
                    borderRadius: 16,
                    backgroundColor: themeColors.neutral.white === '#FFFFFF'
                        ? 'rgba(255,255,255,0.6)'
                        : 'rgba(28,28,30,0.4)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 10,
                },
                style,
            ]}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <SkeletonLoader width={44} height={44} borderRadius={22} />
            <View style={{ flex: 1, gap: 8 }}>
                <SkeletonLoader width="65%" height={14} />
                <SkeletonLoader width="40%" height={11} />
                <SkeletonLoader width="55%" height={11} />
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <SkeletonLoader width={38} height={38} borderRadius={19} />
                <SkeletonLoader width={38} height={38} borderRadius={19} />
            </View>
        </View>
    );
}

/**
 * SkeletonCard
 * Um componente de esqueleto genérico com imagem/avatar à esquerda
 * e 1 a 3 linhas de texto ao lado.
 */
export function SkeletonCard({ style, hasAvatar = true, lines = 2 }) {
    const themeColors = useThemeColors();
    return (
        <View
            style={[
                {
                    padding: 16,
                    borderRadius: 16,
                    backgroundColor: themeColors.neutral.white === '#FFFFFF'
                        ? 'rgba(255,255,255,0.6)'
                        : 'rgba(28,28,30,0.4)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 12,
                },
                style,
            ]}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            {hasAvatar && <SkeletonLoader width={48} height={48} borderRadius={24} />}
            <View style={{ flex: 1, gap: 8 }}>
                <SkeletonLoader width="75%" height={14} />
                {lines > 1 && <SkeletonLoader width="45%" height={11} />}
                {lines > 2 && <SkeletonLoader width="60%" height={11} />}
            </View>
        </View>
    );
}

