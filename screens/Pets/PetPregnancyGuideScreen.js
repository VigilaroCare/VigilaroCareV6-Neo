/**
 * PetPregnancyGuideScreen.js
 * Guia Educativo sobre Prenhez e Ninhadas de Pets
 */

import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { PET_PREGNANCY_DATA } from '../../data/pet_pregnancy_data';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function PetPregnancyGuideScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const petHero = route?.params?.petHero;
    const sections = PET_PREGNANCY_DATA.sections;
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[800];

    const surface = isDark ? themeColors.neutral[100] : themeColors.neutral.white;

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);

    const title = t('petPregnancy.title', 'Prenhez e ninhadas');
    const subtitle = t('petPregnancy.subtitle', 'Guia para mamãe e filhotes');
    const cor = petHero?.cor || '#E91E63';

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button (fixo no topo da tela) */}
            <SafeAreaView edges={['top']} style={s.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={s.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color={themeColors.neutral.white} />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 240 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: cor,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    {petHero && (
                        <ReviewImage
                            source={petHero.imagemUrl ? (typeof petHero.imagemUrl === 'string' ? { uri: petHero.imagemUrl } : petHero.imagemUrl) : petHero.imagem}
                            style={StyleSheet.absoluteFill}
                            resizeMode={petHero.resizeMode || 'cover'}
                        />
                    )}

                    {/* Gradient para legibilidade do título e fusão com o fundo */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', surface]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: themeColors.neutral.white,
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.9)',
                            marginTop: 6,
                            fontWeight: '600'
                        }}>
                            {subtitle}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[s.content, { marginTop: 20 }]}>
                    {/* Alerta */}
                    <NeoCard variant="elevated" style={s.alertCard}>
                        <View style={s.alertHeader}>
                            <NeoIcon name="InfoCircle" size={18} color={Neo.colors.secondary[500]} variant="Bold" />
                            <Text style={s.alertTitle}>
                                {t('petPregnancy.importantTitle', 'Importante')}
                            </Text>
                        </View>
                        <Text style={s.alertText}>
                            {t('petPregnancy.importantText', 'Este guia é informativo. Sempre consulte um veterinário para acompanhamento da gestação e parto.')}
                        </Text>
                    </NeoCard>

                    {/* Seções */}
                    {sections.map((section) => (
                        <NeoCard variant="elevated" key={section.id} style={s.sectionCard}>
                            <View style={s.sectionHeader}>
                                <View style={[s.iconBox, { backgroundColor: section.color + '20' }]}>
                                    <NeoIcon name={section.icon} size={20} color={section.color} variant="Bold" />
                                </View>
                                <Text style={[s.sectionTitle, { color: textPrimary }]} accessibilityRole="header">{t_field(section, 'title')}</Text>
                            </View>

                            <View style={s.itemsList}>
                                {section.items.map((item, index) => (
                                    <View key={index} style={s.item}>
                                        <View style={[s.bullet, { backgroundColor: section.color }]} />
                                        <Text style={[s.itemText, { color: textBody }]}>{t_field(item, 'text')}</Text>
                                    </View>
                                ))}
                            </View>
                        </NeoCard>
                    ))}

                    {/* Dica Final */}
                    <NeoCard variant="elevated" style={s.tipCard}>
                        <View style={s.tipHeader}>
                            <NeoIcon name="Lamp" size={18} color="#FF9800" variant="Bold" />
                            <Text style={s.tipTitle}>
                                {t('petPregnancy.tipTitle', 'Dica importante')}
                            </Text>
                        </View>
                        <Text style={s.tipText}>
                            {t('petPregnancy.tipText', 'A castração é a forma mais eficaz de prevenir gestações indesejadas e contribui para a saúde do pet. Converse com seu veterinário sobre o melhor momento.')}
                        </Text>
                    </NeoCard>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },

    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },

    alertCard: {
        padding: 14,
        marginBottom: 14,
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.secondary[500], // was #2196F3
        borderRadius: 14,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    alertTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Neo.colors.secondary[500], // was #1565C0
    },
    alertText: {
        fontSize: 13,
        color: Neo.colors.neutral[800],
        lineHeight: 19,
    },

    sectionCard: {
        padding: 14,
        marginBottom: 12,
        borderRadius: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    iconBox: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        flex: 1,
        letterSpacing: -0.2,
    },
    itemsList: { gap: 10 },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 7,
    },
    itemText: {
        flex: 1,
        fontSize: 13.5,
        color: Neo.colors.neutral[800],
        lineHeight: 19,
    },

    tipCard: {
        padding: 14,
        backgroundColor: '#FFF8E1',
        borderLeftWidth: 3,
        borderLeftColor: '#FF9800',
        borderRadius: 14,
        marginTop: 4,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    tipTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Neo.colors.accent.copper, // was #E65100
    },
    tipText: {
        fontSize: 13,
        color: Neo.colors.neutral[800],
        lineHeight: 19,
    },
});
