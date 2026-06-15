import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
            'Receitas médicas atualizadas',
        ],
    },
    {
        id: 'primeiros_socorros',
        title: 'Primeiros Socorros',
        icon: 'Health',
        color: Neo.colors.feedback.error,
        intro: 'Um kit fixo para pequenas emergências.',
        items: [
            'Band-aids, gaze e esparadrapo',
            'Antisséptico e soro fisiológico',
            'Termômetro digital e luvas',
            'Pomada para queimaduras e picadas',
        ],
    },
];

// ═══════════════════════════════════════════════════
// SEÇÃO 2: VOLTANDO PRA CASA (FIXO)
// ═══════════════════════════════════════════════════
const VOLTANDO_DATA = [
    {
        id: 'objetos',
        title: 'Objetos Pessoais',
        icon: 'Bag2',
        color: Neo.colors.secondary[500],
        intro: 'Evite o esquecimento nos locais mais comuns.',
        items: [
            'Tomadas (carregadores)',
            'Cofre, gavetas e armários',
            'Banheiro (itens pendurados)',
            'Embaixo da cama e travesseiros',
        ],
    },
    {
        id: 'checkout',
        title: 'Hospedagem e Segurança',
        icon: 'Building',
        color: Neo.colors.feedback.warning,
        intro: 'Encerramento seguro da estadia.',
        items: [
            'Devolver chaves e cartões',
            'Verificar frigobar',
            'Conferir pneus e combustível antes de partir',
        ],
    },
];

// Regras de transporte aéreo — conteúdo SENSÍVEL (regra errada = barrado no
// raio-x / multa). Validado em jun/2026 (ANAC/IATA). Power bank teve mudança
// material em 2026 (máx. 2, sem recarga a bordo, só na mão). Ver memória
// project-modo-viagem-compliance. NÃO hardcodar regra de companhia específica.
const TRANSPORTE_AEREO = {
    title: 'Bagagem Aérea: o que pode e onde',
    intro: 'Vai de avião? Estas regras evitam barreira no embarque. Mudaram em 2026 — confirme com a sua companhia.',
    blocos: [
        { rotulo: 'Power bank e baterias de lítio', regra: 'Só na bagagem de mão (nunca despachar). Máx. 2 por pessoa, até 100 Wh — de 100 a 160 Wh exige autorização da companhia, acima disso é proibido. Não recarregue a bordo e mantenha à vista. Vale para voo nacional e internacional.' },
        { rotulo: 'Líquidos, géis e aerossóis', regra: 'Voo internacional: frascos de até 100 ml dentro de um saco plástico transparente de até 1 litro. Voo nacional no Brasil: não há esse limite. Exceções: remédio com receita, leite materno e papinha de bebê.' },
        { rotulo: 'Medicamentos', regra: 'Leve na bagagem de mão, na embalagem original e com a receita (física ou digital) — sobretudo os de uso contínuo e de tarja preta.' },
        { rotulo: 'Cortantes e isqueiro', regra: 'Tesoura, canivete e lâminas vão na bagagem despachada. Isqueiro: apenas um, levado com você — nunca na mala despachada.' },
    ],
    fonte: 'ANAC · IATA',
    revisao: 'jun/2026',
};

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
    intro: 'Segurança e saúde do seu animal.',
    items: [
        'Ração e bebedouro portátil',
        'Guia e coleira com identificação',
        'Carteira de vacinação',
        'Tapetes higiênicos',
    ],
};

const MODULE_IDOSO_PCD = {
    id: 'kit_especial',
    title: 'Módulo Cuidados Especiais',
    icon: 'User',
    color: Neo.colors.neutral[700],
    intro: 'Itens críticos para mobilidade e saúde.',
    items: [
        'Cópia de prontuários médicos',
        'Lista de contatos de emergência',
        'Equipamentos de apoio (bengala, etc)',
        'Pulseira de identificação',
    ],
};

const MODULE_CRIANCAS = {
    id: 'kit_criancas',
    title: 'Módulo Crianças',
    icon: 'Baby',
    color: Neo.colors.secondary[500],
    intro: 'Segurança e saúde dos pequenos na estrada.',
    items: [
        'Medicação infantil com dosador + receitas',
        'Pulseira de identificação com telefone dos pais',
        'Protetores de tomada portáteis',
        'Cadeirinha/assento de elevação para os trajetos',
        'Itens de conforto e troca extra na bagagem de mão',
    ],
};

const MODULE_PRAIA = {
    id: 'kit_praia',
    title: 'Módulo Litoral',
    icon: 'Waves',
    color: Neo.colors.primary[500],
    intro: 'Sol e água pedem proteção específica.',
    items: [
        'Colete salva-vidas infantil (boia de braço não protege)',
        'Guarda-sol ou tenda com proteção UV',
        'Chinelos antiderrapantes',
        'Água potável para os trajetos',
    ],
};

