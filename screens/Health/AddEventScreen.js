import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, H3, Body, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useProfiles } from '../../contexts/ProfileContext';

export default function AddEventScreen({ navigation }) {
  const { t } = useTranslation('common');
  const { primaryProfile } = useProfiles();
  const isPet = primaryProfile?.tipo === 'pet';

  const eventTypes = [
    {
      id: 'treatment',
      title: 'Tratamento contínuo',
      description: isPet ? 'Fisioterapia, controle de dor, etc.' : 'Fisioterapia, hemodiálise, etc.',
      icon: 'Hospital',
      color: Neo.colors.primary[600],
      screen: 'AddTreatment',
    },
    {
      id: 'appointment',
      title: 'Consulta',
      description: isPet ? 'Agendamento com veterinário' : 'Agendamento com médico',
      icon: 'Calendar',
      color: Neo.colors.secondary[500],
      screen: 'AddAppointment',
    },
    {
      id: 'exam',
      title: 'Exame',
      description: isPet ? 'Raio-x, ultrassom, sangue, etc.' : 'Ultrassom, raio-x, laboratoriais, etc.',
      icon: 'Clipboard',
      color: Neo.colors.primary[500],
      screen: 'AddExam',
    },
    {
      id: 'procedure',
      title: 'Procedimento',
      description: isPet ? 'Castração, limpeza de tártaro, etc.' : 'Endoscopia, colonoscopia, etc.',
      icon: 'Health',
      color: Neo.colors.feedback.warning,
      screen: 'AddProcedure',
    },
  ];

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
              {t('headersFirst.novoEvento', 'Novo evento')}
            </H1>
            <Caption style={s.subtitle}>
              {t('headersFirst.escolhaOTipoDeEventoQueDesejaAdicionar', 'Escolha o tipo de evento')}
            </Caption>
          </View>
        </View>

        <ScrollView
          style={s.content}
          contentContainerStyle={{ paddingBottom: 190 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.gridContainer}>
            {eventTypes.map(type => (
              <TouchableOpacity
                key={type.id}
                style={s.gridItem}
                onPress={() => navigation.navigate(type.screen)}
                activeOpacity={0.85}
              >
                <NeoCard variant="elevated" style={s.typeCard}>
                  <View style={[s.typeIcon, { backgroundColor: type.color + '20' }]}>
                    <NeoIcon name={type.icon} size={28} color={type.color} variant="Bold" />
                  </View>
                  <H3 style={s.typeTitle}>{type.title}</H3>
                  <Body style={s.typeDesc}>{type.description}</Body>
                </NeoCard>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
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

  // Content
  content: {
    flex: 1,
    paddingHorizontal: Neo.spacing.lg,
    paddingTop: 8,
  },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
  },
  typeCard: {
    alignItems: 'center',
    padding: 18,
    minHeight: 170,
    borderRadius: 18,
  },
  typeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    textAlign: 'center',
    letterSpacing: -0.2,
    marginBottom: 6,
  },
  typeDesc: {
    fontSize: 12,
    color: Neo.colors.neutral[600],
    textAlign: 'center',
    lineHeight: 16,
  },
});
