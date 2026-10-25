import Svg, { G, Rect, Path, Line } from 'react-native-svg';

/**
 * ReportTileIcon — ícone da aba "Relatório", família "eco do tile": prancheta
 * dentro do quadrado de cantos arredondados que cita os tiles cerâmicos.
 *   - weight='regular' (INATIVA): prancheta + linhas em CONTORNO.
 *   - weight='fill'    (ATIVA):   prancheta PREENCHIDA com as linhas VAZADAS
 *                                  (fillRule evenodd → buracos reais, em
 *                                  qualquer fundo).
 * Traço reforçado p/ legibilidade no footer. Consumido via NeoIcon (name="ReportTile").
 *
 * ÓRFÃO desde 2026-07-31, quando "Relatório" saiu do rodapé e virou card ao
 * lado do Mapa de Calor. Segue registrado no NeoIcon, então foi alinhado junto
 * com os irmãos em 25/10/2026 — moldura removida e glifo reescalado. Deixá-lo
 * para trás manteria a língua antiga acessível pelo registro, à espera de que
 * alguém a usasse sem saber. Ver HomeTileIcon.js para o porquê e para a razão
 * de o traço ser dividido por `K`.
 *
 * `K` aqui é 1,49: a prancheta media ~134 de largura com traço (x 78..178 mais
 * a meia-espessura) e passa a medir ~200, a medida da família.
 */
const K = 1.49;

export default function ReportTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            <G transform={`translate(128 128) scale(${K}) translate(-128 -128)`}>
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
                          stroke={color} strokeWidth={14 / K} fill="none" />
                    <Rect x={108} y={66} width={40} height={26} rx={8}
                          stroke={color} strokeWidth={14 / K} fill="none" />
                    <Line x1={96} y1={118} x2={160} y2={118} stroke={color} strokeWidth={13 / K} strokeLinecap="round" />
                    <Line x1={96} y1={140} x2={160} y2={140} stroke={color} strokeWidth={13 / K} strokeLinecap="round" />
                    <Line x1={96} y1={162} x2={138} y2={162} stroke={color} strokeWidth={13 / K} strokeLinecap="round" />
                </>
            )}
            </G>
        </Svg>
    );
}
