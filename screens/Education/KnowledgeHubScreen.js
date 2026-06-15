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
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';
import { H1, Body } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

import NeoIcon from '../../components/NeoIcon';
import { MICRO_BLOG_ARTICLES, MICRO_BLOG_CATEGORIES } from '../../data/micro_blog';

// Featured rotativo (5 aleatórios por sessão)
const FEATURED_ARTICLES = [...MICRO_BLOG_ARTICLES].sort(() => 0.5 - Math.random()).slice(0, 5);
// ─────────────────────────────────────────────────────────────────────────
// MAPA DE PICTOGRAMAS — chaveado pelo `id` do item (PLANO_PICTOGRAMAS_HUB.md).
// Item sem entrada cai no fallback ícone+círculo: permite entregar os assets
// em lotes sem quebrar nada. Asset novo = 1 linha aqui.
// Convenção dos novos: pictogram-<id>.png em education-pictograms/,
// estilo 3D cerâmico da Home, símbolo solto em fundo transparente.
// ─────────────────────────────────────────────────────────────────────────
const PICTOGRAMS = {
    // Seção 1 — Pessoas & Contexto (lote 2 completo: todos cerâmicos,
    // normalizados no padrão condo-safety — cobertura 88.5%, aspecto 0.98)
    seguranca_idade: require('../../assets/illustrations/education-pictograms/pictogram-familia-fases.png'),
    ambientes:       require('../../assets/illustrations/education-pictograms/pictogram-ambientes.png'),
    gestante_segura: require('../../assets/illustrations/education-pictograms/pictogram-gestacao.png'),
    pets:            require('../../assets/illustrations/education-pictograms/pictogram-pets-hub.png'),
    brinquedos_hub:  require('../../assets/illustrations/education-pictograms/pictogram-brinquedos.png'),
    // Seções 2-5 — lote 1 do plano (15 assets). Descomentar conforme gerados:
    utensilios_rev:   require('../../assets/illustrations/education-pictograms/pictogram-utensilios-rev.png'),
    eletro_rev:       require('../../assets/illustrations/education-pictograms/pictogram-eletro-rev.png'),
    disp_eletronicos: require('../../assets/illustrations/education-pictograms/pictogram-disp-eletronicos.png'),
    fire_prev:        require('../../assets/illustrations/education-pictograms/pictogram-fire-prev.png'),
    emergencias:      require('../../assets/illustrations/education-pictograms/pictogram-emergencias.png'),
    primeiros_socorros_hub: require('../../assets/illustrations/education-pictograms/pictogram-primeiros-socorros.png'),
    kits_emergencia:  require('../../assets/illustrations/education-pictograms/pictogram-kits-emergencia.png'),
    plantas:          require('../../assets/illustrations/education-pictograms/pictogram-plantas.png'),
    animais:          require('../../assets/illustrations/education-pictograms/pictogram-animais.png'),
    produtos:         require('../../assets/illustrations/education-pictograms/pictogram-produtos.png'),
    riscos_fisicos:   require('../../assets/illustrations/education-pictograms/pictogram-riscos-fisicos.png'),
    jardinagem:       require('../../assets/illustrations/education-pictograms/pictogram-jardinagem.png'),
    condo_safety:     require('../../assets/illustrations/education-pictograms/pictogram-condo-safety.png'),
    lazer_mobilidade: require('../../assets/illustrations/education-pictograms/pictogram-lazer-mobilidade.png'),
    guias_equipamentos: require('../../assets/illustrations/education-pictograms/pictogram-guias-equipamentos.png'),
    teoria_fogo:        require('../../assets/illustrations/education-pictograms/pictogram-teoria-fogo.png'),
};
const REAL_CASES_PICTOGRAM = require('../../assets/illustrations/education-pictograms/pictogram-casos-reais.png');
const CONCEPTS_PICTOGRAM = require('../../assets/illustrations/education-pictograms/pictogram-conceitos.png');

// Ids cujos assets são do formato CERÂMICO 3D (tile creme + moldura verde
// embutidos no PNG, como na Home). Esses renderizam SEM NeoCard — o asset É
// o card (evita moldura dupla). Os legados (traço P&B) seguem no card glass
// até serem regenerados no lote 2.
const CERAMIC_STYLE_IDS = new Set([
    'utensilios_rev', 'eletro_rev', 'disp_eletronicos',
    'fire_prev', 'emergencias', 'primeiros_socorros_hub', 'kits_emergencia',
    'plantas', 'animais', 'produtos', 'riscos_fisicos', 'jardinagem', 'condo_safety',
    'lazer_mobilidade', 'guias_equipamentos',
    // Lote 2 (seção 1) — completo em 2026-06-11:
    'seguranca_idade',
    'pets',
    'ambientes', 'gestante_segura', 'brinquedos_hub',
    // Teoria do Fogo (asset cerâmico pronto 2026-06-15):
    'teoria_fogo',
]);

