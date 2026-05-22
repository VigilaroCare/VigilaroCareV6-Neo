/**
 * HumanFormStep.js
 * Formulário de cadastro de morador (humano).
 */
import React from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Image, Platform } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, Body, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { GENDERS, BOND_TYPES, SPECIAL_CONDITIONS, formatDOB } from '../../data/onboarding_data';
import { Chip, NeoInput } from './components';
import { ss } from './styles';

const C = DS.colors;
const S = DS.spacing;

export default function HumanFormStep({
    formName, setFormName,
    formDOB, setFormDOB,
    formGender, setFormGender,
    formBond, setFormBond,
    formConditions, setFormConditions,
    formPhoto,
    onPickPhoto,
    onSave,
    onToggleArray,
}) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
                <Caption style={ss.phaseLabel}>PASSO 1 — NOVO MORADOR</Caption>
                <H2 style={{ marginBottom: 24 }}>Dados Essenciais</H2>

                {/* FOTO DO MORADOR */}
                <TouchableOpacity onPress={onPickPhoto} activeOpacity={0.8} style={{ alignSelf: 'center', marginBottom: 24 }}>
                    <View style={ss.photoCircle}>
                        {formPhoto ? (
                            <Image source={{ uri: formPhoto }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        ) : (
                            <NeoIcon name="profile-circle" size={48} color={C.neutral[400]} />
                        )}
                        <View style={ss.cameraBadge}>
                            <NeoIcon name="camera" size={16} color="#FFF" />
                        </View>
                    </View>
                    <Caption style={{ textAlign: 'center', marginTop: 8, color: C.primary[600] }}>Adicionar Foto</Caption>
                </TouchableOpacity>

                <NeoInput label="Nome Completo" value={formName} onChangeText={setFormName} placeholder="Ex: João Silva" />
                <NeoInput
                    label="Data de Nascimento"
                    value={formDOB}
                    onChangeText={t => setFormDOB(formatDOB(t))}
                    placeholder="DD/MM/AAAA"
                    keyboardType="numeric"
                    maxLength={10}
                />

                <Caption style={{ marginBottom: 8, color: C.neutral[700], fontWeight: '600' }}>Gênero</Caption>
                <View style={ss.chipRow}>
                    {GENDERS.map(g => (
                        <Chip key={g.id} label={g.label} selected={formGender === g.id} onPress={() => setFormGender(g.id)} />
                    ))}
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Vínculo</Caption>
                <View style={ss.chipRow}>
                    {BOND_TYPES.map(b => (
                        <Chip key={b.id} label={b.label} selected={formBond === b.id} onPress={() => setFormBond(b.id)} />
                    ))}
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Condições Especiais (opcional)</Caption>
                <View style={ss.chipRow}>
                    {SPECIAL_CONDITIONS.map(c => (
                        <Chip key={c.id} label={c.label} selected={formConditions.includes(c.id)} onPress={() => onToggleArray(formConditions, setFormConditions, c.id)} />
                    ))}
                </View>

                <TouchableOpacity style={ss.saveBtn} onPress={onSave} activeOpacity={0.9}>
                    <NeoIcon name="tick-circle" size={22} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 10 }}>Salvar Morador</Body>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
