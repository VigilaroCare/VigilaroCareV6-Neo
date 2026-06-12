import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
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

export default function InspecaoPartidaScreen({ navigation }) {
    const { t } = useTranslation();
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({ home_security: true, logistics: true, carry_on: true });

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
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderSection = (section) => {
        const isExpanded = expandedSections[section.id];
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
                        <Small style={{ color: Neo.colors.neutral[500] }}>{completedCount} {t('travel.completedOf')} {totalCount} {t('travel.completed')}</Small>
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
                        <H2>{t('travel.departureInspection')}</H2>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.departureSubtitle')}</Small>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 190 }}>
                    <View style={{ alignItems: 'center', marginBottom: 24 }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <NeoIcon name="Key" size={32} color={Neo.colors.feedback.warning} variant="Bold" />
                        </View>
                        <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600] }}>
                            {t('travel.departureIntro')}
                        </Body>
                    </View>

                    {CHECKLIST_ITEMS.map(renderSection)}

                    {/* Dicas da fase de PREPARAÇÃO (docs, vacinas, logística
                        intl) + cards de alertas oficiais (Defesa Civil /
                        Itamaraty) — cada recomendação na sua fase */}
                    <TravelTipsAccordion phase="preparacao" />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
