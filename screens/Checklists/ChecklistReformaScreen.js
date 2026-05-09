/**
 * ChecklistReformaScreen.js
 * Checklist de segurança para período de reforma
 * Vigilaro Care V6 Neo — Padronizado Neo Design
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft2, TickCircle, Building4 } from 'iconsax-react-native';
import { RENOVATION_CHECKLISTS, RENOVATION_TYPES } from '../../data/renovationChecklists';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import AppBg from '../../components/AppBackground';
import ScaleButton from '../../components/ScaleButton';
import GamificationService from '../../services/GamificationService';

const THEME_COLOR = Neo.colors.feedback.warning; // Standardized token

export default function ChecklistReformaScreen({ route, navigation }) {
    const { t } = useTranslation('common');
  const { renovationType = RENOVATION_TYPES.HOME } = route.params || {};

  const ITEMS = useMemo(() => {
    return RENOVATION_CHECKLISTS[renovationType] || RENOVATION_CHECKLISTS[RENOVATION_TYPES.HOME];
  }, [renovationType]);

  const [state, setState] = useState({});
  const [durationDays, setDurationDays] = useState(7);

  useEffect(() => {
    async function loadState() {
      try {
        const key = `@checklist_reforma_${renovationType}`;
        const saved = await AsyncStorage.getItem(key);
        if (saved) {
          setState(JSON.parse(saved));
        } else {
          const initialState = ITEMS.reduce((s, it) => ({ ...s, [it.key]: false }), {});
          setState(initialState);
        }
      } catch (e) {
        console.warn('Failed to load checklist state', e);
      }
    }
    loadState();
  }, [ITEMS, renovationType]);

  const toggle = async (key) => {
    const newState = { ...state, [key]: !state[key] };
    setState(newState);
    try {
      const keyStorage = `@checklist_reforma_${renovationType}`;
      await AsyncStorage.setItem(keyStorage, JSON.stringify(newState));
    } catch (e) {
      console.warn('Failed to save checklist state', e);
    }
  };

  const completedCount = useMemo(() => ITEMS.filter(i => state[i.key]).length, [state, ITEMS]);
  const totalCount = ITEMS.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const tempIndex = useMemo(() => {
    const base = 90;
    const penalty = ((ITEMS.length - completedCount) / ITEMS.length) * 40;
    return Math.max(10, Math.round(base - penalty));
  }, [completedCount, ITEMS]);

  async function ativarModo() {
    await GamificationService.addPoints('CHECKLIST_COMPLETE');
    navigation.navigate('ModoSituacaoAtiva', {
      type: 'reforma',
      title: `Reforma (${renovationType})`,
      durationDays,
      tempIndex,
      checklistState: state,
    });
  }

  return (
    <AppBg variant="subtle">
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'bottom']}>
        <StatusBar style="dark" />

        {/* Header Neo */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' }}
          >
            <ArrowLeft2 size={22} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <H2 style={{ color: Neo.colors.neutral[800] }}>{t('headersFirst.checklistReforma', 'Checklist: Reforma')}</H2>
            <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>Tipo: {renovationType.toUpperCase()}</Small>
          </View>
          <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: THEME_COLOR + '15', alignItems: 'center', justifyContent: 'center' }}>
            <Building4 size={22} color={THEME_COLOR} variant="Bold" />
          </View>
        </View>

        {/* Progress Bar Compacta */}
        <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
          <NeoCard variant="glass" padding={12} style={{ backgroundColor: Neo.colors.neutral.white }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <View>
                <Small style={{ color: Neo.colors.neutral[500], fontWeight: '600' }}>{completedCount}/{totalCount} verificados</Small>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                <Small style={{ color: Neo.colors.neutral[400] }}>Duração: {durationDays}d</Small>
                <H3 style={{ color: percentage === 100 ? Neo.colors.feedback.success : THEME_COLOR }}>{percentage}%</H3>
              </View>
            </View>
            <View style={{ height: 6, backgroundColor: Neo.colors.neutral[200], borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ width: `${percentage}%`, height: '100%', backgroundColor: percentage === 100 ? Neo.colors.feedback.success : THEME_COLOR, borderRadius: 3 }} />
            </View>
          </NeoCard>
        </View>

        {/* Lista de Itens */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {ITEMS.map((it) => {
            const isChecked = !!state[it.key];
            return (
              <TouchableOpacity key={it.key} activeOpacity={0.7} onPress={() => toggle(it.key)}>
                <NeoCard variant="glass" style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  marginBottom: 8,
                  backgroundColor: Neo.colors.neutral.white,
                  borderRadius: 18,
                  borderWidth: 1,
                  borderColor: isChecked ? Neo.colors.feedback.success + '33' : Neo.colors.neutral[100],
                }}>
                  {/* Checkbox circular */}
                  <View style={{
                    width: 28, height: 28, borderRadius: 14, marginRight: 12,
                    backgroundColor: isChecked ? Neo.colors.feedback.success : 'transparent',
                    borderWidth: isChecked ? 0 : 2,
                    borderColor: isChecked ? 'transparent' : Neo.colors.neutral[300],
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    {isChecked && <TickCircle size={16} color={Neo.colors.neutral.white} variant="Bold" />}
                  </View>

                  {/* Label */}
                  <Body style={{
                    flex: 1,
                    color: isChecked ? Neo.colors.neutral[400] : Neo.colors.neutral[900],
                    fontWeight: '600',
                    fontSize: 15,
                    lineHeight: 20,
                    textDecorationLine: isChecked ? 'line-through' : 'none',
                  }}>
                    {it.label}
                  </Body>
                </NeoCard>
              </TouchableOpacity>
            );
          })}

          {/* Botão Ativar Modo */}
          <ScaleButton onPress={ativarModo} style={{ marginTop: 16 }}>
            <NeoCard variant="glass" style={{
              backgroundColor: THEME_COLOR,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              ...Neo.shadows.md,
            }}>
              <Building4 size={22} color={Neo.colors.neutral.white} variant="Bold" />
              <H3 style={{ color: Neo.colors.neutral.white, marginLeft: 10 }}>{t('headersFirst.ativarModoReforma', 'Ativar Modo Reforma')}</H3>
            </NeoCard>
          </ScaleButton>

          <TouchableOpacity style={{ marginTop: 12, alignItems: 'center', paddingVertical: 12 }} onPress={() => navigation.goBack()}>
            <Small style={{ color: Neo.colors.neutral[500], fontWeight: '600' }}>{t('headersFirst.voltar', 'Voltar')}</Small>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </AppBg>
  );
}
