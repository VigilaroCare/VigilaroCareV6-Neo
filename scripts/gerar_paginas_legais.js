/**
 * gerar_paginas_legais.js — gera as páginas públicas de Política de
 * Privacidade e Termos de Uso a partir dos MESMOS textos que o app mostra
 * (data/legal/politica_privacidade.js e locales/<idioma>/common.json).
 *
 * Por que existe (17/10/2026): as duas lojas exigem a URL pública da
 * política no cadastro do app, e a Apple exige links funcionando para Termos e
 * Política na tela de assinatura (diretriz 3.1.2). O app aponta para
 * www.vigilarocare.ia.br/politica-de-privacidade e /termos-de-uso — que
 * respondiam 404.
 *
 * Uso: node scripts/gerar_paginas_legais.js   → site-legal/
 * Publicar a pasta site-legal/ no domínio (ex.: Vercel). Regerar e republicar
 * sempre que o texto do app mudar — a página e o app têm de dizer o mesmo.
 */
const fs = require('fs');
const path = require('path');
const Module = require('module');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, { filename: ficheiro, babelrc: false, configFile: false, plugins: ['@babel/plugin-transform-modules-commonjs'] }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};

global.__DEV__ = false;
const { getPoliticaPrivacidade, CONTROLADOR } = require('../data/legal/politica_privacidade');
const { getTermosUso } = require('../data/legal/termos_uso');
const { EMERGENCY_NUMBERS_BY_COUNTRY } = require('../data/emergencyNumbersByCountry');

const IDIOMAS = [
    { cod: 'pt-BR', rotulo: 'Português (Brasil)' },
    { cod: 'pt-PT', rotulo: 'Português (Portugal)' },
    { cod: 'en', rotulo: 'English' },
    { cod: 'es', rotulo: 'Español' },
];
const loc = Object.fromEntries(IDIOMAS.map(({ cod }) => [cod, require(path.join(RAIZ, 'locales', cod, 'common.json'))]));
const get = (o, k) => k.split('.').reduce((a, p) => (a == null ? a : a[p]), o);
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const par = (s) => esc(s).split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
const t = (cod, chave, vars = {}) => {
    let v = get(loc[cod], chave) ?? get(loc['pt-BR'], chave);
    if (typeof v !== 'string') throw new Error(`Falta ${chave} em ${cod}`);
    return v.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] ?? ''));
};

// Números por país para a página (o app mostra só os do país do usuário).
const NOMES_PAIS = {
    BR: { 'pt-BR': 'Brasil', 'pt-PT': 'Brasil', en: 'Brazil', es: 'Brasil' },
    PT: { 'pt-BR': 'Portugal', 'pt-PT': 'Portugal', en: 'Portugal', es: 'Portugal' },
    ES: { 'pt-BR': 'Espanha', 'pt-PT': 'Espanha', en: 'Spain', es: 'España' },
    GB: { 'pt-BR': 'Reino Unido', 'pt-PT': 'Reino Unido', en: 'United Kingdom', es: 'Reino Unido' },
    US: { 'pt-BR': 'Estados Unidos', 'pt-PT': 'Estados Unidos', en: 'United States', es: 'Estados Unidos' },
    MX: { 'pt-BR': 'México', 'pt-PT': 'México', en: 'Mexico', es: 'México' },
};
const OUTROS = { 'pt-BR': 'Outros países: 112 — o celular encaminha ao socorro local na maioria dos países.', 'pt-PT': 'Outros países: 112 — o telemóvel encaminha para o socorro local na maioria dos países.', en: 'Other countries: 112 — your phone routes it to local emergency services in most countries.', es: 'Otros países: 112 — el móvil lo desvía al servicio de emergencias local en la mayoría de los países.' };
function numeros(cod) {
    const linhas = Object.entries(EMERGENCY_NUMBERS_BY_COUNTRY).map(([pais, n]) => {
        const partes = n.samu
            ? [`SAMU ${n.samu}`, `${t(cod, 'headersFirst.bombeirosRotulo')} ${n.bombeiros}`, `${t(cod, 'headersFirst.policiaRotulo')} ${n.policia}`]
            : [n.geral + (n.geralAlt ? ` / ${n.geralAlt}` : '')];
        return `<li><strong>${esc(NOMES_PAIS[pais]?.[cod] || pais)}:</strong> ${esc(partes.join(' · '))}</li>`;
    });
    return `<ul>${linhas.join('')}<li>${esc(OUTROS[cod])}</li></ul>`;
}

