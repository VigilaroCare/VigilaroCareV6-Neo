import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Vibration,
    Pressable
} from 'react-native';
import NeoIcon from './NeoIcon';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function SOSButton({ onTrigger }) {
    const [isPressing, setIsPressing] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const CIRCLE_LENGTH = 2 * Math.PI * 28; // Radius 28

    const handlePressIn = () => {
        setIsPressing(true);
        Vibration.vibrate(50); // Haptic start

        // Animate Scale
        Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();

        // Animate Progress (3 seconds)
        Animated.timing(progress, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false, // SVG props not supported by native driver
        }).start(({ finished }) => {
            if (finished) {
                triggerSOS();
            }
        });
    };

    const handlePressOut = () => {
        if (isPressing) {
            setIsPressing(false);
            // Reset animations
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
            Animated.timing(progress, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const triggerSOS = () => {
        Vibration.vibrate([0, 500, 200, 500]); // SOS Pattern
        setIsPressing(false);
        progress.setValue(0);
        scale.setValue(1);
        if (onTrigger) onTrigger();
    };

    const strokeDashoffset = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [CIRCLE_LENGTH, 0],
    });

    return (
        <View style={styles.container}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.touchable}
            >
                <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
                    {/* Progress Ring */}
                    <View style={styles.ringContainer}>
                        <Svg width={64} height={64}>
                            <Circle
                                cx={32}
                                cy={32}
                                r={28}
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth={4}
                                fill="transparent"
                            />
                            <AnimatedCircle
                                cx={32}
                                cy={32}
                                r={28}
                                stroke="#FFF"
                                strokeWidth={4}
                                fill="transparent"
                                strokeDasharray={CIRCLE_LENGTH}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                rotation="-90"
                                origin="32, 32"
                            />
                        </Svg>
                    </View>

                    {/* Icon & Text */}
                    <View style={styles.content}>
                        <NeoIcon name="InfoCircle" size={32} color="#FFF" />
                        <Text style={styles.text}>{isPressing ? "SEGURE" : "SOS"}</Text>
                    </View>
                </Animated.View>
            </Pressable>
            {isPressing && (
                <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>Segure por 3s para chamar</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 120, // Increased to clear TabBar
        right: 20,
        alignItems: 'center',
        zIndex: 9999, // Ensure it's on top
        elevation: 10,
    },
    touchable: {
        borderRadius: 35,
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
    text: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 12,
        marginTop: -2,
    },
    tooltip: {
        position: 'absolute',
        bottom: 80,
        backgroundColor: 'rgba(0,0,0,0.8)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        width: 160,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 12,
        textAlign: 'center',
    }
});
