import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

/**
 * HomeTileIcon — ícone da aba "Início", estilo "eco do tile" (assinatura
 * Vigilaro): casa de arquitetura contemporânea — telhado DUAS ÁGUAS assimétrico,
 * cumeeira deslocada, mesma linguagem dos pictogramas Atividades Eventuais /
 * Raio-X da Casa — dentro de um quadrado de cantos arredondados que cita os
 * tiles cerâmicos do app. Monocromático, "acende" por estado:
 *   - weight='regular' (aba INATIVA): tile + casa em CONTORNO.
 *   - weight='fill'    (aba ATIVA):   casa PREENCHIDA dentro do tile.
 * Traço fino (paredes 12 / telhado 13 / tile 10). Gramática Phosphor
 * (viewBox 256, traço arredondado). Consumido via NeoIcon (name="HomeTile").
 */
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
            {/* Tile — assinatura constante (sempre contorno) */}
            <Rect x={20} y={20} width={216} height={216} rx={58}
                  stroke={color} strokeWidth={10} fill="none" />
            {/* Massa da casa quando ativa */}
            {active && (
                <Path d="M70 126 L150 80 L188 102 L188 184 L70 184 Z" fill={color} />
            )}
            {/* Paredes + piso */}
            <Path d="M70 126 L70 184 L188 184 L188 102" {...line} strokeWidth={12} />
            {/* Telhado duas águas (cumeeira deslocada) */}
            <Path d="M50 138 L150 80 L206 112" {...line} strokeWidth={13} />
        </Svg>
    );
}
