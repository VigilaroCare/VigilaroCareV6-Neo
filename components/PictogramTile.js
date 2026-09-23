/**
 * PictogramTile.js
 *
 * O tile cerâmico: o COMPONENTE desenha o quadrado creme, o canto, a borda e a
 * sombra; o PNG traz apenas o desenho, em fundo transparente.
 *
 * Antes, tile e moldura vinham pintados dentro do PNG. Isso trazia três
 * defeitos que nenhum ajuste de arte resolvia:
 *   - a moldura era um contorno escuro de 1px pintado em 577px e exibido em
 *     ~170pt: serrilhava, e é de onde vinha boa parte da sensação de "duro"
 *   - o creme do arquivo não acompanhava o tema
 *   - cada peça ocupava uma fração diferente do quadro (medido: de 37,6% a
 *     61,9%), então a grade parecia desalinhada mesmo com todas as peças boas
 *
 * Os glifos de `assets/illustrations/glifos/` já saem normalizados por
 * `scripts/normalizar_pictogramas.js`: mesma ocupação, centro óptico alinhado
 * e verde único. Aqui só emolduramos.
 *
 * PICTOGRAM_ASPECT_RATIO permanece 577/433: a proporção do tile é a mesma de
 * sempre, de propósito. Mudar para 1:1 cresceria a altura de cada tile em um
 * terço e quebraria a regra de produto "Home sem scroll".
 */
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';

export const PICTOGRAM_ASPECT_RATIO = 577 / 433;

// O creme do tile é FIXO nos dois temas, não vem do token de superfície.
// Decisão de 22/09: o verde do desenho mede 1,43:1 sobre o tile escuro do
// modo noturno — some. O pictograma mantém o próprio fundo, como o ícone de
// um app mantém o dele na tela inicial. No escuro ele apenas perde um pouco
// de brilho, via `atenuado`.
const CREME = '#F4EBDC';
const CREME_NOTURNO = '#E7DDCC';

export default function PictogramTile({
    source,
    width,
    height,
    style,
    imageStyle,
    resizeMode = 'contain',
    atenuado = false,          // true no modo escuro: creme levemente rebaixado
    // `moldura` é OPT-IN de propósito. A maioria das telas ainda passa o PNG
    // legado, que já traz o tile pintado dentro — ligar por padrão daria
    // moldura dupla em todas elas. Migra-se uma tela por vez.
    moldura = false,
    ...rest
}) {
    const [lado, setLado] = useState(0);

    const sizeStyle =
        width != null ? { width, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        height != null ? { height, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        { aspectRatio: PICTOGRAM_ASPECT_RATIO };

    if (!moldura) {
        // caminho legado: o PNG é o card inteiro
        return (
            <View style={[sizeStyle, style]} {...rest}>
                <Image source={source} style={[styles.image, imageStyle]} resizeMode={resizeMode} />
            </View>
        );
    }

    // Canto proporcional à altura — em px fixo, tile pequeno fica quadrado e
    // tile grande fica excessivamente arredondado.
    const raio = lado ? Math.round(lado * 0.18) : 0;

    return (
        <View
            style={[
                sizeStyle,
                styles.tile,
                {
                    backgroundColor: atenuado ? CREME_NOTURNO : CREME,
                    borderRadius: raio,
                    shadowColor: Neo.colors.primary[900],
                },
                style,
            ]}
            onLayout={(e) => setLado(e.nativeEvent.layout.height)}
            {...rest}
        >
            {/* O glifo é quadrado e se mede pela ALTURA do tile: é isso que faz
                todas as peças terem o mesmo peso óptico na grade. */}
            <View style={styles.centro}>
                <Image
                    source={source}
                    style={[styles.glifo, imageStyle]}
                    resizeMode={resizeMode}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        overflow: 'hidden',
        // Borda como insinuação, não como contorno: o traço escuro de antes
        // era o que mais endurecia a peça.
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(6, 95, 70, 0.16)',
        // Elevação discreta — o que separa o tile do fundo sem chapar.
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    centro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glifo: {
        height: '100%',
        aspectRatio: 1,
    },
    image: { width: '100%', height: '100%' },
});
