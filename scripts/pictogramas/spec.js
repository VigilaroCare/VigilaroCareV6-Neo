/**
 * spec.js — ficha técnica dos pictogramas cerâmicos do Vigilaro Care.
 *
 * FONTE ÚNICA da linguagem visual. O problema do acervo anterior não foi falta
 * de capricho na geração: foi falta de especificação. Sem uma ficha, cada peça
 * nasce num mundo diferente — luz de um lado numa, difusa na outra; traço
 * gordo aqui, fio frágil ali. Aqui a linguagem mora em um lugar só.
 *
 * DECISÃO ESTRUTURAL: o PNG contém APENAS o objeto, em fundo transparente e
 * proporção 1:1. O tile creme, o canto squircle e a sombra são desenhados pelo
 * `PictogramTile` com tokens do Design System. Assim a moldura fica nítida em
 * qualquer tamanho, acompanha o modo escuro e muda numa linha de código, em
 * vez de exigir regerar 118 arquivos.
 */

// ── Linguagem visual (não alterar peça por peça) ────────────────────────────
// A primeira rodada pediu "matte satin" e voltou plástico de bala: o modelo
// puxa para o brilhante quando a palavra "glaze" aparece sozinha. Daí a
// insistência em pedra fosca e a lista explícita do que NÃO pode.
// Segunda correção de rota. Matar o brilho de plástico com "luz difusa plana"
// matou junto o modelado: as peças saíram foscas e sem expressão. O ponto de
// equilíbrio é acabamento fosco COM volume forte — a peça é lida pela sombra,
// então a sombra precisa existir de verdade.
const MATERIAL = [
    'single continuous piece of unglazed matte stoneware ceramic, like bisque porcelain',
    'matte velvety surface with rich, generous shading — matte in finish but sculptural in volume, never flat or washed out',
    'deep forest green with subtle tonal variation across the form: clearly lighter where the light lands, clearly deeper in the shadow side',
    'soft ambient occlusion pooling where shapes meet and inside every recess, giving real depth',
    'a gentle soft light catch along the upper bevel edges — a wide, diffuse sheen, not a bright dot',
    'faint subsurface warmth at the thinnest edges, as real ceramic has',
    'generously rounded, hand-formed bevels — slightly organic, never a cold geometric extrusion',
    'no gloss, no wet look, no varnish, no lacquer, no glass, no mirror reflections',
    'no sharp white specular dots, no candy plastic sheen',
    'no glow, no aura, no halo around the object',
    'no surface noise, no speckles, no grain',
].join(', ');

const LUZ = [
    'one strong soft key light from the upper left at about 35 degrees, large softbox',
    'clear directional falloff across the object — bright upper-left shoulders fading into a deep shadow side at the lower right',
    'a dim cool fill from the right so the shadow side keeps detail instead of going muddy',
    'a soft contact shadow directly beneath the object to ground it, tight and subtle',
    'no rim light, no backlight, no second key',
].join(', ');

// A regra de "no máximo três elementos" foi retirada: ela reescrevia o
// desenho. Os motivos já foram definidos por tentativa e erro e representam
// corretamente cada função — a ficha muda o material e a luz, nunca a forma.
// O que continua valendo é o peso do traço, porque é o que dá unidade ao
// conjunto, e a exigência de que todo detalhe seja gordo o bastante para
// sobreviver ao tamanho do tile.
const FORMA = [
    'thick uniform stroke weight, roughly 12% of the canvas width, identical on every part of the glyph',
    'every detail generously thick — nothing thinner than the main stroke, so it survives at small size',
    'simple frontal view, no perspective, no tilt',
    'object centered with even breathing room, about 12% margin on all sides',
].join(', ');

// Fundo BRANCO, não transparente. Pedindo transparência, o modelo pinta
// atmosfera em volta do objeto — névoa e vinheta esverdeadas, opacas, que
// viram sujeira por cima do tile creme. Nenhuma proibição no prompt resolveu.
// "Fundo branco de estúdio" é idioma de foto de produto, que o modelo entrega
// limpo, e o recorte passa a ser determinístico no `limpar.js`.
const ENQUADRAMENTO = [
    'isolated on a pure flat white studio background, seamless, evenly lit',
    'the background is plain white everywhere — no atmosphere, no mist, no vignette, no gradient, no colored fog',
    'no tile, no card, no frame, no border, no plaque',
    'no reflection on the ground — only the tight contact shadow described above',
    'no text, no letters, no numbers, no logos',
    'square composition',
].join(', ');

/** Monta o prompt final de uma peça a partir do tema. */
function montarPrompt(tema) {
    return [
        `A single ceramic pictogram representing ${tema}.`,
        `Material: ${MATERIAL}.`,
        `Lighting: ${LUZ}.`,
        `Form: ${FORMA}.`,
        `Framing: ${ENQUADRAMENTO}.`,
        'Calm, premium, restrained. Reads instantly at small size.',
    ].join(' ');
}

// ── Peças ───────────────────────────────────────────────────────────────────
// `arquivo` espelha o nome do asset atual, e `tema` DESCREVE O DESENHO QUE JÁ
// EXISTE. Os motivos foram fechados por tentativa e erro e são coerentes com o
// que cada função representa — regerar é trocar o acabamento, não o símbolo.
// Ao acrescentar peça nova, descreva o desenho atual do asset, não uma ideia
// melhor para ele.
const HOME = [
    {
        arquivo: 'vistorias',
        tema: 'a bold check mark sitting inside an open ring; the ring has a gap at the upper right where the long arm of the check passes over it',
    },
    {
        arquivo: 'scanner-ambiente',
        tema: 'a simple architectural floor plan of an apartment — thick walls forming a few rooms with door gaps — framed by four camera viewfinder corner brackets, one at each corner',
    },
    {
        arquivo: 'info-rotulos',
        tema: 'a barcode of about nine thick vertical bars, framed by four camera viewfinder corner brackets, one at each corner',
    },
    {
        arquivo: 'minha-saude',
        tema: 'a single continuous heartbeat ECG pulse line running horizontally, with one tall peak and one deep valley, and flat rounded ends',
    },
    {
        arquivo: 'saude-pet',
        tema: 'an animal paw print — four toe pads above one large main pad — with a heartbeat ECG pulse line engraved across the main pad',
    },
    {
        arquivo: 'atividades-eventuais',
        tema: 'the outline of a house, drawn as thick strokes with a pitched roof and two windows, and inside it a hammer crossed with a screwdriver, meaning home repairs and renovation work',
    },
    {
        arquivo: 'modo-viagem',
        tema: 'an upright hard-shell rolling suitcase, standing on two small wheels, with a rounded top handle and three vertical ribs across the shell',
    },
    {
        arquivo: 'cuidar-e-proteger',
        tema: 'two open cupped hands rising from below and holding a family of three small figures — two adults and one child between them — with the outline of a house roof above the family',
    },
];

module.exports = { montarPrompt, HOME, MATERIAL, LUZ, FORMA, ENQUADRAMENTO };
