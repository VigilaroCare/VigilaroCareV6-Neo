import React from 'react';
import { View } from 'react-native';
import * as Phosphor from 'phosphor-react-native';
import ElderlyIcon from './icons/ElderlyIcon';

// Glifos desenhados em casa, na gramática do Phosphor (viewBox 256,
// traço 16 arredondado, duotone = massa 0.2 + traço). Para conceitos
// que o catálogo não cobre.
const CUSTOM_ICONS = {
    Elderly: ElderlyIcon,
};

/**
 * NeoIcon — API ÚNICA de iconografia do Vigilaro Care (DS2026).
 *
 * Toda tela/componente deve consumir ícones via este wrapper. Imports
 * diretos de bibliotecas de ícones (Phosphor, Iconsax, etc.) são
 * proibidos — sempre passe pelo NeoIcon.
 *
 * ──────────────────────────────────────────────────────────────────────
 * CONTRATO SEMÂNTICO (governança visual do app):
 *
 *   "Fill ancora, Regular atua."
 *
 *   - variant="Bold"    →  ícones que ANCORAM uma seção/contexto.
 *                          Renderiza como Phosphor weight="fill".
 *                          Uso em: cards hero, círculos/quadrados
 *                          decorativos dentro de cards, navegação
 *                          principal (tab bar), status ativos.
 *
 *   - variant="Linear"  →  ícones que ATUAM (ações).
 *                          Renderiza como Phosphor weight="regular".
 *                          Uso em: botões inline (Edit, Trash, Add),
 *                          setas (ArrowRight, ArrowLeft), back buttons,
 *                          itens em listas densas, modais, secundários.
 *
 *   - variant="Bulk"    →  ícones que INFORMAM (conteúdo educativo).
 *                          Renderiza como Phosphor weight="duotone".
 *                          Uso em: accordions de dicas, listas informativas,
 *                          cards de leitura (aprovado pelo autor 2026-06-12
 *                          no Fique Atento — percepção de "ilustração rica"
 *                          sem pack pago). Regra: "Bold ancora, Bulk
 *                          informa, Linear atua."
 *
 * A regra não é rígida — é um padrão consistente do DS. O caller decide
 * passando `variant` explicitamente. NUNCA omita (default é 'Linear').
 *
 * Alias histórico: a prop `variant` aceita 'Bold' e 'Linear' (terminologia
 * Iconsax original) e mapeia internamente para Phosphor weights via
 * VARIANT_TO_WEIGHT. 'Bulk'/'TwoTone' → 'duotone'.
 *
 * ──────────────────────────────────────────────────────────────────────
 * Resolução interna:
 *  - Aplica `mapName` (kebab-case → PascalCase + aliases legados).
 *  - Tenta PHOSPHOR_MAP — se nome mapeado existe em phosphor-react-native,
 *    renderiza com weight derivado do variant.
 *  - Caso contrário, tenta nome direto no namespace do Phosphor.
 *  - Fallback final: Phosphor.Warning.
 *
 * Adicionando um novo callsite:
 *  - Use nomes já mapeados quando possível (consistência).
 *  - Se o callsite usa um nome novo, adicione entrada em PHOSPHOR_MAP
 *    apontando para o nome Phosphor correto.
 *  - Se Phosphor não tem equivalente direto, escolha o nome Phosphor
 *    mais próximo (semântico > literal).
 */

const mapName = (name) => {
    if (!name) return name;

    // Custom explicit overrides for legacy names or custom semantic maps
    const overrides = {
        'pet': 'Heart',
        'Pet': 'Heart',
        'profile-circle': 'User',
        'ProfileCircle': 'User',
        'profile-add': 'UserAdd',
        'ProfileAdd': 'UserAdd',
        'gas-station': 'GasStation',
        'GasStation': 'GasStation',
        'happyemoji': 'Happyemoji',
        'Happyemoji': 'Happyemoji',
        'tick-square': 'TickSquare',
        'TickSquare': 'TickSquare',
        'arrow-right': 'ArrowRight',
        'ArrowRight': 'ArrowRight',
        'trash': 'Trash',
        'Trash': 'Trash',
        'minus': 'Minus',
        'Minus': 'Minus',
        'add': 'Add',
        'Add': 'Add',
        'camera': 'Camera',
        'Camera': 'Camera',
    };

    if (overrides[name]) return overrides[name];

    // Convert kebab-case to PascalCase (e.g., house-2 -> House2, tick-square -> TickSquare)
    const pascal = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    return pascal;
};

