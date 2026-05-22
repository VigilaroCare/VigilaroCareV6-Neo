// services/BriefingDraftService.js
//
// Persiste o progresso parcial do wizard de onboarding em AsyncStorage.
// Permite o usuário tocar em "Continuar depois" em qualquer passo e
// retomar exatamente onde parou — alinhado ao princípio de "briefing
// vivo" (a casa muda, as pessoas mudam, mapas não se preenchem de uma vez).
//
// USO:
//   import BriefingDraftService from '../services/BriefingDraftService';
//   await BriefingDraftService.save({ phase: 1, houseType: 'casa', floors: 2 });
//   const draft = await BriefingDraftService.load(); // null se não houver
//   await BriefingDraftService.clear(); // chamar quando o wizard finalizar

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@vigilaro/briefing_draft';

const BriefingDraftService = {
  /**
   * Salva o estado parcial do wizard.
   *
   * @param {Object} draft - { phase, houseType, floors, externalAreas, internalRooms, ... }
   * @returns {Promise<boolean>}
   */
  async save(draft) {
    if (!draft || typeof draft !== 'object') return false;
    try {
      const payload = {
        ...draft,
        savedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      if (__DEV__) {
        console.log('[BriefingDraftService] draft salvo:', { phase: payload.phase, keys: Object.keys(payload) });
      }
      return true;
    } catch (error) {
      if (__DEV__) console.warn('[BriefingDraftService.save] erro:', error?.message);
      return false;
    }
  },

  /**
   * Carrega o draft salvo. Retorna null se não houver.
   *
   * @returns {Promise<Object|null>}
   */
  async load() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (__DEV__ && parsed) {
        console.log('[BriefingDraftService] draft carregado:', { phase: parsed.phase, savedAt: parsed.savedAt });
      }
      return parsed;
    } catch (error) {
      if (__DEV__) console.warn('[BriefingDraftService.load] erro:', error?.message);
      return null;
    }
  },

  /**
   * Verifica se existe draft (sem carregar payload completo).
   *
   * @returns {Promise<boolean>}
   */
  async hasDraft() {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return !!raw;
    } catch {
      return false;
    }
  },

  /**
   * Limpa o draft — chamar quando o wizard for finalizado com sucesso.
   *
   * @returns {Promise<boolean>}
   */
  async clear() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      if (__DEV__) console.log('[BriefingDraftService] draft limpo.');
      return true;
    } catch (error) {
      if (__DEV__) console.warn('[BriefingDraftService.clear] erro:', error?.message);
      return false;
    }
  },
};

export default BriefingDraftService;
