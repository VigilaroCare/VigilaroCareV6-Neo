/**
 * UsageLimitsService.js
 * Gerenciamento de Limites de Uso
 * Vigilaro Care V5 - Modelo "Proteção para Todos"
 * 
 * FILOSOFIA:
 * O FREE já salva vidas. O Premium é para experiência superior.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import SubscriptionService from './SubscriptionService';

const USAGE_KEY = '@usage_limits';

// Limites GENEROSOS para FREE (segurança é um direito!)
const FREE_LIMITS = {
    scannerIA: 10,           // 10 análises de foto por mês
    voiceAssistant: 20,      // 20 interações de voz por mês
    realtimeVoice: 0,        // Somente Premium
    familyProfiles: 5,       // 5 perfis familiares
};

// Premium: tudo ilimitado (exceto realtime que tem limite de minutos)
const PREMIUM_LIMITS = {
    scannerIA: -1,           // Ilimitado
    voiceAssistant: -1,      // Ilimitado
    realtimeVoice: 15,       // 15 minutos/mês (contado em RealtimeVoiceService)
    familyProfiles: -1,      // Ilimitado
};

const FAMILIA_LIMITS = {
    scannerIA: -1,
    voiceAssistant: -1,
    realtimeVoice: 60,       // 60 minutos/mês
    familyProfiles: -1,
};

class UsageLimitsService {
    constructor() {
        this.usageData = null;
        this.listeners = [];
    }

    /**
     * Inicializar/carregar dados de uso
     */
    async initialize() {
        try {
            const stored = await AsyncStorage.getItem(USAGE_KEY);
            if (stored) {
                this.usageData = JSON.parse(stored);

                // Verificar se precisa resetar (novo mês)
                const now = new Date();
                const storedDate = new Date(this.usageData.monthStart);

                if (now.getMonth() !== storedDate.getMonth() ||
                    now.getFullYear() !== storedDate.getFullYear()) {
                    await this.resetMonthlyUsage();
                }
            } else {
                await this.resetMonthlyUsage();
            }
        } catch (e) {
            if (__DEV__) { console.error('Erro ao inicializar UsageLimits:', e); }
            await this.resetMonthlyUsage();
        }
    }

    /**
     * Resetar contadores mensais
     */
    async resetMonthlyUsage() {
        this.usageData = {
            monthStart: new Date().toISOString(),
            scannerIA: 0,
            voiceAssistant: 0,
            realtimeVoice: 0,
        };
        await this.save();
    }

    /**
     * Salvar dados
     */
    async save() {
        try {
            await AsyncStorage.setItem(USAGE_KEY, JSON.stringify(this.usageData));
        } catch (e) {
            if (__DEV__) { console.error('Erro ao salvar uso:', e); }
        }
    }

    /**
     * Obter limites baseado no tier do usuário
     */
    async getLimits() {
        const status = await SubscriptionService.refreshCustomerInfo();

        if (status?.isFamilia) return FAMILIA_LIMITS;
        if (status?.isPremium) return PREMIUM_LIMITS;
        return FREE_LIMITS;
    }

    /**
     * Verificar se pode usar um recurso
     */
    async canUse(feature) {
        if (!this.usageData) await this.initialize();

        const limits = await this.getLimits();
        const limit = limits[feature];

        // -1 = ilimitado
        if (limit === -1) return { allowed: true, remaining: -1 };

        // 0 = não disponível no tier
        if (limit === 0) return { allowed: false, remaining: 0, upgrade: true };

        const used = this.usageData[feature] || 0;
        const remaining = limit - used;

        return {
            allowed: remaining > 0,
            remaining: Math.max(0, remaining),
            used,
            limit,
        };
    }

    /**
     * Registrar uso de um recurso
     */
    async recordUsage(feature, amount = 1) {
        if (!this.usageData) await this.initialize();

        const canUseResult = await this.canUse(feature);

        if (!canUseResult.allowed) {
            return { success: false, ...canUseResult };
        }

        this.usageData[feature] = (this.usageData[feature] || 0) + amount;
        await this.save();

        this.notifyListeners();

        return {
            success: true,
            remaining: canUseResult.remaining - amount,
        };
    }

    /**
     * Obter resumo de uso atual
     */
    async getUsageSummary() {
        if (!this.usageData) await this.initialize();

        const limits = await this.getLimits();
        const isPremium = await SubscriptionService.isPremium();

        const summary = {};

        for (const feature of Object.keys(FREE_LIMITS)) {
            const limit = limits[feature];
            const used = this.usageData[feature] || 0;

            summary[feature] = {
                used,
                limit: limit === -1 ? 'Ilimitado' : limit,
                remaining: limit === -1 ? 'Ilimitado' : Math.max(0, limit - used),
                percentUsed: limit === -1 ? 0 : (used / limit) * 100,
            };
        }

        return {
            tier: isPremium ? 'premium' : 'free',
            monthStart: this.usageData.monthStart,
            features: summary,
        };
    }

    /**
     * Verificar quantos dias até reset
     */
    getDaysUntilReset() {
        if (!this.usageData) return 30;

        const monthStart = new Date(this.usageData.monthStart);
        const nextMonth = new Date(monthStart);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        const now = new Date();
        const diff = nextMonth - now;

        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    /**
     * Listeners para UI updates
     */
    addListener(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    notifyListeners() {
        this.getUsageSummary().then(summary => {
            this.listeners.forEach(callback => callback(summary));
        });
    }

    /**
     * Mensagem amigável de limite
     */
    getLimitMessage(feature) {
        const messages = {
            scannerIA: {
                title: 'Scanner IA',
                message: 'Você usou todas as análises de foto do mês. Renova em {days} dias ou seja Premium para análises ilimitadas!',
            },
            voiceAssistant: {
                title: 'Assistente de Voz',
                message: 'Você atingiu o limite de conversas do mês. Renova em {days} dias ou seja Premium!',
            },
            realtimeVoice: {
                title: 'Voz em Tempo Real',
                message: 'Este recurso está disponível apenas para assinantes Premium.',
            },
        };

        const template = messages[feature] || { title: 'Limite', message: 'Limite atingido.' };
        const days = this.getDaysUntilReset();

        return {
            ...template,
            message: template.message.replace('{days}', days),
            daysUntilReset: days,
        };
    }
}

export default new UsageLimitsService();
