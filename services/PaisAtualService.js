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
 *   • Sem permissão, apaga o que tinha.
 *
 * CIÊNCIA DA FINALIDADE (LGPD art. 9º §2º; RGPD art. 13(3)): quem autorizou
 * a localização com o texto antigo do tour ("fora do SOS, a localização não é
 * usada") NÃO teve a posição usada para identificar o país. Este uso só roda
 * depois de a pessoa ver a finalidade e aceitar — no tour novo, no aviso das
 * telas de emergência ou ao iniciar viagem internacional — e pode ser
 * desligado nos Ajustes do app (tão fácil quanto ligar). Recusou: os números
 * seguem o país do aparelho, e o aviso diz isso.
 *
 * Nunca lança e nunca trava: falhou, fica o último país conhecido.
 */
import * as ExpoLocation from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter } from 'react-native';
import { paisPelaPosicao } from '../utils/getEmergencyCountry';
import { definirPaisFisico, getEstadoPaisEmergencia } from '../utils/emergencyTokens';

const CHAVE = '@vigilaro_pais_fisico';
const CHAVE_CIENCIA = '@vigilaro_localizacao_pais_ciencia'; // 'sim' | 'nao' | ausente
export const EVENTO_PAIS = 'pais_emergencia_mudou';
const INTERVALO_MIN_MS = 10 * 60 * 1000; // não reconsulta a posição mais que a cada 10 min
const IDADE_MAX_POSICAO_MS = 60 * 60 * 1000; // última posição conhecida com até 1 h
const TIMEOUT_GPS_MS = 5000;

/**
 * Situação da identificação do país, para os avisos:
 *   'ativo'        — permissão + ciência: números do país onde está
 *   'semPermissao' — localização não autorizada no sistema
 *   'semCiencia'   — localização autorizada, mas a pessoa ainda não viu/aceitou
 *                    este uso (ex.: autorizou com o texto antigo do tour)
 *   'recusou'      — a pessoa escolheu não usar a localização para isso
 */
export const SITUACAO = { ATIVO: 'ativo', SEM_PERMISSAO: 'semPermissao', SEM_CIENCIA: 'semCiencia', RECUSOU: 'recusou' };

let ultimaConsulta = 0;
let situacao = SITUACAO.SEM_PERMISSAO;
let ciencia = null; // null = ainda não lida do disco

function aplicar(resultado) {
    const antes = JSON.stringify(getEstadoPaisEmergencia()) + situacao;
    definirPaisFisico(resultado);
    if (JSON.stringify(getEstadoPaisEmergencia()) + situacao !== antes) DeviceEventEmitter.emit(EVENTO_PAIS);
}

function mudarSituacao(nova) {
    if (nova !== situacao) {
        situacao = nova;
        DeviceEventEmitter.emit(EVENTO_PAIS);
    }
}

async function temPermissao() {
    try {
        const { status } = await ExpoLocation.getForegroundPermissionsAsync();
        return status === 'granted';
    } catch (_) {
        return false;
    }
}

async function lerCiencia() {
    if (ciencia === null) {
        try { ciencia = (await AsyncStorage.getItem(CHAVE_CIENCIA)) || ''; } catch (_) { ciencia = ''; }
    }
    return ciencia;
}

async function esquecerPais() {
    await AsyncStorage.removeItem(CHAVE).catch(() => {});
    aplicar(undefined);
}

const PaisAtualService = {
    /** Boot: restaura o último país (se permissão e ciência ainda valem) e atualiza. */
    async iniciar() {
        try {
            if ((await lerCiencia()) === 'sim' && (await temPermissao())) {
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
                mudarSituacao(SITUACAO.SEM_PERMISSAO);
                await esquecerPais();
                return;
            }
            const c = await lerCiencia();
            if (c !== 'sim') {
                mudarSituacao(c === 'nao' ? SITUACAO.RECUSOU : SITUACAO.SEM_CIENCIA);
                await esquecerPais();
                return;
            }
            mudarSituacao(SITUACAO.ATIVO);
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

    /**
     * Quem já tem coordenadas (o SOS) entrega aqui. Só guarda e espalha o
     * país para o resto do app com ciência; sem ela, o SOS usa a posição
     * apenas na própria tela (é o uso que a pessoa autorizou: socorro).
     */
    async registrarPosicao(coords) {
        if (coords?.latitude == null || coords?.longitude == null) return;
        if ((await lerCiencia()) !== 'sim') return;
        const r = paisPelaPosicao(coords.latitude, coords.longitude);
        mudarSituacao(SITUACAO.ATIVO);
        aplicar(r);
        await AsyncStorage.setItem(CHAVE, JSON.stringify({ pais: r.pais, motivo: r.motivo, em: Date.now() })).catch(() => {});
    },

    /** A pessoa aceitou (true) ou recusou (false) usar a localização para identificar o país. */
    async definirCiencia(aceita) {
        ciencia = aceita ? 'sim' : 'nao';
        await AsyncStorage.setItem(CHAVE_CIENCIA, ciencia).catch(() => {});
        if (!aceita) await esquecerPais();
        return this.atualizar({ forcar: true });
    },

    /** true = aceitou; false = recusou ou ainda não decidiu. */
    async usaLocalizacaoParaPais() {
        return (await lerCiencia()) === 'sim';
    },

    situacao: () => situacao,
};

export default PaisAtualService;
