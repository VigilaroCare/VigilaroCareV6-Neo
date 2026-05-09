/**
 * telefones_ciatox.js
 * Telefones dos Centros de Informação e Assistência Toxicológica
 * Por estado brasileiro
 */

export const TELEFONES_CIATOX = {
  nacional: '0800-722-6001', // Disque Intoxicação Nacional
  
  // Por estado (em ordem alfabética)
  AC: { nome: 'Acre', telefone: null, capital: 'Rio Branco' },
  AL: { nome: 'Alagoas', telefone: '0800-282-4469', capital: 'Maceió' },
  AM: { nome: 'Amazonas', telefone: '0800-092-6001', capital: 'Manaus' },
  AP: { nome: 'Amapá', telefone: null, capital: 'Macapá' },
  BA: { nome: 'Bahia', telefone: '0800-284-4343', capital: 'Salvador' },
  CE: { nome: 'Ceará', telefone: '0800-275-5000', capital: 'Fortaleza' },
  DF: { nome: 'Distrito Federal', telefone: '0800-644-9494', capital: 'Brasília' },
  ES: { nome: 'Espírito Santo', telefone: '0800-283-9904', capital: 'Vitória' },
  GO: { nome: 'Goiás', telefone: '0800-646-3661', capital: 'Goiânia' },
  MA: { nome: 'Maranhão', telefone: '0800-280-4080', capital: 'São Luís' },
  MG: { nome: 'Minas Gerais', telefone: '0800-283-1255', capital: 'Belo Horizonte' },
  MS: { nome: 'Mato Grosso do Sul', telefone: '0800-647-3748', capital: 'Campo Grande' },
  MT: { nome: 'Mato Grosso', telefone: '0800-647-3746', capital: 'Cuiabá' },
  PA: { nome: 'Pará', telefone: '0800-722-6001', capital: 'Belém' },
  PB: { nome: 'Paraíba', telefone: '0800-281-3535', capital: 'João Pessoa' },
  PE: { nome: 'Pernambuco', telefone: '0800-281-6141', capital: 'Recife' },
  PI: { nome: 'Piauí', telefone: '0800-280-8080', capital: 'Teresina' },
  PR: { nome: 'Paraná', telefone: '0800-410-148', capital: 'Curitiba' },
  RJ: { nome: 'Rio de Janeiro', telefone: '0800-722-6001', capital: 'Rio de Janeiro' },
  RN: { nome: 'Rio Grande do Norte', telefone: '0800-281-4524', capital: 'Natal' },
  RO: { nome: 'Rondônia', telefone: null, capital: 'Porto Velho' },
  RR: { nome: 'Roraima', telefone: null, capital: 'Boa Vista' },
  RS: { nome: 'Rio Grande do Sul', telefone: '0800-780-0200', capital: 'Porto Alegre' },
  SC: { nome: 'Santa Catarina', telefone: '0800-643-5252', capital: 'Florianópolis' },
  SE: { nome: 'Sergipe', telefone: '0800-284-9911', capital: 'Aracaju' },
  SP: { nome: 'São Paulo', telefone: '0800-771-3733', capital: 'São Paulo' },
  TO: { nome: 'Tocantins', telefone: null, capital: 'Palmas' },
};

/**
 * Retorna o telefone do CIATOX baseado no estado
 * @param {string} uf - Sigla do estado (ex: 'PR', 'SP')
 * @returns {string} - Telefone formatado ou nacional
 */
export const getTelefoneCiatox = (uf) => {
  const estado = TELEFONES_CIATOX[uf?.toUpperCase()];
  return estado?.telefone || TELEFONES_CIATOX.nacional;
};

/**
 * Retorna informações completas do CIATOX do estado
 * @param {string} uf - Sigla do estado
 * @returns {object} - { nome, telefone, capital }
 */
export const getInfoCiatox = (uf) => {
  const estado = TELEFONES_CIATOX[uf?.toUpperCase()];
  return {
    nome: estado?.nome || 'Nacional',
    telefone: estado?.telefone || TELEFONES_CIATOX.nacional,
    capital: estado?.capital || 'Brasil',
  };
};

/**
 * Lista todos os estados com CIATOX disponível
 * @returns {array} - Array de objetos com uf, nome, telefone
 */
export const listarCiatoxDisponiveis = () => {
  return Object.keys(TELEFONES_CIATOX)
    .filter(key => key !== 'nacional' && TELEFONES_CIATOX[key].telefone)
    .map(uf => ({
      uf,
      nome: TELEFONES_CIATOX[uf].nome,
      telefone: TELEFONES_CIATOX[uf].telefone,
      capital: TELEFONES_CIATOX[uf].capital,
    }));
};

export default TELEFONES_CIATOX;
