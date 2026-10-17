export const emergenciasPetsEN = [
    {
        id: 'engasgo_pet',
        titulo: 'Choking (Pet)',
        descricao: 'Agitated animal, trying to cough or unable to breathe.',
        icon: 'paw',
        cor: '#D32F2F', // Red
        corFundo: '#FFEBEE',
        frequencia: 'Common',
        passos: [
            { titulo: 'Open the mouth carefully', descricao: 'Pull the tongue to one side and check for a visible object (watch out for reflex bites).', critico: true },
            { titulo: 'Remove the object ONLY if it is easy to reach and visible inside the mouth', descricao: 'DO NOT try to pull it out with your fingers or tweezers if it is deep — you may push it further in.' },
            { titulo: 'Heimlich Maneuver (Large)', descricao: 'Stand behind the dog, wrap your arms around its waist with your fists just below the ribs, and thrust firmly upwards and forwards.', critico: true },
            { titulo: 'Heimlich (Small)', descricao: 'Specific technique for small dogs and cats: lay the pet on its side and press the abdomen just below the ribs with your fingertips, using controlled force.', critico: true },
            { titulo: 'Back blows', descricao: 'Give firm blows between the shoulder blades with the palm of your hand (only for cats and small dogs).' },
        ],
        alertas: [
            'Be careful not to get bitten or scratched: choking animals panic and react on instinct.',
            'Call the vet and let them know you are on your way.',
        ],
    },
    {
        id: 'atropelamento_pet',
        titulo: 'Car Accident / Trauma',
        descricao: 'Strong impact, intense pain or difficulty moving.',
        icon: 'bandage',
        cor: '#F57C00', // Orange
        corFundo: '#FFF3E0',
        frequencia: 'Severe',
        passos: [
            { titulo: 'Move to a safe place', descricao: 'Take the pet off the road very carefully, using a sheet or blanket stretched out as a stretcher to protect the spine.', critico: true },
            { titulo: 'DO NOT let it walk', descricao: 'Keep the pet lying down even if it seems fine and wants to run (a hard impact can cause silent internal bleeding).' },
            { titulo: 'Secure the area', descricao: 'Make sure the place where you stopped to help is safe from further accidents.' },
            { titulo: 'Control bleeding', descricao: 'Press on bleeding wounds with a clean cloth or gauze.' },
            { titulo: 'IMMEDIATE Vet', descricao: 'Take the pet to an emergency vet immediately for care, imaging and support.', critico: true },
        ],
        alertas: [
            'Pets in severe pain bite on instinct: improvise a light muzzle (only if there is no risk of vomiting).',
            'Keep the animal warm on the way.',
        ],
    },
    {
        id: 'rcp_pet',
        titulo: 'Cardiac Arrest (Pet)',
        descricao: 'Pet unconscious, not breathing and with no heartbeat.',
        icon: 'heart-dislike',
        cor: '#B71C1C', // Dark Red
        corFundo: '#FFEBEE',
        frequencia: 'Extreme',
        passos: [
            { titulo: 'Check heartbeat and breathing', descricao: 'Place your hand on the chest to feel for a heartbeat, put your ear near the nose to check for breathing, and feel for a pulse on the inner thigh.', critico: true },
            { titulo: 'Only if STOPPED', descricao: 'NEVER give chest compressions if the pet\'s heart is still beating.' },
            { titulo: 'Lay on the RIGHT side', descricao: 'Lay the animal on its right side (the heart sits under the left elbow).' },
            { titulo: 'Compressions (Small)', descricao: 'For cats and small dogs, wrap one hand around the chest and compress at a rate of 100 to 120 per minute.', critico: true },
            { titulo: 'Compressions (Med/Large)', descricao: 'Place both hands, one on top of the other, on the widest part of the chest and compress about one third of the chest width.', critico: true },
            { titulo: 'Mouth-to-snout breathing', descricao: 'Hold the pet\'s mouth firmly closed and blow air directly into the nostrils (2 breaths every 30 compressions).' },
        ],
        alertas: [
            'Do not stop compressions until you reach the emergency vet or the pet starts breathing again.',
            'It is exhausting: take turns with someone else every 2 minutes, if possible.',
        ],
    },
    {
        id: 'calor_pet',
        titulo: 'Hyperthermia (Heatstroke)',
        descricao: 'Extremely heavy panting, very red gums and collapse.',
        icon: 'sunny',
        cor: '#FBC02D', // Yellow
        corFundo: '#FFFDE7',
        frequencia: 'Summer',
        passos: [
            { titulo: 'Get out of the heat now', descricao: 'Move the pet immediately to shade, air conditioning or a well-ventilated place.', critico: true },
            { titulo: 'Wet the paws and belly', descricao: 'Wet the paws and belly with cool, room-temperature water (NEVER ice-cold water or ice, because of the risk of thermal shock).', critico: true },
            { titulo: 'Increase airflow', descricao: 'Point a fan at the pet or fan it vigorously.' },
            { titulo: 'Offer fresh water', descricao: 'Offer a bowl of fresh water without forcing it to drink, to avoid choking.' },
            { titulo: 'Take it to the vet', descricao: 'Take the pet to the vet even if it seems to improve, because overheating can damage the kidneys and other internal organs.' },
        ],
        alertas: [
            'Do not pour ice-cold water on your pet.',
            'Short-nosed breeds (such as Pugs, Bulldogs and Persians) suffer much more in the heat.',
        ],
    },
    {
        id: 'convulsao_pet',
        titulo: 'Seizure (Pet)',
        descricao: 'Stiff body, drooling and paddling the legs in the air.',
        icon: 'pulse',
        cor: '#7B1FA2', // Purple
        corFundo: '#F3E5F5',
        frequencia: 'Common',
        passos: [
            { titulo: 'DO NOT pull the tongue', descricao: 'DO NOT pull the animal\'s tongue (dogs and cats do not swallow their tongue; trying to hold it leads to serious bites).', critico: true },
            { titulo: 'Move furniture and corners away', descricao: 'Move furniture and hard objects away so the pet does not hit its head or hurt its eyes.' },
            { titulo: 'Dim the lights and sounds', descricao: 'Turn off the lights and the TV or radio to reduce stimulation to the brain.' },
            { titulo: 'Time it', descricao: 'Time the seizure. If it goes beyond 5 minutes, take the pet to the vet as an emergency.' },
            { titulo: 'After the seizure', descricao: 'Wait for consciousness to return gradually (the pet wakes up frightened and temporarily disoriented). Speak softly and avoid touching it with quick movements: that can frighten it, and its reaction may be a bite.' },
        ],
        alertas: [
            'Stay calm — animals sense our tension.',
            'If possible, film the seizure on your phone to show the vet.',
        ],
    },
    {
        id: 'sangramento_pet',
        titulo: 'Bleeding / Cut (Pet)',
        descricao: 'Bleeding wounds on the ears, paws or skin.',
        icon: 'water',
        cor: '#D32F2F', // Red
        corFundo: '#FFEBEE',
        frequencia: 'Common',
        passos: [
            { titulo: 'Press firmly', descricao: 'Place a clean cloth or gauze over the cut and press without stopping for at least 5 minutes.', critico: true },
            { titulo: 'Do not keep checking', descricao: 'DO NOT lift the cloth to check the bleeding — it breaks the forming clot.' },
            { titulo: 'Raise the injury', descricao: 'Raise the injured paw above chest level to reduce blood pressure in it.' },
            { titulo: 'Tourniquet: CAUTION', descricao: 'Last resort: only for severe bleeding from a leg or tail that will not stop with firm, continuous pressure. Use a wide, stretchy band (a thin cord cuts in and slips on the limb). Note the time you applied it and go to the vet immediately; the vet decides when to release it.', critico: true },
            { titulo: 'Get to the vet as soon as possible', descricao: 'Take the pet to the vet, because deep cuts need stitches and professional dressings.' },
        ],
        alertas: [
            'Ear cuts bleed a lot and spray blood when the pet shakes its head.',
            'If you cut a nail too short and it bleeds, apply cornflour to help stop it.',
        ],
    },
    {
        id: 'picada_peconhentos',
        titulo: 'Venomous Bites',
        descricao: 'Venomous creatures and painful stings or bites in the garden.',
        icon: 'warning',
        cor: '#FF5722', // Deep Orange
        corFundo: '#FBE9E7',
        frequencia: 'Urgent',
        passos: [
            { titulo: 'Take a photo of the creature', descricao: 'If it is safe, photograph the creature so the vet knows which antivenom to give. NEVER try to catch it.', critico: true },
            { titulo: 'Keep the pet still', descricao: 'Do not let the pet walk or run (movement speeds up the heartbeat and spreads the venom).' },
            { titulo: 'DO NOT cut or squeeze', descricao: 'NEVER cut the bite site, do not apply a tourniquet and do not try to suck out the venom.', critico: true },
            { titulo: 'Raise the area', descricao: 'Raise the bitten paw in relation to the body.' },
            { titulo: 'Go to the vet', descricao: 'Take the pet to the vet immediately for antivenom (snake or scorpion).', critico: true },
        ],
        alertas: ['Scorpion: immediate intense pain and vomiting', 'Snake: rapid swelling and bleeding'],
    },
    {
        id: 'plantas_toxicas_pet',
        titulo: 'Toxic Plants',
        descricao: 'Eating flowers, leaves or sap from toxic plants.',
        icon: 'leaf',
        cor: '#4CAF50', // Green
        corFundo: '#E8F5E9',
        frequencia: 'Common',
        passos: [
            { titulo: 'Clean the mouth right away', descricao: 'Remove any leaf pieces from the mouth and rinse with plenty of running water to wash off the sap.', critico: true },
            { titulo: 'Photo of the plant', descricao: 'Photograph the plant that was chewed, or bring a sprig of it for identification.' },
            { titulo: 'Watch the breathing', descricao: 'Keep an eye on breathing, because toxic plants can make the mouth and throat swell.' },
            { titulo: 'DO NOT induce vomiting', descricao: 'DO NOT induce vomiting unless the vet specifically tells you to (corrosive plants burn on the way back up).' },
            { titulo: 'Activated charcoal: vet only', descricao: 'Do NOT give activated charcoal or home remedies on your own: there is a risk of aspiration into the lungs. Give it only if the vet tells you to.' },
        ],
        alertas: [
            'Lily leaves are highly poisonous to cats and can cause severe kidney failure.',
            'Common signs: heavy drooling, swollen tongue, vomiting and lethargy.',
        ],
    },
    {
        id: 'quimicos_pet',
        titulo: 'Chemical Products',
        descricao: 'Swallowing bleach, disinfectants or rat poison.',
        icon: 'flask',
        cor: '#607D8B', // Blue Grey
        corFundo: '#ECEFF1',
        frequencia: 'Severe',
        passos: [
            { titulo: 'Move away from the product', descricao: 'Get the pet away from the chemical product and isolate the area.', critico: true },
            { titulo: 'SKIN/EYE contact', descricao: 'Rinse the affected skin or eyes with cold running water for 15 minutes without stopping.', critico: true },
            { titulo: 'Swallowing', descricao: 'DO NOT induce vomiting on your own (corrosive products burn on the way back up); only if the vet tells you to. Offer fresh water to rinse the mouth.' },
            { titulo: 'Call poison control', descricao: 'Call {{POISON_CONTROL}} with the product packaging in hand to read out the ingredients.' },
            { titulo: 'Go to the emergency vet', descricao: 'Take the chemical packaging or the poison box with the pet to the vet.' },
        ],
        alertas: [
            'NEVER give human medicines (such as paracetamol or aspirin) to dogs and cats.',
            'Foods such as chocolate, onion and xylitol (a sweetener) are also poisonous to pets.',
        ],
    },
];
