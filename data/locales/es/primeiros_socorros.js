export const primeirosSocorrosES = [
    {
        id: 'ps_1',
        titulo: 'Quemaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química o Eléctrica',
        oQueFazer: [
            'Aleje a la víctima de la fuente de calor.',
            'Enfríe el área con agua corriente (temperatura ambiente) durante 15-20 minutos.',
            'Retire accesorios (anillos, relojes) antes de que la zona se hinche.',
            'Cubra con un paño limpio y húmedo.',
        ],
        oQueNaoFazer: [
            'NUNCA aplique pasta de dientes, mantequilla, café o hielo directo.',
            'NO reviente las ampollas.',
            'NO intente despegar ropa quemada de la piel.',
        ],
        quandoChamarAjuda: 'Si la quemadura es extensa, en el rostro, manos, genitales o en niños/ancianos.'
    },
    {
        id: 'ps_2',
        titulo: 'Atragantamiento (Adulto/Niño)',
        emoji: '🤢',
        situacao: 'Obstrucción de la vía aérea',
        oQueFazer: [
            'Anime a la persona a toser si puede hacerlo.',
            'Si no emite sonido: Inicie la Maniobra de Heimlich.',
            'Colóquese detrás, cierre el puño en la boca del estómago.',
            'Haga compresiones fuertes hacia adentro y hacia arriba (forma de J).',
        ],
        oQueNaoFazer: [
            'No dé golpes en la espalda si la persona está de pie (puede empeorar).',
            'No ofrezca agua.',
        ],
        quandoChamarAjuda: 'Si la persona pierde el conocimiento (iniciar RCP) o no se desobstruye.'
    },
    {
        id: 'ps_3',
        titulo: 'Atragantamiento (Bebé)',
        emoji: '👶',
        situacao: 'Obstrucción en lactantes',
        oQueFazer: [
            'Apoye al bebé boca abajo sobre su antebrazo, cabeza más baja que el cuerpo.',
            'Dé 5 golpes firmes en la espalda (entre los omóplatos).',
            'Gírelo boca arriba y haga 5 compresiones en el pecho con dos dedos.',
            'Repita hasta desobstruir.',
        ],
        oQueNaoFazer: [
            'No sacuda al bebé.',
            'No intente retirar el objeto con el dedo a ciegas.',
        ],
        quandoChamarAjuda: 'Si el bebé se pone morado o pierde el conocimiento.'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes y Sangrados',
        emoji: '🩸',
        situacao: 'Heridas abiertas',
        oQueFazer: [
            'Lave con agua y jabón neutro.',
            'Comprima el lugar con un paño limpio haciendo presión directa por 5-10 min.',
            'Mantenga el miembro elevado si es posible.',
        ],
        oQueNaoFazer: [
            'No haga un torniquete (excepto en amputación o riesgo de vida extremo).',
            'No ponga café ni azúcar.',
        ],
        quandoChamarAjuda: 'Si el sangrado no se detiene, es profundo o necesita puntos de sutura.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Eléctrico',
        emoji: '⚡',
        situacao: 'Contacto con corriente eléctrica',
        oQueFazer: [
            'Apague la fuente de energía (disyuntor) INMEDIATAMENTE.',
            'Si no puede apagarla, aleje a la víctima usando un objeto NO conductor (palo de escoba seco).',
            'Verifique respiración y pulso.',
        ],
        oQueNaoFazer: [
            'NUNCA toque a la víctima si aún está conectada a la corriente.',
        ],
        quandoChamarAjuda: 'SIEMPRE llame a emergencias. Los choques pueden causar arritmias tardías.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicación',
        emoji: '☠️',
        situacao: 'Ingestión de veneno/químicos',
        oQueFazer: [
            'Identifique el producto ingerido.',
            'Llame al Centro de Intoxicaciones (CIATOX).',
            'Siga las instrucciones del operador.',
        ],
        oQueNaoFazer: [
            'NO provoque el vómito (puede quemar el esófago nuevamente).',
            'No dé leche o agua sin orientación.',
        ],
        quandoChamarAjuda: 'Inmediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Caídas y Fracturas',
        emoji: '🤕',
        situacao: 'Caída de altura o impacto fuerte',
        oQueFazer: [
            'Mantenga a la víctima inmóvil, especialmente si hay dolor en espalda o cuello.',
            'Aplique hielo en el lugar del impacto (envuelto en paño, no directo a la piel).',
            'Si hay sangrado, haga compresión.',
        ],
        oQueNaoFazer: [
            'NO intente colocar el hueso en su lugar.',
            'NO mueva a la víctima si sospecha de lesión en la columna.',
        ],
        quandoChamarAjuda: 'Si hay deformidad, dolor intenso, imposibilidad de movimiento o desmayo.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craneoencefálico',
        emoji: '🧠',
        situacao: 'Golpe fuerte en la cabeza',
        oQueFazer: [
            'Observe a la víctima en las próximas 24 horas.',
            'Mantenga a la persona despierta si está somnolienta tras el golpe.',
            'Aplique compresa fría para reducir la hinchazón.',
        ],
        oQueNaoFazer: [
            'No ignore síntomas como vómito o confusión mental.',
            'No administre medicamentos para dormir.',
        ],
        quandoChamarAjuda: 'Vómitos, desmayo, sangrado por nariz/oído, pupilas de diferentes tamaños.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicación Alimentaria',
        emoji: '🤢',
        situacao: 'Vómitos y diarrea tras comer',
        oQueFazer: [
            'Hidrátese con suero oral o agua de coco en pequeños sorbos.',
            'Haga reposo.',
            'Mantenga una dieta ligera (sin grasa/lácteos) cuando vuelva el hambre.',
        ],
        oQueNaoFazer: [
            'No tome remedios para "frenar" el intestino (la toxina debe salir).',
            'No fuerce la alimentación si está vomitando.',
        ],
        quandoChamarAjuda: 'Signos de deshidratación (boca seca, sin orina), sangre en heces o fiebre alta.'
    },
    {
        id: 'ps_10',
        titulo: 'Cuerpos Extraños',
        emoji: '👁️',
        situacao: 'Objeto en ojo, nariz u oído',
        oQueFazer: [
            'Ojos: Lave con abundante suero fisiológico o agua corriente.',
            'Nariz/Oído: Si es visible y fácil, intente retirar con pinzas (CUIDADO).',
            'Mejor opción: Busque atención médica.',
        ],
        oQueNaoFazer: [
            'NO frote los ojos (puede rayar la córnea).',
            'NO use hisopos para empujar objetos en el oído.',
            'NO intente retirar objetos profundos.',
        ],
        quandoChamarAjuda: 'Siempre que no salga fácilmente con lavado o si hay dolor/visión borrosa.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordeduras de Animales',
        emoji: '🐕',
        situacao: 'Perro, gato u otros',
        oQueFazer: [
            'Lave la herida con agua y jabón por 5-10 minutos.',
            'Comprima para detener el sangrado.',
            'Busque atención médica para evaluar vacuna antirrábica/tétanos.',
        ],
        oQueNaoFazer: [
            'No cierre la herida con puntos en casa.',
            'No ignore mordeduras pequeñas (alto riesgo de infección).',
        ],
        quandoChamarAjuda: 'Siempre, para protocolo de vacunación y limpieza profunda.'
    },
    {
        id: 'ps_12',
        titulo: 'Malestar Súbito',
        emoji: '😵',
        situacao: 'Mareo, debilidad, palidez o dolor en el pecho',
        oQueFazer: [
            'Siente o acueste a la víctima en un lugar ventilado.',
            'Afloje prendas ajustadas (cuello, cinturón).',
            'Pregunte si toma algún medicamento y si ya sintió esto antes.',
        ],
        oQueNaoFazer: [
            'NO dé agua o comida si la persona está confundida.',
            'NO deje a la víctima sola.',
        ],
        quandoChamarAjuda: 'Si los síntomas no pasan en pocos minutos o si hay dolor de pecho intenso.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmayo (Síncope)',
        emoji: '💤',
        situacao: 'Pérdida súbita y breve de consciencia',
        oQueFazer: [
            'Acueste a la persona boca arriba.',
            'Eleve las piernas (por encima del nivel del corazón) para facilitar el retorno sanguíneo.',
            'Monitoree la respiración.',
        ],
        oQueNaoFazer: [
            'NO arroje agua a la cara.',
            'NO ofrezca alcohol o amoníaco para oler.',
            'NO intente levantar a la persona rápidamente.',
        ],
        quandoChamarAjuda: 'Si la persona no despierta en 1-2 minutos o si cayó y se golpeó la cabeza.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsión',
        emoji: '🧠',
        situacao: 'Espasmos musculares, pérdida de consciencia, salivación',
        oQueFazer: [
            'Proteja la cabeza (coloque una almohada o abrigo debajo).',
            'Aleje objetos peligrosos del entorno.',
            'Cronometre el tiempo de la crisis.',
            'Al terminar, ponga a la persona de lado (posición de recuperación).',
        ],
        oQueNaoFazer: [
            'NUNCA sujete la lengua o meta la mano en la boca de la víctima.',
            'NO intente contener los movimientos a la fuerza.',
            'NO dé agua ni medicinas durante la crisis.',
        ],
        quandoChamarAjuda: 'Si la crisis dura más de 5 minutos, si es la primera vez, o si le sigue otra crisis de inmediato.'
    },
    {
        id: 'ps_15',
        titulo: 'ACV (Derrame Cerebral)',
        emoji: '🥴',
        situacao: 'Boca torcida, habla confusa, pérdida de fuerza',
        oQueFazer: [
            'Haga la prueba FAST: Cara (¿torcida?), Brazos (¿pérdida de fuerza?), Habla (¿confusa?), Tiempo (llame a emergencias).',
            'Anote la hora exacta de inicio de los síntomas.',
            'Mantenga a la víctima en reposo absoluto.',
        ],
        oQueNaoFazer: [
            'NO espere a que los síntomas pasen.',
            'NO dé aspirina o ningún remedio (puede empeorar si es hemorrágico).',
        ],
        quandoChamarAjuda: 'INMEDIATAMENTE. El tiempo es cerebro.'
    },
    {
        id: 'ps_16',
        titulo: 'Paro Cardíaco',
        emoji: '💔',
        situacao: 'Víctima inconsciente y SIN respiración',
        oQueFazer: [
            'Llame a emergencias y pida un DEA (Desfibrilador) si lo hay.',
            'Inicie la RCP (Masaje Cardíaco) INMEDIATAMENTE.',
            'Comprima el centro del pecho fuerte y rápido (100-120 por minuto).',
            'Permita el retorno total del tórax tras cada compresión.',
        ],
        oQueNaoFazer: [
            'NO detenga el masaje hasta que llegue ayuda o la víctima reaccione.',
            'NO tenga miedo de romper costillas (es mejor que la muerte).',
        ],
        quandoChamarAjuda: 'INMEDIATAMENTE.'
    }
];
