import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Theme from '../utils/Theme';
import { FONTS, displayFont } from '../utils/DesignSystem2026';

import { useAccessibility } from '../context/AccessibilityContext';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

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

// Mapeia cada variante do DS para a "função semântica" no tema.
// Em dark mode, o DS.type.X.color (hardcoded #1C1C1E) seria invisível,
// então essa tabela informa qual cor do tema usar como default.
const DEFAULT_COLOR_FOR_VARIANT = {
    display: 'neutral.900',
    h1: 'neutral.900',
    h2: 'neutral.900',
    h3: 'neutral.900',
    body: 'neutral.800',
    bodySmall: 'neutral.800',
    caption: 'neutral.500', // caption já era cinza em light; cinza em dark também funciona
    eyebrow: 'neutral.600', // label de seção — secundário sem ser apagado
    button: 'neutral.900',
};

function resolveThemeColor(colors, path) {
    if (!path) return null;
    const parts = path.split('.');
    let v = colors;
    for (const p of parts) {
        if (v == null) return null;
        v = v[p];
    }
    return typeof v === 'string' ? v : null;
}

export const NeoText = ({ children, style, variant = 'body', color, align = 'left', numberOfLines, ...props }) => {
    const { Neo } = Theme;
    const { fontSizeLevel = 1, highContrast = false } = useAccessibility() || {};
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    // Mapeia variante para estilo definido no DS
    const variantStyle = Neo.type[variant] || Neo.type.body;
    const isDisplay = variantStyle?._display === true;

    // Scale Font Size
    const originalSize = variantStyle.fontSize || 14;
    const scaledSize = originalSize * fontSizeLevel;

    // Cor: explicit prop > tema (se dark) > variante hardcoded do DS (se light)
    // Em dark, NUNCA usar variantStyle.color (que é #1C1C1E, invisível em dark mode).
    const themeDefault = resolveThemeColor(themeColors, DEFAULT_COLOR_FOR_VARIANT[variant]);
    let finalColor;
    if (color) {
        finalColor = color;
    } else if (isDark && themeDefault) {
        finalColor = themeDefault;
    } else {
        finalColor = variantStyle?.color || '#000';
    }
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
        style,
        // Em dark mode, quando o caller NÃO passou prop `color`, força a cor do tema
        // como override final. Isso protege contra `style={{color: Neo.colors.neutral[900]}}`
        // hardcoded no callsite (que seria invisível em dark).
        (isDark && !color && themeDefault) ? { color: themeDefault } : null,
    ];

    return (
        <Text style={textStyle} numberOfLines={numberOfLines} {...props}>
            {children}
        </Text>
    );
};

// Atalhos Semânticos
export const Display = (props) => <NeoText variant="display" {...props} />;
export const H1 = (props) => <NeoText variant="h1" {...props} />;
export const H2 = (props) => <NeoText variant="h2" {...props} />;
export const H3 = (props) => <NeoText variant="h3" {...props} />;
export const Body = (props) => <NeoText variant="body" {...props} />;
export const Small = (props) => <NeoText variant="bodySmall" {...props} />;
export const Caption = (props) => <NeoText variant="caption" {...props} />;
// Eyebrow — label premium de seção. Substitui "sectionLabel" inline.
// Visual: uppercase, tracking +1.4, peso 600, cor neutral[600].
export const Eyebrow = (props) => <NeoText variant="eyebrow" {...props} />;

export default NeoText;
