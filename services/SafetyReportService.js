import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { CHECKLISTS, AMBIENTES } from '../data/mapeamento_dados';
import { htmlDocument } from '../utils/pdfReport';
import { Storage } from '../utils/SecureStorage';

// ─── BIBLIOTECA DE IMPLICAÇÕES ESTATÍSTICAS ────────────────────────────────
// Fonte: DATASUS, SINAN/MS, ABNT NBR 9050, INMETRO, OMS, IBGE, literatura de
// prevenção de acidentes domésticos (Agnaldo Fontinele – referência editorial Vigilaro).
const RISK_IMPLICATIONS = {

    // POR TIPO DE RISCO (tags do checklist)
    queda: {
        baby: "Quedas são a principal causa de trauma craniano em bebês. Em superfícies rígidas, uma queda de menos de 1 metro já pode ser fatal. O tempo de reação de cuidadores é, em média, de 0,3 segundos — insuficiente para evitar o impacto.",
        toddler: "Entre 1 e 3 anos, quedas de móveis e escadas são a principal causa de internação por trauma. Crianças nessa faixa ainda não têm noção de profundidade desenvolvida.",
        child: "Crianças entre 3 e 12 anos lideram as estatísticas de fraturas por quedas de altura no Brasil (DATASUS). Janelas sem proteção são o principal vetor de acidente grave.",
        teen: "Adolescentes têm tendência a subestimar riscos de altura. Quedas de sacadas e telhados representam uma das principais causas de trauma grave nessa faixa etária.",
        adult: "Quedas em ambiente doméstico causam cerca de 30% dos afastamentos laborais por acidente. Escadas molhadas, tapetes soltos e ausência de iluminação são os principais fatores.",
        senior: "Quedas são a principal causa de morte acidental em idosos no Brasil (DATASUS, 2023), representando 35% das hospitalizações acima de 60 anos. O uso de medicamentos psicoativos aumenta o risco de queda em até 60%. Com a osteoporose, uma simples queda pode resultar em fratura de quadril — com mortalidade pós-cirúrgica de até 30% em 1 ano.",
        pet: "Pets, especialmente filhotes, podem cair de alturas que parecem seguras para humanos. Gatos sofrem da 'Síndrome do Gato Voador' — quedas de janelas abertas são frequentes em apartamentos.",
        default: "Quedas domésticas são a 2ª maior causa de morte acidental no Brasil, com mais de 30 mil óbitos por ano (IBGE). A prevenção é totalmente possível com ajustes estruturais simples."
    },
    afogamento: {
        baby: "O afogamento é silencioso e ocorre em menos de 60 segundos em bebês. Um bebê pode se afogar em apenas 5 cm de água — em baldes, banheiras ou vasos sanitários abertos.",
        toddler: "O afogamento é a 2ª causa de morte acidental em crianças de 1 a 4 anos no Brasil (MS/DATASUS). Não há gritos — a criança simplesmente afunda. A janela de resgate é de 2 a 4 minutos.",
        child: "Crianças de 5 a 14 anos representam 40% das mortes por afogamento no Brasil. Piscinas sem cerca física respondem pela maioria dos casos — coletes salva-vidas não substituem barreiras físicas.",
        pet: "Muitos pets caem em piscinas e morrem de exaustão porque não conseguem acessar as escadas convencionais. Capas de piscina dão falsa sensação de segurança — animais ficam presos embaixo.",
        default: "O afogamento responde por mais de 3.500 mortes por ano no Brasil (Sociedade Brasileira de Salvamento Aquático). É silencioso, rápido e 100% evitável com barreiras físicas adequadas."
    },
    queimadura: {
        baby: "A pele do bebê é 15x mais fina que a de um adulto. Água a 60°C causa queimadura de 2º grau em 3 segundos. A cozinha responde por cerca de 40% das queimaduras infantis (DATASUS). O manequim de panela para trás e a trava em forno são medidas imediatas.",
        toddler: "Crianças pequenas têm reflexo de agarrar — e puxam cabos de panelas sem entender o perigo. O Hospital das Clínicas registra alta incidência de queimaduras em crianças de 1-3 anos por líquidos quentes.",
        child: "Crianças em idade escolar experimentam com fósforos e isqueiros. Queimaduras químicas com produtos de limpeza também são frequentes nessa faixa.",
        senior: "Idosos podem ter sensibilidade à temperatura reduzida (neuropatia), não percebendo o perigo de superfícies quentes ou água em temperatura elevada antes de se machucar gravemente.",
        pet: "Gatos e cães podem subir em fogões e encostar em superfícies quentes. Óleo quente espirrado causa queimaduras graves nas patas e no focinho.",
        default: "Queimaduras representam a 4ª maior causa de internação por acidente no Brasil. 73% dos casos ocorrem em ambiente doméstico, sendo 60% na cozinha (DATASUS/MS)."
    },
    intoxicacao: {
        baby: "Bebês e crianças pequenas são as principais vítimas de intoxicação doméstica. O SINAN registra que 35% das intoxicações acidentais acometem crianças < 5 anos, principalmente por produtos de limpeza coloridos e medicamentos.",
        toddler: "Crianças de 1 a 3 anos exploram com a boca. Produtos de limpeza com coloração atraente são confundidos com suco ou balas. A intoxicação é a 3ª causa de morte acidental nessa faixa etária no país.",
        pet: "Uva, cebola, alho, xilitol (em gomas e algumas manteigas de amendoim) e chocolate são altamente tóxicos para cães. Paracetamol e anti-inflamatórios comuns podem ser fatais para gatos. O CVT-SP registra milhares de chamadas/ano por intoxicação acidental de pets.",
        senior: "Idosos podem confundir medicamentos semelhantes ou tomar doses erradas. A polifarmácia (uso de 5 ou mais medicamentos) aumenta o risco de interações e intoxicação acidental.",
        default: "O SINAN registra cerca de 200 mil notificações de intoxicação por ano no Brasil. Produtos de uso domiciliar e medicamentos respondem por mais de 50% dos casos. Armazenamento correto previne quase 100% dos acidentes."
    },
    eletricidade: {
        baby: "Tomadas na altura do chão são acessíveis para bebês que começam a se locomover. Choques elétricos causam parada cardíaca e queimaduras internas invisíveis a olho nu.",
        child: "Crianças introduzem objetos metálicos em tomadas por curiosidade. O choque elétrico em crianças causa, além de parada cardíaca, graves queimaduras internas que nem sempre são visíveis externamente.",
        teen: "Adolescentes realizam reparos elétricos improvisados. Instalações inadequadas são responsáveis por 60% dos incêndios residenciais no Brasil (CBMERJ/CBPMESP).",
        adult: "Choques elétricos causam cerca de 1.200 mortes/ano no Brasil (ABRACOPEL). Instalações improvisadas, fios descascados e extensões sobrecarregadas são os principais fatores.",
        pet: "Fios elétricos são 'brinquedos' irresistíveis para filhotes. Morder um fio energizado causa queimaduras na boca e parada cardíaca. Cães e gatos jovens são os mais afetados.",
        default: "Choques elétricos e incêndios de origem elétrica causam mais de 1.200 mortes/ano no Brasil (ABRACOPEL). 60% dos casos têm origem em instalações improvisadas ou com sobrecarga."
    },
    gas: {
        default: "Explosões e intoxicações por GLP (gás de cozinha) causam aproximadamente 300 acidentes graves por ano no Brasil (Corpo de Bombeiros). São 100% evitáveis com manutenção preventiva do botijão, mangueiras e regulador. O gás natural, usado em aparelhos sem manutenção, pode acumular silenciosamente e causar explosão com a simples acender de uma luz."
    },
    corte: {
        baby: "Bebês não têm controle motor para evitar objetos cortantes. Lâminas expostas em gavetas baix as causam ferimentos graves, incluindo cortes em artérias.",
        child: "Tesouras, facas e objetos pontiagudos acessíveis causam ferimentos frequentes em crianças. O risco é maior em gavetas baixas e superfícies acessíveis.",
        default: "Cortes e perfurações domésticos respondem por grande parte dos atendimentos de emergência. Objetos cortantes guardados incorretamente são a principal causa."
    },
    sufocacao: {
        baby: "A sufocação é a 1ª causa de morte acidental em bebês < 1 ano no Brasil (MS). Travesseiros, lençóis soltos, objetos pequenos (< 4,5 cm) e grades de berço espaçadas são os principais vetores. Bebês não têm força muscular para desobstruir as vias aéreas.",
        toddler: "Crianças pequenas colocam objetos pequenos na boca por instinto exploratório. Qualquer objeto que caiba em um tubo de papel toalha representa risco de sufocação.",
        pet: "Sacos plásticos e embalagens de snacks são armadilhas para pets curiosos. Gatos e cães podem enfiar a cabeça e sufocarem sem conseguir se livrar.",
        default: "A sufocação por corpos estranhos é uma das principais causas de morte acidental evitável. Objetos menores que 4,5 cm de diâmetro devem ser mantidos fora do alcance de crianças."
    },
    iluminacao: {
        senior: "Idosos levantam à noite com maior frequência (noctúria) e têm adaptação visual mais lenta ao escuro. Corredores e banheiros sem iluminação noturna são os principais cenários de queda noturna, que ocorrem em ambiente de menor supervisão e com consequências muitas vezes fatais.",
        default: "A iluminação insuficiente está associada a 20% das quedas domésticas, principalmente em escadas, corredores e banheiros. Iluminação de presença (sensor) é a solução de menor custo e maior eficácia."
    },
    janela: {
        child: "Quedas de janelas e sacadas são a principal causa de trauma craniano grave em crianças entre 1 e 5 anos em ambiente urbano. Redes de proteção certificadas pela ABNT NBR 16389 são obrigatórias por lei em apartamentos em vários estados.",
        pet: "Gatos são atraídos por janelas abertas e pássaros. A 'Síndrome do Gato Voador' é documentada em centros veterinários de todo o país — quedas de andares elevados causam fraturas múltiplas mas raramente são fatais, porém geram custos veterinários altos e sofrimento ao animal.",
        default: "Quedas de janelas e sacadas representam causa relevante de trauma grave. Proteções físicas (grades ou redes) são a única medida efetiva de prevenção."
    }
};

