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

import { HousePill } from '../components/PillSwitch';
import GlassProfileRing from '../components/GlassProfileRing';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const H_MONITOR = 165;
const H_GAP = 6;

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

    // Haptic agora vem do TappablePressable (single source of truth) —
    // mantemos o nome da função pra não quebrar callsites.
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

    // ── DERIVADOS PARA MICRO-STATUS E ALERTA CONTEXTUAL ──
    const hasOverdueMeds = overdueMeds.length > 0;
    const hasPendingInspections = scoreData.pendencias > 0;
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
                // Deep-link UX: usuário tocou no alerta de pendências, então
                // Relatorios fará auto-redirect para SafetyActionPlan (pula 1 tap).
                params: { focus: 'pendencias' },
            };
        }
        return null;
    })();

    // Micro-status dos cards de Acesso Rápido
    const saudeStatus = hasOverdueMeds
        ? { label: t('home.statusOverdue', { count: overdueMeds.length, defaultValue: `${overdueMeds.length} atrasadas` }), tone: 'critical' }
        : { label: t('home.statusOnTrack', 'em dia'), tone: 'ok' };

    const vistoriasStatus = hasPendingInspections
        ? { label: t('home.statusOpen', { count: scoreData.pendencias, defaultValue: `${scoreData.pendencias} abertas` }), tone: 'warning' }
        : { label: t('home.statusComplete', 'completas'), tone: 'ok' };

    // Pets e Eventuais — sem dados disponíveis ainda, ficam neutros
    const petStatus = { label: t('home.statusViewDetails', 'ver detalhes'), tone: 'neutral' };
    const eventuaisStatus = { label: t('home.statusNoneActive', 'nenhuma ativa'), tone: 'neutral' };

    // Cores derivadas do DS (Neo.colors.gridAccents) — substituem o Material
    // antigo (#9C27B0, #E91E63, #2196F3, #FF9800) por uma paleta coerente
    // ao brand (teal/rose/sky/amber rebaixados, Tailwind 600-700).
    const GRID_ITEMS = [
        {
            key: 'saude',
            label: t('home.myHealth'),
            iconName: 'Health',
            color: Neo.colors.gridAccents.saude.color,
            bg: Neo.colors.gridAccents.saude.bg,
            route: 'MinhaSaude',
            status: saudeStatus,
        },
        {
            key: 'pets',
            label: t('home.petHealth'),
            iconName: 'Pet',
            color: Neo.colors.gridAccents.pets.color,
            bg: Neo.colors.gridAccents.pets.bg,
            route: 'PetsMenu',
            status: petStatus,
        },
        {
            key: 'vistorias',
            label: t('home.inspections'),
            iconName: 'ShieldTick',
            color: Neo.colors.gridAccents.vistorias.color,
            bg: Neo.colors.gridAccents.vistorias.bg,
            route: 'Relatorios',
            status: vistoriasStatus,
        },
        {
            key: 'atividades',
            label: t('home.eventualActivities', 'Ativ. Eventuais'),
            iconName: 'Warning2',
            color: Neo.colors.gridAccents.eventuais.color,
            bg: Neo.colors.gridAccents.eventuais.bg,
            route: 'ModoPreventivo',
            status: eventuaisStatus,
            accent: true,
        },
    ];

    // CHIP_ITEMS removidos: a row de chips com 1 só elemento ficava órfã.
    // Histórico agora é um link discreto à direita das Ferramentas (mais abaixo).

    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* LOGO — framing premium (mais respiro vertical) */}
                <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 10 }}>
                    <Image
                        source={require('../assets/logo_vigilaro.png')}
                        style={{ width: 168, height: 46, opacity: 0.95 }}
                        resizeMode="contain"
                    />
                </View>

                {/* HEADER: CASA + PERFIL */}
                <View style={{
                    flexDirection: rowDirection,
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    paddingHorizontal: Neo.spacing.lg,
                    paddingTop: 8,
                    paddingBottom: 10,
                }}>
                    <HousePill
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
                                size={46}
                                ringWidth={3}
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
                        paddingBottom: 160, // acomoda altura do GlobalFloatingFooter para não cortar os chips
                        paddingTop: 2,
                    }}
                >
                    {/* AMBIENTES VISTORIADOS */}
                    <Eyebrow style={s.sectionEyebrow} accessibilityRole="header">{t('home.inspectedEnvironments', 'Ambientes Vistoriados')}</Eyebrow>
                    <TappablePressable
                        onPress={toggleMonitor}
                        accessibilityState={{ expanded: monitorExpanded }}
                        accessibilityLabel={t('home.monitorLabel', 'Monitor ativo: {{title}}. {{alert}}', { title: scoreMessage.titulo, alert: scoreMessage.alerta })}
                        accessibilityHint={monitorExpanded ? t('home.monitorCollapse', 'Toque para recolher detalhes.') : t('home.monitorExpand', 'Toque para ver detalhes do status.')}
                    >
                        <NeoCard
                            variant="premium"
                            style={{
                                height: monitorExpanded ? null : H_MONITOR,
                                minHeight: H_MONITOR,
                                borderRadius: 24,
                                paddingVertical: 16,
                                paddingHorizontal: 18,
                                overflow: 'hidden',
                                marginBottom: H_GAP + 6,
                            }}
                        >
                            <CompactActiveMonitor
                                scoreData={scoreData}
                                scoreMessage={scoreMessage}
                                isExpanded={monitorExpanded}
                                onStatusChange={setSystemStatus}
                            />
                        </NeoCard>
                    </TappablePressable>

                    {/* ───── ABSORÇÃO 1: ALERTA CONTEXTUAL ─────
                        Aparece apenas quando há item realmente urgente.
                        Sem imperativos. Cor proporcional à urgência. */}
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

                    {/* ACESSO RÁPIDO — com micro-status (Absorção 2) */}
                    <Eyebrow style={s.sectionEyebrow} accessibilityRole="header">{t('home.quickAccess')}</Eyebrow>
                    <View style={s.gridContainer}>
                        {GRID_ITEMS.map((item, idx) => (
                            <ScaleInView
                                key={item.key}
                                delay={80 + idx * 60}
                                skipOnRevisit
                                screenKey="HomeGrid"
                                style={s.gridCell}
                            >
                                <TappablePressable
                                    style={{ flex: 1 }}
                                    onPress={() => navigateWithHaptic(item.route)}
                                    pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                    accessibilityLabel={`${item.label}. ${item.status.label}`}
                                >
                                    <NeoCard
                                        variant="elevated"
                                        style={[s.gridCard, item.accent && s.gridCardAccent]}
                                    >
                                        <View style={[s.gridIconCircle, { backgroundColor: item.bg }]}>
                                            <NeoIcon name={item.iconName} size={28} color={item.color} variant="Bold" />
                                        </View>
                                        <Text style={[s.gridLabel, { color: textPrimary }]} numberOfLines={1}>{item.label}</Text>
                                        <View style={[
                                            s.gridStatusPill,
                                            item.status.tone === 'ok'       && s.gridStatusOk,
                                            item.status.tone === 'warning'  && s.gridStatusWarning,
                                            item.status.tone === 'critical' && s.gridStatusCritical,
                                            item.status.tone === 'neutral'  && s.gridStatusNeutral,
                                        ]}>
                                            <Text style={[
                                                s.gridStatusText,
                                                item.status.tone === 'ok'       && { color: Neo.colors.primary[700] },
                                                item.status.tone === 'warning'  && { color: Neo.colors.accent.copper },
                                                item.status.tone === 'critical' && { color: Neo.colors.feedback.error },
                                                item.status.tone === 'neutral'  && { color: Neo.colors.neutral[600] },
                                            ]}>
                                                {item.status.tone === 'ok' && '✓ '}
                                                {item.status.label}
                                            </Text>
                                        </View>
                                    </NeoCard>
                                </TappablePressable>
                            </ScaleInView>
                        ))}
                    </View>

                    {/* FERRAMENTAS — labels limpos, sem subtítulo "Assistente IA, Scanner e Voz" */}
                    <Eyebrow style={[s.sectionEyebrow, { marginTop: 14 }]} accessibilityRole="header">{t('home.tools')}</Eyebrow>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TappablePressable
                            onPress={() => navigateWithHaptic('FerramentasIA')}
                            style={{ flex: 1, marginRight: 5 }}
                            accessibilityLabel={t('home.toolbox', 'Ferramentas IA')}
                        >
                            <NeoCard variant="elevated" style={s.toolCard}>
                                <View style={[s.toolIconCircle, { backgroundColor: 'rgba(25,118,210,0.10)' }]}>
                                    <NeoIcon name="Setting2" size={22} color="#1976D2" variant="Bold" />
                                </View>
                                <Text style={[s.toolLabel, { color: textPrimary }]} numberOfLines={1}>
                                    {t('home.toolbox', 'Ferramentas IA')}
                                </Text>
                            </NeoCard>
                        </TappablePressable>

                        <TappablePressable
                            onPress={() => navigateWithHaptic('InfoRotulos')}
                            style={{ flex: 1, marginLeft: 5 }}
                            accessibilityLabel={t('home.infoLabels', 'Info Rótulos')}
                        >
                            <NeoCard variant="elevated" style={s.toolCard}>
                                <View style={[s.toolIconCircle, { backgroundColor: 'rgba(255,109,0,0.10)' }]}>
                                    <NeoIcon name="Scan" size={22} color="#FF6D00" variant="Bold" />
                                </View>
                                <Text style={[s.toolLabel, { color: textPrimary }]} numberOfLines={1}>
                                    {t('home.infoLabels', 'Info Rótulos')}
                                </Text>
                            </NeoCard>
                        </TappablePressable>
                    </View>

                    {/* ───── LINK DISCRETO PARA HISTÓRICO ─────
                        Acesso secundário ao log de atividades. Subtle por design:
                        não compete com Ferramentas/Acesso Rápido e não desperdiça
                        espaço como um card isolado faria. */}
                    <TouchableOpacity
                        onPress={() => navigateWithHaptic('RecentActivity')}
                        activeOpacity={0.6}
                        style={s.historyLink}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        accessibilityRole="button"
                        accessibilityLabel={t('home.viewHistory', 'Ver histórico de atividades')}
                    >
                        <NeoIcon name="Activity" size={16} color={Neo.colors.primary[700]} variant="Bold" />
                        <Text style={s.historyLinkText}>
                            {t('home.viewHistory', 'Ver histórico de atividades')}
                        </Text>
                        <NeoIcon name="ArrowRight2" variant="Linear" size={14} color={Neo.colors.primary[700]} />
                    </TouchableOpacity>

                </ScrollView>



            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Premium eyebrow para labels de seção. Margem inferior generosa pra
    // dar respiro; alinhado à esquerda (apps premium não centralizam labels).
    sectionEyebrow: {
        marginBottom: 10,
        marginTop: 4,
        textAlign: 'left',
        paddingHorizontal: 2,
    },
    profileCardOuter: {
        borderRadius: 20,
        // overflow:hidden removido (clipava a sombra externa no Android).
        // Sem flex aqui — o card já tem tamanho próprio definido pelo conteúdo.
    },
    profileCardInner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        minWidth: 76,
        // Moldura vitrificada igual ao HousePill — consistência.
        borderWidth: 1,
        borderColor: 'rgba(120, 113, 108, 0.22)',
        borderTopColor: 'rgba(255, 255, 255, 1)',
        borderTopWidth: 1.5,
        borderLeftColor: 'rgba(255, 255, 255, 0.85)',
        borderLeftWidth: 1.2,
        borderBottomColor: 'rgba(82, 75, 68, 0.20)',
        borderBottomWidth: 1.2,
        // Sombra Apple-style neutra (sem tinge Forest)
        shadowColor: '#1C1C1E',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    profileName: {
        fontSize: 11,
        fontWeight: '600',
        color: Neo.colors.neutral[800],
        marginTop: 4,
        letterSpacing: 0.1,
    },

    // ── Alerta contextual (Absorção 1) ──
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
        backgroundColor: 'rgba(255, 59, 48, 0.08)',     // iOS red tint
        borderColor: 'rgba(255, 59, 48, 0.24)',
    },
    contextAlertWarning: {
        backgroundColor: 'rgba(180, 83, 9, 0.08)',      // Copper tint
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
        letterSpacing: -0.05,
    },

    // ── Grid 2×2 (premium spacing) ──
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: H_GAP + 4,
        gap: 12,
    },
    gridCell: {
        width: '48%',
        marginBottom: 10,
    },
    gridCard: {
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 18,
        height: 132,
        position: 'relative',
    },
    // gridCardAccent intencionalmente vazio — com o vidro jateado a borda extra
    // virava "moldura sobrando". O destaque do card Eventuais agora vem só do
    // ícone laranja + micro-status próprio.
    gridCardAccent: {},
    gridIconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 6,
        letterSpacing: -0.1,
    },
    // Micro-status pill (Absorção 2)
    gridStatusPill: {
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 10,
    },
    // Pills alinhados ao DS — verde brand (Forest), warning âmbar premium,
    // critical iOS red, neutral cinza warm.
    gridStatusOk:       { backgroundColor: 'rgba(4, 120, 87, 0.10)' },     // Forest tint
    gridStatusWarning:  { backgroundColor: 'rgba(180, 83, 9, 0.10)' },     // Amber tint
    gridStatusCritical: { backgroundColor: 'rgba(255, 59, 48, 0.10)' },    // iOS red tint
    gridStatusNeutral:  { backgroundColor: 'rgba(120, 120, 128, 0.08)' },  // iOS gray tint
    gridStatusText: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.1,
    },

    // ── Ferramentas — labels limpos, sem subtítulo de IA ──
    toolCard: {
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 14,
        height: 96,
        marginBottom: 10,
    },
    toolIconCircle: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    toolLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        letterSpacing: -0.1,
    },

    // ── Link discreto para Histórico ──
    // Substitui a row de chips: subtle, alinhado à direita, não compete com
    // os blocos principais. Padrão "secondary link" em vez de "tertiary card".
    historyLink: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 12,
        gap: 6,
    },
    historyLinkText: {
        fontSize: 13,
        fontWeight: '600',
        color: Neo.colors.primary[700], // Forest Deep
        letterSpacing: 0.2,
    },
});
