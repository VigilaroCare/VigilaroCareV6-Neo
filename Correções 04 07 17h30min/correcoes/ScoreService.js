/**
 * ScoreService.js (Vigilaro Care V6 Neo)
 * Responsável por calcular a pontuação de segurança real baseada no
 * preenchimento e resolução de Checklists de Inspeção.
 *
 * Unificado com ChecklistService para evitar redundância e erros de importação.
 *
 * ── FONTE ÚNICA DE FAIXAS DE SCORE (getBanda) ──────────────────────────────
 * Antes deste ajuste, três lugares decidiam o significado do mesmo número com
 * limiares diferentes: HeroScoreCard (cor/label em 80/50), HomeScreenNeo
 * (heroHeadline em 80/50) e getMensagemImpacto (texto em 90/70/40). Um score 75
 * saía âmbar + "Ambiente Seguro" ao mesmo tempo. Agora todos consomem getBanda.
 */

import { AMBIENTES, CHECKLISTS } from '../data/mapeamento_dados';
import ChecklistService from './ChecklistService';
import ProfileService from './ProfileService';

class ScoreService {
  /**
   * Calcula o Score Geral e os Scores por Ambiente com base nos dados reais salvos
   * Retorna { geral: number, ambientes: { [id_ambiente]: number }, pendencias: number }
   */
  async getScoreCompleto() {
    try {
      // BUG FIX #1 & #2: Usar getActiveResidence() em vez de getActiveResidenceId() + getMapping()
      const activeResidence = await ProfileService.getActiveResidence();

      if (!activeResidence) {
        if (__DEV__) {
          console.log('[ScoreService] Nenhuma residência ativa');
        }
        return { geral: 0, ambientes: {}, pendencias: 0 };
      }

      const resId = activeResidence.id;
      // BUG FIX #2: Extrair mapping do objeto activeResidence
      const mapping = activeResidence.mapping || [];
      const mappedRoomIds = Array.isArray(mapping) ? mapping : Object.keys(mapping);

      const allState = await ChecklistService.getAllState(resId);
      const hasAnyAnswer = Object.keys(allState).length > 0;

      // FIX #5: Se o usuário resetou o app (mapping vazio e sem respostas), 
      // não avaliar áreas básicas injetadas para evitar exibir "dados residuais" na UI.
      if (mappedRoomIds.length === 0 && !hasAnyAnswer) {
          return {
              geral: 0,
              ambientes: {},
              statsGeral: { total: 0, checked: 0, critical: 0, warning: 0 },
              statsAmbientes: {},
              pendencias: 0,
          };
      }

      const profiles = await ProfileService.getPerfis();
      // BUG FIX #3: getMoradia() não existe, usar activeResidence diretamente
      const moradia = activeResidence;

      let totalItems = 0;
      let totalChecked = 0;
      let totalCritical = 0;
      let totalWarning = 0;
      let scoresPorAmbiente = {};
      let statsPorAmbiente = {};

      const { isAreaRelevant } = require('../utils/ProfileFilterEngine');

      // Processa cada ambiente da base que seja relevante para o perfil
      AMBIENTES.forEach(area => {
        if (!isAreaRelevant(area, moradia, profiles, mapping) || area.id.includes('kit')) return;
        
        const roomId = area.id;
        const structure = CHECKLISTS[roomId];
        if (!structure) {
          if (__DEV__) {
            console.log(`[ScoreService] Estrutura de checklist não encontrada para: ${roomId}`);
          }
          return;
        }

        const areaData = allState[roomId] || {};
        // BUG FIX #4: Usar o ChecklistService.getAreaStats que entende categorias e itens
        const stats = ChecklistService.getAreaStats(
          roomId,
          areaData,
          structure,
          profiles,
          moradia
        );

        if (stats.total > 0) {
          totalItems += stats.total;
          totalChecked += stats.checked;
          totalCritical += stats.critical;
          totalWarning += stats.warning;

          scoresPorAmbiente[roomId] = Math.round(
            (stats.checked / stats.total) * 100
          );
          
          statsPorAmbiente[roomId] = {
             total: stats.total,
             checked: stats.checked,
             critical: stats.critical,
             warning: stats.warning,
             failedItems: stats.failedItems || []
          };
        }
      });

      const scoreGeral =
        totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

      if (__DEV__) {
        console.log('[ScoreService] Score calculado:', {
          geral: scoreGeral,
          ambientes: scoresPorAmbiente,
          pendencias: totalCritical + totalWarning,
        });
      }

      return {
        geral: scoreGeral,
        ambientes: scoresPorAmbiente,
        statsGeral: { total: totalItems, checked: totalChecked, critical: totalCritical, warning: totalWarning },
        statsAmbientes: statsPorAmbiente,
        pendencias: totalCritical + totalWarning,
      };
    } catch (error) {
      if (__DEV__) {
        console.error('[ScoreService] Erro crítico ao calcular score:', error);
      }
      return { geral: 0, ambientes: {}, pendencias: 0, statsGeral: { total: 0, checked: 0, critical: 0, warning: 0 }, statsAmbientes: {} };
    }
  }

  /**
   * FONTE ÚNICA DE VERDADE das faixas de score.
   * Retorna a semântica da faixa (chave + textos). A COR fica a cargo de cada
   * superfície (o hero creme usa tints claros; o monitor usa tokens semânticos
   * fortes), mapeando por `key` — assim o limiar é único e a cor é contextual.
   *
   * Faixas (alinhadas ao histórico do getMensagemImpacto): 90 / 70 / 40.
   *   >=90  maxima    · >=70 controle · >=40 atencao · >0 critico · 0 inicio
   */
  getBanda(score) {
    const s = Number(score) || 0;
    if (s <= 0)  return { key: 'inicio',   headline: 'Comece sua proteção', titulo: 'Monitor Ativo' };
    if (s >= 90) return { key: 'maxima',   headline: 'Segurança máxima',    titulo: 'Segurança Máxima' };
    if (s >= 70) return { key: 'controle', headline: 'Casa sob controle',   titulo: 'Ambiente Seguro' };
    if (s >= 40) return { key: 'atencao',  headline: 'Atenção necessária',  titulo: 'Atenção Necessária' };
    return         { key: 'critico',  headline: 'Aja imediatamente',   titulo: 'Alerta de Risco' };
  }

  /**
   * Retorna a saudação/mensagem de segurança baseada no Score.
   * Agora delega o limiar ao getBanda — os textos de alerta seguem idênticos
   * aos anteriores, garantindo zero regressão de conteúdo.
   */
  getMensagemImpacto(score, pendencias) {
    const b = this.getBanda(score);
    const alertas = {
      inicio:   'Inicie o mapeamento para proteger sua família.',
      maxima:   'Sua casa está blindada contra acidentes.',
      controle: pendencias > 0 ? `Existem ${pendencias} pontos de melhoria.` : 'Proteção em dia.',
      atencao:  `Sua casa tem ${pendencias} riscos ativos.`,
      critico:  `Muitos riscos pendentes (${pendencias}). Priorize a correção.`,
    };
    return { titulo: b.titulo, alerta: alertas[b.key] };
  }
}

export default new ScoreService();
