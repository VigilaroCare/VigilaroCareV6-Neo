
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import NeoIcon from './NeoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../utils/Theme';
import { useNavigation } from '@react-navigation/native';
import ProfileService from '../services/ProfileService';
import GamificationService from '../services/GamificationService';

export default function MedicationWidget({ refreshTrigger }) {
    const navigation = useNavigation();
    const [nextMed, setNextMed] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNextMedication();
    }, [refreshTrigger]);

    const loadNextMedication = async () => {
        try {
            const saved = await AsyncStorage.getItem('@medications_timeline');
            if (saved) {
                const meds = JSON.parse(saved);
                const now = new Date();
                const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

                // Filtra medicamentos não tomados de hoje
                // Ordena por horário
                // Pega o primeiro que horário >= agora OU o primeiro não tomado (mesmo atrasado)

                const pending = meds.filter(m => !m.taken).sort((a, b) => a.time.localeCompare(b.time));

                if (pending.length > 0) {
                    setNextMed(pending[0]);
                } else {
                    setNextMed(null);
                }
            }
        } catch (error) {
            console.error('Widget Load Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (med) => {
        try {
            // 1. Update List
            const saved = await AsyncStorage.getItem('@medications_timeline');
            if (saved) {
                const meds = JSON.parse(saved);
                const updated = meds.map(m => m.id === med.id ? { ...m, taken: true } : m);
                await AsyncStorage.setItem('@medications_timeline', JSON.stringify(updated));

                // 2. Add History Log
                // Implementation pending in full service, mostly UI feedback here
            }

            // 3. Gamification
            await GamificationService.addPoints('MEDICATION_TAKEN');

            // 4. Refresh
            await loadNextMedication();
            Alert.alert("Sucesso", "Medicamento registrado! +10 XP");
        } catch (e) {
            console.error("Check Error", e);
        }
    };

    if (loading || !nextMed) {
        // Empty state is small/hidden or encourages adding
        return (
            <TouchableOpacity
                style={styles.emptyContainer}
                onPress={() => navigation.navigate('Medications')}
            >
                <View style={styles.iconCircle}>
                    <NeoIcon name="Health" size={20} color={Colors.primary} />
                </View>
                <View>
                    <Text style={styles.emptyTitle}>Hora do Remédio</Text>
                    <Text style={styles.emptySubtitle}>Toque para adicionar</Text>
                </View>
                <NeoIcon name="AddCircle" size={24} color={Colors.primary} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
        );
    }

    // Determine Status Color
    // Simple logic: if time < now, it's LATE (Red). Else, it's UPCOMING (Blue/Orange).
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const isLate = nextMed.time < currentTime;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>💊 Próximo Medicamento</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Medications')}>
                    <Text style={styles.seeAll}>Ver todos</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.card, isLate && styles.cardLate]}>
                <View style={styles.infoCol}>
                    <Text style={[styles.medName, isLate && styles.textLate]} numberOfLines={1}>
                        {nextMed.name}
                    </Text>
                    <View style={styles.metaRow}>
                        <NeoIcon name="Clock" size={14} color={isLate ? Colors.error : Colors.textSecondary} />
                        <Text style={[styles.timeText, isLate && styles.textLate]}>
                            {nextMed.time} {isLate ? '(Atrasado)' : ''}
                        </Text>
                        {nextMed.dosage && (
                            <>
                                <Text style={styles.dot}>•</Text>
                                <Text style={styles.dosageText}>{nextMed.dosage}</Text>
                            </>
                        )}
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.checkBtn, isLate && styles.checkBtnLate]}
                    onPress={() => handleCheck(nextMed)}
                >
                    <NeoIcon name="TickSquare" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    emptyContainer: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        ...Shadows.sm,
        marginBottom: Spacing.md,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: Typography.sizes.sm,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    emptySubtitle: {
        fontSize: Typography.sizes.xs,
        color: Colors.textTertiary,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
        paddingHorizontal: Spacing.xs,
    },
    title: {
        fontSize: Typography.sizes.md,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    seeAll: {
        fontSize: Typography.sizes.sm,
        color: Colors.primary,
        fontWeight: '600',
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        ...Shadows.sm,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    cardLate: {
        borderLeftColor: Colors.error,
        backgroundColor: '#FFEBEE',
    },
    infoCol: {
        flex: 1,
    },
    medName: {
        fontSize: Typography.sizes.md,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 4,
    },
    textLate: {
        color: Colors.error,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    timeText: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    dot: {
        color: Colors.textTertiary,
        fontSize: 10,
    },
    dosageText: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
    },
    checkBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.success,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Spacing.md,
        ...Shadows.md,
    },
    checkBtnLate: {
        backgroundColor: Colors.error, // Urgent action needed
    }
});
