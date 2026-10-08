/**
 * radarConteudoDB.js
 * Banco de Fatos de Impacto, Protocolos em Destaque e Alertas Sazonais
 * Radar Vigilaro — conteúdo complementar para quebrar a monotonia do feed.
 */

// ─── FATOS DE IMPACTO (15 itens) ────────────────────────────────────────────

export const FATOS_IMPACTO = [
  {
    id: 'fi001',
    formato: 'fato',
    categoria: 'queda',
    perfil: 'geral',
    titulo: 'Quedas: 14 internações infantis por hora no Brasil',
    resumo: 'Em 2024, o Brasil registrou 121.933 internações de crianças por acidentes — uma média de 14 por hora. Quedas são a principal causa. Dados que mostram por que a prevenção não pode ser deixada para depois.',
    destaque: '14 internações por hora',
    fonte: 'Agência Brasil / SIH-SUS 2024',
    orientacoes: [
      'Quedas são evitáveis em mais de 80% dos casos com medidas simples de adaptação do ambiente.',
      'Tapetes, escadas sem corrimão e mobiliário instável são os três fatores mais presentes nos casos.',
      'Faça uma vistoria do ambiente mensalmente com o olhar focado em pontos de queda potencial.'
    ],
    icone: 'ChartBar',
    cor: '#F44336',
  },
  {
    id: 'fi002',
    formato: 'fato',
    categoria: 'afogamento',
    perfil: 'bebe',
    titulo: 'Afogamento é silencioso — não há gritos',
    resumo: 'Ao contrário do que mostram os filmes, o afogamento real é silencioso: a vítima fica com a cabeça para fora d\'água por poucos segundos, sem conseguir chamar socorro. Em crianças pequenas, o processo completo leva menos de 20 segundos.',
    destaque: 'Menos de 20 segundos',
    fonte: 'SBP — Protocolo de Segurança Aquática 2024',
    orientacoes: [
      'Supervisão ativa: ver, ouvir e estar ao alcance do braço da criança.',
      'Sistemas eletrônicos (alarme de piscina) não substituem supervisão humana.',
      'Aprenda o Resgate Básico de Afogamento: puxe a vítima pela roupa, nunca mergulhe sem equipamento.'
    ],
    icone: 'Drop',
    cor: '#2196F3',
  },
  {
    id: 'fi003',
    formato: 'fato',
    categoria: 'queda',
    perfil: 'idoso',
    titulo: '1 em cada 3 idosos cai pelo menos uma vez por ano',
    resumo: 'Dados do Ministério da Saúde (2023) mostram que 30% dos idosos brasileiros sofrem pelo menos uma queda por ano. Desses, 10% resultam em fratura — sendo o quadril a mais grave, com mortalidade de até 30% em 12 meses.',
    destaque: '1 em cada 3 idosos por ano',
    fonte: 'Ministério da Saúde — VIVA 2023',
    orientacoes: [
      'Barras de apoio no banheiro reduzem risco de queda em até 60%.',
      'Calçado antiderrapante em casa é tão importante quanto o remédio diário.',
      'Iluminação noturna em corredores é a medida de menor custo com maior impacto para idosos.'
    ],
    icone: 'Health',
    cor: '#FF9800',
  },
  {
    id: 'fi004',
    formato: 'fato',
    categoria: 'intoxicacao',
    perfil: 'crianca',
    titulo: '14.000 crianças intoxicadas por produtos domésticos por ano',
    resumo: 'O CIATOX Nacional registra mais de 14.000 intoxicações em crianças de 1 a 4 anos por produtos domésticos anualmente. Água sanitária, desinfetante e medicamentos são os protagonistas. A maioria acontece entre 18h e 22h, quando o cuidador está mais distraído.',
    destaque: '14.000 casos/ano apenas em menores de 4 anos',
    fonte: 'CIATOX Nacional / Ministério da Saúde 2024',
    orientacoes: [
      'O horário de maior risco é o fim da tarde: cuidadores cansados, crianças ativas.',
      'Produtos de limpeza fora do armário por "só um minuto" são os mais perigosos.',
      '{{POISON_CONTROL}} (24h, gratuito, todo o Brasil).'
    ],
    icone: 'Warning2',
    cor: '#9C27B0',
  },
  {
    id: 'fi005',
    formato: 'fato',
    categoria: 'queimadura',
    perfil: 'crianca',
    titulo: 'Pele do bebê queima em 2 segundos a 50°C',
    resumo: 'A pele de bebês é 5 vezes mais fina que a de adultos. Água a 50°C — temperatura de muitos chuveiros elétricos — causa queimadura de 2º grau em 2 segundos em bebês. No adulto, o mesmo dano levaria cerca de 2 minutos.',
    destaque: '2 segundos vs 2 minutos',
    fonte: 'SBP — Campanha Prevenção de Queimaduras 2024',
    orientacoes: [
      'Teste com o cotovelo, não com a mão — a mão é mais resistente ao calor.',
      'Temperatura ideal do banho: 37°C a 38°C. Use termômetro de banho.',
      'Ajuste o chuveiro elétrico para temperatura "morna" durante o banho do bebê.'
    ],
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'fi006',
    formato: 'fato',
    categoria: 'corpo_estranho',
    perfil: 'crianca',
    titulo: 'Pilha-botão destrói o esôfago em 2 horas',
    resumo: 'Uma pilha-botão ingerida libera corrente elétrica ao entrar em contato com a saliva, causando queimadura química no esôfago. Em 2 horas há risco de perfuração. Em 4 horas, o dano pode ser irreversível. Não espere sintomas para ir ao PS.',
    destaque: '2 horas para dano crítico',
    fonte: 'SBP / CIATOX — Protocolo Pilha-Botão 2024',
    orientacoes: [
      'Sintoma mais comum: salivação excessiva e recusa de alimentos. Mas muitos casos são assintomáticos no início.',
      'Vá imediatamente ao PS com a embalagem da pilha para identificar o tamanho.',
      'Após a remoção: criança necessita de acompanhamento por semanas. Siga o protocolo médico rigorosamente.'
    ],
    icone: 'Danger',
    cor: '#E91E63',
  },
  {
    id: 'fi007',
    formato: 'fato',
    categoria: 'pet',
    perfil: 'crianca',
    titulo: '60% das mordidas graves em crianças são do próprio cão da família',
    resumo: 'Pesquisa da SBP (2024) revelou que mais de 60% das mordidas graves em crianças são causadas pelo cão doméstico — aquele que "nunca fez isso antes". A região da cabeça é atingida em 77% dos casos, tornando as lesões especialmente graves.',
    destaque: '60% dos ataques vêm do cão da casa',
    fonte: 'SBP — Boletim de Segurança Infantil com Animais 2024',
    orientacoes: [
      'Histórico de docilidade não é garantia: qualquer cão pode atacar quando se sente ameaçado.',
      'Regra Zero: nunca cão e criança pequena sem adulto presente e atento.',
      'Gatilhos mais comuns: cão comendo, dormindo, com filhotes ou com dor.'
    ],
    icone: 'Danger',
    cor: '#795548',
  },
  {
    id: 'fi008',
    formato: 'fato',
    categoria: 'choque',
    perfil: 'bebe',
    titulo: 'Tomadas sem proteção: 400 atendimentos/mês em bebês',
    resumo: 'O CBMSP registra cerca de 400 atendimentos mensais por choque elétrico em crianças de 1 a 3 anos, a maioria por introdução de objetos em tomadas. A fase de exploração motora entre 10 e 24 meses coincide com o momento de maior vulnerabilidade.',
    destaque: '400 atendimentos por mês',
    fonte: 'CBMSP — Boletim Mensal de Urgências 2024',
    orientacoes: [
      'Protetor de tomada com trava giratória: item obrigatório em casas com bebês.',
      'Passagem rápida de inspeção no nível do chão identifica riscos com a perspectiva da criança.',
      'Troca por tomadas ABNT com proteção infantil embutida é a solução definitiva.'
    ],
    icone: 'Flash',
    cor: '#FFC107',
  },
  {
    id: 'fi009',
    formato: 'fato',
    categoria: 'engasgo',
    perfil: 'crianca',
    titulo: 'Uvas inteiras matam crianças menores de 5 anos',
    resumo: 'A uva está entre os 5 alimentos que mais causam morte por asfixia em crianças de 1 a 5 anos no mundo. Seu formato esférico e superfície lisa se encaixam perfeitamente na traqueia infantil, impedindo qualquer fluxo de ar. O corte adequado é o que salva vidas.',
    destaque: 'Uva está no top 5 de mortes por engasgo',
    fonte: 'American Academy of Pediatrics / SBP 2024',
    orientacoes: [
      'Corte sempre no sentido do comprimento (longitudinal), nunca em rodelas.',
      'Outros alimentos de risco: tomate cereja, azeitona, amendoim, balinhas redondas, salsichão.',
      'Crianças menores de 5 anos ainda não mastigam completamente — supervisão durante refeições é essencial.'
    ],
    icone: 'Danger',
    cor: '#E91E63',
  },
  {
    id: 'fi010',
    formato: 'fato',
    categoria: 'queda',
    perfil: 'crianca',
    titulo: 'Julho tem 21% mais acidentes infantis',
    resumo: 'O Ministério da Saúde registra crescimento de 21% nos acidentes infantis nas férias de julho. Mais tempo em casa, rotina diferente e acesso a ambientes menos monitorados pelos pais são os fatores. Piscinas, playgrounds e escadas lideram as ocorrências.',
    destaque: '+21% nas férias de julho',
    fonte: 'Ministério da Saúde / Agência Brasil 2024',
    orientacoes: [
      'Férias escolares = revisão das medidas de segurança em casa.',
      'Combinado de férias: explique às crianças as regras sobre piscina, sacada e cozinha.',
      'Mantenha o número do {{EMERGENCY_MEDICAL}} e Bombeiros (193) visível em casa.'
    ],
    icone: 'ChartBar',
    cor: '#F44336',
  },
  {
    id: 'fi011',
    formato: 'fato',
    categoria: 'queimadura',
    perfil: 'geral',
    titulo: 'Álcool líquido: 2.000 ocorrências de queimadura por ano no Brasil',
    resumo: 'O CBMSP estima mais de 2.000 ocorrências anuais de queimaduras por álcool líquido, sendo 40% em crianças e adolescentes. A chama do vapor é invisível e se propaga a distâncias de até 1 metro antes de ser percebida.',
    destaque: '2.000 queimaduras/ano por álcool líquido',
    fonte: 'CBMSP — Campanhas de Prevenção a Incêndio 2024',
    orientacoes: [
      'Substitua o álcool líquido pelo gel 70% para qualquer uso doméstico.',
      'Nunca use álcool — líquido ou gel — próximo a chamas acesas ou para acender fogões.',
      'Mantenha distância mínima de 3 metros ao acender churrasqueira ou fogueira.'
    ],
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'fi012',
    formato: 'fato',
    categoria: 'queda',
    perfil: 'crianca',
    titulo: '33.000 crianças internadas por quedas em 2023',
    resumo: 'Em 2023, mais de 33.000 crianças menores de 10 anos foram internadas por quedas no Brasil (SBP/SIH-SUS). A faixa entre 5 e 9 anos concentra o maior número — exatamente a idade em que as crianças ganham mais autonomia e menos supervisão direta.',
    destaque: '33.000 internações em 2023',
    fonte: 'SBP / SIH-SUS 2023',
    orientacoes: [
      'Autonomia crescente precisa ser acompanhada de orientação sobre riscos.',
      'Corrimão em escadas, piso antiderrapante e ausência de móveis próximos a janelas são os ajustes mais importantes.',
      'Revisite as medidas de segurança a cada aniversário — o risco muda conforme a criança cresce.'
    ],
    icone: 'ChartBar',
    cor: '#FF9800',
  },
  {
    id: 'fi013',
    formato: 'fato',
    categoria: 'esmagamento',
    perfil: 'bebe',
    titulo: '2.800 dedos presos em portas por ano no Brasil',
    resumo: 'Lesões dedos em portas representam 2.800 atendimentos anuais de urgência pediátrica no Brasil. Bebês entre 10 e 20 meses são os mais atingidos — fase em que exploram o ambiente se apoiando em tudo, incluindo batentes de portas.',
    destaque: '2.800 atendimentos/ano',
    fonte: 'SIH-SUS / Ministério da Saúde 2024',
    orientacoes: [
      'Protetor de batente de porta custa menos de R$10 e previne 100% das amputações por porta.',
      'Tanto o batente (onde a porta fecha) quanto a dobradiça (articulação) precisam de proteção.',
      'Implemente como rotina: antes de fechar qualquer porta, confirme onde está a criança.'
    ],
    icone: 'Home2',
    cor: '#607D8B',
  },
  {
    id: 'fi014',
    formato: 'fato',
    categoria: 'afogamento',
    perfil: 'crianca',
    titulo: 'Piscina com cerca de 1,5m reduz afogamentos em 80%',
    resumo: 'A SBP (2024) reforça que cercas de piscina com altura mínima de 1,5m, portão com fechamento automático e ausência de pontos de escalada reduzem em até 80% a incidência de afogamentos em crianças. Altura inferior ou cerca sem portão adequado têm eficácia próxima de zero.',
    destaque: 'Redução de 80% com cerca correta',
    fonte: 'SBP — Campanha Prevenção de Afogamento 2024',
    orientacoes: [
      'Altura mínima obrigatória: 1,5m (não 1,2m — essa medida antiga foi atualizada pela SBP).',
      'Portão deve ter fechamento automático tipo "mola" e abrir PARA FORA.',
      'Remova qualquer objeto ao redor da piscina que possa servir de degrau (caixas, cadeiras, vasos).'
    ],
    icone: 'Drop',
    cor: '#2196F3',
  },
  {
    id: 'fi015',
    formato: 'fato',
    categoria: 'intoxicacao',
    perfil: 'geral',
    titulo: '{{POISON_CONTROL}} — gratuito, 24 horas, todo o Brasil',
    resumo: 'O Centro de Informação e Assistência Toxicológica atende gratuitamente qualquer brasileiro 24 horas por dia. Ao ligar, tenha em mãos: o produto ou planta ingerida, o peso da vítima e a hora da ingestão. Essas informações aceleram a orientação e podem salvar vidas.',
    destaque: '{{POISON_CONTROL}}',
    fonte: 'CIATOX Nacional',
    orientacoes: [
      'Salve o número agora: {{POISON_CONTROL}}. Gratuito de qualquer telefone, inclusive celular.',
      'NUNCA induza vômito sem orientação do CIATOX — em alguns casos piora a lesão.',
      'Leve a embalagem do produto ao hospital — facilita o diagnóstico e o tratamento.'
    ],
    icone: 'Call',
    cor: '#2196F3',
  },
];

