/**
 * AudioConsentModal.js
 * Consentimento explícito exibido ANTES do primeiro uso do microfone
 * (Apple Guideline 5.1.1 / LGPD), em DUAS variantes com copy distinto —
 * porque as promessas são diferentes:
 *
 *   variant="monitor" (default) — áudio ambiente: processado LOCALMENTE,
 *     sem gravação nem transmissão.
 *   variant="voice" — mensagens de voz ao assistente: o áudio É enviado
 *     (via proxy seguro) para transcrição/resposta pela OpenAI; não é
 *     armazenado nem usado para treino; nomes/contatos não acompanham.
 *
 * Uso:
 *   <AudioConsentModal
 *     visible={consentVisible}
 *     variant="voice"
 *     onAccept={handleAccept}
 *     onDecline={() => setConsentVisible(false)}
 *   />
 */

import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import NeoCard from './NeoCard';
import { H3, Body, Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';

// Persistência do consent de VOZ (compartilhada por ChatScreen e
// ConversationalAgent — o consent do monitor vive no AudioMonitorScreen).
export const VOICE_CONSENT_KEY = '@voice_consent_accepted';
export const hasVoiceConsent = async () => {
    try { return (await AsyncStorage.getItem(VOICE_CONSENT_KEY)) === 'true'; }
    catch { return false; }
};
export const grantVoiceConsent = async () => {
    try { await AsyncStorage.setItem(VOICE_CONSENT_KEY, 'true'); } catch {}
};

export default function AudioConsentModal({ visible, onAccept, onDecline, variant = 'monitor' }) {
    const { t } = useTranslation('common');
    const isVoice = variant === 'voice';
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onDecline}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onDecline} />

                <View style={styles.modalContainer}>
                    <NeoCard style={styles.card}>
                        <View style={styles.iconContainer}>
                            <NeoIcon name="Microphone2" size={32} color="#FFF" variant="Bold" />
                        </View>

                        <H3 style={styles.title}>
                            {isVoice
                                ? t('audioConsent.voiceTitle', 'Mensagens de Voz ao Assistente')
                                : t('audioConsent.title', 'Monitoramento de Áudio Ambiente')}
                        </H3>

                        <Body style={styles.body}>
                            {isVoice
                                ? t('audioConsent.voiceBody', 'Ao usar o microfone, sua fala é gravada e enviada por conexão segura para ser transcrita e respondida pelo assistente (tecnologia OpenAI).')
                                : t('audioConsent.body', 'Esta função escuta o ambiente para detectar eventos como choro, quedas ou ruídos altos.')}
                        </Body>
                        <Body style={styles.bodyStrong}>
                            {isVoice
                                ? t('audioConsent.voiceBodyStrong', 'O áudio é usado apenas para gerar a resposta — não é armazenado nem usado para treinar modelos, e nomes/contatos não o acompanham.')
                                : t('audioConsent.bodyStrong', 'O áudio não é gravado nem transmitido — é processado localmente, em tempo real, apenas enquanto a tela está aberta.')}
                        </Body>

                        <TouchableOpacity
                            style={styles.btnPrimary}
                            onPress={onAccept}
                            accessibilityRole="button"
                            accessibilityLabel={t('audioConsent.acceptA11y', 'Entendi e aceito o monitoramento de áudio')}
                        >
                            <Body style={styles.btnPrimaryText}>
                                {t('audioConsent.accept', 'Entendi e aceito')}
                            </Body>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnSecondary}
                            onPress={onDecline}
                            accessibilityRole="button"
                            accessibilityLabel={t('audioConsent.declineA11y', 'Não usar a função de monitoramento de áudio')}
                        >
                            <Small style={styles.btnSecondaryText}>
                                {t('audioConsent.decline', 'Agora não')}
                            </Small>
                        </TouchableOpacity>
                    </NeoCard>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 420,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        ...Neo.shadows.lg,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Neo.colors.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,
        color: Neo.colors.neutral[900],
    },
    body: {
        fontSize: 14,
        textAlign: 'center',
        color: Neo.colors.neutral[600],
        marginBottom: 12,
    },
    bodyStrong: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '700',
        color: Neo.colors.neutral[800],
        marginBottom: 20,
    },
    btnPrimary: {
        backgroundColor: Neo.colors.primary[500],
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    btnPrimaryText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    btnSecondary: {
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',
        marginTop: 4,
    },
    btnSecondaryText: {
        color: Neo.colors.neutral[500],
        fontWeight: '600',
    },
});
