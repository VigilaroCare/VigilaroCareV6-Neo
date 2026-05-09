import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

/**
 * FadeInView
 * Efeito suave de cascata sem depender de bibliotecas externas (100% Core React Native)
 * Evita conflitos nativos do Expo Go.
 * 
 * Tactical Calm UX/UI:
 * - skipOnRevisit: quando true, pula animação em revisitas (session-level cache)
 *   Telas frequentes (Home, Menu) devem aparecer instantaneamente na segunda visita.
 * - screenKey: identificador único da tela para o cache de revisitas
 * 
 * Regra de ouro: Anime a PRIMEIRA vez que o usuário vê algo.
 * Na segunda visita, mostre instantâneo.
 */

// Cache de sessão — persiste enquanto o app estiver aberto
const _animatedScreens = new Set();

export default function FadeInView({
    children,
    delay = 0,
    duration = 500,
    startY = 20,
    style,
    skipOnRevisit = false,
    screenKey = null,
}) {
    const shouldSkip = skipOnRevisit && screenKey && _animatedScreens.has(screenKey);

    // Usando a API interna e à prova de falhas do React Native
    const opacity = useRef(new Animated.Value(shouldSkip ? 1 : 0)).current;
    const translateY = useRef(new Animated.Value(shouldSkip ? 0 : startY)).current;

    useEffect(() => {
        if (shouldSkip) return;

        // Animação paralela: Opacidade controla o Fade-In e o translateY o movimento
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: duration,
                delay: delay,
                useNativeDriver: true, // Roda na thread nativa para máxima fluidez
            }),
            Animated.spring(translateY, {
                toValue: 0,
                delay: delay,
                bounciness: 4,
                speed: 12,
                useNativeDriver: true,
            })
        ]).start(() => {
            if (skipOnRevisit && screenKey) {
                _animatedScreens.add(screenKey);
            }
        });
    }, []);

    return (
        <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
            {children}
        </Animated.View>
    );
}
