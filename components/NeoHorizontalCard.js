import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shadows } from '../utils/Theme';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from './NeoIcon';
import ReviewImage from './ReviewImage';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

/**
 * NeoHorizontalCard
 * Padrão "Gold Standard" de cards horizontais (usado em EducationEnvironments, etc).
 * Imagem/Ícone à esquerda (120x120), título e descrição à direita.
 */
export default function NeoHorizontalCard({
    title,
    description,
    imageUrl,
    iconName,
    emoji,
    color = '#FF9800',
    onPress,
    style,
    children
}) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
    const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)';

    const [imgFailed, setImgFailed] = useState(false);

    const handleImgError = useCallback(() => {
        setImgFailed(true);
    }, []);

    const showImage = !imgFailed && !!imageUrl;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[{ marginBottom: 14 }, style]}
        >
            <View style={styles.cardOuter}>
                <View style={[styles.cardInner, {
                    backgroundColor: cardBg,
                    borderColor: borderColor,
                }]}>
                    {/* Container Esquerdo (120x120) */}
                    <View style={[styles.imageContainer, { backgroundColor: color + '18' }]}>
                        {showImage ? (
                            <ReviewImage
                                source={typeof imageUrl === 'number' ? imageUrl : { uri: imageUrl }}
                                tint={color}
                                tintOpacity={0.10}
                                accessibilityLabel={title}
                                onError={handleImgError}
                            />
                        ) : iconName ? (
                            <NeoIcon name={iconName} size={40} color={color} variant="Bold" />
                        ) : emoji ? (
                            <Text style={{ fontSize: 40 }}>{emoji}</Text>
                        ) : (
                            <NeoIcon name="Book" size={40} color={color} variant="Bold" />
                        )}
                    </View>

                    {/* Container Direito (Textos) */}
                    <View style={styles.textCol}>
                        <Text style={[styles.cardTitle, { color: textPrimary }]} numberOfLines={2}>
                            {title}
                        </Text>
                        <View style={{ flex: 1 }} />
                        {description ? (
                            <Text style={[styles.cardDesc, { color: textBody }]} numberOfLines={3}>
                                {description}
                            </Text>
                        ) : null}
                        {children}
                    </View>

                    {/* Chevron Direita */}
                    <View style={styles.chevron}>
                        <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[400]} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardOuter: {
        borderRadius: 20,
        ...Shadows.sm,
    },
    cardInner: {
        flexDirection: 'row',
        height: 120,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
    },
    imageContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCol: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
        lineHeight: 20,
    },
    cardDesc: {
        fontSize: 12,
        lineHeight: 16,
    },
    chevron: {
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 12,
    },
});
