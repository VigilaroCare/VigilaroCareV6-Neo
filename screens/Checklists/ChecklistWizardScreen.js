import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { DS as Neo } from "../../utils/DesignSystem2026";
import { t_field } from "../../utils/getLocalizedField";
import NeoCard from "../../components/NeoCard";
import NeoIcon from "../../components/NeoIcon";
import AppBackground from "../../components/AppBackground";
import NeoScreenHeader from "../../components/NeoScreenHeader";
import ScaleButton from "../../components/ScaleButton";
import { H1, H2, H3, Body, Small, Caption } from "../../components/NeoTypography";
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

import { AMBIENTES } from "../../data/mapeamento_dados";

export default function ChecklistWizardScreen({ navigation }) {
  const { t } = useTranslation();
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const [modo, setModo] = useState("inicio"); // "inicio" | "por_comodo"
  const [ambientesAtivos, setAmbientesAtivos] = useState(AMBIENTES);

  React.useEffect(() => {
    Promise.all([
      import('../../services/ProfileService'),
      import('../../utils/ProfileFilterEngine')
    ]).then(([profileServiceMod, filterEngineMod]) => {
      const ProfileService = profileServiceMod.default;
      const { isAreaRelevant, getDynamicAreaName } = filterEngineMod;

      Promise.all([
        ProfileService.getMoradia(),
        ProfileService.getResidentsProfiles(),
        ProfileService.getMapping()
      ]).then(([moradia, profiles, mapping]) => {
        const filtered = AMBIENTES.filter(a => isAreaRelevant(a, moradia, profiles, mapping))
          .map(a => {
            if (a.id === 'central_gas') {
              const dynamicName = getDynamicAreaName(a.id, a.nome, mapping, t);
              return {
                ...a,
                nome: dynamicName
              };
            }
            return a;
          });
        if (filtered.length > 0) {
          setAmbientesAtivos(filtered);
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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar style={isDark ? 'light' : 'dark'} />
          <NeoScreenHeader 
            title={t('checklistWizard.routineInspection')} 
            onBack={() => navigation.goBack()} 
          />
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
                <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: themeColors.primary[500] + '25', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <NeoIcon name="ClipboardTick" size={32} color={themeColors.primary[500]} variant="Bold" />
                </View>
                <H2 style={{ marginBottom: 4 }}>{t('checklistWizard.routineInspection')}</H2>
                <Body style={{ color: themeColors.neutral[600] }}>
                    {t('checklistWizard.selectRoomToAudit')}
                </Body>
            </View>

            <NeoCard variant="elevated" style={{ backgroundColor: '#FEF2F2', borderColor: '#FEE2E2', borderWidth: 1, marginBottom: 32, padding: 16 }}>
                <View style={styles.featureRow}>
                    <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,152,0,0.1)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }]}>
                        <NeoIcon name="ShieldTick" size={20} color={themeColors.categoria.ocre.fill} variant="Bold"/>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Body style={{ fontWeight: 'bold', color: '#B91C1C' }}>{t('checklistWizard.continuousAttention')}</Body>
                        <Small style={{ color: '#991B1B', lineHeight: 20 }}>
                            {t('checklistWizard.continuousAttentionDesc')}
                        </Small>
                    </View>
                </View>
            </NeoCard>

            <TouchableOpacity
              style={styles.botaoPrimario}
              onPress={handlePercorrerCasa}
              activeOpacity={0.85}
            >
              <NeoIcon name="Location" size={22} color={themeColors.neutral.white || '#FFF'} style={{ marginRight: 8 }} variant="Bold" />
              <H3 style={{ color: themeColors.neutral.white || '#FFF' }}>{t('checklistWizard.startFullAudit')}</H3>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSecundario}
              onPress={() => setModo("por_comodo")}
              activeOpacity={0.8}
            >
              <NeoIcon name="Grid2" size={20} color={themeColors.primary[500]} style={{ marginRight: 8 }} variant="Linear" />
              <Body style={{ color: themeColors.primary[500], fontWeight: '600' }}>{t('checklistWizard.auditSpecificRoom')}</Body>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoTexto} onPress={handlePular} hitSlop={{top: 10, bottom: 10}}>
              <Small style={{ color: Neo.colors.neutral[500], textDecorationLine: 'underline' }}>{t('checklistWizard.backToPanel', 'Voltar para o Painel')}</Small>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <NeoScreenHeader 
            title={t('checklistWizard.routineInspection')} 
            subtitle={t('checklistWizard.specificAudit')} 
            onBack={() => setModo("inicio")} 
        />

        <ScrollView contentContainerStyle={styles.scrollContentList} showsVerticalScrollIndicator={false}>
          <Body style={{ color: Neo.colors.neutral[600], marginBottom: 20, textAlign: 'center' }}>
            {t('checklistWizard.selectRoomToAudit')}
          </Body>

          {ambientesAtivos.map((ambiente) => (
            <ScaleButton key={ambiente.id} onPress={() => handleAmbientePress(ambiente)} style={{ marginBottom: 12 }}>
                <NeoCard variant="elevated" style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: ambiente.cor + '15', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                        <NeoIcon name="Home2" size={24} color={ambiente.cor} variant="Bold" />
                    </View>
                    <View style={{ flex: 1, paddingRight: 8 }}>
                        <Body style={{ fontWeight: '800', color: textPrimary, marginBottom: 2 }}>{t_field(ambiente, 'nome')}</Body>
                        <Small style={{ color: themeColors.neutral[600] }}>{t_field(ambiente, 'descricao')}</Small>
                        <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
                                <Caption style={{ fontWeight: '800', color: themeColors.neutral[700] }}>{t('checklistWizard.priority')}: {t_field(ambiente, 'prioridade')}</Caption>
                            </View>
                        </View>
                    </View>
                    <NeoIcon name="ArrowRight2" size={20} color={themeColors.neutral[400]} />
                </NeoCard>
            </ScaleButton>
          ))}

          <TouchableOpacity style={[styles.botaoTexto, { marginTop: 24, marginBottom: 40 }]} onPress={handlePular} hitSlop={{top: 10, bottom: 10}}>
             <Small style={{ color: themeColors.neutral[500], textDecorationLine: 'underline' }}>{t('checklistWizard.backToPanel', 'Voltar para o Início')}</Small>
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
    backgroundColor: Neo.colors.primary[500],
    paddingVertical: 16,
    borderRadius: 16,
    ...Neo.shadows.md,
    shadowColor: Neo.colors.primary[500],
  },
  botaoSecundario: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Neo.colors.primary[500] + '18',
    borderWidth: 1.5,
    borderColor: Neo.colors.primary[500] + '40',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
  },
  botaoTexto: {
    marginTop: 24,
    alignItems: "center",
  },
});
