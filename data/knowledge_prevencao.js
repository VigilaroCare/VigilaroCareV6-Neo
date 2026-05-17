/**
 * data/knowledge_prevencao.js
 *
 * Base de dados consultiva para o módulo educacional de Prevenção por Ambientes.
 * Textos aprofundados, ricos e formatados para leitura estilo "artigo",
 * servindo como a consultoria premium do app.
 *
 * Auditoria de imagens (Mai/2026):
 * - Todas as URLs Unsplash padronizadas com auto=format&fit=crop&q=80&w=1200
 * - Adicionadas 6 entradas faltantes (despensa, quartos, varanda, quintal,
 *   garagem, areas_coletivas) — antes caíam em fallback errado mostrando
 *   sala/quarto-idoso/piscina/area-serviço como conteúdo de outro ambiente.
 * - Mapa de sinônimos refinado para não confundir contextos diferentes.
 */

export const MAPA_PREVENCAO = {
    sala: {
        id: 'sala',
        nome: 'Sala de Estar',
        emoji: '🛋️',
        cor: '#9C27B0',
        capa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A sala de estar é o coração da casa, mas também o local onde mais ocorrem pequenos acidentes domésticos devido ao alto fluxo de circulação.'
            },
            {
                tipo: 'topico',
                titulo: 'A Ameaça Silenciosa dos Móveis',
                texto: 'Estantes, racks e aparelhos de TV que não estão firmemente fixados na parede (anti-tombamento) representam risco crítico, especialmente para crianças pequenas que usam gavetas como "escadas". A recomendação é sempre ancorar móveis pesados usando fitas de segurança ou buchas adequadas.'
            },
            {
                tipo: 'topico',
                titulo: 'Quedas e Tropeços',
                texto: 'Cerca de 30% das quedas de idosos ocorrem na sala de estar. Tapetes soltos, fios de eletrônicos atravessando o chão e mesas de centro de vidro pontiagudas são os maiores vilões. Use fitas antiderrapantes sob os tapetes ou remova-os completamente se houver idosos na casa. Organize os fios atrás dos móveis ou use canaletas.'
            },
            {
                tipo: 'dica',
                texto: 'Proteja as quinas! Mesas de centro e racks com bordas vivas devem receber protetores de silicone para evitar lesões graves na cabeça de bebês e crianças em fase de aprendizado a andar.'
            }
        ]
    },

    cozinha: {
        id: 'cozinha',
        nome: 'Cozinha',
        emoji: '🍳',
        cor: '#FF9800',
        capa: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Estatisticamente, a cozinha é o ambiente mais perigoso de toda a residência. Fogo, lâminas, gás e água fervente coabitam este espaço.'
            },
            {
                tipo: 'topico',
                titulo: 'Regras de Ouro no Fogão',
                texto: 'A regra número um da cozinha: priorize sempre as bocas de trás do fogão. Cabos de panelas devem ficar virados para o centro ou para trás, nunca voltados para a borda. Uma panela de água fervente virada sobre uma criança causa queimaduras de 2º e 3º grau irreversíveis.'
            },
            {
                tipo: 'topico',
                titulo: 'Armazenamento de Químicos',
                texto: 'Produtos de limpeza (soda cáustica, desengordurantes, água sanitária) são frequentemente guardados sob a pia. Para a ótica de uma criança inspecionando armários baixos, embalagens coloridas parecem sucos. Guarde todos os produtos químicos em armários altos ou instale travas magnéticas nas portas inferiores.'
            },
            {
                tipo: 'topico',
                titulo: 'Cortes e Eletrodomésticos',
                texto: 'Facas afiadas não devem ficar secando soltas no escorredor; guarde-as em blocos de madeira ou gavetas específicas ao terminar. Eletrodomésticos com lâminas (liquidificadores, processadores) devem ser mantidos fora da tomada enquanto não estiverem em uso direto.'
            },
            {
                tipo: 'dica',
                texto: 'Evite toalhas de mesa compridas se houver crianças. Puxar a ponta da toalha é um instinto comum que pode trazer todo o conteúdo quente de pratos e travessas diretamente sobre elas.'
            }
        ]
    },

    despensa: {
        id: 'despensa',
        nome: 'Despensa',
        emoji: '🥫',
        cor: '#FB8C00',
        capa: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A despensa parece inofensiva, mas concentra dois riscos silenciosos: pragas atraídas pelos alimentos e o desmoronamento de prateleiras mal dimensionadas.'
            },
            {
                tipo: 'topico',
                titulo: 'Organização Anti-queda',
                texto: 'Mantenha os itens mais pesados (latas, garrafas, sacos de arroz) nas prateleiras intermediárias — nunca acima da altura dos ombros. Uma única lata de leite condensado caindo da altura de 1,80 m pode causar concussão em uma criança. Prateleiras de melamina e MDF precisam de mãos-francesas a cada 60 cm para suportar o peso real.'
            },
            {
                tipo: 'topico',
                titulo: 'Pragas e Contaminação',
                texto: 'Alimentos secos como farinha, açúcar e cereais devem ser transferidos para recipientes herméticos assim que abertos. Restos em embalagens originais atraem traças, baratas e ratos — vetores de doenças. Inspecione mensalmente os cantos e atrás das prateleiras procurando fezes ou trilhas.'
            },
            {
                tipo: 'topico',
                titulo: 'Validade e Rotação',
                texto: 'Aplique a regra PEPS (Primeiro que Entra, Primeiro que Sai): produtos novos vão para o fundo, antigos para frente. Verifique validades a cada 60 dias. Alimentos vencidos podem causar intoxicação grave, especialmente conservas (risco de botulismo) e laticínios.'
            },
            {
                tipo: 'dica',
                texto: 'Mantenha uma lanterna pendurada perto da porta. Em emergências (falta de luz, terremoto, alagamento), a despensa vira o primeiro lugar a ser visitado — e tropeçar no escuro é regra.'
            }
        ]
    },

    banheiro: {
        id: 'banheiro',
        nome: 'Banheiro',
        emoji: '🚿',
        cor: '#2196F3',
        capa: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Água e superfícies lisas formam uma combinação fatal. O banheiro exige atenção extrema à aderência e organização.'
            },
            {
                tipo: 'topico',
                titulo: 'A Regra Anti-Afogamento',
                texto: 'Crianças pequenas podem se afogar em apenas 3 dedos de água. Nunca, sob nenhuma circunstância, deixe bacias, baldes ou banheiras cheias de água desacompanhadas. Após o banho infantil, esvazie imediatamente os recipientes. A tampa do vaso sanitário deve permanecer abaixada e, idealmente, travada com um fecho de segurança.'
            },
            {
                tipo: 'topico',
                titulo: 'Quedas no Banho',
                texto: 'Tanto para crianças curiosas quanto para idosos, o box do chuveiro é uma pista escorregadia. Tapetes de sucção antiderrapantes dentro do box são mandatórios. Para idosos, a instalação de barras de apoio (fixadas com parafusos, jamais ventosas) dentro do box e ao lado do vaso sanitário pode salvar vidas e garantir autonomia.'
            },
            {
                tipo: 'topico',
                titulo: 'Medicamentos e Eletricidade',
                texto: 'Apesar de comum, o armário de espelho do banheiro sofre com umidade e não é o ideal para a eficácia de remédios. Pior: coloca drogas ao alcance fácil. Guarde medicamentos em caixas altas. Mantenha secadores de cabelo e barbeadores elétricos longe da borda da pia e sempre desconectados após o uso.'
            }
        ]
    },

    quartos: {
        id: 'quartos',
        nome: 'Quarto do Casal',
        emoji: '🛏️',
        cor: '#7E57C2',
        capa: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Quartos de adultos parecem ambientes neutros, mas concentram fontes de incêndio, sufocamento e quedas noturnas frequentemente subestimadas.'
            },
            {
                tipo: 'topico',
                titulo: 'Eletrônicos Carregando à Noite',
                texto: 'Celulares e tablets carregando sob travesseiros ou sobre a cama são a principal causa moderna de incêndios noturnos em quartos. A bateria de lítio em curto pode atingir 600 °C em segundos. Carregue sempre em superfícies rígidas (mesa, criado-mudo) longe de tecidos e nunca durante a noite inteira.'
            },
            {
                tipo: 'topico',
                titulo: 'Caminho Noturno Desimpedido',
                texto: 'Adultos cansados, acordando de madrugada para ir ao banheiro, são vítimas frequentes de quedas. Mantenha o caminho da cama até a porta livre de cabos, calçados e quinas pontiagudas. Uma luz noturna LED de baixa intensidade próxima ao chão evita acidentes sem comprometer o sono.'
            },
            {
                tipo: 'topico',
                titulo: 'Cobertores, Velas e Aromas',
                texto: 'Cobertores elétricos antigos com fios desencapados, velas perfumadas esquecidas acesas e aromatizadores próximos a cortinas são causas reais de incêndio noturno. Velas só com bases de cerâmica resistente em pratos largos; cobertor elétrico sempre desligado ao dormir.'
            },
            {
                tipo: 'dica',
                texto: 'Mantenha uma lanterna e o celular carregado ao alcance da cama. Em emergências noturnas (terremoto, incêndio, intrusão), os primeiros 10 segundos no escuro fazem toda a diferença.'
            }
        ]
    },

    quarto_bebe: {
        id: 'quarto_bebe',
        nome: 'Quarto de Bebê',
        emoji: '👶',
        cor: '#FF4081',
        capa: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O berço deve ser o lugar mais seguro do mundo. Infelizmente, práticas estéticas muitas vezes ignoram protocolos vitais de segurança.'
            },
            {
                tipo: 'topico',
                titulo: 'O Berço Nu',
                texto: 'A Sociedade Brasileira de Pediatria é clara: até os 12 meses de idade, o berço deve estar vazio. Sem travesseiros, sem cobertores soltos, sem pelúcias e, principalmente, SEM kits de berço (protetores laterais acolchoados). O risco de morte súbita e asfixia mecânica por rolamento contra as laterais fofas é altíssimo. Use apenas um lençol bem preso de elástico e sacos de dormir para o bebê, se estiver frio.'
            },
            {
                tipo: 'topico',
                titulo: 'Distâncias Vitais',
                texto: 'O berço nunca deve encostar em janelas e deve estar distante das cordas de persianas ou cortinas, que apresentam severo risco de estrangulamento. O espaçamento das grades não deve permitir a passagem da cabeça do bebê (máximo de 6 cm entre grades, conforme NBR 15860).'
            },
            {
                tipo: 'dica',
                texto: 'Troca de fraldas não tem pausa: mantenha sempre uma mão sobre o bebê, mesmo que você precise se esticar para alcançar um lençol.'
            }
        ]
    },

    quarto_crianca: {
        id: 'quarto_crianca',
        nome: 'Quarto Infantil',
        emoji: '🧸',
        cor: '#E91E63',
        capa: 'https://images.unsplash.com/photo-1558899603-bbd64b6e8a48?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Um reino de brincadeiras precisa blindar a criatividade da criança contra armadilhas estruturais.'
            },
            {
                tipo: 'topico',
                titulo: 'Ameaça de Altura: Janelas e Móveis',
                texto: 'Redes de proteção nas janelas são a defesa máxima e devem ser instaladas e revisadas a cada 3 a 5 anos. Crianças gostam de escalar. Além de telas, certifique-se de que não haja poltronas e camas posicionadas logo abaixo das janelas.'
            },
            {
                tipo: 'topico',
                titulo: 'O Teste do Rolo de Papel',
                texto: 'Para crianças menores de 3 anos, engasgos com peças pequenas são comuns. Uma boa métrica é o tubo de papel higiênico: se a peça do brinquedo couber inteira e passar livremente por dentro de um rolo vazio, ela é pequena demais e representa risco letal de asfixia. Banir esses brinquedos no ambiente.'
            },
            {
                tipo: 'topico',
                titulo: 'Eletricidade ao Alcance',
                texto: 'O quarto precisa ter todas as tomadas que não estão em uso travadas com protetores isolantes. Brinquedos eletrônicos que levam "pilhas moeda/botão" (aquelas redondinhas) devem ter seus compartimentos PARAFUSADOS firmemente. A ingestão de pilhas botão queima as paredes do esôfago em poucas horas através de grave reação química.'
            }
        ]
    },

    quarto_idoso: {
        id: 'quarto_idoso',
        nome: 'Quarto do Idoso',
        emoji: '👴',
        cor: '#8D6E63',
        capa: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O santuário de repouso necessita de visão clara noturna e zero barreiras para garantir a plenitude da estabilidade de marcha.'
            },
            {
                tipo: 'topico',
                titulo: 'A Visão Noturna',
                texto: 'Ir ao banheiro de madrugada é a situação de risco mais grave. O quarto do idoso deve ter abajures muito perto da cama ou luzes noturnas (footlights) esmaecidas na base das paredes, mostrando nitidamente o caminho desimpedido até o banheiro.'
            },
            {
                tipo: 'topico',
                titulo: 'Cama e Mobilidade',
                texto: 'A altura da cama importa de verdade. Colchões baixos demais farão o idoso pender pra trás ao se levantar; altos demais forçam descida brusca. Eles devem conseguir tocar a planta inteira dos pés no chão ao se sentarem nas bordas. Uma cama firme com apoio central é essencial.'
            },
            {
                tipo: 'dica',
                texto: 'Jamais deixe chinelos flácidos sem solado liso. Evite o terror silencioso das pontas enroladas de tapete. Reduza a fricção ao mínimo entre acordar e levantar.'
            }
        ]
    },

    area_servico: {
        id: 'area_servico',
        nome: 'Área de Serviço',
        emoji: '🧺',
        cor: '#00BCD4',
        capa: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A lavanderia reúne potentes fatores de risco: alto fluxo elétrico de máquinas, produtos químicos puros e pisos habitualmente molhados.'
            },
            {
                tipo: 'topico',
                titulo: 'Máquinas e Vasilhames de Água',
                texto: 'Baldes de molho encharcados atraem crianças engatinhantes que tropeçam em mergulhos fatais. Mantenha tanques e baldes secos ou inacessíveis com portões na lavanderia. Evite severamente o uso de fios de extensão para alimentar máquina de lavar e secadora — a potência causa superaquecimento (efeito Joule) e risco real de incêndio.'
            },
            {
                tipo: 'topico',
                titulo: 'Biológico e Químico',
                texto: 'Produtos de limpeza devem permanecer em suas garrafas originais. JAMAIS faça transbordo para garrafas pet de refrigerante — crianças engolem o líquido em segundos pensando ser suco. Estrados vazios atrás da máquina são abrigo oculto para escorpiões no verão tropical. Mantenha o local impecavelmente limpo.'
            }
        ]
    },

    central_gas: {
        id: 'central_gas',
        nome: 'Central de Gás',
        emoji: '🔥',
        cor: '#D32F2F',
        capa: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O poder adormecido do gás GLP não perdoa a falha de ventilação ou confinamento.'
            },
            {
                tipo: 'topico',
                titulo: 'Posicionamento e Ventilação',
                texto: 'Botijões P13 e cilindros P45 em residências ou casas térreas nunca devem ficar em locais enclausurados ou porões (o GLP é mais denso que o ar e desce ao escapar). A válvula deve estar exposta em armários treliçados e gradeados que recebam ar corrente.'
            },
            {
                tipo: 'topico',
                titulo: 'Mangueiras e Validade',
                texto: 'Mangueiras de gás amarelas (NBR 8613) têm validade impressa de 5 anos. Após isso, ressecam, racham e vazam. Inspecione a borracha mensalmente: dobre-a — se aparecerem fissuras, troque imediatamente. Use abraçadeiras metálicas (jamais arame ou plástico) nas conexões.'
            },
            {
                tipo: 'dica',
                texto: 'Sentiu cheiro forte de "alho" (mercaptana — odorizante de segurança)? JAMAIS ligue interruptores ou acenda fósforos. Abra portas e janelas, feche o registro do botijão e saia do ambiente. Faíscas de interruptor detonam explosões.'
            }
        ]
    },

    escadas: {
        id: 'escadas',
        nome: 'Escadas & Degraus',
        emoji: '🪜',
        cor: '#F44336',
        capa: 'https://images.unsplash.com/photo-1517409413231-57640306c4b2?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A gravidade sempre vence na ausência de limites e aderência. Escadas merecem atenção militar em casas com crianças e idosos.'
            },
            {
                tipo: 'topico',
                titulo: 'Baby Gates Infalíveis',
                texto: 'Nunca instale portões tipo "sanfona" na borda das escadas. Os trincos de barreiras de segurança (no topo e na base) precisam estar AFIXADOS COM PARAFUSOS nas paredes, jamais por pressão. Devem suportar o empurrão de uma criança em corrida (15-20 kg de impacto).'
            },
            {
                tipo: 'topico',
                titulo: 'Aderência e Visibilidade',
                texto: 'Degraus envernizados são pistas de gelo. Aplique fitas antiderrapantes de borda em cada degrau, especialmente nos extremos. Em casas com idosos, considere instalar corrimão duplo (dos dois lados) com altura entre 80 e 92 cm.'
            },
            {
                tipo: 'dica',
                texto: 'Fitas fotoluminescentes (que brilham no escuro) coladas na quina de cada degrau salvam vidas em quedas de energia noturnas.'
            }
        ]
    },

    varanda: {
        id: 'varanda',
        nome: 'Varanda & Sacada',
        emoji: '🌿',
        cor: '#26A69A',
        capa: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Varandas concentram dois riscos altos e silenciosos: quedas de altura (crianças e idosos) e queda de objetos sobre transeuntes.'
            },
            {
                tipo: 'topico',
                titulo: 'Redes e Telas — Especificação Correta',
                texto: 'Para crianças, redes de proteção certificadas (norma INMETRO) são obrigatórias até os 12 anos. O fio deve ter no mínimo 2,5 mm de espessura e malha máxima de 5 cm. Revisão profissional anual é mandatória — fios de polipropileno degradam com sol e chuva em 3-5 anos. Vasos pesados nunca devem ficar apoiados no parapeito.'
            },
            {
                tipo: 'topico',
                titulo: 'Objetos que Caem Matam',
                texto: 'Vasos de planta, brinquedos, ferramentas, garrafas — qualquer objeto caindo de uma sacada gera energia cinética suficiente para fraturar crânios no térreo. Mantenha objetos pesados sempre afastados do parapeito (mínimo 50 cm). Em dias de vento forte, recolha tudo o que possa voar (cadeiras leves, panos, almofadas).'
            },
            {
                tipo: 'topico',
                titulo: 'Churrasqueira e Gás na Varanda',
                texto: 'Se a varanda for área de churrasco, mantenha o botijão sempre do lado externo da sacada (nunca encostado em paredes vizinhas). Verifique que a saída de fumaça não invada o apartamento de cima — convenções de condomínio têm exigência clara sobre coifa.'
            },
            {
                tipo: 'dica',
                texto: 'Nunca coloque mesas, cadeiras ou bancos junto ao parapeito. Crianças escalam tudo. A distância mínima entre mobiliário e parapeito deve ser de 1 metro.'
            }
        ]
    },

    quintal: {
        id: 'quintal',
        nome: 'Quintal & Jardim',
        emoji: '🌳',
        cor: '#43A047',
        capa: 'https://images.unsplash.com/photo-1558521558-037f1cb027c4?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O quintal é zona de liberdade — e exatamente por isso, exige mapeamento minucioso de plantas tóxicas, animais peçonhentos e ferramentas.'
            },
            {
                tipo: 'topico',
                titulo: 'Plantas Tóxicas Comuns',
                texto: 'Espirradeira, comigo-ninguém-pode, copo-de-leite, mamona, tinhorão e azaleia são plantas ornamentais comuns que podem causar intoxicação grave por ingestão ou contato. Crianças e pets investigam tudo na boca. Identifique todas as plantas do seu jardim e remova ou isole as tóxicas (consulte o módulo Plantas Tóxicas no app).'
            },
            {
                tipo: 'topico',
                titulo: 'Animais Peçonhentos',
                texto: 'Escorpiões, aranhas marrons, lagartas urticantes e serpentes habitam pilhas de folhas, lenha empilhada, entulho e cantos escuros. Mantenha o quintal sempre limpo, com vegetação aparada e sem acúmulo de materiais. Use luvas e botas ao manusear terra ou folhas secas. Vede frestas nas paredes e nos rodapés.'
            },
            {
                tipo: 'topico',
                titulo: 'Ferramentas e Produtos Químicos',
                texto: 'Tesouras de poda, machados, foices, podadores elétricos e roçadeiras devem ficar trancados em depósito fora do alcance de crianças. Inseticidas, herbicidas, formicidas e fertilizantes seguem a mesma regra dos químicos de cozinha: armário alto e trancado, embalagens originais, jamais transbordo.'
            },
            {
                tipo: 'dica',
                texto: 'Após chuvas fortes, sempre inspecione o quintal antes de liberar crianças e pets. Escorpiões e cobras frequentemente buscam refúgio seco em entradas e varandas após enchente.'
            }
        ]
    },

    garagem: {
        id: 'garagem',
        nome: 'Garagem',
        emoji: '🚗',
        cor: '#546E7A',
        capa: 'https://images.unsplash.com/photo-1607079170587-431a9d35b50a?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A garagem combina veículo em movimento, ferramentas pesadas, produtos químicos e baixa visibilidade — uma equação que exige protocolos rigorosos.'
            },
            {
                tipo: 'topico',
                titulo: 'Atropelamento Doméstico',
                texto: 'O atropelamento de crianças por familiares na própria garagem é uma das principais causas de morte infantil em casas com veículo. SEMPRE faça volta completa em torno do carro antes de dar partida e usar ré. Câmeras de ré ajudam, mas não substituem a verificação visual. Combine com a família a regra: "ninguém na garagem quando o carro está manobrando".'
            },
            {
                tipo: 'topico',
                titulo: 'Produtos Químicos e Inflamáveis',
                texto: 'Gasolina, óleo, tinta, solvente, removedor — todos devem ser guardados em armários metálicos trancados, longe de qualquer fonte de calor (boiler, motor, ferramentas elétricas). Nunca acima de 2 litros estocados em residência. Vapores se acumulam em cantos baixos da garagem e podem detonar com uma simples faísca.'
            },
            {
                tipo: 'topico',
                titulo: 'Portão Automático',
                texto: 'Portões automáticos modernos têm sensores anti-esmagamento por lei (NBR 16654), mas equipamentos antigos não. Teste mensalmente: posicione um objeto (caixa de papelão alta) no caminho — o portão deve recuar imediatamente. Crianças e pets jamais devem brincar perto do portão em operação.'
            },
            {
                tipo: 'dica',
                texto: 'Monóxido de carbono é invisível e inodoro. JAMAIS deixe o motor ligado com o portão fechado, mesmo por "apenas um minuto". O CO acumula em segundos e mata em minutos.'
            }
        ]
    },

    piscina: {
        id: 'piscina',
        nome: 'Piscina & Área Molhada',
        emoji: '🏊',
        cor: '#03A9F4',
        capa: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Afogamentos são predominantemente mudos, velozes e a forma suprema de letalidade entre crianças de 1 a 4 anos no verão domiciliar.'
            },
            {
                tipo: 'topico',
                titulo: 'Vigilância Ativa: a regra dos 10 segundos',
                texto: 'O celular destruiu a vigília das bordas. Nunca delegue por suposição: "alguém estava olhando". Quando há piscina, designe explicitamente um adulto "vigilante", em turnos cronometrados, SEM celular ao alcance. Sua única função: observar constantemente a superfície. Afogamento é silencioso — a criança não grita, ela luta calada para respirar.'
            },
            {
                tipo: 'topico',
                titulo: 'Barreiras Físicas',
                texto: 'Cercas removíveis ou fixas de no mínimo 1,20 m de altura, com fechadura automática alta (fora do alcance de crianças), salvam 75% dos afogamentos domiciliares de menores. Capas rígidas de piscina não são brinquedo — capas de proteção (não as de aquecimento) suportam o peso de uma criança e impedem que ela caia na água.'
            },
            {
                tipo: 'topico',
                titulo: 'Alarmes e Equipamentos',
                texto: 'Alarmes de borda detectam perturbação na superfície da água e disparam sirene. Combine com pulseiras/colares pessoais que disparam ao molhar (para crianças muito pequenas). Mantenha boia salva-vidas, ganchos de resgate e gancho longo (≥2,5 m) visíveis e acessíveis ao redor da piscina.'
            }
        ]
    },

    areas_coletivas: {
        id: 'areas_coletivas',
        nome: 'Áreas Coletivas',
        emoji: '🏘️',
        cor: '#5C6BC0',
        capa: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Playgrounds, quadras, salões e áreas comuns de condomínio têm responsabilidade compartilhada — o que multiplica o risco de manutenção negligenciada.'
            },
            {
                tipo: 'topico',
                titulo: 'Playground — Inspeção Visual',
                texto: 'Antes de liberar a criança, faça inspeção rápida: parafusos expostos? Madeira lascada? Plástico ressecado/quebradiço? Corrente de balanço com elos abertos? Piso de borracha rasgado? Reporte qualquer defeito à administração e evite o equipamento. Brinquedos metálicos podem atingir 70 °C em dias de sol forte — verifique a temperatura com a mão antes.'
            },
            {
                tipo: 'topico',
                titulo: 'Quadras e Salão de Festas',
                texto: 'Pisos de quadra molhados (chuva, ar-condicionado pingando) são pistas de queda. Em salão de festas, o risco principal é elétrico: vários eletrodomésticos compartilhando extensões em festas grandes. Combine com a administração a carga máxima permitida.'
            },
            {
                tipo: 'topico',
                titulo: 'Elevadores e Escadas Comuns',
                texto: 'Crianças nunca devem brincar dentro do elevador. Ensine: dedos longe das portas (esmagamento), nunca pular dentro da cabine (sensores de peso disparam emergência), saída em ordem. Em escadas comuns, atenção redobrada a degraus de mármore polido e iluminação deficiente.'
            },
            {
                tipo: 'dica',
                texto: 'Conheça os pontos de encontro do seu condomínio em caso de incêndio ou evacuação. Saiba onde ficam os extintores, hidrantes e a saída de emergência da sua torre/bloco.'
            }
        ]
    }
};

/**
 * Resolve o ID do ambiente respeitando contexto.
 * Antes: 'quartos' → quarto_idoso (errado!); 'varanda' → sala; 'quintal' → piscina.
 * Agora: cada ambiente tem entrada própria e sinônimos refinados só apontam para
 * equivalências semânticas reais.
 */
export const getConteudoPrevencao = (ambienteId) => {
    const mapaSinonimos = {
        'banheiros': 'banheiro',
        'lavanderia': 'area_servico',
        'sacada': 'varanda',
        'jardim': 'quintal',
        'pomar': 'quintal',
        'horta': 'quintal',
        'oficina': 'garagem',
        'deposito': 'garagem',
        'parquinho': 'areas_coletivas',
        'condominio': 'areas_coletivas',
        'quadra': 'areas_coletivas',
    };

    const idBusca = mapaSinonimos[ambienteId] || ambienteId;
    return MAPA_PREVENCAO[idBusca] || MAPA_PREVENCAO.sala;
};
