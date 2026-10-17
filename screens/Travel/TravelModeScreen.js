import { useState, useRef, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Linking, ActivityIndicator, DeviceEventEmitter, Text, StyleSheet, Image, Dimensions, Animated } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from "../../components/NeoTypography";
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';
import PictogramTile from '../../components/PictogramTile';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import NeoAlert from '../../utils/NeoAlert';
import TravelTipsAccordion from '../../components/TravelTipsAccordion';
import TravelReportService from '../../services/TravelReportService';
import * as ExpoLocation from 'expo-location';
import PaisAtualService from '../../services/PaisAtualService';
import AvisoPaisEmergencia from '../../components/AvisoPaisEmergencia';

// Dimensões em PIXELS (lição da Home: % não resolve dentro de wrappers
// auto-dimensionados — a Image assume o tamanho intrínseco do PNG, 480px)
const SCREEN_W = Dimensions.get('window').width;
const CONTENT_W = SCREEN_W - Neo.spacing.lg * 2; // padding horizontal do scroll
const CELL_W = CONTENT_W * 0.48;                 // célula do grid 2-col
const TILE_W = Math.round(CELL_W * 0.88);
// Altura vem de PictogramTile (PICTOGRAM_ASPECT_RATIO) — a proporção real
// do PNG, não mais uma constante local (436/428 estava invertida: mais
// alta que larga, o oposto do asset, causava letterboxing no contain).

// Pictogramas cerâmicos 3D (tile creme + moldura verde embutidos no PNG,
// mesma linguagem da Home e do Hub). O asset É o card — render sem NeoCard.
const TRAVEL_PICTOGRAMS = {
    // destinos (wizard)
    rural:    require('../../assets/illustrations/glifos/pictogram-destino-rural.png'),
    praia:    require('../../assets/illustrations/glifos/pictogram-destino-litoral.png'),
    urbano:   require('../../assets/illustrations/glifos/pictogram-destino-urbano.png'),
    resort:   require('../../assets/illustrations/glifos/pictogram-destino-resort.png'),
    // assistente de viagem (dashboard)
    partida:  require('../../assets/illustrations/glifos/pictogram-viagem-partida.png'),
    malas:    require('../../assets/illustrations/glifos/pictogram-viagem-malas.png'),
    chegada:  require('../../assets/illustrations/glifos/pictogram-viagem-chegada.png'),
    checkout: require('../../assets/illustrations/glifos/pictogram-viagem-checkout.png'),
    guia:     require('../../assets/illustrations/glifos/pictogram-viagem-guia.png'),
    // propósito da viagem (wizard)
    lazer:    require('../../assets/illustrations/glifos/pictogram-proposito-lazer.png'),
    trabalho: require('../../assets/illustrations/glifos/pictogram-proposito-trabalho.png'),
    // destino internacional? (wizard)
    internacional: require('../../assets/illustrations/glifos/pictogram-destino-internacional.png'),
    nacional:      require('../../assets/illustrations/glifos/pictogram-destino-nacional.png'),
    // destinos
    destino_internacional: require('../../assets/illustrations/glifos/pictogram-destino-internacional.png'),
    destino_nacional:      require('../../assets/illustrations/glifos/pictogram-destino-nacional.png'),
    destino_litoral:       require('../../assets/illustrations/glifos/pictogram-destino-litoral.png'),
    destino_urbano:        require('../../assets/illustrations/glifos/pictogram-destino-urbano.png'),
    destino_rural:         require('../../assets/illustrations/glifos/pictogram-destino-rural.png'),
    destino_resort:        require('../../assets/illustrations/glifos/pictogram-destino-resort.png'),

    // propósito
    proposito_lazer:       require('../../assets/illustrations/glifos/pictogram-proposito-lazer.png'),
    proposito_trabalho:    require('../../assets/illustrations/glifos/pictogram-proposito-trabalho.png'),

    // transporte
    transporte_carro:      require('../../assets/illustrations/glifos/pictogram-transporte-carro.png'),
    transporte_aviao:      require('../../assets/illustrations/glifos/pictogram-transporte-aviao.png'),
    transporte_onibus:     require('../../assets/illustrations/glifos/pictogram-transporte-onibus.png'),
    transporte_trem:       require('../../assets/illustrations/glifos/pictogram-transporte-trem.png'),
    transporte_navio:      require('../../assets/illustrations/glifos/pictogram-transporte-navio.png'),

    // companhia
    companhia_criancas:    require('../../assets/illustrations/glifos/pictogram-companhia-criancas.png'),
    companhia_idosos:      require('../../assets/illustrations/glifos/pictogram-companhia-idosos.png'),
    companhia_pcd:         require('../../assets/illustrations/glifos/pictogram-companhia-pcd-v3.png'),
    companhia_pets:        require('../../assets/illustrations/glifos/pictogram-companhia-pets.png'),

    // duração
    duracao_curta:         require('../../assets/illustrations/glifos/pictogram-duracao-curta.png'),
    duracao_media:         require('../../assets/illustrations/glifos/pictogram-duracao-media.png'),
    duracao_longa:         require('../../assets/illustrations/glifos/pictogram-duracao-longa.png'),

    // etapas
    etapa_malas:           require('../../assets/illustrations/glifos/pictogram-viagem-malas.png'),
    etapa_partida:         require('../../assets/illustrations/glifos/pictogram-viagem-partida.png'),
    etapa_chegada:         require('../../assets/illustrations/glifos/pictogram-viagem-chegada.png'),
    etapa_checkout:        require('../../assets/illustrations/glifos/pictogram-viagem-checkout.png'),

    // extras
    guia:                  require('../../assets/illustrations/glifos/pictogram-viagem-guia.png'),
};

