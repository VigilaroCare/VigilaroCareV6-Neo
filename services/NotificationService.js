import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configuração Global de Handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class NotificationService {
    constructor() {
        this.isConfigured = false;
        // this.init(); // Removido: Inicialização preguiçosa para evitar crash no boot
    }

    async init() {
        if (this.isConfigured) return;

        try {
            // BLINDAGEM EXPO GO:
            // SDK 53+ removeu suporte a Push Remoto no Go.
            // Aqui focamos apenas em permissões locais.

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                console.log('Permissão de notificação negada!');
                return;
            }

            // Configurar Canais (Android) - Seguro para Local Notifications
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('medications', {
                    name: 'Medicamentos',
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });

                await Notifications.setNotificationChannelAsync('default', {
                    name: 'Geral',
                    importance: Notifications.AndroidImportance.DEFAULT,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });

                await Notifications.setNotificationChannelAsync('safety_tips', {
                    name: 'Dicas de Segurança',
                    importance: Notifications.AndroidImportance.DEFAULT,
                });

                await Notifications.setNotificationChannelAsync('inspections', {
                    name: 'Vistorias e Inspeções',
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                });
            }

            this.isConfigured = true;
            console.log('NotificationService (Local) inicializado com sucesso');

        } catch (error) {
            // Log silencioso para não assustar o usuário
            console.log('Aviso: Falha na inicialização de notificações (provavelmente erro de ambiente Expo Go):', error.message);
            this.isConfigured = true; // Assume configurado para não travar o app
        }
    }

    /**
     * Agenda uma notificação local
     * @param {string} title Título da notificação
     * @param {string} body Corpo da notificação
     * @param {object} trigger Configuração de gatilho (ex: { seconds: 60 } ou { hour: 10, minute: 30, repeats: true })
     * @param {object} data Dados extras para navegação ou lógica
     * @param {string} channelId ID do canal (default: 'default')
     * @returns {Promise<string>} ID da notificação agendada
     */
    async scheduleNotification(title, body, trigger, data = {}, channelId = 'default') {
        try {
            if (!this.isConfigured) await this.init();

            // Converter Date diretamente para os novos moldes do SDK 53+
            const finalTrigger = trigger instanceof Date
                ? { type: 'date', date: trigger }
                : trigger;

            const identifier = await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                    data,
                    sound: true,
                },
                trigger: finalTrigger,
            });

            console.log(`Notificação agendada: ${identifier} para ${JSON.stringify(trigger)}`);
            return identifier;
        } catch (error) {
            if (__DEV__) { console.error('Erro ao agendar notificação:', error); }
            return null;
        }
    }

    /**
     * Cancela todas as notificações agendadas
     */
    async cancelAll() {
        try {
            await Notifications.cancelAllScheduledNotificationsAsync();
            console.log('Todas as notificações agendadas foram canceladas.');
        } catch (error) {
            if (__DEV__) { console.error('Erro ao cancelar notificações:', error); }
        }
    }

    /**
     * Cancela notificação por ID
     */
    async cancelNotification(identifier) {
        try {
            await Notifications.cancelScheduledNotificationAsync(identifier);
            console.log(`Notificação ${identifier} cancelada.`);
        } catch (error) {
            if (__DEV__) { console.error(`Erro ao cancelar notificação ${identifier}:`, error); }
        }
    }

    /**
     * Obtém todas as notificações pendentes
     */
    async getScheduledNotifications() {
        try {
            return await Notifications.getAllScheduledNotificationsAsync();
        } catch (error) {
            if (__DEV__) { console.error('Erro ao buscar notificações agendadas:', error); }
            return [];
        }
    }

    /**
     * Agenda lembretes de medicamento recorrentes
     * @param {object} medication Objeto do medicamento
     * @param {object} config Configuração (frequência, horários)
     */
    async scheduleMedicationRefill(medication, config) {
        // Implementar lógica de recarga/baixo estoque se necessário
        // Por enquanto foca no horário da dose
    }
}

export default new NotificationService();
