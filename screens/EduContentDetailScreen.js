/**
 * EduContentDetailScreen.js
 * Tela genérica de destino para conteúdos de Educação (Padrão 2: Parallax Hero).
 * A imagem ocupa o topo da tela, e as seções de conteúdo rolam por cima.
 */
import { useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import AppBackground from '../components/AppBackground';
import ReviewImage from '../components/ReviewImage';
import NeoIcon from '../components/NeoIcon';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function EduContentDetailScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    
    // Recebe dados padronizados do params (title, image, sections)
    const { title, image, sections = [] } = route.params || {};

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

            {/* HEADER FIXO - Botão de Voltar */}
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
                        source={image}
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
                    {sections.map((section, idx) => (
                        <View key={idx} style={{ marginBottom: 32 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 }}>
                                {section.icon && (
                                    <NeoIcon name={section.icon} size={24} color={section.color || themeColors.neutral[800]} variant="Bold" />
                                )}
                                <Text style={{ 
                                    fontSize: 18, 
                                    fontWeight: '800', 
                                    color: section.color || themeColors.neutral[900], 
                                    letterSpacing: 0.5,
                                    textTransform: 'uppercase'
                                }}>
                                    {section.title}
                                </Text>
                            </View>
                            
                            <View style={{ gap: 12, paddingLeft: section.icon ? 8 : 0 }}>
                                {section.bullets && section.bullets.map((bullet, bIdx) => (
                                    <View key={bIdx} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
                                        <View style={{ 
                                            width: 6, height: 6, borderRadius: 3, 
                                            backgroundColor: section.color || themeColors.neutral[400], 
                                            marginTop: 8 
                                        }} />
                                        <Text style={{ 
                                            flex: 1,
                                            fontSize: 16, 
                                            color: themeColors.neutral[700], 
                                            lineHeight: 24 
                                        }}>
                                            {bullet}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </Animated.ScrollView>
        </AppBackground>
    );
}
