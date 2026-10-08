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
        'Para visitas de idosos, remova imediatamente tapetes soltos.',
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
        consequence: 'Quedas por desconhecimento do ambiente.',
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
        checkAction: "Cerque espelhos d'água e designe vigilante.",
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
        text: 'PCD tem acesso ao banheiro e áreas sociais sem barreiras?',
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
      description: 'Receber visitas exige adaptar a casa para quem não a conhece. Idosos e bebês têm necessidades de segurança específicas que podem não estar mapeadas no seu dia a dia.',
      keyPoints: [
        'Remova tapetes soltos para visitas de idosos.',
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
        checkAction: 'Instale protetores de tomada.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_5',
        critico: true,
        text: 'Produtos de limpeza e medicamentos estão trancados?',
        consequence: 'Intoxicação acidental é emergência frequente.',
        checkAction: 'Guarde em armário alto e trancado.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_6',
        critico: true,
        text: 'Banheiro tem apoio ou barra para idosos?',
        consequence: 'Quedas no banheiro podem ser fatais para idosos.',
        checkAction: 'Disponibilize cadeira ou barra provisória.',
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
        text: 'Visitante PCD tem acesso garantido ao banheiro e áreas comuns?',
        consequence: 'Portas estreitas, degraus e pisos irregulares impedem acesso seguro.',
        checkAction: 'Verifique acessibilidade e providencie rampas se necessário.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'vis_11',
        text: 'Idoso/PCD foi informado sobre desníveis, escadas e pisos da casa?',
        consequence: 'Ambiente desconhecido multiplica risco de queda.',
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
      description: '**O Risco Invisível:** Eletricidade não tem cheiro e não avisa. Uma "gambiarra" provisória frequentemente torna-se definitiva, e pregos ocultos no entulho causam perfurações graves.',
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
        consequence: 'Curiosidade infantil em obras é fatal.',
        checkAction: 'Use tapumes ou tranque as portas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'ref_2',
        text: 'Disjuntor da área é desligado ao final do dia?',
        consequence: 'Risco de incêndio noturno.',
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
        checkAction: 'Organize os fios e afaste de áreas molhadas.',
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
        checkAction: 'Não abra janelas sem proteção.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_2',
        critico: true,
        text: 'Móveis altos estão fixados na parede?',
        consequence: 'Tombamento de estantes sobre crianças.',
        checkAction: 'Instale kits anti-tombamento.',
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
        consequence: 'Curto-circuito e incêndio por fiação antiga.',
        checkAction: 'Teste os disjuntores e verifique sinais de aquecimento.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'mud_6',
        text: 'Crianças e pets estão supervisionados durante a mudança?',
        consequence: 'Ambiente desconhecido com portas, janelas e escadas abertas.',
        checkAction: 'Designe alguém exclusivamente para supervisão.',
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
      description: 'A supervisão ativa é a chave para prevenir acidentes infantis, seja no seu dia a dia ou em horas de lazer, visitação, viagens ou férias. Crianças não têm noção de perigo e são rápidas e imprevisíveis.',
      keyPoints: [
        'Nunca deixe bebês sozinhos em trocadores ou banheiras.',
        'Cozinha é área proibida durante o preparo de refeições.',
        'Remédios e produtos de limpeza devem ficar no alto e trancados.',
        'Telas de proteção são obrigatórias em janelas e sacadas.',
        'Cuidado com distrações digitais: Celulares, TV, Streamings, Filmes e Séries tiram o foco da supervisão de quem precisa de cuidados.'
      ]
    },
    questions: [
      {
        id: 'kid_1',
        critico: true,
        text: 'Você consegue ver a criança agora?',
        consequence: 'Segundos de distração bastam para um acidente grave.',
        checkAction: 'Mantenha contato visual constante.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_2',
        text: 'O celular está longe de você?',
        consequence: 'O celular é a maior causa de distração parental.',
        checkAction: 'Deixe o celular em outro cômodo.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_3',
        critico: true,
        text: 'Janelas e sacadas estão travadas ou com rede?',
        consequence: 'Quedas de altura são a principal causa de óbito infantil.',
        checkAction: 'Trave janelas e instale redes certificadas.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_4',
        critico: true,
        text: 'A cozinha está inacessível durante o preparo?',
        consequence: 'Queimaduras por líquidos quentes e panelas.',
        checkAction: 'Use portão de segurança ou mantenha a criança fora.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_5',
        critico: true,
        text: 'Medicamentos e produtos de limpeza estão trancados?',
        consequence: 'Intoxicação acidental é emergência frequente em menores de 5 anos.',
        checkAction: 'Guarde em armário alto com trava.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'kid_6',
        critico: true,
        text: 'Há objetos pequenos ao alcance (moedas, pilhas, peças)?',
        consequence: 'Engasgamento e ingestão de bateria são emergências.',
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
        consequence: 'Cadeiras viram facilmente.',
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
        checkAction: 'Chame alguém para ajudar.',
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
        consequence: 'Escada escorrega em piso molhado ou irregular.',
        checkAction: 'Seque o piso e use base antiderrapante.',
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
        text: 'Se for telhado/laje — avaliou chamar um profissional?',
        consequence: 'Quedas de telhado são frequentemente fatais.',
        checkAction: 'Considere contratar um profissional.',
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
    subtitle: 'Manuseio de Químicos',
    audience: [ 'adult' ],
    icon: 'bottle-tonic-skull',
    color: '#9C27B0',
    gradient: [ '#7B1FA2', '#E1BEE7' ],
    educational: {
      description: 'A mistura indevida de produtos de limpeza pode gerar gases tóxicos letais. Produtos devem estar em embalagens originais.',
      keyPoints: [
        'NUNCA misture água sanitária com outros produtos: amônia, vinagre, detergente multiuso, ácido muriático ou qualquer outro produto de limpeza.',
        'A mistura mais perigosa e mais comum: lixívia + detergente. Gera cloro gasoso que pode causar paragem respiratória em ambiente fechado. (Fonte: CIATOX/ANVISA, Brasil)',
        'Mantenha o ambiente super ventilado (janelas abertas).',
        'Use luvas de proteção para evitar dermatites e queimaduras.',
        'Não armazene produtos em garrafas de refrigerante (pet).'
      ]
    },
    questions: [
      {
        id: 'qui_1',
        critico: true,
        text: 'As janelas e portas estão abertas?',
        consequence: 'Acúmulo de vapores tóxicos em ambiente fechado.',
        checkAction: 'Abra tudo para ventilar.',
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
        consequence: 'Dermatites e queimaduras químicas nas mãos.',
        checkAction: 'Use luvas de borracha antes de manusear.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_4',
        critico: true,
        text: 'Crianças e pets estão fora do ambiente?',
        consequence: 'Inalação de vapores e contato com produtos.',
        checkAction: 'Mantenha-os em outro cômodo durante a faxina.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_5',
        critico: true,
        text: 'Produtos estão em embalagens originais (não em garrafas PET)?',
        consequence: 'Ingestão acidental por confusão com bebida.',
        checkAction: 'Nunca transfira para garrafas de refrigerante.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      },
      {
        id: 'qui_6',
        text: 'Piso molhado está sinalizado?',
        consequence: 'Quedas por escorregão durante a limpeza.',
        checkAction: 'Use placa ou avise os moradores.',
        options: [ { label: 'Sim', safe: true }, { label: 'Não', safe: false } ]
      }
    ]
  }
];

export default RISK_CATEGORIES_PT;
