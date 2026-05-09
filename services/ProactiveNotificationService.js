import NotificationService from './NotificationService';
import InspectionScheduleService from './InspectionScheduleService';
import { SentinelaService } from './SentinelaService';
import ScoreService from './ScoreService'; // Added
import RadarVigilaroService from './RadarVigilaroService'; // Added F-08
import ProfileService from './ProfileService'; // BUG-08 FIX: para calcularIdade()
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n'; // BUG-12 FIX: import i18n para notificações

const PREFS_KEY = '@proactive_notification_prefs';

/**
 * Serviço que gerencia todas as notificações proativas do Vigilaro Care.
 * Agenda notificações locais para:
 * - Dica diária de segurança (baseada na família)
 * - Lembrete noturno de rotina
 * - Lembretes de vistoria agendada
 */
class ProactiveNotificationService {

    /**
     * Retorna as preferências do usuário para notificações.
     */
    async getPreferences() {
        try {
            const data = await AsyncStorage.getItem(PREFS_KEY);
            return data ? JSON.parse(data) : {
                dailyTipEnabled: true,
                dailyTipHour: 9,
                nightRoutineEnabled: true,
                nightRoutineHour: 22,
                inspectionRemindersEnabled: true,
            };
        } catch (error) {
            if (__DEV__) { console.error('Erro ao carregar preferências:', error); }
            return {
                dailyTipEnabled: true,
                dailyTipHour: 9,
                nightRoutineEnabled: true,
                nightRoutineHour: 22,
                inspectionRemindersEnabled: true,
            };
        }
    }

    /**
     * Salva preferências do usuário.
     */
    async savePreferences(prefs) {
        try {
            await AsyncStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
        } catch (error) {
            if (__DEV__) { console.error('Erro ao salvar preferências:', error); }
        }
    }

    /**
     * Cancela e reagenda TODAS as notificações proativas.
     * Deve ser chamado quando perfis mudam ou ao abrir o app.
     * 
     * @param {Array} allProfiles Todos os perfis da família
     * @param {object} familyMeta Metadados da família
     */
    async refreshAll(allProfiles = [], familyMeta = {}) {
        try {
            await NotificationService.init();
            const prefs = await this.getPreferences();

            // Limpar notificações proativas existentes (mas preservar medicamentos)
            const scheduled = await NotificationService.getScheduledNotifications();
            for (const notif of scheduled) {
                if (notif.content?.data?.proactive) {
                    await NotificationService.cancelNotification(notif.identifier);
                }
            }

            // 1. Dica diária
            if (prefs.dailyTipEnabled) {
                await this._scheduleDailyTip(allProfiles, familyMeta, prefs.dailyTipHour);
            }

            // 2. Rotina noturna
            if (prefs.nightRoutineEnabled) {
                await this._scheduleNightRoutine(prefs.nightRoutineHour);
            }

            // 3. Lembretes de vistorias
            if (prefs.inspectionRemindersEnabled) {
                await this._scheduleInspectionReminders();
                // 4. Lembrete Semanal Inteligente (F-04) - Atrelado à flag de vistoria
                await this._scheduleWeeklyContextualTip(allProfiles, familyMeta);
                // 5. Alerta Sazonal Mensal (F-08)
                await this._scheduleMonthlySeasonalAlert();
                // 6. Resumo Semanal de Valor (sexta-feira)
                await this._scheduleWeeklySummary();
            }

            if (__DEV__) console.log('ProactiveNotificationService: Todas as notificações reagendadas.');
        } catch (error) {
            console.log('Aviso: Falha no agendamento proativo (ambiente limitado):', error.message);
        }
    }

    /**
     * Agenda dica diária de segurança.
     * @private
     */
    async _scheduleDailyTip(allProfiles, familyMeta, hour = 9) {
        try {
            const tip = SentinelaService.getDailyTip(allProfiles, familyMeta);
            if (!tip) return;

            const title = `💡 ${tip.title}`;
            const body = tip.forWhom && tip.group !== 'general'
                ? `${tip.message} — dica para ${tip.forWhom}.`
                : tip.message;

            await NotificationService.scheduleNotification(
                title,
                body,
                {
                    channelId: 'default',
                    hour: hour,
                    minute: 0,
                    repeats: true,
                },
                { proactive: true, type: 'daily_tip', route: null },
                'default'
            );
        } catch (error) {
            console.log('Aviso: Não foi possível agendar dica diária:', error.message);
        }
    }

