
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import ProfileService from './ProfileService';

const MEDS_KEY = '@vigilaro_medications_v1';

// Configuração básica de notificação
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class MedicationService {

    /**
     * Retorna todos os medicamentos cadastrados
     */
    static async getMedications() {
        try {
            const data = await AsyncStorage.getItem(MEDS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            if (__DEV__) { console.error('Erro ao ler medicamentos', e); }
            return [];
        }
    }

    /**
     * Adiciona um novo medicamento e agenda a próxima dose
     */
    static async addMedication(medData) {
        /* 
          medData esperado:
          {
             id: string (optional),
             name: string,
             dosage: string,
             frequencyHours: number, // ex: 8
             nextDoseDate: string (ISO),
             photoUri: string | null,
             profileId: string, // Quem toma
             responsibleContactId: string | null // Quem cuida
          }
        */
        const meds = await this.getMedications();

        const newMed = {
            ...medData,
            id: medData.id || Date.now().toString(),
            createdAt: new Date().toISOString(),
            history: [] // Histórico de tomadas
        };

        // Agendar notificações para a primeira dose
        await this.scheduleNotifications(newMed);

        meds.push(newMed);
        await AsyncStorage.setItem(MEDS_KEY, JSON.stringify(meds));
        return newMed;
    }

    /**
     * Atualiza um medicamento existente e reagenda notificações
     */
    static async updateMedication(medData) {
        let meds = await this.getMedications();
        const index = meds.findIndex(m => m.id === medData.id);

        if (index !== -1) {
            const existingMed = meds[index];
            const updatedMed = {
                ...existingMed,
                ...medData, // Sobrescreve campos novos
                // Se a data da dose mudou, reagendamos
            };

            // Cancelar notificações antigas
            await this.cancelNotifications(existingMed);

            // Reagendar com novos dados
            const notificationIds = await this.scheduleNotifications(updatedMed);
            updatedMed.notificationIds = notificationIds;

            meds[index] = updatedMed;
            await AsyncStorage.setItem(MEDS_KEY, JSON.stringify(meds));
            return updatedMed;
        }
    }

    /**
     * Remove medicamento e suas notificações
     */
    static async deleteMedication(id) {
        let meds = await this.getMedications();
        const med = meds.find(m => m.id === id);

        if (med) {
            await this.cancelNotifications(med); // Cancela pendentes
            meds = meds.filter(m => m.id !== id);
            await AsyncStorage.setItem(MEDS_KEY, JSON.stringify(meds));
        }
    }

    /**
     * Marca como tomado, salva no histórico e agenda PRÓXIMA
     */
    static async markAsTaken(medId) {
        let meds = await this.getMedications();
        const index = meds.findIndex(m => m.id === medId);

        if (index !== -1) {
            const med = meds[index];

            // Cancelar notificações da dose atual (caso tenha tomado antes dos alertas de 5min)
            await this.cancelNotifications(med);

            // Registrar histórico
            const takenTime = new Date();
            med.history.push({
                takenAt: takenTime.toISOString(),
                scheduledFor: med.nextDoseDate,
                onTime: takenTime <= new Date(med.nextDoseDate)
            });

            // Decrementar Estoque
            if (med.stockQuantity && med.stockQuantity > 0) {
                med.stockQuantity = med.stockQuantity - 1;

                // Alerta de Estoque Baixo se for <= 5 e ainda não alertado hoje (opcional, aqui simples)
                if (med.stockQuantity <= 5) {
                    // Poderíamos agendar algo ou mandar push local, mas como o user está com app aberto,
                    // a UI deve refletir.
                }
            }

            // Calcular nova data com base na escolha médica de reagendamento (Prevenção 3D)
            if (med.isRigidSchedule) {
                // REGRA FIXA: Mantém o horário base. Avança ciclos até atingir um horário futuro válido.
                let baseDate = new Date(med.nextDoseDate);
                const now = new Date();
                do {
                    baseDate = new Date(baseDate.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                } while (baseDate <= now);
                med.nextDoseDate = baseDate.toISOString();
            } else {
                // REGRA FLEXÍVEL (SINTOMÁTICOS): Zera o relógio a partir da hora do clique para evitar toxicidade
                const takenTime = new Date();
                const exactNextDate = new Date(takenTime.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                
                // Arredondamento Clínico (Blocos de 5 minutos)
                const coeff = 1000 * 60 * 5;
                const roundedDate = new Date(Math.round(exactNextDate.getTime() / coeff) * coeff);

                med.nextDoseDate = roundedDate.toISOString();
            }

            // Reagendar notificações
            const notificationIds = await this.scheduleNotifications(med);
            med.notificationIds = notificationIds;

            meds[index] = med;
            await AsyncStorage.setItem(MEDS_KEY, JSON.stringify(meds));
            return med;
        }
    }

    /**
     * Marca como tomado COM ATRASO, salva detalhes no histórico e recalcula próxima dose.
     * @param {string} medId - ID do medicamento
     * @param {number} delayMinutes - Atraso em minutos
     * @param {string} [overrideNextDose] - ISO string da próxima dose pré-calculada (opcional)
     * @returns {object} medicamento atualizado
     */
    static async markAsTakenWithDelay(medId, delayMinutes, overrideNextDose = null) {
        let meds = await this.getMedications();
        const index = meds.findIndex(m => m.id === medId);

        if (index !== -1) {
            const med = meds[index];

            // Cancelar notificações da dose atual
            await this.cancelNotifications(med);

            // Classificar nível de atraso
            let delayLevel = 'minimal';
            if (delayMinutes > 240) delayLevel = 'critical';
            else if (delayMinutes > 120) delayLevel = 'high';
            else if (delayMinutes > 30) delayLevel = 'moderate';
            else if (delayMinutes > 15) delayLevel = 'low';

            // Registrar histórico com dados de atraso
            const takenTime = new Date();
            med.history = med.history || [];
            med.history.push({
                takenAt: takenTime.toISOString(),
                scheduledFor: med.nextDoseDate,
                onTime: false,
                delayMinutes: delayMinutes,
                delayLevel: delayLevel,
            });

            // Decrementar estoque
            if (med.stockQuantity && med.stockQuantity > 0) {
                med.stockQuantity = med.stockQuantity - 1;
            }

            // Recálculo da próxima dose
            if (overrideNextDose) {
                // Usar data pré-calculada pelo modal (que já aplicou a lógica correta)
                med.nextDoseDate = overrideNextDose;
            } else if (med.isRigidSchedule) {
                // REGRA FIXA: Mantém o horário base, avança ciclos
                let baseDate = new Date(med.nextDoseDate);
                const now = new Date();
                do {
                    baseDate = new Date(baseDate.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                } while (baseDate <= now);
                med.nextDoseDate = baseDate.toISOString();
            } else {
                // REGRA FLEXÍVEL COM ATRASO:
                if (delayMinutes <= 30) {
                    // Atraso pequeno: mantém ciclo do horário original
                    let baseDate = new Date(med.nextDoseDate);
                    baseDate = new Date(baseDate.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                    const now = new Date();
                    if (baseDate <= now) {
                        baseDate = new Date(now.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                    }
                    med.nextDoseDate = baseDate.toISOString();
                } else {
                    // Atraso significativo (>30min): recalcula a partir da hora real
                    const exactNext = new Date(takenTime.getTime() + (med.frequencyHours * 60 * 60 * 1000));
                    // Arredondamento clínico (blocos de 5 min)
                    const coeff = 1000 * 60 * 5;
                    const rounded = new Date(Math.round(exactNext.getTime() / coeff) * coeff);
                    med.nextDoseDate = rounded.toISOString();
                }
            }

            // Reagendar notificações
            const notificationIds = await this.scheduleNotifications(med);
            med.notificationIds = notificationIds;

            meds[index] = med;
            await AsyncStorage.setItem(MEDS_KEY, JSON.stringify(meds));
            return med;
        }
    }

    /**
     * Agenda 3 notificações: -15min, -5min, Hora H
     */
    static async scheduleNotifications(med) {
        // Limpar anteriores se houver (por precaução, embora markAsTaken chame cancel)
        if (med.notificationIds) {
            // await this.cancelNotifications(med);
        }

        const doseTime = new Date(med.nextDoseDate);
        const now = new Date();

        const ids = [];
        const profiles = await ProfileService.getPerfis();
        const profile = profiles.find(p => p.id === med.profileId);
        const userName = profile ? profile.nome : 'Alguém';

        // Helper interno
        const schedule = async (triggerDate, title, body) => {
            if (triggerDate > now) {
                const id = await Notifications.scheduleNotificationAsync({
                    content: {
                        title,
                        body,
                        data: { medId: med.id, screen: 'Medication' },
                        sound: true,
                        priority: Notifications.AndroidNotificationPriority.HIGH,
                    },
                    trigger: { type: 'date', date: triggerDate },
                });
                return id;
            }
            return null;
        };

        // 1. Aviso Antecipado (-15 min)
        const time15 = new Date(doseTime.getTime() - 15 * 60 * 1000);
        const id15 = await schedule(
            time15,
            `💊 Quase hora do remédio`,
            `Prepare o ${med.name} (${med.dosage}) para ${userName}. Faltam 15min.`
        );
        if (id15) ids.push(id15);

        // 2. Aviso Urgência (-5 min)
        const time5 = new Date(doseTime.getTime() - 5 * 60 * 1000);
        const id5 = await schedule(
            time5,
            `⚠️ 5 minutos para o remédio!`,
            `Atenção! ${med.name} deve ser tomado em breve por ${userName}.`
        );
        if (id5) ids.push(id5);

        // 3. Hora H
        const id0 = await schedule(
            doseTime,
            `🚨 HORA DO REMÉDIO`,
            `Hora de tomar ${med.name} (${med.dosage}). Confirme no app agora!`
        );
        if (id0) ids.push(id0);

        return ids;
    }

    static async cancelNotifications(med) {
        if (med.notificationIds && Array.isArray(med.notificationIds)) {
            for (const id of med.notificationIds) {
                if (id) await Notifications.cancelScheduledNotificationAsync(id);
            }
        }
    }

    /**
     * Verifica se há remédios atrasados (Overdue)
     * Retorna array de meds atrasados
     */
    static async getOverdueMeds() {
        const meds = await this.getMedications();
        const now = new Date();
        // Consideramos atrasado se passou 1 minuto da hora e ainda não tomou (nextDoseDate < now)
        // E logicamente, se está no array é porque não foi marcado tomado (pois markAsTaken empurra a data pra frente)
        return meds.filter(m => new Date(m.nextDoseDate) < now);
    }
}

export default MedicationService;
