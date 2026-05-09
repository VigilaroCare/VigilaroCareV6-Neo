import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    StatusBar, ActivityIndicator, Share, Alert, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { LinearGradient } from 'expo-linear-gradient';
import SafetyReportService from '../../services/SafetyReportService';
import AppBackground from '../../components/AppBackground';
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import { H2, H3, Body, Small } from '../../components/NeoTypography';

// ─── Design Tokens (roteados pelo DS2026) ─────────────────────────────────────
const C = {
    primary: Neo.colors.primary[500],
    primaryLight: Neo.colors.primary[100],
    primaryDark: Neo.colors.primary[700],
    danger: Neo.colors.feedback.error,
    dangerLight: Neo.colors.feedback.error + '15',
    dangerBorder: Neo.colors.feedback.error + '40',
    warning: Neo.colors.feedback.warning,
    warningLight: Neo.colors.feedback.warning + '15',
    success: Neo.colors.feedback.success,
    successLight: Neo.colors.feedback.success + '15',
    ack: Neo.colors.neutral[500],      // cinza para itens reconhecidos
    ackLight: Neo.colors.neutral[200],
    neutral900: Neo.colors.neutral[900],
    neutral700: Neo.colors.neutral[700],
    neutral500: Neo.colors.neutral[500],
    neutral300: Neo.colors.neutral[300],
    neutral100: Neo.colors.neutral[100],
    white: Neo.colors.neutral.white,
};

const TYPE_COLOR = {
    baby: '#EC4899', toddler: '#F59E0B', child: '#3B82F6',
    teen: '#8B5CF6', adult: C.primary, senior: '#10B981', pet: '#F97316'
};

