/**
 * KnowledgeHubScreen.js
 * Aba Aprender — Biblioteca de Guias e Conteúdo Educacional
 * Vigilaro Care V6
 *
 * Design (alinhado com Home + Menu redesenhados):
 *  - AppBackground mist (consistência cross-tab)
 *  - Hierarquia: Header → Destaques → Radar → Categorias
 *  - Sem emojis em headings, sem banners coloridos saturados
 *  - Cards de categoria em grid 3-col com vidro jateado (NeoCard elevated)
 *  - Conceitos Essenciais (1 item) vira card único, evita grid órfão
 */

import React from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

import {
    Home2, Lovely, TrendUp, Woman, MagicStar, Building, Briefcase, Health,
    Warning2, Flash, Building4, Eye, Airplane, Danger, ExportSquare, Tree,
    Reserve, Setting2, Scissor, Monitor, Cpu, ArrowRight2, Activity,
} from 'iconsax-react-native';

import {
    Metodologia3D,
    ProtejaPet,
    PrevencaoIncendio,
} from '../../components/CustomIconsax';
import { MICRO_BLOG_ARTICLES, MICRO_BLOG_CATEGORIES } from '../../data/micro_blog';

// Featured rotativo (5 aleatórios por sessão)
const FEATURED_ARTICLES = [...MICRO_BLOG_ARTICLES].sort(() => 0.5 - Math.random()).slice(0, 5);

