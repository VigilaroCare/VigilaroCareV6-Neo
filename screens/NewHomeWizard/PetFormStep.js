/**
 * PetFormStep.js
 * Formulário de cadastro de pet.
 */
import React from 'react';
import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Image, Platform } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, Body, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { PET_SPECIES, PET_SIZES } from '../../data/onboarding_data';
import { Chip, NeoInput } from './components';
import { ss } from './styles';

const C = DS.colors;
const S = DS.spacing;

const PET_CONDITIONS = [
    { id: 'mobilidade_reduzida', label: 'Mobilidade Reduzida / Artrose' },
    { id: 'visao_reduzida', label: 'Visão Reduzida / Cegueira' },
    { id: 'audicao_reduzida', label: 'Audição Reduzida / Surdez' },
    { id: 'disfuncao_cognitiva', label: 'Condição Neurológica / Cognitiva' },
];

export default function PetFormStep({
    formName, setFormName,
    formSpecies, setFormSpecies,
    formSize, setFormSize,
    formPetAge, setFormPetAge,
    formPetConditions, setFormPetConditions,
    formPhoto,
    onPickPhoto,
    onSave,
    onToggleArray,
}) {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
                <Caption style={ss.phaseLabel}>PASSO 1 — NOVO PET</Caption>
                <H2 style={{ marginBottom: 24 }}>Dados do Pet</H2>

                {/* FOTO DO PET */}
                <TouchableOpacity onPress={onPickPhoto} activeOpacity={0.8} style={{ alignSelf: 'center', marginBottom: 24 }}>
                    <View style={ss.photoCircle}>
                        {formPhoto ? (
                            <Image source={{ uri: formPhoto }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        ) : (
                            <NeoIcon name="pet" size={48} color={C.neutral[400]} />
                        )}
                        <View style={[ss.cameraBadge, { backgroundColor: '#EF6C00' }]}>
                            <NeoIcon name="camera" size={16} color="#FFF" />
                        </View>
                    </View>
                    <Caption style={{ textAlign: 'center', marginTop: 8, color: '#EF6C00' }}>Adicionar Foto</Caption>
                </TouchableOpacity>

                <NeoInput label="Nome" value={formName} onChangeText={setFormName} placeholder="Ex: Rex" />

                <Caption style={{ marginBottom: 8, color: C.neutral[700], fontWeight: '600' }}>Espécie</Caption>
                <View style={ss.chipRow}>
                    {PET_SPECIES.map(s => (
                        <Chip key={s.id} label={s.label} selected={formSpecies === s.id} onPress={() => setFormSpecies(s.id)} />
                    ))}
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Porte</Caption>
                <View style={ss.chipRow}>
                    {PET_SIZES.map(s => (
                        <Chip key={s.id} label={s.label} selected={formSize === s.id} onPress={() => setFormSize(s.id)} />
                    ))}
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Idade (Anos)</Caption>
                <View style={ss.stepperRow}>
                    <TouchableOpacity style={ss.stepperBtn} onPress={() => parseInt(formPetAge) > 0 && setFormPetAge((parseInt(formPetAge) - 1).toString())}>
                        <NeoIcon name="minus" size={20} color={parseInt(formPetAge) <= 0 ? C.neutral[300] : C.primary[600]} />
                    </TouchableOpacity>
                    <H2 style={{ marginHorizontal: 24, minWidth: 30, textAlign: 'center' }}>{formPetAge}</H2>
                    <TouchableOpacity style={ss.stepperBtn} onPress={() => setFormPetAge((parseInt(formPetAge) + 1).toString())}>
                        <NeoIcon name="add" size={20} color={C.primary[600]} />
                    </TouchableOpacity>
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Condições Especiais (opcional)</Caption>
                <View style={ss.chipRow}>
                    {PET_CONDITIONS.map(c => (
                        <Chip key={c.id} label={c.label} selected={formPetConditions.includes(c.id)} onPress={() => onToggleArray(formPetConditions, setFormPetConditions, c.id)} />
                    ))}
                </View>

                <TouchableOpacity style={[ss.saveBtn, { backgroundColor: '#EF6C00' }]} onPress={onSave} activeOpacity={0.9}>
                    <NeoIcon name="tick-circle" size={22} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 10 }}>Salvar Pet</Body>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
