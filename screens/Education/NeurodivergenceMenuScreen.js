import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoHorizontalCard from '../../components/NeoHorizontalCard';
import NeoIcon from '../../components/NeoIcon';
import { H1, Caption } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';
import { NEURODIVERGENCE_DATA } from '../../data/neurodivergence_data';

export default function NeurodivergenceMenuScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textBody = themeColors.neutral[700];

    const data = NEURODIVERGENCE_DATA;

    const { heroImage } = route?.params || {};
    const capaSource = heroImage ? (typeof heroImage === 'string' ? { uri: heroImage } : heroImage) : { uri: 'https://images.pexels.com/photos/7162002/pexels-photo-7162002.jpeg?auto=compress&cs=tinysrgb&w=800' };

    const scrollY = React.useRef(new Animated.Value(0)).current;
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

    const handlePress = (item) => {
        navigation.navigate('PremiumArticle', {
            conceito: {
                titulo: item.title,
                conteudo: item.content,
                icon: item.icon,
                color: item.color,
                imagemUrl: item.imagemUrl,
                tags: [data.title]
            }
        });
    };

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
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                {/* HERO com parallax */}
                <Animated.View style={{
                    width: '100%',
                    height: HERO_HEIGHT,
                    backgroundColor: themeColors?.neutral?.[800] || '#222',
                    overflow: 'hidden',
                    transform: heroTransform,
                }}>
                    <Image
                        source={capaSource}
                        style={StyleSheet.absoluteFill}
                        resizeMode="cover"
                        accessibilityLabel={data.title}
                    />
                    <LinearGradient
                        colors={['rgba(0,0,0,0.45)', 'transparent', 'rgba(0,0,0,0.55)', isDark ? (themeColors?.neutral?.[100] || '#000') : '#F6F6F6']}
                        locations={[0, 0.35, 0.85, 1]}
                        style={StyleSheet.absoluteFill}
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
                            marginBottom: 8,
                        }}>
                            {data.title}
                        </Text>
                        <Text style={{
                            fontSize: 17,
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 24,
                        }}>
                            {data.subtitle}
                        </Text>
                    </View>
                </Animated.View>

                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                        <Caption style={{ marginBottom: 24, fontSize: 16 }}>{data.description}</Caption>
                        
                        {data.categories.map((cat, index) => (
                            <NeoHorizontalCard
                                key={cat.id}
                                title={cat.title}
                                description={cat.short_desc}
                                iconName={cat.icon}
                                color={cat.color}
                                onPress={() => handlePress(cat)}
                            />
                        ))}
                    </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 2,
    }
});
