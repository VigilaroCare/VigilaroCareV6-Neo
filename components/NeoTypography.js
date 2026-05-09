import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Theme from '../utils/Theme';
import { FONTS, displayFont } from '../utils/DesignSystem2026';

import { useAccessibility } from '../context/AccessibilityContext';

/**
 * Mapeia fontWeight CSS → nome da fonte Plus Jakarta Sans carregada.
 */
const WEIGHT_MAP = {
    '400': 'regular',
    '500': 'medium',
    '600': 'semiBold',
    '700': 'bold',
    '800': 'extraBold',
    'normal': 'regular',
    'bold': 'bold',
};

export const NeoText = ({ children, style, variant = 'body', color, align = 'left', numberOfLines, ...props }) => {
    const { Neo } = Theme;
    const { fontSizeLevel = 1, highContrast = false } = useAccessibility() || {};

    // Mapeia variante para estilo definido no DS
    const variantStyle = Neo.type[variant] || Neo.type.body;
    const isDisplay = variantStyle?._display === true;

    // Scale Font Size
    const originalSize = variantStyle.fontSize || 14;
    const scaledSize = originalSize * fontSizeLevel;

    // High Contrast Override
    let finalColor = color || (variantStyle ? variantStyle.color : '#000');
    let finalWeight = (variantStyle ? variantStyle.fontWeight : 'normal');

    if (highContrast) {
        // Modo Acessível: Preto Absoluto e Negrito para máxima legibilidade em fundo claro
        finalColor = '#000000';
        finalWeight = 'bold';
    }

    // Display font: Plus Jakarta Sans (headings, botões)
    // Body font: System default (iOS SF Pro, Android Roboto)
    const fontFamily = isDisplay ? displayFont(WEIGHT_MAP[finalWeight] || 'bold') : undefined;

    const textStyle = [
        variantStyle,
        {
            fontSize: (variantStyle?.fontSize || 16) * (fontSizeLevel || 1),
            color: finalColor,
            fontWeight: fontFamily ? undefined : finalWeight, // Se tem fontFamily, o peso está no nome da fonte
            fontFamily: fontFamily,
            letterSpacing: variantStyle?.letterSpacing || 0,
        },
        { textAlign: align },
        style
    ];

    return (
        <Text style={textStyle} numberOfLines={numberOfLines} {...props}>
            {children}
        </Text>
    );
};

// Atalhos Semânticos
export const H1 = (props) => <NeoText variant="h1" {...props} />;
export const H2 = (props) => <NeoText variant="h2" {...props} />;
export const H3 = (props) => <NeoText variant="h3" {...props} />;
export const Body = (props) => <NeoText variant="body" {...props} />;
export const Small = (props) => <NeoText variant="bodySmall" {...props} />;
export const Caption = (props) => <NeoText variant="caption" {...props} />;

export default NeoText;
