/**
 * DesignSystem2026.js
 * Sistema de Design "Neo-Vigilaro" — Tactical Calm
 * Foco: Acessibilidade, Calma Protetora, Identidade Tipográfica Premium.
 *
 * Fonte display: Plus Jakarta Sans (headings, botões)
 * Fonte body: System (iOS SF Pro, Android Roboto) — performance nativa
 *
 * ── POLITICA DE CONTRASTE (auditoria 2026-07) ──────────────────────────
 * As cores de sistema do iOS (#34C759, #FF3B30, #FFCC00, #5AC8FA) sao
 * especificadas pela Apple como PREENCHIMENTO, nao como texto. Aplicadas
 * a texto sobre fundo claro elas reprovam em WCAG AA — #FFCC00 chega a
 * 1.27:1. Por isso existe agora uma camada separada:
 *
 *   colors.feedback.*  → preenchimento: pontos, barras, badges, icones
 *                        decorativos, fundos de chip.  NUNCA texto.
 *   colors.textOn.*    → texto e icone informativo. Todos >= 4.5:1 sobre
 *                        a superficie clara mais exigente do app.
 *
 * Regra pratica: se a cor vai dentro de <Text> ou de um icone que carrega
 * informacao, use textOn. Se vai em backgroundColor, use feedback.
 * Rode `node scripts/checkContrast.mjs` antes de alterar qualquer hex.
 */

import { Platform, StyleSheet } from 'react-native';

