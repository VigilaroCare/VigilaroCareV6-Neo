import React, { useState, useCallback, useRef } from 'react';
import * as NavigationService from '../services/NavigationService';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    Image,
    StyleSheet,
    Text,
    Animated,
    LayoutAnimation,
    UIManager,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ShieldTick, Health, HeartAdd, Scan, Microphone,
    Warning2, Home2, ArrowDown2, CloseCircle, Building, ArrowRight2, Activity, Pet
} from 'iconsax-react-native';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

// Services & Util
// FIX #6: Removido import morto de 'displayFont'
import { DS as Neo } from '../utils/DesignSystem2026';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ProfileService from '../services/ProfileService';
import MedicationService from '../services/MedicationService';
import { useProfiles } from '../contexts/ProfileContext';
import ProactiveNotificationService from '../services/ProactiveNotificationService';
import ScoreService from '../services/ScoreService';

// Neo Components
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H2, Body } from '../components/NeoTypography';
import CompactActiveMonitor from '../components/CompactActiveMonitor';
import AppBackground from '../components/AppBackground';
import ScaleInView from '../components/ScaleInView';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

// Epic Redesign Components
import { HousePill } from '../components/PillSwitch';
import GlassProfileRing from '../components/GlassProfileRing';
import ShimmerBorder from '../components/ShimmerBorder';

// Habilita LayoutAnimation no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const H_MONITOR = 165;
const H_GAP     = 6;

// Cores gradiente para ícones do grid
const GRID_GRADIENTS = {
    saude:      ['rgba(156,39,176,0.22)', 'rgba(156,39,176,0.06)'],
    pets:       ['rgba(233,30,99,0.22)', 'rgba(233,30,99,0.06)'],
    vistorias:  ['rgba(33,150,243,0.22)', 'rgba(33,150,243,0.06)'],
    atividades: ['rgba(255,152,0,0.25)', 'rgba(255,152,0,0.08)'],
};

