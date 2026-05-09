import { primeirosSocorrosPTBR } from './locales/pt-BR/primeiros_socorros';
import { primeirosSocorrosEN } from './locales/en/primeiros_socorros';
import { primeirosSocorrosES } from './locales/es/primeiros_socorros';
import { primeirosSocorrosPTPT } from './locales/pt-PT/primeiros_socorros';
import i18n from '../i18n'; // Assuming i18n is available at root

export const getPrimeirosSocorros = () => {
    const lang = i18n.language;
    
    if (lang === 'en') return primeirosSocorrosEN;
    if (lang === 'es') return primeirosSocorrosES;
    if (lang === 'pt-PT') return primeirosSocorrosPTPT;
    
    return primeirosSocorrosPTBR; // Fallback
};

// For backward compatibility if any file still uses the static array before updating
export const primeirosSocorros = primeirosSocorrosPTBR;
