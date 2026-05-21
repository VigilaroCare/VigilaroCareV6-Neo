/**
 * PetHeroBanner.js
 * Banner hero para telas de destino do hub Saúde Pet.
 *
 * Recebe a mesma imagem (require local OU URL Pexels) que aparecia no
 * card de origem em PetsMenuScreen — cria continuidade visual da
 * navegação. Tinta com a cor do card + vinheta sutil.
 *
 * Uso:
 *   <PetHeroBanner image={imagem} imageUrl={imagemUrl} tint={cor} />
 *
 * Vigilaro Care V6 Neo — 2026-05-21
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Shadows } from '../utils/Theme';
import ReviewImage from './ReviewImage';

export default function PetHeroBanner({
    image,
    imageUrl,
    tint = '#7C3AED',
    accessibilityLabel,
    height = 140,
    marginHorizontal = 20,
    marginBottom = 16,
}) {
    const source = image || (imageUrl ? { uri: imageUrl } : null);
    if (!source) return null;

    return (
        <View
            style={[
                styles.banner,
                { height, marginHorizontal, marginBottom },
            ]}
        >
            <ReviewImage
                source={source}
                tint={tint}
                tintOpacity={0.12}
                accessibilityLabel={accessibilityLabel}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        borderRadius: 18,
        overflow: 'hidden',
        ...Shadows.sm,
    },
});
