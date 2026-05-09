/**
 * AchievementService.js (Fase 3 - F-07)
 * Gerencia XP, Níveis e o disparo de Conquistas Visuais.
 * 
 * Este serviço centraliza a lógica gamificada do Vigilaro Care V6 Neo.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const ACHIEVEMENTS_KEY = '@vigilaro_achievements';
const XP_KEY = '@vigilaro_xp';

class AchievementService {
    constructor() {
        this.onShowToast = null;
        this.levels = [
            { minXp: 0, name: 'Vizinho Atento' },
            { minXp: 100, name: 'Protetor Iniciante' },
            { minXp: 300, name: 'Guardião da Família' },
            { minXp: 600, name: 'Mestre da Segurança' },
            { minXp: 1000, name: 'Sentinela Imbatível' }
        ];
    }

    /**
     * Registra o listener do App.js para exibir o componente AchievementToast
     */
    setToastCallback(callback) {
        this.onShowToast = callback;
    }

    async getXp() {
        const val = await AsyncStorage.getItem(XP_KEY);
        return val ? parseInt(val, 10) : 0;
    }

    /**
     * Adiciona XP e verifica se houve Level Up
     */
    async addXp(amount, label) {
        try {
            const currentXp = await this.getXp();
            const newXp = currentXp + amount;
            await AsyncStorage.setItem(XP_KEY, newXp.toString());

            const oldLevel = this.getLevel(currentXp);
            const newLevel = this.getLevel(newXp);

            if (newLevel.name !== oldLevel.name) {
                // Level Up!
                if (this.onShowToast) {
                    this.onShowToast({
                        levelUp: true,
                        newLevel: newLevel,
                        actionLabel: label,
                        xpGained: amount
                    });
                }
            } else {
                // Ganho de XP Normal
                if (this.onShowToast) {
                    this.onShowToast({
                        levelUp: false,
                        xpGained: amount,
                        actionLabel: label
                    });
                }
            }
        } catch (error) {
            if (__DEV__) { console.error('[AchievementService] Erro ao adicionar XP:', error); }
        }
    }

    getLevel(xp) {
        let current = this.levels[0];
        for (const lvl of this.levels) {
            if (xp >= lvl.minXp) {
                current = lvl;
            } else {
                break;
            }
        }
        return current;
    }

    // --- Gatilhos de Conquistas ---

    async grantChecklistPoint() {
        // Cada item marcado como seguro dá 5 XP
        await this.addXp(5, 'Item de Segurança Validado');
    }

    async grantFirstInspection() {
        const key = 'achievement_first_inspection';
        if (!(await this.hasAchievement(key))) {
            await this.addXp(50, 'Primeira Vistoria Concluída!');
            await this.markAchievement(key);
        }
    }

    async grantReportExport() {
        // Exportar relatório é uma ação de alto valor
        await this.addXp(25, 'Relatório de Segurança Gerado');
    }

    async hasAchievement(key) {
        try {
            const data = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
            const achievements = data ? JSON.parse(data) : {};
            return !!achievements[key];
        } catch (e) {
            return false;
        }
    }

    async markAchievement(key) {
        try {
            const data = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
            const achievements = data ? JSON.parse(data) : {};
            achievements[key] = true;
            await AsyncStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
        } catch (e) {}
    }
}

export default new AchievementService();
