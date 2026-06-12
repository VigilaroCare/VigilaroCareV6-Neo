// screens/FallSensitivityScreen.js
//
// Tela de configuração da sensibilidade do detector de queda.
// O usuário escolhe entre 3 presets (Alta / Média / Baixa) ou desliga
// a detecção como um todo. A escolha é persistida em AsyncStorage via
// FallDetectionService e aplicada em runtime — sem precisar reiniciar
// o app.
//
// Padrão visual: AppBackground + header card-elevated (mesmo padrão
// de TravelMode / IntroSafety / MapaDeCalor), grid de cards de preset
// com border destacada quando ativo, divisor e switch de on/off.

import React, { useEffect, useState } from 'react';
import {
    View, ScrollView, TouchableOpacity, StyleSheet, Switch, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';

import { DS as Neo } from '../utils/DesignSystem2026';
import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H1, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import FallDetectionService from '../services/FallDetectionService';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const PRESETS = [
    {
        level: 'high',
        labelKey: 'fallSensitivity.high.title',
        labelDefault: 'Alta',
        descKey: 'fallSensitivity.high.desc',
        descDefault: 'Reage a quedas leves. Pode disparar se o celular cair de uma mesa.',
        color: '#EF4444', // red-500
        iconName: 'ArrowDown2',
    },
    {
        level: 'medium',
        labelKey: 'fallSensitivity.medium.title',
        labelDefault: 'Média (recomendada)',
        descKey: 'fallSensitivity.medium.desc',
        descDefault: 'Equilíbrio entre alerta rápido e poucos falsos positivos. Boa escolha pra maioria.',
        color: '#10B981', // emerald-500
        iconName: 'Activity',
    },
    {
        level: 'low',
        labelKey: 'fallSensitivity.low.title',
        labelDefault: 'Baixa',
        descKey: 'fallSensitivity.low.desc',
        descDefault: 'Só dispara em impactos fortes. Ideal pra quem é ativo ou anda em transporte público.',
        color: '#0EA5E9', // sky-500
        iconName: 'ShieldTick',
    },
];

export default function FallSensitivityScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];

    const [currentPreset, setCurrentPreset] = useState(FallDetectionService.getCurrentPreset());
    const [isEnabled, setIsEnabled] = useState(FallDetectionService.getIsEnabled());

    // Sincroniza com o service no mount (caso o usuário tenha alterado em outro lugar)
    useEffect(() => {
        setCurrentPreset(FallDetectionService.getCurrentPreset());
        setIsEnabled(FallDetectionService.getIsEnabled());
    }, []);

    const handleSelectPreset = async (level) => {
        if (!isEnabled) return; // não permite trocar se está desligado
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setCurrentPreset(level);
        await FallDetectionService.setSensitivityPreset(level);
    };

    const handleToggleEnabled = async (val) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsEnabled(val);
        await FallDetectionService.setEnabled(val);
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER consistente */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('fallSensitivity.title', 'Sensibilidade de queda')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('fallSensitivity.subtitle', 'Como o app reconhece uma queda real')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }}
                >
                    {/* HERO card-elevated */}
                    <NeoCard variant="elevated" style={s.headerCard}>
                        <View style={[s.headerCardIcon, { backgroundColor: Neo.colors.primary[100] }]}>
                            <NeoIcon name="Activity" size={24} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                        <Text style={[s.headerCardText, { color: textSecondary }]}>
                            {t(
                                'fallSensitivity.hero',
                                'Quanto mais sensível, mais cedo o app reage — mas também aumenta a chance de alerta sem motivo. Escolha o que faz sentido pra você.'
                            )}
                        </Text>
                    </NeoCard>

                    {/* TOGGLE on/off */}
                    <NeoCard variant="elevated" style={s.toggleCard}>
                        <View style={[s.toggleIcon, { backgroundColor: isEnabled ? Neo.colors.primary[100] : 'rgba(0,0,0,0.06)' }]}>
                            <NeoIcon
                                name={isEnabled ? 'NotificationBing' : 'NotificationBing1'}
                                size={22}
                                color={isEnabled ? Neo.colors.primary[600] : Neo.colors.neutral[500]}
                                variant="Bold"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={[s.toggleLabel, { color: textPrimary }]}>
                                {t('fallSensitivity.toggleLabel', 'Detecção de queda')}
                            </Body>
                            <Small style={[s.toggleDesc, { color: textSecondary }]}>
                                {isEnabled
                                    ? t('fallSensitivity.toggleOnDesc', 'Ativa em segundo plano enquanto o app está aberto.')
                                    : t('fallSensitivity.toggleOffDesc', 'Desligada. O app não vai reagir a quedas.')}
                            </Small>
                        </View>
                        <Switch
                            value={isEnabled}
                            onValueChange={handleToggleEnabled}
                            trackColor={{ false: Neo.colors.neutral[300], true: Neo.colors.primary[500] }}
                            thumbColor={Neo.colors.neutral.white}
                        />
                    </NeoCard>

                    {/* Expectativa calibrada onde o recurso é ligado — o app é
                        camada de apoio, não promessa de detecção garantida */}
                    <SafetyDisclaimer variant="fall" style={{ marginTop: 10 }} />

                    {/* SECTION LABEL */}
                    <Text
                        style={[s.sectionLabel, { color: textSecondary, opacity: isEnabled ? 0.85 : 0.4 }]}
                        accessibilityRole="header"
                    >
                        {t('fallSensitivity.levelSection', 'Nível de sensibilidade')}
                    </Text>

                    {/* PRESET CARDS */}
                    {PRESETS.map((preset) => {
                        const isActive = currentPreset === preset.level;
                        const cardOpacity = isEnabled ? 1 : 0.5;
                        return (
                            <TouchableOpacity
                                key={preset.level}
                                onPress={() => handleSelectPreset(preset.level)}
                                activeOpacity={isEnabled ? 0.85 : 1}
                                disabled={!isEnabled}
                                style={{ opacity: cardOpacity }}
                            >
                                <NeoCard
                                    variant="elevated"
                                    style={[
                                        s.presetCard,
                                        isActive && {
                                            borderWidth: 2,
                                            borderColor: preset.color,
                                        },
                                    ]}
                                >
                                    <View style={[s.presetIcon, { backgroundColor: preset.color + '22' }]}>
                                        <NeoIcon name={preset.iconName} size={24} color={preset.color} variant="Bold" />
                                    </View>
                                    <View style={s.presetTextCol}>
                                        <View style={s.presetTitleRow}>
                                            <Body style={[s.presetTitle, { color: textPrimary }]}>
                                                {t(preset.labelKey, preset.labelDefault)}
                                            </Body>
                                            {isActive && (
                                                <View style={[s.activeBadge, { backgroundColor: preset.color }]}>
                                                    <NeoIcon name="TickCircle" size={12} color="#FFFFFF" variant="Bold" />
                                                </View>
                                            )}
                                        </View>
                                        <Small style={[s.presetDesc, { color: textSecondary }]}>
                                            {t(preset.descKey, preset.descDefault)}
                                        </Small>
                                    </View>
                                </NeoCard>
                            </TouchableOpacity>
                        );
                    })}

                    {/* Nota técnica discreta */}
                    <Small style={[s.footnote, { color: themeColors.neutral[500] }]}>
                        {t(
                            'fallSensitivity.footnote',
                            'O ajuste vale a partir de agora. Você pode mudar quantas vezes quiser.'
                        )}
                    </Small>
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
        paddingBottom: 18,
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
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    // Hero card (padrão card-elevated)
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 16,
        borderRadius: 18,
    },
    headerCardIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerCardText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
    },

    // Toggle on/off card
    toggleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 22,
        borderRadius: 18,
    },
    toggleIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    toggleLabel: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 2,
    },
    toggleDesc: {
        lineHeight: 17,
    },

    // Section label
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
    },

    // Preset cards
    presetCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        marginBottom: 10,
        borderRadius: 18,
    },
    presetIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    presetTextCol: {
        flex: 1,
    },
    presetTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 3,
    },
    presetTitle: {
        fontSize: 15,
        fontWeight: '800',
        flex: 1,
    },
    activeBadge: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    presetDesc: {
        lineHeight: 18,
    },

    footnote: {
        textAlign: 'center',
        marginTop: 16,
        fontSize: 12,
        lineHeight: 17,
    },
});
