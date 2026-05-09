/**
 * manutencao_terceirizada.js
 * Checklist Pós-Manutenção Terceirizada
 * Para uso em Gestão de Eventos > Reforma/Manutenção
 * Vigilaro Care V5
 */

export const MANUTENCAO_TERCEIRIZADA = {
    id: 'manutencao_terceirizada',
    titulo: 'Checklist Pós-Manutenção',
    emoji: '🔧',
    descricao: 'Verificações essenciais após serviços de manutenção, obras ou visitas técnicas.',

    contexto: {
        problema: 'Terceirizados podem deixar resíduos, materiais e ferramentas que representam riscos.',
        responsabilidade: 'Você pode ser responsabilizado por acidentes ocorridos com terceiros em sua residência.',
        solucao: 'Faça uma inspeção completa após QUALQUER serviço terceirizado.'
    },

    tiposServico: [
        {
            id: 'eletrica',
            titulo: 'Serviço Elétrico',
            icone: 'flash-outline',
            cor: '#FFC107',
            checklist: [
                { id: 'ele1', texto: 'Fios expostos ou desencapados?', critico: true },
                { id: 'ele2', texto: 'Tampas de tomadas e interruptores recolocadas?', critico: true },
                { id: 'ele3', texto: 'Quadro de disjuntores fechado e identificado?' },
                { id: 'ele4', texto: 'Ferramentas ou materiais deixados para trás?' },
                { id: 'ele5', texto: 'Teste de funcionamento realizado com eletricista?' },
                { id: 'ele6', texto: 'Cheiro de fio queimado ou aquecimento anormal?' }
            ],
            riscos: ['Choque elétrico', 'Curto-circuito', 'Incêndio']
        },
        {
            id: 'hidraulica',
            titulo: 'Serviço Hidráulico',
            icone: 'water-outline',
            cor: '#2196F3',
            checklist: [
                { id: 'hid1', texto: 'Vazamentos após o serviço?' },
                { id: 'hid2', texto: 'Registros funcionando corretamente?' },
                { id: 'hid3', texto: 'Piso seco e sem poças?' },
                { id: 'hid4', texto: 'Ferramentas ou peças deixadas no local?' },
                { id: 'hid5', texto: 'Produtos químicos (cola, selante) guardados?' },
                { id: 'hid6', texto: 'Buracos ou aberturas tapadas adequadamente?' }
            ],
            riscos: ['Quedas por piso molhado', 'Intoxicação por produtos', 'Danos estruturais']
        },
        {
            id: 'gas',
            titulo: 'Serviço de Gás',
            icone: 'flame-outline',
            cor: '#FF5722',
            checklist: [
                { id: 'gas1', texto: 'Teste de vazamento realizado (espuma)?', critico: true },
                { id: 'gas2', texto: 'Conexões bem apertadas?', critico: true },
                { id: 'gas3', texto: 'Certificado de manutenção recebido?' },
                { id: 'gas4', texto: 'Área ventilada após o serviço?' },
                { id: 'gas5', texto: 'Cheiro de gás ausente?' }
            ],
            riscos: ['Explosão', 'Incêndio', 'Intoxicação']
        },
        {
            id: 'pintura',
            titulo: 'Pintura e Acabamento',
            icone: 'color-palette-outline',
            cor: '#9C27B0',
            checklist: [
                { id: 'pin1', texto: 'Latas de tinta e solvente retiradas?', critico: true },
                { id: 'pin2', texto: 'Pincéis e rolos descartados adequadamente?' },
                { id: 'pin3', texto: 'Panos com produto químico removidos?' },
                { id: 'pin4', texto: 'Ambiente ventilado (vapores tóxicos)?' },
                { id: 'pin5', texto: 'Chão limpo e sem respingos escorregadios?' },
                { id: 'pin6', texto: 'Móveis recolocados em local seguro?' }
            ],
            riscos: ['Intoxicação por inalação', 'Escorregões', 'Incêndio (solventes)']
        },
        {
            id: 'alvenaria',
            titulo: 'Alvenaria e Reformas',
            icone: 'construct-outline',
            cor: '#795548',
            checklist: [
                { id: 'alv1', texto: 'Entulho removido completamente?', critico: true },
                { id: 'alv2', texto: 'Pregos, parafusos e arames recolhidos?' },
                { id: 'alv3', texto: 'Ferramentas cortantes guardadas ou removidas?' },
                { id: 'alv4', texto: 'Poeira excessiva limpa (risco respiratório)?' },
                { id: 'alv5', texto: 'Buracos e aberturas temporárias protegidos?' },
                { id: 'alv6', texto: 'Escadas e andaimes removidos?' },
                { id: 'alv7', texto: 'Área isolada se ainda houver risco?' }
            ],
            riscos: ['Cortes e perfurações', 'Quedas', 'Problemas respiratórios']
        },
        {
            id: 'ar_condicionado',
            titulo: 'Ar Condicionado / Refrigeração',
            icone: 'snow-outline',
            cor: '#00BCD4',
            checklist: [
                { id: 'ar1', texto: 'Equipamento testado com técnico presente?' },
                { id: 'ar2', texto: 'Drenagem funcionando (sem vazamento)?' },
                { id: 'ar3', texto: 'Instalação elétrica adequada?' },
                { id: 'ar4', texto: 'Suporte externo bem fixado?' },
                { id: 'ar5', texto: 'Filtros limpos e instalados?' }
            ],
            riscos: ['Curto-circuito', 'Vazamentos', 'Queda de unidade externa']
        },
        {
            id: 'internet_tv',
            titulo: 'Internet / TV a Cabo',
            icone: 'wifi-outline',
            cor: '#4CAF50',
            checklist: [
                { id: 'net1', texto: 'Cabos fixados e organizados (não atravessando passagem)?' },
                { id: 'net2', texto: 'Furos na parede vedados?' },
                { id: 'net3', texto: 'Equipamentos fora do alcance de crianças?' },
                { id: 'net4', texto: 'Sem fios expostos ou desencapados?' }
            ],
            riscos: ['Tropeços', 'Choques (fios danificados)', 'Queda de equipamentos']
        },
        {
            id: 'dedetizacao',
            titulo: 'Dedetização / Controle de Pragas',
            icone: 'bug-outline',
            cor: '#FF9800',
            checklist: [
                { id: 'ded1', texto: 'Tempo de isolamento respeitado (geralmente 2-4h)?', critico: true },
                { id: 'ded2', texto: 'Ambiente ventilado antes de retornar?', critico: true },
                { id: 'ded3', texto: 'Pets e crianças mantidos afastados?' },
                { id: 'ded4', texto: 'Alimentos foram protegidos/guardados?' },
                { id: 'ded5', texto: 'Superfícies de preparo de alimentos limpas?' },
                { id: 'ded6', texto: 'Iscas venenosas fora do alcance de crianças e pets?' }
            ],
            riscos: ['Intoxicação', 'Reações alérgicas', 'Envenenamento de pets']
        }
    ],

    checklistGeral: [
        { id: 'geral1', texto: 'Inspeção visual completa do local de trabalho feita?' },
        { id: 'geral2', texto: 'Nenhuma ferramenta ou material deixado para trás?' },
        { id: 'geral3', texto: 'Nota fiscal ou comprovante do serviço recebido?' },
        { id: 'geral4', texto: 'Garantia do serviço informada?' },
        { id: 'geral5', texto: 'Área limpa e segura para circulação?' },
        { id: 'geral6', texto: 'Crianças e pets liberados para circular?' }
    ],

    documentacao: {
        titulo: 'Documentação Importante',
        itens: [
            'Nota fiscal do serviço prestado',
            'Certificado de garantia (se aplicável)',
            'ART/RRT para obras que exigem (reformas estruturais)',
            'Contato do profissional para retorno',
            'Fotos do antes e depois (proteção legal)'
        ]
    },

    dicasSeguranca: [
        {
            titulo: 'Antes do Serviço',
            dicas: [
                'Verifique se o profissional é qualificado',
                'Guarde objetos de valor',
                'Proteja móveis e pisos',
                'Combine horários e duração'
            ]
        },
        {
            titulo: 'Durante o Serviço',
            dicas: [
                'Mantenha crianças e pets em área segura',
                'Acompanhe o trabalho quando possível',
                'Questione sobre riscos temporários'
            ]
        },
        {
            titulo: 'Após o Serviço',
            dicas: [
                'Faça inspeção usando este checklist',
                'Teste funcionalidades (água, luz, gás)',
                'Documente qualquer irregularidade',
                'Libere área apenas após verificação completa'
            ]
        }
    ],

    emergencias: {
        eletrica: 'Desligue o disjuntor geral e chame o técnico de volta',
        gas: 'Abra janelas, não acione interruptores e ligue 193',
        vazamento: 'Feche o registro geral de água e chame o encanador'
    }
};

export default MANUTENCAO_TERCEIRIZADA;