// ─── HELPER: busca a implicação correta para um item ─────────────────────────
function getImplication(item, profileType) {
    const tags = item.tags || [];
    const titulo = (item.titulo || '').toLowerCase();

    // Extrair texto contextual por tag + tipo de perfil
    for (const tag of tags) {
        const tagData = RISK_IMPLICATIONS[tag];
        if (tagData) {
            return tagData[profileType] || tagData.default || null;
        }
    }

    // Fallback por palavras no título
    const keywords = Object.keys(RISK_IMPLICATIONS);
    for (const kw of keywords) {
        if (titulo.includes(kw)) {
            const tagData = RISK_IMPLICATIONS[kw];
            return tagData[profileType] || tagData.default || null;
        }
    }

    return null;
}

// ─── HELPER: orientação de ação para o item ──────────────────────────────────
function getActionTip(item, knowledgeTip) {
    // Retorna a dica específica do item. Se não houver, retorna vazio para que a IA crie a dela.
    const tip = item.dica || item.orientacao || item.tip || '';
    return tip;
}

// ─── HELPER: Medida Corretiva ────────────────────────────────────────────────
function getMedidaCorretiva(item, tip) {
    if (tip && tip.trim()) {
        return tip;
    }
    let title = item.titulo || '';
    if (title.endsWith('?')) {
        title = title.slice(0, -1);
    }
    title = title.replace(/^(os|as|o|a|você|existe|existem|há)\s+/i, '');
    return `Providenciar a adequação do item: garantir que ${title.toLowerCase()}.`;
}

