/**
 * SafeGradient.js — LinearGradient à prova de token ausente.
 *
 * POR QUE EXISTE
 * O módulo nativo do expo-linear-gradient (Kotlin) exige que cada item de
 * `colors` seja um número/cor válida. Um `undefined` no array — um token que
 * não existe na paleta, um campo de dado que veio vazio, um tema sem aquela
 * chave — derruba o app no Android com:
 *
 *   Cannot set prop 'colors' on view 'expo.modules.lineargradient.LinearGradientView'
 *   → java.lang.NullPointerException: null cannot be cast to non-null type kotlin.Double
 *
 * O erro não diz QUAL tela nem QUAL cor, o que torna a caça cara. Este wrapper
 * troca o crash por degradação visual e, em DEV, aponta o culpado no console.
 *
 * COMO USAR
 *   import SafeGradient from '../components/SafeGradient';
 *   <SafeGradient colors={[a, b]} debugLabel="HeroCard" ... />
 *
 * Aceita todas as props do LinearGradient. `locations` é descartado quando não
 * casa com o número de cores sobreviventes — o nativo também crasha nesse caso.
 */
import { LinearGradient } from 'expo-linear-gradient';

const COR_NEUTRA = '#E5E5EA'; // neutral[300] do DS — literal de propósito:
// este é o caminho de emergência, não pode depender do DS que talvez falhou.

/**
 * Filtra cores inválidas e garante o mínimo de 2 paradas que o nativo exige.
 * @param {Array} colors
 * @param {string} debugLabel
 * @returns {{colors: Array<string|number>, descartadas: number}}
 */
export function sanitizeGradientColors(colors, debugLabel = 'SafeGradient') {
    const entrada = Array.isArray(colors) ? colors : [];
    // Cor válida = string não-vazia (hex/rgba) ou número (processColor/ColorValue).
    const validas = entrada.filter(
        (c) => (typeof c === 'string' && c.trim().length > 0) || typeof c === 'number'
    );
    const descartadas = entrada.length - validas.length;

    if (descartadas > 0 && __DEV__) {
        console.warn(
            `[SafeGradient] ${debugLabel}: ${descartadas} cor(es) inválida(s) descartada(s). ` +
            `Recebido: ${JSON.stringify(entrada)}. Provável token ausente na paleta.`
        );
    }

    if (validas.length >= 2) return { colors: validas, descartadas };
    // 1 cor → duplica (gradiente sólido). 0 → neutro.
    const base = validas[0] ?? COR_NEUTRA;
    return { colors: [base, base], descartadas };
}

export default function SafeGradient({ colors, locations, debugLabel, ...rest }) {
    const { colors: seguras } = sanitizeGradientColors(colors, debugLabel);

    // locations precisa ter o mesmo comprimento de colors, senão o nativo
    // também rejeita. Se o saneamento mudou o tamanho, é mais seguro deixar
    // o gradiente distribuir sozinho.
    const locsValidas =
        Array.isArray(locations) &&
        locations.length === seguras.length &&
        locations.every((n) => typeof n === 'number' && Number.isFinite(n))
            ? locations
            : undefined;

    return <LinearGradient colors={seguras} locations={locsValidas} {...rest} />;
}
