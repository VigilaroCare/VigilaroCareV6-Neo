/**
 * PrimeirosSocorrosEmergenciaScreen.js
 * Tela de Primeiros Socorros para EMERGÊNCIA REAL
 * Foco em ação imediata, não aprendizado (Neo Glass Crisis Protocol)
 * Vigilaro Care V6
 */

import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar, Linking, Dimensions, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Icons
import NeoIcon from '../../components/NeoIcon';

// Design System
import { DS as Neo } from '../../utils/DesignSystem2026';
import NeoCard from '../../components/NeoCard';
import AppBackground from '../../components/AppBackground';
import NeoText, { H2, H3, Body, Small } from '../../components/NeoTypography';
import SafeFooter from '../../components/SafeFooter';
import PetHeroBanner from '../../components/PetHeroBanner';
import { useTranslation } from 'react-i18next';

// Dados
import { EMERGENCIAS_PETS } from '../../data/primeiros_socorros_pets';
import { useIsDark } from '../../utils/ThemeContext';

const { width } = Dimensions.get('window');

// Helper to map icon strings to NeoIcon names (iconsax válidos)
const getIcon = (iconName, size = 28) => {
    let name = 'Danger';
    switch (iconName) {
        case 'body': name = 'User'; break;
        case 'hand-left': name = 'Forbidden2'; break;
        case 'trending-down': name = 'ArrowCircleDown'; break;
        case 'water': name = 'Drop'; break;
        case 'water-outline': name = 'Drop'; break;
        case 'flash': name = 'Flash'; break;
        case 'flame': name = 'Sun1'; break;
        case 'skull-outline': name = 'Danger'; break;
        case 'pulse': name = 'Activity'; break;
        case 'alert-circle': name = 'Warning2'; break;
        case 'heart': name = 'Heart'; break;
        case 'eye-off': name = 'EyeSlash'; break;
        case 'paw': name = 'Heart'; break; // Pet não existe
        case 'bandage': name = 'Health'; break;
        case 'heart-dislike': name = 'Heart'; break; // HeartSlash não existe
        case 'sunny': name = 'Sun1'; break;
        case 'warning': name = 'Warning2'; break;
        case 'leaf': name = 'Health'; break; // Tree não existe
        case 'flask': name = 'Drop'; break; // Milk não existe
        default: name = 'Danger'; break;
    }
    return <NeoIcon name={name} size={size} color="#FFF" variant="Bold" />;
};

