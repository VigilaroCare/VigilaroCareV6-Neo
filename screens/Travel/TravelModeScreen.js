import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, ActivityIndicator, DeviceEventEmitter, Text, StyleSheet, LayoutAnimation, UIManager, Platform, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoAlert from '../../utils/NeoAlert';

// Dimensões em PIXELS (lição da Home: % não resolve dentro de wrappers
// auto-dimensionados — a Image assume o tamanho intrínseco do PNG, 480px)
const SCREEN_W = Dimensions.get('window').width;
const CONTENT_W = SCREEN_W - Neo.spacing.lg * 2; // padding horizontal do scroll
const CELL_W = CONTENT_W * 0.48;                 // célula do grid 2-col
const TILE_W = Math.round(CELL_W * 0.88);
const TILE_H = Math.round(TILE_W * (436 / 428)); // proporção dos assets normalizados

// Pictogramas cerâmicos 3D (tile creme + moldura verde embutidos no PNG,
// mesma linguagem da Home e do Hub). O asset É o card — render sem NeoCard.
const TRAVEL_PICTOGRAMS = {
    // destinos (wizard)
    rural:    require('../../assets/illustrations/travel-pictograms/pictogram-destino-rural.png'),
    praia:    require('../../assets/illustrations/travel-pictograms/pictogram-destino-litoral.png'),
    urbano:   require('../../assets/illustrations/travel-pictograms/pictogram-destino-urbano.png'),
    resort:   require('../../assets/illustrations/travel-pictograms/pictogram-destino-resort.png'),
    // assistente de viagem (dashboard)
    partida:  require('../../assets/illustrations/travel-pictograms/pictogram-viagem-partida.png'),
    malas:    require('../../assets/illustrations/travel-pictograms/pictogram-viagem-malas.png'),
    chegada:  require('../../assets/illustrations/travel-pictograms/pictogram-viagem-chegada.png'),
    checkout: require('../../assets/illustrations/travel-pictograms/pictogram-viagem-checkout.png'),
    guia:     require('../../assets/illustrations/travel-pictograms/pictogram-viagem-guia.png'),
    // propósito da viagem (wizard)
    lazer:    require('../../assets/illustrations/travel-pictograms/pictogram-proposito-lazer.png'),
    trabalho: require('../../assets/illustrations/travel-pictograms/pictogram-proposito-trabalho.png'),
    // destino internacional? (wizard)
    internacional: require('../../assets/illustrations/travel-pictograms/pictogram-destino-internacional.png'),
    nacional:      require('../../assets/illustrations/travel-pictograms/pictogram-destino-nacional.png'),
    // quem vai junto (wizard)
    criancas: require('../../assets/illustrations/travel-pictograms/pictogram-companhia-criancas.png'),
    idosos:   require('../../assets/illustrations/travel-pictograms/pictogram-companhia-idosos.png'),
    pets:     require('../../assets/illustrations/travel-pictograms/pictogram-companhia-pets.png'),
    pcd:      require('../../assets/illustrations/travel-pictograms/pictogram-companhia-pcd.png'),
};

const TRIP_TYPES = [
    { id: 'rural', label: 'Área Rural', label_en: 'Rural Area', label_es: 'Área Rural', icon: 'Tree', color: Neo.colors.feedback.success, desc: 'Isolamento, animais, rios.', desc_en: 'Isolation, animals, rivers.', desc_en: 'Aislamiento, animales, ríos.' },
    { id: 'praia', label: 'Litoral', label_en: 'Coastal Area', label_es: 'Zona Costera', icon: 'Sun1', color: Neo.colors.feedback.warning, desc: 'Sol, mar, piscina.', desc_en: 'Sun, sea, pool.', desc_es: 'Sol, mar, piscina.' },
    { id: 'urbano', label: 'Área Urbana', label_en: 'Urban Area', label_es: 'Área Urbana', icon: 'Building', color: Neo.colors.secondary[500], desc: 'Janelas, trânsito, aglomeração.', desc_en: 'Windows, traffic, crowds.', desc_es: 'Ventanas, tráfico, multitudes.' },
    { id: 'resort', label: 'Resort e Lazer', label_en: 'Resort & Leisure', label_es: 'Resort y Ocio', icon: 'Sun1', color: Neo.colors.primary[500], desc: 'Piscinas, áreas comuns.', desc_en: 'Pools, common areas.', desc_es: 'Piscinas, áreas comunes.' }
];

