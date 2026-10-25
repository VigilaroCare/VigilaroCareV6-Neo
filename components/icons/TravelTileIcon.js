import Svg, { G, Path, Rect, Line } from 'react-native-svg';

/**
 * TravelTileIcon — ícone da aba "Viagem": mala de viagem.
 *   - weight='regular' (INATIVA): mala em CONTORNO.
 *   - weight='fill'    (ATIVA):   mala PREENCHIDA com a divisão VAZADA
 *                                 (fillRule evenodd → buraco real, funciona em
 *                                 qualquer fundo, como no ReportTileIcon).
 *
 * Criado em 2026-08-01. Quando o Modo Viagem voltou ao rodapé (commit d88987f)
 * a aba recebeu o `Airplane` puro do Phosphor — sem a moldura que as outras
 * quatro tinham. Era a única solta na barra. Em 25/10/2026 a moldura saiu de
 * todas, e a nota se inverte: a irregularidade de então virou a norma.
 *
 * MALA, e não avião, de propósito: o avião já é o estado ATIVO. Quando o Modo
 * Viagem liga, o footer troca este ícone pelo avião inclinado (ou carro/ônibus/
 * trem/navio, conforme o modal escolhido) e anima a ascensão. A mala parada é o
 * repouso; o avião no ar é a viagem acontecendo. Um avião nos dois estados
 * desperdiçaria essa narrativa.
 *
 * Moldura removida e glifo reescalado — ver HomeTileIcon.js para o porquê e
 * para a razão de o traço ser dividido por `K`.
 */

// Corpo da mala + divisão horizontal vazada (evenodd).
const CORPO_PREENCHIDO =
    'M88 96 L168 96 A18 18 0 0 1 186 114 L186 170 A18 18 0 0 1 168 188 ' +
    'L88 188 A18 18 0 0 1 70 170 L70 114 A18 18 0 0 1 88 96 Z ' +
    'M70 135 L186 135 L186 149 L70 149 Z';

// Alça: arco em U que sobe do topo do corpo.
const ALCA = 'M104 96 L104 82 A14 14 0 0 1 118 68 L138 68 A14 14 0 0 1 152 82 L152 96';

const K = 1.54;

export default function TravelTileIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const active = weight === 'fill';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            <G transform={`translate(128 128) scale(${K}) translate(-128 -128)`}>
                {/* Alça: sempre em contorno, nos dois estados — preenchida ela
                    viraria um bloco maciço e a mala perderia a silhueta. */}
                <Path d={ALCA} stroke={color} strokeWidth={14 / K} fill="none"
                      strokeLinecap="round" strokeLinejoin="round" />

                {active ? (
                    <Path d={CORPO_PREENCHIDO} fill={color} fillRule="evenodd" />
                ) : (
                    <>
                        <Rect x={70} y={96} width={116} height={92} rx={18}
                              stroke={color} strokeWidth={14 / K} fill="none" />
                        <Line x1={70} y1={142} x2={186} y2={142}
                              stroke={color} strokeWidth={13 / K} />
                    </>
                )}
            </G>
        </Svg>
    );
}
