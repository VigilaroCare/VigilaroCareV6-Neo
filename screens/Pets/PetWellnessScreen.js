import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { PET_WELLNESS_DATA } from '../../data/pet_wellness_data';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function PetWellnessScreen({ navigation, route }) {
  const { t } = useTranslation('common');
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const petHero = route?.params?.petHero;
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[800];

  const renderCategory = (item) => (
    <View key={item.id} style={s.section}>
      <View style={s.sectionHeader}>
        <View style={[s.iconCircle, { backgroundColor: item.cor + '1F' }]}>
          <NeoIcon name={item.icone} size={20} color={item.cor} variant="Bold" />
        </View>
        <Text style={[s.sectionTitle, { color: textPrimary }]} accessibilityRole="header">{t_field(item, 'titulo')}</Text>
      </View>

      <View style={s.tipsContainer}>
        {item.dicas.map((dica, index) => (
          <NeoCard
            key={index}
            variant="elevated"
            style={[s.tipCard, { borderLeftWidth: 3, borderLeftColor: item.cor }]}
          >
            <View style={[s.petBadge, { borderColor: item.cor, backgroundColor: item.cor + '14' }]}>
              <Text style={[s.petBadgeText, { color: item.cor }]}>
                {t_field(dica, 'pet')}
              </Text>
            </View>
            <Text style={[s.tipText, { color: textBody }]}>{t_field(dica, 'texto')}</Text>
          </NeoCard>
        ))}
      </View>
    </View>
  );

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
            <H1 style={s.title}>
              {t('petWellness.title', 'Bem-estar pet')}
            </H1>
            <Caption style={s.subtitle}>
              {t('petWellness.subtitle', 'Cuidados diários para vida longa e feliz')}
            </Caption>
          </View>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* Hero banner — imagem do card de origem */}
          {petHero && (
            <PetHeroBanner
              image={petHero.imagem}
              imageUrl={petHero.imagemUrl}
              tint={petHero.cor || '#16A34A'}
              resizeMode={petHero.resizeMode || 'cover'}
              accessibilityLabel={petHero.titulo}
              marginHorizontal={0}
              marginBottom={14}
            />
          )}

          {/* Intro card */}
          <NeoCard variant="elevated" style={s.infoCard}>
            <View style={s.infoIconCircle}>
              <NeoIcon name="Heart" size={18} color="#10B981" variant="Bold" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.infoTitle, { color: textPrimary }]} accessibilityRole="header">
                {t('petWellness.introTitle', 'Prevenção é amor')}
              </Text>
              <Text style={[s.infoText, { color: textBody }]}>
                {t('petWellness.introText', 'Pequenos ajustes na rotina podem evitar grandes emergências no futuro.')}
              </Text>
            </View>
          </NeoCard>

          {/* Categorias */}
          {PET_WELLNESS_DATA.categorias.map(renderCategory)}
        </ScrollView>
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

  // Content
  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingTop: 4,
    paddingBottom: 240,
  },

  // Info card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 20,
  },
  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(16,185,129,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    marginBottom: 3,
  },
  infoText: {
    fontSize: 12.5,
    color: Neo.colors.neutral[700],
    lineHeight: 17,
  },

  // Section
  section: {
    marginBottom: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    letterSpacing: -0.3,
  },

  // Tips
  tipsContainer: {
    gap: 10,
  },
  tipCard: {
    padding: 14,
    borderRadius: 14,
  },
  petBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  petBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  tipText: {
    fontSize: 14,
    color: Neo.colors.neutral[800],
    lineHeight: 20,
  },
});
