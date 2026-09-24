import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { RISK_GROUPS } from '../../data/visitChecklists';
import { Spacing, Typography, BorderRadius, Shadows } from "../../utils/Theme";
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function VisitRiskFormScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const { visitType } = route.params;
    const [selectedRisks, setSelectedRisks] = useState({});

    const toggleRisk = (id) => {
        setSelectedRisks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleContinue = () => {
        navigation.navigate('ChecklistVisit', { visitType, selectedRisks });
    };

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>

                <Text style={styles.title}>{t('headersFirst.fatoresDeRisco', 'Fatores de Risco')}</Text>
                <Text style={styles.subtitle}>{t('headersFirst.selecioneQuemEstarPresenteNestaVisita', 'Quem vai estar nesta visita?')}</Text>

                <View style={styles.list}>
                    {RISK_GROUPS.map(risk => (
                        <View key={risk.id} style={styles.row}>
                            <View style={styles.rowInfo}>
                                <View style={styles.iconBox}>
                                    <NeoIcon name={risk.icon} size={20} color={Neo.colors.neutral[600]} />
                                </View>
                                <Text style={styles.label}>{risk.label}</Text>
                            </View>
                            <Switch
                                value={!!selectedRisks[risk.id]}
                                onValueChange={() => toggleRisk(risk.id)}
                                trackColor={{ false: Neo.colors.neutral[200], true: Neo.colors.primary[500] }}
                                thumbColor={Neo.colors.neutral.white}
                            />
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>{t('headersFirst.gerarChecklist', 'Gerar Checklist')}</Text>
                    <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral.white} style={{ marginLeft: Spacing.sm }} />
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    inner: { padding: Spacing.lg },
    backButton: { marginBottom: Spacing.lg },
    title: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Neo.colors.neutral[900], marginBottom: Spacing.sm },
    subtitle: { fontSize: Typography.sizes.md, color: Neo.colors.neutral[600], marginBottom: Spacing.xl },
    list: { backgroundColor: Neo.colors.neutral.white, borderRadius: BorderRadius.lg, padding: Spacing.sm, ...Shadows.sm },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    rowInfo: { flexDirection: 'row', alignItems: 'center' },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: BorderRadius.sm,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    label: { fontSize: Typography.sizes.md, color: Neo.colors.neutral[900], fontWeight: Typography.weights.medium },
    button: {
        marginTop: Spacing.xl,
        backgroundColor: Neo.colors.primary[500],
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.sm,
    },
    buttonText: { color: Neo.colors.neutral.white, fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold },
});