const EMERGENCIAS_HUMANOS = [
    {
        id: 'queda', titulo: 'Queda', descricao: 'Tropeço, escorregão, queda do mesmo nível',
        icon: 'body', cor: '#E11D48', corFundo: '#FFE4E6', frequencia: '1º mais comum',
        passos: [
            { titulo: 'NÃO MOVA a vítima', descricao: 'Se suspeitar de lesão na coluna ou pescoço, mantenha-a imóvel', critico: true },
            { titulo: 'Verifique a consciência', descricao: 'Chame pelo nome, pergunte se está bem' },
            { titulo: 'Observe se há sangramento', descricao: 'Aplique pressão com pano limpo se houver' },
            { titulo: 'Verifique dor intensa', descricao: 'Pergunte onde dói, observe deformidades' },
            { titulo: 'Ligue 192 (SAMU)', descricao: 'Se houver confusão mental, dor intensa ou não conseguir levantar', critico: true },
        ],
        alertas: ['Se idoso: risco de fratura de fêmur', 'Se bateu a cabeça: observe vômitos e sonolência'],
    },
    {
        id: 'engasgo', titulo: 'Engasgo', descricao: 'Não consegue respirar, tossir ou falar',
        icon: 'hand-left', cor: '#BE123C', corFundo: '#FFE4E6', frequencia: '2º mais comum',
        passos: [
            { titulo: 'Se TOSSE: incentive a tossir', descricao: 'A tosse é a melhor forma de expelir o objeto' },
            { titulo: 'Se NÃO tosse: Manobra de Heimlich', descricao: 'Posicione-se atrás, punho fechado acima do umbigo, empurre para cima', critico: true },
            { titulo: 'Repita até 5 vezes', descricao: 'Compressões rápidas e firmes para dentro e para cima' },
            { titulo: 'Se bebê: 5 tapas nas costas', descricao: 'Coloque de bruços no antebraço, cabeça mais baixa, tapas firmes entre as escápulas', critico: true },
            { titulo: 'Se desmaiou: Ligue 192', descricao: 'Inicie RCP se não respirar', critico: true },
        ],
        alertas: ['NÃO coloque os dedos na garganta', 'NÃO dê tapas nas costas em adulto consciente'],
    },
    {
        id: 'quedaAltura', titulo: 'Queda de Altura', descricao: 'Escada, degraus, cama, janela',
        icon: 'trending-down', cor: '#9F1239', corFundo: '#FFE4E6', frequencia: '3º mais comum',
        passos: [
            { titulo: 'NÃO MOVA a vítima', descricao: 'Risco de lesão na coluna vertebral', critico: true },
            { titulo: 'Ligue 192 (SAMU) imediatamente', descricao: 'Quedas de altura são emergências graves', critico: true },
            { titulo: 'Mantenha vias aéreas livres', descricao: 'Se vomitar, vire a cabeça de lado COM CUIDADO' },
            { titulo: 'Observe sinais de choque', descricao: 'Pele fria, suor, confusão mental' },
            { titulo: 'Aqueça a vítima', descricao: 'Cubra com cobertor, mantenha aquecida' },
        ],
        alertas: ['Nunca tente colocar a pessoa de pé', 'Crianças: observe mudanças de comportamento nas próximas horas'],
    },
    {
        id: 'aspiracao', titulo: 'Vômito/Aspiração', descricao: 'Pessoa vomitando ou engasgou com vômito',
        icon: 'water', cor: '#C2410C', corFundo: '#FFEDD5', frequencia: '4º mais comum',
        passos: [
            { titulo: 'Vire a pessoa de lado', descricao: 'Posição lateral de segurança para evitar aspiração', critico: true },
            { titulo: 'Incline a cabeça para baixo', descricao: 'Permite que o vômito escorra para fora' },
            { titulo: 'Limpe a boca', descricao: 'Use os dedos enrolados em pano para remover resíduos' },
            { titulo: 'Mantenha vias aéreas livres', descricao: 'Verifique se está respirando' },
            { titulo: 'Ligue 192 se inconsciente', descricao: 'Ou se tiver dificuldade para respirar', critico: true },
        ],
        alertas: ['Comum em idosos e bebês', 'Se engasgou com vômito, trate como engasgo'],
    },
    {
        id: 'choqueEletrico', titulo: 'Choque Elétrico', descricao: 'Contato com eletricidade',
        icon: 'flash', cor: '#B45309', corFundo: '#FEF3C7', frequencia: '5º mais comum',
        passos: [
            { titulo: 'DESLIGUE A ENERGIA', descricao: 'Disjuntor geral ou tomada. NUNCA toque na vítima se ainda em contato', critico: true },
            { titulo: 'Afaste com material SECO', descricao: 'Use cabo de vassoura, cadeira de madeira, borracha - NUNCA metal ou molhado', critico: true },
            { titulo: 'Ligue 192 imediatamente', descricao: 'Choque elétrico pode causar parada cardíaca', critico: true },
            { titulo: 'Inicie RCP se necessário', descricao: 'Se não respira ou não tem pulso' },
            { titulo: 'Observe queimaduras', descricao: 'Entrada e saída da corrente elétrica' },
        ],
        alertas: ['Queimaduras internas são graves', 'Arritmias podem ocorrer horas depois'],
    },
    {
        id: 'afogamento', titulo: 'Afogamento', descricao: 'Piscina, banheira, balde',
        icon: 'water', cor: '#0369A1', corFundo: '#E0F2FE', frequencia: '6º mais comum',
        passos: [
            { titulo: 'Retire da água com segurança', descricao: 'Use objeto flutuante, não entre sozinho', critico: true },
            { titulo: 'Ligue 192 (SAMU)', descricao: 'Mesmo se parecer bem, pode piorar depois', critico: true },
            { titulo: 'Se INCONSCIENTE: RCP', descricao: '30 compressões + 2 respirações', critico: true },
            { titulo: 'Posição lateral se respira', descricao: 'Permite que água escorra' },
            { titulo: 'Aqueça a vítima', descricao: 'Remova roupas molhadas, cubra com cobertor' },
        ],
        alertas: ['Crianças se afogam em silêncio', 'Baldes e banheiras são perigosos para bebês'],
    },
    {
        id: 'queimadura', titulo: 'Queimadura', descricao: 'Água quente, fogo, óleo, químicos',
        icon: 'flame', cor: '#EA580C', corFundo: '#FFEDD5', frequencia: '7º mais comum',
        passos: [
            { titulo: 'ÁGUA CORRENTE FRIA', descricao: 'Por pelo menos 20 minutos - é o mais importante!', critico: true },
            { titulo: 'Remova anéis e roupas', descricao: 'Antes que inche - corte se necessário' },
            { titulo: 'Cubra com pano limpo', descricao: 'Não use algodão, não estoure bolhas' },
            { titulo: 'NÃO aplique nada', descricao: 'Pasta de dente, manteiga, ovo = PROIBIDO!', critico: true },
            { titulo: 'Ligue 192 se grave', descricao: 'Grande extensão, rosto, mãos, genitais, crianças', critico: true },
        ],
        alertas: ['Queimadura química: lave por 30+ minutos', 'Roupas em chamas: pare, deite, role'],
    },
    {
        id: 'incendio', titulo: 'Incêndio / Fumaça', descricao: 'Fogo em casa, inalação de fumaça',
        icon: 'flame', cor: '#C2410C', corFundo: '#FFEDD5', frequencia: '8º mais comum',
        passos: [
            { titulo: 'SAIA IMEDIATAMENTE', descricao: 'Vidas primeiro, objetos depois!', critico: true },
            { titulo: 'Abaixe-se', descricao: 'Fumaça sobe - rasteje se necessário' },
            { titulo: 'Teste portas antes de abrir', descricao: 'Se quente, não abra - busque outra saída' },
            { titulo: 'Ligue 193 (Bombeiros)', descricao: 'Após sair em segurança', critico: true },
            { titulo: 'Ponto de encontro', descricao: 'Reúna todos em local seguro, conte as pessoas' },
        ],
        alertas: ['NUNCA volte para buscar objetos', 'Se preso: molhe toalhas e coloque nas frestas'],
    },
    {
        id: 'desmaio', titulo: 'Desmaio', descricao: 'Pessoa caiu inconsciente',
        icon: 'body', cor: '#7E22CE', corFundo: '#F3E8FF',
        passos: [
            { titulo: 'Deite a pessoa de costas', descricao: 'Em superfície plana e segura' },
            { titulo: 'Eleve as pernas', descricao: 'Cerca de 30cm para aumentar fluxo ao cérebro' },
            { titulo: 'Afrouxe roupas', descricao: 'Cinto, gravata, botões do pescoço' },
            { titulo: 'Verifique a respiração', descricao: 'Se não respira: inicie RCP e ligue 192', critico: true },
            { titulo: 'Ao acordar: mantenha deitada', descricao: 'Por alguns minutos, ofereça água' },
        ],
        alertas: ['Se demorar mais de 1 minuto: Ligue 192', 'Observe se há convulsões'],
    },
    {
        id: 'convulsao', titulo: 'Convulsão', descricao: 'Tremores, movimentos involuntários',
        icon: 'pulse', cor: '#6D28D9', corFundo: '#EDE9FE',
        passos: [
            { titulo: 'Proteja a cabeça', descricao: 'Coloque algo macio embaixo (almofada, casaco)' },
            { titulo: 'Afaste objetos perigosos', descricao: 'Móveis, objetos cortantes' },
            { titulo: 'NÃO segure a pessoa', descricao: 'Deixe a convulsão acontecer, apenas proteja', critico: true },
            { titulo: 'NÃO coloque nada na boca', descricao: 'Mito antigo - pode machucar', critico: true },
            { titulo: 'Após: posição lateral', descricao: 'Vire de lado, verifique respiração' },
        ],
        alertas: ['Cronometre a duração', 'Se > 5 minutos: Ligue 192'],
    },
    {
        id: 'envenenamento', titulo: 'Envenenamento', descricao: 'Ingeriu produto tóxico ou medicamento',
        icon: 'skull-outline', cor: '#15803D', corFundo: '#DCFCE7',
        passos: [
            { titulo: 'CIATOX: 0800-722-6001', descricao: 'Ligue IMEDIATAMENTE - disponível 24h', critico: true },
            { titulo: 'NÃO induza vômito', descricao: 'Pode piorar queimaduras ou aspiração', critico: true },
            { titulo: 'Identifique o produto', descricao: 'Guarde a embalagem para mostrar ao médico' },
            { titulo: 'Lave boca com água', descricao: 'Se substância corrosiva, lave sem engolir' },
            { titulo: 'Se inconsciente: 192', descricao: 'Posição lateral, verifique respiração' },
        ],
        alertas: ['Não dê leite - mito perigoso', 'Crianças: remédios parecem doces'],
    },
    {
        id: 'sangramento', titulo: 'Sangramento Intenso', descricao: 'Corte profundo, hemorragia',
        icon: 'water', cor: '#B91C1C', corFundo: '#FEE2E2',
        passos: [
            { titulo: 'PRESSIONE o ferimento', descricao: 'Com pano limpo, mantenha pressão constante', critico: true },
            { titulo: 'Eleve o membro', descricao: 'Acima do nível do coração se possível' },
            { titulo: 'NÃO remova o pano', descricao: 'Se encharcar, coloque outro por cima' },
            { titulo: 'Torniquete só se grave', descricao: 'Apenas em amputação ou hemorragia incontrolável', critico: true },
            { titulo: 'Ligue 192', descricao: 'Se não parar em 10 minutos ou for profundo' },
        ],
        alertas: ['Sangue arterial: jorra em jatos', 'Se objeto encravado: NÃO remova'],
    },
];

