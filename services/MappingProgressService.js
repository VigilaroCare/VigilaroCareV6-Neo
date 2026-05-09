/**
 * MappingProgressService.js
 * Serviço para gerenciar progresso do mapeamento doméstico
 * Persiste etapas concluídas e pendentes
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const MAPPING_PROGRESS_KEY = '@mapping_progress';
const MAPPING_STARTED_KEY = '@mapping_started';
const MAPPING_COMPLETED_KEY = '@mapping_completed';

// Etapas do mapeamento guiado
export const MAPPING_STEPS = [
    {
        id: 'perfil',
        ordem: 1,
        titulo: 'Seu Perfil',
        descricao: 'Informações pessoais e de saúde',
        icon: 'person',
        route: 'PerfilWizard',
        required: true,
    },
    {
        id: 'moradores',
        ordem: 2,
        titulo: 'Moradores',
        descricao: 'Quem mora com você (pessoas, pets)',
        icon: 'people',
        route: 'AddPerfil',
        required: false,
    },
    {
        id: 'tipo_moradia',
        ordem: 3,
        titulo: 'Tipo de Moradia',
        descricao: 'Casa, apartamento, características',
        icon: 'home',
        route: 'HomeMapping',
        required: true,
    },
    {
        id: 'ambientes',
        ordem: 4,
        titulo: 'Ambientes',
        descricao: 'Cômodos e áreas da sua casa',
        icon: 'apps',
        route: 'MapeamentoRiscos',
        required: true,
    },
    {
        id: 'equipamentos',
        ordem: 5,
        titulo: 'Equipamentos de Segurança',
        descricao: 'Extintores, detectores, alarmes',
        icon: 'shield-checkmark',
        route: 'DispositivosSeguranca',
        required: false,
    },
    {
        id: 'kits',
        ordem: 6,
        titulo: 'Kits de Emergência',
        descricao: 'Primeiros socorros, ferramentas',
        icon: 'medkit',
        route: 'KitsHub',
        required: false,
    },
];

class MappingProgressService {
    /**
     * Inicia o mapeamento (marca como iniciado)
     */
    async startMapping() {
        try {
            await AsyncStorage.setItem(MAPPING_STARTED_KEY, new Date().toISOString());
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Error starting mapping:', error); }
            return false;
        }
    }

    /**
     * Verifica se o mapeamento foi iniciado
     */
    async hasStartedMapping() {
        try {
            const started = await AsyncStorage.getItem(MAPPING_STARTED_KEY);
            return !!started;
        } catch (error) {
            return false;
        }
    }

    /**
     * Verifica se o mapeamento foi completado
     */
    async isCompleted() {
        try {
            const completed = await AsyncStorage.getItem(MAPPING_COMPLETED_KEY);
            return !!completed;
        } catch (error) {
            return false;
        }
    }

    /**
     * Retorna as etapas concluídas
     */
    async getCompletedSteps() {
        try {
            const progress = await AsyncStorage.getItem(MAPPING_PROGRESS_KEY);
            if (progress) {
                return JSON.parse(progress);
            }
            return [];
        } catch (error) {
            if (__DEV__) { console.error('Error getting progress:', error); }
            return [];
        }
    }

    /**
     * Marca uma etapa como concluída
     */
    async completeStep(stepId) {
        try {
            const completed = await this.getCompletedSteps();
            if (!completed.includes(stepId)) {
                completed.push(stepId);
                await AsyncStorage.setItem(MAPPING_PROGRESS_KEY, JSON.stringify(completed));
            }

            // Verifica se todas as etapas obrigatórias foram concluídas
            const requiredSteps = MAPPING_STEPS.filter(s => s.required).map(s => s.id);
            const allRequiredDone = requiredSteps.every(id => completed.includes(id));

            if (allRequiredDone) {
                await AsyncStorage.setItem(MAPPING_COMPLETED_KEY, new Date().toISOString());
            }

            return true;
        } catch (error) {
            if (__DEV__) { console.error('Error completing step:', error); }
            return false;
        }
    }

    /**
     * Retorna a próxima etapa pendente
     */
    async getNextPendingStep() {
        try {
            const completed = await this.getCompletedSteps();
            const pendingStep = MAPPING_STEPS.find(step => !completed.includes(step.id));
            return pendingStep || null;
        } catch (error) {
            return MAPPING_STEPS[0];
        }
    }

    /**
     * Retorna todas as etapas pendentes
     */
    async getPendingSteps() {
        try {
            const completed = await this.getCompletedSteps();
            return MAPPING_STEPS.filter(step => !completed.includes(step.id));
        } catch (error) {
            return MAPPING_STEPS;
        }
    }

    /**
     * Retorna o progresso como porcentagem
     */
    async getProgressPercentage() {
        try {
            const completed = await this.getCompletedSteps();
            return Math.round((completed.length / MAPPING_STEPS.length) * 100);
        } catch (error) {
            return 0;
        }
    }

    /**
     * Retorna o status completo do mapeamento
     */
    async getFullStatus() {
        const [completed, hasStarted, isComplete, percentage] = await Promise.all([
            this.getCompletedSteps(),
            this.hasStartedMapping(),
            this.isCompleted(),
            this.getProgressPercentage(),
        ]);

        const nextStep = await this.getNextPendingStep();

        return {
            hasStarted,
            isComplete,
            completedSteps: completed,
            completedCount: completed.length,
            totalSteps: MAPPING_STEPS.length,
            percentage,
            nextStep,
            steps: MAPPING_STEPS.map(step => ({
                ...step,
                completed: completed.includes(step.id),
            })),
        };
    }

    /**
     * Reseta todo o progresso (para testes)
     */
    async resetProgress() {
        try {
            await AsyncStorage.multiRemove([
                MAPPING_PROGRESS_KEY,
                MAPPING_STARTED_KEY,
                MAPPING_COMPLETED_KEY,
            ]);
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Error resetting progress:', error); }
            return false;
        }
    }
}

export default new MappingProgressService();
