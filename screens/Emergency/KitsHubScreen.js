import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import NeoIcon from '../../components/NeoIcon';
import { useNavigation } from '@react-navigation/native';
import { Colors, Shadows } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';

const { width } = Dimensions.get('window');
const CARD_GAP = 16;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2; // 2 columns

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function KitsHubScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');

    const kits = [
        {
            id: 'socorros',
            title: 'Primeiros Socorros',
            subtitle: 'Curativos e itens básicos',
            icon: 'medkit',
            color: '#EF5350',
            route: 'KitPrimeirosSocorros'
        },
        {
            id: 'remedios',
            title: 'Farmácia em Casa',
            subtitle: 'Controle de remédios',
            icon: 'bandage',
            color: '#42A5F5',
            route: 'KitRemedios'
        },
        {
            id: 'emergencia',
            title: 'Kit de Emergência',
            subtitle: 'Sobrevivência 72h',
            icon: 'briefcase',
            color: '#AB47BC',
            route: 'KitEmergencia'
        },
        {
            id: 'ferramentas',
            title: 'Ferramentas',
            subtitle: 'Manutenção básica',
            icon: 'hammer',
            color: '#FF7043',
            route: 'KitFerramentas'
        },
        {
            id: 'epis',
            title: 'EPIs',
            subtitle: 'Equipamentos de Proteção',
            icon: 'shield',
            color: '#FFCA28',
            route: 'KitEPIs'
        }
    ];

    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
                {/* Header Standardized - Centered */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContainer}>
                        <H2 style={{ color: Neo.colors.neutral[900] }}>{t('headersFirst.rescueKits', 'Kits de Socorro')}</H2>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Intro Card */}
                    <View style={styles.introCard}>
                        <H3 style={styles.introTitle}>{t('headersFirst.whyPrepare', 'Por que se preparar?')}</H3>
                        <Body style={styles.introText}>
                            {t('headersFirst.terOsKitsCertosEProntosEMOTransformaOCao', 'Ter os kits certos e prontos e à mão, transforma o caos em controle protegendo sua familia.')}
                        </Body>
                    </View>
                    <View style={styles.listContainer}>
                        {/* Render Kit Item Function Inlining for simplicity if it was causing issues, or just define it here */}
                        {kits.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => navigation.navigate(item.route)}
                                activeOpacity={0.9}
                                style={{ marginBottom: 12 }}
                            >
                                <NeoCard variant="glass" style={styles.kitCard}>
                                    <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                        <NeoIcon name={item.icon} size={28} color={item.color} />
                                    </View>

                                    <View style={styles.textContainer}>
                                        <Body style={styles.kitTitle}>{item.title}</Body>
                                        <Small style={styles.kitSubtitle}>{item.items ? item.items.length : 0} itens</Small>
                                    </View>

                                    <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[400]} />
                                </NeoCard>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Dica */}
                    <NeoCard variant="glass" style={styles.tipCard}>
                        <NeoIcon name="LampOn" size={24} color={Neo.colors.feedback.warning} />
                        <Body style={styles.tipText}>
                            {t('headersFirst.mantenhaSeusKitsSempreAtualizadosEVerifi', 'Mantenha seus kits sempre atualizados e verifique a validade dos itens a cada 6 meses.')}
                        </Body>
                    </NeoCard>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
    },
    backBtn: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20,
        paddingBottom: 100, // Extra padding for safe scrolling
    },
    listContainer: {
        flexDirection: 'column',
    },
    tipText: {
        flex: 1,
        color: Neo.colors.neutral[800],
        lineHeight: 20,
    },
    kitCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    kitTitle: {
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 4,
    },
    kitSubtitle: {
        color: Neo.colors.neutral[500],
    },
    tipCard: {
        marginTop: 32,
        // backgroundColor: '#FFF9C4', // Replaced by GlassCard tint
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20,
    },
    tipText: {
        flex: 1,
        color: Neo.colors.neutral[800],
        lineHeight: 18,
    },
    introCard: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        borderLeftWidth: 4,
        borderLeftColor: Neo.colors.primary[500],
    },
    introTitle: {
        color: Neo.colors.neutral[900],
        marginBottom: 8,
    },
    introText: {
        color: Neo.colors.neutral[700],
        lineHeight: 20,
    },
});
