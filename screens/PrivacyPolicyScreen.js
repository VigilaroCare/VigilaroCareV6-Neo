import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import { Colors, Spacing } from '../utils/Theme';

const Section = ({ title, children }) => (
    <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.text}>{children}</Text>
    </>
);

export default function PrivacyPolicyScreen({ navigation }) {
    return (
        <AppBackground>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Política de Privacidade</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.iconContainer}>
                        <NeoIcon name="Lock" size={48} color={Colors.primary} />
                    </View>

                    <Section title="1. Compromisso com sua privacidade">
                        O Vigilaro Care trata dados pessoais e dados de saúde como informações sensíveis. Esta política resume como o app acessa, armazena, usa, compartilha e exclui esses dados em conformidade com a LGPD.
                    </Section>

                    <Section title="2. Armazenamento local">
                        Perfis, contatos de emergência, medicamentos, histórico médico e estado de pânico são armazenados no dispositivo. Dados sensíveis são roteados para armazenamento seguro do sistema operacional sempre que suportado. Alguns dados operacionais não sensíveis, como preferências visuais e progresso de checklist, podem ficar no armazenamento local comum do app.
                    </Section>

                    <Section title="3. Dados que você informa">
                        O app pode armazenar nome, idade, foto de perfil, tipo sanguíneo, alergias, condições de saúde, medicamentos, contatos de emergência, características da residência, fotos escolhidas por você e anotações de prevenção. O app não exige CPF, RG ou criação de conta.
                    </Section>

                    <Section title="4. Permissões do dispositivo">
                        Câmera e fotos são usadas para perfil e scanner de riscos. Microfone pode ser usado por recursos de voz ou gravação acionada por função de emergência. Localização é usada em SOS e recursos de segurança. Notificações são usadas para lembretes e check-ins. Você pode negar ou revogar permissões nas configurações do sistema; algumas funções podem ficar limitadas.
                    </Section>

                    <Section title="5. Inteligência artificial e terceiros">
                        Recursos opcionais de IA podem enviar mensagens, fotos submetidas ao scanner e um contexto minimizado do lar para processamento por provedores de IA por meio do servidor intermediário do Vigilaro. Os provedores utilizados são: OpenAI (análise de texto, imagem e voz), ElevenLabs (síntese de voz), EPA CompTox (consulta pública de substâncias químicas) e Zenvia ou Twilio (envio de SMS/WhatsApp do módulo cuidador remoto, que recebe o número de telefone e o conteúdo da mensagem que você configurar). O app evita enviar nomes e contatos nesses contextos, mas pode enviar categorias sensíveis como idade aproximada, condições relevantes e nomes de medicamentos quando necessários para a resposta solicitada. Se você não usar recursos de IA nem o cuidador remoto, esses dados não são enviados a terceiros.
                    </Section>

                    <Section title="6. Retenção e exclusão">
                        Os dados locais permanecem no aparelho até você removê-los. A opção Resetar Aplicativo apaga perfis, contatos, dados de saúde, consentimentos, logs locais, checklists e arquivos gerados pelo app, incluindo fotos persistidas e gravações de pânico. A desinstalação do app também remove os dados locais mantidos no sandbox do aplicativo.
                    </Section>

                    <Section title="7. Limitações de emergência">
                        Funções de SOS, SMS, WhatsApp, ligação, localização e check-in dependem do sistema operacional, sinal, bateria, permissões e aplicativos externos. O Vigilaro Care auxilia a preparar e abrir canais de contato, mas não substitui serviços oficiais de emergência.
                    </Section>

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
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
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
