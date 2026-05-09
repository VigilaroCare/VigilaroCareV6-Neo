/**
 * delay_guidance.js
 * Tabela de condutas clínicas para atrasos na tomada de medicamentos.
 * Baseado em protocolos de adesão terapêutica (OMS), farmacologia clínica
 * e orientações gerais de bulas farmacêuticas.
 *
 * ⚠️ DISCLAIMER: Estas orientações são GENÉRICAS e EDUCATIVAS.
 *    Não substituem orientação médica profissional.
 *
 * Tactical Calm Design System — VigilaroCare 2026
 */

export const DELAY_OPTIONS = [
    { key: '15', minutes: 15, label: '15 min', label_en: '15 min', label_es: '15 min' },
    { key: '30', minutes: 30, label: '30 min', label_en: '30 min', label_es: '30 min' },
    { key: '60', minutes: 60, label: '1 hora', label_en: '1 hour', label_es: '1 hora' },
    { key: '120', minutes: 120, label: '2 horas', label_en: '2 hours', label_es: '2 horas' },
    { key: '240', minutes: 240, label: '4 horas', label_en: '4 hours', label_es: '4 horas' },
    { key: 'more', minutes: 300, label: 'Mais de 4h', label_en: 'More than 4h', label_es: 'Más de 4h' },
];

/**
 * Retorna a orientação clínica baseada no tempo de atraso em minutos.
 * @param {number} delayMinutes - Atraso em minutos
 * @returns {object} { level, color, bgColor, icon, title, message, disclaimer }
 */
