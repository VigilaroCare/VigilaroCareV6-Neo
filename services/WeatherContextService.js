
import ProfileService from './ProfileService';

// Simulação de Clima para Demonstração (em produção usaria OpenWeather API)
// Tipos: 'rain', 'sunny', 'cold', 'storm', 'night_default'
const MOCK_WEATHER_CONDITIONS = ['rain', 'sunny', 'cold', 'storm'];

// Base de Conhecimento de Riscos Contextuais
const CONTEXT_RULES = {
    rain: {
        default: {
            title: "Alerta de Chuva",
            message: "Pisos externos podem estar escorregadios. Verifique goteiras e feche janelas.",
            icon: "rainy",
            gradient: ['#37474F', '#455A64'] // Dark Blue/Grey
        },
        idoso: {
            message: "Pisos molhados são o maior inimigo dos idosos. Seque imediatamente áreas de passagem e varandas.",
            priority: 10
        },
        crianca: {
            message: "Mantenha as crianças longe de poças e áreas externas molhadas para evitar quedas e resfriados.",
            priority: 5
        },
        pet: {
            message: "Cães podem ficar agitados com barulho de chuva. Mantenha-os em local seco e seguro.",
            priority: 3
        }
    },
    sunny: {
        default: {
            title: "Índice UV Alto",
            message: "Dia de sol forte. Hidratação e proteção solar são essenciais hoje.",
            icon: "sunny",
            gradient: ['#F57F17', '#FFB300'] // Sunny Orange
        },
        idoso: {
            message: "O calor excessivo pode causar queda de pressão em idosos. Ofereça água regularmente, mesmo sem sede.",
            priority: 10
        },
        crianca: {
            message: "Evite exposição direta ao sol entre 10h e 16h. Use protetor solar e bonés nos pequenos.",
            priority: 8
        },
        pet: {
            message: "Asfalto quente pode queimar as patas do seu pet. Passeie apenas em horários mais frescos.",
            priority: 7
        }
    },
    cold: {
        default: {
            title: "Frente Fria",
            message: "Temperaturas em queda. Mantenha a casa fechada para conservar o calor.",
            icon: "thermometer",
            gradient: ['#1565C0', '#42A5F5'] // Ice Blue
        },
        idoso: {
            message: "O frio aumenta dores articulares e riscos respiratórios em idosos. Mantenha-os bem agasalhados.",
            priority: 10
        },
        crianca: {
            message: "Verifique se o cobertor do bebê está seguro e não cobre o rosto. Vista em camadas.",
            priority: 9
        },
        pet: {
            message: "Pets de pelo curto sentem frio! Providencie roupinhas ou um local protegido do vento.",
            priority: 5
        }
    },
    storm: {
        default: {
            title: "Alerta de Tempestade",
            message: "Raios e ventos fortes previstos. Retire eletrônicos da tomada.",
            icon: "thunderstorm",
            gradient: ['#212121', '#424242'] // Dark Storm
        },
        idoso: {
            message: "Garanta que lanternas estejam acessíveis e o caminho livre caso falte luz. Evite velas.",
            priority: 10
        },
        crianca: {
            message: "Tempestades podem assustar. Mantenha as crianças em um cômodo seguro e longe de janelas.",
            priority: 8
        }
    }
};

class WeatherContextService {

    // Simula a obtenção do clima atual (pode ser substituído por API real)
    async getCurrentWeather() {
        // Para fins de demo, vamos alternar ou pegar aleatório, ou fixar um para teste.
        // Vamos usar um random determinístico baseado na hora para mudar 1x por hora?
        // Ou full random para demo.
        const randomIndex = Math.floor(Math.random() * MOCK_WEATHER_CONDITIONS.length);
        return MOCK_WEATHER_CONDITIONS[randomIndex];
    }

    async getContextCardData() {
        try {
            // 1. Obter Perfis da Família
            const profileData = await ProfileService.getData();
            const profiles = profileData.perfis || [];

            // Analisar composição familiar
            const hasIdoso = profiles.some(p => ProfileService.getFaixaEtaria(p.dataNascimento) === 'elderly');
            const hasCrianca = profiles.some(p => {
                const f = ProfileService.getFaixaEtaria(p.dataNascimento);
                return f === 'baby' || f === 'child';
            });
            const hasPet = profiles.some(p => p.tipo === 'pet');

            // 2. Obter Clima (Simulado)
            const conditionKey = await this.getCurrentWeather();
            const rules = CONTEXT_RULES[conditionKey];

            if (!rules) return null;

            // 3. Selecionar Melhor Mensagem baseada na Prioridade
            let selectedContent = { ...rules.default };
            let maxPriority = 0;

            // Lógica de Prioridade: Idoso > Criança > Pet > Default
            // Mas podemos rotacionar se tiver todos? Por enquanto, vamos priorizar o risco maior.

            if (hasIdoso && rules.idoso && rules.idoso.priority > maxPriority) {
                selectedContent.message = rules.idoso.message;
                maxPriority = rules.idoso.priority;
                selectedContent.targetGroup = "Idosos";
            }

            if (hasCrianca && rules.crianca && rules.crianca.priority > maxPriority) {
                // Se idoso já foi selecionado (prioridade 10), criança (8) não sobrescreve.
                // A menos que queiramos um sistema de múltiplas dicas.
                selectedContent.message = rules.crianca.message;
                maxPriority = rules.crianca.priority;
                selectedContent.targetGroup = "Crianças";
            }

            if (hasPet && rules.pet && rules.pet.priority > maxPriority) {
                selectedContent.message = rules.pet.message;
                maxPriority = rules.pet.priority;
                selectedContent.targetGroup = "Pets";
            }

            return {
                ...selectedContent,
                condition: conditionKey,

            };

        } catch (error) {
            if (__DEV__) { console.error("Erro ao gerar contexto:", error); }
            // Fallback seguro
            return {
                title: "Vigilaro Care",
                message: "Prevenção é a melhor proteção. Verifique seus checklists hoje.",
                icon: "shield-check",
                gradient: ['#365486', '#7FC7D9']
            };
        }
    }
}

export default new WeatherContextService();
