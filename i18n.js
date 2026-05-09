import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Translations
import ptBR from './locales/pt-BR/common.json';
import ptPT from './locales/pt-PT/common.json';
import en from './locales/en/common.json';
import es from './locales/es/common.json';

const resources = {
  'pt-BR': { common: ptBR },
  'pt-PT': { common: ptPT },
  'en': { common: en },
  'es': { common: es },
};

// Map languages from device to our supported locales
const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0]?.languageTag || 'pt-BR';
  // Example locale format: 'en-US', 'pt-BR', 'pt-PT', 'es-ES'
  
  // Exact matches first
  if (resources[locale]) {
    return locale;
  }
  
  // Fallback mappings
  if (locale.startsWith('pt')) {
    return locale === 'pt-PT' ? 'pt-PT' : 'pt-BR';
  }
  if (locale.startsWith('es')) {
    return 'es';
  }
  if (locale.startsWith('en')) {
    return 'en';
  }
  
  return 'pt-BR'; // Default fallback
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getDeviceLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: 'pt-BR',
    defaultNS: 'common',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
