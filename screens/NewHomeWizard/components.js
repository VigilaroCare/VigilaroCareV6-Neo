/**
 * components.js
 * Componentes reutilizáveis das etapas do NewHomeWizard (Chip + NeoInput).
 */
import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import NeoIcon from '../../components/NeoIcon';
import { Small, Caption } from '../../components/NeoTypography';
import { DS } from '../../utils/DesignSystem2026';
import { ss } from './styles';

const C = DS.colors;

// === Chip selecionável ===
export const Chip = ({ label, selected, onPress, icon }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={[
            ss.chip,
            selected && { backgroundColor: C.primary[500], borderColor: C.primary[600] },
        ]}>
            {icon && <NeoIcon name={icon} size={16} color={selected ? '#FFF' : C.neutral[600]} style={{ marginRight: 6 }} />}
            <Small style={{ color: selected ? '#FFF' : C.neutral[800], fontWeight: selected ? 'bold' : 'normal' }}>
                {label}
            </Small>
        </View>
    </TouchableOpacity>
);

// === Input com label estilizado ===
export const NeoInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength }) => (
    <View style={{ marginBottom: 16 }}>
        <Caption style={{ marginBottom: 6, color: C.neutral[700], fontWeight: '600' }}>{label}</Caption>
        <TextInput
            style={ss.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={C.neutral[400]}
            keyboardType={keyboardType}
            maxLength={maxLength}
        />
    </View>
);
