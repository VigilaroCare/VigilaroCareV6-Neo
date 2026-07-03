import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark } from '../utils/ThemeContext';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function ThreeRingChart({ scoreData, size = 120, shape = 'circle' }) {
    const isDark = useIsDark();
    const isSquircle = shape === 'squircle';
    
    // Animações para os três anéis
    const animOuter = useRef(new Animated.Value(0)).current;
    const animMiddle = useRef(new Animated.Value(0)).current;
    const animInner = useRef(new Animated.Value(0)).current;

    // --- Cálculos das Métricas (Lógica Positiva) ---
    const scoreGeral = scoreData?.geral || 0;
    const statsAmbientes = scoreData?.statsAmbientes || {};
    const totalAmbientes = Object.keys(statsAmbientes).length;
    
    let roomsWithoutIssues = 0;
    let roomsWithoutCritical = 0;

    if (totalAmbientes > 0) {
        Object.values(statsAmbientes).forEach(stats => {
            const isCritical = stats.critical > 0;
            const isWarning = stats.warning > 0;
            if (!isCritical && !isWarning) roomsWithoutIssues++;
            if (!isCritical) roomsWithoutCritical++;
        });
    }

    const scoreMiddle = totalAmbientes > 0 ? Math.round((roomsWithoutIssues / totalAmbientes) * 100) : 0;
    const scoreInner = totalAmbientes > 0 ? Math.round((roomsWithoutCritical / totalAmbientes) * 100) : 0;

    // --- Geometria Dinâmica (Squircle ou Círculo) ---
    const center = size / 2;
    const strokeWidth = isSquircle ? 7 : 8; 
    const gap = isSquircle ? 4 : 3;

    // Outer
    const wOuter = size - strokeWidth;
    const rxOuter = isSquircle ? size * 0.28 : wOuter / 2;
    const pOuter = 4 * wOuter - 8 * rxOuter + 2 * Math.PI * rxOuter;

    // Middle
    const wMiddle = wOuter - 2 * strokeWidth - 2 * gap;
    const rxMiddle = Math.max(0, rxOuter - strokeWidth - gap);
    const pMiddle = 4 * wMiddle - 8 * rxMiddle + 2 * Math.PI * rxMiddle;

    // Inner
    const wInner = wMiddle - 2 * strokeWidth - 2 * gap;
    const rxInner = Math.max(0, rxMiddle - strokeWidth - gap);
    const pInner = 4 * wInner - 8 * rxInner + 2 * Math.PI * rxInner;

    const generatePath = (cx, cy, w, rx) => {
        const left = cx - w / 2;
        const right = cx + w / 2;
        const top = cy - w / 2;
        const bottom = cy + w / 2;
        // Desenha começando do top-center (12 horas) e vai no sentido horário
        return `M ${cx} ${top} L ${right - rx} ${top} A ${rx} ${rx} 0 0 1 ${right} ${top + rx} L ${right} ${bottom - rx} A ${rx} ${rx} 0 0 1 ${right - rx} ${bottom} L ${left + rx} ${bottom} A ${rx} ${rx} 0 0 1 ${left} ${bottom - rx} L ${left} ${top + rx} A ${rx} ${rx} 0 0 1 ${left + rx} ${top} Z`;
    };

    const pathOuter = generatePath(center, center, wOuter, rxOuter);
    const pathMiddle = generatePath(center, center, wMiddle, rxMiddle);
    const pathInner = generatePath(center, center, wInner, rxInner);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(animOuter, { toValue: scoreGeral, duration: 1000, useNativeDriver: true }),
            Animated.timing(animMiddle, { toValue: scoreMiddle, duration: 1200, useNativeDriver: true }),
            Animated.timing(animInner, { toValue: scoreInner, duration: 1400, useNativeDriver: true })
        ]).start();
    }, [scoreGeral, scoreMiddle, scoreInner]);

    const getRingColor = (score) => {
        if (score >= 80) return '#6EE7B7';
        if (score >= 50) return '#FCD34D';
        return '#FCA5A5';
    };

    const textColor = isDark ? '#FFFFFF' : Neo.colors.neutral[900];
    const ringTrack = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* Fundo sólido apenas no centro, para não cobrir a área dos anéis */}
            <View style={[
                styles.hubcap, 
                { 
                    width: Math.max(0, wInner - strokeWidth - 4), 
                    height: Math.max(0, wInner - strokeWidth - 4), 
                    borderRadius: Math.max(0, rxInner - (strokeWidth / 2)), 
                    backgroundColor: isDark ? Neo.colors.neutral[800] : '#FFFFFF' 
                }
            ]} />
            
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Trilhas (Fundo dos Anéis) */}
                <Path d={pathOuter} stroke={ringTrack} strokeWidth={strokeWidth} fill="none" />
                <Path d={pathMiddle} stroke={ringTrack} strokeWidth={strokeWidth} fill="none" />
                <Path d={pathInner} stroke={ringTrack} strokeWidth={strokeWidth} fill="none" />

                {/* Anéis de Progresso Animados */}
                <AnimatedPath
                    d={pathOuter}
                    stroke={getRingColor(scoreGeral)}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${pOuter} ${pOuter}`}
                    strokeDashoffset={animOuter.interpolate({
                        inputRange: [0, 100],
                        outputRange: [pOuter, 0] // 0 = fully filled, pOuter = empty
                    })}
                    strokeLinecap="round"
                />
                
                <AnimatedPath
                    d={pathMiddle}
                    stroke={getRingColor(scoreMiddle)}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${pMiddle} ${pMiddle}`}
                    strokeDashoffset={animMiddle.interpolate({
                        inputRange: [0, 100],
                        outputRange: [pMiddle, 0]
                    })}
                    strokeLinecap="round"
                />

                <AnimatedPath
                    d={pathInner}
                    stroke={getRingColor(scoreInner)}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={`${pInner} ${pInner}`}
                    strokeDashoffset={animInner.interpolate({
                        inputRange: [0, 100],
                        outputRange: [pInner, 0]
                    })}
                    strokeLinecap="round"
                />
            </Svg>

            {/* Score no centro */}
            <View style={styles.scoreTextContainer}>
                <Text style={[styles.scoreText, { color: textColor }]}>{scoreGeral}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    hubcap: {
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 6,
    },
    scoreTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreText: {
        fontSize: 24, // Reduzido para caber no gráfico de 90px
        fontWeight: '800',
        letterSpacing: -0.5,
    }
});
