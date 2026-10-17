/**
 * RadarSazonalEngine.js — calcula quais riscos sazonais estão ativos AGORA,
 * quais estão CHEGANDO e o calendário do ano, para o país, a região e a casa
 * do usuário. D17, 17/10/2026.
 *
 * Funções puras (a data entra como parâmetro), testadas por
 * scripts/verify_radar.js. Não lê storage nem idioma: a tela localiza.
 *
 * Personalização: "por que isto é para você" usa a regra canônica
 * ProfileFilterEngine.isItemRelevant, aplicada a cada pessoa da casa — nunca
 * reimplementa as regras de idade/tipo (ver CLAUDE.md, Pilar 3).
 */
import { JANELAS_SAZONAIS, PAISES_RADAR } from '../data/radarSazonal';
import { isItemRelevant } from '../utils/ProfileFilterEngine';

const DIA = 86400000;
/** Dias de antecedência com que uma janela por período aparece como "chegando". */
export const ANTECEDENCIA_PADRAO = 21;

// ─── Datas ──────────────────────────────────────────────────────────────────

/** Meia-noite UTC do dia (evita erro de horário de verão no cálculo de dias). */
const dia = (ano, mes, d) => Date.UTC(ano, mes - 1, d);
const hojeUTC = (data) => Date.UTC(data.getFullYear(), data.getMonth(), data.getDate());
const diffDias = (a, b) => Math.round((a - b) / DIA);
const partes = (mmdd) => mmdd.split('-').map(Number);

/** Domingo de Páscoa (algoritmo anônimo gregoriano). */
export function pascoa(ano) {
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const d2 = ((h + l - 7 * m + 114) % 31) + 1;
  return dia(ano, mes, d2);
}

/** n-ésimo dia da semana (0=domingo) do mês; n=-1 é o último. */
function enesimoDiaSemana(ano, mes, diaSemana, n) {
  if (n > 0) {
    const primeiro = new Date(dia(ano, mes, 1)).getUTCDay();
    return dia(ano, mes, 1 + ((diaSemana - primeiro + 7) % 7) + (n - 1) * 7);
  }
  const ultimoDia = new Date(Date.UTC(ano, mes, 0)).getUTCDate();
  const ult = new Date(dia(ano, mes, ultimoDia)).getUTCDay();
  return dia(ano, mes, ultimoDia - ((ult - diaSemana + 7) % 7));
}

/** Data (UTC) de um evento no ano. */
export function dataDoEvento(evento, ano) {
  switch (evento.regra) {
    case 'fixo': { const [m, d] = partes(evento.data); return dia(ano, m, d); }
    case 'pascoa': return pascoa(ano);
    case 'carnaval': return pascoa(ano) - 47 * DIA;            // terça de Carnaval
    case 'thanksgiving': return enesimoDiaSemana(ano, 11, 4, 4); // 4ª quinta de novembro
    case 'dst_us_inicio': return enesimoDiaSemana(ano, 3, 0, 2); // 2º domingo de março
    case 'dst_us_fim': return enesimoDiaSemana(ano, 11, 0, 1);   // 1º domingo de novembro
    case 'hora_eu_marco': return enesimoDiaSemana(ano, 3, 0, -1);  // último domingo de março
    case 'hora_eu_outubro': return enesimoDiaSemana(ano, 10, 0, -1); // último domingo de outubro
    default: throw new Error(`Regra de evento desconhecida: ${evento.regra}`);
  }
}

/** Ocorrência de um período (de/ate em MM-DD) que contém ou sucede `hoje`. */
function ocorrenciasPeriodo(periodo, anoBase) {
  const [m1, d1] = partes(periodo.de);
  const [m2, d2] = partes(periodo.ate);
  const atravessa = m2 * 100 + d2 < m1 * 100 + d1;
  return [anoBase - 1, anoBase, anoBase + 1].map((a) => ({
    inicio: dia(a, m1, d1),
    fim: dia(atravessa ? a + 1 : a, m2, d2),
  }));
}

// ─── Estado de uma janela ───────────────────────────────────────────────────

/**
 * Situação da janela em `hoje`:
 *   { ativa, fase: 'evento'|'pico'|'agora'|'chegando'|null,
 *     diasParaEvento, diasParaInicio, evento, inicio, fim, proximoInicio }
 */
