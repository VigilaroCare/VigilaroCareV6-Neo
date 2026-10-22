/**
 * aves_seguras_data.js
 * Dados para Aves Seguras
 */

export const AVES_SEGURAS_DATA = {
    hero: {
        title: 'Vigilância Aérea', title_en: 'Aerial Surveillance', title_es: 'Vigilancia Aérea',
        desc: 'Aeronaves reais requerem pistas limpas. O sistema respiratório das aves é até 10x mais sensível que o humano a toxinas invisíveis.',
        desc_en: 'Real aircraft require clean runways. A bird\'s respiratory system is up to 10x more sensitive than a human\'s to invisible toxins.',
        desc_es: 'Las aeronaves reales requieren pistas limpias. El sistema respiratorio de las aves es hasta 10 veces más sensible que el humano a toxinas invisibles.'
    },
    alertaCritico: {
        title: 'Risco Fatal: Antiaderentes (PTFE)', title_en: 'Fatal Risk: Non-Stick Coatings (PTFE)', title_es: 'Riesgo Fatal: Antiadherentes (PTFE)',
        desc: 'O revestimento (PTFE) superaquecido de panelas antiaderentes libera gases inodoros que paralisam o sistema respiratório das aves em segundos. É um risco letal e sem cura.',
        desc_en: 'Overheated PTFE coating from non-stick pans releases odorless gases that paralyze birds\' respiratory systems in seconds. It is a lethal and incurable risk.',
        desc_es: 'El revestimiento (PTFE) sobrecalentado de sartenes antiadherentes libera gases inodoros que paralizan el sistema respiratorio de las aves en segundos. Es un riesgo letal e incurable.',
        small: '⚠️ Mantenha aves sempre banidas da cozinha.',
        small_en: '⚠️ Keep birds always banned from the kitchen.',
        small_es: '⚠️ Mantenga a las aves siempre prohibidas en la cocina.'
    },
    riscos: [
        {
            title: 'Produtos em spray', title_en: 'Spray Products', title_es: 'Productos en spray',
            message: 'Aerossóis, desodorantes, inseticidas e incensos são extremamente tóxicos para o sistema respiratório hipersensível das aves.',
            message_en: 'Aerosols, deodorants, insecticides, and incense are extremely toxic to the hypersensitive respiratory system of birds.',
            message_es: 'Aerosoles, desodorantes, insecticidas e inciensos son extremadamente tóxicos para el sistema respiratorio hipersensible de las aves.',
            icon: 'Wind',
            color: '#1976D2',
            bg: '#E3F2FD'
        },
        {
            title: 'Correntes de ar', title_en: 'Cold Drafts', title_es: 'Corrientes de aire',
            message: 'Gaiolas devem ficar protegidas do vento forte e sol direto.',
            message_en: 'Cages must be protected from strong winds and direct sun.',
            message_es: 'Las jaulas deben estar protegidas del viento fuerte y el sol directo.',
            icon: 'TrendUp',
            color: '#0097A7',
            bg: '#E0F7FA'
        },
        {
            title: 'Fumaça de cigarro', title_en: 'Cigarette Smoke', title_es: 'Humo de cigarrillo',
            message: 'Fatal a longo prazo.',
            message_en: 'Fatal in the long term.',
            message_es: 'Fatal a largo plazo.',
            icon: 'Danger',
            color: '#D32F2F',
            bg: '#FFEBEE'
        },
        {
            title: 'Espelhos e janelas de vidro', title_en: 'Mirrors and Glass Windows', title_es: 'Espejos y ventanas de vidrio',
            message: 'Aves podem se chocar em voo livre.',
            message_en: 'Birds can collide during free flight.',
            message_es: 'Las aves pueden chocar en vuelo libre.',
            icon: 'Maximize',
            color: '#388E3C',
            bg: '#E8F5E9'
        }
    ],
    diagnostico: {
        title: 'Diagnóstico Oculto', title_en: 'Hidden Diagnosis', title_es: 'Diagnóstico Oculto',
        desc: 'Aves são presas na natureza e disfarçam a doença até o último momento. Uma ave "encorujada" e quieta no fundo da gaiola é uma EMERGÊNCIA ABSOLUTA.',
        desc_en: 'Birds are prey in nature and hide illness until the last moment. A "fluffed" and quiet bird at the bottom of the cage is an ABSOLUTE EMERGENCY.',
        desc_es: 'Las aves son presas en la naturaleza y ocultan la enfermedad hasta el último momento. Un ave "esponjada" y callada en el fondo de la jaula es una EMERGENCIA ABSOLUTA.',
        btn: 'Ver Alimentos Tóxicos', btn_en: 'View Toxic Foods', btn_es: 'Ver Alimentos Tóxicos'
    }
};
