/**
 * getLocalizedField.js
 * 
 * Utilitário para extrair campos traduzidos de objetos de dados.
 * Usado pelos arquivos em /data/ que possuem traduções inline
 * com sufixo de idioma (ex: nomePopular_en, descricao_es).
 * 
 * Convenção:
 *   campo base (PT-BR): obj.nomePopular
 *   tradução EN:         obj.nomePopular_en
 *   tradução ES:         obj.nomePopular_es
 *   tradução PT-PT:      obj.nomePopular_ptpt (ou cai para PT-BR)
 *
 * TOKENS DE EMERGÊNCIA (2026-07-31): toda saída passa por
 * resolveEmergencyTokensDeep, que troca {{EMERGENCY_MEDICAL}},
 * {{EMERGENCY_NUMBER}} e {{POISON_CONTROL}} pelo número do país onde o
 * usuário está. Isto fica aqui, e não em cada tela, porque esta é a camada
 * pela qual todo conteúdo das bases de /data já passa — qualquer base nova
 * ganha o comportamento sem alteração. Ver utils/emergencyTokens.js.
 */
import i18n from '../i18n';
import { resolveEmergencyTokensDeep } from './emergencyTokens';

/**
 * Retorna o valor localizado de um campo em um objeto de dados.
 */
export const t_field = (obj, field) => {
  if (!obj || !field) return '';
  const lang = i18n.language || 'pt';
  const langLower = lang.toLowerCase();

  if (langLower.startsWith('pt-pt')) {
    const ptptValue = obj[`${field}_ptpt`] || obj[`${field}_pt-PT`] || obj[`${field}_pt_pt`];
    if (ptptValue) return resolveEmergencyTokensDeep(ptptValue);
  }

  if (langLower.startsWith('pt')) return resolveEmergencyTokensDeep(obj[field] ?? '');
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return resolveEmergencyTokensDeep(localizedValue ?? obj[field] ?? '');
};

/**
 * Retorna um array de strings traduzidas.
 */
export const t_array = (obj, field) => {
  if (!obj || !field) return [];
  const lang = i18n.language || 'pt';
  const langLower = lang.toLowerCase();

  if (langLower.startsWith('pt-pt')) {
    const ptptValue = obj[`${field}_ptpt`] || obj[`${field}_pt-PT`] || obj[`${field}_pt_pt`];
    if (ptptValue) return resolveEmergencyTokensDeep(ptptValue);
  }

  if (langLower.startsWith('pt')) return resolveEmergencyTokensDeep(obj[field] ?? []);
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return resolveEmergencyTokensDeep(localizedValue ?? obj[field] ?? []);
};

/**
 * Retorna um objeto aninhado localizado.
 * Útil para campos como sintomas: { imediatos, tardios, graves }
 * e primeiros Socorros: { fazer, naoFazer }.
 * 
 * @param {Object} obj - O objeto de dados
 * @param {string} field - O nome do campo base do objeto aninhado
 * @returns {Object} O objeto traduzido ou o fallback em PT-BR
 * 
 * @example
 * // Com i18n.language = 'en'
 * t_object(animal, 'sintomas')
 * // → animal.sintomas_en || animal.sintomas
 */
export const t_object = (obj, field) => {
  if (!obj || !field) return {};
  const lang = i18n.language || 'pt';
  const langLower = lang.toLowerCase();

  if (langLower.startsWith('pt-pt')) {
    const ptptValue = obj[`${field}_ptpt`] || obj[`${field}_pt-PT`] || obj[`${field}_pt_pt`];
    if (ptptValue) return resolveEmergencyTokensDeep(ptptValue);
  }

  if (langLower.startsWith('pt')) return resolveEmergencyTokensDeep(obj[field] ?? {});
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return resolveEmergencyTokensDeep(localizedValue ?? obj[field] ?? {});
};

/**
 * Cópia do objeto (ou lista) com TODOS os campos já no idioma atual: cada
 * campo de texto ou lista de textos passa por t_field/t_array, objetos e
 * listas de objetos são percorridos, e as chaves com sufixo somem. Serve às
 * telas que recebem o item inteiro e leem obj.campo direto (ex.: reviews de
 * segurança, onde a lista passa o item para a tela de detalhe).
 */
const SUFIXO_IDIOMA = /_(en|es|ptpt|pt-PT|pt_pt)$/;
export const t_deep = (obj) => {
  if (Array.isArray(obj)) return obj.map(t_deep);
  if (!obj || typeof obj !== 'object') return resolveEmergencyTokensDeep(obj);
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (SUFIXO_IDIOMA.test(k)) continue;
    if (typeof v === 'string') out[k] = t_field(obj, k);
    else if (Array.isArray(v) && v.every((x) => typeof x === 'string')) out[k] = t_array(obj, k);
    else out[k] = t_deep(v);
  }
  return out;
};

export default t_field;
