import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { Colors, Spacing, Typography, BorderRadius, Shadows, Components } from '../../utils/Theme';
import { PET_WELLNESS_DATA } from '../../data/pet_wellness_data';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';

export default function PetWellnessScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');

    const renderCategory = ({ item }) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <View style={[styles.iconCircle, { backgroundColor: item.cor + '15' }]}>
                    <NeoIcon name={item.icone} size={24} color={item.cor} />
                </View>
                <Text style={styles.sectionTitle}>{t_field(item, 'titulo')}</Text>
            </View>
            
            <View style={styles.tipsContainer}>
                {item.dicas.map((dica, index) => (
                    <View key={index} style={styles.tipCard}>
                        <View style={[styles.petBadge, { borderColor: item.cor }]}>
                            <Text style={[styles.petBadgeText, { color: item.cor }]}>{t_field(dica, 'pet')}</Text>
                        </View>
                        <Text style={styles.tipText}>{t_field(dica, 'texto')}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('petWellness.title', 'Hub de Bem-Estar')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('petWellness.subtitle', 'Cuidados diários para uma vida longa e feliz')}</Text>
                    </View>
                </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.infoBox}>
                    <NeoIcon name="Heart" size={24} color="#4CAF50" />
                    <Text style={styles.infoText}>
                        {t('petWellness.introText', 'A prevenção é a melhor forma de amor. Pequenos ajustes na rotina podem evitar grandes emergências no futuro.')}
                    </Text>
                </View>

                {PET_WELLNESS_DATA.categorias.map((item) => (
                    <View key={item.id}>
                        {renderCategory({ item })}
                    </View>
                ))}
                
                <View style={{ height: 120 }} />
            </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
        paddingTop: 10,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        ...Shadows.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    headerTitle: {
        fontSize: Typography.sizes.xl,
        fontWeight: 'bold',
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: Typography.sizes.sm,
        color: 'rgba(255,255,255,0.9)',
        marginTop: 4,
    },
    content: {
        padding: Spacing.lg,
        paddingBottom: 120,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E8F5E9',
        padding: Spacing.md,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    infoText: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: Typography.sizes.sm,
        color: '#2E7D32',
        lineHeight: 20,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    tipsContainer: {
        gap: 12,
    },
    tipCard: {
        backgroundColor: '#FFF',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        ...Shadows.sm,
        borderLeftWidth: 3,
        borderLeftColor: '#E0E0E0',
    },
    petBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 8,
    },
    petBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tipText: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        lineHeight: 22,
    },
});
