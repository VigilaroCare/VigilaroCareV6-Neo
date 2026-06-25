import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../utils/getLocalizedField';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
import { H2, H3, Body, Small } from '../components/NeoTypography';
import { useThemeColors, useIsDark } from '../utils/ThemeContext';

export default function SegurancaLazerScreen({ navigation }) {
    const { t } = useTranslation('common');
  const insets = useSafeAreaInsets();
  const themeColors = useThemeColors();
  const isDark = useIsDark();
  const textPrimary = themeColors.neutral[900];
  const textBody = themeColors.neutral[700];
  const textMuted = themeColors.neutral[500];
  


  const locaisLazer = [
    {
      id: 1,
      local: 'Praia',
        image: require('../assets/illustrations/pad/sub_lazer_praia.png'),
      local_en: 'Beach',
      local_es: 'Playa',
      emoji: '🏖️', // Mantido para fallback se precisar
      icon: 'Sun1',
      iconColor: themeColors.feedback.warning,
      bg: themeColors.neutral[50],
      riscosPrincipais: [
        'Afogamento (correntes de retorno)',
        'Insolação e queimaduras solares',
        'Animais marinhos (águas-vivas)',
        'Crianças perdidas na multidão'
      ],
      riscosPrincipais_en: [
        'Drowning (rip currents)',
        'Sunstroke and sunburns',
        'Marine animals (jellyfish)',
        'Children getting lost in the crowd'
      ],
      riscosPrincipais_es: [
        'Ahogamiento (corrientes de resaca)',
        'Insolación y quemaduras solares',
        'Animales marinos (medusas)',
        'Niños perdidos en la multitud'
      ],
      prevencao: [
        'NUNCA entre no mar sozinho.',
        'Respeite as bandeiras (Vermelha = Perigo).',
        'Nade paralelo à praia, não para o fundo.',
        'Use protetor FPS 50+ a cada 2h.',
        'Pulseira de identificação nas crianças.',
        'Combine um ponto de encontro fixo.'
      ],
      prevencao_en: [
        'NEVER enter the sea alone.',
        'Respect the flags (Red = Danger).',
        'Swim parallel to the beach, not deep out.',
        'Use SPF 50+ sunscreen every 2h.',
        'ID bracelet on children.',
        'Agree on a fixed meeting point.'
      ],
      prevencao_es: [
        'NUNCA entre al mar solo.',
        'Respete las banderas (Roja = Peligro).',
        'Nade paralelo a la playa, no hacia el fondo.',
        'Use protector FPS 50+ cada 2h.',
        'Pulsera de identificación en niños.',
        'Acuerden un punto de encuentro fijo.'
      ],
      emergencias: [
        'Afogamento: Chame o salva-vidas (193).',
        'Queimadura de água-viva: Use vinagre (NÃO use água doce).',
        'Insolação: Leve para sombra e hidrate.'
      ],
      emergencias_en: [
        'Drowning: Call the lifeguard (193).',
        'Jellyfish sting: Use vinegar (DO NOT use fresh water).',
        'Sunstroke: Move to the shade and hydrate.'
      ],
      emergencias_es: [
        'Ahogamiento: Llame al salvavidas (193).',
        'Quemadura de medusa: Use vinagre (NO use agua dulce).',
        'Insolación: Lleve a la sombra e hidrate.'
      ],
      dicasExtras: [
        'Chegue cedo para pegar sombra.',
        'Hidrate-se com água de coco ou isotônico.',
        'Cuidado com buracos na areia.'
      ],
      dicasExtras_en: [
        'Arrive early to get shade.',
        'Hydrate with coconut water or isotonic drinks.',
        'Beware of holes in the sand.'
      ],
      dicasExtras_es: [
        'Llegue temprano para conseguir sombra.',
        'Hidrátese con agua de coco o isotónicos.',
        'Cuidado con los agujeros en la arena.'
      ]
    },
    {
      id: 2,
      local: 'Rio e Lago',
        image: require('../assets/illustrations/pad/sub_lazer_rio_lago.png'),
      local_en: 'River and Lake',
      local_es: 'Río y Lago',
      icon: 'Drop',
      iconColor: themeColors.secondary[500],
      bg: themeColors.neutral[100],
      riscosPrincipais: [
        'Correntezas invisíveis',
        'Buracos e profundidade súbita',
        'Pedras escorregadias',
        'Cabeça d\'água (em cachoeiras)'
      ],
      riscosPrincipais_en: [
        'Invisible currents',
        'Holes and sudden depth',
        'Slippery rocks',
        'Flash floods (in waterfalls)'
      ],
      riscosPrincipais_es: [
        'Corrientes invisibles',
        'Agujeros y profundidad súbita',
        'Piedras resbaladizas',
        'Crecidas repentinas (en cascadas)'
      ],
      prevencao: [
        'Evite nadar após chuvas fortes.',
        'Use colete salva-vidas (boias de braço não salvam).',
        'Não mergulhe de cabeça (pedras submersas).',
        'Saia da água se começar a chover na cabeceira.'
      ],
      prevencao_en: [
        'Avoid swimming after heavy rains.',
        'Use life jacket (arm floats don\'t save).',
        'Do not dive headfirst (submerged rocks).',
        'Leave the water if it starts raining upstream.'
      ],
      prevencao_es: [
        'Evite nadar después de fuertes lluvias.',
        'Use chaleco salvavidas (los manguitos no salvan).',
        'No se tire de cabeza (piedras sumergidas).',
        'Salga del agua si empieza a llover río arriba.'
      ],
      emergencias: [
        'Afogamento: Não tente salvar nadando, jogue uma corda ou galho.',
        'Corte: Lave com água limpa e comprima.'
      ],
      emergencias_en: [
        'Drowning: Do not try to save by swimming, throw a rope or branch.',
        'Cut: Wash with clean water and compress.'
      ],
      emergencias_es: [
        'Ahogamiento: No intente salvar nadando, lance una cuerda o rama.',
        'Corte: Lave con agua limpia y comprima.'
      ],
      dicasExtras: [
        'Use calçados aquáticos (evita cortes).',
        'Cuidado com animais (arraias, cobras).'
      ],
      dicasExtras_en: [
        'Use water shoes (prevents cuts).',
        'Beware of animals (stingrays, snakes).'
      ],
      dicasExtras_es: [
        'Use zapatos acuáticos (evita cortes).',
        'Cuidado con animales (mantarrayas, serpientes).'
      ]
    },
    {
      id: 3,
      local: 'Piscina',
        image: require('../assets/illustrations/pad/sub_lazer_piscina.png'),
      local_en: 'Pool',
      local_es: 'Piscina',
      icon: 'Drop', // Reusing Drop generally
      iconColor: themeColors.secondary[500],
      bg: themeColors.neutral[100],
      riscosPrincipais: [
        'Afogamento silencioso',
        'Escorregões na borda molhada',
        'Sucção de ralos (cabelos)'
      ],
      riscosPrincipais_en: [
        'Silent drowning',
        'Slips on wet edges',
        'Drain suction (hair)'
      ],
      riscosPrincipais_es: [
        'Ahogamiento silencioso',
        'Resbalones en borde mojado',
        'Succión de desagües (cabello)'
      ],
      prevencao: [
        'Supervisão constante de crianças (regra do "vigilante" dedicado).',
        'Cercas de no mínimo 1,20m com portão auto-travante.',
        'Ralos anti-aprisionamento obrigatórios.',
        'Boia salva-vidas e gancho de resgate acessíveis.',
        'Nunca nadar sozinho.'
      ],
      prevencao_en: [
        'Install safety fences (min 1.5m).',
        'Supervision 100% of the time (no phone).',
        'Use anti-entrapment drains.',
        'Do not leave toys in the water (they attract children).'
      ],
      prevencao_es: [
        'Instale cercas de protección (mín. 1.5m).',
        'Supervisión 100% del tiempo (sin celular).',
        'Use desagües anti-atrapamiento.',
        'No deje juguetes en el agua (atraen a los niños).'
      ],
      emergencias: [
        'Afogamento: Tire da água imediatamente e inicie RCP.',
        'Trauma: Se bateu a cabeça, não mova o pescoço.'
      ],
      emergencias_en: [
        'Drowning: Remove from water immediately and start CPR.',
        'Trauma: If they hit their head, do not move the neck.'
      ],
      emergencias_es: [
        'Ahogamiento: Saque del agua inmediatamente e inicie RCP.',
        'Trauma: Si se golpeó la cabeza, no mueva el cuello.'
      ],
      dicasExtras: [
        'Faça aulas de natação desde cedo.',
        'Tenha um telefone sempre à mão.'
      ],
      dicasExtras_en: [
        'Take swimming lessons early on.',
        'Always have a phone handy.'
      ],
      dicasExtras_es: [
        'Tome clases de natación desde temprano.',
        'Tenga siempre un teléfono a mano.'
      ]
    },
    {
      id: 4,
      local: 'Camping e Trilhas',
      image: require('../assets/illustrations/pad/sub_lazer_camping.png'),
      local_en: 'Camping and Trails',
      local_es: 'Camping',
      icon: 'Tree',
      iconColor: themeColors.primary[500],
      bg: themeColors.primary[50],
      riscosPrincipais: [
        'Animais peçonhentos (escorpiões, cobras)',
        'Fogueiras (incêndios)',
        'Hipotermia noturna'
      ],
      riscosPrincipais_en: [
        'Venomous animals (scorpions, snakes)',
        'Campfires (fires)',
        'Nocturnal hypothermia'
      ],
      riscosPrincipais_es: [
        'Animales venenosos (escorpiones, serpientes)',
        'Fogatas (incendios)',
        'Hipotermia nocturna'
      ],
      prevencao: [
        'Avise alguém sobre o destino e horário previsto de retorno.',
        'Leve kit de primeiros socorros.',
        'Proteja-se de animais peçonhentos.',
        'Hidratação constante.'
      ],
      prevencao_en: [
        'Keep the tent closed at all times.',
        'Do not leave food scraps outside (attracts animals).',
        'Build fires in clean areas and isolate them.',
        'Shake out boots before putting them on.'
      ],
      prevencao_es: [
        'Mantenga la tienda siempre cerrada.',
        'No deje restos de comida afuera (atrae animales).',
        'Haga fogatas en un lugar limpio y aíslelas.',
        'Sacuda las botas antes de ponérselas.'
      ],
      emergencias: [
        'Picada: Lave o local e vá ao hospital (leve foto do animal).',
        'Queimadura: Água corrente fria por 10 min.'
      ],
      emergencias_en: [
        'Bite/Sting: Wash the site and go to the hospital (take a photo of the animal).',
        'Burn: Cold running water for 10 min.'
      ],
      emergencias_es: [
        'Picadura: Lave el lugar y vaya al hospital (lleve foto del animal).',
        'Quemadura: Agua corriente fría durante 10 min.'
      ],
      dicasExtras: [
        'Leve lanternas extras e pilhas.',
        'Tenha um kit de primeiros socorros completo.'
      ],
      dicasExtras_en: [
        'Bring extra flashlights and batteries.',
        'Have a complete first aid kit.'
      ],
      dicasExtras_es: [
        'Lleve linternas extra y pilas.',
        'Tenga un botiquín de primeros auxilios completo.'
      ]
    },
    {
      id: 5,
      local: 'Parques e Playgrounds',
      image: require('../assets/illustrations/pad/sub_lazer_parque.png'),
      local_en: 'Amusement Parks',
      local_es: 'Parques de Diversiones',
      icon: 'Ticket',
      iconColor: themeColors.secondary[500],
      bg: themeColors.neutral[50],
      riscosPrincipais: [
        'Perder-se na multidão',
        'Insolação/Desidratação',
        'Acidentes em brinquedos'
      ],
      riscosPrincipais_en: [
        'Getting lost in the crowd',
        'Sunstroke/Dehydration',
        'Ride accidents'
      ],
      riscosPrincipais_es: [
        'Perderse en la multitud',
        'Insolación/Deshidratación',
        'Accidentes en atracciones'
      ],
      prevencao: [
        'Inspeção visual antes de permitir o uso.',
        'Verificar ferrugem, parafusos soltos, pontas perigosas.',
        'Piso deve absorver impacto (borracha, areia).',
        'Supervisão constante.'
      ],
      prevencao_en: [
        'Respect height and age restrictions for rides.',
        'Photo of the child with the outfit of the day.',
        'Set a meeting point.',
        'Use an ID bracelet with parents\' phone number.'
      ],
      prevencao_es: [
        'Respete la altura y edad de las atracciones.',
        'Foto del niño con la ropa del día.',
        'Marque un punto de encuentro.',
        'Use pulsera con el teléfono de los padres.'
      ],
      emergencias: [
        'Perdido: Procure funcionário uniformizado imediatamente.',
        'Mal-estar: Vá ao posto médico do parque.'
      ],
      emergencias_en: [
        'Lost: Look for a uniformed employee immediately.',
        'Feeling unwell: Go to the park\'s medical station.'
      ],
      emergencias_es: [
        'Perdido: Busque a un empleado uniformado inmediatamente.',
        'Malestar: Vaya al puesto médico del parque.'
      ],
      dicasExtras: [
        'Use roupas leves e confortáveis.',
        'Beba muita água.'
      ],
      dicasExtras_en: [
        'Wear light and comfortable clothing.',
        'Drink plenty of water.'
      ],
      dicasExtras_es: [
        'Use ropa ligera y cómoda.',
        'Beba mucha agua.'
      ]
    },
    {
      id: 6,
      local: 'Churrasqueira',
      image: require('../assets/illustrations/pad/sub_lazer_churrasco.png'),
      local_en: 'Barbecue Grill',
      local_es: 'Parrilla',
      icon: 'Fire',
      iconColor: themeColors.feedback.error,
      bg: themeColors.neutral[50],
      riscosPrincipais: [
        'Queimaduras',
        'Incêndio'
      ],
      riscosPrincipais_en: [
        'Burns',
        'Fire'
      ],
      riscosPrincipais_es: [
        'Quemaduras',
        'Incendio'
      ],
      prevencao: [
        'NUNCA use álcool líquido para acender.',
        'Use acendedores próprios sólidos.',
        'Mantenha crianças afastadas.',
        'Botijão em área ventilada.'
      ],
      prevencao_en: [
        'NEVER use liquid alcohol to light it.',
        'Use proper solid fire starters.',
        'Keep children away.',
        'Gas cylinder in a ventilated area.'
      ],
      prevencao_es: [
        'NUNCA use alcohol líquido para encender.',
        'Use encendedores sólidos adecuados.',
        'Mantenga a los niños alejados.',
        'Cilindro de gas en un área ventilada.'
      ],
      emergencias: [
        'Queimadura: Água corrente fria por 10 min.',
        'Incêndio: Use extintor.'
      ],
      emergencias_en: [
        'Burn: Cold running water for 10 min.',
        'Fire: Use a fire extinguisher.'
      ],
      emergencias_es: [
        'Quemadura: Agua corriente fría durante 10 min.',
        'Incendio: Use un extintor.'
      ],
      dicasExtras: [
        'Tenha extintor próximo.'
      ],
      dicasExtras_en: [
        'Have a fire extinguisher nearby.'
      ],
      dicasExtras_es: [
        'Tenga un extintor cerca.'
      ]
    }
  ];

  const handlePress = (item) => {
      navigation.navigate('EduContentDetail', {
          title: t_field(item, 'local'),
          image: item.image,
          sections: [
              {
                  title: t('lazer.riscos', 'Riscos Principais'),
                  icon: 'Warning2',
                  color: themeColors.feedback.warning,
                  bullets: t_array(item, 'riscosPrincipais')
              },
              {
                  title: t('lazer.prevencao', 'Dicas de Prevenção'),
                  icon: 'ShieldTick',
                  color: themeColors.primary[600],
                  bullets: t_array(item, 'prevencao')
              },
              item.emergencias && {
                  title: t('lazer.emergencia', 'Emergência'),
                  icon: 'Health',
                  color: themeColors.feedback.error,
                  bullets: t_array(item, 'emergencias')
              },
              item.dicasExtras && {
                  title: t('lazer.dicasExtras', 'Dicas Extras'),
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
                    {t_array(item, 'riscosPrincipais').length} {t('lazer.riscos', 'riscos')} · {t_array(item, 'prevencao').length} {t('lazer.dicas', 'dicas')}
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

        {/* Header Neo Glass */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: insets.top + 10, paddingBottom: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }}>
            <NeoIcon name="ArrowLeft2" size={24} color={Neo.colors.neutral[800]} />
          </TouchableOpacity>
          <View style={{ marginLeft: 16, flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('headersFirst.lazerDiversO', 'Lazer & Diversão')}</Text>
            <Text style={{ fontSize: 13, color: Neo.colors.neutral[500] }}>{t('headersFirst.aproveiteOsMomentosDeLazerComSeguranA', 'Aproveite os momentos de lazer com segurança.')}</Text>
          </View>
        </View>

      <FlatList
        data={locaisLazer}
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
