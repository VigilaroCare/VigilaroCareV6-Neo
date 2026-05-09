/**
 * ciatox_regions.js
 * Mapeamento de telefones dos Centros de Informação e Assistência Toxicológica (CIATOX) por estado.
 * Fonte: ANVISA / ABRACIT
 */

export const CIATOX_REGIONS = {
    'AC': { name: 'CIATOX/AC', phone: '08007226001' }, // Nacional (Redireciona)
    'AL': { name: 'CIATOX/AL', phone: '08002848112' },
    'AP': { name: 'CIATOX/AP', phone: '08007226001' },
    'AM': { name: 'CIATOX/AM', phone: '08007226001' },
    'BA': { name: 'CIAVE/BA', phone: '08002844343' },
    'CE': { name: 'CEATOX/CE', phone: '08002751475' },
    'DF': { name: 'CIATOX/DF', phone: '08006446774' },
    'ES': { name: 'TOXCEN/ES', phone: '08002839904' },
    'GO': { name: 'CIT/GO', phone: '08006464350' },
    'MA': { name: 'CIATOX/MA', phone: '08007226001' },
    'MT': { name: 'CIATOX/MT', phone: '08007226001' },
    'MS': { name: 'CIT/MS', phone: '08007226001' },
    'MG': { name: 'CIATOX/MG', phone: '08007226001' },
    'PA': { name: 'CIATOX/PA', phone: '08007226001' },
    'PB': { name: 'CEATOX/PB', phone: '08007226001' },
    'PR': { name: 'CIATOX/PR', phone: '08000148110' },
    'PE': { name: 'CEATOX/PE', phone: '08007226001' },
    'PI': { name: 'CIATOX/PI', phone: '08007226001' },
    'RJ': { name: 'CIT/RJ', phone: '08007226001' },
    'RN': { name: 'CIATOX/RN', phone: '08007226001' },
    'RS': { name: 'CIT/RS', phone: '08007213000' },
    'RO': { name: 'CIATOX/RO', phone: '08007226001' },
    'RR': { name: 'CIATOX/RR', phone: '08007226001' },
    'SC': { name: 'CIATOX/SC', phone: '08006435252' },
    'SP': { name: 'CEATOX/SP', phone: '08000148110' }, // Hospital das Clínicas
    'SE': { name: 'CIATOX/SE', phone: '08007226001' },
    'TO': { name: 'CIATOX/TO', phone: '08007226001' },
    'DEFAULT': { name: 'Disque-Intoxicação (Nacional)', phone: '08007226001' }
};

export const ESTADOS_BRASIL = [
    { id: 'AC', nome: 'Acre' },
    { id: 'AL', nome: 'Alagoas' },
    { id: 'AP', nome: 'Amapá' },
    { id: 'AM', nome: 'Amazonas' },
    { id: 'BA', nome: 'Bahia' },
    { id: 'CE', nome: 'Ceará' },
    { id: 'DF', nome: 'Distrito Federal' },
    { id: 'ES', nome: 'Espírito Santo' },
    { id: 'GO', nome: 'Goiás' },
    { id: 'MA', nome: 'Maranhão' },
    { id: 'MT', nome: 'Mato Grosso' },
    { id: 'MS', nome: 'Mato Grosso do Sul' },
    { id: 'MG', nome: 'Minas Gerais' },
    { id: 'PA', nome: 'Pará' },
    { id: 'PB', nome: 'Paraíba' },
    { id: 'PR', nome: 'Paraná' },
    { id: 'PE', nome: 'Pernambuco' },
    { id: 'PI', nome: 'Piauí' },
    { id: 'RJ', nome: 'Rio de Janeiro' },
    { id: 'RN', nome: 'Rio Grande do Norte' },
    { id: 'RS', nome: 'Rio Grande do Sul' },
    { id: 'RO', nome: 'Rondônia' },
    { id: 'RR', nome: 'Roraima' },
    { id: 'SC', nome: 'Santa Catarina' },
    { id: 'SP', nome: 'São Paulo' },
    { id: 'SE', nome: 'Sergipe' },
    { id: 'TO', nome: 'Tocantins' }
];
