import { useTranslation } from 'react-i18next';
import { t_field, t_array } from '../utils/getLocalizedField';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppBackground from '../components/AppBackground';
import { DS as Neo } from '../utils/DesignSystem2026';
import NeoIcon from '../components/NeoIcon';
import NeoCard from '../components/NeoCard';
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
      riscosPrincipais_ptpt: ['Afogamento (correntes de retorno)', 'Insolação e queimaduras solares', 'Animais marinhos (alforrecas)', 'Crianças perdidas no meio da multidão'],
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
      prevencao_ptpt: ['NUNCA entre no mar sozinho.', 'Respeite as bandeiras (vermelha = perigo).', 'Nade paralelo à praia, não para o largo.', 'Use protetor FPS 50+ a cada 2 h.', 'Pulseira de identificação nas crianças.', 'Combinem um ponto de encontro fixo.'],
      emergencias: [
        'Afogamento: acione o salva-vidas e ligue {{FIRE_NUMBER}}.',
        'Água-viva: lave com água do mar (NÃO use água doce) e tire os tentáculos com um objeto rígido, nunca com a mão.',
        'Insolação: Leve para sombra e hidrate.'
      ],
      emergencias_en: [
        'Drowning: alert the lifeguard and call {{FIRE_NUMBER}}.',
        'Jellyfish sting: rinse with sea water (DO NOT use fresh water) and remove tentacles with something rigid, never by hand.',
        'Sunstroke: Move to the shade and hydrate.'
      ],
      emergencias_es: [
        'Ahogamiento: avise al socorrista y llame al {{FIRE_NUMBER}}.',
        'Picadura de medusa: lave con agua de mar (NO use agua dulce) y retire los tentáculos con un objeto rígido, nunca con la mano.',
        'Insolación: Lleve a la sombra e hidrate.'
      ],
      emergencias_ptpt: ['Afogamento: chame o nadador-salvador e ligue {{FIRE_NUMBER}}.', 'Alforreca: lave com água do mar (NÃO use água doce) e retire os tentáculos com um objeto rígido, nunca com a mão.', 'Insolação: leve para a sombra e hidrate.'],
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
      ],
      dicasExtras_ptpt: ['Chegue cedo para apanhar sombra.', 'Hidrate-se com água ou bebidas isotónicas.', 'Cuidado com buracos na areia.']
    },
    {
      id: 2,
      local: 'Rio e Lago',
        image: require('../assets/illustrations/pad/sub_lazer_rio_lago.png'),
      local_en: 'River and Lake',
      local_es: 'Río y Lago',
      local_ptpt: 'Rio e Lagoa',
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
      riscosPrincipais_ptpt: ['Correntes invisíveis', 'Buracos e profundidade súbita', 'Pedras escorregadias', 'Enxurrada súbita (em cascatas)'],
      prevencao: [
        'Evite nadar após chuvas fortes.',
        'Use colete salva-vidas (boias de braço não salvam).',
        'Não mergulhe de cabeça (pedras submersas).',
        'Saia da água se começar a chover na cabeceira.', 'Consulte a previsão do tempo onde você está e nas proximidades.'
      ],
      prevencao_en: [
        'Avoid swimming after heavy rains.',
        'Use life jacket (arm floats don\'t save).',
        'Do not dive headfirst (submerged rocks).',
        'Leave the water if it starts raining upstream.', 'Check the weather forecast where you are and nearby.'
      ],
      prevencao_es: [
        'Evite nadar después de fuertes lluvias.',
        'Use chaleco salvavidas (los manguitos no salvan).',
        'No se tire de cabeza (piedras sumergidas).',
        'Salga del agua si empieza a llover río arriba.', 'Consulte la previsión del tiempo donde está y en los alrededores.'
      ],
      prevencao_ptpt: ['Evite nadar depois de chuvas fortes.', 'Use colete salva-vidas (as braçadeiras não salvam).', 'Não mergulhe de cabeça (pedras submersas).', 'Saia da água se começar a chover a montante.', 'Consulte a previsão do tempo onde está e nas proximidades.'],
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
      emergencias_ptpt: ['Afogamento: não tente salvar a nado — atire uma corda ou um ramo.', 'Corte: lave com água limpa e comprima.'],
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
      ],
      dicasExtras_ptpt: ['Use calçado aquático (evita cortes).', 'Cuidado com animais (raias, cobras).']
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
      riscosPrincipais_ptpt: ['Afogamento silencioso', 'Escorregadelas na borda molhada', 'Sucção dos ralos (cabelos)'],
      prevencao: [
        'Supervisão constante de crianças (regra do "vigilante" dedicado).',
        'Cercas de no mínimo 1,20 m com portão autotravante.',
        'Ralos antiaprisionamento obrigatórios.',
        'Boia salva-vidas e gancho de resgate acessíveis.',
        'Nunca nadar sozinho.'
      ],
      prevencao_en: ['Constant supervision of children (a dedicated "water watcher").', 'Fences at least 1.2 m (4 ft) high with a self-latching gate.', 'Anti-entrapment drains are a must.', 'Life ring and rescue hook within reach.', 'Never swim alone.'],
      prevencao_es: ['Supervisión constante de los niños (un «vigilante» dedicado).', 'Vallas de al menos 1,20 m con puerta de cierre automático.', 'Desagües antiatrapamiento obligatorios.', 'Aro salvavidas y gancho de rescate a mano.', 'Nunca nadar solo.'],
      prevencao_ptpt: ['Vigilância constante das crianças (regra do «vigilante» dedicado).', 'Vedação com pelo menos 1,20 m e portão com fecho automático.', 'Ralos antiaprisionamento obrigatórios.', 'Boia salva-vidas e gancho de resgate acessíveis.', 'Nunca nadar sozinho.'],
      emergencias: [
        'Afogamento: tire da água e ligue para o {{EMERGENCY_MEDICAL}}; se não respirar e você souber, inicie a RCP.',
        'Trauma: Se bateu a cabeça, não mova o pescoço.'
      ],
      emergencias_en: [
        'Drowning: get them out of the water and call {{EMERGENCY_MEDICAL}}; if they are not breathing and you know how, start CPR.',
        'Trauma: If they hit their head, do not move the neck.'
      ],
      emergencias_es: [
        'Ahogamiento: sáquelo del agua y llame a {{EMERGENCY_MEDICAL}}; si no respira y usted sabe, inicie la RCP.',
        'Trauma: Si se golpeó la cabeza, no mueva el cuello.'
      ],
      emergencias_ptpt: ['Afogamento: retire da água e ligue para o {{EMERGENCY_MEDICAL}}; se não respirar e souber, inicie o SBV.', 'Traumatismo: se bateu com a cabeça, não mexa no pescoço.'],
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
      ],
      dicasExtras_ptpt: ['Aprenda a nadar desde cedo.', 'Tenha sempre um telefone à mão.']
    },
    {
      id: 4,
      local: 'Camping e Trilhas',
      image: require('../assets/illustrations/pad/sub_lazer_camping.png'),
      local_en: 'Camping and Trails',
      local_es: 'Camping',
      local_ptpt: 'Campismo e Trilhos',
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
      riscosPrincipais_ptpt: ['Animais venenosos (escorpiões, cobras)', 'Fogueiras (incêndios)', 'Hipotermia noturna'],
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
      prevencao_ptpt: ['Avise alguém do destino e da hora prevista de regresso.', 'Leve um kit de primeiros socorros.', 'Proteja-se de animais venenosos.', 'Hidratação constante.'],
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
      emergencias_ptpt: ['Picada: lave o local e vá ao hospital (leve uma foto do animal).', 'Queimadura: água corrente fria durante 10 min.'],
      dicasExtras: [
        'Leve lanternas extras e pilhas.',
        'Tenha um kit de primeiros socorros completo.', 'Compartilhe o trajeto com alguém de confiança.'
      ],
      dicasExtras_en: [
        'Bring extra flashlights and batteries.',
        'Have a complete first aid kit.', 'Share your route with someone you trust.'
      ],
      dicasExtras_es: [
        'Lleve linternas extra y pilas.',
        'Tenga un botiquín de primeros auxilios completo.', 'Comparta el recorrido con alguien de confianza.'
      ],
      dicasExtras_ptpt: ['Leve lanternas e pilhas extra.', 'Tenha um kit de primeiros socorros completo.', 'Partilhe o percurso com alguém de confiança.']
    },
    {
      id: 5,
      local: 'Parques e Playgrounds',
      image: require('../assets/illustrations/pad/sub_lazer_parque.png'),
      local_en: 'Amusement Parks',
      local_es: 'Parques de Diversiones',
      local_ptpt: 'Parques e Parques Infantis',
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
      riscosPrincipais_ptpt: ['Perder-se no meio da multidão', 'Insolação/desidratação', 'Acidentes nos equipamentos'],
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
      prevencao_ptpt: ['Inspeção visual antes de deixar usar.', 'Verificar ferrugem, parafusos soltos, pontas perigosas.', 'O piso deve amortecer quedas (borracha, areia).', 'Vigilância constante.'],
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
      emergencias_ptpt: ['Criança perdida: procure de imediato um funcionário fardado.', 'Mal-estar: vá ao posto médico do parque.'],
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
      ],
      dicasExtras_ptpt: ['Use roupa leve e confortável.', 'Beba muita água.']
    },
    {
      id: 6,
      local: 'Churrasqueira',
      image: require('../assets/illustrations/pad/sub_lazer_churrasco.png'),
      local_en: 'Barbecue Grill',
      local_es: 'Parrilla',
      local_ptpt: 'Churrasco e Grelhador',
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
        'Use acendedores próprios sólidos ou elétricos.',
        'Mantenha crianças afastadas.',
        'Botijão em área ventilada.'
      ],
      prevencao_en: [
        'NEVER use liquid alcohol to light it.',
        'Use proper solid or electric fire starters.',
        'Keep children away.',
        'Gas cylinder in a ventilated area.'
      ],
      prevencao_es: [
        'NUNCA use alcohol líquido para encender.',
        'Use encendedores sólidos o eléctricos adecuados.',
        'Mantenga a los niños alejados.',
        'Cilindro de gas en un área ventilada.'
      ],
      prevencao_ptpt: ['NUNCA use álcool líquido para acender.', 'Use acendalhas próprias ou acendedores elétricos.', 'Mantenha as crianças afastadas.', 'Botija numa zona ventilada.'],
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
      emergencias_ptpt: ['Queimadura: água corrente fria durante 10 min.', 'Incêndio: use o extintor.'],
      dicasExtras: [
        'Tenha extintor próximo.'
      ],
      dicasExtras_en: [
        'Have a fire extinguisher nearby.'
      ],
      dicasExtras_es: [
        'Tenga un extintor cerca.'
      ],
      dicasExtras_ptpt: ['Tenha um extintor por perto.']
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
            <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }} accessibilityRole="header">{t('lazerMenu.lazer.title', 'Lazer ao Ar Livre')}</Text>
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
