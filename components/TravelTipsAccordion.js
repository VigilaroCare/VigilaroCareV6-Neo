/**
 * TravelTipsAccordion — dicas "Fique Atento" do Modo Viagem, POR FASE.
 *
 * Decisão de arquitetura de informação (autor, 2026-06-12): cada
 * recomendação vive na fase em que é acionável — menos camadas, contexto
 * certo. As 12 dicas foram etiquetadas:
 *   phase: 'preparacao' — antes de partir (docs, vacinas, logística intl)
 *   phase: 'chegada'    — verificações no destino (janelas, piscina, fuga…)
 *   phase: 'durante'    — valem a viagem toda (crianças, pets)
 *
 * O componente é autônomo: carrega a viagem ativa do AsyncStorage e filtra
 * por fase + tipo de destino + internacional. Na fase 'preparacao' também
 * renderiza os cards "conecte-se à autoridade" (Defesa Civil por SMS;
 * alertas de emergência do celular + Itamaraty quando internacional) —
 * o app ensina a ligar o canal oficial, nunca retransmite alertas
 * (doutrina da promessa calibrada: guia, não autoridade).
 *
 * Uso: <TravelTipsAccordion phase="chegada" />
 */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import NeoCard from './NeoCard';
import NeoIcon from './NeoIcon';
import { Body, Small } from './NeoTypography';
import { DS as Neo } from '../utils/DesignSystem2026';
import { t_field } from '../utils/getLocalizedField';

