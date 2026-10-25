/**
 * NeoGlifoCard.js
 *
 * O card em que o PICTOGRAMA mora na luz.
 *
 * POR QUE EXISTE
 * A pergunta do Agnaldo em 25/10/2026 derrubou a solução anterior: "por que o
 * pictograma está dentro de um card bege que está dentro do card?". A placa
 * clara atrás da arte era remendo para dar contraste a ela — não decisão de
 * desenho. Aqui o campo é UM só: o gradiente vai do escuro na borda ao claro no
 * canto inferior direito, e a arte é assentada exatamente nesse canto. Ela ganha
 * contraste do próprio card. Sem placa, sem moldura, sem card dentro de card.
 *
 * COMO SE DIFERENCIA DO PictogramTile
 * `PictogramTile` desenha o prato creme e recua o glifo para caber nele
 * (FATOR_TILE). Aqui NÃO há prato, então a arte entra no tamanho cheio do
 * arquivo — que desde 70e0adf ocupa 73% do quadro. Uma fonte de arte, dois
 * enquadramentos.
 *
 * POR QUE SVG E NÃO expo-linear-gradient
 * `expo-linear-gradient` só faz gradiente linear, e linear não produz
 * retroiluminação: a luz tem de vir de um ponto. `react-native-svg` (15.12.1,
 * já em uso no app) tem RadialGradient nativo nas duas plataformas.
 *
 * A COR VEM DO DADO, NÃO DO GOSTO
 * `tom` indexa `DS.gradients.radiais`, os mesmos tons de severidade dos
 * `card*Dark` lineares. Quem decide o tom é quem chama — numa tela com score,
 * `ScoreService.getBanda()`; numa tela de conteúdo, a seção.
 */
import { useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { DS as Neo } from '../utils/DesignSystem2026';

// Ids de gradiente são globais no documento SVG. Em RN cada <Svg> é o seu
// próprio documento, mas um id repetido entre instâncias já causou colisão em
// versões antigas da lib — o contador custa nada e remove a dúvida.
let seq = 0;

export default function NeoGlifoCard({
    source,
    titulo,
    tom = 'info',
    onPress,
    style,
    arte = 70,          // lado da CAIXA da arte; o desenho ocupa ~73% dela
    tamanhoTitulo = 11,
    // Número no pé do card. Só passe quando o dado for REAL e já estiver
    // carregado — a prancha L decidiu que card sem dado não inventa número, e
    // que a assimetria (um card com número, os outros sem) É a informação: o
    // que tem número é o que pede ação.
    valor,
    unidade,
    accessibilityLabel,
    ...rest
}) {
    const id = useRef(`glifo${++seq}`).current;
    const r = Neo.gradients.radiais;
    const cores = r[tom] || r.info;

    const corpo = (
        <View style={[styles.card, style]}>
            <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
                <Defs>
                    <RadialGradient id={id} cx={r.foco.cx} cy={r.foco.cy} rx={r.foco.rx} ry={r.foco.ry}>
                        {cores.map((c, i) => (
                            <Stop key={i} offset={r.paradas[i]} stopColor={c} stopOpacity="1" />
                        ))}
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
            </Svg>

            {/* A arte no canto da luz. Sangra 3px para fora em baixo e à direita:
                o arquivo tem ~13% de margem transparente de cada lado, então o
                desenho fica com respiro real mesmo encostando a caixa na borda. */}
            <Image
                source={source}
                style={[styles.arte, { width: arte, height: arte }]}
                resizeMode="contain"
            />

            {/* Título no ALTO, não embaixo. Embaixo ele disputa a faixa
                horizontal com a arte: medido em 25/10/2026, "Segurança em
                Condomínio" a 11px não cabe ao lado de um pictograma de 70px numa
                célula de 112px. No alto ele tem a largura inteira do card. */}
            <Text
                style={[styles.titulo, { fontSize: tamanhoTitulo, lineHeight: Math.round(tamanhoTitulo * 1.18) }]}
                numberOfLines={2}
            >
                {titulo}
            </Text>

            {valor != null && (
                <View style={styles.pe}>
                    <Text style={[styles.valor, { fontSize: Math.round(tamanhoTitulo * 2.1) }]}>{valor}</Text>
                    {!!unidade && <Text style={styles.unidade}>{unidade}</Text>}
                </View>
            )}
        </View>
    );

    if (!onPress) return corpo;
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || titulo}
            style={styles.toque}
            {...rest}
        >
            {corpo}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toque: { flex: 1 },
    card: {
        flex: 1,
        borderRadius: 18,
        overflow: 'hidden',
    },
    arte: {
        position: 'absolute',
        right: -3,
        bottom: -3,
    },
    pe: {
        position: 'absolute',
        left: 10,
        bottom: 8,
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    valor: {
        color: '#FFFFFF',
        fontWeight: '800',
        letterSpacing: -0.6,
        textShadowColor: 'rgba(0,0,0,0.30)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 8,
    },
    unidade: {
        color: 'rgba(255,255,255,0.86)',
        fontSize: 11,
        marginLeft: 4,
        fontWeight: '600',
    },
    titulo: {
        position: 'absolute',
        left: 10,
        right: 9,
        top: 9,
        // Tinta FIXA, não do tema: o campo do card não acompanha o modo claro /
        // escuro — ele é sempre saturado. Com a tinta do tema, o texto do modo
        // claro sumiria sobre a borda escura do gradiente.
        color: '#FFFFFF',
        fontWeight: '700',
        letterSpacing: -0.1,
        textShadowColor: 'rgba(0,0,0,0.30)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 8,
    },
});
