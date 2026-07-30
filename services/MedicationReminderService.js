/**
 * MedicationReminderService.js
 * Vigilaro Care V6 Neo
 *
 * Gerencia lembretes de medicamentos: CRUD em AsyncStorage e
 * agendamento de notificações locais via NotificationService.
 *
 * Módulo Cuidador Remoto: campos de opt-in SMS/WhatsApp presentes
 * no schema de dados; envio remoto delegado ao backend-proxy via
 * método separado (sendRemoteNotification).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import NotificationService from './NotificationService';
import SubscriptionService from './SubscriptionService';
import { canUse } from '../utils/PremiumLimits';

const STORAGE_KEY = '@vigilaro_medication_reminders';
const DISCLAIMER_KEY = '@medication_reminder_disclaimer_accepted';

/** UUID v4 simples — compatível com RN sem dependências nativas extras. */
const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


// Dias da semana: 1=Dom ... 7=Sáb (para compatibilidade expo-notifications weekday)
export const DIAS_SEMANA = [
    { label: 'Dom', value: 1 },
    { label: 'Seg', value: 2 },
    { label: 'Ter', value: 3 },
    { label: 'Qua', value: 4 },
    { label: 'Qui', value: 5 },
    { label: 'Sex', value: 6 },
    { label: 'Sáb', value: 7 },
];

/**
 * Schema de um lembrete:
 * {
 *   id: string,
 *   perfilId: string,
 *   perfilNome: string,
 *   medicamentoNome: string,
 *   observacoes: string,
 *   horarios: ['08:00', '20:00'],        // array de HH:mm
 *   diasSemana: [1,2,3,4,5,6,7],        // 1=Dom...7=Sáb; vazio = todos
 *   ativo: boolean,
 *   notificationIds: string[],           // IDs retornados pelo expo-notifications
 *   cuidadorRemoto: {
 *     ativo: boolean,
 *     destinatarioNome: string,
 *     destinatarioTelefone: string,      // E.164: "+5511999999999"
 *     relacaoComCuidador: string,        // "meu pai", "minha mãe" etc.
 *     canal: 'whatsapp' | 'sms' | 'ambos',
 *     optinStatus: 'pendente' | 'aceito' | 'recusado',
 *     optinConfirmadoEm: string | null,  // ISO timestamp
 *   } | null,
 *   criadoEm: string,   // ISO timestamp
 *   atualizadoEm: string,
 *   disclaimerAceitoEm: string,
 * }
 */

class MedicationReminderService {

    // ----------------------------------------------------------------
    // DISCLAIMER
    // ----------------------------------------------------------------

    /** Verifica se o usuário já aceitou o disclaimer desta sessão. */
    async isDisclaimerAccepted() {
        try {
            const val = await AsyncStorage.getItem(DISCLAIMER_KEY);
            return !!val;
        } catch {
            return false;
        }
    }

