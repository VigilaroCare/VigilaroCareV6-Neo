import { useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { DS as Neo } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import SubscriptionService from '../services/SubscriptionService';

import NeoCard from '../components/NeoCard';
import PictogramTile from '../components/PictogramTile';
import { H1, H3, Body, Small } from '../components/NeoTypography';
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
    const { t, i18n } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textSecondary = themeColors.neutral[700];

    const [isPremium, setIsPremium] = useState(false);
    const [showLangPicker, setShowLangPicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            let cancelled = false;
            (async () => {
                try {
                    const premium = await SubscriptionService.isPremium();
                    if (!cancelled) setIsPremium(!!premium);
                } catch (_) { /* silent */ }
            })();
            return () => { cancelled = true; };
        }, [])
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
                                NeoAlert.alert(t('telas.MenuScreenNeo.sucesso', 'Sucesso'), t('menu.resetSuccess'));
                                navigation.reset({ index: 0, routes: [{ name: 'BoasVindas' }] });
                            } else {
                                NeoAlert.alert(t('telas.MenuScreenNeo.erro', 'Erro'), t('menu.resetError'));
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
            iconName: 'PersonSimpleCircle',
            image: require('../assets/illustrations/glifos/pictogram-companhia-pcd-v3.png'),
            accent: GA.saude, // teal
            label: t('menu.accessibility'),
            description: t('menu.accessibilityDesc', 'Tamanho de fonte, tema e ajustes de leitura.'),
            action: () => navigateWithHaptic('AccessibilitySettings'),
        },
        {
            key: 'idioma',
            iconName: 'LanguageSquare',
            image: require('../assets/illustrations/glifos/pictogram-menu-idioma.png'),
            accent: GA.pets, // rose
            label: t('settings.language', 'Idioma'),
            description: t('menu.languageDesc', 'Escolha o idioma do aplicativo.'),
            action: () => setShowLangPicker(true),
        },
    ];

    const sectionAjuda = [
        {
            key: 'contato',
            iconName: 'Sms',
            image: require('../assets/illustrations/glifos/pictogram-menu-contato.png'),
            accent: GA.eventuais, // amber
            label: t('menu.contact', 'Contato'),
            description: t('menu.contactDesc', 'Fale com a equipe Vigilaro Care.'),
            action: () => navigateWithHaptic('Contato'),
        },
        {
            key: 'sobre',
            iconName: 'InfoCircle',
            image: require('../assets/illustrations/glifos/pictogram-menu-sobre.png'),
            accent: GA.vistorias, // sky
            label: t('menu.about'),
            description: t('menu.aboutDesc', 'Versão, créditos e informações do app.'),
            action: () => navigateWithHaptic('Sobre'),
        },
        {
            key: 'termos',
            iconName: 'DocumentText',
            image: require('../assets/illustrations/glifos/pictogram-menu-termos.png'),
            accent: GA.saude, // teal
            label: t('menu.terms'),
            description: t('menu.termsDesc', 'Termos de uso da plataforma.'),
            action: () => navigateWithHaptic('TermsOfUse'),
        },
        {
            key: 'privacidade',
            iconName: 'Shield',
            image: require('../assets/illustrations/glifos/pictogram-menu-privacidade.png'),
            accent: GA.pets, // rose
            label: t('menu.privacy'),
            description: t('menu.privacyDesc', 'Como cuidamos e protegemos seus dados.'),
            action: () => navigateWithHaptic('PrivacyPolicy'),
        },
    ];

    const renderSectionGrid = (title, items) => (
        <View style={s.sectionContainer}>
            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                {title}
            </Text>
            <View style={s.gridContainer}>
                {items.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        activeOpacity={0.85}
                        onPress={item.action}
                        style={s.gridItem}
                    >
                        <PictogramTile
                            source={item.image}
                            width="100%"
                            moldura
                            atenuado={isDark}
                        />
                        <Small style={s.gridItemText} numberOfLines={2}>
                            {item.label}
                        </Small>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: Neo.spacing.lg,
                        paddingTop: 0,
                        paddingBottom: 20, // Strict minimum for scroll zero
                    }}
                >
                    {/* HEADER — só o título (perfil/residência vivem na Home;
                        status Premium já aparece no cartão dedicado abaixo) */}
                    <View style={s.headerBlock}>
                        <H1 style={s.title}>{t('menu.menuSettings')}</H1>
                    </View>

                    {/* PREMIUM — cartão dedicado, tom convidativo (não vendedor agressivo) */}
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => navigateWithHaptic('UpgradePremium')}
                        style={{ marginTop: 0, marginBottom: 8 }}
                    >
                        {/* Sem backgroundColor cravado aqui — deixa o proprio
                            NeoCard variant="premium" render seu "vidro de luxo"
                            (opacidade 0.82/0.68, specular, sombra da marca).
                            O override anterior (alpha 0.4) deixava o card
                            "lavado" antes de o vidro aparecer. */}
                        <NeoCard variant="premium" style={s.premiumCard}>
                            <View style={s.premiumIconWrap}>
                                <NeoIcon name="Sparkle" size={26} color={Neo.colors.primary[700]} variant="Bulk" />
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

                                        {/* SEÇÕES - BLOCOS CONTÍNUOS */}
                    {renderSectionGrid(t('menu.sectionAccount', 'Conta & Preferências'), sectionConta)}
                    {renderSectionGrid(t('menu.sectionHelp', 'Ajuda & Informações'), sectionAjuda)}

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
    },
    premiumSub: {
        marginTop: 2,
        lineHeight: 16,
    },
    // Seções
    sectionContainer: {
        marginTop: 8,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 8, // Padronizado com o grid da Home (8px)
        marginLeft: 4,
        textTransform: 'uppercase',
        textAlign: 'left',
        opacity: 0.85,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: -14, // Compensa o padding transparente no topo dos assets 3D cerâmicos
    },
    gridItem: {
        alignItems: 'center',
        width: '49%', // 2 columns like Home
        marginBottom: 8,
    },
    gridItemText: {
        textAlign: 'center',
        fontSize: 13,
        fontWeight: '700',
        lineHeight: 16,
        marginTop: -10, // pulls text closer to the image
        paddingHorizontal: 4,
    },

// Destrutivo + footer
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginTop: 8,
        marginBottom: 0,
    },
    resetLink: {
        alignSelf: 'center',
        paddingVertical: 6,
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
        marginTop: 4,
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
