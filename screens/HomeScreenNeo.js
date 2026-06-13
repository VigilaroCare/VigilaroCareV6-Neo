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
 *  - Pictogramas NUS: o PNG já contém tile creme + moldura verde (é o card);
 *    o wrapper creme/âmbar criava dupla moldura e invertia a paleta da marca
 *  - Seções em Eyebrow à esquerda (token DS) — sem títulos centralizados
 *  - Ritmo vertical na escala 8pt (spacing tokens), scroll com respiro
 */
import React, { useState, useCallback, useRef } from 'react';
import * as NavigationService from '../services/NavigationService';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    LayoutAnimation,
    UIManager,
    Platform,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo } from '../utils/DesignSystem2026';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import { useProfiles } from '../contexts/ProfileContext';
import ProactiveNotificationService from '../services/ProactiveNotificationService';
import ScoreService from '../services/ScoreService';

import { H2, Eyebrow } from '../components/NeoTypography';
import CompactActiveMonitor from '../components/CompactActiveMonitor';
import AppBackground from '../components/AppBackground';
import ScaleInView from '../components/ScaleInView';
import TappablePressable from '../components/TappablePressable';
import AnimatedCounter from '../components/AnimatedCounter';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors } from '../utils/ThemeContext';

import GlassProfileRing from '../components/GlassProfileRing';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Largura das células calculada em px: dentro do TappablePressable o Pressable
// dimensiona pelo conteúdo, então width percentual NÃO resolve e a Image
// assumiria o tamanho intrínseco do PNG (1024px+), estourando a tela.
const SCREEN_W = Dimensions.get('window').width;
const CONTENT_W = SCREEN_W - 24 * 2; // paddingHorizontal do scroll (spacing.lg)
// Regra do produto: a Home NÃO deve ter scroll vertical. Os pictogramas são
// os maiores consumidores de altura — fatores calibrados pra caber tudo
// above-the-fold em telas ~800dp sem sacrificar legibilidade (labels 13px).
const GRID_IMG_W = CONTENT_W * 0.48 * 0.84;  // célula 48%, imagem compacta
const PICTO_RATIO = 3 / 4; // altura = largura × 0.75 (proporção dos tiles)

const HOME_PICTOGRAMS = {
    vistorias:   require('../assets/illustrations/home-pictograms/pictogram-vistoria.png'),
    atividades:  require('../assets/illustrations/home-pictograms/pictogram-atividades-especiais.png'),
    scanner:     require('../assets/illustrations/home-pictograms/pictogram-scanner-ambiente.png'),
    inforotulos: require('../assets/illustrations/home-pictograms/pictogram-inforotulos.png'),
};

