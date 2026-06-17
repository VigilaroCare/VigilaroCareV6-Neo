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
            id: 'kit',
            titulo: t('headersFirst.preparaODoSolo', 'O Kit Essencial'),
            subtitulo: 'Ferramentas seguras para preparar o solo, podar, regar e limpar.',
            icon: 'Setting2',
            conteudo: 'A jardinagem exige ferramentas específicas para garantir a segurança e evitar acidentes.\n\nPreparo do Solo:\n- Pá de Jardinagem: Fundamental para mover terra.\n- Garfo de Mão: Essencial para afofar a terra.\n- Ancinho (Rastelo): Nivela o solo.\n\nPoda e Manutenção:\n- Tesoura de Poda: Indispensável para aparar ramos secos e colheitas.\n- Serrote: Para galhos espessos.\n\nRega e Limpeza:\n- Regador e Pulverizador: Para irrigação suave.\n- Carrinho de Mão: Transporte pesado para evitar lesões.',
            prevencao: [
                'Sempre guarde as ferramentas limpas e secas.',
                'Cuidado com ferramentas enferrujadas (risco de tétano).',
                'Mantenha fora do alcance das crianças.'
            ]
        },
        {
            id: 'epis',
            titulo: t('headersFirst.proteOObrigatRia', 'Segurança e EPIs'),
            subtitulo: 'Proteção obrigatória: luvas, calçados fechados e chapéu.',
            icon: 'ShieldTick',
            conteudo: 'A prática da jardinagem e o cultivo de hortas em casa requerem o uso de Equipamentos de Proteção Individual (EPIs) para evitar cortes, alergias, picadas e exposição excessiva ao sol.',
            prevencao: [
                'Luvas: Proteção contra espinhos, cortes e produtos químicos.',
                'Calçados Fechados: Botas de couro ou cano longo (proteção contra picadas de animais).',
                'Roupas: Calças compridas e manga longa contra sol e insetos.',
                'Proteção Solar: Chapéu, boné e evitar horários de pico solar.'
            ]
        },
        {
            id: 'riscos',
            titulo: t('headersFirst.PlantasTXicas', 'Riscos Específicos'),
            subtitulo: 'Plantas tóxicas, produtos químicos e animais peçonhentos.',
            icon: 'Danger',
            conteudo: 'Alguns elementos do jardim podem representar riscos graves para crianças, pets e adultos se não forem manejados corretamente.',
            exemplos: [
                'Produtos Químicos: Fertilizantes e pesticidas devem ficar na embalagem original e trancados. Jamais reutilize garrafas de refrigerante para venenos.',
                'Plantas Tóxicas: Comigo-ninguém-pode, Bico-de-papagaio. O contato com a seiva pode causar queimaduras.',
                'Animais Peçonhentos: Entulhos atraem escorpiões e aranhas. Mantenha o quintal limpo e examine calçados e luvas antes de calçar.'
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

    const capaUrl = 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&cs=tinysrgb&w=1200'; // Gardening

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
                        source={{ uri: capaUrl }}
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
