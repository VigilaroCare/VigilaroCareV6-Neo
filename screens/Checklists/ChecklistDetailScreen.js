import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHECKLISTS, AMBIENTES } from '../../data/mapeamento_dados';
import { getArticleById } from '../../data/SafetyArticlesDB';
import { isItemRelevant, getRoomChecklistStructure, isAreaRelevant, getDynamicAreaName } from '../../utils/ProfileFilterEngine';
import { ChecklistService } from '../../services/ChecklistService';
import ProfileService from '../../services/ProfileService';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBg from '../../components/AppBackground';
import TriColorBar from '../../components/TriColorBar';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import NeoAlert from '../../utils/NeoAlert';

const ChecklistDetailScreen = ({ route, navigation }) => {
  const { roomId, roomName, roomIcon, roomColor, categoryFilter, sequentialRooms, currentRoomIndex, fullChecklist } = route.params || {};

  const [nextRoomData, setNextRoomData] = useState(null);
  const [nextTargetIndex, setNextTargetIndex] = useState(-1);
  const [roomList, setRoomList] = useState([]);
  const [displayRoomName, setDisplayRoomName] = useState(roomName);

  // Removida a lógica síncrona do route params porque Precisamos carregar o estado salvo para saber quais próximos estão pendentes
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTip, setActiveTip] = useState(null);
  const [tipVisible, setTipVisible] = useState(true);
  const [activeResidenceId, setActiveResidenceId] = useState(null);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Carrega a residência ativa UMA VEZ antes de carregar o checklist
    ProfileService.getActiveResidenceId().then(id => {
      setActiveResidenceId(id);
    });
    loadChecklistItems();
    loadSmartTip();
  }, [roomId, categoryFilter]);

  const loadSmartTip = () => {
    // Mapeamento de Dicas Contextuais (Smart Tips)
    const tipsMap = {
      'cozinha': ['panela_pressao', 'seguranca_cozinha'],
      'banheiro': ['choques_eletricos', 'afogamento_crianca'], // Fix afogamento_crianca key
      'area_servico': ['choques_eletricos'],
      'quintal': ['animais_peconhentos'],
      'jardim_horta': ['animais_peconhentos'],
      'varanda': ['redes_protecao'],
      'sala': ['choques_eletricos', 'redes_protecao'],
      'quarto_crianca': ['redes_protecao', 'brinquedos_perigosos'],
      'quarto_adulto': ['intoxicacao_medicamentos'],
      'quarto_idoso': ['quedas_idosos', 'medicacao_idoso'],
      'kits_prontidao': ['kit_emergencia_montagem'], // Fix kit tip
      'despensa': ['intoxicacao_medicamentos'],
      'geral': ['choques_eletricos']
    };

    const possibleTips = tipsMap[roomId] || tipsMap['geral'];
    if (possibleTips && possibleTips.length > 0) {
      // Escolhe uma dica aleatória relevante
      const randomId = possibleTips[Math.floor(Math.random() * possibleTips.length)];
      const article = getArticleById(randomId);
      if (article) setActiveTip(article);
    }
  };

  const loadChecklistItems = async () => {
    try {
      if (!roomId) {
        NeoAlert.alert('Erro', t('checklists.roomNotFound'));
        navigation.goBack();
        return;
      }

      // 1. Gerar itens frescos do Código (Garante que novos itens apresentem os mais recentes)
      const profiles = await ProfileService.getPerfis();
      const moradia = await ProfileService.getMoradia();
      const mapping = await ProfileService.getMapping() || [];
      const freshItems = generateDefaultItems(roomId, profiles, moradia, mapping);

      // Ajuste de nome dinâmico para Salas Integradas e Gás/Botijão
      if (roomId === 'sala' && mapping.includes('sala_estar') && mapping.includes('sala_jantar')) {
        setDisplayRoomName(t('checklists.integratedLivingDining', 'Sala de Estar e Jantar (Integradas)'));
      } else if (roomId === 'central_gas') {
        setDisplayRoomName(getDynamicAreaName(roomId, roomName, mapping, t));
      } else {
        setDisplayRoomName(roomName);
      }

      // 2. Carregar estado salvo via ChecklistService (isolado por residência)
      const resId = await ProfileService.getActiveResidenceId();
      setActiveResidenceId(resId);
      const storedItems = await ChecklistService.getAllState(resId);
      const savedRoomItems = storedItems[roomId];

      if (savedRoomItems && Array.isArray(savedRoomItems)) {
        // 3. Merge: Atualizar status dos itens frescos com o que foi salvo
        const mergedItems = freshItems.map(item => {
          const saved = savedRoomItems.find(s => s.text === item.text);
          if (saved) {
            return {
              ...item,
              status: saved.status,
              checked: saved.checked === true
            };
          }
          return item;
        });

        if (categoryFilter) {
          setItems(mergedItems.filter(i => i.category === categoryFilter));
        } else {
          setItems(mergedItems);
        }

      } else {
        setItems(freshItems);
      }

      // --- CALCULATE NEXT AUTOMATIC ROOM ---
      // 1. Pegar lista base (ou passada via params ou gerar do AMBIENTES filtrado pelo mapeamento)
      let currentRoomList = sequentialRooms;
      if (!currentRoomList) {
        let allAmbs = AMBIENTES;
        if (!fullChecklist) {
          allAmbs = allAmbs.filter(a => isAreaRelevant(a, moradia, profiles, mapping) || a.id === 'geral');
        }
        
        currentRoomList = allAmbs.map(a => ({
          roomId: a.id,
          roomName: a.nome,
          roomColor: a.cor,
          roomIcon: a.emoji,
          fullChecklist: fullChecklist
        }));
      }
      setRoomList(currentRoomList);

      // 2. Encontrar o próximo ambiente que AINDA NÃO TEM 100% RESPONDIDO
      let foundNext = null;
      let foundIndex = -1;

      // Procura a partir da sala atual se index for conhecido, senão do começo
      const startIndex = currentRoomIndex !== undefined ? currentRoomIndex + 1 : 0;

      // Look forward
      for (let i = startIndex; i < currentRoomList.length; i++) {
        const potentialRoom = currentRoomList[i];
        
        // Se o cômodo potencial não tiver nenhum item relevante para o perfil/casa atual, pula
        const potentialFreshItems = generateDefaultItems(potentialRoom.roomId, profiles, moradia, mapping);
        if (potentialFreshItems.length === 0) {
          continue;
        }

        const stateOfPotential = storedItems[potentialRoom.roomId] || [];

        // Conta quantos itens frescos já foram respondidos
        const answeredCount = potentialFreshItems.filter(item => {
          const saved = stateOfPotential.find(s => s.text === item.text);
          return saved && saved.status && ['conforme', 'risco', 'na'].includes(saved.status);
        }).length;

        const hasUnanswered = answeredCount < potentialFreshItems.length;

        if (hasUnanswered) {
          foundNext = potentialRoom;
          foundIndex = i;
          break;
        }
      }

      setNextRoomData(foundNext);
      setNextTargetIndex(foundIndex);

    } catch (error) {
      console.error('Erro ao carregar checklist:', error);
      setItems(generateDefaultItems(roomId, [], {}, []));
    } finally {
      setLoading(false);
    }
  };


  const generateDefaultItems = (roomId, profiles, moradia, mapping = []) => {
    const data = getRoomChecklistStructure(roomId, profiles, moradia, mapping);
    if (!data || !data.categorias) return [];

    const flatItems = [];
    let counter = 1;

    // Filter categories if a specific filter is provided (e.g., specific Kit)
    const categoriasToProcess = categoryFilter
      ? data.categorias.filter(cat => cat.nome === categoryFilter)
      : data.categorias;

    categoriasToProcess.forEach((categoria) => {
      if (categoria.itens) {
        categoria.itens.forEach((item) => {
          // FILTRAGEM POR TAG (ProfileFilterEngine)
          // Se for fullChecklist (Modo Completo), ignora a filtragem e mostra tudo
          if (!fullChecklist && !isItemRelevant(item, profiles, moradia)) {
            return;
          }

          flatItems.push({
            id: `${roomId}-${categoryFilter ? categoryFilter.substring(0, 3) : ''}-${counter++}`,
            text: item.titulo,
            category: categoria.nome,
            priority: mapTypeToPriority(item.tipo),
            checked: false,
            itemObj: item,
            categoryObj: categoria
          });
        });
      }
    });

    return flatItems;
  };

  const mapTypeToPriority = (type) => {
    switch (type) {
      case 'perigo': return 'high';
      case 'sugestão': return 'low';
      case 'normal':
      default: return 'medium';
    }
  };

  const handleSetStatus = async (itemId, newStatus) => {
    try {
      // 1. Update Local State (Visual)
      const updatedLocalItems = items.map((item) => {
        if (item.id === itemId) {
          const finalStatus = item.status === newStatus ? null : newStatus;
          return {
            ...item,
            status: finalStatus,
            checked: finalStatus === 'conforme'
          };
        }
        return item;
      });
      setItems(updatedLocalItems);

      // 2. Ler lista COMPLETA da área (pode ter outras categorias)
      const resId = activeResidenceId || await ProfileService.getActiveResidenceId();
      const allState = await ChecklistService.getAllState(resId);
      let currentRoomFullList = allState[roomId] || [];

      const changedItem = updatedLocalItems.find(i => i.id === itemId);

      // Atualiza ou adiciona na lista completa
      const indexGlobal = currentRoomFullList.findIndex(
        i => i.id === itemId || i.text === changedItem?.text
      );

      if (indexGlobal >= 0) {
        currentRoomFullList[indexGlobal] = changedItem;
      } else {
        if (changedItem) currentRoomFullList.push(changedItem);
      }

      // 3. Salva via ChecklistService (isolado por residência)
      await ChecklistService.saveRoomState(roomId, currentRoomFullList, resId);

    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#EF4444'; // Red
      case 'medium': return '#F59E0B'; // Amber
      case 'low': return '#10B981'; // Emerald
      default: return '#9CA3AF';
    }
  };

  const mapAllToNA = async () => {
    NeoAlert.alert(
      t('checklists.naAlertTitle'),
      t('checklists.naAlertDesc'),
      [
        { text: t('health.cancel'), style: "cancel" },
        {
          text: t('checklists.confirmNA'),
          style: "default",
          onPress: async () => {
            // Marca todos no estado local
            const updatedItems = items.map(item => ({
              ...item,
              status: 'na',
              checked: false
            }));
            setItems(updatedItems);

            try {
              const resId = activeResidenceId || await ProfileService.getActiveResidenceId();
              const allState = await ChecklistService.getAllState(resId);
              let currentRoomFullList = allState[roomId] || [];

              // Atualiza global
              updatedItems.forEach(changed => {
                const idx = currentRoomFullList.findIndex(i => i.id === changed.id || i.text === changed.text);
                if (idx >= 0) currentRoomFullList[idx] = changed;
                else currentRoomFullList.push(changed);
              });

              await ChecklistService.saveRoomState(roomId, currentRoomFullList, resId);

              // AUTO-ADVANCE logic
              if (nextRoomData) {
                navigation.replace('ChecklistDetail', {
                  ...nextRoomData,
                  sequentialRooms: roomList,
                  currentRoomIndex: nextTargetIndex
                });
              } else {
                navigation.navigate('Relatorios');
              }
            } catch (e) {
              console.error("Erro no mapAllToNA:", e);
            }
          }
        }
      ]
    );
  };

  const completedCount = items.filter((item) => item.status === 'conforme' || item.checked === true).length;
  const naCount = items.filter((item) => item.status === 'na').length;
  const effectiveTotal = items.length - naCount;
  const totalCount = effectiveTotal;
  const percentage = effectiveTotal > 0 ? Math.round((completedCount / effectiveTotal) * 100) : 0;

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="light" backgroundColor={roomColor || '#8B5CF6'} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('checklists.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <AppBg variant="subtle">
      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar style="dark" />

        {/* Modern Neo Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.headerIcon}>{roomIcon || '🏠'}</Text>
                <H2 style={[styles.headerTitle, { color: Neo.colors.neutral[800], marginLeft: 8 }]} numberOfLines={1}>{displayRoomName || t('checklists.room')}</H2>
            </View>
            {categoryFilter && (
              <Small style={styles.headerSubtitle} numberOfLines={1}>{t('checklists.category')} {categoryFilter}</Small>
            )}
          </View>
          
          <TouchableOpacity
            style={{ 
                paddingHorizontal: 12, paddingVertical: 8, 
                backgroundColor: 'rgba(107, 114, 128, 0.1)', 
                borderRadius: 12, borderWidth: 1, borderColor: 'rgba(107, 114, 128, 0.2)' 
            }}
            onPress={mapAllToNA}
          >
            <Small style={{ color: Neo.colors.neutral[600], fontWeight: 'bold', textAlign: 'center' }}>{t('checklists.notApplicable')}</Small>
          </TouchableOpacity>
        </View>

      {/* Progress + Tri-Color Bar */}
      <View style={[styles.progressContainer, { padding: 12, marginBottom: 12 }]}>
        <View style={styles.progressInfo}>
          <Small style={{ color: '#666', fontWeight: '600' }}>
            {completedCount}/{totalCount} {t('checklists.verified')}
          </Small>
          <Small style={{ fontWeight: 'bold', color: percentage === 100 ? '#10B981' : roomColor || '#8B5CF6' }}>{percentage}%</Small>
        </View>
        {(() => {
          let baixo = 0, atencao = 0, critico = 0;
          items.forEach(item => {
            const status = item.status;
            if (!status || status === 'na') return;
            if (status === 'conforme' || item.checked === true) { baixo++; }
            else if (status === 'risco') { item.critico ? critico++ : atencao++; }
          });
          return <TriColorBar baixo={baixo} atencao={atencao} critico={critico} height={8} showLabels={completedCount > 0} style={{ marginTop: 6 }} />;
        })()}
      </View>

      {/* --- SMART TIP (Banner Compacto) --- */}
      {activeTip && tipVisible && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginHorizontal: 20, marginBottom: 10 }}
          onPress={() => navigation.navigate('ConceitoDetail', {
            conceito: {
              titulo: activeTip.title,
              conteudo: activeTip.content,
              descricao: activeTip.summary,
              emoji: '📖',
              color: '#0EA5E9',
              bg: '#E0F2FE',
              tags: activeTip.tags
            }
          })}
        >
          <NeoCard variant="glass" padding={10} style={{
            backgroundColor: '#EFF8FF',
            borderColor: '#DBEAFE',
            borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#0EA5E9', alignItems: 'center', justifyContent: 'center' }}>
              <NeoIcon name="LampOn" size={16} color="#FFF" variant="Bold" />
            </View>
            <View style={{ flex: 1 }}>
              <Small style={{ fontWeight: 'bold', color: '#0C4A6E', lineHeight: 16 }} numberOfLines={1}>{activeTip.title}</Small>
              <Small style={{ color: '#64748B', fontSize: 11, lineHeight: 14, marginTop: 1 }} numberOfLines={1}>{activeTip.summary}</Small>
            </View>
            <TouchableOpacity onPress={() => setTipVisible(false)} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} style={{ padding: 4 }}>
              <NeoIcon name="CloseSquare" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </NeoCard>
        </TouchableOpacity>
      )}

      {/* Grid Layout Checklist (Mini Bento Cards) */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 190 }}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 40, paddingHorizontal: 24 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <NeoIcon name="TickCircle" size={40} color={Neo.colors.feedback.success} variant="Bold" />
            </View>
            <H3 style={{ color: Neo.colors.neutral[900], marginBottom: 8, textAlign: 'center' }}>{t('checklists.areaCompleted')}</H3>
            <Body style={{ color: Neo.colors.neutral[500], textAlign: 'center', lineHeight: 22 }}>
              {t('checklists.areaCleanInfo')}
            </Body>
          </View>
        ) : (
          items.filter(i => !categoryFilter || i.category === categoryFilter).map((item) => (
            <NeoCard variant="glass"
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 14,
                marginBottom: 8,
                marginHorizontal: 16,
                backgroundColor: '#FFF',
                borderRadius: 18,
                borderWidth: 1,
                borderColor: '#F3F4F6',
                ...Neo.shadows.sm
              }}
            >
              {/* Left: Priority indicator */}
              <View style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, backgroundColor: getPriorityColor(item.priority), marginRight: 12 }} />

              {/* Center: Content */}
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Small style={{ color: '#9CA3AF', fontWeight: '700', fontSize: 9, letterSpacing: 0.6, marginBottom: 3 }}>
                    {item.categoryObj ? t_field(item.categoryObj, 'nome').toUpperCase() : item.category.toUpperCase()}
                </Small>
                <Body style={{ color: '#1F2937', lineHeight: 20, fontWeight: '600', fontSize: 15 }}>
                  {item.itemObj ? t_field(item.itemObj, 'titulo') : item.text}
                </Body>
                {item.priority === 'high' && (
                  <View style={{ flexDirection: 'row', marginTop: 4 }}>
                    <View style={{ backgroundColor: '#FEF2F2', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 4, borderWidth: 1, borderColor: '#FEE2E2' }}>
                      <Small style={{ color: '#B91C1C', fontWeight: 'bold', fontSize: 8 }}>{t('checklists.maxPriority')}</Small>
                    </View>
                  </View>
                )}
              </View>

              {/* Right: Toggles (S/N/NA) — Compact */}
              <View style={{ alignItems: 'center', gap: 4 }}>
                <View style={{ flexDirection: 'row', gap: 6 }}>
                  <TouchableOpacity
                    onPress={() => handleSetStatus(item.id, 'conforme')}
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
                    onPress={() => handleSetStatus(item.id, 'risco')}
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
                  onPress={() => handleSetStatus(item.id, 'na')}
                  style={{
                    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                    backgroundColor: item.status === 'na' ? '#6B7280' : '#F1F5F9',
                    borderWidth: item.status === 'na' ? 0 : 1,
                    borderColor: item.status === 'na' ? 'transparent' : '#E2E8F0'
                  }}
                  activeOpacity={0.7}
                >
                  <Small style={{ fontSize: 9, fontWeight: '800', color: item.status === 'na' ? '#FFF' : '#94A3B8' }}>{t('headersFirst.nA', 'N/A')}</Small>
                </TouchableOpacity>
              </View>
            </NeoCard>
          ))
        )}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: roomColor || '#8B5CF6', ...Neo.shadows.md, shadowColor: roomColor || '#8B5CF6' }]}
          onPress={() => {
            if (nextRoomData) {
              navigation.replace('ChecklistDetail', {
                ...nextRoomData,
                sequentialRooms: roomList,
                currentRoomIndex: nextTargetIndex
              });
            } else {
              navigation.navigate('Relatorios');
            }
          }}
          activeOpacity={0.8}
        >
          <H3 style={[styles.nextButtonText, { color: '#FFF' }]}>
            {nextRoomData ? `${t('checklists.advanceTo')} ${nextRoomData.roomName}` : t('checklists.finishInspection')}
          </H3>
          {nextRoomData ? <NeoIcon name="ArrowRight2" size={24} color="#FFF" variant="Bold" /> : <NeoIcon name="TickCircle" size={24} color="#FFF" variant="Bold" />}
        </TouchableOpacity>

        <View style={{ height: 40, width: '100%' }} />
      </ScrollView>
      </SafeAreaView>
    </AppBg>
  );

  function _navigateAfterSchedule() {
    if (pendingNavigation?.type === 'next') {
      navigation.replace('ChecklistDetail', {
        ...pendingNavigation.data,
        sequentialRooms: roomList,
        currentRoomIndex: pendingNavigation.index,
      });
    } else {
      navigation.navigate('Relatorios');
    }
    setPendingNavigation(null);
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerContent: {
    flex: 1,
  },
  headerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2
  },
  progressContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  gridCard: {
    width: '48%', // 2 Columns
    minHeight: 140, // Taller for content
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'space-between'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB'
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 0.5
  },
  cardText: {
    fontSize: 13, // Slightly smaller to fit more text
    color: '#374151',
    fontWeight: '500',
    lineHeight: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
    marginTop: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
});

export default ChecklistDetailScreen;
