import React from 'react';
import { Animated, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * ScaleButton
 * Componente que reduz levemente (scale down) ao ser pressionado.
 * Simula o comportamento nativo do iOS (ex: App Store cards, Music).
 */
export default function ScaleButton({
    children,
    onPress,
    style,
    scaleTo = 0.96,
    activeOpacity = 1
}) {
    const animatedValue = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        // Haptic feedback for tactile feel
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        Animated.spring(animatedValue, {
            toValue: scaleTo,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({ pressed }) => [
                style,
                { opacity: pressed ? activeOpacity : 1 }, // Optional opacity change
            ]}
        >
            <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
                {children}
            </Animated.View>
        </Pressable>
    );
}