const TRIP_TYPES = [
    { id: 'rural', label: 'Área Rural', label_en: 'Rural Area', label_es: 'Área Rural', icon: 'Tree', color: Neo.colors.feedback.success, desc: 'Isolamento, animais, rios.', desc_en: 'Isolation, animals, rivers.', desc_es: 'Aislamiento, animales, ríos.' },
    { id: 'praia', label: 'Litoral', label_en: 'Coastal Area', label_es: 'Zona Costera', icon: 'Sun1', color: Neo.colors.feedback.warning, desc: 'Sol, mar, piscina.', desc_en: 'Sun, sea, pool.', desc_es: 'Sol, mar, piscina.' },
    { id: 'urbano', label: 'Área Urbana', label_en: 'Urban Area', label_es: 'Área Urbana', icon: 'Building', color: Neo.colors.secondary[500], desc: 'Janelas, trânsito, aglomeração.', desc_en: 'Windows, traffic, crowds.', desc_es: 'Ventanas, tráfico, multitudes.' },
    { id: 'resort', label: 'Resort e Lazer', label_en: 'Resort & Leisure', label_es: 'Resort y Ocio', icon: 'Sun1', color: Neo.colors.primary[500], desc: 'Piscinas, áreas comuns.', desc_en: 'Pools, common areas.', desc_es: 'Piscinas, áreas comunes.' }
];

