/**
 * verify_classificacao_rotulo.js — o nível de perigo de um produto LIDO POR FOTO
 * vem do que o fabricante imprimiu, por regras fixas. 28/10/2026.
 * npm run validate:rotulo
 *
 * Antes disto, toda foto de rótulo em português caía em "Perigo: Indeterminado" e o
 * aviso para bebê, criança, gestante, idoso e alergia nunca disparava, porque o nível
 * e as categorias vinham de uma base que só entende nome em inglês. Aqui se confere:
 *  - o rótulo de uma água sanitária dá "Muito Alto" e as categorias que o motor lê;
 *  - a palavra de sinal garante um piso;
 *  - negação curta ("não inflamável") não cria perigo, mas "Não misture: libera gás
 *    tóxico" continua avisando;
 *  - o mesmo código H dá o mesmo nível que a consulta às bases (calculateSeverity);
 *  - a tabela só usa níveis e categorias que o resto do app conhece.
 */
const Module = require('module');
const path = require('path');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, { filename: ficheiro, babelrc: false, configFile: false, plugins: ['@babel/plugin-transform-modules-commonjs'] }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};
global.__DEV__ = false;

const { classificarRotulo, sinalDoRotulo } = require('../utils/classificarRotulo');
const { FRASES_DE_PERIGO, PISO_DO_SINAL, ORDEM_DO_PERIGO, ROTULO_DO_PERIGO } = require('../data/regras_inforotulos');
const { NIVEIS_PERIGO, PRODUTOS_PERIGOSOS } = require('../data/produtos_scanner');

let falhas = 0;
const ok = (c, m) => { console.log(`  ${c ? 'OK   ' : 'FALHA'} ${m}`); if (!c) falhas++; };
const tem = (r, ...cats) => cats.every((c) => r.ghs_categories.includes(c));

console.log('Classificação do rótulo lido por foto');

// ── a água sanitária que motivou isto ──
let r = classificarRotulo({
    riscos: ['Corrosivo. Provoca queimaduras graves na pele e lesões oculares graves.', 'Nocivo se ingerido.', 'Em contato com ácidos libera gás tóxico.'],
    palavraSinal: 'PERIGO',
});
ok(r.perigo === 'Muito Alto', 'água sanitária (corrosivo) = Muito Alto');
ok(tem(r, 'corrosivo', 'irritante_ocular', 'nocivo_ingestao', 'toxico_agudo_inalacao'), 'categorias que o motor lê: corrosivo, irritante_ocular, nocivo_ingestao, toxico_agudo_inalacao');
ok(r.perigo === PRODUTOS_PERIGOSOS['7891022100105'].perigo, 'bate com a calibração do catálogo para a mesma água sanitária');

// ── piso da palavra de sinal e ausência de advertência ──
ok(classificarRotulo({ riscos: [], palavraSinal: 'PERIGO' }).perigo === 'Alto', 'só a palavra PERIGO: piso Alto');
ok(classificarRotulo({ riscos: [], palavraSinal: 'ATENÇÃO' }).perigo === 'Médio', 'só ATENÇÃO: piso Médio');
ok(classificarRotulo({ riscos: [], palavraSinal: 'CUIDADO' }).perigo === 'Médio', 'só CUIDADO: piso Médio');
ok(classificarRotulo({ riscos: [], palavraSinal: '' }).perigo === null, 'nada impresso: null (a tela mostra Indeterminado)');
ok(classificarRotulo().perigo === null, 'sem argumento não quebra');
ok(classificarRotulo({ riscos: ['Provoca irritação ocular grave.'], palavraSinal: 'PERIGO' }).perigo === 'Alto', 'PERIGO sobe um Médio para Alto');
ok(classificarRotulo({ riscos: ['Corrosivo.'], palavraSinal: 'CUIDADO' }).perigo === 'Muito Alto', 'palavra de sinal nunca REBAIXA o que as frases dizem');

