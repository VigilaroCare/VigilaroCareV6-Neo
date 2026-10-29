/**
 * VisitTypeScreen — "Festa / Visita": receber alguém ou ir visitar.
 *
 * 28/10/2026 — na linguagem da Home: cabeçalho padrão com o NOME da opção que a abriu (era "Tipo de
 * Visita"; a pergunta que ele fazia continua, como a frase de apoio) e as duas opções como
 * NeoGlifoCard, com pictogramas reaproveitados do conjunto existente: a casa protegida (receber) e a
 * porta com a lista (ir visitar).
 */
import { useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { DS as Neo } from '../../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../../utils/ThemeContext';
import AppBackground from '../../components/AppBackground';
import NeoScreenHeader from '../../components/NeoScreenHeader';
import NeoGlifoCard from '../../components/NeoGlifoCard';
import { Body } from '../../components/NeoTypography';
import { VISIT_TYPES } from '../../data/visitChecklists';

const PICTOGRAMA_RECEBER = require('../../assets/illustrations/glifos/pictogram-viagem-chegada.png');
const PICTOGRAMA_VISITAR = require('../../assets/illustrations/glifos/pictogram-viagem-partida.png');

export default function VisitTypeScreen({ navigation }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);

    const handleSelect = (type) => {
        navigation.navigate('VisitRiskForm', { visitType: type });
    };

    const options = [
        {
            key: VISIT_TYPES.RECEIVING,
            title: t('headersFirst.recebendoVisita', 'Recebendo Visita'),
            subtitle: t('headersFirst.prepararMinhaCasaParaConvidados', 'Preparar minha casa para convidados'),
            pictograma: PICTOGRAMA_RECEBER,
        },
        {
            key: VISIT_TYPES.VISITING,
            title: t('headersFirst.indoVisitar', 'Indo Visitar'),
            subtitle: t('headersFirst.cuidadosAoIrNaCasaDeOutros', 'Cuidados ao ir na casa de outros'),
            pictograma: PICTOGRAMA_VISITAR,
        },
    ];

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* O nome da página é o da opção que a abriu (Planejar reforma, visita ou mudança). */}
                <NeoScreenHeader
                    title={t('telas.SituacoesTemporariasScreen.festaTitulo', 'Festa / Visita')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <Body style={s.apoio}>{t('headersFirst.vocEstRecebendoAlguMOuIndoVisitar', 'Você está recebendo alguém ou indo visitar?')}</Body>

                        {options.map(opt => (
                            <NeoGlifoCard
                                key={opt.key}
                                source={opt.pictograma}
                                titulo={opt.title}
                                sub={opt.subtitle}
                                tom="warning"
                                largo
                                seta
                                arte={96}
                                tamanhoTitulo={18}
                                style={s.cartao}
                                onPress={() => handleSelect(opt.key)}
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppBackground>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    corpo: { paddingHorizontal: Neo.spacing.lg, paddingTop: Neo.spacing.sm },
    apoio: { color: Neo.colors.textOn.muted, lineHeight: 21, marginBottom: Neo.spacing.md },
    cartao: { height: 118, marginBottom: Neo.spacing.sm + 4 },
});
