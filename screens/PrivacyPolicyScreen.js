import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing } from '../utils/Theme';

export default function PrivacyPolicyScreen({ navigation }) {
    const { t } = useTranslation('common');
    return (
      <AppBackground>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('headersFirst.polTicaDePrivacidade', 'Política de Privacidade')}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconContainer}>
                    <NeoIcon name="Lock" size={48} color={Colors.primary} />
                </View>

                <Text style={styles.sectionTitle}>{t('headersFirst.1CompromissoComSuaPrivacidade', '1. Compromisso com sua Privacidade')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.oVigilaroCareRespeitaProfundamenteSuaPri', 'O Vigilaro Care respeita profundamente sua privacidade. Este documento explica como tratamos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).')}
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.2ArmazenamentoLocalOffline', '2. Armazenamento Local (Offline)')}</Text>
                <Text style={styles.text}>
                    🔒 <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.seusDadosFicamComVoc', 'Seus dados ficam com você:')}</Text> Todas as informações que você insere no aplicativo (perfis de familiares, checklists, fotos e anotações) são armazenadas <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.eXCLUSIVAMENTENAMEMRIADOSEUDISPOSITIVO', 'EXCLUSIVAMENTE NA MEMÓRIA DO SEU DISPOSITIVO')}</Text>.
                    {'\n\n'}
                    Nós não possuímos servidores centrais que coletam ou armazenam seus dados pessoais sensíveis. Se você desinstalar o aplicativo sem fazer backup, esses dados serão perdidos, pois <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.nSNOTemosCPiaDeles', 'nós não temos cópia deles')}</Text>.
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.3ColetaDeDados', '3. Coleta de Dados')}</Text>
                <Text style={styles.text}>
                    O aplicativo não coleta dados de identificação pessoal (como CPF, RG ou endereço) para envio a terceiros.
                    {'\n\n'}
                    Poderemos coletar dados anônimos e agregados apenas para fins de estatística de uso e melhoria de performance (ex: "quantas vezes a tela X foi aberta"), sem que isso possa identificar você individualmente.
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.4PermissEsDoDispositivo', '4. Permissões do Dispositivo')}</Text>
                <Text style={styles.text}>
                    Para funcionar corretamente, o app pode solicitar acesso a:
                    {'\n'}
                    📸 <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.cMera', 'Câmera:')}</Text> Para foto de perfil ou scanner de riscos.
                    {'\n'}
                    🖼️ <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.galeria', 'Galeria:')}</Text> Para escolher fotos de perfil.
                    {'\n'}
                    🔔 <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.notificaEs', 'Notificações:')}</Text> Para lembretes de segurança.
                    {'\n'}
                    🎤 <Text style={{ fontWeight: 'bold' }}>{t('headersFirst.microfone', 'Microfone:')}</Text> Para monitoramento de áudio (babá eletrônica).
                    {'\n\n'}
                    Você pode revogar essas permissões a qualquer momento nas configurações do seu celular.
                </Text>

                <Text style={styles.sectionTitle}>{t('headersFirst.5ExclusODeDados', '5. Exclusão de Dados')}</Text>
                <Text style={styles.text}>
                    {t('headersFirst.comoOsDadosEstONoSeuAparelhoVocTemTotalC', 'Como os dados estão no seu aparelho, você tem total controle. Para excluir tudo permanentemente, basta usar a opção "Resetar Aplicativo" no Menu ou desinstalar o app.')}
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
