/**
 * gerar_revisao_conteudo.js
 *
 * Gera documentos Word para o Agnaldo revisar o CONTEUDO do app — o texto que
 * ensina algo ao usuario, nao rotulo de botao.
 *
 * POR QUE ESTE SCRIPT EXISTE, tendo `gerar_conteudo_word.js`:
 * o primeiro exportou tudo (4.519 textos em 52 arquivos, tabela de 3 colunas
 * ID | Onde aparece | Texto). O Agnaldo revisou e disse que o formato "mostrou-se
 * trabalhoso": achar os paragrafos que importam no meio de rotulo de botao e
 * nome de icone e garimpo, nao revisao. Aqui a escolha e oposta:
 *
 *   - escopo por TEMA do app, nao por arquivo de dados;
 *   - so prosa — campo tecnico, URL, asset e traducao ficam de fora;
 *   - texto corre como documento, nao como celula de tabela;
 *   - o codigo de rastreio vive na mesma linha do paragrafo, cinza e 7pt:
 *     presente para o retorno, recessivo para a leitura.
 *
 * O escopo tambem corrige uma lacuna: a extracao original varreu apenas
 * `data/*.js` e nunca desceu em `data/locales/pt-BR/` nem `data/kits/`. Os 14
 * arquivos de lá — TODO o primeiros socorros, os guias de seguranca, os artigos
 * e o conteudo educativo dos kits — nunca foram enviados para revisao humana.
 *
 * Uso:
 *   node scripts/gerar_revisao_conteudo.js
 *
 * Saida: docs/revisao-conteudo/*.docx + _manifesto.json (ancora do reimport).
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
    TableOfContents, PageBreak, BorderStyle,
} = require('docx');

const RAIZ = path.resolve(__dirname, '..');
const DESTINO = path.join(RAIZ, 'docs', 'revisao-conteudo');

// ---------------------------------------------------------------------------
// ESCOPO — os quatro temas que o Agnaldo pediu, nas palavras dele:
// "conteudos de educacao, atividades eventuais, primeiros socorros e os
//  explicativos dos diversos pontos onde passamos conhecimento aos usuarios".
//
// `rotulo` e o nome que ele reconhece na navegacao do app, nao o nome do
// arquivo: o documento tem de parecer o app, nao o repositorio.
// ---------------------------------------------------------------------------
const TEMAS = [
    {
        nome: 'Primeiros Socorros',
        sigla: 'PS',
        descricao: 'O que fazer e o que nunca fazer em cada emergencia domestica. '
            + 'Nenhum destes textos passou por revisao humana ainda.',
        fontes: [
            { arquivo: 'data/locales/pt-BR/primeiros_socorros.js', rotulo: 'Primeiros socorros — pessoas' },
            { arquivo: 'data/locales/pt-BR/primeiros_socorros_pets.js', rotulo: 'Primeiros socorros — pets' },
            { arquivo: 'data/kits/first_aid.js', rotulo: 'Kit de primeiros socorros' },
        ],
    },
    {
        nome: 'Educacao',
        sigla: 'ED',
        descricao: 'Artigos, guias, micro-blog e o conteudo da Central de Conhecimento.',
        fontes: [
            { arquivo: 'data/knowledge_prevencao.js', rotulo: 'Central de Conhecimento' },
            { arquivo: 'data/micro_blog.js', rotulo: 'Micro-blog' },
            { arquivo: 'data/radarConteudoDB.js', rotulo: 'Radar de conteudo' },
            { arquivo: 'data/intro_safety.js', rotulo: 'Introducao a seguranca' },
            { arquivo: 'data/teoria_fogo.js', rotulo: 'Teoria do fogo' },
            { arquivo: 'data/fases_vida.js', rotulo: 'Fases da vida' },
            { arquivo: 'data/locales/pt-BR/SafetyArticlesDB.js', rotulo: 'Artigos de seguranca' },
            { arquivo: 'data/locales/pt-BR/guiasSeguranca.js', rotulo: 'Guias de seguranca' },
            { arquivo: 'data/locales/pt-BR/educational_guides.js', rotulo: 'Guias educativos' },
            { arquivo: 'data/locales/pt-BR/fire_prevention_content.js', rotulo: 'Prevencao de incendio' },
            { arquivo: 'data/kits/educational_content.js', rotulo: 'Conteudo educativo dos kits' },
        ],
    },
    {
        nome: 'Atividades Eventuais',
        sigla: 'AE',
        descricao: 'Ferias, viagem, escola, gestacao, condominio, obra, visita — '
            + 'as situacoes que mudam o risco da casa por um periodo.',
        fontes: [
            { arquivo: 'data/safety_vacation.js', rotulo: 'Ferias e viagem' },
            { arquivo: 'data/safety_school.js', rotulo: 'Volta as aulas' },
            { arquivo: 'data/safety_pregnant.js', rotulo: 'Gestacao' },
            { arquivo: 'data/safety_condo.js', rotulo: 'Condominio' },
            { arquivo: 'data/safety_gas.js', rotulo: 'Gas' },
            { arquivo: 'data/safety_fire.js', rotulo: 'Incendio' },
            { arquivo: 'data/safety_toys.js', rotulo: 'Brinquedos' },
            { arquivo: 'data/safety_mobility.js', rotulo: 'Mobilidade' },
            { arquivo: 'data/renovationChecklists.js', rotulo: 'Obra e reforma' },
            { arquivo: 'data/visitChecklists.js', rotulo: 'Visitas' },
            { arquivo: 'data/kits/bagagem_viagem.js', rotulo: 'Bagagem de viagem' },
            { arquivo: 'data/kits/emergency.js', rotulo: 'Kit de emergencia' },
            { arquivo: 'data/kits/tools.js', rotulo: 'Kit de ferramentas' },
            { arquivo: 'data/kits/medicines.js', rotulo: 'Kit de medicamentos' },
        ],
    },
    {
        nome: 'Explicativos',
        sigla: 'EX',
        descricao: 'Os textos que explicam POR QUE um ponto importa: consequencia '
            + 'do risco, como evitar, e a orientacao por perfil.',
        fontes: [
            { arquivo: 'data/tag_guidance.js', rotulo: 'Orientacao por tipo de risco' },
            // `data/delay_guidance.js` NAO entra: e codigo morto (nenhuma
            // referencia fora dele mesmo), resquicio da gestao de medicamentos
            // que foi refutada por questao legal. O conteudo de la e conduta
            // clinica sobre atraso de dose — justamente o que o app nao faz.
            // Mandar isso para revisao humana gastaria o tempo do Agnaldo com
            // texto que nao chega a tela nenhuma. O arquivo deve ser removido.
            { arquivo: 'data/riscos_fisicos.js', rotulo: 'Riscos fisicos' },
            { arquivo: 'data/locales/pt-BR/HazardDatabase.js', rotulo: 'Base de perigos' },
            { arquivo: 'data/locales/pt-BR/RiskCategories.js', rotulo: 'Categorias de risco' },
            { arquivo: 'data/neurodivergence_data.js', rotulo: 'Neurodivergencia' },
            { arquivo: 'data/mobilidade_data.js', rotulo: 'Mobilidade reduzida' },
            { arquivo: 'data/escola_segura_data.js', rotulo: 'Escola segura' },
            { arquivo: 'data/asilo_seguro_data.js', rotulo: 'Instituicao de longa permanencia' },
        ],
    },
];

// ---------------------------------------------------------------------------
// FILTROS
// ---------------------------------------------------------------------------

/** Campos tecnicos: nunca sao texto para humano ler. */
const CHAVES_TECNICAS = new Set([
    'id', 'icon', 'icone', 'iconName', 'color', 'cor', 'colors', 'gradient',
    'image', 'imagem', 'imagemUrl', 'imageUrl', 'capa', 'thumbnail', 'foto',
    'url', 'fullUrl', 'link', 'href', 'screen', 'tela', 'route', 'rota',
    'tipo', 'type', 'key', 'chave', 'tag', 'tags', 'slug', 'target',
    'categoria', 'category', 'severity', 'nivel', 'level', 'ordem', 'order',
    'fonte', 'source', 'autor', 'author', 'license', 'licenca', 'credito',
    'date', 'data', 'ano', 'version', 'versao', 'testID',
]);

