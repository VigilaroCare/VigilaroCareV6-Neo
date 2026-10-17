/**
 * txFixo.js — tradução para texto de tela fora de um componente com
 * useTranslation (D20, 17/10/2026).
 *
 * scripts/extrair_texto_fixo.js tirou das telas o texto escrito direto no JSX
 * (que aparecia em português em qualquer idioma). Onde havia `t` em escopo,
 * a tela usa t(chave, padrão); onde não havia, usa este tx(chave, padrão).
 * O padrão é o texto pt-BR original: se a chave faltar, nada some da tela.
 *
 * Diferença para t(): tx lê o idioma no momento do render, mas não assina a
 * troca de idioma — o componente atualiza na próxima renderização (as telas de
 * pilha montam de novo ao abrir).
 */
import i18n from '../i18n';

export const tx = (chave, padrao) => (padrao && typeof padrao === 'object'
    ? i18n.t(chave, { ns: 'common', ...padrao })
    : i18n.t(chave, { ns: 'common', defaultValue: padrao }));

export default tx;