export default function KnowledgeHubScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];
    const textTertiary = themeColors.neutral[600];

    // Item único — renderizado em card horizontal full-width
    const conceitoItem = {
        id: 'intro_safety',
        titulo: t('knowledgeHub.methodology'),
        Icon: Metodologia3D,
        cor: '#6366F1', // indigo
        route: 'IntroSafetyMenu',
    };

    // 5 seções com grid 3-col
    const SECTIONS = [
        {
            key: 'contexto',
            title: t('knowledgeHub.lifeContext', 'Pessoas & Contexto'),
            items: [
                { id: 'ambientes',         titulo: t('knowledgeHub.envPrevention'),  Icon: Home2,      cor: '#F59E0B', route: 'EducationEnvironments' },
                { id: 'pets',              titulo: t('knowledgeHub.protectPet'),     Icon: ProtejaPet, cor: '#EC4899', route: 'PetsMenu' },
                { id: 'seguranca_idade',   titulo: t('knowledgeHub.ageCare'),        Icon: TrendUp,    cor: '#0EA5E9', route: 'FasesVidaMenu' },
                { id: 'gestante_segura',   titulo: t('knowledgeHub.pregnancyCare'),  Icon: Woman,      cor: '#E91E63', route: 'GenericCategory', params: { categoryId: 'gestante_segura' } },
                { id: 'brinquedos_hub',    titulo: t('knowledgeHub.toyGuide'),       Icon: MagicStar,  cor: '#D97706', route: 'GenericCategory', params: { categoryId: 'brinquedos' } },
            ],
        },
        {
            key: 'analises',
            title: t('knowledgeHub.safetyReviews', 'Análises de Segurança'),
            items: [
                { id: 'utensilios_rev',    titulo: t('knowledgeHub.kitchenUtensils'),   Icon: Scissor, cor: '#E65100', route: 'UtensiliosReviews' },
                { id: 'eletro_rev',        titulo: t('knowledgeHub.homeAppliances'),    Icon: Cpu,     cor: '#1565C0', route: 'EletrodomesticosReviews' },
                { id: 'disp_eletronicos',  titulo: t('knowledgeHub.electronicDevices'), Icon: Monitor, cor: '#0F766E', route: 'DispositivosEletronicosReviews' },
            ],
        },
        {
            key: 'emergencias',
            title: t('knowledgeHub.emergencies', 'Emergências'),
            items: [
                { id: 'fire_prev',                titulo: t('knowledgeHub.firePrev'),    Icon: PrevencaoIncendio, cor: '#DC2626', route: 'GenericCategory', params: { categoryId: 'fire_prevention' } },
                { id: 'emergencias',              titulo: t('knowledgeHub.escapePlans'), Icon: ExportSquare,      cor: '#E11D48', route: 'PlanoIncendio' },
                { id: 'primeiros_socorros_hub',   titulo: t('knowledgeHub.firstAid'),    Icon: Health,            cor: '#EF4444', route: 'PrimeirosSocorros' },
                { id: 'kits_emergencia',          titulo: t('knowledgeHub.kitsGuide'),   Icon: Briefcase,         cor: '#9F1239', route: 'GuiaKitsEmergencia' },
            ],
        },
        {
            key: 'riscos',
            title: t('knowledgeHub.practicalGuides', 'Riscos Comuns'),
            items: [
                { id: 'plantas',         titulo: t('knowledgeHub.toxicPlants'),       Icon: Tree,     cor: '#10B981', route: 'PlantasToxicas' },
                { id: 'animais',         titulo: t('knowledgeHub.venomousAnimals'),   Icon: Danger,   cor: '#8B5CF6', route: 'AnimaisPeconhentos' },
                { id: 'produtos',        titulo: t('knowledgeHub.hazardousProducts'), Icon: Reserve,  cor: '#F97316', route: 'ProdutosPerigosos' },
                { id: 'riscos_fisicos',  titulo: t('knowledgeHub.electricalRisks'),   Icon: Flash,    cor: '#EAB308', route: 'RiscosFisicos' },
                { id: 'jardinagem',      titulo: t('knowledgeHub.safeGardening'),     Icon: Tree,     cor: '#16A34A', route: 'JardinagemSegura' },
                { id: 'condo_safety',    titulo: t('knowledgeHub.condoSafety'),       Icon: Building4,cor: '#78716C', route: 'GenericCategory', params: { categoryId: 'condominio_seguranca' } },
            ],
        },
        {
            key: 'mobilidade',
            title: t('knowledgeHub.mobilityMaintenance', 'Viagem & Equipamentos'),
            items: [
                { id: 'lazer_mobilidade',   titulo: t('knowledgeHub.leisureTravel'), Icon: Airplane,  cor: '#0891B2', route: 'LazerFeriasMenu' },
                { id: 'guias_equipamentos', titulo: t('knowledgeHub.ppeTools'),      Icon: Setting2,  cor: '#475569', route: 'FerramentasTrabalho' },
            ],
        },
    ];

    const renderGridCard = (item, index) => (
        <FadeInView
            key={item.id}
            delay={120 + index * 40}
            style={s.gridCell}
        >
            <TouchableOpacity
                onPress={() => navigation.navigate(item.route, item.params || {})}
                activeOpacity={0.85}
                style={{ flex: 1 }}
                accessibilityRole="button"
                accessibilityLabel={item.titulo}
            >
                <NeoCard variant="elevated" style={s.gridCard}>
                    <View style={[s.iconCircle, { backgroundColor: item.cor + '33' }]}>
                        <item.Icon size={24} color={item.cor} variant="Bold" />
                    </View>
                    <Text style={[s.gridLabel, { color: textPrimary }]} numberOfLines={2}>
                        {item.titulo}
                    </Text>
                </NeoCard>
            </TouchableOpacity>
        </FadeInView>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    {/* HEADER — consistente com Home + Menu */}
                    <View style={s.headerBlock}>
                        <H1 style={[s.title, { color: textPrimary }]} accessibilityRole="header">
                            {t('knowledgeHub.titleShort', 'Aprender')}
                        </H1>
                        <Caption style={[s.subtitle, { color: textTertiary }]}>
                            {t('knowledgeHub.subtitleShort', 'Guias práticos de prevenção')}
                        </Caption>
                    </View>

                    {/* DESTAQUES — carrossel horizontal */}
                    <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                        {t('knowledgeHub.featured', 'Destaques')}
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={FEATURED_ARTICLES}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 8, paddingRight: 4 }}
                        renderItem={({ item }) => {
                            const cat = MICRO_BLOG_CATEGORIES.find(c => c.id === item.category);
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    onPress={() => navigation.navigate('MicroArticle', { articleId: item.id })}
                                    style={s.featuredCard}
                                >
                                    <Image source={{ uri: item.thumbnail }} style={s.featuredImg} resizeMode="cover" />
                                    <View style={s.featuredOverlay} />
                                    <View style={s.featuredContent}>
                                        {!!cat && (
                                            <View style={[s.featuredBadge, { backgroundColor: cat.color || '#666' }]}>
                                                <Text style={s.featuredBadgeText}>{cat.label || ''}</Text>
                                            </View>
                                        )}
                                        <Text style={s.featuredTitle} numberOfLines={2}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* Link discreto para todos os artigos */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MicroBlog')}
                        activeOpacity={0.6}
                        style={s.viewAllLink}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Text style={s.viewAllText}>
                            {t('knowledgeHub.viewAllArticles', 'Ver Microblog')}
                        </Text>
                        <ArrowRight2 size={14} color={Neo.colors.primary[700]} />
                    </TouchableOpacity>

                    {/* RADAR DA PREVENÇÃO — card especial premium (substitui banner laranja) */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('RadarVigilaro')}
                        style={{ marginTop: 18, marginBottom: 8 }}
                    >
                        <NeoCard variant="elevated" style={s.radarCard}>
                            <View style={s.radarIconWrap}>
                                <Activity size={26} color="#B91C1C" variant="Bold" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Body style={s.radarTitle}>
                                    {t('home.vigilaroRadar', 'Radar da Prevenção')}
                                </Body>
                                <Small style={s.radarSub} numberOfLines={2}>
                                    {t('knowledgeHub.radarSub', 'Casos reais que ensinam')}
                                </Small>
                            </View>
                            <ArrowRight2 size={18} color="#B91C1C" />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* CONCEITOS — card único (era grid de 1, fica menos órfão como linha) */}
                    <Text style={[s.sectionLabel, { marginTop: 20, color: textSecondary }]} accessibilityRole="header">
                        {t('knowledgeHub.essentialConcepts', 'Conceitos')}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate(conceitoItem.route)}
                        accessibilityRole="button"
                        accessibilityLabel={conceitoItem.titulo}
                    >
                        <NeoCard variant="elevated" style={s.conceitoCard}>
                            <View style={[s.iconCircle, { backgroundColor: conceitoItem.cor + '33', marginRight: 14, marginBottom: 0 }]}>
                                <conceitoItem.Icon size={24} color={conceitoItem.cor} />
                            </View>
                            <Body style={{ flex: 1, fontWeight: '800', color: textPrimary, fontSize: 14 }}>
                                {conceitoItem.titulo}
                            </Body>
                            <ArrowRight2 size={18} color={themeColors.neutral[500]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* 5 SEÇÕES — grid 3 colunas */}
                    {SECTIONS.map((section) => (
                        <View key={section.key} style={{ marginTop: 20 }}>
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {section.title}
                            </Text>
                            <View style={s.grid}>
                                {section.items.map(renderGridCard)}
                            </View>
                        </View>
                    ))}

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 8,
        paddingBottom: 190, // libera espaço para o GlobalFloatingFooter / SOS
    },

    // ── Header ──
    headerBlock: {
        paddingTop: 4,
        paddingBottom: 18,
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    // ── Section labels (consistente com Home e Menu) ──
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // ── Carrossel destaques ──
    featuredCard: {
        width: 170,
        height: 120,
        borderRadius: 16,
        marginRight: 10,
        overflow: 'hidden',
    },
    featuredImg: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.42)',
    },
    featuredContent: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
    featuredBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        paddingVertical: 2,
        borderRadius: 6,
        marginBottom: 4,
    },
    featuredBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.2,
    },
    featuredTitle: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '800',
        lineHeight: 15,
    },

    // ── Link "Ver todos" ──
    viewAllLink: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        gap: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
    },
    viewAllText: {
        fontSize: 13,
        fontWeight: '700',
        color: Neo.colors.primary[700],
    },

    // ── Radar card especial ──
    radarCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    radarIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(185,28,28,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radarTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
    },
    radarSub: {
        color: Neo.colors.neutral[600],
        marginTop: 2,
        lineHeight: 16,
    },

    // ── Conceitos (card único horizontal) ──
    conceitoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
    },

    // ── Grid 3-col para seções de categorias ──
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    gridCell: {
        width: '31.5%',
        aspectRatio: 1,
        marginBottom: 4,
    },
    gridCard: {
        flex: 1,
        borderRadius: 16,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    gridLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        lineHeight: 14,
    },
});
