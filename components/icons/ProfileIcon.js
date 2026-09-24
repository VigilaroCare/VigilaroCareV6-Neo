import Svg, { Circle, Path } from 'react-native-svg';

/**
 * ProfileIcon — "uma pessoa", glifo próprio do Vigilaro.
 *
 * Registrado no NeoIcon sob o nome `Profile`, que já era o mais usado do
 * grupo. Como CUSTOM_ICONS tem precedência sobre o Phosphor, todo callsite
 * que já pedia `Profile` passa a receber este desenho sem precisar mudar.
 *
 * Gramática do Phosphor: viewBox 256, traço 16 arredondado, duotone = massa
 * a 0.2 por baixo do traço pleno.
 *
 * Geometria medida antes de desenhar (ver nota no topo de PeopleIcon):
 * tinta 12,0% a 24px · caixa 192 · menor vão entre cabeça e ombro 1,31px.
 * A primeira versão tinha vão de 0,19px — cabeça e ombro colavam num borrão
 * no tamanho em que o ícone realmente aparece.
 */
const CABECA = { cx: 128, cy: 84, r: 38 };
const OMBROS = 'M40 214 C40 176 76 152 128 152 C180 152 216 176 216 214';
const OMBROS_MASSA = `${OMBROS} L40 214 Z`;

export default function ProfileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const duo = weight === 'duotone';
    const fill = weight === 'fill';
    const opacidade = fill ? 1 : 0.2;

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {(duo || fill) && (
                <>
                    <Circle {...CABECA} fill={color} opacity={opacidade} />
                    <Path d={OMBROS_MASSA} fill={color} opacity={opacidade} />
                </>
            )}
            <Circle {...CABECA} stroke={color} strokeWidth={16} />
            <Path
                d={OMBROS}
                stroke={color}
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
