import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoHorizontalCard from '../components/NeoHorizontalCard';
import NeoIcon from '../components/NeoIcon';
import { H1, Caption } from '../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function CuidarProtegerHubScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textBody = themeColors.neutral[700];

    const contextItems = [
        { id: 'ambientes',       titulo: t('knowledgeHub.envPrevention', 'Segurança por Ambiente'),  iconName: 'Home2',      cor: '#F59E0B', route: 'EducationEnvironments' },
        { id: 'mentes_atipicas', titulo: t('knowledgeHub.neurodivergence', 'Lar Neurodiverso'), iconName: 'Activity', cor: '#8B5CF6', route: 'NeurodivergenceMenu' },
        { id: 'pets',            titulo: t('knowledgeHub.protectPet', 'Proteção para Pets'),     iconName: 'ProtejaPet', cor: '#EC4899', route: 'PetsMenu' },
        { id: 'seguranca_idade', titulo: t('knowledgeHub.ageCare', 'Segurança 60+'),        iconName: 'TrendUp',    cor: '#0EA5E9', route: 'FasesVidaMenu' },
        { id: 'gestante_segura', titulo: t('knowledgeHub.pregnancyCare', 'Gestante Segura'),  iconName: 'Woman',      cor: '#E91E63', route: 'GenericCategory', params: { categoryId: 'gestante_segura' } },
        { id: 'brinquedos_hub',  titulo: t('knowledgeHub.toyGuide', 'Guia de Brinquedos'),       iconName: 'MagicStar',  cor: '#D97706', route: 'GenericCategory', params: { categoryId: 'brinquedos' } },
    ];

    const itemDescriptions = {
        'ambientes': t('cuidarProteger.descAmbientes', 'Prevenção de acidentes e riscos fatiados por cada cômodo da sua casa.'),
        'mentes_atipicas': t('cuidarProteger.descMentesAtipicas', 'Segurança inclusiva e adaptação do lar para perfis neurodivergentes.'),
        'pets': t('cuidarProteger.descPets', 'Plantas tóxicas, alimentos proibidos e adaptação de ambientes para animais.'),
        'seguranca_idade': t('cuidarProteger.descSegurancaIdade', 'Adaptações cruciais para a segurança e independência da terceira idade.'),
        'gestante_segura': t('cuidarProteger.descGestanteSegura', 'Cuidados estruturais e de hábitos para a segurança durante a gestação.'),
        'brinquedos_hub': t('cuidarProteger.descBrinquedosHub', 'Guia sobre classificação etária, riscos de engasgo e brinquedos perigosos.')
    };

    const handlePress = (item) => {
        navigation.navigate(item.route, item.params || {});
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(28,28,30,0.75)' : 'rgba(255,255,255,0.75)' }]}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={textBody} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={styles.title}>{t('cuidarProteger.headerTitle', 'Cuidar & Proteger')}</H1>
                        <Caption style={styles.subtitle}>{t('cuidarProteger.headerSubtitle', 'Adaptação ativa e segurança para todos')}</Caption>
                    </View>
                </View>

                {/* CONTENT */}
                <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
                    <Caption style={{ marginBottom: 24, fontSize: 16 }}>{t('cuidarProteger.description', 'Personalize e adapte a sua casa de acordo com o perfil de quem mora ou visita o seu lar.')}</Caption>
                    
                    {contextItems.map((item, index) => (
                        <NeoHorizontalCard
                            key={item.id}
                            title={item.titulo}
                            description={itemDescriptions[item.id]}
                            iconName={item.iconName}
                            color={item.cor}
                            onPress={() => handlePress(item)}
                        />
                    ))}
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    subtitle: {
        fontSize: 14,
        marginTop: 2,
    }
});
