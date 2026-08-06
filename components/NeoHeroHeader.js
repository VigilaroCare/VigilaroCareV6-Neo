import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import ReviewImage from './ReviewImage';
import { useThemeColors } from '../utils/ThemeContext';

/**
 * NeoHeroHeader
 *
 * Componente padronizado para "Headers com Imagem de Contexto" (Parallax).
 * Resolve inconsistências de altura e animação que afligiam telas com
 * implementações manuais espalhadas. Imagem sem gradiente/sombreamento —
 * mostra o contexto por si só; só o título fica sobreposto.
 *
 * @param {Animated.Value} scrollY - Obrigatório. O Animated.Value do ScrollView pai.
 * @param {any} source - Imagem (require) ou URI ({ uri: '...' }).
 * @param {string} title - Título principal exibido sobre a imagem.
 * @param {number} [height=260] - Altura base do Hero. Padrão unificado: 260px.
 */
export default function NeoHeroHeader({
    scrollY,
    source,
    title,
    height = 260,
}) {
    const themeColors = useThemeColors();

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

            <View style={styles.textContainer}>
                {!!title && (
                    <Text style={styles.title}>
                        {title}
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
});