    /** Persiste o aceite do disclaimer com timestamp. */
    async acceptDisclaimer() {
        try {
            await AsyncStorage.setItem(DISCLAIMER_KEY, new Date().toISOString());
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] acceptDisclaimer:', e);
        }
    }

    // ----------------------------------------------------------------
    // CRUD — AsyncStorage
    // ----------------------------------------------------------------

    /** Carrega todos os lembretes salvos. */
    async getAll() {
        try {
            const raw = await AsyncStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] getAll:', e);
            return [];
        }
    }

    /** Retorna apenas os lembretes de um perfil específico. */
    async getByPerfil(perfilId) {
        const all = await this.getAll();
        return all.filter(r => r.perfilId === perfilId);
    }

    /** Persiste (cria ou atualiza) um lembrete. Agenda notificações automaticamente. */
    async save(reminder) {
        try {
            const all = await this.getAll();
            const isNew = !reminder.id;

            // FASE 4 — Enforcement de limites Premium
            const subStatus = SubscriptionService.getSubscriptionStatus();
            const tier = subStatus?.tier || 'free';

            // Limite de lembretes ativos (só importa se estiver tentando criar um novo e ativo, ou ativando um inativo)
            if (reminder.ativo) {
                const activeReminders = all.filter(r => r.ativo && r.id !== reminder.id).length;
                if (!canUse(tier, 'maxLembretes', activeReminders)) {
                    throw new Error('LIMIT_MAX_LEMBRETES');
                }
            }

            // Limite de horários por lembrete
            if (reminder.horarios) {
                // canUse currentCount is compared as `currentCount < limit`.
                // So if limits[maxHorariosPerLembrete] is 2, and we have 3, `3 < 2` is false.
                // Wait, if length is 2, `2 < 2` is false, meaning we can't ADD a 3rd. But here we validate the final array length.
                // It's easier to check directly or pass `length - 1`. Let's pass `reminder.horarios.length - 1` as currentCount.
                if (!canUse(tier, 'maxHorariosPerLembrete', reminder.horarios.length - 1)) {
                    throw new Error('LIMIT_MAX_HORARIOS');
                }
            }

            if (isNew) {
                reminder.id = generateId();
                reminder.criadoEm = new Date().toISOString();
            }
            reminder.atualizadoEm = new Date().toISOString();

            // Cancela notificações anteriores se for update
            if (!isNew) {
                await this._cancelNotifications(reminder.notificationIds || []);
            }

            // Agenda novas notificações se ativo
            reminder.notificationIds = [];
            if (reminder.ativo) {
                reminder.notificationIds = await this._scheduleNotifications(reminder);
            }

            const idx = all.findIndex(r => r.id === reminder.id);
            if (idx >= 0) {
                all[idx] = reminder;
            } else {
                all.push(reminder);
            }

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
            return reminder;
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] save:', e);
            throw e;
        }
    }

    /** Remove lembrete e cancela suas notificações. */
    async remove(id) {
        try {
            const all = await this.getAll();
            const target = all.find(r => r.id === id);
            if (target?.notificationIds?.length) {
                await this._cancelNotifications(target.notificationIds);
            }
            const updated = all.filter(r => r.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] remove:', e);
            throw e;
        }
    }

    /** Ativa / desativa lembrete sem deletar. */
    async toggleAtivo(id) {
        try {
            const all = await this.getAll();
            const idx = all.findIndex(r => r.id === id);
            if (idx < 0) return;
            all[idx].ativo = !all[idx].ativo;
            await this.save(all[idx]); // re-agenda ou cancela
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] toggleAtivo:', e);
        }
    }

    // ----------------------------------------------------------------
    // AGENDAMENTO — expo-notifications (local)
    // ----------------------------------------------------------------

    /**
     * Agenda uma notificação recorrente por horário + dias da semana.
     * Retorna array de IDs gerados.
     */
    async _scheduleNotifications(reminder) {
        await NotificationService.init();
        const ids = [];

        const dias = (reminder.diasSemana?.length > 0)
            ? reminder.diasSemana
            : DIAS_SEMANA.map(d => d.value); // todos os dias

        for (const horario of (reminder.horarios || [])) {
            const [hora, minuto] = horario.split(':').map(Number);

            for (const dia of dias) {
                try {
                    const id = await Notifications.scheduleNotificationAsync({
                        content: {
                            title: `💊 ${reminder.medicamentoNome}`,
                            body: reminder.perfilNome
                                ? `Lembrete para ${reminder.perfilNome}`
                                : 'Lembrete de medicamento configurado por você.',
                            data: { type: 'medication_reminder', reminderId: reminder.id },
                            sound: true,
                            categoryIdentifier: 'medication',
                        },
                        trigger: {
                            type: 'weekly',
                            weekday: dia,
                            hour: hora,
                            minute: minuto,
                            repeats: true,
                        },
                    });
                    ids.push(id);
                } catch (e) {
                    // Tenta trigger diário como fallback se semanal falhar
                    try {
                        const id = await Notifications.scheduleNotificationAsync({
                            content: {
                                title: `💊 ${reminder.medicamentoNome}`,
                                body: reminder.perfilNome
                                    ? `Lembrete para ${reminder.perfilNome}`
                                    : 'Lembrete de medicamento configurado por você.',
                                data: { type: 'medication_reminder', reminderId: reminder.id },
                                sound: true,
                            },
                            trigger: {
                                type: 'daily',
                                hour: hora,
                                minute: minuto,
                                repeats: true,
                            },
                        });
                        ids.push(id);
                        break; // Um por horário no fallback diário
                    } catch (e2) {
                        if (__DEV__) console.warn('[MedicationReminderService] schedule fallback:', e2);
                    }
                }
            }
        }

        if (__DEV__) console.log(`[MedicationReminderService] Agendadas ${ids.length} notificações para "${reminder.medicamentoNome}"`);
        return ids;
    }

    /** Cancela uma lista de IDs de notificação. */
    async _cancelNotifications(ids = []) {
        for (const id of ids) {
            try {
                await Notifications.cancelScheduledNotificationAsync(id);
            } catch (e) {
                if (__DEV__) console.warn('[MedicationReminderService] cancelNotification:', id, e);
            }
        }
    }

    // ----------------------------------------------------------------
    // MÓDULO CUIDADOR REMOTO — delega ao backend-proxy
    // ----------------------------------------------------------------

    /**
     * Envia mensagem de opt-in ou lembrete via SMS/WhatsApp pelo backend.
     * O backend-proxy deve ter o endpoint POST /api/notify/medication-reminder.
     * As chaves de API da Zenvia/Twilio ficam exclusivamente no servidor.
     *
     * @param {object} payload
     * @param {string} proxyUrl    URL do backend-proxy (de Config.js)
     * @param {string} appSecret   Token de autenticação (de Config.js)
     */
    async sendRemoteNotification(payload, proxyUrl, appSecret) {
        try {
            const response = await fetch(`${proxyUrl}/api/notify/medication-reminder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-vigilaro-token': appSecret,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] sendRemoteNotification:', e);
            throw e;
        }
    }

    /** Atualiza o status de opt-in de um lembrete. */
    async updateOptinStatus(reminderId, status, timestamp = null) {
        try {
            const all = await this.getAll();
            const idx = all.findIndex(r => r.id === reminderId);
            if (idx < 0) return;

            if (all[idx].cuidadorRemoto) {
                all[idx].cuidadorRemoto.optinStatus = status;
                if (timestamp) {
                    all[idx].cuidadorRemoto.optinConfirmadoEm = timestamp;
                }
                all[idx].atualizadoEm = new Date().toISOString();
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
            }
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] updateOptinStatus:', e);
        }
    }

    // ----------------------------------------------------------------
    // FASE 3 — HISTÓRICO DE DOSES ("Tomei")
    // ----------------------------------------------------------------

    /**
     * Registra que o usuário tomou uma dose agora.
     * O histórico é armazenado dentro do próprio lembrete para
     * manter tudo no mesmo AsyncStorage key.
     *
     * @param {string} reminderId
     * @param {string} horario   — "08:00" (o horário da dose tomada)
     */
    async registrarDoseTomada(reminderId, horario = null) {
        try {
            const all = await this.getAll();
            const idx = all.findIndex(r => r.id === reminderId);
            if (idx < 0) return;

            if (!Array.isArray(all[idx].historicoDoses)) {
                all[idx].historicoDoses = [];
            }

            all[idx].historicoDoses.push({
                id: generateId(),
                timestamp: new Date().toISOString(),
                horario: horario || null,
            });

            // Mantém apenas os últimos 90 registros por lembrete (3 meses diários)
            if (all[idx].historicoDoses.length > 90) {
                all[idx].historicoDoses = all[idx].historicoDoses.slice(-90);
            }

            all[idx].atualizadoEm = new Date().toISOString();
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(all));
            return all[idx].historicoDoses;
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] registrarDoseTomada:', e);
        }
    }

    /**
     * Retorna o histórico de doses de um lembrete, do mais recente para o mais antigo.
     * @param {string} reminderId
     * @param {number} limite — quantos registros retornar (default 30)
     */
    async getHistoricoDoses(reminderId, limite = 30) {
        try {
            const all = await this.getAll();
            const reminder = all.find(r => r.id === reminderId);
            if (!reminder?.historicoDoses) return [];
            return [...reminder.historicoDoses].reverse().slice(0, limite);
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] getHistoricoDoses:', e);
            return [];
        }
    }

    /**
     * Estatísticas de aderência de um lembrete nos últimos N dias.
     * Retorna { esperadas, tomadas, percentual, diasAnalisados }
     */
    async getEstatisticas(reminderId, dias = 7) {
        try {
            const all = await this.getAll();
            const reminder = all.find(r => r.id === reminderId);
            if (!reminder) return null;

            const desde = new Date();
            desde.setDate(desde.getDate() - dias);

            const tomadas = (reminder.historicoDoses || []).filter(d => {
                return new Date(d.timestamp) >= desde;
            }).length;

            // Estimativa de doses esperadas: horarios/dia × dias × (diasSemana ativos / 7)
            const fatorDias = (!reminder.diasSemana?.length || reminder.diasSemana.length === 7)
                ? 1
                : reminder.diasSemana.length / 7;

            const esperadas = Math.round(
                (reminder.horarios?.length || 1) * dias * fatorDias
            );

            return {
                esperadas,
                tomadas,
                percentual: esperadas > 0 ? Math.min(100, Math.round((tomadas / esperadas) * 100)) : 0,
                diasAnalisados: dias,
            };
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] getEstatisticas:', e);
            return null;
        }
    }

    // ----------------------------------------------------------------
    // FASE 3 — SNOOZE
    // ----------------------------------------------------------------

    /**
     * Agenda uma notificação única N minutos à frente (snooze).
     * @param {object} reminder  — objeto do lembrete
     * @param {number} minutos   — tempo de snooze (padrão: 10)
     * @returns {string|null}    — ID da notificação agendada
     */
    async snoozeReminder(reminder, minutos = 10) {
        try {
            await NotificationService.init();
            const id = await Notifications.scheduleNotificationAsync({
                content: {
                    title: `💊 Snooze — ${reminder.medicamentoNome}`,
                    body: `Lembrete adiado ${minutos} minutos.`,
                    data: { type: 'medication_snooze', reminderId: reminder.id },
                    sound: true,
                },
                trigger: {
                    type: 'timeInterval',
                    seconds: minutos * 60,
                    repeats: false,
                },
            });
            if (__DEV__) console.log(`[MedicationReminderService] Snooze agendado: ${id} (+${minutos}min)`);
            return id;
        } catch (e) {
            if (__DEV__) console.error('[MedicationReminderService] snoozeReminder:', e);
            return null;
        }
    }

    // ----------------------------------------------------------------
    // HELPERS (ampliados)
    // ----------------------------------------------------------------

    /** Formata array de horários para exibição. Ex: ['08:00', '20:00'] → "08:00 · 20:00" */
    static formatHorarios(horarios = []) {
        return horarios.join(' · ') || '—';
    }

    /** Formata dias da semana para exibição compacta. */
    static formatDias(dias = []) {
        if (!dias.length || dias.length === 7) return 'Todos os dias';
        const labels = DIAS_SEMANA.filter(d => dias.includes(d.value)).map(d => d.label);
        return labels.join(', ');
    }

    /** Ícone de status do opt-in cuidador remoto. */
    static optinStatusIcon(status) {
        switch (status) {
            case 'aceito':    return { icon: 'TickCircle',    color: '#16A34A', label: 'Confirmado' };
            case 'recusado':  return { icon: 'CloseCircle',   color: '#DC2626', label: 'Recusado' };
            default:          return { icon: 'Clock',          color: '#D97706', label: 'Aguardando confirmação' };
        }
    }

    /** Formata timestamp ISO para "há X min/h/dias". */
    static formatRelativo(isoString) {
        if (!isoString) return '';
        const diff = Date.now() - new Date(isoString).getTime();
        const min  = Math.floor(diff / 60000);
        if (min < 1)   return 'agora mesmo';
        if (min < 60)  return `há ${min} min`;
        const h = Math.floor(min / 60);
        if (h < 24)    return `há ${h}h`;
        const d = Math.floor(h / 24);
        return `há ${d} dia${d !== 1 ? 's' : ''}`;
    }

    /** Formata data ISO para "DD/MM às HH:MM". */
    static formatDataHora(isoString) {
        if (!isoString) return '';
        const d = new Date(isoString);
        const dia  = String(d.getDate()).padStart(2, '0');
        const mes  = String(d.getMonth() + 1).padStart(2, '0');
        const hora = String(d.getHours()).padStart(2, '0');
        const min  = String(d.getMinutes()).padStart(2, '0');
        return `${dia}/${mes} às ${hora}:${min}`;
    }
}

export default new MedicationReminderService();