// ─── PROTOCOLOS EM DESTAQUE (8 itens) ────────────────────────────────────────

export const PROTOCOLOS_DESTAQUE = [
  {
    id: 'pr001',
    formato: 'protocolo',
    categoria: 'engasgo',
    perfil: 'geral',
    titulo: 'Manobra de Desengasgo — Protocolo 2025',
    resumo: 'As Diretrizes AHA 2025 mudaram a ordem do desengasgo. As pancadas entre as escápulas deixaram de ser alternativa e passaram a ser o PRIMEIRO passo, em qualquer idade — inclusive no adulto, onde antes se ia direto para o Heimlich.',
    orientacoes: [
      'Bebê (< 1 ano): alterne 5 pancadas firmes nas costas (cabeça mais baixa que o tronco) com 5 compressões no centro do peito usando a BASE DE UMA DAS MÃOS — não mais dois dedos. Compressão abdominal é proibida nessa idade.',
      'Criança (> 1 ano) e adulto: alterne 5 pancadas entre as escápulas, com a base da mão, com 5 compressões abdominais (Heimlich) logo acima do umbigo. Repita o ciclo até o objeto sair ou a pessoa perder a consciência.',
      'Gestante, ou quando não se consegue abraçar o abdômen: troque as compressões abdominais por 5 compressões no centro do peito.',
      'Se a pessoa perder a consciência, deite-a no chão, ligue para {{EMERGENCY_MEDICAL}} e inicie a RCP.'
    ],
    fonte: 'Diretrizes AHA 2025 de RCP e ACE (Circulation, 22/10/2025)',
    icone: 'Health',
    cor: '#E91E63',
  },
  {
    id: 'pr002',
    formato: 'protocolo',
    categoria: 'queimadura',
    perfil: 'geral',
    titulo: 'Primeiros socorros para queimaduras — o que NÃO fazer',
    resumo: 'Pasta de dente, manteiga, clara de ovo e álcool sobre queimaduras são mitos perigosos. A única primeira conduta correta é resfriar a área com água corrente fria (não gelada) por 10 a 20 minutos — e isso deve acontecer imediatamente.',
    orientacoes: [
      'Água corrente fria (não gelada) por 10 a 20 minutos. Não gelo — causa vasoconstrição e piora.',
      'NÃO aplicar: pasta de dente, manteiga, óleo, mel, curativo com algodão ou qualquer pomada caseira.',
      'Queimaduras maiores que a palma da mão, em face, genitais ou mãos: vá ao PS imediatamente após resfriar.'
    ],
    fonte: 'CBMSP / Sociedade Brasileira de Cirurgia Plástica 2024',
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'pr003',
    formato: 'protocolo',
    categoria: 'afogamento',
    perfil: 'geral',
    titulo: 'O que fazer ao resgatar afogado',
    resumo: 'Nunca entre na água sem equipamento para resgatar vítima de afogamento — o pavor faz a vítima se agarrar ao resgatante e ambos podem afundar. O resgate seguro deve ser feito com a vítima fora d\'água antes de iniciar os primeiros socorros.',
    orientacoes: [
      'Fora d\'água: chame o {{EMERGENCY_MEDICAL}} e Bombeiros (193) imediatamente.',
      'Não entre na água sem treinamento e equipamento. Use um objeto (corda, galho, isopor) para puxar a vítima.',
      'Se a vítima não respira: inicie a RCP (30 compressões + 2 ventilações) até a chegada do socorro.'
    ],
    fonte: 'CBMSP — Protocolo de Resgate Aquático 2024',
    icone: 'Drop',
    cor: '#2196F3',
  },
  {
    id: 'pr004',
    formato: 'protocolo',
    categoria: 'intoxicacao',
    perfil: 'geral',
    titulo: 'Suspeita de intoxicação — primeiros passos',
    resumo: 'Se houver suspeita de ingestão de produto tóxico, a primeira ligação deve ser para o {{POISON_CONTROL}}. Eles orientam sobre o que fazer — e o que NÃO fazer — com base no produto específico ingerido.',
    orientacoes: [
      'NUNCA induza vômito sem orientação do CIATOX. Em intoxicações com cáusticos (ácidos, água sanitária), piora as lesões.',
      'Tenha em mãos: produto exato, quantidade aproximada, peso da vítima, hora da ingestão.',
      '{{POISON_CONTROL}} (24h, gratuito). SAMU: 192 se a vítima estiver inconsciente ou com convulsão.'
    ],
    fonte: 'CIATOX Nacional / Ministério da Saúde 2024',
    icone: 'Warning2',
    cor: '#9C27B0',
  },
  {
    id: 'pr005',
    formato: 'protocolo',
    categoria: 'queda',
    perfil: 'idoso',
    titulo: 'Idoso caiu — o que fazer antes de mover',
    resumo: 'Mover um idoso que caiu sem avaliação prévia pode agravar fraturas — especialmente de quadril e coluna. A avaliação inicial deve vir antes de qualquer movimento.',
    orientacoes: [
      'Converse com a vítima: ela está consciente? Sente dor em algum ponto específico?',
      'Não mova se houver suspeita de fratura de quadril ou dor na coluna. Chame o {{EMERGENCY_MEDICAL}}.',
      'Se o idoso estiver consciente e sem dor: ajude-o a levantar apoiando pelos dois lados, nunca puxando pelo braço.'
    ],
    fonte: 'SBP / Sociedade Brasileira de Geriatria e Gerontologia 2024',
    icone: 'Health',
    cor: '#FF9800',
  },
  {
    id: 'pr006',
    formato: 'protocolo',
    categoria: 'choque',
    perfil: 'geral',
    titulo: 'Choque elétrico — como agir com segurança',
    resumo: 'Socorrer uma vítima de choque elétrico sem desligar a corrente pode eletrificar o socorrista. A primeira ação é sempre cortar a energia — não tocar na vítima antes disso.',
    orientacoes: [
      'Desligue o disjuntor ou o quadro de força ANTES de tocar na vítima. Nunca use objeto de metal para afastar a vítima do fio.',
      'Após desligar: verifique se a vítima respira. Se não, inicie RCP e chame o {{EMERGENCY_MEDICAL}}.',
      'Mesmo que a vítima pareça bem, leve ao médico — choques internos podem não ter sinal externo imediato.'
    ],
    fonte: 'CBMSP — Protocolo de Atendimento a Vítimas de Choque Elétrico 2024',
    icone: 'Flash',
    cor: '#FFC107',
  },
  {
    id: 'pr007',
    formato: 'protocolo',
    categoria: 'corpo_estranho',
    perfil: 'bebe',
    titulo: 'Pilha-botão ingerida — protocolo de emergência',
    resumo: 'Pilha-botão exige ida imediata ao PS — independente de sintomas. Não há como tratar em casa. O tempo de ação é crítico.',
    orientacoes: [
      'Vá diretamente ao PS mais próximo. Não espere sintomas — a lesão começa antes deles aparecerem.',
      'Leve a embalagem da pilha para identificar o tamanho (voltagem e diâmetro determinam o protocolo de remoção).',
      'NÃO ofereça comida ou água à criança. O estômago vazio facilita o procedimento de remoção.'
    ],
    fonte: 'SBP / Sociedade Brasileira de Endoscopia Digestiva 2024',
    icone: 'Danger',
    cor: '#E91E63',
  },
  {
    id: 'pr008',
    formato: 'protocolo',
    categoria: 'queda',
    perfil: 'crianca',
    titulo: 'Criança caiu na cabeça — quando ir ao PS',
    resumo: 'Nem toda queda com batida na cabeça exige ida ao pronto-socorro. Mas algumas situações são indiscutíveis. Aprenda a distinguir.',
    orientacoes: [
      'Vá ao PS imediatamente se: perda de consciência (mesmo breve), vômito mais de uma vez, crianças menores de 1 ano.',
      'Sinais de alerta nas 24h seguintes: dor de cabeça intensa crescente, sonolência excessiva, visão dupla, convulsão.',
      'Observe a criança por 24 horas após a queda, mesmo que pareça bem. Não a deixe dormir sem checar a cada 2 horas.'
    ],
    fonte: 'SBP / Academia Americana de Pediatria — Protocolo TBI 2024',
    icone: 'Health',
    cor: '#F44336',
  },
];

