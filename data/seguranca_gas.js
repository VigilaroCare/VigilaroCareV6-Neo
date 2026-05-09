/**
 * seguranca_gas.js
 * Guia de Segurança do Gás de Cozinha (GLP)
 * Vigilaro Care V5
 */

export const SEGURANCA_GAS = {
    id: 'gas_glp',
    titulo: 'Segurança do Gás de Cozinha (GLP)',
    emoji: '🔥',
    descricao: 'O gás liquefeito de petróleo é essencial no lar, mas pode ser extremamente perigoso se mal manuseado.',

    riscos: [
        {
            id: 'gas_1',
            titulo: 'Vazamento de Gás',
            descricao: 'Gás GLP é mais pesado que o ar e se acumula em locais baixos. Um vazamento pode causar intoxicação e explosão.',
            gravidade: 'critica',
            sinais: [
                'Cheiro forte de gás (odor adicionado para detecção)',
                'Chama do fogão amarelada ou instável',
                'Tontura ou mal-estar inexplicável'
            ]
        },
        {
            id: 'gas_2',
            titulo: 'Explosão',
            descricao: 'Uma faísca em ambiente com acúmulo de gás pode causar explosão violenta.',
            gravidade: 'critica',
            causas: [
                'Acender luzes ou interruptores',
                'Usar celular',
                'Fósforos ou isqueiros',
                'Qualquer faísca elétrica'
            ]
        },
        {
            id: 'gas_3',
            titulo: 'Incêndio',
            descricao: 'Vazamentos próximos a fontes de calor podem iniciar incêndios de difícil controle.',
            gravidade: 'critica'
        },
        {
            id: 'gas_4',
            titulo: 'Intoxicação',
            descricao: 'Inalação de gás em ambientes fechados pode causar asfixia.',
            gravidade: 'alta',
            sintomas: [
                'Dor de cabeça',
                'Tontura',
                'Náusea',
                'Dificuldade de respirar',
                'Perda de consciência'
            ]
        }
    ],

    componentesEVerificacao: [
        {
            id: 'comp_1',
            item: 'Mangueira',
            descricao: 'Conecta o botijão ao fogão. Deve ser flexível e resistente.',
            validadeMaxima: '5 anos',
            verificar: [
                'Data de fabricação impressa na mangueira',
                'Ausência de rachaduras ou ressecamento',
                'Sem dobras ou amassados',
                'Certificação do INMETRO'
            ],
            alertaVencimento: true
        },
        {
            id: 'comp_2',
            item: 'Abraçadeiras',
            descricao: 'Fixam a mangueira no botijão e no fogão.',
            verificar: [
                'Bem apertadas (não se movem)',
                'Sem ferrugem',
                'Usar abraçadeiras metálicas (não plásticas)'
            ]
        },
        {
            id: 'comp_3',
            item: 'Regulador de Pressão',
            descricao: 'Controla a pressão do gás que sai do botijão.',
            validadeMaxima: '5 anos',
            verificar: [
                'Data de fabricação',
                'Sem vazamentos na conexão',
                'Rosqueado corretamente',
                'Certificação INMETRO'
            ]
        },
        {
            id: 'comp_4',
            item: 'Botijão P13',
            descricao: 'Recipiente de 13kg para uso doméstico.',
            verificar: [
                'Sem amassados ou ferrugem excessiva',
                'Selo de segurança intacto ao comprar',
                'Base estável (não balança)',
                'Válvula sem vazamento'
            ]
        }
    ],

    oQueFazer: [
        'Manter o botijão em local ventilado (NUNCA dentro de armários fechados)',
        'Verificar validade da mangueira anualmente',
        'Trocar mangueira a cada 5 anos ou antes se apresentar defeitos',
        'Fechar o registro do gás ao sair de casa ou dormir',
        'Fazer teste de vazamento com espuma de sabão (NUNCA com chama)',
        'Comprar gás apenas de revendedores credenciados',
        'Manter área ao redor do botijão livre de materiais inflamáveis'
    ],

    oQueNaoFazer: [
        'NUNCA verifique vazamentos com fósforo ou isqueiro',
        'NUNCA coloque o botijão deitado',
        'NUNCA instale o botijão em locais fechados ou sem ventilação',
        'NUNCA exponha o botijão ao sol direto ou calor excessivo',
        'NUNCA tente transferir gás de um botijão para outro',
        'NUNCA modifique ou conserte o botijão por conta própria',
        'NUNCA armazene produtos inflamáveis próximo ao gás'
    ],

    emCasoDeVazamento: {
        titulo: 'SE SENTIR CHEIRO DE GÁS',
        passos: [
            {
                ordem: 1,
                acao: 'NÃO ACIONE nenhum interruptor de luz (nem para ligar, nem para desligar)',
                motivo: 'Faíscas podem causar explosão'
            },
            {
                ordem: 2,
                acao: 'NÃO use celular dentro do ambiente',
                motivo: 'Celulares podem gerar faíscas'
            },
            {
                ordem: 3,
                acao: 'Abra TODAS as portas e janelas',
                motivo: 'Ventilar o ambiente para dissipar o gás'
            },
            {
                ordem: 4,
                acao: 'Feche o registro do botijão (se possível fazer com segurança)',
                motivo: 'Interromper o vazamento na fonte'
            },
            {
                ordem: 5,
                acao: 'Retire TODOS os moradores e animais do local',
                motivo: 'Garantir segurança das pessoas'
            },
            {
                ordem: 6,
                acao: 'Ligue para os Bombeiros (193) de fora do imóvel',
                motivo: 'Obter ajuda profissional'
            },
            {
                ordem: 7,
                acao: 'Aguarde em local seguro até liberação',
                motivo: 'Evitar retorno prematuro'
            }
        ]
    },

    centralDeGas: {
        titulo: 'Centrais de Gás (Condomínios)',
        aplicaA: 'apartamentos',
        requisitos: [
            'Local ventilado naturalmente',
            'Protegida de sol direto e intempéries',
            'Sinalização visível (INFLAMÁVEL)',
            'Extintor de incêndio classe B próximo',
            'Acesso restrito (trancada)',
            'Sem materiais inflamáveis armazenados',
            'Pintura padronizada (amarelo)',
            'Distância mínima de instalações elétricas'
        ],
        manutencao: 'Manutenção preventiva anual obrigatória por empresa especializada'
    },

    checklist: [
        { id: 'cg1', texto: 'Mangueira dentro da validade? (verificar data)', critico: true },
        { id: 'cg2', texto: 'Abraçadeiras bem fixas?', critico: true },
        { id: 'cg3', texto: 'Regulador sem vazamentos?', critico: true },
        { id: 'cg4', texto: 'Botijão em local ventilado?', critico: true },
        { id: 'cg5', texto: 'Registro fechado quando não em uso?' },
        { id: 'cg6', texto: 'Área livre de materiais inflamáveis?' },
        { id: 'cg7', texto: 'Teste de vazamento feito nos últimos 6 meses?' },
        { id: 'cg8', texto: 'Gás comprado de revendedor autorizado?' }
    ],

    telefones: {
        bombeiros: '193',
        defesaCivil: '199',
        distribuidoraGas: 'Consulte seu fornecedor'
    }
};

export default SEGURANCA_GAS;
