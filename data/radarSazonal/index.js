/**
 * Radar sazonal Vigilaro — calendário de riscos por PAÍS, REGIÃO e DATA.
 * D17, 17/10/2026.
 *
 * ================================================================
 * POR QUE EXISTE
 * ================================================================
 * O Radar escolhia um alerta pelo número do mês (`getMonth()`), com um
 * calendário brasileiro para todo o mundo: em Portugal avisaria de afogamento
 * em janeiro e de frio em maio. O Agnaldo pediu uma ferramenta que salve
 * vidas, pesquisada em fonte oficial de cada lugar.
 *
 * ================================================================
 * MODELO
 * ================================================================
 * Cada JANELA DE RISCO tem:
 *   paises        ['BR'] — só aparece no país detectado (pela localização).
 *   regioes       opcional — chaves de REGIOES[pais]. Sem região escolhida
 *                 pelo usuário, a janela aparece marcada "vale para: ...".
 *   janelas       [{ de:'MM-DD', ate:'MM-DD' }] — pode atravessar o ano.
 *   eventos       [{ regra, data?, antes, depois, nome* }] — data fixa ou
 *                 móvel (carnaval, pascoa, thanksgiving, mudança de hora).
 *                 Aparece `antes` dias antes, com contagem regressiva.
 *   pico          opcional { de, ate } — destaca "pico agora".
 *   severidade    1 a 3.
 *   publico       ['crianca','bebe','idoso','pet'] — NÃO esconde a janela:
 *                 serve para dizer "por que isto é para você", com a regra
 *                 canônica (ProfileFilterEngine.isItemRelevant) aplicada a
 *                 cada pessoa da casa.
 *   ambientes     chaves do mapeamento da casa (piscina, quintal...) — sobem
 *                 a prioridade quando a casa tem o ambiente.
 *   titulo, resumo, orientacoes (+ _en, _es) e fonte.
 *
 * O texto-base das janelas de Portugal está em português de Portugal; das
 * demais, em português do Brasil. Tokens ({{EMERGENCY_NUMBER}} etc.) são
 * resolvidos pelo país em utils/emergencyTokens.js.
 *
 * Para acrescentar um risco: crie a janela no ficheiro do país, cite a fonte
 * oficial em `fonte` e rode `npm run validate:radar`.
 */
import { JANELAS_BR } from './br';
import { JANELAS_PT } from './pt';
import { JANELAS_ES } from './es';
import { JANELAS_GB } from './gb';
import { JANELAS_US } from './us';
import { JANELAS_MX } from './mx';

// Mudança de hora na Europa (último domingo de março e de outubro): o
// lembrete combinado para testar detectores de fumo e de monóxido de carbono.
const JANELAS_EUROPA = [
  {
    id: "eu_mudanca_hora",
    paises: ["PT", "ES", "GB"],
    eventos: [
      { regra: "hora_eu_marco", antes: 5, depois: 2, nome: "mudança de hora", nome_en: "clock change", nome_es: "cambio de hora" },
      { regra: "hora_eu_outubro", antes: 5, depois: 2, nome: "mudança de hora", nome_en: "clock change", nome_es: "cambio de hora" }
    ],
    severidade: 1,
    categoria: "incendio",
    publico: [],
    icone: "Clock",
    titulo: "Mudou a hora? Teste os detectores",
    titulo_en: "Clocks changing? Test your alarms",
    titulo_es: "¿Cambia la hora? Pruebe los detectores",
    resumo: "A mudança de hora é o lembrete ideal para testar os detectores de fumaça e de monóxido de carbono da casa.",
    resumo_en: "The clock change is the ideal reminder to test your home's smoke and carbon monoxide alarms.",
    resumo_es: "El cambio de hora es el recordatorio ideal para probar los detectores de humo y de monóxido de carbono de casa.",
    orientacoes: [
      "Aperte o botão de teste de cada detector.",
      "Troque as pilhas se o aparelho pedir; detectores com mais de 10 anos devem ser substituídos.",
      "Revise com a família a saída de emergência e o ponto de encontro."
    ],
    orientacoes_en: [
      "Press the test button on every alarm.",
      "Replace batteries when prompted; alarms older than 10 years should be replaced.",
      "Review the emergency exit and meeting point with the family."
    ],
    orientacoes_es: [
      "Pulse el botón de prueba de cada detector.",
      "Cambie las pilas si el aparato lo pide; los detectores con más de 10 años deben sustituirse.",
      "Repase con la familia la salida de emergencia y el punto de encuentro."
    ],
    fonte: "Serviços de bombeiros (Fire and Rescue Services, UK); boas práticas"
  }
];

export const JANELAS_SAZONAIS = [
  ...JANELAS_BR,
  ...JANELAS_PT,
  ...JANELAS_ES,
  ...JANELAS_GB,
  ...JANELAS_US,
  ...JANELAS_MX,
  ...JANELAS_EUROPA,
];

