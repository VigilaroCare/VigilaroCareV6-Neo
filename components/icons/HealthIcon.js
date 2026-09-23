import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * HealthIcon — saúde, glifo próprio do Vigilaro.
 *
 * Registrado sob `Health`, que já era o nome dominante. Absorve os usos de
 * `Heart` e `HeartAdd`, que significavam a mesma coisa em contextos
 * clínicos (kit de medicamentos, revisão de segurança). Decisão de 23/09:
 * saúde tem um símbolo só; o coração puro fica livre para significar afeto
 * ou favorito, se um dia fizer falta.
 *
 * Coração + pulso, e não uma cruz: o app é prevenção e cuidado em casa, não
 * ambiente clínico.
 *
 * Aferido a 24px (ver nota em PeopleIcon): tinta 13,9% · caixa 175 ·
 * vão 1,18px. O pulso da primeira versão passava a 0,79px do contorno do
 * coração e fechava — foi encurtado e afinado para 14 até abrir.
 */
const CORACAO =
    'M128 200.6 C100.4 181.6 48.5 148.7 48.5 103.8 ' +
    'C48.5 81.3 66.7 64.1 89.1 64.1 ' +
    'C107.3 64.1 121.1 74.4 128 88.3 ' +
    'C134.9 74.4 148.7 64.1 166.9 64.1 ' +
    'C189.3 64.1 207.5 81.3 207.5 103.8 ' +
    'C207.5 148.7 155.6 181.6 128 200.6 Z';
const PULSO = 'M95.2 126.3 L110.7 126.3 L118.5 114.2 L130.6 138.4 L140.1 126.3 L160.8 126.3';

export default function HealthIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const duo = weight === 'duotone';
    const fill = weight === 'fill';

    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {(duo || fill) && (
                <Path d={CORACAO} fill={color} opacity={fill ? 1 : 0.2} />
            )}
            <Path d={CORACAO} stroke={color} strokeWidth={16} strokeLinejoin="round" />
            {/* no peso `fill` o pulso é vazado: precisa ler sobre a massa */}
            <Path
                d={PULSO}
                stroke={fill ? '#FFFFFF' : color}
                strokeWidth={14}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
