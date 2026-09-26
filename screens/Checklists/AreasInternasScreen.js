import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { areasInternas } from '../../data/areas_internas';
import { areasExternas } from '../../data/areas_externas';
import { ChecklistService } from '../../services/ChecklistService';
import ProfileService from '../../services/ProfileService';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoAlert from '../../utils/NeoAlert';
import { useTranslation } from 'react-i18next';
import { getDynamicAreaName } from '../../utils/ProfileFilterEngine';
import { AMBIENTES } from '../../data/mapeamento_dados';
// Todo conteudo de /data/ passa por aqui: t_field/t_array resolvem os tokens
// de emergencia ({{POISON_CONTROL}}, {{EMERGENCY_NUMBER}}) pelo numero do pais
// do usuario, e ja preparam a traducao. Sem isso o texto sai com a chave crua.
import { t_field, t_array } from '../../utils/getLocalizedField';

/**
 * Áreas que aparecem independentemente do mapeamento da moradia, porque não
 * correspondem a um ambiente declarável. `armarios_geral` e `accessibility_pcd`
 * são transversais; `beach_rivers` é de viagem e fica FORA desta tela.
 */
const SEM_FILTRO_DE_MAPEAMENTO = new Set(['armarios_geral', 'accessibility_pcd']);
const FORA_DESTA_TELA = new Set(['beach_rivers']);

/**
 * TODAS as áreas — internas e externas.
 *
 * Esta tela carregava só `areas_internas`, mas `OndeProteger` manda para cá
 * TODOS os ambientes que o usuário marcou, inclusive quintal, piscina, jardim,
 * parquinho, oficina e depósito — cujo roteiro vive em `areas_externas`. O
 * conteúdo existia e nunca era carregado: a tela que o servia
 * (AreasExternasScreen) tinha ficado sem caminho de navegação.
 *
 * Os dois arquivos têm o mesmo formato no que esta tela usa — id, titulo,
 * icone, situacao, oQueFazer, oQueNaoFazer, quandoChamarAjuda. `grupo`, `cor`
 * e `riscos` só existem na base interna e não são renderizados aqui.
 *
 * `quandoChamarAjuda` era renderizado só pela tela externa; foi trazido para
 * cá antes de ela sair, senão a absorção teria perdido conteúdo de segurança.
 */
const TODAS_AS_AREAS = [...areasInternas, ...areasExternas].filter(a => !FORA_DESTA_TELA.has(a.id));

/**
 * Ambiente escolhido em "Onde Proteger" → roteiro correspondente.
 *
 * Antes desta revisão, 9 dos 21 ambientes oferecidos não casavam com nada e
 * caíam num fallback que exibia a lista inteira de ambientes internos. O
 * usuário escolhia "Piscina" e recebia cozinha, banheiro e quartos, com cara
 * de tela normal — falha silenciosa, não erro visível.
 *
 * Dois problemas distintos estavam somados:
 *   - as áreas externas não eram carregadas (ver TODAS_AS_AREAS acima);
 *   - `quarto_bebe` apontava para a chave `baby_room`, que não existe: o dado
 *     se chama `bedroom_baby`. O quarto do bebê — dos ambientes mais críticos
 *     do app — nunca casava por causa de um nome errado.
 */
const AMBIENTE_TO_AREA = {
  // ── internas ──
  kitchen: ['cozinha'],
  bathroom: ['banheiro'],
  living_room: ['sala'],
  bedroom: ['quarto', 'quartos'],
  bedroom_baby: ['quarto_bebe', 'quarto'],
  laundry: ['area_servico', 'lavanderia'],
  garage: ['garagem'],
  stairs: ['escadas'],
  dining_room: ['copa', 'sala'],
  pantry: ['despensa'],
  bedroom_kids: ['quarto_crianca'],
  bedroom_teen: ['quarto_adulto', 'quarto_crianca'],
  bedroom_adult: ['quarto_adulto'],
  bedroom_senior: ['quarto_idoso'],
  gas_central: ['central_gas', 'gas_encanado', 'botijao', 'botijao_gas'],
  balcony_indoor: ['varanda', 'sacada'],
  // ── externas ──
  backyard: ['quintal'],
  garden_farming: ['jardim_horta', 'jardim', 'horta'],
  collective_areas: ['parquinho', 'areas_coletivas', 'playground'],
  pool_safe: ['piscina'],
  workshop_tool: ['oficina'],
  storage_depot: ['deposito'],
  // `beach_rivers` ("Praia, Rios e Lagos") NÃO entra: não é ambiente de
  // residência, é conteúdo de viagem. Sem entrada aqui ele seria tratado como
  // área sem filtro e apareceria na lista de TODA moradia, apartamento
  // incluído — ver `SEM_FILTRO_DE_MAPEAMENTO` abaixo, que é o que o resolve.
};

