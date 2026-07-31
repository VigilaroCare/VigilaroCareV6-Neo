/**
 * emergencyNumbersByCountry.js
 *
 * Numeros de emergencia GERAIS por pais (codigo ISO 3166-1 alpha-2).
 * Usado pelo botao principal do SOS pra discar o numero certo conforme a
 * localizacao real do usuario, nao o idioma escolhido no app (ver decisao
 * de produto 2026-07-30: idioma e localizacao sao variaveis diferentes —
 * um turista de fala espanhola no Brasil precisa do numero brasileiro, um
 * brasileiro no exterior precisa do numero local de onde ele esta).
 *
 * REGRA DE CONFIANCA: so entram aqui paises com numero de emergencia geral
 * bem estabelecido e estavel (padrao 112 da UE, 911 da America do Norte,
 * 190/192/193 do Brasil — todos verificaveis publicamente e de baixo risco
 * de mudanca). NAO inclui linhas especializadas (intoxicacao, bombeiros
 * separado, etc.) pra paises fora do Brasil — essas variam mais e exigem
 * fonte oficial pra cada pais antes de entrar aqui. Ampliar esta lista com
 * cautela: um numero errado numa emergencia real e pior que nenhum numero.
 */

export const EMERGENCY_NUMBERS_BY_COUNTRY = {
    // Brasil — fonte: numeros ja usados no restante do app (SAMU/Bombeiros/
    // Policia), sem numero unico nacional equivalente ao 112/911.
    BR: { policia: '190', bombeiros: '193', samu: '192', label: 'Brasil' },

    // Uniao Europeia + boa parte do mundo reconhece 112 (padrao GSM/ETSI).
    PT: { geral: '112', label: 'Portugal' },
    ES: { geral: '112', label: 'Espanha' },
    GB: { geral: '999', geralAlt: '112', label: 'Reino Unido' },

    // America do Norte + boa parte da America Latina ja adotou 911.
    US: { geral: '911', label: 'Estados Unidos' },
    MX: { geral: '911', label: 'México' },
};

/**
 * Fallback quando o pais nao foi identificado ou nao esta no mapa acima.
 * 112 e reconhecido por boa parte dos aparelhos GSM mesmo fora da UE como
 * atalho de emergencia — melhor aposta generica do que nao mostrar nada.
 */
export const DEFAULT_EMERGENCY_NUMBERS = { geral: '112', label: null };

export function getEmergencyNumbersForCountry(countryCode) {
    return EMERGENCY_NUMBERS_BY_COUNTRY[countryCode?.toUpperCase()] || DEFAULT_EMERGENCY_NUMBERS;
}
