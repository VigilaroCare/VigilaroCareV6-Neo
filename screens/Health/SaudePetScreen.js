import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, ScrollView, TouchableOpacity, StyleSheet, RefreshControl, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import HealthService from '../../services/HealthService';
import { useProfiles } from '../../contexts/ProfileContext';
import { getArticleById } from '../../data/SafetyArticlesDB';

// Components
import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import DossierComponent from '../../components/DossierComponent';
import AppBackground from '../../components/AppBackground';

export default function SaudePetScreen({ navigation }) {
  const { t } = useTranslation('common');
  const [activeTab, setActiveTab] = useState('agenda');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [medications, setMedications] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [history, setHistory] = useState([]);
  const [overdueMeds, setOverdueMeds] = useState([]);

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
      const petProfile = profiles.find(p => p.tipo === 'pet');
      setActiveProfile(petProfile);

      if (petProfile) {
        const [meds, treats, appts, procs, hist, overdue] = await Promise.all([
          HealthService.getMedications(petProfile.id),
          HealthService.getTreatments(petProfile.id),
          HealthService.getAppointments(petProfile.id),
          HealthService.getProcedures(petProfile.id),
          HealthService.getMedicalHistory(petProfile.id),
          HealthService.getOverdueMeds(),
        ]);

        setMedications(meds);
        setTreatments(treats);
        setAppointments(appts);
        setProcedures(procs);
        setHistory(hist);
        setOverdueMeds(overdue.filter(m => m.profileId === petProfile.id));

        // Tip contextual (mantido para futura exibição)
        const tipId = ['plantas_toxicas', 'animais_peconhentos'][Math.floor(Math.random() * 2)];
        getArticleById(tipId);
      }
    } catch (e) {
      if (__DEV__) console.error('Error loading pet health data:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleDeleteMedication = (id) => {
    Alert.alert('Excluir medicamento', 'Remover este medicamento da lista do pet?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await HealthService.deleteMedication(id);
          loadData();
        },
      },
    ]);
  };

  const handleDeleteEvent = (id, type) => {
    Alert.alert('Excluir evento', 'Remover este evento da agenda do pet?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          if (type === 'treatment') await HealthService.deleteTreatment(id);
          if (type === 'appointment') await HealthService.deleteAppointment(id);
          if (type === 'procedure') await HealthService.deleteProcedure(id);
          loadData();
        },
      },
    ]);
  };

  const renderAlerts = () => {
    if (overdueMeds.length === 0) return null;
    return (
      <View style={s.alertsSection}>
        <NeoCard variant="elevated" style={s.alertCard}>
          <View style={s.alertContent}>
            <View style={s.alertIcon}>
              <NeoIcon name="Warning2" size={20} color={Neo.colors.feedback.error} variant="Bold" />
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ color: Neo.colors.feedback.error, fontWeight: '800', fontSize: 14 }}>
                {activeProfile?.nome}, {overdueMeds.length} medicação pendente
              </Body>
              <Small style={{ color: Neo.colors.neutral[700], marginTop: 2 }}>
                {t('headersFirst.toqueParaConferir', 'Toque para conferir')}
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
      { id: 'medications', icon: 'Health', label: t('headersFirst.remDios', 'Remédios') },
      { id: 'agenda', icon: 'CalendarEdit', label: t('headersFirst.veterinRios', 'Veterinários') },
      { id: 'dossier', icon: 'Clipboard', label: t('headersFirst.dossiPet', 'Dossiê') },
    ];

    return (
      <View style={s.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[s.tab, isActive && s.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.85}
            >
              <NeoIcon
                name={tab.icon}
                size={18}
                color={isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600]}
                variant={isActive ? 'Bold' : 'Linear'}
              />
              <Small style={[s.tabText, isActive && s.tabTextActive]}>
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
        <View style={s.emptyState}>
          <View style={s.emptyIconCircle}>
            <NeoIcon name="Health" size={36} color={Neo.colors.neutral[400]} variant="Bold" />
          </View>
          <H3 style={{ marginTop: 12, color: Neo.colors.neutral[800], fontSize: 18 }}>
            {t('headersFirst.semRemDios', 'Sem remédios')}
          </H3>
          <Body style={{ color: Neo.colors.neutral[600], textAlign: 'center', marginTop: 6, fontSize: 13.5 }}>
            {t('headersFirst.adicioneMedicaEsEVacinasDoSeuPetAqui', 'Adicione medicações e vacinas do seu pet aqui.')}
          </Body>
        </View>
      );
    }

    return medications.map(med => (
      <NeoCard variant="elevated" key={med.id} style={s.itemCard}>
        <View style={s.itemHeader}>
          <View style={{ flex: 1 }}>
            <H3 style={{ fontSize: 16 }}>{med.name}</H3>
            <Small style={{ color: Neo.colors.neutral[600], marginTop: 4 }}>
              {med.dosage}
            </Small>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteMedication(med.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <NeoIcon name="Trash" size={20} color={Neo.colors.feedback.error} />
          </TouchableOpacity>
        </View>
      </NeoCard>
    ));
  };

  const renderAgenda = () => {
    const allEvents = [
      ...treatments.map(tr => ({ ...tr, type: 'treatment' })),
      ...appointments.map(a => ({ ...a, type: 'appointment' })),
      ...procedures.map(p => ({ ...p, type: 'procedure' })),
    ].sort((a, b) => new Date(a.nextDate || a.date) - new Date(b.nextDate || b.date));

    if (allEvents.length === 0) {
      return (
        <View style={s.emptyState}>
          <View style={s.emptyIconCircle}>
            <NeoIcon name="Calendar" size={36} color={Neo.colors.neutral[400]} variant="Bold" />
          </View>
          <H3 style={{ marginTop: 12, color: Neo.colors.neutral[800], fontSize: 18 }}>
            {t('headersFirst.agendaVazia', 'Agenda vazia')}
          </H3>
          <Body style={{ color: Neo.colors.neutral[600], textAlign: 'center', marginTop: 6, fontSize: 13.5 }}>
            {t('headersFirst.tosaVacinasOuConsultasVeterinRiasAparece', 'Tosa, vacinas ou consultas veterinárias aparecerão aqui.')}
          </Body>
        </View>
      );
    }

    const TYPE_ICON = { treatment: 'Hospital', appointment: 'Calendar', procedure: 'Health' };
    const TYPE_COLOR = {
      treatment: Neo.colors.primary[600],
      appointment: Neo.colors.primary[500],
      procedure: Neo.colors.feedback.warning,
    };

    return allEvents.map(event => {
      const eventDate = new Date(event.nextDate || event.date);
      const color = TYPE_COLOR[event.type];
      return (
        <NeoCard variant="elevated" key={event.id} style={s.itemCard}>
          <View style={s.itemHeader}>
            <View style={[s.eventIcon, { backgroundColor: color + '20' }]}>
              <NeoIcon name={TYPE_ICON[event.type]} size={20} color={color} variant="Bold" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <H3 style={{ fontSize: 16 }}>{event.name}</H3>
              <Small style={{ color: Neo.colors.neutral[600], marginTop: 2 }}>
                {eventDate.toLocaleDateString('pt-BR')}
              </Small>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteEvent(event.id, event.type)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <NeoIcon name="Trash" size={20} color={Neo.colors.feedback.error} />
            </TouchableOpacity>
          </View>
        </NeoCard>
      );
    });
  };

  const renderDossier = () => (
    <DossierComponent profile={activeProfile} history={history} />
  );

  // Sem perfil pet cadastrado
  if (!activeProfile) {
    return (
      <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
          <StatusBar style="dark" />
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
                {t('headersFirst.saDeDoPet', 'Saúde do pet')}
              </H1>
              <Caption style={s.subtitle}>
                {t('headersFirst.cuidadosVeterinRios', 'Cuidados veterinários')}
              </Caption>
            </View>
          </View>
          <View style={s.emptyState}>
            <View style={s.emptyIconCircle}>
              <NeoIcon name="Heart" size={36} color={Neo.colors.neutral[400]} variant="Bold" />
            </View>
            <H3 style={{ marginTop: 12, color: Neo.colors.neutral[800], fontSize: 18 }}>
              {t('headersFirst.nenhumPetCadastrado', 'Nenhum pet cadastrado')}
            </H3>
            <Body style={{ textAlign: 'center', padding: 16, color: Neo.colors.neutral[600], fontSize: 13.5 }}>
              {t('headersFirst.cadastreUmPerfilDePetNoGerenciadorParaUs', 'Cadastre um perfil de pet no Gerenciador para usar este módulo.')}
            </Body>
          </View>
        </SafeAreaView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={s.container}>
        <StatusBar style="dark" />

        {/* HEADER padronizado */}
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
              {t('headersFirst.saDeDoPet', 'Saúde do pet')}
            </H1>
            <Caption style={s.subtitle}>{activeProfile.nome}</Caption>
          </View>
        </View>

        {renderAlerts()}
        {renderTabs()}

        <ScrollView
          style={s.content}
          contentContainerStyle={{ paddingBottom: 190 }}
          showsVerticalScrollIndicator={false}
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

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },

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

  // Alerts
  alertsSection: {
    paddingHorizontal: Neo.spacing.lg,
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

  // Tabs pill glass
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
  eventIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
