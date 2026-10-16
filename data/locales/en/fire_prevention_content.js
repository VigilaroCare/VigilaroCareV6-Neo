export const firePreventionContentEN = {
    concepts: {
        title: 'Fire Theory',
        emoji: '🔥',
        sections: [
            {
                title: 'What is Fire?',
                content: 'Fire is a rapid chemical reaction of exothermic oxidation (releases heat) that produces light and gases. For it to exist, four essential elements must combine, forming the "Fire Tetrahedron".'
            },
            {
                title: 'The Fire Tetrahedron',
                content: 'People used to refer to the "fire triangle", but today we know there are 4 elements:\n\n1. Fuel: The material that burns (solid, liquid, or gas).\n2. Oxidizing Agent: The element that feeds the fire (usually Oxygen in the air).\n3. Heat: The energy that starts the reaction.\n4. Chain Reaction: The process that makes the burning self-sustaining.\n\nIf you remove ANY of these 4 elements, the fire goes out.'
            },
            {
                title: 'Methods of Heat Transfer',
                content: 'Heat can spread in three ways:\n\n• Conduction: Transfer of heat through a solid body, from molecule to molecule. E.g., a metal spoon heating up in a pot.\n\n• Convection: Movement of heated air or liquid masses. Hot air rises and cold air descends. This is how fire spreads to upper floors.\n\n• Radiation: Heat waves that travel through space without needing material contact. It is the heat you feel when standing near a bonfire.'
            },
            {
                title: 'Classes of Fire',
                content: 'Knowing the class is vital to choosing the correct extinguisher:\n\n• Class A (Solids): Paper, wood, fabric. They leave ash. Extinguish with Water or Dry Chemical.\n\n• Class B (Flammable Liquids): Gasoline, alcohol, wax. DO NOT use water! Extinguish by smothering (Dry Chemical or CO2).\n\n• Class C (Electrical): Equipment plugged into an outlet. DO NOT use water (shock risk)! Use CO2 or Dry Chemical.\n\n• Class K (Kitchen): Oils and fats in fryers. Requires special extinguishers or smothering with a lid.'
            },
            {
                title: 'Phases of Fire',
                content: '1. Incipient Phase: The fire starts small. This is the ideal time to use an extinguisher.\n2. Free Burning: The fire grows, the temperature rises rapidly, and oxygen is consumed.\n3. Smoldering Phase: Oxygen decreases, but the heat is intense. Caution: opening a door now can cause a smoke explosion (Backdraft).'
            }
        ]
    },
    prevention: {
        title: 'Home Prevention',
        emoji: '🛡️',
        sections: [
            {
                title: 'Kitchen (Critical Area)',
                content: '• Never leave pots on the stove unattended.\n• Use a timer if you need to step away.\n• Keep pot handles turned inward.\n• Grease fire? DO NOT THROW WATER. Turn off the heat and smother with a lid.'
            },
            {
                title: 'Electrical',
                content: '• Avoid overloading outlets and using multi-plugs.\n• Exposed or hot wires? Call an electrician.\n• Unplug electronics during thunderstorms.'
            },
            {
                title: 'Flammables',
                content: '• Keep alcohol, gasoline, and solvents away from heat.\n• Store in a well-ventilated area.\n• Never pour down the drain (explosion risk).'
            },
            {
                title: 'Candles and Cigarettes',
                content: '• Always put candles on a sturdy stand, away from curtains.\n• Extinguish when leaving the room.\n• Smokers: beware of falling asleep and properly extinguish butts.'
            }
        ]
    },
    electricalAppliances: {
        title: 'Electrical Appliances and Fire',
        emoji: '🔌',
        sections: [
            {
                title: 'Class K - Kitchen',
                content: 'Fires involving oil and grease in fryers, grills, and baking pans. NEVER use water, as it causes a steam explosion and spreads the fire. The correct action is to turn off the heat source and smother it with a lid or use a Class K extinguisher.'
            },
            {
                title: 'High Power Equipment',
                content: 'Air conditioners, heaters, electric ovens, and microwaves require a lot of power. NEVER use extension cords or adapters for these appliances, as they can melt and start a fire.'
            },
            {
                title: 'Heat Sources',
                content: 'Irons, hair straighteners, and portable heaters are frequent causes of fire. Never leave them on unattended and keep them away from combustible materials (clothes, curtains, sofas).'
            }
        ]
    },
    action: {
        title: 'In Case of Fire',
        emoji: '🚨',
        steps: [
            'GET OUT OF THE BUILDING IMMEDIATELY. Saving lives is the only priority.',
            'If there is smoke in the way, crawl. The cleanest, most breathable air is near the floor.',
            'Touch the door with the back of your hand before opening it. If it is hot, do not open it.',
            'Close doors behind you as you go through rooms to help hold back the flames.',
            'Call the fire service on {{FIRE_NUMBER}} as soon as you are somewhere safe.',
            'NEVER go back for bags, documents or phones.',
            'If your clothes catch fire: STOP, DROP to the floor and ROLL from side to side.',
        ]
    }
};
