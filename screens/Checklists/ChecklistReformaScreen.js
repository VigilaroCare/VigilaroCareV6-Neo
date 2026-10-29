/**
 * ChecklistReformaScreen.js
 * Checklist de segurança para período de reforma
 *
 * 28/10/2026 — na linguagem da Home: cabeçalho padrão, o progresso e as linhas nas peças
 * compartilhadas (ProgressoDoChecklist, LinhaDeChecklist) e o botão padrão. O que NÃO mudou: os itens
 * (por tipo de obra), o estado guardado no aparelho, os pontos de gamificação e o índice temporário
 * que segue para o Modo Situação. O subtítulo "Tipo: HOME" mostrava o código gravado ("casa",
 * "predio", "rural") em maiúsculas; passa a mostrar o nome da opção, no idioma do app.
 */
import { useState, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RENOVATION_CHECKLISTS, RENOVATION_TYPES } from '../../data/renovationChecklists';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import NeoCard from '../../components/NeoCard';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import ButtonNeo from '../../components/ButtonNeo';
import LinhaDeChecklist from '../../components/LinhaDeChecklist';
import ProgressoDoChecklist from '../../components/ProgressoDoChecklist';
import { Small } from '../../components/NeoTypography';
import AppBg from '../../components/AppBackground';
import GamificationService from '../../services/GamificationService';
import { t_field } from '../../utils/getLocalizedField';

export default function ChecklistReformaScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    const { renovationType = RENOVATION_TYPES.HOME } = route.params || {};

    const ITEMS = useMemo(() => {
        return RENOVATION_CHECKLISTS[renovationType] || RENOVATION_CHECKLISTS[RENOVATION_TYPES.HOME];
    }, [renovationType]);

    const [state, setState] = useState({});
    const [durationDays] = useState(7);

    useEffect(() => {
        async function loadState() {
            try {
                const key = `@checklist_reforma_${renovationType}`;
                const saved = await AsyncStorage.getItem(key);
                if (saved) {
                    setState(JSON.parse(saved));
                } else {
                    const initialState = ITEMS.reduce((acc, it) => ({ ...acc, [it.key]: false }), {});
                    setState(initialState);
                }
            } catch (e) {
                console.warn('Failed to load checklist state', e);
            }
        }
        loadState();
    }, [ITEMS, renovationType]);

    const toggle = async (key) => {
        const newState = { ...state, [key]: !state[key] };
        setState(newState);
        try {
            const keyStorage = `@checklist_reforma_${renovationType}`;
            await AsyncStorage.setItem(keyStorage, JSON.stringify(newState));
        } catch (e) {
            console.warn('Failed to save checklist state', e);
        }
    };

    const completedCount = useMemo(() => ITEMS.filter(i => state[i.key]).length, [state, ITEMS]);
    const totalCount = ITEMS.length;

    const tempIndex = useMemo(() => {
        const base = 90;
        const penalty = ((ITEMS.length - completedCount) / ITEMS.length) * 40;
        return Math.max(10, Math.round(base - penalty));
    }, [completedCount, ITEMS]);

    // O nome da opção escolhida na tela anterior, no idioma do app.
    const nomeDoTipo = {
        [RENOVATION_TYPES.HOME]: t('telas.RenovationTypeScreen.tipoCasa', 'Casa / Apartamento'),
        [RENOVATION_TYPES.BUILDING]: t('telas.RenovationTypeScreen.tipoPredio', 'Prédio / Condomínio'),
        [RENOVATION_TYPES.RURAL]: t('telas.RenovationTypeScreen.tipoRural', 'Sítio / Área Rural'),
    }[renovationType] || renovationType;

    async function ativarModo() {
        await GamificationService.addPoints('CHECKLIST_COMPLETE');
        navigation.navigate('ModoSituacaoAtiva', {
            type: 'reforma',
            title: `Reforma (${renovationType})`,
            durationDays,
            tempIndex,
            checklistState: state,
        });
    }

    return (
        <AppBg>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader
                    title={t('headersFirst.checklistReforma', 'Checklist: Reforma')}
                    subtitle={`${t('telas.ChecklistReformaScreen.tipo', 'Tipo: ')}${nomeDoTipo}`}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <ProgressoDoChecklist
                            concluidos={completedCount}
                            total={totalCount}
                            style={s.progresso}
                            extra={<Small style={s.duracao}>{t('telas.ChecklistReformaScreen.duracao', 'Duração: ')}{durationDays}d</Small>}
                        />

                        <NeoCard variant="elevated" padding={0}>
                            {ITEMS.map((it, idx) => (
                                <LinhaDeChecklist
                                    key={it.key}
                                    rotulo={t_field(it, 'label')}
                                    marcado={!!state[it.key]}
                                    onPress={() => toggle(it.key)}
                                    primeira={idx === 0}
                                />
                            ))}
                        </NeoCard>

                        <ButtonNeo
                            title={t('headersFirst.ativarModoReforma', 'Ativar Modo Reforma')}
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
    duracao: { color: Neo.colors.textOn.muted },
    botao: { marginTop: Neo.spacing.lg },
});
