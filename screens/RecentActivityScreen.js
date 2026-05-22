import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { H1, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import ActivityLogService from '../services/ActivityLogService';

const ActivityItem = ({ item }) => {
    const iconName = item.icon || 'Activity';
    const iconColor = item.color || Neo.colors.primary[500];
    const timeAgo = ActivityLogService.getTimeAgo(item.timestamp);

    return (
        <NeoCard variant="elevated" style={s.itemCard}>
            <View style={[s.iconCircle, { backgroundColor: iconColor + '33' }]}>
                <NeoIcon name={iconName} size={22} color={iconColor} variant="Bold" />
            </View>
            <View style={s.textCol}>
                <Body style={s.itemTitle} numberOfLines={2}>{item.title}</Body>
                {!!item.description && (
                    <Small style={s.itemDesc} numberOfLines={2}>{item.description}</Small>
                )}
                <Caption style={s.timestamp}>{timeAgo}</Caption>
            </View>
        </NeoCard>
    );
};

export default function RecentActivityScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadActivities = useCallback(async () => {
        setLoading(true);
        const fetched = await ActivityLogService.getActivities();
        setActivities(fetched);
        setLoading(false);
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadActivities();
        setRefreshing(false);
    }, [loadActivities]);

    useEffect(() => {
        loadActivities();
        const unsubscribe = ActivityLogService.onActivityLogged(() => loadActivities());
        return () => unsubscribe();
    }, [loadActivities]);

    const isEmpty = !loading && activities.length === 0;

    // Detecta se há logs de queda — usados pra mostrar CTA contextual
    // de "Ajustar sensibilidade" no rodapé da lista.
    // Aceita tanto o campo `category` (logs novos) quanto título contendo
    // "queda" (compatibilidade com logs gravados antes do fix de category).
    const hasFallLogs = useMemo(
        () =>
            activities.some(
                (a) =>
                    a.category === 'fall' ||
                    (a.title || '').toLowerCase().includes('queda')
            ),
        [activities]
    );

    // Footer condicional — só aparece quando há eventos de queda no histórico.
    // Tom calmo, sem alarmismo. Caminho direto pra reduzir sensibilidade.
    const renderListFooter = () => {
        if (!hasFallLogs) return null;
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('FallSensitivity')}
                activeOpacity={0.7}
                style={s.footerLink}
                accessibilityRole="link"
                accessibilityLabel={t(
                    'recentActivity.adjustSensitivity',
                    'Vendo muitos eventos de queda? Ajuste a sensibilidade'
                )}
            >
                <View style={s.footerIconWrap}>
                    <NeoIcon name="Activity" size={18} color={Neo.colors.primary[600]} variant="Bold" />
                </View>
                <Small style={s.footerText}>
                    {t(
                        'recentActivity.adjustSensitivity',
                        'Vendo muitos eventos de queda? Ajuste a sensibilidade'
                    )}
                </Small>
                <NeoIcon name="ArrowRight2" size={16} color={Neo.colors.primary[600]} />
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER consistente com Accessibility/Reports */}
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
                            {t('headersFirst.atividadeRecente', 'Atividade recente')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('recentActivity.subtitle', 'Histórico de eventos do app')}
                        </Caption>
                    </View>
                </View>

                {loading && activities.length === 0 ? (
                    <View style={s.centered}>
                        <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
                        <Caption style={{ marginTop: 12, color: Neo.colors.neutral[500] }}>
                            {t('headersFirst.carregandoAtividades', 'Carregando atividades…')}
                        </Caption>
                    </View>
                ) : isEmpty ? (
                    <View style={s.centered}>
                        <View style={s.emptyIconCircle}>
                            <NeoIcon name="Activity" size={36} color={Neo.colors.primary[600]} variant="Bulk" />
                        </View>
                        <H3 style={s.emptyTitle}>
                            {t('headersFirst.nenhumaAtividadeRecente', 'Nenhuma atividade recente')}
                        </H3>
                        <Body style={s.emptyDesc}>
                            {t('headersFirst.comeceAUsarOVigilaroParaVerSeuHistRicoAq', 'Comece a usar o Vigilaro para ver seu histórico aqui.')}
                        </Body>
                    </View>
                ) : (
                    <FlatList
                        data={activities}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        renderItem={({ item }) => <ActivityItem item={item} />}
                        ListFooterComponent={renderListFooter}
                        contentContainerStyle={s.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={Neo.colors.primary[500]}
                            />
                        }
                    />
                )}
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

    // List
    listContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190, // SOS clearance
    },

    // Activity item card
    itemCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 14,
        marginBottom: 10,
        borderRadius: 16,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textCol: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        marginBottom: 3,
    },
    itemDesc: {
        color: Neo.colors.neutral[700],
        marginBottom: 4,
        lineHeight: 18,
    },
    timestamp: {
        color: Neo.colors.neutral[500],
    },

    // Loading / empty
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 120,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(16,185,129,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    emptyTitle: {
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyDesc: {
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 280,
    },

    // Footer link contextual — só aparece quando há logs de queda.
    // Discreto, sem chamar atenção desnecessária, mas claramente clicável.
    footerLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(16,185,129,0.10)',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginTop: 8,
        gap: 8,
    },
    footerIconWrap: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(16,185,129,0.20)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        flex: 1,
        color: Neo.colors.primary[700],
        fontWeight: '600',
        fontSize: 13,
        lineHeight: 18,
    },
});