export function estadoJanela(janela, hoje = new Date()) {
  const t = hojeUTC(hoje);
  const ano = hoje.getFullYear();
  let melhor = { ativa: false, fase: null, proximoInicio: null };
  const proximo = (data) => {
    if (data > t && (melhor.proximoInicio == null || data < melhor.proximoInicio)) melhor.proximoInicio = data;
  };

  // Eventos: a contagem regressiva é o que mais orienta a ação.
  for (const ev of janela.eventos || []) {
    for (const a of [ano - 1, ano, ano + 1]) {
      const data = dataDoEvento(ev, a);
      const ini = data - (ev.antes || 0) * DIA;
      const fim = data + (ev.depois || 0) * DIA;
      proximo(ini);
      if (t >= ini && t <= fim) {
        const diasParaEvento = diffDias(data, t);
        if (!melhor.ativa || melhor.fase !== 'evento' || Math.abs(diasParaEvento) < Math.abs(melhor.diasParaEvento)) {
          melhor = { ...melhor, ativa: true, fase: 'evento', evento: ev, diasParaEvento, inicio: ini, fim };
        }
      }
    }
  }
  if (melhor.ativa) return melhor;

  for (const periodo of janela.janelas || []) {
    for (const oc of ocorrenciasPeriodo(periodo, ano)) {
      proximo(oc.inicio);
      if (t >= oc.inicio && t <= oc.fim) {
        let fase = 'agora';
        if (janela.pico) {
          const p = ocorrenciasPeriodo(janela.pico, ano).find((o) => t >= o.inicio && t <= o.fim);
          if (p) fase = 'pico';
        }
        return { ...melhor, ativa: true, fase, inicio: oc.inicio, fim: oc.fim, diasParaFim: diffDias(oc.fim, t) };
      }
      const diasParaInicio = diffDias(oc.inicio, t);
      if (diasParaInicio > 0 && diasParaInicio <= ANTECEDENCIA_PADRAO && melhor.fase !== 'chegando') {
        melhor = { ...melhor, fase: 'chegando', diasParaInicio, inicio: oc.inicio, fim: oc.fim };
      }
    }
  }
  return melhor;
}

// ─── Personalização ─────────────────────────────────────────────────────────

/**
 * Pessoas e pets da casa para quem a janela importa, pela regra canônica.
 * Retorna perfis (não texto): a tela decide como nomear.
 */
export function paraQuem(janela, perfis = [], moradia = null) {
  const tags = janela.publico || [];
  if (!tags.length) return [];
  return (perfis || []).filter((p) => tags.some((tag) => isItemRelevant({ tags: [tag] }, [p], moradia)));
}

const PESO_FASE = { evento: 8, pico: 6, agora: 3, chegando: 0 };

/** Pontuação para ordenar: gravidade, fase, gente da casa no público, ambiente presente. */
function pontuar(janela, estado, quem, ambientesCasa) {
  let s = (janela.severidade || 1) * 10 + (PESO_FASE[estado.fase] || 0);
  if (estado.fase === 'evento' && estado.diasParaEvento >= 0 && estado.diasParaEvento <= 3) s += 6;
  if (quem.length) s += 8;
  if (ambientesCasa.length) s += 5;
  return s;
}

// ─── Radar ──────────────────────────────────────────────────────────────────

/**
 * @param {object} p
 * @param {Date}   p.hoje
 * @param {string} p.pais     ISO alpha-2 detectado
 * @param {string} [p.regiao] escolhida pelo usuário (opcional)
 * @param {Array}  [p.perfis] perfis da residência ativa
 * @param {object} [p.moradia]
 * @param {Array}  [p.mapping] ambientes mapeados (piscina, quintal...)
 * @returns {{ suportado, agora, chegando, ano }}
 */
