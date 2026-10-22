/**
 * data/visitChecklists.js
 * Checklists de Segurança para Visitas e Eventos Sociais — Vigilaro Care V6 Neo
 * Expandido com itens assertivos de prevenção por cenário e grupo de risco
 */

export const VISIT_TYPES = {
  RECEIVING: 'recebendo',
  VISITING: 'visitando',
};

export const RISK_GROUPS = [
  { id: 'idoso', label: 'Idosos', label_en: 'Older people', label_es: 'Personas mayores', icon: 'body' },
  { id: 'pcd', label: 'Pessoas com deficiência ou mobilidade reduzida', label_en: 'People with disabilities or reduced mobility', label_es: 'Personas con discapacidad o movilidad reducida', icon: 'walk' },
  { id: 'bebe', label: 'Bebês (0-2 anos)', label_en: 'Babies (0–2 years)', label_es: 'Bebés (0-2 años)', label_ptpt: 'Bebés (0-2 anos)', icon: 'happy' },
  { id: 'crianca_arteira', label: 'Crianças muito ativas', label_en: 'Very active children', label_es: 'Niños muy activos', icon: 'bicycle' },
  { id: 'enfermo', label: 'Enfermos / Convalescentes', label_en: 'People who are ill or recovering', label_es: 'Personas enfermas o convalecientes', label_ptpt: 'Doentes / convalescentes', icon: 'medkit' },
];

