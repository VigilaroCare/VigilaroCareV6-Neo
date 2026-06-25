export const SAFETY_GAS = {
    title: 'Vazamento de Gás (GLP)',
    title_en: 'Gas Leak (LPG)',
    title_es: 'Fuga de Gas (GLP)',
    color: '#D32F2F', // Vermelho emergência
    imagemUrl: 'https://images.unsplash.com/photo-1542031121-65dd00f3f3a8?q=80&w=1200&auto=format&fit=crop', // placeholder
    sections: [
        {
            title: 'Sinais e Perigos Iniciais',
            title_en: 'Initial Signs and Dangers',
            title_es: 'Señales y Peligros Iniciales',
            icon: 'Danger',
            emoji: '⚠️',
            description: 'O gás de cozinha é mais pesado que o ar e se acumula no chão. Em ambientes fechados, qualquer faísca leve — até a do interruptor de luz — pode causar uma explosão violenta.',
        },
        {
            title: 'Regras de Ouro (Ação Imediata)',
            title_en: 'Golden Rules (Immediate Action)',
            title_es: 'Reglas de Oro (Acción Inmediata)',
            icon: 'Warning2',
            emoji: '🛑',
            description: '1. NUNCA acenda luzes, risque fósforos ou mexa em tomadas se sentir cheiro de gás.\n2. Não utilize o celular dentro do cômodo afetado.\n3. Abra portas e janelas na hora para o gás sair, feche o botijão e saia de casa.\n4. Ligue para os Bombeiros no 193 de um local aberto na calçada.',
        },
        {
            title: 'Verificações Críticas de Segurança',
            title_en: 'Critical Safety Checks',
            title_es: 'Verificaciones Críticas de Seguridad',
            icon: 'ShieldTick',
            emoji: '✅',
            description: '• Saia de casa sem mexer em nada elétrico.\n• Gire a chave do regulador do botijão no sentido horário para fechar o registro.\n• Abra todas as janelas e portas para o gás dispersar.\n• Só ligue para os bombeiros e use o celular quando estiver do lado de fora do imóvel.',
        }
    ]
};
