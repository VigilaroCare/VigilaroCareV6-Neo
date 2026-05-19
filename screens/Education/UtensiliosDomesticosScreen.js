import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
    ArrowLeft, SearchNormal1, ArrowDown2, ArrowUp2,
    Warning2, ShieldTick, Health, InfoCircle
} from 'iconsax-react-native';
import { utensiliosDomesticos } from '../../data/utensilios_domesticos';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';
import { useThemeColors, useIsDark } from '../../utils/ThemeContext';

export default function UtensiliosDomesticosScreen({ navigation }) {
    const { t } = useTranslation('common');
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    const textBody = themeColors.neutral[700];
    const textMuted = themeColors.neutral[500];
    const [search, setSearch] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    const filteredData = utensiliosDomesticos.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.categoria.toLowerCase().includes(search.toLowerCase())
    );

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const renderItem = ({ item }) => {
        const isExpanded = expandedId === item.id;
        const RiscoColor = item.risco.includes('Alto') ? '#EF4444' : '#F59E0B';

        return (
            <TouchableOpacity
                style={[styles.card, isExpanded && styles.cardExpanded]}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.9}
            >
                {/* Header do Card */}
                <View style={styles.cardHeader}>
                    <View style={styles.iconBox}>
                        <Text style={{ fontSize: 28 }}>{item.emoji === 'blender' ? '🌪️' : item.emoji}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.cardTitle, { color: textPrimary }]}>{item.nome}</Text>
                        <Text style={[styles.cardSubtitle, { color: RiscoColor }]}>Risco: {item.risco}</Text>
                    </View>
                    <View style={styles.expandIcon}>
                        {isExpanded ?
                            <ArrowUp2 size={20} color={Neo.colors.neutral[400]} /> :
                            <ArrowDown2 size={20} color={Neo.colors.neutral[400]} />
                        }
                    </View>
                </View>

                {/* Conteúdo Expandido */}
                {isExpanded && (
                    <View style={styles.cardBody}>
                        {/* Descrição */}
                        <Text style={[styles.description, { color: textBody }]}>{item.descricao}</Text>

                        {/* Prevenção */}
                        <View style={styles.sectionBlock}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                <ShieldTick size={20} color="#059669" variant="Bold" />
                                <Text style={[styles.sectionTitle, { color: '#059669' }]} accessibilityRole="header">{t('headersFirst.cOMOPREVENIR', 'COMO PREVENIR')}</Text>
                            </View>
                            <View style={{ gap: 8 }}>
                                {item.prevencao.map((tip, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Neo.colors.primary[600], marginTop: 8, marginRight: 8 }} />
                                        <Text style={[styles.listItem, { color: textBody }]}>{tip}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Primeiros Socorros */}
                        <View style={[styles.alertBox, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                                <Health size={20} color="#DC2626" variant="Bold" />
                                <Text style={[styles.sectionTitle, { color: '#B91C1C' }]}>{t('headersFirst.pRIMEIROSSOCORROS', 'PRIMEIROS SOCORROS')}</Text>
                            </View>
                            <Text style={[styles.listItem, { color: '#7F1D1D' }]}>
                                {item.primeirosSocorros}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
        <SafeAreaView style={{ flex: 1, backgroundColor: Neo.colors.neutral[100] }} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header Clean */}
            <View style={{ paddingHorizontal: 24, paddingVertical: 16 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ alignSelf: 'flex-start', padding: 8, marginLeft: -8, marginBottom: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel={t('common.back', 'Voltar')}
                >
                    <ArrowLeft size={28} color={textPrimary} />
                </TouchableOpacity>
                <Text style={{ fontSize: 32, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">
                    {t('headersFirst.utensLiosDomSticos', 'Utensílios Domésticos')}
                </Text>
                <Text style={{ fontSize: 16, color: textMuted, marginTop: 4 }}>
                    {t('headersFirst.seguranANaCozinhaEReasDeServiO', 'Segurança na cozinha e áreas de serviço.')}
                </Text>
            </View>

            {/* Search Bar */}
            <View style={[styles.searchContainer, { borderColor: themeColors.neutral[300] }]}>
                <SearchNormal1 size={20} color={textMuted} />
                <TextInput
                    style={[styles.searchInput, { color: textPrimary }]}
                    placeholder="Buscar utensílio (ex: Facas, Panelas)"
                    placeholderTextColor={textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <Text style={{ fontSize: 13, color: textMuted, marginLeft: 24, marginBottom: 12 }}>
                {filteredData.length} itens encontrados
            </Text>

            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 24,
        paddingHorizontal: 16,
        height: 52,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[300],
        ...Neo.shadows.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: Neo.colors.neutral[900],
    },
    card: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        marginBottom: 16,
        ...Neo.shadows.sm,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        overflow: 'hidden',
    },
    cardExpanded: {
        borderColor: Neo.colors.neutral[300],
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconBox: {
        width: 56,
        height: 56,
        borderRadius: 18,
        backgroundColor: Neo.colors.neutral[200],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    cardSubtitle: {
        fontSize: 13,
        fontWeight: '600',
    },
    expandIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[100],
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBody: {
        padding: 20,
        paddingTop: 0,
    },
    description: {
        fontSize: 15,
        color: Neo.colors.neutral[700],
        marginBottom: 24,
        lineHeight: 22,
    },
    sectionBlock: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '800',
        marginLeft: 8,
        letterSpacing: 0.5,
    },
    listItem: {
        fontSize: 15,
        color: Neo.colors.neutral[800],
        lineHeight: 22,
        flex: 1,
    },
    alertBox: {
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
    },
});
