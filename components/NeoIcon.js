import React from 'react';
import { View } from 'react-native';
import * as Phosphor from 'phosphor-react-native';
import ElderlyIcon from './icons/ElderlyIcon';
import HomeTileIcon from './icons/HomeTileIcon';
import EducationTileIcon from './icons/EducationTileIcon';
import ReportTileIcon from './icons/ReportTileIcon';
import MenuTileIcon from './icons/MenuTileIcon';
import TravelTileIcon from './icons/TravelTileIcon';

// Glifos desenhados em casa, na gramática do Phosphor (viewBox 256,
// traço 16 arredondado, duotone = massa 0.2 + traço). Para conceitos
// que o catálogo não cobre.
// Família "eco do tile" (abas do menu inferior): glifo contemporâneo dentro de
// um quadrado de cantos arredondados que cita os tiles cerâmicos; "acende"
// preenchido no ativo (variant='Bold' → weight='fill').
const CUSTOM_ICONS = {
    Elderly: ElderlyIcon,
    HomeTile: HomeTileIcon,
    EducationTile: EducationTileIcon,
    ReportTile: ReportTileIcon,
    MenuTile: MenuTileIcon,
    TravelTile: TravelTileIcon,
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
        // 2026-07-31: 'pet' apontava para 'Heart'. Coração é afeto, não
        // espécie — e o alias rodava ANTES do PHOSPHOR_MAP, então a entrada
        // `Pet: 'PawPrint'` de lá nunca chegava a ser consultada. Passa a
        // resolver direto para a pata; ProtejaPet já usava PawPrint e agora
        // os dois são coerentes.
        'pet': 'PawPrint',
        'Pet': 'PawPrint',
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

    // Entradas acrescentadas em 2026-07-31 ao substituir emojis crus por
    // ícones. Emoji renderiza com a fonte do sistema — muda de desenho, cor e
    // tamanho conforme o fabricante do Android, ignora a paleta do DS e não
    // responde a `color`. Cada um destes tinha um emoji no lugar.
    // ── Restos da migração Iconsax → Phosphor (mapeados em 2026-07-31) ──────
    // Estes 26 nomes eram passados ao NeoIcon por telas espalhadas pelo app e
    // não existiam nem aqui nem no namespace do Phosphor, então caíam no
    // fallback: um TRIÂNGULO DE ALERTA no lugar do ícone pedido. Em dev sai um
    // console.warn, mas em release falha em silêncio — daí terem passado.
    // Auditoria: node -e "…" comparando todo name= do projeto contra este mapa.
    // Ambientes da casa (data/mapeamento_dados.js, campo `icone`).
    Armchair: 'Armchair',
    ForkKnife: 'ForkKnife',
    CookingPot: 'CookingPot',
    Baby: 'Baby',
    Bed: 'Bed',
    Shower: 'Shower',
    Package: 'Package',
    PottedPlant: 'PottedPlant',

    // Cards gêmeos de Vistorias: grade de calor por ambiente e lista por pessoa.
    GridFour: 'GridFour',
    UserList: 'UserList',

    Accessibility: 'Wheelchair',
    call: 'Phone',                     // components/OfflineModeModal.js
    Crown1: 'Crown',                   // components/PremiumBadge.js
    accessibility: 'Wheelchair',
    AddCircle: 'PlusCircle',
    Box: 'Package',
    Calendar1: 'CalendarBlank',
    Card: 'IdentificationCard',
    CloudCross: 'CloudSlash',          // offline / sem ligação
    Diamonds: 'Diamond',               // premium
    LampCharge: 'LightbulbFilament',
    MedicalSquare: 'FirstAidKit',
    medical: 'FirstAidKit',
    medkit: 'FirstAidKit',
    MessageText1: 'ChatText',
    Sms: 'ChatCircleText',
    Radar: 'Broadcast',
    Send2: 'PaperPlaneTilt',
    Task: 'ListChecks',
    TextalignJustifycenter: 'TextAlignCenter',
    Tick: 'Check',
    Weight: 'Scales',
    Whatsapp: 'WhatsappLogo',
    Wifi: 'WifiHigh',
    body: 'Person',
    happy: 'Smiley',
    paw: 'PawPrint',
    school: 'Student',

    Minus: 'Minus',                     // "não aplicável" (era ➖)
    Motorcycle: 'Motorcycle',           // segurança em motos (era 🏍️)
    Pedestrian: 'PersonSimpleWalk',     // travessia e autonomia a pé (era 🚸)
    Newspaper: 'Newspaper',             // micro blog (era 📰)
    ClipboardText: 'ClipboardText',     // novo checklist (era 📋)
    Lightbulb: 'Lightbulb',             // dica (era 💡)
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

    // ── Categorias de risco (data/categoriasRisco.js) ──────────────
    // Uma por categoria: o mapa de riscos nunca sinaliza uma categoria
    // só por cor (WCAG 1.4.1), então estes nomes são contrato, não enfeite.
    Barricade: 'Barricade',              // acidentes e lesões
    Flask: 'Flask',                      // produtos químicos
    Thermometer: 'Thermometer',          // condições do ambiente
    Virus: 'Virus',                      // contaminação e higiene
    PersonSimpleWalk: 'PersonSimpleWalk',// ergonomia e acessibilidade
    FirstAidKit: 'FirstAidKit',          // preparação e resposta
    ShieldWarning: 'ShieldWarning',
    MapTrifold: 'MapTrifold',
    UserFocus: 'UserFocus',              // vínculo com o morador em foco
    // Usado pelo NIVEIS_PROTECAO do ScoreService desde antes deste mapa;
    // caía no fallback direto do namespace, com aviso em DEV a cada render.
    WarningOctagon: 'WarningOctagon',

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

    // ── Restos da migração Iconsax → Phosphor (mapeados em 2026-08-03) ──────
    // Seis nomes que ainda caíam no fallback (triângulo de alerta) e enchiam
    // o console em toda montagem da Home e do menu inferior. Note que
    // 'gas-station' e 'happyemoji' já tinham entrada em `overrides`, mas
    // apontavam para si mesmos ('GasStation' → 'GasStation') — como esses
    // nomes não existem no namespace do Phosphor, o override não resolvia
    // nada. A tradução real precisa estar aqui.
    Home: 'House',            // callsites usam name="home" (minúsculo)
    House2: 'House',          // name="house-2" → House2
    Box1: 'Package',          // name="box-1" → Box1 (coerente com Box: 'Package')
    Buildings2: 'Buildings',  // name="buildings-2" → Buildings2
    Happyemoji: 'Smiley',     // coerente com EmojiHappy: 'Smiley'
    GasStation: 'GasPump',    // Phosphor chama de GasPump
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