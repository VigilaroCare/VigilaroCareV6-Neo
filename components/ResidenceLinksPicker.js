/**
 * ResidenceLinksPicker.js
 * Seletor de vínculo (Morador Fixo / Visitante / Não Frequenta) por
 * residência, pra usar em qualquer tela de cadastro/edição de perfil.
 *
 * Extraído de AddPerfilScreenNeo (onde nasceu) pra ser reaproveitado também
 * no wizard de residência — mesma UI, mesmo formato de dados
 * ({ [residenceId]: 'morador'|'frequentador'|'nenhum' }), sem duplicar.
 *
 * Só renderiza algo com mais de 1 residência: com 0-1 não há o que escolher.
 */
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import NeoIcon from './NeoIcon';
import { Body, Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { tx } from '../utils/txFixo';

const RELATION_OPTIONS = [
    { key: 'morador', get label() { return tx('telas.ResidenceLinksPicker.moradorFixo', 'Morador Fixo'); } },
    { key: 'frequentador', get label() { return tx('telas.ResidenceLinksPicker.visitante', 'Visitante'); } },
    { key: 'nenhum', get label() { return tx('telas.ResidenceLinksPicker.naoFrequenta', 'Não Frequenta'); } },
];

export default function ResidenceLinksPicker({ residencesList, relationships, onChange }) {
    const { t } = useTranslation();

    if (!residencesList || residencesList.length <= 1) return null;

    return (
        <View style={{ marginBottom: 16 }}>
            <Small style={styles.fieldLabel}>{t('telas.ResidenceLinksPicker.vinculoComOsLocaisOndeMora', 'VÍNCULO COM OS LOCAIS (ONDE MORA / FREQUENTA)')}</Small>
            {residencesList.map(res => {
                const currentRel = relationships?.[res.id] || 'nenhum';
                return (
                    <View key={res.id} style={styles.residenceRelationRow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                            <NeoIcon name="Home2" size={15} color={Neo.colors.neutral[500]} variant="Bold" style={{ marginRight: 6 }} />
                            <Body style={[styles.residenceRelationName, { marginBottom: 0, flex: 1 }]} numberOfLines={1}>
                                {res.nome === 'Minha Casa Principal' ? t('home.mainHouse', 'Minha Casa Principal') : res.nome}
                            </Body>
                        </View>
                        <View style={styles.relationButtonGroup}>
                            {RELATION_OPTIONS.map(opt => {
                                const isActive = currentRel === opt.key;
                                return (
                                    <TouchableOpacity
                                        key={opt.key}
                                        style={[
                                            styles.relationBtn,
                                            isActive && {
                                                borderColor: Neo.colors.primary[500],
                                                backgroundColor: Neo.colors.primary[50],
                                            },
                                        ]}
                                        onPress={() => onChange(res.id, opt.key)}
                                    >
                                        <Small style={{
                                            fontWeight: isActive ? 'bold' : '600',
                                            color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600],
                                            fontSize: 11,
                                        }}>
                                            {opt.label}
                                        </Small>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    fieldLabel: {
        marginBottom: 8,
        fontWeight: 'bold',
        color: Neo.colors.neutral[500],
    },
    residenceRelationRow: {
        backgroundColor: 'rgba(16,24,40,0.02)',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(16,24,40,0.06)',
    },
    residenceRelationName: {
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
        marginBottom: 8,
        fontSize: 14,
    },
    relationButtonGroup: {
        flexDirection: 'row',
        gap: 6,
    },
    relationBtn: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
});
