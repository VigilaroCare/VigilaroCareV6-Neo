/**
 * dose_atrasada.js — "Atrasou ou esqueceu uma dose?" (22/10/2026)
 *
 * POR QUE VOLTOU, E COM ESTA FORMA
 * O app ja teve uma tabela de "conduta por tempo de atraso" (delay_guidance.js:
 * 15 min / 30 min / 2 h / 4 h, "tome a dose agora", "pode ser preferivel pular").
 * Saiu porque afirmava demais: a janela segura varia de remedio para remedio, e
 * "atraso minimo, sem problema" pode ser falso para anticoagulante ou insulina.
 * O Agnaldo pediu a orientacao de volta — "recomendar que seja consultado o
 * medico ou profissional de saude responsavel quando for o caso".
 *
 * A regra desta versao: o app NAO decide pelo usuario. Ele aponta para a fonte
 * que vale para aquele remedio (a bula — no Brasil, a secao padronizada "O que
 * devo fazer quando eu me esquecer de usar este medicamento?"), diz o que as
 * bulas costumam orientar com vocabulo de cautela ("em geral", "confirme"), da
 * as regras que valem para todos (nao dobrar a dose) e encaminha ao medico, ao
 * farmaceutico, ao centro de intoxicacao ou a emergencia quando e o caso.
 *
 * Lido com t_field(): o texto passa por resolveEmergencyTokensDeep, que troca
 * {{EMERGENCY_MEDICAL}} e {{POISON_CONTROL}} pelos servicos do pais do usuario.
 */

