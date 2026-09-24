import Svg, { Circle, Path, Line } from 'react-native-svg';

/**
 * ElderlyIcon — glifo próprio do Vigilaro (o Phosphor não tem "idoso").
 * Desenhado na gramática do Phosphor: viewBox 256, traços 16 arredondados,
 * duotone = massa translúcida (0.2) + traço pleno. Postura levemente
 * inclinada + bengala = leitura imediata de "idoso" mesmo a 20px.
 *
 * Consumido EXCLUSIVAMENTE via NeoIcon (name="Elderly") — não importar direto.
 */
export default function ElderlyIcon({ size = 24, color = '#000', weight = 'regular' }) {
    const duo = weight === 'duotone';
    const fill = weight === 'fill';
    return (
        <Svg width={size} height={size} viewBox="0 0 256 256" fill="none">
            {/* massa duotone: cabeça + torso (capsula inclinada) */}
            {(duo || fill) && (
                <>
                    <Circle cx={104} cy={56} r={34} fill={color} opacity={fill ? 1 : 0.2} />
                    <Line
                        x1={108} y1={104} x2={120} y2={156}
                        stroke={color} strokeWidth={52} strokeLinecap="round"
                        opacity={fill ? 1 : 0.2}
                    />
                </>
            )}
            {/* contorno da cabeça */}
            <Circle cx={104} cy={56} r={34} stroke={color} strokeWidth={16} />
            {/* pernas a partir do quadril */}
            <Path
                d="M120 156 L96 224 M120 156 L138 220"
                stroke={color} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
            />
            {/* braço estendido até a bengala */}
            <Path
                d="M110 112 L162 148"
                stroke={color} strokeWidth={16} strokeLinecap="round"
            />
            {/* bengala */}
            <Line
                x1={164} y1={150} x2={176} y2={226}
                stroke={color} strokeWidth={14} strokeLinecap="round"
            />
        </Svg>
    );
}
