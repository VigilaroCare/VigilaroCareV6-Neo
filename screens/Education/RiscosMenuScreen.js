import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoIcon from '../../components/NeoIcon';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { H1, Body, Small, Caption } from '../../components/NeoTypography';
import { MAPA_PREVENCAO } from '../../data/knowledge_prevencao';

export default function RiscosMenuScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const ambientes = Object.values(MAPA_PREVENCAO);

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER consistente */}
                <View style={s.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={s.backBtn}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={s.title}>
                            {t('riscosMenu.title', 'Prevenção em casa')}
                        </H1>
                        <Caption style={s.subtitle}>
                            {t('riscosMenu.subtitle', 'Guia de riscos por cômodo')}
                        </Caption>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={s.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={s.grid}>
                        {ambientes.map((item) => {
                            const topicCount = item.conteudo?.filter(c => c.tipo === 'topico').length || 0;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={s.gridCell}
                                    onPress={() => navigation.navigate('EnvironmentGuideNeo', { ambienteId: item.id })}
                                    activeOpacity={0.85}
                                >
                                    <NeoCard variant="elevated" style={s.gridCard}>
                                        <View style={[s.iconCircle, { backgroundColor: (item.cor || Neo.colors.primary[500]) + '33' }]}>
                                            <Text style={s.emoji}>{item.emoji}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                            <Body style={s.itemTitle} numberOfLines={2}>
                                                {item.nome}
                                            </Body>
                                            <Small style={s.itemSub} numberOfLines={1}>
                                                {topicCount} {t('riscosMenu.preventionTopics', 'tópicos')}
                                            </Small>
                                        </View>
                                    </NeoCard>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

const s = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 18,
        gap: 12,
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    subtitle: {
        color: Neo.colors.neutral[600],
    },

    scrollContent: {
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 190,
    },

    // Grid 2-col
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    gridCell: {
        width: '48.5%',
        aspectRatio: 1,
        marginBottom: 4,
    },
    gridCard: {
        flex: 1,
        padding: 16,
        borderRadius: 20,
        justifyContent: 'space-between',
    },
    iconCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 28,
    },
    itemTitle: {
        fontWeight: '800',
        fontSize: 14.5,
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    itemSub: {
        color: Neo.colors.neutral[600],
        fontSize: 11,
    },
});
