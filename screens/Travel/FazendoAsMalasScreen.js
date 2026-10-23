import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// Conteúdo e regra de cruzamento moram em data/, não aqui: são reusados pelo
// TravelReportService no dossiê em PDF. Ver o docblock de lá para a história
// da consolidação com a antiga tela KitViagem.
import { buildDynamicKits, contarItens } from '../../data/kits/bagagem_viagem';
import { t_field, t_array } from '../../utils/getLocalizedField';
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated, Dimensions, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import SafetyDisclaimer from '../../components/SafetyDisclaimer';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_W = Dimensions.get('window').width;

// Regras de transporte aéreo — conteúdo SENSÍVEL (regra errada = barrado no
// raio-x / multa). Exportado: reusado pelo TravelReportService no dossiê. NÃO
// duplicar nem remover sem alinhar (origem do workstream de viagem).
//
// Revisado em 19/10/2026 (D15) contra a fonte oficial: power banks seguem a
// IS 175-001M da ANAC (vigente desde 06/04/2026), que incorpora o adendo da
// OACI de 27/03/2026 — até 2 por pessoa, só na cabine, sem recarregar a bordo,
// fora do compartimento de cima e sem ligar na USB do avião. Líquidos: no
// Brasil o limite de 100 ml vale só para voo internacional; na Europa, nos EUA
// e no Reino Unido vale em geral para todos os voos.
// Ler sempre com t_field (4 idiomas).
export const TRANSPORTE_AEREO = {
    title: 'Bagagem Aérea: o que pode e onde',
    title_en: 'Air Travel Luggage: what goes where',
    title_es: 'Equipaje en avión: qué se puede llevar y dónde',
    title_ptpt: 'Bagagem no avião: o que pode levar e onde',
    intro: 'Vai de avião? Estas regras ajudam a evitar problemas no embarque. Mudaram em 2026 — confirme com a sua companhia aérea.',
    intro_en: 'Flying? These rules help you avoid problems at boarding. They changed in 2026 — check with your airline.',
    intro_es: '¿Viaja en avión? Estas reglas ayudan a evitar problemas en el embarque. Cambiaron en 2026: confírmelo con su aerolínea.',
    intro_ptpt: 'Vai de avião? Estas regras ajudam a evitar problemas no embarque. Mudaram em 2026 — confirme com a sua companhia aérea.',
    blocos: [
        {
            rotulo: 'Power bank e baterias de lítio',
            rotulo_en: 'Power banks and lithium batteries',
            rotulo_es: 'Baterías portátiles y de litio',
            regra: 'Só na bagagem de mão, nunca na despachada. Até 2 por pessoa, de até 100 Wh; de 100 a 160 Wh, só com autorização da companhia; acima disso, proibido. A bordo: não recarregue o power bank, não ligue na USB do avião, evite usá-lo para carregar outros aparelhos e guarde na bolsa embaixo do assento ou no bolsão — nunca no compartimento de cima. A companhia pode ter regra mais rígida.',
            regra_en: 'Carry-on only, never in checked bags. Up to 2 per person, up to 100 Wh each; 100 to 160 Wh only with the airline\'s approval; above that, not allowed. On board: do not recharge the power bank, do not plug it into the aircraft USB port, avoid using it to charge other devices, and keep it in your bag under the seat or in the seat pocket — never in the overhead bin. Your airline may have stricter rules.',
            regra_es: 'Solo en el equipaje de mano, nunca en el facturado. Hasta 2 por persona, de hasta 100 Wh; de 100 a 160 Wh, solo con autorización de la aerolínea; por encima, prohibido. A bordo: no recargue la batería portátil, no la conecte al USB del avión, evite usarla para cargar otros aparatos y guárdela en el bolso bajo el asiento o en el bolsillo del respaldo — nunca en el compartimento superior. La aerolínea puede tener reglas más estrictas.',
            regra_ptpt: 'Só na bagagem de mão, nunca na de porão. Até 2 por pessoa, de até 100 Wh; de 100 a 160 Wh, só com autorização da companhia; acima disso, proibido. A bordo: não recarregue o power bank, não o ligue à USB do avião, evite usá-lo para carregar outros aparelhos e guarde-o na mala debaixo do assento ou na bolsa do banco — nunca no compartimento superior. A companhia pode ter regras mais restritas.',
        },
        {
            rotulo: 'Líquidos, géis e aerossóis',
            rotulo_en: 'Liquids, gels and aerosols',
            rotulo_es: 'Líquidos, geles y aerosoles',
            regra: 'Voo internacional: frascos de até 100 ml dentro de um saco plástico (de até 1 litro) transparente. No Brasil, o voo nacional não tem esse limite; na Europa, nos EUA e no Reino Unido, em geral ele vale para todos os voos. Exceções: remédio com receita, leite materno e papinha de bebê.',
            regra_en: 'International flights: containers of up to 100 ml in a clear plastic bag of up to 1 litre. In Brazil, domestic flights have no such limit; in Europe, the US and the UK it generally applies to all flights. Exceptions: prescription medicine, breast milk and baby food.',
            regra_es: 'Vuelo internacional: envases de hasta 100 ml dentro de una bolsa de plástico transparente de hasta 1 litro. En Brasil, el vuelo nacional no tiene ese límite; en Europa, EE. UU. y el Reino Unido, en general se aplica a todos los vuelos. Excepciones: medicamentos con receta, leche materna y comida para bebé.',
            regra_ptpt: 'Voo internacional: embalagens de até 100 ml dentro de um saco de plástico transparente de até 1 litro. No Brasil, o voo doméstico não tem esse limite; na Europa, nos EUA e no Reino Unido, em geral aplica-se a todos os voos. Exceções: medicamentos com receita, leite materno e comida de bebé.',
        },
        {
            rotulo: 'Medicamentos',
            rotulo_en: 'Medicines',
            rotulo_es: 'Medicamentos',
            regra: 'Leve na bagagem de mão, na embalagem original e com a receita (física ou digital) — sobretudo os de uso contínuo e de tarja preta. Em viagem internacional, leve a receita com o nome do princípio ativo e, se possível, uma tradução para o inglês ou para o idioma do destino; alguns países exigem autorização prévia para remédios controlados — consulte a embaixada ou o consulado.',
            regra_en: 'Keep them in your carry-on, in the original packaging and with the prescription (paper or digital) — especially long-term and controlled medicines. When travelling abroad, carry a prescription that lists the active ingredient and, if possible, a translation into the language of your destination; some countries require prior authorization for controlled medicines — check with the embassy or consulate.',
            regra_es: 'Llévelos en el equipaje de mano, en el envase original y con la receta (en papel o digital) — sobre todo los de uso continuo y los controlados. En viajes internacionales, lleve la receta con el nombre del principio activo y, si es posible, una traducción al inglés o al idioma del destino; algunos países exigen autorización previa para medicamentos controlados: consulte a la embajada o el consulado.',
            regra_ptpt: 'Leve-os na bagagem de mão, na embalagem original e com a receita (em papel ou digital) — sobretudo os de uso contínuo e os sujeitos a controlo especial. Em viagem internacional, leve a receita com o nome da substância ativa e, se possível, uma tradução para inglês ou para a língua do destino; alguns países exigem autorização prévia para medicamentos controlados — consulte a embaixada ou o consulado.',
        },
        {
            rotulo: 'Cortantes e isqueiro',
            rotulo_en: 'Sharp items and lighters',
            rotulo_es: 'Objetos cortantes y encendedor',
            rotulo_ptpt: 'Objetos cortantes e isqueiro',
            regra: 'Tesoura, canivete e lâminas vão na bagagem despachada. Isqueiro: apenas um, levado com você — nunca na mala despachada nem no compartimento superior.',
            regra_en: 'Scissors, pocket knives and blades go in checked baggage. Lighters: just one, carried on you — never in checked baggage or the overhead bin.',
            regra_es: 'Tijeras, navajas y cuchillas van en el equipaje facturado. Encendedor: solo uno, que lleve consigo — nunca en la maleta facturada ni en el compartimento superior.',
            regra_ptpt: 'Tesouras, canivetes e lâminas vão na bagagem de porão. Isqueiro: apenas um, levado consigo — nunca na mala de porão nem no compartimento superior.',
        },
    ],
    fonte: 'ANAC (IS 175-001M) · OACI · IATA',
    fonte_en: 'ANAC (IS 175-001M) · ICAO · IATA',
    fonte_es: 'ANAC (IS 175-001M) · OACI · IATA',
    revisao: 'out/2026',
    revisao_en: 'Oct 2026',
    revisao_es: 'oct. 2026',
};

