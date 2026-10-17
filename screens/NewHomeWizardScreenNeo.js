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
import { tx } from '../utils/txFixo';
import { useState, useCallback, useRef, useMemo } from "react";
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
    const { residenceId, initialPhase } = route.params || {};
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [isOnboarding, setIsOnboarding] = useState(false);

    // Navigation state — ordem invertida (D2): ONDE_TIPO → ONDE_AMBIENTES → QUEM
    // initialPhase via route.params permite ao Hub "Seu mapa sensível" abrir
    // direto na phase desejada (Tipo & estrutura → 0, Ambientes → 1, Quem → 2).
    const initial = Number.isInteger(initialPhase) && initialPhase >= 0 && initialPhase < 3
        ? initialPhase
        : 0;
    const [phase, setPhase] = useState(initial); // 0=P1_TIPO, 1=P2_AMBIENTES, 2=P3_QUEM
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

    // Vínculo do NOVO perfil com cada residência já existente (Morador Fixo /
    // Visitante / Não Frequenta por residência) — permite cadastrar alguém
    // sem precisar trocar a residência ativa antes. Só aparece na UI (via
    // ResidenceLinksPicker) quando há mais de uma residência.
    const [residencesList, setResidencesList] = useState([]);
    const [residenceRelationships, setResidenceRelationships] = useState({});
    const activeResidenceIdRef = useRef(null);

    const buildDefaultResidenceRelationships = (list) => {
        const rel = {};
        (list || []).forEach(r => {
            rel[r.id] = r.id === activeResidenceIdRef.current ? 'morador' : 'nenhum';
        });
        return rel;
    };

    // ONDE state
    const [residenceName, setResidenceName] = useState('');
    // IDs de mapping fora da taxonomia canônica — preservados, não editáveis aqui.
    const [legacyMapping, setLegacyMapping] = useState([]);
    const [houseType, setHouseType] = useState('casa');
    const [floors, setFloors] = useState(1);
    const [externalAreas, setExternalAreas] = useState([]);
    const [internalRooms, setInternalRooms] = useState([]);

    // IDs dos perfis vinculados à residência ATIVA — alimenta checkbox
    // "mora aqui?" no QuemListStep. Recarrega ao salvar/togglar.
    const [linkedIds, setLinkedIds] = useState([]);
    const [habitanteIds, setHabitanteIds] = useState([]);

    useFocusEffect(useCallback(() => {
        loadData();
    }, [residenceId]));

    // Recalcula linkedIds e habitanteIds a partir do estado salvo da residência ativa.
    // Chamado no loadData + após cada toggle/save.
    const reloadLinkedIds = async () => {
        try {
            const data = await ProfileService.getData();
            const activeId = await ProfileService.getActiveResidenceId();
            const activeRes = (data.residences || []).find(r => r.id === activeId);

            const linked = [];
            const habitantes = [];

            if (activeRes?.moradia) {
                const hab = activeRes.moradia.habitantes || [];
                const freq = activeRes.moradia.frequentadores || [];

                hab.forEach(id => {
                    linked.push(id);
                    habitantes.push(id);
                });
                freq.forEach(id => {
                    if (!linked.includes(id)) linked.push(id);
                });
            }
            setLinkedIds(linked);
            setHabitanteIds(habitantes);
        } catch (_) { /* silent */ }
    };

    const handleChangeVinculo = async (perfilId, novoVinculo) => {
        try {
            await ProfileService.setProfileResidenceRelationship(perfilId, novoVinculo);
            await reloadLinkedIds();
        } catch (e) {
            if (__DEV__) console.warn('[handleChangeVinculo]', e);
        }
    };

    const loadData = async () => {
        if (residenceId) await ProfileService.setActiveResidence(residenceId);
        const completed = await ProfileService.isOnboardingCompleto();
        setIsOnboarding(!completed);

        const all = await ProfileService.getAllPerfis();
        setProfiles(all || []);
        await reloadLinkedIds();
        const moradia = await ProfileService.getMoradia();
        if (moradia?.tipoImovel) setHouseType(moradia.tipoImovel);
        if (Number.isInteger(moradia?.andares)) setFloors(moradia.andares);

        // `mapping` é um array plano de IDs. Ele precisa voltar separado nas
        // duas listas que o briefing edita, senão a próxima gravação embaralha
        // as categorias: finishWizard salva [...externalAreas, ...internalRooms]
        // e, antes disto, externalAreas nunca era restaurado — toda edição
        // perdia as áreas externas já declaradas.
        //
        // IDs que não pertencem a nenhuma das duas listas canônicas de
        // data/onboarding_data.js vêm da tela de mapeamento antiga (proteções,
        // riscos pontuais) ou de vocabulários divergentes ainda não migrados.
        // Guardamos em legacyMapping e devolvemos intactos na gravação: corrigir
        // o embaralhamento não pode destruir dado que ainda não foi migrado.
        const mapping = await ProfileService.getMapping();
        if (Array.isArray(mapping) && mapping.length > 0) {
            const externalIds = new Set(EXTERNAL_AREAS.map(a => a.id));
            const internalIds = new Set(INTERNAL_ROOMS.flatMap(cat => cat.items.map(i => i.id)));

            setExternalAreas(mapping.filter(id => externalIds.has(id)));
            setInternalRooms(mapping.filter(id => internalIds.has(id)));

            const desconhecidos = mapping.filter(id => !externalIds.has(id) && !internalIds.has(id));
            setLegacyMapping(desconhecidos);
            if (__DEV__ && desconhecidos.length > 0) {
                console.warn('[NewHomeWizard] IDs fora da taxonomia canônica, preservados sem edição:', desconhecidos.join(', '));
            }
        }

        const activeRes = await ProfileService.getActiveResidence();
        if (activeRes) setResidenceName(activeRes.nome || '');

        // Mesma regra de default de AddPerfilScreenNeo: novo perfil nasce
        // "Morador Fixo" só na residência ativa, "Não Frequenta" nas demais.
        const residences = await ProfileService.getResidences();
        setResidencesList(residences || []);
        activeResidenceIdRef.current = activeRes?.id || null;
        setResidenceRelationships(buildDefaultResidenceRelationships(residences));

        // Restaura draft do wizard, se existir, e abre na phase salva.
        // Só roda uma vez por sessão pra não atropelar mudanças do usuário.
        if (!draftRestored) {
            try {
                const draft = await BriefingDraftService.load();
                if (draft && draft.residenceId === residenceId) {
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
        residenceId,
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
                tx('telas.NewHomeWizardScreenNeo.voceVoltaDeOndeParouPelo', 'Você volta de onde parou pelo menu "Seu mapa sensível".'),
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
        setResidenceRelationships(buildDefaultResidenceRelationships(residencesList));
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

    // Toggle "fulano mora aqui?" — vincula/desvincula da residência ATIVA
    // sem deletar o perfil global. Atualiza linkedIds em seguida.
    const handleToggleLink = async (perfilId, currentlyLinked) => {
        try {
            if (currentlyLinked) {
                await ProfileService.unlinkProfileFromActiveResidence(perfilId);
            } else {
                await ProfileService.linkProfileToActiveResidence(perfilId);
            }
            await reloadLinkedIds();
        } catch (e) {
            if (__DEV__) console.warn('[handleToggleLink]', e);
        }
    };

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
            return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.permissaoNecessaria', 'Permissão Necessária'), tx('telas.NewHomeWizardScreenNeo.precisamosDeAcessoAGaleriaPra', 'Precisamos de acesso à galeria pra escolher a foto.'));
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
        if (!formName.trim()) return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.atencao', 'Atenção'), 'Falta o nome.');
        if (formDOB && ProfileService.calcularIdade(formDOB) === null) {
            return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.atencao2', 'Atenção'), tx('telas.NewHomeWizardScreenNeo.dataDeNascimentoInvalida', 'Data de nascimento inválida.'));
        }
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
            // Aplica o vínculo escolhido por residência (default: só a ativa) —
            // mesmo caminho que AddPerfilScreenNeo usa, via ResidenceLinksPicker.
            for (const [resId, rel] of Object.entries(residenceRelationships)) {
                await ProfileService.setProfileResidenceRelationship(perfil.id, rel, resId);
            }
            const all = await ProfileService.getAllPerfis();
            setProfiles(all || []);
            await reloadLinkedIds();
            resetForm();
            setSubView('list');
        }
    };

    const savePetProfile = async () => {
        if (!formName.trim()) return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.atencao3', 'Atenção'), tx('telas.NewHomeWizardScreenNeo.informeONomeDoPet', 'Informe o nome do pet.'));
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
            for (const [resId, rel] of Object.entries(residenceRelationships)) {
                await ProfileService.setProfileResidenceRelationship(perfil.id, rel, resId);
            }
            const all = await ProfileService.getAllPerfis();
            setProfiles(all || []);
            await reloadLinkedIds();
            resetForm();
            setSubView('list');
        }
    };

    const removeProfile = async (id) => {
        NeoAlert.alert('Apagar?', tx('telas.NewHomeWizardScreenNeo.estePerfilSaiDoMapeamento', 'Este perfil sai do mapeamento.'), [
            { text: tx('telas.NewHomeWizardScreenNeo.cancelar', 'Cancelar'), style: 'cancel' },
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
            if (!houseType) return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.atencao4', 'Atenção'), tx('telas.NewHomeWizardScreenNeo.escolheOTipoDeMoradiaPra', 'Escolhe o tipo de moradia pra seguir.'));
            animateTo(1, 'list');
        } else if (phase === 1) {
            const total = (externalAreas?.length || 0) + (internalRooms?.length || 0);
            if (total === 0) return NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.atencao5', 'Atenção'), tx('telas.NewHomeWizardScreenNeo.marcaPeloMenos1AmbienteVai', 'Marca pelo menos 1 ambiente. Vai te ajudar depois.'));
            animateTo(2, 'list');
        } else {
            // phase === 2 (QUEM): exige pelo menos 1 perfil VINCULADO à residência atual
            // (não basta existir global — precisa morar/frequentar aqui pra fazer sentido).
            if (linkedIds.length === 0) {
                return NeoAlert.alert(
                    tx('telas.NewHomeWizardScreenNeo.atencao6', 'Atenção'),
                    tx('telas.NewHomeWizardScreenNeo.marcaQuemMoraOuFrequentaEsta', 'Marca quem mora ou frequenta esta residência pra concluir.')
                );
            }
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
            const allMapping = [...externalAreas, ...internalRooms, ...legacyMapping];
            const activeRes = await ProfileService.getActiveResidence();
            if (activeRes && residenceName.trim()) {
                await ProfileService.updateResidenceName(activeRes.id, residenceName.trim());
            }
            await ProfileService.saveMoradia({
                tipoImovel: houseType,
                andares: floors,
                areasExternas: externalAreas,
            });
            await ProfileService.saveMapping(allMapping);
            if (isOnboarding) {
                const humans = profiles.filter(p => p.tipo !== 'pet' && !p.pendente);
                if (humans.length > 0) await ProfileService.setActivePerfil(humans[0].id);
                await ProfileService.setOnboardingCompleto();
            }
            // Briefing concluído → limpa o draft pra não restaurar de novo
            await BriefingDraftService.clear();

            const title = isOnboarding ? 'Pronto!' : 'Mapeamento concluído!';
            const message = isOnboarding
                ? 'Seu mapa sensível está vivo. A partir daqui, é a gente cuidando junto.'
                : 'Esta residência foi configurada com sucesso.';

            NeoAlert.alert(title, message, [
                { text: 'Acessar painel', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] }) }
            ]);
        } catch (e) {
            NeoAlert.alert(tx('telas.NewHomeWizardScreenNeo.erro', 'Erro'), tx('telas.NewHomeWizardScreenNeo.naoDeuPraSalvarAgoraToca', 'Não deu pra salvar agora. Toca em "Continuar depois" e tenta de novo.'));
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
                    residenceName={residenceName} setResidenceName={setResidenceName}
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
                residencesList={residencesList}
                residenceRelationships={residenceRelationships}
                onChangeResidenceRelationship={(resId, key) => setResidenceRelationships(prev => ({ ...prev, [resId]: key }))}
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
                residencesList={residencesList}
                residenceRelationships={residenceRelationships}
                onChangeResidenceRelationship={(resId, key) => setResidenceRelationships(prev => ({ ...prev, [resId]: key }))}
            />
        );
        return (
            <QuemListStep
                profiles={profiles}
                linkedIds={linkedIds}
                habitanteIds={habitanteIds}
                onAddHuman={() => openProfileForm('human')}
                onAddPet={() => openProfileForm('pet')}
                onRemove={removeProfile}
                onToggleLink={handleToggleLink}
                onChangeVinculo={handleChangeVinculo}
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
                        accessibilityLabel={tx('telas.NewHomeWizardScreenNeo.continuarDepois', 'Continuar depois')}
                    >
                        <Text style={{ color: C.primary[700], fontSize: 12, fontWeight: '700' }}>{tx('telas.NewHomeWizardScreenNeo.continuarDepois2', 'Continuar depois')}</Text>
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
                                {phase === 0 && tx('telas.NewHomeWizardScreenNeo.proximoAmbientes', 'Próximo: ambientes')}
                                {phase === 1 && tx('telas.NewHomeWizardScreenNeo.proximoQuemMora', 'Próximo: quem mora')}
                                {phase === 2 && (isOnboarding ? tx('telas.NewHomeWizardScreenNeo.concluirMapaSensivel', 'Concluir mapa sensível') : tx('telas.NewHomeWizardScreenNeo.concluirMapeamento', 'Concluir mapeamento'))}
                            </Body>
                            <NeoIcon name={phase === 2 ? 'tick-square' : 'arrow-right'} size={22} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </AppBackground>
    );
}
