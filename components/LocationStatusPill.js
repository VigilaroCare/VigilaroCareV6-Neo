/**
 * LocationStatusPill.js
 *
 * Indicador do estado da localização na tela de SOS.
 *
 * POR QUE EXISTE (2026-07-31)
 * O SOS lia `lastLocation` em dois pontos — o link do Google Maps no SMS e a
 * ficha médica — e não mostrava nada em lado nenhum. Se a permissão estivesse
 * negada, o SMS saía sem coordenadas e o utilizador nunca saberia. Numa
 * emergência real, quem aciona o SOS não tem como saber se quem vai socorrer
 * vai receber a localização.
 *
 * PRINCÍPIO DE DESENHO — "discreto, mas com protagonismo"
 * Quando está tudo certo, é uma linha fina, quase transparente: confirma sem
 * competir com o botão SOS. Quando falta localização, ganha fundo, borda,
 * ícone de alerta e vira tocável — porque aí é informação acionável, e o custo
 * de ser ignorada é alto.
 *
 * O componente é puramente de apresentação: não busca localização nem pede
 * permissão. Quem decide é a tela, que já é dona desse ciclo de vida.
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import NeoIcon from './NeoIcon';
import { Small } from './NeoTypography';
import { LOCATION_STATUS } from '../utils/getEmergencyLocation';

// Tela de SOS é fundo escuro/vermelho — as cores aqui são sobre esse fundo,
// não sobre o tema claro do resto do app.
const COR_OK = 'rgba(255,255,255,0.55)';
const COR_ALERTA = '#FFD166';
const FUNDO_ALERTA = 'rgba(255, 209, 102, 0.14)';
const BORDA_ALERTA = 'rgba(255, 209, 102, 0.45)';

export default function LocationStatusPill({ status, onPress, t }) {
    const traduz = (chave, padrao) => (t ? t(chave, padrao) : padrao);

    if (status === LOCATION_STATUS.BUSCANDO) {
        return (
            <View style={[estilos.base, estilos.discreto]} accessibilityRole="text">
                <ActivityIndicator size="small" color={COR_OK} style={estilos.spinner} />
                <Small style={[estilos.texto, { color: COR_OK }]} numberOfLines={1}>
                    {traduz('sos.locationSearching', 'Obtendo localização…')}
                </Small>
            </View>
        );
    }

    if (status === LOCATION_STATUS.PRONTA) {
        return (
            <View
                style={[estilos.base, estilos.discreto]}
                accessible
                accessibilityRole="text"
                accessibilityLabel={traduz('sos.locationReadyA11y', 'Localização pronta. O alerta incluirá sua localização.')}
            >
                <NeoIcon name="Location" size={13} color={COR_OK} variant="Bold" />
                <Small style={[estilos.texto, { color: COR_OK }]} numberOfLines={1}>
                    {traduz('sos.locationReady', 'Localização pronta')}
                </Small>
            </View>
        );
    }

    // SEM_PERMISSAO | BLOQUEADA | INDISPONIVEL — os três casos em que o alerta
    // sairá sem coordenadas. Aqui o indicador ganha protagonismo.
    const rotulos = {
        [LOCATION_STATUS.SEM_PERMISSAO]: traduz(
            'sos.locationDenied',
            'Sem localização — toque para autorizar'
        ),
        [LOCATION_STATUS.BLOQUEADA]: traduz(
            'sos.locationBlocked',
            'Sem localização — toque para abrir Ajustes'
        ),
        [LOCATION_STATUS.INDISPONIVEL]: traduz(
            'sos.locationUnavailable',
            'Sem sinal de GPS — toque para tentar de novo'
        ),
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[estilos.base, estilos.alerta]}
            accessibilityRole="button"
            accessibilityLabel={rotulos[status]}
            accessibilityHint={traduz(
                'sos.locationHintA11y',
                'O alerta será enviado sem sua localização.'
            )}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <NeoIcon name="Warning2" size={14} color={COR_ALERTA} variant="Bold" />
            <Small style={[estilos.texto, estilos.textoAlerta]} numberOfLines={2}>
                {rotulos[status] || rotulos[LOCATION_STATUS.INDISPONIVEL]}
            </Small>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 6,
        borderRadius: 14,
        marginBottom: 12,
    },
    // Estado bom: sem fundo nem borda. Só uma linha de texto fininha.
    discreto: {
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    // Estado de falta: pílula com fundo e borda âmbar.
    alerta: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        backgroundColor: FUNDO_ALERTA,
        borderWidth: 1,
        borderColor: BORDA_ALERTA,
    },
    texto: {
        fontSize: 12,
        flexShrink: 1,
    },
    textoAlerta: {
        color: COR_ALERTA,
        fontWeight: '700',
    },
    spinner: {
        transform: [{ scale: 0.7 }],
        width: 13,
        height: 13,
    },
});
