/**
 * TriColorBar.js
 * Barra de conformidade tri-color para checklists
 * Vigilaro Care V6 Neo
 *
 * Exibe a distribuição visual de itens em 3 faixas:
 *   🔵 B (Baixo)   — Itens conformes (respondidos "S")
 *   🟡 A (Atenção)  — Itens não-conformes de risco normal
 *   🔴 V (Crítico)  — Itens não-conformes de risco crítico
 */

import { View } from 'react-native';
import { Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { useThemeColors } from '../utils/ThemeContext';

const COLORS = {
  baixo:    Neo.colors.secondary[500],  // Blue-500
  atencao:  Neo.colors.feedback.warning, // Amber-500
  critico:  Neo.colors.feedback.error,   // Red-500
  empty:    Neo.colors.neutral[300],     // Gray-200
};

/**
 * @param {Object} props
 * @param {number} props.baixo    — Quantidade de itens conformes
 * @param {number} props.atencao  — Quantidade de itens risco normal (N em item não-crítico)
 * @param {number} props.critico  — Quantidade de itens risco crítico (N em item crítico)
 * @param {number} props.total    — Total de itens respondidos (excluindo N/A)
 * @param {number} [props.height] — Altura da barra (default: 10)
 * @param {boolean} [props.showLabels] — Exibir labels percentuais (default: true)
 * @param {boolean} [props.showLegend] — Exibir legenda abaixo (default: false)
 * @param {Object} [props.style]  — Estilo adicional do container
 */
export default function TriColorBar({
  baixo = 0,
  atencao = 0,
  critico = 0,
  total = 0,
  height = 10,
  showLabels = true,
  showLegend = false,
  style,
}) {
  const colors = useThemeColors();
  const effective = total || (baixo + atencao + critico);
  if (effective === 0) {
    return (
      <View style={[{ marginVertical: 8 }, style]}>
        <View style={{ height, backgroundColor: COLORS.empty, borderRadius: height / 2, overflow: 'hidden' }} />
        {showLabels && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 6 }}>
            <Small style={{ color: colors.neutral[400], fontSize: 11 }}>Nenhum item respondido</Small>
          </View>
        )}
      </View>
    );
  }

  const pctB = Math.round((baixo / effective) * 100);
  const pctA = Math.round((atencao / effective) * 100);
  const pctV = 100 - pctB - pctA; // Avoid rounding issues

  return (
    <View style={[{ marginVertical: 8 }, style]}>
      {/* Barra segmentada */}
      <View style={{
        height,
        borderRadius: height / 2,
        overflow: 'hidden',
        flexDirection: 'row',
        backgroundColor: COLORS.empty,
      }}>
        {pctB > 0 && (
          <View style={{
            flex: baixo,
            backgroundColor: COLORS.baixo,
            borderTopLeftRadius: height / 2,
            borderBottomLeftRadius: height / 2,
            borderTopRightRadius: atencao === 0 && critico === 0 ? height / 2 : 0,
            borderBottomRightRadius: atencao === 0 && critico === 0 ? height / 2 : 0,
          }} />
        )}
        {pctA > 0 && (
          <View style={{
            flex: atencao,
            backgroundColor: COLORS.atencao,
            borderTopLeftRadius: baixo === 0 ? height / 2 : 0,
            borderBottomLeftRadius: baixo === 0 ? height / 2 : 0,
            borderTopRightRadius: critico === 0 ? height / 2 : 0,
            borderBottomRightRadius: critico === 0 ? height / 2 : 0,
          }} />
        )}
        {pctV > 0 && critico > 0 && (
          <View style={{
            flex: critico,
            backgroundColor: COLORS.critico,
            borderTopRightRadius: height / 2,
            borderBottomRightRadius: height / 2,
            borderTopLeftRadius: baixo === 0 && atencao === 0 ? height / 2 : 0,
            borderBottomLeftRadius: baixo === 0 && atencao === 0 ? height / 2 : 0,
          }} />
        )}
      </View>

      {/* Labels percentuais */}
      {showLabels && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingHorizontal: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.baixo }} />
            <Small style={{ color: colors.neutral[500], fontSize: 11, fontWeight: '600' }}>Atende {pctB}%</Small>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.atencao }} />
            <Small style={{ color: colors.neutral[500], fontSize: 11, fontWeight: '600' }}>Atenção {pctA}%</Small>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.critico }} />
            <Small style={{ color: colors.neutral[500], fontSize: 11, fontWeight: '600' }}>Crítico {pctV > 0 && critico > 0 ? pctV : 0}%</Small>
          </View>
        </View>
      )}

      {/* Legenda descritiva (opcional) */}
      {showLegend && (
        <View style={{ marginTop: 10, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: COLORS.baixo }} />
            <Small style={{ color: colors.neutral[800], fontSize: 12 }}>Conforme (Baixo risco)</Small>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: COLORS.atencao }} />
            <Small style={{ color: colors.neutral[800], fontSize: 12 }}>Atenção (Risco moderado)</Small>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: COLORS.critico }} />
            <Small style={{ color: colors.neutral[800], fontSize: 12 }}>Crítico (Risco alto)</Small>
          </View>
        </View>
      )}
    </View>
  );
}

// Helper: calcula distribuição B/A/V a partir de respostas e itens
TriColorBar.calculate = (answers, items) => {
  let baixo = 0, atencao = 0, critico = 0;

  answers.forEach(answer => {
    if (answer.status === 'na') return; // N/A não conta

    if (answer.status === 'conforme' || answer.isSafe) {
      baixo++;
    } else {
      // Verificar se o item é crítico
      const item = items?.find(i => i.id === answer.questionId || i.key === answer.questionId);
      if (item?.critico) {
        critico++;
      } else {
        atencao++;
      }
    }
  });

  return { baixo, atencao, critico, total: baixo + atencao + critico };
};
