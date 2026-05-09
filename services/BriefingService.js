import AsyncStorage from '@react-native-async-storage/async-storage';

const BRIEFING_KEY = '@briefing_data';

export const BriefingService = {
    // Salvar o perfil da casa
    saveBriefing: async (briefingData) => {
        try {
            const jsonValue = JSON.stringify(briefingData);
            await AsyncStorage.setItem(BRIEFING_KEY, jsonValue);
            return true;
        } catch (e) {
            if (__DEV__) { console.error("Erro ao salvar briefing:", e); }
            return false;
        }
    },

    // Carregar o perfil da casa
    getBriefing: async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(BRIEFING_KEY);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            if (__DEV__) { console.error("Erro ao carregar briefing:", e); }
            return null;
        }
    },

    // Limpar briefing (para testes ou reset)
    clearBriefing: async () => {
        try {
            await AsyncStorage.removeItem(BRIEFING_KEY);
            return true;
        } catch (e) {
            if (__DEV__) { console.error("Erro ao limpar briefing:", e); }
            return false;
        }
    }
};
