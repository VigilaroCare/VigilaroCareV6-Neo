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
import { useState } from "react";
import { View, Image, StyleSheet } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';

export const PICTOGRAM_ASPECT_RATIO = 577 / 433;

// O creme do tile é FIXO nos dois temas, não vem do token de superfície.
// Decisão de 22/09: o verde do desenho mede 1,43:1 sobre o tile escuro do
// modo noturno — some. O pictograma mantém o próprio fundo, como o ícone de
// um app mantém o dele na tela inicial. No escuro ele apenas perde um pouco
// de brilho, via `atenuado`.
const CREME = '#F4EBDC';
const CREME_NOTURNO = '#E7DDCC';

// Opção não escolhida de um seletor: recua o DESENHO, nunca o tile.
//
// Antes cada tela resolvia isso com `opacity` no wrapper do tile. Em Android
// isso produz a "moldura fantasma": o wrapper vira uma camada de composição e
// a sombra de elevação do card é redesenhada como um retângulo chapado, maior
// que o card — o contorno duro que já nos incomodou em outras versões.
//
// Além do artefato, apagar o card inteiro custa contraste: o verde a 55% mede
// 2,81:1 sobre o creme, abaixo do mínimo de 3:1 que a norma pede para
// elemento gráfico — e a opção continua tocável. A 0,70 mede 3,98:1.
const OPACIDADE_RECUADO = 0.7;

export default function PictogramTile({
    source,
    width,
    height,
    style,
    imageStyle,
    resizeMode = 'contain',
    atenuado = false,          // true no modo escuro: creme levemente rebaixado
    recuado = false,           // opção não escolhida: esmaece só o desenho
    // `moldura` é OPT-IN de propósito. A maioria das telas ainda passa o PNG
    // legado, que já traz o tile pintado dentro — ligar por padrão daria
    // moldura dupla em todas elas. Migra-se uma tela por vez.
    moldura = false,
    ...rest
}) {
    const [lado, setLado] = useState(0);

    // O recuo vai no glifo, e só nele: o tile mantém opacidade cheia para não
    // criar camada de composição em cima da sombra.
    const estiloGlifo = recuado ? [{ opacity: OPACIDADE_RECUADO }, imageStyle] : imageStyle;

    // A superfície é sempre creme, então a borda padrão é a da paleta clara —
    // é a superfície que o tile desenha, não a do tema. Em alto contraste,
    // porém, o contorno forte é requisito, e aí vale o do tema: o fio a 16%
    // deixaria o tile sem aresta para quem precisa dela.
    const colors = useThemeColors();
    const { highContrast } = useAccessibility() || {};
    const borda = highContrast
        ? { borderColor: colors.tile.border, borderWidth: colors.tile.borderWidth }
        : null;

    const sizeStyle =
        width != null ? { width, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        height != null ? { height, aspectRatio: PICTOGRAM_ASPECT_RATIO } :
        { aspectRatio: PICTOGRAM_ASPECT_RATIO };

    if (!moldura) {
        // caminho legado: o PNG é o card inteiro
        return (
            <View style={[sizeStyle, style]} {...rest}>
                {/* aqui o PNG é o card inteiro, então o recuo apaga o card
                    junto — é o preço do caminho legado, não do recuo */}
                <Image source={source} style={[styles.image, estiloGlifo]} resizeMode={resizeMode} />
            </View>
        );
    }

    // Canto proporcional à altura — em px fixo, tile pequeno fica quadrado e
    // tile grande fica excessivamente arredondado.
    const raio = lado ? Math.round(lado * 0.18) : 0;

    return (
        <View style={[sizeStyle, styles.moldura, style]} {...rest}>
            {/* O card NÃO preenche a caixa toda. No PNG antigo ele ocupava 75%
                da largura e 79% da altura da imagem, e era essa margem que dava
                o respiro entre o tile e o rótulo. Preenchendo tudo, o texto
                encostava na borda de baixo. */}
            <View
                style={[
                    styles.tile,
                    {
                        backgroundColor: atenuado ? CREME_NOTURNO : CREME,
                        borderRadius: raio,
                    },
                    borda,
                ]}
                onLayout={(e) => setLado(e.nativeEvent.layout.height)}
            >
            {/* O glifo é quadrado e se mede pela ALTURA do tile: é isso que faz
                todas as peças terem o mesmo peso óptico na grade.
                O tamanho vem do valor MEDIDO, não de porcentagem: dentro de um
                contêiner que só tem `flex`, `height: '100%'` resolve como zero
                no React Native e a imagem simplesmente não aparece. */}
            <View style={styles.centro}>
                {lado > 0 && (
                    <Image
                        source={source}
                        style={[{ width: lado, height: lado }, estiloGlifo]}
                        resizeMode={resizeMode}
                    />
                )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    moldura: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tile: {
        // proporção e tamanho do card dentro da caixa — os mesmos que o PNG
        // legado tinha (435x341 numa imagem de 577x433)
        width: '75.4%',
        aspectRatio: 435 / 341,
        overflow: 'hidden',
        // Borda e sombra vêm do DS, não daqui: são as MESMAS do card do score.
        // O tile é sempre creme, então lê a paleta clara de propósito — é a
        // superfície que ele desenha, não a do tema.
        borderWidth: Neo.colors.tile.borderWidth,
        borderColor: Neo.colors.tile.border,
        ...Neo.shadows.ceramic,
    },
    centro: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: { width: '100%', height: '100%' },
});
