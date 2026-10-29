/**
 * ChecklistVisitScreen.js
 * Checklist de segurança para receber ou fazer visitas
 *
 * 28/10/2026 — na linguagem da Home: cabeçalho padrão, o progresso e as linhas nas peças
 * compartilhadas (ProgressoDoChecklist, LinhaDeChecklist) e o botão padrão. O que NÃO mudou: os itens
 * (por tipo de visita e grupos de risco), o estado guardado no aparelho, os pontos de gamificação e
 * o índice temporário que segue para o Modo Situação.
 */
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VISIT_CHECKLISTS } from '../../data/visitChecklists';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import NeoCard from '../../components/NeoCard';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import ButtonNeo from '../../components/ButtonNeo';
import LinhaDeChecklist from '../../components/LinhaDeChecklist';
import ProgressoDoChecklist from '../../components/ProgressoDoChecklist';
import AppBg from '../../components/AppBackground';
import GamificationService from '../../services/GamificationService';
import { t_field } from '../../utils/getLocalizedField';

export default function ChecklistVisitScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    const { visitType, selectedRisks } = route.params || {};

    const items = useMemo(() => {
        if (!visitType || !VISIT_CHECKLISTS[visitType]) return [];

        const config = VISIT_CHECKLISTS[visitType];
        let list = [...config.base];

        if (selectedRisks && config.risks) {
            Object.keys(selectedRisks).forEach(riskId => {
                if (selectedRisks[riskId] && config.risks[riskId]) {
                    list = [...list, ...config.risks[riskId]];
                }
            });
        }
        return list;
    }, [visitType, selectedRisks]);

    const [state, setState] = useState({});

    useEffect(() => {
        async function loadState() {
            try {
                const key = `@checklist_visit_${visitType}`;
                const saved = await AsyncStorage.getItem(key);
                if (saved) {
                    setState(JSON.parse(saved));
                } else {
                    const initialState = items.reduce((acc, item) => ({ ...acc, [item.key]: false }), {});
                    setState(initialState);
                }
            } catch (e) {
                console.warn('Failed to load checklist state', e);
            }
        }
        loadState();
    }, [items, visitType]);

    const toggle = async (key) => {
        const newState = { ...state, [key]: !state[key] };
        setState(newState);
        try {
            const keyStorage = `@checklist_visit_${visitType}`;
            await AsyncStorage.setItem(keyStorage, JSON.stringify(newState));
        } catch (e) {
            console.warn('Failed to save checklist state', e);
        }
    };

    const completedCount = Object.values(state).filter(Boolean).length;
    const totalCount = items.length;

    const tempIndex = useMemo(() => {
        if (totalCount === 0) return 100;
        const base = 90;
        const penalty = ((totalCount - completedCount) / totalCount) * 40;
        return Math.max(10, Math.round(base - penalty));
    }, [completedCount, totalCount]);

    const isRecebendo = visitType === 'recebendo';

    async function ativarModo() {
        await GamificationService.addPoints('CHECKLIST_COMPLETE');
        navigation.navigate('ModoSituacaoAtiva', {
            type: 'visita',
            title: isRecebendo ? t('telas.ChecklistVisitScreen.recebendoVisita', 'Recebendo Visita') : t('telas.ChecklistVisitScreen.indoVisitar', 'Indo Visitar'),
            tempIndex,
            checklistState: state,
        });
    }

    return (
        <AppBg>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('headersFirst.checklistVisita', 'Checklist: Visita')}
                    subtitle={isRecebendo ? t('telas.ChecklistVisitScreen.prepareSuaCasa', 'Prepare sua casa') : t('telas.ChecklistVisitScreen.fiqueAtentoAoVisitar', 'Fique atento ao visitar')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <ProgressoDoChecklist concluidos={completedCount} total={totalCount} style={s.progresso} />

                        <NeoCard variant="elevated" padding={0}>
                            {items.map((it, idx) => (
                                <LinhaDeChecklist
                                    key={it.key || idx}
                                    rotulo={t_field(it, 'label')}
                                    marcado={!!state[it.key]}
                                    onPress={() => toggle(it.key)}
                                    primeira={idx === 0}
                                />
                            ))}
                        </NeoCard>

                        <ButtonNeo
                            title={isRecebendo ? t('telas.ChecklistVisitScreen.ativarModoVisita', 'Ativar Modo Visita') : t('telas.ChecklistVisitScreen.prontoParaVisitar', 'Pronto para Visitar')}
                            iconName="ArrowRight2"
                            onPress={ativarModo}
                            type="primary"
                            style={s.botao}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBg>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    corpo: { paddingHorizontal: Neo.spacing.lg, paddingTop: Neo.spacing.sm },
    progresso: { marginBottom: Neo.spacing.md },
    botao: { marginTop: Neo.spacing.lg },
});
