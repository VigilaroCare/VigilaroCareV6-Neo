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
        titulo: 'Atragantamiento (Adulto y Niño mayor de 1 año)',
        emoji: '🤢',
        situacao: 'Obstrucción de la vía aérea — protocolo AHA 2025',
        oQueFazer: [
            'Si la persona puede toser con fuerza, anímela a seguir tosiendo. Su propia tos es más eficaz que cualquier maniobra.',
            'Si no puede toser, hablar ni respirar, la obstrucción es total: pida a alguien que llame a {{EMERGENCY_MEDICAL}} y comience las maniobras.',
            'Colóquese detrás, inclínele el tronco hacia adelante y dé 5 golpes firmes entre los omóplatos con el talón de la mano.',
            'Si el objeto no sale, dé 5 compresiones abdominales: puño cerrado justo encima del ombligo, la otra mano encima, tirando hacia adentro y hacia arriba (en "J").',
            'Alterne 5 golpes en la espalda con 5 compresiones abdominales hasta que el objeto salga o la persona pierda el conocimiento.',
            'Si está embarazada, o si no puede abarcar su abdomen con los brazos, sustituya las compresiones abdominales por 5 compresiones en el pecho.',
        ],
        oQueNaoFazer: [
            'No ofrezca agua ni comida: la vía aérea está cerrada.',
            'No introduzca el dedo a ciegas para sacar el objeto — puede empujarlo más adentro.',
            'No interrumpa los ciclos para buscar el objeto. Pare solo si sale o la persona se desvanece.',
        ],
        quandoChamarAjuda: 'En cuanto vea que la persona no puede toser, hablar ni respirar. Si pierde el conocimiento, tiéndala en el suelo e inicie la RCP (ver "Paro Cardíaco").'
    },
    {
        id: 'ps_3',
        titulo: 'Atragantamiento (Bebé menor de 1 año)',
        emoji: '👶',
        situacao: 'Obstrucción en lactantes — protocolo AHA 2025',
        oQueFazer: [
            'Apoye al bebé boca abajo sobre su antebrazo, con la cabeza más baja que el tronco, sujetándole el mentón y la mandíbula con su mano.',
            'Dé 5 golpes firmes en la espalda, entre los omóplatos, con el talón de la mano.',
            'Gírelo boca arriba sobre su antebrazo y dé 5 compresiones en el centro del pecho con el talón de una mano.',
            'Alterne 5 golpes en la espalda con 5 compresiones en el pecho hasta que el objeto salga o el bebé pierda el conocimiento.',
        ],
        oQueNaoFazer: [
            'NUNCA haga compresiones abdominales (Heimlich) en un bebé menor de 1 año: hay riesgo de lesión en el hígado y el bazo.',
            'No sacuda al bebé.',
            'No intente retirar el objeto con el dedo a ciegas.',
        ],
        quandoChamarAjuda: 'En cuanto el bebé deje de llorar, toser o respirar. Si pierde el conocimiento, inicie la RCP de lactante y llame a {{EMERGENCY_MEDICAL}}.'
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
            'Llame de inmediato a {{POISON_CONTROL}}.',
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
