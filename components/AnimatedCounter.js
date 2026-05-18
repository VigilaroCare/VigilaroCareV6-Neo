import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, Easing } from 'react-native';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * AnimatedCounter
 * Tween de número: de `from` (default 0) até `value`. Re-anima quando
 * `value` muda. Útil para scores, contagens, percentuais.
 *
 * Implementação: Animated.Value + listener → setState a cada frame.
 * Não usa useNativeDriver (precisamos do valor no JS para renderizar).
 *
 * Respeita `reduceMotion`: pula para o valor final.
 *
 * @param {number}   value    - Valor alvo
 * @param {number}   from     - Valor inicial (default 0)
 * @param {number}   duration - Duração (ms, default 1000)
 * @param {string}   suffix   - Texto após o número (ex: '%', 'pts')
 * @param {string}   prefix   - Texto antes (ex: 'R$ ')
 * @param {number}   decimals - Casas decimais (default 0)
 * @param {object}   style    - Estilo do <Text>
 */
export default function AnimatedCounter({
    value = 0,
    from = 0,
    duration = 1000,
    suffix = '',
    prefix = '',
    decimals = 0,
    style,
    accessibilityLabel,
}) {
    const { reduceMotion } = useAccessibility() || {};
    const anim = useRef(new Animated.Value(reduceMotion ? value : from)).current;
    const [display, setDisplay] = useState(reduceMotion ? value : from);

    useEffect(() => {
        if (reduceMotion) {
            anim.setValue(value);
            setDisplay(value);
            return;
        }

        const id = anim.addListener(({ value: v }) => {
            setDisplay(v);
        });

        Animated.timing(anim, {
            toValue: value,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();

        return () => anim.removeListener(id);
    }, [value, duration, reduceMotion, anim]);

    const formatted = Number(display).toFixed(decimals);

    return (
        <Text
            style={style}
            accessibilityLabel={accessibilityLabel || `${prefix}${value}${suffix}`}
        >
            {prefix}{formatted}{suffix}
        </Text>
    );
}
