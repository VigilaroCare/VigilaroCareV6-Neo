import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Theme from '../utils/Theme';
import { useIsDark, useThemeColors } from '../utils/ThemeContext';

/**
 * NeoCard - Cartão Padrão do Sistema DS2026 (Tactical Calm) — theme-aware.
 *
 * GLASSMORPHISM UNIFICADO:
 * 'elevated' e 'glass' renderizam idênticos como vidro jateado (BlurView +
 * fundo translúcido). Em dark mode, tint vira "dark" e bordas tornam-se
 * sutis baseadas em white-alpha.
 *
 * Props:
 * - variant: 'elevated'|'glass' (vidro jateado), 'outline' (borda), 'flat' (cinza), 'primary'
 * - padding: number (default: md)
 * - onPress: function (se fornecido, torna-se tocável)
 */
export default function NeoCard({
    children,
    style,
    variant = 'elevated',
    padding,
    onPress,
    activeOpacity = 0.8
}) {
    const { Neo } = Theme;
    const isDark = useIsDark();
    const colors = useThemeColors();
    const spacing = padding !== undefined ? padding : Neo.spacing.md;

    // DS2026: 'elevated' agora é alias de 'glass' — vidro jateado unificado
    const isGlass = variant === 'elevated' || variant === 'glass';

    const baseStyle = {
        padding: spacing,
        borderRadius: Neo.borderRadius.md,
        backgroundColor: isGlass ? 'transparent' : (isDark ? colors.neutral[200] : '#FFFFFF'),
        overflow: isGlass ? 'hidden' : 'visible',
    };

    let variantStyle = {};

    switch (variant) {
        case 'elevated':
        case 'glass':
            // Glassmorphism — bordas de luz em light, bordas sutis brancas em dark
            variantStyle = isDark ? {
                backgroundColor: 'rgba(28, 28, 30, 0.55)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.10)',
                borderTopColor: 'rgba(255, 255, 255, 0.18)',
                borderLeftColor: 'rgba(255, 255, 255, 0.14)',
                borderTopWidth: 1.5,
                borderLeftWidth: 1.2,
                elevation: 0,
            } : {
                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                borderTopColor: 'rgba(255, 255, 255, 0.9)',
                borderLeftColor: 'rgba(255, 255, 255, 0.7)',
                borderTopWidth: 1.5,
                borderLeftWidth: 1.2,
                elevation: 0,
            };
            break;
        case 'outline':
            variantStyle = {
                borderWidth: 1,
                borderColor: colors.neutral[300],
                backgroundColor: 'transparent',
            };
            break;
        case 'flat':
            variantStyle = {
                backgroundColor: isDark ? 'rgba(44, 44, 46, 0.85)' : 'rgba(240, 242, 245, 0.8)',
                borderWidth: 0,
                elevation: 0,
            };
            break;
        case 'primary':
            variantStyle = {
                backgroundColor: colors.primary[500],
                elevation: 0,
            };
            break;
    }

    // Merge styles
    const flatStyle = StyleSheet.flatten([baseStyle, variantStyle, style]) || {};

    // Separate LAYOUT styles (for outer wrapper) from VISUAL styles (for inner content)
    const {
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical,
        flex, flexGrow, flexShrink, flexBasis, alignSelf,
        ...visualStyle
    } = flatStyle;

    const layoutStyle = {
        width, height, minWidth, minHeight, maxWidth, maxHeight,
        margin, marginTop, marginBottom, marginLeft, marginRight, marginHorizontal, marginVertical,
        flex, flexGrow, flexShrink, flexBasis, alignSelf,
    };

    // Remove undefined keys
    Object.keys(layoutStyle).forEach(k => layoutStyle[k] === undefined && delete layoutStyle[k]);

    // Glass rendering via BlurView (covers both 'elevated' and 'glass')
    if (isGlass) {
        if (onPress) {
            const blurStyle = [visualStyle];
            if (layoutStyle.height) {
                blurStyle.push({ height: '100%' });
            }

            return (
                <TouchableOpacity style={layoutStyle} onPress={onPress} activeOpacity={activeOpacity}>
                    <BlurView intensity={45} tint={isDark ? 'dark' : 'light'} style={blurStyle}>
                        {children}
                    </BlurView>
                </TouchableOpacity>
            );
        }

        return (
            <BlurView intensity={45} tint={isDark ? 'dark' : 'light'} style={flatStyle}>
                {children}
            </BlurView>
        );
    }

    // Non-glass variants (outline, flat, primary)
    const finalStyle = [baseStyle, variantStyle, style];

    if (onPress) {
        return (
            <TouchableOpacity
                style={finalStyle}
                onPress={onPress}
                activeOpacity={activeOpacity}
            >
                {children}
            </TouchableOpacity>
        );
    }

    return (
        <View style={finalStyle}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({});
