/**
 * data/renovationChecklists.js
 * Checklists de Segurança para Reformas — Vigilaro Care V6 Neo
 * Expandido com itens assertivos de prevenção por tipo de obra
 */

export const RENOVATION_TYPES = {
    HOME: 'casa',
    BUILDING: 'predio',
    RURAL: 'rural',
};

export const RENOVATION_CHECKLISTS = {
    [RENOVATION_TYPES.HOME]: [
        // Isolamento e Acesso
        { key: 'isolamento', label: 'Áreas em obra isoladas com barreira física (tapume, porta trancada)' },
        { key: 'sinalizacao_interna', label: 'Sinalização "Área em Obra" visível nas entradas' },
        { key: 'passagem_segura', label: 'Caminho livre e seguro entre cômodos habitados' },

        // Ferramentas e Materiais
        { key: 'ferramentas', label: 'Ferramentas cortantes guardadas ao final do expediente' },
        { key: 'quimicos', label: 'Solventes, tintas e produtos químicos em local ventilado e trancado' },
        { key: 'pregos_parafusos', label: 'Pregos, parafusos e materiais pontiagudos recolhidos do chão' },

        // Elétrica e Infraestrutura
        { key: 'extensoes', label: 'Extensões elétricas organizadas e longe de água' },
        { key: 'disjuntor', label: 'Disjuntor da área em obra desligado ao final do dia' },
        { key: 'agua_gas', label: 'Registros de água e gás verificados antes de intervenções' },

        // Pessoas e EPIs
        { key: 'epis', label: 'Trabalhadores com EPIs adequados (capacete, luvas, óculos)' },
        { key: 'criancas_pets', label: 'Crianças e pets sem acesso à área de obra' },
        { key: 'entulho', label: 'Entulho removido diariamente ou em caçamba fechada' },

        // Ventilação e Saúde
        { key: 'ventilacao', label: 'Ventilação adequada durante uso de tintas e vernizes' },
        { key: 'poeira', label: 'Proteção contra poeira nos cômodos habitados (vedação de portas)' },
        { key: 'rota_fuga', label: 'Rota de fuga desobstruída durante toda a obra' },
    ],

    [RENOVATION_TYPES.BUILDING]: [
        // Áreas Comuns
        { key: 'sinalizacao', label: 'Sinalização de obra nos acessos e áreas comuns do prédio' },
        { key: 'circulacao', label: 'Escadas e corredores livres — sem obstruir rotas de fuga' },
        { key: 'elevador', label: 'Proteção interna no elevador de serviço (papelão/compensado)' },

        // Ruído e Convivência
        { key: 'horario', label: 'Respeito aos horários de obra do regimento interno' },
        { key: 'comunicacao_vizinhos', label: 'Vizinhos diretos avisados sobre tipo e duração da obra' },
        { key: 'limpeza_areas_comuns', label: 'Limpeza de resíduos nas áreas comuns ao final do dia' },

        // Entulho e Materiais
        { key: 'entulho_cacamba', label: 'Caçamba em local permitido, sinalizada e dentro da validade' },
        { key: 'material_estocado', label: 'Materiais estocados dentro do apartamento, não no corredor' },
        { key: 'poeira', label: 'Vedação de porta de entrada para evitar poeira no corredor' },

        // Segurança Estrutural
        { key: 'parede_estrutural', label: 'Confirmação com engenheiro antes de demolir paredes' },
        { key: 'impermeabilizacao', label: 'Teste de impermeabilização antes de fechar pisos molhados' },
        { key: 'eletrica_gas', label: 'Plantas de elétrica e gás consultadas antes de perfurações' },

        // Trabalhadores
        { key: 'acesso_controlado', label: 'Trabalhadores identificados e cadastrados na portaria' },
        { key: 'epis_predio', label: 'EPIs obrigatórios para trabalho em altura ou demolição' },
    ],

    [RENOVATION_TYPES.RURAL]: [
        // Terreno e Fauna
        { key: 'animais', label: 'Animais domésticos e de criação afastados da área de obra' },
        { key: 'fauna_silvestre', label: 'Inspeção de ninhos/tocas antes de escavar ou desmatar' },
        { key: 'terreno', label: 'Buracos, valas e escavações sinalizados e cercados' },

        // Máquinas e Veículos
        { key: 'maquinas', label: 'Máquinas pesadas travadas e chave retirada quando paradas' },
        { key: 'perimetro_maquinas', label: 'Perímetro de segurança ao redor de máquinas em operação' },
        { key: 'abastecimento', label: 'Combustível armazenado longe de fontes de calor' },

        // Infraestrutura
        { key: 'eletrica_rural', label: 'Distância segura de rede elétrica aérea (mín. 3m)' },
        { key: 'eletrica_subterranea', label: 'Localização de fiação subterrânea antes de escavar' },
        { key: 'agua', label: 'Poços, cisternas e fossas abertas cercados e sinalizados' },

        // Incêndio e Clima
        { key: 'fogo', label: 'Prevenção de incêndio em vegetação seca — extintor acessível' },
        { key: 'raio', label: 'Suspender trabalhos em campo aberto durante tempestades' },
        { key: 'hidratacao', label: 'Água potável e sombra disponíveis para trabalhadores' },

        // Acesso e Segurança
        { key: 'acesso_propriedade', label: 'Porteira/portão trancado para evitar acesso de terceiros' },
        { key: 'primeiros_socorros', label: 'Kit de primeiros socorros acessível no local da obra' },
    ],
};
