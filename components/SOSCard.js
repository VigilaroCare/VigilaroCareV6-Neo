import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Vibration,
    Pressable
} from 'react-native';
import NeoIcon from './NeoIcon';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SOSCard({ onTrigger }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Vibration.vibrate(50); // Haptic feedback
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        Vibration.vibrate([0, 500, 200, 500]); // SOS Pattern
        if (onTrigger) onTrigger();
    };

    return (
        <View style={styles.card}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
                style={styles.touchable}
            >
                <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
                    {/* Icon & Text */}
                    <View style={styles.content}>
                        <NeoIcon name="InfoCircle" size={32} color="#FFF" />
                        <Text style={styles.buttonText}>SOS</Text>
                    </View>
                </Animated.View>
            </Pressable>

            <Text style={styles.cardLabel}>Chamadas de Emergência</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        marginBottom: 15,
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        position: 'relative',
        minHeight: 140, // Ensure enough height for button + text
    },
    touchable: {
        borderRadius: 35,
        marginBottom: 12,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF3B30', // iOS Red
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    ringContainer: {
        position: 'absolute',
        top: 3,
        left: 3,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 12,
        marginTop: -2,
    },
    cardLabel: {
        fontSize: 14, // Slightly smaller to fit 2 lines if needed
        fontWeight: '600',
        color: '#000000',
        textAlign: 'center',
    },
    tooltip: {
        position: 'absolute',
        top: 10, // Show above or inside
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        zIndex: 10,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 10,
        textAlign: 'center',
    }
});
