/**
 * safety_gas.js — Vazamento de gás (GLP)
 *
 * Renderizado por screens/GenericCategoryScreen.js via `t_field`, que resolve
 * o sufixo de idioma e os tokens de emergência.
 *
 * HISTÓRICO (08/10/2026): havia três seções e duas delas diziam a mesma coisa.
 * "Regras de Ouro (Ação Imediata)" e "Verificações Críticas de Segurança"
 * repetiam os mesmos quatro passos com outras palavras — não acender nada,
 * fechar o registro, abrir as janelas, ligar de fora. O Agnaldo achou a
 * redundância revisando o documento de conteúdo.
 *
 * A segunda seção trazia exatamente UMA informação nova: o sentido de giro do
 * regulador. Ela foi incorporada ao passo correspondente da sequência.
 *
 * O slot liberado passou a ser o que o título dele já prometia e não entregava:
 * verificação PREVENTIVA de rotina, não ação de emergência. Uma página de
 * vazamento de gás precisa das três coisas distintas — o que está acontecendo,
 * o que fazer agora, e o que conferir para não chegar aqui. A terceira estava
 * faltando porque o espaço dela estava ocupado por um eco da segunda.
 *
 * Fonte da seção preventiva: `guia-completo-prevencao.md`, "Segurança na
 * utilização de gás de cozinha (GLP)" — conteúdo autoral do Agnaldo.
 *
 * O número dos bombeiros é {{FIRE_NUMBER}}, nunca "193" escrito na frase: em
 * Portugal e Espanha é 112 e nos EUA 911. Ver utils/emergencyTokens.js.
 */