// Tile cerâmico selecionável — padrão único dos seletores do wizard.
// selected: badge de check + label forest; dimmed: recua o desenho (`recuado`
// do PictogramTile), mantendo o tile creme cheio — esmaecer o card inteiro
// deixava uma moldura fantasma em volta dele no Android.
function CeramicSelectTile({ source, label, selected, dimmed, onPress }) {
    // Componente fora do escopo da tela: lê o tema por conta própria. O
    // `isDark` de TravelModeScreen não alcança aqui.
    const isDark = useIsDark();
    const colors = useThemeColors();
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
                    <PictogramTile
                        source={source}
                        width={TILE_W}
                        recuado={dimmed}
                        moldura
                        atenuado={isDark}
                    />
                    {selected && (
                        <View style={s.ceramicCheckBadge}>
                            <NeoIcon name="TickCircle" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                        </View>
                    )}
                </View>
                {/* Body, não Text cru: a NeoTypography é quem aplica a cor do
                    tema e, em alto contraste, o preto ou branco puro. O rótulo
                    era #1a1a2e cravado — 1,07:1 sobre o fundo noturno, e por
                    isso só o selecionado aparecia no escuro. */}
                <Body style={[s.gridLabel, { marginTop: -10 }, selected && { color: colors.textOn.brand }]}>
                    {label}
                </Body>
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
    const [generatingDossie, setGeneratingDossie] = useState(false);

    // Wizard State
    const [tripType, setTripType] = useState(null);
    const [transportMode, setTransportMode] = useState(null);
    const [tripDuration, setTripDuration] = useState(null);
    const [hasKids, setHasKids] = useState(true);
    const [hasPets, setHasPets] = useState(false);
    const [hasElderly, setHasElderly] = useState(false);
    const [hasPcd, setHasPcd] = useState(false);
    const [isInternational, setIsInternational] = useState(false);
    const [tripPurpose, setTripPurpose] = useState('lazer'); // 'lazer' | 'trabalho'

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
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
            })
        }
    ];

    const capaSource = require('../../assets/images/headers/header-travel-mode.jpeg');

    // No FOCO, não no mount. Esta tela é uma aba: fica montada enquanto o
    // usuário circula pelo app, então um `useEffect([])` a deixaria presa na
    // viagem que existia quando ela apareceu pela primeira vez.
    //
    // O caso concreto: `InspecaoRetornoScreen` grava `retornoConcluido` no
    // `@active_trip` e emite `travel_return_changed`. O rodapé global escuta
    // esse evento; esta tela só emitia, nunca escutava — ao voltar da inspeção
    // ela continuava mostrando a viagem sem o retorno concluído até o app ser
    // reaberto. Recarregar no foco cobre esse caso e qualquer outro que venha.
    useFocusEffect(
        useCallback(() => {
            loadTrip();
        }, [])
    );

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
        if (!tripType) return NeoAlert.alert(t('telas.TravelModeScreen.selecioneODestino', 'Selecione o destino'));
        if (!transportMode) return NeoAlert.alert(t('telas.TravelModeScreen.selecioneOMeioDeTransporte', 'Selecione o meio de transporte'));
        if (!tripDuration) return NeoAlert.alert(t('telas.TravelModeScreen.selecioneADuracaoAproximada', 'Selecione a duração aproximada'));

        const newTrip = {
            id: Date.now().toString(),
            type: tripType,
            transportMode,
            tripDuration,
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

        // Viagem internacional sem localização: é quando a pessoa mais precisa
        // do número local e o app não tem como saber o país. Avisa uma vez,
        // aqui, e oferece ativar — nunca bloqueia a viagem.
        if (isInternational) {
            let concedida = false;
            try { concedida = (await ExpoLocation.getForegroundPermissionsAsync()).status === 'granted'; } catch (_) { /* trata como não concedida */ }
            if (!concedida) {
                NeoAlert.alert(
                    t('paisEmergencia.viagemTitulo', 'Números de emergência no destino'),
                    t('paisEmergencia.viagemTexto', 'Com a localização ativada, o Vigilaro reconhece o país onde você está e mostra o número de emergência de lá. Sem ela, o app mostra os números do país configurado no seu celular. No exterior, se tiver dúvida, ligue 112 — o celular encaminha a chamada para o socorro local na maioria dos países. Para identificar o país, a posição fica no aparelho.'),
                    [
                        { text: t('paisEmergencia.agoraNao', 'Agora não'), style: 'cancel' },
                        {
                            text: t('paisEmergencia.ativar', 'Ativar localização'),
                            onPress: async () => {
                                try {
                                    const atual = await ExpoLocation.getForegroundPermissionsAsync();
                                    if (atual.canAskAgain === false) await Linking.openSettings();
                                    else await ExpoLocation.requestForegroundPermissionsAsync();
                                } catch (_) { /* segue sem */ }
                                PaisAtualService.atualizar({ forcar: true });
                            },
                        },
                    ],
                );
            } else {
                PaisAtualService.atualizar({ forcar: true });
            }
        }
    };

    const endTrip = async () => {
        NeoAlert.alert(
            'Encerrar Viagem?',
            t('telas.TravelModeScreen.issoDesativaraOModoViagem', 'Isso desativará o Modo Viagem.'),
            [
                { text: t('telas.TravelModeScreen.cancelar', 'Cancelar'), style: 'cancel' },
                {
                    text: t('telas.TravelModeScreen.encerrar', 'Encerrar'),
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('@active_trip');
                        setActiveTrip(null);
                        setTripType(null);
                        setTransportMode(null);
                        setTripDuration(null);
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

    const runDossie = async (includeHealth) => {
        try {
            setGeneratingDossie(true);
            await TravelReportService.generateTravelPDF({ includeHealth });
        } catch (e) {
            NeoAlert.alert(
                t('travel.dossierError', 'Não foi possível gerar o dossiê'),
                e?.message || t('common.tryAgain', 'Tente novamente.')
            );
        } finally {
            setGeneratingDossie(false);
        }
    };

    // O dossiê será compartilhado: a inclusão de dados sensíveis (saúde) é
    // escolha consciente do usuário NO MOMENTO do export, não um padrão fixo.
    const handleGenerateDossie = () => {
        if (generatingDossie) return;
        NeoAlert.alert(
            t('travel.dossierHealthTitle', 'Incluir fichas de saúde?'),
            t('travel.dossierHealthMsg', 'O dossiê pode ser compartilhado. As fichas trazem dados sensíveis (medicamentos, alergias, condições). Deseja incluí-las neste PDF?'),
            [
                { text: t('travel.dossierWithHealth', 'Incluir'), onPress: () => runDossie(true) },
                { text: t('travel.dossierNoHealth', 'Não incluir'), onPress: () => runDossie(false) },
                { text: t('common.cancel', 'Cancelar'), style: 'cancel' },
            ]
        );
    };

    if (loading) return <View style={{ flex: 1 }} />;

    // --- WIZARD RENDER ---
    if (!activeTrip) {
        return (
            <AppBackground>
                <StatusBar style="light" translucent={true} backgroundColor="transparent" />

                {/* Header Translúcido Flutuante */}
                <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' }}>
                            <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral.white} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <H2 style={{ color: Neo.colors.neutral.white }}>{t('headersFirst.modoViagem', 'Modo Viagem')}</H2>
                        </View>
                        <View style={{ width: 44 }} />
                    </View>
                </SafeAreaView>

                <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['bottom', 'left', 'right']}>
                    <Animated.ScrollView
                        contentContainerStyle={{ paddingHorizontal: Neo.spacing.lg, paddingBottom: 190 }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                        scrollEventThrottle={16}
                        style={{ flex: 1, zIndex: 10 }}
                    >
                        {/* Hero Imersivo (Movido para dentro do Scroll) */}
                        <Animated.View style={{
                            width: SCREEN_W,
                            height: HERO_HEIGHT,
                            transform: heroTransform,
                            marginBottom: 24,
                            marginHorizontal: -Neo.spacing.lg, // Para ignorar o padding horizontal do ScrollView
                        }}>
                            <Image
                                source={capaSource}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </Animated.View>

                        <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginBottom: 12 }}>
                            {t('travel.activateMode', 'Ative o Modo Viagem para checklists de segurança específicos.')}
                        </Small>

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

                        {/* MEIO DE TRANSPORTE */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.transportModeTitle', 'Como você vai viajar?')}</Text>
                        <View style={s.gridContainer}>
                            {[
                                { key: 'carro', picto: 'transporte_carro', label: t('travel.car', 'Carro') },
                                { key: 'aviao', picto: 'transporte_aviao', label: t('travel.airplane', 'Avião') },
                                { key: 'onibus', picto: 'transporte_onibus', label: t('travel.bus', 'Ônibus') },
                                { key: 'trem', picto: 'transporte_trem', label: t('travel.train', 'Trem') },
                                { key: 'navio', picto: 'transporte_navio', label: t('travel.ship', 'Cruzeiro / Navio') },
                            ].map(opt => (
                                <CeramicSelectTile
                                    key={opt.key}
                                    source={TRAVEL_PICTOGRAMS[opt.picto]}
                                    label={opt.label}
                                    selected={transportMode === opt.key}
                                    dimmed={!!transportMode && transportMode !== opt.key}
                                    onPress={() => setTransportMode(opt.key)}
                                />
                            ))}
                        </View>

                        {/* DURAÇÃO APROXIMADA */}
                        <Text style={[s.sectionLabel, { color: textSecondary }]} accessibilityRole="header">{t('travel.durationTitle', 'Duração Aproximada')}</Text>
                        <View style={s.gridContainer}>
                            {[
                                { key: 'curta', picto: 'duracao_curta', label: t('travel.durationShort', 'Curta (Até 2h)') },
                                { key: 'media', picto: 'duracao_media', label: t('travel.durationMedium', 'Média (2h a 4h)') },
                                { key: 'longa', picto: 'duracao_longa', label: t('travel.durationLong', 'Longa (+4h)') },
                            ].map(opt => (
                                <CeramicSelectTile
                                    key={opt.key}
                                    source={TRAVEL_PICTOGRAMS[opt.picto]}
                                    label={opt.label}
                                    selected={tripDuration === opt.key}
                                    dimmed={!!tripDuration && tripDuration !== opt.key}
                                    onPress={() => setTripDuration(opt.key)}
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
                                { key: 'companhia_criancas', active: hasKids, toggle: () => setHasKids(!hasKids), label: t('travel.children', 'Crianças') },
                                { key: 'companhia_idosos', active: hasElderly, toggle: () => setHasElderly(!hasElderly), label: t('travel.elderly', '60+') },
                                { key: 'companhia_pets', active: hasPets, toggle: () => setHasPets(!hasPets), label: t('travel.pets', 'Pets') },
                                { key: 'companhia_pcd', active: hasPcd, toggle: () => setHasPcd(!hasPcd), label: t('travel.pwds', 'PCDs') },
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
                    </Animated.ScrollView>
                </SafeAreaView>
            </AppBackground>
        );
    }

    // --- DASHBOARD RENDER ---
    // As dicas "Fique Atento" agora vivem POR FASE (TravelTipsAccordion):
    // 'preparacao' na Inspeção de Partida, 'chegada' na Inspeção de Chegada,
    // e aqui no dashboard só as de 'durante' (valem a viagem inteira).

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Header Translúcido Flutuante */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' }}>
                        <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral.white} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <H2 style={{ color: Neo.colors.neutral.white }}>{t('headersFirst.modoViagem', 'Modo Viagem')}</H2>
                    </View>
                    <View style={{ width: 44 }} />
                </View>
            </SafeAreaView>

            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['bottom', 'left', 'right']}>
                <Animated.ScrollView
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 190 }}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                    scrollEventThrottle={16}
                    style={{ flex: 1, zIndex: 10 }}
                >
                    {/* Hero Imersivo (Movido para dentro do Scroll) */}
                    <Animated.View style={{
                        width: SCREEN_W,
                        height: HERO_HEIGHT,
                        transform: heroTransform,
                        marginBottom: 24,
                        marginHorizontal: -16, // Para ignorar o padding horizontal do ScrollView
                    }}>
                        <Image
                            source={capaSource}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </Animated.View>

                    {/* Números de emergência do país onde a pessoa está. */}
                    <AvisoPaisEmergencia style={{ marginBottom: 8 }} />

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
                                    <PictogramTile source={TRAVEL_PICTOGRAMS[card.key]} width={TILE_W} moldura atenuado={isDark} />
                                    <Body style={s.ceramicCardLabel} numberOfLines={2}>{card.label}</Body>
                                </View>
                            </ScaleButton>
                        ))}

                        {/* Card 5: Guia de Segurança — horizontal com thumbnail cerâmico */}
                        <ScaleButton onPress={() => navigation.navigate('TravelSafetyGuide')} style={{ width: '100%' }} accessibilityRole="button">
                            <NeoCard variant="elevated" style={{ height: 80, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 16 }}>
                                <PictogramTile source={TRAVEL_PICTOGRAMS.guia} width={54} style={s.guiaThumb} moldura atenuado={isDark} />
                                <View style={{ flex: 1 }}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[700], fontSize: 14 }}>{t('travel.safetyGuide', 'Guia de Segurança')}</Body>
                                    <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.safetyGuideDesc', 'Dicas, telefones úteis e mais.')}</Small>
                                </View>
                                <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />
                            </NeoCard>
                        </ScaleButton>
                    </View>

                    {/* 2. FIQUE ATENTO (durante a viagem) — preparação e chegada
                        vivem nas respectivas telas de inspeção */}
                    <TravelTipsAccordion phase="durante" />

                    {/* DOSSIÊ DA VIAGEM (PDF) — colhe briefing + guia + kits + fichas */}
                    <ScaleButton onPress={handleGenerateDossie} style={{ marginTop: 16 }} accessibilityRole="button" accessibilityLabel={t('travel.generateDossier', 'Dossiê da Viagem (PDF)')}>
                        <NeoCard variant="elevated" style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16 }}>
                            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Neo.colors.primary[600] + '18', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                                <NeoIcon name="ShareNetwork" size={22} color={Neo.colors.primary[700]} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[700], fontSize: 14 }}>{t('travel.generateDossier', 'Dossiê da Viagem (PDF)')}</Body>
                                <Small style={{ color: Neo.colors.neutral[500] }}>{t('travel.generateDossierDesc', 'Reúne tudo desta viagem em um PDF para compartilhar.')}</Small>
                            </View>
                            {generatingDossie
                                ? <ActivityIndicator color={Neo.colors.primary[600]} />
                                : <NeoIcon name="ArrowRight2" size={18} color={Neo.colors.neutral[500]} />}
                        </NeoCard>
                    </ScaleButton>

                    {/* ENCERRAR MODO VIAGEM */}
                    <ScaleButton onPress={endTrip} style={{ marginTop: 24, marginBottom: 16 }}>
                        <NeoCard variant="primary" style={[s.activateBtn, { backgroundColor: Neo.colors.feedback.error }]}>
                            <H3 style={{ color: Neo.colors.neutral.white }}>{t('travel.endTravelMode', 'Encerrar Modo Viagem')}</H3>
                        </NeoCard>
                    </ScaleButton>

                </Animated.ScrollView>
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
        marginTop: -14, // Compensa o padding transparente no topo dos assets 3D
    },
    gridCell: {
        width: '48%',
    },
    gridLabel: {
        fontSize: 13,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 17,
    },
    ceramicCell: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ceramicTileWrap: {
        width: TILE_W,
        position: 'relative',
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
        fontSize: 12,
        lineHeight: 15,
    },
    guiaThumb: {
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
    activateBtn: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
});
