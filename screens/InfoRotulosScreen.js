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
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ActivityIndicator,
  Animated,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H1, Body, Small, Caption, Eyebrow } from '../components/NeoTypography';
import NeoScreenHeader from '../components/NeoScreenHeader';
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
    const subtitleStr = t('inforotulos.headerSubtitle', 'Segurança em produtos para sua família');
    const capaSource = require('../assets/illustrations/pad/hero_rotulos.jpg');

    return (
        <View style={{ flex: 1, backgroundColor: '#020617' }}>
            <StatusBar style="light" backgroundColor="transparent" translucent />
            
                

                
            <Image
                source={capaSource}
                style={[StyleSheet.absoluteFill, { opacity: 0.15 }]}
                resizeMode="cover"
                blurRadius={30}
                accessibilityLabel={titleStr}
            />
            <LinearGradient
                colors={['rgba(2,6,23,0.4)', '#020617']}
                style={StyleSheet.absoluteFill}
            />

            {/* HEADER CENTRALIZADO (Estilo Scanner) */}
            <SafeAreaView edges={['top']} style={{ zIndex: 100 }}>
                <View style={{
                    padding: 24, paddingTop: 20,
                    alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ position: 'absolute', top: 20, left: 20, padding: 8 }}
                        accessibilityRole="button"
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <View style={{
                        width: 80, height: 80, borderRadius: 40,
                        backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
                        justifyContent: 'center', alignItems: 'center', marginBottom: 16
                    }}>
                        <NeoIcon name="Barcode" size={40} color="#FFF" />
                    </View>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 8 }}>{titleStr}</Text>
                    <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 }}>
                        {subtitleStr}
                    </Text>
                </View>
            </SafeAreaView>

            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >

                {/* Main Content */}
                <View style={{ paddingTop: 24 }}>


                
                    {/* CAMPO DE BUSCA */}
                    <FadeInView delay={80}>
                        <NeoCard variant="elevated" style={s.searchCard}>
                            <View style={s.searchRow}>
                                <NeoIcon name="SearchNormal1" size={20} color={Neo.colors.neutral[500]} variant="Bold" />
                                <TextInput
                                    ref={searchRef}
                                    style={s.searchInput}
                                    placeholder={t('inforotulos.searchPlaceholder', 'Buscar produto ou ingrediente…')}
                                    placeholderTextColor={Neo.colors.neutral[500]}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                    autoCorrect={false}
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
                                        <NeoIcon name="CloseCircle" size={20} color={Neo.colors.neutral[500]} variant="Bold" />
                                    </TouchableOpacity>
                                )}
                                {isSearching && <ActivityIndicator size="small" color={Neo.colors.primary[500]} />}
                            </View>

                            {searchResults.length > 0 && (
                                <View style={s.searchResults}>
                                    {searchResults.map((item, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={s.searchResultItem}
                                            onPress={() => handleProductSelect(item)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={s.searchResultIcon}>{item.icone || '🧪'}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Body style={s.searchResultName}>{item.nome}</Body>
                                                <Small style={s.searchResultCat}>{item.categoria}</Small>
                                            </View>
                                            <View style={[s.perigoTag, { backgroundColor: (item.cor || Neo.colors.neutral[500]) + '22' }]}>
                                                <Caption style={[s.perigoTagText, { color: item.cor || Neo.colors.neutral[700] }]}>
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

                    {/* BARCODE — card horizontal flat com accent primary */}
                    <FadeInView delay={150}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleBarcodeScan}
                            style={{ marginTop: 14, marginBottom: 14 }}
                        >
                            <NeoCard variant="elevated" style={s.actionCard}>
                                <View style={[s.actionIconWrap, { backgroundColor: 'rgba(16,185,129,0.22)' }]}>
                                    <NeoIcon name="Scan" size={24} color={Neo.colors.primary[600]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1, marginLeft: 14 }}>
                                    <Body style={s.actionTitle}>
                                        {t('inforotulos.barcodeTitle', 'Escanear código de barras')}
                                    </Body>
                                    <Small style={s.actionSub}>
                                        {t('inforotulos.barcodeSub', 'Aponte a câmera para identificar o produto')}
                                    </Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
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
                                        : 'rgba(16,185,129,0.22)',
                                }]}>
                                    <NeoIcon
                                        name={familySummary.hasVulnerables ? 'Warning2' : 'People'}
                                        size={20}
                                        color={familySummary.hasVulnerables ? '#B45309' : Neo.colors.primary[700]}
                                        variant="Bold"
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Body style={s.familyTitle}>
                                        {t('inforotulos.familyProfile', 'Seu perfil familiar')}
                                    </Body>
                                    <Small style={s.familyText}>{familySummary.text}</Small>
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
                        <Eyebrow style={{ marginTop: 22, marginBottom: 10 }}>
                            {t('inforotulos.recentSearches', 'Consultas recentes')}
                        </Eyebrow>
                        {history.length > 0 ? (
                            <NeoCard variant="elevated" style={s.historyCard}>
                                {history.map((item, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[s.historyItem, idx < history.length - 1 && s.historyItemBorder]}
                                        onPress={() => handleHistorySelect(item)}
                                        activeOpacity={0.7}
                                    >
                                        <Small style={{ fontSize: 18, marginRight: 12 }}>{item.icone || '🧪'}</Small>
                                        <View style={{ flex: 1 }}>
                                            <Body style={s.historyName}>{item.nome}</Body>
                                            <Caption style={s.historyDate}>
                                                {formatRelativeTime(item.consultedAt)}
                                            </Caption>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[500]} />
                                    </TouchableOpacity>
                                ))}
                            </NeoCard>
                        ) : (
                            <NeoCard variant="elevated" style={{ padding: 24, alignItems: 'center', borderRadius: 18 }}>
                                <NeoIcon name="SearchNormal1" size={32} color={Neo.colors.neutral[400]} />
                                <Body style={{ color: Neo.colors.neutral[500], marginTop: 10, textAlign: 'center' }}>
                                    {t('inforotulos.emptyHistory', 'Seus produtos consultados aparecerão aqui.')}
                                </Body>
                                <Caption style={{ color: Neo.colors.neutral[400], marginTop: 4, textAlign: 'center' }}>
                                    {t('inforotulos.emptyHistoryHint', 'Use a busca ou o scanner para começar.')}
                                </Caption>
                            </NeoCard>
                        )}
                    </FadeInView>

                    {/* CIATOX — destaque vermelho contido (emergência real) */}
                    <FadeInView delay={350}>
                        <Eyebrow style={{ marginTop: 22, marginBottom: 10 }}>
                            {t('inforotulos.emergencyLabel', 'Em caso de intoxicação')}
                        </Eyebrow>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => Linking.openURL('tel:08007226001')}
                        >
                            <NeoCard variant="elevated" style={s.ciatoxCard}>
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
                            </NeoCard>
                        </TouchableOpacity>
                    </FadeInView>

                    {/* DISCLAIMER */}
                    <Small style={s.disclaimer}>
                        {t('inforotulos.disclaimer', 'O Vigilaro Care não substitui avaliação de um toxicologista, engenheiro químico ou profissional de saúde. Use as informações como referência educativa. Em caso de intoxicação, ligue imediatamente para o CIATOX ou SAMU.')}
                    </Small>
                </View>
            </ScrollView>
        </View>
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
    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4, paddingBottom: 18, gap: 12,
    },
    backBtn: {
        width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
    },
    title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, color: '#FFF' },
    subtitle: { color: 'rgba(255,255,255,0.7)' },

    scrollContent: { paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 190 },

    // Section labels
    sectionLabel: {
        fontSize: 11, fontWeight: '900', color: 'rgba(255,255,255,0.6)',
        letterSpacing: 1.6, marginBottom: 10, textTransform: 'uppercase',
    },

    // Search
    searchCard: {
        borderRadius: 20, padding: 0, overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
    searchInput: { flex: 1, fontSize: 15, color: '#FFF', fontWeight: '500' },
    searchResults: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
    searchResultItem: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.02)',
    },
    searchResultIcon: { fontSize: 22, marginRight: 12 },
    searchResultName: { fontSize: 14, fontWeight: '700', color: '#FFF' },
    searchResultCat: { color: 'rgba(255,255,255,0.6)', marginTop: 1 },
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
        backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    actionIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
    actionTitle: { fontWeight: '800', fontSize: 15, color: '#FFF', marginBottom: 2 },
    actionSub: { color: 'rgba(255,255,255,0.6)', lineHeight: 16 },

    // Family card
    familyCard: {
        flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 18, gap: 12,
        backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    familyIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    familyTitle: { fontWeight: '800', color: '#FFF', marginBottom: 2 },
    familyText: { color: 'rgba(255,255,255,0.7)', lineHeight: 17 },
    familyWarning: { color: '#F59E0B', fontWeight: '700', marginTop: 6 },

    // History
    historyCard: { 
        padding: 0, borderRadius: 18, overflow: 'hidden', 
        backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' 
    },
    historyItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 12 },
    historyItemBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    historyName: { fontWeight: '700', fontSize: 14, color: '#FFF' },
    historyDate: { color: 'rgba(255,255,255,0.5)', marginTop: 1 },

    // CIATOX
    ciatoxCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#D32F2F', padding: 14, borderRadius: 18,
    },
    ciatoxIconWrap: {
        width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.22)',
        alignItems: 'center', justifyContent: 'center',
    },
    ciatoxTitle: { fontWeight: '800', color: '#FFF', fontSize: 14 },
    ciatoxNumber: { color: 'rgba(255,255,255,0.85)', marginTop: 2 },

    disclaimer: {
        color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 22, lineHeight: 16, fontSize: 11, paddingHorizontal: 8,
    },
});
