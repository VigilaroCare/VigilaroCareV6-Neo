/**
 * seguranca_recem_nascido.js
 * Dados de segurança para Recém-nascidos (0-3 meses)
 * Vigilaro Care V5
 */

export const RISCOS_RECEM_NASCIDO = [
    {
        id: '1',
        titulo: 'Engasgamento e Sufocação',
        descricao: 'Risco elevado durante o sono ou amamentação.',
        prevencao: 'Coloque o bebê para dormir sempre de barriga para cima. Mantenha o berço livre de brinquedos, almofadas e "kit berço".',
        icone: 'alert-circle-outline',
        cor: '#EF5350'
    },
    {
        id: '2',
        titulo: 'Quedas',
        descricao: 'Quedas de trocadores, camas ou sofás.',
        prevencao: 'Jamais se ausente ou vire as costas, mesmo que por um segundo. Tenha tudo à mão antes de começar a troca.',
        icone: 'arrow-down-circle-outline',
        cor: '#FF7043'
    },
    {
        id: '3',
        titulo: 'Queimaduras',
        descricao: 'Líquidos quentes ou água do banho.',
        prevencao: 'Nunca consuma bebidas quentes com o bebê no colo. Teste a água do banho com termômetro ou cotovelo.',
        icone: 'flame-outline',
        cor: '#FFA726'
    },
    {
        id: '4',
        titulo: 'Aprisionamento',
        descricao: 'Membros presos nas grades do berço.',
        prevencao: 'Verifique se o espaçamento entre as grades é de no máximo 6cm. Use lençóis bem ajustados.',
        icone: 'grid-outline',
        cor: '#AB47BC'
    },
    {
        id: '5',
        titulo: 'Asfixia e Estrangulamento',
        descricao: 'Cordões, sacos plásticos ou objetos no berço.',
        prevencao: 'Mantenha o berço vazio. Evite correntinhas no pescoço do bebê.',
        icone: 'ban-outline',
        cor: '#EF5350'
    }
];

export const CHECKLIST_RECEM_NASCIDO = [
    { id: '1', texto: 'Berço livre de objetos (sem kit berço, almofadas)', feito: false },
    { id: '2', texto: 'Colchão firme e bem encaixado', feito: false },
    { id: '3', texto: 'Espaçamento das grades <= 6cm', feito: false },
    { id: '4', texto: 'Babá eletrônica funcionando', feito: false },
    { id: '5', texto: 'Temperatura do banho testada (36-37°C)', feito: false },
    { id: '6', texto: 'Tudo à mão antes de trocar o bebê', feito: false },
    { id: '7', texto: 'Sem correntinhas ou cordões no pescoço', feito: false },
];
