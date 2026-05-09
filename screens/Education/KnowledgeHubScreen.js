
/**
 * KnowledgeHubScreen.js
 * Central de Aprendizado - Biblioteca de Guias e Manuais
 * Vigilaro Care V6 (Fusion: Aprendizado + Conhecimento)
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import NeoIcon from '../../components/NeoIcon';
import { useTranslation } from 'react-i18next';

import {
    LampOn,         // Metodologia (Bulb)
    Home2,          // Ambientes
    Lovely,         // Pets
    TrendUp,        // Fases da Vida
    Woman,          // Gestante
    MagicStar,      // Brinquedos
    Building,       // Escola
    Briefcase,      // Kits
    Health,         // Plantas
    Warning2,       // Animais/Quimicos
    Flash,          // Riscos Elétricos
    Building4,      // Condomínio
    Eye,            // Acessibilidade
    Airplane,       // Viagem
    Danger,         // Incêndios / Animais / Quimicos
    ExportSquare,   // Saída/Emergência
    Tree,           // Plantas/Jardinagem
    Reserve,        // Químicos
    Setting2,       // Equipamentos
    Scissor,        // Utensílios
    Monitor,        // Dispositivos Eletrônicos
    Cpu,            // Eletrodomésticos
} from 'iconsax-react-native';

import {
    Metodologia3D,
    RiscoAmbiente,
    ProtejaPet,
    PrevencaoIncendio
} from '../../components/CustomIconsax';
import { MICRO_BLOG_ARTICLES, MICRO_BLOG_CATEGORIES } from '../../data/micro_blog';

// Artigos destaque (rotativos - pegar 5 aleatórios)
const FEATURED_ARTICLES = [...MICRO_BLOG_ARTICLES].sort(() => 0.5 - Math.random()).slice(0, 5);

// Sections are now defined inside the component to access t()

export default function KnowledgeHubScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');

    const KNOWLEDGE_SECTIONS = [
        {
            title: `🧠 ${t('knowledgeHub.essentialConcepts')}`,
            data: [
                { id: 'intro_safety', titulo: t('knowledgeHub.methodology'), descricao: '', Icon: Metodologia3D, cor: '#673AB7', bg: '#EDE7F6', route: 'IntroSafetyMenu' },
            ]
        },
        {
            title: `🏠 ${t('knowledgeHub.lifeContext')}`,
            data: [
                { id: 'ambientes', titulo: t('knowledgeHub.envPrevention'), descricao: '', Icon: Home2, cor: '#F59E0B', bg: '#FFF8E1', route: 'EducationEnvironments' },
                { id: 'pets', titulo: t('knowledgeHub.protectPet'), descricao: '', Icon: ProtejaPet, cor: '#9C27B0', bg: '#F3E5F5', route: 'PetsMenu' },
                { id: 'seguranca_idade', titulo: t('knowledgeHub.ageCare'), descricao: '', Icon: TrendUp, cor: '#2196F3', bg: '#E3F2FD', route: 'FasesVidaMenu' },
                { id: 'gestante_segura', titulo: t('knowledgeHub.pregnancyCare'), descricao: '', Icon: Woman, cor: '#E91E63', bg: '#FCE4EC', route: 'GenericCategory', params: { categoryId: 'gestante_segura' } },
                { id: 'brinquedos_hub', titulo: t('knowledgeHub.toyGuide'), descricao: '', Icon: MagicStar, cor: '#FFAB00', bg: '#FFF8E1', route: 'GenericCategory', params: { categoryId: 'brinquedos' } },
            ]
        },
        {
            title: `🛡️ ${t('knowledgeHub.safetyReviews')}`,
            data: [
                { id: 'utensilios_rev', titulo: t('knowledgeHub.kitchenUtensils'), descricao: t('knowledgeHub.risksPrev'), Icon: Scissor, cor: '#E65100', bg: '#FFF3E0', route: 'UtensiliosReviews' },
                { id: 'eletro_rev', titulo: t('knowledgeHub.homeAppliances'), descricao: t('knowledgeHub.risksPrev'), Icon: Cpu, cor: '#1565C0', bg: '#E3F2FD', route: 'EletrodomesticosReviews' },
                { id: 'disp_eletronicos', titulo: t('knowledgeHub.electronicDevices'), descricao: t('knowledgeHub.risksPrev'), Icon: Monitor, cor: '#00695C', bg: '#E0F2F1', route: 'DispositivosEletronicosReviews' },
            ]
        },
        {
            title: `🚨 ${t('knowledgeHub.emergencies')}`,
            data: [
                { id: 'fire_prev', titulo: t('knowledgeHub.firePrev'), descricao: '', Icon: PrevencaoIncendio, cor: '#D32F2F', bg: '#FFEBEE', route: 'GenericCategory', params: { categoryId: 'fire_prevention' } },
                { id: 'emergencias', titulo: t('knowledgeHub.escapePlans'), descricao: '', Icon: ExportSquare, cor: '#E91E63', bg: '#FCE4EC', route: 'PlanoIncendio' },
                { id: 'primeiros_socorros_hub', titulo: t('knowledgeHub.firstAid'), descricao: t('knowledgeHub.eduGuide'), Icon: Health, cor: '#EF4444', bg: '#FFEBEE', route: 'PrimeirosSocorros' },
                { id: 'kits_emergencia', titulo: t('knowledgeHub.kitsGuide'), descricao: t('knowledgeHub.humansPets'), Icon: Briefcase, cor: '#880E4F', bg: '#FCE4EC', route: 'GuiaKitsEmergencia' },
            ]
        },
        {
            title: `📚 ${t('knowledgeHub.practicalGuides')}`,
            data: [
                { id: 'plantas', titulo: t('knowledgeHub.toxicPlants'), descricao: '', Icon: Tree, cor: '#10B981', bg: '#E8F5E9', route: 'PlantasToxicas' },
                { id: 'animais', titulo: t('knowledgeHub.venomousAnimals'), descricao: '', Icon: Danger, cor: '#8B5CF6', bg: '#EDE7F6', route: 'AnimaisPeconhentos' },
                { id: 'produtos', titulo: t('knowledgeHub.hazardousProducts'), descricao: '', Icon: Reserve, cor: '#F97316', bg: '#FFF3E0', route: 'ProdutosPerigosos' },
                { id: 'riscos_fisicos', titulo: t('knowledgeHub.electricalRisks'), descricao: '', Icon: Flash, cor: '#F59E0B', bg: '#FFF8E1', route: 'RiscosFisicos' },
                { id: 'jardinagem', titulo: t('knowledgeHub.safeGardening'), descricao: t('knowledgeHub.kitCare'), Icon: Tree, cor: '#4CAF50', bg: '#E8F5E9', route: 'JardinagemSegura' },
                { id: 'condo_safety', titulo: t('knowledgeHub.condoSafety'), descricao: t('knowledgeHub.extinguishersExits'), Icon: Building4, cor: '#795548', bg: '#EFEBE9', route: 'GenericCategory', params: { categoryId: 'condominio_seguranca' } },
            ]
        },
        {
            title: `🏕️ ${t('knowledgeHub.mobilityMaintenance')}`,
            data: [
                { id: 'lazer_mobilidade', titulo: t('knowledgeHub.leisureTravel'), descricao: t('knowledgeHub.beachCamping'), Icon: Airplane, cor: '#00ACC1', bg: '#E0F7FA', route: 'LazerFeriasMenu' },
                { id: 'guias_equipamentos', titulo: t('knowledgeHub.ppeTools'), descricao: t('knowledgeHub.dailySafety'), Icon: Setting2, cor: '#607D8B', bg: '#ECEFF1', route: 'FerramentasTrabalho' },
            ]
        }
    ];

    const renderCard = (categoria, index) => (
        <FadeInView key={categoria.id} delay={150 + (index * 50)} style={{ width: '31%', marginBottom: 8, marginRight: (index % 3 !== 2) ? '3.5%' : 0 }}>
            <TouchableOpacity
                onPress={() => navigation.navigate(categoria.route, categoria.params || {})}
                activeOpacity={0.7}
            >
                <NeoCard variant="elevated"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                        aspectRatio: 1,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.06)',
                    }}
                >
                    <View style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: categoria.cor + '26', // Icon color with ~15% opacity (hex 26)
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 8
                    }}>
                        <categoria.Icon size={24} color={categoria.cor} variant="Bold" />
                    </View>

                    <Text style={{
                        fontSize: 11,
                        fontWeight: '600',
                        color: Neo.colors.neutral[800],
                        textAlign: 'center',
                        lineHeight: 14
                    }} numberOfLines={2}>
                        {categoria.titulo}
                    </Text>
                </NeoCard>
            </TouchableOpacity>
        </FadeInView>
    );

    return (
        <AppBackground variant="subtle">
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                <StatusBar barStyle="dark-content" backgroundColor="transparent" />

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Header Standardized - Neo Glass */}
                    <View style={{ marginBottom: 24, paddingTop: insets.top }}>
                        <NeoCard variant="glass"
                            style={{
                                width: '100%',
                                padding: 16,
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: 'flex-start',
                                shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2
                            }}
                        >
                            <View style={{
                                width: 48, height: 48, borderRadius: 12,
                                backgroundColor: Neo.colors.primary[100], alignItems: 'center', justifyContent: 'center',
                                marginRight: 16
                            }}>
                                <NeoIcon name="Book" size={24} color={Neo.colors.primary[600]} variant="Bulk" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Neo.colors.primary[600], fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('knowledgeHub.title')}</Text>
                                <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{t('knowledgeHub.subtitle')}</Text>
                            </View>
                        </NeoCard>
                    </View>

                    {/* ═══ MICRO BLOG BANNER ═══ */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('MicroBlog')}
                        style={[styles.blogBanner, { marginBottom: 16 }]}
                    >
                        <View style={styles.blogBannerLeft}>
                            <Text style={styles.blogBannerEmoji}>📰</Text>
                            <View>
                                <Text style={styles.blogBannerTitle}>{t('knowledgeHub.blogTitle', 'Micro Blog')}</Text>
                                <Text style={styles.blogBannerSub}>{t('knowledgeHub.blogSub', 'Prevenir em Casa')}</Text>
                            </View>
                        </View>
                        <View style={styles.blogBannerBadge}>
                            <Text style={styles.blogBannerBadgeText}>{MICRO_BLOG_ARTICLES.length} {t('knowledgeHub.articles', 'Artigos')}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Carrossel de Destaques */}
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={FEATURED_ARTICLES}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('MicroArticle', { articleId: item.id })}
                                style={styles.featuredCard}
                            >
                                <Image source={{ uri: item.thumbnail }} style={styles.featuredImg} resizeMode="cover" />
                                <View style={styles.featuredOverlay} />
                                <View style={styles.featuredContent}>
                                    <View style={[styles.featuredBadge, { backgroundColor: (MICRO_BLOG_CATEGORIES.find(c => c.id === item.category)?.color || '#666') }]}>
                                        <Text style={styles.featuredBadgeText}>
                                            {MICRO_BLOG_CATEGORIES.find(c => c.id === item.category)?.label || ''}
                                        </Text>
                                    </View>
                                    <Text style={styles.featuredTitle} numberOfLines={2}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    {/* ═══ RADAR DA PREVENÇÃO BANNER ═══ */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('RadarVigilaro')}
                        style={[styles.blogBanner, { backgroundColor: 'rgba(217, 119, 6, 0.85)', marginBottom: 24 }]}
                    >
                        <View style={styles.blogBannerLeft}>
                            <Text style={styles.blogBannerEmoji}>🚨</Text>
                            <View>
                                <Text style={styles.blogBannerTitle}>{t('home.vigilaroRadar')}</Text>
                                <Text style={styles.blogBannerSub}>{t('home.radarSub')}</Text>
                            </View>
                        </View>
                        <View style={styles.blogBannerBadge}>
                            <Text style={styles.blogBannerBadgeText}>{t('knowledgeHub.realCases', 'Casos Reais')}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* ═══ GRID DE CATEGORIAS ═══ */}
                    {KNOWLEDGE_SECTIONS.map((section, sIndex) => (
                        <View key={sIndex} style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: Neo.colors.neutral[800], marginBottom: 8, paddingHorizontal: 4 }}>{section.title}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {section.data.map((item, index) => renderCard(item, index))}
                            </View>
                        </View>
                    ))}
                    <View style={{ height: 300 }} />

                </ScrollView>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.spacing.lg,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        textAlign: 'center'
    },
    content: { padding: Neo.spacing.lg },

    // Micro Blog Banner
    blogBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(67, 160, 71, 0.85)', // Semi-transparent green
        borderRadius: 20,
        padding: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    blogBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    blogBannerEmoji: { fontSize: 28 },
    blogBannerTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
    blogBannerSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
    blogBannerBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10,
    },
    blogBannerBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '600' },

    // Featured Carousel
    featuredCard: {
        width: 160, height: 120, borderRadius: 14,
        marginRight: 10, overflow: 'hidden',
    },
    featuredImg: { width: '100%', height: '100%' },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    featuredContent: {
        position: 'absolute', bottom: 8, left: 8, right: 8,
    },
    featuredBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginBottom: 4,
    },
    featuredBadgeText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
    featuredTitle: { color: '#FFF', fontSize: 11, fontWeight: 'bold', lineHeight: 14 },

    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 0,
    }
});
