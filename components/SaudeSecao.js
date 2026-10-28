/**
 * SaudeSecao.js — a seção de uma ficha de saúde (Condições, Alergias, Medicamentos…) e os chips
 * que listam o que está registrado.
 *
 * POR QUE EXISTE
 * Minha Saúde e Saúde Pet tinham, cada uma, a sua cópia de `Section` e de `renderChips`, com as
 * cores no escopo do módulo (presas na paleta clara: no tema escuro o texto saía escuro sobre
 * cartão escuro). Uma peça só, que lê as cores do tema.
 */
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NeoCard from './NeoCard';
import NeoIcon from './NeoIcon';
import { H3, Body, Small } from './NeoTypography';
import { useThemeDS } from '../utils/ThemeContext';
import { withAlpha } from '../utils/DesignSystem2026';

/** Itens como chips coloridos; lista vazia mostra `vazio` ("Nada registrado"). */
export function SaudeChips({ itens = [], cor, vazio }) {
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    if (!itens.length) return <Body style={s.vazio}>{vazio}</Body>;
    return (
        <View style={s.chips}>
            {itens.map((item, i) => (
                <View key={i} style={[s.chip, { backgroundColor: withAlpha(cor, 0.12), borderColor: withAlpha(cor, 0.28) }]}>
                    <Small style={[s.chipTexto, { color: cor }]}>{item}</Small>
                </View>
            ))}
        </View>
    );
}

/** Cartão de seção: ícone + título + o que a seção traz. */
export default function SaudeSecao({ icone, cor, titulo, children }) {
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    return (
        <NeoCard variant="elevated" style={s.cartao}>
            <View style={s.cabecalho}>
                <NeoIcon name={icone} variant="Linear" color={cor} size={22} />
                <H3 style={s.titulo}>{titulo}</H3>
            </View>
            {children}
        </NeoCard>
    );
}

const criarEstilos = (Neo) => StyleSheet.create({
    cartao: { marginBottom: Neo.spacing.md },
    cabecalho: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
    titulo: { fontSize: 16, color: Neo.colors.textOn.ink },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
    chipTexto: { fontWeight: '600' },
    vazio: { color: Neo.colors.textOn.muted, fontStyle: 'italic' },
});
