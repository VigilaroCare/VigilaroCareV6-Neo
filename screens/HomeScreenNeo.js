/**
 * HomeScreenNeo.js — "Casa sob Controle"
 *
 * Redesign 2026-06-10 conforme ANALISE_DESIGN_HOME.md e o mockup de direção
 * aprovado (vigilaro-ux-mockups.png): "editorial tech, calma protetora,
 * hierarquia rigorosa, menos ornamento".
 *
 * Decisões estruturais (não reverter sem ler o design review):
 *  - Saudação usuário-primeiro no lugar do logo (logo vive em Splash/Sobre)
 *  - HERO verde-floresta com o score em type.display — Forest volta a dominar
 *  - Pictogramas: desde 22/09 o PNG traz SÓ o desenho, em fundo transparente
 *    (assets/illustrations/glifos/), e o PictogramTile desenha o tile creme,
 *    o canto e a sombra. Antes o tile vinha pintado no arquivo, o que
 *    serrilhava a moldura e impedia o tile de responder ao tema
 *  - Seções em Eyebrow à esquerda (token DS) — sem títulos centralizados
 *  - Ritmo vertical na escala 8pt (spacing tokens), scroll com respiro
 *
 * ── REVISÃO DE COR E ACESSIBILIDADE (2026-07) ─────────────────────────────
 *  - Todo hex cravado saiu. O creme do tile em row layout era '#F4F2EC', que
 *    não é o creme dos PNGs (#F4EBDC): havia dois cremes convivendo. Agora
 *    ambos vêm de colors.tile.
 *  - O alerta contextual usava feedback.error (2.97:1) e accent.copper
 *    (4.21:1) como TEXTO — as duas reprovavam em AA. Passou a usar textOn.*.
 *  - s.greetingText cravava Neo.colors.neutral[900] no StyleSheet, que é a
 *    paleta LIGHT: no dark a saudação ficava quase invisível. Cor agora é
 *    prop inline vinda do tema.
 *  - Os rgba('8, 68, 47') do alerta viraram withAlpha(token) — matiz do tema,
 *    só a opacidade na chamada.
 */
import React, { useState, useCallback, useRef } from 'react';
import * as NavigationService from '../services/NavigationService';
import {
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Text,
    LayoutAnimation,
    UIManager,
    Platform,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFooterClearance } from '../components/GlobalFloatingFooter';
import NeoIcon from '../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo, withAlpha } from '../utils/DesignSystem2026';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import { useProfiles } from '../contexts/ProfileContext';
import ProactiveNotificationService from '../services/ProactiveNotificationService';
import ScoreService from '../services/ScoreService';

import { H2 } from '../components/NeoTypography';
import HeroScoreCard, { HERO_COMPACT_SAVING } from '../components/HeroScoreCard';
import AppBackground from '../components/AppBackground';
import TappablePressable from '../components/TappablePressable';
import PictogramTile from '../components/PictogramTile';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

import GlassProfileRing, { getNivelRingColors } from '../components/GlassProfileRing';
import SafeGradient from '../components/SafeGradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Regra do produto: Home sem scroll vertical. Pictogramas são o maior
// consumidor de altura. Proporção real do PNG vem de PictogramTile
// (PICTOGRAM_ASPECT_RATIO) — fonte única, não duplicar aqui.

const HOME_PICTOGRAMS = {
    vistorias:   require('../assets/illustrations/glifos/vistorias.png'),
    atividades:  require('../assets/illustrations/glifos/atividades-eventuais.png'),
    scanner:     require('../assets/illustrations/glifos/scanner-ambiente.png'),
    inforotulos: require('../assets/illustrations/glifos/info-rotulos.png'),
    minhasaude:  require('../assets/illustrations/glifos/minha-saude.png'),
    saudepet:    require('../assets/illustrations/glifos/saude-pet.png'),
};
// Os PNGs de 'cuidar-e-proteger' e 'modo-viagem' continuam em assets: os dois
// tiles saíram da Home em 2026-07-31 (ver GRID_ITEMS), mas o Cuidar & Proteger
// segue como entrada no hub de Educação e pode voltar a precisar da arte.