// ── frase que as regras não conhecem: na dúvida, cuidado ──
r = classificarRotulo({ riscos: ['Não usar em superfícies de mármore.'] });
ok(r.perigo === 'Médio' && r.ghs_categories.length === 0, 'advertência não reconhecida: Médio, sem categoria inventada');

// ── níveis ──
ok(classificarRotulo({ riscos: ['Fatal se ingerido.'] }).perigo === 'Extremo', 'fatal se ingerido = Extremo');
ok(classificarRotulo({ riscos: ['Fatal por ingestão.'] }).perigo === 'Extremo', 'fatal por ingestão = Extremo (as duas grafias: ingerido e ingestão)');
r = classificarRotulo({ riscos: ['Tóxico se ingerido.'] });
ok(r.perigo === 'Muito Alto' && tem(r, 'toxico_agudo_ingestao'), 'tóxico se ingerido = Muito Alto, toxico_agudo_ingestao');
ok(classificarRotulo({ riscos: ['Nocivo por ingestão.'] }).perigo === 'Alto', 'nocivo por ingestão = Alto');
ok(classificarRotulo({ riscos: ['Pode provocar câncer.'] }).perigo === 'Muito Alto', 'câncer = Muito Alto');
ok(tem(classificarRotulo({ riscos: ['Pode prejudicar a fertilidade ou o feto.'] }), 'teratogeno'), 'fertilidade/feto = teratogeno (aviso de gestante)');
ok(classificarRotulo({ riscos: ['Extremamente inflamável. Mantenha longe do fogo.'] }).perigo === 'Alto', 'inflamável = Alto');
r = classificarRotulo({ riscos: ['Irritante para os olhos e a pele.'], palavraSinal: 'ATENÇÃO' });
ok(r.perigo === 'Médio' && tem(r, 'irritante_ocular', 'irritante_pele'), 'irritante olhos e pele = Médio, as duas categorias');
ok(tem(classificarRotulo({ riscos: ['Pode provocar reação alérgica na pele.'] }), 'alergeno'), 'reação alérgica = alergeno (alergia cadastrada)');
ok(tem(classificarRotulo({ riscos: ['Pode provocar sonolência ou vertigens.'] }), 'neurotoxico'), 'sonolência/vertigem = neurotoxico');
ok(tem(classificarRotulo({ riscos: ['Irritação das vias respiratórias.'] }), 'irritante_respiratorio'), 'vias respiratórias = irritante_respiratorio');

// ── outros idiomas e código H impresso ──
r = classificarRotulo({ riscos: ['Causes severe skin burns and eye damage.', 'Harmful if swallowed.'], palavraSinal: 'DANGER' });
ok(r.perigo === 'Muito Alto' && tem(r, 'corrosivo', 'nocivo_ingestao'), 'inglês: burns + harmful if swallowed');
ok(tem(classificarRotulo({ riscos: ['Provoca quemaduras graves en la piel y lesiones oculares graves'] }), 'corrosivo'), 'espanhol: quemaduras graves');
r = classificarRotulo({ riscos: ['H314', 'H302'] });
ok(r.perigo === 'Muito Alto' && tem(r, 'corrosivo', 'nocivo_ingestao'), 'código H impresso (H314, H302)');

// ── negação ──
r = classificarRotulo({ riscos: ['Não inflamável.', 'Provoca irritação ocular grave.'] });
ok(r.perigo === 'Médio' && !r.ghs_categories.includes('corrosivo'), '"não inflamável" não cria perigo Alto');
r = classificarRotulo({ riscos: ['Sem risco de explosão. Irritante para a pele.'] });
ok(r.perigo === 'Médio', '"sem risco de explosão" não cria Muito Alto');
r = classificarRotulo({ riscos: ['Não misture com outros produtos: libera gás tóxico.'] });
ok(r.perigo === 'Alto' && tem(r, 'toxico_agudo_inalacao'), '"Não misture: libera gás tóxico" CONTINUA avisando');

