/**
 * VistoriaAsiloReportScreen.js
 * Relatório completo da avaliação de segurança institucional (Asilo/ILPI)
 * Vigilaro Care V6
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import { CHECKLIST_ASILO_SEGURA } from '../../data/asilo_seguro_data';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';

export default function VistoriaAsiloReportScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const { responses = {}, pontuacao, nivelSeguranca } = route.params || {};

    const getPontosFortes = () => {
        // Removido para focar na "Gestão por Exceção"
        return [];
    };

    const getPontosFracos = () => {
        const fracos = [];
        CHECKLIST_ASILO_SEGURA.categorias.forEach(categoria => {
            // Agora pega TODOS os itens não marcados (Críticos e Atenção)
            const itensNaoMarcados = categoria.itens.filter(
                item => responses[item.id] !== 'conforme' && responses[item.id] !== true
            );

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
            const message = `📋 Relatório Asilo Seguro - Vigilaro Care\n\n` +
                `Conformidade Geral: ${pontuacao.marcados}/${pontuacao.total} (${pontuacao.percentual}%)\n` +
                `Itens Críticos: ${pontuacao.criticos_marcados}/${pontuacao.criticos_total}\n` +
                `Status de Segurança: ${nivelSeguranca.nivel}\n\n` +
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
                    <H1 style={styles.title}>{t('headersFirst.relatRioInstitucional', 'Relatório')}</H1>
                    <Caption style={styles.subtitle}>Vistoria asilo</Caption>
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
                            <Small style={{ fontSize: 32 }}>{nivelSeguranca.icone}</Small>
                        </View>
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.sTATUSDESEGURANA', 'STATUS DE SEGURANÇA')}</Small>
                            <H2 style={{ color: nivelSeguranca.cor, marginTop: 4 }}>{nivelSeguranca.nivel}</H2>
                        </View>
                    </View>
                    <Body style={{ lineHeight: 22 }}>{nivelSeguranca.mensagem}</Body>
                </NeoCard>

                {/* Estatísticas */}
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
                    <NeoCard variant="elevated" style={[styles.statCard, { flex: 1 }]}>
                        <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.gERAL', 'GERAL')}</Small>
                        <H1 style={{ marginTop: 8 }}>{pontuacao.percentual}%</H1>
                        <Caption style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {pontuacao.marcados}/{pontuacao.total} conformes
                        </Caption>
                    </NeoCard>

                    <NeoCard variant="elevated" style={[styles.statCard, { flex: 1 }]}>
                        <Small style={{ color: Neo.colors.neutral[600] }}>{t('headersFirst.cRTICOS', 'CRÍTICOS')}</Small>
                        <H1 style={{ marginTop: 8, color: nivelSeguranca.cor }}>{pontuacao.criticos_percentual}%</H1>
                        <Caption style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                            {pontuacao.criticos_marcados}/{pontuacao.criticos_total} conformes
                        </Caption>
                    </NeoCard>
                </View>

                {/* Pontos Fortes removidos (Foco apenas em Exceção/Riscos) */}

                {/* Pontos de Atenção (Riscos Críticos) */}
                {pontosFracos.length > 0 && (
                    <View style={{ marginTop: 24 }}>
                        <H3 style={{ marginBottom: 12, color: Neo.colors.feedback.error }}>{t('headersFirst.RiscosCrTicosIdentificados', '🚨 Riscos Críticos Identificados')}</H3>
                        {pontosFracos.map((ponto, index) => (
                            <NeoCard variant="elevated" key={index} style={[styles.pontoCard, { borderLeftWidth: 4, borderLeftColor: Neo.colors.feedback.error }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                    <View style={[styles.pontoIcon, { backgroundColor: Neo.colors.feedback.error + '15' }]}>
                                        <Small style={{ fontSize: 20 }}>{ponto.icone}</Small>
                                    </View>
                                    <Body style={{ flex: 1, marginLeft: 12, fontWeight: '600', color: Neo.colors.emergency?.panicDark || Neo.colors.feedback.error }}>
                                        {ponto.categoria}
                                    </Body>
                                </View>
                                {ponto.itens.map((item, idx) => (
                                    <View key={idx} style={styles.itemFraco}>
                                        <NeoIcon name={item.critico ? "Danger" : "Warning2"} size={16} color={item.critico ? Neo.colors.feedback.error : Neo.colors.feedback.warning} />
                                        <Small style={{ flex: 1, marginLeft: 8, color: Neo.colors.neutral[700], fontWeight: item.critico ? 'bold' : 'normal' }}>
                                            {item.texto}
                                        </Small>
                                    </View>
                                ))}
                            </NeoCard>
                        ))}
                    </View>
                )}

                {/* Perguntas Sugeridas */}
                <View style={{ marginTop: 24 }}>
                    <H3 style={{ marginBottom: 12 }}>{t('headersFirst.PerguntasParaAInstituiO', '💬 Perguntas para a Instituição')}</H3>
                    <NeoCard variant="elevated" style={{ padding: 16 }}>
                        {CHECKLIST_ASILO_SEGURA.perguntas_sugeridas.map((pergunta, index) => (
                            <View key={index} style={styles.perguntaRow}>
                                <NeoIcon name="MessageQuestion" size={20} color={Neo.colors.primary[600]} />
                                <Body style={{ flex: 1, marginLeft: 12, lineHeight: 20 }}>{pergunta}</Body>
                            </View>
                        ))}
                    </NeoCard>
                </View>

                {/* Orientações Finais */}
                <NeoCard variant="elevated" style={{ padding: 20, marginTop: 24, backgroundColor: Neo.colors.feedback.info + '15' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <NeoIcon name="InfoCircle" size={24} color={Neo.colors.secondary[600]} variant="Bold" />
                        <H3 style={{ marginLeft: 12, color: Neo.colors.secondary[600] }}>{t('headersFirst.notaDeAuditoria', 'Nota de Auditoria')}</H3>
                    </View>
                    <Body style={{ lineHeight: 22 }}>
                        {t('headersFirst.esteRelatRioSubsidiRioENOSubstituiAVisto', `Este relatório é subsidiário e não substitui a vistoria oficial do Corpo de Bombeiros ou Vigilância Sanitária. 
                        Qualquer falha em itens **CRÍTICOS** deve ser tratada como prioridade máxima pela administração da ILPI.`)}
                    </Body>
                </NeoCard>

                {/* Botões de Ação */}
                <View style={{ marginTop: 24, gap: 12 }}>
                    <ScaleButton onPress={handleShare}>
                        <NeoCard variant="elevated" style={styles.actionButton}>
                            <NeoIcon name="ShareNetwork" size={24} color={Neo.colors.neutral.white} />
                            <Body style={{ color: Neo.colors.neutral.white, marginLeft: 12, fontWeight: '600' }}>
                                {t('headersFirst.compartilharRelatRio', 'Compartilhar Relatório')}
                            </Body>
                        </NeoCard>
                    </ScaleButton>

                    <ScaleButton onPress={() => navigation.goBack()}>
                        <NeoCard variant="elevated" style={[styles.actionButton, { backgroundColor: Neo.colors.neutral[700] }]}>
                            <NeoIcon name="Edit2" size={24} color={Neo.colors.neutral.white} />
                            <Body style={{ color: Neo.colors.neutral.white, marginLeft: 12, fontWeight: '600' }}>
                                {t('headersFirst.revisarRespostas', 'Revisar Respostas')}
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
        paddingLeft: 4,
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
