/**
 * QuemListStep.js
 * Lista de moradores/pets cadastrados + botões pra adicionar.
 */
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, H3, Body, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { ss } from './styles';

const C = DS.colors;
const S = DS.spacing;

export default function QuemListStep({ profiles, onAddHuman, onAddPet, onRemove }) {
    return (
        <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
            <Caption style={ss.phaseLabel}>PASSO 1 — QUEM</Caption>
            <H2 style={{ marginBottom: 8 }}>Quem vamos proteger?</H2>
            <Body style={{ color: C.neutral[700], marginBottom: 24 }}>
                Cadastre todos que vivem ou frequentam esta residência. Cada perfil personaliza os alertas de segurança.
            </Body>

            {profiles.length > 0 && (
                <View style={{ gap: 12, marginBottom: 24 }}>
                    {profiles.map(p => (
                        <View key={p.id} style={ss.profileCard}>
                            <View style={[ss.avatar, { backgroundColor: p.tipo === 'pet' ? '#FFF3E0' : C.primary[100] }]}>
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
                                    {p.isVisitante ? ' · Visitante' : ' · Morador'}
                                </Caption>
                            </View>
                            <TouchableOpacity onPress={() => onRemove(p.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <NeoIcon name="trash" size={20} color={C.neutral[400]} />
                            </TouchableOpacity>
                        </View>
                    ))}
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