// Viagem e passeio de motocicleta. Pedido do Agnaldo (23/10/2026): o modal
// estava fora do Modo Viagem e e dos mais usados hoje.
//
// Criterio de redacao, o mesmo das duas varreduras de cautela: cautela na
// promessa, firmeza na instrucao. Equipamento "reduz o risco" e "ajuda a",
// nunca "evita" ou "garante". So entra "obrigatorio" com lei atras — aqui o
// capacete (CTB art. 244, I) e a idade da garupa (CTB art. 244, V, menor de
// 10 anos, infracao gravissima, redacao da Lei 14.071/2020). As duas sao
// regras BRASILEIRAS e estao marcadas como tal, porque o app atende 6 paises.
export const TRANSPORTE_MOTO = {
    title: 'De moto: o que conferir antes e durante',
    title_en: 'By motorcycle: what to check before and during',
    title_es: 'En moto: qué revisar antes y durante',
    title_ptpt: 'De mota: o que conferir antes e durante',
    intro: 'Na moto o corpo e a carroceria: o que protege e o que voce veste e o modo como voce pilota. Confira estes pontos antes de sair e lembre deles na estrada.',
    intro_en: 'On a motorcycle your body is the bodywork: what protects you is what you wear and how you ride. Check these points before leaving and keep them in mind on the road.',
    intro_es: 'En moto el cuerpo es la carrocería: lo que protege es lo que lleva puesto y cómo conduce. Revise estos puntos antes de salir y recuérdelos en la carretera.',
    intro_ptpt: 'Na mota o corpo é a carroçaria: o que protege é o que veste e a forma como conduz. Confira estes pontos antes de sair e lembre-se deles na estrada.',
    blocos: [
        {
            rotulo: 'Capacete',
            rotulo_en: 'Helmet',
            rotulo_es: 'Casco',
            rotulo_ptpt: 'Capacete',
            regra: 'No Brasil o capacete é obrigatório para condutor e garupa (CTB, art. 244). Use sempre afivelado: solto, ele sai na primeira pancada. Confira o selo do Inmetro, a viseira sem risco que atrapalhe a visão e o tamanho — capacete que gira na cabeça não protege como deveria. Capacete que sofreu um impacto deve ser trocado, mesmo sem marca aparente.',
            regra_en: 'In Brazil a helmet is required for rider and passenger (Traffic Code, art. 244); most countries require one too — check the local rule. Always fasten the strap: loose, it comes off at the first impact. Check the certification seal, a visor without scratches that block your view, and the size — a helmet that turns on your head does not protect as it should. A helmet that has taken an impact should be replaced, even with no visible mark.',
            regra_es: 'En Brasil el casco es obligatorio para conductor y pasajero (Código de Tránsito, art. 244); en la mayoría de los países también se exige — confirme la norma local. Úselo siempre abrochado: suelto, sale en el primer golpe. Revise el sello de certificación, la visera sin rayas que dificulten la visión y la talla — un casco que gira en la cabeza no protege como debería. Un casco que sufrió un impacto debe cambiarse, aunque no tenga marca visible.',
            regra_ptpt: 'Em Portugal o capacete é obrigatório para condutor e passageiro. Use sempre apertado: solto, sai na primeira pancada. Confira a homologação, a viseira sem riscos que dificultem a visão e o tamanho — um capacete que roda na cabeça não protege como devia. Um capacete que sofreu um impacto deve ser substituído, mesmo sem marca visível.',
        },
        {
            rotulo: 'O resto do equipamento',
            rotulo_en: 'The rest of the gear',
            rotulo_es: 'El resto del equipo',
            rotulo_ptpt: 'O resto do equipamento',
            regra: 'Jaqueta, luvas, calça comprida e calçado fechado que cubra o tornozelo reduzem o atrito com o asfalto numa queda. Não são exigidos por lei na maior parte dos trajetos, mas são a diferença entre um arranhão e uma lesão que demora a fechar. Em viagem longa, roupa clara ou com faixa refletiva ajuda outros motoristas a enxergar você mais cedo.',
            regra_en: 'A jacket, gloves, long trousers and closed footwear covering the ankle reduce friction with the asphalt in a fall. They are not required by law on most journeys, but they are the difference between a scrape and an injury that takes a long time to heal. On a long trip, light-coloured or reflective clothing helps other drivers see you sooner.',
            regra_es: 'Chaqueta, guantes, pantalón largo y calzado cerrado que cubra el tobillo reducen el roce con el asfalto en una caída. No se exigen por ley en la mayoría de los trayectos, pero marcan la diferencia entre un raspón y una lesión que tarda en cerrar. En viaje largo, la ropa clara o con banda reflectante ayuda a que otros conductores le vean antes.',
            regra_ptpt: 'Blusão, luvas, calças compridas e calçado fechado que cubra o tornozelo reduzem o atrito com o alcatrão numa queda. Não são exigidos por lei na maior parte dos trajetos, mas são a diferença entre um arranhão e uma lesão que demora a sarar. Em viagem longa, roupa clara ou com faixa refletora ajuda os outros condutores a vê-lo mais cedo.',
        },
        {
            rotulo: 'Criança na garupa',
            rotulo_en: 'Children as passengers',
            rotulo_es: 'Niños de pasajeros',
            rotulo_ptpt: 'Crianças como passageiras',
            regra: 'No Brasil é proibido levar criança menor de 10 anos na garupa — infração gravíssima (CTB, art. 244, V). Acima dessa idade, a lei ainda exige que o passageiro consiga cuidar da própria segurança: alcançar os pedaleiros, segurar-se firme durante todo o trajeto e usar capacete do tamanho da cabeça dela. Criança com sono não se segura; em trajeto longo, prefira outro meio.',
            regra_en: 'In Brazil it is forbidden to carry a child under 10 as a passenger — a most serious offence (Traffic Code, art. 244, V). Above that age, the law still requires the passenger to be able to look after their own safety: reach the footpegs, hold on firmly for the whole journey, and wear a helmet that fits their head. A sleepy child cannot hold on; on a long trip, choose another means of transport. Age limits vary by country — check the local rule.',
            regra_es: 'En Brasil está prohibido llevar a un niño menor de 10 años de pasajero — infracción gravísima (Código de Tránsito, art. 244, V). Por encima de esa edad, la ley exige además que el pasajero pueda cuidar de su propia seguridad: alcanzar los reposapiés, sujetarse con firmeza durante todo el trayecto y usar un casco de su talla. Un niño con sueño no se sujeta; en trayecto largo, elija otro medio. El límite de edad varía según el país — confirme la norma local.',
            regra_ptpt: 'O limite de idade para passageiro varia de país para país — confirme a regra local antes de sair. Seja qual for a idade, o passageiro tem de conseguir cuidar da própria segurança: alcançar os pousa-pés, segurar-se com firmeza durante todo o trajeto e usar capacete do tamanho da cabeça. Uma criança com sono não se segura; em trajeto longo, prefira outro meio.',
        },
        {
            rotulo: 'A bagagem',
            rotulo_en: 'The luggage',
            rotulo_es: 'El equipaje',
            rotulo_ptpt: 'A bagagem',
            regra: 'Nunca pendure sacola no guidão nem no braço: ela desequilibra a direção e pode prender na roda. Use baú, alforje ou mochila presa ao corpo, com o peso mais baixo e mais centrado possível, distribuído dos dois lados. Confira as cintas na primeira parada — carga que afrouxa muda o comportamento da moto sem avisar.',
            regra_en: 'Never hang a bag from the handlebars or from your arm: it unbalances the steering and can catch in the wheel. Use a top case, panniers or a backpack strapped to your body, with the weight as low and as centred as possible, balanced on both sides. Check the straps at the first stop — a load that works loose changes how the bike handles without warning.',
            regra_es: 'Nunca cuelgue una bolsa del manillar ni del brazo: desequilibra la dirección y puede engancharse en la rueda. Use baúl, alforjas o una mochila sujeta al cuerpo, con el peso lo más bajo y centrado posible, repartido a ambos lados. Revise las correas en la primera parada — una carga que se afloja cambia el comportamiento de la moto sin avisar.',
            regra_ptpt: 'Nunca pendure sacos no guiador nem no braço: desequilibram a direção e podem prender-se na roda. Use mala, alforge ou mochila presa ao corpo, com o peso o mais baixo e centrado possível, repartido pelos dois lados. Confira as cintas na primeira paragem — carga que afrouxa muda o comportamento da mota sem avisar.',
        },
        {
            rotulo: 'Chuva e piso escorregadio',
            rotulo_en: 'Rain and slippery surfaces',
            rotulo_es: 'Lluvia y piso resbaladizo',
            rotulo_ptpt: 'Chuva e piso escorregadio',
            regra: 'Os primeiros minutos de chuva são os mais traiçoeiros: a água levanta o óleo acumulado no asfalto. Reduza a velocidade, aumente a distância do veículo da frente e evite frear em cima de faixa pintada, tampa de bueiro e trilho — todos ficam muito mais lisos molhados. Se a chuva apertar, parar em local seguro é decisão melhor que seguir.',
            regra_en: 'The first minutes of rain are the most treacherous: water lifts the oil built up on the asphalt. Slow down, increase the distance to the vehicle ahead, and avoid braking on painted lines, manhole covers and rails — all become far more slippery when wet. If the rain gets heavy, stopping somewhere safe is a better decision than pressing on.',
            regra_es: 'Los primeros minutos de lluvia son los más traicioneros: el agua levanta el aceite acumulado en el asfalto. Reduzca la velocidad, aumente la distancia con el vehículo de delante y evite frenar sobre líneas pintadas, tapas de alcantarilla y raíles — todos se vuelven mucho más resbaladizos mojados. Si la lluvia arrecia, parar en un lugar seguro es mejor decisión que seguir.',
            regra_ptpt: 'Os primeiros minutos de chuva são os mais traiçoeiros: a água levanta o óleo acumulado no alcatrão. Reduza a velocidade, aumente a distância do veículo da frente e evite travar em cima de linha pintada, tampa de saneamento e carril — todos ficam muito mais escorregadios molhados. Se a chuva apertar, parar em local seguro é melhor decisão do que seguir.',
        },
        {
            rotulo: 'Cansaço na estrada',
            rotulo_en: 'Fatigue on the road',
            rotulo_es: 'Cansancio en la carretera',
            rotulo_ptpt: 'Cansaço na estrada',
            regra: 'Pilotar cansa mais que dirigir: o corpo trabalha o tempo todo para equilibrar, e o vento e o ruído somam. Pare a cada duas horas, mesmo sem sentir sono — o cansaço aparece primeiro na atenção e só depois nos olhos. Beba água: desidratação reduz a concentração antes de dar sede.',
            regra_en: 'Riding tires you more than driving: the body works all the time to balance, and wind and noise add up. Stop every two hours, even if you do not feel sleepy — fatigue shows up in your attention first and only later in your eyes. Drink water: dehydration cuts concentration before it makes you thirsty.',
            regra_es: 'Conducir una moto cansa más que un coche: el cuerpo trabaja todo el tiempo para equilibrar, y el viento y el ruido se suman. Pare cada dos horas, aunque no tenga sueño — el cansancio aparece primero en la atención y solo después en los ojos. Beba agua: la deshidratación reduce la concentración antes de dar sed.',
            regra_ptpt: 'Conduzir uma mota cansa mais do que um carro: o corpo trabalha a toda a hora para equilibrar, e o vento e o ruído somam-se. Pare de duas em duas horas, mesmo sem sono — o cansaço aparece primeiro na atenção e só depois nos olhos. Beba água: a desidratação reduz a concentração antes de dar sede.',
        },
        {
            rotulo: 'A revisão antes de uma viagem longa',
            rotulo_en: 'The check before a long trip',
            rotulo_es: 'La revisión antes de un viaje largo',
            rotulo_ptpt: 'A revisão antes de uma viagem longa',
            regra: 'Confira pneus (desenho da banda e calibragem, com a moto carregada como vai viajar), corrente (tensão e lubrificação), freios, luzes e setas, e o nível de óleo. Leve a documentação e o contato do seu seguro ou assistência onde você alcance sem descarregar a bagagem.',
            regra_en: 'Check the tyres (tread and pressure, with the bike loaded as you will travel), the chain (tension and lubrication), brakes, lights and indicators, and the oil level. Carry your documents and your insurance or assistance contact somewhere you can reach without unloading the luggage.',
            regra_es: 'Revise los neumáticos (dibujo y presión, con la moto cargada como va a viajar), la cadena (tensión y lubricación), los frenos, las luces e intermitentes y el nivel de aceite. Lleve la documentación y el contacto de su seguro o asistencia donde pueda alcanzarlos sin descargar el equipaje.',
            regra_ptpt: 'Confira os pneus (desenho e pressão, com a mota carregada como vai viajar), a corrente (tensão e lubrificação), os travões, as luzes e os piscas, e o nível de óleo. Leve a documentação e o contacto do seu seguro ou assistência onde consiga alcançar sem descarregar a bagagem.',
        },
    ],
};

