import React from 'react';
import { View, Switch, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

// Design System & Components
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';

import { useAccessibility } from '../context/AccessibilityContext';



export default function AccessibilitySettingsScreen() {
    const navigation = useNavigation();
    const {
        fontSizeLevel, updateFontSize,
        highContrast, toggleHighContrast,
        reduceMotion, toggleReduceMotion,
        leftHandedMode, toggleLeftHanded
    } = useAccessibility();
    const { t } = useTranslation();

    const isLargeText = fontSizeLevel > 1;
    const toggleLargeText = (val) => updateFontSize(val ? 1.4 : 1);

    // Wrapper com haptic feedback
    const hapticToggle = (toggleFn) => (val) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleFn(val);
    };

    const renderSettingItem = (label, desc, icon, color, value, onToggle, showSwitch = true, isLast = false) => (
        <View style={[
            s.settingRow,
            !isLast && { borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[100] }
        ]}>
            <View style={[s.settingIcon, { backgroundColor: color + '15' }]}>
                {icon}
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
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar barStyle="dark-content" />

                {/* ── Header Neo (com Voltar) ── */}
                <View style={s.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H2 style={s.headerTitle}>{t('settings.accessibility')}</H2>
                    <View style={{ width: 36 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: Neo.spacing.lg, paddingBottom: 120 }}
                >
                    {/* ── Intro Card (Glass) ── */}
                    <NeoCard variant="glass" style={s.introCard}>
                        <View style={s.introRow}>
                            <View style={s.introIconCircle}>
                                <NeoIcon name="MagicStar" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <H3 style={s.introTitle}>{t('settings.adaptForYou')}</H3>
                        </View>
                        <Body style={s.introBody}>
                            {t('settings.adaptForYouDesc')}
                        </Body>
                    </NeoCard>

                    {/* ═══ VISUAL ═══ */}
                    <View style={s.sectionHeader}>
                        <View style={[s.sectionDot, { backgroundColor: Neo.colors.primary[500] }]} />
                        <Text style={s.sectionLabel}>{t('settings.visual')}</Text>
                    </View>

                    <NeoCard variant="glass" style={s.settingCard}>
                        {renderSettingItem(
                            t('settings.largeText'),
                            t('settings.largeTextDesc'),
                            <NeoIcon name="TextalignJustifycenter" size={22} color={Neo.colors.primary[500]} variant="Bold" />,
                            Neo.colors.primary[500],
                            isLargeText,
                            toggleLargeText
                        )}
                        {renderSettingItem(
                            t('settings.highContrast'),
                            t('settings.highContrastDesc'),
                            <NeoIcon name="Colorfilter" size={22} color={Neo.colors.feedback.warning} variant="Bold" />,
                            Neo.colors.feedback.warning,
                            highContrast,
                            toggleHighContrast,
                            true,
                            true // isLast
                        )}
                    </NeoCard>

                    {/* ═══ FEEDBACK ═══ */}
                    <View style={s.sectionHeader}>
                        <View style={[s.sectionDot, { backgroundColor: Neo.colors.secondary[500] }]} />
                        <Text style={s.sectionLabel}>{t('settings.audioFeedback')}</Text>
                    </View>

                    <NeoCard variant="glass" style={s.settingCard}>
                        {renderSettingItem(
                            t('settings.reduceMotion'),
                            t('settings.reduceMotionDesc'),
                            <NeoIcon name="Eye" size={22} color={Neo.colors.secondary[500]} variant="Bold" />,
                            Neo.colors.secondary[500],
                            reduceMotion,
                            toggleReduceMotion
                        )}
                        {renderSettingItem(
                            t('settings.screenReader'),
                            t('settings.screenReaderDesc'),
                            <NeoIcon name="VolumeHigh" size={22} color={Neo.colors.feedback.success} variant="Bold" />,
                            Neo.colors.feedback.success,
                            true,
                            null,
                            false,
                            true
                        )}
                    </NeoCard>

                    {/* ═══ INTERAÇÃO ═══ */}
                    <View style={s.sectionHeader}>
                        <View style={[s.sectionDot, { backgroundColor: Neo.colors.feedback.error }]} />
                        <Text style={s.sectionLabel}>{t('settings.interaction')}</Text>
                    </View>

                    <NeoCard variant="glass" style={s.settingCard}>
                        {renderSettingItem(
                            t('settings.leftHanded'),
                            t('settings.leftHandedDesc'),
                            <NeoIcon name="Hand" size={22} color={Neo.colors.feedback.error} variant="Bold" />,
                            Neo.colors.feedback.error,
                            leftHandedMode,
                            toggleLeftHanded,
                            true,
                            true
                        )}
                    </NeoCard>



                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // ── Header ──
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 14,
    },
    backBtn: {
        width: 36, height: 36, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center', justifyContent: 'center',
    },
    headerTitle: {
        color: Neo.colors.neutral[900],
        textAlign: 'center',
    },

    // ── Intro Card ──
    introCard: {
        padding: 20,
        marginBottom: 28,
        borderRadius: 20,
    },
    introRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    introIconCircle: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12,
    },
    introTitle: {
        color: Neo.colors.primary[700],
        flex: 1,
    },
    introBody: {
        color: Neo.colors.neutral[600],
        fontSize: 13,
        lineHeight: 20,
    },

    // ── Section Headers ──
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 4,
    },
    sectionDot: {
        width: 6, height: 6, borderRadius: 3,
        marginRight: 8,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: Neo.colors.neutral[500],
        textTransform: 'uppercase',
        letterSpacing: 1.4,
    },

    // ── Setting Card & Rows ──
    settingCard: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginBottom: 24,
        borderRadius: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    settingIcon: {
        width: 44, height: 44, borderRadius: 22,
        justifyContent: 'center', alignItems: 'center',
        marginRight: 14,
    },
    settingTextCol: {
        flex: 1,
        marginRight: 12,
    },
    settingLabel: {
        fontWeight: '600',
        color: Neo.colors.neutral[900],
    },
    settingDesc: {
        color: Neo.colors.neutral[500],
        marginTop: 2,
    },
    nativeBadge: {
        backgroundColor: Neo.colors.neutral[200],
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    nativeBadgeText: {
        fontWeight: '700',
        color: Neo.colors.neutral[600],
    },

});
