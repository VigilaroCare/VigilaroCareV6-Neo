/**
 * Theme.js
 * BRIDGE DE MARCA — Vigilaro Care
 *
 * Este arquivo é o sistema legado (V5) consumido por ~51 telas. Em vez de
 * migrar tela a tela, os TOKENS abaixo foram re-apontados para a paleta
 * premium aprovada do DesignSystem2026 (Forest Deep + Emerald + Champagne).
 * O shape (nomes das chaves) é mantido intacto — só os valores mudaram.
 *
 * A antiga paleta "Serenity" (azul institucional #1976D2 + Material green)
 * criava uma segunda identidade visual dentro do app. Auditoria D1
 * (AUDITORIA_V2_POS_CORRECOES.md, Parte 4).
 *
 * Telas NOVAS não devem importar este arquivo — usem DS de DesignSystem2026.
 */

import { LightColors } from './DesignSystem2026';

// ============================================
// PALETA DE CORES — re-apontada para a marca premium (DS2026)
// ============================================

export const Colors = {
  // Cores Primárias — Forest Deep (assinatura da marca)
  primary: LightColors.primary[700],          // '#047857' Forest (era azul #1976D2)
  primaryGradientStart: LightColors.primary[800],
  primaryGradientEnd: LightColors.primary[700],
  primaryDark: LightColors.primary[900],
  primaryLight: LightColors.primary[100],     // Tint leve para fundos

  // Cores Secundárias — Emerald accent
  secondary: LightColors.primary[500],        // '#10B981' Emerald
  secondaryDark: LightColors.primary[600],
  secondaryLight: LightColors.primary[100],

  // Feedback Semântico (alinhado ao DS / iOS System)
  success: LightColors.feedback.success,      // '#34C759'
  // Warning legado era usado como texto/ícone sobre branco; o amarelo iOS do
  // DS (#FFCC00) não tem contraste pra esse uso. Amber-700 mantém a semântica
  // com contraste AA e casa com gridAccents.eventuais.
  warning: '#B45309',
  error: LightColors.feedback.error,          // '#FF3B30'
  info: LightColors.feedback.info,            // '#5AC8FA'

  // Fundos
  background: LightColors.neutral[100],       // Off-white DS
  surface: LightColors.neutral.white,
  surfaceVariant: LightColors.neutral[200],

  // Textos (escala neutra DS)
  textPrimary: LightColors.neutral[900],
  textSecondary: LightColors.neutral[700],
  textTertiary: LightColors.neutral[500],
  textInverted: LightColors.neutral.white,

  // Categorias de Risco — dessaturadas (Tailwind 700) na linguagem premium
  // do gridAccents, substituindo os pastéis Material.
  gestantes: '#BE185D',   // Rose-700
  bebe: '#B45309',        // Amber-700
  crianca: '#0369A1',     // Sky-700
  adolescente: '#6D28D9', // Violet-700
  adulto: LightColors.primary[700], // Forest
  idoso: LightColors.accent.champagne, // Champagne signature
  pcd: '#0F766E',         // Teal-700
  pet: '#92400E',         // Amber-800 (terroso)

  // Utilidades
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  divider: LightColors.neutral[300],
  border: LightColors.neutral[300],

  // Sombras
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },

  // Névoa de Fundo — usa o mist premium do DS2026 (off-white quente),
  // substituindo o "green mist" antigo que criava sopa esverdeada.
  mist: LightColors.mist,
};

// ============================================
// PALETA DARK MODE - PREMIUM
// ============================================

export const DarkColors = {
  // Fundos Premium
  background: '#0f0f1a',        // Azul escuro profundo
  surface: '#1a1a2e',           // Card background
  surfaceVariant: '#252538',    // Elevated surface
  surfaceAccent: '#2d2d44',     // Borders, dividers

  // SOS/Emergência
  sosFamily: '#DC2626',         // Vermelho intenso
  sosPets: '#EA580C',           // Laranja

  // Hubs
  hubQuem: '#7C3AED',           // Roxo Violeta
  hubOnde: '#059669',           // Verde Esmeralda  
  hubOque: '#D97706',           // Laranja Âmbar
  hubComo: '#10B981',           // Verde Turquesa

  // Alertas
  alertWarning: '#FBBF24',      // Amarelo
  alertDanger: '#EF4444',       // Vermelho
  alertInfo: '#3B82F6',         // Azul

  // Textos
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textTertiary: 'rgba(255, 255, 255, 0.5)',

  // Accent
  primary: '#00D2FF',
  secondary: '#38E38E',
};

// ============================================
// ESPAÇAMENTOS
// ============================================

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ============================================
// TIPOGRAFIA — Plus Jakarta Sans (identidade do DS2026)
// Os nomes "Poppins-*" anteriores apontavam pra uma fonte que NUNCA é
// carregada (App.js só carrega Plus Jakarta) — as telas legadas caíam
// silenciosamente em system font. Agora usam a fonte real da marca.
// ============================================

export const Typography = {
  fontFamily: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semibold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    // Fallback caso a fonte não carregue
    system: 'System',
  },

  // Tamanhos (Escala Modular)
  sizes: {
    xs: 14,
    sm: 16, // Texto base (regular)
    md: 18, // Subtítulos
    lg: 22, // Títulos menores
    xl: 26, // Títulos principais
    xxl: 34,
    xxxl: 42,
  },

  // Pesos
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line Heights (Generoso: 1.3x a 1.5x)
  lineHeights: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.8,
  }
};

// ============================================
// BORDAS E RAIOS (Arredondado Moderno)
// ============================================

export const BorderRadius = {
  sm: 8,
  md: 16, // Padrão aumentado para 16
  lg: 20, // Cards maiores
  xl: 24,
  round: 9999,
};

// ============================================
// SOMBRAS (Suaves & Realistas)
// ============================================

export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },

  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  }
};

// ============================================
// COMPONENTES COMUNS
// ============================================

export const Components = {
  // Card padrão
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg, // 20
    padding: Spacing.md,
    ...Shadows.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  // Botão primário (Gradiente simulado com cor sólida por enquanto)
  buttonPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },

  buttonPrimaryText: {
    color: Colors.white,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },

  // Botão secundário
  buttonSecondary: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSecondaryText: {
    color: Colors.primary,
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.medium,
    fontFamily: 'PlusJakartaSans_500Medium',
  },

  // Input
  input: {
    backgroundColor: Colors.surfaceVariant,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.md,
    fontFamily: 'PlusJakartaSans_400Regular',
    color: Colors.textPrimary,
  },

  // Badge
  badge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.round,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceVariant,
  }
};

// ============================================
// BRIDGE PARA DESIGN SYSTEM 2026 (NEO)
// ============================================
import { DS } from './DesignSystem2026';

export const Neo = DS;

// ============================================
// EXPORT DEFAULT
// ============================================

export default {
  Colors,
  Spacing,
  Typography,
  BorderRadius,
  Shadows,
  Components,
  Neo, // Acesso direto ao novo sistema: Theme.Neo.colors.primary[500]
};
