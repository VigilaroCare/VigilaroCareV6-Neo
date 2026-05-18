/**
 * AppBackground.js
 * Componente de Background Premium com Névoa Verde — agora theme-aware.
 *
 * Renderiza gradiente de "névoa" (mist) que se adapta ao tema ativo:
 *   - Light: verde suave / branco quase puro
 *   - Dark: verde escuro / off-black com leve tom esverdeado (identidade)
 *
 * Performance: Gradientes estáticos (sem animação), minimalista na GPU.
 *
 * Lê o tema do ThemeContext via useThemeColors() — nenhum componente
 * existente precisa de mudança, props ficam estáveis.
 */

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColors, useIsDark } from '../utils/ThemeContext';

// Variante 'subtle' — 2-stop limpo para telas de conteúdo (light)
const SUBTLE_LIGHT = {
    primary: ['#F0F7F3', '#F7FAF8'],
    stops: [0, 1],
};

// Variante 'subtle' dark — mantém a base escura sem o gradient esverdeado
const SUBTLE_DARK = {
    primary: ['#13191E', '#0B1014'],
    stops: [0, 1],
};

/**
 * AppBackground
 * Wrapper de tela com névoa verde premium (adapta light/dark).
 *
 * @param {React.ReactNode} children
 * @param {object} style
 * @param {boolean} withSafeArea
 * @param {string} statusBarStyle - Override manual. Se omitido, deriva do tema.
 * @param {boolean} showAccents
 * @param {'mist'|'subtle'|'solid'} variant
 */
export default function AppBackground({
    children,
    style,
    withSafeArea = false,
    statusBarStyle,
    showAccents = true,
    variant = 'mist',
}) {
    const insets = useSafeAreaInsets();
    const colors = useThemeColors();
    const isDark = useIsDark();

    const mist = colors.mist;

    const isMist = variant === 'mist';
    const isSolid = variant === 'solid';

    let gradientColors;
    let gradientStops;
    if (isMist) {
        gradientColors = mist.gradient;
        gradientStops = mist.stops;
    } else if (isSolid) {
        gradientColors = isDark ? ['#1C1C1E', '#1C1C1E'] : ['#F7F8FA', '#F7F8FA'];
        gradientStops = [0, 1];
    } else {
        // subtle
        const sub = isDark ? SUBTLE_DARK : SUBTLE_LIGHT;
        gradientColors = sub.primary;
        gradientStops = sub.stops;
    }

    const shouldShowAccents = showAccents && isMist;

    // StatusBar: respeita override; senão, deriva do tema
    const effectiveStatusBarStyle = statusBarStyle ?? (isDark ? 'light-content' : 'dark-content');

    return (
        <View style={[styles.container, { backgroundColor: mist.fallback }, style]}>
            <StatusBar barStyle={effectiveStatusBarStyle} backgroundColor="transparent" translucent />

            <LinearGradient
                colors={gradientColors}
                locations={gradientStops}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0.3, y: 0 }}
                end={{ x: 0.7, y: 1 }}
            />

            {shouldShowAccents && (
                <>
                    <View style={[styles.mistAccent, styles.accentTopRight, { backgroundColor: mist.accent }]} />
                    <View style={[styles.mistAccent, styles.accentBottomLeft, { backgroundColor: mist.accentStrong }]} />
                </>
            )}

            <View style={[
                styles.content,
                withSafeArea && { paddingTop: insets.top }
            ]}>
                {children}
            </View>
        </View>
    );
}

/**
 * Export retrocompatível — alguns componentes importam { MIST } de AppBackground.
 * Mantém o shape antigo (com `primary`/`stops`) usando a paleta LIGHT por default.
 */
export const MIST = {
    primary: ['#D0EBE0', '#B0DBCA', '#8CCEA8', '#A1D4B8', '#D0EBE0', '#E4F2EC'],
    stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
    accent: 'rgba(46, 125, 50, 0.08)',
    accentStrong: 'rgba(27, 94, 32, 0.12)',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    mistAccent: {
        position: 'absolute',
        borderRadius: 999,
    },
    accentTopRight: {
        top: '10%',
        right: '-15%',
        width: 300,
        height: 300,
    },
    accentBottomLeft: {
        bottom: '15%',
        left: '-10%',
        width: 250,
        height: 250,
    },
});
