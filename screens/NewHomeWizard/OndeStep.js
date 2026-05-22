/**
 * OndeStep.js
 * Passo 2 — descrição estrutural da residência (tipo, andares, áreas, cômodos).
 */
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, H3, Body, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { HOUSE_TYPES, EXTERNAL_AREAS, INTERNAL_ROOMS } from '../../data/onboarding_data';
import { Chip } from './components';
import { ss } from './styles';

const C = DS.colors;
const S = DS.spacing;

export default function OndeStep({
    houseType, setHouseType,
    floors, setFloors,
    externalAreas, setExternalAreas,
    internalRooms, setInternalRooms,
    onToggleArray,
}) {
    return (
        <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
            <Caption style={ss.phaseLabel}>PASSO 2 — ONDE</Caption>
            <H2 style={{ marginBottom: 8 }}>Raio-X da Moradia</H2>
            <Body style={{ color: C.neutral[700], marginBottom: 24 }}>
                Descreva a estrutura física da residência. Cada detalhe gera alertas mais precisos.
            </Body>

            {/* Tipo de Residência */}
            <H3 style={{ marginBottom: 12, fontSize: 17 }}>Tipo de Residência</H3>
            <View style={[ss.chipRow, { marginBottom: 28 }]}>
                {HOUSE_TYPES.map(h => (
                    <Chip key={h.id} label={h.label} icon={h.icon} selected={houseType === h.id}
                        onPress={() => setHouseType(h.id)} />
                ))}
            </View>

            {/* Andares */}
            <H3 style={{ marginBottom: 12, fontSize: 17 }}>Quantos Andares?</H3>
            <View style={ss.stepperRow}>
                <TouchableOpacity style={ss.stepperBtn} onPress={() => floors > 1 && setFloors(floors - 1)}>
                    <NeoIcon name="minus" size={20} color={floors <= 1 ? C.neutral[300] : C.primary[600]} />
                </TouchableOpacity>
                <H2 style={{ marginHorizontal: 24, minWidth: 30, textAlign: 'center' }}>{floors}</H2>
                <TouchableOpacity style={ss.stepperBtn} onPress={() => setFloors(floors + 1)}>
                    <NeoIcon name="add" size={20} color={C.primary[600]} />
                </TouchableOpacity>
            </View>

            {/* Áreas Externas */}
            <H3 style={{ marginBottom: 12, marginTop: 28, fontSize: 17 }}>Áreas Externas e Lazer</H3>
            <View style={ss.chipRow}>
                {EXTERNAL_AREAS.map(a => (
                    <Chip key={a.id} label={a.label} icon={a.icon} selected={externalAreas.includes(a.id)}
                        onPress={() => onToggleArray(externalAreas, setExternalAreas, a.id)} />
                ))}
            </View>

            {/* Ambientes Internos */}
            <H3 style={{ marginBottom: 16, marginTop: 28, fontSize: 17 }}>Ambientes Internos</H3>
            {INTERNAL_ROOMS.map(cat => (
                <View key={cat.category} style={{ marginBottom: 20 }}>
                    <Caption style={{ color: C.neutral[500], fontWeight: '700', letterSpacing: 1, marginBottom: 10 }}>
                        {cat.category.toUpperCase()}
                    </Caption>
                    <View style={ss.chipRow}>
                        {cat.items.map(r => (
                            <Chip key={r.id} label={r.label} selected={internalRooms.includes(r.id)}
                                onPress={() => onToggleArray(internalRooms, setInternalRooms, r.id)} />
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}
