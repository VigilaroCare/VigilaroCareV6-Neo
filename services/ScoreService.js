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
 * O getMensagemImpacto saiu em 27/10/2026: não tinha mais nenhum chamador, e o
 * campo `titulo` da faixa existia só para ele.
 */

import { AMBIENTES, CHECKLISTS } from '../data/mapeamento_dados';
import ChecklistService from './ChecklistService';
import ProfileService from './ProfileService';

// Semântica dos níveis de proteção (só strings — seguro no escopo do módulo;
// cores concretas ficam nas superfícies, mapeando por `tone`).
// Faixa de score → tom semântico. Fonte única do significado da cor.
const TOM_POR_BANDA = {
  maxima: 'success',
  controle: 'success',
  atencao: 'warning',
  critico: 'error',
  inicio: 'muted',
};

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

// Manchete de cada faixa. A TABELA é a fonte dos textos: `getBanda` escolhe a
// linha pelo número, `getManchete` pelo nível de proteção.
const FAIXAS = {
  inicio:   { key: 'inicio',   headlineKey: 'home.heroStart',     headline: 'Vistorias pendentes' },
  maxima:   { key: 'maxima',   headlineKey: 'home.heroMaxima',    headline: 'Segurança máxima' },
  controle: { key: 'controle', headlineKey: 'home.heroControl',   headline: 'Casa sob controle' },
  atencao:  { key: 'atencao',  headlineKey: 'home.heroAttention', headline: 'Atenção necessária' },
  critico:  { key: 'critico',  headlineKey: 'home.heroAct',       headline: 'Aja imediatamente' },
};

// Nível de proteção → faixa cuja manchete ele usa. Só o topo muda de nome: o
// nível diz 'protegido' onde a faixa diz 'maxima'.
const FAIXA_DO_NIVEL = {
  inicio: 'inicio',
  protegido: 'maxima',
  controle: 'controle',
  atencao: 'atencao',
  critico: 'critico',
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
   * Faixas: 90 / 70 / 40, os cortes que o antigo getMensagemImpacto já usava.
   *   >=90  maxima    · >=70 controle · >=40 atencao · >0 critico · 0 inicio
   *
   * A faixa mede COBERTURA. Para a frase e a cor que vão na tela, use
   * `getManchete`: ela segue o nível de proteção, que também pesa os perigos
   * em aberto.
   */
  getBanda(score) {
    const s = Number(score) || 0;
    if (s <= 0)  return { ...FAIXAS.inicio };
    if (s >= 90) return { ...FAIXAS.maxima };
    if (s >= 70) return { ...FAIXAS.controle };
    if (s >= 40) return { ...FAIXAS.atencao };
    return { ...FAIXAS.critico };
  }

  /**
   * Tom semântico da faixa — 'success' | 'warning' | 'error' | 'muted'.
   *
   * Existe para que nenhuma tela precise repetir o limiar só para escolher a
   * cor. Era por aí que a duplicação voltava: o docblock deste serviço conta
   * que o 80/50 foi eliminado em três lugares, mas ele sobreviveu em outros
   * quatro, e um score 75 saía verde no hero e âmbar no relatório.
   *
   * A cor CONCRETA continua com a superfície (o creme usa tints claros, o
   * relatório usa feedback forte) — aqui só mora o limiar.
   */
  getTom(score) {
    return TOM_POR_BANDA[this.getBanda(score).key] || 'muted';
  }

  /**
   * A MANCHETE DO ESTADO DA CASA — a frase e o tom que vão em cima do número.
   *
   * Segue o NÍVEL de proteção (getNivelProtecao, a mesma regra do selo do
   * avatar), não a faixa crua. A faixa mede COBERTURA: quanto da casa já foi
   * confirmado seguro. O nível julga o ESTADO: um item de perigo ainda não
   * confirmado rebaixa para atenção e, em cômodo de pessoa vulnerável, para
   * crítico.
   *
   * Até 27/10/2026 a frase vinha da faixa. Uma casa com 95% e um perigo em
   * aberto mostrava "Segurança máxima" no medidor, enquanto o avatar, na mesma
   * tela, dizia "Atenção necessária". E uma vistoria toda respondida e toda
   * reprovada (score 0) mostrava "Vistorias pendentes", a frase de quem nem
   * começou — o pior caso com o sinal mais brando.
   *
   * O NÚMERO continua sendo a cobertura; só a frase e o tom mudaram de fonte.
   * Sem nível (ainda carregando, ou se ele falhar), cai na faixa do score.
   *
   * @param {object|null} nivel  retorno de getNivelProtecao()
   * @param {number}      score  scoreData.geral
   * @returns {{key:string, headlineKey:string, headline:string, tom:string}}
   */
  getManchete(nivel, score) {
    const faixa = FAIXA_DO_NIVEL[nivel?.key];
    const m = faixa ? { ...FAIXAS[faixa] } : this.getBanda(score);
    return { ...m, tom: TOM_POR_BANDA[m.key] || 'muted' };
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
