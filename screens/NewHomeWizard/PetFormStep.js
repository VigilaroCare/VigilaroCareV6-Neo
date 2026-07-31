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
    formComodos, setFormComodos,
    availableRooms = [],
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
                            <Image source={typeof formPhoto === 'number' ? formPhoto : { uri: formPhoto }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                        ) : (
                            <NeoIcon name="Heart" size={48} color={C.neutral[400]} variant="Bold" />
                        )}
                        <View style={[ss.cameraBadge, { backgroundColor: C.primary[600] }]}>
                            <NeoIcon name="Camera" size={16} color="#FFF" />
                        </View>
                    </View>
                    <Caption style={{ textAlign: 'center', marginTop: 8, color: C.primary[600] }}>Adicionar Foto</Caption>
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
                        <NeoIcon name="Minus" size={20} color={parseInt(formPetAge) <= 0 ? C.neutral[300] : C.primary[600]} />
                    </TouchableOpacity>
                    <H2 style={{ marginHorizontal: 24, minWidth: 30, textAlign: 'center' }}>{formPetAge}</H2>
                    <TouchableOpacity style={ss.stepperBtn} onPress={() => setFormPetAge((parseInt(formPetAge) + 1).toString())}>
                        <NeoIcon name="Add" size={20} color={C.primary[600]} />
                    </TouchableOpacity>
                </View>

                <Caption style={{ marginBottom: 8, marginTop: 16, color: C.neutral[700], fontWeight: '600' }}>Condições Especiais (opcional)</Caption>
                <View style={ss.chipRow}>
                    {PET_CONDITIONS.map(c => (
                        <Chip key={c.id} label={c.label} selected={formPetConditions.includes(c.id)} onPress={() => onToggleArray(formPetConditions, setFormPetConditions, c.id)} />
                    ))}
                </View>

                {/* ── Vínculo Pet↔Cômodo ──
                    Permite o app entender que o gatinho passa o dia na sala
                    ou que o cachorro só fica no quintal — risco e cuidado
                    se conectam ao território de cada bichinho. */}
                <Caption style={{ marginBottom: 6, marginTop: 22, color: C.neutral[700], fontWeight: '600' }}>
                    Onde esse bichinho fica?
                </Caption>
                <Body style={{ color: C.neutral[600], marginBottom: 12, lineHeight: 19, fontSize: 13 }}>
                    Marca os ambientes que ele frequenta. Pet tem rotina e território — o cuidado certo segue isso.
                </Body>
                {availableRooms.length === 0 ? (
                    <Caption style={{ color: C.neutral[500], fontStyle: 'italic', marginBottom: 8 }}>
                        Volta ao passo "Onde" e marca os ambientes da casa primeiro.
                    </Caption>
                ) : (
                    <View style={ss.chipRow}>
                        {availableRooms.map(r => (
                            <Chip
                                key={r.id}
                                label={r.label}
                                selected={formComodos.includes(r.id)}
                                onPress={() => onToggleArray(formComodos, setFormComodos, r.id)}
                            />
                        ))}
                    </View>
                )}

                <TouchableOpacity style={[ss.saveBtn, { backgroundColor: C.primary[600] }]} onPress={onSave} activeOpacity={0.9}>
                    <NeoIcon name="TickCircle" size={22} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 10 }}>Salvar pet</Body>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
