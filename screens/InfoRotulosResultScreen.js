/**
 * InfoRotulosResultScreen.js
 * Tela de resultado do InfoRótulos
 *
 * Exibe:
 *   - Card retroiluminado no tom do perigo (sinal visual crítico para segurança)
 *   - Alertas personalizados (RuleEngine × Perfil)
 *   - Classificação GHS traduzida
 *   - Primeiros socorros por via de exposição
 *   - Prevenção
 *   - CIATOX
 *   - Re-escanear via câmera (opcional)
 */

import { useState, useEffect, useMemo, useRef } from "react";
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    Linking, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';

import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import NeoScreenHeader from '../components/NeoScreenHeader';
import NeoGlifoCard from '../components/NeoGlifoCard';
import NeoPill from '../components/NeoPill';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Small, Caption } from "../components/NeoTypography";
import { useIsDark, useThemeColors, useThemeDS } from '../utils/ThemeContext';
import { addToHistory } from '../services/inforotulos_cache';
import { tomDoPerigo, rotuloDoPerigo, tomDaSeveridade, iconeDaSeveridade } from '../utils/perigoProduto';
import { classificarRotulo, separarAvisos } from '../utils/classificarRotulo';
import FadeInView from '../components/FadeInView';
import { useTranslation } from 'react-i18next';
import { SkeletonCard } from '../components/SkeletonLoader';

import { evaluateProduct, getFamilyCheck, pareceMedicamento } from '../services/InfoRotulosRuleEngine';
import { ESPECIES, RESUMO_FAMILIA } from '../data/regras_inforotulos';
import { t_field } from '../utils/getLocalizedField';
import { getSubstancesForIngredients } from '../services/InfoRotulosSubstanceService';
import { NIVEIS_PERIGO } from '../data/produtos_scanner';
import { getPoisonControlDial, getPoisonControlLabel, resolveEmergencyTokensDeep } from '../utils/emergencyTokens';
import { tx } from '../utils/txFixo';

// Glifos do resultado: o do produto no topo, o do centro de intoxicação no fim.
const GLIFO_PRODUTO = require('../assets/illustrations/glifos/pictogram-produtos.png');
const GLIFO_INTOXICACAO = require('../assets/illustrations/glifos/pictogram-primeiros-socorros.png');

// Pictogramas funcionais (não "cara de IA" — iconografia universal de primeiros socorros)
const FIRST_AID_ICONS = {
    ingestao:        { icone: 'Drop', get label() { return tx('telas.InfoRotulosResultScreen.seIngerir', 'Se INGERIR'); } },
    contato_pele:    { icone: 'Hand', get label() { return tx('telas.InfoRotulosResultScreen.seTocarPele', 'Se TOCAR NA PELE'); } },
    contato_olhos:   { icone: 'Eye', get label() { return tx('telas.InfoRotulosResultScreen.seCairOlhos', 'Se CAIR NOS OLHOS'); } },
    inalacao:        { icone: 'Wind', get label() { return tx('telas.InfoRotulosResultScreen.seInalar', 'Se INALAR'); } },
    pele:            { icone: 'Hand', get label() { return tx('telas.InfoRotulosResultScreen.seTocarPele', 'Se TOCAR NA PELE'); } },
    olhos:           { icone: 'Eye', get label() { return tx('telas.InfoRotulosResultScreen.seCairOlhos', 'Se CAIR NOS OLHOS'); } },
    queimadura:      { icone: 'Fire', get label() { return tx('telas.InfoRotulosResultScreen.seQueimar', 'Se QUEIMAR'); } },
    reacao:          { icone: 'Lightning', get label() { return tx('telas.InfoRotulosResultScreen.seReacao', 'Se REAÇÃO ALÉRGICA'); } },
    ingestao_pet:    { icone: 'PawPrint', get label() { return tx('telas.InfoRotulosResultScreen.sePetIngerir', 'Se PET INGERIR'); } },
    ingestao_humana: { icone: 'Drop', get label() { return tx('telas.InfoRotulosResultScreen.seHumanoIngerir', 'Se HUMANO INGERIR'); } },
};

