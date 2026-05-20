import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import NeoIcon from '../../components/NeoIcon';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react-native';
import AppBackground from '../../components/AppBackground';
import NeoCard from '../../components/NeoCard';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { riscosFisicos } from '../../data/riscos_fisicos';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../../utils/getLocalizedField';



export default function RiscosFisicosScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation('common');
  const THEME_COLOR = '#D97706'; // Amber 600 - Darker for white text contrast

  // Icon Mapping based on Emoji or ID from data
  const getIconData = (item) => {
    if (item.emoji === '⚡') return { icon: "Flash", color: '#F59E0B', bg: '#FEF3C7' }; // Amber
    if (item.emoji === '🔥') return { icon: "Danger", color: '#EF4444', bg: '#FEE2E2' }; // Red
    if (item.emoji === '🔫') return { icon: "CloseCircle", color: '#6366F1', bg: '#E0E7FF' }; // Indigo
    if (item.emoji === '🤕') return { icon: "Health", color: '#10B981', bg: '#D1FAE5' }; // Emerald
    if (item.emoji === '💧') return { icon: "Information", color: '#3B82F6', bg: '#DBEAFE' }; // Blue
    return { icon: "Warning2", color: '#9CA3AF', bg: '#F3F4F6' }; // Gray Fallback
  };

  const handlePress = (item) => {
    const iconData = getIconData(item);

    const title = t_field(item, 'nome');
    const risk = t_field(item, 'risco');

    const adaptedItem = {
      titulo: title,
      subtitulo: risk,
      icon: iconData.icon,
      iconColor: iconData.color,
      bg: iconData.bg,
      definicao: t_field(item, 'descricao'),
      importancia: `Risco Principal: ${risk}`,
      comoEvitar: t_array(item, 'prevencao'),
      primeirosSocorros: t_field(item, 'primeirosSocorros'),
      ...item
    };

    navigation.navigate('ConceitoDetail', {
      conceito: adaptedItem
    });
  };

  return (
    <AppBackground>
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      {/* Custom Colored Header - NOW TACTICAL CALM COMPACT */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
          <NeoCard variant="glass"
              style={{
                  width: '100%',
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  ...Neo.shadows?.sm
              }}
          >
              <View style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: '#FFF8E1', alignItems: 'center', justifyContent: 'center',
                  marginRight: 16
              }}>
                  <Text style={{ fontSize: 24 }}>⚡</Text>
              </View>
              <View style={{ flex: 1 }}>
                  <Text style={{ color: THEME_COLOR, fontSize: 16, marginBottom: 2, fontWeight: 'bold' }}>{t('riscosFisicos.headerTitle')}</Text>
                  <Text style={{ color: Neo.colors.neutral[600], fontSize: 13, fontWeight: '600' }}>{t('riscosFisicos.headerSubtitle')}</Text>
              </View>
          </NeoCard>
      </View>

      {/* Vertical List */}
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 240 }} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {riscosFisicos.map((item) => {
            const { icon: IconStr, color, bg } = getIconData(item);
            return (
              <TouchableOpacity key={item.id} style={{ marginBottom: 16 }} onPress={() => handlePress(item)} activeOpacity={0.8}>
                <View style={styles.guideCardOuter}>
                  <View style={styles.guideCardInner}>
                    <View style={[styles.guideImageContainer, { backgroundColor: bg }]}>
                      <NeoIcon name={IconStr} size={48} color={color} variant="Bold" />
                    </View>
                    <View style={styles.guideContent}>
                      <View style={{ flex: 1, paddingRight: 8 }}>
                        <Text style={styles.guideTitle} numberOfLines={1}>{t_field(item, 'nome')}</Text>
                        <Text style={styles.guideSubtitle} numberOfLines={2}>{t_field(item, 'risco')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
  },
  guideCardOuter: {
    borderRadius: 24,
    ...Shadows.sm
  },
  guideCardInner: {
    flexDirection: 'row',
    height: 120, // Altura fixa para manter imagem expandida e padronizada
    backgroundColor: '#FFFFFF', // Sólido para evitar vazamento de sombra no Android
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  guideImageContainer: {
    width: 120,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  guideTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    fontWeight: '700',
    color: Neo.colors.neutral[800],
    marginBottom: 4
  },
  guideSubtitle: {
    fontSize: 14,
    color: Neo.colors.neutral[600],
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 20
  }
});
