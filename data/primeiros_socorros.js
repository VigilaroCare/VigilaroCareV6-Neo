import { primeirosSocorrosPTBR } from './locales/pt-BR/primeiros_socorros';
import { primeirosSocorrosEN } from './locales/en/primeiros_socorros';
import { primeirosSocorrosES } from './locales/es/primeiros_socorros';
import { primeirosSocorrosPTPT } from './locales/pt-PT/primeiros_socorros';
import { PRIMEIROS_SOCORROS_IMAGENS } from './primeiros_socorros_imagens';
import i18n from '../i18n'; // Assuming i18n is available at root

// Merge id -> imagemUrl/imagem no array (language-agnostic, centralizado em
// primeiros_socorros_imagens.js). require() retorna number; URL string -> imagemUrl.
const withImages = (arr) => arr.map(item => {
    const img = item.imagem || item.imagemUrl || PRIMEIROS_SOCORROS_IMAGENS[item.id];
    if (!img) return item;
    if (typeof img === 'number') return { ...item, imagem: img };   // require() asset
    return { ...item, imagemUrl: img };                              // URL string
});

export const getPrimeirosSocorros = () => {
    const lang = i18n.language;

    if (lang === 'en') return withImages(primeirosSocorrosEN);
    if (lang === 'es') return withImages(primeirosSocorrosES);
    if (lang === 'pt-PT') return withImages(primeirosSocorrosPTPT);

    return withImages(primeirosSocorrosPTBR); // Fallback
};

// For backward compatibility if any file still uses the static array before updating
export const primeirosSocorros = withImages(primeirosSocorrosPTBR);
