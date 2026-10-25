import Svg, { G, Path } from 'react-native-svg';

/**
 * HomeTileIcon — ícone da aba "Início": casa de arquitetura contemporânea,
 * telhado DUAS ÁGUAS assimétrico, cumeeira deslocada — mesma linguagem dos
 * pictogramas Atividades Eventuais / Raio-X da Casa.
 *   - weight='regular' (aba INATIVA): casa em CONTORNO.
 *   - weight='fill'    (aba ATIVA):   casa PREENCHIDA.
 * Gramática Phosphor (viewBox 256, traço arredondado). Consumido via NeoIcon
 * (name="HomeTile").
 *
 * A MOLDURA SAIU em 25/10/2026. Até aqui a família tinha um quadrado de cantos
 * arredondados de assinatura constante, que citava de propósito os tiles
 * cerâmicos do app. Os tiles saíram da Home e da Educação quando o card
 * retroiluminado entrou (ANATOMIA §9.5): o rodapé passou a citar um padrão que
 * não existe mais nas telas para onde ele leva.
 *
 * ESCALA: a moldura ocupava até 236 de 256. Sem ela o desenho ficaria pequeno
 * no meio de um quadro vazio — o mesmo defeito dos pictogramas antes do
 * reenquadramento. `K` devolve ao glifo a extensão que a moldura tomava: com
 * traço, a casa media ~171 de largura e passa a medir ~200, que é a medida que
 * os quatro ícones da família compartilham.
 *
 * TRAÇO: dividido por `K` de propósito. O `scale` do <G> multiplicaria a
 * espessura junto, e aí cada ícone da família sairia com um peso de linha
 * diferente conforme o quanto cresceu. Dividindo antes, o traço renderizado
 * fica constante — que é a propriedade que faz os quatro parecerem um conjunto.
 */
const K = 1.17;

export default function HomeTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    const line = {
        stroke: color,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
    };
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            <G transform={`translate(128 128) scale(${K}) translate(-128 -128)`}>
                {/* Massa da casa quando ativa */}
                {active && (
                    <Path d="M70 126 L150 80 L188 102 L188 184 L70 184 Z" fill={color} />
                )}
                {/* Paredes + piso */}
                <Path d="M70 126 L70 184 L188 184 L188 102" {...line} strokeWidth={14 / K} />
                {/* Telhado duas águas (cumeeira deslocada) */}
                <Path d="M50 138 L150 80 L206 112" {...line} strokeWidth={15 / K} />
            </G>
        </Svg>
    );
}
