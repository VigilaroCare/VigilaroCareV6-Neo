/**
 * eletrodomesticos_seguranca.js
 * Conteúdo sobre segurança com eletrodomésticos e equipamentos elétricos
 * Vigilaro Care V5
 */

export const eletrodomesticosSeguranca = [
    {
        id: 'preparo',
        categoria: 'Preparo de Alimentos',
        emoji: '🍳',
        dispositivos: [
            {
                id: 'microondas',
                nome: 'Micro-ondas',
                imagemUrl: 'https://images.pexels.com/photos/4686822/pexels-photo-4686822.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Explosão', 'Queimaduras', 'Incêndio'],
                descricao: 'Risco de explosão com metais e queimaduras graves em crianças.',
                prevencao: [
                    'NUNCA aquecer mamadeiras (usar banho-maria).',
                    'NUNCA colocar utensílios com metal (risco de explosão).',
                    'Verificar se alimentos/potes são próprios para micro-ondas.',
                    'Instalar trava de segurança na porta.'
                ],
                travas: true
            },
            {
                id: 'processadores',
                nome: 'Liquidificador / Batedeira / Mixer',
                imagemUrl: 'https://images.pexels.com/photos/19599327/pexels-photo-19599327.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Cortes Graves', 'Choque Elétrico'],
                descricao: 'Lâminas afiadas e partes rotativas acessíveis.',
                prevencao: [
                    'Guardar em armários altos ou trancados.',
                    'Desconectar da tomada antes de limpar ou manusear.',
                    'Nunca colocar a mão no copo com o aparelho na base.',
                    'Recolher fios para evitar que crianças puxem.'
                ],
                travas: false
            },
            {
                id: 'fogao',
                nome: 'Fogão e Forno',
                imagemUrl: 'https://images.pexels.com/photos/25852330/pexels-photo-25852330.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Queimaduras', 'Vazamento de Gás', 'Incêndio'],
                descricao: 'Principal fonte de calor e riscos na cozinha.',
                prevencao: [
                    'Usar bocas traseiras e cabos virados para dentro.',
                    'Jamais deixar cozinhando sem supervisão (usar timer).',
                    'Instalar trava na porta do forno.',
                    'Verificar validade da mangueira de gás.'
                ],
                travas: true
            }
        ]
    },
    {
        id: 'aquecimento',
        categoria: 'Aquecimento e Climatização',
        emoji: '🌡️',
        dispositivos: [
            {
                id: 'aquecedor',
                nome: 'Aquecedores Portáteis',
                imagemUrl: 'https://images.pexels.com/photos/36788832/pexels-photo-36788832.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Incêndio', 'Queimaduras', 'Choque'],
                descricao: 'Equipamentos com resistência elétrica exposta ou interna.',
                prevencao: [
                    'Manter pelo menos 1m de distância de cortinas, sofás e camas.',
                    'NUNCA usar extensões (risco de derretimento/incêndio).',
                    'Usar em superfície plana e firme (nunca em cima de móveis).',
                    'Preferir modelos com desligamento automático em caso de queda.'
                ],
                travas: false
            },
            {
                id: 'ventilador',
                nome: 'Ventiladores',
                imagemUrl: 'https://images.pexels.com/photos/4389919/pexels-photo-4389919.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Cortes', 'Choque'],
                descricao: 'Hélices em movimento acessíveis a dedos pequenos.',
                prevencao: [
                    'Vigiar crianças para não colocarem dedos na grade.',
                    'Preferir modelos de grade fechada ou sem hélice.',
                    'Não deixar ligado próximo a crianças sem supervisão.'
                ],
                travas: false
            }
        ]
    },
    {
        id: 'cuidados_pessoais',
        categoria: 'Cuidados Pessoais',
        emoji: '💅',
        dispositivos: [
            {
                id: 'ferro',
                nome: 'Ferro de Passar / Chapinha',
                imagemUrl: 'https://images.pexels.com/photos/28576618/pexels-photo-28576618.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Queimaduras', 'Incêndio'],
                descricao: 'Superfícies extremamente quentes que demoram a esfriar.',
                prevencao: [
                    'Nunca deixar ligado sem supervisão.',
                    'Guardar em local alto até esfriar totalmente.',
                    'Cuidado com o fio pendurado.'
                ],
                travas: false
            },
            {
                id: 'secador',
                nome: 'Secador de Cabelo',
                imagemUrl: 'https://images.pexels.com/photos/973406/pexels-photo-973406.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Choque Elétrico'],
                descricao: 'Risco altíssimo se usado próximo à água.',
                prevencao: [
                    'Nunca usar descalço em piso úmido.',
                    'Manter longe de pias e banheiras cheias.',
                    'Desconectar da tomada logo após o uso.'
                ],
                travas: false
            }
        ]
    },
    {
        id: 'refrigeracao',
        categoria: 'Refrigeração',
        emoji: '❄️',
        dispositivos: [
            {
                id: 'geladeira',
                nome: 'Geladeira e Freezer',
                imagemUrl: 'https://images.pexels.com/photos/6508357/pexels-photo-6508357.jpeg?auto=compress&cs=tinysrgb&w=1200',
                riscos: ['Ingestão Indevida', 'Esmagamento', 'Sufocamento'],
                descricao: 'Acesso a alimentos, bebidas alcoólicas e risco de prender dedos.',
                prevencao: [
                    'Instalar travas nas portas (evita acesso a vidros/álcool).',
                    'Não deixar objetos pesados em cima que possam cair ao abrir.',
                    'Cuidado com crianças se escondendo dentro (modelos antigos).'
                ],
                travas: true
            }
        ]
    }
];
