/**
 * InfoRotulosScreen.js
 * Tela hub do módulo InfoRótulos
 *
 * 3 pontos de entrada:
 *   - Busca por nome/ingrediente (autocomplete local + PubChem)
 *   - Scan de código de barras (câmera)
 *   - Navegação por categorias
 *
 * Exibe: alertas do perfil familiar, histórico recente, CIATOX
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, FlatList, Linking, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
    ArrowRight2, SearchNormal1, Scan, Call, CloseCircle,
    Trash, Brush, Health, Reserve, Warning2, Lovely,
    Box1, Battery3Full, Milk,
} from 'iconsax-react-native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import FadeInView from '../components/FadeInView';

import { buscarProdutoPorNome } from '../data/produtos_scanner';
import { PRODUTOS_PERIGOSOS_DATA } from '../data/produtos_perigosos';
import { getFamilySummary } from '../services/InfoRotulosRuleEngine';
import { getHistory, addToHistory } from '../services/inforotulos_cache';
import { resolveBarcode, getSubstanceByName } from '../services/InfoRotulosSubstanceService';



export default function InfoRotulosScreen() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const searchRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [familySummary, setFamilySummary] = useState(null);
    const [history, setHistory] = useState([]);

    // Carrega dados ao focar
    useFocusEffect(useCallback(() => {
        loadFamilySummary();
        loadHistory();
    }, []));

    const loadFamilySummary = async () => {
        try {
            const summary = await getFamilySummary();
            setFamilySummary(summary);
        } catch {
            // silencioso
        }
    };

    const loadHistory = async () => {
        try {
            const h = await getHistory(5);
            setHistory(h);
        } catch {
            // silencioso
        }
    };

    // ── Busca com debounce ──
    const searchTimeout = useRef(null);

    const handleSearch = (text) => {
        setSearchQuery(text);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        if (!text.trim()) {
            setSearchResults([]);
            return;
        }

        searchTimeout.current = setTimeout(() => {
            // Busca local primeiro
            const localResults = buscarProdutoPorNome(text);
            setSearchResults(localResults.slice(0, 8));
        }, 300);
    };

    // ── Navega para resultado ──
    const handleProductSelect = async (product) => {
        setSearchQuery('');
        setSearchResults([]);

        // Salva no histórico
        await addToHistory({
            id: product.barcode || product.nome,
            nome: product.nome,
            categoria: product.categoria,
            icone: product.icone || '🧪',
            perigo: product.perigo,
        });

        navigation.navigate('InfoRotulosResult', {
            product,
            source: 'local',
        });
    };

    // ── Busca por nome no PubChem ──
    const handleSearchSubmit = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const data = await getSubstanceByName(searchQuery.trim());

            if (data) {
                await addToHistory({
                    id: data.pubchem_cid || searchQuery,
                    nome: data.name_pt || searchQuery,
                    categoria: 'Substância',
                    icone: '🧪',
                    perigo: data.severity || 'Indeterminado',
                });

                navigation.navigate('InfoRotulosResult', {
                    substance: data,
                    source: 'pubchem',
                    searchQuery: searchQuery.trim(),
                });
            } else {
                Alert.alert(
                    'Substância não encontrada',
                    `"${searchQuery}" não foi encontrada nas bases de dados. Tente outro nome ou use o scanner de código de barras.`,
                    [{ text: 'OK' }]
                );
            }
        } catch {
            Alert.alert('Erro', 'Falha na busca. Verifique sua conexão.');
        } finally {
            setIsSearching(false);
        }
    };

    // ── Barcode scan ──
    const handleBarcodeScan = () => {
        navigation.navigate('Scanner', {
            mode: 'barcode_scan',
            returnTo: 'InfoRotulos',
        });
    };


    // ── Histórico ──
    const handleHistorySelect = async (item) => {
        // Tenta buscar novamente
        const data = await getSubstanceByName(item.nome);
        if (data) {
            navigation.navigate('InfoRotulosResult', {
                substance: data,
                source: 'cache',
                searchQuery: item.nome,
            });
        } else {
            // Usa dados mínimos do histórico
            navigation.navigate('InfoRotulosResult', {
                product: {
                    nome: item.nome,
                    categoria: item.categoria,
                    perigo: item.perigo,
                    icone: item.icone,
                },
                source: 'history',
            });
        }
    };

    // ─────────────────────────────────
    // RENDER
    // ─────────────────────────────────
    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <ArrowRight2 size={24} color={Neo.colors.neutral[800]} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2>{t('headersFirst.infoRTulos', 'InfoRótulos')}</H2>
                        <Caption>{t('headersFirst.seguranAEmProdutosParaSuaFamLia', 'Segurança em produtos para sua família')}</Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* ── Campo de Busca ── */}
                    <FadeInView delay={100}>
                        <NeoCard variant="glass" style={styles.searchCard}>
                            <View style={styles.searchRow}>
                                <SearchNormal1 size={20} color={Neo.colors.neutral[400]} />
                                <TextInput
                                    ref={searchRef}
                                    style={styles.searchInput}
                                    placeholder="Buscar produto ou ingrediente..."
                                    placeholderTextColor={Neo.colors.neutral[400]}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                    autoCorrect={false}
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
                                        <CloseCircle size={20} color={Neo.colors.neutral[400]} />
                                    </TouchableOpacity>
                                )}
                                {isSearching && <ActivityIndicator size="small" color={Neo.colors.primary[500]} />}
                            </View>

                            {/* Resultados de busca local */}
                            {searchResults.length > 0 && (
                                <View style={styles.searchResults}>
                                    {searchResults.map((item, idx) => (
                                        <TouchableOpacity
                                            key={idx}
                                            style={styles.searchResultItem}
                                            onPress={() => handleProductSelect(item)}
                                        >
                                            <Text style={styles.searchResultIcon}>{item.icone || '🧪'}</Text>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.searchResultName}>{item.nome}</Text>
                                                <Text style={styles.searchResultCat}>{item.categoria}</Text>
                                            </View>
                                            <View style={[styles.perigoTag, { backgroundColor: item.cor + '20' }]}>
                                                <Text style={[styles.perigoTagText, { color: item.cor }]}>{item.perigo}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}

                                    {/* Busca online */}
                                    <TouchableOpacity style={styles.searchOnlineBtn} onPress={handleSearchSubmit}>
                                        <SearchNormal1 size={16} color={Neo.colors.primary[600]} />
                                        <Text style={styles.searchOnlineText}>
                                            Buscar "{searchQuery}" nas bases toxicológicas
                                        </Text>
                                        <ArrowRight2 size={14} color={Neo.colors.primary[600]} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </NeoCard>
                    </FadeInView>

                    {/* ── Botão Barcode ── */}
                    <FadeInView delay={200}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleBarcodeScan}
                            style={styles.barcodeButton}
                        >
                            <View style={styles.barcodeIconBox}>
                                <Scan size={28} color="#FFF" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.barcodeTitle}>{t('headersFirst.escanearCDigoDeBarras', 'Escanear Código de Barras')}</Text>
                                <Text style={styles.barcodeSubtitle}>{t('headersFirst.aponteACMeraParaIdentificarOProduto', 'Aponte a câmera para identificar o produto')}</Text>
                            </View>
                            <ArrowRight2 size={20} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                    </FadeInView>

                    {/* ── Alerta do Perfil Familiar ── */}
                    {familySummary && (
                        <FadeInView delay={300}>
                            <NeoCard variant="solid" color={familySummary.hasVulnerables ? '#FFF3E0' : '#E8F5E9'} style={styles.familyCard}>
                                <View style={styles.familyRow}>
                                    <Text style={styles.familyEmoji}>
                                        {familySummary.hasVulnerables ? '⚠️' : '👨‍👩‍👧‍👦'}
                                    </Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.familyTitle}>{t('headersFirst.seuPerfilFamiliar', 'Seu perfil familiar')}</Text>
                                        <Text style={styles.familyText}>{familySummary.text}</Text>
                                        {familySummary.hasVulnerables && (
                                            <Text style={styles.familyWarning}>
                                                {t('headersFirst.alertasPersonalizadosSerOExibidosNosResu', 'Alertas personalizados serão exibidos nos resultados.')}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </NeoCard>
                        </FadeInView>
                    )}


                    {/* ── Histórico Recente ── */}
                    {history.length > 0 && (
                        <FadeInView delay={500}>
                            <Text style={styles.sectionTitle}>{t('headersFirst.cONSULTASRECENTES', 'CONSULTAS RECENTES')}</Text>
                            <NeoCard variant="glass" style={styles.historyCard}>
                                {history.map((item, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.historyItem, idx < history.length - 1 && styles.historyItemBorder]}
                                        onPress={() => handleHistorySelect(item)}
                                    >
                                        <Text style={{ fontSize: 18, marginRight: 12 }}>{item.icone || '🧪'}</Text>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.historyName}>{item.nome}</Text>
                                            <Text style={styles.historyDate}>
                                                {formatRelativeTime(item.consultedAt)}
                                            </Text>
                                        </View>
                                        <ArrowRight2 size={16} color={Neo.colors.neutral[400]} />
                                    </TouchableOpacity>
                                ))}
                            </NeoCard>
                        </FadeInView>
                    )}

                    {/* ── CIATOX ── */}
                    <FadeInView delay={600}>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => Linking.openURL('tel:08007226001')}
                            style={styles.ciatoxButton}
                        >
                            <Call size={20} color="#FFF" variant="Bold" />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text style={styles.ciatoxTitle}>{t('headersFirst.cIATOXEmergNciaToxicolGica', 'CIATOX — Emergência Toxicológica')}</Text>
                                <Text style={styles.ciatoxNumber}>{t('headersFirst.08007226001Gratuito24h', '0800 722 6001 (Gratuito, 24h)')}</Text>
                            </View>
                            <ArrowRight2 size={16} color="rgba(255,255,255,0.6)" />
                        </TouchableOpacity>
                    </FadeInView>

                    {/* Disclaimer Médico/Técnico */}
                    <Text style={styles.disclaimerText}>
                        {t('inforotulos.disclaimer', 'O Vigilaro Care não substitui avaliação de um toxicologista, engenheiro químico ou profissional de saúde. Use as informações como referência educativa. Em caso de intoxicação, ligue imediatamente para o CIATOX ou SAMU.')}
                    </Text>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// ─────────────────────────────────
