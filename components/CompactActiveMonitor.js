import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Vibration, TouchableOpacity } from 'react-native';
import NeoIcon from './NeoIcon';
import AnimatedCounter from './AnimatedCounter';
import * as Battery from 'expo-battery';
import NetInfo from '@react-native-community/netinfo';
import { DS as Neo } from '../utils/DesignSystem2026';
import { ChecklistService } from '../services/ChecklistService';
import { AMBIENTES, hydrateChecklistItem } from '../data/mapeamento_dados';
import { useTranslation } from 'react-i18next';
import { t_field } from '../utils/getLocalizedField';
import i18n from '../i18n';
import ProfileService from '../services/ProfileService';
import { getDynamicAreaName } from '../utils/ProfileFilterEngine';

// hideScore: usado pelo hero da Home — o score grande vive no card verde
// externo; aqui renderizamos só a barra-resumo global + lista por ambiente.
export default function CompactActiveMonitor({ scoreData = { geral: 0, pendencias: 0, ambientes: {}, statsGeral: {}, statsAmbientes: {} }, scoreMessage = {}, isExpanded = false, onStatusChange, hideScore = false }) {
    const { t } = useTranslation();
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [batteryState, setBatteryState] = useState(null);
    const [netInfo, setNetInfo] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [lastCheck, setLastCheck] = useState(null);
    const [mapping, setMapping] = useState([]);

    const score = scoreData.geral;
    const isConnected = netInfo?.isConnected !== false;
    const isCriticalBattery = batteryLevel !== null && batteryLevel <= 15 && batteryState !== Battery.BatteryState.CHARGING;
    const isCritical = (scoreData.pendencias > 0 && score < 70) || !isConnected || isCriticalBattery;

    const lastZone = useRef('safe');

    useEffect(() => {
        if (onStatusChange) {
            onStatusChange({ isConnected, isCriticalBattery });
        }
    }, [isConnected, isCriticalBattery, onStatusChange]);

    const handleAlerts = (level, netState, batState) => {
        if (level === null || !netState) return;
        const isCharging = batState === Battery.BatteryState.CHARGING;
        const isConnectedState = netState.isConnected;

        let currentZone = 'safe';
        if (!isConnectedState || (level <= 10 && !isCharging)) {
            currentZone = 'critical';
        } else if (level <= 20 && !isCharging) {
            currentZone = 'warning';
        }

        if (currentZone !== lastZone.current) {
            if (!isMuted) {
                if (currentZone === 'warning') Vibration.vibrate([0, 1000, 500, 1000]);
                else if (currentZone === 'critical') Vibration.vibrate([0, 2000, 1000, 2000]);
            }
            lastZone.current = currentZone;
        } else if (currentZone === 'safe' && lastZone.current !== 'safe') {
            lastZone.current = 'safe';
            if (isMuted) setIsMuted(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const initMonitor = async () => {
            try {
                const level = await Battery.getBatteryLevelAsync();
                const state = await Battery.getBatteryStateAsync();
                const netState = await NetInfo.fetch();
                if (isMounted) {
                    const pct = Math.round(level * 100);
                    setBatteryLevel(pct);
                    setBatteryState(state);
                    setNetInfo(netState);
                    handleAlerts(pct, netState, state);
                }
            } catch (e) { }
        };
        initMonitor();

        const batSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            if (isMounted) setBatteryLevel(Math.round(batteryLevel * 100));
        });
        const batStateSub = Battery.addBatteryStateListener(({ batteryState }) => {
            if (isMounted) setBatteryState(batteryState);
        });
        const netSub = NetInfo.addEventListener(state => {
            if (isMounted) setNetInfo(state);
        });

        return () => {
            isMounted = false;
            batSub && batSub.remove();
            batStateSub && batStateSub.remove();
            netSub && netSub();
        };
    }, []);

    useEffect(() => {
        ChecklistService.getLastCheckDate().then(d => setLastCheck(d));
    }, [scoreData]);

    useEffect(() => {
        let isMounted = true;
        const loadMapping = async () => {
            try {
                const mapData = await ProfileService.getMapping();
                if (isMounted) {
                    setMapping(mapData || []);
                }
            } catch (err) {
                console.error("Error loading mapping in CompactActiveMonitor:", err);
            }
        };
        loadMapping();
        return () => { isMounted = false; };
    }, [scoreData]);

    useEffect(() => {
        if (batteryLevel !== null && netInfo && batteryState) {
            handleAlerts(batteryLevel, netInfo, batteryState);
        }
    }, [batteryLevel, netInfo, batteryState, isMuted]);

    const getScoreColor = (s = score) => {
        if (s >= 80) return Neo.colors.feedback.success;
        if (s >= 50) return Neo.colors.feedback.warning;
        return Neo.colors.feedback.error;
    };

    const getScoreTextColor = (s = score) => {
        if (s >= 80) return Neo.colors.feedback.success;
        if (s >= 50) return '#B7791F'; // Tom mais escuro para garantir legibilidade no fundo claro
        return Neo.colors.feedback.error;
    };

    const getTopAmbientes = () => {
        if (!scoreData || !scoreData.ambientes) return [];
        return Object.entries(scoreData.ambientes).sort((a, b) => a[1] - b[1]);
    };
    
    const ambientesSorted = getTopAmbientes();
    const ambientesCollapsed = ambientesSorted.slice(0, 6);

    const getAmbienteName = (id) => {
        const found = AMBIENTES.find(a => a.id === id);
        if (found) {
            // Using t_field from utils to get translated name based on current language
            const lang = i18n.language || 'pt-BR';
            let name = found.nome;
            if (lang.startsWith('en') && found.nome_en) name = found.nome_en;
            else if (lang.startsWith('es') && found.nome_es) name = found.nome_es;
            return getDynamicAreaName(id, name, mapping, t);
        }
        return id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' ');
    };

    const renderLinearBar = (stats, height = 4, showLabels = false, muted = false) => {
        const total = stats?.total || 1;
        const safePct = (stats?.checked || 0) / total * 100;
        const warningPct = (stats?.warning || 0) / total * 100;
        const criticalPct = (stats?.critical || 0) / total * 100;

        return (
            <View>
                {/* muted: dessatura as mini-barras por-ambiente (a cor semântica
                    forte fica no % e na barra-resumo global) — reduz o ruído visual. */}
                <View style={{ height, backgroundColor: 'rgba(0,0,0,0.06)', borderRadius: height/2, flexDirection: 'row', overflow: 'hidden', opacity: muted ? 0.6 : 1 }}>
                    {safePct > 0 && <View style={{ width: `${safePct}%`, backgroundColor: Neo.colors.feedback.success }} />}
                    {warningPct > 0 && <View style={{ width: `${warningPct}%`, backgroundColor: Neo.colors.feedback.warning }} />}
                    {criticalPct > 0 && <View style={{ width: `${criticalPct}%`, backgroundColor: Neo.colors.feedback.error }} />}
                </View>
                {showLabels && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                        <Text style={{ fontSize: 9, color: Neo.colors.neutral[500], fontWeight: '600' }}>{t('home.labelSafe', { pct: Math.round(safePct) })}</Text>
                        <Text style={{ fontSize: 9, color: Neo.colors.neutral[500], fontWeight: '600' }}>{t('home.labelAttention', { pct: Math.round(warningPct) })}</Text>
                        <Text style={{ fontSize: 9, color: Neo.colors.neutral[500], fontWeight: '600' }}>{t('home.labelCritical', { pct: Math.round(criticalPct) })}</Text>
                    </View>
                )}
            </View>
        );
    };

    const renderAmbienteItem = ([id, s], compact = true) => {
        const stats = scoreData.statsAmbientes?.[id] || { total: 1, checked: 1, warning: 0, critical: 0, failedItems: [] };
        const failedItems = stats.failedItems || [];

        return (
            <View key={id} style={[styles.ambienteRow, !compact && styles.ambienteRowExpanded]}>
                {compact ? (
                    <>
                        <View style={styles.ambienteDotContainer}>
                            <View style={[styles.ambienteDot, { backgroundColor: getScoreColor(s) }]} />
                        </View>
                        <Text style={styles.ambienteName} numberOfLines={1}>{getAmbienteName(id)}</Text>
                        <View style={{ flex: 1, marginHorizontal: 6 }}>
                            {renderLinearBar(stats, 4, false, true)}
                        </View>
                        <Text style={[styles.ambienteScore, { color: getScoreTextColor(s) }]}>{s}%</Text>
                    </>
                ) : (
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                            <Text style={styles.ambienteNameExpanded}>{getAmbienteName(id)}</Text>
                            <Text style={[styles.ambienteScoreExpanded, { color: getScoreTextColor(s) }]}>{s}%</Text>
                        </View>
                        {renderLinearBar(stats, 6, true)}
                        {failedItems.length > 0 && (
                            <View style={{ marginTop: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: 8, borderLeftWidth: 3, borderLeftColor: failedItems[0].isCritical ? Neo.colors.feedback.error : Neo.colors.feedback.warning }}>
                                <Text style={{ fontSize: 10, fontWeight: '800', color: Neo.colors.neutral[800], marginBottom: 2 }}>
                                    {failedItems[0].isCritical ? t('home.criticalRisk', '⚠️ Risco Crítico:') : t('home.attentionPoint', '⚠️ Ponto de Atenção:')}
                                </Text>
                                <Text style={{ fontSize: 10, color: Neo.colors.neutral[700], lineHeight: 14 }}>
                                    {failedItems[0].dica || t('home.verifyItem', { 
                                        item: t_field(hydrateChecklistItem(failedItems[0]), 'titulo').toLowerCase(), 
                                        defaultValue: `Verifique: ${t_field(hydrateChecklistItem(failedItems[0]), 'titulo').toLowerCase()}` 
                                    })}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        );
    };

    const globalStats = scoreData.statsGeral || { total: 1, checked: 1, warning: 0, critical: 0 };

    if (hideScore) {
        return (
            <View style={styles.container}>
                <View style={{ marginBottom: 6 }}>
                    {renderLinearBar(globalStats, 8, true)}
                </View>
                <View style={{ paddingTop: 2 }}>
                    {ambientesCollapsed.length > 0 ? (
                        ambientesCollapsed.map(item => renderAmbienteItem(item, true))
                    ) : (
                        <Text style={styles.noAmbienteText}>{t('home.noInspectedEnvironment', 'Nenhum ambiente vistoriado.')}</Text>
                    )}
                </View>
                <View style={styles.footerRow}>
                    <NeoIcon
                        name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'}
                        size={18}
                        color={Neo.colors.neutral[400]}
                    />
                </View>
                {isExpanded && (
                    <View style={styles.expandedSection}>
                        {ambientesSorted.map(item => renderAmbienteItem(item, false))}
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                {/* Lado Esquerdo (Global Bar) */}
                <View style={styles.gaugeContainer}>
                    <View style={{ alignItems: 'flex-start', width: '100%' }}>
                        <AnimatedCounter
                            value={score}
                            duration={1100}
                            suffix="%"
                            style={[styles.scoreValue, { color: getScoreTextColor() }]}
                            accessibilityLabel={t('home.scoreLabel', 'Score geral da residência: {{score}}%', { score })}
                        />
                        <View style={styles.subtitleRow}>
                            <NeoIcon name="ShieldTick" variant="Bold" size={13} color={getScoreTextColor()} />
                            <Text style={styles.scoreSubtitle} numberOfLines={2}>
                                {score >= 80 ? t('home.homeSafe', 'Sua casa está\nsegura') : (score >= 50 ? t('home.homeNeedsAttention', 'Sua casa precisa\nde atenção') : t('home.actImmediately', 'Aja\nimediatamente'))}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={{ width: '100%', marginTop: 12 }}>
                        {renderLinearBar(globalStats, 8, true)}
                    </View>
                </View>

                <View style={styles.verticalDivider} />

                {/* Lista lateral colapsada */}
                <View style={styles.ambientesContainer}>
                    {ambientesCollapsed.length > 0 ? (
                        ambientesCollapsed.map(item => renderAmbienteItem(item, true))
                    ) : (
                        <Text style={styles.noAmbienteText}>{t('home.noInspectedEnvironment', 'Nenhum ambiente vistoriado.')}</Text>
                    )}
                </View>
            </View>

            <View style={styles.footerRow}>
                <NeoIcon 
                    name={isExpanded ? "ArrowUp2" : "ArrowDown2"} 
                    size={18} 
                    color={Neo.colors.neutral[400]} 
                />
            </View>

            {/* Expansão do Acordeão */}
            {isExpanded && (
                <View style={styles.expandedSection}>
                    {ambientesSorted.map(item => renderAmbienteItem(item, false))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 0 },
    topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 3 },
    gaugeContainer: { flex: 1, paddingRight: 10, justifyContent: 'center' },
    scoreValue: { fontSize: 38, fontWeight: '800', lineHeight: 40, letterSpacing: 0 },
    subtitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
    scoreSubtitle: { fontSize: 12, fontWeight: '800', color: 'rgba(120, 80, 40, 0.80)', letterSpacing: 0, textTransform: 'uppercase' },
    verticalDivider: { width: 1, height: '100%', backgroundColor: 'rgba(120, 80, 40, 0.14)', marginHorizontal: 4 },

    ambientesContainer: { flex: 1.2, justifyContent: 'center', paddingLeft: 4, paddingTop: 4 },
    ambienteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    ambienteDotContainer: { width: 8, alignItems: 'center' },
    ambienteDot: { width: 4, height: 4, borderRadius: 2 },
    ambienteName: { fontSize: 11, fontWeight: '700', color: 'rgba(60, 40, 20, 0.72)', marginLeft: 4, maxWidth: '50%' },
    ambienteScore: { fontSize: 11, fontWeight: '800', marginLeft: 4 },
    noAmbienteText: { fontSize: 11, color: Neo.colors.neutral[500], fontStyle: 'italic', textAlign: 'center' },
    
    footerRow: { alignItems: 'center', justifyContent: 'center', borderTopWidth: 1, borderTopColor: 'rgba(120, 80, 40, 0.12)', paddingTop: 3, marginTop: 3 },
    
    expandedSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)' },
    expandedTitle: { fontSize: 11, fontWeight: '800', color: Neo.colors.neutral[800], letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
    ambienteRowExpanded: { marginBottom: 10, backgroundColor: 'rgba(0,0,0,0.02)', padding: 12, borderRadius: 12 },
    ambienteNameExpanded: { fontSize: 14, fontWeight: '700', color: Neo.colors.neutral[900] },
    ambienteScoreExpanded: { fontSize: 14, fontWeight: '900' }
});
