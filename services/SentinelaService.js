import NeoIcon from '../components/NeoIcon';
// Simulação de Clima (Num app real, viria de uma API)
const WEATHER_CONDITIONS = [
    { type: 'RAIN', title: 'Possibilidade de Chuva', message: 'Pisos externos escorregadios. Feche as janelas.', icon: 'rainy', color: '#3B82F6', iconBg: '#EFF6FF' },
    { type: 'SUN', title: 'Índice UV Alto', message: 'Use protetor solar e hidrate-se.', icon: 'sunny', color: '#F59E0B', iconBg: '#FFFBEB' },
    { type: 'WIND', title: 'Ventos Fortes', message: 'Recolha objetos soltos no quintal.', icon: 'leaf', color: '#10B981', iconBg: '#ECFDF5' },
];

const ROUTINE_TIPS = {
    MORNING: { title: 'Rotina Matinal', message: 'Bom dia. Kits de saída prontos? É um hábito que protege sua família lá fora.', icon: 'cafe', color: '#F97316' },
    AFTERNOON_KIDS: { title: 'Tarde com as Crianças', message: 'Tarde em casa com as crianças? Janelas e sacadas merecem uma olhada rápida.', icon: 'home', color: '#8B5CF6' },
    AFTERNOON_DEFAULT: { title: 'Tarde Segura', message: 'Ambientes arejados e bem iluminados reduzem acidentes. Parece pouco, faz muito.', icon: 'sun', color: '#8B5CF6' },
    NIGHT: { title: 'Antes de Dormir', message: 'Trancas conferidas, registro do gás fechado. Boa noite tranquila.', icon: 'moon', color: '#1E293B' },
};

