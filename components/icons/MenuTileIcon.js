import React from 'react';
import Svg, { Rect } from 'react-native-svg';

/**
 * MenuTileIcon — ícone da aba "Menu", família "eco do tile": grade 2×2 que de
 * propósito ECOA a grade de tiles cerâmicos do app (Menu = "todos os tiles").
 *   - weight='regular' (INATIVA): 4 quadrados em CONTORNO.
 *   - weight='fill'    (ATIVA):   4 quadrados PREENCHIDOS.
 * Traço reforçado p/ legibilidade no footer (14 / tile 12). Consumido via NeoIcon (name="MenuTile").
 */
export default function MenuTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    const cells = [[72, 72], [136, 72], [72, 136], [136, 136]];
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {/* Tile — assinatura constante */}
            <Rect x={20} y={20} width={216} height={216} rx={58}
                  stroke={color} strokeWidth={12} fill="none" />
            {cells.map(([x, y]) => (
                <Rect
                    key={`${x}-${y}`}
                    x={x} y={y} width={48} height={48} rx={12}
                    fill={active ? color : 'none'}
                    stroke={color} strokeWidth={active ? 0 : 14}
                />
            ))}
        </Svg>
    );
}
