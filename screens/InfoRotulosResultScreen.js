/**
 * InfoRotulosResultScreen.js
 * Tela de resultado do InfoRótulos
 *
 * Exibe:
 *   - Header colorido por severidade (sinal visual crítico para segurança)
 *   - Alertas personalizados (RuleEngine × Perfil)
 *   - Classificação GHS traduzida
 *   - Primeiros socorros por via de exposição
 *   - Prevenção
 *   - CIATOX
 *   - Re-escanear via câmera (opcional)
 */

import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Linking, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { Body, Small, Caption } from '../components/NeoTypography';
import FadeInView from '../components/FadeInView';
import { useTranslation } from 'react-i18next';
import { SkeletonCard } from '../components/SkeletonLoader';

import { evaluateProduct } from '../services/InfoRotulosRuleEngine';
import { getSubstancesForIngredients } from '../services/InfoRotulosSubstanceService';
import { NIVEIS_PERIGO } from '../data/produtos_scanner';
import { getPoisonControlDial, getPoisonControlLabel } from '../utils/emergencyTokens';

// Cores por severidade — agora centralizadas no Design System (DS.severity)
// Mapeador: nome em português (vindo dos dados) → chave canônica no DS
const SEVERITY_KEY_MAP = {
    'Extremo':       'extreme',
    'Muito Alto':    'veryHigh',
    'Alto':          'high',
    'Médio':         'medium',
    'Baixo':         'low',
    'Indeterminado': 'indeterminate',
};
const getSeverityColor = (label) => {
    const key = SEVERITY_KEY_MAP[label] || SEVERITY_KEY_MAP[findClosestSeverity(label)] || 'indeterminate';
    return Neo.colors.severity[key];
};

// Pictogramas funcionais (não "cara de IA" — iconografia universal de primeiros socorros)
const FIRST_AID_ICONS = {
    ingestao:        { emoji: '💧', label: 'Se INGERIR' },
    contato_pele:    { emoji: '✋', label: 'Se TOCAR NA PELE' },
    contato_olhos:   { emoji: '👁️', label: 'Se CAIR NOS OLHOS' },
    inalacao:        { emoji: '💨', label: 'Se INALAR' },
    pele:            { emoji: '✋', label: 'Se TOCAR NA PELE' },
    olhos:           { emoji: '👁️', label: 'Se CAIR NOS OLHOS' },
    queimadura:      { emoji: '🔥', label: 'Se QUEIMAR' },
    reacao:          { emoji: '⚡', label: 'Se REAÇÃO ALÉRGICA' },
    ingestao_pet:    { emoji: '🐾', label: 'Se PET INGERIR' },
    ingestao_humana: { emoji: '💧', label: 'Se HUMANO INGERIR' },
};

