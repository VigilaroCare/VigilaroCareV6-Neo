/**
 * SharingService.js
 * Pilar III: Inteligência de Produto - Mecanismos de Crescimento
 * 
 * Gerencia compartilhamento de conteúdo com deep links inteligentes
 * para aquisição de novos usuários.
 * 
 * Usage:
 * import { sharingService } from '../services/SharingService';
 * await sharingService.shareContent('checklist_result', { score: 85, area: 'cozinha' });
 */

import { Share, Platform, Linking } from 'react-native';
import { analytics } from './AnalyticsService';

// ========================
// CONFIGURAÇÃO
// ========================
const CONFIG = {
    appName: 'Vigilaro Care',
    appStoreUrl: 'https://apps.apple.com/app/vigilaro-care/id0000000000',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.agnaldoaf.vigilarocare',
    websiteUrl: 'https://vigilaro.care',
    deepLinkScheme: 'vigilaro://',
    universalLinkDomain: 'https://vigilaro.care/app',
};

// ========================
// TEMPLATES DE COMPARTILHAMENTO
// ========================
const SHARE_TEMPLATES = {
    checklist_result: {
        title: '🏠 Minha Casa Mais Segura!',
        getMessage: (params) =>
            `Acabei de avaliar a segurança da minha ${params.area || 'casa'} com o Vigilaro Care e obtive ${params.score}% de segurança!\n\nBaixe o app e proteja sua família também:`,
        getDeepLink: (params) => `checklist?area=${params.area}&ref=share`,
    },

    safety_tip: {
        title: '💡 Dica de Segurança',
        getMessage: (params) =>
            `${params.emoji || '⚠️'} ${params.title}\n\n${params.content}\n\nMais dicas de segurança no Vigilaro Care:`,
        getDeepLink: (params) => `tip/${params.id}?ref=share`,
    },

    plant_alert: {
        title: '🌿 Alerta: Planta Tóxica',
        getMessage: (params) =>
            `ATENÇÃO: ${params.plantName} é tóxica!\n\n${params.symptoms}\n\nSaiba mais sobre plantas perigosas no Vigilaro Care:`,
        getDeepLink: (params) => `plant/${params.id}?ref=share`,
    },

    product_alert: {
        title: '⚠️ Alerta de Produto',
        getMessage: (params) =>
            `${params.productName} - Nível de Risco: ${params.riskLevel}\n\n${params.warning}\n\nIdentifique produtos perigosos com o Vigilaro Care:`,
        getDeepLink: (params) => `product/${params.id}?ref=share`,
    },

    achievement: {
        title: '🏆 Conquista Desbloqueada!',
        getMessage: (params) =>
            `🎉 Acabei de desbloquear "${params.achievementName}" no Vigilaro Care!\n\n${params.description}\n\nProteja sua família e ganhe conquistas:`,
        getDeepLink: (params) => `achievement/${params.id}?ref=share`,
    },

    emergency_contacts: {
        title: '🚨 Contatos de Emergência',
        getMessage: (params) =>
            `Números de Emergência:\n\n🚑 SAMU: 192\n🚒 Bombeiros: 193\n🚔 Polícia: 190\n☎️ CIATOX: 0800 722 6001\n\nTenha esses números sempre à mão com o Vigilaro Care:`,
        getDeepLink: () => `emergency?ref=share`,
    },

    app_invite: {
        title: '🛡️ Vigilaro Care - Segurança Familiar',
        getMessage: () =>
            `Conheça o Vigilaro Care - o app que ajuda a proteger sua família!\n\n✅ Checklists de segurança\n✅ Identificação de riscos\n✅ Contatos de emergência\n✅ Guias de primeiros socorros\n\nBaixe grátis:`,
        getDeepLink: () => `invite?ref=share`,
    },
};

// ========================
// SHARING SERVICE
// ========================
class SharingService {
    constructor() {
        this.shareCount = 0;
    }

