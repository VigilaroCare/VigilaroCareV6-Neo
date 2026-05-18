import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    ActivityIndicator, Share, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import SafetyReportService from '../../services/SafetyReportService';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const TYPE_COLOR = {
    baby: '#EC4899', toddler: '#F59E0B', child: '#3B82F6',
    teen: '#8B5CF6', adult: Neo.colors.primary[500], senior: '#10B981', pet: '#F97316',
};

function formatAckDate(isoString) {
    try {
        const d = new Date(isoString);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch { return ''; }
}

// ── Risk Card sub-component ─────────────────────────────────────
// FIX: agora recebe `t` como prop (era ReferenceError quando o item tinha
// `implication`, pois t/useTranslation não estavam no escopo).
function RiskCard({ item, onAcknowledge, onNavigate, t }) {
    const ack = item.acknowledged;

    return (
        <NeoCard variant="elevated" style={s.riskCard}>
            <View style={[s.riskSidebar, { backgroundColor: ack ? Neo.colors.neutral[400] : Neo.colors.feedback.error }]} />
            <View style={s.riskBody}>
                <View style={s.riskEnvRow}>
                    <Text style={s.riskEnvEmoji}>{item.roomEmoji}</Text>
                    <Text style={s.riskEnvLabel}>{item.roomLabel}</Text>
                </View>

                <Text style={[s.riskTitle, { color: textPrimary }]}>{item.titulo}</Text>

                {item.implication ? (
                    <View style={[s.implicationBlock, ack && s.implicationBlockAck]}>
                        <Text style={[s.implicationLabel, ack && { color: Neo.colors.neutral[500] }]}>
                            {t('riskSummary.implicationLabel', 'Implicação se não resolvido')}
                        </Text>
                        <Text style={[s.implicationText, ack && { color: Neo.colors.neutral[600] }]}>
                            {item.implication}
                        </Text>
                    </View>
                ) : null}

                {item.tip ? (
                    <View style={s.tipBlock}>
                        <NeoIcon name="LampOn" size={14} color={Neo.colors.primary[600]} variant="Bold" />
                        <Text style={s.tipText}>{item.tip}</Text>
                    </View>
                ) : null}

                {ack ? (
                    <View style={s.ackBanner}>
                        <NeoIcon name="TickCircle" size={14} color={Neo.colors.neutral[600]} variant="Bold" />
                        <Text style={s.ackText}>
                            {t('riskSummary.ackBy', 'Reconhecido por')} {ack.responsibleName} {t('riskSummary.ackOn', 'em')} {formatAckDate(ack.date)}
                        </Text>
                    </View>
                ) : (
                    <View style={s.actionRow}>
                        <TouchableOpacity
                            style={s.btnResolve}
                            onPress={() => onNavigate(item.roomKey)}
                            activeOpacity={0.85}
                        >
                            <NeoIcon name="TickCircle" size={14} color="#FFF" variant="Bold" />
                            <Text style={s.btnResolveText}>
                                {t('riskSummary.willResolve', 'Vou resolver')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={s.btnAck}
                            onPress={() => onAcknowledge(item)}
                            activeOpacity={0.85}
                        >
                            <NeoIcon name="Eye" size={13} color={Neo.colors.neutral[700]} variant="Bold" />
                            <Text style={s.btnAckText}>
                                {t('riskSummary.acknowledge', 'Reconheço')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </NeoCard>
    );
}

export default function ProfileRiskSummaryScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textSecondary = themeColors.neutral[700];

    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState(null);
    const [riskItems, setRiskItems] = useState([]);
    const [activeProfileId, setActiveProfileId] = useState(route.params?.profile?.id || null);

    const [aiReport, setAiReport] = useState(null);
    const [generatingAi, setGeneratingAi] = useState(false);

    const loadReport = useCallback(async (profileId) => {
        try {
            setLoading(true);
            const data = await SafetyReportService.getDeepDiveReport(profileId);
            setReport(data);
            setRiskItems(data?.riskItems || []);

            const cachedAi = await SafetyReportService.getAIAugmentedReport(profileId, false);
            setAiReport(cachedAi?.quem ? cachedAi : null);
        } catch (error) {
            console.error('ProfileRiskSummaryScreen error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGenerateAI = async () => {
        setGeneratingAi(true);
        try {
            const aiData = await SafetyReportService.getAIAugmentedReport(activeProfileId, true);
            if (aiData?.quem) {
                setAiReport(aiData);
            } else {
                Alert.alert(
                    t('riscSummary.aiUnavailableTitle', 'Análise indisponível'),
                    t('riskSummary.aiUnavailableDesc', 'Não foi possível gerar a análise agora. Tente novamente em instantes.')
                );
            }
        } catch (e) {
            Alert.alert(
                t('riskSummary.aiErrorTitle', 'Falha de conexão'),
                t('riskSummary.aiErrorDesc', 'Não foi possível conectar para gerar a análise.')
            );
        } finally {
            setGeneratingAi(false);
        }
    };

    useEffect(() => {
        if (!aiReport && !generatingAi && report && !loading) {
            handleGenerateAI();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aiReport, report, loading]);

    useEffect(() => {
        const initReport = async () => {
            let pid = activeProfileId;
            if (!pid) {
                const ProfileService = require('../../services/ProfileService').default;
                const perfis = await ProfileService.getPerfis();
                if (perfis && perfis.length > 0) {
                    const principal = perfis.find(p => p.ativo && p.tipo !== 'pet')
                        || perfis.find(p => p.tipo !== 'pet')
                        || perfis[0];
                    pid = principal.id;
                    setActiveProfileId(pid);
                }
            }
            if (pid) loadReport(pid);
            else setLoading(false);
        };
        initReport();
    }, [activeProfileId, loadReport]);

    const handleAcknowledge = (item) => {
        const responsibleName = report?.profile?.nome || t('riskSummary.responsibleFallback', 'Responsável');
        Alert.alert(
            t('riskSummary.ackTitle', 'Reconhecer risco'),
            t('riskSummary.ackBody', { name: responsibleName, defaultValue: `Ao confirmar, registraremos que "${responsibleName}" está ciente desta irregularidade e assume a responsabilidade. O item permanecerá visível como "Reconhecido".` }),
            [
                { text: t('common.cancel', 'Cancelar'), style: 'cancel' },
                {
                    text: t('common.confirm', 'Confirmar'),
                    style: 'destructive',
                    onPress: async () => {
                        await SafetyReportService.saveAcknowledgment(report.profile.id, item.itemKey, responsibleName);
                        setRiskItems(prev => prev.map(r =>
                            r.itemKey === item.itemKey
                                ? { ...r, acknowledged: { responsibleName, date: new Date().toISOString() } }
                                : r
                        ));
                    },
                },
            ]
        );
    };

    const handleShare = async () => {
        if (!report) return;
        try {
            const activeRisks = riskItems.filter(r => !r.acknowledged);
            const ackRisks = riskItems.filter(r => r.acknowledged);

            let text = `🛡️ RELATÓRIO DE PROTEÇÃO — ${report.profile.nome}\n`;
            text += `Gerado em: ${new Date(report.generatedAt).toLocaleDateString('pt-BR')}\n\n`;
            text += `Irregularidades ativas: ${activeRisks.length}\n`;
            text += `Itens reconhecidos: ${ackRisks.length}\n`;
            text += `Pendentes de vistoria: ${report.pendingItems?.length || 0}\n\n`;

            if (activeRisks.length > 0) {
                text += `IRREGULARIDADES:\n`;
                activeRisks.forEach(r => {
                    text += `• ${r.roomEmoji} ${r.roomLabel} — ${r.titulo}\n`;
                    if (r.tip) text += `  ↳ ${r.tip}\n`;
                });
                text += '\n';
            }

            if (ackRisks.length > 0) {
                text += `RECONHECIDOS:\n`;
                ackRisks.forEach(r => {
                    text += `• ${r.titulo} — por ${r.acknowledged.responsibleName} em ${formatAckDate(r.acknowledged.date)}\n`;
                });
                text += '\n';
            }

            text += `Vigilaro Care — Prevenção inteligente.`;
            await Share.share({ message: text, title: `Relatório — ${report.profile.nome}` });
        } catch (e) { console.error('Share error:', e); }
    };

    // ── Loading ──
    if (loading) {
        return (
            <AppBackground>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <View style={s.loadingWrap}>
                        <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
                        <H3 style={s.loadingTitle}>
                            {t('riskSummary.loadingTitle', 'Preparando seu relatório')}
                        </H3>
                        <Caption style={s.loadingSubtitle}>
                            {t('riskSummary.loadingSubtitle', 'Cruzando perfil, saúde, moradia e vistoria.')}
                        </Caption>
                    </View>
                </SafeAreaView>
            </AppBackground>
        );
    }

    if (!report) return null;

    const { profile, reportType, typeLabel: tLabel, age, moradia, pendingItems, curiosity, otherProfiles, stats } = report;
    const tColor = TYPE_COLOR[reportType] || Neo.colors.primary[500];
    const activeRisks = riskItems.filter(r => !r.acknowledged);
    const ackRisks = riskItems.filter(r => r.acknowledged);

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER consistente */}
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
                            {t('riskSummary.headerTitle', 'Relatório de proteção')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('riskSummary.headerSubtitle', 'Análise individual de risco')}
                        </Caption>
                    </View>
                    <TouchableOpacity
                        onPress={handleShare}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ShareNetwork" size={20} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* PROFILE CONTEXT CARD */}
                    <NeoCard variant="elevated" style={s.profileCard}>
                        <View style={[s.profileAvatar, { borderColor: tColor }]}>
                            {profile?.foto ? (
                                <Image source={{ uri: profile.foto }} style={s.profileAvatarImg} />
                            ) : (
                                <NeoIcon name={reportType === 'pet' ? 'paw' : 'person'} size={26} color={tColor} variant="Bold" />
                            )}
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={s.profileName}>{profile.nome || ''}</Body>
                            <View style={s.profileMetaRow}>
                                <View style={[s.typePill, { backgroundColor: tColor + '22' }]}>
                                    <Caption style={[s.typePillText, { color: tColor }]}>{tLabel}</Caption>
                                </View>
                                {age ? <Caption style={s.profileAge}>{age} anos</Caption> : null}
                            </View>
                            {moradia?.tipo || moradia?.location ? (
                                <Caption style={s.profileWhere} numberOfLines={1}>
                                    {[moradia.tipo, moradia.andar ? `${moradia.andar}º andar` : null, moradia.location].filter(Boolean).join(' · ')}
                                </Caption>
                            ) : null}
                        </View>
                        <View style={[s.scoreBox, { backgroundColor: stats.risks > 0 ? 'rgba(229,57,53,0.14)' : 'rgba(16,185,129,0.18)' }]}>
                            <Text style={[s.scoreNumber, { color: stats.risks > 0 ? Neo.colors.feedback.error : Neo.colors.primary[700] }]}>
                                {stats.risks}
                            </Text>
                            <Caption style={[s.scoreLabel, { color: stats.risks > 0 ? Neo.colors.feedback.error : Neo.colors.primary[700] }]}>
                                {stats.risks === 1 ? 'risco' : 'riscos'}
                            </Caption>
                        </View>
                    </NeoCard>

                    {/* ANÁLISE PERSONALIZADA */}
                    <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                        {t('riskSummary.analysisLabel', 'Análise personalizada')}
                    </Text>
                    {!aiReport ? (
                        <NeoCard variant="elevated" style={s.aiLoadingCard}>
                            <ActivityIndicator size="small" color={Neo.colors.primary[500]} />
                            <Body style={s.aiLoadingText}>
                                {generatingAi
                                    ? t('riskSummary.aiGenerating', 'Preparando sua análise…')
                                    : t('riskSummary.aiQueued', 'Aguardando dados…')}
                            </Body>
                        </NeoCard>
                    ) : (
                        <View style={{ gap: 10 }}>
                            <AiCard
                                iconName="Profile"
                                color={Neo.colors.primary[600]}
                                title={t('riskSummary.aiResident', 'O morador')}
                                text={aiReport.quem}
                            />
                            <AiCard
                                iconName="Home2"
                                color="#F59E0B"
                                title={t('riskSummary.aiEnvironment', 'O ambiente')}
                                text={aiReport.onde}
                            />
                            <AiCard
                                iconName="Warning2"
                                color={Neo.colors.feedback.error}
                                title={t('riskSummary.aiAttention', 'Pontos de atenção')}
                                text={aiReport.o_que}
                            />
                            <AiCard
                                iconName="ShieldTick"
                                color="#16A34A"
                                title={t('riskSummary.aiPlan', 'Plano de ação')}
                                text={aiReport.como}
                            />
                            <Caption style={s.aiTimestamp}>
                                {t('riskSummary.aiGeneratedAt', 'Gerado em')} {formatAckDate(aiReport.generatedAt)}
                            </Caption>
                        </View>
                    )}

                    {/* IRREGULARIDADES ATIVAS */}
                    {activeRisks.length > 0 && (
                        <View style={{ marginTop: 24 }}>
                            <View style={s.sectionHeaderRow}>
                                <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                    {t('riskSummary.activeIssues', 'Irregularidades ativas')}
                                </Text>
                                <View style={[s.countBadge, { backgroundColor: 'rgba(229,57,53,0.14)' }]}>
                                    <Caption style={[s.countBadgeText, { color: Neo.colors.feedback.error }]}>
                                        {activeRisks.length}
                                    </Caption>
                                </View>
                            </View>
                            {activeRisks.map((item, idx) => (
                                <RiskCard
                                    key={`risk-${idx}`}
                                    item={item}
                                    onAcknowledge={handleAcknowledge}
                                    onNavigate={(roomKey) => navigation.navigate('ChecklistDetail', { roomId: roomKey })}
                                    t={t}
                                />
                            ))}
                        </View>
                    )}

                    {/* RECONHECIDOS */}
                    {ackRisks.length > 0 && (
                        <View style={{ marginTop: 24 }}>
                            <View style={s.sectionHeaderRow}>
                                <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                    {t('riskSummary.acknowledged', 'Reconhecidos pelo responsável')}
                                </Text>
                                <View style={[s.countBadge, { backgroundColor: 'rgba(0,0,0,0.06)' }]}>
                                    <Caption style={[s.countBadgeText, { color: Neo.colors.neutral[700] }]}>
                                        {ackRisks.length}
                                    </Caption>
                                </View>
                            </View>
                            {ackRisks.map((item, idx) => (
                                <RiskCard
                                    key={`ack-${idx}`}
                                    item={item}
                                    onAcknowledge={handleAcknowledge}
                                    onNavigate={(roomKey) => navigation.navigate('ChecklistDetail', { roomId: roomKey })}
                                    t={t}
                                />
                            ))}
                        </View>
                    )}

                    {/* NÃO VERIFICADOS */}
                    {pendingItems && pendingItems.length > 0 && (
                        <View style={{ marginTop: 24 }}>
                            <View style={s.sectionHeaderRow}>
                                <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                    {t('riskSummary.unverified', 'Não verificados')}
                                </Text>
                                <View style={[s.countBadge, { backgroundColor: 'rgba(245,158,11,0.18)' }]}>
                                    <Caption style={[s.countBadgeText, { color: '#B45309' }]}>
                                        {pendingItems.length}
                                    </Caption>
                                </View>
                            </View>
                            <NeoCard variant="elevated" style={s.pendingCard}>
                                {pendingItems.slice(0, 8).map((item, idx) => (
                                    <TouchableOpacity
                                        key={`pending-${idx}`}
                                        style={[s.pendingRow, idx < Math.min(pendingItems.length, 8) - 1 && s.pendingRowDivider]}
                                        onPress={() => navigation.navigate('ChecklistDetail', { roomId: item.roomKey })}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={s.pendingEmoji}>{item.roomEmoji}</Text>
                                        <Text style={s.pendingText} numberOfLines={1}>{item.titulo}</Text>
                                        <NeoIcon name="ArrowRight2" size={14} color={Neo.colors.neutral[500]} />
                                    </TouchableOpacity>
                                ))}
                                {pendingItems.length > 8 ? (
                                    <Text style={s.pendingMore}>
                                        + {pendingItems.length - 8} {t('riskSummary.otherPending', 'outros itens')}
                                    </Text>
                                ) : null}
                            </NeoCard>
                        </View>
                    )}

                    {/* VOCÊ SABIA */}
                    {curiosity && (
                        <View style={{ marginTop: 24 }}>
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('riskSummary.didYouKnow', 'Você sabia?')}
                            </Text>
                            <NeoCard variant="elevated" style={s.curiosityCard}>
                                <View style={s.curiosityIconWrap}>
                                    <NeoIcon name="InfoCircle" size={18} color={Neo.colors.primary[600]} variant="Bold" />
                                </View>
                                <Text style={s.curiosityText}>{curiosity.text || ''}</Text>
                            </NeoCard>
                        </View>
                    )}

                    {/* OUTROS MORADORES */}
                    {otherProfiles && otherProfiles.length > 0 && (
                        <View style={{ marginTop: 24 }}>
                            <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">
                                {t('riskSummary.otherResidents', 'Outros moradores')}
                            </Text>
                            <View style={s.miniGrid}>
                                {otherProfiles.map((p) => {
                                    const pColor = TYPE_COLOR[p.tipo] || Neo.colors.primary[500];
                                    return (
                                        <TouchableOpacity
                                            key={p.id}
                                            style={s.miniCell}
                                            onPress={() => setActiveProfileId(p.id)}
                                            activeOpacity={0.85}
                                        >
                                            <NeoCard variant="elevated" style={s.miniCard}>
                                                <View style={[s.miniAvatar, { backgroundColor: pColor + '22' }]}>
                                                    {p.foto ? (
                                                        <Image source={{ uri: p.foto }} style={s.miniAvatarImg} />
                                                    ) : (
                                                        <NeoIcon name={p.tipo === 'pet' ? 'paw' : 'person'} size={18} color={pColor} variant="Bold" />
                                                    )}
                                                </View>
                                                <Caption style={s.miniName} numberOfLines={1}>
                                                    {(p.nome || '').split(' ')[0]}
                                                </Caption>
                                            </NeoCard>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {/* Generated at footer */}
                    <Caption style={s.generatedAt}>
                        {t('riskSummary.generatedAt', 'Relatório gerado em')} {new Date(report.generatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </Caption>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// ── AI card sub-component (replaces border-left "ink stripe" pattern) ──
function AiCard({ iconName, color, title, text }) {
    return (
        <NeoCard variant="elevated" style={s.aiCard}>
            <View style={[s.aiCardIconWrap, { backgroundColor: color + '22' }]}>
                <NeoIcon name={iconName} size={16} color={color} variant="Bold" />
            </View>
            <View style={{ flex: 1 }}>
                <Body style={[s.aiCardTitle, { color }]}>{title}</Body>
                <Small style={s.aiCardText}>{text}</Small>
            </View>
        </NeoCard>
    );
}

const s = StyleSheet.create({
    // Loading
    loadingWrap: {
        flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32,
    },
    loadingTitle: {
        marginTop: 16, color: Neo.colors.neutral[900], textAlign: 'center',
    },
    loadingSubtitle: {
        marginTop: 6, textAlign: 'center', color: Neo.colors.neutral[600], lineHeight: 18,
    },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 18, gap: 12,
    },
    backBtn: {
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center', justifyContent: 'center',
    },
    title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2 },
    subtitle: { color: Neo.colors.neutral[600] },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 190,
    },

    sectionLabel: {
        fontSize: 11, fontWeight: '900', color: Neo.colors.neutral[700],
        letterSpacing: 1.6, marginBottom: 10, textTransform: 'uppercase', opacity: 0.85,
    },
    sectionHeaderRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    countBadge: {
        paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginBottom: 10,
    },
    countBadgeText: { fontWeight: '800', fontSize: 11 },

    // Profile context card
    profileCard: {
        flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 20, marginBottom: 22, gap: 12,
    },
    profileAvatar: {
        width: 54, height: 54, borderRadius: 27, borderWidth: 2.5,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    },
    profileAvatarImg: { width: '100%', height: '100%' },
    profileName: { fontWeight: '800', fontSize: 16, color: Neo.colors.neutral[900] },
    profileMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
    typePill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    typePillText: { fontWeight: '800', fontSize: 10, letterSpacing: 0.3 },
    profileAge: { color: Neo.colors.neutral[600] },
    profileWhere: { color: Neo.colors.neutral[600], marginTop: 3 },
    scoreBox: {
        alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, minWidth: 56,
    },
    scoreNumber: { fontSize: 24, fontWeight: '900', lineHeight: 28 },
    scoreLabel: { fontWeight: '800', fontSize: 9, letterSpacing: 0.3 },

    // AI section
    aiLoadingCard: {
        flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 12,
    },
    aiLoadingText: { flex: 1, color: Neo.colors.neutral[700], fontSize: 13 },
    aiCard: {
        flexDirection: 'row', alignItems: 'flex-start', padding: 14, borderRadius: 16, gap: 12,
    },
    aiCardIconWrap: {
        width: 32, height: 32, borderRadius: 16,
        alignItems: 'center', justifyContent: 'center',
    },
    aiCardTitle: { fontWeight: '800', fontSize: 13.5, marginBottom: 4 },
    aiCardText: { color: Neo.colors.neutral[700], lineHeight: 19, fontSize: 12.5 },
    aiTimestamp: {
        color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 6, fontStyle: 'italic',
    },

    // Risk card
    riskCard: {
        flexDirection: 'row', overflow: 'hidden', marginBottom: 12, padding: 0, borderRadius: 16,
    },
    riskSidebar: { width: 4 },
    riskBody: { flex: 1, padding: 14 },
    riskEnvRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    riskEnvEmoji: { fontSize: 13, marginRight: 5 },
    riskEnvLabel: {
        fontSize: 10.5, color: Neo.colors.neutral[600], fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: 0.4,
    },
    riskTitle: { fontSize: 14.5, fontWeight: '800', color: Neo.colors.neutral[900], marginBottom: 10 },

    implicationBlock: {
        backgroundColor: 'rgba(229,57,53,0.10)', borderRadius: 10, padding: 10, marginBottom: 10,
    },
    implicationBlockAck: { backgroundColor: 'rgba(0,0,0,0.05)' },
    implicationLabel: {
        fontSize: 10, fontWeight: '800', color: Neo.colors.feedback.error,
        textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 4,
    },
    implicationText: { fontSize: 12.5, color: Neo.colors.neutral[900], lineHeight: 17 },

    tipBlock: {
        flexDirection: 'row', alignItems: 'flex-start',
        backgroundColor: 'rgba(16,185,129,0.10)', borderRadius: 10, padding: 10, marginBottom: 12, gap: 7,
    },
    tipText: { fontSize: 12, color: Neo.colors.primary[700], lineHeight: 17, flex: 1 },

    actionRow: { flexDirection: 'row', gap: 8 },
    btnResolve: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: Neo.colors.primary[500], borderRadius: 10, paddingVertical: 9, gap: 6,
    },
    btnResolveText: { color: '#FFF', fontWeight: '800', fontSize: 12.5 },
    btnAck: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10, paddingVertical: 9, paddingHorizontal: 12, gap: 5,
    },
    btnAckText: { color: Neo.colors.neutral[700], fontWeight: '700', fontSize: 12 },

    ackBanner: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 10, padding: 10, gap: 7,
    },
    ackText: { fontSize: 11.5, color: Neo.colors.neutral[700], flex: 1, fontStyle: 'italic' },

    // Pending
    pendingCard: { padding: 0, borderRadius: 16, overflow: 'hidden' },
    pendingRow: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 14, paddingVertical: 12, gap: 10,
    },
    pendingRowDivider: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    pendingEmoji: { fontSize: 15 },
    pendingText: { flex: 1, fontSize: 12.5, color: Neo.colors.neutral[800] },
    pendingMore: {
        fontSize: 11, color: Neo.colors.neutral[500], textAlign: 'center',
        paddingVertical: 10, fontStyle: 'italic',
    },

    // Curiosity
    curiosityCard: {
        flexDirection: 'row', alignItems: 'flex-start',
        padding: 14, borderRadius: 16, gap: 12,
    },
    curiosityIconWrap: {
        width: 34, height: 34, borderRadius: 17,
        backgroundColor: 'rgba(16,185,129,0.18)',
        alignItems: 'center', justifyContent: 'center',
    },
    curiosityText: {
        flex: 1, fontSize: 13, color: Neo.colors.neutral[700], lineHeight: 19, fontStyle: 'italic',
    },

    // Mini grid (other profiles)
    miniGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    miniCell: { width: '22.5%' },
    miniCard: { padding: 10, alignItems: 'center', borderRadius: 14 },
    miniAvatar: {
        width: 38, height: 38, borderRadius: 19,
        alignItems: 'center', justifyContent: 'center', marginBottom: 6, overflow: 'hidden',
    },
    miniAvatarImg: { width: '100%', height: '100%' },
    miniName: { fontWeight: '700', color: Neo.colors.neutral[700], fontSize: 10 },

    // Generated at
    generatedAt: { textAlign: 'center', color: Neo.colors.neutral[500], marginTop: 28, fontSize: 11 },
});
