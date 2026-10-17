/**
 * pdfReport.js — Shell HTML + CSS compartilhado dos relatórios em PDF.
 *
 * Fonte ÚNICA do visual dos relatórios (marca DS2026: Forest Deep + Emerald +
 * Champagne). Usado pelo TravelReportService (dossiê de viagem) e pelo
 * SafetyReportService (relatório de vistoria). Mexer no estilo aqui atualiza
 * TODOS os relatórios — foi assim que o dossiê elevou o padrão do relatório
 * antigo (que era "básico", queixa do autor 2026-06-14).
 */
import i18n from '../i18n';

// Paleta da marca em hex (HTML não lê tokens do DS; espelha LightColors).
const FOREST = '#14342B';
const EMERALD = '#2E7D5B';
const CHAMPAGNE = '#C8A961';
const INK = '#2D2D2D';
const MUTED = '#6B7280';
const LINE = '#E6E8E6';
const SOFT = '#F6F8F7';

// Escala tipográfica calibrada para LEGIBILIDADE por idosos / baixa visão
// (público-alvo do app). PDF é leitura — fonte generosa não é luxo, é função.
// NOTA (2026-06-30): os px parecem "grandes" DE PROPÓSITO. O expo-print (WebView
// Android) diagrama numa largura grande e ENCOLHE pra caber na página, então o
// tamanho VISUAL é ~60% do px nominal. body:22 rende ~como a tela do app (~14).
// Não reduzir "porque parece grande no código" — conferir no PDF real, não no número.
export const REPORT_CSS = `
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${INK}; margin: 0; padding: 0; font-size: 22px; line-height: 1.6; }
  .page { padding: 32px 40px 64px; }
  .header { background: ${FOREST}; color: #fff; padding: 32px 40px; }
  .header .brand { font-size: 16px; letter-spacing: 2px; text-transform: uppercase; opacity: .85; margin: 0 0 6px; }
  .header h1 { font-size: 38px; margin: 0 0 6px; font-weight: 800; }
  .header .subtitle { font-size: 20px; opacity: .92; margin: 0; }
  .header .accent { height: 3px; width: 64px; background: ${CHAMPAGNE}; margin-top: 14px; border-radius: 2px; }
  h2 { color: ${EMERALD}; font-size: 27px; margin: 32px 0 14px; border-bottom: 1px solid ${LINE}; padding-bottom: 6px; }
  .lead { background: ${SOFT}; border-left: 4px solid ${EMERALD}; padding: 18px 20px; border-radius: 8px; margin: 14px 0 6px; font-size: 22px; line-height: 1.55; }
  .card { border: 1px solid ${LINE}; border-radius: 10px; padding: 16px 20px; margin-bottom: 14px; }
  .card h3 { margin: 0 0 8px; font-size: 24px; color: ${INK}; }
  .muted { color: ${MUTED}; font-size: 18px; }
  ul.bullets { margin: 10px 0 0; padding-left: 22px; }
  ul.bullets li { font-size: 21px; line-height: 1.5; margin-bottom: 8px; }
  .pill { display: inline-block; background: ${SOFT}; color: ${EMERALD}; border: 1px solid ${LINE}; border-radius: 999px; padding: 4px 14px; font-size: 16px; margin: 0 6px 8px 0; }
  .source { color: ${MUTED}; font-size: 16px; font-style: italic; margin-top: 10px; }
  .disclaimer { background: #FBF3DF; border: 1px solid ${CHAMPAGNE}; border-left: 5px solid ${CHAMPAGNE}; color: #5C4A1A; border-radius: 8px; padding: 16px 18px; margin: 22px 0 8px; font-size: 20px; font-weight: 600; line-height: 1.5; }
  .footer { margin-top: 30px; border-top: 1px solid ${LINE}; padding-top: 12px; color: ${MUTED}; font-size: 16px; text-align: center; }
`;

/**
 * Monta o documento HTML completo a partir do corpo já renderizado.
 * @param {{title?:string, brand?:string, headline?:string, subtitle?:string, bodyHtml?:string, footerNote?:string}} opts
 */
export function htmlDocument({ title, brand = 'Vigilaro Care', headline, subtitle, bodyHtml, footerNote } = {}) {
  return `<!DOCTYPE html>
<html lang="${i18n.language || 'pt-BR'}">
<head>
  <meta charset="utf-8">
  <title>${title || 'Relatório Vigilaro Care'}</title>
  <style>${REPORT_CSS}</style>
</head>
<body>
  <div class="header">
    <p class="brand">${brand}</p>
    <h1>${headline || ''}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
    <div class="accent"></div>
  </div>
  <div class="page">
    ${bodyHtml || ''}
    ${footerNote ? `<div class="footer">${footerNote}</div>` : ''}
  </div>
</body>
</html>`;
}

export default htmlDocument;