// Nomes das fontes carregadas via expo-font (ver App.js)
export const FONTS = {
    display: {
        regular: 'PlusJakartaSans_400Regular',
        medium: 'PlusJakartaSans_500Medium',
        semiBold: 'PlusJakartaSans_600SemiBold',
        bold: 'PlusJakartaSans_700Bold',
        extraBold: 'PlusJakartaSans_800ExtraBold',
    },
    body: {
        regular: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    // Flag para saber se a fonte custom foi carregada
    loaded: false,
};

/**
 * Marca as fontes como carregadas (chamado pelo App.js após useFonts).
 */
export function setFontsLoaded() {
    FONTS.loaded = true;
}

/**
 * Retorna a font family correta, com fallback se a custom não carregou.
 */
export function displayFont(weight = 'bold') {
    if (!FONTS.loaded) return undefined; // Usa system default
    return FONTS.display[weight] || FONTS.display.bold;
}

export function bodyFont() {
    return undefined; // System default — sempre performante
}

// Paleta Light (default) — espelhada na DarkColors abaixo
// Escala Tailwind emerald + extensões para callsites legados.
const LightColors = {
    primary: {
        900: '#064E3B', // Forest Green muito profundo (StatusBar dark, gradiente top)
        800: '#065F46', // Deep — títulos em fundo claro, accent em cards
        700: '#047857', // Forest Green (Deep/Premium)
        600: '#059669', // Hover/Active
        500: '#10B981', // Emerald Green (Vibrante, Saudável, Premium)
        300: '#34D399',
        200: '#A7F3D0', // Tint suave (borders, fundos de chips)
        100: '#D1FAE5', // Tint leve para fundos ativos
        50:  '#ECFDF5', // Tint extra-leve (alias retrocompatível)
        main: '#10B981',
    },
    secondary: {
        600: '#0284C7', // Sky escuro — parada final dos gradientes de CTA premium
        500: '#0EA5E9', // Sky Blue (Calmante)
        100: '#E0F2FE',
        main: '#0EA5E9',
    },
    // PREENCHIMENTO APENAS. Para texto use colors.textOn.* (ver cabeçalho).
    feedback: {
        success: '#34C759', // iOS System Green  — fill (1.86:1 como texto)
        error: '#FF3B30',   // iOS System Red    — fill (2.97:1 como texto)
        warning: '#FFCC00', // iOS System Yellow — fill (1.27:1 como texto)
        info: '#5AC8FA',    // iOS System Teal   — fill (1.59:1 como texto)
    },
    // Aliases retrocompatíveis usados em ~16 telas
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FFCC00',
    info: '#5AC8FA',

    // Texto semântico sobre superfícies CLARAS.
    // Aferido contra a superfície clara mais exigente do app (mist #E5EDE7)
    // e contra o creme dos tiles (#F4EBDC), nesta ordem nos comentários.
    textOn: {
        ink:     '#16241D', // 14.35:1 · 14.47:1  (= neutral.900)
        muted:   '#5C6660', //  4.99:1 ·  5.04:1  (substitui neutral.500 em texto)
        brand:   '#065F46', //  6.44:1 ·  6.50:1  (= primary.800)
        success: '#1C6E36', //  5.28:1 ·  5.33:1
        warning: '#9C5000', //  4.94:1 ·  4.99:1
        error:   '#B3261E', //  5.48:1 ·  5.53:1
        info:    '#2A6C88', //  4.89:1 ·  4.94:1
        copper:  '#9A4708', //  5.37:1 ·  5.42:1  (accent.copper legível)
    },

    // Superfície dos tiles creme. É o mesmo creme que os PNGs dos
    // pictogramas da Home já carregam impresso na imagem.
    // O card do score usa ESTE token: uma terceira superfície tingida
    // (o menta #D9F1E4) é o que hoje desarmoniza a tela.
    // A borda é INSINUAÇÃO, não contorno. O #065F46 sólido a 1,5px que havia
    // aqui desenhava um traço verde-escuro em volta do card do score enquanto
    // os tiles de pictograma ao lado usavam um fio a 16% — o hero parecia de
    // outra família, mais duro. Contorno forte fica para os temas de alto
    // contraste, onde ele é requisito.
    tile: {
        cream: '#F4EBDC',
        creamRaised: '#FAF5EC',
        border: 'rgba(6, 95, 70, 0.16)',
        borderWidth: StyleSheet.hairlineWidth,
        track: 'rgba(6, 95, 70, 0.14)', // trilho de barra de progresso
    },

    // ── CATEGORIA — paleta autoral, aprovada em 2026-08-01 ──────────────────
    // Nasceu de uma auditoria de "cara de IA": as telas usavam violet-500,
    // amber-500, pink-500 e red-600 do Tailwind como cor de categoria, porque
    // o DS não tinha resposta para essa necessidade. Saturação alta de default
    // é justamente o tique que denuncia origem genérica — estes tons são
    // dessaturados e terrosos, para conviverem com o verde-floresta e com o
    // creme dos tiles em vez de competirem com eles.
    //
    // Três funções por tom, como no resto do DS:
    //   texto — o único que passa AA sobre superfície clara. Use em label.
    //   fill  — preenchimento de ícone, badge, barra. NÃO use como texto.
    //   tint  — fundo de chip e de círculo de ícone.
    //
    // Contraste aferido contra mist #E5EDE7 e creme #F4EBDC (as duas
    // superfícies claras mais exigentes do app): 5.37 a 7.57 — mesma faixa do
    // textOn.brand, que é 6.44.
    categoria: {
        terracota: { texto: '#8F4327', fill: '#B5613C', tint: '#F6EAE4' },
        ocre:      { texto: '#7D5812', fill: '#A87E29', tint: '#F7F0E0' },
        ardosia:   { texto: '#33566F', fill: '#4C7593', tint: '#E7EEF3' },
        ameixa:    { texto: '#5C3F63', fill: '#7C5B85', tint: '#F0EAF2' },
        rose:      { texto: '#8A3F55', fill: '#A85E74', tint: '#F7E9EC' },
    },

    surface: '#FFFFFF',
    neutral: {
        900: '#16241D', // ink (Forest charcoal)
        800: '#38473F', // body (Dark forest slate)
        700: '#566159', // muted (Subtitles/captions)
        600: '#566159', // muted (Subtitles/captions)
        500: '#7C8A80', // faint (Non-text/icons/borders only)
        400: '#C7C7CC', // Bordas médias
        300: '#E5E5EA', // iOS Gray 5 (Divisores e bordas leves)
        200: '#F2F2F7', // iOS Gray 6 (Fundo de seções/cards internos)
        100: '#F9FAFB', // Fundo principal da tela (Off-white)
        50:  '#FAFAFA', // Fundo levíssimo (inputs, hover, divisor extra-leve)
        white: '#FFFFFF',
        black: '#000000',
    },
    // Utilitários exatos para efeitios "Glass"
    glass: {
        light: 'rgba(255, 255, 255, 0.75)',
        border: 'rgba(255, 255, 255, 0.4)',
        dark: 'rgba(28, 28, 30, 0.65)',
    },
    // Mist premium 2026 — verde pastel suave (sage/mint).
    // Aprovado via mockup Claude Design: fundo verde saúde premium,
    // complementa pictogramas cerâmicos e cards glass sem criar "sopa".
    // Tons: #EFF5F0 (sage claro) → #E8F0EA (sage médio) → #EFF5F0.
    mist: {
        gradient: ['#EFF5F0', '#EBF2ED', '#E5EDE7', '#E8F0EA', '#EDF4EF', '#F2F7F3'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(4, 120, 87, 0.06)',       // Forest Deep sutil (reforçado p/ harmonizar)
        accentStrong: 'rgba(4, 120, 87, 0.04)', // Forest secundário (substituiu champagne)
        fallback: '#EFF5F0',
    },
    // Accent "signature" — champagne / cobre para momentos premium pontuais
    // (badges raros, score 100%, highlights de luxo). Uso parcimonioso.
    accent: {
        champagne: '#A16207',       // Cobre/champagne escuro — texto/ícone em fundo claro
        champagneLight: '#D4A055',  // Tom médio para gradientes
        champagneSubtle: '#FEF3C7', // Fundo levíssimo para chips/badges premium
        copper: '#B45309',          // Variante mais quente
    },
    // Paleta do grid principal (Home, menus) — substitui as cores Material
    // hardcoded (#9C27B0, #E91E63, #2196F3, #FF9800) por uma escala coerente
    // ao DS, dessaturada (Tailwind 600-700, não 500).
    gridAccents: {
        saude:     { color: '#0F766E', bg: 'rgba(15, 118, 110, 0.10)' },  // Teal-700
        pets:      { color: '#BE185D', bg: 'rgba(190, 24, 93, 0.10)' },   // Rose-700 (rebaixado)
        vistorias: { color: '#0369A1', bg: 'rgba(3, 105, 161, 0.10)' },   // Sky-700
        eventuais: { color: '#9A4708', bg: 'rgba(180, 83, 9, 0.10)' },    // Amber-700 rebaixado (4.21 -> 5.37:1)
    },
};

// Paleta Dark — invertida no neutral, brand verde mantida, cores semânticas
// ajustadas para os valores iOS Dark Mode oficiais (mais saturadas).
const DarkColors = {
    primary: {
        // Em dark o brand verde mantém o tom; tokens "altos" ficam MAIS claros
        // para contraste sobre fundo escuro (escala invertida vs. light).
        900: '#A7F3D0',   // muito claro p/ títulos accent em dark
        800: '#6EE7B7',   // claro
        700: '#34D399',   // mais clara em dark p/ contraste em hover
        600: '#10B981',   // brand stays
        500: '#10B981',   // brand stays — identidade visual
        300: '#6EE7B7',
        200: '#065F46',   // tint dark (mais escuro, fundo de chip ativo)
        100: '#064E3B',   // tint dark (invertido — fundo de elemento ativo)
        50:  '#022C22',
        main: '#10B981',
    },
    secondary: {
        600: '#0EA5E9',   // um passo mais escuro, ainda legível sobre fundo dark
        500: '#38BDF8',   // sky lighter para dark
        100: '#082F49',   // tint dark
        main: '#38BDF8',
    },
    feedback: {
        success: '#30D158', // iOS Dark Mode System Green
        error: '#FF453A',   // iOS Dark Mode System Red
        warning: '#FFD60A', // iOS Dark Mode System Yellow
        info: '#64D2FF',    // iOS Dark Mode System Teal
    },
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
    info: '#64D2FF',

    // Texto semântico em dark. Aferido sobre neutral.100 (#1C1C1E) e
    // neutral.200 (#2C2C2E) — o fundo de card, que é o caso mais exigente.
    textOn: {
        ink:     '#F2F2F7', // 15.25:1 · 12.49:1
        muted:   '#9E9EA4', //  6.39:1 ·  5.23:1
        brand:   '#34D399', //  8.85:1 ·  7.25:1
        success: '#30D158', //  8.42:1 ·  6.89:1
        warning: '#FFD60A', // 12.05:1 ·  9.87:1
        error:   '#FF6B61', //  6.06:1 ·  4.96:1  (#FF453A caía a 4.09 no card)
        info:    '#64D2FF', //  9.89:1 ·  8.10:1
        copper:  '#E5C28A', //  9.83:1 ·  8.05:1
    },

    tile: {
        cream: '#2C2C2E',
        creamRaised: '#3A3A3C',
        border: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 1,
        track: 'rgba(255, 255, 255, 0.14)',
    },
    // Escuro: o `texto` clareia para ler sobre #1C1C1E (8.20 a 9.52); o `fill`
    // é o mesmo dos dois modos, porque preenchimento não precisa inverter.
    categoria: {
        terracota: { texto: '#E9A487', fill: '#B5613C', tint: 'rgba(181, 97, 60, 0.18)' },
        ocre:      { texto: '#DFBE72', fill: '#A87E29', tint: 'rgba(168, 126, 41, 0.18)' },
        ardosia:   { texto: '#9DBED4', fill: '#4C7593', tint: 'rgba(76, 117, 147, 0.20)' },
        ameixa:    { texto: '#C4A6CC', fill: '#7C5B85', tint: 'rgba(124, 91, 133, 0.20)' },
        rose:      { texto: '#E3A3B4', fill: '#A85E74', tint: 'rgba(168, 94, 116, 0.20)' },
    },

    surface: '#1C1C1E',   // dark surface base
    neutral: {
        900: '#F2F2F7',   // texto principal (invertido) — alta luminância
        800: '#E5E5EA',   // texto secundário
        700: '#C7C7CC',
        600: '#AEAEB2',   // intermediário entre 700 e 500 (espelha o 600 do light)
        500: '#8E8E93',   // gray médio — usado em ambos
        400: '#48484A',
        300: '#3A3A3C',   // bordas/divisores em dark
        200: '#2C2C2E',   // fundo de seções/cards
        100: '#1C1C1E',   // fundo principal da tela (off-black)
        50:  '#0F0F11',   // fundo extra-escuro (inputs sobre o 100)
        white: '#FFFFFF', // semantic — texto branco continua branco
        black: '#000000', // semantic — preto continua preto
    },
    // Glass para dark mode — borda sutil e superfície escura translúcida
    glass: {
        light: 'rgba(255, 255, 255, 0.08)',   // overlay claro em dark = sutil
        border: 'rgba(255, 255, 255, 0.12)',
        dark: 'rgba(28, 28, 30, 0.78)',
    },
    // Mist dark premium — charcoal neutro com leve undertone quente.
    // Removido o tom esverdeado (que pesava em camadas).
    mist: {
        gradient: ['#15141A', '#1A1820', '#1E1C24', '#1A1820', '#15141A', '#100F14'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(16, 185, 129, 0.05)',
        accentStrong: 'rgba(212, 160, 85, 0.06)', // Champagne sutil no dark
        fallback: '#15141A',
    },
    // Accent "signature" no dark — champagne mais claro para legibilidade
    accent: {
        champagne: '#D4A055',       // Tom médio (mais claro no dark)
        champagneLight: '#E5C28A',
        champagneSubtle: 'rgba(212, 160, 85, 0.12)',
        copper: '#E08B4D',
    },
    // Grid no dark — mesmas hues mas com luminância elevada para contraste
    // em fundo escuro (Tailwind 400-500 ao invés de 700)
    gridAccents: {
        saude:     { color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.14)' },  // Teal-400
        pets:      { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.14)' }, // Pink-400
        vistorias: { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.14)' },  // Sky-400
        eventuais: { color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.14)' },  // Amber-400
    },
};

const HighContrastLightColors = {
    primary: {
        900: '#022C22',
        800: '#044E35', // Deep dark green for text/borders (contrast > 7:1)
        700: '#045E40',
        600: '#047857',
        500: '#057A55',
        300: '#34D399',
        200: '#A7F3D0',
        100: '#D1FAE5',
        50:  '#ECFDF5',
        main: '#044E35',
    },
    secondary: {
        600: '#013D5C', // ainda mais escuro — preserva o contraste alto
        500: '#025D8C', // High contrast blue (contrast > 7:1)
        100: '#E0F2FE',
        main: '#025D8C',
    },
    feedback: {
        success: '#006E22', // High contrast green
        error: '#BA1A1A',   // High contrast red
        warning: '#805000', // High contrast warning (brownish gold)
        info: '#005D90',    // High contrast info
    },
    success: '#006E22',
    error: '#BA1A1A',
    warning: '#805000',
    info: '#005D90',

    // Alto contraste: os próprios valores já são >= 7:1 sobre branco.
    textOn: {
        ink:     '#000000',
        muted:   '#1F2421',
        brand:   '#044E35',
        success: '#006E22',
        warning: '#805000',
        error:   '#BA1A1A',
        info:    '#005D90',
        copper:  '#78350F',
    },

    tile: {
        cream: '#FFFFFF',
        creamRaised: '#FFFFFF',
        border: '#000000',
        borderWidth: 2,
        track: 'rgba(0, 0, 0, 0.22)',
    },
    // Alto contraste claro: 9.98 a 13.01 sobre branco.
    categoria: {
        terracota: { texto: '#6B2F17', fill: '#6B2F17', tint: '#F6EAE4' },
        ocre:      { texto: '#5A3D06', fill: '#5A3D06', tint: '#F7F0E0' },
        ardosia:   { texto: '#1F3A4D', fill: '#1F3A4D', tint: '#E7EEF3' },
        ameixa:    { texto: '#3F2945', fill: '#3F2945', tint: '#F0EAF2' },
        rose:      { texto: '#66253A', fill: '#66253A', tint: '#F7E9EC' },
    },

    surface: '#FFFFFF',
    neutral: {
        900: '#000000', // Pure black text
        800: '#000000', // Pure black body text
        700: '#1F2421', // Very dark slate for subtitles
        600: '#1F2421', // Very dark slate
        500: '#4B534E', // High contrast icons/borders
        400: '#7A847F',
        300: '#000000', // Solid black borders in high contrast
        200: '#F2F2F7',
        100: '#FFFFFF', // Pure white background
        50:  '#FAFAFA',
        white: '#FFFFFF',
        black: '#000000',
    },
    glass: {
        light: '#FFFFFF', // Flat white, no transparency to preserve contrast
        border: '#000000', // Solid black border
        dark: '#000000',
    },
    mist: {
        gradient: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'], // No gradient
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(0, 0, 0, 0.08)',
        accentStrong: 'rgba(0, 0, 0, 0.12)',
        fallback: '#FFFFFF',
    },
    accent: {
        champagne: '#78350F', // Very dark copper/gold
        champagneLight: '#A16207',
        champagneSubtle: '#FEF3C7',
        copper: '#9A3412',
    },
    gridAccents: {
        saude:     { color: '#0F766E', bg: 'rgba(15, 118, 110, 0.14)' },
        pets:      { color: '#BE185D', bg: 'rgba(190, 24, 93, 0.14)' },
        vistorias: { color: '#0369A1', bg: 'rgba(3, 105, 161, 0.14)' },
        eventuais: { color: '#B45309', bg: 'rgba(180, 83, 9, 0.14)' },
    },
};

const HighContrastDarkColors = {
    primary: {
        900: '#ECFDF5',
        800: '#D1FAE5',
        700: '#A7F3D0',
        600: '#6EE7B7',
        500: '#34D399', // Bright emerald for high contrast on black
        300: '#A7F3D0',
        200: '#065F46',
        100: '#064E3B',
        50:  '#022C22',
        main: '#34D399',
    },
    secondary: {
        600: '#0EA5E9', // parada escura do gradiente, mantendo brilho em HC dark
        500: '#38BDF8', // Bright sky blue
        100: '#082F49',
        main: '#38BDF8',
    },
    feedback: {
        success: '#30D158',
        error: '#FF453A',
        warning: '#FFD60A',
        info: '#64D2FF',
    },
    success: '#30D158',
    error: '#FF453A',
    warning: '#FFD60A',
    info: '#64D2FF',

    textOn: {
        ink:     '#FFFFFF',
        muted:   '#D1D1D6',
        brand:   '#34D399',
        success: '#30D158',
        warning: '#FFD60A',
        error:   '#FF6B61',
        info:    '#64D2FF',
        copper:  '#FCD34D',
    },

    tile: {
        cream: '#000000',
        creamRaised: '#1C1C1E',
        border: '#FFFFFF',
        borderWidth: 2,
        track: 'rgba(255, 255, 255, 0.28)',
    },
    // Alto contraste escuro: 13.22 a 15.00 sobre preto.
    categoria: {
        terracota: { texto: '#F5C4AE', fill: '#F5C4AE', tint: 'rgba(245, 196, 174, 0.20)' },
        ocre:      { texto: '#F0D89B', fill: '#F0D89B', tint: 'rgba(240, 216, 155, 0.20)' },
        ardosia:   { texto: '#BFD8E8', fill: '#BFD8E8', tint: 'rgba(191, 216, 232, 0.20)' },
        ameixa:    { texto: '#DCC6E2', fill: '#DCC6E2', tint: 'rgba(220, 198, 226, 0.20)' },
        rose:      { texto: '#F2C3CE', fill: '#F2C3CE', tint: 'rgba(242, 195, 206, 0.20)' },
    },

    surface: '#000000',
    neutral: {
        900: '#FFFFFF', // Pure white text
        800: '#FFFFFF', // Pure white body text
        700: '#E5E5EA',
        600: '#D1D1D6',
        500: '#AEAEB2',
        400: '#48484A',
        300: '#FFFFFF', // Solid white borders in high contrast dark
        200: '#1C1C1E',
        100: '#000000', // Pure black background
        50:  '#000000',
        white: '#FFFFFF',
        black: '#000000',
    },
    glass: {
        light: '#000000', // Flat black
        border: '#FFFFFF', // Solid white border
        dark: '#000000',
    },
    mist: {
        gradient: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
        stops: [0, 0.2, 0.45, 0.65, 0.85, 1],
        accent: 'rgba(255, 255, 255, 0.12)',
        accentStrong: 'rgba(255, 255, 255, 0.18)',
        fallback: '#000000',
    },
    accent: {
        champagne: '#FCD34D',
        champagneLight: '#FBBF24',
        champagneSubtle: 'rgba(252, 211, 77, 0.18)',
        copper: '#FB923C',
    },
    gridAccents: {
        saude:     { color: '#2DD4BF', bg: 'rgba(45, 212, 191, 0.18)' },
        pets:      { color: '#F472B6', bg: 'rgba(244, 114, 182, 0.18)' },
        vistorias: { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.18)' },
        eventuais: { color: '#FBBF24', bg: 'rgba(251, 191, 36, 0.18)' },
    },
};

export const DS = {
    // 1. Paleta de Cores (Premium & Apple-like) — LIGHT (default)
    colors: LightColors,

    // 2. Tipografia (Plus Jakarta Sans display + System body)
    type: {
        // Hero — momentos "wow" da Home (score grande, números de impacto)
        display: { fontSize: 48, fontWeight: '800', lineHeight: 52, color: '#1C1C1E', letterSpacing: -1.2, _display: true },

        h1: { fontSize: 34, fontWeight: '800', lineHeight: 41, color: '#1C1C1E', letterSpacing: -0.6, _display: true }, // Display font
        h2: { fontSize: 28, fontWeight: '700', lineHeight: 34, color: '#1C1C1E', letterSpacing: -0.4, _display: true }, // Display font
        h3: { fontSize: 22, fontWeight: '700', lineHeight: 28, color: '#1C1C1E', letterSpacing: -0.2, _display: true }, // Display font

        body: { fontSize: 17, fontWeight: '400', lineHeight: 24, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        bodySmall: { fontSize: 15, fontWeight: '400', lineHeight: 20, color: '#3A3A3C', letterSpacing: -0.1 }, // System font
        caption: { fontSize: 13, fontWeight: '500', lineHeight: 18, color: '#63636A', letterSpacing: 0.1 }, // #8E8E93 reprovava (2.73:1)

        // Eyebrow — labels de seção premium. Substitui o "sectionLabel" inline da Home
        // (fontSize 11, fontWeight 900, uppercase opacity 0.9 — visual de planilha).
        // Premium = peso médio (600), tracking generoso, cor secundária.
        eyebrow: { fontSize: 11, fontWeight: '600', lineHeight: 14, color: '#63636A', letterSpacing: 1.4, textTransform: 'uppercase', _display: true },

        button: { fontSize: 17, fontWeight: '600', letterSpacing: 0, textTransform: 'none', _display: true } // Display font
    },

    // 3. Espaçamento (Escala de 8dp)
    spacing: {
        xs: 4,
        sm: 8,
        md: 16, 
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    // 4. Bordas e Formas (Continuous Curve / Squircle)
    borderRadius: {
        sm: 10,
        md: 20, // Padrão Apple para grandes cards
        lg: 24,
        pill: 9999,
        full: 9999,
    },
    radius: {
        sm: 10,
        md: 20,
        lg: 24,
        pill: 9999,
        full: 9999,
    },
    // Alias retrocompatível (algumas telas usam Neo.radii)
    radii: {
        sm: 10,
        md: 20,
        lg: 24,
        pill: 9999,
        full: 9999,
    },

    // 5. Sombras Híbridas (Apple Diffusion + Android Elevation)
    shadows: {
        // Sombra da família cerâmica: tile de pictograma e card do score usam
        // ESTA, para que os dois pousem no fundo da mesma altura. É verde, não
        // preta — cinza sobre creme suja; a sombra do próprio verde do desenho
        // some no papel.
        //
        // Fonte única de propósito: quando PictogramTile carregava a sua cópia
        // destes números, o hero ficou com metade da opacidade e dois terços
        // da elevação, e a diferença aparecia na Home.
        ceramic: {
            shadowColor: '#064E3B',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.10,
            shadowRadius: 8,
            elevation: Platform.OS === 'android' ? 3 : 0,
        },
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 8,
            elevation: Platform.OS === 'android' ? 2 : 0,
            // Para Android plano, evitamos a caixa cinza forte, mas damos leve volume
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
            elevation: Platform.OS === 'android' ? 5 : 0,
        },
        floating: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.12,
            shadowRadius: 30,
            elevation: Platform.OS === 'android' ? 8 : 0,
        },
        none: {
            shadowColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
        },
        premium4K: {
            shadowColor: '#10B981', // Sombra colorida gera o efeito "Neon Blur" luxuoso do iOS
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: 0.25,
            shadowRadius: 36,
            elevation: Platform.OS === 'android' ? 12 : 0,
        },
        // Premium "duotone" — sombra colorida brand + sombra neutra ampla.
        // Em RN nativo só uma shadowColor é honrada; aqui usamos a colorida
        // (mais característica) e deixamos a neutra para a borda inferior do card
        // via View interna (ver NeoCard variant="premium").
        premium: {
            shadowColor: '#047857', // Forest Deep — assinatura sutil
            shadowOffset: { width: 0, height: 14 },
            shadowOpacity: 0.10,
            shadowRadius: 28,
            elevation: Platform.OS === 'android' ? 10 : 0,
        },
        // Second pass — usada como View overlay para complementar a sombra do premium
        premiumNeutral: {
            shadowColor: '#1C1C1E',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: Platform.OS === 'android' ? 2 : 0,
        },
    },

    // 6. Layout — constantes de anatomia de página (PADRAO_ANATOMIA_PAGINAS.md)
    // Fim dos paddings mágicos por tela: todo scroll usa estes tokens.
    layout: {
        screenHPadding: 24,      // = spacing.lg — padding horizontal de todo scroll
        scrollBottomFooter: 190, // folga única p/ footer flutuante + respiro
        scrollBottomBare: 40,    // telas sem footer (modais, wizards)
        headerMinHeight: 56,
        // Lado da arte do hero de seção (NeoSectionHero). 96 = 8 × 12, na malha
        // de 8pt do spacing. A ALTURA do hero não existe como token de propósito:
        // ela é consequência desta arte mais o respiro do card. Havia quatro
        // alturas soltas no app (280/240/220/200), todas de cópia — sem número
        // de altura para copiar, não há como divergir de novo.
        heroArt: 96,
        // Altura do banner full-bleed LEGADO (o que a §3② da anatomia proibe e
        // o §9.1 lista para migrar ao NeoSectionHero). Enquanto essas ~28 telas
        // nao migram, a altura passa por aqui: havia SETE valores soltos —
        // 0.78 x largura da tela em 14 telas (304 num telefone comum, e cresce
        // em tela grande), 280 em 18, 260 no NeoHeroHeader, 240, 220 e 200 em 5.
        // Todos de copia, nenhum de decisao. Mudar este numero move as 28 juntas.
        heroBanner: 240,
    },

    // 7. Tokens de Emergência — vermelho-pânico INTENCIONAL das telas de SOS
    // (SOSCountdown, SOSEmergencyMode, EmergenciaRapida). Centralizados aqui
    // para as 3 telas usarem a mesma assinatura visual (auditoria D6).
    // Não usar fora de contexto de emergência — o contraste agressivo é
    // proposital e quebraria o "Tactical Calm" do restante do app.
    emergency: {
        panic: '#DC2626',                    // Fundo da tela-pânico
        panicDark: '#B91C1C',                // Variante pressed/bordas
        onPanic: '#FFFFFF',                  // Texto/ícone sobre o pânico
        onPanicMuted: 'rgba(255,255,255,0.85)', // Texto secundário sobre pânico
        surfaceOnPanic: 'rgba(255,255,255,0.18)', // Círculos/chips sobre pânico
        ctaDark: '#000000',                  // Botão CANCELAR (máximo contraste)
        whatsapp: '#25D366',                 // Verde oficial WhatsApp — FILL apenas
        onWhatsapp: '#07231A',               // Rótulo sobre o verde: branco dá 1.98:1
    },

    // 7b. Escala Unificada de Severidade — usada em InfoRótulos, relatórios,
    // badges de risco e qualquer classificação ordinal de perigo.
    // Centralizada no DS para garantir consistência visual e semântica.
    severity: {
        extreme:      { bg: '#1A1A1A', text: '#FFF', accent: '#FF1744' },
        veryHigh:     { bg: '#B71C1C', text: '#FFF', accent: '#FF5252' },
        high:         { bg: '#D32F2F', text: '#FFF', accent: '#FF8A80' },
        medium:       { bg: '#A85400', text: '#FFF', accent: '#FFB74D' }, // 2.70 -> 5.34:1
        low:          { bg: '#2E7D32', text: '#FFF', accent: '#81C784' }, // 4.12 -> 5.13:1
        indeterminate:{ bg: '#616161', text: '#FFF', accent: '#BDBDBD' },
    },

    // 8. Gradientes utilitários (specular highlights, brand gradients)
    gradients: {
        // Specular highlight — "lambida de luz" sutil no topo do card de vidro.
        // Mantida baixa (0.35) pra ser polimento, não washout. Decai rápido
        // pra não interferir com a legibilidade do conteúdo.
        specular: {
            colors: ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0)'],
            locations: [0, 0.35, 1],
            start: { x: 0.5, y: 0 },
            end: { x: 0.5, y: 1 },
        },
        // Specular dark — para cards de vidro em dark mode (mais sutil ainda)
        specularDark: {
            colors: ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0)'],
            locations: [0, 0.35, 1],
            start: { x: 0.5, y: 0 },
            end: { x: 0.5, y: 1 },
        },
        // Brand sutil — Forest Deep → Emerald, uso em CTAs e hero accents
        brand: {
            colors: ['#047857', '#10B981'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        },
        // Champagne signature — uso pontual em badges premium / score 100%
        champagne: {
            colors: ['#A16207', '#D4A055'],
            start: { x: 0, y: 0 },
            end: { x: 1, y: 1 },
        },

        // ── CARD DE DESTINO (home) — a cor CARREGA SEVERIDADE ──────────────
        //
        // Decisão do Agnaldo em 25/10/2026: o acabamento dos cards passa a ter
        // campo de cor com gradiente, no lugar da caixa branca com borda.
        //
        // A chave NÃO é estética, é semântica: indexa pelo `tone` que o
        // ScoreService já devolve (TOM_POR_BANDA → success | warning | error |
        // muted), para a cor do card vir do DADO e não de escolha à mão. Sem
        // isto o gradiente vira decoração — que é justamente o que ele rejeita.
        // Um card em `error` com as pendências resolvidas VIRA `success`
        // sozinho, porque a banda mudou.
        //
        // `info` é o único fora da escala de score: destino sem juízo de risco
        // (quantos ambientes foram lidos, quantos produtos estão na casa).
        //
        // Três paradas de cor, não duas: foi o que separou a amostra aprovada
        // das tentativas chapadas. O par claro/escuro segue a convenção do
        // `specular`/`specularDark` acima — o DarkDS herda `gradients` do DS,
        // então a variante escura mora aqui mesmo, com sufixo.
        cardError:        { colors: ['#8A3524', '#C4573C', '#E08A6B'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardErrorDark:    { colors: ['#5E2418', '#A2462F', '#CE7254'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardWarning:      { colors: ['#7E571A', '#BE8630', '#E3B45C'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardWarningDark:  { colors: ['#5A3E10', '#A17024', '#D59D44'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardSuccess:      { colors: ['#16543F', '#2A8F6B', '#46BE92'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardSuccessDark:  { colors: ['#0E3A2D', '#1F7459', '#31A77E'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardInfo:         { colors: ['#1A4654', '#2F7A90', '#49A6BC'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardInfoDark:     { colors: ['#12303A', '#236274', '#328FA4'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardMuted:        { colors: ['#48544E', '#6E7C75', '#94A29A'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
        cardMutedDark:    { colors: ['#2A332E', '#3F4A44', '#566159'], locations: [0, 0.58, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },

    // ── RETROILUMINAÇÃO ─────────────────────────────────────────────────────
    // Os `card*` acima são LINEARES e servem a card com texto. Estes são
    // RADIAIS e existem para o card em que o pictograma mora na luz.
    //
    // A pergunta que eles respondem é a do Agnaldo em 25/10/2026: "por que o
    // pictograma está dentro de um card bege que está dentro do card?". A placa
    // existia para dar contraste à arte. Aqui o próprio card clareia no canto
    // onde a arte fica — um campo só, sem moldura, sem card dentro de card.
    //
    // Cada token é o `card*Dark` correspondente com uma parada de LUZ na frente
    // e a ordem invertida (claro no foco, escuro na borda). A severidade
    // continua lendo pelo corpo saturado, que é o mesmo.
    //
    // Geometria: elipse de 132% x 116% da caixa, centrada em 88% x 74% — canto
    // inferior direito, que é onde o pictograma é assentado. `expo-linear-gradient`
    // não faz radial; isto se desenha com react-native-svg (ver NeoGlifoCard).
    radiais: {
        foco: { cx: 0.88, cy: 0.74, rx: 1.32, ry: 1.16 },
        paradas: [0, 0.26, 0.58, 1],
        error:   ['#F0DED8', '#D98268', '#A2462F', '#5E2418'],
        warning: ['#F6E6C8', '#D59D44', '#A17024', '#5A3E10'],
        success: ['#DCF0E6', '#5FBF96', '#1F7459', '#0E3A2D'],
        info:    ['#D5EAF0', '#68AEC0', '#236274', '#12303A'],
        muted:   ['#DDE2DE', '#7E8C84', '#3F4A44', '#2A332E'],
    },
    },
};

/**
 * Devolve uma cópia da escala tipográfica com as cores trocadas pelas do tema.
 *
 * Existe porque DS.type carregava hex claros fixos e DarkDS os herdava: no
 * dark, type.h1 ficava #1C1C1E sobre #1C1C1E — 1.00:1, texto invisível. Só
 * não aparecia em tela porque as telas sobrescreviam a cor na mão, uma a uma.
 *
 * Função pura, sem StyleSheet e sem dependência de render — segura para rodar
 * no escopo do módulo (o padrão que já derrubou o app no Hermes uma vez).
 */
function applyTypeColors(type, colors) {
    const byRole = {
        display:   colors.neutral[900],
        h1:        colors.neutral[900],
        h2:        colors.neutral[900],
        h3:        colors.neutral[900],
        body:      colors.neutral[800],
        bodySmall: colors.neutral[800],
        caption:   colors.textOn.muted,
        eyebrow:   colors.textOn.muted,
    };
    const out = {};
    for (const key of Object.keys(type)) {
        out[key] = byRole[key] ? { ...type[key], color: byRole[key] } : { ...type[key] };
    }
    return out;
}

// DarkDS — mesma estrutura do DS, mas com a paleta dark.
// Spacing, radii e shadows são neutros ao tema; a tipografia NÃO é, e por
// isso passa por applyTypeColors em cada variante.
export const DarkDS = {
    ...DS,
    colors: DarkColors,
    type: applyTypeColors(DS.type, DarkColors),
};

export const HighContrastDS = {
    ...DS,
    colors: HighContrastLightColors,
    type: applyTypeColors(DS.type, HighContrastLightColors),
};

export const HighContrastDarkDS = {
    ...DS,
    colors: HighContrastDarkColors,
    type: applyTypeColors(DS.type, HighContrastDarkColors),
};

// Exports nominais das paletas para uso direto fora do ThemeContext
export { LightColors, DarkColors, HighContrastLightColors, HighContrastDarkColors };

/**
 * Aplica alpha a um token hex, devolvendo rgba().
 *
 * Existe para as telas pararem de cravar 'rgba(8, 68, 47, 0.14)' na mão: o
 * matiz passa a vir do tema e só a opacidade fica na chamada.
 *
 * NÃO use em texto. Alpha reduz o contraste efetivo e invalida as medições
 * do checkContrast, que não sabe o que está por baixo. Fundos, trilhos,
 * divisores e bordas — sim.
 */
export function withAlpha(hex, alpha) {
    const h = String(hex).replace('#', '');
    const full = h.length === 3 ? h.replace(/(.)/g, '$1$1') : h;
    const n = parseInt(full, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    const a = Math.max(0, Math.min(1, Number(alpha)));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Aliases para manter a retrocompatibilidade de importações nas telas
export const Neo = DS;
export default DS;