// ─── HELPER: Medida Preventiva ────────────────────────────────────────────────
function getMedidaPreventiva(item, profileType) {
    const tags = item.tags || [];
    const title = (item.titulo || '').toLowerCase();
    
    const PREVENTIVE_ACTIONS = {
        queda: {
            baby: "Manter supervisão visual 100% ativa em locais elevados (trocador, cama, sofá) e manter os portões de segurança de escadas trancados.",
            toddler: "Bloquear o acesso a janelas com móveis próximos, usar portões nas escadas e ensinar a descer degraus engatinhando de costas.",
            child: "Orientar a não subir em cadeiras, mesas ou peitoris de janelas para jogar ou brincar. Manter janelas travadas se não tiverem redes de proteção.",
            senior: "Estabelecer uma rotina de exercícios leves para fortalecimento muscular e de equilíbrio. Retirar tapetes soltos e manter caminhos desobstruídos.",
            pet: "Evitar brincadeiras bruscas perto de vãos de escadas ou varandas abertas. Bloquear passagem de pets filhotes por grades largas.",
            default: "Manter corredores e passagens livres de fios, calçados e brinquedos. Fazer vistorias visuais de desordem nos caminhos comuns."
        },
        afogamento: {
            baby: "Esvaziar e virar para baixo baldes, bacias e banheiras imediatamente após o uso. Nunca deixar o bebê sozinho no banho por nenhum segundo.",
            toddler: "Manter a porta do banheiro trancada por fora e a tampa do vaso sanitário lacrada com trava de segurança para crianças.",
            child: "Ensinar a criança a nadar desde cedo e nunca deixá-la brincar perto de corpos d'água sem a presença física direta de um adulto.",
            pet: "Manter portões da área da piscina fechados e acostumar o pet a reconhecer a rampa ou escada de saída de emergência.",
            default: "Instalar cercas ou barreiras ao redor de áreas com água acumulada. Tampar poços, cisternas e manter piscinas cobertas com capas rígidas."
        },
        queimadura: {
            baby: "Checar a temperatura da água da banheira com o cotovelo antes de colocar o bebê. Não segurar o bebê no colo enquanto consome bebidas quentes.",
            toddler: "Adotar o hábito de usar as bocas traseiras do fogão e manter cabos de panelas virados para trás. Criar uma 'zona proibida' de 1 metro ao redor do fogão.",
            child: "Ensinar sobre o perigo do fogo e manter fósforos, isqueiros e velas trancados em gavetas altas, longe do alcance visual.",
            senior: "Utilizar alarmes ou temporizadores visuais/sonoros no preparo de alimentos para evitar esquecimento de panelas ligadas.",
            pet: "Impedir o pet de subir em bancadas de cozinha e monitorar enquanto o forno estiver ligado para evitar encostar no vidro quente.",
            default: "Manipular panelas quentes com luvas apropriadas e nunca deixar óleos ou gorduras sob aquecimento sem monitoramento constante."
        },
        intoxicacao: {
            baby: "Manter produtos de higiene e cosméticos trancados. Nunca chamar medicamentos de 'docinho' ou 'bala' na frente da criança.",
            toddler: "Guardar produtos de limpeza, inseticidas e medicamentos estritamente em armários altos ou gavetas com travas de segurança.",
            child: "Ensinar a não colocar substâncias desconhecidas na boca. Manter produtos em seus recipientes originais (nunca usar garrafas de refrigerante).",
            senior: "Utilizar organizadores diários/semanais de comprimidos e manter a receita médica atualizada junto às caixas para evitar superdosagem.",
            pet: "Conhecer a lista de plantas e alimentos tóxicos para animais. Guardar chocolate, uvas, medicamentos humanos e venenos de ratos sob chave.",
            default: "Armazenar produtos químicos residenciais isolados de alimentos e utensílios de cozinha. Manter as embalagens bem vedadas."
        },
        eletricidade: {
            baby: "Usar protetores plásticos em todas as tomadas acessíveis na altura do chão e não deixar carregadores de celular conectados sem uso.",
            toddler: "Esconder cabos elétricos atrás de móveis pesados e evitar o uso de extensões ou adaptadores elétricos temporários no chão.",
            child: "Orientar a nunca tocar em tomadas ou ligar eletrodomésticos com as mãos ou pés molhados. Explicar o perigo de fios soltos.",
            pet: "Proteger os cabos elétricos com conduítes ou organizadores rígidos para evitar que o animal morda ou roa os fios energizados.",
            default: "Evitar a sobrecarga de tomadas usando múltiplos benjamins. Desligar disjuntores antes de efetuar pequenas trocas de lâmpadas ou reparos."
        },
        gas: {
            default: "Adotar o hábito de fechar o registro do botijão de gás ao deitar-se ou ao se ausentar da residência por longos períodos."
        },
        corte: {
            baby: "Evitar o uso de copos ou pratos de vidro perto de bebês. Guardar objetos cortantes de manicure/pedicure em estojos trancados.",
            child: "Disponibilizar tesouras de ponta redonda para atividades escolares e guardar facas de cozinha em suportes elevados ou gavetas com travas.",
            pet: "Evitar deixar cacos de vidro, pregos ou latas abertas em locais onde o pet possa transitar ou farejar.",
            default: "Manusear facas e ferramentas manuais sempre apontando a lâmina para longe do corpo. Descartar vidros quebrados embrulhados em papel grosso."
        },
        sufocacao: {
            baby: "Colocar o bebê para dormir de barriga para cima em colchão firme. Retirar bichos de pelúcia, almofadas e protetores soltos do berço.",
            toddler: "Evitar oferecer brinquedos com peças muito pequenas (menores que 4 cm) e cortar alimentos (como uvas e salsichas) em pedaços pequenos no sentido longitudinal.",
            pet: "Destruir ou recolher sacos plásticos vazios de ração ou de compras, pois cães e gatos podem prender a cabeça neles e sufocar.",
            default: "Evitar o uso de cordões de cortina ou persianas soltos que possam criar laços na altura de crianças ou pescoço de animais."
        },
        iluminacao: {
            senior: "Manter luzes de presença (sensor ou tomadas piloto) permanentemente ligadas nas rotas noturnas entre o quarto e o banheiro.",
            default: "Substituir imediatamente lâmpadas queimadas em áreas comuns, corredores e degraus de acesso da residência."
        },
        janela: {
            child: "Manter camas, sofás e cadeiras afastados das janelas e sacadas para evitar que sirvam de degrau para escaladas de crianças.",
            pet: "Manter as janelas de apartamentos fechadas ou limitadas se não possuírem telas de proteção resistentes a garras e mordidas de pets.",
            default: "Verificar a integridade física das redes de proteção anualmente e evitar debruçar-se ou colocar pesos excessivos nos peitoris."
        }
    };

    for (const tag of tags) {
        const data = PREVENTIVE_ACTIONS[tag];
        if (data) {
            return data[profileType] || data.default || null;
        }
    }

    const keywords = Object.keys(PREVENTIVE_ACTIONS);
    for (const kw of keywords) {
        if (title.includes(kw)) {
            const data = PREVENTIVE_ACTIONS[kw];
            return data[profileType] || data.default || null;
        }
    }

    return "Manter a atenção diária nas condições do ambiente e adotar hábitos de supervisão e organização para evitar situações de perigo.";
}

