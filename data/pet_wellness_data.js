/**
 * pet_wellness_data.js
 * Dados para o Hub de Bem-Estar Pet (Vigilaro Care V6 Neo)
 * Foco: Cuidados preventivos, rotina e enriquecimento ambiental.
 */

export const PET_WELLNESS_DATA = {
    categorias: [
        {
            id: 'vacinacao',
            titulo: 'Vacinação', titulo_en: 'Vaccination', titulo_es: 'Vacunación',
            icone: 'medical-outline',
            cor: '#03A9F4',
            dicas: [
                {
                    pet: 'Cães', pet_en: 'Dogs', pet_es: 'Perros',
                    texto: 'V8/V10 (cinomose, parvovirose, etc.) + Antirrábica.',
                    texto_en: 'V8/V10 (distemper, parvovirus, etc.) + Rabies.',
                    texto_es: 'V8/V10 (moquillo, parvovirus, etc.) + Antirrábica.'
                },
                {
                    pet: 'Gatos', pet_en: 'Cats', pet_es: 'Gatos',
                    texto: 'V3/V4/V5 (rinotraqueíte, calicivirose, panleucopenia) + Antirrábica.',
                    texto_en: 'V3/V4/V5 (rhinotracheitis, calicivirus, panleukopenia) + Rabies.',
                    texto_es: 'V3/V4/V5 (rinotraqueítis, calicivirus, panleucopenia) + Antirrábica.'
                },
                {
                    pet: 'Rotina', pet_en: 'Routine', pet_es: 'Rutina',
                    texto: 'Manter carteira de vacinação atualizada. Reforço anual obrigatório.',
                    texto_en: 'Keep vaccination card updated. Mandatory annual booster.',
                    texto_es: 'Mantener al día la cartilla de vacunación. Refuerzo anual obligatorio.'
                }
            ]
        },
        {
            id: 'vermifugacao',
            titulo: 'Vermifugação', titulo_en: 'Deworming', titulo_es: 'Desparasitación',
            icone: 'bug-outline',
            cor: '#4CAF50',
            dicas: [
                {
                    pet: 'Filhotes', pet_en: 'Puppies/Kittens', pet_es: 'Cachorros',
                    texto: 'A cada 15 dias até 3 meses, depois mensal até 6 meses.',
                    texto_en: 'Every 15 days until 3 months, then monthly until 6 months.',
                    texto_es: 'Cada 15 días hasta los 3 meses, luego mensual hasta los 6 meses.'
                },
                {
                    pet: 'Adultos', pet_en: 'Adults', pet_es: 'Adultos',
                    texto: 'A cada 3-6 meses conforme orientação veterinária. Sempre pesar o animal antes de vermifugar.',
                    texto_en: 'Every 3-6 months as per vet guidance. Always weigh the animal before deworming.',
                    texto_es: 'Cada 3-6 meses según orientación veterinaria. Siempre pesar al animal antes de desparasitar.'
                }
            ]
        },
        {
            id: 'cuidados_gerais',
            titulo: 'Cuidados Gerais', titulo_en: 'General Care', titulo_es: 'Cuidados Generales',
            icone: 'heart-outline',
            cor: '#FF9800',
            dicas: [
                {
                    pet: 'Banho', pet_en: 'Bath', pet_es: 'Baño',
                    texto: 'A cada 15-30 dias (cães). Gatos raramente precisam.',
                    texto_en: 'Every 15-30 days (dogs). Cats rarely need it.',
                    texto_es: 'Cada 15-30 días (perros). Los gatos rara vez lo necesitan.'
                },
                {
                    pet: 'Unhas e Dentes', pet_en: 'Nails and Teeth', pet_es: 'Uñas y Dientes',
                    texto: 'Aparar regularmente unhas. Escovação regular ou petiscos dentais para os dentes.',
                    texto_en: 'Trim nails regularly. Regular brushing or dental treats for teeth.',
                    texto_es: 'Recortar las uñas regularmente. Cepillado regular o golosinas dentales para los dientes.'
                },
                {
                    pet: 'Exercício e Castração', pet_en: 'Exercise and Neutering', pet_es: 'Ejercicio y Castración',
                    texto: 'Passeios diários (cães). Brinquedos interativos (gatos). Castração previne doenças e comportamentos indesejados.',
                    texto_en: 'Daily walks (dogs). Interactive toys (cats). Neutering prevents diseases and unwanted behaviors.',
                    texto_es: 'Paseos diarios (perros). Juguetes interactivos (gatos). La castración previene enfermedades y comportamientos no deseados.'
                }
            ]
        },
        {
            id: 'sinais_alerta',
            titulo: 'Sinais de Alerta', titulo_en: 'Warning Signs', titulo_es: 'Signos de Alerta',
            icone: 'alert-circle-outline',
            cor: '#E91E63',
            dicas: [
                {
                    pet: 'Levar ao veterinário', pet_en: 'Take to vet', pet_es: 'Llevar al veterinario',
                    texto: 'Recusa de alimento por mais de 24h. Vômitos ou diarreia persistentes. Apatia ou isolamento.',
                    texto_en: 'Refusal of food for >24h. Persistent vomiting or diarrhea. Apathy or isolation.',
                    texto_es: 'Rechazo de alimento por >24h. Vómitos o diarrea persistentes. Apatía o aislamiento.'
                },
                {
                    pet: 'Urgência', pet_en: 'Urgency', pet_es: 'Urgencia',
                    texto: 'Dificuldade para urinar ou fezes com sangue. Tosse persistente ou dificuldade respiratória.',
                    texto_en: 'Difficulty urinating or bloody stools. Persistent cough or breathing difficulty.',
                    texto_es: 'Dificultad para orinar o heces con sangre. Tos persistente o dificultad respiratoria.'
                }
            ]
        }
    ]
};

