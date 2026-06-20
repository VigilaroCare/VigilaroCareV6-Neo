import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors } from '../utils/ThemeContext';

/**
 * ButtonNeo
 * Componente de botão padronizado para o Design System Neo.
 * Suporta ícones, diferentes tipos, feedback tátil e estados dinâmicos (disabled, loading).
 */
export default function ButtonNeo({ 
    title, 
    onPress, 
    type = 'primary', 
    style, 
    textStyle,
    iconName, 
    iconAlign = 'right',
    disabled = false,
    loading = false
}) {
    const colors = useThemeColors();
    const isPrimary = type === 'primary';
    const isSecondary = type === 'secondary';
    const isDanger = type === 'danger';
    const isGhost = type === 'ghost';
    const { isLeftHanded } = useLeftHandedStyle();
    
    // Resolve icon alignment: if left-handed and not explicitly set differently, mirror standard behavior
    const resolvedAlign = isLeftHanded && iconAlign === 'right' ? 'left' : iconAlign;
    
    // Dynamic Styles based on active theme colors
    const getButtonStyles = () => {
        if (disabled) {
            return {
                backgroundColor: colors.neutral[300],
                borderColor: colors.neutral[300],
                borderWidth: isSecondary ? 1.5 : 0,
            };
        }
        if (isPrimary) {
            return {
                backgroundColor: colors.primary[500],
            };
        }
        if (isSecondary) {
            return {
                backgroundColor: 'transparent',
                borderWidth: 1.5,
                borderColor: colors.primary[500],
            };
        }
        if (isDanger) {
            return {
                backgroundColor: colors.feedback.error,
            };
        }
        if (isGhost) {
            return {
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
            };
        }
        return {};
    };

    const getTextColor = () => {
        if (disabled) return colors.neutral[500];
        if (isPrimary || isDanger) return '#FFFFFF';
        return colors.primary[600]; // secondary and ghost
    };

    const textColor = getTextColor();
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={disabled || loading}
            activeOpacity={isGhost ? 0.6 : 0.8}
            style={[
                styles.button,
                getButtonStyles(),
                style
            ]}
        >
            <View style={styles.content}>
                {loading ? (
                    <ActivityIndicator size="small" color={textColor} />
                ) : (
                    <>
                        {iconName && resolvedAlign === 'left' && (
                            <NeoIcon 
                                name={iconName} 
                                size={20} 
                                color={textColor} 
                                style={{ marginRight: 8 }} 
                            />
                        )}
                        
                        <Text style={[
                            styles.text,
                            { color: textColor },
                            textStyle
                        ]}>
                            {title}
                        </Text>

                        {iconName && resolvedAlign === 'right' && (
                            <NeoIcon 
                                name={iconName} 
                                size={20} 
                                color={textColor} 
                                style={{ marginLeft: 8 }} 
                            />
                        )}
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: Neo.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        ...Neo.shadows.sm,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
