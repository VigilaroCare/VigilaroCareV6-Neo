import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing } from '../utils/Theme';

export default function TermsOfUseScreen({ navigation }) {
    const { t } = useTranslation('common');
    return (
      <AppBackground>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.termosDeUso', 'Termos de Uso')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <NeoIcon name="ShieldTick" size={48} color={Colors.primary} />
                </View>

                <Text style={styles.sectionTitle}>{t('headersFirst.1NaturezaInformativa', '1. Natureza Informativa')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.oAplicativoVigilaroCareUmaFerramentaDeAu', 'O aplicativo Vigilaro Care é uma ferramenta de auxílio e prevenção. Todo o conteúdo, incluindo checklists, guias de primeiros socorros e análises de IA, tem caráter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.')}
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.2NOSubstituiProfissionais', '2. Não Substitui Profissionais')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.asInformaEsAquiContidasNOSubstituemEmHip', 'As informações aqui contidas NÃO substituem, em hipótese alguma, o diagnóstico, aconselhamento ou tratamento por profissionais de saúde (médicos, enfermeiros, socorristas) ou especialistas em segurança.')}
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.3EmCasoDeEmergNcia', '3. Em Caso de Emergência')}</Text>
                <Text style={styles.text}>
                    Se você ou alguém estiver em situação de risco imediato, ferido gravemente ou passando mal, NÃO USE O APP. Ligue imediatamente para os serviços de emergência locais:
                    {'\n\n'}
                    🚑 SAMU: 192
                    {'\n'}
                    🚒 Bombeiros: 193
                    {'\n'}
                    👮 Polícia: 190
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.4LimitaODeResponsabilidade', '4. Limitação de Responsabilidade')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.osDesenvolvedoresDoVigilaroCareNOSeRespo', 'Os desenvolvedores do Vigilaro Care não se responsabilizam por quaisquer danos, lesões ou perdas resultantes do uso das informações fornecidas pelo aplicativo. A segurança final do ambiente e das pessoas é de responsabilidade do usuário.')}
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.5InteligNciaArtificial', '5. Inteligência Artificial')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.oRecursoDeScannerIAUtilizaInteligNciaArt', 'O recurso de "Scanner IA" utiliza inteligência artificial para identificar possíveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu próprio julgamento.')}
                </Text>

                <Text style={styles.sectionTitle}>{t('terms.monitoringTitle', '6. Recursos de Monitoramento e Alerta')}</Text>
                <Text style={styles.text}>
                    {t('terms.monitoringBody', 'Os recursos de monitoramento e alerta (detecção de queda, monitor de áudio, check-in e SOS) são AUXILIARES e dependem de fatores fora do nosso controle: sensores e bateria do aparelho, sinal de celular, plano para SMS, restrições do sistema operacional e configuração correta.\n\nEles podem não detectar todos os eventos ou gerar alertas indevidos, e NÃO constituem serviço de emergência, dispositivo médico ou substituto de supervisão humana. O Vigilaro Care é uma ferramenta de utilidade e prevenção para o dia a dia — use esses recursos como camada adicional de apoio, nunca como única linha de proteção de quem você ama.')}
                </Text>

                <Text style={styles.sectionTitle}>{t('terms.privacyTitle', '7. Privacidade')}</Text>
                <Text style={styles.text}>
                    Para detalhes sobre como tratamos seus dados, consulte nossa <Text style={{ fontWeight: 'bold', color: Colors.primary }} onPress={() => navigation.navigate('PrivacyPolicy')}>Política de Privacidade</Text> específica.
                </Text>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
      </AppBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingVertical: 14,
    },
    backBtn: {
        width: 36, height: 36, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[900],
    },
    content: {
        padding: Spacing.lg,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 16,
        marginBottom: 8,
    },
    text: {
        fontSize: 15,
        color: Colors.textSecondary,
        lineHeight: 22,
        textAlign: 'justify',
    },
});


