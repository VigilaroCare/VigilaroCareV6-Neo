import { tx } from '../utils/txFixo';
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Shadows, BorderRadius } from "../utils/Theme";
import { DS as Neo } from '../utils/DesignSystem2026';

const { width } = Dimensions.get('window');

export default function AchievementToast({ visible, data, onHide }) {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible && data) {
            // Show
            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: 50, // Top offset
                    useNativeDriver: true,
                    friction: 6,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            // Hide after delay
            const timer = setTimeout(() => {
                hide();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [visible, data]);

    const hide = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide) onHide();
        });
    };

    if (!data) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.iconContainer}>
                <Text style={styles.emoji}>{data.levelUp ? '🏆' : '⭐'}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    {data.levelUp ? tx('telas.AchievementToast.novoNivel', 'Novo Nível!') : `+${data.xpGained} XP`}
                </Text>
                <Text style={styles.message}>
                    {data.levelUp
                        ? `Você agora é ${data.newLevel.name}!`
                        : data.actionLabel}
                </Text>
            </View>
            <View style={styles.badge}>
                <NeoIcon name="Flash" size={12} color="#FFF" />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        zIndex: 9999,
        ...Shadows.lg,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Neo.colors.accent.champagneSubtle, // was #FFFBEB
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    emoji: {
        fontSize: 24,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    message: {
        fontSize: 13,
        color: Colors.textSecondary,
    },
    badge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: Colors.warning,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
