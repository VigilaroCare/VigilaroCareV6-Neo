/**
 * verify_respostas_vistoria.js — D18: a resposta da vistoria sobrevive a
 * revisao de texto, a troca de idioma e a gravacao por telas diferentes.
 *
 * Carrega o ChecklistService REAL (ESM -> CJS via Babel) com AsyncStorage em
 * memoria, e confere:
 *   1. todo item de mapeamento_dados tem id unico, no formato <ambiente>_<nn>;
 *   2. TITULOS_ANTERIORES aponta para ids que existem;
 *   3. migracao: lista antiga (id posicional, texto antigo), mapa antigo
 *      (revisao de pendencias) e passos do roteiro no mesmo balde;
 *   4. gravar em mapa sobre balde lista NAO perde a resposta (o defeito antigo);
 *   5. as respostas continuam casando depois de migradas.
 *
 * Uso: node scripts/verify_respostas_vistoria.js
 */
const path = require('path');
const fs = require('fs');
const Module = require('module');
const babel = require('@babel/core');

const RAIZ = path.join(__dirname, '..');

// --- ESM -> CJS sob demanda, so para ficheiros do projeto -------------------
const compilarOriginal = Module.prototype._compile;
Module.prototype._compile = function (codigo, ficheiro) {
    if (ficheiro.startsWith(RAIZ) && !ficheiro.includes('node_modules') && /^\s*(import|export)\s/m.test(codigo)) {
        codigo = babel.transformSync(codigo, {
            filename: ficheiro, babelrc: false, configFile: false,
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        }).code;
    }
    return compilarOriginal.call(this, codigo, ficheiro);
};

// --- Dublês ------------------------------------------------------------------
const disco = {};
const dubles = {
    '@react-native-async-storage/async-storage': {
        default: {
            getItem: async (k) => (k in disco ? disco[k] : null),
            setItem: async (k, v) => { disco[k] = v; },
            removeItem: async (k) => { delete disco[k]; },
        },
    },
    './TimelineService': { default: { logMelhoria: () => {} } },
    './AchievementService': { default: { grantChecklistPoint: () => {}, grantFirstInspection: () => {} } },
    './ProfileService': { default: { getActiveResidenceId: async () => 'casa1' } },
    '../utils/ProfileFilterEngine': { isItemRelevant: () => true, getRoomChecklistStructure: () => null },
};
const resolverOriginal = Module._load;
Module._load = function (pedido, pai, ...resto) {
    if (pedido in dubles) return { __esModule: true, ...dubles[pedido] };
    return resolverOriginal.call(this, pedido, pai, ...resto);
};
global.__DEV__ = false;

const { CHECKLISTS, TITULOS_ANTERIORES } = require('../data/mapeamento_dados');
const { ChecklistService: CS } = require('../services/ChecklistService');

let falhas = 0;
const ok = (cond, msg) => { console.log(`  ${cond ? 'OK   ' : 'FALHA'} ${msg}`); if (!cond) falhas++; };