export function getDelayGuidance(delayMinutes) {
    if (delayMinutes <= 15) {
        return {
            level: 'minimal',
            color: '#059669',
            bgColor: '#ECFDF5',
            borderColor: '#A7F3D0',
            icon: 'TickCircle',
            title: 'Atraso mínimo',
            title_en: 'Minimal delay',
            title_es: 'Retraso mínimo',
            message: 'Atrasos de até 15 minutos geralmente não comprometem a eficácia do medicamento. A concentração terapêutica é mantida dentro da janela segura.',
            message_en: 'Delays of up to 15 minutes generally do not compromise medication effectiveness. The therapeutic concentration is maintained within the safe window.',
            message_es: 'Retrasos de hasta 15 minutos generalmente no comprometen la eficacia del medicamento. La concentración terapéutica se mantiene dentro de la ventana segura.',
            riskDetails: 'A maioria dos medicamentos possui uma margem de tolerância que absorve pequenas variações no horário da tomada.',
            riskDetails_en: 'Most medications have a tolerance margin that absorbs small variations in the time of administration.',
            riskDetails_es: 'La mayoría de los medicamentos tienen un margen de tolerancia que absorbe pequeñas variaciones en el horario de toma.',
        };
    }

    if (delayMinutes <= 30) {
        return {
            level: 'low',
            color: '#D97706',
            bgColor: '#FFFBEB',
            borderColor: '#FDE68A',
            icon: 'InfoCircle',
            title: 'Atraso baixo',
            title_en: 'Low delay',
            title_es: 'Retraso bajo',
            message: 'Tome o medicamento assim que possível. Para a maioria dos tratamentos, atrasos de até 30 minutos não comprometem significativamente o resultado terapêutico.',
            message_en: 'Take the medication as soon as possible. For most treatments, delays of up to 30 minutes do not significantly compromise the therapeutic outcome.',
            message_es: 'Tome el medicamento lo antes posible. Para la mayoría de los tratamientos, retrasos de hasta 30 minutos no comprometen significativamente el resultado terapéutico.',
            riskDetails: 'Medicamentos com intervalo curto (4-6h), como analgésicos e anti-inflamatórios, podem apresentar redução temporária do efeito. Mantenha o próximo horário conforme prescrito.',
            riskDetails_en: 'Medications with short intervals (4-6h), such as analgesics and anti-inflammatory drugs, may show a temporary reduction in effect. Keep the next scheduled time as prescribed.',
            riskDetails_es: 'Medicamentos con intervalos cortos (4-6h), como analgésicos y antiinflamatorios, pueden presentar una reducción temporal del efecto. Mantenga el próximo horario según lo prescrito.',
        };
    }

    if (delayMinutes <= 120) {
        return {
            level: 'moderate',
            color: '#EA580C',
            bgColor: '#FFF7ED',
            borderColor: '#FED7AA',
            icon: 'Warning2',
            title: 'Atraso moderado — Atenção',
            title_en: 'Moderate delay — Attention',
            title_es: 'Retraso moderado — Atención',
            message: 'A concentração do medicamento no sangue pode ter caído abaixo do nível terapêutico ideal. Tome a dose agora, mas NÃO dobre a dose para compensar o atraso.',
            message_en: 'The medication concentration in your blood may have dropped below the optimal therapeutic level. Take the dose now, but DO NOT double the dose to compensate for the delay.',
            message_es: 'La concentración del medicamento en la sangre puede haber caído por debajo del nivel terapéutico óptimo. Tome la dosis ahora, pero NO duplique la dosis para compensar el retraso.',
            riskDetails: '• Antibióticos: Atrasos podem favorecer resistência bacteriana.\n• Anti-hipertensivos: Risco de picos de pressão.\n• Anticoncepcionais: Eficácia pode ser reduzida.\n• Anticonvulsivantes: Risco de crises em pacientes epiléticos.\n\nO horário da próxima dose será ajustado automaticamente.',
            riskDetails_en: '• Antibiotics: Delays may promote bacterial resistance.\n• Antihypertensives: Risk of blood pressure spikes.\n• Contraceptives: Effectiveness may be reduced.\n• Anticonvulsants: Risk of seizures in epileptic patients.\n\nThe next dose time will be automatically adjusted.',
            riskDetails_es: '• Antibióticos: Los retrasos pueden favorecer la resistencia bacteriana.\n• Antihipertensivos: Riesgo de picos de presión.\n• Anticonceptivos: La eficacia puede reducirse.\n• Anticonvulsivos: Riesgo de crisis en pacientes epilépticos.\n\nEl horario de la próxima dosis se ajustará automáticamente.',
        };
    }

    if (delayMinutes <= 240) {
        return {
            level: 'high',
            color: '#DC2626',
            bgColor: '#FEF2F2',
            borderColor: '#FECACA',
            icon: 'Danger',
            title: 'Atraso significativo — Risco elevado',
            title_en: 'Significant delay — High risk',
            title_es: 'Retraso significativo — Riesgo elevado',
            message: 'Atrasos de 2 a 4 horas podem comprometer seriamente a eficácia do tratamento. Para medicamentos de uso contínuo, a interrupção do nível terapêutico pode ter consequências clínicas.',
            message_en: 'Delays of 2 to 4 hours can seriously compromise treatment effectiveness. For continuous-use medications, the interruption of the therapeutic level may have clinical consequences.',
            message_es: 'Retrasos de 2 a 4 horas pueden comprometer seriamente la eficacia del tratamiento. Para medicamentos de uso continuo, la interrupción del nivel terapéutico puede tener consecuencias clínicas.',
            riskDetails: '• NÃO tome dose dobrada para compensar.\n• Se próximo ao horário da dose seguinte, pode ser preferível pular esta dose.\n• Medicamentos com janela terapêutica estreita (ex: anticoagulantes, imunossupressores) exigem atenção redobrada.\n\n⚕️ Recomendação: Consulte a bula ou entre em contato com seu farmacêutico para orientação sobre seu medicamento específico.',
            riskDetails_en: '• DO NOT take a double dose to compensate.\n• If close to the next scheduled dose, it may be preferable to skip this dose.\n• Medications with a narrow therapeutic window (e.g., anticoagulants, immunosuppressants) require extra attention.\n\n⚕️ Recommendation: Check the package insert or contact your pharmacist for guidance on your specific medication.',
            riskDetails_es: '• NO tome dosis doble para compensar.\n• Si está cerca del horario de la próxima dosis, puede ser preferible omitir esta dosis.\n• Medicamentos con ventana terapéutica estrecha (ej: anticoagulantes, inmunosupresores) requieren atención especial.\n\n⚕️ Recomendación: Consulte el prospecto o contacte a su farmacéutico para orientación sobre su medicamento específico.',
        };
    }

    // > 4 horas
    return {
        level: 'critical',
        color: '#991B1B',
        bgColor: '#FEF2F2',
        borderColor: '#F87171',
        icon: 'Danger',
        title: 'Atraso crítico — Consulte seu médico',
        title_en: 'Critical delay — Consult your doctor',
        title_es: 'Retraso crítico — Consulte a su médico',
        message: 'Atrasos superiores a 4 horas representam risco significativo para a maioria dos tratamentos. A decisão de tomar ou pular a dose depende do tipo de medicamento e deve ser avaliada por um profissional de saúde.',
        message_en: 'Delays exceeding 4 hours represent a significant risk for most treatments. The decision to take or skip the dose depends on the type of medication and should be evaluated by a healthcare professional.',
        message_es: 'Retrasos superiores a 4 horas representan un riesgo significativo para la mayoría de los tratamientos. La decisión de tomar u omitir la dosis depende del tipo de medicamento y debe ser evaluada por un profesional de salud.',
        riskDetails: '• Alguns medicamentos NÃO devem ser tomados com tanto atraso.\n• Para antibióticos: a falha pode comprometer todo o ciclo de tratamento.\n• Para medicamentos cardiovasculares: risco de eventos adversos.\n• Para insulina: risco de descompensação glicêmica.\n\n🚨 IMPORTANTE: Entre em contato com seu médico ou farmacêutico antes de tomar a dose com este nível de atraso.',
        riskDetails_en: '• Some medications SHOULD NOT be taken with such a delay.\n• For antibiotics: the failure may compromise the entire treatment cycle.\n• For cardiovascular medications: risk of adverse events.\n• For insulin: risk of glycemic decompensation.\n\n🚨 IMPORTANT: Contact your doctor or pharmacist before taking the dose with this level of delay.',
        riskDetails_es: '• Algunos medicamentos NO deben tomarse con tanto retraso.\n• Para antibióticos: la falla puede comprometer todo el ciclo de tratamiento.\n• Para medicamentos cardiovasculares: riesgo de eventos adversos.\n• Para insulina: riesgo de descompensación glucémica.\n\n🚨 IMPORTANTE: Contacte a su médico o farmacéutico antes de tomar la dosis con este nivel de retraso.',
    };
}

/**
 * Disclaimer médico — exibido no rodapé de todas as orientações.
 */
export const MEDICAL_DISCLAIMER = {
    text: 'Este aplicativo não substitui orientação médica profissional. As informações apresentadas são de caráter educativo e genérico. Em caso de dúvidas sobre o impacto do atraso no seu tratamento específico, consulte seu médico ou farmacêutico.',
    text_en: 'This application does not replace professional medical guidance. The information presented is educational and generic. If in doubt about the impact of the delay on your specific treatment, consult your doctor or pharmacist.',
    text_es: 'Esta aplicación no sustituye la orientación médica profesional. La información presentada es de carácter educativo y genérico. En caso de dudas sobre el impacto del retraso en su tratamiento específico, consulte a su médico o farmacéutico.',
};
