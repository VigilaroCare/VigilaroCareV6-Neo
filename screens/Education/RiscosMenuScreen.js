import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';

import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoSectionHero from '../../components/NeoSectionHero';

import { DS as Neo } from '../../utils/DesignSystem2026';
import { Body, Small } from "../../components/NeoTypography";
import { MAPA_PREVENCAO } from '../../data/knowledge_prevencao';
import { t_field } from '../../utils/getLocalizedField';

export default function RiscosMenuScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation('common');
    const ambientes = Object.values(MAPA_PREVENCAO);

    const title = t('riscosMenu.title', 'Prevenção em casa');
    const capaSource = require('../../assets/illustrations/pad/hero_riscos.png');

    return (
        <AppBackground>
            <StatusBar style="auto" />

            <NeoScreenHeader title={title} onBack={() => navigation.goBack()} />

            <ScrollView
                contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomBare }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: Neo.layout.screenHPadding }}>
                    <NeoSectionHero
                        titulo={title}
                        lead={t('riscosMenu.lead', 'Os riscos mais comuns de cada ambiente da casa, e o que fazer antes do acidente.')}
                        arte={capaSource}
                    />
                </View>

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
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
                                                {t_field(item, 'nome')}
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
                </View>
            </ScrollView>
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
        marginBottom: 2,
    },
    itemSub: {
        fontSize: 11,
    },
});
