/**
 * RadarVigilaroService.js
 * Serviço do Radar Vigilaro — feed inteligente de Casos Reais
 * Substitui AconteceuFeedService.js
 *
 * Lógica de rotação:
 *   1. Score do perfil familiar → determina proporção de formatos
 *   2. Mês atual → injeta alerta sazonal relevante
 *   3. Perfis da família → prioriza categorias relevantes (bebe, idoso, pet)
 *   4. Cache de 4 horas para o card de destaque da Home
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CASOS_REAIS } from '../data/casosReais';
import { FATOS_IMPACTO, PROTOCOLOS_DESTAQUE, ALERTAS_SAZONAIS } from '../data/radarConteudoDB';

const CACHE_KEY = '@vigilaro_radar_highlight';
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 horas

class RadarVigilaroService {

  // ─── FEED PRINCIPAL ────────────────────────────────────────────────────────

  /**
   * Retorna o feed principal do Radar com mistura inteligente de formatos.
   * @param {Array}  allProfiles  Todos os perfis da família
   * @param {number} limit        Número máximo de itens
   */
  getFeed(allProfiles = [], limit = 20) {
    const familyCategories = this._getFamilyCategories(allProfiles);
    const mesAtual = new Date().getMonth() + 1;

    // 1. Alerta sazonal do mês (sempre no topo se existir)
    const sazonalDoMes = ALERTAS_SAZONAIS.find(a => a.mes === mesAtual);

    // 2. Casos relevantes para o perfil familiar (70% do feed)
    const casosRelevantes = this._sortearCasos(familyCategories, Math.ceil(limit * 0.70));

    // 3. Fatos de impacto (20% do feed)
    const fatosAleatorios = this._shuffle([...FATOS_IMPACTO]).slice(0, Math.floor(limit * 0.20));

    // 4. Protocolos (10% do feed)
    const protocolosAleatorios = this._shuffle([...PROTOCOLOS_DESTAQUE]).slice(0, Math.floor(limit * 0.10));

    // Montagem do feed
    const feedBase = [
      ...casosRelevantes,
      ...fatosAleatorios,
      ...protocolosAleatorios,
    ];
    const feedEmbaralhado = this._shuffle(feedBase).slice(0, limit - (sazonalDoMes ? 1 : 0));

    return sazonalDoMes
      ? [sazonalDoMes, ...feedEmbaralhado]
      : feedEmbaralhado;
  }

  // ─── DESTAQUE DA HOME ──────────────────────────────────────────────────────

  /**
   * Retorna o card de destaque para a Home.
   * Cache de 4 horas para não repetir excessivamente.
   * @param {Array}  allProfiles
   * @param {string} forceExcludeId  ID a excluir (para "ver próximo")
   */
  async getHighlight(allProfiles = [], forceExcludeId = null) {
    try {
      if (!forceExcludeId) {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            return data;
          }
        }
      }

      const familyCategories = this._getFamilyCategories(allProfiles);
      const candidatos = this._sortearCasos(familyCategories, 20);
      const filtrado = candidatos.filter(c => c.id !== forceExcludeId);
      const escolhido = filtrado[0] || CASOS_REAIS[0];

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
        data: escolhido,
        timestamp: Date.now(),
      }));

      return escolhido;
    } catch {
      return CASOS_REAIS[0];
    }
  }

  // ─── HELPERS INTERNOS ──────────────────────────────────────────────────────

  /**
   * Determina quais categorias de caso priorizar com base nos perfis da família.
   */
  _getFamilyCategories(allProfiles = []) {
    const categorias = new Set(['queda', 'intoxicacao', 'queimadura']); // sempre presentes

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
        categorias.add('queda'); // reforça queda para idosos
        categorias.add('choque');
        categorias.add('intoxicacao');
      }
    });

    return [...categorias];
  }

  /**
   * Sorteia casos priorizando as categorias relevantes para a família.
   */
  _sortearCasos(familyCategories, limit) {
    const prioritarios = CASOS_REAIS.filter(c => familyCategories.includes(c.categoria));
    const demais = CASOS_REAIS.filter(c => !familyCategories.includes(c.categoria));

    const pool = [
      ...this._shuffle(prioritarios),
      ...this._shuffle(demais),
    ];

    return pool.slice(0, limit);
  }

  /**
   * Embaralha um array de forma determinística por dia do ano.
   * Garante que o mesmo usuário veja uma sequência diferente a cada dia,
   * mas consistente durante o mesmo dia.
   */
  _shuffle(array) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const seed = dayOfYear + array.length;
    return [...array].sort((a, b) => {
      const hashA = (a.id?.charCodeAt(0) || 0) + seed;
      const hashB = (b.id?.charCodeAt(0) || 0) + seed;
      return (hashA % 7) - (hashB % 7);
    });
  }

  /**
   * Retorna uma string de última atualização para exibição na UI.
   */
  getLastUpdateTime() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    return `Atualizado hoje às ${h}:${m}`;
  }
}

export default new RadarVigilaroService();
