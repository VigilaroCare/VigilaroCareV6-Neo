/**
 * ProgressoDoChecklist.js — o cartão de progresso de um checklist: "x/y verificados", a porcentagem e a barra.
 *
 * POR QUE EXISTE
 * ChecklistVisit e ChecklistReforma tinham o mesmo cartão escrito duas vezes, com cartão branco fixo e
 * hex de verde/cinza presos na paleta clara. Aqui as cores vêm do tema, e a barra é a
 * AnimatedProgressBar (já respeita "reduzir movimento").
 *
 * @param {number} concluidos
 * @param {number} total
 * @param {import('react').ReactNode} [extra]   algo ao lado da porcentagem (ex.: "Duração: 7d")
 */
import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoCard from './NeoCard';
import AnimatedProgressBar from './AnimatedProgressBar';
import { H3, Small } from './NeoTypography';
import { withAlpha } from '../utils/DesignSystem2026';
import { useThemeDS } from '../utils/ThemeContext';

export default function ProgressoDoChecklist({ concluidos, total, extra, style }) {
    const { t } = useTranslation();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    const percentual = total > 0 ? Math.round((concluidos / total) * 100) : 0;
    const completo = percentual === 100;

    return (
        <NeoCard variant="elevated" padding={14} style={style}>
            <View style={s.linha}>
                <Small style={s.contagem}>
                    {concluidos}/{total}{t('checklists.verificados', ' verificados')}
                </Small>
                <View style={s.direita}>
                    {extra}
                    <H3 style={[s.percentual, completo && { color: tema.colors.textOn.success }]}>{percentual}%</H3>
                </View>
            </View>
            <AnimatedProgressBar
                value={percentual}
                height={8}
                color={completo ? tema.colors.feedback.success : tema.colors.primary[500]}
                trackColor={withAlpha(tema.colors.textOn.muted, 0.18)}
                duration={500}
                accessibilityLabel={`${percentual}%`}
            />
        </NeoCard>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    contagem: { color: Neo.colors.textOn.muted, fontWeight: '600' },
    direita: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    percentual: { color: Neo.colors.textOn.brand },
});