export default function HomeScreenNeo() {
    const navigation = useNavigation();
    const { rowDirection } = useLeftHandedStyle();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const textPrimary = themeColors.neutral[900];

    const [scoreData, setScoreData] = useState({ geral: 0, ambientes: {}, pendencias: 0 });
    const [scoreMessage, setScoreMessage] = useState({ titulo: 'Monitor Ativo', alerta: 'Carregando status...' });
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });
    const [activeResidence, setActiveResidence] = useState(null);
    const [imageError, setImageError] = useState(false);

    const [monitorExpanded, setMonitorExpanded] = useState(false);
    const [systemStatus, setSystemStatus] = useState({ isConnected: true, isCriticalBattery: false });

    const lastNotifUpdate = useRef(0);
    const lastProfileId = useRef(null);

    const { primaryProfile, profiles: contextProfiles } = useProfiles();
    const currentProfile = primaryProfile;

    React.useEffect(() => { setImageError(false); }, [currentProfile?.id]);

    const loadData = async () => {
        try {
            const activeRes = await ProfileService.getActiveResidence();
            setActiveResidence(activeRes);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

            const sData = await ScoreService.getScoreCompleto();
            setScoreData(sData);
            setScoreMessage(ScoreService.getMensagemImpacto(sData.geral, sData.pendencias));

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
    const heroHeadline = score >= 80
        ? t('home.heroControl', 'Casa sob controle')
        : score >= 50
            ? t('home.heroAttention', 'Atenção necessária')
            : score > 0
                ? t('home.heroAct', 'Aja imediatamente')
                : t('home.heroStart', 'Comece sua proteção');

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
            return {
                tone: 'warning',
                label: t('home.criticalInspections', { count: scoreData.pendencias, defaultValue: `${scoreData.pendencias} pontos críticos abertos` }),
                route: 'Relatorios',
                params: { focus: 'pendencias' },
            };
        }
        return null;
    })();

    // Pictogramas proprietários: a imagem carrega a linguagem visual;
    // rótulos continuam nativos para i18n e acessibilidade.
    // Grid único de acesso rápido (4 tiles). Saúde/PHR foi removido na fase de
    // subtração — o dado de saúde-de-risco vive no perfil e alimenta o Relatório.
    const GRID_ITEMS = [
        { key: 'vistorias',  label: t('home.inspections'),                              image: HOME_PICTOGRAMS.vistorias,  route: 'Relatorios' },
        { key: 'atividades', label: t('home.eventualActivities', 'Atividades Eventuais'), image: HOME_PICTOGRAMS.atividades, route: 'ModoPreventivo' },
        // Scanner direto na Home: o antigo hub FerramentasIA virou camada de 1
        // item só, sem razão de existir. clipScanner/clipRotulos restauram o
        // respiro da família-ferramenta (PNGs com menos área transparente que
        // vistoria/atividades) pra o label não "colar".
        { key: 'scanner',    label: t('home.envScanner', 'Scanner Ambiente'), image: HOME_PICTOGRAMS.scanner,     route: 'Scanner',     topClip: 0.03, bottomClip: 0.03 },
        { key: 'inforotulos', label: t('home.infoLabels', 'Info Rótulos'),    image: HOME_PICTOGRAMS.inforotulos, route: 'InfoRotulos', topClip: 0.03, bottomClip: 0.03 },
    ];

    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER — saudação usuário-primeiro + anel de perfil */}
                <View style={[s.homeHeader, { flexDirection: rowDirection }]}>
                    <View style={s.greetingGroup}>
                        <H2 style={s.greetingText} numberOfLines={1} accessibilityRole="header">
                            {greeting}{firstName ? `, ${firstName}` : ''}
                        </H2>
                        <View
                            style={s.residenceChip}
                            accessible
                            accessibilityRole="summary"
                            accessibilityLabel={t('home.activeResidence', 'Moradia ativa') + ': ' + houseName}
                        >
                            <NeoIcon name="Home2" size={13} color={Neo.colors.primary[700]} variant="Bold" />
                            <Text style={s.residenceChipText} numberOfLines={1}>{houseName}</Text>
                        </View>
                    </View>

                    <TappablePressable
                        onPress={() => navigateWithHaptic('QuemProteger')}
                        style={s.profileRingPress}
                        accessibilityLabel={t('home.openProfileSelector', 'Perfil ativo: {{name}}. Toque para trocar.', { name: currentProfile?.nome || t('home.myProfile') })}
                    >
                        <GlassProfileRing
                            profile={currentProfile}
                            score={scoreData.geral}
                            imageError={imageError}
                            onImageError={() => setImageError(true)}
                            resolveUri={ProfileService.resolveImageUri}
                            size={48}
                            ringWidth={3}
                        />
                    </TappablePressable>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.spacing.lg,
                        paddingBottom: 100, // só a folga do footer flutuante
                        paddingTop: 4,
                    }}
                >
                    {/* HERO — "Casa sob Controle" (mockup aprovado). Forest lidera. */}
                    <TappablePressable
                        onPress={toggleMonitor}
                        style={s.heroShadowWrap}
                        accessibilityState={{ expanded: monitorExpanded }}
                        accessibilityLabel={t('home.monitorLabel', 'Monitor ativo: {{title}}. {{alert}}', { title: heroHeadline, alert: scoreMessage.alerta })}
                        accessibilityHint={monitorExpanded ? t('home.monitorCollapse', 'Toque para recolher detalhes.') : t('home.monitorExpand', 'Toque para ver detalhes do status.')}
                    >
                        {/* Verde suavizado (pedido do autor, 2026-06-11): sai do
                            forest profundo — o tom mais escuro agora é o 700,
                            terminando no emerald da marca. O texto fica na zona
                            700/600 (contraste AA garantido p/ headline 22 bold). */}
                        <LinearGradient
                            colors={[Neo.colors.primary[700], Neo.colors.primary[600], Neo.colors.primary[500]]}
                            locations={[0, 0.45, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={s.heroCard}
                        >
                            {/* Specular highlight — a "lambida de luz" que tira o
                                aspecto chapado e alinha o hero ao material
                                vitrificado do resto do app (mesma do NeoCard). */}
                            <LinearGradient
                                colors={Neo.gradients.specularDark.colors}
                                locations={Neo.gradients.specularDark.locations}
                                start={Neo.gradients.specularDark.start}
                                end={Neo.gradients.specularDark.end}
                                style={StyleSheet.absoluteFill}
                                pointerEvents="none"
                            />
                            <View style={s.heroTopRow}>
                                <View style={s.heroHeadlineGroup}>
                                    <Text style={s.heroEyebrow}>
                                        {t('home.inspectedEnvironments', 'Ambientes Vistoriados').toUpperCase()}
                                    </Text>
                                    <Text style={s.heroHeadline} numberOfLines={1}>
                                        {heroHeadline}
                                    </Text>
                                    {!!scoreMessage.alerta && (
                                        <Text style={s.heroSubline} numberOfLines={2}>
                                            {scoreMessage.alerta}
                                        </Text>
                                    )}
                                </View>
                                <View style={s.heroScoreGroup}>
                                    <AnimatedCounter
                                        value={score}
                                        duration={1100}
                                        suffix="%"
                                        style={s.heroScore}
                                        accessibilityLabel={t('home.scoreLabel', 'Score geral da residência: {{score}}%', { score })}
                                    />
                                </View>
                            </View>

                            {/* Poço claro: o detalhamento por ambiente vive numa
                                superfície clara dentro do hero — contraste garantido
                                sem reestilizar o monitor. */}
                            <View style={s.heroWell}>
                                <CompactActiveMonitor
                                    scoreData={scoreData}
                                    scoreMessage={scoreMessage}
                                    isExpanded={monitorExpanded}
                                    onStatusChange={setSystemStatus}
                                    hideScore
                                />
                            </View>
                        </LinearGradient>
                    </TappablePressable>

                    {/* ALERTA CONTEXTUAL */}
                    {contextualAlert && (
                        <TouchableOpacity
                            activeOpacity={contextualAlert.route ? 0.7 : 1}
                            onPress={contextualAlert.route ? () => navigateWithHaptic(contextualAlert.route, contextualAlert.params) : undefined}
                            style={[
                                s.contextAlert,
                                contextualAlert.tone === 'critical' && s.contextAlertCritical,
                                contextualAlert.tone === 'warning'  && s.contextAlertWarning,
                                contextualAlert.tone === 'system'   && s.contextAlertSystem,
                            ]}
                        >
                            <View style={[
                                s.contextAlertDot,
                                contextualAlert.tone === 'critical' && { backgroundColor: Neo.colors.feedback.error },
                                contextualAlert.tone === 'warning'  && { backgroundColor: Neo.colors.accent.copper },
                                contextualAlert.tone === 'system'   && { backgroundColor: Neo.colors.neutral[700] },
                            ]} />
                            <Text style={[
                                s.contextAlertText,
                                contextualAlert.tone === 'critical' && { color: Neo.colors.feedback.error },
                                contextualAlert.tone === 'warning'  && { color: Neo.colors.accent.copper },
                                contextualAlert.tone === 'system'   && { color: Neo.colors.neutral[800] },
                            ]} numberOfLines={1}>
                                {contextualAlert.label}
                            </Text>
                            {contextualAlert.route && (
                                <NeoIcon name="ArrowRight2" variant="Linear" size={14} color={
                                    contextualAlert.tone === 'critical' ? Neo.colors.feedback.error :
                                    contextualAlert.tone === 'warning'  ? Neo.colors.accent.copper :
                                    Neo.colors.neutral[700]
                                } />
                            )}
                        </TouchableOpacity>
                    )}

                    {/* ACESSO RÁPIDO */}
                    <Eyebrow style={s.sectionEyebrow}>{t('home.quickAccess')}</Eyebrow>
                    <View style={s.gridContainer}>
                        {GRID_ITEMS.map((item, idx) => (
                            <ScaleInView
                                key={item.key}
                                delay={80 + idx * 60}
                                skipOnRevisit
                                screenKey="HomeGrid"
                                style={s.gridCell}
                            >
                                <BarePictogramShortcut
                                    item={item}
                                    textColor={textPrimary}
                                    imageWidth={GRID_IMG_W}
                                    topClip={item.topClip}
                                    bottomClip={item.bottomClip}
                                    onPress={() => navigateWithHaptic(item.route)}
                                />
                            </ScaleInView>
                        ))}
                    </View>

                </ScrollView>

            </SafeAreaView>
        </AppBackground>
    );
}