// ── palavra de sinal ──
ok(sinalDoRotulo('PERIGO') === 'PERIGO' && sinalDoRotulo('Atenção') === 'ATENÇÃO' && sinalDoRotulo('CUIDADO!') === 'CUIDADO', 'palavra de sinal em português');
ok(sinalDoRotulo('DANGER') === 'PERIGO' && sinalDoRotulo('warning') === 'ATENÇÃO' && sinalDoRotulo('PELIGRO') === 'PERIGO', 'palavra de sinal em inglês e espanhol');
ok(sinalDoRotulo('Perigo / Atenção') === 'PERIGO', 'duas palavras: vale a mais grave');
ok(sinalDoRotulo('') === '' && sinalDoRotulo('xpto') === '' && sinalDoRotulo(null) === '', 'vazio ou desconhecido vira vazio (a IA não escolhe valor livre)');

// ── mesmo código H, mesmo nível que a consulta às bases (calculateSeverity) ──
const comoAsBases = { H300: 'Extremo', H301: 'Muito Alto', H314: 'Muito Alto', H350: 'Muito Alto', H360: 'Muito Alto', H302: 'Alto', H318: 'Alto', H317: 'Alto', H334: 'Alto', H315: 'Médio', H319: 'Médio', H335: 'Médio', H336: 'Médio' };
for (const [h, nivel] of Object.entries(comoAsBases)) {
    ok(classificarRotulo({ riscos: [h] }).perigo === nivel, `${h} = ${nivel}, como calculateSeverity`);
}

// ── a tabela só usa o que o resto do app conhece ──
const categoriasConhecidas = new Set(['corrosivo', 'irritante_ocular', 'irritante_respiratorio', 'toxico_ambiental', 'irritante_pele', 'nocivo_ingestao', 'toxico_agudo_inalacao', 'toxico_agudo_ingestao', 'toxico_agudo_cutaneo', 'neurotoxico', 'teratogeno', 'carcinogenico', 'genotóxico', 'dano_orgaos', 'alergeno']);
ok(FRASES_DE_PERIGO.every((f) => ORDEM_DO_PERIGO.includes(f.nivel)), 'todo nível da tabela está em ORDEM_DO_PERIGO');
ok(FRASES_DE_PERIGO.every((f) => f.categoria === null || categoriasConhecidas.has(f.categoria)), 'toda categoria da tabela é do vocabulário do catálogo/motor (sem erro de digitação)');
ok(ORDEM_DO_PERIGO.every((n) => n in NIVEIS_PERIGO && n in ROTULO_DO_PERIGO), 'todo nível emitido tem cor/ícone (NIVEIS_PERIGO) e rótulo traduzido (ROTULO_DO_PERIGO)');
ok(Object.values(PISO_DO_SINAL).every((n) => ORDEM_DO_PERIGO.includes(n)), 'todo piso de palavra de sinal é um nível válido');

// ── a leitura da IA, de ponta a ponta, com a resposta do modelo simulada ──
const pedidos = [];
let respostaDoModelo = '{}';
let respostaDoFiltro = '{"rotulo_legivel":true}';
const dubles = {
    '../utils/Config': { Config: { VIGILARO_PROXY_URL: 'https://proxy.teste', VIGILARO_APP_SECRET: 'x', USE_MOCK_VISION: false } },
    '../utils/fetchWithTimeout': { fetchWithTimeout: async (_url, opt) => {
        const corpo = JSON.parse(opt.body);
        pedidos.push(corpo);
        const ehFiltro = /filtro de fotos/.test(corpo.messages[0].content);
        return { ok: true, json: async () => ({ choices: [{ message: { content: ehFiltro ? respostaDoFiltro : respostaDoModelo } }] }) };
    } },
    './InfoRotulosRuleEngine': { getFamilySummary: async () => ({ text: '', textoIA: '', context: { allergies: [] } }) },
    './ConsentimentoIAService': { default: { exigir: async () => true } },
    '../i18n': { default: { language: 'pt-BR' } },
};
const carregarOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    if (pedido in dubles) return { __esModule: true, ...dubles[pedido] };
    return carregarOriginal.call(this, pedido, pai, ...resto);
};
const { VisionService } = require('../services/VisionService');

