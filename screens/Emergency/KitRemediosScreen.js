import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import AnimatedProgressBar from '../../components/AnimatedProgressBar';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { DS as Neo } from '../../utils/DesignSystem2026';

import { MEDICINE_ITEMS } from '../../data/kits/medicines';
import KitService from '../../services/KitService';
import ProfileService from '../../services/ProfileService';

const ACCENT = '#E91E63'; // pink — remédios

// Mapeamento defensivo de ícones de item (caso venham nomes não-iconsax do data)
const ICON_FALLBACK = {
  checkmark: 'TickCircle',
  'radio-button-off': 'Health',
  medical: 'Health',
};
const safeIcon = (name) => ICON_FALLBACK[name] || name || 'Health';

export default function KitRemediosScreen({ navigation }) {
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
      const state = await KitService.loadKitState('remedios', id);
      setCheckedItems(state || []);
    } catch (error) {
      if (__DEV__) console.error('Error loading remedios state:', error);
    }
  };

  const toggleItem = async (id) => {
    const newItems = checkedItems.includes(id)
      ? checkedItems.filter(item => item !== id)
      : [...checkedItems, id];
    setCheckedItems(newItems);

    if (residenceId) {
      await KitService.saveKitState('remedios', residenceId, newItems);
    }
  };

  const items = MEDICINE_ITEMS || [];
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
              {t('headersFirst.medicineKit', 'Kit de remédios')}
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
          <View style={s.heroCard}>
            <View style={s.heroIconCircle}>
              <NeoIcon name="Weight" size={32} color="#FFF" variant="Bold" />
            </View>
            <Body style={s.heroTitle}>
              {t('headersFirst.seuPortaRemDios', 'Seu porta-remédios')}
            </Body>
            <Small style={s.heroSubtitle}>
              {t('headersFirst.umaFarmCiaDomSticaOrganizadaGaranteAcess', 'Uma farmácia doméstica organizada garante acesso rápido a medicamentos com controle de validade.')}
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

          <Small style={s.sectionLabel}>
            {(t('headersFirst.listaDeItensEssenciais', 'Itens essenciais') || '').toUpperCase()}
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
                      name={isChecked ? 'TickCircle' : safeIcon(item.icon)}
                      size={18}
                      color={isChecked ? '#FFF' : ACCENT}
                      variant="Bold"
                    />
                  </View>
                  <View style={s.itemInfo}>
                    <Body style={[s.itemName, isChecked && s.itemNameChecked]}>
                      {item.name}
                    </Body>
                    <Small style={s.itemDesc}>{item.desc}</Small>
                  </View>
                  <View style={[s.checkbox, isChecked && s.checkboxChecked]}>
                    {isChecked && <NeoIcon name="Tick" size={14} color="#FFF" variant="Bold" />}
                  </View>
                </TouchableOpacity>
              </NeoCard>
            );
          })}

          <View style={s.tipBox}>
            <NeoIcon name="InfoCircle" size={18} color={ACCENT} variant="Bold" />
            <Small style={s.tipText}>
              {t('headersFirst.mantenhaRemDiosLongeDoAlcanceDeCrianAsEV', 'Mantenha remédios longe do alcance de crianças e verifique a validade regularmente.')}
            </Small>
          </View>
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
  title: {
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 2,
    fontSize: 22,
  },
  subtitle: {
    color: Neo.colors.neutral[600],
  },

  content: {
    paddingHorizontal: Neo.spacing.lg,
    paddingBottom: 190,
  },

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
