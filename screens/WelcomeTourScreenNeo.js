import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { DS as Neo } from '../utils/DesignSystem2026';
import { H1 as H1Neo, Body as BodyNeo } from '../components/NeoTypography';
import ButtonNeo from '../components/ButtonNeo';
import NeoIcon from '../components/NeoIcon';
import { useAccessibility } from '../context/AccessibilityContext';
import { useTranslation } from 'react-i18next';
import AppBackground from '../components/AppBackground';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        titleKey: 'onboarding.title1',
        subtitleKey: 'onboarding.subtitle1',
        icon: <NeoIcon name="ShieldTick" size={100} color={Neo.colors.primary.main} variant="Bold" />
    },
    {
        id: '2',
        titleKey: 'onboarding.title2',
        subtitleKey: 'onboarding.subtitle2',
        icon: <NeoIcon name="Radar" size={100} color={Neo.colors.primary.main} variant="Bold" />
    },
    {
        id: '3',
        titleKey: 'onboarding.title3',
        subtitleKey: 'onboarding.subtitle3',
        icon: <NeoIcon name="HeartAdd" size={100} color={Neo.colors.primary.main} variant="Bold" />
    },
    {
        id: '4',
        titleKey: 'onboarding.title4',
        subtitleKey: 'onboarding.subtitle4',
        icon: <NeoIcon name="Hand" size={100} color={Neo.colors.primary.main} variant="Bold" />,
        isHandednessSlide: true
    }
];

export default function WelcomeTourScreenNeo({ navigation }) {
    const { t } = useTranslation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { leftHandedMode, toggleLeftHanded } = useAccessibility();

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handleMomentumScrollEnd = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
    };

    const nextSlide = () => {
        if (currentIndex < SLIDES.length - 1) {
            scrollViewRef.current?.scrollTo({ x: (currentIndex + 1) * width, animated: true });
        } else {
            // Fim do tour -> segue para o fluxo de preenchimento (FamilyComposition)
            navigation.replace("FamilyComposition");
        }
    };

    const Paginator = () => (
        <View style={styles.paginatorContainer}>
            {SLIDES.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [8, 24, 8],
                    extrapolate: 'clamp'
                });
                const dotColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [Neo.colors.neutral[300], Neo.colors.primary.main, Neo.colors.neutral[300]],
                    extrapolate: 'clamp'
                });

                return (
                    <Animated.View
                        key={i.toString()}
                        style={[styles.dot, { width: dotWidth, backgroundColor: dotColor }]}
                    />
                );
            })}
        </View>
    );

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.skipContainer}>
                {currentIndex < SLIDES.length - 1 && (
                    <TouchableOpacity onPress={() => navigation.replace("FamilyComposition")} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                        <BodyNeo style={styles.skipText}>{t('onboarding.skip')}</BodyNeo>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                style={{ flex: 1 }}
            >
                {SLIDES.map((slide) => (
                    <View key={slide.id} style={[styles.slide, { width }]}>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                {slide.icon}
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <H1Neo style={styles.title}>{t(slide.titleKey)}</H1Neo>
                            <BodyNeo style={styles.subtitle}>{t(slide.subtitleKey)}</BodyNeo>
                            
                            {/* Componente específico para a seleção de mão */}
                            {slide.isHandednessSlide && (
                                <View style={styles.handednessContainer}>
                                    <TouchableOpacity
                                        style={[styles.handCard, !leftHandedMode && styles.handCardActive]}
                                        onPress={() => toggleLeftHanded(false)}
                                    >
                                        <View style={[styles.handIconWrap, !leftHandedMode && styles.handIconWrapActive]}>
                                            <NeoIcon
                                                name="Hand"
                                                size={36}
                                                color={!leftHandedMode ? Neo.colors.primary[600] : Neo.colors.neutral[400]}
                                                variant="Bold"
                                            />
                                        </View>
                                        <Text style={[styles.handCardText, !leftHandedMode && styles.handCardTextActive]}>{t('onboarding.rightHanded')}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.handCard, leftHandedMode && styles.handCardActive]}
                                        onPress={() => toggleLeftHanded(true)}
                                    >
                                        <View style={[styles.handIconWrap, leftHandedMode && styles.handIconWrapActive, { transform: [{ scaleX: -1 }] }]}>
                                            <NeoIcon
                                                name="Hand"
                                                size={36}
                                                color={leftHandedMode ? Neo.colors.primary[600] : Neo.colors.neutral[400]}
                                                variant="Bold"
                                            />
                                        </View>
                                        <Text style={[styles.handCardText, leftHandedMode && styles.handCardTextActive]}>{t('onboarding.leftHanded')}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Paginator />
                <ButtonNeo
                    title={currentIndex === SLIDES.length - 1 ? t('onboarding.startNow') : t('onboarding.next')}
                    onPress={nextSlide}
                    type="primary"
                    style={styles.button}
                    iconName={currentIndex === SLIDES.length - 1 ? "ArrowRight2" : null}
                    iconAlign="right"
                />
            </View>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    skipContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: Neo.spacing.lg
    },
    skipText: {
        color: Neo.colors.neutral[500],
        fontWeight: '600'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.xl
    },
    iconContainer: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconCircle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: Neo.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: Neo.spacing.xl
    },
    title: {
        textAlign: 'center',
        color: Neo.colors.neutral[800],
        marginBottom: Neo.spacing.md
    },
    subtitle: {
        textAlign: 'center',
        color: Neo.colors.neutral[600],
        lineHeight: 24
    },
    footer: {
        paddingHorizontal: Neo.spacing.xl,
        paddingBottom: Neo.spacing.xl + 20,
        justifyContent: 'space-between'
    },
    paginatorContainer: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Neo.spacing.lg
    },
    dot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4
    },
    button: {
        width: '100%',
        height: 56,
        borderRadius: Neo.radius.full
    },
    handednessContainer: {
        flexDirection: 'row',
        marginTop: Neo.spacing.xl,
        gap: 16,
    },
    handCard: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[100],
        borderWidth: 2,
        borderColor: 'transparent',
        alignItems: 'center',
    },
    handCardActive: {
        backgroundColor: Neo.colors.primary[50],
        borderColor: Neo.colors.primary[500],
    },
    handIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Neo.colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    handIconWrapActive: {
        backgroundColor: Neo.colors.primary[100],
    },
    handCardText: {
        fontSize: 16,
        fontWeight: '600',
        color: Neo.colors.neutral[500],
    },
    handCardTextActive: {
        color: Neo.colors.primary[700],
        fontWeight: '800',
    }
});
