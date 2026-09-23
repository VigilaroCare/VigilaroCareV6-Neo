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

// Semântica dos níveis de proteção (só strings — seguro no escopo do módulo;
// cores concretas ficam nas superfícies, mapeando por `tone`).
const NIVEIS_PROTECAO = {
  inicio:    { key: 'inicio',    tone: 'muted',   icon: 'InfoCircle', labelKey: 'protection.inicio',    label: 'Proteção em início' },
  protegido: { key: 'protegido', tone: 'success', icon: 'ShieldTick', labelKey: 'protection.protegido', label: 'Protegido' },
  controle:  { key: 'controle',  tone: 'success', icon: 'TickCircle', labelKey: 'protection.controle',  label: 'Sob controle' },
  atencao:   { key: 'atencao',   tone: 'warning', icon: 'Warning2',   labelKey: 'protection.atencao',   label: 'Atenção necessária' },
  // WarningOctagon (não 'Danger'): 'Danger' e 'Warning2' resolvem para o
  // MESMO glifo Phosphor — atenção e crítico ficariam indistinguíveis
  // sem cor. O octógono é a forma universal de "pare/perigo".
  critico:   { key: 'critico',   tone: 'error',   icon: 'WarningOctagon', labelKey: 'protection.critico', label: 'Risco crítico' },
};

class ScoreService {
  /**
   * Calcula o Score Geral e os Scores por Ambiente com base nos dados reais salvos
   * Retorna { geral: number, ambientes: { [id_ambiente]: number }, pendencias: number }
   */
  async getScoreCompleto() {
    // BUG FIX #1 & #2: Usar getActiveResidence() em vez de getActiveResidenceId() + getMapping()
    const activeResidence = await ProfileService.getActiveResidence();
    return this._computeScore(activeResidence, () => ProfileService.getPerfis());
  }

  /**
   * Score de uma residência QUALQUER (não só a ativa) — usado pelo seletor
   * de residências para mostrar o estado de cada casa. Mesmo pipeline do
   * getScoreCompleto; muda só a origem dos perfis (os daquela residência).
   */
  async getScoreResidencia(residence) {
    return this._computeScore(residence, async () => {
      const { fixos, eventuais } = await ProfileService.getPerfisDaResidencia(residence.id);
      return [...(fixos || []), ...(eventuais || [])];
    });
  }

  /** Nível de proteção de uma residência qualquer (atalho do seletor). */
  async getNivelResidencia(residence) {
    const { fixos, eventuais } = await ProfileService.getPerfisDaResidencia(residence.id);
    const perfis = [...(fixos || []), ...(eventuais || [])];
    const scoreData = await this._computeScore(residence, () => perfis);
    return this.getNivelProtecao(scoreData, perfis);
  }

