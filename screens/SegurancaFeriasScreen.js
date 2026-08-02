import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../utils/getLocalizedField';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import NeoScreenHeader from '../components/NeoScreenHeader';
import { H2, H3, Body, Small } from '../components/NeoTypography';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function SegurancaFeriasScreen({ navigation }) {
    const { t } = useTranslation('common');
    const insets = useSafeAreaInsets();
    const themeColors = useThemeColors();
    const isDark = useIsDark();
    const textPrimary = themeColors.neutral[900];
    


    const locaisFerias = [
        {
            id: 1,
            local: 'Na Estrada (Carro)',
            image: require('../assets/illustrations/pad/sub_ferias_estrada.png'),
            local_en: 'On the Road (Car)',
            local_es: 'En la Carretera (Coche)',
            icon: 'Car',
            // DS: data-level color mapped to DS
            iconColor: themeColors.feedback.error,
            bg: '#FEF2F2', // TODO: map to DS token
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
            image: require('../assets/illustrations/pad/sub_ferias_hotel.png'),
            local_en: 'Hotel and Airbnb',
            local_es: 'Hotel y Airbnb',
            icon: 'Building',
            // DS: data-level color
            iconColor: themeColors.categoria.ameixa.fill,
            bg: themeColors.categoria.ameixa.tint,
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
                'Intoxicação: Tenha o número do centro de intoxicação — {{POISON_CONTROL}}.'
            ],
            emergencias_en: [
                'Fire: Use stairs, NEVER the elevator.',
                'Intoxication: Have the Poison Control Center number {{POISON_CONTROL}}.'
            ],
            emergencias_es: [
                'Incendio: Use escaleras, NUNCA el ascensor.',
                'Intoxicación: Tenga el número del Centro de Control de Envenenamientos {{POISON_CONTROL}}.'
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
            image: require('../assets/illustrations/pad/sub_ferias_aeroporto.png'),
            local_en: 'Airport and Airplane',
            local_es: 'Aeropuerto y Avión',
            icon: 'Airplane',
            // DS: data-level color
            iconColor: themeColors.secondary[500],
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
            image: require('../assets/illustrations/pad/sub_ferias_bagagem.png'),
            local_en: 'Documents and Luggage',
            local_es: 'Documentos y Equipaje',
            icon: 'DocumentText',
            // DS: data-level color
            iconColor: themeColors.feedback.warning,
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

    const handlePress = (item) => {
        navigation.navigate('EduContentDetail', {
            title: t_field(item, 'local'),
            image: item.image,
            sections: [
                {
                    title: t('ferias.riscos', 'Riscos Principais'),
                    icon: 'Warning2',
                    color: themeColors.feedback.warning,
                    bullets: t_array(item, 'riscosPrincipais')
                },
                item.emergencias && {
                    title: t('ferias.emergencia', 'Emergência'),
                    icon: 'Health',
                    color: themeColors.feedback.error,
                    bullets: t_array(item, 'emergencias')
                },
                item.dicasExtras && {
                    title: t('ferias.dicasExtras', 'Dicas Extras'),
                    icon: 'LampOn',
                    color: themeColors.secondary[500],
                    bullets: t_array(item, 'dicasExtras')
                }
            ].filter(Boolean)
        });
    };

    const renderItem = ({ item }) => {
        return (
          <NeoCard
            variant="elevated"
            padding={0}
            onPress={() => handlePress(item)}
            style={{ marginBottom: 20 }}
          >
            {item.image ? (
              <Image 
                source={item.image} 
                style={{ width: '100%', height: 180 }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ width: '100%', height: 180, backgroundColor: item.bg, alignItems: 'center', justifyContent: 'center' }}>
                  <NeoIcon name={item.icon} size={48} color={item.iconColor} variant="Bold" />
              </View>
            )}
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
               <View style={{ flex: 1, paddingRight: 16 }}>
                   <Text style={{ fontSize: 22, fontWeight: '800', color: Neo.colors.neutral[900] }}>
                      {t_field(item, 'local')}
                   </Text>
                   <Text style={{ fontSize: 14, color: Neo.colors.neutral[500], marginTop: 4 }}>
                      {t_array(item, 'riscosPrincipais').length} {t('ferias.riscos', 'riscos')} · {t_array(item, 'dicasExtras').length} {t('ferias.dicas', 'dicas')}
                   </Text>
               </View>
               <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Neo.colors.neutral[50], alignItems: 'center', justifyContent: 'center' }}>
                   <NeoIcon name="ArrowRight2" size={20} color={Neo.colors.neutral[400]} />
               </View>
            </View>
          </NeoCard>
        );
    };

    return (
        <AppBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
                <StatusBar style="dark" />

                {/* Cabeçalho Padronizado */}
                <NeoScreenHeader 
                    title={t('lazerMenu.ferias.title', 'Viagens e Férias')}
                    onBack={() => navigation.goBack()}
                />

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

