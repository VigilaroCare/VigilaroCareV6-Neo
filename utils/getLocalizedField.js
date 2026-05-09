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
 */
import i18n from '../i18n';

/**
 * Retorna o valor localizado de um campo em um objeto de dados.
 */
export const t_field = (obj, field) => {
  if (!obj || !field) return '';
  const lang = i18n.language;
  if (!lang || lang.startsWith('pt')) return obj[field] ?? '';
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return localizedValue ?? obj[field] ?? '';
};

/**
 * Retorna um array de strings traduzidas.
 */
export const t_array = (obj, field) => {
  if (!obj || !field) return [];
  const lang = i18n.language;
  if (!lang || lang.startsWith('pt')) return obj[field] ?? [];
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return localizedValue ?? obj[field] ?? [];
};

/**
 * Retorna um objeto aninhado localizado.
 * Útil para campos como sintomas: { imediatos, tardios, graves }
 * e primeirosSocorros: { fazer, naoFazer }.
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
  const lang = i18n.language;
  if (!lang || lang.startsWith('pt')) return obj[field] ?? {};
  const langKey = lang.split('-')[0];
  const localizedValue = obj[`${field}_${langKey}`];
  return localizedValue ?? obj[field] ?? {};
};

export default t_field;
