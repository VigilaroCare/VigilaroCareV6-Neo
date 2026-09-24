import { View, Switch, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import haptic from '../utils/Haptics';

import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H3, Body, Small, Caption, Eyebrow } from "../components/NeoTypography";
import NeoScreenHeader from '../components/NeoScreenHeader';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';

import { useAccessibility } from '../context/AccessibilityContext';
import { useTheme } from '../utils/ThemeContext';

export default function AccessibilitySettingsScreen() {
    const navigation = useNavigation();
    const {
        fontSizeLevel, updateFontSize,
        highContrast, toggleHighContrast,
        reduceMotion, toggleReduceMotion,
        leftHandedMode, toggleLeftHanded,
    } = useAccessibility();
    const { t } = useTranslation();
    const { mode, setMode, isDark, colors } = useTheme();

    // Escala de texto: Normal (1) → Grande (1.4) → Extra Grande (2.0)
    const fontScaleOptions = [
        { id: 1,   label: t('settings.fontNormal', 'Normal'),       sample: 'Aa' },
        { id: 1.4, label: t('settings.fontLarge', 'Grande'),        sample: 'Aa' },
        { id: 2,   label: t('settings.fontExtraLarge', 'Extra Grande'), sample: 'Aa' },
    ];

    const hapticToggle = (toggleFn) => (val) => {
        haptic.toggle();
        toggleFn(val);
    };

    const hapticThemeSet = (newMode) => {
        haptic.toggle();
        setMode(newMode);
    };

    const themeOptions = [
        { id: 'system', label: t('settings.themeSystem', 'Sistema'), iconName: 'Setting4' },
        { id: 'light',  label: t('settings.themeLight',  'Claro'),   iconName: 'Sun1' },
        { id: 'dark',   label: t('settings.themeDark',   'Escuro'),  iconName: 'Moon' },
    ];

    const dividerColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const switchTrackFalse = isDark ? colors.neutral[400] : colors.neutral[300];

    const renderSettingItem = ({
        label, desc, iconName, iconVariant = 'Bold', color,
        value, onToggle, showSwitch = true, isLast = false,
    }) => (
        <View
            style={[
                s.settingRow,
                !isLast && { borderBottomWidth: 1, borderBottomColor: dividerColor },
            ]}
        >
            <View style={[s.settingIcon, { backgroundColor: color + '33' }]}>
                <NeoIcon name={iconName} size={22} color={color} variant={iconVariant} />
            </View>
            <View style={s.settingTextCol}>
                <Body style={[s.settingLabel, { color: colors.neutral[900] }]}>{label}</Body>
                <Small style={[s.settingDesc, { color: colors.neutral[700] }]}>{desc}</Small>
            </View>
            {showSwitch ? (
                <Switch
                    value={value}
                    onValueChange={hapticToggle(onToggle)}
                    trackColor={{ false: switchTrackFalse, true: color }}
                    thumbColor={isDark ? colors.neutral[900] : colors.neutral.white}
                />
            ) : (
                <View style={[s.nativeBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.06)' }]}>
                    <Caption style={[s.nativeBadgeText, { color: colors.neutral[700] }]}>{t('settings.native')}</Caption>
                </View>
            )}
        </View>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('settings.accessibility')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    {/* INTRO — informacional, sem "magia/IA" */}
                    <NeoCard variant="elevated" style={s.introCard}>
                        <View style={s.introIconCircle}>
                            <NeoIcon name="Eye" size={22} color={colors.primary[600] || colors.primary[500]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <H3 style={[s.introTitle, { color: colors.neutral[900] }]}>
                                {t('settings.adaptForYou', 'Ajustes pra você')}
                            </H3>
                            <Body style={[s.introBody, { color: colors.neutral[700] }]}>
                                {t('settings.adaptForYouDesc', 'Personalize o app para se adequar à sua forma de usar.')}
                            </Body>
                        </View>
                    </NeoCard>

                    {/* SEÇÃO APARÊNCIA — toggle light/dark/system */}
                    <Eyebrow style={{ marginBottom: 10 }}>
                        {t('settings.appearance', 'Aparência')}
                    </Eyebrow>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        <View style={s.settingRow}>
                            <View style={[s.settingIcon, { backgroundColor: Neo.colors.categoria.ameixa.fill + '33' }]}>
                                <NeoIcon name="Moon" size={22} color={Neo.colors.categoria.ameixa.fill} variant="Bold" />
                            </View>
                            <View style={s.settingTextCol}>
                                <Body style={[s.settingLabel, { color: colors.neutral[900] }]}>
                                    {t('settings.theme', 'Tema do app')}
                                </Body>
                                <Small style={[s.settingDesc, { color: colors.neutral[700] }]}>
                                    {t('settings.themeDesc', 'Acompanhe o sistema ou escolha manualmente')}
                                </Small>
                            </View>
                        </View>
                        <View style={s.themePickerRow}>
                            {themeOptions.map((opt) => {
                                const active = mode === opt.id;
                                return (
                                    <TouchableOpacity
                                        key={opt.id}
                                        onPress={() => hapticThemeSet(opt.id)}
                                        activeOpacity={0.85}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: active }}
                                        accessibilityLabel={opt.label}
                                        style={[
                                            s.themeChip,
                                            { borderColor: dividerColor, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
                                            active && { backgroundColor: Neo.colors.categoria.ameixa.fill, borderColor: Neo.colors.categoria.ameixa.fill },
                                        ]}
                                    >
                                        <NeoIcon
                                            name={opt.iconName}
                                            size={18}
                                            color={active ? '#FFFFFF' : colors.neutral[800]}
                                            variant="Bold"
                                        />
                                        <Small style={[
                                            s.themeChipLabel,
                                            { color: active ? '#FFFFFF' : colors.neutral[800] },
                                        ]}>
                                            {opt.label}
                                        </Small>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </NeoCard>

                    {/* SEÇÃO VISÃO */}
                    <Eyebrow style={{ marginTop: 24, marginBottom: 10 }}>
                        {t('settings.visual', 'Visão')}
                    </Eyebrow>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        {/* Font Scale Picker (3 níveis) */}
                        <View style={s.settingRow}>
                            <View style={[s.settingIcon, { backgroundColor: '#10B981' + '33' }]}>
                                <NeoIcon name="TextalignJustifycenter" size={22} color="#10B981" variant="Bold" />
                            </View>
                            <View style={s.settingTextCol}>
                                <Body style={[s.settingLabel, { color: colors.neutral[900] }]}>
                                    {t('settings.largeText')}
                                </Body>
                                <Small style={[s.settingDesc, { color: colors.neutral[700] }]}>
                                    {t('settings.largeTextDesc')}
                                </Small>
                            </View>
                        </View>
                        <View style={s.themePickerRow}>
                            {fontScaleOptions.map(opt => {
                                const active = fontSizeLevel === opt.id;
                                return (
                                    <TouchableOpacity
                                        key={opt.id}
                                        onPress={() => { haptic.toggle(); updateFontSize(opt.id); }}
                                        activeOpacity={0.85}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: active }}
                                        accessibilityLabel={`${opt.label} (${Math.round(opt.id * 100)}%)`}
                                        style={[
                                            s.themeChip,
                                            { borderColor: dividerColor, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' },
                                            active && { backgroundColor: '#10B981', borderColor: '#10B981' },
                                        ]}
                                    >
                                        <Small style={[
                                            s.themeChipLabel,
                                            { color: active ? '#FFFFFF' : colors.neutral[800], fontSize: 12 + (opt.id * 2) },
                                        ]}>
                                            {opt.sample}
                                        </Small>
                                        <Caption style={{ color: active ? '#FFFFFF' : colors.neutral[600], marginTop: 1 }}>
                                            {opt.label}
                                        </Caption>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={{ borderTopWidth: 1, borderTopColor: dividerColor }} />
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
                    <Eyebrow style={{ marginTop: 24, marginBottom: 10 }}>
                        {t('settings.audioFeedback', 'Movimento e Áudio')}
                    </Eyebrow>
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
                    <Eyebrow style={{ marginTop: 24, marginBottom: 10 }}>
                        {t('settings.interaction', 'Interação')}
                    </Eyebrow>
                    <NeoCard variant="elevated" style={s.settingCard}>
                        {renderSettingItem({
                            label: t('settings.leftHanded'),
                            desc: t('settings.leftHandedDesc'),
                            iconName: 'Hand',
                            color: Neo.colors.categoria.ameixa.fill,
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

    // Theme picker row (Sistema / Claro / Escuro)
    themePickerRow: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 10,
        paddingBottom: 14,
    },
    themeChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
    },
    themeChipLabel: {
        fontWeight: '700',
        fontSize: 13,
    },
});
