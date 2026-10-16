export const RISK_CATEGORIES_ES = [
  {
    id: 'festas_eventos',
    title: 'Fiestas y Eventos',
    subtitle: 'Seguridad en reuniones sociales',
    audience: [ 'adult', 'child', 'baby', 'pet' ],
    icon: 'Musicnote',
    color: '#E91E63',
    gradient: [ '#C2185B', '#F48FB1' ],
    educational: {
      description: '**El Riesgo Invisible:** La "responsabilidad difusa" hace que todos piensen que alguien más está vigilando. Las sillas fuera de lugar se convierten en escalones hacia las ventanas, y los vasos con alcohol se olvidan al alcance de los niños.',
      keyPoints: [
        '**Acción Táctica Inmediata:** Aísle físicamente las áreas de riesgo (cierre con llave puertas y cocina).',
        'Para visitas de ancianos, retire inmediatamente las alfombras sueltas.',
        'Advierta a los invitados sobre los desniveles al llegar.',
        'Conozca el ecosistema completo en preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'fes_1',
        critico: true,
        text: '¿El acceso a la piscina está bloqueado físicamente?',
        consequence: 'El ahogamiento es silencioso y toma menos de 2 minutos.',
        checkAction: 'Cierre puertas, use redes o cubra la piscina.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_2',
        critico: true,
        text: '¿Hay un adulto exclusivo supervisando a los niños?',
        consequence: 'La "responsabilidad difusa" es la causa principal de accidentes en eventos.',
        checkAction: 'Designe a un responsable por turno.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_3',
        critico: true,
        text: '¿Las bebidas alcohólicas están fuera del alcance de los menores?',
        consequence: 'La ingestión accidental de alcohol es una emergencia pediátrica.',
        checkAction: 'Mantenga vasos y botellas en una mesa alta.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_4',
        critico: true,
        text: '¿La parrilla/hoguera tiene un perímetro seguro?',
        consequence: 'Quemaduras graves en niños y mascotas.',
        checkAction: 'Delimite con una valla o barrera a 1 m de distancia.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_5',
        critico: true,
        text: '¿Se han guardado los cuchillos y utensilios afilados?',
        consequence: 'Cortes graves durante el movimiento del evento.',
        checkAction: 'Guarde en un cajón cerrado o en un gabinete alto.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_6',
        text: '¿Se ha alertado a los invitados sobre desniveles y escalones?',
        consequence: 'Tropiezos y caídas graves en suelos desconocidos o mal iluminados.',
        checkAction: 'Señalizar con cinta o advertir al llegar.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_7',
        text: '¿Las mascotas están contenidas o con correa?',
        consequence: 'Mordeduras, rasguños o escapes durante la confusión.',
        checkAction: 'Poner en un lugar seguro o mantener con correa.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_8',
        text: '¿Los cables de extensión eléctricos están protegidos y apartados?',
        consequence: 'Tropiezos y riesgo de cortocircuito con líquidos.',
        checkAction: 'Fije los cables con cinta y aléjelos de áreas húmedas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_9',
        critico: true,
        text: 'Si el evento es en un apartamento: ¿están cerrados los balcones y ventanas?',
        consequence: 'Los niños de casa no tienen sentido de la altura — los balcones son trampas.',
        checkAction: 'Cierre ventanas, cierre balcones y aleje los muebles de los bordes.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_10',
        critico: true,
        text: 'Si el evento es en una finca: ¿están cercados los pozos, lagos y ríos?',
        consequence: 'Los niños de apartamento no conocen los riesgos del agua natural.',
        checkAction: 'Mantenga las puertas cerradas con llave y prohíba acercarse al agua sin adultos supervisando.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_11',
        text: '¿Conocen los ancianos y las PCD el diseño del lugar?',
        consequence: 'Los desniveles, escaleras y pisos desconocidos causan caídas.',
        checkAction: 'Dé un recorrido guiado al llegar, señalando los riesgos.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_12',
        text: '¿El baño y las zonas de ocio son accesibles (adaptados)?',
        consequence: 'Exclusión y riesgo de accidentes al improvisar accesos.',
        checkAction: 'Verifique el ancho de las puertas, escalones y baño antes del evento.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'visitacao_segura',
    title: 'Visita Segura',
    subtitle: 'Recibir o visitar a ancianos y bebés',
    audience: [ 'adult', 'baby', 'elderly' ],
    icon: 'UserAdd',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    educational: {
      description: 'Recibir visitas exige adaptar la casa para quien no la conoce. Las personas mayores, los niños y los bebés tienen necesidades de seguridad específicas que quizá no note en el ajetreo diario.',
      keyPoints: [
        'Retire las alfombras sueltas para los visitantes ancianos.',
        'Verifique el ancho de los pasillos y la iluminación de los escalones.',
        'Oculte los cables y proteja los enchufes para los bebés y niños que gatean.',
        'Informe a los invitados sobre los riesgos de la casa (ej., escalón en la sala).'
      ]
    },
    questions: [
      {
        id: 'vis_1',
        critico: true,
        text: '¿Se han retirado las alfombras sueltas y los felpudos?',
        consequence: 'Principal causa de caídas en visitantes ancianos.',
        checkAction: 'Retirar o fijar con antideslizante.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_2',
        text: '¿Están marcados los escalones y desniveles?',
        consequence: 'Los visitantes no conocen el diseño de la casa.',
        checkAction: 'Use cinta antideslizante o advierta al llegar.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_3',
        critico: true,
        text: '¿Se han retirado los objetos pequeños del alcance de los niños?',
        consequence: 'Asfixia con piezas, monedas y decoraciones.',
        checkAction: 'Mire a nivel del suelo.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_4',
        critico: true,
        text: '¿Están protegidos los enchufes bajos?',
        consequence: 'Descarga eléctrica en bebés y niños curiosos.',
        checkAction: 'Coloque protectores de plástico específicos en los enchufes que no use.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_5',
        critico: true,
        text: '¿Están bajo llave los productos de limpieza y los medicamentos?',
        consequence: 'Intoxicaciones accidentales con envases de colores dejados en cajones o debajo del fregadero.',
        checkAction: 'Guarde en un gabinete alto y cerrado.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_6',
        critico: true,
        text: '¿El baño tiene soporte o barras de apoyo para ancianos?',
        consequence: 'Las caídas en el baño pueden ser fatales para los ancianos.',
        checkAction: 'Use una alfombrilla de goma en la ducha y ponga barras de apoyo.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_7',
        critico: true,
        text: '¿Preguntó sobre las alergias alimentarias del visitante?',
        consequence: 'Reacción alérgica grave (anafilaxia).',
        checkAction: 'Confirme antes de ofrecer comida.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_8',
        critico: true,
        text: 'Si el visitante viene de una casa/rural a un apartamento: ¿están seguras las ventanas y balcones?',
        consequence: 'Los niños de casas de un piso no perciben el riesgo de altura.',
        checkAction: 'Cierre ventanas y bloquee el acceso a balcones y ascensores.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_9',
        text: 'Si el visitante viene de un apartamento a una casa/rural: ¿verificó terreno y fauna?',
        consequence: 'Pisos irregulares, animales venenosos y agua abierta son riesgos desconocidos.',
        checkAction: 'Advierta sobre el terreno, calzado adecuado y áreas prohibidas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_10',
        text: '¿Está garantizada la accesibilidad para visitantes con necesidades especiales?',
        consequence: 'Los escalones sueltos o las puertas estrechas causan caídas graves al improvisar.',
        checkAction: 'Verifique la accesibilidad y proporcione rampas si es necesario.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_11',
        text: '¿Se ha informado al anciano/PCD sobre desniveles, escaleras y pisos?',
        consequence: 'La desorientación en un lugar nuevo favorece las caídas graves.',
        checkAction: 'Acompañe al llegar y señale los puntos de atención.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'reformas_obras',
    title: 'Obras y Reparaciones',
    subtitle: 'Mantenimiento y construcción activa',
    audience: [ 'adult' ],
    icon: 'hammer-wrench',
    color: '#795548',
    gradient: [ '#5D4037', '#D7CCC8' ],
    educational: {
      description: 'Las obras en casa siempre lo ponen todo patas arriba. Los cables provisionales expuestos, los clavos, los tornillos y los trozos de madera esparcidos por el suelo son las mayores trampas.',
      keyPoints: [
        '**Acción Táctica Inmediata:** Aísle el área con barreras físicas.',
        'Apague el INTERRUPTOR PRINCIPAL antes de cualquier reparación eléctrica.',
        'Para trabajos en altura, nunca use taburetes; use escaleras aseguradas con un asistente sosteniendo la base.',
        'Más protocolos tácticos en preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'ref_1',
        critico: true,
        text: '¿El área de construcción está cerrada o aislada?',
        consequence: 'Los niños y las mascotas entran, exploran la zona de obra y se lastiman con los escombros.',
        checkAction: 'Use vallas o cierre las puertas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_2',
        text: '¿Se apaga el disyuntor al final del día?',
        consequence: 'Las instalaciones eléctricas provisionales de obra pueden calentarse por la noche y provocar un incendio.',
        checkAction: 'Apague el disyuntor al salir.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_3',
        critico: true,
        text: '¿Se han desenchufado las herramientas eléctricas?',
        consequence: 'Activación accidental por terceros.',
        checkAction: 'Desenchufe después de usar.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_4',
        critico: true,
        text: '¿Se han recogido clavos y materiales afilados?',
        consequence: 'Pinchazos graves y riesgo de tétanos.',
        checkAction: 'Barra y recoja al final de cada día.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_5',
        critico: true,
        text: '¿Están bajo llave los productos químicos (solventes, pinturas)?',
        consequence: 'Riesgo de intoxicación e incendio.',
        checkAction: 'Guarde en un área ventilada y cerrada.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_6',
        critico: true,
        text: '¿Los cables están organizados y lejos del agua?',
        consequence: 'Cortocircuito e incendio.',
        checkAction: 'Ordene los alargadores y manténgalos lejos de la humedad y de las tuberías.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_7',
        text: '¿Los trabajadores llevan EPP adecuado?',
        consequence: 'Lesiones oculares, cortes y caídas.',
        checkAction: 'Exija casco, guantes y gafas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_8',
        text: '¿Se han retirado los escombros o están en un contenedor cerrado?',
        consequence: 'Accidentes con niños y obstrucción del paso.',
        checkAction: 'Retirar a diario o usar contenedor.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'mudanca_residencia',
    title: 'Mudanza de Residencia',
    subtitle: 'Seguridad en el nuevo hogar',
    audience: [ 'adult', 'child', 'baby', 'pet', 'elderly' ],
    icon: 'HomeHash',
    color: '#FF5722',
    gradient: [ '#BF360C', '#FF8A65' ],
    educational: {
      description: '**El Riesgo Invisible:** Las cajas apiladas crean zonas ciegas. La curiosidad infantil en un lugar desconocido provoca accidentes rápidos en ventanas sin malla.',
      keyPoints: [
        '**Acción Táctica Inmediata:** Ubique el disyuntor principal y las válvulas de gas de inmediato.',
        'Fije las estanterías y cómodas a la pared al montarlas para evitar aplastamientos.'
      ]
    },
    questions: [
      {
        id: 'mud_1',
        critico: true,
        text: '¿Se instalaron mallas de seguridad en las ventanas?',
        consequence: 'Alto riesgo de caída en pisos altos.',
        checkAction: 'Mantenga las ventanas cerradas hasta que se instalen las redes. Prefiera empresas especializadas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_2',
        critico: true,
        text: '¿Están fijos a la pared los muebles altos?',
        consequence: 'Vuelco de estantes sobre los niños.',
        checkAction: 'Instale kits antivuelco.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_3',
        text: '¿Identificó el interruptor principal y el gas?',
        consequence: 'Pánico en caso de fuga o corto.',
        checkAction: 'Ubique y pruebe las válvulas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_4',
        text: '¿Están estables las cajas apiladas?',
        consequence: 'Vuelco y obstrucción de salidas.',
        checkAction: 'Apílelas lejos de las puertas.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_5',
        text: '¿Se revisaron los enchufes y cables nuevos?',
        consequence: 'Las instalaciones antiguas pueden calentarse o provocar un cortocircuito con aparatos de alta potencia (vatios).',
        checkAction: 'Pruebe los interruptores automáticos y compruebe si hay cables sueltos en las paredes o calentamiento. Consulte a un profesional cualificado.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_6',
        text: '¿Se supervisa a los niños y mascotas durante la mudanza?',
        consequence: 'Las puertas y portones abiertos todo el tiempo facilitan fugas, caídas o accidentes de tráfico.',
        checkAction: 'Deje a los niños y las mascotas con familiares o en una habitación segura.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'monitor_kids',
    title: 'Monitoreo de Niños',
    subtitle: 'Supervisión activa y rutina',
    audience: [ 'baby', 'child' ],
    icon: 'eye-outline',
    color: '#009688',
    gradient: [ '#00695C', '#4DB6AC' ],
    educational: {
      description: 'Vigilar activamente es la clave para evitar accidentes con los pequeños. Los niños no tienen noción del peligro, son rápidos y se exponen a riesgos en segundos.',
      keyPoints: [
          'Nunca deje a los bebés solos sobre cambiadores o camas.',
          'Impida la entrada de los niños en la cocina cuando el fogón esté en uso.',
          'Compruebe que las redes de protección de las ventanas estén firmes.',
          'Evite distraerse con el móvil, la televisión o las redes sociales si su tarea es vigilar a los niños.',
      ]
    },
    questions: [
      {
        id: 'kid_1',
        critico: true,
        text: '¿Puede ver al niño en este momento?',
        consequence: 'Bastan unos segundos de distracción para que el bebé toque o alcance algo peligroso.',
        checkAction: 'Mantenga contacto visual constante y permanezca siempre cerca del niño.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_2',
        text: '¿El celular está lejos de usted?',
        consequence: 'Consultar redes sociales o intercambiar mensajes le quita la atención inmediata.',
        checkAction: 'Deje el celular en otra habitación.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_3',
        critico: true,
        text: '¿Las ventanas de la habitación tienen redes de protección adecuadas y en buen estado?',
        consequence: 'Las caídas son la principal causa de muerte infantil.',
        checkAction: 'Instale redes de protección y mantenga las ventanas cerradas si no las tiene.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_4',
        critico: true,
        text: '¿Es inaccesible la cocina durante la preparación?',
        consequence: 'Quemaduras por líquidos calientes y ollas.',
        checkAction: 'Mantenga cerrada la puerta de la cocina o use barreras de seguridad.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_5',
        critico: true,
        text: '¿Las medicinas y los productos de limpieza están bajo llave?',
        consequence: 'La intoxicación es una emergencia frecuente en menores de 5 años.',
        checkAction: 'Guarde los desinfectantes y las pastillas en estantes fuera del alcance de los niños.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_6',
        critico: true,
        text: '¿Se ha asegurado de que no hay monedas ni pilas en el suelo?',
        consequence: 'Los bebés se lo llevan todo a la boca. Las pilas provocan asfixia o quemaduras en el esófago.',
        checkAction: 'Haga un barrido a nivel del suelo.',
        options: [ { label: 'No', safe: true }, { label: 'Sí', safe: false } ]
      }
    ]
  },
  {
    id: 'servicos_altura',
    title: 'Trabajos en Altura',
    subtitle: 'Limpieza de techos y cortinas',
    audience: [ 'adult' ],
    icon: 'ladder',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    educational: {
      description: 'Las caídas son la principal causa de accidentes domésticos graves, especialmente en ancianos.',
      keyPoints: [
        'Nunca use sillas, taburetes o cajas como escalera.',
        'Mantenga la escalera completamente abierta y asegurada.',
        'Siempre tenga un asistente sosteniendo la base de la escalera.',
        'No intente alcanzar lugares lejanos; baje y mueva la escalera.',
        'Nunca use escaleras de metal cerca de redes eléctricas.'
      ]
    },
    questions: [
      {
        id: 'alt_1',
        critico: true,
        text: '¿Está usando una escalera adecuada (no una silla)?',
        consequence: 'Subirse a sillas o cajas es peligroso, inestable y provoca caídas.',
        checkAction: 'Use una escalera doméstica que tenga {{CERT_SEAL}}.',
        options: [
          { label: 'Sí', safe: true },
          { label: 'Usé silla', safe: false }
        ]
      },
      {
        id: 'alt_2',
        text: '¿Alguien está sosteniendo la base de la escalera?',
        consequence: 'La escalera puede resbalar en pisos lisos.',
        checkAction: 'Pida a alguien que sujete la base de la escalera para evitar que resbale.',
        options: [
          { label: 'Sí', safe: true },
          { label: 'Estoy solo', safe: false }
        ]
      },
      {
        id: 'alt_3',
        critico: true,
        text: '¿La escalera está completamente abierta y asegurada?',
        consequence: 'Una escalera mal asegurada se cierra.',
        checkAction: 'Revise los seguros antes de subir.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_4',
        critico: true,
        text: '¿El piso donde descansa la escalera es firme y seco?',
        consequence: 'Apoyarla en un suelo mojado o irregular hace que la escalera resbale o vuelque.',
        checkAction: 'Seque el suelo y despeje la zona antes de colocarla.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_5',
        text: '¿Evita inclinarse demasiado hacia los lados?',
        consequence: 'El desequilibrio provoca una caída.',
        checkAction: 'Baje y reubique la escalera.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_6',
        critico: true,
        text: 'Si va a subir al tejado o a la azotea, ¿ha valorado llamar a un profesional especializado?',
        consequence: 'Las caídas desde tejados y azoteas, o al romperse la cubierta, suelen ser mortales.',
        checkAction: 'Contrate a un tejador o especialista en canalones en lugar de arriesgarse.',
        options: [
          { label: 'Sí', safe: true },
          { label: 'Lo haré', safe: false }
        ]
      }
    ]
  },
  {
    id: 'faxina_quimica',
    title: 'Limpieza Profunda',
    subtitle: 'Manejo de Productos Químicos',
    audience: [ 'adult' ],
    icon: 'bottle-tonic-skull',
    color: '#9C27B0',
    gradient: [ '#7B1FA2', '#E1BEE7' ],
    educational: {
      description: 'Mezclar productos de limpieza puede generar gases venenosos invisibles que queman los pulmones. Use un producto cada vez y mantenga la casa ventilada.',
      keyPoints: [
        'NUNCA mezcle productos de limpieza: combine solo lo que la etiqueta autorice.',
        'La lejía con ácidos (vinagre, salfumán, antical) libera gas cloro; con amoníaco o alcohol, otros gases tóxicos.',
        'Mantenga la habitación muy ventilada.',
        'Use guantes para evitar quemaduras.',
        'No guarde productos en botellas de refresco.'
      ]
    },
    questions: [
      {
        id: 'qui_1',
        critico: true,
        text: '¿Están abiertas las ventanas y puertas de la zona de limpieza?',
        consequence: 'Acumulación de vapores tóxicos en el interior.',
        checkAction: 'Ábralo todo para que el aire circule y se renueve.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_2',
        critico: true,
        text: '¿Está mezclando productos de limpieza?',
        consequence: 'Lejía + otros productos genera gas letal.',
        checkAction: 'Use un producto a la vez. Enjuague antes del siguiente.',
        options: [ { label: 'No', safe: true }, { label: 'Sí', safe: false } ]
      },
      {
        id: 'qui_3',
        text: '¿Lleva guantes protectores?',
        consequence: 'La lejía y los ácidos provocan dermatitis y quemaduras químicas en la piel.',
        checkAction: 'Use guantes de goma antes de manipular.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_4',
        critico: true,
        text: '¿Están los niños y las mascotas lejos de la limpieza?',
        consequence: 'Respiran los vapores del suelo o pueden beber el agua sucia del cubo.',
        checkAction: 'Manténgalos en otra habitación durante la limpieza.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_5',
        critico: true,
        text: '¿Están los productos en envases originales (no en PET)?',
        consequence: 'Guardar desinfectante o lejía en una botella de zumo provoca intoxicaciones accidentales.',
        checkAction: 'Nunca los pase a botellas de refresco.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_6',
        text: '¿Señalizó el piso mojado?',
        consequence: 'Los resbalones en el suelo enjabonado provocan caídas peligrosas.',
        checkAction: 'Use un letrero o advierta a los residentes.',
        options: [ { label: 'Sí', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  }
];

export default RISK_CATEGORIES_ES;
