import { useState, useEffect, useRef } from "react";
import NetInfo from '@react-native-community/netinfo';
import { View, ScrollView, TouchableOpacity, Modal, TextInput, Linking, Text, Platform, Share, Vibration, AppState } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import NeoIcon from '../../components/NeoIcon';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { getEmergencyLocationDetailed, LOCATION_STATUS } from '../../utils/getEmergencyLocation';
import LocationStatusPill from '../../components/LocationStatusPill';
import AvisoPaisEmergencia from '../../components/AvisoPaisEmergencia';
import { detectEmergencyCountry } from '../../utils/getEmergencyCountry';
import { getEmergencyNumbersForCountry } from '../../data/emergencyNumbersByCountry';
import { getPoisonControlDial, getPoisonControlLabel, getPaisEmergencia, getNomePais } from '../../utils/emergencyTokens';
import PaisAtualService from '../../services/PaisAtualService';
import * as Clipboard from 'expo-clipboard';
// Storage roteia chaves sensíveis (PII/saúde) pro SecureStore criptografado
// e o restante pro AsyncStorage — ver utils/SecureStorage.js.
import { Storage } from '../../utils/SecureStorage';
import ProfileService from '../../services/ProfileService';
import FichaMedicaService from '../../services/FichaMedicaService';

// Neo Design (Custom Red Theme for SOS)
import { Neo } from "../../utils/Theme";
import NeoCard from '../../components/NeoCard';
import { H1, H2, H3, Body, Small } from "../../components/NeoTypography";
import { useTranslation } from 'react-i18next';