export const DOSE_ATRASADA = {
    titulo: 'Atrasou ou esqueceu uma dose?',
    titulo_ptpt: 'Atrasou-se ou esqueceu-se de uma dose?',
    titulo_es: '¿Se retrasó u olvidó una dosis?',
    titulo_en: 'Late or missed a dose?',

    intro: 'O que fazer depende do remédio. A bula traz a orientação para aquele medicamento — no Brasil, na seção "O que devo fazer quando eu me esquecer de usar este medicamento?". Se tiver dúvida, fale com o médico ou o profissional de saúde responsável pelo tratamento, ou com o farmacêutico.',
    intro_ptpt: 'O que fazer depende do medicamento. O folheto informativo traz a indicação para esse medicamento, na secção sobre o que fazer caso se esqueça de tomar. Se tiver dúvidas, fale com o médico ou o profissional de saúde responsável pelo tratamento, ou com o farmacêutico.',
    intro_es: 'Qué hacer depende del medicamento. El prospecto trae la indicación para ese medicamento, en el apartado sobre qué hacer si olvidó tomar una dosis. Si tiene dudas, consulte al médico o al profesional de salud responsable del tratamiento, o al farmacéutico.',
    intro_en: 'What to do depends on the medicine. The patient information leaflet gives the advice for that medicine, in the section on what to do if you forget a dose. If in doubt, ask the doctor or health professional in charge of the treatment, or a pharmacist.',

    pergunta: 'Quanto falta para o próximo horário?',
    pergunta_ptpt: 'Quanto falta para a próxima toma?',
    pergunta_es: '¿Cuánto falta para la próxima toma?',
    pergunta_en: 'How long until the next dose?',

    opcoes: [
        {
            id: 'longe',
            rotulo: 'Ainda falta bastante',
            rotulo_ptpt: 'Ainda falta bastante',
            rotulo_es: 'Todavía falta bastante',
            rotulo_en: 'Still a while',
            texto: 'Em geral, as bulas orientam tomar a dose esquecida assim que lembrar e seguir os próximos horários normalmente. Confirme na bula do seu remédio — há medicamentos com regra diferente.',
            texto_ptpt: 'Em geral, os folhetos indicam tomar a dose esquecida assim que se lembrar e manter as tomas seguintes no horário habitual. Confirme no folheto do seu medicamento — há medicamentos com regras diferentes.',
            texto_es: 'En general, los prospectos indican tomar la dosis olvidada en cuanto lo recuerde y seguir con las siguientes en su horario habitual. Confírmelo en el prospecto de su medicamento: hay medicamentos con reglas distintas.',
            texto_en: 'In general, leaflets say to take the missed dose as soon as you remember and carry on with the next doses at the usual times. Check your medicine\'s leaflet — some medicines have different rules.',
        },
        {
            id: 'perto',
            rotulo: 'Já está perto',
            rotulo_ptpt: 'Já está perto',
            rotulo_es: 'Ya está cerca',
            rotulo_en: 'Coming up soon',
            texto: 'Em geral, quando já está perto do próximo horário, as bulas orientam não tomar a dose esquecida e seguir no horário normal. Confirme na bula do seu remédio e, se tiver dúvida, fale com o médico ou o farmacêutico antes de decidir.',
            texto_ptpt: 'Em geral, quando já está perto da toma seguinte, os folhetos indicam não tomar a dose esquecida e manter o horário habitual. Confirme no folheto do seu medicamento e, se tiver dúvidas, fale com o médico ou o farmacêutico antes de decidir.',
            texto_es: 'En general, cuando ya está cerca la siguiente toma, los prospectos indican no tomar la dosis olvidada y seguir con el horario habitual. Confírmelo en el prospecto de su medicamento y, si tiene dudas, consulte al médico o al farmacéutico antes de decidir.',
            texto_en: 'In general, when the next dose is coming up soon, leaflets say to skip the missed dose and carry on at the usual time. Check your medicine\'s leaflet and, if in doubt, ask the doctor or a pharmacist before deciding.',
        },
    ],

    regrasTitulo: 'Vale para todos os remédios',
    regrasTitulo_ptpt: 'Vale para todos os medicamentos',
    regrasTitulo_es: 'Vale para todos los medicamentos',
    regrasTitulo_en: 'For every medicine',
    regras: [
        'Não tome duas doses juntas para compensar a esquecida, a não ser que o médico tenha orientado assim.',
        'Não mude por conta própria os horários nem a quantidade prescrita.',
        'Anote o atraso ou a dose esquecida e conte ao médico na próxima consulta — e ao cuidador ou responsável, se houver.',
    ],
    regras_ptpt: [
        'Não tome duas doses juntas para compensar a esquecida, a não ser que o médico o tenha indicado.',
        'Não altere por sua conta os horários nem a quantidade prescrita.',
        'Registe o atraso ou a dose esquecida e conte ao médico na próxima consulta — e ao cuidador ou responsável, se houver.',
    ],
    regras_es: [
        'No tome dos dosis juntas para compensar la olvidada, salvo que el médico lo haya indicado.',
        'No cambie por su cuenta los horarios ni la cantidad prescrita.',
        'Anote el retraso o la dosis olvidada y cuénteselo al médico en la próxima consulta, y al cuidador o responsable, si lo hay.',
    ],
    regras_en: [
        'Do not take two doses together to make up for the missed one, unless the doctor has told you to.',
        'Do not change the times or the prescribed amount on your own.',
        'Note the late or missed dose and tell the doctor at the next appointment — and the carer or guardian, if there is one.',
    ],

    atencaoTitulo: 'Fale com o médico ou o farmacêutico antes de decidir',
    atencaoTitulo_ptpt: 'Fale com o médico ou o farmacêutico antes de decidir',
    atencaoTitulo_es: 'Consulte al médico o al farmacéutico antes de decidir',
    atencaoTitulo_en: 'Ask the doctor or a pharmacist before deciding',
    atencao: 'Alguns remédios pedem horário rigoroso, e o atraso pode trazer consequências. Entre eles: anticoagulantes, insulina e outros remédios para diabetes, remédios para convulsão, para o coração ou a pressão, anticoncepcionais, antibióticos e imunossupressores.',
    atencao_ptpt: 'Alguns medicamentos exigem horário rigoroso, e o atraso pode trazer consequências. Entre eles: anticoagulantes, insulina e outros medicamentos para a diabetes, medicamentos para convulsões, para o coração ou a tensão arterial, contracetivos, antibióticos e imunossupressores.',
    atencao_es: 'Algunos medicamentos requieren un horario estricto, y el retraso puede tener consecuencias. Entre ellos: anticoagulantes, insulina y otros medicamentos para la diabetes, medicamentos para las convulsiones, para el corazón o la presión arterial, anticonceptivos, antibióticos e inmunosupresores.',
    atencao_en: 'Some medicines need strict timing, and a delay can have consequences. These include anticoagulants, insulin and other diabetes medicines, medicines for seizures, the heart or blood pressure, contraceptives, antibiotics and immunosuppressants.',

    doseAMais: 'Tomou dose a mais por engano? Ligue para o {{POISON_CONTROL}} e tenha a embalagem do remédio em mãos.',
    doseAMais_ptpt: 'Tomou uma dose a mais por engano? Ligue para o {{POISON_CONTROL}} e tenha a embalagem do medicamento à mão.',
    doseAMais_es: '¿Tomó una dosis de más por error? Llame a {{POISON_CONTROL}} y tenga a mano el envase del medicamento.',
    doseAMais_en: 'Took an extra dose by mistake? Call {{POISON_CONTROL}} and have the medicine packaging to hand.',

    urgencia: 'Se a pessoa passar mal — falta de ar, dor no peito, desmaio, convulsão ou confusão —, ligue para o {{EMERGENCY_MEDICAL}} ou procure atendimento imediatamente.',
    urgencia_ptpt: 'Se a pessoa se sentir mal — falta de ar, dor no peito, desmaio, convulsão ou confusão —, ligue para o {{EMERGENCY_MEDICAL}} ou procure assistência de imediato.',
    urgencia_es: 'Si la persona se siente mal — falta de aire, dolor en el pecho, desmayo, convulsión o confusión —, llame a {{EMERGENCY_MEDICAL}} o busque atención de inmediato.',
    urgencia_en: 'If the person feels unwell — shortness of breath, chest pain, fainting, a seizure or confusion — call {{EMERGENCY_MEDICAL}} or get medical help straight away.',

    aviso: 'Orientação geral e informativa. Não substitui a avaliação do médico ou do profissional de saúde responsável pelo tratamento.',
    aviso_ptpt: 'Informação geral. Não substitui a avaliação do médico ou do profissional de saúde responsável pelo tratamento.',
    aviso_es: 'Información general. No sustituye la valoración del médico o del profesional de salud responsable del tratamiento.',
    aviso_en: 'General information only. It does not replace the assessment of the doctor or health professional in charge of the treatment.',
};
