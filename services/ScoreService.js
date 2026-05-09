/**
 * ScoreService.js (Vigilaro Care V6 Neo)
 * Responsável por calcular a pontuação de segurança real baseada no
 * preenchimento e resolução de Checklists de Inspeção.
 *
 * Unificado com ChecklistService para evitar redundância e erros de importação.
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
   * Retorna a saudação/mensagem de segurança baseada no Score
   */
  getMensagemImpacto(score, pendencias) {
    if (score === 0) {
      return {
        titulo: 'Monitor Ativo',
        alerta: 'Inicie o mapeamento para proteger sua família.',
      };
    }
    if (score >= 90) {
      return {
        titulo: 'Segurança Máxima',
        alerta: 'Sua casa está blindada contra acidentes.',
      };
    }
    if (score >= 70) {
      return {
        titulo: 'Ambiente Seguro',
        alerta:
          pendencias > 0
            ? `Existem ${pendencias} pontos de melhoria.`
            : 'Proteção em dia.',
      };
    }
    if (score >= 40) {
      return {
        titulo: 'Atenção Necessária',
        alerta: `Sua casa tem ${pendencias} riscos ativos.`,
      };
    }
    return {
      titulo: 'Alerta de Risco',
      alerta: `Muitos riscos pendentes (${pendencias}). Priorize a correção.`,
    };
  }
}

export default new ScoreService();