  async _computeScore(activeResidence, getProfiles) {
    try {
      if (!activeResidence) {
        if (__DEV__) {
          console.log('[ScoreService] Nenhuma residência ativa');
        }
        return { geral: 0, ambientes: {}, pendencias: 0, statsGeral: { total: 0, checked: 0, critical: 0, warning: 0 }, statsAmbientes: {} };
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

      const profiles = await getProfiles();
      // BUG FIX #3: getMoradia() não existe, usar activeResidence diretamente
      const moradia = activeResidence;

      let totalItems = 0;
      let totalChecked = 0;
      let totalRespondidos = 0;
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
          totalRespondidos += stats.respondidos || 0;
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
        statsGeral: { total: totalItems, checked: totalChecked, respondidos: totalRespondidos, critical: totalCritical, warning: totalWarning },
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
  // `pendencias` manda na mensagem de topo: a faixa é percentual, e um único
  // `perigo` aberto convive com 95%. Dizer "blindada" com risco crítico em
  // aberto contradiz o próprio nível de proteção, que rebaixa nesse caso.
  getMensagemImpacto(score, pendencias) {
    const b = this.getBanda(score);
    const alertas = {
      inicio:   'Inicie o mapeamento para proteger sua família.',
      maxima:   pendencias > 0
        ? `Quase lá: ainda há ${pendencias} ponto(s) a resolver.`
        : 'Sua casa está blindada contra acidentes.',
      controle: pendencias > 0 ? `Existem ${pendencias} pontos de melhoria.` : 'Proteção em dia.',
      atencao:  `Sua casa tem ${pendencias} riscos ativos.`,
      critico:  `Muitos riscos pendentes (${pendencias}). Priorize a correção.`,
    };
    return { titulo: b.titulo, alerta: alertas[b.key] };
  }

  /**
   * ── NÍVEL DE PROTEÇÃO — fonte única do sinal de avatar/moradia ──────────
   * Bidimensional: a banda de cobertura (getBanda, cortes canônicos 90/70/40)
   * modulada pela severidade do que ficou aberto. A severidade domina:
   *  - qualquer item 'perigo' aberto rebaixa para no mínimo 'atencao'
   *    (92% com um perigo aberto NÃO é "tudo ok");
   *  - 'perigo' aberto em cômodo usado por perfil vulnerável (bebê/criança/
   *    idoso, via comodosUsados) rebaixa para 'critico' — a consequência
   *    escala com a vulnerabilidade de quem ocupa o ambiente.
   * 'inicio' não é risco: é ausência de vistoria (total === 0). Sem ele,
   * casa recém-cadastrada apareceria "vermelha" no primeiro dia.
   *
   * O tom/ícone acompanham o nível para o sinal nunca ser só cor (WCAG 1.4.1).
   *
   * @param {object} scoreData  retorno de getScoreCompleto()
   * @param {Array}  [perfis]   perfis da residência ativa; buscados se omitido
   * @returns {Promise<{key:string, tone:string, icon:string, labelKey:string, label:string}>}
   */
  async getNivelProtecao(scoreData, perfis = null) {
    const stats = scoreData?.statsGeral || { total: 0, critical: 0 };
    if (!stats.total) return NIVEIS_PROTECAO.inicio;

    const criticos = stats.critical || 0;

    // Consequência: perigo aberto em cômodo que um vulnerável USA.
    let criticoVulneravel = false;
    if (criticos > 0) {
      try {
        const lista = perfis || await ProfileService.getPerfis();
        const vulneraveis = (lista || []).filter(p => this._ehVulneravel(p));
        const comodosCriticos = Object.entries(scoreData?.statsAmbientes || {})
          .filter(([, s]) => (s.critical || 0) > 0)
          .map(([id]) => id);
        criticoVulneravel = vulneraveis.some(p =>
          Array.isArray(p.comodosUsados) && p.comodosUsados.some(c => comodosCriticos.includes(c)));
      } catch (_) {
        criticoVulneravel = false; // sem dados de perfil, não escala — degrada para a regra de score
      }
    }

    // `respondidos`, nao `checked`: o que distingue "vistoria nao iniciada"
    // de "vistoria feita e toda reprovada" e haver RESPOSTA, nao haver acerto.
    return this._decidirNivel(scoreData?.geral || 0, criticos, criticoVulneravel, stats.respondidos ?? stats.checked ?? 0);
  }

  /**
   * Nível de proteção de UM perfil: recorta o score da residência aos cômodos
   * que a pessoa declara usar (comodosUsados, schema v2). É a mesma tabela de
   * decisão, com a vulnerabilidade DA PRÓPRIA pessoa escalando os críticos.
   * Retorna null quando não há recorte possível (sem cômodos declarados ou
   * sem interseção com ambientes avaliados) — o caller decide o fallback.
   */
  getNivelProtecaoPerfil(scoreData, perfil) {
    const comodos = Array.isArray(perfil?.comodosUsados) ? perfil.comodosUsados : [];
    if (comodos.length === 0) return null;

    const recorte = Object.entries(scoreData?.statsAmbientes || {})
      .filter(([id]) => comodos.includes(id));
    if (recorte.length === 0) return null;

    const agg = recorte.reduce((a, [, s]) => ({
      total: a.total + (s.total || 0),
      checked: a.checked + (s.checked || 0),
      respondidos: a.respondidos + (s.respondidos || 0),
      critical: a.critical + (s.critical || 0),
    }), { total: 0, checked: 0, respondidos: 0, critical: 0 });
    if (!agg.total) return NIVEIS_PROTECAO.inicio;

    const score = Math.round((agg.checked / agg.total) * 100);
    const criticoVulneravel = agg.critical > 0 && this._ehVulneravel(perfil);
    return this._decidirNivel(score, agg.critical, criticoVulneravel, agg.respondidos);
  }

  _ehVulneravel(perfil) {
    return ['bebe', 'crianca', 'idoso'].includes(perfil?.tipo)
      || ['baby', 'child', 'elderly'].includes(ProfileService.getFaixaEtaria(perfil?.dataNascimento));
  }

  // Tabela de decisão única (chamada com total > 0 já garantido).
  // `totalRespondidos` distingue dois cenários que resultam em score=0:
  //   • respondidos=0 → nenhuma resposta ainda → 'inicio' (ausência de vistoria)
  //   • respondidos>0 → respostas registradas mas score baixo → 'critico'
  // Sem essa distinção, casa com mapping mas zero respostas aparecia vermelha.
  //
  // O parâmetro já recebeu `stats.checked`, que só conta item CONFORME. Uma
  // vistoria inteiramente respondida e inteiramente reprovada dava checked=0 e
  // caía em 'inicio': a casa de maior risco exibia o sinal mais brando.
  _decidirNivel(score, criticos, criticoVulneravel, totalRespondidos = 1) {
    const banda = this.getBanda(score).key;
    // score 0 sem nenhuma resposta = vistoria não iniciada, não o pior caso
    if (banda === 'inicio' && totalRespondidos === 0) return NIVEIS_PROTECAO.inicio;
    // banda 'inicio' aqui significa score 0 COM respostas (tudo reprovado) — pior caso.
    if (criticoVulneravel || banda === 'critico' || banda === 'inicio') return NIVEIS_PROTECAO.critico;
    if (criticos > 0 || banda === 'atencao') return NIVEIS_PROTECAO.atencao;
    if (banda === 'controle') return NIVEIS_PROTECAO.controle;
    return NIVEIS_PROTECAO.protegido;
  }
}

export default new ScoreService();
