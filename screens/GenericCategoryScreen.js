import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoHorizontalCard from '../components/NeoHorizontalCard';
import ReviewImage from '../components/ReviewImage';
import { H1, Caption } from '../components/NeoTypography';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import { t_field } from '../utils/getLocalizedField';

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
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    // Fallback content if ID not found
    const content = DATA_MAP[categoryId] || {
        title: categoryId === 'pets' ? t('knowledgeHub.protectPet', 'Proteja seu Pet') : 
               categoryId === 'faixa_etaria' ? t('knowledgeHub.ageGroup', 'Cuidado por Faixa Etária') : 'Categoria Desconhecida',
        subtitle: t('common.explore', 'Explore os conteúdos'),
        color: categoryId === 'pets' ? '#EAB308' : categoryId === 'faixa_etaria' ? '#EC4899' : '#9CA3AF',
        sections: []
    };

    const safetyArticles = getArticlesByCategory(categoryId);
    const THEME_COLOR = content.color || '#3B82F6';

    const renderSectionCard = (section, index) => {
        return (
            <NeoHorizontalCard
                key={`sec-${index}`}
                title={t_field(section, 'title')}
                description={t_field(section, 'content') || t_field(section, 'description') || 'Toque para saber mais.'}
                imageUrl={section.imagemUrl}
                iconName={section.icon}
                emoji={section.emoji}
                color={THEME_COLOR}
                imageUrl={section.imagemUrl}
                onPress={() => navigation.navigate('PremiumArticle', {
                    conceito: {
                        titulo: t_field(section, 'title'),
                        conteudo: t_field(section, 'content') || t_field(section, 'description'),
                        imagemUrl: section.imagemUrl,
                        icon: section.icon,
                        emoji: section.emoji,
                        color: THEME_COLOR,
                        exemplos: section.examples,
                        prevencao: section.prevention,
                        tags: [t_field(content, 'title')]
                    }
                })}
            />
        );
    };

    const renderArticleCard = (article, index) => {
        return (
            <NeoHorizontalCard
                key={`art-${index}`}
                title={t_field(article, 'title')}
                description={t_field(article, 'summary')}
                iconName="Book"
                color={THEME_COLOR}
                onPress={() => navigation.navigate('PremiumArticle', {
                    conceito: {
                        titulo: t_field(article, 'title'),
                        conteudo: t_field(article, 'content'),
                        descricao: t_field(article, 'summary'),
                        icon: 'Book',
                        color: THEME_COLOR,
                        tags: article.tags
                    }
                })}
            />
        );
    };

    // Hero transform removido pois a tela passa a ser flat

    const categoryImages = {
        'escola_segura': 'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'ferias_seguras': 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-landscape.jpg?auto=compress&cs=tinysrgb&w=1200',
        'gestante_segura': 'https://images.pexels.com/photos/7055934/pexels-photo-7055934.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'mobilidade_reduzida': 'https://images.pexels.com/photos/4064303/pexels-photo-4064303.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'brinquedos': 'https://images.pexels.com/photos/3661353/pexels-photo-3661353.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'fire_prevention': 'https://images.pexels.com/photos/279979/pexels-photo-279979.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'condominio_seguranca': 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'pets': 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'faixa_etaria': 'https://images.pexels.com/photos/1682497/pexels-photo-1682497.jpeg?auto=compress&cs=tinysrgb&w=1200',
    };

    const finalImageUrl = content.imagemUrl || categoryImages[categoryId];
    const showImage = !!finalImageUrl;

    return (
        <AppBackground>
            <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: isDark ? '#000' : '#F6F6F6' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} translucent={false} />

                {/* Header Simples (Sem Parallax) */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingTop: 10, paddingBottom: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtnFlat}
                        accessibilityRole="button"
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color={textPrimary} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <H1 style={[styles.titleFlat, { color: textPrimary }]} numberOfLines={1}>
                            {t_field(content, 'title')}
                        </H1>
                        <Caption style={[styles.subtitleFlat, { color: textBody, marginTop: 2 }]} numberOfLines={1}>
                            {t_field(content, 'subtitle')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
                >
                    {/* Imagem em banner arredondado flat */}
                    {showImage && (
                        <View style={{ width: '100%', height: 180, borderRadius: 24, overflow: 'hidden', marginBottom: 24 }}>
                            <ReviewImage
                                source={{ uri: finalImageUrl }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    <View style={{ marginTop: 24 }}>
                        {content.sections && content.sections.length > 0 ? (
                            content.sections.map((sec, idx) => renderSectionCard(sec, idx))
                        ) : null}

                        {safetyArticles && safetyArticles.length > 0 && (
                            <View style={{ marginTop: content.sections && content.sections.length > 0 ? 12 : 0 }}>
                                {safetyArticles.map((art, idx) => renderArticleCard(art, idx))}
                            </View>
                        )}

                        {(!content.sections || content.sections.length === 0) && (!safetyArticles || safetyArticles.length === 0) && (
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <Text style={{ color: textBody }}>{t('headersFirst.nenhumConteDoDisponVelNoMomento', 'Nenhum conteúdo disponível no momento.')}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(150,150,150,0.1)',
        alignItems: 'center', justifyContent: 'center',
    },
    titleFlat: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitleFlat: {
        fontSize: 14,
        fontWeight: '500',
    },
});
