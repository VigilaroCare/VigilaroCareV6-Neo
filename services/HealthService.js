// Storage roteia chaves sensíveis (PII/saúde) pro SecureStore criptografado
// e o restante pro AsyncStorage — ver utils/SecureStorage.js.
import { Storage } from '../utils/SecureStorage';

/**
 * HealthService - Gerencia saúde completa (medicamentos, tratamentos, histórico)
 */
class HealthService {

    // ==================== MEDICATIONS (Existente - Migrado) ====================

    static async getMedications(profileId = null) {
        try {
            const data = await Storage.getItem('@vigilaro_medications_v1');
            const allMeds = data ? JSON.parse(data) : [];

            if (profileId) {
                // Recupera legados (!m.profileId) que não possuíam dono atrelado
                return allMeds.filter(m => m.profileId === profileId || !m.profileId);
            }
            return allMeds;
        } catch (e) {
            if (__DEV__) { console.error('Error getting medications:', e); }
            return [];
        }
    }

    static async saveMedication(medication) {
        try {
            const meds = await this.getMedications();
            const newMed = {
                id: Date.now().toString(),
                ...medication,
                createdAt: new Date().toISOString()
            };
            meds.push(newMed);
            await Storage.setItem('@vigilaro_medications_v1', JSON.stringify(meds));
            return newMed;
        } catch (e) {
            if (__DEV__) { console.error('Error saving medication:', e); }
            throw e;
        }
    }