// Labels limpas para fonte (sem emoji prefix — cor faz o trabalho)
const SOURCE_LABELS = {
    local:               { get label() { return tx('telas.InfoRotulosResultScreen.fonteLocal', 'Base local'); }, color: '#4CAF50' },
    open_food_facts:     { label: 'Open Food Facts', color: Neo.colors.categoria.ardosia.fill },
    open_beauty_facts:   { label: 'Open Beauty Facts', color: Neo.colors.categoria.rose.fill },
    open_products_facts: { label: 'Open Products Facts', color: Neo.colors.categoria.ocre.fill },
    upcitemdb:           { label: 'UPCitemdb', color: Neo.colors.categoria.ameixa.fill },
    // PubChem (busca online), o cache dela e o histórico caíam em "Não encontrado":
    // não havia entrada para eles aqui.
    pubchem:             { get label() { return tx('telas.InfoRotulosResultScreen.fontePubchem', 'PubChem (NIH)'); }, color: Neo.colors.categoria.ardosia.fill },
    cache:               { get label() { return tx('telas.InfoRotulosResultScreen.fontePubchem', 'PubChem (NIH)'); }, color: Neo.colors.categoria.ardosia.fill },
    history:             { get label() { return tx('telas.InfoRotulosResultScreen.fonteHistorico', 'Histórico'); }, color: '#9E9E9E' },
    ai_label:            { get label() { return tx('telas.InfoRotulosResultScreen.fonteIA', 'Leitura por IA'); }, color: Neo.colors.categoria.ameixa.fill },
    not_found:           { get label() { return tx('telas.InfoRotulosResultScreen.fonteNaoEncontrado', 'Não encontrado'); }, color: '#9E9E9E' },
};

