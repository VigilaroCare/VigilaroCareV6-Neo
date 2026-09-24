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
 *   sos — SOS: depende de sinal/SMS; combine com os contatos
 *   travelAir — regras de bagagem mudam; confirme com a companhia
 *   ia — resultado gerado por IA: identifica a origem e pede conferência
 *
 * A variante `ia` existe por obrigação, não por estilo: conteúdo gerado por
 * inteligência artificial precisa ser identificado como tal (EU AI Act, e a
 * mesma direção nas regras de Play/App Store). Some junto a exigência de
 * segurança: o usuário precisa saber que a análise pode errar antes de agir
 * sobre um risco doméstico.
 */
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';

const COPY = {
    sos: ['disclaimer.sos', 'O envio do SOS depende de o aparelho ter sinal e plano para SMS. Combine com seus contatos o que fazer ao receber um alerta. Em risco imediato, ligue {{EMERGENCY_NUMBER}} (SAMU) ou 193 (Bombeiros).'],
    travelAir: ['disclaimer.travelAir', 'As regras de viagem e os limites de bagagem mudam com frequência. Confirme sempre com a sua companhia aérea — e, em viagem internacional, com o consulado — antes de viajar.'],
    ia: ['disclaimer.ia', 'Esta análise foi gerada por inteligência artificial a partir da sua foto e pode conter erros. Confira o ambiente ou o rótulo antes de agir. Não substitui laudo técnico nem orientação médica.'],
};

export default function SafetyDisclaimer({ variant = 'sos', style }) {
    const { t } = useTranslation('common');
    const [key, fallback] = COPY[variant] || COPY.sos;
    return (
        <View style={[styles.box, style]} accessibilityRole="text">
            <NeoIcon name="InfoCircle" size={16} color={Neo.colors.accent.warm || '#A16207'} variant="Bold" />
            <Small style={styles.text}>{t(key, fallback)}</Small>
        </View>
    );
}

const styles = StyleSheet.create({
    // Callout em DESTAQUE (regra permanente do autor: aviso de segurança nunca
    // em letra miúda — precisa ser visto p/ cumprir a função). Caixa champagne
    // + acento lateral + traço mais firme; vale p/ TODAS as variantes.
    box: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: 'rgba(161, 98, 7, 0.10)', // champagne sutil (DS)
        borderLeftWidth: 3,
        borderLeftColor: Neo.colors.accent.champagne || '#A16207',
        borderRadius: 12,
        paddingVertical: 11,
        paddingHorizontal: 13,
    },
    text: {
        flex: 1,
        color: Neo.colors.neutral[800],
        fontSize: 12.5,
        fontWeight: '600',
        lineHeight: 17,
    },
});
