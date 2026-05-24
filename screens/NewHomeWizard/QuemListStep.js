/**
 * QuemListStep.js
 * Lista de moradores/pets do app + checkbox "mora nesta residência?".
 *
 * Padrão B++ "briefing vivo": perfis são GLOBAIS (existem uma vez), mas
 * cada residência declara QUEM mora lá via moradia.habitantes[]. Quando
 * o user cria uma nova residência (ex: Casa de Praia), ele decide quais
 * perfis existentes moram lá marcando os checkboxes.
 *
 * Estado do checkbox vem do ProfileService.isProfileLinkedToActiveResidence.
 * Tap → link/unlink na residência ATIVA, sem deletar o perfil global.
 */
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, H3, Body, Caption, Small } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { ss } from './styles';

const C = DS.colors;
const S = DS.spacing;

export default function QuemListStep({
    profiles,
    linkedIds = [],              // IDs vinculados à residência ATIVA
    onAddHuman,
    onAddPet,
    onRemove,
    onToggleLink,                // (perfilId, currentlyLinked) => void
}) {
    const linkedSet = new Set(linkedIds);

    return (
        <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
            <Caption style={ss.phaseLabel}>PASSO • QUEM</Caption>
            <H2 style={{ marginBottom: 8 }}>Quem vamos proteger?</H2>
            <Body style={{ color: C.neutral[700], marginBottom: 24, lineHeight: 21 }}>
                Marque quem mora ou frequenta esta residência. Você pode adicionar pessoas e pets, e usar os mesmos perfis em outras residências (casa de praia, sítio…).
            </Body>

            {profiles.length > 0 && (
                <View style={{ gap: 12, marginBottom: 24 }}>
                    {profiles.map(p => {
                        const isLinked = linkedSet.has(p.id);
                        return (
                            <View key={p.id} style={[
                                ss.profileCard,
                                isLinked && {
                                    borderWidth: 1.5,
                                    borderColor: C.primary[500],
                                    backgroundColor: 'rgba(16,185,129,0.06)',
                                }
                            ]}>
                                {/* Checkbox grande à esquerda — "mora aqui?" */}
                                <TouchableOpacity
                                    onPress={() => onToggleLink && onToggleLink(p.id, isLinked)}
                                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                    style={{
                                        width: 28, height: 28, borderRadius: 14,
                                        borderWidth: 2,
                                        borderColor: isLinked ? C.primary[600] : C.neutral[400],
                                        backgroundColor: isLinked ? C.primary[600] : 'transparent',
                                        alignItems: 'center', justifyContent: 'center',
                                        marginRight: 14,
                                    }}
                                    accessibilityRole="checkbox"
                                    accessibilityState={{ checked: isLinked }}
                                    accessibilityLabel={`${p.nome} ${isLinked ? 'mora' : 'não mora'} aqui. Toque para alterar.`}
                                >
                                    {isLinked && (
                                        <NeoIcon name="TickCircle" size={18} color="#FFF" variant="Bold" />
                                    )}
                                </TouchableOpacity>

                                <View style={[ss.avatar, { backgroundColor: p.tipo === 'pet' ? '#FFF3E0' : C.primary[100], marginRight: 12 }]}>
                                    <NeoIcon
                                        name={p.tipo === 'pet' ? 'pet' : 'profile-circle'}
                                        size={24}
                                        color={p.tipo === 'pet' ? '#EF6C00' : C.primary[600]}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <H3 style={{ fontSize: 16 }}>{p.nome}</H3>
                                    <Caption style={{ color: C.neutral[500] }}>
                                        {p.tipo === 'pet' ? (p.especie || 'Pet') : (p.dataNascimento || 'Sem data')}
                                    </Caption>
                                </View>

                                {/* Lixeira — apaga o perfil GLOBAL (confirmação no orquestrador) */}
                                <TouchableOpacity
                                    onPress={() => onRemove(p.id)}
                                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Apagar perfil de ${p.nome}`}
                                >
                                    <NeoIcon name="trash" size={20} color={C.neutral[400]} />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            )}

            {profiles.length === 0 && (
                <View style={{ paddingVertical: 16, paddingHorizontal: 4, marginBottom: 16 }}>
                    <Small style={{ color: C.neutral[600], fontStyle: 'italic', textAlign: 'center', lineHeight: 19 }}>
                        Nenhum perfil ainda. Adicione um morador ou pet abaixo.
                    </Small>
                </View>
            )}

            <View style={{ gap: 12 }}>
                <TouchableOpacity style={ss.addBtn} onPress={onAddHuman} activeOpacity={0.8}>
                    <NeoIcon name="profile-add" size={24} color={C.primary[600]} />
                    <Body style={{ color: C.primary[700], fontWeight: '600', marginLeft: 12 }}>Adicionar Morador</Body>
                </TouchableOpacity>
                <TouchableOpacity style={[ss.addBtn, { backgroundColor: '#FFF8E1' }]} onPress={onAddPet} activeOpacity={0.8}>
                    <NeoIcon name="pet" size={24} color="#EF6C00" />
                    <Body style={{ color: '#E65100', fontWeight: '600', marginLeft: 12 }}>Adicionar Pet</Body>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
