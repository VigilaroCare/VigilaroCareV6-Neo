import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import { KITS_EDUCATIONAL_CONTENT } from '../../data/kits/educational_content';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import PetHeroBanner from '../../components/PetHeroBanner';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { t_field } from '../../utils/getLocalizedField';

const { width } = Dimensions.get('window');
const SPACING = 12; // Reduced from 16
const SCREEN_PADDING = 16; // Reduced from 24
const CARD_WIDTH = (width - (SCREEN_PADDING * 2) - SPACING) / 2;

export default function GuiaKitsEmergenciaScreen({ navigation, route }) {
    const { t, i18n } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const THEME_COLOR = '#8B5CF6'; // Violet
    const petHero = route?.params?.petHero;

    const MENU_ITEMS = [
        {
            id: 'epis',
            title: 'EPIs',
            title_en: 'PPE',
            title_es: 'EPIs',
            subtitle: 'Equipamentos de Proteção Individual',
            subtitle_en: 'Personal Protective Equipment',
            subtitle_es: 'Equipos de Protección Individual',
            iconName: 'ShieldTick',
            color: '#F59E0B',
            checklistRoute: 'KitsMenu'
        },
        {
            id: 'first_aid',
            title: 'Kit de Primeiros Socorros',
            title_en: 'First Aid Kit',
            title_es: 'Kit de Primeros Auxilios',
            subtitle: 'Itens Essenciais',
            subtitle_en: 'Essential Items',
            subtitle_es: 'Artículos Esenciales',
            iconName: 'Health',
            color: '#EF4444',
            checklistRoute: 'KitsMenu'
        },
        {
            id: 'tools',
            title: 'Caixa de Ferramentas',
            title_en: 'Toolbox',
            title_es: 'Caja de Herramientas',
            subtitle: 'Manutenção Segura',
            subtitle_en: 'Safe Maintenance',
            subtitle_es: 'Mantenimiento Seguro',
            iconName: 'ArchiveBox',
            color: '#607D8B',
            checklistRoute: 'KitsMenu'
        },
        {
            id: 'emergency_support',
            title: 'Utilidades de Apoio',
            title_en: 'Support Utilities',
            title_es: 'Utilidades de Apoyo',
            subtitle: 'Luz e Comunicação',
            subtitle_en: 'Light & Communication',
            subtitle_es: 'Luz y Comunicación',
            iconName: 'Lamp',
            color: '#8B5CF6',
            checklistRoute: 'KitsMenu'
        },
        {
            id: 'farmacinha',
            title: 'Kit de Medicamentos',
            title_en: 'Medication Kit',
            title_es: 'Kit de Medicamentos',
            subtitle: 'Farmácia Caseira',
            subtitle_en: 'Home Pharmacy',
            subtitle_es: 'Farmacia Casera',
            iconName: 'Heart',
            color: '#10B981',
            checklistRoute: 'KitsMenu'
        },
        {
            id: 'pet',
            title: 'Kit Pet',
            title_en: 'Pet Kit',
            title_es: 'Kit Mascotas',
            subtitle: 'Prevenção e Emergência',
            subtitle_en: 'Prevention & Emergency',
            subtitle_es: 'Prevención y Emergencia',
            iconName: 'Star',
            color: '#F43F5E',
            checklistRoute: 'KitsMenu'
        },
    ];

    const handlePress = (item) => {
        const rawContent = KITS_EDUCATIONAL_CONTENT[item.id] || {};
        const { icon: junkIcon, sections, description, ...restContent } = rawContent;

        const formatSections = (desc, secs) => {
            let res = desc || '';
            if (Array.isArray(secs)) {
                secs.forEach(sec => {
                    res += `\n\n🔹 ${sec.title.toUpperCase()}`;
                    if (Array.isArray(sec.content)) {
                        res += '\n' + sec.content.map(c => `• ${c}`).join('\n');
                    } else {
                        res += '\n' + sec.content;
                    }
                });
            }
            return res;
        };

        const adaptedDescription = formatSections(description, sections);
        const adaptedDescriptionEn = formatSections(rawContent.description_en, rawContent.sections_en || sections);
        const adaptedDescriptionEs = formatSections(rawContent.description_es, rawContent.sections_es || sections);
        const adaptedDescriptionPtPt = formatSections(rawContent.description_ptpt, rawContent.sections_ptpt || sections);

        const adaptedContent = {
            titulo: item.title,
            titulo_en: item.title_en || restContent.title_en,
            titulo_es: item.title_es || restContent.title_es,
            titulo_ptpt: item.title_ptpt || restContent.title_ptpt,
            subtitulo: item.subtitle,
            subtitulo_en: item.subtitle_en,
            subtitulo_es: item.subtitle_es,
            subtitulo_ptpt: item.subtitle_ptpt,
            icon: item.iconName,
            iconColor: item.color,
            bg: item.color + '15',
            definicao: adaptedDescription,
            definicao_en: adaptedDescriptionEn,
            definicao_es: adaptedDescriptionEs,
            definicao_ptpt: adaptedDescriptionPtPt,
            comoIdentificar: [],
            comoEvitar: [],
            ...restContent
        };

        navigation.navigate('ConceitoDetail', {
            conceito: adaptedContent
        });
    };

    return (
        <AppBackground>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header Standardized */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                    >
                        <NeoIcon name="ArrowLeft" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H2 style={{ color: Neo.colors.neutral[900] }}>
                            {t('headersFirst.guiaDeKits', 'Guia de Kits')}
                        </H2>
                        <Body style={{ color: Neo.colors.neutral[500] }}>
                            {t('headersFirst.estejaPreparadoQuandoPrecisar', 'Esteja preparado quando precisar.')}
                        </Body>
                    </View>
                </View>

                {/* Grid Layout */}
                <ScrollView contentContainerStyle={{ padding: SCREEN_PADDING, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                    {/* Hero banner — imagem do card de origem (se vier de PetsMenu) */}
                    {petHero && (
                        <PetHeroBanner
                            image={petHero.imagem}
                            imageUrl={petHero.imagemUrl}
                            tint={petHero.cor || THEME_COLOR}
                            resizeMode={petHero.resizeMode || 'cover'}
                            accessibilityLabel={petHero.titulo}
                            marginHorizontal={0}
                            marginBottom={14}
                        />
                    )}
                    <View style={styles.gridContainer}>
                        {MENU_ITEMS.map((item) => {
                            const iconName = item.iconName || 'EmojiHappy';
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={{ width: CARD_WIDTH, marginBottom: SPACING }}
                                    onPress={() => handlePress(item)}
                                    activeOpacity={0.8}
                                >
                                    <NeoCard variant="glass" style={styles.card}>
                                        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                                            <NeoIcon name={iconName} size={28} color={item.color} variant="Bold" />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Body style={styles.cardTitle} numberOfLines={2}>{t_field(item, 'title')}</Body>
                                            <Small style={styles.cardDesc} numberOfLines={2}>{t_field(item, 'subtitle')}</Small>
                                        </View>

                                        {/* Proposta A: Botão para Checklist */}
                                        <TouchableOpacity
                                            style={[styles.actionBtn, { backgroundColor: item.color + '10' }]}
                                            onPress={(e) => {
                                                e.stopPropagation();
                                                navigation.navigate('KitsMenu', { kitId: item.id });
                                            }}
                                        >
                                            <Small style={{ color: item.color, fontWeight: '700' }}>{t('headersFirst.montarEsteKit', 'Montar este Kit')}</Small>
                                        </TouchableOpacity>
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        alignItems: 'center',
        paddingVertical: 16,
        justifyContent: 'center',
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: 52,
        width: '100%',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
        marginBottom: 4,
        textAlign: 'center',
        lineHeight: 20,
    },
    actionBtn: {
        marginTop: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    cardDesc: {
        color: Neo.colors.neutral[500],
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 16,
    },
});
