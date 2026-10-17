import { firePreventionContentPTBR } from './locales/pt-BR/fire_prevention_content';
import { firePreventionContentEN } from './locales/en/fire_prevention_content';
import { firePreventionContentES } from './locales/es/fire_prevention_content';
import { firePreventionContentPTPT } from './locales/pt-PT/fire_prevention_content';
import i18n from '../i18n'; // Assuming i18n is available at root
import { resolveEmergencyTokensDeep } from '../utils/emergencyTokens';

const conteudoDoIdioma = () => {
    const lang = i18n.language;

    if (lang === 'en') return firePreventionContentEN;
    if (lang === 'es') return firePreventionContentES;
    if (lang === 'pt-PT') return firePreventionContentPTPT;

    return firePreventionContentPTBR; // Fallback
};

// Tokens resolvidos AQUI, pelo pais do usuario: classes de incendio (D16) e
// numeros de emergencia mudam com o pais, e o Plano de Incendio le o texto cru.
export const getFirePreventionContent = () => resolveEmergencyTokensDeep(conteudoDoIdioma());

// For backward compatibility if any file still uses the static object before updating
export const FIRE_PREVENTION_CONTENT = firePreventionContentPTBR;
