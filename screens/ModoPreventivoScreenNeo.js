import { useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, ScrollView, TouchableOpacity, Modal, LayoutAnimation, Image, Text, Animated, StyleSheet } from 'react-native';
import NeoIcon from '../components/NeoIcon';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// Services & Utils
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';
import { RISK_CATEGORIES } from '../data/RiskCategories';

// Neo Components
import NeoCard from '../components/NeoCard';
import NeoHorizontalCard from '../components/NeoHorizontalCard';
import { H2, H3, Body, Small } from "../components/NeoTypography";
import TriColorBar from '../components/TriColorBar';
import FadeInView from '../components/FadeInView';

import AppBackground from '../components/AppBackground';
import NeoAlert from '../utils/NeoAlert';
import NeoHeroHeader from '../components/NeoHeroHeader';
import ScoreService from '../services/ScoreService';

export default function ModoPreventivoScreenNeo({ navigation }) {
    const { t } = useTranslation();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const insets = useSafeAreaInsets();
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Audit State
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [showEducation, setShowEducation] = useState(false);

    const handleRiskPress = (risk) => {
        if (risk.action === 'NAVIGATE_SCANNER') {
            navigation.navigate('Scanner', { mode: 'label_scan' });
            return;
        }

        setSelectedRisk(risk);
        setUserAnswers([]);
        setShowResult(false);
        setShowEducation(true);
        setModalVisible(true);
    };

    const startAudit = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowEducation(false);
    };

    const handleStatusSelect = (questionId, status) => {
        const question = selectedRisk.questions.find(q => q.id === questionId);

        // Mapear status para as opções da questão
        let selectedOption = null;
        let isSafe = false;

        if (status === 'conforme') {
            selectedOption = question.options.find(o => o.safe);
            isSafe = true;
        } else if (status === 'risco') {
            selectedOption = question.options.find(o => !o.safe);
            isSafe = false;
        } else if (status === 'na') {
            selectedOption = { label: 'N/A' };
            isSafe = true; // NA doesn't count as risk
        }

        const newAnswer = {
            questionId: question.id,
            questionText: question.text,
            selectedOption: selectedOption?.label,
            isSafe: isSafe,
            status: status,
            consequence: !isSafe && status !== 'na' ? question.consequence : null,
            checkAction: !isSafe && status !== 'na' ? question.checkAction : null,
        };

        const updatedAnswers = userAnswers.filter(a => a.questionId !== questionId);
        setUserAnswers([...updatedAnswers, newAnswer]);
    };

    const closeAudit = () => {
        setModalVisible(false);
        setSelectedRisk(null);
        setShowResult(false);
        setShowEducation(false);
    };

    // Result Calculation
    const getQuestionsWithStatus = () => {
        if (!selectedRisk) return [];
        return selectedRisk.questions.map(q => {
            const answer = userAnswers.find(a => a.questionId === q.id);
            return { ...q, status: answer?.status || null };
        });
    };

    const questionsWithStatus = getQuestionsWithStatus();
    const completedCount = userAnswers.length;
    const totalCount = selectedRisk?.questions?.length || 0;
    const naCount = userAnswers.filter(a => a.status === 'na').length;
    const effectiveTotal = totalCount - naCount;
    const safeAnswers = userAnswers.filter(a => a.isSafe).length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const safetyScore = effectiveTotal > 0 ? Math.round((safeAnswers / effectiveTotal) * 100) : 0;

    // Limiar unico do ScoreService em vez do 70 local.
    const getStatusColor = () => ({
        success: Neo.colors.feedback.success,
        warning: Neo.colors.feedback.warning,
        error: Neo.colors.feedback.error,
        muted: Neo.colors.neutral[500],
    }[ScoreService.getTom(safetyScore)]);



    const titleStr = t('headersFirst.atividadesEventuais', 'Atividades Eventuais');
    const capaSource = require('../assets/illustrations/pad/hero_preventivo.png');
    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <AppBackground>
            
                

                {/* Padrão "Anatomia Editorial": título solto H1 à esquerda,
                    sem card-moldura (PADRAO_ANATOMIA_PAGINAS.md) */}
                
            <SafeAreaView edges={['top']} style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 44, height: 44, borderRadius: 22,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        justifyContent: 'center', alignItems: 'center',
                        marginLeft: 16, marginTop: 12,
                    }}
                >
                    <NeoIcon name="ArrowLeft2" size={24} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>

            <Animated.ScrollView
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
            >
                {/* HERO com parallax */}
                <NeoHeroHeader
                    scrollY={scrollY}
                    source={capaSource}
                    title={titleStr}
                    height={260}
                />

                {/* Main Content */}
                <View style={{ marginTop: 24, paddingHorizontal: 24 }}>
                    {/* Info bar */}
                    <FadeInView delay={100}>
                        <View style={styles.infoBar}>
                            <NeoIcon name="ClipboardText" size={13} color={themeColors.neutral[500]} style={{ marginRight: 6 }} />
                            <Text style={[styles.infoText, { color: themeColors.neutral[500] }]}>
                                {RISK_CATEGORIES.length} categorias • Toque para iniciar a verificação
                            </Text>
                        </View>
                    </FadeInView>

                    {RISK_CATEGORIES.map((item, idx) => {
                        return (
                            <FadeInView key={item.id} delay={150 + idx * 50}>
                                <NeoHorizontalCard
                                    title={item.title}
                                    description={item.educational?.description || "Auditoria preventiva do ambiente"}
                                    iconName={item.icon}
                                    imageUrl={item.image}
                                    color={item.color}
                                    onPress={() => handleRiskPress(item)}
                                />
                            </FadeInView>
                        );
                    })}
                </View>
            </Animated.ScrollView>
                {/* AUDIT MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeAudit}
                    statusBarTranslucent={true}
                >
                    <AppBackground>
                        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={showEducation ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right']}>
                            {selectedRisk && (
                                <View style={{ flex: 1 }}>

                                    {/* Modal Header for Checklists/Results */}
                                    {!showEducation && (
                                        <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Neo.colors.neutral[200] }}>
                                            <TouchableOpacity onPress={closeAudit}>
                                                <NeoIcon name="CloseSquare" size={24} color={Neo.colors.neutral[900]} />
                                            </TouchableOpacity>
                                            <Body style={{ fontWeight: 'bold' }}>{selectedRisk.title}</Body>
                                            <View style={{ width: 24 }} />
                                        </View>
                                    )}

                                    {/* CONTENT */}
                                    {showEducation && (
                                        <View style={{ flex: 1 }}>
                                            <View style={{ position: 'absolute', top: Math.max(insets.top, 16) + 16, left: 16, zIndex: 10 }}>
                                                <TouchableOpacity onPress={closeAudit} style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
                                                    <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[900]} />
                                                </TouchableOpacity>
                                            </View>
                                            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
                                                <Image 
                                                    source={typeof selectedRisk.image === 'string' ? { uri: selectedRisk.image } : selectedRisk.image} 
                                                    style={{ width: '100%', height: 260, backgroundColor: themeColors.neutral[200] }} 
                                                    resizeMode="cover" 
                                                />
                                                <View style={{ paddingHorizontal: 24 }}>
                                                    <View style={{ alignItems: 'center', marginBottom: 24 }}>
                                                        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: selectedRisk.color + '15', alignItems: 'center', justifyContent: 'center', marginTop: -36, borderWidth: 4, borderColor: '#fff', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
                                                            <NeoIcon name={selectedRisk.icon} size={36} color={selectedRisk.color} variant="Bold" />
                                                        </View>
                                                        <H2 style={{ textAlign: 'center', marginTop: 12 }}>{t('headersFirst.guiaDeSeguranA', 'Guia de Segurança')}</H2>
                                                    </View>

                                                    <Body style={{ marginBottom: 24, lineHeight: 22 }}>
                                                        {selectedRisk.educational?.description || "Siga as instruções de segurança abaixo."}
                                                    </Body>

                                                    <H3 style={{ marginBottom: 16 }}>{t('headersFirst.dicasDeOuro', 'Dicas de Ouro:')}</H3>
                                                    {selectedRisk.educational?.keyPoints?.map((point, index) => (
                                                        <View key={index} style={{ flexDirection: 'row', marginBottom: 12 }}>
                                                            <NeoIcon name="TickCircle" size={20} color={selectedRisk.color} style={{ marginRight: 12, marginTop: 2 }} />
                                                            <Body style={{ flex: 1 }}>{point}</Body>
                                                        </View>
                                                    ))}

                                                    <TouchableOpacity
                                                        style={{ backgroundColor: selectedRisk.color, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 24 }}
                                                        onPress={startAudit}
                                                    >
                                                        <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('headersFirst.iniciarVerificaO', 'Iniciar Verificação')}</Body>
                                                    </TouchableOpacity>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    )}

                                    {!showEducation && !showResult && (
                                        <View style={{ flex: 1 }}>
                                            {/* Progress + Tri-Color Bar */}
                                            <View style={{ padding: 20, backgroundColor: 'rgba(255,255,255,0.3)', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                    <Small style={{ fontWeight: '600', color: Neo.colors.neutral[700] }}>{completedCount} de {totalCount} verificados</Small>
                                                    <Small style={{ fontWeight: 'bold', color: Neo.colors.neutral[900] }}>{percentage}%</Small>
                                                </View>
                                                {(() => {
                                                    const dist = TriColorBar.calculate(
                                                        userAnswers,
                                                        selectedRisk?.questions
                                                    );
                                                    return <TriColorBar {...dist} height={8} showLabels={completedCount > 0} />;
                                                })()}
                                            </View>

                                            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                                                {/* Educational Tip (Compact) */}
                                                <View style={{ padding: 16, backgroundColor: selectedRisk.color + '10', margin: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: selectedRisk.color }}>
                                                    <Body style={{ fontSize: 13, color: Neo.colors.neutral[800], lineHeight: 19 }}>
                                                        {selectedRisk.educational?.description}
                                                    </Body>
                                                </View>

                                                {questionsWithStatus.map((item, index) => (
                                                    <View
                                                        key={item.id}
                                                        style={{
                                                            flexDirection: 'row',
                                                            paddingVertical: 16,
                                                            paddingHorizontal: 20,
                                                            borderBottomWidth: 1,
                                                            borderBottomColor: 'rgba(0,0,0,0.04)',
                                                            backgroundColor: 'rgba(255,255,255,0.2)'
                                                        }}
                                                    >
                                                        <View style={{ flex: 1, paddingRight: 12 }}>
                                                            <Body style={{ fontWeight: '500', lineHeight: 20 }}>{item.text}</Body>
                                                        </View>

                                                        {/* Botões S / N / NA (PADRÃO VISTORIAS) */}
                                                        <View style={{ flexDirection: 'row', gap: 8 }}>
                                                            <TouchableOpacity
                                                                onPress={() => handleStatusSelect(item.id, 'conforme')}
                                                                style={{
                                                                    width: 42, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                                                                    backgroundColor: item.status === 'conforme' ? Neo.colors.feedback.success : '#F0FDF4',
                                                                    borderWidth: item.status === 'conforme' ? 0 : 1.5,
                                                                    borderColor: Neo.colors.primary[200]
                                                                }}
                                                            >
                                                                <Text style={{ fontWeight: 'bold', color: item.status === 'conforme' ? Neo.colors.neutral.white : Neo.colors.primary[900] }}>S</Text>
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => handleStatusSelect(item.id, 'risco')}
                                                                style={{
                                                                    width: 42, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                                                                    backgroundColor: item.status === 'risco' ? Neo.colors.feedback.error : '#FEF2F2',
                                                                    borderWidth: item.status === 'risco' ? 0 : 1.5,
                                                                    borderColor: '#FCA5A5' // TODO: map to DS token — light red accent, no exact match
                                                                }}
                                                            >
                                                                <Text style={{ fontWeight: 'bold', color: item.status === 'risco' ? Neo.colors.neutral.white : '#991B1B' }}>N</Text>
                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    handleStatusSelect(item.id, 'na');
                                                                    // Smart Logic: If it's the first question and marked NA, ask if want to skip category
                                                                    if (index === 0) {
                                                                        NeoAlert.alert(
                                                                            "Ambiente Não Aplicável?",
                                                                            "Deseja marcar este ambiente inteiro como não aplicável e finalizar?",
                                                                            [
                                                                                { text: "Não, apenas esta", style: "cancel" },
                                                                                {
                                                                                    text: "Sim, Pular Ambiente",
                                                                                    onPress: () => {
                                                                                        // Mark all remaining questions as NA
                                                                                        const remainingNA = selectedRisk.questions.map(q => ({
                                                                                            questionId: q.id,
                                                                                            questionText: q.text,
                                                                                            selectedOption: 'N/A',
                                                                                            isSafe: true,
                                                                                            status: 'na'
                                                                                        }));
                                                                                        setUserAnswers(remainingNA);
                                                                                        setShowResult(true);
                                                                                    }
                                                                                }
                                                                            ]
                                                                        );
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: 42, height: 42, borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                                                                    backgroundColor: item.status === 'na' ? Neo.colors.neutral[700] : Neo.colors.neutral[200],
                                                                    borderWidth: item.status === 'na' ? 0 : 1.5,
                                                                    borderColor: Neo.colors.neutral[300]
                                                                }}
                                                            >
                                                                <Text style={{ fontWeight: 'bold', fontSize: 12, color: item.status === 'na' ? Neo.colors.neutral.white : Neo.colors.neutral[700] }}>NA</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                ))}

                                                <View style={{ padding: 24, paddingBottom: 60 }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            backgroundColor: selectedRisk.color,
                                                            padding: 16,
                                                            borderRadius: 12,
                                                            alignItems: 'center',
                                                            opacity: percentage < 100 ? 0.6 : 1
                                                        }}
                                                        onPress={() => {
                                                            if (percentage === 100) setShowResult(true);
                                                            else NeoAlert.alert("Atenção", "Responda a todas as questões para concluir.");
                                                        }}
                                                    >
                                                        <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('headersFirst.finalizarProtocolo', 'Finalizar Protocolo')}</Body>
                                                    </TouchableOpacity>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    )}

                                    {showResult && (
                                        <ScrollView contentContainerStyle={{ padding: 24 }}>
                                            <View style={{ alignItems: 'center', marginBottom: 24 }}>
                                                <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: getStatusColor(), alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                                    <NeoIcon name={safetyScore === 100 ? "TickCircle" : "Danger"} size={40} color={Neo.colors.neutral.white} />
                                                </View>
                                                <H2>{safetyScore}% Seguro</H2>
                                                <Body style={{ textAlign: 'center', color: Neo.colors.neutral[600], marginTop: 8 }}>
                                                    {safetyScore === 100 ? "Ambiente verificado e seguro!" : `Encontramos ${userAnswers.filter(a => !a.isSafe && a.status !== 'na').length} pontos de atenção.`}
                                                </Body>
                                            </View>

                                            {/* Tri-Color Bar — Distribuição B/A/V */}
                                            <NeoCard variant="glass" style={{ padding: 16, marginBottom: 24, backgroundColor: 'rgba(255,255,255,0.6)' }}>
                                                <Small style={{ fontWeight: '700', color: Neo.colors.neutral[700], marginBottom: 8 }}>{t('headersFirst.dISTRIBUIODECONFORMIDADE', 'DISTRIBUIÇÃO DE CONFORMIDADE')}</Small>
                                                {(() => {
                                                    const dist = TriColorBar.calculate(userAnswers, selectedRisk?.questions);
                                                    return <TriColorBar {...dist} height={12} showLabels={true} showLegend={true} />;
                                                })()}
                                            </NeoCard>

                                            {(() => {
                                                const pendencias = userAnswers.filter(a => !a.isSafe && a.status !== 'na');
                                                if (pendencias.length === 0) {
                                                    return (
                                                        <NeoCard style={{ padding: 20, alignItems: 'center', backgroundColor: Neo.colors.primary[100] }}>
                                                            <NeoIcon name="TickCircle" size={32} color={Neo.colors.feedback.success} />
                                                            <H3 style={{ color: Neo.colors.primary[700], marginTop: 12 }}>{t('headersFirst.excelente', 'Excelente!')}</H3>
                                                            <Body style={{ textAlign: 'center', color: Neo.colors.primary[900], marginTop: 8 }}>
                                                                {t('headersFirst.nenhumaPendNciaIdentificadaOAmbienteEstS', 'Nenhuma pendência identificada. O ambiente está seguro.')}
                                                            </Body>
                                                        </NeoCard>
                                                    );
                                                }

                                                // Ordenar pendências: Críticos primeiro
                                                const pendenciasOrdenadas = [...pendencias].sort((a, b) => {
                                                    const qA = selectedRisk?.questions.find(q => q.id === a.questionId);
                                                    const qB = selectedRisk?.questions.find(q => q.id === b.questionId);
                                                    const critA = qA?.critico ? 1 : 0;
                                                    const critB = qB?.critico ? 1 : 0;
                                                    return critB - critA; // decrescente
                                                });

                                                return (
                                                    <View>
                                                        <H3 style={{ marginBottom: 16 }}>{t('headersFirst.pontosDeAtenO', 'Pontos de Atenção')}</H3>
                                                        <View style={{ gap: 12 }}>
                                                            {pendenciasOrdenadas.map((answer, index) => {
                                                                const qObj = selectedRisk?.questions.find(q => q.id === answer.questionId);
                                                                const isCritico = qObj?.critico;

                                                                return (
                                                                    <NeoCard key={index} style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.8)', borderLeftWidth: 4, borderLeftColor: isCritico ? Neo.colors.feedback.error : Neo.colors.feedback.warning }} variant="glass">
                                                                        <View style={{ flexDirection: 'row', gap: 12 }}>
                                                                            <NeoIcon name="Danger" size={22} color={isCritico ? Neo.colors.feedback.error : Neo.colors.feedback.warning} />
                                                                            <View style={{ flex: 1 }}>
                                                                                <Body style={{ fontWeight: 'bold', fontSize: 13, marginBottom: 4 }}>{answer.questionText}</Body>
                                                                                <View style={{ marginTop: 8, padding: 10, backgroundColor: isCritico ? 'rgba(211, 47, 47, 0.1)' : 'rgba(255, 179, 0, 0.1)', borderRadius: 8 }}>
                                                                                    <Small style={{ color: isCritico ? Neo.colors.feedback.error : Neo.colors.feedback.warning, fontWeight: 'bold' }}>
                                                                                        AÇÃO: {answer.checkAction}
                                                                                    </Small>
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </NeoCard>
                                                                );
                                                            })}
                                                        </View>
                                                    </View>
                                                );
                                            })()}

                                            <TouchableOpacity
                                                style={{ backgroundColor: getStatusColor(), padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 32, marginBottom: 40 }}
                                                onPress={closeAudit}
                                            >
                                                <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('headersFirst.fechar', 'Fechar')}</Body>
                                            </TouchableOpacity>
                                        </ScrollView>
                                    )}

                                </View>
                            )}
                        </SafeAreaView>
                    </AppBackground>
                </Modal>
            
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(150,150,150,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 24,
    },
    infoText: {
        fontSize: 13,
        fontWeight: '500',
    },
    guideCardOuter: {
        borderRadius: 24,
        shadowColor: Neo.colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    guideCardInner: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: Neo.colors.neutral.white,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
    },
    guideImageContainer: {
        width: 120,
        height: '100%',
        backgroundColor: Neo.colors.neutral[200],
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
        color: Neo.colors.neutral[900],
        marginBottom: 2,
    },
    guideSubtitle: {
        fontSize: 11.5,
        fontStyle: 'italic',
        color: Neo.colors.neutral[500],
        marginBottom: 6,
    },
    sptText: {
        fontSize: 11.5,
        color: Neo.colors.neutral[600],
        lineHeight: 16,
    },
});
