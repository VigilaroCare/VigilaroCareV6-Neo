import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoAlert from '../../utils/NeoAlert';

export default function ChecklistReportScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { respostas = {}, ambiente } = route.params || {};

  useEffect(() => {
    salvarNoHistorico();
  }, []);

  const salvarNoHistorico = async () => {
    try {
      const total = Object.keys(respostas).length;
      const conformes = Object.values(respostas).filter(r => r === 'sim').length;
      const naoConformes = Object.values(respostas).filter(r => r === 'nao').length;
      const naoAplicaveis = Object.values(respostas).filter(r => r === 'na').length;
      const score = total > 0 ? Math.round((conformes / (total - naoAplicaveis)) * 100) : 0;

      const novaAvaliacao = {
        data: new Date().toISOString(),
        ambiente: ambiente || 'Geral',
        ambientes: ambiente ? [ambiente] : [],
        score: score,
        conformes: conformes,
        naoConformes: naoConformes,
        naoAplicaveis: naoAplicaveis,
        total: total
      };

      const historicoData = await AsyncStorage.getItem('historicoAvaliacoes');
      let historico = historicoData ? JSON.parse(historicoData) : [];

      historico.push(novaAvaliacao);

      if (historico.length > 50) {
        historico = historico.slice(-50);
      }

      await AsyncStorage.setItem('historicoAvaliacoes', JSON.stringify(historico));
      console.log('Avaliação salva no histórico!');
    } catch (error) {
      console.log('Erro ao salvar no histórico:', error);
    }
  };

  const total = Object.keys(respostas).length;
  const conformes = Object.values(respostas).filter(r => r === 'sim').length;
  const naoConformes = Object.values(respostas).filter(r => r === 'nao' || r === 'risco' || r === false).length; // Flexible counting
  const naoAplicaveis = Object.values(respostas).filter(r => r === 'na').length;

  const totalValido = total - naoAplicaveis;
  const score = totalValido > 0 ? Math.round((conformes / totalValido) * 100) : 0;

  const getCorScore = () => {
    if (score >= 80) return Neo.colors.feedback.success;
    if (score >= 60) return Neo.colors.feedback.warning;
    return Neo.colors.feedback.error;
  };

  const getMensagem = () => {
    if (score >= 80) return { titulo: t('checklistReport.excellent'), texto: t('checklistReport.excellentMsg'), emoji: '🎉' };
    if (score >= 60) return { titulo: t('checklistReport.goodProgress'), texto: t('checklistReport.goodProgressMsg'), emoji: '👍' };
    return { titulo: t('checklistReport.attentionNeeded'), texto: t('checklistReport.attentionNeededMsg'), emoji: '⚠️' };
  };

  const mensagem = getMensagem();

  // --- SHARE FUNCTIONALITY ---
  const handleShare = async () => {
    NeoAlert.alert(
      t('checklistReport.privacyTitle'),
      t('checklistReport.privacyMsg'),
      [
        { text: t('checklistReport.cancel'), style: 'cancel' },
        {
          text: t('checklistReport.awareAndSend'),
          onPress: generateAndShare
        }
      ]
    );
  };

  const generateAndShare = async () => {
    try {
      const date = new Date().toLocaleDateString('pt-BR');
      let message = `🏡 *Relatório de Segurança - Vigilaro*\n`;
      message += `Data: ${date}\n`;
      message += `Ambiente: ${ambiente || 'Geral'}\n\n`;

      message += `📊 *Score de Segurança: ${score}%*\n`;
      message += `✅ Conformes: ${conformes}\n`;
      message += `⚠️ Pontos de Atenção: ${naoConformes}\n\n`;

      if (naoConformes > 0) {
        message += `*Itens que precisam de atenção:*\n`;
        Object.entries(respostas).forEach(([key, value]) => {
          if (value === 'nao' || value === 'risco' || value === false) {
            const parts = key.split('_');
            const title = parts.length > 1 ? parts.slice(1).join(' ') : key;
            const area = parts.length > 1 ? parts[0].toUpperCase() : '';
            message += `- ${area ? `[${area}] ` : ''}${title}\n`;
          }
        });
        message += `\n`;
      }

      message += `💡 *Recomendação Vigilaro:*\n`;
      message += `Este relatório serve para orientar melhorias. Consulte nossos guias educativos no app para saber como resolver cada ponto.\n\n`;
      message += `_Gerado via Vigilaro App - Segurança Familiar_`;

      await Share.share({
        message: message,
        title: 'Relatório Vigilaro'
      });

    } catch (error) {
      NeoAlert.alert(t('actionPlan.error'), t('checklistReport.shareError'));
    }
  };
  // ---------------------------

  return (
    <View style={s.container}>
      <View style={[s.header, { backgroundColor: getCorScore() }]}>
        <Text style={s.headerEmoji}>{mensagem.emoji}</Text>
        <Text style={s.headerTitle}>{mensagem.titulo}</Text>
        <Text style={s.headerSubtitle}>{ambiente || t('checklistReport.generalAssessment')}</Text>
      </View>

      <ScrollView style={s.content}>

        <View style={s.scoreCard}>
          <Text style={s.scoreLabel}>{t('checklistReport.safetyScore')}</Text>
          <View style={[s.scoreCircle, { borderColor: getCorScore() }]}>
            <Text style={[s.scoreValor, { color: getCorScore() }]}>{score}%</Text>
          </View>
          <Text style={s.scoreMensagem}>{mensagem.texto}</Text>
        </View>

        <View style={s.statsCard}>
          <View style={s.statRow}>
            <View style={s.statItem}>
              <View style={[s.statIcone, { backgroundColor: Neo.colors.feedback.success + '15' }]}>
                <Text style={s.statIconeTexto}>✅</Text>
              </View>
              <Text style={s.statValor}>{conformes}</Text>
              <Text style={s.statLabel}>{t('checklistReport.compliant')}</Text>
            </View>

            <View style={s.statItem}>
              <View style={[s.statIcone, { backgroundColor: Neo.colors.feedback.error + '15' }]}>
                <Text style={s.statIconeTexto}>⚠️</Text>
              </View>
              <Text style={s.statValor}>{naoConformes}</Text>
              <Text style={s.statLabel}>{t('checklistReport.nonCompliant')}</Text>
            </View>

            <View style={s.statItem}>
              <View style={[s.statIcone, { backgroundColor: 'transparent' }]}>
                <Text style={s.statIconeTexto}>➖</Text>
              </View>
              <Text style={s.statValor}>{naoAplicaveis}</Text>
              <Text style={s.statLabel}>{t('headersFirst.nA', 'N/A')}</Text>
            </View>
          </View>

          <View style={s.totalRow}>
            <Text style={s.totalLabel}>{t('checklistReport.totalItems')}</Text>
            <Text style={s.totalValor}>{total}</Text>
          </View>
        </View>

        {naoConformes > 0 && (
          <View style={s.alertCard}>
            <Text style={s.alertTitle}>⚠️ {t('checklistReport.improvementTitle')}</Text>
            <Text style={s.alertText}>
              {t('checklistReport.improvementFound', { count: naoConformes })}
            </Text>

            {/* NEW ADVISORY SECTION */}
            <View style={{ marginTop: 10, padding: 12, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 8 }}>
              <Text style={[s.alertItem, { fontStyle: 'italic', fontWeight: 'bold', color: Neo.colors.feedback.warning, marginBottom: 4 }]}>
                "{t('checklistReport.partnerQuote')}"
              </Text>
              <Text style={[s.alertItem, { lineHeight: 18 }]}>
                {t('checklistReport.partnerMsg')}
              </Text>
            </View>

            {/* LISTA DE PENDÊNCIAS */}
            <View style={{ marginTop: 16 }}>
              {Object.entries(respostas).map(([key, value], index) => {
                if (value === 'nao' || value === 'risco' || value === false) {
                  const parts = key.split('_');
                  // Formatação amigável da chave:
                  // Se for Q_1, fica apenas Q 1 ou busca o texto se disponível.
                  // Aqui usaremos a chave limpa já que não temos o texto completo da pergunta facilmente na rota.
                  const title = parts.length > 1 ? parts.slice(1).join(' ') : key;
                  const area = parts.length > 1 ? parts[0].toUpperCase() : '';
                  
                  return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', padding: 12, borderRadius: 8, marginBottom: 8 }}>
                      <Text style={{ fontSize: 18, marginRight: 10 }}>🔴</Text>
                      <View style={{ flex: 1 }}>
                        {area ? <Text style={{ fontSize: 11, fontWeight: 'bold', color: Neo.colors.feedback.warning, marginBottom: 2 }}>{area}</Text> : null}
                        <Text style={{ fontSize: 14, color: Neo.colors.neutral[800], fontWeight: '500' }}>{t('checklistReport.itemNeedsAttention', { title })}</Text>
                      </View>
                    </View>
                  );
                }
                return null;
              })}
            </View>

            <Text style={[s.alertItem, { marginTop: 12 }]}>• {t('checklistReport.consultEducation')}</Text>
          </View>
        )}

        <View style={s.historicoCard}>
          <Text style={s.historicoTitulo}>📊 {t('checklistReport.savedHistory')}</Text>
          <Text style={s.historicoTexto}>
            {t('checklistReport.savedHistoryMsg')}
          </Text>

          {/* SHARE BUTTON INSIDE HISTORIC CARD AREA (or separate) */}
          <TouchableOpacity
            style={[s.historicoBtn, { backgroundColor: Neo.colors.secondary[500], flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 10 }]}
            onPress={handleShare}
          >
            <Text style={{ fontSize: 18, color: Neo.colors.neutral.white }}>📤</Text>
            <Text style={s.historicoBtnText}>{t('checklistReport.shareReport')}</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', color: '#7E57C2', fontSize: 10, marginTop: 8, opacity: 0.8 }}>
            {t('checklistReport.sharePrivacy')}
          </Text>

        </View>

        <View style={s.metodologiaCard}>
          <Text style={s.metodologiaTitulo}>🎯 {t('checklistReport.methodology3D')}</Text>
          <View style={s.metodologiaItem}>
            <Text style={s.metodologiaIcone}>📅</Text>
            <Text style={s.metodologiaTexto}>
              <Text style={s.metodologiaBold}>{t('checklistReport.daily')}:</Text> {t('checklistReport.dailyDesc')}
            </Text>
          </View>
          <View style={s.metodologiaItem}>
            <Text style={s.metodologiaIcone}>🔄</Text>
            <Text style={s.metodologiaTexto}>
              <Text style={s.metodologiaBold}>{t('checklistReport.dynamic')}:</Text> {t('checklistReport.dynamicDesc')}
            </Text>
          </View>
          <View style={s.metodologiaItem}>
            <Text style={s.metodologiaIcone}>⏳</Text>
            <Text style={s.metodologiaTexto}>
              <Text style={s.metodologiaBold}>{t('checklistReport.durable')}:</Text> {t('checklistReport.durableDesc')}
            </Text>
          </View>
        </View>

      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity style={s.btnSecondary} onPress={() => navigation.navigate('Checklist')}>
          <Text style={s.btnSecondaryText}>📋 {t('checklistReport.newChecklist')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.btnPrimary} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={s.btnPrimaryText}>🏠 {t('checklistReport.home')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Neo.colors.neutral[100] },
  header: { paddingTop: 60, paddingBottom: 40, alignItems: 'center' },
  headerEmoji: { fontSize: 64, marginBottom: 15 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Neo.colors.neutral.white, marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: Neo.colors.neutral.white, opacity: 0.9 },
  content: { flex: 1, padding: 20 },
  scoreCard: { backgroundColor: Neo.colors.neutral.white, padding: 30, borderRadius: 12, marginBottom: 20, alignItems: 'center', ...Neo.shadows.sm },
  scoreLabel: { fontSize: 16, color: Neo.colors.neutral[500], marginBottom: 20 },
  scoreCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  scoreValor: { fontSize: 48, fontWeight: 'bold' },
  scoreMensagem: { fontSize: 14, color: Neo.colors.neutral[500], textAlign: 'center', lineHeight: 20 },
  statsCard: { backgroundColor: Neo.colors.neutral.white, padding: 20, borderRadius: 12, marginBottom: 20, ...Neo.shadows.sm },
  statRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statIcone: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statIconeTexto: { fontSize: 24 },
  statValor: { fontSize: 28, fontWeight: 'bold', color: Neo.colors.neutral[900], marginBottom: 5 },
  statLabel: { fontSize: 12, color: Neo.colors.neutral[400] },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTopWidth: 1, borderTopColor: Neo.colors.neutral[200] },
  totalLabel: { fontSize: 15, color: Neo.colors.neutral[500] },
  totalValor: { fontSize: 24, fontWeight: 'bold', color: Neo.colors.neutral[900] },
  alertCard: { backgroundColor: Neo.colors.feedback.warning + '15', padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: Neo.colors.feedback.warning },
  alertTitle: { fontSize: 18, fontWeight: 'bold', color: Neo.colors.feedback.warning, marginBottom: 12 },
  alertText: { fontSize: 14, color: Neo.colors.neutral[500], lineHeight: 22, marginBottom: 12 },
  alertBold: { fontWeight: 'bold', color: Neo.colors.feedback.warning },
  alertItem: { fontSize: 14, color: Neo.colors.neutral[500], marginBottom: 8, paddingLeft: 10 },
  historicoCard: { backgroundColor: Neo.colors.secondary[100], padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: Neo.colors.secondary[500] },
  historicoTitulo: { fontSize: 16, fontWeight: 'bold', color: Neo.colors.secondary[500], marginBottom: 10 },
  historicoTexto: { fontSize: 14, color: Neo.colors.neutral[500], lineHeight: 20, marginBottom: 15 },
  historicoBtn: { backgroundColor: Neo.colors.secondary[500], padding: 12, borderRadius: 8, alignItems: 'center' },
  historicoBtnText: { color: Neo.colors.neutral.white, fontSize: 14, fontWeight: 'bold' },
  metodologiaCard: { backgroundColor: Neo.colors.secondary[100], padding: 20, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: Neo.colors.secondary[500] },
  metodologiaTitulo: { fontSize: 16, fontWeight: 'bold', color: Neo.colors.secondary[500], marginBottom: 15, textAlign: 'center' },
  metodologiaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  metodologiaIcone: { fontSize: 24, marginRight: 12 },
  metodologiaTexto: { flex: 1, fontSize: 14, color: Neo.colors.neutral[500], lineHeight: 20 },
  metodologiaBold: { fontWeight: 'bold', color: Neo.colors.secondary[500] },
  footer: { flexDirection: 'row', padding: 20, paddingBottom: 40, backgroundColor: Neo.colors.neutral.white, borderTopWidth: 1, borderTopColor: Neo.colors.neutral[300], gap: 10 },
  btnPrimary: { flex: 1, backgroundColor: Neo.colors.feedback.success, padding: 18, borderRadius: 12, alignItems: 'center', ...Neo.shadows.sm },
  btnPrimaryText: { color: Neo.colors.neutral.white, fontSize: 16, fontWeight: 'bold' },
  btnSecondary: { flex: 1, backgroundColor: Neo.colors.neutral.white, padding: 18, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: Neo.colors.feedback.success },
  btnSecondaryText: { color: Neo.colors.feedback.success, fontSize: 16, fontWeight: 'bold' }
});