// Dicas com tradução inline (t_field) — movidas do TravelModeScreen.
const TRAVEL_TIPS = [
    { phase: 'chegada', title: 'Afogamento', title_en: 'Drowning', title_es: 'Ahogamiento', text: '• Nunca deixe crianças sozinhas próximas à água.\n• Atenção ao ralo da piscina.\n• Use boias e coletes salva-vidas.\n• Ensine a regra: "Sem adulto, sem água."', text_en: '• Never leave children alone near water.\n• Pay attention to the pool drain.\n• Use life jackets.\n• Teach the rule: "No adult, no water."', text_es: '• Nunca deje a los niños solos cerca del agua.\n• Atención al desagüe de la piscina.\n• Use chalecos salvavidas.\n• Enseñe la regla: "Sin adulto, no hay agua."', icon: 'SwimmingPool', types: ['praia', 'resort', 'rural'] },
    { phase: 'chegada', title: 'Janelas e Sacadas', title_en: 'Windows and Balconies', title_es: 'Ventanas y Balcones', text: '• Em hotéis, verifique se há telas nas janelas.\n• Crianças escalam: afaste camas e cadeiras.\n• Se possível, instale travas de janelas.\n• Sacadas sem vidro são um risco grave.', text_en: '• In hotels, check for window screens.\n• Children climb: move beds and chairs away.\n• If possible, install window locks.\n• Glassless balconies are a serious risk.', text_es: '• En hoteles, verifique si hay mosquiteros.\n• Los niños escalan: aleje camas y sillas.\n• Si es posible, instale seguros de ventanas.\n• Los balcones sin vidrio son un riesgo grave.', icon: 'Building', types: ['urbano', 'resort'] },
    { phase: 'chegada', title: 'Animais e Plantas', title_en: 'Animals and Plants', title_es: 'Animales y Plantas', text: '• Sacuda calçados e roupas antes de usar.\n• Não toque em plantas desconhecidas.\n• Mantenha portas fechadas ao anoitecer.\n• Leve repelente.', text_en: '• Shake out shoes and clothes before use.\n• Do not touch unknown plants.\n• Keep doors closed at dusk.\n• Bring insect repellent.', text_es: '• Sacuda zapatos y ropa antes de usar.\n• No toque plantas desconocidas.\n• Mantenga puertas cerradas al anochecer.\n• Lleve repelente.', icon: 'Plant', types: ['rural'] },
    { phase: 'chegada', title: 'Distância Médica', title_en: 'Medical Distance', title_es: 'Distancia Médica', text: '• Localize o hospital mais próximo.\n• Verifique se o celular tem sinal.\n• Leve um kit de primeiros socorros.\n• Informe alguém sobre seu destino.', text_en: '• Locate the nearest hospital.\n• Check if your cell phone has a signal.\n• Bring a first aid kit.\n• Inform someone about your destination.', text_es: '• Localice el hospital más cercano.\n• Verifique si el celular tiene señal.\n• Lleve un botiquín de primeros auxilios.\n• Informe a alguien sobre su destino.', icon: 'Hospital', types: ['rural'] },
    { phase: 'durante', title: 'Crianças em Viagem', title_en: 'Children Traveling', title_es: 'Niños de Viaje', text: '• Use pulseira de identificação.\n• Combine um "ponto de encontro".\n• Supervisão visual constante.\n• Ensine o telefone dos pais.', text_en: '• Use an ID bracelet.\n• Agree on a "meeting point".\n• Constant visual supervision.\n• Teach them their parents\' phone number.', text_es: '• Use pulsera de identificación.\n• Acuerde un "punto de encuentro".\n• Supervisión visual constante.\n• Enséñeles el teléfono de los padres.', icon: 'Baby', types: ['all'] },
    { phase: 'chegada', title: 'Idosos em Viagem', title_en: 'Elderly Traveling', title_es: 'Ancianos de Viaje', text: '• Deixe luz acesa para o banheiro.\n• Remova tapetes soltos.\n• Use chinelo antiderrapante.\n• Leve medicamentos organizados.', text_en: '• Leave a light on for the bathroom.\n• Remove loose rugs.\n• Use non-slip slippers.\n• Bring organized medications.', text_es: '• Deje una luz encendida para el baño.\n• Retire alfombras sueltas.\n• Use pantuflas antideslizantes.\n• Lleve medicamentos organizados.', icon: 'Elderly', types: ['all'] },
    { phase: 'durante', title: 'Pets em Viagem', title_en: 'Pets Traveling', title_es: 'Mascotas de Viaje', text: '• Mantenha sempre na guia.\n• Cuidado com piso quente.\n• Não permita acesso a plantas tóxicas.\n• Leve água fresca.', text_en: '• Always keep on a leash.\n• Beware of hot pavements.\n• Do not allow access to toxic plants.\n• Bring fresh water.', text_es: '• Mantenga siempre con correa.\n• Cuidado con el pavimento caliente.\n• No permita acceso a plantas tóxicas.\n• Lleve agua fresca.', icon: 'PawPrint', types: ['all'] },
    { phase: 'chegada', title: 'Plano de Fuga', title_en: 'Escape Plan', title_es: 'Plan de Escape', text: '• Localize o mapa de evacuação.\n• Identifique as 2 saídas mais próximas.\n• Combine um ponto de encontro externo.', text_en: '• Locate the evacuation map.\n• Identify the 2 nearest exits.\n• Agree on an external meeting point.', text_es: '• Localice el mapa de evacuación.\n• Identifique las 2 salidas más cercanas.\n• Acuerde un punto de encuentro externo.', icon: 'SignOut', types: ['all'] },
    { phase: 'chegada', title: 'PCD / Acessibilidade', title_en: 'Accessibility (PWD)', title_es: 'Accesibilidad', text: '• Localize saídas acessíveis.\n• Cuidado com desníveis.\n• Solicite quarto adaptado.\n• Leve equipamentos de apoio extras.', text_en: '• Locate accessible exits.\n• Beware of uneven surfaces.\n• Request an adapted room.\n• Bring extra support equipment.', text_es: '• Localice salidas accesibles.\n• Cuidado con superficies irregulares.\n• Solicite habitación adaptada.\n• Lleve equipo de apoyo extra.', icon: 'Wheelchair', types: ['all'] },
    { phase: 'preparacao', title: 'Documentos e Vistos', title_en: 'Documents and Visas', title_es: 'Documentos y Visas', text: '• Passaporte válido por 6 meses?\n• O país exige visto?\n• Imprima e salve cópias na nuvem.', text_en: '• Passport valid for 6 months?\n• Does the country require a visa?\n• Print and save copies in the cloud.', text_es: '• ¿Pasaporte válido por 6 meses?\n• ¿El país requiere visa?\n• Imprima y guarde copias en la nube.', icon: 'IdentificationCard', types: ['international'] },
    { phase: 'preparacao', title: 'Saúde e Vacinas', title_en: 'Health and Vaccines', title_es: 'Salud y Vacunas', text: '• Necessidade de vacina para Febre Amarela?\n• Contrate um Seguro Saúde.\n• Verifique exigências sanitárias do destino.', text_en: '• Yellow Fever vaccine required?\n• Get Travel Health Insurance.\n• Check the destination\'s health requirements.', text_es: '• ¿Vacuna contra la Fiebre Amarilla?\n• Contrate un Seguro de Salud.\n• Verifique los requisitos sanitarios del destino.', icon: 'Syringe', types: ['international'] },
    // Medicamentos: vale TODA viagem (controlados exigem comprovação até em
    // voo doméstico); o bullet internacional alerta para substâncias proibidas
    { phase: 'preparacao', title: 'Medicamentos na Viagem', title_en: 'Medications While Traveling', title_es: 'Medicamentos en el Viaje', text: '• Remédio controlado: leve a receita médica — a comprovação pode ser exigida.\n• Mantenha na embalagem original, na bagagem de mão.\n• Viagem internacional: confirme se a substância é permitida no destino — remédios comuns no Brasil são proibidos em alguns países.\n• Leve quantidade para toda a viagem, com folga.', text_en: '• Controlled medication: carry the prescription — proof may be required.\n• Keep it in the original packaging, in your carry-on.\n• International trips: confirm the substance is allowed at the destination — medications common in Brazil are banned in some countries.\n• Bring enough for the whole trip, with a margin.', text_es: '• Medicamento controlado: lleve la receta médica — pueden exigir comprobación.\n• Manténgalo en el envase original, en el equipaje de mano.\n• Viaje internacional: confirme que la sustancia esté permitida en el destino — medicamentos comunes en Brasil están prohibidos en algunos países.\n• Lleve cantidad para todo el viaje, con margen.', icon: 'Pill', types: ['all'] },
    { phase: 'preparacao', title: 'Logística Internacional', title_en: 'International Logistics', title_es: 'Logística Internacional', text: '• Desbloqueie cartões.\n• Tenha moeda local em espécie.\n• Leve um adaptador universal.', text_en: '• Unlock cards.\n• Have local currency in cash.\n• Bring a universal adapter.', text_es: '• Desbloquee tarjetas.\n• Tenga moneda local en efectivo.\n• Lleve un adaptador universal.', icon: 'Wallet', types: ['international'] },
    // Dicas Específicas por Modal / Duração
    { phase: 'durante', match: (trip) => trip.transportMode === 'carro' && trip.tripDuration === 'longa', title: 'Fadiga ao Volante', title_en: 'Driver Fatigue', title_es: 'Fatiga al Volante', text: '• Faça paradas a cada 2h ou 200km.\n• Reveze a direção se possível.\n• Mantenha-se hidratado e evite viajar de madrugada.', text_en: '• Take breaks every 2h or 120 miles.\n• Take turns driving if possible.\n• Stay hydrated and avoid driving overnight.', text_es: '• Haga pausas cada 2h o 200 km.\n• Túrnense para conducir si es posible.\n• Manténgase hidratado y evite viajar de madrugada.', icon: 'CarProfile', types: [] },
    { phase: 'durante', match: (trip) => trip.transportMode === 'aviao' && trip.tripDuration === 'longa', title: 'Risco de Trombose (TVP)', title_en: 'DVT Risk', title_es: 'Riesgo de Trombosis', text: '• Levante-se e caminhe no corredor a cada 2h.\n• Faça movimentos circulares com os pés.\n• Beba bastante água durante o voo.', text_en: '• Stand up and walk the aisle every 2h.\n• Make circular movements with your feet.\n• Drink plenty of water during the flight.', text_es: '• Levántese y camine por el pasillo cada 2h.\n• Haga movimientos circulares con los pies.\n• Beba mucha agua durante el vuelo.', icon: 'Airplane', types: [] },
    { phase: 'durante', match: (trip) => ['carro', 'onibus', 'navio'].includes(trip.transportMode), title: 'Prevenção de Cinetose', title_en: 'Motion Sickness', title_es: 'Cinetosis', text: '• Olhe para o horizonte.\n• Evite o uso prolongado de telas.\n• Medicamentos preventivos devem ser tomados ANTES do movimento.', text_en: '• Look at the horizon.\n• Avoid prolonged use of screens.\n• Preventive medication should be taken BEFORE movement starts.', text_es: '• Mire hacia el horizonte.\n• Evite el uso prolongado de pantallas.\n• La medicación preventiva debe tomarse ANTES del movimiento.', icon: 'Health', types: [] },
    { phase: 'durante', match: (trip) => trip.transportMode === 'onibus', title: 'Cinto de Segurança', title_en: 'Seatbelts', title_es: 'Cinturones de Seguridad', text: '• Mantenha o cinto afivelado o tempo todo, mesmo dormindo.\n• Exija que todos ao lado também usem.', text_en: '• Keep the seatbelt fastened at all times, even when sleeping.\n• Demand that everyone around you uses it too.', text_es: '• Mantenga el cinturón abrochado en todo momento, incluso al dormir.\n• Exija que todos a su alrededor también lo usen.', icon: 'Bus', types: [] },
];

