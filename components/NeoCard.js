import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Theme from '../utils/Theme';

/**
 * NeoCard - Cartão Padrão do Sistema DS2026 (Tactical Calm)
 *
 * GLASSMORPHISM UNIFICADO:
 * Desde a migração DS2026, 'elevated' e 'glass' renderizam
 * identicamente como vidro jateado (BlurView + fundo translúcido).
 * Sombras e elevation foram erradicados do design system.
 *
 * Props:
 * - variant: 'elevated'|'glass' (vidro jateado), 'outline' (borda), 'flat' (cinza)
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
    const spacing = padding !== undefined ? padding : Neo.spacing.md;

    // DS2026: 'elevated' agora é alias de 'glass' — vidro jateado unificado
    const isGlass = variant === 'elevated' || variant === 'glass';

    const baseStyle = {
        padding: spacing,
        borderRadius: Neo.borderRadius.md,
        backgroundColor: isGlass ? 'transparent' : '#FFFFFF',
        overflow: isGlass ? 'hidden' : 'visible',
    };

    let variantStyle = {};

    switch (variant) {
        case 'elevated':
        case 'glass':
            // Glassmorphism unificado — vidro jateado com bordas de luz
            variantStyle = {
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
                borderColor: Neo.colors.neutral[200],
                backgroundColor: 'transparent',
            };
            break;
        case 'flat':
            variantStyle = {
                backgroundColor: 'rgba(240, 242, 245, 0.8)',
                borderWidth: 0,
                elevation: 0,
            };
            break;
        case 'primary':
            variantStyle = {
                backgroundColor: Neo.colors.primary[500],
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
                    <BlurView intensity={45} tint="light" style={blurStyle}>
                        {children}
                    </BlurView>
                </TouchableOpacity>
            );
        }

        return (
            <BlurView intensity={45} tint="light" style={flatStyle}>
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
