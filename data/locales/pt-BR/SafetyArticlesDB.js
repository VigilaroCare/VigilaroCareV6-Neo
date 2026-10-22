/**
 * SafetyArticlesDB.js
 * Banco de Dados de Artigos de Segurança Doméstica
 * Estrutura: id, categoryId, title, summary, content (markdown), tags, source (opcional)
 */

export const SAFETY_ARTICLES_PT_BR = [
    // --- 📂 INCÊNDIO E ELETRICIDADE ---
    {
        id: 'prevencao_incendio_geral',
        categoryId: 'fire_prevention',
        title: 'Como Evitar Incêndios Domésticos',
        summary: 'Muitos incêndios começam com um pequeno descuido. Aprenda a proteger sua casa.',
        content: `
# Prevenção de Incêndios

Muitas vezes, um incêndio devastador começa com um detalhe bobo que poderia ser evitado em segundos. Ficar atento no dia a dia é a melhor defesa.

### Onde moram os maiores perigos e como evitar:
*   **Velas:** Nunca deixe velas acesas sozinhas em um cômodo, nem perto de cortinas ou lençóis. Use sempre suportes firmes e pesados.
*   **Cozinha:** Óleo quente pega fogo muito rápido. Se a panela começar a queimar, **NUNCA jogue água** — isso causa uma explosão de vapor perigosíssima. Desligue o fogão e abafe a panela com a própria tampa ou com um pano bem úmido.
*   **Cigarro:** Evite fumar na cama ou quando estiver com muito sono no sofá. É fácil cochilar e iniciar um incêndio no colchão.
*   **Sobrecarga Elétrica:** Não ligue secador de cabelo, ferro de passar e aquecedor na mesma tomada usando benjamins ou adaptadores (T).
*   **Gás de Cozinha:** Sentiu cheiro de gás? Não ligue luzes, não aperte tomadas e nem risque fósforos. Abra imediatamente as janelas e feche o registro do botijão.
        `,
        tags: ['fogo', 'emergencia', 'casa']
    },
    {
        id: 'decoracao_natal',
        categoryId: 'fire_prevention',
        title: 'Decoração de Natal Segura',
        summary: 'Pisca-piscas e árvores de natal exigem cuidados simples para evitar acidentes.',
        content: `
# Natal Seguro

Luzes improvisadas e fios velhos aumentam o risco de curto-circuito no fim do ano. Curta as festas sem preocupações.

### Dicas essenciais:
*   **Pisca-Pisca:** Veja se os fios não estão desencapados ou emendados antes de pendurar. Prefira luzes de LED, que esquentam bem menos, e dê prioridade a produtos com {{CERT_SEAL}}.
*   **Desligue ao Sair:** Não deixe as luzes da árvore ligadas se não houver ninguém em casa ou quando for dormir.
*   **Árvore:** Mantenha a árvore longe de cortinas, sofás e velas acesas.
*   **Tomadas:** Evite ligar todas as decorações na mesma tomada. Filtros de linha com fusível ajudam a proteger contra sobrecarga.
        `,
        tags: ['natal', 'eletricidade', 'feriados']
    },
    {
        id: 'churrasco_seguro',
        categoryId: 'fire_prevention',
        title: 'Churrasco com Segurança',
        summary: 'Evite o uso de álcool líquido e previna acidentes com churrasqueiras.',
        content: `
# Churrasco sem Acidentes

Reunir a família é ótimo, mas acender a churrasqueira exige cuidado e atenção.

### Regras de ouro para evitar acidentes:
*   **Álcool Líquido:** Não use! O álcool líquido evapora rápido, gera gases explosivos e o fogo pode subir direto para a garrafa na sua mão. Prefira acendedores em gel, pastilhas sólidas ou acendedor elétrico.
*   **Crianças Longe:** Mantenha crianças e pets a pelo menos 1 metro de distância da churrasqueira.
*   **Local:** Nunca faça churrasco em garagens fechadas ou cômodos sem ventilação. Isso evita acúmulo de fumaça e intoxicação por monóxido de carbono.
*   **Facas:** Guarde as facas de churrasco em local alto e seguro logo após terminar de usá-las.
        `,
        tags: ['lazer', 'fogo', 'cozinha']
    },
    {
        id: 'choque_eletrico',
        categoryId: 'riscos_fisicos',
        title: 'Choques Elétricos: Prevenção e Ação',
        summary: 'Fiações antigas e improvisações são perigosas. Saiba o que fazer.',
        content: `
# Choques Elétricos: Perigo Invisível

A eletricidade é silenciosa e invisível. O perigo real só aparece quando o acidente já aconteceu.

### Como se prevenir:
*   **Manutenção:** Fios descascados, tomadas com marcas pretas de queimado ou disjuntores que desarmam constantemente indicam problemas graves. Chame um eletricista.
*   **Água e Eletricidade:** Nunca mexa em aparelhos elétricos, tomadas ou disjuntores se estiver com as mãos molhadas ou pisando em chão úmido.
*   **Protetores de Tomada:** São indispensáveis se você tiver crianças pequenas ou pets curiosos em casa.

### Se alguém levar um choque:
1.  **NÃO toque na pessoa** enquanto ela estiver em contato com a tomada ou fio. Você também levará o choque.
2.  **Desligue a energia:** Corra para o quadro de luz e desligue o disjuntor geral.
3.  **Afaste a fonte:** Se não der para desligar, use um objeto de madeira ou plástico seco (como um cabo de vassoura seco) para empurrar o fio longe da pessoa.
4.  **Chame socorro:** Ligue para o {{EMERGENCY_MEDICAL}}.
        `,
        tags: ['eletricidade', 'primeiros_socorros', 'manutencao']
    },

    // --- 📂 PRODUTOS E QUÍMICOS ---
    {
        id: 'produtos_limpeza',
        categoryId: 'produtos_perigosos',
        title: 'Produtos de Limpeza e Risco Químico',
        summary: 'Como guardar produtos de limpeza para evitar acidentes e intoxicações.',
        content: `
# Produtos de Limpeza e Segurança

Produtos coloridos e perfumados parecem suco ou refrigerante para as crianças. A curiosidade natural delas pode gerar acidentes graves com produtos químicos.

### Como evitar acidentes:
*   **Guarde no Alto:** Mantenha desinfetantes, cloro, sabão e outros produtos químicos em armários altos, acima de 1,5 metro, de preferência com travas.
*   **Embalagem Original:** Nunca coloque cloro ou desinfetante em garrafas de refrigerante ou potes de comida. Guarde-os sempre nas embalagens de fábrica com rótulo legível.
*   **Sem Misturas:** Não misture produtos de limpeza (como água sanitária e vinagre). Essas misturas soltam vapores tóxicos que podem queimar as vias respiratórias.

### Se acontecer um acidente:
Não provoque vômito de jeito nenhum, pois o produto químico pode queimar a garganta na ida e na volta. Ligue imediatamente para o {{POISON_CONTROL}} ou chame o {{EMERGENCY_MEDICAL}} segurando a embalagem do produto para ler os componentes para o médico.
        `,
        tags: ['veneno', 'quimica', 'crianca']
    },
    {
        id: 'intoxicacao_medicamentos',
        categoryId: 'produtos_perigosos',
        title: 'Intoxicação por Medicamentos',
        summary: 'Medicamentos coloridos parecem balas. Saiba como evitar a ingestão acidental.',
        content: `
# Medicamentos Longe das Crianças

Remédios coloridos parecem doces para as crianças. A intoxicação por medicamentos é uma das principais causas de envenenamento infantil no Brasil.

### Dicas de segurança:
*   **Gavetas Trancadas:** Remédios devem ficar em caixas organizadoras fechadas, em prateleiras altas e trancadas.
*   **Fale a Verdade:** Nunca diga que o remédio é "balinha", "doce" ou "suquinho" para convencer a criança a tomar. Diga que é um remédio que vai fazê-la sarar.
*   **Dosagem Correta:** Use sempre a seringa ou copinho medidor que veio com o xarope. Colheres de cozinha comuns têm tamanhos muito variados.
        `,
        tags: ['medicamentos', 'saude', 'crianca']
    },

    // --- 📂 AMBIENTES e GERAIS ---
    {
        id: 'seguranca_cozinha',
        categoryId: 'seguranca_ambiente',
        title: 'Boas Práticas na Cozinha',
        summary: 'A cozinha é o local da casa com mais riscos. Saiba como evitar acidentes.',
        content: `
# Segurança na Cozinha

Cortes, queimaduras e tombos na cozinha podem ser evitados com pequenas mudanças na rotina.

### Dicas para o dia a dia:
1.  **Facas Afiadas:** Facas cegas exigem mais força na hora de cortar, facilitando escorregões que causam cortes. Mantenha as facas afiadas e guardadas em local seguro.
2.  **Panela de Pressão:** Cheque se a válvula de escape não está entupida antes de usar. Só tente abrir a panela depois que todo o vapor sair completamente. Troque a borracha de vedação assim que ela começar a ressecar.
3.  **Chão Seco:** Se cair água ou óleo no piso, limpe imediatamente para evitar escorregões perigosos.
4.  **Panos de Prato:** Não deixe panos de prato ou toalhas pendurados perto do fogão quando estiver cozinhando.
5.  **Micro-ondas:** Cuidado ao retirar pratos quentes. O vapor que sai ao abrir tampas ou sacos de pipoca pode causar queimaduras graves.
        `,
        tags: ['cozinha', 'casa', 'fogo']
    },
    {
        id: 'redes_protecao',
        categoryId: 'seguranca_ambiente',
        title: 'Redes de Proteção para Janelas',
        summary: 'Indispensável para quem mora em apartamento com crianças ou animais.',
        content: `
# Redes de Proteção

Se você mora em apartamento ou sobrado, a instalação de redes de proteção nas janelas e sacadas é indispensável.

### O que você precisa saber:
*   **Qualidade:** Escolha redes que sigam as normas técnicas (ABNT NBR 16046). Os ganchos devem ser de aço bem fixados.
*   **Malhas Menores:** Para lares com gatos ou crianças muito pequenas, use malhas menores (3x3 cm ou 5x5 cm).
*   **Móveis Longe:** Afaste camas, sofás, cadeiras e vasos das janelas para que as crianças não os usem como escada.
*   **Validade:** A exposição ao sol e à chuva desgasta as redes. Cheque o estado dos fios a cada 3 anos e troque se estiverem ressecados.
        `,
        tags: ['janelas', 'crianca', 'pets', 'reforma']
    },
    {
        id: 'plantas_toxicas',
        categoryId: 'plantas',
        title: 'Plantas Tóxicas em Casa',
        summary: 'Conheça as plantas ornamentais que podem envenenar pets e crianças.',
        content: `
# Plantas Tóxicas Comuns

Muitas plantas bonitas e populares no Brasil escondem substâncias venenosas se forem ingeridas ou tocadas.

### Espécies perigosas e seus efeitos:
*   **Comigo-Ninguém-Pode:** Muito tóxica. Causa inchaço imediato na boca e na garganta, gerando dor intensa e dificuldade de respirar.
*   **Costela-de-Adão:** Possui cristais que irritam as mucosas da boca e do estômago.
*   **Bico-de-Papagaio:** A seiva leitosa da planta causa irritação na pele e nos olhos.
*   **Espirradeira:** Altamente tóxica. Pode afetar o ritmo do coração.
*   **Lírio:** É extremamente perigoso para gatos, podendo causar falência renal rápida com apenas algumas mordidas na folha.

**Conselho:** Se você tem crianças ou bichos de estimação em casa, prefira espécies seguras como orquídeas, lavanda, bromélias ou samambaias. Se tiver espécies tóxicas, mantenha-as em prateleiras altas e fora de alcance.
        `,
        tags: ['plantas', 'natureza', 'pets']
    },
    {
        id: 'animais_peconhentos',
        categoryId: 'animais',
        title: 'Animais Peçonhentos: Prevenção e Socorro',
        summary: 'Saiba como agir em caso de picadas de cobras, aranhas ou escorpiões.',
        content: `
# Animais Peçonhentos

Acidentes com escorpiões, aranhas e cobras são mais comuns no calor, em épocas de chuvas ou próximos de áreas com vegetação.

### Como evitar esses animais em casa:
*   **Limpeza:** Não acumule entulho, telhas ou madeira no quintal.
*   **Frestas:** Coloque rodinhos de vedação nas portas e telas nos ralos do banheiro e da lavanderia.
*   **Sapatos:** Crie o hábito de sacudir tênis e sapatos antes de calçar. Escorpiões adoram cantos escuros e apertados.

### Se alguém for picado:
*   Lave o local com água corrente e sabão neutro.
*   Deixe a pessoa em repouso com o membro elevado. O movimento rápido ajuda o veneno a circular mais rápido.
*   Vá direto para o hospital. Se for seguro, tire uma foto do animal para que os médicos saibam qual soro aplicar.
*   **NÃO** faça torniquetes, **NÃO** tente cortar o local e **NÃO** chupe o veneno.
        `,
        tags: ['animais', 'primeiros_socorros', 'emergencia']
    },
    {
        id: 'kit_emergencia_montagem',
        categoryId: 'kits_emergencia',
        title: 'Kit de Primeiros Socorros Doméstico',
        summary: 'O que não pode faltar na sua caixinha de primeiros socorros em casa.',
        content: `
# Kit de Primeiros Socorros Básico

Ter uma caixinha com itens básicos de saúde em casa evita correria e pânico na hora de um pequeno corte ou queda.

### O que colocar na caixinha:
1.  **Curativos:** Gaze estéril, esparadrapo antialérgico, band-aids de vários tamanhos e ataduras.
2.  **Higiene:** Soro fisiológico (frascos pequenos), sabonete líquido neutro e um antisséptico suave.
3.  **Ferramentas:** Uma tesoura pequena sem ponta, uma pinça limpa (ótima para tirar farpas de madeira) e um termômetro.
4.  **Básicos:** Luvas descartáveis de procedimento e uma bolsa térmica em gel (para compressas frias em pancadas).

*Dica:* Dê uma olhada na validade dos itens e pomadas a cada seis meses e troque o que estiver vencido.
        `,
        tags: ['kit', 'emergencia', 'saude']
    },
    {
        id: 'escolha_pet',
        categoryId: 'pets',
        title: 'Escolhendo o Pet com Segurança',
        summary: 'Como escolher o bicho de estimação ideal considerando o espaço e a rotina da casa.',
        content: `
# Pet Seguro, Família Feliz

Trazer um bicho de estimação para casa traz muita alegria, mas exige adaptar o lar para garantir a segurança de todos.

### O que considerar na escolha:
*   **Espaço e Energia:** Cães muito ativos em apartamentos pequenos podem ficar estressados e ter problemas de comportamento. Avalie a necessidade de passeios diários de cada raça.
*   **Crianças Pequenas:** Se tiver crianças em casa, dê preferência a cães com temperamento dócil e paciente. Filhotes muito pequenos ou raças frágeis podem se machucar em brincadeiras brutas.
*   **Alergias:** Se alguém na casa tem asma ou rinite forte, converse com um médico antes de adotar. Aves, peixes ou espécies que soltam menos pelos podem ser boas opções.

### Adaptando a casa:
Instale telas de proteção nas janelas se tiver gatos. Guarde fios elétricos e carregadores de celular, pois filhotes roem tudo o que encontram no chão.
        `,
        tags: ['pets', 'animais', 'adocao']
    },
    {
        id: 'mordida_animal',
        categoryId: 'pets',
        title: 'Mordida de Animal: Como Agir',
        summary: 'Primeiros socorros em caso de mordidas ou arranhões de cães e gatos.',
        content: `
# Mordida de Animal: Primeiros Socorros

Arranhões ou mordidas de animais podem parecer pequenos, mas a boca deles contém bactérias que transmitem infecções graves e doenças como a Raiva.

### O que fazer na hora:
1.  **Lave muito bem:** Coloque o ferimento embaixo de água corrente e lave com bastante sabão neutro por pelo menos **15 minutos**. Isso limpa a saliva e reduz drasticamente o risco de vírus.
2.  **Não invente:** Não coloque pó de café, pomadas ou remédios caseiros sobre o corte.
3.  **Vá ao médico:** Toda mordida que ferir a pele deve ser avaliada em um pronto-socorro para decidir se há necessidade de vacina ou soro antirrábico e antitetânico.
4.  **Observe o animal:** Se o animal for de rua, avise o centro de controle de zoonoses. Se for o bicho de um conhecido, pergunte sobre a carteira de vacinação dele e o observe por 10 dias.
        `,
        tags: ['primeiros_socorros', 'pets', 'emergencia']
    },
    {
        id: 'animais_peconhentos_socorro',
        categoryId: 'animais_perigosos',
        title: 'Diferença entre Peçonhentos e Venenosos',
        summary: 'Aprenda a diferenciar acidentes com animais peçonhentos de envenenamentos.',
        content: `
# Peçonhentos ou Venenosos?

Existe uma diferença importante na forma como esses animais atacam, e entender isso ajuda na prevenção:
* **Peçonhentos**: São os que têm dentes, ferrões ou agulhas para injetar veneno ativamente (cobras coral/jararaca, escorpiões, aranhas).
* **Venenosos**: Não têm ferrão. Eles causam envenenamento se você tocá-los ou engoli-los (lagartas de fogo, alguns sapos, plantas).

### Primeiros Socorros Gerais:
1. **Calma:** O descontrole emocional faz o coração bater mais forte, espalhando as toxinas mais rapidamente pelo sangue.
2. **Água e sabão:** Lave apenas com água e sabão no local.
3. **Membro elevado:** Mantenha o braço ou perna picada mais alto que o resto do corpo.
4. **Socorro Médico:** Vá direto para o hospital de referência mais próximo. Não perca tempo tentando extrair o veneno em casa.
        `,
        tags: ['animais', 'primeiros_socorros', 'veneno', 'emergencia']
    },
    {
        id: 'choques_eletricos_prevencao',
        categoryId: 'manutencao_casa',
        title: 'Choques Elétricos: Como Evitar',
        summary: 'Dicas práticas para prevenir choques elétricos durante reparos na casa.',
        content: `
# Prevenindo Choques Elétricos

Um choque elétrico pode parecer um formigamento bobo, mas tem potencial para causar queimaduras internas e arritmia cardíaca. A segurança na fiação deve ser levada a sério.

### Cuidados essenciais:
* **Fiação em Ordem:** Não faça emendas com fita isolante comum em fios desgastados. Troque fios danificados por inteiro.
* **Desligue o Disjuntor:** Vai trocar uma lâmpada ou limpar um lustre? Desligue a chave geral ou o disjuntor daquele cômodo antes.
* **Corpo Seco:** Nunca use aparelhos elétricos (como secador ou barbeador) descalço em pisos úmidos ou logo após sair do banho.
* **Chapeuzinho de Tomada:** Mantenha tomadas baixas tampadas se tiver bebês ou pets que andam pelo chão.
        `,
        tags: ['elétrica', 'manutenção', 'choque', 'primeiros_socorros']
    },
    {
        id: 'panela_pressao',
        categoryId: 'cozinha_segura',
        title: 'Panela de Pressão sem Medo',
        summary: 'Aprenda a usar a panela de pressão com segurança e evite acidentes graves.',
        content: `
# Panela de Pressão: Uso Seguro

A panela de pressão economiza gás e tempo, mas exige respeito. Acidentes com explosão são assustadores, mas, na maioria das vezes, evitáveis.

### Manual prático de uso:
* **Limite de Espaço:** Nunca encha a panela de água até a boca. Deixe sempre um terço livre para o acúmulo de vapor.
* **Pino Desobstruído:** Antes de fechar a tampa, olhe contra a luz para conferir se o buraquinho do pino (válvula) não está entupido com cascas ou gordura de cozimentos anteriores.
* **Borracha Limpa:** Veja se a borracha de vedação não está rachada ou frouxa. Troque a borracha quando estiver ressecada, rachada ou frouxa, ou no prazo que o fabricante indicar.
* **Espere a Pressão Sair:** Nunca force a abertura da tampa. Só tente abrir quando o chiado parar de vez e o pino abaixar por completo.

*Sinal de Alerta:* Se a panela parar de chiar do nada com o fogo ligado, desligue o fogão imediatamente. O pino pode ter entupido, gerando risco de explosão.
        `,
        tags: ['cozinha', 'segurança', 'panela_pressao', 'dicas_casa']
    },
    {
        id: 'seguranca_cozinha_praticas',
        categoryId: 'cozinha_segura',
        title: '10 Regras Rápidas de Segurança na Cozinha',
        summary: 'Checklist com 10 dicas simples de prevenção de acidentes na cozinha.',
        content: `
# 10 Regras na Cozinha

A cozinha concentra a maior parte dos acidentes domésticos. Proteja-se com essas dicas rápidas:

1. **Cabos para Dentro:** Vire os cabos das panelas para o lado de dentro do fogão para ninguém esbarrar e derrubar.
2. **Facas Guardadas:** Guarde facas e cortadores logo após o uso. Lembre-se: faca cega é mais perigosa porque exige força e escorrega com facilidade.
3. **Sem Panos no Fogo:** Nunca deixe panos de prato ou luvas de tecido muito perto do fogão.
4. **Piso Seco:** Limpe gordura ou respingos de água no chão imediatamente.
5. **Embalagens Originais:** Nunca guarde veneno de rato ou inseticida em garrafas de refrigerante na despensa.
6. **Micro-ondas:** Cuidado com o vapor quente ao abrir potes plásticos ou sacos de pipoca.
7. **Crianças Longe:** Mantenha crianças longe do fogão enquanto cozinha. Defina um limite visual.
8. **Vazamento de Gás:** Sentiu cheiro de gás? Não acenda luzes. Abra as janelas e feche o registro do botijão.
9. **Fogo no Óleo:** Se o óleo pegar fogo, nunca jogue água. Abafe com uma tampa ou com um pano úmido bem torcido (nunca encharcado).
10. **Atenção Plena:** Evite cozinhar se estiver com muito sono ou sob efeito de remédios que dão tontura.
        `,
        tags: ['cozinha', 'segurança', 'dicas', 'fogo']
    },
    {
        id: 'redes_protecao_sacadas',
        categoryId: 'manutencao_casa',
        title: 'Redes em Janelas e Varandas',
        summary: 'Onde instalar e como verificar a segurança das redes contra quedas.',
        content: `
# Redes de Proteção: Janelas e Sacadas

Se você mora em apartamento ou casa com mais de um andar, as redes de proteção são a única barreira física realmente eficaz contra quedas graves.

### Onde a proteção é obrigatória:
* Janelas de quartos e salas.
* Sacadas, varandas e mezaninos.
* Áreas de serviço com janelas baixas.
* Escadas abertas com vãos laterais.

### Dicas de manutenção:
A durabilidade média da rede é de 3 a 5 anos. O sol e a chuva ressecam o material. Cheque regularmente se há ganchos soltos ou enferrujados, fios desfiados ou cortados. Se tiver gatos, olhe com mais atenção, pois eles gostam de morder as redes.
        `,
        tags: ['janelas', 'apartamento', 'segurança', 'quedas', 'manutenção']
    }
];

export const DISCLAIMER_FOOTER_PT_BR = "As informações aqui contidas servem como orientação básica de prevenção e não substituem o atendimento médico de urgência. Em caso de emergência, ligue imediatamente para os Bombeiros (193) ou {{EMERGENCY_MEDICAL}}.";
