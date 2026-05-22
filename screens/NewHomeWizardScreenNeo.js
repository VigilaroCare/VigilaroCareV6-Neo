/**
 * NewHomeWizardScreenNeo.js
 * Wizard do "seu mapa sensível" — briefing vivo (B++).
 *
 * ORDEM (D2): ONDE primeiro, QUEM depois. 3 phases visíveis ao usuário:
 *   phase 0 — P1_TipoMoradia (tipo + andares)
 *   phase 1 — Onde (ambientes externos + internos)
 *   phase 2 — Quem (humanos + pets)
 *
 * Cada passo abre com narrativa Agnaldo via NarrativeHeader.
 * "Continuar depois" no header salva o draft via BriefingDraftService
 * e fecha o wizard sem perder estado.
 */
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Animated, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../components/NeoIcon';
import { DS } from '../utils/DesignSystem2026';
import ProfileService from '../services/ProfileService';
import BriefingDraftService from '../services/BriefingDraftService';
import { Body, Caption } from '../components/NeoTypography';
import AppBackground from '../components/AppBackground';
import { getDefaultProfile } from '../services/ProfileModels';

import QuemListStep from './NewHomeWizard/QuemListStep';
import HumanFormStep from './NewHomeWizard/HumanFormStep';
import PetFormStep from './NewHomeWizard/PetFormStep';
import P1_TipoMoradiaStep from './NewHomeWizard/P1_TipoMoradiaStep';
import OndeStep from './NewHomeWizard/OndeStep';
import { ss } from './NewHomeWizard/styles';
import NeoAlert from '../utils/NeoAlert';
import { EXTERNAL_AREAS, INTERNAL_ROOMS } from '../data/onboarding_data';

const C = DS.colors;
const TOTAL_PHASES = 3;

