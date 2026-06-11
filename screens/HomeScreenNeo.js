import React, { useState, useCallback, useRef } from 'react';
import * as NavigationService from '../services/NavigationService';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
    Text,
    LayoutAnimation,
    UIManager,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import haptic from '../utils/Haptics';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path, Rect } from 'react-native-svg';

import { DS as Neo } from '../utils/DesignSystem2026';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import MedicationService from '../services/MedicationService';
import { useProfiles } from '../contexts/ProfileContext';
import ProactiveNotificationService from '../services/ProactiveNotificationService';
import ScoreService from '../services/ScoreService';

import NeoCard from '../components/NeoCard';
import { H2, Body, Eyebrow } from '../components/NeoTypography';
import CompactActiveMonitor from '../components/CompactActiveMonitor';
import AppBackground from '../components/AppBackground';
import ScaleInView from '../components/ScaleInView';
import TappablePressable from '../components/TappablePressable';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

import GlassProfileRing from '../components/GlassProfileRing';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const H_MONITOR = 146; // Altura que acomoda os labels da barra-resumo com o
                       // respiro do padding inferior (antes 120 cortava o rodapé)
const H_GAP = 6;

const HOME_PICTOGRAMS = {
    vistorias:   require('../assets/illustrations/home-pictograms/pictogram-vistoria.png'),
    saude:       require('../assets/illustrations/home-pictograms/pictogram-minha-saude.png'),
    pets:        require('../assets/illustrations/home-pictograms/pictogram-saude-pet.png'),
    atividades:  require('../assets/illustrations/home-pictograms/pictogram-atividades-especiais.png'),
    ferramentas: require('../assets/illustrations/home-pictograms/pictogram-ferramentas-ia.png'),
    inforotulos: require('../assets/illustrations/home-pictograms/pictogram-inforotulos.png'),
};

