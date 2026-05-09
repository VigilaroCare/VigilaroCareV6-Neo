
/**
 * educational_guides.js
 * Conteúdo extraído do e-book "Prevenção 3D"
 * Foco: Resumos Equilibrados (Parágrafo Único, Voz Ativa, ~60 palavras)
 */

import i18next from 'i18next';
import { EDUCATIONAL_GUIDES_PT_BR, LISTA_CONVIVENCIA as LC_BR, LISTA_INTIMA as LI_BR, LISTA_SERVICOS as LS_BR, LISTA_LAZER as LL_BR, LISTA_CIRCULACAO as LCIR_BR } from './locales/pt-BR/educational_guides';
import { EDUCATIONAL_GUIDES_PT_PT, LISTA_CONVIVENCIA as LC_PT, LISTA_INTIMA as LI_PT, LISTA_SERVICOS as LS_PT, LISTA_LAZER as LL_PT, LISTA_CIRCULACAO as LCIR_PT } from './locales/pt-PT/educational_guides';
import { EDUCATIONAL_GUIDES_EN, LISTA_CONVIVENCIA as LC_EN, LISTA_INTIMA as LI_EN, LISTA_SERVICOS as LS_EN, LISTA_LAZER as LL_EN, LISTA_CIRCULACAO as LCIR_EN } from './locales/en/educational_guides';
import { EDUCATIONAL_GUIDES_ES, LISTA_CONVIVENCIA as LC_ES, LISTA_INTIMA as LI_ES, LISTA_SERVICOS as LS_ES, LISTA_LAZER as LL_ES, LISTA_CIRCULACAO as LCIR_ES } from './locales/es/educational_guides';

export const getEducationalGuides = () => {
    const lang = i18next.language || 'pt-BR';
    if (lang === 'en') return EDUCATIONAL_GUIDES_EN;
    if (lang === 'es') return EDUCATIONAL_GUIDES_ES;
    if (lang === 'pt-PT') return EDUCATIONAL_GUIDES_PT_PT;
    return EDUCATIONAL_GUIDES_PT_BR;
};

// As constants are lists of keys, they are the same across all languages.
export const LISTA_CONVIVENCIA = LC_BR;
export const LISTA_INTIMA = LI_BR;
export const LISTA_SERVICOS = LS_BR;
export const LISTA_LAZER = LL_BR;
export const LISTA_CIRCULACAO = LCIR_BR;

// For backwards compatibility where components import EDUCATIONAL_GUIDES directly,
// we export a Proxy that forwards to the current language.
export const EDUCATIONAL_GUIDES = new Proxy({}, {
    get: function(target, prop) {
        return getEducationalGuides()[prop];
    },
    ownKeys: function(target) {
        return Object.keys(getEducationalGuides());
    },
    getOwnPropertyDescriptor: function(target, prop) {
        return Object.getOwnPropertyDescriptor(getEducationalGuides(), prop);
    }
});
