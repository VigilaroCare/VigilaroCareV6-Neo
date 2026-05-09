
import React from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking, Image, Text, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Iconsax
import {
    Crown,
    InfoCircle,
    Trash,
    MessageQuestion,
    ArrowRight2,
    Setting2,
    Eye,
    LampOn,
    DocumentText,
    Shield,
    LanguageSquare
} from 'iconsax-react-native';

// Services & Utils
// No longer need Theme
import { DS as Neo } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';

// Components
import NeoCard from '../components/NeoCard';
import NeoText, { H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import NeoIcon from '../components/NeoIcon';

const LANGUAGES = [
    { code: 'pt-BR', flag: '🇧🇷', label: 'PT-BR', name: 'Português' },
    { code: 'pt-PT', flag: '🇵🇹', label: 'PT-PT', name: 'Português' },
    { code: 'en',    flag: '🇺🇸', label: 'EN',    name: 'English' },
    { code: 'es',    flag: '🇪🇸', label: 'ES',    name: 'Español' },
];

export default function MenuScreenNeo() {
    const navigation = useNavigation();
    // BUG-07 FIX: currentProfile não existe no contexto; tela usa displayProfile via ProfileService
    // const { primaryProfile } = useProfiles(); // disponível se necessário no futuro
    const [displayProfile, setDisplayProfile] = React.useState(null);
    const [showLangPicker, setShowLangPicker] = React.useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        i18n.changeLanguage(lng);
    };

    useFocusEffect(
        React.useCallback(() => {
            const loadFresh = async () => {
                const p = await ProfileService.getPrimaryProfile();
                setDisplayProfile(p);
            };
            loadFresh();
        }, [])
    );

    const handleResetApp = () => {
        Alert.alert(
            t('menu.resetWarningTitle'),
            t('menu.resetWarningDesc'),
            [
                { text: t('health.cancel'), style: "cancel" },
                {
                    text: t('menu.resetConfirm'),
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const success = await ProfileService.resetAllData();
                            if (success) {
                                Alert.alert("Sucesso", t('menu.resetSuccess'));
                                navigation.reset({ index: 0, routes: [{ name: 'BoasVindas' }] });
                            } else {
                                Alert.alert("Erro", t('menu.resetError'));
                            }
                        } catch (error) {
                            console.error("Reset error:", error);
                        }
                    }
                }
            ]
        );
    };

    const menuItems = [
        {
            title: t('menu.accountAndApp'),
            data: [
                {
                    IconComponent: Eye,
                    color: Neo.colors.primary[500],
                    label: t('menu.accessibility'),
                    desc: t('menu.accessibilityDesc'),
                    action: () => navigation.navigate('AccessibilitySettings')
                },
                {
                    IconComponent: Crown,
                    color: Neo.colors.secondary[500],
                    label: t('menu.premium'),
                    desc: t('menu.premiumDesc'),
                    action: () => navigation.navigate('UpgradePremium')
                },
                {
                    IconComponent: InfoCircle,
                    color: Neo.colors.neutral[500],
                    label: t('menu.about'),
                    desc: t('menu.aboutDesc'),
                    action: () => navigation.navigate('Sobre')
                },
                {
                    IconComponent: Trash,
                    color: Neo.colors.feedback.error,
                    label: t('menu.resetApp'),
                    desc: t('menu.resetAppDesc'),
                    action: handleResetApp
                },
                {
                    IconComponent: MessageQuestion,
                    color: Neo.colors.feedback.warning,
                    label: t('menu.support'),
                    desc: t('menu.supportDesc'),
                    action: () => Linking.openURL('mailto:suporte@vigilaro.com')
                },
                {
                    IconComponent: DocumentText,
                    color: Neo.colors.primary[600],
                    label: t('menu.terms'),
                    desc: t('menu.termsDesc'),
                    action: () => navigation.navigate('TermsOfUse')
                },
                {
                    IconComponent: Shield,
                    color: Neo.colors.neutral[800],
                    label: t('menu.privacy'),
                    desc: t('menu.privacyDesc'),
                    action: () => navigation.navigate('PrivacyPolicy')
                },
                {
                    IconComponent: LanguageSquare,
                    color: Neo.colors.primary[400],
                    label: t('settings.language', 'Idioma'),
                    desc: 'Language',
                    action: () => setShowLangPicker(true)
                }
            ]
        }
    ];

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                <View style={{ paddingHorizontal: Neo.spacing.lg, paddingVertical: Neo.spacing.md }}>
                    <H2>{t('menu.menuSettings')}</H2>
                    <Caption>{t('menu.generalSettings')}</Caption>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 100 }}>
                    {menuItems.map((section, sectionIdx) => (
                        <View key={sectionIdx} style={{ marginBottom: 24 }}>

                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: 12
                            }}>
                                {section.data.map((item, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        onPress={item.action}
                                        style={{ width: '31%', aspectRatio: 0.85 }}
                                    >
                                        <NeoCard variant="elevated" style={{
                                            flex: 1,
                                            borderRadius: 20,
                                            padding: 10,
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            paddingTop: 16,
                                            borderColor: item.color + '30', // Very subtle tint border
                                            overflow: 'hidden'
                                        }}>
                                            <View style={{
                                                width: 52,
                                                height: 52,
                                                borderRadius: 26,
                                                backgroundColor: item.color + '18', // Transparent tint background (~10%)
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: 8
                                            }}>
                                                <item.IconComponent size={28} color={item.color} variant="Bulk" />
                                            </View>

                                            <Body style={{
                                                fontSize: 12,
                                                fontWeight: '800',
                                                color: Neo.colors.neutral[800],
                                                textAlign: 'center',
                                                lineHeight: 16
                                            }} numberOfLines={2}>
                                                {item.label}
                                            </Body>
                                        </NeoCard>
                                        {/* Bottom Color Bar (Standard Pattern) */}
                                        <View style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '60%',
                                            height: 4,
                                            backgroundColor: item.color,
                                            borderTopLeftRadius: 4,
                                            borderTopRightRadius: 4
                                        }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}

                    <Small style={{ textAlign: 'center', color: Neo.colors.neutral[400], marginTop: 20 }}>
                        {t('headersFirst.vigilaroCareV600NeoBuild2026', 'Vigilaro Care v6.0.0 (Neo Build 2026)')}
                    </Small>

                </ScrollView>

                {/* Language Picker Modal */}
                <Modal visible={showLangPicker} transparent animationType="fade" onRequestClose={() => setShowLangPicker(false)}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' }} activeOpacity={1} onPress={() => setShowLangPicker(false)}>
                        <View style={{ backgroundColor: Neo.colors.neutral.white, borderRadius: 20, padding: 24, width: '80%', ...Neo.shadows.md }}>
                            <H3 style={{ textAlign: 'center', marginBottom: 20 }}>{t('settings.language', 'Idioma')}</H3>
                            {LANGUAGES.map(lang => {
                                const isActive = i18n.language === lang.code;
                                return (
                                    <TouchableOpacity
                                        key={lang.code}
                                        onPress={() => { changeLanguage(lang.code); setShowLangPicker(false); }}
                                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[100] }}
                                    >
                                        <Text style={{ fontSize: 28, marginRight: 14 }}>{lang.flag}</Text>
                                        <Body style={{ flex: 1, fontWeight: isActive ? 'bold' : '500', color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[800] }}>{lang.name}</Body>
                                        {isActive && <NeoIcon name="TickCircle" size={20} color={Neo.colors.primary[600]} variant="Bold" />}
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
