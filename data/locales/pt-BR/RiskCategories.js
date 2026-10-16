export const RISK_CATEGORIES = [
  {
    id: 'festas_eventos',
    title: 'Festas e Eventos',
    subtitle: 'Segurança em reuniões sociais',
    audience: [ 'adult', 'child', 'baby', 'pet' ],
    icon: 'Musicnote',
    color: '#E91E63',
    gradient: [ '#C2185B', '#F48FB1' ],
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800',
    educational: {
      description: 'Quando a casa está cheia de convidados, é comum achar que "alguém" está cuidando das crianças. A distração em eventos faz com que copos com bebidas alcóolicas e facas de churrasco fiquem jogados ao alcance dos pequenos.',
      keyPoints: [
        'Combine com outros adultos quem vai ficar de olho nas crianças por turnos.',
        'Tire tapetes soltos e avise os convidados idosos se houver degraus ou desníveis.',
        'Tranque a porta da cozinha e isole o acesso à churrasqueira e à piscina.',
        'Recolha copos de bebidas alcoólicas vazios ou pela metade nas mesas.'
      ]
    },
    questions: [
      {
        id: 'fes_1',
        critico: true,
        text: 'O acesso à piscina está bloqueado?',
        consequence: 'O afogamento infantil acontece em completo silêncio e em menos de 2 minutos.',
        checkAction: 'Tranque portões de acesso, estique redes ou use coberturas adequadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_2',
        critico: true,
        text: 'Há um adulto dedicado a vigiar as crianças?',
        consequence: 'Achar que os outros estão vigiando é o maior erro de segurança em festas de família.',
        checkAction: 'Designe um adulto responsável por vez, sem distrações com celular.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_3',
        critico: true,
        text: 'Bebidas alcoólicas estão fora do alcance delas?',
        consequence: 'Crianças pequenas bebem copos largados em mesas baixas, o que causa intoxicação rápida.',
        checkAction: 'Deixe copos e garrafas em mesas ou balcões altos.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_4',
        critico: true,
        text: 'A churrasqueira tem uma barreira de segurança?',
        consequence: 'Queimaduras graves em crianças ou pets que passam correndo perto da brasa.',
        checkAction: 'Impeça o acesso criando um limite físico de 1 metro ao redor da churrasqueira.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_5',
        critico: true,
        text: 'As facas de churrasco foram guardadas?',
        consequence: 'Facas grandes largadas na bancada da pia podem ser puxadas por crianças.',
        checkAction: 'Guarde facas e garfos de churrasco em gavetas altas logo após o uso.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_6',
        text: 'Você avisou os convidados sobre degraus ou desníveis?',
        consequence: 'Tropeções e quedas graves em pisos desconhecidos ou mal iluminados.',
        checkAction: 'Avise na chegada ou coloque uma fita colorida para sinalizar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_7',
        text: 'Os pets estão em local seguro durante a festa?',
        consequence: 'Bichos de estimação podem morder por estresse com o barulho ou fugir pelo portão aberto.',
        checkAction: 'Mantenha-os em um cômodo tranquilo ou use coleira.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_8',
        text: 'Os fios de extensões estão fora do caminho de passagem?',
        consequence: 'Tropeções em fios e risco de curtos com copos de bebidas derramados.',
        checkAction: 'Prenda os fios no chão com fita adesiva e afaste de locais úmidos.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_9',
        critico: true,
        text: 'Se você mora em apartamento, as janelas e sacadas estão com redes?',
        consequence: 'Crianças de fora não conhecem o perigo de altura e podem tentar subir em móveis perto do parapeito.',
        checkAction: 'Mantenha janelas fechadas ou garanta que tenham telas de proteção.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_10',
        critico: true,
        text: 'Se o evento for em sítio ou chácara, poços e lagos estão cercados?',
        consequence: 'Crianças acostumadas com apartamento desconhecem o perigo de águas naturais.',
        checkAction: 'Mantenha portões trancados e proíba passeios perto da água sem adultos supervisionando.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_11',
        text: 'Idosos e convidados com limitações conhecem o local?',
        consequence: 'Desníveis e degraus invisíveis causam quedas perigosas na terceira idade.',
        checkAction: 'Acompanhe o convidado na chegada e mostre onde ficam desníveis e banheiros.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_12',
        text: 'O banheiro e as áreas de lazer são acessíveis (adaptados)?',
        consequence: 'Improvisar passagens causa acidentes com cadeirantes ou pessoas com muletas.',
        checkAction: 'Libere corredores e garanta portas desimpedidas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  },
  {
    id: 'visitacao_segura',
    title: 'Visitação Segura',
    subtitle: 'Receber ou visitar idosos e bebês',
    audience: [ 'adult', 'baby', 'elderly' ],
    icon: 'UserAdd',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    image: 'https://images.pexels.com/photos/6348123/pexels-photo-6348123.jpeg?auto=compress&cs=tinysrgb&w=800',
    educational: {
      description: 'Receber visitas exige adaptar a casa para quem não a conhece. Idosos, crianças e bebês têm necessidades de segurança específicas que você pode não perceber na correria do dia a dia.',
      keyPoints: [
        'Tire capachos e tapetes soltos do caminho dos idosos.',
        'Mostre degraus e garanta boa iluminação nos corredores da casa.',
        'Proteja tomadas baixas e oculte fios elétricos se for receber bebês ou pets.',
        'Remédios e venenos devem ir para armários altos e trancados.'
      ]
    },
    questions: [
      {
        id: 'vis_1',
        critico: true,
        text: 'Tirou tapetes soltos e capachos do caminho?',
        consequence: 'Tropeções em tapetes são a maior causa de quedas de idosos em casas alheias.',
        checkAction: 'Remova-os ou cole fita antiderrapante embaixo.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_2',
        text: 'Sinalizou desníveis e pequenos degraus?',
        consequence: 'Visitantes não conhecem os desníveis da sua casa e podem tropeçar.',
        checkAction: 'Avise logo na entrada ou cole uma fita de aviso.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_3',
        critico: true,
        text: 'Tirou objetos pequenos do chão e das mesas baixas?',
        consequence: 'Bebês curiosos colocam moedas, botões e tampinhas na boca rápido.',
        checkAction: 'Dê uma olhada no chão antes das visitas chegarem.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_4',
        critico: true,
        text: 'Tampou tomadas baixas?',
        consequence: 'Choques em dedinhos que tentam explorar os furos da tomada.',
        checkAction: 'Use protetores plásticos específicos nas tomadas não utilizadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_5',
        critico: true,
        text: 'Trancou remédios e produtos de limpeza?',
        consequence: 'Intoxicações acidentais com recipientes coloridos deixados em gavetas ou debaixo da pia.',
        checkAction: 'Coloque tudo em armários altos ou trancados.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_6',
        critico: true,
        text: 'O banheiro tem barras ou tapete antiderrapante?',
        consequence: 'O piso molhado do banheiro é o local mais perigoso para idosos.',
        checkAction: 'Use tapete de borracha no box e disponibilize barras de apoio.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_7',
        critico: true,
        text: 'Perguntou sobre alergias alimentares dos visitantes?',
        consequence: 'Ingerir alimentos proibidos por engano pode causar crises alérgicas graves.',
        checkAction: 'Confirme o cardápio com os convidados antes de servir.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_8',
        critico: true,
        text: 'Se você mora em apartamento, as janelas e sacadas estão travadas ou com redes?',
        consequence: 'Crianças que moram em casa térrea não entendem o perigo de altura.',
        checkAction: 'Instale redes e mantenha janelas altas travadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_9',
        text: 'Se você mora em casa térrea ou sítio, a grama e quintal foram verificados?',
        consequence: 'Visitantes de apartamento não sabem reconhecer buracos ou animais peçonhentos.',
        checkAction: 'Alerte sobre calçado fechado e áreas de mato ou entulho.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_10',
        text: 'Garantia de acessibilidade para visitantes com necessidades especiais?',
        consequence: 'Degraus soltos ou portas estreitas causam quedas graves ao improvisar.',
        checkAction: 'Libere acessos de cadeiras de rodas e muletas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_11',
        text: 'Informou o convidado idoso sobre a presença de escadas ou rampas?',
        consequence: 'A desorientação em um novo ambiente favorece quedas graves.',
        checkAction: 'Faça um tour guiado rápido com o idoso mostrando o caminho.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  },
  {
    id: 'reformas_obras',
    title: 'Reformas e Obras',
    subtitle: 'Manutenções e construções ativas',
    audience: [ 'adult' ],
    icon: 'hammer-wrench',
    color: '#795548',
    gradient: [ '#5D4037', '#D7CCC8' ],
    image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
    educational: {
      description: 'Obras em casa sempre deixam o ambiente de pernas para o ar. Fios expostos provisórios e pregos e parafusos ou pedaços de madeira espalhados no chão são as maiores armadilhas de acidentes.',
      keyPoints: [
        'Tranque ou isole a área em obras para evitar a entrada de crianças e pets.',
        'Desligue a chave geral no quadro de luz antes de mexer na fiação.',
        'Use sempre uma escada firme e garanta que alguém apoie a base enquanto você sobe.'
      ]
    },
    questions: [
      {
        id: 'ref_1',
        critico: true,
        text: 'A área da obra está trancada ou isolada?',
        consequence: 'Crianças e pets entram, exploram os locais de obra e se machucam nos entulhos.',
        checkAction: 'Feche portas ou coloque placas/tapumes impedindo a entrada.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_2',
        text: 'Desliga os disjuntores da área ao fim do expediente?',
        consequence: 'Instalações elétricas provisórias de obra podem aquecer à noite e pegar fogo.',
        checkAction: 'Desligue a chave geral da fiação da obra antes de ir dormir.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_3',
        critico: true,
        text: 'As ferramentas elétricas foram tiradas da tomada?',
        consequence: 'Acionamento acidental por crianças que apertam gatilhos de furadeiras ou serras.',
        checkAction: 'Desplugue da tomada logo após terminar o uso.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_4',
        critico: true,
        text: 'Pregos, parafusos e cacos de vidro foram recolhidos?',
        consequence: 'Perfurações graves nos pés de quem circula descalço ou de meias.',
        checkAction: 'Varra o local de trabalho ao final de cada dia.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_5',
        critico: true,
        text: 'Massa corrida, tintas e solventes estão trancados?',
        consequence: 'Risco de inalação, quebras químicas na pele e incêndio com solventes acesos.',
        checkAction: 'Armazene latas de tinta e solventes em local trancado e fresco.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_6',
        critico: true,
        text: 'Fios elétricos estão longe de baldes e poças de água?',
        consequence: 'Curto-circuito e choques gravíssimos ao pisar na água molhada com fios.',
        checkAction: 'Organize as extensões e mantenha longe de umidade e tubulações.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_7',
        text: 'Você e os ajudantes usam óculos e luvas de proteção?',
        consequence: 'Fagulhas de metal ou pedaços de tijolo batendo no olho causam cegueira.',
        checkAction: 'Coloque óculos de proteção antes de cortar ou martelar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_8',
        text: 'O entulho foi varrido ou colocado em caçamba?',
        consequence: 'Acúmulo de poeira e detritos pontiagudos pelo quintal.',
        checkAction: 'Limpe o entulho diariamente usando sacos resistentes.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  },
  {
    id: 'mudanca_residencia',
    title: 'Mudança de Residência',
    subtitle: 'Segurança no novo lar',
    audience: [ 'adult', 'child', 'baby', 'pet', 'elderly' ],
    icon: 'HomeHash',
    color: '#FF5722',
    gradient: [ '#BF360C', '#FF8A65' ],
    image: 'https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg?auto=compress&cs=tinysrgb&w=800',
    educational: {
      description: 'Novas casas trazem novidades perigosas: tomadas sem proteção, janelas altas sem rede e caixas pesadas empilhadas que podem tombar sobre os pequenos.',
      keyPoints: [
        'Descubra onde fica a chave geral de energia e o registro de gás logo no primeiro dia.',
        'Instale as redes de proteção nas janelas antes de trazer as caixas.',
        'Parafuse estantes, cômodas e armários altos na parede para não tombarem.'
      ]
    },
    questions: [
      {
        id: 'mud_1',
        critico: true,
        text: 'Instalou as telas de segurança em janelas e sacadas?',
        consequence: 'Crianças e gatos assustados com a mudança tentam explorar vãos de janelas altas.',
        checkAction: 'Mantenha janelas trancadas até que redes sejam instaladas. Prefira empresas especializadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_2',
        critico: true,
        text: 'Os móveis altos foram parafusados na parede?',
        consequence: 'Cômodas e armários tombam quando as crianças tentam escalar as gavetas.',
        checkAction: 'Fixe os móveis com suportes metálicos anti-tombamento.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_3',
        text: 'Você sabe onde desligar a energia e fechar o gás?',
        consequence: 'Em vazamentos ou curtos, a demora para achar os registros gera incêndios.',
        checkAction: 'Localize a chave geral e o registro de gás do novo lar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_4',
        text: 'As pilhas de caixas estão firmes e longe dos corredores?',
        consequence: 'Caixas altas desabam sobre crianças ou bloqueiam as portas de saída.',
        checkAction: 'Empilhe poucas caixas de cada vez e encostadas na parede.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_5',
        text: 'Inspecionou as tomadas e fiações do novo imóvel?',
        consequence: 'Instalações antigas podem esquentar ou causar curto-circuito com aparelhos de alta potência (Watts).',
        checkAction: 'Teste disjuntores e cheque se há fios soltos nas paredes ou aquecimento. Consulte um profissional qualificado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_6',
        text: 'Há alguém encarregado exclusivamente de cuidar dos filhos/pets na mudança?',
        consequence: 'Portas e portões abertos o tempo todo facilitam fugas, quedas ou acidentes de trânsito.',
        checkAction: 'Deixe as crianças e pets com familiares ou em um quarto seguro.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  },
  {
    id: 'monitor_kids',
    title: 'Monitorando Crianças',
    subtitle: 'Supervisão ativa e rotina',
    audience: [ 'baby', 'child' ],
    icon: 'eye-outline',
    color: '#009688',
    gradient: [ '#00695C', '#4DB6AC' ],
    image: 'https://images.pexels.com/photos/8612920/pexels-photo-8612920.jpeg?auto=compress&cs=tinysrgb&w=800',
    educational: {
      description: 'Vigiar ativamente é a chave para evitar acidentes com os pequenos. Crianças não têm noção do perigo, são rápidas e se expõem a perigos em segundos.',
      keyPoints: [
        'Nunca deixe bebês sozinhos em cima de trocadores ou camas.',
        'Impeça a entrada de crianças na cozinha quando o fogão estiver em uso.',
        'Verifique se as redes de proteção das janelas estão firmes.',
        'Evite distração com o celular, TV ou redes sociais se sua tarefa for vigiar as crianças.'
      ]
    },
    questions: [
      {
        id: 'kid_1',
        critico: true,
        text: 'Você consegue ver a criança agora?',
        consequence: 'Bastam alguns segundos de distração para o bebê mexer ou alcançar algo perigoso.',
        checkAction: 'Mantenha constante contato visual e permaneça sempre próximo da criança.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_2',
        text: 'O celular está guardado ou longe de você?',
        consequence: 'Acessar redes sociais ou trocar mensagens tira a sua atenção imediata.',
        checkAction: 'Deixe o celular no silencioso e foque na supervisão.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_3',
        critico: true,
        text: 'As janelas do cômodo têm redes de proteção apropriadas e em boas condições?',
        consequence: 'Quedas de janelas ou sacadas em apartamentos são acidentes gravíssimos.',
        checkAction: 'Instale redes de proteção e mantenha as janelas trancadas caso não tenha.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_4',
        critico: true,
        text: 'A cozinha está isolada enquanto você cozinha?',
        consequence: 'Queimaduras graves com respingos de gordura quente ou puxões de panelas.',
        checkAction: 'Mantenha a porta da cozinha fechada ou use portõezinhos de proteção.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_5',
        critico: true,
        text: 'Medicamentos e desinfetantes estão fora de alcance?',
        consequence: 'A ingestão de remédios coloridos ou cloro causa intoxicação rápida.',
        checkAction: 'Guarde desinfetantes e comprimidos em prateleiras fora do alcance de crianças.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_6',
        critico: true,
        text: 'Certificou-se de que não há moedas ou pilhas no chão?',
        consequence: 'Bebês colocam tudo na boca. Baterias geram asfixia ou queimaduras no esôfago.',
        checkAction: 'Faça uma varredura visual no chão do quarto e da sala.',
        options: [ { label: 'Não', safe: true }, { label: 'Sim', safe: false } ]
      }
    ]
  },
  {
    id: 'servicos_altura',
    title: 'Serviços em Altura',
    subtitle: 'Limpeza de teto e cortinas',
    audience: [ 'adult' ],
    icon: 'ladder',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    image: require('../../../assets/illustrations/pad/quedas-escadas_riscos-escadas-portateis_020.jpg'),
    educational: {
      description: 'Quedas de escadas ou cadeiras improvisadas causam traumas sérios. Mantenha os pés no chão firme ao fazer limpezas domésticas.',
      keyPoints: [
        'Nunca use bancos ou cadeiras empilhadas para alcançar o teto.',
        'Use uma escada de alumínio em boas condições e travada.',
        'Peça para um ajudante firmar a base da escada enquanto você sobe.',
        'Evite se inclinar muito para as laterais; desça e mova a escada.'
      ]
    },
    questions: [
      {
        id: 'alt_1',
        critico: true,
        text: 'Você usa uma escada firme e apropriada?',
        consequence: 'Subir em cadeiras ou caixas é perigoso, instável e causa quedas.',
        checkAction: 'Adquira e use uma escada doméstica que tenha {{CERT_SEAL}}.',
        options: [
          { label: 'Sim (Escada)', safe: true },
          { label: 'Usei cadeira', safe: false }
        ]
      },
      {
        id: 'alt_2',
        text: 'Há alguém ajudando a segurar a base da escada?',
        consequence: 'A escada pode escorregar lateralmente se o piso estiver liso.',
        checkAction: 'Peça ajuda de alguém para apoiar os pés da escada para evitar que deslize.',
        options: [
          { label: 'Sim', safe: true },
          { label: 'Estou sozinho', safe: false }
        ]
      },
      {
        id: 'alt_3',
        critico: true,
        text: 'A escada está totalmente aberta com as travas presas?',
        consequence: 'Escada destravada pode fechar de repente durante a subida.',
        checkAction: 'Veja se o limitador de abertura está travado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'alt_4',
        critico: true,
        text: 'O chão onde apoia a escada está seco?',
        consequence: 'Apoiar em piso molhado ou irregular causa deslizamento ou tombamento da escada.',
        checkAction: 'Seque o piso e limpe a área antes de posicionar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'alt_5',
        text: 'Você evita se esticar para alcançar pontos distantes?',
        consequence: 'Inclinar o tronco para os lados desloca o peso e tomba a escada.',
        checkAction: 'Desça e mude a escada de lugar em vez de se esticar.',
        options: [
          { label: 'Sim, evito', safe: true },
          { label: 'Não', safe: false }
        ]
      },
      {
        id: 'alt_6',
        critico: true,
        text: 'Se for subir no telhado ou laje, avaliou chamar um profissional especializado?',
        consequence: 'Quedas de lajes e telhados que quebram costumam ser fatais.',
        checkAction: 'Contrate um calheiro ou telhadeiro especializado em vez de se arriscar.',
        options: [
          { label: 'Sim (Contratei)', safe: true },
          { label: 'Vou eu mesmo', safe: false }
        ]
      }
    ]
  },
  {
    id: 'faxina_quimica',
    title: 'Faxina Pesada',
    subtitle: 'Manuseio de Produtos Químicos',
    audience: [ 'adult' ],
    icon: 'bottle-tonic-skull',
    color: '#9C27B0',
    gradient: [ '#7B1FA2', '#E1BEE7' ],
    image: require('../../../assets/illustrations/pad/produtos-limpeza_como-organizar-utensilios-domesticos-per_011.jpg'),
    educational: {
      description: 'Misturar produtos de limpeza pode gerar gases venenosos invisíveis que queimam os pulmões. Use um produto por vez e mantenha a casa ventilada.',
      keyPoints: [
        'Nunca misture água sanitária com amônia, vinagre ou detergentes.',
        'Use sempre luvas de borracha para proteger a pele das mãos.',
        'Abra janelas e portas para manter o ar circulando durante a faxina.',
        'Não mude produtos de limpeza de embalagem para garrafas PET.'
      ]
    },
    questions: [
      {
        id: 'qui_1',
        critico: true,
        text: 'As janelas e portas da área da faxina estão abertas?',
        consequence: 'Vapores químicos se acumulam e causam tontura, asma e desmaios.',
        checkAction: 'Abra tudo para circulação e renovação do ar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_2',
        critico: true,
        text: 'Você evita misturar desinfetantes com água sanitária?',
        consequence: 'Misturas químicas geram vapores de cloro altamente tóxicos.',
        checkAction: 'Use apenas um produto. Enxágue bem o chão antes de passar outro.',
        options: [
          { label: 'Sim (Não misturo)', safe: true },
          { label: 'Não (Misturo)', safe: false }
        ]
      },
      {
        id: 'qui_3',
        text: 'Você está calçando botas e usando luvas?',
        consequence: 'Cloro e ácidos causam dermatite e queimaduras químicas na pele.',
        checkAction: 'Calce luvas de borracha antes de começar a mexer com os baldes.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_4',
        critico: true,
        text: 'Crianças e pets estão longe da faxina?',
        consequence: 'Eles respiram os vapores do chão ou podem beber a água suja do balde.',
        checkAction: 'Mantenha-os em outro cômodo ou fora de casa até secar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_5',
        critico: true,
        text: 'Os produtos estão nas garrafas originais de fábrica?',
        consequence: 'Guardar desinfetante ou cloro em garrafa de suco causa envenenamento acidental.',
        checkAction: 'Nunca troque os produtos de embalagem.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_6',
        text: 'Você avisou a família que o piso está molhado?',
        consequence: 'Escorregões no chão ensaboado causam tombos perigosos.',
        checkAction: 'Coloque uma cadeira de aviso ou alerte todos na casa.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  }
];

export default RISK_CATEGORIES;