/**
 * Chave de armazenamento das respostas, por área. CONGELADO.
 *
 * Contém exatamente os valores que `AMBIENTE_TO_AREA[areaId][0]` produzia
 * antes da correção do mapa de casamento, para que nenhuma vistoria já
 * respondida perca o endereço. As áreas externas usam o próprio id porque
 * nunca foram renderizadas antes — não há dado antigo debaixo delas.
 *
 * `bedroom_teen` e `bedroom_adult` compartilham o balde `quarto_adulto`. É
 * herança, não desenho: mudar agora órfã o que já foi respondido.
 */
const CHAVE_DE_ARMAZENAMENTO = {
  kitchen: 'cozinha',
  bathroom: 'banheiro',
  living_room: 'sala',
  laundry: 'area_servico',
  garage: 'garagem',
  stairs: 'escadas',
  dining_room: 'copa',
  pantry: 'despensa',
  bedroom_kids: 'quarto_crianca',
  bedroom_teen: 'quarto_adulto',
  bedroom_adult: 'quarto_adulto',
  bedroom_senior: 'quarto_idoso',
  gas_central: 'central_gas',
  balcony_indoor: 'varanda',
  // O quarto do bebê grava sob o PRÓPRIO id: antes da correção a chave do mapa
  // era `baby_room`, que não casava com `bedroom_baby`, então caía no id.
  bedroom_baby: 'bedroom_baby',
};


