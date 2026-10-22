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
      'Corte sempre no sentido do comprimento (longitudinal), nunca em rodelas. Lembre de descartar as sementes antes de entregar à criança.',
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
    titulo: 'Piscina com cercas de 1,5m reduz afogamentos em 80%',
    resumo: 'A SBP (2024) reforça que cercas de piscina com altura mínima de 1,5m, portão com fechamento automático e ausência de pontos de escalada reduzem em até 80% a incidência de afogamentos em crianças. Altura inferior ou cercas sem portão adequado têm eficácia próxima de zero.',
    destaque: 'Redução de 80% com cerca correta',
    fonte: 'SBP — Campanha Prevenção de Afogamento 2024',
    orientacoes: [
      'Altura mínima obrigatória: 1,5m (não 1,2m — essa medida antiga foi atualizada pela SBP).',
      'Portão deve ter fechamento automático tipo "mola" e abrir PARA FORA.',
      'Remova qualquer objeto ao redor das cercas que possa servir de degrau (caixas, cadeiras, vasos).'
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
    titulo_en: "Choking Rescue — 2025 Protocol",
    titulo_es: "Maniobra de Desatragantamiento — Protocolo 2025",
    titulo_ptpt: "Manobra de Desengasgo — Protocolo 2025",
    resumo_en: "The 2025 AHA Guidelines changed the order of choking rescue. Back blows between the shoulder blades are no longer an alternative: they are now the FIRST step at any age — including adults, where rescuers used to go straight to the Heimlich.",
    resumo_es: "Las Guías AHA 2025 cambiaron el orden de la maniobra. Los golpes entre los omóplatos dejaron de ser una alternativa y pasaron a ser el PRIMER paso a cualquier edad — también en el adulto, en quien antes se iba directo a la maniobra de Heimlich.",
    resumo_ptpt: "As Diretrizes AHA 2025 mudaram a ordem do desengasgo. As pancadas entre as omoplatas deixaram de ser alternativa e passaram a ser o PRIMEIRO passo, em qualquer idade — incluindo no adulto, em quem antes se ia diretamente para a manobra de Heimlich.",
    orientacoes_en: [
      "Baby (under 1): alternate 5 firm back blows (head lower than the body) with 5 chest thrusts in the centre of the chest using the HEEL OF ONE HAND — no longer two fingers. Abdominal thrusts are forbidden at this age.",
      "Child (over 1) and adult: alternate 5 back blows between the shoulder blades, with the heel of the hand, with 5 abdominal thrusts (Heimlich) just above the navel. Repeat until the object comes out or the person loses consciousness.",
      "Pregnant women, or when you cannot get your arms around the abdomen: replace the abdominal thrusts with 5 thrusts in the centre of the chest.",
      "If the person loses consciousness, lay them on the floor, call {{EMERGENCY_MEDICAL}} and start CPR."
    ],
    orientacoes_es: [
      "Bebé (menor de 1 año): alterne 5 golpes firmes en la espalda (cabeza más baja que el tronco) con 5 compresiones en el centro del pecho usando el TALÓN DE UNA MANO — ya no dos dedos. Las compresiones abdominales están prohibidas a esta edad.",
      "Niño (mayor de 1 año) y adulto: alterne 5 golpes entre los omóplatos, con el talón de la mano, con 5 compresiones abdominales (Heimlich) justo encima del ombligo. Repita hasta que salga el objeto o la persona pierda el conocimiento.",
      "Embarazadas, o cuando no se puede abrazar el abdomen: cambie las compresiones abdominales por 5 compresiones en el centro del pecho.",
      "Si la persona pierde el conocimiento, acuéstela en el suelo, llame a {{EMERGENCY_MEDICAL}} e inicie la RCP."
    ],
    orientacoes_ptpt: [
      "Bebé (menos de 1 ano): alterne 5 pancadas firmes nas costas (cabeça mais baixa que o tronco) com 5 compressões no centro do peito usando a BASE DE UMA DAS MÃOS — já não dois dedos. As compressões abdominais são proibidas nesta idade.",
      "Criança (mais de 1 ano) e adulto: alterne 5 pancadas entre as omoplatas, com a base da mão, com 5 compressões abdominais (Heimlich) logo acima do umbigo. Repita até o objeto sair ou a pessoa perder a consciência.",
      "Grávidas, ou quando não se consegue abraçar o abdómen: troque as compressões abdominais por 5 compressões no centro do peito.",
      "Se a pessoa perder a consciência, deite-a no chão, ligue para o {{EMERGENCY_MEDICAL}} e inicie a reanimação (SBV)."
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
      'Água corrente fria (não gelada) por 10 a 20 minutos. Não gelo, pois causa vasoconstrição e piora.',
      'NÃO aplicar: pasta de dente, manteiga, óleo, mel, curativo com algodão ou qualquer pomada caseira.',
      'Queimaduras maiores que a palma da mão, em face, genitais ou mãos: vá ao PS imediatamente após resfriar.'
    ],
    titulo_en: "Burn first aid — what NOT to do",
    titulo_es: "Primeros auxilios en quemaduras — lo que NO hay que hacer",
    titulo_ptpt: "Primeiros socorros em queimaduras — o que NÃO fazer",
    resumo_en: "Toothpaste, butter, egg white and alcohol on burns are dangerous myths. The only correct first step is to cool the area under cool (not ice-cold) running water for 10 to 20 minutes — and to do it straight away.",
    resumo_es: "Pasta de dientes, mantequilla, clara de huevo y alcohol sobre las quemaduras son mitos peligrosos. La única primera medida correcta es enfriar la zona con agua corriente fresca (no helada) durante 10 a 20 minutos — y de inmediato.",
    resumo_ptpt: "Pasta de dentes, manteiga, clara de ovo e álcool sobre queimaduras são mitos perigosos. A única primeira medida correta é arrefecer a zona com água corrente fresca (não gelada) durante 10 a 20 minutos — e de imediato.",
    orientacoes_en: [
      "Cool (not ice-cold) running water for 10 to 20 minutes. No ice: it constricts blood vessels and makes the burn worse.",
      "DO NOT apply toothpaste, butter, oil, honey, cotton-wool dressings or any home-made ointment.",
      "Burns larger than the palm of the hand, or on the face, genitals or hands: go to the emergency room right after cooling."
    ],
    orientacoes_es: [
      "Agua corriente fresca (no helada) durante 10 a 20 minutos. Nada de hielo: contrae los vasos y empeora la lesión.",
      "NO aplique pasta de dientes, mantequilla, aceite, miel, apósitos de algodón ni ninguna pomada casera.",
      "Quemaduras mayores que la palma de la mano, o en la cara, los genitales o las manos: vaya a urgencias justo después de enfriar."
    ],
    orientacoes_ptpt: [
      "Água corrente fresca (não gelada) durante 10 a 20 minutos. Gelo não: contrai os vasos e piora a lesão.",
      "NÃO aplicar: pasta de dentes, manteiga, óleo, mel, pensos com algodão ou qualquer pomada caseira.",
      "Queimaduras maiores do que a palma da mão, ou na face, genitais ou mãos: vá à urgência logo depois de arrefecer."
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
      'Fora d\'água: chame o {{EMERGENCY_MEDICAL}} e os Bombeiros ({{FIRE_NUMBER}}) imediatamente.',
      'Não entre na água sem treinamento e equipamento. Use um objeto (corda, galho, isopor) para puxar a vítima.',
      'Se a vítima não respira: inicie a RCP (30 compressões + 2 ventilações) até a chegada do socorro.'
    ],
    titulo_en: "What to do when rescuing a drowning person",
    titulo_es: "Qué hacer al rescatar a una persona que se ahoga",
    titulo_ptpt: "O que fazer ao resgatar uma vítima de afogamento",
    resumo_en: "Never go into the water without equipment to rescue a drowning person — panic makes the victim grab the rescuer and both can go under. The rescue must get the victim out of the water before first aid begins.",
    resumo_es: "Nunca entre al agua sin equipo para rescatar a una persona que se ahoga — el pánico hace que la víctima se aferre al rescatador y ambos pueden hundirse. El rescate debe sacar a la víctima del agua antes de iniciar los primeros auxilios.",
    resumo_ptpt: "Nunca entre na água sem equipamento para resgatar uma vítima de afogamento — o pânico faz a vítima agarrar-se a quem a socorre e ambos podem afundar. O resgate deve tirar a vítima da água antes de iniciar os primeiros socorros.",
    orientacoes_en: [
      "Out of the water: call {{EMERGENCY_MEDICAL}} and the fire service ({{FIRE_NUMBER}}) immediately.",
      "Do not go into the water without training and equipment. Use an object (rope, branch, float) to pull the victim in.",
      "If the victim is not breathing: start CPR (30 compressions + 2 breaths) until help arrives."
    ],
    orientacoes_es: [
      "Fuera del agua: llame de inmediato a {{EMERGENCY_MEDICAL}} y a los bomberos ({{FIRE_NUMBER}}).",
      "No entre al agua sin formación ni equipo. Use un objeto (cuerda, rama, flotador) para acercar a la víctima.",
      "Si la víctima no respira: inicie la RCP (30 compresiones + 2 ventilaciones) hasta que llegue la ayuda."
    ],
    orientacoes_ptpt: [
      "Fora de água: ligue de imediato para o {{EMERGENCY_MEDICAL}} e para os bombeiros ({{FIRE_NUMBER}}).",
      "Não entre na água sem formação e equipamento. Use um objeto (corda, ramo, boia) para puxar a vítima.",
      "Se a vítima não respira: inicie a reanimação (30 compressões + 2 insuflações) até à chegada do socorro."
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
      'NUNCA induza vômito sem orientação do centro de intoxicação. Em intoxicações com cáusticos (ácidos, água sanitária), piora as lesões.',
      'Tenha em mãos: produto exato, quantidade aproximada, peso da vítima, hora da ingestão.',
      'Ligue para o {{POISON_CONTROL}}. Se a vítima estiver inconsciente ou com convulsão: {{EMERGENCY_MEDICAL}}.'
    ],
    titulo_en: "Suspected poisoning — first steps",
    titulo_es: "Sospecha de intoxicación — primeros pasos",
    titulo_ptpt: "Suspeita de intoxicação — primeiros passos",
    resumo_en: "If you suspect someone swallowed a toxic product, your first call should be to {{POISON_CONTROL}}. They tell you what to do — and what NOT to do — for the specific product.",
    resumo_es: "Si sospecha que alguien ingirió un producto tóxico, la primera llamada debe ser a {{POISON_CONTROL}}. Le indicarán qué hacer — y qué NO hacer — según el producto concreto.",
    resumo_ptpt: "Se houver suspeita de ingestão de um produto tóxico, a primeira chamada deve ser para o {{POISON_CONTROL}}. Eles orientam sobre o que fazer — e o que NÃO fazer — conforme o produto.",
    orientacoes_en: [
      "NEVER induce vomiting without advice from the poison centre. With caustics (acids, bleach) it makes the injuries worse.",
      "Have to hand: the exact product, approximate amount, the person's weight and the time it was swallowed.",
      "Call {{POISON_CONTROL}}. If the person is unconscious or having a seizure: {{EMERGENCY_MEDICAL}}."
    ],
    orientacoes_es: [
      "NUNCA provoque el vómito sin indicación del centro de toxicología. Con cáusticos (ácidos, lejía) empeora las lesiones.",
      "Tenga a mano: el producto exacto, la cantidad aproximada, el peso de la persona y la hora de la ingestión.",
      "Llame a {{POISON_CONTROL}}. Si la persona está inconsciente o convulsionando: {{EMERGENCY_MEDICAL}}."
    ],
    orientacoes_ptpt: [
      "NUNCA provoque o vómito sem orientação do centro antivenenos. Com cáusticos (ácidos, lixívia) piora as lesões.",
      "Tenha à mão: o produto exato, a quantidade aproximada, o peso da vítima e a hora da ingestão.",
      "Ligue para o {{POISON_CONTROL}}. Se a vítima estiver inconsciente ou com convulsões: {{EMERGENCY_MEDICAL}}."
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
    titulo_en: "An older person has fallen — what to do before moving them",
    titulo_es: "Una persona mayor se cayó — qué hacer antes de moverla",
    titulo_ptpt: "Um idoso caiu — o que fazer antes de o mover",
    resumo_en: "Moving an older person who has fallen without checking first can worsen fractures — especially of the hip and spine. Assess before any movement.",
    resumo_es: "Mover a una persona mayor que se cayó sin evaluarla antes puede agravar fracturas — sobre todo de cadera y columna. La evaluación va antes de cualquier movimiento.",
    resumo_ptpt: "Mover um idoso que caiu sem avaliação prévia pode agravar fraturas — sobretudo da anca e da coluna. A avaliação vem antes de qualquer movimento.",
    orientacoes_en: [
      "Talk to them: are they conscious? Do they feel pain anywhere specific?",
      "Do not move them if a hip fracture or back pain is suspected. Call {{EMERGENCY_MEDICAL}}.",
      "If they are conscious and pain-free: help them up supporting them from both sides, never pulling by the arm."
    ],
    orientacoes_es: [
      "Hable con la persona: ¿está consciente? ¿Siente dolor en algún punto concreto?",
      "No la mueva si hay sospecha de fractura de cadera o dolor en la columna. Llame a {{EMERGENCY_MEDICAL}}.",
      "Si está consciente y sin dolor: ayúdela a levantarse sujetándola por ambos lados, nunca tirando del brazo."
    ],
    orientacoes_ptpt: [
      "Fale com a vítima: está consciente? Sente dor nalgum ponto específico?",
      "Não a mova se houver suspeita de fratura da anca ou dor na coluna. Ligue para o {{EMERGENCY_MEDICAL}}.",
      "Se o idoso estiver consciente e sem dor: ajude-o a levantar-se apoiando-o pelos dois lados, nunca puxando pelo braço."
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
      'Desligue o disjuntor ou o quadro de força ANTES de tocar na vítima. Nunca use objeto de metal para afastar o fio ou a vítima.',
      'Após desligar: verifique se a vítima respira. Se não, inicie RCP e chame o {{EMERGENCY_MEDICAL}}.',
      'Mesmo que a vítima pareça bem, leve ao médico — lesões internas causadas por choques elétricos podem não ter sinal externo imediato.'
    ],
    titulo_en: "Electric shock — how to help safely",
    titulo_es: "Descarga eléctrica — cómo actuar con seguridad",
    titulo_ptpt: "Choque elétrico — como agir com segurança",
    resumo_en: "Helping an electric-shock victim without cutting the power can electrocute the rescuer. The first action is always to cut the power — do not touch the victim before that.",
    resumo_es: "Socorrer a una víctima de descarga eléctrica sin cortar la corriente puede electrocutar al socorrista. La primera acción es siempre cortar la corriente — no toque a la víctima antes.",
    resumo_ptpt: "Socorrer uma vítima de choque elétrico sem desligar a corrente pode eletrocutar quem socorre. A primeira ação é sempre cortar a corrente — não tocar na vítima antes disso.",
    orientacoes_en: [
      "Switch off the breaker or the main panel BEFORE touching the victim. Never use a metal object to move the wire or the victim.",
      "Once the power is off: check whether the victim is breathing. If not, start CPR and call {{EMERGENCY_MEDICAL}}.",
      "Even if the victim seems fine, take them to a doctor — internal injuries from electric shock may show no immediate external sign."
    ],
    orientacoes_es: [
      "Corte el interruptor o el cuadro eléctrico ANTES de tocar a la víctima. Nunca use un objeto metálico para apartar el cable o a la víctima.",
      "Con la corriente cortada: compruebe si la víctima respira. Si no, inicie la RCP y llame a {{EMERGENCY_MEDICAL}}.",
      "Aunque la víctima parezca bien, llévela al médico — las lesiones internas por descarga eléctrica pueden no dar señales externas inmediatas."
    ],
    orientacoes_ptpt: [
      "Desligue o disjuntor ou o quadro elétrico ANTES de tocar na vítima. Nunca use um objeto de metal para afastar o fio ou a vítima.",
      "Depois de desligar: verifique se a vítima respira. Se não, inicie a reanimação e ligue para o {{EMERGENCY_MEDICAL}}.",
      "Mesmo que a vítima pareça bem, leve-a ao médico — as lesões internas por choque elétrico podem não ter sinal externo imediato."
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
    titulo_en: "Swallowed button battery — emergency protocol",
    titulo_es: "Pila de botón tragada — protocolo de urgencia",
    titulo_ptpt: "Pilha de botão engolida — protocolo de urgência",
    resumo_en: "A swallowed button battery means going straight to the emergency room — symptoms or not. It cannot be treated at home. Time is critical.",
    resumo_es: "Una pila de botón tragada exige ir de inmediato a urgencias — haya o no síntomas. No se puede tratar en casa. El tiempo es crítico.",
    resumo_ptpt: "Uma pilha de botão engolida exige ida imediata à urgência — com ou sem sintomas. Não se trata em casa. O tempo é crítico.",
    orientacoes_en: [
      "Go straight to the nearest emergency room. Do not wait for symptoms — the injury starts before they appear.",
      "Take the battery packaging to identify its size (voltage and diameter determine how it is removed).",
      "DO NOT give the child food or water. An empty stomach makes removal easier."
    ],
    orientacoes_es: [
      "Vaya directo a la urgencia más cercana. No espere síntomas — la lesión empieza antes de que aparezcan.",
      "Lleve el envase de la pila para identificar su tamaño (voltaje y diámetro determinan cómo se extrae).",
      "NO le dé comida ni agua al niño. El estómago vacío facilita la extracción."
    ],
    orientacoes_ptpt: [
      "Vá diretamente à urgência mais próxima. Não espere por sintomas — a lesão começa antes de eles aparecerem.",
      "Leve a embalagem da pilha para identificar o tamanho (voltagem e diâmetro determinam como é removida).",
      "NÃO dê comida nem água à criança. O estômago vazio facilita a remoção."
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
    resumo: 'Nem toda queda com impacto na cabeça exige ida ao pronto-socorro. Mas algumas situações são indiscutíveis. Aprenda a distinguir.',
    orientacoes: [
      'Vá ao PS imediatamente se: perda de consciência (mesmo breve), vômito mais de uma vez, crianças menores de 1 ano.',
      'Sinais de alerta nas 24h seguintes: dor de cabeça intensa crescente, sonolência excessiva, visão dupla, convulsão.',
      'Observe a criança por 24 horas após a queda, mesmo que pareça bem. Não a deixe dormir sem checar a cada 2 horas.'
    ],
    titulo_en: "A child hit their head — when to go to the emergency room",
    titulo_es: "El niño se golpeó la cabeza — cuándo ir a urgencias",
    titulo_ptpt: "A criança bateu com a cabeça — quando ir à urgência",
    resumo_en: "Not every fall with a bump to the head needs the emergency room. But some situations leave no doubt. Learn to tell them apart.",
    resumo_es: "No toda caída con golpe en la cabeza requiere urgencias. Pero algunas situaciones no admiten duda. Aprenda a distinguirlas.",
    resumo_ptpt: "Nem todas as quedas com pancada na cabeça exigem ida à urgência. Mas algumas situações não deixam dúvidas. Aprenda a distingui-las.",
    orientacoes_en: [
      "Go to the emergency room immediately if: any loss of consciousness (even brief), vomiting more than once, or the child is under 1 year old.",
      "Warning signs in the following 24 hours: worsening severe headache, excessive drowsiness, double vision, seizure.",
      "Watch the child for 24 hours after the fall, even if they seem fine. If they sleep, check on them every 2 hours."
    ],
    orientacoes_es: [
      "Vaya a urgencias de inmediato si: hubo pérdida de conocimiento (aunque sea breve), vómitos más de una vez, o el niño es menor de 1 año.",
      "Señales de alarma en las 24 horas siguientes: dolor de cabeza intenso y creciente, somnolencia excesiva, visión doble, convulsión.",
      "Observe al niño durante 24 horas después de la caída, aunque parezca bien. Si duerme, revíselo cada 2 horas."
    ],
    orientacoes_ptpt: [
      "Vá à urgência de imediato se: houve perda de consciência (mesmo breve), vómitos mais de uma vez, ou a criança tem menos de 1 ano.",
      "Sinais de alerta nas 24 horas seguintes: dor de cabeça intensa e crescente, sonolência excessiva, visão dupla, convulsão.",
      "Vigie a criança durante 24 horas após a queda, mesmo que pareça bem. Se dormir, verifique-a de 2 em 2 horas."
    ],
    fonte: 'SBP / Academia Americana de Pediatria — Protocolo TBI 2024',
    icone: 'Health',
    cor: '#F44336',
  },
];

// ─── ALERTAS SAZONAIS ────────────────────────────────────────────────────────
// Substituídos em 17/10/2026 (D17) pelo calendário por país, região e data em
// data/radarSazonal/ (ver services/RadarSazonalEngine.js). O conteúdo útil
// destes 12 alertas mensais — inclusive os textos revisados pelo Agnaldo
// (ED-0367, ED-0380, ED-0384) — foi migrado para data/radarSazonal/br.js.


export default { FATOS_IMPACTO, PROTOCOLOS_DESTAQUE };
