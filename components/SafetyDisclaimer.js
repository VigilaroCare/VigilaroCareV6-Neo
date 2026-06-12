/**
 * SafetyDisclaimer — ressalva de expectativa nos recursos de proteção.
 *
 * Filosofia do produto (autor, 2026-06-12): o Vigilaro é guia/assistente de
 * prevenção — nunca se propôs a ser solução definitiva de emergência nem
 * autoridade de saúde. Este componente leva essa honestidade para DENTRO da
 * tela de cada recurso (não só para os Termos), calibrando a promessa onde
 * o usuário a encontra — blindagem ética e jurídica ao mesmo tempo.
 *
 * Variantes:
 *   monitor — monitor de áudio: não substitui supervisão de adulto
 *   fall    — detecção de queda: sensores têm limites (falso neg/pos)
 *   sos     — SOS: depende de sinal/SMS; combine com os contatos
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';

const COPY = {
    monitor: ['disclaimer.monitor', 'Recurso auxiliar: não substitui a supervisão de um adulto responsável.'],
    fall: ['disclaimer.fall', 'A detecção usa os sensores do aparelho e pode não identificar todas as quedas — ou gerar alertas falsos. É uma camada extra de proteção, não um substituto de acompanhamento.'],
    sos: ['disclaimer.sos', 'O envio do SOS depende de o aparelho ter sinal e plano para SMS. Combine com seus contatos o que fazer ao receber um alerta. Em risco imediato, ligue 192 (SAMU) ou 193 (Bombeiros).'],
};

export default function SafetyDisclaimer({ variant = 'monitor', style }) {
    const { t } = useTranslation('common');
    const [key, fallback] = COPY[variant] || COPY.monitor;
    return (
        <View style={[styles.box, style]} accessibilityRole="text">
            <NeoIcon name="InfoCircle" size={16} color={Neo.colors.accent.warm || '#A16207'} variant="Bold" />
            <Small style={styles.text}>{t(key, fallback)}</Small>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: 'rgba(161, 98, 7, 0.07)', // champagne ultra-sutil (DS)
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    text: {
        flex: 1,
        color: Neo.colors.neutral[700],
        fontSize: 12,
        lineHeight: 17,
    },
});
