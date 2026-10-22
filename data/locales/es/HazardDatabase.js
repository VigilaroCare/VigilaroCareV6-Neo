export const HAZARD_DATABASE_ES = {
    'cozinha': {
        label: 'Cocina',
        emoji: '🍳',
        risks_inherent: ['Quemaduras', 'Cortes', 'Incendios', 'Intoxicación por Gas'],
        items: [
            {
                id: 'airfryer',
                label: 'Freidora de Aire / Eléctrica',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'La superficie externa se calienta mucho durante el uso.', target: ['crianca'] },
                    { type: 'queda', desc: 'El aparato puede volcar y derramar grasa o comida caliente si se tira del cable.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Nunca deje la freidora de aire sobre manteles que los niños o las mascotas puedan tirar. Mantenga el cable corto y ordenado, preferiblemente en la parte de atrás de la encimera.'
            },
            {
                id: 'processador_mixer',
                label: 'Procesador / Licuadora',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'corte', desc: 'Las cuchillas son muy cortantes, con riesgo de accidentes graves, sobre todo en los dedos.', target: ['crianca', 'adulto'] },
                    { type: 'eletrico', desc: 'Activación accidental durante la limpieza.', target: ['adulto'] }
                ],
                expert_tip: 'Desenchufe siempre el aparato después de usarlo y antes de tocar o limpiar las cuchillas. Guarde las piezas cortantes desmontadas y en alto.'
            },
            {
                id: 'potes_vidro',
                label: 'Utensilios de Vidrio / Refractarios',
                type: 'utensilio',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Explosión por choque térmico (caliente -> frío).', target: ['todos'] },
                    { type: 'ingestao', desc: 'Pequeños fragmentos que quedan en el suelo tras la rotura.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Si se rompe una fuente o un vaso, apague la luz y apunte la linterna del móvil paralela al suelo. Los trocitos invisibles brillarán en la oscuridad. Recójalos de inmediato.'
            },
            {
                id: 'forno_embutido',
                label: 'Horno Bajo / Empotrado',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'El vidrio de la puerta alcanza altas temperaturas. A la altura de los ojos de los niños.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'El cristal exterior puede quemar al tocarlo, incluso con aislamiento térmico. Coloque un bloqueo de puerta específico para hornos. Con el horno o los fogones encendidos, no permita nunca a los niños en la cocina.'
            },
            {
                id: 'produtos_limpeza_pia',
                label: 'Productos de Limpieza (Bajo el Fregadero)',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestión accidental (confusión con bebidas) y quemaduras químicas.', target: ['crianca', 'pet', 'idoso_demencia'] },
                    { type: 'quimico', desc: 'Mezclas peligrosas (Cloro + Amoníaco = Gas Tóxico).', target: ['adulto'] }
                ],
                expert_tip: 'El gabinete "bajo el fregadero" es el lugar más peligroso de la casa. Use seguros magnéticos o cámbielos de lugar.'
            }
        ]
    },

    'area_servico': {
        label: 'Área de Lavado / Lavandería',
        emoji: '🧤',
        risks_inherent: ['Intoxicación', 'Choque Eléctrico', 'Ahogamiento'],
        items: [
            {
                id: 'maquina_lavar_frontal',
                label: 'Lavadora (Carga Frontal)',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'sufocamento', desc: 'Los niños pequeños y mascotas pueden entrar y quedar atrapados.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Mantenga la puerta de la lavadora bloqueada o cerrada y el aparato desenchufado cuando no lo use.'
            },
            {
                id: 'baldes_bacias',
                label: 'Cubos y Recipientes con Agua',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Los bebés pueden ahogarse en 5cm de agua silenciosamente.', target: ['bebe', 'crianca'] }
                ],
                expert_tip: '¿Terminó de usar el cubo, el barreño o el lavadero? Vacíelos de inmediato. Guarde cubos y barreños boca abajo y no en el suelo. Al alcance de los niños, pueden jugar con el agua de los grifos.'
            },
            {
                id: 'ferro_aquecido',
                label: 'Plancha',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Tarda hasta 30min en enfriarse totalmente tras apagarse.', target: ['crianca'] },
                    { type: 'queda', desc: 'Caída de un objeto pesado sobre el pie o la cabeza al tirar del cable.', target: ['crianca'] }
                ],
                expert_tip: 'El riesgo continúa después de apagarse. Guárdela en un lugar alto mientras se enfría.'
            }
        ]
    },

    'banheiro': {
        label: 'Baño',
        emoji: '🚿',
        risks_inherent: ['Caídas', 'Choque Eléctrico', 'Ahogamiento'],
        items: [
            {
                id: 'box_blindex',
                label: 'Cabina de Ducha de Vidrio',
                type: 'estrutura',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Estallido espontáneo o por impacto, generando miles de fragmentos.', target: ['todos'] },
                    { type: 'aprisionamento', desc: 'La mampara de la ducha puede atascarse si alguien se cae o se desmaya contra ella.', target: ['idoso'] }
                ],
                expert_tip: 'Aplique película de seguridad al vidrio. Tenga una llave de repuesto o apertura fácil por fuera.'
            },
            {
                id: 'tapete_comum',
                label: 'Alfombra de Tela (Sin antideslizante)',
                type: 'objeto',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queda', desc: 'Resbalón fatal en suelo mojado, riesgo de fractura de fémur/pelvis.', target: ['idoso'] }
                ],
                expert_tip: 'El baño que usan personas mayores o con movilidad reducida NO debe tener alfombras de tela. Use solo tapetes de goma fijos.'
            },
            {
                id: 'tomada_pia',
                label: 'Tomacorriente Cerca del Lavabo/Bañera',
                type: 'eletrico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'choque', desc: 'Caída de secador/afeitadora en el agua (electrocución).', target: ['todos'] }
                ],
                expert_tip: 'Revise el cuadro eléctrico para ver si el baño cuenta con un interruptor diferencial que corte la corriente en caso de contacto con el agua.'
            }
        ]
    },

    'sala_quarto': {
        label: 'Sala y Dormitorios',
        emoji: '🛋️',
        risks_inherent: ['Caídas', 'Asfixia', 'Aplastamiento'],
        items: [
            {
                id: 'tv_nao_fixada',
                label: 'TV en Mueble (No asegurada)',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'esmagamento', desc: 'Caída sobre niños que intentan escalar el mueble.', target: ['crianca'] }
                ],
                expert_tip: 'Las TV modernas son ligeras pero inestables. Use correas antivuelco en la pared o mueble.'
            },
            {
                id: 'mesa_centro_vidro',
                label: 'Mesa de Centro (Vidrio/Esquinas)',
                type: 'movel',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Traumatismo craneal o cortes en caídas de niños aprendiendo a caminar.', target: ['bebe', 'crianca'] },
                    { type: 'quebra', desc: 'Rotura del vidrio con peso o impacto.', target: ['todos'] }
                ],
                expert_tip: 'Si tiene bebés aprendiendo a caminar, guarde la mesa de centro unos meses o proteja las esquinas con protectores blandos.'
            },
            {
                id: 'cortinas_cordoes',
                label: 'Cortinas con Cordones Largos',
                type: 'decoracao',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'estrangulamento', desc: 'Los niños juegan con el cordón y pueden enredarse el cuello.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Corte los lazos de los cordones o use ganchos altos para mantenerlos fuera de alcance.'
            },
            {
                id: 'baterias_botao',
                label: 'Controles Remotos / Juguetes (Pila de Botón)',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'ingestao', desc: 'Tragar una pila de botón provoca en 2 horas una quemadura química grave en el estómago.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Atornille los compartimentos de pilas. Si falta una pila, vaya al hospital de inmediato.'
            }
        ]
    },

    'externo': {
        label: 'Patio y Jardín',
        emoji: '🌳',
        risks_inherent: ['Ahogamiento', 'Envenenamiento', 'Animales'],
        items: [
            {
                id: 'plantas_toxicas',
                label: 'Plantas Ornamentales (Difenbaquia, Azalea)',
                type: 'biologico',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Su ingestión causa edema de glotis y asfixia rápida.', target: ['crianca', 'pet'] },
                    { type: 'alergia', desc: 'La savia puede causar quemaduras en piel/ojos.', target: ['todos'] }
                ],
                expert_tip: 'Identifique las plantas de su jardín (consultar a un especialista es una buena opción). Si encuentra especies tóxicas, páselas a macetas colgantes o regálelas.'
            },
            {
                id: 'churrasqueira',
                label: 'Parrilla / Barbacoa',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'La ceniza por encima puede ocultar brasas que siguen muy calientes durante horas.', target: ['crianca', 'pet'] },
                    { type: 'explosao', desc: 'Echar alcohol líquido directamente sobre el carbón para encenderlo o avivar la llama.', target: ['todos'] }
                ],
                expert_tip: 'Aísle el área de la parrilla. Apague totalmente las brasas con agua al terminar.'
            },
            {
                id: 'piscina',
                label: 'Piscina / Estanque',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Silencioso y rápido (segundos). Drenajes de succión atrapan cabello.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Una cerca física de 1.20m con puerta de cierre automático es la única barrera eficaz.'
            }
        ]
    },

    'circulacao': {
        label: 'Pasillos y Estructura',
        emoji: '🏠',
        risks_inherent: ['Caídas', 'Aplastamiento', 'Cortes'],
        items: [
            {
                id: 'escadas_internas',
                label: 'Escaleras Interiores',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda', desc: 'Caídas en escalones sin pasamanos firme o desprotegidos. Riesgo alto para bebés, niños pequeños, personas mayores y personas con movilidad reducida o baja visión.', target: ['bebe', 'idoso'] },
                    { type: 'escorregamento', desc: 'Suelo resbaladizo o alfombra suelta en escalones.', target: ['todos'] }
                ],
                expert_tip: 'Instale barreras de seguridad fijas arriba y abajo de la escalera si tiene bebés y niños pequeños (sobre todo los que gatean).'
            },
            {
                id: 'janelas_sacadas',
                label: 'Ventanas y Balcones (Sobre el Piso Principal)',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda_altura', desc: 'Caída fatal. Niños escalan muebles para mirar.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Las mallas de seguridad certificadas son obligatorias. Los topes ayudan, pero no sustituyen la malla.'
            },
            {
                id: 'portas_vidro',
                label: 'Puertas de Vidrio (Corredizas)',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'colisao', desc: 'El vidrio muy limpio se vuelve invisible. Los niños que corren y las personas con baja visión pueden chocar con él.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Use calcomanías a la altura de los ojos de los niños y también de los adultos, para que todos, incluidas las personas con baja visión, vean el vidrio.'
            }
        ]
    },

    'garagem': {
        label: 'Garaje y Taller',
        emoji: '🔧',
        risks_inherent: ['Intoxicación', 'Cortes', 'Incendios'],
        items: [
            {
                id: 'ferramentas_eletricas',
                label: 'Herramientas Eléctricas (Taladro, Sierra)',
                type: 'ferramenta',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'corte', desc: 'Activación accidental por curiosidad.', target: ['crianca'] }
                ],
                expert_tip: 'Nunca guarde herramientas enchufadas. Guarde taladros y sierras eléctricas en cajas cerradas en alto, con sus accesorios separados y ordenados.'
            },
            {
                id: 'quimicos_automotivos',
                label: 'Productos Automotrices / Inflamables',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestión de líquidos de colores (gasolina, anticongelante).', target: ['crianca', 'pet'] },
                    { type: 'incendio', desc: 'Almacenar bidones de combustible o disolvente cerca de enchufes o chispas del garaje.', target: ['todos'] }
                ],
                expert_tip: 'Almacénelos en un lugar ventilado, alto y bajo llave. Lejos de fuentes de calor.'
            }
        ]
    }
};
