/**
 * LinhaDeChecklist.js — uma linha de checklist com caixa de marcar: o item, e um toque marca ou desmarca.
 *
 * POR QUE EXISTE
 * ChecklistVisit e ChecklistReforma tinham, cada uma, a sua cópia do mesmo cartão: bolinha de 28px
 * desenhada à mão, hex de verde e de cinza presos na paleta clara, cartão branco fixo (no tema
 * escuro o texto claro sumia sobre o branco). Uma peça só, que lê o tema.
 *
 * O item marcado vai para o texto mudo e riscado, e a caixa ganha o visto: a cor não é o único
 * sinal (WCAG 1.4.1), e o leitor de tela recebe o estado (checkbox marcado ou não).
 *
 * Use várias dentro de UM NeoCard (padding 0); `primeira` tira o fio de cima da primeira linha.
 *
 * @param {string} rotulo
 * @param {boolean} marcado
 * @param {() => void} onPress
 * @param {boolean} [primeira]
 */
import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NeoIcon from './NeoIcon';
import TappablePressable from './TappablePressable';
import { DS, withAlpha } from '../utils/DesignSystem2026';
import { useThemeDS } from '../utils/ThemeContext';

export default function LinhaDeChecklist({ rotulo, marcado, onPress, primeira = false }) {
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    const cheio = DS.colors.textOn.success; // a versão escura do verde, sempre (o visto é branco)

    return (
        <TappablePressable
            onPress={onPress}
            activeScale={0.99}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!marcado }}
            accessibilityLabel={rotulo}
            style={[s.linha, !primeira && s.divisor]}
        >
            <View style={[s.caixa, marcado && { backgroundColor: cheio, borderColor: cheio }]}>
                {marcado && <NeoIcon name="TickCircle" size={16} color={DS.colors.neutral.white} variant="Bold" />}
            </View>
            <Text style={[s.texto, marcado && s.textoMarcado]}>{rotulo}</Text>
        </TappablePressable>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: Neo.spacing.md,
    },
    divisor: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: Neo.colors.neutral[300],
    },
    caixa: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: withAlpha(Neo.colors.textOn.muted, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        flex: 1,
        fontSize: 15,
        lineHeight: 21,
        fontWeight: '600',
        color: Neo.colors.textOn.ink,
    },
    textoMarcado: {
        color: Neo.colors.textOn.muted,
        textDecorationLine: 'line-through',
    },
});
