import React, { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H1, Body, Small, Caption } from '../components/NeoTypography';
import FadeInView from '../components/FadeInView';

import { buscarProdutoPorNome } from '../data/produtos_scanner';
import { getHistory, addToHistory } from '../services/inforotulos_cache';
import { getSubstanceByName } from '../services/InfoRotulosSubstanceService';
import NeoAlert from '../utils/NeoAlert';

export default function VigilaroScanHubScreen() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const searchRef = useRef(null);
    const searchTimeout = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [history, setHistory] = useState([]);

    useFocusEffect(useCallback(() => {
        (async () => {
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

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>{t('ferramentasIA.scanTitle', 'Vigilaro Scan')}</H1>
                        <Caption style={s.subtitle}>{t('ferramentasIA.scanSubtitle', 'Inteligência Artificial e Análise')}</Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* CAMPO DE BUSCA TEXTUAL */}
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
                                            <NeoIcon name={item.icone || 'TestTube'} size={20} color={Neo.colors.neutral[600]} variant="Bold" />
                                            <View style={{ flex: 1 }}>
                                                <Body style={s.searchResultName}>{item.nome}</Body>
                                                <Small style={s.searchResultCat}>{item.categoria}</Small>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </NeoCard>
                    </FadeInView>

                    {/* BOTÕES DE CÂMERA UNIFICADOS */}
                    <FadeInView delay={120}>
                        <View style={s.cameraButtonsContainer}>
                            <Text style={s.sectionTitle}>{t('ferramentasIA.cameraScanning', 'Escaneamento por Câmera')}</Text>
                            
                            {/* Scanner Ambiente */}
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('Scanner', { mode: 'environment' })}
                                style={s.actionButton}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(33, 150, 243, 0.12)' }]}>
                                        <NeoIcon name="Home2" size={24} color={Neo.colors.categoria.ardosia.fill} variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>{t('ferramentasIA.scannerAmbienteTitle', 'Escanear Ambiente')}</Body>
                                        <Small style={s.actionSub}>{t('ferramentasIA.scannerAmbienteDesc', 'Análise de riscos físicos em cômodos')}</Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>

                            {/* Ler Rótulo Textual (IA) */}
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('Scanner', { mode: 'label_scan' })}
                                style={s.actionButton}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(156, 39, 176, 0.12)' }]}>
                                        <NeoIcon name="DocumentText" size={24} color={Neo.colors.categoria.ameixa.fill} variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>{t('ferramentasIA.labelScanTitle', 'Analisar Rótulo com IA')}</Body>
                                        <Small style={s.actionSub}>{t('ferramentasIA.labelScanSubtitle', 'Fotografe os ingredientes do produto')}</Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>

                            {/* Código de Barras */}
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('Scanner', { mode: 'barcode_scan', returnTo: 'VigilaroScanHub' })}
                                style={s.actionButton}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(76, 175, 80, 0.12)' }]}>
                                        <NeoIcon name="Barcode" size={24} color="#4CAF50" variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>{t('ferramentasIA.barcodeTitle', 'Código de Barras')}</Body>
                                        <Small style={s.actionSub}>{t('ferramentasIA.barcodeDesc', 'Identificação rápida na base de dados')}</Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                        </View>
                    </FadeInView>

                    {/* HISTÓRICO RECENTE */}
                    {history.length > 0 && (
                        <FadeInView delay={160}>
                            <Text style={s.sectionTitle}>{t('inforotulos.historyTitle', 'Análises Recentes')}</Text>
                            {history.map((item, idx) => (
                                <TouchableOpacity
                                    key={`hist-${idx}`}
                                    style={{ marginBottom: 8 }}
                                    activeOpacity={0.7}
                                    onPress={() => handleHistorySelect(item)}
                                >
                                    <NeoCard variant="elevated" style={s.historyItemCard}>
                                        <NeoIcon name={item.icone || 'Note'} size={18} color={Neo.colors.neutral[600]} variant="Bold" />
                                        <View style={{ flex: 1 }}>
                                            <Body style={s.historyName}>{item.nome}</Body>
                                            <Small style={s.historyCat}>{item.categoria}</Small>
                                        </View>
                                        <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.neutral[400]} />
                                    </NeoCard>
                                </TouchableOpacity>
                            ))}
                        </FadeInView>
                    )}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 14, marginTop: 2, color: Neo.colors.neutral[600] },
    scrollContent: { padding: 20, paddingBottom: 100 },
    
    // Search
    searchCard: { padding: 8, paddingHorizontal: 12, borderRadius: 16, marginBottom: 12 },
    searchRow: { flexDirection: 'row', alignItems: 'center', height: 44 },
    searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: Neo.colors.neutral[900], fontWeight: '500' },
    searchResults: { borderTopWidth: 1, borderTopColor: Neo.colors.neutral[100], marginTop: 8, paddingTop: 8 },
    searchResultItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[50] },
    searchResultIcon: { fontSize: 24, marginRight: 12 },
    searchResultName: { fontSize: 15, fontWeight: '600' },
    searchResultCat: { fontSize: 12, color: Neo.colors.neutral[500] },
    
    // Action Buttons
    cameraButtonsContainer: { marginTop: 12, marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: Neo.colors.neutral[800], marginBottom: 12, marginLeft: 4, marginTop: 8 },
    actionButton: { marginBottom: 12 },
    actionCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 },
    actionIconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    actionTitle: { fontSize: 16, fontWeight: '700' },
    actionSub: { fontSize: 13, color: Neo.colors.neutral[500], marginTop: 2 },
    
    // History
    historyItemCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 16 },
    historyIcon: { fontSize: 24, marginRight: 12 },
    historyName: { fontSize: 15, fontWeight: '600', color: Neo.colors.neutral[800] },
    historyCat: { fontSize: 13, color: Neo.colors.neutral[500] },
});
