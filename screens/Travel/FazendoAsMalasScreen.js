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
    intro: 'Vai de avião? Estas regras evitam barreira no embarque. Mudaram em 2026 — confirme com a sua companhia.',
    intro_en: 'Flying? These rules help you avoid trouble at security. They changed in 2026 — check with your airline.',
    intro_es: '¿Viaja en avión? Estas reglas evitan problemas en el control. Cambiaron en 2026 — confírmelo con su aerolínea.',
    intro_ptpt: 'Vai de avião? Estas regras evitam problemas no controlo de segurança. Mudaram em 2026 — confirme com a sua companhia.',
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
            regra: 'Voo internacional: frascos de até 100 ml dentro de um saco plástico transparente de até 1 litro. No Brasil, o voo nacional não tem esse limite; na Europa, nos EUA e no Reino Unido, em geral ele vale para todos os voos. Exceções: remédio com receita, leite materno e papinha de bebê.',
            regra_en: 'International flights: containers of up to 100 ml in a clear plastic bag of up to 1 litre. In Brazil, domestic flights have no such limit; in Europe, the US and the UK it generally applies to all flights. Exceptions: prescription medicine, breast milk and baby food.',
            regra_es: 'Vuelo internacional: envases de hasta 100 ml dentro de una bolsa de plástico transparente de hasta 1 litro. En Brasil, el vuelo nacional no tiene ese límite; en Europa, EE. UU. y el Reino Unido, en general se aplica a todos los vuelos. Excepciones: medicamentos con receta, leche materna y comida para bebé.',
            regra_ptpt: 'Voo internacional: embalagens de até 100 ml dentro de um saco de plástico transparente de até 1 litro. No Brasil, o voo doméstico não tem esse limite; na Europa, nos EUA e no Reino Unido, em geral aplica-se a todos os voos. Exceções: medicamentos com receita, leite materno e comida de bebé.',
        },
        {
            rotulo: 'Medicamentos',
            rotulo_en: 'Medicines',
            rotulo_es: 'Medicamentos',
            regra: 'Leve na bagagem de mão, na embalagem original e com a receita (física ou digital) — sobretudo os de uso contínuo e de tarja preta.',
            regra_en: 'Keep them in your carry-on, in the original packaging and with the prescription (paper or digital) — especially long-term and controlled medicines.',
            regra_es: 'Llévelos en el equipaje de mano, en el envase original y con la receta (en papel o digital) — sobre todo los de uso continuo y los controlados.',
            regra_ptpt: 'Leve-os na bagagem de mão, na embalagem original e com a receita (em papel ou digital) — sobretudo os de uso contínuo e os sujeitos a controlo especial.',
        },
        {
            rotulo: 'Cortantes e isqueiro',
            rotulo_en: 'Sharp items and lighters',
            rotulo_es: 'Objetos cortantes y encendedor',
            rotulo_ptpt: 'Objetos cortantes e isqueiro',
            regra: 'Tesoura, canivete e lâminas vão na bagagem despachada. Isqueiro: apenas um, levado com você — nunca na mala despachada.',
            regra_en: 'Scissors, pocket knives and blades go in checked baggage. Lighters: just one, carried on you — never in checked baggage.',
            regra_es: 'Tijeras, navajas y cuchillas van en el equipaje facturado. Encendedor: solo uno, que lleve consigo — nunca en la maleta facturada.',
            regra_ptpt: 'Tesouras, canivetes e lâminas vão na bagagem de porão. Isqueiro: apenas um, levado consigo — nunca na mala de porão.',
        },
    ],
    fonte: 'ANAC (IS 175-001M) · OACI · IATA',
    fonte_en: 'ANAC (IS 175-001M) · ICAO · IATA',
    fonte_es: 'ANAC (IS 175-001M) · OACI · IATA',
    revisao: 'out/2026',
    revisao_en: 'Oct 2026',
    revisao_es: 'oct. 2026',
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

                {/* Regras de Transporte Aéreo (conteúdo sensível + fonte) */}
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

                <Caption style={{ textAlign: 'center', marginTop: 20, color: Neo.colors.neutral[500] }}>
                    {t('headersFirst.boaViagemSeguranAEmPrimeiroLugar', 'Boa viagem! Segurança em primeiro lugar. 🧳')}
                </Caption>
            </Animated.ScrollView>
        </AppBackground>
    );
}
