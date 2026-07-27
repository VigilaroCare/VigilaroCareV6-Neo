/**
 * PictogramTile.js
 *
 * Componente único pra renderizar um pictograma cerâmico 3D (tile creme +
 * moldura verde já embutidos no PNG — o asset É o card, sem NeoCard por
 * cima). Antes desta peça, Home, Hub e Modo Viagem reimplementavam cada
 * uma a própria conta de proporção — 4 fórmulas diferentes pro mesmo tipo
 * de imagem (ver DIAGNOSTICO_PICTOGRAMAS_2026-07.md).
 *
 * PICTOGRAM_ASPECT_RATIO é a fonte única da proporção real dos PNGs
 * (577×433, a família de referência). Usa `aspectRatio` do RN em vez de
 * calcular width*ratio na mão — funciona tanto com width em pixel quanto
 * em porcentagem/flex, sem precisar de onLayout.
 */
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const PICTOGRAM_ASPECT_RATIO = 577 / 433;

export default function PictogramTile({
    source,
    width,
    height,
    style,
    imageStyle,
    resizeMode = 'contain',
    ...rest
}) {
    const sizeStyle =
        width != null ? { width, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        height != null ? { height, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        { aspectRatio: PICTOGRAM_ASPECT_RATIO };

    return (
        <View style={[sizeStyle, style]} {...rest}>
            <Image source={source} style={[styles.image, imageStyle]} resizeMode={resizeMode} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: { width: '100%', height: '100%' },
});
