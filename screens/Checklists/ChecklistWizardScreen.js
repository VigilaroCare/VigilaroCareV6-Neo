import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ArrowRight2, Location, Grid2, Warning2, Home2, ArrowLeft2, ClipboardTick } from "iconsax-react-native";
import { DS as Neo } from "../../utils/DesignSystem2026";
import { t_field } from "../../utils/getLocalizedField";
import NeoCard from "../../components/NeoCard";
import AppBackground from "../../components/AppBackground";
import ScaleButton from "../../components/ScaleButton";
import { H1, H2, H3, Body, Small } from "../../components/NeoTypography";
import { useTranslation } from 'react-i18next';

import { AMBIENTES } from "../../data/mapeamento_dados";

export default function ChecklistWizardScreen({ navigation }) {
  const { t } = useTranslation();
  const [modo, setModo] = useState("inicio"); // "inicio" | "por_comodo"
  const [ambientesAtivos, setAmbientesAtivos] = useState(AMBIENTES);

  React.useEffect(() => {
    import('../../services/ProfileService').then(module => {
      module.default.getMapping().then(mapping => {
        if (mapping && mapping.length > 0) {
          const filtered = AMBIENTES.filter(a => mapping.includes(a.id));
          if (filtered.length > 0) {
            setAmbientesAtivos(filtered);
          }
        }
      });
    });
  }, []);

  const handlePular = () => {
    navigation.navigate("MainTabs");
  };

  const handlePercorrerCasa = () => {
    // When starting a full walk-through, pass the active rooms so the flow is sequential
    if (ambientesAtivos.length > 0) {
        navigation.navigate("ChecklistDetail", {
          roomId: ambientesAtivos[0].id,
          roomName: ambientesAtivos[0].nome,
          sequentialRooms: ambientesAtivos.map(a => ({ roomId: a.id, roomName: a.nome, roomColor: a.cor, roomIcon: a.emoji })),
          currentRoomIndex: 0
        });
    } else {
        setModo("por_comodo");
    }
  };

  const handleAmbientePress = (ambiente) => {
    navigation.navigate("ChecklistDetail", {
      roomId: ambiente.id,
      roomName: ambiente.nome,
    });
  };

  if (modo === "inicio") {
    return (
      <AppBackground>
        <SafeAreaView style={styles.container}>
          <StatusBar style="dark" />
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(26, 115, 232, 0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <ClipboardTick size={32} color="#1A73E8" variant="Bold" />
                </View>
                <H2 style={{ marginBottom: 4 }}>{t('checklistWizard.routineInspection')}</H2>
                <Body style={{ fontSize: 13, color: Neo.colors.neutral[600] }}>
                    {t('checklistWizard.selectRoomToAudit')}
                </Body>
            </View>

            <NeoCard variant="glass" style={{ backgroundColor: '#FEF2F2', borderColor: '#FEE2E2', borderWidth: 1, marginBottom: 32, padding: 16 }}>
                <View style={styles.featureRow}>
                    <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,152,0,0.1)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }]}>
                        <ShieldTick size={20} color="#FF9800" variant="Bold"/>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#B91C1C' }}>{t('checklistWizard.continuousAttention')}</Text>
                        <Text style={{ color: '#991B1B', lineHeight: 20, fontSize: 13 }}>
                            {t('checklistWizard.continuousAttentionDesc')}
                        </Text>
                    </View>
                </View>
            </NeoCard>

            <TouchableOpacity
              style={styles.botaoPrimario}
              onPress={handlePercorrerCasa}
              activeOpacity={0.85}
            >
              <Location size={22} color="#FFF" style={{ marginRight: 8 }} variant="Bold" />
              <H3 style={{ color: '#FFF' }}>{t('checklistWizard.startFullAudit')}</H3>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => setModo("por_comodo")}
              activeOpacity={0.8}
            >
              <Grid2 size={20} color="#1A73E8" style={{ marginRight: 8 }} variant="Outline" />
              <Body style={{ color: '#1A73E8', fontWeight: '600' }}>{t('checklistWizard.auditSpecificRoom')}</Body>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoTexto} onPress={handlePular} hitSlop={{top: 10, bottom: 10}}>
              <Small style={{ color: Neo.colors.neutral[500], textDecorationLine: 'underline' }}>{t('checklistWizard.backToDashboard')}</Small>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
            <TouchableOpacity onPress={() => setModo("inicio")} style={styles.backButton}>
                <ArrowLeft2 size={24} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                <H2>{t('checklistWizard.routineInspection')}</H2>
                <Small style={{ color: Neo.colors.neutral[500] }}>{t('checklistWizard.specificAudit')}</Small>
            </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContentList} showsVerticalScrollIndicator={false}>
          <Body style={{ color: Neo.colors.neutral[600], marginBottom: 20, textAlign: 'center' }}>
            {t('checklistWizard.selectRoomToAudit')}
          </Body>

          {ambientesAtivos.map((ambiente) => (
            <ScaleButton key={ambiente.id} onPress={() => handleAmbientePress(ambiente)} style={{ marginBottom: 12 }}>
                <NeoCard variant="glass" style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: ambiente.cor + '15', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                        <Home2 size={24} color={ambiente.cor} variant="Bold" />
                    </View>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: '800', color: Neo.colors.neutral[800], marginBottom: 2 }}>{t_field(ambiente, 'nome')}</Text>
                        <Text style={{ fontSize: 12, color: Neo.colors.neutral[600] }}>{t_field(ambiente, 'descricao')}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                                <Text style={{ fontSize: 11, fontWeight: '800', color: Neo.colors.neutral[700] }}>{t('checklistWizard.priority')}: {t_field(ambiente, 'prioridade')}</Text>
                            </View>
                        </View>
                    </View>
                    <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                </NeoCard>
            </ScaleButton>
          ))}

          <TouchableOpacity style={[styles.botaoTexto, { marginTop: 24, marginBottom: 40 }]} onPress={handlePular} hitSlop={{top: 10, bottom: 10}}>
            <Small style={{ color: Neo.colors.neutral[500], textDecorationLine: 'underline' }}>Voltar para o Início</Small>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)'
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  scrollContentList: {
    padding: 20,
    paddingBottom: 40,
  },
  botaoPrimario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A73E8",
    paddingVertical: 16,
    borderRadius: 16,
    ...Neo.shadows.md,
    shadowColor: '#1A73E8',
  },
  botaoSecundario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(26, 115, 232, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(26, 115, 232, 0.3)',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  botaoTexto: {
    marginTop: 24,
    alignItems: "center",
  },
});
