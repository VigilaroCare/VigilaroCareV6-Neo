export const firePreventionContentES = {
    concepts: {
        title: 'Teoría del Fuego',
        emoji: '🔥',
        sections: [
            {
                title: '¿Qué es el Fuego?',
                content: 'El fuego es una reacción química de oxidación exotérmica (libera calor), que genera luz y gases. Para que exista, es necesaria la unión de cuatro elementos esenciales, formando el "Tetraedro del Fuego".'
            },
            {
                title: 'El Tetraedro del Fuego',
                content: 'Antiguamente se hablaba del triángulo del fuego, pero hoy sabemos que son 4 elementos:\n\n1. Combustible: El material que arde (sólido, líquido o gaseoso).\n2. Comburente: El elemento que alimenta el fuego (generalmente el Oxígeno del aire).\n3. Calor: La energía que inicia la reacción.\n4. Reacción en Cadena: El proceso que hace que la combustión sea autosostenible.\n\nSi retiras CUALQUIERA de estos 4 elementos, el fuego se apaga.'
            },
            {
                title: 'Métodos de Propagación',
                content: 'El calor puede propagarse de tres formas:\n\n• Conducción: Transferencia de calor a través de un cuerpo sólido, de molécula a molécula. Ej: Una cuchara de metal calentándose en la olla.\n\n• Convección: Movimiento de masas de aire o líquido calentadas. El aire caliente sube y el frío baja. Es así como el fuego se propaga a pisos superiores.\n\n• Radiación: Ondas de calor que viajan por el espacio, sin necesidad de contacto material. Es el calor que sientes al estar cerca de una hoguera.'
            },
            {
                title: 'Clases de Incendio',
                content: 'Saber la clase de fuego es vital para elegir el extintor correcto. Las letras siguen {{FIRE_STANDARD}}:\n\n• {{FIRE_CLASS_SOLIDS}}\n\n• {{FIRE_CLASS_LIQUIDS}}\n\n• {{FIRE_CLASS_GASES}}\n\n• {{FIRE_CLASS_ELECTRICAL}}\n\n• {{FIRE_CLASS_METALS}}\n\n• {{FIRE_CLASS_COOKING}}'
            },
            {
                title: 'Fases del Fuego',
                content: '1. Fase Inicial: El fuego comienza pequeño. Es el momento ideal para usar un extintor.\n2. Combustión Libre: El fuego crece, la temperatura sube rápidamente y el oxígeno se consume.\n3. Combustión Latente: El oxígeno disminuye, pero el calor es intenso. Cuidado: abrir una puerta ahora puede causar una explosión de humo (Backdraft).'
            }
        ]
    },
    prevention: {
        title: 'Prevención en Casa',
        emoji: '🛡️',
        sections: [
            {
                title: 'Cocina (Área Crítica)',
                content: '• Nunca deje ollas en el fuego sin supervisión.\n• Use un temporizador si necesita salir.\n• Los mangos de las ollas deben mirar hacia adentro.\n• ¿Fuego en aceite? NO ARROJE AGUA. Apague el fuego y sofoque con una tapa.'
            },
            {
                title: 'Eléctrica',
                content: '• Evite adaptadores y sobrecargas eléctricas.\n• ¿Cables pelados o calientes? Llame a un electricista.\n• Desenchufe aparatos electrónicos durante tormentas.'
            },
            {
                title: 'Inflamables',
                content: '• Alcohol, gasolina y solventes lejos del calor.\n• Almacene en un lugar ventilado.\n• Nunca arroje por el desagüe (riesgo de explosión).'
            },
            {
                title: 'Velas y Cigarrillos',
                content: '• Las velas siempre en un soporte firme y lejos de cortinas.\n• Apáguelas al salir de la habitación.\n• Fumadores: cuidado con quedarse dormidos y las colillas.'
            }
        ]
    },
    electricalAppliances: {
        title: 'Electrodomésticos e Incendio',
        emoji: '🔌',
        sections: [
            {
                title: '{{COOKING_FIRE_CLASS}} - Cocina',
                content: 'Incendios que involucran aceite y grasa en freidoras, parrillas y asadores. NUNCA use agua, ya que causa una explosión de vapor y propaga el fuego. Lo correcto es apagar la fuente de calor y sofocar con una tapa o usar un extintor de {{COOKING_FIRE_CLASS}}.'
            },
            {
                title: 'Equipos de Alta Potencia',
                content: 'Aires acondicionados, calentadores, hornos eléctricos y microondas demandan mucha energía. NUNCA utilice extensiones o adaptadores para estos aparatos, ya que pueden derretirse e iniciar un incendio.'
            },
            {
                title: 'Fuentes de Calor',
                content: 'Planchas, alisadoras de pelo y calentadores portátiles son causas frecuentes de fuego. Nunca los deje encendidos sin supervisión y manténgalos lejos de materiales combustibles (ropa, cortinas, sofás).'
            }
        ]
    },
    action: {
        title: 'En Caso de Incendio',
        emoji: '🚨',
        steps: [
            'SALGA DE LA VIVIENDA DE INMEDIATO. Salvar vidas es la única prioridad.',
            'Si hay humo en el camino, avance a gatas. El aire más limpio y respirable está cerca del suelo.',
            'Toque la puerta con el dorso de la mano antes de abrirla. Si está caliente, no la abra.',
            'Cierre las puertas al pasar por las habitaciones para ayudar a contener las llamas.',
            'Llame a los Bomberos al {{FIRE_NUMBER}} en cuanto esté en un lugar seguro.',
            'NUNCA vuelva a por bolsos, documentos o móviles.',
            'Si se le prende la ropa: DETÉNGASE, TÍRESE al suelo y RUEDE de un lado a otro.',
        ]
    }
};
