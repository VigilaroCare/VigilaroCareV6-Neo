/**
 * InfoRotulosResultScreen.js
 * Tela de resultado do InfoRótulos
 *
 * Exibe:
 *   - Header colorido por severidade
 *   - Alertas personalizados (RuleEngine × Perfil)
 *   - Classificação GHS traduzida
 *   - Primeiros socorros por via de exposição
 *   - Prevenção
 *   - CIATOX
 *   - Análise complementar com IA (opcional)
 */

import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Linking, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    ArrowRight2, Call, Warning2, ShieldTick,
    Heart, Lovely, Eye, Danger, SearchNormal1,
} from 'iconsax-react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import FadeInView from '../components/FadeInView';
import { useTranslation } from 'react-i18next';

import { evaluateProduct, SEVERITY } from '../services/InfoRotulosRuleEngine';
import { getSubstanceByName, getSubstancesForIngredients } from '../services/InfoRotulosSubstanceService';
import { NIVEIS_PERIGO } from '../data/produtos_scanner';
import { addToHistory } from '../services/inforotulos_cache';

// Cores por severidade do produto
const SEVERITY_COLORS = {
    'Extremo':       { bg: '#1A1A1A', text: '#FFF', accent: '#FF1744' },
    'Muito Alto':    { bg: '#B71C1C', text: '#FFF', accent: '#FF5252' },
    'Alto':          { bg: '#D32F2F', text: '#FFF', accent: '#FF8A80' },
    'Médio':         { bg: '#F57C00', text: '#FFF', accent: '#FFB74D' },
    'Baixo':         { bg: '#388E3C', text: '#FFF', accent: '#81C784' },
    'Indeterminado': { bg: '#616161', text: '#FFF', accent: '#BDBDBD' },
};

const FIRST_AID_ICONS = {
    ingestao: { emoji: '💧', label: 'Se INGERIR' },
    contato_pele: { emoji: '✋', label: 'Se TOCAR NA PELE' },
    contato_olhos: { emoji: '👁️', label: 'Se CAIR NOS OLHOS' },
    inalacao: { emoji: '💨', label: 'Se INALAR' },
    // Fallbacks para campos do produtos_scanner.js
    pele: { emoji: '✋', label: 'Se TOCAR NA PELE' },
    olhos: { emoji: '👁️', label: 'Se CAIR NOS OLHOS' },
    queimadura: { emoji: '🔥', label: 'Se QUEIMAR' },
    reacao: { emoji: '⚡', label: 'Se REAÇÃO ALÉRGICA' },
    ingestao_pet: { emoji: '🐾', label: 'Se PET INGERIR' },
    ingestao_humana: { emoji: '💧', label: 'Se HUMANO INGERIR' },
};

// Labels amigáveis para cada fonte de dados
const SOURCE_LABELS = {
    local: { label: 'Base Local', icon: '📦', color: '#4CAF50' },
    open_food_facts: { label: 'Open Food Facts', icon: '🌍', color: '#2196F3' },
    open_beauty_facts: { label: 'Open Beauty Facts', icon: '💄', color: '#E91E63' },
    open_products_facts: { label: 'Open Products Facts', icon: '🏠', color: '#FF9800' },
    upcitemdb: { label: 'UPCitemdb', icon: '🔖', color: '#9C27B0' },
    not_found: { label: 'Não encontrado', icon: '❓', color: '#9E9E9E' },
};

