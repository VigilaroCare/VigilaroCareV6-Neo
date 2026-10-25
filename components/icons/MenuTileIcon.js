import Svg, { G, Rect } from 'react-native-svg';

/**
 * MenuTileIcon — ícone da aba "Menu": grade 2×2.
 *   - weight='regular' (INATIVA): 4 quadrados em CONTORNO.
 *   - weight='fill'    (ATIVA):   4 quadrados PREENCHIDOS.
 * Consumido via NeoIcon (name="MenuTile").
 *
 * Moldura removida e glifo reescalado em 25/10/2026 — ver HomeTileIcon.js para
 * o porquê e para a razão de o traço ser dividido por `K`.
 *
 * NOTA DE SIGNIFICADO: a grade 2×2 ecoava a grade de tiles cerâmicos ("Menu =
 * todos os tiles"). Essa leitura segue válida — a Home continua sendo uma
 * grade, só que de cards retroiluminados em vez de tiles. O que saiu foi a
 * moldura em volta, não o sentido do desenho.
 *
 * `K` é o maior da família: a grade era o desenho mais recuado, ~126 de largura
 * com traço contra ~171 da casa.
 */
const K = 1.59;

export default function MenuTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    const cells = [[72, 72], [136, 72], [72, 136], [136, 136]];
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            <G transform={`translate(128 128) scale(${K}) translate(-128 -128)`}>
                {cells.map(([x, y]) => (
                    <Rect
                        key={`${x}-${y}`}
                        x={x} y={y} width={48} height={48} rx={12}
                        fill={active ? color : 'none'}
                        stroke={color} strokeWidth={active ? 0 : 14 / K}
                    />
                ))}
            </G>
        </Svg>
    );
}
