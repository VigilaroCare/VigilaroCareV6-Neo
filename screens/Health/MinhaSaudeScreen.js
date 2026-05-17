import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import ProfileService from '../../services/ProfileService';
import { useProfiles } from '../../contexts/ProfileContext';
import { getArticleById } from '../../data/SafetyArticlesDB';
import { useLeftHandedStyle } from '../../hooks/useLeftHandedStyle';
import { useTranslation } from 'react-i18next';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import DossierComponent from '../../components/DossierComponent';
import AppBackground from '../../components/AppBackground';

export default function MinhaSaudeScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('agenda'); // medications | agenda | history
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Data
    const [medications, setMedications] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [history, setHistory] = useState([]);
    const [overdueMeds, setOverdueMeds] = useState([]);
    const [healthTip, setHealthTip] = useState(null);
    const [tipVisible, setTipVisible] = useState(true);

    // Profile
    const { primaryProfile } = useProfiles();
    const [activeProfile, setActiveProfile] = useState(null);
    const { fabPosition } = useLeftHandedStyle();
    const { t } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            setLoading(true);

            // Get active profile
            const profile = primaryProfile || await ProfileService.getPrimaryProfile();
            setActiveProfile(profile);

            if (profile) {
                // Load all health data
                const [meds, treats, appts, procs, hist, overdue] = await Promise.all([
                    HealthService.getMedications(profile.id),
                    HealthService.getTreatments(profile.id),
                    HealthService.getAppointments(profile.id),
                    HealthService.getProcedures(profile.id),
                    HealthService.getMedicalHistory(profile.id),
                    HealthService.getOverdueMeds()
                ]);

                setMedications(meds);
                setTreatments(treats);
                setAppointments(appts);
                setProcedures(procs);
                setHistory(hist);
                setOverdueMeds(overdue.filter(m => m.profileId === profile.id));

                // Load Contextual Health Tip
                let tipId = null;
                if (profile.tipo === 'pet') {
                    tipId = ['plantas_toxicas', 'animais_peconhentos'][Math.floor(Math.random() * 2)];
                } else if (profile.idade !== undefined && profile.idade < 3) { // Bebês
                    tipId = ['engasgo_bebe', 'intoxicacao_medicamentos'][Math.floor(Math.random() * 2)];
                } else if (profile.idade !== undefined && profile.idade < 12) { // Crianças
                    tipId = ['intoxicacao_medicamentos', 'objeto_nariz'][Math.floor(Math.random() * 2)];
                } else if (profile.idade !== undefined && profile.idade >= 60) { // Idosos
                    tipId = ['medicacao_idoso', 'quedas_idosos'][Math.floor(Math.random() * 2)];
                } else { // Adultos
                    tipId = ['intoxicacao_medicamentos', 'kit_emergencia_montagem'][Math.floor(Math.random() * 2)];
                }

                const article = getArticleById(tipId);
                if (article) setHealthTip(article);
            }
        } catch (e) {
            console.error('Error loading health data:', e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadData();
    };

    const handleMarkTreatmentDone = async (treatmentId) => {
        try {
            await HealthService.markTreatmentDone(treatmentId);
            loadData();
        } catch (e) {
            console.error('Error marking treatment done:', e);
        }
    };

    const handleDeleteMedication = (id) => {
        Alert.alert(t('health.deleteMedTitle'), t('health.deleteMedDesc'), [
            { text: t('health.cancel'), style: 'cancel' },
            {
                text: t('health.delete'), style: 'destructive', onPress: async () => {
                    await HealthService.deleteMedication(id);
                    loadData();
                }
            }
        ]);
    };

    const handleDeleteEvent = (id, type) => {
        Alert.alert(t('health.deleteEventTitle'), t('health.deleteEventDesc'), [
            { text: t('health.cancel'), style: 'cancel' },
            {
                text: t('health.delete'), style: 'destructive', onPress: async () => {
                    if (type === 'treatment') await HealthService.deleteTreatment(id);
                    if (type === 'appointment') await HealthService.deleteAppointment(id);
                    if (type === 'procedure') await HealthService.deleteProcedure(id);
                    loadData();
                }
            }
        ]);
    };

    const renderAlerts = () => {
        if (overdueMeds.length === 0) return null;

        return (
            <View style={styles.alertsSection}>
                <NeoCard variant="elevated" style={styles.alertCard}>
                    <View style={styles.alertContent}>
                        <View style={styles.alertIcon}>
                            <NeoIcon name="Warning2" size={20} color={Neo.colors.feedback.error} variant="Bold" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ color: Neo.colors.feedback.error, fontWeight: '800', fontSize: 14 }}>
                                {activeProfile?.nome?.split(' ')[0]}, {t('health.overdueMedsInfo', { count: overdueMeds.length })}
                            </Body>
                            <Small style={{ color: Neo.colors.neutral[700], marginTop: 2 }}>
                                {t('health.tapToView')}
                            </Small>
                        </View>
                        <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.feedback.error} />
                    </View>
                </NeoCard>
            </View>
        );
    };

    const renderTabs = () => {
        const tabs = [
            { id: 'medications', icon: 'Health', label: t('health.tabMeds') },
            { id: 'agenda', icon: 'CalendarEdit', label: t('health.tabAgenda') },
            { id: 'dossier', icon: 'Clipboard', label: t('health.tabDossier') },
        ];

        return (
            <View style={styles.tabsContainer}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={[styles.tab, isActive && styles.tabActive]}
                            onPress={() => setActiveTab(tab.id)}
                            activeOpacity={0.85}
                        >
                            <NeoIcon
                                name={tab.icon}
                                size={18}
                                color={isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600]}
                                variant={isActive ? 'Bold' : 'Linear'}
                            />
                            <Small style={[styles.tabText, isActive && styles.tabTextActive]}>
                                {tab.label}
                            </Small>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    const renderMedications = () => {
        if (medications.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <NeoIcon name="Health" size={64} color={Neo.colors.neutral[300]} />
                    <H3 style={{ marginTop: 16, color: Neo.colors.neutral[500] }}>{t('health.noMeds')}</H3>
                    <Body style={{ color: Neo.colors.neutral[400], textAlign: 'center', marginTop: 8 }}>
                        {t('health.noMedsDesc')}
                    </Body>
                    <ScaleButton onPress={() => navigation.navigate('MedicationScheduler', { autoOpen: true })}>
                        <View style={{ marginTop: 24, backgroundColor: Neo.colors.primary[500], paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24 }}>
                            <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('health.addMed')}</Body>
                        </View>
                    </ScaleButton>
                </View>
            );
        }

        return medications.map(med => (
            <NeoCard variant="elevated" key={med.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                    <View style={{ flex: 1 }}>
                        <H3>{med.name}</H3>
                        <Small style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {med.dosage || t('health.doseNotSpecified')}
                        </Small>
                        {med.indication ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 }}>
                                <NeoIcon name="TickCircle" size={12} color={Neo.colors.primary[600]} variant="Bold" />
                                <Small style={{ color: Neo.colors.primary[700], fontStyle: 'italic' }}>
                                    {med.indication}
                                </Small>
                            </View>
                        ) : null}
                    </View>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MedicationScheduler', { medicamentoUrlParams: med })}>
                            <NeoIcon name="Edit" size={24} color={Neo.colors.neutral[400]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteMedication(med.id)}>
                            <NeoIcon name="Trash" size={24} color={Neo.colors.feedback.error} />
                        </TouchableOpacity>
                    </View>
                </View>

                {med.frequencyHours ? (
                    <View style={[styles.scheduleInfo, { flexDirection: 'column', alignItems: 'stretch', backgroundColor: Neo.colors.primary[50], padding: 12, borderRadius: 8, marginTop: 12 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <NeoIcon name="Clock" size={16} color={Neo.colors.primary[600]} />
                                <Small style={{ marginLeft: 6, color: Neo.colors.primary[800], fontWeight: 'bold' }}>
                                    {t('health.everyXHours', { hours: med.frequencyHours })}
                                </Small>
                            </View>

                            {!!med.nextDoseDate && (
                                <View style={{ backgroundColor: !!overdueMeds.find(o => o.id === med.id) ? Neo.colors.feedback.error : Neo.colors.primary[100], paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                                    <Caption style={{ color: !!overdueMeds.find(o => o.id === med.id) ? Neo.colors.neutral.white : Neo.colors.primary[800], fontWeight: 'bold' }}>
                                        {!!overdueMeds.find(o => o.id === med.id) ? t('health.overdue') : t('health.next')} {new Date(med.nextDoseDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Caption>
                                </View>
                            )}
                        </View>
                        {!!med.stockQuantity && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <NeoIcon name="Health" size={14} color={med.stockQuantity <= 5 ? Neo.colors.feedback.warning : Neo.colors.primary[500]} />
                                <Caption style={{ marginLeft: 6, color: med.stockQuantity <= 5 ? Neo.colors.feedback.warning : Neo.colors.primary[700], fontWeight: med.stockQuantity <= 5 ? 'bold' : 'normal' }}>
                                    {t('health.stock', { quantity: med.stockQuantity, unit: med.stockUnit || 'unid.' })}
                                </Caption>
                            </View>
                        )}
                        {/* Fallback caso possua duração herdada do antigo schedule array */}
                        {!!med.schedule?.duration && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <NeoIcon name="Calendar" size={14} color={Neo.colors.primary[500]} />
                                <Caption style={{ marginLeft: 6, color: Neo.colors.primary[700] }}>
                                    {med.schedule.duration}
                                </Caption>
                            </View>
                        )}
                    </View>
                ) : med.schedule ? (
                    <View style={[styles.scheduleInfo, { flexDirection: 'column', alignItems: 'stretch', backgroundColor: Neo.colors.primary[50], padding: 12, borderRadius: 8, marginTop: 12 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <NeoIcon name="Clock" size={16} color={Neo.colors.primary[600]} />
                                <Small style={{ marginLeft: 6, color: Neo.colors.primary[800], fontWeight: 'bold' }}>
                                    {med.schedule.frequency || t('health.noTimeDefined')}
                                </Small>
                            </View>

                            {!!overdueMeds.find(o => o.id === med.id) && !!med.horario && (
                                <View style={{ backgroundColor: Neo.colors.feedback.error, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
                                    <Caption style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>
                                        {t('health.nextTodayAt', { time: med.horario })}
                                    </Caption>
                                </View>
                            )}
                        </View>
                        {!!med.schedule.duration && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <NeoIcon name="Calendar" size={14} color={Neo.colors.primary[500]} />
                                <Caption style={{ marginLeft: 6, color: Neo.colors.primary[700] }}>
                                    {med.schedule.duration}
                                </Caption>
                            </View>
                        )}
                        {!!med.horario && !overdueMeds.find(o => o.id === med.id) && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                <NeoIcon name="Timer1" size={14} color={Neo.colors.primary[500]} />
                                <Caption style={{ marginLeft: 6, color: Neo.colors.primary[700] }}>
                                    {t('health.baseTime', { time: med.horario })}
                                </Caption>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={[styles.scheduleInfo, { backgroundColor: Neo.colors.neutral[100], padding: 12, borderRadius: 8, marginTop: 12 }]}>
                        <Caption style={{ color: Neo.colors.neutral[500] }}>{t('health.onDemand')}</Caption>
                    </View>
                )}
            </NeoCard>
        ));
    };

    const renderAgenda = () => {
        // Combine all events
        const allEvents = [
            ...treatments.map(t => ({ ...t, type: 'treatment' })),
            ...appointments.map(a => ({ ...a, type: 'appointment' })),
            ...procedures.map(p => ({ ...p, type: 'procedure' }))
        ].sort((a, b) => {
            const dateA = new Date(a.nextDate || a.date);
            const dateB = new Date(b.nextDate || b.date);
            return dateA - dateB;
        });

        if (allEvents.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <NeoIcon name="Calendar" size={64} color={Neo.colors.neutral[300]} />
                    <H3 style={{ marginTop: 16, color: Neo.colors.neutral[500] }}>{t('health.noEvents')}</H3>
                    <Body style={{ color: Neo.colors.neutral[400], textAlign: 'center', marginTop: 8 }}>
                        {t('health.noEventsDesc')}
                    </Body>
                </View>
            );
        }

        return allEvents.map(event => {
            const eventDate = new Date(event.nextDate || event.date);
            const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));

            const icons = {
                treatment: 'Hospital',
                appointment: 'Calendar',
                procedure: 'Health'
            };

            const colors = {
                treatment: Neo.colors.primary[600],
                appointment: Neo.colors.primary[500],
                procedure: Neo.colors.feedback.warning
            };

            return (
                <NeoCard variant="elevated" key={event.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                        <View style={[styles.eventIcon, { backgroundColor: colors[event.type] + '20' }]}>
                            <NeoIcon name={icons[event.type]} size={22} color={colors[event.type]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <H3>{event.name}</H3>
                            <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>
                                {event.type === 'treatment' && event.interval
                                    ? `A cada ${event.interval.value} ${event.interval.unit === 'days' ? 'dias' : event.interval.unit === 'weeks' ? 'semanas' : 'meses'}`
                                    : event.type === 'appointment'
                                        ? (event.doctor || event.specialty || '')
                                        : event.type === 'procedure'
                                            ? (event.location || '')
                                            : ''
                                }
                            </Small>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 16 }}>
                            <TouchableOpacity onPress={() => {
                                if (event.type === 'treatment') navigation.navigate('AddTreatment', { treatmentUrlParams: event });
                                else if (event.type === 'appointment') navigation.navigate('AddAppointment', { appointmentUrlParams: event });
                                else if (event.type === 'procedure') navigation.navigate('AddProcedure', { procedureUrlParams: event });
                            }}>
                                <NeoIcon name="Edit" size={24} color={Neo.colors.neutral[400]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeleteEvent(event.id, event.type)}>
                                <NeoIcon name="Trash" size={24} color={Neo.colors.feedback.error} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.eventFooter}>
                        <View style={{ flex: 1 }}>
                            <Small style={{ color: Neo.colors.neutral[500] }}>
                                {event.type === 'treatment' ? t('health.nextSession') : t('health.date')}
                            </Small>
                            <Body style={{ fontWeight: '600', marginTop: 2 }}>
                                {eventDate.toLocaleDateString(t('common.locale', { defaultValue: 'pt-BR' }))} ({daysUntil >= 0 ? t('health.daysLeft', { count: daysUntil }) : t('health.daysOverdue')})
                            </Body>
                        </View>
                        {event.type === 'treatment' ? (
                            <ScaleButton onPress={() => handleMarkTreatmentDone(event.id)}>
                                <View style={styles.doneButton}>
                                    <Small style={{ color: Neo.colors.neutral.white, fontWeight: '600' }}>{t('health.markDone')}</Small>
                                </View>
                            </ScaleButton>
                        ) : null}
                    </View>
                </NeoCard>
            );
        });
    };

    // Render Dossiê using Component
    const renderDossier = () => (
        <DossierComponent profile={activeProfile} history={history} />
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <StatusBar style="dark" />

                {/* HEADER padronizado */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={styles.title}>{t('health.title', 'Saúde')}</H1>
                        <Caption style={styles.subtitle}>
                            {activeProfile?.nome || '…'}
                        </Caption>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ShareHealthRecord')}
                        style={styles.shareBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ShareNetwork" size={20} color={Neo.colors.primary[700]} variant="Bold" />
                    </TouchableOpacity>
                </View>

                {/* Alerts */}
                {renderAlerts()}

                {/* Tabs */}
                {renderTabs()}

                {/* Content */}
                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 190 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {activeTab === 'medications' && renderMedications()}
                    {activeTab === 'agenda' && renderAgenda()}
                    {activeTab === 'dossier' && renderDossier()}
                </ScrollView>

                {/* FAB */}
                {activeTab !== 'dossier' && !(activeTab === 'medications' && medications.length === 0) ? (
                    <TouchableOpacity
                        style={[styles.fab, fabPosition('right')]}
                        onPress={() => {
                            if (activeTab === 'medications') navigation.navigate('MedicationScheduler', { autoOpen: true });
                            else if (activeTab === 'agenda') navigation.navigate('AddEvent');
                        }}
                        activeOpacity={0.85}
                    >
                        <NeoIcon name="Add" size={26} color="#FFF" variant="Bold" />
                    </TouchableOpacity>
                ) : null}
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
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
        fontSize: 24,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },
    shareBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Alerts
    alertsSection: {
        paddingHorizontal: Neo.spacing.lg,
        gap: 12,
        marginBottom: 12,
    },
    alertCard: {
        padding: 14,
        borderRadius: 16,
        backgroundColor: Neo.colors.feedback.error + '14',
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.feedback.error,
    },
    alertContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    alertIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: Neo.colors.feedback.error + '24',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Tabs (pill glass)
    tabsContainer: {
        flexDirection: 'row',
        marginHorizontal: Neo.spacing.lg,
        marginBottom: 12,
        backgroundColor: 'rgba(255,255,255,0.45)',
        borderRadius: 16,
        padding: 4,
        gap: 4,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
    },
    tabActive: {
        backgroundColor: '#FFF',
    },
    tabText: {
        color: Neo.colors.neutral[600],
        fontWeight: '700',
        fontSize: 12,
    },
    tabTextActive: {
        color: Neo.colors.primary[700],
        fontWeight: '800',
    },

    // Content
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },
    itemCard: {
        padding: 14,
        marginBottom: 12,
        borderRadius: 16,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    eventIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eventFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    doneButton: {
        backgroundColor: Neo.colors.primary[600],
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    categoryBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Empty state
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 24,
    },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 180, // bem acima do SOS
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Neo.colors.primary[600],
        alignItems: 'center',
        justifyContent: 'center',
        ...Neo.shadows.md,
    },
});
