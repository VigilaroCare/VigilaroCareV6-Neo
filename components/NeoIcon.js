import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Line, Polyline } from 'react-native-svg';
import * as Iconsax from 'iconsax-react-native';

// Custom SVGs designed to perfectly match the Iconsax Linear style
// (strokeWidth=1.5, strokeLinecap=round, viewBox=0 0 24 24, size=24, color=currentColor)

const SvgBase = ({ size, color, children }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {React.Children.map(children, child =>
            React.cloneElement(child, {
                stroke: color,
                strokeWidth: 1.5,
                strokeLinecap: 'round',
                strokeLinejoin: 'round'
            })
        )}
    </Svg>
);

const CustomIcons = {
    // Cozinha
    Kitchen: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M4 14C4 17.3137 6.68629 20 10 20H14C17.3137 20 20 17.3137 20 14V13C20 12.4477 19.5523 12 19 12H5C4.44772 12 4 12.4477 4 13V14Z" />
            <Path d="M4 12V10" />
            <Path d="M20 12V10" />
            <Path d="M9 12V8C9 6.89543 9.89543 6 11 6H13C14.1046 6 15 6.89543 15 8V12" />
            <Path d="M11 3V5" />
            <Path d="M13 3V5" />
        </SvgBase>
    ),
    // Banheiro (Chuveiro)
    Bathroom: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M12 4V8" />
            <Path d="M12 4C14.2091 4 16 5.79086 16 8H8C8 5.79086 9.79086 4 12 4Z" />
            <Path d="M8 12V14" />
            <Path d="M12 12V16" />
            <Path d="M16 12V14" />
            <Path d="M6 10H18" />
        </SvgBase>
    ),
    // Quarto do Bebê (Berço)
    BabyCrib: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M3 5V21" />
            <Path d="M21 5V21" />
            <Path d="M3 17H21" />
            <Path d="M3 10H21" />
            <Path d="M8 10V17" />
            <Path d="M12 10V17" />
            <Path d="M16 10V17" />
            <Circle cx="12" cy="7" r="2" />
        </SvgBase>
    ),
    // Quarto do Idoso (Bengala)
    Elder: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M14 20L11 9" />
            <Path d="M11 9C10.5 7 11 5 13 4C15 3 17 4 17 6V7" />
            <Path d="M5 20L19 20" />
        </SvgBase>
    ),
    // Escadas
    Stairs: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M4 20H9V15H14V10H19V5" />
            <Path d="M4 20L19 5" strokeDasharray="2 2" />
        </SvgBase>
    ),
    // Lavanderia / Máquina de Lavar
    WashingMachine: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Rect x="5" y="3" width="14" height="18" rx="3" />
            <Circle cx="12" cy="13" r="4" />
            <Line x1="12" y1="13" x2="12" y2="13.01" />
            <Path d="M8 6H10" />
            <Path d="M14 6H16" />
        </SvgBase>
    ),
    // Área Externa / Jardim (Árvore)
    Tree: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M12 21V11" />
            <Path d="M12 15C9 15 8 12 8 12" />
            <Path d="M12 13C15 13 16 10 16 10" />
            <Path d="M12 3C7.5 3 5 6.5 7 10C5 11.5 6 15 12 15C18 15 19 11.5 17 10C19 6.5 16.5 3 12 3Z" />
        </SvgBase>
    ),
    // Piscina (Ondas e Escada)
    Pool: ({ size, color }) => (
        <SvgBase size={size} color={color}>
            <Path d="M3 15C5 15 6 13 8 13C10 13 11 15 13 15C15 15 16 13 18 13C20 13 21 15 21 15" />
            <Path d="M3 19C5 19 6 17 8 17C10 17 11 19 13 19C15 19 16 17 18 17C20 17 21 19 21 19" />
            <Path d="M6 5V13" />
            <Path d="M10 5V13" />
            <Path d="M6 7H10" />
            <Path d="M6 10H10" />
        </SvgBase>
    ),
    // Compartilhamento (Nós conectados)
    ShareNetwork: ({ size, color }) => (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path d="M6.40991 15.91C4.24991 15.91 2.5 14.16 2.5 12C2.5 9.83997 4.24991 8.08997 6.40991 8.08997C8.56991 8.08997 10.3201 9.83997 10.3201 12C10.3201 14.16 8.56991 15.91 6.40991 15.91ZM6.40991 9.58997C5.07991 9.58997 4 10.67 4 12C4 13.33 5.07991 14.41 6.40991 14.41C7.73991 14.41 8.82007 13.33 8.82007 12C8.82007 10.67 7.73991 9.58997 6.40991 9.58997Z" fill={color} />
            <Path d="M17.5898 9.07001C15.4298 9.07001 13.6797 7.32 13.6797 5.16C13.6797 3 15.4298 1.25 17.5898 1.25C19.7498 1.25 21.4998 3 21.4998 5.16C21.4998 7.32 19.7498 9.07001 17.5898 9.07001ZM17.5898 2.75C16.2598 2.75 15.1797 3.83 15.1797 5.16C15.1797 6.49 16.2598 7.57001 17.5898 7.57001C18.9198 7.57001 19.9998 6.49 19.9998 5.16C19.9998 3.83 18.9198 2.75 17.5898 2.75Z" fill={color} />
            <Path d="M17.5898 22.75C15.4298 22.75 13.6797 21 13.6797 18.84C13.6797 16.68 15.4298 14.93 17.5898 14.93C19.7498 14.93 21.4998 16.68 21.4998 18.84C21.4998 21 19.7498 22.75 17.5898 22.75ZM17.5898 16.43C16.2598 16.43 15.1797 17.51 15.1797 18.84C15.1797 20.17 16.2598 21.25 17.5898 21.25C18.9198 21.25 19.9998 20.17 19.9998 18.84C19.9998 17.51 18.9198 16.43 17.5898 16.43Z" fill={color} />
            <Path d="M9.10007 11.09C8.85007 11.09 8.59994 10.96 8.45994 10.73C8.23994 10.38 8.35994 9.92 8.70994 9.7L14.5 6.16001C14.85 5.94001 15.32 6.06001 15.53 6.41001C15.75 6.76001 15.63 7.22001 15.28 7.44001L9.48997 10.98C9.36997 11.05 9.23007 11.09 9.10007 11.09Z" fill={color} />
            <Path d="M14.8898 17.95C14.7598 17.95 14.6199 17.91 14.4999 17.84L8.70989 14.3C8.35989 14.08 8.24989 13.62 8.45989 13.27C8.66989 12.92 9.12992 12.8 9.48992 13.02L15.28 16.56C15.63 16.78 15.74 17.24 15.53 17.59C15.39 17.83 15.1398 17.95 14.8898 17.95Z" fill={color} />
        </Svg>
    )
};

export default function NeoIcon({
    name,
    size = 24,
    color = '#000000',
    variant = 'Linear', // Linear, Bold, Broken, Bulk, TwoTone
    style
}) {
    // Check if it's a Custom SVG map
    if (CustomIcons[name]) {
        const CustomIconComponent = CustomIcons[name];
        return (
            <View style={style}>
                <CustomIconComponent size={size} color={color} />
            </View>
        );
    }

    // Otherwise, check Iconsax
    const IconsaxComponent = Iconsax[name];

    if (IconsaxComponent) {
        return (
            <View style={style}>
                <IconsaxComponent size={size} color={color} variant={variant} />
            </View>
        );
    }

    // Default Fallback
    const DefaultFallback = Iconsax.Danger;
    return (
        <View style={style}>
            <DefaultFallback size={size} color={color} variant={variant} />
        </View>
    );
}
