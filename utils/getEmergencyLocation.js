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

export async function getEmergencyLocation(timeoutMs = GPS_TIMEOUT_MS) {
    try {
        const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
        if (status !== 'granted') return null;

        const fix = await Promise.race([
            ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Balanced })
                .catch(() => null),
            new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs)),
        ]);
        if (fix?.coords) return fix.coords;

        const last = await ExpoLocation.getLastKnownPositionAsync().catch(() => null);
        return last?.coords || null;
    } catch {
        return null;
    }
}
