import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../utils/getLocalizedField';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small } from '../components/NeoTypography';
import {
    ArrowLeft, ArrowDown2, ArrowUp2,
    Car, Building, Airplane, DocumentText,
    Warning2, ShieldTick, Health, LampOn
} from 'iconsax-react-native';

export default function SegurancaFeriasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const locaisFerias = [
        {
            id: 1,
            local: 'Na Estrada (Carro)',
            local_en: 'On the Road (Car)',
            local_es: 'En la Carretera (Coche)',
            icon: Car,
            iconColor: '#EF4444',
            bg: '#FEF2F2',
            riscosPrincipais: [
                'Acidentes de trânsito',
                'Falhas mecânicas',
                'Enjoos em crianças',
                'Desidratação (calor no carro)'
            ],
            riscosPrincipais_en: [
                'Traffic accidents',
                'Mechanical failures',
                'Motion sickness in children',
                'Dehydration (heat in the car)'
            ],
            riscosPrincipais_es: [
                'Accidentes de tráfico',
                'Fallos mecánicos',
                'Mareos en niños',
                'Deshidratación (calor en el coche)'
            ],
            prevencao: [
                'Revisão completa do veículo antes de sair.',
                'Cadeirinhas adequadas para idade/peso (OBRIGATÓRIO).',
                'Pausas a cada 2-3 horas para esticar.',
                'Nunca deixe crianças sozinhas no carro (risco fatal).',
                'Trava de segurança nas portas traseiras.'
            ],
            prevencao_en: [
                'Complete vehicle check before leaving.',
                'Appropriate car seats for age/weight (MANDATORY).',
                'Breaks every 2-3 hours to stretch.',
                'Never leave children alone in the car (fatal risk).',
                'Safety locks on rear doors.'
            ],
            prevencao_es: [
                'Revisión completa del vehículo antes de salir.',
                'Sillas de auto adecuadas para edad/peso (OBLIGATORIO).',
                'Pausas cada 2-3 horas para estirarse.',
                'Nunca deje a los niños solos en el coche (riesgo fatal).',
                'Seguros para niños en las puertas traseras.'
            ],
            emergencias: [
                'Acidente: Ligue 193 (Bombeiros) ou 191 (PRF).',
                'Pane: Sinalize com triângulo, vá para local seguro.'
            ],
            emergencias_en: [
                'Accident: Call 193 (Firefighters) or 191 (Highway Police).',
                'Breakdown: Signal with triangle, move to a safe place.'
            ],
            emergencias_es: [
                'Accidente: Llame al 193 (Bomberos) o 191 (Policía de Carreteras).',
                'Avería: Señale con triángulo, vaya a un lugar seguro.'
            ],
            dicasExtras: [
                'Entretenimento offline para crianças.',
                'Leve água e lanches leves.'
            ],
            dicasExtras_en: [
                'Offline entertainment for children.',
                'Bring water and light snacks.'
            ],
            dicasExtras_es: [
                'Entretenimiento sin conexión para niños.',
                'Lleve agua y refrigerios ligeros.'
            ]
        },
        {
            id: 2,
            local: 'Hotel e Airbnb',
            local_en: 'Hotel and Airbnb',
            local_es: 'Hotel y Airbnb',
            icon: Building,
            iconColor: '#8B5CF6',
            bg: '#F3E8FF',
            riscosPrincipais: [
                'Sacadas e janelas sem rede',
                'Móveis instáveis',
                'Acesso a áreas perigosas (piscina, rua)',
                'Tomadas desprotegidas'
            ],
            riscosPrincipais_en: [
                'Balconies and windows without safety nets',
                'Unstable furniture',
                'Access to dangerous areas (pool, street)',
                'Unprotected electrical outlets'
            ],
            riscosPrincipais_es: [
                'Balcones y ventanas sin red de seguridad',
                'Muebles inestables',
                'Acceso a áreas peligrosas (piscina, calle)',
                'Enchufes desprotegidos'
            ],
            prevencao: [
                'Verifique travas de janelas/sacadas IMEDIATAMENTE.',
                'Solicite berço seguro (sem kit berço).',
                'Afaste móveis de janelas (efeito escada).',
                'Mantenha porta do quarto sempre trancada.'
            ],
            prevencao_en: [
                'Check window/balcony locks IMMEDIATELY.',
                'Request a safe crib (no crib bumpers).',
                'Move furniture away from windows (ladder effect).',
                'Keep room door locked at all times.'
            ],
            prevencao_es: [
                'Verifique cerraduras de ventanas/balcones INMEDIATAMENTE.',
                'Solicite una cuna segura (sin protectores de cuna).',
                'Aleje muebles de ventanas (efecto escalera).',
                'Mantenga la puerta de la habitación siempre cerrada con llave.'
            ],
            emergencias: [
                'Incêndio: Use escadas, NUNCA elevador.',
                'Intoxicação: Tenha número do CIATOX (0800 722 6001).'
            ],
            emergencias_en: [
                'Fire: Use stairs, NEVER the elevator.',
                'Intoxication: Have the Poison Control Center number (0800 722 6001).'
            ],
            emergencias_es: [
                'Incendio: Use escaleras, NUNCA el ascensor.',
                'Intoxicación: Tenga el número del Centro de Control de Envenenamientos (0800 722 6001).'
            ],
            dicasExtras: [
                'Leve protetores de quina e tomada na mala.',
                'Use "Trava-Porta" de borracha.'
            ],
            dicasExtras_en: [
                'Pack corner and outlet protectors in your suitcase.',
                'Use a rubber door stopper.'
            ],
            dicasExtras_es: [
                'Lleve protectores de esquinas y enchufes en la maleta.',
                'Use un tope de puerta de goma.'
            ]
        },
        {
            id: 3,
            local: 'Aeroporto e Avião',
            local_en: 'Airport and Airplane',
            local_es: 'Aeropuerto y Avión',
            icon: Airplane,
            iconColor: '#3B82F6',
            bg: '#EFF6FF',
            riscosPrincipais: [
                'Perder-se na multidão',
                'Desconforto no ouvido (pressão)',
                'Germes e vírus'
            ],
            riscosPrincipais_en: [
                'Getting lost in the crowd',
                'Ear discomfort (pressure)',
                'Germs and viruses'
            ],
            riscosPrincipais_es: [
                'Perderse en la multitud',
                'Molestia en los oídos (presión)',
                'Gérmenes y virus'
            ],
            prevencao: [
                'Pulseira de identificação nas crianças.',
                'Foto da criança no dia da viagem.',
                'Amamentar/chupeta na decolagem e pouso (alivia ouvido).',
                'Leve casaco (ar condicionado forte).'
            ],
            prevencao_en: [
                'ID bracelet on children.',
                'Photo of the child on travel day.',
                'Breastfeed/pacifier during takeoff and landing (relieves ear pressure).',
                'Bring a jacket (strong air conditioning).'
            ],
            prevencao_es: [
                'Pulsera de identificación en niños.',
                'Foto del niño el día del viaje.',
                'Amamantar/chupete durante el despegue y aterrizaje (alivia el oído).',
                'Lleve una chaqueta (aire acondicionado fuerte).'
            ],
            emergencias: [
                'Criança perdida: Avise segurança/PF IMEDIATAMENTE.',
                'Mal estar a bordo: Avise comissários.'
            ],
            emergencias_en: [
                'Lost child: Notify security/police IMMEDIATELY.',
                'Sickness on board: Notify flight attendants.'
            ],
            emergencias_es: [
                'Niño perdido: Avise a seguridad/policía INMEDIATAMENTE.',
                'Malestar a bordo: Avise a los auxiliares de vuelo.'
            ],
            dicasExtras: [
                'Mala de mão com trocas de roupa e remédios.',
                'Chegue com antecedência extra.'
            ],
            dicasExtras_en: [
                'Carry-on bag with spare clothes and medicines.',
                'Arrive with extra time.'
            ],
            dicasExtras_es: [
                'Equipaje de mano con ropa de cambio y medicinas.',
                'Llegue con tiempo extra.'
            ]
        },
        {
            id: 4,
            local: 'Documentos e Bagagem',
            local_en: 'Documents and Luggage',
            local_es: 'Documentos y Equipaje',
            icon: DocumentText,
            iconColor: '#F59E0B',
            bg: '#FFFBEB',
            riscosPrincipais: [
                'Esquecer remédios controlados',
                'Falta de documentos para embarque'
            ],
            riscosPrincipais_en: [
                'Forgetting prescription medications',
                'Lack of documents for boarding'
            ],
            riscosPrincipais_es: [
                'Olvidar medicamentos recetados',
                'Falta de documentos para el embarque'
            ],
            prevencao: [
                'Checklist de documentos (RG, Certidão).',
                'Autorização de viagem (se apenas 1 pai).',
                'Seguro viagem (essencial para internacional).',
                'Identifique todas as malas.'
            ],
            prevencao_en: [
                'Document checklist (ID, Birth Certificate).',
                'Travel authorization (if traveling with only 1 parent).',
                'Travel insurance (essential for international trips).',
                'Identify all luggage.'
            ],
            prevencao_es: [
                'Lista de verificación de documentos (DNI, Certificado de Nacimiento).',
                'Autorización de viaje (si viaja con solo 1 de los padres).',
                'Seguro de viaje (esencial para internacionales).',
                'Identifique todo el equipaje.'
            ],
            emergencias: [
                'Perda de documento: B.O. na polícia local.',
                'Doença no exterior: Acionar seguro viagem.'
            ],
            emergencias_en: [
                'Loss of document: Police report at local station.',
                'Illness abroad: Activate travel insurance.'
            ],
            emergencias_es: [
                'Pérdida de documento: Denuncia en la policía local.',
                'Enfermedad en el extranjero: Active el seguro de viaje.'
            ],
            dicasExtras: [
                'Tenha fotos dos documentos no celular e nuvem.',
                'Leve receitas médicas (em inglês se inter).'
            ],
            dicasExtras_en: [
                'Have photos of documents on phone and cloud.',
                'Bring medical prescriptions (in English if international).'
            ],
            dicasExtras_es: [
                'Tenga fotos de documentos en el teléfono y la nube.',
                'Lleve recetas médicas (en inglés si es internacional).'
            ]
        }
    ];

    const renderItem = ({ item }) => {
        const isExpanded = expandedId === item.id;
        const Icon = item.icon;

        return (
            <TouchableOpacity
                style={{
                    backgroundColor: Neo.colors.neutral.white,
                    borderRadius: 20,
                    marginBottom: 16,
                    padding: 20,
                    ...Neo.shadows.sm,
                    borderWidth: 1,
                    borderColor: isExpanded ? item.iconColor : 'rgba(0,0,0,0.03)'
                }}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.9}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        width: 56, height: 56, borderRadius: 28,
                        backgroundColor: item.bg,
                        alignItems: 'center', justifyContent: 'center',
                        marginRight: 16
                    }}>
                        <Icon size={32} color={item.iconColor} variant="Bold" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: Neo.colors.neutral[900] }}>{t_field(item, 'local')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>
                            {t_array(item, 'riscosPrincipais').length} {t('ferias.attentionPoints', 'pontos de atenção')}
                        </Text>
                    </View>
                    <View style={{
                        width: 32, height: 32, borderRadius: 16,
                        backgroundColor: Neo.colors.neutral[100],
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        {isExpanded ?
                            <ArrowUp2 size={20} color={Neo.colors.neutral[400]} /> :
                            <ArrowDown2 size={20} color={Neo.colors.neutral[400]} />
                        }
                    </View>
                </View>

                {isExpanded && (
                    <View style={{ marginTop: 24, paddingTop: 0 }}>

                        {/* Riscos */}
                        <View style={{ marginBottom: 24 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                                <Warning2 size={24} color="#F59E0B" variant="Bold" />
                                <Text style={{ fontSize: 15, fontWeight: '800', color: '#D97706', letterSpacing: 0.5 }}>{t('headersFirst.rISCOS', 'RISCOS')}</Text>
                            </View>
                            <View style={{ gap: 8, paddingLeft: 4 }}>
                                {t_array(item, 'riscosPrincipais').map((r, i) => (
                                    <Text key={i} style={{ fontSize: 15, color: Neo.colors.neutral[700], lineHeight: 22 }}>• {r}</Text>
                                ))}
                            </View>
                        </View>

                        {/* Prevenção */}
                        <View style={{ marginBottom: 24 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 }}>
                                <ShieldTick size={24} color="#10B981" variant="Bold" />
                                <Text style={{ fontSize: 15, fontWeight: '800', color: Neo.colors.primary[600], letterSpacing: 0.5 }}>{t('headersFirst.pREVENO', 'PREVENÇÃO')}</Text>
                            </View>
                            <View style={{ gap: 10 }}>
                                {t_array(item, 'prevencao').map((p, i) => (
                                    <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Neo.colors.primary[500], marginTop: 8 }} />
                                        <Text style={{ fontSize: 15, color: Neo.colors.neutral[800], flex: 1, lineHeight: 22 }}>{p}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Emergência */}
                        <View style={{ backgroundColor: '#FEF2F2', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FECACA', marginBottom: 24 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                                <Health size={24} color="#DC2626" variant="Bold" />
                                <Text style={{ fontSize: 14, fontWeight: '800', color: '#B91C1C' }}>{t('headersFirst.eMERGNCIA', 'EMERGÊNCIA')}</Text>
                            </View>
                            <View style={{ gap: 8 }}>
                                {t_array(item, 'emergencias').map((e, i) => (
                                    <Text key={i} style={{ fontSize: 15, color: Neo.colors.neutral[900], lineHeight: 22, fontWeight: '500' }}>{e}</Text>
                                ))}
                            </View>
                        </View>

                        {/* Dicas */}
                        <View style={{ backgroundColor: '#F3E8FF', padding: 16, borderRadius: 16 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }}>
                                <LampOn size={24} color="#9333EA" variant="Bold" />
                                <Text style={{ fontSize: 14, fontWeight: '800', color: '#7E22CE' }}>{t('headersFirst.dICASEXTRAS', 'DICAS EXTRAS')}</Text>
                            </View>
                            <View style={{ gap: 8 }}>
                                {t_array(item, 'dicasExtras').map((d, i) => (
                                    <Text key={i} style={{ fontSize: 14, color: '#6B21A8', lineHeight: 20 }}>• {d}</Text>
                                ))}
                            </View>
                        </View>

                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header Neo Glass */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
                        <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 16, flex: 1 }}>
                        <Text style={{ fontSize: 24, fontWeight: '800', color: Neo.colors.neutral[900], letterSpacing: -0.5 }}>{t('headersFirst.viagemSegura', 'Viagem Segura')}</Text>
                        <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.carroHotelAviOEDocumentos', 'Carro, hotel, avião e documentos.')}</Text>
                    </View>
                </View>

            <FlatList
                data={locaisFerias}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 190 }}
                showsVerticalScrollIndicator={false}
            />
            </SafeAreaView>
        </AppBackground>
    );
}

const styles = StyleSheet.create({}); // Kept for compatibility

