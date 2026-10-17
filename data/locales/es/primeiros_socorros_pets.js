export const emergenciasPetsES = [
    {
        id: 'engasgo_pet',
        titulo: 'Atragantamiento (Mascota)',
        descricao: 'Animal agitado, intentando toser o sin poder respirar.',
        icon: 'paw',
        cor: '#D32F2F', // Rojo
        corFundo: '#FFEBEE',
        frequencia: 'Común',
        passos: [
            { titulo: 'Abra la boca con cuidado', descricao: 'Tire de la lengua hacia un lado y compruebe si hay un objeto visible (cuidado con los mordiscos reflejos).', critico: true },
            { titulo: 'Retire el objeto SOLO si es fácil y visible dentro de la boca', descricao: 'NO intente sacarlo con los dedos o con pinzas si está profundo: puede empujarlo más.' },
            { titulo: 'Maniobra de Heimlich (Grande)', descricao: 'Colóquese detrás del perro, abrácelo por la cintura con los puños justo debajo de las costillas y presione con firmeza hacia arriba y hacia delante.', critico: true },
            { titulo: 'Heimlich (Pequeños)', descricao: 'Técnica específica para perros pequeños y gatos: acueste a la mascota de lado y presione el abdomen justo debajo de las costillas con la punta de los dedos, con fuerza controlada.', critico: true },
            { titulo: 'Golpes en la espalda', descricao: 'Dé golpes firmes entre los omóplatos con la palma de la mano (solo para gatos y perros pequeños).' },
        ],
        alertas: [
            'Cuidado con los mordiscos y arañazos: los animales que se atragantan entran en pánico y reaccionan por instinto.',
            'Llame al veterinario y avise de que va de camino.',
        ],
    },
    {
        id: 'atropelamento_pet',
        titulo: 'Atropellamiento / Trauma',
        descricao: 'Golpes fuertes, dolor intenso o dificultad para moverse.',
        icon: 'bandage',
        cor: '#F57C00', // Naranja
        corFundo: '#FFF3E0',
        frequencia: 'Grave',
        passos: [
            { titulo: 'Llévelo a un lugar seguro', descricao: 'Saque a la mascota de la calzada con mucho cuidado, usando una sábana o manta estirada como camilla para proteger la columna.', critico: true },
            { titulo: 'NO lo deje caminar', descricao: 'Mantenga a la mascota acostada aunque parezca estar bien y quiera correr (un golpe fuerte puede causar una hemorragia interna silenciosa).' },
            { titulo: 'Señalice la zona', descricao: 'Asegúrese de que el lugar donde se detuvo a socorrer esté protegido de nuevos accidentes.' },
            { titulo: 'Contenga el sangrado', descricao: 'Presione las heridas que sangran con un paño limpio o una gasa.' },
            { titulo: 'Veterinario INMEDIATO', descricao: 'Lleve a la mascota de inmediato a urgencias veterinarias para atención, pruebas de imagen y soporte.', critico: true },
        ],
        alertas: [
            'Las mascotas con dolor fuerte muerden por instinto: improvise un bozal ligero (solo si no hay riesgo de vómito).',
            'Mantenga al animal abrigado durante el trayecto.',
        ],
    },
    {
        id: 'rcp_pet',
        titulo: 'Paro Cardíaco (Mascota)',
        descricao: 'Mascota inconsciente, sin respiración y sin latidos.',
        icon: 'heart-dislike',
        cor: '#B71C1C', // Rojo Oscuro
        corFundo: '#FFEBEE',
        frequencia: 'Extrema',
        passos: [
            { titulo: 'Compruebe latido y respiración', descricao: 'Ponga la mano sobre el pecho para sentir el latido, acerque el oído al hocico para comprobar la respiración y busque el pulso en la cara interna del muslo.', critico: true },
            { titulo: 'Solo si está PARADO', descricao: 'NUNCA haga compresiones cardíacas si el corazón de la mascota sigue latiendo.' },
            { titulo: 'Acuéstelo sobre el lado DERECHO', descricao: 'Acueste al animal sobre su lado derecho (el corazón queda bajo el codo izquierdo).' },
            { titulo: 'Compresiones (Pequeños)', descricao: 'En gatos y perros pequeños, rodee el pecho con una mano y comprima a un ritmo de 100 a 120 por minuto.', critico: true },
            { titulo: 'Compresiones (Med/Grandes)', descricao: 'Coloque las dos manos superpuestas sobre la parte más ancha del pecho y comprima alrededor de un tercio de su anchura.', critico: true },
            { titulo: 'Respiración boca-hocico', descricao: 'Mantenga la boca de la mascota bien cerrada y sople aire directamente en las fosas nasales (2 insuflaciones cada 30 compresiones).' },
        ],
        alertas: [
            'No detenga las compresiones hasta llegar a urgencias veterinarias o hasta que la mascota vuelva a respirar.',
            'Es agotador: túrnese con otra persona cada 2 minutos, si es posible.',
        ],
    },
    {
        id: 'calor_pet',
        titulo: 'Hipertermia (Calor)',
        descricao: 'Jadeo extremo, encías muy rojas y postración.',
        icon: 'sunny',
        cor: '#FBC02D', // Amarillo
        corFundo: '#FFFDE7',
        frequencia: 'Verano',
        passos: [
            { titulo: 'Sáquelo del calor ya', descricao: 'Lleve a la mascota de inmediato a la sombra, al aire acondicionado o a un lugar ventilado.', critico: true },
            { titulo: 'Moje las patas y la barriga', descricao: 'Moje las patas y la barriga con agua fresca a temperatura ambiente (NUNCA agua helada ni hielo, por el riesgo de choque térmico).', critico: true },
            { titulo: 'Aumente la ventilación', descricao: 'Dirija un ventilador hacia la mascota o abaníquela con fuerza.' },
            { titulo: 'Ofrezca agua fresca', descricao: 'Ofrezca un cuenco de agua fresca sin obligarla a beber, para evitar atragantamientos.' },
            { titulo: 'Llévelo al veterinario', descricao: 'Lleve la mascota al veterinario aunque parezca mejorar, porque el sobrecalentamiento puede dañar los riñones y otros órganos internos.' },
        ],
        alertas: [
            'No eche agua helada sobre la mascota.',
            'Los animales de hocico corto (como Pugs, Bulldogs y Persas) sufren mucho más con el calor.',
        ],
    },
    {
        id: 'convulsao_pet',
        titulo: 'Convulsión (Mascota)',
        descricao: 'Cuerpo rígido, babeo y patas pedaleando en el aire.',
        icon: 'pulse',
        cor: '#7B1FA2', // Púrpura
        corFundo: '#F3E5F5',
        frequencia: 'Común',
        passos: [
            { titulo: 'NO tire de la lengua', descricao: 'NO tire de la lengua del animal (perros y gatos no se tragan la lengua; intentar sujetarla acaba en mordiscos graves).', critico: true },
            { titulo: 'Aparte muebles y esquinas', descricao: 'Aparte muebles y objetos duros para que la mascota no se golpee la cabeza ni se lastime los ojos.' },
            { titulo: 'Reduzca luces y sonidos', descricao: 'Apague las luces y la televisión o la radio para reducir los estímulos al cerebro.' },
            { titulo: 'Cronometre la crisis', descricao: 'Cronometre la duración de la crisis. Si supera los 5 minutos, lleve a la mascota al veterinario como urgencia.' },
            { titulo: 'Después de la crisis', descricao: 'Espere a que recupere la conciencia poco a poco (la mascota despierta asustada y desorientada por un tiempo). Hable bajo y evite tocarla con movimientos rápidos: puede asustarse y reaccionar con una mordida.' },
        ],
        alertas: [
            'Mantenga la calma: los animales perciben nuestra tensión.',
            'Si es posible, grabe la crisis con el móvil para mostrársela al veterinario.',
        ],
    },
    {
        id: 'sangramento_pet',
        titulo: 'Sangrado / Corte (Mascota)',
        descricao: 'Heridas que sangran en orejas, patas o piel.',
        icon: 'water',
        cor: '#D32F2F', // Rojo
        corFundo: '#FFEBEE',
        frequencia: 'Común',
        passos: [
            { titulo: 'Presione con firmeza', descricao: 'Coloque un paño limpio o una gasa sobre el corte y presione sin parar durante al menos 5 minutos.', critico: true },
            { titulo: 'No esté mirando', descricao: 'NO retire el paño para comprobar el sangrado: rompe el coágulo que se está formando.' },
            { titulo: 'Eleve la herida', descricao: 'Eleve la pata herida por encima del nivel del pecho para reducir la presión sanguínea.' },
            { titulo: 'Torniquete: CUIDADO', descricao: 'Último recurso: solo en sangrado grave de pata o cola que no para con presión firme y continua. Use una banda ancha y elástica (un cordón fino corta y se resbala en la extremidad). Anote la hora en que lo aplicó y vaya de inmediato al veterinario, que decide cuándo soltarlo.', critico: true },
            { titulo: 'Vaya al veterinario cuanto antes', descricao: 'Lleve la mascota al veterinario, porque los cortes profundos necesitan puntos y curas profesionales.' },
        ],
        alertas: [
            'Los cortes en las orejas sangran mucho y salpican sangre al sacudir la cabeza.',
            'Si corta una uña demasiado y sangra, aplique maicena para ayudar a detenerlo.',
        ],
    },
    {
        id: 'picada_peconhentos',
        titulo: 'Picadura Venenosa',
        descricao: 'Animales venenosos y picaduras dolorosas en el jardín.',
        icon: 'warning',
        cor: '#FF5722', // Naranja Profundo
        corFundo: '#FBE9E7',
        frequencia: 'Urgente',
        passos: [
            { titulo: 'Fotografíe al animal', descricao: 'Si es seguro, fotografíe al animal causante para que el veterinario sepa qué suero aplicar. NUNCA intente atraparlo.', critico: true },
            { titulo: 'Mantenga a la mascota inmóvil', descricao: 'Evite que la mascota camine o corra (el movimiento acelera el latido y extiende el veneno).' },
            { titulo: 'NO corte ni apriete', descricao: 'NUNCA corte la zona de la picadura, no haga torniquetes ni intente succionar el veneno.', critico: true },
            { titulo: 'Eleve la zona', descricao: 'Eleve la pata picada con respecto al cuerpo.' },
            { titulo: 'Acuda al veterinario', descricao: 'Lleve a la mascota de inmediato al veterinario para la aplicación del suero antiofídico o antiescorpiónico.', critico: true },
        ],
        alertas: ['Escorpión: dolor intenso inmediato y vómito', 'Serpiente: hinchazón rápida y sangrado'],
    },
    {
        id: 'plantas_toxicas_pet',
        titulo: 'Plantas Tóxicas',
        descricao: 'Ingestión de flores, hojas o savia de plantas tóxicas.',
        icon: 'leaf',
        cor: '#4CAF50', // Verde
        corFundo: '#E8F5E9',
        frequencia: 'Común',
        passos: [
            { titulo: 'Limpie la boca enseguida', descricao: 'Retire los restos de hojas de la boca y lave con abundante agua corriente para eliminar la savia.', critico: true },
            { titulo: 'Foto de la planta', descricao: 'Fotografíe la planta mordida o lleve una ramita para identificarla.' },
            { titulo: 'Vigile la respiración', descricao: 'Observe la respiración, porque las plantas tóxicas pueden hinchar la boca y la garganta.' },
            { titulo: 'NO provoque el vómito', descricao: 'NO provoque el vómito sin indicación expresa del veterinario (las plantas corrosivas queman al subir).' },
            { titulo: 'Carbón activado: solo con veterinario', descricao: 'NO dé carbón activado ni remedios caseros por su cuenta: hay riesgo de aspiración hacia los pulmones. Delo solo si el veterinario lo indica.' },
        ],
        alertas: [
            'Las hojas de lirio son muy venenosas para los gatos y pueden causar insuficiencia renal grave.',
            'Signos comunes: salivación excesiva, lengua hinchada, vómitos y apatía.',
        ],
    },
    {
        id: 'quimicos_pet',
        titulo: 'Productos Químicos',
        descricao: 'Ingestión de lejía, desinfectantes o veneno para ratas.',
        icon: 'flask',
        cor: '#607D8B', // Azul Gris
        corFundo: '#ECEFF1',
        frequencia: 'Grave',
        passos: [
            { titulo: 'Aleje el producto', descricao: 'Aleje a la mascota del producto químico y aísle la zona.', critico: true },
            { titulo: 'Contacto con PIEL/OJOS', descricao: 'Lave la piel o los ojos afectados con agua corriente fría durante 15 minutos sin parar.', critico: true },
            { titulo: 'Ingestión', descricao: 'NO provoque el vómito por su cuenta (los productos corrosivos queman al subir); solo si el veterinario lo indica. Ofrezca agua fresca para limpiar la boca.' },
            { titulo: 'Llame a toxicología', descricao: 'Llame a {{POISON_CONTROL}} con el envase del producto en la mano para leer los componentes.' },
            { titulo: 'Acuda a urgencias veterinarias', descricao: 'Lleve el envase del producto químico o la caja del veneno junto con la mascota al veterinario.' },
        ],
        alertas: [
            'NUNCA dé medicamentos de personas (como paracetamol o aspirina) a perros y gatos.',
            'Alimentos como el chocolate, la cebolla y el xilitol (edulcorante) también son venenosos para las mascotas.',
        ],
    },
];
