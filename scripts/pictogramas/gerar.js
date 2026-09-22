/**
 * gerar.js — gera pictogramas cerâmicos pela API de imagens da OpenAI.
 *
 * Roda na máquina do autor, em tempo de projeto. NÃO é recurso do app: nada
 * disto vai para o bundle nem passa pelo backend-proxy, então nenhum cliente
 * consegue disparar geração de imagem (que é cara).
 *
 * Uso:
 *   node scripts/pictogramas/gerar.js --lote home            # todas as peças da Home
 *   node scripts/pictogramas/gerar.js --lote home --so vistorias,saude-pet
 *   node scripts/pictogramas/gerar.js --lote home --modelo gpt-image-2
 *
 * Saída: assets/illustrations/_gerados/<nome>.png  +  manifesto.json
 *
 * PROCEDÊNCIA: cada peça entra no manifesto com modelo, data e o prompt exato.
 * É a evidência de origem que faltou no acervo anterior — e que sustenta o
 * registro em docs/CONFORMIDADE_IA_E_DIREITOS.md. Pela API, os termos da
 * OpenAI cedem os direitos da saída ao titular da conta.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..', '..');
require('dotenv').config({ path: path.join(RAIZ, 'backend-proxy', '.env') });

const { montarPrompt, HOME } = require('./spec');

const LOTES = { home: HOME };
const SAIDA = path.join(RAIZ, 'assets', 'illustrations', '_gerados');
const MANIFESTO = path.join(SAIDA, 'manifesto.json');
const MODELO_PADRAO = 'gpt-image-2';

function args() {
    const a = process.argv.slice(2);
    const get = (nome, padrao) => {
        const i = a.indexOf('--' + nome);
        return i >= 0 && a[i + 1] ? a[i + 1] : padrao;
    };
    return {
        lote: get('lote', 'home'),
        modelo: get('modelo', MODELO_PADRAO),
        so: get('so', null),
        tamanho: get('tamanho', '1024x1024'),
    };
}

async function gerarUma(peca, modelo, tamanho, chave) {
    const prompt = montarPrompt(peca.tema);
    const resp = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${chave}` },
        body: JSON.stringify({
            model: modelo,
            prompt,
            size: tamanho,
            // Fundo branco opaco de propósito — ver a nota em spec.js. O
            // recorte acontece no limpar.js, não no modelo.
            background: 'opaque',
            output_format: 'png',
            n: 1,
        }),
    });

    const json = await resp.json();
    if (!resp.ok) {
        // A mensagem da API pode citar o corpo enviado, nunca a chave.
        throw new Error(`${resp.status} — ${json?.error?.message || 'falha na API'}`);
    }

    const item = json.data?.[0];
    const b64 = item?.b64_json;
    if (!b64) throw new Error('resposta sem imagem');

    fs.mkdirSync(SAIDA, { recursive: true });
    const destino = path.join(SAIDA, `${peca.arquivo}.png`);
    fs.writeFileSync(destino, Buffer.from(b64, 'base64'));

    return {
        arquivo: `${peca.arquivo}.png`,
        tema: peca.tema,
        modelo,
        tamanho,
        promptEnviado: prompt,
        promptRevisado: item.revised_prompt || null,
        geradoEm: new Date().toISOString(),
        bytes: fs.statSync(destino).size,
    };
}

(async () => {
    const { lote, modelo, so, tamanho } = args();
    const chave = process.env.OPENAI_API_KEY;
    if (!chave) {
        console.error('OPENAI_API_KEY não encontrada em backend-proxy/.env.');
        process.exit(1);
    }

    let pecas = LOTES[lote];
    if (!pecas) {
        console.error(`Lote "${lote}" não existe. Disponíveis: ${Object.keys(LOTES).join(', ')}`);
        process.exit(1);
    }
    if (so) {
        const filtro = so.split(',').map((s) => s.trim());
        pecas = pecas.filter((p) => filtro.includes(p.arquivo));
    }

    console.log(`Gerando ${pecas.length} peça(s) do lote "${lote}" com ${modelo} em ${tamanho}.`);
    console.log('Isso consome créditos da conta OpenAI do projeto.\n');

    const manifesto = fs.existsSync(MANIFESTO)
        ? JSON.parse(fs.readFileSync(MANIFESTO, 'utf8'))
        : [];

    for (const peca of pecas) {
        process.stdout.write(`  ${peca.arquivo} ... `);
        try {
            const registro = await gerarUma(peca, modelo, tamanho, chave);
            // Substitui o registro anterior da mesma peça, se houver.
            const i = manifesto.findIndex((m) => m.arquivo === registro.arquivo);
            if (i >= 0) manifesto[i] = registro; else manifesto.push(registro);
            console.log(`ok (${(registro.bytes / 1024).toFixed(0)} KB)`);
        } catch (e) {
            console.log(`FALHOU — ${e.message}`);
        }
    }

    fs.writeFileSync(MANIFESTO, JSON.stringify(manifesto, null, 2), 'utf8');
    console.log(`\nArquivos em assets/illustrations/_gerados/`);
    console.log(`Procedência registrada em ${path.relative(RAIZ, MANIFESTO)}`);
})();