/**
 * Sufixo de idioma. O Agnaldo revisa pt-BR; traducao sai depois, a partir do
 * texto aprovado. Deixar `texto_en` no documento dobraria o volume com texto
 * que ele nao vai revisar — e foi um dos motivos do formato anterior pesar.
 *
 * Precisa olhar a CADEIA de ancestrais, nao so a chave imediata: em
 * `data/kits/educational_content.js` existe `sections_es: [{ title, content }]`,
 * onde as chaves internas nao tem sufixo mas o bloco todo e espanhol.
 */
const SUFIXO_IDIOMA = /_(en|es|ptpt|pt_pt|ptPT)$/i;

/** Nao e prosa: caminho de asset, URL, hex, token puro. */
const NAO_E_PROSA = /^(https?:\/\/|\.{1,2}\/|@[a-z]|#[0-9a-fA-F]{3,8}$|[A-Z_]{3,}$)/;

/** Campos que sao prosa mesmo quando curtos (um passo de socorro e curto). */
const CHAVES_DE_PROSA = new Set([
    'texto', 'text', 'conteudo', 'content', 'descricao', 'description', 'desc',
    'detalhes', 'details', 'explicacao', 'resumo', 'summary', 'corpo', 'body',
    'dica', 'dicas', 'tip', 'porque', 'why', 'consequence', 'consequencia',
    'checkAction', 'acao', 'action', 'oQueFazer', 'oQueNaoFazer', 'comoEvitar',
    'prevencao', 'orientacoes', 'itens', 'items', 'passos', 'steps', 'label',
    'curto', 'medio', 'longo', 'sintomas', 'quandoChamarAjuda', 'observacao',
]);

/** Titulos: viram cabecalho no documento e tambem sao revisaveis. */
const CHAVES_DE_TITULO = new Set(['titulo', 'title', 'nome', 'name', 'pergunta']);

const MIN_PROSA_GENERICA = 70;
const MIN_PROSA_CONHECIDA = 25;

/**
 * Papel do campo, em portugues de gente.
 *
 * Sem isto o documento mente por omissao: em Primeiros Socorros, "Tire a pessoa
 * de perto do fogo" e "NAO estoure as bolhas" sairiam como paragrafos iguais, e
 * o Agnaldo nao teria como verificar se cada frase esta no campo certo — que e
 * exatamente o erro mais grave possivel aqui. Um texto de "o que fazer" parado
 * no campo "o que nao fazer" inverte a orientacao de emergencia.
 *
 * Campo ausente deste mapa e corpo de texto e nao precisa de rotulo.
 */
const PAPEL_DO_CAMPO = {
    'oQueFazer[]': 'O QUE FAZER',
    'oQueNaoFazer[]': 'O QUE NUNCA FAZER',
    quandoChamarAjuda: 'QUANDO CHAMAR AJUDA',
    sintomas: 'SINTOMAS',
    primeirosSocorros: 'PRIMEIROS SOCORROS',
    'comoEvitar[]': 'COMO EVITAR',
    'comoIdentificar[]': 'COMO IDENTIFICAR',
    'prevencao[]': 'PREVENCAO',
    'orientacoes[]': 'ORIENTACOES',
    'alertas[]': 'ALERTAS',
    'keyPoints[]': 'PONTOS-CHAVE',
    'steps[]': 'PASSOS',
    'itens[]': 'ITENS',
    'items[]': 'ITENS',
    'caracteristicas[]': 'CARACTERISTICAS',
    'fatoresRisco[]': 'FATORES DE RISCO',
    'riscos[]': 'RISCOS',
    'detalhes[]': 'DETALHES',
    'regras_passageiro[]': 'REGRAS PARA O PASSAGEIRO',
    'perguntas_sugeridas[]': 'PERGUNTAS SUGERIDAS',
    consequence: 'CONSEQUENCIA SE NAO FOR RESOLVIDO',
    checkAction: 'O QUE VERIFICAR',
    riskDetails: 'DETALHE DO RISCO',
    importancia: 'POR QUE IMPORTA',
    definicao: 'DEFINICAO',
    expert_tip: 'DICA DO ESPECIALISTA',
    estatisticas: 'ESTATISTICAS',
    quando_parar: 'QUANDO PARAR',
    ondeAndar: 'ONDE ANDAR',
    contexto: 'CONTEXTO',
    resumo: 'RESUMO',
    summary: 'RESUMO',
    detalhes: 'DETALHES',
    descricao: 'DESCRICAO',
    description: 'DESCRICAO',
    desc: 'DESCRICAO',
    intro: 'INTRODUCAO',
    // tag_guidance: horizonte de tempo da consequencia se o ponto nao for
    // resolvido. Sem o rotulo, os tres textos parecem variacoes do mesmo.
    curto: 'SE NAO RESOLVER — CURTO PRAZO',
    medio: 'SE NAO RESOLVER — MEDIO PRAZO',
    longo: 'SE NAO RESOLVER — LONGO PRAZO',
};

// ---------------------------------------------------------------------------
// EXTRACAO
// ---------------------------------------------------------------------------

/** Nome da propriedade que contem este no, tratando array como `chave[]`. */
function chaveDoTexto(caminho) {
    if (caminho.parentPath.isArrayExpression()) {
        const prop = caminho.parentPath.findParent((x) => x.isObjectProperty());
        const k = prop && prop.node.key && (prop.node.key.name || prop.node.key.value);
        return { chave: k || null, emArray: true };
    }
    if (caminho.parentPath.isObjectProperty() && caminho.parentPath.node.value === caminho.node) {
        const k = caminho.parentPath.node.key;
        return { chave: (k && (k.name || k.value)) || null, emArray: false };
    }
    return { chave: null, emArray: false };
}

/** Alguma chave na cadeia de ancestrais tem sufixo de idioma estrangeiro? */
function dentroDeBlocoTraduzido(caminho) {
    let atual = caminho.parentPath;
    while (atual) {
        if (atual.isObjectProperty()) {
            const k = atual.node.key && (atual.node.key.name || atual.node.key.value);
            if (typeof k === 'string' && SUFIXO_IDIOMA.test(k)) return true;
        }
        atual = atual.parentPath;
    }
    return false;
}

/**
 * Titulo do item que contem este texto — o que o usuario ve como cabecalho no
 * app. Sobe nos objetos ancestrais ate achar um com titulo/title/nome proprio.
 */
function tituloDoItem(caminho) {
    let atual = caminho.findParent((x) => x.isObjectExpression());
    while (atual) {
        for (const prop of atual.node.properties) {
            if (prop.type !== 'ObjectProperty') continue;
            const k = prop.key && (prop.key.name || prop.key.value);
            if (CHAVES_DE_TITULO.has(k) && prop.value.type === 'StringLiteral') {
                return prop.value.value;
            }
        }
        atual = atual.parentPath.findParent((x) => x.isObjectExpression());
    }
    return null;
}

function extrair(relativo) {
    const abs = path.join(RAIZ, relativo);
    if (!fs.existsSync(abs)) return { ausente: true, blocos: [] };

    const ast = parser.parse(fs.readFileSync(abs, 'utf8'), {
        sourceType: 'module',
        plugins: ['jsx'],
    });

    // Preserva a ordem do arquivo: e a ordem em que o conteudo aparece no app.
    const achados = [];
    traverse(ast, {
        StringLiteral(caminho) {
            const texto = caminho.node.value.trim();
            if (!texto || !/[a-zA-ZÀ-ÿ]/.test(texto)) return;
            if (NAO_E_PROSA.test(texto)) return;
            if (dentroDeBlocoTraduzido(caminho)) return;

            const { chave, emArray } = chaveDoTexto(caminho);
            if (!chave) return;
            if (CHAVES_TECNICAS.has(chave)) return;
            if (SUFIXO_IDIOMA.test(chave)) return;

            const ehTitulo = CHAVES_DE_TITULO.has(chave);
            const conhecida = CHAVES_DE_PROSA.has(chave) || ehTitulo;
            const minimo = conhecida ? MIN_PROSA_CONHECIDA : MIN_PROSA_GENERICA;
            if (texto.length < minimo) return;
            // Campo desconhecido e curto: provavelmente rotulo de interface.
            if (!conhecida && texto.length < MIN_PROSA_GENERICA) return;

            achados.push({
                texto,
                chave: emArray ? `${chave}[]` : chave,
                ehTitulo,
                item: tituloDoItem(caminho),
                linha: caminho.node.loc ? caminho.node.loc.start.line : 0,
            });
        },
    });

    achados.sort((a, b) => a.linha - b.linha);

    // Agrupa por item para o documento ter cabecalho de secao.
    const blocos = [];
    const vistos = new Set();
    for (const a of achados) {
        if (vistos.has(a.texto)) continue; // mesmo texto repetido no arquivo
        vistos.add(a.texto);
        const rotulo = a.item || '(sem titulo)';
        let bloco = blocos[blocos.length - 1];
        if (!bloco || bloco.item !== rotulo) {
            bloco = { item: rotulo, textos: [] };
            blocos.push(bloco);
        }
        // O titulo do proprio item nao se repete como paragrafo.
        if (a.ehTitulo && a.texto === rotulo) {
            bloco.chaveDoTitulo = a.chave;
            bloco.linhaDoTitulo = a.linha;
            continue;
        }
        bloco.textos.push(a);
    }
    return { ausente: false, blocos: blocos.filter((b) => b.textos.length || b.chaveDoTitulo) };
}

// ---------------------------------------------------------------------------
// DOCUMENTO
// ---------------------------------------------------------------------------

const CINZA = '9AA0A6';
const VERDE = '065F46';

/** Codigo de rastreio: cinza, 7pt, na mesma linha. Presente mas recessivo. */
const marcador = (codigo) => new TextRun({
    text: `${codigo}  `,
    size: 14, // meio-pontos: 7pt
    color: CINZA,
    font: 'Consolas',
});

/**
 * Um paragrafo por texto, com as quebras internas preservadas.
 *
 * MOTIVO (08/10/2026): a primeira versao punha a string inteira num TextRun,
 * inclusive os "\n". O Word os engole. A revisao do Agnaldo voltou com listas
 * de seis itens numa linha unica, e eu tive de reconstituir a estrutura por
 * marcador ("• ", "1. ") e por espaco duplo — adivinhacao que num caso falhou
 * e gerou string JS com newline real, quebrando o ficheiro.
 *
 * `TextRun` aceita `break: n`, que emite <w:br/>: a quebra sobrevive ao
 * round-trip e volta como quebra, nao como palpite.
 */
const paragrafoDeTexto = (codigo, texto) => {
    const linhas = String(texto).split('\n');
    const runs = [marcador(codigo)];
    linhas.forEach((linha, i) => {
        runs.push(new TextRun({
            text: linha,
            size: 22,
            // Linha vazia no original = paragrafo em branco: vale 2 quebras.
            ...(i > 0 ? { break: 1 } : {}),
        }));
    });
    return new Paragraph({ spacing: { after: 160, line: 300 }, children: runs });
};

/** Rotulo de papel do campo: versalete cinza, acima do grupo de paragrafos. */
const rotuloDePapel = (papel) => new Paragraph({
    spacing: { before: 180, after: 60 },
    children: [new TextRun({
        text: papel, size: 16, bold: true, color: CINZA, characterSpacing: 20,
    })],
});

function comoRevisar() {
    const linhas = [
        'Edite o texto direto, por cima. Nao precisa marcar o que mudou — eu comparo com o original.',
        'Nao apague o codigo cinza no inicio do paragrafo. E por ele que o texto volta para o lugar certo no app.',
        'Para remover um texto, escreva REMOVER no lugar dele.',
        'Para acrescentar um texto novo, escreva um paragrafo novo sem codigo. Eu identifico que e inclusao.',
        'Duvida ou comentario: use o comentario do Word (Revisao > Novo Comentario). Eu leio.',
        'Pode devolver so uma parte. Nao precisa terminar o documento inteiro para me mandar.',
    ];
    return linhas.map((t) => new Paragraph({
        spacing: { after: 100 },
        bullet: { level: 0 },
        children: [new TextRun({ text: t, size: 20 })],
    }));
}

function montarDocumento(tema, dados, manifesto) {
    const filhos = [];

    filhos.push(new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: 'VIGILARO CARE — REVISAO DE CONTEUDO', size: 18, color: VERDE, bold: true })],
    }));
    filhos.push(new Paragraph({
        heading: HeadingLevel.TITLE,
        spacing: { after: 120 },
        children: [new TextRun({ text: tema.nome, size: 52, bold: true })],
    }));
    filhos.push(new Paragraph({
        spacing: { after: 320 },
        children: [new TextRun({ text: tema.descricao, size: 22, color: '444444' })],
    }));

    filhos.push(new Paragraph({
        spacing: { after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'DDDDDD', space: 6 } },
        children: [new TextRun({ text: 'Como revisar', size: 24, bold: true })],
    }));
    filhos.push(...comoRevisar());

    const total = dados.reduce((s, f) => s + f.blocos.reduce((t, b) => t + b.textos.length, 0), 0);
    filhos.push(new Paragraph({
        spacing: { before: 240, after: 240 },
        children: [new TextRun({
            text: `${total} textos neste documento.`,
            size: 20, italics: true, color: CINZA,
        })],
    }));

    filhos.push(new Paragraph({ children: [new PageBreak()] }));
    filhos.push(new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: 'Indice', size: 32, bold: true })],
    }));
    filhos.push(new TableOfContents('Sumario', { hyperlink: true, headingStyleRange: '1-2' }));
    filhos.push(new Paragraph({ children: [new PageBreak()] }));

    let sequencia = 0;
    for (const fonte of dados) {
        if (!fonte.blocos.length) continue;
        filhos.push(new Paragraph({
            heading: HeadingLevel.HEADING_1,
            pageBreakBefore: true,
            spacing: { after: 200 },
            children: [new TextRun({ text: fonte.rotulo, size: 34, bold: true, color: VERDE })],
        }));

        for (const bloco of fonte.blocos) {
            if (bloco.item && bloco.item !== '(sem titulo)') {
                const codigoTitulo = bloco.chaveDoTitulo
                    ? `${tema.sigla}-${String(++sequencia).padStart(4, '0')}`
                    : null;
                const runs = [];
                if (codigoTitulo) runs.push(marcador(codigoTitulo));
                runs.push(new TextRun({ text: bloco.item, size: 26, bold: true }));
                filhos.push(new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 280, after: 120 },
                    children: runs,
                }));
                if (codigoTitulo) {
                    manifesto[codigoTitulo] = {
                        arquivo: fonte.arquivo,
                        rotulo: fonte.rotulo,
                        item: bloco.item,
                        chave: bloco.chaveDoTitulo,
                        linha: bloco.linhaDoTitulo,
                        original: bloco.item,
                    };
                }
            }
            let papelAnterior = null;
            for (const t of bloco.textos) {
                const papel = PAPEL_DO_CAMPO[t.chave] || null;
                if (papel && papel !== papelAnterior) filhos.push(rotuloDePapel(papel));
                papelAnterior = papel;
                const codigo = `${tema.sigla}-${String(++sequencia).padStart(4, '0')}`;
                filhos.push(paragrafoDeTexto(codigo, t.texto));
                manifesto[codigo] = {
                    arquivo: fonte.arquivo,
                    rotulo: fonte.rotulo,
                    item: bloco.item,
                    chave: t.chave,
                    linha: t.linha,
                    original: t.texto,
                };
            }
        }
    }

    return new Document({
        creator: 'Vigilaro Care',
        title: `Revisao de conteudo — ${tema.nome}`,
        description: 'Documento gerado para revisao editorial humana.',
        styles: {
            default: {
                document: { run: { font: 'Calibri', size: 22 } },
            },
        },
        sections: [{ children: filhos }],
    });
}

