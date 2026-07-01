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
import { SAFETY_GAS } from '../data/safety_gas';
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
    'vazamento_gas': SAFETY_GAS,
};

export default function GenericCategoryScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { categoryId, heroImage } = route.params;
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
        'escola_segura': require('../assets/illustrations/pad/encontradas_brinquedos-seguros-escola.webp'),
        'ferias_seguras': require('../assets/illustrations/pad/ambientes-casa_area-externa-praia_005.jpg'),
        'gestante_segura': 'https://images.pexels.com/photos/7055934/pexels-photo-7055934.jpeg?auto=compress&cs=tinysrgb&w=1200',
        'mobilidade_reduzida': require('../assets/illustrations/pad/encontradas_mobilidade-barra-apoio.webp'),
        'brinquedos': require('../assets/illustrations/pad/criancas-bebes_brinquedos-cuidados-ao-escolher-2_029.jpg'),
        'fire_prevention': require('../assets/illustrations/pad/queimaduras-fogo_incendio-chamas_007.jpg'),
        'condominio_seguranca': require('../assets/illustrations/pad/encontradas_redes-protecao-condominio.webp'),
        'pets': require('../assets/illustrations/pad/fotos-stock-genericas_crianca-cachorrinho_030.jpg'),
        'faixa_etaria': require('../assets/illustrations/pad/pessoas-lifestyle_photo-of-family-having-fun-3820210_010.jpg'),
    };

    const finalImageUrl = heroImage || content.imagemUrl || categoryImages[categoryId];
    const showImage = !!finalImageUrl;

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

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Float Header / Back Button */}
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
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* HERO com parallax */}
                {showImage ? (
                    <Animated.View style={{
                        width: '100%',
                        height: HERO_HEIGHT,
                        backgroundColor: isDark ? '#1C1C1E' : '#E5E5EA',
                        overflow: 'hidden',
                        transform: heroTransform,
                    }}>
                        <ReviewImage
                            source={typeof finalImageUrl === 'number' ? finalImageUrl : { uri: finalImageUrl }}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                            accessibilityLabel={t_field(content, 'title')}
                        />
                        <LinearGradient
                            colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', isDark ? '#000' : '#F6F6F6']}
                            locations={[0, 0.35, 0.85, 1]}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={{
                            position: 'absolute',
                            bottom: 24,
                            paddingHorizontal: 24,
                            width: '100%',
                        }}>
                            <H1 style={{ color: '#FFF', marginBottom: 4 }}>
                                {t_field(content, 'title')}
                            </H1>
                            <Caption style={{ color: 'rgba(255,255,255,0.9)' }}>
                                {t_field(content, 'subtitle')}
                            </Caption>
                        </View>
                    </Animated.View>
                ) : (
                    <View style={{ marginTop: 100, paddingHorizontal: 24 }}>
                        <H1 style={{ color: textPrimary, marginBottom: 4 }}>
                            {t_field(content, 'title')}
                        </H1>
                        <Caption style={{ color: textBody }}>
                            {t_field(content, 'subtitle')}
                        </Caption>
                    </View>
                )}

                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
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
                </Animated.ScrollView>
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