function termos(cod) {
    // Fonte única: data/legal/termos_uso.js (a mesma da tela do app).
    const tu = getTermosUso(cod);
    const fornecedor = `<p class="fornecedor">${esc(tu.fornecedor.replace('{{empresa}}', CONTROLADOR.razaoSocial || 'Vigilaro Care').replace('{{email}}', CONTROLADOR.email || ''))}</p><p class="fornecedor">${esc(tu.atualizado)}</p>`;
    const corpo = tu.secoes.map((sec) => `<h2>${esc(sec.titulo)}</h2>${par(sec.texto)}${sec.emergencia ? numeros(cod) : ''}`).join('');
    const priv = `<p><a href="../politica-de-privacidade/#${cod}">${esc(getPoliticaPrivacidade(cod).titulo)}</a></p>`;
    return { titulo: tu.titulo, html: fornecedor + corpo + priv };
}

function politica(cod) {
    const p = getPoliticaPrivacidade(cod);
    const html = (p.subtitulo ? `<p class="sub">${esc(p.subtitulo)}</p>` : '') + p.secoes.map((s) => `<h2>${esc(s.titulo)}</h2>${par(s.texto)}`).join('');
    return { titulo: p.titulo, html };
}

const CSS = `:root{--fg:#14342B;--bg:#FAFAF7;--muted:#5B6B65;--acc:#047857}
@media (prefers-color-scheme:dark){:root{--fg:#E8EFEC;--bg:#0F1A17;--muted:#A3B5AE;--acc:#34D399}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 64px}h1{font-size:1.7rem;margin:.2em 0}h2{font-size:1.1rem;margin:1.8em 0 .4em}
nav{display:flex;flex-wrap:wrap;gap:8px 16px;margin:12px 0 8px}a{color:var(--acc)}section{border-top:1px solid color-mix(in srgb,var(--fg) 15%,transparent);margin-top:32px;padding-top:8px}
.sub,.fornecedor,footer{color:var(--muted);font-size:.92rem}ul{padding-left:1.2em}`;

function pagina(nome, gerador, outra) {
    const blocos = IDIOMAS.map(({ cod }) => ({ cod, ...gerador(cod) }));
    const nav = IDIOMAS.map(({ cod, rotulo }) => `<a href="#${cod}" hreflang="${cod}">${rotulo}</a>`).join('');
    const corpo = blocos.map((b) => `<section id="${b.cod}" lang="${b.cod}"><h1>${esc(b.titulo)}</h1>${b.html}</section>`).join('');
    return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(blocos[0].titulo)} — Vigilaro Care</title><meta name="robots" content="index,follow"><style>${CSS}</style></head>
<body><main><p><strong>Vigilaro Care</strong></p><nav aria-label="Idioma / Language">${nav}</nav>${corpo}
<footer><p><a href="${outra.href}">${esc(outra.rotulo)}</a></p><p>Mesmo texto exibido no aplicativo Vigilaro Care.</p></footer></main></body></html>\n`;
}

const DEST = process.argv[2] ? path.resolve(process.argv[2]) : path.join(RAIZ, 'site-legal');
fs.mkdirSync(path.join(DEST, 'politica-de-privacidade'), { recursive: true });
fs.mkdirSync(path.join(DEST, 'termos-de-uso'), { recursive: true });
fs.writeFileSync(path.join(DEST, 'politica-de-privacidade', 'index.html'), pagina('politica', politica, { href: '../termos-de-uso/', rotulo: 'Termos de Uso / Terms of Use' }));
fs.writeFileSync(path.join(DEST, 'termos-de-uso', 'index.html'), pagina('termos', termos, { href: '../politica-de-privacidade/', rotulo: 'Política de Privacidade / Privacy Policy' }));
fs.writeFileSync(path.join(DEST, 'index.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vigilaro Care</title><style>${CSS}</style></head><body><main><h1>Vigilaro Care</h1><p>Prevenção de acidentes domésticos.</p><ul><li><a href="politica-de-privacidade/">Política de Privacidade / Privacy Policy</a></li><li><a href="termos-de-uso/">Termos de Uso / Terms of Use</a></li><li><a href="mailto:${CONTROLADOR.email || 'contato@vigilarocare.ia.br'}">${CONTROLADOR.email || 'contato@vigilarocare.ia.br'}</a></li></ul></main></body></html>\n`);
console.log('site-legal/ gerado: index.html, politica-de-privacidade/, termos-de-uso/ (4 idiomas cada)');
