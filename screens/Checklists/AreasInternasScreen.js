import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Vibration,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import NeoIcon from '../../components/NeoIcon';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { Typography } from '../../utils/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { areasInternas } from '../../data/areas_internas';
import { ChecklistService } from '../../services/ChecklistService';
import ProfileService from '../../services/ProfileService';

// Mapeamento de IDs de ambiente para IDs de áreas internas
const AMBIENTE_TO_AREA = {
  kitchen: ['cozinha'],
  bathroom: ['banheiro'],
  living_room: ['sala'],
  bedroom: ['quarto', 'quartos'],
  baby_room: ['quarto_bebe', 'quarto'],
  laundry: ['area_servico', 'lavanderia'],
  garage: ['garagem'],
  garden: ['jardim', 'quintal'],
  pool: ['piscina'],
  stairs: ['escadas'],
  balcony: ['varanda', 'sacada'],
  // Novos mapeamentos para filtrar o AreasInternas
  dining_room: ['copa', 'sala'],
  pantry: ['despensa'],
  bedroom_kids: ['quarto_crianca'],
  bedroom_teen: ['quarto_adulto', 'quarto_crianca'],
  bedroom_adult: ['quarto_adulto'],
  bedroom_senior: ['quarto_idoso'],
  gas_central: ['central_gas'],
  balcony_indoor: ['varanda'],
};

