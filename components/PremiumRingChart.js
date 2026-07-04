import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark } from '../utils/ThemeContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function PremiumRingChart({ scoreData, size = 100 }) {
    const isDark = useIsDark();
    const animValue = useRef(new Animated.Value(0)).current;

    const score = scoreData?.geral || 0;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: score,
            duration: 1200,
            useNativeDriver: true,
        }).start();
    }, [score]);

    // Premium Colors based on score
    const getColors = (val) => {
        if (val >= 80) return ['#10B981', '#047857']; // Emerald Green
        if (val >= 50) return ['#F59E0B', '#B45309']; // Amber/Gold
        return ['#EF4444', '#B91C1C']; // Ruby Red
    };

    const colors = getColors(score);

    // Geometry
    const strokeWidth = size * 0.12; // 12% do tamanho
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = animValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0]
    });

    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const trackColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const bgColor = isDark ? Neo.colors.neutral[800] : '#FDFBF7';

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* Fundo sólido total para bloquear "ruídos" da imagem do Canva por trás do botão */}
            <View style={[
                styles.background, 
                { 
                    width: size, 
                    height: size, 
                    borderRadius: size / 2, 
                    backgroundColor: bgColor 
                }
            ]} />

            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Defs>
                    <LinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor={colors[0]} />
                        <Stop offset="100%" stopColor={colors[1]} />
                    </LinearGradient>
                </Defs>
                
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#ringGrad)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transform: [{ rotate: '-90deg' }], transformOrigin: 'center' }}
                />
            </Svg>

            {/* Texto centralizado e indicador de clique */}
            <View style={styles.textContainer}>
                <Text style={[styles.scoreText, { color: textColor, fontSize: size * 0.35 }]}>
                    {score}
                </Text>
                
                {/* Indicador de botão (Affordance) */}
                <View style={styles.actionIndicator}>
                    <Text style={[styles.actionText, { color: isDark ? '#A1A1AA' : '#6B7280' }]}>VER</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        fontWeight: '900',
        letterSpacing: -1,
    },
    actionIndicator: {
        position: 'absolute',
        bottom: '18%', // Coloca o indicador na parte inferior do círculo
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.8,
    },
    actionText: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.5,
    }
});
