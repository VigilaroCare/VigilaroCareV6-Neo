/**
 * data/knowledge_prevencao.js
 *
 * Base consultiva do módulo "Riscos e Orientações por Ambiente".
 *
 * ─── DECISÃO DE DESIGN (Mai/2026) ────────────────────────────
 * Após validação do usuário (preferência por fotos reais e em
 * contexto), migramos de Unsplash photo-ID → Pexels CDN. Pexels
 * mantém o mapeamento ID→foto estável, e seu acervo cobre os 21
 * ambientes domésticos com fidelidade contextual.
 *
 * **Estratégia atual**: `capa` como array de 2 URLs Pexels
 * (cascade fallback). O componente EnvironmentGuideNeoScreen
 * tenta carregar a primeira; se falhar, tenta a segunda; se
 * ambas falharem, recorre ao StyledHero (gradient + emoji).
 *
 * Vantagens vs. Unsplash:
 *   - Pexels não reusa IDs (URL nunca aponta para foto diferente)
 *   - Acervo brasileiro/latino mais rico para contextos como
 *     botijão GLP, quintal, áreas comuns de condomínio
 *   - Mesma licença CC0 (uso livre comercial)
 *
 * Formato Pexels: pode incluir query params para otimização:
 *   `?auto=compress&cs=tinysrgb&w=1200`
 *
 * Flag `useStyledHero: true` ainda força o hero estilizado se
 * preferível para algum ambiente específico.
 * ───────────────────────────────────────────────────────────────
 */

