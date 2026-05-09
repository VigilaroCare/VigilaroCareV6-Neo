import i18next from 'i18next';
import { GUIAS_SEGURANCA_PT_BR } from './locales/pt-BR/guiasSeguranca';
import { GUIAS_SEGURANCA_PT_PT } from './locales/pt-PT/guiasSeguranca';
import { GUIAS_SEGURANCA_EN } from './locales/en/guiasSeguranca';
import { GUIAS_SEGURANCA_ES } from './locales/es/guiasSeguranca';

export const getGuiasSeguranca = () => {
    const lang = i18next.language || 'pt-BR';
    if (lang === 'en') return GUIAS_SEGURANCA_EN;
    if (lang === 'es') return GUIAS_SEGURANCA_ES;
    if (lang === 'pt-PT') return GUIAS_SEGURANCA_PT_PT;
    return GUIAS_SEGURANCA_PT_BR;
};

// Proxy para componentes legados que importam GUIAS_SEGURANCA diretamente
export const GUIAS_SEGURANCA = new Proxy({}, {
    get: function(target, prop) {
        return getGuiasSeguranca()[prop];
    },
    ownKeys: function(target) {
        return Object.keys(getGuiasSeguranca());
    },
    getOwnPropertyDescriptor: function(target, prop) {
        return Object.getOwnPropertyDescriptor(getGuiasSeguranca(), prop);
    }
});
