/**
 * getEmergencyLocation — localização para fluxos de EMERGÊNCIA.
 *
 * Regra de ouro (auditoria 2026-06-12, item G33): o socorro NUNCA espera o
 * GPS. `getCurrentPositionAsync` sem timeout pode pendurar indefinidamente
 * em ambiente fechado/porão — e segurava o envio do SMS de SOS.
 *
 * Estratégia: corrida de `timeoutMs` pelo fix atual; perdeu a corrida ou
 * falhou → última posição conhecida (instantânea, pode ser velha — em
 * emergência, localização aproximada > nenhuma); nada disponível → null.
 * NUNCA lança: o chamador segue com o SOS sem localização.
 *
 * @returns {Promise<{latitude:number, longitude:number}|null>}
 */
import * as ExpoLocation from 'expo-location';

const GPS_TIMEOUT_MS = 4000;

/**
 * Estados possiveis, para o indicador da tela de SOS saber o que oferecer.
 *   PRONTA        — temos coordenadas (fix atual ou ultima conhecida)
 *   BUSCANDO      — em curso (estado inicial, definido pelo chamador)
 *   SEM_PERMISSAO — o utilizador pode conceder; vale pedir de novo
 *   BLOQUEADA     — negada em definitivo; so resolve nas Definicoes do sistema
 *   INDISPONIVEL  — permissao ok, mas o aparelho nao devolveu posicao
 *                   (subsolo, GPS desligado, timeout)
 */
export const LOCATION_STATUS = {
    PRONTA: 'pronta',
    BUSCANDO: 'buscando',
    SEM_PERMISSAO: 'sem_permissao',
    BLOQUEADA: 'bloqueada',
    INDISPONIVEL: 'indisponivel',
};

/**
 * Versao detalhada: alem das coordenadas, diz POR QUE nao as tem.
 *
 * Existe porque `getEmergencyLocation` devolve null tanto para "negou a
 * permissao" como para "o GPS nao pegou" — e a acao certa e diferente em cada
 * caso (pedir permissao vs abrir as Definicoes vs so tentar de novo). Sem esta
 * distincao, o indicador do SOS so poderia dizer "sem localizacao" e deixar o
 * utilizador sem saida.
 *
 * Mantem a regra de ouro (auditoria 2026-06-12, item G33): NUNCA lanca e nunca
 * espera alem do timeout. O socorro nao espera o GPS.
 *
 * @param {number} timeoutMs
 * @param {boolean} pedirPermissao - false apenas consulta o estado atual, sem
 *        mostrar o dialogo do sistema (util para refrescar o indicador).
 * @returns {Promise<{coords: object|null, status: string, podePerguntar: boolean}>}
 */
export async function getEmergencyLocationDetailed(timeoutMs = GPS_TIMEOUT_MS, pedirPermissao = true) {
    try {
        const permissao = pedirPermissao
            ? await ExpoLocation.requestForegroundPermissionsAsync()
            : await ExpoLocation.getForegroundPermissionsAsync();

        const { status, canAskAgain = true } = permissao || {};

        if (status !== 'granted') {
            return {
                coords: null,
                status: canAskAgain ? LOCATION_STATUS.SEM_PERMISSAO : LOCATION_STATUS.BLOQUEADA,
                podePerguntar: canAskAgain,
            };
        }

        const fix = await Promise.race([
            ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Balanced })
                .catch(() => null),
            new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs)),
        ]);
        if (fix?.coords) {
            return { coords: fix.coords, status: LOCATION_STATUS.PRONTA, podePerguntar: false };
        }

        // Perdeu a corrida ou falhou: ultima posicao conhecida e instantanea e,
        // numa emergencia, aproximada vale mais do que nenhuma.
        const last = await ExpoLocation.getLastKnownPositionAsync().catch(() => null);
        if (last?.coords) {
            return { coords: last.coords, status: LOCATION_STATUS.PRONTA, podePerguntar: false };
        }

        return { coords: null, status: LOCATION_STATUS.INDISPONIVEL, podePerguntar: false };
    } catch {
        return { coords: null, status: LOCATION_STATUS.INDISPONIVEL, podePerguntar: false };
    }
}

/**
 * Assinatura original preservada — devolve só as coordenadas ou null.
 * Mantida para os chamadores que não precisam do motivo.
 */
export async function getEmergencyLocation(timeoutMs = GPS_TIMEOUT_MS) {
    const { coords } = await getEmergencyLocationDetailed(timeoutMs);
    return coords;
}
