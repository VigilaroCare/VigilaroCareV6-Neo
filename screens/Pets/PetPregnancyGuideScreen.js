/**
 * PetPregnancyGuideScreen.js
 * Guia Educativo sobre Prenhez e Ninhadas de Pets
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
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

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER padronizado */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[s.backBtn, { backgroundColor: isDark ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.75)' }]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('petPregnancy.title', 'Prenhez e ninhadas')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('petPregnancy.subtitle', 'Guia para mamãe e filhotes')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    style={s.content}
                    contentContainerStyle={{ paddingBottom: 190 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Hero banner — imagem do card de origem */}
                    {petHero && (
                        <PetHeroBanner
                            image={petHero.imagem}
                            imageUrl={petHero.imagemUrl}
                            tint={petHero.cor || '#E91E63'}
                            resizeMode={petHero.resizeMode || 'cover'}
                            accessibilityLabel={petHero.titulo}
                            marginHorizontal={0}
                            marginBottom={16}
                        />
                    )}

                    {/* Alerta */}
                    <NeoCard variant="elevated" style={s.alertCard}>
                        <View style={s.alertHeader}>
                            <NeoIcon name="InfoCircle" size={18} color="#2196F3" variant="Bold" />
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
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },

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
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
    subtitle: { color: Neo.colors.neutral[600] },

    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },

    alertCard: {
        padding: 14,
        marginBottom: 14,
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 3,
        borderLeftColor: '#2196F3',
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
        color: '#1565C0',
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
        color: '#E65100',
    },
    tipText: {
        fontSize: 13,
        color: Neo.colors.neutral[800],
        lineHeight: 19,
    },
});
