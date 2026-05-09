import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { DS as Neo } from '../utils/DesignSystem2026';
import AppBackground from '../components/AppBackground';
import NeoCard from '../components/NeoCard';

export default function AssistentePrevencaoIAScreen({ navigation }) {
    const { t } = useTranslation('common');
    return (
        <AppBackground variant="subtle">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{t('headersFirst.assistenteDeVoz', 'Assistente de Voz')}</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <NeoIcon name="Microphone2" size={72} color="#9C27B0" variant="Bold" />
                    </View>
                    <Text style={styles.titleMain}>{t('headersFirst.vigilaroVoice', 'Vigilaro Voice')}</Text>
                    <Text style={styles.message}>
                        {t('headersFirst.converseNaturalmenteComNossaIAEspecializ', 'Converse naturalmente com nossa IA especializada. Tire dúvidas sobre segurança doméstica, prevenção e primeiros socorros.')}
                    </Text>

                    <View style={styles.featuresList}>
                        <NeoCard variant="elevated" style={[styles.featureItem, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }]}>
                            <NeoIcon name="Message" size={20} color="#9C27B0" variant="Bold" />
                            <Text style={styles.featureText}>{t('headersFirst.tireDVidasEmTempoReal', 'Tire dúvidas em tempo real')}</Text>
                        </NeoCard>
                        <NeoCard variant="elevated" style={[styles.featureItem, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }]}>
                            <NeoIcon name="Health" size={20} color={Neo.colors.feedback.error} variant="Bold" />
                            <Text style={styles.featureText}>{t('headersFirst.suporteParaEmergNcias', 'Suporte para Emergências')}</Text>
                        </NeoCard>
                        <NeoCard variant="elevated" style={[styles.featureItem, { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' }]}>
                            <NeoIcon name="ShieldTick" size={20} color={Neo.colors.feedback.success} variant="Bold" />
                            <Text style={styles.featureText}>{t('headersFirst.dicasDePrevenO', 'Dicas de Prevenção')}</Text>
                        </NeoCard>
                    </View>

                    <TouchableOpacity
                        style={[styles.button]}
                        onPress={() => navigation.navigate('ConversationalAgent')}
                        activeOpacity={0.8}
                    >
                        <NeoIcon name="Microphone2" size={24} color="#FFF" style={{ marginRight: 8 }} variant="Bold" />
                        <Text style={styles.buttonText}>{t('headersFirst.falarComAIAElevenLabs', 'Falar com a IA (ElevenLabs)')}</Text>
                    </TouchableOpacity>

                    {/* Secondary Button for Typing */}
                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => navigation.navigate('AITextChat')}
                        activeOpacity={0.8}
                    >
                        <NeoIcon name="Keyboard" size={24} color="#9C27B0" style={{ marginRight: 8 }} variant="Bold" />
                        <Text style={[styles.buttonText, { color: '#9C27B0' }]}>{t('headersFirst.digitarTexto', 'Digitar Texto')}</Text>
                    </TouchableOpacity>

                    {/* Disclaimer LGPD/Apple */}
                    <Text style={styles.disclaimerText}>
                        {t('ai.disclaimer', 'O Vigilaro Care é uma ferramenta educativa e preventiva. A IA pode cometer erros e não substitui avaliação técnica, consulta médica ou socorro profissional. Em emergências graves, ligue imediatamente para os serviços de emergência (ex: 192, 193).')}
                    </Text>
                </View>
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
        padding: Neo.spacing.md,
        backgroundColor: 'transparent'
    },
    backButton: {
        marginRight: Neo.spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.xl,
        paddingTop: 4,
        paddingBottom: 85, // Ajustado para o botão SOS
    },
    iconContainer: {
        marginBottom: 8,
        backgroundColor: 'rgba(156, 39, 176, 0.15)', // Translucent purple
        padding: 20,
        borderRadius: 56,
    },
    titleMain: {
        fontSize: 28,
        fontWeight: '800',
        color: Neo.colors.neutral[900],
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        color: Neo.colors.neutral[600],
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 20,
    },
    featuresList: {
        width: '100%',
        marginBottom: 20,
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 16,
        gap: 12,
        borderWidth: 0, // Let NeoCard glass decide
    },
    featureText: {
        fontSize: 14,
        color: Neo.colors.neutral[700],
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#9C27B0',
        paddingHorizontal: Neo.spacing.xl,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        ...Neo.shadows.md,
        marginBottom: 10
    },
    secondaryButton: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderWidth: 1.5,
        borderColor: '#9C27B0',
        elevation: 0
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disclaimerText: {
        fontSize: 14,
        color: Neo.colors.neutral[500],
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 18,
        paddingHorizontal: 12,
    },
});