export default function AreasInternasScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [activeResidenceId, setActiveResidenceId] = useState(null);
  const [mapping, setMapping] = useState([]); // Array de IDs mapeados
  
  const [expandedId, setExpandedId] = useState(null);
  const [checklistState, setChecklistState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Helper para traduzir ID da interface (inglês) para o ID do banco de dados (português)
  const getNativeAreaId = (areaId) => {
    return AMBIENTE_TO_AREA[areaId]?.[0] || areaId;
  };

  const dadosFiltrados = useMemo(() => {
    let baseData = areasInternas;

    // 1. Filtrar pelo mapeamento estrutural da casa
    if (mapping && mapping.length > 0) {
      baseData = areasInternas.filter(area => {
        const mappedTerms = AMBIENTE_TO_AREA[area.id];
        if (!mappedTerms) return true;
        return mappedTerms.some(term => mapping.includes(term));
      });
    }

    // 2. Filtrar por parâmetro de navegação (se houver)
    if (!ambienteId) return baseData;

    // ambienteId vem em português (ex: 'cozinha'). Vamos encontrar quais áreas (ex: 'kitchen') mapeiam para ele.
    const filtered = baseData.filter(area => {
      const mappedTerms = AMBIENTE_TO_AREA[area.id] || [];
      return mappedTerms.includes(ambienteId);
    });

    return filtered.length > 0 ? filtered : baseData;
  }, [ambienteId, mapping]);

  // BUG FIX #6: useFocusEffect para recarregar ao trocar residência
  useFocusEffect(
    useCallback(() => {
      loadChecklistStatus();
    }, [])
  );

  const loadChecklistStatus = async () => {
    try {
      setIsLoading(true);
      
      // BUG-02 FIX: Buscar ID ativamente via ProfileService
      const resId = await ProfileService.getActiveResidenceId();
      setActiveResidenceId(resId);
      
      // FIX NOVO: Carrega o mapeamento do usuário para ocultar cômodos não existentes
      const currentMapping = await ProfileService.getMapping();
      setMapping(currentMapping || []);
      
      if (!resId) {
        if (__DEV__) console.log('[AreasInternas] Sem residência ativa');
        return;
      }

      // BUG FIX #2: Passar activeResidenceId ao ChecklistService
      const status = await ChecklistService.getAllState(resId);
      setChecklistState(status || {});
    } catch (error) {
      if (__DEV__) console.error('[AreasInternas] Erro ao carregar checklist:', error);
      Alert.alert('Erro', 'Falha ao carregar checklist. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-expandir se houver apenas 1 item
  React.useEffect(() => {
    if (dadosFiltrados.length === 1) {
      setExpandedId(dadosFiltrados[0].id);
    }
  }, [dadosFiltrados]);

  const tituloDinamico = ambienteId
    ? `Riscos: ${ambienteId.charAt(0).toUpperCase() + ambienteId.slice(1)}`
    : 'Áreas Internas';

  const flatListRef = useRef(null);

  const toggleExpand = (id) => {
    const isExpanding = expandedId !== id;
    setExpandedId(isExpanding ? id : null);

    if (isExpanding) {
      const index = dadosFiltrados.findIndex(item => item.id === id);
      if (index !== -1) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0,
          });
        }, 200);
      }
    }
  };

  const handleSetStatus = async (areaId, itemText, status) => {
    if (!activeResidenceId) {
      Alert.alert('Erro', 'Residência não selecionada');
      return;
    }

    const nativeId = getNativeAreaId(areaId);
    const currentAreaState = checklistState[nativeId] || {};

    // Se clicar no que já está, remove (toggle)
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

    try {
      // Grava no banco usando o ID traduzido (ex: 'cozinha') para integrar com o ScoreService
      await ChecklistService.saveItemState(
        nativeId,
        itemText,
        newStatus,
        activeResidenceId
      );
    } catch (error) {
      if (__DEV__) console.error('[AreasInternas] Erro ao salvar status:', error);
      Alert.alert('Erro', 'Falha ao salvar resposta. Tente novamente.');
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const nativeId = getNativeAreaId(item.id);
    const areaState = checklistState[nativeId] || {};
    const totalItems = item.oQueFazer.length;

    // Contagens
    const oQueFazerSafe = item.oQueFazer || [];
    const naItems = oQueFazerSafe.filter(step => areaState[step] === 'na').length;
    const checkedItems = oQueFazerSafe.filter(step => areaState[step] === true)
      .length;
    const validTotal = totalItems - naItems;

    // Evitar divisão por zero
    const progress =
      validTotal > 0 ? checkedItems / validTotal : naItems > 0 ? 1 : 0;

    return (
      <TouchableOpacity
        style={[styles.card, isExpanded && styles.cardExpanded]}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          {/* BUG FIX #5: Usar Colors.* em vez de hardcode */}
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: isExpanded
                  ? Neo.colors.feedback.success + '20'
                  : Neo.colors.neutral[100],
              },
            ]}
          >
            <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>

            <Text style={styles.cardSituation}>
              {progress === 1
                ? 'Seguro ✅'
                : `${Math.round(progress * 100)}% protegido`}
            </Text>

            {/* Mini progress bar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <View
                style={{
                  flex: 1,
                  height: 4,
                  backgroundColor: Neo.colors.neutral[300],
                  borderRadius: 2,
                  marginRight: 8,
                  maxWidth: 100,
                }}
              >
                <View
                  style={{
                    width: `${progress * 100}%`,
                    height: '100%',
                    backgroundColor:
                      progress === 1 ? Neo.colors.feedback.success : Neo.colors.feedback.success + '80',
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.chevronBox,
              isExpanded && { backgroundColor: Neo.colors.feedback.success },
            ]}
          >
            <NeoIcon
              name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'}
              size={20}
              color={isExpanded ? Neo.colors.neutral.white : Neo.colors.neutral[400]}
            />
          </View>
        </View>

        {isExpanded && (
          <View style={styles.cardBody}>
            {/* O QUE FAZER (CHECKLIST INTERATIVO) */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <NeoIcon
                  name="ShieldTick"
                  size={20}
                  color={Neo.colors.primary[500]}
                  variant="Bold"
                />
                <Text style={[styles.sectionLabel, { color: Neo.colors.primary[500] }]}>
                  VERIFICAÇÃO DE SEGURANÇA
                </Text>
              </View>

              <View style={styles.questionsContainer}>
                {(item.oQueFazer || []).map((step, index) => {
                  const state = checklistState[nativeId]?.[step];

                  return (
                    <View key={index} style={styles.questionCard}>
                      <Text style={styles.questionText}>{step}</Text>

                      <View style={styles.responseRow}>
                        {/* Botão SIM */}
                        <TouchableOpacity
                          style={[
                            styles.responseBtn,
                            state === true && {
                              backgroundColor: Neo.colors.feedback.success,
                              borderColor: Neo.colors.feedback.success,
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, true)}
                        >
                          <Text
                            style={[
                              styles.responseBtnText,
                              state === true && { color: Neo.colors.neutral.white },
                            ]}
                          >
                            SIM
                          </Text>
                        </TouchableOpacity>

                        {/* Botão NÃO */}
                        <TouchableOpacity
                          style={[
                            styles.responseBtn,
                            state === false && {
                              backgroundColor: Neo.colors.feedback.error,
                              borderColor: Neo.colors.feedback.error,
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, false)}
                        >
                          <Text
                            style={[
                              styles.responseBtnText,
                              state === false && { color: Neo.colors.neutral.white },
                            ]}
                          >
                            NÃO
                          </Text>
                        </TouchableOpacity>

                        {/* Botão N/A */}
                        <TouchableOpacity
                          style={[
                            styles.responseBtn,
                            state === 'na' && {
                              backgroundColor: Neo.colors.neutral[500],
                              borderColor: Neo.colors.neutral[500],
                            },
                          ]}
                          onPress={() => handleSetStatus(item.id, step, 'na')}
                        >
                          <Text
                            style={[
                              styles.responseBtnText,
                              state === 'na' && { color: Neo.colors.neutral.white },
                            ]}
                          >
                            N/A
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* O QUE NÃO FAZER (MANTIDO INFORMATIVO) */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <NeoIcon
                  name="CloseCircle"
                  size={20}
                  color={Neo.colors.feedback.error}
                />
                <Text style={[styles.sectionLabel, { color: Neo.colors.feedback.error }]}>
                  EVITE
                </Text>
              </View>
              {(item.oQueNaoFazer || []).map((step, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.bulletError} />
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>

            {/* ALERTAS */}
            {item.alertas &&
              item.alertas.map((alerta, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.alertBox,
                    {
                      backgroundColor:
                        alerta.tipo === 'warning'
                          ? Neo.colors.feedback.warning + '15'
                          : Neo.colors.feedback.error + '15',
                    },
                  ]}
                >
                  <View style={styles.alertHeader}>
                    <NeoIcon
                      name={
                        alerta.tipo === 'warning' ? 'Warning2' : 'DangerCircle'
                      }
                      size={20}
                      color={
                        alerta.tipo === 'warning' ? Neo.colors.feedback.warning : Neo.colors.feedback.error
                      }
                    />
                    <Text
                      style={[
                        styles.alertTitle,
                        {
                          color:
                            alerta.tipo === 'warning'
                              ? Neo.colors.feedback.warning
                              : Neo.colors.feedback.error,
                        },
                      ]}
                    >
                      {alerta.titulo}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.alertText,
                      {
                        color:
                          alerta.tipo === 'warning'
                            ? Neo.colors.feedback.warning
                            : Neo.colors.feedback.error,
                      },
                    ]}
                  >
                    {alerta.descricao}
                  </Text>
                </View>
              ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={[Neo.colors.primary[500], Neo.colors.primary[700]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <NeoIcon
            name="ArrowLeft"
            size={24}
            color={Neo.colors.neutral.white}
            variant="Bold"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{tituloDinamico}</Text>
        <Text style={styles.headerSubtitle}>
          Verifique os riscos por ambiente
        </Text>
      </View>

      {/* LISTA DE ÁREAS */}
      <FlatList
        ref={flatListRef}
        data={dadosFiltrados}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        scrollEventThrottle={16}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Neo.colors.neutral[100],
  },
  header: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: Neo.spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Neo.shadows.md,
  },
  backBtn: {
    marginBottom: Neo.spacing.md,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Neo.colors.neutral.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  listContent: {
    padding: Neo.spacing.lg,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: Neo.colors.neutral.white,
    borderRadius: Neo.radius.lg,
    marginBottom: Neo.spacing.md,
    ...Neo.shadows.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    elevation: 0, // [FIX] Previne moldura fantasma Android
  },
  cardExpanded: {
    borderColor: Neo.colors.feedback.success,
    ...Neo.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Neo.spacing.md,
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Neo.spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: 'bold',
    color: Neo.colors.neutral[900],
    marginBottom: 4,
  },
  cardSituation: {
    fontSize: Typography.sizes.sm,
    color: Neo.colors.neutral[500],
    fontFamily: Typography.fontFamily.medium,
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Neo.colors.neutral[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    padding: Neo.spacing.lg,
    paddingTop: 0,
    backgroundColor: Neo.colors.neutral.white,
  },
  sectionContainer: {
    marginTop: Neo.spacing.lg,
    backgroundColor: Neo.colors.neutral[100],
    padding: Neo.spacing.md,
    borderRadius: Neo.radius.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Neo.colors.neutral[500],
    marginRight: 8,
    width: 20,
  },
  bulletError: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Neo.colors.feedback.error,
    marginTop: 8,
    marginRight: 12,
  },
  stepText: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    flex: 1,
    lineHeight: 22,
  },
  alertBox: {
    padding: Neo.spacing.md,
    borderRadius: Neo.radius.md,
    marginTop: Neo.spacing.lg,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  alertTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  alertText: {
    fontSize: 14,
    lineHeight: 20,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Neo.colors.neutral[200],
  },
  checkText: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  questionsContainer: {
    gap: 16,
  },
  questionCard: {
    backgroundColor: Neo.colors.neutral.white,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Neo.colors.neutral[300],
  },
  questionText: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 22,
  },
  responseRow: {
    flexDirection: 'row',
    gap: 8,
  },
  responseBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Neo.colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Neo.colors.neutral[100],
  },
  responseBtnText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Neo.colors.neutral[500],
  },
  nextButton: {
    marginTop: Neo.spacing.xl,
    backgroundColor: Neo.colors.primary[500],
    borderRadius: Neo.radius.lg,
    padding: Neo.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Neo.shadows.md,
  },
  nextButtonLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nextButtonTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});