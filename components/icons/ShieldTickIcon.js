import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * ShieldTickIcon — proteção verificada, glifo próprio do Vigilaro.
 *
 * É o símbolo mais usado do app (30 ocorrências) e o que carrega a promessa
 * do produto, por isso passa a ser desenho da casa e não do catálogo.
 * Absorve os usos de `Shield`, que dizia a mesma coisa com outro traço.
 *
 * Aferido a 24px (ver nota em PeopleIcon): tinta 14,5% · caixa 183 ·
 * vão 1,90px. O escudo é a forma mais pesada da família; foi reduzido a
 * 0,809 do tamanho original para não dominar a fileira — sem isso media
 * 18,9% contra os 12% da pessoa, e a diferença aparecia lado a lado.
 */
const ESCUDO =
    'M128 45.5 L196 73 L196 137.7 ' +
    'C196 173.3 160.4 199.2 128 212.1 ' +
    'C95.6 199.2 60 173.3 60 137.7 ' +
    'L60 73 Z';
const TIQUE = 'M98.9 128 L119.1 149 L158.7 107';

export default function ShieldTickIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const duo = weight === 'duotone';
    const fill = weight === 'fill';

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {(duo || fill) && (
                <Path d={ESCUDO} fill={color} opacity={fill ? 1 : 0.2} />
            )}
            <Path d={ESCUDO} stroke={color} strokeWidth={16} strokeLinejoin="round" />
            {/* no peso `fill` o tique é vazado, como no ShieldCheck do Phosphor */}
            <Path
                d={TIQUE}
                stroke={fill ? '#FFFFFF' : color}
                strokeWidth={18}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
