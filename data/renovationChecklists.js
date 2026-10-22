/**
 * data/renovationChecklists.js
 * Checklists de Segurança para Reformas — Vigilaro Care V6 Neo
 * Expandido com itens assertivos de prevenção por tipo de obra
 */

export const RENOVATION_TYPES = {
    HOME: 'casa',
    BUILDING: 'predio',
    RURAL: 'rural',
};

export const RENOVATION_CHECKLISTS = {
    [RENOVATION_TYPES.HOME]: [
        // Isolamento e Acesso
        { key: 'isolamento', label: 'Áreas em obra isoladas com barreira física (tapume, porta trancada)', label_en: 'Work areas closed off with a physical barrier (hoarding, locked door)', label_es: 'Zonas en obra aisladas con barrera física (valla, puerta cerrada con llave)', label_ptpt: 'Zonas em obra isoladas com barreira física (tapume, porta trancada)' },
        { key: 'sinalizacao_interna', label: 'Sinalização "Área em Obra" visível nas entradas', label_en: '"Work Area" signs visible at the entrances', label_es: 'Señal de "Zona en Obra" visible en las entradas', label_ptpt: 'Sinalização "Zona em Obra" visível nas entradas' },
        { key: 'passagem_segura', label: 'Caminho livre e seguro entre cômodos habitados', label_en: 'A clear, safe path between the rooms still in use', label_es: 'Paso libre y seguro entre las estancias habitadas', label_ptpt: 'Caminho livre e seguro entre as divisões habitadas' },

        // Ferramentas e Materiais
        { key: 'ferramentas', label: 'Ferramentas cortantes guardadas ao final do expediente', label_en: 'Cutting tools put away at the end of the working day', label_es: 'Herramientas cortantes guardadas al final de la jornada', label_ptpt: 'Ferramentas cortantes arrumadas no fim do dia de trabalho' },
        { key: 'quimicos', label: 'Solventes, tintas e produtos químicos em local ventilado e trancado', label_en: 'Solvents, paints and chemicals kept in a ventilated, locked place', label_es: 'Disolventes, pinturas y productos químicos en un lugar ventilado y cerrado con llave' },
        { key: 'pregos_parafusos', label: 'Pregos, parafusos e materiais pontiagudos recolhidos do chão', label_en: 'Nails, screws and sharp materials picked up off the floor', label_es: 'Clavos, tornillos y materiales puntiagudos recogidos del suelo' },

        // Elétrica e Infraestrutura
        { key: 'extensoes', label: 'Extensões elétricas organizadas e longe de água', label_en: 'Extension leads tidy and away from water', label_es: 'Alargadores eléctricos ordenados y lejos del agua' },
        { key: 'disjuntor', label: 'Disjuntor da área em obra desligado ao final do dia', label_en: 'Circuit breaker for the work area switched off at the end of the day', label_es: 'Interruptor del área en obra apagado al final del día', label_ptpt: 'Disjuntor da zona em obra desligado no fim do dia' },
        { key: 'agua_gas', label: 'Registros de água e gás verificados antes de intervenções', label_en: 'Water and gas shut-off valves checked before any work', label_es: 'Llaves de paso de agua y gas revisadas antes de intervenir', label_ptpt: 'Torneiras de segurança da água e do gás verificadas antes de qualquer intervenção' },

        // Pessoas e EPIs
        { key: 'epis', label: 'Trabalhadores com EPIs adequados (capacete, luvas, óculos)', label_en: 'Workers wearing the right PPE (helmet, gloves, goggles)', label_es: 'Trabajadores con EPI adecuados (casco, guantes, gafas)' },
        { key: 'criancas_pets', label: 'Crianças e pets sem acesso à área de obra', label_en: 'Children and pets kept out of the work area', label_es: 'Niños y mascotas sin acceso a la zona de obra', label_ptpt: 'Crianças e animais sem acesso à zona de obra' },
        { key: 'entulho', label: 'Entulho removido diariamente ou em caçamba fechada', label_en: 'Rubble cleared daily or kept in a closed skip', label_es: 'Escombros retirados a diario o en un contenedor cerrado', label_ptpt: 'Entulho retirado diariamente ou num contentor fechado' },

        // Ventilação e Saúde
        { key: 'ventilacao', label: 'Ventilação adequada durante uso de tintas e vernizes', label_en: 'Good ventilation while paints and varnishes are in use', label_es: 'Ventilación adecuada al usar pinturas y barnices' },
        { key: 'poeira', label: 'Proteção contra poeira nos cômodos habitados (vedação de portas)', label_en: 'Dust protection for the rooms still in use (seal the doors)', label_es: 'Protección contra el polvo en las estancias habitadas (sellado de puertas)', label_ptpt: 'Proteção contra o pó nas divisões habitadas (vedação das portas)' },
        { key: 'rota_fuga', label: 'Rota de fuga desobstruída durante toda a obra', label_en: 'Escape route kept clear throughout the work', label_es: 'Ruta de evacuación despejada durante toda la obra', label_ptpt: 'Caminho de fuga desobstruído durante toda a obra' },
    ],

    [RENOVATION_TYPES.BUILDING]: [
        // Áreas Comuns
        { key: 'sinalizacao', label: 'Sinalização de obra nos acessos e áreas comuns do prédio', label_en: 'Work signs at the entrances and in the building\'s common areas', label_es: 'Señalización de obra en los accesos y zonas comunes del edificio', label_ptpt: 'Sinalização de obra nos acessos e nas zonas comuns do prédio' },
        { key: 'circulacao', label: 'Escadas e corredores livres — sem obstruir rotas de fuga', label_en: 'Stairs and corridors kept clear — no blocking escape routes', label_es: 'Escaleras y pasillos libres — sin obstruir las rutas de evacuación', label_ptpt: 'Escadas e corredores livres — sem obstruir os caminhos de fuga' },
        { key: 'elevador', label: 'Proteção interna no elevador de serviço (papelão/compensado)', label_en: 'Protective lining in the service lift (cardboard/plywood)', label_es: 'Protección interna en el ascensor de servicio (cartón/contrachapado)', label_ptpt: 'Proteção interior no elevador de serviço (cartão/contraplacado)' },

        // Ruído e Convivência
        { key: 'horario', label: 'Respeito aos horários de obra do regimento interno', label_en: 'Building rules on working hours respected', label_es: 'Respeto a los horarios de obra del reglamento interno', label_ptpt: 'Respeito pelos horários de obra do regulamento do condomínio' },
        { key: 'comunicacao_vizinhos', label: 'Vizinhos diretos avisados sobre tipo e duração da obra', label_en: 'Next-door neighbours told about the type and length of the work', label_es: 'Vecinos directos avisados del tipo y la duración de la obra', label_ptpt: 'Vizinhos diretos avisados do tipo e da duração da obra' },
        { key: 'limpeza_areas_comuns', label: 'Limpeza de resíduos nas áreas comuns ao final do dia', label_en: 'Debris cleaned from the common areas at the end of the day', label_es: 'Limpieza de residuos en las zonas comunes al final del día', label_ptpt: 'Limpeza dos resíduos nas zonas comuns no fim do dia' },

        // Entulho e Materiais
        { key: 'entulho_cacamba', label: 'Caçamba em local permitido, sinalizada e dentro da validade', label_en: 'Skip in a permitted spot, signposted and within its permit period', label_es: 'Contenedor en un lugar permitido, señalizado y con el permiso vigente', label_ptpt: 'Contentor num local permitido, sinalizado e com a licença em dia' },
        { key: 'material_estocado', label: 'Materiais estocados dentro do apartamento, não no corredor', label_en: 'Materials stored inside the flat, not in the corridor', label_es: 'Materiales almacenados dentro del piso, no en el pasillo', label_ptpt: 'Materiais guardados dentro do apartamento, não no corredor' },
        { key: 'poeira', label: 'Vedação de porta de entrada para evitar poeira no corredor', label_en: 'Front door sealed to keep dust out of the corridor', label_es: 'Sellado de la puerta de entrada para evitar polvo en el pasillo', label_ptpt: 'Vedação da porta de entrada para evitar pó no corredor' },

        // Segurança Estrutural
        { key: 'parede_estrutural', label: 'Confirmação com engenheiro antes de demolir paredes', label_en: 'An engineer\'s confirmation before knocking down walls', label_es: 'Confirmación con un ingeniero antes de derribar paredes', label_ptpt: 'Confirmação com um engenheiro antes de demolir paredes' },
        { key: 'impermeabilizacao', label: 'Teste de impermeabilização antes de fechar pisos molhados', label_en: 'Waterproofing tested before closing up wet-area floors', label_es: 'Prueba de impermeabilización antes de cerrar suelos de zonas húmedas', label_ptpt: 'Teste de impermeabilização antes de fechar pavimentos de zonas húmidas' },
        { key: 'eletrica_gas', label: 'Plantas de elétrica e gás consultadas antes de perfurações', label_en: 'Electrical and gas plans checked before drilling', label_es: 'Planos de electricidad y gas consultados antes de perforar', label_ptpt: 'Plantas da eletricidade e do gás consultadas antes de furar' },

        // Trabalhadores
        { key: 'acesso_controlado', label: 'Trabalhadores identificados e cadastrados na portaria', label_en: 'Workers identified and registered at the front desk', label_es: 'Trabajadores identificados y registrados en la portería', label_ptpt: 'Trabalhadores identificados e registados na portaria' },
        { key: 'epis_predio', label: 'EPIs obrigatórios para trabalho em altura ou demolição', label_en: 'Mandatory PPE for work at height or demolition', label_es: 'EPI obligatorios para trabajos en altura o demolición' },
    ],

    [RENOVATION_TYPES.RURAL]: [
        // Terreno e Fauna
        { key: 'animais', label: 'Animais domésticos e de criação afastados da área de obra', label_en: 'Pets and farm animals kept away from the work area', label_es: 'Animales domésticos y de granja alejados de la zona de obra', label_ptpt: 'Animais domésticos e de criação afastados da zona de obra' },
        { key: 'fauna_silvestre', label: 'Inspeção de ninhos/tocas antes de escavar ou desmatar', label_en: 'Check for nests and burrows before digging or clearing land', label_es: 'Inspección de nidos y madrigueras antes de excavar o desbrozar', label_ptpt: 'Inspeção de ninhos e tocas antes de escavar ou desmatar' },
        { key: 'terreno', label: 'Buracos, valas e escavações sinalizados e cercados', label_en: 'Holes, trenches and excavations signposted and fenced', label_es: 'Agujeros, zanjas y excavaciones señalizados y vallados', label_ptpt: 'Buracos, valas e escavações sinalizados e vedados' },

        // Máquinas e Veículos
        { key: 'maquinas', label: 'Máquinas pesadas travadas e chave retirada quando paradas', label_en: 'Heavy machinery locked with the key removed when not in use', label_es: 'Maquinaria pesada bloqueada y sin llave cuando está parada', label_ptpt: 'Máquinas pesadas travadas e com a chave retirada quando paradas' },
        { key: 'perimetro_maquinas', label: 'Perímetro de segurança ao redor de máquinas em operação', label_en: 'Safety perimeter around machinery in operation', label_es: 'Perímetro de seguridad alrededor de las máquinas en funcionamiento', label_ptpt: 'Perímetro de segurança à volta das máquinas em funcionamento' },
        { key: 'abastecimento', label: 'Combustível armazenado longe de fontes de calor', label_en: 'Fuel stored away from heat sources', label_es: 'Combustible almacenado lejos de fuentes de calor', label_ptpt: 'Combustível guardado longe de fontes de calor' },

        // Infraestrutura
        { key: 'eletrica_rural', label: 'Distância segura de rede elétrica aérea (mín. 3m)', label_en: 'Safe distance from overhead power lines (at least 3 m)', label_es: 'Distancia segura de las líneas eléctricas aéreas (mín. 3 m)', label_ptpt: 'Distância segura das linhas elétricas aéreas (mín. 3 m)' },
        { key: 'eletrica_subterranea', label: 'Localização de fiação subterrânea antes de escavar', label_en: 'Underground cables located before digging', label_es: 'Localización del cableado subterráneo antes de excavar', label_ptpt: 'Localização dos cabos subterrâneos antes de escavar' },
        { key: 'agua', label: 'Poços, cisternas e fossas abertas cercados e sinalizados', label_en: 'Open wells, tanks and pits fenced and signposted', label_es: 'Pozos, cisternas y fosas abiertas vallados y señalizados', label_ptpt: 'Poços, cisternas e fossas abertas vedados e sinalizados' },

        // Incêndio e Clima
        { key: 'fogo', label: 'Prevenção de incêndio em vegetação seca — extintor acessível', label_en: 'Fire prevention in dry vegetation — extinguisher within reach', label_es: 'Prevención de incendios en vegetación seca — extintor accesible' },
        { key: 'raio', label: 'Suspender trabalhos em campo aberto durante tempestades', label_en: 'Stop work in open fields during storms', label_es: 'Suspender los trabajos a campo abierto durante tormentas', label_ptpt: 'Suspender os trabalhos em campo aberto durante trovoadas' },
        { key: 'hidratacao', label: 'Água potável e sombra disponíveis para trabalhadores', label_en: 'Drinking water and shade available for workers', label_es: 'Agua potable y sombra disponibles para los trabajadores', label_ptpt: 'Água potável e sombra disponíveis para os trabalhadores' },

        // Acesso e Segurança
        { key: 'acesso_propriedade', label: 'Porteira/portão trancado para evitar acesso de terceiros', label_en: 'Farm gate locked to keep outsiders out', label_es: 'Portón cerrado con llave para evitar el acceso de terceros', label_ptpt: 'Portão trancado para evitar o acesso de terceiros' },
        { key: 'primeiros_socorros', label: 'Kit de primeiros socorros acessível no local da obra', label_en: 'First aid kit within reach on site', label_es: 'Botiquín de primeros auxilios accesible en la obra', label_ptpt: 'Kit de primeiros socorros acessível no local da obra' },
    ],
};
