/**
 * EscolaSeguraScreen.js
 * Checklist interativo para avaliar segurança de escolas
 * Vigilaro Care V6 Neo
 *
 * Correções aplicadas (Lote Maio):
 * - Header sólido substituído por padrão Neo (AppBackground + NeoCard glassmorphism)
 * - StatusBar migrada para "dark" (compatível com AppBackground)
 * - modalContent: backgroundColor 'transparent' corrigido para branco sólido (#FFFFFF)
 * - Container raiz migrado de View simples para AppBackground
 * - Text nativo substituído por NeoText/H3/Body onde aplicável
 * - Emoji em console.error removido (regra global Hermes)
 */

import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TriColorBar from '../../components/TriColorBar';

// Services & Utils
import { DS as Neo } from '../../utils/DesignSystem2026';
import { CHECKLIST_ESCOLA_SEGURA, calcularPontuacao, getNivelSeguranca } from '../../data/escola_segura_data';
import { t_field } from '../../utils/getLocalizedField';

// Components
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small, Caption, NeoText } from '../../components/NeoTypography';
import ScaleButton from '../../components/ScaleButton';
import AppBackground from '../../components/AppBackground';
import FadeInView from '../../components/FadeInView';

export default function EscolaSeguraScreen({ navigation }) {
    const { t } = useTranslation('common');
    const THEME_COLOR = '#4CAF50';

    const [responses, setResponses] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadResponses();
        }, [])
    );

    const loadResponses = async () => {
        try {
            const saved = await AsyncStorage.getItem('@escola_segura_responses');
            if (saved) setResponses(JSON.parse(saved));
        } catch (e) {
            // silencioso — sem emoji (regra Hermes)
        }
    };

    const saveResponses = async (newResponses) => {
        try {
            await AsyncStorage.setItem('@escola_segura_responses', JSON.stringify(newResponses));
        } catch (e) {
            // silencioso
        }
    };

    const handleSetStatus = (itemId, newStatus) => {
        const newResponses = {
            ...responses,
            [itemId]: responses[itemId] === newStatus ? null : newStatus,
        };
        setResponses(newResponses);
        saveResponses(newResponses);
    };

    const showItemDetails = (item) => {
        setSelectedItem(item);
        setShowDetailsModal(true);
    };

    const pontuacao = calcularPontuacao(responses);
    const nivelSeguranca = getNivelSeguranca(pontuacao);

    const getCategoryProgress = (categoria) => {
        const total = categoria.itens.length;
        const marcados = categoria.itens.filter(item => responses[item.id]).length;
        return { total, marcados, percentual: Math.round((marcados / total) * 100) };
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER padronizado */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <H1 style={{ fontWeight: '800', letterSpacing: -0.5, marginBottom: 2, fontSize: 22 }}>
                            {t('headersFirst.escolaSegura', 'Escola segura')}
                        </H1>
                        <Caption style={{ color: Neo.colors.neutral[600] }}>
                            {t('headersFirst.checklistDeAvaliaO', 'Checklist de avaliação')}
                        </Caption>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EscolaSeguraReport', { responses, pontuacao, nivelSeguranca })}
                        style={styles.actionButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="DocumentText" size={20} color={THEME_COLOR} variant="Bold" />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.content}
                    contentContainerStyle={{ paddingBottom: 240, paddingTop: 8 }}
                    showsVerticalScrollIndicator={false}
                >

                    {/* ── Introdução ── */}
                    <FadeInView delay={100}>
                        <NeoCard variant="glass" style={styles.introCard}>
                            <View style={styles.introIcon}>
                                <NeoIcon name="Teacher" size={32} color={THEME_COLOR} />
                            </View>
                            <Body style={{ textAlign: 'center', lineHeight: 22 }}>
                                {t_field(CHECKLIST_ESCOLA_SEGURA, 'introducao')}
                            </Body>
                        </NeoCard>
                    </FadeInView>

                    {/* ── Progresso Geral ── */}
                    <FadeInView delay={150}>
                        <NeoCard variant="glass" style={styles.progressCard}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                                <View>
                                    <Small style={{ color: Neo.colors.neutral[600] }}>
                                        {t('headersFirst.pROGRESSOGERAL', 'PROGRESSO GERAL')}
                                    </Small>
                                    <H2 style={{ marginTop: 4 }}>{pontuacao.marcados}/{pontuacao.total}</H2>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Small style={{ color: Neo.colors.neutral[600] }}>
                                        {t('headersFirst.iTENSCRTICOS', 'ITENS CRÍTICOS')}
                                    </Small>
                                    <H2 style={{ marginTop: 4, color: nivelSeguranca.cor }}>
                                        {pontuacao.criticos_marcados}/{pontuacao.criticos_total}
                                    </H2>
                                </View>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View style={[styles.progressBarFill, {
                                    width: `${pontuacao.percentual}%`,
                                    backgroundColor: nivelSeguranca.cor,
                                }]} />
                            </View>
                            <Small style={{ textAlign: 'center', marginTop: 8, color: Neo.colors.neutral[600] }}>
                                {pontuacao.percentual}% {t('headersFirst.completo', 'completo')}
                            </Small>
                        </NeoCard>
                    </FadeInView>

                    {/* ── Grid de Categorias / Detalhe de Categoria ── */}
                    <FadeInView delay={200}>
                        {!activeCategory ? (
                            <View style={styles.gridContainer}>
                                {CHECKLIST_ESCOLA_SEGURA.categorias.map((categoria) => {
                                    const progress = getCategoryProgress(categoria);
                                    return (
                                        <TouchableOpacity
                                            key={categoria.id}
                                            style={styles.gridCell}
                                            activeOpacity={0.8}
                                            onPress={() => setActiveCategory(categoria.id)}
                                        >
                                            <NeoCard
                                                variant="glass"
                                                style={styles.gridCard}
                                            >
                                                <View style={[styles.iconCircle, { backgroundColor: categoria.cor + '15' }]}>
                                                    <NeoText style={{ fontSize: 24 }}>{categoria.icone}</NeoText>
                                                </View>
                                                <NeoText style={styles.gridCardTitle} numberOfLines={2}>
                                                    {t_field(categoria, 'nome')}
                                                </NeoText>
                                                {progress.percentual > 0 && (
                                                    <View style={styles.gridMiniBar}>
                                                        <View style={{
                                                            width: `${progress.percentual}%`,
                                                            height: '100%',
                                                            backgroundColor: categoria.cor,
                                                            borderRadius: 2,
                                                        }} />
                                                    </View>
                                                )}
                                            </NeoCard>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ) : (
                            <View style={{ marginTop: 8 }}>
                                {(() => {
                                    const categoria = CHECKLIST_ESCOLA_SEGURA.categorias.find(c => c.id === activeCategory);
                                    const progress = getCategoryProgress(categoria);
                                    return (
                                        <View>
                                            {/* Voltar */}
                                            <TouchableOpacity
                                                style={styles.backToCategories}
                                                onPress={() => setActiveCategory(null)}
                                            >
                                                <View style={styles.backCircle}>
                                                    <NeoIcon name="ArrowLeft2" size={16} color={Neo.colors.neutral[700]} />
                                                </View>
                                                <H3 style={{ color: Neo.colors.neutral[700] }}>
                                                    {t('headersFirst.voltarParaCategorias', 'Voltar para Categorias')}
                                                </H3>
                                            </TouchableOpacity>

                                            {/* Card resumo da categoria */}
                                            <NeoCard variant="glass" style={{ padding: 16, marginBottom: 16 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{
                                                        width: 48, height: 48, borderRadius: 24,
                                                        backgroundColor: categoria.cor + '20',
                                                        alignItems: 'center', justifyContent: 'center',
                                                    }}>
                                                        <NeoText style={{ fontSize: 24 }}>{categoria.icone}</NeoText>
                                                    </View>
                                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                                        <H3>{t_field(categoria, 'nome')}</H3>
                                                        <Small style={{ color: Neo.colors.neutral[500] }}>
                                                            {progress.marcados}/{progress.total} {t('headersFirst.itens', 'itens')}
                                                        </Small>
                                                    </View>
                                                    <H3 style={{ color: categoria.cor }}>{progress.percentual}%</H3>
                                                </View>
                                                {(() => {
                                                    let baixo = 0, atencao = 0, critico = 0;
                                                    categoria.itens.forEach(item => {
                                                        const status = responses[item.id];
                                                        if (!status || status === 'na') return;
                                                        if (status === true || status === 'conforme') { baixo++; }
                                                        else if (status === 'risco') { item.critico ? critico++ : atencao++; }
                                                    });
                                                    return (
                                                        <TriColorBar
                                                            baixo={baixo}
                                                            atencao={atencao}
                                                            critico={critico}
                                                            height={8}
                                                            showLabels={progress.marcados > 0}
                                                            style={{ marginTop: 10 }}
                                                        />
                                                    );
                                                })()}
                                            </NeoCard>

                                            {/* Itens da categoria */}
                                            <View style={{ marginTop: 4 }}>
                                                {categoria.itens.map((item) => {
                                                    const savedState = responses[item.id];
                                                    const isChecked =
                                                        savedState === true || savedState === 'conforme' ? 'conforme'
                                                        : savedState === 'risco' ? 'risco'
                                                        : savedState === 'na' ? 'na'
                                                        : null;

                                                    return (
                                                        <NeoCard
                                                            variant="flat"
                                                            key={item.id}
                                                            style={styles.itemCard}
                                                        >
                                                            {/* Barra lateral de prioridade */}
                                                            <View style={[styles.itemPriorityBar, {
                                                                backgroundColor: item.critico ? '#EF4444' : categoria.cor,
                                                            }]} />

                                                            {/* Conteúdo central */}
                                                            <View style={{ flex: 1, paddingRight: 10 }}>
                                                                <Small style={styles.itemCategoryLabel}>
                                                                    {t_field(categoria, 'nome').toUpperCase()}
                                                                </Small>
                                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                                                    <Body style={styles.itemText}>
                                                                        {t_field(item, 'texto')}
                                                                    </Body>
                                                                    <TouchableOpacity
                                                                        onPress={() => showItemDetails(item)}
                                                                        style={{ padding: 2, marginLeft: 6, marginTop: 2 }}
                                                                    >
                                                                        <NeoIcon name="InfoCircle" size={18} color={Neo.colors.neutral[400]} />
                                                                    </TouchableOpacity>
                                                                </View>
                                                                {item.critico && (
                                                                    <View style={{ flexDirection: 'row', marginTop: 4 }}>
                                                                        <View style={styles.criticoBadge}>
                                                                            <Small style={styles.criticoBadgeText}>
                                                                                {t('headersFirst.cRTICO', 'CRÍTICO')}
                                                                            </Small>
                                                                        </View>
                                                                    </View>
                                                                )}
                                                            </View>

                                                            {/* Botões S / N / N/A */}
                                                            <View style={{ alignItems: 'center', gap: 4 }}>
                                                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => handleSetStatus(item.id, 'conforme')}
                                                                        style={[styles.statusBtn, {
                                                                            backgroundColor: isChecked === 'conforme' ? '#10B981' : '#F8FAFC',
                                                                            borderWidth: isChecked === 'conforme' ? 0 : 1.5,
                                                                            borderColor: isChecked === 'conforme' ? 'transparent' : '#E2E8F0',
                                                                        }]}
                                                                        activeOpacity={0.7}
                                                                    >
                                                                        <Small style={{ fontWeight: 'bold', color: isChecked === 'conforme' ? '#FFF' : '#94A3B8' }}>S</Small>
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity
                                                                        onPress={() => handleSetStatus(item.id, 'risco')}
                                                                        style={[styles.statusBtn, {
                                                                            backgroundColor: isChecked === 'risco' ? '#EF4444' : '#F8FAFC',
                                                                            borderWidth: isChecked === 'risco' ? 0 : 1.5,
                                                                            borderColor: isChecked === 'risco' ? 'transparent' : '#E2E8F0',
                                                                        }]}
                                                                        activeOpacity={0.7}
                                                                    >
                                                                        <Small style={{ fontWeight: 'bold', color: isChecked === 'risco' ? '#FFF' : '#94A3B8' }}>N</Small>
                                                                    </TouchableOpacity>
                                                                </View>

                                                                <TouchableOpacity
                                                                    onPress={() => handleSetStatus(item.id, 'na')}
                                                                    style={[styles.naBtn, {
                                                                        backgroundColor: isChecked === 'na' ? '#6B7280' : '#F1F5F9',
                                                                        borderWidth: isChecked === 'na' ? 0 : 1,
                                                                        borderColor: isChecked === 'na' ? 'transparent' : '#E2E8F0',
                                                                    }]}
                                                                    activeOpacity={0.7}
                                                                >
                                                                    <Small style={{ fontSize: 9, fontWeight: '800', color: isChecked === 'na' ? '#FFF' : '#94A3B8' }}>
                                                                        {t('headersFirst.nA', 'N/A')}
                                                                    </Small>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </NeoCard>
                                                    );
                                                })}
                                            </View>
                                        </View>
                                    );
                                })()}
                            </View>
                        )}
                    </FadeInView>

                    {/* ── Botão Relatório ── */}
                    <FadeInView delay={250}>
                        <ScaleButton
                            onPress={() => navigation.navigate('EscolaSeguraReport', { responses, pontuacao, nivelSeguranca })}
                        >
                            <NeoCard variant="glass" style={[styles.reportButton, { backgroundColor: THEME_COLOR }]}>
                                <NeoIcon name="DocumentText" size={24} color="#FFF" />
                                <H3 style={{ color: '#FFF', marginLeft: 12 }}>
                                    {t('headersFirst.verRelatRioCompleto', 'Ver Relatório Completo')}
                                </H3>
                            </NeoCard>
                        </ScaleButton>
                    </FadeInView>

                </ScrollView>

                {/* ── Modal de Detalhes ── */}
                <Modal
                    visible={showDetailsModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowDetailsModal(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setShowDetailsModal(false)}
                    >
                        {/* CORRIGIDO: backgroundColor sólido para legibilidade */}
                        <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                            {selectedItem && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <H3 style={{ flex: 1 }}>{t_field(selectedItem, 'texto')}</H3>
                                        <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                                            <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[600]} />
                                        </TouchableOpacity>
                                    </View>
                                    <Body style={{ marginTop: 16, lineHeight: 22 }}>
                                        {t_field(selectedItem, 'detalhes')}
                                    </Body>
                                    {selectedItem.critico && (
                                        <View style={[styles.criticalBadge, { marginTop: 16, alignSelf: 'flex-start' }]}>
                                            <Caption style={{ color: '#D32F2F', fontWeight: '600' }}>
                                                {t('headersFirst.ITEMCRTICO', '⚠️ ITEM CRÍTICO')}
                                            </Caption>
                                        </View>
                                    )}
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                </Modal>

            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    // ── Header Neo ──
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 4,
        paddingBottom: 14,
        gap: 12,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(76,175,80,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // ── Scroll ──
    content: {
        flex: 1,
        paddingHorizontal: Neo.spacing.lg,
    },

    // ── Intro ──
    introCard: {
        padding: 20,
        alignItems: 'center',
    },
    introIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E8F5E9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },

    // ── Progresso ──
    progressCard: {
        padding: 20,
        marginTop: 16,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: Neo.colors.neutral[200],
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },

    // ── Grid de categorias ──
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
        gap: 8,
    },
    gridCell: {
        width: '31.5%',
        aspectRatio: 0.85,
        marginBottom: 8,
    },
    gridCard: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 16,
    },
    gridCardTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        textAlign: 'center',
        lineHeight: 14,
        paddingHorizontal: 2,
    },
    iconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridMiniBar: {
        marginTop: 'auto',
        width: '80%',
        height: 4,
        backgroundColor: '#F2F2F7',
        borderRadius: 2,
        overflow: 'hidden',
    },

    // ── Voltar para categorias ──
    backToCategories: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    // ── Item do checklist ──
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        ...Neo.shadows.sm,
    },
    itemPriorityBar: {
        width: 4,
        alignSelf: 'stretch',
        borderRadius: 2,
        marginRight: 12,
    },
    itemCategoryLabel: {
        color: '#9CA3AF',
        fontWeight: '700',
        fontSize: 9,
        letterSpacing: 0.6,
        marginBottom: 3,
    },
    itemText: {
        color: '#1F2937',
        lineHeight: 20,
        fontWeight: '600',
        fontSize: 15,
        flex: 1,
    },
    criticoBadge: {
        backgroundColor: '#FEF2F2',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    criticoBadgeText: {
        color: '#B91C1C',
        fontWeight: 'bold',
        fontSize: 8,
    },

    // ── Botões S / N / N/A ──
    statusBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    naBtn: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // ── Botão relatório ──
    reportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 24,
    },

    // ── Modal ──
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',   // CORRIGIDO: era 'transparent'
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        ...Neo.shadows.md,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    criticalBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#FFEBEE',
        borderRadius: 4,
    },
});