    static async updateMedication(medicationId, updates) {
        try {
            const meds = await this.getMedications();
            const index = meds.findIndex(m => m.id === medicationId);

            if (index !== -1) {
                meds[index] = { ...meds[index], ...updates };
                await Storage.setItem('@vigilaro_medications_v1', JSON.stringify(meds));
                return meds[index];
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error updating medication:', e); }
            throw e;
        }
    }

    static async deleteMedication(medicationId) {
        try {
            const meds = await this.getMedications();
            const filtered = meds.filter(m => m.id !== medicationId);
            await Storage.setItem('@vigilaro_medications_v1', JSON.stringify(filtered));
        } catch (e) {
            if (__DEV__) { console.error('Error deleting medication:', e); }
            throw e;
        }
    }

    static async getOverdueMeds() {
        try {
            const meds = await this.getMedications();
            const now = new Date();

            return meds.filter(med => {
                if (!med.schedule || !med.schedule.times) return false;

                // Check if any scheduled time has passed today
                const today = now.toISOString().split('T')[0];
                return med.schedule.times.some(time => {
                    const scheduledTime = new Date(`${today}T${time}`);
                    return scheduledTime < now;
                });
            });
        } catch (e) {
            if (__DEV__) { console.error('Error getting overdue meds:', e); }
            return [];
        }
    }

    // ==================== TREATMENTS (Novo) ====================

    static async getTreatments(profileId = null) {
        try {
            const data = await Storage.getItem('@treatments');
            const allTreatments = data ? JSON.parse(data) : [];

            if (profileId) {
                return allTreatments.filter(t => t.profileId === profileId || !t.profileId);
            }
            return allTreatments;
        } catch (e) {
            if (__DEV__) { console.error('Error getting treatments:', e); }
            return [];
        }
    }

    static async saveTreatment(treatment) {
        try {
            const treatments = await this.getTreatments();
            const newTreatment = {
                id: Date.now().toString(),
                ...treatment,
                createdAt: new Date().toISOString(),
                nextDate: this._calculateNextDate(treatment.startDate, treatment.interval)
            };
            treatments.push(newTreatment);
            await Storage.setItem('@treatments', JSON.stringify(treatments));
            return newTreatment;
        } catch (e) {
            if (__DEV__) { console.error('Error saving treatment:', e); }
            throw e;
        }
    }

    static async updateTreatment(treatmentId, updates) {
        try {
            const treatments = await this.getTreatments();
            const index = treatments.findIndex(t => t.id === treatmentId);

            if (index !== -1) {
                let updatedTreatment = { ...treatments[index], ...updates };
                // Re-calculate next date if startDate or interval changed
                if (updates.startDate || updates.interval) {
                    updatedTreatment.nextDate = this._calculateNextDate(updatedTreatment.startDate, updatedTreatment.interval);
                }
                treatments[index] = updatedTreatment;
                await Storage.setItem('@treatments', JSON.stringify(treatments));
                return updatedTreatment;
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error updating treatment:', e); }
            throw e;
        }
    }

    static async markTreatmentDone(treatmentId) {
        try {
            const treatments = await this.getTreatments();
            const index = treatments.findIndex(t => t.id === treatmentId);

            if (index !== -1) {
                const treatment = treatments[index];
                treatment.lastDone = new Date().toISOString();
                treatment.nextDate = this._calculateNextDate(new Date(), treatment.interval);

                await Storage.setItem('@treatments', JSON.stringify(treatments));
                return treatment;
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error marking treatment done:', e); }
            throw e;
        }
    }

    static async deleteTreatment(treatmentId) {
        try {
            const treatments = await this.getTreatments();
            const filtered = treatments.filter(t => t.id !== treatmentId);
            await Storage.setItem('@treatments', JSON.stringify(filtered));
        } catch (e) {
            if (__DEV__) { console.error('Error deleting treatment:', e); }
            throw e;
        }
    }

    static _calculateNextDate(startDate, interval) {
        const date = new Date(startDate);
        const { value, unit } = interval;

        switch (unit) {
            case 'days':
                date.setDate(date.getDate() + value);
                break;
            case 'weeks':
                date.setDate(date.getDate() + (value * 7));
                break;
            case 'months':
                date.setMonth(date.getMonth() + value);
                break;
        }

        return date.toISOString();
    }

    static async getUpcomingTreatments(hoursAhead = 24) {
        try {
            const treatments = await this.getTreatments();
            const now = new Date();
            const threshold = new Date(now.getTime() + (hoursAhead * 60 * 60 * 1000));

            return treatments.filter(t => {
                const nextDate = new Date(t.nextDate);
                return nextDate <= threshold && nextDate >= now;
            });
        } catch (e) {
            if (__DEV__) { console.error('Error getting upcoming treatments:', e); }
            return [];
        }
    }

    // ==================== APPOINTMENTS (Consultas) ====================

    static async getAppointments(profileId = null) {
        try {
            const data = await Storage.getItem('@appointments');
            const allAppointments = data ? JSON.parse(data) : [];

            if (profileId) {
                return allAppointments.filter(a => a.profileId === profileId || !a.profileId);
            }
            return allAppointments;
        } catch (e) {
            if (__DEV__) { console.error('Error getting appointments:', e); }
            return [];
        }
    }

    static async saveAppointment(appointment) {
        try {
            const appointments = await this.getAppointments();
            const newAppointment = {
                id: Date.now().toString(),
                ...appointment,
                status: appointment.status || 'scheduled',
                createdAt: new Date().toISOString()
            };
            appointments.push(newAppointment);
            await Storage.setItem('@appointments', JSON.stringify(appointments));
            return newAppointment;
        } catch (e) {
            if (__DEV__) { console.error('Error saving appointment:', e); }
            throw e;
        }
    }

    static async updateAppointment(appointmentId, updates) {
        try {
            const appointments = await this.getAppointments();
            const index = appointments.findIndex(a => a.id === appointmentId);

            if (index !== -1) {
                appointments[index] = { ...appointments[index], ...updates };
                await Storage.setItem('@appointments', JSON.stringify(appointments));
                return appointments[index];
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error updating appointment:', e); }
            throw e;
        }
    }

    static async deleteAppointment(appointmentId) {
        try {
            const appointments = await this.getAppointments();
            const filtered = appointments.filter(a => a.id !== appointmentId);
            await Storage.setItem('@appointments', JSON.stringify(filtered));
        } catch (e) {
            if (__DEV__) { console.error('Error deleting appointment:', e); }
            throw e;
        }
    }

    static async getUpcomingAppointments(daysAhead = 7) {
        try {
            const appointments = await this.getAppointments();
            const now = new Date();
            const threshold = new Date(now.getTime() + (daysAhead * 24 * 60 * 60 * 1000));

            return appointments.filter(a => {
                if (a.status === 'cancelled') return false;
                const appointmentDate = new Date(a.date);
                return appointmentDate >= now && appointmentDate <= threshold;
            }).sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
            if (__DEV__) { console.error('Error getting upcoming appointments:', e); }
            return [];
        }
    }

    // ==================== PROCEDURES (Procedimentos) ====================

    static async getProcedures(profileId = null) {
        try {
            const data = await Storage.getItem('@procedures');
            const allProcedures = data ? JSON.parse(data) : [];

            if (profileId) {
                return allProcedures.filter(p => p.profileId === profileId || !p.profileId);
            }
            return allProcedures;
        } catch (e) {
            if (__DEV__) { console.error('Error getting procedures:', e); }
            return [];
        }
    }

    static async saveProcedure(procedure) {
        try {
            const procedures = await this.getProcedures();
            const newProcedure = {
                id: Date.now().toString(),
                ...procedure,
                status: procedure.status || 'scheduled',
                createdAt: new Date().toISOString()
            };
            procedures.push(newProcedure);
            await Storage.setItem('@procedures', JSON.stringify(procedures));
            return newProcedure;
        } catch (e) {
            if (__DEV__) { console.error('Error saving procedure:', e); }
            throw e;
        }
    }

    static async updateProcedure(procedureId, updates) {
        try {
            const procedures = await this.getProcedures();
            const index = procedures.findIndex(p => p.id === procedureId);

            if (index !== -1) {
                procedures[index] = { ...procedures[index], ...updates };
                await Storage.setItem('@procedures', JSON.stringify(procedures));
                return procedures[index];
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error updating procedure:', e); }
            throw e;
        }
    }

    static async deleteProcedure(procedureId) {
        try {
            const procedures = await this.getProcedures();
            const filtered = procedures.filter(p => p.id !== procedureId);
            await Storage.setItem('@procedures', JSON.stringify(filtered));
        } catch (e) {
            if (__DEV__) { console.error('Error deleting procedure:', e); }
            throw e;
        }
    }

    static async getUpcomingProcedures(daysAhead = 30) {
        try {
            const procedures = await this.getProcedures();
            const now = new Date();
            const threshold = new Date(now.getTime() + (daysAhead * 24 * 60 * 60 * 1000));

            return procedures.filter(p => {
                if (p.status === 'completed') return false;
                const procedureDate = new Date(p.date);
                return procedureDate >= now && procedureDate <= threshold;
            }).sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
            if (__DEV__) { console.error('Error getting upcoming procedures:', e); }
            return [];
        }
    }

    // ==================== MEDICAL HISTORY (Novo) ====================

    static async getMedicalHistory(profileId = null) {
        try {
            const data = await Storage.getItem('@medical_history');
            const allHistory = data ? JSON.parse(data) : [];

            if (profileId) {
                return allHistory.filter(h => h.profileId === profileId || !h.profileId);
            }
            return allHistory;
        } catch (e) {
            if (__DEV__) { console.error('Error getting medical history:', e); }
            return [];
        }
    }

    static async saveMedicalRecord(record) {
        try {
            const history = await this.getMedicalHistory();
            const newRecord = {
                id: Date.now().toString(),
                ...record,
                shareable: record.shareable !== undefined ? record.shareable : true,
                createdAt: new Date().toISOString()
            };
            history.push(newRecord);
            await Storage.setItem('@medical_history', JSON.stringify(history));
            return newRecord;
        } catch (e) {
            if (__DEV__) { console.error('Error saving medical record:', e); }
            throw e;
        }
    }

    static async deleteMedicalRecord(recordId) {
        try {
            const history = await this.getMedicalHistory();
            const filtered = history.filter(h => h.id !== recordId);
            await Storage.setItem('@medical_history', JSON.stringify(filtered));
        } catch (e) {
            if (__DEV__) { console.error('Error deleting medical record:', e); }
            throw e;
        }
    }

    static async toggleRecordShareable(recordId) {
        try {
            const history = await this.getMedicalHistory();
            const index = history.findIndex(h => h.id === recordId);

            if (index !== -1) {
                history[index].shareable = !history[index].shareable;
                await Storage.setItem('@medical_history', JSON.stringify(history));
                return history[index];
            }
            return null;
        } catch (e) {
            if (__DEV__) { console.error('Error toggling shareable:', e); }
            throw e;
        }
    }

    // ==================== HEALTH SUMMARY (Novo) ====================

    static async getHealthSummary(profileId) {
        try {
            const [medications, treatments, appointments, procedures, history] = await Promise.all([
                this.getMedications(profileId),
                this.getTreatments(profileId),
                this.getAppointments(profileId),
                this.getProcedures(profileId),
                this.getMedicalHistory(profileId)
            ]);

            return {
                medications,
                treatments,
                appointments,
                procedures,
                history,
                stats: {
                    totalMedications: medications.length,
                    activeTreatments: treatments.length,
                    upcomingAppointments: appointments.filter(a => a.status === 'scheduled').length,
                    upcomingProcedures: procedures.filter(p => p.status === 'scheduled').length,
                    recordsCount: history.length
                }
            };
        } catch (e) {
            if (__DEV__) { console.error('Error getting health summary:', e); }
            return null;
        }
    }

    // ==================== EXPORT/SHARE (Novo) ====================

    static async generateHealthReport(profileId, options = {}) {
        try {
            const summary = await this.getHealthSummary(profileId);
            const profile = await this._getProfileData(profileId);

            const {
                includeMedications = true,
                includeTreatments = true,
                includeHistory = true,
                onlyShareable = true
            } = options;

            let report = `*FICHA MÉDICA - VIGILARO CARE*\n\n`;
            report += `👤 *Nome:* ${profile?.nome || 'Não informado'}\n`;
            report += `📅 *Idade:* ${profile?.idade || '--'} anos\n`;
            report += `⏱️ *Data:* ${new Date().toLocaleDateString('pt-BR')}\n\n`;

            if (includeMedications && summary.medications.length > 0) {
                report += `💊 *MEDICAMENTOS ATUAIS*\n`;
                summary.medications.forEach(med => {
                    report += `  ▫️ ${med.name} ${med.dosage || ''}\n`;
                    if (med.schedule) {
                        report += `     ${med.schedule.frequency || ''}\n`;
                    }
                });
                report += `\n`;
            }

            if (includeTreatments && summary.treatments.length > 0) {
                report += `🩺 *TRATAMENTOS EM ANDAMENTO*\n`;
                summary.treatments.forEach(t => {
                    report += `  ▫️ ${t.name} - A cada ${t.interval.value} ${this._translateUnit(t.interval.unit)}\n`;
                    if (t.nextDate) report += `     Próxima: ${new Date(t.nextDate).toLocaleDateString('pt-BR')}\n`;
                });
                report += `\n`;
            }

            if (summary.appointments && summary.appointments.length > 0) {
                report += `🗓️ *CONSULTAS*\n`;
                summary.appointments.forEach(a => {
                    const statusText = a.status === 'completed' ? '✅' : '⏳';
                    report += `  ▫️ ${a.name} com ${a.doctor || 'Dr(a)'} ${statusText}\n`;
                    report += `     Data: ${new Date(a.date).toLocaleDateString('pt-BR')} às ${new Date(a.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n`;
                    if (a.postNotes?.recommendations) report += `     Notas: ${a.postNotes.recommendations}\n`;
                });
                report += `\n`;
            }

            if (summary.procedures && summary.procedures.length > 0) {
                report += `🏥 *PROCEDIMENTOS*\n`;
                summary.procedures.forEach(p => {
                    const statusText = p.status === 'completed' ? '✅' : '⏳';
                    report += `  ▫️ ${p.name || p.type} ${statusText}\n`;
                    report += `     Data: ${new Date(p.date).toLocaleDateString('pt-BR')} às ${new Date(p.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n`;
                });
                report += `\n`;
            }

            if (includeHistory && summary.history.length > 0) {
                const shareableHistory = onlyShareable
                    ? summary.history.filter(h => h.shareable)
                    : summary.history;

                if (shareableHistory.length > 0) {
                    report += `🗂️ *HISTÓRICO MÉDICO / DOSSIÊ*\n`;
                    shareableHistory.forEach(h => {
                        report += `  ▫️ [${this._translateCategory(h.category)}] ${h.description}\n`;
                    });
                    report += `\n`;
                }
            }

            report += `_Gerado pelo app Vigilaro Care em: ${new Date().toLocaleString('pt-BR')}_\n`;

            return report;
        } catch (e) {
            if (__DEV__) { console.error('Error generating health report:', e); }
            throw e;
        }
    }

    static _translateUnit(unit) {
        const map = {
            'days': 'dias',
            'weeks': 'semanas',
            'months': 'meses'
        };
        return map[unit] || unit;
    }

    static _translateCategory(category) {
        const map = {
            'alergia': 'Alergia',
            'cirurgia': 'Cirurgia',
            'condicao_cronica': 'Condição Crônica',
            'vacina': 'Vacina',
            'exame': 'Exame'
        };
        return map[category] || category;
    }

    static async _getProfileData(profileId) {
        try {
            const data = await Storage.getItem('@profiles_data');
            const profilesData = data ? JSON.parse(data) : { perfis: [] };
            return profilesData.perfis.find(p => p.id === profileId);
        } catch (e) {
            if (__DEV__) { console.error('Error getting profile data:', e); }
            return null;
        }
    }
}

export default HealthService;
