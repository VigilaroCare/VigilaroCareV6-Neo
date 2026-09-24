import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * AnimatedProgressBar
 * Barra de progresso que cresce de 0 → `value`% com easing suave.
 * Re-anima quando `value` muda.
 *
 * Respeita `reduceMotion`: pula a animação e fixa direto no valor final.
 *
 * @param {number} value      - Valor atual (0–100)
 * @param {number} height     - Altura da barra (default 8)
 * @param {string} color      - Cor do fill
 * @param {string} trackColor - Cor da trilha (default cinza claro)
 * @param {number} duration   - Duração da animação (ms, default 900)
 * @param {object} style      - Estilos extras no container
 */
export default function AnimatedProgressBar({
    value = 0,
    height = 8,
    color = '#10B981',
    trackColor = 'rgba(0,0,0,0.08)',
    duration = 900,
    style,
    accessibilityLabel,
}) {
    const { reduceMotion } = useAccessibility() || {};
    const progress = useRef(new Animated.Value(reduceMotion ? value : 0)).current;
    const clamped = Math.max(0, Math.min(100, Number(value) || 0));

    useEffect(() => {
        if (reduceMotion) {
            progress.setValue(clamped);
            return;
        }
        Animated.timing(progress, {
            toValue: clamped,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false, // width não suporta nativeDriver
        }).start();
    }, [clamped, duration, reduceMotion, progress]);

    const widthInterpolated = progress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View
            style={[
                {
                    width: '100%',
                    height,
                    borderRadius: height / 2,
                    backgroundColor: trackColor,
                    overflow: 'hidden',
                },
                style,
            ]}
            accessibilityRole="progressbar"
            accessibilityValue={{ now: clamped, min: 0, max: 100 }}
            accessibilityLabel={accessibilityLabel}
        >
            <Animated.View
                style={{
                    height: '100%',
                    width: widthInterpolated,
                    backgroundColor: color,
                    borderRadius: height / 2,
                }}
            />
        </View>
    );
}
