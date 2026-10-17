/**
 * AvisoPaisEmergencia — diz DE QUE PAÍS são os números de emergência na tela
 * e o que fazer quando o app não sabe onde a pessoa está (17/10/2026).
 *
 * Fica nas telas onde se liga para o socorro (SOS, Emergência Rápida) e no
 * Modo Viagem. Não aparece quando não há nada a dizer: posição conhecida e
 * no mesmo país do aparelho.
 *
 * Casos:
 *   sem localização      → os números são do país do APARELHO; fora dele,
 *                          112. Botão para ativar (salvo `semBotao`).
 *   noutro país, com número verificado → "Você está em Portugal: 112".
 *   noutro país, sem número verificado → 112 + confirme o número local.
 *   fronteira / mar      → 112 (na dúvida, não arrisca o número errado).
 *
 * Por que 112: pelo padrão 3GPP o celular trata 112 (e 911) como chamada de
 * emergência e a rede encaminha ao socorro local, também em roaming; no
 * Brasil, a Anatel aceita 112 e 911 desde 2013. Por isso o texto diz "na
 * maioria dos países" — não promete o que não dá para garantir.
 *
 * Regra do autor: aviso de segurança em destaque, nunca em letra miúda.
 */
import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, DeviceEventEmitter, Linking } from 'react-native';
import * as ExpoLocation from 'expo-location';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { getEstadoPaisEmergencia, getNomePais, getMedicalDial } from '../utils/emergencyTokens';
import { EMERGENCY_NUMBERS_BY_COUNTRY } from '../data/emergencyNumbersByCountry';
import PaisAtualService, { EVENTO_PAIS, SITUACAO } from '../services/PaisAtualService';

export function usePaisEmergencia() {
    const ler = () => ({ ...getEstadoPaisEmergencia(), situacao: PaisAtualService.situacao() });
    const [estado, setEstado] = useState(ler);
    useEffect(() => {
        const sub = DeviceEventEmitter.addListener(EVENTO_PAIS, () => setEstado(ler()));
        PaisAtualService.atualizar().finally(() => setEstado(ler()));
        return () => sub.remove();
    }, []);
    return estado;
}

/** Texto do aviso para o estado atual, ou null quando não há o que avisar. */
export function textoAvisoPais(estado, t) {
    const tem112 = t('paisEmergencia.ligue112', 'Se estiver em outro país, ligue 112 — o celular encaminha a chamada para o socorro local na maioria dos países.');
    if (estado.origem === 'aparelho') {
        const pais = getNomePais(estado.paisAparelho);
        const deQuem = pais
            ? t('paisEmergencia.semLocalizacao', { pais, defaultValue: 'Sem localização, os números de emergência mostrados são de {{pais}}, o país configurado no seu celular.' })
            : t('paisEmergencia.semLocalizacaoGenerico', 'Sem localização, o Vigilaro não sabe em que país você está e mostra o número de emergência geral, 112.');
        // Localização já autorizada, mas a pessoa ainda não viu este uso:
        // explica a finalidade e pergunta (LGPD art. 9º §2º).
        if (estado.situacao === SITUACAO.SEM_CIENCIA) {
            return {
                tipo: 'semCiencia',
                texto: t('paisEmergencia.semCiencia', { pais: pais || '112', defaultValue: 'O Vigilaro pode usar a localização que você já autorizou para identificar o país onde você está e mostrar o número de emergência de lá — inclusive em viagem. A posição fica no aparelho; só o país é guardado. Por enquanto, os números mostrados são de {{pais}}.' }),
            };
        }
        if (estado.situacao === SITUACAO.RECUSOU) {
            return { tipo: 'recusou', texto: `${t('paisEmergencia.recusou', { pais: pais || '112', defaultValue: 'Você escolheu não usar a localização para identificar o país: os números mostrados são de {{pais}}, o país configurado no seu celular.' })} ${tem112}` };
        }
        return {
            tipo: 'semLocalizacao',
            texto: `${deQuem} ${tem112} ${t('paisEmergencia.porQueAtivar', 'Com a localização ativada, o Vigilaro identifica o país onde você está; a posição fica no aparelho.')}`,
        };
    }
    if (estado.pais == null) {
        return {
            tipo: 'duvida',
            texto: estado.motivo === 'fronteira'
                ? t('paisEmergencia.fronteira', 'Você está perto de uma fronteira. Para não indicar o número de outro país, o Vigilaro usa o 112 — o celular encaminha a chamada para o socorro local.')
                : t('paisEmergencia.desconhecido', 'Não foi possível identificar o país em que você está. Ligue 112 — o celular encaminha a chamada para o socorro local na maioria dos países.'),
        };
    }
    const nome = getNomePais(estado.pais) || estado.pais;
    if (!EMERGENCY_NUMBERS_BY_COUNTRY[estado.pais]) {
        return {
            tipo: 'semNumeroVerificado',
            texto: t('paisEmergencia.semNumeroVerificado', { pais: nome, defaultValue: 'Você está em {{pais}}. O Vigilaro ainda não tem os números locais verificados para este país: ligue 112 — o celular encaminha para o socorro local na maioria dos países — e confirme o número local assim que puder.' }),
        };
    }
    if (estado.pais !== estado.paisAparelho) {
        return {
            tipo: 'outroPais',
            texto: t('paisEmergencia.outroPais', { pais: nome, numero: getMedicalDial(estado.pais), defaultValue: 'Você está em {{pais}}: o número de emergência aqui é {{numero}}. Os números desta tela já são os daqui.' }),
        };
    }
    return null;
}

