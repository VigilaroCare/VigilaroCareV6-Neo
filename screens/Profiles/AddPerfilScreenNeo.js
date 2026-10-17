import { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileService from '../../services/ProfileService';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import NeoIcon from '../../components/NeoIcon';
import ResidenceLinksPicker from '../../components/ResidenceLinksPicker';

// Neo Design
import { Neo } from "../../utils/Theme";
import NeoCard from '../../components/NeoCard';
import { H3, Body, Small, Caption } from "../../components/NeoTypography";
import { useTranslation } from 'react-i18next';
import AppBackground from '../../components/AppBackground';
import NeoAlert from '../../utils/NeoAlert';

// Importações de dados e filtros para comodosUsados
import { AMBIENTES } from '../../data/mapeamento_dados';
import { MAPPING_TRIGGERS, getDynamicAreaName } from '../../utils/ProfileFilterEngine';

// Componente Accordion externo para evitar reconstrução e perda de foco/inputs instáveis
const AccordionSection = ({ sectionKey, title, icon, children, isExpanded, onToggle }) => {
    return (
        <NeoCard variant="elevated" style={styles.accordionCard}>
            <TouchableOpacity
                onPress={() => onToggle(sectionKey)}
                style={styles.accordionHeader}
                activeOpacity={0.7}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={styles.accordionIconWrap}>
                        <NeoIcon name={icon} size={20} color={Neo.colors.primary[600]} />
                    </View>
                    <H3 style={{ fontWeight: '800', color: Neo.colors.neutral[900] }}>{title}</H3>
                </View>
                <NeoIcon name={isExpanded ? 'ArrowUp2' : 'ArrowDown2'} size={18} color={Neo.colors.neutral[500]} />
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.accordionContent}>
                    <View style={styles.divider} />
                    {children}
                </View>
            )}
        </NeoCard>
    );
};

// Definições Estáticas Completas
const ACCESSIBILITY_NEEDS = [
    { id: 'visual', label: 'Deficiência Visual' },
    { id: 'hearing', label: 'Deficiência Auditiva' },
    { id: 'mobility', label: 'Dificuldade de Locomoção' },
    { id: 'cognitive', label: 'Condição Cognitiva' },
    { id: 'speech', label: 'Dificuldade de Fala' },
    { id: 'chronic_pain', label: 'Dor Crônica' },
    { id: 'balance', label: 'Desequilíbrio/Vertigem' },
    { id: 'fine_motor', label: 'Habilidades Motoras Finas' }
];

const MEDICAL_CONDITIONS = [
    { id: 'anxiety', label: 'Ansiedade' },
    { id: 'copd', label: 'DPOC' },
    { id: 'kidney', label: 'Doença Renal' },
    { id: 'liver', label: 'Doença Hepática' },
    { id: 'thyroid', label: 'Distúrbio da Tireoide' },
    { id: 'osteoporosis', label: 'Osteoporose' },
    { id: 'cancer', label: 'Câncer' },
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hipertensão' },
    { id: 'heart', label: 'Doença Cardíaca' },
    { id: 'asthma', label: 'Asma' },
    { id: 'epilepsy', label: 'Epilepsia' },
    { id: 'arthritis', label: 'Artrite' },
    { id: 'stroke', label: 'Histórico de AVC' },
    { id: 'blood_clot', label: 'Distúrbio de Coagulação' },
    { id: 'autoimmune', label: 'Doença Autoimune' },
    { id: 'chronic_pain', label: 'Dor Crônica' },
    { id: 'sleep_apnea', label: 'Apneia do Sono' },
    { id: 'migraine', label: 'Enxaqueca' }
];

