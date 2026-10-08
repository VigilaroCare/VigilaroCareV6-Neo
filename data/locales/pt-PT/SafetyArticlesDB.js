/**
 * SafetyArticlesDB.js
 * Banco de Dados de Artigos de Segurança Doméstica (Baseado no Blog Prevenir em Casa)
 * Estrutura: id, categoryId, title, summary, content (markdown), tags, source (opcional)
 */

export const SAFETY_ARTICLES_PT_PT = [
    // --- 📂 BEBÊS (Fases da Vida) ---
    // --- 📂 CRIANÇAS (Fases da Vida) ---
    // --- 📂 IDOSOS (Fases da Vida) ---
    // --- 📂 INCÊNDIO E ELETRICIDADE ---
    {
        id: 'prevencao_incendio_geral',
        categoryId: 'fire_prevention',
        title: 'Como Evitar Incêndios Domésticos',
        summary: 'A negligência é a maior causa de incêndios. Saiba identificar os riscos.',
        content: `
# Prevenção de Incêndios

A maioria dos incêndios começa pequeno e poderia ser evitado.

### Principais Causas e Prevenção:
*   **Velas:** Nunca deixe acesas sem supervisão ou perto de cortinas/lençóis. Use castiçais firmes.
*   **Cozinha:** Óleo quente é altamente inflamável. Se pegar fogo na panela, **NUNCA jogue água** (causa explosão). Desligue o fogo e tente tampar a panela com uma tampa ou pano úmido.
*   **Cigarro:** Nunca fume na cama. O risco de adormecer e incendiar o colchão é altíssimo.
*   **Sobrecarga Elétrica:** Não ligue vários aparelhos potentes (secador, ferro, aquecedor) num mesmo benjamim (T).
*   **Gás:** Ao sentir cheiro de gás, não acenda luzes nem risque fósforos. Abra janelas e feche o registro geral.
        `,
        tags: ['fogo', 'emergencia', 'casa']
    },
    {
        id: 'decoracao_natal',
        categoryId: 'fire_prevention',
        title: 'Decoração de Natal Segura',
        summary: 'Pisca-piscas e árvores de natal podem ser perigosos se não cuidados.',
        content: `
# Natal Seguro

Luzes e decorações improvisadas aumentam o risco de incêndio no fim de ano.

### Dicas:
*   **Pisca-Pisca:** Verifique se os fios estão descascados antes de usar. Combre produtos com selo do INMETRO. Dê preferência a LEDs (esquentam menos).
*   **Desligue ao Sair:** Nunca deixe as luzes da árvore ligadas se não tiver ninguém em casa ou ao ir dormir.
*   **Árvore:** Mantenha longe de cortinas e velas.
*   **Sobrecarga:** Evite ligar todas as decorações na mesma tomada. Use filtros de linha com fusível.
        `,
        tags: ['natal', 'eletricidade', 'feriados']
    },
    {
        id: 'churrasco_seguro',
        categoryId: 'fire_prevention',
        title: 'Churrasco com Segurança',
        summary: 'O perigo do álcool líquido e acidentes com churrasqueiras.',
        content: `
# Churrasco sem Acidentes

Reunir a família é ótimo, mas acender a churrasqueira exige respeito.

### Regras de Ouro:
*   **Álcool Líquido:** Evite! Ele explode facilmente e a chama pode "subir" para a garrafa na sua mão. Prefira álcool gel acendedor, pastilhas ou carvão com acendedor elétrico.
*   **Crianças Longe:** Estabeleça uma "zona proibida" de 1 metro ao redor da churrasqueira para crianças.
*   **Local:** Jamais faça churrasco em locais fechados sem exaustão (risco de intoxicação por monóxido de carbono e incêndio).
*   **Facas:** Mantenha as facas de corte longe do alcance das crianças e guardadas logo após o uso.
        `,
        tags: ['lazer', 'fogo', 'cozinha']
    },
    {
        id: 'choque_eletrico',
        categoryId: 'riscos_fisicos',
        title: 'Choques Elétricos: Prevenção e Ação',
        summary: 'Instalações antigas e gambiarras são vilões. Saiba o que fazer em caso de choque.',
        content: `
# Choque Elétrico: Perigo Invisível

A eletricidade não tem cheiro nem cor, mas pode matar.

### Prevenção:
*   **Mantenha Manutenção em Dia:** Fios desencapados, tomadas com marcas de queimado ou disjuntores que caem frequentemente indicam perigo. Chame um eletricista.
*   **Água e Luz:** Nunca manuseie aparelhos elétricos com mãos molhadas ou pisando em chão molhado.
*   **Protetores de Tomada:** Indispensáveis se houver crianças em casa.

### Se alguém levar um choque:
1.  **NÃO toque na pessoa** enquanto ela estiver em contato com a fonte de energia. Você também levará o choque.
2.  **Desligue a energia:** Corra para o quadro de força e desligue o disjuntor geral.
3.  **Afaste a fonte:** Se não der para desligar, use um objeto **não condutor** (cabo de vassoura de madeira seco, plástico grosso) para empurrar o fio longe da pessoa.
4.  **Chame o {{EMERGENCY_MEDICAL}}.**
        `,
        tags: ['eletricidade', 'primeiros_socorros', 'manutencao']
    },

    // --- 📂 PRODUTOS E QUÍMICOS ---
    {
        id: 'produtos_limpeza',
        categoryId: 'produtos_perigosos',
        title: 'Risco Químico (Produtos de Limpeza)',
        summary: 'Armazenamento seguro de químicos domésticos para evitar intoxicação.',
        content: `
# Risco Químico (Produtos de Limpeza)

**O Risco Invisível:** A ingestão de substâncias alcalinas causa necrose do esôfago em minutos. Produtos coloridos mimetizam sucos para as crianças.

**Ação Tática Imediata:** Mova produtos debaixo da pia para armários acima de 1,5m com travas. Mantenha os produtos estritamente nas embalagens originais.

**Protocolo de Emergência:** NÃO provoque vômito. Ligue imediatamente para o {{POISON_CONTROL}} ou {{EMERGENCY_MEDICAL}} com a embalagem na mão.

[Conheça protocolos completos em preveniremcasa.com.br](https://www.preveniremcasa.com.br)
        `,
        tags: ['veneno', 'quimica', 'crianca']
    },
    {
        id: 'intoxicacao_medicamentos',
        categoryId: 'produtos_perigosos',
        title: 'Intoxicação por Medicamentos',
        summary: 'Medicamentos coloridos parecem balas. Mantenha fora do alcance.',
        content: `
# Medicamentos Longe das Crianças

A intoxicação medicamentosa é uma das principais causas de envenenamento infantil.

### Prevenção:
*   **Farmacinha Trancada:** Mantenha remédios em caixa fechada e em local alto.
*   **Não chame de "Doce":** Nunca diga à criança que o remédio é "balinha" ou "suquinho" para convencê-la a tomar. Diga que é remédio para sarar.
*   **Dose Certa:** Use sempre o dosador (seringa/copinho) que vem com o remédio. Colheres de cozinha variam muito de tamanho.
        `,
        tags: ['medicamentos', 'saude', 'crianca']
    },

    // --- 📂 AMBIENTES e GERAIS ---
    {
        id: 'seguranca_cozinha',
        categoryId: 'seguranca_ambiente',
        title: '10 Boas Práticas na Cozinha',
        summary: 'A cozinha é o coração da casa e também o local com mais riscos.',
        content: `
# Segurança na Cozinha

Evite cortes, queimaduras e contaminação.

1.  **Faca Afiada é Faca Segura:** Facas cegas exigem mais força e podem escorregar. Mantenha-as afiadas, mas longe de crianças.
2.  **Panela de Pressão:** Mantenha a válvula limpa. Só abra depois que sair TODA a pressão. Troque a borracha anualmente.
3.  **Piso Seco:** Limpe qualquer respingo de água ou óleo imediatamente para evitar quedas.
4.  **Cuidado com Panos:** Não deixe panos de prato perto do fogo.
5.  **Micro-ondas:** Cuidado ao retirar recipientes (aquecem muito) e com o vapor ao abrir tampas/sacos de pipoca (queimadura por vapor é grave).
        `,
        tags: ['cozinha', 'casa', 'fogo']
    },
    {
        id: 'redes_protecao',
        categoryId: 'seguranca_ambiente',
        title: 'Redes de Proteção para Janelas',
        summary: 'Indispensável para apartamentos com crianças e pets.',
        content: `
# Redes de Proteção

Se você mora em sobrado ou apartamento, a rede é obrigatória.

### Dicas de Instalação:
*   **Norma Técnica:** Exija redes que sigam a norma ABNT NBR 16046.
*   **Ganchos:** Devem ser de aço (não use ganchos plásticos antigos) e estarem bem fixados.
*   **Tamanho da Malha:** Para gatos e crianças pequenas, malhas menores (3x3 cm ou 5x5 cm) são ideais.
*   **Manutenção:** As redes duram cerca de 3 a 5 anos expostas ao sol. Verifique se os fios estão ressecados ou quebradiços e troque se necessário.
        `,
        tags: ['janelas', 'crianca', 'pets', 'reforma']
    },
    {
        id: 'plantas_toxicas',
        categoryId: 'plantas',
        title: 'Plantas Tóxicas em Casa',
        summary: 'Belas, mas perigosas. Conheça as plantas que podem envenenar pets e crianças.',
        content: `
# Plantas Tóxicas Comuns

Muitas plantas ornamentais populares são tóxicas se ingeridas ou tocadas.

### Principais Vilãs:
*   **Comigo-Ninguém-Pode:** Altamente tóxica (cristais de oxalato de cálcio). Causa inchaço na boca, asfixia e dor intensa.
*   **Costela-de-Adão:** Também possui oxalato de cálcio. Irritante para mucosas.
*   **Bico-de-Papagaio:** A seiva leitosa causa irritação na pele e olhos.
*   **Espirradeira:** Extremamente tóxica, pode causar parada cardíaca.
*   **Lírio:** Muito tóxico para gatos (insuficiência renal).

**Dica:** Mantenha essas plantas em locais altos ou suspensos, ou opte por espécies seguras como Bromélias, Orquídeas e Lavanda.
        `,
        tags: ['plantas', 'natureza', 'pets']
    },
    {
        id: 'animais_peconhentos',
        categoryId: 'animais',
        title: 'Animais Peçonhentos: Primeiros Socorros',
        summary: 'Aranhas, escorpiões e cobras. Como evitar e o que fazer.',
        content: `
# Animais Peçonhentos

Ocorre especialmente em casas com quintais, próximas a terrenos baldios ou em época de calor/chuva.

### Prevenção:
*   **Limpeza:** Evite entulho, telhas e madeiras empilhadas no quintal.
*   **Vedere Frestas:** Use "cobras de areia" nas portas e telas nos ralos.
*   **Sacuda:** Sempre sacuda sapatos e roupas antes de vestir (escorpiões adoram sapatos).

### Se for picado:
*   **Lave** o local com água e sabão.
*   Mantenha a vítima em **repouso** e com o membro elevado.
*   Leve imediatamente ao hospital. Se possível (e seguro), leve o animal morto ou tire uma **foto** para identificação e escolha do soro correto.
*   **NÃO** faça torniquete, **NÃO** corte e **NÃO** tente chupar o veneno.
        `,
        tags: ['animais', 'primeiros_socorros', 'emergencia']
    },
    {
        id: 'kit_emergencia_montagem',
        categoryId: 'kits_emergencia',
        title: 'Montando seu Kit de Primeiros Socorros',
        summary: 'O que não pode faltar na sua caixa de emergência doméstica.',
        content: `
# Kit de Primeiros Socorros Básico

Ter um kit pronto e acessível evita pânico na hora do acidente.

### Lista de Itens Essenciais:
1.  **Curativos:** Band-aids de vários tamanhos, gaze estéril, esparadrapo ou micropore.
2.  **Limpeza:** Soro fisiológico 0,9% (frascos pequenos), sabonete líquido neutro, antisséptico (tipo iodopovidona ou clorexidina, se não for alérgico).
3.  **Ferramentas:** Tesoura sem ponta, pinça (para tirar farpas), termômetro.
4.  **Medicamentos (Básicos):** Analgésico/Antitérmico (paracetamol/dipirona), Antialérgico (conforme orientação médica).
5.  **Outros:** Luvas descartáveis, bolsa térmica (gel) para compressas frias/quentes.

*Verifique a validade dos itens a cada 6 meses.*
        `,
        tags: ['kit', 'emergencia', 'saude']
    },
    {
        id: 'escolha_pet',
        categoryId: 'pets',
        title: 'Escolhendo o Pet com Segurança',
        summary: 'Como escolher o animal ideal considerando a segurança da família.',
        content: `
# Pet Seguro, Família Feliz

Adotar um pet exige responsabilidade e análise do ambiente.

### Fatores de Escolha:
*   **Espaço vs Energia:** Cães grandes em apartamentos pequenos podem ficar estressados. Avalie se o pet exige muito exercício diário ou se adapta ao ócio.
*   **Crianças Pequenas:** Priorize raças dóceis e pacientes (Golden Retriever, Beagle, SRD). Evite raças que não toleram manipulação brusca.
*   **Alergias:** Existem alternativas para alérgicos como Peixes, Ornamental Birds (Aves) ou mini-pigs.
*   **Temperamento:** Se adotar um pet adulto, verifique o histórico com crianças e outros animais.

### Adaptação da Casa:
*   Telas em janelas (gatos).
*   Esconder fios elétricos (filhotes roem tudo e podem levar choque).
*   Plantas tóxicas fora do alcance.
        `,
        tags: ['pets', 'animais', 'adocao']
    },
    {
        id: 'mordida_animal',
        categoryId: 'pets',
        title: 'Mordida de Animal: O que fazer?',
        summary: 'Protocolo tático de primeiros socorros em caso de mordidas de cães, gatos ou animais de rua.',
        content: `
# Mordida de Animal: Socorro Imediato

Uma mordida de animal pode parecer superficial, mas o risco de infecções graves e doenças como Raiva e Tétano é alto.

### Protocolo de Ação:
1.  **Lave Imediatamente:** Use água corrente e muito sabão neutro por pelo menos **15 minutos**. Isso reduz drasticamente a carga viral (inclusive do vírus da Raiva).
2.  **Não use Caseiros:** Não passe álcool gel, pó de café ou pomadas sem orientação.
3.  **Procure o Pronto-Socorro:** Toda mordida que rompe a pele deve ser avaliada por um médico para protocolo de profilaxia (vacina/soro antirrábico e antitetânico).
4.  **Identifique o Animal:** Se for pet de terceiros, peça o comprovante de vacinação. Se for de rua, tente observar o animal por 10 dias (não tente capturar).

[Leia o artigo completo no Prevenir em Casa](https://preveniremcasa.com.br/saiba-o-que-fazer-se-seu-filho-levou-uma-mordida-de-um-animal-na-rua/)
        `,
        tags: ['primeiros_socorros', 'pets', 'emergencia']
    }
    ,
    {
        id: 'animais_peconhentos',
        categoryId: 'animais_perigosos',
        title: 'Primeiros Socorros: Animais Peçonhentos',
        summary: 'Saiba o que fazer em caso de acidentes com animais peçonhentos e venenosos, comuns em áreas com quintais e próximas à natureza.',
        content: `
# Primeiros Socorros: Animais Peçonhentos e Venenosos

Para começar, é importante esclarecer a diferença:
* **Peçonhentos**: Injetam toxinas por presas ou ferrões (cobras, aranhas, escorpiões).
* **Venenosos**: Provocam envenenamento por ingestão ou contato (lagartas, sapos, baiacu).

**O que fazer em caso de acidente:**
1. **Mantenha a calma**: Acelerar os batimentos cardíacos espalha o veneno mais rápido.
2. **Lave o local**: Use água e sabão apenas.
3. **Mantenha o membro elevado**: Se for braço ou perna, mantenha levantado.
4. **Procure socorro médico imediatamente**: Leve a vítima ao hospital mais próximo.
5. **Identifique o animal**: Se possível e seguro, tire uma foto do animal para facilitar o tratamento (usar o soro correto).

**O que NÃO fazer:**
* Não faça torniquetes.
* Não corte ou perfure o local.
* Não tente sugar o veneno.
* Não coloque pó de café, fumo ou outras substâncias.
        `,
        tags: ['animais', 'primeiros_socorros', 'veneno', 'emergencia']
    },
    {
        id: 'choques_eletricos',
        categoryId: 'manutencao_casa',
        title: 'Choques Elétricos: Como Evitar',
        summary: 'A eletricidade é perigosa e pode ser fatal. Aprenda a prevenir choques elétricos e o que fazer se ocorrerem.',
        content: `
# Choques Elétricos: Prevenção e Ação

O choque elétrico, embora às vezes pareça inofensivo ("levou um formigamento"), pode causar paradas cardíacas, queimaduras graves e sequelas neurológicas.

**Como Evitar:**
* **Protetores de Tomada**: Essenciais se houver crianças em casa.
* **Fiação em Dia**: Não deixe fios desencapados ou emendas mal feitas.
* **Água e Eletricidade**: Nunca manuseie aparelhos elétricos com o corpo molhado ou descalço em chão úmido.
* **Desligue a Chave Geral**: Ao trocar lâmpadas ou fazer reparos, desligue o disjuntor.

**O que fazer se alguém levar um choque:**
1. **Não toque na vítima** enquanto ela estiver em contato com a fonte de energia.
2. **Desligue a energia** imediatamente (disjuntor ou tire da tomada, se seguro).
3. **Se não puder desligar**, afaste a vítima da fonte usando um objeto *não condutor* (cabo de vassoura de madeira, plástico seco).
4. **Chame a emergência ({{EMERGENCY_NUMBER}})**.
5. **Inicie RCP** se a vítima estiver inconsciente e sem respirar, após estar segura longe da corrente.
        `,
        tags: ['elétrica', 'manutenção', 'choque', 'primeiros_socorros']
    },
    {
        id: 'panela_pressao',
        categoryId: 'cozinha_segura',
        title: 'Panela de Pressão: Use com Segurança',
        summary: 'Perca o medo da panela de pressão com dicas de uso, manutenção e escolha do modelo ideal para sua segurança.',
        content: `
# Panela de Pressão: Dicas de Segurança

A panela de pressão acelera o cozimento, mas exige respeito. Acidentes podem ser graves, mas são evitáveis.

**Dicas de Uso Seguro:**
* **Respeite o Nível Máximo**: Nunca encha a panela até a boca. Deixe espaço para o vapor.
* **Válvula Limpa**: Verifique sempre se o pino (válvula de escape) não está entupido antes de usar.
* **Borracha de Vedação**: Troque a borracha sempre que estiver ressecada ou frouxa.
* **Nunca abra à força**: Espere a pressão sair totalmente (o chiado parar) antes de tentar abrir.
* **Esfriamento**: Se precisar abrir rápido, coloque sob água corrente (torneira) sem molhar a válvula, até perder a pressão.

**Sinais de Perigo:**
* Se a panela parar de chiar mas o fogo estiver ligado, desligue imediatamente! A válvula pode estar entupida.
* Se a borracha escapar pelas laterais, desligue e troque a borracha.
        `,
        tags: ['cozinha', 'segurança', 'panela_pressao', 'dicas_casa']
    },
    {
        id: 'seguranca_cozinha',
        categoryId: 'cozinha_segura',
        title: '10 Boas Práticas na Cozinha',
        summary: 'A cozinha é o local onde ocorrem mais acidentes domésticos. Confira 10 dicas para cozinhar com segurança.',
        content: `
# 10 Boas Práticas de Segurança na Cozinha

1. **Cabos das Panelas**: Vire os cabos sempre para dentro do fogão para evitar esbarrões e que crianças puxem.
2. **Facas Afiadas**: Mantenha facas longe da beirada e guardadas em local seguro. Faca cega é mais perigosa que afiada (exige mais força).
3. **Pano de Prato**: Não deixe panos perto do fogo. Eles pegam fogo rapidamente.
4. **Chão Limpo**: Se cair óleo ou água, limpe imediatamente para evitar escorregões.
5. **Produtos de Limpeza**: Nunca guarde produtos químicos em embalagens de alimentos (garrafas de refrigerante) na cozinha.
6. **Micro-ondas**: Cuidado ao retirar recipientes quentes; o vapor pode queimar o rosto.
7. **Crianças**: Cozinha não é lugar de brincar. Evite a presença de crianças enquanto cozinha.
8. **Vazamento de Gás**: Sentiu cheiro de gás? Não acenda luzes nem risque fósforos. Abra janelas e feche o registro.
9. **Óleo Quente**: Nunca jogue água em óleo pegando fogo! Abafe com uma tampa.
10. **Atenção**: Não cozinhe com sono ou sob efeito de medicamentos fortes.
        `,
        tags: ['cozinha', 'segurança', 'dicas', 'fogo']
    },
    {
        id: 'redes_protecao',
        categoryId: 'manutencao_casa',
        title: 'Redes de Proteção: Janelas e Sacadas',
        summary: 'Essenciais para quem tem crianças ou pets em apartamentos. Saiba como escolher e manter.',
        content: `
# Redes de Proteção para Janelas e Sacadas

Se você mora em apartamento ou sobrado, as redes de proteção são a barreira física mais eficaz contra quedas.

**Onde Instalar:**
* Janelas de quartos e salas.
* Sacadas e varandas.
* Áreas de serviço.
* Mezaninos e escadas abertas.

**Manutenção:**
* **Validade**: As redes têm vida útil (geralmente 3 a 5 anos). O sol resseca o material (polietileno/poliamida).
* **Inspeção**: Verifique se há cortes, furos ou ganchos soltos regularmente.
* **Teste de Tensão**: A rede deve estar esticada. Se estiver frouxa, chame um técnico.
* **Pets**: Gatos podem roer a rede. Verifique com frequência se há danos.

**Dica**: Ao contratar, exija empresas que sigam as normas da ABNT e ofereçam garantia.
        `,
        tags: ['janelas', 'apartamento', 'segurança', 'quedas', 'manutenção']
    }
];

export const DISCLAIMER_FOOTER_PT_PT = "As informações fornecidas não substituem o aconselhamento, diagnóstico ou tratamento médico profissional. Em caso de emergência, ligue imediatamente para os Bombeiros (112) ou INEM (112). O aplicativo não se responsabiliza por intervenções realizadas com base nestes guias.";

