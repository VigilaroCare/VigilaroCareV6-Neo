import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Linking
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Shadows } from '../../utils/Theme';
import {
    SearchNormal1, Call, ArrowLeft2 as ArrowLeft, Warning2, Leaf, ArrowRight2
} from 'iconsax-react-native';
import { plantasCiatox } from '../../data/plantas_ciatox';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../../utils/getLocalizedField';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function PlantasToxicasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
    const [searchText, setSearchText] = useState('');
    const THEME_COLOR = '#10B981'; // Emerald

    const plantasFiltradas = plantasCiatox.filter(planta =>
        t_field(planta, 'nomePopular').toLowerCase().includes(searchText.toLowerCase()) ||
        planta.nomeCientifico.toLowerCase().includes(searchText.toLowerCase())
    );

    const getToxicidadeColor = (nivel) => {
        // Data uses 'nivelPerigo'
        switch (nivel) {
            case 'Muito Alto': case 'Very High': case 'Muy Alto': return '#EF4444'; // Red 500
            case 'Alto': case 'High': return '#F97316'; // Orange 500
            case 'Médio': case 'Medium': case 'Medio': return '#F59E0B'; // Amber 500
            case 'Baixo': case 'Low': case 'Bajo': return '#10B981'; // Emerald 500
            default: return '#6B7280'; // Gray 500
        }
    };

    const handleCallCiatox = () => {
        Linking.openURL('tel:08007226001');
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Standardized */}
                <View style={{ padding: 20, paddingTop: 10 }}>
                    <View style={styles.headerTop}><TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}><ArrowLeft size={24} color={Neo.colors.neutral[800]} /></TouchableOpacity><H2>{t('plants.title', 'Plantas')}</H2><TouchableOpacity onPress={handleCallCiatox} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(239, 68, 68, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' }}><Call size={24} color="#EF4444" variant="Bold" /></TouchableOpacity></View>
                    <Small style={{ color: Neo.colors.neutral[500], textAlign: 'center', marginTop: 8 }}>{t('plants.subtitle', 'Guia de Identificação')}</Small>
                </View>

                <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
                    <NeoCard variant="glass" style={styles.searchContainer}>
                        <SearchNormal1 size={20} color={Neo.colors.neutral[400]} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={t('plants.searchPlaceholder', 'Buscar planta...')}
                            placeholderTextColor={Neo.colors.neutral[400]}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </NeoCard>
                </View>

                {/* List */}
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 240 }}
                    showsVerticalScrollIndicator={false}
                >

                    <TouchableOpacity onPress={handleCallCiatox} activeOpacity={0.9} style={{ marginBottom: 16 }}>
                        <View style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
                            <View style={styles.alertIconBg}><Call size={24} color="#EF4444" variant="Bold" /></View>
                            <View style={{ flex: 1 }}><H3 style={styles.alertTitle}>{t('plants.emergencyTitle', 'Emergência Toxicológica?')}</H3><Small style={styles.alertDesc}>{t('plants.emergencyDesc', 'Ligue para o CIATOX: 0800 722 6001')}</Small></View>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 16 }} />

                    {plantasFiltradas.map((planta) => {
                        const sintomas = t_array(planta, 'sintomasHumanos') || [];
                        const nivel = t_field(planta, 'nivelPerigo') || 'Baixo';
                        const sintomasText = sintomas.length > 0 ? `${sintomas[0]}${sintomas.length > 1 ? ` ${t('plants.andMore', { count: sintomas.length - 1 }).replace('+', '+ ')}` : ''}` : 'Sintomas variados';
                        return (
                            <TouchableOpacity key={planta.id} onPress={() => navigation.navigate('ConceitoDetail', { conceito: planta })} activeOpacity={0.8} style={{ marginBottom: 16 }}>
                                <View style={styles.guideCardOuter}>
                                    <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                        <View style={styles.guideImageContainer}>
                                            {planta.imagem ? <Image source={planta.imagem} style={styles.guideImage} /> : <Leaf size={48} color={THEME_COLOR} variant="Bold" />}
                                        </View>
                                        <View style={styles.guideContent}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <View style={{ flex: 1, paddingRight: 8 }}>
                                                    <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{t_field(planta, 'nomePopular')}</Text>
                                                    <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{planta.nomeCientifico}</Text>
                                                </View>
                                                <View style={[styles.toxicBadge, { backgroundColor: getToxicidadeColor(nivel) + '15' }]}>
                                                    <Text style={[styles.toxicText, { color: getToxicidadeColor(nivel) }]}>{nivel}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 }} />
                                            <View style={styles.sptContainer}>
                                                <Warning2 size={12} color={Neo.colors.neutral[500]} />
                                                <Text style={styles.sptText} numberOfLines={2}>{sintomasText}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                    {plantasFiltradas.length === 0 && (
                        <View style={{ alignItems: 'center', marginTop: 40 }}><Leaf size={48} color={Neo.colors.neutral[300]} variant="Bold" /><Body style={{ marginTop: 16, color: Neo.colors.neutral[400] }}>{t('plants.noResults', 'Nenhuma planta encontrada.')}</Body></View>
                    )}

                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: Neo.colors.neutral[800],
    },
    alertCard: {
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertIconBg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    alertTitle: {
        color: '#991B1B'
    },
    alertDesc: {
        color: '#B91C1C',
        marginTop: 2
    },
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120, // Altura fixa para manter imagem expandida e padronizada
        backgroundColor: '#FFFFFF', // Sólido para evitar vazamento de sombra no Android
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    guideImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    guideContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start'
    },
    guideTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 2
    },
    guideSubtitle: {
        fontSize: 12,
        fontStyle: 'italic',
        color: Neo.colors.neutral[500],
        marginBottom: 8
    },
    toxicBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toxicText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    sptContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sptText: {
        fontSize: 12,
        color: Neo.colors.neutral[500],
        marginLeft: 4
    }
});
