/**
 * NeoSectionHero.js — o hero de seção que a ANATOMIA descrevia e nunca teve.
 *
 * POR QUE ESTE ARQUIVO EXISTE
 * O §3② da ANATOMIA_EDITORIAL_VIGILARO.md define o hero como formato ÚNICO —
 * NeoCard com arte à esquerda e lead à direita — e PROÍBE banner full-bleed com
 * fundo próprio. Só que nunca houve componente: 25 telas copiaram o bloco à mão,
 * e a cópia trouxe junto três violações por tela (banner de 280px, botão de
 * voltar estilizado inline contra a proibição nº 4, e paralaxe repetida). O
 * §9.1 já tinha prescrito a saída: "migrar para o componente único em vez de
 * continuar copiando o bloco". Faltava o componente.
 *
 * A ALTURA NÃO SE DECLARA AQUI — E ESSE É O PONTO
 * Havia QUATRO alturas no app (280 em 18 telas, 200 em 5, 240 e 220). Cada uma
 * nasceu de uma cópia, nenhuma de uma decisão. Por isso este componente não tem
 * constante de altura: ela é consequência de `DS.layout.heroArt` (a arte) mais o
 * respiro do card, ambos tokens. Sem número para divergir, não há como derivar
 * de novo — e a anatomia já proíbe valor chutado em padding (§3⑥).
 *
 * Decisão de 23/10/2026 (Agnaldo): o 280 era exagerado e o 72 do texto original
 * foi escrito para telas de ficha, não para hub com foto de capa. Ficou o meio,
 * de propósito e registrado — ver §3② e §9.3 da anatomia.
 */
import { View, Image, StyleSheet } from 'react-native';

import NeoCard from './NeoCard';
import { H2, Body } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';

/**
 * @param {object}   props
 * @param {string}   props.titulo     Título da seção. Vai em H2 porque o H1 da
 *                                    tela é do NeoScreenHeader (§6, proibição 2).
 * @param {string}  [props.lead]      Uma frase de contexto. Omita quando não houver
 *                                    o que dizer — lead inventado é perfumaria.
 * @param {any}      props.arte       `require(...)` da ilustração/foto da seção.
 * @param {string}  [props.variant]   'glass' (padrão) ou 'premium' (1 por tela).
 * @param {object}  [props.style]     Margem externa, quando a tela precisar.
 */
export default function NeoSectionHero({ titulo, lead, arte, variant = 'glass', style }) {
    return (
        <NeoCard variant={variant} style={[s.card, style]}>
            <View style={s.linha}>
                {arte ? (
                    // contain, nunca cover: a arte é um objeto desenhado e centrado.
                    // `cover` recorta a borda e faz o objeto parecer deslocado — foi
                    // o que deixou os pictogramas internos desproporcionais.
                    <Image source={arte} style={s.arte} resizeMode="contain" accessible={false} />
                ) : null}
                <View style={s.texto}>
                    <H2 numberOfLines={2}>{titulo}</H2>
                    {lead ? <Body style={s.lead} numberOfLines={3}>{lead}</Body> : null}
                </View>
            </View>
        </NeoCard>
    );
}

const s = StyleSheet.create({
    card: { marginTop: Neo.spacing.sm },
    linha: { flexDirection: 'row', alignItems: 'center', gap: Neo.spacing.md },
    // A arte é o ÚNICO número de tamanho aqui, e vem do token.
    arte: { width: Neo.layout.heroArt, height: Neo.layout.heroArt },
    texto: { flex: 1, gap: Neo.spacing.xs },
    lead: { opacity: 0.85 },
});
