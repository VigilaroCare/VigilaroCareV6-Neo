import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { PET_FOOD_SAFETY } from '../../data/pet_food_safety';
import { t_field } from '../../utils/getLocalizedField';
import { useIsDark } from '../../utils/ThemeContext';

export default function PetFoodSafetyScreen({ navigation }) {
  const { t } = useTranslation('common');
  const isDark = useIsDark();

  const callCiatox = () => Linking.openURL('tel:08007226001');

  const renderCard = (item) => (
    <NeoCard variant="elevated" key={item.id} style={s.itemCard}>
      <View style={[s.itemHeader, { borderLeftWidth: 4, borderLeftColor: item.cor }]}>
        <View style={[s.itemIcon, { backgroundColor: item.cor + '1A' }]}>
          <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <H3 style={s.itemTitle}>{t_field(item, 'nome')}</H3>
          <View style={[s.itemBadge, { backgroundColor: item.cor }]}>
            <Small style={s.itemBadgeText}>
              RISCO {(t_field(item, 'risco') || '').toUpperCase()}
            </Small>
          </View>
        </View>
      </View>

      <View style={s.itemBody}>
        <View style={s.itemRow}>
          <Small style={s.itemLabel}>{t('headersFirst.toxina', 'Toxina')}</Small>
          <Small style={s.itemValue}>{t_field(item, 'toxina')}</Small>
        </View>
        <View style={s.itemRow}>
          <Small style={s.itemLabel}>{t('headersFirst.sintomas', 'Sintomas')}</Small>
          <Small style={s.itemValue}>{t_field(item, 'sintomas')}</Small>
        </View>
        <View style={s.itemTipRow}>
          <NeoIcon name="Lovely" size={12} color={Neo.colors.primary[600]} variant="Bold" />
          <Body style={s.itemTipText}>{t_field(item, 'detalhe')}</Body>
        </View>
      </View>
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
              {t('petFood.headerTitle', 'Lista negra')}
            </H1>
            <Caption style={s.subtitle}>
              {t('petFood.subtitle', 'Alimentos perigosos para pets')}
            </Caption>
          </View>
        </View>

        <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
          {/* HERO */}
          <NeoCard variant="elevated" style={s.heroCard}>
            <View style={s.heroIconCircle}>
              <NeoIcon name="Danger" size={28} color="#FFF" variant="Bold" />
            </View>
            <H3 style={s.heroTitle}>
              {t('petFood.heroTitle', 'Alimentos proibidos')}
            </H3>
            <Body style={s.heroDesc}>
              {t('petFood.heroDesc', 'Metabolismos diferentes tornam petiscos de humanos em venenos letais para cães e gatos. Memorize esta lista.')}
            </Body>
          </NeoCard>

          {/* CIATOX */}
          <TouchableOpacity onPress={callCiatox} activeOpacity={0.85}>
            <NeoCard variant="elevated" style={s.ciatoxCard}>
              <View style={s.ciatoxIcon}>
                <NeoIcon name="Call" size={20} color="#D32F2F" variant="Bold" />
              </View>
              <View style={{ flex: 1 }}>
                <H3 style={s.ciatoxTitle}>
                  {t('petFood.alertTitle', 'Intoxicação recente?')}
                </H3>
                <Body style={s.ciatoxDesc}>
                  {t('petFood.alertDesc', 'Acione o CIATOX · 0800 722 6001')}
                </Body>
              </View>
              <NeoIcon name="ArrowRight2" size={18} color="#D32F2F" />
            </NeoCard>
          </TouchableOpacity>

          <Small style={s.sectionLabel}>
            {(t('petFood.listTitle', 'Mosaico de riscos') || '').toUpperCase()}
          </Small>

          {PET_FOOD_SAFETY.map(renderCard)}
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
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
  },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF5350',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    color: '#B91C1C',
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 17,
    fontWeight: '800',
  },
  heroDesc: {
    color: '#991B1B',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13.5,
  },

  ciatoxCard: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#D32F2F',
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    marginBottom: 20,
    gap: 12,
  },
  ciatoxIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D32F2F1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ciatoxTitle: { color: '#B91C1C', fontSize: 14, fontWeight: '800' },
  ciatoxDesc: { color: '#991B1B', fontSize: 12.5, marginTop: 2 },

  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  itemCard: {
    marginBottom: 12,
    padding: 0,
    overflow: 'hidden',
    borderRadius: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  itemIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 15,
    color: Neo.colors.neutral[900],
    marginBottom: 4,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  itemBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  itemBadgeText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  itemBody: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  itemLabel: {
    width: 72,
    fontWeight: '800',
    color: Neo.colors.neutral[600],
    fontSize: 11.5,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  itemValue: {
    flex: 1,
    color: Neo.colors.neutral[800],
    fontWeight: '500',
    fontSize: 12.5,
    lineHeight: 17,
  },
  itemTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 8,
  },
  itemTipText: {
    flex: 1,
    fontSize: 12,
    color: Neo.colors.neutral[700],
    fontStyle: 'italic',
    lineHeight: 17,
  },
});
