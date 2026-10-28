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
import { getFooterClearance, getSosClearance } from '../components/GlobalFloatingFooter';
import NeoIcon from '../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo, withAlpha } from '../utils/DesignSystem2026';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import { useProfiles } from '../contexts/ProfileContext';
import ProactiveNotificationService from '../services/ProactiveNotificationService';
import ScoreService from '../services/ScoreService';
import NeoGlifoCard from '../components/NeoGlifoCard';

import { H2 } from '../components/NeoTypography';
import HeroScoreCard, { HERO_COMPACT_SAVING } from '../components/HeroScoreCard';
import AppBackground from '../components/AppBackground';
import TappablePressable from '../components/TappablePressable';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

import GlassProfileRing from '../components/GlassProfileRing';

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
    // `heroCompact` é decidido mais abaixo, depois de `columns` — ele depende da
    // geometria da grade e do excesso medido. Ver "A VÁLVULA DO MEDIDOR".

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

    // ── A VÁLVULA DO MEDIDOR, religada por NECESSIDADE MEDIDA ──────────────
    // A grade é quem cede primeiro: a razão desce de 0,49 até o piso de 0,32
    // conforme o excesso medido. Só quando ela bateria no piso e AINDA sobraria
    // excesso é que o medidor compacta — é a segunda alavanca, não a primeira.
    //
    // Este critério já mudou três vezes, e o histórico importa:
    //  - era `clearanceExtra > 0`: ligava em qualquer aparelho com barra de
    //    gestos, inclusive os altos, onde não fazia falta nenhuma;
    //  - em 26/10/2026 virou `false` fixo, para o medidor ganhar o tamanho da
    //    prancha L. No aparelho do Agnaldo e no emulador de 411x914 ficou
    //    perfeito. Num 16:9 de 411x731 a terceira fileira entrou embaixo do
    //    rodapé e o botão SOS ficou EM CIMA do card Scanner — medido no
    //    emulador em 27/10, com a grade já no piso de 0,32. É a regressão que o
    //    histórico deste arquivo já registrava ("os rótulos da última fileira
    //    acabavam atrás do footer no aparelho real");
    //  - agora: liga só onde a grade não dá conta. Telefones altos mantêm o
    //    medidor grande da calibração; os baixos compactam.
    //
    // ESTÁVEL por construção: depende só de `clearanceExtra` e de
    // `excedenteMedido`, e este último só cresce (ver `medirConteudo`). Então a
    // decisão não oscila entre quadros — uma vez necessária, fica.
    // Só na grade de 2 colunas: a de 1 coluna rola por projeto ("melhor rolar
    // do que esconder"), e a de 3 colunas é tablet, onde sobra altura.
    const fileirasGrade = Math.ceil(GRID_ITEMS.length / 2);
    const razaoSemMedidor = 0.49 - (clearanceExtra + excedenteMedido) / (fileirasGrade * 0.75 * CONTENT_W);
    const heroCompact = columns === 2 && razaoSemMedidor < 0.32;

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
        // A folga do botão SOS não entra aqui: ela vai no paddingBottom do
        // scroll (ver `clearanceDaGrade`), onde o laço de medição a cobra só
        // dos aparelhos que precisam.
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

    // ALTURA DO CARD RETROILUMINADO (prancha L, 25/10/2026).
    //
    // Toda a lógica acima existe para cumprir "Home sem scroll": ela encolhe o
    // pictograma até a grade caber acima do rodapé. O card novo NÃO pode
    // reabrir essa conta, então ele herda exatamente a altura que o tile mais o
    // rótulo ocupavam juntos: a imagem era GRID_IMG_W × 0.75 (razão 577/433) e
    // o rótulo somava ~22px (2 linhas de 16px com marginTop -10). O rótulo
    // agora mora DENTRO do card, então a soma é a mesma e o orçamento vertical
    // da tela não muda.
    //
    // O VÃO sai da mesma conta. Antes a separação entre fileiras vinha do
    // branco em volta do rótulo (marginBottom era só 2px); com card de cor
    // chapada as fileiras encostariam. Então o vão vira explícito e a altura do
    // card cede o mesmo tanto: por fileira dá 0,75·W + 25.
    //
    // ACOPLADO DE PROPÓSITO: a altura do card é escrita como `25 − VAO_GRADE`,
    // não como número fixo. Mexer no vão faz o card ceder ou crescer o mesmo
    // tanto, e a altura por fileira — que é o que decide se a Home rola — não
    // muda. Em 26/10/2026 a calibração no aparelho levou o vão de 9 para 11 e
    // escreveu o card como `+ 14` fixo: o resultado visual estava certo, mas o
    // acoplamento se perdeu e este comentário passou a prometer 24 enquanto o
    // código dava 25. Restaurado em 27/10 com os valores daquela calibração
    // (25 − 11 = 14), então a tela ficou exatamente igual.
    const VAO_GRADE = 11;
    const ALTURA_CARD = Math.round(GRID_IMG_W * 0.75 + 25 - VAO_GRADE);

    // FOLGA DO BOTÃO SOS — pela fonte única do rodapé, não por número próprio.
    //
    // Duas coisas flutuam sobre o fim do scroll: a barra, em toda a largura, e
    // o SOS, um círculo de 64dp centrado que sobe 16 a 20dp acima dela.
    // `getFooterClearance` cobre só a barra, e é o certo para conteúdo que não
    // passa pelo meio do ecrã. A grade de 2 colunas passa: o vão entre as
    // colunas tem ~7dp e o SOS tem 64, então os cantos internos da última
    // fileira ficam bem em cima dele.
    //
    // Medido no emulador em 27/10/2026: em todo aparelho onde o laço encolhe a
    // grade, o conteúdo termina rente ao fim da área visível, e a última
    // fileira ficava 1dp DENTRO do SOS (a 411x780 o botão encostava nos cards
    // Scanner e Info Rótulos). O toque no canto do card podia cair no SOS —
    // e este alvo é de EMERGÊNCIA; a norma de toque pede 8dp entre alvos.
    //
    // `getSosClearance` já inclui esses 8dp. O `marginBottom` da última
    // fileira (VAO_GRADE) também é espaço livre, por isso sai da conta.
    //
    // É padding, não encolhimento: nos telefones altos, onde a grade cabe com
    // sobra, nada muda na tela — a calibração aprovada no aparelho do Agnaldo
    // fica intacta. Só onde falta altura é que o laço de medição cobra esses
    // dp da grade. Com a grade já no piso de 0,32 (16:9), a Home rola esses
    // poucos dp, pela regra que já vale: melhor rolar do que esconder.
    //
    // O layout de 1 coluna mantém a sua conta: ele rola por projeto, e os +32
    // já deixam o fim da lista longe do botão.
    const clearanceDaGrade = isRowLayout
        ? footerClearance + 32
        : Math.max(footerClearance, getSosClearance(insets.bottom) - VAO_GRADE);

    // O tom do card de Vistorias vem do DADO, não do gosto. Os outros cinco
    // ficam em `info` — informação, sem juízo de risco. A assimetria é a
    // informação: o que tem cor quente é o que pede ação.
    //
    // Desde 27/10/2026 o dado é o NÍVEL de proteção (a regra do selo do
    // avatar), não a faixa crua do score — pela mesma manchete que dá a frase
    // do medidor (ScoreService.getManchete). Antes, uma casa com 95% e um
    // perigo em aberto tinha card verde e "Segurança máxima" no medidor, com o
    // avatar ao lado dizendo "Atenção necessária".
    const tomDoScore = ScoreService.getManchete(nivelProtecao, scoreData.geral).tom;

    const isDark = useIsDark();

    React.useEffect(() => { setImageError(false); }, [currentProfile?.id]);

    const loadData = async () => {
        try {
            const activeRes = await ProfileService.getActiveResidence();
            setActiveResidence(activeRes);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

            // Score e nível entram JUNTOS no estado. A frase e as cores do
            // medidor dependem dos dois (ScoreService.getManchete); com o nível
            // chegando depois, a tela mostraria por um instante a frase da
            // faixa crua e trocaria em seguida. Se o nível falhar, o score
            // entra mesmo assim e a frase cai na faixa, como era antes.
            const sData = await ScoreService.getScoreCompleto();
            const nivel = await ScoreService.getNivelProtecao(sData).catch(() => null);
            setScoreData(sData);
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

    // ── ESTADO-HERÓI ──
    // A frase do medidor era montada aqui, pela faixa crua do score. Agora o
    // HeroScoreCard a tira do nível de proteção (prop `nivel`), pela mesma
    // manchete do card de Vistorias — ver ScoreService.getManchete.

    // ── DERIVADOS PARA ALERTA CONTEXTUAL ──
    // O aviso de vistorias segue a MESMA manchete do medidor e do card de
    // Vistorias (`tomDoScore`, de ScoreService.getManchete): aparece em
    // atenção e fica sólido em crítico. Até 27/10/2026 ele tinha corte próprio
    // — score abaixo de 50%, sólido abaixo de 40% —, o último limiar declarado
    // por tela que restava na Home, contra a regra do CLAUDE.md. Com ele, uma
    // casa com 95% e um perigo em aberto não recebia aviso nenhum.
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
                label: t('home.batteryAlert', 'Bateria crítica — recarregue o dispositivo'),
                route: null,
            };
        }
        if (tomDoScore === 'error' || tomDoScore === 'warning') {
            // Nível crítico ganha tom sólido — risco real aberto na casa não
            // pode ter menos peso visual que elementos decorativos da tela
            // (auditoria UX 2026-07-30, achado 2).
            //
            // O texto diz o que conta. Antes dizia "pontos críticos" contando
            // TODAS as pendências (perigo e atenção), e a chave nem existia nos
            // locales: o aviso saía em português em qualquer idioma. Agora conta
            // os itens de perigo em aberto; se não houver nenhum (casa em
            // atenção só por cobertura baixa), conta as pendências e diz isso.
            const criticos = scoreData.statsGeral?.critical || 0;
            return {
                tone: tomDoScore === 'error' ? 'critical' : 'warning',
                label: criticos > 0
                    ? t('home.criticalInspections', { count: criticos })
                    : t('home.openPendencias', { count: scoreData.pendencias }),
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
                        {/* Chip da moradia ativa sem anel colorido duplicado:
                            o nível de proteção fica concentrado no anel + selo
                            do avatar à direita (evita dois alarmes do mesmo
                            dado lado a lado). */}
                        <View
                            style={[s.residenceChip, { backgroundColor: chipBg }]}
                            accessible
                            accessibilityRole="summary"
                            accessibilityLabel={
                                t('home.activeResidence', 'Moradia ativa') + ': ' + houseName
                                + (nivelProtecao ? '. ' + t(nivelProtecao.labelKey, nivelProtecao.label) + '.' : '')
                            }
                        >
                            <NeoIcon name="Home2" size={14} color={chipIconColor} variant="Bold" />
                            <Text style={[s.residenceChipText, { color: chipText }]} numberOfLines={1}>{houseName}</Text>
                        </View>
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
                        // continua, porque la os tiles sao mais altos. Na
                        // grade, a folga do SOS entra junto — ver
                        // `clearanceDaGrade`.
                        paddingBottom: clearanceDaGrade,
                        paddingTop: 6,
                    }}
                >
                    <HeroScoreCard
                        scoreData={scoreData}
                        nivel={nivelProtecao}
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
                                style={[s.gridCell, { width: cellWidth, marginBottom: isRowLayout ? 12 : VAO_GRADE }]}
                            >
                                {/* Um componente só nos dois layouts. O de uma
                                    coluna (telefone estreito) vira card LARGO,
                                    que é a mesma linguagem — antes ele era uma
                                    linha com tile creme, chevron e sombra
                                    própria, a única superfície da Home fora do
                                    padrão. */}
                                <NeoGlifoCard
                                    source={item.image}
                                    titulo={item.label}
                                    tom={item.key === 'vistorias' ? tomDoScore : 'info'}
                                    valor={!isRowLayout && item.key === 'vistorias' && scoreData.pendencias > 0 ? scoreData.pendencias : undefined}
                                    unidade={!isRowLayout && item.key === 'vistorias' && scoreData.pendencias > 0 ? t('home.signals.open', 'Em aberto') : undefined}
                                    sub={isRowLayout && item.key === 'vistorias' && scoreData.pendencias > 0
                                        // Conta TODAS as pendências, como o card de 2
                                        // colunas ("60 Em aberto"). Dizia "pontos
                                        // críticos" com esta mesma conta.
                                        ? t('home.openPendencias', { count: scoreData.pendencias })
                                        : undefined}
                                    largo={isRowLayout}
                                    seta={isRowLayout}
                                    arte={isRowLayout ? 76 : Math.round(ALTURA_CARD * 0.62)}
                                    tamanhoTitulo={isRowLayout ? 16 : 13}
                                    style={{ height: isRowLayout ? 88 : ALTURA_CARD }}
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
        fontSize: 19,
        lineHeight: 24,
        letterSpacing: -0.3,
    },
    residenceChip: {
        alignSelf: 'flex-start',
        marginTop: 5,
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
        marginTop: 10,
    },
    gridCell: {
        width: '49%',
        marginBottom: 2,
    },

});