// ---------------------------------------------------------------------------
// EXECUCAO
// ---------------------------------------------------------------------------

/**
 * Documento que ja existe nunca e sobrescrito sem ordem explicita.
 *
 * MOTIVO (08/10/2026): rodei este script com o `AE-Atividades-Eventuais.docx`
 * aberto no Word, no meio da revisao do Agnaldo. O lock do Windows barrou a
 * escrita por acidente — e so por isso o trabalho dele nao foi perdido. Com o
 * ficheiro fechado, a regeracao teria apagado a revisao em silencio.
 *
 * O gerador anterior tinha essa guarda (`jaExistia` em gerar_conteudo_word.js)
 * e eu nao a trouxe. Trazida, e explicita: a revisao humana e o unico artefacto
 * aqui que nao da para refazer com um comando.
 */
const ehSeguroEscrever = (destino, forcar) => {
    if (forcar || !fs.existsSync(destino)) return true;
    return false;
};

/**
 * Impressao digital do conteudo que entrou num documento.
 *
 * MOTIVO (08/10/2026): o Agnaldo revisou o PS e apontou treze textos como
 * desalinhados com os protocolos de saude. Estava certo quanto ao texto que
 * tinha na frente — mas eu ja o havia corrigido uma hora antes. O documento
 * era das 19:18 e a correcao das 20:19. Ele pediu desculpa pelo "equivoco";
 * o equivoco foi meu, por lhe entregar um documento e depois mexer na fonte
 * sem o avisar.
 *
 * Com tres documentos ainda por revisar e conteudo a ser corrigido em
 * paralelo, isto repetiria. O estado fica em `_estado.json` e e conferido a
 * cada execucao: documento cuja fonte mudou depois de ele ser escrito passa a
 * ser anunciado como DESATUALIZADO, em voz alta.
 */