(async () => {
    console.log('1. ids dos itens');
    const ids = new Set();
    let total = 0; let semId = 0; let dup = 0; let foraDoPadrao = 0;
    for (const [area, def] of Object.entries(CHECKLISTS)) {
        for (const cat of def.categorias || []) for (const item of cat.itens || []) {
            total++;
            if (!item.id) { semId++; continue; }
            if (ids.has(item.id)) dup++;
            ids.add(item.id);
            if (!new RegExp(`^${area}_\\d{2,}$`).test(item.id)) foraDoPadrao++;
        }
    }
    ok(semId === 0, `${total} itens, ${semId} sem id`);
    ok(dup === 0, `${dup} id(s) duplicado(s)`);
    ok(foraDoPadrao === 0, `${foraDoPadrao} id(s) fora do padrao <ambiente>_<nn>`);

    console.log('2. titulos anteriores');
    const orfaos = Object.keys(TITULOS_ANTERIORES).filter((id) => !ids.has(id));
    ok(orfaos.length === 0, `TITULOS_ANTERIORES aponta para ids existentes${orfaos.length ? ': ' + orfaos : ''}`);

    console.log('3. migracao do estado antigo');
    const t = (id) => {
        const [area] = id.split(/_(?=\d+$)/);
        for (const cat of CHECKLISTS[area].categorias) for (const it of cat.itens) if (it.id === id) return it;
        return null;
    };
    const coz1 = t('cozinha_01'); const coz2 = t('cozinha_02');
    disco['@checklist_state_casa1'] = JSON.stringify({
        // vistoria guiada antiga: id posicional, texto antigo (antes de "produtos químicos")
        cozinha: [
            { id: 'cozinha--1', text: coz1.titulo, status: 'conforme', checked: true, itemObj: { pesado: true } },
            { id: 'cozinha--2', text: 'Químicos não são transferidos para embalagens de alimentos (garrafa pet, potes)', status: 'risco' },
            { id: 'cozinha--3', text: 'Item que deixou de existir', status: 'na' },
        ],
        // revisao de pendencias antiga gravou mapa; roteiro das areas no mesmo balde
        quarto_crianca: {
            'Brinquedos possuem o selo de certificação do Inmetro': true,
            'Passo do roteiro que não é item de vistoria': 'na',
        },
        // roteiro de area sem vistoria propria
        bedroom_baby: { 'Algum passo': true },
        custom_Grupo: { qualquer: true },
    });
    const estado = await CS.getAllState('casa1');
    const coz = estado.cozinha;
    ok(Array.isArray(coz), 'cozinha virou lista');
    ok(CS.respostaDe(coz, coz1) === 'conforme', 'cozinha_01 conforme (casado pelo texto, ganhou id)');
    ok(CS.respostaDe(coz, t('cozinha_18')) === 'risco', 'cozinha_18 risco (texto ANTERIOR reconhecido)');
    ok(coz.some((e) => e.text === 'Item que deixou de existir'), 'resposta sem item correspondente preservada');
    ok(!coz.some((e) => e.itemObj), 'objetos pesados (itemObj) removidos');
    ok(Array.isArray(estado.quarto_crianca), 'quarto_crianca (mapa) virou lista');
    ok(CS.respostaDe(estado.quarto_crianca, t('quarto_crianca_01')) === 'conforme', 'selo Inmetro (texto anterior) -> quarto_crianca_01 conforme');
    ok(estado.roteiro_quarto_crianca && estado.roteiro_quarto_crianca['Passo do roteiro que não é item de vistoria'] === 'na', 'passo do roteiro foi para roteiro_quarto_crianca');
    ok(!estado.bedroom_baby && estado.roteiro_bedroom_baby && estado.roteiro_bedroom_baby['Algum passo'] === true, 'bedroom_baby foi para roteiro_bedroom_baby');
    ok(estado.custom_Grupo && estado.custom_Grupo.qualquer === true, 'custom_* intocado');
    const relido = JSON.parse(disco['@checklist_state_casa1']);
    ok(Array.isArray(relido.cozinha), 'migracao persistida no storage');
    const { mudou } = CS.migrarEstado(relido);
    ok(!mudou, 'migracao e idempotente (segunda passada nao muda nada)');

    console.log('4. gravacao por telas diferentes no mesmo balde');
    CS.clearCache();
    await CS.saveItemState('cozinha', { id: coz2.id, titulo: coz2.titulo }, true, 'casa1');      // revisao de pendencias
    await CS.saveItemState('cozinha', coz1.titulo, 'na', 'casa1');                                 // chamada legada por titulo
    await CS.saveRoteiroState('cozinha', 'Passo X', true, 'casa1');                                // roteiro
    const depois = JSON.parse(disco['@checklist_state_casa1']);
    ok(CS.respostaDe(depois.cozinha, coz2) === 'conforme', 'gravacao "mapa" sobre balde lista NAO se perde');
    ok(CS.respostaDe(depois.cozinha, coz1) === 'na', 'gravacao por titulo resolve o id');
    ok(CS.respostaDe(depois.cozinha, t('cozinha_18')) === 'risco', 'outras respostas do ambiente intactas');
    ok(depois.roteiro_cozinha && depois.roteiro_cozinha['Passo X'] === true, 'roteiro gravado no proprio balde');
    await CS.saveItemState('cozinha', coz1, null, 'casa1');
    ok(CS.respostaDe(JSON.parse(disco['@checklist_state_casa1']).cozinha, coz1) === null, 'null apaga a resposta');
    const gravou = await CS.saveItemState('cozinha', 'texto que nao e item', true, 'casa1');
    ok(gravou === false, 'texto desconhecido nao cria resposta fantasma');

    console.log('5. o texto do item muda e a resposta fica');
    const revisado = { ...coz2, titulo: coz2.titulo + ' (texto revisado)' };
    ok(CS.respostaDe(depois.cozinha, revisado) === 'conforme', 'mesmo id, titulo novo: resposta mantida');

    console.log(falhas ? `\nRESULTADO: ${falhas} falha(s)` : '\nRESULTADO: aprovado');
    process.exit(falhas ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
