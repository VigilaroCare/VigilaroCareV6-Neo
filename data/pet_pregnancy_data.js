/**
 * pet_pregnancy_data.js
 * Dados para o Guia de Prenhez
 */

export const PET_PREGNANCY_DATA = {
    sections: [
        {
            id: 'sinais',
            title: 'Sinais de Gestação', title_en: 'Signs of Pregnancy', title_es: 'Signos de Preñez',
            icon: 'search',
            color: '#E91E63',
            items: [
                { text: 'Aumento do apetite', text_en: 'Increased appetite', text_es: 'Aumento del apetito' },
                { text: 'Aumento abdominal (mais visível a partir da 4ª semana)', text_en: 'Abdomen enlargement (after 3-4 weeks)', text_es: 'Aumento del abdomen (después de 3-4 semanas)' },
                { text: 'Mamilos mais rosados e inchados', text_en: 'Swollen and pink nipples', text_es: 'Mamas hinchadas y rosadas' },
                { text: 'Comportamento mais calmo ou carinhoso', text_en: 'Behavioral changes (more affectionate or isolated)', text_es: 'Cambios de comportamiento (más cariñosa o aislada)' },
                { text: 'Duração média: Cadelas 58-68 dias / Gatas 60-67 dias', text_en: 'Average duration: Dogs 58-68 days / Cats 60-67 days', text_es: 'Duración media: Perras 58-68 días / Gatas 60-67 días' }
            ]
        },
        {
            id: 'gestacao',
            title: 'Período de Gestação', title_en: 'Gestation Period', title_es: 'Período de Gestación',
            icon: 'calendar',
            color: '#2196F3',
            items: [
                { text: '🐕 Cadelas: 58-68 dias (média 63 dias)', text_en: '🐕 Dogs: 58-68 days (average 63 days)', text_es: '🐕 Perras: 58-68 días (promedio 63 días)' },
                { text: '🐈 Gatas: 63-65 dias (média 64 dias)', text_en: '🐈 Cats: 63-65 days (average 64 days)', text_es: '🐈 Gatas: 63-65 días (promedio 64 días)' },
                { text: 'Variações são normais', text_en: 'Variations are normal', text_es: 'Las variaciones son normales' },
                { text: 'Consulte veterinário se passar de 70 dias', text_en: 'Consult a vet if it exceeds 70 days', text_es: 'Consulte al veterinario si supera los 70 días' }
            ]
        },
        {
            id: 'cuidados',
            title: 'Cuidados Durante a Gestação', title_en: 'Care During Gestation', title_es: 'Cuidados Durante la Gestación',
            icon: 'heart',
            color: '#4CAF50',
            items: [
                { text: 'Alimentação de qualidade (ração para filhotes tem mais calorias)', text_en: 'High-quality food (puppy food has more calories)', text_es: 'Alimentación de calidad (comida para cachorros tiene más calorías)' },
                { text: 'Consultas veterinárias regulares', text_en: 'Regular vet check-ups', text_es: 'Consultas veterinarias regulares' },
                { text: 'Evitar exercícios intensos', text_en: 'Avoid intense exercise', text_es: 'Evitar ejercicios intensos' },
                { text: 'Preparar o "ninho" em local tranquilo, quente e limpo', text_en: 'Prepare the "nest" in a quiet, warm, and clean place', text_es: 'Preparar el "nido" en un lugar tranquilo, cálido y limpio' },
                { text: 'Não administrar medicamentos sem orientação veterinária', text_en: 'Do not administer medication without veterinary guidance', text_es: 'No administrar medicamentos sin orientación veterinaria' }
            ]
        },
        {
            id: 'parto',
            title: 'Sinais do Parto Próximo', title_en: 'Signs of Imminent Birth', title_es: 'Signos de Parto Próximo',
            icon: 'alert-circle',
            color: '#FF9800',
            items: [
                { text: 'Queda de temperatura corporal (24-48h antes)', text_en: 'Drop in body temperature (24-48h before)', text_es: 'Caída de temperatura corporal (24-48h antes)' },
                { text: 'Comportamento de ninho (cavar, arranhar)', text_en: 'Nesting behavior (digging, scratching)', text_es: 'Comportamiento de nido (cavar, rascar)' },
                { text: 'Perda de apetite', text_en: 'Loss of appetite', text_es: 'Pérdida de apetito' },
                { text: 'Inquietação e ofegância', text_en: 'Restlessness and panting', text_es: 'Inquietud y jadeo' },
                { text: 'Contrações abdominais visíveis', text_en: 'Visible abdominal contractions', text_es: 'Contracciones abdominales visibles' },
                { text: 'Secreção vaginal clara ou esverdeada', text_en: 'Clear or greenish vaginal discharge', text_es: 'Secreción vaginal clara o verdosa' }
            ]
        },
        {
            id: 'pos_parto',
            title: 'Cuidados com Filhotes', title_en: 'Care for Newborns', title_es: 'Cuidados con Cachorros',
            icon: 'checkmark-circle',
            color: '#9C27B0',
            items: [
                { text: 'Manter aquecidos (filhotes não regulam temperatura sozinhos)', text_en: 'Keep warm (newborns cannot regulate temperature alone)', text_es: 'Mantener calientes (cachorros no regulan temperatura solos)' },
                { text: 'Amamentação nas primeiras horas é vital (colostro)', text_en: 'Nursing in first hours is vital (colostrum)', text_es: 'Amamantar en primeras horas es vital (calostro)' },
                { text: 'Não separar da mãe antes de 45-60 dias', text_en: 'Do not separate from mother before 45-60 days', text_es: 'No separar de la madre antes de 45-60 días' },
                { text: 'Iniciar vacinação e vermifugação conforme orientação veterinária', text_en: 'Start vaccination and deworming as per vet guidance', text_es: 'Iniciar vacunación y desparasitación según orientación veterinaria' },
                { text: 'Socialização gradual a partir das 3 semanas', text_en: 'Gradual socialization from 3 weeks', text_es: 'Socialización gradual a partir de 3 semanas' }
            ]
        },
        {
            id: 'emergencias',
            title: '🚨 Quando Procurar Veterinário', title_en: '🚨 When to Seek a Vet', title_es: '🚨 Cuándo Buscar al Veterinario',
            icon: 'warning',
            color: '#D32F2F',
            items: [
                { text: 'Trabalho de parto > 2 horas sem filhote', text_en: 'Labor > 2 hours without a newborn', text_es: 'Trabajo de parto > 2 horas sin cachorro' },
                { text: 'Intervalo > 4 horas entre filhotes', text_en: 'Interval > 4 hours between newborns', text_es: 'Intervalo > 4 horas entre cachorros' },
                { text: 'Sangramento excessivo', text_en: 'Excessive bleeding', text_es: 'Sangrado excesivo' },
                { text: 'Secreção com mau cheiro', text_en: 'Foul-smelling discharge', text_es: 'Secreción con mal olor' },
                { text: 'Fraqueza extrema da mãe', text_en: 'Extreme weakness of the mother', text_es: 'Debilidad extrema de la madre' },
                { text: 'Filhotes não mamando', text_en: 'Newborns not nursing', text_es: 'Cachorros no amamantan' },
                { text: 'Febre ou hipotermia', text_en: 'Fever or hypothermia', text_es: 'Fiebre o hipotermia' }
            ]
        }
    ]
};
