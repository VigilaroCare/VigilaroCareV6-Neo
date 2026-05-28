/**
 * KitAlertService.js
 * Serviço de alertas para revisão de kits e recomendações baseadas no perfil
 * Vigilaro Care V5
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const ALERT_STORAGE_KEY = '@kit_alerts';
const REVIEW_INTERVAL_DAYS = 90; // Revisão trimestral

class KitAlertService {
    constructor() {
        this.alerts = [];
    }

    /**
     * Inicializa o serviço carregando alertas salvos
     */
    async init() {
        try {
            const saved = await AsyncStorage.getItem(ALERT_STORAGE_KEY);
            if (saved) {
                this.alerts = JSON.parse(saved);
            }
        } catch (error) {
            if (__DEV__) { console.error('Error loading alerts:', error); }
        }
    }

    /**
     * Verifica se algum kit precisa de revisão
     */
    async checkForDueReviews() {
        const kitsToCheck = [
            { key: '@kit_primeiros_socorros', name: 'Primeiros Socorros', icon: 'medkit' },
            { key: '@kit_ferramentas_state', name: 'Ferramentas', icon: 'construct' },
            { key: '@kit_epis_state', name: 'EPIs', icon: 'shield-checkmark' },
            { key: '@kit_emergencia_state', name: 'Emergência', icon: 'briefcase' },
        ];

        const dueReviews = [];
        const now = new Date();

        for (const kit of kitsToCheck) {
            try {
                const reviewKey = `${kit.key}_last_review`;
                const lastReview = await AsyncStorage.getItem(reviewKey);

                if (!lastReview) {
                    // Nunca foi revisado - alertar
                    dueReviews.push({
                        id: `review_${kit.key}`,
                        type: 'pending_review',
                        title: `Revise seu Kit de ${kit.name}`,
                        message: 'Este kit ainda não foi revisado. Verifique se todos os itens estão em ordem.',
                        icon: kit.icon,
                        kitKey: kit.key,
                        priority: 'medium',
                    });
                } else {
                    const lastDate = new Date(lastReview);
                    const daysSinceReview = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

                    if (daysSinceReview >= REVIEW_INTERVAL_DAYS) {
                        dueReviews.push({
                            id: `review_${kit.key}`,
                            type: 'due_review',
                            title: `Revisão Trimestral: ${kit.name}`,
                            message: `Fazem ${daysSinceReview} dias desde a última revisão. Hora de verificar!`,
                            icon: kit.icon,
                            kitKey: kit.key,
                            priority: 'high',
                            daysSinceReview,
                        });
                    }
                }
            } catch (error) {
                if (__DEV__) { console.error(`Error checking review for ${kit.key}:`, error); }
            }
        }

        return dueReviews;
    }

    /**
     * Marca um kit como revisado
     */
    async markAsReviewed(kitKey) {
        try {
            const reviewKey = `${kitKey}_last_review`;
            await AsyncStorage.setItem(reviewKey, new Date().toISOString());
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Error marking as reviewed:', error); }
            return false;
        }
    }

    /**
     * Verifica itens faltantes em um kit baseado no progresso
     */
    async checkMissingItems(kitKey) {
        // Map legacy keys to new Kit IDs
        const keyMap = {
            '@kit_primeiros_socorros': 'socorros',
            '@kit_socorros_state': 'socorros',
            '@kit_ferramentas_state': 'ferramentas',
            '@kit_emergencia_state': 'emergencia',
            '@kit_remedios_state': 'remedios'
        };
        const kitId = keyMap[kitKey];

        if (!kitId) return { total: 0, checked: 0, percentage: 0 };

        try {
            const ProfileService = require('./ProfileService').default;
            const KitService = require('./KitService').default;
            const { KITS_CONFIG } = require('./KitService');

            const resId = await ProfileService.getActiveResidenceId();
            const state = await KitService.loadKitState(kitId, resId);
            const config = KITS_CONFIG[kitId];

            if (!config) return { total: 0, checked: 0, percentage: 0 };

            const total = config.items.length;
            const checked = state.length; // KitService always returns array now
            const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

            return { total, checked, percentage };
        } catch (error) {
            if (__DEV__) { console.error('Error checking missing items:', error); }
            return { total: 0, checked: 0, percentage: 0 };
        }
    }

    /**
     * Gera recomendações de kits baseadas no perfil do usuário
     */
    async getProfileBasedRecommendations() {
        try {
            const perfilData = await AsyncStorage.getItem('@perfil_principal');
            if (!perfilData) return [];

            const perfil = JSON.parse(perfilData);
            const recommendations = [];

            // Verificar características da moradia
            const caract = perfil.ambiente?.caracteristicas || [];
            const equip = perfil.ambiente?.equipamentos || [];

            // Tem piscina mas não tem kit de primeiros socorros completo?
            if (caract.includes('piscina')) {
                const psProgress = await this.checkMissingItems('@kit_primeiros_socorros');
                if (psProgress.percentage < 80) {
                    recommendations.push({
                        id: 'rec_piscina_ps',
                        type: 'recommendation',
                        title: 'Kit Primeiros Socorros Essencial',
                        message: 'Você tem piscina em casa. Complete seu kit de primeiros socorros para emergências.',
                        icon: 'water',
                        route: 'KitPrimeirosSocorros',
                        priority: 'high',
                    });
                }
            }

            // Tem jardim mas não tem EPIs?
            if (caract.includes('jardim')) {
                const episProgress = await this.checkMissingItems('@kit_epis_state');
                if (episProgress.percentage < 50) {
                    recommendations.push({
                        id: 'rec_jardim_epis',
                        type: 'recommendation',
                        title: 'EPIs para Jardinagem',
                        message: 'Proteja-se durante a jardinagem com os EPIs adequados.',
                        icon: 'leaf',
                        route: 'EpiDomestico', // FIX: rota era 'KitEPIs' (inexistente em App.js)
                        priority: 'medium',
                    });
                }
            }

            // Tem escadas?
            if (caract.includes('escadas')) {
                // Verificar se tem idoso ou bebê cadastrado
                const moradores = perfil.moradores || [];
                const temVulneravel = moradores.some(m =>
                    (m.idade && (m.idade < 5 || m.idade > 60)) ||
                    m.faixaEtaria?.includes('Bebê') ||
                    m.faixaEtaria?.includes('Idoso')
                );

                if (temVulneravel) {
                    recommendations.push({
                        id: 'rec_escadas_seguranca',
                        type: 'safety_alert',
                        title: 'Atenção: Escadas + Moradores Vulneráveis',
                        message: 'Verifique se suas escadas têm corrimão e proteções adequadas.',
                        icon: 'trending-up',
                        route: 'RiscosFisicos',
                        priority: 'high',
                    });
                }
            }

            // Não tem extintor?
            if (!equip.includes('extintor')) {
                recommendations.push({
                    id: 'rec_extintor',
                    type: 'recommendation',
                    title: 'Considere ter um Extintor',
                    message: 'Um extintor de incêndio pode salvar vidas. Veja nosso guia de prevenção.',
                    icon: 'flame',
                    route: 'PlanoIncendio',
                    priority: 'medium',
                });
            }

            // Não tem detector de fumaça?
            if (!equip.includes('detector_fumaca')) {
                recommendations.push({
                    id: 'rec_detector',
                    type: 'recommendation',
                    title: 'Detector de Fumaça',
                    message: 'Detectores de fumaça alertam sobre incêndios enquanto você dorme.',
                    icon: 'alert-circle',
                    route: 'PlanoIncendio',
                    priority: 'low',
                });
            }

            return recommendations;
        } catch (error) {
            if (__DEV__) { console.error('Error getting recommendations:', error); }
            return [];
        }
    }

    /**
     * Retorna todos os alertas ativos (revisões pendentes + recomendações)
     */
    async getActiveAlerts() {
        const dueReviews = await this.checkForDueReviews();
        const recommendations = await this.getProfileBasedRecommendations();

        // Combinar e ordenar por prioridade
        const allAlerts = [...dueReviews, ...recommendations];

        const priorityOrder = { high: 0, medium: 1, low: 2 };
        allAlerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        return allAlerts;
    }

    /**
     * Retorna contagem de alertas para badge na Home
     */
    async getAlertCount() {
        const alerts = await this.getActiveAlerts();
        return alerts.filter(a => a.priority === 'high' || a.priority === 'medium').length;
    }

    /**
     * Descarta um alerta específico
     */
    async dismissAlert(alertId) {
        try {
            const dismissedKey = '@dismissed_alerts';
            const existing = await AsyncStorage.getItem(dismissedKey);
            const dismissed = existing ? JSON.parse(existing) : [];

            if (!dismissed.includes(alertId)) {
                dismissed.push(alertId);
                await AsyncStorage.setItem(dismissedKey, JSON.stringify(dismissed));
            }
            return true;
        } catch (error) {
            if (__DEV__) { console.error('Error dismissing alert:', error); }
            return false;
        }
    }
}

export default new KitAlertService();