// ─── ALERTAS SAZONAIS (12 itens — 1 por mês) ─────────────────────────────────

export const ALERTAS_SAZONAIS = [
  {
    id: 'as_01',
    mes: 1, // Janeiro
    formato: 'sazonal',
    categoria: 'afogamento',
    titulo: 'Janeiro: pico de afogamentos infantis no Brasil',
    resumo: 'Janeiro concentra o maior número de afogamentos infantis do Brasil — coincidindo com férias de verão e uso intenso de piscinas. A SBP chama de "onda invisível": o risco aumenta mas a vigilância cai nas confraternizações.',
    orientacoes: [
      'Designe um "vigia de piscina" em confraternizações — um adulto com foco exclusivo nas crianças.',
      'Nenhum dispositivo eletrônico durante o turno de vigilância. Distrações matam.',
      'Crianças com boia ou colete salva-vidas ainda precisam de supervisão ativa.'
    ],
    icone: 'Drop',
    cor: '#2196F3',
  },
  {
    id: 'as_02',
    mes: 2, // Fevereiro
    formato: 'sazonal',
    categoria: 'queimadura',
    titulo: 'Fevereiro: cuidado com churrasqueiras e fogueiras no carnaval',
    resumo: 'O período de carnaval concentra registros de queimaduras por álcool em eventos ao ar livre. O relaxamento da atenção e o uso de álcool são os fatores agravantes.',
    orientacoes: [
      'Proibido álcool líquido (92%) para acender churrasqueira. Use somente carvão com acendedor sólido.',
      'Estabeleça perímetro de 3 metros ao redor de qualquer fogo. Crianças nunca ultrapassam esse limite.',
      'Roupas largas e sintéticas pegam fogo facilmente — prefira algodão em eventos com churrasco.'
    ],
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'as_03',
    mes: 3, // Março
    formato: 'sazonal',
    categoria: 'intoxicacao',
    titulo: 'Março: volta às aulas — temporada de mochila e remédios acessíveis',
    resumo: 'A volta às aulas traz mochilas pelo chão da casa com remédios, comprimidos e pilhas. Crianças menores que exploram o ambiente têm acesso fácil. Medicamentos na mochila de adultos são responsáveis por 12% das intoxicações em crianças.',
    orientacoes: [
      'Guarde mochilas em local alto ou trancado — nunca no chão acessível ao bebê.',
      'Revise conteúdo da mochila: remédios, pilhas, estilete e cola quente são comuns e perigosos.',
      'Estabeleça regra clara: mochila vai para o quarto do dono imediatamente ao chegar em casa.'
    ],
    icone: 'Warning2',
    cor: '#9C27B0',
  },
  {
    id: 'as_04',
    mes: 4, // Abril
    formato: 'sazonal',
    categoria: 'queda',
    titulo: 'Abril: temporada de chuva — pisos escorregadios dentro e fora',
    resumo: 'O aumento das chuvas em abril molha garagens, quintais e entradas de casa. Pisos lisos ficam traiçoeiros e quedas externas são subestimadas como risco.',
    orientacoes: [
      'Aplique tinta ou fita antiderrapante em rampas, degraus externos e garagem.',
      'Capacho na entrada da casa absorve umidade e evita que o interior fique molhado.',
      'Avise crianças sobre a mudança: pisos externos ficam escorregadios na chuva.'
    ],
    icone: 'Home2',
    cor: '#FF9800',
  },
  {
    id: 'as_05',
    mes: 5, // Maio
    formato: 'sazonal',
    categoria: 'choque',
    titulo: 'Maio: período de frio — aquecedores improvisados e risco de choque',
    resumo: 'No Sul e Sudeste, maio marca o início do uso de aquecedores elétricos. Dispositivos improvisados, resistências velhas e extensões sobrecarregadas são as principais causas de acidentes.',
    orientacoes: [
      'Nunca ligue aquecedor em extensão ou régua junto com outros aparelhos.',
      'Resistências com fio exposto, manchas ou cheiro de queimado devem ser descartadas.',
      'Mantenha aquecedor a no mínimo 1 metro de qualquer material inflamável (cortinas, roupas, camas).'
    ],
    icone: 'Flash',
    cor: '#FFC107',
  },
  {
    id: 'as_06',
    mes: 6, // Junho
    formato: 'sazonal',
    categoria: 'queimadura',
    titulo: 'Junho: festas juninas — fogueiras e perigo de queimadura',
    resumo: 'O mês das festas juninas reúne crianças e fogueiras sem proteção adequada. Roupas típicas com tecidos sintéticos amplificam o risco. O CBMSP registra pico de queimaduras em junho anualmente.',
    orientacoes: [
      'Tecidos sintéticos (poliéster, nylon) pegam fogo facilmente. Prefira algodão nas festas.',
      'Fogueiras devem ter cerca de proteção e adulto responsável exclusivo.',
      'Proibido balão de fogo em qualquer festa com crianças — além de ilegal, é altamente perigoso.'
    ],
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'as_07',
    mes: 7, // Julho
    formato: 'sazonal',
    categoria: 'queda',
    titulo: 'Julho: férias — 21% mais acidentes infantis',
    resumo: 'Julho concentra 21% a mais de acidentes infantis no Brasil. Rotina alterada, mais tempo em casa e acesso a ambientes menos monitorados são os fatores. Piscinas, escadas e playgrounds lideram as ocorrências.',
    orientacoes: [
      'Revise as medidas de segurança da casa antes das férias — não durante.',
      'Combine regras claras com as crianças sobre piscina, sacada e cozinha nas férias.',
      'Se visitar casa de familiares, faça uma inspeção rápida: tomadas, portões, piscina.'
    ],
    icone: 'Warning2',
    cor: '#F44336',
  },
  {
    id: 'as_08',
    mes: 8, // Agosto
    formato: 'sazonal',
    categoria: 'intoxicacao',
    titulo: 'Agosto: ventos fortes e plantas — alerta de intoxicação por ingestão',
    resumo: 'O vento de agosto derruba frutos e sementes de plantas ornamentais para áreas de quintal e jardim. Frutos caídos de plantas tóxicas como limoeiro ornamental, comigo-ninguém-pode e buxinho ficam ao nível do chão.',
    orientacoes: [
      'Após tempestades: inspecione o quintal antes de liberar crianças e pets.',
      'Conheça as plantas do seu quintal — verifique quais são tóxicas na lista do CIATOX.',
      'Frutos caídos no chão: recolha sempre que encontrar, mesmo que não seja da sua planta.'
    ],
    icone: 'Danger',
    cor: '#4CAF50',
  },
  {
    id: 'as_09',
    mes: 9, // Setembro
    formato: 'sazonal',
    categoria: 'afogamento',
    titulo: 'Setembro: ainda calor — atenção à piscina',
    resumo: 'Setembro estende o calor e o uso de piscinas nas regiões Centro-Oeste e Nordeste do Brasil. O risco de afogamento permanece elevado mesmo com o verão ainda distante.',
    orientacoes: [
      'Mantenha a rotina de segurança da piscina o ano inteiro — não só em janeiro.',
      'Crianças que fazem natação ainda precisam de supervisão. Habilidade não elimina o risco.',
      'Piscina inflável: esvazie após o uso. Uma piscina vazia nunca afoga ninguém.'
    ],
    icone: 'Drop',
    cor: '#2196F3',
  },
  {
    id: 'as_10',
    mes: 10, // Outubro
    formato: 'sazonal',
    categoria: 'choque',
    titulo: 'Outubro: mês das crianças — brinquedos com pilhas no foco',
    resumo: 'O Dia das Crianças em outubro intensifica a presença de brinquedos com pilhas — incluindo pilhas-botão. O pico de vendas de eletrônicos infantis está associado a aumento de casos de ingestão de pilhas.',
    orientacoes: [
      'Ao abrir brinquedos novos: cheque se há pilhas-botão e se os compartimentos têm parafuso.',
      'Tape com fita adesiva qualquer compartimento de pilha de brinquedo sem parafuso.',
      'Pilhas velhas retiradas de brinquedos: descarte imediatamente em coletor — nunca deixe sobre mesas.'
    ],
    icone: 'Danger',
    cor: '#E91E63',
  },
  {
    id: 'as_11',
    mes: 11, // Novembro
    formato: 'sazonal',
    categoria: 'queimadura',
    titulo: 'Novembro: calor intenso e fogos de artifício ilegais',
    resumo: 'Novembro antecede o Réveillon e o Natal, com aumento de fogos de artifício artesanais e ilegais em bairros populares. O CBMSP registra queimaduras graves — especialmente em mãos e rosto — em crianças e adolescentes.',
    orientacoes: [
      'Fogos artesanais e de farmacopeia são ilegais e extremamente perigosos. Nunca compre ou deixe crianças manusearem.',
      'Mesmo fogos legais devem ser manuseados apenas por adultos. Crianças assistem de longe.',
      'Em caso de queimadura por fogos: água corrente por 20 minutos e PS imediatamente.'
    ],
    icone: 'Flash',
    cor: '#FF5722',
  },
  {
    id: 'as_12',
    mes: 12, // Dezembro
    formato: 'sazonal',
    categoria: 'intoxicacao',
    titulo: 'Dezembro: decoração de Natal — plantas e enfeites tóxicos',
    resumo: 'A decoração natalina traz para dentro de casa plantas como Flor de Natal (Euphorbia pulcherrima), azevinho e frutas de plástico que imitam alimentos. Bebês e crianças pequenas são atraídos pelos enfeites coloridos e os colocam na boca.',
    orientacoes: [
      'Flor de Natal (Bico-de-papagaio): causa irritação intensa em boca e olhos. Mantenha fora do alcance de crianças e pets.',
      'Enfeites pequenos e bolas de árvore de natal são riscos de engasgo para crianças menores de 3 anos.',
      'Arvorezinhas de natal devem ficar em local alto ou cercado — nunca no nível do chão com crianças pequenas na casa.'
    ],
    icone: 'Danger',
    cor: '#4CAF50',
  },
];

export default { FATOS_IMPACTO, PROTOCOLOS_DESTAQUE, ALERTAS_SAZONAIS };
