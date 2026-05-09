import AsyncStorage from '@react-native-async-storage/async-storage';

const KitService = {
    /**
     * Carrega o estado dos itens marcados de um kit específico para uma residência.
     * @param {string} kitId - ID do kit (ex: 'remedios', 'socorros')
     * @param {string} residenceId - ID da residência do perfil ativo
     * @returns {Promise<Array<string>>} Array de IDs dos itens marcados
     */
    async loadKitState(kitId, residenceId) {
        try {
            // Se residenceId for null, usa 'default' ou user global, mas ideal é validar
            const scope = residenceId || 'global';
            const key = `@kit_state_${scope}_${kitId}`;
            const stored = await AsyncStorage.getItem(key);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            if (__DEV__) { console.error(`Failed to load kit state for ${kitId}:`, error); }
            return [];
        }
    },

    /**
     * Salva o estado dos itens marcados.
     * @param {string} kitId 
     * @param {string} residenceId 
     * @param {Array<string>} items - Array de IDs marcados
     */
    async saveKitState(kitId, residenceId, items) {
        try {
            const scope = residenceId || 'global';
            const key = `@kit_state_${scope}_${kitId}`;
            await AsyncStorage.setItem(key, JSON.stringify(items));
            return true;
        } catch (error) {
            if (__DEV__) { console.error(`Failed to save kit state for ${kitId}:`, error); }
            return false;
        }
    },

    /**
     * Limpa o estado de um kit.
     */
    async clearKitState(kitId, residenceId) {
        try {
            const scope = residenceId || 'global';
            const key = `@kit_state_${scope}_${kitId}`;
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            if (__DEV__) { console.error(error); }
            return false;
        }
    },

    /**
     * Calcula o progresso global dos kits (opcional/stub).
     * Como não temos a definição total dos kits aqui, retornamos 0 por enquanto
     * ou implementamos a lógica se tivermos os dados brutos.
     */
    async getGlobalKitsProgress(residenceId) {
        // Implementação Stub para evitar crash
        // TODO: Implementar lógica real importando os dados dos kits
        return 0; // 0% de progresso
    }
};

export default KitService;
