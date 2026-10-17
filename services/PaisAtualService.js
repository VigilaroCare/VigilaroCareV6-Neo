/**
 * PaisAtualService — mantém o PAÍS onde a pessoa está, para os números de
 * emergência (17/10/2026).
 *
 * Problema que resolve: o app usava a Região configurada no aparelho. O
 * brasileiro em Lisboa via "ligue 192"; o português no Rio via "112".
 *
 * PRIVACIDADE — o que este serviço faz e não faz:
 *   • NUNCA pede permissão (só consulta). Quem pede é o tour inicial, o SOS
 *     e o botão "Ativar localização" dos avisos — sempre por ação da pessoa.
 *   • A posição é usada só no aparelho, contra um mapa embarcado
 *     (data/fronteirasPaises.js). Nada sai do celular.
 *   • Só o CÓDIGO do país é guardado (ex.: "PT"), nunca coordenadas.
 *   • Sem permissão, apaga o que tinha: sem posição, o país volta a ser o
 *     do aparelho — e os avisos dizem isso com todas as letras.
 *
 * Nunca lança e nunca trava: falhou, fica o último país conhecido.
 */
import * as ExpoLocation from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import { paisPelaPosicao } from '../utils/getEmergencyCountry';
import { definirPaisFisico, getEstadoPaisEmergencia } from '../utils/emergencyTokens';

const CHAVE = '@vigilaro_pais_fisico';
export const EVENTO_PAIS = 'pais_emergencia_mudou';
const INTERVALO_MIN_MS = 10 * 60 * 1000; // não reconsulta a posição mais que a cada 10 min
const IDADE_MAX_POSICAO_MS = 60 * 60 * 1000; // última posição conhecida com até 1 h
const TIMEOUT_GPS_MS = 5000;

let ultimaConsulta = 0;
let semPermissao = false;

function aplicar(resultado) {
    const antes = JSON.stringify(getEstadoPaisEmergencia());
    definirPaisFisico(resultado);
    if (JSON.stringify(getEstadoPaisEmergencia()) !== antes) DeviceEventEmitter.emit(EVENTO_PAIS);
}

async function temPermissao() {
    try {
        const { status } = await ExpoLocation.getForegroundPermissionsAsync();
        return status === 'granted';
    } catch (_) {
        return false;
    }
}

const PaisAtualService = {
    /** Boot: restaura o último país (se a permissão ainda existir) e atualiza. */
    async iniciar() {
        try {
            if (await temPermissao()) {
                const salvo = JSON.parse((await AsyncStorage.getItem(CHAVE)) || 'null');
                if (salvo && 'pais' in salvo) aplicar({ pais: salvo.pais, motivo: salvo.motivo });
            }
        } catch (_) { /* segue sem o salvo */ }
        return this.atualizar({ forcar: true });
    },

    /** Ao voltar ao app e ao abrir telas de emergência/viagem. */
    async atualizar({ forcar = false } = {}) {
        if (!forcar && Date.now() - ultimaConsulta < INTERVALO_MIN_MS) return;
        ultimaConsulta = Date.now();
        try {
            if (!(await temPermissao())) {
                semPermissao = true;
                await AsyncStorage.removeItem(CHAVE).catch(() => {});
                aplicar(undefined);
                return;
            }
            semPermissao = false;
            let pos = await ExpoLocation.getLastKnownPositionAsync({ maxAge: IDADE_MAX_POSICAO_MS }).catch(() => null);
            if (!pos?.coords) {
                pos = await Promise.race([
                    ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.Low }).catch(() => null),
                    new Promise((r) => setTimeout(() => r(null), TIMEOUT_GPS_MS)),
                ]);
            }
            if (pos?.coords) await this.registrarPosicao(pos.coords);
        } catch (_) { /* fica o último conhecido */ }
    },

    /** Quem já tem coordenadas (o SOS) entrega aqui. */
    async registrarPosicao(coords) {
        if (coords?.latitude == null || coords?.longitude == null) return;
        const r = paisPelaPosicao(coords.latitude, coords.longitude);
        aplicar(r);
        semPermissao = false;
        await AsyncStorage.setItem(CHAVE, JSON.stringify({ pais: r.pais, motivo: r.motivo, em: Date.now() })).catch(() => {});
    },

    /** true se a última consulta encontrou a localização negada. */
    semPermissao: () => semPermissao,
};

export default PaisAtualService;
