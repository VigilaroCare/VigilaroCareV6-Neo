import React from 'react';
import {
    View, Switch, ScrollView, TouchableOpacity, StyleSheet, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H1, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';

import { useAccessibility } from '../context/AccessibilityContext';

export default function AccessibilitySettingsScreen() {
    const navigation = useNavigation();
    const {
        fontSizeLevel, updateFontSize,
        highContrast, toggleHighContrast,
        reduceMotion, toggleReduceMotion,
        leftHandedMode, toggleLeftHanded,
    } = useAccessibility();
    const { t } = useTranslation();

    const isLargeText = fontSizeLevel > 1;
    const toggleLargeText = (val) => updateFontSize(val ? 1.4 : 1);

    const hapticToggle = (toggleFn) => (val) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleFn(val);
    };

    const renderSettingItem = ({
        label, desc, iconName, iconVariant = 'Bold', color,
        value, onToggle, showSwitch = true, isLast = false,
    }) => (
        <View
            style={[
                s.settingRow,
                !isLast && { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.06)' },
            ]}
        >
            <View style={[s.settingIcon, { backgroundColor: color + '33' }]}>
                <NeoIcon name={iconName} size={22} color={color} variant={iconVariant} />
            </View>
            <View style={s.settingTextCol}>
                <Body style={s.settingLabel}>{label}</Body>
                <Small style={s.settingDesc}>{desc}</Small>
            </View>
            {showSwitch ? (
                <Switch
                    value={value}
                    onValueChange={hapticToggle(onToggle)}
                    trackColor={{ false: Neo.colors.neutral[300], true: color }}
                    thumbColor={Neo.colors.neutral.white}
                />
            ) : (
                <View style={s.nativeBadge}>
                    <Caption style={s.nativeBadgeText}>{t('settings.native')}</Caption>
                </View>
            )}
        </View>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER — back + title (padrão dos detalhes/configurações) */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H1 style={s.headerTitle}>
                        {t('settings.accessibility')}
                    </H1>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    {/* INTRO — informacional, sem "magia/IA" */}
                    <NeoCard variant="elevated" style={s.introCard}>
                        <View style={s.introIconCircle}>
                            <NeoIcon name="Eye" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <H3 style={s.introTitle}>
                                {t('settings.adaptForYou', 'Ajustes pra você')}
                            </H3>
                            <Body style={s.introBody}>
                                {t('settings.adaptForYouDesc', 'Personalize o app para se adequar à sua forma de usar.')}
                            </Body>
                        </View>
                    </NeoCard>

                    {/* SEÇÃO VISÃO */}
                    <Text style={s.sectionLabel}>
                        {t('settings.visual', 'Visão')}
                    </Text>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        {renderSettingItem({
                            label: t('settings.largeText'),
                            desc: t('settings.largeTextDesc'),
                            iconName: 'TextalignJustifycenter',
                            color: '#10B981', // emerald
                            value: isLargeText,
                            onToggle: toggleLargeText,
                        })}
                        {renderSettingItem({
                            label: t('settings.highContrast'),
                            desc: t('settings.highContrastDesc'),
                            iconName: 'Colorfilter',
                            color: '#F59E0B', // amber
                            value: highContrast,
                            onToggle: toggleHighContrast,
                            isLast: true,
                        })}
                    </NeoCard>

                    {/* SEÇÃO MOVIMENTO & ÁUDIO */}
                    <Text style={[s.sectionLabel, { marginTop: 24 }]}>
                        {t('settings.audioFeedback', 'Movimento e Áudio')}
                    </Text>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        {renderSettingItem({
                            label: t('settings.reduceMotion'),
                            desc: t('settings.reduceMotionDesc'),
                            iconName: 'Refresh',
                            color: '#0EA5E9', // sky
                            value: reduceMotion,
                            onToggle: toggleReduceMotion,
                        })}
                        {renderSettingItem({
                            label: t('settings.screenReader'),
                            desc: t('settings.screenReaderDesc'),
                            iconName: 'VolumeHigh',
                            color: '#16A34A', // success green
                            showSwitch: false,
                            isLast: true,
                        })}
                    </NeoCard>

                    {/* SEÇÃO INTERAÇÃO */}
                    <Text style={[s.sectionLabel, { marginTop: 24 }]}>
                        {t('settings.interaction', 'Interação')}
                    </Text>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        {renderSettingItem({
                            label: t('settings.leftHanded'),
                            desc: t('settings.leftHandedDesc'),
                            iconName: 'Hand',
                            color: '#7C3AED', // violet — neutro e distinto
                            value: leftHandedMode,
                            onToggle: toggleLeftHanded,
                            isLast: true,
                        })}
                    </NeoCard>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontWeight: '800',
        letterSpacing: -0.5,
        flex: 1,
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Intro card
    introCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 26,
        borderRadius: 18,
    },
    introIconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(16,185,129,0.22)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    introTitle: {
        color: Neo.colors.neutral[900],
        fontSize: 16,
        marginBottom: 2,
    },
    introBody: {
        color: Neo.colors.neutral[600],
        fontSize: 13,
        lineHeight: 18,
    },

    // Section labels (consistente com Home/Menu/KnowledgeHub)
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Setting card e rows
    settingCard: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 18,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    settingIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    settingTextCol: {
        flex: 1,
        marginRight: 12,
    },
    settingLabel: {
        fontWeight: '700',
        color: Neo.colors.neutral[900],
    },
    settingDesc: {
        color: Neo.colors.neutral[600],
        marginTop: 2,
    },
    nativeBadge: {
        backgroundColor: 'rgba(0,0,0,0.06)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    nativeBadgeText: {
        fontWeight: '800',
        color: Neo.colors.neutral[700],
        letterSpacing: 0.3,
    },
});
