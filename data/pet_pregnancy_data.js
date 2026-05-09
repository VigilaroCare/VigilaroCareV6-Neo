/**
 * pet_pregnancy_data.js
 * Dados para o Guia de Prenhez
 */

export const PET_PREGNANCY_DATA = {
    sections: [
        {
            id: 'sinais',
            title: 'Sinais de Prenhez', title_en: 'Signs of Pregnancy', title_es: 'Signos de Preñez',
            icon: 'search',
            color: '#E91E63',
            items: [
                { text: 'Aumento do abdômen (após 3-4 semanas)', text_en: 'Abdomen enlargement (after 3-4 weeks)', text_es: 'Aumento del abdomen (después de 3-4 semanas)' },
                { text: 'Mamas inchadas e rosadas', text_en: 'Swollen and pink nipples', text_es: 'Mamas hinchadas y rosadas' },
                { text: 'Mudanças de comportamento (mais carinhosa ou isolada)', text_en: 'Behavioral changes (more affectionate or isolated)', text_es: 'Cambios de comportamiento (más cariñosa o aislada)' },
                { text: 'Aumento do apetite', text_en: 'Increased appetite', text_es: 'Aumento del apetito' },
                { text: 'Náuseas matinais (primeiras semanas)', text_en: 'Morning sickness (first weeks)', text_es: 'Náuseas matutinas (primeras semanas)' },
                { text: 'Diminuição de atividade física', text_en: 'Decreased physical activity', text_es: 'Disminución de actividad física' }
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
                { text: 'Alimentação de qualidade (ração para filhotes)', text_en: 'High-quality food (puppy/kitten food)', text_es: 'Alimentación de calidad (comida para cachorros)' },
                { text: 'Aumento gradual da quantidade de comida', text_en: 'Gradual increase in food quantity', text_es: 'Aumento gradual de la cantidad de comida' },
                { text: 'Suplementação se recomendado pelo veterinário', text_en: 'Supplementation if recommended by vet', text_es: 'Suplementación si lo recomienda el veterinario' },
                { text: 'Exercícios leves e regulares', text_en: 'Light and regular exercise', text_es: 'Ejercicios ligeros y regulares' },
                { text: 'Evitar medicamentos sem orientação', text_en: 'Avoid medications without guidance', text_es: 'Evitar medicamentos sin orientación' },
                { text: 'Consultas veterinárias regulares', text_en: 'Regular vet check-ups', text_es: 'Consultas veterinarias regulares' },
                { text: 'Preparar local tranquilo para o parto', text_en: 'Prepare a quiet place for birth', text_es: 'Preparar un lugar tranquilo para el parto' }
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
            title: 'Cuidados Pós-Parto', title_en: 'Post-Partum Care', title_es: 'Cuidados Posparto',
            icon: 'checkmark-circle',
            color: '#9C27B0',
            items: [
                { text: 'Deixe a mãe limpar os filhotes', text_en: 'Let the mother clean the newborns', text_es: 'Deje que la madre limpie a los cachorros' },
                { text: 'Verifique se todos estão mamando', text_en: 'Check if all are nursing', text_es: 'Verifique si todos están amamantando' },
                { text: 'Mantenha ambiente aquecido (28-32°C)', text_en: 'Keep the environment warm (28-32°C)', text_es: 'Mantenga el ambiente cálido (28-32°C)' },
                { text: 'Alimentação rica para a mãe', text_en: 'Rich diet for the mother', text_es: 'Alimentación rica para la madre' },
                { text: 'Observar sinais de infecção', text_en: 'Watch for signs of infection', text_es: 'Observar signos de infección' },
                { text: 'Consulta veterinária em 24-48h', text_en: 'Vet check-up in 24-48h', text_es: 'Consulta veterinaria en 24-48h' },
                { text: 'Pesar filhotes diariamente', text_en: 'Weigh newborns daily', text_es: 'Pesar a los cachorros diariamente' }
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