const ALLERGY_CATEGORIES = [
    {
        title: 'Alimentos',
        icon: '🍴',
        items: [
            { id: 'peanuts', label: 'Amendoim' },
            { id: 'tree_nuts', label: 'Nozes / Castanhas' },
            { id: 'milk', label: 'Leite / Laticínios' },
            { id: 'eggs', label: 'Ovos' },
            { id: 'shellfish', label: 'Frutos do Mar' },
            { id: 'fish', label: 'Peixe' },
            { id: 'soy', label: 'Soja' },
            { id: 'gluten', label: 'Trigo / Glúten' }
        ]
    },
    {
        title: 'Medicamentos',
        icon: '💊',
        items: [
            { id: 'penicillin', label: 'Penicilina' },
            { id: 'aspirin', label: 'Aspirina' },
            { id: 'ibuprofen', label: 'Ibuprofeno' },
            { id: 'codeine', label: 'Codeína' }
        ]
    },
    {
        title: 'Ambiental',
        icon: '🌱',
        items: [
            { id: 'pollen', label: 'Pólen' },
            { id: 'mites', label: 'Ácaros' },
            { id: 'pet_dander', label: 'Pelos de Animais' },
            { id: 'mold', label: 'Mofo / Bolor' }
        ]
    },
    {
        title: 'Contato',
        icon: '🔒',
        items: [
            { id: 'latex', label: 'Látex' },
            { id: 'nickel', label: 'Níquel' }
        ]
    },
    {
        title: 'Insetos',
        icon: '🐝',
        items: [
            { id: 'bee_stings', label: 'Picada de Abelha' },
            { id: 'wasp_stings', label: 'Picada de Vespa' }
        ]
    }
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const PET_CONDITIONS = [
    { id: 'mobilidade_reduzida', label: 'Mobilidade Reduzida / Artrose' },
    { id: 'visao_reduzida', label: 'Visão Reduzida / Cegueira' },
    { id: 'audicao_reduzida', label: 'Audição Reduzida / Surdez' },
    { id: 'disfuncao_cognitiva', label: 'Condição Neurológica / Cognitiva' }
];

export default function AddPerfilScreenNeo({ navigation, route }) {
    const { t } = useTranslation();

    const editingProfile = route.params?.profile || route.params?.perfil || null;
    const initialType = route.params?.type || (editingProfile?.tipo === 'pet' ? 'pet' : 'humano');

    const normalizeGenero = (g) => {
        if (!g) return 'Masculino';
        const lower = String(g).toLowerCase();
        if (lower === 'masculino' || lower === 'macho' || lower === 'm') return 'Masculino';
        if (lower === 'feminino' || lower === 'femea' || lower === 'fêmea' || lower === 'f') return 'Feminino';
        return g;
    };

    // States básicos
    const [tipo, setTipo] = useState(initialType);
    const [nome, setNome] = useState(editingProfile?.pendente ? '' : (editingProfile?.nome || ''));
    const [genero, setGenero] = useState(normalizeGenero(editingProfile?.genero));
    const [foto, setFoto] = useState(
        editingProfile?.foto ? ProfileService.resolveImageUri(editingProfile.foto) : null
    );

    // Data de Nascimento
    const parseDOB = (val) => {
        if (!val) return null;
        if (typeof val === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
            const [d, m, y] = val.split('/');
            const dt = new Date(`${y}-${m}-${d}`);
            return Number.isNaN(dt.getTime()) ? null : dt;
        }
        const dt = new Date(val);
        return Number.isNaN(dt.getTime()) ? null : dt;
    };

    const _parsedDOB = parseDOB(editingProfile?.dataNascimento);
    const [dia, setDia] = useState(_parsedDOB ? _parsedDOB.getDate().toString().padStart(2, '0') : '');
    const [mes, setMes] = useState(_parsedDOB ? (_parsedDOB.getMonth() + 1).toString().padStart(2, '0') : '');
    const [ano, setAno] = useState(_parsedDOB ? _parsedDOB.getFullYear().toString() : '');
    const [dataNascimento, setDataNascimento] = useState(_parsedDOB);

    const diaRef = useRef(null);
    const mesRef = useRef(null);
    const anoRef = useRef(null);

    // Accordions state (independente por seção)
    const [expanded, setExpanded] = useState({
        personal: true,
        medical: false,
        allergies: false,
        medications: false,
        contacts: false,
    });

    const toggleAccordion = (key) => {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Estado das Listas Estruturadas (Acessibilidade, Condições, Alergias)
    const [necessidadesEspeciais, setNecessidadesEspeciais] = useState([]);
    const [condicoes, setCondicoes] = useState([]);
    const [alergias, setAlergias] = useState([]);
    const [tipoSanguineo, setTipoSanguineo] = useState('');
    const [medicamentosEmUso, setMedicamentosEmUso] = useState([]);
    const [contatos, setContatos] = useState([]);

    // Cômodos frequentados (Briefing Vivo)
    const [availableRooms, setAvailableRooms] = useState([]);
    const [comodosUsados, setComodosUsados] = useState([]);

    // Residências e vínculos
    const [residencesList, setResidencesList] = useState([]);
    const [residenceRelationships, setResidenceRelationships] = useState({});

    // Custom add states
    const [customCondition, setCustomCondition] = useState('');
    const [customAllergy, setCustomAllergy] = useState('');
    const [customMedication, setCustomMedication] = useState('');

    // Contacts add states
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');

    // Pet states
    const [especie, setEspecie] = useState(editingProfile?.especie || 'Cachorro');
    const [raca, setRaca] = useState(editingProfile?.infoPet?.raca || '');
    const [chip, setChip] = useState(editingProfile?.infoPet?.chip || '');
    const [castrado, setCastrado] = useState(editingProfile?.infoPet?.castrado || false);

    // Search condition state
    const [searchCondition, setSearchCondition] = useState('');

    // Efeito para carregar dados iniciais no modo edição
    useEffect(() => {
        if (editingProfile) {
            setNome(editingProfile.nome || '');
            setGenero(normalizeGenero(editingProfile.genero));
            setTipo(editingProfile.tipo || 'humano');
            if (editingProfile.foto) {
                setFoto(ProfileService.resolveImageUri(editingProfile.foto));
            }
            const d = parseDOB(editingProfile.dataNascimento);
            if (d) {
                setDia(d.getDate().toString().padStart(2, '0'));
                setMes((d.getMonth() + 1).toString().padStart(2, '0'));
                setAno(d.getFullYear().toString());
                setDataNascimento(d);
            } else {
                setDia(''); setMes(''); setAno(''); setDataNascimento(null);
            }

            // Carregamento de dados com compatibilidade retroativa (root level + saude.*)
            setTipoSanguineo(editingProfile.tipoSanguineo || editingProfile.saude?.tipoSanguineo || '');

            const loadedConds = editingProfile.condicoesMedicas || editingProfile.saude?.condicoes || [];
            setCondicoes(Array.isArray(loadedConds) ? loadedConds : []);

            const loadedAlergias = editingProfile.alergias || editingProfile.saude?.alergias || [];
            if (typeof loadedAlergias === 'string') {
                setAlergias(loadedAlergias.split(',').map(s => s.trim()).filter(Boolean));
            } else {
                setAlergias(Array.isArray(loadedAlergias) ? loadedAlergias : []);
            }

            const loadedAcc = editingProfile.necessidadesEspeciais || [];
            setNecessidadesEspeciais(Array.isArray(loadedAcc) ? loadedAcc : []);

            const loadedMeds = editingProfile.medicamentosEmUso || [];
            setMedicamentosEmUso(Array.isArray(loadedMeds) ? loadedMeds : []);

            const loadedComodos = editingProfile.comodosUsados || [];
            setComodosUsados(Array.isArray(loadedComodos) ? loadedComodos : []);

            setContatos(editingProfile.contatos || []);

            if (editingProfile.especie) setEspecie(editingProfile.especie);
            if (editingProfile.infoPet) {
                setRaca(editingProfile.infoPet.raca || '');
                setChip(editingProfile.infoPet.chip || '');
                setCastrado(editingProfile.infoPet.castrado || false);
            }
        }
    }, [editingProfile]);

    // Efeito para carregar cômodos mapeados na residência ativa
    useEffect(() => {
        const loadMappedRooms = async () => {
            try {
                const mapping = await ProfileService.getMapping();
                const safeMapping = Array.isArray(mapping) ? mapping : [];
                
                // Filtra AMBIENTES com base no mapping atual da residência
                const mappedRooms = AMBIENTES.filter(room => {
                    const triggers = MAPPING_TRIGGERS[room.id] || [];
                    return safeMapping.includes(room.id) || triggers.some(t => safeMapping.includes(t));
                }).map(room => ({
                    // Ex: 'central_gas' vira "Botijão de Gás" ou "Gás Encanado"
                    // conforme o que a residência tem — mesma função que
                    // NewHomeWizardScreenNeo/ChecklistDetailScreen/OndeProtegerScreen
                    // já usam, aqui aplicada uma vez na origem em vez de no render.
                    ...room,
                    nome: getDynamicAreaName(room.id, room.nome, safeMapping, t),
                }));

                setAvailableRooms(mappedRooms);
                
                // Se for um novo perfil (não editando), pré-seleciona todos por padrão (estratégia conservadora)
                if (!editingProfile) {
                    setComodosUsados(mappedRooms.map(r => r.id));
                }
            } catch (err) {
                if (__DEV__) {
                    console.error('[AddPerfil] Erro ao carregar cômodos mapeados:', err);
                }
            }
        };
        loadMappedRooms();
    }, [editingProfile]);

    // Efeito para carregar todas as residências e calcular os vínculos do perfil
    useEffect(() => {
        const loadResidencesData = async () => {
            try {
                const list = await ProfileService.getResidences();
                const activeResidenceId = await ProfileService.getActiveResidenceId();
                setResidencesList(list || []);

                const relationships = {};
                const profileId = editingProfile?.id;

                list.forEach(res => {
                    const hab = res.moradia?.habitantes || [];
                    const freq = res.moradia?.frequentadores || [];

                    if (profileId && hab.includes(profileId)) {
                        relationships[res.id] = 'morador';
                    } else if (profileId && freq.includes(profileId)) {
                        relationships[res.id] = 'frequentador';
                    } else {
                        // Se for um perfil novo, ele padrão é 'morador' da residência ativa, e 'nenhum' das outras
                        if (!profileId) {
                            relationships[res.id] = res.id === activeResidenceId ? 'morador' : 'nenhum';
                        } else {
                            relationships[res.id] = 'nenhum';
                        }
                    }
                });

                // Garante que pelo menos um local tem vínculo ativo
                const hasActiveRelation = Object.values(relationships).some(r => r !== 'nenhum');
                if (!hasActiveRelation && list.length > 0) {
                    relationships[list[0].id] = 'morador';
                }

                setResidenceRelationships(relationships);
            } catch (err) {
                if (__DEV__) {
                    console.error('[AddPerfil] Erro ao carregar residências:', err);
                }
            }
        };
        loadResidencesData();
    }, [editingProfile]);

    // Validação da data em tempo real
    useEffect(() => {
        if (dia.length >= 1 && mes.length >= 1 && ano.length === 4) {
            const d = parseInt(dia, 10);
            const m = parseInt(mes, 10) - 1;
            const y = parseInt(ano, 10);
            if (d >= 1 && d <= 31 && m >= 0 && m <= 11 && y > 1900 && y <= new Date().getFullYear()) {
                const parsed = new Date(y, m, d);
                if (parsed.getDate() === d && parsed.getMonth() === m && parsed.getTime() <= Date.now()) {
                    setDataNascimento(parsed);
                }
            }
        }
    }, [dia, mes, ano]);

    // Cálculo dinâmico de completude
    const hasName = !!nome.trim();
    const hasAge = !!dia && !!mes && !!ano && ano.length === 4 && dataNascimento !== null;
    const hasGender = !!genero;
    const hasContact = contatos && contatos.length > 0;

    const progress = (hasName ? 25 : 0) + (hasAge ? 25 : 0) + (hasGender ? 25 : 0) + (hasContact ? 25 : 0);

    const handleDiaChange = (text) => {
        setDia(text);
        if (text.length === 2) mesRef.current?.focus();
    };
    const handleMesChange = (text) => {
        setMes(text);
        if (text.length === 2) anoRef.current?.focus();
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            NeoAlert.alert(t('addProfile.permRequired'), t('addProfile.galleryPerm'));
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
        }
    };

    const toggleArrayItem = (list, setList, item) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    // Adição de itens personalizados
    const addCustomConditionHandler = () => {
        if (customCondition.trim()) {
            const val = customCondition.trim();
            if (!condicoes.includes(val)) {
                setCondicoes([...condicoes, val]);
            }
            setCustomCondition('');
        }
    };

    const addCustomAllergyHandler = () => {
        if (customAllergy.trim()) {
            const val = customAllergy.trim();
            if (!alergias.includes(val)) {
                setAlergias([...alergias, val]);
            }
            setCustomAllergy('');
        }
    };

    const addCustomMedicationHandler = () => {
        if (customMedication.trim()) {
            const val = customMedication.trim();
            if (!medicamentosEmUso.includes(val)) {
                setMedicamentosEmUso([...medicamentosEmUso, val]);
            }
            setCustomMedication('');
        }
    };

    const handleSave = async () => {
        if (!nome.trim()) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.nameRequired'));
            return;
        }

        if (!dia || !mes || !ano || ano.length < 4) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.dateIncomplete'));
            return;
        }

        const dNum = parseInt(dia, 10);
        const mNum = parseInt(mes, 10);
        const yNum = parseInt(ano, 10);
        if (
            isNaN(dNum) || isNaN(mNum) || isNaN(yNum) ||
            dNum < 1 || dNum > 31 ||
            mNum < 1 || mNum > 12 ||
            yNum < 1900 || yNum > new Date().getFullYear()
        ) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.dateInvalid', 'Data de nascimento inválida.'));
            return;
        }

        if (!dataNascimento || isNaN(dataNascimento.getTime())) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.dateInvalid', 'Data de nascimento inválida.'));
            return;
        }

        try {
            const data = await ProfileService.getData();
            const activeId = data.activeResidenceId || 'default_home';
            const finalPhotoFile = await ProfileService.persistImage(foto, 'profile');

            // Salvando tanto no root-level (moderno) quanto em sub-objetos (legado) para retrocompatibilidade total
            const profileData = {
                id: editingProfile?.id || Date.now().toString(),
                nome,
                genero,
                tipo,
                dataNascimento: dataNascimento.toISOString(),
                foto: finalPhotoFile,
                vinculo: residenceRelationships[activeId] === 'frequentador' ? 'frequentador' : 'morador',
                pcd: tipo === 'humano' ? { isPcd: necessidadesEspeciais.length > 0, info: necessidadesEspeciais.join(', ') } : null,
                saude: {
                    tipoSanguineo: tipo === 'humano' ? tipoSanguineo : null,
                    condicoes: tipo === 'humano' ? condicoes : [],
                    alergias: alergias.join(', ')
                },
                tipoSanguineo: tipo === 'humano' ? tipoSanguineo : null,
                condicoesMedicas: tipo === 'humano' ? condicoes : [],
                alergias: tipo === 'humano' ? alergias : [],
                medicamentosEmUso: tipo === 'humano' ? medicamentosEmUso : [],
                necessidadesEspeciais: necessidadesEspeciais,
                comodosUsados: comodosUsados,
                infoPet: tipo === 'pet' ? { raca, chip, castrado, especie } : null,
                especie: tipo === 'pet' ? especie : null,
                contatos,
                dataAtualizacao: new Date().toISOString(),
                pendente: false
            };

            if (editingProfile) {
                await ProfileService.updatePerfil(profileData.id, profileData);
            } else {
                await ProfileService.addPerfil(profileData, tipo);
            }

            // Aplica o vínculo por residência escolhido no seletor — reaproveita
            // o mesmo helper que QuemProtegerScreenNeo usa pra editar vínculos,
            // em vez de reescrever habitantes/frequentadores na mão.
            for (const [resId, rel] of Object.entries(residenceRelationships)) {
                await ProfileService.setProfileResidenceRelationship(profileData.id, rel, resId);
            }

            NeoAlert.alert(
                t('addProfile.success'),
                t('addProfile.profileSaved'),
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } catch (error) {
            if (__DEV__) {
                console.error('[AddPerfil] SAVE ERROR:', error?.message || error);
            }
            NeoAlert.alert(t('addProfile.error'), t('addProfile.saveFailed'));
        }
    };

    // Filtro de condições baseado na busca
    const filteredConditions = MEDICAL_CONDITIONS.filter(c =>
        c.label.toLowerCase().includes(searchCondition.toLowerCase())
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H3 style={{ flex: 1, fontWeight: '800' }}>
                        {editingProfile ? t('addProfile.editTitle') : t('addProfile.newTitle')}
                    </H3>
                </View>

                {/* PROGRESS BAR HEADER */}
                <View style={styles.progressContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800] }}>{t('telas.AddPerfilScreenNeo.completeSeuPerfilDeSeguranca', 'Complete seu Perfil de Segurança')}</Body>
                        <Body style={{ fontWeight: '900', color: Neo.colors.primary[600] }}>
                            {progress}%
                        </Body>
                    </View>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                    </View>
                    <Caption style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>{t('telas.AddPerfilScreenNeo.ajudeNosAFornecerRecomendacoesDe', 'Ajude-nos a fornecer recomendações de segurança personalizadas')}</Caption>
                </View>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: Neo.spacing.lg, paddingBottom: 190 }} showsVerticalScrollIndicator={false}>

                        {/* Tipo Selector */}
                        <NeoCard variant="elevated" style={{ flexDirection: 'row', padding: 4, marginBottom: 16, borderRadius: 16 }}>
                            {['humano', 'pet'].map(profileType => {
                                const isActive = tipo === profileType;
                                return (
                                    <TouchableOpacity
                                        key={profileType}
                                        style={{
                                            flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12,
                                            backgroundColor: isActive ? Neo.colors.primary[500] : 'transparent'
                                        }}
                                        onPress={() => setTipo(profileType)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            <NeoIcon name={profileType === 'humano' ? 'User' : 'Pet'} size={18} color={isActive ? Neo.colors.neutral.white : Neo.colors.neutral[500]} />
                                            <Body style={{ fontWeight: 'bold', color: isActive ? Neo.colors.neutral.white : Neo.colors.neutral[500] }}>
                                                {profileType === 'humano' ? t('addProfile.person') : t('addProfile.pet')}
                                            </Body>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </NeoCard>

                        {/* ACCORDION 1: INFORMAÇÕES PESSOAIS */}
                        <AccordionSection
                            sectionKey="personal"
                            title={tipo === 'pet' ? t('telas.AddPerfilScreenNeo.fichaDoPet', 'Ficha do Pet') : t('telas.AddPerfilScreenNeo.informacoesPessoais', 'Informações Pessoais')}
                            icon={tipo === 'pet' ? 'Pet' : 'User'}
                            isExpanded={expanded.personal}
                            onToggle={toggleAccordion}
                        >
                            {/* Avatar */}
                            <View style={{ alignItems: 'center', marginVertical: 16 }}>
                                <TouchableOpacity onPress={pickImage} style={{ position: 'relative' }}>
                                    <View style={styles.avatarCircle}>
                                        {foto ? (
                                            <Image source={typeof foto === 'number' ? foto : { uri: foto }} style={{ width: 92, height: 92, borderRadius: 46 }} />
                                        ) : (
                                            <NeoIcon name={tipo === 'pet' ? 'Pet' : 'User'} size={40} color={Neo.colors.neutral[400]} />
                                        )}
                                    </View>
                                    <View style={styles.cameraBadge}>
                                        <NeoIcon name="Camera" size={14} color={Neo.colors.neutral.white} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Vínculo com os Locais (Morador / Frequentador) */}
                            <ResidenceLinksPicker
                                residencesList={residencesList}
                                relationships={residenceRelationships}
                                onChange={(resId, key) => {
                                    setResidenceRelationships(prev => {
                                        const updated = { ...prev, [resId]: key };
                                        const hasActive = Object.keys(updated).some(k => updated[k] !== 'nenhum');
                                        if (!hasActive) return prev;
                                        return updated;
                                    });
                                }}
                            />

                            {/* Nome */}
                            <View style={{ marginBottom: 16 }}>
                                <Small style={styles.fieldLabel}>{t('addProfile.name')}</Small>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder={tipo === 'pet' ? t('addProfile.petNamePH') : t('addProfile.personNamePH')}
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                {/* Minimização na origem: o app não precisa de
                                    sobrenome (decisão do autor, 2026-06-12) —
                                    nudge gentil, sem policiar o que é digitado. */}
                                {tipo !== 'pet' && (
                                    <Small style={{ color: Neo.colors.neutral[500], marginTop: 4 }}>
                                        {t('addProfile.nameHint', 'Não precisa de sobrenome — só como devemos chamar.')}
                                    </Small>
                                )}
                            </View>

                            {/* Gênero / Sexo */}
                            <View style={{ marginBottom: 16 }}>
                                <Small style={styles.fieldLabel}>
                                    {tipo === 'pet' ? t('addProfile.sex', 'SEXO') : t('addProfile.gender')}
                                </Small>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    {['Masculino', 'Feminino'].map((opt) => {
                                        const isActive = genero === opt;
                                        return (
                                            <TouchableOpacity
                                                key={opt}
                                                onPress={() => setGenero(opt)}
                                                style={[
                                                    styles.chipSelect,
                                                    isActive && {
                                                        backgroundColor: Neo.colors.primary[100],
                                                        borderColor: Neo.colors.primary[500],
                                                    }
                                                ]}
                                            >
                                                <Small style={{ color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600], fontWeight: '600' }}>
                                                    {tipo === 'pet' ? (opt === 'Masculino' ? 'Macho' : t('telas.AddPerfilScreenNeo.femea', 'Fêmea')) : opt}
                                                </Small>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Nascimento */}
                            <View style={{ marginBottom: 20 }}>
                                <Small style={styles.fieldLabel}>{t('addProfile.birth')}</Small>
                                <View style={{ flexDirection: 'row', gap: 12 }}>
                                    <TextInput
                                        ref={diaRef} style={styles.dateInput} placeholder="DD"
                                        keyboardType="number-pad" maxLength={2}
                                        value={dia} onChangeText={handleDiaChange}
                                    />
                                    <TextInput
                                        ref={mesRef} style={styles.dateInput} placeholder="MM"
                                        keyboardType="number-pad" maxLength={2}
                                        value={mes} onChangeText={handleMesChange}
                                    />
                                    <TextInput
                                        ref={anoRef} style={[styles.dateInput, { flex: 1.5 }]} placeholder="AAAA"
                                        keyboardType="number-pad" maxLength={4}
                                        value={ano} onChangeText={setAno}
                                    />
                                </View>
                            </View>

                            {/* Pet specific info */}
                            {tipo === 'pet' && (
                                <View>
                                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Small style={styles.fieldLabel}>{t('addProfile.breed')}</Small>
                                            <TextInput
                                                style={styles.textInputCompact}
                                                placeholder={t('addProfile.breedPH')}
                                                value={raca} onChangeText={setRaca}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Small style={styles.fieldLabel}>{t('addProfile.microchip')}</Small>
                                            <TextInput
                                                style={styles.textInputCompact}
                                                placeholder={t('addProfile.optional')}
                                                value={chip} onChangeText={setChip}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.switchRow}>
                                        <Small style={{ fontWeight: 'bold', color: Neo.colors.neutral[800] }}>
                                            {t('addProfile.neutered')}
                                        </Small>
                                        <Switch
                                            trackColor={{ false: Neo.colors.neutral[300], true: Neo.colors.primary[300] }}
                                            thumbColor={castrado ? Neo.colors.primary[500] : Neo.colors.neutral[100]}
                                            onValueChange={setCastrado}
                                            value={castrado}
                                        />
                                    </View>
                                </View>
                            )}

                            {/* Necessidades de Acessibilidade / Condições Especiais do Pet */}
                            <View style={{ marginTop: 12 }}>
                                <Small style={styles.fieldLabel}>
                                    {tipo === 'pet' ? t('telas.AddPerfilScreenNeo.condicoesEspeciaisDoPet', 'Condições Especiais do Pet') : t('telas.AddPerfilScreenNeo.necessidadesDeAcessibilidade', 'Necessidades de Acessibilidade')}
                                </Small>
                                <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 10 }}>
                                    {tipo === 'pet' ? t('telas.AddPerfilScreenNeo.selecioneAsCondicoesDeSaudeDo', 'Selecione as condições de saúde do pet') : t('telas.AddPerfilScreenNeo.selecioneParaPersonalizarAsRecomendacoes', 'Selecione para personalizar as recomendações de segurança')}
                                </Caption>
                                <View style={styles.chipGrid}>
                                    {(tipo === 'pet' ? PET_CONDITIONS : ACCESSIBILITY_NEEDS).map((need) => {
                                        const isSelected = necessidadesEspeciais.includes(need.id);
                                        return (
                                            <TouchableOpacity
                                                key={need.id}
                                                onPress={() => toggleArrayItem(necessidadesEspeciais, setNecessidadesEspeciais, need.id)}
                                                style={[
                                                    styles.itemChip,
                                                    isSelected && {
                                                        backgroundColor: Neo.colors.primary[50],
                                                        borderColor: Neo.colors.primary[300],
                                                    }
                                                ]}
                                            >
                                                <Small style={[styles.itemChipText, isSelected && { color: Neo.colors.primary[700], fontWeight: 'bold' }]}>
                                                    {need.label}
                                                </Small>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </View>

                            {/* Cômodos Frequentados (Briefing Vivo) */}
                            {availableRooms.length > 0 && (
                                <View style={{ marginTop: 20 }}>
                                    <Small style={styles.fieldLabel}>{t('telas.AddPerfilScreenNeo.comodosFrequentados', 'CÔMODOS FREQUENTADOS')}</Small>
                                    <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 10 }}>
                                        {tipo === 'pet'
                                            ? t('telas.AddPerfilScreenNeo.selecioneComodosPet', 'Selecione os cômodos que este pet frequenta no dia a dia para cruzarmos os dados de segurança.')
                                            : t('telas.AddPerfilScreenNeo.selecioneComodosResidente', 'Selecione os cômodos que este residente usa no dia a dia para cruzarmos os dados de segurança.')}
                                    </Caption>
                                    <View style={styles.chipGrid}>
                                        {availableRooms.map((room) => {
                                            const isSelected = comodosUsados.includes(room.id);
                                            return (
                                                <TouchableOpacity
                                                    key={room.id}
                                                    onPress={() => toggleArrayItem(comodosUsados, setComodosUsados, room.id)}
                                                    style={[
                                                        styles.itemChip,
                                                        isSelected && {
                                                            backgroundColor: Neo.colors.primary[50],
                                                            borderColor: Neo.colors.primary[300],
                                                        }
                                                    ]}
                                                >
                                                    {/* Sem ícone de propósito: numa pílula de seleção o que
                                                        comunica é o rótulo e o estado (cor/borda). Ícone
                                                        aqui só competiria por atenção. Antes vinha o emoji
                                                        do dado embutido no texto. */}
                                                    <Small style={[styles.itemChipText, isSelected && { color: Neo.colors.primary[700], fontWeight: 'bold' }]}>
                                                        {room.nome}
                                                    </Small>
                                                </TouchableOpacity>
                                            );
                                        })}
                                    </View>
                                </View>
                            )}
                        </AccordionSection>

                        {/* ACCORDION 2: CONDIÇÕES MÉDICAS (HUMANO APENAS) */}
                        {tipo === 'humano' && (
                            <AccordionSection
                                sectionKey="medical"
                                title={t('telas.AddPerfilScreenNeo.condicoesMedicas', 'Condições Médicas')}
                                icon="medical"
                                isExpanded={expanded.medical}
                                onToggle={toggleAccordion}
                            >
                                {/* Tipo Sanguíneo */}
                                <View style={{ marginBottom: 16 }}>
                                    <Small style={styles.fieldLabel}>{t('addProfile.bloodType')}</Small>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                                        {BLOOD_TYPES.map(bt => (
                                            <TouchableOpacity
                                                key={bt}
                                                onPress={() => setTipoSanguineo(bt === tipoSanguineo ? '' : bt)}
                                                style={[
                                                    styles.bloodBtn,
                                                    tipoSanguineo === bt && { backgroundColor: Neo.colors.feedback.error }
                                                ]}
                                            >
                                                <Small style={{ color: tipoSanguineo === bt ? Neo.colors.neutral.white : Neo.colors.neutral[600], fontWeight: 'bold' }}>
                                                    {bt}
                                                </Small>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Filtro / Busca */}
                                <View style={styles.searchContainer}>
                                    <NeoIcon name="SearchNormal1" size={18} color={Neo.colors.neutral[400]} />
                                    <TextInput
                                        style={styles.searchInput}
                                        placeholder={t('telas.AddPerfilScreenNeo.buscarCondicoesMedicas', 'Buscar Condições Médicas...')}
                                        value={searchCondition}
                                        onChangeText={setSearchCondition}
                                    />
                                </View>

                                {/* Lista de Condições com Checkbox */}
                                <View style={styles.checkboxList}>
                                    {filteredConditions.map((cond) => {
                                        const isSelected = condicoes.includes(cond.label);
                                        return (
                                            <TouchableOpacity
                                                key={cond.id}
                                                onPress={() => toggleArrayItem(condicoes, setCondicoes, cond.label)}
                                                style={styles.checkboxRow}
                                                activeOpacity={0.8}
                                            >
                                                <Body style={{ flex: 1, color: Neo.colors.neutral[800], fontSize: 15 }}>
                                                    {cond.label}
                                                </Body>
                                                <View style={[
                                                    styles.checkboxBox,
                                                    isSelected && { backgroundColor: Neo.colors.primary[600], borderColor: Neo.colors.primary[600] }
                                                ]}>
                                                    {isSelected && <NeoIcon name="Tick" size={14} color="#FFF" />}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                    {filteredConditions.length === 0 && (
                                        <Caption style={{ color: Neo.colors.neutral[400], fontStyle: 'italic', paddingVertical: 10 }}>{t('telas.AddPerfilScreenNeo.nenhumaCondicaoEncontradaAdicioneAbaixo', 'Nenhuma condição encontrada. Adicione abaixo.')}</Caption>
                                    )}
                                </View>

                                {/* Adicionar Condição Customizada */}
                                <View style={{ marginTop: 12 }}>
                                    <Small style={styles.fieldLabel}>{t('telas.AddPerfilScreenNeo.adicionarCondicaoPersonalizada', 'Adicionar Condição Personalizada')}</Small>
                                    <View style={styles.customAddContainer}>
                                        <TextInput
                                            style={styles.customAddInput}
                                            placeholder={t('telas.AddPerfilScreenNeo.nomeDaCondicaoMedica', 'Nome da condição médica...')}
                                            value={customCondition}
                                            onChangeText={setCustomCondition}
                                        />
                                        <TouchableOpacity onPress={addCustomConditionHandler} style={styles.customAddBtn}>
                                            <NeoIcon name="Add" size={20} color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Exibir condições personalizadas selecionadas */}
                                {condicoes.filter(c => !MEDICAL_CONDITIONS.some(mc => mc.label === c)).length > 0 && (
                                    <View style={{ marginTop: 10 }}>
                                        <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 6 }}>{t('telas.AddPerfilScreenNeo.customizadasSelecionadas', 'Customizadas selecionadas:')}</Caption>
                                        <View style={styles.chipGrid}>
                                            {condicoes.filter(c => !MEDICAL_CONDITIONS.some(mc => mc.label === c)).map((c) => (
                                                <TouchableOpacity
                                                    key={c}
                                                    onPress={() => toggleArrayItem(condicoes, setCondicoes, c)}
                                                    style={[styles.itemChip, { backgroundColor: Neo.colors.primary[50], borderColor: Neo.colors.primary[300] }]}
                                                >
                                                    <><Small style={{ color: Neo.colors.primary[700], fontWeight: 'bold' }}>{c}</Small>
                                                    <NeoIcon name="CloseCircle" size={13} color={Neo.colors.primary[700]} variant="Bold" style={{ marginLeft: 5 }} /></>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {/* Informational Blue Note Card */}
                                <View style={styles.blueCard}>
                                    <NeoIcon name="InfoCircle" size={18} color={Neo.colors.primary[600]} />
                                    <Caption style={styles.blueCardText}>{t('telas.AddPerfilScreenNeo.essasInformacoesNosAjudamAFornecer', 'Essas informações nos ajudam a fornecer recomendações de segurança e primeiros socorros personalizadas.')}</Caption>
                                </View>
                            </AccordionSection>
                        )}

                        {/* ACCORDION 3: ALERGIAS E SENSIBILIDADES (HUMANO APENAS) */}
                        {tipo === 'humano' && (
                            <AccordionSection
                                sectionKey="allergies"
                                title="Alergias e Sensibilidades"
                                icon="Danger"
                                isExpanded={expanded.allergies}
                                onToggle={toggleAccordion}
                            >
                                <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 12 }}>{t('telas.AddPerfilScreenNeo.selecioneTodasAsAlergiasConhecidas', 'Selecione todas as alergias conhecidas:')}</Caption>

                                {/* Categorias com chips contendo ícones */}
                                {ALLERGY_CATEGORIES.map((cat) => (
                                    <View key={cat.title} style={{ marginBottom: 16 }}>
                                        <Small style={styles.allergyCatTitle}>
                                            {cat.icon} {cat.title}
                                        </Small>
                                        <View style={styles.chipGrid}>
                                            {cat.items.map((item) => {
                                                const isSelected = alergias.includes(item.label);
                                                return (
                                                    <TouchableOpacity
                                                        key={item.id}
                                                        onPress={() => toggleArrayItem(alergias, setAlergias, item.label)}
                                                        style={[
                                                            styles.itemChip,
                                                            isSelected && {
                                                                backgroundColor: Neo.colors.primary[50],
                                                                borderColor: Neo.colors.primary[300],
                                                            }
                                                        ]}
                                                    >
                                                        <Small style={[styles.itemChipText, isSelected && { color: Neo.colors.primary[700], fontWeight: 'bold' }]}>
                                                            {item.label}
                                                        </Small>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    </View>
                                ))}

                                {/* Adicionar Alergia Customizada */}
                                <View style={{ marginTop: 12 }}>
                                    <Small style={styles.fieldLabel}>{t('telas.AddPerfilScreenNeo.adicionarAlergiaPersonalizada', 'Adicionar Alergia Personalizada')}</Small>
                                    <View style={styles.customAddContainer}>
                                        <TextInput
                                            style={styles.customAddInput}
                                            placeholder={t('telas.AddPerfilScreenNeo.nomeDoAlergeno', 'Nome do alérgeno...')}
                                            value={customAllergy}
                                            onChangeText={setCustomAllergy}
                                        />
                                        <TouchableOpacity onPress={addCustomAllergyHandler} style={styles.customAddBtn}>
                                            <NeoIcon name="Add" size={20} color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Exibir alergias personalizadas selecionadas */}
                                {alergias.filter(a => !ALLERGY_CATEGORIES.some(cat => cat.items.some(i => i.label === a))).length > 0 && (
                                    <View style={{ marginTop: 10 }}>
                                        <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 6 }}>{t('telas.AddPerfilScreenNeo.customizadasSelecionadas2', 'Customizadas selecionadas:')}</Caption>
                                        <View style={styles.chipGrid}>
                                            {alergias.filter(a => !ALLERGY_CATEGORIES.some(cat => cat.items.some(i => i.label === a))).map((a) => (
                                                <TouchableOpacity
                                                    key={a}
                                                    onPress={() => toggleArrayItem(alergias, setAlergias, a)}
                                                    style={[styles.itemChip, { backgroundColor: Neo.colors.primary[50], borderColor: Neo.colors.primary[300] }]}
                                                >
                                                    <><Small style={{ color: Neo.colors.primary[700], fontWeight: 'bold' }}>{a}</Small>
                                                    <NeoIcon name="CloseCircle" size={13} color={Neo.colors.primary[700]} variant="Bold" style={{ marginLeft: 5 }} /></>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                )}

                                {/* Red Warning Card */}
                                <View style={styles.redCard}>
                                    <NeoIcon name="Warning2" size={18} color={Neo.colors.feedback.error} />
                                    <Caption style={styles.redCardText}>{t('telas.AddPerfilScreenNeo.informacoesDeEmergenciaEstesDadosDe', 'Informações de Emergência: Estes dados de alergia serão compartilhados com os socorristas de emergência, se necessário.')}</Caption>
                                </View>
                            </AccordionSection>
                        )}

                        {/* ACCORDION 4: MEDICAMENTOS EM USO (HUMANO APENAS) */}
                        {tipo === 'humano' && (
                            <AccordionSection
                                sectionKey="medications"
                                title={t('telas.AddPerfilScreenNeo.medicamentosEmUso', 'Medicamentos em Uso')}
                                icon="Task"
                                isExpanded={expanded.medications}
                                onToggle={toggleAccordion}
                            >
                                <Caption style={{ color: Neo.colors.neutral[500], marginBottom: 12 }}>{t('telas.AddPerfilScreenNeo.listeOsMedicamentosDeUsoDiario', 'Liste os medicamentos de uso diário ou recorrente:')}</Caption>

                                {/* Lista de Medicamentos Cadastrados */}
                                {medicamentosEmUso.map((med, idx) => (
                                    <View key={idx} style={styles.medicamentoRow}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                                            <NeoIcon name="DocumentText" size={18} color={Neo.colors.primary[500]} />
                                            <Body style={{ color: Neo.colors.neutral[800], fontWeight: '600' }}>{med}</Body>
                                        </View>
                                        <TouchableOpacity onPress={() => setMedicamentosEmUso(medicamentosEmUso.filter((_, i) => i !== idx))}>
                                            <NeoIcon name="Trash" size={18} color={Neo.colors.feedback.error} />
                                        </TouchableOpacity>
                                    </View>
                                ))}

                                {/* Entrada de Medicamento */}
                                <View style={{ marginTop: 12 }}>
                                    <Small style={styles.fieldLabel}>{t('telas.AddPerfilScreenNeo.adicionarMedicamento', 'Adicionar Medicamento')}</Small>
                                    <View style={styles.customAddContainer}>
                                        <TextInput
                                            style={styles.customAddInput}
                                            placeholder={t('telas.AddPerfilScreenNeo.nomeDoMedicamentoEDosagem', 'Nome do medicamento e dosagem...')}
                                            value={customMedication}
                                            onChangeText={setCustomMedication}
                                        />
                                        <TouchableOpacity onPress={addCustomMedicationHandler} style={styles.customAddBtn}>
                                            <NeoIcon name="Add" size={20} color="#FFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </AccordionSection>
                        )}

                        {/* ACCORDION 5: CONTATOS DE EMERGÊNCIA */}
                        <AccordionSection
                            sectionKey="contacts"
                            title={t('telas.AddPerfilScreenNeo.redeDeApoioSos', 'Rede de Apoio (SOS)')}
                            icon="Profile2User"
                            isExpanded={expanded.contacts}
                            onToggle={toggleAccordion}
                        >
                            <Small style={{ color: Neo.colors.neutral[500], marginBottom: 12 }}>
                                {t('addProfile.sosHelp')}
                            </Small>

                            {/* Contatos Adicionados */}
                            {(contatos || []).map((c, idx) => (
                                <View key={idx} style={styles.medicamentoRow}>
                                    <View style={{ flex: 1 }}>
                                        <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800] }}>{c.nome}</Body>
                                        <Small style={{ color: Neo.colors.neutral[500] }}>{c.telefone}</Small>
                                    </View>
                                    <TouchableOpacity onPress={() => setContatos(contatos.filter((_, i) => i !== idx))}>
                                        <NeoIcon name="Trash" size={20} color={Neo.colors.feedback.error} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            {/* Adicionar Contato Form */}
                            <View style={styles.contactForm}>
                                <TextInput
                                    placeholder={t('addProfile.contactName')}
                                    value={newContactName}
                                    onChangeText={setNewContactName}
                                    style={styles.contactFormInput}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                    <TextInput
                                        placeholder={t('addProfile.contactPhone')}
                                        value={newContactPhone}
                                        onChangeText={setNewContactPhone}
                                        keyboardType="phone-pad"
                                        style={[styles.contactFormInput, { flex: 1, marginRight: 10 }]}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (newContactName.trim() && newContactPhone.trim()) {
                                                setContatos([...contatos, { nome: newContactName.trim(), telefone: newContactPhone.trim() }]);
                                                setNewContactName('');
                                                setNewContactPhone('');
                                            } else {
                                                NeoAlert.alert(t('addProfile.error'), t('addProfile.fillBoth'));
                                            }
                                        }}
                                        style={styles.addContactBtn}
                                    >
                                        <Small style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>
                                            {t('addProfile.addContact')}
                                        </Small>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </AccordionSection>

                        {/* REQUIRED INFO BANNER & SAVE BUTTON CONTAINER */}
                        <View style={{ marginTop: 24, marginBottom: 48 }}>
                            {/* Banner "Informações Obrigatórias" */}
                            <View style={styles.requiredBanner}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                    <NeoIcon name="InfoCircle" size={18} color={Neo.colors.primary[700]} />
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.primary[800] }}>{t('telas.AddPerfilScreenNeo.informacoesObrigatorias', 'Informações Obrigatórias')}</Body>
                                </View>

                                {/* Check 1: Dados Pessoais (Nome e Idade) */}
                                <View style={styles.requiredCheckRow}>
                                    <View style={[
                                        styles.dotIndicator,
                                        { backgroundColor: (hasName && hasAge) ? Neo.colors.feedback.success : Neo.colors.feedback.error }
                                    ]} />
                                    <Small style={{ color: Neo.colors.neutral[700] }}>{t('telas.AddPerfilScreenNeo.informacoesPessoaisNomeEIdade', 'Informações Pessoais (Nome e Idade)')}</Small>
                                </View>

                                {/* Check 2: Contato de Emergência */}
                                <View style={styles.requiredCheckRow}>
                                    <View style={[
                                        styles.dotIndicator,
                                        { backgroundColor: hasContact ? Neo.colors.feedback.success : Neo.colors.feedback.error }
                                    ]} />
                                    <Small style={{ color: Neo.colors.neutral[700] }}>{t('telas.AddPerfilScreenNeo.peloMenosUmContatoDeEmergencia', 'Pelo menos um Contato de Emergência')}</Small>
                                </View>
                            </View>

                            {/* Botão Salvar Perfil */}
                            <TouchableOpacity
                                onPress={handleSave}
                                activeOpacity={0.8}
                                style={[
                                    styles.saveProfileBtn,
                                    (!hasName || !hasAge || !hasContact) && { backgroundColor: Neo.colors.neutral[400] }
                                ]}
                            >
                                <NeoIcon name="TickCircle" size={20} color="#FFF" />
                                <H3 style={{ color: Neo.colors.neutral.white, fontWeight: 'bold', marginLeft: 8 }}>{t('telas.AddPerfilScreenNeo.salvarPerfil', 'Salvar Perfil')}</H3>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Neo.spacing.lg,
        paddingTop: 8,
        paddingBottom: 14,
        gap: 12,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.75)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressContainer: {
        paddingHorizontal: Neo.spacing.lg,
        paddingBottom: 16,
        borderBottomWidth: 1.5,
        borderBottomColor: 'rgba(16,24,40,0.06)',
    },
    progressBarBg: {
        height: 8,
        backgroundColor: 'rgba(16,24,40,0.06)',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Neo.colors.primary[500],
        borderRadius: 4,
    },
    accordionCard: {
        padding: 0,
        marginBottom: 12,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderWidth: 1.5,
        borderColor: 'rgba(16,24,40,0.05)',
        overflow: 'hidden',
    },
    accordionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    accordionIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: Neo.colors.primary[50],
        alignItems: 'center',
        justifyContent: 'center',
    },
    accordionContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(16,24,40,0.06)',
        marginBottom: 16,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Neo.colors.neutral[200],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: Neo.colors.neutral.white,
        ...Neo.shadows.sm,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Neo.colors.primary[500],
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: Neo.colors.neutral.white,
    },
    fieldLabel: {
        marginBottom: 8,
        fontWeight: 'bold',
        color: Neo.colors.neutral[500],
    },
    textInput: {
        fontSize: 16,
        color: Neo.colors.neutral[900],
        borderBottomWidth: 1,
        borderColor: Neo.colors.neutral[200],
        paddingVertical: 8,
    },
    textInputCompact: {
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
        fontSize: 14,
        color: Neo.colors.neutral[800],
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Neo.colors.neutral[100],
        padding: 12,
        borderRadius: 12,
        marginVertical: 8,
    },
    chipGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    itemChip: {
        // row: os chips de condição/alergia já selecionados trazem um ícone de
        // remover ao lado do rótulo (antes era um ✕ colado no texto). Nas
        // pílulas de cômodo, que só têm rótulo, não muda nada.
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: Neo.colors.neutral[100],
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
    itemChipText: {
        color: Neo.colors.neutral[600],
        fontWeight: '600',
    },
    chipSelect: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: Neo.colors.neutral[100],
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
    },
    dateInput: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: 8,
        padding: 12,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: Neo.colors.neutral[800],
    },
    bloodBtn: {
        width: 48,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: Neo.colors.neutral[100],
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        height: 44,
        fontSize: 14,
        color: Neo.colors.neutral[800],
        marginLeft: 8,
    },
    checkboxList: {
        marginBottom: 16,
        maxHeight: 250,
        overflow: 'hidden',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(16,24,40,0.04)',
    },
    checkboxBox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: Neo.colors.neutral[300],
        alignItems: 'center',
        justifyContent: 'center',
    },
    customAddContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
    },
    customAddInput: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 44,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[200],
        color: Neo.colors.neutral[800],
    },
    customAddBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Neo.colors.primary[600],
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.primary[50],
        padding: 12,
        borderRadius: 12,
        marginTop: 16,
        gap: 8,
    },
    blueCardText: {
        flex: 1,
        color: Neo.colors.primary[700],
        lineHeight: 16,
    },
    redCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBEE',
        padding: 12,
        borderRadius: 12,
        marginTop: 16,
        gap: 8,
    },
    redCardText: {
        flex: 1,
        color: '#D32F2F',
        lineHeight: 16,
    },
    allergyCatTitle: {
        fontWeight: 'bold',
        color: Neo.colors.primary[700],
        marginBottom: 8,
        fontSize: 13,
    },
    medicamentoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Neo.colors.neutral[50],
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: Neo.colors.neutral[100],
    },
    contactForm: {
        marginTop: 12,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        borderColor: Neo.colors.neutral[300],
    },
    contactFormInput: {
        borderBottomWidth: 1,
        borderColor: Neo.colors.neutral[200],
        paddingVertical: 6,
        fontSize: 14,
        color: Neo.colors.neutral[800],
    },
    addContactBtn: {
        backgroundColor: Neo.colors.primary[500],
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    requiredBanner: {
        backgroundColor: Neo.colors.primary[50],
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Neo.colors.primary[100],
    },
    requiredCheckRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 8,
    },
    dotIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    saveProfileBtn: {
        backgroundColor: Neo.colors.primary[500],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
});