export default function NewHomeWizardScreenNeo({ navigation, route }) {
    const { residenceId } = route.params || {};
    const fadeAnim = useRef(new Animated.Value(1)).current;

    // Navigation state — ordem invertida (D2): ONDE_TIPO → ONDE_AMBIENTES → QUEM
    const [phase, setPhase] = useState(0); // 0=P1_TIPO, 1=P2_AMBIENTES, 2=P3_QUEM
    const [subView, setSubView] = useState('list'); // list | form_human | form_pet
    const [draftRestored, setDraftRestored] = useState(false);

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

    // Vínculo Morador/Pet ↔ Cômodo (compartilhado entre human e pet form)
    const [formComodos, setFormComodos] = useState([]);

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

        // Restaura draft do wizard, se existir, e abre na phase salva.
        // Só roda uma vez por sessão pra não atropelar mudanças do usuário.
        if (!draftRestored) {
            try {
                const draft = await BriefingDraftService.load();
                if (draft) {
                    if (Number.isInteger(draft.phase)) setPhase(Math.min(draft.phase, TOTAL_PHASES - 1));
                    if (draft.houseType) setHouseType(draft.houseType);
                    if (Number.isInteger(draft.floors)) setFloors(draft.floors);
                    if (Array.isArray(draft.externalAreas)) setExternalAreas(draft.externalAreas);
                    if (Array.isArray(draft.internalRooms)) setInternalRooms(draft.internalRooms);
                }
            } catch (_) { /* silent */ }
            setDraftRestored(true);
        }
    };

    // Helper: monta snapshot atual do estado pra persistir como draft.
    const buildDraft = () => ({
        phase,
        houseType,
        floors,
        externalAreas,
        internalRooms,
    });

    // "Continuar depois" — salva draft, mostra confirmação leve, fecha wizard.
    const handleContinueLater = async () => {
        try {
            await BriefingDraftService.save(buildDraft());
            NeoAlert.alert(
                'Guardado',
                'Você volta de onde parou pelo menu "Seu mapa sensível".',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (_) {
            navigation.goBack();
        }
    };

    const resetForm = () => {
        setFormName(''); setFormDOB(''); setFormGender('');
        setFormBond('morador'); setFormConditions([]);
        setFormSpecies(''); setFormSize(''); setFormPhoto(null);
        setFormPetAge('1'); setFormPetConditions([]);
        setFormComodos([]);
    };

    // Lista de cômodos disponíveis pra vincular ao perfil — derivada dos
    // ambientes selecionados em P1+P2 (externalAreas + internalRooms).
    // Cada item: { id, label }
    const availableRooms = useMemo(() => {
        const list = [];
        (externalAreas || []).forEach(id => {
            const ext = EXTERNAL_AREAS.find(e => e.id === id);
            if (ext) list.push({ id, label: ext.label });
        });
        (internalRooms || []).forEach(id => {
            for (const cat of INTERNAL_ROOMS) {
                const room = cat.items.find(i => i.id === id);
                if (room) { list.push({ id, label: room.label }); break; }
            }
        });
        return list;
    }, [externalAreas, internalRooms]);

    // Abre formulário de pessoa/pet — reseta campos e pré-seleciona
    // TODOS os cômodos da casa (padrão amigável: usuário desmarca o que
    // a pessoa/pet não usa, em vez de marcar do zero).
    const openProfileForm = (type) => {
        resetForm();
        setFormComodos(availableRooms.map(r => r.id));
        animateTo(undefined, type === 'pet' ? 'form_pet' : 'form_human');
    };

    const pickPhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return NeoAlert.alert('Permissão Necessária', 'Precisamos de acesso à galeria pra escolher a foto.');
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
        if (!formName.trim()) return NeoAlert.alert('Atenção', 'Informe o nome.');
        let fotoSalva = null;
        if (formPhoto) fotoSalva = await ProfileService.persistImage(formPhoto, 'profile');
        const perfil = await ProfileService.addPerfil({
            nome: formName.trim(),
            dataNascimento: formDOB,
            genero: formGender,
            vinculo: formBond === 'visitante' ? 'frequentador' : 'habitante',
            necessidadesEspeciais: formConditions,
            foto: fotoSalva,
            // Vínculo Morador↔Cômodo (D1 + D3): alimenta o Interpreter
            comodosUsados: Array.isArray(formComodos) ? formComodos : [],
        }, 'humano');
        if (perfil) {
            const all = await ProfileService.getAllPerfis();
            setProfiles(all || []);
            resetForm();
            setSubView('list');
        }
    };

    const savePetProfile = async () => {
        if (!formName.trim()) return NeoAlert.alert('Atenção', 'Informe o nome do pet.');
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
        // Vínculo Pet↔Cômodo (D1 + D3)
        p.comodosUsados = Array.isArray(formComodos) ? formComodos : [];
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
        NeoAlert.alert('Apagar?', 'Este perfil sai do mapeamento.', [
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
        // P1 → P2 → P3 (QUEM). Forms internos do P3 bloqueiam o "Avançar".
        if (phase === 2 && subView !== 'list') return;

        if (phase === 0) {
            if (!houseType) return NeoAlert.alert('Atenção', 'Escolhe o tipo de moradia pra seguir.');
            animateTo(1, 'list');
        } else if (phase === 1) {
            const total = (externalAreas?.length || 0) + (internalRooms?.length || 0);
            if (total === 0) return NeoAlert.alert('Atenção', 'Marca pelo menos 1 ambiente. Vai te ajudar depois.');
            animateTo(2, 'list');
        } else {
            // phase === 2 (QUEM): exige pelo menos 1 morador
            if (profiles.length === 0) return NeoAlert.alert('Atenção', 'Adiciona ao menos 1 morador pra concluir.');
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
            // Briefing concluído → limpa o draft pra não restaurar de novo
            await BriefingDraftService.clear();
            NeoAlert.alert('Pronto!', 'Seu mapa sensível está vivo. A partir daqui, é a gente cuidando junto.', [
                { text: 'Acessar painel', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) }
            ]);
        } catch (e) {
            NeoAlert.alert('Erro', 'Não deu pra salvar agora. Toca em "Continuar depois" e tenta de novo.');
        }
    };

    // === RENDER ===
    // phase 0 → P1 (tipo + andares)
    // phase 1 → P2 (ambientes)
    // phase 2 → P3 QUEM (humanos + pets, com subView interno)
    const renderContent = () => {
        if (phase === 0) {
            return (
                <P1_TipoMoradiaStep
                    houseType={houseType} setHouseType={setHouseType}
                    floors={floors} setFloors={setFloors}
                />
            );
        }
        if (phase === 1) {
            return (
                <OndeStep
                    externalAreas={externalAreas} setExternalAreas={setExternalAreas}
                    internalRooms={internalRooms} setInternalRooms={setInternalRooms}
                    onToggleArray={toggleArray}
                />
            );
        }
        // phase === 2 — QUEM
        if (subView === 'form_human') return (
            <HumanFormStep
                formName={formName} setFormName={setFormName}
                formDOB={formDOB} setFormDOB={setFormDOB}
                formGender={formGender} setFormGender={setFormGender}
                formBond={formBond} setFormBond={setFormBond}
                formConditions={formConditions} setFormConditions={setFormConditions}
                formComodos={formComodos} setFormComodos={setFormComodos}
                availableRooms={availableRooms}
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
                formComodos={formComodos} setFormComodos={setFormComodos}
                availableRooms={availableRooms}
                formPhoto={formPhoto}
                onPickPhoto={pickPhoto}
                onSave={savePetProfile}
                onToggleArray={toggleArray}
            />
        );
        return (
            <QuemListStep
                profiles={profiles}
                onAddHuman={() => openProfileForm('human')}
                onAddPet={() => openProfileForm('pet')}
                onRemove={removeProfile}
            />
        );
    };

    // Footer aparece sempre que não estamos num form interno do passo QUEM.
    // Em P1 e P2 (ONDE) sempre aparece, em P3 (QUEM) some quando o usuário
    // está preenchendo perfil de humano/pet.
    const showFooter = phase < 2 || subView === 'list';

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Header — back + progress + "Continuar depois" */}
                <View style={ss.header}>
                    <TouchableOpacity onPress={handleBack} style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' }} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <NeoIcon name={phase === 0 && subView === 'list' ? 'CloseSquare' : 'ArrowLeft2'} size={22} color={C.neutral[800]} />
                    </TouchableOpacity>
                    <View style={ss.progressBar}>
                        <View style={[ss.progressFill, { width: `${((phase + 1) / TOTAL_PHASES) * 100}%` }]} />
                    </View>
                    <Caption style={{ color: C.neutral[500], marginLeft: 12, marginRight: 8 }}>{phase + 1}/{TOTAL_PHASES}</Caption>
                    <TouchableOpacity
                        onPress={handleContinueLater}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        accessibilityRole="button"
                        accessibilityLabel="Continuar depois"
                    >
                        <Text style={{ color: C.primary[700], fontSize: 12, fontWeight: '700' }}>Continuar depois</Text>
                    </TouchableOpacity>
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
                                {phase === 0 && 'Próximo: ambientes'}
                                {phase === 1 && 'Próximo: quem mora'}
                                {phase === 2 && 'Concluir mapa sensível'}
                            </Body>
                            <NeoIcon name={phase === 2 ? 'tick-square' : 'arrow-right'} size={22} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </AppBackground>
    );
}
