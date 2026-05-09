export const primeirosSocorrosEN = [
    {
        id: 'ps_1',
        titulo: 'Burns',
        emoji: '🔥',
        situacao: 'Thermal, Chemical, or Electrical',
        oQueFazer: [
            'Move the victim away from the heat source.',
            'Cool the area with running water (room temperature) for 15-20 minutes.',
            'Remove accessories (rings, watches) before the area swells.',
            'Cover with a clean, damp cloth.',
        ],
        oQueNaoFazer: [
            'NEVER apply toothpaste, butter, coffee grounds, or direct ice.',
            'DO NOT pop blisters.',
            'DO NOT try to unstick burnt clothing from the skin.',
        ],
        quandoChamarAjuda: 'If the burn is extensive, on the face, hands, genitals, or in children/elderly.'
    },
    {
        id: 'ps_2',
        titulo: 'Choking (Adult/Child)',
        emoji: '🤢',
        situacao: 'Airway obstruction',
        oQueFazer: [
            'Encourage coughing if the person can cough.',
            'If they make no sound: Start the Heimlich Maneuver.',
            'Stand behind them, make a fist above their navel.',
            'Give quick, upward thrusts (J-shape).',
        ],
        oQueNaoFazer: [
            'Do not slap their back if they are standing up (it can worsen the obstruction).',
            'Do not offer water.',
        ],
        quandoChamarAjuda: 'If the person loses consciousness (start CPR) or if choking persists.'
    },
    {
        id: 'ps_3',
        titulo: 'Choking (Infant)',
        emoji: '👶',
        situacao: 'Obstruction in infants',
        oQueFazer: [
            'Place the infant face down along your forearm, head lower than the chest.',
            'Give 5 firm back blows (between the shoulder blades).',
            'Turn them face up and give 5 chest thrusts with two fingers.',
            'Repeat until the object is dislodged.',
        ],
        oQueNaoFazer: [
            'Do not shake the infant.',
            'Do not perform a blind finger sweep.',
        ],
        quandoChamarAjuda: 'If the infant turns blue or loses consciousness.'
    },
    {
        id: 'ps_4',
        titulo: 'Cuts and Bleeding',
        emoji: '🩸',
        situacao: 'Open wounds',
        oQueFazer: [
            'Wash with water and mild soap.',
            'Compress the area with a clean cloth applying direct pressure for 5-10 mins.',
            'Keep the injured limb elevated if possible.',
        ],
        oQueNaoFazer: [
            'Do not apply a tourniquet (unless amputation or extreme life threat).',
            'Do not apply coffee grounds or sugar.',
        ],
        quandoChamarAjuda: 'If the bleeding does not stop, is very deep, or might need stitches.'
    },
    {
        id: 'ps_5',
        titulo: 'Electric Shock',
        emoji: '⚡',
        situacao: 'Contact with electric current',
        oQueFazer: [
            'Turn off the power source (circuit breaker) IMMEDIATELY.',
            'If you cannot turn it off, move the victim using a NON-conductive object (dry wooden broom).',
            'Check breathing and pulse.',
        ],
        oQueNaoFazer: [
            'NEVER touch the victim if they are still connected to the current.',
        ],
        quandoChamarAjuda: 'ALWAYS call emergency services. Shocks can cause delayed arrhythmias.'
    },
    {
        id: 'ps_6',
        titulo: 'Poisoning',
        emoji: '☠️',
        situacao: 'Ingestion of poison/chemicals',
        oQueFazer: [
            'Identify the ingested product.',
            'Call the Poison Control Center immediately.',
            'Follow the operator\'s instructions.',
        ],
        oQueNaoFazer: [
            'DO NOT induce vomiting (it can burn the esophagus again).',
            'Do not give milk or water without medical advice.',
        ],
        quandoChamarAjuda: 'Immediately.'
    },
    {
        id: 'ps_7',
        titulo: 'Falls and Fractures',
        emoji: '🤕',
        situacao: 'Fall from a height or heavy impact',
        oQueFazer: [
            'Keep the victim completely still, especially if they have back or neck pain.',
            'Apply ice to the impact site (wrapped in a cloth, not directly on the skin).',
            'If there is bleeding, apply pressure.',
        ],
        oQueNaoFazer: [
            'DO NOT try to set the bone back into place.',
            'DO NOT move the victim if you suspect a spinal injury.',
        ],
        quandoChamarAjuda: 'If there is deformity, intense pain, inability to move, or fainting.'
    },
    {
        id: 'ps_8',
        titulo: 'Head Trauma',
        emoji: '🧠',
        situacao: 'Heavy blow to the head',
        oQueFazer: [
            'Observe the victim closely for the next 24 hours.',
            'Keep the person awake if they are drowsy immediately after the blow.',
            'Apply a cold compress to reduce swelling.',
        ],
        oQueNaoFazer: [
            'Do not ignore symptoms like vomiting or mental confusion.',
            'Do not give sleep medication.',
        ],
        quandoChamarAjuda: 'Vomiting, fainting, bleeding from the nose/ear, unequal pupil sizes.'
    },
    {
        id: 'ps_9',
        titulo: 'Food Poisoning',
        emoji: '🤢',
        situacao: 'Vomiting and diarrhea after eating',
        oQueFazer: [
            'Hydrate with oral rehydration salts or coconut water in small sips.',
            'Rest.',
            'Maintain a light diet (no fat/dairy) when hunger returns.',
        ],
        oQueNaoFazer: [
            'Do not take anti-diarrhea medication (the toxin needs to leave the body).',
            'Do not force food if vomiting.',
        ],
        quandoChamarAjuda: 'Signs of dehydration (dry mouth, no urine), blood in stool, or high fever.'
    },
    {
        id: 'ps_10',
        titulo: 'Foreign Objects',
        emoji: '👁️',
        situacao: 'Object in the eye, nose, or ear',
        oQueFazer: [
            'Eyes: Wash thoroughly with saline or running water.',
            'Nose/Ear: If visible and easy, try to remove with tweezers (CAUTION).',
            'Best option: Seek medical attention.',
        ],
        oQueNaoFazer: [
            'DO NOT rub your eyes (can scratch the cornea).',
            'DO NOT use a cotton swab to push objects further into the ear.',
            'DO NOT try to remove deeply lodged objects.',
        ],
        quandoChamarAjuda: 'Whenever it does not come out easily with washing or if there is pain/blurred vision.'
    },
    {
        id: 'ps_11',
        titulo: 'Animal Bites',
        emoji: '🐕',
        situacao: 'Dog, cat, or other animals',
        oQueFazer: [
            'Wash the wound with soap and water for 5-10 minutes.',
            'Apply pressure to stop bleeding.',
            'Seek medical care to evaluate tetanus/rabies vaccination.',
        ],
        oQueNaoFazer: [
            'Do not close the wound with stitches at home.',
            'Do not ignore small bites (high risk of infection).',
        ],
        quandoChamarAjuda: 'Always, for vaccination protocol and deep cleaning.'
    },
    {
        id: 'ps_12',
        titulo: 'Sudden Illness',
        emoji: '😵',
        situacao: 'Dizziness, weakness, paleness, or chest pain',
        oQueFazer: [
            'Sit or lay the victim down in a ventilated area.',
            'Loosen tight clothing (collar, belt).',
            'Ask if they take any medication and if they have felt this way before.',
        ],
        oQueNaoFazer: [
            'DO NOT give water or food if the person is confused.',
            'DO NOT leave the victim alone.',
        ],
        quandoChamarAjuda: 'If symptoms do not pass in a few minutes or if there is intense chest pain.'
    },
    {
        id: 'ps_13',
        titulo: 'Fainting (Syncope)',
        emoji: '💤',
        situacao: 'Sudden, brief loss of consciousness',
        oQueFazer: [
            'Lay the person flat on their back.',
            'Elevate their legs (above heart level) to facilitate blood return.',
            'Monitor breathing.',
        ],
        oQueNaoFazer: [
            'DO NOT throw water on their face.',
            'DO NOT offer alcohol or ammonia to smell.',
            'DO NOT try to sit or stand the person up quickly.',
        ],
        quandoChamarAjuda: 'If the person does not wake up in 1-2 minutes or if they fell and hit their head.'
    },
    {
        id: 'ps_14',
        titulo: 'Seizure',
        emoji: '🧠',
        situacao: 'Muscle spasms, loss of consciousness, salivation',
        oQueFazer: [
            'Protect their head (place a cushion or coat underneath).',
            'Move dangerous objects away from the area.',
            'Time the seizure.',
            'Once it ends, roll the person onto their side (recovery position).',
        ],
        oQueNaoFazer: [
            'NEVER hold their tongue or put your hand in the victim\'s mouth.',
            'DO NOT try to forcefully restrain their movements.',
            'DO NOT give water or medication during the seizure.',
        ],
        quandoChamarAjuda: 'If the seizure lasts more than 5 minutes, if it is their first time, or if another seizure follows immediately.'
    },
    {
        id: 'ps_15',
        titulo: 'Stroke',
        emoji: '🥴',
        situacao: 'Facial drooping, slurred speech, loss of strength',
        oQueFazer: [
            'Do the FAST test: Face (drooping?), Arms (drifting down?), Speech (slurred?), Time (call emergency).',
            'Note the exact time symptoms started.',
            'Keep the victim strictly resting.',
        ],
        oQueNaoFazer: [
            'DO NOT wait to see if symptoms improve.',
            'DO NOT give aspirin or any medication (could worsen a hemorrhagic stroke).',
        ],
        quandoChamarAjuda: 'IMMEDIATELY. Time is brain.'
    },
    {
        id: 'ps_16',
        titulo: 'Cardiac Arrest',
        emoji: '💔',
        situacao: 'Victim unresponsive and NOT breathing',
        oQueFazer: [
            'Call emergency services and ask for an AED (Defibrillator) if available.',
            'Begin CPR (Chest Compressions) IMMEDIATELY.',
            'Push hard and fast in the center of the chest (100-120 compressions per minute).',
            'Allow full chest recoil after each compression.',
        ],
        oQueNaoFazer: [
            'DO NOT stop compressions until help arrives or the victim reacts.',
            'DO NOT worry about breaking ribs (it is better than death).',
        ],
        quandoChamarAjuda: 'IMMEDIATAMENTE.'
    }
];
