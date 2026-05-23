import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileService from '../../services/ProfileService';
// FIX #5: AsyncStorage e VIGILARO_DATA_KEY removidos — eram usados apenas para debug
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import NeoIcon from '../../components/NeoIcon';

// Neo Design
import Theme, { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import NeoText, { H2, H3, Body, Small, Caption } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';
import AppBackground from '../../components/AppBackground';
import NeoAlert from '../../utils/NeoAlert';

export default function AddPerfilScreenNeo({ navigation, route }) {
    const { t } = useTranslation();

    const editingProfile = route.params?.profile || route.params?.perfil || null;
    const initialType = route.params?.type || (editingProfile?.tipo === 'pet' ? 'pet' : 'humano');

    const [tipo, setTipo] = useState(initialType);
    const [especie, setEspecie] = useState(editingProfile?.especie || 'Cachorro');
    const [nome, setNome] = useState(editingProfile?.pendente ? '' : (editingProfile?.nome || ''));
    const [genero, setGenero] = useState(editingProfile?.genero || 'Masculino');

    // FIX #4: resolveImageUri aplicado já no estado inicial para evitar flash de URI crua
    const [foto, setFoto] = useState(
        editingProfile?.foto ? ProfileService.resolveImageUri(editingProfile.foto) : null
    );

    // FIX: aceita tanto vinculo='frequentador' (B++ HumanFormStep) quanto isVisitante=true (legado).
    const [vinculo, setVinculo] = useState(
        (editingProfile?.vinculo === 'frequentador' || editingProfile?.isVisitante)
            ? 'frequentador'
            : 'morador'
    );

    // FIX #1: dataNascimento inicializado como null em vez de new Date()
    // para evitar que perfis novos sem data preenchida sejam salvos com data de hoje.
    // FIX adicional: aceita tanto Date/ISO (legado) quanto string "DD/MM/AAAA" (B++ HumanFormStep).
    const parseDOB = (val) => {
        if (!val) return null;
        // Formato "DD/MM/AAAA" do B++
        if (typeof val === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
            const [d, m, y] = val.split('/');
            const dt = new Date(`${y}-${m}-${d}`);
            return Number.isNaN(dt.getTime()) ? null : dt;
        }
        // Fallback: Date object ou ISO string
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

    const [isPcd, setIsPcd] = useState(editingProfile?.pcd?.isPcd || false);
    const [pcdInfo, setPcdInfo] = useState(editingProfile?.pcd?.info || '');
    const [tipoSanguineo, setTipoSanguineo] = useState(editingProfile?.saude?.tipoSanguineo || '');
    const [condicoes, setCondicoes] = useState(editingProfile?.saude?.condicoes || []);
    const [alergias, setAlergias] = useState(editingProfile?.saude?.alergias || '');
    const [raca, setRaca] = useState(editingProfile?.infoPet?.raca || '');
    const [chip, setChip] = useState(editingProfile?.infoPet?.chip || '');
    const [necessidadesEspeciais, setNecessidadesEspeciais] = useState(editingProfile?.necessidadesEspeciais || []);
    const [castrado, setCastrado] = useState(editingProfile?.infoPet?.castrado || false);
    const [contatos, setContatos] = useState(editingProfile?.contatos || []);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const humanConditions = ['Hipertensão', 'Diabetes', 'Asma', 'Bronquite', 'Psoríase', 'Colesterol', 'Cardíaco', 'Epilepsia', 'Renal'];
    const petConditions = [
        { id: 'mobilidade_reduzida', label: 'Mobilidade Reduzida / Artrose' },
        { id: 'visao_reduzida', label: 'Visão Reduzida / Cegueira' },
        { id: 'audicao_reduzida', label: 'Audição Reduzida / Surdez' },
        { id: 'disfuncao_cognitiva', label: 'Condição Neurológica / Cognitiva' }
    ];

    useEffect(() => {
        if (editingProfile) {
            setNome(editingProfile.nome || '');
            setGenero(editingProfile.genero || 'Masculino');
            setTipo(editingProfile.tipo || 'humano');
            // FIX #4: resolveImageUri já foi aplicado no estado inicial — sem duplicação aqui
            if (editingProfile.foto) {
                setFoto(ProfileService.resolveImageUri(editingProfile.foto));
            }
            if (editingProfile.dataNascimento) {
                const d = new Date(editingProfile.dataNascimento);
                setDia(d.getDate().toString().padStart(2, '0'));
                setMes((d.getMonth() + 1).toString().padStart(2, '0'));
                setAno(d.getFullYear().toString());
                setDataNascimento(d);
            }
            setTipoSanguineo(editingProfile.saude?.tipoSanguineo || '');
            setCondicoes(editingProfile.saude?.condicoes || []);
            setAlergias(editingProfile.saude?.alergias || '');
            setRaca(editingProfile.infoPet?.raca || '');
            setChip(editingProfile.infoPet?.chip || '');
            setCastrado(editingProfile.infoPet?.castrado || false);
            setNecessidadesEspeciais(editingProfile.necessidadesEspeciais || []);
            if (editingProfile.especie) setEspecie(editingProfile.especie);
            if (editingProfile.contatos) setContatos(editingProfile.contatos);
            if (editingProfile.pcd) {
                setIsPcd(editingProfile.pcd.isPcd);
                setPcdInfo(editingProfile.pcd.info || '');
            }
        }
    }, [editingProfile]);

    useEffect(() => {
        if (dia.length >= 1 && mes.length >= 1 && ano.length === 4) {
            const d = parseInt(dia, 10);
            const m = parseInt(mes, 10) - 1;
            const y = parseInt(ano, 10);
            // FIX #2: Validação numérica completa antes de construir Date
            if (d >= 1 && d <= 31 && m >= 0 && m <= 11 && y > 1900 && y <= new Date().getFullYear()) {
                const parsed = new Date(y, m, d);
                // Verifica se a data resultante é válida (ex: 31/02 vira 03/03)
                if (parsed.getDate() === d && parsed.getMonth() === m) {
                    setDataNascimento(parsed);
                }
            }
        }
    }, [dia, mes, ano]);

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

    const handleSave = async () => {
        if (!nome.trim()) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.nameRequired'));
            return;
        }

        // FIX #2: Validação de data completa e robusta antes de prosseguir
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
        // FIX #1: Verifica se dataNascimento foi corretamente construído (não é null)
        if (!dataNascimento || isNaN(dataNascimento.getTime())) {
            NeoAlert.alert(t('addProfile.error'), t('addProfile.dateInvalid', 'Data de nascimento inválida.'));
            return;
        }

        try {
            // FIX #3: console.log de debug substituídos por bloco __DEV__
            if (__DEV__) {
                console.log('[AddPerfil] foto URI antes de persistir:', foto);
            }

            const finalPhotoFile = await ProfileService.persistImage(foto, 'profile');

            if (__DEV__) {
                console.log('[AddPerfil] finalPhotoFile após persistência:', finalPhotoFile);
            }

            const profileData = {
                id: editingProfile?.id || Date.now().toString(),
                nome,
                genero,
                tipo,
                dataNascimento: dataNascimento.toISOString(),
                foto: finalPhotoFile,
                vinculo,
                pcd: tipo === 'humano' ? { isPcd, info: pcdInfo } : null,
                saude: {
                    tipoSanguineo: tipo === 'humano' ? tipoSanguineo : null,
                    condicoes: tipo === 'humano' ? condicoes : [],
                    alergias: alergias.trim()
                },
                necessidadesEspeciais: tipo === 'pet' ? necessidadesEspeciais : (editingProfile?.necessidadesEspeciais || []),
                infoPet: tipo === 'pet' ? { raca, chip, castrado, especie } : null,
                especie: tipo === 'pet' ? especie : null,
                contatos,
                dataAtualizacao: new Date().toISOString(),
                pendente: false
            };

            if (editingProfile) {
                await ProfileService.updatePerfil(profileData.id, profileData);

                // FIX #6: Atualiza vínculo na residência ativa ao editar perfil
                // Se o vínculo mudou, remove dos dois arrays e re-insere no correto.
                const data = await ProfileService.getData();
                const activeId = data.activeResidenceId || 'default_home';
                const resIndex = (data.residences || []).findIndex(r => r.id === activeId);

                if (resIndex !== -1 && data.residences) {
                    const moradia = data.residences[resIndex].moradia || {};
                    const habitantes = Array.isArray(moradia.habitantes) ? moradia.habitantes : [];
                    const frequentadores = Array.isArray(moradia.frequentadores) ? moradia.frequentadores : [];

                    // Remove de ambos primeiro
                    const cleanHab = habitantes.filter(id => id !== profileData.id);
                    const cleanFreq = frequentadores.filter(id => id !== profileData.id);

                    // Re-insere no array correto conforme vínculo atual
                    if (vinculo === 'frequentador') {
                        cleanFreq.push(profileData.id);
                    } else {
                        cleanHab.push(profileData.id);
                    }

                    data.residences[resIndex].moradia = {
                        ...moradia,
                        habitantes: cleanHab,
                        frequentadores: cleanFreq,
                    };

                    await ProfileService.saveData(data);
                }
            } else {
                await ProfileService.addPerfil(profileData, tipo);
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

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* HEADER padronizado */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: Neo.spacing.lg, paddingTop: 4, paddingBottom: 14, gap: 12 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.75)', alignItems: 'center', justifyContent: 'center' }}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <NeoIcon name="ArrowLeft2" size={22} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <H3 style={{ flex: 1 }}>{editingProfile ? t('addProfile.editTitle') : t('addProfile.newTitle')}</H3>
                </View>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ padding: Neo.spacing.lg, paddingBottom: 190 }} showsVerticalScrollIndicator={false}>

                        {/* Type Selector */}
                        <NeoCard variant="elevated" style={{ flexDirection: 'row', padding: 4, marginBottom: 24, borderRadius: 16 }}>
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
                                            <NeoIcon name={profileType === 'humano' ? 'person' : 'paw'} size={18} color={isActive ? Neo.colors.neutral.white : Neo.colors.neutral[500]} />
                                            <Body style={{ fontWeight: 'bold', color: isActive ? Neo.colors.neutral.white : Neo.colors.neutral[500] }}>
                                                {profileType === 'humano' ? t('addProfile.person') : t('addProfile.pet')}
                                            </Body>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </NeoCard>

                        {/* Avatar */}
                        <View style={{ alignItems: 'center', marginBottom: 24 }}>
                            <TouchableOpacity onPress={pickImage} style={{ position: 'relative' }}>
                                <View style={{
                                    width: 100, height: 100, borderRadius: 50,
                                    backgroundColor: Neo.colors.neutral[200], alignItems: 'center', justifyContent: 'center',
                                    borderWidth: 4, borderColor: Neo.colors.neutral.white, ...Neo.shadows.sm
                                }}>
                                    {/* FIX #4: foto já está resolvida desde o estado inicial */}
                                    {foto ? (
                                        <Image source={{ uri: foto }} style={{ width: 92, height: 92, borderRadius: 46 }} />
                                    ) : (
                                        <NeoIcon name={tipo === 'pet' ? 'paw' : 'person'} size={40} color={Neo.colors.neutral[400]} />
                                    )}
                                </View>
                                <View style={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    backgroundColor: Neo.colors.primary[500], padding: 8, borderRadius: 20,
                                    borderWidth: 2, borderColor: Neo.colors.neutral.white
                                }}>
                                    <NeoIcon name="Camera" size={14} color={Neo.colors.neutral.white} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Vínculo Selector */}
                        {!editingProfile && (
                            <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16 }}>
                                <Small style={{ marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>
                                    {t('addProfile.residenceLink')}
                                </Small>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    {['morador', 'frequentador'].map(v => {
                                        const isActive = vinculo === v;
                                        return (
                                            <TouchableOpacity
                                                key={v}
                                                style={{
                                                    flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, borderWidth: 1,
                                                    borderColor: isActive ? Neo.colors.primary[500] : Neo.colors.neutral[200],
                                                    backgroundColor: isActive ? Neo.colors.primary[50] : 'transparent'
                                                }}
                                                onPress={() => setVinculo(v)}
                                            >
                                                <Body style={{ fontWeight: isActive ? 'bold' : '600', color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600], fontSize: 13 }}>
                                                    {v === 'morador' ? t('addProfile.resident') : t('addProfile.visitor')}
                                                </Body>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                                <Caption style={{ marginTop: 12, color: Neo.colors.neutral[500], lineHeight: 18 }}>
                                    {vinculo === 'morador'
                                        ? 'Moradores fixos compõem a rotina padrão da residência.'
                                        : 'Visitantes eventuais (parentes, amigos do filho) acionam alertas contextuais de segurança enquanto estiverem ativos.'}
                                </Caption>
                            </NeoCard>
                        )}

                        {/* FIX #6: Vínculo visível em modo edição para permitir alteração */}
                        {editingProfile && (
                            <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16 }}>
                                <Small style={{ marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>
                                    {t('addProfile.residenceLink')}
                                </Small>
                                <View style={{ flexDirection: 'row', gap: 8 }}>
                                    {['morador', 'frequentador'].map(v => {
                                        const isActive = vinculo === v;
                                        return (
                                            <TouchableOpacity
                                                key={v}
                                                style={{
                                                    flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12, borderWidth: 1,
                                                    borderColor: isActive ? Neo.colors.primary[500] : Neo.colors.neutral[200],
                                                    backgroundColor: isActive ? Neo.colors.primary[50] : 'transparent'
                                                }}
                                                onPress={() => setVinculo(v)}
                                            >
                                                <Body style={{ fontWeight: isActive ? 'bold' : '600', color: isActive ? Neo.colors.primary[700] : Neo.colors.neutral[600], fontSize: 13 }}>
                                                    {v === 'morador' ? t('addProfile.resident') : t('addProfile.visitor')}
                                                </Body>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </NeoCard>
                        )}

                        {/* Basic Info */}
                        <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16 }}>
                            <Small style={{ marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>{t('addProfile.name')}</Small>
                            <TextInput
                                style={{ fontSize: 16, color: Neo.colors.neutral[900], borderBottomWidth: 1, borderColor: Neo.colors.neutral[200], paddingVertical: 8 }}
                                placeholder={tipo === 'pet' ? t('addProfile.petNamePH') : t('addProfile.personNamePH')}
                                value={nome}
                                onChangeText={setNome}
                            />

                            <Small style={{ marginTop: 24, marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>
                                {tipo === 'pet' ? t('addProfile.sex', 'SEXO') : t('addProfile.gender')}
                            </Small>
                            <View style={{ flexDirection: 'row' }}>
                                {['Masculino', 'Feminino'].map((opt, idx) => (
                                    <TouchableOpacity
                                        key={opt}
                                        onPress={() => setGenero(opt)}
                                        style={{
                                            paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
                                            backgroundColor: genero === opt ? Neo.colors.primary[100] : Neo.colors.neutral[100],
                                            borderWidth: 1, borderColor: genero === opt ? Neo.colors.primary[500] : Neo.colors.neutral[200],
                                            marginRight: idx === 0 ? 8 : 0
                                        }}
                                    >
                                        <Small style={{ color: genero === opt ? Neo.colors.primary[700] : Neo.colors.neutral[600], fontWeight: '600' }}>
                                            {Platform.select({
                                                ios: opt,
                                                android: tipo === 'pet' ? (opt === 'Masculino' ? 'Macho' : t('addProfile.female', 'Fêmea')) : opt
                                            })}
                                        </Small>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Small style={{ marginTop: 24, marginBottom: 8, fontWeight: 'bold', color: Neo.colors.neutral[500] }}>{t('addProfile.birth')}</Small>
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
                        </NeoCard>

                        {/* Health / Stats */}
                        <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <View style={{ padding: 8, borderRadius: 8, backgroundColor: tipo === 'pet' ? Neo.colors.feedback.warning + '1A' : Neo.colors.feedback.error + '1A', marginRight: 12 }}>
                                    <NeoIcon name={tipo === 'pet' ? 'paw' : 'medical'} size={20} color={tipo === 'pet' ? Neo.colors.feedback.warning : Neo.colors.feedback.error} />
                                </View>
                                <H3>{tipo === 'pet' ? t('addProfile.vetFile') : t('addProfile.health')}</H3>
                            </View>

                            {tipo === 'humano' && (
                                <View style={{ marginBottom: 20 }}>
                                    <Small style={{ fontWeight: 'bold', marginBottom: 8 }}>{t('addProfile.bloodType')}</Small>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                                        {bloodTypes.map(bt => (
                                            <TouchableOpacity key={bt} onPress={() => setTipoSanguineo(bt === tipoSanguineo ? '' : bt)}
                                                style={{
                                                    width: 48, height: 36, alignItems: 'center', justifyContent: 'center', borderRadius: 8,
                                                    backgroundColor: tipoSanguineo === bt ? Neo.colors.feedback.error : Neo.colors.neutral[100],
                                                }}
                                            >
                                                <Small style={{ color: tipoSanguineo === bt ? Neo.colors.neutral.white : Neo.colors.neutral[600], fontWeight: 'bold' }}>{bt}</Small>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {tipo === 'pet' && (
                                <View style={{ marginBottom: 20 }}>
                                    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
                                        <View style={{ flex: 1 }}>
                                            <Small style={{ fontWeight: 'bold', marginBottom: 6 }}>{t('addProfile.breed')}</Small>
                                            <TextInput
                                                style={{ backgroundColor: Neo.colors.neutral[100], borderRadius: 8, padding: 10, borderWidth: 1, borderColor: Neo.colors.neutral[200] }}
                                                placeholder={t('addProfile.breedPH')}
                                                value={raca} onChangeText={setRaca}
                                            />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Small style={{ fontWeight: 'bold', marginBottom: 6 }}>{t('addProfile.microchip')}</Small>
                                            <TextInput
                                                style={{ backgroundColor: Neo.colors.neutral[100], borderRadius: 8, padding: 10, borderWidth: 1, borderColor: Neo.colors.neutral[200] }}
                                                placeholder={t('addProfile.optional')}
                                                value={chip} onChangeText={setChip}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Neo.colors.neutral[100], padding: 12, borderRadius: 12 }}>
                                        <Small style={{ fontWeight: 'bold' }}>{t('addProfile.neutered')}</Small>
                                        <Switch
                                            trackColor={{ false: Neo.colors.neutral[300], true: Neo.colors.primary[300] }}
                                            thumbColor={castrado ? Neo.colors.primary[500] : Neo.colors.neutral[100]}
                                            onValueChange={setCastrado}
                                            value={castrado}
                                        />
                                    </View>
                                </View>
                            )}

                            <Small style={{ fontWeight: 'bold', marginBottom: 8 }}>{tipo === 'pet' ? 'Comorbidades e Deficiências (Opcional)' : t('addProfile.conditions')}</Small>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                                {tipo === 'humano' ? humanConditions.map(c => {
                                    const active = condicoes.includes(c);
                                    return (
                                        <TouchableOpacity key={c} onPress={() => {
                                            if (active) setCondicoes(condicoes.filter(i => i !== c));
                                            else setCondicoes([...condicoes, c]);
                                        }}
                                            style={{
                                                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
                                                backgroundColor: active ? Neo.colors.primary[100] : Neo.colors.neutral[100],
                                                borderWidth: 1, borderColor: active ? Neo.colors.primary[500] : Neo.colors.neutral[200]
                                            }}>
                                            <Small style={{ color: active ? Neo.colors.primary[700] : Neo.colors.neutral[600] }}>{c}</Small>
                                        </TouchableOpacity>
                                    );
                                }) : petConditions.map(c => {
                                    const active = necessidadesEspeciais.includes(c.id);
                                    return (
                                        <TouchableOpacity key={c.id} onPress={() => {
                                            if (active) setNecessidadesEspeciais(necessidadesEspeciais.filter(i => i !== c.id));
                                            else setNecessidadesEspeciais([...necessidadesEspeciais, c.id]);
                                        }}
                                            style={{
                                                paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
                                                backgroundColor: active ? Neo.colors.primary[100] : Neo.colors.neutral[100],
                                                borderWidth: 1, borderColor: active ? Neo.colors.primary[500] : Neo.colors.neutral[200]
                                            }}>
                                            <Small style={{ color: active ? Neo.colors.primary[700] : Neo.colors.neutral[600] }}>{c.label}</Small>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            <Small style={{ fontWeight: 'bold', marginBottom: 8 }}>{t('addProfile.notes')}</Small>
                            <TextInput
                                style={{
                                    backgroundColor: Neo.colors.neutral[100], borderRadius: 12, padding: 12,
                                    height: 80, textAlignVertical: 'top', borderWidth: 1, borderColor: Neo.colors.neutral[200]
                                }}
                                placeholder={t('addProfile.notesPH')}
                                multiline
                                value={alergias}
                                onChangeText={setAlergias}
                            />
                        </NeoCard>

                        {/* Emergency Contacts */}
                        <NeoCard variant="elevated" style={{ padding: 16, marginBottom: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                                <View style={{ padding: 8, borderRadius: 8, backgroundColor: Neo.colors.primary[100], marginRight: 12 }}>
                                    <NeoIcon name="Profile2User" size={20} color={Neo.colors.primary[600]} />
                                </View>
                                <H3>{t('headersFirst.redeDeApoioSOS', 'Rede de Apoio (SOS)')}</H3>
                            </View>

                            <Small style={{ color: Neo.colors.neutral[500], marginBottom: 12 }}>
                                {t('addProfile.sosHelp')}
                            </Small>

                            {(contatos || []).map((c, idx) => (
                                <View key={idx} style={{
                                    flexDirection: 'row', alignItems: 'center', backgroundColor: Neo.colors.neutral[50],
                                    padding: 10, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: Neo.colors.neutral[100]
                                }}>
                                    <View style={{ flex: 1 }}>
                                        <Body style={{ fontWeight: 'bold' }}>{c.nome}</Body>
                                        <Small style={{ color: Neo.colors.neutral[500] }}>{c.telefone}</Small>
                                    </View>
                                    <TouchableOpacity onPress={() => setContatos(contatos.filter((_, i) => i !== idx))}>
                                        <NeoIcon name="Trash" size={20} color={Neo.colors.feedback.error} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <View style={{ marginTop: 12, padding: 12, borderRadius: 12, borderWidth: 1, borderStyle: 'dashed', borderColor: Neo.colors.neutral[300] }}>
                                <TextInput
                                    placeholder={t('addProfile.contactName')}
                                    value={newContactName}
                                    onChangeText={setNewContactName}
                                    style={{ borderBottomWidth: 1, borderColor: Neo.colors.neutral[200], paddingVertical: 6, marginBottom: 8 }}
                                />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput
                                        placeholder={t('addProfile.contactPhone')}
                                        value={newContactPhone}
                                        onChangeText={setNewContactPhone}
                                        keyboardType="phone-pad"
                                        style={{ flex: 1, borderBottomWidth: 1, borderColor: Neo.colors.neutral[200], paddingVertical: 6, marginRight: 10 }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (newContactName && newContactPhone) {
                                                setContatos([...contatos, { nome: newContactName, telefone: newContactPhone }]);
                                                setNewContactName('');
                                                setNewContactPhone('');
                                            } else {
                                                NeoAlert.alert(t('addProfile.error'), t('addProfile.fillBoth'));
                                            }
                                        }}
                                        style={{ backgroundColor: Neo.colors.primary[500], paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}
                                    >
                                        <Small style={{ color: Neo.colors.neutral.white, fontWeight: 'bold' }}>{t('addProfile.addContact')}</Small>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </NeoCard>

                        {/* Save Button */}
                        <TouchableOpacity onPress={handleSave} style={{ marginTop: 12, marginBottom: 40 }}>
                            <NeoCard variant="elevated" style={{ backgroundColor: Neo.colors.primary[500], alignItems: 'center', padding: 18 }}>
                                <H3 style={{ color: Neo.colors.neutral.white }}>{editingProfile ? t('addProfile.saveChanges') : t('addProfile.createProfile')}</H3>
                            </NeoCard>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = {
    dateInput: {
        flex: 1,
        backgroundColor: Neo.colors.neutral[100],
        borderRadius: 8,
        padding: 12,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
};