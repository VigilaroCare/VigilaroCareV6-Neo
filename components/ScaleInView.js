import React, { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * ScaleInView
 * Animação de entrada: scale 0.95 → 1.0 + fade in.
 * Mais sutil que FadeInView — ideal para cards de ação, CTAs e botões.
 *
 * Respeita `reduceMotion` do AccessibilityContext: quando ativo, o componente
 * renderiza no estado final (opacity 1, scale 1) sem animar — importante para
 * usuários com vertigem ou enjoo causados por movimento.
 *
 * Tactical Calm UX/UI: diversifica o motion vocabulary do app.
 * FadeInView = listas e conteúdo secundário
 * ScaleInView = cards interativos e CTAs
 *
 * @param {number} delay - Atraso antes de iniciar (cascata)
 * @param {number} duration - Duração da animação (ms)
 * @param {number} startScale - Escala inicial (default: 0.95)
 * @param {boolean} skipOnRevisit - Se true, pula animação em revisitas (session-level)
 * @param {string} screenKey - Chave única para controlar revisitas
 */

// Cache de sessão — persiste enquanto o app estiver aberto
const _animatedScreens = new Set();

export default function ScaleInView({
    children,
    delay = 0,
    duration = 400,
    startScale = 0.95,
    style,
    skipOnRevisit = false,
    screenKey = null,
}) {
    const { reduceMotion } = useAccessibility() || {};
    const shouldSkip = (skipOnRevisit && screenKey && _animatedScreens.has(screenKey)) || reduceMotion;

    const opacity = useRef(new Animated.Value(shouldSkip ? 1 : 0)).current;
    const scale = useRef(new Animated.Value(shouldSkip ? 1 : startScale)).current;

    useEffect(() => {
        if (shouldSkip) {
            // Garante o estado final mesmo se reduceMotion ligar após o mount
            opacity.setValue(1);
            scale.setValue(1);
            return;
        }

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.out(Easing.back(1.2)), // Leve overshoot orgânico
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (skipOnRevisit && screenKey) {
                _animatedScreens.add(screenKey);
            }
        });
    }, [shouldSkip]);

    return (
        <Animated.View style={[style, { opacity, transform: [{ scale }] }]}>
            {children}
        </Animated.View>
    );
}
