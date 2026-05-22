/**
 * NewHomeWizardScreenNeo.js
 * Wizard de cadastro de residência (QUEM + ONDE).
 *
 * Refatorado em 2026-05-22: lógica de orquestração aqui, passos
 * extraídos pra screens/NewHomeWizard/{QuemListStep, HumanFormStep,
 * PetFormStep, OndeStep}.js + components/styles compartilhados.
 */
import React, { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { DS } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import { Body, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { getDefaultProfile } from '../services/ProfileModels';

import QuemListStep from './NewHomeWizard/QuemListStep';
import HumanFormStep from './NewHomeWizard/HumanFormStep';
import PetFormStep from './NewHomeWizard/PetFormStep';
import OndeStep from './NewHomeWizard/OndeStep';
import { ss } from './NewHomeWizard/styles';

const C = DS.colors;

export default function NewHomeWizardScreenNeo({ navigation, route }) {
    const { residenceId } = route.params || {};
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Navigation state
    const [phase, setPhase] = useState(0); // 0=QUEM, 1=ONDE
    const [subView, setSubView] = useState('list'); // list | form_human | form_pet

    // QUEM state — humanos
    const [profiles, setProfiles] = useState([]);
    const [formName, setFormName] = useState('');
    const [formDOB, setFormDOB] = useState('');
    const [formGender, setFormGender] = useState('');
    const [formBond, setFormBond] = useState('morador');
    const [formConditions, setFormConditions] = useState([]);
    const [formPhoto, setFormPhoto] = useState(null);

    // QUEM state — pets
    const [formSpecies, setFormSpecies] = useState('');
    const [formSize, setFormSize] = useState('');
    const [formPetAge, setFormPetAge] = useState('1');
    const [formPetConditions, setFormPetConditions] = useState([]);

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
            return Alert.alert('Permissão Necessária', 'Precisamos de acesso à galeria pra escolher a foto.');
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
        if (formPhoto) fotoSalva = await ProfileService.persistImage(formPhoto, 'profile');
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
        if (formPhoto) fotoSalva = await ProfileService.persistImage(formPhoto, 'pet');
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
        Alert.alert('Apagar?', 'Este perfil sai do mapeamento.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Apagar', style: 'destructive', onPress: async () => {
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
        if (phase === 0 && subView !== 'list') return;
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
            Alert.alert('Pronto!', 'Sua matriz de proteção está ativa.', [
                { text: 'Acessar Cockpit', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) }
            ]);
        } catch (e) {
            Alert.alert('Erro', 'Não deu pra salvar.');
        }
    };

    // === RENDER ===
    const renderContent = () => {
        if (phase === 0) {
            if (subView === 'form_human') return (
                <HumanFormStep
                    formName={formName} setFormName={setFormName}
                    formDOB={formDOB} setFormDOB={setFormDOB}
                    formGender={formGender} setFormGender={setFormGender}
                    formBond={formBond} setFormBond={setFormBond}
                    formConditions={formConditions} setFormConditions={setFormConditions}
                    formPhoto={formPhoto}
                    onPickPhoto={pickPhoto}
                    onSave={saveHumanProfile}
                    onToggleArray={toggleArray}
                />
            );
            if (subView === 'form_pet') return (
                <PetFormStep
                    formName={formName} setFormName={setFormName}
                    formSpecies={formSpecies} setFormSpecies={setFormSpecies}
                    formSize={formSize} setFormSize={setFormSize}
                    formPetAge={formPetAge} setFormPetAge={setFormPetAge}
                    formPetConditions={formPetConditions} setFormPetConditions={setFormPetConditions}
                    formPhoto={formPhoto}
                    onPickPhoto={pickPhoto}
                    onSave={savePetProfile}
                    onToggleArray={toggleArray}
                />
            );
            return (
                <QuemListStep
                    profiles={profiles}
                    onAddHuman={() => { resetForm(); animateTo(undefined, 'form_human'); }}
                    onAddPet={() => { resetForm(); animateTo(undefined, 'form_pet'); }}
                    onRemove={removeProfile}
                />
            );
        }
        return (
            <OndeStep
                houseType={houseType} setHouseType={setHouseType}
                floors={floors} setFloors={setFloors}
                externalAreas={externalAreas} setExternalAreas={setExternalAreas}
                internalRooms={internalRooms} setInternalRooms={setInternalRooms}
                onToggleArray={toggleArray}
            />
        );
    };

    const showFooter = subView === 'list';

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
