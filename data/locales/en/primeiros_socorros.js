export const primeirosSocorrosEN = [
    {
        id: 'ps_1',
        titulo: 'Burns',
        emoji: '🔥',
        situacao: 'Thermal, Chemical, or Electrical',
        oQueFazer: [
            'Move the person away from the fire or heat source.',
            'Cool the area under running water at room temperature for 15 to 20 minutes.',
            'Remove rings, bracelets and watches before the area starts to swell.',
            'Cover the wound gently with a clean, damp cloth.',
        ],
        oQueNaoFazer: [
            'NEVER put ointments, toothpaste, butter, coffee grounds or ice directly on the burn.',
            'DO NOT burst any blisters that form.',
            'DO NOT try to pull off pieces of clothing stuck to the burned skin.',
        ],
        quandoChamarAjuda: 'Call for help if the burn is larger than the palm of the hand, affects the face, hands or genitals, or happens to a child or an older person.'
    },
    {
        id: 'ps_2',
        titulo: 'Choking (Adult and Child over 1 year)',
        emoji: '🤢',
        situacao: 'Airway obstruction — 2025 AHA protocol',
        oQueFazer: [
            'Encourage coughing if the person can cough forcefully (coughing is the most effective manoeuvre for a partial obstruction).',
            'Have someone call {{EMERGENCY_MEDICAL}} and start the manoeuvres if the person cannot cough, speak or breathe (total obstruction).',
            'Stand behind the person, lean their upper body slightly forward and give 5 firm back blows between the shoulder blades with the heel of your hand.',
            'If the object does not come out, give 5 abdominal thrusts (Heimlich manoeuvre): place your fist just above the navel, cover it with your other hand and pull inwards and upwards in a \'J\' motion.',
            'Keep alternating 5 back blows with 5 abdominal thrusts until the object is expelled or the person loses consciousness.',
            'For pregnant women, or people with obesity when you cannot get your arms around the abdomen, replace the abdominal thrusts with 5 thrusts to the centre of the chest.',
        ],
        oQueNaoFazer: [
            'DO NOT offer water or food (the airway is blocked).',
            'DO NOT put your fingers in the mouth blindly to try to remove the object (you may push it further in).',
            'DO NOT stop the cycles of 5 blows and 5 thrusts to look for the object unless it is visible or the person faints.',
        ],
        quandoChamarAjuda: 'Call {{EMERGENCY_MEDICAL}} as soon as you recognise a total obstruction. If the person loses consciousness, lay them on the floor and start CPR with chest compressions right away.'
    },
    {
        id: 'ps_3',
        titulo: 'Choking (Infant under 1 year)',
        emoji: '👶',
        situacao: 'Obstruction in infants — 2025 AHA protocol',
        oQueFazer: [
            'Lay the baby face down along your forearm, head lower than the chest, firmly supporting the chin and jaw without squeezing the neck.',
            'Give 5 firm back blows between the shoulder blades with the heel of your hand.',
            'Turn the baby face up along your forearm and give 5 chest thrusts in the centre of the chest with the heel of one hand.',
            'Alternate cycles of 5 back blows and 5 chest thrusts until the object is expelled or the baby loses consciousness.',
        ],
        oQueNaoFazer: [
            'NEVER give abdominal thrusts (Heimlich) to babies under 1 year (risk of serious injury to internal organs such as the liver and spleen).',
            'NEVER shake the baby.',
            'DO NOT put your fingers in the baby\'s mouth blindly if the object or food is not visible inside the mouth.',
        ],
        quandoChamarAjuda: 'Call {{EMERGENCY_MEDICAL}} as soon as you notice the baby is not crying, coughing or breathing. If the baby becomes unresponsive, start infant CPR (30 compressions to 2 breaths).'
    },
    {
        id: 'ps_4',
        titulo: 'Cuts and Bleeding',
        emoji: '🩸',
        situacao: 'Open wounds',
        oQueFazer: [
            'Gently wash the cut with saline or water and mild soap.',
            'Press firmly on the area with a clean cloth for 5 to 10 minutes without letting go.',
            'Keep the affected limb (arm or leg) raised to reduce pressure and blood flow.',
        ],
        oQueNaoFazer: [
            'DO NOT apply a tourniquet (use one only for amputations or very severe arterial bleeding that does not stop with pressure).',
            'DO NOT put coffee grounds, sugar or ointments on the cut.',
        ],
        quandoChamarAjuda: 'Call for help if the bleeding has not stopped after 10 minutes of direct pressure, if the cut is very deep, or if its edges stay open.'
    },
    {
        id: 'ps_5',
        titulo: 'Electric Shock',
        emoji: '⚡',
        situacao: 'Contact with electric current',
        oQueFazer: [
            'Switch off the main circuit breaker IMMEDIATELY.',
            'If you cannot cut the power, move the person away from the source using a dry wooden or plastic object (such as a dry broom handle).',
            'Once the person is away from the electrical source, check whether they are breathing and have a heartbeat.',
        ],
        oQueNaoFazer: [
            'NEVER touch the person while they are still in contact with the electric current.',
        ],
        quandoChamarAjuda: 'ALWAYS call {{EMERGENCY_MEDICAL}}: an electric shock can cause heart rhythm problems hours later.'
    },
    {
        id: 'ps_6',
        titulo: 'Poisoning',
        emoji: '☠️',
        situacao: 'Ingestion of poison/chemicals',
        oQueFazer: [
            'Find out right away which product or medicine the person swallowed.',
            'Call the poison information centre immediately: {{POISON_CONTROL}}.',
            'Follow the advice of the medical staff exactly.',
        ],
        oQueNaoFazer: [
            'DO NOT induce vomiting unless the poison centre tells you to (corrosive products burn the oesophagus on the way down and on the way back up).',
            'DO NOT give milk, water or home remedies without medical advice first.',
        ],
        quandoChamarAjuda: 'Immediately.'
    },
    {
        id: 'ps_7',
        titulo: 'Falls and Fractures',
        emoji: '🤕',
        situacao: 'Fall from a height or heavy impact',
        oQueFazer: [
            'Keep the person lying down and still, especially if there is back or neck pain.',
            'Apply an ice pack wrapped in a towel to the painful area.',
            'If there is a bleeding wound, press gently with a clean cloth.',
        ],
        oQueNaoFazer: [
            'DO NOT try to straighten the bone or put it back in place.',
            'DO NOT move or lift the person if a spinal injury is suspected.',
        ],
        quandoChamarAjuda: 'Call for help if there is a visible deformity of the bone, very severe pain, inability to move the limb, or fainting.'
    },
    {
        id: 'ps_8',
        titulo: 'Head Trauma',
        emoji: '🧠',
        situacao: 'Heavy blow to the head',
        oQueFazer: [
            'Watch the person closely for the next 24 hours.',
            'Keep the person awake and talking for a while after the impact.',
            'Apply a cold compress to the area to limit swelling.',
        ],
        oQueNaoFazer: [
            'DO NOT ignore symptoms such as vomiting, dizziness or memory lapses.',
            'DO NOT give strong painkillers or sedatives without medical advice.',
        ],
        quandoChamarAjuda: 'Call for help if the person vomits, faints, bleeds from the nose or ears, or if the pupils become different sizes.'
    },
    {
        id: 'ps_9',
        titulo: 'Food Poisoning',
        emoji: '🤢',
        situacao: 'Vomiting and diarrhea after eating',
        oQueFazer: [
            'Drink oral rehydration solution or coconut water in small sips throughout the day.',
            'Rest.',
            'Eat light, fat-free food (such as white rice, potatoes and toast) once appetite returns.',
        ],
        oQueNaoFazer: [
            'DO NOT take medicine to stop diarrhoea (the body needs to eliminate the toxins).',
            'DO NOT force yourself to eat if you have strong nausea.',
        ],
        quandoChamarAjuda: 'Call for help if you notice signs of dehydration (dry mouth, no tears, or no urine for hours), high fever, or blood in the stools.'
    },
    {
        id: 'ps_10',
        titulo: 'Foreign Objects',
        emoji: '👁️',
        situacao: 'Object in the eye, nose, or ear',
        oQueFazer: [
            'Eyes: rinse with plenty of saline or lukewarm running water.',
            'Nose/ear: try to remove it gently with tweezers only if the object is visible and right at the opening.',
            'Go to the emergency department if the object is deep or hard to remove.',
        ],
        oQueNaoFazer: [
            'DO NOT rub the eyes (risk of scratching the cornea).',
            'DO NOT put cotton buds or pointed objects into the ear (risk of pushing the object further in or perforating the eardrum).',
        ],
        quandoChamarAjuda: 'Call for help whenever the object does not come out easily with the first gentle rinse, or if there is pain or blurred vision.'
    },
    {
        id: 'ps_11',
        titulo: 'Animal Bites',
        emoji: '🐕',
        situacao: 'Dog, cat, or other animals',
        oQueFazer: [
            'Wash the wound thoroughly with running water and mild soap for 10 minutes.',
            'If it is bleeding, press with a clean cloth.',
            'Go to the emergency department for thorough cleaning and to assess whether rabies and tetanus vaccination is needed.',
        ],
        oQueNaoFazer: [
            'DO NOT try to stitch or close the wound at home.',
            'DO NOT ignore small bites (animal saliva carries bacteria that cause fast-spreading infection).',
        ],
        quandoChamarAjuda: 'Call for help for any bite that breaks the skin, so it can be assessed and preventive vaccination considered.'
    },
    {
        id: 'ps_12',
        titulo: 'Sudden Illness',
        emoji: '😵',
        situacao: 'Dizziness, weakness, paleness, or chest pain',
        oQueFazer: [
            'Help the person sit or lie down in a cool, well-ventilated place.',
            'Loosen tight clothing such as shirt collars and belts.',
            'Ask about known health conditions and regular medication.',
        ],
        oQueNaoFazer: [
            'DO NOT give water or food if the person is confused or disoriented.',
            'DO NOT leave the person alone.',
        ],
        quandoChamarAjuda: 'Call for help if the person does not improve within 2 minutes, faints, or reports severe pain or tightness in the chest.'
    },
    {
        id: 'ps_13',
        titulo: 'Fainting (Syncope)',
        emoji: '💤',
        situacao: 'Sudden, brief loss of consciousness',
        oQueFazer: [
            'Lay the person on their back.',
            'Raise their legs about 30 cm off the ground to help blood return to the heart and brain.',
            'Keep watching their breathing.',
        ],
        oQueNaoFazer: [
            'DO NOT splash cold water on the person\'s face.',
            'DO NOT give alcohol, perfume or any substance to smell.',
            'DO NOT rush to get the person up as soon as they come round.',
        ],
        quandoChamarAjuda: 'Call for help if the person takes more than 2 minutes to come round, or if they had a hard fall with a head injury.'
    },
    {
        id: 'ps_14',
        titulo: 'Seizure',
        emoji: '🧠',
        situacao: 'Muscle spasms, loss of consciousness, salivation',
        oQueFazer: [
            'Protect the person\'s head by placing a folded jacket or a cushion under it.',
            'Move chairs and hard objects away to prevent injuries during the jerking.',
            'Time the seizure. If it lasts more than 3 minutes, it already calls for closer attention.',
            'Turn the person on their side (recovery position) as soon as the seizure ends.',
        ],
        oQueNaoFazer: [
            'NEVER try to hold the person\'s tongue or put objects or fingers in their mouth.',
            'DO NOT forcibly restrain the arm and leg movements.',
            'DO NOT give water or medicine while the seizure is going on.',
        ],
        quandoChamarAjuda: 'Call for help if the seizure lasts more than 5 minutes, if it is the first one, or if seizures happen one after another.'
    },
    {
        id: 'ps_15',
        titulo: 'Stroke',
        emoji: '🥴',
        situacao: 'Facial drooping, slurred speech, loss of strength',
        oQueFazer: [
            'Use the FAST test: Face (ask them to smile — does one side droop?), Arms (ask them to raise both arms — does one drift down?), Speech (is it slurred?). If any sign is present, it is urgent.',
            'Note the exact time the symptoms started.',
            'Call {{EMERGENCY_MEDICAL}} immediately.',
        ],
        oQueNaoFazer: [
            'DO NOT wait for the symptoms to get better on their own.',
            'DO NOT give medicines (such as aspirin or sedatives) before a medical assessment.',
        ],
        quandoChamarAjuda: 'Call {{EMERGENCY_MEDICAL}} as soon as you see any sign from the FAST test. Time is vital to prevent lasting damage.'
    },
    {
        id: 'ps_16',
        titulo: 'Cardiac Arrest',
        emoji: '💔',
        situacao: 'Victim unresponsive and NOT breathing',
        oQueFazer: [
            'Call {{EMERGENCY_MEDICAL}} immediately and ask for an Automated External Defibrillator (AED), if one is available nearby.',
            'Start chest compressions (CPR) without losing any time.',
            'Interlock your hands and place the heel of your palm in the centre of the person\'s chest (on the breastbone), then push hard and fast (100 to 120 compressions per minute, about 5 to 6 cm deep).',
            'Let the chest come all the way back up after each compression, without lifting your hands off.',
        ],
        oQueNaoFazer: [
            'DO NOT stop chest compressions until {{EMERGENCY_MEDICAL}} take over, the AED tells you to stand clear, or the person starts breathing normally again.',
            'DO NOT worry about breaking a rib — keeping blood flowing to the brain and heart is the absolute priority.',
        ],
        quandoChamarAjuda: 'IMMEDIATAMENTE.'
    }
];
