import React from 'react';
import Svg, { Rect, Polygon, Line, Circle } from 'react-native-svg';

/**
 * EducationTileIcon — ícone da aba "Educação", família "eco do tile": capelo
 * (mortarboard) dentro do quadrado de cantos arredondados que cita os tiles
 * cerâmicos. Monocromático, "acende" preenchido no ativo.
 *   - weight='regular' (INATIVA): tile + capelo em CONTORNO.
 *   - weight='fill'    (ATIVA):   capelo PREENCHIDO dentro do tile.
 * Traço reforçado p/ legibilidade no footer (14 / borla 12 / tile 12). Consumido via NeoIcon (name="EducationTile").
 */
export default function EducationTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    const fillColor = active ? color : 'none';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {/* Tile — assinatura constante */}
            <Rect x={20} y={20} width={216} height={216} rx={58}
                  stroke={color} strokeWidth={12} fill="none" />
            {/* Base do capelo (faixa sobre a cabeça) */}
            <Polygon points="106,132 112,158 144,158 150,132"
                     fill={fillColor} stroke={color} strokeWidth={14} strokeLinejoin="round" />
            {/* Tábua do capelo */}
            <Polygon points="56,114 128,90 200,114 128,138"
                     fill={fillColor} stroke={color} strokeWidth={14} strokeLinejoin="round" />
            {/* Borla */}
            <Line x1={198} y1={116} x2={198} y2={152}
                  stroke={color} strokeWidth={12} strokeLinecap="round" />
            <Circle cx={198} cy={158} r={9} fill={color} />
        </Svg>
    );
}
