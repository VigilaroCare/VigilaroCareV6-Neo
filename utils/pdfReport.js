/**
 * pdfReport.js — Shell HTML + CSS compartilhado dos relatórios em PDF.
 *
 * Fonte ÚNICA do visual dos relatórios (marca DS2026: Forest Deep + Emerald +
 * Champagne). Usado pelo TravelReportService (dossiê de viagem) e pelo
 * SafetyReportService (relatório de vistoria). Mexer no estilo aqui atualiza
 * TODOS os relatórios — foi assim que o dossiê elevou o padrão do relatório
 * antigo (que era "básico", queixa do autor 2026-06-14).
 */

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
export const REPORT_CSS = `
  * { box-sizing: border-box; }
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${INK}; margin: 0; padding: 0; font-size: 15px; line-height: 1.65; }
  .page { padding: 32px 40px 64px; }
  .header { background: ${FOREST}; color: #fff; padding: 30px 40px; }
  .header .brand { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; opacity: .85; margin: 0 0 6px; }
  .header h1 { font-size: 30px; margin: 0 0 6px; font-weight: 800; }
  .header .subtitle { font-size: 15px; opacity: .92; margin: 0; }
  .header .accent { height: 3px; width: 64px; background: ${CHAMPAGNE}; margin-top: 14px; border-radius: 2px; }
  h2 { color: ${EMERALD}; font-size: 20px; margin: 30px 0 14px; border-bottom: 1px solid ${LINE}; padding-bottom: 6px; }
  .lead { background: ${SOFT}; border-left: 4px solid ${EMERALD}; padding: 15px 18px; border-radius: 8px; margin: 12px 0 6px; font-size: 15.5px; line-height: 1.6; }
  .card { border: 1px solid ${LINE}; border-radius: 10px; padding: 15px 18px; margin-bottom: 13px; }
  .card h3 { margin: 0 0 7px; font-size: 17px; color: ${INK}; }
  .muted { color: ${MUTED}; font-size: 14px; }
  ul.bullets { margin: 9px 0 0; padding-left: 20px; }
  ul.bullets li { font-size: 15px; line-height: 1.5; margin-bottom: 7px; }
  .pill { display: inline-block; background: ${SOFT}; color: ${EMERALD}; border: 1px solid ${LINE}; border-radius: 999px; padding: 3px 12px; font-size: 13px; margin: 0 6px 7px 0; }
  .source { color: ${MUTED}; font-size: 12.5px; font-style: italic; margin-top: 9px; }
  .footer { margin-top: 36px; border-top: 1px solid ${LINE}; padding-top: 12px; color: ${MUTED}; font-size: 12.5px; text-align: center; }
`;

/**
 * Monta o documento HTML completo a partir do corpo já renderizado.
 * @param {{title?:string, brand?:string, headline?:string, subtitle?:string, bodyHtml?:string, footerNote?:string}} opts
 */
export function htmlDocument({ title, brand = 'Vigilaro Care', headline, subtitle, bodyHtml, footerNote } = {}) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
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