// ─── HELPER: Medida de Mitigação ──────────────────────────────────────────────
function getMedidaMitigacao(item, profileType) {
    const tags = item.tags || [];
    const title = (item.titulo || '').toLowerCase();
    
    const MITIGATION_ACTIONS = {
        queda: {
            baby: "Instalar tapetes emborrachados macios ao redor do berço e do trocador para amortecer eventuais impactos de quedas acidentais.",
            toddler: "Utilizar protetores de quinas arredondadas em mesas e móveis baixos para suavizar colisões e ferimentos durante quedas.",
            child: "Usar pisos emborrachados em áreas de brinquedos e instalar limitadores de abertura nas janelas (abertura máxima de 10 cm).",
            senior: "Garantir o uso de calçados antiderrapantes com solado de borracha firme dentro de casa e instalar barras de apoio no box e vaso sanitário.",
            pet: "Manter pisos limpos e secos para evitar escorregões que possam lesionar as articulações e patinhas dos animais.",
            default: "Manter um kit de primeiros socorros com gelo em gel reutilizável na geladeira e faixas para conter inchaços de quedas leves."
        },
        afogamento: {
            baby: "Manter o telefone do SAMU (192) em discagem rápida e saber como realizar compressões torácicas básicas de emergência em lactentes.",
            toddler: "Conhecer a manobra de desobstrução das vias aéreas e manter um colete salva-vidas de tamanho infantil sempre acessível se houver piscina.",
            child: "Utilizar coletes salva-vidas homologados (não boias de braço) e manter um cabo ou boia circular rígida na borda da piscina.",
            pet: "Instalar uma plataforma flutuante ou rampa de escape para pets na piscina, permitindo que o animal saia sozinho se cair acidentalmente.",
            default: "Fazer curso de primeiros socorros focado em reanimação cardiorrespiratória e manter o telefone de emergência em local visível."
        },
        queimadura: {
            baby: "Em caso de queimadura leve, resfriar a área com água corrente fria por 10 minutos (nunca aplicar pasta de dente ou manteiga) e buscar socorro médico.",
            toddler: "Instalar barreiras de proteção físicas ao redor do fogão (grades de fogão) e manter pomadas para queimadura no kit de primeiros socorros.",
            senior: "Substituir chaleiras convencionais por chaleiras elétricas com desligamento automático e proteção térmica nas laterais.",
            pet: "Ter à mão gaze limpa e soro fisiológico frio para resfriar a pele do animal em caso de queimaduras por óleo quente ou vapor.",
            default: "Instalar um extintor de incêndio ABC na cozinha e manter uma manta corta-fogo para abafar princípios de incêndio em frigideiras."
        },
        intoxicacao: {
            baby: "Deixar o número do Centro de Informação Toxicológica (0800-722-6001) salvo nos contatos. Nunca induzir o vômito em caso de ingestão química.",
            toddler: "Saber identificar as embalagens ingeridas para informar à equipe médica e nunca usar receitas caseiras para neutralizar venenos.",
            senior: "Manter um diário de administração de medicamentos visível para que paramédicos possam checar os remédios em caso de emergência.",
            pet: "Ter o contato do veterinário plantonista 24h anotado e saber quais sintomas indicam envenenamento (salivação excessiva, convulsões).",
            default: "Salvar o telefone do CIATox local no celular e manter carvão ativado no kit de primeiros socorros doméstico."
        },
        eletricidade: {
            baby: "Instalar o dispositivo Diferencial Residual (DR) no quadro elétrico, que corta a energia instantaneamente ao menor sinal de fuga de corrente.",
            toddler: "Instalar canaletas rígidas de proteção de fios para que a criança não consiga puxar ou mastigar as fiações elétricas.",
            pet: "Aplicar sprays amargos apropriados para pets nos cabos elétricos da casa e usar tomadas blindadas ou protetores contra mordidas.",
            default: "Instalar disjuntores termomagnéticos adequados no quadro geral e manter um alicate de corte isolado em local de fácil acesso de emergência."
        },
        gas: {
            default: "Instalar um sensor eletrônico de vazamento de gás GLP/Natural com alarme sonoro na cozinha e saber onde fica a chave geral de corte do gás."
        },
        corte: {
            baby: "Manter gaze estéril, soro fisiológico e antisséptico para limpeza rápida de ferimentos no kit de primeiros socorros do bebê.",
            child: "Ter curativos adesivos coloridos para incentivar a proteção do ferimento e saber aplicar pressão direta sobre o corte para estancar sangramentos.",
            pet: "Manter pomada cicatrizante e ataduras para conter sangramentos nas patinhas causados por cortes com vidros ou arames.",
            default: "Usar luvas de proteção grossas ao manusear cacos de vidro quebrado ou metais e ter à mão compressas estéreis e fita micropore."
        },
        sufocacao: {
            baby: "Aprender e treinar a Manobra de Heimlich para bebês menores de 1 ano (tapas nas costas e compressões no peito).",
            toddler: "Saber realizar a Manobra de Heimlich para crianças maiores e manter o telefone de emergência dos bombeiros (193) no discador rápido.",
            pet: "Conhecer a técnica de desobstrução de vias aéreas em pets e saber como agir se o animal engolir brinquedos ou pedaços de ossos.",
            default: "Ter um dispositivo extrator de corpos estranhos por vácuo (se disponível) ou saber agir rapidamente ligando para o 193/192."
        },
        iluminacao: {
            senior: "Instalar fitas antiderrapantes fotoluminescentes nas bordas de todos os degraus de escada e manter uma lanterna recarregável ao lado da cama.",
            default: "Manter luzes de emergência automáticas instaladas em pontos críticos da casa para o caso de falta de energia à noite."
        },
        janela: {
            child: "Utilizar redes de proteção certificadas e instalar travas mecânicas nas janelas que restrinjam a abertura e resistam ao peso da criança.",
            pet: "Instalar redes de proteção com malha de 3cm ou 5cm de alta resistência e vistorias frequentes das fixações para evitar rasgos.",
            default: "Manter trincos adicionais nas janelas e usar telas mosquiteiras resistentes que também criem barreira visual."
        }
    };

    for (const tag of tags) {
        const data = MITIGATION_ACTIONS[tag];
        if (data) {
            return data[profileType] || data.default || null;
        }
    }

    const keywords = Object.keys(MITIGATION_ACTIONS);
    for (const kw of keywords) {
        if (title.includes(kw)) {
            const data = MITIGATION_ACTIONS[kw];
            return data[profileType] || data.default || null;
        }
    }

    return "Ter em mãos os números dos serviços de emergência (192 SAMU, 193 Bombeiros) e possuir um kit básico de primeiros socorros montado na residência.";
}