export const MAPA_PREVENCAO = {
    // ── CONVIVÊNCIA ────────────────────────────────────────────
    sala: {
        id: 'sala',
        nome: 'Sala de Estar',
        emoji: '🛋️',
        cor: '#9C27B0',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_sala-estar_036.jpg'),
            require('../assets/illustrations/pad/ambientes-casa_sala-estar_036.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A sala é o cômodo de maior circulação da casa. É também onde mais acontecem pequenos acidentes domésticos.' },
            { tipo: 'topico', titulo: 'A Ameaça Silenciosa dos Móveis', texto: 'Estantes, racks e aparelhos de TV que não estão firmemente fixados na parede (anti-tombamento) representam risco crítico, especialmente para crianças pequenas que usam gavetas como "escadas". Ancore móveis pesados com fitas de segurança ou buchas adequadas.' },
            { tipo: 'topico', titulo: 'Quedas e Tropeços', texto: 'Cerca de 30% das quedas de idosos ocorrem na sala. Tapetes soltos, fios atravessando o chão e mesas de centro de vidro pontiagudas são os maiores vilões. Use fitas antiderrapantes sob tapetes ou remova-os se houver idosos. Organize fios atrás dos móveis ou use canaletas.' },
            { tipo: 'dica', texto: 'Proteja as quinas! Mesas de centro e racks com bordas vivas devem receber protetores de silicone para evitar lesões graves na cabeça de bebês e crianças em fase de aprender a andar.' }
        ]
    },

    cozinha: {
        id: 'cozinha',
        nome: 'Cozinha',
        emoji: '🍳',
        cor: '#FF9800',
        capa: [
            require('../assets/illustrations/pad/cozinha-utensilios_como-funciona-e-como-usar-panela-de-pres_001.jpg'),
            require('../assets/illustrations/pad/cozinha-utensilios_como-funciona-e-como-usar-panela-de-pres_001.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A cozinha é o cômodo mais perigoso da casa: fogo, lâminas, gás e água fervente dividem o mesmo espaço todos os dias.' },
            { tipo: 'topico', titulo: 'Regras de Ouro no Fogão', texto: 'Priorize sempre as bocas de trás do fogão. Cabos de panelas devem ficar virados para o centro ou para trás, nunca voltados para a borda. Uma panela de água fervente virada sobre uma criança causa queimaduras de 2º e 3º grau irreversíveis.' },
            { tipo: 'topico', titulo: 'Armazenamento de Químicos', texto: 'A regra fundamental para soda cáustica e água sanitária é isolá-los. Leia o "Guia de Produtos Químicos" completo na seção de Riscos Físicos para conhecer as misturas letais e regras de armazenamento.' },
            { tipo: 'topico', titulo: 'Cortes e Eletrodomésticos', texto: 'Facas afiadas não devem secar soltas no escorredor; guarde-as em blocos de madeira ou gavetas específicas. Liquidificadores e processadores devem ficar desligados da tomada enquanto não estiverem em uso direto.' },
            { tipo: 'dica', texto: 'Evite toalhas de mesa compridas se houver crianças. Puxar a ponta da toalha é instinto comum que pode trazer pratos quentes e travessas diretamente sobre elas.' }
        ]
    },

    despensa: {
        id: 'despensa',
        nome: 'Despensa',
        emoji: '🥫',
        cor: '#FB8C00',
        capa: [
            'https://images.pexels.com/photos/4440173/pexels-photo-4440173.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/8580727/pexels-photo-8580727.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A despensa esconde dois riscos que passam despercebidos: pragas atraídas pela comida e prateleiras mal dimensionadas que desabam com o peso.' },
            { tipo: 'topico', titulo: 'Organização Anti-queda', texto: 'Mantenha os itens mais pesados (latas, garrafas, sacos de arroz) nas prateleiras intermediárias, nunca acima da altura dos ombros. Uma única lata caindo de 1,80 m causa concussão em uma criança. Prateleiras de MDF precisam de mãos-francesas a cada 60 cm para suportar peso real.' },
            { tipo: 'topico', titulo: 'Pragas e Contaminação', texto: 'Alimentos secos (farinha, açúcar, cereais) devem ser transferidos para recipientes herméticos assim que abertos. Restos em embalagens originais atraem traças, baratas e ratos, vetores de doenças. Inspecione mensalmente os cantos e atrás das prateleiras.' },
            { tipo: 'topico', titulo: 'Validade e Rotação (PEPS)', texto: 'Aplique a regra PEPS (Primeiro que Entra, Primeiro que Sai): produtos novos vão para o fundo, antigos para frente. Verifique validades a cada 60 dias. Conservas vencidas podem causar botulismo (intoxicação grave).' },
            { tipo: 'dica', texto: 'Mantenha uma lanterna pendurada perto da porta. Em emergências (falta de luz, alagamento), a despensa é o primeiro lugar visitado, e tropeçar no escuro é quase garantido.' }
        ]
    },

    // ── ÁREA DE DESCANSO ───────────────────────────────────────
    quartos: {
        id: 'quartos',
        nome: 'Quarto de Adulto',
        emoji: '🛏️',
        cor: '#7E57C2',
        capa: [
            'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/4940609/pexels-photo-4940609.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O quarto reúne fontes de incêndio, sufocamento e quedas noturnas que a maioria das pessoas nunca imagina existirem ali.' },
            { tipo: 'topico', titulo: 'Eletrônicos Carregando à Noite', texto: 'Celulares e tablets carregando sob travesseiros ou sobre a cama são a principal causa moderna de incêndios noturnos em quartos. A bateria de lítio em curto atinge 600 °C em segundos. Carregue sempre em superfícies rígidas (mesa, criado-mudo) longe de tecidos.' },
            { tipo: 'topico', titulo: 'Caminho Noturno Desimpedido', texto: 'Adultos cansados, acordando de madrugada para ir ao banheiro, são vítimas frequentes de quedas. Mantenha o caminho da cama até a porta livre de cabos, calçados e quinas pontiagudas. Uma luz noturna LED próxima ao chão evita acidentes sem comprometer o sono.' },
            { tipo: 'topico', titulo: 'Cobertores, Velas e Aromas', texto: 'Cobertores elétricos antigos com fios desencapados, velas perfumadas esquecidas acesas e aromatizadores próximos a cortinas são causas reais de incêndio noturno. Velas só com base de cerâmica em prato largo; cobertor elétrico sempre desligado ao dormir.' },
            { tipo: 'dica', texto: 'Mantenha uma lanterna e o celular carregado ao alcance da cama. Em emergências noturnas (terremoto, incêndio, intrusão), os primeiros 10 segundos no escuro fazem toda a diferença.' }
        ]
    },

    quarto_bebe: {
        id: 'quarto_bebe',
        nome: 'Quarto de Bebê',
        emoji: '👶',
        cor: '#FF4081',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_bebe-expressao-surpresa_001.jpg'),
            require('../assets/illustrations/pad/ambientes-casa_bebe-expressao-surpresa_001.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O berço precisa ser o lugar mais seguro da casa, mas decisões estéticas comuns acabam ignorando protocolos de segurança essenciais.' },
            { tipo: 'topico', titulo: 'O Berço Nu', texto: 'A Sociedade Brasileira de Pediatria é clara: até os 12 meses, o berço deve estar vazio. Sem travesseiros, sem cobertores soltos, sem pelúcias e, principalmente, SEM kits de berço (protetores laterais acolchoados). O risco de morte súbita e asfixia mecânica é altíssimo. Use apenas lençol de elástico bem preso; para o frio, use sacos de dormir.' },
            { tipo: 'topico', titulo: 'Distâncias Vitais', texto: 'O berço nunca deve encostar em janelas e deve estar distante de cordas de persianas ou cortinas (risco de estrangulamento). O espaçamento das grades não pode permitir a passagem da cabeça do bebê (máximo 6 cm entre grades, NBR 15860).' },
            { tipo: 'dica', texto: 'Na hora das trocas e do banho, deixe tudo o que for precisar ao alcance das mãos, para não precisar se afastar do bebê. Jamais o deixe apoiado na banheira ou deitado sozinho na cama, sofá, trocador ou cômoda, mesmo que ainda não saiba rolar. Um descuido de uma fração de segundo pode ser fatal.' }
        ]
    },

    quarto_crianca: {
        id: 'quarto_crianca',
        nome: 'Quarto Infantil',
        emoji: '🧸',
        cor: '#E91E63',
        capa: [
            require('../assets/illustrations/pad/acidentes-estatisticas_crianca-descendo-escada-bola_020.jpg'),
            require('../assets/illustrations/pad/acidentes-estatisticas_crianca-descendo-escada-bola_020.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Todo quarto infantil tem armadilhas estruturais escondidas atrás da diversão: móveis para escalar, janelas baixas, objetos pequenos ao alcance da mão.' },
            { tipo: 'topico', titulo: 'Ameaça de Altura: Janelas e Móveis', texto: 'Redes de proteção nas janelas são a defesa máxima e devem ser revisadas a cada 3-5 anos. Crianças gostam de escalar. Além de telas, certifique-se de que não haja poltronas e camas posicionadas logo abaixo das janelas.' },
            { tipo: 'topico', titulo: 'Brinquedos e Risco de Engasgo', texto: 'A regra do "Teste do Rolo de Papel" e os perigos letais das pilhas tipo botão/moeda estão detalhados no nosso manual completo. Acesse o "Guia de Segurança com Brinquedos" para proteger seu filho contra asfixia e engasgos.' }
        ]
    },

    quarto_idoso: {
        id: 'quarto_idoso',
        nome: 'Quarto do Idoso',
        emoji: '👴',
        cor: '#8D6E63',
        capa: [
            require('../assets/illustrations/pad/cozinha-utensilios_como-funciona-e-como-usar-panela-de-pres_001.jpg'),
            require('../assets/illustrations/pad/ambientes-casa_placa-idoso_016.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O quarto do idoso precisa de boa luz à noite, caminho livre até o banheiro e nada no chão para tropeçar. Queda é a maior causa de hospitalização nessa fase da vida.' },
            { tipo: 'topico', titulo: 'A Visão Noturna que Salva', texto: 'Ir ao banheiro de madrugada é a situação de risco mais grave. O quarto deve ter abajures próximos à cama (acessíveis sem se levantar) e luzes noturnas (footlights) esmaecidas na base das paredes, criando um "rastro" iluminado do leito até o banheiro. Evite acender a luz principal: o choque visual atrapalha o equilíbrio.' },
            { tipo: 'topico', titulo: 'A Cama Certa: Altura e Apoio', texto: 'A altura do colchão importa: o idoso deve conseguir apoiar a planta inteira dos pés no chão ao sentar na borda. Colchões baixos demais forçam o tronco a tombar para trás; altos demais provocam descida brusca. Considere instalar uma grade lateral retrátil em um dos lados e uma barra vertical próxima à cabeceira para auxiliar no levantar.' },
            { tipo: 'topico', titulo: 'Calçados, Tapetes e Cabos', texto: 'Chinelos flácidos com solado liso são uma grande armadilha. Use exclusivamente calçado fechado com solado antiderrapante dentro de casa. Remova tapetes do trajeto cama/banheiro: pontas enroladas são causa silenciosa de queda. Cabos na cabeceira (abajur, carregador) devem correr rentes ao rodapé, fixados com canaleta ou fixadores apropriados.' },
            { tipo: 'dica', texto: 'Telefone fixo ou celular com botão SOS dedicado deve ficar SEMPRE na mesa de cabeceira, jamais em outro cômodo. Em uma queda, conseguir pedir ajuda nos primeiros 30 minutos triplica as chances de recuperação completa.' }
        ]
    },

    banheiros: {
        id: 'banheiros',
        nome: 'Banheiro',
        emoji: '🚿',
        cor: '#2196F3',
        capa: [
            require('../assets/illustrations/pad/idosos_barra-para-banheiros-1_008.jpg'),
            require('../assets/illustrations/pad/idosos_barra-para-banheiros-1_008.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O banheiro reúne água e piso liso o tempo todo, uma combinação que exige atenção redobrada à aderência e à organização.' },
            { tipo: 'topico', titulo: 'A Regra Anti-Afogamento', texto: 'Crianças pequenas podem se afogar em apenas 3 dedos de água. Nunca deixe bacias, baldes ou banheiras cheias de água desacompanhadas. Após o banho infantil, esvazie imediatamente os recipientes. A tampa do vaso sanitário deve permanecer abaixada e, idealmente, travada.' },
            { tipo: 'topico', titulo: 'Quedas no Banho', texto: 'Tanto para crianças quanto para idosos, o box é uma pista escorregadia. Tapetes com ventosas de fixação antiderrapantes dentro do box são mandatórios. Para idosos, barras de apoio (fixadas com parafusos, jamais ventosas) dentro do box e ao lado do vaso podem salvar vidas e garantir autonomia.' },
            { tipo: 'topico', titulo: 'Medicamentos e Eletricidade', texto: 'O armário do espelho sofre com umidade e não é ideal para a eficácia de remédios. Pior: coloca drogas ao alcance fácil. Guarde medicamentos em caixas altas. Mantenha secadores e barbeadores elétricos longe da pia e sempre desconectados após o uso.' }
        ]
    },

    armarios: {
        id: 'armarios',
        nome: 'Armários',
        emoji: '🗄️',
        cor: '#6D4C41',
        capa: [
            require('../assets/illustrations/pad/cozinha-utensilios_como-funciona-e-como-usar-panela-de-pres_001.jpg'),
            'https://images.pexels.com/photos/5705496/pexels-photo-5705496.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Os armários guardam de tudo: medicamentos, pilhas, produtos químicos, ferramentas, sacolas plásticas. Organizá-los bem é uma das partes mais subestimadas da prevenção doméstica.' },
            { tipo: 'topico', titulo: 'Lei da Gravidade Cotidiana', texto: 'Coloque objetos pesados sempre nas prateleiras inferiores. Itens leves no alto. Um liquidificador caindo da prateleira mais alta pode causar fratura craniana. Caixas pesadas em armários sem porta devem ter cinta de retenção.' },
            { tipo: 'topico', titulo: 'Trancas para o que Mata', texto: 'Medicamentos, pilhas-moeda (botão), produtos químicos, lâminas de barbear, fósforos e isqueiros devem ficar em armários trancados, não só "no alto". Crianças de 4-5 anos já escalam cadeiras. Use travas magnéticas (são invisíveis e exigem ímã para abrir).' },
            { tipo: 'topico', titulo: 'Embalagens Originais e Sacolas Plásticas', texto: 'NUNCA transfira produtos químicos para garrafas pet, potes de sorvete ou potes de vidro reaproveitados: a confusão com sucos ou temperos causa intoxicação fatal. Sacolas plásticas devem ser mantidas longe do alcance das mão de crianças, bebês e pets, sob risco de asfixia.' },
            { tipo: 'dica', texto: 'A cada 6 meses, faça uma "vistoria de armário": jogue fora remédios vencidos, troque pilhas vazadas e descarte produtos cuja embalagem original perdeu o rótulo.' }
        ]
    },

    // ── SERVIÇOS E UTILIDADES ──────────────────────────────────
    lavanderia: {
        id: 'lavanderia',
        nome: 'Lavanderia',
        emoji: '🧺',
        cor: '#00BCD4',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_lavanderia-maquina-roupa_015.jpg'),
            require('../assets/illustrations/pad/ambientes-casa_lavanderia-maquina-roupa_015.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A lavanderia junta três fatores de risco o tempo todo: máquinas puxando muita corrente, produtos químicos concentrados e piso quase sempre molhado.' },
            { tipo: 'topico', titulo: 'Químicos e Misturas Letais', texto: 'A lavanderia é o centro dos químicos domésticos. Misturas como água sanitária + amônia geram gases letais. Leia o "Guia de Produtos Químicos" completo para evitar asfixia química.' },
            { tipo: 'topico', titulo: 'Baldes e Tanques com água', texto: 'Baldes com roupas de molho atraem crianças pequenas, inclusive as que ainda engatinham, e uma queda ali dentro pode ser fatal: afogamento acontece em poucos centímetros de água. Mantenha tanques e baldes secos e virados para baixo, ou bloqueie a entrada da lavanderia com portão.' },
            { tipo: 'topico', titulo: 'Extensões e Sobrecarga', texto: 'Máquina de lavar e secadora puxam muita corrente. Nunca ligue esses equipamentos em adaptadores ou extensões subdimensionadas: o superaquecimento (efeito Joule) é causa real de incêndio. Cada uma precisa da própria tomada de 20A com aterramento.' },
            { tipo: 'topico', titulo: 'Escorpiões e Aranhas', texto: 'Estrados vazios e cantos atrás da máquina são abrigos ocultos para escorpiões e aranhas marrons no verão. Mantenha o local impecável, sem entulho ou pilhas de tecidos. Sacuda os calçados antes de calçar: escorpiões adoram esses esconderijos.' }
        ]
    },

    garagem: {
        id: 'garagem',
        nome: 'Garagem',
        emoji: '🚗',
        cor: '#546E7A',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_carro-na-garagem_011.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A garagem junta veículo em movimento, ferramentas pesadas, produtos químicos e pouca visibilidade. Vale a pena seguir protocolos rigorosos aqui.' },
            { tipo: 'topico', titulo: 'Atropelamento Doméstico', texto: 'O atropelamento de crianças por familiares na própria garagem é uma das principais causas de morte infantil em casas com veículo. SEMPRE faça volta completa em torno do carro antes de dar partida e usar ré. Câmeras de ré ajudam, mas não substituem verificação visual. Regra: "ninguém na garagem quando o carro está manobrando".' },
            { tipo: 'topico', titulo: 'Monóxido de Carbono: o Assassino Invisível', texto: 'JAMAIS deixe o motor ligado com o portão fechado, mesmo por "apenas um minuto". O CO é incolor e inodoro, acumula em segundos e mata em minutos. Mesmo motor parado, freios e escapamento quentes em garagem fechada liberam compostos voláteis perigosos.' },
            { tipo: 'topico', titulo: 'Produtos Inflamáveis', texto: 'Gasolina, óleo, tinta, solvente e removedor devem ficar guardados em armários metálicos trancados, longe de qualquer fonte de calor. Nunca armazene em sua residência quantidades acima de 2 litros.' },
            { tipo: 'topico', titulo: 'Portão Automático', texto: 'Portões modernos têm sensores anti-esmagamento por lei (NBR 16654), mas equipamentos antigos não. Teste mensalmente: posicione uma caixa alta no caminho e veja se o portão recua na hora. Crianças e pets jamais devem brincar perto do portão em operação.' },
            { tipo: 'dica', texto: 'Inspecione debaixo e atrás do veículo antes de dar partida (gatos costumam dormir sob o motor quente). Faça da volta-vista um hábito tão automático quanto colocar o cinto.' }
        ]
    },

    oficinas: {
        id: 'oficinas',
        nome: 'Oficina / Ferramentas',
        emoji: '🔧',
        cor: '#455A64',
        capa: [
            'https://images.pexels.com/photos/30361320/pexels-photo-30361320.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/34471533/pexels-photo-34471533.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A oficina junta lâminas, motores rotativos, eletricidade e produtos inflamáveis no mesmo espaço, e isso pede protocolos rigorosos.' },
            { tipo: 'topico', titulo: 'Guias de Ferramentas e EPI', texto: 'Os protocolos completos de manuseio e armazenamento seguro de ferramentas de corte, elétricas, inflamáveis e o uso de EPIs foram centralizados. Consulte a seção de Ferramentas e EPIs para conhecer as regras vitais para este ambiente.' },
            { tipo: 'dica', texto: 'Sempre desligue máquinas elétricas da tomada após o uso. Crianças podem ligar equipamentos em segundos se eles estiverem na tomada.' }
        ]
    },

    depositos: {
        id: 'depositos',
        nome: 'Depósito',
        emoji: '📦',
        cor: '#5D4037',
        capa: [
            'https://images.pexels.com/photos/36946571/pexels-photo-36946571.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/7203702/pexels-photo-7203702.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Depósito parado por muito tempo vira ninho de aranha, escorpião e roedor. Manter tudo organizado é a melhor defesa.' },
            { tipo: 'topico', titulo: 'Gravidade nas Caixas', texto: 'Caixas pesadas SEMPRE no chão; partes altas só para itens leves. Empilhamento máximo de 3 caixas, com a base ancorada na parede.' },
            { tipo: 'topico', titulo: 'Visitantes Indesejados', texto: 'Mantenha rodapés vedados, troque caixas de papelão por caixas plásticas com tampa hermética e inspecione mensalmente.' },
            { tipo: 'topico', titulo: 'Acesso e Iluminação', texto: 'Depósito mal iluminado é depósito perigoso. Instale luz LED com sensor de presença ou um interruptor logo na entrada (nunca dentro do cômodo escuro). Mantenha um corredor central livre de 60 cm: ninguém deve precisar pular caixas para pegar alguma coisa.' },
            { tipo: 'topico', titulo: 'Não Vire Lixeira', texto: 'Depósito não é "para guardar tudo o que talvez um dia precise". A cada 6 meses, descarte o que não foi usado em 2 anos. Pilhas velhas, eletrônicos quebrados e materiais inflamáveis esquecidos viram bombas-relógio.' },
            { tipo: 'dica', texto: 'Use luvas de raspa e calçado fechado SEMPRE que entrar no depósito após mais de 30 dias sem visita. Sacuda caixas antes de abrir.' }
        ]
    },

    central_gas: {
        id: 'central_gas',
        nome: 'Gás (GLP)',
        emoji: '🔥',
        cor: '#D32F2F',
        capa: [
            require('../assets/illustrations/pad/gas-vazamento_central-de-gu00e1s_003.jpg'),
            require('../assets/illustrations/pad/gas-vazamento_central-de-gu00e1s_003.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O poder adormecido do gás GLP não perdoa falha de ventilação ou confinamento. Cada protocolo aqui foi escrito após acidentes reais.' },
            { tipo: 'topico', titulo: 'Posicionamento e Ventilação', texto: 'Botijões P13 (o cilindro comum) e cilindros P45 (aqueles de restaurantes e prédios) NUNCA devem ficar em locais fechados, porões ou áreas abaixo do nível do solo: o GLP é mais pesado que o ar e desce em casos de vazamento. Mantenha os botijões a uma distância mínima de 1,5 m de portas e janelas: isso evita que o gás escape para outros ambientes da casa e encontre uma faísca ou fonte de calor.' },
            { tipo: 'topico', titulo: 'Mangueiras e Validade', texto: 'Mangueiras amarelas (NBR 8613) têm validade IMPRESSA de 5 anos. Após esse prazo ressecam, racham e vazam. Inspecione a borracha mensalmente: dobre-a e, se aparecerem fissuras, troque imediatamente. Use abraçadeiras metálicas nas conexões (jamais arame ou plástico).' },
            { tipo: 'topico', titulo: 'Teste de Vazamento Seguro', texto: 'Suspeitou de vazamento? Aplique espuma de sabão neutro com pincel sobre as conexões. Se borbulhar, há vazamento. JAMAIS use isqueiro, fósforo ou chama para "ver de onde sai": o risco é explosão imediata.' },
            { tipo: 'dica', texto: 'Sentiu cheiro forte de "alho" (mercaptana, o odorizante de segurança do gás)? JAMAIS ligue interruptores ou acenda fósforos. Abra portas e janelas, feche o registro do botijão e SAIA do ambiente. Chame os bombeiros (193) da rua, com seu celular. Faíscas de interruptor já detonaram explosões fatais.' }
        ]
    },

    // ── LAZER E EXTERIOR ───────────────────────────────────────
    quintal: {
        id: 'quintal',
        nome: 'Quintal / Jardim',
        emoji: '🌳',
        cor: '#43A047',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_jardim_019.jpg'),
              require('../assets/illustrations/pad/ambientes-casa_jardim_019.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'O quintal é onde a criança tem mais liberdade para se mover, e exatamente por isso merece um mapeamento cuidadoso dos riscos.' },
            { tipo: 'topico', titulo: 'Plantas Tóxicas e Animais Peçonhentos', texto: 'As regras sobre plantas venenosas (comigo-ninguém-pode, espirradeira) e o combate a escorpiões e aranhas estão centralizadas. Consulte os Guias "Plantas Tóxicas" e "Animais Peçonhentos" na seção de Riscos.' },
            { tipo: 'topico', titulo: 'Ferramentas e Químicos', texto: 'Todas as ferramentas e venenos devem seguir os protocolos rigorosos descritos no Guia de EPIs e Ferramentas.' }
        ]
    },

    jardinagem: {
        id: 'jardinagem',
        nome: 'Jardinagem / Plantas',
        emoji: '🌱',
        cor: '#8BC34A',
        capa: [
              require('../assets/illustrations/pad/ambientes-casa_jardim_019.jpg'),
              require('../assets/illustrations/pad/generated_jardim.png'),
          ],
        conteudo: [
              { tipo: 'destaque', texto: 'Cuidar do jardim ou da horta traz riscos próprios, que vão da insolação à intoxicação letal por produtos químicos.' },
              { tipo: 'topico', titulo: 'Fertilizantes e Pesticidas', texto: 'O uso e o armazenamento inadequado de químicos de jardinagem representam alto risco de intoxicação letal para crianças e pets. Mantenha trancados em armários altos ou caixas originais rotuladas. Dê preferência aos naturais.' },
              { tipo: 'topico', titulo: 'Exposição ao Clima e Insolação', texto: 'Ficar exposto ao sol quente por longos períodos pode causar mal-estar severo. Utilize chapéus, protetor solar e priorize o trabalho nas primeiras horas da manhã ou no fim da tarde.' },
              { tipo: 'topico', titulo: 'A "Armadura" do Jardineiro', texto: 'É obrigatório o uso de luvas, calçados fechados (ou botas), além de camisas de manga comprida e calças com as barras fechadas para impedir que insetos subam e plantas nocivas queimem a pele.' },
              { tipo: 'dica', texto: 'Identifique e evite cultivar plantas tóxicas em áreas de fácil acesso a crianças e animais. Ao podá-las, use luvas, pois muitas liberam látex corrosivo.' }
          ]
    },

    areas_coletivas: {
        id: 'areas_coletivas',
        nome: 'Áreas Comuns',
        emoji: '🏘️',
        cor: '#FFC107',
        capa: [
            'https://images.pexels.com/photos/33094391/pexels-photo-33094391.jpeg?auto=compress&cs=tinysrgb&w=1200',
            'https://images.pexels.com/photos/31573145/pexels-photo-31573145.jpeg?auto=compress&cs=tinysrgb&w=1200',
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Playgrounds, quadras, salões e áreas comuns de condomínio têm riscos estruturais próprios. Fizemos um guia específico só para esses ambientes.' },
            { tipo: 'topico', titulo: 'Guia de Segurança em Condomínio', texto: 'As diretrizes completas sobre extintores, portas corta-fogo, elevadores, playgrounds, piscinas coletivas e regras de garagem foram unificadas no Guia Oficial de Condomínio.' },
            { tipo: 'dica', texto: 'Acesse a seção Riscos Ambientais > Guia de Condomínio para ler o protocolo completo de inspeção.' }
        ]
    },

    piscina: {
        id: 'piscina',
        nome: 'Piscina',
        emoji: '🏊',
        cor: '#03A9F4',
        capa: [
            require('../assets/illustrations/pad/engasgo-afogamento_capa-piscina_005.jpg'),
            require('../assets/illustrations/pad/engasgo-afogamento_capa-piscina_005.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Afogamento é silencioso e rápido, e é a principal causa de morte entre crianças de 1 a 4 anos no verão.' },
            { tipo: 'topico', titulo: 'Protocolo de Prevenção de Afogamentos', texto: 'As regras cruciais de supervisão constante (regra dos 10 segundos), barreiras físicas e ralos anti-aprisionamento foram unificadas no nosso protocolo oficial.' },
            { tipo: 'dica', texto: 'Acesse o "Guia de Afogamento" na seção de Riscos Físicos para aprender a prevenir e como agir em caso de emergência.' }
        ]
    },

    praia_rios: {
        id: 'praia_rios',
        nome: 'Áreas Naturais',
        emoji: '🌊',
        cor: '#0288D1',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_area-externa-praia_005.jpg'),
            require('../assets/illustrations/pad/ambientes-casa_area-externa-praia_005.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'Praia, rio, cachoeira e represa não têm o controle de um ambiente fechado: correntezas, marés, fauna marinha e clima variável pedem atenção constante.' },
            { tipo: 'topico', titulo: 'Bandeiras e Sinalização', texto: 'Respeite RIGOROSAMENTE a sinalização: bandeira vermelha = proibido entrar; amarela = atenção, perigo moderado; verde = segurança razoável. Em praias sem salva-vidas, evite mergulhar. Nunca subestime correntezas: mesmo nadadores experientes são arrastados.' },
            { tipo: 'topico', titulo: 'Colete Salva-vidas Homologado', texto: 'Para crianças e não-nadadores, colete salva-vidas homologado (CIASA, a Capitania dos Portos) é OBRIGATÓRIO em embarcações e altamente recomendado em águas naturais. Boias de braço, prancha de espuma e brinquedos infláveis NÃO substituem colete: podem virar armadilha mortal.' },
            { tipo: 'topico', titulo: 'Águas-vivas, Ouriços e Outros', texto: 'Em contato com água-viva: lave com água do mar (água doce pode piorar), remova tentáculos com objeto rígido (nunca com a mão), aplique compressa morna. Espinhos de ouriço: jamais arranque (quebram); compressa quente ajuda a dissolver. Procure atendimento médico se houver dor intensa.' },
            { tipo: 'topico', titulo: 'Sol, Hidratação e Insolação', texto: 'Protetor solar FPS 50+ aplicado 30 min antes da exposição e reaplicado a cada 2 h. Água a cada 30 min, mesmo sem sede. Evite o sol das 10 às 16 h. Crianças menores de 6 meses NÃO devem ficar expostas ao sol direto: use barreira física (sombra, chapéu, roupa UV).' },
            { tipo: 'dica', texto: 'Em rios e represas, NUNCA mergulhe de cabeça em local desconhecido: pedras submersas e fundo raso causam lesões cervicais irreversíveis. Entre sempre devagar, pés primeiro.' }
        ]
    },

    // ── CIRCULAÇÃO E ACESSOS ───────────────────────────────────
    escadas: {
        id: 'escadas',
        nome: 'Escadas',
        emoji: '🪜',
        cor: '#F44336',
        capa: [
            require('../assets/illustrations/pad/quedas-escadas_acidente-queda_001.jpg'),
            require('../assets/illustrations/pad/quedas-escadas_acidente-queda_001.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A gravidade sempre vence na ausência de limites e aderência. Escadas merecem atenção militar em casas com crianças e idosos.' },
            { tipo: 'topico', titulo: 'Baby Gates Infalíveis', texto: 'Nunca instale portões tipo "sanfona". Os trincos devem estar AFIXADOS COM PARAFUSOS nas paredes, jamais por pressão.' },
            { tipo: 'topico', titulo: 'Aderência e Visibilidade', texto: 'Degraus envernizados são pistas de gelo. Aplique fitas antiderrapantes de borda em cada degrau, especialmente nos extremos. Em casas com idosos, considere instalar corrimão duplo (dos dois lados) com altura entre 80 e 92 cm.' },
            { tipo: 'topico', titulo: 'Iluminação e Caminho Livre', texto: 'Escadas precisam de interruptor no INÍCIO e no FIM do percurso (sistema "three-way"). Brinquedos, calçados e qualquer objeto solto nos degraus = tropeço garantido. Crie a regra de família: degrau nunca é prateleira.' },
            { tipo: 'dica', texto: 'Fitas fotoluminescentes (que brilham no escuro) coladas na quina de cada degrau salvam vidas em quedas de energia noturnas.' }
        ]
    },

    varanda: {
        id: 'varanda',
        nome: 'Varanda',
        emoji: '🌿',
        cor: '#26A69A',
        capa: [
            require('../assets/illustrations/pad/ambientes-casa_homem-varanda_029.jpg'),
        ],
        conteudo: [
            { tipo: 'destaque', texto: 'A varanda concentra dois riscos sérios: queda de altura (crianças e idosos) e objetos caindo em cima de quem passa embaixo.' },
            { tipo: 'topico', titulo: 'Redes e Telas: Especificação Correta', texto: 'Utilize sempre redes de proteção certificadas (norma INMETRO). O fio da malha da rede deve ter no mínimo 2,5 mm de espessura e malha máxima de 5 cm. A instalação e a verificação por um profissional são obrigatórias. Mesmo onde a lei não exige, muitos condomínios já cobram a instalação nos próprios regulamentos internos, porque crianças até os 12 anos são as mais suscetíveis a acidentes por falta de noção de perigo. O Estatuto da Criança e do Adolescente (ECA) responsabiliza pais e responsáveis pela segurança, com sanções previstas em caso de negligência.' },
            { tipo: 'topico', titulo: 'Objetos que Caem Matam', texto: 'Vasos de planta, brinquedos, ferramentas, garrafas: qualquer objeto caindo de uma sacada gera energia cinética suficiente para fraturar crânios no térreo. Mantenha objetos pesados sempre afastados do parapeito (mínimo 50 cm). Em dias de vento forte, recolha tudo que possa voar.' },
            { tipo: 'topico', titulo: 'Churrasqueira e Gás na Varanda', texto: 'Se a varanda for área de churrasco, mantenha o botijão sempre do lado externo da sacada (nunca encostado em paredes vizinhas). Verifique que a saída de fumaça não invada o apartamento de cima: convenções de condomínio têm exigência clara sobre coifa.' },
            { tipo: 'topico', titulo: 'Piso Antiderrapante', texto: 'Cerâmica polida em varanda + chuva = pista de patinação. Aplique antiderrapante químico transparente (vendido em casas de construção) ou tapetes de borracha com base ventosa. Idosos em sacadas escorregadias têm taxa de queda 4x maior.' },
            { tipo: 'dica', texto: 'Nunca coloque mesas, cadeiras ou bancos junto ao parapeito. Crianças escalam tudo. A distância mínima entre mobiliário e parapeito deve ser de 1 metro.' }
        ]
    }
};

/**
 * Alias retrocompatível: getConteudoPrevencao(id) → ambiente correspondente.
 * Sinônimos apontam apenas para equivalências semânticas reais.
 */
export const getConteudoPrevencao = (ambienteId) => {
    const mapaSinonimos = {
        'banheiro': 'banheiros',
        'area_servico': 'lavanderia',
        'sacada': 'varanda',
        'jardim': 'quintal',
        'pomar': 'quintal',
        'horta': 'quintal',
        'jardim_horta': 'jardinagem',
        'oficina': 'oficinas',
        'ferramentas': 'oficinas',
        'deposito': 'depositos',
        'parquinho': 'areas_coletivas',
        'condominio': 'areas_coletivas',
        'quadra': 'areas_coletivas',
        'praia': 'praia_rios',
        'rio': 'praia_rios',
        'cachoeira': 'praia_rios',
        'quarto_adulto': 'quartos',
        'quarto_casal': 'quartos',
    };

    const idBusca = mapaSinonimos[ambienteId] || ambienteId;
    return MAPA_PREVENCAO[idBusca] || MAPA_PREVENCAO.sala;
};