/** Países com calendário próprio. Os demais veem só o acervo geral. */
export const PAISES_RADAR = ["BR", "PT", "ES", "GB", "US", "MX"];

/** Hemisfério de cada país — o Brasil é o único do sul na lista. */
export const HEMISFERIO = { BR: "sul", PT: "norte", ES: "norte", GB: "norte", US: "norte", MX: "norte" };

/** Regiões que o usuário pode escolher (opcional), com rótulo por idioma. */
export const REGIOES = {
  BR: [
    { id: "norte", nome: "Norte", nome_en: "North", nome_es: "Norte" },
    { id: "nordeste", nome: "Nordeste", nome_en: "Northeast", nome_es: "Nordeste" },
    { id: "centro_oeste", nome: "Centro-Oeste", nome_en: "Center-West", nome_es: "Centro-Oeste" },
    { id: "sudeste", nome: "Sudeste", nome_en: "Southeast", nome_es: "Sudeste" },
    { id: "sul", nome: "Sul", nome_en: "South", nome_es: "Sur" },
  ],
  PT: [
    { id: "continente", nome: "Continente", nome_en: "Mainland", nome_es: "Continente" },
    { id: "acores", nome: "Açores", nome_en: "Azores", nome_es: "Azores" },
    { id: "madeira", nome: "Madeira", nome_en: "Madeira", nome_es: "Madeira" },
  ],
  ES: [
    { id: "peninsula", nome: "Península", nome_en: "Mainland", nome_es: "Península" },
    { id: "baleares", nome: "Baleares", nome_en: "Balearic Islands", nome_es: "Baleares" },
    { id: "canarias", nome: "Canárias", nome_en: "Canary Islands", nome_es: "Canarias" },
  ],
  US: [
    { id: "northeast", nome: "Nordeste", nome_en: "Northeast", nome_es: "Noreste" },
    { id: "midwest", nome: "Meio-Oeste", nome_en: "Midwest", nome_es: "Medio Oeste" },
    { id: "south", nome: "Sul", nome_en: "South", nome_es: "Sur" },
    { id: "west", nome: "Oeste", nome_en: "West", nome_es: "Oeste" },
  ],
  MX: [
    { id: "norte", nome: "Norte", nome_en: "North", nome_es: "Norte" },
    { id: "centro", nome: "Centro", nome_en: "Center", nome_es: "Centro" },
    { id: "sur", nome: "Sul e Sudeste", nome_en: "South and Southeast", nome_es: "Sur y Sureste" },
  ],
  GB: [],
};

/**
 * Como ativar os alertas OFICIAIS de cada país. O Radar orienta para a fonte
 * de alerta real em vez de inventar uma: ela é mais rápida e mais precisa.
 */