// Utilitários
// ─────────────────────────────────
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

// ─────────────────────────────────
// Estilos
// ─────────────────────────────────
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.md,
        paddingBottom: Neo.spacing.sm,
    },
    backButton: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.03)',
        justifyContent: 'center', alignItems: 'center',
        marginRight: Neo.spacing.md,
    },
    scrollContent: {
        padding: Neo.spacing.lg,
        paddingBottom: 100,
    },

    // Search
    searchCard: {
        borderRadius: 20,
        padding: 0,
        overflow: 'hidden',
        marginBottom: Neo.spacing.md,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: Neo.colors.neutral[800],
        fontWeight: '500',
    },
    searchResults: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    searchResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)',
    },
    searchResultIcon: {
        fontSize: 22,
        marginRight: 12,
    },
    searchResultName: {
        fontSize: 14, fontWeight: '600',
        color: Neo.colors.neutral[800],
    },
    searchResultCat: {
        fontSize: 11,
        color: Neo.colors.neutral[500],
        marginTop: 1,
    },
    perigoTag: {
        paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 8,
    },
    perigoTagText: {
        fontSize: 9, fontWeight: '800',
    },
    searchOnlineBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 8,
        backgroundColor: 'rgba(16,185,129,0.05)',
    },
    searchOnlineText: {
        flex: 1,
        fontSize: 13,
        color: Neo.colors.primary[600],
        fontWeight: '600',
    },

    // Barcode
    barcodeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.primary[600],
        borderRadius: 20,
        padding: 16,
        marginBottom: Neo.spacing.md,
        ...Neo.shadows.md,
    },
    barcodeIconBox: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
    },
    barcodeTitle: {
        fontSize: 16, fontWeight: '700', color: '#FFF',
    },
    barcodeSubtitle: {
        fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2,
    },

    // Family
    familyCard: {
        borderRadius: 20, padding: 16,
        marginBottom: Neo.spacing.md,
    },
    familyRow: {
        flexDirection: 'row', alignItems: 'flex-start',
    },
    familyEmoji: {
        fontSize: 28, marginRight: 14, marginTop: 2,
    },
    familyTitle: {
        fontSize: 14, fontWeight: '700', color: Neo.colors.neutral[800], marginBottom: 2,
    },
    familyText: {
        fontSize: 13, color: Neo.colors.neutral[600], lineHeight: 18,
    },
    familyWarning: {
        fontSize: 11, color: '#E65100', fontWeight: '600', marginTop: 4,
    },

    // Categories
    sectionTitle: {
        fontSize: 12, fontWeight: '800', letterSpacing: 1,
        color: Neo.colors.neutral[500], marginBottom: Neo.spacing.md,
        textTransform: 'uppercase',
    },

    // History
    historyCard: {
        borderRadius: 20,
        padding: 4,
        marginBottom: Neo.spacing.lg,
    },
    historyItem: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 14, paddingVertical: 12,
    },
    historyItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.04)',
    },
    historyName: {
        fontSize: 14, fontWeight: '600', color: Neo.colors.neutral[800],
    },
    historyDate: {
        fontSize: 11, color: Neo.colors.neutral[500], marginTop: 1,
    },

    // CIATOX
    ciatoxButton: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#D32F2F',
        borderRadius: 16, padding: 16,
        ...Neo.shadows.sm,
    },
    ciatoxTitle: {
        fontSize: 13, fontWeight: '700', color: '#FFF',
    },
    ciatoxNumber: {
        fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 1,
    },
    disclaimerText: {
        fontSize: 11,
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 16,
        paddingHorizontal: 16,
    },
});
