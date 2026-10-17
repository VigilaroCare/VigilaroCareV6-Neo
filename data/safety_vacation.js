/**
 * safety_vacation.js — Férias e Viagem
 *
 * Renderizado por screens/GenericCategoryScreen.js, que lê via `t_field`:
 * o `title` do topo e, por seção, `title` e `content`. O `subtitle` existe no
 * objeto mas NÃO é exibido por nenhuma tela (ver nota em docs/PENDENCIAS.md).
 *
 * TRADUÇÃO (08/10/2026): este ficheiro não tinha nenhuma tradução. Quem usava
 * o app em inglês ou espanhol lia esta página inteira em português. Entram
 * `_en` e `_es`; `_ptpt` só onde o termo brasileiro não se entende em Portugal
 * ("cadeirinha" é cadeira auto, "pousada" é alojamento local, "van" é furgão).
 * Onde o português do Brasil se lê bem em Portugal, não há `_ptpt`: duplicar
 * texto idêntico só cria duas cópias para manter desalinhadas.
 */
export const SAFETY_VACATION = {
    id: 'ferias_seguras',
    title: 'Férias e Viagem',
    title_en: 'Holidays and Travel',
    title_es: 'Vacaciones y Viajes',
    title_ptpt: 'Férias e Viagem',
    subtitle: 'Lazer sem acidentes',
    subtitle_en: 'Leisure without accidents',
    subtitle_es: 'Ocio sin accidentes',
    color: '#03A9F4', // Light Blue
    icon: 'airplane',
    sections: [
        {
            title: 'Na Estrada',
            title_en: 'On the Road',
            title_es: 'En la Carretera',
            content: 'Use cadeirinha adequada ao peso/idade. Faça paradas a cada 2h. Nunca deixe objetos soltos no carro: viram projéteis em freadas e podem agravar a situação em caso de acidentes, além de ser passível de infração de trânsito. Utilize as travas manuais das portas traseiras (trava de criança).',
            content_en: 'Use a child seat suited to the child\'s weight and age. Stop every 2 hours. Never leave loose objects in the car: they become projectiles under hard braking and can make an accident worse, besides being a traffic offence. Engage the manual child locks on the rear doors.',
            content_es: 'Use una silla infantil adecuada al peso y la edad. Pare cada 2 horas. Nunca deje objetos sueltos en el coche: se convierten en proyectiles al frenar y pueden agravar un accidente, además de ser una infracción de tráfico. Active los seguros manuales de las puertas traseras (bloqueo infantil).',
            content_ptpt: 'Use cadeira auto adequada ao peso e à idade. Faça paragens a cada 2 horas. Nunca deixe objetos soltos no carro: tornam-se projéteis numa travagem e podem agravar a situação num acidente, além de ser contraordenação. Utilize os trancamentos manuais das portas traseiras (bloqueio para crianças).',
        },
        {
            title: 'Praia e Piscina',
            title_en: 'Beach and Pool',
            title_es: 'Playa y Piscina',
            content: 'Acesse o Guia de Afogamentos na seção de Riscos Físicos para conhecer as regras de supervisão e o uso correto de coletes. Cuidado com exposição excessiva ao sol (filtro a cada 2h).',
            content_en: 'Open the Drowning Guide under Physical Risks for the supervision rules and the correct use of life jackets. Watch out for too much sun (reapply sunscreen every 2 hours).',
            content_es: 'Consulte la Guía de Ahogamientos en la sección de Riesgos Físicos para conocer las reglas de supervisión y el uso correcto de chalecos. Cuidado con la exposición excesiva al sol (protector cada 2 horas).',
        },
        {
            title: 'Hotel e Pousada',
            title_en: 'Hotels and Guesthouses',
            title_es: 'Hotel y Hostal',
            title_ptpt: 'Hotel e Alojamento Local',
            content: 'Verifique sacadas e janelas assim que chegar. Afaste móveis que sirvam de "escada" para janelas. Cuidado com tomadas desconhecidas e acesso à área da piscina.',
            content_en: 'Check balconies and windows as soon as you arrive. Move away any furniture that could work as a "step" up to a window. Be careful with unfamiliar sockets and with access to the pool area.',
            content_es: 'Revise balcones y ventanas al llegar. Aparte los muebles que puedan servir de "escalera" hacia una ventana. Cuidado con enchufes desconocidos y con el acceso a la zona de la piscina.',
            content_ptpt: 'Verifique varandas e janelas assim que chegar. Afaste móveis que sirvam de "escada" para as janelas. Cuidado com tomadas desconhecidas e com o acesso à zona da piscina.',
        },
        {
            title: 'Criança Perdida',
            title_en: 'If a Child Gets Lost',
            title_es: 'Niño Perdido',
            content: 'Em locais lotados, use pulseira de identificação com nome e telefone. Tire uma foto da criança com a roupa do dia antes de sair. Marque um ponto de encontro. Se a criança já interage oriente-a para caso ela se perca.',
            content_en: 'In crowded places, use an ID wristband with a name and phone number. Photograph the child in the day\'s clothes before leaving. Agree on a meeting point. If the child is old enough to talk, tell them in advance what to do if they get lost.',
            content_es: 'En lugares concurridos, use una pulsera de identificación con nombre y teléfono. Fotografíe al niño con la ropa del día antes de salir. Acuerden un punto de encuentro. Si el niño ya se comunica, explíquele de antemano qué hacer si se pierde.',
        },
        {
            title: 'Kit Viagem',
            title_en: 'Travel Kit',
            title_es: 'Kit de Viaje',
            content: 'Leve termômetro, antitérmico, curativos, repelente e antialérgico (se receitado). Tenha sempre água potável à mão.',
            content_en: 'Pack a thermometer, fever medication, plasters, insect repellent and an antihistamine (if prescribed). Always keep drinking water on hand.',
            content_es: 'Lleve termómetro, antitérmico, apósitos, repelente y antialérgico (si está recetado). Tenga siempre agua potable a mano.',
            content_ptpt: 'Leve termómetro, antipirético, adesivos, repelente e anti-histamínico (se receitado). Tenha sempre água potável à mão.',
        },
    ],
};
