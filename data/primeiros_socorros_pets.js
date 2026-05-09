import { emergenciasPetsPTBR } from './locales/pt-BR/primeiros_socorros_pets';
import { emergenciasPetsEN } from './locales/en/primeiros_socorros_pets';
import { emergenciasPetsES } from './locales/es/primeiros_socorros_pets';
import { emergenciasPetsPTPT } from './locales/pt-PT/primeiros_socorros_pets';
import i18n from '../i18n'; // Assuming i18n is available at root

export const getEmergenciasPets = () => {
    const lang = i18n.language;
    
    if (lang === 'en') return emergenciasPetsEN;
    if (lang === 'es') return emergenciasPetsES;
    if (lang === 'pt-PT') return emergenciasPetsPTPT;
    
    return emergenciasPetsPTBR; // Fallback
};

// For backward compatibility if any file still uses the static array before updating
export const EMERGENCIAS_PETS = emergenciasPetsPTBR;
