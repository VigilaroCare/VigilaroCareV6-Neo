/**
 * TravelSafetyGuideScreen — Guia de Segurança PERSONALIZADO do Modo Viagem.
 *
 * Princípio (autor, 2026-06-12): personalização efetiva = cruzar o briefing
 * da viagem (tipo de destino · propósito · internacional · quem vai) e montar
 * o guia só com o que importa para ESTA viagem. Máxima do app: não ser
 * omisso, não ser prolixo — o recorte relevante vem primeiro, e o botão
 * "ver guia completo" garante acesso a todo o conteúdo.
 *
 * Fontes do conteúdo: acervo didático do app, preveniremcasa.com.br,
 * criancasegura.org, SBP e SBGG (curadoria do autor, Téc. Seg. do Trabalho).
 */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../../utils/getLocalizedField';

// ─────────────────────────────────────────────────────────────────────────
// POOL DE SEÇÕES — cada uma etiquetada com as condições do briefing que a
// tornam relevante (OR entre grupos). prio ordena: companhia (1) > destino
// (2) > propósito (3) > internacional (4) > sempre (5). Sem etiqueta = só
// aparece no "guia completo".
// ─────────────────────────────────────────────────────────────────────────
const GUIDE_SECTIONS = [
    {
        id: 'idosos', prio: 1, companions: ['hasElderly'], icon: 'Elderly',
        title: 'Idosos Fora de Casa', title_en: 'Older Adults Away From Home', title_es: 'Adultos Mayores Fuera de Casa',
        content: 'Ambiente novo é o principal gatilho de quedas em idosos: layout desconhecido, banheiro diferente, pisos e tapetes imprevisíveis.',
        content_en: 'A new environment is the main fall trigger for older adults: unfamiliar layout, a different bathroom, unpredictable floors and rugs.',
        content_es: 'Un ambiente nuevo es el principal desencadenante de caídas en mayores: distribución desconocida, baño diferente, pisos y alfombras imprevisibles.',
        bullets: ['No primeiro dia, percorram juntos o caminho quarto-banheiro e deixe uma luz noturna acesa.', 'Afaste tapetes soltos e use calçado antiderrapante desde a chegada.', 'Mantenha a medicação nos MESMOS horários de casa — viagem não muda prescrição.'],
        bullets_en: ['On day one, walk the bedroom-bathroom path together and leave a night light on.', 'Move loose rugs away and use non-slip footwear from arrival.', 'Keep medication at the SAME times as at home — travel does not change prescriptions.'],
        bullets_es: ['El primer día, recorran juntos el camino habitación-baño y deje una luz nocturna encendida.', 'Aparte las alfombras sueltas y use calzado antideslizante desde la llegada.', 'Mantenga la medicación en los MISMOS horarios de casa — viajar no cambia la prescripción.'],
    },
    {
        id: 'criancas_agua', prio: 1, companions: ['hasKids'], icon: 'SwimmingPool',
        title: 'Crianças e Água', title_en: 'Children and Water', title_es: 'Niños y Agua',
        content: 'Afogamento é silencioso e leva segundos — e em viagem a água é novidade irresistível para a criança.',
        content_en: 'Drowning is silent and takes seconds — and when traveling, water is an irresistible novelty for children.',
        content_es: 'El ahogamiento es silencioso y toma segundos — y en viaje el agua es una novedad irresistible para los niños.',
        bullets: ['Regra de ouro: sem adulto DENTRO ou na borda, sem água. Sempre.', 'Nomeie um "vigia da água" por turnos — distração coletiva é o cenário clássico.', 'Colete salva-vidas em barcos e rios; boia de braço é brinquedo, não segurança.'],
        bullets_en: ['Golden rule: no adult IN the water or at the edge, no water. Always.', 'Appoint a "water watcher" in shifts — collective distraction is the classic scenario.', 'Life jackets on boats and rivers; arm floats are toys, not safety gear.'],
        bullets_es: ['Regla de oro: sin adulto DENTRO o en el borde, no hay agua. Siempre.', 'Nombre un "vigía del agua" por turnos — la distracción colectiva es el escenario clásico.', 'Chaleco salvavidas en barcos y ríos; los flotadores de brazo son juguete, no seguridad.'],
    },
    {
        id: 'pets', prio: 1, companions: ['hasPets'], icon: 'PawPrint',
        title: 'Pet em Ambiente Novo', title_en: 'Pets in a New Environment', title_es: 'Mascotas en Ambiente Nuevo',
        content: 'Animal em lugar estranho sente medo — e fuga é o acidente número um de pets em viagem.',
        content_en: 'Animals in unfamiliar places get scared — and escape is the number-one pet accident while traveling.',
        content_es: 'El animal en un lugar extraño siente miedo — y la fuga es el accidente número uno de mascotas en viaje.',
        bullets: ['Plaqueta de identificação com telefone atualizado, antes de sair de casa.', 'Guia mesmo em locais fechados nos primeiros dias — porta aberta é convite.', 'Vistorie plantas, telas e frestas do local antes de soltar o animal.'],
        bullets_en: ['ID tag with an updated phone number, before leaving home.', 'Leash on even indoors during the first days — an open door is an invitation.', 'Inspect plants, screens and gaps before letting the animal loose.'],
        bullets_es: ['Placa de identificación con teléfono actualizado, antes de salir de casa.', 'Correa incluso en lugares cerrados los primeros días — una puerta abierta es una invitación.', 'Revise plantas, mosquiteros y rendijas antes de soltar al animal.'],
    },
    {
        id: 'pcd', prio: 1, companions: ['hasPcd'], icon: 'Wheelchair',
        title: 'Acessibilidade Real no Destino', title_en: 'Real Accessibility at the Destination', title_es: 'Accesibilidad Real en el Destino',
        content: 'Acessibilidade anunciada nem sempre é acessibilidade real — confirme antes, não descubra na chegada.',
        content_en: 'Advertised accessibility is not always real accessibility — confirm beforehand, do not find out on arrival.',
        content_es: 'La accesibilidad anunciada no siempre es real — confirme antes, no lo descubra al llegar.',
        bullets: ['Confirme por telefone: rampa, elevador, banheiro adaptado e vaga reservada.', 'Ao chegar, localize a rota de evacuação acessível do prédio.', 'Leve itens de apoio extras (carregador, peças de reposição da cadeira).'],
        bullets_en: ['Confirm by phone: ramp, elevator, adapted bathroom and reserved parking.', 'On arrival, locate the building\'s accessible evacuation route.', 'Bring extra support items (charger, wheelchair spare parts).'],
        bullets_es: ['Confirme por teléfono: rampa, ascensor, baño adaptado y plaza reservada.', 'Al llegar, ubique la ruta de evacuación accesible del edificio.', 'Lleve artículos de apoyo extra (cargador, repuestos de la silla).'],
    },
    {
        id: 'aquaticos', prio: 2, types: ['praia', 'rural'], icon: 'Waves',
        title: 'Ambientes Aquáticos Naturais', title_en: 'Natural Water Environments', title_es: 'Ambientes Acuáticos Naturales',
        content: 'Praias, rios e cachoeiras escondem correntezas, buracos e fundo irregular — o risco não se vê da margem.',
        content_en: 'Beaches, rivers and waterfalls hide currents, holes and uneven bottoms — the risk is invisible from the shore.',
        content_es: 'Playas, ríos y cascadas esconden corrientes, pozos y fondo irregular — el riesgo no se ve desde la orilla.',
        bullets: ['Entre na água apenas em áreas sinalizadas e, no mar, perto de guarda-vidas.', 'Cachoeira: saia imediatamente se a água mudar de cor ou volume (cabeça d\'água).', 'Nunca mergulhe de cabeça em água desconhecida.'],
        bullets_en: ['Enter the water only in marked areas and, at sea, near lifeguards.', 'Waterfalls: leave immediately if the water changes color or volume (flash flood).', 'Never dive headfirst into unknown water.'],
        bullets_es: ['Entre al agua solo en áreas señalizadas y, en el mar, cerca de salvavidas.', 'Cascadas: salga de inmediato si el agua cambia de color o volumen (riada).', 'Nunca se lance de cabeza en agua desconocida.'],
    },
    {
        id: 'piscinas', prio: 2, types: ['resort', 'praia'], icon: 'SwimmingPool',
        title: 'Piscinas de Hotel e Clube', title_en: 'Hotel and Club Pools', title_es: 'Piscinas de Hotel y Club',
        content: 'Piscina de viagem não tem a rotina da sua casa: profundidades, ralos e cercas são desconhecidos.',
        content_en: 'A vacation pool lacks your home routine: depths, drains and fences are all unknown.',
        content_es: 'La piscina de viaje no tiene la rutina de su casa: profundidades, desagües y cercas son desconocidos.',
        bullets: ['Identifique profundidade e posição dos ralos antes do primeiro mergulho.', 'Respeite a separação de piscinas por idade — ela existe por estatística, não capricho.', 'Confira se há grade/alarme entre o quarto e a piscina quando houver crianças.'],
        bullets_en: ['Identify depth and drain positions before the first swim.', 'Respect age-separated pools — they exist because of statistics, not whim.', 'Check for a fence/alarm between the room and the pool when children are along.'],
        bullets_es: ['Identifique la profundidad y la posición de los desagües antes del primer baño.', 'Respete la separación de piscinas por edad — existe por estadística, no por capricho.', 'Verifique si hay reja/alarma entre la habitación y la piscina cuando viajen niños.'],
    },
    {
        id: 'rural', prio: 2, types: ['rural'], icon: 'Plant',
        title: 'Campo e Natureza', title_en: 'Countryside and Nature', title_es: 'Campo y Naturaleza',
        content: 'No campo o socorro fica longe — a prevenção vale em dobro onde a ambulância demora.',
        content_en: 'In the countryside help is far away — prevention counts double where the ambulance takes long.',
        content_es: 'En el campo el socorro queda lejos — la prevención vale doble donde la ambulancia tarda.',
        bullets: ['Sacuda roupas, calçados e roupa de cama (escorpiões e aranhas se abrigam neles).', 'Salve o CIATOX no celular: 0800 722 6001 — orientação toxicológica gratuita, 24h.', 'Use calçado fechado em trilhas e gramados, principalmente à noite.'],
        bullets_en: ['Shake out clothes, shoes and bedding (scorpions and spiders shelter in them).', 'Save the local poison control number — free toxicology guidance, 24h.', 'Wear closed shoes on trails and lawns, especially at night.'],
        bullets_es: ['Sacuda ropa, calzado y ropa de cama (escorpiones y arañas se refugian allí).', 'Guarde el número del centro de toxicología local — orientación gratuita, 24h.', 'Use calzado cerrado en senderos y césped, sobre todo de noche.'],
    },
    {
        id: 'urbano', prio: 2, types: ['urbano'], icon: 'Building',
        title: 'Grandes Cidades', title_en: 'Big Cities', title_es: 'Grandes Ciudades',
        content: 'Na cidade grande, o risco mora no trânsito desconhecido e nas aglomerações.',
        content_en: 'In big cities, risk lives in unfamiliar traffic and in crowds.',
        content_es: 'En la gran ciudad, el riesgo vive en el tráfico desconocido y las aglomeraciones.',
        bullets: ['Combine um ponto de encontro fixo para locais cheios — antes de precisar dele.', 'Atenção redobrada nas travessias: mão e fluxo confundem o visitante.', 'À noite, prefira transporte de porta a porta a caminhadas em área desconhecida.'],
        bullets_en: ['Agree on a fixed meeting point for crowded places — before you need it.', 'Extra attention at crossings: traffic direction and flow confuse visitors.', 'At night, prefer door-to-door transport over walking in unknown areas.'],
        bullets_es: ['Acuerde un punto de encuentro fijo para lugares llenos — antes de necesitarlo.', 'Atención redoblada en los cruces: el sentido y el flujo confunden al visitante.', 'De noche, prefiera transporte puerta a puerta a caminar por zonas desconocidas.'],
    },
    {
        id: 'trabalho', prio: 3, purpose: 'trabalho', icon: 'Briefcase',
        title: 'Viagem de Trabalho', title_en: 'Business Travel', title_es: 'Viaje de Trabajo',
        content: 'Em viagem de trabalho o inimigo é a combinação de pressa, fadiga e ambiente desconhecido.',
        content_en: 'On business trips the enemy is the combination of haste, fatigue and unfamiliar surroundings.',
        content_es: 'En viaje de trabajo el enemigo es la combinación de prisa, fatiga y entorno desconocido.',
        bullets: ['Não dirija após voo longo ou jornada estendida — fadiga equivale a álcool ao volante.', 'Ao fazer check-in, localize as duas saídas de emergência mais próximas do quarto.', 'Compromissos noturnos: transporte de porta a porta, com trajeto compartilhado.'],
        bullets_en: ['Do not drive after a long flight or extended workday — fatigue equals alcohol behind the wheel.', 'At check-in, locate the two emergency exits nearest your room.', 'Evening commitments: door-to-door transport, with your route shared.'],
        bullets_es: ['No conduzca tras un vuelo largo o jornada extendida — la fatiga equivale al alcohol al volante.', 'Al hacer check-in, ubique las dos salidas de emergencia más cercanas a su habitación.', 'Compromisos nocturnos: transporte puerta a puerta, con el trayecto compartido.'],
    },
    {
        id: 'internacional', prio: 4, international: true, icon: 'Global',
        title: 'Fora do País', title_en: 'Abroad', title_es: 'Fuera del País',
        content: 'No exterior, os números e protocolos de emergência mudam — decore o essencial antes de precisar.',
        content_en: 'Abroad, emergency numbers and protocols change — memorize the essentials before you need them.',
        content_es: 'En el extranjero, los números y protocolos de emergencia cambian — memorice lo esencial antes de necesitarlo.',
        bullets: ['Anote o número local de emergência (Europa: 112 · EUA/Canadá: 911) e o contato do consulado brasileiro.', 'Seguro viagem: deixe a apólice acessível OFFLINE no celular.', 'Documentos: cópia digital na nuvem + cópia física guardada separada do original.'],
        bullets_en: ['Note the local emergency number (Europe: 112 · USA/Canada: 911) and your consulate\'s contact.', 'Travel insurance: keep the policy accessible OFFLINE on your phone.', 'Documents: digital copy in the cloud + physical copy stored apart from the original.'],
        bullets_es: ['Anote el número local de emergencia (Europa: 112 · EE.UU./Canadá: 911) y el contacto de su consulado.', 'Seguro de viaje: mantenga la póliza accesible SIN conexión en el celular.', 'Documentos: copia digital en la nube + copia física guardada aparte del original.'],
    },
    {
        id: 'hospedagem', prio: 5, always: true, icon: 'Bed',
        title: 'Dormindo Fora (Hospedagem)', title_en: 'Sleeping Away (Lodging)', title_es: 'Durmiendo Fuera (Alojamiento)',
        content: 'Hotéis e casas de temporada não foram adaptados para a SUA família — a vistoria de chegada é sua.',
        content_en: 'Hotels and vacation homes were not adapted for YOUR family — the arrival inspection is on you.',
        content_es: 'Hoteles y casas de temporada no fueron adaptados para SU familia — la inspección de llegada es suya.',
        bullets: ['Verifique janelas e sacadas assim que chegar; afaste camas e móveis escaláveis delas.', 'Localize o mapa de evacuação e as duas saídas mais próximas.', 'Tomadas, quinas e produtos de limpeza acessíveis: o olhar de casa, aplicado aqui.'],
        bullets_en: ['Check windows and balconies on arrival; move beds and climbable furniture away from them.', 'Locate the evacuation map and the two nearest exits.', 'Outlets, sharp corners and accessible cleaning products: your at-home eye, applied here.'],
        bullets_es: ['Revise ventanas y balcones al llegar; aleje camas y muebles escalables de ellos.', 'Ubique el mapa de evacuación y las dos salidas más cercanas.', 'Enchufes, esquinas y productos de limpieza accesibles: la mirada de casa, aplicada aquí.'],
    },
    {
        id: 'arlivre', prio: 5, companions: ['hasKids'], purpose: 'lazer', icon: 'Sun1',
        title: 'Brincadeiras ao Ar Livre', title_en: 'Outdoor Play', title_es: 'Juegos al Aire Libre',
        content: 'Bicicletas, patinetes e parquinhos de viagem exigem o mesmo critério dos de casa — que você não conhece.',
        content_en: 'Vacation bikes, scooters and playgrounds demand the same scrutiny as the ones at home — which you do not know here.',
        content_es: 'Bicicletas, patinetes y parques de viaje exigen el mismo criterio que los de casa — que aquí usted no conoce.',
        bullets: ['Capacete obrigatório para tudo que tem rodas.', 'Inspecione o parquinho: ferrugem, peças soltas e piso de impacto.', 'Pipas longe de rede elétrica — e nunca com linha chilena/cerol.'],
        bullets_en: ['Helmets are mandatory for everything on wheels.', 'Inspect the playground: rust, loose parts and impact-absorbing flooring.', 'Kites far from power lines — and never with glass-coated string.'],
        bullets_es: ['Casco obligatorio para todo lo que tenga ruedas.', 'Inspeccione el parque: óxido, piezas sueltas y piso amortiguador.', 'Cometas lejos de la red eléctrica — y nunca con hilo encerado/curado.'],
    },
    {
        id: 'digital', prio: 5, companions: ['hasKids'], icon: 'Mobile',
        title: 'Distração Digital', title_en: 'Digital Distraction', title_es: 'Distracción Digital',
        content: 'O celular é o ponto cego da supervisão: segundos de tela são o tempo exato de um acidente.',
        content_en: 'The phone is supervision\'s blind spot: seconds of screen time are exactly how long an accident takes.',
        content_es: 'El celular es el punto ciego de la supervisión: segundos de pantalla son el tiempo exacto de un accidente.',
        bullets: ['Celular guardado enquanto supervisiona crianças na água. Sem exceção.', 'Revezem a supervisão para que cada adulto tenha sua vez de descansar E de vigiar.', 'No trânsito a pé, telas no bolso — visitante distraído é pedestre vulnerável.'],
        bullets_en: ['Phone away while supervising children in the water. No exceptions.', 'Rotate supervision so each adult gets a turn to rest AND to watch.', 'Walking in traffic, screens in the pocket — a distracted visitor is a vulnerable pedestrian.'],
        bullets_es: ['Celular guardado mientras supervisa niños en el agua. Sin excepción.', 'Túrnense la supervisión para que cada adulto descanse Y vigile.', 'A pie en el tráfico, pantallas en el bolsillo — el visitante distraído es un peatón vulnerable.'],
    },
    {
        id: 'escolar', prio: 9, icon: 'Car',
        title: 'Passeios Escolares', title_en: 'School Trips', title_es: 'Paseos Escolares',
        content: 'Autorizar viagem escolar exige critério: a supervisão será de terceiros.',
        content_en: 'Authorizing a school trip demands scrutiny: supervision will be in someone else\'s hands.',
        content_es: 'Autorizar un paseo escolar exige criterio: la supervisión estará en manos de terceros.',
        bullets: ['Avalie o destino — lagos, mar e cachoeiras exigem cautela extra.', 'Pergunte a proporção de adultos por criança.', 'Se possível, ofereça-se como monitor acompanhante.'],
        bullets_en: ['Assess the destination — lakes, sea and waterfalls demand extra caution.', 'Ask about the adult-to-child ratio.', 'If possible, volunteer as an accompanying monitor.'],
        bullets_es: ['Evalúe el destino — lagos, mar y cascadas exigen cautela extra.', 'Pregunte la proporción de adultos por niño.', 'Si es posible, ofrézcase como monitor acompañante.'],
    },
    // ── Conformidade / exigências (conteúdo SENSÍVEL — regra errada barra o
    //    embarque). Validado jun/2026; ver memória project-modo-viagem-compliance.
    //    Cada seção carrega `source` (fonte + data + "confirme antes"). ──
    {
        id: 'docs_internacional', prio: 4, international: true, icon: 'Airplane',
        title: 'Documentos para Sair do País', title_en: 'Documents to Leave the Country', title_es: 'Documentos para Salir del País',
        content: 'Documento errado ou vencido é o embaraço mais caro da viagem — barra o embarque na hora. Resolva antes de comprar a passagem.',
        content_en: 'A wrong or expired document is the costliest travel snag — it stops you right at boarding. Sort it out before buying the ticket.',
        content_es: 'Un documento erróneo o vencido es el contratiempo más caro del viaje — te frena en el embarque. Resuélvelo antes de comprar el boleto.',
        bullets: ['Passaporte: confira a validade mínima exigida pelo destino — a Europa (Schengen) pede 3 meses após a saída, mas muitos países pedem 6 meses.', 'Visto ou autorização eletrônica varia por país: ESTA (EUA) e eTA (Canadá). O ETIAS europeu só passa a valer no fim de 2026 — hoje o brasileiro ainda não precisa dele.', 'Confirme as exigências de entrada no consulado do destino antes de comprar a passagem; elas mudam sem aviso.'],
        bullets_en: ['Passport: check the minimum validity your destination requires — Europe (Schengen) asks for 3 months after departure, but many countries require 6 months.', 'A visa or electronic authorization varies by country: ESTA (USA) and eTA (Canada). Europe\'s ETIAS only takes effect in late 2026 — Brazilians do not need it yet.', 'Confirm entry requirements with the destination\'s consulate before buying the ticket; they change without notice.'],
        bullets_es: ['Pasaporte: verifique la validez mínima que exige el destino — Europa (Schengen) pide 3 meses tras la salida, pero muchos países exigen 6 meses.', 'La visa o autorización electrónica varía por país: ESTA (EE.UU.) y eTA (Canadá). El ETIAS europeo solo entra en vigor a fines de 2026 — los brasileños aún no lo necesitan.', 'Confirme los requisitos de entrada en el consulado del destino antes de comprar el boleto; cambian sin aviso.'],
        source: 'Fontes: consulados · Polícia Federal · as regras mudam, confirme antes de viajar (jun/2026).',
        source_en: 'Sources: consulates · Brazilian Federal Police · rules change, confirm before traveling (Jun/2026).',
        source_es: 'Fuentes: consulados · Policía Federal · las reglas cambian, confirme antes de viajar (jun/2026).',
    },
    {
        id: 'vacinacao_intl', prio: 4, international: true, icon: 'Health',
        title: 'Vacinação Internacional (Febre Amarela)', title_en: 'International Vaccination (Yellow Fever)', title_es: 'Vacunación Internacional (Fiebre Amarilla)',
        content: 'Vários países só deixam entrar quem comprova a vacina de febre amarela — e o certificado exige antecedência. Deixar pra última hora impede a viagem.',
        content_en: 'Several countries only admit travelers who prove yellow fever vaccination — and the certificate needs lead time. Leaving it to the last minute blocks the trip.',
        content_es: 'Varios países solo admiten a quien comprueba la vacuna de fiebre amarilla — y el certificado exige anticipación. Dejarlo para última hora impide el viaje.',
        bullets: ['Tome a vacina pelo menos 10 dias antes de viajar — antes disso ela ainda não protege e o certificado não vale.', 'Emita o CIVP de graça pelo app Meu SUS Digital ou no portal gov.br; a validade é vitalícia.', '47 países exigem o certificado (34 na África e 13 nas Américas) — confirme se o seu destino está na lista.'],
        bullets_en: ['Get the vaccine at least 10 days before traveling — before that it does not protect yet and the certificate is not valid.', 'Issue the CIVP for free via the Meu SUS Digital app or the gov.br portal; it is valid for life.', '47 countries require the certificate (34 in Africa, 13 in the Americas) — check whether your destination is on the list.'],
        bullets_es: ['Aplíquese la vacuna al menos 10 días antes de viajar — antes de eso aún no protege y el certificado no vale.', 'Emita el CIVP gratis en la app Meu SUS Digital o en el portal gov.br; tiene validez de por vida.', '47 países exigen el certificado (34 en África y 13 en las Américas) — confirme si su destino está en la lista.'],
        source: 'Fontes: Anvisa · Meu SUS Digital · confirme a exigência do destino (jun/2026).',
        source_en: 'Sources: Anvisa · Meu SUS Digital · confirm your destination\'s requirement (Jun/2026).',
        source_es: 'Fuentes: Anvisa · Meu SUS Digital · confirme la exigencia del destino (jun/2026).',
    },
    {
        id: 'autorizacao_menor', prio: 1, companions: ['hasKids'], icon: 'Baby',
        title: 'Autorização de Viagem de Menor', title_en: 'Travel Authorization for Minors', title_es: 'Autorización de Viaje de Menores',
        content: 'Criança sem a autorização certa é barrada no embarque, mesmo com a passagem paga. As regras mudam entre viagem nacional e internacional.',
        content_en: 'A child without the right authorization is denied boarding, even with a paid ticket. The rules differ between domestic and international travel.',
        content_es: 'Un niño sin la autorización correcta es rechazado en el embarque, aun con el boleto pagado. Las reglas cambian entre viaje nacional e internacional.',
        bullets: ['Viagem internacional: menor que viaja sem os pais, ou só com um deles, precisa de autorização do outro com firma reconhecida em cartório.', 'Viagem nacional: criança com menos de 12 anos desacompanhada precisa de autorização judicial; de 12 a 17 anos não precisa.', 'Use o formulário padrão do CNJ ou da Polícia Federal e leve uma via impressa — sem o documento, o embarque é negado.'],
        bullets_en: ['International travel: a minor traveling without both parents, or with only one, needs the other parent\'s authorization with a notarized signature.', 'Domestic travel: an unaccompanied child under 12 needs judicial authorization; ages 12 to 17 do not.', 'Use the standard CNJ or Federal Police form and carry a printed copy — without the document, boarding is denied.'],
        bullets_es: ['Viaje internacional: un menor que viaja sin los padres, o solo con uno, necesita autorización del otro con firma reconocida ante notario.', 'Viaje nacional: un niño menor de 12 años sin acompañante necesita autorización judicial; de 12 a 17 años no.', 'Use el formulario estándar del CNJ o de la Policía Federal y lleve una copia impresa — sin el documento, se niega el embarque.'],
        source: 'Fontes: CNJ · Polícia Federal · confirme no embarque (jun/2026).',
        source_en: 'Sources: CNJ · Brazilian Federal Police · confirm at boarding (Jun/2026).',
        source_es: 'Fuentes: CNJ · Policía Federal · confirme en el embarque (jun/2026).',
    },
];

