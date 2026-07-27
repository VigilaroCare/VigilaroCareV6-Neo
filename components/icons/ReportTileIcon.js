import React from 'react';
import Svg, { Rect, Path, Line } from 'react-native-svg';

/**
 * ReportTileIcon — ícone da aba "Relatório", família "eco do tile": prancheta
 * dentro do quadrado de cantos arredondados que cita os tiles cerâmicos.
 *   - weight='regular' (INATIVA): prancheta + linhas em CONTORNO.
 *   - weight='fill'    (ATIVA):   prancheta PREENCHIDA com as linhas VAZADAS
 *                                  (fillRule evenodd → buracos reais, em
 *                                  qualquer fundo).
 * Traço reforçado p/ legibilidade no footer (14 / linhas 13 / tile 12). Consumido via NeoIcon (name="ReportTile").
 */
export default function ReportTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {/* Tile — assinatura constante */}
            <Rect x={20} y={20} width={216} height={216} rx={58}
                  stroke={color} strokeWidth={12} fill="none" />
            {active ? (
                <>
                    <Path
                        fillRule="evenodd"
                        fill={color}
                        d={`M94 82 L162 82 A16 16 0 0 1 178 98 L178 170 A16 16 0 0 1 162 186
                            L94 186 A16 16 0 0 1 78 170 L78 98 A16 16 0 0 1 94 82 Z
                            M96 112 L160 112 L160 124 L96 124 Z
                            M96 134 L160 134 L160 146 L96 146 Z
                            M96 156 L138 156 L138 168 L96 168 Z`}
                    />
                    <Rect x={108} y={66} width={40} height={26} rx={8} fill={color} />
                </>
            ) : (
                <>
                    <Rect x={78} y={82} width={100} height={104} rx={16}
                          stroke={color} strokeWidth={14} fill="none" />
                    <Rect x={108} y={66} width={40} height={26} rx={8}
                          stroke={color} strokeWidth={14} fill="none" />
                    <Line x1={96} y1={118} x2={160} y2={118} stroke={color} strokeWidth={13} strokeLinecap="round" />
                    <Line x1={96} y1={140} x2={160} y2={140} stroke={color} strokeWidth={13} strokeLinecap="round" />
                    <Line x1={96} y1={162} x2={138} y2={162} stroke={color} strokeWidth={13} strokeLinecap="round" />
                </>
            )}
        </Svg>
    );
}
