/**
 * distracao_eletronica.js
 * Alertas sobre Riscos de Distração com Dispositivos Eletrônicos
 * Vigilaro Care V5
 */

export const DISTRACAO_ELETRONICA = {
    id: 'distracao_eletronica',
    titulo: 'Atenção: Risco de Distração',
    emoji: '📱',
    descricao: 'O uso de celulares e dispositivos durante atividades que exigem atenção pode ser fatal.',

    estatisticas: {
        fonte: 'SBPC/OMS',
        dados: [
            'Afogamentos são a 2ª causa de morte infantil acidental.',
            'A maioria ocorre com os pais presentes, mas distraídos.',
            '10 segundos são suficientes para uma criança se afogar.',
            'Quedas de janelas aumentaram com pais trabalhando de casa.'
        ]
    },

    contextos: [
        {
            id: 'banho_piscina',
            titulo: 'Banho e Piscina',
            icone: 'water-outline',
            cor: '#2196F3',
            risco: 'Afogamento',
            gravidade: 'CRITICO',
            mensagem: 'NUNCA use o celular enquanto supervisiona crianças na água.',
            tempoRisco: '10 segundos de distração podem ser fatais.',
            cenarios: [
                'Banho de banheira',
                'Piscina (própria ou condomínio)',
                'Praia, rio ou lago',
                'Baldes e bacias com água'
            ],
            regra: 'Olhos 100% na criança. Celular 0%.'
        },
        {
            id: 'cozinha',
            titulo: 'Preparo de Alimentos',
            icone: 'flame-outline',
            cor: '#FF5722',
            risco: 'Queimaduras e Incêndio',
            gravidade: 'ALTO',
            mensagem: 'Não cozinhe enquanto usa o celular.',
            cenarios: [
                'Panela no fogo sem supervisão',
                'Óleo aquecendo',
                'Forno em uso',
                'Crianças na cozinha'
            ],
            regra: 'Fogo aceso = celular guardado.'
        },
        {
            id: 'supervisao_crianca',
            titulo: 'Supervisão de Crianças',
            icone: 'body-outline',
            cor: '#E91E63',
            risco: 'Quedas, Engasgos, Intoxicação',
            gravidade: 'ALTO',
            mensagem: 'Crianças pequenas precisam de atenção constante.',
            cenarios: [
                'Criança brincando (especialmente engatinhando)',
                'Criança em cadeira de alimentação',
                'Criança perto de janelas ou escadas',
                'Criança com objetos pequenos'
            ],
            regra: 'Presença ativa ≠ presença física.'
        },
        {
            id: 'carro_garagem',
            titulo: 'Veículos e Garagem',
            icone: 'car-outline',
            cor: '#607D8B',
            risco: 'Atropelamento',
            gravidade: 'CRITICO',
            mensagem: 'Crianças são baixas e não aparecem nos retrovisores.',
            cenarios: [
                'Manobras em garagem',
                'Entrada e saída de veículos',
                'Crianças brincando próximas'
            ],
            regra: 'Antes de ligar o carro, confirme onde estão as crianças.'
        },
        {
            id: 'passeio_pets',
            titulo: 'Passeio com Pets e Crianças',
            icone: 'paw-outline',
            cor: '#795548',
            risco: 'Acidentes de Trânsito',
            gravidade: 'MEDIO',
            mensagem: 'Atravessar ruas exige atenção total.',
            cenarios: [
                'Passeio com cachorro na guia',
                'Crianças de patins ou bicicleta',
                'Atravessando ruas'
            ],
            regra: 'Celular no bolso durante travessias.'
        }
    ],

    dicasPraticas: [
        {
            titulo: 'Defina Momentos Sem Tela',
            descricao: 'Banho das crianças, refeições, hora de brincar.'
        },
        {
            titulo: 'Use o Modo "Não Perturbe"',
            descricao: 'Configure horários automáticos para silenciar notificações.'
        },
        {
            titulo: 'Deixe o Celular em Outro Cômodo',
            descricao: 'Se não está com você, não vai te distrair.'
        },
        {
            titulo: 'Delegue a Supervisão',
            descricao: 'Se precisar usar o celular, peça para outro adulto vigiar.'
        },
        {
            titulo: 'Priorize Ligações',
            descricao: 'Se for urgente, atenda por áudio - mantém os olhos livres.'
        }
    ],

    alertasContextuais: {
        // Para exibir alertas baseados em contexto
        momentosBanho: {
            antes: 'Lembre-se: supervisão 100% durante o banho da criança.',
            durante: 'Evite usar o celular enquanto a criança está na água.'
        },
        momentosCozinha: {
            antes: 'Cozinha ativa = celular guardado.',
            durante: 'Não se distraia com o celular enquanto cozinha.'
        }
    },

    reflexao: {
        titulo: 'Pergunta para Reflexão',
        pergunta: 'Aquela mensagem pode esperar 5 minutos. E a segurança do seu filho?',
        resposta: 'A resposta é sempre SIM. A mensagem pode esperar.'
    },

    checklist: [
        { id: 'dist1', texto: 'Defini momentos "sem celular" em casa?' },
        { id: 'dist2', texto: 'Celular fica longe durante banho das crianças?' },
        { id: 'dist3', texto: 'Não uso celular enquanto cozinho com fogo aceso?' },
        { id: 'dist4', texto: 'Verifico onde estão as crianças antes de manobrar carro?' },
        { id: 'dist5', texto: 'Durante passeios, celular fica no bolso?' }
    ]
};

export default DISTRACAO_ELETRONICA;
