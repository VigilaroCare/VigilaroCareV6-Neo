import React, { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View, ScrollView, TouchableOpacity, Alert, TextInput, Image,
    StatusBar, Animated, Easing, Platform, KeyboardAvoidingView, StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { DS } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { useTranslation } from 'react-i18next';
import {
    HOUSE_TYPES, EXTERNAL_AREAS, INTERNAL_ROOMS,
    GENDERS, BOND_TYPES, SPECIAL_CONDITIONS,
    PET_SPECIES, PET_SIZES, formatDOB,
} from '../data/onboarding_data';
import { getDefaultProfile } from '../services/ProfileModels';

const C = DS.colors;
const S = DS.spacing;

// === Reusable Chip Component ===
const Chip = ({ label, selected, onPress, icon }) => (
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

// === Reusable Neo Input ===
const NeoInput = ({ label, value, onChangeText, placeholder, keyboardType, maxLength }) => (
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

export default function NewHomeWizardScreenNeo({ navigation, route }) {
    const { t } = useTranslation();
    const { residenceId } = route.params || {};
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const [formPetAge, setFormPetAge] = useState('1');
    const [formPetConditions, setFormPetConditions] = useState([]);

    // Navigation state
    const [phase, setPhase] = useState(0); // 0=QUEM, 1=ONDE
    const [subView, setSubView] = useState('list'); // list | form_human | form_pet

    // QUEM state
    const [profiles, setProfiles] = useState([]);
    const [formName, setFormName] = useState('');
    const [formDOB, setFormDOB] = useState('');
    const [formGender, setFormGender] = useState('');
    const [formBond, setFormBond] = useState('morador');
    const [formConditions, setFormConditions] = useState([]);
    const [formSpecies, setFormSpecies] = useState('');
    const [formSize, setFormSize] = useState('');
    const [formPhoto, setFormPhoto] = useState(null);

    // ONDE state
    const [houseType, setHouseType] = useState('casa');
    const [floors, setFloors] = useState(1);
    const [externalAreas, setExternalAreas] = useState([]);
    const [internalRooms, setInternalRooms] = useState([]);

    useFocusEffect(useCallback(() => {
        loadData();
    }, [residenceId]));

    const loadData = async () => {
        if (residenceId) await ProfileService.setActiveResidence(residenceId);
        const all = await ProfileService.getAllPerfis();
        setProfiles(all || []);
        const moradia = await ProfileService.getMoradia();
        if (moradia?.tipoImovel) setHouseType(moradia.tipoImovel);
        const mapping = await ProfileService.getMapping();
        if (mapping?.length > 0) setInternalRooms(mapping);
    };

    const resetForm = () => {
        setFormName(''); setFormDOB(''); setFormGender('');
        setFormBond('morador'); setFormConditions([]);
        setFormSpecies(''); setFormSize(''); setFormPhoto(null);
        setFormPetAge('1'); setFormPetConditions([]);
    };

    const pickPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return Alert.alert('Permissão Necessária', 'Precisamos de acesso à galeria para selecionar a foto.');
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });
        if (!result.canceled && result.assets?.[0]?.uri) {
            setFormPhoto(result.assets[0].uri);
        }
    };

    // === PROFILE CRUD ===
    const saveHumanProfile = async () => {
        if (!formName.trim()) return Alert.alert('Atenção', 'Informe o nome.');
        let fotoSalva = null;
        if (formPhoto) {
            fotoSalva = await ProfileService.persistImage(formPhoto, 'profile');
        }
        const perfil = await ProfileService.addPerfil({
            nome: formName.trim(),
            dataNascimento: formDOB,
            genero: formGender,
            vinculo: formBond === 'visitante' ? 'frequentador' : 'habitante',
            necessidadesEspeciais: formConditions,
            foto: fotoSalva,
        }, 'humano');
        if (perfil) {
            const all = await ProfileService.getAllPerfis();
            setProfiles(all || []);
            resetForm();
            setSubView('list');
        }
    };

    const savePetProfile = async () => {
        if (!formName.trim()) return Alert.alert('Atenção', 'Informe o nome do pet.');
        let fotoSalva = null;
        if (formPhoto) {
            fotoSalva = await ProfileService.persistImage(formPhoto, 'pet');
        }
        const p = getDefaultProfile('pet');
        p.nome = formName;
        p.foto = fotoSalva;
        p.especie = formSpecies;
        p.porte = formSize;
        
        // Calcular dataNascimento aproximada baseada na idade em anos
        const anoAtual = new Date().getFullYear();
        const anoNasc = anoAtual - parseInt(formPetAge, 10);
        p.dataNascimento = `01/01/${anoNasc}`;
        
        p.necessidadesEspeciais = formPetConditions;
        p.pendente = false;

        const perfil = await ProfileService.addPerfil(p, 'pet');
        if (perfil) {
            const all = await ProfileService.getAllPerfis();
            setProfiles(all || []);
            resetForm();
            setSubView('list');
        }
    };

    const removeProfile = async (id) => {
        Alert.alert('Remover?', 'Este perfil será removido do mapeamento.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Remover', style: 'destructive', onPress: async () => {
                await ProfileService.removePerfil(id);
                const all = await ProfileService.getAllPerfis();
                setProfiles(all || []);
            }},
        ]);
    };

    // === NAVIGATION ===
    const animateTo = (nextPhase, nextSub) => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
            if (nextPhase !== undefined) setPhase(nextPhase);
            if (nextSub) setSubView(nextSub);
            Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }).start();
        });
    };

    const handleNext = () => {
        if (phase === 0 && subView !== 'list') return; // Block if in form
        if (phase === 0) {
            if (profiles.length === 0) return Alert.alert('Atenção', 'Adicione ao menos 1 morador.');
            animateTo(1, 'list');
        } else {
            finishWizard();
        }
    };

    const handleBack = () => {
        if (subView !== 'list') { animateTo(undefined, 'list'); return; }
        if (phase > 0) { animateTo(phase - 1, 'list'); return; }
        navigation.goBack();
    };

    const toggleArray = (arr, setter, id) => {
        setter(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const finishWizard = async () => {
        try {
            const allMapping = [...externalAreas, ...internalRooms];
            await ProfileService.saveMoradia({
                tipoImovel: houseType,
                andares: floors,
                areasExternas: externalAreas,
            });
            await ProfileService.saveMapping(allMapping);
            const humans = profiles.filter(p => p.tipo !== 'pet' && !p.pendente);
            if (humans.length > 0) await ProfileService.setActivePerfil(humans[0].id);
            await ProfileService.setOnboardingCompleto();
            Alert.alert('Mapeamento Concluído', 'Sua matriz de proteção está ativa.', [
                { text: 'Acessar Cockpit', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) }
            ]);
        } catch (e) {
            Alert.alert('Erro', 'Não foi possível salvar.');
        }
    };

    // === RENDER: QUEM LIST ===
    const renderQuemList = () => (
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
                            <TouchableOpacity onPress={() => removeProfile(p.id)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                                <NeoIcon name="trash" size={20} color={C.neutral[400]} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            <View style={{ gap: 12 }}>
                <TouchableOpacity style={ss.addBtn} onPress={() => { resetForm(); animateTo(undefined, 'form_human'); }} activeOpacity={0.8}>
                    <NeoIcon name="profile-add" size={24} color={C.primary[600]} />
                    <Body style={{ color: C.primary[700], fontWeight: '600', marginLeft: 12 }}>Adicionar Morador</Body>
                </TouchableOpacity>
                <TouchableOpacity style={[ss.addBtn, { backgroundColor: '#FFF8E1' }]} onPress={() => { resetForm(); animateTo(undefined, 'form_pet'); }} activeOpacity={0.8}>
                    <NeoIcon name="pet" size={24} color="#EF6C00" />
                    <Body style={{ color: '#E65100', fontWeight: '600', marginLeft: 12 }}>Adicionar Pet</Body>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    // === RENDER: HUMAN FORM ===
    const renderHumanForm = () => (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
                <Caption style={ss.phaseLabel}>PASSO 1 — NOVO MORADOR</Caption>
                <H2 style={{ marginBottom: 24 }}>Dados Essenciais</H2>

                {/* FOTO DO MORADOR */}
                <TouchableOpacity onPress={pickPhoto} activeOpacity={0.8} style={{ alignSelf: 'center', marginBottom: 24 }}>
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
                        <Chip key={c.id} label={c.label} selected={formConditions.includes(c.id)} onPress={() => toggleArray(formConditions, setFormConditions, c.id)} />
                    ))}
                </View>

                <TouchableOpacity style={ss.saveBtn} onPress={saveHumanProfile} activeOpacity={0.9}>
                    <NeoIcon name="tick-circle" size={22} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 10 }}>Salvar Morador</Body>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    // === RENDER: PET FORM ===
    const renderPetForm = () => (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: S.lg, paddingBottom: 140 }}>
                <Caption style={ss.phaseLabel}>PASSO 1 — NOVO PET</Caption>
                <H2 style={{ marginBottom: 24 }}>Dados do Pet</H2>

                {/* FOTO DO PET */}
                <TouchableOpacity onPress={pickPhoto} activeOpacity={0.8} style={{ alignSelf: 'center', marginBottom: 24 }}>
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
                    {[
                        { id: 'mobilidade_reduzida', label: 'Mobilidade Reduzida / Artrose' },
                        { id: 'visao_reduzida', label: 'Visão Reduzida / Cegueira' },
                        { id: 'audicao_reduzida', label: 'Audição Reduzida / Surdez' },
                        { id: 'disfuncao_cognitiva', label: 'Condição Neurológica / Cognitiva' }
                    ].map(c => (
                        <Chip key={c.id} label={c.label} selected={formPetConditions.includes(c.id)} onPress={() => toggleArray(formPetConditions, setFormPetConditions, c.id)} />
                    ))}
                </View>

                <TouchableOpacity style={[ss.saveBtn, { backgroundColor: '#EF6C00' }]} onPress={savePetProfile} activeOpacity={0.9}>
                    <NeoIcon name="tick-circle" size={22} color="#FFF" />
                    <Body style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 10 }}>Salvar Pet</Body>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    // === RENDER: ONDE ===
    const renderOnde = () => (
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
                        onPress={() => toggleArray(externalAreas, setExternalAreas, a.id)} />
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
                                onPress={() => toggleArray(internalRooms, setInternalRooms, r.id)} />
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );

    // === MAIN RENDER ===
    const isForm = subView !== 'list';
    const showFooter = !isForm;

    const renderContent = () => {
        if (phase === 0) {
            if (subView === 'form_human') return renderHumanForm();
            if (subView === 'form_pet') return renderPetForm();
            return renderQuemList();
        }
        return renderOnde();
    };

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={ss.header}>
                    <TouchableOpacity onPress={handleBack} style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <NeoIcon name={phase === 0 && subView === 'list' ? 'CloseSquare' : 'ArrowLeft2'} size={22} color={C.neutral[800]} />
                    </TouchableOpacity>
                    <View style={ss.progressBar}>
                        <View style={[ss.progressFill, { width: `${((phase + 1) / 2) * 100}%` }]} />
                    </View>
                    <Caption style={{ color: C.neutral[500], marginLeft: 12 }}>{phase + 1}/2</Caption>
                </View>

                {/* Content */}
                <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                    {renderContent()}
                </Animated.View>

                {/* Footer */}
                {showFooter && (
                    <View style={ss.footer}>
                        <TouchableOpacity style={ss.mainBtn} onPress={handleNext} activeOpacity={0.9}>
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 17 }}>
                                {phase === 0 ? 'Próxima Etapa: Onde' : 'Concluir Mapeamento'}
                            </Body>
                            <NeoIcon name={phase === 0 ? 'arrow-right' : 'tick-square'} size={22} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </AppBackground>
    );
}