export default function AreasInternasScreen({ navigation, route }) {
  // BUG FIX: ambienteId/ambiente extraído de route.params com suporte a ambos os formatos
  const ambienteId = route?.params?.ambienteId || route?.params?.ambiente || null;
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[800];

  const [activeResidenceId, setActiveResidenceId] = useState(null);
  const [mapping, setMapping] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [checklistState, setChecklistState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Chave sob a qual as respostas daquela área são gravadas.
   *
   * Isto NÃO pode sair de `AMBIENTE_TO_AREA`. A versão anterior fazia
   * `AMBIENTE_TO_AREA[areaId]?.[0]`, misturando duas coisas diferentes — que
   * termos de ambiente casam com a área, e onde o dado mora. Quando o mapa de
   * casamento foi corrigido (`baby_room` → `bedroom_baby`), a chave do quarto
   * do bebê mudou de `bedroom_baby` para `quarto_bebe` junto, e toda vistoria
   * já respondida ali virou inalcançável, sem migração e sem aviso.
   *
   * Agora o de-para é explícito e CONGELADO nos valores que estavam em vigor.
   * Mexer aqui órfã dado de usuário; mexer no mapa de casamento, não.
   */
  const getNativeAreaId = (areaId) => CHAVE_DE_ARMAZENAMENTO[areaId] || areaId;

  const { dadosFiltrados, semRoteiroProprio } = useMemo(() => {
    let baseData = TODAS_AS_AREAS;

    if (mapping && mapping.length > 0) {
      baseData = TODAS_AS_AREAS.filter(area => {
        // Area sem termos de ambiente so passa se for transversal. O `return
        // true` incondicional que havia aqui deixava qualquer area nao mapeada
        // entrar na lista de TODA moradia — foi assim que "Praia, Rios e Lagos"
        // aparecia em apartamento sem praia declarada.
        const mappedTerms = AMBIENTE_TO_AREA[area.id];
        if (!mappedTerms) return SEM_FILTRO_DE_MAPEAMENTO.has(area.id);
        return mappedTerms.some(term => mapping.includes(term));
      });
    }

    if (!ambienteId) return { dadosFiltrados: baseData, semRoteiroProprio: false };

    const filtered = baseData.filter(area => {
      const mappedTerms = AMBIENTE_TO_AREA[area.id] || [];
      return mappedTerms.includes(ambienteId);
    });

    // Ainda sobram ambientes sem roteiro dedicado (canil, hall/corredor). Em vez
    // de mandar o usuário para uma tela vazia — ou, pior, fingir que a lista
    // inteira é a resposta, como acontecia antes —, mostramos o que existe e
    // dizemos com todas as letras que aquele ambiente ainda não tem roteiro.
    if (filtered.length > 0) return { dadosFiltrados: filtered, semRoteiroProprio: false };
    return { dadosFiltrados: baseData, semRoteiroProprio: true };
  }, [ambienteId, mapping]);

  useFocusEffect(
    useCallback(() => {
      loadChecklistStatus();
    }, [])
  );

  const loadChecklistStatus = async () => {
    try {
      setIsLoading(true);
      const resId = await ProfileService.getActiveResidenceId();
      setActiveResidenceId(resId);

      const currentMapping = await ProfileService.getMapping();
      setMapping(currentMapping || []);

      if (!resId) {
        if (__DEV__) console.log('[AreasInternas] Sem residência ativa');
        return;
      }

      const status = await ChecklistService.getAllState(resId);
      setChecklistState(status || {});
    } catch (error) {
      if (__DEV__) console.error('[AreasInternas] Erro ao carregar checklist:', error);
      NeoAlert.alert('Erro', 'Falha ao carregar checklist. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (dadosFiltrados.length === 1) {
      setExpandedId(dadosFiltrados[0].id);
    }
  }, [dadosFiltrados]);

  // `semRoteiroProprio` precisa entrar aqui também: sem isso o título viraria o
  // do PRIMEIRO item da lista de recuo, e quem escolhesse "Canil" leria "Sala
  // de Estar" no cabeçalho.
  /**
   * Título do cabeçalho.
   *
   * Com UMA área casada, o título é o dela. Com MAIS de uma, tem de ser o nome
   * do ambiente escolhido — não o da primeira da lista: `quarto_adulto` casa
   * com o quarto de adulto E com o de adolescente, e quem escolhia "Quarto
   * Adulto" lia "Quarto Adolescente" no cabeçalho. Duas áreas para um ambiente
   * é proposital (adolescente herda a orientação de criança); o título errado
   * não era.
   */
  const tituloDinamico = useMemo(() => {
    if (!ambienteId || !dadosFiltrados.length || semRoteiroProprio) {
      // A tela deixou de ser só das áreas internas — passa a cobrir as
      // externas também, então o título genérico não pode dizer "internas".
      return t('areas.ambientesDaCasa', 'Ambientes da casa');
    }
    if (dadosFiltrados.length > 1) {
      const amb = AMBIENTES.find(a => a.id === ambienteId);
      if (amb) return getDynamicAreaName(ambienteId, t_field(amb, 'nome'), mapping, t);
    }
    const area = dadosFiltrados[0];
    return area.id === 'gas_central'
      ? getDynamicAreaName('central_gas', area.titulo, mapping, t)
      : area.titulo;
  }, [ambienteId, dadosFiltrados, semRoteiroProprio, mapping, t]);

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
      NeoAlert.alert('Erro', 'Residência não selecionada');
      return;
    }

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

    try {
      await ChecklistService.saveItemState(
        nativeId,
        itemText,
        newStatus,
        activeResidenceId
      );
    } catch (error) {
      if (__DEV__) console.error('[AreasInternas] Erro ao salvar status:', error);
      NeoAlert.alert('Erro', 'Falha ao salvar resposta. Tente novamente.');
    }
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.id;
    const nativeId = getNativeAreaId(item.id);
    const areaState = checklistState[nativeId] || {};
    const totalItems = t_array(item, 'oQueFazer').length;

    const oQueFazerSafe = t_array(item, 'oQueFazer');
    const naItems = oQueFazerSafe.filter(step => areaState[step] === 'na').length;
    const checkedItems = oQueFazerSafe.filter(step => areaState[step] === true).length;
    const validTotal = totalItems - naItems;
    const progress =
      validTotal > 0 ? checkedItems / validTotal : naItems > 0 ? 1 : 0;
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
                    ? Neo.colors.primary[500] + '1F'
                    : 'rgba(255,255,255,0.6)',
              },
            ]}
          >
            <NeoIcon name={item.icone || 'House'} size={28} color={Neo.colors.primary[600]} variant="Bold" />
          </View>

          <View style={s.cardContent}>
            <Text style={[s.cardTitle, { color: textPrimary }]}>
              {item.id === 'gas_central' ? getDynamicAreaName('central_gas', item.titulo, mapping, t) : item.titulo}
            </Text>

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
                    backgroundColor: isComplete
                      ? Neo.colors.feedback.success
                      : Neo.colors.primary[500],
                  },
                ]}
              />
            </View>
          </View>

          <View
            style={[
              s.chevronBox,
              isExpanded && { backgroundColor: Neo.colors.primary[500] },
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
                <NeoIcon
                  name="ShieldTick"
                  size={16}
                  color={Neo.colors.primary[600]}
                  variant="Bold"
                />
                <Text style={[s.sectionLabel, { color: Neo.colors.primary[700] }]}>
                  VERIFICAÇÃO DE SEGURANÇA
                </Text>
              </View>

              <View style={s.questionsContainer}>
                {t_array(item, 'oQueFazer').map((step, index) => {
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
                            SIM
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
                            NÃO
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
                            N/A
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* EVITE */}
            {t_array(item, 'oQueNaoFazer').length > 0 && (
              <View style={s.sectionContainer}>
                <View style={s.sectionHeader}>
                  <NeoIcon
                    name="CloseCircle"
                    size={16}
                    color={Neo.colors.feedback.error}
                    variant="Bold"
                  />
                  <Text style={[s.sectionLabel, { color: Neo.colors.feedback.error }]}>
                    EVITE
                  </Text>
                </View>
                {t_array(item, 'oQueNaoFazer').map((step, index) => (
                  <View key={index} style={s.stepRow}>
                    <View style={s.bulletError} />
                    <Text style={[s.stepText, { color: textBody }]}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* QUANDO CHAMAR AJUDA — estava só na antiga tela de áreas externas.
                É o campo que diz a hora de parar de tentar resolver sozinho e
                acionar socorro; sem ele, absorver as áreas externas aqui teria
                perdido conteúdo de segurança em vez de só mudar de lugar. */}
            {item.quandoChamarAjuda && (
              <View style={s.quandoAjudaBox}>
                <View style={s.quandoAjudaHeader}>
                  <NeoIcon name="Call" size={14} color={Neo.colors.feedback.info} variant="Bold" />
                  <Text style={s.quandoAjudaTitulo}>
                    {t('areas.quandoChamarAjuda', 'Quando chamar ajuda')}
                  </Text>
                </View>
                <Text style={[s.stepText, { color: textBody }]}>{t_field(item, 'quandoChamarAjuda')}</Text>
              </View>
            )}

            {/* ALERTAS */}
            {item.alertas?.map((alerta, idx) => {
              const accent = alerta.tipo === 'warning'
                ? Neo.colors.feedback.warning
                : Neo.colors.feedback.error;
              return (
                <View
                  key={idx}
                  style={[
                    s.alertBox,
                    {
                      backgroundColor: accent + '15',
                      borderLeftWidth: 3,
                      borderLeftColor: accent,
                    },
                  ]}
                >
                  <View style={s.alertHeader}>
                    <NeoIcon
                      name={alerta.tipo === 'warning' ? 'Warning2' : 'DangerCircle'}
                      size={18}
                      color={accent}
                      variant="Bold"
                    />
                    <Text style={[s.alertTitle, { color: accent }]}>
                      {alerta.titulo}
                    </Text>
                  </View>
                  <Text style={[s.alertText, { color: Neo.colors.neutral[800] }]}>
                    {alerta.descricao}
                  </Text>
                </View>
              );
            })}
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
            <H1 style={s.title}>{tituloDinamico}</H1>
            <Caption style={s.subtitle}>
              {semRoteiroProprio
                ? t('areas.semRoteiroProprio', 'Ainda sem roteiro próprio — veja os ambientes cobertos')
                : `${dadosFiltrados.length} ${dadosFiltrados.length === 1 ? 'ambiente' : 'ambientes'} para verificar`}
            </Caption>
          </View>
        </View>

        {/* LISTA */}
        <FlatList
          ref={flatListRef}
          data={dadosFiltrados}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={s.listContent}
          scrollEnabled
          scrollEventThrottle={16}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          // As linhas mudam de altura ao expandir o accordion, então o item
          // alvo pode ainda não ter sido medido quando o scrollToIndex roda —
          // sem este handler, a FlatList lança e derruba a tela. Aproxima,
          // espera o layout e tenta de novo uma única vez.
          onScrollToIndexFailed={({ index, averageItemLength }) => {
            flatListRef.current?.scrollToOffset({
              offset: index * (averageItemLength || 120),
              animated: true,
            });
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0 });
            }, 300);
          }}
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
    borderColor: Neo.colors.primary[500] + '40',
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

  // Avoid / Steps
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  quandoAjudaBox: {
    marginTop: 4,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: Neo.colors.feedback.info,
    backgroundColor: Neo.colors.feedback.info + '15',
  },
  quandoAjudaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  quandoAjudaTitulo: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: Neo.colors.feedback.info,
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

  // Alerts
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
