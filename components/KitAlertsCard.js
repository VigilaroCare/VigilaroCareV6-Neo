/**
 * KitAlertsCard.js
 * Componente para exibir alertas de kits na Home
 * Vigilaro Care V5
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import NeoIcon from './NeoIcon';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import KitAlertService from '../services/KitAlertService';

export default function KitAlertsCard() {
    const navigation = useNavigation();
    const [alerts, setAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        try {
            await KitAlertService.init();
            const activeAlerts = await KitAlertService.getActiveAlerts();
            setAlerts(activeAlerts);
        } catch (error) {
            console.error('Error loading alerts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAlertPress = (alert) => {
        if (alert.route) {
            navigation.navigate(alert.route);
        }
    };

    const handleDismiss = async (alertId) => {
        await KitAlertService.dismissAlert(alertId);
        setAlerts(alerts.filter(a => a.id !== alertId));
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#F44336';
            case 'medium': return '#FF9800';
            case 'low': return '#4CAF50';
            default: return Colors.primary;
        }
    };

    const getPriorityBg = (priority) => {
        switch (priority) {
            case 'high': return '#FFEBEE';
            case 'medium': return '#FFF3E0';
            case 'low': return '#E8F5E9';
            default: return '#E3F2FD';
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color={Colors.primary} />
            </View>
        );
    }

    if (alerts.length === 0) {
        return null; // Não mostrar nada se não tiver alertas
    }

    const visibleAlerts = isExpanded ? alerts : alerts.slice(0, 2);
    const hasMore = alerts.length > 2;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{alerts.length}</Text>
                    </View>
                    <Text style={styles.title}>Alertas de Segurança</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('KitsHub')}>
                    <Text style={styles.viewAll}>Ver Kits</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.alertsList}>
                {visibleAlerts.map((alert) => (
                    <TouchableOpacity
                        key={alert.id}
                        style={[styles.alertCard, { backgroundColor: getPriorityBg(alert.priority) }]}
                        onPress={() => handleAlertPress(alert)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.alertIcon, { backgroundColor: getPriorityColor(alert.priority) }]}>
                            <NeoIcon name={alert.icon} size={18} color="#FFF" />
                        </View>
                        <View style={styles.alertContent}>
                            <Text style={styles.alertTitle}>{alert.title}</Text>
                            <Text style={styles.alertMessage} numberOfLines={2}>{alert.message}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dismissBtn}
                            onPress={() => handleDismiss(alert.id)}
                        >
                            <NeoIcon name="CloseSquare" size={18} color={Colors.textTertiary} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </View>

            {hasMore && (
                <TouchableOpacity
                    style={styles.expandBtn}
                    onPress={() => setIsExpanded(!isExpanded)}
                >
                    <Text style={styles.expandText}>
                        {isExpanded ? 'Mostrar menos' : `Ver mais ${alerts.length - 2} alertas`}
                    </Text>
                    <NeoIcon
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={Colors.primary}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.lg,
        marginBottom: Spacing.lg,
        ...Shadows.sm,
    },
    loadingContainer: {
        padding: Spacing.lg,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: Colors.error,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        fontSize: Typography.sizes.md,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
    },
    viewAll: {
        fontSize: Typography.sizes.sm,
        color: Colors.primary,
        fontWeight: '600',
    },
    alertsList: {
        gap: Spacing.sm,
    },
    alertCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
    },
    alertIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: Typography.sizes.sm,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginBottom: 2,
    },
    alertMessage: {
        fontSize: Typography.sizes.xs,
        color: Colors.textSecondary,
        lineHeight: 16,
    },
    dismissBtn: {
        padding: Spacing.xs,
    },
    expandBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Spacing.md,
        gap: Spacing.xs,
    },
    expandText: {
        fontSize: Typography.sizes.sm,
        color: Colors.primary,
        fontWeight: '600',
    },
});
