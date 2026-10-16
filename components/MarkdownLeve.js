/**
 * MarkdownLeve — interpretador mínimo do markdown que o conteúdo do app usa.
 *
 * POR QUE EXISTE (16/10/2026)
 * O Agnaldo pediu, na revisão do conteúdo: "Eliminar os asteriscos de todos os
 * conteúdos". Conferido: a tela de artigo (PremiumArticleScreen) pintava o texto
 * cru num <Body>, e o usuário via "**Capacete:**" e "# Título" literais. O
 * conteúdo usa markdown para ESTRUTURA — títulos, listas, rótulo em negrito no
 * começo de cada item — então apagar os asteriscos apagaria a estrutura junto.
 * Interpretar resolve as duas coisas.
 *
 * Já havia um interpretador parcial dentro de ConceitoDetailScreen (títulos e
 * marcadores, sem negrito). Pelo pilar 3 do CLAUDE.md ele foi EXTRAÍDO para
 * cá e as duas telas passam a usar este — não um segundo interpretador.
 *
 * O QUE ENTENDE
 *   # / ## / ###        títulos
 *   * / - / •           item de lista
 *   1. 2. 3.            lista numerada
 *   linha vazia         espaço
 *   **negrito**         dentro de qualquer linha
 *   *itálico*           dentro de qualquer linha
 *
 * COR: não fixa nenhuma. O texto herda o estilo que a tela passa (que já vem
 * da paleta ativa, inclusive alto contraste) e o negrito é aninhado, então
 * herda a cor do pai. Cor fixa aqui desligaria o alto contraste — regra do
 * projeto (ver memória "Tema e tinta").
 */
import { View, Text, StyleSheet } from 'react-native';
import { H2, H3, Body } from './NeoTypography';
import { useThemeColors } from '../utils/ThemeContext';

const RX_INLINE = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/g;

/** Quebra uma linha em trechos normais, negrito e itálico, já como nós. */
export function renderInline(texto) {
    const partes = String(texto).split(RX_INLINE).filter((p) => p !== '');
    return partes.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**') && p.length > 4) {
            return <Text key={i} style={s.negrito}>{p.slice(2, -2)}</Text>;
        }
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) {
            return <Text key={i} style={s.italico}>{p.slice(1, -1)}</Text>;
        }
        return p;
    });
}

/** Tira a marcação e devolve texto puro — para acessibilidade e busca. */
export function semMarkdown(texto) {
    return String(texto || '')
        .replace(/^#{1,3}\s+/gm, '')
        .replace(/^\s*[*\-•]\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*\s][^*]*)\*/g, '$1');
}

/**
 * @param {string}  texto        o conteúdo com markdown
 * @param {object}  estiloTexto  estilo do corpo (a tela passa a cor do tema)
 * @param {string}  corDestaque  cor dos títulos e marcadores; opcional
 */
export default function MarkdownLeve({ texto, estiloTexto, corDestaque }) {
    const cores = useThemeColors();
    if (!texto) return null;
    const linhas = String(texto).replace(/\r\n?/g, '\n').split('\n');
    const destaque = corDestaque ? { color: corDestaque } : null;

    return (
        <View>
            {linhas.map((linha, i) => {
                const t = linha.trim();
                if (!t) return <View key={i} style={s.espaco} />;

                if (t.startsWith('### ')) {
                    return <H3 key={i} style={[s.h3, estiloTexto, destaque]}>{renderInline(t.slice(4))}</H3>;
                }
                if (t.startsWith('## ')) {
                    return <H3 key={i} style={[s.h2, destaque]}>{renderInline(t.slice(3))}</H3>;
                }
                if (t.startsWith('# ')) {
                    return <H2 key={i} style={[s.h1, destaque]}>{renderInline(t.slice(2))}</H2>;
                }

                const marcador = /^[*\-•]\s+/.exec(t);
                if (marcador) {
                    return (
                        <View key={i} style={s.item}>
                            <View style={[s.ponto, { backgroundColor: corDestaque || cores.neutral[500] }]} />
                            <Body style={[s.textoItem, estiloTexto]}>{renderInline(t.slice(marcador[0].length))}</Body>
                        </View>
                    );
                }

                const numero = /^(\d+)\.\s+/.exec(t);
                if (numero) {
                    return (
                        <View key={i} style={s.item}>
                            <Body style={[s.numero, estiloTexto, destaque]}>{numero[1]}.</Body>
                            <Body style={[s.textoItem, estiloTexto]}>{renderInline(t.slice(numero[0].length))}</Body>
                        </View>
                    );
                }

                return <Body key={i} style={[s.paragrafo, estiloTexto]}>{renderInline(t)}</Body>;
            })}
        </View>
    );
}

const s = StyleSheet.create({
    espaco: { height: 8 },
    h1: { marginTop: 16, marginBottom: 8 },
    h2: { marginTop: 12, marginBottom: 4 },
    h3: { marginTop: 8, marginBottom: 4, fontSize: 16, fontWeight: '700' },
    item: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
    // Sem cor de destaque, o marcador usa o neutro da paleta ATIVA (que muda
    // com escuro e alto contraste), nunca um hex fixo.
    ponto: { width: 8, height: 8, borderRadius: 4, marginTop: 8, marginRight: 12 },
    numero: { marginRight: 8, fontWeight: '700' },
    textoItem: { flex: 1 },
    paragrafo: { marginBottom: 4 },
    negrito: { fontWeight: '700' },
    italico: { fontStyle: 'italic' },
});
