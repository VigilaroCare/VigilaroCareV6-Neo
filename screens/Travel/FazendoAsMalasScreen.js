import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_W = Dimensions.get('window').width;

// ═══════════════════════════════════════════════════
// SEÇÃO 1: SAINDO DE VIAGEM (BASE)
// ═══════════════════════════════════════════════════
const SAINDO_DATA = [
    {
        id: 'medicamentos_ida',
        title: 'Medicamentos Essenciais',
        icon: 'Lovely',
        color: Neo.colors.feedback.error,
        intro: 'A gestão cuidadosa dos medicamentos é crítica.',
        items: [
            'Uso contínuo + margem de 3 a 5 dias extras',
            'Manter na embalagem original',
            'Analgésicos, antitérmicos e antialérgicos',
            'Receitas médicas atualizadas (físicas ou digitais)',
        ],
    },
    {
        id: 'docs_ida',
        title: 'Documentos Vitais',
        icon: 'DocumentText',
        color: Neo.colors.primary[500],
        intro: 'Imprevistos acontecem; tenha cópias e acesso offline.',
        items: [
            'Passaporte/RG válidos e em bom estado',
            'Cartão de vacinas (físico e digital)',
            'Certidão de nascimento (menores de idade)',
            'Cartão do plano de saúde e SUS',
        ],
    },
    {
        id: 'conforto_ida',
        title: 'Kit Conforto',
        icon: 'Coffee',
        color: Neo.colors.feedback.warning,
        intro: 'Prevenção de pequenos estresses durante o trajeto.',
        items: [
            'Garrafa de água (vazia para encher após raio-x no aeroporto)',
            'Lanche não perecível',
            'Muda de roupa leve na bagagem de mão (caso a despachada atrase)',
            'Itens de higiene básica (escova, pasta de até 100ml)',
        ],
    },
];

// --- MÓDULOS DE KITS DINÂMICOS ---
const MODULE_LAZER = {
    id: 'kit_lazer',
    title: 'Módulo de Lazer',
    icon: 'Sun1',
    color: Neo.colors.feedback.warning,
    intro: 'Itens para diversão e atividades ao ar livre.',
    items: [
        'Protetor solar e pós-sol',
        'Óculos de sol e chapéu',
        'Roupas de banho',
        'Brinquedos ou livros de lazer',
    ],
};

const MODULE_TRABALHO = {
    id: 'kit_trabalho',
    title: 'Módulo de Trabalho',
    icon: 'Briefcase',
    color: Neo.colors.primary[500],
    intro: 'Segurança para equipamentos e produtividade.',
    items: [
        'Notebook, tablet e carregadores',
        'Powerbank e adaptador universal',
        'Fones com cancelamento de ruído',
        'Cadeado de cabo para notebook',
    ],
};

const MODULE_PETS = {
    id: 'kit_pets',
    title: 'Módulo Pet',
    icon: 'Pet',
    color: Neo.colors.feedback.error,
    intro: 'Segurança e bem-estar do seu animal.',
    items: [
        'Carteira de vacinação atualizada do pet',
        'Caixa de transporte adequada ao modal',
        'Coleira extra com plaquinha de identificação',
        'Alimento e água para o trajeto',
    ],
};

const MODULE_CRIANCAS = {
    id: 'kit_criancas',
    title: 'Módulo Infantil',
    icon: 'Baby',
    color: Neo.colors.secondary[500],
    intro: 'Entretenimento e cuidados extras para os pequenos.',
    items: [
        'Medicamentos pediátricos específicos (enjoo, febre)',
        'Pulseiras de identificação (nome + tel)',
        'Lanches fáceis e sem farelo',
        'Brinquedo de apego e itens de distração (jogos/tablet)',
    ],
};

const MODULE_IDOSO_PCD = {
    id: 'kit_idoso_pcd',
    title: 'Módulo Acessibilidade e Apoio',
    icon: 'Heart',
    color: Neo.colors.primary[400],
    intro: 'Facilitadores de locomoção e conforto.',
    items: [
        'Bengala, andador ou cadeira de rodas bem revisados',
        'Laudos médicos (especialmente para voos e cruzeiros)',
        'Calçados muito confortáveis e antiderrapantes',
        'Travesseiro de pescoço ergonômico',
    ],
};

const MODULE_PRAIA = {
    id: 'kit_praia',
    title: 'Módulo Praia & Resort',
    icon: 'SwimmingPool',
    color: Neo.colors.feedback.success,
    intro: 'Cuidados essenciais sob o sol.',
    items: [
        'Repelente resistente à água',
        'Boia de corpo ou colete salva-vidas infantil',
        'Saco estanque para proteger celular da areia e água',
    ],
};