export default function HomeScreenNeo() {
    const navigation = useNavigation();
    const { rowDirection } = useLeftHandedStyle();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const textPrimary = themeColors.neutral[900];

    const [scoreData, setScoreData] = useState({ geral: 0, ambientes: {}, pendencias: 0 });
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });
    const [activeResidence, setActiveResidence] = useState(null);
    const [nivelProtecao, setNivelProtecao] = useState(null);
    const [imageError, setImageError] = useState(false);

    const [monitorExpanded, setMonitorExpanded] = useState(false);
    const [systemStatus, setSystemStatus] = useState({ isConnected: true, isCriticalBattery: false });

    const lastNotifUpdate = useRef(0);
    const lastProfileId = useRef(null);

    const { focusProfile, profiles: contextProfiles } = useProfiles();
    const currentProfile = focusProfile;

    const { width: SCREEN_W } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    // Clearance REAL do footer flutuante, derivado da geometria dele — nao um
    // numero fixo. Ver components/GlobalFloatingFooter.js.
    const footerClearance = getFooterClearance(insets.bottom);
    // 90 era o valor fixo antigo. O que exceder isso e altura que o aparelho
    // deste utilizador consome a mais (barra de gestos), e precisa sair de
    // outro lugar — senao a ultima fileira de pictogramas volta pra tras do
    // footer, que e exatamente o bug que este calculo resolve.
    const clearanceExtra = Math.max(0, footerClearance - 90);
    // Parte do clearance extra sai do hero (mais barato visualmente do que
    // encolher os 8 pictogramas), o resto sai do grid.
    const heroCompact = clearanceExtra > 0;

    // ── "HOME SEM SCROLL": AJUSTE MEDIDO, NAO ESTIMADO ──────────────────────
    // Toda a estimativa aqui (altura do header, do hero, do rotulo de 2 linhas,
    // do inset) e uma aproximacao, e foi por acumular aproximacoes que a
    // ultima fileira ficou escondida tantas vezes. Em vez de estimar melhor,
    // fechamos o laco: renderiza, mede o excedente REAL de altura e encolhe o
    // grid exatamente nesse tanto. Converge em 1-2 frames e vale para qualquer
    // aparelho, fonte de acessibilidade ou tamanho de ecra.
    const [excedenteMedido, setExcedenteMedido] = useState(0);
    const alturaVisivel = useRef(0);

    // Qualquer mudanca de geometria invalida a medicao anterior. O accordion
    // de pendencias do HeroScoreCard (monitorExpanded) tambem conta: abri-lo
    // cresce o conteudo de verdade (excedente mede certo, grid encolhe), mas
    // ao fechar o excedente medido durante a expansao ficava "grudado" — o
    // laco so encolhe, nunca volta a crescer sozinho — e os tiles continuavam
    // pequenos com o accordion ja fechado. Reset aqui forca remedicao limpa
    // toda vez que o accordion abre OU fecha.
    React.useEffect(() => { setExcedenteMedido(0); }, [SCREEN_W, insets.bottom, monitorExpanded]);

    const medirAreaVisivel = useCallback((e) => {
        alturaVisivel.current = e.nativeEvent.layout.height;
    }, []);

    const medirConteudo = useCallback((_w, alturaConteudo) => {
        const visivel = alturaVisivel.current;
        if (!visivel) return;
        const sobra = alturaConteudo - visivel;
        // Só encolhe, nunca cresce de volta: crescer reintroduz o excedente e
        // o laco oscila. Banda morta de 1px evita ajuste por arredondamento.
        if (sobra > 1) {
            setExcedenteMedido((anterior) => anterior + sobra);
        }
    }, []);

    const CONTENT_W = SCREEN_W - 24 * 2; // paddingHorizontal do scroll (spacing.lg)
    const isTablet = SCREEN_W >= 768;
    const isCompactPhone = SCREEN_W <= 360;

    const birthDate = currentProfile?.dataNascimento;
    const idade = birthDate ? ProfileService.calcularIdade(birthDate) : null;

    // Pictogramas proprietários: a imagem carrega a linguagem visual;
    // rótulos continuam nativos para i18n e acessibilidade.
    // Grid único de acesso rápido (8 tiles). Saúde voltou como REGISTRO por
    // perfil (Sua Saúde / Saúde do Pet): informativo, sem scheduler — o dado de
    // risco vive no perfil e também alimenta o Relatório. PHR/scheduler segue fora.
        const GRID_ITEMS = [
        { key: 'vistorias',   label: t('home.inspections', 'Vistorias'),                  image: HOME_PICTOGRAMS.vistorias,   route: 'Relatorios'      },
        { key: 'atividades',  label: t('home.eventualActivities', 'Atividades Eventuais'), image: HOME_PICTOGRAMS.atividades,  route: 'ModoPreventivo'  },
        { key: 'minhasaude',  label: t('home.myHealth', 'Minha Saúde'),                    image: HOME_PICTOGRAMS.minhasaude,  route: 'MinhaSaude'      },
        { key: 'saudepet',    label: t('home.petHealth', 'Saúde Pet'),                     image: HOME_PICTOGRAMS.saudepet,    route: 'SaudePet'        },
        { key: 'scanner',     label: t('home.envScanner', 'Scanner Ambiente'),              image: HOME_PICTOGRAMS.scanner,     route: 'Scanner',     topClip: 0.03, bottomClip: 0.03 },
        { key: 'inforotulos', label: t('home.infoLabels', 'Info Rótulos'),                  image: HOME_PICTOGRAMS.inforotulos, route: 'InfoRotulos', topClip: 0.03, bottomClip: 0.03 },
        // 2026-07-31 — de 8 para 6 tiles, o que tira uma fileira inteira do
        // grid (143px) e deixa os pictogramas irem até o teto de largura da
        // coluna. Os dois que saíram não foram rebaixados, foram realocados
        // para onde pertencem:
        //   'cuidar' -> Educação. É conteúdo puramente educativo; as chaves de
        //               tradução dele já eram do namespace knowledgeHub.*.
        //   'viagem' -> aba do rodapé. É um ESTADO, não um destino, e um tile
        //               estático não consegue dizer se está ativo. A aba
        //               consegue: o avião decola quando o modo liga.
    ];

    let columns = 2;
    if (isCompactPhone) {
        columns = 1;
    } else if (isTablet) {
        columns = 3;
    } else {
        columns = 2;
    }

    const isRowLayout = columns === 1;

    let GRID_IMG_W = CONTENT_W * 0.49;
    let cellWidth = '49%';
    if (columns === 3) {
        GRID_IMG_W = CONTENT_W * 0.32;
        cellWidth = '32%';
    } else if (columns === 2) {
        // HISTÓRICO: o ratio foi 0.49 originalmente, caiu para 0.42 para as 4
        // fileiras (8 tiles) caberem acima do footer, e uma tentativa de voltar
        // a 0.43 em 2026-07-30 foi revertida — os rótulos da última fileira
        // acabavam atrás do footer no aparelho real.
        //
        // Com 6 tiles (2026-07-31) são 3 fileiras, o que devolve ~143px e
        // permite voltar ao teto de 0.49.
        //
        // ADAPTATIVO: em vez de mais um número fixo, o grid absorve o clearance
        // EXTRA que cada aparelho exige. Sem barra de gestos fica no teto; com
        // barra encolhe só o necessário, e o laço de medição corrige o resto.
        //
        // Geometria: PICTOGRAM_ASPECT_RATIO é 577/433 (largura:altura), logo
        // altura = largura × 0.75. Com N fileiras, altura do grid =
        // N × GRID_IMG_W × 0.75. Para poupar S px: delta_ratio =
        // S / (N × 0.75 × CONTENT_W).
        const poupancaDoHero = heroCompact ? HERO_COMPACT_SAVING : 0;
        // Estimativa inicial (primeiro frame) + correcao medida (frames
        // seguintes). A medida manda: se a estimativa errou, `excedenteMedido`
        // corrige exatamente a diferenca.
        const faltaAbsorver = Math.max(0, clearanceExtra - poupancaDoHero) + excedenteMedido;
        // Derivado do número real de fileiras — antes estava fixo em 3, que era
        // 4 fileiras × 0.75. Com 6 tiles são 3 fileiras, e o divisor muda.
        const fileiras = Math.ceil(GRID_ITEMS.length / 2);
        const deltaRatio = faltaAbsorver / (fileiras * 0.75 * CONTENT_W);
        // Piso de 0.32: abaixo disso o pictograma fica pequeno demais para o
        // rotulo de 2 linhas respirar. Se nem assim couber (fonte de
        // acessibilidade no maximo, por exemplo), a Home rola — melhor rolar
        // do que esconder.
        // Teto de 0.49: a célula ocupa 49% da largura do conteúdo, então a
        // imagem não pode passar disso sem transbordar. Com 6 tiles em 3
        // fileiras sobra altura, e o ratio sobe até encostar nesse teto — era
        // 0.42 quando eram 4 fileiras.
        const ratioGrid = Math.min(0.49, Math.max(0.32, 0.49 - deltaRatio));
        GRID_IMG_W = CONTENT_W * ratioGrid;
        cellWidth = '49%';
    } else {
        GRID_IMG_W = CONTENT_W;
        cellWidth = '100%';
    }

    const isDark = useIsDark();
    // Superfície dos tiles em row layout (telas estreitas). O mesmo creme que
    // os PNGs dos pictogramas carregam impresso — e o mesmo do HeroScoreCard.
    const cardBgColorResolved = themeColors.tile.cream;
    const cardBorderColorResolved = themeColors.tile.border;
    const cardBorderWidthResolved = themeColors.tile.borderWidth;

    React.useEffect(() => { setImageError(false); }, [currentProfile?.id]);

    const loadData = async () => {
        try {
            const activeRes = await ProfileService.getActiveResidence();
            setActiveResidence(activeRes);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

            const sData = await ScoreService.getScoreCompleto();
            setScoreData(sData);

            const nivel = await ScoreService.getNivelProtecao(sData);
            setNivelProtecao(nivel);

        } catch (e) {
            if (__DEV__) {
                console.log('HomeScreenNeo loadData error:', e);
            }
        }
    };

    useFocusEffect(useCallback(() => { loadData(); }, [currentProfile?.id]));

    React.useEffect(() => {
        if (!currentProfile?.id) return;
        const timer = setTimeout(() => {
            const now = Date.now();
            if (lastProfileId.current !== currentProfile.id || (now - lastNotifUpdate.current > 3600000)) {
                ProactiveNotificationService.refreshAll(contextProfiles || [], familyMeta);
                lastNotifUpdate.current = now;
                lastProfileId.current = currentProfile.id;
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentProfile?.id, contextProfiles, familyMeta]);

    const navigateWithHaptic = useCallback((route, params) => {
        try {
            NavigationService.navigate(route, params);
        } catch (e) {
            navigation.navigate(route, params);
        }
    }, [navigation]);

    const toggleMonitor = useCallback(() => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(300, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity)
        );
        setMonitorExpanded(prev => !prev);
    }, []);

    // ── SAUDAÇÃO POR PERÍODO DO DIA ──
    const hour = new Date().getHours();
    const greeting = hour < 12
        ? t('home.greetingMorning', 'Bom dia')
        : hour < 18
            ? t('home.greetingAfternoon', 'Boa tarde')
            : t('home.greetingEvening', 'Boa noite');
    const firstName = currentProfile?.nome?.split(' ')[0] || '';

    // ── ESTADO-HERÓI (manchete do hero verde) ──
    const score = scoreData.geral;
    // Faixa única (ScoreService.getBanda) — mesmo limiar do HeroScoreCard.
    const heroHeadline = ScoreService.getBanda(score).headline;

    // ── DERIVADOS PARA ALERTA CONTEXTUAL ──
    const hasCriticalScore = scoreData.geral > 0 && scoreData.geral < 50;
    const hasOffline = !systemStatus.isConnected;
    const hasCriticalBattery = systemStatus.isCriticalBattery;

    // Prioridade de mensagens (sistema > saúde > vistorias)
    const contextualAlert = (() => {
        if (hasOffline) {
            return {
                tone: 'system',
                label: t('home.offlineAlert', 'Offline — apenas conteúdos e SOS'),
                route: null,
            };
        }
        if (hasCriticalBattery) {
            return {
                tone: 'system',
                label: t('home.batteryAlert', 'Bateria crítica — carregue o dispositivo'),
                route: null,
            };
        }
        if (hasCriticalScore) {
            // Faixa "critico" do ScoreService (score < 40) ganha tom solido —
            // risco real aberto na casa nao pode ter menos peso visual que
            // elementos decorativos da tela (auditoria UX 2026-07-30, achado 2).
            const isSevere = scoreData.geral < 40;
            return {
                tone: isSevere ? 'critical' : 'warning',
                label: t('home.criticalInspections', { count: scoreData.pendencias, defaultValue: `${scoreData.pendencias} pontos críticos abertos` }),
                route: 'Relatorios',
                params: { focus: 'pendencias' },
            };
        }
        return null;
    })();

    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    // Tons do alerta contextual. Texto vem de textOn (aferido em AA);
    // preenchimento e borda vêm de feedback com alpha — nunca o contrário.
    const alertTone = {
        critical: { text: themeColors.textOn.error,   fill: themeColors.feedback.error },
        warning:  { text: themeColors.textOn.warning, fill: themeColors.feedback.warning },
        system:   { text: themeColors.textOn.muted,   fill: themeColors.neutral[500] },
    };
    const tone = contextualAlert ? (alertTone[contextualAlert.tone] || alertTone.system) : null;

    // Chip de moradia ativa — tom de marca suave (saiu do glass tímido que
    // sumia no fundo sage). Presente sem exagerar; adapta ao dark.
    const chipBg = isDark
        ? withAlpha(themeColors.primary[700], 0.14)
        : themeColors.primary[100];
    // textOn.brand já resolve por tema (#065F46 no light, #34D399 no dark) e é
    // aferido em AA. O código anterior lia Neo.colors (paleta LIGHT sempre):
    // trocar por themeColors.primary[200] teria escurecido o texto no dark.
    const chipText = themeColors.textOn.brand;
    const chipIconColor = themeColors.textOn.brand;
    // Ícone da casinha ecoa o TOM do nível (textOn.* é AA nas superfícies
    // claras dos dois temas). O texto do chip permanece brand — o eco de
    // estado é a moldura + ícone, não o nome da casa inteiro colorido.
    const chipLevelIconColor = (nivelProtecao && nivelProtecao.tone !== 'muted' && themeColors.textOn[nivelProtecao.tone])
        ? themeColors.textOn[nivelProtecao.tone]
        : chipIconColor;

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                <View style={[s.homeHeader, { flexDirection: rowDirection }]}>
                    {/* Coluna esquerda: saudacao + chip empilhados. O avatar
                        (a direita) centraliza contra ESSE bloco de 2 linhas,
                        nao so contra a saudacao — mais compacto (max() em vez
                        de soma de duas fileiras) e libera altura real pro
                        resto da Home. Ajustado 2026-07-30 depois de o par
                        "so saudacao" ter empurrado os titulos da ultima
                        fileira do grid pra tras do footer flutuante. */}
                    <View style={s.greetingGroup}>
                        <H2 style={[s.greetingText, { color: textPrimary }]} numberOfLines={1} accessibilityRole="header">
                            {greeting}{firstName ? `, ${firstName}` : ''}
                        </H2>
                        {/* Moldura do chip = mesma gramática do anel do avatar
                            (nível de proteção da residência ativa). ECO, não
                            duplicata: o selo com ícone de estado fica só no
                            avatar — dois alarmes idênticos lado a lado seria
                            ruído. Sem nível ainda (load), gradiente neutro. */}
                        <SafeGradient
                            colors={getNivelRingColors(nivelProtecao?.key)}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={s.residenceChipRing}
                        >
                            <View
                                style={[s.residenceChip, { backgroundColor: chipBg }]}
                                accessible
                                accessibilityRole="summary"
                                accessibilityLabel={
                                    t('home.activeResidence', 'Moradia ativa') + ': ' + houseName
                                    + (nivelProtecao ? '. ' + t(nivelProtecao.labelKey, nivelProtecao.label) + '.' : '')
                                }
                            >
                                <NeoIcon name="Home2" size={14} color={chipLevelIconColor} variant="Bold" />
                                <Text style={[s.residenceChipText, { color: chipText }]} numberOfLines={1}>{houseName}</Text>
                            </View>
                        </SafeGradient>
                    </View>

                    <TappablePressable
                        onPress={() => navigateWithHaptic('QuemProteger')}
                        style={s.profileRingPress}
                        accessibilityLabel={
                            t('home.openProfileSelector', 'Perfil ativo: {{name}}. Toque para trocar.', { name: currentProfile?.nome || t('home.myProfile') })
                            + (nivelProtecao ? ' ' + t(nivelProtecao.labelKey, nivelProtecao.label) + '.' : '')
                        }
                    >
                        <GlassProfileRing
                            profile={currentProfile}
                            score={scoreData.geral}
                            nivel={nivelProtecao}
                            showBadge
                            imageError={imageError}
                            onImageError={() => setImageError(true)}
                            resolveUri={ProfileService.resolveImageUri}
                            size={56}
                            ringWidth={3.5}
                        />
                    </TappablePressable>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    onLayout={medirAreaVisivel}
                    onContentSizeChange={medirConteudo}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.spacing.lg,
                        // Respiro redistribuido (soma zero, preserva "Home sem
                        // scroll"): +6 no topo (era 0) tirado do clearance de
                        // baixo (era 96/128). O header voltou a ser uma unica
                        // linha (saudacao+chip numa coluna, avatar 56px
                        // centralizado contra ESSE bloco de 2 linhas — ver
                        // greetingGroup) em vez de duas fileiras empilhadas;
                        // isso mantem a altura do header igual a original, sem
                        // precisar encolher o avatar pra sobrar espaco.
                        // Derivado da geometria real do footer flutuante, nao
                        // um numero fixo — ver getFooterClearance(). O valor
                        // fixo anterior (90) ignorava insets.bottom e por isso
                        // escondia a ultima fileira de pictogramas em aparelho
                        // com barra de gestos. O extra do row layout (+32)
                        // continua, porque la os tiles sao mais altos.
                        paddingBottom: footerClearance + (isRowLayout ? 32 : 0),
                        paddingTop: 6,
                    }}
                >
                    <HeroScoreCard
                        scoreData={scoreData}
                        heroHeadline={heroHeadline}
                        onDataChanged={loadData}
                        onPress={toggleMonitor}
                        onOpenHomeXRay={() => navigateWithHaptic('HomeXRay')}
                        isExpanded={monitorExpanded}
                        compact={heroCompact}
                    />

                    {contextualAlert && (
                        <TouchableOpacity
                            activeOpacity={contextualAlert.route ? 0.7 : 1}
                            onPress={contextualAlert.route ? () => navigateWithHaptic(contextualAlert.route, contextualAlert.params) : undefined}
                            style={[
                                s.contextAlert,
                                contextualAlert.tone === 'critical'
                                    ? { backgroundColor: tone.fill, borderColor: tone.fill }
                                    : { backgroundColor: withAlpha(tone.fill, 0.08), borderColor: withAlpha(tone.fill, 0.24) },
                            ]}
                            accessibilityRole={contextualAlert.route ? 'button' : 'text'}
                            accessibilityLabel={contextualAlert.label}
                        >
                            {contextualAlert.tone === 'critical' ? (
                                <NeoIcon name="Warning2" size={16} color={themeColors.neutral.white} variant="Bold" style={{ marginRight: 8 }} />
                            ) : (
                                <View style={[s.contextAlertDot, { backgroundColor: tone.fill }]} />
                            )}
                            <Text
                                style={[s.contextAlertText, { color: contextualAlert.tone === 'critical' ? themeColors.neutral.white : tone.text }]}
                                numberOfLines={contextualAlert.tone === 'critical' ? 2 : 1}
                            >
                                {contextualAlert.label}
                            </Text>
                            {contextualAlert.route && (
                                <NeoIcon name="ArrowRight2" variant="Linear" size={14} color={contextualAlert.tone === 'critical' ? themeColors.neutral.white : tone.text} />
                            )}
                        </TouchableOpacity>
                    )}

                    <View style={s.gridContainer}>
                        {GRID_ITEMS.map((item, idx) => (
                            <View
                                key={item.key}
                                style={[s.gridCell, { width: cellWidth, marginBottom: isRowLayout ? 12 : 2 }]}
                            >
                                <BarePictogramShortcut
                                    item={item}
                                    textColor={textPrimary}
                                    imageWidth={GRID_IMG_W}
                                    isRowLayout={isRowLayout}
                                    cardBgColor={cardBgColorResolved}
                                    cardBorderColor={cardBorderColorResolved}
                                    cardBorderWidth={cardBorderWidthResolved}
                                    accentColor={themeColors.textOn.brand}
                                    onPress={() => navigateWithHaptic(item.route)}
                                />
                            </View>
                        ))}
                    </View>



                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