// Tile cerâmico selecionável — padrão único dos seletores do wizard.
// selected: badge de check + label forest; dimmed: recua a 55% de opacidade.
function CeramicSelectTile({ source, label, selected, dimmed, onPress }) {
    return (
        <ScaleButton
            style={s.gridCell}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={label}
        >
            <View style={s.ceramicCell}>
                <View style={s.ceramicTileWrap}>
                    <Image
                        source={source}
                        style={[s.ceramicTile, dimmed && s.ceramicTileDimmed]}
                        resizeMode="contain"
                    />
                    {selected && (
                        <View style={s.ceramicCheckBadge}>
                            <NeoIcon name="TickCircle" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                    )}
                </View>
                <Text style={[s.gridLabel, selected && { color: Neo.colors.primary[700] }]}>
                    {label}
                </Text>
            </View>
        </ScaleButton>
    );
}

export default function TravelModeScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textSecondary = themeColors.neutral[700];
    const [activeTrip, setActiveTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedTipIdx, setExpandedTipIdx] = useState(null);

    // Wizard State
    const [tripType, setTripType] = useState(null);
    const [hasKids, setHasKids] = useState(true);
    const [hasPets, setHasPets] = useState(false);
    const [hasElderly, setHasElderly] = useState(false);
    const [hasPcd, setHasPcd] = useState(false);
    const [isInternational, setIsInternational] = useState(false);
    const [tripPurpose, setTripPurpose] = useState('lazer'); // 'lazer' | 'trabalho'

    useEffect(() => {
        loadTrip();
    }, []);

    const loadTrip = async () => {
        try {
            const data = await AsyncStorage.getItem('@active_trip');
            if (data) setActiveTrip(JSON.parse(data));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const startTrip = async () => {
        if (!tripType) return NeoAlert.alert('Selecione o destino');

        const newTrip = {
            id: Date.now().toString(),
            type: tripType,
            purpose: tripPurpose,
            config: { hasKids, hasPets, hasElderly, hasPcd, isInternational },
            startDate: new Date().toISOString(),
            checklists: {
                preparacao: false,
                chegada: false
            }
        };

        await AsyncStorage.setItem('@active_trip', JSON.stringify(newTrip));
        setActiveTrip(newTrip);
        DeviceEventEmitter.emit('travel_mode_changed', true);
    };

    const endTrip = async () => {
        NeoAlert.alert(
            'Encerrar Viagem?',
            'Isso desativará o Modo Viagem.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Encerrar',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('@active_trip');
                        setActiveTrip(null);
                        setTripType(null);
                        DeviceEventEmitter.emit('travel_mode_changed', false);
                    }
                }
            ]
        );
    };

    const openMapsHospital = (term = 'Hospital') => {
        // Query genérica que busca ao redor da localização do usuário
        const url = `https://www.google.com/maps/search/${term}/`;
        Linking.openURL(url);
    };

    if (loading) return <View style={{ flex: 1 }} />;

    // --- WIZARD RENDER ---
    if (!activeTrip) {
        return (
            <AppBackground>
                <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <StatusBar style={isDark ? 'light' : 'dark'} />
                    <ScrollView contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingTop: 12, paddingBottom: 190 }}>
                        {/* HEADER */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={s.backButton}>
                                <NeoIcon name="ArrowLeft" size={20} color={Neo.colors.neutral[800]} />
                            </TouchableOpacity>
                        </View>

                        <NeoCard variant="elevated" style={s.headerCard}>
                            <View style={[s.headerCardIcon, { backgroundColor: Neo.colors.primary[100] }]}>
                                <NeoIcon name="Airplane" size={24} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <Text style={[s.headerCardText, { color: textSecondary }]}>
                                {t('travel.activateMode', 'Ative o Modo Viagem para checklists de segurança específicos.')}
                            </Text>
                        </NeoCard>

                        {/* TIPO DE DESTINO */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.destinationType', 'Qual o tipo de destino?')}</Text>
                        <View style={s.gridContainer}>
                            {TRIP_TYPES.map(trip => (
                                <CeramicSelectTile
                                    key={trip.id}
                                    source={TRAVEL_PICTOGRAMS[trip.id]}
                                    label={t_field(trip, 'label')}
                                    selected={tripType === trip.id}
                                    dimmed={!!tripType && tripType !== trip.id}
                                    onPress={() => setTripType(trip.id)}
                                />
                            ))}
                        </View>

                        {/* PROPÓSITO DA VIAGEM */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.travelPurpose', 'Propósito da Viagem')}</Text>
                        <View style={s.gridContainer}>
                            {[
                                { key: 'lazer', label: t('travel.leisure', 'Lazer') },
                                { key: 'trabalho', label: t('travel.work', 'Trabalho') },
                            ].map(p => (
                                <CeramicSelectTile
                                    key={p.key}
                                    source={TRAVEL_PICTOGRAMS[p.key]}
                                    label={p.label}
                                    selected={tripPurpose === p.key}
                                    dimmed={tripPurpose !== p.key}
                                    onPress={() => setTripPurpose(p.key)}
                                />
                            ))}
                        </View>

                        {/* DESTINO INTERNACIONAL */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.internationalDestination', 'Destino Internacional?')}</Text>
                        <View style={s.gridContainer}>
                            {[
                                { key: true, picto: 'internacional', label: t('common.yes', 'Sim') },
                                { key: false, picto: 'nacional', label: t('travel.national', 'Nacional') },
                            ].map(opt => (
                                <CeramicSelectTile
                                    key={String(opt.key)}
                                    source={TRAVEL_PICTOGRAMS[opt.picto]}
                                    label={opt.label}
                                    selected={isInternational === opt.key}
                                    dimmed={isInternational !== opt.key}
                                    onPress={() => setIsInternational(opt.key)}
                                />
                            ))}
                        </View>

                        {/* QUEM VAI JUNTO */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.whoIsGoing', 'Quem vai junto?')}</Text>
                        <View style={s.gridContainer}>
                            {/* Multi-seleção: cada tile liga/desliga independente —
                                apagado = não vai junto, aceso com check = vai */}
                            {[
                                { key: 'criancas', active: hasKids, toggle: () => setHasKids(!hasKids), label: t('travel.children', 'Crianças') },
                                { key: 'idosos', active: hasElderly, toggle: () => setHasElderly(!hasElderly), label: t('travel.elderly', 'Idosos') },
                                { key: 'pets', active: hasPets, toggle: () => setHasPets(!hasPets), label: t('travel.pets', 'Pets') },
                                { key: 'pcd', active: hasPcd, toggle: () => setHasPcd(!hasPcd), label: t('travel.pwds', 'PCDs') },
                            ].map(item => (
                                <CeramicSelectTile
                                    key={item.key}
                                    source={TRAVEL_PICTOGRAMS[item.key]}
                                    label={item.label}
                                    selected={item.active}
                                    dimmed={!item.active}
                                    onPress={item.toggle}
                                />
                            ))}
                        </View>


                        {/* BOTÃO ATIVAR */}
                        <ScaleButton onPress={startTrip} style={{ marginTop: 24 }}>
                            <NeoCard
                                variant={tripType ? 'primary' : 'flat'}
                                style={s.activateBtn}
                            >
                                <H3 style={{ color: tripType ? Neo.colors.neutral.white : Neo.colors.neutral[400] }}>
                                    {t('travel.activateTravelMode', 'Ativar Modo Viagem')}
                                </H3>
                            </NeoCard>
                        </ScaleButton>
                    </ScrollView>
                </SafeAreaView>
            </AppBackground>
        );
    }

    // --- DASHBOARD RENDER ---
    const config = activeTrip.config || {};

    // SHOW ALL TIPS regardless of config (user requested non-personalized)
    const allTips = [
        { title: 'Afogamento', title_en: 'Drowning', title_es: 'Ahogamiento', text: '• Nunca deixe crianças sozinhas próximas à água.\n• Atenção ao ralo da piscina.\n• Use boias e coletes salva-vidas.\n• Ensine a regra: "Sem adulto, sem água."', text_en: '• Never leave children alone near water.\n• Pay attention to the pool drain.\n• Use life jackets.\n• Teach the rule: "No adult, no water."', text_es: '• Nunca deje a los niños solos cerca del agua.\n• Atención al desagüe de la piscina.\n• Use chalecos salvavidas.\n• Enseñe la regla: "Sin adulto, no hay agua."', icon: 'SwimmingPool', types: ['praia', 'resort', 'rural'] },
        { title: 'Janelas e Sacadas', title_en: 'Windows and Balconies', title_es: 'Ventanas y Balcones', text: '• Em hotéis, verifique se há telas nas janelas.\n• Crianças escalam: afaste camas e cadeiras.\n• Se possível, instale travas de janelas.\n• Sacadas sem vidro são um risco grave.', text_en: '• In hotels, check for window screens.\n• Children climb: move beds and chairs away.\n• If possible, install window locks.\n• Glassless balconies are a serious risk.', text_es: '• En hoteles, verifique si hay mosquiteros.\n• Los niños escalan: aleje camas y sillas.\n• Si es posible, instale seguros de ventanas.\n• Los balcones sin vidrio son un riesgo grave.', icon: 'Building', types: ['urbano', 'resort'] },
        { title: 'Animais e Plantas', title_en: 'Animals and Plants', title_es: 'Animales y Plantas', text: '• Sacuda calçados e roupas antes de usar.\n• Não toque em plantas desconhecidas.\n• Mantenha portas fechadas ao anoitecer.\n• Leve repelente.', text_en: '• Shake out shoes and clothes before use.\n• Do not touch unknown plants.\n• Keep doors closed at dusk.\n• Bring insect repellent.', text_es: '• Sacuda zapatos y ropa antes de usar.\n• No toque plantas desconocidas.\n• Mantenga puertas cerradas al anochecer.\n• Lleve repelente.', icon: 'Plant', types: ['rural'] },
        { title: 'Distância Médica', title_en: 'Medical Distance', title_es: 'Distancia Médica', text: '• Localize o hospital mais próximo.\n• Verifique se o celular tem sinal.\n• Leve um kit de primeiros socorros.\n• Informe alguém sobre seu destino.', text_en: '• Locate the nearest hospital.\n• Check if your cell phone has a signal.\n• Bring a first aid kit.\n• Inform someone about your destination.', text_es: '• Localice el hospital más cercano.\n• Verifique si el celular tiene señal.\n• Lleve un botiquín de primeros auxilios.\n• Informe a alguien sobre su destino.', icon: 'Hospital', types: ['rural'] },
        { title: 'Crianças em Viagem', title_en: 'Children Traveling', title_es: 'Niños de Viaje', text: '• Use pulseira de identificação.\n• Combine um "ponto de encontro".\n• Supervisão visual constante.\n• Ensine o telefone dos pais.', text_en: '• Use an ID bracelet.\n• Agree on a "meeting point".\n• Constant visual supervision.\n• Teach them their parents\' phone number.', text_es: '• Use pulsera de identificación.\n• Acuerde un "punto de encuentro".\n• Supervisión visual constante.\n• Enséñeles el teléfono de los padres.', icon: 'Baby', types: ['all'] },
        { title: 'Idosos em Viagem', title_en: 'Elderly Traveling', title_es: 'Ancianos de Viaje', text: '• Deixe luz acesa para o banheiro.\n• Remova tapetes soltos.\n• Use chinelo antiderrapante.\n• Leve medicamentos organizados.', text_en: '• Leave a light on for the bathroom.\n• Remove loose rugs.\n• Use non-slip slippers.\n• Bring organized medications.', text_es: '• Deje una luz encendida para el baño.\n• Retire alfombras sueltas.\n• Use pantuflas antideslizantes.\n• Lleve medicamentos organizados.', icon: 'PersonSimpleWalk', types: ['all'] },
        { title: 'Pets em Viagem', title_en: 'Pets Traveling', title_es: 'Mascotas de Viaje', text: '• Mantenha sempre na guia.\n• Cuidado com piso quente.\n• Não permita acesso a plantas tóxicas.\n• Leve água fresca.', text_en: '• Always keep on a leash.\n• Beware of hot pavements.\n• Do not allow access to toxic plants.\n• Bring fresh water.', text_es: '• Mantenga siempre con correa.\n• Cuidado con el pavimento caliente.\n• No permita acceso a plantas tóxicas.\n• Lleve agua fresca.', icon: 'PawPrint', types: ['all'] },
        { title: 'Plano de Fuga', title_en: 'Escape Plan', title_es: 'Plan de Escape', text: '• Localize o mapa de evacuação.\n• Identifique as 2 saídas mais próximas.\n• Combine um ponto de encontro externo.', text_en: '• Locate the evacuation map.\n• Identify the 2 nearest exits.\n• Agree on an external meeting point.', text_es: '• Localice el mapa de evacuación.\n• Identifique las 2 salidas más cercanas.\n• Acuerde un punto de encuentro externo.', icon: 'SignOut', types: ['all'] },
        { title: 'PCD / Acessibilidade', title_en: 'Accessibility (PWD)', title_es: 'Accesibilidad', text: '• Localize saídas acessíveis.\n• Cuidado com desníveis.\n• Solicite quarto adaptado.\n• Leve equipamentos de apoio extras.', text_en: '• Locate accessible exits.\n• Beware of uneven surfaces.\n• Request an adapted room.\n• Bring extra support equipment.', text_es: '• Localice salidas accesibles.\n• Cuidado con superficies irregulares.\n• Solicite habitación adaptada.\n• Lleve equipo de apoyo extra.', icon: 'Wheelchair', types: ['all'] },
        { title: 'Documentos e Vistos', title_en: 'Documents and Visas', title_es: 'Documentos y Visas', text: '• Passaporte válido por 6 meses?\n• O país exige visto?\n• Imprima e salve cópias na nuvem.', text_en: '• Passport valid for 6 months?\n• Does the country require a visa?\n• Print and save copies in the cloud.', text_es: '• ¿Pasaporte válido por 6 meses?\n• ¿El país requiere visa?\n• Imprima y guarde copias en la nube.', icon: 'IdentificationCard', types: ['international'] },
        { title: 'Saúde e Vacinas', title_en: 'Health and Vaccines', title_es: 'Salud y Vacunas', text: '• Necessidade de vacina para Febre Amarela?\n• Contrate um Seguro Saúde.\n• Leve remédios na bagagem de mão.', text_en: '• Yellow Fever vaccine required?\n• Get Travel Health Insurance.\n• Bring medicines in your carry-on.', text_es: '• ¿Vacuna contra la Fiebre Amarilla?\n• Contrate un Seguro de Salud.\n• Lleve medicamentos en el equipaje de mano.', icon: 'Syringe', types: ['international'] },
        { title: 'Logística Intl', title_en: 'Intl Logistics', title_es: 'Logística Intl', text: '• Desbloqueie cartões.\n• Tenha moeda local em espécie.\n• Leve um adaptador universal.', text_en: '• Unlock cards.\n• Have local currency in cash.\n• Bring a universal adapter.', text_es: '• Desbloquee tarjetas.\n• Tenga moneda local en efectivo.\n• Lleve un adaptador universal.', icon: 'Wallet', types: ['international'] },
    ];

    // Filter by trip type (show type-specific + all universal + international)
    const tips = allTips.filter(tip =>
        tip.types.includes('all') || 
        tip.types.includes(activeTrip.type) || 
        (config.isInternational && tip.types.includes('international'))
    );

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={{ padding: 16, paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <H2>{t('headersFirst.modoViagem', 'Modo Viagem')}</H2>
                    </View>
                    <View style={{ width: 44 }} />
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 190 }}>

                    {/* 1. ASSISTENTE DE VIAGEM */}
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 14 }}>
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.travelAssistant', 'Assistente de Viagem')}</Text>
                        <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center' }}>{t('travel.doThisWheneverTraveling', 'Faça isso sempre que for viajar')}</Small>
                    </View>

                    {/* Grid cerâmico — o pictograma É o card (linguagem Home/Hub) */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 }}>
                        {[
                            { key: 'partida',  route: 'InspecaoPartida', label: t('travel.departureInspection', 'Verificações antes de partir') },
                            { key: 'malas',    route: 'FazendoAsMalas',  label: t('travel.packing', 'Saindo de Viagem') },
                            { key: 'chegada',  route: 'InspecaoChegada', label: t('travel.arrivalInspection', 'Verificações no Destino') },
                            { key: 'checkout', route: 'InspecaoRetorno', label: t('travel.safeCheckout', 'Checkout Seguro') },
                        ].map(card => (
                            <ScaleButton
                                key={card.key}
                                onPress={() => navigation.navigate(card.route)}
                                style={[s.gridCell, { marginBottom: 12 }]}
                                accessibilityRole="button"
                                accessibilityLabel={card.label}
                            >
                                <View style={s.ceramicCell}>
                                    <Image source={TRAVEL_PICTOGRAMS[card.key]} style={s.ceramicTile} resizeMode="contain" />
                                    <Body style={s.ceramicCardLabel} numberOfLines={2}>{card.label}</Body>
                                </View>
                            </ScaleButton>
                        ))}

                        {/* Card 5: Guia de Segurança — horizontal com thumbnail cerâmico */}
                        <ScaleButton onPress={() => navigation.navigate('TravelSafetyGuide')} style={{ width: '100%' }} accessibilityRole="button">
                            <NeoCard variant="elevated" style={{ height: 80, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 16 }}>
                                <Image source={TRAVEL_PICTOGRAMS.guia} style={s.guiaThumb} resizeMode="contain" />
                                <View style={{ flex: 1 }}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[700], fontSize: 14 }}>{t('travel.safetyGuide', 'Guia de Segurança')}</Body>
                                    <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.safetyGuideDesc', 'Dicas, telefones úteis e mais.')}</Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                            </NeoCard>
                        </ScaleButton>
                    </View>

                    {/* 2. FIQUE ATENTO! */}
                    <Text style={[s.sectionLabel, { marginTop: 20, marginBottom: 14 }]}>{t('travel.payAttention', 'Fique Atento!')}</Text>
                    <View style={{ gap: 12 }}>
                        {tips.map((tip, idx) => {
                            const isOpen = expandedTipIdx === idx;
                            const bulletItems = t_field(tip, 'text').split('\n').filter(l => l.trim());
                            return (
                                <NeoCard key={idx} variant="elevated" style={{ overflow: 'hidden' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                            setExpandedTipIdx(isOpen ? null : idx);
                                        }}
                                        activeOpacity={0.8}
                                        style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}
                                    >
                                        {/* Tratamento único premium: forest sobre tint
                                            suave — sem arco-íris por card */}
                                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Neo.colors.primary[100], alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                            <NeoIcon name={tip.icon} size={20} color={Neo.colors.primary[700]} variant="Bold" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800], fontSize: 14 }}>{t_field(tip, 'title')}</Body>
                                        </View>
                                        {isOpen ? <NeoIcon name="ArrowUp2" size={18} color={Neo.colors.neutral[500]} /> : <NeoIcon name="ArrowDown2" size={18} color={Neo.colors.neutral[500]} />}
                                    </TouchableOpacity>
                                    {isOpen && (
                                        <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                                            <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                                            {bulletItems.map((line, li) => (
                                                <View key={li} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                                                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Neo.colors.primary[500], marginRight: 10, marginTop: 6 }} />
                                                    <Body style={{ flex: 1, color: Neo.colors.neutral[700], fontSize: 13, lineHeight: 19 }}>{line.replace(/^[•\s]+/, '')}</Body>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </NeoCard>
                            );
                        })}
                    </View>

                    {/* ENCERRAR MODO VIAGEM */}
                    <ScaleButton onPress={endTrip} style={{ marginTop: 24, marginBottom: 16 }}>
                        <NeoCard variant="primary" style={[s.activateBtn, { backgroundColor: Neo.colors.feedback.error }]}>
                            <H3 style={{ color: Neo.colors.neutral.white }}>{t('travel.endTravelMode', 'Encerrar Modo Viagem')}</H3>
                        </NeoCard>
                    </ScaleButton>

                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[800],
        letterSpacing: 1.6,
        marginBottom: 10,
        marginTop: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        opacity: 0.9,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 4,
    },
    gridCell: {
        width: '48%',
    },
    gridLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1a1a2e',
        textAlign: 'center',
        lineHeight: 17,
    },
    // ── Células cerâmicas (pictograma = o próprio card, sem NeoCard) ──
    ceramicCell: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ceramicTileWrap: {
        width: TILE_W,
        position: 'relative',
    },
    ceramicTile: {
        width: TILE_W,
        height: TILE_H,
        marginBottom: 4,
    },
    ceramicTileDimmed: {
        opacity: 0.55, // não-selecionados recuam quando há uma seleção ativa
    },
    ceramicCheckBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 12,
        ...Neo.shadows.subtle,
    },
    ceramicCardLabel: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: Neo.colors.neutral[800],
        fontSize: 12,
        lineHeight: 15,
    },
    guiaThumb: {
        width: 54,
        height: 54,
        marginRight: 14,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        gap: 12,
        marginBottom: 20,
    },
    headerCardIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCardText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 21,
        letterSpacing: -0.1,
    },
    activateBtn: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
});
