// metro.config.js
// Configuração padrão do Metro Bundler estendendo a do Expo SDK.
// Mantém o comportamento default; existe principalmente pra silenciar
// o warning do expo doctor ("metro config does not extend expo/metro-config")
// e oferecer um ponto de extensão futuro caso precisemos customizar.
//
// Docs: https://docs.expo.dev/guides/customizing-metro/

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
