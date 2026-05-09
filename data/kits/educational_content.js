export const KITS_EDUCATIONAL_CONTENT = {
    epis: {
        id: 'epis',
        title: 'Equipamentos de Proteção (EPIs)',
        title_en: 'Personal Protective Equipment (PPE)',
        title_es: 'Equipos de Protección Personal (EPP)',
        description: 'Proteção essencial para trabalhos domésticos e manutenção. Verifique sempre o Certificado de Aprovação (CA).',
        description_en: 'Essential protection for household work and maintenance. Always check the Approval Certificate.',
        description_es: 'Protección esencial para trabajos domésticos y mantenimiento. Verifique siempre el Certificado de Aprobación.',
        icon: 'helmet', // Personalizado na tela
        color: '#F59E0B', // Amber
        sections: [
            {
                title: 'Cabeça',
                content: [
                    '**Capacete:** Essencial para trabalhos em telhados ou locais com risco de queda de objetos.',
                    '**Dica:** Na falta de um capacete de segurança (com ou sem aba), um capacete de ciclista pode oferecer proteção emergencial.'
                ]
            },
            {
                title: 'Olhos e Face',
                content: [
                    '**Óculos de Segurança:** Indispensável contra respingos químicos, poeira e partículas projetadas (furadeira, lixadeira).',
                    '**Protetor Facial:** Para proteção completa do rosto.',
                    '**Nota:** Alguns modelos permitem o uso conjunto com óculos de grau.'
                ]
            },
            {
                title: 'Mãos (Luvas)',
                content: [
                    '**Vaqueta:** Para materiais ásperos e pesados.',
                    '**Sintéticas/Impermeáveis:** Para produtos químicos e corrosivos.',
                    '**Jardinagem:** Proteção contra espinhos e cortes leves.',
                    '**Cano Longo:** Proteção adicional para os antebraços.'
                ]
            },
            {
                title: 'Ouvidos',
                content: [
                    '**Protetores Auriculares:** Obrigatório ao operar ferramentas ruidosas como furadeiras, serras circulares, lixadeiras e lavadoras de alta pressão.',
                    '**Tipos:** Intra-auriculares (plugue) ou Tipo Concha (fone).'
                ]
            },
            {
                title: 'Pés e Corpo',
                content: [
                    '**Calçados:** Botas de couro (preferência sem cadarço) protegem contra impactos e animais peçonhentos.',
                    '**Vestimenta:** Calças compridas, camisas de manga longa e aventais de material resistente para manuseio de materiais abrasivos.'
                ]
            }
        ]
    },
    first_aid: {
        id: 'first_aid',
        title: 'Primeiros Socorros',
        title_en: 'First Aid',
        title_es: 'Primeros Auxilios',
        description: 'Itens essenciais para atendimento imediato de ferimentos leves até a chegada de ajuda.',
        description_en: 'Essential items for immediate treatment of minor injuries until help arrives.',
        description_es: 'Artículos esenciales para atención inmediata de heridas leves hasta la llegada de ayuda.',
        icon: 'medkit',
        color: '#EF4444', // Red
        sections: [
            {
                title: 'Itens de Limpeza e Curativo',
                content: [
                    '**Água e Sabão:** A base de qualquer limpeza de ferimentos.',
                    '**Soro Fisiológico:** Para limpeza suave de olhos e cortes.',
                    '**Gaze Esterilizada:** Para cobrir ferimentos.',
                    '**Panos Limpos:** Para compressão ou apoio.',
                    '**Filme Plástico:** Para proteger queimaduras (apenas cobrir) antes do atendimento médico.'
                ]
            },
            {
                title: 'Alívio e Apoio',
                content: [
                    '**Bolsa de Gelo/Compressas Frias:** Para picadas, inchaços e contusões.',
                    '**Analgésicos:** Apenas os de uso habitual, para alívio de dor em casos simples (se seguro).',
                    '**Tesoura sem ponta:** Para cortar gazes e roupas.'
                ]
            },
            {
                title: '🔴 O QUE NÃO USAR',
                content: [
                    'Jamais aplique em queimaduras ou ferimentos abertos:',
                    '❌ Pomadas ou Unguentos caseiros',
                    '❌ Pasta de dente',
                    '❌ Pó de café ou Manteiga',
                    '❌ Álcool líquido direto na ferida aberta'
                ]
            }
        ]
    },
    tools: {
        id: 'tools',
        title: 'Caixa de Ferramentas',
        title_en: 'Toolbox',
        title_es: 'Caja de Herramientas',
        description: 'Organização e manutenção previnem acidentes graves em reparos domésticos.',
        description_en: 'Organization and maintenance prevent serious accidents in home repairs.',
        description_es: 'La organización y el mantenimiento previenen accidentes graves en reparaciones domésticas.',
        icon: 'tools',
        color: '#607D8B', // Blue Grey
        sections: [
            {
                title: 'Organização é Segurança',
                content: [
                    'Mantenha tudo em maletas ou caixas apropriadas.',
                    'Ferramentas cortantes devem ter compartimento separado.',
                    'Painéis de parede (altos e iluminados) são ótimos para ferramentas de uso frequente.',
                    '**Regra de Ouro:** Guarde sempre longe do alcance de crianças.'
                ]
            },
            {
                title: 'Manutenção',
                content: [
                    'Verifique cabos e lâminas periodicamente.',
                    'Substitua ferramentas quebradas ou desgastadas imediatamente.',
                    '**Jamais improvise:** O uso incorreto é a maior causa de acidentes.'
                ]
            },
            {
                title: 'Ferramentas Elétricas',
                content: [
                    '**Ao guardar:** Sempre desligadas e desconectadas da tomada.',
                    '**Fios:** Verifique se não há partes desencapadas.',
                    '**Exemplos de Risco:** Furadeira, serra circular, roçadeira e lixadeira exigem EPIs (Óculos e Protetor Auricular).'
                ]
            }
        ]
    },
    emergency_support: {
        id: 'emergency_support',
        title: 'Kits de Apoio e Emergência',
        title_en: 'Support & Emergency Kits',
        title_es: 'Kits de Apoyo y Emergencia',
        description: 'Iluminação, comunicação e acessibilidade para momentos críticos.',
        description_en: 'Lighting, communication, and accessibility for critical moments.',
        description_es: 'Iluminación, comunicación y accesibilidad para momentos críticos.',
        icon: 'warning',
        color: '#8B5CF6', // Violet
        sections: [
            {
                title: 'Iluminação de Emergência',
                content: [
                    'Essencial para quedas de energia, especialmente com idosos em casa.',
                    'Tenha **Lanternas** com pilhas extras ou **Luzes de Emergência** instaladas nas áreas de circulação.'
                ]
            },
            {
                title: 'Comunicação',
                content: [
                    'Mantenha um celular carregado sempre à mão, principalmente em jardinagem ou áreas isoladas.',
                    '**Contatos Salvos:** SAMU (192), Bombeiros (193), Centro de Intoxicação (CIATOX) e familiares.'
                ]
            },
            {
                title: 'Acessibilidade (Adaptação)',
                content: [
                    'Considere estes itens como "Kit de Segurança Preventiva":',
                    '• Barras de apoio em banheiros.',
                    '• Tapetes antiderrapantes.',
                    '• Travas de segurança para gavetas.',
                    '• Protetores de quinas.'
                ]
            }
        ]
    },
    farmacinha: {
        id: 'farmacinha',
        title: 'Farmácia Caseira (Kit de Medicamentos)',
        title_en: 'Home Pharmacy (Medication Kit)',
        title_es: 'Farmacia Casera (Kit de Medicamentos)',
        description: 'Organização e armazenamento correto de medicamentos para uso rotineiro e emergencial na residência.',
        description_en: 'Proper organization and storage of medications for routine and emergency use at home.',
        description_es: 'Organización y almacenamiento correcto de medicamentos para uso rutinario y de emergencia en el hogar.',
        icon: 'heart',
        color: '#10B981', // Emerald
        sections: [
            {
                title: 'Regras de Ouro',
                content: [
                    '**Longe do alcance de crianças e pets:** O principal risco em casa é a intoxicação acidental.',
                    '**Local de Armazenamento:** Guarde em local alto, seco e ao abrigo da luz. **O banheiro não é o local ideal** devido à umidade e variações de temperatura.',
                    '**Tranca:** Se houver crianças pequenas em casa, a caixa de medicamentos deve ter trava ou cadeado.'
                ]
            },
            {
                title: 'Medicamentos Básicos (Uso Livre/Sintomáticos)',
                content: [
                    '**Analgésicos e Antitérmicos:** Paracetamol ou Dipirona para dor de cabeça, febre ou dores leves.',
                    '**Antialérgicos:** Para reações alérgicas leves (picadas, poeira) - *Sempre siga a orientação médica prévia*.',
                    '**Sais de Reidratação Oral:** Essencial para episódios de diarreia ou vômito, prevenindo desidratação grave.',
                    '**Pomadas:** Para alívio de picadas de insetos ou assaduras.'
                ]
            },
            {
                title: 'Medicamentos de Uso Contínuo',
                content: [
                    'Mantenha-os organizados separadamente dos medicamentos de uso eventual.',
                    'Tenha sempre um pequeno estoque (1 a 2 semanas a mais) para evitar faltas em feriados ou emergências.',
                    'Use organizadores semanais se houver dificuldade em lembrar doses.'
                ]
            },
            {
                title: 'Gerenciamento e Validade',
                content: [
                    '**Revisão Periódica:** Pelo menos a cada 6 meses, verifique a validade de todos os itens.',
                    '**Descarte Certo:** Nunca jogue remédios vencidos no lixo comum ou vaso sanitário. Leve a pontos de coleta em farmácias ou postos de saúde.',
                    '**Embalagem Original:** Mantenha os medicamentos na embalagem original (blister) para fácil identificação da validade e dosagem.'
                ]
            }
        ]
    },
    pet: {
        id: 'pet',
        title: 'Prontidão Pet (Kit e Emergência)',
        title_en: 'Pet Readiness (Kit & Emergency)',
        title_es: 'Preparación Mascotas (Kit y Emergencia)',
        description: 'Preparação essencial para garantir a segurança e o suporte do seu animal de estimação em casos de evacuação ou acidentes domésticos.',
        description_en: 'Essential preparation to ensure the safety and support of your pet in cases of evacuation or domestic accidents.',
        description_es: 'Preparación esencial para garantizar la seguridad y el apoyo de su mascota en casos de evacuación o accidentes domésticos.',
        icon: 'star',
        color: '#F43F5E', // Rose
        sections: [
            {
                title: 'Sobrevivência Básica',
                content: [
                    '**Água e Ração:** Tenha sempre uma reserva para pelo menos 3 dias (em potes herméticos).',
                    '**Tigelas Retráteis:** Ocupam menos espaço na mochila de fuga.',
                    '**Areia/Jornal:** Para higiene emergencial de gatos e cães.'
                ]
            },
            {
                title: 'Segurança e Contenção',
                content: [
                    '**Coleira e Guia Extra:** Animais assustados tendem a fugir ou reagir mal a estranhos.',
                    '**Focinheira:** Mesmo para pets muito dóceis. A dor ou o medo podem fazê-los morder quem tenta ajudar (bombeiros, socorristas).',
                    '**Caixa de Transporte:** Indispensável para evacuação (especialmente para gatos, que se escondem quando assustados).'
                ]
            },
            {
                title: 'Saúde e Documentação',
                content: [
                    '**Identificação Visual:** Mantenha fotos recentes do pet no celular caso precisem fazer buscas.',
                    '**Carteira de Vacinação:** Uma cópia física ou digital (nuvem) da caderneta atualizada.',
                    '**Primeiros Socorros Vet:** Gaze, ataduras (tipo Coban autoaderente), soro fisiológico e Carvão Ativado (para suspeita de intoxicação, com aval do veterinário).'
                ]
            }
        ]
    }
};
