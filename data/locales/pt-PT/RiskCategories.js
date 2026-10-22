export const RISK_CATEGORIES_PT = [
  {
    id: 'festas_eventos',
    title: 'Festas e Eventos',
    subtitle: 'Segurançã em reuniões sociais',
    audience: [ 'adult', 'child', 'baby', 'pet' ],
    icon: 'Musicnote',
    color: '#E91E63',
    gradient: [ '#C2185B', '#F48FB1' ],
    educational: {
      description: '**O Risco Invisível:** A "responsabilidade difusa" faz com que todos achem que alguém está vigiando. Cadeiras fora do lugar tornam-se degraus para janelas, e copos com álcool são esquecidos ao alcance de crianças.',
      keyPoints: [
        '**Ação Tática Imediata:** Isole fisicamente áreas de risco (tranque portões e cozinha).',
        'Para visitas de idosos ou de pessoas com mobilidade reduzida, remova imediatamente os tapetes soltos.',
        'Alerte convidados sobre desníveis logo na chegada.',
        'Veja o conteúdo completo em preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'fes_1',
        critico: true,
        text: 'O acesso à piscina está fisicamente bloqueado?',
        consequence: 'Afogamento é silencioso e leva menos de 2 minutos.',
        checkAction: 'Feche portões, use redes ou cubra a piscina.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_2',
        critico: true,
        text: 'Há um adulto exclusivo supervisionando crianças?',
        consequence: 'A "responsabilidade difusa" é a principal causa de acidentes em eventos.',
        checkAction: 'Designe um responsável por turno.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_3',
        critico: true,
        text: 'Bebidas alcoólicas estão fora do alcance de menores?',
        consequence: 'Ingestão acidental de álcool é emergência pediátrica.',
        checkAction: 'Mantenha copos e garrafas em mesa alta.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_4',
        critico: true,
        text: 'Churrasqueira/fogueira tem perímetro seguro?',
        consequence: 'Queimaduras graves em crianças e pets.',
        checkAction: 'Delimite com grade ou barreira a 1m de distância.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_5',
        critico: true,
        text: 'Facas e utensílios cortantes foram guardados?',
        consequence: 'Cortes graves durante a movimentação do evento.',
        checkAction: 'Guarde em gaveta trancada ou armário alto.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_6',
        text: 'Convidados foram alertados sobre desníveis e degraus?',
        consequence: 'Tropeções e quedas graves em pisos desconhecidos ou mal iluminados.',
        checkAction: 'Sinalize com fita ou avise na chegada.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_7',
        text: 'Pets estão contidos ou com guia/coleira?',
        consequence: 'Mordidas, arranhões ou fuga durante confusão.',
        checkAction: 'Coloque em local seguro ou mantenha na guia.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_8',
        text: 'Extensões elétricas estão protegidas e fora do caminho?',
        consequence: 'Tropeções e risco de curto-circuito com líquidos.',
        checkAction: 'Fixe os fios com fita e afaste de áreas molhadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_9',
        critico: true,
        text: 'Se o evento é em apartamento: sacadas e janelas estão travadas?',
        consequence: 'Crianças de casa não têm noção de altura — sacadas são armadilhas.',
        checkAction: 'Trave janelas, feche sacadas e afaste móveis das bordas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_10',
        critico: true,
        text: 'Se o evento é em sítio/chácara: poços, lagos e rios estão cercados?',
        consequence: 'Crianças de apartamento desconhecem riscos de água natural.',
        checkAction: 'Mantenha os portões trancados e proíba passeios junto à água sem adultos a vigiar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_11',
        text: 'Idosos e PCDs conhecem o layout do local?',
        consequence: 'Desníveis, escadas e pisos desconhecidos causam quedas.',
        checkAction: 'Faça um tour guiado na chegada, apontando riscos.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'fes_12',
        text: 'A casa de banho e as áreas de lazer são acessíveis (adaptadas)?',
        consequence: 'Exclusão e risco de acidentes ao improvisar acessos.',
        checkAction: 'Verifique largura de portas, degraus e banheiro antes do evento.',
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
    educational: {
      description: 'Receber visitas exige adaptar a casa para quem não a conhece. Idosos, crianças, bebés e pessoas com deficiência têm necessidades de segurança específicas que pode não notar na correria do dia a dia.',
      keyPoints: [
        'Remova os tapetes soltos para visitas de idosos ou de pessoas com mobilidade reduzida.',
        'Verifique a largura de passagens e iluminação de degraus.',
        'Esconda fios e proteja tomadas para bebês e crianças em fase de engatinhar.',
        'Informe os riscos da casa (ex: degrau na sala) aos convidados.'
      ]
    },
    questions: [
      {
        id: 'vis_1',
        critico: true,
        text: 'Tapetes soltos e capachos foram retirados?',
        consequence: 'Principal causa de queda em idosos visitantes.',
        checkAction: 'Remova ou fixe com antiderrapante.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_2',
        text: 'Degraus e desníveis estão sinalizados?',
        consequence: 'Visitantes não conhecem o layout da casa.',
        checkAction: 'Use fita antiderrapante ou avise ao chegar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_3',
        critico: true,
        text: 'Objetos pequenos foram retirados do alcance de crianças?',
        consequence: 'Engasgamento com peças, moedas e decorações.',
        checkAction: 'Passe o olhar no nível do chão.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_4',
        critico: true,
        text: 'Tomadas baixas estão protegidas?',
        consequence: 'Choque elétrico em bebês e crianças curiosas.',
        checkAction: 'Use protetores de plástico próprios nas tomadas que não estão a ser usadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_5',
        critico: true,
        text: 'Produtos de limpeza e medicamentos estão trancados?',
        consequence: 'Intoxicações acidentais com recipientes coloridos deixados em gavetas ou debaixo do lava-loiça.',
        checkAction: 'Guarde em armário alto e trancado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_6',
        critico: true,
        text: 'Banheiro tem apoio ou barra para idosos?',
        consequence: 'Quedas no banheiro podem ser fatais para idosos.',
        checkAction: 'Use um tapete de borracha na base de duche e disponibilize barras de apoio.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_7',
        critico: true,
        text: 'Perguntou sobre alergias alimentares do visitante?',
        consequence: 'Reação alérgica grave (anafilaxia).',
        checkAction: 'Confirme antes de oferecer alimentos.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_8',
        critico: true,
        text: 'Se visitante vem de casa/rural para apartamento: janelas e sacadas seguras?',
        consequence: 'Crianças de casa térrea não percebem risco de altura.',
        checkAction: 'Trave janelas e bloqueie acesso a sacadas e elevadores.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_9',
        text: 'Se visitante vem de apartamento para casa/rural: terreno e fauna verificados?',
        consequence: 'Pisos irregulares, animais peçonhentos e água aberta são riscos desconhecidos.',
        checkAction: 'Alerte sobre terreno, calçado adequado e áreas proibidas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_10',
        text: 'Está garantida a acessibilidade para visitantes com deficiência ou mobilidade reduzida?',
        consequence: 'Degraus soltos ou portas estreitas causam quedas graves quando se improvisa.',
        checkAction: 'Verifique acessibilidade e providencie rampas se necessário.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_11',
        text: 'Idoso/PCD foi informado sobre desníveis, escadas e pisos da casa?',
        consequence: 'A desorientação num ambiente novo favorece quedas graves.',
        checkAction: 'Acompanhe na chegada e mostre os pontos de atenção.',
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
    educational: {
      description: 'As obras em casa deixam sempre tudo de pernas para o ar. Fios provisórios expostos, pregos, parafusos e pedaços de madeira espalhados no chão são as maiores armadilhas.',
      keyPoints: [
        '**Ação Tática Imediata:** Isole a área com barreiras físicas.',
        'Desligue a CHAVE GERAL antes de qualquer reparo elétrico.',
        'Em trabalhos em altura, nunca use bancos; utilize escadas travadas com um assistente segurando a base.',
        'Mais protocolos táticos em preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'ref_1',
        critico: true,
        text: 'A área da obra está trancada ou isolada?',
        consequence: 'Crianças e animais entram, exploram os locais de obra e magoam-se no entulho.',
        checkAction: 'Use tapumes ou tranque as portas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_2',
        text: 'Disjuntor da área é desligado ao final do dia?',
        consequence: 'As instalações elétricas provisórias de obra podem aquecer durante a noite e pegar fogo.',
        checkAction: 'Desligue o disjuntor ao sair.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_3',
        critico: true,
        text: 'Ferramentas elétricas foram desligadas da tomada?',
        consequence: 'Acionamento acidental por terceiros.',
        checkAction: 'Retire do plugue após o uso.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_4',
        critico: true,
        text: 'Pregos e materiais pontiagudos foram recolhidos?',
        consequence: 'Perfurações graves e risco de tétano.',
        checkAction: 'Varra e recolha ao final de cada dia.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_5',
        critico: true,
        text: 'Produtos químicos (solventes, tintas) estão trancados?',
        consequence: 'Intoxicação e risco de incêndio.',
        checkAction: 'Armazene em local ventilado e trancado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_6',
        critico: true,
        text: 'Extensões elétricas estão organizadas e longe de água?',
        consequence: 'Curto-circuito e incêndio.',
        checkAction: 'Arrume as extensões e mantenha-as longe da humidade e das canalizações.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_7',
        text: 'Trabalhadores estão com EPIs adequados?',
        consequence: 'Lesões oculares, cortes e quedas.',
        checkAction: 'Exija capacete, luvas e óculos.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_8',
        text: 'Entulho foi removido ou está em caçamba fechada?',
        consequence: 'Acidentes com crianças e obstrução de passagem.',
        checkAction: 'Remova diariamente ou use caçamba.',
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
    educational: {
      description: '**O Risco Invisível:** Caixas empilhadas criam zonas cegas. A curiosidade infantil em um ambiente desconhecido leva a acidentes rápidos em janelas sem redes.',
      keyPoints: [
        '**Ação Tática Imediata:** Mapeie a chave geral e registros de gás imediatamente.',
        'Fixe estantes e cômodas na parede no exato momento da montagem para evitar esmagamentos.',
        'Visite preveniremcasa.com.br para checklists completos de mudança.'
      ]
    },
    questions: [
      {
        id: 'mud_1',
        critico: true,
        text: 'Redes de proteção foram instaladas nas janelas?',
        consequence: 'Alto risco de queda em andares altos.',
        checkAction: 'Mantenha as janelas trancadas até as redes estarem instaladas. Prefira empresas especializadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_2',
        critico: true,
        text: 'Móveis altos estão fixados na parede?',
        consequence: 'Tombamento de estantes sobre crianças.',
        checkAction: 'Instale kits antitombamento.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_3',
        text: 'Identificou a chave geral e registros de gás?',
        consequence: 'Pânico em caso de vazamento ou curto.',
        checkAction: 'Localize e teste os registros.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_4',
        text: 'Caixas empilhadas estão estáveis e fora de passagens?',
        consequence: 'Tombamento e obstrução de rotas de fuga.',
        checkAction: 'Empilhe até a altura do ombro, longe de portas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_5',
        text: 'Tomadas e fiação do novo imóvel foram inspecionadas?',
        consequence: 'As instalações antigas podem aquecer ou provocar um curto-circuito com aparelhos de alta potência (watts).',
        checkAction: 'Teste os disjuntores e verifique se há fios soltos nas paredes ou aquecimento. Consulte um profissional qualificado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_6',
        text: 'Crianças e pets estão supervisionados durante a mudança?',
        consequence: 'Portas e portões abertos a toda a hora facilitam fugas, quedas ou acidentes de viação.',
        checkAction: 'Deixe as crianças e os animais com familiares ou num quarto seguro.',
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
    educational: {
      description: 'Vigiar ativamente é a chave para evitar acidentes com os mais pequenos. As crianças não têm noção do perigo, são rápidas e expõem-se a perigos em segundos.',
      keyPoints: [
          'Nunca deixe bebés sozinhos em cima de muda-fraldas ou camas.',
          'Impeça a entrada de crianças na cozinha quando o fogão estiver a ser usado.',
          'Verifique se as redes de proteção das janelas estão firmes.',
          'Evite distrair-se com o telemóvel, a televisão ou as redes sociais se a sua tarefa for vigiar as crianças.',
      ]
    },
    questions: [
      {
        id: 'kid_1',
        critico: true,
        text: 'Você consegue ver a criança agora?',
        consequence: 'Bastam alguns segundos de distração para o bebé mexer ou alcançar algo perigoso.',
        checkAction: 'Mantenha contacto visual constante e fique sempre perto da criança.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_2',
        text: 'O celular está longe de você?',
        consequence: 'Aceder às redes sociais ou trocar mensagens tira-lhe a atenção imediata.',
        checkAction: 'Deixe o celular em outro cômodo.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_3',
        critico: true,
        text: 'As janelas da divisão têm redes de proteção adequadas e em bom estado?',
        consequence: 'Quedas de altura são a principal causa de óbito infantil.',
        checkAction: 'Instale redes de proteção e mantenha as janelas trancadas enquanto não as tiver.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_4',
        critico: true,
        text: 'A cozinha está inacessível durante o preparo?',
        consequence: 'Queimaduras por líquidos quentes e panelas.',
        checkAction: 'Mantenha a porta da cozinha fechada ou use portões de segurança.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_5',
        critico: true,
        text: 'Medicamentos e produtos de limpeza estão trancados?',
        consequence: 'Intoxicação acidental é emergência frequente em menores de 5 anos.',
        checkAction: 'Guarde desinfetantes e comprimidos em prateleiras fora do alcance das crianças e de pessoas com limitações cognitivas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_6',
        critico: true,
        text: 'Certificou-se de que não há moedas ou pilhas no chão?',
        consequence: 'Os bebés levam tudo à boca. As pilhas provocam asfixia ou queimaduras no esófago.',
        checkAction: 'Faça uma varredura no nível do chão.',
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
    educational: {
      description: 'Quedas são a principal causa de acidentes domésticos graves, especialmente em idosos e adultos realizando manutenção.',
      keyPoints: [
        'Nunca use cadeiras, bancos ou caixotes como escada.',
        'Mantenha a escada totalmente aberta e travada.',
        'Tenha sempre um assistente (spotter) segurando a base da escada.',
        'Não tente alcançar lugares longes; desça e mova a escada.',
        'Em serviços em telhado ou laje, tenha certeza da sua capacidade. Chamar um profissional evita tragédias.',
        'Nunca use escadas metálicas se houver mínima possibilidade de contato com rede elétrica.'
      ]
    },
    questions: [
      {
        id: 'alt_1',
        critico: true,
        text: 'Você está usando uma escada apropriada (não cadeira)?',
        consequence: 'Subir para cadeiras ou caixas é perigoso, instável e provoca quedas.',
        checkAction: 'Use uma escada doméstica que tenha {{CERT_SEAL}}.',
        options: [
          { label: 'Sim', safe: true },
          { label: 'Usei cadeira', safe: false }
        ]
      },
      {
        id: 'alt_2',
        text: 'Tem alguém segurando a base da escada?',
        consequence: 'A escada pode escorregar no piso liso.',
        checkAction: 'Peça a alguém que segure a base do escadote para evitar que deslize.',
        options: [
          { label: 'Sim', safe: true },
          { label: 'Estou só', safe: false }
        ]
      },
      {
        id: 'alt_3',
        critico: true,
        text: 'A escada está totalmente aberta e travada?',
        consequence: 'Escada mal travada fecha durante o uso.',
        checkAction: 'Verifique as travas antes de subir.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'alt_4',
        critico: true,
        text: 'O piso onde a escada está apoiada é firme e seco?',
        consequence: 'Apoiar o escadote em piso molhado ou irregular faz com que deslize ou tombe.',
        checkAction: 'Seque o chão e limpe a zona antes de o posicionar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'alt_5',
        text: 'Está evitando se inclinar demais lateralmente?',
        consequence: 'Desequilíbrio causa queda da escada.',
        checkAction: 'Desça e reposicione a escada.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'alt_6',
        critico: true,
        text: 'Se for subir ao telhado ou à placa, considerou chamar um profissional especializado?',
        consequence: 'As quedas de telhados e de placas, ou quando a cobertura parte, costumam ser fatais.',
        checkAction: 'Contrate um técnico de telhados ou de caleiras especializado em vez de se arriscar.',
        options: [
          { label: 'Sim', safe: true },
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
    educational: {
      description: 'Misturar produtos de limpeza pode libertar gases venenosos invisíveis que queimam os pulmões. Use um produto de cada vez e mantenha a casa arejada.',
      keyPoints: [
        'NUNCA misture produtos de limpeza: só combine o que o rótulo autorizar.',
        'Lixívia com ácidos (vinagre, ácido clorídrico, produtos para tirar calcário) liberta cloro gasoso; com amoníaco ou álcool, outros gases tóxicos.',
        'Mantenha o ambiente super ventilado (janelas abertas).',
        'Use luvas de proteção para evitar dermatites e queimaduras.',
        'Não armazene produtos em garrafas de refrigerante (pet).'
      ]
    },
    questions: [
      {
        id: 'qui_1',
        critico: true,
        text: 'As janelas e portas da zona da limpeza estão abertas?',
        consequence: 'Acúmulo de vapores tóxicos em ambiente fechado.',
        checkAction: 'Abra tudo para o ar circular e se renovar.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_2',
        critico: true,
        text: 'Você está misturando produtos de limpeza?',
        consequence: 'Água sanitária + outros produtos gera cloro gasoso letal.',
        checkAction: 'Use um produto por vez. Enxágue antes do próximo.',
        options: [ { label: 'Não', safe: true }, { label: 'Sim', safe: false } ]
      },
      {
        id: 'qui_3',
        text: 'Está usando luvas de proteção?',
        consequence: 'A lixívia e os ácidos provocam dermatite e queimaduras químicas na pele.',
        checkAction: 'Use luvas de borracha antes de manusear.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_4',
        critico: true,
        text: 'As crianças e os animais estão longe da limpeza?',
        consequence: 'Respiram os vapores do chão ou podem beber a água suja do balde.',
        checkAction: 'Mantenha-os em outro cômodo durante a faxina.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_5',
        critico: true,
        text: 'Produtos estão em embalagens originais (não em garrafas PET)?',
        consequence: 'Guardar desinfetante ou lixívia numa garrafa de sumo provoca envenenamento acidental.',
        checkAction: 'Nunca transfira para garrafas de refrigerante.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_6',
        text: 'Piso molhado está sinalizado?',
        consequence: 'Escorregar no chão ensaboado provoca quedas perigosas.',
        checkAction: 'Use placa ou avise os moradores.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  }
];

export default RISK_CATEGORIES_PT;
