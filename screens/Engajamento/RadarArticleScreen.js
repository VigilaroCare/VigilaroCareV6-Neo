/**
 * RadarArticleScreen.js
 * Tela de detalhe do artigo do Radar Vigilaro
 * Substitui AconteceuArticleScreen.js
 *
 * Novidades vs versão anterior:
 * - Orientações práticas embutidas no artigo (não mais card externo)
 * - Removido botão "Ler na Íntegra" (link para Google)
 * - Removido card redundante "Riscos e Orientações por Ambiente"
 * - Exibe causa raiz quando disponível
 * - Badge visual diferenciado por formato (caso/fato/protocolo/sazonal)
 */

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import AppBackground from '../../components/AppBackground';
import NeoIcon from '../../components/NeoIcon';
import { ArrowLeft, ShieldTick, InfoCircle, Danger, ArrowRight2 } from 'iconsax-react-native';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const FORMAT_CONFIG = {
  caso:      { label: 'Caso Real',      cor: '#DC2626', bg: '#FFF5F5', iconeBg: '#FECACA' },
  fato:      { label: 'Dado de Impacto',cor: '#1D4ED8', bg: '#EFF6FF', iconeBg: '#BFDBFE' },
  protocolo: { label: 'Protocolo',      cor: '#059669', bg: '#F0FDF4', iconeBg: '#A7F3D0' },
  sazonal:   { label: 'Alerta Sazonal', cor: '#D97706', bg: '#FFFBEB', iconeBg: '#FDE68A' },
};

export default function RadarArticleScreen({ route, navigation }) {
  const { article } = route.params || {};
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  const contentBg = isDark ? themeColors.neutral[200] : '#fff';
  const headerBg = isDark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)';

  if (!article) {
    return (
      <AppBackground>
        <SafeAreaView style={s.safeArea}>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={s.emptyState}>
            <Text style={s.emptyText}>Conteúdo não encontrado.</Text>
            <TouchableOpacity style={s.returnBtn} onPress={() => navigation.goBack()}>
              <Text style={s.returnBtnText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </AppBackground>
    );
  }

  const config = FORMAT_CONFIG[article.formato] || FORMAT_CONFIG.caso;
  const orientacoes = article.orientacoes || [];

  return (
    <AppBackground>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Header fixo */}
      <SafeAreaView style={[s.headerArea, { backgroundColor: headerBg }]} edges={['top', 'left', 'right']}>
        <View style={s.header}>
          <TouchableOpacity
            style={[s.backBtn, { backgroundColor: isDark ? 'rgba(28,28,30,0.6)' : 'rgba(255,255,255,0.6)', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <ArrowLeft size={24} color={textBody} />
          </TouchableOpacity>
          <View style={[s.badgeHeader, { backgroundColor: config.bg }]}>
            <ShieldTick size={14} color={config.cor} variant="Bold" />
            <Text style={[s.badgeHeaderText, { color: config.cor }]}>
              {config.label}
            </Text>
          </View>
          <View style={{ width: 44 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero colorido por categoria */}
        <View style={[s.hero, { backgroundColor: config.bg }]}>
          <View style={[s.heroBadge, { backgroundColor: config.iconeBg }]}>
            <NeoIcon
              name={article.icone || 'ShieldTick'}
              size={40}
              color={config.cor}
            />
          </View>
          {article.data && (
            <Text style={[s.heroData, { color: config.cor }]}>{article.data}</Text>
          )}
        </View>

        <View style={[s.content, { backgroundColor: contentBg }]}>

          {/* Título */}
          <Text style={[s.titulo, { color: textPrimary }]} accessibilityRole="header">{article.titulo}</Text>

          {/* Destaque (para fatos) */}
          {article.destaque && (
            <View style={[s.destaqueBox, { borderLeftColor: config.cor }]}>
              <Text style={[s.destaqueTexto, { color: config.cor }]}>
                {article.destaque}
              </Text>
            </View>
          )}

          {/* Narrativa / Resumo */}
          <Text style={[s.narrativa, { color: textBody }]}>
            {article.narrativa || article.resumo}
          </Text>

          {/* Causa Raiz — apenas para casos */}
          {article.causaRaiz && (
            <View style={s.causaBox}>
              <View style={s.causaHeader}>
                <Danger size={16} color="#D97706" variant="Bold" />
                <Text style={s.causaLabel}>Por que aconteceu</Text>
              </View>
              <Text style={s.causaTexto}>{article.causaRaiz}</Text>
            </View>
          )}

          {/* Orientações Práticas */}
          {orientacoes.length > 0 && (
            <View style={s.orientacoesBox}>
              <View style={s.orientacoesHeader}>
                <ShieldTick size={18} color={Neo.colors.primary[600]} variant="Bold" />
                <Text style={s.orientacoesTitle}>Como evitar</Text>
              </View>

              {orientacoes.map((orientacao, i) => (
                <View key={i} style={s.orientacaoItem}>
                  <View style={[s.orientacaoNum, { backgroundColor: Neo.colors.primary[500] }]}>
                    <Text style={s.orientacaoNumText}>{i + 1}</Text>
                  </View>
                  <Text style={s.orientacaoTexto}>{orientacao}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Fonte */}
          {article.fonte && (
            <View style={s.fonteBox}>
              <InfoCircle size={14} color={Neo.colors.neutral[400]} />
              <Text style={s.fonteTexto}>{article.fonte}</Text>
            </View>
          )}

          {/* Link para o feed completo */}
          <TouchableOpacity 
            style={s.verMaisBtn}
            onPress={() => navigation.navigate('RadarVigilaro')}
            activeOpacity={0.7}
          >
            <Text style={s.verMaisText}>Ler outras histórias no Radar da Prevenção</Text>
            <ArrowRight2 size={14} color={Neo.colors.primary[600]} />
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerArea: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  badgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  badgeHeaderText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 190,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  heroBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  heroData: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.8,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
    color: Neo.colors.neutral[900],
    lineHeight: 30,
    marginBottom: 20,
  },
  destaqueBox: {
    borderLeftWidth: 4,
    paddingLeft: 14,
    marginBottom: 20,
  },
  destaqueTexto: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  narrativa: {
    fontSize: 16,
    color: Neo.colors.neutral[700],
    lineHeight: 28,
    textAlign: 'justify',
    marginBottom: 24,
  },
  causaBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  causaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  causaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D97706',
  },
  causaTexto: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 22,
  },
  orientacoesBox: {
    backgroundColor: Neo.colors.primary[50],
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Neo.colors.primary[100],
  },
  orientacoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  orientacoesTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Neo.colors.primary[800],
  },
  orientacaoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },
  orientacaoNum: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  orientacaoNumText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
  },
  orientacaoTexto: {
    fontSize: 14,
    color: Neo.colors.neutral[700],
    lineHeight: 22,
    flex: 1,
  },
  fonteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Neo.colors.neutral[100],
  },
  fonteTexto: {
    fontSize: 12,
    color: Neo.colors.neutral[400],
    lineHeight: 18,
    flex: 1,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: Neo.colors.neutral[600],
    marginBottom: 16,
  },
  returnBtn: {
    backgroundColor: Neo.colors.primary[500],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  returnBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  verMaisBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 24,
    paddingVertical: 12,
    backgroundColor: Neo.colors.primary[50],
    borderRadius: 12,
  },
  verMaisText: {
    fontSize: 13,
    fontWeight: '700',
    color: Neo.colors.primary[600],
  },
});