const impressaoDigital = (dados) => {
    const texto = dados
        .map((f) => f.blocos
            .map((b) => [b.item, ...b.textos.map((t) => t.texto)].join('|'))
            .join('||'))
        .join('|||');
    return crypto.createHash('sha256').update(texto, 'utf8').digest('hex').slice(0, 16);
};

const CAMINHO_ESTADO = path.join(DESTINO, '_estado.json');

const lerEstado = () => {
    try { return JSON.parse(fs.readFileSync(CAMINHO_ESTADO, 'utf8')); } catch { return {}; }
};

async function principal() {
    const forcar = process.argv.includes('--forcar');
    fs.mkdirSync(DESTINO, { recursive: true });
    const manifesto = {};
    const resumo = [];
    const preservados = [];
    const desatualizados = [];
    const copias = [];
    const estadoAnterior = lerEstado();
    const estadoNovo = {};

    for (const tema of TEMAS) {
        const dados = [];
        for (const fonte of tema.fontes) {
            const r = extrair(fonte.arquivo);
            if (r.ausente) {
                console.warn(`  ! ausente: ${fonte.arquivo}`);
                continue;
            }
            dados.push({ ...fonte, blocos: r.blocos });
        }
        const doc = montarDocumento(tema, dados, manifesto);
        const nome = `${tema.sigla}-${tema.nome.replace(/\s+/g, '-')}.docx`;
        const destino = path.join(DESTINO, nome);
        const n = dados.reduce((s, f) => s + f.blocos.reduce((t, b) => t + b.textos.length, 0), 0);

        // O manifesto continua sendo gerado para todos os temas: ele reflete o
        // codigo de hoje e e a ancora do reimport. So o .docx e preservado.
        const digital = impressaoDigital(dados);

        if (!ehSeguroEscrever(destino, forcar)) {
            preservados.push(nome);
            // Documento que ja existia antes de haver `_estado.json` nao tem
            // digital conhecida. Registar a ATUAL seria declara-lo em dia sem
            // prova — foi assim que o PS desatualizado passou por atual. Fica
            // `null`, que se le como "estado desconhecido" e nao como "ok".
            const antes = estadoAnterior[nome];
            estadoNovo[nome] = antes || { digital: null, escritoEm: null };
            if (antes && antes.digital && antes.digital !== digital) {
                desatualizados.push({ nome, escritoEm: antes.escritoEm });
                console.log(`  ${nome.padEnd(34)} ${String(n).padStart(4)} textos  (PRESERVADO, mas DESATUALIZADO)`);
                continue;
            }
            console.log(`  ${nome.padEnd(34)} ${String(n).padStart(4)} textos  (PRESERVADO — ja existe)`);
            continue;
        }

        // Copia de seguranca ANTES de sobrescrever, sempre.
        //
        // MOTIVO (08/10/2026): regerei o PS com --forcar logo depois de o
        // `git status` me dizer, na mesma linha de comando, que o ficheiro
        // estava modificado. A modificacao vinha da sessao do Word do Agnaldo
        // e eu nao sei se continha anotacoes dele, porque apaguei os bytes
        // sem guardar copia. Nao havia nada no git (nao estava commitado),
        // nem no AutoRecover do Word.
        //
        // A guarda do --forcar protegia contra escrita acidental, mas nao
        // contra escrita AUTORIZADA sobre trabalho que eu nao sabia existir.
        // Autorizacao para regerar nao e autorizacao para perder.
        if (fs.existsSync(destino)) {
            const selo = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15);
            const copia = `${destino}.anterior-${selo}`;
            fs.copyFileSync(destino, copia);
            copias.push(path.basename(copia));
        }

        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(destino, buffer);
        estadoNovo[nome] = { digital, escritoEm: new Date().toISOString() };
        resumo.push({ nome, textos: n });
        console.log(`  ${nome.padEnd(34)} ${String(n).padStart(4)} textos`);
    }

    fs.writeFileSync(
        path.join(DESTINO, '_manifesto.json'),
        JSON.stringify(manifesto, null, 2),
        'utf8',
    );
    console.log(`\n  _manifesto.json              ${String(Object.keys(manifesto).length).padStart(4)} codigos`);
    if (preservados.length) {
        console.log(`\n  ${preservados.length} documento(s) preservado(s) por ja existirem:`);
        preservados.forEach((n) => console.log(`    ${n}`));
        console.log('  Podem conter revisao humana. Para regerar mesmo assim:');
        console.log('    node scripts/gerar_revisao_conteudo.js --forcar');
    }
    fs.writeFileSync(CAMINHO_ESTADO, JSON.stringify(estadoNovo, null, 2), 'utf8');

    if (copias.length) {
        console.log(`
  ${copias.length} copia(s) de seguranca do que existia antes:`);
        copias.forEach((c) => console.log(`    ${c}`));
        console.log('  Apague-as depois de confirmar que nao se perdeu nada.');
    }

    if (desatualizados.length) {
        console.log('\n  ATENCAO — o conteudo mudou depois destes documentos serem escritos:');
        desatualizados.forEach((d) => {
            const quando = d.escritoEm ? d.escritoEm.slice(0, 16).replace('T', ' ') : 'data desconhecida';
            console.log(`    ${d.nome}  (escrito em ${quando})`);
        });
        console.log('  Quem estiver a revisar le texto que ja nao existe no codigo.');
        console.log('  Avise a pessoa antes de regerar, se ela tiver o ficheiro aberto.');
    }

    console.log(`\nSaida: docs/revisao-conteudo/`);
}

// Só executa quando chamado direto. O importador faz `require` deste ficheiro
// para ler PAPEL_DO_CAMPO; sem esta guarda, importar o gerador o RODAVA, e uma
// simples leitura de constante reescrevia o manifesto.
if (require.main === module) {
    principal().catch((e) => { console.error(e); process.exit(1); });
}

// Exportado para o importador: `importar_revisao_conteudo.js` precisa saber
// quais paragrafos sao rotulo de papel deste gerador, e nao texto do revisor.
// Sem isto, "ITENS" e "DESCRICAO" entram como inclusao humana.
module.exports = { PAPEL_DO_CAMPO, TEMAS };
