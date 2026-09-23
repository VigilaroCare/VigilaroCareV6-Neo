import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, LayoutAnimation, Platform, UIManager } from 'react-native';
import { H3, Body, Small } from '../../components/NeoTypography';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { Colors, Spacing, Shadows, BorderRadius } from '../../utils/Theme';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import ReviewImage from '../../components/ReviewImage';
import { FERRAMENTAS_DATA } from '../../data/ferramentas_seguranca';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function FerramentasTrabalhoScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : themeColors.neutral.white;
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSection(expandedSection === id ? null : id);
    };

    const { goldenRules, categories } = FERRAMENTAS_DATA;

    return (
        <AppBackground>
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: isDark ? 'rgba(28,28,30,0.4)' : 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)' }}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16 }}>
                        <H3 style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('headersFirst.toolsAndRepairs', 'Ferramentas & Reparos')}</H3>
                        <Small style={{ color: textMuted }}>{t('headersFirst.safetyAndMaintenance', 'Segurança e Manutenção.')}</Small>
                    </View>
                </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Regras de Ouro */}
                <View style={styles.goldenRulesCard}>
                    <View style={styles.goldenHeader}>
                        <NeoIcon name="Star1" size={24} color={Neo.colors.feedback.warning} variant="Bold" />
                        <H3 style={styles.goldenTitle}>{t('headersFirst.regrasDeOuro', 'Regras de Ouro')}</H3>
                    </View>
                    {goldenRules.map((rule) => (
                        <View key={rule.id} style={styles.ruleItem}>
                            <Text style={styles.ruleNumber}>{rule.id}</Text>
                            <View style={{ flex: 1 }}>
                                <Body style={styles.ruleTitle}>{rule.title}</Body>
                                <Small style={styles.ruleText}>{rule.text}</Small>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Categorias - Estilo Nível 2 */}
                {categories.map((category) => (
                    <View key={category.id} style={styles.categoryContainer}>
                        <TouchableOpacity
                            onPress={() => toggleSection(category.id)}
                            activeOpacity={0.9}
                        >
                            <View style={styles.guideCardOuter}>
                                <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                    <View style={[styles.guideImageContainer, { backgroundColor: category.color + '15' }]}>
                                        {category.imagemUrl ? (
                                            <ReviewImage
                                                source={typeof category.imagemUrl === 'string' ? (typeof category.imagemUrl === 'string' ? { uri: category.imagemUrl } : category.imagemUrl) : category.imagemUrl}
                                                tint={category.color}
                                                accessibilityLabel={category.title}
                                            />
                                        ) : (
                                            <NeoIcon name={category.icon} size={48} color={category.color} variant="Bold" />
                                        )}
                                    </View>
                                    <View style={styles.guideContent}>
                                        <View style={{ flex: 1, paddingRight: 8 }}>
                                            <Body style={styles.guideTitle}>{category.title}</Body>
                                            <Small style={styles.guideSubtitle}>{category.subtitle}</Small>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <NeoIcon
                                                name={expandedSection === category.id ? "ArrowUp2" : "ArrowDown2"}
                                                size={20}
                                                color={Neo.colors.neutral[400]}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {expandedSection === category.id && (
                            <View style={styles.itemsList}>
                                {category.items.map((item, index) => (
                                    <View key={index} style={styles.toolCard}>
                                        <View style={styles.toolHeader}>
                                            <Body style={styles.toolName}>{item.name}</Body>
                                            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', alignItems: 'center', justifyContent: 'center' }}>
                                                <NeoIcon name="InfoCircle" size={20} color="#D32F2F" variant="Bold" />
                                            </View>
                                        </View>

                                        <View style={styles.toolDetail}>
                                            <Small style={styles.label}>{t('headersFirst.risco', 'Risco:')}</Small>
                                            <Body style={styles.value}>{item.risk}</Body>
                                        </View>

                                        <View style={styles.toolDetail}>
                                            <Small style={styles.label}>{t('headersFirst.ePIs', 'EPIs:')}</Small>
                                            <Body style={styles.value}>{item.epi}</Body>
                                        </View>

                                        {item.care && (
                                            <View style={[styles.toolDetail, { borderLeftColor: Neo.colors.feedback.success }]}>
                                                <Small style={styles.label}>{t('headersFirst.cuidado', 'Cuidado:')}</Small>
                                                <Body style={styles.value}>{item.care}</Body>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        paddingTop: 60,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        ...Shadows.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Neo.colors.neutral.white,
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    content: {
        padding: 16,
        paddingBottom: 120,
    },
    goldenRulesCard: {
        backgroundColor: '#263238',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        ...Shadows.md,
    },
    goldenHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 12,
    },
    goldenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Neo.colors.feedback.warning,
        marginLeft: 8,
    },
    ruleItem: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    ruleNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Neo.colors.feedback.warning,
        color: Neo.colors.neutral.black,
        textAlign: 'center',
        lineHeight: 24,
        fontWeight: 'bold',
        marginRight: 12,
        fontSize: 14,
    },
    ruleTitle: {
        color: Neo.colors.neutral.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    ruleText: {
        color: Neo.colors.neutral[400],
        fontSize: 14,
        lineHeight: 20,
    },
    categoryContainer: {
        marginBottom: 16,
    },
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    guideTitle: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans_700Bold',
        fontWeight: '700',
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 13,
        fontFamily: 'PlusJakartaSans_500Medium',
        fontStyle: 'italic',
    },
    itemsList: {
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginTop: -16,
        paddingTop: 24,
        zIndex: -1
    },
    toolCard: {
        backgroundColor: Neo.colors.neutral.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
    },
    toolHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    toolName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    toolDetail: {
        marginBottom: 8,
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: Neo.colors.neutral[300],
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        lineHeight: 20,
    },
});