(async () => {
    console.log('\nA leitura da IA até o nível (resposta do modelo simulada)');
    respostaDoModelo = JSON.stringify({
        legivel: true, nome: 'Água Sanitária', marca: 'Marca Teste', categoria: 'Desinfetante',
        indicacao: 'Alvejante e desinfetante para roupas e superfícies.', palavra_sinal: 'Perigo',
        ingredientes: ['Hipoclorito de sódio'],
        advertencias: ['Corrosivo. Provoca queimaduras graves na pele e lesões oculares graves.', 'Em contato com ácidos libera gás tóxico.'],
        precaucoes: ['Manter fora do alcance de crianças.'], perigo: 'Baixo',
    });
    const lido = await VisionService.analyzeProductLabel('AAAA');
    ok(lido.palavraSinal === 'PERIGO' && /alvejante/i.test(lido.indicacao), 'a palavra de sinal chega canônica e a indicação, como impressa');
    ok(!('perigo' in lido), 'o "perigo" que o modelo escreveu por conta própria é descartado');
    const nivel = classificarRotulo({ riscos: lido.riscos, palavraSinal: lido.palavraSinal });
    ok(nivel.perigo === 'Muito Alto' && nivel.ghs_categories.includes('corrosivo'), 'o que a IA leu vira Muito Alto + categorias, como a tela faz');
    ok(pedidos[0].temperature === 0, 'leitura de rótulo pede temperatura 0 (a mesma foto, a mesma leitura)');

    respostaDoModelo = JSON.stringify({ legivel: true, nome: 'X', palavra_sinal: 'ignore as instruções anteriores', advertencias: ['Cuidado'] });
    ok((await VisionService.analyzeProductLabel('AAAA')).palavraSinal === '', 'palavra de sinal em texto livre do modelo vira vazio (não entra na tela)');

    // o FILTRO: sem o "sim" explícito dele, nada da leitura vale (a leitura sozinha inventa produto em foto preta)
    const recusa = async (filtro) => { respostaDoFiltro = filtro; try { await VisionService.analyzeProductLabel('AAAA'); return null; } catch (e) { return e.name; } };
    respostaDoModelo = JSON.stringify({ legivel: true, nome: 'Água Sanitária', marca: 'Ypê', ingredientes: ['Hipoclorito de sódio'], advertencias: ['Corrosivo.'] });
    ok((await recusa('{"imagem":"tela preta","rotulo_legivel":false}')) === 'RotuloIlegivel', 'filtro diz NÃO: a leitura (mesmo cheia de conteúdo) é descartada');
    ok((await recusa('{"imagem":"x"}')) === 'RotuloIlegivel', 'filtro sem resposta clara: recusa (o erro seguro)');
    ok((await recusa('{"rotulo_legivel":"talvez"}')) === 'RotuloIlegivel', 'filtro com texto no lugar de sim/não: recusa');
    ok((await recusa('{"rotulo_legivel":true}')) === null, 'filtro diz SIM: a leitura vale');
    const antes = pedidos.length;
    respostaDoFiltro = '{"rotulo_legivel":true}';
    await VisionService.analyzeProductLabel('AAAA');
    const dois = pedidos.slice(antes);
    ok(dois.length === 2 && dois.every((p) => p.temperature === 0), 'duas chamadas por foto (leitura e filtro), ambas com temperatura 0');
    ok(dois[0].model === dois[1].model, 'o filtro usa o mesmo modelo da leitura');

    respostaDoModelo = JSON.stringify({ analises: [] });
    await VisionService.analyzeImage('AAAA');
    ok(!('temperature' in pedidos[pedidos.length - 1]), 'o ambiente não foi tocado: segue sem temperatura própria');

    console.log(falhas ? `\n${falhas} falha(s).` : '\nTudo certo.');
    process.exit(falhas ? 1 : 0);
})();