    /**
     * Agenda lembrete noturno de rotina.
     * @private
     */
    async _scheduleNightRoutine(hour = 22) {
        try {
            // BUG-12 FIX: usar i18n
            await NotificationService.scheduleNotification(
                i18n.t('proactive.nightRoutineTitle', '🌙 Hora de fechar o dia'),
                i18n.t('proactive.nightRoutineDesc', 'Trancas, janelas, gás. Três segundos que garantem uma noite segura.'),
                {
                    channelId: 'default',
                    hour: hour,
                    minute: 0,
                    repeats: true,
                },
                { proactive: true, type: 'night_routine', route: null },
                'default'
            );
        } catch (error) {
            console.log('Aviso: Não foi possível agendar rotina noturna:', error.message);
        }
    }

    /**
     * Agenda lembretes para vistorias pendentes.
     * @private
     */
    async _scheduleInspectionReminders() {
        try {
            const schedules = await InspectionScheduleService.getSchedules();

            for (const schedule of Object.values(schedules)) {
                const proxima = new Date(schedule.proximaVistoria);
                const now = new Date();

                // Só agendar se a data ainda é no futuro
                if (proxima > now) {
                    // Agendar para 1 dia antes, às 9h
                    const reminderDate = new Date(proxima);
                    reminderDate.setDate(reminderDate.getDate() - 1);
                    reminderDate.setHours(9, 0, 0, 0);

                    if (reminderDate > now) {
                        // BUG-12 FIX: usar i18n com plural/interpolação
                        await NotificationService.scheduleNotification(
                            i18n.t('proactive.inspectionTitle', '📋 Vistoria: {{areaName}}', { areaName: schedule.areaName }),
                            i18n.t('proactive.inspectionDesc', 'Sua vistoria {{frequencia}} de {{areaName}} vence amanhã. Toque para inspecionar.', { frequencia: schedule.frequencia, areaName: schedule.areaName }),
                            { date: reminderDate, channelId: 'default' },
                            { proactive: true, type: 'inspection', areaId: schedule.areaId, route: 'ModoPreventivo' },
                            'default'
                        );
                    }
                }
            }
        } catch (error) {
            console.log('Aviso: Não foi possível agendar vistorias:', error.message);
        }
    }

    /**
     * Agenda Notificação Semanal Inteligente (F-04).
     * Analisa o ambiente com a menor pontuação e envia um push contextual às segundas-feiras.
     * @private
     */
    async _scheduleWeeklyContextualTip(allProfiles, familyMeta) {
        try {
            const scoreData = await ScoreService.getScoreCompleto();
            const ambientes = scoreData.ambientes;
            
            // Encontra o ambiente com a menor pontuação (maior risco pendente)
            let piorAmbiente = null;
            let menorNota = 101;
            
            for (const [ambienteId, nota] of Object.entries(ambientes)) {
                if (nota < menorNota) {
                    menorNota = nota;
                    piorAmbiente = ambienteId;
                }
            }
            
            // Se não tem ambientes ou tudo é 100%, não perturba o usuário.
            if (!piorAmbiente || menorNota >= 100) return; 
            
            let message = '';
            
            // BUG-08 FIX: tipo='idoso'/'crianca' não existe. Usar calcularIdade() para faixa etária real.
            const hasIdoso = allProfiles.some(p => {
                if (p.tipo === 'pet') return false;
                const age = ProfileService.calcularIdade(p.dataNascimento);
                return age !== null && age >= 60;
            });
            const hasBebe = allProfiles.some(p => {
                if (p.tipo === 'pet') return false;
                const age = ProfileService.calcularIdade(p.dataNascimento);
                return age !== null && age <= 2;
            });
            const hasPet = allProfiles.some(p => p.tipo === 'pet');
            
            const ambName = piorAmbiente.charAt(0).toUpperCase() + piorAmbiente.slice(1);

            if (piorAmbiente === 'banheiro' && hasIdoso) {
                message = i18n.t('proactive.weeklyTipBathroomElderly', 'A vistoria do Banheiro está atrasada. Com idosos em casa, evite quedas verificando os tapetes e as barras de apoio.');
            } else if (piorAmbiente === 'cozinha' && (hasBebe || hasPet)) {
                message = i18n.t('proactive.weeklyTipKitchenBaby', 'Identificamos riscos na Cozinha. Panelas e produtos químicos merecem atenção cobrada essa semana.');
            } else {
                message = i18n.t('proactive.weeklyTipGeneric', 'Riscos em "{{ambName}}" pendentes. Dedique 3 minutos hoje para garantir a blindagem da sua família.', { ambName });
            }
            
            await NotificationService.scheduleNotification(
                i18n.t('proactive.weeklyTipTitle', '📅 Vigilaro: Alerta Semanal'),
                message,
                {
                    weekday: 2, // Segunda-feira
                    hour: 9,
                    minute: 0,
                    repeats: false, // BUG-04 FIX: Notificação contextual muda; HomeScreen reagenda
                    channelId: 'default'
                },
                { proactive: true, type: 'weekly_contextual', route: 'Relatorios' },
                'default'
            );
        } catch (error) {
            console.log('Aviso: Não foi possível agendar notificação contextual semanal:', error.message);
        }
    }