export const ALERTAS_OFICIAIS = {
  BR: {
    titulo: "Receba os alertas da Defesa Civil",
    titulo_en: "Get Civil Defense alerts",
    titulo_es: "Reciba las alertas de Defensa Civil",
    itens: [
      "Envie o seu CEP por SMS para 40199 — gratuito; pode cadastrar vários CEPs.",
      "Mantenha ligados os “alertas de emergência” do celular: a Defesa Civil Alerta avisa pela localização, sem cadastro.",
      "Emergências: Defesa Civil 199, Bombeiros {{FIRE_NUMBER}}, {{EMERGENCY_MEDICAL}}."
    ],
    itens_en: [
      "Text your postcode (CEP) to 40199 — free; you can register several.",
      "Keep your phone's “emergency alerts” on: Defesa Civil Alerta warns by location, no sign-up needed.",
      "Emergencies: Civil Defense 199, Fire {{FIRE_NUMBER}}, {{EMERGENCY_MEDICAL}}."
    ],
    itens_es: [
      "Envíe su código postal (CEP) por SMS al 40199 — gratis; puede registrar varios.",
      "Mantenga activadas las “alertas de emergencia” del celular: Defesa Civil Alerta avisa por ubicación, sin registro.",
      "Emergencias: Defensa Civil 199, Bomberos {{FIRE_NUMBER}}, {{EMERGENCY_MEDICAL}}."
    ],
    fonte: "Defesa Civil Nacional"
  },
  PT: {
    titulo: "Avisos oficiais em Portugal",
    titulo_en: "Official warnings in Portugal",
    titulo_es: "Avisos oficiales en Portugal",
    itens: [
      "Siga os avisos meteorológicos do IPMA (ipma.pt) e os da Proteção Civil (ANEPC).",
      "A ANEPC envia SMS de aviso à população em situações de risco — não os ignore.",
      "Emergência: 112. Centro de Informação Antivenenos: 800 250 250."
    ],
    itens_en: [
      "Follow IPMA weather warnings (ipma.pt) and civil protection (ANEPC) notices.",
      "ANEPC sends warning text messages to the public in risk situations — do not ignore them.",
      "Emergency: 112. Poison information centre (CIAV): 800 250 250."
    ],
    itens_es: [
      "Siga los avisos meteorológicos del IPMA (ipma.pt) y los de Protección Civil (ANEPC).",
      "La ANEPC envía SMS de aviso a la población en situaciones de riesgo — no los ignore.",
      "Emergencias: 112. Centro de Información Antivenenos: 800 250 250."
    ],
    fonte: "IPMA; ANEPC"
  },
  ES: {
    titulo: "Avisos oficiais na Espanha",
    titulo_en: "Official warnings in Spain",
    titulo_es: "Avisos oficiales en España",
    itens: [
      "ES-Alert: os alertas chegam ao celular sem cadastro — mantenha os alertas de emergência ativados.",
      "Avisos meteorológicos da AEMET (Meteoalerta) e nível de risco por calor do Ministério da Saúde.",
      "Emergência: 112."
    ],
    itens_en: [
      "ES-Alert: alerts reach your phone with no sign-up — keep emergency alerts enabled.",
      "AEMET weather warnings (Meteoalerta) and the Ministry of Health's heat-risk levels.",
      "Emergency: 112."
    ],
    itens_es: [
      "ES-Alert: las alertas llegan al móvil sin registro — mantenga activadas las alertas de emergencia.",
      "Avisos meteorológicos de la AEMET (Meteoalerta) y niveles de riesgo por calor del Ministerio de Sanidad.",
      "Emergencias: 112."
    ],
    fonte: "Protección Civil; AEMET; Ministerio de Sanidad"
  },
  GB: {
    titulo: "Avisos oficiais no Reino Unido",
    titulo_en: "Official warnings in the UK",
    titulo_es: "Avisos oficiales en el Reino Unido",
    itens: [
      "Emergency Alerts: mantenha os alertas de emergência ativados no celular.",
      "Avisos do Met Office e alertas de saúde por calor e frio da UKHSA (é possível assinar).",
      "Emergência: 999 ou 112. Orientação de saúde: NHS 111."
    ],
    itens_en: [
      "Emergency Alerts: keep emergency alerts enabled on your phone.",
      "Met Office warnings and UKHSA heat- and cold-health alerts (you can subscribe).",
      "Emergency: 999 or 112. Health advice: NHS 111."
    ],
    itens_es: [
      "Emergency Alerts: mantenga activadas las alertas de emergencia del móvil.",
      "Avisos del Met Office y alertas de salud por calor y frío de la UKHSA (puede suscribirse).",
      "Emergencias: 999 o 112. Orientación sanitaria: NHS 111."
    ],
    fonte: "UK Government — Emergency Alerts; Met Office; UKHSA"
  },
  US: {
    titulo: "Alertas oficiais nos EUA",
    titulo_en: "Official alerts in the US",
    titulo_es: "Alertas oficiales en EE. UU.",
    itens: [
      "Wireless Emergency Alerts (WEA) ativados no celular.",
      "Rádio meteorológico NOAA e cadastro nos alertas do seu condado.",
      "Emergência: 911. Centro de intoxicação: 1-800-222-1222."
    ],
    itens_en: [
      "Wireless Emergency Alerts (WEA) enabled on your phone.",
      "A NOAA Weather Radio and sign-up for your county's alerts.",
      "Emergency: 911. Poison Help: 1-800-222-1222."
    ],
    itens_es: [
      "Alertas de emergencia inalámbricas (WEA) activadas en el celular.",
      "Radio meteorológica NOAA e inscripción en las alertas de su condado.",
      "Emergencias: 911. Centro de toxicología: 1-800-222-1222."
    ],
    fonte: "FEMA; NOAA; Poison Help"
  },
  MX: {
    titulo: "Alertas oficiais no México",
    titulo_en: "Official alerts in Mexico",
    titulo_es: "Alertas oficiales en México",
    itens: [
      "Alerta sísmica (SASMEX) e alertas de Proteção Civil no celular, onde houver cobertura.",
      "Avisos do Serviço Meteorológico Nacional (SMN) sobre ciclones e frentes frias.",
      "Emergência: 911."
    ],
    itens_en: [
      "Seismic alerts (SASMEX) and Civil Protection alerts on your phone, where available.",
      "National Weather Service (SMN) warnings on cyclones and cold fronts.",
      "Emergency: 911."
    ],
    itens_es: [
      "Alerta sísmica (SASMEX) y alertas de Protección Civil en el celular, donde haya cobertura.",
      "Avisos del Servicio Meteorológico Nacional (SMN) sobre ciclones y frentes fríos.",
      "Emergencias: 911."
    ],
    fonte: "Coordinación Nacional de Protección Civil; SMN"
  }
};
