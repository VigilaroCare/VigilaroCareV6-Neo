import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, SearchNormal1 } from 'iconsax-react-native';
import { utensiliosDomesticos } from '../../data/utensilios_domesticos';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H2, Small } from '../../components/NeoTypography';
import ReviewImage from '../../components/ReviewImage';
import FadeInView from '../../components/FadeInView';
import { Shadows } from '../../utils/Theme';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

// Cor de risco por nivel (heuristica baseada no texto do campo)
const getRiscoColor = (risco) => {
    const r = (risco || '').toLowerCase();
    if (r.includes('explos') || r.includes('grave') || r.includes('choque')) return '#D32F2F';
    if (r.includes('queimadu') || r.includes('contamin')) return '#E65100';
    if (r.includes('corte') || r.includes('perfur')) return '#F57F17';
    return '#388E3C';
};

const getRiscoBg = (color) => color + '15';

export default function UtensiliosDomesticosScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const cardBg = isDark ? themeColors.neutral[200] : '#FFFFFF';
    const [search, setSearch] = useState('');

    const THEME_COLOR = '#E65100'; // consistente com UtensiliosReviewsScreen

    const filteredData = utensiliosDomesticos.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.categoria.toLowerCase().includes(search.toLowerCase())
    );

    const handlePress = (item) => {
        // Padroniza com FasesVida/Produtos: navega para ConceitoDetail.
        // ConceitoDetail ja sabe ler imagemUrl como hero (Lote 7k) e
        // os campos nome/descricao/prevencao/primeirosSocorros.
        navigation.navigate('ConceitoDetail', {
            conceito: {
                ...item,
                iconColor: getRiscoColor(item.risco),
            },
        });
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* Header padronizado (alinha com outras telas) */}
                <View style={[styles.header, { paddingTop: insets.top > 0 ? 4 : 12 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={[styles.backBtn, { backgroundColor: THEME_COLOR + '20' }]}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={t('common.back', 'Voltar')}
                    >
                        <ArrowLeft size={22} color={THEME_COLOR} />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerEmoji}>🍽️</Text>
                        <Text style={[styles.headerTitle, { color: textPrimary }]} accessibilityRole="header">
                            {t('headersFirst.utensLiosDomSticos', 'Utensílios Domésticos')}
                        </Text>
                        <Text style={[styles.headerSubtitle, { color: textBody }]}>
                            {t('headersFirst.seguranANaCozinhaEReasDeServiO', 'Segurança na cozinha e áreas de serviço')}
                        </Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={[styles.searchContainer, { borderColor: themeColors.neutral[300], backgroundColor: isDark ? 'rgba(28,28,30,0.4)' : 'rgba(255,255,255,0.5)' }]}>
                    <SearchNormal1 size={20} color={textMuted} />
                    <TextInput
                        style={[styles.searchInput, { color: textPrimary }]}
                        placeholder="Buscar utensílio (ex: Facas, Panelas)"
                        placeholderTextColor={textMuted}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <ScrollView
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <Text style={[styles.infoText, { color: textMuted }]}>
                                📋 {filteredData.length} itens • Toque para ver detalhes
                            </Text>
                        </View>
                    </FadeInView>

                    {filteredData.map((item, idx) => {
                        const riscoColor = getRiscoColor(item.risco);
                        const riscoBg = getRiscoBg(riscoColor);

                        return (
                            <FadeInView key={item.id} delay={150 + idx * 50}>
                                <TouchableOpacity
                                    onPress={() => handlePress(item)}
                                    activeOpacity={0.8}
                                    style={{ marginBottom: 16 }}
                                >
                                    {/* Padrão de card alinhado com Plantas/Animais/Reviews */}
                                    <View style={styles.guideCardOuter}>
                                        <View style={[styles.guideCardInner, { backgroundColor: cardBg, borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.5)' }]}>
                                            <View style={[styles.guideImageContainer, { backgroundColor: riscoBg }]}>
                                                {item.imagemUrl ? (
                                                    <ReviewImage
                                                        source={{ uri: item.imagemUrl }}
                                                        tint={riscoColor}
                                                        accessibilityLabel={item.nome}
                                                    />
                                                ) : (
                                                    <Text style={{ fontSize: 48 }}>
                                                        {item.emoji === 'blender' ? '🌪️' : item.emoji}
                                                    </Text>
                                                )}
                                            </View>
                                            <View style={styles.guideContent}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <View style={{ flex: 1, paddingRight: 8 }}>
                                                        <Text style={[styles.guideTitle, { color: textPrimary }]} numberOfLines={1}>{item.nome}</Text>
                                                        <Text style={[styles.guideSubtitle, { color: textMuted }]} numberOfLines={1}>{item.categoria}</Text>
                                                    </View>
                                                    <View style={[styles.riscoBadge, { backgroundColor: riscoBg }]}>
                                                        <Text style={[styles.riscoText, { color: riscoColor }]} numberOfLines={1}>{item.risco}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                                <Text style={[styles.descText, { color: textBody }]} numberOfLines={2}>{item.descricao}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </FadeInView>
                        );
                    })}

                    <View style={{ height: 120 }} />
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 16,
        alignItems: 'center',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerEmoji: {
        fontSize: 40,
        marginBottom: 6,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
    },

    listContent: {
        paddingHorizontal: 16,
    },
    infoBar: {
        backgroundColor: 'rgba(0,0,0,0.04)',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginBottom: 12,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontWeight: '500',
    },

    // Card grande estilo Plantas/Animais (imagem retangular a esquerda)
    guideCardOuter: {
        borderRadius: 24,
        ...Shadows.sm,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    guideContent: {
        flex: 1,
        padding: 14,
        justifyContent: 'flex-start',
    },
    guideTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2,
    },
    guideSubtitle: {
        fontSize: 11.5,
        fontStyle: 'italic',
        marginBottom: 6,
    },
    riscoBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        maxWidth: 120,
    },
    riscoText: {
        fontSize: 9.5,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    descText: {
        fontSize: 11.5,
        lineHeight: 16,
    },
});
