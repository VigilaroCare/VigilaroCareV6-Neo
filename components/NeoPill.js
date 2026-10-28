/**
 * NeoPill.js — a pílula de estado: "60 pendências", "MUITO ALTO", "Base local".
 *
 * POR QUE EXISTE
 * A Home já tem uma pílula (o selo vermelho de pendências do medidor), e o
 * Info Rótulos tinha outras três, cada uma montada à mão com cores e raios
 * diferentes. Era mais um padrão que múltiplas sessões copiaram em vez de
 * extrair. Esta é a única.
 *
 * AS CORES SÃO AS DO TEXTO, NÃO AS DE PREENCHIMENTO
 * `colors.feedback.*` (#FF3B30, #FFCC00…) são cores de PREENCHIMENTO: como texto
 * dão 1,3 a 3:1. Aqui o texto e o fundo saem de `textOn.*`, que já foi aferido
 * em AA contra branco e contra o fundo do tema.
 *  - suave   (padrão): fundo = a cor do tom a 14%, texto = a cor do tom. Lê bem
 *                      sobre superfície clara E escura (o textOn muda com o tema).
 *  - sólida: fundo = a cor do tom (a versão escura, sempre), texto branco. Para
 *            o sinal que não pode passar despercebido (perigo, pendência).
 *
 * COR NUNCA É O ÚNICO SINAL (WCAG 1.4.1): o rótulo é sempre texto, e o ícone
 * opcional dá o segundo canal.
 *
 * @param {string}  props.label
 * @param {string} [props.tom]     'error' | 'warning' | 'success' | 'info' | 'muted'
 * @param {string} [props.icone]   nome de NeoIcon (variante Bold)
 * @param {boolean}[props.solida]  fundo cheio, texto branco
 * @param {boolean}[props.sobreCampo] para uso DENTRO de um NeoGlifoCard: fundo preto
 *   translúcido e texto branco. O campo do card é saturado e não acompanha o tema,
 *   então o tom da pílula não vale ali — o que vale é o contraste com o campo.
 */
import { View, Text, StyleSheet } from 'react-native';
import NeoIcon from './NeoIcon';
import { DS as Neo, withAlpha } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';

export default function NeoPill({ label, tom = 'muted', icone, solida = false, sobreCampo = false, style, accessibilityLabel }) {
    const colors = useThemeColors();
    const claro = Neo.colors.textOn;          // paleta clara: a versão escura de cada tom
    const doTema = colors.textOn || claro;
    const tinta = (solida || sobreCampo) ? '#FFFFFF' : (doTema[tom] || doTema.muted);
    const fundo = sobreCampo
        ? 'rgba(0,0,0,0.30)'
        : solida ? (claro[tom] || claro.muted) : withAlpha(doTema[tom] || doTema.muted, 0.14);

    return (
        <View
            style={[s.pill, { backgroundColor: fundo }, style]}
            accessible
            accessibilityRole="text"
            accessibilityLabel={accessibilityLabel || label}
        >
            {!!icone && <NeoIcon name={icone} size={12} color={tinta} variant="Bold" />}
            <Text style={[s.texto, { color: tinta }]} numberOfLines={1}>{label}</Text>
        </View>
    );
}

const s = StyleSheet.create({
    pill: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Neo.radius.pill,
    },
    texto: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});
