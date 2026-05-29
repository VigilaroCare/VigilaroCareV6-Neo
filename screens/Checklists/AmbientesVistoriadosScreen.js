/**
 * AmbientesVistoriadosScreen.js
 * Tela de segundo nível que lista todos os ambientes mapeados da residência ativa
 * e fornece acesso ao Mapa de Calor.
 */
import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import { isAreaRelevant, getRoomChecklistStructure } from '../../utils/ProfileFilterEngine';
import { AMBIENTES } from '../../data/mapeamento_dados';

import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const C = Neo.colors;

const getStatusStyle = (status) => {
    if (status === 'Seguro')   return { bg: 'rgba(46,125,50,0.12)',   color: '#2E7D32' };
    if (status === 'Pendente') return { bg: 'rgba(120,120,128,0.12)', color: '#636366' };
    if (status === 'Atenção')  return { bg: 'rgba(245,158,11,0.14)',  color: '#B45309' };
    if (status === 'Risco')    return { bg: 'rgba(229,57,53,0.12)',   color: '#D32F2F' };
    return { bg: 'rgba(0,0,0,0.05)', color: '#757575' };
};

export default function AmbientesVistoriadosScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);

    const textPrimary = isDark ? themeColors.neutral[900] : Neo.colors.neutral[900];
    const textSecondary = isDark ? themeColors.neutral[700] : Neo.colors.neutral[700];

    const loadData = async () => {
        try {
            setLoading(true);
            const mapping = (await ProfileService.getMapping()) || [];
            const moradia = (await ProfileService.getMoradia()) || {};
            const profilesData = await ProfileService.getPerfis();
            const profiles = Array.isArray(profilesData) ? profilesData : [];

            const activeId = await ProfileService.getActiveResidenceId();
            const checklistState = await ChecklistService.getAllState(activeId);

            const relevantAreas = AMBIENTES.filter(
                (area) => isAreaRelevant(area, moradia, profiles, mapping) && !area.id.includes('kit')
            );

            const COLORS = [
                Neo.colors.primary[500],
                Neo.colors.secondary[500],
                Neo.colors.feedback.warning,
                '#AB47BC', '#7E57C2', '#42A5F5', '#26C6DA', '#66BB6A', '#FFCA28',
            ];

            const finalData = relevantAreas.map((area, index) => {
                const areaData = checklistState[area.id] || {};
                const structure = getRoomChecklistStructure(area.id, profiles, moradia, mapping);
                const stats = ChecklistService.getAreaStats(
                    area.id, areaData, structure, profiles, moradia, mapping
                );

                let fullName = t_field(area, 'nome');
                if (area.id === 'sala' && mapping.includes('sala_estar') && mapping.includes('sala_jantar')) {
                    fullName = t('reports.integratedLivingDining', 'Sala de Estar/Jantar (Integradas)');
                }

                return {
                    key: area.id,
                    fullName: fullName,
                    emoji: area.emoji,
                    iconName: area.iconName,
                    total: stats.total,
                    checked: stats.checked,
                    percent: stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0,
                    color: area.cor || COLORS[index % COLORS.length],
                };
            });

            setChartData(finalData);
        } catch (e) {
            if (__DEV__) console.error('[AmbientesVistoriadosScreen.loadData] erro:', e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>{t('reports.environmentInspection', 'Ambientes')}</H1>
                        <Caption style={s.subtitle}>
                            Veja o status de vistorias de cada cômodo.
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color={Neo.colors.primary[500]} style={{ marginTop: 60 }} />
                    ) : (
                        <>
                            {/* Card do Mapa de Calor (Migrado do Hub) */}
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('MapaDeCalor')}
                                style={{ marginBottom: 20 }}
                            >
                                <NeoCard variant="elevated" style={s.heatmapCard}>
                                    <View style={[s.heatmapIconWrap, { backgroundColor: 'rgba(220,38,38,0.18)' }]}>
                                        <NeoIcon name="Map1" size={24} color="#DC2626" variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Body style={[s.heatmapTitle, { color: textPrimary }]}>
                                            Mapa de Calor
                                        </Body>
                                        <Small style={[s.heatmapSub, { color: textSecondary }]}>
                                            Veja visualmente os riscos de cada ambiente em gradiente.
                                        </Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[400]} />
                                </NeoCard>
                            </TouchableOpacity>

                            {/* Grid de Ambientes */}
                            <View style={s.grid}>
                                {chartData.map((area) => {
                                    const statusKey = area.percent === 100 && area.total > 0
                                        ? 'Seguro'
                                        : area.checked === 0 ? 'Pendente'
                                        : area.percent >= 70 ? 'Atenção' : 'Risco';
                                    const statusStyle = getStatusStyle(statusKey);
                                    let statusLabel = statusKey;
                                    if (statusKey === 'Seguro')   statusLabel = t('reports.statusSafe', 'Seguro');
                                    if (statusKey === 'Pendente') statusLabel = t('reports.statusPending', 'Pendente');
                                    if (statusKey === 'Atenção')  statusLabel = t('reports.statusAttention', 'Atenção');
                                    if (statusKey === 'Risco')    statusLabel = t('reports.statusRisk', 'Risco');

                                    return (
                                        <TouchableOpacity
                                            key={area.key}
                                            activeOpacity={0.85}
                                            style={s.gridCell}
                                            onPress={() => navigation.navigate('ChecklistDetail', {
                                                roomId: area.key,
                                                roomName: area.fullName,
                                                roomColor: area.color,
                                                roomIcon: area.emoji,
                                                fullChecklist: false,
                                            })}
                                        >
                                            <NeoCard variant="elevated" style={s.roomCard}>
                                                <View style={[s.roomIconCircle, { backgroundColor: area.color + '26' }]}>
                                                    {area.iconName ? (
                                                        <NeoIcon name={area.iconName} size={22} color={area.color} variant="Bold" />
                                                    ) : (
                                                        <Text style={{ fontSize: 22 }}>{area.emoji}</Text>
                                                    )}
                                                </View>
                                                <Body style={s.roomLabel} numberOfLines={2}>
                                                    {area.fullName}
                                                </Body>
                                                <View style={[s.statusPill, { backgroundColor: statusStyle.bg }]}>
                                                    <Small style={[s.statusText, { color: statusStyle.color }]} numberOfLines={1}>
                                                        {statusLabel}
                                                    </Small>
                                                </View>
                                            </NeoCard>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </>
                    )}
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
        paddingTop: 8,
        paddingBottom: 16,
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
        color: Neo.colors.neutral[600],
    },
    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 120,
    },
    heatmapCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    heatmapIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    heatmapTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 2,
    },
    heatmapSub: {
        lineHeight: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    gridCell: {
        width: '48%',
    },
    roomCard: {
        padding: 14,
        borderRadius: 16,
        alignItems: 'center',
        minHeight: 130,
        justifyContent: 'space-between',
        flex: 1,
    },
    roomIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    roomLabel: {
        fontSize: 13,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 17,
    },
    statusPill: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
    },
});
