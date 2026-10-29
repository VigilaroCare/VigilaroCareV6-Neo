/**
 * pictogramasAtividades.js — o pictograma de cada categoria de Atividades Eventuais.
 *
 * Um lugar só: a grade da página (ModoPreventivoScreenNeo) e o modal de verificação
 * (AuditoriaAtividadeModal) leem daqui, para a arte do cartão e a arte do modal nunca divergirem.
 *
 * HOJE são peças reaproveitadas de outros assuntos (conjunto normalizado em
 * assets/illustrations/glifos): o balão da criança diz festa; o 60+ diz visitar idosos; o capacete,
 * obra; a mala, mudança; os brinquedos, supervisão de crianças; a placa de piso molhado, queda; o
 * frasco com aviso, química de limpeza.
 *
 * O Agnaldo decidiu (28/10/2026) que artes DEDICADAS valem mais, porque o cartão diz o assunto com o
 * título e com a imagem juntos. O pedido de arte está em docs/PLANO_PICTOGRAMAS_ATIVIDADES.md; quando
 * as peças chegarem, só estes `require` mudam.
 */

export const PICTOGRAMAS_ATIVIDADES = {
    festas_eventos: require('../assets/illustrations/glifos/pictogram-companhia-criancas.png'),
    visitacao_segura: require('../assets/illustrations/glifos/pictogram-companhia-idosos.png'),
    reformas_obras: require('../assets/illustrations/glifos/pictogram-guias-equipamentos.png'),
    mudanca_residencia: require('../assets/illustrations/glifos/pictogram-viagem-malas.png'),
    monitor_kids: require('../assets/illustrations/glifos/pictogram-brinquedos.png'),
    servicos_altura: require('../assets/illustrations/glifos/pictogram-riscos-fisicos.png'),
    faxina_quimica: require('../assets/illustrations/glifos/pictogram-produtos.png'),
};

/** O cartão "Planejar reforma, visita ou mudança" (o único que não abre uma verificação). */
export const PICTOGRAMA_PLANEJAR = require('../assets/illustrations/glifos/atividades-eventuais.png');

/**
 * A tinta do "60+" encosta na borda direita da própria caixa (2% de margem): sem recuo o "+" sai
 * cortado. Some quando a arte dedicada entrar.
 */
export const RECUO_DA_ARTE = { visitacao_segura: 6 };
