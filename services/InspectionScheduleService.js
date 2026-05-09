import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@inspection_schedules';

/**
 * Gerencia o agendamento de vistorias recorrentes.
 * Cada ambiente pode ter uma frequência configurada (semanal, quinzenal, mensal).
 */
class InspectionScheduleService {

    /**
     * Define ou atualiza o agendamento de um ambiente.
     * @param {string} areaId ID do ambiente (ex: 'cozinha', 'banheiro')
     * @param {string} areaName Nome legível do ambiente
     * @param {string} frequencia 'semanal' | 'quinzenal' | 'mensal'
     */
    async setSchedule(areaId, areaName, frequencia) {
        try {
            const schedules = await this.getSchedules();
            const now = new Date();
            const proximaVistoria = this._calcNextDate(now, frequencia);

            schedules[areaId] = {
                areaId,
                areaName,
                frequencia,
                ultimaVistoria: now.toISOString(),
                proximaVistoria: proximaVistoria.toISOString(),
                createdAt: schedules[areaId]?.createdAt || now.toISOString(),
            };

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
            return schedules[areaId];
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar agendamento:', error); }
            return null;
        }
    }

    /**
     * Marca uma vistoria como concluída e recalcula a próxima data.
     * @param {string} areaId ID do ambiente
     */
    async markCompleted(areaId) {
        try {
            const schedules = await this.getSchedules();
            if (!schedules[areaId]) return null;

            const schedule = schedules[areaId];
            const now = new Date();
            schedule.ultimaVistoria = now.toISOString();
            schedule.proximaVistoria = this._calcNextDate(now, schedule.frequencia).toISOString();

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
            return schedule;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao marcar vistoria:', error); }
            return null;
        }
    }

    /**
     * Retorna todos os agendamentos.
     * @returns {object} { areaId: { areaId, areaName, frequencia, ultimaVistoria, proximaVistoria } }
     */
    async getSchedules() {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            const parsed = data ? JSON.parse(data) : null;
            return parsed || {}; // Blinda contra JSON.parse("null") -> null
        } catch (error) {
            if (__DEV__) { console.error('Erro ao carregar agendamentos:', error); }
            return {};
        }
    }

    /**
     * Retorna vistorias pendentes (vencidas ou que vencem em 2 dias).
     * @returns {Array} Lista de agendamentos pendentes
     */
    async getPendingInspections() {
        try {
            const schedules = await this.getSchedules();
            const now = new Date();
            const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
            const pending = [];

            Object.values(schedules).forEach(schedule => {
                const proxima = new Date(schedule.proximaVistoria);
                if (proxima <= twoDaysFromNow) {
                    const isOverdue = proxima <= now;
                    pending.push({
                        ...schedule,
                        isOverdue,
                        status: isOverdue ? 'overdue' : 'upcoming',
                        daysUntil: Math.ceil((proxima - now) / (1000 * 60 * 60 * 24)),
                    });
                }
            });

            // Ordenar: vencidas primeiro, depois as próximas
            return pending.sort((a, b) => new Date(a.proximaVistoria) - new Date(b.proximaVistoria));
        } catch (error) {
            if (__DEV__) { console.error('Erro ao buscar vistorias pendentes:', error); }
            return [];
        }
    }

    /**
     * Remove o agendamento de um ambiente.
     * @param {string} areaId ID do ambiente
     */
    async removeSchedule(areaId) {
        try {
            const schedules = await this.getSchedules();
            delete schedules[areaId];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
        } catch (error) {
            if (__DEV__) { console.error('Erro ao remover agendamento:', error); }
        }
    }

    /**
     * Retorna labels amigáveis de frequência.
     */
    getFrequencyOptions() {
        return [
            { id: 'semanal', label: 'Semanal', days: 7, icon: '📅' },
            { id: 'quinzenal', label: 'Quinzenal', days: 15, icon: '📆' },
            { id: 'mensal', label: 'Mensal', days: 30, icon: '🗓️' },
        ];
    }

    /**
     * Calcula a próxima data com base na frequência.
     * @private
     */
    _calcNextDate(fromDate, frequencia) {
        const next = new Date(fromDate);
        switch (frequencia) {
            case 'semanal':
                next.setDate(next.getDate() + 7);
                break;
            case 'quinzenal':
                next.setDate(next.getDate() + 15);
                break;
            case 'mensal':
            default:
                next.setMonth(next.getMonth() + 1);
                break;
        }
        return next;
    }

    /**
     * Formata data para exibição.
     * @param {string} isoString Data ISO
     * @returns {string} Data formatada (ex: "15 Mar")
     */
    formatDate(isoString) {
        if (!isoString) return '---';
        const date = new Date(isoString);
        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }
}

export default new InspectionScheduleService();
