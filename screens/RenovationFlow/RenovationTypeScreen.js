/**
 * RenovationTypeScreen — "Reforma / Manutenção": onde a obra está acontecendo (casa, prédio, sítio).
 *
 * 28/10/2026 — na linguagem da Home: cabeçalho padrão com o NOME da opção que a abriu (era "Tipo de
 * Reforma"; a pergunta que ele fazia continua, como a frase de apoio) e as três opções como
 * NeoGlifoCard. Os pictogramas são reaproveitados do conjunto existente: a casa em obra, os prédios
 * e a casa do campo.
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
import { RENOVATION_TYPES } from '../../data/renovationChecklists';
import { PICTOGRAMA_PLANEJAR } from '../../data/pictogramasAtividades';

const PICTOGRAMA_PREDIO = require('../../assets/illustrations/glifos/pictogram-condo-safety.png');
const PICTOGRAMA_RURAL = require('../../assets/illustrations/glifos/pictogram-destino-rural.png');

export default function RenovationTypeScreen({ navigation }) {
    const { t } = useTranslation('common');
    const isDark = useIsDark();
    const tema = useThemeDS();
    const s = useMemo(() => criarEstilos(tema), [tema]);

    const handleSelect = (type) => {
        navigation.navigate('ChecklistReforma', { renovationType: type });
    };

    const options = [
        { key: RENOVATION_TYPES.HOME, title: t('telas.RenovationTypeScreen.tipoCasa', 'Casa / Apartamento'), pictograma: PICTOGRAMA_PLANEJAR },
        { key: RENOVATION_TYPES.BUILDING, title: t('telas.RenovationTypeScreen.tipoPredio', 'Prédio / Condomínio'), pictograma: PICTOGRAMA_PREDIO },
        { key: RENOVATION_TYPES.RURAL, title: t('telas.RenovationTypeScreen.tipoRural', 'Sítio / Área Rural'), pictograma: PICTOGRAMA_RURAL },
    ];

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                {/* O nome da página é o da opção que a abriu (Planejar reforma, visita ou mudança). */}
                <NeoScreenHeader
                    title={t('telas.SituacoesTemporariasScreen.reformaTitulo', 'Reforma / Manutenção')}
                    onBack={() => navigation.goBack()}
                />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <Body style={s.apoio}>{t('headersFirst.ondeAObraEstAcontecendo', 'Onde a obra está acontecendo?')}</Body>

                        {options.map(opt => (
                            <NeoGlifoCard
                                key={opt.key}
                                source={opt.pictograma}
                                titulo={opt.title}
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
    cartao: { height: 112, marginBottom: Neo.spacing.sm + 4 },
});
