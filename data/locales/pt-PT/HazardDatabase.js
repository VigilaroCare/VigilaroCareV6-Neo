/**
 * HazardDatabase.js
 * Base de Conhecimento "Vigilaro Expert" - Riscos Domésticos Inerentes
 * 
 * Este banco de dados atua como a "Inteligência Central" do mapeamento de riscos.
 * Ele lista ambientes, itens comuns nesses ambientes e os riscos ocultos ou óbvios associados.
 * 
 * Estrutura:
 * - Environment (Ambiente)
 * - Items (Itens/Características)
 * - Risks (Riscos associados: Físico, Químico, Biológico, Ergonômico, Acidente)
 * - Target Groups (Quem corre mais perigo?)
 */

export const HAZARD_DATABASE_PT_PT = {
    // ==========================================
    // COZINHA: O "Laboratório" de Riscos
    // ==========================================
    'cozinha': {
        label: 'Cozinha',
        emoji: '🍳',
        risks_inherent: ['Queimaduras', 'Cortes', 'Incêndio', 'Intoxicação por Gás'],
        items: [
            {
                id: 'airfryer',
                label: 'Air Fryer / Fritadeira Elétrica',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Superfície externa aquece muito durante o uso.', target: ['crianca'] },
                    { type: 'queda', desc: 'O aparelho pode tombar e derramar gordura ou comida quente se o fio for puxado.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Nunca deixe a fritadeira de ar em cima de toalhas que crianças ou animais possam puxar. Mantenha o fio curto e arrumado, de preferência na parte de trás da bancada.'
            },
            {
                id: 'processador_mixer',
                label: 'Processador / Mixer / Liquidificador',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'corte', desc: 'As lâminas são extremamente cortantes, com risco de acidentes graves, sobretudo nos dedos.', target: ['crianca', 'adulto'] },
                    { type: 'eletrico', desc: 'Acionamento acidental durante limpeza.', target: ['adulto'] }
                ],
                expert_tip: 'Desligue sempre o aparelho da tomada depois de usar e antes de mexer ou limpar as lâminas. Guarde as peças cortantes desmontadas e num sítio alto.'
            },
            {
                id: 'potes_vidro',
                label: 'Utensílios de Vidro / Refratários',
                type: 'utensilio',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Explosão por choque térmico (quente -> frio).', target: ['todos'] },
                    { type: 'ingestao', desc: 'Pequenos cacos que ficam no chão depois de partir.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Se partir um tabuleiro de vidro ou um copo, apague a luz e aponte a lanterna do telemóvel paralela ao chão. Os caquinhos invisíveis vão brilhar no escuro. Apanhe-os de imediato.'
            },
            {
                id: 'forno_embutido',
                label: 'Forno Baixo / Embutido',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Vidro da porta atinge altas temperaturas. Altura dos olhos de crianças.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'O vidro exterior pode queimar ao toque, mesmo com isolamento térmico. Coloque um bloqueio de porta próprio para fornos. Com o forno ou o fogão a funcionar, nunca permita crianças na cozinha.'
            },
            {
                id: 'produtos_limpeza_pia',
                label: 'Produtos de Limpeza (Embaixo da Pia)',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestão acidental (confusão com bebidas) e queimaduras químicas.', target: ['crianca', 'pet', 'idoso_demencia'] },
                    { type: 'quimico', desc: 'Misturas perigosas (Cloro + Amônia = Gás Tóxico).', target: ['adulto'] }
                ],
                expert_tip: 'O armário "embaixo da pia" é o local mais perigoso da casa. Use travas magnéticas ou mude o local.'
            }
        ]
    },

    // ==========================================
    // ÁREA DE SERVIÇO: Química e Máquinas
    // ==========================================
    'area_servico': {
        label: 'Área de Serviço',
        emoji: 'guantes',
        risks_inherent: ['Intoxicação', 'Choque', 'Afogamento'],
        items: [
            {
                id: 'maquina_lavar_frontal',
                label: 'Máquina de Lavar (Abertura Frontal)',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'sufocamento', desc: 'Crianças pequenas e pets podem entrar e ficar presos (esconde-esconde).', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Mantenha a porta da máquina de lavar trancada ou fechada e a ficha fora da tomada quando não estiver a ser usada.'
            },
            {
                id: 'baldes_bacias',
                label: 'Baldes e Bacias com Água (Molho)',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Bebês podem se afogar em 5cm de água silenciosamente.', target: ['bebe', 'crianca'] }
                ],
                expert_tip: 'Acabou de usar o balde, a bacia ou o tanque? Esvazie-os de imediato. Guarde baldes e bacias de boca para baixo e não no chão. Ao alcance das crianças, elas podem brincar com a água das torneiras.'
            },
            {
                id: 'ferro_aquecido',
                label: 'Ferro de Passar',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Demora até 30min para esfriar totalmente após desligado.', target: ['crianca'] },
                    { type: 'queda', desc: 'Queda do objeto pesado sobre o pé ou cabeça ao puxar fio.', target: ['crianca'] }
                ],
                expert_tip: 'O risco continua após desligar. Guarde em local alto enquanto esfria (não no chão).'
            }
        ]
    },

    // ==========================================
    // BANHEIRO: O Vilão das Quedas
    // ==========================================
    'banheiro': {
        label: 'Banheiro',
        emoji: '🚿',
        risks_inherent: ['Quedas', 'Choque', 'Afogamento'],
        items: [
            {
                id: 'box_blindex',
                label: 'Box de Vidro (Blindex)',
                type: 'estrutura',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Estouro espontâneo ou por impacto, gerando milhares de cacos.', target: ['todos'] },
                    { type: 'aprisionamento', desc: 'A porta da base de duche pode encravar se alguém cair ou desmaiar encostado a ela.', target: ['idoso'] }
                ],
                expert_tip: 'Aplique película de segurança no vidro. Tenha chave reserva ou abertura fácil por fora.'
            },
            {
                id: 'tapete_comum',
                label: 'Tapete de Tecido (Sem antiderrapante)',
                type: 'objeto',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queda', desc: 'Deslizamento fatal em piso molhado, risco de fratura de fêmur/bacia.', target: ['idoso'] }
                ],
                expert_tip: 'A casa de banho usada por idosos ou pessoas com mobilidade reduzida NÃO deve ter tapete de tecido. Use apenas tapetes de borracha fixos.'
            },
            {
                id: 'tomada_pia',
                label: 'Tomada Próxima à Pia/Banheira',
                type: 'eletrico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'choque', desc: 'Queda de secador/barbeador na água (eletrocução).', target: ['todos'] }
                ],
                expert_tip: 'Veja no quadro elétrico se a casa de banho tem disjuntor diferencial para cortar a corrente em caso de contacto com a água.'
            }
        ]
    },

    // ==========================================
    // SALA / QUARTOS: Riscos "Confortáveis"
    // ==========================================
    'sala_quarto': {
        label: 'Sala e Quartos',
        emoji: '🛋️',
        risks_inherent: ['Quedas', 'Sufocamento', 'Tombamento'],
        items: [
            {
                id: 'tv_nao_fixada',
                label: 'TV em Rack/Móvel (Não fixada)',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'esmagamento', desc: 'Tombamento sobre crianças que tentam escalar o móvel para pegar algo.', target: ['crianca'] }
                ],
                expert_tip: 'TVs modernas são leves mas instáveis. Use fitas de ancoragem na parede ou no móvel.'
            },
            {
                id: 'mesa_centro_vidro',
                label: 'Mesa de Centro (Vidro/Quinas)',
                type: 'movel',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Trauma craniano ou corte supercílio em quedas de crianças aprendendo a andar.', target: ['bebe', 'crianca'] },
                    { type: 'quebra', desc: 'Quebra do vidro com peso ou impacto.', target: ['todos'] }
                ],
                expert_tip: 'Se tiver bebés a aprender a andar, guarde a mesa de centro durante alguns meses ou proteja as esquinas com protetores macios.'
            },
            {
                id: 'cortinas_cordoes',
                label: 'Cortinas com Cordões Longos',
                type: 'decoracao',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'estrangulamento', desc: 'Crianças brincam com o cordão e podem se enrolar no pescoço.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Corte os loops dos cordões ou use ganchos altos para mantê-los fora de alcance.'
            },
            {
                id: 'baterias_botao',
                label: 'Controles Remotos / Brinquedos (Bateria Botão)',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'ingestao', desc: 'Engolir uma pilha-botão provoca em 2 horas uma queimadura química grave no estômago.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Parafuse os compartimentos de bateria. Se sumir uma bateria, vá ao hospital imediatamente.'
            }
        ]
    },

    // ==========================================
    // ÁREAS EXTERNAS: O Perigo Aberto
    // ==========================================
    'externo': {
        label: 'Quintal e Jardim',
        emoji: '🌳',
        risks_inherent: ['Afogamento', 'Envenenamento', 'Animais'],
        items: [
            {
                id: 'plantas_toxicas',
                label: 'Plantas Ornamentais (Comigo-ninguém-pode, Azaleia)',
                type: 'biologico',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestão causa edema de glote e asfixia rápida.', target: ['crianca', 'pet'] },
                    { type: 'alergia', desc: 'Seiva pode causar queimaduras na pele/olhos.', target: ['todos'] }
                ],
                expert_tip: 'Identifique as plantas do seu quintal (consultar um especialista é uma boa opção). Se notar espécies tóxicas, passe-as para vasos suspensos ou ofereça-as.'
            },
            {
                id: 'churrasqueira',
                label: 'Churrasqueira / Fogo de Chão',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'A cinza por cima pode esconder brasas ainda muito quentes durante horas.', target: ['crianca', 'pet'] },
                    { type: 'explosao', desc: 'Atirar álcool líquido diretamente para o carvão para acender ou fazer chama.', target: ['todos'] }
                ],
                expert_tip: 'Isole a área da churrasqueira. Apague totalmente as brasas com água ao terminar.'
            },
            {
                id: 'piscina',
                label: 'Piscina / Espelho d\'água',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Silencioso e rápido (segundos). Ralos de sucção prendem cabelos.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Cerca física de 1.20m com portão autotravante é a única barreira eficaz. Capas não bastam.'
            }
        ]
    },

    // ==========================================
    // CIRCULAÇÃO E GERAL: Riscos Estruturais
    // ==========================================
    'circulacao': {
        label: 'Circulação e Estrutura',
        emoji: '🏠',
        risks_inherent: ['Quedas', 'Esmagamento', 'Cortes'],
        items: [
            {
                id: 'escadas_internas',
                label: 'Escadas Internas',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda', desc: 'Quedas em degraus sem corrimão firme ou desprotegidos. Risco elevado para bebés, crianças pequenas, idosos e pessoas com mobilidade reduzida ou baixa visão.', target: ['bebe', 'idoso'] },
                    { type: 'escorregamento', desc: 'Piso liso ou carpete solto nos degraus.', target: ['todos'] }
                ],
                expert_tip: 'Use portões de segurança fixos no topo e na base das escadas se tiver bebés e crianças pequenas (sobretudo as que gatinham).'
            },
            {
                id: 'janelas_sacadas',
                label: 'Janelas e Sacadas (Acima do Térreo)',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda_altura', desc: 'Queda fatal. Crianças escalam móveis para olhar a janela.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Redes de proteção certificadas são obrigatórias. Travas limitadoras ajudam, mas não substituem a rede.'
            },
            {
                id: 'portas_vidro',
                label: 'Portas de Vidro (Correr)',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'colisao', desc: 'Vidro muito limpo fica invisível. Crianças a correr e pessoas com baixa visão podem colidir com ele.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Use autocolantes visíveis à altura dos olhos das crianças e também dos adultos, para que todos — incluindo quem tem baixa visão — vejam o vidro.'
            }
        ]
    },

    // ==========================================
    // GARAGEM E OFICINA: Química e Cortes
    // ==========================================
    'garagem': {
        label: 'Garagem e Oficina',
        emoji: '🔧',
        risks_inherent: ['Intoxicação', 'Cortes', 'Incêndio'],
        items: [
            {
                id: 'ferramentas_eletricas',
                label: 'Ferramentas Elétricas (Furadeira, Serra)',
                type: 'ferramenta',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'corte', desc: 'Acionamento acidental por curiosidade.', target: ['crianca'] }
                ],
                expert_tip: 'Nunca guarde ferramentas ligadas à tomada. Guarde berbequins e serras elétricas em caixas fechadas num sítio alto, com os acessórios separados e arrumados.'
            },
            {
                id: 'quimicos_automotivos',
                label: 'Produtos Automotivos / Inflamáveis',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestão de líquidos coloridos (gasolina, aditivos).', target: ['crianca', 'pet'] },
                    { type: 'incendio', desc: 'Guardar bidões de combustível ou diluente perto de tomadas ou faíscas da garagem.', target: ['todos'] }
                ],
                expert_tip: 'Armazene em local ventilado, alto e trancado. Longe de fontes de calor.'
            }
        ]
    }
};

/**
 * Função para obter lista plana de TODOS os itens mapeáveis
 */
export function getAllHazardItems() {
    let items = [];
    Object.keys(HAZARD_DATABASE_PT_PT).forEach(key => {
        const area = HAZARD_DATABASE_PT_PT[key];
        const labeledItems = area.items.map(i => ({ ...i, areaId: key, areaLabel: area.label }));
        items = [...items, ...labeledItems];
    });
    return items;
}

/**
 * Função inteligente de filtro
 */
export function getRisksForProfile(inventoryIds, userProfiles) {
    // InventoryIds: Array de strings ['airfryer', 'piscina']
    // UserProfiles: Array de objetos perfil

    // Simplificação para MVP: Retorna lista de riscos baseada APENAS no inventário
    // O filtro de perfil deve ser feito na camada superior

    const risks = [];

    // Para cada item que o usuário TEM
    inventoryIds.forEach(itemId => {
        // Achar item no DB
        let foundItem = null;
        Object.keys(HAZARD_DATABASE_PT_PT).forEach(key => {
            const item = HAZARD_DATABASE_PT_PT[key].items.find(i => i.id === itemId);
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
