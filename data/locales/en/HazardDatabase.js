export const HAZARD_DATABASE_EN = {
    'cozinha': {
        label: 'Kitchen',
        emoji: '🍳',
        risks_inherent: ['Burns', 'Cuts', 'Fire', 'Gas Poisoning'],
        items: [
            {
                id: 'airfryer',
                label: 'Air Fryer',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Outer surface gets very hot during use.', target: ['crianca'] },
                    { type: 'queda', desc: 'Pulling the cord (whip effect) knocking over hot oil/food.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Never use on tablecloths that can be pulled. Keep the cord wrapped and short.'
            },
            {
                id: 'processador_mixer',
                label: 'Food Processor / Blender',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'corte', desc: 'Extremely sharp blades, risk of finger amputation.', target: ['crianca', 'adulto'] },
                    { type: 'eletrico', desc: 'Accidental activation during cleaning.', target: ['adulto'] }
                ],
                expert_tip: 'Always unplug before any cleaning. Store blades separately and up high.'
            },
            {
                id: 'potes_vidro',
                label: 'Glassware / Ovenware',
                type: 'utensilio',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Explosion from thermal shock (hot -> cold).', target: ['todos'] },
                    { type: 'ingestao', desc: 'Invisible fragments after breaking.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'When glass breaks, use a flashlight against the floor to find shiny micro-shards.'
            },
            {
                id: 'forno_embutido',
                label: 'Low / Built-in Oven',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Door glass reaches high temperatures. At eye level for children.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Install oven door locks. Thermal insulation is not always 100% effective.'
            },
            {
                id: 'produtos_limpeza_pia',
                label: 'Cleaning Products (Under Sink)',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Accidental ingestion (confusion with drinks) and chemical burns.', target: ['crianca', 'pet', 'idoso_demencia'] },
                    { type: 'quimico', desc: 'Dangerous mixtures (Bleach + Ammonia = Toxic Gas).', target: ['adulto'] }
                ],
                expert_tip: 'The cabinet "under the sink" is the most dangerous place in the house. Use magnetic locks or move them.'
            }
        ]
    },

    'area_servico': {
        label: 'Laundry Room',
        emoji: '🧤',
        risks_inherent: ['Poisoning', 'Electric Shock', 'Drowning'],
        items: [
            {
                id: 'maquina_lavar_frontal',
                label: 'Washing Machine (Front Load)',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'sufocamento', desc: 'Toddlers and pets can get in and get trapped (hide and seek).', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Keep the machine door always closed and, if possible, locked when not in use.'
            },
            {
                id: 'baldes_bacias',
                label: 'Buckets and Basins with Water (Soaking)',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Babies can silently drown in 2 inches of water.', target: ['bebe', 'crianca'] }
                ],
                expert_tip: 'Golden rule: A used bucket is an empty bucket turned upside down. Never leave soaking on the floor.'
            },
            {
                id: 'ferro_aquecido',
                label: 'Iron',
                type: 'eletro',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Takes up to 30min to cool down completely after turning off.', target: ['crianca'] },
                    { type: 'queda', desc: 'Dropping the heavy object on foot or head when pulling the cord.', target: ['crianca'] }
                ],
                expert_tip: 'The risk continues after turning off. Store in a high place while it cools (not on the floor).'
            }
        ]
    },

    'banheiro': {
        label: 'Bathroom',
        emoji: '🚿',
        risks_inherent: ['Falls', 'Electric Shock', 'Drowning'],
        items: [
            {
                id: 'box_blindex',
                label: 'Glass Shower Enclosure',
                type: 'estrutura',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Spontaneous shattering or from impact, generating thousands of shards.', target: ['todos'] },
                    { type: 'aprisionamento', desc: 'Locking/jamming with someone sick inside.', target: ['idoso'] }
                ],
                expert_tip: 'Apply safety film to the glass. Have a spare key or easy opening from the outside.'
            },
            {
                id: 'tapete_comum',
                label: 'Fabric Rug (No non-slip)',
                type: 'objeto',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queda', desc: 'Fatal slip on wet floor, risk of femur/pelvis fracture.', target: ['idoso'] }
                ],
                expert_tip: 'An elderly person\'s bathroom MUST NOT have a fabric rug. Use only fixed rubber mats.'
            },
            {
                id: 'tomada_pia',
                label: 'Outlet Near Sink/Bathtub',
                type: 'eletrico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'choque', desc: 'Dropping hairdryer/shaver into water (electrocution).', target: ['todos'] }
                ],
                expert_tip: 'Install a GFCI (Ground Fault Circuit Interrupter) outlet that shuts off in milliseconds in case of shock.'
            }
        ]
    },

    'sala_quarto': {
        label: 'Living Room & Bedrooms',
        emoji: '🛋️',
        risks_inherent: ['Falls', 'Suffocation', 'Tip-overs'],
        items: [
            {
                id: 'tv_nao_fixada',
                label: 'TV on Stand/Furniture (Unsecured)',
                type: 'eletro',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'esmagamento', desc: 'Tipping over on children who try to climb the furniture to reach something.', target: ['crianca'] }
                ],
                expert_tip: 'Modern TVs are light but unstable. Use anti-tip straps on the wall or furniture.'
            },
            {
                id: 'mesa_centro_vidro',
                label: 'Coffee Table (Glass/Corners)',
                type: 'movel',
                riskLevel: 'MEDIO',
                hazards: [
                    { type: 'corte', desc: 'Head trauma or cuts in falls by toddlers learning to walk.', target: ['bebe', 'crianca'] },
                    { type: 'quebra', desc: 'Glass breaking under weight or impact.', target: ['todos'] }
                ],
                expert_tip: 'If you have a toddler learning to walk, temporarily remove the coffee table or protect corners.'
            },
            {
                id: 'cortinas_cordoes',
                label: 'Curtains with Long Cords',
                type: 'decoracao',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'estrangulamento', desc: 'Children play with the cord and can wrap it around their neck.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Cut the cord loops or use high hooks to keep them out of reach.'
            },
            {
                id: 'baterias_botao',
                label: 'Remote Controls / Toys (Button Battery)',
                type: 'objeto',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'ingestao', desc: 'Battery ingestion causes esophageal chemical burns in 2 hours.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Screw down battery compartments. If a battery goes missing, go to the hospital immediately.'
            }
        ]
    },

    'externo': {
        label: 'Backyard & Garden',
        emoji: '🌳',
        risks_inherent: ['Drowning', 'Poisoning', 'Animals'],
        items: [
            {
                id: 'plantas_toxicas',
                label: 'Ornamental Plants (Dumb Cane, Azalea)',
                type: 'biologico',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestion causes glottis edema and rapid asphyxiation.', target: ['crianca', 'pet'] },
                    { type: 'alergia', desc: 'Sap can cause skin/eye burns.', target: ['todos'] }
                ],
                expert_tip: 'Know your plants by scientific name. When in doubt, raise them or remove them.'
            },
            {
                id: 'churrasqueira',
                label: 'BBQ Grill / Fire Pit',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'queimadura', desc: 'Embers stay hot for hours under ashes (children step on them).', target: ['crianca', 'pet'] },
                    { type: 'explosao', desc: 'Using liquid alcohol to light it.', target: ['todos'] }
                ],
                expert_tip: 'Isolate the grill area. Completely extinguish embers with water when finished.'
            },
            {
                id: 'piscina',
                label: 'Pool / Reflecting Pool',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'afogamento', desc: 'Silent and fast (seconds). Suction drains trap hair.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'A physical fence 4ft high with a self-latching gate is the only effective barrier. Covers are not enough.'
            }
        ]
    },

    'circulacao': {
        label: 'Hallways & Structure',
        emoji: '🏠',
        risks_inherent: ['Falls', 'Crushing', 'Cuts'],
        items: [
            {
                id: 'escadas_internas',
                label: 'Indoor Stairs',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda', desc: 'Falling down stairs (lack of handrail or gate). High risk for babies and elderly.', target: ['bebe', 'idoso'] },
                    { type: 'escorregamento', desc: 'Slippery floor or loose carpet on steps.', target: ['todos'] }
                ],
                expert_tip: 'Install baby gates at the top and bottom. Use anti-slip strips.'
            },
            {
                id: 'janelas_sacadas',
                label: 'Windows and Balconies (Above Ground Floor)',
                type: 'estrutura',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'queda_altura', desc: 'Fatal fall. Children climb furniture to look out the window.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Certified safety nets are mandatory. Window guards help, but do not replace the net.'
            },
            {
                id: 'portas_vidro',
                label: 'Glass Doors (Sliding)',
                type: 'estrutura',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'colisao', desc: 'Very clean glass becomes invisible. Children run and collide.', target: ['crianca', 'pet'] }
                ],
                expert_tip: 'Use visual decals at children\'s eye level to signal the glass.'
            }
        ]
    },

    'garagem': {
        label: 'Garage & Workshop',
        emoji: '🔧',
        risks_inherent: ['Poisoning', 'Cuts', 'Fire'],
        items: [
            {
                id: 'ferramentas_eletricas',
                label: 'Power Tools (Drill, Saw)',
                type: 'ferramenta',
                riskLevel: 'ALTO',
                hazards: [
                    { type: 'corte', desc: 'Accidental activation out of curiosity.', target: ['crianca'] }
                ],
                expert_tip: 'Store in locked boxes and unplugged. Never leave "plugged in" between uses.'
            },
            {
                id: 'quimicos_automotivos',
                label: 'Automotive Products / Flammables',
                type: 'quimico',
                riskLevel: 'CRITICO',
                hazards: [
                    { type: 'intoxicacao', desc: 'Ingestion of colored liquids (gasoline, antifreeze).', target: ['crianca', 'pet'] },
                    { type: 'incendio', desc: 'Improper storage generates explosive vapors.', target: ['todos'] }
                ],
                expert_tip: 'Store in a ventilated, high, and locked place. Away from heat sources.'
            }
        ]
    }
};
