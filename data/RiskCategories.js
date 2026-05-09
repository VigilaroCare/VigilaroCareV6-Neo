import i18next from 'i18next';
import { RISK_CATEGORIES as RISK_CATEGORIES_PT_BR } from './locales/pt-BR/RiskCategories';
import { RISK_CATEGORIES as RISK_CATEGORIES_PT_PT } from './locales/pt-PT/RiskCategories';
import { RISK_CATEGORIES_EN } from './locales/en/RiskCategories';
import { RISK_CATEGORIES_ES } from './locales/es/RiskCategories';

const DataRouter = {
    'pt-BR': RISK_CATEGORIES_PT_BR,
    'pt-PT': RISK_CATEGORIES_PT_PT,
    'en': RISK_CATEGORIES_EN,
    'es': RISK_CATEGORIES_ES
};

export const RISK_CATEGORIES = new Proxy([], {
    get(target, prop, receiver) {
        const currentLang = i18next.language || 'pt-BR';
        // Base lang in case of pt-BR vs pt-PT vs en-US
        const baseLang = currentLang.includes('pt-PT') ? 'pt-PT' 
                       : currentLang.includes('pt') ? 'pt-BR' 
                       : currentLang.includes('es') ? 'es' 
                       : currentLang.includes('en') ? 'en' 
                       : 'pt-BR';
        
        const data = DataRouter[baseLang] || DataRouter['pt-BR'];

        // Proxy Array methods correctly
        if (typeof data[prop] === 'function') {
            return data[prop].bind(data);
        }

        // Return array element or property
        return data[prop];
    }
});

export default RISK_CATEGORIES;
