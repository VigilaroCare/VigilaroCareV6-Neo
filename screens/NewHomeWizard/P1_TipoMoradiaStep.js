// screens/NewHomeWizard/P1_TipoMoradiaStep.js
//
// Passo 1 do wizard — Tipo de moradia + andares.
// Extraído do antigo OndeStep pra dar respiro narrativo e separar o
// "como é a estrutura física" (P1) do "que ambientes existem" (P2).

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { H2, H3, Body } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { HOUSE_TYPES } from '../../data/onboarding_data';
import { Chip } from './components';
import { ss } from './styles';
import NarrativeHeader from './NarrativeHeader';

const C = DS.colors;
const S = DS.spacing;

export default function P1_TipoMoradiaStep({
    houseType, setHouseType,
    floors, setFloors,
}) {
    return (
        <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
            <NarrativeHeader
                stepLabel="ONDE • PASSO 1 DE 3"
                intro="Vamos começar pela sua casa."
                subIntro="É de onde tudo parte. Me conta o tipo de moradia e quantos andares ela tem."
                iconName="Home2"
            />

            {/* Tipo de Residência */}
            <H3 style={{ marginBottom: 12, fontSize: 17, marginTop: 8 }}>Tipo de moradia</H3>
            <View style={[ss.chipRow, { marginBottom: 28 }]}>
                {HOUSE_TYPES.map(h => (
                    <Chip key={h.id} label={h.label} icon={h.icon} selected={houseType === h.id}
                        onPress={() => setHouseType(h.id)} />
                ))}
            </View>

            {/* Andares */}
            <H3 style={{ marginBottom: 12, fontSize: 17 }}>Quantos andares?</H3>
            <Body style={{ color: C.neutral[600], marginBottom: 14, lineHeight: 19 }}>
                Conta os pavimentos habitáveis — escada conta como ponto de atenção pra próxima etapa.
            </Body>
            <View style={ss.stepperRow}>
                <TouchableOpacity style={ss.stepperBtn} onPress={() => floors > 1 && setFloors(floors - 1)}>
                    <NeoIcon name="minus" size={20} color={floors <= 1 ? C.neutral[300] : C.primary[600]} />
                </TouchableOpacity>
                <H2 style={{ marginHorizontal: 24, minWidth: 30, textAlign: 'center' }}>{floors}</H2>
                <TouchableOpacity style={ss.stepperBtn} onPress={() => setFloors(floors + 1)}>
                    <NeoIcon name="add" size={20} color={C.primary[600]} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
