// screens/RecentActivityScreen.js
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import { H3, Body, Small } from '../components/NeoTypography';
import ActivityLogService from '../services/ActivityLogService';

const ActivityItem = ({ item }) => {
    const iconName = item.icon || 'Activity'; // Ícone padrão
    const iconColor = item.color || Neo.colors.primary[500];
    const timeAgo = ActivityLogService.getTimeAgo(item.timestamp);

    return (
        <View style={itemStyles.itemContainer}>
            <View style={[itemStyles.iconCircle, { backgroundColor: iconColor + '20' }]}>
                <NeoIcon name={iconName} size={24} color={iconColor} variant="Bulk" />
            </View>
            <View style={itemStyles.textContainer}>
                <Body style={itemStyles.title}>{item.title}</Body>
                <Small style={itemStyles.description}>{item.description}</Small>
                <Small style={itemStyles.timestamp}>{timeAgo}</Small>
            </View>
        </View>
    );
};

export default function RecentActivityScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadActivities = useCallback(async () => {
        setLoading(true);
        const fetchedActivities = await ActivityLogService.getActivities();
        setActivities(fetchedActivities);
        setLoading(false);
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadActivities();
        setRefreshing(false);
    }, [loadActivities]);

    useEffect(() => {
        loadActivities();
        const unsubscribe = ActivityLogService.onActivityLogged(() => {
            loadActivities();
        });
        return () => unsubscribe();
    }, [loadActivities]);

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H3 style={styles.headerTitle}>{t('headersFirst.atividadeRecente', 'Atividade Recente')}</H3>
                    <View style={{ width: 44 }} /> {/* Espaçador */}
                </View>

                {loading && activities.length === 0 ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
                        <Text style={styles.loadingText}>{t('headersFirst.carregandoAtividades', 'Carregando atividades...')}</Text>
                    </View>
                ) : activities.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <NeoIcon name="Activity" size={64} color={Neo.colors.neutral[400]} />
                        <H3 style={styles.emptyTitle}>{t('headersFirst.nenhumaAtividadeRecente', 'Nenhuma atividade recente')}</H3>
                        <Body style={styles.emptyText}>{t('headersFirst.comeceAUsarOVigilaroParaVerSeuHistRicoAq', 'Comece a usar o Vigilaro para ver seu histórico aqui.')}</Body>
                    </View>
                ) : (
                    <FlatList
                        data={activities}
                        keyExtractor={(item, index) => item.id || index.toString()}
                        renderItem={({ item }) => <ActivityItem item={item} />}
                        contentContainerStyle={styles.listContent}
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

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Neo.spacing.md,
        paddingTop: Neo.spacing.sm,
        paddingBottom: Neo.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Neo.colors.neutral[50],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Neo.colors.neutral[100],
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
    },
    listContent: {
        paddingHorizontal: Neo.spacing.md,
        paddingVertical: Neo.spacing.lg,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Neo.colors.neutral[500],
        fontSize: 16,
        marginTop: Neo.spacing.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Neo.spacing.lg,
        marginTop: Neo.spacing.xxl,
    },
    emptyTitle: {
        color: Neo.colors.neutral[600],
        marginTop: Neo.spacing.md,
        marginBottom: Neo.spacing.sm,
    },
    emptyText: {
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        lineHeight: 22,
    },
});

const itemStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Neo.colors.white,
        borderRadius: Neo.borderRadius.lg,
        padding: Neo.spacing.md,
        marginBottom: Neo.spacing.md,
        ...Neo.shadows.sm,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[100],
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Neo.spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Neo.colors.neutral[800],
        marginBottom: Neo.spacing.xs,
    },
    description: {
        fontSize: 14,
        color: Neo.colors.neutral[600],
        marginBottom: Neo.spacing.xs,
    },
    timestamp: {
        fontSize: 12,
        color: Neo.colors.neutral[400],
    },
});