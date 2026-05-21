/**
 * ReviewImage.js
 * Wrapper de Image com tratamento visual uniforme (color-grading + vinheta)
 * para harmonizar fotos de origens diferentes (Pexels, etc.).
 *
 * Aplica:
 *   1. Tint de marca em overlay translúcido (color grade)
 *   2. Vinheta vertical sutil (escurece topo e base)
 *
 * Resultado: fotos com paletas e iluminações distintas ganham um
 * "tom comum" sem perder o contexto da imagem original.
 *
 * Vigilaro Care V6 Neo
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReviewImage({
    source,
    style,
    resizeMode = 'cover',
    tint = '#00695C',
    tintOpacity = 0.10,
    accessibilityLabel,
    onError,
    onLoad,
}) {
    return (
        <View style={[styles.container, style]}>
            <Image
                source={source}
                style={styles.image}
                resizeMode={resizeMode}
                accessibilityIgnoresInvertColors
                accessibilityLabel={accessibilityLabel}
                onError={onError}
                onLoad={onLoad}
            />

            {/* Color grade — tint translúcido na cor da categoria */}
            <View
                pointerEvents="none"
                style={[styles.tint, { backgroundColor: tint, opacity: tintOpacity }]}
            />

            {/* Vinheta vertical — escurece levemente topo e base */}
            <LinearGradient
                pointerEvents="none"
                colors={['rgba(0,0,0,0.16)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.20)']}
                locations={[0, 0.45, 1]}
                style={styles.vignette}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    tint: {
        ...StyleSheet.absoluteFillObject,
    },
    vignette: {
        ...StyleSheet.absoluteFillObject,
    },
});
