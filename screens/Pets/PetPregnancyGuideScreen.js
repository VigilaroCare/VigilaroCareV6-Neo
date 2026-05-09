/**
 * PetPregnancyGuideScreen.js
 * Guia Educativo sobre Prenhez e Ninhadas de Pets
 * Vigilaro Care V6
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { PET_PREGNANCY_DATA } from '../../data/pet_pregnancy_data';
import { useTranslation } from 'react-i18next';
import { t_field } from '../../utils/getLocalizedField';

export default function PetPregnancyGuideScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const sections = PET_PREGNANCY_DATA.sections;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>{t('petPregnancy.title', 'Prenhez e Ninhadas')}</Text>
                    <Text style={styles.headerSubtitle}>{t('petPregnancy.subtitle', 'Guia completo para cuidar da mamãe e filhotes')}</Text>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Alerta Importante */}
                <NeoCard variant="elevated" style={styles.alertCard}>
                    <View style={styles.alertHeader}>
                        <NeoIcon name="InfoCircle" size={24} color="#2196F3" />
                        <Text style={styles.alertTitle}>{t('petPregnancy.importantTitle', 'Importante')}</Text>
                    </View>
                    <Text style={styles.alertText}>
                        {t('petPregnancy.importantText', 'Este guia é informativo. Sempre consulte um veterinário para acompanhamento adequado da gestação e parto.')}
                    </Text>
                </NeoCard>

                {/* Seções */}
                {sections.map((section) => (
                    <NeoCard variant="elevated" key={section.id} style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.iconBox, { backgroundColor: section.color + '20' }]}>
                                <NeoIcon name={section.icon} size={24} color={section.color} />
                            </View>
                            <Text style={styles.sectionTitle}>{t_field(section, 'title')}</Text>
                        </View>

                        <View style={styles.itemsList}>
                            {section.items.map((item, index) => (
                                <View key={index} style={styles.item}>
                                    <View style={[styles.bullet, { backgroundColor: section.color }]} />
                                    <Text style={styles.itemText}>{t_field(item, 'text')}</Text>
                                </View>
                            ))}
                        </View>
                    </NeoCard>
                ))}

                {/* Dica Final */}
                <NeoCard variant="elevated" style={styles.tipCard}>
                    <View style={styles.tipHeader}>
                        <NeoIcon name="LampOn" size={20} color="#FF9800" />
                        <Text style={styles.tipTitle}>{t('petPregnancy.tipTitle', 'Dica Importante')}</Text>
                    </View>
                    <Text style={styles.tipText}>
                        {t('petPregnancy.tipText', 'A castração é a forma mais eficaz de prevenir gestações indesejadas e contribui para a saúde do seu pet. Converse com seu veterinário sobre o melhor momento para realizar o procedimento.')}
                    </Text>
                </NeoCard>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
    },
    header: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: Neo.spacing.md,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[200],
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginBottom: 8,
    },
    headerContent: {},
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Neo.colors.neutral[600],
    },
    content: {
        flex: 1,
        padding: Neo.spacing.lg,
    },
    alertCard: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    alertText: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
    },
    sectionCard: {
        padding: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        flex: 1,
    },
    itemsList: {
        gap: 12,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginTop: 6,
    },
    itemText: {
        flex: 1,
        fontSize: 14,
        color: Neo.colors.neutral[700],
        lineHeight: 20,
    },
    tipCard: {
        padding: 16,
        backgroundColor: '#FFF8E1',
        borderLeftWidth: 4,
        borderLeftColor: '#FF9800',
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F57C00',
    },
    tipText: {
        fontSize: 14,
        color: '#424242',
        lineHeight: 20,
    },
});
