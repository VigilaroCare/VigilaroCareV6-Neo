import { LinearGradient } from 'expo-linear-gradient';
/**
 * InfoRotulosScreen.js
 * Hub do módulo InfoRótulos
 *
 * 3 pontos de entrada:
 *   - Busca por nome/ingrediente (autocomplete local + PubChem)
 *   - Scan de código de barras (câmera)
 *   - Histórico recente
 *
 * Exibe: contexto familiar, histórico, CIATOX, disclaimer
 */

import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import ReviewImage from '../components/ReviewImage';
import { Body, Small, Caption, Eyebrow } from '../components/NeoTypography';
import FadeInView from '../components/FadeInView';
import { useIsDark, useThemeColors } from '../utils/ThemeContext';

import { buscarProdutoPorNome } from '../data/produtos_scanner';
import { getFamilySummary } from '../services/InfoRotulosRuleEngine';
import { getHistory, addToHistory } from '../services/inforotulos_cache';
import { getSubstanceByName } from '../services/InfoRotulosSubstanceService';
import NeoAlert from '../utils/NeoAlert';

export default function InfoRotulosScreen() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const isDark = useIsDark();
    const themeColors = useThemeColors();
    const searchRef = useRef(null);
    const searchTimeout = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [familySummary, setFamilySummary] = useState(null);
    const [history, setHistory] = useState([]);

    useFocusEffect(useCallback(() => {
        (async () => {
            try { setFamilySummary(await getFamilySummary()); } catch (_) {}
            try { setHistory(await getHistory(5)); } catch (_) {}
        })();
    }, []));

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        if (!text.trim()) {
            setSearchResults([]);
            return;
        }
        searchTimeout.current = setTimeout(() => {
            const localResults = buscarProdutoPorNome(text);
            setSearchResults(localResults.slice(0, 8));
        }, 300);
    };

    const handleProductSelect = async (product) => {
        setSearchQuery('');
        setSearchResults([]);
        await addToHistory({
            id: product.barcode || product.nome,
            nome: product.nome,
            categoria: product.categoria,
            icone: product.icone || '🧪',
            perigo: product.perigo,
        });
        navigation.navigate('InfoRotulosResult', { product, source: 'local' });
    };

    const handleSearchSubmit = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const data = await getSubstanceByName(searchQuery.trim());
            if (data) {
                await addToHistory({
                    id: data.pubchem_cid || searchQuery,
                    nome: data.name_pt || searchQuery,
                    categoria: t('inforotulos.substance', 'Substância'),
                    icone: '🧪',
                    perigo: data.severity || 'Indeterminado',
                });
                navigation.navigate('InfoRotulosResult', {
                    substance: data, source: 'pubchem', searchQuery: searchQuery.trim(),
                });
            } else {
                NeoAlert.alert(
                    t('inforotulos.notFoundTitle', 'Substância não encontrada'),
                    t('inforotulos.notFoundDesc', { query: searchQuery, defaultValue: `"${searchQuery}" não foi encontrada nas bases de dados.` }),
                    [{ text: 'OK' }]
                );
            }
        } catch {
            NeoAlert.alert(
                t('inforotulos.errorTitle', 'Erro'),
                t('inforotulos.errorDesc', 'Falha na busca. Verifique sua conexão.')
            );
        } finally {
            setIsSearching(false);
        }
    };

    const handleBarcodeScan = () => {
        navigation.navigate('Scanner', { mode: 'barcode_scan', returnTo: 'InfoRotulos' });
    };

    const handleHistorySelect = async (item) => {
        const data = await getSubstanceByName(item.nome);
        if (data) {
            navigation.navigate('InfoRotulosResult', {
                substance: data, source: 'cache', searchQuery: item.nome,
            });
        } else {
            navigation.navigate('InfoRotulosResult', {
                product: {
                    nome: item.nome, categoria: item.categoria,
                    perigo: item.perigo, icone: item.icone,
                },
                source: 'history',
            });
        }
    };

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

    const titleStr = t('inforotulos.headerTitle', 'Info Rótulos');
    const capaSource = require('../assets/illustrations/pad/hero_rotulos.jpg');

    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const hairline = isDark ? 'rgba(255,255,255,0.08)' : themeColors.neutral[200];
    const hairlineSoft = isDark ? 'rgba(255,255,255,0.05)' : themeColors.neutral[100];

    return (
        <AppBackground>
            <StatusBar style="light" translucent backgroundColor="transparent" />

            {/* Float Header / Back Button — mesmo padrao de Cuidar & Proteger / Riscos Fisicos */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors.neutral[800],
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={titleStr}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', isDark ? themeColors.neutral[100] : themeColors.neutral.white]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
                    />
                    <View style={{ position: 'absolute', bottom: 24, paddingHorizontal: 22, width: '100%' }}>
                        <Text style={{ fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: -0.8, lineHeight: 38 }}>
                            {titleStr}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>

                    {/* CAMPO DE BUSCA */}
                    <FadeInView delay={80}>
                        <NeoCard variant="elevated" style={s.searchCard}>
                            <View style={s.searchRow}>
                                <NeoIcon name="SearchNormal1" size={20} color={textMuted} variant="Bold" />
                                <TextInput
                                    ref={searchRef}
                                    style={[s.searchInput, { color: textPrimary }]}
                                    placeholder={t('inforotulos.searchPlaceholder', 'Buscar produto ou ingrediente…')}
                                    placeholderTextColor={textMuted}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                    autoCorrect={false}
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
                                        <NeoIcon name="CloseCircle" size={20} color={textMuted} variant="Bold" />
                                    </TouchableOpacity>
                                )}
                                {isSearching && <ActivityIndicator size="small" color={Neo.colors.primary[500]} />}
                            </View>

                            {searchResults.length > 0 && (
                                <View style={[s.searchResults, { borderTopColor: hairline }]}>
                                    {searchResults.map((item, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[s.searchResultItem, { borderBottomColor: hairlineSoft }]}
                                            onPress={() => handleProductSelect(item)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={s.searchResultIcon}>{item.icone || '🧪'}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Body style={[s.searchResultName, { color: textPrimary }]}>{item.nome}</Body>
                                                <Small style={[s.searchResultCat, { color: textMuted }]}>{item.categoria}</Small>
                                            </View>
                                            <View style={[s.perigoTag, { backgroundColor: (item.cor || textMuted) + '22' }]}>
                                                <Caption style={[s.perigoTagText, { color: item.cor || textBody }]}>
                                                    {item.perigo}
                                                </Caption>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                    <TouchableOpacity style={s.searchOnlineBtn} onPress={handleSearchSubmit} activeOpacity={0.7}>
                                        <NeoIcon name="SearchNormal1" size={15} color={Neo.colors.primary[700]} variant="Bold" />
                                        <Caption style={s.searchOnlineText}>
                                            {t('inforotulos.searchOnline', { query: searchQuery, defaultValue: `Buscar "${searchQuery}" online` })}
                                        </Caption>
                                        <NeoIcon name="ArrowRight2" size={14} color={Neo.colors.primary[700]} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </NeoCard>
                    </FadeInView>

                    {/* BARCODE — card de acao rapida, mesma linguagem do restante do app */}
                    <FadeInView delay={150}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleBarcodeScan}
                            style={{ marginTop: 14, marginBottom: 14 }}
                        >
                            <NeoCard variant="elevated" style={s.actionCard}>
                                <View style={[s.actionIconWrap, { backgroundColor: Neo.colors.primary[600] + '22' }]}>
                                    <NeoIcon name="Scan" size={24} color={Neo.colors.primary[600]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1, marginLeft: 14 }}>
                                    <Body style={[s.actionTitle, { color: textPrimary }]}>
                                        {t('inforotulos.barcodeTitle', 'Escanear código de barras')}
                                    </Body>
                                    <Small style={[s.actionSub, { color: textMuted }]}>
                                        {t('inforotulos.barcodeSub', 'Aponte a câmera para identificar o produto')}
                                    </Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={textMuted} />
                            </NeoCard>
                        </TouchableOpacity>
                    </FadeInView>

                    {/* CONTEXTO FAMILIAR */}
                    {familySummary && (
                        <FadeInView delay={220}>
                            <NeoCard variant="elevated" style={[
                                s.familyCard,
                                familySummary.hasVulnerables
                                    ? { borderColor: 'rgba(245,158,11,0.4)', borderWidth: 1 }
                                    : null,
                            ]}>
                                <View style={[s.familyIconWrap, {
                                    backgroundColor: familySummary.hasVulnerables
                                        ? 'rgba(245,158,11,0.22)'
                                        : Neo.colors.primary[600] + '22',
                                }]}>
                                    <NeoIcon
                                        name={familySummary.hasVulnerables ? 'Warning2' : 'People'}
                                        size={20}
                                        color={familySummary.hasVulnerables ? '#B45309' : Neo.colors.primary[700]}
                                        variant="Bold"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Body style={[s.familyTitle, { color: textPrimary }]}>
                                        {t('inforotulos.familyProfile', 'Seu perfil familiar')}
                                    </Body>
                                    <Small style={[s.familyText, { color: textBody }]}>{familySummary.text}</Small>
                                    {familySummary.hasVulnerables && (
                                        <Caption style={s.familyWarning}>
                                            {t('inforotulos.personalizedAlerts', 'Alertas personalizados aparecerão nos resultados.')}
                                        </Caption>
                                    )}
                                </View>
                            </NeoCard>
                        </FadeInView>
                    )}

                    {/* HISTÓRICO */}
                    <FadeInView delay={280}>
                        <Eyebrow style={[s.sectionLabel, { color: textMuted }]}>
                            {t('inforotulos.recentSearches', 'Consultas recentes')}
                        </Eyebrow>
                        {history.length > 0 ? (
                            <NeoCard variant="elevated" style={s.historyCard}>
                                {history.map((item, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[s.historyItem, idx < history.length - 1 && { borderBottomWidth: 1, borderBottomColor: hairlineSoft }]}
                                        onPress={() => handleHistorySelect(item)}
                                        activeOpacity={0.7}
                                    >
                                        <Small style={{ fontSize: 18, marginRight: 12 }}>{item.icone || '🧪'}</Small>
                                        <View style={{ flex: 1 }}>
                                            <Body style={[s.historyName, { color: textPrimary }]}>{item.nome}</Body>
                                            <Caption style={[s.historyDate, { color: textMuted }]}>
                                                {formatRelativeTime(item.consultedAt)}
                                            </Caption>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={16} color={textMuted} />
                                    </TouchableOpacity>
                                ))}
                            </NeoCard>
                        ) : (
                            <NeoCard variant="elevated" style={{ padding: 24, alignItems: 'center', borderRadius: 18 }}>
                                <NeoIcon name="SearchNormal1" size={32} color={textMuted} />
                                <Body style={{ color: textMuted, marginTop: 10, textAlign: 'center' }}>
                                    {t('inforotulos.emptyHistory', 'Seus produtos consultados aparecerão aqui.')}
                                </Body>
                                <Caption style={{ color: textMuted, marginTop: 4, textAlign: 'center' }}>
                                    {t('inforotulos.emptyHistoryHint', 'Use a busca ou o scanner para começar.')}
                                </Caption>
                            </NeoCard>
                        )}
                    </FadeInView>

                    {/* CIATOX — vermelho solido fixo (reservado a emergencia real, nao segue tema) */}
                    <FadeInView delay={350}>
                        <Eyebrow style={[s.sectionLabel, { color: textMuted }]}>
                            {t('inforotulos.emergencyLabel', 'Em caso de intoxicação')}
                        </Eyebrow>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => Linking.openURL('tel:08007226001')}
                        >
                            <View style={s.ciatoxCard}>
                                <View style={s.ciatoxIconWrap}>
                                    <NeoIcon name="Call" size={22} color="#FFF" variant="Bold" />
                                </View>
                                <View style={{ flex: 1, marginLeft: 14 }}>
                                    <Body style={s.ciatoxTitle}>
                                        {t('inforotulos.ciatoxTitle', 'CIATOX — Emergência toxicológica')}
                                    </Body>
                                    <Small style={s.ciatoxNumber}>
                                        {t('inforotulos.ciatoxNumber', '0800 722 6001 · Gratuito, 24h')}
                                    </Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color="rgba(255,255,255,0.85)" />
                            </View>
                        </TouchableOpacity>
                    </FadeInView>

                    {/* DISCLAIMER — em destaque, nunca letra miuda (feedback_disclaimers_destaque) */}
                    <View style={[s.disclaimerBox, {
                        backgroundColor: themeColors.feedback.warning + '1A',
                        borderColor: themeColors.feedback.warning + '40',
                    }]}>
                        <NeoIcon name="InfoCircle" size={18} color={themeColors.feedback.warning} variant="Bold" />
                        <Small style={[s.disclaimerText, { color: textBody }]}>
                            {t('inforotulos.disclaimer', 'O Vigilaro Care não substitui avaliação de um toxicologista, engenheiro químico ou profissional de saúde. Use as informações como referência educativa. Em caso de intoxicação, ligue imediatamente para o CIATOX ou SAMU.')}
                        </Small>
                    </View>
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

function formatRelativeTime(timestamp) {
    if (!timestamp) return '';
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `há ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `há ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`;
    return `há ${Math.floor(days / 7)} semana${Math.floor(days / 7) > 1 ? 's' : ''}`;
}

const s = StyleSheet.create({
    // Section labels (cor aplicada inline via textMuted, theme-aware)
    sectionLabel: {
        fontSize: 11, fontWeight: '900',
        letterSpacing: 1.6, marginTop: 22, marginBottom: 10, textTransform: 'uppercase',
    },

    // Search — fundo/borda vem do proprio NeoCard (glass theme-aware), so estrutura aqui
    searchCard: {
        borderRadius: 20, padding: 0, overflow: 'hidden',
    },
    searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
    searchInput: { flex: 1, fontSize: 15, fontWeight: '500' },
    searchResults: { borderTopWidth: 1 },
    searchResultItem: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1,
    },
    searchResultIcon: { fontSize: 22, marginRight: 12 },
    searchResultName: { fontSize: 14, fontWeight: '700' },
    searchResultCat: { marginTop: 1 },
    perigoTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    perigoTagText: { fontSize: 9.5, fontWeight: '800', letterSpacing: 0.3 },
    searchOnlineBtn: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 8,
        backgroundColor: 'rgba(16,185,129,0.15)',
    },
    searchOnlineText: { flex: 1, fontWeight: '700', color: '#81C784', fontSize: 12 },

    // Generic action card (Barcode)
    actionCard: {
        flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 18,
    },
    actionIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
    actionTitle: { fontWeight: '800', fontSize: 15, marginBottom: 2 },
    actionSub: { lineHeight: 16 },

    // Family card
    familyCard: {
        flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 18, gap: 12,
    },
    familyIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    familyTitle: { fontWeight: '800', marginBottom: 2 },
    familyText: { lineHeight: 17 },
    familyWarning: { color: '#F59E0B', fontWeight: '700', marginTop: 6 },

    // History
    historyCard: {
        padding: 0, borderRadius: 18, overflow: 'hidden',
    },
    historyItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12 },
    historyName: { fontWeight: '700', fontSize: 14 },
    historyDate: { marginTop: 1 },

    // CIATOX — vermelho solido fixo, nao usa NeoCard/glass (emergencia = sempre visivel igual)
    ciatoxCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#D32F2F', padding: 14, borderRadius: 18,
    },
    ciatoxIconWrap: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.22)',
        alignItems: 'center', justifyContent: 'center',
    },
    ciatoxTitle: { fontWeight: '800', color: '#FFF', fontSize: 14 },
    ciatoxNumber: { color: 'rgba(255,255,255,0.85)', marginTop: 2 },

    // Disclaimer — em destaque (icone + fundo de aviso), nunca letra miuda apagada
    disclaimerBox: {
        flexDirection: 'row', alignItems: 'flex-start', gap: 10,
        marginTop: 22, padding: 14, borderRadius: 14, borderWidth: 1,
    },
    disclaimerText: {
        flex: 1, lineHeight: 18, fontSize: 12.5,
    },
});