// Labels limpas para fonte (sem emoji prefix — cor faz o trabalho)
const SOURCE_LABELS = {
    local:               { label: 'Base local', color: '#4CAF50' },
    open_food_facts:     { label: 'Open Food Facts', color: '#2196F3' },
    open_beauty_facts:   { label: 'Open Beauty Facts', color: '#E91E63' },
    open_products_facts: { label: 'Open Products Facts', color: '#FF9800' },
    upcitemdb:           { label: 'UPCitemdb', color: '#9C27B0' },
    not_found:           { label: 'Não encontrado', color: '#9E9E9E' },
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
    const severityColor = getSeverityColor(perigo);
    const sourceInfo = SOURCE_LABELS[source] || SOURCE_LABELS['not_found'];

    const isExternalSource = ['open_food_facts', 'open_beauty_facts', 'open_products_facts', 'upcitemdb'].includes(source);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        try {
            if (product && !substance) {
                setLoading(true);

                let ingredientesToSearch = product.componentes || [];

                if (ingredientesToSearch.length === 0 && (ingredientes_texto || product.ingredientes_texto)) {
                    const rawText = ingredientes_texto || product.ingredientes_texto || '';
                    ingredientesToSearch = rawText
                        .split(/[,;.]/)
                        .map(s => s.trim())
                        .filter(s => s.length > 2);

                    if (__DEV__) console.log('[InfoRotulosResult] Ingredientes parseados:', ingredientesToSearch);
                }

                if (ingredientesToSearch.length > 0) {
                    setEnriching(true);
                    const substancesData = await getSubstancesForIngredients(ingredientesToSearch);
                    if (substancesData.length > 0) {
                        setSubstanceData(substancesData[0]);
                    }
                    setEnriching(false);
                }

                setLoading(false);
            }

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

    useEffect(() => {
        if (substanceData) {
            evaluateProduct(substanceData, product).then(setAlerts);
        }
    }, [substanceData]);

    const firstAid = {
        ...(substanceData?.first_aid || {}),
        ...(productData.primeiros_socorros || {}),
    };

    const hazardStatements = substanceData?.hazard_statements || [];
    const precautionary = substanceData?.precautionary || [];

    const prevencao = productData.prevencao || [];
    const riscos = productData.riscos || [];

    const componentesDisplay = productData.componentes || [];

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['left', 'right']}>
                <StatusBar style="light" />

                <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: 220 }}>

                    {/* HERO colorido por severidade — sinal de risco instantâneo */}
                    <LinearGradient
                        colors={[severityColor.bg, severityColor.bg + 'CC']}
                        style={s.heroHeader}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <SafeAreaView edges={['top']}>
                            <View style={s.heroNav}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={s.heroBackBtn}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    accessibilityRole="button"
                                    accessibilityLabel={t('common.back', 'Voltar')}
                                >
                                    <NeoIcon name="ArrowLeft2" size={22} color={severityColor.text} />
                                </TouchableOpacity>
                                <Caption style={{ color: severityColor.text, opacity: 0.85, fontWeight: '700', letterSpacing: 0.5 }}>
                                    {t('headersFirst.infoRTulos', 'INFO RÓTULOS')}
                                </Caption>
                            </View>
                        </SafeAreaView>

                        <View style={s.heroContent}>
                            <NeoIcon name={productData.icone || 'TestTube'} size={34} color={severityColor.text} variant="Bold" />
                            <Text style={[s.heroTitle, { color: severityColor.text }]}>{nome}</Text>
                            {brandName ? (
                                <Text style={[s.heroSubtitle, { color: severityColor.text + 'DD', fontWeight: '600' }]}>
                                    {brandName}
                                </Text>
                            ) : null}
                            <Text style={[s.heroSubtitle, { color: severityColor.text + 'BB' }]}>{categoria}</Text>

                            <View style={s.heroBadges}>
                                <View style={[s.severityBadge, { backgroundColor: severityColor.accent + '30', flexDirection: 'row', alignItems: 'center' }]}>
                                    {/* O nível de perigo vinha como bolinha colorida em emoji
                                        (🔴🟠🟡🟢) concatenada ao texto. O ícone traz a cor do
                                        DS via `severityColor`, em vez da cor fixa do emoji. */}
                                    <NeoIcon
                                        name={NIVEIS_PERIGO[perigo]?.icone || 'Warning2'}
                                        size={12}
                                        color={severityColor.text}
                                        variant="Bold"
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text style={[s.severityText, { color: severityColor.text }]}>
                                        {perigo.toUpperCase()}
                                    </Text>
                                </View>

                                <View style={[s.sourceBadge, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
                                    <View style={[s.sourceDot, { backgroundColor: sourceInfo.color }]} />
                                    <Text style={[s.sourceText, { color: severityColor.text }]}>
                                        {sourceInfo.label}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={s.contentArea}>

                        {loading && (
                            <View style={{ marginTop: 12 }}>
                                <SkeletonCard hasAvatar={false} lines={3} />
                            </View>
                        )}

                        {/* ALERTAS PERSONALIZADOS */}
                        {alerts.length > 0 && (
                            <FadeInView delay={100}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultAlerts', 'Alertas para você') || '').toUpperCase()}</Text>
                                {alerts.map((alert, idx) => (
                                    <NeoCard
                                        key={idx}
                                        variant="elevated"
                                        style={[s.alertCard, { borderLeftWidth: 4, borderLeftColor: alert.color }]}
                                    >
                                        <View style={s.alertHeader}>
                                            <Text style={{ fontSize: 20 }}>{alert.icon}</Text>
                                            <View style={[s.alertSeverityTag, { backgroundColor: alert.color + '20' }]}>
                                                <Text style={[s.alertSeverityText, { color: alert.color }]}>
                                                    {alert.label}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={[s.alertTitle, { color: alert.color }]}>{alert.title}</Text>
                                        <Text style={s.alertMessage}>{alert.message}</Text>

                                        {alert.action && (
                                            <View style={s.alertAction}>
                                                <NeoIcon name="ShieldTick" size={14} color={alert.color} variant="Bold" />
                                                <Text style={[s.alertActionText, { color: alert.color }]}>
                                                    {alert.action}
                                                </Text>
                                            </View>
                                        )}
                                    </NeoCard>
                                ))}
                            </FadeInView>
                        )}

                        {/* INGREDIENTES (fonte externa) */}
                        {isExternalSource && componentesDisplay.length > 0 && (
                            <FadeInView delay={150}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultIngredients', 'Ingredientes') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    <Text style={s.ingredientesText}>
                                        {componentesDisplay.join(', ')}
                                    </Text>
                                    {enriching && (
                                        <View style={s.enrichingRow}>
                                            <ActivityIndicator size="small" color={Neo.colors.primary[500]} />
                                            <Small style={{ marginLeft: 8, color: Neo.colors.neutral[500] }}>
                                                {t('scanner.loadingEpa', 'Consultando bases toxicológicas…')}
                                            </Small>
                                        </View>
                                    )}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* RISCOS */}
                        {riscos.length > 0 && (
                            <FadeInView delay={200}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultRisks', 'Principais riscos') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {riscos.map((risco, idx) => (
                                        <View key={idx} style={s.riskItem}>
                                            <NeoIcon name="Warning2" size={16} color="#E65100" variant="Bold" />
                                            <Text style={s.riskText}>{risco}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* GHS */}
                        {hazardStatements.length > 0 && (
                            <FadeInView delay={250}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultGhs', 'Classificação GHS') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {hazardStatements.map((stmt, idx) => (
                                        <View key={idx} style={s.ghsItem}>
                                            <View style={s.ghsCodeBadge}>
                                                <Text style={s.ghsCode}>{stmt.code}</Text>
                                            </View>
                                            <Text style={s.ghsText}>{stmt.text_pt}</Text>
                                        </View>
                                    ))}
                                    <Text style={s.ghsSource}>
                                        Fonte: PubChem (NIH/NLM)
                                        {substanceData?.source === 'pubchem+epa' ? ' + EPA CTX' : ''}
                                    </Text>
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* PRIMEIROS SOCORROS */}
                        {Object.keys(firstAid).length > 0 && (
                            <FadeInView delay={300}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultFirstAid', 'Primeiros socorros') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {Object.entries(firstAid).map(([key, value]) => {
                                        if (!value) return null;
                                        const icon = FIRST_AID_ICONS[key] || { emoji: '🩹', label: key };
                                        return (
                                            <View key={key} style={s.firstAidItem}>
                                                <View style={s.firstAidHeader}>
                                                    <Text style={{ fontSize: 18 }}>{icon.emoji}</Text>
                                                    <Text style={s.firstAidLabel}>{icon.label}</Text>
                                                </View>
                                                <Text style={s.firstAidText}>{value}</Text>
                                            </View>
                                        );
                                    })}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* PREVENÇÃO */}
                        {prevencao.length > 0 && (
                            <FadeInView delay={350}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultPrevention', 'Prevenção') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {prevencao.map((item, idx) => (
                                        <View key={idx} style={s.preventionItem}>
                                            <NeoIcon name="TickCircle" size={16} color={Neo.colors.primary[600]} variant="Bold" />
                                            <Text style={s.preventionText}>{item}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* PRECAUÇÕES GHS */}
                        {precautionary.length > 0 && (
                            <FadeInView delay={400}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultPrecaution', 'Precauções') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {precautionary.map((stmt, idx) => (
                                        <View key={idx} style={s.ghsItem}>
                                            <View style={[s.ghsCodeBadge, { backgroundColor: '#E3F2FD' }]}>
                                                <Text style={[s.ghsCode, { color: '#1565C0' }]}>{stmt.code}</Text>
                                            </View>
                                            <Text style={s.ghsText}>{stmt.text}</Text>
                                        </View>
                                    ))}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* EPA CTX */}
                        {substanceData?.epa_ld50 && (
                            <FadeInView delay={420}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultEpa', 'Dados toxicológicos') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {substanceData.epa_ld50 && (
                                        <View style={s.epaRow}>
                                            <Text style={s.epaLabel}>{t('headersFirst.lD50DoseLetalOral', 'LD50 (dose letal oral)')}</Text>
                                            <Text style={s.epaValue}>{substanceData.epa_ld50}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_carcinogenicity && (
                                        <View style={s.epaRow}>
                                            <Text style={s.epaLabel}>{t('headersFirst.carcinogenicidade', 'Carcinogenicidade')}</Text>
                                            <Text style={s.epaValue}>{substanceData.epa_carcinogenicity}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_genotoxicity && (
                                        <View style={s.epaRow}>
                                            <Text style={s.epaLabel}>{t('headersFirst.genotoxicidade', 'Genotoxicidade')}</Text>
                                            <Text style={s.epaValue}>{substanceData.epa_genotoxicity}</Text>
                                        </View>
                                    )}
                                    {substanceData.epa_reproductive_toxicity && (
                                        <View style={s.epaRow}>
                                            <Text style={s.epaLabel}>{t('headersFirst.toxicidadeReprodutiva', 'Toxicidade Reprodutiva')}</Text>
                                            <Text style={s.epaValue}>{substanceData.epa_reproductive_toxicity}</Text>
                                        </View>
                                    )}
                                    <Text style={s.ghsSource}>{t('headersFirst.fonteEPAComputationalToxicology', 'Fonte: EPA Computational Toxicology')}</Text>
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* CIATOX — emergência, fica em vermelho destacado */}
                        <FadeInView delay={450}>
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => Linking.openURL(`tel:${getPoisonControlDial()}`)}
                                style={s.ciatoxButton}
                            >
                                <NeoIcon name="Call" size={22} color="#FFF" variant="Bold" />
                                <View style={{ flex: 1, marginLeft: 12 }}>
                                    <Text style={s.ciatoxTitle}>{t('scanner.callCiatox', 'Ligar para o CIATOX')}</Text>
                                    <Text style={s.ciatoxNumber}>{t('scanner.ciatoxNumber', { defaultValue: '{{poisonControl}} · gratuito 24h', poisonControl: getPoisonControlLabel() })}</Text>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>

                        {/* ESCANEAR ROTULO — re-uso da câmera */}
                        <FadeInView delay={500}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.push('Scanner', { mode: 'label_scan' })}
                                style={s.actionButton}
                            >
                                <View style={s.actionIconWrap}>
                                    <NeoIcon name="Scan" size={18} color={Neo.colors.primary[600]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.actionTitle}>{t('scanner.analyzeWithAi', 'Escanear outro rótulo')}</Text>
                                    <Text style={s.actionSubtitle}>{t('scanner.analyzeWithAiSub', 'Use a câmera para ler outra etiqueta')}</Text>
                                </View>
                                <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.primary[600]} />
                            </TouchableOpacity>
                        </FadeInView>

                        {/* NOVA CONSULTA */}
                        <FadeInView delay={550}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('InfoRotulos')}
                                style={s.newSearchButton}
                            >
                                <NeoIcon name="SearchNormal1" size={18} color={Neo.colors.primary[600]} />
                                <Text style={s.newSearchText}>{t('scanner.newSearch', 'Nova consulta')}</Text>
                            </TouchableOpacity>
                        </FadeInView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Casamento de severidade para variantes como "Médio (Humanos) / Mortal (Gatos)"
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

