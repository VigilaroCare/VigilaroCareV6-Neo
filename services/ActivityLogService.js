// services/ActivityLogService.js
// Storage, nao AsyncStorage: o log guarda nome de pessoa ligado a queda,
// check-in sem resposta e acionamento de SOS. E dado de saude com identidade,
// entao vai para a camada cifrada como o resto do cadastro.
import { Storage } from '../utils/SecureStorage';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ACTIVITY_LOG_KEY = '@vigilaro_activity_log';
const MAX_ACTIVITIES = 100; // Manter um número razoável de atividades para não sobrecarregar o storage

class ActivityLogService {
    constructor() {
        this.listeners = [];
    }

    // Adiciona um listener para quando uma nova atividade é logada
    onActivityLogged(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    // Notifica todos os listeners
    _notifyListeners() {
        this.listeners.forEach(callback => callback());
    }

    /**
     * Registra uma nova atividade no log.
     * @param {string} title - Título breve da atividade (ex: "Login Realizado").
     * @param {string} description - Descrição detalhada (ex: "Usuário 'João' acessou o aplicativo.").
     * @param {string} [icon='Activity'] - Nome do ícone (ex: 'Login', 'Warning', 'Checklist').
     * @param {string} [color='#6366F1'] - Cor do ícone (ex: '#4CAF50' para sucesso, '#EF4444' para erro).
     * @param {string} [category] - Categoria opcional para filtros downstream (ex: 'fall', 'vital', 'manual').
     *                              Telas como Atividade Recente podem usar pra mostrar CTAs contextuais.
     */
    async logActivity(title, description, icon = 'Activity', color = '#6366F1', category = null) {
        try {
            const newActivity = {
                id: Date.now().toString(),
                title,
                description,
                icon,
                color,
                category,
                timestamp: new Date().toISOString(),
            };

            const existingLogJson = await Storage.getItem(ACTIVITY_LOG_KEY);
            let activityLog = existingLogJson ? JSON.parse(existingLogJson) : [];

            activityLog.unshift(newActivity); // Adiciona a atividade mais recente no início

            // Limita o tamanho do log
            if (activityLog.length > MAX_ACTIVITIES) {
                activityLog = activityLog.slice(0, MAX_ACTIVITIES);
            }

            await Storage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(activityLog));
            this._notifyListeners(); // Notifica que uma nova atividade foi logada
        } catch (error) {
            if (__DEV__) { console.error('Erro ao registrar atividade:', error); }
        }
    }

    /**
     * Retorna todas as atividades registradas.
     * @returns {Promise<Array>} Lista de atividades.
     */
    async getActivities() {
        try {
            const existingLogJson = await Storage.getItem(ACTIVITY_LOG_KEY);
            return existingLogJson ? JSON.parse(existingLogJson) : [];
        } catch (error) {
            if (__DEV__) { console.error('Erro ao obter atividades:', error); }
            return [];
        }
    }

    /**
     * Limpa todo o log de atividades.
     */
    async clearActivities() {
        try {
            await Storage.removeItem(ACTIVITY_LOG_KEY);
            this._notifyListeners();
        } catch (error) {
            if (__DEV__) { console.error('Erro ao limpar atividades:', error); }
        }
    }

    /**
     * Formata um timestamp para "há X tempo".
     * @param {string} isoString - Timestamp no formato ISO (ex: "2026-03-31T10:00:00.000Z").
     * @returns {string} String formatada (ex: "há 5 minutos").
     */
    getTimeAgo(isoString) {
        try {
            const date = parseISO(isoString);
            return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
        } catch (error) {
            if (__DEV__) { console.error('Erro ao formatar data:', error); }
            return 'Data inválida';
        }
    }
}

export default new ActivityLogService();