/**
 * Carrega as 4 paletas do DesignSystem2026 fora do React Native, para medir
 * contraste de verdade em vez de chutar. Tira o import de react-native e
 * devolve os objetos.
 */
const fs = require('fs');

function carregar(caminho) {
    let src = fs.readFileSync(caminho, 'utf8');
    src = src.replace(/^import .*$/gm, '');
    src = src.replace(/^export const /gm, 'const ');
    src = src.replace(/^export (function|let|var|class) /gm, '$1 ');
    src = src.replace(/^export default .*$/gm, '');
    src = src.replace(/^export \{[\s\S]*?\};?$/gm, '');
    const prelude = `
        const Platform = { OS: 'android', select: (o) => (o.android !== undefined ? o.android : o.default) };
        const StyleSheet = { hairlineWidth: 0.5 };
    `;
    const posfix = `;return { LightColors, DarkColors, HighContrastLightColors, HighContrastDarkColors, DS };`;
    return new Function(prelude + src + posfix)();
}

const lum = (hex) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    const v = [0, 2, 4].map((i) => parseInt(m[1].substr(i, 2), 16) / 255);
    const s = v.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
    return 0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2];
};

const contraste = (a, b) => {
    const x = lum(a), y = lum(b);
    if (x === null || y === null) return null;
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/** achata { neutral: { 900: '#..' } } em { 'neutral.900': '#..' } */
function achatar(obj, prefixo = '', saida = {}) {
    for (const [k, v] of Object.entries(obj || {})) {
        const p = prefixo ? prefixo + '.' + k : k;
        if (v && typeof v === 'object' && !Array.isArray(v)) achatar(v, p, saida);
        else saida[p] = v;
    }
    return saida;
}

module.exports = { carregar, lum, contraste, achatar };
