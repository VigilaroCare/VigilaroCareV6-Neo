import { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    children,
    plainImage = false, // true p/ assets ja estilizados (ex: pictograma ceramico) — pula tint/vinheta do ReviewImage (pensado pra harmonizar fotos de origens diferentes) e usa contain em vez de cover, pra nao cortar a moldura do pictograma
    centerText = false, // true agrupa titulo+descricao centralizados (vertical e horizontalmente) em vez do padrao titulo-em-cima/descricao-embaixo
}) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    
    // Quando exibe pictograma cerâmico (plainImage), o fundo usa o mesmo
    // creme da moldura do tile (#F4EBDC) para fundir card e pictograma.
    // Para fotos e ícones, mantém o fundo glass/branco padrão.
    const cardBg = plainImage
        ? Neo.colors.tile.cream
        : isDark ? themeColors.neutral[200] : '#FFFFFF';

    // Superfície creme não acompanha o tema, então a tinta dela também não
    // pode acompanhar: o ink do modo escuro mede 1,06:1 sobre o creme.
    const textPrimary = plainImage ? Neo.colors.textOn.ink : themeColors.neutral[900];
    const textBody = plainImage ? Neo.colors.textOn.muted : themeColors.neutral[700];
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
                    {/* Container Esquerdo */}
                    <View style={[styles.imageContainer, plainImage ? styles.imageContainerPlain : { backgroundColor: color + '18' }]}>
                        {showImage ? (
                            plainImage ? (
                                <Image
                                    source={typeof imageUrl === 'number' ? imageUrl : { uri: imageUrl }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                    accessibilityLabel={title}
                                    onError={handleImgError}
                                />
                            ) : (
                                <ReviewImage
                                    source={typeof imageUrl === 'number' ? imageUrl : { uri: imageUrl }}
                                    tint={color}
                                    tintOpacity={0.10}
                                    accessibilityLabel={title}
                                    onError={handleImgError}
                                />
                            )
                        ) : iconName ? (
                            <NeoIcon name={iconName} size={40} color={color} variant="Bold" />
                        ) : emoji ? (
                            <Text style={{ fontSize: 40 }}>{emoji}</Text>
                        ) : (
                            <NeoIcon name="Book" size={40} color={color} variant="Bold" />
                        )}
                    </View>

                    {/* Container Direito (Textos) */}
                    <View style={[styles.textCol, centerText && styles.textColCentered]}>
                        <Text
                            style={[styles.cardTitle, { color: textPrimary }, centerText && styles.textCentered]}
                            numberOfLines={2}
                        >
                            {title}
                        </Text>
                        {centerText ? null : <View style={{ flex: 1 }} />}
                        {description ? (
                            <Text
                                style={[styles.cardDesc, { color: textBody }, centerText && styles.textCentered]}
                                numberOfLines={3}
                            >
                                {description}
                            </Text>
                        ) : null}
                        {children}
                    </View>

                    {/* Chevron Direita */}
                    <View style={styles.chevron}>
                        <NeoIcon name="ArrowRight2" size={16} color={plainImage ? Neo.colors.textOn.muted : themeColors.neutral[400]} />
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
    imageContainerPlain: {
        width: 160, // 120 height * (4/3 aspect ratio) to perfectly fit the ceramic tile
        backgroundColor: 'transparent',
    },
    textCol: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    textColCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCentered: {
        textAlign: 'center',
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
