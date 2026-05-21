import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import { H1, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';

import { AID_KIT_ITEMS } from '../../data/kits/first_aid';
import KitService from '../../services/KitService';
import ProfileService from '../../services/ProfileService';

const ACCENT = '#EF4444'; // red — primeiros socorros

export default function KitPrimeirosSocorrosScreen({ navigation }) {
  const { t } = useTranslation('common');
  const [checkedItems, setCheckedItems] = useState([]);
  const [residenceId, setResidenceId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const id = await ProfileService.getActiveResidenceId();
      setResidenceId(id);
      const state = await KitService.loadKitState('socorros', id);
      setCheckedItems(state || []);
    } catch (error) {
      if (__DEV__) console.error('Error loading kit state:', error);
    }
  };

  const toggleItem = async (id) => {
    const newItems = checkedItems.includes(id)
      ? checkedItems.filter(item => item !== id)
      : [...checkedItems, id];
    setCheckedItems(newItems);

    if (residenceId) {
      await KitService.saveKitState('socorros', residenceId, newItems);
    }
  };

  const items = AID_KIT_ITEMS || [];
  const progress = items.length > 0 ? checkedItems.length / items.length : 0;
  const progressPct = Math.round(progress * 100);

  return (
    <AppBackground>
      <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar style="dark" />

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
              {t('headersFirst.kitPrimeirosSocorros', 'Primeiros socorros')}
            </H1>
            <Caption style={s.subtitle}>
              {checkedItems.length} de {items.length} itens
            </Caption>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={s.content}
          showsVerticalScrollIndicator={false}
        >
          {/* HERO CARD VERMELHO — urgência justificada */}
          <View style={s.heroCard}>
            <View style={s.heroIconCircle}>
              <NeoIcon name="Health" size={32} color="#FFF" variant="Bold" />
            </View>
            <Body style={s.heroTitle}>
              {t('headersFirst.kitPrimeirosSocorros', 'Kit de primeiros socorros')}
            </Body>
            <Small style={s.heroSubtitle}>
              {t('headersFirst.essencialParaOAtendimentoImediatoDeLesEs', 'Essencial para atendimento imediato de lesões antes da chegada de ajuda profissional.')}
            </Small>

            <AnimatedProgressBar
              value={progressPct}
              color="#FFF"
              trackColor="rgba(0,0,0,0.18)"
              height={8}
              style={{ marginBottom: 8 }}
              accessibilityLabel={`${progressPct}% completo`}
            />
            <Small style={s.progressText}>{progressPct}% completo</Small>
          </View>

          {/* CONTEÚDO */}
          <Small style={s.sectionLabel}>
            {(t('headersFirst.conteDoRecomendado', 'Conteúdo recomendado') || '').toUpperCase()}
          </Small>

          {items.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <NeoCard
                key={item.id}
                variant="elevated"
                style={[s.itemCard, isChecked && s.itemCardChecked]}
              >
                <TouchableOpacity
                  onPress={() => toggleItem(item.id)}
                  activeOpacity={0.85}
                  style={s.itemRow}
                >
                  <View style={[s.itemIcon, isChecked && s.itemIconChecked]}>
                    <NeoIcon
                      name={isChecked ? 'TickCircle' : 'Health'}
                      size={18}
                      color={isChecked ? '#FFF' : ACCENT}
                      variant="Bold"
                    />
                  </View>
                  <View style={s.itemInfo}>
                    <Body style={[s.itemName, isChecked && s.itemNameChecked]}>
                      {item.text}
                    </Body>
                    <Small style={s.itemDesc}>{item.category}</Small>
                  </View>
                  <View style={[s.checkbox, isChecked && s.checkboxChecked]}>
                    {isChecked && <NeoIcon name="Tick" size={14} color="#FFF" variant="Bold" />}
                  </View>
                </TouchableOpacity>
              </NeoCard>
            );
          })}

          {/* TIP */}
          <View style={s.tipBox}>
            <NeoIcon name="InfoCircle" size={18} color={ACCENT} variant="Bold" />
            <Small style={s.tipText}>
              {t('headersFirst.mantenhaEsteKitEmLocalFrescoSecoEForaDoA', 'Mantenha o kit em local fresco, seco e fora do alcance de crianças, mas de fácil acesso para adultos.')}
            </Small>
          </View>
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
    fontSize: 22,
  },
  subtitle: {
    color: Neo.colors.neutral[600],
  },

  // Content
  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

  // Hero
  heroCard: {
    backgroundColor: ACCENT,
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.22)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 18,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  // Section
  sectionLabel: {
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: Neo.colors.neutral[600],
    marginBottom: 10,
    marginTop: 4,
    textTransform: 'uppercase',
  },

  // Items
  itemCard: {
    padding: 0,
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  itemCardChecked: {
    backgroundColor: ACCENT + '12',
    borderWidth: 1,
    borderColor: ACCENT + '40',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: ACCENT + '1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemIconChecked: {
    backgroundColor: ACCENT,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Neo.colors.neutral[900],
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  itemNameChecked: {
    color: Neo.colors.neutral[700],
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  itemDesc: {
    fontSize: 11.5,
    color: Neo.colors.neutral[600],
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },

  // Tip
  tipBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: ACCENT + '12',
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    gap: 10,
  },
  tipText: {
    flex: 1,
    color: Neo.colors.neutral[800],
    fontSize: 12.5,
    lineHeight: 18,
  },
});
