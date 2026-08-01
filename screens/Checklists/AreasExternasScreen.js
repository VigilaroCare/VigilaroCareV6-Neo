import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { areasExternas } from '../../data/areas_externas';
import { ChecklistService } from '../../services/ChecklistService';
import ProfileService from '../../services/ProfileService';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

// Mapeamento de IDs externos
const AMBIENTE_TO_AREA_EXTERNA = {
  backyard: ['quintal'],
  garden_farming: ['jardim', 'pomar', 'horta'],
  collective_areas: ['parquinho', 'condominio', 'quadra'],
  pool_safe: ['piscina'],
  workshop_tool: ['oficina', 'garagem'],
  storage_depot: ['deposito'],
};

const SKY = '#0EA5E9'; // accent secundário (consistente com Externas)

export default function AreasExternasScreen({ navigation }) {
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[800];

  const [checklistState, setChecklistState] = useState({});
  const [mapping, setMapping] = useState([]);
  const [activeResidenceId, setActiveResidenceId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const dadosFiltrados = useMemo(() => {
    let baseData = areasExternas;
    if (mapping && mapping.length > 0) {
      baseData = areasExternas.filter(area => {
        const mappedTerms = AMBIENTE_TO_AREA_EXTERNA[area.id];
        if (!mappedTerms) return true;
        return mappedTerms.some(term => mapping.includes(term));
      });
    }
    return baseData;
  }, [mapping]);

  useFocusEffect(
    useCallback(() => {
      loadChecklistStatus();
    }, [])
  );

  const loadChecklistStatus = async () => {
    const resId = await ProfileService.getActiveResidenceId();
    setActiveResidenceId(resId);

    const currentMapping = await ProfileService.getMapping();
    setMapping(currentMapping || []);

    if (!resId) return;

    const status = await ChecklistService.getAllState(resId);
    setChecklistState(status || {});
  };

  const getNativeAreaId = (areaId) => {
    return AMBIENTE_TO_AREA_EXTERNA[areaId]?.[0] || areaId;
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleSetStatus = async (areaId, itemText, status) => {
    if (!activeResidenceId) return;

    const nativeId = getNativeAreaId(areaId);
    const currentAreaState = checklistState[nativeId] || {};
    const currentState = currentAreaState[itemText];
    const newStatus = currentState === status ? null : status;

    const updatedState = {
      ...checklistState,
      [nativeId]: {
        ...currentAreaState,
        [itemText]: newStatus,
      },
    };
    setChecklistState(updatedState);
    if (newStatus !== null) Vibration.vibrate(10);

    await ChecklistService.saveItemState(nativeId, itemText, newStatus, activeResidenceId);
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const nativeId = getNativeAreaId(item.id);
    const areaState = checklistState[nativeId] || {};

    const taskItems = item.oQueFazer.filter(step => typeof step === 'string');
    const totalItems = taskItems.length;
    const naItems = taskItems.filter(step => areaState[step] === 'na').length;
    const checkedItems = taskItems.filter(step => areaState[step] === true).length;
    const validTotal = totalItems - naItems;
    const progress = validTotal > 0 ? checkedItems / validTotal : (naItems > 0 ? 1 : 0);
    const isComplete = progress === 1 && totalItems > 0;

    return (
      <NeoCard
        variant="elevated"
        style={[s.card, isExpanded && s.cardExpanded]}
      >
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          activeOpacity={0.85}
          style={s.cardHeader}
        >
          <View
            style={[
              s.iconBox,
              {
                backgroundColor: isComplete
                  ? Neo.colors.feedback.success + '26'
                  : isExpanded
                    ? SKY + '1F'
                    : 'rgba(255,255,255,0.6)',
              },
            ]}
          >
            <NeoIcon name={item.icone || 'House'} size={28} color={Neo.colors.primary[600]} variant="Bold" />
          </View>

          <View style={s.cardContent}>
            <Text style={[s.cardTitle, { color: textPrimary }]}>{item.titulo}</Text>
            <Text
              style={[
                s.cardSituation,
                isComplete && { color: Neo.colors.feedback.success, fontWeight: '700' },
              ]}
            >
              {isComplete ? 'Seguro' : `${Math.round(progress * 100)}% protegido`}
            </Text>
            <View style={s.progressTrack}>
              <View
                style={[
                  s.progressFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: isComplete ? Neo.colors.feedback.success : SKY,
                  },
                ]}
              />
            </View>
          </View>

          <View
            style={[
              s.chevronBox,
              isExpanded && { backgroundColor: SKY },
            ]}
          >
            <NeoIcon
              name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'}
              size={18}
              color={isExpanded ? '#FFF' : Neo.colors.neutral[600]}
              variant="Bold"
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={s.cardBody}>
            {/* VERIFICAÇÃO DE SEGURANÇA */}
            <View style={s.sectionContainer}>
              <View style={s.sectionHeader}>
                <NeoIcon name="ShieldTick" size={16} color={SKY} variant="Bold" />
                <Text style={[s.sectionLabel, { color: SKY }]}>
                  {t('headersFirst.vERIFICAODESEGURANA', 'VERIFICAÇÃO DE SEGURANÇA')}
                </Text>
              </View>

              <View style={s.questionsContainer}>
                {item.oQueFazer.map((step, index) => {
                  if (typeof step === 'object' && step.header) {
                    return (
                      <Text key={index} style={s.subListHeader}>
                        {step.header}
                      </Text>
                    );
                  }

                  const state = checklistState[nativeId]?.[step];

                  return (
                    <View key={index} style={s.questionCard}>
                      <Text style={[s.questionText, { color: textBody }]}>{step}</Text>

                      <View style={s.responseRow}>
                        <TouchableOpacity
                          style={[
                            s.responseBtn,
                            state === true && {
                              backgroundColor: Neo.colors.feedback.success,
                              borderColor: Neo.colors.feedback.success,
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, true)}
                        >
                          <Text
                            style={[
                              s.responseBtnText,
                              state === true && { color: '#FFF' },
                            ]}
                          >
                            {t('headersFirst.sIM', 'SIM')}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            s.responseBtn,
                            state === false && {
                              backgroundColor: Neo.colors.feedback.error,
                              borderColor: Neo.colors.feedback.error,
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, false)}
                        >
                          <Text
                            style={[
                              s.responseBtnText,
                              state === false && { color: '#FFF' },
                            ]}
                          >
                            {t('headersFirst.nO', 'NÃO')}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            s.responseBtn,
                            state === 'na' && {
                              backgroundColor: Neo.colors.neutral[500],
                              borderColor: Neo.colors.neutral[500],
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, 'na')}
                        >
                          <Text
                            style={[
                              s.responseBtnText,
                              state === 'na' && { color: '#FFF' },
                            ]}
                          >
                            {t('headersFirst.nA', 'N/A')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* EVITE */}
            {(item.oQueNaoFazer || []).length > 0 && (
              <View style={s.sectionContainer}>
                <View style={s.sectionHeader}>
                  <NeoIcon
                    name="CloseCircle"
                    size={16}
                    color={Neo.colors.feedback.error}
                    variant="Bold"
                  />
                  <Text style={[s.sectionLabel, { color: Neo.colors.feedback.error }]}>
                    {t('headersFirst.eVITE', 'EVITE')}
                  </Text>
                </View>
                {item.oQueNaoFazer.map((step, index) => (
                  <View key={index} style={s.stepRow}>
                    <View style={s.bulletError} />
                    <Text style={[s.stepText, { color: textBody }]}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* QUANDO CHAMAR AJUDA */}
            {item.quandoChamarAjuda && (
              <View
                style={[
                  s.alertBox,
                  {
                    backgroundColor: SKY + '15',
                    borderLeftWidth: 3,
                    borderLeftColor: SKY,
                  },
                ]}
              >
                <View style={s.alertHeader}>
                  <NeoIcon name="InfoCircle" size={18} color={SKY} variant="Bold" />
                  <Text style={[s.alertTitle, { color: SKY }]}>
                    {t('headersFirst.aTENO', 'ATENÇÃO')}
                  </Text>
                </View>
                <Text style={[s.alertText, { color: Neo.colors.neutral[800] }]}>
                  {item.quandoChamarAjuda}
                </Text>
              </View>
            )}
          </View>
        )}
      </NeoCard>
    );
  };

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

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
            <H1 style={s.title}>{t('headersFirst.ReasExternas', 'Áreas externas')}</H1>
            <Caption style={s.subtitle}>
              {t('headersFirst.quintalPiscinaELazer', 'Quintal, piscina e lazer')}
            </Caption>
          </View>
        </View>

        <FlatList
          data={dadosFiltrados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
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

  // List
  listContent: {
    padding: Neo.spacing.lg,
    paddingTop: 4,
    paddingBottom: 190,
  },

  // Card
  card: {
    marginBottom: 12,
    borderRadius: 20,
    padding: 0,
    overflow: 'hidden',
  },
  cardExpanded: {
    borderWidth: 1,
    borderColor: SKY + '40',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  cardSituation: {
    fontSize: 12.5,
    color: Neo.colors.neutral[600],
    fontWeight: '600',
    marginBottom: 6,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: 2,
    overflow: 'hidden',
    maxWidth: 120,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Card body (expanded)
  cardBody: {
    paddingHorizontal: 14,
    paddingTop: 4,
    paddingBottom: 14,
  },
  sectionContainer: {
    marginTop: 14,
    backgroundColor: 'rgba(255,255,255,0.55)',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  subListHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: SKY,
    marginTop: 6,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // Questions
  questionsContainer: {
    gap: 10,
  },
  questionCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  questionText: {
    fontSize: 14,
    color: Neo.colors.neutral[900],
    fontWeight: '500',
    marginBottom: 10,
    lineHeight: 20,
  },
  responseRow: {
    flexDirection: 'row',
    gap: 8,
  },
  responseBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  responseBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: Neo.colors.neutral[600],
    letterSpacing: 0.4,
  },

  // Steps avoid
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletError: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Neo.colors.feedback.error,
    marginTop: 7,
    marginRight: 10,
  },
  stepText: {
    fontSize: 14,
    color: Neo.colors.neutral[800],
    flex: 1,
    lineHeight: 20,
  },

  // Alert
  alertBox: {
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  alertTitle: {
    fontWeight: '800',
    fontSize: 13.5,
  },
  alertText: {
    fontSize: 13,
    lineHeight: 19,
  },
});
