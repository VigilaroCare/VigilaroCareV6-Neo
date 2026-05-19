import React, { useState, useCallback, useMemo } from 'react';
import {
    View, ScrollView, TouchableOpacity, Modal, ActivityIndicator, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import ProfileService from '../../services/ProfileService';
import { ChecklistService } from '../../services/ChecklistService';
import SafetyReportService from '../../services/SafetyReportService';
import { isAreaRelevant } from '../../utils/ProfileFilterEngine';
import { AMBIENTES, CHECKLISTS } from '../../data/mapeamento_dados';

import NeoCard from '../../components/NeoCard';
import NeoText, { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

// Helper de cor para badge de status do ambiente
const getStatusStyle = (status) => {
    if (status === 'Seguro')   return { bg: 'rgba(46,125,50,0.12)',   color: '#2E7D32' };
    if (status === 'Pendente') return { bg: 'rgba(120,120,128,0.12)', color: '#636366' };
    if (status === 'Atenção')  return { bg: 'rgba(245,158,11,0.14)',  color: '#B45309' };
    if (status === 'Risco')    return { bg: 'rgba(229,57,53,0.12)',   color: '#D32F2F' };
    return { bg: 'rgba(0,0,0,0.05)', color: '#757575' };
};

export default function RelatoriosScreenNeo({ navigation }) {
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [score, setScore] = useState(0);
    const [pendingActions, setPendingActions] = useState([]);
    const [profilesCount, setProfilesCount] = useState(0);
    const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);

    const handleExportPDF = async () => {
        try {
            setGeneratingPDF(true);
            const profiles = await ProfileService.getPerfis();
            if (profiles && profiles.length > 0) {
                const activeProfileId = profiles[0].id;
                await SafetyReportService.generatePDFReport(activeProfileId);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setGeneratingPDF(false);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const mapping = (await ProfileService.getMapping()) || [];
            const moradia = (await ProfileService.getMoradia()) || {};
            const profilesData = await ProfileService.getPerfis();
            const profiles = Array.isArray(profilesData) ? profilesData : [];
            setProfilesCount(profiles.length);

            const meta = await ProfileService.getMeta();
            setFamilyMeta(meta || { totalMoradoresEsperados: 0 });

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
                const structure = CHECKLISTS[area.id];
                const stats = ChecklistService.getAreaStats(
                    area.id, areaData, structure, profiles, moradia
                );
                return {
                    key: area.id,
                    fullName: t_field(area, 'nome'),
                    emoji: area.emoji,
                    iconName: area.iconName,
                    total: stats.total,
                    checked: stats.checked,
                    percent: stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0,
                    color: area.cor || COLORS[index % COLORS.length],
                };
            });

            // Pendências (itens com status = risco)
            const allRiskItems = [];
            relevantAreas.forEach((area) => {
                const areaData = checklistState[area.id] || [];
                const risks = (Array.isArray(areaData) ? areaData : []).filter((item) => item.status === 'risco');
                risks.forEach((risk) => {
                    allRiskItems.push({
                        ...risk,
                        roomName: t_field(area, 'nome'),
                        roomId: area.id,
                        roomIcon: area.emoji,
                    });
                });
            });
            setPendingActions(allRiskItems);
            setChartData(finalData);

            if (finalData.length > 0) {
                const globalChecked = finalData.reduce((acc, item) => acc + item.checked, 0);
                const globalTotal = finalData.reduce((acc, item) => acc + item.total, 0);
                setScore(globalTotal > 0 ? Math.round((globalChecked / globalTotal) * 100) : 0);
            } else {
                setScore(0);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { loadData(); }, []));

    const criticalAreas = useMemo(() => {
        return chartData
            .filter((item) => item.checked < item.total)
            .sort((a, b) => (b.total - b.checked) - (a.total - a.checked))
            .slice(0, 3);
    }, [chartData]);

    const getStatisticInsight = (areaId) => {
        if (areaId.includes('cozinha'))   return { icon: 'Danger',     text: t('reports.insightKitchen', 'Cozinha: Risco alto de queimaduras.') };
        if (areaId.includes('piscina'))   return { icon: 'Drop',       text: t('reports.insightPool', 'Piscina: Risco de afogamento silencioso.') };
        if (areaId.includes('banheiro'))  return { icon: 'Activity',   text: t('reports.insightBathroom', '80% das quedas em casa ocorrem aqui.') };
        if (areaId.includes('area_servico')) return { icon: 'Warning2', text: t('reports.insightServiceArea', 'Atenção redobrada com produtos tóxicos.') };
        return { icon: 'InfoCircle', text: t('reports.insightGeneral', 'Pequenos descuidos causam acidentes.') };
    };

    const missingProfilesCount = Math.max(0, (familyMeta?.totalMoradoresEsperados || 0) - profilesCount);

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER */}
                <View style={s.headerBlock}>
                    <H1 style={s.title}>{t('reports.title')}</H1>
                    <Caption style={s.subtitle}>{t('reports.subtitle')}</Caption>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={s.scrollContent}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color={Neo.colors.primary[500]} style={{ marginTop: 60 }} />
                    ) : (
                        <>
                            {/* AÇÕES — relatório detalhado + histórico */}
                            {/* STANDBY (2026-05-19): card "Relatório detalhado" oculto a pedido do user.
                                Motivo: redundância com os checklists logo abaixo na tela.
                                Decisão sobre redesign ou remoção definitiva fica para próxima iteração.
                                A função do modal (setDetailsModalVisible) e o modal em si permanecem
                                no código, prontos para reativar quando o user definir o redesign.

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => setDetailsModalVisible(true)}
                                style={{ marginBottom: 10 }}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(99,102,241,0.20)' }]}>
                                        <NeoIcon name="DocumentText" size={22} color="#6366F1" variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>
                                            {t('reports.personalReport', 'Relatório detalhado')}
                                        </Body>
                                        <Small style={s.actionSub} numberOfLines={2}>
                                            {t('reports.personalReportDesc', 'Inclui exportação em PDF e plano de ação.')}
                                        </Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>
                            */}

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => navigation.navigate('HistoricoMelhoras')}
                                style={{ marginBottom: 22 }}
                            >
                                <NeoCard variant="elevated" style={s.actionCard}>
                                    <View style={[s.actionIconWrap, { backgroundColor: 'rgba(16,185,129,0.20)' }]}>
                                        <NeoIcon name="Activity" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                                    </View>
                                    <View style={{ flex: 1, marginLeft: 14 }}>
                                        <Body style={s.actionTitle}>
                                            {t('reports.improvementHistory', 'Histórico de melhorias')}
                                        </Body>
                                        <Small style={s.actionSub} numberOfLines={2}>
                                            {t('reports.improvementHistoryDesc', 'Acompanhe a evolução da segurança.')}
                                        </Small>
                                    </View>
                                    <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                                </NeoCard>
                            </TouchableOpacity>

                            {/* AMBIENTES — grid 3-col */}
                            <Text style={[s.sectionLabel, { color: themeColors.neutral[700] }]} accessibilityRole="header">
                                {t('reports.environmentInspection', 'Ambientes')}
                            </Text>
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

                                {/* PENDÊNCIAS CRÍTICAS — card vermelho discreto inline */}
                                {pendingActions.length > 0 && (
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        style={s.gridCell}
                                        onPress={() => navigation.navigate('SafetyActionPlan')}
                                    >
                                        <NeoCard variant="elevated" style={[s.roomCard, s.roomCardCritical]}>
                                            <View style={[s.roomIconCircle, { backgroundColor: 'rgba(229,57,53,0.22)' }]}>
                                                <NeoIcon name="Warning2" size={22} color="#D32F2F" variant="Bold" />
                                            </View>
                                            <Body style={[s.roomLabel, { color: '#D32F2F' }]} numberOfLines={2}>
                                                {t('reports.pendencies', 'Pendências')}
                                            </Body>
                                            <View style={[s.statusPill, { backgroundColor: 'rgba(229,57,53,0.14)' }]}>
                                                <Small style={[s.statusText, { color: '#D32F2F' }]}>
                                                    {pendingActions.length} {pendingActions.length === 1 ? 'item' : 'itens'}
                                                </Small>
                                            </View>
                                        </NeoCard>
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* VISTORIAS ESPECIAIS — 2-col, glass cards limpos */}
                            <Text style={[s.sectionLabel, { marginTop: 24 }]}>
                                {t('reports.specialInspections', 'Vistorias Especiais')}
                            </Text>
                            <View style={s.specialGrid}>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={s.specialCell}
                                    onPress={() => navigation.navigate('EscolaSegura')}
                                >
                                    <NeoCard variant="elevated" style={s.specialCard}>
                                        <View style={[s.specialIconWrap, { backgroundColor: 'rgba(46,125,50,0.22)' }]}>
                                            <NeoIcon name="Teacher" size={24} color="#2E7D32" variant="Bold" />
                                        </View>
                                        <H3 style={s.specialTitle}>
                                            {t('reports.safeSchool', 'Escola Segura')}
                                        </H3>
                                        <Small style={s.specialSub} numberOfLines={2}>
                                            {t('reports.safeSchoolDesc', 'Vistoria escolar')}
                                        </Small>
                                    </NeoCard>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={s.specialCell}
                                    onPress={() => navigation.navigate('VistoriaAsilo')}
                                >
                                    <NeoCard variant="elevated" style={s.specialCard}>
                                        <View style={[s.specialIconWrap, { backgroundColor: 'rgba(21,101,192,0.22)' }]}>
                                            <NeoIcon name="Building" size={24} color="#1565C0" variant="Bold" />
                                        </View>
                                        <H3 style={s.specialTitle}>
                                            {t('reports.safeNursingHome', 'Asilo Seguro')}
                                        </H3>
                                        <Small style={s.specialSub} numberOfLines={2}>
                                            {t('reports.safeNursingHomeDesc', 'Vistoria de instituição')}
                                        </Small>
                                    </NeoCard>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </ScrollView>

                {/* MODAL — relatório detalhado (não reestilizado nesta passada) */}
                <Modal
                    animationType="slide"
                    transparent
                    visible={detailsModalVisible}
                    onRequestClose={() => setDetailsModalVisible(false)}
                >
                    <View style={s.modalBackdrop}>
                        <View style={s.modalContent}>
                            <View style={s.modalDragHandle} />

                            <View style={s.modalHeader}>
                                <H3>{t('reports.pendenciesPercent', { pct: 100 - score })}</H3>
                                <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={28} color={Neo.colors.neutral[400]} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={handleExportPDF}
                                disabled={generatingPDF}
                                style={s.pdfButton}
                            >
                                {generatingPDF ? (
                                    <ActivityIndicator size="small" color={Neo.colors.primary[600]} />
                                ) : (
                                    <>
                                        <NeoIcon name="DocumentDownload" size={20} color={Neo.colors.primary[600]} style={{ marginRight: 8 }} />
                                        <NeoText style={{ color: Neo.colors.primary[700], fontWeight: 'bold' }}>
                                            {t('reports.savePDF', 'Salvar PDF')}
                                        </NeoText>
                                    </>
                                )}
                            </TouchableOpacity>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {missingProfilesCount > 0 && (
                                    <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16, borderRadius: 16 }}>
                                        <View style={{ flexDirection: 'row', gap: 12 }}>
                                            <View style={{ backgroundColor: 'rgba(229,57,53,0.14)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                <NeoIcon name="Profile2User" size={22} color="#D32F2F" />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Body style={{ color: '#D32F2F', fontWeight: '800' }}>
                                                    {t('reports.incompleteReg', 'Cadastro incompleto')}
                                                </Body>
                                                <Small>{t('reports.missingPeople', { count: missingProfilesCount })}</Small>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={{ marginTop: 12, backgroundColor: '#D32F2F', padding: 10, borderRadius: 10, alignItems: 'center' }}
                                            onPress={() => { setDetailsModalVisible(false); navigation.navigate('QuemProteger'); }}
                                        >
                                            <Small style={{ color: '#FFF', fontWeight: '800' }}>{t('reports.resolve', 'Resolver')}</Small>
                                        </TouchableOpacity>
                                    </NeoCard>
                                )}

                                {criticalAreas.map((area) => {
                                    const insight = getStatisticInsight(area.key);
                                    return (
                                        <NeoCard variant="elevated" key={area.key} style={{ padding: 16, marginBottom: 12, borderRadius: 16 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Body style={{ fontWeight: '800' }}>{area.fullName}</Body>
                                                <View style={{ backgroundColor: 'rgba(229,57,53,0.14)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 }}>
                                                    <Small style={{ color: '#D32F2F', fontWeight: '800' }}>
                                                        {t('reports.pendenciesCount', { count: area.total - area.checked })}
                                                    </Small>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 10, padding: 12, backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: 10 }}>
                                                <NeoIcon name={insight.icon} size={20} color={Neo.colors.primary[600]} />
                                                <Small style={{ flex: 1, color: Neo.colors.neutral[600] }}>{insight.text}</Small>
                                            </View>
                                            <TouchableOpacity
                                                style={{ marginTop: 12, backgroundColor: Neo.colors.primary[500], padding: 12, borderRadius: 10, alignItems: 'center' }}
                                                onPress={() => {
                                                    setDetailsModalVisible(false);
                                                    const fullArea = AMBIENTES.find((a) => a.id === area.key);
                                                    if (fullArea) {
                                                        navigation.navigate('ChecklistDetail', {
                                                            roomId: fullArea.id,
                                                            roomName: fullArea.nome,
                                                            roomColor: fullArea.cor,
                                                            roomIcon: fullArea.emoji,
                                                        });
                                                    }
                                                }}
                                            >
                                                <Body style={{ color: '#FFF', fontWeight: '800' }}>{t('reports.verifyNow', 'Verificar agora')}</Body>
                                            </TouchableOpacity>
                                        </NeoCard>
                                    );
                                })}

                                {score === 100 && (
                                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                                        <NeoIcon name="Star" size={56} color="#FFD700" variant="Bold" />
                                        <H3 style={{ marginTop: 16, textAlign: 'center' }}>{t('reports.allSafe', 'Tudo seguro')}</H3>
                                        <Body style={{ textAlign: 'center', color: Neo.colors.neutral[500] }}>
                                            {t('reports.allSafeMsg', 'Sua casa está com todos os checks completos.')}
                                        </Body>
                                    </View>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = {
    headerBlock: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 18,
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[700],
        letterSpacing: 1.6,
        marginBottom: 10,
        textTransform: 'uppercase',
        opacity: 0.85,
    },

    // Action cards (relatório + histórico)
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 18,
    },
    actionIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontWeight: '800',
        fontSize: 15,
        color: Neo.colors.neutral[900],
    },
    actionSub: {
        color: Neo.colors.neutral[600],
        marginTop: 2,
        lineHeight: 16,
    },

    // Grid 3-col de ambientes
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    gridCell: {
        width: '31.5%',
        marginBottom: 4,
    },
    roomCard: {
        borderRadius: 18,
        padding: 10,
        paddingTop: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 128,
    },
    roomCardCritical: {
        borderWidth: 1,
        borderColor: 'rgba(229,57,53,0.25)',
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
        fontWeight: '800',
        fontSize: 11.5,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        lineHeight: 14,
        marginBottom: 6,
        minHeight: 28,
    },
    statusPill: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
    },

    // Grid 2-col vistorias especiais
    specialGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    specialCell: {
        width: '48.5%',
        marginBottom: 4,
    },
    specialCard: {
        borderRadius: 18,
        padding: 16,
        minHeight: 140,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    specialIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    specialTitle: {
        fontSize: 14,
        color: Neo.colors.neutral[900],
        textAlign: 'center',
        marginBottom: 4,
    },
    specialSub: {
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        lineHeight: 14,
    },

    // Modal
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        padding: 24,
    },
    modalDragHandle: {
        width: 40,
        height: 4,
        backgroundColor: Neo.colors.neutral[400],
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    pdfButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(16,185,129,0.10)',
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(16,185,129,0.25)',
    },
};
