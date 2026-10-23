import { useState, useRef } from "react";
import { View, TouchableOpacity, UIManager, Platform, Animated, Dimensions, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Body } from "../../components/NeoTypography";
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import TravelTipsAccordion from '../../components/TravelTipsAccordion';
import TravelChecklistCard from '../../components/TravelChecklistCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_W = Dimensions.get('window').width;

export default function InspecaoPartidaScreen({ navigation }) {
    const { t } = useTranslation();
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({ home_security: true, logistics: true, carry_on: true });

    // Parallax Hero
    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Neo.layout.heroBanner;
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

    const CHECKLIST_ITEMS = [
        {
            id: 'home_security',
            title: t('travel.homeSecurity'),
            icon: 'Lock1',
            color: '#F44336',
            items: [
                { id: 'gas', label: t('travel.gasOff') },
                { id: 'water', label: t('travel.waterOff') },
                { id: 'electronics', label: t('travel.electronicsOff') },
                { id: 'windows', label: t('travel.windowsLocked') },
                { id: 'trash', label: t('travel.trashOut') },
                { id: 'perishables', label: t('travel.perishables') },
            ]
        },
        {
            id: 'logistics',
            title: t('travel.logistics'),
            icon: 'Key',
            color: Neo.colors.feedback.warning,
            items: [
                { id: 'keys', label: t('travel.keysWithNeighbor') },
                { id: 'pets', label: t('travel.petFoodWater') },
                { id: 'plants', label: t('travel.plantsWatered') },
            ]
        },
        {
            id: 'carry_on',
            title: t('travel.carryOn'),
            icon: 'DocumentCopy',
            color: Neo.colors.primary[500],
            items: [
                { id: 'docs', label: t('travel.docsWithPhoto') },
                { id: 'tickets', label: t('travel.ticketsSavedOffline') },
                { id: 'meds', label: t('travel.vitalMedsInBag') },
                { id: 'chargers', label: t('travel.chargerPowerbank') },
                { id: 'cards', label: t('travel.cardsMoneyKeys') },
            ]
        }
    ];

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (id) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

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
                        <H2 style={{ color: Neo.colors.neutral.white, fontSize: 18 }}>{t('travel.departureInspection')}</H2>
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
                        source={require('../../assets/images/headers/header-partida.jpeg')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', padding: 24 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, marginBottom: 4 }}>{t('travel.departureInspection')}</H2>
                    </View>
                </Animated.View>

                <View style={{ alignItems: 'center', marginBottom: 24, paddingHorizontal: 8 }}>
                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], lineHeight: 20 }}>
                        {t('travel.departureIntro')}
                    </Body>
                </View>

                {CHECKLIST_ITEMS.map((section) => (
                    <TravelChecklistCard
                        key={section.id}
                        section={section}
                        isExpanded={expandedSections[section.id]}
                        onToggleSection={() => toggleSection(section.id)}
                        checkedItems={checkedItems}
                        onToggleItem={toggleItem}
                    />
                ))}

                <TravelTipsAccordion phase="preparacao" />
            </Animated.ScrollView>
        </AppBackground>
    );
}
