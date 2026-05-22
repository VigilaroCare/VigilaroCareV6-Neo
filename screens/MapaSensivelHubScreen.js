// screens/MapaSensivelHubScreen.js
//
// Hub "Seu mapa sensível" — fase ATUALIZAR do ciclo de 5 fases.
// Acessado via Menu, oferece o caminho explícito pro usuário revisitar
// o briefing depois que ele "termina" o onboarding. Princípio do
// documento: vidas humanas são dinâmicas (nasce, morre, casa, descasa,
// sai estudar fora) — mapa precisa ser revisitável sem parecer retrabalho.
//
// 4 caminhos:
// 1. Moradores — editar/adicionar/remover perfis (QuemProteger)
// 2. Ambientes — revisar cômodos da casa (NewHomeWizard com fast-track)
// 3. Tipo de imóvel — revisar tipo + andares
// 4. Refazer mapeamento — reabre o wizard pré-preenchido na phase 0

import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';

import NeoCard from '../components/NeoCard';
import NeoIcon from '../components/NeoIcon';
import { H1, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import RiskInterpreterService from '../services/RiskInterpreterService';
import BriefingDraftService from '../services/BriefingDraftService';
import ProfileService from '../services/ProfileService';

export default function MapaSensivelHubScreen() {
    const navigation = useNavigation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];

    const [contexto, setContexto] = useState(null);
    const [hasDraft, setHasDraft] = useState(false);
    const [moradiaInfo, setMoradiaInfo] = useState(null);

    const loadData = useCallback(async () => {
        try {
            const [interpretation, draftExists, moradia, mapping] = await Promise.all([
                RiskInterpreterService.interpret(),
                BriefingDraftService.hasDraft(),
                ProfileService.getMoradia(),
                ProfileService.getMapping(),
            ]);
            setContexto(interpretation?.contexto || null);
            setHasDraft(draftExists);
            setMoradiaInfo({
                tipo: moradia?.tipoImovel || '—',
                andares: moradia?.andares || 1,
                ambientes: Array.isArray(mapping) ? mapping.length : 0,
            });
        } catch (_) { /* silent */ }
    }, []);

    useFocusEffect(useCallback(() => { loadData(); }, [loadData]));

    const navigateWithHaptic = (route, params) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        navigation.navigate(route, params);
    };

    const handleRefazer = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        navigation.navigate('NewHomeWizard');
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>Seu mapa sensível</H1>
                        <Caption style={[s.subtitle, { color: textSecondary }]}>
                            Casas mudam, pessoas mudam. Atualize quando precisar.
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }}
                >
                    {/* RESUMO contextual */}
                    {contexto && contexto.totalPerfis > 0 && (
                        <NeoCard variant="elevated" style={s.summaryCard}>
                            <View style={s.summaryIconWrap}>
                                <NeoIcon name="Home2" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[s.summaryTitle, { color: textPrimary }]}>
                                    {contexto.humanos} morador{contexto.humanos !== 1 ? 'es' : ''}
                                    {contexto.pets > 0 ? ` · ${contexto.pets} pet${contexto.pets > 1 ? 's' : ''}` : ''}
                                </Text>
                                {moradiaInfo && (
                                    <Text style={[s.summaryDesc, { color: textSecondary }]}>
                                        {moradiaInfo.tipo} · {moradiaInfo.andares} andar{moradiaInfo.andares > 1 ? 'es' : ''} · {moradiaInfo.ambientes} ambiente{moradiaInfo.ambientes !== 1 ? 's' : ''}
                                    </Text>
                                )}
                            </View>
                        </NeoCard>
                    )}

                    {/* DRAFT pendente — destaque se houver */}
                    {hasDraft && (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleRefazer}
                            style={{ marginBottom: 14 }}
                        >
                            <NeoCard variant="elevated" style={[s.draftCard, { borderLeftColor: '#F59E0B' }]}>
                                <View style={[s.cardIcon, { backgroundColor: 'rgba(245,158,11,0.18)' }]}>
                                    <NeoIcon name="Clock" size={22} color="#F59E0B" variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Body style={[s.cardTitle, { color: textPrimary }]}>
                                        Mapeamento em andamento
                                    </Body>
                                    <Small style={[s.cardDesc, { color: textSecondary }]}>
                                        Você pausou no meio. Continue de onde parou.
                                    </Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                            </NeoCard>
                        </TouchableOpacity>
                    )}

                    {/* SECTION LABEL */}
                    <Text
                        style={[s.sectionLabel, { color: textSecondary }]}
                        accessibilityRole="header"
                    >
                        EDITAR PEDAÇOS
                    </Text>

                    {/* MORADORES */}
                    <TouchableOpacity activeOpacity={0.85} onPress={() => navigateWithHaptic('MainTabs', { screen: 'Perfil' })}>
                        <NeoCard variant="elevated" style={s.actionCard}>
                            <View style={[s.cardIcon, { backgroundColor: 'rgba(16,185,129,0.18)' }]}>
                                <NeoIcon name="ProfileCircle" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={[s.cardTitle, { color: textPrimary }]}>Moradores</Body>
                                <Small style={[s.cardDesc, { color: textSecondary }]}>
                                    Adicionar, editar ou remover pessoas e pets.
                                </Small>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* AMBIENTES */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleRefazer}>
                        <NeoCard variant="elevated" style={s.actionCard}>
                            <View style={[s.cardIcon, { backgroundColor: 'rgba(14,165,233,0.18)' }]}>
                                <NeoIcon name="Grid2" size={22} color="#0EA5E9" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={[s.cardTitle, { color: textPrimary }]}>Ambientes da casa</Body>
                                <Small style={[s.cardDesc, { color: textSecondary }]}>
                                    Marcar novos cômodos, remover os que não usa mais.
                                </Small>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* TIPO DE IMÓVEL */}
                    <TouchableOpacity activeOpacity={0.85} onPress={handleRefazer}>
                        <NeoCard variant="elevated" style={s.actionCard}>
                            <View style={[s.cardIcon, { backgroundColor: 'rgba(99,102,241,0.18)' }]}>
                                <NeoIcon name="Home2" size={22} color="#6366F1" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={[s.cardTitle, { color: textPrimary }]}>Tipo e estrutura</Body>
                                <Small style={[s.cardDesc, { color: textSecondary }]}>
                                    Mudou de casa? Reformou? Atualize aqui.
                                </Small>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* DIVISOR + REFAZER */}
                    <View style={s.divider} />

                    <Text
                        style={[s.sectionLabel, { color: textSecondary, marginTop: 8 }]}
                        accessibilityRole="header"
                    >
                        REVISÃO COMPLETA
                    </Text>

                    <TouchableOpacity activeOpacity={0.85} onPress={handleRefazer}>
                        <NeoCard variant="elevated" style={s.actionCard}>
                            <View style={[s.cardIcon, { backgroundColor: 'rgba(239,68,68,0.18)' }]}>
                                <NeoIcon name="Refresh" size={22} color="#EF4444" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={[s.cardTitle, { color: textPrimary }]}>Refazer mapeamento</Body>
                                <Small style={[s.cardDesc, { color: textSecondary }]}>
                                    Recomeça o wizard com seus dados pré-preenchidos. Você revê cada passo.
                                </Small>
                            </View>
                            <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                        </NeoCard>
                    </TouchableOpacity>

                    {/* RODAPÉ — princípio do briefing vivo */}
                    <Caption style={[s.footnote, { color: themeColors.neutral[500] }]}>
                        O mapa é vivo. Pode mexer quando quiser — não é retrabalho, é cuidado.
                    </Caption>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
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
        lineHeight: 17,
    },

    // Summary card
    summaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 18,
        borderRadius: 18,
    },
    summaryIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(16,185,129,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    summaryTitle: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 2,
    },
    summaryDesc: {
        fontSize: 12,
        lineHeight: 17,
    },

    // Section label
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Draft card
    draftCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        borderLeftWidth: 4,
    },

    // Action card
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        marginBottom: 10,
        borderRadius: 16,
    },
    cardIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '800',
        marginBottom: 2,
    },
    cardDesc: {
        lineHeight: 17,
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.08)',
        marginTop: 14,
        marginBottom: 14,
    },

    footnote: {
        textAlign: 'center',
        marginTop: 18,
        fontSize: 12,
        lineHeight: 17,
        fontStyle: 'italic',
    },
});
