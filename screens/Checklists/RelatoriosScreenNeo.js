import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

// Services
import { DS as Neo } from "../../utils/DesignSystem2026";
import ProfileService from "../../services/ProfileService";
import { ChecklistService } from "../../services/ChecklistService";
import SafetyReportService from "../../services/SafetyReportService";
import { isAreaRelevant } from "../../utils/ProfileFilterEngine";
// Import Unified Data
import { AMBIENTES, CHECKLISTS } from "../../data/mapeamento_dados";
import { ALERTAS_CATEGORIA } from "../../data/estatisticasAcidentes";

// Components
import NeoCard from "../../components/NeoCard";
import NeoText, {
  H2,
  H3,
  Body,
  Small,
  Caption,
} from "../../components/NeoTypography";
import NeoGaugeChart from "../../components/NeoGaugeChart";
import NeoIcon from "../../components/NeoIcon";
// import ActiveProtectionCard from '../../components/ActiveProtectionCard';
// import DynamicSectorChart from '../../components/DynamicSectorChart';

const { width } = Dimensions.get("window");

// --- RISK INTELLIGENCE HELPER ---
const getRiskEducation = (text) => {
  if (!text)
    return { icon: "information-circle", fact: "Prevenção é a chave." };
  const t = text.toLowerCase();

  if (t.includes("tapete"))
    return {
      icon: "warning",
      fact: "Tapetes soltos causam >30% das quedas em idosos.",
    };
  if (t.includes("tomada") || t.includes("fios"))
    return {
      icon: "flash",
      fact: "Choques são a 3ª maior causa de acidentes infantis.",
    };
  if (t.includes("janela") || t.includes("rede"))
    return {
      icon: "grid",
      fact: "Redes de proteção reduzem em 99% o risco de quedas fatais.",
    };
  if (t.includes("piscina"))
    return {
      icon: "water",
      fact: "Afogamento é a 2ª causa de morte acidental (0-14 anos).",
    };
  if (t.includes("remédio") || t.includes("produto") || t.includes("tóxi"))
    return {
      icon: "flask",
      fact: "Intoxicação doméstica é principal causa de internamento infantil.",
    };
  if (t.includes("fogo") || t.includes("gás") || t.includes("fogão"))
    return {
      icon: "flame",
      fact: "Vazamentos de gás são silenciosos e letais. Monitores salvam.",
    };
  if (t.includes("móvel") || t.includes("fixad") || t.includes("tomb"))
    return {
      icon: "cube",
      fact: "Móveis tombando sobre crianças são acidentes comuns e graves.",
    };
  if (t.includes("iluminação") || t.includes("luz"))
    return {
      icon: "bulb",
      fact: "Má iluminação aumenta em 50% o risco de quedas noturnas.",
    };
  if (t.includes("piso") || t.includes("molhado") || t.includes("box"))
    return {
      icon: "water",
      fact: "Quedas no banheiro são frequentes e perigosas.",
    };
  if (t.includes("brinquedo"))
    return {
      icon: "happy",
      fact: "Brinquedos no chão são armadilhas noturnas.",
    };

  return {
    icon: "information-circle",
    fact: "Este item é essencial para a segurança preventiva do lar.",
  };
};

const getStatusStyle = (status) => {
  if (status === "Seguro")
    return { bg: "rgba(76, 175, 80, 0.15)", color: "#2E7D32" };
  if (status === "Pendente")
    return { bg: "rgba(158, 158, 158, 0.15)", color: "#616161" };
  if (status === "Atenção")
    return { bg: "rgba(255, 193, 7, 0.15)", color: "#856404" }; // Contraste melhorado (mais escuro)
  if (status === "Risco")
    return { bg: "rgba(244, 67, 54, 0.15)", color: "#D32F2F" };
  return { bg: "rgba(0, 0, 0, 0.05)", color: "#757575" };
};


import { useTranslation } from "react-i18next";
import { t_field } from "../../utils/getLocalizedField";
import AppBackground from "../../components/AppBackground";

