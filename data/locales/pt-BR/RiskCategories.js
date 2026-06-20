export const RISK_CATEGORIES = [
    {
        id: 'festas_eventos',
        title: 'Festas e Eventos',
        subtitle: 'Segurança em reuniões sociais',
        audience: ['adult', 'child', 'baby', 'pet'],
        icon: 'Musicnote',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
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
            { id: 'fes_1', critico: true, text: 'O acesso à piscina está bloqueado?', consequence: 'O afogamento infantil acontece em completo silêncio e em menos de 2 minutos.', checkAction: 'Tranque portões de acesso, estique redes ou use coberturas adequadas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_2', critico: true, text: 'Há um adulto dedicado a vigiar as crianças?', consequence: 'Achar que os outros estão vigiando é o maior erro de segurança em festas de família.', checkAction: 'Designe um adulto responsável por vez, sem distrações com celular.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_3', critico: true, text: 'Bebidas alcoólicas estão fora do alcance delas?', consequence: 'Crianças pequenas bebem copos largados em mesas baixas, o que causa intoxicação rápida.', checkAction: 'Deixe copos e garrafas em mesas ou balcões altos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_4', critico: true, text: 'A churrasqueira tem uma barreira de segurança?', consequence: 'Queimaduras graves em crianças ou pets que passam correndo perto da brasa.', checkAction: 'Impeça o acesso criando um limite físico de 1 metro ao redor da churrasqueira.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_5', critico: true, text: 'As facas de churrasco foram guardadas?', consequence: 'Facas grandes largadas na bancada da pia podem ser puxadas por crianças.', checkAction: 'Guarde facas e garfos de churrasco em gavetas altas logo após o uso.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_6', text: 'Você avisou os convidados sobre degraus ou desníveis?', consequence: 'Tropeções e quedas graves em pisos desconhecidos.', checkAction: 'Avise na chegada ou coloque uma fita colorida para sinalizar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_7', text: 'Os pets estão em local seguro durante a festa?', consequence: 'Bichos de estimação podem morder por estresse com o barulho ou fugir pelo portão aberto.', checkAction: 'Mantenha-os em um cômodo tranquilo ou use coleira.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_8', text: 'Os fios de extensões estão fora do caminho de passagem?', consequence: 'Tropeções em fios e risco de curtos com copos de bebidas derramados.', checkAction: 'Prenda os fios no chão com fita adesiva e afaste de locais úmidos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_9', critico: true, text: 'Se você mora em apartamento, as janelas e sacadas estão com redes?', consequence: 'Crianças de fora não conhecem o perigo de altura e podem tentar subir em móveis perto do parapeito.', checkAction: 'Mantenha janelas fechadas ou garanta que tenham telas de proteção.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_10', critico: true, text: 'Se o evento for em sítio ou chácara, poços e lagos estão cercados?', consequence: 'Crianças acostumadas com apartamento desconhecem o perigo de águas naturais.', checkAction: 'Mantenha portões trancados e proíba passeios perto da água sem adultos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_11', text: 'Idosos e convidados com limitações conhecem o local?', consequence: 'Desníveis e degraus invisíveis causam quedas perigosas na terceira idade.', checkAction: 'Acompanhe o convidado na chegada e mostre onde ficam desníveis e banheiros.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fes_12', text: 'O banheiro e as áreas de lazer são acessíveis?', consequence: 'Improvisar passagens causa acidentes com cadeirantes ou pessoas com muletas.', checkAction: 'Libere corredores e garanta portas desimpedidas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'visitacao_segura',
        title: 'Visitação Segura',
        subtitle: 'Receber ou visitar idosos e bebês',
        audience: ['adult', 'baby', 'elderly'],
        icon: 'UserAdd',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
        educational: {
            description: 'Receber visitas exige adaptar a casa para quem não a conhece. Idosos e bebês têm necessidades de segurança específicas que você pode não perceber na correria do dia a dia.',
            keyPoints: [
                'Tire capachos e tapetes soltos do caminho dos idosos.',
                'Mostre degraus e garanta boa iluminação nos corredores da casa.',
                'Proteja tomadas baixas e oculte fios elétricos se for receber bebês ou pets.',
                'Remédios e venenos devem ir para armários altos e trancados.'
            ]
        },
        questions: [
            { id: 'vis_1', critico: true, text: 'Tirou tapetes soltos e capachos do caminho?', consequence: 'Tropeções em tapetes são a maior causa de quedas de idosos em casas alheias.', checkAction: 'Remova-os ou cole fita antiderrapante embaixo.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_2', text: 'Sinalizou desníveis e pequenos degraus?', consequence: 'Visitantes não conhecem os desníveis da sua casa e podem tropeçar.', checkAction: 'Avise logo na entrada ou cole uma fita de aviso.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_3', critico: true, text: 'Tirou objetos pequenos do chão e das mesas baixas?', consequence: 'Bebês curiosos colocam moedas, botões e tampinhas na boca rápido.', checkAction: 'Dê uma olhada no chão antes das visitas chegarem.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_4', critico: true, text: 'Tampou tomadas baixas?', consequence: 'Choques em dedinhos que tentam explorar os furos da tomada.', checkAction: 'Use protetores plásticos específicos nas tomadas não usadas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_5', critico: true, text: 'Trancou remédios e produtos de limpeza?', consequence: 'Intoxicações acidentais com vidros coloridos deixados em gavetas ou debaixo da pia.', checkAction: 'Coloque tudo em armários altos ou trancados.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_6', critico: true, text: 'O banheiro tem barras ou tapete antiderrapante?', consequence: 'O piso molhado do banheiro é o local mais perigoso para idosos.', checkAction: 'Use tapete de borracha no box e disponibilize apoio.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_7', critico: true, text: 'Perguntou sobre alergias alimentares dos visitantes?', consequence: 'Ingerir alimentos proibidos por engano pode causar crises alérgicas graves.', checkAction: 'Confirme o cardápio com os convidados antes de servir.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_8', critico: true, text: 'Se você mora em apartamento, as janelas e sacadas estão travadas ou com redes?', consequence: 'Crianças que moram em casa térrea não entendem o perigo de altura.', checkAction: 'Instale redes e mantenha janelas altas travadas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_9', text: 'Se você mora em casa térrea ou sítio, a grama e quintal foram verificados?', consequence: 'Visitantes de apartamento não sabem reconhecer buracos ou animais peçonhentos.', checkAction: 'Alerte sobre calçado fechado e áreas de mato ou entulho.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_10', text: 'Garantia de acessibilidade para visitantes com deficiência?', consequence: 'Degraus soltos ou portas apertadas causam quedas graves ao improvisar.', checkAction: 'Libere acessos de cadeiras de rodas e muletas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'vis_11', text: 'Informou o convidado idoso sobre a presença de escadas ou rampas?', consequence: 'A desorientação em um novo ambiente favorece tombos sérios.', checkAction: 'Faça um tour guiado rápido com o idoso mostrando o caminho.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras_v2',
        title: 'Obras e Reformas',
        subtitle: 'Manutenções e construções ativas',
        audience: ['adult'],
        icon: 'HashtagUp',
        color: '#FF9800',
        gradient: ['#F57C00', '#FFE0B2'],
        educational: {
            description: 'Obras em casa sempre deixam o ambiente de pernas para o ar. Fios expostos provisórios e pregos ou pedaços de madeira espalhados no chão são as maiores armadilhas de acidentes.',
            keyPoints: [
                'Tranque ou isole a área em obras para evitar a entrada de crianças e pets.',
                'Desligue a chave geral no quadro de luz antes de mexer na fiação.',
                'Use sempre uma escada firme e garanta que alguém apoie a base enquanto você sobe.'
            ]
        },
        questions: [
            { id: 'obr_1', critico: true, text: 'A área da obra está trancada ou isolada?', consequence: 'Crianças e pets entram para explorar entulhos e se machucam.', checkAction: 'Feche portas ou coloque placas/tapumes impedindo a entrada.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'obr_2', critico: true, text: 'As ferramentas elétricas foram tiradas da tomada?', consequence: 'Acionamento acidental por crianças que apertam gatilhos de furadeiras ou serras.', checkAction: 'Desplugue da tomada logo após terminar o uso.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'obr_3', critico: true, text: 'Pregos, parafusos e cacos de vidro foram recolhidos?', consequence: 'Perfurações graves nos pés de quem circula descalço ou de meias.', checkAction: 'Varra o local de trabalho ao final de cada dia.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'obr_4', critico: true, text: 'Massa corrida, tintas e solventes estão trancados?', consequence: 'Risco de inalação, quebras químicas na pele e incêndio com solventes acesos.', checkAction: 'Armazene latas de tinta e solventes em local trancado e fresco.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'obr_5', critico: true, text: 'A rota de fuga da casa está livre de ferramentas?', consequence: 'Entulhos no corredor impedem a saída rápida em caso de incêndio.', checkAction: 'Mantenha portas e passagens totalmente desobstruídas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'obr_6', text: 'O entulho foi varrido ou colocado em caçamba?', consequence: 'Acúmulo de poeira e detritos pontiagudos pelo quintal.', checkAction: 'Limpe o entulho diariamente usando sacos resistentes.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'monitor_kids',
        title: 'Monitorando Crianças',
        subtitle: 'Supervisão ativa e rotina',
        audience: ['baby', 'child'],
        icon: 'eye-outline',
        color: '#009688',
        gradient: ['#00695C', '#4DB6AC'],
        educational: {
            description: 'Vigiar ativamente é a chave para evitar acidentes com os pequenos. Crianças não têm noção do perigo, são ágeis e encontram perigos em segundos.',
            keyPoints: [
                'Nunca deixe bebês sozinhos em cima de trocadores ou camas.',
                'Impeça a entrada de crianças na cozinha enquanto o fogão estiver aceso.',
                'Verifique se as redes de proteção das janelas estão firmes.',
                'Evite se distrair com o celular, TV ou redes sociais enquanto vigia as crianças.'
            ]
        },
        questions: [
            { id: 'kid_1', critico: true, text: 'Você consegue ver a criança agora?', consequence: 'Bastam alguns segundos longe da vista para o bebê mexer em algo perigoso.', checkAction: 'Mantenha contato visual ou fique perto da criança.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'kid_2', text: 'O celular está guardado ou longe de você?', consequence: 'Olhar redes sociais ou responder mensagens tira a sua atenção rápida.', checkAction: 'Deixe o celular no silencioso e foque na supervisão.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'kid_3', critico: true, text: 'As janelas do cômodo têm redes de proteção firmes?', consequence: 'Quedas de janelas ou sacadas em apartamentos são acidentes gravíssimos.', checkAction: 'Instale redes e mantenha as janelas travadas se não tiver tela.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'kid_4', critico: true, text: 'A cozinha está isolada enquanto você cozinha?', consequence: 'Queimaduras graves com respingos de gordura quente ou puxões de panelas.', checkAction: 'Feche a porta da cozinha ou use portõezinhos de proteção.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'kid_5', critico: true, text: 'Medicamentos e desinfetantes estão fora de alcance?', consequence: 'A ingestão de remédios coloridos ou cloro causa intoxicação rápida.', checkAction: 'Guarde desinfetantes e comprimidos em prateleiras bem altas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'kid_6', critico: true, text: 'Checou se não há moedas ou pilhas no chão?', consequence: 'Bebês colocam tudo na boca, gerando asfixia ou queimaduras no esôfago por baterias.', checkAction: 'Faça uma varredura visual no chão do quarto e da sala.', options: [{ label: 'Não', safe: true }, { label: 'Sim', safe: false }] }
        ]
    },
    {
        id: 'seguranca_eletrica',
        title: 'Segurança Elétrica',
        subtitle: 'Choques, fiações e áreas molhadas',
        audience: ['adult', 'elderly', 'pet'],
        icon: 'lightning-bolt',
        color: '#F59E0B',
        gradient: ['#F59E0B', '#FDE68A'],
        educational: {
            description: 'Choques elétricos matam centenas de pessoas todos os anos. Aparelhos potentes e instalações velhas sem manutenção são a principal causa de incêndios na rede elétrica.',
            keyPoints: [
                'Não ligue chuveiros ou secadores de cabelo na mesma tomada usando Ts.',
                'Fios descascados ou emendas expostas causam curto-circuito e devem ser trocados.',
                'Pisos molhados conduzem energia elétrica; nunca use aparelhos descalço.',
                'Se o pet roer fios, desligue o disjuntor geral antes de tocá-lo.'
            ]
        },
        questions: [
            { id: 'ele_1', critico: true, text: 'O seu quadro de luz tem o disjuntor DR?', consequence: 'Falta do disjuntor DR aumenta o risco de choques fatais em áreas úmidas.', checkAction: 'Peça para um eletricista instalar o dispositivo de segurança DR.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ele_2', critico: true, text: 'Você evita ligar muitos aparelhos usando adaptadores?', consequence: 'O uso de benjamins derrete os fios por sobrecarga, podendo iniciar fogo.', checkAction: 'Use apenas uma tomada para aparelhos potentes.', options: [{ label: 'Sim (Uso uma)', safe: true }, { label: 'Não (Uso adaptadores)', safe: false }] },
            { id: 'ele_3', critico: true, text: 'As tomadas não usadas têm protetores plásticos?', consequence: 'Crianças e cachorros curiosos podem lamber ou enfiar arames nas tomadas baixas.', checkAction: 'Coloque tampas plásticas em todas as tomadas que ficam perto do chão.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ele_4', critico: true, text: 'Não há fios expostos ou debaixo de tapetes?', consequence: 'Fios pisados se rompem por dentro silenciosamente, causando curtos-circuitos.', checkAction: 'Esconda os fios atrás dos móveis ou coloque canaletas.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ele_5', text: 'Você desliga o chuveiro antes de mudar a temperatura?', consequence: 'Mudar a temperatura com o chuveiro ligado e piso molhado dá choque direto.', checkAction: 'Feche a torneira e seque a mão antes de regular o chuveiro.', options: [{ label: 'Sim, desligo', safe: true }, { label: 'Mudo ligado', safe: false }] }
        ]
    },
    {
        id: 'riscos_fisicos',
        title: 'Riscos Físicos',
        subtitle: 'Quedas, Queimaduras e Engasgos',
        audience: ['adult', 'elderly', 'kid'],
        icon: 'warning',
        color: '#EF4444',
        gradient: ['#EF4444', '#FCA5A5'],
        educational: {
            description: 'Quedas no banheiro ou corredor são o maior risco de fraturas em idosos. Queimaduras com panelas quentes e engasgos com brinquedos são as principais ameaças para crianças.',
            keyPoints: [
                'Tire capachos soltos e instale luz noturna no corredor do quarto.',
                'Vire os cabos de panelas para o lado de dentro do fogão.',
                'Não compre brinquedos muito pequenos para menores de 3 anos.',
                'Instale barras de apoio na parede do chuveiro e ao lado do vaso.'
            ]
        },
        questions: [
            { id: 'fis_1', critico: true, text: 'Não há tapetes soltos no corredor ou na sala?', consequence: 'Idosos tropeçam facilmente em bordas de tapetes, caindo e quebrando ossos.', checkAction: 'Retire os tapetes de pano ou use fitas antiderrapantes.', options: [{ label: 'Sim (Tirei)', safe: true }, { label: 'Não (Tenho soltos)', safe: false }] },
            { id: 'fis_2', critico: true, text: 'O banheiro tem barras de apoio instaladas?', consequence: 'Escorregões no box do banheiro molhado causam traumatismos sérios.', checkAction: 'Parafuse barras de apoio na parede perto do chuveiro.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fis_3', critico: true, text: 'Os cabos das panelas estão virados para dentro?', consequence: 'As crianças podem alcançar e puxar os cabos, derramando óleo ou água fervendo.', checkAction: 'Vire todos os cabos das panelas para o centro do fogão.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fis_4', critico: true, text: 'Retirou moedas, chaves ou pilhas do alcance de crianças?', consequence: 'O engasgo com objetos pequenos bloqueia a respiração rapidamente.', checkAction: 'Guarde objetos miúdos em gavetas altas e fechadas.', options: [{ label: 'Sim (Recolhi)', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fis_5', text: 'Os caminhos noturnos têm luz guia ou sensor?', consequence: 'Levantar para ir ao banheiro no escuro absoluto causa desorientação e tombos.', checkAction: 'Coloque luzes fraquinhas de tomada no corredor.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'servicos_altura',
        title: 'Serviços em Altura',
        subtitle: 'Limpeza de teto e cortinas',
        audience: ['adult'],
        icon: 'ladder',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
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
            { id: 'alt_1', critico: true, text: 'Você usa uma escada firme e apropriada?', consequence: 'Subir em cadeiras ou caixas é instável e causa tombos perigosos.', checkAction: 'Adquira e use uma escada de metal aprovada para uso doméstico.', options: [{ label: 'Sim (Escada)', safe: true }, { label: 'Usei cadeira', safe: false }] },
            { id: 'alt_2', text: 'Há alguém ajudando a segurar a base da escada?', consequence: 'A escada pode escorregar lateralmente se o piso estiver liso.', checkAction: 'Chame alguém na casa para apoiar os pés na base da escada.', options: [{ label: 'Sim', safe: true }, { label: 'Estou sozinho', safe: false }] },
            { id: 'alt_3', critico: true, text: 'A escada está totalmente aberta com as travas presas?', consequence: 'Escada destravada pode fechar de repente durante a subida.', checkAction: 'Veja se o limitador de abertura está travado.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'alt_4', critico: true, text: 'O chão onde apoia a escada está seco?', consequence: 'Apoiar em piso molhado ou irregular causa escorregamento da escada.', checkAction: 'Seque o piso e limpe qualquer poeira antes de posicionar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'alt_5', text: 'Você evita se esticar para alcançar pontos distantes?', consequence: 'Inclinar o tronco para os lados desloca o peso e tomba a escada.', checkAction: 'Desça e mude a escada de lugar em vez de se esticar.', options: [{ label: 'Sim, evito', safe: true }, { label: 'Não', safe: false }] },
            { id: 'alt_6', critico: true, text: 'Se for subir no telhado ou laje, avaliou chamar um profissional?', consequence: 'Quedas de lajes e telhados quebrados costumam ser fatais.', checkAction: 'Contrate um calheiro ou telhador especializado em vez de se arriscar.', options: [{ label: 'Sim (Contratei)', safe: true }, { label: 'Vou eu mesmo', safe: false }] }
        ]
    },
    {
        id: 'faxina_quimica',
        title: 'Faxina Pesada',
        subtitle: 'Manuseio de Químicos',
        audience: ['adult'],
        icon: 'bottle-tonic-skull',
        color: '#9C27B0',
        gradient: ['#7B1FA2', '#E1BEE7'],
        educational: {
            description: 'Misturar produtos de limpeza pode soltar gases venenosos invisíveis que queimam os pulmões. Use um produto por vez e deixe a casa ventilada.',
            keyPoints: [
                'Nunca misture água sanitária com amônia, vinagre ou detergentes.',
                'Use sempre luvas de borracha para proteger a pele das mãos.',
                'Abra janelas e portas para manter o ar circulando durante a faxina.',
                'Não mude produtos de limpeza de embalagem para garrafas PET.'
            ]
        },
        questions: [
            { id: 'qui_1', critico: true, text: 'As janelas e portas da área de faxina estão abertas?', consequence: 'Vapores químicos se acumulam e causam tontura, asma e desmaios.', checkAction: 'Abra tudo para o ar circular e renovar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'qui_2', critico: true, text: 'Você evita misturar desinfetantes com água sanitária?', consequence: 'Misturas químicas geram vapores de cloro altamente tóxicos.', checkAction: 'Use apenas um produto. Enxágue bem o chão antes de passar outro.', options: [{ label: 'Sim (Não misturo)', safe: true }, { label: 'Não (Misturo)', safe: false }] },
            { id: 'qui_3', text: 'Você está calçando botas e usando luvas?', consequence: 'O cloro e ácidos causam dermatite e queimaduras químicas na pele.', checkAction: 'Calce luvas de borracha antes de começar a mexer com os baldes.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'qui_4', critico: true, text: 'Crianças e cachorros estão longe da faxina?', consequence: 'Eles respiram os vapores rentes ao chão ou podem beber a água suja do balde.', checkAction: 'Mantenha-os em outro cômodo ou fora de casa até secar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'qui_5', critico: true, text: 'Os produtos estão nas garrafas originais de fábrica?', consequence: 'Guardar desinfetante ou cloro em garrafa de suco causa envenenamento por engano.', checkAction: 'Nunca troque os produtos de embalagem.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'qui_6', text: 'Você avisou a família que o piso está molhado?', consequence: 'Escorregões no chão ensaboado geram tombos perigosos.', checkAction: 'Coloque uma cadeira de aviso ou alerte todos na casa.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras',
        title: 'Reformas e Obras',
        subtitle: 'Segurança na construção',
        audience: ['adult'],
        icon: 'hammer-wrench',
        color: '#795548',
        gradient: ['#5D4037', '#D7CCC8'],
        educational: {
            description: 'Fios provisórios cortados, escadas soltas e restos de entulho com pregos escondidos são os grandes causadores de cortes e fraturas durante obras.',
            keyPoints: [
                'Tranque e isole o cômodo em obras para nenhuma criança entrar.',
                'Use botas com solado grosso e luvas grossas de proteção.',
                'Desligue as ferramentas da tomada quando terminar o serviço.'
            ]
        },
        questions: [
            { id: 'ref_1', text: 'A sala/cômodo da obra está fechado?', consequence: 'Crianças entram escondidas para brincar com pedras e madeiras pesadas.', checkAction: 'Mantenha a porta trancada ou coloque tapumes.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ref_2', critico: true, text: 'Pregos e pontas de madeira foram guardados?', consequence: 'Pisar em pregos enferrujados causa cortes infecciosos e risco de tétano.', checkAction: 'Dobre pontas de pregos com martelo ou jogue as sobras no lixo.', options: [{ label: 'Sim (Recolhi)', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ref_3', text: 'Você e os ajudantes usam óculos e luvas de proteção?', consequence: 'Fagulhas de metal ou pedaços de tijolo batendo no olho causam cegueira.', checkAction: 'Coloque óculos de proteção antes de cortar ou martelar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ref_4', critico: true, text: 'Fios elétricos estão longe de baldes e poças de água?', consequence: 'Curto-circuito e choques gravíssimos ao pisar na água molhada com fios.', checkAction: 'Organize as extensões longe de umidade e canos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'ref_5', text: 'Desliga os disjuntores da área ao fim do expediente?', consequence: 'Instalações provisórias de obra podem aquecer à noite e pegar fogo.', checkAction: 'Desligue a chave geral da fiação da obra antes de ir dormir.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'jardinagem',
        title: 'Jardinagem e Hortas Domésticas',
        subtitle: 'Cuidado no quintal',
        audience: ['adult'],
        icon: 'flower',
        color: '#4CAF50',
        gradient: ['#388E3C', '#A5D6A7'],
        educational: {
            description: 'Mexer na horta ou jardim é relaxante, mas exige cuidados com ferramentas de poda, plantas venenosas e picadas de aranha ou escorpião escondidos em vasos.',
            keyPoints: [
                'Calce botas de borracha e luvas de raspa grossa ao capinar.',
                'Identifique e remova plantas venenosas se tiver pets em casa.',
                'Desligue cortadores de grama da tomada antes de mexer na lâmina.',
                'Evite carregar vasos muito pesados sozinho (proteja sua coluna).'
            ]
        },
        questions: [
            { id: 'jar_1', critico: true, text: 'Você usa botas e luvas de raspa de couro?', consequence: 'Picadas de aranhas ou escorpiões que ficam sob folhas secas e terra.', checkAction: 'Calce botas de cano alto e luvas grossas antes de mexer no mato.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'jar_2', critico: true, text: 'Checou se não há plantas venenosas ao alcance de animais?', consequence: 'Gatos roem folhas e podem ter falência renal rápida com plantas tóxicas.', checkAction: 'Pesquise e separe plantas como Lírios e Comigo-Ninguém-Pode.', options: [{ label: 'Sim (Chequei)', safe: true }, { label: 'Não sei', safe: false }] },
            { id: 'jar_3', critico: true, text: 'O cortador de grama está desplugado da tomada?', consequence: 'Acionamento repentino das lâminas ao limpar restos de mato travado.', checkAction: 'Retire o fio da tomada antes de colocar as mãos perto da lâmina.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'jar_4', text: 'Está evitando trabalhar no sol forte do meio-dia?', consequence: 'Desidratação, insolação e quedas de pressão causadas pelo calor.', checkAction: 'Trabalhe no início da manhã ou fim da tarde. Use chapéu.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'jar_5', text: 'Bateu e sacudiu vasos pesados antes de movê-los?', consequence: 'Escorpiões gostam de se abrigar sob o pratinho úmido dos vasos.', checkAction: 'Use um graveto para afastar folhas e olhe embaixo dos vasos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'jar_6', text: 'Guardou enxadas, ancinhos e tesouras em local alto?', consequence: 'Crianças pisam em dentes de ancinho ou caem sobre tesouras de poda cortantes.', checkAction: 'Organize as ferramentas no depósito logo após terminar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'ferramentas',
        title: 'Uso de Ferramentas',
        subtitle: 'Manuais e Elétricas',
        audience: ['adult'],
        icon: 'screwdriver',
        color: '#607D8B',
        gradient: ['#455A64', '#CFD8DC'],
        educational: {
            description: 'Facas usadas como chaves de fenda, serras sem capa protetora ou brocas gastas causam cortes e batidas violentas nas mãos. Use a ferramenta certa para cada serviço.',
            keyPoints: [
                'Não improvise ferramentas (não use faca de cozinha no lugar de chaves).',
                'Inspecione os fios de lixadeiras e furadeiras elétricas.',
                'Use óculos para proteger os olhos contra pedacinhos de ferro ou madeira.',
                'Mantenha maletas de ferramentas trancadas e fora do alcance de crianças.'
            ]
        },
        questions: [
            { id: 'fer_1', text: 'A ferramenta escolhida é a correta para o serviço?', consequence: 'Improvisar ferramentas desgasta o material, escapa e causa cortes nas mãos.', checkAction: 'Busque a ferramenta certa na maleta.', options: [{ label: 'Sim', safe: true }, { label: 'Improviso', safe: false }] },
            { id: 'fer_2', text: 'Você colocou os óculos de proteção?', consequence: 'Fagulhas de esmeril ou lascas de madeira voando direto nos olhos causam cegueira.', checkAction: 'Coloque os óculos de segurança antes de ligar a máquina.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fer_3', critico: true, text: 'Os cabos das ferramentas elétricas estão inteiros?', consequence: 'Fios desencapados dão choques perigosos nas mãos molhadas de suor.', checkAction: 'Inspecione a fiação do aparelho antes de ligar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fer_4', critico: true, text: 'A capa de proteção original da serra ou lixadeira está instalada?', consequence: 'Remover a proteção expõe a lâmina de corte, gerando risco de amputações.', checkAction: 'Nunca retire as proteções de fábrica dos aparelhos.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'fer_5', text: 'As ferramentas serão recolhidas e trancadas após o serviço?', consequence: 'Crianças menores pegam chaves e martelos pesados para brincar.', checkAction: 'Guarde tudo dentro da maleta fechada em local alto.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'toys_games',
        title: 'Brinquedos e Brincadeiras',
        subtitle: 'Diversão com segurança',
        audience: ['baby', 'child'],
        icon: 'toy-brick',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
        educational: {
            description: 'Brinquedos inadequados são a maior causa de engasgos e asfixia. A escolha certa da faixa etária e a supervisão ativa evitam acidentes graves.',
            keyPoints: [
                'Cheque se o brinquedo tem o selo do INMETRO e a idade indicada na caixa.',
                '⚠️ BATERIAS BOTÃO (redondas): se engolidas, causam queimadura química interna letal em menos de 2 horas. Veja se a tampa é parafusada.',
                'Não compre brinquedos com cordas ou fitas compridas (risco de estrangulamento).',
                'Esvazie piscinas infláveis e baldes com água logo após o término da brincadeira.'
            ]
        },
        questions: [
            { id: 'toy_1', text: 'Os brinquedos têm selo Inmetro e idade adequada?', consequence: 'Brinquedos para crianças maiores contêm peças minúsculas que bebês engolem.', checkAction: 'Cheque a indicação etária na embalagem antes de dar o brinquedo.', options: [{ label: 'Sim', safe: true }, { label: 'Não sei', safe: false }] },
            { id: 'toy_2', critico: true, text: 'O compartimento de pilhas do brinquedo está parafusado?', consequence: 'Baterias redondas de lítio engolidas corroem o esôfago rapidamente por reações químicas.', checkAction: 'Garanta que a tampa esteja travada com parafuso, nunca fita adesiva.', options: [{ label: 'Sim (Parafusado)', safe: true }, { label: 'Não', safe: false }] },
            { id: 'toy_3', critico: true, text: 'Os brinquedos não têm fios ou cordas longas?', consequence: 'Risco de estrangulamento no pescoço de bebês menores de 3 anos.', checkAction: 'Corte ou remova fios e cordas com mais de 15 centímetros de comprimento.', options: [{ label: 'Sim (Sem cordas)', safe: true }, { label: 'Não', safe: false }] },
            { id: 'toy_4', critico: true, text: 'Os sacos plásticos das embalagens foram jogados na lixeira?', consequence: 'Bebês colocam sacos de plástico no rosto, gerando sufocamento rápido.', checkAction: 'Descarte os plásticos das caixas na mesma hora.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'toy_5', text: 'A criança usa capacete ao andar de bicicleta ou patinete?', consequence: 'Quedas sem proteção na cabeça são a maior causa de traumas infantis graves.', checkAction: 'O uso de capacete afivelado deve ser obrigatório para brincar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'toy_6', critico: true, text: 'A piscina de plástico será esvaziada agora?', consequence: 'Afogamentos infantis ocorrem em vãos com menos de 10 centímetros de água.', checkAction: 'Esvazie e dobre a piscina inflável logo após o banho.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'mudanca_residencia',
        title: 'Mudança de Residência',
        subtitle: 'Segurança no novo lar',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'HomeHash',
        color: '#FF5722',
        gradient: ['#BF360C', '#FF8A65'],
        educational: {
            description: 'Novas casas trazem novidades perigosas: tomadas sem proteção, janelas altas sem rede e caixas pesadas empilhadas que podem tombar sobre os pequenos.',
            keyPoints: [
                'Descubra onde fica a chave geral de energia e o registro de gás logo no primeiro dia.',
                'Instale as redes de proteção nas janelas antes de trazer as caixas.',
                'Parafuse estantes, cômodas e armários altos na parede para não tombarem.'
            ]
        },
        questions: [
            { id: 'mud_1', critico: true, text: 'Instalou as telas de segurança em janelas e sacadas?', consequence: 'Crianças e gatos assustados com a mudança tentam explorar vãos de janelas altas.', checkAction: 'Mantenha janelas trancadas até a empresa instalar as redes.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'mud_2', critico: true, text: 'Os móveis altos foram parafusados na parede?', consequence: 'Cômodas e armários tombam quando as crianças tentam escalar as gavetas.', checkAction: 'Fixe os móveis com suportes metálicos anti-tombamento.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'mud_3', text: 'Você sabe onde desligar a energia e fechar o gás?', consequence: 'Em vazamentos ou curtos, a demora para achar os registros gera incêndios.', checkAction: 'Localize a chave geral e o registro de gás do novo lar.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'mud_4', text: 'As pilhas de caixas estão firmes e longe dos corredores?', consequence: 'Caixas altas desabam sobre crianças ou bloqueiam as portas de saída.', checkAction: 'Empilhe poucas caixas de cada vez e encostadas na parede.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'mud_5', text: 'Inspecionou as tomadas e fiações do novo imóvel?', consequence: 'Instalações antigas podem esquentar ou dar curto-circuito com aparelhos novos.', checkAction: 'Teste disjuntores e cheque se há fios soltos nas paredes.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'mud_6', text: 'Há alguém encarregado exclusivamente de cuidar dos filhos/pets na mudança?', consequence: 'Portas e portões abertos o tempo todo facilitam fugas ou quedas na rua.', checkAction: 'Deixe as crianças e pets com familiares ou trancados em um quarto seguro.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    },
    {
        id: 'vazamento_gas',
        title: 'Vazamento de Gás (GLP)',
        subtitle: 'Botijão e instalações de gás',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'Danger',
        color: '#D32F2F',
        gradient: ['#B71C1C', '#EF9A9A'],
        educational: {
            description: 'O gás de cozinha é mais pesado que o ar e se acumula no chão. Em ambientes fechados, qualquer faísca leve — até a do interruptor de luz — pode causar uma explosão violenta.',
            keyPoints: [
                'NUNCA acenda luzes, risque fósforos ou mexa em tomadas se sentir cheiro de gás.',
                'Não utilize o celular dentro do cômodo afetado.',
                'Abra portas e janelas na hora para o gás sair, feche o botijão e saia de casa.',
                'Ligue para os Bombeiros no 193 de um local aberto na calçada.'
            ]
        },
        questions: [
            { id: 'gas_1', critico: true, text: 'Você já saiu de casa sem mexer em nada elétrico?', consequence: 'Acionar interruptores ou tomadas gera faíscas que detonam o gás acumulado.', checkAction: 'Saia do imóvel imediatamente, deixando a fiação intacta.', options: [{ label: 'Sim, saí', safe: true }, { label: 'Ainda dentro', safe: false }] },
            { id: 'gas_2', critico: true, text: 'O registro de segurança do botijão está fechado?', consequence: 'O gás continuará vazando se a válvula estiver aberta.', checkAction: 'Gire a chave do regulador do botijão no sentido horário.', options: [{ label: 'Sim, fechei', safe: true }, { label: 'Não sei', safe: false }] },
            { id: 'gas_3', critico: true, text: 'As janelas e portas foram abertas antes de sair?', consequence: 'O gás GLP precisa dispersar ao ar livre para perder o poder de explosão.', checkAction: 'Abra tudo o que puder de janelas e portas rapidamente.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] },
            { id: 'gas_4', critico: true, text: 'Usou o celular apenas fora de casa?', consequence: 'Aparelhos celulares em funcionamento podem gerar faíscas elétricas internas.', checkAction: 'Use o telefone somente do lado de fora do imóvel.', options: [{ label: 'Sim', safe: true }, { label: 'Usei dentro', safe: false }] },
            { id: 'gas_5', critico: true, text: 'Os bombeiros (193) já foram avisados?', consequence: 'Vazamentos grandes precisam de técnicos e bombeiros para liberar a volta.', checkAction: 'Ligue 193 na calçada e relate o cheiro forte de gás.', options: [{ label: 'Sim', safe: true }, { label: 'Não', safe: false }] }
        ]
    }
];

export default RISK_CATEGORIES;