const MODULE_RURAL = {
    id: 'kit_rural',
    title: 'Módulo Campo & Natureza',
    icon: 'Plant',
    color: Neo.colors.feedback.success,
    intro: 'Prevenção contra insetos e clima imprevisível.',
    items: [
        'Repelente forte (icaridina) para carrapatos e mosquitos',
        'Botas ou calçados fechados (prevenção de animais peçonhentos)',
        'Capa de chuva leve ou anorak',
        'Lanterna de cabeça com pilhas extras',
    ],
};

const MODULE_INTERNACIONAL = {
    id: 'kit_internacional',
    title: 'Módulo Internacional',
    icon: 'Global',
    color: Neo.colors.secondary[600] || Neo.colors.secondary[500],
    intro: 'Documentação e energia para outro país.',
    items: [
        'Adaptador universal de tomadas',
        'Cópias do passaporte (física + nuvem)',
        'Apólice do seguro viagem acessível offline',
        'Contato do consulado brasileiro no destino',
    ],
};

// Monta os kits cruzando o briefing da viagem. Pura e exportada para o
// TravelReportService reusar a MESMA lógica (fonte única dos kits).
export function buildDynamicKits(activeTrip) {
    const kits = [...SAINDO_DATA];
    if (!activeTrip) return kits;

    if (activeTrip.purpose === 'trabalho') {
        kits.push(MODULE_TRABALHO);
    } else {
        kits.push(MODULE_LAZER);
    }

    if (activeTrip.config?.hasKids) kits.push(MODULE_CRIANCAS);
    if (activeTrip.config?.hasPets) kits.push(MODULE_PETS);
    if (activeTrip.config?.hasElderly || activeTrip.config?.hasPcd) kits.push(MODULE_IDOSO_PCD);

    // Tipo de destino e internacional — completam o cruzamento do briefing
    if (activeTrip.type === 'praia' || activeTrip.type === 'resort') kits.push(MODULE_PRAIA);
    if (activeTrip.type === 'rural') kits.push(MODULE_RURAL);
    if (activeTrip.config?.isInternational) kits.push(MODULE_INTERNACIONAL);

    return kits;
}

// --- COMPONENTE ACCORDION CARD (padrão estático, pois as malas são checklists físicos) ---
function CategoryCard({ category, expanded, onToggle }) {
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
                    <H3 style={{ color: Neo.colors.neutral[900], fontSize: 15 }}>{category.title}</H3>
                    <Small style={{ color: Neo.colors.neutral[500], fontSize: 11, marginTop: 2 }}>{category.items.length} itens</Small>
                </View>
                {expanded ? <NeoIcon name="ArrowUp2" size={20} color={category.color} /> : <NeoIcon name="ArrowDown2" size={20} color={category.color} />}
            </TouchableOpacity>

            {expanded && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, marginBottom: 14, fontStyle: 'italic', lineHeight: 18 }}>{category.intro}</Body>
                    {category.items.map((item, ii) => (
                        <View key={ii} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: category.color, marginRight: 10, marginTop: 6 }} />
                            <Body style={{ color: Neo.colors.neutral[700], fontSize: 13, flex: 1, lineHeight: 18 }}>{item}</Body>
                        </View>
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
                        source={{ uri: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        locations={[0.3, 1]}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', padding: 24 }}
                    >
                        <H2 style={{ color: Neo.colors.neutral.white, marginBottom: 4 }}>{t('travel.packing', 'Saindo de Viagem')}</H2>
                        <Small style={{ color: 'rgba(255,255,255,0.8)' }}>Kits sugeridos para você</Small>
                    </LinearGradient>
                </Animated.View>

                {/* Intro */}
                <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], marginBottom: 16, paddingHorizontal: 8, lineHeight: 20 }}>
                    {t('travel.packingIntro', 'Monte seus kits essenciais de viagem. Toque em cada categoria para expandir.')}
                </Body>

                {kitsToDisplay.map((cat) => (
                    <CategoryCard key={cat.id} category={cat} expanded={expandedId === cat.id} onToggle={handleToggle} />
                ))}

                <Caption style={{ textAlign: 'center', marginTop: 20, color: Neo.colors.neutral[500] }}>
                    {t('headersFirst.boaViagemSeguranAEmPrimeiroLugar', 'Boa viagem! Segurança em primeiro lugar. 🧳')}
                </Caption>
            </Animated.ScrollView>
        </AppBackground>
    );
}