    // ========================
    // COMPARTILHAMENTO PRINCIPAL
    // ========================
    async shareContent(contentType, params = {}) {
        const template = SHARE_TEMPLATES[contentType] || SHARE_TEMPLATES.app_invite;

        try {
            const message = template.getMessage(params);
            const deepLink = this.generateDeepLink(template.getDeepLink(params));
            const storeLink = this.getStoreLink();

            const fullMessage = `${message}\n${storeLink}`;

            const result = await Share.share({
                title: template.title,
                message: fullMessage,
                url: Platform.OS === 'ios' ? deepLink : undefined,
            }, {
                dialogTitle: template.title,
                subject: template.title,
            });

            // Rastreia compartilhamento
            if (result.action === Share.sharedAction) {
                this.shareCount++;
                analytics.trackContentShared(
                    contentType,
                    params.id || 'general',
                    result.activityType || 'native'
                );
                return { success: true, method: result.activityType };
            } else if (result.action === Share.dismissedAction) {
                return { success: false, reason: 'dismissed' };
            }

        } catch (error) {
            if (__DEV__) { console.error('[SharingService] Erro ao compartilhar:', error); }
            return { success: false, error: error.message };
        }
    }

    // ========================
    // DEEP LINKS
    // ========================
    generateDeepLink(path) {
        // Universal Links para iOS 9+ (melhor experiência)
        return `${CONFIG.universalLinkDomain}/${path}`;
    }

    generateAppLink(path) {
        // Custom URL Scheme (fallback)
        return `${CONFIG.deepLinkScheme}${path}`;
    }

    async handleIncomingLink(url) {
        try {
            // Parse do deep link
            const parsed = this.parseDeepLink(url);

            // Rastreia origem
            if (parsed.params?.ref === 'share') {
                analytics.trackEvent('deep_link_opened', {
                    source: 'share',
                    screen: parsed.screen,
                });
            }

            return parsed;
        } catch (error) {
            if (__DEV__) { console.error('[SharingService] Erro ao processar link:', error); }
            return null;
        }
    }

    parseDeepLink(url) {
        // Remove prefixos
        let path = url
            .replace(CONFIG.universalLinkDomain + '/', '')
            .replace(CONFIG.deepLinkScheme, '');

        // Separa screen e params
        const [screenPath, queryString] = path.split('?');
        const params = {};

        if (queryString) {
            queryString.split('&').forEach(param => {
                const [key, value] = param.split('=');
                params[key] = decodeURIComponent(value);
            });
        }

        // Determina a tela de destino
        const [screen, ...pathParts] = screenPath.split('/');

        return {
            screen,
            id: pathParts[0] || null,
            params,
        };
    }

    // ========================
    // LINKS DA LOJA
    // ========================
    getStoreLink() {
        return Platform.OS === 'ios' ? CONFIG.appStoreUrl : CONFIG.playStoreUrl;
    }

    async openStore() {
        const url = this.getStoreLink();
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
            await Linking.openURL(url);
        }
    }

    // ========================
    // WHATSAPP
    // ========================
    async shareViaWhatsApp(message, phone = null) {
        try {
            let url = `whatsapp://send?text=${encodeURIComponent(message)}`;
            if (phone) {
                url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
            }

            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
                analytics.trackContentShared('custom', 'whatsapp_direct', 'whatsapp');
                return { success: true };
            } else {
                // Fallback para share nativo
                return this.shareContent('app_invite');
            }
        } catch (error) {
            if (__DEV__) { console.error('[SharingService] Erro com WhatsApp:', error); }
            return { success: false, error: error.message };
        }
    }

    // ========================
    // CLIPBOARD
    // ========================
    async copyToClipboard(contentType, params = {}) {
        try {
            const Clipboard = require('react-native').Clipboard ||
                require('@react-native-clipboard/clipboard').default;

            const template = SHARE_TEMPLATES[contentType] || SHARE_TEMPLATES.app_invite;
            const message = template.getMessage(params);
            const storeLink = this.getStoreLink();

            await Clipboard.setString(`${message}\n${storeLink}`);

            analytics.trackContentShared(contentType, params.id || 'general', 'clipboard');

            return { success: true };
        } catch (error) {
            if (__DEV__) { console.error('[SharingService] Erro ao copiar:', error); }
            return { success: false, error: error.message };
        }
    }

    // ========================
    // STATS
    // ========================
    getShareCount() {
        return this.shareCount;
    }
}

export const sharingService = new SharingService();

export default sharingService;
