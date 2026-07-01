import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';
import NeoScreenHeader from '../components/NeoScreenHeader';
import { Body, Small } from '../components/NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';

// Canais oficiais Vigilaro. Estrutura pensada p/ crescer (WhatsApp/redes depois).
const EMAIL = 'contato@vigilarocare.ai.br';
const SITE = 'https://www.vigilarocare.ai.br';
const SITE_LABEL = 'www.vigilarocare.ai.br';

export default function ContatoScreen({ navigation }) {
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[600];
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await Clipboard.setStringAsync(EMAIL);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (_) { /* silent */ }
    };

    const sendEmail = () => Linking.openURL(`mailto:${EMAIL}`);
    const openSite = () => Linking.openURL(SITE);

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />
                <NeoScreenHeader
                    title={t('menu.contact', 'Contato')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <Body style={[styles.intro, { color: textSecondary }]}>
                        {t('contact.intro', 'Fale com a equipe Vigilaro. Respondemos por e-mail o mais rápido possível.')}
                    </Body>

                    {/* E-MAIL — ação principal é COPIAR (in-app, sem seletor "Abrir com") */}
                    <NeoCard variant="glass" style={styles.channelCard}>
                        <View style={styles.channelHeader}>
                            <View style={[styles.iconCircle, { backgroundColor: 'rgba(16,185,129,0.14)' }]}>
                                <NeoIcon name="Sms" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Small style={[styles.channelLabel, { color: textSecondary }]}>
                                    {t('contact.email', 'E-mail')}
                                </Small>
                                <Body style={[styles.channelValue, { color: textPrimary }]} numberOfLines={1}>
                                    {EMAIL}
                                </Body>
                            </View>
                        </View>
                        <View style={styles.actionsRow}>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.actionPrimary]}
                                onPress={copyEmail}
                                activeOpacity={0.85}
                                accessibilityRole="button"
                                accessibilityLabel={t('contact.copy', 'Copiar e-mail')}
                            >
                                <NeoIcon name={copied ? 'TickCircle' : 'Copy'} size={18} color={Neo.colors.neutral.white} variant="Bold" />
                                <Text style={styles.actionPrimaryText}>
                                    {copied ? t('contact.copied', 'Copiado!') : t('contact.copy', 'Copiar')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtn, styles.actionSecondary]}
                                onPress={sendEmail}
                                activeOpacity={0.85}
                                accessibilityRole="button"
                                accessibilityLabel={t('contact.send', 'Enviar e-mail')}
                            >
                                <NeoIcon name="PaperPlaneTilt" size={18} color={Neo.colors.primary[700]} variant="Bold" />
                                <Text style={styles.actionSecondaryText}>{t('contact.send', 'Enviar')}</Text>
                            </TouchableOpacity>
                        </View>
                    </NeoCard>

                    {/* SITE — https abre o navegador direto, sem seletor */}
                    <TouchableOpacity activeOpacity={0.85} onPress={openSite}>
                        <NeoCard variant="glass" style={styles.channelCard}>
                            <View style={styles.channelHeader}>
                                <View style={[styles.iconCircle, { backgroundColor: 'rgba(14,165,233,0.14)' }]}>
                                    <NeoIcon name="Global" size={22} color={Neo.colors.secondary[500]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Small style={[styles.channelLabel, { color: textSecondary }]}>
                                        {t('contact.website', 'Site')}
                                    </Small>
                                    <Body style={[styles.channelValue, { color: textPrimary }]} numberOfLines={1}>
                                        {SITE_LABEL}
                                    </Body>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[400]} />
                            </View>
                        </NeoCard>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },
    intro: {
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20,
    },
    channelCard: {
        padding: 18,
        marginBottom: 16,
        borderRadius: 18,
    },
    channelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    iconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    channelLabel: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        marginBottom: 2,
    },
    channelValue: {
        fontSize: 16,
        fontWeight: '700',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 12,
    },
    actionPrimary: {
        backgroundColor: Neo.colors.primary[600],
    },
    actionPrimaryText: {
        color: Neo.colors.neutral.white,
        fontWeight: '800',
        fontSize: 15,
    },
    actionSecondary: {
        borderWidth: 1.5,
        borderColor: Neo.colors.primary[300],
    },
    actionSecondaryText: {
        color: Neo.colors.primary[700],
        fontWeight: '800',
        fontSize: 15,
    },
});
