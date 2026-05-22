import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking, ActivityIndicator, DeviceEventEmitter, Text, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Building, Map1, SearchNormal, Warning2, ArrowLeft, ArrowRight, Add, ArrowRight2, StatusUp, SearchZoomIn, DocumentDownload, TickCircle, Sun1, Activity, CloseCircle, GlobalSearch, Call, User, AirplaneSquare, CalendarEdit, Clock, LocationTick, Discover, ShieldTick, Car, Airplane, Tree, Health, Teacher, Routing, ArrowDown2, ArrowUp2 } from 'iconsax-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

const TRIP_TYPES = [
    { id: 'rural', label: 'Área Rural', label_en: 'Rural Area', label_es: 'Área Rural', icon: Tree, color: Neo.colors.feedback.success, desc: 'Isolamento, animais, rios.', desc_en: 'Isolation, animals, rivers.', desc_en: 'Aislamiento, animales, ríos.' },
    { id: 'praia', label: 'Litoral', label_en: 'Coastal Area', label_es: 'Zona Costera', icon: Sun1, color: Neo.colors.feedback.warning, desc: 'Sol, mar, piscina.', desc_en: 'Sun, sea, pool.', desc_es: 'Sol, mar, piscina.' },
    { id: 'urbano', label: 'Área Urbana', label_en: 'Urban Area', label_es: 'Área Urbana', icon: Building, color: Neo.colors.secondary[500], desc: 'Janelas, trânsito, aglomeração.', desc_en: 'Windows, traffic, crowds.', desc_es: 'Ventanas, tráfico, multitudes.' },
    { id: 'resort', label: 'Resort e Lazer', label_en: 'Resort & Leisure', label_es: 'Resort y Ocio', icon: Sun1, color: Neo.colors.primary[500], desc: 'Piscinas, áreas comuns.', desc_en: 'Pools, common areas.', desc_es: 'Piscinas, áreas comunes.' }
];

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
        if (!tripType) return Alert.alert('Selecione o destino');

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
        Alert.alert(
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

    const getSecurityTips = () => {
        if (!activeTrip) return [];
        const type = activeTrip.type;
        const tips = [];

        if (type === 'rural') {
            tips.push({ title: 'Animais e Plantas Tóxicas', text: 'Sacuda calçados antes de usar. Mantenha portas fechadas. Ensine crianças a não tocar em plantas desconhecidas.', icon: Warning2, color: Neo.colors.feedback.error });
            tips.push({ title: 'Distância Médica', text: 'Já localizou o hospital mais próximo? O sinal de celular pega?', icon: Map1, color: Neo.colors.feedback.warning });
        }
        if (type === 'praia' || type === 'resort') {
            tips.push({ title: 'Afogamento', text: 'Nunca deixe crianças sozinhas na água. Atenção a ralos de piscina.', icon: Sun1, color: Neo.colors.secondary[500] });
        }
        if (type === 'urbano' || type === 'resort') {
            tips.push({ title: 'Janelas e Sacadas', text: "Cheque se há telas ou travas. Em hotéis, solicite telas portáteis ou afaste móveis.", icon: Building, color: Neo.colors.primary[500] });
        }

        // Family / Companions warnings
        if (activeTrip.config.hasKids) {
            tips.push({ title: 'Crianças em Viagem', text: 'Identifique a criança com pulseira. Mantenha supervisão visual constante, especialmente perto de água ou aglomerações.', icon: ShieldTick, color: Neo.colors.secondary[500] });
        }
        if (activeTrip.config.hasPets) {
            tips.push({ title: 'Pets em Viagem', text: 'Mantenha na guia. Cuidado com fuga em locais estranhos, piso quente ou plantas tóxicas.', icon: Health, color: Neo.colors.feedback.error });
        }
        if (activeTrip.config.hasElderly) {
            tips.push({ title: 'Idosos em Viagem', text: 'Deixe luz acessa p/ banheiro à noite. Enrole tapetes soltos e cuide com pisos escorregadios.', icon: User, color: Neo.colors.neutral[700] });
        }
        if (activeTrip.config.hasPcd) {
            tips.push({ title: 'Acessibilidade (PCD)', text: 'Cuidado com desníveis ou falta de rampas de evacuação. Localize previamente as saídas acessíveis de emergência.', icon: Discover, color: Neo.colors.primary[500] });
        }

        return tips;
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
                                <ArrowLeft size={20} color={Neo.colors.neutral[800]} />
                            </TouchableOpacity>
                        </View>

                        <View style={s.tipCard}>
                            <View style={[s.tipIconWrap, { backgroundColor: Neo.colors.primary[100] }]}>
                                <Airplane size={22} color={Neo.colors.primary[600]} variant="Bold" />
                            </View>
                            <Body style={s.tipText}>
                                {t('travel.activateMode', 'Ative o Modo Viagem para checklists de segurança específicos.')}
                            </Body>
                        </View>

                        {/* TIPO DE DESTINO */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.destinationType', 'Qual o tipo de destino?')}</Text>
                        <View style={s.gridContainer}>
                            {TRIP_TYPES.map(trip => {
                                const sel = tripType === trip.id;
                                return (
                                    <ScaleButton key={trip.id} style={s.gridCell} onPress={() => setTripType(trip.id)}>
                                        <NeoCard variant="elevated" style={s.gridCard}>
                                            <View style={[s.gridIconCircle, { backgroundColor: trip.color + '15' }]}>
                                                <trip.icon size={24} color={trip.color} variant="Bold" />
                                            </View>
                                            <Text style={[s.gridLabel, sel && { color: trip.color }]}>
                                                {t_field(trip, 'label')}
                                            </Text>
                                            {sel && (
                                                <View style={s.checkBadge}>
                                                    <TickCircle size={16} color={trip.color} variant="Bold" />
                                                </View>
                                            )}
                                        </NeoCard>
                                    </ScaleButton>
                                );
                            })}
                        </View>

                        {/* PROPÓSITO DA VIAGEM */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.travelPurpose', 'Propósito da Viagem')}</Text>
                        <View style={s.chipRow}>
                            {[
                                { key: 'lazer', emoji: '🌴', label: t('travel.leisure', 'Lazer'), color: Neo.colors.feedback.warning },
                                { key: 'trabalho', emoji: '💼', label: t('travel.work', 'Trabalho'), color: Neo.colors.primary[500] },
                            ].map(p => {
                                const sel = tripPurpose === p.key;
                                return (
                                    <ScaleButton key={p.key} style={s.chipCell} onPress={() => setTripPurpose(p.key)}>
                                        <NeoCard variant="elevated" style={s.chip}>
                                            <Body style={{ fontWeight: 'bold', color: sel ? p.color : Neo.colors.neutral[600] }}>
                                                {p.emoji} {p.label}
                                            </Body>
                                            {sel && (
                                                <View style={{ position: 'absolute', top: 6, right: 8 }}>
                                                    <TickCircle size={14} color={p.color} variant="Bold" />
                                                </View>
                                            )}
                                        </NeoCard>
                                    </ScaleButton>
                                );
                            })}
                        </View>

                        {/* DESTINO INTERNACIONAL */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.internationalDestination', 'Destino Internacional?')}</Text>
                        <View style={s.chipRow}>
                            {[
                                { key: true, emoji: '🌍', label: t('common.yes', 'Sim'), color: Neo.colors.secondary[500] },
                                { key: false, emoji: '🇧🇷', label: t('travel.national', 'Nacional'), color: Neo.colors.feedback.success },
                            ].map(opt => {
                                const sel = isInternational === opt.key;
                                return (
                                    <ScaleButton key={String(opt.key)} style={s.chipCell} onPress={() => setIsInternational(opt.key)}>
                                        <NeoCard variant="elevated" style={s.chip}>
                                            <Body style={{ fontWeight: 'bold', color: sel ? opt.color : Neo.colors.neutral[600] }}>
                                                {opt.emoji} {opt.label}
                                            </Body>
                                            {sel && (
                                                <View style={{ position: 'absolute', top: 6, right: 8 }}>
                                                    <TickCircle size={14} color={opt.color} variant="Bold" />
                                                </View>
                                            )}
                                        </NeoCard>
                                    </ScaleButton>
                                );
                            })}
                        </View>

                        {/* QUEM VAI JUNTO */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.whoIsGoing', 'Quem vai junto?')}</Text>
                        <View style={s.gridContainer}>
                            {[
                                { key: 'kids', active: hasKids, toggle: () => setHasKids(!hasKids), label: t('travel.children', 'Crianças'), icon: ShieldTick, color: Neo.colors.secondary[500] },
                                { key: 'elderly', active: hasElderly, toggle: () => setHasElderly(!hasElderly), label: t('travel.elderly', 'Idosos'), icon: User, color: Neo.colors.neutral[700] },
                                { key: 'pets', active: hasPets, toggle: () => setHasPets(!hasPets), label: t('travel.pets', 'Pets'), icon: Health, color: Neo.colors.feedback.error },
                                { key: 'pcd', active: hasPcd, toggle: () => setHasPcd(!hasPcd), label: t('travel.pwds', 'PCDs'), icon: Discover, color: Neo.colors.primary[500] },
                            ].map(item => (
                                <ScaleButton key={item.key} style={s.gridCell} onPress={item.toggle}>
                                    <NeoCard variant="elevated" style={[s.gridCard, { position: 'relative' }]}>
                                        <View style={[s.gridIconCircle, { backgroundColor: item.color + '15' }]}>
                                            <item.icon size={24} color={item.color} variant={item.active ? 'Bold' : 'Outline'} />
                                        </View>
                                        <Text style={[s.gridLabel, item.active && { color: item.color }]}>{item.label}</Text>
                                        {item.active && (
                                            <View style={s.checkBadge}>
                                                <TickCircle size={16} color={item.color} variant="Bold" />
                                            </View>
                                        )}
                                    </NeoCard>
                                </ScaleButton>
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
        { title: 'Afogamento', title_en: 'Drowning', title_es: 'Ahogamiento', text: '• Nunca deixe crianças sozinhas próximas à água.\n• Atenção ao ralo da piscina.\n• Use boias e coletes salva-vidas.\n• Ensine a regra: "Sem adulto, sem água."', text_en: '• Never leave children alone near water.\n• Pay attention to the pool drain.\n• Use life jackets.\n• Teach the rule: "No adult, no water."', text_es: '• Nunca deje a los niños solos cerca del agua.\n• Atención al desagüe de la piscina.\n• Use chalecos salvavidas.\n• Enseñe la regla: "Sin adulto, no hay agua."', icon: Sun1, color: Neo.colors.secondary[500], types: ['praia', 'resort', 'rural'] },
        { title: 'Janelas e Sacadas', title_en: 'Windows and Balconies', title_es: 'Ventanas y Balcones', text: '• Em hotéis, verifique se há telas nas janelas.\n• Crianças escalam: afaste camas e cadeiras.\n• Se possível, instale travas de janelas.\n• Sacadas sem vidro são um risco grave.', text_en: '• In hotels, check for window screens.\n• Children climb: move beds and chairs away.\n• If possible, install window locks.\n• Glassless balconies are a serious risk.', text_es: '• En hoteles, verifique si hay mosquiteros.\n• Los niños escalan: aleje camas y sillas.\n• Si es posible, instale seguros de ventanas.\n• Los balcones sin vidrio son un riesgo grave.', icon: Building, color: Neo.colors.primary[500], types: ['urbano', 'resort'] },
        { title: 'Animais e Plantas', title_en: 'Animals and Plants', title_es: 'Animales y Plantas', text: '• Sacuda calçados e roupas antes de usar.\n• Não toque em plantas desconhecidas.\n• Mantenha portas fechadas ao anoitecer.\n• Leve repelente.', text_en: '• Shake out shoes and clothes before use.\n• Do not touch unknown plants.\n• Keep doors closed at dusk.\n• Bring insect repellent.', text_es: '• Sacuda zapatos y ropa antes de usar.\n• No toque plantas desconocidas.\n• Mantenga puertas cerradas al anochecer.\n• Lleve repelente.', icon: Warning2, color: Neo.colors.feedback.error, types: ['rural'] },
        { title: 'Distância Médica', title_en: 'Medical Distance', title_es: 'Distancia Médica', text: '• Localize o hospital mais próximo.\n• Verifique se o celular tem sinal.\n• Leve um kit de primeiros socorros.\n• Informe alguém sobre seu destino.', text_en: '• Locate the nearest hospital.\n• Check if your cell phone has a signal.\n• Bring a first aid kit.\n• Inform someone about your destination.', text_es: '• Localice el hospital más cercano.\n• Verifique si el celular tiene señal.\n• Lleve un botiquín de primeros auxilios.\n• Informe a alguien sobre su destino.', icon: Map1, color: Neo.colors.feedback.warning, types: ['rural'] },
        { title: 'Crianças em Viagem', title_en: 'Children Traveling', title_es: 'Niños de Viaje', text: '• Use pulseira de identificação.\n• Combine um "ponto de encontro".\n• Supervisão visual constante.\n• Ensine o telefone dos pais.', text_en: '• Use an ID bracelet.\n• Agree on a "meeting point".\n• Constant visual supervision.\n• Teach them their parents\' phone number.', text_es: '• Use pulsera de identificación.\n• Acuerde un "punto de encuentro".\n• Supervisión visual constante.\n• Enséñeles el teléfono de los padres.', icon: ShieldTick, color: Neo.colors.secondary[500], types: ['all'] },
        { title: 'Idosos em Viagem', title_en: 'Elderly Traveling', title_es: 'Ancianos de Viaje', text: '• Deixe luz acesa para o banheiro.\n• Remova tapetes soltos.\n• Use chinelo antiderrapante.\n• Leve medicamentos organizados.', text_en: '• Leave a light on for the bathroom.\n• Remove loose rugs.\n• Use non-slip slippers.\n• Bring organized medications.', text_es: '• Deje una luz encendida para el baño.\n• Retire alfombras sueltas.\n• Use pantuflas antideslizantes.\n• Lleve medicamentos organizados.', icon: User, color: Neo.colors.neutral[700], types: ['all'] },
        { title: 'Pets em Viagem', title_en: 'Pets Traveling', title_es: 'Mascotas de Viaje', text: '• Mantenha sempre na guia.\n• Cuidado com piso quente.\n• Não permita acesso a plantas tóxicas.\n• Leve água fresca.', text_en: '• Always keep on a leash.\n• Beware of hot pavements.\n• Do not allow access to toxic plants.\n• Bring fresh water.', text_es: '• Mantenga siempre con correa.\n• Cuidado con el pavimento caliente.\n• No permita acceso a plantas tóxicas.\n• Lleve agua fresca.', icon: Health, color: Neo.colors.feedback.error, types: ['all'] },
        { title: 'Plano de Fuga', title_en: 'Escape Plan', title_es: 'Plan de Escape', text: '• Localize o mapa de evacuação.\n• Identifique as 2 saídas mais próximas.\n• Combine um ponto de encontro externo.', text_en: '• Locate the evacuation map.\n• Identify the 2 nearest exits.\n• Agree on an external meeting point.', text_es: '• Localice el mapa de evacuación.\n• Identifique las 2 salidas más cercanas.\n• Acuerde un punto de encuentro externo.', icon: Routing, color: Neo.colors.feedback.warning, types: ['all'] },
        { title: 'PCD / Acessibilidade', title_en: 'Accessibility (PWD)', title_es: 'Accesibilidad', text: '• Localize saídas acessíveis.\n• Cuidado com desníveis.\n• Solicite quarto adaptado.\n• Leve equipamentos de apoio extras.', text_en: '• Locate accessible exits.\n• Beware of uneven surfaces.\n• Request an adapted room.\n• Bring extra support equipment.', text_es: '• Localice salidas accesibles.\n• Cuidado con superficies irregulares.\n• Solicite habitación adaptada.\n• Lleve equipo de apoyo extra.', icon: Discover, color: Neo.colors.primary[500], types: ['all'] },
        { title: 'Documentos e Vistos', title_en: 'Documents and Visas', title_es: 'Documentos y Visas', text: '• Passaporte válido por 6 meses?\n• O país exige visto?\n• Imprima e salve cópias na nuvem.', text_en: '• Passport valid for 6 months?\n• Does the country require a visa?\n• Print and save copies in the cloud.', text_es: '• ¿Pasaporte válido por 6 meses?\n• ¿El país requiere visa?\n• Imprima y guarde copias en la nube.', icon: DocumentDownload, color: Neo.colors.secondary[500], types: ['international'] },
        { title: 'Saúde e Vacinas', title_en: 'Health and Vaccines', title_es: 'Salud y Vacunas', text: '• Necessidade de vacina para Febre Amarela?\n• Contrate um Seguro Saúde.\n• Leve remédios na bagagem de mão.', text_en: '• Yellow Fever vaccine required?\n• Get Travel Health Insurance.\n• Bring medicines in your carry-on.', text_es: '• ¿Vacuna contra la Fiebre Amarilla?\n• Contrate un Seguro de Salud.\n• Lleve medicamentos en el equipaje de mano.', icon: Health, color: Neo.colors.feedback.error, types: ['international'] },
        { title: 'Logística Intl', title_en: 'Intl Logistics', title_es: 'Logística Intl', text: '• Desbloqueie cartões.\n• Tenha moeda local em espécie.\n• Leve um adaptador universal.', text_en: '• Unlock cards.\n• Have local currency in cash.\n• Bring a universal adapter.', text_es: '• Desbloquee tarjetas.\n• Tenga moneda local en efectivo.\n• Lleve un adaptador universal.', icon: GlobalSearch, color: Neo.colors.primary[500], types: ['international'] },
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
                        <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
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

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 12 }}>
                        {/* Card 1: Inspeção de Partida */}
                        <ScaleButton onPress={() => navigation.navigate('InspecaoPartida')} style={{ width: '48%', marginBottom: 12 }}>
                            <NeoCard variant="elevated" style={{ height: 105, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: Neo.colors.feedback.warning + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                    <Clock size={20} color={Neo.colors.feedback.warning} variant="Bold" />
                                </View>
                                <Body style={{ fontWeight: 'bold', textAlign: 'center', color: Neo.colors.feedback.warning, fontSize: 12, lineHeight: 14 }} numberOfLines={2}>{t('travel.departureInspection', 'Verificações antes de partir')}</Body>
                            </NeoCard>
                        </ScaleButton>

                        {/* Card 2: Fazendo as Malas */}
                        <ScaleButton onPress={() => navigation.navigate('FazendoAsMalas')} style={{ width: '48%', marginBottom: 12 }}>
                            <NeoCard variant="elevated" style={{ height: 105, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: Neo.colors.primary[500] + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                    <Airplane size={20} color={Neo.colors.primary[500]} variant="Bold" />
                                </View>
                                <Body style={{ fontWeight: 'bold', textAlign: 'center', color: Neo.colors.primary[600], fontSize: 12, lineHeight: 14 }} numberOfLines={2}>{t('travel.packing', 'Saindo de Viagem')}</Body>
                            </NeoCard>
                        </ScaleButton>

                        {/* Card 3: Inspeção de Chegada */}
                        <ScaleButton onPress={() => navigation.navigate('InspecaoChegada')} style={{ width: '48%', marginBottom: 12 }}>
                            <NeoCard variant="elevated" style={{ height: 105, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: Neo.colors.feedback.success + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                    <ShieldTick size={20} color={Neo.colors.feedback.success} variant="Bold" />
                                </View>
                                <Body style={{ fontWeight: 'bold', textAlign: 'center', color: Neo.colors.feedback.success, fontSize: 12, lineHeight: 14 }} numberOfLines={2}>{t('travel.arrivalInspection', 'Verificações no Destino')}</Body>
                            </NeoCard>
                        </ScaleButton>

                        {/* Card 4: Checkout Seguro */}
                        <ScaleButton onPress={() => navigation.navigate('InspecaoRetorno')} style={{ width: '48%', marginBottom: 12 }}>
                            <NeoCard variant="elevated" style={{ height: 105, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: Neo.colors.feedback.error + '26', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                    <SearchNormal size={20} color={Neo.colors.feedback.error} variant="Bold" />
                                </View>
                                <Body style={{ fontWeight: 'bold', textAlign: 'center', color: Neo.colors.feedback.error, fontSize: 12, lineHeight: 14 }} numberOfLines={2}>{t('travel.safeCheckout', 'Checkout Seguro')}</Body>
                            </NeoCard>
                        </ScaleButton>

                        {/* Card 5: Guia de Segurança */}
                        <ScaleButton onPress={() => navigation.navigate('TravelSafetyGuide')} style={{ width: '100%' }}>
                            <NeoCard variant="elevated" style={{ height: 80, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 20 }}>
                                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Neo.colors.primary[500] + '26', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                    <Teacher size={24} color={Neo.colors.primary[500]} variant="Bold" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[700], fontSize: 14 }}>{t('travel.safetyGuide', 'Guia de Segurança')}</Body>
                                    <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.safetyGuideDesc', 'Dicas, telefones úteis e mais.')}</Small>
                                </View>
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
                                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tip.color + '15', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                            <tip.icon size={20} color={tip.color} variant="Bold" />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800], fontSize: 14 }}>{t_field(tip, 'title')}</Body>
                                        </View>
                                        {isOpen ? <ArrowUp2 size={18} color={tip.color} /> : <ArrowDown2 size={18} color={tip.color} />}
                                    </TouchableOpacity>
                                    {isOpen && (
                                        <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                                            <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                                            {bulletItems.map((line, li) => (
                                                <View key={li} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                                                    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tip.color, marginRight: 10, marginTop: 6 }} />
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
    gridCard: {
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        height: 104,
        overflow: 'hidden',
    },
    gridIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    gridLabel: {
        fontSize: 13,
        fontWeight: '800',
        color: '#1a1a2e',
        textAlign: 'center',
        lineHeight: 17,
    },
    chipRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 4,
    },
    chipCell: {
        flex: 1,
    },
    chip: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
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
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.primary[500] + '12',
        padding: 14,
        borderRadius: 14,
        marginBottom: 20,
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.primary[500],
        gap: 12,
    },
    tipIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tipText: {
        flex: 1,
        color: Neo.colors.neutral[800],
        fontSize: 13.5,
        lineHeight: 19,
    },
    checkBadge: {
        position: 'absolute',
        top: 8,
        right: 10,
    },
    activateBtn: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
});
