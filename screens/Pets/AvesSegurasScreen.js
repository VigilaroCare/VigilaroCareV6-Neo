import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
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

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />

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
              {t('avesSeguras.headerTitle', 'Aves seguras')}
            </H1>
            <Caption style={s.subtitle}>
              {t('avesSeguras.subtitle', 'Ambiente e diagnóstico')}
            </Caption>
          </View>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* Hero banner — imagem do card de origem */}
          {petHero && (
            <PetHeroBanner
              image={petHero.imagem}
              imageUrl={petHero.imagemUrl}
              tint={petHero.cor || '#FBC02D'}
              resizeMode={petHero.resizeMode || 'cover'}
              accessibilityLabel={petHero.titulo}
              marginHorizontal={0}
              marginBottom={14}
            />
          )}

          {/* HERO */}
          <NeoCard variant="elevated" style={s.heroCard}>
            <View style={s.heroIconCircle}>
              <Text style={{ fontSize: 32 }}>🦜</Text>
            </View>
            <H3 style={s.heroTitle}>{t_field(AVES_SEGURAS_DATA.hero, 'title')}</H3>
            <Body style={s.heroDesc}>{t_field(AVES_SEGURAS_DATA.hero, 'desc')}</Body>
          </NeoCard>

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
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
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
  title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
  subtitle: { color: Neo.colors.neutral[600] },

  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

  heroCard: {
    padding: 22,
    paddingVertical: 28,
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 18,
  },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E1F5FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 17,
    fontWeight: '800',
  },
  heroDesc: {
    color: Neo.colors.neutral[700],
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13.5,
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