export const VISIT_CHECKLISTS = {

  // =============================================
  // RECEBENDO VISITA — Preparação da casa
  // =============================================
  [VISIT_TYPES.RECEIVING]: {
    base: [
      // Ambiente e Acesso
      { key: 'entry', label: 'Entrada desobstruída e bem iluminada', label_en: 'Entrance clear and well lit', label_es: 'Entrada despejada y bien iluminada' },
      { key: 'floor', label: 'Pisos secos e sem objetos no caminho', label_en: 'Floors dry and clear of objects', label_es: 'Suelos secos y sin objetos en el paso', label_ptpt: 'Pavimentos secos e sem objetos no caminho' },
      { key: 'pets', label: 'Animais em local seguro ou com guia/coleira', label_en: 'Animals in a safe place or on a lead', label_es: 'Animales en un lugar seguro o con correa', label_ptpt: 'Animais num local seguro ou com trela' },

      // Piscina e Áreas Externas
      { key: 'pool', label: 'Piscina cercada, coberta ou com alarme ativo', label_en: 'Pool fenced, covered or with the alarm on', label_es: 'Piscina vallada, cubierta o con la alarma activada', label_ptpt: 'Piscina vedada, coberta ou com o alarme ativo' },
      { key: 'churrasqueira', label: 'Churrasqueira/fogueira com perímetro seguro delimitado', label_en: 'Barbecue or bonfire with a marked safety perimeter', label_es: 'Parrilla o fogata con un perímetro seguro delimitado', label_ptpt: 'Grelhador ou fogueira com perímetro seguro delimitado' },
      { key: 'iluminacao_externa', label: 'Iluminação externa funcionando (quintal, escada, varanda)', label_en: 'Outdoor lighting working (yard, steps, porch)', label_es: 'Iluminación exterior funcionando (patio, escalera, terraza)', label_ptpt: 'Iluminação exterior a funcionar (quintal, escada, varanda)' },

      // Cozinha e Alimentação
      { key: 'alergias', label: 'Perguntou sobre alergias alimentares dos convidados', label_en: 'Asked guests about food allergies', label_es: 'Preguntó a los invitados por alergias alimentarias', label_ptpt: 'Perguntou aos convidados por alergias alimentares' },
      { key: 'alcool', label: 'Bebidas alcoólicas fora do alcance de menores', label_en: 'Alcoholic drinks out of reach of under-18s', label_es: 'Bebidas alcohólicas fuera del alcance de menores' },
      { key: 'faca_cozinha', label: 'Facas e utensílios cortantes guardados durante o evento', label_en: 'Knives and sharp utensils put away during the event', label_es: 'Cuchillos y utensilios cortantes guardados durante el evento', label_ptpt: 'Facas e utensílios cortantes arrumados durante o evento' },

      // Elétrica e Geral
      { key: 'extensoes_festa', label: 'Extensões elétricas protegidas e longe de água/passagem', label_en: 'Extension leads protected and away from water and walkways', label_es: 'Alargadores protegidos y lejos del agua y de las zonas de paso', label_ptpt: 'Extensões elétricas protegidas e longe da água e das zonas de passagem' },
      { key: 'emergencia', label: 'Endereço e telefone de emergência à mão para convidados', label_en: 'Address and emergency number handy for guests', label_es: 'Dirección y teléfono de emergencia a mano para los invitados', label_ptpt: 'Morada e número de emergência à mão para os convidados' },
      { key: 'supervisao_geral', label: 'Pessoa designada para supervisão de crianças e pets', label_en: 'Someone assigned to watch children and pets', label_es: 'Persona designada para vigilar a niños y mascotas', label_ptpt: 'Pessoa designada para vigiar crianças e animais' },
    ],
    risks: {
      idoso: [
        { key: 'rugs', label: 'Retirar tapetes soltos e capachos escorregadios', label_en: 'Remove loose rugs and slippery doormats', label_es: 'Retirar alfombras sueltas y felpudos resbaladizos' },
        { key: 'stairs', label: 'Sinalizar degraus e desníveis com fita antiderrapante', label_en: 'Mark steps and level changes with anti-slip tape', label_es: 'Señalizar escalones y desniveles con cinta antideslizante' },
        { key: 'bathroom', label: 'Disponibilizar cadeira ou barra de apoio no banheiro', label_en: 'Provide a chair or grab bar in the bathroom', label_es: 'Disponer de una silla o barra de apoyo en el baño', label_ptpt: 'Disponibilizar cadeira ou barra de apoio na casa de banho' },
        { key: 'assento', label: 'Cadeira confortável reservada em local acessível', label_en: 'A comfortable chair kept free in an easy-to-reach spot', label_es: 'Silla cómoda reservada en un lugar accesible', label_ptpt: 'Cadeira confortável reservada num local acessível' },
        { key: 'medicamentos_idoso', label: 'Saber se o visitante toma medicação com horário fixo', label_en: 'Know whether the visitor takes medicine at set times', label_es: 'Saber si el visitante toma medicación con horario fijo' },
      ],
      pcd: [
        { key: 'access', label: 'Verificar largura de portas para cadeira de rodas (mín. 80cm)', label_en: 'Check door widths for a wheelchair (at least 80 cm)', label_es: 'Comprobar el ancho de las puertas para silla de ruedas (mín. 80 cm)', label_ptpt: 'Verificar a largura das portas para cadeira de rodas (mín. 80 cm)' },
        { key: 'ramps', label: 'Instalar rampas provisórias em degraus de entrada', label_en: 'Fit temporary ramps over entrance steps', label_es: 'Instalar rampas provisionales en los escalones de entrada', label_ptpt: 'Instalar rampas provisórias nos degraus de entrada' },
        { key: 'obstacles', label: 'Remover móveis, vasos e fios do caminho principal', label_en: 'Move furniture, plant pots and cables out of the main route', label_es: 'Retirar muebles, macetas y cables del camino principal' },
        { key: 'banheiro_pcd', label: 'Banheiro acessível no mesmo nível da área social', label_en: 'Accessible bathroom on the same level as the living area', label_es: 'Baño accesible en el mismo nivel que la zona social', label_ptpt: 'Casa de banho acessível no mesmo piso da zona social' },
        { key: 'estacionamento', label: 'Vaga de estacionamento próxima e acessível reservada', label_en: 'A nearby accessible parking space reserved', label_es: 'Plaza de aparcamiento cercana y accesible reservada', label_ptpt: 'Lugar de estacionamento próximo e acessível reservado' },
      ],
      bebe: [
        { key: 'small_objects', label: 'Retirar objetos pequenos engolíveis do alcance (moedas, peças)', label_en: 'Put small swallowable objects out of reach (coins, small parts)', label_es: 'Retirar del alcance los objetos pequeños que se pueden tragar (monedas, piezas)' },
        { key: 'outlets', label: 'Proteger tomadas baixas com protetores', label_en: 'Cover low sockets with protectors', label_es: 'Proteger los enchufes bajos con protectores' },
        { key: 'cleaning', label: 'Produtos de limpeza trancados em armário alto', label_en: 'Cleaning products locked in a high cupboard', label_es: 'Productos de limpieza bajo llave en un armario alto' },
        { key: 'quinas', label: 'Proteger quinas de mesas baixas (centro, lateral, café)', label_en: 'Pad the corners of low tables (coffee and side tables)', label_es: 'Proteger las esquinas de las mesas bajas (centro, auxiliares)', label_ptpt: 'Proteger as esquinas das mesas baixas (centro, apoio)' },
        { key: 'escadas_bebe', label: 'Portão de segurança instalado em escadas', label_en: 'Safety gate fitted on stairs', label_es: 'Barrera de seguridad instalada en las escaleras', label_ptpt: 'Portão de segurança instalado nas escadas' },
        { key: 'agua_bebe', label: 'Baldes, vasos e recipientes com água esvaziados ou cobertos', label_en: 'Buckets, plant pots and containers with water emptied or covered', label_es: 'Cubos, macetas y recipientes con agua vaciados o tapados' },
      ],
      crianca_arteira: [
        { key: 'windows', label: 'Travar janelas e portas de varanda/sacada', label_en: 'Lock windows and balcony doors', label_es: 'Bloquear ventanas y puertas de terraza o balcón' },
        { key: 'breakables', label: 'Guardar objetos quebráveis e valiosos em local alto', label_en: 'Put breakable and valuable items up high', label_es: 'Guardar los objetos frágiles y de valor en un lugar alto', label_ptpt: 'Arrumar os objetos frágeis e valiosos num local alto' },
        { key: 'doors', label: 'Trancar portas de cômodos com riscos (oficina, lavanderia)', label_en: 'Lock the doors of risky rooms (workshop, laundry)', label_es: 'Cerrar con llave las puertas de las estancias con riesgos (taller, lavadero)', label_ptpt: 'Trancar as portas das divisões com riscos (oficina, lavandaria)' },
        { key: 'sharp', label: 'Facas, tesouras e ferramentas fora do alcance', label_en: 'Knives, scissors and tools out of reach', label_es: 'Cuchillos, tijeras y herramientas fuera del alcance' },
        { key: 'supervisao_piscina', label: 'Adulto designado exclusivamente para vigiar a piscina', label_en: 'One adult whose only job is to watch the pool', label_es: 'Un adulto dedicado exclusivamente a vigilar la piscina' },
        { key: 'limites', label: 'Áreas proibidas comunicadas claramente aos pais', label_en: 'Off-limits areas clearly explained to the parents', label_es: 'Zonas prohibidas comunicadas claramente a los padres', label_ptpt: 'Zonas proibidas comunicadas claramente aos pais' },
      ],
      enfermo: [
        { key: 'noise', label: 'Reduzir ruídos no cômodo de descanso', label_en: 'Keep the rest room quiet', label_es: 'Reducir el ruido en la habitación de descanso', label_ptpt: 'Reduzir o ruído na divisão de descanso' },
        { key: 'ventilation', label: 'Ventilação adequada e temperatura agradável no quarto', label_en: 'Good ventilation and a comfortable temperature in the bedroom', label_es: 'Ventilación adecuada y temperatura agradable en el dormitorio' },
        { key: 'meds', label: 'Espaço organizado para medicamentos com horários visíveis', label_en: 'An organised spot for medicines with the times clearly visible', label_es: 'Espacio ordenado para los medicamentos con los horarios visibles' },
        { key: 'alimentacao_especial', label: 'Refeição compatível com restrições do enfermo', label_en: 'Meals that fit the person\'s dietary restrictions', label_es: 'Comidas compatibles con las restricciones de la persona enferma', label_ptpt: 'Refeições compatíveis com as restrições do doente' },
        { key: 'emergencia_enfermo', label: 'Telefone do médico responsável acessível', label_en: 'The doctor\'s phone number at hand', label_es: 'Teléfono del médico responsable a mano', label_ptpt: 'Telefone do médico responsável à mão' },
      ],
    },
  },

  // =============================================
  // VISITANDO — Cuidados ao ir a outro local
  // =============================================
  [VISIT_TYPES.VISITING]: {
    base: [
      // Documentos e Saúde
      { key: 'contact', label: 'Contato de emergência (ICE) salvo no celular', label_en: 'Emergency contact (ICE) saved on your phone', label_es: 'Contacto de emergencia (ICE) guardado en el celular', label_ptpt: 'Contacto de emergência (ICE) guardado no telemóvel' },
      { key: 'meds_personal', label: 'Medicamentos de uso contínuo na bolsa', label_en: 'Regular medicines in your bag', label_es: 'Medicamentos de uso continuo en el bolso', label_ptpt: 'Medicamentos de uso contínuo na mala' },
      { key: 'allergies', label: 'Alergias informadas ao anfitrião (alimentos, pets, plantas)', label_en: 'Allergies shared with the host (food, pets, plants)', label_es: 'Alergias informadas al anfitrión (alimentos, mascotas, plantas)', label_ptpt: 'Alergias comunicadas ao anfitrião (alimentos, animais, plantas)' },

      // Segurança no Local
      { key: 'endereco', label: 'Endereço completo compartilhado com familiar de confiança', label_en: 'Full address shared with a trusted relative', label_es: 'Dirección completa compartida con un familiar de confianza', label_ptpt: 'Morada completa partilhada com um familiar de confiança' },
      { key: 'saida_emergencia', label: 'Ao chegar, identificar saídas de emergência', label_en: 'On arrival, find the emergency exits', label_es: 'Al llegar, identificar las salidas de emergencia' },
      { key: 'transporte_volta', label: 'Retorno planejado (motorista, app, não dirigir alcoolizado)', label_en: 'Way home planned (driver, ride app — never drink and drive)', label_es: 'Regreso planificado (conductor, aplicación, nunca conducir tras beber)', label_ptpt: 'Regresso planeado (motorista, aplicação, nunca conduzir alcoolizado)' },
    ],
    risks: {
      idoso: [
        { key: 'ask_stairs', label: 'Perguntar sobre escadas e desníveis no local', label_en: 'Ask about stairs and level changes at the venue', label_es: 'Preguntar por escaleras y desniveles en el lugar' },
        { key: 'ask_bathroom', label: 'Verificar acessibilidade do banheiro antecipadamente', label_en: 'Check bathroom accessibility in advance', label_es: 'Comprobar con antelación la accesibilidad del baño', label_ptpt: 'Verificar antecipadamente a acessibilidade da casa de banho' },
        { key: 'calcado_seguro', label: 'Usar calçado antiderrapante e confortável', label_en: 'Wear comfortable, non-slip shoes', label_es: 'Usar calzado antideslizante y cómodo' },
        { key: 'fadiga', label: 'Planejar pausas para descanso durante a visita', label_en: 'Plan rest breaks during the visit', label_es: 'Planificar pausas para descansar durante la visita', label_ptpt: 'Planear pausas para descansar durante a visita' },
      ],
      pcd: [
        { key: 'ask_access', label: 'Confirmar acessibilidade completa (elevador, rampas, banheiro)', label_en: 'Confirm full accessibility (lift, ramps, bathroom)', label_es: 'Confirmar la accesibilidad completa (ascensor, rampas, baño)', label_ptpt: 'Confirmar a acessibilidade completa (elevador, rampas, casa de banho)' },
        { key: 'transport', label: 'Transporte adaptado confirmado (ida e volta)', label_en: 'Accessible transport confirmed (both ways)', label_es: 'Transporte adaptado confirmado (ida y vuelta)' },
        { key: 'autonomia', label: 'Kit de autonomia pessoal na bolsa (bateria extra, acessórios)', label_en: 'Personal independence kit in your bag (spare battery, accessories)', label_es: 'Kit de autonomía personal en el bolso (batería extra, accesorios)', label_ptpt: 'Kit de autonomia pessoal na mala (bateria extra, acessórios)' },
      ],
      bebe: [
        { key: 'safe_sleep', label: 'Levar berço portátil ou verificar local seguro para sono', label_en: 'Bring a travel cot or check for a safe place to sleep', label_es: 'Llevar una cuna de viaje o comprobar un lugar seguro para dormir', label_ptpt: 'Levar uma cama de viagem ou verificar um local seguro para dormir' },
        { key: 'baby_proofing', label: 'Inspecionar o ambiente ao chegar (tomadas, escadas, objetos)', label_en: 'Check the place on arrival (sockets, stairs, objects)', label_es: 'Revisar el lugar al llegar (enchufes, escaleras, objetos)', label_ptpt: 'Inspecionar o espaço ao chegar (tomadas, escadas, objetos)' },
        { key: 'bolsa_bebe', label: 'Bolsa completa: fraldas, troca, alimentação, medicação', label_en: 'Full bag: nappies, change of clothes, food, medicine', label_es: 'Bolso completo: pañales, muda, comida, medicación', label_ptpt: 'Mala completa: fraldas, muda, alimentação, medicação' },
        { key: 'agua_piscina_bebe', label: 'Verificar imediatamente piscinas, lagos ou espelhos d\'água', label_en: 'Check straight away for pools, ponds or water features', label_es: 'Comprobar de inmediato si hay piscinas, lagos o estanques', label_ptpt: 'Verificar de imediato se há piscinas, lagos ou espelhos de água' },
      ],
      crianca_arteira: [
        { key: 'supervision', label: 'Definir responsável pela supervisão constante da criança', label_en: 'Decide who will watch the child at all times', label_es: 'Definir quién vigilará al niño en todo momento', label_ptpt: 'Definir quem vigia a criança em permanência' },
        { key: 'boundaries', label: 'Estabelecer limites do espaço permitido logo ao chegar', label_en: 'Set the boundaries of where they can go as soon as you arrive', label_es: 'Fijar los límites del espacio permitido nada más llegar', label_ptpt: 'Estabelecer os limites do espaço permitido logo à chegada' },
        { key: 'pool_check', label: 'Verificar acesso à piscina, rua e áreas perigosas', label_en: 'Check access to the pool, the street and other dangerous areas', label_es: 'Comprobar el acceso a la piscina, la calle y las zonas peligrosas' },
        { key: 'entretenimento', label: 'Levar brinquedos/tablet para manter a criança entretida', label_en: 'Bring toys or a tablet to keep the child busy', label_es: 'Llevar juguetes o una tableta para entretener al niño', label_ptpt: 'Levar brinquedos ou um tablet para manter a criança entretida' },
      ],
      enfermo: [
        { key: 'rest_area', label: 'Confirmar local disponível para repouso se necessário', label_en: 'Confirm there is somewhere to rest if needed', label_es: 'Confirmar que hay un lugar para descansar si hace falta', label_ptpt: 'Confirmar que há um local para repousar, se necessário' },
        { key: 'schedule', label: 'Planejar visita com duração adequada à condição de saúde', label_en: 'Plan a visit length that suits the person\'s health', label_es: 'Planificar una visita de duración adecuada al estado de salud', label_ptpt: 'Planear uma visita com duração adequada ao estado de saúde' },
        { key: 'kit_emergencia', label: 'Kit emergencial pessoal (medicação SOS, documentos médicos)', label_en: 'Personal emergency kit (rescue medicine, medical documents)', label_es: 'Kit de emergencia personal (medicación de rescate, documentos médicos)' },
      ],
    },
  },
};
