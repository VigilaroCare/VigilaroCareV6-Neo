/**
 * AppBackground.js
 * Componente de Background Premium com Névoa Verde
 * VigilaroCare Diamond Design System
 * 
 * Cria um efeito de névoa suave verde que dá profundidade à tela.
 * Os cards "flutuam" sobre este background, criando uma hierarquia visual elegante.
 * 
 * Performance: Gradientes estáticos (sem animação), minimalista na GPU.
 */

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ============================================
// PALETA DE NÉVOA (Green Mist) — Home apenas
// ============================================
const MIST = {
    // Gradiente principal: quase branco → verde suave → quase branco
    primary: [
        '#D0EBE0',     // Topo (mais escuro e rico)
        '#B0DBCA',     // Suave
        '#8CCEA8',     // Ponto intenso (verde realçado para vazar no vidro)
        '#A1D4B8',     // Suave
        '#D0EBE0',     // Quase branco
        '#E4F2EC',     // Base
    ],
    // Stops para controlar onde cada cor aparece
    stops: [0, 0.2, 0.45, 0.65, 0.85, 1],

    // Manchas decorativas maiores e com leve cor a mais para dar "nuvens" no fundo
    accent: 'rgba(46, 125, 50, 0.08)',
    accentStrong: 'rgba(27, 94, 32, 0.12)',
};

// Variante sutil: 2-stop limpo para telas de conteúdo
const SUBTLE = {
    primary: ['#F0F7F3', '#F7FAF8'],
    stops: [0, 1],
};

/**
 * AppBackground
 * Wrapper de tela com névoa verde premium.
 * 
 * @param {React.ReactNode} children - Conteúdo da tela
 * @param {object} style - Estilos adicionais para o container
 * @param {boolean} withSafeArea - Se true, aplica padding para SafeArea (default: false)
 * @param {string} statusBarStyle - Estilo da StatusBar ('dark-content' | 'light-content')
 * @param {boolean} showAccents - Se true, mostra manchas decorativas sutis (default: true)
 * @param {'mist'|'subtle'|'solid'} variant - Estilo do fundo (default: 'mist')
 */
export default function AppBackground({
    children,
    style,
    withSafeArea = false,
    statusBarStyle = 'dark-content',
    showAccents = true,
    variant = 'mist',
}) {
    const insets = useSafeAreaInsets();

    // Determinar gradiente e accents com base na variante
    const isMist = variant === 'mist';
    const isSolid = variant === 'solid';
    const gradientColors = isMist ? MIST.primary : (isSolid ? ['#F7F8FA', '#F7F8FA'] : SUBTLE.primary);
    const gradientStops = isMist ? MIST.stops : (isSolid ? [0, 1] : SUBTLE.stops);
    const shouldShowAccents = showAccents && isMist;

    return (
        <View style={[styles.container, style]}>
            <StatusBar barStyle={statusBarStyle} backgroundColor="transparent" translucent />

            {/* Gradiente de fundo */}
            <LinearGradient
                colors={gradientColors}
                locations={gradientStops}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0.3, y: 0 }}
                end={{ x: 0.7, y: 1 }}
            />

            {/* Manchas decorativas sutis (apenas no modo mist) */}
            {shouldShowAccents && (
                <>
                    <View style={[styles.mistAccent, styles.accentTopRight]} />
                    <View style={[styles.mistAccent, styles.accentBottomLeft]} />
                </>
            )}

            {/* Conteúdo com SafeArea opcional */}
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
 * Export da paleta para uso externo (ex: cards que precisam se adaptar)
 */
export { MIST };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F8F4', // Fallback case gradient fails to load
    },
    content: {
        flex: 1,
    },

    // Manchas decorativas de névoa
    mistAccent: {
        position: 'absolute',
        borderRadius: 999,
    },
    accentTopRight: {
        top: '10%',
        right: '-15%',
        width: 300,
        height: 300,
        backgroundColor: MIST.accent,
    },
    accentBottomLeft: {
        bottom: '15%',
        left: '-10%',
        width: 250,
        height: 250,
        backgroundColor: MIST.accentStrong,
    },
});
