/**
 * AcessoriosSegurancaScreen.js
 * Tela de Acessórios de Segurança (Baby-proof, Idosos, Pets, PCD)
 * Vigilaro Care V6 Neo
 *
 * Padrao card-retangulo 120x120 + filtro por perfil + navegacao para
 * ConceitoDetail (hero = foto do card). Sem expand inline.
 */

import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'iconsax-react-native';
import NeoIcon from '../components/NeoIcon';
import { Shadows } from '../utils/Theme';
import { ACESSORIOS_SEGURANCA } from '../data/acessorios_seguranca';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import ReviewImage from '../components/ReviewImage';
import FadeInView from '../components/FadeInView';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

const THEME_COLOR = '#7C3AED'; // violet

const PROFILE_TABS = [
    { id: 'todos',    label: 'Todos',     emoji: '👥', color: THEME_COLOR },
    { id: 'bebe',     label: 'Bebês',     emoji: '👶', color: '#EC4899' },
    { id: 'crianca',  label: 'Crianças',  emoji: '🧒', color: '#8B5CF6' },
    { id: 'idoso',    label: 'Idosos',    emoji: '👴', color: '#3B82F6' },
    { id: 'pet',      label: 'Pets',      emoji: '🐾', color: '#F59E0B' },
    { id: 'pcd',      label: 'PCD',       emoji: '♿', color: '#0EA5E9' },
    { id: 'gestante', label: 'Gestantes', emoji: '🤰', color: '#F43F5E' },
];

export default function AcessoriosSegurancaScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';

    const [selectedProfile, setSelectedProfile] = useState('todos');

    const profileColor = PROFILE_TABS.find(p => p.id === selectedProfile)?.color || THEME_COLOR;

    // Filtra as 13 categorias pelo perfil selecionado.
    // 'todos' = mostra tudo. Caso contrario, item.paraMoradores deve conter
    // o profile selecionado OU o item ter 'todos' em paraMoradores.
    const filteredCategories = useMemo(() => {
        const all = ACESSORIOS_SEGURANCA.categorias || [];
        if (selectedProfile === 'todos') return all;
        return all.filter(cat => {
            const para = cat.paraMoradores || [];
            return para.includes(selectedProfile) || para.includes('todos');
        });
    }, [selectedProfile]);

    const handlePress = (cat) => {
        // ConceitoDetail ja le imagemUrl como hero (Lote 7k).
        // Mapeia os campos do data de acessorios para o que o detail espera.
        navigation.navigate('ConceitoDetail', {
            conceito: {
                ...cat,
                nome: cat.titulo,
                descricao: cat.descricao,
                iconColor: profileColor,
                // Tipos vira "como_identificar" pra renderizar como lista
                comoIdentificar: cat.tipos ? cat.tipos.map(t => t.nome || JSON.stringify(t)) : null,
                // onde / ondeInstalar viram "ondeEncontrada"
                ondeEncontrada: cat.onde || cat.ondeInstalar || null,
                // instalacao e importante viram parte da importancia (precos removidos)
                importancia: [cat.instalacao, cat.importante]
                    .filter(Boolean)
                    .join('\n\n'),
            },
        });
    };

    const renderProfileTab = (tab) => {
        const isSelected = selectedProfile === tab.id;
        return (
            <TouchableOpacity
                key={tab.id}
                style={[
                    styles.profileTab,
                    {
                        backgroundColor: isSelected ? tab.color + '20' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)'),
                        borderColor: isSelected ? tab.color : 'transparent',
                    }
                ]}
                onPress={() => setSelectedProfile(tab.id)}
                activeOpacity={0.7}
            >
                <Text style={{ fontSize: 16 }}>{tab.emoji}</Text>
                <Text style={[
                    styles.profileTabText,
                    { color: isSelected ? tab.color : textMuted, fontWeight: isSelected ? '700' : '500' }
                ]}>
                    {tab.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header padronizado */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: THEME_COLOR + '20' }]}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <ArrowLeft size={22} color={THEME_COLOR} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerEmoji}>🔐</Text>
                        <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">
                            {t('headersFirst.acessRiosDeSeguranA', 'Acessórios de Segurança')}
                        </Text>
                        <Text style={[styles.headerSubtitle, { color: textBody }]}>
                            {t('headersFirst.proteOPersonalizadaParaCadaPerfil', 'Proteção personalizada para cada perfil')}
                        </Text>
                    </View>
                </View>

                {/* Tabs horizontais por perfil */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContainer}
                    style={{ flexGrow: 0 }}
                >
                    {PROFILE_TABS.map(renderProfileTab)}
                </ScrollView>

                <ScrollView
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                📋 {filteredCategories.length} {filteredCategories.length === 1 ? 'acessório' : 'acessórios'} • Toque para ver detalhes
                            </Text>
                        </View>
                    </FadeInView>

                    {filteredCategories.length === 0 ? (
                        <View style={styles.emptyState}>
                            <NeoIcon name="Setting2" size={48} color={themeColors.neutral[300]} />
                            <Text style={[styles.emptyText, { color: textMuted }]}>
                                Nenhum acessório recomendado para este perfil.
                            </Text>
                        </View>
                    ) : filteredCategories.map((cat, idx) => (
                        <FadeInView key={cat.id} delay={150 + idx * 50}>
                            <TouchableOpacity
                                onPress={() => handlePress(cat)}
                                activeOpacity={0.8}
                                style={{ marginBottom: 16 }}
                            >
                                <View style={styles.guideCardOuter}>
                                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                        <View style={[styles.guideImageContainer, { backgroundColor: profileColor + '15' }]}>
                                            {(cat.imagem || cat.imagemUrl) ? (
                                                <ReviewImage
                                                    source={cat.imagem || { uri: cat.imagemUrl }}
                                                    tint={profileColor}
                                                    accessibilityLabel={cat.titulo}
                                                />
                                            ) : (
                                                <NeoIcon name="ShieldTick" size={48} color={profileColor} variant="Bold" />
                                            )}
                                        </View>
                                        <View style={styles.guideContent}>
                                            <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={2}>{cat.titulo}</Text>
                                            <View style={{ flex: 1 }} />
                                            <Text style={[styles.guideDesc, { color: textBody }]} numberOfLines={3}>{cat.descricao || 'Toque para ver tipos e instalação.'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </FadeInView>
                    ))}

                    <View style={{ height: 140 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        alignItems: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerEmoji: {
        fontSize: 40,
        marginBottom: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },

    tabsContainer: {
        paddingHorizontal: 16,
        gap: 8,
        paddingVertical: 8,
        paddingBottom: 12,
    },
    profileTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        borderWidth: 1.5,
    },
    profileTabText: {
        fontSize: 13,
    },

    listContent: {
        paddingHorizontal: 16,
    },
    infoBar: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // Card grande estilo Plantas/Animais (imagem retangular a esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 130,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 130,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
    },
    guideDesc: {
        fontSize: 12,
        lineHeight: 16,
        marginBottom: 4,
    },
    priceText: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 2,
    },

    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
    },
});