const SECTION_TITLES = {
    preparacao: ['travel.stayAlertPrep', 'Fique atento antes de partir'],
    chegada: ['travel.stayAlertArrival', 'Fique atento no destino'],
    durante: ['travel.stayAlertDuring', 'Fique atento durante a viagem'],
};

const ITAMARATY_URL = 'https://www.gov.br/mre/pt-br/assuntos/portal-consular';

// Card "conecte-se à autoridade" — informação + ação, sem retransmitir alertas
function AuthorityCard({ icon, title, body, actionLabel, onAction }) {
    return (
        <NeoCard variant="elevated" style={{ padding: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={styles.iconCircle}>
                    <NeoIcon name={icon} size={22} color={Neo.colors.primary[700]} variant="Bulk" />
                </View>
                <Body style={{ flex: 1, fontWeight: 'bold', color: Neo.colors.neutral[800], fontSize: 14 }}>{title}</Body>
            </View>
            <Small style={{ color: Neo.colors.neutral[700], lineHeight: 18 }}>{body}</Small>
            {!!actionLabel && (
                <TouchableOpacity onPress={onAction} style={styles.actionBtn} accessibilityRole="button">
                    <Body style={{ color: Neo.colors.neutral.white, fontWeight: 'bold', fontSize: 13 }}>{actionLabel}</Body>
                </TouchableOpacity>
            )}
        </NeoCard>
    );
}

export default function TravelTipsAccordion({ phase = 'durante', style }) {
    const { t } = useTranslation('common');
    const [expandedIdx, setExpandedIdx] = useState(null);
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('@active_trip')
            .then((raw) => { if (raw) setTrip(JSON.parse(raw)); })
            .catch(() => {});
    }, []);

    const isInternational = !!trip?.config?.isInternational;
    const tips = TRAVEL_TIPS.filter(tip => {
        if (tip.phase !== phase) return false;
        if (tip.match && trip && tip.match(trip)) return true;
        return (
            tip.types?.includes('all') ||
            (trip && tip.types?.includes(trip.type)) ||
            (isInternational && tip.types?.includes('international'))
        );
    });

    const showAuthority = phase === 'preparacao';
    if (tips.length === 0 && !showAuthority) return null;

    const [titleKey, titleFallback] = SECTION_TITLES[phase] || SECTION_TITLES.durante;

    const openDefesaCivilSms = () => {
        // Cadastro oficial: enviar o CEP por SMS para 40199 (gratuito).
        const sep = Platform.OS === 'ios' ? '&' : '?';
        Linking.openURL(`sms:40199${sep}body=`).catch(() => {});
    };

    return (
        <View style={style}>
            <Text style={styles.sectionLabel} accessibilityRole="header">{t(titleKey, titleFallback)}</Text>
            <View style={{ gap: 12 }}>
                {showAuthority && (
                    <AuthorityCard
                        icon="BellRinging"
                        title={t('travel.dcAlertsTitle', 'Alertas da Defesa Civil')}
                        body={t('travel.dcAlertsBody', 'Cadastre o CEP da sua casa e do destino para receber alertas oficiais de chuvas e desastres por SMS — serviço público e gratuito. Basta enviar o CEP para 40199.')}
                        actionLabel={t('travel.dcAlertsAction', 'Cadastrar por SMS (40199)')}
                        onAction={openDefesaCivilSms}
                    />
                )}
                {showAuthority && isInternational && (
                    <>
                        <AuthorityCard
                            icon="Vibrate"
                            title={t('travel.intlAlertsTitle', 'Alertas de emergência no exterior')}
                            body={t('travel.intlAlertsBody', 'Muitos países enviam alertas direto ao celular (terremoto, clima severo) — mas só se a opção "alertas de emergência" estiver ativa nas configurações do aparelho. Ative antes de embarcar e mantenha ativa no destino.')}
                        />
                        <AuthorityCard
                            icon="Global"
                            title={t('travel.itamaratyTitle', 'Alertas consulares do Itamaraty')}
                            body={t('travel.itamaratyBody', 'Consulte as recomendações oficiais do governo brasileiro para o seu destino e anote o contato da embaixada/consulado mais próximo.')}
                            actionLabel={t('travel.itamaratyAction', 'Abrir Portal Consular')}
                            onAction={() => Linking.openURL(ITAMARATY_URL).catch(() => {})}
                        />
                    </>
                )}
                {tips.map((tip, idx) => {
                    const isOpen = expandedIdx === idx;
                    const bulletItems = t_field(tip, 'text').split('\n').filter(l => l.trim());
                    return (
                        <NeoCard key={idx} variant="elevated" style={{ overflow: 'hidden' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                    setExpandedIdx(isOpen ? null : idx);
                                }}
                                activeOpacity={0.8}
                                style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}
                            >
                                <View style={styles.iconCircle}>
                                    <NeoIcon name={tip.icon} size={22} color={Neo.colors.primary[700]} variant="Bulk" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Body style={{ fontWeight: 'bold', color: Neo.colors.neutral[800], fontSize: 14 }}>{t_field(tip, 'title')}</Body>
                                </View>
                                {isOpen ? <NeoIcon name="ArrowUp2" size={18} color={Neo.colors.neutral[500]} /> : <NeoIcon name="ArrowDown2" size={18} color={Neo.colors.neutral[500]} />}
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={{ paddingHorizontal: 14, paddingBottom: 14 }}>
                                    <View style={{ height: 1, backgroundColor: Neo.colors.neutral[100], marginBottom: 12 }} />
                                    {bulletItems.map((line, li) => (
                                        <View key={li} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
                                            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Neo.colors.primary[500], marginRight: 10, marginTop: 6 }} />
                                            <Body style={{ flex: 1, color: Neo.colors.neutral[700], fontSize: 13, lineHeight: 19 }}>{line.replace(/^[•\s]+/, '')}</Body>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </NeoCard>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionLabel: {
        fontSize: 11,
        fontWeight: '900',
        color: Neo.colors.neutral[800],
        letterSpacing: 1.6,
        marginBottom: 14,
        marginTop: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        opacity: 0.9,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Neo.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    actionBtn: {
        backgroundColor: Neo.colors.primary[600],
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
});
