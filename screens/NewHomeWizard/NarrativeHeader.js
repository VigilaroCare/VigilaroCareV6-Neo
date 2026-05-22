// screens/NewHomeWizard/NarrativeHeader.js
//
// Cabeçalho narrativo (tom Agnaldo) que abre cada passo do wizard.
// Não é título funcional — é o "olho no olho" entre o app e o usuário,
// conforme o princípio de briefing vivo: "antes de pedir dado, explico
// pra que é".
//
// USO:
//   <NarrativeHeader
//     stepLabel="ONDE • PASSO 1 DE 3"
//     intro="Vamos começar pela casa. É de onde tudo parte."
//     subIntro="Conte primeiro o tipo de moradia e quantos andares."
//   />

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoIcon from '../../components/NeoIcon';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function NarrativeHeader({ stepLabel, intro, subIntro, iconName = 'Home2' }) {
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const titleColor = isDark ? themeColors.neutral[900] : Neo.colors.neutral[900];
    const subColor = isDark ? themeColors.neutral[700] : Neo.colors.neutral[700];
    const labelColor = isDark ? themeColors.neutral[600] : Neo.colors.neutral[600];

    return (
        <View style={s.wrap}>
            {!!stepLabel && (
                <Text style={[s.stepLabel, { color: labelColor }]}>{stepLabel}</Text>
            )}
            <View style={s.row}>
                <View style={s.iconWrap}>
                    <NeoIcon name={iconName} size={22} color={Neo.colors.primary[600]} variant="Bold" />
                </View>
                <View style={{ flex: 1 }}>
                    {!!intro && (
                        <Text style={[s.intro, { color: titleColor }]}>{intro}</Text>
                    )}
                    {!!subIntro && (
                        <Text style={[s.subIntro, { color: subColor }]}>{subIntro}</Text>
                    )}
                </View>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    wrap: {
        paddingHorizontal: 4,
        paddingBottom: 18,
    },
    stepLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        marginBottom: 12,
        opacity: 0.7,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: 'rgba(16,185,129,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    intro: {
        fontSize: 19,
        fontWeight: '800',
        letterSpacing: -0.4,
        lineHeight: 25,
        marginBottom: 4,
    },
    subIntro: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
});
