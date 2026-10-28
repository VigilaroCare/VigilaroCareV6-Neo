/**
 * InfoRotulosScreen.js — a casa de tudo que é PRODUTO.
 *
 * Três jeitos de chegar à mesma tela de resultado:
 *   - buscar pelo nome ou ingrediente (catálogo local, depois PubChem);
 *   - ler o código de barras;
 *   - fotografar o rótulo (a IA lê o que está impresso).
 *
 * Até 28/10/2026 a foto do rótulo morava no "Scanner Ambiente", com resultado em
 * formato próprio que sumia ao fechar. Agora ela é daqui, cai na mesma tela de
 * resultado, e todas as consultas entram no histórico.
 *
 * Visual: a linguagem da Home — fundo limpo, tipografia como hierarquia, os
 * cartões retroiluminados nas ações, o tom de "ação necessária" no atalho do
 * centro de intoxicação. Sem banner de foto.
 */

import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Linking,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoScreenHeader from '../components/NeoScreenHeader';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import NeoGlifoCard from '../components/NeoGlifoCard';
import NeoPill from '../components/NeoPill';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import FadeInView from '../components/FadeInView';
import { Body, Small, Caption, Eyebrow } from '../components/NeoTypography';
import { useIsDark, useThemeColors } from '../utils/ThemeContext';

import { buscarProdutoPorNome } from '../data/produtos_scanner';
import { getFamilySummary } from '../services/InfoRotulosRuleEngine';
import { getHistory } from '../services/inforotulos_cache';
import { getSubstanceByName } from '../services/InfoRotulosSubstanceService';
import NeoAlert from '../utils/NeoAlert';
import { getPoisonControlDial, getPoisonControlLabel } from '../utils/emergencyTokens';
import { tomDoPerigo, rotuloDoPerigo, iconeSeguro } from '../utils/perigoProduto';

const GLIFOS = {
    codigo: require('../assets/illustrations/glifos/info-rotulos.png'),
    rotulo: require('../assets/illustrations/glifos/pictogram-produtos.png'),
    intoxicacao: require('../assets/illustrations/glifos/pictogram-primeiros-socorros.png'),
};

