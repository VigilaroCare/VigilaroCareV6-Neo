/**
 * gerar_revisao_radar.js — documento Word para o Agnaldo revisar o Radar
 * sazonal (D17): as 64 janelas de risco por país e os alertas oficiais.
 *
 * Mesmo layout e mesmo formato de manifesto do gerador principal, mas com
 * manifesto PRÓPRIO (_manifesto-RS.json): não mexe no _manifesto.json dos
 * documentos PS/ED/AE/EX. Para ler a revisão de volta:
 *   node scripts/importar_revisao_conteudo.js docs/revisao-conteudo/RS-Radar-Sazonal.docx \
 *        --manifesto docs/revisao-conteudo/_manifesto-RS.json
 *
 * Revisa-se o texto-base (português). As traduções acompanham depois com
 * scripts/sincronizar_traducoes.js. As janelas de Portugal estão escritas em
 * português de Portugal de propósito.
 *
 * Segurança (mesma regra do gerador principal): não sobrescreve um documento
 * modificado no git — pode conter a revisão em andamento — e guarda cópia
 * .anterior-* de qualquer versão que substitua.
 *
 * Uso: node scripts/gerar_revisao_radar.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { Packer } = require('docx');
const { extrair, montarDocumento } = require('./gerar_revisao_conteudo');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'docs', 'revisao-conteudo');
const NOME = 'RS-Radar-Sazonal.docx';

const FONTES = [
    { arquivo: 'data/radarSazonal/br.js', rotulo: 'Brasil' },
    { arquivo: 'data/radarSazonal/pt.js', rotulo: 'Portugal (texto em português de Portugal)' },
    { arquivo: 'data/radarSazonal/es.js', rotulo: 'Espanha' },
    { arquivo: 'data/radarSazonal/gb.js', rotulo: 'Reino Unido' },
    { arquivo: 'data/radarSazonal/us.js', rotulo: 'Estados Unidos' },
    { arquivo: 'data/radarSazonal/mx.js', rotulo: 'México' },
    { arquivo: 'data/radarSazonal/index.js', rotulo: 'Europa e alertas oficiais de cada país' },
];

async function principal() {
    const destino = path.join(DESTINO, NOME);
    if (fs.existsSync(destino)) {
        let modificado = false;
        try { modificado = execSync(`git status --porcelain -- "${destino}"`, { cwd: RAIZ }).toString().trim() !== ''; } catch { /* fora do git */ }
        if (modificado) {
            console.error(`${NOME} está modificado no git (revisão em andamento?). Nada foi escrito.`);
            process.exit(1);
        }
        const selo = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
        fs.copyFileSync(destino, `${destino}.anterior-${selo}`);
    }

    const dados = [];
    for (const fonte of FONTES) {
        const r = extrair(fonte.arquivo);
        if (r.ausente || !r.blocos.length) { console.warn(`  ! nada extraído de ${fonte.arquivo}`); continue; }
        dados.push({ ...fonte, blocos: r.blocos });
    }

    const tema = {
        nome: 'Radar Sazonal',
        sigla: 'RS',
        descricao: 'Os riscos de cada época do ano, por país, que o Radar da Prevenção mostra e avisa '
            + 'no celular. Cada janela tem título, resumo e orientações; a fonte oficial fica registrada '
            + 'no código. Revise o português; as traduções (inglês e espanhol) acompanham a sua revisão. '
            + 'As janelas de Portugal estão escritas em português de Portugal de propósito, porque quem '
            + 'as lê está em Portugal.',
    };
    const manifesto = {};
    const doc = montarDocumento(tema, dados, manifesto);
    fs.writeFileSync(destino, await Packer.toBuffer(doc));
    fs.writeFileSync(path.join(DESTINO, '_manifesto-RS.json'), JSON.stringify(manifesto, null, 1));
    console.log(`${NOME}: ${Object.keys(manifesto).length} códigos (títulos e textos)`);
}

principal().catch((e) => { console.error(e); process.exit(1); });
