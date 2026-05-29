import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import NeoIcon from './NeoIcon';
import { H3, Body } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

/**
 * EmptyState — placeholder padronizado quando uma lista/seção está vazia.
 *
 * Layout: ícone centralizado em círculo + título + descrição + CTA opcional.
 * Substitui implementações ad-hoc espalhadas pelas telas.
 *
 * @param {string} icon            Nome do NeoIcon
 * @param {string} iconVariant     'Bold' | 'Linear' | 'Outline' — default 'Bold'
 * @param {string} iconColor       Cor do ícone. Default: neutral[400]
 * @param {string} iconBgColor     Cor de fundo do círculo. Default: neutral[100]
 * @param {string} title           Título (string ou null pra omitir)
 * @param {string} description     Descrição (string ou null pra omitir)
 * @param {object} cta             { label, onPress, color? } — botão opcional
 * @param {object} style           Estilos extras no container
 * @param {number} iconSize        Tamanho do ícone. Default: 36
 */
export default function EmptyState({
    icon,
    iconVariant = 'Bold',
    iconColor,
    iconBgColor,
    title,
    description,
    cta,
    style,
    iconSize = 36,
}) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const resolvedIconColor = iconColor || (isDark ? themeColors.neutral[500] : themeColors.neutral[400]);
    const resolvedBgColor = iconBgColor || (isDark ? 'rgba(255,255,255,0.06)' : themeColors.neutral[100]);
    const titleColor = isDark ? themeColors.neutral[100] : themeColors.neutral[800];
    const descColor = isDark ? themeColors.neutral[400] : themeColors.neutral[600];

    return (
        <View style={[styles.container, style]} accessibilityRole="text">
            {icon && (
                <View style={[styles.iconCircle, { backgroundColor: resolvedBgColor }]}>
                    <NeoIcon name={icon} size={iconSize} color={resolvedIconColor} variant={iconVariant} />
                </View>
            )}
            {title ? (
                <H3 style={[styles.title, { color: titleColor }]}>{title}</H3>
            ) : null}
            {description ? (
                <Body style={[styles.description, { color: descColor }]}>{description}</Body>
            ) : null}
            {cta ? (
                <TouchableOpacity
                    onPress={cta.onPress}
                    activeOpacity={0.85}
                    style={[styles.cta, { backgroundColor: cta.color || Neo.colors.primary[500] }]}
                    accessibilityRole="button"
                    accessibilityLabel={cta.label}
                >
                    <Body style={styles.ctaLabel}>{cta.label}</Body>
                </TouchableOpacity>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: -0.2,
    },
    description: {
        fontSize: 13.5,
        lineHeight: 19,
        textAlign: 'center',
        marginTop: 6,
        maxWidth: 280,
    },
    cta: {
        marginTop: 22,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
    },
    ctaLabel: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
});