export default function InfoRotulosScreen() {
    const { t } = useTranslation('common');
    const navigation = useNavigation();
    const isDark = useIsDark();
    const colors = useThemeColors();
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
            setSearchResults(buscarProdutoPorNome(text).slice(0, 8));
        }, 300);
    };

    const limparBusca = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    // O histórico é gravado pela TELA DE RESULTADO, para valer para as cinco
    // entradas (nome, online, código de barras, foto, histórico) e não só para
    // as duas que passavam por aqui.
    const handleProductSelect = (product) => {
        limparBusca();
        navigation.navigate('InfoRotulosResult', { product, source: 'local' });
    };

    const handleSearchSubmit = async () => {
        const consulta = searchQuery.trim();
        if (!consulta) return;
        setIsSearching(true);
        try {
            const data = await getSubstanceByName(consulta);
            if (data) {
                navigation.navigate('InfoRotulosResult', { substance: data, source: 'pubchem', searchQuery: consulta });
            } else {
                NeoAlert.alert(
                    t('inforotulos.notFoundTitle', 'Substância não encontrada'),
                    t('inforotulos.notFoundDesc', { query: consulta, defaultValue: `"${consulta}" não foi encontrada nas bases de dados.` }),
                    [{ text: 'OK' }],
                );
            }
        } catch {
            NeoAlert.alert(
                t('inforotulos.errorTitle', 'Erro'),
                t('inforotulos.errorDesc', 'Falha na busca. Verifique sua conexão.'),
            );
        } finally {
            setIsSearching(false);
        }
    };

    const handleBarcodeScan = () => navigation.navigate('Scanner', { mode: 'barcode_scan' });
    const handleLabelPhoto = () => navigation.navigate('Scanner', { mode: 'label_scan' });

    const handleHistorySelect = async (item) => {
        // 1) leitura de rótulo por IA: o produto lido fica guardado, não se repete a foto
        if (item.snapshot) {
            navigation.navigate('InfoRotulosResult', { product: item.snapshot, source: item.origem || 'ai_label' });
            return;
        }
        // 2) produto do catálogo local: não precisa de rede
        const local = buscarProdutoPorNome(item.nome).find((p) => p.nome === item.nome);
        if (local) {
            navigation.navigate('InfoRotulosResult', { product: local, source: 'local' });
            return;
        }
        // 3) substância pesquisada online
        const data = await getSubstanceByName(item.nome);
        if (data) {
            navigation.navigate('InfoRotulosResult', { substance: data, source: 'cache', searchQuery: item.nome });
        } else {
            navigation.navigate('InfoRotulosResult', {
                product: { nome: item.nome, categoria: item.categoria, perigo: item.perigo, icone: item.icone },
                source: 'history',
            });
        }
    };

    const textPrimary = colors.neutral[900];
    const textMuted = colors.textOn.muted;
    const hairline = colors.neutral[300];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('inforotulos.headerTitle', 'Info Rótulos')}
                    subtitle={t('inforotulos.headerSub', 'Descubra os riscos de um produto')}
                    onBack={() => navigation.goBack()}
                />

                {/* "handled": com o teclado aberto, o toque numa sugestão age na hora.
                    No padrão ("never") o primeiro toque só fechava o teclado. */}
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.layout.screenHPadding,
                        paddingTop: Neo.spacing.sm,
                        paddingBottom: Neo.layout.scrollBottomFooter,
                    }}
                >
                    {/* BUSCA */}
                    <FadeInView delay={60}>
                        <NeoCard variant="elevated" padding={0}>
                            <View style={s.searchRow}>
                                <NeoIcon name="SearchNormal1" size={20} color={textMuted} variant="Bold" />
                                <TextInput
                                    style={[s.searchInput, { color: textPrimary }]}
                                    placeholder={t('inforotulos.searchPlaceholder', 'Buscar produto ou ingrediente…')}
                                    placeholderTextColor={textMuted}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    onSubmitEditing={handleSearchSubmit}
                                    returnKeyType="search"
                                    autoCorrect={false}
                                    maxLength={80}
                                    accessibilityLabel={t('inforotulos.searchPlaceholder', 'Buscar produto ou ingrediente…')}
                                />
                                {searchQuery.length > 0 && (
                                    <TouchableOpacity
                                        onPress={limparBusca}
                                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        accessibilityRole="button"
                                        accessibilityLabel={t('common.clear', 'Limpar')}
                                    >
                                        <NeoIcon name="CloseCircle" size={20} color={textMuted} variant="Bold" />
                                    </TouchableOpacity>
                                )}
                                {isSearching && <ActivityIndicator size="small" color={colors.textOn.brand} />}
                            </View>

                            {searchResults.length > 0 && (
                                <View style={[s.resultados, { borderTopColor: hairline }]}>
                                    {searchResults.map((item) => (
                                        <TouchableOpacity
                                            key={item.id || item.nome}
                                            style={[s.linha, { borderBottomColor: hairline }]}
                                            onPress={() => handleProductSelect(item)}
                                            activeOpacity={0.7}
                                            accessibilityRole="button"
                                            accessibilityLabel={`${item.nome}. ${rotuloDoPerigo(item.perigo)}`}
                                        >
                                            <NeoIcon name={iconeSeguro(item.icone)} size={20} color={textMuted} variant="Bold" />
                                            <View style={s.linhaTexto}>
                                                <Body style={s.linhaNome}>{item.nome}</Body>
                                                <Small style={{ color: textMuted }} numberOfLines={1}>{item.categoria}</Small>
                                            </View>
                                            <NeoPill label={rotuloDoPerigo(item.perigo)} tom={tomDoPerigo(item.perigo)} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {searchQuery.trim().length >= 2 && (
                                <TouchableOpacity
                                    style={[s.online, { borderTopColor: hairline }]}
                                    onPress={handleSearchSubmit}
                                    activeOpacity={0.7}
                                    accessibilityRole="button"
                                >
                                    <NeoIcon name="SearchNormal1" size={15} color={colors.textOn.brand} variant="Bold" />
                                    <Caption style={[s.onlineTexto, { color: colors.textOn.brand }]} numberOfLines={1}>
                                        {t('inforotulos.searchOnline', { query: searchQuery, defaultValue: `Buscar "${searchQuery}" online` })}
                                    </Caption>
                                    <NeoIcon name="ArrowRight2" size={14} color={colors.textOn.brand} />
                                </TouchableOpacity>
                            )}
                        </NeoCard>
                    </FadeInView>

                    {/* AS DUAS FORMAS DE CONSULTAR SEM DIGITAR — a grade da Home, em pequeno */}
                    <FadeInView delay={120}>
                        <View style={s.acoes}>
                            <View style={s.acaoCelula}>
                                <NeoGlifoCard
                                    source={GLIFOS.codigo}
                                    titulo={t('inforotulos.barcodeTitle', 'Escanear código de barras')}
                                    tom="info"
                                    arte={68}
                                    tamanhoTitulo={13}
                                    style={s.acaoCard}
                                    onPress={handleBarcodeScan}
                                    accessibilityLabel={`${t('inforotulos.barcodeTitle', 'Escanear código de barras')}. ${t('inforotulos.barcodeSub', 'Aponte a câmera para identificar o produto')}`}
                                />
                            </View>
                            <View style={s.acaoCelula}>
                                <NeoGlifoCard
                                    source={GLIFOS.rotulo}
                                    titulo={t('inforotulos.labelPhotoTitle', 'Fotografar o rótulo')}
                                    tom="info"
                                    arte={68}
                                    tamanhoTitulo={13}
                                    style={s.acaoCard}
                                    onPress={handleLabelPhoto}
                                    accessibilityLabel={`${t('inforotulos.labelPhotoTitle', 'Fotografar o rótulo')}. ${t('inforotulos.labelPhotoNote', 'A foto do rótulo é lida por inteligência artificial, com a sua permissão.')}`}
                                />
                            </View>
                        </View>
                        <Caption style={[s.nota, { color: textMuted }]}>
                            {t('inforotulos.labelPhotoNote', 'A foto do rótulo é lida por inteligência artificial, com a sua permissão.')}
                        </Caption>
                    </FadeInView>

                    {/* PERFIL FAMILIAR */}
                    {familySummary && (
                        <FadeInView delay={180}>
                            <NeoCard variant="elevated" style={s.familia}>
                                <NeoIcon
                                    name={familySummary.hasVulnerables ? 'Warning2' : 'People'}
                                    size={22}
                                    color={familySummary.hasVulnerables ? colors.textOn.warning : colors.textOn.brand}
                                    variant="Bold"
                                />
                                <View style={s.linhaTexto}>
                                    <Body style={s.linhaNome}>{t('inforotulos.familyProfile', 'Seu perfil familiar')}</Body>
                                    <Small style={{ color: textMuted }}>{familySummary.label}</Small>
                                    <Caption style={{ color: textMuted, marginTop: 2 }}>
                                        {t('inforotulos.personalizedAlerts', 'Alertas personalizados aparecerão nos resultados.')}
                                    </Caption>
                                </View>
                            </NeoCard>
                        </FadeInView>
                    )}

                    {/* CONSULTAS RECENTES */}
                    <FadeInView delay={240}>
                        <Eyebrow style={s.eyebrow}>{t('inforotulos.recentSearches', 'Consultas recentes')}</Eyebrow>
                        <NeoCard variant="elevated" padding={0}>
                            {history.length > 0 ? history.map((item, idx) => (
                                <TouchableOpacity
                                    key={item.id || idx}
                                    style={[s.linha, idx < history.length - 1 && { borderBottomColor: hairline }, idx === history.length - 1 && { borderBottomWidth: 0 }]}
                                    onPress={() => handleHistorySelect(item)}
                                    activeOpacity={0.7}
                                    accessibilityRole="button"
                                    accessibilityLabel={`${item.nome}. ${rotuloDoPerigo(item.perigo)}`}
                                >
                                    <NeoIcon name={iconeSeguro(item.icone)} size={20} color={textMuted} variant="Bold" />
                                    <View style={s.linhaTexto}>
                                        <Body style={s.linhaNome} numberOfLines={1}>{item.nome}</Body>
                                        {!!item.categoria && <Small style={{ color: textMuted }} numberOfLines={1}>{item.categoria}</Small>}
                                    </View>
                                    <NeoPill label={rotuloDoPerigo(item.perigo)} tom={tomDoPerigo(item.perigo)} />
                                    <NeoIcon name="ArrowRight2" size={16} color={textMuted} />
                                </TouchableOpacity>
                            )) : (
                                <View style={s.vazio}>
                                    <NeoIcon name="SearchNormal1" size={28} color={textMuted} />
                                    <Body style={[s.vazioTitulo, { color: textMuted }]}>
                                        {t('inforotulos.emptyHistory', 'Seus produtos consultados aparecerão aqui.')}
                                    </Body>
                                    <Small style={{ color: textMuted, textAlign: 'center' }}>
                                        {t('inforotulos.emptyHistoryHint', 'Use a busca ou o scanner para começar.')}
                                    </Small>
                                </View>
                            )}
                        </NeoCard>
                    </FadeInView>

                    {/* INTOXICAÇÃO — o tom de "ação necessária", o mesmo do card de Vistorias com pendências */}
                    <FadeInView delay={300}>
                        <Eyebrow style={s.eyebrow}>{t('inforotulos.emergencyLabel', 'Em caso de intoxicação')}</Eyebrow>
                        <NeoGlifoCard
                            source={GLIFOS.intoxicacao}
                            titulo={t('inforotulos.ciatoxTitle', 'CIATOX — Emergência toxicológica')}
                            sub={t('inforotulos.ciatoxNumber', { defaultValue: '{{poisonControl}} · 24h', poisonControl: getPoisonControlLabel() })}
                            tom="error"
                            largo
                            seta
                            arte={80}
                            tamanhoTitulo={15}
                            style={s.intoxicacao}
                            onPress={() => Linking.openURL(`tel:${getPoisonControlDial()}`)}
                        />
                    </FadeInView>

                    <SafetyDisclaimer variant="produto" style={{ marginTop: Neo.spacing.lg }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        minHeight: 52,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    resultados: {
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    linhaTexto: {
        flex: 1,
        minWidth: 0,
    },
    linhaNome: {
        fontWeight: '700',
    },
    online: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    onlineTexto: {
        flex: 1,
        fontWeight: '700',
    },
    acoes: {
        flexDirection: 'row',
        gap: Neo.spacing.sm + 4,
        marginTop: Neo.spacing.md,
    },
    acaoCelula: {
        flex: 1,
    },
    acaoCard: {
        height: 112,
    },
    nota: {
        marginTop: Neo.spacing.sm,
        lineHeight: 16,
    },
    familia: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginTop: Neo.spacing.md,
    },
    eyebrow: {
        marginTop: Neo.spacing.lg,
        marginBottom: Neo.spacing.sm,
    },
    vazio: {
        alignItems: 'center',
        gap: 6,
        paddingVertical: 28,
        paddingHorizontal: 20,
    },
    vazioTitulo: {
        textAlign: 'center',
        marginTop: 4,
    },
    intoxicacao: {
        height: 92,
    },
});
