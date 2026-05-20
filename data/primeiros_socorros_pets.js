import { emergenciasPetsPTBR } from './locales/pt-BR/primeiros_socorros_pets';
import { emergenciasPetsEN } from './locales/en/primeiros_socorros_pets';
import { emergenciasPetsES } from './locales/es/primeiros_socorros_pets';
import { emergenciasPetsPTPT } from './locales/pt-PT/primeiros_socorros_pets';
import { PRIMEIROS_SOCORROS_IMAGENS } from './primeiros_socorros_imagens';
import i18n from '../i18n'; // Assuming i18n is available at root

// Merge id -> imagemUrl no array (URLs sao language-agnostic, centralizadas
// em primeiros_socorros_imagens.js para nao duplicar nos 4 locales).
const withImages = (arr) => arr.map(item => ({
    ...item,
    imagemUrl: item.imagemUrl || PRIMEIROS_SOCORROS_IMAGENS[item.id],
}));

export const getEmergenciasPets = () => {
    const lang = i18n.language;

    if (lang === 'en') return withImages(emergenciasPetsEN);
    if (lang === 'es') return withImages(emergenciasPetsES);
    if (lang === 'pt-PT') return withImages(emergenciasPetsPTPT);

    return withImages(emergenciasPetsPTBR); // Fallback
};

// For backward compatibility if any file still uses the static array before updating
export const EMERGENCIAS_PETS = withImages(emergenciasPetsPTBR);
