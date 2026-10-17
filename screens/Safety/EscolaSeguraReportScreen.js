/**
 * EscolaSeguraReportScreen.js
 * Relatório completo da avaliação de segurança escolar
 * Vigilaro Care V6
 */

import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import { CHECKLIST_ESCOLA_SEGURA } from '../../data/escola_segura_data';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';
import { t_field } from '../../utils/getLocalizedField';

export default function EscolaSeguraReportScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { responses = {}, pontuacao, nivelSeguranca } = route.params || {};

    const getPontosFortes = () => {
        // Removido para focar na "Gestão por Exceção"
        return [];
    };

    const getPontosFracos = () => {
        const fracos = [];
        CHECKLIST_ESCOLA_SEGURA.categorias.forEach(categoria => {
            // Agora pega TODOS os itens não marcados (Críticos e Atenção)
            const itensNaoMarcados = categoria.itens.filter(item => !responses[item.id]);

            // Ordena para que os críticos apareçam primeiro dentro da categoria
            itensNaoMarcados.sort((a, b) => (b.critico ? 1 : 0) - (a.critico ? 1 : 0));

            if (itensNaoMarcados.length > 0) {
                fracos.push({
                    categoria: categoria.nome,
                    icone: categoria.icone,
                    itens: itensNaoMarcados
                });
            }
        });
        return fracos;
    };

    const handleShare = async () => {
        try {
            const message = `📋 Relatório Escola Segura - Vigilaro Care\n\n` +
                `Pontuação: ${pontuacao.marcados}/${pontuacao.total} (${pontuacao.percentual}%)\n` +
                `Itens Críticos: ${pontuacao.criticos_marcados}/${pontuacao.criticos_total}\n` +
                `Nível: ${nivelSeguranca.nivel}\n\n` +
                `${nivelSeguranca.mensagem}`;

            await Share.share({ message });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const pontosFortes = getPontosFortes();
    const pontosFracos = getPontosFracos();

    return (
        <AppBackground>
        <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
            <StatusBar style="dark" />

            {/* HEADER padronizado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <H1 style={styles.title}>{t('headersFirst.relatRioCompleto', 'Relatório')}</H1>
                    <Caption style={styles.subtitle}>{t('telas.EscolaSeguraReportScreen.escolaSegura', 'Escola segura')}</Caption>
                </View>
                <TouchableOpacity
                    onPress={handleShare}
                    style={styles.shareBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <NeoIcon name="ShareNetwork" size={20} color={Neo.colors.primary[700]} variant="Bold" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 240 }} showsVerticalScrollIndicator={false}>

                {/* Nível de Segurança */}
                <NeoCard variant="elevated" style={[styles.nivelCard, { borderLeftWidth: 6, borderLeftColor: nivelSeguranca.cor }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <View style={[styles.nivelIcon, { backgroundColor: nivelSeguranca.cor + '20' }]}>
                            <NeoIcon name={nivelSeguranca.icone} size={32} color={nivelSeguranca.cor || Neo.colors.neutral[700]} variant="Bold" />
                        </View>
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.nVELDESEGURANA', 'NÍVEL DE SEGURANÇA')}</Small>
                            <H2 style={{ color: nivelSeguranca.cor, marginTop: 4 }}>{nivelSeguranca.nivel}</H2>
                        </View>
                    </View>
                    <Body style={{ lineHeight: 22 }}>{nivelSeguranca.mensagem}</Body>
                </NeoCard>

                {/* Estatísticas */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                    <NeoCard variant="elevated" style={[styles.statCard, { flex: 1 }]}>
                        <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.tOTAL', 'TOTAL')}</Small>
                        <H1 style={{ marginTop: 8 }}>{pontuacao.percentual}%</H1>
                        <Caption style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {pontuacao.marcados}/{pontuacao.total}{t('telas.EscolaSeguraReportScreen.itens', ' itens')}</Caption>
                    </NeoCard>

                    <NeoCard variant="elevated" style={[styles.statCard, { flex: 1 }]}>
                        <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.cRTICOS', 'CRÍTICOS')}</Small>
                        <H1 style={{ marginTop: 8, color: nivelSeguranca.cor }}>{pontuacao.criticos_percentual}%</H1>
                        <Caption style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {pontuacao.criticos_marcados}/{pontuacao.criticos_total}{t('telas.EscolaSeguraReportScreen.itens2', ' itens')}</Caption>
                    </NeoCard>
                </View>

                {/* Pontos Fortes removidos (Foco apenas em Exceção/Riscos) */}

                {/* Pontos de Atenção */}
                {pontosFracos.length > 0 && (
                    <View style={{ marginTop: 24 }}>
                        <H3 style={{ marginBottom: 12 }}>{t('headersFirst.PontosDeAtenO', '⚠️ Pontos de Atenção')}</H3>
                        {pontosFracos.map((ponto, index) => (
                            <NeoCard variant="elevated" key={index} style={[styles.pontoCard, { borderLeftWidth: 4, borderLeftColor: Neo.colors.feedback.error }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <View style={[styles.pontoIcon, { backgroundColor: 'rgba(239,68,68,0.10)' }]}>
                                        <NeoIcon name={ponto.icone} size={20} color={Neo.colors.neutral[700]} variant="Bold" />
                                    </View>
                                    <Body style={{ flex: 1, marginLeft: 12, fontWeight: '600' }}>
                                        {ponto.categoria}
                                    </Body>
                                </View>
                                {ponto.itens.map((item, idx) => (
                                    <View key={idx} style={styles.itemFraco}>
                                        <NeoIcon name={item.critico ? "Danger" : "Warning2"} size={16} color={item.critico ? Neo.colors.feedback.error : Neo.colors.feedback.warning} />
                                        <Small style={{ flex: 1, marginLeft: 8, color: Neo.colors.neutral[700], fontWeight: item.critico ? 'bold' : 'normal' }}>
                                            {t_field(item, 'texto')}
                                        </Small>
                                    </View>
                                ))}
                            </NeoCard>
                        ))}
                    </View>
                )}

                {/* Perguntas Sugeridas */}
                <View style={{ marginTop: 24 }}>
                    <H3 style={{ marginBottom: 12 }}>{t('headersFirst.PerguntasParaFazerEscola', '💬 Perguntas para Fazer à Escola')}</H3>
                    <NeoCard variant="elevated" style={{ padding: 16 }}>
                        {CHECKLIST_ESCOLA_SEGURA.perguntas_sugeridas.slice(0, 5).map((pergunta, index) => (
                            <View key={index} style={styles.perguntaRow}>
                                <NeoIcon name="Question" size={20} color={Neo.colors.primary[600]} />
                                <Body style={{ flex: 1, marginLeft: 12, lineHeight: 20 }}>{pergunta}</Body>
                            </View>
                        ))}
                    </NeoCard>
                </View>

                {/* Orientações Finais */}
                <NeoCard variant="elevated" style={{ padding: 20, marginTop: 24, backgroundColor: 'rgba(180,83,9,0.08)' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <NeoIcon name="LampOn" size={24} color={Neo.colors.gridAccents.eventuais.color} />
                        <H3 style={{ marginLeft: 12, color: Neo.colors.gridAccents.eventuais.color }}>{t('headersFirst.dicaImportante', 'Dica Importante')}</H3>
                    </View>
                    <Body style={{ lineHeight: 22 }}>
                        {t('headersFirst.nenhumaInstituiOAtingirPontuaOMXimaEmTod', `Nenhuma instituição atingirá pontuação máxima em todos os itens. Priorize as intervenções nos quesitos classificados como críticos.
                        e questione como a escola pretende melhorar os pontos fracos identificados.`)}
                    </Body>
                </NeoCard>

                {/* Botões de Ação */}
                <View style={{ marginTop: 24, gap: 12 }}>
                    <ScaleButton onPress={handleShare}>
                        <NeoCard variant="elevated" style={styles.actionButton}>
                            <NeoIcon name="ShareNetwork" size={24} color="#FFF" />
                            <Body style={{ color: '#FFF', marginLeft: 12, fontWeight: '600' }}>
                                {t('headersFirst.compartilharRelatRio', 'Compartilhar Relatório')}
                            </Body>
                        </NeoCard>
                    </ScaleButton>

                    <ScaleButton onPress={() => navigation.goBack()}>
                        <NeoCard variant="elevated" style={[styles.actionButton, { backgroundColor: Neo.colors.neutral[700] }]}>
                            <NeoIcon name="Edit2" size={24} color="#FFF" />
                            <Body style={{ color: '#FFF', marginLeft: 12, fontWeight: '600' }}>
                                {t('headersFirst.continuarAvaliaO', 'Continuar Avaliação')}
                            </Body>
                        </NeoCard>
                    </ScaleButton>
                </View>

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
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: { fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 },
    subtitle: { color: Neo.colors.neutral[600] },
    shareBtn: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },
    nivelCard: {
        padding: 20,
        marginTop: 16,
    },
    nivelIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statCard: {
        padding: 16,
        alignItems: 'center',
    },
    pontoCard: {
        padding: 16,
        marginBottom: 12,
    },
    pontoIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemFraco: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 8,
        paddingLeft: 12,
    },
    perguntaRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Neo.colors.neutral[100],
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Neo.colors.primary[600],
    },
});
