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
    useWindowDimensions,
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

import { H2, Eyebrow, Body, Caption } from '../components/NeoTypography';
import HeroScoreCard from '../components/HeroScoreCard';
import NeoCard from '../components/NeoCard';
import AppBackground from '../components/AppBackground';
import ScaleInView from '../components/ScaleInView';
import TappablePressable from '../components/TappablePressable';
import AnimatedCounter from '../components/AnimatedCounter';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

import GlassProfileRing from '../components/GlassProfileRing';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Regra do produto: Home sem scroll vertical. Pictogramas são o maior
// consumidor de altura. Proporção 4:3 dos tiles (largura × 0.75 = altura).
const PICTO_RATIO = 3 / 4;

const HOME_PICTOGRAMS = {
    vistorias:   require('../assets/illustrations/home-pictograms/vistorias.png'),
    atividades:  require('../assets/illustrations/home-pictograms/atividades-eventuais.png'),
    scanner:     require('../assets/illustrations/home-pictograms/scanner-ambiente.png'),
    inforotulos: require('../assets/illustrations/home-pictograms/info-rotulos.png'),
    cuidar:      require('../assets/illustrations/home-pictograms/cuidar-e-proteger.png'),
    minhasaude:  require('../assets/illustrations/home-pictograms/minha-saude.png'),
    saudepet:    require('../assets/illustrations/home-pictograms/saude-pet.png'),
    viagem:      require('../assets/illustrations/home-pictograms/modo-viagem.png'),
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

    const { width: SCREEN_W } = useWindowDimensions();
    const CONTENT_W = SCREEN_W - 24 * 2; // paddingHorizontal do scroll (spacing.lg)
    const isTablet = SCREEN_W >= 768;
    const isCompactPhone = SCREEN_W <= 360;

    const birthDate = currentProfile?.dataNascimento;
    const idade = birthDate ? ProfileService.calcularIdade(birthDate) : null;

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
        // 0.42 (era 0.49): comprime a altura do grid p/ as 4 fileiras (8 tiles)
        // caberem ACIMA do footer — Raio-X fica tuckado atrás dele. Regra do
        // produto: "Home sem scroll, compensar altura nos pictogramas".
        GRID_IMG_W = CONTENT_W * 0.42;
        cellWidth = '49%';
    } else {
        GRID_IMG_W = CONTENT_W;
        cellWidth = '100%';
    }

    const isDark = useIsDark();
    const cardBgColorResolved = isDark ? themeColors.neutral[200] : '#F4F2EC';
    const cardBorderColorResolved = isDark ? 'rgba(255,255,255,0.15)' : (themeColors.primary?.[800] || Neo.colors.primary[800]);
    const cardBorderWidthResolved = isDark ? 1 : 1.5;

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
        { key: 'cuidar',      label: t('home.cuidarProteger', 'Cuidar & Proteger'),         image: HOME_PICTOGRAMS.cuidar,      route: 'CuidarProtegerHub' },
        { key: 'viagem',      label: t('home.travelMode', 'Modo Viagem'),                   image: HOME_PICTOGRAMS.viagem,      route: 'TravelModeScreen' },
    ];
    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    const cardBgColor = isDark ? [Neo.colors.neutral[800], Neo.colors.neutral[900]] : ['#FCFBF8', '#F4F2EC'];
    const cardBorderColor = isDark ? 'rgba(255,255,255,0.1)' : Neo.colors.primary[800];
    const cardBorderWidth = isDark ? 1 : 1.5;

    // Chip de moradia ativa — tom de marca suave (saiu do glass tímido que
    // sumia no fundo sage). Presente sem exagerar; adapta ao dark.
    const chipBg = isDark ? 'rgba(52, 211, 153, 0.14)' : Neo.colors.primary[100];
    const chipBorder = isDark ? 'rgba(52, 211, 153, 0.32)' : Neo.colors.primary[200];
    const chipText = isDark ? Neo.colors.primary[200] : Neo.colors.primary[800];
    const chipIconColor = isDark ? Neo.colors.primary[300] : Neo.colors.primary[700];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                <View style={[s.homeHeader, { flexDirection: rowDirection }]}>
                    <View style={s.greetingGroup}>
                        <H2 style={s.greetingText} numberOfLines={1} accessibilityRole="header">
                            {greeting}{firstName ? `, ${firstName}` : ''}
                        </H2>
                        <View
                            style={[s.residenceChip, { backgroundColor: chipBg, borderColor: chipBorder }]}
                            accessible
                            accessibilityRole="summary"
                            accessibilityLabel={t('home.activeResidence', 'Moradia ativa') + ': ' + houseName}
                        >
                            <NeoIcon name="Home2" size={14} color={chipIconColor} variant="Bold" />
                            <Text style={[s.residenceChipText, { color: chipText }]} numberOfLines={1}>{houseName}</Text>
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
                        paddingBottom: 140, // Espaço para o botão SOS + floating footer
                        paddingTop: 0,
                    }}
                >
                    <HeroScoreCard 
                        scoreData={scoreData}
                        heroHeadline={heroHeadline}
                        onPress={toggleMonitor}
                        isExpanded={monitorExpanded}
                        scoreMessage={scoreMessage}
                    />

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
                                    onPress={() => navigateWithHaptic(item.route)}
                                />
                            </View>
                        ))}
                    </View>



                    <View style={{ marginTop: 32 }}>
                        <TouchableOpacity onPress={() => navigateWithHaptic('HomeXRay')} activeOpacity={0.85}>
                            <View style={s.heroShadowWrap}>
                                <LinearGradient
                                    colors={cardBgColor}
                                    style={[s.heroCard, { 
                                        padding: 16, flexDirection: 'row', alignItems: 'center',
                                        borderColor: cardBorderColorResolved, borderWidth: cardBorderWidthResolved 
                                    }]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                >
                                    <Image 
                                        source={require('../assets/illustrations/home-pictograms/raio-x-casa.png')}
                                        style={{ width: 60, height: 60, marginRight: 16 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ flex: 1 }}>
                                        <Body style={{ fontWeight: '700', color: Neo.colors.neutral[900], letterSpacing: -0.2 }}>
                                            {t('home.homeXray', 'Raio-X da Casa')}
                                        </Body>
                                        <Caption style={{ color: Neo.colors.neutral[600], marginTop: 2 }}>
                                            Diagnóstico estrutural e pontos cegos
                                        </Caption>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[500]} />
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
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
}) {
    if (isRowLayout) {
        const rowImageWidth = 64;
        const rowImageHeight = rowImageWidth * PICTO_RATIO;
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
                <View style={[s.pictogramImageContainer, { width: rowImageWidth, height: rowImageHeight }]}>
                    <Image
                        source={item.image}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                    />
                </View>
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
                <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.primary[700]} />
            </TappablePressable>
        );
    }

    const imageHeight = imageWidth * PICTO_RATIO;

    return (
        <TappablePressable
            style={s.barePictogram}
            onPress={onPress}
            pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={item.accessibilityLabel || item.label}
        >
            <View style={[s.pictogramImageContainer, { width: imageWidth, height: imageHeight }]}>
                <Image
                    source={item.image}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </View>
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
        gap: 6,
        marginTop: 6,
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: Neo.radius.pill,
        // bg/border vêm inline (chipBg/chipBorder) p/ adaptar ao tema
        borderWidth: 1,
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
        // Borda verde escura para casar perfeitamente com a moldura 
        // dos pictogramas 3D abaixo.
        borderWidth: 1.5,
        borderColor: Neo.colors.primary[800],
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
        color: Neo.colors.primary[700],
        marginBottom: 3,
    },
    heroHeadline: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.3,
        lineHeight: 27,
        color: Neo.colors.primary[900],
    },
    heroSubline: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        color: Neo.colors.neutral[600],
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
        color: Neo.colors.primary[800],
    },
    // Poço claro dentro do hero — o monitor mantém seus estilos (pensados
    // para superfície clara) sem reestilização arriscada.
    heroWell: {
        backgroundColor: '#FFFFFF',
        borderRadius: Neo.radius.md - 4,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.04)',
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
    pictogramImageContainer: {
        // Mask removed because images now use true transparency
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
