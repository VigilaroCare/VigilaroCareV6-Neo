import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NeoIcon from '../../components/NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import { AMBIENTES, CHECKLISTS } from '../../data/mapeamento_dados';
import { isAreaRelevant } from '../../utils/ProfileFilterEngine';
import SafetyReportService from '../../services/SafetyReportService';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import AppBackground from '../../components/AppBackground';


export default function SafetyActionPlanScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [stats, setStats] = useState({ risk: 0, pending: 0, safe: 0 });

    // Initial Load & Refresh
    useFocusEffect(
        useCallback(() => {
            loadActionPlan();
        }, [])
    );

    const loadActionPlan = async () => {
        setLoading(true);
        try {
            // 1. Get Profile Context to Filter Areas
            const mapping = await ProfileService.getMapping() || [];
            const moradia = await ProfileService.getMoradia() || {};
            const profiles = await ProfileService.getPerfis() || [];

            // 2. Get All Checklist State (isolado por residência ativa)
            const activeResId = await ProfileService.getActiveResidenceId();
            const allState = await ChecklistService.getAllState(activeResId);

            let visibleItems = [];
            let rCount = 0;
            let pCount = 0;
            let sCount = 0;

            // 3. Iterate Definitions with smart filtering
            AMBIENTES.forEach(area => {
                // Relevance Check via ProfileFilterEngine
                if (!isAreaRelevant(area, moradia, profiles, mapping)) return;

                // Flatten Items for this Area
                const structure = CHECKLISTS[area.id];
                let areaItemsDef = [];
                if (structure && structure.categorias) {
                    structure.categorias.forEach(cat => areaItemsDef = [...areaItemsDef, ...cat.itens]);
                } else {
                    areaItemsDef = area.itens || area.oQueFazer || [];
                }

                // Get Answered State for this Area
                const areaState = allState[area.id] || []; // Expected Array

                areaItemsDef.forEach(itemDef => {
                    // Find saved state
                    let status = null; // null = Pending
                    const found = Array.isArray(areaState) ? areaState.find(i => i.text === itemDef.titulo) : null;

                    if (found) {
                        status = found.status; // 'conforme', 'risco', 'na'
                    }

                    // Categorize
                    if (status === 'risco') {
                        rCount++;
                    } else if (status === 'conforme' || status === 'na') {
                        sCount++;
                    } else {
                        status = 'pendente';
                        pCount++;
                    }

                    // Build View Item
                    visibleItems.push({
                        id: `${area.id}_${itemDef.titulo}`,
                        areaId: area.id,
                        areaName: t_field(area, 'nome'),
                        areaColor: area.cor,
                        text: t_field(itemDef, 'titulo'),
                        originalText: itemDef.titulo,
                        type: itemDef.tipo,
                        status: status, // 'conforme', 'risco', 'na', 'pendente'
                        originalState: found
                    });
                });
            });

            // Sort: Risks First, then Pending, then Safe
            visibleItems.sort((a, b) => {
                const mapStatus = (s) => {
                    if (s === 'risco') return 0;
                    if (s === 'pendente') return 1;
                    return 2;
                };
                return mapStatus(a.status) - mapStatus(b.status);
            });

            setItems(visibleItems);
            setStats({ risk: rCount, pending: pCount, safe: sCount });

        } catch (error) {
            console.error(error);
            Alert.alert(t('actionPlan.error'), t('actionPlan.loadError'));
        } finally {
            setLoading(false);
        }
    };

    const handleSetStatus = async (item, newStatus) => {
        // Optimistic Update
        const nextStatus = item.status === newStatus ? 'pendente' : newStatus;

        const updatedItems = items.map(i => {
            if (i.id === item.id) {
                return { ...i, status: nextStatus };
            }
            return i;
        });

        setItems(updatedItems);

        // Update Stats (Local calc for speed)
        setStats(prev => {
            const newStats = { ...prev };

            // Remove old
            if (item.status === 'risco') newStats.risk--;
            else if (item.status === 'pendente') newStats.pending--;
            else if (item.status === 'conforme' || item.status === 'na') newStats.safe--;

            // Add new
            if (nextStatus === 'risco') newStats.risk++;
            else if (nextStatus === 'pendente') newStats.pending++;
            else if (nextStatus === 'conforme' || nextStatus === 'na') newStats.safe++;

            return newStats;
        });

        // Persist via ChecklistService (isolado por residência)
        try {
            const activeResId = await ProfileService.getActiveResidenceId();
            const allState = await ChecklistService.getAllState(activeResId);

            let currentRoomList = allState[item.areaId] || [];
            if (!Array.isArray(currentRoomList)) currentRoomList = [];

            let finalStatus = nextStatus;
            if (nextStatus === 'pendente') finalStatus = null;

            const index = currentRoomList.findIndex(i => i.text === item.originalText);

            const newItemObj = {
                id: item.id,
                text: item.originalText,
                category: 'Geral',
                priority: item.type === 'perigo' ? 'high' : 'medium',
                status: finalStatus,
                checked: finalStatus === 'conforme' || finalStatus === 'na'
            };

            if (index >= 0) {
                currentRoomList[index] = newItemObj;
            } else {
                currentRoomList.push(newItemObj);
            }

            await ChecklistService.saveRoomState(item.areaId, currentRoomList, activeResId);

        } catch (e) {
            console.error(e);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>{t('actionPlan.title')}</Text>
                <Text style={styles.headerSubtitle}>{t('actionPlan.subtitle')}</Text>
            </View>
            <TouchableOpacity
                onPress={async () => {
                    try {
                        const profile = await ProfileService.getPerfilAtivo();
                        if (!profile) {
                            Alert.alert(t('actionPlan.error'), t('actionPlan.noProfile'));
                            return;
                        }
                        Alert.alert(
                            t('actionPlan.generateReport'),
                            t('actionPlan.generatePDFConfirm'),
                            [
                                { text: t('actionPlan.cancel'), style: 'cancel' },
                                { 
                                    text: t('actionPlan.generate'), 
                                    onPress: async () => {
                                        try {
                                            await SafetyReportService.generatePDFReport(profile.id);
                                        } catch (err) {
                                            Alert.alert(t('actionPlan.error'), t('actionPlan.pdfError') + err.message);
                                        }
                                    }
                                }
                            ]
                        );
                    } catch (e) {
                        console.error(e);
                    }
                }}
                style={{ padding: 8, backgroundColor: Neo.colors.primary[100], borderRadius: 8 }}
            >
                <NeoIcon name="DocumentText" size={20} color={Neo.colors.primary[600]} />
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <AppBackground>
        <SafeAreaView style={styles.container}>
                {renderHeader()}
                <View style={styles.centerLoading}>
                    <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
                </View>
            </SafeAreaView>
      </AppBackground>
        );
    }

    const displayList = items.filter(i => i.status !== 'conforme' && i.status !== 'na');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            {renderHeader()}

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Dashboard Summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View style={styles.summaryItem}>
                            <Text style={[styles.summaryValue, { color: Neo.colors.feedback.error }]}>
                                {stats.risk}
                            </Text>
                            <Text style={styles.summaryLabel}>{t('actionPlan.critical')}</Text>
                        </View>
                        <View style={[styles.summaryDivider]} />
                        <View style={styles.summaryItem}>
                            <Text style={[styles.summaryValue, { color: Neo.colors.neutral[500] }]}>
                                {stats.pending}
                            </Text>
                            <Text style={styles.summaryLabel}>{t('actionPlan.pending')}</Text>
                        </View>
                        <View style={[styles.summaryDivider]} />
                        <View style={styles.summaryItem}>
                            <Text style={[styles.summaryValue, { color: Neo.colors.feedback.success }]}>
                                {stats.safe}
                            </Text>
                            <Text style={styles.summaryLabel}>{t('actionPlan.resolved')}</Text>
                        </View>
                    </View>
                </View>

                {/* List Header */}
                <Text style={styles.sectionTitle}>
                    {displayList.length > 0 ? t('actionPlan.priorityItems') : t('actionPlan.allVerified')}
                </Text>

                {/* List Items */}
                {displayList.map((item, index) => (
                    <View key={item.id} style={styles.card}>
                        {/* Title & Info */}
                        <View style={styles.cardContent}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <View style={[styles.dot, { backgroundColor: item.areaColor || '#ccc' }]} />
                                <Text style={styles.areaLabel}>{item.areaName}</Text>
                                {item.status === 'risco' && (
                                    <View style={styles.riskBadge}>
                                        <Text style={styles.riskText}>{t('actionPlan.risk')}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.itemTitle}>{item.text}</Text>
                        </View>

                        {/* Actions (S / N / NA) */}
                        <View style={styles.actionRow}>
                            {/* Sim (Safe) */}
                            <TouchableOpacity
                                onPress={() => handleSetStatus(item, 'conforme')}
                                style={[
                                    styles.actionBtn,
                                    item.status === 'conforme' ? styles.btnSuccessActive : styles.btnSuccess
                                ]}
                            >
                                <Text style={[styles.btnText, item.status === 'conforme' ? { color: Neo.colors.neutral.white } : { color: '#166534' }]}>S</Text>
                            </TouchableOpacity>

                            {/* Não (Risk) */}
                            <TouchableOpacity
                                onPress={() => handleSetStatus(item, 'risco')}
                                style={[
                                    styles.actionBtn,
                                    item.status === 'risco' ? styles.btnErrorActive : styles.btnError
                                ]}
                            >
                                <Text style={[styles.btnText, item.status === 'risco' ? { color: Neo.colors.neutral.white } : { color: '#991B1B' }]}>N</Text>
                            </TouchableOpacity>

                            {/* NA */}
                            <TouchableOpacity
                                onPress={() => handleSetStatus(item, 'na')}
                                style={[
                                    styles.actionBtn,
                                    item.status === 'na' ? styles.btnNeutralActive : styles.btnNeutral
                                ]}
                            >
                                <Text style={[styles.btnText, { fontSize: 10 }, item.status === 'na' && { color: Neo.colors.neutral.white }]}>NA</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {displayList.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <NeoIcon name="TickCircle" size={64} color={Neo.colors.feedback.success} variant="Bold" />
                        <Text style={styles.emptyText}>{t('actionPlan.safeZone')}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={{ marginTop: 20 }}>
                            <Text style={{ color: Neo.colors.primary[500], fontWeight: 'bold' }}>{t('actionPlan.backHome')}</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    backButton: { marginRight: 16, padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: Neo.colors.neutral[900] },
    headerSubtitle: { fontSize: 14, color: Neo.colors.neutral[500] },
    centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scrollContent: { padding: 20 },
    summaryCard: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        ...Neo.shadows.sm,
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryItem: { alignItems: 'center', flex: 1 },
    summaryValue: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
    summaryLabel: { fontSize: 12, color: Neo.colors.neutral[500], textTransform: 'uppercase' },
    summaryDivider: { width: 1, height: '100%', backgroundColor: Neo.colors.neutral[200] },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16, color: Neo.colors.neutral[800] },
    card: {
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...Neo.shadows.sm,
    },
    cardContent: { flex: 1, marginRight: 12 },
    areaLabel: { fontSize: 12, color: Neo.colors.neutral[500] },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    itemTitle: { fontSize: 15, fontWeight: '600', color: Neo.colors.neutral[900], lineHeight: 20 },
    riskBadge: { marginLeft: 8, backgroundColor: Neo.colors.feedback.error + '15', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    riskText: { color: Neo.colors.feedback.error, fontSize: 10, fontWeight: 'bold' },

    // Action Buttons
    actionRow: { flexDirection: 'row', gap: 8 },
    actionBtn: {
        width: 36, height: 36, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center',
        backgroundColor: Neo.colors.neutral[200],
        borderWidth: 1, borderColor: Neo.colors.neutral[300]
    },
    btnText: { fontSize: 14, fontWeight: 'bold', color: Neo.colors.neutral[700] },

    btnSuccess: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
    btnSuccessActive: { backgroundColor: '#166534', borderColor: '#166534' }, // Verde mais profundo

    btnError: { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' },
    btnErrorActive: { backgroundColor: '#991B1B', borderColor: '#991B1B' }, // Vermelho mais profundo

    btnNeutral: { backgroundColor: '#F3F4F6', borderColor: '#D1D5DB' },
    btnNeutralActive: { backgroundColor: '#374151', borderColor: '#374151' }, // Cinza mais escuro

    emptyContainer: { alignItems: 'center', justifyContent: 'center', padding: 40 },
    emptyText: { color: Neo.colors.neutral[500], marginTop: 16, fontSize: 16 }
});
