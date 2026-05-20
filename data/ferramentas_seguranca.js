/**
 * ferramentas_seguranca.js
 * Dados sobre segurança com Ferramentas
 * Vigilaro Care V5
 */

export const FERRAMENTAS_DATA = {
    goldenRules: [
        { id: 1, title: 'Organização e Inspeção', text: 'Mantenha a caixa organizada. Descarte ferramentas danificadas ou com cabos soltos.' },
        { id: 2, title: 'EPIs', text: 'Sempre utilize os EPIs adequados (óculos, luvas, protetores auriculares). Eles são a última linha de defesa.' },
        { id: 3, title: 'Desconexão', text: 'Desconecte da energia antes de trocar acessórios ou limpar. Verifique cabos e conectores.' },
        { id: 4, title: 'Guarda Segura', text: 'Armazene em local seco, trancado e longe de crianças.' },
        { id: 5, title: 'Não Improvise', text: 'Use a ferramenta correta para a função correta. Improviso é um ato inseguro.' },
    ],
    categories: [
        {
            id: 'manuais',
            title: 'Ferramentas Manuais',
            subtitle: '10 Itens Essenciais',
            image: require('../assets/images/sinitox/animais/pow_tools.png'),
            imagemUrl: 'https://images.pexels.com/photos/34471533/pexels-photo-34471533.jpeg?auto=compress&cs=tinysrgb&w=1200',
            color: '#FFA000',
            icon: 'Setting2',
            items: [
                { name: 'Estilete / Faca Utilitária', risk: 'Cortes profundos.', epi: 'Luvas resistentes, Óculos.', care: 'Corte na direção oposta ao corpo. Retraia a lâmina após uso.' },
                { name: 'Serrote / Serra Manual', risk: 'Cortes e lacerações.', epi: 'Luvas, Óculos.', care: 'Prenda a peça firmemente. Mantenha o olhar na linha de corte.' },
                { name: 'Formão', risk: 'Cortes e perfurações.', epi: 'Óculos.', care: 'Corte longe do corpo. Use martelo de madeira/borracha.' },
                { name: 'Martelo de Unha', risk: 'Pancadas, fragmentos nos olhos.', epi: 'Óculos.', care: 'Verifique se a cabeça está firme e sem rebarbas.' },
                { name: 'Alicate de Corte/Universal', risk: 'Cortes, projeção de arame.', epi: 'Óculos (essencial).', care: 'Lubrifique as articulações periodicamente. Use apenas para cortar materiais dentro da capacidade.' },
                { name: 'Chave de Fenda / Phillips', risk: 'Perfuração da mão.', epi: 'Óculos.', care: 'Nunca use como alavanca, marreta ou formão. Use o tamanho correto.' },
                { name: 'Chave Inglesa', risk: 'Lesões por escorregamento.', epi: 'Luvas.', care: 'Ajuste firmemente. Puxe a chave em sua direção.' },
                { name: 'Machadinha', risk: 'Cortes graves.', epi: 'Óculos, Luvas, Botas.', care: 'Mantenha afiada e com capa. Cuidado com a área de balanço.' },
                { name: 'Arco de Serra', risk: 'Cortes, quebra da lâmina.', epi: 'Óculos, Luvas.', care: 'Tensione corretamente a lâmina.' },
                { name: 'Raspador / Espátula', risk: 'Cortes e perfurações.', epi: 'Luvas resistentes.', care: 'Mantenha as mãos atrás da linha de corte.' },
            ]
        },
        {
            id: 'eletricas',
            title: 'Ferramentas Elétricas',
            subtitle: '10 Itens de Atenção',
            image: require('../assets/images/sinitox/animais/pow_tools.png'),
            imagemUrl: 'https://images.pexels.com/photos/30413428/pexels-photo-30413428.jpeg?auto=compress&cs=tinysrgb&w=1200',
            color: '#D32F2F',
            icon: 'Flash',
            items: [
                { name: 'Furadeira / Parafusadeira', risk: 'Perfuração, choque, ruído.', epi: 'Óculos, Protetor Auricular.', care: 'Verifique paredes antes de furar. Segure firme.' },
                { name: 'Serra Tico-Tico', risk: 'Cortes, projeção de cavacos.', epi: 'Óculos, Máscara, Protetor Auricular.', care: 'Prenda a peça. Espere a lâmina parar antes de pousar.' },
                { name: 'Lixadeira Orbital', risk: 'Vibração, poeira, ruído.', epi: 'Máscara, Óculos, Protetor Auricular.', care: 'Use saco coletor. Limpe o pó acumulado.' },
                { name: 'Esmerilhadeira', risk: 'Quebra do disco, queimaduras.', epi: 'Óculos, Protetor Facial, Luvas Couro.', care: 'Mantenha a capa de proteção. Nunca use disco de corte para desbastar.' },
                { name: 'Serra Circular', risk: 'Amputação, cortes, ruído.', epi: 'Óculos, Protetor Auricular.', care: 'Nunca trave a guarda de segurança. Verifique cabos.' },
                { name: 'Tupia Manual', risk: 'Cortes graves.', epi: 'Óculos, Protetor Auricular.', care: 'Prenda a peça firmemente. Remova a fresa após uso.' },
                { name: 'Pistola de Cola Quente', risk: 'Queimaduras.', epi: 'Luvas.', care: 'Não toque no bico. Espere esfriar para guardar.' },
                { name: 'Soprador Térmico', risk: 'Queimaduras, incêndio.', epi: 'Luvas térmicas, Óculos.', care: 'Longe de inflamáveis. Deixe esfriar antes de guardar.' },
                { name: 'Plaina Elétrica', risk: 'Cortes graves.', epi: 'Óculos, Protetor Auricular.', care: 'Mãos longe da área de corte. Proteja as lâminas.' },
                { name: 'Serra Mármore (Makita)', risk: 'Cortes profundos, poeira.', epi: 'Máscara PFF2, Óculos, Protetor Auricular.', care: 'Use com água. Nunca use disco de madeira.' },
            ]
        },
        {
            id: 'motorizadas',
            title: 'Motorizadas & Pesadas',
            subtitle: '10 Itens de Alto Risco',
            image: require('../assets/images/sinitox/animais/pow_tools.png'), // Reusing power tools image for now
            imagemUrl: 'https://images.pexels.com/photos/4206054/pexels-photo-4206054.jpeg?auto=compress&cs=tinysrgb&w=1200',
            color: '#455A64',
            icon: 'Setting4',
            items: [
                { name: 'Roçadeira', risk: 'Projeção de pedras, ruído.', epi: 'Óculos, Protetor Facial, Botas, Calça, Protetor Auricular.', care: 'Inspecione a área. Mantenha distância de pessoas.' },
                { name: 'Motosserra', risk: 'Risco EXTREMO de amputação.', epi: 'Capacete, Luvas, Calça Anticorte, Protetor Auricular.', care: 'Duas mãos firmes. Nunca corte acima do ombro.' },
                { name: 'Lavadora Alta Pressão', risk: 'Injeção de água, choque.', epi: 'Óculos, Botas de Borracha.', care: 'Nunca aponte para pessoas. Use tomada com DR.' },
                { name: 'Furadeira de Bancada', risk: 'Aprisionamento (roupas/cabelo).', epi: 'Óculos, Protetor Auricular.', care: 'NÃO use luvas. Prenda a peça firmemente.' },
                { name: 'Compressor de Ar', risk: 'Explosão, pressão, ruído.', epi: 'Protetor Auricular, Óculos.', care: 'Drene a umidade regularmente. Nunca aponte para o corpo.' },
                { name: 'Serra de Mesa', risk: 'Risco EXTREMO de amputação.', epi: 'Óculos, Protetor Auricular.', care: 'Use "push stick" para peças pequenas. Mantenha a guarda.' },
                { name: 'Cortador de Grama', risk: 'Cortes, projeção.', epi: 'Óculos, Botas.', care: 'Inspecione a área. Espere lâmina parar para limpar.' },
                { name: 'Serra de Esquadria', risk: 'Cortes e amputação.', epi: 'Óculos, Protetor Auricular.', care: 'Prenda a peça. Mãos longe da linha de corte.' },
                { name: 'Gerador Portátil', risk: 'Intoxicação (CO), choque.', epi: 'Luvas, Protetor Auricular.', care: 'NUNCA use em local fechado. Apenas ao ar livre.' },
                { name: 'Bomba Submersa', risk: 'Choque elétrico.', epi: 'Luvas/Botas de Borracha.', care: 'Verifique cabos. Use disjuntor DR.' },
            ]
        }
    ]
};
