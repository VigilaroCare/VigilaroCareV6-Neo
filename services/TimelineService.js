/**
 * TimelineService.js (F-05)
 * Responsável por gerenciar o histórico de melhorias da residência.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMELINE_KEY = '@vigilaro_historico';

class TimelineService {
    async logMelhoria(areaId, itemTitulo) {
        try {
            const dataStr = await AsyncStorage.getItem(TIMELINE_KEY);
            let history = dataStr ? JSON.parse(dataStr) : [];
            
            // Evita logs duplicados da mesma melhoria no mesmo dia
            const today = new Date().toISOString().split('T')[0];
            const isDupe = history.some(h => h.areaId === areaId && h.titulo === itemTitulo && h.data.startsWith(today));
            if (isDupe) return;

            history.unshift({
                id: Date.now().toString(),
                areaId: areaId || 'geral',
                titulo: itemTitulo,
                data: new Date().toISOString(),
                tipo: 'melhoria' // Permitiria tipos futuros como 'alerta', etc.
            });

            // Mantém os 100 últimos registros
            if (history.length > 100) history = history.slice(0, 100);

            await AsyncStorage.setItem(TIMELINE_KEY, JSON.stringify(history));
        } catch (error) {
            if (__DEV__) { console.error('[TimelineService] Erro ao registrar histórico:', error); }
        }
    }

    async getHistory() {
        try {
            const data = await AsyncStorage.getItem(TIMELINE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            if (__DEV__) { console.error('[TimelineService] Erro ao buscar histórico:', error); }
            return [];
        }
    }
}

export default new TimelineService();
