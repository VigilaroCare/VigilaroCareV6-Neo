import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
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

export default function FasesVidaMenuScreen({ navigation, route }) {
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
        'baby_0_6', 'child_1_3',
        'teen', 'adult', 'elder'
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

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 280;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ];

    const title = t('knowledgeHub.ageCare', 'Segurança 60+');
    const { heroImage } = route?.params || {};
    const capaSource = heroImage ? (typeof heroImage === 'string' ? { uri: heroImage } : heroImage) : require('../../assets/illustrations/pad/hero_fases_vida.png');

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={title}
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }}>
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    <View style={styles.listContainer}>
                        {items.map((item) => {
                            const iconName = item.icon;

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
                                                        source={typeof item.imagemUrl === 'string' ? (typeof item.imagemUrl === 'string' ? { uri: item.imagemUrl } : item.imagemUrl) : item.imagemUrl}
                                                        tint={item.iconColor}
                                                        accessibilityLabel={item.cardTitle}
                                                        onError={() => setImageErrors(prev => ({ ...prev, [item.id]: true }))}
                                                    />
                                                ) : (
                                                    <NeoIcon name={iconName || 'EmojiHappy'} size={48} color={item.iconColor} variant="Bold" />
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

                </View>
            </Animated.ScrollView>
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