// ──────────────────────────────────────────────────────────────────────
// PHOSPHOR_MAP — traduz nomes legados (estilo Iconsax) para nomes Phosphor.
// Mantido como camada de compat para evitar renomear ~100 callsites em
// lote. Adições novas devem preferir o nome Phosphor direto quando viável.
// Verificado contra phosphor-react-native@3.x (2026-05-29).
// ──────────────────────────────────────────────────────────────────────
const PHOSPHOR_MAP = {
    // ── Casa / piloto Fase A ────────────────────────────────────────
    Home2: 'House',
    House: 'House',
    Health: 'Heartbeat',
    ShieldTick: 'ShieldCheck',
    Warning2: 'Warning',
    Setting2: 'GearSix',
    Scan: 'Scan',
    Activity: 'Pulse',

    // ── Setas / navegação ──────────────────────────────────────────
    ArrowRight2: 'CaretRight',
    ArrowLeft2: 'CaretLeft',
    ArrowDown2: 'CaretDown',
    ArrowUp2: 'CaretUp',
    ArrowRight: 'ArrowRight',
    ArrowLeft: 'ArrowLeft',

    // ── Ações comuns ───────────────────────────────────────────────
    Add: 'Plus',
    Edit2: 'PencilSimple',
    Trash: 'TrashSimple',
    Copy: 'Copy',
    CloseCircle: 'XCircle',
    CloseSquare: 'XSquare',
    TickCircle: 'CheckCircle',
    TickSquare: 'CheckSquare',
    Eye: 'Eye',
    Musicnote: 'MusicNotes',
    UserAdd: 'UserPlus',
    HammerWrench: 'Wrench',

    // ── Busca / localização ────────────────────────────────────────
    SearchNormal: 'MagnifyingGlass',
    SearchNormal1: 'MagnifyingGlass',
    SearchZoomIn: 'MagnifyingGlassPlus',
    Discover: 'Compass',
    Global: 'Globe',
    GlobalSearch: 'Globe',
    Map1: 'MapTrifold',
    Location: 'MapPin',
    LocationTick: 'MapPin',
    RouteSquare: 'Path',
    Routing: 'Path',

    // ── Comunicação ────────────────────────────────────────────────
    Call: 'Phone',
    CallCalling: 'PhoneCall',
    Message: 'ChatCircle',

    // ── Documentos / dados ─────────────────────────────────────────
    DocumentText: 'FileText',
    DocumentCopy: 'Files',
    DocumentDownload: 'FileArrowDown',
    Book1: 'Book',
    ClipboardTick: 'ClipboardText',

    // ── Status / hierarquia ────────────────────────────────────────
    Award: 'Trophy',
    StatusUp: 'TrendUp',
    Chart: 'ChartBar',
    Grid2: 'GridFour',
    Shield: 'Shield',
    Danger: 'Warning',
    InfoCircle: 'Info',
    Setting4: 'GearSix',

    // ── Lugares / objetos ──────────────────────────────────────────
    Building: 'Building',
    Building4: 'Buildings',
    Window: 'AppWindow',
    Calendar: 'Calendar',
    CalendarEdit: 'CalendarBlank',
    Clock: 'Clock',
    Key: 'Key',
    Lock1: 'Lock',
    LampOn: 'Lamp',

    // 🧍 Pessoas / perfis 🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍🧍
    User: 'User',
    People: 'Users',
    Personalcard: 'IdentificationCard',
    Woman: 'Person',
    Man: 'Person',
    EmojiHappy: 'Smiley',

    // ── Pet ────────────────────────────────────────────────────────
    Pet: 'PawPrint',
    Heart: 'Heart',
    HeartAdd: 'HeartStraight',

    // ── Natureza / clima / elementos ───────────────────────────────
    Drop: 'Drop',
    Fire: 'Fire',
    Sun1: 'Sun',
    Tree: 'Tree',
    Triangle: 'Triangle',
    Wind: 'Wind',
    Electricity: 'Lightning',
    Candle2: 'Flame',

    // ── Transporte / viagem ────────────────────────────────────────
    Airplane: 'Airplane',
    AirplaneSquare: 'AirplaneTilt',
    Car: 'Car',
    TruckFast: 'Truck',

    // ── Específicos do domínio Vigilaro ────────────────────────────
    BoxTick: 'Package',
    Briefcase: 'Briefcase',
    Brush: 'PaintBrush',
    ChemicalGlass: 'Flask',
    MagicStar: 'MagicWand',
    Teacher: 'ChalkboardTeacher',
    Hammer: 'Hammer',
    Leaf: 'Leaf',
    Note: 'Note',
    Ruler: 'Ruler',
    Scissor: 'Scissors',
    Ticket: 'Ticket',
    Star: 'Star',
    Star1: 'Star',
    Crown: 'Crown',
    Cpu: 'Cpu',

    // ── Engajamento / sociais ──────────────────────────────────────
    LanguageSquare: 'Translate',
    MessageQuestion: 'Question',
    Lovely: 'Heart',
    HeartCircle: 'HeartStraight',
    Reserve: 'Bookmark',
    ExportSquare: 'Export',
    Profile: 'User',
    Profile2User: 'Users',

    // ── Dispositivos / mídia ───────────────────────────────────────
    Monitor: 'Monitor',
    Mobile: 'DeviceMobile',
    Microphone2: 'Microphone',
    Flash: 'Lightning',
    Flashy: 'Lightning',
    Broadcast: 'Broadcast',
    Brodcast: 'Broadcast', // typo in legacy callsites
    ScanBarcode: 'Barcode',
    Map: 'MapTrifold',
    Lamp: 'Lamp',
    ArchiveBox: 'Archive',
    Bubble: 'ChatCircle',
    TrendUp: 'TrendUp',

    // ── Ambientes da casa (Vigilaro) — Frente 2 ────────────────────
    // Substituem os antigos custom SVGs Linear (extintos na Fase 2 da migração).
    Kitchen: 'CookingPot',
    Bathroom: 'Shower',
    BabyCrib: 'Baby',
    Elder: 'Wheelchair',
    Stairs: 'Stairs',
    WashingMachine: 'WashingMachine',
    Pool: 'SwimmingPool',
    ShareNetwork: 'ShareNetwork',

    // ── Marks semânticos Vigilaro — Frente 2 ───────────────────────
    // Substituem os antigos custom SVGs Bold (assinaturas Vigilaro).
    // ProtejaPet: paw print universal (proteção vem do contexto: cor + label).
    // Metodologia3D: literal "3D" do Phosphor (ThreeD).
    // PrevencaoIncendio: extintor.
    // RiscoAmbiente: removido (zero usos no app).
    Metodologia3D: 'ThreeD',
    ProtejaPet: 'PawPrint',
    PrevencaoIncendio: 'FireExtinguisher',
};