// ─── HELPER: resolve tipo de perfil robusto ──────────────────────────────────
function resolveProfileType(profile) {
    if (!profile) return 'adult';
    const tipo = (profile.tipo || '').toLowerCase();
    if (tipo === 'pet') return 'pet';

    // Calcula idade real
    let age = parseInt(profile.idade, 10);
    if (isNaN(age) && profile.dataNascimento) {
        const birth = new Date(profile.dataNascimento);
        if (!isNaN(birth.getTime())) {
            const diff = Date.now() - birth.getTime();
            age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
    }

    if (!isNaN(age)) {
        if (age < 1) return 'baby';
        if (age <= 3) return 'toddler';
        if (age <= 12) return 'child';
        if (age <= 17) return 'teen';
        if (age >= 80) return 'senior'; // idoso avançado ainda usa 'senior'
        if (age >= 60) return 'senior';
    }

    const map = {
        baby: 'baby', toddler: 'toddler', child: 'child', crianca: 'child',
        teen: 'teen', adolescente: 'teen', adult: 'adult', adulto: 'adult',
        senior: 'senior', idoso: 'senior'
    };
    return map[tipo] || 'adult';
}

// ─── HELPER: formata localização da moradia ──────────────────────────────────
function formatLocation(moradia) {
    const parts = [];
    if (moradia.cidade) parts.push(moradia.cidade);
    if (moradia.estado) parts.push(moradia.estado);
    return parts.join('/') || null;
}

// ─── HELPER: label de tipo de perfil ─────────────────────────────────────────
function typeLabel(type, age) {
    const labels = {
        baby: 'Bebê', toddler: 'Criança pequena', child: 'Criança',
        teen: 'Adolescente', adult: 'Adulto', senior: age >= 80 ? 'Idoso(a) avançado(a)' : 'Idoso(a)', pet: 'Pet'
    };
    return labels[type] || 'Morador(a)';
}

// ─── CLASSE PRINCIPAL ─────────────────────────────────────────────────────────
class SafetyReportService {

    async getProfileResidenceStorageKey(prefix, profileId) {
        try {
            const ProfileService = require('./ProfileService').default;
            const residenceId = await ProfileService.getActiveResidenceId();
            return `${prefix}_${residenceId || 'default_home'}_${profileId}`;
        } catch (_) {
            return `${prefix}_default_home_${profileId}`;
        }
    }

    async readProfileResidenceJson(prefix, profileId) {
        const storageKey = await this.getProfileResidenceStorageKey(prefix, profileId);
        const scoped = await Storage.getItem(storageKey);
        if (scoped) {
            return { storageKey, data: JSON.parse(scoped) };
        }

        try {
            const ProfileService = require('./ProfileService').default;
            const residences = await ProfileService.getResidences();
            if (!Array.isArray(residences) || residences.length <= 1) {
                const legacyKey = `${prefix}_${profileId}`;
                const legacy = await Storage.getItem(legacyKey);
                if (legacy) {
                    return { storageKey, data: JSON.parse(legacy) };
                }
            }
        } catch (_) { }

        return { storageKey, data: {} };
    }

    async getDeepDiveReport(profileId) {
        try {
            const ProfileService = require('./ProfileService').default;
            const HealthService = require('./HealthService').default;
            const SafetyKnowledge = require('./SafetyKnowledgeService').default;
            const CS = require('./ChecklistService').ChecklistService || require('./ChecklistService').default;

            // ── 1. PERFIL ──────────────────────────────────────────────────
            const houseProfiles = await ProfileService.getPerfis();
            const profiles = await ProfileService.getAllPerfis();
            const linkedProfile = houseProfiles.find(p => p.id === profileId);
            const profile = linkedProfile || profiles.find(p => p.id === profileId);
            if (!profile) return null;

            const type = resolveProfileType(profile);
            const age = parseInt(profile.idade, 10) || null;
            const firstName = (profile.nome || '').split(' ')[0] || 'Morador';

            // ── 2. MORADIA ─────────────────────────────────────────────────
            const moradia = await ProfileService.getMoradia();
            const location = formatLocation(moradia);
            const residenceId = await ProfileService.getActiveResidenceId();
            const nomeResidencia = await ProfileService.getActiveResidenceName();
            const mapping = await ProfileService.getMapping();

            const tipoMoradia = moradia.tipo || moradia.tipoMoradia || null;
            const andar = moradia.andar || null;
            const caract = moradia.caracteristicas || [];
            const residenceRelationship = linkedProfile
                ? (linkedProfile.isVisitante ? 'frequentador' : 'habitante')
                : 'desvinculado';
            const residenceRelationshipLabel = residenceRelationship === 'frequentador'
                ? 'Visitante eventual'
                : residenceRelationship === 'habitante'
                    ? 'Morador fixo'
                    : 'Nao vinculado a esta residencia';
            const usedRoomLabels = Array.isArray(profile.comodosUsados)
                ? profile.comodosUsados
                    .map(roomId => AMBIENTES.find(a => a.id === roomId)?.nome || roomId)
                    .filter(Boolean)
                : [];

            // ── 3. SAÚDE ───────────────────────────────────────────────────
            let medications = [], treatments = [], medicalHistory = [];
            try {
                [medications, treatments, medicalHistory] = await Promise.all([
                    HealthService.getMedications(profileId),
                    HealthService.getTreatments(profileId),
                    HealthService.getMedicalHistory ? HealthService.getMedicalHistory(profileId) : Promise.resolve([])
                ]);
            } catch (_) { /* saúde é opcional */ }

            const hasMeds = medications.length > 0;
            const medNames = medications.slice(0, 3).map(m => m.nome || m.name || m).filter(Boolean).join(', ');

            // ── 4. CHECKLIST STATE ─────────────────────────────────────────
            const checklistState = await CS.getAllState(residenceId);

            // ── 5. RECONHECIMENTOS SALVOS ──────────────────────────────────
            const acknowledgments = await this.getAcknowledgments(profileId);

            // ── 6. PROCESSAR AMBIENTES ─────────────────────────────────────
            const riskItems = [];   // "nao"
            const pendingItems = [];   // sem resposta
            let answeredCount = 0;

            const isRelevant = (roomKey) => {
                const roomDef = AMBIENTES.find(a => a.id === roomKey);
                if (!roomDef) return false;
                if (roomDef.condicional === 'opcional') {
                    const k = roomKey.toLowerCase();
                    return (mapping || []).some(m => (m || '').toLowerCase().includes(k) || k.includes((m || '').toLowerCase()));
                }
                if (roomDef.condicional === 'bebe' && type !== 'baby' && type !== 'toddler') return false;
                if (roomDef.condicional === 'idoso' && type !== 'senior') return false;
                return true;
            };

            const roomKeys = Object.keys(CHECKLISTS);
            for (const roomKey of roomKeys) {
                if (!isRelevant(roomKey)) continue;

                const roomDef = AMBIENTES.find(a => a.id === roomKey);
                const roomStructure = CHECKLISTS[roomKey];
                const roomAnswers = checklistState[roomKey] || {};
                const knowledge = SafetyKnowledge.getEnvironmentInfo(roomKey, type);
                const envLabel = roomDef ? roomDef.nome : roomKey;
                const envEmoji = roomDef ? roomDef.emoji : '🏠';

                const allItems = [];
                if (roomStructure?.categorias) {
                    roomStructure.categorias.forEach(cat => {
                        if (cat.itens) allItems.push(...cat.itens);
                    });
                }

                // Resposta pelo id do item (D18) — o formato gravado e assunto
                // do ChecklistService, nao desta tela.
                const respostaDe = CS.respostasDaArea(roomAnswers);
                const PARA_RELATORIO = { conforme: 'sim', risco: 'nao', na: 'na' };

                allItems.forEach(q => {
                    const answer = PARA_RELATORIO[respostaDe(q)];
                    if (answer === 'sim' || answer === 'nao' || answer === 'na') {
                        answeredCount++;
                    }
                    const itemKey = `${roomKey}::${q.id || q.titulo}`;
                    const implication = getImplication(q, type);
                    const tip = getActionTip(q, knowledge?.tip);

                    const base = {
                        itemKey,
                        roomKey,
                        roomLabel: envLabel,
                        roomEmoji: envEmoji,
                        titulo: q.titulo || '',
                        tags: q.tags || [],
                        implication,
                        tip,
                        medidaCorretiva: getMedidaCorretiva(q, tip),
                        medidaPreventiva: getMedidaPreventiva(q, type),
                        medidaMitigacao: getMedidaMitigacao(q, type),
                        acknowledged: acknowledgments[itemKey] || null
                    };

                    if (answer === 'nao' || answer === false) {
                        riskItems.push(base);
                    } else if (answer !== 'sim' && answer !== true) {
                        pendingItems.push(base);
                    }
                });
            }

            // ── 7. SUMÁRIO EXECUTIVO NARRATIVO ─────────────────────────────
            const critCount = riskItems.filter(r => !r.acknowledged).length;
            const ackCount = riskItems.filter(r => r.acknowledged).length;
            const pendingCount = pendingItems.length;

            let executiveSummary;
            const healthContext = hasMeds && type === 'senior'
                ? ` Dado que você faz uso de medicamentos como ${medNames}, o risco de quedas e desequilíbrio merece atenção redobrada.`
                : hasMeds
                    ? ` Há medicamentos registrados — certifique-se de que estão armazenados com segurança.`
                    : '';

            if (answeredCount === 0) {
                executiveSummary = `${firstName}, sua vistoria ainda não foi iniciada. Mapeie e inspecione os ambientes para podermos gerar o diagnóstico de segurança da sua casa.`;
            } else if (critCount === 0 && pendingCount === 0) {
                executiveSummary = `${firstName}, sua vistoria está completa e não há irregularidades ativas. Excelente! Continue revisando periodicamente para manter este nível de proteção.${healthContext}`;
            } else if (critCount === 0 && pendingCount > 0) {
                executiveSummary = `${firstName}, não há riscos confirmados, mas ${pendingCount} item(ns) ainda não foram verificados. Complete a vistoria para um diagnóstico preciso.${healthContext}`;
            } else if (critCount === 1) {
                executiveSummary = `${firstName}, identificamos 1 irregularidade ativa na vistoria. Uma ação simples pode eliminar completamente esse risco.${healthContext}${ackCount > 0 ? ` Você já reconheceu ${ackCount} item(ns) anteriormente.` : ''}`;
            } else {
                executiveSummary = `${firstName}, a vistoria registrou ${critCount} irregularidade(s) ativa(s) distribuídas nos ambientes da sua residência. Abaixo estão as implicações de cada uma e as orientações para resolução.${healthContext}${ackCount > 0 ? ` ${ackCount} item(ns) foram reconhecidos por você anteriormente.` : ''}`;
            }

            // ── 8. CONTEÚDO EDITORIAL ──────────────────────────────────────
            const intro = SafetyKnowledge.getIntro(type);
            const curiosity = SafetyKnowledge.getCuriosity(type);

            return {
                profile: {
                    ...profile,
                    residenceRelationship,
                    residenceRelationshipLabel,
                    isLinkedToActiveResidence: !!linkedProfile,
                    usedRoomLabels
                },
                reportType: type,
                typeLabel: typeLabel(type, age),
                age,
                moradia: {
                    id: residenceId,
                    nome: nomeResidencia,
                    tipo: tipoMoradia,
                    andar,
                    caracteristicas: caract,
                    location,
                    vinculoPerfil: residenceRelationship,
                    vinculoPerfilLabel: residenceRelationshipLabel,
                    perfilVinculado: !!linkedProfile
                },
                health: {
                    hasMeds,
                    medNames,
                    treatments,
                    medicalHistory
                },
                executiveSummary,
                riskItems,      // irregularidades ativas (apenas "nao")
                pendingItems,   // não verificados
                intro,
                curiosity,
                otherProfiles: houseProfiles.filter(p => p.id !== profileId),
                stats: {
                    total: riskItems.length + pendingItems.length,
                    risks: riskItems.length,
                    pending: pendingItems.length,
                    acknowledged: ackCount,
                    answeredCount: answeredCount
                },
                generatedAt: new Date().toISOString()
            };

        } catch (error) {
            if (__DEV__) { console.error('SafetyReportService.getDeepDiveReport error:', error); }
            return null;
        }
    }

    /**
     * Salva o reconhecimento de risco pelo usuário.
     * O item NÃO some do relatório — apenas muda o estado visual.
     */
    async saveAcknowledgment(profileId, itemKey, responsibleName) {
        try {
            const { storageKey, data } = await this.readProfileResidenceJson('@safety_acknowledgment', profileId);

            data[itemKey] = {
                responsibleName,
                date: new Date().toISOString()
            };

            await Storage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            if (__DEV__) { console.error('saveAcknowledgment error:', e); }
            return false;
        }
    }

    /**
     * Retorna todos os reconhecimentos salvos para um perfil.
     */
    async getAcknowledgments(profileId) {
        try {
            const { storageKey, data } = await this.readProfileResidenceJson('@safety_acknowledgment', profileId);
            // D18: a chave era `ambiente::titulo` e passou a `ambiente::id`.
            // Converte na leitura (e grava), para que a revisao de texto nao
            // reabra o que o usuario ja tinha reconhecido.
            const CS = require('./ChecklistService').ChecklistService;
            let mudou = false;
            const migrado = {};
            Object.entries(data || {}).forEach(([chave, valor]) => {
                const [ambiente, ...resto] = chave.split('::');
                const id = CS.idDoItem(ambiente, resto.join('::'));
                const nova = id ? `${ambiente}::${id}` : chave;
                if (nova !== chave) mudou = true;
                if (!(nova in migrado) || nova === chave) migrado[nova] = valor;
            });
            if (mudou) await Storage.setItem(storageKey, JSON.stringify(migrado));
            return migrado;
        } catch (e) {
            return {};
        }
    }

    /**
     * Remove um reconhecimento (caso o usuário queira reabrir o item).
     */
    async removeAcknowledgment(profileId, itemKey) {
        try {
            const { storageKey, data } = await this.readProfileResidenceJson('@safety_acknowledgment', profileId);
            delete data[itemKey];
            await Storage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Gera um hash simples dos dados relevantes para detectar mudanças.
     * Quando o hash muda, o relatório IA precisa ser regenerado.
     */
    async computeDataHash(profileId) {
        try {
            const ProfileService = require('./ProfileService').default;
            const CS = require('./ChecklistService').ChecklistService || require('./ChecklistService').default;

            const houseProfiles = await ProfileService.getPerfis();
            const profiles = await ProfileService.getAllPerfis();
            const linkedProfile = houseProfiles.find(p => p.id === profileId);
            const profile = linkedProfile || profiles.find(p => p.id === profileId);
            const moradia = await ProfileService.getMoradia();
            const residenceId = await ProfileService.getActiveResidenceId();
            const checklistState = await CS.getAllState(residenceId);
            const residenceRelationship = linkedProfile
                ? (linkedProfile.isVisitante ? 'frequentador' : 'habitante')
                : 'desvinculado';

            // Concatena dados relevantes em uma string e gera hash simples
            const dataStr = JSON.stringify({
                residenceId,
                nome: profile?.nome,
                tipo: profile?.tipo,
                idade: profile?.idade,
                dataNascimento: profile?.dataNascimento,
                condicoesEspeciais: profile?.condicoesEspeciais,
                comodosUsados: profile?.comodosUsados,
                residenceRelationship,
                houseProfileIds: houseProfiles
                    .map(p => `${p.id}:${p.isVisitante ? 'frequentador' : 'habitante'}`)
                    .sort(),
                tipoImovel: moradia?.tipoImovel || moradia?.tipo,
                caracteristicas: moradia?.caracteristicas,
                estrutura: moradia?.estrutura,
                checklists: checklistState
            });

            // Hash simples (soma de char codes com rotação)
            let hash = 0;
            for (let i = 0; i < dataStr.length; i++) {
                const chr = dataStr.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Converte para int32
            }
            return String(hash);
        } catch (e) {
            if (__DEV__) { console.error('computeDataHash error:', e); }
            return String(Date.now()); // Fallback: sempre diferente → força regeneração
        }
    }

    /**
     * Retorna o Relatório Personalizado IA (Quem, Onde, O Que, Como) em formato estruturado (JSON).
     * Auto-detecta mudanças nos dados via hash e regenera automaticamente quando necessário.
     * @param {string} profileId - ID do morador.
     * @param {boolean} forceRefresh - Força re-geração na OpenAI ignorando o cache local.
     */
    async getAIAugmentedReport(profileId, forceRefresh = false) {
        try {
            const cacheKey = await this.getProfileResidenceStorageKey('@ai_report', profileId);
            const currentHash = await this.computeDataHash(profileId);

            if (!forceRefresh) {
                const { data: parsed } = await this.readProfileResidenceJson('@ai_report', profileId);
                if (parsed?.quem) {
                    // Se o hash bate, os dados não mudaram → cache válido
                    if (parsed.dataHash === currentHash) {
                        return parsed;
                    }
                    // Hash diferente → dados mudaram, cache stale (vai regenerar abaixo)
                    console.log('📊 Dados alterados detectados — regenerando relatório IA.');
                }
            }

            // Sem permissão explícita para IA, não gera (nem no PDF): o
            // relatório sai sem a seção de IA. Ver ConsentimentoIAService.
            const ConsentimentoIAService = require('./ConsentimentoIAService').default;
            if (!(await ConsentimentoIAService.temConsentimento())) return null;

            // Precisamos dos dados cruzados atuais
            const reportData = await this.getDeepDiveReport(profileId);
            if (!reportData) return null;

            if (reportData.stats?.answeredCount === 0) {
                return null;
            }

            const OpenAIService = require('./OpenAIService').default;

            const aiResponseJSON = await OpenAIService.generateConsultativeReport(reportData);

            if (aiResponseJSON && aiResponseJSON.quem) {
                // Salva cache com hash e timestamp
                const fullResponse = {
                    ...aiResponseJSON,
                    dataHash: currentHash,
                    generatedAt: new Date().toISOString()
                };
                await Storage.setItem(cacheKey, JSON.stringify(fullResponse));
                return fullResponse;
            }

            return null;
        } catch (error) {
            if (__DEV__) { console.error('Erro getAIAugmentedReport:', error); }
            // Fallback: tenta retornar cache antigo se existir
            try {
                const { data: cached } = await this.readProfileResidenceJson('@ai_report', profileId);
                if (cached?.quem) return cached;
            } catch (_) { }
            return null;
        }
    }

    async resolveRisk(profileId, riskTitle) {
        try {
            const { storageKey, data } = await this.readProfileResidenceJson('@safety_resolution', profileId);
            data[riskTitle] = { resolved: true, timestamp: new Date().toISOString() };
            await Storage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) { return false; }
    }

    async unresolveRisk(profileId, riskTitle) {
        try {
            const { storageKey, data } = await this.readProfileResidenceJson('@safety_resolution', profileId);
            delete data[riskTitle];
            await Storage.setItem(storageKey, JSON.stringify(data));
            return true;
        } catch (e) { return false; }
    }

    async generatePDFReport(profileId) {
        try {
            const reportData = await this.getDeepDiveReport(profileId);
            if (!reportData) throw new Error("Dados do relatório não encontrados");

            // IA é opcional (offline-first): se falhar/sem proxy, o relatório
            // gera mesmo assim — só sem a seção de análise estratégica.
            let aiReport = null;
            try { aiReport = await this.getAIAugmentedReport(profileId); } catch (_) { aiReport = null; }

            const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
            const when = new Date(reportData.generatedAt);
            const moradiaLinha = [reportData.moradia?.tipo || 'Casa', reportData.moradia?.location]
                .filter(Boolean).map(esc).join(' · ') || 'Não informado';

            const riskHtml = reportData.riskItems.length > 0
                ? reportData.riskItems.map((item) => `
                    <div class="card">
                        <p class="muted">${esc(item.roomLabel)}</p>
                        <h3>${esc(item.titulo)}</h3>
                        <p>${esc(item.implication || 'Risco potencial de acidente doméstico.')}</p>
                        ${item.tip ? `<p style="margin-top:8px;"><strong>Ação recomendada:</strong> ${esc(item.tip)}</p>` : ''}
                        ${(item.tags && item.tags.length) ? `<div style="margin-top:8px;">${item.tags.map((tg) => `<span class="pill">${esc(tg)}</span>`).join('')}</div>` : ''}
                    </div>`).join('')
                : '<div class="card"><p>Nenhuma irregularidade ativa foi encontrada nos ambientes vistoriados.</p></div>';

            const pendingHtml = reportData.pendingItems.length > 0
                ? `<h2>Itens pendentes de vistoria (${reportData.pendingItems.length})</h2>
                   <p class="muted">Os ambientes abaixo ainda têm itens não verificados — podem ocultar riscos reais.</p>
                   <ul class="bullets">${Array.from(new Set(reportData.pendingItems.map((p) => p.roomLabel))).map((room) => `<li>${esc(room)}</li>`).join('')}</ul>`
                : '';

            // O relatório é exportado e compartilhado (com familiares, às vezes
            // com terceiros). A seção montada por IA sai identificada como tal.
            const aiHtml = aiReport
                ? `<h2>Análise estratégica</h2>
                   <div class="card">
                       <h3>Onde focar</h3>
                       <p>${esc(aiReport.onde)}</p>
                       <h3 style="margin-top:12px;">O que fazer</h3>
                       <p>${esc(aiReport.o_que)}</p>
                       <p class="source">Seção gerada por inteligência artificial a partir das suas respostas de vistoria. Confira antes de agir.</p>
                   </div>`
                : '';

            const body = `
                <div class="lead">${esc(reportData.executiveSummary)}</div>
                <p class="muted" style="margin-top:6px;">Residência: ${moradiaLinha}</p>
                ${aiHtml}
                <h2>Irregularidades identificadas (${reportData.riskItems.length})</h2>
                ${riskHtml}
                ${pendingHtml}
                <div class="disclaimer">Este relatório é um guia de prevenção baseado nas suas respostas de vistoria. Não substitui a avaliação de um profissional de saúde ou de um especialista em segurança. Em risco imediato, ligue 192 (SAMU) ou 193 (Bombeiros).</div>`;

            const html = htmlDocument({
                title: `Relatório de Prevenção — ${esc(reportData.profile.nome)}`,
                headline: 'Relatório de Prevenção',
                subtitle: `${esc(reportData.profile.nome)} · ${esc(reportData.typeLabel)} · ${reportData.age} anos`,
                bodyHtml: body,
                footerNote: `Gerado em ${when.toLocaleDateString()} às ${when.toLocaleTimeString()} · Vigilaro Care — prevenção familiar.`,
            });

            const { uri } = await Print.printToFileAsync({ html });
            
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: 'Relatório Vigilaro Care',
                    UTI: 'com.adobe.pdf'
                });
            } else {
                return uri;
            }

            return true;
        } catch (error) {
            if (__DEV__) { console.error('generatePDFReport error:', error); }
            throw error;
        }
    }
}

export default new SafetyReportService();
