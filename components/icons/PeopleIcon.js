import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

/**
 * PeopleIcon — "mais de uma pessoa", glifo próprio do Vigilaro.
 *
 * Registrado sob o nome `People`, o mais usado do grupo. Substitui também
 * `UserList` e `Profile2User`, que conviviam com ele — os dois últimos
 * chegavam a aparecer na MESMA tela (Relatórios), um ao lado do outro,
 * significando a mesma coisa.
 *
 * ── COMO ESTA FAMÍLIA FOI AFERIDA ────────────────────────────────────────
 * Ícone se julga no tamanho de uso, não ampliado: a lição custou uma
 * regeração inteira dos pictogramas. Antes de virar JSX, cada glifo foi
 * rasterizado a 24px e medido em duas grandezas:
 *   • fração de tinta — peso óptico; a família ficou entre 12,0% e 14,6%
 *   • menor corredor entre dois traços — abaixo de ~1px o desenho vira
 *     mancha. Três dos quatro reprovaram na primeira tentativa (0,19px,
 *     0,38px e 0,79px) e tiveram a geometria refeita.
 * Este: tinta 14,8% · caixa 197 · vão 2,06px.
 */
const CABECA_FRENTE = { cx: 98, cy: 98, r: 30 };
const CABECA_TRAS = { cx: 194, cy: 84, r: 24 };
const CORPO_FRENTE = 'M40 216 C40 184 66 166 98 166 C130 166 156 184 156 216';
const CORPO_TRAS = 'M186 158 C206 162 220 182 220 216';

export default function PeopleIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const duo = weight === 'duotone';
    const fill = weight === 'fill';
    const opacidade = fill ? 1 : 0.2;

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {(duo || fill) && (
                <>
                    <Circle {...CABECA_TRAS} fill={color} opacity={opacidade} />
                    <Circle {...CABECA_FRENTE} fill={color} opacity={opacidade} />
                    <Path d={`${CORPO_FRENTE} L40 216 Z`} fill={color} opacity={opacidade} />
                </>
            )}
            {/* a figura de trás vem primeiro: quem está na frente cobre */}
            <Circle {...CABECA_TRAS} stroke={color} strokeWidth={16} />
            <Path d={CORPO_TRAS} stroke={color} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
            <Circle {...CABECA_FRENTE} stroke={color} strokeWidth={16} />
            <Path d={CORPO_FRENTE} stroke={color} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    );
}
