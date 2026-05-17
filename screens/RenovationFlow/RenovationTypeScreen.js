import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { RENOVATION_TYPES } from '../../data/renovationChecklists';
import { Spacing, Typography, BorderRadius, Shadows, Colors, Components } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function RenovationTypeScreen({ navigation }) {
    const { t } = useTranslation('common');
    const handleSelect = (type) => {
        navigation.navigate('ChecklistReforma', { renovationType: type });
    };

    const options = [
        { key: RENOVATION_TYPES.HOME, title: 'Casa / Apartamento', icon: 'home' },
        { key: RENOVATION_TYPES.BUILDING, title: 'Prédio / Condomínio', icon: 'business' },
        { key: RENOVATION_TYPES.RURAL, title: 'Sítio / Área Rural', icon: 'leaf' },
    ];

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>

                <Text style={styles.title}>{t('headersFirst.tipoDeReforma', 'Tipo de Reforma')}</Text>
                <Text style={styles.subtitle}>{t('headersFirst.ondeAObraEstAcontecendo', 'Onde a obra está acontecendo?')}</Text>

                <View style={styles.grid}>
                    {options.map(opt => (
                        <TouchableOpacity key={opt.key} style={styles.card} onPress={() => handleSelect(opt.key)}>
                            <View style={styles.iconWrap}>
                                <NeoIcon name={opt.icon} size={28} color={Neo.colors.neutral.white} />
                            </View>
                            <View style={styles.cardBody}>
                                <Text style={styles.cardTitle}>{opt.title}</Text>
                            </View>
                            <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[400]} />
                        </TouchableOpacity>
                    ))}
                </View>

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
    card: {
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        ...Shadows.sm,
    },
    iconWrap: {
        width: 50,
        height: 50,
        borderRadius: BorderRadius.md,
        backgroundColor: Neo.colors.feedback.warning,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    cardBody: { flex: 1 },
    cardTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Neo.colors.neutral[900] },
});


