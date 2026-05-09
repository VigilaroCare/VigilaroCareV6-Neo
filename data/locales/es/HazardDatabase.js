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
                    { type: 'queda', desc: 'Tirar del cable (efecto látigo) derribando aceite/comida caliente.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Nunca lo use sobre manteles que puedan ser tirados. Mantenga el cable enrollado y corto.'
            },
            {
                id: 'processador_mixer',
                label: 'Procesador / Licuadora',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'corte', desc: 'Cuchillas extremadamente afiladas, riesgo de amputación de dedos.', target: ['crianca', 'adulto'] },
                    { type: 'eletrico', desc: 'Activación accidental durante la limpieza.', target: ['adulto'] }
                ],
                expert_tip: 'Desenchufe siempre antes de limpiar. Guarde las cuchillas por separado y en lo alto.'
            },
            {
                id: 'potes_vidro',
                label: 'Utensilios de Vidrio / Refractarios',
                type: 'utensilio',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Explosión por choque térmico (caliente -> frío).', target: ['todos'] },
                    { type: 'ingestao', desc: 'Fragmentos invisibles después de romperse.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Al romperse vidrio, use una linterna contra el piso para encontrar micro-fragmentos brillantes.'
            },
            {
                id: 'forno_embutido',
                label: 'Horno Bajo / Empotrado',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'El vidrio de la puerta alcanza altas temperaturas. A la altura de los ojos de los niños.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Instale seguros en la puerta del horno. El aislamiento térmico no siempre es 100% efectivo.'
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
                expert_tip: 'Mantenga la puerta siempre cerrada y, si es posible, con seguro cuando no esté en uso.'
            },
            {
                id: 'baldes_bacias',
                label: 'Cubos y Recipientes con Agua',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Los bebés pueden ahogarse en 5cm de agua silenciosamente.', target: ['bebe', 'crianca'] }
                ],
                expert_tip: 'Regla de oro: Cubo usado es cubo vacío y boca abajo. Nunca deje cosas en remojo en el suelo.'
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
                    { type: 'aprisionamento', desc: 'Encerrarse o atascarse si alguien se siente mal adentro.', target: ['idoso'] }
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
                expert_tip: 'El baño de un anciano NO debe tener alfombras de tela. Use solo tapetes de goma fijos.'
            },
            {
                id: 'tomada_pia',
                label: 'Tomacorriente Cerca del Lavabo/Bañera',
                type: 'eletrico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'choque', desc: 'Caída de secador/afeitadora en el agua (electrocución).', target: ['todos'] }
                ],
                expert_tip: 'Instale un interruptor GFCI (Diferencial) que se apaga en milisegundos en caso de choque.'
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
                expert_tip: 'Si hay un niño aprendiendo a caminar, quite la mesa temporalmente o proteja las esquinas.'
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
                    { type: 'ingestao', desc: 'Ingerir la pila causa quemaduras químicas esofágicas en 2 horas.', target: ['crianca', 'pet'] }
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
                expert_tip: 'Conozca sus plantas por el nombre científico. En caso de duda, elévelas o quítelas.'
            },
            {
                id: 'churrasqueira',
                label: 'Parrilla / Barbacoa',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Las brasas permanecen calientes por horas bajo las cenizas.', target: ['crianca', 'pet'] },
                    { type: 'explosao', desc: 'Uso de alcohol líquido para encender.', target: ['todos'] }
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
                    { type: 'queda', desc: 'Caída por escalones (falta de pasamanos o puerta). Alto riesgo para bebés y ancianos.', target: ['bebe', 'idoso'] },
                    { type: 'escorregamento', desc: 'Suelo resbaladizo o alfombra suelta en escalones.', target: ['todos'] }
                ],
                expert_tip: 'Instale puertas de seguridad arriba y abajo. Use tiras antideslizantes.'
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
                    { type: 'colisao', desc: 'El vidrio muy limpio se vuelve invisible. Los niños corren y chocan.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Use calcomanías a la altura de los ojos de los niños para señalar el vidrio.'
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
                expert_tip: 'Guárdelas en cajas bajo llave y desconectadas. Nunca las deje enchufadas entre usos.'
            },
            {
                id: 'quimicos_automotivos',
                label: 'Productos Automotrices / Inflamables',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestión de líquidos de colores (gasolina, anticongelante).', target: ['crianca', 'pet'] },
                    { type: 'incendio', desc: 'El almacenamiento inadecuado genera vapores explosivos.', target: ['todos'] }
                ],
                expert_tip: 'Almacénelos en un lugar ventilado, alto y bajo llave. Lejos de fuentes de calor.'
            }
        ]
    }
};
