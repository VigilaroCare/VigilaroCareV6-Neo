/**
 * RadarVigilaroScreen.js
 * Feed do Radar Vigilaro — Casos Reais
 * Substitui AconteceuFeedScreen.js
 */

import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity,
  Animated, Text
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoTypography from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import RadarVigilaroService from '../../services/RadarVigilaroService';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

// ─── Paleta de ícones por formato ──────────────────────────────────────────
const FORMAT_CONFIG = {
  caso:      { label: 'Caso Real',    labelCor: '#DC2626', bg: '#FFF5F5' },
  fato:      { label: 'Dado de Impacto', labelCor: '#1D4ED8', bg: '#EFF6FF' },
  protocolo: { label: 'Protocolo',    labelCor: '#059669', bg: '#F0FDF4' },
  sazonal:   { label: 'Alerta Sazonal', labelCor: '#D97706', bg: '#FFFBEB' },
};

// ─── Card do feed ────────────────────────────────────────────────────────────
const FeedCard = React.memo(({ item, onPress }) => {
  const config = FORMAT_CONFIG[item.formato] || FORMAT_CONFIG.caso;
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[s.card, { backgroundColor: cardBg }]}
    >
      <View style={s.cardInner}>
        {/* Badge formato + data */}
        <View style={s.cardHeader}>
          <View style={[s.badge, { backgroundColor: config.bg }]}>
            <NeoIcon name="ShieldTick" size={12} color={config.labelCor} />
            <Text style={[s.badgeText, { color: config.labelCor }]}>
              {config.label}
            </Text>
          </View>
          {item.data ? (
            <Text style={[s.dataText, { color: textMuted }]}>{item.data}</Text>
          ) : null}
        </View>

        {/* Título */}
        <Text style={[s.titulo, { color: textPrimary }]} numberOfLines={3}>{item.titulo}</Text>

        {/* Resumo / Narrativa */}
        <Text style={[s.resumo, { color: textBody }]} numberOfLines={3}>
          {item.narrativa || item.resumo}
        </Text>

        {/* Rodapé */}
        <View style={s.footer}>
          <Text style={s.fonteText} numberOfLines={1}>
            {item.fonte ? `Fonte: ${item.fonte}` : 'Radar da Prevenção'}
          </Text>
          <View style={s.ctaBtn}>
            <Text style={s.ctaText}>Ver completo</Text>
            <NeoIcon name="ArrowRight2" size={12} color="#fff" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ─── Tela principal ──────────────────────────────────────────────────────────
export default function RadarVigilaroScreen({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = () => {
    setLoading(true);
    setTimeout(() => {
      // Em produção, allProfiles viria do ProfileContext
      const data = RadarVigilaroService.getFeed([], 25);
      setFeed(data);
      setLoading(false);
    }, 500);
  };

  const handlePress = (item) => {
    navigation.navigate('RadarArticle', { article: item });
  };

  return (
    <AppBackground>
      <SafeAreaView style={s.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity
            style={s.backBtn}
            onPress={() => navigation.goBack()}
          >
            <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={s.headerTitle}>
            <NeoIcon name="ShieldTick" size={20} color={Neo.colors.primary[600]} variant="Bold" />
            <Text style={s.headerTitleText}>Radar da Prevenção</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        {/* Subtítulo */}
        <View style={s.subHeader}>
          <Text style={s.subText}>
            Casos reais. Orientações práticas. Prevenção que faz sentido.
          </Text>
          <Text style={s.updateText}>
            {RadarVigilaroService.getLastUpdateTime()}
          </Text>
        </View>

        {/* Feed */}
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FeedCard item={item} onPress={() => handlePress(item)} />
          )}
          contentContainerStyle={s.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={loadFeed}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

      </SafeAreaView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Neo.colors.primary[50],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerTitleText: {
    fontSize: 15,
    fontWeight: '700',
    color: Neo.colors.primary[700],
  },
  subHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Neo.colors.neutral[200],
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: Neo.colors.neutral[600],
    lineHeight: 18,
  },
  updateText: {
    fontSize: 11,
    color: Neo.colors.primary[500],
    fontWeight: '600',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 190,
  },
  card: {
    marginBottom: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardInner: {
    padding: 18,
    borderRadius: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  dataText: {
    fontSize: 11,
    color: Neo.colors.neutral[500],
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: Neo.colors.neutral[900],
    lineHeight: 22,
    marginBottom: 8,
  },
  resumo: {
    fontSize: 14,
    color: Neo.colors.neutral[600],
    lineHeight: 21,
    marginBottom: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  fonteText: {
    fontSize: 11,
    color: Neo.colors.neutral[400],
    flex: 1,
    marginRight: 8,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Neo.colors.primary[500],
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});
