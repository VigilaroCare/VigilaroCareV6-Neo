import React, { useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';
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

  const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';
  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);

  const title = t('petWellness.title', 'Bem-estar pet');
  const subtitle = t('petWellness.subtitle', 'Cuidados diários para vida longa e feliz');
  const cor = petHero?.cor || '#16A34A';

  const heroTransform = [
      {
          translateY: scrollY.interpolate({
              inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
              outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
              extrapolate: 'clamp',
          })
      },
      {
          scale: scrollY.interpolate({
              inputRange: [-HERO_HEIGHT, 0],
              outputRange: [2, 1],
              extrapolateRight: 'clamp',
          })
      }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: surface }}>
      <StatusBar style="light" />

      {/* Float Header / Back Button (fixo no topo da tela) */}
      <SafeAreaView edges={['top']} style={s.safeHeader}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={s.backBtnFlat}
              accessibilityRole="button"
              accessibilityLabel={t('common.back', 'Voltar')}
          >
              <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
          </TouchableOpacity>
      </SafeAreaView>

      <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          contentContainerStyle={{ paddingBottom: 240 }}
      >
          {/* HERO com parallax */}
          <Animated.View style={{
              width: '100%',
              height: HERO_HEIGHT,
              backgroundColor: cor,
              overflow: 'hidden',
              transform: heroTransform,
          }}>
              {petHero && (
                  <ReviewImage
                      source={petHero.imagemUrl ? (typeof petHero.imagemUrl === 'string' ? { uri: petHero.imagemUrl } : petHero.imagemUrl) : petHero.imagem}
                      style={StyleSheet.absoluteFill}
                      resizeMode={petHero.resizeMode || 'cover'}
                  />
              )}

              {/* Gradient para legibilidade do título e fusão com o fundo */}
              <LinearGradient
                  colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', surface]}
                  locations={[0, 0.35, 0.85, 1]}
                  style={StyleSheet.absoluteFill}
              />

              {/* Hero title — viaja junto com a parallax */}
              <View style={{
                  position: 'absolute',
                  bottom: 24,
                  paddingHorizontal: 22,
                  width: '100%',
              }}>
                  <Text style={{
                      fontSize: 34,
                      fontWeight: '900',
                      color: '#FFFFFF',
                      letterSpacing: -0.8,
                      lineHeight: 38,
                  }} accessibilityRole="header">
                      {title}
                  </Text>
                  <Text style={{
                      fontSize: 16,
                      color: 'rgba(255,255,255,0.9)',
                      marginTop: 6,
                      fontWeight: '600'
                  }}>
                      {subtitle}
                  </Text>
              </View>
          </Animated.View>

          {/* Main Content */}
          <View style={[s.content, { marginTop: 20 }]}>

          {/* Categorias */}
          {PET_WELLNESS_DATA.categorias.map(renderCategory)}
          </View>
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  // Header
  content: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  safeHeader: {
      position: 'absolute',
      top: 0, left: 0, right: 0,
      paddingHorizontal: 20,
      zIndex: 10,
  },
  backBtnFlat: {
      width: 44, height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0,0,0,0.3)',
      alignItems: 'center', justifyContent: 'center',
      marginTop: 10,
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
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
