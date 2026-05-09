/**
 * ChatFAB.js
 * Botão flutuante para acessar o Chat do Vigilaro IA
 * Vigilaro Care V5
 */

import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated } from 'react-native';
import NeoIcon from './NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Shadows } from '../utils/Theme';
import { useLeftHandedStyle } from '../hooks/useLeftHandedStyle';

export default function ChatFAB({ onPress, style }) {
    const insets = useSafeAreaInsets();
    const { fabPosition } = useLeftHandedStyle();
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    // Animação de pulso sutil para chamar atenção
    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        );

        const glow = Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        );

        pulse.start();
        glow.start();

        return () => {
            pulse.stop();
            glow.stop();
        };
    }, []);

    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                { bottom: 100 + insets.bottom },
                { transform: [{ scale: pulseAnim }] },
                fabPosition('left'),
                style
            ]}
        >
            {/* Glow effect */}
            <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />

            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.85}
                style={styles.touchable}
            >
                <LinearGradient
                    colors={['#6366F1', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <NeoIcon name="Message" size={28} color="#FFF" />

                    {/* Sparkle indicator */}
                    <View style={styles.sparkle}>
                        <NeoIcon name="MagicStar" size={12} color="#FFD700" />
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 999,
    },
    glow: {
        position: 'absolute',
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#8B5CF6',
        top: -4,
        left: -4,
    },
    touchable: {
        width: 64,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        ...Shadows.lg,
        elevation: 10,
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sparkle: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 8,
        padding: 2,
    },
});
