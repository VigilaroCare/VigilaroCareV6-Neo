import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@vigilaro_safety_logs';

/**
 * Serviço para registrar e recuperar eventos significativos de segurança e vida.
 * Usado pelo LifeEventsGrid.
 */
const SafetyLogService = {
    /**
     * Registra um novo evento.
     * @param {Object} event - Objeto do evento
     * @param {string} event.type - Tipo (ex: 'check', 'alert', 'milestone', 'risk')
     * @param {string} event.category - Categoria do risco (ex: 'falls', 'fire')
     * @param {string} event.title - Título curto
     * @param {string} event.description - Detalhes
     * @param {Date} event.date - Data do evento (opcional, default now)
     */
    async logEvent(event) {
        try {
            const logs = await this.getLogs();

            const newEvent = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                date: event.date ? new Date(event.date).toISOString() : new Date().toISOString(),
                ...event
            };

            // Adiciona no topo e limita a 100 eventos
            const updatedLogs = [newEvent, ...logs].slice(0, 100);

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
            return newEvent;
        } catch (error) {
            if (__DEV__) { console.error('Failed to log safety event:', error); }
            return null;
        }
    },

    /**
     * Recupera o histórico de eventos.
     * @param {number} limit - Limite de itens (opcional)
     */
    async getLogs(limit = 20) {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            const logs = json ? JSON.parse(json) : [];
            return logs.slice(0, limit);
        } catch (error) {
            if (__DEV__) { console.error('Failed to get safety logs:', error); }
            return [];
        }
    },

    /**
     * Limpa todos os logs.
     */
    async clearLogs() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            if (__DEV__) { console.error('Failed to clear logs:', error); }
        }
    }
};

export default SafetyLogService;
