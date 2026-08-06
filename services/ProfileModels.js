/**
 * ProfileModels.js
 * Estruturas de dados compartilhadas para Perfis e Migração
 */

export const VIGILARO_DATA_KEY = '@vigilaro_data';

/**
 * Estrutura padrão de dados do Vigilaro
 */
export const getDefaultData = () => ({
    versao: 2, // Versão atualizada com novo modelo
    migrado: false,
    onboardingCompleto: false,

    // Metadados sobre a família/moradia
    meta: {
        totalMoradoresEsperados: 0, // Quantas pessoas moram na casa
        totalPetsEsperados: 0,      // Quantos pets
        dataCriacao: new Date().toISOString(),
        ultimaAtualizacao: new Date().toISOString(),
    },

    moradia: {
        tipo: null, // 'casa' | 'casa_condominio' | 'sobrado' | 'apartamento' | 'conjunto_apartamento' | 'cobertura' | 'sitio' | 'casa_praia'
        andares: 1,
        regiao: null, // 'urbana' | 'rural' | 'litoranea'

        // Equipamentos e eletrodomésticos de risco
        equipamentos: [], // ['fogao_gas', 'piscina', 'ferramentas_pesadas', ...]

        // Estrutura física
        estrutura: {
            ambientes: [],       // ['cozinha', 'sala', 'quarto_casal', ...]
            caracteristicas: [], // ['escadas', 'piscina', 'varanda', ...]
            utilidades: null,    // 'gas_encanado' | 'botijao' | 'eletrico'
            completude: 0,       // 0-100%
        },

        // Riscos identificados
        riscos: {
            identificados: [],       // ['escada_sem_portao', 'piscina_sem_cerca', ...]
            equipamentosSeguranca: [], // ['extintor', 'detector_fumaca', ...]
            completude: 0,           // 0-100%
        },

        // Inventário da casa
        inventario: {
            produtosQuimicos: { local: null, acessivel: null },
            medicamentos: { local: null, controlados: null },
            ferramentas: { local: null },
            armas: { possui: null, guardada: null },
            completude: 0, // 0-100%
        },

        ultimaAtualizacao: null,
    },

    // Multi-Home: residência padrão sempre presente
    residences: [{
        id: 'default_home',
        nome: 'Minha Casa Principal',
        pessoaEmFoco: null,
        moradia: { habitantes: [], frequentadores: [] },
        mapping: [],
        checklists: {},
        foto: null
    }],
    activeResidenceId: 'default_home',

    perfis: [],

    // Completude calculada
    completude: {
        familia: 0,    // % de perfis completos vs esperados
        estrutura: 0,  // % moradia.estrutura completa
        riscos: 0,     // % riscos identificados
        inventario: 0, // % inventário catalogado
        total: 0,      // Média ponderada
    },

    preferencias: {
        notificacoes: true,
        lembretesMedicacao: true,
        idioma: 'pt-BR',
    },

    historicoChecklists: [],

    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
});

/**
 * Estrutura padrão de um perfil (pessoa ou pet)
 */
export const getDefaultProfile = (tipo = 'humano') => ({
    id: Date.now().toString(),
    tipo, // 'humano' | 'pet'
    ativo: false, // Perfil principal para alertas

    // Dados Básicos
    nome: '',
    foto: null,
    dataNascimento: '', // DD/MM/AAAA
    genero: '',

    // Dados de Emergência (conceito ICE)
    tipoSanguineo: '',
    condicoesMedicas: [], // diabetes, hipertensão...
    alergias: [],
    medicamentosEmUso: [],
    necessidadesEspeciais: [], // mobilidade reduzida, visual, auditivo

    // Contatos de Emergência (por pessoa)
    contatos: [], // [{ nome, telefone, relacao }]

    // ── Vínculo Morador↔Cômodo ──
    // Quais ambientes este perfil USA no dia a dia. Fundamento do
    // briefing vivo: alimenta o RiskInterpreter (D4) com contexto
    // de quem frequenta o quê. Ex: idosa Maria usa quarto_principal
    // → escada sem corrimão lá vira prioridade alta pra ela.
    // Array de IDs do mapping (mesmos IDs salvos por ProfileService.saveMapping).
    // [] significa "ainda não declarado" — será preenchido no wizard P3/P4
    // ou via migração (estratégia conservadora: todos os cômodos mapeados).
    comodosUsados: [],

    // Pet específico
    especie: '', // cachorro, gato, pássaro...
    raca: '',
    porte: '', // pequeno, medio, grande
    castrado: false,

    // Metadados
    schemaVersion: 2, // bumped quando adicionamos comodosUsados (migração automática)
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString(),
});
