import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import SubscriptionService from '../services/SubscriptionService';
import { useProfiles } from '../contexts/ProfileContext';

import NeoCard from '../components/NeoCard';
import { H1, H3, Body, Caption, Small } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import NeoIcon from '../components/NeoIcon';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import NeoAlert from '../utils/NeoAlert';

const LANGUAGES = [
    { code: 'pt-BR', flag: '🇧🇷', label: 'PT-BR', name: 'Português' },
    { code: 'pt-PT', flag: '🇵🇹', label: 'PT-PT', name: 'Português' },
    { code: 'en',    flag: '🇺🇸', label: 'EN',    name: 'English' },
    { code: 'es',    flag: '🇪🇸', label: 'ES',    name: 'Español' },
];

export default function MenuScreenNeo() {
    const navigation = useNavigation();
    const { primaryProfile, loadProfiles } = useProfiles();
    const { t, i18n } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];

    const [displayProfile, setDisplayProfile] = useState(null);
    const [activeResidenceName, setActiveResidenceName] = useState('');
    const [isPremium, setIsPremium] = useState(false);
    const [showLangPicker, setShowLangPicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let cancelled = false;
            (async () => {
                try {
                    const p = await ProfileService.getPrimaryProfile();
                    if (!cancelled) setDisplayProfile(p || primaryProfile);

                    const res = await ProfileService.getActiveResidence();
                    if (!cancelled && res?.nome) {
                        setActiveResidenceName(
                            res.nome === 'Minha Casa Principal'
                                ? t('home.mainHouse', 'Minha Casa Principal')
                                : res.nome
                        );
                    }

                    const premium = await SubscriptionService.isPremium();
                    if (!cancelled) setIsPremium(!!premium);
                } catch (_) { /* silent */ }
            })();
            return () => { cancelled = true; };
        }, [primaryProfile, t])
    );

    const navigateWithHaptic = (route, params) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(route, params);
    };

    const changeLanguage = (lng) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        i18n.changeLanguage(lng);
    };

    const handleResetApp = () => {
        NeoAlert.alert(
            t('menu.resetWarningTitle'),
            t('menu.resetWarningDesc'),
            [
                { text: t('health.cancel'), style: 'cancel' },
                {
                    text: t('menu.resetConfirm'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const success = await ProfileService.resetAllData();
                            if (success) {
                                NeoAlert.alert('Sucesso', t('menu.resetSuccess'));
                                navigation.reset({ index: 0, routes: [{ name: 'BoasVindas' }] });
                            } else {
                                NeoAlert.alert('Erro', t('menu.resetError'));
                            }
                        } catch (error) {
                            console.error('Reset error:', error);
                        }
                    },
                },
            ]
        );
    };

    // ── Seções ──
    // Harmonização iconográfica (2026-06-12): acentos vêm dos gridAccents do
    // DS (escala Tailwind-700 dessaturada, contraste AA) — fim dos 8 hexes
    // ad-hoc. O vermelho saiu da "sensibilidade de queda": vermelho é
    // RESERVADO a pânico/SOS (DS.emergency); configuração usa amber.
    // "Seu mapa sensível" foi removido daqui: é conteúdo principal, não ajuste.
    // Caminhos remanescentes: card na Home (premier) + "Atualizar mapeamento"
    // dentro do Raio X. Menu fica reservado pra ajustes verdadeiros.
    const GA = Neo.colors.gridAccents;
    const sectionConta = [
        {
            key: 'acessibilidade',
            iconName: 'Eye',
            accent: GA.saude, // teal
            label: t('menu.accessibility'),
            action: () => navigateWithHaptic('AccessibilitySettings'),
        },
        {
            key: 'sensibilidade_queda',
            iconName: 'Activity',
            accent: GA.eventuais, // amber — atenção sem alarme (vermelho é só SOS)
            label: t('menu.fallSensitivity', 'Sensibilidade de queda'),
            action: () => navigateWithHaptic('FallSensitivity'),
        },
        {
            key: 'idioma',
            iconName: 'LanguageSquare',
            accent: GA.pets, // rose
            label: t('settings.language', 'Idioma'),
            action: () => setShowLangPicker(true),
        },
    ];

    const sectionAjuda = [
        {
            key: 'suporte',
            iconName: 'MessageQuestion',
            accent: GA.eventuais, // amber
            label: t('menu.support'),
            action: () => Linking.openURL('mailto:contato@vigilarocare.ia.br'),
        },
        {
            key: 'sobre',
            iconName: 'InfoCircle',
            accent: GA.vistorias, // sky
            label: t('menu.about'),
            action: () => navigateWithHaptic('Sobre'),
        },
        {
            key: 'termos',
            iconName: 'DocumentText',
            accent: GA.saude, // teal
            label: t('menu.terms'),
            action: () => navigateWithHaptic('TermsOfUse'),
        },
        {
            key: 'privacidade',
            iconName: 'Shield',
            accent: GA.pets, // rose
            label: t('menu.privacy'),
            action: () => navigateWithHaptic('PrivacyPolicy'),
        },
    ];

    const profileName = (displayProfile?.nome || primaryProfile?.nome || '').split(' ')[0];
    const profileImageUri = displayProfile?.imagem
        ? ProfileService.resolveImageUri(displayProfile.imagem)
        : null;

    const renderGridCard = (item) => (
        <TouchableOpacity
            key={item.key}
            onPress={item.action}
            activeOpacity={0.85}
            style={s.gridCell}
        >
            <NeoCard variant="elevated" style={s.gridCard}>
                <View style={[s.gridIconCircle, { backgroundColor: item.accent.bg }]}>
                    <NeoIcon name={item.iconName} size={26} color={item.accent.color} variant="Bold" />
                </View>
                <Text style={[s.gridLabel, { color: textPrimary }]} numberOfLines={2}>
                    {item.label}
                </Text>
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: Neo.spacing.lg,
                        paddingTop: 8,
                        paddingBottom: 190, // libera espaço para o GlobalFloatingFooter
                                            // (botão SOS estende acima da barra base)
                    }}
                >
                    {/* HEADER — título + contexto do usuário */}
                    <View style={s.headerBlock}>
                        <H1 style={s.title}>{t('menu.menuSettings')}</H1>
                        {!!profileName && (
                            <View style={s.headerContext}>
                                {profileImageUri ? (
                                    <Image source={{ uri: profileImageUri }} style={s.avatar} />
                                ) : (
                                    <View style={[s.avatar, s.avatarPlaceholder]}>
                                        <Body style={{ color: Neo.colors.neutral.white, fontWeight: '800' }}>
                                            {profileName.charAt(0).toUpperCase()}
                                        </Body>
                                    </View>
                                )}
                                <View style={{ flex: 1 }}>
                                    <Body style={s.headerName}>{profileName}</Body>
                                    {!!activeResidenceName && (
                                        <Caption style={s.headerHouse} numberOfLines={1}>
                                            {activeResidenceName}
                                        </Caption>
                                    )}
                                </View>
                                {isPremium && (
                                    <View style={s.premiumBadge}>
                                        <NeoIcon name="TickCircle" size={12} color={Neo.colors.primary[700]} variant="Bold" />
                                        <Text style={s.premiumBadgeText}>Premium</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>

                    {/* PREMIUM — cartão dedicado, tom convidativo (não vendedor agressivo) */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigateWithHaptic('UpgradePremium')}
                        style={{ marginTop: 4, marginBottom: 18 }}
                    >
                        <NeoCard variant="elevated" style={s.premiumCard}>
                            <View style={s.premiumIconWrap}>
                                <NeoIcon name="Crown" size={26} color={Neo.colors.primary[700]} variant="Bulk" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Body style={s.premiumTitle}>
                                    {isPremium
                                        ? t('menu.premiumActiveTitle', 'Premium ativo')
                                        : t('menu.premiumPromoTitle', 'Vigilaro Premium')}
                                </Body>
                                <Small style={s.premiumSub} numberOfLines={2}>
                                    {isPremium
                                        ? t('menu.premiumActiveSub', 'Gerencie sua assinatura e benefícios.')
                                        : t('menu.premiumPromoSub', 'Voz em tempo real, scanner ilimitado e mais.')}
                                </Small>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.primary[600]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* SEÇÃO 1 — CONTA & PREFERÊNCIAS */}
                    <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                        {t('menu.sectionAccount', 'Conta & Preferências')}
                    </Text>
                    <View style={s.grid}>
                        {sectionConta.map(renderGridCard)}
                    </View>

                    {/* SEÇÃO 2 — AJUDA & INFORMAÇÕES */}
                    <Text style={[s.sectionLabel, { marginTop: 20, color: textSecondary }]} accessibilityRole="header">
                        {t('menu.sectionHelp', 'Ajuda & Informações')}
                    </Text>
                    <View style={s.grid}>
                        {sectionAjuda.map(renderGridCard)}
                    </View>

                    {/* DIVISOR + LINK DESTRUTIVO — visualmente quieto, isolado */}
                    <View style={s.divider} />
                    <TouchableOpacity
                        onPress={handleResetApp}
                        activeOpacity={0.6}
                        style={s.resetLink}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={s.resetLinkText}>
                            {t('menu.resetApp')}
                        </Text>
                    </TouchableOpacity>

                    <Small style={s.versionText}>
                        {t('headersFirst.vigilaroCareV600NeoBuild2026', 'Vigilaro Care v6.0.0 (Neo Build 2026)')}
                    </Small>

                </ScrollView>

                {/* MODAL DE IDIOMA */}
                <Modal
                    visible={showLangPicker}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowLangPicker(false)}
                >
                    <TouchableOpacity
                        style={s.modalBackdrop}
                        activeOpacity={1}
                        onPress={() => setShowLangPicker(false)}
                    >
                        <View style={[s.modalCard, { backgroundColor: isDark ? themeColors.neutral[200] : themeColors.neutral.white }]}>
                            <H3 style={{ textAlign: 'center', marginBottom: 20 }}>
                                {t('settings.language', 'Idioma')}
                            </H3>
                            {LANGUAGES.map(lang => {
                                const isActive = i18n.language === lang.code;
                                return (
                                    <TouchableOpacity
                                        key={lang.code}
                                        onPress={() => { changeLanguage(lang.code); setShowLangPicker(false); }}
                                        style={s.langRow}
                                    >
                                        <Text style={{ fontSize: 28, marginRight: 14 }}>{lang.flag}</Text>
                                        <Body
                                            style={{
                                                flex: 1,
                                                fontWeight: isActive ? 'bold' : '500',
                                                color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[800],
                                            }}
                                        >
                                            {lang.name}
                                        </Body>
                                        {isActive && (
                                            <NeoIcon name="TickCircle" size={20} color={Neo.colors.primary[600]} variant="Bold" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    headerBlock: {
        paddingTop: 4,
        paddingBottom: 14,
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 10,
    },
    headerContext: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.9)',
    },
    avatarPlaceholder: {
        backgroundColor: Neo.colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerName: {
        fontWeight: '700',
        fontSize: 16,
        color: Neo.colors.neutral[900],
    },
    headerHouse: {
        color: Neo.colors.neutral[600],
        marginTop: 1,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(16,185,129,0.10)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        gap: 4,
    },
    premiumBadgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: Neo.colors.primary[700],
        letterSpacing: 0.2,
    },

    // Premium card
    premiumCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    premiumIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(16,185,129,0.22)', // mais saturado para destacar
        alignItems: 'center',
        justifyContent: 'center',
    },
    premiumTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
    },
    premiumSub: {
        color: Neo.colors.neutral[600],
        marginTop: 2,
        lineHeight: 16,
    },

    // Seções
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 8,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Grid 2 colunas — uniforme, sem placeholders
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    gridCell: {
        width: '48.5%',
        aspectRatio: 1.6,
        marginBottom: 4,
    },
    gridCard: {
        flex: 1,
        borderRadius: 18,
        paddingVertical: 14,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gridIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    gridLabel: {
        flex: 1,
        fontSize: 13,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        lineHeight: 16,
    },

    // Destrutivo + footer
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginTop: 28,
        marginBottom: 6,
    },
    resetLink: {
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    resetLinkText: {
        fontSize: 13,
        fontWeight: '600',
        color: Neo.colors.feedback.error,
        opacity: 0.75,
        textAlign: 'center',
    },
    versionText: {
        textAlign: 'center',
        color: Neo.colors.neutral[400],
        marginTop: 8,
        fontSize: 11,
    },

    // Modal de idioma
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCard: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 20,
        padding: 24,
        width: '80%',
    },
    langRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100] || Neo.colors.neutral[200],
    },
});
