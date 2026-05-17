/**
 * data/knowledge_prevencao.js
 *
 * Base consultiva do módulo "Riscos e Orientações por Ambiente".
 *
 * ─── DECISÃO DE DESIGN (Mai/2026) ────────────────────────────
 * Após várias tentativas de usar fotos Unsplash, descobriu-se que
 * URLs específicas (photo-ID) podem mudar de conteúdo ao longo do
 * tempo e às vezes retornam imagens fora de contexto.
 *
 * **Solução adotada**: hero estilizado nativo com:
 *   - Gradient duotone na cor do ambiente
 *   - Emoji em escala grande (130px) centralizado
 *   - Padrão decorativo (círculos translúcidos)
 *
 * Vantagens:
 *   - 100% offline, zero dependência de CDN externo
 *   - Visual premium e consistente entre todos os ambientes
 *   - Identidade clara: cor + emoji do ambiente
 *   - Sem risco de imagem "fora de contexto"
 *
 * Para ambientes onde uma foto realmente agrega valor, o componente
 * suporta `capa` como array de URLs (cascade fallback) e mantém
 * o StyledHero como último recurso.
 *
 * Flag `useStyledHero: true` força o hero estilizado (recomendado
 * para ambientes onde as fotos Unsplash são inconsistentes).
 * ───────────────────────────────────────────────────────────────
 */