// ═══════════════════════════════════════════════════
// BANCO DE DICAS DIÁRIAS POR GRUPO FAMILIAR
// ═══════════════════════════════════════════════════
const DAILY_TIPS = {
    baby: [
        { title: 'Tomadas elétricas', message: 'Todas as tomadas ao alcance do bebê precisam de protetor. Verifique hoje!', icon: 'Danger', color: '#E91E63' },
        { title: 'Objetos pequenos', message: 'Moedas, botões, tampas de caneta — tudo vai pra boca. Faça uma varredura no chão.', icon: 'SearchNormal', color: '#F44336' },
        { title: 'Gavetas e armários', message: 'Travas de segurança em gavetas e armários baixos evitam dedos presos e acesso a objetos perigosos.', icon: 'Lock', color: '#9C27B0' },
        { title: 'Água quente', message: 'Teste a temperatura da água do banho com o cotovelo antes de colocar o bebê.', icon: 'Drop', color: '#2196F3' },
        { title: 'Produtos de limpeza', message: 'Mantenha todos os produtos de limpeza acima de 1,5m. Bebês são curiosos e rápidos!', icon: 'Warning2', color: '#FF9800' },
        { title: 'Escadas', message: 'Portões de segurança em escadas são essenciais. Verifique se estão bem fixados.', icon: 'Home2', color: '#4CAF50' },
        { title: 'Canto de móveis', message: 'Protetores de quina em mesas e móveis baixos previnem batidas na cabeça.', icon: 'Shield', color: '#00BCD4' },
        { title: 'Berço seguro', message: 'Nada de travesseiros, mantas soltas ou brinquedos no berço durante o sono.', icon: 'Moon', color: '#3F51B5' },
        { title: 'Cordas e fios', message: 'Cordas de cortinas e fios soltos são risco de estrangulamento. Prenda ou encurte.', icon: 'Danger', color: '#F44336' },
        { title: 'Janelas', message: 'Redes de proteção em janelas são obrigatórias quando há crianças pequenas em casa.', icon: 'Building', color: '#607D8B' },
    ],
    child: [
        { title: 'Cozinha segura', message: 'Cabos de panela sempre virados para dentro. Crianças alcançam mais do que imaginamos.', icon: 'Warning2', color: '#FF9800' },
        { title: 'Hora do banho', message: 'Nunca deixe crianças sozinhas na banheira — nem por um segundo.', icon: 'Drop', color: '#2196F3' },
        { title: 'Medicamentos', message: 'Remédios devem estar em local alto e trancado. Embalagens coloridas atraem crianças.', icon: 'Health', color: '#E91E63' },
        { title: 'Quedas', message: 'Pisos molhados são a maior causa de quedas em crianças. Seque banheiros e cozinhas.', icon: 'Danger', color: '#F44336' },
        { title: 'Ensine brincando', message: 'Converse sobre segurança em casa de forma lúdica. Crianças aprendem melhor quando é divertido.', icon: 'Teacher', color: '#4CAF50' },
        { title: 'Brinquedos', message: 'Verifique brinquedos regularmente: peças soltas podem ser engolidas.', icon: 'SearchNormal', color: '#9C27B0' },
        { title: 'Sacadas e varandas', message: 'Nada de cadeiras, bancos ou caixas perto de grades e parapeitos.', icon: 'Building', color: '#607D8B' },
        { title: 'Piscinas', message: 'Piscinas devem ter cerca, alarme ou cobertura. Afogamento é silencioso.', icon: 'Drop', color: '#0097A7' },
    ],
    elderly: [
        { title: 'Iluminação noturna', message: 'Uma luz de LED no corredor ajuda a evitar quedas durante idas ao banheiro à noite.', icon: 'Lamp', color: '#FF9800' },
        { title: 'Tapetes', message: 'Tapetes soltos são a principal causa de quedas. Use antiderrapantes ou remova-os.', icon: 'Home2', color: '#F44336' },
        { title: 'Barras de apoio', message: 'Barras de apoio no banheiro (box e vaso) reduzem em até 60% o risco de quedas.', icon: 'Shield', color: '#4CAF50' },
        { title: 'Calçados', message: 'Chinelos de sola lisa são perigosos. Prefira calçados antiderrapantes em casa.', icon: 'Warning2', color: '#E91E63' },
        { title: 'Objetos no chão', message: 'Fios, sapatos e objetos em corredores são obstáculos. Mantenha os caminhos livres.', icon: 'Danger', color: '#9C27B0' },
        { title: 'Telefone acessível', message: 'Tenha um telefone acessível em cada andar. Em emergências, cada segundo conta.', icon: 'Call', color: '#2196F3' },
        { title: 'Cadeira no banho', message: 'Um banco no box torna o banho mais seguro e confortável para idosos.', icon: 'Health', color: '#00BCD4' },
        { title: 'Degraus', message: 'Marque a borda de degraus com fita antiderrapante colorida para melhor visibilidade.', icon: 'Home2', color: '#FF5722' },
    ],
    pet: [
        { title: 'Plantas tóxicas', message: 'Lírios, azaleias e costelas-de-adão são tóxicas para pets. Verifique seu jardim!', icon: 'Danger', color: '#4CAF50' },
        { title: 'Objetos perigosos', message: 'Elásticos, fios e objetos pequenos podem ser engolidos por pets curiosos.', icon: 'SearchNormal', color: '#FF9800' },
        { title: 'Produtos de limpeza', message: 'Cloro e desinfetantes são tóxicos para animais. Mantenha bem fechados e altos.', icon: 'Warning2', color: '#F44336' },
        { title: 'Janelas e sacadas', message: 'Gatos adoram sacadas. Redes de proteção são essenciais — a síndrome do gato voador é real.', icon: 'Building', color: '#9C27B0' },
        { title: 'Chocolate e alimentos', message: 'Chocolate, uvas, cebola e alho são tóxicos para cães. Mantenha fora do alcance.', icon: 'Danger', color: '#E91E63' },
        { title: 'Identificação', message: 'Coleira com tag e microchip atualizados. Se o pet fugir, a identificação traz de volta.', icon: 'Shield', color: '#2196F3' },
        { title: 'Portões e cercas', message: 'Verifique falhas em portões e cercas. Pets são especialistas em encontrar saídas.', icon: 'Home2', color: '#607D8B' },
        { title: 'Vacinação em dia', message: 'Carteira de vacinação atualizada protege seu pet e toda a família.', icon: 'Health', color: '#00BCD4' },
    ],
    general: [
        { title: 'Extintor de incêndio', message: 'Verifique a validade e pressão do seu extintor. Um extintor vencido é apenas decoração.', icon: 'Danger', color: '#F44336' },
        { title: 'Detector de fumaça', message: 'Teste seu detector de fumaça apertando o botão. Faça isso mensalmente.', icon: 'Warning2', color: '#FF9800' },
        { title: 'Gás de cozinha', message: 'Cheire antes de dormir: feche o registro do gás toda noite. É um hábito que salva vidas.', icon: 'Danger', color: '#E91E63' },
        { title: 'Número de emergência', message: 'Todos em casa sabem ligar para 192 (SAMU) e 193 (Bombeiros)?', icon: 'Call', color: '#2196F3' },
        { title: 'Rota de fuga', message: 'Sua família tem um ponto de encontro em caso de evacuação? Defina um hoje.', icon: 'Map', color: '#4CAF50' },
        { title: 'Caixa de força', message: 'Todos em casa sabem onde fica e como desligar o quadro de energia?', icon: 'Flash', color: '#FF9800' },
        { title: 'Registro de água', message: 'Saiba onde fica o registro geral de água. Em caso de vazamento, cada minuto conta.', icon: 'Drop', color: '#2196F3' },
        { title: 'Primeiros socorros', message: 'Seu kit de primeiros socorros está completo e acessível? Verifique prazos de validade.', icon: 'Health', color: '#F44336' },
        { title: 'Vizinhança solidária', message: 'Tenha o contato de pelo menos 2 vizinhos próximos para emergências.', icon: 'Profile2User', color: '#9C27B0' },
        { title: 'Extensões elétricas', message: 'Extensões sobrecarregadas são causa frequente de incêndio. Não ligue vários aparelhos na mesma.', icon: 'Flash', color: '#FF5722' },
    ],
};

