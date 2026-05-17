import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { VISIT_TYPES } from '../../data/visitChecklists';
import { Spacing, Typography, BorderRadius, Shadows, Colors, Components } from '../../utils/Theme';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';

export default function VisitTypeScreen({ navigation }) {
    const { t } = useTranslation('common');
    const handleSelect = (type) => {
        navigation.navigate('VisitRiskForm', { visitType: type });
    };

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>

                <Text style={styles.title}>{t('headersFirst.tipoDeVisita', 'Tipo de Visita')}</Text>
                <Text style={styles.subtitle}>{t('headersFirst.vocEstRecebendoAlguMOuIndoVisitar', 'Você está recebendo alguém ou indo visitar?')}</Text>

                <TouchableOpacity style={styles.card} onPress={() => handleSelect(VISIT_TYPES.RECEIVING)}>
                    <View style={[styles.iconWrap, { backgroundColor: Neo.colors.primary[500] }]}>
                        <NeoIcon name="Home2" size={32} color={Neo.colors.neutral.white} />
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{t('headersFirst.recebendoVisita', 'Recebendo Visita')}</Text>
                        <Text style={styles.cardSub}>{t('headersFirst.prepararMinhaCasaParaConvidados', 'Preparar minha casa para convidados')}</Text>
                    </View>
                    <NeoIcon name="ArrowRight2" size={24} color={Neo.colors.neutral[400]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => handleSelect(VISIT_TYPES.VISITING)}>
                    <View style={[styles.iconWrap, { backgroundColor: Neo.colors.secondary[500] }]}>
                        <NeoIcon name="Routing" size={32} color={Neo.colors.neutral.white} />
                    </View>
                    <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{t('headersFirst.indoVisitar', 'Indo Visitar')}</Text>
                        <Text style={styles.cardSub}>{t('headersFirst.cuidadosAoIrNaCasaDeOutros', 'Cuidados ao ir na casa de outros')}</Text>
                    </View>
                    <NeoIcon name="ArrowRight2" size={24} color={Neo.colors.neutral[400]} />
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
        width: 60,
        height: 60,
        borderRadius: BorderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    cardBody: { flex: 1 },
    cardTitle: { fontSize: Typography.sizes.lg, fontWeight: Typography.weights.bold, color: Neo.colors.neutral[900] },
    cardSub: { fontSize: Typography.sizes.sm, color: Neo.colors.neutral[600], marginTop: Spacing.xs },
});