// ─── Helper: formatar data de reconhecimento ──────────────────────────────────
function formatAckDate(isoString) {
    try {
        const d = new Date(isoString);
        return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch { return ''; }
}

// ─── Componente: Card de Irregularidade ──────────────────────────────────────
function RiskCard({ item, profileName, onAcknowledge, onNavigate }) {
    const ack = item.acknowledged;

    return (
        <View style={[styles.riskCard, ack ? styles.riskCardAck : null]}>
            {/* Barra lateral de status */}
            <View style={[styles.riskSidebar, { backgroundColor: ack ? C.ack : C.danger }]} />

            <View style={styles.riskBody}>
                {/* Ambiente */}
                <View style={styles.riskEnvRow}>
                    <Text style={styles.riskEnvEmoji}>{item.roomEmoji}</Text>
                    <Text style={styles.riskEnvLabel}>{item.roomLabel}</Text>
                </View>

                {/* Título da irregularidade */}
                <Text style={styles.riskTitle}>{item.titulo}</Text>

                {/* Implicação estatística */}
                {item.implication ? (
                    <View style={[styles.implicationBlock, ack ? styles.implicationBlockAck : null]}>
                        <Text style={[styles.implicationLabel, ack ? { color: C.ack } : null]}>
                            {t('headersFirst.ImplicaOSeNOResolvido', '⚠ Implicação se não resolvido')}
                        </Text>
                        <Text style={[styles.implicationText, ack ? { color: C.neutral500 } : null]}>
                            {item.implication}
                        </Text>
                    </View>
                ) : null}

                {/* Orientação técnica */}
                <View style={styles.tipBlock}>
                    <NeoIcon name="LampOn" size={14} color={C.primary} />
                    <Text style={styles.tipText}>{item.tip}</Text>
                </View>

                {/* Área de ações */}
                {ack ? (
                    /* Reconhecido */
                    <View style={styles.ackBanner}>
                        <NeoIcon name="TickCircle" size={16} color={C.ack} />
                        <Text style={styles.ackText}>
                            Reconhecido por {ack.responsibleName} em {formatAckDate(ack.date)}
                        </Text>
                    </View>
                ) : (
                    /* Ações ativas */
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={styles.btnResolve}
                            onPress={() => onNavigate(item.roomKey)}
                        >
                            <NeoIcon name="TickCircle" size={16} color={C.white} />
                            <Text style={styles.btnResolveText}>{t('headersFirst.vouResolver', 'Vou resolver')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnAck}
                            onPress={() => onAcknowledge(item)}
                        >
                            <NeoIcon name="Eye" size={15} color={C.ack} />
                            <Text style={styles.btnAckText}>{t('headersFirst.reconheOORisco', 'Reconheço o risco')}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────
export default function ProfileRiskSummaryScreen({ navigation, route }) {
    const { t } = useTranslation('common');
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState(null);
    const [riskItems, setRiskItems] = useState([]);
    const [activeProfileId, setActiveProfileId] = useState(route.params?.profile?.id || null);
    const [mode, setMode] = useState(route.params?.mode || 'protecao'); // 'protecao' ou 'consultivo'

    // AI States
    const [aiReport, setAiReport] = useState(null);
    const [generatingAi, setGeneratingAi] = useState(false);

    const loadReport = useCallback(async (profileId) => {
        try {
            setLoading(true);
            const data = await SafetyReportService.getDeepDiveReport(profileId);
            setReport(data);
            setRiskItems(data?.riskItems || []);

            // Tenta carregar relatório IA (usa hash para detectar mudanças)
            const cachedAi = await SafetyReportService.getAIAugmentedReport(profileId, false);
            if (cachedAi && cachedAi.quem) {
                setAiReport(cachedAi);
            } else {
                // Sem cache válido → marca para auto-geração
                setAiReport(null);
            }
        } catch (error) {
            console.error('ProfileRiskSummaryScreen error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-gerar relatório IA quando não há cache válido
    useEffect(() => {
        if (!aiReport && !generatingAi && report && !loading) {
            handleGenerateAI();
        }
    }, [aiReport, report, loading]);

    useEffect(() => {
        const initReport = async () => {
            let pid = activeProfileId;
            if (!pid) {
                const ProfileService = require('../../services/ProfileService').default;
                const perfis = await ProfileService.getPerfis();
                if (perfis && perfis.length > 0) {
                    const principal = perfis.find(p => p.ativo && p.tipo !== 'pet') || perfis.find(p => p.tipo !== 'pet') || perfis[0];
                    pid = principal.id;
                    setActiveProfileId(pid);
                }
            }
            if (pid) {
                loadReport(pid);
            } else {
                setLoading(false);
            }
        };
        initReport();
    }, [activeProfileId, loadReport]);    // ── Gerar IA ────────────────────────────────────────────────────────────
    const handleGenerateAI = async () => {
        setGeneratingAi(true);
        try {
            const aiData = await SafetyReportService.getAIAugmentedReport(activeProfileId, true);
            if (aiData && aiData.quem) {
                setAiReport(aiData);
            } else {
                Alert.alert('Aviso', 'Não foi possível gerar a análise neste momento. Tente novamente mais tarde.');
            }
        } catch (e) {
            Alert.alert('Erro', 'Ocorreu um erro ao conectar com o motor de Inteligência Artificial.');
        } finally {
            setGeneratingAi(false);
        }
    };

    // ── Reconhecer risco ────────────────────────────────────────────────────
    const handleAcknowledge = (item) => {
        const responsibleName = report?.profile?.nome || 'Responsável';
        Alert.alert(
            'Reconhecer Risco',
            `Ao confirmar, registraremos que "${responsibleName}" está ciente desta irregularidade e assume a responsabilidade pela situação.\n\nO item permanecerá visível no relatório como "Reconhecido".`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Confirmar',
                    style: 'destructive',
                    onPress: async () => {
                        await SafetyReportService.saveAcknowledgment(
                            report.profile.id,
                            item.itemKey,
                            responsibleName
                        );
                        // Atualiza estado local imediatamente
                        setRiskItems(prev => prev.map(r =>
                            r.itemKey === item.itemKey
                                ? { ...r, acknowledged: { responsibleName, date: new Date().toISOString() } }
                                : r
                        ));
                    }
                }
            ]
        );
    };

    // ── Compartilhar ────────────────────────────────────────────────────────
    const handleShare = async () => {
        if (!report) return;
        try {
            const activeRisks = riskItems.filter(r => !r.acknowledged);
            const ackRisks = riskItems.filter(r => r.acknowledged);

            let text = `🛡️ RELATÓRIO DE PROTEÇÃO — ${report.profile.nome}\n`;
            text += `Gerado em: ${new Date(report.generatedAt).toLocaleDateString('pt-BR')}\n\n`;
            text += `📊 Irregularidades ativas: ${activeRisks.length}\n`;
            text += `✅ Itens reconhecidos: ${ackRisks.length}\n`;
            text += `❓ Itens pendentes de vistoria: ${report.pendingItems?.length || 0}\n\n`;

            if (activeRisks.length > 0) {
                text += `🔴 IRREGULARIDADES:\n`;
                activeRisks.forEach(r => {
                    text += `• ${r.roomEmoji} ${r.roomLabel} — ${r.titulo}\n`;
                    if (r.tip) text += `  ↳ Orientação: ${r.tip}\n`;
                });
                text += '\n';
            }

            if (ackRisks.length > 0) {
                text += `⚠️ ITENS RECONHECIDOS (assumidos pelo responsável):\n`;
                ackRisks.forEach(r => {
                    text += `• ${r.titulo} — Reconhecido por ${r.acknowledged.responsibleName} em ${formatAckDate(r.acknowledged.date)}\n`;
                });
                text += '\n';
            }

            text += `Gerado por Vigilaro Care — Inteligência em Segurança no Lar.`;
            await Share.share({ message: text, title: `Relatório — ${report.profile.nome}` });
        } catch (e) { console.error('Share error:', e); }
    };

    // ── Loading ─────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={C.primary} />
                <Text style={styles.loadingTitle}>{t('headersFirst.gerandoSeuRelatRioPersonalizado', 'Gerando Seu Relatório Personalizado...')}</Text>
                <Text style={styles.loadingSubtitle}>
                    {t('headersFirst.cruzandoDadosDePerfilSaDeMoradiaEVistori', 'Cruzando dados de perfil, saúde, moradia e vistoria.')}
                </Text>
            </View>
        );
    }

    if (!report) return null;

    const { profile, reportType, typeLabel: tLabel, age, moradia, health,
        executiveSummary, pendingItems, intro, curiosity, otherProfiles, stats } = report;

    const tColor = TYPE_COLOR[reportType] || C.primary;
    const activeRisks = riskItems.filter(r => !r.acknowledged);
    const ackRisks = riskItems.filter(r => r.acknowledged);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                stickyHeaderIndices={[0]}>

                {/* ═══ CABEÇALHO STICKY ═══ */}
                <View>
                    <LinearGradient colors={[C.primaryDark, C.primary]} style={styles.header}>
                        <AppBackground variant="subtle">
        <SafeAreaView edges={['top']}>
                            <View style={styles.headerNav}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                                    <NeoIcon name="ArrowLeft2" size={24} color={C.white} />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>{t('headersFirst.seuRelatRioPersonalizado', 'Seu Relatório Personalizado')}</Text>
                                <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
                                    <NeoIcon name="ShareNetwork" size={24} color={C.white} />
                                </TouchableOpacity>
                            </View>

                            {/* Quem / Onde / Quando */}
                            <View style={styles.contextBlock}>
                                {/* Avatar */}
                                <View style={[styles.avatar, { borderColor: tColor }]}>
                                    {profile?.foto ? (
                                        <Image source={{ uri: profile.foto }} style={styles.avatarImage} />
                                    ) : (
                                        <NeoIcon
                                            name={reportType === 'pet' ? 'paw' : 'person'}
                                            size={26} color={tColor} />
                                    )}
                                </View>

                                <View style={styles.contextInfo}>
                                    <Text style={styles.contextName}>{profile.nome || ''}</Text>
                                    <View style={styles.contextMetaRow}>
                                        <View style={[styles.typePill, { backgroundColor: tColor }]}>
                                            <Text style={styles.typePillText}>{tLabel}</Text>
                                        </View>
                                        {age ? <Text style={styles.contextAge}>{age} anos</Text> : null}
                                    </View>
                                    {moradia.tipo || moradia.location ? (
                                        <Text style={styles.contextWhere}>
                                            {[moradia.tipo, moradia.andar ? `${moradia.andar}º andar` : null, moradia.location]
                                                .filter(Boolean).join(' · ')}
                                        </Text>
                                    ) : null}
                                </View>

                                {/* Score */}
                                <View style={styles.scoreBox}>
                                    <Text style={styles.scoreNumberBig}>{stats.risks}</Text>
                                    <Text style={styles.scoreLabel}>{t('headersFirst.riscoS', 'risco(s)')}</Text>
                                </View>
                            </View>
                        </SafeAreaView>
                        </AppBackground>
                    </LinearGradient>
                </View>

                {/* ═══ SEU RELATÓRIO PERSONALIZADO ═══ */}
                <View style={styles.section}>
                    {!aiReport ? (
                        <View style={styles.aiPromoCard}>
                            <View style={styles.aiPromoHeader}>
                                <NeoIcon name="MagicStar" size={20} color={C.primaryDark} />
                                <Text style={styles.aiPromoTitle}>{t('headersFirst.seuRelatRioPersonalizado', 'Seu Relatório Personalizado')}</Text>
                            </View>
                            <Text style={styles.aiPromoText}>
                                {generatingAi
                                    ? 'Analisando seus dados de perfil, saúde, moradia e vistoria...'
                                    : 'Preparando sua análise personalizada com Inteligência Artificial...'}
                            </Text>
                            <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                                <ActivityIndicator size="small" color={C.primary} />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.aiResultContainer}>
                            <View style={styles.aiResultHeaderRow}>
                                <NeoIcon name="MagicStar" size={24} color={C.primary} variant="Bulk" />
                                <Text style={styles.aiResultMainTitle}>{t('headersFirst.seuRelatRioPersonalizado', 'Seu Relatório Personalizado')}</Text>
                            </View>

                            {/* QUEM */}
                            <View style={styles.aiCard}>
                                <View style={styles.aiCardHeader}>
                                    <NeoIcon name="Profile" size={16} color={C.primaryDark} />
                                    <Text style={styles.aiCardTitle}>{t('headersFirst.oMorador', 'O Morador')}</Text>
                                </View>
                                <Text style={styles.aiCardText}>{aiReport.quem}</Text>
                            </View>

                            {/* ONDE */}
                            <View style={[styles.aiCard, { borderLeftColor: C.warning }]} >
                                <View style={styles.aiCardHeader}>
                                    <NeoIcon name="Home2" size={16} color={C.warning} />
                                    <Text style={[styles.aiCardTitle, { color: C.warning }]}>{t('headersFirst.oAmbiente', 'O Ambiente')}</Text>
                                </View>
                                <Text style={styles.aiCardText}>{aiReport.onde}</Text>
                            </View>

                            {/* O QUE */}
                            <View style={[styles.aiCard, { borderLeftColor: C.danger }]} >
                                <View style={styles.aiCardHeader}>
                                    <NeoIcon name="Warning2" size={16} color={C.danger} />
                                    <Text style={[styles.aiCardTitle, { color: C.danger }]}>{t('headersFirst.pontosDeAtenO', 'Pontos de Atenção')}</Text>
                                </View>
                                <Text style={styles.aiCardText}>{aiReport.o_que}</Text>
                            </View>

                            {/* COMO */}
                            <View style={[styles.aiCard, { borderLeftColor: C.success }]} >
                                <View style={styles.aiCardHeader}>
                                    <NeoIcon name="ShieldTick" size={16} color={C.success} />
                                    <Text style={[styles.aiCardTitle, { color: C.success }]}>{t('headersFirst.planoDeAO', 'Plano de Ação')}</Text>
                                </View>
                                <Text style={styles.aiCardText}>{aiReport.como}</Text>
                            </View>

                            <Text style={styles.aiTimestamp}>Gerado por IA estruturada em: {formatAckDate(aiReport.generatedAt)}</Text>
                        </View>
                    )}
                </View>

                {/* ═══ IRREGULARIDADES ATIVAS (MOVED DOWN IN CONSULTATIVE) ═══ */}
                {activeRisks.length > 0 && mode === 'protecao' ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionBadgeDanger}>
                                <Text style={styles.sectionBadgeText}>{activeRisks.length}</Text>
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>{t('headersFirst.irregularidadesAtivas', 'Irregularidades Ativas')}</Text>
                                <Text style={styles.sectionSubtitle}>{t('headersFirst.requeremSuaAtenO', 'Requerem sua atenção')}</Text>
                            </View>
                        </View>
                        {activeRisks.map((item, idx) => (
                            <RiskCard
                                key={`risk-${idx}`}
                                item={item}
                                profileName={profile.nome}
                                onAcknowledge={handleAcknowledge}
                                onNavigate={(roomKey) => navigation.navigate('ChecklistDetail', { roomId: roomKey })}
                            />
                        ))}
                    </View>
                ) : null}

                {/* ═══ IRREGULARIDADES EM MODO CONSULTIVO (SECUNDARIZADAS) ═══ */}
                {activeRisks.length > 0 && mode === 'consultivo' ? (
                    <View style={styles.section}>
                        <TouchableOpacity
                            onPress={() => setMode('protecao')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                backgroundColor: C.neutral100,
                                borderRadius: 12,
                                borderStyle: 'dashed',
                                borderWidth: 1,
                                borderColor: C.neutral300
                            }}
                        >
                            <NeoIcon name="DocumentText" size={16} color={C.neutral500} style={{ marginRight: 8 }} />
                            <Text style={{ color: C.neutral500, fontWeight: '600' }}>Ver lista técnica de {activeRisks.length} riscos</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {/* ═══ ITENS RECONHECIDOS ═══ */}
                {ackRisks.length > 0 && mode === 'protecao' ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionBadgeAck}>
                                <Text style={styles.sectionBadgeText}>{ackRisks.length}</Text>
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>{t('headersFirst.reconhecidosPeloResponsVel', 'Reconhecidos pelo Responsável')}</Text>
                                <Text style={styles.sectionSubtitle}>{t('headersFirst.registradoComDataENome', 'Registrado com data e nome')}</Text>
                            </View>
                        </View>
                        {ackRisks.map((item, idx) => (
                            <RiskCard
                                key={`ack-${idx}`}
                                item={item}
                                profileName={profile.nome}
                                onAcknowledge={handleAcknowledge}
                                onNavigate={(roomKey) => navigation.navigate('ChecklistDetail', { roomId: roomKey })}
                            />
                        ))}
                    </View>
                ) : null}

                {/* ═══ ITENS NÃO VERIFICADOS ═══ */}
                {pendingItems && pendingItems.length > 0 ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionBadgeWarn}>
                                <Text style={styles.sectionBadgeText}>{pendingItems.length}</Text>
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>{t('headersFirst.nOVerificados', 'Não Verificados')}</Text>
                                <Text style={styles.sectionSubtitle}>{t('headersFirst.completeAVistoriaParaDiagnSticoPreciso', 'Complete a vistoria para diagnóstico preciso')}</Text>
                            </View>
                        </View>
                        <View style={styles.pendingCard}>
                            {pendingItems.slice(0, 8).map((item, idx) => (
                                <TouchableOpacity
                                    key={`pending-${idx}`}
                                    style={styles.pendingRow}
                                    onPress={() => navigation.navigate('ChecklistDetail', { roomId: item.roomKey })}
                                >
                                    <Text style={styles.pendingEmoji}>{item.roomEmoji}</Text>
                                    <Text style={styles.pendingText} numberOfLines={1}>{item.titulo}</Text>
                                    <NeoIcon name="ArrowRight2" size={14} color={C.neutral500} />
                                </TouchableOpacity>
                            ))}
                            {pendingItems.length > 8 ? (
                                <Text style={styles.pendingMore}>
                                    +{pendingItems.length - 8} outros itens pendentes...
                                </Text>
                            ) : null}
                        </View>
                    </View>
                ) : null}

                {/* ═══ DICA EDUCATIVA ═══ */}
                {curiosity ? (
                    <View style={styles.section}>
                        <View style={styles.curiosityCard}>
                            <NeoIcon name="InfoCircle" size={20} color={C.primary} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.curiosityTitle}>{t('headersFirst.vocSabia', 'Você sabia?')}</Text>
                                <Text style={styles.curiosityText}>{curiosity.text || ''}</Text>
                            </View>
                        </View>
                    </View>
                ) : null}

                {/* ═══ DATA DE GERAÇÃO ═══ */}
                <View style={styles.section}>
                    <Text style={styles.generatedAt}>
                        Relatório gerado em {new Date(report.generatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })} · Vigilaro Care
                    </Text>
                </View>

                {/* ═══ OUTROS MORADORES ═══ */}
                {otherProfiles && otherProfiles.length > 0 ? (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('headersFirst.outrosMoradores', 'Outros moradores')}</Text>
                        <View style={styles.miniCardGrid}>
                            {otherProfiles.map((p) => (
                                <TouchableOpacity
                                    key={p.id}
                                    style={styles.miniCardWrapper}
                                    onPress={() => setActiveProfileId(p.id)}
                                >
                                    <View style={styles.miniCardInner}>
                                        <View style={[styles.miniAvatar, { backgroundColor: (TYPE_COLOR[p.tipo] || C.primary) + '20' }]}>
                                            {p.foto ? (
                                                <Image source={{ uri: p.foto }} style={styles.miniAvatarImage} />
                                            ) : (
                                                <NeoIcon name={p.tipo === 'pet' ? 'paw' : 'person'} size={18} color={TYPE_COLOR[p.tipo] || C.primary} />
                                            )}
                                        </View>
                                        <Text style={styles.miniName} numberOfLines={1}>{(p.nome || '').split(' ')[0]}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ) : null}

                <View style={{ height: 120 }} />
            </ScrollView>
        </View>
    );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: C.neutral100 },
    scrollContent: { paddingBottom: 120 },

    // Loading
    loading: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40, backgroundColor: C.neutral100 },
    loadingTitle: { fontSize: 17, fontWeight: '700', color: C.neutral900, marginTop: 16, textAlign: 'center' },
    loadingSubtitle: { fontSize: 13, color: C.neutral500, marginTop: 6, textAlign: 'center', lineHeight: 20 },

    // Header
    header: { paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 4 },
    headerTitle: { fontSize: 16, fontWeight: '700', color: C.white },
    iconBtn: { padding: 8 },

    // Context block (quem, onde)
    contextBlock: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 14 },
    avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2.5, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 12, overflow: 'hidden' },
    avatarImage: { width: '100%', height: '100%', borderRadius: 28 },
    contextInfo: { flex: 1 },
    contextName: { fontSize: 19, fontWeight: '800', color: C.white, lineHeight: 24 },
    contextMetaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    typePill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20, marginRight: 8 },
    typePillText: { color: C.white, fontWeight: '700', fontSize: 11 },
    contextAge: { color: 'rgba(255,255,255,0.75)', fontSize: 13 },
    contextWhere: { fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 3 },
    scoreBox: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
    scoreNumberBig: { fontSize: 26, fontWeight: '900', color: C.white },
    scoreLabel: { fontSize: 10, color: 'rgba(255,255,255,0.8)', marginTop: -2 },

    // Section
    section: { paddingHorizontal: 20, marginTop: 22 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: C.neutral900 },
    sectionSubtitle: { fontSize: 12, color: C.neutral500, marginTop: 1 },
    sectionBadgeDanger: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.dangerLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    sectionBadgeAck: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.ackLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    sectionBadgeWarn: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.warningLight, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    sectionBadgeText: { fontSize: 13, fontWeight: '800', color: C.neutral700 },

    // AI Section
    aiPromoCard: { backgroundColor: C.primaryLight, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: Neo.colors.primary[300] },
    aiPromoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
    aiPromoTitle: { fontSize: 16, fontWeight: '800', color: C.primaryDark },
    aiPromoText: { fontSize: 13, color: C.primaryDark, lineHeight: 20, marginBottom: 16 },
    btnAiGenerate: { flexDirection: 'row', backgroundColor: C.primary, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 6 },
    btnAiGenerateText: { color: C.white, fontWeight: '700', fontSize: 13 },

    aiResultContainer: { gap: 12 },
    aiResultHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6, paddingHorizontal: 4 },
    aiResultMainTitle: { fontSize: 18, fontWeight: '800', color: C.neutral900 },

    aiCard: { backgroundColor: C.white, borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: C.primary, ...Neo.shadows.sm },
    aiCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 },
    aiCardTitle: { fontSize: 14, fontWeight: '800', color: C.primaryDark },
    aiCardText: { fontSize: 13, color: C.neutral700, lineHeight: 21 },
    aiTimestamp: { fontSize: 10, color: C.neutral500, textAlign: 'center', marginTop: 6, fontStyle: 'italic' },

    // All clear
    allClearCard: { backgroundColor: C.successLight, borderRadius: 20, padding: 24, alignItems: 'center' },
    allClearText: { fontSize: 15, fontWeight: '700', color: C.success, marginTop: 12, textAlign: 'center' },

    // Risk Card
    riskCard: { backgroundColor: C.white, borderRadius: 18, marginBottom: 14, flexDirection: 'row', overflow: 'hidden', ...Neo.shadows.sm },
    riskCardAck: { backgroundColor: 'transparent', opacity: 0.9 },
    riskSidebar: { width: 5 },
    riskBody: { flex: 1, padding: 16 },
    riskEnvRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    riskEnvEmoji: { fontSize: 14, marginRight: 5 },
    riskEnvLabel: { fontSize: 12, color: C.neutral500, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
    riskTitle: { fontSize: 15, fontWeight: '800', color: C.neutral900, marginBottom: 10 },

    // Implication block
    implicationBlock: { backgroundColor: C.dangerLight, borderRadius: 12, padding: 12, marginBottom: 10 },
    implicationBlockAck: { backgroundColor: C.ackLight },
    implicationLabel: { fontSize: 11, fontWeight: '700', color: C.danger, textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 5 },
    implicationText: { fontSize: 13, color: Neo.colors.neutral[900], lineHeight: 19 },

    // Tip
    tipBlock: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: C.primaryLight, borderRadius: 10, padding: 10, marginBottom: 12 },
    tipText: { fontSize: 12, color: C.primaryDark, lineHeight: 18, flex: 1, marginLeft: 7 },

    // Actions
    actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    btnResolve: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.primary, borderRadius: 12, paddingVertical: 10, gap: 6 },
    btnResolveText: { color: C.white, fontWeight: '700', fontSize: 13 },
    btnAck: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.ackLight, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, gap: 5 },
    btnAckText: { color: C.ack, fontWeight: '600', fontSize: 12 },

    // Acknowledged banner
    ackBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.ackLight, borderRadius: 10, padding: 10 },
    ackText: { fontSize: 12, color: C.ack, marginLeft: 7, flex: 1, fontStyle: 'italic' },

    // Pending
    pendingCard: { backgroundColor: C.white, borderRadius: 18, overflow: 'hidden', ...Neo.shadows.sm },
    pendingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: C.neutral100 },
    pendingEmoji: { fontSize: 16, marginRight: 10 },
    pendingText: { flex: 1, fontSize: 13, color: C.neutral700 },
    pendingMore: { fontSize: 12, color: C.neutral500, textAlign: 'center', paddingVertical: 12 },

    // Curiosity
    curiosityCard: { backgroundColor: C.white, borderRadius: 18, padding: 16, flexDirection: 'row', borderLeftWidth: 4, borderLeftColor: C.primary, ...Neo.shadows.sm },
    curiosityTitle: { fontSize: 13, fontWeight: '700', color: C.primary, marginBottom: 4 },
    curiosityText: { fontSize: 13, color: C.neutral700, lineHeight: 19, fontStyle: 'italic' },

    // Generated at
    generatedAt: { fontSize: 11, color: C.neutral500, textAlign: 'center', paddingVertical: 4 },

    // Other profiles
    miniCardGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, marginHorizontal: -6 },
    miniCardWrapper: { width: '25%', paddingHorizontal: 6, marginBottom: 12 },
    miniCardInner: { width: '100%', alignItems: 'center', backgroundColor: C.white, paddingVertical: 12, paddingHorizontal: 4, borderRadius: 16, ...Neo.shadows.sm },
    miniAvatar: { width: 38, height: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 5, overflow: 'hidden' },
    miniAvatarImage: { width: '100%', height: '100%', borderRadius: 19 },
    miniName: { fontSize: 11, fontWeight: '600', color: C.neutral700, textAlign: 'center' },
});
