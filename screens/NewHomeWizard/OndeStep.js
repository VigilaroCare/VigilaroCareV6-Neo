/**
 * OndeStep.js — agora P2 do wizard.
 *
 * Passo 2 — Quais ambientes existem na casa.
 * O tipo de moradia + andares migrou para P1_TipoMoradiaStep.
 * Este passo cuida apenas de áreas externas e cômodos internos.
 */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { H3, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { EXTERNAL_AREAS, INTERNAL_ROOMS } from '../../data/onboarding_data';
import { Chip } from './components';
import { ss } from './styles';
import NarrativeHeader from './NarrativeHeader';

const C = DS.colors;
const S = DS.spacing;

export default function OndeStep({
    externalAreas, setExternalAreas,
    internalRooms, setInternalRooms,
    onToggleArray,
}) {
    const totalSelected = (externalAreas?.length || 0) + (internalRooms?.length || 0);

    return (
        <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
            <NarrativeHeader
                stepLabel="ONDE • PASSO 2 DE 3"
                intro="Agora os ambientes."
                subIntro="Marque tudo que existe por aí — quanto mais real o mapa, mais útil o cuidado depois."
                iconName="Grid2"
            />

            {/* Áreas Externas */}
            <H3 style={{ marginBottom: 12, fontSize: 17 }}>Áreas externas e lazer</H3>
            <View style={ss.chipRow}>
                {EXTERNAL_AREAS.map(a => (
                    <Chip key={a.id} label={a.label} icon={a.icon} selected={externalAreas.includes(a.id)}
                        onPress={() => onToggleArray(externalAreas, setExternalAreas, a.id)} />
                ))}
            </View>

            {/* Ambientes Internos */}
            <H3 style={{ marginBottom: 16, marginTop: 28, fontSize: 17 }}>Ambientes internos</H3>
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

            {totalSelected > 0 && (
                <Caption style={{ color: C.primary[700], marginTop: 16, fontWeight: '600', textAlign: 'center' }}>
                    {totalSelected} ambiente{totalSelected > 1 ? 's' : ''} no seu mapa sensível
                </Caption>
            )}
        </ScrollView>
    );
}
