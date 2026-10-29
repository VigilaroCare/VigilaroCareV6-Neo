/**
 * RespostaSNA.js — as três respostas de uma verificação: S (conforme), N (risco) e N/A.
 *
 * POR QUE EXISTE
 * A mesma trinca de botões estava escrita à mão em cinco telas (Vistorias, Plano de Ação, Atividades
 * Eventuais, Escola Segura, Vistoria de Asilo), cada uma com os seus hex soltos (#10B981, #EF4444,
 * #F8FAFC) presos na paleta clara: no tema escuro o botão apagado ficava claro, e o rótulo de
 * acessibilidade nem existia em nenhum idioma. Uma peça só, que lê o tema.
 *
 * AS CORES
 * Botão escolhido = fundo cheio na versão ESCURA do tom (a da paleta clara, como o NeoPill sólido) e
 * letra branca. Botão apagado = o tom a 10% de fundo, borda a 40% e a letra no `textOn` do tema, que
 * já foi aferido em AA contra o fundo de cada tema. A cor nunca é o único sinal (WCAG 1.4.1): a
 * letra diz S, N ou N/A, e o botão escolhido muda de peso.
 *
 * @param {'conforme'|'risco'|'na'|null} valor   a resposta atual
 * @param {(status: string) => void} onChange
 * @param {number} [tamanho]   lado do botão (44 = área de toque mínima)
 */
import { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DS, withAlpha } from '../utils/DesignSystem2026';
import { useThemeDS } from '../utils/ThemeContext';

const OPCOES = [
    { status: 'conforme', letra: 'S', tom: 'success', rotuloKey: 'checklists.statusConforme', rotulo: 'Sim, conforme' },
    { status: 'risco', letra: 'N', tom: 'error', rotuloKey: 'checklists.statusRisco', rotulo: 'Não, risco' },
    { status: 'na', letra: null, tom: 'muted', rotuloKey: 'checklists.statusNA', rotulo: 'Não aplicável' },
];

export default function RespostaSNA({ valor, onChange, tamanho = 44, style }) {
    const { t } = useTranslation();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema, tamanho), [tema, tamanho]);
    const cheio = DS.colors.textOn; // paleta clara: a versão escura de cada tom

    return (
        <View style={[s.linha, style]} accessibilityRole="radiogroup">
            {OPCOES.map((o) => {
                const ativo = valor === o.status;
                const tinta = tema.colors.textOn[o.tom];
                const letra = o.letra || t('headersFirst.nA', 'N/A');
                return (
                    <TouchableOpacity
                        key={o.status}
                        onPress={() => onChange?.(o.status)}
                        activeOpacity={0.7}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: ativo, checked: ativo }}
                        accessibilityLabel={t(o.rotuloKey, o.rotulo)}
                        style={[
                            s.botao,
                            ativo
                                ? { backgroundColor: cheio[o.tom], borderColor: cheio[o.tom] }
                                : { backgroundColor: withAlpha(tinta, 0.1), borderColor: withAlpha(tinta, 0.4) },
                        ]}
                    >
                        <Text
                            style={[
                                s.letra,
                                o.letra ? s.letraGrande : s.letraPequena,
                                { color: ativo ? DS.colors.neutral.white : tinta },
                                ativo && s.letraAtiva,
                            ]}
                        >
                            {letra}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo, tamanho) => StyleSheet.create({
    linha: { flexDirection: 'row', gap: 8 },
    botao: {
        width: tamanho,
        height: tamanho,
        borderRadius: tamanho / 2,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    letra: { fontWeight: '700' },
    letraGrande: { fontSize: 16 },
    letraPequena: { fontSize: 11 },
    letraAtiva: { fontWeight: '900' },
});
