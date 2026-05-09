import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
import { LampOn, ArrowRight2, CloseSquare } from 'iconsax-react-native';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import DossierComponent from '../../components/DossierComponent';
import AppBackground from '../../components/AppBackground';

export default function SaudePetScreen({ navigation }) {
    const { t } = useTranslation('common');
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

    // Profile
    const { profiles } = useProfiles();
    const [activeProfile, setActiveProfile] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            setLoading(true);

            // Find first PET profile
            const petProfile = profiles.find(p => p.tipo === 'pet');
            setActiveProfile(petProfile);

            if (petProfile) {
                // Load all health data
                const [meds, treats, appts, procs, hist, overdue] = await Promise.all([
                    HealthService.getMedications(petProfile.id),
                    HealthService.getTreatments(petProfile.id),
                    HealthService.getAppointments(petProfile.id),
                    HealthService.getProcedures(petProfile.id),
                    HealthService.getMedicalHistory(petProfile.id),
                    HealthService.getOverdueMeds()
                ]);

                setMedications(meds);
                setTreatments(treats);
                setAppointments(appts);
                setProcedures(procs);
                setHistory(hist);
                setOverdueMeds(overdue.filter(m => m.profileId === petProfile.id));

                // Load Contextual Health Tip
                const tipId = ['plantas_toxicas', 'animais_peconhentos'][Math.floor(Math.random() * 2)];
                const article = getArticleById(tipId);
                if (article) setHealthTip(article);
            }
        } catch (e) {
            console.error('Error loading pet health data:', e);
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
        Alert.alert('Excluir Medicamento', 'Remover este medicamento da lista do pet?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    await HealthService.deleteMedication(id);
                    loadData();
                }
            }
        ]);
    };

    const handleDeleteEvent = (id, type) => {
        Alert.alert('Excluir Evento', 'Deseja realmente remover este evento da agenda do pet?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
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
                <NeoCard variant="glass" style={styles.alertCard}>
                    <View style={styles.alertContent}>
                        <View style={styles.alertIcon}>
                            <NeoIcon name="Warning2" size={24} color={Neo.colors.feedback.error} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Body style={{ color: Neo.colors.feedback.error, fontWeight: 'bold' }}>
                                {activeProfile?.nome}, {overdueMeds.length} medicação pendente
                            </Body>
                            <Small style={{ color: Neo.colors.neutral[600] }}>
                                {t('headersFirst.toqueParaConferir', 'Toque para conferir')}
                            </Small>
                        </View>
                        <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.feedback.error} />
                    </View>
                </NeoCard>
            </View>
        );
    };

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'medications' && styles.tabActive]}
                onPress={() => setActiveTab('medications')}
            >
                <NeoIcon
                    name="Health"
                    size={18}
                    color={activeTab === 'medications' ? Neo.colors.primary[600] : Neo.colors.neutral[500]}
                />
                <Small style={[styles.tabText, { fontSize: 10 }, activeTab === 'medications' && styles.tabTextActive]}>
                    {t('headersFirst.remDios', 'Remédios')}
                </Small>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'agenda' && styles.tabActive]}
                onPress={() => setActiveTab('agenda')}
            >
                <NeoIcon
                    name="CalendarEdit"
                    size={18}
                    color={activeTab === 'agenda' ? Neo.colors.primary[600] : Neo.colors.neutral[500]}
                />
                <Small style={[styles.tabText, { fontSize: 10 }, activeTab === 'agenda' && styles.tabTextActive]}>
                    {t('headersFirst.veterinRios', 'Veterinários')}
                </Small>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'dossier' && styles.tabActive]}
                onPress={() => setActiveTab('dossier')}
            >
                <NeoIcon
                    name="Clipboard"
                    size={18}
                    color={activeTab === 'dossier' ? Neo.colors.primary[600] : Neo.colors.neutral[500]}
                />
                <Small style={[styles.tabText, { fontSize: 10 }, activeTab === 'dossier' && styles.tabTextActive]}>
                    {t('headersFirst.dossiPet', 'Dossiê Pet')}
                </Small>
            </TouchableOpacity>
        </View>
    );

    const renderMedications = () => {
        if (medications.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <NeoIcon name="Health" size={64} color={Neo.colors.neutral[300]} />
                    <H3 style={{ marginTop: 16, color: Neo.colors.neutral[500] }}>{t('headersFirst.semRemDios', 'Sem remédios')}</H3>
                    <Body style={{ color: Neo.colors.neutral[400], textAlign: 'center', marginTop: 8 }}>
                        {t('headersFirst.adicioneMedicaEsEVacinasDoSeuPetAqui', 'Adicione medicações e vacinas do seu pet aqui.')}
                    </Body>
                </View>
            );
        }

        return medications.map(med => (
            <NeoCard variant="glass" key={med.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                    <View style={{ flex: 1 }}>
                        <H3>{med.name}</H3>
                        <Small style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {med.dosage}
                        </Small>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity onPress={() => handleDeleteMedication(med.id)}>
                            <NeoIcon name="Trash" size={24} color={Neo.colors.feedback.error} />
                        </TouchableOpacity>
                    </View>
                </View>
            </NeoCard>
        ));
    };

    const renderAgenda = () => {
        const allEvents = [
            ...treatments.map(t => ({ ...t, type: 'treatment' })),
            ...appointments.map(a => ({ ...a, type: 'appointment' })),
            ...procedures.map(p => ({ ...p, type: 'procedure' }))
        ].sort((a, b) => new Date(a.nextDate || a.date) - new Date(b.nextDate || b.date));

        if (allEvents.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <NeoIcon name="Calendar" size={64} color={Neo.colors.neutral[300]} />
                    <H3 style={{ marginTop: 16, color: Neo.colors.neutral[500] }}>{t('headersFirst.agendaVazia', 'Agenda Vazia')}</H3>
                    <Body style={{ color: Neo.colors.neutral[400], textAlign: 'center', marginTop: 8 }}>
                        {t('headersFirst.tosaVacinasOuConsultasVeterinRiasAparece', 'Tosa, vacinas ou consultas veterinárias aparecerão aqui.')}
                    </Body>
                </View>
            );
        }

        return allEvents.map(event => {
            const eventDate = new Date(event.nextDate || event.date);
            return (
                <NeoCard variant="glass" key={event.id} style={styles.itemCard}>
                    <View style={styles.itemHeader}>
                        <View style={{ flex: 1 }}>
                            <H3>{event.name}</H3>
                            <Small style={{ color: Neo.colors.neutral[500] }}>{eventDate.toLocaleDateString()}</Small>
                        </View>
                        <TouchableOpacity onPress={() => handleDeleteEvent(event.id, event.type)}>
                            <NeoIcon name="Trash" size={24} color={Neo.colors.feedback.error} />
                        </TouchableOpacity>
                    </View>
                </NeoCard>
            );
        });
    };

    const renderDossier = () => (
        <DossierComponent profile={activeProfile} history={history} />
    );

    if (!activeProfile) {
        return (
            <AppBackground variant="subtle">
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                        </TouchableOpacity>
                        <H2 style={{ marginLeft: 16 }}>{t('headersFirst.saDeDoPet', 'Saúde do Pet')}</H2>
                    </View>
                    <View style={styles.emptyState}>
                        <NeoIcon name="Pet" size={64} color={Neo.colors.neutral[300]} />
                        <H3 style={{ marginTop: 16 }}>{t('headersFirst.nenhumPetCadastrado', 'Nenhum Pet Cadastrado')}</H3>
                        <Body style={{ textAlign: 'center', padding: 20 }}>{t('headersFirst.cadastreUmPerfilDePetNoGerenciadorParaUs', 'Cadastre um perfil de Pet no Gerenciador para usar este módulo.')}</Body>
                    </View>
                </SafeAreaView>
            </AppBackground>
        );
    }

    return (
        <AppBackground variant="subtle">
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <StatusBar style="dark" />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <H2>{t('headersFirst.saDeDoPet', 'Saúde do Pet')}</H2>
                        <Small style={{ color: Neo.colors.neutral[500] }}>{activeProfile.nome}</Small>
                    </View>
                </View>

                {renderAlerts()}
                {renderTabs()}

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {activeTab === 'medications' && renderMedications()}
                    {activeTab === 'agenda' && renderAgenda()}
                    {activeTab === 'dossier' && renderDossier()}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: { flexDirection: 'row', alignItems: 'center', padding: Neo.spacing.lg },
    alertsSection: { paddingHorizontal: Neo.spacing.lg, marginBottom: 16 },
    alertCard: { padding: 16, backgroundColor: Neo.colors.feedback.error + '1A' },
    alertContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    alertIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Neo.colors.feedback.error + '33', alignItems: 'center', justifyContent: 'center' },
    tabsContainer: { flexDirection: 'row', paddingHorizontal: Neo.spacing.lg, gap: 8, marginBottom: 16 },
    tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.4)', gap: 6 },
    tabActive: { backgroundColor: Neo.colors.primary[100] },
    tabText: { color: Neo.colors.neutral[600], fontWeight: '500' },
    tabTextActive: { color: Neo.colors.primary[700], fontWeight: '600' },
    content: { flex: 1, paddingHorizontal: Neo.spacing.lg },
    itemCard: { padding: 16, marginBottom: 12 },
    itemHeader: { flexDirection: 'row', alignItems: 'center' },
    emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
});