// ─── Helper: gerar Ficha Médica de Emergência ──────────────────────────────

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

    // Numero de emergencia por LOCALIZACAO real, nao pelo idioma escolhido
    // (decisao de produto 2026-07-30 — ver data/emergencyNumbersByCountry.js).
    // Default imediato = Brasil (mercado principal do app), atualiza assim
    // que GPS/regiao do aparelho responderem — nunca deixa o botao sem numero.
    const [emergencyNumbers, setEmergencyNumbers] = useState(() => getEmergencyNumbersForCountry(getPaisEmergencia()));

    // Mesmo raciocinio para o centro de intoxicacao: o botao discava
    // a linha brasileira em qualquer pais. Guardamos o codigo do pais
    // detectado para resolver a linha correta — CIATOX no Brasil, CIAV em
    // Portugal, servico de emergencia geral onde nao ha centro mapeado.
    const [emergencyCountry, setEmergencyCountry] = useState(() => getPaisEmergencia());

    // Estado visivel da localizacao — ver components/LocationStatusPill.js.
    // Comeca em BUSCANDO porque captureLocation() dispara no mount.
    const [locationStatus, setLocationStatus] = useState(LOCATION_STATUS.BUSCANDO);

    useEffect(() => {
        if (route?.params?.initialTab === 'pets') setActiveTab('PET');
        loadContacts();
        captureLocation();
        checkPetsProfile();

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        // Quem toca no indicador bloqueado vai as Definicoes do sistema e
        // volta. Sem isto, o indicador continuaria a dizer "sem localizacao"
        // depois de a permissao ja ter sido concedida la fora — e o utilizador
        // concluiria que o app esta avariado. Consulta sem pedir de novo
        // (pedirPermissao = false): so le o estado atual, nao abre dialogo.
        const appStateSub = AppState.addEventListener('change', (estado) => {
            if (estado === 'active') captureLocation(false);
        });

        return () => {
            unsubscribe();
            appStateSub.remove();
        };
    }, [route?.params]);

    // Capturar localização proativamente ao abrir SOS — com timeout + fallback
    // de última posição conhecida (o socorro nunca espera o GPS; item G33).
    const captureLocation = async (pedirPermissao = true) => {
        setLocationStatus(LOCATION_STATUS.BUSCANDO);
        const { coords, status } = await getEmergencyLocationDetailed(undefined, pedirPermissao);
        if (coords) setLastLocation(coords);
        setLocationStatus(status);

        // Mesma filosofia "nunca trava o SOS": deteccao 100% offline (GPS
        // contra poligono local + regionCode do aparelho), sem chamada de
        // rede. country pode vir null (indeterminado) — o helper ja cai
        // pro fallback generico (112) nesse caso.
        // Com posição: o país onde a pessoa ESTÁ (na dúvida, null → 112).
        // Sem posição: o último país físico conhecido; sem ele, o do aparelho.
        if (coords) PaisAtualService.registrarPosicao(coords);
        const country = coords ? detectEmergencyCountry(coords) : getPaisEmergencia();
        setEmergencyNumbers(getEmergencyNumbersForCountry(country));
        setEmergencyCountry(country);
    };

    /**
     * Toque no indicador de localizacao. A acao muda com o motivo da falta:
     *  - BLOQUEADA     → so as Definicoes do sistema resolvem; pedir de novo
     *                    nao mostraria dialogo nenhum e pareceria que o toque
     *                    nao fez nada.
     *  - SEM_PERMISSAO → ainda da para perguntar; dispara o dialogo.
     *  - INDISPONIVEL  → permissao ok, o GPS e que nao pegou; so tentar outra vez.
     *
     * Nunca bloqueia: e uma acao paralela, o SOS continua disponivel enquanto
     * isto corre (regra de ouro do item G33 — o socorro nao espera o GPS).
     */
    const resolverLocalizacao = async () => {
        if (locationStatus === LOCATION_STATUS.BLOQUEADA) {
            try {
                await Linking.openSettings();
            } catch (_) {
                NeoAlert.alert(
                    t('sos.locationBlockedTitle', 'Localização bloqueada'),
                    t('sos.locationBlockedBody', 'Autorize o acesso à localização nos ajustes do aparelho para que o alerta inclua onde você está.')
                );
            }
            return;
        }
        await captureLocation(true);
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
        } catch (e) { if (__DEV__) console.error(e); }
    };

    const handleCall = async (number) => {
        try {
            await Linking.openURL(`tel:${number}`);
        } catch (e) {
            if (__DEV__) console.warn('Falha ao abrir discador:', e);
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.ligacao', 'Ligacao'), t('telas.SOSEmergencyModeScreenNeo.naoAbriuDiscador', 'Nao foi possivel abrir o discador neste aparelho.'));
        }
    };

    const handleSOS = async () => {
        if (customContacts.length === 0) {
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.semContatos', 'Sem contatos'), t('telas.SOSEmergencyModeScreenNeo.adicioneContatosDeEmergenciaParaUsar', 'Adicione contatos de emergência para usar o SOS.'));
            return;
        }

        let locationText = '';
        const coords = lastLocation;
        if (coords) {
            locationText = ` ${t('telas.SOSEmergencyModeScreenNeo.estouEm', 'Estou em:')} https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
        }

        // A mensagem sai no idioma do app — o da família que a recebe.
        const phones = customContacts.map(c => c.phone).join(Platform.OS === 'ios' ? '&' : ';');
        const separator = Platform.OS === 'ios' ? '&' : '?';

        const messageForSms = `${t('telas.SOSEmergencyModeScreenNeo.sosAjuda', 'SOS! Preciso de ajuda urgente.')}${locationText} (${t('telas.SOSEmergencyModeScreenNeo.sosRodape', 'Vigilaro Care - confirme o envio no app de mensagens')})`;
        const smsUrl = `sms:${phones}${separator}body=${encodeURIComponent(messageForSms)}`;

        try {
            const firstPhone = customContacts[0]?.phone || '';
            const canOpenSms = await Linking.canOpenURL(`sms:${firstPhone}`);
            if (!canOpenSms) {
                NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.smsIndisponivel', 'SMS indisponível'), t('telas.SOSEmergencyModeScreenNeo.naoFoiPossivelAbrirOAplicativo', 'Nao foi possivel abrir o aplicativo de mensagens neste aparelho.'));
                return;
            }
            await Linking.openURL(smsUrl);
        } catch (e) {
            if (__DEV__) console.warn('Falha ao abrir SMS de emergencia:', e);
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.smsIndisponivel', 'SMS indisponível'), t('telas.SOSEmergencyModeScreenNeo.naoFoiPossivelAbrirOAplicativo2', 'Nao foi possivel abrir o aplicativo de mensagens neste aparelho.'));
        }
    };

    // ── Gerar e exibir Ficha Médica ──
    // A ficha vem do FichaMedicaService — fonte única com a tela Minha Saúde.
    // O gerador que vivia aqui lia `profile.condicoesEspeciais`, `profile.
    // condicoes` e `profile.idade`, três campos que o formulário de perfil
    // nunca grava: a ficha entregue ao socorrista saía SEM condições médicas e
    // SEM idade, com o dado correto disponível o tempo todo em
    // HealthService.getHealthSummary().
    const handleFichaMedica = async () => {
        setLoadingFicha(true);
        const dados = await FichaMedicaService.coletar({ coords: lastLocation });
        setLoadingFicha(false);
        if (dados) {
            setFichaTexto(FichaMedicaService.gerarTexto(dados));
            setFichaModalVisible(true);
        } else {
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.erro', 'Erro'), t('telas.SOSEmergencyModeScreenNeo.naoFoiPossivelGerarAFicha', 'Não foi possível gerar a ficha. Verifique se há um perfil ativo cadastrado.'));
        }
    };

    // Em emergência o texto é o caminho rápido — cola em qualquer campo, abre
    // em tela bloqueada. O PDF fica ao lado, para quem precisa do documento.
    const handleFichaPdf = async () => {
        setLoadingFicha(true);
        const r = await FichaMedicaService.compartilharPdf({ coords: lastLocation });
        setLoadingFicha(false);
        if (!r.ok && r.motivo !== 'sem-compartilhamento') {
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.fichaMedica', 'Ficha médica'), t('telas.SOSEmergencyModeScreenNeo.naoFoiPossivelGerarOPdf', 'Não foi possível gerar o PDF agora. Use o texto, que funciona offline.'));
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
                    NeoAlert.alert('WhatsApp', t('telas.SOSEmergencyModeScreenNeo.whatsappNaoInstaladoUseCopiarPara', 'WhatsApp não instalado. Use "Copiar" para colar manualmente.'));
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
        const message = `🚨 ${t('telas.SOSEmergencyModeScreenNeo.mensagemWhatsapp', 'ALERTA VIGILARO CARE: Preciso de ajuda urgente!')}`;
        const url = `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
        
        Vibration.vibrate(50);
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                const fallbackUrl = `https://api.whatsapp.com/send?phone=${finalPhone}&text=${encodeURIComponent(message)}`;
                Linking.openURL(fallbackUrl).catch(() => {
                    NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.erro2', 'Erro'), t('telas.SOSEmergencyModeScreenNeo.whatsappNaoEstaInstaladoOuConfigurado', 'WhatsApp não está instalado ou configurado.'));
                });
            }
        });
    };

    const handleCopyFicha = async () => {
        try {
            await Clipboard.setStringAsync(fichaTexto);
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.copiado', 'Copiado'), t('telas.SOSEmergencyModeScreenNeo.fichaMedicaCopiadaColeEmQualquer', 'Ficha médica copiada. Cole em qualquer app de mensagem.'));
        } catch (e) {
            NeoAlert.alert(t('telas.SOSEmergencyModeScreenNeo.erro3', 'Erro'), t('telas.SOSEmergencyModeScreenNeo.naoFoiPossivelCopiar', 'Não foi possível copiar.'));
        }
    };

    const handleShareFicha = async () => {
        try {
            await Share.share({ message: fichaTexto, title: t('telas.SOSEmergencyModeScreenNeo.fichaMedicaEmergencia', 'Ficha Médica de Emergência') });
        } catch (e) { if (__DEV__) console.error(e); }
    };

    // Numero/label do botao principal: Brasil usa SAMU (sem numero geral
    // unico), resto do mapa usa o "geral" (112/911); pais desconhecido cai
    // no fallback generico ja embutido em emergencyNumbers.
    const primaryEmergencyNumber = emergencyNumbers.samu || emergencyNumbers.geral;
    // Nome do país no idioma do app (o `label` da tabela era só em português).
    const nomePaisSos = getNomePais(emergencyCountry);
    const primaryEmergencyLabel = emergencyNumbers.samu
        ? t('sos.ligarSamu', { numero: emergencyNumbers.samu, defaultValue: 'Ligar {{numero}} • SAMU' })
        : `${t('sos.ligarNumero', { numero: emergencyNumbers.geral, defaultValue: 'Ligar {{numero}}' })}${nomePaisSos ? ` • ${nomePaisSos}` : ''}`;

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
                <View style={{ alignItems: 'center', marginBottom: 14 }}>
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
                                    {/* O seletor diz QUEM e a vitima, nao o meio
                                        de socorro nem um sentimento. Antes:
                                        emoji 🚑 no humano (ambulancia — o
                                        veiculo, nao a pessoa; e emoji cru, que
                                        fura o contrato "todo icone passa pelo
                                        NeoIcon") e coracao no pet. Agora: uma
                                        pessoa e uma pata. */}
                                    <NeoIcon
                                        name={tab === 'HUMAN' ? 'Profile' : 'Pet'}
                                        size={16}
                                        color={isActive ? '#991B1B' : 'rgba(255,255,255,0.6)'}
                                        variant="Bold"
                                        style={{ marginRight: 6 }}
                                    />
                                    <Small style={{ color: isActive ? '#991B1B' : 'rgba(255,255,255,0.6)', fontWeight: 'bold' }}>
                                        {tab === 'HUMAN' ? t('sos.tabHuman', 'Humano') : t('sos.tabPet', 'Pet')}
                                    </Small>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24, alignItems: 'center' }} showsVerticalScrollIndicator={false}>
                    
                    {/* Hero SOS Graphic */}
                    <View style={{ alignItems: 'center', marginVertical: 8 }}>
                        <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: '#FF4B4B', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}>
                                    <H2 style={{ color: '#FFF', fontSize: 20 }}>{t('telas.SOSEmergencyModeScreenNeo.sos', 'SOS')}</H2>
                                </View>
                            </View>
                        </View>
                        <H1 style={{ color: '#FFF', fontSize: 32, textAlign: 'center', marginTop: 10, marginBottom: 6 }}>{t('telas.SOSEmergencyModeScreenNeo.precisaDeAjudaAgora', 'Precisa de ajuda agora?')}</H1>
                        <Body style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: 15, lineHeight: 22, paddingHorizontal: 16 }}>{t('telas.SOSEmergencyModeScreenNeo.acionaremosSeusContatosDeEmergenciaCom', 'Acionaremos seus contatos de emergência com sua localização atual.')}</Body>
                    </View>

                    {/* Primary Button */}
                    <TouchableOpacity
                        onPress={() => handleCall(primaryEmergencyNumber)}
                        style={{ width: '100%', backgroundColor: '#FFF', borderRadius: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 5 }}
                    >
                        <NeoIcon name="CallCalling" size={24} color="#991B1B" variant="Bold" style={{ marginRight: 12 }} />
                        <H2 style={{ color: '#991B1B', fontSize: 20 }}>
                            {activeTab === 'HUMAN'
                                ? primaryEmergencyLabel
                                : t('telas.SOSEmergencyModeScreenNeo.ligarVeterinario', 'Ligar Veterinário')}
                        </H2>
                    </TouchableOpacity>

                    {/* Estado da localizacao — fica imediatamente acima de
                        "Enviar local" de proposito: e a informacao que diz se
                        aquele botao vai levar coordenadas ou so texto. */}
                    <LocationStatusPill
                        status={locationStatus}
                        onPress={resolverLocalizacao}
                        t={t}
                    />
                    {/* De que país são os números acima — e 112 na dúvida. */}
                    <AvisoPaisEmergencia tom="escuro" semBotao style={{ marginBottom: 10 }} />

                    {/* Secondary Actions Row */}
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 10 }}>
                        {/* Filha / First Contact */}
                        <TouchableOpacity 
                            onPress={() => {
                                if (customContacts.length > 0) {
                                    handleCall(customContacts[0].phone);
                                } else {
                                    setContactsModalVisible(true);
                                }
                            }}
                            style={{ flex: 1, marginRight: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <NeoIcon name="Profile" size={24} color="#FFF" style={{ marginBottom: 8 }} />
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                                {customContacts.length > 0 ? customContacts[0].name.split(' ')[0] : t('telas.SOSEmergencyModeScreenNeo.contatos', 'Contatos')}
                            </Body>
                        </TouchableOpacity>

                        {/* Send Location */}
                        <TouchableOpacity 
                            onPress={handleSOS}
                            style={{ flex: 1, marginLeft: 8, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <NeoIcon name="Location" size={24} color="#FFF" style={{ marginBottom: 8 }} />
                            <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{t('telas.SOSEmergencyModeScreenNeo.enviarLocal', 'Enviar local')}</Body>
                        </TouchableOpacity>
                    </View>

                    {/* Tertiary Action */}
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('PrimeirosSocorros')}
                        style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                        <NeoIcon name="Warning2" size={20} color="#FFF" style={{ marginRight: 10 }} />
                        <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>
                            {t('sos.firstAid', 'Primeiros socorros guiados')}
                        </Body>
                    </TouchableOpacity>

                    {/* CIATOX — Emergência toxicológica (Humano e Pet) */}
                    <TouchableOpacity 
                            onPress={() => handleCall(getPoisonControlDial(emergencyCountry))}
                            activeOpacity={0.85}
                            style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 20, paddingVertical: 14, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
                                <NeoIcon name="Call" size={20} color="#FFF" variant="Bold" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Body style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                                    {t('sos.ciatoxTitle', 'CIATOX — Intoxicação')}
                                </Body>
                                <Small style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                                    {t('sos.ciatoxNumber', { defaultValue: '{{poisonControl}} · 24h', poisonControl: getPoisonControlLabel(emergencyCountry) })}
                                </Small>
                            </View>
                            <NeoIcon name="Call" size={18} color="rgba(255,255,255,0.5)" />
                    </TouchableOpacity>

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
                        <View style={{ backgroundColor: 'rgba(22,22,26,0.97)', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 32, maxHeight: '85%' }}>
                            {/* Header */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <NeoIcon name="Personalcard" size={28} color={Neo.colors.feedback.error} style={{ marginRight: 12 }} />
                                    <H2 style={{ color: Neo.colors.feedback.error, fontSize: 20 }}>{t('headersFirst.fichaMDica', 'Ficha Médica')}</H2>
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
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>{t('telas.SOSEmergencyModeScreenNeo.enviarPorWhatsapp', 'Enviar por WhatsApp')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCopyFicha} style={{ backgroundColor: Neo.colors.neutral[800], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                                    <NeoIcon name="Copy" size={24} color="#FFF" style={{ marginRight: 12 }} />
                                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>{t('telas.SOSEmergencyModeScreenNeo.copiarFicha', 'Copiar Ficha')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleShareFicha} style={{ backgroundColor: Neo.colors.neutral[200], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                                    <NeoIcon name="ShareNetwork" size={24} color={Neo.colors.neutral[800]} style={{ marginRight: 12 }} />
                                    <Text style={{ color: Neo.colors.neutral[800], fontWeight: 'bold', fontSize: 16 }}>{t('telas.SOSEmergencyModeScreenNeo.compartilhar', 'Compartilhar')}</Text>
                                </TouchableOpacity>
                                {/* O PDF fica por último de propósito: em emergência o texto
                                    resolve mais rápido. O documento serve ao hospital e ao
                                    médico, não ao primeiro minuto. */}
                                <TouchableOpacity
                                    onPress={handleFichaPdf}
                                    disabled={loadingFicha}
                                    style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: Neo.colors.neutral[400], flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 16, opacity: loadingFicha ? 0.5 : 1 }}
                                >
                                    <NeoIcon name="DocumentText" size={22} color={Neo.colors.neutral[700]} style={{ marginRight: 10 }} />
                                    <Text style={{ color: Neo.colors.neutral[700], fontWeight: '600', fontSize: 15 }}>
                                        {loadingFicha ? 'Gerando PDF...' : t('telas.SOSEmergencyModeScreenNeo.salvarEmPdf', 'Salvar em PDF')}
                                    </Text>
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
                                <H2 style={{ color: Neo.colors.neutral.white }}>{t('headersFirst.meusContatos', 'Meus Contatos')}</H2>
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
                                                {c.isProfile && <Small style={{ color: Neo.colors.primary[500], fontSize: 10, marginTop: 4 }}>{t('telas.SOSEmergencyModeScreenNeo.redeDeApoioPerfil', 'Rede de Apoio Perfil')}</Small>}
                                            </View>
                                            
                                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                                <TouchableOpacity onPress={() => handleWhatsAppDirect(c.phone)} style={{ padding: 10, backgroundColor: 'rgba(37,211,102,0.15)', borderRadius: 14 }}>
                                                    <NeoIcon name="Whatsapp" size={24} color="#25D366" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => handleCall(c.phone)} style={{ padding: 10, backgroundColor: 'rgba(239,68,68,0.12)', borderRadius: 14 }}>
                                                    <NeoIcon name="Call" size={24} color={Neo.colors.feedback.error} />
                                                </TouchableOpacity>
                                            </View>
                                        </NeoCard>
                                    </View>
                                ))}
                                
                                {customContacts.length === 0 && (
                                    <Body style={{ textAlign: 'center', color: Neo.colors.neutral[400], marginVertical: 32 }}>{t('telas.SOSEmergencyModeScreenNeo.nenhumContatoTaticoCadastrado', 'Nenhum contato tático cadastrado.')}</Body>
                                )}

                                <TouchableOpacity style={{ marginTop: 8, marginBottom: 32 }} onPress={() => setAddContactModalVisible(true)}>
                                    <NeoCard variant="glass" style={{ backgroundColor: Neo.colors.neutral[50], alignItems: 'center', padding: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: Neo.colors.neutral[300], borderRadius: 20 }}>
                                        <Body style={{ color: Neo.colors.neutral[600], fontWeight: 'bold' }}>{t('telas.SOSEmergencyModeScreenNeo.adicionarNovo', '+ Adicionar Novo')}</Body>
                                    </NeoCard>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {/* Add Contact Modal */}
                <Modal visible={addContactModalVisible} transparent animationType="fade">
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '85%', backgroundColor: 'rgba(22,22,26,0.97)', borderRadius: 24, padding: 32 }}>
                            <H3 style={{ marginBottom: 24, color: Neo.colors.neutral.white }}>{t('headersFirst.novoContato', 'Novo Contato')}</H3>
                            <TextInput
                                placeholder={t('telas.SOSEmergencyModeScreenNeo.nomeExFilhaAna', 'Nome (Ex: Filha Ana)')} value={newContactName} onChangeText={setNewContactName}
                                style={{ borderWidth: 1, borderColor: Neo.colors.neutral[200], padding: 16, borderRadius: 16, marginBottom: 16, fontSize: 16, backgroundColor: Neo.colors.neutral[50] }}
                            />
                            <TextInput
                                placeholder={t('telas.SOSEmergencyModeScreenNeo.telefone', 'Telefone')} value={newContactPhone} onChangeText={setNewContactPhone} keyboardType="phone-pad"
                                style={{ borderWidth: 1, borderColor: Neo.colors.neutral[200], padding: 16, borderRadius: 16, marginBottom: 32, fontSize: 16, backgroundColor: Neo.colors.neutral[50] }}
                            />
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <TouchableOpacity style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: Neo.colors.neutral[100], borderRadius: 16 }} onPress={() => setAddContactModalVisible(false)}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[600] }}>{t('telas.SOSEmergencyModeScreenNeo.cancelar', 'Cancelar')}</Body>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, padding: 16, alignItems: 'center', backgroundColor: Neo.colors.feedback.error, borderRadius: 16 }} onPress={() => {
                                    if (newContactName && newContactPhone) {
                                        const novaLista = [...customContacts, { id: Date.now().toString(), name: newContactName, phone: newContactPhone }];
                                        setCustomContacts(novaLista);
                                        Storage.setItem('@emergency_contacts', JSON.stringify(novaLista));
                                        setAddContactModalVisible(false);
                                        setNewContactName(''); setNewContactPhone('');
                                    }
                                }}>
                                    <Body style={{ color: '#FFF', fontWeight: 'bold' }}>{t('telas.SOSEmergencyModeScreenNeo.salvar', 'Salvar')}</Body>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </LinearGradient>
    );
}
