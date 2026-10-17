import { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, UIManager, Platform, Animated, Dimensions, Image, DeviceEventEmitter } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Body } from "../../components/NeoTypography";
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { useTranslation } from 'react-i18next';
import TravelChecklistCard from '../../components/TravelChecklistCard';
import { tx } from '../../utils/txFixo';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SCREEN_W = Dimensions.get('window').width;

const CHECKLIST_ITEMS = [
    {
        id: 'sweep',
        get title() { return tx('telas.InspecaoRetornoScreen.varredura', 'Varredura Visual'); },
        icon: 'SearchNormal',
        color: '#F44336',
        items: [
            { id: 'under_beds', get label() { return tx('telas.InspecaoRetornoScreen.camas', 'Olhou embaixo de TODAS as camas?'); } },
            { id: 'bathroom_hooks', get label() { return tx('telas.InspecaoRetornoScreen.ganchos', 'Checou ganchos e portas atrás do banheiro?'); } },
            { id: 'drawers', get label() { return tx('telas.InspecaoRetornoScreen.gavetas', 'Abriu todas as gavetas e armários?'); } },
            { id: 'safebox', get label() { return tx('telas.InspecaoRetornoScreen.cofre', 'Cofre vazio e deixado aberto?'); } },
            { id: 'outlets', get label() { return tx('telas.InspecaoRetornoScreen.tomadas', 'Tomadas sem carregadores esquecidos?'); } },
        ]
    },
    {
        id: 'returns',
        get title() { return tx('telas.InspecaoRetornoScreen.devolucoes', 'Devoluções e Acertos'); },
        icon: 'Receipt2',
        color: Neo.colors.feedback.warning,
        items: [
            { id: 'keys', get label() { return tx('telas.InspecaoRetornoScreen.chaves', 'Chaves / cartões de acesso devolvidos'); } },
            { id: 'minibar', get label() { return tx('telas.InspecaoRetornoScreen.frigobar', 'Consumo do frigobar conferido e pago'); } },
            { id: 'towels', get label() { return tx('telas.InspecaoRetornoScreen.toalhas', 'Toalhas da piscina/praia devolvidas'); } },
            { id: 'rentals', get label() { return tx('telas.InspecaoRetornoScreen.alugados', 'Equipamentos alugados devolvidos'); } },
        ]
    },
    {
        id: 'packing',
        get title() { return tx('telas.InspecaoRetornoScreen.bagagem', 'Fechamento de Bagagem'); },
        icon: 'BagCross',
        color: Neo.colors.primary[500],
        items: [
            { id: 'liquids', get label() { return tx('telas.InspecaoRetornoScreen.liquidos', 'Líquidos bem vedados (risco de vazamento no voo)'); } },
            { id: 'weight', get label() { return tx('telas.InspecaoRetornoScreen.peso', 'Peso estimado OK para o voo (cuidado com compras)'); } },
            { id: 'dirty_clothes', get label() { return tx('telas.InspecaoRetornoScreen.roupas', 'Roupas sujas separadas em sacos isolados'); } },
            { id: 'tags', get label() { return tx('telas.InspecaoRetornoScreen.tags', 'Tags de identificação presas nas malas'); } },
        ]
    }
];

const TOTAL_ITEMS = CHECKLIST_ITEMS.reduce((n, s) => n + s.items.length, 0);

export default function InspecaoRetornoScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedSections, setExpandedSections] = useState({ sweep: true, returns: true, packing: true });

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

    // Ao concluir TODOS os itens do checkout, marca o retorno na viagem ativa.
    // O footer lê esse flag e inverte o avião ("voltando pra casa") até a
    // viagem ser encerrada. Só marca se houver viagem ativa; roda uma vez.
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const markedRef = useRef(false);
    useEffect(() => {
        if (markedRef.current || checkedCount < TOTAL_ITEMS) return;
        markedRef.current = true;
        (async () => {
            try {
                const raw = await AsyncStorage.getItem('@active_trip');
                if (!raw) return; // sem viagem ativa — nada a marcar
                const trip = JSON.parse(raw);
                trip.retornoConcluido = true;
                await AsyncStorage.setItem('@active_trip', JSON.stringify(trip));
                DeviceEventEmitter.emit('travel_return_changed', true);
            } catch (e) {
                markedRef.current = false; // permite nova tentativa se falhar
            }
        })();
    }, [checkedCount]);

    const toggleItem = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSection = (id) => {
        setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

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
                        <H2 style={{ color: Neo.colors.neutral.white, fontSize: 18 }}>{t('headersFirst.safeCheckout', 'Checkout Seguro')}</H2>
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
                        source={require('../../assets/images/headers/header-retorno.jpeg')}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', padding: 24 }}>
                        <H2 style={{ color: Neo.colors.neutral.white, marginBottom: 4 }}>{t('headersFirst.safeCheckout', 'Checkout Seguro')}</H2>
                    </View>
                </Animated.View>

                <View style={{ alignItems: 'center', marginBottom: 24, paddingHorizontal: 8 }}>
                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], lineHeight: 20 }}>
                        {t('headersFirst.aHoraDeIrEmboraQuandoOCansaOBateEOsPiore', 'A hora de ir embora é quando o cansaço bate e os piores esquecimentos acontecem. Faça esta varredura pente-fino antes de entregar a chave.')}
                    </Body>
                </View>

                {CHECKLIST_ITEMS.map((section) => (
                    <TravelChecklistCard
                        key={section.id}
                        section={section}
                        isExpanded={expandedSections[section.id]}
                        onToggleSection={() => toggleSection(section.id)}
                        checkedItems={checkedItems}
                        onToggleItem={toggleItem}
                    />
                ))}
            </Animated.ScrollView>
        </AppBackground>
    );
}
