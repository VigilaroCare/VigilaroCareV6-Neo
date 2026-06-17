import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { AVES_SEGURAS_DATA } from '../../data/aves_seguras_data';
import { t_field } from '../../utils/getLocalizedField';
import { useIsDark } from '../../utils/ThemeContext';

export default function AvesSegurasScreen({ navigation, route }) {
  const { t } = useTranslation('common');
  const isDark = useIsDark();
  const petHero = route?.params?.petHero;

  const renderRiscoCard = (title, message, icon, color, bg) => (
    <NeoCard variant="elevated" style={[s.riscoCard, { borderLeftWidth: 4, borderLeftColor: color }]}>
      <View style={s.riscoHeader}>
        <View style={[s.riscoIcon, { backgroundColor: bg || (color + '1A') }]}>
          <NeoIcon name={icon} size={18} color={color} variant="Bold" />
        </View>
        <H3 style={s.riscoTitle}>{title}</H3>
      </View>
      <Body style={s.riscoMessage}>{message}</Body>
    </NeoCard>
  );

  const surface = isDark ? Neo.colors.neutral[100] : '#FFFFFF';
  const scrollY = useRef(new Animated.Value(0)).current;
  const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);

  const title = t('avesSeguras.headerTitle', 'Aves seguras');
  const subtitle = t('avesSeguras.subtitle', 'Ambiente e diagnóstico');
  const cor = petHero?.cor || '#FBC02D';

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
          contentContainerStyle={{ paddingBottom: 120 }}
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
                      source={petHero.imagemUrl ? { uri: petHero.imagemUrl } : petHero.imagem}
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
            {/* ALERTA CRÍTICO */}
          <NeoCard variant="elevated" style={s.alertCard}>
            <View style={s.alertHeader}>
              <View style={s.alertIcon}>
                <NeoIcon name="Danger" size={18} color="#D32F2F" variant="Bold" />
              </View>
              <H3 style={s.alertTitle}>{t_field(AVES_SEGURAS_DATA.alertaCritico, 'title')}</H3>
            </View>
            <Body style={s.alertDesc}>{t_field(AVES_SEGURAS_DATA.alertaCritico, 'desc')}</Body>
            <View style={s.alertSmall}>
              <Small style={s.alertSmallText}>
                {t_field(AVES_SEGURAS_DATA.alertaCritico, 'small')}
              </Small>
            </View>
          </NeoCard>

          <Small style={s.sectionLabel}>
            {(t('avesSeguras.environmentTitle', 'Ambiente saudável') || '').toUpperCase()}
          </Small>

          {AVES_SEGURAS_DATA.riscos.map((risco, index) => (
            <View key={index}>
              {renderRiscoCard(
                t_field(risco, 'title'),
                t_field(risco, 'message'),
                risco.icon,
                risco.color,
                risco.bg
              )}
            </View>
          ))}

          {/* DIAGNÓSTICO CTA */}
          <NeoCard variant="elevated" style={s.diagnosticoCard}>
            <H3 style={s.diagnosticoTitle}>{t_field(AVES_SEGURAS_DATA.diagnostico, 'title')}</H3>
            <Body style={s.diagnosticoDesc}>{t_field(AVES_SEGURAS_DATA.diagnostico, 'desc')}</Body>
            <TouchableOpacity
              style={s.diagnosticoBtn}
              onPress={() => navigation.navigate('PetFoodSafety')}
              activeOpacity={0.85}
            >
              <Body style={s.diagnosticoBtnText}>
                {t_field(AVES_SEGURAS_DATA.diagnostico, 'btn')}
              </Body>
            </TouchableOpacity>
          </NeoCard>
          </View>
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
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

  alertCard: {
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 3,
    borderLeftColor: '#D32F2F',
    marginBottom: 20,
    borderRadius: 14,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  alertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D32F2F24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    color: '#B91C1C',
    flex: 1,
    textTransform: 'uppercase',
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  alertDesc: {
    color: '#7F1D1D',
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 13.5,
    lineHeight: 19,
  },
  alertSmall: {
    backgroundColor: 'rgba(211,47,47,0.1)',
    padding: 10,
    borderRadius: 8,
  },
  alertSmallText: {
    color: '#B91C1C',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 17,
  },

  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  riscoCard: {
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
  },
  riscoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  riscoIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  riscoTitle: {
    flex: 1,
    fontSize: 14.5,
    color: Neo.colors.neutral[900],
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  riscoMessage: {
    color: Neo.colors.neutral[700],
    fontSize: 13,
    lineHeight: 19,
  },

  diagnosticoCard: {
    marginTop: 14,
    padding: 16,
    backgroundColor: '#F3E5F5',
    borderRadius: 14,
  },
  diagnosticoTitle: {
    color: '#6A1B9A',
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '800',
  },
  diagnosticoDesc: {
    color: Neo.colors.neutral[800],
    marginBottom: 14,
    fontSize: 13.5,
    lineHeight: 19,
  },
  diagnosticoBtn: {
    backgroundColor: '#8E24AA',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  diagnosticoBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },
});
