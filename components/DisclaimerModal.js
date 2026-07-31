import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import NeoIcon from './NeoIcon';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../utils/Theme';
import { DS as Neo } from '../utils/DesignSystem2026';
import { getMedicalLabel, getPoisonControlLabel } from '../utils/emergencyTokens';

export default function DisclaimerModal({ visible, onClose }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <NeoIcon name="Warning2" size={32} color="#F59E0B" />
                        <Text style={styles.title}>Aviso Importante</Text>
                    </View>

                    <ScrollView style={styles.body}>
                        <Text style={styles.text}>
                            O conteúdo deste aplicativo (Vigilaro Care) tem caráter puramente <Text style={styles.bold}>informativo e educativo</Text>.
                        </Text>
                        <Text style={styles.text}>
                            Ele <Text style={styles.bold}>NÃO substitui</Text> o aconselhamento, diagnóstico ou tratamento médico profissional.
                        </Text>
                        <Text style={styles.text}>
                            Em caso de emergência médica, ligue imediatamente para o <Text style={styles.bold}>{getMedicalLabel()}</Text>.
                        </Text>
                        <Text style={styles.text}>
                            Para casos de intoxicação, contate o <Text style={styles.bold}>{getPoisonControlLabel()}</Text>.
                        </Text>
                    </ScrollView>

                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Entendi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        padding: Spacing.lg,
    },
    modalContent: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        ...Shadows.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    title: {
        fontSize: Typography.sizes.xl,
        fontFamily: Typography.fontFamily.bold,
        color: Colors.textPrimary,
        marginTop: Spacing.sm,
    },
    body: {
        maxHeight: 300,
    },
    text: {
        fontSize: Typography.sizes.md,
        color: Colors.textSecondary,
        marginBottom: Spacing.md,
        lineHeight: 22,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: BorderRadius.md,
        alignItems: 'center',
        marginTop: Spacing.md,
    },
    buttonText: {
        color: Neo.colors.neutral.white,
        fontWeight: 'bold',
        fontSize: Typography.sizes.md,
    },
});
