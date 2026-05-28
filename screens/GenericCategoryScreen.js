import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Shadows } from '../utils/Theme';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

// Import Data
import { SAFETY_SCHOOL } from '../data/safety_school';
import { SAFETY_VACATION } from '../data/safety_vacation';
import { SAFETY_PREGNANT } from '../data/safety_pregnant';
import { SAFETY_MOBILITY } from '../data/safety_mobility';
import { SAFETY_TOYS } from '../data/safety_toys';
import { SAFETY_FIRE } from '../data/safety_fire';
import { SAFETY_CONDO } from '../data/safety_condo';
import { getArticlesByCategory } from '../data/SafetyArticlesDB';

// Mapping ID -> Data
const DATA_MAP = {
    'escola_segura': SAFETY_SCHOOL,
    'ferias_seguras': SAFETY_VACATION,
    'gestante_segura': SAFETY_PREGNANT,
    'mobilidade_reduzida': SAFETY_MOBILITY,
    'brinquedos': SAFETY_TOYS,
    'fire_prevention': SAFETY_FIRE,
    'condominio_seguranca': SAFETY_CONDO,
};

export default function GenericCategoryScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { categoryId } = route.params;
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    // Fallback content if ID not found
    const content = DATA_MAP[categoryId] || {
        title: 'Categoria Desconhecida',
        subtitle: 'Informações não disponíveis',
        color: '#9CA3AF',
        sections: []
    };


    // Fetch Articles from SafetyDB
    const safetyArticles = getArticlesByCategory(categoryId);

    const THEME_COLOR = content.color || '#3B82F6';

    return (
        <AppBackground>
        <View style={[styles.container, { backgroundColor: 'transparent' }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor="transparent" />

            {/* Header Neo Glass - Tactical Calm */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: isDark ? 'rgba(28,28,30,0.4)' : 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)' }}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color={textBody} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
                <NeoCard variant="glass"
                    style={{
                        width: '100%',
                        padding: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        ...Neo.shadows?.sm
                    }}
                >
                    <View style={{
                        width: 48, height: 48, borderRadius: 12,
                        backgroundColor: THEME_COLOR + '20', alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}>
                        <Text style={{ fontSize: 24 }}>{content.emoji || '📚'}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: THEME_COLOR, fontSize: 16, marginBottom: 2, fontWeight: 'bold' }} accessibilityRole="header">{content.title}</Text>
                        <Text style={{ color: textBody, fontSize: 13, fontWeight: '600' }}>{content.subtitle}</Text>
                    </View>
                </NeoCard>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Intro Box */}
                {content.sections && content.sections.length > 0 ? (
                    <View style={[styles.infoBox, { backgroundColor: cardBg }]}>
                        <NeoIcon name="InfoCircle" size={20} color={THEME_COLOR} variant="Bold" style={{ marginRight: 8 }} />
                        <Text style={[styles.infoText, { color: textBody }]}>
                            Explore os tópicos abaixo para garantir a segurança em {content.title.toLowerCase()}.
                        </Text>
                    </View>
                ) : (
                    <View style={[styles.infoBox, { backgroundColor: cardBg, justifyContent: 'center' }]}>
                        <Text style={[styles.infoText, { color: textBody }]}>{t('headersFirst.nenhumConteDoDisponVelNoMomento', 'Nenhum conteúdo disponível no momento.')}</Text>
                    </View>
                )}

                <View style={styles.listContainer}>
                    {content.sections && content.sections.map((section, index) => (
                        <TouchableOpacity
                            key={`sec-${index}`}
                            onPress={() => navigation.navigate('ConceitoDetail', {
                                conceito: {
                                    titulo: section.title,
                                    definicao: section.content || section.description,
                                    icon: null,
                                    emoji: section.emoji,
                                    color: THEME_COLOR,
                                    bg: THEME_COLOR + '15',
                                    exemplos: section.examples,
                                    prevencao: section.prevention
                                }
                            })}
                            activeOpacity={0.8}
                            style={{ marginBottom: 16 }}
                        >
                            <View style={styles.guideCardOuter}>
                                <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                    <View style={[styles.guideImageContainer, { backgroundColor: THEME_COLOR + '15' }]}>
                                        {section.icon ? (
                                            <NeoIcon name={section.icon} size={48} color={THEME_COLOR} variant="Bold" />
                                        ) : (
                                            <Text style={{ fontSize: 42 }}>{section.emoji || '📌'}</Text>
                                        )}
                                    </View>
                                    <View style={styles.guideContent}>
                                        <View style={{ flex: 1, paddingRight: 8 }}>
                                            <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{section.title}</Text>
                                            <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{t('headersFirst.tPicoDeSeguranA', 'Tópico de Segurança')}</Text>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                        <Text style={[styles.descText, { color: textBody }]} numberOfLines={2}>
                                            {section.content || section.description || 'Toque para saber mais.'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* ARTIGOS DO SAFETY DB */}
                    {safetyArticles.map((article, index) => (
                        <TouchableOpacity
                            key={`art-${index}`}
                            onPress={() => navigation.navigate('ConceitoDetail', {
                                conceito: {
                                    titulo: article.title,
                                    conteudo: article.content, // New field for Markdown
                                    descricao: article.summary,
                                    icon: 'book', // Default icon
                                    color: THEME_COLOR,
                                    bg: THEME_COLOR + '15',
                                    // Tags for extra info
                                    tags: article.tags
                                }
                            })}
                            activeOpacity={0.8}
                            style={{ marginBottom: 16 }}
                        >
                            <View style={styles.guideCardOuter}>
                                <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                    <View style={[styles.guideImageContainer, { backgroundColor: THEME_COLOR + '15' }]}>
                                        <NeoIcon name="Book" size={48} color={THEME_COLOR} variant="Bold" />
                                    </View>
                                    <View style={styles.guideContent}>
                                        <View style={{ flex: 1, paddingRight: 8 }}>
                                            <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{article.title}</Text>
                                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                                {article.tags && article.tags.slice(0, 1).map(tag => (
                                                    <Text key={tag} style={[styles.guideSubtitle, { color: textMuted }]}>#{tag}</Text>
                                                ))}
                                            </View>
                                        </View>
                                        <View style={{ flex: 1 }} />
                                        <Text style={[styles.descText, { color: textBody }]} numberOfLines={2}>
                                            {article.summary}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: 24,
    },
    infoBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        ...Shadows.sm,
    },
    infoText: {
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
        flex: 1
    },
    listContainer: {
        flexDirection: 'column',
    },
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120, // Padrão Nível 2
        backgroundColor: '#FFFFFF', // Sólido para evitar vazamento de sombra
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
        justifyContent: 'space-between',
    },
    guideTitle: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans_700Bold',
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 14,
        color: Neo.colors.neutral[500],
        fontFamily: 'PlusJakartaSans_500Medium',
        fontStyle: 'italic',
    },
    descText: {
        fontSize: 13,
        color: Neo.colors.neutral[600],
        fontFamily: 'PlusJakartaSans_500Medium',
        lineHeight: 18,
    }
});
