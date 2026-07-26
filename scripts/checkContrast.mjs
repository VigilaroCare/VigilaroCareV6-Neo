/**
 * Vigilaro Care — verificação de contraste do Design System
 * ------------------------------------------------------------------
 *   node scripts/checkContrast.mjs
 *
 * Carrega o DesignSystem2026 de verdade (com um stub de react-native) e afere
 * cada token de TEXTO contra as superfícies em que ele pode cair, nas quatro
 * variantes de tema. Sai com código 1 se algo reprovar — dá para pendurar num
 * "pretest" do package.json.
 *
 * Não afere colors.feedback.* nem primary[500]: são tokens de PREENCHIMENTO
 * por especificação. Se algum deles aparecer dentro de um <Text>, o erro está
 * na tela, não aqui.
 *
 * Mínimos WCAG AA — 4.5:1 texto normal · 3.0:1 texto grande e elementos de UI.
 */

import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const DS_PATH = resolve(here, '../utils/DesignSystem2026.js');

/* ---------------------------------------------------- carga do DS */

let raw;
try {
  raw = readFileSync(DS_PATH, 'utf8');
} catch {
  console.error(`Não encontrei o Design System em:\n  ${DS_PATH}\n` +
    'Ajuste DS_PATH no topo deste script.');
  process.exit(1);
}

const shimmed = raw.replace(
  /import\s*\{\s*Platform\s*\}\s*from\s*'react-native';?/,
  "const Platform = { OS: 'ios' };"
);
const tmp = join(tmpdir(), `vigilaro-ds-${process.pid}.mjs`);
writeFileSync(tmp, shimmed, 'utf8');

let mod;
try {
  mod = await import(pathToFileURL(tmp).href);
} finally {
  rmSync(tmp, { force: true });
}

const { DS, DarkDS, HighContrastDS, HighContrastDarkDS } = mod;

/* ---------------------------------------------------- WCAG */

function parse(c) {
  const h = String(c).trim();
  if (h.startsWith('#')) {
    const s = h.length === 4 ? '#' + h.slice(1).replace(/(\w)/g, '$1$1') : h;
    return [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  }
  const m = h.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const parts = m[1].split(',').map((n) => parseFloat(n));
    // rgba com alpha não é aferível sem saber o que está por baixo
    if (parts.length > 3 && parts[3] < 1) return null;
    return parts.slice(0, 3);
  }
  return null;
}

function luminance(c) {
  const p = parse(c);
  if (!p) return null;
  const [r, g, b] = p.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  const [hi, lo] = [la, lb].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------------------------------------------------- casos */

const NORMAL = 4.5;
const LARGE = 3.0;

/**
 * Cada variante declara as superfícies onde seu texto pode cair. O verificador
 * cruza todo token de texto contra TODAS elas — é assim que se pega o valor
 * que só reprova na superfície mais escura da tela.
 */
function casesFor(ds, nome, superficies) {
  const c = ds.colors;
  const t = ds.type;
  const out = [];

  for (const [k, v] of Object.entries(c.textOn || {})) {
    for (const [sn, sv] of Object.entries(superficies)) {
      out.push([`textOn.${k} sobre ${sn}`, v, sv, NORMAL]);
    }
  }

  const typeRoles = {
    display: LARGE, h1: NORMAL, h2: NORMAL, h3: NORMAL,
    body: NORMAL, bodySmall: NORMAL, caption: NORMAL, eyebrow: NORMAL,
  };
  for (const [k, min] of Object.entries(typeRoles)) {
    if (!t[k] || !t[k].color) continue;
    for (const [sn, sv] of Object.entries(superficies)) {
      out.push([`type.${k} sobre ${sn}`, t[k].color, sv, min]);
    }
  }

  for (const [k, g] of Object.entries(c.gridAccents || {})) {
    for (const [sn, sv] of Object.entries(superficies)) {
      out.push([`gridAccents.${k} sobre ${sn}`, g.color, sv, NORMAL]);
    }
  }

  return { nome, casos: out };
}

const grupos = [
  casesFor(DS, 'LIGHT', {
    mist: DS.colors.mist.gradient[2],
    tile: DS.colors.tile.cream,
    branco: DS.colors.surface,
    chip: DS.colors.primary[100],
  }),
  casesFor(DarkDS, 'DARK', {
    fundo: DarkDS.colors.neutral[100],
    card: DarkDS.colors.neutral[200],
  }),
  casesFor(HighContrastDS, 'ALTO CONTRASTE claro', {
    branco: HighContrastDS.colors.surface,
    tile: HighContrastDS.colors.tile.cream,
  }),
  casesFor(HighContrastDarkDS, 'ALTO CONTRASTE escuro', {
    preto: HighContrastDarkDS.colors.surface,
    tile: HighContrastDarkDS.colors.tile.creamRaised,
  }),
];

grupos.push({
  nome: 'SEVERIDADE E EMERGÊNCIA',
  casos: [
    ...Object.entries(DS.severity).map(([k, v]) => [
      `severity.${k}`,
      v.text === '#FFF' ? '#FFFFFF' : v.text,
      v.bg,
      NORMAL,
    ]),
    ['emergency: texto sobre pânico', DS.emergency.onPanic, DS.emergency.panic, NORMAL],
    ['emergency: rótulo sobre WhatsApp', DS.emergency.onWhatsapp, DS.emergency.whatsapp, NORMAL],
    ['emergency: botão cancelar', '#FFFFFF', DS.emergency.ctaDark, NORMAL],
  ],
});

/* ---------------------------------------------------- execução */

let falhas = 0;
let naoAferidos = 0;

for (const { nome, casos } of grupos) {
  const ruins = [];
  for (const [label, fg, bg, min] of casos) {
    const r = ratio(fg, bg);
    if (r === null) { naoAferidos += 1; continue; }
    if (r < min) ruins.push([label, fg, bg, min, r]);
  }
  console.log(`\n${nome} — ${casos.length} pares · ${ruins.length ? `${ruins.length} falha(s)` : 'tudo passa'}`);
  for (const [label, fg, bg, min, r] of ruins) {
    console.log(`   FALHA  ${r.toFixed(2)}:1  (mín ${min.toFixed(1)})  ${label}  ${fg} / ${bg}`);
    falhas += 1;
  }
}

console.log('\n' + '─'.repeat(62));
if (naoAferidos) console.log(`${naoAferidos} par(es) com cor não aferível (rgba com alpha) — ignorados.`);
if (falhas) {
  console.error(`${falhas} par(es) abaixo do mínimo.\n` +
    'Escureça o acento preservando o matiz, ou mova o token para colors.feedback (fill).\n');
  process.exit(1);
}
console.log('Todos os pares de texto passam em WCAG AA.\n');