const TYPE_LABELS = {
    rural: { label: 'Área Rural', label_en: 'Rural Area', label_es: 'Área Rural' },
    praia: { label: 'Litoral', label_en: 'Coastal', label_es: 'Zona Costera' },
    urbano: { label: 'Área Urbana', label_en: 'Urban Area', label_es: 'Área Urbana' },
    resort: { label: 'Resort e Lazer', label_en: 'Resort & Leisure', label_es: 'Resort y Ocio' },
};

function matchesTrip(section, trip) {
    if (!trip) return false;
    const cfg = trip.config || {};
    if (section.always) return true;
    if (section.types?.includes(trip.type)) return true;
    if (section.international && cfg.isInternational) return true;
    // Companhia (+ propósito quando especificado junto: ambos precisam valer)
    if (section.companions?.some((c) => cfg[c])) {
        return section.purpose ? trip.purpose === section.purpose || !trip.purpose : true;
    }
    if (section.purpose && !section.companions) return trip.purpose === section.purpose;
    return false;
}

export default function TravelSafetyGuideScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [trip, setTrip] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('@active_trip')
            .then((raw) => { if (raw) setTrip(JSON.parse(raw)); })
            .catch(() => {})
            .finally(() => setLoaded(true));
    }, []);

    // Sem viagem ativa => guia completo (fallback não-omisso)
    const personalized = trip ? GUIDE_SECTIONS.filter((sec) => matchesTrip(sec, trip)) : [];
    const usePersonalized = trip && personalized.length > 0 && !showAll;
    const sections = (usePersonalized ? personalized : GUIDE_SECTIONS)
        .slice()
        .sort((a, b) => a.prio - b.prio);
    const hiddenCount = GUIDE_SECTIONS.length - personalized.length;

    // Chips do briefing — torna a personalização VISÍVEL
    const chips = [];
    if (trip) {
        const cfg = trip.config || {};
        if (TYPE_LABELS[trip.type]) chips.push(t_field(TYPE_LABELS[trip.type], 'label'));
        chips.push(trip.purpose === 'trabalho' ? t('travel.work', 'Trabalho') : t('travel.leisure', 'Lazer'));
        if (cfg.isInternational) chips.push(t('travel.internationalChip', 'Internacional'));
        if (cfg.hasKids) chips.push(t('travel.children', 'Crianças'));
        if (cfg.hasElderly) chips.push(t('travel.elderly', 'Idosos'));
        if (cfg.hasPets) chips.push(t('travel.pets', 'Pets'));
        if (cfg.hasPcd) chips.push(t('travel.pwds', 'PCDs'));
    }

    if (!loaded) return <View style={{ flex: 1 }} />;

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                    </TouchableOpacity>
                    <H2 style={{ marginLeft: 16, fontSize: 20 }}>{t('travel.safetyGuide', 'Guia de Segurança')}</H2>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {trip ? (
                        <>
                            <Small style={styles.personalizedIntro}>
                                {t('travel.guideForYourTrip', 'Montado para a sua viagem:')}
                            </Small>
                            <View style={styles.chipsRow}>
                                {chips.map((c, i) => (
                                    <View key={i} style={styles.chip}>
                                        <Small style={styles.chipText}>{c}</Small>
                                    </View>
                                ))}
                            </View>
                        </>
                    ) : (
                        <Body style={{ marginBottom: 20, textAlign: 'center', fontStyle: 'italic', color: Neo.colors.neutral[600] }}>
                            {t('travel.guideGenericIntro', 'Férias e momentos fora de casa exigem atenção redobrada. Ative o Modo Viagem para um guia montado sob medida.')}
                        </Body>
                    )}

                    {sections.map((sec) => (
                        <NeoCard key={sec.id} variant="elevated" style={{ marginBottom: 16, padding: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                <View style={styles.iconCircle}>
                                    <NeoIcon name={sec.icon} size={24} color={Neo.colors.primary[700]} variant="Bulk" />
                                </View>
                                <H3 style={{ color: Neo.colors.neutral[800], flex: 1 }}>{t_field(sec, 'title')}</H3>
                            </View>

                            <Body style={{ color: Neo.colors.neutral[600], marginBottom: 12, lineHeight: 20 }}>
                                {t_field(sec, 'content')}
                            </Body>

                            <View style={{ backgroundColor: Neo.colors.neutral[50], padding: 12, borderRadius: 8 }}>
                                {t_array(sec, 'bullets').map((point, index) => (
                                    <View key={index} style={{ flexDirection: 'row', marginBottom: 6 }}>
                                        <Text style={{ color: Neo.colors.primary[500], marginRight: 6, fontWeight: 'bold' }}>•</Text>
                                        <Small style={{ color: Neo.colors.neutral[700], flex: 1, lineHeight: 18 }}>{point}</Small>
                                    </View>
                                ))}
                            </View>

                            {!!t_field(sec, 'source') && (
                                <Small style={{ color: Neo.colors.neutral[500], fontSize: 10.5, marginTop: 10, fontStyle: 'italic', lineHeight: 15 }}>
                                    {t_field(sec, 'source')}
                                </Small>
                            )}
                        </NeoCard>
                    ))}

                    {/* Não-omissão: o conteúdo completo está a um toque */}
                    {trip && hiddenCount > 0 && (
                        <TouchableOpacity
                            onPress={() => setShowAll(!showAll)}
                            style={styles.showAllBtn}
                            accessibilityRole="button"
                        >
                            <Body style={{ color: Neo.colors.primary[700], fontWeight: 'bold', fontSize: 14 }}>
                                {showAll
                                    ? t('travel.guideShowLess', 'Mostrar só o relevante para esta viagem')
                                    : t('travel.guideShowAll', 'Ver o guia completo (+{{count}} temas)', { count: hiddenCount })}
                            </Body>
                        </TouchableOpacity>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    content: {
        padding: 20,
    },
    personalizedIntro: {
        textAlign: 'center',
        color: Neo.colors.neutral[500],
        marginBottom: 8,
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 20,
    },
    chip: {
        backgroundColor: Neo.colors.primary[100],
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    chipText: {
        color: Neo.colors.primary[700],
        fontWeight: '700',
        fontSize: 11,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    showAllBtn: {
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: Neo.colors.primary[100],
    },
});
