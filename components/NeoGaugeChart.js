import React, { useEffect, useState } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle, Path, G, Text as SvgText } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function NeoGaugeChart({
    score = 0,
    size = 165,
    strokeWidth = 18,
    color = Neo.colors.primary[500],
    trackColor = Neo.colors.neutral[200]
}) {
    const defaultColor = Neo.colors.primary[500];
    const safeColor = Neo.colors.feedback.success;
    const warningColor = Neo.colors.feedback.warning;
    const dangerColor = Neo.colors.feedback.error;

    // Determine color based on score if none provided explicitly
    const actualColor = score === 100 ? safeColor : (score >= 70 ? warningColor : dangerColor);

    const radius = (size - strokeWidth) / 2;
    const center = size / 2;
    // Donut chart (full circle)
    const circumference = 2 * Math.PI * radius;

    // Animate the progress
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: score,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true, // Path animation on true might cause issues sometimes, if so switch to false, but react-native-svg usually handles it if set up carefully, actually wait Native driver for setNativeProps is safe with Animated createAnimatedComponent.
        }).start();
    }, [score]);

    // Calculate strokeDashoffset based on score
    // When score is 100, offset is 0
    // When score is 0, offset is circumference
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={`${center}, ${center}`}>
                    {/* Background Track Circle */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <Circle
                        cx={center}
                        cy={center}
                        r={radius}
                        stroke={actualColor}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>

            {/* Center Content */}
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                <Animated.Text style={{
                    fontSize: size * 0.07,
                    color: Neo.colors.neutral[500],
                    fontWeight: '600',
                    marginBottom: 4
                }}>
                    Nível de Proteção
                </Animated.Text>
                <Animated.Text style={{
                    fontSize: size * 0.22,
                    fontWeight: '900',
                    color: Neo.colors.neutral[900],
                    lineHeight: size * 0.26
                }}>
                    {score}<Animated.Text style={{ fontSize: size * 0.11, fontWeight: '600', color: Neo.colors.neutral[400] }}>%</Animated.Text>
                </Animated.Text>
            </View>
        </View>
    );
}