export default function RelatoriosScreenNeo({ navigation }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [score, setScore] = useState(0);
  const [viewMode, setViewMode] = useState("personal"); // 'personal' | 'all'
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // Novo Estado para Painel de Pendências Explicitas
  const [pendingActions, setPendingActions] = useState([]);

  // Derived States
  const [profilesCount, setProfilesCount] = useState(0);
  const [familyMeta, setFamilyMeta] = useState({ totalMoradoresEsperados: 0 });
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleExportPDF = async () => {
    try {
      setGeneratingPDF(true);
      const profiles = await ProfileService.getPerfis();
      if (profiles && profiles.length > 0) {
        // Por padrão, gera do primeiro perfil (geralmente o dono) ou do selecionado
        // Aqui poderíamos abrir um seletor, mas para ser direto usaremos o perfil ativo
        const activeProfileId = profiles[0].id;
        await SafetyReportService.generatePDFReport(activeProfileId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGeneratingPDF(false);
    }
  };

  const abrirRelatorio = () => setDetailsModalVisible(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [viewMode]),
  );

  const loadData = async () => {
    try {
      setLoading(true);
      const mapping = (await ProfileService.getMapping()) || [];
      const moradia = (await ProfileService.getMoradia()) || {};
      const profilesData = await ProfileService.getPerfis();
      const profiles = Array.isArray(profilesData) ? profilesData : [];
      setProfilesCount(profiles.length);

      // GARANTIA: Pegar ID ativo explicitamente
      const activeId = await ProfileService.getActiveResidenceId();
      const checklistState = await ChecklistService.getAllState(activeId);

      // Filtragem Inteligente: Mostra APENAS o que o usuário mapeou e cadastrou (Moradia+Perfis)
      // Filtra fora explicitamente os "Kits de Prontidão" pois são recomendações e não influenciam no Score de "Ambientes"
      const relevantAreas = AMBIENTES.filter(
        (area) =>
          isAreaRelevant(area, moradia, profiles, mapping) &&
          !area.id.includes("kit"),
      );

      // Colors for Neo
      const COLORS = [
        Neo.colors.primary[500],
        Neo.colors.secondary[500],
        Neo.colors.feedback.warning,
        "#AB47BC",
        "#7E57C2",
        "#42A5F5",
        "#26C6DA",
        "#66BB6A",
        "#FFCA28",
      ];

      const finalData = relevantAreas.map((area, index) => {
        const areaData = checklistState[area.id] || {};
        const structure = CHECKLISTS[area.id];

        // INJETA PROFILES E MORADIA NO STATS PRA ELE SABER QUEM É E CALCULAR CORRETAMENTE
        const stats = ChecklistService.getAreaStats(
          area.id,
          areaData,
          structure,
          profiles,
          moradia,
        );

        return {
          key: area.id,
          label: `${t_field(area, "nome")} ${stats.total > 0 ? Math.round((stats.checked / stats.total) * 100) : 0}%`,
          fullName: t_field(area, "nome"),
          emoji: area.emoji,
          iconName: area.iconName,
          total: stats.total,
          checked: stats.checked,
          percent:
            stats.total > 0
              ? Math.round((stats.checked / stats.total) * 100)
              : 0,
          color: area.cor || COLORS[index % COLORS.length],
        };
      });

      // Extrair Itens de Risco (Não Conformes) Diretamente do Checklists
      const allRiskItems = [];
      relevantAreas.forEach((area) => {
        const areaData = checklistState[area.id] || [];
        const risks = areaData.filter((item) => item.status === "risco");
        risks.forEach((risk) => {
          allRiskItems.push({
            ...risk,
            roomName: t_field(area, "nome"),
            roomId: area.id,
            roomIcon: area.emoji,
          });
        });
      });
      setPendingActions(allRiskItems);

      setChartData(finalData);

      if (finalData.length > 0) {
        const globalChecked = finalData.reduce(
          (acc, item) => acc + item.checked,
          0,
        );
        const globalTotal = finalData.reduce(
          (acc, item) => acc + item.total,
          0,
        );
        setScore(
          globalTotal > 0 ? Math.round((globalChecked / globalTotal) * 100) : 0,
        );
      } else {
        setScore(0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const criticalAreas = useMemo(() => {
    return chartData
      .filter((item) => item.checked < item.total)
      .sort((a, b) => b.total - b.checked - (a.total - a.checked))
      .slice(0, 3);
  }, [chartData]);

  const getStatisticInsight = (areaId) => {
    if (areaId.includes("cozinha"))
      return {
        icon: "Danger",
        text: t('reports.insightKitchen', 'Cozinha: Risco alto de queimaduras.')
      };
    if (areaId.includes("piscina"))
      return {
        icon: "Drop",
        text: t('reports.insightPool', 'Piscina: Risco de afogamento silencioso.')
      };
    if (areaId.includes("banheiro"))
      return {
        icon: "Activity",
        text: t('reports.insightBathroom', 'Banheiro: 80% das quedas ocorrem aqui.')
      };
    if (areaId.includes("area_servico"))
      return { icon: "Warning2", text: t('reports.insightServiceArea', 'Atenção redobrada com produtos tóxicos e de limpeza.') };
    return { icon: "InfoCircle", text: t('reports.insightGeneral', 'Pequenos descuidos causam acidentes.') };
  };

  const missingProfilesCount = Math.max(
    0,
    (familyMeta?.totalMoradoresEsperados || 0) - profilesCount,
  );

  return (
    <AppBackground variant="subtle">
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <StatusBar style="dark" />

        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: Neo.spacing.lg,
            paddingVertical: Neo.spacing.md,
            alignItems: "center",
          }}
        >
          <H2 style={{ textAlign: "center" }}>{t("reports.title")}</H2>
          <Caption style={{ textAlign: "center", marginTop: 4 }}>
            {t("reports.subtitle")}
          </Caption>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: Neo.spacing.lg,
            paddingBottom: 240,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="large"
              color={Neo.colors.primary[500]}
              style={{ marginTop: 50 }}
            />
          ) : (
            <View style={{ flex: 1 }}>
              {/* CONSULTIVE REPORT CARD (THE STRATEGIC LAYER) */}
              {/* LINHA DE DESTAQUES (Empilhados Verticalmente) */}
              <View style={{ flexDirection: "column", marginBottom: 32 }}>
                {/* RELATÓRIO PERSONALIZADO (100%) */}
                <NeoCard
                  variant="elevated"
                  onPress={abrirRelatorio}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.06)",
                    width: "100%",
                    padding: 16,
                    justifyContent: "space-between",
                    minHeight: 140,
                    alignItems: "center",
                    ...Neo.shadows.sm,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: Neo.colors.primary[100],
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                    }}
                  >
                    <NeoIcon
                      name="MagicStar"
                      size={24}
                      color={Neo.colors.primary[600]}
                      variant="Bulk"
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <H3
                      style={{
                        color: Neo.colors.primary[600],
                        fontSize: 15,
                        marginBottom: 4,
                        lineHeight: 18,
                      }}
                    >
                      {t("reports.personalReport")}
                    </H3>
                    <Small
                      style={{
                        color: Neo.colors.neutral[800],
                        fontWeight: "600",
                        lineHeight: 14,
                      }}
                    >
                      {t("reports.personalReportDesc")}
                    </Small>
                  </View>
                </NeoCard>

                {/* HISTÓRICO DE MELHORIAS (Abaixo do Relatório Pessoal) */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("HistoricoMelhoras")}
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "rgba(57,159,104,0.1)",
                    padding: 16,
                    borderRadius: 20,
                    marginTop: 12,
                    borderWidth: 1,
                    borderColor: "rgba(57,159,104,0.2)",
                    ...Neo.shadows.xs,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: "#FFF",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <NeoIcon
                      name="Award"
                      size={20}
                      color={Neo.colors.primary[600]}
                      variant="Bold"
                    />
                  </View>
                  <View>
                    <H3
                      style={{ fontSize: 14, color: Neo.colors.primary[700] }}
                    >
                      {t("reports.improvementHistory")}
                    </H3>
                    <Small style={{ color: Neo.colors.primary[600] }}>
                      {t("reports.improvementHistoryDesc")}
                    </Small>
                  </View>
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <NeoIcon
                      name="ArrowRight"
                      size={18}
                      color={Neo.colors.primary[500]}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* SECTION HEADER: VISTORIA */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <NeoIcon
                    name="SearchStatus1"
                    size={22}
                    color={Neo.colors.primary[600]}
                  />
                  <H3 style={{ marginLeft: 8, color: Neo.colors.neutral[800] }}>
                    {t("reports.environmentInspection")}
                  </H3>
                </View>
              </View>

              {/* ROOMS GRID (3 columns) */}
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {chartData.map((area, index) => {
                  const statusLabelKey =
                    area.percent === 100 && area.total > 0
                      ? "Seguro"
                      : area.checked === 0
                        ? "Pendente"
                        : area.percent >= 70
                          ? "Atenção"
                          : "Risco";
                  const statusStyle = getStatusStyle(statusLabelKey);
                  
                  // Translate the label
                  let translatedLabel = "";
                  if (statusLabelKey === "Seguro") translatedLabel = t('reports.statusSafe', "Seguro");
                  else if (statusLabelKey === "Pendente") translatedLabel = t('reports.statusPending', "Pendente");
                  else if (statusLabelKey === "Atenção") translatedLabel = t('reports.statusAttention', "Atenção");
                  else if (statusLabelKey === "Risco") translatedLabel = t('reports.statusRisk', "Risco");

                  const status = {
                    label: translatedLabel,
                    color: statusStyle.color,
                    bg: statusStyle.bg,
                  };

                  return (
                    <NeoCard
                      variant="elevated"
                      key={area.key}
                      onPress={() =>
                        navigation.navigate("ChecklistDetail", {
                          roomId: area.key,
                          roomName: area.fullName,
                          roomColor: area.color,
                          roomIcon: area.emoji,
                          fullChecklist: viewMode === "all",
                        })
                      }
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.06)",
                        marginBottom: 12,
                        width: (width - Neo.spacing.lg * 2 - 30) / 3, // Margem de segurança reforçada para 3 colunas
                        alignItems: "center",
                        padding: 10,
                        justifyContent: "center",
                        height: 120,
                        borderRadius: 20,
                      }}
                    >
                      {area.iconName ? (
                        <NeoIcon
                          name={area.iconName}
                          size={28}
                          color={Neo.colors.primary[500]}
                          style={{ marginBottom: 8 }}
                        />
                      ) : (
                        <Text style={{ fontSize: 26, marginBottom: 8 }}>
                          {area.emoji}
                        </Text>
                      )}

                      <Body
                        style={{
                          fontWeight: "bold",
                          color: Neo.colors.neutral[900],
                          textAlign: "center",
                          marginBottom: 6,
                          fontSize: 11,
                          lineHeight: 14,
                        }}
                        numberOfLines={2}
                      >
                        {area.fullName}
                      </Body>

                      <View
                        style={{
                          backgroundColor: status.bg,
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          borderRadius: 6,
                          alignItems: "center",
                          width: "100%",
                          borderWidth: 1,
                          borderColor: status.color + "30",
                        }}
                      >
                        <Small
                          style={{
                            color: status.color,
                            fontWeight: "800",
                            fontSize: 8,
                            letterSpacing: 0.5,
                            textTransform: "uppercase",
                          }}
                          numberOfLines={1}
                        >
                          {status.label}
                        </Small>
                      </View>
                    </NeoCard>
                  );
                })}

                {/* CARD VERMELHO CONSOLIDADO DE PENDÊNCIAS */}
                {pendingActions.length > 0 ? (
                  <NeoCard
                    variant="elevated"
                    onPress={() => navigation.navigate("SafetyActionPlan")}
                    style={{
                      marginBottom: 12,
                      width: "31%",
                      alignItems: "center",
                      padding: 10,
                      justifyContent: "center",
                      height: 120,
                      backgroundColor: "#FFEBEE",
                      borderWidth: 2,
                      borderColor: Neo.colors.feedback.error,
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: Neo.colors.feedback.error,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 8,
                      }}
                    >
                      <NeoIcon name="Warning2" size={20} color="#FFF" />
                    </View>

                    <Body
                      style={{
                        fontWeight: "bold",
                        color: Neo.colors.feedback.error,
                        textAlign: "center",
                        marginBottom: 6,
                        fontSize: 11,
                      }}
                      numberOfLines={1}
                    >
                      {t("reports.pendencies")}
                    </Body>

                    <View
                      style={{
                        backgroundColor: Neo.colors.feedback.error,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                        borderRadius: 4,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Small
                        style={{
                          color: "#FFF",
                          fontWeight: "bold",
                          fontSize: 8,
                          letterSpacing: 0.3,
                          textTransform: "uppercase",
                        }}
                        numberOfLines={1}
                      >
                        {t('reports.itemCount', { count: pendingActions.length, defaultValue: `${pendingActions.length} ${pendingActions.length === 1 ? "item" : "itens"}` })}
                      </Small>
                    </View>
                  </NeoCard>
                ) : null}
              </View>
              {/* SECTION HEADER: VISTORIAS ESPECIAIS */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 32,
                  marginBottom: 16,
                }}
              >
                <NeoIcon
                  name="Star1"
                  size={22}
                  color={Neo.colors.primary[600]}
                />
                <H3
                  style={{
                    marginLeft: 8,
                    color: Neo.colors.neutral[800],
                    textAlign: "center",
                  }}
                >
                  {t("reports.specialInspections")}
                </H3>
              </View>

              {/* GRID VISTORIAS ESPECIAIS */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                {/* ESCOLA SEGURA (48%) */}
                <NeoCard
                  variant="elevated"
                  onPress={() => navigation.navigate("EscolaSegura")}
                  style={{
                    width: "48%",
                    padding: 16,
                    backgroundColor: "#E8F5E9", // Light green
                    borderColor: "#C8E6C9",
                    borderWidth: 1,
                    justifyContent: "space-between",
                    minHeight: 140,
                    alignItems: "center",
                    ...Neo.shadows.sm,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#FFF",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      ...Neo.shadows.xs,
                    }}
                  >
                    <NeoIcon
                      name="Teacher"
                      size={24}
                      color="#2E7D32"
                      variant="Bulk"
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <H3
                      style={{
                        color: "#2E7D32",
                        fontSize: 15,
                        marginBottom: 4,
                        lineHeight: 18,
                      }}
                    >
                      {t("reports.safeSchool")}
                    </H3>
                    <Small
                      style={{
                        color: "#4CAF50",
                        fontWeight: "500",
                        lineHeight: 14,
                      }}
                    >
                      {t("reports.safeSchoolDesc")}
                    </Small>
                  </View>
                </NeoCard>

                {/* ASILO SEGURO (48%) */}
                <NeoCard
                  variant="elevated"
                  onPress={() => {
                    navigation.navigate("VistoriaAsilo");
                  }}
                  style={{
                    width: "48%",
                    padding: 16,
                    backgroundColor: "#E3F2FD", // Light blue
                    borderColor: "#BBDEFB",
                    borderWidth: 1,
                    justifyContent: "space-between",
                    minHeight: 140,
                    alignItems: "center",
                    ...Neo.shadows.sm,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: "#FFF",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 12,
                      ...Neo.shadows.xs,
                    }}
                  >
                    <NeoIcon
                      name="Building"
                      size={24}
                      color="#1565C0"
                      variant="Bulk"
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <H3
                      style={{
                        color: "#1565C0",
                        fontSize: 15,
                        marginBottom: 4,
                        lineHeight: 18,
                      }}
                    >
                      {t("reports.safeNursingHome")}
                    </H3>
                    <Small
                      style={{
                        color: "#1E88E5",
                        fontWeight: "500",
                        lineHeight: 14,
                      }}
                    >
                      {t("reports.safeNursingHomeDesc")}
                    </Small>
                  </View>
                </NeoCard>
              </View>
            </View>
          )}
          <View style={{ height: 80 }} />
        </ScrollView>

        {/* MODAL (REPORT) */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={detailsModalVisible}
          onRequestClose={() => setDetailsModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#FFF",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                height: "85%",
                padding: 24,
              }}
            >
              {/* Drag Handle */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: Neo.colors.neutral[400],
                  borderRadius: 2,
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <H3>{t("reports.pendenciesPercent", { pct: 100 - score })}</H3>
                <TouchableOpacity onPress={() => setDetailsModalVisible(false)}>
                  <NeoIcon
                    name="CloseCircle"
                    size={28}
                    color={Neo.colors.neutral[400]}
                  />
                </TouchableOpacity>
              </View>

              {/* Botão Exportar PDF no Modal */}
              <TouchableOpacity
                onPress={handleExportPDF}
                disabled={generatingPDF}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Neo.colors.primary[50],
                  paddingVertical: 12,
                  borderRadius: 12,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: Neo.colors.primary[200],
                }}
              >
                {generatingPDF ? (
                  <ActivityIndicator
                    size="small"
                    color={Neo.colors.primary[600]}
                  />
                ) : (
                  <>
                    <NeoIcon
                      name="DocumentDownload"
                      size={20}
                      color={Neo.colors.primary[600]}
                      style={{ marginRight: 8 }}
                    />
                    <NeoText
                      style={{
                        color: Neo.colors.primary[700],
                        fontWeight: "bold",
                      }}
                    >
                      {t("reports.savePDF")}
                    </NeoText>
                  </>
                )}
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* MISSING PROFILES */}
                {missingProfilesCount > 0 ? (
                  <NeoCard
                    variant="glass"
                    style={{ padding: 16, marginBottom: 16 }}
                  >
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View
                        style={{
                          backgroundColor: "#FFEBEE",
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <NeoIcon
                          name="Profile2User"
                          size={24}
                          color="#D32F2F"
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Body style={{ color: "#D32F2F", fontWeight: "bold" }}>
                          {t("reports.incompleteReg")}
                        </Body>
                        <Small>
                          {t("reports.missingPeople", {
                            count: missingProfilesCount,
                          })}
                        </Small>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        marginTop: 12,
                        backgroundColor: "#D32F2F",
                        padding: 8,
                        borderRadius: 8,
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setDetailsModalVisible(false);
                        navigation.navigate("QuemProteger");
                      }}
                    >
                      <Small style={{ color: "#FFF", fontWeight: "bold" }}>
                        {t("reports.resolve")}
                      </Small>
                    </TouchableOpacity>
                  </NeoCard>
                ) : null}

                {/* CRITICAL AREAS LIST */}
                {criticalAreas.map((area) => {
                  const insight = getStatisticInsight(area.key);
                  return (
                    <NeoCard
                      variant="glass"
                      key={area.key}
                      style={{ padding: 16, marginBottom: 12 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <Body style={{ fontWeight: "bold" }}>
                          {area.fullName}
                        </Body>
                        <View
                          style={{
                            backgroundColor: "#FFEBEE",
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 4,
                          }}
                        >
                          <Small
                            style={{ color: "#D32F2F", fontWeight: "bold" }}
                          >
                            {t("reports.pendenciesCount", {
                              count: area.total - area.checked,
                            })}
                          </Small>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          padding: 12,
                          backgroundColor: Neo.colors.neutral[100],
                          borderRadius: 8,
                        }}
                      >
                        <NeoIcon
                          name={insight.icon}
                          size={20}
                          color={Neo.colors.primary[600]}
                        />
                        <Small
                          style={{ flex: 1, color: Neo.colors.neutral[600] }}
                        >
                          {insight.text}
                        </Small>
                      </View>

                      <TouchableOpacity
                        style={{
                          marginTop: 12,
                          backgroundColor: Neo.colors.primary[500],
                          padding: 12,
                          borderRadius: 8,
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setDetailsModalVisible(false);
                          const fullArea = AMBIENTES.find(
                            (a) => a.id === area.key,
                          );
                          if (fullArea) {
                            navigation.navigate("ChecklistDetail", {
                              roomId: fullArea.id,
                              roomName: fullArea.nome,
                              roomColor: fullArea.cor,
                              roomIcon: fullArea.emoji,
                            });
                          }
                        }}
                      >
                        <Body style={{ color: "#FFF", fontWeight: "bold" }}>
                          {t("reports.verifyNow")}
                        </Body>
                      </TouchableOpacity>
                    </NeoCard>
                  );
                })}

                {score === 100 ? (
                  <View style={{ alignItems: "center", marginTop: 40 }}>
                    <NeoIcon
                      name="Star"
                      size={64}
                      color="#FFD700"
                      variant="Bold"
                    />
                    <H3 style={{ marginTop: 16, textAlign: "center" }}>
                      {t("reports.allSafe")}
                    </H3>
                    <Body
                      style={{
                        textAlign: "center",
                        color: Neo.colors.neutral[500],
                      }}
                    >
                      {t("reports.allSafeMsg")}
                    </Body>
                  </View>
                ) : null}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </AppBackground>
  );
}
