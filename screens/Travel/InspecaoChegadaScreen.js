import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, UIManager, Platform, Animated, Dimensions, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Body, Small } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import TravelTipsAccordion from '../../components/TravelTipsAccordion';
import TravelChecklistCard from '../../components/TravelChecklistCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_W = Dimensions.get('window').width;

export default function InspecaoChegadaScreen({ navigation }) {
    const { t } = useTranslation();
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({});
    const [trip, setTrip] = useState(null);

    // Parallax Hero
    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 200;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolate: 'clamp',
            })
        }
    ];

    useEffect(() => {
        AsyncStorage.getItem('@active_trip')
            .then(raw => {
                if (raw) setTrip(JSON.parse(raw));
            })
            .catch(() => {});
    }, []);

    const BASE_ITEMS = [
        {
            id: 'doors_windows',
            title: t('travel.doorsAndWindows', 'Portas, Janelas e Sacadas'),
            icon: 'Building',
            color: Neo.colors.primary[600],
            items: [
                { id: 'main_door', label: t('travel.mainDoorLocked', 'Porta principal trancada por dentro') },
                { id: 'windows_locked', label: t('travel.windowsLockedDest', 'Janelas acessíveis travadas') },
                { id: 'balcony', label: t('travel.balconySafe', 'Sacada livre de móveis que sirvam de escada') },
                { id: 'peephole', label: t('travel.peepholeChecked', 'Olho mágico desobstruído/funcional') },
            ]
        },
        {
            id: 'water',
            title: t('travel.waterRisk', 'Riscos de Água e Afogamento'),
            icon: 'SwimmingPool',
            color: Neo.colors.categoria.ardosia.fill,
            items: [
                { id: 'pool_access', label: t('travel.poolAccess', 'Acesso à piscina tem portão fechado') },
                { id: 'bathroom_floor', label: t('travel.bathroomFloor', 'Piso do banheiro sem poças/escorregadio') },
                { id: 'bathtub', label: t('travel.bathtubEmpty', 'Banheira esvaziada após o uso') },
            ]
        },
        {
            id: 'fire_evac',
            title: t('travel.fireAndEvac', 'Incêndio e Evacuação'),
            icon: 'Fire',
            color: '#F44336',
            items: [
                { id: 'evac_map', label: t('travel.evacMapLocated', 'Mapa de evacuação localizado (atrás da porta)') },
                { id: 'fire_stairs', label: t('travel.fireStairsLocated', 'Escada de emergência localizada (nunca elevador)') },
                { id: 'smoke_detector', label: t('travel.smokeDetector', 'Detector de fumaça visível no teto') },
                { id: 'meet_point', label: t('travel.meetPoint', 'Ponto de encontro externo combinado') },
            ]
        },
    ];

    const hasKids = trip?.config?.hasKids;
    const hasPets = trip?.config?.hasPets;
    const hasElderly = trip?.config?.hasElderly;
    const hasPcd = trip?.config?.hasPcd;

    const COMPANION_SECTIONS = [
        hasKids && {
            id: 'kids_safety',
            title: t('travel.kidsSafety', 'Proteção para Crianças'),
            icon: 'Baby',
            color: Neo.colors.secondary[500],
            items: [
                { id: 'outlets', label: t('travel.outletsCovered', 'Tomadas baixas bloqueadas ou escondidas') },
                { id: 'sharp_edges', label: t('travel.sharpEdges', 'Quinas perigosas isoladas (toalha/espuma)') },
                { id: 'blind_cords', label: t('travel.blindCords', 'Cordões de persianas amarrados no alto') },
                { id: 'choking', label: t('travel.chokingHazards', 'Chão livre de peças pequenas/moedas') },
            ]
        },
        hasPets && {
            id: 'pets_safety',
            title: t('travel.petsSafety', 'Segurança do Pet'),
            icon: 'Pet',
            color: Neo.colors.feedback.warning,
            items: [
                { id: 'pet_escape', label: t('travel.petEscape', 'Vãos e frestas onde o pet possa fugir bloqueados') },
                { id: 'toxic_plants', label: t('travel.toxicPlants', 'Sem plantas desconhecidas ao alcance') },
                { id: 'trash_pet', label: t('travel.trashPet', 'Lixeiras fora do alcance do pet') },
            ]
        },
        hasElderly && {
            id: 'elderly_safety',
            title: t('travel.elderlySafety', 'Apoio ao Idoso'),
            icon: 'Elderly',
            color: Neo.colors.primary[300],
            items: [
                { id: 'rugs', label: t('travel.removeRugs', 'Tapetes soltos removidos do caminho') },
                { id: 'night_light', label: t('travel.nightLight', 'Luz noturna ligada no caminho do banheiro') },
                { id: 'bath_mat', label: t('travel.bathMat', 'Tapete antiderrapante dentro do box') },
            ]
        },
        hasPcd && {
            id: 'pcd_safety',
            title: t('travel.pcdSafety', 'Acessibilidade (PCD)'),
            icon: 'Wheelchair',
            color: Neo.colors.primary[800],
            items: [
                { id: 'pcd_path', label: t('travel.pcdPath', 'Caminho livre de obstáculos e móveis') },
                { id: 'pcd_exit', label: t('travel.pcdExit', 'Rota de evacuação acessível identificada') },
                { id: 'pcd_reach', label: t('travel.pcdReach', 'Interruptores e itens essenciais ao alcance') },
            ]
        },
    ].filter(Boolean);

    const showWater = !trip || ['praia', 'resort', 'rural'].includes(trip.type);
    const CHECKLIST_ITEMS = [
        ...BASE_ITEMS.filter(s => s.id !== 'water' || showWater),
        ...COMPANION_SECTIONS,
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (id) => {
        setExpandedSections(prev => ({ ...prev, [id]: prev[id] === undefined ? false : !prev[id] }));
    };

    const totalItems = CHECKLIST_ITEMS.reduce((acc, s) => acc + s.items.length, 0);
    const totalChecked = Object.values(checkedItems).filter(Boolean).length;

    return (
        <AppBackground>
            <StatusBar style="light" />

            {/* Header Translúcido Flutuante */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, fontSize: 18 }}>{t('travel.arrivalInspection', 'Verificações no Destino')}</H2>
                    </View>
                </View>
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={{ flex: 1, zIndex: 10 }}
            >
                {/* Hero Imersivo */}
                <Animated.View style={{
                    width: SCREEN_W,
                    height: HERO_HEIGHT,
                    transform: heroTransform,
                    marginBottom: 24,
                    marginHorizontal: -16,
                }}>
                    <Image
                        source={require('../../assets/images/headers/header-chegada.jpeg')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', padding: 24 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, marginBottom: 4 }}>{t('travel.arrivalInspection', 'Verificações no Destino')}</H2>
                    </View>
                </Animated.View>

                <View style={{ alignItems: 'center', marginBottom: 24, paddingHorizontal: 8 }}>
                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], lineHeight: 20 }}>
                        {t('travel.arrivalIntro', 'Ao chegar no destino, faça esta inspeção rápida para identificar riscos e garantir a segurança de todos.')}
                    </Body>
                    <View style={{ marginTop: 12, backgroundColor: Neo.colors.primary[100], paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 }}>
                        <Small style={{ fontWeight: 'bold', color: Neo.colors.primary[700] }}>{totalChecked} / {totalItems}{t('telas.InspecaoChegadaScreen.verificados', ' verificados')}</Small>
                    </View>
                    {!!trip && (
                        <Small style={{ marginTop: 8, color: Neo.colors.neutral[500], textAlign: 'center' }}>
                            {t('travel.checklistTailored', 'Checklist ajustado ao briefing da sua viagem.')}
                        </Small>
                    )}
                </View>

                {CHECKLIST_ITEMS.map((section) => (
                    <TravelChecklistCard
                        key={section.id}
                        section={section}
                        isExpanded={expandedSections[section.id] !== false}
                        onToggleSection={() => toggleSection(section.id)}
                        checkedItems={checkedItems}
                        onToggleItem={toggleItem}
                    />
                ))}

                <TravelTipsAccordion phase="chegada" />
            </Animated.ScrollView>
        </AppBackground>
    );
}