const s = StyleSheet.create({
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
        gap: 12,
    },
    heroBackBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 10,
    },
    heroIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    heroSubtitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 12,
    },
    heroBadges: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
    },
    severityBadge: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 12,
    },
    severityText: {
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    },
    sourceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10,
        gap: 6,
    },
    sourceDot: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
    },
    sourceText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    ingredientesText: {
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 20,
    },
    enrichingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.04)',
    },

    // Content
    contentArea: {
        padding: Neo.spacing.lg,
        marginTop: -16,
    },
    sectionLabel: {
        fontSize: 11.5,
        fontWeight: '800',
        letterSpacing: 1.2,
        color: Neo.colors.neutral[600],
        marginTop: Neo.spacing.lg,
        marginBottom: Neo.spacing.sm,
        textTransform: 'uppercase',
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
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
    },
    alertSeverityText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    alertTitle: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 4,
    },
    alertMessage: {
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 19,
    },
    alertAction: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 6,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    alertActionText: {
        fontSize: 12,
        fontWeight: '700',
    },

    // Risks
    riskItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 8,
    },
    riskText: {
        flex: 1,
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 18,
    },

    // GHS
    ghsItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 10,
    },
    ghsCodeBadge: {
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        minWidth: 45,
        alignItems: 'center',
    },
    ghsCode: {
        fontSize: 11,
        fontWeight: '800',
        color: '#C62828',
    },
    ghsText: {
        flex: 1,
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 18,
    },
    ghsSource: {
        fontSize: 10,
        color: Neo.colors.neutral[500],
        textAlign: 'right',
        marginTop: 8,
        fontStyle: 'italic',
    },

    // First Aid
    firstAidItem: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    firstAidHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    firstAidLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: Neo.colors.neutral[800],
    },
    firstAidText: {
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 19,
        paddingLeft: 30,
    },

    // Prevention
    preventionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 8,
    },
    preventionText: {
        flex: 1,
        fontSize: 13,
        color: Neo.colors.neutral[700],
        lineHeight: 18,
    },

    // EPA
    epaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    epaLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: Neo.colors.neutral[600],
    },
    epaValue: {
        fontSize: 13,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        maxWidth: '50%',
        textAlign: 'right',
    },

    // CIATOX — vermelho de emergência (mantido)
    ciatoxButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 16,
        padding: 18,
        marginTop: Neo.spacing.lg,
    },
    ciatoxTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#FFF',
    },
    ciatoxNumber: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 2,
    },

    // Action button (escanear)
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 16,
        padding: 14,
        marginTop: Neo.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
        gap: 12,
    },
    actionIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Neo.colors.primary[600] + '1A',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
    },
    actionSubtitle: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        marginTop: 2,
    },

    // New Search
    newSearchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 16,
        padding: 16,
        marginTop: Neo.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
        gap: 8,
    },
    newSearchText: {
        fontSize: 15,
        fontWeight: '700',
        color: Neo.colors.primary[600],
    },
});
