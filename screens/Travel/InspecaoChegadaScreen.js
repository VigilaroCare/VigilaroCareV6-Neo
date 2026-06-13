import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import TravelTipsAccordion from '../../components/TravelTipsAccordion';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function InspecaoChegadaScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({});
    const [trip, setTrip] = useState(null);

    // Personalização efetiva (autor, 2026-06-12): o checklist cruza o
    // briefing da viagem — tipo de destino condiciona a seção de água,
    // e cada companhia (crianças/idosos/pets/PCD) traz sua seção própria.
    useEffect(() => {
        AsyncStorage.getItem('@active_trip')
            .then((raw) => { if (raw) setTrip(JSON.parse(raw)); })
            .catch(() => {});
    }, []);
    const cfg = trip?.config || {};

    const BASE_ITEMS = [
        {
            id: 'windows',
            title: t('travel.windowsBalconies', 'Janelas e Sacadas'),
            icon: 'Window',
            color: Neo.colors.secondary[500],
            items: [
                { id: 'window_locks', label: t('travel.windowLocksWork', 'Travas de janelas funcionam corretamente') },
                { id: 'balcony_rail', label: t('travel.balconyRailHeight', 'Grade/proteção da sacada com altura adequada') },
                { id: 'curtain_cords', label: t('travel.curtainCords', 'Cordas de cortina fora do alcance de crianças') },
                { id: 'glass_condition', label: t('travel.glassCondition', 'Vidros sem trincas ou soltos') },
            ]
        },
        {
            id: 'water',
            title: t('travel.poolsWater', 'Piscinas e Água'),
            icon: 'Candle2',
            color: Neo.colors.primary[500],
            items: [
                { id: 'pool_fence', label: t('travel.poolFence', 'Piscina tem cerca/grade de proteção') },
                { id: 'pool_depth', label: t('travel.poolDepth', 'Profundidade sinalizada e visível') },
                { id: 'slippery_floor', label: t('travel.slipperyFloor', 'Piso ao redor da piscina antiderrapante') },
                { id: 'hot_water', label: t('travel.hotWaterTemp', 'Água quente do chuveiro com temperatura segura') },
            ]
        },
        {
            id: 'electric',
            title: t('travel.electricGas', 'Elétrica e Gás'),
            icon: 'Electricity',
            color: Neo.colors.feedback.warning,
            items: [
                { id: 'outlet_covers', label: t('travel.outletCovers', 'Tomadas com proteção (especialmente perto de água)') },
                { id: 'exposed_wires', label: t('travel.noExposedWires', 'Sem fios expostos ou danificados') },
                { id: 'gas_smell', label: t('travel.noGasSmell', 'Sem cheiro de gás no ambiente') },
                { id: 'fire_extinguisher', label: t('travel.fireExtinguisher', 'Extintor de incêndio localizado e acessível') },
            ]
        },
        {
            id: 'access',
            title: t('travel.accessExits', 'Acessos e Saídas'),
            icon: 'Routing',
            color: Neo.colors.feedback.success,
            items: [
                { id: 'emergency_exit', label: t('travel.emergencyExit', 'Saída de emergência identificada e desobstruída') },
                { id: 'stairs_rail', label: t('travel.stairsRail', 'Escadas com corrimão em bom estado') },
                { id: 'floor_obstacles', label: t('travel.noFloorObstacles', 'Sem obstáculos no caminho (tapetes soltos, cabos)') },
                { id: 'door_locks', label: t('travel.doorLocks', 'Fechaduras e trancas da porta principal funcionam') },
                { id: 'lighting', label: t('travel.adequateLighting', 'Iluminação adequada em corredores e escadas') },
            ]
        }
    ];

    // Seções condicionais — uma por companhia do briefing
    const COMPANION_SECTIONS = [
        cfg.hasKids && {
            id: 'kids',
            title: t('travel.forKidsTitle', 'Para as Crianças'),
            icon: 'Baby',
            color: Neo.colors.secondary[500],
            items: [
                { id: 'kids_outlets', label: t('travel.kidsOutlets', 'Tomadas ao alcance protegidas (leve protetores portáteis)') },
                { id: 'kids_products', label: t('travel.kidsProducts', 'Produtos de limpeza e medicamentos fora do alcance') },
                { id: 'kids_corners', label: t('travel.kidsCorners', 'Quinas de móveis e objetos escaláveis perto de janelas') },
                { id: 'kids_sleep', label: t('travel.kidsSleep', 'Local de dormir seguro (sem frestas, longe de cortinas)') },
            ]
        },
        cfg.hasElderly && {
            id: 'elderly',
            title: t('travel.forElderlyTitle', 'Para os Idosos'),
            icon: 'Elderly',
            color: Neo.colors.primary[600],
            items: [
                { id: 'eld_rugs', label: t('travel.elderlyRugs', 'Tapetes soltos removidos ou fixados') },
                { id: 'eld_nightlight', label: t('travel.elderlyNightlight', 'Caminho quarto-banheiro iluminado à noite') },
                { id: 'eld_bathroom', label: t('travel.elderlyBathroom', 'Banheiro: piso, apoio e box verificados') },
                { id: 'eld_bed', label: t('travel.elderlyBed', 'Altura da cama adequada (sentar e levantar com apoio)') },
            ]
        },
        cfg.hasPets && {
            id: 'pets',
            title: t('travel.forPetsTitle', 'Para o Pet'),
            icon: 'PawPrint',
            color: Neo.colors.feedback.warning,
            items: [
                { id: 'pet_screens', label: t('travel.petScreens', 'Telas, portões e cercas sem frestas de fuga') },
                { id: 'pet_plants', label: t('travel.petPlants', 'Plantas do local verificadas (toxicidade)') },
                { id: 'pet_products', label: t('travel.petProducts', 'Iscas/venenos e produtos químicos inacessíveis') },
                { id: 'pet_shade', label: t('travel.petShade', 'Água fresca e sombra disponíveis') },
            ]
        },
        cfg.hasPcd && {
            id: 'pcd',
            title: t('travel.forPcdTitle', 'Acessibilidade (PCD)'),
            icon: 'Wheelchair',
            color: Neo.colors.feedback.success,
            items: [
                { id: 'pcd_route', label: t('travel.pcdRoute', 'Rota de circulação livre de obstáculos e desníveis') },
                { id: 'pcd_bathroom', label: t('travel.pcdBathroom', 'Banheiro adaptado confere com o anunciado') },
                { id: 'pcd_exit', label: t('travel.pcdExit', 'Rota de evacuação acessível identificada') },
                { id: 'pcd_reach', label: t('travel.pcdReach', 'Interruptores e itens essenciais ao alcance') },
            ]
        },
    ].filter(Boolean);

    // Água/piscina só onde faz sentido (praia, resort, rural) — sem viagem
    // ativa, mostra tudo (fallback completo, não-omisso)
    const showWater = !trip || ['praia', 'resort', 'rural'].includes(trip.type);
    const CHECKLIST_ITEMS = [
        ...BASE_ITEMS.filter(s => s.id !== 'water' || showWater),
        ...COMPANION_SECTIONS,
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const totalItems = CHECKLIST_ITEMS.reduce((acc, s) => acc + s.items.length, 0);
    const totalChecked = Object.values(checkedItems).filter(Boolean).length;

    const renderSection = (section) => {
        const isExpanded = expandedSections[section.id] !== false; // padrão: aberta
        const completedCount = section.items.filter(item => checkedItems[item.id]).length;
        const totalCount = section.items.length;
        const isCompleted = completedCount === totalCount;

        return (
            <NeoCard key={section.id} variant="elevated" style={{ marginBottom: 16, overflow: 'hidden' }}>
                <TouchableOpacity
                    onPress={() => toggleSection(section.id)}
                    style={{
                        flexDirection: 'row', alignItems: 'center', padding: 16,
                        backgroundColor: isCompleted ? Neo.colors.feedback.success + '1A' : 'transparent'
                    }}
                >
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: section.color + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                        <NeoIcon name={section.icon} size={20} color={isCompleted ? Neo.colors.feedback.success : section.color} variant="Bold" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <H3 style={{ color: isCompleted ? Neo.colors.feedback.success : Neo.colors.neutral[800] }}>{section.title}</H3>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{completedCount} {t('travel.completedOf', 'de')} {totalCount} {t('travel.completed', 'concluídos')}</Small>
                    </View>
                </TouchableOpacity>

                {isExpanded && (
                    <View style={{ padding: 16, paddingTop: 0 }}>
                        <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                        {section.items.map(item => {
                            const isChecked = checkedItems[item.id];
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => toggleItem(item.id)}
                                    style={{
                                        flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
                                        borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[50],
                                        opacity: isChecked ? 0.6 : 1
                                    }}
                                >
                                    <View style={{
                                        width: 24, height: 24, borderRadius: 12,
                                        borderWidth: 2, borderColor: isChecked ? Neo.colors.feedback.success : Neo.colors.neutral[300],
                                        backgroundColor: isChecked ? Neo.colors.feedback.success : 'transparent',
                                        alignItems: 'center', justifyContent: 'center', marginRight: 12
                                    }}>
                                        {isChecked && <NeoIcon name="TickCircle" size={14} color={Neo.colors.neutral.white} variant="Bold" />}
                                    </View>
                                    <Body style={{ flex: 1, color: isChecked ? Neo.colors.neutral[500] : Neo.colors.neutral[800], textDecorationLine: isChecked ? 'line-through' : 'none' }}>
                                        {item.label}
                                    </Body>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </NeoCard>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                        <H2>{t('travel.arrivalInspection', 'Verificações no Destino')}</H2>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.arrivalSubtitle', 'Segurança no seu destino')}</Small>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 190 }}>
                    <View style={{ alignItems: 'center', marginBottom: 24 }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Neo.colors.feedback.success + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <NeoIcon name="Routing" size={32} color={Neo.colors.feedback.success} variant="Bold" />
                        </View>
                        <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600] }}>
                            {t('travel.arrivalIntro', 'Ao chegar no destino, faça esta inspeção rápida para identificar riscos e garantir a segurança de todos.')}
                        </Body>
                        <View style={{ marginTop: 12, backgroundColor: Neo.colors.primary[100], paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 }}>
                            <Small style={{ fontWeight: 'bold', color: Neo.colors.primary[700] }}>{totalChecked} / {totalItems} verificados</Small>
                        </View>
                        {!!trip && (
                            <Small style={{ marginTop: 8, color: Neo.colors.neutral[500], textAlign: 'center' }}>
                                {t('travel.checklistTailored', 'Checklist ajustado ao briefing da sua viagem.')}
                            </Small>
                        )}
                    </View>

                    {CHECKLIST_ITEMS.map(renderSection)}

                    {/* Dicas da fase de CHEGADA (janelas, piscina, plano de
                        fuga, idosos…) — acionáveis no contexto do checklist */}
                    <TravelTipsAccordion phase="chegada" />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
