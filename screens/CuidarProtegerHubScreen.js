import { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoHorizontalCard from '../components/NeoHorizontalCard';
import NeoIcon from '../components/NeoIcon';
import ReviewImage from '../components/ReviewImage';
import FadeInView from '../components/FadeInView';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function CuidarProtegerHubScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];

    const contextItems = [
        { id: 'ambientes',       titulo: t('knowledgeHub.envPrevention', 'Prevenção por ambientes'),  iconName: 'Home2',      cor: '#F59E0B', route: 'EducationEnvironments', imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 'mentes_atipicas', titulo: t('knowledgeHub.neurodivergence', 'Lar Neurodiverso'), iconName: 'Activity', cor: themeColors.categoria.ameixa.fill, route: 'NeurodivergenceMenu', imageUrl: 'https://images.pexels.com/photos/7162002/pexels-photo-7162002.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 'pets',            titulo: t('knowledgeHub.protectPet', 'Proteção para Pets'),     iconName: 'ProtejaPet', cor: themeColors.categoria.rose.fill, route: 'PetsMenu', imageUrl: 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 'seguranca_idade', titulo: t('knowledgeHub.ageCare', 'Segurança 60+'),        iconName: 'TrendUp',    cor: '#0EA5E9', route: 'FasesVidaMenu', imageUrl: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 'gestante_segura', titulo: t('knowledgeHub.pregnancyCare', 'Gestante Segura'),  iconName: 'Woman',      cor: themeColors.categoria.rose.fill, route: 'GenericCategory', params: { categoryId: 'gestante_segura' }, imageUrl: 'https://images.pexels.com/photos/7055935/pexels-photo-7055935.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 'brinquedos_hub',  titulo: t('knowledgeHub.toyGuide', 'Guia de Brinquedos'),       iconName: 'MagicStar',  cor: '#D97706', route: 'GenericCategory', params: { categoryId: 'brinquedos' }, imageUrl: 'https://images.pexels.com/photos/3662804/pexels-photo-3662804.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ];

    const itemDescriptions = {
        'ambientes': t('cuidarProteger.descAmbientes', 'Prevenção de acidentes e riscos fatiados por cada cômodo da sua casa.'),
        'mentes_atipicas': t('cuidarProteger.descMentesAtipicas', 'Segurança inclusiva e adaptação do lar para perfis neurodivergentes.'),
        'pets': t('cuidarProteger.descPets', 'Plantas tóxicas, alimentos proibidos e adaptação de ambientes para animais.'),
        'seguranca_idade': t('cuidarProteger.descSegurancaIdade', 'Adaptações cruciais para a segurança e independência da terceira idade.'),
        'gestante_segura': t('cuidarProteger.descGestanteSegura', 'Cuidados estruturais e de hábitos para a segurança durante a gestação.'),
        'brinquedos_hub': t('cuidarProteger.descBrinquedosHub', 'Guia sobre classificação etária, riscos de engasgo e brinquedos perigosos.')
    };

    const handlePress = (item) => {
        const params = item.params || {};
        navigation.navigate(item.route, { ...params, heroImage: item.imageUrl });
    };

    const capaUrl = require('../assets/illustrations/pad/hero_fases_vida.png');
    const title = t('cuidarProteger.headerTitle', 'Cuidar & Proteger');

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = 280;
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

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors.neutral[800],
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }}>
                            {title}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={textMuted} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                {contextItems.length}{t('telas.CuidarProtegerHubScreen.categoriasExploreAsAdaptacoes', ' categorias • Explore as adaptações')}</Text>
                        </View>
                    </FadeInView>

                    {contextItems.map((item, index) => (
                        <FadeInView key={item.id} delay={150 + index * 50}>
                            <NeoHorizontalCard
                                title={item.titulo}
                                description={itemDescriptions[item.id]}
                                iconName={item.iconName}
                                imageUrl={item.imageUrl}
                                color={item.cor}
                                onPress={() => handlePress(item)}
                            />
                        </FadeInView>
                    ))}
                    <View style={{ height: 120 }} />
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(150,150,150,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    infoText: {
        fontSize: 13,
        fontWeight: '500',
    },
});
