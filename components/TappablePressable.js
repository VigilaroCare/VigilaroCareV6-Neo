import { useRef, useCallback } from "react";
import { Pressable, Animated } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';
import haptic from '../utils/Haptics';

/**
 * TappablePressable
 * Drop-in replacement para TouchableOpacity em CARDS interativos.
 *
 * Adiciona feedback de "tap-scale" com spring suave: scale 1.0 → 0.97
 * ao pressionar, com retorno bouncy ao soltar. Padrão Apple Health /
 * Linear / Things 3.
 *
 * Acessibilidade:
 *  - Pula a animação quando `reduceMotion` está ativo (idosos com vertigem)
 *  - Aceita accessibilityLabel/Role/Hint/State como qualquer Pressable
 *
 * Performance:
 *  - Usa Animated com useNativeDriver: true (anima na thread nativa,
 *    sem custo de JS bridge por frame)
 *
 * Quando NÃO usar:
 *  - Para itens de lista densos com muitos toques (use TouchableHighlight)
 *  - Para botões pequenos sem visual de card (use TouchableOpacity normal)
 *  - Para áreas grandes não-card (links de texto, etc.)
 *
 * @param {number} activeScale - Escala no press-in (default 0.97)
 * @param {boolean} bounceOnRelease - Se true, releaseu retorna com leve overshoot
 * @param {...PressableProps}
 */
export default function TappablePressable({
    children,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    style,
    activeScale = 0.97,
    bounceOnRelease = true,
    disabled = false,
    hitSlop,
    hapticOnPress = 'tap', // 'tap'|'action'|'success'|'warning'|'error'|null — semântico via utils/Haptics
    accessibilityLabel,
    accessibilityRole = 'button',
    accessibilityHint,
    accessibilityState,
    pressRetentionOffset,
    ...rest
}) {
    const { reduceMotion } = useAccessibility() || {};
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = useCallback((e) => {
        if (!reduceMotion) {
            Animated.spring(scale, {
                toValue: activeScale,
                useNativeDriver: true,
                speed: 60,
                bounciness: 0,
            }).start();
        }
        // Feedback tátil: chama o verbo semântico, sem ruído se prop null.
        if (hapticOnPress && haptic[hapticOnPress]) {
            haptic[hapticOnPress]();
        }
        onPressIn?.(e);
    }, [reduceMotion, activeScale, onPressIn, scale, hapticOnPress]);

    const handlePressOut = useCallback((e) => {
        if (!reduceMotion) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                speed: 30,
                bounciness: bounceOnRelease ? 6 : 0,
            }).start();
        }
        onPressOut?.(e);
    }, [reduceMotion, bounceOnRelease, onPressOut, scale]);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            hitSlop={hitSlop}
            pressRetentionOffset={pressRetentionOffset}
            accessibilityRole={accessibilityRole}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={accessibilityState}
            {...rest}
        >
            <Animated.View style={[style, { transform: [{ scale }] }]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}
