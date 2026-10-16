export const primeirosSocorrosES = [
    {
        id: 'ps_1',
        titulo: 'Quemaduras',
        emoji: '🔥',
        situacao: 'Térmica, Química o Eléctrica',
        oQueFazer: [
            'Aleje a la persona del fuego o de la fuente de calor.',
            'Enfríe la zona con agua corriente a temperatura ambiente durante 15 a 20 minutos.',
            'Quite anillos, pulseras y relojes antes de que la zona empiece a hincharse.',
            'Cubra la herida con cuidado con un paño limpio y húmedo.',
        ],
        oQueNaoFazer: [
            'NUNCA aplique pomadas, pasta de dientes, mantequilla, café molido ni hielo directamente sobre la quemadura.',
            'NO reviente las ampollas que se formen.',
            'NO intente arrancar trozos de ropa pegados a la piel quemada.',
        ],
        quandoChamarAjuda: 'Pida ayuda si la quemadura es mayor que la palma de la mano, afecta la cara, las manos o los genitales, o si la sufre un niño o una persona mayor.'
    },
    {
        id: 'ps_2',
        titulo: 'Atragantamiento (Adulto y Niño mayor de 1 año)',
        emoji: '🤢',
        situacao: 'Obstrucción de la vía aérea — protocolo AHA 2025',
        oQueFazer: [
            'Anime a toser si la persona puede toser con fuerza (la tos es la maniobra más eficaz en la obstrucción parcial).',
            'Pida a alguien que llame a {{EMERGENCY_MEDICAL}} e inicie las maniobras si la persona no puede toser, hablar ni respirar (obstrucción total).',
            'Colóquese detrás de la persona, inclínele el tronco ligeramente hacia delante y dé 5 golpes firmes en la espalda, entre los omóplatos, con el talón de la mano.',
            'Si el objeto no sale, dé 5 compresiones abdominales (maniobra de Heimlich): coloque el puño cerrado justo encima del ombligo, cúbralo con la otra mano y tire hacia dentro y hacia arriba en forma de \'J\'.',
            'Alterne continuamente 5 golpes en la espalda con 5 compresiones abdominales hasta que el objeto salga o la persona pierda el conocimiento.',
            'En embarazadas, o en personas con obesidad cuando no sea posible abarcar el abdomen, sustituya las compresiones abdominales por 5 compresiones en el centro del pecho.',
        ],
        oQueNaoFazer: [
            'NO ofrezca agua ni comida (la vía aérea está obstruida).',
            'NO introduzca los dedos en la boca a ciegas para intentar sacar el objeto (puede empujarlo más adentro).',
            'NO interrumpa los ciclos de 5 golpes y 5 compresiones para buscar el objeto, salvo que sea visible o la persona se desmaye.',
        ],
        quandoChamarAjuda: 'Llame a {{EMERGENCY_MEDICAL}} en cuanto identifique una obstrucción total. Si la persona pierde el conocimiento, acuéstela en el suelo e inicie de inmediato la RCP con compresiones torácicas.'
    },
    {
        id: 'ps_3',
        titulo: 'Atragantamiento (Bebé menor de 1 año)',
        emoji: '👶',
        situacao: 'Obstrucción en lactantes — protocolo AHA 2025',
        oQueFazer: [
            'Apoye al bebé boca abajo sobre su antebrazo, con la cabeza más baja que el tronco, sujetando firmemente el mentón y la mandíbula sin apretar el cuello.',
            'Dé 5 golpes firmes en la espalda, entre los omóplatos, con el talón de la mano.',
            'Gire al bebé boca arriba sobre su antebrazo y dé 5 compresiones en el centro del pecho con el talón de una mano.',
            'Alterne ciclos de 5 golpes en la espalda y 5 compresiones en el pecho hasta que el objeto salga o el bebé pierda el conocimiento.',
        ],
        oQueNaoFazer: [
            'NUNCA haga compresiones abdominales (Heimlich) en bebés menores de 1 año (riesgo de lesión grave en órganos internos como el hígado y el bazo).',
            'NUNCA sacuda al bebé.',
            'NO introduzca los dedos en la boca del bebé a ciegas si el objeto o el alimento no se ven dentro de la boca.',
        ],
        quandoChamarAjuda: 'Llame a {{EMERGENCY_MEDICAL}} en cuanto note que el bebé no llora, no tose o no respira. Si el bebé se desmaya, inicie la RCP del lactante (30 compresiones por 2 ventilaciones).'
    },
    {
        id: 'ps_4',
        titulo: 'Cortes y Sangrados',
        emoji: '🩸',
        situacao: 'Heridas abiertas',
        oQueFazer: [
            'Lave el corte con suavidad con suero fisiológico o agua y jabón neutro.',
            'Presione la zona con firmeza con un paño limpio durante 5 a 10 minutos sin soltar.',
            'Mantenga elevado el miembro afectado (brazo o pierna) para reducir la presión y el flujo de sangre.',
        ],
        oQueNaoFazer: [
            'NO haga torniquetes (úselos solo en amputaciones o sangrados arteriales gravísimos que no se detienen con presión).',
            'NO ponga café molido, azúcar ni pomadas en el corte.',
        ],
        quandoChamarAjuda: 'Pida ayuda si el sangrado no se detiene tras 10 minutos de presión directa, si el corte es muy profundo o si los bordes quedan abiertos.'
    },
    {
        id: 'ps_5',
        titulo: 'Choque Eléctrico',
        emoji: '⚡',
        situacao: 'Contacto con corriente eléctrica',
        oQueFazer: [
            'Desconecte el interruptor general del cuadro eléctrico DE INMEDIATO.',
            'Si no puede cortar la corriente, aleje a la persona de la fuente con un objeto de madera o plástico seco (como el palo seco de una escoba).',
            'Tras apartarla de la fuente eléctrica, compruebe si la persona respira y tiene latidos.',
        ],
        oQueNaoFazer: [
            'NUNCA toque a la persona si aún está en contacto con la corriente eléctrica.',
        ],
        quandoChamarAjuda: 'Llame SIEMPRE a {{EMERGENCY_MEDICAL}}: la corriente eléctrica puede provocar arritmias cardíacas horas después.'
    },
    {
        id: 'ps_6',
        titulo: 'Intoxicación',
        emoji: '☠️',
        situacao: 'Ingestión de veneno/químicos',
        oQueFazer: [
            'Identifique de inmediato qué producto o medicamento ha tragado la persona.',
            'Llame de inmediato al centro de información toxicológica: {{POISON_CONTROL}}.',
            'Siga al pie de la letra las indicaciones del personal sanitario.',
        ],
        oQueNaoFazer: [
            'NO provoque el vómito, salvo que el centro de toxicología lo indique (los productos corrosivos queman el esófago al bajar y al subir).',
            'NO dé leche, agua ni remedios caseros sin indicación médica previa.',
        ],
        quandoChamarAjuda: 'Inmediatamente.'
    },
    {
        id: 'ps_7',
        titulo: 'Caídas y Fracturas',
        emoji: '🤕',
        situacao: 'Caída de altura o impacto fuerte',
        oQueFazer: [
            'Mantenga a la persona acostada e inmóvil, sobre todo si hay dolor de espalda o de cuello.',
            'Aplique una bolsa de hielo envuelta en una toalla sobre la zona dolorida.',
            'Si hay una herida que sangra, presione suavemente con un paño limpio.',
        ],
        oQueNaoFazer: [
            'NO intente alinear el hueso ni volver a colocarlo en su sitio.',
            'NO mueva ni levante a la persona si se sospecha una lesión en la columna.',
        ],
        quandoChamarAjuda: 'Pida ayuda si hay deformidad visible del hueso, dolor muy fuerte, incapacidad para mover el miembro o desmayo.'
    },
    {
        id: 'ps_8',
        titulo: 'Traumatismo Craneoencefálico',
        emoji: '🧠',
        situacao: 'Golpe fuerte en la cabeza',
        oQueFazer: [
            'Observe atentamente a la persona durante las 24 horas siguientes.',
            'Mantenga a la persona despierta y conversando durante un tiempo tras el golpe.',
            'Aplique una compresa fría en la zona para contener la hinchazón.',
        ],
        oQueNaoFazer: [
            'NO ignore síntomas como vómitos, mareos o fallos de memoria.',
            'NO administre analgésicos fuertes ni sedantes sin indicación médica.',
        ],
        quandoChamarAjuda: 'Pida ayuda si la persona vomita, se desmaya, sangra por la nariz o los oídos, o si las pupilas tienen tamaños distintos.'
    },
    {
        id: 'ps_9',
        titulo: 'Intoxicación Alimentaria',
        emoji: '🤢',
        situacao: 'Vómitos y diarrea tras comer',
        oQueFazer: [
            'Tome suero oral de rehidratación o agua de coco a sorbos pequeños a lo largo del día.',
            'Haga reposo.',
            'Coma alimentos ligeros y sin grasa (como arroz blanco, patata y tostadas) cuando vuelva el apetito.',
        ],
        oQueNaoFazer: [
            'NO tome medicamentos para cortar la diarrea (el cuerpo necesita eliminar las toxinas).',
            'NO se fuerce a comer si tiene náuseas fuertes.',
        ],
        quandoChamarAjuda: 'Pida ayuda si nota signos de deshidratación (boca seca, ausencia de lágrimas u orina durante horas), fiebre alta o sangre en las heces.'
    },
    {
        id: 'ps_10',
        titulo: 'Cuerpos Extraños',
        emoji: '👁️',
        situacao: 'Objeto en ojo, nariz u oído',
        oQueFazer: [
            'Ojos: lave con abundante suero fisiológico o agua tibia corriente.',
            'Nariz/oído: intente retirarlo con cuidado con unas pinzas solo si el objeto es visible y está en la entrada.',
            'Acuda a urgencias si el objeto está profundo o es difícil de retirar.',
        ],
        oQueNaoFazer: [
            'NO se frote los ojos (riesgo de lesión en la córnea por roce).',
            'NO introduzca bastoncillos ni objetos puntiagudos en el oído (riesgo de empujar el objeto o perforar el tímpano).',
        ],
        quandoChamarAjuda: 'Pida ayuda siempre que el objeto no salga con facilidad en el primer lavado suave o si hay dolor o visión borrosa.'
    },
    {
        id: 'ps_11',
        titulo: 'Mordeduras de Animales',
        emoji: '🐕',
        situacao: 'Perro, gato u otros',
        oQueFazer: [
            'Lave bien la herida con agua corriente y jabón neutro durante 10 minutos.',
            'Si sangra, presione con un paño limpio.',
            'Acuda a urgencias para una limpieza profunda y para valorar la necesidad de vacuna antirrábica y antitetánica.',
        ],
        oQueNaoFazer: [
            'NO intente coser ni cerrar la herida en casa.',
            'NO ignore las mordeduras pequeñas (la saliva del animal tiene bacterias que causan infecciones rápidas).',
        ],
        quandoChamarAjuda: 'Pida ayuda ante cualquier mordedura que rompa la piel, para su valoración y el protocolo de vacunación preventiva.'
    },
    {
        id: 'ps_12',
        titulo: 'Malestar Súbito',
        emoji: '😵',
        situacao: 'Mareo, debilidad, palidez o dolor en el pecho',
        oQueFazer: [
            'Ayude a la persona a sentarse o acostarse en un lugar fresco y ventilado.',
            'Afloje la ropa ajustada, como cuellos de camisa y cinturones.',
            'Pregunte por problemas de salud conocidos y medicación habitual.',
        ],
        oQueNaoFazer: [
            'NO dé agua ni comida si la persona está confusa o desorientada.',
            'NO deje sola a la persona.',
        ],
        quandoChamarAjuda: 'Pida ayuda si la persona no mejora en 2 minutos, se desmaya o refiere dolor fuerte u opresión en el pecho.'
    },
    {
        id: 'ps_13',
        titulo: 'Desmayo (Síncope)',
        emoji: '💤',
        situacao: 'Pérdida súbita y breve de consciencia',
        oQueFazer: [
            'Acueste a la persona boca arriba.',
            'Eleve las piernas unos 30 cm del suelo para favorecer el retorno de la sangre y la circulación cerebral.',
            'Vigile la respiración de forma continua.',
        ],
        oQueNaoFazer: [
            'NO eche agua fría en la cara de la persona.',
            'NO le dé a oler alcohol, perfume ni ninguna otra sustancia.',
            'NO intente levantar a la persona con prisa en cuanto recupere la conciencia.',
        ],
        quandoChamarAjuda: 'Pida ayuda si la persona tarda más de 2 minutos en despertar o si sufrió una caída grave con golpe en la cabeza.'
    },
    {
        id: 'ps_14',
        titulo: 'Convulsión',
        emoji: '🧠',
        situacao: 'Espasmos musculares, pérdida de consciencia, salivación',
        oQueFazer: [
            'Proteja la cabeza de la persona colocando debajo una chaqueta doblada o un cojín.',
            'Aparte sillas y objetos duros para evitar golpes durante las sacudidas.',
            'Cronometre la duración de la crisis. Si dura más de 3 minutos, ya requiere mayor atención.',
            'Coloque a la persona de lado (posición lateral de seguridad) en cuanto pase la crisis.',
        ],
        oQueNaoFazer: [
            'NUNCA intente sujetar la lengua de la persona ni ponerle objetos o dedos en la boca.',
            'NO sujete con fuerza los movimientos de brazos y piernas.',
            'NO dé agua ni medicamentos mientras dure la convulsión.',
        ],
        quandoChamarAjuda: 'Pida ayuda si la crisis dura más de 5 minutos, si es el primer episodio o si hay crisis consecutivas.'
    },
    {
        id: 'ps_15',
        titulo: 'ACV (Derrame Cerebral)',
        emoji: '🥴',
        situacao: 'Boca torcida, habla confusa, pérdida de fuerza',
        oQueFazer: [
            'Haga la prueba rápida: pida a la persona que sonría (¿se le tuerce la boca?), que levante los dos brazos (¿cae uno?) y que repita una frase (¿habla arrastrada?). Si aparece cualquier signo, es urgente.',
            'Anote la hora exacta en que empezaron los síntomas.',
            'Llame de inmediato a {{EMERGENCY_MEDICAL}}.',
        ],
        oQueNaoFazer: [
            'NO espere a que los síntomas mejoren solos.',
            'NO administre medicamentos (como aspirina o calmantes) antes de la valoración médica.',
        ],
        quandoChamarAjuda: 'Llame a {{EMERGENCY_MEDICAL}} en cuanto observe cualquier signo de la prueba rápida. El tiempo es vital para evitar secuelas.'
    },
    {
        id: 'ps_16',
        titulo: 'Paro Cardíaco',
        emoji: '💔',
        situacao: 'Víctima inconsciente y SIN respiración',
        oQueFazer: [
            'Llame de inmediato a {{EMERGENCY_MEDICAL}} y pida un Desfibrilador Externo Automático (DEA), si hay uno disponible en el lugar.',
            'Inicie las compresiones torácicas (RCP) sin perder tiempo.',
            'Entrelace las manos, coloque el talón de la mano en el centro del pecho de la víctima (sobre el esternón) y comprima fuerte y rápido (100 a 120 compresiones por minuto, hundiendo unos 5 a 6 cm).',
            'Deje que el pecho vuelva por completo a su posición tras cada compresión, sin retirar las manos.',
        ],
        oQueNaoFazer: [
            'NO interrumpa las compresiones torácicas hasta que el equipo de {{EMERGENCY_MEDICAL}} tome el relevo, el DEA indique que se aparte o la víctima vuelva a respirar con normalidad.',
            'NO tema fracturar una costilla: mantener el flujo de sangre al cerebro y al corazón es la prioridad absoluta.',
        ],
        quandoChamarAjuda: 'INMEDIATAMENTE.'
    }
];
