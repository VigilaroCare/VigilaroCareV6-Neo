/**
 * perigoProduto.js — o nível de perigo de um produto, em tom e em texto.
 *
 * Existe para que a pílula de perigo seja a mesma no hub, no resultado e no
 * histórico. Antes cada tela lia `item.cor` (um hex gravado no catálogo, ou o
 * emoji 🔴🟠🟡🟢) e decidia sozinha.
 */
import { t_field } from './getLocalizedField';
import { ROTULO_DO_PERIGO } from '../data/regras_inforotulos';

/**
 * Tom semântico (error | warning | success | muted) de um valor de `perigo`.
 * Qualquer menção a "mortal" ou "fatal" sobe para error: o qualificador de um
 * valor composto ("Médio (Humanos) / Mortal (Gatos)") pesa mais que a palavra
 * que vem primeiro.
 */
export function tomDoPerigo(perigo) {
    const p = String(perigo || '').toLowerCase();
    if (/extremo|muito alto|mortal|fatal/.test(p)) return 'error';
    if (/^alto/.test(p)) return 'error';
    if (/m[eé]dio/.test(p)) return 'warning';
    if (/baixo/.test(p)) return 'success';
    return 'muted';
}

/** Rótulo do perigo no idioma do app; valor composto ou desconhecido volta como veio. */
export function rotuloDoPerigo(perigo) {
    const bloco = ROTULO_DO_PERIGO[perigo];
    return bloco ? t_field(bloco, 'label') : String(perigo || '');
}

/** Tom (error | warning | info) de um alerta do motor de regras, pela severidade dele. */
const TOM_DA_SEVERIDADE = { CRITICAL: 'error', HIGH: 'error', MEDIUM: 'warning', LOW: 'warning', INFO: 'info' };
export const tomDaSeveridade = (severidade) => TOM_DA_SEVERIDADE[severidade] || 'muted';

/** Ícone vetorial do alerta. O motor devolvia emoji (🚨⚠️⚡💡ℹ️): emoji não é ícone do app. */
const ICONE_DA_SEVERIDADE = { CRITICAL: 'WarningOctagon', HIGH: 'Warning2', MEDIUM: 'Warning2', LOW: 'InfoCircle', INFO: 'InfoCircle' };
export const iconeDaSeveridade = (severidade) => ICONE_DA_SEVERIDADE[severidade] || 'Warning2';

/** Nome de ícone: o de um NeoIcon válido ou o genérico (o histórico antigo guardou emoji). */
export function iconeSeguro(nome) {
    return typeof nome === 'string' && /^[A-Za-z0-9]+$/.test(nome) ? nome : 'TestTube';
}
