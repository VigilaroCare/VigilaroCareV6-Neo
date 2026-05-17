import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import AppBackground from '../components/AppBackground';
import { H1, H3, Body, Small, Caption } from '../components/NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';

const ACCENT = '#7C3AED'; // violet — combina com o card "Por voz" das Ferramentas

export default function AssistentePrevencaoIAScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');

    const features = [
        {
            iconName: 'Message',
            color: ACCENT,
            text: t('assistant.featureRealtime', 'Dúvidas em tempo real'),
        },
        {
            iconName: 'Health',
            color: '#DC2626',
            text: t('assistant.featureEmergency', 'Apoio em situações de emergência'),
        },
        {
            iconName: 'ShieldTick',
            color: '#16A34A',
            text: t('assistant.featurePrevention', 'Dicas de prevenção contextuais'),
        },
    ];

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

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
                            {t('assistant.headerTitle', 'Assistente')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('assistant.headerSubtitle', 'Conversa por voz sobre prevenção')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* HERO ÍCONE + INTRO */}
                    <View style={s.heroBlock}>
                        <View style={s.heroIconWrap}>
                            <NeoIcon name="Microphone2" size={56} color={ACCENT} variant="Bold" />
                        </View>
                        <H3 style={s.heroTitle}>
                            {t('assistant.heroTitle', 'Pergunte falando')}
                        </H3>
                        <Body style={s.heroText}>
                            {t('assistant.heroText', 'Tire dúvidas sobre segurança doméstica, prevenção e primeiros socorros conversando naturalmente.')}
                        </Body>
                    </View>

                    {/* FEATURES — 3 itens em cards glass */}
                    <View style={s.featureList}>
                        {features.map((f, idx) => (
                            <NeoCard key={idx} variant="elevated" style={s.featureCard}>
                                <View style={[s.featureIconWrap, { backgroundColor: f.color + '33' }]}>
                                    <NeoIcon name={f.iconName} size={18} color={f.color} variant="Bold" />
                                </View>
                                <Body style={s.featureText}>{f.text}</Body>
                            </NeoCard>
                        ))}
                    </View>

                    {/* CTA PRIMÁRIO — sem nome de vendor, sem "IA" stamp */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ConversationalAgent')}
                        activeOpacity={0.85}
                        style={s.ctaPrimary}
                    >
                        <NeoIcon name="Microphone2" size={22} color="#FFF" variant="Bold" />
                        <Text style={s.ctaPrimaryText}>
                            {t('assistant.ctaStart', 'Iniciar conversa')}
                        </Text>
                    </TouchableOpacity>

                    {/* CTA SECUNDÁRIO — link discreto */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AITextChat')}
                        activeOpacity={0.7}
                        style={s.ctaSecondary}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Text style={s.ctaSecondaryText}>
                            {t('assistant.ctaPreferText', 'Prefiro digitar')}
                        </Text>
                    </TouchableOpacity>

                    {/* DISCLAIMER LGPD/Apple */}
                    <Small style={s.disclaimer}>
                        {t('ai.disclaimer', 'O Vigilaro Care é uma ferramenta educativa e preventiva. A IA pode cometer erros e não substitui avaliação técnica, consulta médica ou socorro profissional. Em emergências graves, ligue imediatamente para os serviços de emergência (ex: 192, 193).')}
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

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 8,
        paddingBottom: 190,
    },

    // Hero
    heroBlock: {
        alignItems: 'center',
        marginBottom: 24,
    },
    heroIconWrap: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(124,58,237,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    heroTitle: {
        fontSize: 22,
        color: Neo.colors.neutral[900],
        marginBottom: 8,
        textAlign: 'center',
    },
    heroText: {
        textAlign: 'center',
        color: Neo.colors.neutral[700],
        fontSize: 14,
        lineHeight: 20,
        maxWidth: 320,
    },

    // Features
    featureList: {
        gap: 10,
        marginBottom: 24,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        gap: 12,
    },
    featureIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        flex: 1,
        fontSize: 14,
        color: Neo.colors.neutral[800],
        fontWeight: '600',
    },

    // CTAs
    ctaPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: ACCENT,
        paddingVertical: 16,
        borderRadius: 16,
        marginBottom: 10,
    },
    ctaPrimaryText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 16,
        letterSpacing: 0.1,
    },
    ctaSecondary: {
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    ctaSecondaryText: {
        fontSize: 13.5,
        fontWeight: '700',
        color: ACCENT,
    },

    // Disclaimer
    disclaimer: {
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        lineHeight: 16,
        fontSize: 11.5,
        paddingHorizontal: 8,
    },
});
