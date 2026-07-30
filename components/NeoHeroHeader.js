import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from './ReviewImage';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

/**
 * NeoHeroHeader
 * 
 * Componente padronizado para "Headers com Imagem de Contexto" (Parallax).
 * Resolve inconsistências de altura, sombreamento e animação que afligiam 
 * telas com implementações manuais espalhadas.
 * 
 * @param {Animated.Value} scrollY - Obrigatório. O Animated.Value do ScrollView pai.
 * @param {any} source - Imagem (require) ou URI ({ uri: '...' }).
 * @param {string} title - Título principal exibido sobre a imagem.
 * @param {string} [subtitle] - Subtítulo opcional abaixo do título.
 * @param {number} [height=260] - Altura base do Hero. Padrão unificado: 260px.
 */
export default function NeoHeroHeader({
    scrollY,
    source,
    title,
    subtitle,
    height = 260,
}) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    // Calcula os transform factors baseados na altura informada
    const heroTransform = scrollY ? [
        {
            translateY: scrollY.interpolate({
                inputRange: [-height, 0, height],
                outputRange: [-height / 2, 0, height * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-height, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ] : [];

    // O Gradiente Padrão-Ouro (Gold Standard) - Ajustado para ser mais suave
    // No topo: rgba(0,0,0,0.10) -> apenas o suficiente para a back-arrow ser visível se encostar lá.
    // Transição suave no meio, escurecendo até 0.50 na base onde o texto branco descansa.
    const gradientColors = [
        'rgba(0,0,0,0.10)', 
        'transparent', 
        'rgba(0,0,0,0.15)', 
        'rgba(0,0,0,0.50)',
        isDark ? themeColors.neutral[100] : themeColors.neutral.white
    ];

    const gradientLocations = [0, 0.35, 0.65, 0.95, 1];

    return (
        <Animated.View style={[
            styles.container,
            {
                height: height,
                backgroundColor: themeColors.neutral[800],
                transform: heroTransform,
            }
        ]}>
            <ReviewImage
                source={typeof source === 'number' ? source : { uri: source }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
            />
            
            <LinearGradient
                colors={gradientColors}
                locations={gradientLocations}
                style={StyleSheet.absoluteFill}
            />

            <View style={styles.textContainer}>
                {!!title && (
                    <Text style={styles.title}>
                        {title}
                    </Text>
                )}
                {!!subtitle && (
                    <Text style={styles.subtitle}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        overflow: 'hidden',
    },
    textContainer: {
        position: 'absolute',
        bottom: 24,
        paddingHorizontal: 22,
        width: '100%',
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -0.8,
        lineHeight: 38,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 17,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 24,
    }
});
