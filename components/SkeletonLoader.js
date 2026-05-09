/**
 * SkeletonLoader.js
 * Pilar 1: Utilidade Máxima - Feedback Proativo
 * Substitui spinners genéricos por esqueletos visuais da interface
 * 
 * Usage:
 * <SkeletonLoader type="card" count={3} />
 * <SkeletonLoader type="list" count={5} />
 * <SkeletonLoader type="profile" />
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../utils/Theme';

const { width } = Dimensions.get('window');

const SkeletonPulse = ({ style }) => {
    const pulseAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();
        return () => pulse.stop();
    }, []);

    return (
        <Animated.View
            style={[
                styles.skeleton,
                style,
                { opacity: pulseAnim }
            ]}
        />
    );
};

// Skeleton para Cards (ex: cards de perfil, itens de lista)
const CardSkeleton = () => (
    <View style={styles.cardContainer}>
        <SkeletonPulse style={styles.cardIcon} />
        <View style={styles.cardContent}>
            <SkeletonPulse style={styles.cardTitle} />
            <SkeletonPulse style={styles.cardSubtitle} />
        </View>
        <SkeletonPulse style={styles.cardChevron} />
    </View>
);

// Skeleton para Lista simples
const ListSkeleton = () => (
    <View style={styles.listItem}>
        <SkeletonPulse style={styles.listBullet} />
        <SkeletonPulse style={styles.listText} />
    </View>
);

// Skeleton para Perfil (foto + info)
const ProfileSkeleton = () => (
    <View style={styles.profileContainer}>
        <SkeletonPulse style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
            <SkeletonPulse style={styles.profileName} />
            <SkeletonPulse style={styles.profileBio} />
            <SkeletonPulse style={styles.profileBio} />
        </View>
    </View>
);

// Skeleton para Header de tela
const HeaderSkeleton = () => (
    <View style={styles.headerContainer}>
        <SkeletonPulse style={styles.headerTitle} />
        <SkeletonPulse style={styles.headerSubtitle} />
    </View>
);

// Skeleton para Grid (ex: grid de categorias)
const GridSkeleton = () => (
    <View style={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.gridItem}>
                <SkeletonPulse style={styles.gridIcon} />
                <SkeletonPulse style={styles.gridLabel} />
            </View>
        ))}
    </View>
);

// Componente principal
export default function SkeletonLoader({ type = 'card', count = 1 }) {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return <CardSkeleton />;
            case 'list':
                return <ListSkeleton />;
            case 'profile':
                return <ProfileSkeleton />;
            case 'header':
                return <HeaderSkeleton />;
            case 'grid':
                return <GridSkeleton />;
            default:
                return <CardSkeleton />;
        }
    };

    if (type === 'grid' || type === 'profile' || type === 'header') {
        return renderSkeleton();
    }

    return (
        <View style={styles.container}>
            {Array.from({ length: count }).map((_, index) => (
                <View key={index}>
                    {renderSkeleton()}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.md,
    },
    skeleton: {
        backgroundColor: Colors.border || '#E0E0E0',
        borderRadius: BorderRadius.sm,
    },

    // Card Skeleton
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        backgroundColor: Colors.surface || '#FFF',
        borderRadius: BorderRadius.md,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    cardContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    cardTitle: {
        width: '70%',
        height: 16,
        marginBottom: 8,
    },
    cardSubtitle: {
        width: '50%',
        height: 12,
    },
    cardChevron: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },

    // List Skeleton
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        marginBottom: Spacing.xs,
    },
    listBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: Spacing.sm,
    },
    listText: {
        flex: 1,
        height: 14,
    },

    // Profile Skeleton
    profileContainer: {
        alignItems: 'center',
        padding: Spacing.lg,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: Spacing.md,
    },
    profileInfo: {
        alignItems: 'center',
        width: '100%',
    },
    profileName: {
        width: 150,
        height: 20,
        marginBottom: Spacing.sm,
    },
    profileBio: {
        width: 200,
        height: 12,
        marginBottom: Spacing.xs,
    },

    // Header Skeleton
    headerContainer: {
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
    },
    headerTitle: {
        width: 180,
        height: 28,
        marginBottom: Spacing.sm,
    },
    headerSubtitle: {
        width: 240,
        height: 14,
    },

    // Grid Skeleton
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: Spacing.md,
    },
    gridItem: {
        width: (width - Spacing.md * 4) / 3,
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    gridIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginBottom: Spacing.xs,
    },
    gridLabel: {
        width: 60,
        height: 10,
    },
});
