/**
 * HazardDatabase.js
 * Base de Conhecimento "Vigilaro Expert" - Riscos Domésticos Inerentes
 */

export const HAZARD_DATABASE_PT_BR = {
    // ==========================================
    // COZINHA
    // ==========================================
    'cozinha': {
        label: 'Cozinha',
        emoji: '🍳',
        risks_inherent: ['Queimaduras', 'Cortes', 'Incêndio', 'Vazamento de Gás'],
        items: [
            {
                id: 'airfryer',
                label: 'Air Fryer / Fritadeira Elétrica',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'As laterais externas da fritadeira esquentam muito no uso e queimam se encostar.', target: ['crianca'] },
                    { type: 'queda', desc: 'O aparelho pode tombar e derramar gordura ou comida quente se o fio for puxado.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Nunca deixe a fritadeira em cima de toalhas que crianças ou pets possam puxar. Deixe o fio elétrico curto e bem organizado preferencialmente na parte de trás da bancada.'
            },
            {
                id: 'processador_mixer',
                label: 'Processador / Mixer / Liquidificador',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'corte', desc: 'As lâminas são altamente cortantes, com risco de acidentes sérios principalmente nos dedos.', target: ['crianca', 'adulto'] },
                    { type: 'eletrico', desc: 'Ligar o aparelho por engano com a mão nas lâminas durante a limpeza.', target: ['adulto'] }
                ],
                expert_tip: 'Tire sempre o aparelho da tomada após o uso e antes de mexer ou limpar as lâminas. Guarde as peças cortantes desmontadas e no alto.'
            },
            {
                id: 'potes_vidro',
                label: 'Travessas e Potes de Vidro',
                type: 'utensilio',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Vidros comuns podem estourar com mudanças bruscas de temperatura.', target: ['todos'] },
                    { type: 'ingestao', desc: 'Cacos minúsculos que ficam no chão após a quebra.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Se quebrar um refratário ou copo, apague a luz e mire a lanterna do celular paralela ao chão. Os caquinhos invisíveis vão brilhar no escuro. Efetue a coleta imediatamente.'
            },
            {
                id: 'forno_embutido',
                label: 'Forno Baixo / Embutido',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'O vidro da porta do forno fica muito quente, bem na altura do rosto de crianças pequenas.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'O vidro externo, se tocado, pode queimar mesmo com isolamento térmico. Coloque uma trava de porta específica para fornos. Com o forno ou fogão em uso, jamais permita crianças na cozinha.'
            },
            {
                id: 'produtos_limpeza_pia',
                label: 'Produtos de Limpeza (Embaixo da Pia)',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingerir desinfetante ou sabão por achar que é suco ou refrigerante.', target: ['crianca', 'pet', 'idoso_demencia'] },
                    { type: 'quimico', desc: 'Misturar água sanitária com amônia solta gases que asfixiam.', target: ['adulto'] }
                ],
                expert_tip: 'O armário debaixo da pia é a maior armadilha de envenenamento da casa. Mude os produtos para um armário alto ou instale travas plásticas.'
            }
        ]
    },

    // ==========================================
    // ÁREA DE SERVIÇO
    // ==========================================
    'area_servico': {
        label: 'Área de Serviço',
        emoji: 'guantes',
        risks_inherent: ['Intoxicação', 'Choque Elétrico', 'Afogamento'],
        items: [
            {
                id: 'maquina_lavar_frontal',
                label: 'Máquina de Lavar (Porta Frontal)',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'sufocamento', desc: 'Crianças pequenas ou gatos podem entrar na máquina durante brincadeiras de esconde-esconde.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Mantenha a porta da máquina de lavar trancada ou fechada e com o cabo fora da tomada quando não estiver em uso.'
            },
            {
                id: 'baldes_bacias',
                label: 'Baldes e Bacias com Água de Molho',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Bebês podem se afogar de cabeça para baixo em baldes com apenas 5 centímetros de água.', target: ['bebe', 'crianca'] }
                ],
                expert_tip: 'Acabou de usar o balde, bacia ou tanque? Esvazie-os imediatamente. Guarde de cabeça para baixo (baldes e bacias) e não os guarde no chão. Ao alcance das crianças, elas podem brincar com a água das torneiras.'
            },
            {
                id: 'ferro_aquecido',
                label: 'Ferro de Passar Roupas',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'A base do ferro continua quente o suficiente para queimar por até 30 minutos depois de desligado.', target: ['crianca'] },
                    { type: 'queda', desc: 'Puxar o cabo pendurado e derrubar o ferro pesado sobre a cabeça ou pé.', target: ['crianca'] }
                ],
                expert_tip: 'Não deixe o ferro esfriando na tábua de passar. Coloque-o em uma prateleira alta e fora do alcance enquanto esfria.'
            }
        ]
    },

    // ==========================================
    // BANHEIRO
    // ==========================================
    'banheiro': {
        label: 'Banheiro',
        emoji: '🚿',
        risks_inherent: ['Quedas', 'Choques', 'Afogamento'],
        items: [
            {
                id: 'box_blindex',
                label: 'Box de Vidro',
                type: 'estrutura',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'O vidro temperado pode estourar com impactos nas quinas, espalhando cacos afiados.', target: ['todos'] },
                    { type: 'aprisionamento', desc: 'A porta do box pode emperrar se houver queda e desmaio ao encostar nela.', target: ['idoso'] }
                ],
                expert_tip: 'Coloque uma película de segurança transparente no vidro do box. Ela segura os cacos e reduz o risco de cortes se o vidro quebrar.'
            },
            {
                id: 'tapete_comum',
                label: 'Tapetes de Tecido Soltos',
                type: 'objeto',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queda', desc: 'Escorregar no tapete de pano ao sair do banho, causando fraturas graves.', target: ['idoso'] }
                ],
                expert_tip: 'Nunca use tapetes de tecido soltos em banheiros usados por idosos ou pessoas com mobilidade reduzida. Dê preferência a tapetes de borracha com ventosas.'
            },
            {
                id: 'tomada_pia',
                label: 'Tomadas perto da Pia ou Banheira',
                type: 'eletrico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'choque', desc: 'Secadores ou pranchas de cabelo que caem na pia com água (risco de eletrocussão).', target: ['todos'] }
                ],
                expert_tip: 'Veja o painel elétrico se o seu banheiro conta com o disjuntor DR para cortar a energia em caso de contato com a água.'
            }
        ]
    },

    // ==========================================
    // SALA / QUARTOS
    // ==========================================
    'sala_quarto': {
        label: 'Sala e Quartos',
        emoji: '🛋️',
        risks_inherent: ['Quedas', 'Asfixia', 'Esmagamento'],
        items: [
            {
                id: 'tv_nao_fixada',
                label: 'Televisor sobre Racks (Solto)',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'esmagamento', desc: 'A TV pode tombar por cima se a criança subir nas gavetas do rack para alcançar a tela.', target: ['crianca'] }
                ],
                expert_tip: 'TVs finas são muito leves na frente. Prenda a TV na parede com suporte ou use cabos de aço ancorados no móvel.'
            },
            {
                id: 'mesa_centro_vidro',
                label: 'Mesa de Centro de Vidro ou com Quinas',
                type: 'movel',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Bebês em fase de dar os primeiros passos podem cair de rosto nas quinas afiadas da mesa.', target: ['bebe', 'crianca'] },
                    { type: 'quebra', desc: 'Subir na mesa de vidro ou apoiar peso excessivo e quebrá-la.', target: ['todos'] }
                ],
                expert_tip: 'Se tiver bebês aprendendo a andar, guarde a mesa de centro por alguns meses ou proteja as quinas com protetores macios.'
            },
            {
                id: 'cortinas_cordoes',
                label: 'Cordonês de Persianas e Cortinas',
                type: 'decoracao',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'estrangulamento', desc: 'Crianças pequenas colocam a cabeça nos laços dos cordões e se asfixiam.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Enrole ou prenda as cordinhas em ganchos no alto da parede, bem longe do chão e do alcance das mãos.'
            },
            {
                id: 'baterias_botao',
                label: 'Controles e Chaves com Pilha Redonda',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'ingestao', desc: 'Engolir a pilha redonda causa em 2 horas queimadura química severa no estômago.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Garanta que controles remotos ou chaves de carro tenham a tampinha das pilhas parafusada ou muito bem travada.'
            }
        ]
    },

    // ==========================================
    // QUINTAL E JARDIM
    // ==========================================
    'externo': {
        label: 'Quintal e Jardim',
        emoji: '🌳',
        risks_inherent: ['Afogamento', 'Envenenamento', 'Animais peçonhentos'],
        items: [
            {
                id: 'plantas_toxicas',
                label: 'Plantas Tóxicas (Comigo-ninguém-pode, Copo-de-leite)',
                type: 'biologico',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Mastigar folhas causa inchaço na garganta e impede a passagem de ar.', target: ['crianca', 'pet'] },
                    { type: 'alergia', desc: 'A seiva líquida da planta gera irritações e coceiras fortes nos olhos e pele.', target: ['todos'] }
                ],
                expert_tip: 'Identifique as plantas do seu quintal (consultar um especialista é uma boa opção). Se notar espécies tóxicas, mude-as para vasos suspensos ou doe.'
            },
            {
                id: 'churrasqueira',
                label: 'Churrasqueira e Fogareiros',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Cinzas por cima podem esconder brasas ainda muito quentes por horas.', target: ['crianca', 'pet'] },
                    { type: 'explosao', desc: 'Jogar álcool líquido direto no carvão para acender ou causar chama.', target: ['todos'] }
                ],
                expert_tip: 'Resfrie as cinzas jogando água fria assim que o churrasco terminar. Nunca use álcool líquido inflamável.'
            },
            {
                id: 'piscina',
                label: 'Piscina e Fontes de Água',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Afogamento é rápido, não faz barulho e ocorre em menos de 2 minutos.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Use cercas de pelo menos 1,50 m ao redor da piscina com portão trancado por fora. Capas de lona não impedem quedas.'
            }
        ]
    },

    // ==========================================
    // CIRCULAÇÃO
    // ==========================================
    'circulacao': {
        label: 'Circulação e Estrutura',
        emoji: '🏠',
        risks_inherent: ['Quedas', 'Esmagamento', 'Cortes'],
        items: [
            {
                id: 'escadas_internas',
                label: 'Escadas de Acesso Interno',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda', desc: 'Quedas em degraus sem corrimão firme ou desprotegidos. Risco alto para bebês, crianças pequenas, idosos e pessoas com mobilidade reduzida ou baixa visão.', target: ['bebe', 'idoso'] },
                    { type: 'escorregamento', desc: 'Pisos muito polidos ou tapetes decorativos colocados nos degraus.', target: ['todos'] }
                ],
                expert_tip: 'Use portõezinhos de segurança (grades) fixados no topo e na base das escadas se tiver bebês e crianças pequenas (principalmente as que engatinham).'
            },
            {
                id: 'janelas_sacadas',
                label: 'Janelas e Sacadas Altas',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda_altura', desc: 'Queda fatal. Crianças sobem em sofás ou cadeiras para espiar fora da janela.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'A única proteção confiável contra quedas em apartamentos é a rede de proteção instalada por empresa certificada.'
            },
            {
                id: 'portas_vidro',
                label: 'Portas de Correr de Vidro',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'colisao', desc: 'Vidro transparente muito limpo fica invisível. Crianças correndo e pessoas com baixa visão podem colidir e quebrar o vidro.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Cole faixas adesivas na altura dos olhos das crianças e também na dos adultos, para que todos — inclusive quem tem baixa visão — vejam que a porta está fechada.'
            }
        ]
    },

    // ==========================================
    // GARAGEM E OFICINA
    // ==========================================
    'garagem': {
        label: 'Garagem e Oficina',
        emoji: '🔧',
        risks_inherent: ['Intoxicação', 'Cortes', 'Incêndio'],
        items: [
            {
                id: 'ferramentas_eletricas',
                label: 'Ferramentas de Corte e Furadeiras',
                type: 'ferramenta',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'corte', desc: 'Curiosidade em ligar aparelhos elétricos com serras ou brocas expostas.', target: ['crianca'] }
                ],
                expert_tip: 'Nunca guarde ferramentas na tomada. Guarde furadeiras e serras elétricas em caixas fechadas no alto e com seus acessórios separados e organizados.'
            },
            {
                id: 'quimicos_automotivos',
                label: 'Fluidos de Carro e Inflamáveis',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Líquidos coloridos e doces (como fluido de radiador) ingeridos por engano.', target: ['crianca', 'pet'] },
                    { type: 'incendio', desc: 'Armazenar galões de combustível ou thinner perto de tomadas ou faíscas da garagem.', target: ['todos'] }
                ],
                expert_tip: 'Guarde óleos, fluidos e tintas em prateleiras altas da garagem, longe do calor do motor do carro.'
            }
        ]
    }
};

/**
 * Função para obter lista plana de TODOS os itens mapeáveis
 */
export function getAllHazardItems() {
    let items = [];
    Object.keys(HAZARD_DATABASE_PT_BR).forEach(key => {
        const area = HAZARD_DATABASE_PT_BR[key];
        const labeledItems = area.items.map(i => ({ ...i, areaId: key, areaLabel: area.label }));
        items = [...items, ...labeledItems];
    });
    return items;
}

/**
 * Função inteligente de filtro
 */
export function getRisksForProfile(inventoryIds, userProfiles) {
    const risks = [];

    // Para cada item que o usuário TEM
    inventoryIds.forEach(itemId => {
        let foundItem = null;
        Object.keys(HAZARD_DATABASE_PT_BR).forEach(key => {
            const item = HAZARD_DATABASE_PT_BR[key].items.find(i => i.id === itemId);
            if (item) foundItem = item;
        });

        if (foundItem) {
            risks.push({
                itemId: foundItem.id,
                itemLabel: foundItem.label,
                riskLevel: foundItem.riskLevel,
                hazards: foundItem.hazards,
                expert_tip: foundItem.expert_tip
            });
        }
    });

    return risks;
}