export default function KnowledgeHubScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];

    // Item único — renderizado em card horizontal full-width
    const conceitoItem = {
        id: 'intro_safety',
        titulo: t('knowledgeHub.methodology'),
        route: 'IntroSafetyMenu',
    };

    // 5 seções com grid 3-col
    const SECTIONS = [
        {
            key: 'contexto',
            title: t('knowledgeHub.lifeContext', 'Pessoas & Contexto'),
            items: [
                { id: 'ambientes',         titulo: t('knowledgeHub.envPrevention'),  pictogram: 'environmentPrevention', iconName: 'Home2',      cor: '#F59E0B', route: 'EducationEnvironments' },
                { id: 'pets',              titulo: t('knowledgeHub.protectPet'),     pictogram: 'petHealth', iconName: 'ProtejaPet', cor: '#EC4899', route: 'PetsMenu' },
                { id: 'seguranca_idade',   titulo: t('knowledgeHub.ageCare'),        pictogram: 'familyAgeCare', iconName: 'TrendUp',    cor: '#0EA5E9', route: 'FasesVidaMenu' },
                { id: 'gestante_segura',   titulo: t('knowledgeHub.pregnancyCare'),  pictogram: 'pregnancyCare', iconName: 'Woman',      cor: '#E91E63', route: 'GenericCategory', params: { categoryId: 'gestante_segura' } },
                { id: 'brinquedos_hub',    titulo: t('knowledgeHub.toyGuide'),       pictogram: 'toyGuide', iconName: 'MagicStar',  cor: '#D97706', route: 'GenericCategory', params: { categoryId: 'brinquedos' } },
            ],
        },
        {
            key: 'analises',
            title: t('knowledgeHub.safetyReviews', 'Análises de Segurança'),
            items: [
                { id: 'utensilios_rev',    titulo: t('knowledgeHub.kitchenUtensils'),   iconName: 'Scissor', cor: '#E65100', route: 'UtensiliosReviews' },
                { id: 'eletro_rev',        titulo: t('knowledgeHub.homeAppliances'),    iconName: 'Cpu',     cor: '#1565C0', route: 'EletrodomesticosReviews' },
                { id: 'disp_eletronicos',  titulo: t('knowledgeHub.electronicDevices'), iconName: 'Monitor', cor: '#0F766E', route: 'DispositivosEletronicosReviews' },
            ],
        },
        {
            key: 'emergencias',
            title: t('knowledgeHub.emergencies', 'Emergências'),
            items: [
                { id: 'fire_prev',                titulo: t('knowledgeHub.firePrev'),    iconName: 'PrevencaoIncendio', cor: '#DC2626', route: 'GenericCategory', params: { categoryId: 'fire_prevention' } },
                { id: 'emergencias',              titulo: t('knowledgeHub.escapePlans'), iconName: 'ExportSquare',      cor: '#E11D48', route: 'PlanoIncendio' },
                { id: 'primeiros_socorros_hub',   titulo: t('knowledgeHub.firstAid'),    iconName: 'Health',            cor: '#EF4444', route: 'PrimeirosSocorros' },
                { id: 'kits_emergencia',          titulo: t('knowledgeHub.kitsGuide'),   iconName: 'Briefcase',         cor: '#9F1239', route: 'GuiaKitsEmergencia' },
            ],
        },
        {
            key: 'riscos',
            title: t('knowledgeHub.practicalGuides', 'Riscos Comuns'),
            items: [
                { id: 'plantas',         titulo: t('knowledgeHub.toxicPlants'),       iconName: 'Tree',     cor: '#10B981', route: 'PlantasToxicas' },
                { id: 'animais',         titulo: t('knowledgeHub.venomousAnimals'),   iconName: 'Danger',   cor: '#8B5CF6', route: 'AnimaisPeconhentos' },
                { id: 'produtos',        titulo: t('knowledgeHub.hazardousProducts'), iconName: 'Reserve',  cor: '#F97316', route: 'ProdutosPerigosos' },
                { id: 'riscos_fisicos',  titulo: t('knowledgeHub.electricalRisks'),   iconName: 'Flash',    cor: '#EAB308', route: 'RiscosFisicos' },
                { id: 'jardinagem',      titulo: t('knowledgeHub.safeGardening'),     iconName: 'Tree',     cor: '#16A34A', route: 'JardinagemSegura' },
                { id: 'condo_safety',    titulo: t('knowledgeHub.condoSafety'),       iconName: 'Building4',cor: '#78716C', route: 'GenericCategory', params: { categoryId: 'condominio_seguranca' } },
                { id: 'teoria_fogo',     titulo: t('knowledgeHub.fireTheory', 'Teoria do Fogo'), iconName: 'Fire', cor: '#EA580C', route: 'TeoriaFogo' },
            ],
        },
        {
            key: 'mobilidade',
            title: t('knowledgeHub.mobilityMaintenance', 'Viagem & Equipamentos'),
            items: [
                { id: 'lazer_mobilidade',   titulo: t('knowledgeHub.leisureTravel'), iconName: 'Airplane',  cor: '#0891B2', route: 'LazerFeriasMenu' },
                { id: 'guias_equipamentos', titulo: t('knowledgeHub.ppeTools'),      iconName: 'Setting2',  cor: '#475569', route: 'FerramentasTrabalho' },
            ],
        },
    ];

    const renderGridCard = (item, index) => {
        const pictogramSource = PICTOGRAMS[item.id];

        // Formato cerâmico: o PNG já é o card (tile+moldura embutidos) —
        // renderiza nu, sem NeoCard, com o label abaixo (como na Home).
        if (pictogramSource && CERAMIC_STYLE_IDS.has(item.id)) {
            return (
                <FadeInView key={item.id} delay={120 + index * 40} style={s.gridCell}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(item.route, item.params || {})}
                        activeOpacity={0.85}
                        style={s.ceramicCell}
                        accessibilityRole="button"
                        accessibilityLabel={item.titulo}
                    >
                        <Image source={pictogramSource} style={s.ceramicImage} resizeMode="contain" />
                        <Text style={[s.gridLabel, { color: textPrimary }]} numberOfLines={2}>
                            {item.titulo}
                        </Text>
                    </TouchableOpacity>
                </FadeInView>
            );
        }

        const customPictogram = pictogramSource
            ? <Image source={pictogramSource} style={s.gridGenericPictogramImage} resizeMode="contain" />
            : null;

        const customPictogramWrapStyle = s.gridPictogramWrap;

        return (
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
                        {customPictogram ? (
                            <View style={customPictogramWrapStyle}>
                                {customPictogram}
                            </View>
                        ) : (
                            <View style={[s.iconCircle, { backgroundColor: item.cor + '33' }]}>
                                <NeoIcon name={item.iconName} size={24} color={item.cor} variant="Bold" />
                            </View>
                        )}
                        <Text style={[s.gridLabel, { color: textPrimary }]} numberOfLines={2}>
                            {item.titulo}
                        </Text>
                    </NeoCard>
                </TouchableOpacity>
            </FadeInView>
        );
    };

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
                            {t('knowledgeHub.subtitleShort', 'Guias práticos de prevenção')}
                        </H1>
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
                        <NeoIcon name="ArrowRight2" size={14} color={Neo.colors.primary[700]} />
                    </TouchableOpacity>

                    {/* RADAR DA PREVENÇÃO — card especial premium (substitui banner laranja) */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('RadarVigilaro')}
                        style={{ marginTop: 18, marginBottom: 8 }}
                    >
                        <NeoCard variant="elevated" style={s.radarCard}>
                            <View style={s.radarIconWrap}>
                                <Image source={REAL_CASES_PICTOGRAM} style={s.specialPictogramImage} resizeMode="contain" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Body style={s.radarTitle}>
                                    {t('knowledgeHub.realCasesTeach', 'Casos reais que ensinam')}
                                </Body>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color="#B91C1C" />
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
                            <View style={s.conceptPictogramWrap}>
                                <Image source={CONCEPTS_PICTOGRAM} style={s.specialPictogramImage} resizeMode="contain" />
                            </View>
                            <Body style={{ flex: 1, fontWeight: '800', color: textPrimary, fontSize: 14 }}>
                                {conceitoItem.titulo}
                            </Body>
                            <NeoIcon name="ArrowRight2" size={18} color={themeColors.neutral[500]} />
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
    // ── Section labels (consistente com Home e Menu) ──
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        textAlign: 'center', // tela-grid: título centralizado (família Home/Viagem)
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
        width: 66,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    specialPictogramImage: {
        width: '100%',
        height: '100%',
        // (sem scale: os cerâmicos já vêm com cobertura 88.5%, sem padding
        // interno — o scale 1.3 dos antigos P&B estouraria o wrapper)
    },
    radarTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
    },
    // ── Conceitos (card único horizontal) ──
    conceitoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
    },
    conceptPictogramWrap: {
        width: 66,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
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
    gridPictogramWrap: {
        width: 72,
        height: 60, // Aumentado um pouco para acomodar melhor as imagens line-art
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    gridGenericPictogramImage: {
        width: '100%',
        height: '100%',
        transform: [{ scale: 1.3 }], // Aumentado em 30% visualmente
    },
    gridLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        lineHeight: 14,
    },

    // ── Célula cerâmica (pictograma novo = o próprio card, sem NeoCard) ──
    ceramicCell: {
        flex: 1,
        alignItems: 'center',
        // topo, não center: com labels de 1 vs 2 linhas, a centralização
        // vertical fazia os tiles "flutuarem" desalinhados entre vizinhos
        justifyContent: 'flex-start',
    },
    ceramicImage: {
        width: '100%',
        height: '74%',
        marginBottom: 2,
    },
});
