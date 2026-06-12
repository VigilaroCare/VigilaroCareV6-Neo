import React, { useState, useEffect, useRef } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, ScrollView, TouchableOpacity, Modal, TextInput, Linking, Text, Platform, Share, ActivityIndicator, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
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

    // Square Card Component (Grid) - CENTERED
    const SquareCard = ({ title, subtitle, iconNode, color, bgColor, onPress, fullWidth }) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                width: fullWidth ? '100%' : '48%',
                marginBottom: 10
            }}
        >
            <NeoCard variant="elevated" style={{
                backgroundColor: bgColor || '#FFFFFF',
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.06)',
                borderRadius: 20,
                padding: 12,
                height: 125,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{
                    width: 48, height: 48, borderRadius: 24,
                    backgroundColor: color, alignItems: 'center', justifyContent: 'center', marginBottom: 8
                }}>
                    {iconNode}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <H3 style={{ fontSize: 16, color: color, marginBottom: 2, textAlign: 'center' }}>{title}</H3>
                    <Small style={{ color: '#666', fontSize: 11, textAlign: 'center' }}>{subtitle}</Small>
                </View>
            </NeoCard>
        </TouchableOpacity>
    );

    return (
        <AppBackground>
            <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: 'transparent' }}>
                <StatusBar style="dark" />

                {/* Offline Banner */}
                {isOffline && (
                    <View style={{ backgroundColor: '#000', padding: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <NeoIcon name="CloudCross" size={20} color="#FFD700" />
                        <Body style={{ color: '#FFD700', fontWeight: 'bold', fontSize: 13, textAlign: 'center' }}>
                            {t('sos.noInternet')}
                        </Body>
                    </View>
                )}

                {/* Header */}
                <View style={{ alignItems: 'center', paddingVertical: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <NeoIcon name="Warning2" size={32} color="#DC2626" style={{ marginRight: 8 }} />
                        <H2 style={{ color: '#DC2626', fontSize: 24, letterSpacing: 1 }}>{t('sos.title')}</H2>
                    </View>

                    {/* Tab Switcher */}
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 30, padding: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        {(hasPets ? ['HUMAN', 'PET'] : ['HUMAN']).map(tab => {
                            const isActive = activeTab === tab;
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    style={{
                                        paddingVertical: 10, paddingHorizontal: 32, borderRadius: 26,
                                        backgroundColor: isActive ? '#DC2626' : 'transparent',
                                        flexDirection: 'row', alignItems: 'center'
                                    }}
                                >
                                    <NeoIcon name={tab === 'HUMAN' ? 'User' : 'Heart'} size={16} color={isActive ? '#FFF' : '#DC2626'} variant="Bold" style={{ marginRight: 6 }} />
                                    <Small style={{ color: isActive ? '#FFF' : '#DC2626', fontWeight: 'bold' }}>
                                        {tab === 'HUMAN' ? 'Pessoas' : 'Pets'}
                                    </Small>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 190 }} showsVerticalScrollIndicator={false}>
                    {/* 6. PRIMEIROS SOCORROS PROTAGONISTA */}
                    <ScaleButton onPress={() => navigation.navigate('PrimeirosSocorrosEmergencia')} style={{ marginBottom: 16 }}>
                        <NeoCard variant="elevated" style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.06)',
                            borderRadius: 20,
                            alignItems: 'center',
                            paddingVertical: 12,
                        }}>
                            <View style={{
                                width: 44, height: 44, borderRadius: 22,
                                backgroundColor: '#FFEBEE', alignItems: 'center',
                                justifyContent: 'center', marginBottom: 6
                            }}>
                                <NeoIcon name="HeartAdd" size={22} color="#D32F2F" variant="Outline" />
                            </View>
                            <H3 style={{ color: '#D32F2F', fontSize: 15 }}>{t('sos.firstAid')}</H3>
                            <Small style={{ color: Neo.colors.neutral[500], fontSize: 10 }}>{t('sos.firstAidSub')}</Small>
                        </NeoCard>
                    </ScaleButton>

                    {activeTab === 'HUMAN' ? (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {isPtBr ? (
                                <>
                                    {/* SAMU */}
                                    <SquareCard
                                        title={t('sos.samuTitle')}
                                        subtitle={t('sos.samuSub')}
                                        color="#EF4444"
                                        bgColor="#FEF2F2"
                                        iconNode={<NeoIcon name="CallCalling" size={28} color="#FFF" variant="Bold" />}
                                        onPress={() => handleCall(t('sos.samuPhone'))}
                                    />
                                    {/* Bombeiros */}
                                    <SquareCard
                                        title={t('sos.fireTitle')}
                                        subtitle={t('sos.fireSub')}
                                        color="#F97316"
                                        bgColor="#FFF7ED"
                                        iconNode={<NeoIcon name="Danger" size={32} color="#FFF" />}
                                        onPress={() => handleCall(t('sos.firePhone'))}
                                    />
                                    {/* Polícia */}
                                    <SquareCard
                                        title={t('sos.policeTitle')}
                                        subtitle={t('sos.policeSub')}
                                        color="#3B82F6"
                                        bgColor="#EFF6FF"
                                        iconNode={<NeoIcon name="Shield" size={28} color="#FFF" variant="Bold" />}
                                        onPress={() => handleCall(t('sos.policePhone'))}
                                    />
                                    {/* CIATOX */}
                                    <SquareCard
                                        title={t('sos.toxTitle')}
                                        subtitle={t('sos.toxSub')}
                                        color="#10B981"
                                        bgColor="#ECFDF5"
                                        iconNode={<NeoIcon name="Danger" size={28} color="#FFF" variant="Bold" />}
                                        onPress={() => handleCall(t('sos.toxPhone'))}
                                    />
                                </>
                            ) : (
                                <>
                                    {/* Emergência Unificada (911/112) */}
                                    <SquareCard
                                        title={t('sos.generalTitle')}
                                        subtitle={t('sos.generalSub')}
                                        color="#EF4444"
                                        bgColor="#FEF2F2"
                                        iconNode={<NeoIcon name="CallCalling" size={28} color="#FFF" variant="Bold" />}
                                        onPress={() => handleCall(t('sos.generalPhone'))}
                                        fullWidth
                                    />
                                    {/* Toxicologia */}
                                    <SquareCard
                                        title={t('sos.toxTitle')}
                                        subtitle={t('sos.toxSub')}
                                        color="#10B981"
                                        bgColor="#ECFDF5"
                                        iconNode={<NeoIcon name="Danger" size={28} color="#FFF" variant="Bold" />}
                                        onPress={() => handleCall(t('sos.toxPhone'))}
                                        fullWidth
                                    />
                                </>
                            )}
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {/* Veterinário */}
                            <SquareCard
                                title={t('sos.vetTitle')}
                                subtitle={t('sos.vetSub')}
                                color="#059669"
                                bgColor="#ECFDF5"
                                iconNode={<NeoIcon name="Location" size={28} color="#FFF" variant="Bold" />}
                                onPress={() => Linking.openURL('geo:0,0?q=veterinario 24h')}
                                fullWidth
                            />
                            {isPtBr ? (
                                /* Bombeiros BR */
                                <SquareCard
                                    title={t('sos.fireTitle')}
                                    subtitle={t('sos.fireSub')}
                                    color="#F97316"
                                    bgColor="#FFF7ED"
                                    iconNode={<NeoIcon name="Danger" size={32} color="#FFF" />}
                                    onPress={() => handleCall(t('sos.firePhone'))}
                                    fullWidth
                                />
                            ) : null}
                        </View>
                    )}

                    {/* 3 Action Cards em Linha (SOS, Ficha, Contatos) */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                        {/* SOS SMS */}
                        <TouchableOpacity 
                            onPress={() => {
                                if (longPressTriggered.current) {
                                    longPressTriggered.current = false;
                                    return;
                                }
                                handleSOS();
                            }} 
                            onPressIn={() => {
                                longPressTriggered.current = false;
                                sosTimer.current = setTimeout(() => {
                                    longPressTriggered.current = true;
                                    Vibration.vibrate([0, 100, 50, 100]);
                                    navigation.navigate("SOSCountdown");
                                }, 1500); // Reduzido para 1.5s
                            }}
                            onPressOut={() => {
                                if (sosTimer.current) {
                                    clearTimeout(sosTimer.current);
                                    sosTimer.current = null;
                                }
                            }}
                            style={{ width: '31%', aspectRatio: 1 }}
                        >
                            <NeoCard variant="elevated" style={{ flex: 1, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', borderRadius: 16, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                <NeoIcon name="Message" size={28} color="#DC2626" variant="Bold" style={{ marginBottom: 4 }} />
                                <Body style={{ color: '#DC2626', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{t('sos.sendSos')}</Body>
                                <Small style={{ color: '#DC2626', fontSize: 9, textAlign: 'center', marginTop: 2 }}>{t('sos.holdButton')}</Small>
                            </NeoCard>
                        </TouchableOpacity>

                        {/* Ficha Médica */}
                        <TouchableOpacity onPress={handleFichaMedica} disabled={loadingFicha} style={{ width: '31%', aspectRatio: 1 }}>
                            <NeoCard variant="elevated" style={{ flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                {loadingFicha ? <ActivityIndicator size="small" color="#3B82F6" style={{ marginBottom: 8 }} /> : <NeoIcon name="Personalcard" size={28} color="#3B82F6" variant="Outline" style={{ marginBottom: 8 }} />}
                                <Body style={{ color: '#3B82F6', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{t('sos.medCard')} </Body>
                                <Small style={{ color: '#3B82F6', fontSize: 10, textAlign: 'center' }}>{t('sos.medCardSub')}</Small>
                            </NeoCard>
                        </TouchableOpacity>

                        {/* Contatos */}
                        <TouchableOpacity onPress={() => setContactsModalVisible(true)} style={{ width: '31%', aspectRatio: 1 }}>
                            <NeoCard variant="elevated" style={{ flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', padding: 8 }}>
                                <NeoIcon name="Profile" size={28} color="#9333EA" style={{ marginBottom: 8 }} />
                                <Body style={{ color: '#9333EA', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>{t('sos.contacts')}</Body>
                                <Small style={{ color: '#9333EA', fontSize: 10, textAlign: 'center' }}>{customContacts.length} {t('sos.saved')}</Small>
                            </NeoCard>
                        </TouchableOpacity>
                    </View>

                    {/* Exit Button */}
                    <TouchableOpacity onPress={() => navigation.navigate('MainTabs')} style={{ marginTop: 24, marginBottom: 40 }}>
                        <NeoCard variant="elevated" style={{ padding: 16, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA', borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                            <NeoIcon name="Logout" size={24} color="#991B1B" style={{ marginRight: 10 }} />
                            <H3 style={{ color: '#991B1B' }}>{t('sos.exitSOS')}</H3>
                        </NeoCard>
                    </TouchableOpacity>

                </ScrollView>

                {/* ═══ MODAL: FICHA MÉDICA ═══ */}
                <Modal visible={fichaModalVisible} transparent animationType="slide" onRequestClose={() => setFichaModalVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '85%' }}>
                            {/* Header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <NeoIcon name="Personalcard" size={24} color="#DC2626" style={{ marginRight: 8 }} />
                                    <H2 style={{ color: '#DC2626', fontSize: 18 }}>{t('headersFirst.fichaMDica', 'Ficha Médica')}</H2>
                                </View>
                                <TouchableOpacity onPress={() => setFichaModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={32} color={Neo.colors.neutral[400]} />
                                </TouchableOpacity>
                            </View>

                            {/* Conteúdo da ficha */}
                            <ScrollView style={{ marginBottom: 16, maxHeight: 300 }}>
                                <View style={{ backgroundColor: '#FEF2F2', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#FECACA' }}>
                                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, color: '#1F2937', lineHeight: 20 }}>
                                        {fichaTexto}
                                    </Text>
                                </View>
                            </ScrollView>

                            {/* Ações */}
                            <View>
                                {/* WhatsApp */}
                                <TouchableOpacity
                                    onPress={handleShareFichaWhatsApp}
                                    style={{ backgroundColor: '#25D366', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 14, marginBottom: 10 }}
                                >
                                    <NeoIcon name="Whatsapp" size={22} color="#FFF" style={{ marginRight: 10 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>{t('headersFirst.enviarPorWhatsApp', 'Enviar por WhatsApp')}</Text>
                                </TouchableOpacity>

                                {/* Copiar */}
                                <TouchableOpacity
                                    onPress={handleCopyFicha}
                                    style={{ backgroundColor: '#3B82F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 14, marginBottom: 10 }}
                                >
                                    <NeoIcon name="Copy" size={22} color="#FFF" style={{ marginRight: 10 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>{t('headersFirst.copiarFicha', 'Copiar Ficha')}</Text>
                                </TouchableOpacity>

                                {/* Compartilhar genérico */}
                                <TouchableOpacity
                                    onPress={handleShareFicha}
                                    style={{ backgroundColor: '#6B7280', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 14 }}
                                >
                                    <NeoIcon name="ShareNetwork" size={22} color="#FFF" style={{ marginRight: 10 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 15 }}>{t('headersFirst.compartilhar', 'Compartilhar')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Contacts Modal (Simplified) */}
                <Modal visible={contactsModalVisible} transparent animationType="slide" onRequestClose={() => setContactsModalVisible(false)}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}>
                        <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <H2>{t('headersFirst.meusContatos', 'Meus Contatos')}</H2>
                                <TouchableOpacity onPress={() => setContactsModalVisible(false)}>
                                    <NeoIcon name="CloseCircle" size={32} color={Neo.colors.neutral[400]} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView>
                                {customContacts.map(c => (
                                    <View key={c.id} style={{ marginBottom: 12 }}>
                                        <NeoCard variant="glass" style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                                            <View style={{ padding: 10, backgroundColor: Neo.colors.primary[100], borderRadius: 20, marginRight: 12 }}>
                                                <NeoIcon name={c.isProfile ? "SecurityUser" : "Profile"} size={20} color={Neo.colors.primary[600]} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Body style={{ fontWeight: 'bold' }}>{c.name}</Body>
                                                <Small>{c.phone}</Small>
                                                {c.isProfile && <Small style={{ color: Neo.colors.primary[500], fontSize: 9 }}>{t('headersFirst.redeDeApoioPerfil', 'Rede de Apoio Perfil')}</Small>}
                                            </View>
                                            
                                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                                <TouchableOpacity onPress={() => handleWhatsAppDirect(c.phone)} style={{ padding: 8, backgroundColor: '#E8F5E9', borderRadius: 10 }}>
                                                    <NeoIcon name="Whatsapp" size={24} color="#25D366" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleCall(c.phone)} style={{ padding: 8, backgroundColor: '#FFEBEE', borderRadius: 10 }}>
                                                    <NeoIcon name="Call" size={24} color="#DC2626" />
                                                </TouchableOpacity>
                                            </View>
                                        </NeoCard>
                                    </View>
                                ))}
                            </ScrollView>

                            {customContacts.length === 0 ? (
                                <Body style={{ textAlign: 'center', color: '#999', marginVertical: 20 }}>{t('headersFirst.aRedeDeApoioPrioritRiaEstVaziaCadastreCo', 'A rede de apoio prioritária está vazia. Cadastre contatos táticos essenciais.')}</Body>
                            ) : null}

                            <TouchableOpacity style={{ marginTop: 16 }} onPress={() => setAddContactModalVisible(true)}>
                                <NeoCard variant="glass" style={{ backgroundColor: Neo.colors.neutral[100], alignItems: 'center', padding: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CCC' }}>
                                    <Body>{t('headersFirst.AdicionarNovo', '+ Adicionar Novo')}</Body>
                                </NeoCard>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Add Contact Modal */}
                <Modal visible={addContactModalVisible} transparent animationType="fade">
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '85%', backgroundColor: '#FFF', borderRadius: 16, padding: 24 }}>
                            <H3 style={{ marginBottom: 16 }}>{t('headersFirst.novoContato', 'Novo Contato')}</H3>
                            <TextInput
                                placeholder="Nome" value={newContactName} onChangeText={setNewContactName}
                                style={{ borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 12, fontSize: 16 }}
                            />
                            <TextInput
                                placeholder="Telefone" value={newContactPhone} onChangeText={setNewContactPhone} keyboardType="phone-pad"
                                style={{ borderWidth: 1, borderColor: '#DDD', padding: 12, borderRadius: 8, marginBottom: 24, fontSize: 16 }}
                            />
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#EEE', borderRadius: 8 }} onPress={() => setAddContactModalVisible(false)}>
                                    <Body>{t('headersFirst.cancelar', 'Cancelar')}</Body>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, padding: 12, alignItems: 'center', backgroundColor: '#DC2626', borderRadius: 8 }} onPress={() => {
                                    if (newContactName && newContactPhone) {
                                        const novaLista = [...customContacts, { id: Date.now().toString(), name: newContactName, phone: newContactPhone }];
                                        setCustomContacts(novaLista);
                                        Storage.setItem('@emergency_contacts', JSON.stringify(novaLista));
                                        setAddContactModalVisible(false);
                                        setNewContactName(''); setNewContactPhone('');
                                    }
                                }}>
                                    <Body style={{ color: '#FFF', fontWeight: 'bold' }}>{t('headersFirst.salvar', 'Salvar')}</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </AppBackground>
    );
}