// --- COMPONENTE ACCORDION CARD (padrão estático, pois as malas são checklists físicos) ---
/** Uma linha de item, com o marcador na cor do kit. */
function ItemLinha({ texto, cor }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: cor, marginRight: 10, marginTop: 6 }} />
            <Body style={{ color: Neo.colors.neutral[700], fontSize: 13, flex: 1, lineHeight: 18 }}>{texto}</Body>
        </View>
    );
}

function CategoryCard({ category, expanded, onToggle }) {
    const { t } = useTranslation('common');
    const toggle = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onToggle(category.id);
    };

    return (
        <NeoCard variant="elevated" style={{ marginBottom: 14, overflow: 'hidden' }}>
            <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                <View style={{
                    width: 44, height: 44, borderRadius: 22,
                    backgroundColor: category.color + '18',
                    alignItems: 'center', justifyContent: 'center', marginRight: 14
                }}>
                    <NeoIcon name={category.icon} size={24} color={category.color} />
                </View>
                <View style={{ flex: 1 }}>
                    <H3 style={{ color: Neo.colors.neutral[900], fontSize: 15 }}>{t_field(category, 'title')}</H3>
                    <Small style={{ color: Neo.colors.neutral[500], fontSize: 11, marginTop: 2 }}>
                        {t('travel.kitItemCount', '{{count}} itens', { count: contarItens(category) })}
                    </Small>
                </View>
                {expanded ? <NeoIcon name="ArrowUp2" size={20} color={category.color} /> : <NeoIcon name="ArrowDown2" size={20} color={category.color} />}
            </TouchableOpacity>

            {expanded && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, marginBottom: 14, fontStyle: 'italic', lineHeight: 18 }}>{t_field(category, 'intro')}</Body>

                    {/* Kits com subseção (medicamentos, primeiros socorros, higiene)
                        mantêm a divisão: uma lista corrida de 15 itens vira parede. */}
                    {category.sections
                        ? category.sections.map((sec, si) => (
                            <View key={si} style={{ marginBottom: si < category.sections.length - 1 ? 14 : 0 }}>
                                <Caption style={{ color: category.color, fontWeight: '800', marginBottom: 6, letterSpacing: 0.3 }}>
                                    {t_field(sec, 'subtitle')}
                                </Caption>
                                {t_array(sec, 'items').map((item, ii) => (
                                    <ItemLinha key={ii} texto={item} cor={category.color} />
                                ))}
                            </View>
                        ))
                        : t_array(category, 'items').map((item, ii) => (
                            <ItemLinha key={ii} texto={item} cor={category.color} />
                        ))}
                </View>
            )}
        </NeoCard>
    );
}

