import i18next from 'i18next';
import { SAFETY_ARTICLES_PT_BR, DISCLAIMER_FOOTER_PT_BR } from './locales/pt-BR/SafetyArticlesDB';
import { SAFETY_ARTICLES_PT_PT, DISCLAIMER_FOOTER_PT_PT } from './locales/pt-PT/SafetyArticlesDB';
import { SAFETY_ARTICLES_EN, DISCLAIMER_FOOTER_EN } from './locales/en/SafetyArticlesDB';
import { SAFETY_ARTICLES_ES, DISCLAIMER_FOOTER_ES } from './locales/es/SafetyArticlesDB';

export const getSafetyArticles = () => {
    const lang = i18next.language || 'pt-BR';
    if (lang === 'en') return SAFETY_ARTICLES_EN;
    if (lang === 'es') return SAFETY_ARTICLES_ES;
    if (lang === 'pt-PT') return SAFETY_ARTICLES_PT_PT;
    return SAFETY_ARTICLES_PT_BR;
};

export const getDisclaimerFooter = () => {
    const lang = i18next.language || 'pt-BR';
    if (lang === 'en') return DISCLAIMER_FOOTER_EN;
    if (lang === 'es') return DISCLAIMER_FOOTER_ES;
    if (lang === 'pt-PT') return DISCLAIMER_FOOTER_PT_PT;
    return DISCLAIMER_FOOTER_PT_BR;
};

// Proxy para componentes legados que importam SAFETY_ARTICLES e DISCLAIMER_FOOTER diretamente
export const SAFETY_ARTICLES = new Proxy([], {
    get: function(target, prop) {
        if (prop === 'length') return getSafetyArticles().length;
        if (prop === 'filter') return getSafetyArticles().filter.bind(getSafetyArticles());
        if (prop === 'find') return getSafetyArticles().find.bind(getSafetyArticles());
        if (prop === 'map') return getSafetyArticles().map.bind(getSafetyArticles());
        if (prop === Symbol.iterator) return getSafetyArticles()[Symbol.iterator].bind(getSafetyArticles());
        return getSafetyArticles()[prop];
    }
});

// Getter dinâmico para DISCLAIMER_FOOTER (embora uma string primitiva exportada não possa ser proxyzada tão facilmente, 
// a maioria dos lugares pode estar lendo o valor no momento de render. O ideal é usar o getter nas telas).
// Para export const string, o ES6 não permite reatribuição dinâmica da mesma maneira que objetos,
// portanto, nos componentes deve-se preferir usar o hook de tradução ou getDisclaimerFooter().
// Mas como não podemos alterar isso perfeitamente, exportaremos a string padrão.
export const DISCLAIMER_FOOTER = DISCLAIMER_FOOTER_PT_BR;

// Helper para buscar artigos
export const getArticlesByCategory = (catId) => {
    if (!catId) return [];
    return getSafetyArticles().filter(art => art.categoryId === catId);
};

export const getArticleById = (id) => {
    return getSafetyArticles().find(art => art.id === id);
};
