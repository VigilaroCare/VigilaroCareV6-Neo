/**
 * data/knowledge_prevencao.js
 * 
 * Base de dados consultiva para o módulo educacional de Prevenção por Ambientes.
 * Textos aprofundados, ricos e formatados para leitura estilo "artigo", 
 * servindo como a consultoria premium do app.
 */

export const MAPA_PREVENCAO = {
    sala: {
        id: 'sala',
        nome: 'Sala de Estar',
        emoji: '🛋️',
        cor: '#9C27B0',
        capa: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A sala de estar é o coração da casa, mas também o local onde mais ocorrem pequenos acidentes domésticos devido ao alto fluxo de circulação.'
            },
            {
                tipo: 'topico',
                titulo: 'A Ameaça Silenciosa dos Móveis',
                texto: 'Estantes, racks e aparelhos de TV que não estão firmemente fixados na parede (anti-tombamento) representam um risco crítico, especialmente para crianças pequenas que utilizam gavetas como "escadas". A recomendação é sempre ancorar móveis pesados usando fitas de segurança ou buchas adequadas.'
            },
            {
                tipo: 'topico',
                titulo: 'Quedas e Tropeços',
                texto: 'Cerca de 30% das quedas de idosos ocorrem na sala de estar. Tapetes soltos, fios de eletrônicos atravessando o chão e mesas de centro de vidro pontiagudas são os maiores vilões. Utilize fitas antiderrapantes sob os tapetes ou remova-os completamente se houver idosos na casa. Organize os fios atrás dos móveis ou use canaletas.'
            },
            {
                tipo: 'dica',
                texto: 'Proteja as quinas! Mesas de centro e racks com bordas vivas devem receber protetores de silicone para evitar lesões graves na cabeça de bebês e crianças em fase de aprendizado a andar.'
            }
        ]
    },
    cozinha: {
        id: 'cozinha',
        nome: 'Cozinha',
        emoji: '🍳',
        cor: '#FF9800',
        capa: 'https://images.unsplash.com/photo-1556910103-1c02745a8728?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Estatisticamente, a cozinha é o ambiente mais perigoso de toda a residência. Fogo, lâminas, gás e água fervente coabitam este espaço.'
            },
            {
                tipo: 'topico',
                titulo: 'Regras de Ouro no Fogão',
                texto: 'A regra número um da cozinha é: priorize sempre as bocas de trás do fogão. Cabos de panelas devem ficar virados para o centro ou para trás, nunca voltados para a borda. Uma panela de água fervente virada sobre uma criança causa queimaduras de 2º e 3º grau irreversíveis.'
            },
            {
                tipo: 'topico',
                titulo: 'Armazenamento de Químicos',
                texto: 'Produtos de limpeza (soda cáustica, desengordurantes, água sanitária) são frequentemente guardados sob a pia. Para a ótica de uma criança inspecionando armários baixos, embalagens coloridas parecem sucos. Guarde todos os produtos químicos em armários altos ou, se não for possível, instale travas magnéticas de segurança nas portas inferiores.'
            },
            {
                tipo: 'topico',
                titulo: 'Cortes e Eletrodomésticos',
                texto: 'Facas afiadas não devem ficar secando soltas no escorredor; guarde-as em blocos de madeira ou gavetas específicas ao terminar. Eletrodomésticos com lâminas (liquidificadores, processadores) devem ser mantidos fora da tomada enquanto não estiverem em uso direto.'
            },
            {
                tipo: 'dica',
                texto: 'Evite toalhas de mesa compridas se houver crianças. Puxar a ponta da toalha é um instinto comum que pode trazer todo o conteúdo quente de pratos e travessas diretamente sobre elas.'
            }
        ]
    },
    banheiro: {
        id: 'banheiro',
        nome: 'Banheiro',
        emoji: '🚿',
        cor: '#2196F3',
        capa: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Água e superfícies lisas formam uma combinação fatal. O banheiro exige atenção extrema à aderência e organização.'
            },
            {
                tipo: 'topico',
                titulo: 'A Regra Anti-Afogamento',
                texto: 'Crianças pequenas podem se afogar em apenas 3 dedos de água. Nunca, sob nenhuma circunstância, deixe bacias, baldes ou banheiras cheias de água desacompanhadas. Após o banho infantil, esvazie imediatamente os recipientes. A tampa do vaso sanitário deve permanecer abaixada e, idealmente, travada com um fecho de segurança.'
            },
            {
                tipo: 'topico',
                titulo: 'Quedas no Banho',
                texto: 'Tanto para crianças curioas quanto para idosos, o box do chuveiro é uma pista escorregadia. Tapetes de sucção antiderrapantes dentro do box são mandatórios. Para idosos, a instalação de barras de apoio (fixadas com parafusos, jamais ventosas) dentro do box e ao lado do vaso sanitário pode salvar vidas e garantir autonomia.'
            },
            {
                tipo: 'topico',
                titulo: 'Medicamentos e Eletricidade',
                texto: 'Apesar de comum, o armário de espelho do banheiro sofre com umidade e não é o ideal para a eficácia de remédios. Pior: coloca drogas ao alcance fácil. Guarde medicamentos em caixas altas. Mantenha secadores de cabelo e barbeadores elétricos longe da borda da pia e sempre desconectados após o uso.'
            }
        ]
    },
    quarto_bebe: {
        id: 'quarto_bebe',
        nome: 'Quarto de Bebê',
        emoji: '👶',
        cor: '#FF4081',
        capa: 'https://images.unsplash.com/photo-1522771731472-76fa83eede82?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O berço deve ser o lugar mais seguro do mundo. Infelizmente, práticas estéticas muitas vezes ignoram protocolos vitais de segurança.'
            },
            {
                tipo: 'topico',
                titulo: 'O Berço Nu',
                texto: 'A Sociedade Brasileira de Pediatria é clara: até os 12 meses de idade, o berço deve ser vazio. Sem travesseiros, sem cobertores soltos, sem pelúcias e, principalmente, SEM kits de berço (protetores laterais acolchoados). O risco de morte súbita e asfixia mecânica por rolamento contra as laterais fofas é altíssimo. Use apenas um lençol bem preso de elástico e sacos de dormir para o bebê, se estiver frio.'
            },
            {
                tipo: 'topico',
                titulo: 'Distâncias Vitais',
                texto: 'O berço nunca deve encostar em janelas e deve estar distante das cordas de persianas ou cortinas, que apresentam severo risco de estrangulamento. O espaçamento perfeito das grades não deve permitir a passagem da cabeça do bebê.'
            },
            {
                tipo: 'dica',
                texto: 'Troca de fraldas não tem pausa: mantenha sempre uma mão sobre o bebê, mesmo que você precise se esticar para alcançar um lençol.'
            }
        ]
    },
    quarto_crianca: {
        id: 'quarto_crianca',
        nome: 'Quarto Infantil',
        emoji: '🧸',
        cor: '#E91E63',
        capa: 'https://plus.unsplash.com/premium_photo-1661877395066-82f2c83ffdc1?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Um reino de brincadeiras precisa blindar a criatividade da criança contra armadilhas estruturais.'
            },
            {
                tipo: 'topico',
                titulo: 'Ameaça de Altura: Janelas e Móveis',
                texto: 'Redes de proteção nas janelas são a defesa máxima e devem ser instaladas e revisadas a cada 3 a 5 anos. Crianças gostam de escalar. Além de telas, certifique-se de que não haja poltronas e camas posicionadas logo abaixo das janelas.'
            },
            {
                tipo: 'topico',
                titulo: 'O Teste do Rolo de Papel',
                texto: 'Para crianças menores de 3 anos, engasgos com peças pequenas são comuns. Uma boa métrica é o tubo de papel higiênico: se a peça do brinquedo couber inteira e passar livremente por dentro de um rolo vazio, ela é pequena demais e representa risco letal de asfixia. Banir esses brinquedos num ambiente para crianças curiosas.'
            },
            {
                tipo: 'topico',
                titulo: 'Eletricidade ao Alcance',
                texto: 'O quarto precisa ter todas as tomadas que não estão em uso travadas com protetores isolantes. Brinquedos eletrônicos que levam "pilhas moeda/botão" (aquelas redondinhas) devem ter seus compartimentos PARAFUSADOS firmemente. A ingestão de pilhas botão queima as paredes do esôfago em poucas horas através de uma grave reação química.'
            }
        ]
    },
    quarto_idoso: {
        id: 'quarto_idoso',
        nome: 'Quarto do Idoso',
        emoji: '👴',
        cor: '#8D6E63',
        capa: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O santuário de repouso necessita de visão clara noturna e zero barreiras para garantir a plenitude da estabilidade de marcha.'
            },
            {
                tipo: 'topico',
                titulo: 'A Visão Noturna',
                texto: 'Ir ao banheiro de madrugada é a situação de risco mais grave. O quarto de alguém da Terceira Idade deve ter abajures muito perto da cama ou luzes noturnas que fiquem esmaecidas na base das paredes (footlights) e mostrem nitidamente o caminho desimpedido até a casa de banho.'
            },
            {
                tipo: 'topico',
                titulo: 'Cama e Mobilidade',
                texto: 'A altura da cama importa de verdade. Colchões baixos demais farão o idoso pender pra trás ao se levantar; altos demais forçam a descida brusca. Eles devem conseguir tocar a planta inteira dos pés no chão de uma vez ao se sentarem nas bordas. Uma cama firme com apoio central é essencial.'
            },
            {
                tipo: 'dica',
                texto: 'Jamais deixe chinelos flácidos sem solado liso para uso. Evite o terror silencioso das pontas enroladas de tapete. Reduza a fricção ao mínimo entre o ato de acordar e levantar.'
            }
        ]
    },
    area_servico: {
        id: 'area_servico',
        nome: 'Área de Serviço',
        emoji: '🧺',
        cor: '#00BCD4',
        capa: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O bunker técnico da lavanderia reúne potentes fatores de risco: alto fluxo elétrico de máquinas superpotentes, venenos puros de limpeza e pisos habitualmente molhados.'
            },
            {
                tipo: 'topico',
                titulo: 'Máquinas e Vasos de Água',
                texto: 'A regra do Balde Vazio permanece. Baldes de molho, encharcados, atraem invariavelmente crianças hiperativas e engatinhantes que tropeçam em mergulhos fatais. Mantenham os tanques e baldes secos ou rigorosamente inacessíveis com portões na lavanderia. O uso de fios em extensões para alimentar a secadora e máquina de lavar deve ser severamente evitado pela potência e risco de incêndio por superaquecimento (efeito joule).'
            },
            {
                tipo: 'topico',
                titulo: 'Biológico e Químico',
                texto: 'Venenos e Limpeza devem seguir em suas garrafas de rótulo nativos, JAMAIS faça transbordo para vidros de refrigerante para repousar atrás da máquina de lavar. Crianças engolem líquidos de garrafas pet num átomo de segundo. E os estrados vazios são chamarizes ocultos de abrigo de Escorpiões no verão tropical, mantenha o local impecável.'
            }
        ]
    },
    central_gas: {
        id: 'central_gas',
        nome: 'Central de Gás',
        emoji: '🔥',
        cor: '#D32F2F',
        capa: 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'O poder adormecido do Gás GLP condicionado não perdoa a falha de ignorância na ventilação e na sua estrutura de confinamento.'
            },
            {
                tipo: 'topico',
                titulo: 'Posicionamento e Ventilação',
                texto: 'Botijões P13 e grandes cilindros P45 em residências ou casas térreas nunca deveriam dormir em locais enclausurados e porões que são a base ou descida da casa (o GLP desce ao escapar da mangueira porque ele é mais denso - pesado - que o ar normal da terra). A válvula sempre exposta em armários treliçados e gradeados que recebam ar corrente.'
            },
            {
                tipo: 'dica',
                texto: 'Desapegue da cultura da esponja na dúvida de cheiro misterioso de alho! Regra máxima de cheiro pesado do merçaptano: jamais ligue um interruptor elétrico de luz na tentativa de clarear as coisas, isso causa e detona faíscas invisíveis.'
            }
        ]
    },
    escadas: {
        id: 'escadas',
        nome: 'Escadas & Degraus',
        emoji: '🪜',
        cor: '#F44336',
        capa: 'https://images.unsplash.com/photo-1517409413231-57640306c4b2?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'A gravidade sempre vence na ausência de limites e aderência. Toda escada deveria receber a atenção equivalente de uma obra militar em uma casa povoada de extremidades geracionais.'
            },
            {
                tipo: 'topico',
                titulo: 'Baby Gates Infalíveis',
                texto: 'O principal terror da gravidade nos andares de casas com crianças é achar que elas não possuem forca na base. Você JAMAIS coloca trava tipo "Sanfona" na borda das escadas. O trincos da Barreira do Baby Gate (No Topo e Base) precisarão estar afixados e não colados nas paredes, submetidos e tensionados para segurar o empurrão visceral de peso em corrida de um jovem com 15 a 20 Kilos de embate, além de um adulto.'
            },
            {
                tipo: 'dica',
                texto: 'Fitas aderentes antiderrapantes refletidas (fotoluminescente) deveriam desenhar a risca horizontal de escadas longas esguias.'
            }
        ]
    },
    piscina: {
        id: 'piscina',
        nome: 'Piscina & Área Molhada',
        emoji: '🏊',
        cor: '#03A9F4',
        capa: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800',
        conteudo: [
            {
                tipo: 'destaque',
                texto: 'Afogamentos são predominantemente mudos, velozes e a forma suprema de letalidade entre crianças de 1 a 4 anos no verão domiciliar.'
            },
            {
                tipo: 'topico',
                titulo: 'Engajamento Ocular Direto e os 10 Segundos',
                texto: 'O celular apagou a vigília das bordas, nós entramos no erro passivo de delegação assumindo sempre que "o outro vizinho com a caipirinha na mão" ou até mesmo o tio jovem olhariam as águas com você. Em casa de família, não há revezamento imaginário. Quando na piscina, existe a técnica de "Cão Pastor de Águas", um adulto designado, em turnos marcados por temporalidade que NÃO tem seu celular junto ao corpo e que sua função se delimita exclusivamente o observar constante a fenda submersa para captar e fisgar crianças afogando que mal esbanjam sons porque afogamento cala o grito instintivamente para lutar pelo ar.'
            },
            {
                tipo: 'topico',
                titulo: 'Barreiras Rígidas na Engenharia',
                texto: 'Por fim, quando ninguém vigia as bordas de madrugada, cercas de fixação dura com trancas complexas além das capas plásticas infláveis salva 75% dos desastres de fugas pela sala. Use Alarmes Subaquáticos ou na Borda nas casas noturnas, que ativam sirene em impacto contundente.'
            }
        ]
    }
};

export const getConteudoPrevencao = (ambienteId) => {
    const mapaSinonimos = {
        'banheiros': 'banheiro',
        'lavanderia': 'area_servico',
        'quartos': 'quarto_idoso', // fallback for general quartos
        'varanda': 'sala',
        'quintal': 'piscina', // generic outdoors fallback
        'garagem': 'area_servico',
        'areas_coletivas': 'piscina'
    };
    
    // Tenta encontrar o ambiente pelo ID ou por fallback de tradução 
    const idBusca = mapaSinonimos[ambienteId] || ambienteId;
    return MAPA_PREVENCAO[idBusca] || MAPA_PREVENCAO.sala; // Fallback generico educativo 
};