export function calcularRadar({ hoje = new Date(), pais, regiao = null, perfis = [], moradia = null, mapping = [] } = {}) {
  const P = pais ? String(pais).toUpperCase() : null;
  if (!P || !PAISES_RADAR.includes(P)) return { suportado: false, agora: [], chegando: [], ano: [] };

  const mapa = Array.isArray(mapping) ? mapping : [];
  const doPais = JANELAS_SAZONAIS.filter((j) => j.paises.includes(P))
    .filter((j) => !regiao || !j.regioes || j.regioes.includes(regiao));

  const agora = [];
  const chegando = [];
  for (const janela of doPais) {
    const estado = estadoJanela(janela, hoje);
    if (!estado.fase) continue;
    const quem = paraQuem(janela, perfis, moradia);
    const ambientesCasa = (janela.ambientes || []).filter((a) => mapa.includes(a));
    const item = {
      janela,
      ...estado,
      quem,
      ambientesCasa,
      // Sem região escolhida, a janela regional aparece marcada.
      regioesAlvo: !regiao && janela.regioes ? janela.regioes : null,
      pontuacao: pontuar(janela, estado, quem, ambientesCasa),
    };
    (estado.ativa ? agora : chegando).push(item);
  }
  agora.sort((a, b) => b.pontuacao - a.pontuacao);
  chegando.sort((a, b) => a.diasParaInicio - b.diasParaInicio || b.pontuacao - a.pontuacao);

  return { suportado: true, agora, chegando, ano: calendarioDoAno(doPais, hoje) };
}

/**
 * Os próximos 12 meses, a partir do mês atual: que janelas tocam cada mês.
 * Retorna [{ ano, mes (1-12), janelas: [janela] }].
 */
export function calendarioDoAno(janelas, hoje = new Date()) {
  const meses = [];
  for (let k = 0; k < 12; k++) {
    const ref = new Date(hoje.getFullYear(), hoje.getMonth() + k, 1);
    const ano = ref.getFullYear(), mes = ref.getMonth() + 1;
    const ini = dia(ano, mes, 1);
    const fim = Date.UTC(ano, mes, 0);
    const lista = janelas.filter((j) => {
      for (const periodo of j.janelas || []) {
        if (ocorrenciasPeriodo(periodo, ano).some((o) => o.inicio <= fim && o.fim >= ini)) return true;
      }
      for (const ev of j.eventos || []) {
        const d = dataDoEvento(ev, ano);
        if (d >= ini && d <= fim) return true;
      }
      return false;
    });
    meses.push({ ano, mes, janelas: lista.sort((a, b) => (b.severidade || 1) - (a.severidade || 1)) });
  }
  return meses;
}

/**
 * Avisos a agendar nos próximos `dias`: um por janela, no dia em que ela
 * começa (período) ou alguns dias antes do evento. Hora local 10:00.
 * Retorna [{ janela, quando: Date, evento? }].
 */
export function proximosAvisos({ hoje = new Date(), pais, regiao = null, dias = 60 } = {}) {
  const P = pais ? String(pais).toUpperCase() : null;
  if (!P || !PAISES_RADAR.includes(P)) return [];
  const t = hojeUTC(hoje);
  const limite = t + dias * DIA;
  const avisos = [];
  for (const janela of JANELAS_SAZONAIS) {
    if (!janela.paises.includes(P)) continue;
    if (regiao && janela.regioes && !janela.regioes.includes(regiao)) continue;
    let melhor = null;
    for (const ev of janela.eventos || []) {
      for (const a of [hoje.getFullYear(), hoje.getFullYear() + 1]) {
        const d = dataDoEvento(ev, a) - Math.min(ev.antes || 0, 7) * DIA;
        if (d > t && d <= limite && (!melhor || d < melhor.d)) melhor = { d, evento: ev };
      }
    }
    for (const periodo of janela.janelas || []) {
      for (const oc of ocorrenciasPeriodo(periodo, hoje.getFullYear())) {
        if (oc.inicio > t && oc.inicio <= limite && (!melhor || oc.inicio < melhor.d)) melhor = { d: oc.inicio };
      }
    }
    if (melhor) {
      const data = new Date(melhor.d);
      avisos.push({
        janela,
        evento: melhor.evento || null,
        quando: new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), 10, 0, 0),
      });
    }
  }
  return avisos.sort((a, b) => a.quando - b.quando);
}

export default { calcularRadar, estadoJanela, paraQuem, calendarioDoAno, proximosAvisos, pascoa, dataDoEvento };
