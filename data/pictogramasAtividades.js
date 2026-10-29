/**
 * pictogramasAtividades.js — o pictograma de cada categoria de Atividades Eventuais.
 *
 * Um lugar só: a grade da página (ModoPreventivoScreenNeo), o modal de verificação
 * (AuditoriaAtividadeModal) e as páginas do fluxo 'Planejar' leem daqui.
 *
 * Artes DEDICADAS do Agnaldo (29/10/2026), normalizadas por scripts/reenquadrar_acervo.js (tabela
 * LIMPAS). O pedido original está em docs/PLANO_PICTOGRAMAS_ATIVIDADES.md.
 */

export const PICTOGRAMAS_ATIVIDADES = {
    festas_eventos: require('../assets/illustrations/glifos/pictogram-atividade-festas.png'),
    visitacao_segura: require('../assets/illustrations/glifos/pictogram-atividade-visita.png'),
    reformas_obras: require('../assets/illustrations/glifos/pictogram-atividade-obras.png'),
    mudanca_residencia: require('../assets/illustrations/glifos/pictogram-atividade-mudanca.png'),
    monitor_kids: require('../assets/illustrations/glifos/pictogram-atividade-criancas.png'),
    servicos_altura: require('../assets/illustrations/glifos/pictogram-atividade-altura.png'),
    faxina_quimica: require('../assets/illustrations/glifos/pictogram-atividade-faxina.png'),
};

/** O cartão 'Planejar reforma, visita ou mudança' (o único que não abre uma verificação). */
export const PICTOGRAMA_PLANEJAR = require('../assets/illustrations/glifos/pictogram-atividade-planejar.png');

/** Recuo da arte no cartão, por categoria. A arte dedicada não precisa de nenhum. */
export const RECUO_DA_ARTE = {};