const MODULE_RURAL = {
    id: 'kit_rural',
    title: 'Módulo Campo e Natureza',
    icon: 'Plant',
    color: Neo.colors.primary[700],
    intro: 'Onde o socorro demora, o preparo chega antes.',
    items: [
        'Repelente e calçado fechado',
        'Lanterna + pilhas extras',
        'Mapa offline da região (sinal pode faltar)',
        'Capa de chuva e agasalho',
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

// --- COMPONENTE ACCORDION CARD (padrão Guia de Segurança) ---
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

function SectionBanner({ emoji, title, subtitle, color, first }) {
    return (
        <View style={{ marginTop: first ? 0 : 24, marginBottom: 16 }}>
            <View style={{
                flexDirection: 'row', alignItems: 'center',
                backgroundColor: color + '15', paddingVertical: 14, paddingHorizontal: 20,
                borderRadius: 16, borderWidth: 1.5, borderColor: color + '30',
            }}>
                <Body style={{ fontSize: 24, marginRight: 14 }}>{emoji}</Body>
                <View style={{ flex: 1 }}>
                    <H3 style={{ color: color, fontSize: 18 }}>{title}</H3>
                    <Small style={{ color: color + 'AA', fontSize: 12 }}>{subtitle}</Small>
                </View>
            </View>
        </View>
    );
}

// ═══════════════════════════════════════════════════
// TELA PRINCIPAL
// ═══════════════════════════════════════════════════
export default function FazendoAsMalasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [expandedId, setExpandedId] = useState(null);
    const [activeTrip, setActiveTrip] = useState(null);

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

    const getDynamicKits = () => {
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
    };

    const kitsToDisplay = getDynamicKits();

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 44, height: 44, borderRadius: 22,
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            alignItems: 'center', justifyContent: 'center',
                            borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)'
                        }}
                    >
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 190 }}>

                    <SectionBanner
                        emoji="✈️"
                        title="Saindo de Viagem"
                        subtitle="Kits sugeridos para você"
                        color={Neo.colors.secondary[500]}
                        first
                    />

                    {/* Intro */}
                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], marginBottom: 16, paddingHorizontal: 8, lineHeight: 20 }}>
                        {t('travel.packingIntro', 'Monte seus kits essenciais de viagem. Toque em cada categoria para expandir.')}
                    </Body>

                    {kitsToDisplay.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} expanded={expandedId === cat.id} onToggle={handleToggle} />
                    ))}

                    <NeoCard variant="elevated" style={{ marginTop: 4, marginBottom: 8, padding: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <NeoIcon name="Airplane" size={20} color={Neo.colors.feedback.warning} />
                            </View>
                            <H3 style={{ color: Neo.colors.feedback.warning, fontSize: 14, flex: 1 }}>{TRANSPORTE_AEREO.title}</H3>
                        </View>
                        <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18, marginBottom: 12 }}>{TRANSPORTE_AEREO.intro}</Body>
                        {TRANSPORTE_AEREO.blocos.map((b, i) => (
                            <View key={i} style={{ marginBottom: 10 }}>
                                <Body style={{ color: Neo.colors.neutral[800], fontSize: 12.5, fontWeight: '800', marginBottom: 2 }}>{b.rotulo}</Body>
                                <Body style={{ color: Neo.colors.neutral[600], fontSize: 12, lineHeight: 18 }}>{b.regra}</Body>
                            </View>
                        ))}
                        <View style={{ borderTopWidth: 1, borderTopColor: Neo.colors.neutral[200], marginTop: 4, paddingTop: 8 }}>
                            <Caption style={{ color: Neo.colors.neutral[500], fontSize: 10.5, lineHeight: 15 }}>
                                Fonte: {TRANSPORTE_AEREO.fonte} · vigente em {TRANSPORTE_AEREO.revisao}. As regras mudam — confirme com a sua companhia antes de viajar.
                            </Caption>
                        </View>
                    </NeoCard>

                    <SectionBanner
                        emoji="🏠"
                        title="Voltando pra Casa"
                        subtitle="O que conferir antes de sair"
                        color={Neo.colors.primary[500]}
                    />

                    {VOLTANDO_DATA.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} expanded={expandedId === cat.id} onToggle={handleToggle} />
                    ))}

                    <Caption style={{ textAlign: 'center', marginTop: 20, color: Neo.colors.neutral[500] }}>
                        {t('headersFirst.boaViagemSeguranAEmPrimeiroLugar', 'Boa viagem! Segurança em primeiro lugar. 🧳')}
                    </Caption>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}
