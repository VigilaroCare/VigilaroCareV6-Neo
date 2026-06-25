import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import ReviewImage from '../../components/ReviewImage';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { H1, Caption } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function JardinagemSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const THEME_COLOR = '#16A34A'; // Verde folha (Jardinagem)

    const topics = [
        {
            id: 'epis',
            titulo: t('headersFirst.proteOObrigatRia', 'A "Armadura" do Jardineiro'),
            subtitulo: 'Proteção obrigatória: luvas, calçados fechados e camisas de manga longa.',
            icon: 'ShieldTick',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_tools_centered.png'),
            conteudo: 'A prática da jardinagem e a manutenção de hortas apresentam riscos específicos. É essencial e obrigatório o uso de luvas de jardinagem de boa qualidade, calçados fechados (ou botas de cano longo), além de camisas de manga comprida e calças com as barras fechadas.',
            prevencao: [
                'Essa armadura impede que insetos entrem na roupa e piquem a pele.',
                'Evita que a pele seja queimada pelo contato com seiva leitosa (látex) de plantas nocivas ao podá-las.'
            ]
        },
        {
            id: 'riscos_quimicos',
            titulo: 'Fertilizantes e Pesticidas',
            subtitulo: 'Armazenamento inadequado é um alto risco de intoxicação.',
            icon: 'Danger',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_chemicals.png'),
            conteudo: 'O uso e, principalmente, o armazenamento inadequado de produtos químicos de jardinagem (como adubos, inseticidas e pesticidas) representam um alto risco de intoxicação letal para crianças pequenas e pets, que podem ingerir esses produtos acidentalmente.',
            prevencao: [
                'Fertilizantes e pesticidas devem ser mantidos trancados em armários altos.',
                'Sempre manter na caixa original bem rotulada.',
                'Dê preferência a fertilizantes e pesticidas orgânicos/naturais.'
            ]
        },
        {
            id: 'riscos_clima',
            titulo: 'Exposição ao Clima e Insolação',
            subtitulo: 'Proteção contra o sol ardente durante o cultivo.',
            icon: 'Sun1',
            imagemUrl: require('../../assets/illustrations/pad/plantas-toxicas_equinacea-flor_014.jpg'),
            conteudo: 'Ficar exposto ao sol quente por longos períodos durante o cuidado com o jardim também é considerado um risco silencioso, podendo causar forte desidratação e mal-estar térmico (insolação).',
            prevencao: [
                'Priorize o trabalho nas primeiras horas da manhã ou no fim da tarde.',
                'Utilizar chapéus ou bonés e protetor solar sempre que estiver no jardim.',
                'Mantenha-se hidratado constantemente.'
            ]
        },
        {
            id: 'riscos_biologicos',
            titulo: 'Plantas Tóxicas',
            subtitulo: 'Contato e ingestão de plantas ornamentais tóxicas.',
            icon: 'Danger',
            imagemUrl: require('../../assets/illustrations/pad/plantas-toxicas_plantas-toxicas_030.jpg'),
            conteudo: 'Plantas muito comuns (Comigo-ninguém-pode, Bico-de-papagaio, Tinhorão, Coroa-de-cristo, Aroeira e Mamona) oferecem grande risco de intoxicação para crianças e animais.',
            prevencao: [
                'Identificar e evitar o cultivo dessas plantas em áreas de fácil acesso.',
                'Ao podá-las, o uso de luvas é fundamental.',
                'Lembrar que reações vão desde bolhas na pele até asfixia e convulsões se ingeridas.'
            ]
        },
        {
            id: 'riscos_ferramentas',
            titulo: 'Ferramentas Manuais e Elétricas',
            subtitulo: 'Atenção redobrada com lâminas e pontas.',
            icon: 'Setting2',
            imagemUrl: require('../../assets/illustrations/pad/generated_jardim_tools_centered.png'),
            conteudo: 'Acidentes com tesouras de poda, ancinhos ou cortadores de grama causam lesões sérias e profundas.',
            prevencao: [
                'Sempre desligue cortadores de grama da tomada antes de mexer na lâmina para limpá-la.',
                'Guarde enxadas, ancinhos e tesouras em local alto e trancado, longe do alcance de crianças.',
                'Ao caminhar pelo jardim, não deixe ferramentas com pontas viradas para cima na grama.'
            ]
        },
        {
            id: 'riscos_ergonomicos_animais',
            titulo: 'Vasos Pesados e Animais Escondidos',
            subtitulo: 'Proteja a coluna e fuja dos insetos e escorpiões.',
            icon: 'Health',
            imagemUrl: require('../../assets/illustrations/pad/fotos-stock-genericas_vespa-inseto_001.jpg'),
            conteudo: 'Abaixo de vasos pesados e úmidos costumam se abrigar aranhas e escorpiões. Além disso, levantar o peso de forma incorreta pode travar a sua coluna lombar.',
            prevencao: [
                'Antes de mover um vaso no chão, bata levemente nas laterais e sacuda-o usando um graveto para afugentar animais peçonhentos.',
                'Evite carregar vasos muito pesados sozinho. Se for levantar, dobre os joelhos e mantenha a coluna reta.',
                'Sempre use luvas de raspa de couro ao mexer em entulhos de jardim.'
            ]
        }
    ];

    const handlePress = (item) => {
        navigation.navigate('PremiumArticle', {
            conceito: {
                ...item,
                color: THEME_COLOR,
                tags: ['Jardinagem Segura']
            }
        });
    };

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Math.round(Dimensions.get('window').width * 0.78);
    const surface = isDark ? themeColors.neutral[100] : '#FFFFFF';

    const heroTransform = [
        {
            translateY: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
                outputRange: [-HERO_HEIGHT / 2, 0, HERO_HEIGHT * 0.4],
                extrapolate: 'clamp',
            })
        },
        {
            scale: scrollY.interpolate({
                inputRange: [-HERO_HEIGHT, 0],
                outputRange: [2, 1],
                extrapolateRight: 'clamp',
            })
        }
    ];

    const capaUrl = require('../../assets/illustrations/pad/ambientes-casa_jardim_019.jpg'); // Jardinagem // Gardening

    const title = t('headersFirst.gardening', 'Jardinagem Segura');
    const subtitle = t('headersFirst.cultivoSeguro', 'Práticas seguras de cultivo');

    return (
        <View style={{ flex: 1, backgroundColor: surface }}>
            <StatusBar style="light" />

            {/* Float Header / Back Button */}
            <SafeAreaView edges={['top']} style={styles.safeHeader}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtnFlat}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: THEME_COLOR,
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={typeof capaUrl === 'number' ? capaUrl : { uri: capaUrl }}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                    />
                    
                    {/* Gradient para legibilidade do título e fusão com o fundo */}
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', surface]}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* Hero title — viaja junto com a parallax */}
                    <View style={{
                        position: 'absolute',
                        bottom: 24,
                        paddingHorizontal: 22,
                        width: '100%',
                    }}>
                        <Text style={{
                            fontSize: 34,
                            fontWeight: '900',
                            color: '#FFFFFF',
                            letterSpacing: -0.8,
                            lineHeight: 38,
                        }} accessibilityRole="header">
                            {title}
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'rgba(255,255,255,0.9)',
                            marginTop: 6,
                            fontWeight: '600'
                        }}>
                            {subtitle}
                        </Text>
                    </View>
                </Animated.View>

                {/* Main Content */}
                <View style={[styles.content, { marginTop: 20 }]}>

                <View style={{ marginTop: 24 }}>
                    {topics.map((item) => (
                        <NeoHorizontalCard
                            key={item.id}
                            title={item.titulo}
                            description={item.subtitulo}
                            iconName={item.icon}
                              imageUrl={item.imagemUrl}
                            color={THEME_COLOR}
                            onPress={() => handlePress(item)}
                        />
                    ))}
                </View>
                </View>
            </Animated.ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 22,
        paddingBottom: 40,
    },
    safeHeader: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        paddingHorizontal: 20,
        zIndex: 10,
    },
    backBtnFlat: {
        width: 44, height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center', justifyContent: 'center',
        marginTop: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
});