export const MAPA_PREVENCAO = {
    // ── CONVIVÊNCIA ────────────────────────────────────────────
    sala: {
        id: 'sala',
        nome: 'Sala de Estar',
        emoji: '🛋️',
        cor: '#9C27B0',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A sala de estar é o coração da casa, mas também o local onde mais ocorrem pequenos acidentes domésticos devido ao alto fluxo de circulação.' },
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
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Estatisticamente, a cozinha é o ambiente mais perigoso de toda a residência. Fogo, lâminas, gás e água fervente coabitam este espaço.' },
            { tipo: 'topico', titulo: 'Regras de Ouro no Fogão', texto: 'Priorize sempre as bocas de trás do fogão. Cabos de panelas devem ficar virados para o centro ou para trás, nunca voltados para a borda. Uma panela de água fervente virada sobre uma criança causa queimaduras de 2º e 3º grau irreversíveis.' },
            { tipo: 'topico', titulo: 'Armazenamento de Químicos', texto: 'Produtos de limpeza (soda cáustica, desengordurantes, água sanitária) são frequentemente guardados sob a pia. Para a ótica de uma criança, embalagens coloridas parecem sucos. Guarde químicos em armários altos ou instale travas magnéticas nas portas inferiores.' },
            { tipo: 'topico', titulo: 'Cortes e Eletrodomésticos', texto: 'Facas afiadas não devem secar soltas no escorredor; guarde-as em blocos de madeira ou gavetas específicas. Liquidificadores e processadores devem ficar desligados da tomada enquanto não estiverem em uso direto.' },
            { tipo: 'dica', texto: 'Evite toalhas de mesa compridas se houver crianças. Puxar a ponta da toalha é instinto comum que pode trazer pratos quentes e travessas diretamente sobre elas.' }
        ]
    },

    despensa: {
        id: 'despensa',
        nome: 'Despensa',
        emoji: '🥫',
        cor: '#FB8C00',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A despensa parece inofensiva, mas concentra dois riscos silenciosos: pragas atraídas pelos alimentos e desmoronamento de prateleiras mal dimensionadas.' },
            { tipo: 'topico', titulo: 'Organização Anti-queda', texto: 'Mantenha os itens mais pesados (latas, garrafas, sacos de arroz) nas prateleiras intermediárias — nunca acima da altura dos ombros. Uma única lata caindo de 1,80 m causa concussão em uma criança. Prateleiras de MDF precisam de mãos-francesas a cada 60 cm para suportar peso real.' },
            { tipo: 'topico', titulo: 'Pragas e Contaminação', texto: 'Alimentos secos (farinha, açúcar, cereais) devem ser transferidos para recipientes herméticos assim que abertos. Restos em embalagens originais atraem traças, baratas e ratos — vetores de doenças. Inspecione mensalmente os cantos e atrás das prateleiras.' },
            { tipo: 'topico', titulo: 'Validade e Rotação (PEPS)', texto: 'Aplique a regra PEPS (Primeiro que Entra, Primeiro que Sai): produtos novos vão para o fundo, antigos para frente. Verifique validades a cada 60 dias. Conservas vencidas podem causar botulismo (intoxicação grave).' },
            { tipo: 'dica', texto: 'Mantenha uma lanterna pendurada perto da porta. Em emergências (falta de luz, alagamento), a despensa é o primeiro lugar visitado — tropeçar no escuro é regra.' }
        ]
    },

    // ── ÁREA DE DESCANSO ───────────────────────────────────────
    quartos: {
        id: 'quartos',
        nome: 'Quarto de Adulto',
        emoji: '🛏️',
        cor: '#7E57C2',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Quartos de adulto parecem ambientes neutros, mas concentram fontes de incêndio, sufocamento e quedas noturnas frequentemente subestimadas.' },
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
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'O berço deve ser o lugar mais seguro do mundo. Infelizmente, práticas estéticas muitas vezes ignoram protocolos vitais de segurança.' },
            { tipo: 'topico', titulo: 'O Berço Nu', texto: 'A Sociedade Brasileira de Pediatria é clara: até os 12 meses, o berço deve estar vazio. Sem travesseiros, sem cobertores soltos, sem pelúcias e, principalmente, SEM kits de berço (protetores laterais acolchoados). O risco de morte súbita e asfixia mecânica é altíssimo. Use apenas lençol de elástico bem preso; para o frio, use sacos de dormir.' },
            { tipo: 'topico', titulo: 'Distâncias Vitais', texto: 'O berço nunca deve encostar em janelas e deve estar distante de cordas de persianas ou cortinas (risco de estrangulamento). O espaçamento das grades não pode permitir a passagem da cabeça do bebê (máximo 6 cm entre grades, NBR 15860).' },
            { tipo: 'dica', texto: 'Troca de fraldas não tem pausa: mantenha sempre uma mão sobre o bebê, mesmo que precise se esticar para alcançar um lençol.' }
        ]
    },

    quarto_crianca: {
        id: 'quarto_crianca',
        nome: 'Quarto Infantil',
        emoji: '🧸',
        cor: '#E91E63',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Um reino de brincadeiras precisa blindar a criatividade da criança contra armadilhas estruturais.' },
            { tipo: 'topico', titulo: 'Ameaça de Altura: Janelas e Móveis', texto: 'Redes de proteção nas janelas são a defesa máxima e devem ser revisadas a cada 3-5 anos. Crianças gostam de escalar. Além de telas, certifique-se de que não haja poltronas e camas posicionadas logo abaixo das janelas.' },
            { tipo: 'topico', titulo: 'O Teste do Rolo de Papel', texto: 'Para crianças menores de 3 anos, engasgos com peças pequenas são comuns. Métrica: se a peça do brinquedo couber e passar livremente por dentro de um rolo vazio de papel higiênico, ela é pequena demais e representa risco letal de asfixia.' },
            { tipo: 'topico', titulo: 'Eletricidade ao Alcance', texto: 'Todas as tomadas sem uso devem ter protetores isolantes. Brinquedos eletrônicos que levam "pilhas moeda/botão" devem ter compartimentos PARAFUSADOS. A ingestão dessas pilhas queima as paredes do esôfago em poucas horas por reação química.' }
        ]
    },

    quarto_idoso: {
        id: 'quarto_idoso',
        nome: 'Quarto do Idoso',
        emoji: '👴',
        cor: '#8D6E63',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'O santuário de repouso do idoso precisa de visão clara noturna, mobilidade descomplicada e zero barreiras — três pilares contra a queda, sua maior causa de hospitalização.' },
            { tipo: 'topico', titulo: 'A Visão Noturna que Salva', texto: 'Ir ao banheiro de madrugada é a situação de risco mais grave. O quarto deve ter abajures próximos à cama (acessíveis sem se levantar) e luzes noturnas (footlights) esmaecidas na base das paredes, criando um "rastro" iluminado do leito até o banheiro. Evite acender luz principal — choque visual atrapalha o equilíbrio.' },
            { tipo: 'topico', titulo: 'A Cama Certa: Altura e Apoio', texto: 'A altura do colchão importa: o idoso deve conseguir apoiar a planta inteira dos pés no chão ao sentar na borda. Colchões baixos demais forçam o tronco a tombar para trás; altos demais provocam descida brusca. Considere instalar uma grade lateral retrátil em um dos lados e uma barra vertical próxima à cabeceira para auxiliar no levantar.' },
            { tipo: 'topico', titulo: 'Calçados, Tapetes e Cabos', texto: 'Chinelos flácidos sem solado liso são a primeira armadilha do dia. Use exclusivamente calçado fechado com solado antiderrapante dentro de casa. Remova tapetes pequenos do trajeto cama-banheiro — pontas enroladas são causa silenciosa de queda. Cabos de criado-mudo (abajur, carregador) devem correr rentes ao rodapé, fixados com canaleta.' },
            { tipo: 'dica', texto: 'Telefone fixo ou celular com botão SOS dedicado deve ficar SEMPRE na mesa de cabeceira, jamais em outro cômodo. Em uma queda, conseguir pedir ajuda nos primeiros 30 minutos triplica as chances de recuperação completa.' }
        ]
    },

    banheiros: {
        id: 'banheiros',
        nome: 'Banheiro',
        emoji: '🚿',
        cor: '#2196F3',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Água e superfícies lisas formam uma combinação fatal. O banheiro exige atenção extrema à aderência e organização.' },
            { tipo: 'topico', titulo: 'A Regra Anti-Afogamento', texto: 'Crianças pequenas podem se afogar em apenas 3 dedos de água. Nunca deixe bacias, baldes ou banheiras cheias de água desacompanhadas. Após o banho infantil, esvazie imediatamente os recipientes. A tampa do vaso sanitário deve permanecer abaixada e, idealmente, travada.' },
            { tipo: 'topico', titulo: 'Quedas no Banho', texto: 'Tanto para crianças quanto para idosos, o box é uma pista escorregadia. Tapetes de sucção antiderrapantes dentro do box são mandatórios. Para idosos, barras de apoio (fixadas com parafusos, jamais ventosas) dentro do box e ao lado do vaso podem salvar vidas e garantir autonomia.' },
            { tipo: 'topico', titulo: 'Medicamentos e Eletricidade', texto: 'O armário do espelho sofre com umidade e não é ideal para a eficácia de remédios. Pior: coloca drogas ao alcance fácil. Guarde medicamentos em caixas altas. Mantenha secadores e barbeadores elétricos longe da pia e sempre desconectados após o uso.' }
        ]
    },

    armarios: {
        id: 'armarios',
        nome: 'Armários',
        emoji: '🗄️',
        cor: '#6D4C41',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Armários são depósitos íntimos da casa — concentram medicamentos, pilhas, produtos químicos, ferramentas, sacolas plásticas. Sua organização é uma das engenharias mais subestimadas da prevenção doméstica.' },
            { tipo: 'topico', titulo: 'Lei da Gravidade Cotidiana', texto: 'Coloque objetos pesados sempre nas prateleiras inferiores. Itens leves no alto. Um liquidificador caindo da prateleira mais alta pode causar fratura craniana. Caixas pesadas em armários sem porta devem ter cinta de retenção.' },
            { tipo: 'topico', titulo: 'Trancas para o que Mata', texto: 'Medicamentos, pilhas-moeda (botão), produtos químicos, lâminas de barbear, fósforos e isqueiros devem ficar em armários trancados — não apenas "alto". Crianças de 4-5 anos já escalam cadeiras. Use travas magnéticas (são invisíveis e exigem ímã para abrir).' },
            { tipo: 'topico', titulo: 'Embalagens Originais e Sacolas Plásticas', texto: 'NUNCA transfira produtos químicos para garrafas pet ou potes de vidro reaproveitados — confusão com sucos/temperos causa intoxicação fatal. Sacolas plásticas devem ser guardadas amarradas em nó simples (risco de asfixia em bebês e pets).' },
            { tipo: 'dica', texto: 'A cada 6 meses, faça uma "vistoria de armário": jogue fora remédios vencidos, troque pilhas vazadas e descarte produtos cuja embalagem original perdeu o rótulo.' }
        ]
    },

    // ── SERVIÇOS E UTILIDADES ──────────────────────────────────
    lavanderia: {
        id: 'lavanderia',
        nome: 'Lavanderia',
        emoji: '🧺',
        cor: '#00BCD4',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A lavanderia doméstica reúne potentes fatores de risco: alto fluxo elétrico de máquinas, produtos químicos puros e pisos habitualmente molhados.' },
            { tipo: 'topico', titulo: 'Misturas Letais', texto: 'JAMAIS misture água sanitária com amônia (presente em alguns desengordurantes e limpa-vidros) — gera gás cloramina, que pode ser letal em ambiente fechado. Sempre leia rótulos antes de combinar produtos e mantenha a área ventilada durante a limpeza.' },
            { tipo: 'topico', titulo: 'Baldes e Tanques Molhados', texto: 'Baldes de molho encharcados atraem crianças engatinhantes que tropeçam em mergulhos fatais — afogamento ocorre em poucos centímetros de água. Mantenha tanques e baldes secos e virados para baixo, ou bloqueados com portão na entrada da lavanderia.' },
            { tipo: 'topico', titulo: 'Extensões e Sobrecarga', texto: 'Máquina de lavar e secadora puxam muita corrente. Jamais alimente esses equipamentos via extensão (filtro de linha) — superaquecimento por efeito Joule é causa real de incêndio. Cada uma deve ter tomada própria de 20 A com aterramento.' },
            { tipo: 'topico', titulo: 'Escorpiões e Aranhas', texto: 'Estrados vazios e cantos atrás da máquina são abrigos ocultos para escorpiões e aranhas marrons no verão. Mantenha o local impecável, sem entulho ou pilhas de tecidos. Sacuda calçados antes de calçar — escorpiões adoram esses esconderijos.' }
        ]
    },

    garagem: {
        id: 'garagem',
        nome: 'Garagem',
        emoji: '🚗',
        cor: '#546E7A',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A garagem combina veículo em movimento, ferramentas pesadas, produtos químicos e baixa visibilidade — uma equação que exige protocolos rigorosos.' },
            { tipo: 'topico', titulo: 'Atropelamento Doméstico', texto: 'O atropelamento de crianças por familiares na própria garagem é uma das principais causas de morte infantil em casas com veículo. SEMPRE faça volta completa em torno do carro antes de dar partida e usar ré. Câmeras de ré ajudam, mas não substituem verificação visual. Regra: "ninguém na garagem quando o carro está manobrando".' },
            { tipo: 'topico', titulo: 'Monóxido de Carbono — o Assassino Invisível', texto: 'JAMAIS deixe o motor ligado com o portão fechado, mesmo por "apenas um minuto". O CO é incolor e inodoro, acumula em segundos e mata em minutos. Mesmo motor parado, freios e escapamento quentes em garagem fechada liberam compostos voláteis perigosos.' },
            { tipo: 'topico', titulo: 'Produtos Inflamáveis', texto: 'Gasolina, óleo, tinta, solvente, removedor — todos devem ser guardados em armários metálicos trancados, longe de qualquer fonte de calor (boiler, motor, ferramentas elétricas). Nunca acima de 2 litros estocados em residência. Vapores se acumulam em cantos baixos e podem detonar com uma simples faísca.' },
            { tipo: 'topico', titulo: 'Portão Automático', texto: 'Portões modernos têm sensores anti-esmagamento por lei (NBR 16654), mas equipamentos antigos não. Teste mensalmente: posicione uma caixa alta no caminho — o portão deve recuar imediatamente. Crianças e pets jamais devem brincar perto do portão em operação.' },
            { tipo: 'dica', texto: 'Inspecione debaixo e atrás do veículo antes de dar partida (gatos costumam dormir sob o motor quente). Faça da volta-vista um hábito tão automático quanto colocar o cinto.' }
        ]
    },

    oficinas: {
        id: 'oficinas',
        nome: 'Oficina / Ferramentas',
        emoji: '🔧',
        cor: '#455A64',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A bancada de ferramentas combina lâminas, motores rotativos, eletricidade e produtos inflamáveis em um único ambiente — exige protocolos profissionais mesmo em uso doméstico.' },
            { tipo: 'topico', titulo: 'Ferramentas Cortantes e Perfurantes', texto: 'Serrotes, formões, tesouras de poda e brocas devem ficar em painéis fixos (com silhueta desenhada para cada ferramenta) ou caixas trancadas — nunca soltos sobre a bancada. Lâminas viradas para baixo, pontas protegidas. Crianças escalam tudo: oficina não é parquinho.' },
            { tipo: 'topico', titulo: 'Elétrica e Extensões', texto: 'Fios desencapados, plugues queimados, extensões enroladas em uso (geram calor por efeito Joule) e adaptadores T (benjamim) são gatilhos reais de incêndio. Inspecione equipamentos antes de cada uso. Furadeiras e esmerilhadeiras devem ter aterramento e disjuntor diferencial residual (DR) próprio.' },
            { tipo: 'topico', titulo: 'EPI Obrigatório', texto: 'Óculos de proteção, luvas de raspa, protetor auricular, máscara para pó — não são "frescura profissional". Um único caco de madeira no olho durante o corte basta para perda visual permanente. Mantenha o kit pendurado ao lado da bancada, visível.' },
            { tipo: 'topico', titulo: 'Inflamáveis e Ventilação', texto: 'Verniz, solvente, removedor, óleo de máquina liberam vapores tóxicos. Armazene em armários metálicos longe de tomadas (que podem faiscar) e use sempre com ventilação cruzada. Estopa suja de óleo gera combustão espontânea — descarte em lata metálica fechada.' },
            { tipo: 'dica', texto: 'Após cada uso, desligue máquinas elétricas da tomada — não apenas no botão. Crianças apertam botões e podem ligar uma serra-tico-tico desocupada em segundos.' }
        ]
    },

    depositos: {
        id: 'depositos',
        nome: 'Depósito',
        emoji: '📦',
        cor: '#5D4037',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Depósitos e quartinhos de despejo viram, com o tempo, ninhos de aranhas, escorpiões e roedores. A organização compulsiva é a defesa.' },
            { tipo: 'topico', titulo: 'Gravidade nas Caixas', texto: 'Regra de ouro: caixas pesadas SEMPRE no chão; partes altas só para itens leves (roupa de cama, decoração de Natal vazia, papelão). Empilhamento máximo de 3 caixas, com a base ancorada na parede.' },
            { tipo: 'topico', titulo: 'Visitantes Indesejados', texto: 'Mantenha rodapés vedados (massa epóxi), troque caixas de papelão por caixas plásticas com tampa hermética (papelão é alimento para baratas) e inspecione mensalmente. Use armadilhas adesivas em cantos para monitorar atividade de roedores. Em verão, escorpiões procuram esconderijos secos: dedetização profissional anual em zonas urbanas.' },
            { tipo: 'topico', titulo: 'Acesso e Iluminação', texto: 'Depósito mal iluminado é depósito perigoso. Instale luz LED com sensor de presença ou um interruptor logo na entrada (nunca dentro do cômodo escuro). Mantenha um corredor central livre de 60 cm para circulação — ninguém deve precisar pular caixas para acessar nada.' },
            { tipo: 'topico', titulo: 'Não Vire Lixeira', texto: 'Depósito não é "para guardar tudo o que talvez um dia precise". A cada 6 meses, descarte o que não foi usado em 2 anos. Pilhas velhas, eletrônicos quebrados e materiais inflamáveis esquecidos viram bombas-relógio.' },
            { tipo: 'dica', texto: 'Use luvas de raspa e calçado fechado SEMPRE que entrar no depósito após mais de 30 dias sem visita. Sacuda caixas antes de abrir.' }
        ]
    },

    central_gas: {
        id: 'central_gas',
        nome: 'Gás (GLP)',
        emoji: '🔥',
        cor: '#D32F2F',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'O poder adormecido do gás GLP não perdoa falha de ventilação ou confinamento. Cada protocolo aqui foi escrito após acidentes reais.' },
            { tipo: 'topico', titulo: 'Posicionamento e Ventilação', texto: 'Botijões P13 e cilindros P45 NUNCA devem ficar em locais enclausurados, porões ou áreas abaixo do nível do solo — o GLP é mais denso que o ar e desce ao escapar. A válvula deve estar exposta em armários treliçados e gradeados que recebam ar corrente. Distância mínima de 1,5 m de portas, janelas e fontes de calor.' },
            { tipo: 'topico', titulo: 'Mangueiras e Validade', texto: 'Mangueiras amarelas (NBR 8613) têm validade IMPRESSA de 5 anos. Após esse prazo ressecam, racham e vazam. Inspecione a borracha mensalmente: dobre-a — se aparecerem fissuras, troque imediatamente. Use abraçadeiras metálicas nas conexões (jamais arame ou plástico).' },
            { tipo: 'topico', titulo: 'Teste de Vazamento Seguro', texto: 'Suspeitou de vazamento? Aplique espuma de sabão neutro com pincel sobre as conexões. Se borbulhar, há vazamento. JAMAIS use isqueiro, fósforo ou chama para "ver de onde sai" — explosão imediata.' },
            { tipo: 'dica', texto: 'Sentiu cheiro forte de "alho" (mercaptana — odorizante de segurança)? JAMAIS ligue interruptores ou acenda fósforos. Abra portas e janelas, feche o registro do botijão e SAIA do ambiente. Chame os bombeiros (193) da rua, com seu celular. Faíscas de interruptor já detonaram explosões fatais.' }
        ]
    },

    // ── LAZER E EXTERIOR ───────────────────────────────────────
    quintal: {
        id: 'quintal',
        nome: 'Quintal / Jardim',
        emoji: '🌳',
        cor: '#43A047',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'O quintal é zona de liberdade — e exatamente por isso, exige mapeamento minucioso de plantas tóxicas, animais peçonhentos e ferramentas.' },
            { tipo: 'topico', titulo: 'Plantas Tóxicas Comuns', texto: 'Espirradeira, comigo-ninguém-pode, copo-de-leite, mamona, tinhorão e azaleia são ornamentais comuns que podem causar intoxicação grave por ingestão ou contato. Crianças e pets investigam tudo na boca. Identifique todas as plantas do seu jardim — consulte o módulo Plantas Tóxicas no app.' },
            { tipo: 'topico', titulo: 'Animais Peçonhentos', texto: 'Escorpiões, aranhas marrons, lagartas urticantes e serpentes habitam pilhas de folhas, lenha empilhada, entulho e cantos escuros. Mantenha o quintal sempre limpo, com vegetação aparada e sem acúmulo de materiais. Use luvas e botas ao manusear terra ou folhas secas.' },
            { tipo: 'topico', titulo: 'Ferramentas e Produtos', texto: 'Tesouras de poda, machados, foices, podadores elétricos e roçadeiras devem ficar trancados em depósito. Inseticidas, herbicidas, formicidas e fertilizantes seguem a regra dos químicos: armário alto e trancado, embalagens originais.' },
            { tipo: 'dica', texto: 'Após chuvas fortes, sempre inspecione o quintal antes de liberar crianças e pets. Escorpiões e cobras frequentemente buscam refúgio seco em entradas e varandas após enchente.' }
        ]
    },

    jardinagem: {
        id: 'jardinagem',
        nome: 'Jardinagem / Plantas',
        emoji: '🌱',
        cor: '#8BC34A',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'O ato de cultivar conecta a casa à terra — mas a terra tem moradores invisíveis (parasitas, fungos) e o cultivo manuseia químicos que entram pelo pulmão e pela pele.' },
            { tipo: 'topico', titulo: 'EPI do Jardineiro', texto: 'Luvas de raspa (não de pano — não impedem espinhos e parasitas), botas fechadas com solado grosso, calça comprida e camisa de manga longa são equipamento básico. Em poda de árvores ou pulverização, adicione óculos de proteção e máscara facial PFF2.' },
            { tipo: 'topico', titulo: 'Plantas a Evitar com Crianças/Pets', texto: 'Antes de comprar muda, verifique se a espécie é tóxica. Lista crítica: comigo-ninguém-pode, espirradeira, copo-de-leite, mamona, azaleia, hortênsia, lírio, antúrio. Casas com crianças menores de 5 anos e pets devem ter o jardim 100% mapeado e plantas tóxicas isoladas ou removidas.' },
            { tipo: 'topico', titulo: 'Fertilizantes e Defensivos', texto: 'Fertilizantes químicos, formicidas, inseticidas e herbicidas devem ficar EM ARMÁRIO ALTO E TRANCADO, em embalagens originais, jamais transferidos para garrafas pet. Lave as mãos e troque a roupa imediatamente após aplicação. Pulverização sempre com vento a favor (nunca contra o rosto).' },
            { tipo: 'topico', titulo: 'Lesões Comuns', texto: 'Lesões típicas: cortes por tesoura (limpe com água corrente, antisséptico, vacina antitetânica em dia), picadas de inseto (compressa fria, anti-histamínico), urticária por contato com lagarta (lave com água corrente fria, NUNCA esfregue).' },
            { tipo: 'dica', texto: 'Compostagem doméstica é ótima, mas o composto úmido atrai mosquitos (dengue), baratas e ratos. Mantenha o composteiro fechado e longe da janela.' }
        ]
    },

    areas_coletivas: {
        id: 'areas_coletivas',
        nome: 'Áreas Comuns',
        emoji: '🏘️',
        cor: '#FFC107',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Playgrounds, quadras, salões e áreas comuns de condomínio têm responsabilidade compartilhada — o que multiplica o risco de manutenção negligenciada.' },
            { tipo: 'topico', titulo: 'Playground — Inspeção Visual', texto: 'Antes de liberar a criança, faça inspeção rápida: parafusos expostos? Madeira lascada? Plástico ressecado/quebradiço? Corrente de balanço com elos abertos? Piso de borracha rasgado? Reporte qualquer defeito à administração e evite o equipamento. Brinquedos metálicos atingem 70 °C em dias de sol forte — verifique a temperatura com a mão antes.' },
            { tipo: 'topico', titulo: 'Quadras e Salão de Festas', texto: 'Pisos de quadra molhados (chuva, ar-condicionado pingando) são pistas de queda. Em salão de festas, o risco principal é elétrico: vários eletrodomésticos compartilhando extensões em festas grandes. Combine com a administração a carga máxima permitida.' },
            { tipo: 'topico', titulo: 'Elevadores e Escadas Comuns', texto: 'Crianças nunca devem brincar dentro do elevador. Ensine: dedos longe das portas (esmagamento), nunca pular dentro da cabine (sensores de peso disparam emergência), saída em ordem. Em escadas comuns, atenção redobrada a degraus de mármore polido e iluminação deficiente.' },
            { tipo: 'dica', texto: 'Conheça os pontos de encontro do seu condomínio em caso de incêndio ou evacuação. Saiba onde ficam os extintores, hidrantes e a saída de emergência da sua torre/bloco.' }
        ]
    },

    piscina: {
        id: 'piscina',
        nome: 'Piscina',
        emoji: '🏊',
        cor: '#03A9F4',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Afogamentos são predominantemente mudos, velozes e a forma suprema de letalidade entre crianças de 1 a 4 anos no verão domiciliar.' },
            { tipo: 'topico', titulo: 'Vigilância Ativa: a regra dos 10 segundos', texto: 'O celular destruiu a vigília das bordas. Nunca delegue por suposição: "alguém estava olhando". Quando há piscina, designe explicitamente um adulto "vigilante", em turnos cronometrados, SEM celular ao alcance. Sua única função: observar a superfície. Afogamento é silencioso — a criança não grita, ela luta calada para respirar.' },
            { tipo: 'topico', titulo: 'Barreiras Físicas', texto: 'Cercas removíveis ou fixas de no mínimo 1,20 m de altura, com fechadura automática alta (fora do alcance de crianças), salvam 75% dos afogamentos domiciliares de menores. Capas rígidas de proteção (não as de aquecimento) suportam o peso de uma criança e impedem que ela caia na água.' },
            { tipo: 'topico', titulo: 'Ralo e Aprisionamento', texto: 'Ralos antigos sem grade de segurança (sem certificação ABNT NBR 16783) podem causar aprisionamento por sucção fatal. Crianças e mesmo adultos morrem agarrados ao ralo. Substitua ralos antigos por modelos antiaprisionamento — investimento que paga a vida.' },
            { tipo: 'topico', titulo: 'Alarmes e Equipamentos', texto: 'Alarmes de borda detectam perturbação na superfície e disparam sirene. Combine com pulseiras/colares pessoais que disparam ao molhar (crianças muito pequenas). Mantenha boia salva-vidas, ganchos de resgate e haste longa (≥2,5 m) visíveis e acessíveis.' }
        ]
    },

    praia_rios: {
        id: 'praia_rios',
        nome: 'Áreas Naturais',
        emoji: '🌊',
        cor: '#0288D1',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Praia, rio, cachoeira e represa são ambientes não controlados — correntezas, marés, fauna marinha e clima variável exigem leitura ativa do risco.' },
            { tipo: 'topico', titulo: 'Bandeiras e Sinalização', texto: 'Respeite RIGOROSAMENTE a sinalização: bandeira vermelha = proibido entrar; amarela = atenção, perigo moderado; verde = segurança razoável. Em praias sem salva-vidas, evite mergulhar. Nunca subestime correntezas — mesmo nadadores experientes são arrastados.' },
            { tipo: 'topico', titulo: 'Colete Salva-vidas Homologado', texto: 'Para crianças e não-nadadores, colete salva-vidas homologado (CIASA — Capitania dos Portos) é OBRIGATÓRIO em embarcações e altamente recomendado em águas naturais. Boias de braço, prancha de espuma e brinquedos infláveis NÃO substituem colete — podem virar armadilha mortal.' },
            { tipo: 'topico', titulo: 'Águas-vivas, Ouriços e Outros', texto: 'Em contato com água-viva: lave com água do mar (água doce pode piorar), remova tentáculos com objeto rígido (nunca com a mão), aplique compressa morna. Espinhos de ouriço: jamais arranque (quebram); compressa quente ajuda a dissolver. Procure atendimento médico se houver dor intensa.' },
            { tipo: 'topico', titulo: 'Sol, Hidratação e Insolação', texto: 'Protetor solar FPS 50+ aplicado 30 min antes da exposição e reaplicado a cada 2 h. Água a cada 30 min, mesmo sem sede. Evite o sol das 10 às 16 h. Crianças menores de 6 meses NÃO devem ficar expostas ao sol direto — barreira física (sombra, chapéu, roupa UV).' },
            { tipo: 'dica', texto: 'Em rios e represas, NUNCA mergulhe de cabeça em local desconhecido — pedras submersas e fundo raso causam lesões cervicais irreversíveis. Entre sempre devagar, pés primeiro.' }
        ]
    },

    // ── CIRCULAÇÃO E ACESSOS ───────────────────────────────────
    escadas: {
        id: 'escadas',
        nome: 'Escadas',
        emoji: '🪜',
        cor: '#F44336',
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'A gravidade sempre vence na ausência de limites e aderência. Escadas merecem atenção militar em casas com crianças e idosos.' },
            { tipo: 'topico', titulo: 'Baby Gates Infalíveis', texto: 'Nunca instale portões tipo "sanfona" na borda das escadas. Os trincos de barreiras de segurança (no topo e na base) precisam estar AFIXADOS COM PARAFUSOS nas paredes, jamais por pressão. Devem suportar o empurrão de uma criança em corrida (15-20 kg de impacto).' },
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
        useStyledHero: true,
        conteudo: [
            { tipo: 'destaque', texto: 'Varandas concentram dois riscos altos e silenciosos: quedas de altura (crianças e idosos) e queda de objetos sobre transeuntes.' },
            { tipo: 'topico', titulo: 'Redes e Telas — Especificação Correta', texto: 'Para crianças, redes de proteção certificadas (norma INMETRO) são obrigatórias até os 12 anos. O fio deve ter no mínimo 2,5 mm de espessura e malha máxima de 5 cm. Revisão profissional anual é mandatória — fios de polipropileno degradam com sol e chuva em 3-5 anos. Vasos pesados nunca devem ficar apoiados no parapeito.' },
            { tipo: 'topico', titulo: 'Objetos que Caem Matam', texto: 'Vasos de planta, brinquedos, ferramentas, garrafas — qualquer objeto caindo de uma sacada gera energia cinética suficiente para fraturar crânios no térreo. Mantenha objetos pesados sempre afastados do parapeito (mínimo 50 cm). Em dias de vento forte, recolha tudo que possa voar.' },
            { tipo: 'topico', titulo: 'Churrasqueira e Gás na Varanda', texto: 'Se a varanda for área de churrasco, mantenha o botijão sempre do lado externo da sacada (nunca encostado em paredes vizinhas). Verifique que a saída de fumaça não invada o apartamento de cima — convenções de condomínio têm exigência clara sobre coifa.' },
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
