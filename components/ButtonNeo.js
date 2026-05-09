import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

/**
 * ButtonNeo
 * Componente de botão padronizado para o Design System Neo.
 * Suporta ícones, diferentes tipos e feedback tátil.
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
    const isPrimary = type === 'primary';
    const { isLeftHanded } = useLeftHandedStyle();
    
    // Resolve icon alignment: if left-handed and not explicitly set differently, mirror standard behavior
    const resolvedAlign = isLeftHanded && iconAlign === 'right' ? 'left' : iconAlign;
    
    return (
        <TouchableOpacity 
            onPress={onPress} 
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[
                styles.button,
                isPrimary ? styles.primaryButton : styles.secondaryButton,
                disabled && styles.disabledButton,
                style
            ]}
        >
            <View style={styles.content}>
                {iconName && resolvedAlign === 'left' && (
                    <NeoIcon 
                        name={iconName} 
                        size={20} 
                        color={isPrimary ? '#FFF' : Neo.colors.primary[600]} 
                        style={{ marginRight: 8 }} 
                    />
                )}
                
                <Text style={[
                    styles.text,
                    isPrimary ? styles.primaryText : styles.secondaryText,
                    textStyle
                ]}>
                    {loading ? 'Carregando...' : title}
                </Text>

                {iconName && resolvedAlign === 'right' && (
                    <NeoIcon 
                        name={iconName} 
                        size={20} 
                        color={isPrimary ? '#FFF' : Neo.colors.primary[600]} 
                        style={{ marginLeft: 8 }} 
                    />
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
    },
    primaryButton: {
        backgroundColor: Neo.colors.primary[500],
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Neo.colors.primary[500],
    },
    disabledButton: {
        backgroundColor: Neo.colors.neutral[300],
        borderColor: Neo.colors.neutral[300],
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    primaryText: {
        color: '#FFF',
    },
    secondaryText: {
        color: Neo.colors.primary[600],
    },
});
