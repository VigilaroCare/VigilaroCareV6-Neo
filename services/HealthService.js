/**
 * HealthService — camada de LEITURA de saúde sobre o PERFIL.
 *
 * Doutrina (fase de subtração, 2026-06): o Vigilaro não gerencia saúde — ele lê
 * do perfil o que CALIBRA o risco da casa. Os dados de saúde-de-risco
 * (medicamentos em uso, condições médicas, necessidades especiais) são
 * capturados no fluxo de perfil (AddPerfil / NewHomeWizard) e cruzados pelo
 * motor de risco (RiskInterpreterService / ProfileFilterEngine).
 *
 * O antigo PHR (scheduler de medicação, exames, consultas, procedimentos,
 * prontuário, SaúdePet) foi removido. Este service apenas EXPÕE os campos do
 * perfil para os dois consumidores legítimos:
 *   - SafetyReportService (Relatório) — healthContext: polifarmácia → risco de queda
 *   - SOSEmergencyModeScreenNeo (Ficha Médica de Emergência)
 *
 * `profile.medicamentosEmUso` é um array de strings (nomes). Normalizamos para
 * `{ nome }` porque é o shape que Relatório e SOS já esperam.
 */
class HealthService {

    static async _getProfile(profileId = null) {
        try {
            const ProfileService = require('./ProfileService').default;
            if (!profileId) return await ProfileService.getPerfilAtivo();
            const all = await ProfileService.getAllPerfis();
            return all.find(p => p.id === profileId) || null;
        } catch (e) {
            if (__DEV__) { console.error('HealthService._getProfile error:', e); }
            return null;
        }
    }

    static _normalizeMeds(meds) {
        return (meds || []).map(m => (typeof m === 'string' ? { nome: m } : m));
    }

    static async getMedications(profileId = null) {
        const profile = await this._getProfile(profileId);
        return this._normalizeMeds(profile?.medicamentosEmUso);
    }

    // Tratamentos e histórico médico não são mais gerenciados pelo app.
    // Mantidos como [] para compatibilidade com o Relatório (saúde é opcional).
    static async getTreatments() { return []; }
    static async getMedicalHistory() { return []; }

    // Resumo consumido pela Ficha Médica de Emergência (SOS).
    static async getHealthSummary(profileId) {
        const profile = await this._getProfile(profileId);
        if (!profile) return null;

        const medications = this._normalizeMeds(profile.medicamentosEmUso);
        const conditions = profile.condicoesMedicas || [];
        const specialNeeds = profile.necessidadesEspeciais || [];

        return {
            medications,
            conditions,
            specialNeeds,
            // Campos legados de PHR — sempre vazios após a subtração.
            treatments: [],
            appointments: [],
            procedures: [],
            history: [],
            stats: {
                totalMedications: medications.length,
                conditionsCount: conditions.length,
                specialNeedsCount: specialNeeds.length,
            },
        };
    }
}

export default HealthService;
