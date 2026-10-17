/**
 * safety_condo.js — Segurança em Condomínio
 *
 * Renderizado por screens/GenericCategoryScreen.js via `t_field`: o `title` do
 * topo e, por seção, `title` e `content`. O `subtitle` não é exibido.
 *
 * TRADUÇÃO (08/10/2026): ficheiro sem nenhuma tradução até aqui. `_ptpt` entra
 * onde o termo brasileiro não se usa em Portugal ("parquinho" é parque
 * infantil, "caixa d'água" é depósito/reservatório, "ralo" é ralo mas "sugar
 * cabelo" pede outra construção).
 *
 * NOTA SOBRE O INMETRO: o selo citado é o do organismo brasileiro. Nas versões
 * en/es/ptpt a frase fala da certificação e da validade sem fixar o organismo,
 * porque fora do Brasil quem certifica é outro (CE na UE, UL nos EUA). Dizer
 * "INMETRO" a quem está em Lisboa manda procurar um selo que não existe ali.
 */
export const SAFETY_CONDO = {
    title: 'Segurança em Condomínio',
    title_en: 'Shared Building Safety',
    title_es: 'Seguridad en la Comunidad',
    title_ptpt: 'Segurança no Condomínio',
    subtitle: 'O que observar nas áreas comuns do seu prédio ou condomínio',
    subtitle_en: 'What to look for in the common areas of your building or residential complex',
    subtitle_es: 'Qué observar en las zonas comunes de su edificio o condominio',
    icon: 'business', // MaterialIcon for Building
    color: '#795548', // Brown-ish or maybe Indigo? Let's go with a solid color.
    sections: [
        {
            title: 'Extintores de Incêndio',
            title_en: 'Fire Extinguishers',
            title_es: 'Extintores de Incendios',
            content: 'Observe o MANÔMETRO: O ponteiro deve estar na faixa VERDE. Se estiver no vermelho ou se aproximando dele, considere que o extintor está despressurizado. Verifique também se o lacre plástico está intacto e se a data de validade da carga (em {{CERT_SEAL}}) não expirou. Oriente o responsável para que garanta que a validade do cilindro não esteja vencida.',
            content_en: 'Check the PRESSURE GAUGE: the needle must sit in the GREEN band. If it is in the red, or drifting towards it, treat the extinguisher as depressurised. Check too that the plastic seal is intact and that the charge has not passed the expiry date shown on {{CERT_SEAL}}. Ask whoever is responsible to confirm that the cylinder itself is still in date.',
            content_es: 'Observe el MANÓMETRO: la aguja debe estar en la franja VERDE. Si está en rojo o acercándose, considere que el extintor está despresurizado. Compruebe también que el precinto de plástico está intacto y que la carga no ha caducado según {{CERT_SEAL}}. Pida al responsable que confirme que el propio cilindro sigue en vigor.',
            content_ptpt: 'Observe o MANÓMETRO: o ponteiro deve estar na faixa VERDE. Se estiver no vermelho ou a aproximar-se, considere que o extintor está despressurizado. Verifique também se o selo plástico está intacto e se a carga não passou do prazo indicado em {{CERT_SEAL}}. Peça ao responsável para confirmar que a validade do próprio cilindro não expirou.',
        },
        {
            title: 'Saídas de Emergência',
            title_en: 'Emergency Exits',
            title_es: 'Salidas de Emergencia',
            content: 'As portas corta-fogo devem estar SEMPRE FECHADAS, mas nunca trancadas à chave. Elas impedem que a fumaça invada as escadas. Verifique se não há objetos (bicicletas, vasos, lixo) obstruindo os corredores ou escadas.',
            content_en: 'Fire doors must ALWAYS be closed, but never locked with a key. They are what keeps smoke out of the stairwell. Check that nothing (bicycles, plant pots, rubbish) is blocking the corridors or stairs.',
            content_es: 'Las puertas cortafuegos deben estar SIEMPRE CERRADAS, pero nunca con llave. Son lo que impide que el humo invada la escalera. Compruebe que no haya objetos (bicicletas, macetas, basura) obstruyendo pasillos o escaleras.',
            content_ptpt: 'As portas corta-fogo devem estar SEMPRE FECHADAS, mas nunca trancadas à chave. São elas que impedem o fumo de invadir as escadas. Verifique se não há objetos (bicicletas, vasos, lixo) a obstruir os corredores ou as escadas.',
        },
        {
            title: 'Playground e Parquinho',
            title_en: 'Playground',
            title_es: 'Parque Infantil',
            title_ptpt: 'Parque Infantil',
            content: 'Balance os brinquedos para checar fixação ou folgas. Procure por ferrugem exposta, parafusos soltos ou farpas de madeira ou rebarbas. O piso deve ser de material que absorva impacto (areia, grama ou borracha), nunca concreto puro.',
            content_en: 'Rock the equipment to check how well it is anchored and whether there is any play in it. Look for exposed rust, loose bolts, wood splinters or sharp burrs. The surface must be impact-absorbing (sand, grass or rubber), never bare concrete.',
            content_es: 'Mueva los juegos para comprobar la fijación o si hay holgura. Busque óxido expuesto, tornillos sueltos, astillas de madera o rebabas. El suelo debe ser de material que absorba el impacto (arena, césped o caucho), nunca hormigón desnudo.',
            content_ptpt: 'Abane os equipamentos para verificar a fixação ou se há folgas. Procure ferrugem exposta, parafusos soltos, farpas de madeira ou rebarbas. O piso deve ser de material que absorva o impacto (areia, relva ou borracha), nunca betão nu.',
        },
        {
            title: 'Elevadores',
            title_en: 'Lifts',
            title_es: 'Ascensores',
            content: 'Nunca use elevadores em caso de incêndio. Verifique se o desnível entre a cabine e o andar é seguro. Crianças menores de 10 anos não devem usar o elevador desacompanhadas.',
            content_en: 'Never use a lift during a fire. Check that the step between the car and the floor is safe. Children under 10 should not ride the lift alone.',
            content_es: 'Nunca use el ascensor en caso de incendio. Compruebe que el desnivel entre la cabina y el piso sea seguro. Los menores de 10 años no deben usar el ascensor solos.',
            content_ptpt: 'Nunca use o elevador em caso de incêndio. Verifique se o desnível entre a cabina e o piso é seguro. Crianças com menos de 10 anos não devem andar sozinhas no elevador.',
        },
        {
            title: 'Piscinas Coletivas',
            title_en: 'Shared Pools',
            title_es: 'Piscinas Comunitarias',
            content: 'O ralo de fundo deve ser do tipo \'anti-aprisionamento\' (gradeado que não suga cabelo). O botão de parada de emergência da bomba deve estar visível e sinalizado.',
            content_en: 'The bottom drain must be the anti-entrapment type (a grate that cannot suck in hair). The pump\'s emergency stop button must be visible and clearly marked.',
            content_es: 'El sumidero de fondo debe ser del tipo antiatrapamiento (una rejilla que no pueda succionar el cabello). El botón de parada de emergencia de la bomba debe estar visible y señalizado.',
            content_ptpt: 'O ralo de fundo deve ser do tipo antiaprisionamento (grelha que não possa sugar cabelo). O botão de paragem de emergência da bomba deve estar visível e sinalizado.',
        },
        {
            title: 'Estacionamentos e Garagens',
            title_en: 'Car Parks and Garages',
            title_es: 'Aparcamientos y Garajes',
            title_ptpt: 'Estacionamentos e Garagens',
            content: 'Área de alto risco para crianças! Pontos cegos em manobras e fluxo de entrada/saída são críticos. NUNCA permita brincadeiras nesta área. Mantenha velocidade reduzida e faróis acesos.',
            content_en: 'A high-risk area for children. Blind spots during manoeuvres and the flow of cars in and out are what make it critical. NEVER allow children to play here. Keep your speed down and your headlights on.',
            content_es: 'Zona de alto riesgo para niños. Los ángulos muertos al maniobrar y el flujo de entrada y salida son lo crítico. NUNCA permita que jueguen aquí. Circule despacio y con las luces encendidas.',
            content_ptpt: 'Zona de alto risco para crianças. Os ângulos mortos nas manobras e o fluxo de entrada e saída são o ponto crítico. NUNCA permita brincadeiras nesta zona. Circule devagar e com os faróis acesos.',
        },
        {
            title: 'Áreas de Serviço e Utilidades',
            title_en: 'Service and Utility Areas',
            title_es: 'Zonas de Servicio e Instalaciones',
            content: 'CENTRAIS DE GÁS/PAINÉIS ELÉTRICOS devem estar trancados com acesso restrito. FOSSO DO ELEVADOR deve ser inacessível. O acesso à CAIXA D\'ÁGUA ou CISTERNA deve ter cadeado para evitar quedas e contaminação.',
            content_en: 'GAS PLANT ROOMS and ELECTRICAL PANELS must be locked, with restricted access. The LIFT PIT must be impossible to get into. Access to the WATER TANK or CISTERN must be padlocked, to prevent falls and contamination.',
            content_es: 'Las CENTRALES DE GAS y los CUADROS ELÉCTRICOS deben estar cerrados con acceso restringido. El FOSO DEL ASCENSOR debe ser inaccesible. El acceso al DEPÓSITO DE AGUA o CISTERNA debe tener candado, para evitar caídas y contaminación.',
            content_ptpt: 'As CENTRAIS DE GÁS e os QUADROS ELÉTRICOS devem estar trancados, com acesso restrito. O POÇO DO ELEVADOR deve ser inacessível. O acesso ao DEPÓSITO DE ÁGUA ou CISTERNA deve ter candado, para evitar quedas e contaminação.',
        },
    ],
};
