export const RISK_CATEGORIES_EN = [
    {
        id: 'festas_eventos',
        title: 'Parties & Events',
        subtitle: 'Safety in social gatherings',
        audience: ['adult', 'child', 'baby', 'pet'],
        icon: 'Musicnote',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
        educational: {
            description: '**The Invisible Risk:** "Diffusion of responsibility" makes everyone think someone else is watching. Misplaced chairs become steps to windows, and glasses with alcohol are forgotten within children\'s reach.',
            keyPoints: [
                '**Immediate Tactical Action:** Physically isolate risk areas (lock gates and kitchen).',
                'For elderly visitors, immediately remove loose rugs.',
                'Alert guests about uneven floors upon arrival.',
                'Learn the complete ecosystem at preveniremcasa.com.br'
            ]
        },
        questions: [
            { id: 'fes_1', critico: true, text: 'Is access to the pool physically blocked?', consequence: 'Drowning is silent and takes less than 2 minutes.', checkAction: 'Close gates, use nets, or cover the pool.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_2', critico: true, text: 'Is there an exclusive adult supervising children?', consequence: '"Diffusion of responsibility" is the main cause of accidents at events.', checkAction: 'Assign a responsible person per shift.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_3', critico: true, text: 'Are alcoholic beverages out of reach of minors?', consequence: 'Accidental alcohol ingestion is a pediatric emergency.', checkAction: 'Keep glasses and bottles on a high table.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_4', critico: true, text: 'Does the grill/fire pit have a safe perimeter?', consequence: 'Severe burns in children and pets.', checkAction: 'Delimit with a fence or barrier 1m away.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_5', critico: true, text: 'Have knives and sharp utensils been put away?', consequence: 'Severe cuts during event movement.', checkAction: 'Store in a locked drawer or high cabinet.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_6', text: 'Have guests been alerted about uneven floors and steps?', consequence: 'Falls due to unfamiliarity with the environment.', checkAction: 'Signal with tape or warn upon arrival.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_7', text: 'Are pets contained or on a leash?', consequence: 'Bites, scratches, or escaping during confusion.', checkAction: 'Put in a safe place or keep on a leash.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_8', text: 'Are electrical extension cords protected and out of the way?', consequence: 'Tripping and risk of short-circuit with liquids.', checkAction: 'Fix the wires with tape and keep away from wet areas.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_9', critico: true, text: 'If the event is in an apartment: are balconies and windows locked?', consequence: 'House children have no sense of height — balconies are traps.', checkAction: 'Lock windows, close balconies, and move furniture away from edges.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_10', critico: true, text: 'If the event is at a farm: are wells, lakes, and rivers fenced?', consequence: 'Apartment children are unaware of natural water risks.', checkAction: 'Fence water bodies and assign a watcher.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_11', text: 'Do elderly and PWDs know the layout of the place?', consequence: 'Unevenness, stairs, and unfamiliar floors cause falls.', checkAction: 'Give a guided tour upon arrival, pointing out risks.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fes_12', text: 'Does the PWD have barrier-free access to the bathroom and social areas?', consequence: 'Exclusion and risk of accidents when improvising access.', checkAction: 'Check door widths, steps, and bathroom before the event.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'visitacao_segura',
        title: 'Safe Visitation',
        subtitle: 'Hosting or visiting elderly and babies',
        audience: ['adult', 'baby', 'elderly'],
        icon: 'UserAdd',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
        educational: {
            description: 'Hosting visitors requires adapting the house for those who do not know it. Elderly and babies have specific safety needs that may not be mapped in your daily life.',
            keyPoints: [
                'Remove loose rugs for elderly visitors.',
                'Check the width of passages and lighting of steps.',
                'Hide wires and protect outlets for crawling babies and children.',
                'Inform guests of house risks (e.g., step in the living room).'
            ]
        },
        questions: [
            { id: 'vis_1', critico: true, text: 'Have loose rugs and doormats been removed?', consequence: 'Main cause of falls in elderly visitors.', checkAction: 'Remove or fix with anti-slip.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_2', text: 'Are steps and uneven floors marked?', consequence: 'Visitors do not know the layout of the house.', checkAction: 'Use anti-slip tape or warn upon arrival.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_3', critico: true, text: 'Have small objects been removed from children\'s reach?', consequence: 'Choking on parts, coins, and decorations.', checkAction: 'Look around at floor level.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_4', critico: true, text: 'Are low outlets protected?', consequence: 'Electric shock in babies and curious children.', checkAction: 'Install outlet covers.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_5', critico: true, text: 'Are cleaning products and medicines locked?', consequence: 'Accidental poisoning is a frequent emergency.', checkAction: 'Store in a high, locked cabinet.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_6', critico: true, text: 'Does the bathroom have support or grab bars for the elderly?', consequence: 'Bathroom falls can be fatal for the elderly.', checkAction: 'Provide a chair or temporary bar.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_7', critico: true, text: 'Did you ask about the visitor\'s food allergies?', consequence: 'Severe allergic reaction (anaphylaxis).', checkAction: 'Confirm before offering food.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_8', critico: true, text: 'If visitor comes from a house/rural to an apartment: are windows and balconies safe?', consequence: 'Single-story house children do not perceive height risk.', checkAction: 'Lock windows and block access to balconies and elevators.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_9', text: 'If visitor comes from an apartment to a house/rural: checked terrain and fauna?', consequence: 'Irregular floors, venomous animals, and open water are unknown risks.', checkAction: 'Warn about terrain, proper footwear, and forbidden areas.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_10', text: 'Is the PWD visitor guaranteed access to the bathroom and common areas?', consequence: 'Narrow doors, steps, and uneven floors prevent safe access.', checkAction: 'Check accessibility and provide ramps if necessary.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'vis_11', text: 'Has the elderly/PWD been informed about unevenness, stairs, and house floors?', consequence: 'Unknown environment multiplies fall risk.', checkAction: 'Accompany upon arrival and point out attention points.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras_v2',
        title: 'Remodeling & Construction',
        subtitle: 'Active maintenance and building',
        audience: ['adult'],
        icon: 'HashtagUp',
        color: '#FF9800',
        gradient: ['#F57C00', '#FFE0B2'],
        educational: {
            description: '**The Invisible Risk:** Electricity has no smell and gives no warning. A temporary "fix" often becomes permanent, and hidden nails in debris cause severe punctures.',
            keyPoints: [
                '**Immediate Tactical Action:** Isolate the area with physical barriers.',
                'Turn off the MAIN SWITCH before any electrical repair.',
                'For work at heights, never use stools; use locked ladders with an assistant holding the base.',
                'More tactical protocols at preveniremcasa.com.br'
            ]
        },
        questions: [
            { id: 'obr_1', critico: true, text: 'Is the construction area locked or isolated?', consequence: 'Childish curiosity in construction sites is fatal.', checkAction: 'Use hoardings or lock the doors.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_2', critico: true, text: 'Have power tools been unplugged?', consequence: 'Accidental activation by third parties.', checkAction: 'Unplug after use.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_3', critico: true, text: 'Have nails and sharp materials been collected?', consequence: 'Severe punctures and tetanus risk.', checkAction: 'Sweep and collect at the end of each day.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_4', critico: true, text: 'Are chemical products (solvents, paints) locked away?', consequence: 'Intoxication and fire risk.', checkAction: 'Store in a ventilated, locked area.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_5', critico: true, text: 'Is the escape route unobstructed?', consequence: 'Exit blockage in case of fire.', checkAction: 'Keep corridors and doors clear.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'obr_6', text: 'Has debris been removed or is it in a closed dumpster?', consequence: 'Accidents with children and passage obstruction.', checkAction: 'Remove daily or use a dumpster.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'monitor_kids',
        title: 'Monitoring Children',
        subtitle: 'Active supervision and routine',
        audience: ['baby', 'child'],
        icon: 'eye-outline',
        color: '#009688',
        gradient: ['#00695C', '#4DB6AC'],
        educational: {
            description: 'Active supervision is the key to preventing childhood accidents, whether in your daily life or during leisure, visitation, travel, or vacations. Children have no sense of danger and are fast and unpredictable.',
            keyPoints: [
                'Never leave babies alone on changing tables or in bathtubs.',
                'Kitchen is a forbidden area during meal preparation.',
                'Medicines and cleaning products must be kept high and locked.',
                'Safety nets are mandatory on windows and balconies.',
                'Beware of digital distractions: Cell phones, TV, Streamings, Movies, and Series take focus away from supervising those who need care.'
            ]
        },
        questions: [
            { id: 'kid_1', critico: true, text: 'Can you see the child right now?', consequence: 'Seconds of distraction are enough for a severe accident.', checkAction: 'Maintain constant visual contact.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_2', text: 'Is the cell phone away from you?', consequence: 'The cell phone is the main cause of parental distraction.', checkAction: 'Leave the cell phone in another room.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_3', critico: true, text: 'Are windows and balconies locked or netted?', consequence: 'Falls from heights are the leading cause of childhood death.', checkAction: 'Lock windows and install certified nets.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_4', critico: true, text: 'Is the kitchen inaccessible during preparation?', consequence: 'Burns from hot liquids and pots.', checkAction: 'Use a safety gate or keep the child out.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_5', critico: true, text: 'Are medicines and cleaning products locked?', consequence: 'Accidental poisoning is a frequent emergency in under-5s.', checkAction: 'Store in a high cabinet with a lock.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'kid_6', critico: true, text: 'Are there small objects within reach (coins, batteries, parts)?', consequence: 'Choking and battery ingestion are emergencies.', checkAction: 'Do a floor-level sweep.', options: [{ label: 'No', safe: true }, { label: 'Yes', safe: false }] }
        ]
    },
    {
        id: 'reparos_eletricos',
        title: 'Minor Electrical Repairs',
        subtitle: 'Changing bulbs and showerheads',
        audience: ['adult'],
        icon: 'lightning-bolt',
        color: '#FFC107',
        gradient: ['#FFA000', '#FFECB3'],
        educational: {
            description: 'Electricity has no smell, color, and gives no warning when it will hurt. Electric shock can be fatal.',
            keyPoints: [
                'Never make temporary "fixes". They become permanent and dangerous.',
                'Always turn off the MAIN SWITCH before any repair.',
                'Wear rubber-soled shoes and use insulated tools.',
                'Do not touch electrical appliances with a wet body.',
                'Do not underestimate electrical risks of tasks like replacing a bulb, shower element, or repairing outlets and switches.'
            ]
        },
        questions: [
            { id: 'ele_1', critico: true, text: 'Has the main switch (breaker) been turned off?', consequence: 'Risk of fatal shock.', checkAction: 'Go to the panel and turn it off.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_2', critico: true, text: 'Are you wearing rubber-soled shoes?', consequence: 'Bare body conducts electricity.', checkAction: 'Put on rubber sneakers or slippers.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_3', critico: true, text: 'Are your hands and the environment dry?', consequence: 'Water is a conductor — risk of electrocution.', checkAction: 'Dry your hands and the area before starting.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_4', critico: true, text: 'Are you using insulated tools?', consequence: 'Metallic screwdriver conducts current.', checkAction: 'Use tools with insulated handles.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ele_5', critico: true, text: 'Are children away from the repair area?', consequence: 'Accidental contact with exposed wires.', checkAction: 'Keep children in another room.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'servicos_altura',
        title: 'Working at Heights',
        subtitle: 'Ceiling and curtain cleaning',
        audience: ['adult'],
        icon: 'ladder',
        color: '#2196F3',
        gradient: ['#1976D2', '#BBDEFB'],
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
            { id: 'alt_1', critico: true, text: 'Are you using a proper ladder (not a chair)?', consequence: 'Chairs tip over easily.', checkAction: 'Use a certified domestic ladder.', options: [{ label: 'Yes', safe: true }, { label: 'Used chair', safe: false }] },
            { id: 'alt_2', text: 'Is someone holding the base of the ladder?', consequence: 'The ladder can slip on smooth floors.', checkAction: 'Call someone to help.', options: [{ label: 'Yes', safe: true }, { label: 'I am alone', safe: false }] },
            { id: 'alt_3', critico: true, text: 'Is the ladder fully open and locked?', consequence: 'Poorly locked ladder closes during use.', checkAction: 'Check the locks before climbing.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_4', critico: true, text: 'Is the floor where the ladder rests firm and dry?', consequence: 'Ladder slips on wet or uneven floors.', checkAction: 'Dry the floor and use an anti-slip base.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_5', text: 'Are you avoiding leaning too far sideways?', consequence: 'Imbalance causes a fall from the ladder.', checkAction: 'Climb down and reposition the ladder.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'alt_6', critico: true, text: 'If it\'s a roof/slab — considered calling a professional?', consequence: 'Roof falls are often fatal.', checkAction: 'Consider hiring a professional.', options: [{ label: 'Yes', safe: true }, { label: 'I will do it', safe: false }] }
        ]
    },
    {
        id: 'faxina_quimica',
        title: 'Heavy Cleaning',
        subtitle: 'Handling Chemicals',
        audience: ['adult'],
        icon: 'bottle-tonic-skull',
        color: '#9C27B0',
        gradient: ['#7B1FA2', '#E1BEE7'],
        educational: {
            description: 'Improper mixing of cleaning products can generate lethal toxic gases. Products must be in original packaging.',
            keyPoints: [
                'NEVER mix bleach with other products: ammonia, vinegar, all-purpose cleaner, muriatic acid, or any other cleaning product.',
                'The most dangerous and common mix: bleach + detergent. It generates chlorine gas that can cause respiratory arrest indoors. (Source: CIATOX/ANVISA)',
                'Keep the room highly ventilated (open windows).',
                'Wear protective gloves to prevent dermatitis and burns.',
                'Do not store products in soda bottles (PET).'
            ]
        },
        questions: [
            { id: 'qui_1', critico: true, text: 'Are windows and doors open?', consequence: 'Accumulation of toxic vapors indoors.', checkAction: 'Open everything to ventilate.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_2', critico: true, text: 'Are you mixing cleaning products?', consequence: 'Bleach + other products generates lethal chlorine gas.', checkAction: 'Use one product at a time. Rinse before the next.', options: [{ label: 'No', safe: true }, { label: 'Yes', safe: false }] },
            { id: 'qui_3', text: 'Are you wearing protective gloves?', consequence: 'Dermatitis and chemical burns on hands.', checkAction: 'Wear rubber gloves before handling.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_4', critico: true, text: 'Are children and pets out of the room?', consequence: 'Inhalation of vapors and contact with products.', checkAction: 'Keep them in another room during cleaning.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_5', critico: true, text: 'Are products in original packaging (not in PET bottles)?', consequence: 'Accidental ingestion due to confusion with a drink.', checkAction: 'Never transfer to soda bottles.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'qui_6', text: 'Is the wet floor signposted?', consequence: 'Slips and falls during cleaning.', checkAction: 'Use a sign or warn residents.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'reformas_obras',
        title: 'Remodeling & Works',
        subtitle: 'Construction safety',
        audience: ['adult'],
        icon: 'hammer-wrench',
        color: '#795548',
        gradient: ['#5D4037', '#D7CCC8'],
        educational: {
            description: '**The Invisible Risk:** Electricity has no smell and gives no warning. A temporary "fix" often becomes permanent, and hidden nails in debris cause severe punctures.',
            keyPoints: [
                '**Immediate Tactical Action:** Isolate the area with physical barriers.',
                'Turn off the MAIN SWITCH before any electrical repair.',
                'For work at heights, never use stools; use locked ladders with an assistant holding the base.'
            ]
        },
        questions: [
            { id: 'ref_1', text: 'Is the area physically isolated?', consequence: 'Improper access by children.', checkAction: 'Place barriers or lock the door.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_2', critico: true, text: 'Are there exposed nails or rebar?', consequence: 'Severe punctures (tetanus).', checkAction: 'Hammer down nails or cover points.', options: [{ label: 'No', safe: true }, { label: 'Yes', safe: false }] },
            { id: 'ref_3', text: 'Are workers wearing proper PPE?', consequence: 'Eye injuries, cuts, and falls.', checkAction: 'Require helmet, gloves, and glasses.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_4', critico: true, text: 'Are extension cords organized and away from water?', consequence: 'Short-circuit and fire.', checkAction: 'Organize wires and keep away from wet areas.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'ref_5', text: 'Is the area breaker turned off at the end of the day?', consequence: 'Risk of nighttime fire.', checkAction: 'Turn off the breaker when leaving.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'jardinagem',
        title: 'Gardening & Home Gardens',
        subtitle: 'Backyard care',
        audience: ['adult'],
        icon: 'flower',
        color: '#4CAF50',
        gradient: ['#388E3C', '#A5D6A7'],
        educational: {
            description: 'The garden hides dangers such as venomous animals, toxic plants, and sharp tools.',
            keyPoints: [
                'Wear high boots and leather gloves when handling weeds/debris.',
                'Know your garden plants (beware of Dumb Cane).',
                'Unplug lawnmowers before cleaning the blades.',
                'Be careful when lifting heavy pots (posture).',
                'When doing tasks in these areas, avoid hot sunny days. If essential, wear sunscreen, a hat, and a parasol.',
                'At the slightest sign of bad weather, stop. Beware of slippery floors and unevenness if it rains.'
            ]
        },
        questions: [
            { id: 'jar_1', critico: true, text: 'Are you wearing boots and protective gloves?', consequence: 'Spider, scorpion, or snake bites.', checkAction: 'Put on high boots and leather gloves.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_2', critico: true, text: 'Checked for accessible toxic plants?', consequence: 'Intoxication of pets and children (e.g., Dumb Cane).', checkAction: 'Identify and isolate toxic plants.', options: [{ label: 'Yes', safe: true }, { label: 'I do not know', safe: false }] },
            { id: 'jar_3', critico: true, text: 'Has the lawnmower been unplugged before cleaning?', consequence: 'Accidental blade activation.', checkAction: 'Unplug before any handling.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_4', text: 'Are you avoiding strong sun (wearing hat/sunscreen)?', consequence: 'Sunstroke and dehydration.', checkAction: 'Prefer cool times and use protection.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_5', text: 'Checked debris/pots before moving (venomous animals)?', consequence: 'Scorpions and spiders hide in dark, damp places.', checkAction: 'Move carefully using gloves and footwear.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'jar_6', text: 'Are children away from gardening tools?', consequence: 'Pruning shears and hoes cause severe cuts.', checkAction: 'Put away tools after use.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'ferramentas',
        title: 'Using Tools',
        subtitle: 'Manual and Power',
        audience: ['adult'],
        icon: 'screwdriver',
        color: '#607D8B',
        gradient: ['#455A64', '#CFD8DC'],
        educational: {
            description: 'A tool in poor condition, used incorrectly or without protection can become a dangerous weapon. Be it manual or electric.',
            keyPoints: [
                'Do not improvise tools (a knife is not a screwdriver).',
                'Power tools: check cords and do not remove guards.',
                'Wear safety glasses against fragments.',
                'Store in locked boxes, away from children.',
                'Avoid letting unskilled people, youth, children, and people needing assistance use these tools. If they do, there must be supervision.'
            ]
        },
        questions: [
            { id: 'fer_1', text: 'Is the tool correct for the job?', consequence: 'Improvisation causes breakage and injury.', checkAction: 'Find the proper tool.', options: [{ label: 'Yes', safe: true }, { label: 'Improvising', safe: false }] },
            { id: 'fer_2', text: 'Are you wearing protective glasses?', consequence: 'Sparks and fragments cause blindness.', checkAction: 'Put on glasses now.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_3', critico: true, text: 'Are power tool cords and wires intact?', consequence: 'Exposed wires cause shock and short circuit.', checkAction: 'Inspect before turning on.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_4', critico: true, text: 'Are original tool guards in place?', consequence: 'Exposed discs and blades cause amputation.', checkAction: 'Never remove factory guards.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'fer_5', text: 'Are children away and will tools be put away after use?', consequence: 'Childish curiosity with tools is extremely dangerous.', checkAction: 'Store in a locked box after the job.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'toys_games',
        title: 'Toys & Play',
        subtitle: 'Safe fun',
        audience: ['baby', 'child'],
        icon: 'toy-brick',
        color: '#E91E63',
        gradient: ['#C2185B', '#F48FB1'],
        educational: {
            description: 'Inappropriate toys are major causes of accidents. The right choice and supervision are essential.',
            keyPoints: [
                'Check the age rating and safety seal.',
                'Perform the "Toilet Paper Roll Test": if the toy passes through, it\'s a choking hazard.',
                '⚠️ CRITICAL DANGER — Button batteries (lithium): if swallowed, causes severe internal chemical burn in less than 2 hours. Warning sign: excessive salivation, coughing, difficulty swallowing. GO TO THE ER IMMEDIATELY. Do not wait for worse symptoms. (Source: CIATOX/SBP 2022)',
                'Check if the battery compartment is screwed — never just taped.',
                'Beware of cords, ribbons, and wires on toys (strangulation risk).',
                'Baby walkers are contraindicated: they cause severe falls and trauma.',
                'Immediately discard plastic packaging (suffocation risk).',
                'Kites: never fly near power lines.',
                'Bicycles/Skateboards: mandatory use of helmet and protection.',
                'Inflatable pools must be emptied right after use.'
            ]
        },
        questions: [
            { id: 'toy_1', text: 'Do toys have a safety seal and appropriate age?', consequence: 'Small parts can be swallowed.', checkAction: 'Check the packaging.', options: [{ label: 'Yes', safe: true }, { label: 'I do not know', safe: false }] },
            { id: 'toy_2', critico: true, text: 'Are there toys with accessible batteries?', consequence: 'Button battery ingestion is a severe medical emergency.', checkAction: 'Screw the compartment.', options: [{ label: 'No (Locked)', safe: true }, { label: 'Yes', safe: false }] },
            { id: 'toy_3', critico: true, text: 'Have toys with long cords/ribbons been inspected?', consequence: 'Strangulation risk in under-3s.', checkAction: 'Remove cords longer than 15cm.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_4', critico: true, text: 'Have plastic packagings been discarded?', consequence: 'Suffocation with plastic bags.', checkAction: 'Discard immediately after unpacking.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_5', text: 'Is a helmet used on a bicycle/skateboard/scooter?', consequence: 'Head trauma is the leading cause of death in falls.', checkAction: 'Helmet is mandatory — no exceptions.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'toy_6', critico: true, text: 'Will the inflatable pool be emptied after use?', consequence: 'Drowning can occur in a few inches of water.', checkAction: 'Empty and store immediately after use.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'mudanca_residencia',
        title: 'Moving Residence',
        subtitle: 'Safety in the new home',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'HomeHash',
        color: '#FF5722',
        gradient: ['#BF360C', '#FF8A65'],
        educational: {
            description: '**The Invisible Risk:** Stacked boxes create blind spots. Childish curiosity in an unknown environment leads to quick accidents in windows without nets.',
            keyPoints: [
                '**Immediate Tactical Action:** Map the main switch and gas valves immediately.',
                'Fix shelves and dressers to the wall at the exact moment of assembly to prevent crushing.',
                'Visit preveniremcasa.com.br for complete moving checklists.'
            ]
        },
        questions: [
            { id: 'mud_1', critico: true, text: 'Have safety nets been installed on windows?', consequence: 'High fall risk on high floors.', checkAction: 'Do not open windows without protection.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_2', critico: true, text: 'Are tall furniture fixed to the wall?', consequence: 'Shelves tipping over on children.', checkAction: 'Install anti-tip kits.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_3', text: 'Identified the main switch and gas valves?', consequence: 'Panic in case of leak or short circuit.', checkAction: 'Locate and test the valves.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_4', text: 'Are stacked boxes stable and out of passages?', consequence: 'Tipping and escape route obstruction.', checkAction: 'Stack up to shoulder height, away from doors.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_5', text: 'Have outlets and wiring of the new property been inspected?', consequence: 'Short circuit and fire due to old wiring.', checkAction: 'Test the breakers and check for signs of heating.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'mud_6', text: 'Are children and pets supervised during the move?', consequence: 'Unknown environment with open doors, windows, and stairs.', checkAction: 'Assign someone exclusively for supervision.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    },
    {
        id: 'vazamento_gas',
        title: 'Gas Leak (LPG)',
        subtitle: 'Cylinder and gas installations',
        audience: ['adult', 'child', 'baby', 'pet', 'elderly'],
        icon: 'Danger',
        color: '#D32F2F',
        gradient: ['#B71C1C', '#EF9A9A'],
        educational: {
            description: '**The Invisible Risk:** LPG gas is heavier than air and accumulates on the floor. In concentrations of 2% to 9.5% in the air, any spark — including from a light switch — can cause an explosion. Smell saturates quickly, making it hard to perceive the danger.',
            keyPoints: [
                'DO NOT turn on ANY switch, outlet, or electrical appliance — not even the light.',
                'DO NOT use your cell phone inside the property.',
                'Open ALL windows and doors immediately to ventilate.',
                'Close the cylinder valve (turn clockwise).',
                'Leave the property and call the Fire Department: 911.',
                'DO NOT return until firefighters clear the area. (Source: CBMSP/ABNT NBR 13523)'
            ]
        },
        questions: [
            { id: 'gas_1', critico: true, text: 'Have you left the property without turning on switches?', consequence: 'Any spark can cause an explosion.', checkAction: 'Leave immediately without touching anything electrical.', options: [{ label: 'Yes, I left', safe: true }, { label: 'Still inside', safe: false }] },
            { id: 'gas_2', critico: true, text: 'Is the cylinder valve closed?', consequence: 'Gas will keep leaking.', checkAction: 'Close by turning clockwise.', options: [{ label: 'Yes', safe: true }, { label: 'I do not know', safe: false }] },
            { id: 'gas_3', critico: true, text: 'Have all windows and doors been opened?', consequence: 'LPG accumulates on the floor — needs to disperse.', checkAction: 'Open everything to ventilate without turning anything on.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] },
            { id: 'gas_4', critico: true, text: 'Was the cell phone used only outside the property?', consequence: 'Cell phone can generate internal spark.', checkAction: 'Use the cell phone only outside.', options: [{ label: 'Yes', safe: true }, { label: 'Used inside', safe: false }] },
            { id: 'gas_5', critico: true, text: 'Has the Fire Department (911) been called?', consequence: 'Only firefighters can clear the return.', checkAction: 'Call 911 immediately.', options: [{ label: 'Yes', safe: true }, { label: 'No', safe: false }] }
        ]
    }
];