/**
 * Pictograma NU: o PNG já contém o tile creme com moldura verde 3D — ele É o
 * card. Nenhum fundo, borda ou sombra extra (a dupla moldura criava a deriva
 * creme/âmbar diagnosticada no design review).
 */
// topClip/bottomClip: fração da altura "comida" por margem negativa pra
// compensar a área transparente interna de cada família de PNG. Os tiles do
// grid têm mais respiro embutido que os de Ferramentas — fatores distintos.
function BarePictogramShortcut({ item, textColor, onPress, imageWidth = GRID_IMG_W, topClip = 0.12, bottomClip = 0.11 }) {
    const imageHeight = imageWidth * PICTO_RATIO;
    return (
        <TappablePressable
            style={s.barePictogram}
            onPress={onPress}
            pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel || item.label}
        >
            <Image
                source={item.image}
                style={{
                    width: imageWidth,
                    height: imageHeight,
                    marginTop: -(imageHeight * topClip),
                    marginBottom: -(imageHeight * bottomClip),
                }}
                resizeMode="contain"
            />
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
        paddingTop: 4,
        paddingBottom: 4,
    },
    greetingGroup: {
        flex: 1,
        minWidth: 0,
        marginRight: Neo.spacing.md,
    },
    greetingText: {
        fontSize: 24,
        lineHeight: 29,
        letterSpacing: -0.4,
        color: Neo.colors.neutral[900],
    },
    residenceChip: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 5,
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Neo.radius.pill,
        backgroundColor: Neo.colors.glass.light,
        borderWidth: 1,
        borderColor: 'rgba(120, 113, 108, 0.18)',
    },
    residenceChipText: {
        fontSize: 12,
        fontWeight: '700',
        color: Neo.colors.primary[800],
    },
    profileRingPress: {
        borderRadius: Neo.radius.pill,
    },

    // ── HERO "Casa sob Controle" ──
    // Sombra no wrapper externo: overflow hidden no card mataria a sombra no iOS
    heroShadowWrap: {
        borderRadius: Neo.radius.lg,
        marginBottom: 4,
        ...Neo.shadows.premium,
    },
    heroCard: {
        borderRadius: Neo.radius.lg,
        padding: 12,
        overflow: 'hidden', // contém o specular nos cantos arredondados
        // Aresta de luz no topo (mesma linguagem das bordas vitrificadas
        // do NeoCard) — quebra o "verde chapado" com volume sutil.
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.14)',
        borderTopColor: 'rgba(255, 255, 255, 0.34)',
    },
    heroTopRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: Neo.spacing.sm,
        paddingHorizontal: 2,
    },
    heroHeadlineGroup: {
        flex: 1,
        minWidth: 0,
        paddingRight: Neo.spacing.sm,
    },
    heroEyebrow: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.4,
        color: 'rgba(255, 255, 255, 0.66)',
        marginBottom: 3,
    },
    heroHeadline: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.3,
        lineHeight: 27,
        color: '#FFFFFF',
    },
    heroSubline: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        color: 'rgba(255, 255, 255, 0.78)',
        marginTop: 3,
    },
    heroScoreGroup: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    heroScore: {
        fontSize: 40,
        fontWeight: '800',
        letterSpacing: -1,
        lineHeight: 44,
        color: '#FFFFFF',
    },
    // Poço claro dentro do hero — o monitor mantém seus estilos (pensados
    // para superfície clara) sem reestilização arriscada.
    heroWell: {
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        borderRadius: Neo.radius.md - 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },

    // ── Seções (Eyebrow do DS) — na Home, centralizados por preferência
    // do autor (telas internas seguem o padrão à esquerda do
    // PADRAO_ANATOMIA_PAGINAS.md) ──
    sectionEyebrow: {
        // Calibração do autor (2026-06-10):
        // - acima do título: 10 (+4 do hero) = 14dp até a seção anterior
        // - abaixo do título: 8dp até os cards da própria seção
        // Vale para Acesso Rápido E Ferramentas (mesmo ritmo).
        marginTop: 10,
        marginBottom: 8,
        textAlign: 'center',
        width: '100%',
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
    contextAlertCritical: {
        backgroundColor: 'rgba(255, 59, 48, 0.08)',
        borderColor: 'rgba(255, 59, 48, 0.24)',
    },
    contextAlertWarning: {
        backgroundColor: 'rgba(180, 83, 9, 0.08)',
        borderColor: 'rgba(180, 83, 9, 0.24)',
    },
    contextAlertSystem: {
        backgroundColor: 'rgba(60, 60, 67, 0.06)',
        borderColor: 'rgba(60, 60, 67, 0.16)',
    },
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
        rowGap: 8,
    },
    gridCell: {
        width: '48%',
    },
    barePictogram: {
        alignItems: 'center',
    },
    barePictogramLabel: {
        alignSelf: 'stretch',
        fontSize: 13,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 16,
        marginTop: 3,
        letterSpacing: 0,
        paddingHorizontal: 2,
    },
});
