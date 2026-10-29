import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
// Services & Utils
import { DS as Neo } from '../utils/DesignSystem2026';
import { useIsDark, useThemeDS } from '../utils/ThemeContext';
import { RISK_CATEGORIES } from '../data/RiskCategories';
import { PICTOGRAMAS_ATIVIDADES, PICTOGRAMA_PLANEJAR, RECUO_DA_ARTE } from '../data/pictogramasAtividades';

// Neo Components
import NeoGlifoCard from '../components/NeoGlifoCard';
import NeoScreenHeader from '../components/NeoScreenHeader';
import { Small } from "../components/NeoTypography";
import FadeInView from '../components/FadeInView';
import AppBackground from '../components/AppBackground';
import AuditoriaAtividadeModal from '../components/AuditoriaAtividadeModal';

const VAO_GRADE = 12;
// Título de até 3 linhas no alto (o mais longo é "Planejar reforma, visita ou mudança") e a arte embaixo.
const ALTURA_CELULA = 140;

export default function ModoPreventivoScreenNeo({ navigation }) {
    const { t } = useTranslation();
    const isDark = useIsDark();
    const tema = useThemeDS();
    const [selectedRisk, setSelectedRisk] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRiskPress = (risk) => {
        if (risk.action === 'NAVIGATE_SCANNER') {
            navigation.navigate('Scanner', { mode: 'label_scan' });
            return;
        }
        setSelectedRisk(risk);
        setModalVisible(true);
    };

    // A categoria fica guardada: o modal ainda a mostra enquanto desliza para fora.
    const fecharAuditoria = () => setModalVisible(false);

    // O nome da tela é o do cartão da Home que a abriu: a mesma chave, para os dois nunca mais divergirem.
    const titleStr = t('home.eventualActivities', 'Atividades Eventuais');
    const { width: larguraDaTela } = useWindowDimensions();
    const s = useMemo(() => criarEstilos(tema), [tema]);
    // Duas colunas medidas em px, como a Home e o Aprendizado: `width: '48%'` com `gap` estoura em tela estreita.
    const larguraCelula = Math.floor((larguraDaTela - 2 * Neo.spacing.lg - VAO_GRADE) / 2);
    // Em aparelho estreito cabem menos letras por linha: o corpo desce um pouco para o título não ser cortado.
    const tamanhoTitulo = larguraCelula >= 165 ? 15 : 13.5;
    const celula = { width: larguraCelula, height: ALTURA_CELULA };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top', 'left', 'right']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <NeoScreenHeader title={titleStr} onBack={() => navigation.goBack()} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Neo.layout.scrollBottomFooter }}>
                    <View style={s.corpo}>
                        <Small style={s.dica}>
                            {RISK_CATEGORIES.length}{t('telas.ModoPreventivoScreenNeo.categoriasToqueParaIniciarAVerificacao', ' categorias • Toque para iniciar a verificação')}
                        </Small>

                        <View style={s.grade}>
                            {RISK_CATEGORIES.map((item, idx) => (
                                <FadeInView key={item.id} delay={120 + idx * 40} style={celula}>
                                    <NeoGlifoCard
                                        source={PICTOGRAMAS_ATIVIDADES[item.id] || PICTOGRAMA_PLANEJAR}
                                        titulo={item.title}
                                        tom="info"
                                        arte={112}
                                        recuo={RECUO_DA_ARTE[item.id] || 0}
                                        tamanhoTitulo={tamanhoTitulo}
                                        linhasTitulo={3}
                                        accessibilityLabel={item.subtitle ? `${item.title}. ${item.subtitle}` : item.title}
                                        onPress={() => handleRiskPress(item)}
                                    />
                                </FadeInView>
                            ))}

                            {/* Situações temporárias: checklists detalhados de reforma (por tipo de
                                obra) e de visita (por tipo de visitante). Até 22/10/2026 só eram
                                abertos por uma tela sem nenhuma entrada no app. É o único cartão que
                                não abre uma verificação, e por isso fala em âmbar. */}
                            <FadeInView delay={120 + RISK_CATEGORIES.length * 40} style={celula}>
                                <NeoGlifoCard
                                    source={PICTOGRAMA_PLANEJAR}
                                    titulo={t('telas.ModoPreventivoScreenNeo.planejarSituacaoTitulo', 'Planejar reforma, visita ou mudança')}
                                    tom="warning"
                                    arte={98}
                                    tamanhoTitulo={tamanhoTitulo}
                                    linhasTitulo={3}
                                    accessibilityLabel={`${t('telas.ModoPreventivoScreenNeo.planejarSituacaoTitulo', 'Planejar reforma, visita ou mudança')}. ${t('telas.ModoPreventivoScreenNeo.planejarSituacaoDescricao', 'Checklists detalhados por tipo de obra e de visitante, para preparar a casa antes.')}`}
                                    onPress={() => navigation.navigate('SituacoesTemporarias')}
                                />
                            </FadeInView>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* A VERIFICAÇÃO da categoria: educação, perguntas S / N / N/A e resultado. */}
            <AuditoriaAtividadeModal
                risco={selectedRisk}
                visivel={modalVisible}
                onFechar={fecharAuditoria}
                navigation={navigation}
            />
        </AppBackground>
    );
}

// Fábrica: recebe o DS do TEMA (nunca a paleta clara no escopo do módulo — ANATOMIA §9.6, regra 13).
const criarEstilos = (Neo) => StyleSheet.create({
    corpo: { paddingHorizontal: Neo.spacing.lg },
    dica: { color: Neo.colors.textOn.muted, marginBottom: Neo.spacing.md },
    grade: { flexDirection: 'row', flexWrap: 'wrap', gap: VAO_GRADE },
});
