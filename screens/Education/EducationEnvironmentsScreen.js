
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Home, People, MagicStar, Briefcase, Sun1, RouteSquare, ArrowRight2 } from 'iconsax-react-native'; // Standard icons
import { Shadows } from '../../utils/Theme';
import {
    EDUCATIONAL_GUIDES,
    LISTA_CONVIVENCIA,
    LISTA_INTIMA,
    LISTA_SERVICOS,
    LISTA_LAZER,
    LISTA_CIRCULACAO
} from '../../data/educational_guides';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';

export default function EducationEnvironmentsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const THEME_COLOR = '#FF9800'; // Orange

    const renderCard = (id) => {
        const item = EDUCATIONAL_GUIDES ? EDUCATIONAL_GUIDES[id] : null;
        if (!item) return null;

        return (
            <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate('EnvironmentGuideNeo', { ambienteId: id })}
                activeOpacity={0.8}
            >
                <NeoCard variant="glass" style={styles.listCard}>
                    <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                        <NeoIcon name={item.iconName} size={26} color={item.color} variant="Bold" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{item.label}</Text>
                        <Text style={styles.cardDesc}>{t('envScreens.preventionGuide', 'Guia de prevenção')}</Text>
                    </View>
                    <View style={styles.chevronBox}>
                        <ArrowRight2 size={20} color={Neo.colors.neutral[400]} />
                    </View>
                </NeoCard>
            </TouchableOpacity>
        );
    };

    const renderSection = (title, IconComp, color, list) => (
        <View style={styles.sectionContainer} key={title}>
            <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconBg, { backgroundColor: color + '25' }]}>
                    <IconComp size={20} color={color} variant="Bold" />
                </View>
                <H3 style={{ color: Neo.colors.neutral[800] }}>{title}</H3>
            </View>
            <View style={styles.listContainer}>
                {list.map(renderCard)}
            </View>
        </View>
    );

    return (
        <AppBackground>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Header Standardized */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2 style={{ color: Neo.colors.neutral[900] }}>{t('envScreens.title', 'Riscos e Orientações por Ambiente')}</H2>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {renderSection(t('envScreens.living', 'Convivência e Estar'), People, '#FF9800', LISTA_CONVIVENCIA)}
                    {renderSection(t('envScreens.rest', 'Área de Descanso'), MagicStar, '#673AB7', LISTA_INTIMA)}
                    {renderSection(t('envScreens.services', 'Serviços e Utilidades'), Briefcase, '#607D8B', LISTA_SERVICOS)}
                    {renderSection(t('envScreens.leisure', 'Lazer e Exterior'), Sun1, '#4CAF50', LISTA_LAZER)}
                    {renderSection(t('envScreens.circulation', 'Circulação e Acessos'), RouteSquare, '#F44336', LISTA_CIRCULACAO)}

                </ScrollView>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: 'rgba(255,255,255,0.4)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    content: { padding: 24, paddingBottom: 120 },

    sectionContainer: { marginBottom: 32 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    sectionIconBg: {
        width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 12,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
    },

    listContainer: { flexDirection: 'column', gap: 12 },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 4,
    },
    iconContainer: {
        width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 16
    },
    textContainer: { flex: 1, justifyContent: 'center' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: Neo.colors.neutral[900], marginBottom: 4 },
    cardDesc: { fontSize: 13, color: Neo.colors.neutral[500] },
    chevronBox: {
        width: 32, height: 32, borderRadius: 16, backgroundColor: Neo.colors.neutral[100],
        justifyContent: 'center', alignItems: 'center', marginLeft: 12
    }
});
