import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import { Small, Body } from '../../components/NeoTypography';
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
import NeoAlert from '../../utils/NeoAlert';


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
                        areaImage: area.imagemUrl,
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
            NeoAlert.alert(t('actionPlan.error'), t('actionPlan.loadError'));
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
                            NeoAlert.alert(t('actionPlan.error'), t('actionPlan.noProfile'));
                            return;
                        }
                        NeoAlert.alert(
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
                                            NeoAlert.alert(t('actionPlan.error'), t('actionPlan.pdfError') + err.message);
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
            <StatusBar style="dark" />
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

                {displayList.map((item, index) => {
                    const isHighPriority = item.type === 'perigo';
                    const priorityColor = isHighPriority ? '#EF4444' : '#F59E0B';

                    return (
                        <NeoCard variant="glass"
                            key={item.id}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 12,
                                paddingHorizontal: 14,
                                marginBottom: 8,
                                marginHorizontal: 20,
                                backgroundColor: '#FFF',
                                borderRadius: 18,
                                borderWidth: 1,
                                borderColor: '#F3F4F6',
                                ...Neo.shadows.sm
                            }}
                        >
                            {/* Left: Priority indicator */}
                            <View style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, backgroundColor: priorityColor, marginRight: 12 }} />

                            {/* Center: Content */}
                            <View style={{ flex: 1, paddingRight: 12 }}>
                                <Small style={{ color: '#9CA3AF', fontWeight: '700', fontSize: 9, letterSpacing: 0.6, marginBottom: 3 }}>
                                    {item.areaName.toUpperCase()}
                                </Small>
                                <Body style={{ color: '#1F2937', lineHeight: 20, fontWeight: '600', fontSize: 15 }}>
                                    {item.text}
                                </Body>
                                {isHighPriority && (
                                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                        <View style={{ backgroundColor: '#FEF2F2', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4, borderWidth: 1, borderColor: '#FEE2E2' }}>
                                            <Small style={{ color: '#B91C1C', fontWeight: 'bold', fontSize: 8 }}>CRÍTICO</Small>
                                        </View>
                                    </View>
                                )}
                            </View>

                            {/* Right: Toggles (S/N/NA) — Compact */}
                            <View style={{ alignItems: 'center', gap: 4 }}>
                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                    <TouchableOpacity
                                        onPress={() => handleSetStatus(item, 'conforme')}
                                        style={{
                                            width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
                                            backgroundColor: item.status === 'conforme' ? '#10B981' : '#F8FAFC',
                                            borderWidth: item.status === 'conforme' ? 0 : 1.5,
                                            borderColor: item.status === 'conforme' ? 'transparent' : '#E2E8F0',
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Small style={{ fontWeight: 'bold', color: item.status === 'conforme' ? '#FFF' : '#94A3B8' }}>S</Small>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => handleSetStatus(item, 'risco')}
                                        style={{
                                            width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center',
                                            backgroundColor: item.status === 'risco' ? '#EF4444' : '#F8FAFC',
                                            borderWidth: item.status === 'risco' ? 0 : 1.5,
                                            borderColor: item.status === 'risco' ? 'transparent' : '#E2E8F0',
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Small style={{ fontWeight: 'bold', color: item.status === 'risco' ? '#FFF' : '#94A3B8' }}>N</Small>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleSetStatus(item, 'na')}
                                    style={{
                                        paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: item.status === 'na' ? '#6B7280' : '#F1F5F9',
                                        borderWidth: item.status === 'na' ? 0 : 1,
                                        borderColor: item.status === 'na' ? 'transparent' : '#E2E8F0',
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <Small style={{ fontWeight: 'bold', fontSize: 9, color: item.status === 'na' ? '#FFF' : '#94A3B8' }}>NA</Small>
                                </TouchableOpacity>
                            </View>
                        </NeoCard>
                    );
                })}

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
