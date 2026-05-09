/**
 * getLocalizedLogo.js
 * 
 * Retorna a variante correta da logo VigilaroCare
 * baseada no idioma ativo do i18n.
 * 
 * Subtítulos por idioma:
 *   pt-BR / pt-PT → "Prevenção Inteligente"
 *   en             → "Smart Prevention"
 *   es             → "Prevención Inteligente"
 */
import i18n from '../i18n';

// Os requires devem ser estáticos para o Metro bundler
const logos = {
  pt: require('../assets/logo_vigilaro.png'),
  en: require('../assets/logo_vigilaro_en.png'),
  es: require('../assets/logo_vigilaro_es.png'),
};

/**
 * Retorna o asset da logo localizada.
 * Usa o prefixo do idioma (pt, en, es) para selecionar.
 * Fallback: logo em português.
 */
export const getLocalizedLogo = () => {
  const lang = i18n.language?.split('-')[0] || 'pt';
  return logos[lang] || logos.pt;
};

export default getLocalizedLogo;
