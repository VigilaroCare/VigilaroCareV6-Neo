/**
 * safety_caregivers.js — "Quem cuida" (22/10/2026)
 *
 * Para quem cuida sozinho de criança atípica, idoso ou pessoa com deficiência.
 * Fica no campo do app — prevenção de acidentes: o cansaço de quem vigia é
 * condição insegura, e a proteção mais confiável é a que não depende de
 * atenção constante. Não é conteúdo de apoio emocional nem opina sobre a
 * pessoa (decisão do Agnaldo, mesma data).
 *
 * Lido pela GenericCategoryScreen (DATA_MAP 'quem_cuida') com t_field.
 */
export const SAFETY_CAREGIVERS = {
    id: 'quem_cuida',
    title: 'Quem Cuida',
    title_en: 'Caregivers',
    title_es: 'Quien Cuida',
    subtitle: 'Prevenção para quem cuida de alguém',
    subtitle_en: 'Prevention for those who look after someone',
    subtitle_es: 'Prevención para quien cuida de alguien',
    subtitle_ptpt: 'Prevenção para quem cuida de alguém',
    color: '#0EA5E9',
    icon: 'Profile2User',
    sections: [
        {
            title: 'Proteção que não depende de atenção',
            title_en: 'Protection that does not rely on attention',
            title_es: 'Protección que no depende de la atención',
            title_ptpt: 'Proteção que não depende da atenção',
            icon: 'ShieldTick',
            content: 'Vigiar o tempo todo é impossível, e o cansaço é condição insegura: é nele que acontece a distração de um minuto. A proteção mais confiável é a que funciona sozinha — trava alta ou alarme na porta da rua, cerca com portão que fecha sozinho na piscina, produtos de limpeza e remédios trancados, trava nos botões do fogão. Ela continua protegendo quando você cochila ou precisa atender o telefone.',
            content_en: 'Watching all the time is impossible, and tiredness is an unsafe condition: that is when the one-minute lapse happens. The most reliable protection is the kind that works on its own — a high lock or alarm on the front door, a pool fence with a self-closing gate, cleaning products and medicines locked away, stove knob locks. It keeps protecting when you doze off or have to take a call.',
            content_es: 'Vigilar todo el tiempo es imposible, y el cansancio es una condición insegura: es entonces cuando ocurre la distracción de un minuto. La protección más confiable es la que funciona sola: cerradura alta o alarma en la puerta de la calle, valla con puerta de cierre automático en la piscina, productos de limpieza y medicamentos bajo llave, traba en los mandos de la cocina. Sigue protegiendo cuando usted se adormece o tiene que atender el teléfono.',
            content_ptpt: 'Vigiar a toda a hora é impossível, e o cansaço é uma condição insegura: é nele que acontece a distração de um minuto. A proteção mais fiável é a que funciona sozinha — fecho alto ou alarme na porta da rua, vedação com portão que fecha sozinho na piscina, produtos de limpeza e medicamentos fechados à chave, trava nos botões do fogão. Continua a proteger quando adormece ou tem de atender o telefone.',
        },
        {
            title: 'Quando você precisa se ausentar',
            title_en: 'When you have to be away',
            title_es: 'Cuando tiene que ausentarse',
            title_ptpt: 'Quando tem de se ausentar',
            icon: 'DocumentText',
            content: 'Combine antes quem substitui você numa ida ao médico, numa internação ou numa viagem. Deixe por escrito o que essa pessoa precisa saber: rotina, remédios e horários, como a pessoa se comunica, o que a acalma e o que a desorganiza, e os contatos de emergência. A Ficha Médica de Emergência do app reúne boa parte disso e pode ser enviada a quem vai substituir você.',
            content_en: 'Arrange in advance who will stand in for you during a doctor\'s visit, a hospital stay or a trip. Write down what that person needs to know: the routine, medicines and times, how the person communicates, what calms them and what upsets them, and the emergency contacts. The app\'s Emergency Medical Record brings much of this together and can be sent to whoever stands in for you.',
            content_es: 'Acuerde con antelación quién le sustituye en una consulta médica, un ingreso hospitalario o un viaje. Deje por escrito lo que esa persona necesita saber: la rutina, los medicamentos y horarios, cómo se comunica la persona, qué la calma y qué la desorganiza, y los contactos de emergencia. La Ficha Médica de Emergencia de la app reúne buena parte de esto y puede enviarse a quien le sustituya.',
            content_ptpt: 'Combine antes quem o substitui numa ida ao médico, num internamento ou numa viagem. Deixe por escrito o que essa pessoa precisa de saber: a rotina, os medicamentos e horários, como a pessoa comunica, o que a acalma e o que a desorganiza, e os contactos de emergência. A Ficha Médica de Emergência da app reúne boa parte disto e pode ser enviada a quem o vai substituir.',
        },
        {
            title: 'Rede de apoio',
            title_en: 'Support network',
            title_es: 'Red de apoyo',
            title_ptpt: 'Rede de apoio',
            icon: 'Call',
            content: 'Cadastre nos contatos de emergência do app quem pode ajudar de verdade — família, vizinhos, amigos — e combine com eles o que fazer ao receber um alerta. Um vizinho que conhece a rotina da casa costuma chegar antes de qualquer socorro.',
            content_en: 'Add to the app\'s emergency contacts the people who can really help — family, neighbours, friends — and agree with them what to do when they receive an alert. A neighbour who knows the household routine often arrives before any emergency service.',
            content_es: 'Registre en los contactos de emergencia de la app a quienes pueden ayudar de verdad —familia, vecinos, amigos— y acuerde con ellos qué hacer al recibir una alerta. Un vecino que conoce la rutina de la casa suele llegar antes que cualquier servicio de emergencia.',
            content_ptpt: 'Registe nos contactos de emergência da app quem pode ajudar de verdade — família, vizinhos, amigos — e combine com eles o que fazer ao receber um alerta. Um vizinho que conhece a rotina da casa costuma chegar antes de qualquer socorro.',
        },
        {
            title: 'Quem cuida também precisa de cuidado',
            title_en: 'Caregivers need care too',
            title_es: 'Quien cuida también necesita cuidado',
            title_ptpt: 'Quem cuida também precisa de cuidado',
            icon: 'Profile2User',
            content: 'Quem cuida também adoece, se machuca e precisa descansar. Dividir o cuidado com outra pessoa faz parte do plano de segurança da casa: com mais alguém por perto, a casa fica mais segura para todos.',
            content_en: 'Caregivers also fall ill, get hurt and need rest. Sharing the care with someone else is part of the household safety plan: with another person around, the home is safer for everyone.',
            content_es: 'Quien cuida también se enferma, se lastima y necesita descansar. Compartir el cuidado con otra persona forma parte del plan de seguridad de la casa: con alguien más cerca, la casa es más segura para todos.',
            content_ptpt: 'Quem cuida também adoece, se magoa e precisa de descansar. Partilhar o cuidado com outra pessoa faz parte do plano de segurança da casa: com mais alguém por perto, a casa fica mais segura para todos.',
        },
    ],
};
