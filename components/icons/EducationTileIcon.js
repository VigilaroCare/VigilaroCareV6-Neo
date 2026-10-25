import Svg, { G, Polygon, Line, Circle } from 'react-native-svg';

/**
 * EducationTileIcon — ícone da aba "Educação": capelo (mortarboard).
 *   - weight='regular' (INATIVA): capelo em CONTORNO.
 *   - weight='fill'    (ATIVA):   capelo PREENCHIDO.
 * Consumido via NeoIcon (name="EducationTile").
 *
 * Moldura removida e glifo reescalado em 25/10/2026 — ver HomeTileIcon.js para
 * o porquê (o rodapé citava o tile cerâmico, que saiu das telas) e para a
 * razão de o traço ser dividido por `K`.
 *
 * Aqui `K` é maior que o da casa porque o capelo era o desenho mais contido da
 * família: media ~158 de largura com traço, contra ~171 da casa. Os dois
 * chegam a ~200, que é a medida compartilhada.
 */
const K = 1.27;

export default function EducationTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    const fillColor = active ? color : 'none';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            <G transform={`translate(128 128) scale(${K}) translate(-128 -128)`}>
                {/* Base do capelo (faixa sobre a cabeça) */}
                <Polygon points="106,132 112,158 144,158 150,132"
                         fill={fillColor} stroke={color} strokeWidth={14 / K} strokeLinejoin="round" />
                {/* Tábua do capelo */}
                <Polygon points="56,114 128,90 200,114 128,138"
                         fill={fillColor} stroke={color} strokeWidth={14 / K} strokeLinejoin="round" />
                {/* Borla */}
                <Line x1={198} y1={116} x2={198} y2={152}
                      stroke={color} strokeWidth={12 / K} strokeLinecap="round" />
                <Circle cx={198} cy={158} r={9} fill={color} />
            </G>
        </Svg>
    );
}