export default function InfoRotulosResultScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation();

    const { product, substance, source, searchQuery, ingredientes_texto, marca } = route.params || {};

    const [alerts, setAlerts] = useState([]);
    // Os textos de primeiros socorros do catálogo trazem {{POISON_CONTROL}} no
    // lugar do telefone do país. Sem resolver, a tela mostrava o token cru:
    // "Dar água. {{POISON_CONTROL}}." — na frase que se lê com uma pessoa
    // intoxicada ao lado. Resolvido NA ORIGEM (produto e substância), para
    // valer para todos os campos e não só para o que apareceu. Ver o resolvedor
    // em utils/emergencyTokens.js.
    const [substanceData, setSubstanceData] = useState(substance ? resolveEmergencyTokensDeep(substance) : null);
    const [loading, setLoading] = useState(!substance);
    const [enriching, setEnriching] = useState(false);
    // Quem a família tem: pessoas e pets. null = ainda carregando. Pets contam MESMO sem ser o
    // perfil ativo (um pet nunca é): o motor de alertas já cruza a casa inteira, e esta lista mostra isso.
    const [familia, setFamilia] = useState(null);
    useEffect(() => {
        let vivo = true;
        const vazia = { pessoas: [], pets: [], total: 0 };
        getFamilyCheck().then((f) => { if (vivo) setFamilia(f || vazia); }).catch(() => { if (vivo) setFamilia(vazia); });
        return () => { vivo = false; };
    }, []);

    const productData = useMemo(() => resolveEmergencyTokensDeep(product || {}), [product]);
    const nome = productData.nome || substanceData?.name_pt || searchQuery || 'Produto';
    const categoria = productData.categoria || 'Substância';
    const brandName = marca || productData.marca || '';
    // Produto lido por foto não tem `perigo` nem `ghs_categories` de catálogo: o perigo dele é o
    // que o rótulo IMPRIME (palavra de sinal e frases de perigo), por regras fixas — ver
    // data/regras_inforotulos.js. As bases químicas não entendem nome em português: sem isto,
    // toda foto de rótulo caía em "Indeterminado" e o aviso da família nunca disparava.
    // O que a IA pôs em "advertências" e NÃO é perigo ("venda sob prescrição", "fora do alcance") vai para
    // "Prevenção"; só o que descreve risco fica em "Principais riscos" e entra na conta do nível.
    const avisos = useMemo(
        () => (source === 'ai_label' ? separarAvisos(productData.riscos) : null),
        [source, productData],
    );
    const doRotulo = useMemo(
        () => (source === 'ai_label'
            ? classificarRotulo({
                riscos: productData.riscos,
                palavraSinal: productData.palavraSinal,
                // remédio ou suplemento: piso Médio (guarda segura de criança e animal)
                medicamento: pareceMedicamento(productData, productData.nome, productData.componentes || []),
            })
            : null),
        [source, productData],
    );
    // O motor de alertas lê `ghs_categories` do produto: o rótulo lido passa a tê-las.
    const produtoParaOMotor = useMemo(
        () => (doRotulo ? { ...product, ghs_categories: doRotulo.ghs_categories } : product),
        [product, doRotulo],
    );
    const perigo = productData.perigo || doRotulo?.perigo || substanceData?.severity || 'Indeterminado';
    const sourceInfo = SOURCE_LABELS[source] || SOURCE_LABELS['not_found'];

    const isExternalSource = ['open_food_facts', 'open_beauty_facts', 'open_products_facts', 'upcitemdb', 'ai_label'].includes(source);
    const isDark = useIsDark();
    const colors = useThemeColors();
    // Os estilos agora nascem do TEMA (criarEstilos). Antes eram calculados uma vez,
    // no escopo do módulo, com a paleta clara: no escuro o rótulo "Se INGERIR" saía
    // verde-escuro sobre cartão escuro, quase invisível — a parte mais importante da tela.
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);

    // Toda consulta entra no histórico DAQUI, qualquer que seja a entrada: nome,
    // busca online, código de barras, foto do rótulo ou o próprio histórico. Antes
    // só as duas que passavam pelo hub gravavam, então o que se escaneava nunca
    // aparecia em "Consultas recentes". Espera o resultado ficar definitivo (nome
    // e perigo podem chegar do enriquecimento) e grava uma vez só.
    const registrado = useRef(false);
    useEffect(() => {
        if (loading || enriching || registrado.current) return;
        registrado.current = true;
        const id = source === 'ai_label'
            ? (productData.barcode ? String(productData.barcode) : `ia:${String(nome).toLowerCase()}`)
            : (productData.id || productData.barcode || substanceData?.pubchem_cid || searchQuery || nome);
        addToHistory({
            id: String(id),
            nome,
            categoria,
            icone: productData.icone || 'TestTube',
            perigo,
            origem: source,
            // O produto fica guardado: reabrir não repete a foto nem a consulta, e volta COMO era — com a
            // origem, a marca e o código de barras. Sem isto, um produto de código de barras reaberto pelo
            // histórico virava só o nome ("Histórico") e perdia até a opção de fotografar os ingredientes.
            // O catálogo local não precisa (reabre pelo nome).
            ...(product && source !== 'local' && source !== 'history' ? { snapshot: product } : {}),
        });
    }, [loading, enriching]);

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
                        setSubstanceData(resolveEmergencyTokensDeep(substancesData[0]));
                    }
                    setEnriching(false);
                }

                setLoading(false);
            }

            const productAlerts = await evaluateProduct(
                substanceData || substance,
                produtoParaOMotor
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
            evaluateProduct(substanceData, produtoParaOMotor).then(setAlerts);
        }
    }, [substanceData]);

    const firstAid = {
        ...(substanceData?.first_aid || {}),
        ...(productData.primeiros_socorros || {}),
    };

    const hazardStatements = substanceData?.hazard_statements || [];
    const precautionary = substanceData?.precautionary || [];

    const prevencao = [...(productData.prevencao || []), ...(avisos ? avisos.gerais : [])];
    const riscos = avisos ? avisos.perigos : (productData.riscos || []);

    const componentesDisplay = productData.componentes || [];

    // Veio de uma base (código de barras ou busca) SEM composição: não há o que cruzar com a família.
    // O caminho é fotografar a região dos ingredientes — a leitura é a mesma do rótulo, e o nome e a
    // marca que a base já deu passam para o resultado.
    const semComposicao = ['open_food_facts', 'open_beauty_facts', 'open_products_facts', 'upcitemdb', 'not_found'].includes(source)
        && !loading && !enriching && componentesDisplay.length === 0 && !substanceData;
    const completarPorFoto = () => navigation.navigate('Scanner', {
        mode: 'label_scan',
        completar: {
            nome: productData.nome || searchQuery || '',
            marca: brandName,
            categoria: productData.categoria || '',
            barcode: productData.barcode || (/^[0-9]{6,14}$/.test(String(searchQuery || '')) ? String(searchQuery) : ''),
        },
    });

    // Resumo para a pílula de cada pessoa/pet: "Caio · 4 anos", "Duquesa · gato".
    const rotuloDaPessoa = (p) => {
        if (p.idade == null) return p.nome;
        return `${p.nome} · ${t_field(RESUMO_FAMILIA.ano, p.idade === 1 ? 'um' : 'varios').replace('{{n}}', String(p.idade))}`;
    };
    const rotuloDoPet = (p) => `${p.nome} · ${t_field(ESPECIES[p.especie] || ESPECIES.outro, 'nome')}`;
    const alertasDaFamilia = alerts.filter((a) => a.profiles && a.profiles.length > 0).length;

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('inforotulos.headerTitle', 'Info Rótulos')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView showsVerticalScrollIndicator={false} bounces={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>

                    <View style={s.contentArea}>

                        {/* TOPO — a linguagem da Home. O sinal de risco instantâneo que o slab
                            vermelho dava, agora num card retroiluminado cujo TOM é o do perigo:
                            terracota = ação necessária, âmbar = atenção, verde = baixo, grafite
                            = indeterminado. O nível também vai ESCRITO na pílula (WCAG 1.4.1:
                            cor nunca é o único sinal). */}
                        <NeoGlifoCard
                            source={GLIFO_PRODUTO}
                            titulo={nome}
                            sub={[brandName, categoria].filter(Boolean).join(' · ')}
                            tom={tomDoPerigo(perigo)}
                            arte={104}
                            tamanhoTitulo={22}
                            style={s.heroCard}
                            rodape={(
                                <NeoPill
                                    sobreCampo
                                    icone={NIVEIS_PERIGO[perigo]?.icone || 'Warning2'}
                                    label={`${t('inforotulos.hazardLevel', 'Perigo')}: ${rotuloDoPerigo(perigo)}`}
                                />
                            )}
                        />
                        <View style={s.fonteLinha}>
                            <NeoPill label={sourceInfo.label} tom="muted" />
                        </View>

                        {/* Foto da frente (só o nome) ou rótulo sem advertência: orienta, não deixa só o "Indeterminado". */}
                        {source === 'ai_label' && perigo === 'Indeterminado' && (
                            <Small style={s.dicaRotulo}>
                                {t('inforotulos.semAdvertencia', 'Não encontrei advertência de perigo no que foi lido. Se o rótulo tiver, fotografe o verso, onde ficam a composição e as advertências.')}
                            </Small>
                        )}

                        {/* Produto sem composição: o caminho é fotografar os ingredientes, não parar em "Indeterminado". */}
                        {semComposicao && (
                            <NeoGlifoCard
                                source={GLIFO_PRODUTO}
                                titulo={t('inforotulos.completarTitulo', 'Fotografar os ingredientes')}
                                sub={t('inforotulos.completarSub', 'Veio sem composição. Fotografe a região dos ingredientes para conferir com a sua família.')}
                                tom="info"
                                largo
                                seta
                                arte={84}
                                tamanhoTitulo={18}
                                style={s.completarCard}
                                onPress={completarPorFoto}
                                accessibilityLabel={t('inforotulos.completarTitulo', 'Fotografar os ingredientes')}
                            />
                        )}

                        {/* Conteúdo de IA é SEMPRE identificado como tal. */}
                        {source === 'ai_label' && (
                            <SafetyDisclaimer variant="ia" style={{ marginTop: Neo.spacing.sm }} />
                        )}

                        {loading && (
                            <View style={{ marginTop: 12 }}>
                                <SkeletonCard hasAvatar={false} lines={3} />
                            </View>
                        )}

                        {/* ALERTAS PERSONALIZADOS */}
                        {alerts.length > 0 && (
                            <FadeInView delay={100}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultAlerts', 'Alertas para você') || '').toUpperCase()}</Text>
                                {alerts.map((alert, idx) => {
                                    // O TEXTO do alerta usa a cor aferida em AA (textOn); a cor de
                                    // alert.color — um laranja de 2,8:1 sobre branco — fica só na
                                    // faixa lateral, que é decoração. O nível vai escrito na pílula.
                                    const tom = tomDaSeveridade(alert.severity);
                                    const tinta = colors.textOn[tom];
                                    return (
                                        <NeoCard
                                            key={idx}
                                            variant="elevated"
                                            style={[s.alertCard, { borderLeftWidth: 4, borderLeftColor: alert.color }]}
                                        >
                                            <View style={s.alertHeader}>
                                                <NeoIcon name={iconeDaSeveridade(alert.severity)} size={22} color={tinta} variant="Bold" />
                                                <NeoPill label={alert.label} tom={tom} />
                                            </View>

                                            <Text style={[s.alertTitle, { color: tinta }]}>{alert.title}</Text>
                                            <Text style={s.alertMessage}>{alert.message}</Text>

                                            {alert.action && (
                                                <View style={s.alertAction}>
                                                    <NeoIcon name="ShieldTick" size={16} color={tinta} variant="Bold" />
                                                    <Text style={[s.alertActionText, { color: tinta }]}>
                                                        {alert.action}
                                                    </Text>
                                                </View>
                                            )}
                                        </NeoCard>
                                    );
                                })}
                            </FadeInView>
                        )}

                        {/* CONFERIDO COM A SUA FAMÍLIA — quem entrou na conta e o que achou. Sem alerta NÃO é
                            "seguro": a base de substâncias é pequena, e a tela diz isso. */}
                        {!loading && familia && (
                            <FadeInView delay={120}>
                                <Text style={s.sectionLabel}>{(t('inforotulos.familiaTitulo', 'Conferido com a sua família') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    {familia.total === 0 ? (
                                        <Text style={s.ingredientesText}>{t('inforotulos.familiaVazia', 'Cadastre as pessoas e os animais da casa para conferir este produto com eles.')}</Text>
                                    ) : (
                                        <>
                                            <View style={s.familiaChips}>
                                                {familia.pessoas.map((p) => <NeoPill key={`h${p.id}`} icone="User" tom="muted" label={rotuloDaPessoa(p)} />)}
                                                {familia.pets.map((p) => <NeoPill key={`p${p.id}`} icone="PawPrint" tom="muted" label={rotuloDoPet(p)} />)}
                                            </View>
                                            <Text style={s.ingredientesText}>
                                                {alertasDaFamilia > 0
                                                    ? t('inforotulos.familiaComAlerta', { count: alertasDaFamilia, defaultValue: '{{count}} alerta(s) acima para esta família.' })
                                                    : t('inforotulos.familiaSemAlerta', 'Nenhum alerta conhecido para estas pessoas e animais.')}
                                            </Text>
                                            <Small style={s.familiaLimite}>{t('inforotulos.familiaLimite', 'A nossa base de substâncias ainda é pequena, principalmente para medicamentos. Isso não prova que o produto seja seguro: confira o rótulo ou a bula.')}</Small>
                                        </>
                                    )}
                                </NeoCard>
                            </FadeInView>
                        )}

                        {/* PARA QUE SERVE — como está impresso (indicações / modo de usar), só na leitura por foto */}
                        {source === 'ai_label' && !!productData.indicacao && (
                            <FadeInView delay={140}>
                                <Text style={s.sectionLabel}>{(t('scanner.resultUse', 'Para que serve (segundo o rótulo)') || '').toUpperCase()}</Text>
                                <NeoCard variant="elevated" style={s.sectionCard}>
                                    <Text style={s.ingredientesText}>{productData.indicacao}</Text>
                                </NeoCard>
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
                                            <ActivityIndicator size="small" color={tema.colors.primary[500]} />
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
                                            <NeoIcon name="Warning2" size={16} color={Neo.colors.categoria.ocre.fill} variant="Bold" />
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
                                    <Text style={s.ghsSource}>{t('telas.InfoRotulosResultScreen.fontePubchemNihNlm', 'Fonte: PubChem (NIH/NLM)')}{substanceData?.source === 'pubchem+epa' ? ' + EPA CTX' : ''}
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
                                        const icon = FIRST_AID_ICONS[key] || { icone: 'FirstAidKit', label: key };
                                        return (
                                            <View key={key} style={s.firstAidItem}>
                                                <View style={s.firstAidHeader}>
                                                    <NeoIcon name={icon.icone} size={20} color={tema.colors.primary[600]} variant="Bold" />
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
                                            <NeoIcon name="TickCircle" size={16} color={tema.colors.primary[600]} variant="Bold" />
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
                                            <View style={[s.ghsCodeBadge, { backgroundColor: Neo.colors.categoria.ardosia.tint }]}>
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

                        {/* CIATOX — o tom de "ação necessária", o mesmo do hub e do card de Vistorias */}
                        <FadeInView delay={450}>
                            <NeoGlifoCard
                                source={GLIFO_INTOXICACAO}
                                titulo={t('scanner.callCiatox', 'Ligar para o CIATOX')}
                                sub={t('scanner.ciatoxNumber', { defaultValue: '{{poisonControl}} · gratuito 24h', poisonControl: getPoisonControlLabel() })}
                                tom="error"
                                largo
                                seta
                                arte={80}
                                tamanhoTitulo={16}
                                style={s.ciatoxCard}
                                onPress={() => Linking.openURL(`tel:${getPoisonControlDial()}`)}
                            />
                        </FadeInView>

                        {/* ESCANEAR ROTULO — re-uso da câmera */}
                        <FadeInView delay={500}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.push('Scanner', { mode: 'label_scan' })}
                                style={s.actionButton}
                            >
                                <View style={s.actionIconWrap}>
                                    <NeoIcon name="Scan" size={18} color={tema.colors.primary[600]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={s.actionTitle}>{t('scanner.analyzeWithAi', 'Escanear outro rótulo')}</Text>
                                    <Text style={s.actionSubtitle}>{t('scanner.analyzeWithAiSub', 'Use a câmera para ler outra etiqueta')}</Text>
                                </View>
                                <NeoIcon name="ArrowRight2" size={16} color={tema.colors.primary[600]} />
                            </TouchableOpacity>
                        </FadeInView>

                        {/* NOVA CONSULTA */}
                        <FadeInView delay={550}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('InfoRotulos')}
                                style={s.newSearchButton}
                            >
                                <NeoIcon name="SearchNormal1" size={18} color={tema.colors.primary[600]} />
                                <Text style={s.newSearchText}>{t('scanner.newSearch', 'Nova consulta')}</Text>
                            </TouchableOpacity>
                        </FadeInView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Fábrica: recebe o DS do tema (claro, escuro ou alto contraste — todos têm o formato do DS).
const criarEstilos = (Neo) => StyleSheet.create({
    // Hero Header
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
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: Neo.spacing.sm,
    },
    heroCard: {
        height: 168,
    },
    fonteLinha: {
        marginTop: Neo.spacing.sm,
    },
    // O NeoGlifoCard ocupa o que o pai der (flex: 1): sem altura, o cartão some. Mesma ideia do ciatoxCard.
    completarCard: {
        height: 112,
        marginTop: Neo.spacing.md,
    },
    familiaChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    familiaLimite: {
        marginTop: 8,
        fontSize: 12,
        lineHeight: 18,
        color: Neo.colors.neutral[600],
    },
    dicaRotulo: {
        marginTop: Neo.spacing.sm,
        fontSize: 14,
        lineHeight: 20,
        color: Neo.colors.neutral[700],
    },
    ciatoxCard: {
        height: 92,
        marginTop: Neo.spacing.md,
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
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
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
