/**
 * VisitRiskFormScreen — "Quem vai estar nesta visita?": marca os grupos de risco presentes para o
 * checklist ser gerado sob medida.
 *
 * 28/10/2026 — na linguagem da Home: cabeçalho padrão com o NOME da opção que a abriu (Recebendo Visita
 * ou Indo Visitar; era "Fatores de Risco", que passa a rótulo da lista), a lista num cartão só, os
 * ícones do catálogo (os do Ionicons caíam todos no triângulo de alerta) e o botão padrão.
 */
import { useMemo, useState } from 'react';
import { View, ScrollView, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { DS as Neo, withAlpha } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import AppBackground from '../../components/AppBackground';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoCard from '../../components/NeoCard';
import NeoIcon from '../../components/NeoIcon';
import ButtonNeo from '../../components/ButtonNeo';
import { Body, Eyebrow } from '../../components/NeoTypography';
import { RISK_GROUPS, VISIT_TYPES } from '../../data/visitChecklists';
import { t_field } from '../../utils/getLocalizedField';

export default function VisitRiskFormScreen({ route, navigation }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    const { visitType } = route.params;
    const [selectedRisks, setSelectedRisks] = useState({});

    const toggleRisk = (id) => {
        setSelectedRisks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleContinue = () => {
        navigation.navigate('ChecklistVisit', { visitType, selectedRisks });
    };

    // O nome da página é o da opção que a abriu.
    const titulo = visitType === VISIT_TYPES.VISITING
        ? t('headersFirst.indoVisitar', 'Indo Visitar')
        : t('headersFirst.recebendoVisita', 'Recebendo Visita');

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader title={titulo} onBack={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <Body style={s.apoio}>{t('headersFirst.selecioneQuemEstarPresenteNestaVisita', 'Quem vai estar nesta visita?')}</Body>

                        <Eyebrow style={s.rotulo}>{t('headersFirst.fatoresDeRisco', 'Fatores de Risco')}</Eyebrow>
                        <NeoCard variant="elevated" padding={0}>
                            {RISK_GROUPS.map((risk, i) => (
                                <View key={risk.id} style={[s.linha, i > 0 && s.divisor]}>
                                    <NeoIcon name={risk.icon} variant="Linear" size={22} color={tema.colors.textOn.brand} />
                                    <Body style={s.texto}>{t_field(risk, 'label')}</Body>
                                    <Switch
                                        value={!!selectedRisks[risk.id]}
                                        onValueChange={() => toggleRisk(risk.id)}
                                        trackColor={{ false: withAlpha(tema.colors.textOn.muted, 0.3), true: tema.colors.primary[500] }}
                                        thumbColor={tema.colors.neutral.white}
                                        accessibilityLabel={t_field(risk, 'label')}
                                    />
                                </View>
                            ))}
                        </NeoCard>

                        <ButtonNeo
                            title={t('headersFirst.gerarChecklist', 'Gerar Checklist')}
                            iconName="ArrowRight2"
                            onPress={handleContinue}
                            type="primary"
                            style={s.botao}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    corpo: { paddingHorizontal: Neo.spacing.lg, paddingTop: Neo.spacing.sm },
    apoio: { color: Neo.colors.textOn.muted, lineHeight: 21, marginBottom: Neo.spacing.md },
    rotulo: { marginBottom: Neo.spacing.sm },
    linha: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: Neo.spacing.md },
    divisor: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Neo.colors.neutral[300] },
    texto: { flex: 1, color: Neo.colors.textOn.ink, fontWeight: '500' },
    botao: { marginTop: Neo.spacing.lg },
});
