import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import { DS as Neo } from "../../utils/DesignSystem2026";
import NeoCard from "../../components/NeoCard";
import AppBackground from "../../components/AppBackground";
import ScaleButton from "../../components/ScaleButton";
import { H2, Body, Small } from "../../components/NeoTypography";
import { useTranslation } from 'react-i18next';

export default function ChecklistCategoriaDetail({ route, navigation }) {
  const { t } = useTranslation();
  const { categoria } = route.params;

  const renderAmbiente = (ambiente, index) => (
    <ScaleButton
      key={index}
      onPress={() =>
        navigation.navigate('ChecklistDetail', {
          ambiente: ambiente.nome,
        })
      }
      style={{ marginBottom: 12 }}
    >
      <NeoCard variant="glass" style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          padding: 16,
          borderLeftWidth: 4,
          borderLeftColor: categoria.cor || '#1A73E8'
      }}>
        <View style={{ 
            width: 48, height: 48, borderRadius: 24, 
            backgroundColor: (categoria.cor || '#1A73E8') + '15', 
            alignItems: 'center', justifyContent: 'center', 
            marginRight: 16 
        }}>
            <Body style={{ fontSize: 24 }}>{ambiente.icone}</Body>
        </View>
        
        <View style={{ flex: 1 }}>
            <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800] }}>
                {ambiente.nome}
            </Body>
            <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>
                {t('checklistCategoria.tapToInspect')}
            </Small>
        </View>
        
        <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
      </NeoCard>
    </ScaleButton>
  );

  return (
    <AppBackground variant="subtle">
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        {/* Header Glassmórfico Fluido */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <ArrowLeft2 size={24} color={Neo.colors.neutral[800]} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', marginRight: 44, flexDirection: 'row', justifyContent: 'center' }}>
                <H2 style={{ fontSize: 26, marginRight: 8 }}>{categoria.icon}</H2>
                <H2 numberOfLines={1} style={{ flexShrink: 1 }}>{categoria.nome}</H2>
            </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
          
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
              <Body style={{ color: Neo.colors.neutral[500], textAlign: 'center' }}>
                  {t('checklistCategoria.roomsFound', { count: categoria.ambientes.length })}
              </Body>
          </View>

          {/* Lista de Ambientes */}
          <View style={styles.listaContainer}>
            {categoria.ambientes.map((ambiente, index) => renderAmbiente(ambiente, index))}
          </View>

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
    paddingBottom: 8,
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
  scrollView: {
    flex: 1,
  },
  listaContainer: {
    paddingTop: 8,
  },
});
