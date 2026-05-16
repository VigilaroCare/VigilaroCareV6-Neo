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
import {
    ShieldTick, Health, Scan, Warning2, Home2, CloseCircle, Building,
    ArrowRight2, Pet, Setting2, DocumentText, InfoCircle, Activity,
} from 'iconsax-react-native';
import * as Haptics from 'expo-haptics';
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
import { H2, Body } from '../components/NeoTypography';
import CompactActiveMonitor from '../components/CompactActiveMonitor';
import AppBackground from '../components/AppBackground';
import ScaleInView from '../components/ScaleInView';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

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

    const [scoreData, setScoreData] = useState({ geral: 0, ambientes: {}, pendencias: 0 });
    const [scoreMessage, setScoreMessage] = useState({ titulo: 'Monitor Ativo', alerta: 'Carregando status...' });
    const [overdueMeds, setOverdueMeds] = useState([]);
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });
    const [residences, setResidences] = useState([]);
    const [activeResidence, setActiveResidence] = useState(null);
    const [modalResidenciaVisible, setModalResidenciaVisible] = useState(false);
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

    const navigateWithHaptic = useCallback((route) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            NavigationService.navigate(route);
        } catch (e) {
            navigation.navigate(route);
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

    const GRID_ITEMS = [
        {
            key: 'saude',
            label: t('home.myHealth'),
            Icon: Health,
            color: '#9C27B0',
            route: 'MinhaSaude',
            status: saudeStatus,
        },
        {
            key: 'pets',
            label: t('home.petHealth'),
            Icon: Pet,
            color: '#E91E63',
            route: 'PetsMenu',
            status: petStatus,
        },
        {
            key: 'vistorias',
            label: t('home.inspections'),
            Icon: ShieldTick,
            color: '#2196F3',
            route: 'Relatorios',
            status: vistoriasStatus,
        },
        {
            key: 'atividades',
            label: t('home.eventualActivities', 'Ativ. Eventuais'),
            Icon: Warning2,
            color: '#FF9800',
            route: 'ModoPreventivo',
            status: eventuaisStatus,
            accent: true,
        },
    ];

    const CHIP_ITEMS = [
        // 'relatorios' removido: duplica destino do card Vistorias no grid acima
        // 'briefing' removido a pedido do usuário (acessível por outras rotas)
        { key: 'historico',  label: t('home.recent', 'Histórico'),    Icon: Activity,     route: 'RecentActivity' },
    ];

    const houseName = activeResidence?.nome === 'Minha Casa Principal'
        ? t('home.mainHouse', 'Minha Casa Principal')
        : (activeResidence?.nome || t('home.mainHouse', 'Minha Casa Principal'));

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* LOGO */}
                <View style={{ alignItems: 'center', paddingTop: 6, paddingBottom: 4 }}>
                    <Image
                        source={require('../assets/logo_vigilaro.png')}
                        style={{ width: 180, height: 50 }}
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
                        isModalOpen={modalResidenciaVisible}
                        onPress={() => setModalResidenciaVisible(true)}
                    />

                    <TouchableOpacity
                        onPress={() => navigateWithHaptic('QuemProteger')}
                        style={s.profileCardOuter}
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
                    </TouchableOpacity>
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
                    <Text style={s.sectionLabel}>{t('home.inspectedEnvironments', 'Ambientes Vistoriados')}</Text>
                    <TouchableOpacity activeOpacity={0.9} onPress={toggleMonitor}>
                        <NeoCard
                            variant="glass"
                            style={{
                                height: monitorExpanded ? null : H_MONITOR,
                                minHeight: H_MONITOR,
                                borderRadius: 22,
                                paddingVertical: 12,
                                paddingHorizontal: 14,
                                overflow: 'hidden',
                                marginBottom: H_GAP + 4,
                                shadowColor: Neo.colors.primary[500],
                                shadowOffset: { width: 0, height: 8 },
                                shadowOpacity: 0.12,
                                shadowRadius: 24,
                            }}
                        >
                            <CompactActiveMonitor
                                scoreData={scoreData}
                                scoreMessage={scoreMessage}
                                isExpanded={monitorExpanded}
                                onStatusChange={setSystemStatus}
                            />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* ───── ABSORÇÃO 1: ALERTA CONTEXTUAL ─────
                        Aparece apenas quando há item realmente urgente.
                        Sem imperativos. Cor proporcional à urgência. */}
                    {contextualAlert && (
                        <TouchableOpacity
                            activeOpacity={contextualAlert.route ? 0.7 : 1}
                            onPress={contextualAlert.route ? () => navigateWithHaptic(contextualAlert.route) : undefined}
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
                                contextualAlert.tone === 'warning'  && { backgroundColor: '#F57C00' },
                                contextualAlert.tone === 'system'   && { backgroundColor: Neo.colors.neutral[700] },
                            ]} />
                            <Text style={[
                                s.contextAlertText,
                                contextualAlert.tone === 'critical' && { color: Neo.colors.feedback.error },
                                contextualAlert.tone === 'warning'  && { color: '#E65100' },
                                contextualAlert.tone === 'system'   && { color: Neo.colors.neutral[800] },
                            ]} numberOfLines={1}>
                                {contextualAlert.label}
                            </Text>
                            {contextualAlert.route && (
                                <ArrowRight2 size={14} color={
                                    contextualAlert.tone === 'critical' ? Neo.colors.feedback.error :
                                    contextualAlert.tone === 'warning'  ? '#E65100' :
                                    Neo.colors.neutral[700]
                                } />
                            )}
                        </TouchableOpacity>
                    )}

                    {/* ACESSO RÁPIDO — com micro-status (Absorção 2) */}
                    <Text style={s.sectionLabel}>{t('home.quickAccess')}</Text>
                    <View style={s.gridContainer}>
                        {GRID_ITEMS.map((item, idx) => (
                            <ScaleInView
                                key={item.key}
                                delay={80 + idx * 60}
                                skipOnRevisit
                                screenKey="HomeGrid"
                                style={s.gridCell}
                            >
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => navigateWithHaptic(item.route)}
                                    activeOpacity={0.85}
                                    pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                >
                                    <NeoCard
                                        variant="elevated"
                                        style={[s.gridCard, item.accent && s.gridCardAccent]}
                                    >
                                        <View style={[s.gridIconCircle, { backgroundColor: item.color + '1A' }]}>
                                            <item.Icon size={26} color={item.color} variant="Bold" />
                                        </View>
                                        <Text style={s.gridLabel} numberOfLines={1}>{item.label}</Text>
                                        <View style={[
                                            s.gridStatusPill,
                                            item.status.tone === 'ok'       && s.gridStatusOk,
                                            item.status.tone === 'warning'  && s.gridStatusWarning,
                                            item.status.tone === 'critical' && s.gridStatusCritical,
                                            item.status.tone === 'neutral'  && s.gridStatusNeutral,
                                        ]}>
                                            <Text style={[
                                                s.gridStatusText,
                                                item.status.tone === 'ok'       && { color: '#2E7D32' },
                                                item.status.tone === 'warning'  && { color: '#E65100' },
                                                item.status.tone === 'critical' && { color: Neo.colors.feedback.error },
                                                item.status.tone === 'neutral'  && { color: Neo.colors.neutral[500] },
                                            ]}>
                                                {item.status.tone === 'ok' && '✓ '}
                                                {item.status.label}
                                            </Text>
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>
                            </ScaleInView>
                        ))}
                    </View>

                    {/* FERRAMENTAS — labels limpos, sem subtítulo "Assistente IA, Scanner e Voz" */}
                    <Text style={[s.sectionLabel, { marginTop: 4 }]}>{t('home.tools')}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => navigateWithHaptic('FerramentasIA')}
                            activeOpacity={0.85}
                            style={{ flex: 1, marginRight: 5 }}
                        >
                            <NeoCard variant="elevated" style={s.toolCard}>
                                <View style={[s.toolIconCircle, { backgroundColor: 'rgba(25,118,210,0.10)' }]}>
                                    <Setting2 size={22} color="#1976D2" variant="Bold" />
                                </View>
                                <Text style={s.toolLabel} numberOfLines={1}>
                                    {t('home.toolbox', 'Ferramentas')}
                                </Text>
                            </NeoCard>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigateWithHaptic('InfoRotulos')}
                            activeOpacity={0.85}
                            style={{ flex: 1, marginLeft: 5 }}
                        >
                            <NeoCard variant="elevated" style={s.toolCard}>
                                <View style={[s.toolIconCircle, { backgroundColor: 'rgba(255,109,0,0.10)' }]}>
                                    <Scan size={22} color="#FF6D00" variant="Bold" />
                                </View>
                                <Text style={s.toolLabel} numberOfLines={1}>
                                    {t('home.infoLabels', 'Info Rótulos')}
                                </Text>
                            </NeoCard>
                        </TouchableOpacity>
                    </View>

                    {/* ───── ABSORÇÃO 3: CHIPS SECUNDÁRIOS ─────
                        Hubs extras acessíveis sem inchar o grid principal. */}
                    <View style={s.chipsRow}>
                        {CHIP_ITEMS.map(chip => (
                            <TouchableOpacity
                                key={chip.key}
                                onPress={() => navigateWithHaptic(chip.route)}
                                activeOpacity={0.7}
                                style={s.chip}
                            >
                                <chip.Icon size={14} color={Neo.colors.neutral[600]} variant="Linear" />
                                <Text style={s.chipLabel}>{chip.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>

                {/* MODAL RESIDÊNCIAS */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalResidenciaVisible}
                    onRequestClose={() => setModalResidenciaVisible(false)}
                >
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
                        <NeoCard variant="elevated" style={{
                            borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
                            borderTopLeftRadius: 24, borderTopRightRadius: 24,
                            padding: 24, minHeight: 400, width: '100%',
                            backgroundColor: '#FFFFFF',
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                <H2>{t('home.myLocations')}</H2>
                                <TouchableOpacity onPress={() => setModalResidenciaVisible(false)}>
                                    <CloseCircle size={24} color="#000" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {residences.map(res => {
                                    const isSelected = activeResidence?.id === res.id;
                                    return (
                                        <NeoCard
                                            key={res.id}
                                            variant={isSelected ? 'primary' : 'elevated'}
                                            padding={16}
                                            onPress={async () => {
                                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                                await ProfileService.setActiveResidence(res.id);
                                                await loadProfiles();
                                                setModalResidenciaVisible(false);
                                                await loadData();
                                            }}
                                            style={{
                                                marginBottom: 12, borderRadius: 16,
                                                flexDirection: 'row', alignItems: 'center',
                                                justifyContent: 'space-between',
                                                borderWidth: isSelected ? 2 : 1,
                                                borderColor: isSelected ? Neo.colors.primary[500] : 'rgba(0,0,0,0.05)',
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{
                                                    width: 40, height: 40, borderRadius: 20,
                                                    backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : Neo.colors.primary[100],
                                                    justifyContent: 'center', alignItems: 'center', marginRight: 12,
                                                }}>
                                                    <Home2 size={20} color={isSelected ? '#FFF' : Neo.colors.primary[600]} variant={isSelected ? 'Bold' : 'Linear'} />
                                                </View>
                                                <Body style={{ fontWeight: isSelected ? 'bold' : '600', color: isSelected ? '#FFF' : Neo.colors.neutral[800] }}>
                                                    {res.nome === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : res.nome}
                                                </Body>
                                            </View>
                                            {isSelected && <ArrowRight2 size={20} color="#FFF" />}
                                        </NeoCard>
                                    );
                                })}

                                <NeoCard
                                    variant="elevated"
                                    padding={16}
                                    style={{
                                        marginTop: 4, borderWidth: 1, borderStyle: 'dashed',
                                        borderColor: Neo.colors.neutral[400], borderRadius: 16,
                                        alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                                    }}
                                    onPress={() => {
                                        setModalResidenciaVisible(false);
                                        navigation.navigate('NewHomeWizard');
                                    }}
                                >
                                    <Building size={20} color={Neo.colors.neutral[500]} style={{ marginRight: 8 }} />
                                    <Body style={{ color: Neo.colors.neutral[600], fontWeight: '600' }}>{t('home.addNewLocation')}</Body>
                                </NeoCard>
                            </ScrollView>
                        </NeoCard>
                    </View>
                </Modal>

            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[800],
        letterSpacing: 1.6,
        marginBottom: 6,
        marginTop: 2,
        textAlign: 'center',
        textTransform: 'uppercase',
        opacity: 0.9,
    },
    profileCardOuter: {
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: Neo.colors.primary[500],
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    profileCardInner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.88)',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.95)',
        borderTopColor: 'rgba(255,255,255,1)',
        borderTopWidth: 2,
        minWidth: 72,
    },
    profileName: {
        fontSize: 10,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginTop: 3,
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
        backgroundColor: '#FFEBEE',
        borderColor: 'rgba(229,57,53,0.30)',
    },
    contextAlertWarning: {
        backgroundColor: '#FFF3E0',
        borderColor: 'rgba(245,124,0,0.30)',
    },
    contextAlertSystem: {
        backgroundColor: 'rgba(55,71,79,0.08)',
        borderColor: 'rgba(55,71,79,0.20)',
    },
    contextAlertDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    contextAlertText: {
        flex: 1,
        fontSize: 12.5,
        fontWeight: '700',
    },

    // ── Grid 2×2 ──
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: H_GAP,
        gap: 10,
    },
    gridCell: {
        width: '48%',
        marginBottom: 8,
    },
    gridCard: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        paddingVertical: 12,
        height: 116,
        position: 'relative',
    },
    // gridCardAccent intencionalmente vazio — com o vidro jateado a borda extra
    // virava "moldura sobrando". O destaque do card Eventuais agora vem só do
    // ícone laranja + micro-status próprio.
    gridCardAccent: {},
    gridIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    gridLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1a1a2e',
        textAlign: 'center',
        lineHeight: 16,
        marginBottom: 4,
    },
    // Micro-status pill (Absorção 2)
    gridStatusPill: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    gridStatusOk:       { backgroundColor: 'rgba(46,125,50,0.10)' },
    gridStatusWarning:  { backgroundColor: 'rgba(230,81,0,0.10)' },
    gridStatusCritical: { backgroundColor: 'rgba(229,57,53,0.10)' },
    gridStatusNeutral:  { backgroundColor: 'rgba(120,120,120,0.08)' },
    gridStatusText: {
        fontSize: 10,
        fontWeight: '800',
    },

    // ── Ferramentas — labels limpos, sem subtítulo de IA ──
    toolCard: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        height: 84,
        marginBottom: 8,
    },
    toolIconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    toolLabel: {
        fontSize: 12.5,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
    },

    // ── Chips secundários (Absorção 3) ──
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.06)',
    },
    chipLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: Neo.colors.neutral[700],
        marginLeft: 5,
    },
});