    /**
     * Agenda Alerta Sazonal Mensal (F-08).
     * Dispara no dia 1 de cada mês com o conteúdo do Radar Vigilaro.
     * @private
     */
    async _scheduleMonthlySeasonalAlert() {
        try {
            // BUG-13 FIX: mesAtual era declarado mas nunca usado
            const feed = RadarVigilaroService.getFeed([], 1); // Pega apenas o primeiro (que é o sazonal do mês)
            const sazonal = feed[0];

            if (!sazonal || sazonal.formato !== 'sazonal') return;

            // Agendar para o dia 1 do mês às 10:00
            await NotificationService.scheduleNotification(
                `🗓️ ${sazonal.titulo}`,
                sazonal.resumo,
                {
                    day: 1,
                    hour: 10,
                    minute: 0,
                    repeats: true,
                    channelId: 'default'
                },
                { proactive: true, type: 'seasonal_alert', route: 'AlertasSazonais' },
                'critical'
            );
        } catch (error) {
            console.log('Aviso: Não foi possível agendar alerta sazonal:', error.message);
        }
    }

    /**
     * Agenda Resumo Semanal de Valor (sexta-feira 18h).
     * Envia ao usuário um resumo do estado da sua casa para reforçar percepção de utilidade.
     * @private
     */
    async _scheduleWeeklySummary() {
        try {
            const scoreData = await ScoreService.getScoreCompleto();
            const score = scoreData.geral;
            const pendencias = scoreData.pendencias || 0;

            let message = '';
            if (score >= 90) {
                message = i18n.t('proactive.weeklySummaryHigh', 'Sua casa está com {{score}}% de segurança. Excelente trabalho! Continue assim.', { score });
            } else if (score >= 70) {
                message = i18n.t('proactive.weeklySummaryMedium', 'Score atual: {{score}}%. {{pendenciasText}}', { 
                    score, 
                    pendenciasText: pendencias > 0 ? i18n.t('proactive.weeklySummaryPendencias', '{{count}} pendência(s) para resolver.', { count: pendencias }) : i18n.t('proactive.weeklySummaryAlmost', 'Quase lá!') 
                });
            } else {
                message = i18n.t('proactive.weeklySummaryLow', 'Score atual: {{score}}%. Sua família merece atenção: {{count}} item(ns) precisa(m) de correção.', { score, count: pendencias });
            }

            await NotificationService.scheduleNotification(
                i18n.t('proactive.weeklySummaryTitle', '📊 Vigilaro: Resumo Semanal'),
                message,
                {
                    weekday: 6, // Sexta-feira
                    hour: 18,
                    minute: 0,
                    repeats: false, // BUG-04 FIX: Notificação contextual muda; HomeScreen reagenda
                    channelId: 'default'
                },
                { proactive: true, type: 'weekly_summary', route: null },
                'default'
            );
        } catch (error) {
            console.log('Aviso: Não foi possível agendar resumo semanal:', error.message);
        }
    }
}

export default new ProactiveNotificationService();
