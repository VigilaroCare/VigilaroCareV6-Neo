import { useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Animated, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import ReviewImage from '../../components/ReviewImage';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function LazerFeriasMenuScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];

    const items = [
        {
            id: 'lazer',
            title: t('lazerMenu.lazer.title', 'Lazer ao Ar Livre'),
            desc: t('lazerMenu.lazer.desc', 'Segurança em parques, piscinas e parquinhos.'),
            image: require('../../assets/illustrations/pad/card_lazer_diversao.png'),
            iconColor: '#00ACC1', // Cyan 600
            route: 'SegurancaLazer',
        },
        {
            id: 'ferias',
            title: t('lazerMenu.ferias.title', 'Viagens e Férias'),
            desc: t('lazerMenu.ferias.desc', 'Preparação da casa e segurança no destino.'),
            image: require('../../assets/illustrations/pad/card_ferias_viagens.png'),
            iconColor: '#8E24AA', // Purple 600
            route: 'SegurancaFerias',
        },
        {
            id: 'mobilidade',
            title: t('lazerMenu.mobilidade.title', 'Mobilidade Segura'),
            desc: t('lazerMenu.mobilidade.desc', 'Transporte seguro de bebês, crianças e pets.'),
            image: require('../../assets/illustrations/pad/card_mobilidade_ebikes.png'),
            iconColor: '#FFB300', // Amber 600
            route: 'MobilidadeSegura',
        }
    ];

    const scrollY = useRef(new Animated.Value(0)).current;
    const HERO_HEIGHT = Neo.layout.heroBanner;
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

    const title = t('knowledgeHub.leisureTravel', 'Lazer & Viagens');
    const capaSource = require('../../assets/illustrations/pad/hero_lazer_ferias.jpg');

    return (
        <AppBackground>
            <StatusBar style="light" translucent={true} backgroundColor="transparent" />

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
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <ReviewImage
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={title}
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
                    <View style={{ marginTop: 20 }}>
                        {items.map((item) => (
                            <NeoHorizontalCard
                                key={item.id}
                                title={item.title}
                                description={item.desc}
                                imageUrl={item.image}
                                color={item.iconColor}
                                onPress={() => navigation.navigate(item.route)}
                            />
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
        fontSize: 24,
    },
    subtitle: {
        fontSize: 14,
    },
    content: {
        paddingHorizontal: 20,
    },
});

