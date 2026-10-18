/**
 * ConsentimentoResponsavel — confirmação do responsável legal ao cadastrar
 * perfil de criança ou adolescente (17/10/2026).
 *
 * LGPD art. 14, §1º: dado de criança exige consentimento específico e em
 * destaque de pelo menos um dos pais ou do responsável. No app, quem cadastra
 * já é o adulto da casa, mas a lei pede que isso fique EXPLÍCITO. Um toque,
 * uma vez por perfil. Os dados continuam só no aparelho.
 *
 * Aparece quando a idade é conhecida e menor que 18. Grava no perfil
 * `consentimentoResponsavel: { em, versao }` (ver as telas que salvam).
 */
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import NeoIcon from './NeoIcon';
import { Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { tx } from '../utils/txFixo';

export const VERSAO_CONSENTIMENTO_RESPONSAVEL = 1;

/** true quando o perfil é de criança/adolescente (idade conhecida < 18). */
export const precisaConsentimentoResponsavel = (idade) => idade != null && Number(idade) < 18;

/** Registro gravado no perfil. Mantém o anterior, se já houver. */
export const registroConsentimentoResponsavel = (anterior) =>
    anterior || { em: new Date().toISOString(), versao: VERSAO_CONSENTIMENTO_RESPONSAVEL };

export const avisoConsentimentoResponsavel = () => ({
    titulo: tx('consentimentoResponsavel.tituloAviso', 'Confirmação do responsável'),
    texto: tx('consentimentoResponsavel.obrigatorio', 'Para cadastrar uma criança ou um adolescente, confirme que você é a mãe, o pai ou o responsável legal.'),
});

export default function ConsentimentoResponsavel({ idade, marcado, onChange, style }) {
    if (!precisaConsentimentoResponsavel(idade)) return null;
    const texto = tx('consentimentoResponsavel.texto', 'Sou mãe, pai ou responsável legal e autorizo o cadastro destes dados no app.');
    return (
        <TouchableOpacity
            onPress={() => onChange(!marcado)}
            activeOpacity={0.8}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!marcado }}
            accessibilityLabel={texto}
            style={[styles.linha, marcado && styles.linhaMarcada, style]}
        >
            {marcado
                ? <NeoIcon name="TickSquare" size={22} color={Neo.colors.primary[600]} variant="Bold" />
                : <View style={styles.caixa} />}
            <Small style={styles.texto}>{texto}</Small>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1.5,
        borderColor: Neo.colors.neutral[300],
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginTop: 12,
        marginBottom: 4,
    },
    linhaMarcada: { borderColor: Neo.colors.primary[500] },
    caixa: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Neo.colors.neutral[400],
        marginHorizontal: 1,
    },
    texto: { flex: 1, color: Neo.colors.neutral[800], fontWeight: '600', lineHeight: 18 },
});
