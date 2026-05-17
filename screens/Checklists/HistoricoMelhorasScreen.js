import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { ArrowLeft, Award, Clock } from 'iconsax-react-native';
import { DS as Neo } from '../../utils/DesignSystem2026';
import TimelineService from '../../services/TimelineService';
import AppBackground from '../../components/AppBackground';

export default function HistoricoMelhorasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const data = await TimelineService.getHistory();
        setHistory(data);
        setLoading(false);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) + ' - ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <AppBackground>
        <SafeAreaView style={styles.container}>
            {/* Cabeçalho Minimalista */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnVoltar}>
                    <ArrowLeft size={24} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.histRicoDeMelhorias', 'Histórico de Melhorias')}</Text>
                <View style={{ width: 44 }} />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={Neo.colors.primary[500]} />
                </View>
            ) : history.length === 0 ? (
                <View style={styles.center}>
                    <Clock size={48} color={Neo.colors.neutral[300]} variant="Outline" />
                    <Text style={styles.emptyText}>{t('headersFirst.pareceQueVocAindaNOTemRegistros', 'Parece que você ainda não tem registros.')}</Text>
                    <Text style={styles.emptySubText}>{t('headersFirst.realizeVistoriasEMarqueOsItensComoSeguro', 'Realize vistorias e marque os itens como Seguros para construir seu histórico.')}</Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item, index }) => (
                        <View style={styles.historyCard}>
                            {/* Linha da timeline lateral */}
                            <View style={styles.timelineEdge}>
                                <View style={[styles.dot, index === 0 && styles.dotHighlight]} />
                                {index !== history.length - 1 && <View style={styles.line} />}
                            </View>

                            {/* Conteúdo */}
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.tagContainer}>
                                        <Award size={14} color={Neo.colors.primary[700]} variant="Bold" />
                                        <Text style={styles.tagText}>{item.areaId.toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.dateText}>{formatDate(item.data)}</Text>
                                </View>
                                <Text style={styles.itemTitle}>{item.titulo}</Text>
                                <Text style={styles.actionText}>{t('headersFirst.marcadoComoSeguro', 'Marcado como Seguro ✓')}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[50], // Fundo leve
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100]
    },
    btnVoltar: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: Neo.colors.neutral[50]
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '700',
        color: Neo.colors.neutral[600],
        marginTop: 16,
        textAlign: 'center'
    },
    emptySubText: {
        fontSize: 14,
        color: Neo.colors.neutral[500],
        marginTop: 8,
        textAlign: 'center',
        lineHeight: 20
    },
    listContainer: {
        padding: 20,
        paddingBottom: 190
    },
    historyCard: {
        flexDirection: 'row',
        marginBottom: 16
    },
    timelineEdge: {
        width: 30,
        alignItems: 'center',
        marginRight: 10
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Neo.colors.neutral[300],
        marginTop: 4
    },
    dotHighlight: {
        backgroundColor: Neo.colors.primary[500],
        borderWidth: 3,
        borderColor: Neo.colors.primary[100]
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: Neo.colors.neutral[200],
        marginTop: 4
    },
    cardContent: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[100],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
        elevation: 1
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.primary[50],
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4
    },
    tagText: {
        fontSize: 10,
        fontWeight: '800',
        color: Neo.colors.primary[700],
        letterSpacing: 0.5
    },
    dateText: {
        fontSize: 11,
        fontWeight: '600',
        color: Neo.colors.neutral[400]
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Neo.colors.neutral[800],
        lineHeight: 22,
        marginBottom: 8
    },
    actionText: {
        fontSize: 12,
        fontWeight: '700',
        color: Neo.colors.feedback.success
    }
});
