/**
 * acessorios_seguranca.js
 * Guia Consolidado de Acessórios de Segurança Baby-Proof e Proteção
 * Vigilaro Care V5
 */

export const ACESSORIOS_SEGURANCA = {
    id: 'acess_seg',
    titulo: 'Acessórios de Segurança para o Lar',
    emoji: '🔐',
    descricao: 'Dispositivos essenciais para proteção de crianças, idosos e pessoas com necessidades especiais.',

    categorias: [
        {
            id: 'protecao_quinas',
            titulo: 'Proteção para Quinas',
            icone: 'square-outline',
            paraMoradores: ['bebe', 'crianca', 'idoso', 'pcd'],
            descricao: 'Evita batidas e cortes em cantos de móveis.',
            onde: ['Mesas de centro', 'Mesas de jantar', 'Cômodas', 'Bancadas'],
            tipos: [
                { nome: 'Protetor de silicone transparente', durabilidade: 'alta' },
                { nome: 'Protetor de espuma colorida', durabilidade: 'média' },
                { nome: 'Protetor de borracha adesivo', durabilidade: 'alta' }
            ],
            instalacao: 'Limpe a superfície com álcool, retire o adesivo e pressione por 30 segundos.',
            custoMedio: 'R$ 15-40 (kit com 4-8 unidades)'
        },
        {
            id: 'travas_armarios',
            titulo: 'Travas para Armários e Gavetas',
            icone: 'lock-closed-outline',
            paraMoradores: ['bebe', 'crianca'],
            descricao: 'Impede acesso a objetos perigosos, medicamentos e produtos químicos.',
            onde: ['Armários de cozinha', 'Armários de banheiro', 'Gavetas com objetos cortantes'],
            tipos: [
                { nome: 'Trava adesiva simples', tipo: 'Pressão', durabilidade: 'média' },
                { nome: 'Trava magnética oculta', tipo: 'Chave magnética', durabilidade: 'alta' },
                { nome: 'Trava de pressão para puxadores', tipo: 'Encaixe', durabilidade: 'alta' }
            ],
            custoMedio: 'R$ 20-50 (kit com 4-6 unidades)'
        },
        {
            id: 'protecao_portas',
            titulo: 'Proteção para Portas',
            icone: 'enter-outline',
            paraMoradores: ['bebe', 'crianca', 'idoso'],
            descricao: 'Evita esmagamento de dedos e batidas.',
            tipos: [
                {
                    nome: 'Protetor de espuma (dorso da porta)',
                    funcao: 'Impede fechamento total',
                    risco: 'Esmagamento de dedos'
                },
                {
                    nome: 'Protetor de dobradiças',
                    funcao: 'Cobre a parte móvel da dobradiça',
                    risco: 'Prensamento no vão'
                },
                {
                    nome: 'Batedor de porta de silicone',
                    funcao: 'Amortece batidas',
                    risco: 'Sustos e danos à porta'
                }
            ],
            custoMedio: 'R$ 10-25 por unidade'
        },
        {
            id: 'protecao_tomadas',
            titulo: 'Proteção para Tomadas',
            icone: 'flash-off-outline',
            paraMoradores: ['bebe', 'crianca'],
            descricao: 'ESSENCIAL. Previne choque elétrico por introdução de objetos.',
            tipos: [
                { nome: 'Protetor de encaixe simples', seguranca: 'básica', removivel: true },
                { nome: 'Protetor com chave', seguranca: 'alta', removivel: 'somente com chave' },
                { nome: 'Protetor giratório automático', seguranca: 'alta', removivel: false }
            ],
            importante: 'Instale em TODAS as tomadas, inclusive as que parecem inacessíveis.',
            custoMedio: 'R$ 15-30 (kit com 10-20 unidades)'
        },
        {
            id: 'trava_vaso',
            titulo: 'Trava para Tampa do Vaso Sanitário',
            icone: 'water-outline',
            paraMoradores: ['bebe', 'crianca'],
            descricao: 'Previne afogamento. Crianças podem cair de cabeça no vaso.',
            riscoPrincipal: 'Afogamento (crianças pequenas têm centro de gravidade alto)',
            tipos: [
                { nome: 'Trava adesiva lateral', instalacao: 'Sem furos' },
                { nome: 'Trava com encaixe', instalacao: 'Aparafusada' }
            ],
            custoMedio: 'R$ 25-50'
        },
        {
            id: 'travas_eletrodomesticos',
            titulo: 'Travas para Eletrodomésticos',
            icone: 'cube-outline',
            paraMoradores: ['bebe', 'crianca'],
            onde: ['Geladeira', 'Freezer', 'Forno elétrico', 'Micro-ondas', 'Máquina de lavar'],
            riscos: [
                'Acesso a bebidas alcoólicas (geladeira)',
                'Acesso a objetos de vidro',
                'Queimaduras (forno, micro-ondas)',
                'Entrarem dentro (máquina de lavar - risco de morte)'
            ],
            tipos: [
                { nome: 'Trava adesiva para geladeira', tipo: 'Pressão' },
                { nome: 'Trava para forno', tipo: 'Calor resistente' },
                { nome: 'Bloqueio de porta de máquina', tipo: 'Adesivo' }
            ],
            custoMedio: 'R$ 20-40 por unidade'
        },
        {
            id: 'grades_babygate',
            titulo: 'Grades (Babygate) para Portas e Escadas',
            icone: 'stop-outline',
            paraMoradores: ['bebe', 'crianca'],
            descricao: 'Bloqueia acesso a áreas perigosas.',
            ondeInstalar: [
                'Topo e base de escadas (OBRIGATÓRIO)',
                'Entrada da cozinha',
                'Acesso a sacadas',
                'Acesso a piscinas',
                'Porta de quartos com riscos'
            ],
            tipos: [
                {
                    nome: 'Grade de pressão',
                    instalacao: 'Sem furos, encaixe por pressão',
                    ideal: 'Entre paredes ou batentes'
                },
                {
                    nome: 'Grade aparafusada',
                    instalacao: 'Fixada na parede',
                    ideal: 'Topo de escadas, maior segurança'
                }
            ],
            importante: 'No TOPO de escadas, use sempre grades APARAFUSADAS (pressão pode ceder).',
            custoMedio: 'R$ 80-200'
        },
        {
            id: 'telas_protecao',
            titulo: 'Telas de Proteção para Janelas e Sacadas',
            icone: 'grid-outline',
            paraMoradores: ['bebe', 'crianca', 'pet'],
            descricao: 'Previne quedas de altura. Obrigatória em casas com crianças ou pets.',
            norma: 'ABNT NBR 16046',
            material: [
                'Polietileno (impermeável, para áreas externas)',
                'Poliamida (mais resistente, áreas internas)'
            ],
            verificacoes: [
                'Certificação INMETRO',
                'Validade de 3-5 anos',
                'Ganchos de aço galvanizado',
                'Tensão adequada (não cede ao empurrar)'
            ],
            manutencao: 'Verificar anualmente. Trocar se apresentar rasgos ou perda de tensão.',
            custoMedio: 'R$ 50-100 por m² (inclui instalação)'
        },
        {
            id: 'barras_apoio',
            titulo: 'Barras de Apoio',
            icone: 'hand-right-outline',
            paraMoradores: ['idoso', 'pcd', 'gestante'],
            descricao: 'Auxiliam na mobilidade e previnem quedas.',
            ondeInstalar: [
                'Ao lado do vaso sanitário',
                'Dentro do box/banheira',
                'Corredores longos',
                'Ao lado da cama (idoso)'
            ],
            tipos: [
                { nome: 'Barra fixa reta', comprimento: '40-80cm' },
                { nome: 'Barra em L', para: 'Cantos de box' },
                { nome: 'Barra articulada', para: 'Próximo ao vaso' }
            ],
            material: 'Aço inox ou alumínio anodizado (não enferruja)',
            importante: 'Instalação DEVE ser feita em parede resistente ou com reforço.',
            custoMedio: 'R$ 80-200 por barra (instalada)'
        },
        {
            id: 'protecao_cama',
            titulo: 'Grades de Proteção para Cama',
            icone: 'bed-outline',
            paraMoradores: ['bebe', 'crianca', 'idoso'],
            descricao: 'Previne quedas durante o sono.',
            tipos: [
                { nome: 'Grade retrátil/dobrável', para: 'Crianças em transição do berço' },
                { nome: 'Grade fixa metálica', para: 'Idosos com risco de queda' }
            ],
            importante: 'Para bebês: NÃO use grades, use berço adequado.',
            custoMedio: 'R$ 100-250'
        },
        // NOVAS CATEGORIAS - ENRIQUECIMENTO
        {
            id: 'seguranca_eletrica_fogo',
            titulo: 'Segurança Elétrica e Incêndio',
            icone: 'flame-outline',
            paraMoradores: ['todos'],
            descricao: 'Proteção contra surtos, incêndios e intoxicação.',
            tipos: [
                { nome: 'Detector de Fumaça', funcao: 'Alerta sonoro de incêndio' },
                { nome: 'Detector de CO', funcao: 'Alerta de gás tóxico (aquecedores)' },
                { nome: 'Extintor ABC', funcao: 'Combate princípios de incêndio' },
                { nome: 'Protetor DPS', funcao: 'Protege equipamentos de surto' },
                { nome: 'Luz de Emergência', funcao: 'Acende na falta de luz' }
            ],
            custoMedio: 'R$ 50-200'
        },
        {
            id: 'seguranca_agua',
            titulo: 'Segurança Áreas Molhadas',
            icone: 'water-outline',
            paraMoradores: ['todos'],
            descricao: 'Prevenção de afogamentos e vazamentos.',
            tipos: [
                { nome: 'Alarme de Piscina', funcao: 'Detecta queda na água' },
                { nome: 'Detector de Vazamento', funcao: 'Alerta água no chão' },
                { nome: 'Tapete Emborrachado', funcao: 'Antiderrapante box' },
                { nome: 'Piso Tátil', funcao: 'Alerta de desnível' }
            ],
            custoMedio: 'R$ 30-300'
        },
        {
            id: 'monitoramento',
            titulo: 'Monitoramento e Assistência',
            icone: 'videocam-outline',
            paraMoradores: ['todos'],
            descricao: 'Tecnologia para vigilância e cuidado.',
            tipos: [
                { nome: 'Câmera Wi-Fi', funcao: 'Monitoramento remoto' },
                { nome: 'Babá Eletrônica', funcao: 'Áudio/vídeo quarto bebê' },
                { nome: 'Botão de Pânico', funcao: 'Emergência pessoal' },
                { nome: 'Fechadura Digital', funcao: 'Controle de acesso' }
            ],
            custoMedio: 'R$ 150-500'
        }
    ],

    kitsPorPerfil: {
        bebe: {
            titulo: 'Kit Baby-Proof Essencial',
            itens: [
                'Protetores de tomada (20 un)',
                'Protetores de quina (8 un)',
                'Travas de armário (6 un)',
                'Trava de vaso sanitário (1 un)',
                'Grades babygate (2 un - escada topo e base)',
                'Telas de proteção (todas as janelas)'
            ],
            investimentoAproximado: 'R$ 400-700'
        },
        idoso: {
            titulo: 'Kit Segurança para Idoso',
            itens: [
                'Barras de apoio banheiro (3 un)',
                'Tapetes antiderrapantes (box e áreas úmidas)',
                'Luz noturna com sensor',
                'Protetor de quinas (áreas de passagem)',
                'Grade de cama (se necessário)'
            ],
            investimentoAproximado: 'R$ 500-900'
        },
        pet: {
            titulo: 'Kit Proteção para Pets',
            itens: [
                'Telas de proteção (todas as janelas)',
                'Grade babygate (acesso a cozinha/áreas de risco)',
                'Protetores de fios elétricos',
                'Trava de lixeira'
            ],
            investimentoAproximado: 'R$ 300-600'
        }
    },

    checklist: [
        { id: 'as1', texto: 'Tomadas protegidas?', para: ['bebe', 'crianca'] },
        { id: 'as2', texto: 'Quinas de móveis protegidas?', para: ['bebe', 'crianca', 'idoso'] },
        { id: 'as3', texto: 'Armários com produtos perigosos trancados?', para: ['bebe', 'crianca'] },
        { id: 'as4', texto: 'Escadas bloqueadas com grades?', para: ['bebe', 'crianca'] },
        { id: 'as5', texto: 'Telas nas janelas instaladas e válidas?', para: ['bebe', 'crianca', 'pet'] },
        { id: 'as6', texto: 'Barras de apoio no banheiro?', para: ['idoso', 'pcd'] },
        { id: 'as7', texto: 'Tampa do vaso sanitário com trava?', para: ['bebe', 'crianca'] },
        { id: 'as8', texto: 'Geladeira/forno/micro-ondas com trava?', para: ['bebe', 'crianca'] }
    ]
};

export default ACESSORIOS_SEGURANCA;