export const SentinelaService = {
    /**
     * Retorna a Dica do Dia baseada em TODOS os perfis da família.
     * Determinística por dia (mesma dica se abrir várias vezes no mesmo dia).
     * Alterna entre grupos familiares dia a dia.
     * 
     * @param {Array} allProfiles Todos os perfis da família
     * @param {object} familyMeta Metadados da família
     * @returns {object} { title, message, icon, color, forWhom }
     */
    getDailyTip: (allProfiles = [], familyMeta = {}) => {
        // Identificar grupos presentes na família
        const groups = [];
        const groupMembers = {};

        (allProfiles || []).forEach(profile => {
            if (profile.tipo === 'pet') {
                if (!groupMembers.pet) groupMembers.pet = [];
                groupMembers.pet.push(profile.nome || 'Pet');
                if (!groups.includes('pet')) groups.push('pet');
                return;
            }

            const birthYear = profile.dataNascimento
                ? new Date(profile.dataNascimento).getFullYear()
                : new Date().getFullYear() - 30;
            const age = new Date().getFullYear() - birthYear;

            if (age <= 2) {
                if (!groupMembers.baby) groupMembers.baby = [];
                groupMembers.baby.push(profile.nome || 'Bebê');
                if (!groups.includes('baby')) groups.push('baby');
            } else if (age <= 12) {
                if (!groupMembers.child) groupMembers.child = [];
                groupMembers.child.push(profile.nome || 'Criança');
                if (!groups.includes('child')) groups.push('child');
            } else if (age >= 65) {
                if (!groupMembers.elderly) groupMembers.elderly = [];
                groupMembers.elderly.push(profile.nome || 'Idoso(a)');
                if (!groups.includes('elderly')) groups.push('elderly');
            }
        });

        // Sempre incluir 'general'
        groups.push('general');
        groupMembers.general = ['Sua família'];

        // Calcular dia do ano (determinístico)
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));

        // Selecionar grupo do dia (alterna entre grupos)
        const groupIndex = dayOfYear % groups.length;
        const selectedGroup = groups[groupIndex];
        const tips = DAILY_TIPS[selectedGroup] || DAILY_TIPS.general;

        // Selecionar dica dentro do grupo
        const tipIndex = dayOfYear % tips.length;
        const tip = tips[tipIndex];

        // Nome do membro referenciado
        const members = groupMembers[selectedGroup] || ['Sua família'];
        const memberName = members[dayOfYear % members.length];

        const groupLabels = {
            baby: '👶 Bebê',
            child: '👦 Criança',
            elderly: '👴 Idoso',
            pet: '🐾 Pet',
            general: '🏠 Casa',
        };

        return {
            ...tip,
            forWhom: memberName,
            groupLabel: groupLabels[selectedGroup] || '🏠 Casa',
            group: selectedGroup,
        };
    },

    /**
     * Analisa o contexto atual e retorna o Alerta Prioritário de forma inteligente.
     * Prioridade: 
     * 1. Saúde Crítica (Remédios Atrasados)
     * 2. Risco Crítico na Residência (Score < 50)
     * 3. Dicas Contextuais (baseadas no perfil ativo: idoso, bebê, pet)
     * 4. Rotina Diária
     */
    getAlert: (overdueMeds = [], currentProfile = null, pontuacao = 100, familyMeta = { totalMoradoresEsperados: 0 }) => {
        // 1. PRIORIDADE MÁXIMA: SAÚDE (Atraso de Medicamentos)
        if (overdueMeds && overdueMeds.length > 0) {
            const count = overdueMeds.length;
            const medName = overdueMeds[0].remedio;
            const label = count > 1 ? `${medName} e +${count - 1}` : medName;

            return {
                type: 'CRITICAL',
                level: 'HIGH',
                title: 'Medicamento em atraso',
                message: `${label} está atrasado. Registre a dose para manter o histórico em dia.`,
                icon: 'medical',
                color: '#DC2626',
                bgColor: '#FEF2F2',
                actionLabel: 'REGISTRAR DOSE',
                actionRoute: 'MedicationScheduler'
            };
        }

        // 2. PRIORIDADE ALTA: SCORE DE SEGURANÇA BAIXO
        if (pontuacao < 60) {
            return {
                type: 'SYSTEM',
                level: 'HIGH',
                title: 'Sua casa precisa de atenção',
                message: 'Encontramos pontos críticos na sua vistoria. 5 minutos podem fazer diferença.',
                icon: 'warning-2',
                color: '#EA580C',
                bgColor: '#FFF7ED',
                actionLabel: 'VER AGORA',
                actionRoute: 'ModoPreventivo'
            };
        }

        const hour = new Date().getHours();

        // 3. PRIORIDADE MÉDIA: CONTEXTO DO PERFIL ATIVO (RANDOMIZADO)
        if (currentProfile) {
            const randomFactor = Math.random();
            const birthYear = currentProfile.dataNascimento ? new Date(currentProfile.dataNascimento).getFullYear() : 2024;
            const age = new Date().getFullYear() - birthYear;

            if (currentProfile.tipo !== 'pet' && age <= 4) {
                if (randomFactor > 0.5) {
                    return {
                        type: 'TIP', level: 'MEDIUM', title: 'Segurança Infantil', message: 'O chão está livre de objetos pequenos? Bebês exploram com a boca.',
                        icon: 'shield-tick', color: '#0EA5E9', bgColor: '#F0F9FF', actionRoute: 'IntroSafetyMenu'
                    };
                } else {
                    return {
                        type: 'TIP', level: 'MEDIUM', title: 'Cuidado: Cozinha', message: 'Cabos de panela para dentro. Sempre. Crianças alcançam mais do que imaginamos.',
                        icon: 'warning-2', color: '#F59E0B', bgColor: '#FFFBEB', actionRoute: 'IntroSafetyMenu'
                    };
                }
            }

            if (currentProfile.tipo !== 'pet' && age >= 65) {
                if (randomFactor > 0.5) {
                    return {
                        type: 'TIP', level: 'MEDIUM', title: 'Prevenção de Quedas', message: 'Tapetes soltos causam quedas silenciosas. Vale 2 minutos verificar hoje.',
                        icon: 'health', color: '#0D9488', bgColor: '#F0FDFA', actionRoute: 'ModoPreventivo'
                    };
                } else {
                    return {
                        type: 'TIP', level: 'MEDIUM', title: 'Ambiente Iluminado', message: 'Uma luz de LED no corredor salva de quedas noturnas. Simples e eficaz.',
                        icon: 'sun', color: '#10B981', bgColor: '#F0FDF4', actionRoute: 'ModoPreventivo'
                    };
                }
            }

            if (currentProfile.tipo === 'pet') {
                return {
                    type: 'TIP', level: 'MEDIUM', title: `Cuidado com o ${currentProfile.nome}`, message: 'Cuidado com plantas tóxicas no quintal. Verifique nosso guia!',
                    icon: 'pet', color: '#D97706', bgColor: '#FEF3C7', actionRoute: 'PlantasToxicas'
                };
            }
        }

        // 4. PRIORIDADE BAIXA: ROTINA DIÁRIA (FALLBACK)
        let timeContext = ROUTINE_TIPS.MORNING;
        if (hour >= 12 && hour < 18) {
            const hasKids = familyMeta && (familyMeta.criancas > 0 || familyMeta.bebes > 0);
            timeContext = hasKids ? ROUTINE_TIPS.AFTERNOON_KIDS : ROUTINE_TIPS.AFTERNOON_DEFAULT;
        }
        if (hour >= 18 || hour < 5) timeContext = ROUTINE_TIPS.NIGHT;

        return {
            type: 'INFO',
            level: 'LOW',
            title: timeContext.title,
            message: timeContext.message,
            icon: timeContext.icon,
            color: timeContext.color,
            bgColor: '#F8FAFC',
            actionLabel: 'ABRIR',
            actionRoute: null
        };
    }
};
