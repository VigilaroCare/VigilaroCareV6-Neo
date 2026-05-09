import React from 'react';
import { View, StyleSheet, Text, Platform, Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';

// Helper: Polar to Cartesian coordinates
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

// Helper: Create SVG Arc Path
const describeArc = (x, y, innerRadius, outerRadius, startAngle, endAngle) => {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = polarToCartesian(x, y, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", endInner.x, endInner.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, startInner.x, startInner.y,
        "L", startOuter.x, startOuter.y,
        "Z"
    ].join(" ");
};

const ScoreDonutChart = ({ score = 0, breakdown = null, size = 80, strokeWidth = 8 }) => {
    // 1. Calculate Segments
    let data = [];
    let displayScore = score;

    if (breakdown && breakdown.total > 0) {
        // Use Real Data Breakdown
        const { safe, warning, critical, total, percentage } = breakdown;

        displayScore = percentage; // Use the inspection score

        const pSafe = (safe / total) * 100;
        const pWarning = (warning / total) * 100;
        const pCritical = (critical / total) * 100;

        data = [
            { value: pSafe, color: Neo.colors.feedback.success },
            { value: pWarning, color: Neo.colors.feedback.warning },
            { value: pCritical, color: Neo.colors.feedback.error }
        ];
    } else {
        // Fallback: Estimate based on Score
        const safeScore = Math.min(100, Math.max(0, score));
        const remaining = 100 - safeScore;

        // Arbitrary split for remaining (60% warn / 40% crit)
        const yellowVal = remaining * 0.6;
        const redVal = remaining * 0.4;

        data = [
            { value: safeScore, color: Neo.colors.feedback.success },
            { value: yellowVal, color: Neo.colors.feedback.warning },
            { value: redVal, color: Neo.colors.feedback.error }
        ];
    }

    // 2. Geometry
    const center = size / 2;
    const radius = size / 2;
    const innerRadius = radius - strokeWidth;

    // Start angle: -90 (Top)
    let currentAngle = 0;
    const gapAngle = 2; // Gap between segments

    const segments = data.map((item, index) => {
        if (item.value <= 1) return null; // Skip tiny segments

        // Calculate sweep angle (proportional to 360)
        const sweepAngle = (item.value / 100) * 360;

        // Effective drawing angle (minus gap)
        const drawAngle = Math.max(0, sweepAngle - gapAngle);

        const startAngle = currentAngle;
        const endAngle = currentAngle + drawAngle;

        // Update current for next segment (include gap)
        currentAngle += sweepAngle;

        const path = describeArc(center, center, innerRadius, radius, startAngle, endAngle);

        return (
            <Path
                key={`seg-${index}`}
                d={path}
                fill={item.color}
            />
        );
    });

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation="-90" origin={`${center}, ${center}`}>
                    {segments}
                </G>
            </Svg>

            {/* Center Text (Score) */}
            <View style={styles.centerContent}>
                <Text style={styles.scoreLabel}>SCORE</Text>
                <Text style={[styles.scoreValue, { color: Neo.colors.neutral[800] }]}>
                    {displayScore}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centerContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: Neo.colors.neutral[500],
        marginBottom: -2
    },
    scoreValue: {
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto'
    }
});

export default ScoreDonutChart;
