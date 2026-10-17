/**
 * RadarVigilaroService.js
 * Serviço do Radar Vigilaro.
 *
 * Duas partes:
 *   1. RADAR SAZONAL (D17, 17/10/2026) — riscos ativos e chegando para o PAÍS,
 *      a REGIÃO e a CASA do usuário, calculados por services/RadarSazonalEngine
 *      sobre data/radarSazonal. Substitui o antigo "alerta do mês", que
 *      escolhia por getMonth() num calendário brasileiro para todo o mundo.
 *   2. ACERVO — fatos de impacto (estatística brasileira: só no Brasil) e
 *      protocolos, priorizados pelos perfis da família.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FATOS_IMPACTO, PROTOCOLOS_DESTAQUE } from '../data/radarConteudoDB';
import { ALERTAS_OFICIAIS, REGIOES } from '../data/radarSazonal';
import { calcularRadar } from './RadarSazonalEngine';
import { getEmergencyCountry, resolveEmergencyTokensDeep } from '../utils/emergencyTokens';
import { t_field, t_array } from '../utils/getLocalizedField';

// O feed saía 70% de `data/casosReais.js`, que era o despejo bruto de e-mails
// do Google Alerts: trechos literais de matérias de veículos identificados,
// nomes de pessoas reais e links de rastreio — conteúdo de terceiros que não
// temos licença para redistribuir, e dado pessoal alheio sem base legal.
// O Radar consome apenas conteúdo autoral.

const CHAVE_REGIAO = '@vigilaro_radar_regiao_';

class RadarVigilaroService {

  // ─── RADAR SAZONAL ─────────────────────────────────────────────────────────

  /** País detectado (ISO) — o mesmo usado pelos números de emergência. */
  getPais() {
    return getEmergencyCountry();
  }

  /** Região escolhida pelo usuário para o país (ou null). */
  async getRegiao(pais = this.getPais()) {
    if (!pais) return null;
    try { return (await AsyncStorage.getItem(CHAVE_REGIAO + pais)) || null; } catch { return null; }
  }

  async setRegiao(regiao, pais = this.getPais()) {
    if (!pais) return;
    try {
      if (regiao) await AsyncStorage.setItem(CHAVE_REGIAO + pais, regiao);
      else await AsyncStorage.removeItem(CHAVE_REGIAO + pais);
    } catch { /* preferência opcional */ }
  }

  /** Regiões selecionáveis do país, já com o nome no idioma do app. */
  getRegioes(pais = this.getPais()) {
    return (REGIOES[pais] || []).map((r) => ({ id: r.id, nome: t_field(r, 'nome') }));
  }

  /** Bloco "ative os alertas oficiais" do país, localizado. */
  getAlertasOficiais(pais = this.getPais()) {
    const a = ALERTAS_OFICIAIS[pais];
    if (!a) return null;
    return { titulo: t_field(a, 'titulo'), itens: t_array(a, 'itens'), fonte: a.fonte };
  }

  /**
   * Radar completo para a tela. Perfis, moradia e mapeamento vêm do chamador
   * (a tela já os carrega do ProfileService).
   */
  async getRadarSazonal({ perfis = [], moradia = null, mapping = [], hoje = new Date() } = {}) {
    const pais = this.getPais();
    const regiao = await this.getRegiao(pais);
    const r = calcularRadar({ hoje, pais, regiao, perfis, moradia, mapping });
    return { ...r, pais, regiao, temRegioes: (REGIOES[pais] || []).length > 0 };
  }

  /**
   * Converte uma janela do motor num artigo pronto para exibir: no idioma do
   * app e com os tokens resolvidos pelo país (t_field/t_array já resolvem).
   */
  localizarJanela(item) {
    const j = item.janela || item;
    return {
      id: j.id,
      formato: 'sazonal',
      categoria: j.categoria,
      icone: j.icone,
      titulo: t_field(j, 'titulo'),
      resumo: t_field(j, 'resumo'),
      orientacoes: t_array(j, 'orientacoes'),
      fonte: j.fonte,
    };
  }

  /** Nome do evento da janela ("São João", "Thanksgiving") no idioma do app. */
  nomeDoEvento(item) {
    return item && item.evento ? t_field(item.evento, 'nome') : null;
  }

  // ─── ACERVO ────────────────────────────────────────────────────────────────

  /** Acervo do país: fatos são estatística brasileira; protocolos valem para todos. */
  _acervo() {
    const fatos = this.getPais() === 'BR' ? FATOS_IMPACTO : [];
    return [...fatos, ...PROTOCOLOS_DESTAQUE];
  }

  /**
   * Acervo priorizado para esta família. Os tokens ({{POISON_CONTROL}} etc.)
   * saem resolvidos pelo país — antes apareciam crus no artigo.
   */
  getFeed(allProfiles = [], limit = 20) {
    const familyCategories = this._getFamilyCategories(allProfiles);
    // No idioma do app (t_field/t_array caem no pt-BR se faltar tradução).
    return resolveEmergencyTokensDeep(this._sortearConteudo(familyCategories, limit).map((item) => ({
      ...item,
      titulo: t_field(item, 'titulo'),
      resumo: t_field(item, 'resumo'),
      destaque: item.destaque ? t_field(item, 'destaque') : item.destaque,
      orientacoes: t_array(item, 'orientacoes'),
    })));
  }

  // ─── HELPERS INTERNOS ──────────────────────────────────────────────────────

  _getFamilyCategories(allProfiles = []) {
    const categorias = new Set(['queda', 'intoxicacao', 'queimadura']);
    (allProfiles || []).forEach(profile => {
      if (profile.tipo === 'pet') {
        categorias.add('pet');
        return;
      }
      const ano = profile.dataNascimento
        ? new Date(profile.dataNascimento).getFullYear()
        : new Date().getFullYear() - 30;
      const idade = new Date().getFullYear() - ano;
      if (idade <= 2) {
        categorias.add('afogamento');
        categorias.add('engasgo');
        categorias.add('corpo_estranho');
        categorias.add('esmagamento');
      } else if (idade <= 12) {
        categorias.add('engasgo');
        categorias.add('corpo_estranho');
        categorias.add('playground');
        categorias.add('choque');
      } else if (idade >= 60) {
        categorias.add('queda');
        categorias.add('choque');
        categorias.add('intoxicacao');
      }
    });
    return [...categorias];
  }

  _sortearConteudo(familyCategories, limit) {
    const acervo = this._acervo();
    const prioritarios = acervo.filter(c => familyCategories.includes(c.categoria));
    const demais = acervo.filter(c => !familyCategories.includes(c.categoria));
    return [...this._shuffle(prioritarios), ...this._shuffle(demais)].slice(0, limit);
  }

  /** Embaralha de forma determinística por dia do ano. */
  _shuffle(array) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const seed = dayOfYear + array.length;
    return [...array].sort((a, b) => {
      const hashA = (a.id?.charCodeAt(0) || 0) + seed;
      const hashB = (b.id?.charCodeAt(0) || 0) + seed;
      return (hashA % 7) - (hashB % 7);
    });
  }
}

export default new RadarVigilaroService();
