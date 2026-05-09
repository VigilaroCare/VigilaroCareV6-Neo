import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, G, Circle, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const HybridDonutChart = ({
    data = [],
    size = 300,
    strokeWidth = 60, // Thicker segments by default
    logoComponent
}) => {
    const radius = size / 2;
    const center = size / 2;
    // Chart radius needs to fit the stroke width completely within the view
    const chartRadius = radius - (strokeWidth / 2) - 5;

    // Helper to convert polar to cartesian coordinates
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Helper to create slice path
    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const sliceAngle = 360 / Math.max(data.length, 1);
    const gapAngle = 4; // Gap between slices

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                <Defs>
                    <LinearGradient id="gradSafe" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#4CAF50" stopOpacity="1" />
                        <Stop offset="1" stopColor="#81C784" stopOpacity="1" />
                    </LinearGradient>
                    <LinearGradient id="gradWarning" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#FF9800" stopOpacity="1" />
                        <Stop offset="1" stopColor="#FFB74D" stopOpacity="1" />
                    </LinearGradient>
                    <LinearGradient id="gradDanger" x1="0" y1="0" x2="1" y2="0">
                        <Stop offset="0" stopColor="#F44336" stopOpacity="1" />
                        <Stop offset="1" stopColor="#E57373" stopOpacity="1" />
                    </LinearGradient>
                </Defs>

                {/* Central Circle Background (Optional, behind logo) */}
                {/* <Circle cx={center} cy={center} r={chartRadius - strokeWidth/2 - 5} fill="#f8f9fa" /> */}

                {data.map((item, index) => {
                    const startAngle = (index * sliceAngle) + (gapAngle / 2);
                    const endAngle = startAngle + sliceAngle - gapAngle;

                    let gradientId = "url(#gradSafe)";
                    let baseColor = "#4CAF50";
                    if (item.value < 50) {
                        gradientId = "url(#gradDanger)";
                        baseColor = "#F44336";
                    } else if (item.value < 80) {
                        gradientId = "url(#gradWarning)";
                        baseColor = "#FF9800";
                    }

                    // Background Track for this slice
                    const trackPath = describeArc(center, center, chartRadius, startAngle, endAngle);

                    // Progress Path (filling the slice based on value)
                    // Ensure min value so functionality is visible
                    const visibleValue = Math.max(item.value, 5);
                    const valueAngle = startAngle + ((sliceAngle - gapAngle) * (visibleValue / 100));
                    const progressPath = describeArc(center, center, chartRadius, startAngle, valueAngle);

                    // Calculations for Text Placement (Middle of the slice)
                    const midAngle = startAngle + (sliceAngle - gapAngle) / 2;
                    const textPos = polarToCartesian(center, center, chartRadius, midAngle);

                    // Rotation logic to keep text readable
                    let rotation = midAngle;
                    if (midAngle > 90 && midAngle < 270) {
                        rotation += 180;
                    }

                    return (
                        <G key={`slice-${index}`}>
                            {/* Track Path (Empty part of slice) */}
                            <Path
                                d={trackPath}
                                stroke="#E0E0E0"
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeOpacity={0.4}
                                strokeLinecap="butt"
                            />

                            {/* Progress Path (Filled part) */}
                            <Path
                                d={progressPath}
                                stroke={gradientId}
                                strokeWidth={strokeWidth}
                                fill="none"
                                strokeLinecap="butt"
                            />

                            {/* Labels - Centered inside the slice thickness */}
                            <G
                                x={textPos.x}
                                y={textPos.y}
                                rotation={rotation}
                                origin={`${textPos.x}, ${textPos.y}`}
                            >
                                <SvgText
                                    fill={item.value > 0 ? "#FFF" : "#777"}
                                    fontSize="10"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    dy="-6" // Up
                                >
                                    {item.label?.toUpperCase().substring(0, 12)}
                                </SvgText>

                                <SvgText
                                    fill={item.value > 0 ? "#FFF" : "#777"}
                                    fontSize="12"
                                    fontWeight="800"
                                    textAnchor="middle"
                                    dy="7" // Down
                                >
                                    {Math.round(item.value)}%
                                </SvgText>
                            </G>
                        </G>
                    );
                })}
            </Svg>

            {/* Central Content Area */}
            <View style={[styles.innerCircle, {
                width: (center - chartRadius - strokeWidth / 2) * 2,
                height: (center - chartRadius - strokeWidth / 2) * 2,
                borderRadius: size, // fully round
                top: center - (center - chartRadius - strokeWidth / 2),
                left: center - (center - chartRadius - strokeWidth / 2),
            }]}>
                <View style={styles.logoContainer}>
                    {logoComponent}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff', // Optional: White background for center
    },
    logoContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HybridDonutChart;
