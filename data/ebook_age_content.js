/**
 * ebook_age_content.js
 * Conteúdo oficial do E-book de Prevenção de Acidentes
 * Vigilaro Care V5
 */

export const EBOOK_CONTENT = {
    'bebes-0-6': {
        title: 'Bebês de até 6 meses',
        description: 'Nesta fase inicial, seu bebê é totalmente dependente e está descobrindo o mundo. Os maiores cuidados giram em torno do sono seguro e proteção contra quedas.',
        icon: 'happy-outline',
        color: '#FF7043',
        risks: [
            {
                id: 'b06-1',
                titulo: 'Soninho Seguro',
                descricao: 'A posição de dormir é fundamental. O berço deve ser um ninho seguro, livre de objetos que possam sufocar.',
                prevencao: 'Sempre de barriga para cima. Lençóis bem presos e nada de protetores de berço fofinhos.',
                icone: 'bed-outline',
                cor: '#EF5350'
            },
            {
                id: 'b06-2',
                titulo: 'Trocas e Colinhos',
                descricao: 'Um segundo de distração pode bastar para uma queda. Bebês são surpreendentemente rápidos!',
                prevencao: 'Mantenha tudo à mão antes de começar. E evite bebidas quentes enquanto segura seu tesouro.',
                icone: 'alert-circle-outline',
                cor: '#FF7043'
            },
            {
                id: 'b06-3',
                titulo: 'Hora do Banho',
                descricao: 'A pele do bebê é sensível. O cuidado com a temperatura é essencial para um banho relaxante.',
                prevencao: 'Teste sempre a água com o cotovelo. Aqueça mamadeiras em banho-maria para evitar pontos quentes.',
                icone: 'thermometer-outline',
                cor: '#FFA726'
            },
            {
                id: 'b06-4',
                titulo: 'Amamentação',
                descricao: 'O momento de conexão também pede atenção para evitar engasgos.',
                prevencao: 'Garanta que o narizinho esteja livre e o queixo tocando a mama.',
                icone: 'heart-outline',
                cor: '#EC407A'
            }
        ],
        checklist: [
            { id: 'cb06-1', text: 'Bebê dormindo sempre de barriga para cima?' },
            { id: 'cb06-2', text: 'Berço livre de almofadas e bichinhos?' },
            { id: 'cb06-3', text: 'Lençóis bem esticados e presos?' },
            { id: 'cb06-4', text: 'Tudo prontinho à mão antes da troca?' },
            { id: 'cb06-5', text: 'Temperatura da água conferida?' },
            { id: 'cb06-6', text: 'Roupinhas seguras (sem cordões)?' }
        ]
    },
    'bebes-7-12': {
        title: 'Bebês de 7 a 12 meses',
        description: 'Que fase deliciosa! Seu bebê começa a engatinhar, explorar e levar tudo à boca. É hora de descer ao nível dele para proteger.',
        icon: 'walk-outline',
        color: '#4ECDC4',
        risks: [
            {
                id: 'b712-1',
                titulo: 'Curiosidade e Boca',
                descricao: 'Tudo que cabe na mão, vai para a boca. O chão vira o maior território de exploração.',
                prevencao: 'Varredura diária no chão. Remédios e produtos trancados no alto.',
                icone: 'medical-outline',
                cor: '#AB47BC'
            },
            {
                id: 'b712-2',
                titulo: 'Cozinha: Área Restrita',
                descricao: 'Fornos quentes e cabos de panela são magnéticos para olhares curiosos.',
                prevencao: 'O ideal é usar portãozinho na porta. Cozinha não é lugar de brincar.',
                icone: 'flame-outline',
                cor: '#EF5350'
            },
            {
                id: 'b712-3',
                titulo: 'Escaladas e Tomadas',
                descricao: 'Bebês tentam ficar em pé e usam móveis (e tomadas!) como apoio.',
                prevencao: 'Portões nas escadas e protetores em TODAS as tomadas.',
                icone: 'flash-outline',
                cor: '#FFCA28'
            },
            {
                id: 'b712-4',
                titulo: 'A Questão do Andador',
                descricao: 'Parece útil, mas oferece riscos sérios de tombamento e atrasa o desenvolvimento real.',
                prevencao: 'Prefira um cercadinho seguro ou deixar explorar o chão livre.',
                icone: 'walk-outline',
                cor: '#8D6E63'
            }
        ],
        checklist: [
            { id: 'cb712-1', text: 'Objetos pequenos longe do alcance?' },
            { id: 'cb712-2', text: 'Remédios e químicos trancados?' },
            { id: 'cb712-3', text: 'Grades na cozinha e escadas?' },
            { id: 'cb712-4', text: 'Protetores nas tomadas de toda casa?' },
            { id: 'cb712-5', text: 'Andador aposentado?' },
            { id: 'cb712-6', text: 'Bebê Conforto firme e ajustado?' }
        ]
    },
    'criancas-1-3': {
        title: 'Crianças de 1 a 3 anos',
        description: 'A fase da independência! Correm, sobem em tudo e abrem portas. A supervisão precisa ser constante, mas carinhosa.',
        icon: 'bicycle-outline',
        color: '#FFCA28', // Secondary
        risks: [
            {
                id: 'c13-1',
                titulo: 'Olhos Bem Abertos',
                descricao: 'Eles ainda não entendem o perigo, mas adoram explorar. Quedas e cortes são riscos reais.',
                prevencao: 'Supervisão sempre. Portas e escadas bloqueadas são seus melhores amigos.',
                icone: 'lock-closed-outline',
                cor: '#5C6BC0'
            },
            {
                id: 'c13-2',
                titulo: 'Exploradores de Armários',
                descricao: 'Embalagens coloridas de limpeza e remédios parecem doces para eles.',
                prevencao: 'Mantenha tudo no alto e trancado. Fósforos também bem longe.',
                icone: 'skull-outline',
                cor: '#D32F2F'
            },
            {
                id: 'c13-3',
                titulo: 'Hora de Comer',
                descricao: 'A coordenação ainda está em desenvolvimento.',
                prevencao: 'Use pratos e copos que não quebram. Cuidado com cadeirões instáveis.',
                icone: 'restaurant-outline',
                cor: '#66BB6A'
            }
        ],
        checklist: [
            { id: 'cc13-1', text: 'Portas de saída e escadas bloqueadas?' },
            { id: 'cc13-2', text: 'Fósforos e isqueiros bem escondidos?' },
            { id: 'cc13-3', text: 'Remédios inacessíveis mesmo se eles escalarem?' },
            { id: 'cc13-4', text: 'Utensílios de vidro trocados por plástico?' }
        ]
    },
    'criancas-3-5': {
        title: 'Crianças de 3 a 5 anos',
        description: 'Pequenos aventureiros! Começam a pedalar, subir em árvores e imitar os adultos. O diálogo começa a ser uma ferramenta de proteção.',
        icon: 'football-outline',
        color: '#FFD166',
        risks: [
            {
                id: 'c35-1',
                titulo: 'Aventuras (com Limites)',
                descricao: 'A confiança aumenta, mas a noção de risco não. Adoram brincar com fogo ou imitar uso de remédios.',
                prevencao: 'Supervisão visual constante. Conversar sobre "o que pode e não pode".',
                icone: 'bicycle-outline',
                cor: '#29B6F6'
            },
            {
                id: 'c35-2',
                titulo: 'Pequenos Ciclistas',
                descricao: 'As primeiras pedaladas trazem liberdade e riscos de quedas.',
                prevencao: 'Capacete é lei! Kit de proteção completo e lugar seguro para pedalar.',
                icone: 'bicycle-outline',
                cor: '#FFA726'
            }
        ],
        checklist: [
            { id: 'cc35-1', text: 'Sempre de olho nas brincadeiras externas?' },
            { id: 'cc35-2', text: 'Capacete sempre que subir na bicicleta?' },
            { id: 'cc35-3', text: 'Já conversaram sobre perigos do fogo e remédios?' },
            { id: 'cc35-4', text: 'Bicicleta com sinalização visível?' }
        ]
    },
    'criancas-6-14': {
        title: 'Crianças de 6 a 14 anos',
        description: 'A fase da energia explosiva e da autonomia. Querem ser heróis, saem mais de casa e precisam de orientação firme e amiga.',
        icon: 'school-outline',
        color: '#5C6BC0',
        risks: [
            {
                id: 'c614-1',
                titulo: 'Responsabilidade',
                descricao: 'Atitudes radicais, imitação de desafios na internet, tempo longe de casa.',
                prevencao: 'Mistura de disciplina com acolhimento. Monitorar onde e com quem estão.',
                icone: 'body-outline',
                cor: '#7E57C2'
            }
        ],
        checklist: [
            { id: 'cc614-1', text: 'Diálogo aberto sobre limites e cuidados?' },
            { id: 'cc614-2', text: 'Você sabe onde e com quem eles estão?' },
            { id: 'cc614-3', text: 'Equipamentos de proteção nos esportes?' }
        ]
    },
    'dicas-ouro': {
        title: 'Bebês e Crianças – Dicas de Ouro',
        description: 'Conselhos preciosos que valem para a infância toda. Prevenir é um ato de amor!',
        risks: [
            {
                id: 'do-1',
                titulo: 'Proteção nas Alturas',
                descricao: 'Janelas e sacadas são áreas críticas. A curiosidade não tem medo de altura.',
                prevencao: 'Telas ou grades certificadas são obrigatórias para sua paz de espírito.',
                icone: 'shield-checkmark-outline',
                cor: '#FBC02D'
            },
            {
                id: 'do-2',
                titulo: 'Coração da Casa (Cozinha)',
                descricao: 'Lugar de delícias, mas também de riscos. Cabos de panela são alavancas para acidentes.',
                prevencao: 'Cozinhe nas bocas de trás. Mantenha produtos perigosos no alto.',
                icone: 'restaurant-outline',
                cor: '#F57F17'
            },
            {
                id: 'do-3',
                titulo: 'Atenção aos Detalhes',
                descricao: 'Sacos plásticos (sufocamento), fios longos, cordões de cortina...',
                prevencao: 'Olhe sua casa na altura dos olhos da criança. Elimine essas armadilhas.',
                icone: 'warning-outline',
                cor: '#E65100'
            }
        ],
        checklist: [
            { id: 'cdo-1', text: 'Telas de proteção instaladas e seguras?' },
            { id: 'cdo-2', text: 'Protetores de tomada e travas de gaveta OK?' },
            { id: 'cdo-3', text: 'Cabos de panela sempre virados para dentro?' },
            { id: 'cdo-4', text: 'Produtos tóxicos guardados lá no alto?' },
            { id: 'cdo-5', text: 'Tapetes antiderrapantes para evitar escorregões?' }
        ]
    },
    'brinquedos': {
        title: 'Cuidados com Brinquedos',
        description: 'Brincar é coisa séria! A escolha certa e a manutenção dos brinquedos garantem a diversão sem sustos.',
        risks: [
            {
                id: 'bq-1',
                titulo: 'Teste do Rolo',
                descricao: 'Peças pequenas são um perigo real de engasgo.',
                prevencao: 'Se o brinquedo (ou peça) passa num rolo de papel higiênico, ele NÃO é seguro para menores de 3 anos.',
                icone: 'cube-outline',
                cor: '#EC407A'
            },
            {
                id: 'bq-2',
                titulo: 'Pilhas e Baterias',
                descricao: 'Baterias "botão" são gravíssimas se engolidas. Pilhas vazam substâncias tóxicas.',
                prevencao: 'Brinquedos a pilha devem ter o compartimento parafusado. Descarte certo as velhas.',
                icone: 'battery-dead-outline',
                cor: '#C2185B'
            },
            {
                id: 'bq-3',
                titulo: 'Fios e Cordões',
                descricao: 'Risco de enrolar no pescoço durante o sono ou brincadeira.',
                prevencao: 'Evite pendurar brinquedos no berço com fios longos.',
                icone: 'alert-circle-outline',
                cor: '#880E4F'
            }
        ],
        checklist: [
            { id: 'cbq-1', text: 'Brinquedos adequados para a idade da criança?' },
            { id: 'cbq-2', text: 'Embalagens plásticas jogadas fora?' },
            { id: 'cbq-3', text: 'Teste do rolo feito nas peças pequenas?' },
            { id: 'cbq-4', text: 'Brinquedos quebrados foram descartados?' },
            { id: 'cbq-5', text: 'Compartimento de pilhas está parafusado?' }
        ]
    },
    'adolescentes': {
        title: 'Adolescentes',
        description: 'Fase de descobertas e autoafirmação. Eles buscam superar limites, e nosso papel é orientar (sem sermão!).',
        icon: 'headset-outline',
        color: '#7E57C2',
        risks: [
            {
                id: 'ad-1',
                titulo: 'Papo Aberto',
                descricao: 'Trânsito, álcool, esportes radicais. Os riscos mudam de "dentro" para "fora" de casa.',
                prevencao: 'Diálogo constante, franco e sem tabus. Seja o porto seguro deles.',
                icone: 'flash-outline',
                cor: '#7B1FA2'
            }
        ],
        checklist: [
            { id: 'cad-1', text: 'Já conversaram sobre segurança no trânsito?' },
            { id: 'cad-2', text: 'Orientação clara sobre riscos de mergulho/água?' },
            { id: 'cad-3', text: 'Papo franco sobre álcool e drogas?' }
        ]
    },
    'adultos': {
        title: 'Adultos',
        description: 'Muitas vezes, a pressa e a autoconfiança excessiva são nossos inimigos. Se cuide para poder cuidar de quem ama!',
        icon: 'briefcase-outline',
        color: '#455A64',
        risks: [
            {
                id: 'adt-1',
                titulo: 'Sem Improvisos',
                descricao: 'Subir em banco bambo, mexer na elétrica descalço... O famoso "jeitinho" que causa acidentes.',
                prevencao: 'Use a ferramenta certa e EPIs. Sua integridade vale muito.',
                icone: 'construct-outline',
                cor: '#455A64'
            }
        ],
        checklist: [
            { id: 'cadt-1', text: 'Usando EPIs em reparos caseiros?' },
            { id: 'cadt-2', text: 'A escada doméstica está firme e segura?' },
            { id: 'cadt-3', text: 'Ambiente de trabalho/lazer está organizado?' }
        ]
    },
    'pcds': {
        title: 'Pessoas com Deficiência',
        description: 'Autonomia é a palavra-chave. Pequenas adaptações na casa geram grandes liberdades e evitam acidentes.',
        icon: 'accessibility-outline',
        color: '#8B5CF6',
        risks: [
            {
                id: 'pne-1',
                titulo: 'Circulação Livre',
                descricao: 'Portas estreitas e degraus são barreiras invisíveis. O espaço precisa fluir.',
                prevencao: 'Portas mais largas, rampas suaves e corredores livres de móveis.',
                icone: 'accessibility-outline',
                cor: '#C2185B'
            },
            {
                id: 'pne-2',
                titulo: 'Banheiro Acessível',
                descricao: 'Privacidade e segurança. Barras e alturas corretas fazem toda diferença.',
                prevencao: 'Instale barras de apoio e garanta acesso fácil à pia e vaso.',
                icone: 'water-outline',
                cor: '#0288D1'
            }
        ],
        checklist: [
            { id: 'cpne-1', text: 'Portas largas o suficiente para passagem?' },
            { id: 'cpne-2', text: 'Barras de apoio firmes onde precisa?' },
            { id: 'cpne-3', text: 'Móveis permitem circular sem esbarrar?' },
            { id: 'cpne-4', text: 'Desníveis corrigidos com rampas?' }
        ]
    },
    'idosos': {
        title: 'Idosos',
        description: 'Respeito e cuidado. Nosso objetivo é preservar a autonomia, evitando as quedas que podem ser tão perigosas.',
        icon: 'glasses-outline',
        color: '#FFA726',
        risks: [
            {
                id: 'id-1',
                titulo: 'Evitando Quedas',
                descricao: 'O trajeto noturno é crítico. Um ambiente seguro permite caminhar com confiança.',
                prevencao: 'Iluminação boa (luz guia à noite), barras de apoio e ADEUS tapetes soltos.',
                icone: 'body-outline',
                cor: '#F57F17'
            },
            {
                id: 'id-2',
                titulo: 'Segurança no Banho',
                descricao: 'Piso molhado e sabão são perigosos. O banheiro deve ser um santuário de segurança.',
                prevencao: 'Piso antiderrapante e barras firmes (box e vaso) são essenciais.',
                icone: 'water-outline',
                cor: '#0288D1'
            },
            {
                id: 'id-3',
                titulo: 'Casa Amiga do Idoso',
                descricao: 'Organização, luz e sapatos certos.',
                prevencao: 'Calçados fechados e firmes. Corrimãos nas escadas. Móveis que não tombam.',
                icone: 'star-outline',
                cor: '#FFD600'
            },
            {
                id: 'id-4',
                titulo: 'Hora do Remédio',
                descricao: 'Tomar o remédio certo, na hora certa, sem confusão.',
                prevencao: 'Use um organizador de pílulas e mantenha o acompanhamento médico.',
                icone: 'medical-outline',
                cor: '#43A047'
            }
        ],
        checklist: [
            { id: 'cid-1', text: 'Tapetes soltos foram removidos de vez?' },
            { id: 'cid-2', text: 'Banheiro tem barras de apoio instaladas?' },
            { id: 'cid-3', text: 'Tem luz guia no caminho quarto-banheiro?' },
            { id: 'cid-4', text: 'Usando calçados fechados e seguros?' },
            { id: 'cid-5', text: 'Corrimãos firmes nos dois lados da escada?' },
            { id: 'cid-6', text: 'Remédios organizados para não confundir?' }
        ]
    }
};