/**
 * A pessoa leu a finalidade no aviso e tocou para usar: registra a ciência e,
 * se faltar, pede a permissão do sistema (ou abre os Ajustes, se negada em
 * definitivo).
 */
export async function aceitarUsoDaLocalizacao() {
    try {
        const atual = await ExpoLocation.getForegroundPermissionsAsync();
        if (atual.status !== 'granted') {
            if (atual.canAskAgain === false) await Linking.openSettings();
            else await ExpoLocation.requestForegroundPermissionsAsync();
        }
    } catch (_) { /* sem permissão: o aviso continua */ }
    await PaisAtualService.definirCiencia(true);
}

export default function AvisoPaisEmergencia({ tom = 'claro', semBotao = false, style }) {
    const { t } = useTranslation('common');
    const estado = usePaisEmergencia();
    const aviso = textoAvisoPais(estado, t);
    if (!aviso) return null;

    const escuro = tom === 'escuro';
    const info = aviso.tipo === 'outroPais';
    return (
        <View style={[styles.box, escuro ? styles.boxEscuro : info && styles.boxInfo, style]} accessibilityRole="text">
            <NeoIcon name={info ? 'Global' : 'Location'} size={16} color={escuro ? '#FFF' : (Neo.colors.accent.warm || '#A16207')} variant="Bold" />
            <View style={{ flex: 1 }}>
                <Small style={[styles.text, escuro && styles.textEscuro]}>{aviso.texto}</Small>
                {['semLocalizacao', 'semCiencia', 'recusou'].includes(aviso.tipo) && !(semBotao && aviso.tipo === 'semLocalizacao') && (
                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={aceitarUsoDaLocalizacao} accessibilityRole="button" style={styles.botao} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Small style={[styles.botaoTexto, escuro && styles.textEscuro]}>
                                {aviso.tipo === 'semLocalizacao'
                                    ? t('paisEmergencia.ativar', 'Ativar localização')
                                    : t('paisEmergencia.usarParaIsso', 'Usar a localização para isso')}
                            </Small>
                        </TouchableOpacity>
                        {aviso.tipo === 'semCiencia' && (
                            <TouchableOpacity onPress={() => PaisAtualService.definirCiencia(false)} accessibilityRole="button" style={styles.botao} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                                <Small style={[styles.botaoTexto, styles.botaoSecundario, escuro && styles.textEscuro]}>{t('paisEmergencia.naoUsar', 'Não usar')}</Small>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: 'rgba(161, 98, 7, 0.10)',
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.accent.champagne || '#A16207',
        borderRadius: 12,
        paddingVertical: 11,
        paddingHorizontal: 13,
        width: '100%',
    },
    boxInfo: {
        backgroundColor: 'rgba(20, 52, 43, 0.06)',
        borderLeftColor: Neo.colors.primary[500],
    },
    boxEscuro: {
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        borderLeftColor: '#FFF',
    },
    text: {
        color: Neo.colors.neutral[800],
        fontSize: 12.5,
        fontWeight: '600',
        lineHeight: 17,
    },
    textEscuro: { color: '#FFF' },
    botoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginTop: 8 },
    botao: { alignSelf: 'flex-start' },
    botaoSecundario: { fontWeight: '600', textDecorationLine: 'none' },
    botaoTexto: {
        color: Neo.colors.primary[700],
        fontSize: 13,
        fontWeight: '800',
        textDecorationLine: 'underline',
    },
});
