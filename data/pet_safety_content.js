/**
 * pet_safety_content.js
 * Conteúdo de Segurança para Pets
 * Vigilaro Care V5
 */

export const PET_SAFETY_CONTENT = {
    'filhotes': {
        title: 'Filhotes (Cães e Gatos)',
        description: 'Curiosidade excessiva e fase de dentição.',
        risks: [
            {
                id: 'pf-1',
                titulo: 'Ingestão de Objetos', titulo_en: 'Object Ingestion', titulo_es: 'Ingestión de Objetos',
                descricao: 'Filhotes engolem meias, brinquedos e pedras.', descricao_en: 'Puppies swallow socks, toys, and stones.', descricao_es: 'Los cachorros tragan calcetines, juguetes y piedras.',
                prevencao: 'Chão sempre limpo. Brinquedos indestrutíveis.', prevencao_en: 'Always keep the floor clean. Indestructible toys.', prevencao_es: 'Suelo siempre limpio. Juguetes indestructibles.',
                icone: 'WarningCircle',
                cor: '#EF5350'
            },
            {
                id: 'pf-2',
                titulo: 'Fios Elétricos', titulo_en: 'Electrical Wires', titulo_es: 'Cables Eléctricos',
                descricao: 'Risco de choque ao roer fios.', descricao_en: 'Risk of electric shock when chewing wires.', descricao_es: 'Riesgo de choque eléctrico al morder cables.',
                prevencao: 'Protetores de fios e sprays amargos.', prevencao_en: 'Wire protectors and bitter sprays.', prevencao_es: 'Protectores de cables y aerosoles amargos.',
                icone: 'Lightning',
                cor: '#FFCA28'
            },
            {
                id: 'pf-3',
                titulo: 'Plantas Tóxicas', titulo_en: 'Toxic Plants', titulo_es: 'Plantas Tóxicas',
                descricao: 'Muitas plantas comuns são mortais.', descricao_en: 'Many common plants are deadly.', descricao_es: 'Muchas plantas comunes son mortales.',
                prevencao: 'Verificar lista de plantas tóxicas no app.', prevencao_en: 'Check the toxic plants list in the app.', prevencao_es: 'Verificar lista de plantas tóxicas en la aplicación.',
                icone: 'Leaf',
                cor: '#66BB6A'
            }
        ],
        checklist: [
            { id: 'cpf-1', text: 'Fios elétricos protegidos?', text_en: 'Electrical wires protected?', text_es: '¿Cables eléctricos protegidos?' },
            { id: 'cpf-2', text: 'Plantas tóxicas removidas?', text_en: 'Toxic plants removed?', text_es: '¿Plantas tóxicas eliminadas?' },
            { id: 'cpf-3', text: 'Lixo trancado e inacessível?', text_en: 'Trash locked and inaccessible?', text_es: '¿Basura bloqueada e inaccesible?' },
            { id: 'cpf-4', text: 'Produtos de limpeza no alto?', text_en: 'Cleaning products stored high?', text_es: '¿Productos de limpieza en alto?' }
        ]
    },
    'adultos': {
        title: 'Pets Adultos',
        description: 'Manutenção da saúde e prevenção de fugas.',
        risks: [
            {
                id: 'pa-1',
                titulo: 'Fugas', titulo_en: 'Escapes', titulo_es: 'Fugas',
                descricao: 'Portões abertos e muros baixos.', descricao_en: 'Open gates and low walls.', descricao_es: 'Portones abiertos y muros bajos.',
                prevencao: 'Telas em janelas, portões automáticos seguros.', prevencao_en: 'Window screens, secure automatic gates.', prevencao_es: 'Mallas en ventanas, portones automáticos seguros.',
                icone: 'PersonSimpleWalk',
                cor: '#AB47BC'
            },
            {
                id: 'pa-2',
                titulo: 'Passeio Seguro', titulo_en: 'Safe Walks', titulo_es: 'Paseo Seguro',
                descricao: 'Atropelamentos e brigas.', descricao_en: 'Hit-and-runs and fights.', descricao_es: 'Atropellos y peleas.',
                prevencao: 'Sempre na guia. Coleira com identificação.', prevencao_en: 'Always on a leash. Collar with ID.', prevencao_es: 'Siempre con correa. Collar con identificación.',
                icone: 'PawPrint',
                cor: '#29B6F6'
            },
            {
                id: 'pa-3',
                titulo: 'Calor e Hipertermia', titulo_en: 'Heat and Hyperthermia', titulo_es: 'Calor e Hipertermia',
                descricao: 'Passeios em horários quentes.', descricao_en: 'Walks during hot hours.', descricao_es: 'Paseos en horas de calor.',
                prevencao: 'Passear antes das 10h ou após as 17h.', prevencao_en: 'Walk before 10 AM or after 5 PM.', prevencao_es: 'Pasear antes de las 10 a.m. o después de las 5 p.m.',
                icone: 'Sun',
                cor: '#FF7043'
            },
            {
                id: 'pa-4',
                titulo: 'Afogamento em Piscinas', titulo_en: 'Drowning in Pools', titulo_es: 'Ahogamiento en Piscinas',
                descricao: 'Pets podem cair e não conseguir sair sem rampa.', descricao_en: 'Pets can fall in and cannot get out without a ramp.', descricao_es: 'Las mascotas pueden caer y no poder salir sin una rampa.',
                prevencao: 'Instale rampas de saída e vedações de perímetro.', prevencao_en: 'Install exit ramps and perimeter fencing.', prevencao_es: 'Instale rampas de salida y vallas de perímetro.',
                icone: 'Drop',
                cor: '#1E88E5'
            }
        ],
        checklist: [
            { id: 'cpa-1', text: 'Vacinas em dia?', text_en: 'Vaccines up to date?', text_es: '¿Vacunas al día?' },
            { id: 'cpa-2', text: 'Plaquinha de identificação na coleira?', text_en: 'ID tag on collar?', text_es: '¿Placa de identificación en el collar?' },
            { id: 'cpa-3', text: 'Telas de proteção em janelas?', text_en: 'Protective window screens?', text_es: '¿Mallas de protección en ventanas?' },
            { id: 'cpa-4', text: 'Portão seguro contra fugas?', text_en: 'Gate secure against escapes?', text_es: '¿Portón seguro contra fugas?' },
            { id: 'cpa-5', text: 'Piscina possui rampa para saída autônoma?', text_en: 'Pool has an autonomous exit ramp?', text_es: '¿Piscina con rampa para salida autónoma?' },
            { id: 'cpa-6', text: 'Lixeiras/químicos em locais seguros?', text_en: 'Trash bins/chemicals in safe places?', text_es: '¿Basureros/químicos en lugares seguros?' }
        ]
    },
    'aves': {
        title: 'Aves (Calopsitas, Papagaios)',
        description: 'Voo livre, sistema respiratório sensível e curiosidade com objetos brilhantes.',
        risks: [
            {
                id: 'pav-1',
                titulo: 'Intoxicação por Teflon', titulo_en: 'Teflon Intoxication', titulo_es: 'Intoxicación por Teflón',
                descricao: 'Fumaça de panelas antiaderentes superaquecidas é letal para aves.', descricao_en: 'Smoke from overheated non-stick pans is lethal to birds.', descricao_es: 'El humo de sartenes antiadherentes sobrecalentados es letal para aves.',
                prevencao: 'Nunca deixe aves na cozinha. Use panelas de aço inox ou cerâmica.', prevencao_en: 'Never leave birds in the kitchen. Use stainless steel or ceramic pans.', prevencao_es: 'Nunca deje aves en la cocina. Use sartenes de acero inoxidable o cerámica.',
                icone: 'Flame',
                cor: '#B71C1C'
            },
            {
                id: 'pav-2',
                titulo: 'Ventiladores de Teto', titulo_en: 'Ceiling Fans', titulo_es: 'Ventiladores de Techo',
                descricao: 'Causa comum de traumas fatais durante voo livre.', descricao_en: 'Common cause of fatal trauma during free flight.', descricao_es: 'Causa común de traumas fatales durante vuelo libre.',
                prevencao: 'Sempre desligar ventiladores antes de soltar a ave.', prevencao_en: 'Always turn off fans before releasing the bird.', prevencao_es: 'Siempre apagar ventiladores antes de soltar el ave.',
                icone: 'ArrowsClockwise',
                cor: '#F57C00'
            },
            {
                id: 'pav-3',
                titulo: 'Janelas e Espelhos', titulo_en: 'Windows and Mirrors', titulo_es: 'Ventanas y Espejos',
                descricao: 'Colisões graves por não perceberem o vidro.', descricao_en: 'Severe collisions due to not perceiving the glass.', descricao_es: 'Colisiones graves al no percibir el vidrio.',
                prevencao: 'Use telas, adesivos ou cortinas para sinalizar barreiras.', prevencao_en: 'Use screens, stickers, or curtains to signal barriers.', prevencao_es: 'Use mallas, calcomanías o cortinas para señalar barreras.',
                icone: 'Square',
                cor: '#29B6F6'
            }
        ],
        checklist: [
            { id: 'cav-1', text: 'Panelas de teflon longe das aves?', text_en: 'Teflon pans away from birds?', text_es: '¿Sartenes de teflón lejos de las aves?' },
            { id: 'cav-2', text: 'Ventilador desligado antes do voo livre?', text_en: 'Fan off before free flight?', text_es: '¿Ventilador apagado antes del vuelo libre?' },
            { id: 'cav-3', text: 'Janelas com tela ou sinalizadas?', text_en: 'Windows with screens or signaled?', text_es: '¿Ventanas con malla o señalizadas?' },
            { id: 'cav-4', text: 'Gaiola em local sem corrente de ar?', text_en: 'Cage in a draft-free place?', text_es: '¿Jaula en un lugar sin corriente de aire?' }
        ]
    },
    'peixes': {
        title: 'Peixes e Aquários',
        description: 'Equilíbrio da água e segurança elétrica.',
        risks: [
            {
                id: 'ppx-1',
                titulo: 'Fiação e Água', titulo_en: 'Wiring and Water', titulo_es: 'Cableado y Agua',
                descricao: 'Risco de curto-circuito em aquecedores e bombas.', descricao_en: 'Risk of short circuit in heaters and pumps.', descricao_es: 'Riesgo de cortocircuito en calentadores y bombas.',
                prevencao: 'Use filtros de linha e verifique isolamento de cabos.', prevencao_en: 'Use power strips and check cable insulation.', prevencao_es: 'Use regletas y verifique aislamiento de cables.',
                icone: 'Lightning',
                cor: '#FFCA28'
            },
            {
                id: 'ppx-2',
                titulo: 'Queda de Energia', titulo_en: 'Power Outage', titulo_es: 'Corte de Energía',
                descricao: 'Interrompe a oxigenação e filtragem (letal rápido).', descricao_en: 'Interrupts oxygenation and filtration (rapidly lethal).', descricao_es: 'Interrumpe oxigenación y filtración (letal rápido).',
                prevencao: 'Ter bombas de ar a pilha para emergências.', prevencao_en: 'Have battery-operated air pumps for emergencies.', prevencao_es: 'Tener bombas de aire a pilas para emergencias.',
                icone: 'BatteryWarning',
                cor: '#EF5350'
            }
        ],
        checklist: [
            { id: 'cpx-1', text: 'Fiação fora de contato com a água?', text_en: 'Wiring out of contact with water?', text_es: '¿Cableado fuera de contacto con agua?' },
            { id: 'cpx-2', text: 'Possui bomba de ar de reserva (pilha)?', text_en: 'Have a backup air pump (battery)?', text_es: '¿Tiene bomba de aire de respaldo (pila)?' },
            { id: 'cpx-3', text: 'Aquário longe de luz solar direta?', text_en: 'Aquarium away from direct sunlight?', text_es: '¿Acuario lejos de la luz solar directa?' }
        ]
    },
    'pequenos_mamiferos': {
        title: 'Pequenos Mamíferos (Hamsters, Coelhos)',
        description: 'Instinto de roer e vulnerabilidade a predadores domésticos.',
        risks: [
            {
                id: 'ppm-1',
                titulo: 'Roedura de Fios', titulo_en: 'Chewing Wires', titulo_es: 'Roer Cables',
                descricao: 'Coelhos roem cabos elétricos com facilidade.', descricao_en: 'Rabbits easily chew electrical cables.', descricao_es: 'Los conejos roen cables eléctricos fácilmente.',
                prevencao: 'Proteger fios com conduítes resistentes.', prevencao_en: 'Protect wires with resistant conduits.', prevencao_es: 'Proteger cables con conductos resistentes.',
                icone: 'Lightning',
                cor: '#FFCA28'
            },
            {
                id: 'ppm-2',
                titulo: 'Frestas e Portas', titulo_en: 'Gaps and Doors', titulo_es: 'Rendijas y Puertas',
                descricao: 'Podem ser esmagados por portas ou fugir por frestas.', descricao_en: 'Can be crushed by doors or escape through gaps.', descricao_es: 'Pueden ser aplastados por puertas o escapar por rendijas.',
                prevencao: 'Vedar vãos de portas e inspecionar antes de fechar.', prevencao_en: 'Seal door gaps and inspect before closing.', prevencao_es: 'Sellar huecos de puertas e inspeccionar antes de cerrar.',
                icone: 'Door',
                cor: '#F57C00'
            }
        ],
        checklist: [
            { id: 'cpm-1', text: 'Fios elétricos protegidos/inacessíveis?', text_en: 'Electrical wires protected/inaccessible?', text_es: '¿Cables eléctricos protegidos/inaccesibles?' },
            { id: 'cpm-2', text: 'Frestas de portas bloqueadas?', text_en: 'Door gaps blocked?', text_es: '¿Rendijas de puertas bloqueadas?' },
            { id: 'cpm-3', text: 'Gaiola protegida de cães e gatos?', text_en: 'Cage protected from dogs and cats?', text_es: '¿Jaula protegida de perros y gatos?' }
        ]
    }
};