export default function HomeScreenNeo({ navigation: propNavigation }) {
    const navigation = useNavigation();
    const { rowDirection } = useLeftHandedStyle();
    const { t } = useTranslation();

    const [scoreData,    setScoreData]    = useState({ geral: 0, ambientes: {}, pendencias: 0 });
    const [scoreMessage, setScoreMessage] = useState({ titulo: 'Monitor Ativo', alerta: 'Carregando status...' });
    const [overdueMeds,  setOverdueMeds]  = useState([]);
    const [familyMeta,   setFamilyMeta]   = useState({ totalMoradoresEsperados: 0 });
    const [residences,   setResidences]   = useState([]);
    const [activeResidence, setActiveResidence] = useState(null);
    const [modalResidenciaVisible, setModalResidenciaVisible] = useState(false);
    const [imageError, setImageError] = useState(false);

    const [monitorExpanded, setMonitorExpanded] = useState(false);
    const [systemStatus, setSystemStatus] = useState({ isConnected: true, isCriticalBattery: false });

    const lastNotifUpdate = useRef(0);
    const lastProfileId   = useRef(null);
    // FIX #2: lastLoadTime removido — o throttle de 5s bloqueava recarregamento
    // legítimo após troca de residência. O controle de re-render é feito pelo
    // useFocusEffect + dependência de currentProfile?.id.

    const { primaryProfile, profiles: contextProfiles, loadProfiles } = useProfiles();
    const currentProfile = primaryProfile;

    // Reset imageError quando o perfil muda
    React.useEffect(() => { setImageError(false); }, [currentProfile?.id]);

    const loadData = async () => {
        try {
            // FIX #1: getActiveResidence() substitui três chamadas separadas
            // (getResidences + getActiveResidenceId + find manual),
            // eliminando race condition entre elas.
            const activeRes  = await ProfileService.getActiveResidence();
            const allRes     = await ProfileService.getResidences();

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

    // FIX #2: useFocusEffect sem throttle — recarrega sempre que a tela recebe foco.
    // Isso garante que a troca de residência feita no modal ou em outra tela
    // seja refletida imediatamente no header.
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

    // FIX #5: navigateWithHaptic com fallback seguro caso NavigationService não esteja pronto
    const navigateWithHaptic = useCallback((route) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            NavigationService.navigate(route);
        } catch (e) {
            // Fallback para navigation do hook caso NavigationService falhe no boot
            navigation.navigate(route);
        }
    }, [navigation]);

    // Toggle do monitor com LayoutAnimation suave
    const toggleMonitor = useCallback(() => {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                300,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity,
            )
        );
        setMonitorExpanded(prev => !prev);
    }, []);

    const GRID_ITEMS = [
        {
            key: 'saude',
            label: t('home.myHealth'),
            icon: <Health size={28} color="#9C27B0" variant="Bold" />,
            bg: 'rgba(156,39,176,0.10)',
            border: 'rgba(156,39,176,0.15)',
            route: 'MinhaSaude',
        },
        {
            key: 'pets',
            label: t('home.petHealth'),
            icon: <Pet size={28} color="#E91E63" variant="Bold" />,
            bg: 'rgba(233,30,99,0.10)',
            border: 'rgba(233,30,99,0.15)',
            route: 'PetsMenu',
        },
        {
            key: 'vistorias',
            label: t('home.inspections'),
            icon: <ShieldTick size={28} color="#2196F3" variant="Bold" />,
            bg: 'rgba(33,150,243,0.10)',
            border: 'rgba(33,150,243,0.15)',
            route: 'Relatorios',
        },
        {
            key: 'atividades',
            label: t('home.eventualActivities', 'Ativ. Eventuais'),
            icon: <Warning2 size={28} color="#FF9800" variant="Bold" />,
            bg: 'rgba(255,152,0,0.10)',
            border: 'rgba(255,152,0,0.20)',
            route: 'ModoPreventivo',
            accent: true,
        },
    ];

    // Nome da residência para exibição
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

                {/* HEADER: CASA + PERFIL — Epic Glassmorphism */}
                <View style={{
                    flexDirection: rowDirection,
                    justifyContent: 'space-between',
                    alignItems: 'stretch',
                    paddingHorizontal: Neo.spacing.lg,
                    paddingTop: 8,
                    paddingBottom: 10,
                }}>
                    {/* Pílula Casa — Componente PillSwitch com seta animada */}
                    <HousePill
                        label={houseName}
                        isModalOpen={modalResidenciaVisible}
                        onPress={() => setModalResidenciaVisible(true)}
                    />

                    {/* Card Perfil — Com Anel Gradiente */}
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

                {/* SCROLL */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.spacing.lg,
                        paddingBottom: 104,
                        paddingTop: 2,
                    }}
                >
                    {/* BANNER: Sistema Offline / Bateria */}
                    {(!systemStatus.isConnected || systemStatus.isCriticalBattery) && (
                        <View
                            style={{
                                backgroundColor: Neo.colors.neutral[800],
                                borderRadius: 12, padding: 10,
                                flexDirection: 'row', alignItems: 'center',
                                marginBottom: H_GAP,
                            }}
                        >
                            {!systemStatus.isConnected ? (
                                <NeoIcon name="WifiSquare" size={15} color="#FFF" style={{ marginRight: 8 }} />
                            ) : (
                                <NeoIcon name="BatteryEmpty" size={15} color={Neo.colors.feedback.error} style={{ marginRight: 8 }} />
                            )}
                            <Text style={{ flex: 1, color: '#FFF', fontWeight: '800', fontSize: 12 }}>
                                {!systemStatus.isConnected 
                                    ? t('home.offlineAlert', 'Offline. Apenas conteúdos e SOS disponíveis.')
                                    : t('home.batteryAlert', 'Bateria crítica. Carregue o dispositivo.')
                                }
                            </Text>
                        </View>
                    )}

                    {/* BANNER: Remédios atrasados */}
                    {overdueMeds.length > 0 && (
                        <TouchableOpacity
                            onPress={() => navigateWithHaptic('MedicationScheduler')}
                            style={{
                                backgroundColor: Neo.colors.feedback.error,
                                borderRadius: 12, padding: 10,
                                flexDirection: 'row', alignItems: 'center',
                                marginBottom: H_GAP,
                            }}
                        >
                            <Health size={15} color="#FFF" style={{ marginRight: 8 }} />
                            <Text style={{ flex: 1, color: '#FFF', fontWeight: '800', fontSize: 12 }}>
                                {t('home.overdueMeds', { count: overdueMeds.length })}
                            </Text>
                            <ArrowRight2 size={14} color="#FFF" />
                        </TouchableOpacity>
                    )}

                    {/* AMBIENTES VISTORIADOS — Com LayoutAnimation no expand */}
                    <Text style={s.sectionLabel}>{t('home.inspectedEnvironments', 'Ambientes Vistoriados')}</Text>
                    <TouchableOpacity activeOpacity={0.9} onPress={toggleMonitor}>
                        <NeoCard
                            variant="glass"
                            style={{
                                height: monitorExpanded ? null : H_MONITOR,
                                minHeight: H_MONITOR,
                                borderRadius: 22,
                                paddingVertical: 12, paddingHorizontal: 14,
                                overflow: 'hidden',
                                marginBottom: H_GAP + 4,
                                // Sombra premium colorida
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

                    {/* GRID 2×2 — Ícones maiores + gradiente circular + flutuação */}
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
                                        {/* Fundo gradiente circular no ícone */}
                                        <LinearGradient
                                            colors={GRID_GRADIENTS[item.key] || [item.bg, 'rgba(255,255,255,0)']}
                                            start={{ x: 0.5, y: 0 }}
                                            end={{ x: 0.5, y: 1 }}
                                            style={s.gridIconCircle}
                                        >
                                            {item.icon}
                                        </LinearGradient>
                                        <Text style={s.gridLabel}>{item.label}</Text>
                                        {item.badge && (
                                            <View style={s.gridBadge}>
                                                <Text style={s.gridBadgeText}>{item.badge}</Text>
                                            </View>
                                        )}
                                    </NeoCard>
                                </TouchableOpacity>
                            </ScaleInView>
                        ))}
                    </View>

                    {/* FERRAMENTAS IA — Com ShimmerBorder */}
                    <Text style={[s.sectionLabel, { marginTop: 4 }]}>{t('home.tools')}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigateWithHaptic('FerramentasIA')} activeOpacity={0.7} style={{ flex: 1, marginRight: 5 }}>
                            <ShimmerBorder color="#9C27B0" borderRadius={16}>
                                <NeoCard variant="elevated" style={[s.bannerCard, { paddingVertical: 12, paddingHorizontal: 8, height: 110 }]}>
                                    <LinearGradient
                                        colors={['rgba(156,39,176,0.14)', 'rgba(156,39,176,0.04)']}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        style={[s.bannerIconCircle, { width: 36, height: 36, marginBottom: 4 }]}
                                    >
                                        <Microphone size={18} color="#9C27B0" variant="Bold" />
                                    </LinearGradient>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[s.bannerTitle, { fontSize: 12, lineHeight: 14 }]} numberOfLines={2}>{t('home.intelligenceCenter')}</Text>
                                        <Text style={[s.bannerSub, { fontSize: 9, marginTop: 2 }]} numberOfLines={2}>{t('home.intelligenceSub')}</Text>
                                    </View>
                                </NeoCard>
                            </ShimmerBorder>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigateWithHaptic('InfoRotulos')} activeOpacity={0.7} style={{ flex: 1, marginLeft: 5 }}>
                            <ShimmerBorder color="#FF6D00" borderRadius={16}>
                                <NeoCard variant="elevated" style={[s.bannerCard, { paddingVertical: 12, paddingHorizontal: 8, height: 110 }]}>
                                    <LinearGradient
                                        colors={['rgba(255,109,0,0.14)', 'rgba(255,109,0,0.04)']}
                                        start={{ x: 0.5, y: 0 }}
                                        end={{ x: 0.5, y: 1 }}
                                        style={[s.bannerIconCircle, { width: 36, height: 36, marginBottom: 4 }]}
                                    >
                                        <Scan size={18} color="#FF6D00" variant="Bold" />
                                    </LinearGradient>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[s.bannerTitle, { fontSize: 12, lineHeight: 14 }]} numberOfLines={2}>{t('home.infoLabels', 'Info Rótulos')}</Text>
                                        <Text style={[s.bannerSub, { fontSize: 9, marginTop: 2 }]} numberOfLines={2}>{t('home.infoLabelsSub', 'Identifique toxicidade')}</Text>
                                    </View>
                                </NeoCard>
                            </ShimmerBorder>
                        </TouchableOpacity>
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
                                                // FIX #4: loadData() chamado sem throttle após troca de residência
                                                // para garantir que o header atualize o nome da casa imediatamente.
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
    // ── Profile Card (Epic) ──
    profileCardOuter: {
        borderRadius: 18,
        overflow: 'hidden',
        // Sombra premium colorida
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
    // ── Grid 2×2 (Epic) ──
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
        height: 104,
        position: 'relative',
    },
    gridCardAccent: {
        borderWidth: 1.5,
        borderColor: 'rgba(255,109,0,0.25)',
    },
    gridIconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1a1a2e',
        textAlign: 'center',
        lineHeight: 17,
    },
    gridBadge: {
        position: 'absolute',
        top: 8,
        right: 10,
        backgroundColor: Neo.colors.feedback.error,
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    // ── Banners IA (Epic) ──
    bannerCard: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        paddingHorizontal: 14,
        marginBottom: 8,
    },
    bannerIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    bannerTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 2,
    },
    bannerSub: {
        fontSize: 11,
        color: Neo.colors.neutral[500],
        fontWeight: '500',
        textAlign: 'center',
    },
});