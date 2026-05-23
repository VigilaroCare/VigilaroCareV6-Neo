// services/_compat/LegacyAudioRecorder.js
//
// Shim de compatibilidade. O RealtimeVoiceService foi escrito contra a
// API antiga do expo-av (Audio.Recording). O projeto migrou pra expo-audio,
// mas a refatoração da Realtime API ainda não foi feita.
//
// Pra destravar o build em produção (Metro Bundler precisa que o módulo
// EXISTA mesmo que nunca seja executado), exportamos um stub com a forma
// esperada. Tentativas de USAR voz em tempo real falham com erro claro.
//
// PRÓXIMOS PASSOS (quando reativar feature de Realtime Voice):
// - Opção A: npm install expo-av + trocar este shim por: export { Audio } from 'expo-av';
// - Opção B: refatorar RealtimeVoiceService.js pra usar expo-audio moderno (AudioRecorder)

const NOT_IMPLEMENTED = () => {
  throw new Error(
    '[LegacyAudioRecorder] expo-av/Audio não está disponível neste build. ' +
    'Realtime Voice está desativada. Veja services/_compat/LegacyAudioRecorder.js.'
  );
};

const PERMISSION_DENIED = async () => ({ status: 'denied', granted: false, canAskAgain: false });

// Stub com a forma mínima que o Metro Bundler precisa resolver.
// Operações reais lançam erro claro em runtime.
export const Audio = {
  // Permission API
  requestPermissionsAsync: PERMISSION_DENIED,
  getPermissionsAsync: PERMISSION_DENIED,

  // Mode
  setAudioModeAsync: async () => { /* no-op */ },

  // Enums usados em código de configuração de Recording
  AndroidOutputFormat: { DEFAULT: 0, MPEG_4: 2 },
  AndroidAudioEncoder: { DEFAULT: 0, AAC: 3 },
  IOSOutputFormat: { LINEARPCM: 'lpcm', MPEG4AAC: 'aac ' },
  IOSAudioQuality: { LOW: 0, MEDIUM: 64, HIGH: 96, MAX: 127 },

  // Recording — toda criação lança erro
  Recording: {
    createAsync: NOT_IMPLEMENTED,
  },

  // Sound — toda criação lança erro
  Sound: {
    createAsync: NOT_IMPLEMENTED,
  },
};

export default { Audio };
