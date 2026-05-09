import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Theme from '../utils/Theme';

/**
 * NeoCard - Cartão Padrão do Sistema 2026
 * Características: Minimalista, Fundo Branco (ou Surface), Borda Sutil.
 * Substitui o GlassCard nas interfaces novas.
 * 
 * Props:
 * - variant: 'elevated' (sombra), 'outline' (borda), 'flat' (fundo cinza)
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

    const baseStyle = {
        padding: spacing,
        borderRadius: Neo.borderRadius.md,
        backgroundColor: variant === 'glass' ? 'transparent' : '#FFFFFF', // Transparent for glass to show blur
        overflow: variant === 'glass' ? 'hidden' : 'visible', // Android crashes shadow rendering inside if overflow is hidden on elevated elements
    };

    let variantStyle = {};

    switch (variant) {
        case 'elevated':
            variantStyle = {
                ...Neo.shadows.sm, // Sombra suave
                borderWidth: 0,
            };
            break;
        case 'outline':
            variantStyle = {
                borderWidth: 1,
                borderColor: Neo.colors.neutral[200],
                backgroundColor: 'transparent',
                ...(Neo.shadows.none) // Remove sombra legacy se existir
            };
            break;
        case 'flat':
            variantStyle = {
                backgroundColor: 'rgba(240, 242, 245, 0.8)', // Fundo cinza suave
                borderWidth: 0,
                elevation: 0,
            };
            break;
        case 'primary':
            variantStyle = {
                backgroundColor: Neo.colors.primary[500],
                ...Neo.shadows.md
            }
            break;
        case 'glass':
            // Glassmorphism variant — mais denso para aumentar contraste (4K view)
            variantStyle = {
                backgroundColor: 'rgba(255, 255, 255, 0.35)', // Aumentado de 0.18 para 0.35 para garantir legibilidade dos textos
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.4)', // Borda suave geral
                borderTopColor: 'rgba(255, 255, 255, 0.9)', // Brilho "Highlighter" no topo
                borderLeftColor: 'rgba(255, 255, 255, 0.7)', // Brilho "Highlighter" na lateral
                borderTopWidth: 1.5,
                borderLeftWidth: 1.2,
                ...Neo.shadows.premium4K, // Sombra para fundo iOS
                elevation: 0, // FIX ANDROID BUG: Impede o "retângulo fantasma" em backgrounds transparentes
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

    if (variant === 'glass') {
        if (onPress) {
            // onPress: layout styles go to outer TouchableOpacity, visual styles go to BlurView
            // BlurView needs to fill the TouchableOpacity
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

        // No onPress: return BlurView directly with ALL styles (no wrapper needed)
        return (
            <BlurView intensity={45} tint="light" style={flatStyle}>
                {children}
            </BlurView>
        );
    }

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
