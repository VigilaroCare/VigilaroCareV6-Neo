import React, { useState, useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, ScrollView, TouchableOpacity, Modal, TextInput, Linking, Text, Platform, Share, ActivityIndicator, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getEmergencyLocation } from '../../utils/getEmergencyLocation';
import * as Clipboard from 'expo-clipboard';
// Storage roteia chaves sensíveis (PII/saúde) pro SecureStore criptografado
// e o restante pro AsyncStorage — ver utils/SecureStorage.js.
import { Storage } from '../../utils/SecureStorage';
import ProfileService from '../../services/ProfileService';
import HealthService from '../../services/HealthService';

// Neo Design (Custom Red Theme for SOS)
import Theme, { Neo } from '../../utils/Theme';
import NeoCard from '../../components/NeoCard';
import ScaleButton from '../../components/ScaleButton';
import NeoText, { H1, H2, H3, Body, Small } from '../../components/NeoTypography';
import { useTranslation } from 'react-i18next';

// ─── Helper: gerar Ficha Médica de Emergência ──────────────────────────────
async function generateMedicalCard(locationCoords) {
    try {
        const profile = await ProfileService.getPerfilAtivo();
        if (!profile) return null;

        const moradia = await ProfileService.getMoradia();
        let healthData = null;
        try {
            healthData = await HealthService.getHealthSummary(profile.id);
        } catch (e) { /* saúde opcional */ }

        // Dados do perfil
        const nome = profile.nome || 'Não informado';
        const idade = profile.idade || '—';
        const sexo = profile.sexo === 'M' ? 'Masculino' : profile.sexo === 'F' ? 'Feminino' : profile.sexo || '—';
        const tipoSanguineo = profile.tipoSanguineo || profile.tipo_sanguineo || '—';
        const alergias = profile.alergias || profile.alergia || '—';
        const condicoes = profile.condicoesEspeciais || profile.condicoes || '';

        // Medicamentos
        let medsText = 'Nenhum cadastrado';
        if (healthData?.medications?.length > 0) {
            medsText = healthData.medications
                .map(m => `• ${m.nome || m.name}${m.dosagem ? ` (${m.dosagem})` : ''}${m.frequencia ? `, ${m.frequencia}` : ''}`)
                .join('\n');
        }

        // Localização
        let locationText = '';
        if (locationCoords) {
            locationText = `\n📍 LOCALIZAÇÃO:\nhttps://maps.google.com/?q=${locationCoords.latitude},${locationCoords.longitude}`;
        }

        // Endereço da moradia
        let enderecoText = '';
        if (moradia) {
            const parts = [];
            if (moradia.endereco) parts.push(moradia.endereco);
            if (moradia.cidade) parts.push(moradia.cidade);
            if (moradia.estado) parts.push(moradia.estado);
            if (moradia.tipo) parts.push(`(${moradia.tipo})`);
            if (moradia.andar) parts.push(`${moradia.andar}º andar`);
            if (parts.length > 0) enderecoText = `\n🏠 ENDEREÇO: ${parts.join(', ')}`;
        }

        const ficha = `🚨 *FICHA MÉDICA DE EMERGÊNCIA* 🚨\n\n` +
            `👤 *PACIENTE:* ${nome}\n` +
            `📅 *IDADE:* ${idade} anos\n` +
            `⚧ *SEXO:* ${sexo}\n` +
            `🩸 *TIPO SANGUÍNEO:* ${tipoSanguineo}${enderecoText}${locationText}\n\n` +
            `⚠️ *ALERGIAS:* ${alergias}\n\n` +
            `💊 *MEDICAMENTOS EM USO:*\n${medsText}\n` +
            `${condicoes ? `\n🏥 *CONDIÇÕES ESPECIAIS:*\n${condicoes}\n` : ''}\n` +
            `_Gerado por Vigilaro Care - ${new Date().toLocaleString('pt-BR')}_`;

        return ficha;
    } catch (e) {
        console.error('Erro ao gerar ficha médica:', e);
        return null;
    }
}

import AppBackground from '../../components/AppBackground';
import NeoAlert from '../../utils/NeoAlert';