export default function InfoRotulosResultScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation();

    const { product, substance, source, searchQuery, ingredientes_texto, marca } = route.params || {};

    const [alerts, setAlerts] = useState([]);
    const [substanceData, setSubstanceData] = useState(substance || null);
    const [loading, setLoading] = useState(!substance);
    const [enriching, setEnriching] = useState(false);

    const productData = product || {};
    const nome = productData.nome || substanceData?.name_pt || searchQuery || 'Produto';
    const categoria = productData.categoria || 'Substância';
    const brandName = marca || productData.marca || '';
    const perigo = productData.perigo || substanceData?.severity || 'Indeterminado';
    const severityColor = SEVERITY_COLORS[perigo] || SEVERITY_COLORS[findClosestSeverity(perigo)] || SEVERITY_COLORS['Indeterminado'];
    const sourceInfo = SOURCE_LABELS[source] || SOURCE_LABELS['not_found'];

    // Determina se o produto veio de fonte externa (precisa enriquecimento)
    const isExternalSource = ['open_food_facts', 'open_beauty_facts', 'open_products_facts', 'upcitemdb'].includes(source);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        try {
            if (product && !substance) {
                setLoading(true);

                // Determina quais ingredientes usar para enriquecimento
                let ingredientesToSearch = product.componentes || [];

                // Se componentes está vazio mas temos ingredientes_texto, faz parse
                if (ingredientesToSearch.length === 0 && (ingredientes_texto || product.ingredientes_texto)) {
                    const rawText = ingredientes_texto || product.ingredientes_texto || '';
                    ingredientesToSearch = rawText
                        .split(/[,;.]/)
                        .map(s => s.trim())
                        .filter(s => s.length > 2);

                    if (__DEV__) console.log('[InfoRotulosResult] Ingredientes parseados do texto:', ingredientesToSearch);
                }

                // Tenta enriquecer com dados toxicológicos
                if (ingredientesToSearch.length > 0) {
                    if (__DEV__) console.log('[InfoRotulosResult] Enriquecendo com', ingredientesToSearch.length, 'ingredientes...');
                    setEnriching(true);
                    const substancesData = await getSubstancesForIngredients(ingredientesToSearch);
                    if (substancesData.length > 0) {
                        setSubstanceData(substancesData[0]); // Usa o mais relevante
                        if (__DEV__) console.log('[InfoRotulosResult] ✅ Enriquecido com PubChem/EPA:', substancesData[0].name_pt);
                    }
                    setEnriching(false);
                }

                setLoading(false);
            }

            // Avalia alertas do RuleEngine
            const productAlerts = await evaluateProduct(
                substanceData || substance,
                product
            );
            setAlerts(productAlerts);

        } catch (e) {
            if (__DEV__) console.warn('[InfoRotulosResult] init error:', e);
            setLoading(false);
            setEnriching(false);
        }
    };

    // Re-avaliar quando substanceData mudar
    useEffect(() => {
        if (substanceData) {
            evaluateProduct(substanceData, product).then(setAlerts);
        }
    }, [substanceData]);

    // Primeiros socorros: combina dados do produto local + substância
    const firstAid = {
        ...(substanceData?.first_aid || {}),
        ...(productData.primeiros_socorros || {}),
    };

    // GHS statements
    const hazardStatements = substanceData?.hazard_statements || [];
    const precautionary = substanceData?.precautionary || [];

    // Prevenção (do produto local)
    const prevencao = productData.prevencao || [];
    const riscos = productData.riscos || [];

    // Ingredientes (para exibição quando vêm de fonte externa)
    const ingredientesDisplay = productData.ingredientes_texto || ingredientes_texto || '';
    const componentesDisplay = productData.componentes || [];

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['left', 'right']}>
                <StatusBar style={severityColor.bg === '#1A1A1A' ? 'light' : 'light'} />

                <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: 220 }}>

                    {/* ── HEADER colorido ── */}
                    <LinearGradient 
                        colors={[severityColor.bg, severityColor.bg + 'CC']} 
                        style={styles.heroHeader}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <SafeAreaView edges={['top']}>
                            <View style={styles.heroNav}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.heroBackBtn}>
                                    <ArrowRight2 size={22} color={severityColor.text} style={{ transform: [{ rotate: '180deg' }] }} />
                                </TouchableOpacity>
                                <Caption style={{ color: severityColor.text, opacity: 0.7 }}>{t('headersFirst.infoRTulos', 'InfoRótulos')}</Caption>
                            </View>
                        </SafeAreaView>

                        <View style={styles.heroContent}>
                            <Text style={styles.heroIcon}>{productData.icone || '🧪'}</Text>
                            <Text style={[styles.heroTitle, { color: severityColor.text }]}>{nome}</Text>
                            {brandName ? (
                                <Text style={[styles.heroSubtitle, { color: severityColor.text + 'DD', fontWeight: '600' }]}>
                                    {brandName}
                                </Text>
                            ) : null}
                            <Text style={[styles.heroSubtitle, { color: severityColor.text + 'BB' }]}>{categoria}</Text>

                            <View style={styles.heroBadges}>
                                <View style={[styles.severityBadge, { backgroundColor: severityColor.accent + '30' }]}>
                                    <Text style={[styles.severityText, { color: severityColor.text }]}>
                                        {(NIVEIS_PERIGO[perigo]?.icone || '⚠️') + ' ' + perigo.toUpperCase()}
                                    </Text>
                                </View>

                                {/* Badge de fonte dos dados */}
                                <View style={[styles.sourceBadge, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                    <Text style={[styles.sourceText, { color: severityColor.text }]}>
                                        {sourceInfo.icon + ' ' + sourceInfo.label}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={styles.contentArea}>

                        {/* ── Loading ── */}
                        {loading && (
                            <NeoCard variant="glass" style={styles.sectionCard}>
                                <ActivityIndicator color={Neo.colors.primary[500]} />
                                <Small style={{ textAlign: 'center', marginTop: 8, color: Neo.colors.neutral[500] }}>
                                    {t('scanner.loadingTox')}
                                </Small>
                            </NeoCard>
                        )}

                        {/* ── ALERTAS PERSONALIZADOS ── */}
                        {alerts.length > 0 && (
                            <FadeInView delay={100}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultAlerts')}</Text>
                                {alerts.map((alert, idx) => (
                                    <NeoCard
                                        key={idx}
                                        variant="solid"
                                        color={alert.bg || '#FFF3E0'}
                                        style={[styles.alertCard, { borderLeftWidth: 4, borderLeftColor: alert.color }]}
                                    >
                                        <View style={styles.alertHeader}>
                                            <Text style={{ fontSize: 20 }}>{alert.icon}</Text>
                                            <View style={[styles.alertSeverityTag, { backgroundColor: alert.color + '20' }]}>
                                                <Text style={[styles.alertSeverityText, { color: alert.color }]}>
                                                    {alert.label}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={[styles.alertTitle, { color: alert.color }]}>{alert.title}</Text>
                                        <Text style={styles.alertMessage}>{alert.message}</Text>

                                        {alert.action && (
                                            <View style={styles.alertAction}>
                                                <ShieldTick size={14} color={alert.color} />
                                                <Text style={[styles.alertActionText, { color: alert.color }]}>
                                                    {alert.action}
                                                </Text>
                                            </View>
                                        )}
                                    </NeoCard>
                                ))}
                            </FadeInView>
                        )}

                        {/* ── INGREDIENTES (fonte externa) ── */}
                        {isExternalSource && componentesDisplay.length > 0 && (
                            <FadeInView delay={150}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultIngredients')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    <Text style={styles.ingredientesText}>
                                        {componentesDisplay.join(', ')}
                                    </Text>
                                    {enriching && (
                                        <View style={styles.enrichingRow}>
                                            <ActivityIndicator size="small" color={Neo.colors.primary[500]} />
                                            <Small style={{ marginLeft: 8, color: Neo.colors.neutral[500] }}>
                                                {t('scanner.loadingEpa')}
                                            </Small>
                                        </View>
                                    )}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── RISCOS (dados locais) ── */}
                        {riscos.length > 0 && (
                            <FadeInView delay={200}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultRisks')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {riscos.map((risco, idx) => (
                                        <View key={idx} style={styles.riskItem}>
                                            <Warning2 size={16} color="#E65100" variant="Bold" />
                                            <Text style={styles.riskText}>{risco}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── CLASSIFICAÇÃO GHS ── */}
                        {hazardStatements.length > 0 && (
                            <FadeInView delay={250}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultGhs')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {hazardStatements.map((stmt, idx) => (
                                        <View key={idx} style={styles.ghsItem}>
                                            <View style={styles.ghsCodeBadge}>
                                                <Text style={styles.ghsCode}>{stmt.code}</Text>
                                            </View>
                                            <Text style={styles.ghsText}>{stmt.text_pt}</Text>
                                        </View>
                                    ))}
                                    <Text style={styles.ghsSource}>
                                        Fonte: PubChem (NIH/NLM)
                                        {substanceData?.source === 'pubchem+epa' ? ' + EPA CTX' : ''}
                                    </Text>
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── PRIMEIROS SOCORROS ── */}
                        {Object.keys(firstAid).length > 0 && (
                            <FadeInView delay={300}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultFirstAid')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {Object.entries(firstAid).map(([key, value]) => {
                                        if (!value) return null;
                                        const icon = FIRST_AID_ICONS[key] || { emoji: '🩹', label: key };
                                        return (
                                            <View key={key} style={styles.firstAidItem}>
                                                <View style={styles.firstAidHeader}>
                                                    <Text style={{ fontSize: 18 }}>{icon.emoji}</Text>
                                                    <Text style={styles.firstAidLabel}>{icon.label}</Text>
                                                </View>
                                                <Text style={styles.firstAidText}>{value}</Text>
                                            </View>
                                        );
                                    })}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── PREVENÇÃO ── */}
                        {prevencao.length > 0 && (
                            <FadeInView delay={350}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultPrevention')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {prevencao.map((item, idx) => (
                                        <View key={idx} style={styles.preventionItem}>
                                            <Text style={styles.preventionCheck}>✓</Text>
                                            <Text style={styles.preventionText}>{item}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── PRECAUÇÕES GHS ── */}
                        {precautionary.length > 0 && (
                            <FadeInView delay={400}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultPrecaution')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {precautionary.map((stmt, idx) => (
                                        <View key={idx} style={styles.ghsItem}>
                                            <View style={[styles.ghsCodeBadge, { backgroundColor: '#E3F2FD' }]}>
                                                <Text style={[styles.ghsCode, { color: '#1565C0' }]}>{stmt.code}</Text>
                                            </View>
                                            <Text style={styles.ghsText}>{stmt.text}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── EPA CTX dados extras ── */}
                        {substanceData?.epa_ld50 && (
                            <FadeInView delay={420}>
                                <Text style={styles.sectionTitle}>{t('scanner.resultEpa')}</Text>
                                <NeoCard variant="glass" style={styles.sectionCard}>
                                    {substanceData.epa_ld50 && (
                                        <View style={styles.epaRow}>
                                            <Text style={styles.epaLabel}>{t('headersFirst.lD50DoseLetalOral', 'LD50 (dose letal oral)')}</Text>
                                            <Text style={styles.epaValue}>{substanceData.epa_ld50}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_carcinogenicity && (
                                        <View style={styles.epaRow}>
                                            <Text style={styles.epaLabel}>{t('headersFirst.carcinogenicidade', 'Carcinogenicidade')}</Text>
                                            <Text style={styles.epaValue}>{substanceData.epa_carcinogenicity}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_genotoxicity && (
                                        <View style={styles.epaRow}>
                                            <Text style={styles.epaLabel}>{t('headersFirst.genotoxicidade', 'Genotoxicidade')}</Text>
                                            <Text style={styles.epaValue}>{substanceData.epa_genotoxicity}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_reproductive_toxicity && (
                                        <View style={styles.epaRow}>
                                            <Text style={styles.epaLabel}>{t('headersFirst.toxicidadeReprodutiva', 'Toxicidade Reprodutiva')}</Text>
                                            <Text style={styles.epaValue}>{substanceData.epa_reproductive_toxicity}</Text>
                                        </View>
                                    )}
                                    <Text style={styles.ghsSource}>{t('headersFirst.fonteEPAComputationalToxicology', 'Fonte: EPA Computational Toxicology')}</Text>
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* ── BOTÃO CIATOX ── */}
                        <FadeInView delay={450}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => Linking.openURL('tel:08007226001')}
                                style={styles.ciatoxButton}
                            >
                                <Call size={22} color="#FFF" variant="Bold" />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={styles.ciatoxTitle}>{t('scanner.callCiatox')}</Text>
                                    <Text style={styles.ciatoxNumber}>{t('scanner.ciatoxNumber')}</Text>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>

                        {/* ── ANÁLISE IA COMPLEMENTAR ── */}
                        <FadeInView delay={500}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.push('Scanner', { mode: 'label_scan' })}
                                style={styles.iaButton}
                            >
                                <Text style={{ fontSize: 20, marginRight: 12 }}>🤖</Text>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.iaTitle}>{t('scanner.analyzeWithAi')}</Text>
                                    <Text style={styles.iaSubtitle}>{t('scanner.analyzeWithAiSub')}</Text>
                                </View>
                                <ArrowRight2 size={16} color={Neo.colors.primary[600]} />
                            </TouchableOpacity>
                        </FadeInView>

                        {/* ── NOVA CONSULTA ── */}
                        <FadeInView delay={550}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('InfoRotulos')}
                                style={styles.newSearchButton}
                            >
                                <SearchNormal1 size={18} color={Neo.colors.primary[600]} />
                                <Text style={styles.newSearchText}>{t('scanner.newSearch')}</Text>
                            </TouchableOpacity>
                        </FadeInView>

                        <View style={{ height: 100 }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Encontra a severidade mais próxima para variantes como "Médio (Humanos) / Mortal (Gatos)"
function findClosestSeverity(perigo) {
    if (!perigo) return 'Indeterminado';
    const p = perigo.toLowerCase();
    if (p.includes('extremo') || p.includes('mortal') || p.includes('fatal')) return 'Extremo';
    if (p.includes('muito alto')) return 'Muito Alto';
    if (p.includes('alto')) return 'Alto';
    if (p.includes('médio') || p.includes('medio')) return 'Médio';
    if (p.includes('baixo')) return 'Baixo';
    return 'Indeterminado';
}

const styles = StyleSheet.create({
    // Hero Header
    heroHeader: {
        paddingBottom: 30,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    heroNav: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.md,
        paddingBottom: 4,
    },
    heroBackBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 12,
    },
    heroContent: {
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 10,
    },
    heroIcon: {
        fontSize: 48, marginBottom: 8,
    },
    heroTitle: {
        fontSize: 24, fontWeight: '800',
        textAlign: 'center', marginBottom: 4,
    },
    heroSubtitle: {
        fontSize: 14, fontWeight: '500',
        textAlign: 'center', marginBottom: 12,
    },
    heroBadges: {
        flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'center', gap: 8,
        marginTop: 4,
    },
    severityBadge: {
        paddingHorizontal: 16, paddingVertical: 6,
        borderRadius: 12,
    },
    severityText: {
        fontSize: 13, fontWeight: '900', letterSpacing: 1,
    },
    sourceBadge: {
        paddingHorizontal: 12, paddingVertical: 5,
        borderRadius: 10,
    },
    sourceText: {
        fontSize: 11, fontWeight: '700', letterSpacing: 0.3,
    },
    ingredientesText: {
        fontSize: 13, color: Neo.colors.neutral[600],
        lineHeight: 20,
    },
    enrichingRow: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: 12, paddingTop: 10,
        borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.04)',
    },

    // Content
    contentArea: {
        padding: Neo.spacing.lg,
        marginTop: -16,
    },
    sectionTitle: {
        fontSize: 13, fontWeight: '800', letterSpacing: 0.5,
        color: Neo.colors.neutral[700],
        marginTop: Neo.spacing.lg,
        marginBottom: Neo.spacing.sm,
    },
    sectionCard: {
        borderRadius: 20,
        padding: 16,
    },

    // Alerts
    alertCard: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 10,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    alertSeverityTag: {
        paddingHorizontal: 10, paddingVertical: 3,
        borderRadius: 8,
    },
    alertSeverityText: {
        fontSize: 10, fontWeight: '900', letterSpacing: 0.5,
    },
    alertTitle: {
        fontSize: 15, fontWeight: '800', marginBottom: 4,
    },
    alertMessage: {
        fontSize: 13, color: Neo.colors.neutral[700],
        lineHeight: 19,
    },
    alertAction: {
        flexDirection: 'row', alignItems: 'center',
        marginTop: 10, gap: 6,
        paddingTop: 10,
        borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)',
    },
    alertActionText: {
        fontSize: 12, fontWeight: '700',
    },

    // Risks
    riskItem: {
        flexDirection: 'row', alignItems: 'flex-start',
        marginBottom: 10, gap: 8,
    },
    riskText: {
        flex: 1, fontSize: 13, color: Neo.colors.neutral[700],
        lineHeight: 18,
    },

    // GHS
    ghsItem: {
        flexDirection: 'row', alignItems: 'flex-start',
        marginBottom: 10, gap: 10,
    },
    ghsCodeBadge: {
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 6, minWidth: 45, alignItems: 'center',
    },
    ghsCode: {
        fontSize: 11, fontWeight: '800', color: '#C62828',
    },
    ghsText: {
        flex: 1, fontSize: 13, color: Neo.colors.neutral[700],
        lineHeight: 18,
    },
    ghsSource: {
        fontSize: 10, color: Neo.colors.neutral[400],
        textAlign: 'right', marginTop: 8, fontStyle: 'italic',
    },

    // First Aid
    firstAidItem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    firstAidHeader: {
        flexDirection: 'row', alignItems: 'center',
        marginBottom: 6, gap: 8,
    },
    firstAidLabel: {
        fontSize: 13, fontWeight: '800',
        color: Neo.colors.neutral[800],
    },
    firstAidText: {
        fontSize: 13, color: Neo.colors.neutral[600],
        lineHeight: 19, paddingLeft: 30,
    },

    // Prevention
    preventionItem: {
        flexDirection: 'row', alignItems: 'flex-start',
        marginBottom: 8, gap: 8,
    },
    preventionCheck: {
        fontSize: 14, fontWeight: '800',
        color: Neo.colors.primary[600],
    },
    preventionText: {
        flex: 1, fontSize: 13, color: Neo.colors.neutral[700],
        lineHeight: 18,
    },

    // EPA
    epaRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    epaLabel: {
        fontSize: 13, fontWeight: '600', color: Neo.colors.neutral[600],
    },
    epaValue: {
        fontSize: 13, fontWeight: '700', color: Neo.colors.neutral[800],
        maxWidth: '50%', textAlign: 'right',
    },

    // CIATOX
    ciatoxButton: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 16, padding: 18,
        marginTop: Neo.spacing.lg,
        ...Neo.shadows.md,
    },
    ciatoxTitle: {
        fontSize: 16, fontWeight: '800', color: '#FFF',
    },
    ciatoxNumber: {
        fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2,
    },

    // IA Button
    iaButton: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16, padding: 16,
        marginTop: Neo.spacing.md,
        borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)',
    },
    iaTitle: {
        fontSize: 14, fontWeight: '700', color: Neo.colors.neutral[800],
    },
    iaSubtitle: {
        fontSize: 11, color: Neo.colors.neutral[500], marginTop: 1,
    },

    // New Search
    newSearchButton: {
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 16, padding: 16,
        marginTop: Neo.spacing.md,
        borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)',
        gap: 8,
    },
    newSearchText: {
        fontSize: 15, fontWeight: '700', color: Neo.colors.primary[600],
    },
});
