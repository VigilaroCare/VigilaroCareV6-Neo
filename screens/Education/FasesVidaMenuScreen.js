import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import { FASES_VIDA_DATA } from '../../data/fases_vida';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import { H1, H2, H3, Body, Caption, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const { width } = Dimensions.get('window');

export default function FasesVidaMenuScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const [imageErrors, setImageErrors] = useState({});
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    // Correct order based on eBook content
    const dataKeys = [
        'baby_0_6', 'baby_7_12',
        'child_1_3', 'child_3_5', 'child_6_14',
        'teen', 'adult', 'pne', 'elder'
    ];

    const items = dataKeys.map(key => {
        const data = FASES_VIDA_DATA[key];
        if (!data) return null;

        let cardTitle = t_field(data, 'cardTitle');
        let desc = t_field(data, 'desc');

        return {
            id: key,
            cardTitle,
            desc,
            icon: data.icon,
            color: data.bg,
            iconColor: data.iconColor,
            imagemUrl: data.imagemUrl, // foto Pexels real
            data: data
        };
    }).filter(item => item !== null);

    const handlePress = (item) => {
        navigation.navigate('ConceitoDetail', {
            conceito: item.data
        });
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER padronizado (alinha com outras telas premium) */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.75)' }]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={styles.title} accessibilityRole="header">
                            {t('fasesVida.title', 'Fases da Vida')}
                        </H1>
                        <Caption style={styles.subtitle}>
                            {t('fasesVida.subtitle', 'Guia de proteção por faixa etária')}
                        </Caption>
                    </View>
                </View>

                {/* Vertical List Layout */}
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.listContainer}>
                        {items.map((item) => {
                            const IconComp = item.icon;

                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handlePress(item)}
                                    activeOpacity={0.8}
                                    style={{ marginBottom: 16 }}
                                >
                                    {/* Padrão de card alinhado com Plantas/Animais/Reviews */}
                                    <View style={styles.guideCardOuter}>
                                        <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                            <View style={[styles.guideImageContainer, { backgroundColor: item.color + '33' }]}>
                                                {item.imagemUrl && !imageErrors[item.id] ? (
                                                    <ReviewImage
                                                        source={{ uri: item.imagemUrl }}
                                                        tint={item.iconColor}
                                                        accessibilityLabel={item.cardTitle}
                                                        onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                                                    />
                                                ) : IconComp ? (
                                                    <IconComp size={48} color={item.iconColor} variant="Bold" />
                                                ) : (
                                                    <NeoIcon name="EmojiHappy" size={48} color={item.iconColor} variant="Bold" />
                                                )}
                                            </View>
                                            <View style={styles.guideContent}>
                                                <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{item.cardTitle}</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={[styles.guideDesc, { color: textBody }]} numberOfLines={3}>{item.desc}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    // Header padronizado (alinhado com outras telas Neo)
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
        fontSize: 22,
    },
    subtitle: {
        // Caption tem cor default cinza no DS — cascata aplica em dark
    },
    listContainer: {
        flexDirection: 'column',
    },
    // Card grande estilo Plantas/Animais/Reviews (imagem retangular à esquerda)
    guideCardOuter: {
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    guideDesc: {
        fontSize: 12.5,
        color: Neo.colors.neutral[600],
        lineHeight: 17,
    },
    articleCard: {
        padding: 16,
        marginBottom: 12,
    },
    articleTitle: {
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        flex: 1
    },
    articleDesc: {
        color: Neo.colors.neutral[500],
        lineHeight: 20
    },
    tag: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Neo.colors.primary[500],
        backgroundColor: Neo.colors.primary[500] + '1A',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    }
});
