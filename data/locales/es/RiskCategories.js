export const RISK_CATEGORIES_ES = [
    {
        id: 'festas_eventos',
        title: 'Fiestas y Eventos',
        subtitle: 'Seguridad en reuniones sociales',
        audience: ['adult', 'child', 'baby', 'pet'],
        icon: 'Musicnote',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
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
            { id: 'fes_1', critico: true, text: '¿El acceso a la piscina está bloqueado físicamente?', consequence: 'El ahogamiento es silencioso y toma menos de 2 minutos.', checkAction: 'Cierre puertas, use redes o cubra la piscina.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_2', critico: true, text: '¿Hay un adulto exclusivo supervisando a los niños?', consequence: 'La "responsabilidad difusa" es la causa principal de accidentes en eventos.', checkAction: 'Designe a un responsable por turno.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_3', critico: true, text: '¿Las bebidas alcohólicas están fuera del alcance de los menores?', consequence: 'La ingestión accidental de alcohol es una emergencia pediátrica.', checkAction: 'Mantenga vasos y botellas en una mesa alta.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_4', critico: true, text: '¿La parrilla/hoguera tiene un perímetro seguro?', consequence: 'Quemaduras graves en niños y mascotas.', checkAction: 'Delimite con una valla o barrera a 1 m de distancia.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_5', critico: true, text: '¿Se han guardado los cuchillos y utensilios afilados?', consequence: 'Cortes graves durante el movimiento del evento.', checkAction: 'Guarde en un cajón cerrado o en un gabinete alto.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_6', text: '¿Se ha alertado a los invitados sobre desniveles y escalones?', consequence: 'Caídas por desconocimiento del entorno.', checkAction: 'Señalizar con cinta o advertir al llegar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_7', text: '¿Las mascotas están contenidas o con correa?', consequence: 'Mordeduras, rasguños o escapes durante la confusión.', checkAction: 'Poner en un lugar seguro o mantener con correa.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_8', text: '¿Los cables de extensión eléctricos están protegidos y apartados?', consequence: 'Tropiezos y riesgo de cortocircuito con líquidos.', checkAction: 'Fije los cables con cinta y aléjelos de áreas húmedas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_9', critico: true, text: 'Si el evento es en un apartamento: ¿están cerrados los balcones y ventanas?', consequence: 'Los niños de casa no tienen sentido de la altura — los balcones son trampas.', checkAction: 'Cierre ventanas, cierre balcones y aleje los muebles de los bordes.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_10', critico: true, text: 'Si el evento es en una finca: ¿están cercados los pozos, lagos y ríos?', consequence: 'Los niños de apartamento no conocen los riesgos del agua natural.', checkAction: 'Cerque los cuerpos de agua y asigne un vigilante.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_11', text: '¿Conocen los ancianos y las PCD el diseño del lugar?', consequence: 'Los desniveles, escaleras y pisos desconocidos causan caídas.', checkAction: 'Dé un recorrido guiado al llegar, señalando los riesgos.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_12', text: '¿La PCD tiene acceso sin barreras al baño y a las áreas sociales?', consequence: 'Exclusión y riesgo de accidentes al improvisar accesos.', checkAction: 'Verifique el ancho de las puertas, escalones y baño antes del evento.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'visitacao_segura',
        title: 'Visita Segura',
        subtitle: 'Recibir o visitar a ancianos y bebés',
        audience: ['adult', 'baby', 'elderly'],
        icon: 'UserAdd',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
        educational: {
            description: 'Recibir visitas requiere adaptar la casa para quienes no la conocen. Los ancianos y los bebés tienen necesidades de seguridad específicas que pueden no estar mapeadas en su vida diaria.',
            keyPoints: [
                'Retire las alfombras sueltas para los visitantes ancianos.',
                'Verifique el ancho de los pasillos y la iluminación de los escalones.',
                'Oculte los cables y proteja los enchufes para los bebés y niños que gatean.',
                'Informe a los invitados sobre los riesgos de la casa (ej., escalón en la sala).'
            ]
        },
        questions: [
            { id: 'vis_1', critico: true, text: '¿Se han retirado las alfombras sueltas y los felpudos?', consequence: 'Principal causa de caídas en visitantes ancianos.', checkAction: 'Retirar o fijar con antideslizante.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_2', text: '¿Están marcados los escalones y desniveles?', consequence: 'Los visitantes no conocen el diseño de la casa.', checkAction: 'Use cinta antideslizante o advierta al llegar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_3', critico: true, text: '¿Se han retirado los objetos pequeños del alcance de los niños?', consequence: 'Asfixia con piezas, monedas y decoraciones.', checkAction: 'Mire a nivel del suelo.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_4', critico: true, text: '¿Están protegidos los enchufes bajos?', consequence: 'Descarga eléctrica en bebés y niños curiosos.', checkAction: 'Instale protectores de enchufes.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_5', critico: true, text: '¿Están bajo llave los productos de limpieza y los medicamentos?', consequence: 'El envenenamiento accidental es una emergencia frecuente.', checkAction: 'Guarde en un gabinete alto y cerrado.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_6', critico: true, text: '¿El baño tiene soporte o barras de apoyo para ancianos?', consequence: 'Las caídas en el baño pueden ser fatales para los ancianos.', checkAction: 'Proporcione una silla o barra temporal.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_7', critico: true, text: '¿Preguntó sobre las alergias alimentarias del visitante?', consequence: 'Reacción alérgica grave (anafilaxia).', checkAction: 'Confirme antes de ofrecer comida.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_8', critico: true, text: 'Si el visitante viene de una casa/rural a un apartamento: ¿están seguras las ventanas y balcones?', consequence: 'Los niños de casas de un piso no perciben el riesgo de altura.', checkAction: 'Cierre ventanas y bloquee el acceso a balcones y ascensores.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_9', text: 'Si el visitante viene de un apartamento a una casa/rural: ¿verificó terreno y fauna?', consequence: 'Pisos irregulares, animales venenosos y agua abierta son riesgos desconocidos.', checkAction: 'Advierta sobre el terreno, calzado adecuado y áreas prohibidas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_10', text: '¿El visitante PCD tiene garantizado el acceso al baño y áreas comunes?', consequence: 'Puertas estrechas, escalones y pisos irregulares impiden el acceso seguro.', checkAction: 'Verifique la accesibilidad y proporcione rampas si es necesario.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_11', text: '¿Se ha informado al anciano/PCD sobre desniveles, escaleras y pisos?', consequence: 'Un entorno desconocido multiplica el riesgo de caídas.', checkAction: 'Acompañe al llegar y señale los puntos de atención.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras_v2',
        title: 'Remodelaciones y Obras',
        subtitle: 'Mantenimiento y construcción activa',
        audience: ['adult'],
        icon: 'HashtagUp',
        color: '#FF9800',
        gradient: ['#F57C00', '#FFE0B2'],
        educational: {
            description: '**El Riesgo Invisible:** La electricidad no tiene olor y no avisa. Un "arreglo" temporal a menudo se vuelve permanente, y los clavos ocultos en los escombros causan pinchazos graves.',
            keyPoints: [
                '**Acción Táctica Inmediata:** Aísle el área con barreras físicas.',
                'Apague el INTERRUPTOR PRINCIPAL antes de cualquier reparación eléctrica.',
                'Para trabajos en altura, nunca use taburetes; use escaleras aseguradas con un asistente sosteniendo la base.',
                'Más protocolos tácticos en preveniremcasa.com.br'
            ]
        },
        questions: [
            { id: 'obr_1', critico: true, text: '¿El área de construcción está cerrada o aislada?', consequence: 'La curiosidad infantil en las obras de construcción es fatal.', checkAction: 'Use vallas o cierre las puertas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_2', critico: true, text: '¿Se han desenchufado las herramientas eléctricas?', consequence: 'Activación accidental por terceros.', checkAction: 'Desenchufe después de usar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_3', critico: true, text: '¿Se han recogido clavos y materiales afilados?', consequence: 'Pinchazos graves y riesgo de tétanos.', checkAction: 'Barra y recoja al final de cada día.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_4', critico: true, text: '¿Están bajo llave los productos químicos (solventes, pinturas)?', consequence: 'Riesgo de intoxicación e incendio.', checkAction: 'Guarde en un área ventilada y cerrada.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_5', critico: true, text: '¿Está despejada la ruta de escape?', consequence: 'Bloqueo de salida en caso de incendio.', checkAction: 'Mantenga libres los pasillos y puertas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_6', text: '¿Se han retirado los escombros o están en un contenedor cerrado?', consequence: 'Accidentes con niños y obstrucción del paso.', checkAction: 'Retirar a diario o usar contenedor.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'monitor_kids',
        title: 'Monitoreo de Niños',
        subtitle: 'Supervisión activa y rutina',
        audience: ['baby', 'child'],
        icon: 'eye-outline',
        color: '#009688',
        gradient: ['#00695C', '#4DB6AC'],
        educational: {
            description: 'La supervisión activa es clave para prevenir accidentes infantiles. Los niños no tienen sentido del peligro y son rápidos e impredecibles.',
            keyPoints: [
                'Nunca deje a los bebés solos en los cambiadores o en las bañeras.',
                'La cocina es un área prohibida durante la preparación de las comidas.',
                'Las medicinas y productos de limpieza deben guardarse en alto y bajo llave.',
                'Las mallas de seguridad son obligatorias en ventanas y balcones.',
                'Cuidado con las distracciones digitales: el celular quita el foco de la supervisión.'
            ]
        },
        questions: [
            { id: 'kid_1', critico: true, text: '¿Puede ver al niño en este momento?', consequence: 'Segundos de distracción bastan para un accidente grave.', checkAction: 'Mantenga contacto visual constante.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_2', text: '¿El celular está lejos de usted?', consequence: 'El celular es la principal causa de distracción de los padres.', checkAction: 'Deje el celular en otra habitación.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_3', critico: true, text: '¿Están cerradas o con red las ventanas y balcones?', consequence: 'Las caídas son la principal causa de muerte infantil.', checkAction: 'Cierre las ventanas e instale redes certificadas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_4', critico: true, text: '¿Es inaccesible la cocina durante la preparación?', consequence: 'Quemaduras por líquidos calientes y ollas.', checkAction: 'Use una puerta de seguridad o mantenga al niño fuera.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_5', critico: true, text: '¿Las medicinas y los productos de limpieza están bajo llave?', consequence: 'La intoxicación es una emergencia frecuente en menores de 5 años.', checkAction: 'Guárdelos en un gabinete alto con cerradura.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_6', critico: true, text: '¿Hay objetos pequeños al alcance (monedas, pilas, piezas)?', consequence: 'La asfixia y la ingestión de pilas son emergencias.', checkAction: 'Haga un barrido a nivel del suelo.', options: [{ label: 'No', safe: true }, { label: 'Sí', safe: false }] }
        ]
    },
    {
        id: 'reparos_eletricos',
        title: 'Pequeños Reparos Eléctricos',
        subtitle: 'Cambio de bombillas y duchas',
        audience: ['adult'],
        icon: 'lightning-bolt',
        color: '#FFC107',
        gradient: ['#FFA000', '#FFECB3'],
        educational: {
            description: 'La electricidad no tiene olor, color y no avisa. El choque eléctrico puede ser fatal.',
            keyPoints: [
                'Nunca haga arreglos temporales ("apaños"). Se vuelven permanentes y peligrosos.',
                'Siempre apague el DISYUNTOR GENERAL antes de cualquier reparación.',
                'Use zapatos con suela de goma y herramientas aisladas.',
                'No toque aparatos eléctricos con el cuerpo mojado.'
            ]
        },
        questions: [
            { id: 'ele_1', critico: true, text: '¿Se ha apagado el interruptor principal (disyuntor)?', consequence: 'Riesgo de descarga fatal.', checkAction: 'Vaya al cuadro eléctrico y apáguelo.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_2', critico: true, text: '¿Lleva zapatos con suela de goma?', consequence: 'El cuerpo descalzo conduce electricidad.', checkAction: 'Póngase zapatillas de goma o pantuflas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_3', critico: true, text: '¿Están secas sus manos y el entorno?', consequence: 'El agua es conductora — riesgo de electrocución.', checkAction: 'Séquese las manos y el área antes de comenzar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_4', critico: true, text: '¿Está utilizando herramientas aisladas?', consequence: 'Un destornillador metálico conduce la corriente.', checkAction: 'Use herramientas con mangos aislados.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_5', critico: true, text: '¿Están alejados los niños del área de reparación?', consequence: 'Contacto accidental con cables expuestos.', checkAction: 'Mantenga a los niños en otra habitación.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'servicos_altura',
        title: 'Trabajos en Altura',
        subtitle: 'Limpieza de techos y cortinas',
        audience: ['adult'],
        icon: 'ladder',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
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
            { id: 'alt_1', critico: true, text: '¿Está usando una escalera adecuada (no una silla)?', consequence: 'Las sillas se vuelcan fácilmente.', checkAction: 'Use una escalera doméstica certificada.', options: [{ label: 'Sí', safe: true }, { label: 'Usé silla', safe: false }] },
            { id: 'alt_2', text: '¿Alguien está sosteniendo la base de la escalera?', consequence: 'La escalera puede resbalar en pisos lisos.', checkAction: 'Llame a alguien para que ayude.', options: [{ label: 'Sí', safe: true }, { label: 'Estoy solo', safe: false }] },
            { id: 'alt_3', critico: true, text: '¿La escalera está completamente abierta y asegurada?', consequence: 'Una escalera mal asegurada se cierra.', checkAction: 'Revise los seguros antes de subir.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_4', critico: true, text: '¿El piso donde descansa la escalera es firme y seco?', consequence: 'La escalera resbala en pisos mojados o irregulares.', checkAction: 'Seque el piso y use base antideslizante.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_5', text: '¿Evita inclinarse demasiado hacia los lados?', consequence: 'El desequilibrio provoca una caída.', checkAction: 'Baje y reubique la escalera.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_6', critico: true, text: 'Si es un techo/losa — ¿consideró llamar a un profesional?', consequence: 'Las caídas del techo suelen ser fatales.', checkAction: 'Considere contratar a un profesional.', options: [{ label: 'Sí', safe: true }, { label: 'Lo haré', safe: false }] }
        ]
    },
    {
        id: 'faxina_quimica',
        title: 'Limpieza Profunda',
        subtitle: 'Manejo de Químicos',
        audience: ['adult'],
        icon: 'bottle-tonic-skull',
        color: '#9C27B0',
        gradient: ['#7B1FA2', '#E1BEE7'],
        educational: {
            description: 'La mezcla inadecuada de productos de limpieza puede generar gases tóxicos letales.',
            keyPoints: [
                'NUNCA mezcle lejía (cloro) con otros productos: amoníaco, vinagre o ácido.',
                'La mezcla más peligrosa: lejía + detergente. Genera gas cloro.',
                'Mantenga la habitación muy ventilada.',
                'Use guantes para evitar quemaduras.',
                'No guarde productos en botellas de refresco.'
            ]
        },
        questions: [
            { id: 'qui_1', critico: true, text: '¿Están abiertas las ventanas y puertas?', consequence: 'Acumulación de vapores tóxicos en el interior.', checkAction: 'Abra todo para ventilar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_2', critico: true, text: '¿Está mezclando productos de limpieza?', consequence: 'Lejía + otros productos genera gas letal.', checkAction: 'Use un producto a la vez. Enjuague antes del siguiente.', options: [{ label: 'No', safe: true }, { label: 'Sí', safe: false }] },
            { id: 'qui_3', text: '¿Lleva guantes protectores?', consequence: 'Dermatitis y quemaduras químicas en las manos.', checkAction: 'Use guantes de goma antes de manipular.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_4', critico: true, text: '¿Están los niños y las mascotas fuera de la habitación?', consequence: 'Inhalación de vapores y contacto con productos.', checkAction: 'Manténgalos en otra habitación durante la limpieza.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_5', critico: true, text: '¿Están los productos en envases originales (no en PET)?', consequence: 'Ingestión accidental por confusión.', checkAction: 'Nunca los pase a botellas de refresco.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_6', text: '¿Señalizó el piso mojado?', consequence: 'Resbalones y caídas durante la limpieza.', checkAction: 'Use un letrero o advierta a los residentes.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras',
        title: 'Obras y Reparaciones',
        subtitle: 'Seguridad en construcción',
        audience: ['adult'],
        icon: 'hammer-wrench',
        color: '#795548',
        gradient: ['#5D4037', '#D7CCC8'],
        educational: {
            description: '**El Riesgo Invisible:** La electricidad no huele y no avisa. Los clavos ocultos causan pinchazos graves.',
            keyPoints: [
                '**Acción Táctica Inmediata:** Aísle el área con barreras.',
                'Apague el DISYUNTOR PRINCIPAL antes de arreglar la electricidad.',
                'Nunca use taburetes para subir.'
            ]
        },
        questions: [
            { id: 'ref_1', text: '¿Está el área aislada físicamente?', consequence: 'Acceso indebido de niños.', checkAction: 'Coloque barreras o cierre la puerta.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_2', critico: true, text: '¿Hay clavos expuestos o hierros?', consequence: 'Pinchazos graves (tétanos).', checkAction: 'Martille los clavos o cubra las puntas.', options: [{ label: 'No', safe: true }, { label: 'Sí', safe: false }] },
            { id: 'ref_3', text: '¿Los trabajadores llevan EPP adecuado?', consequence: 'Lesiones oculares, cortes y caídas.', checkAction: 'Exija casco, guantes y gafas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_4', critico: true, text: '¿Los cables están organizados y lejos del agua?', consequence: 'Cortocircuito e incendio.', checkAction: 'Organice los cables y aléjelos del área mojada.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_5', text: '¿Se apaga el disyuntor al final del día?', consequence: 'Riesgo de incendio nocturno.', checkAction: 'Apague el disyuntor al salir.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'jardinagem',
        title: 'Jardinería y Huertas',
        subtitle: 'Cuidado del patio',
        audience: ['adult'],
        icon: 'flower',
        color: '#4CAF50',
        gradient: ['#388E3C', '#A5D6A7'],
        educational: {
            description: 'El jardín esconde peligros como animales venenosos, plantas tóxicas y herramientas afiladas.',
            keyPoints: [
                'Use botas altas y guantes de cuero.',
                'Conozca las plantas de su jardín (cuidado con la Difenbaquia).',
                'Desenchufe la podadora antes de limpiar las cuchillas.',
                'Cuidado al levantar macetas pesadas.',
                'Al menor signo de mal tiempo, deténgase.'
            ]
        },
        questions: [
            { id: 'jar_1', critico: true, text: '¿Está usando botas y guantes protectores?', consequence: 'Mordeduras de araña, escorpión o serpiente.', checkAction: 'Póngase botas altas y guantes de cuero.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_2', critico: true, text: '¿Verificó si hay plantas tóxicas accesibles?', consequence: 'Intoxicación de mascotas y niños.', checkAction: 'Identifique y aísle las plantas tóxicas.', options: [{ label: 'Sí', safe: true }, { label: 'No sé', safe: false }] },
            { id: 'jar_3', critico: true, text: '¿Desenchufó la cortadora de césped antes de limpiarla?', consequence: 'Activación accidental de la cuchilla.', checkAction: 'Desenchufe antes de cualquier manipulación.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_4', text: '¿Está evitando el sol fuerte (usando sombrero/protector)?', consequence: 'Insolación y deshidratación.', checkAction: 'Prefiera horas frescas y use protección.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_5', text: '¿Revisó escombros/macetas antes de moverlos?', consequence: 'Los escorpiones y arañas se esconden en lugares oscuros.', checkAction: 'Muévalos con cuidado usando guantes.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_6', text: '¿Están alejados los niños de las herramientas de jardinería?', consequence: 'Las tijeras y azadas causan cortes graves.', checkAction: 'Guarde las herramientas después de usarlas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'ferramentas',
        title: 'Uso de Herramientas',
        subtitle: 'Manuales y Eléctricas',
        audience: ['adult'],
        icon: 'screwdriver',
        color: '#607D8B',
        gradient: ['#455A64', '#CFD8DC'],
        educational: {
            description: 'Una herramienta en mal estado, usada incorrectamente o sin protección, puede convertirse en un arma peligrosa.',
            keyPoints: [
                'No improvise herramientas.',
                'Herramientas eléctricas: revise los cables y no quite las protecciones.',
                'Use gafas de seguridad.',
                'Guárdelas en cajas cerradas, lejos de los niños.'
            ]
        },
        questions: [
            { id: 'fer_1', text: '¿Es la herramienta correcta para el trabajo?', consequence: 'La improvisación causa roturas y lesiones.', checkAction: 'Busque la herramienta adecuada.', options: [{ label: 'Sí', safe: true }, { label: 'Improvisando', safe: false }] },
            { id: 'fer_2', text: '¿Lleva puestas gafas de protección?', consequence: 'Las chispas y fragmentos causan ceguera.', checkAction: 'Póngase las gafas ahora.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_3', critico: true, text: '¿Están intactos los cables eléctricos?', consequence: 'Los cables pelados causan choques.', checkAction: 'Inspeccione antes de encender.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_4', critico: true, text: '¿Están las protecciones originales en su lugar?', consequence: 'Los discos expuestos causan amputaciones.', checkAction: 'Nunca retire las protecciones.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_5', text: '¿Están alejados los niños y se guardarán las herramientas?', consequence: 'La curiosidad infantil es muy peligrosa.', checkAction: 'Guarde en una caja cerrada.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'toys_games',
        title: 'Juguetes y Juegos',
        subtitle: 'Diversión segura',
        audience: ['baby', 'child'],
        icon: 'toy-brick',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
        educational: {
            description: 'Los juguetes inadecuados son grandes causantes de accidentes. La elección correcta y la supervisión son fundamentales.',
            keyPoints: [
                'Verifique la clasificación por edad.',
                'Realice la "Prueba del Rollo de Papel Higiénico": si pasa, hay riesgo de asfixia.',
                '⚠️ PELIGRO CRÍTICO — Pilas de botón: si se tragan, causan quemaduras internas graves.',
                'Revise si el compartimiento de las pilas está atornillado.',
                'Cuidado con las cuerdas o cintas largas (riesgo de estrangulamiento).',
                'Los andadores están contraindicados: causan caídas y traumatismos.',
                'Deseche inmediatamente los envases de plástico.',
                'Bicicletas/Patines: uso obligatorio de casco.'
            ]
        },
        questions: [
            { id: 'toy_1', text: '¿Tienen los juguetes un sello de seguridad y la edad adecuada?', consequence: 'Las piezas pequeñas pueden tragarse.', checkAction: 'Revise el embalaje.', options: [{ label: 'Sí', safe: true }, { label: 'No sé', safe: false }] },
            { id: 'toy_2', critico: true, text: '¿Hay juguetes con pilas accesibles?', consequence: 'Ingerir una pila de botón es una emergencia grave.', checkAction: 'Atornille el compartimiento.', options: [{ label: 'No (Bloqueado)', safe: true }, { label: 'Sí', safe: false }] },
            { id: 'toy_3', critico: true, text: '¿Se han revisado los juguetes con cuerdas largas?', consequence: 'Riesgo de estrangulamiento.', checkAction: 'Retire cuerdas mayores de 15 cm.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_4', critico: true, text: '¿Se han desechado los envases de plástico?', consequence: 'Asfixia con bolsas.', checkAction: 'Deseche inmediatamente tras abrir.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_5', text: '¿Se usa casco en la bicicleta/patineta?', consequence: 'El traumatismo craneoencefálico es mortal.', checkAction: 'El casco es obligatorio.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_6', critico: true, text: '¿Se vaciará la piscina inflable tras su uso?', consequence: 'El ahogamiento ocurre en centímetros de agua.', checkAction: 'Vacíe y guarde inmediatamente.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'mudanca_residencia',
        title: 'Mudanza de Residencia',
        subtitle: 'Seguridad en el nuevo hogar',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'HomeHash',
        color: '#FF5722',
        gradient: ['#BF360C', '#FF8A65'],
        educational: {
            description: '**El Riesgo Invisible:** Las cajas apiladas crean zonas ciegas. La curiosidad infantil en un lugar desconocido provoca accidentes rápidos en ventanas sin malla.',
            keyPoints: [
                '**Acción Táctica Inmediata:** Ubique el disyuntor principal y las válvulas de gas de inmediato.',
                'Fije las estanterías y cómodas a la pared al montarlas para evitar aplastamientos.'
            ]
        },
        questions: [
            { id: 'mud_1', critico: true, text: '¿Se instalaron mallas de seguridad en las ventanas?', consequence: 'Alto riesgo de caída en pisos altos.', checkAction: 'No abra ventanas sin protección.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_2', critico: true, text: '¿Están fijos a la pared los muebles altos?', consequence: 'Vuelco de estantes sobre los niños.', checkAction: 'Instale kits antivuelco.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_3', text: '¿Identificó el interruptor principal y el gas?', consequence: 'Pánico en caso de fuga o corto.', checkAction: 'Ubique y pruebe las válvulas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_4', text: '¿Están estables las cajas apiladas?', consequence: 'Vuelco y obstrucción de salidas.', checkAction: 'Apílelas lejos de las puertas.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_5', text: '¿Se revisaron los enchufes y cables nuevos?', consequence: 'Cortocircuito e incendio por cableado viejo.', checkAction: 'Pruebe los disyuntores.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_6', text: '¿Se supervisa a los niños y mascotas durante la mudanza?', consequence: 'Entorno desconocido con puertas abiertas.', checkAction: 'Asigne a alguien exclusivamente para supervisar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'vazamento_gas',
        title: 'Fuga de Gas (GLP)',
        subtitle: 'Cilindro y gas',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'Danger',
        color: '#D32F2F',
        gradient: ['#B71C1C', '#EF9A9A'],
        educational: {
            description: '**El Riesgo Invisible:** El gas GLP es más pesado que el aire y se acumula en el piso. Cualquier chispa — incluso la de un interruptor de luz — puede causar una explosión.',
            keyPoints: [
                'NO encienda NINGÚN interruptor, enchufe o aparato eléctrico.',
                'NO use el celular dentro de la casa.',
                'Abra TODAS las ventanas y puertas de inmediato.',
                'Cierre la válvula del cilindro.',
                'Salga de la propiedad y llame a los Bomberos (112 / 911).'
            ]
        },
        questions: [
            { id: 'gas_1', critico: true, text: '¿Salió de la casa sin encender interruptores?', consequence: 'Cualquier chispa causa explosión.', checkAction: 'Salga inmediatamente sin tocar nada.', options: [{ label: 'Sí, salí', safe: true }, { label: 'Sigo dentro', safe: false }] },
            { id: 'gas_2', critico: true, text: '¿Está cerrada la válvula del cilindro?', consequence: 'El gas seguirá goteando.', checkAction: 'Ciérrela en sentido horario.', options: [{ label: 'Sí', safe: true }, { label: 'No sé', safe: false }] },
            { id: 'gas_3', critico: true, text: '¿Se abrieron todas las ventanas y puertas?', consequence: 'El GLP necesita dispersarse.', checkAction: 'Abra todo para ventilar.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] },
            { id: 'gas_4', critico: true, text: '¿Usó el celular solo afuera?', consequence: 'El celular genera chispas internas.', checkAction: 'Úselo solo afuera.', options: [{ label: 'Sí', safe: true }, { label: 'Usé dentro', safe: false }] },
            { id: 'gas_5', critico: true, text: '¿Llamó a los Bomberos?', consequence: 'Solo los bomberos pueden autorizar el retorno.', checkAction: 'Llame a emergencias de inmediato.', options: [{ label: 'Sí', safe: true }, { label: 'No', safe: false }] }
        ]
    }
];