export default function PrimeirosSocorrosEmergenciaScreen({ navigation, route }) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const isDark = useIsDark();
    const petHero = route?.params?.petHero;
    // Se veio do hub Pet, abre direto na aba PET
    const [mode, setMode] = useState(petHero ? 'PET' : 'HUMAN'); // 'HUMAN' | 'PET'
    const isPet = mode === 'PET';
    const EMERGENCIAS = isPet ? EMERGENCIAS_PETS : EMERGENCIAS_HUMANOS;

    const [emergenciaSelecionada, setEmergenciaSelecionada] = useState(null);

    const ligar192 = () => Linking.openURL('tel:192');
    const ligarVet = () => Linking.openURL('geo:0,0?q=veterinario 24h');

    // MODO HUB: Seleção da Emergência
    if (!emergenciaSelecionada) {
        return (
            <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style={isDark ? 'light' : 'dark'} />

                <View style={{ flexDirection: 'column', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.9)', ...Neo.shadows?.sm }}>
                            <NeoIcon name="ArrowLeft2" size={24} color={isPet ? '#065F46' : '#BE123C'} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 16, flex: 1 }}>
                            <Text style={{ fontSize: 24, fontWeight: '800', color: isPet ? '#059669' : '#BE123C', letterSpacing: -0.5 }}>{t('firstAid.whatHappened')}</Text>
                            <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('firstAid.tacticalProtocol')}</Text>
                        </View>
                    </View>

                    {/* TABS (Switcher Human/Pet) */}
                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 24, padding: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start' }}>
                        <TouchableOpacity
                            onPress={() => setMode('HUMAN')}
                            style={{ paddingHorizontal: 24, paddingVertical: 8, alignItems: 'center', backgroundColor: !isPet ? '#FFF' : 'transparent', borderRadius: 20, flexDirection: 'row', ...(!isPet && Neo.shadows?.sm) }}
                        >
                            <NeoIcon name="User" size={16} color={!isPet ? '#BE123C' : Neo.colors.neutral[500]} style={{marginRight: 6}} variant="Bold" />
                            <Small style={{ color: !isPet ? '#BE123C' : Neo.colors.neutral[500], fontWeight: 'bold' }}>{t('firstAid.people')}</Small>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setMode('PET')}
                            style={{ paddingHorizontal: 24, paddingVertical: 8, alignItems: 'center', backgroundColor: isPet ? '#FFF' : 'transparent', borderRadius: 20, flexDirection: 'row', ...(isPet && Neo.shadows?.sm) }}
                        >
                            <NeoIcon name="Heart" size={16} color={isPet ? '#059669' : Neo.colors.neutral[500]} style={{marginRight: 6}} variant="Bold" />
                            <Small style={{ color: isPet ? '#059669' : Neo.colors.neutral[500], fontWeight: 'bold' }}>{t('firstAid.pets')}</Small>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
                    {/* Hero banner — se veio do hub Pet */}
                    {petHero && (
                        <PetHeroBanner
                            image={petHero.imagem}
                            imageUrl={petHero.imagemUrl}
                            tint={petHero.cor || '#DC2626'}
                            accessibilityLabel={petHero.titulo}
                            marginHorizontal={0}
                            marginBottom={16}
                            height={120}
                        />
                    )}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {EMERGENCIAS.map((item) => (
                            <TouchableOpacity activeOpacity={0.8} key={item.id} onPress={() => setEmergenciaSelecionada(item)} style={{ width: '48%', marginBottom: 16 }}>
                                <NeoCard variant="glass" style={{ 
                                    padding: 16, 
                                    height: 160, 
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                    justifyContent: 'space-between', 
                                    borderColor: 'rgba(255, 255, 255, 0.5)', 
                                    borderWidth: 1,
                                    borderLeftWidth: 4,
                                    borderLeftColor: item.cor
                                }}>
                                    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: item.cor + '15', alignItems: 'center', justifyContent: 'center' }}>
                                        {React.cloneElement(getIcon(item.icon, 24), { color: item.cor })}
                                    </View>
                                    <View>
                                        <H3 style={{ color: Neo.colors.neutral[900], fontSize: 16, marginBottom: 4 }} numberOfLines={2}>{item.titulo}</H3>
                                        <Small style={{ color: Neo.colors.neutral[600], lineHeight: 14 }} numberOfLines={2}>{item.descricao}</Small>
                                    </View>
                                </NeoCard>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <SafeFooter navigation={navigation} />
            </SafeAreaView>
            </AppBackground>
        );
    }

    // MODO DETALHISTA TÁTICO: Ação Imediata Guidada (Step-by-Step)
    return (
        <AppBackground>
            <StatusBar style={isDark ? 'light' : 'dark'} />

            <ScrollView contentContainerStyle={{ paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
                {/* Cabeçalho do Protocolo Modernizado */}
                <View style={{ 
                    paddingTop: insets.top + 10, 
                    paddingBottom: 24, 
                    paddingHorizontal: 20,
                    backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                    <TouchableOpacity onPress={() => setEmergenciaSelecionada(null)} style={{ 
                        width: 44, height: 44, borderRadius: 22, 
                        backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', 
                        marginBottom: 16,
                        borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', ...Neo.shadows?.sm
                    }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: emergenciaSelecionada.cor + '15', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                            {React.cloneElement(getIcon(emergenciaSelecionada.icon, 32), { color: emergenciaSelecionada.cor })}
                        </View>
                        <View style={{ flex: 1 }}>
                            <H2 style={{ color: emergenciaSelecionada.cor, fontSize: 26, marginBottom: 4 }}>{emergenciaSelecionada.titulo}</H2>
                            <NeoText style={{ color: Neo.colors.neutral[600], textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 }}>{t('firstAid.immediateAction')}</NeoText>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 20 }}>
                    {emergenciaSelecionada.passos.map((passo, index) => (
                        <NeoCard variant="glass" key={index} style={{
                            marginBottom: 16, padding: 20, flexDirection: 'row', alignItems: 'center',
                            backgroundColor: passo.critico ? '#FFF1F2' : '#FFF',
                            borderColor: passo.critico ? '#FDA4AF' : Neo.colors.neutral[200],
                            borderLeftWidth: passo.critico ? 6 : 1,
                            borderLeftColor: passo.critico ? '#E11D48' : Neo.colors.neutral[200]
                        }}>
                            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: passo.critico ? '#E11D48' : emergenciaSelecionada.cor + '20', alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
                                <H3 style={{ color: passo.critico ? '#FFF' : emergenciaSelecionada.cor }}>{index + 1}</H3>
                            </View>
                            <View style={{ flex: 1 }}>
                                <H3 style={{ fontSize: 16, color: passo.critico ? '#BE123C' : Neo.colors.neutral[900], marginBottom: 4 }}>{passo.titulo}</H3>
                                <Body style={{ fontSize: 14, color: passo.critico ? '#881337' : Neo.colors.neutral[600], lineHeight: 20 }}>{passo.descricao}</Body>
                            </View>
                        </NeoCard>
                    ))}

                    {emergenciaSelecionada.alertas && (
                        <View style={{ backgroundColor: '#FFFBEB', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#FDE68A', marginTop: 12 }}>
                            <H3 style={{ color: '#D97706', marginBottom: 12 }}>{t('firstAid.criticalWarning')}</H3>
                            {emergenciaSelecionada.alertas.map((alerta, idx) => (
                                <Body key={idx} style={{ color: '#B45309', marginBottom: 8, fontWeight: 'bold' }}>• {alerta}</Body>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* STICKY FOOTER PARA LIGAR VET OU SAMU */}
            <View style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: 'rgba(255,255,255,0.95)',
                paddingHorizontal: 20, paddingTop: 16, paddingBottom: insets.bottom + 90,
                borderTopWidth: 1, borderTopColor: Neo.colors.neutral[200], ...Neo.shadows?.floating
            }}>
                {isPet ? (
                    <TouchableOpacity onPress={ligarVet} activeOpacity={0.8} style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#059669', paddingVertical: 18, borderRadius: 20, ...Neo.shadows?.md
                    }}>
                        <NeoIcon name="Location" size={24} color="#FFF" variant="Bold" style={{ marginRight: 12 }} />
                        <H3 style={{ color: '#FFF', fontSize: 18 }}>{t('firstAid.findVet')}</H3>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={ligar192} activeOpacity={0.8} style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#E11D48', paddingVertical: 18, borderRadius: 20, ...Neo.shadows?.md
                    }}>
                        <NeoIcon name="Call" size={24} color="#FFF" variant="Bold" style={{ marginRight: 12 }} />
                        <H3 style={{ color: '#FFF', fontSize: 18 }}>{t('firstAid.callEmergency')}</H3>
                    </TouchableOpacity>
                )}
            </View>
        </AppBackground>
    );
}