/**
 * Pictograma NU: o PNG já contém o tile creme com moldura verde 3D — ele É o
 * card. Renderizamos a imagem inteira sem recortes rudimentares no código.
 */
function BarePictogramShortcut({
    item,
    textColor,
    onPress,
    imageWidth,
    isRowLayout,
    cardBgColor,
    cardBorderColor,
    cardBorderWidth,
    accentColor,
}) {
    if (isRowLayout) {
        return (
            <TappablePressable
                style={[
                    s.barePictogramRow,
                    {
                        backgroundColor: cardBgColor,
                        borderColor: cardBorderColor,
                        borderWidth: cardBorderWidth,
                        padding: 12,
                    }
                ]}
                onPress={onPress}
                pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityRole="button"
                accessibilityLabel={item.accessibilityLabel || item.label}
            >
                <PictogramTile source={item.image} width={64} moldura atenuado={isDark} />
                <Text
                    style={[
                        s.barePictogramLabelRow,
                        {
                            color: textColor,
                            fontSize: 15,
                            fontWeight: '700',
                            lineHeight: 18,
                        }
                    ]}
                    numberOfLines={2}
                >
                    {item.label}
                </Text>
                <NeoIcon name="ArrowRight2" size={20} color={accentColor} />
            </TappablePressable>
        );
    }

    return (
        <TappablePressable
            style={s.barePictogram}
            onPress={onPress}
            pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel || item.label}
        >
            <PictogramTile source={item.image} width={imageWidth} moldura atenuado={isDark} />
            <Text style={[s.barePictogramLabel, { color: textColor }]} numberOfLines={2}>
                {item.label}
            </Text>
        </TappablePressable>
    );
}