// variant → Phosphor weight. Bold ancora (fill),
// Linear atua (regular). Bulk/TwoTone caem em duotone.
const VARIANT_TO_WEIGHT = {
    Bold: 'fill',
    Linear: 'regular',
    Broken: 'regular',
    Outline: 'regular',
    Bulk: 'duotone',
    TwoTone: 'duotone',
};

const variantToWeight = (variant) => VARIANT_TO_WEIGHT[variant] || 'regular';

export default function NeoIcon({
    name: rawName,
    size = 24,
    color = '#000000',
    variant = 'Linear', // Linear, Bold, Broken, Bulk, TwoTone
    style
}) {
    const name = mapName(rawName);
    const weight = variantToWeight(variant);

    // 0. Glifos próprios do Vigilaro (conceitos sem equivalente no Phosphor).
    //    Mesma API: respeitam size/color/weight.
    if (CUSTOM_ICONS[name]) {
        const CustomComponent = CUSTOM_ICONS[name];
        return (
            <View style={style}>
                <CustomComponent size={size} color={color} weight={weight} />
            </View>
        );
    }

    // 1. Phosphor via PHOSPHOR_MAP (caminho canônico).
    const phosphorName = PHOSPHOR_MAP[name];
    if (phosphorName && Phosphor[phosphorName]) {
        const PhosphorComponent = Phosphor[phosphorName];
        return (
            <View style={style}>
                <PhosphorComponent size={size} color={color} weight={weight} />
            </View>
        );
    }

    // 2. Tentativa direta no namespace do Phosphor (cobre nomes que já
    //    coincidem com a nomenclatura Phosphor sem entrada explícita).
    if (Phosphor[name]) {
        const PhosphorComponent = Phosphor[name];
        return (
            <View style={style}>
                <PhosphorComponent size={size} color={color} weight={weight} />
            </View>
        );
    }

    // 3. Fallback final: ícone de alerta para sinalizar nome não mapeado.
    //    Em dev, considere logar o nome ausente em PHOSPHOR_MAP.
    if (__DEV__ && rawName) {
        // eslint-disable-next-line no-console
        console.warn(`[NeoIcon] Nome não mapeado: "${rawName}" (resolvido como "${name}"). Adicione em PHOSPHOR_MAP.`);
    }
    const Fallback = Phosphor.Warning;
    return (
        <View style={style}>
            <Fallback size={size} color={color} weight={weight} />
        </View>
    );
}