export default function HomeScreenNeo() {
    const navigation = useNavigation();
    const { rowDirection } = useLeftHandedStyle();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[800];
    const textTertiary = themeColors.neutral[700];

    const [scoreData, setScoreData] = useState({ geral: 0, ambientes: {}, pendencias: 0 });
    const [scoreMessage, setScoreMessage] = useState({ titulo: 'Monitor Ativo', alerta: 'Carregando status...' });
    const [overdueMeds, setOverdueMeds] = useState([]);
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });
    const [residences, setResidences] = useState([]);
    const [activeResidence, setActiveResidence] = useState(null);
    const [imageError, setImageError] = useState(false);

    const [monitorExpanded, setMonitorExpanded] = useState(false);
    const [systemStatus, setSystemStatus] = useState({ isConnected: true, isCriticalBattery: false });

    const lastNotifUpdate = useRef(0);
    const lastProfileId = useRef(null);

    const { primaryProfile, profiles: contextProfiles, loadProfiles } = useProfiles();
    const currentProfile = primaryProfile;

    React.useEffect(() => { setImageError(false); }, [currentProfile?.id]);

    const loadData = async () => {
        try {
            const activeRes = await ProfileService.getActiveResidence();
            const allRes = await ProfileService.getResidences();

            setResidences(allRes);
            setActiveResidence(activeRes);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

            const sData = await ScoreService.getScoreCompleto();
            setScoreData(sData);
            setScoreMessage(ScoreService.getMensagemImpacto(sData.geral, sData.pendencias));

            const overdue = await MedicationService.getOverdueMeds();
            setOverdueMeds(overdue);

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

    // ── DERIVADOS PARA ALERTA CONTEXTUAL ──
    const hasOverdueMeds = overdueMeds.length > 0;
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
        if (hasOverdueMeds) {
            return {
                tone: 'critical',
                label: t('home.overdueMeds', { count: overdueMeds.length, defaultValue: `${overdueMeds.length} medicação(ões) atrasada(s)` }),
                route: 'MedicationScheduler',
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
    const GRID_ITEMS = [
        {
            key: 'saude',
            label: t('home.myHealth'),
            image: HOME_PICTOGRAMS.saude,
            route: 'MinhaSaude',
            labelGap: 4,
        },
        {
            key: 'pets',
            label: t('home.petHealth'),
            image: HOME_PICTOGRAMS.pets,
            route: 'SaudePet',
            labelGap: 4,
        },
        {
            key: 'vistorias',
            label: t('home.inspections'),
            image: HOME_PICTOGRAMS.vistorias,
            route: 'Relatorios',
            labelGap: 4,
        },
        {
            key: 'atividades',
            label: t('home.eventualActivities', 'Atividades Eventuais'),
            image: HOME_PICTOGRAMS.atividades,
            route: 'ModoPreventivo',
            labelGap: 4,
        },
    ];

    // Histórico removido da home — apenas Ferramentas IA e Info Rótulos
    const TOOL_ITEMS = [
        {
            key: 'ferramentas',
            label: t('home.toolbox', 'Ferramentas IA'),
            image: HOME_PICTOGRAMS.ferramentas,
            route: 'FerramentasIA',
        },
        {
            key: 'inforotulos',
            label: t('home.infoLabels', 'Info Rótulos'),
            image: HOME_PICTOGRAMS.inforotulos,
            route: 'InfoRotulos',
            imageScale: 1.08,
        },
    ];

    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* LOGO — framing premium (mais respiro vertical) */}
                <View style={s.brandHeader}>
                    <Image
                        source={require('../assets/logo_vigilaro.png')}
                        style={s.brandLogo}
                        resizeMode="contain"
                    />
                </View>

                {/* HEADER: CASA + PERFIL */}
                <View style={[s.homeHeader, { flexDirection: rowDirection }]}>
                    <ResidenceIdentity
                        title={t('home.activeResidence', 'Moradia ativa')}
                        label={houseName}
                    />

                    <TappablePressable
                        onPress={() => navigateWithHaptic('QuemProteger')}
                        style={s.profileCardOuter}
                        accessibilityLabel={t('home.openProfileSelector', 'Perfil ativo: {{name}}. Toque para trocar.', { name: currentProfile?.nome || t('home.myProfile') })}
                    >
                        <View style={s.profileCardInner}>
                            <GlassProfileRing
                                profile={currentProfile}
                                score={scoreData.geral}
                                imageError={imageError}
                                onImageError={() => setImageError(true)}
                                resolveUri={ProfileService.resolveImageUri}
                                size={42}
                                ringWidth={2.7}
                            />
                            <Text style={s.profileName} numberOfLines={1}>
                                {currentProfile?.nome?.split(' ')[0] || t('home.myProfile')}
                            </Text>
                        </View>
                    </TappablePressable>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.spacing.lg,
                        paddingBottom: 40, // Reduzido drasticamente para evitar scroll excedente
                        paddingTop: 0,
                    }}
                >
                    {/* AMBIENTES VISTORIADOS */}
                    <SectionHeading>{t('home.inspectedEnvironments', 'Ambientes Vistoriados')}</SectionHeading>
                    <TappablePressable
                        onPress={toggleMonitor}
                        accessibilityState={{ expanded: monitorExpanded }}
                        accessibilityLabel={t('home.monitorLabel', 'Monitor ativo: {{title}}. {{alert}}', { title: scoreMessage.titulo, alert: scoreMessage.alerta })}
                        accessibilityHint={monitorExpanded ? t('home.monitorCollapse', 'Toque para recolher detalhes.') : t('home.monitorExpand', 'Toque para ver detalhes do status.')}
                    >
                        <View
                            style={[s.monitorCard, {
                                height: monitorExpanded ? null : H_MONITOR,
                                minHeight: H_MONITOR,
                            }]}
                        >
                            <CompactActiveMonitor
                                scoreData={scoreData}
                                scoreMessage={scoreMessage}
                                isExpanded={monitorExpanded}
                                onStatusChange={setSystemStatus}
                            />
                        </View>
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
                    <SectionHeading style={s.quickSectionHeading}>{t('home.quickAccess')}</SectionHeading>
                    <View style={s.gridContainer}>
                        {GRID_ITEMS.map((item, idx) => (
                            <ScaleInView
                                key={item.key}
                                delay={80 + idx * 60}
                                skipOnRevisit
                                screenKey="HomeGrid"
                                style={s.gridCell}
                            >
                                <View style={s.gridItemWrap}>
                                    <PremiumPictogramShortcut
                                        item={item}
                                        textColor={textPrimary}
                                        onPress={() => navigateWithHaptic(item.route)}
                                    />
                                </View>
                            </ScaleInView>
                        ))}
                    </View>

                    {/* FERRAMENTAS */}
                    <SectionHeading style={s.toolsSectionHeading}>{t('home.toolsSection', 'Ferramentas')}</SectionHeading>

                    <View style={s.toolPictogramRow}>
                        {TOOL_ITEMS.map((item, idx) => (
                            <ScaleInView
                                key={item.key}
                                delay={120 + idx * 45}
                                skipOnRevisit
                                screenKey="HomeTools"
                                style={s.toolPictogramCell}
                            >
                                    <PremiumPictogramShortcut
                                        item={item}
                                        textColor={textPrimary}
                                        compact
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

function SectionHeading({ children, style }) {
    return (
        <View style={[s.sectionHeadingWrap, style]}>
            <Text style={s.sectionHeadingText} accessibilityRole="header">
                {children}
            </Text>
        </View>
    );
}

function ResidenceHomeMark() {
    return (
        <Svg width={28} height={28} viewBox="0 0 48 48">
            <Path
                d="M10 22L24 10L38 22"
                stroke="#FFFFFF"
                strokeWidth={3.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M14 21V39H38V21"
                stroke="#FFFFFF"
                strokeWidth={3.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Rect
                x={21}
                y={28}
                width={8}
                height={11}
                rx={1.4}
                stroke="#FFFFFF"
                strokeWidth={3.2}
                fill="none"
            />
        </Svg>
    );
}

function ResidenceIdentity({ title, label }) {
    return (
        <View
            style={s.residenceIdentity}
            accessible
            accessibilityRole="summary"
            accessibilityLabel={`${title}: ${label}`}
        >
            <View style={s.residenceIdentityInner}>
                <View style={s.residencePictogramSlot}>
                    <ResidenceHomeMark />
                </View>
                <View style={s.residenceTextGroup}>
                    <Text style={s.residenceTitle} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text style={s.residenceName} numberOfLines={1}>
                        {label}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function PictogramShortcut({ item, textColor, onPress, compact = false }) {
    const statusTone = item.status?.tone;
    const accessibilityLabel = item.status
        ? `${item.label}. ${item.status.label}`
        : (item.accessibilityLabel || item.label);

    return (
        <TappablePressable
            style={[s.pictogramPressable, compact && s.pictogramPressableCompact]}
            onPress={onPress}
            pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
        >
            <View style={[s.pictogramArtBox, compact && s.pictogramArtBoxCompact]}>
                <Image
                    source={item.image}
                    style={[
                        s.pictogramImage,
                        compact && s.pictogramImageCompact,
                        item.imageScale && { transform: [{ scale: item.imageScale }] },
                    ]}
                    resizeMode="contain"
                />
            </View>
            <Text
                style={[
                    s.pictogramLabel,
                    compact && s.pictogramLabelCompact,
                    { color: textColor, marginTop: item.labelGap ?? (compact ? 8 : 6) },
                ]}
                numberOfLines={2}
            >
                {item.label}
            </Text>
            {item.status && (
                <View style={[
                    s.gridStatusPill,
                    statusTone === 'ok'       && s.gridStatusOk,
                    statusTone === 'warning'  && s.gridStatusWarning,
                    statusTone === 'critical' && s.gridStatusCritical,
                    statusTone === 'neutral'  && s.gridStatusNeutral,
                ]}>
                    <Text style={[
                        s.gridStatusText,
                        statusTone === 'ok'       && { color: Neo.colors.primary[700] },
                        statusTone === 'warning'  && { color: Neo.colors.accent.copper },
                        statusTone === 'critical' && { color: Neo.colors.feedback.error },
                        statusTone === 'neutral'  && { color: Neo.colors.neutral[600] },
                    ]}>
                        {statusTone === 'ok' && '✓ '}
                        {item.status.label}
                    </Text>
                </View>
            )}
        </TappablePressable>
    );
}

function PremiumPictogramShortcut({ item, textColor, onPress }) {
    const statusTone = item.status?.tone;
    const accessibilityLabel = item.status
        ? `${item.label}. ${item.status.label}`
        : (item.accessibilityLabel || item.label);

    return (
        <TappablePressable
            style={s.premiumPictogramCard}
            onPress={onPress}
            pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel}
        >
            <View style={s.premiumArtBox}>
                <Image
                    source={item.image}
                    style={[
                        s.premiumPictogramImage,
                        item.imageScale && { transform: [{ scale: item.imageScale }] },
                    ]}
                    resizeMode="contain"
                />
            </View>
            <Text
                style={[
                    s.premiumPictogramLabel,
                    { color: textColor },
                ]}
                numberOfLines={2}
            >
                {item.label}
            </Text>
            {item.status && (
                <View style={[
                    s.gridStatusPill,
                    statusTone === 'ok'       && s.gridStatusOk,
                    statusTone === 'warning'  && s.gridStatusWarning,
                    statusTone === 'critical' && s.gridStatusCritical,
                    statusTone === 'neutral'  && s.gridStatusNeutral,
                ]}>
                    <Text style={[
                        s.gridStatusText,
                        statusTone === 'ok'       && { color: Neo.colors.primary[700] },
                        statusTone === 'warning'  && { color: Neo.colors.accent.copper },
                        statusTone === 'critical' && { color: Neo.colors.feedback.error },
                        statusTone === 'neutral'  && { color: Neo.colors.neutral[600] },
                    ]}>
                        {statusTone === 'ok' && '✓ '}
                        {item.status.label}
                    </Text>
                </View>
            )}
        </TappablePressable>
    );
}

const s = StyleSheet.create({
    brandHeader: {
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 3,
    },
    brandLogo: {
        width: 166,
        height: 44,
        opacity: 0.94,
    },
    homeHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 3,
        paddingBottom: 4,
    },
    residenceIdentity: {
        flex: 1,
        alignSelf: 'center',
        marginRight: 10,
    },
    residenceIdentityInner: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 54,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 18,
        backgroundColor: 'rgb(251, 247, 240)', // Cor exata para fundir com a imagem da casinha
        borderWidth: 1.5,
        borderColor: 'rgba(217, 119, 6, 0.25)', // Borda uniforme em todo o elemento
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 3,
    },
    residencePictogramSlot: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#0E3B3B',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2DD4BF',
        marginRight: 10,
        flexShrink: 0,
    },
    residenceTextGroup: {
        flex: 1,
        justifyContent: 'center',
        minWidth: 0,
    },
    residenceTitle: {
        color: 'rgba(14, 59, 59, 0.62)',
        fontSize: 10,
        fontWeight: '700',
        lineHeight: 13,
        letterSpacing: 0,
    },
    residenceName: {
        color: '#0E3B3B',
        fontSize: 14,
        fontWeight: '800',
        lineHeight: 18,
        letterSpacing: 0,
        marginTop: 1,
    },
    // Card "herói" alinhado à família dos tiles de Acesso Rápido/Ferramentas:
    // tile sólido creme + borda âmbar 2px + glow âmbar (mesma assinatura
    // champagne/copper). Raio 20 (levemente maior que os 18 dos tiles) o
    // mantém como destaque sem destoar do conjunto.
    monitorCard: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 16,
        overflow: 'hidden',
        marginBottom: H_GAP,
        backgroundColor: 'rgb(251, 247, 240)',
        borderWidth: 2,
        borderColor: 'rgba(217, 119, 6, 0.25)',
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 5,
    },
    sectionHeadingWrap: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 1,
        marginBottom: 8,
    },
    sectionHeadingText: {
        width: '100%',
        color: 'rgba(120, 80, 40, 0.85)', // Tom quente / caramelo escuro em vez de cinza/verde frio
        // Tier "título de seção" (16px): acima dos labels de item (13) e abaixo
        // do h3 (22)/score herói (38) — estabelece a hierarquia que faltava.
        // 11px lia como eyebrow sem o uppercase, ficando subdimensionado.
        fontSize: 16,
        fontWeight: '700', // Um pouco menos agressivo que 800
        lineHeight: 21,
        letterSpacing: 0.2,
        textAlign: 'center',
        paddingHorizontal: 0,
        // textTransform removido para evitar o aspecto rígido e institucional do UPPERCASE
    },
    quickSectionHeading: {
        marginTop: 0,
        marginBottom: 6,
    },
    toolsSectionHeading: {
        marginTop: 2,
        marginBottom: 6,
    },
    profileCardOuter: {
        borderRadius: 20,
    },
    profileCardInner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(251, 247, 240)', // Cor exata para unificar o design
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 18,
        minWidth: 72,
        borderWidth: 1.5,
        borderColor: 'rgba(217, 119, 6, 0.25)', // Borda uniforme
        shadowColor: '#D97706',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 3,
    },
    profileName: {
        fontSize: 11,
        fontWeight: '700',
        color: '#0E3B3B',
        marginTop: 4,
        letterSpacing: 0,
    },

    // ── Alerta contextual ──
    contextAlert: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: H_GAP + 2,
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

    // ── Grid 2×2 de pictogramas proprietários ──
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 0,
        gap: 2,
    },
    gridCell: {
        width: '48.5%',
        marginBottom: 0,
    },
    pictogramPressable: {
        flex: 1,
        alignItems: 'center',
        minHeight: 108, // Reduzido para 25% menor
        paddingHorizontal: 1,
        paddingTop: 0,
        paddingBottom: 1,
    },
    pictogramPressableCompact: {
        minHeight: 84,
    },
    pictogramArtBox: {
        width: '100%',
        height: 70, // Reduzido
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
    },
    pictogramArtBoxCompact: {
        height: 56,
        marginBottom: 0,
    },
    pictogramImage: {
        width: '114%',
        height: '114%',
    },
    pictogramImageCompact: {
        width: '122%',
        height: '122%',
    },
    pictogramLabel: {
        alignSelf: 'stretch',
        fontSize: 13.2,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        lineHeight: 16,
        minHeight: 28,
        marginTop: 6,
        marginBottom: 0,
        letterSpacing: 0,
        paddingHorizontal: 2,
    },
    pictogramLabelCompact: {
        fontSize: 11.5,
        lineHeight: 14,
        minHeight: 20,
        marginTop: 8,
        marginBottom: 0,
    },
    // Micro-status pill
    gridStatusPill: {
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 10,
    },
    gridStatusOk:       { backgroundColor: 'rgba(4, 120, 87, 0.10)'   },
    gridStatusWarning:  { backgroundColor: 'rgba(180, 83, 9, 0.10)'   },
    gridStatusCritical: { backgroundColor: 'rgba(255, 59, 48, 0.10)'  },
    gridStatusNeutral:  { backgroundColor: 'rgba(120, 120, 128, 0.08)'},
    gridStatusText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.1,
    },

    // ── Ferramentas — dois pictogramas compactos centralizados ──
    toolPictogramRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginBottom: 0,
    },
    toolPictogramCell: {
        width: '40%',
        alignItems: 'center',
    },

    // ── Premium Prototype Styles ──
    premiumPictogramCard: {
        width: '100%', // Preenche a largura da célula no lugar de flex: 1
        alignItems: 'center',
        minHeight: 110,
        paddingHorizontal: 4,
        paddingTop: 6,
        paddingBottom: 6,
        marginHorizontal: 4,
        marginBottom: 6,
        borderRadius: 18,
        backgroundColor: 'rgb(251, 247, 240)', // Cor ajustada para tentar fundir com o gradiente creme dos PNGs
        borderWidth: 2,
        borderColor: 'rgba(217, 119, 6, 0.25)', 
        shadowColor: '#D97706', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12, 
        shadowRadius: 10,
        elevation: 5,
    },
    premiumArtBox: {
        width: 76,
        height: 76,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        // overflow: 'hidden' removido para não cortar as imagens
        borderRadius: 12,
    },
    premiumPictogramImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', // Garante que a arte original caiba inteira sem cortes
    },
    premiumPictogramLabel: {
        alignSelf: 'stretch',
        fontSize: 11.5, // Texto levemente menor para garantir que não empurre o card
        fontWeight: '800',
        color: 'rgba(60, 40, 20, 0.85)',
        textAlign: 'center',
        lineHeight: 12,
        minHeight: 24, // Altura do texto reduzida para economizar espaço
        letterSpacing: 0,
        marginTop: 0,
    },
});