const ss = StyleSheet.create({
    phaseLabel: {
        color: DS.colors.primary[600], fontWeight: 'bold', letterSpacing: 1.5,
        marginBottom: 6, fontSize: 12,
    },
    header: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 12,
    },
    progressBar: {
        flex: 1, height: 6, backgroundColor: C.neutral[200],
        borderRadius: 3, marginLeft: 16, overflow: 'hidden',
    },
    progressFill: {
        height: '100%', backgroundColor: C.primary[500], borderRadius: 3,
    },
    profileCard: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        backgroundColor: '#FFF', borderRadius: DS.borderRadius.md,
        ...DS.shadows.sm,
    },
    avatar: {
        width: 48, height: 48, borderRadius: 24,
        alignItems: 'center', justifyContent: 'center', marginRight: 16,
    },
    addBtn: {
        flexDirection: 'row', alignItems: 'center', padding: 18,
        backgroundColor: C.primary[100], borderRadius: DS.borderRadius.md,
    },
    input: {
        backgroundColor: C.neutral[200], borderRadius: 12, padding: 16,
        fontSize: 16, color: C.neutral[900],
    },
    chipRow: {
        flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8,
    },
    chip: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
        backgroundColor: C.neutral[200], borderWidth: 1, borderColor: C.neutral[300],
    },
    saveBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: C.primary[600], padding: 18, borderRadius: DS.borderRadius.md,
        marginTop: 32, ...DS.shadows.md,
    },

    stepperRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#FFF', padding: 16, borderRadius: DS.borderRadius.md,
        marginBottom: 8, ...DS.shadows.sm,
    },
    stepperBtn: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: C.neutral[200],
        alignItems: 'center', justifyContent: 'center',
    },
    footer: {
        padding: 20, paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    },
    mainBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 10, paddingVertical: 18, borderRadius: DS.borderRadius.md,
        backgroundColor: C.primary[700], ...DS.shadows.premium4K,
    },
    photoCircle: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: C.neutral[200],
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
    },
    cameraBadge: {
        position: 'absolute', bottom: 0, right: 0,
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: C.primary[600],
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 2, borderColor: '#FFF',
    },
});