const s = StyleSheet.create({

    // ── Header: saudação + perfil ──
    homeHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 2,
        paddingBottom: 2,
    },
    greetingGroup: {
        flex: 1,
        minWidth: 0,
        marginRight: Neo.spacing.md,
    },
    // Sem color aqui: o StyleSheet é avaliado no escopo do módulo, antes de o
    // tema existir. A cor entra como prop inline no <H2>.
    greetingText: {
        fontSize: 24,
        lineHeight: 29,
        letterSpacing: -0.4,
    },
    // Moldura gradiente do chip — mesmo peso do anel do avatar (3 vs 3.5;
    // o padding faz o papel de borda, a borda sólida antiga saiu para não
    // somar duas molduras).
    residenceChipRing: {
        alignSelf: 'flex-start',
        marginTop: 6,
        padding: 3,
        borderRadius: Neo.radius.pill,
    },
    residenceChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: Neo.radius.pill,
        // bg vem inline (chipBg) p/ adaptar ao tema
    },
    residenceChipText: {
        fontSize: 12.5,
        fontWeight: '700',
        letterSpacing: -0.1,
        // color vem inline (chipText) p/ adaptar ao tema
    },
    profileRingPress: {
        borderRadius: Neo.radius.pill,
    },

    // ── Alerta contextual ──
    contextAlert: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginTop: Neo.spacing.sm,
        borderWidth: 1,
    },
    // As três variantes de tom saíram daqui: cor vem de withAlpha(token) no
    // render, para o alerta acompanhar o tema em vez de cravar rgba.
    contextAlertDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    contextAlertText: {
        flex: 1,
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 0,
    },

    // ── Grid 2×2 de pictogramas nus ──
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    gridCell: {
        width: '49%',
        marginBottom: 2,
    },

    barePictogram: {
        alignItems: 'center',
        paddingVertical: 0,
    },
    barePictogramRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    barePictogramLabel: {
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 16,
        textAlign: 'center',
        marginTop: -10,
        paddingHorizontal: 4,
    },
    barePictogramLabelRow: {
        flex: 1,
        fontWeight: '700',
        marginLeft: 12,
        marginRight: 8,
    },
});