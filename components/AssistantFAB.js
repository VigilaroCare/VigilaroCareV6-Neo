/**
 * AssistantFAB.js
 * Botão flutuante inteligente para o Assistente de Prevenção.
 * Vigilaro Care V5
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Shadows, BorderRadius } from '../utils/Theme';


import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AssistantFAB({ onPress }) {
    const insets = useSafeAreaInsets();

    return (
        <TouchableOpacity
            style={[styles.container, { bottom: 100 + insets.bottom }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <NeoIcon name="Camera" size={28} color={Colors.white} />
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>IA</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Colors.primary, // Blue Serenity
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.lg,
        elevation: 8,
        zIndex: 999,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        bottom: -8,
        backgroundColor: Colors.secondary, // Use secondary color for contrast
        paddingHorizontal: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.primary,
    },
    badgeText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
});