export default function SOSEmergencyModeScreenNeo({ navigation, route }) {
    const { t, i18n } = useTranslation('common');
    const [activeTab, setActiveTab] = useState('HUMAN'); // HUMAN | PET
    const [customContacts, setCustomContacts] = useState([]);
    const [contactsModalVisible, setContactsModalVisible] = useState(false);
    const [addContactModalVisible, setAddContactModalVisible] = useState(false);
    const [fichaModalVisible, setFichaModalVisible] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');
    const [isOffline, setIsOffline] = useState(false);
    const [fichaTexto, setFichaTexto] = useState('');
    const [loadingFicha, setLoadingFicha] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [hasPets, setHasPets] = useState(false); // Novo controle
    const sosTimer = useRef(null);
    const longPressTriggered = useRef(false);
    // i18n is defined at the top of the component

    const isPtBr = i18n.language === 'pt-BR';

    useEffect(() => {
        if (route?.params?.initialTab === 'pets') setActiveTab('PET');
        loadContacts();
        captureLocation();
        checkPetsProfile();

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });
        return () => unsubscribe();
    }, [route?.params]);

    // Capturar localização proativamente ao abrir SOS — com timeout + fallback
    // de última posição conhecida (o socorro nunca espera o GPS; item G33).
    const captureLocation = async () => {
        const coords = await getEmergencyLocation();
        if (coords) setLastLocation(coords);
    };

    const checkPetsProfile = async () => {
        try {
            const pets = await ProfileService.getPets(); // Busca perfis tipo 'pet' da residência ativa
            if (pets && pets.length > 0) {
                setHasPets(true);
            } else {
                setHasPets(false);
                if (activeTab === 'PET') setActiveTab('HUMAN'); // Fallback se não tiver pet
            }
        } catch (e) {
            console.log('Error checking pets:', e);
        }
    };

    const loadContacts = async () => {
        try {
            const json = await Storage.getItem('@emergency_contacts');
            const manual = json ? JSON.parse(json) : [];
            const profile = await ProfileService.getPerfilAtivo();
            const profileContacts = profile?.contatos?.map(c => ({
                id: `prof_${c.nome}`, name: c.nome, phone: c.telefone, isProfile: true
            })) || [];

            const unified = [...manual];
            profileContacts.forEach(pc => {
                if (!unified.some(u => u.phone === pc.phone)) unified.push(pc);
            });
            setCustomContacts(unified);
        } catch (e) { console.error(e); }
    };

    const handleCall = (number) => Linking.openURL(`tel:${number}`);

    const handleSOS = async () => {
        if (customContacts.length === 0) {
            NeoAlert.alert('Sem contatos', 'Adicione contatos de emergência para usar o SOS.');
            return;
        }

        let locationText = '';
        const coords = lastLocation;
        if (coords) {
            locationText = ` Estou em: https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
        }

        const message = `SOS! Preciso de ajuda urgente.${locationText} (Mensagem automática Vigilaro)`;
        const phones = customContacts.map(c => c.phone).join(Platform.OS === 'ios' ? '&' : ';');
        const separator = Platform.OS === 'ios' ? '&' : '?';

        Linking.openURL(`sms:${phones}${separator}body=${encodeURIComponent(message)}`);
    };

    // ── Gerar e exibir Ficha Médica ──
    const handleFichaMedica = async () => {
        setLoadingFicha(true);
        const ficha = await generateMedicalCard(lastLocation);
        setLoadingFicha(false);
        if (ficha) {
            setFichaTexto(ficha);
            setFichaModalVisible(true);
        } else {
            NeoAlert.alert('Erro', 'Não foi possível gerar a ficha. Verifique se há um perfil ativo cadastrado.');
        }
    };

    const handleShareFichaWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(fichaTexto)}`;
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                // Fallback para esquema direto se a URL wa.me sem número falhar em alguns ambientes
                const fallback = `whatsapp://send?text=${encodeURIComponent(fichaTexto)}`;
                Linking.openURL(fallback).catch(() => {
                    NeoAlert.alert('WhatsApp', 'WhatsApp não instalado. Use "Copiar" para colar manualmente.');
                });
            }
        });
    };

    const handleWhatsAppDirect = (phone) => {
        if (!phone) return;

        // 1. Limpa tudo que não é número
        let clean = phone.replace(/\D/g, '');

        // 2. Extrai DDD do perfil do usuário como fallback
        // Bug fix: primaryProfile não estava definido — usar default 11 (SP)
        let userDDD = "11";
        
        // 3. Lógica de correção inteligente (Fuzzy)
        let finalPhone = clean;
        
        // Se começar com 0, remove (ex: 011 -> 11)
        if (finalPhone.startsWith('0')) {
            finalPhone = finalPhone.substring(1);
        }

        if (finalPhone.length === 8 || finalPhone.length === 9) {
            // Apenas o número local -> Adiciona DDI 55 + DDD do usuário
            finalPhone = `55${userDDD}${finalPhone}`;
        } else if (finalPhone.length === 10 || finalPhone.length === 11) {
            // DDD + Número -> Adiciona DDI 55
            finalPhone = `55${finalPhone}`;
        } else if (finalPhone.length >= 12) {
            // Já parece ter DDI, apenas garante que não tem o +
            finalPhone = finalPhone;
        }
        
        // 4. Usa o link oficial wa.me para maior compatibilidade
        const message = "🚨 ALERTA VIGILARO CARE: Preciso de ajuda urgente!";
        const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
        
        Vibration.vibrate(50);
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                const fallbackUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
                Linking.openURL(fallbackUrl).catch(() => {
                    NeoAlert.alert('Erro', 'WhatsApp não está instalado ou configurado.');
                });
            }
        });
    };

    const handleCopyFicha = async () => {
        try {
            await Clipboard.setStringAsync(fichaTexto);
            NeoAlert.alert('Copiado', 'Ficha médica copiada. Cole em qualquer app de mensagem.');
        } catch (e) {
            NeoAlert.alert('Erro', 'Não foi possível copiar.');
        }
    };

    const handleShareFicha = async () => {
        try {
            await Share.share({ message: fichaTexto, title: 'Ficha Médica de Emergência' });
        } catch (e) { console.error(e); }
    };

    return (
        <LinearGradient colors={['#991B1B', '#450A0A']} style={{ flex: 1 }}>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1 }}>
                <StatusBar style="light" />

                {/* Offline Banner */}
                {isOffline && (
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <NeoIcon name="CloudCross" size={16} color="#FFF" />
                        <Small style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 8 }}>
                            {t('sos.noInternet')}
                        </Small>
                    </View>
                )}

                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 }}>
                    <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '800', letterSpacing: 1.5, opacity: 0.9 }}>
                        {t('sos.title', 'MODO EMERGÊNCIA').toUpperCase()}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('MainTabs')}
                        style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <NeoIcon name="CloseSquare" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>

                {/* Tab Switcher */}
                <View style={{ alignItems: 'center', marginBottom: 24 }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 30, padding: 4 }}>
                        {(hasPets ? ['HUMAN', 'PET'] : ['HUMAN']).map(tab => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    style={{
                                        paddingVertical: 10, paddingHorizontal: 32, borderRadius: 26,
                                        backgroundColor: isActive ? '#FFF' : 'transparent',
                                        flexDirection: 'row', alignItems: 'center'
                                    }}
                                >
                                    {tab === 'HUMAN' && <Text style={{ fontSize: 16, marginRight: 6 }}>🚑</Text>}
                                    {tab === 'PET' && <NeoIcon name="Heart" size={16} color={isActive ? '#991B1B' : 'rgba(255,255,255,0.6)'} variant="Bold" style={{ marginRight: 6 }} />}
                                    <Small style={{ color: isActive ? '#991B1B' : 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>
                                        {tab === 'HUMAN' ? 'Humano' : 'Pet'}
                                    </Small>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                    
                    {/* Hero SOS Graphic */}
                    <View style={{ alignItems: 'center', marginVertical: 16 }}>
                        <View style={{ width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#FF4B4B', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
                                    <H2 style={{ color: '#FFF', fontSize: 20 }}>SOS</H2>
                                </View>
                            </View>
                        </View>
                        <H1 style={{ color: '#FFF', fontSize: 32, textAlign: 'center', marginTop: 16, marginBottom: 8 }}>
                            Precisa de ajuda agora?
                        </H1>
                        <Body style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 15, lineHeight: 22, paddingHorizontal: 16 }}>
                            Acionaremos seus contatos de emergência com sua localização atual.
                        </Body>
                    </View>

                    {/* Primary Button */}
                    <TouchableOpacity 
                        onPress={() => handleCall(isPtBr ? t('sos.samuPhone', '192') : t('sos.generalPhone', '911'))}
                        style={{ width: '100%', backgroundColor: '#FFF', borderRadius: 24, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 5 }}
                    >
                        <NeoIcon name="CallCalling" size={24} color="#991B1B" variant="Bold" style={{ marginRight: 12 }} />
                        <H2 style={{ color: '#991B1B', fontSize: 20 }}>
                            {activeTab === 'HUMAN' 
                                ? (isPtBr ? 'Ligar 192 • SAMU' : 'Ligar 911 • Emergência') 
                                : 'Ligar Veterinário'}
                        </H2>
                    </TouchableOpacity>

                    {/* Secondary Actions Row */}
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
                        {/* Filha / First Contact */}
                        <TouchableOpacity 
                            onPress={() => {
                                if (customContacts.length > 0) {
                                    handleCall(customContacts[0].phone);
                                } else {
                                    setContactsModalVisible(true);
                                }
                            }}
                            style={{ flex: 1, marginRight: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <NeoIcon name="Profile" size={24} color="#FFF" style={{ marginBottom: 8 }} />
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                                {customContacts.length > 0 ? customContacts[0].name.split(' ')[0] : 'Contatos'}
                            </Body>
                        </TouchableOpacity>

                        {/* Send Location */}
                        <TouchableOpacity 
                            onPress={handleSOS}
                            style={{ flex: 1, marginLeft: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <NeoIcon name="Location" size={24} color="#FFF" style={{ marginBottom: 8 }} />
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                                Enviar local
                            </Body>
                        </TouchableOpacity>
                    </View>

                    {/* Tertiary Action */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('PrimeirosSocorros')}
                        style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                        <NeoIcon name="Warning2" size={20} color="#FFF" style={{ marginRight: 10 }} />
                        <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
                            {t('sos.firstAid', 'Primeiros socorros guiados')}
                        </Body>
                    </TouchableOpacity>

                    {/* CIATOX — Emergência toxicológica (apenas tab Humano) */}
                    {activeTab === 'HUMAN' && (
                        <TouchableOpacity 
                            onPress={() => handleCall('08007226001')}
                            activeOpacity={0.85}
                            style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 16, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                                <NeoIcon name="Call" size={20} color="#FFF" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                                    {t('sos.ciatoxTitle', 'CIATOX — Intoxicação')}
                                </Body>
                                <Small style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                                    {t('sos.ciatoxNumber', '0800 722 6001 · Gratuito 24h')}
                                </Small>
                            </View>
                            <NeoIcon name="Call" size={18} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                    )}

                    {/* Safe Exit */}
                    <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={{ paddingVertical: 10 }}>
                        <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>
                            {t('sos.safeExit', 'Estou seguro • cancelar')}
                        </Body>
                    </TouchableOpacity>

                </ScrollView>

                {/* ═══ MODAL: FICHA MÉDICA (Refinado para combinar) ═══ */}
                <Modal visible={fichaModalVisible} transparent animationType="slide" onRequestClose={() => setFichaModalVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, maxHeight: '85%' }}>
                            {/* Header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <NeoIcon name="Personalcard" size={28} color="#991B1B" style={{ marginRight: 12 }} />
                                    <H2 style={{ color: '#991B1B', fontSize: 20 }}>{t('headersFirst.fichaMDica', 'Ficha Médica')}</H2>
                                </View>
                                <TouchableOpacity onPress={() => setFichaModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={32} color={Neo.colors.neutral[300]} />
                                </TouchableOpacity>
                            </View>

                            {/* Conteúdo da ficha */}
                            <ScrollView style={{ marginBottom: 24, maxHeight: 300 }}>
                                <View style={{ backgroundColor: Neo.colors.neutral[50], borderRadius: 16, padding: 20, borderWidth: 1, borderColor: Neo.colors.neutral[200] }}>
                                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 13, color: '#1F2937', lineHeight: 22 }}>
                                        {fichaTexto}
                                    </Text>
                                </View>
                            </ScrollView>

                            {/* Ações */}
                            <View>
                                <TouchableOpacity onPress={handleShareFichaWhatsApp} style={{ backgroundColor: '#25D366', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                                    <NeoIcon name="Whatsapp" size={24} color="#FFF" style={{ marginRight: 12 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Enviar por WhatsApp</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCopyFicha} style={{ backgroundColor: Neo.colors.neutral[800], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                                    <NeoIcon name="Copy" size={24} color="#FFF" style={{ marginRight: 12 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Copiar Ficha</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleShareFicha} style={{ backgroundColor: Neo.colors.neutral[200], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16 }}>
                                    <NeoIcon name="ShareNetwork" size={24} color={Neo.colors.neutral[800]} style={{ marginRight: 12 }} />
                                    <Text style={{ color: Neo.colors.neutral[800], fontWeight: 'bold', fontSize: 16 }}>Compartilhar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Contacts Modal (Refinado) */}
                <Modal visible={contactsModalVisible} transparent animationType="slide" onRequestClose={() => setContactsModalVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, maxHeight: '85%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <H2 style={{ color: '#1A1A1A' }}>{t('headersFirst.meusContatos', 'Meus Contatos')}</H2>
                                <TouchableOpacity onPress={() => setContactsModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={32} color={Neo.colors.neutral[300]} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView showsVerticalScrollIndicator={false}>
                                {customContacts.map(c => (
                                    <View key={c.id} style={{ marginBottom: 16 }}>
                                        <NeoCard variant="elevated" style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: Neo.colors.neutral[100] }}>
                                            <View style={{ padding: 12, backgroundColor: Neo.colors.neutral[50], borderRadius: 20, marginRight: 16 }}>
                                                <NeoIcon name={c.isProfile ? "SecurityUser" : "Profile"} size={24} color={Neo.colors.neutral[800]} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Body style={{ fontWeight: 'bold', fontSize: 16, color: '#1A1A1A' }}>{c.name}</Body>
                                                <Small style={{ color: Neo.colors.neutral[500], marginTop: 2 }}>{c.phone}</Small>
                                                {c.isProfile && <Small style={{ color: Neo.colors.primary[500], fontSize: 10, marginTop: 4 }}>Rede de Apoio Perfil</Small>}
                                            </View>
                                            
                                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                                <TouchableOpacity onPress={() => handleWhatsAppDirect(c.phone)} style={{ padding: 10, backgroundColor: '#E8F5E9', borderRadius: 14 }}>
                                                    <NeoIcon name="Whatsapp" size={24} color="#25D366" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleCall(c.phone)} style={{ padding: 10, backgroundColor: '#FEF2F2', borderRadius: 14 }}>
                                                    <NeoIcon name="Call" size={24} color="#DC2626" />
                                                </TouchableOpacity>
                                            </View>
                                        </NeoCard>
                                    </View>
                                ))}
                                
                                {customContacts.length === 0 && (
                                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[400], marginVertical: 32 }}>Nenhum contato tático cadastrado.</Body>
                                )}

                                <TouchableOpacity style={{ marginTop: 8, marginBottom: 32 }} onPress={() => setAddContactModalVisible(true)}>
                                    <NeoCard variant="glass" style={{ backgroundColor: Neo.colors.neutral[50], alignItems: 'center', padding: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: Neo.colors.neutral[300], borderRadius: 20 }}>
                                        <Body style={{ color: Neo.colors.neutral[600], fontWeight: 'bold' }}>+ Adicionar Novo</Body>
                                    </NeoCard>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* Add Contact Modal */}
                <Modal visible={addContactModalVisible} transparent animationType="fade">
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '85%', backgroundColor: '#FFF', borderRadius: 24, padding: 32 }}>
                            <H3 style={{ marginBottom: 24, color: '#1A1A1A' }}>{t('headersFirst.novoContato', 'Novo Contato')}</H3>
                            <TextInput
                                placeholder="Nome (Ex: Filha Ana)" value={newContactName} onChangeText={setNewContactName}
                                style={{ borderWidth: 1, borderColor: Neo.colors.neutral[200], padding: 16, borderRadius: 16, marginBottom: 16, fontSize: 16, backgroundColor: Neo.colors.neutral[50] }}
                            />
                            <TextInput
                                placeholder="Telefone" value={newContactPhone} onChangeText={setNewContactPhone} keyboardType="phone-pad"
                                style={{ borderWidth: 1, borderColor: Neo.colors.neutral[200], padding: 16, borderRadius: 16, marginBottom: 32, fontSize: 16, backgroundColor: Neo.colors.neutral[50] }}
                            />
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <TouchableOpacity style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: Neo.colors.neutral[100], borderRadius: 16 }} onPress={() => setAddContactModalVisible(false)}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[600] }}>Cancelar</Body>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: '#991B1B', borderRadius: 16 }} onPress={() => {
                                    if (newContactName && newContactPhone) {
                                        const novaLista = [...customContacts, { id: Date.now().toString(), name: newContactName, phone: newContactPhone }];
                                        setCustomContacts(novaLista);
                                        Storage.setItem('@emergency_contacts', JSON.stringify(novaLista));
                                        setAddContactModalVisible(false);
                                        setNewContactName(''); setNewContactPhone('');
                                    }
                                }}>
                                    <Body style={{ color: '#FFF', fontWeight: 'bold' }}>Salvar</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </LinearGradient>
    );
}