export const SAFETY_GAS = {
    title: 'Vazamento de Gás (GLP)',
    title_en: 'Gas Leak (LPG)',
    title_es: 'Fuga de Gas (GLP)',
    title_ptpt: 'Fuga de Gás (GPL)',
    color: '#D32F2F', // Vermelho emergência
    imagemUrl: 'https://images.unsplash.com/photo-1542031121-65dd00f3f3a8?q=80&w=1200&auto=format&fit=crop', // placeholder
    sections: [
        {
            title: 'Sinais e Perigos Iniciais',
            title_en: 'Initial Signs and Dangers',
            title_es: 'Señales y Peligros Iniciales',
            title_ptpt: 'Sinais e Perigos Iniciais',
            icon: 'Danger',
            emoji: '⚠️', icone: 'Warning',
            description: 'O gás de cozinha, por ser mais pesado que o ar, se acumula no chão, em ralos e em canaletas. Em ambientes fechados, qualquer faísca leve — até a do interruptor de luz — pode causar explosão violenta.',
            description_en: 'Cooking gas is heavier than air and pools at floor level, in drains and in floor channels. In enclosed spaces, even a small spark — even from a light switch — can cause a violent explosion.',
            description_es: 'El gas de cocina es más pesado que el aire y se acumula en el suelo, en los desagües y en las canaletas. En ambientes cerrados, cualquier chispa leve — incluso la del interruptor de la luz — puede causar una explosión violenta.',
            description_ptpt: 'O gás de cozinha, por ser mais pesado que o ar, acumula-se no chão e nos ralos. Em ambientes fechados, qualquer faísca leve — até a do interruptor da luz — pode causar uma explosão violenta.',
        },
        {
            // Sequência única de emergência, na ordem em que se executa.
            // O sentido horário do regulador vinha da seção duplicada.
            title: 'Ação Imediata (nesta ordem)',
            title_en: 'Immediate Action (in this order)',
            title_es: 'Acción Inmediata (en este orden)',
            title_ptpt: 'Ação Imediata (nesta ordem)',
            icon: 'Warning2',
            emoji: '🛑', icone: 'HandPalm',
            description: '1. NÃO acenda nem apague luzes, não risque fósforos, não mexa em tomadas nem ligue aparelhos. A faísca do interruptor basta.\n'
                + '2. Não use o celular dentro do cômodo.\n'
                + '3. Abra portas e janelas para o gás sair.\n'
                + '4. Feche o registro girando a chave do regulador do botijão no sentido horário.\n'
                + '5. Saia de casa e leve todos com você.\n'
                + '6. Já na rua, em local aberto, ligue para os Bombeiros no {{FIRE_NUMBER}}.',
            description_en: '1. Do NOT switch lights on or off, do not strike matches, do not touch outlets or turn on appliances. The spark from a switch is enough.\n'
                + '2. Do not use your phone inside the room.\n'
                + '3. Open doors and windows to let the gas out.\n'
                + '4. Shut the valve by turning the cylinder regulator knob clockwise.\n'
                + '5. Leave the house and take everyone with you.\n'
                + '6. Once outside, in the open, call the fire service on {{FIRE_NUMBER}}.',
            description_es: '1. NO encienda ni apague luces, no prenda cerillas, no toque enchufes ni encienda aparatos. La chispa del interruptor basta.\n'
                + '2. No use el móvil dentro de la habitación.\n'
                + '3. Abra puertas y ventanas para que salga el gas.\n'
                + '4. Cierre la llave girando el regulador de la bombona en el sentido de las agujas del reloj.\n'
                + '5. Salga de casa y lleve a todos con usted.\n'
                + '6. Ya en la calle, en un lugar abierto, llame a los Bomberos al {{FIRE_NUMBER}}.',
            description_ptpt: '1. NÃO acenda nem apague luzes, não risque fósforos, não mexa em tomadas nem ligue aparelhos. A faísca do interruptor basta.\n'
                + '2. Não use o telemóvel dentro do compartimento.\n'
                + '3. Abra portas e janelas para o gás sair.\n'
                + '4. Feche o registo rodando a chave do redutor da botija no sentido dos ponteiros do relógio.\n'
                + '5. Saia de casa e leve todos consigo.\n'
                + '6. Já na rua, em local aberto, ligue para os Bombeiros: {{FIRE_NUMBER}}.',
        },
        {
            // Preventivo, não emergencial: o que confere antes de haver cheiro.
            title: 'Verificações de Rotina',
            title_en: 'Routine Checks',
            title_es: 'Verificaciones de Rutina',
            title_ptpt: 'Verificações de Rotina',
            icon: 'ShieldTick',
            emoji: '✅', icone: 'CheckCircle',
            description: '• Confira o estado da mangueira, do regulador e das braçadeiras. Procure rachaduras, endurecimento e folga.\n'
                + '• Respeite o prazo de validade impresso na mangueira e no regulador, e use só peças com {{CERT_SEAL}}.\n'
                + '• Para procurar vazamento, passe espuma de sabão nas conexões e veja se borbulha. NUNCA use chama para testar.\n'
                + '• Mantenha o botijão em pé, em área externa ventilada, longe de fonte de calor e de ralos. Nunca em subsolo ou cômodo fechado.\n'
                + '• Em prédio com central de gás, o abrigo dos cilindros deve ser ventilado, sinalizado e protegido das intempéries.',
            description_en: '• Check the hose, regulator and clamps. Look for cracks, stiffness and slack.\n'
                + '• Respect the expiry date printed on the hose and regulator, and use only parts carrying {{CERT_SEAL}}.\n'
                + '• To look for a leak, brush soapy foam on the connections and watch for bubbles. NEVER test with a flame.\n'
                + '• Keep the cylinder upright, outdoors and ventilated, away from heat sources and drains. Never in a basement or closed room.\n'
                + '• In a building with a central gas installation, the cylinder housing must be ventilated, signposted and weather-protected.',
            description_es: '• Revise el estado de la manguera, el regulador y las abrazaderas. Busque grietas, endurecimiento y holgura.\n'
                + '• Respete la fecha de caducidad impresa en la manguera y el regulador, y use solo piezas con {{CERT_SEAL}}.\n'
                + '• Para buscar una fuga, aplique espuma de jabón en las conexiones y observe si burbujea. NUNCA use llama para probar.\n'
                + '• Mantenga la bombona de pie, en zona exterior ventilada, lejos de fuentes de calor y desagües. Nunca en sótano o habitación cerrada.\n'
                + '• En edificio con central de gas, el armario de las bombonas debe estar ventilado, señalizado y protegido de la intemperie.',
            description_ptpt: '• Confira o estado da mangueira, do redutor e das abraçadeiras. Procure fissuras, endurecimento e folga.\n'
                + '• Respeite o prazo de validade impresso na mangueira e no redutor, e use apenas peças com {{CERT_SEAL}}.\n'
                + '• Para procurar fuga, passe espuma de sabão nas ligações e veja se borbulha. NUNCA use chama para testar.\n'
                + '• Mantenha a botija em pé, em área exterior ventilada, longe de fontes de calor e de ralos. Nunca em cave ou compartimento fechado.\n'
                + '• Em edifício com central de gás, o abrigo das botijas deve ser ventilado, sinalizado e protegido das intempéries.',
        },
    ],
};
