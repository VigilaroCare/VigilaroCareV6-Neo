export const RISK_CATEGORIES_EN = [
  {
    id: 'festas_eventos',
    title: 'Parties & Events',
    subtitle: 'Safety in social gatherings',
    audience: [ 'adult', 'child', 'baby', 'pet' ],
    icon: 'Musicnote',
    color: '#E91E63',
    gradient: [ '#C2185B', '#F48FB1' ],
    educational: {
      description: `**The Invisible Risk:** "Diffusion of responsibility" makes everyone think someone else is watching. Misplaced chairs become steps to windows, and glasses with alcohol are forgotten within children's reach.`,
      keyPoints: [
        '**Immediate Tactical Action:** Physically isolate risk areas (lock gates and kitchen).',
        'For elderly visitors, immediately remove loose rugs.',
        'Alert guests about uneven floors upon arrival.',
        'Learn the complete ecosystem at preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'fes_1',
        critico: true,
        text: 'Is access to the pool physically blocked?',
        consequence: 'Drowning is silent and takes less than 2 minutes.',
        checkAction: 'Close gates, use nets, or cover the pool.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_2',
        critico: true,
        text: 'Is there an exclusive adult supervising children?',
        consequence: '"Diffusion of responsibility" is the main cause of accidents at events.',
        checkAction: 'Assign a responsible person per shift.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_3',
        critico: true,
        text: 'Are alcoholic beverages out of reach of minors?',
        consequence: 'Accidental alcohol ingestion is a pediatric emergency.',
        checkAction: 'Keep glasses and bottles on a high table.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_4',
        critico: true,
        text: 'Does the grill/fire pit have a safe perimeter?',
        consequence: 'Severe burns in children and pets.',
        checkAction: 'Delimit with a fence or barrier 1m away.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_5',
        critico: true,
        text: 'Have knives and sharp utensils been put away?',
        consequence: 'Severe cuts during event movement.',
        checkAction: 'Store in a locked drawer or high cabinet.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_6',
        text: 'Have guests been alerted about uneven floors and steps?',
        consequence: 'Trips and serious falls on unfamiliar or poorly lit floors.',
        checkAction: 'Signal with tape or warn upon arrival.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_7',
        text: 'Are pets contained or on a leash?',
        consequence: 'Bites, scratches, or escaping during confusion.',
        checkAction: 'Put in a safe place or keep on a leash.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_8',
        text: 'Are electrical extension cords protected and out of the way?',
        consequence: 'Tripping and risk of short-circuit with liquids.',
        checkAction: 'Fix the wires with tape and keep away from wet areas.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_9',
        critico: true,
        text: 'If the event is in an apartment: are balconies and windows locked?',
        consequence: 'House children have no sense of height — balconies are traps.',
        checkAction: 'Lock windows, close balconies, and move furniture away from edges.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_10',
        critico: true,
        text: 'If the event is at a farm: are wells, lakes, and rivers fenced?',
        consequence: 'Apartment children are unaware of natural water risks.',
        checkAction: 'Keep gates locked and do not allow anyone near the water without adults supervising.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_11',
        text: 'Do elderly and PWDs know the layout of the place?',
        consequence: 'Unevenness, stairs, and unfamiliar floors cause falls.',
        checkAction: 'Give a guided tour upon arrival, pointing out risks.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'fes_12',
        text: 'Are the bathroom and leisure areas accessible (adapted)?',
        consequence: 'Exclusion and risk of accidents when improvising access.',
        checkAction: 'Check door widths, steps, and bathroom before the event.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'visitacao_segura',
    title: 'Safe Visitation',
    subtitle: 'Hosting or visiting elderly and babies',
    audience: [ 'adult', 'baby', 'elderly' ],
    icon: 'UserAdd',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    educational: {
      description: 'Having guests means adapting the home for people who do not know it. Older adults, children and babies have specific safety needs you may not notice in the rush of everyday life.',
      keyPoints: [
        'Remove loose rugs for elderly visitors.',
        'Check the width of passages and lighting of steps.',
        'Hide wires and protect outlets for crawling babies and children.',
        'Inform guests of house risks (e.g., step in the living room).'
      ]
    },
    questions: [
      {
        id: 'vis_1',
        critico: true,
        text: 'Have loose rugs and doormats been removed?',
        consequence: 'Main cause of falls in elderly visitors.',
        checkAction: 'Remove or fix with anti-slip.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_2',
        text: 'Are steps and uneven floors marked?',
        consequence: 'Visitors do not know the layout of the house.',
        checkAction: 'Use anti-slip tape or warn upon arrival.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_3',
        critico: true,
        text: "Have small objects been removed from children's reach?",
        consequence: 'Choking on parts, coins, and decorations.',
        checkAction: 'Look around at floor level.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_4',
        critico: true,
        text: 'Are low outlets protected?',
        consequence: 'Electric shock in babies and curious children.',
        checkAction: 'Fit dedicated plastic covers on unused sockets.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_5',
        critico: true,
        text: 'Are cleaning products and medicines locked?',
        consequence: 'Accidental poisoning from colourful containers left in drawers or under the sink.',
        checkAction: 'Store in a high, locked cabinet.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_6',
        critico: true,
        text: 'Does the bathroom have support or grab bars for the elderly?',
        consequence: 'Bathroom falls can be fatal for the elderly.',
        checkAction: 'Use a rubber mat in the shower and provide grab bars.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_7',
        critico: true,
        text: "Did you ask about the visitor's food allergies?",
        consequence: 'Severe allergic reaction (anaphylaxis).',
        checkAction: 'Confirm before offering food.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_8',
        critico: true,
        text: 'If visitor comes from a house/rural to an apartment: are windows and balconies safe?',
        consequence: 'Single-story house children do not perceive height risk.',
        checkAction: 'Lock windows and block access to balconies and elevators.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_9',
        text: 'If visitor comes from an apartment to a house/rural: checked terrain and fauna?',
        consequence: 'Irregular floors, venomous animals, and open water are unknown risks.',
        checkAction: 'Warn about terrain, proper footwear, and forbidden areas.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_10',
        text: 'Is the home accessible for visitors with special needs?',
        consequence: 'Loose steps or narrow doorways cause serious falls when people improvise.',
        checkAction: 'Check accessibility and provide ramps if necessary.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'vis_11',
        text: 'Has the elderly/PWD been informed about unevenness, stairs, and house floors?',
        consequence: 'Disorientation in a new place makes serious falls more likely.',
        checkAction: 'Accompany upon arrival and point out attention points.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'reformas_obras',
    title: 'Remodeling & Works',
    subtitle: 'Active maintenance and building',
    audience: [ 'adult' ],
    icon: 'hammer-wrench',
    color: '#795548',
    gradient: [ '#5D4037', '#D7CCC8' ],
    educational: {
      description: 'Building work always turns the home upside down. Temporary exposed wiring, nails, screws and pieces of wood scattered on the floor are the biggest accident traps.',
      keyPoints: [
        '**Immediate Tactical Action:** Isolate the area with physical barriers.',
        'Turn off the MAIN SWITCH before any electrical repair.',
        'For work at heights, never use stools; use locked ladders with an assistant holding the base.',
        'More tactical protocols at preveniremcasa.com.br'
      ]
    },
    questions: [
      {
        id: 'ref_1',
        critico: true,
        text: 'Is the construction area locked or isolated?',
        consequence: 'Children and pets wander in, explore the work area and get hurt on the rubble.',
        checkAction: 'Use hoardings or lock the doors.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_2',
        text: 'Is the area breaker turned off at the end of the day?',
        consequence: 'Temporary electrical installations on a building site can overheat at night and catch fire.',
        checkAction: 'Turn off the breaker when leaving.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_3',
        critico: true,
        text: 'Have power tools been unplugged?',
        consequence: 'Accidental activation by third parties.',
        checkAction: 'Unplug after use.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_4',
        critico: true,
        text: 'Have nails and sharp materials been collected?',
        consequence: 'Severe punctures and tetanus risk.',
        checkAction: 'Sweep and collect at the end of each day.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_5',
        critico: true,
        text: 'Are chemical products (solvents, paints) locked away?',
        consequence: 'Intoxication and fire risk.',
        checkAction: 'Store in a ventilated, locked area.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_6',
        critico: true,
        text: 'Are extension cords organized and away from water?',
        consequence: 'Short-circuit and fire.',
        checkAction: 'Keep extension leads tidy and away from moisture and pipes.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_7',
        text: 'Are workers wearing proper PPE?',
        consequence: 'Eye injuries, cuts, and falls.',
        checkAction: 'Require helmet, gloves, and glasses.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'ref_8',
        text: 'Has debris been removed or is it in a closed dumpster?',
        consequence: 'Accidents with children and passage obstruction.',
        checkAction: 'Remove daily or use a dumpster.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'mudanca_residencia',
    title: 'Moving Residence',
    subtitle: 'Safety in the new home',
    audience: [ 'adult', 'child', 'baby', 'pet', 'elderly' ],
    icon: 'HomeHash',
    color: '#FF5722',
    gradient: [ '#BF360C', '#FF8A65' ],
    educational: {
      description: '**The Invisible Risk:** Stacked boxes create blind spots. Childish curiosity in an unknown environment leads to quick accidents in windows without nets.',
      keyPoints: [
        '**Immediate Tactical Action:** Map the main switch and gas valves immediately.',
        'Fix shelves and dressers to the wall at the exact moment of assembly to prevent crushing.',
        'Visit preveniremcasa.com.br for complete moving checklists.'
      ]
    },
    questions: [
      {
        id: 'mud_1',
        critico: true,
        text: 'Have safety nets been installed on windows?',
        consequence: 'High fall risk on high floors.',
        checkAction: 'Keep windows locked until safety nets are fitted. Prefer specialised companies.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_2',
        critico: true,
        text: 'Are tall furniture fixed to the wall?',
        consequence: 'Shelves tipping over on children.',
        checkAction: 'Install anti-tip kits.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_3',
        text: 'Identified the main switch and gas valves?',
        consequence: 'Panic in case of leak or short circuit.',
        checkAction: 'Locate and test the valves.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_4',
        text: 'Are stacked boxes stable and out of passages?',
        consequence: 'Tipping and escape route obstruction.',
        checkAction: 'Stack up to shoulder height, away from doors.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_5',
        text: 'Have outlets and wiring of the new property been inspected?',
        consequence: 'Old wiring can overheat or short-circuit with high-power (high-wattage) appliances.',
        checkAction: 'Test the circuit breakers and check for loose wires in the walls or signs of heating. Consult a qualified professional.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'mud_6',
        text: 'Are children and pets supervised during the move?',
        consequence: 'Doors and gates left open all the time make escapes, falls and traffic accidents easier.',
        checkAction: 'Leave children and pets with relatives or in a safe room.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  },
  {
    id: 'monitor_kids',
    title: 'Monitoring Children',
    subtitle: 'Active supervision and routine',
    audience: [ 'baby', 'child' ],
    icon: 'eye-outline',
    color: '#009688',
    gradient: [ '#00695C', '#4DB6AC' ],
    educational: {
      description: 'Active supervision is the key to preventing accidents with young children. Children have no sense of danger, they are quick, and they put themselves at risk in seconds.',
      keyPoints: [
          'Never leave babies alone on changing tables or beds.',
          'Keep children out of the kitchen while the cooker is in use.',
          'Check that window safety nets are secure.',
          'Avoid being distracted by your phone, TV or social media when your job is to watch the children.',
      ]
    },
    questions: [
      {
        id: 'kid_1',
        critico: true,
        text: 'Can you see the child right now?',
        consequence: 'A few seconds of distraction are enough for a baby to touch or reach something dangerous.',
        checkAction: 'Keep constant eye contact and always stay close to the child.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_2',
        text: 'Is the cell phone away from you?',
        consequence: 'Checking social media or messaging takes your attention away right when it is needed.',
        checkAction: 'Leave the cell phone in another room.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_3',
        critico: true,
        text: 'Do the windows in the room have suitable safety nets in good condition?',
        consequence: 'Falls from heights are the leading cause of childhood death.',
        checkAction: 'Fit safety nets, and keep the windows locked if you do not have them.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_4',
        critico: true,
        text: 'Is the kitchen inaccessible during preparation?',
        consequence: 'Burns from hot liquids and pots.',
        checkAction: 'Keep the kitchen door closed or use safety gates.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_5',
        critico: true,
        text: 'Are medicines and cleaning products locked?',
        consequence: 'Accidental poisoning is a frequent emergency in under-5s.',
        checkAction: 'Store disinfectants and pills on shelves out of children\'s reach.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'kid_6',
        critico: true,
        text: 'Have you made sure there are no coins or batteries on the floor?',
        consequence: 'Babies put everything in their mouths. Batteries cause choking or burns to the oesophagus.',
        checkAction: 'Do a floor-level sweep.',
        options: [ { label: 'No', safe: true }, { label: 'Yes', safe: false } ]
      }
    ]
  },
  {
    id: 'servicos_altura',
    title: 'Working at Heights',
    subtitle: 'Ceiling and curtain cleaning',
    audience: [ 'adult' ],
    icon: 'ladder',
    color: '#2196F3',
    gradient: [ '#1976D2', '#BBDEFB' ],
    educational: {
      description: 'Falls are the leading cause of severe domestic accidents, especially in the elderly and adults performing maintenance.',
      keyPoints: [
        'Never use chairs, stools, or boxes as a ladder.',
        'Keep the ladder fully open and locked.',
        'Always have an assistant (spotter) holding the ladder base.',
        'Do not try to reach far places; climb down and move the ladder.',
        'For roof or slab services, be sure of your capacity. Calling a professional prevents tragedies.',
        'Never use metal ladders if there is any chance of contact with electrical grids.'
      ]
    },
    questions: [
      {
        id: 'alt_1',
        critico: true,
        text: 'Are you using a proper ladder (not a chair)?',
        consequence: 'Standing on chairs or boxes is dangerous and unstable, and causes falls.',
        checkAction: 'Use a domestic ladder that carries {{CERT_SEAL}}.',
        options: [
          { label: 'Yes', safe: true },
          { label: 'Used chair', safe: false }
        ]
      },
      {
        id: 'alt_2',
        text: 'Is someone holding the base of the ladder?',
        consequence: 'The ladder can slip on smooth floors.',
        checkAction: 'Ask someone to hold the foot of the ladder to stop it slipping.',
        options: [
          { label: 'Yes', safe: true },
          { label: 'I am alone', safe: false }
        ]
      },
      {
        id: 'alt_3',
        critico: true,
        text: 'Is the ladder fully open and locked?',
        consequence: 'Poorly locked ladder closes during use.',
        checkAction: 'Check the locks before climbing.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_4',
        critico: true,
        text: 'Is the floor where the ladder rests firm and dry?',
        consequence: 'Standing it on a wet or uneven floor makes the ladder slip or tip over.',
        checkAction: 'Dry the floor and clear the area before setting it up.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_5',
        text: 'Are you avoiding leaning too far sideways?',
        consequence: 'Imbalance causes a fall from the ladder.',
        checkAction: 'Climb down and reposition the ladder.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'alt_6',
        critico: true,
        text: 'If you are going up on the roof or a flat roof, have you considered calling a specialist?',
        consequence: 'Falls from roofs and from roofing that gives way are often fatal.',
        checkAction: 'Hire a specialist roofer or gutter installer instead of taking the risk.',
        options: [
          { label: 'Yes', safe: true },
          { label: 'I will do it', safe: false }
        ]
      }
    ]
  },
  {
    id: 'faxina_quimica',
    title: 'Heavy Cleaning',
    subtitle: 'Handling Chemical Products',
    audience: [ 'adult' ],
    icon: 'bottle-tonic-skull',
    color: '#9C27B0',
    gradient: [ '#7B1FA2', '#E1BEE7' ],
    educational: {
      description: 'Mixing cleaning products can release invisible poisonous gases that burn the lungs. Use one product at a time and keep the home ventilated.',
      keyPoints: [
        'NEVER mix cleaning products: only combine what the label allows.',
        'Bleach with acids (vinegar, muriatic acid, rust or limescale removers) releases chlorine gas; with ammonia or rubbing alcohol, other toxic gases.',
        'Keep the room highly ventilated (open windows).',
        'Wear protective gloves to prevent dermatitis and burns.',
        'Do not store products in soda bottles (PET).'
      ]
    },
    questions: [
      {
        id: 'qui_1',
        critico: true,
        text: 'Are the windows and doors in the cleaning area open?',
        consequence: 'Accumulation of toxic vapors indoors.',
        checkAction: 'Open everything up so the air can circulate and be renewed.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_2',
        critico: true,
        text: 'Are you mixing cleaning products?',
        consequence: 'Bleach + other products generates lethal chlorine gas.',
        checkAction: 'Use one product at a time. Rinse before the next.',
        options: [ { label: 'No', safe: true }, { label: 'Yes', safe: false } ]
      },
      {
        id: 'qui_3',
        text: 'Are you wearing protective gloves?',
        consequence: 'Bleach and acids cause dermatitis and chemical burns on the skin.',
        checkAction: 'Wear rubber gloves before handling.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_4',
        critico: true,
        text: 'Are children and pets kept away from the cleaning?',
        consequence: 'They breathe in fumes from the floor or may drink the dirty water from the bucket.',
        checkAction: 'Keep them in another room during cleaning.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_5',
        critico: true,
        text: 'Are products in original packaging (not in PET bottles)?',
        consequence: 'Storing disinfectant or bleach in a juice bottle causes accidental poisoning.',
        checkAction: 'Never transfer to soda bottles.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      },
      {
        id: 'qui_6',
        text: 'Is the wet floor signposted?',
        consequence: 'Slipping on a soapy floor causes dangerous falls.',
        checkAction: 'Use a sign or warn residents.',
        options: [ { label: 'Yes', safe: true }, { label: 'No', safe: false } ]
      }
    ]
  }
];

export default RISK_CATEGORIES_EN;