// ═══════════════════════════════════════════════════
// TELA PRINCIPAL
// ═══════════════════════════════════════════════════
export default function FazendoAsMalasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [expandedId, setExpandedId] = useState(null);
    const [activeTrip, setActiveTrip] = useState(null);

    // Parallax Hero
    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 200;
    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.5],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolate: 'clamp',
            })
        }
    ];

    React.useEffect(() => {
        const loadTrip = async () => {
            const data = await AsyncStorage.getItem('@active_trip');
            if (data) setActiveTrip(JSON.parse(data));
        };
        loadTrip();
    }, []);

    const handleToggle = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

    const kitsToDisplay = buildDynamicKits(activeTrip);

    return (
        <AppBackground>
            <StatusBar style="light" />

            {/* Header Translúcido Flutuante */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral.white} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 44 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, fontSize: 18 }}>{t('travel.packing', 'Saindo de Viagem')}</H2>
                    </View>
                </View>
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                style={{ flex: 1, zIndex: 10 }}
            >
                {/* Hero Imersivo */}
                <Animated.View style={{
                    width: SCREEN_W,
                    height: HERO_HEIGHT,
                    transform: heroTransform,
                    marginBottom: 24,
                    marginHorizontal: -16,
                }}>
                    <Image
                        source={require('../../assets/images/headers/header-malas.jpeg')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', padding: 24 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, marginBottom: 4 }}>{t('travel.packing', 'Saindo de Viagem')}</H2>
                    </View>
                </Animated.View>

                {/* Intro */}
                <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], marginBottom: 16, paddingHorizontal: 8, lineHeight: 20 }}>
                    {t('travel.packingIntro', 'Monte seus kits essenciais de viagem. Toque em cada categoria para expandir.')}
                </Body>

                {kitsToDisplay.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} expanded={expandedId === cat.id} onToggle={handleToggle} />
                ))}

                {/* Regras do modal escolhido. Antes o bloco AEREO aparecia sempre,
                    mesmo em viagem de carro — regra de embarque que nao se aplicava. */}
                {activeTrip?.transportMode === 'aviao' && (
                <NeoCard variant="elevated" style={{ marginTop: 4, marginBottom: 8, padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                            <NeoIcon name="Airplane" size={20} color={Neo.colors.feedback.warning} />
                        </View>
                        <H3 style={{ color: Neo.colors.feedback.warning, fontSize: 14, flex: 1 }}>{t_field(TRANSPORTE_AEREO, 'title')}</H3>
                    </View>
                    <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18, marginBottom: 12 }}>{t_field(TRANSPORTE_AEREO, 'intro')}</Body>
                    {TRANSPORTE_AEREO.blocos.map((b, i) => (
                        <View key={i} style={{ marginBottom: 10 }}>
                            <Body style={{ color: Neo.colors.neutral[800], fontSize: 12.5, fontWeight: '800', marginBottom: 2 }}>{t_field(b, 'rotulo')}</Body>
                            <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18 }}>{t_field(b, 'regra')}</Body>
                        </View>
                    ))}
                    <View style={{ borderTopWidth: 1, borderTopColor: Neo.colors.neutral[200], marginTop: 4, paddingTop: 8 }}>
                        <Caption style={{ color: Neo.colors.neutral[500], fontSize: 10.5, lineHeight: 15 }}>{t('telas.FazendoAsMalasScreen.fonte', 'Fonte: ')}{t_field(TRANSPORTE_AEREO, 'fonte')}{t('telas.FazendoAsMalasScreen.vigenteEm', ' · vigente em ')}{t_field(TRANSPORTE_AEREO, 'revisao')}.
                        </Caption>
                    </View>
                    {/* Aviso de segurança em DESTAQUE (não mais grudado na fonte miúda) */}
                    <SafetyDisclaimer variant="travelAir" style={{ marginTop: 10 }} />
                </NeoCard>
                )}

                {activeTrip?.transportMode === 'moto' && (
                <NeoCard variant="elevated" style={{ marginTop: 4, marginBottom: 8, padding: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                            <NeoIcon name="Danger" size={20} color={Neo.colors.feedback.warning} />
                        </View>
                        <H3 style={{ color: Neo.colors.feedback.warning, fontSize: 14, flex: 1 }}>{t_field(TRANSPORTE_MOTO, 'title')}</H3>
                    </View>
                    <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18, marginBottom: 12 }}>{t_field(TRANSPORTE_MOTO, 'intro')}</Body>
                    {TRANSPORTE_MOTO.blocos.map((b, i) => (
                        <View key={i} style={{ marginBottom: 10 }}>
                            <Body style={{ color: Neo.colors.neutral[800], fontSize: 12.5, fontWeight: '800', marginBottom: 2 }}>{t_field(b, 'rotulo')}</Body>
                            <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18 }}>{t_field(b, 'regra')}</Body>
                        </View>
                    ))}
                    <SafetyDisclaimer variant="travelAir" style={{ marginTop: 10 }} />
                </NeoCard>
                )}

                <Caption style={{ textAlign: 'center', marginTop: 20, color: Neo.colors.neutral[500] }}>
                    {t('headersFirst.boaViagemSeguranAEmPrimeiroLugar', 'Boa viagem! Segurança em primeiro lugar. 🧳')}
                </Caption>
            </Animated.ScrollView>
        </AppBackground>
    );
}
