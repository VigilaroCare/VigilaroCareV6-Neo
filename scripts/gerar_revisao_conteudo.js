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
const { execFileSync } = require('child_process');
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
            { arquivo: 'data/mobilidade_data.js', rotulo: 'Transporte seguro (cadeirinhas e veículos leves)' },
            { arquivo: 'data/escola_segura_data.js', rotulo: 'Escola segura' },
            { arquivo: 'data/asilo_seguro_data.js', rotulo: 'Instituicao de longa permanencia' },
        ],
    },
    // -----------------------------------------------------------------------
    // RC — o que a lista acima deixou de fora.
    //
    // MOTIVO (19/10/2026): ao traduzir a D21, achei ~700 textos que estao no
    // app desde maio/junho e nunca foram para revisao humana. Dois buracos:
    // (1) arquivos de dados que simplesmente nao estavam na lista dos temas;
    // (2) texto escrito DENTRO de telas e componentes, que nenhum tema lia.
    // No mesmo dia esses textos foram corrigidos (estatistica sem fonte,
    // telefone fixo, orientacao de socorro) sem passar pelo Agnaldo — por isso
    // este documento compara com `base` e mostra, junto de cada texto, o que
    // havia antes ("ANTES"), o que e novo e o que foi retirado.
    //
    // `chavesExtras`/`titulosExtras` valem SO para este tema: acrescenta-las
    // as listas globais renumeraria os codigos dos documentos ja revisados.
    // -----------------------------------------------------------------------
    {
        nome: 'Revisao Complementar',
        sigla: 'RC',
        base: 'c094fa9',
        dataMudancas: '19/10/2026',
        descricao: 'Textos que ficaram fora dos documentos PS, ED, AE e EX: os reviews de produtos, '
            + 'os acessorios de protecao, o roteiro dos ambientes, as categorias de produtos perigosos '
            + 'e as telas de viagem, lazer e jardinagem. Varios foram corrigidos em 19/10/2026 antes '
            + 'desta revisao: abaixo de cada texto alterado aparece a linha "ANTES", com o texto '
            + 'anterior; texto novo vem marcado "NOVO"; o que saiu aparece como "RETIRADO". Essas '
            + 'linhas sao so referencia — para voltar ao texto antigo, edite o texto principal. '
            + 'Trechos entre chaves duplas, como {{FIRE_NUMBER}} ou {{CERT_SEAL}}, sao trocados no app '
            + 'pelo numero ou orgao do pais do usuario (no Brasil: 193, selo do INMETRO).',
        chavesExtras: ['riscosPrincipais', 'emergencias', 'dicasExtras', 'bullets', 'estatistica', 'exemplos'],
        titulosExtras: ['local'],
        fontes: [
            { arquivo: 'data/dispositivos_eletronicos_reviews.js', rotulo: 'Reviews — dispositivos eletronicos' },
            { arquivo: 'data/eletrodomesticos_reviews.js', rotulo: 'Reviews — eletrodomesticos' },
            { arquivo: 'data/utensilios_reviews.js', rotulo: 'Reviews — utensilios domesticos' },
            { arquivo: 'data/dispositivos_protecao.js', rotulo: 'Acessorios de protecao' },
            { arquivo: 'data/produtos_categorias.js', rotulo: 'Produtos perigosos — categorias' },
            { arquivo: 'data/areas_internas.js', rotulo: 'Roteiro dos ambientes — areas internas' },
            { arquivo: 'data/areas_externas.js', rotulo: 'Roteiro dos ambientes — areas externas' },
            { arquivo: 'screens/Education/TravelSafetyGuideScreen.js', rotulo: 'Guia de Seguranca na Viagem' },
            { arquivo: 'components/TravelTipsAccordion.js', rotulo: 'Modo Viagem — Fique atento' },
            { arquivo: 'screens/SegurancaFeriasScreen.js', rotulo: 'Seguranca nas Ferias' },
            { arquivo: 'screens/SegurancaLazerScreen.js', rotulo: 'Seguranca no Lazer' },
            { arquivo: 'screens/Education/JardinagemSeguraScreen.js', rotulo: 'Jardinagem Segura' },
        ],
    },
    // -----------------------------------------------------------------------
    // RP — Revisao de Pendencias: o backlog da trava, nao arquivos inteiros.
    //
    // MOTIVO (21/10/2026): a trava (verify_revisao_conteudo.js) mostrou 202
    // textos alterados ou escritos DEPOIS das revisoes do Agnaldo, cuja
    // redacao final ele nunca viu — reescrita de estatistica sem fonte,
    // cadeirinhas, baterias de litio, textos pedidos em comentario. Mandar os
    // arquivos inteiros de novo o faria reler milhares de textos ja aprovados.
    //
    // `pendentes` lista os motivos do `_registro-revisao.json` que entram. As
    // fontes sao montadas na hora; o `rotulo` vem do tema que ja tinha o
    // arquivo, para o cabecalho continuar sendo o nome que ele conhece.
    // -----------------------------------------------------------------------
    {
        nome: 'Revisao de Pendencias',
        sigla: 'RP',
        pendentes: ['m004', 'm005'],
        descricao: 'Textos que mudaram ou foram escritos DEPOIS das suas revisoes, e cuja redacao final '
            + 'voce ainda nao viu. Abaixo de cada texto alterado aparece, em cinza, a "VERSAO QUE VOCE '
            + 'REVISOU"; texto escrito depois vem marcado "ESCRITO DEPOIS DA SUA REVISAO". Essas linhas '
            + 'sao so referencia — para voltar a versao antiga, edite o texto principal. Trechos entre '
            + 'chaves duplas, como {{FIRE_NUMBER}} ou {{CERT_SEAL}}, sao trocados no app pelo numero ou '
            + 'orgao do pais do usuario (no Brasil: 193, selo do INMETRO).',
        fontes: [],
    },
    // PN — temas novos de primeiros socorros (21/10/2026): afogamento,
    // vomito/aspiracao e incendio/fumaca, que so existiam na tela orfa
    // PrimeirosSocorrosEmergenciaScreen (apagada). `blocosInteiros` manda o
    // tema completo, e `minimoConhecida: 10` inclui as frases curtas ("NAO use
    // o elevador.") que o limiar padrao de 25 caracteres deixaria de fora.
    {
        nome: 'Temas Novos de Primeiros Socorros',
        sigla: 'PN',
        pendentes: ['m009'],
        blocosInteiros: true,
        minimoConhecida: 10,
        chavesExtras: ['situacao'],
        descricao: 'Tres temas que faltavam nos primeiros socorros do app: afogamento, vomito com risco '
            + 'de aspiracao e incendio com inalacao de fumaca. Todos os textos sao novos — voce ainda nao '
            + 'viu nenhum. Trechos entre chaves duplas, como {{EMERGENCY_MEDICAL}} ou {{FIRE_NUMBER}}, '
            + 'sao trocados no app pelo numero do pais do usuario (no Brasil: 192 e 193).',
        fontes: [],
    },
    // TC — textos curtos e titulos (10 a 24 caracteres) dos arquivos JA
    // revisados. O limiar de 25 do extrator os deixava fora de todo documento.
    // Os de arquivos nunca revisados vao com o documento do proprio tema, para
    // o Agnaldo nao ler o mesmo assunto em duas partes.
    {
        nome: 'Textos Curtos e Titulos',
        sigla: 'TC',
        pendentes: ['m010'],
        somenteArquivosRevisados: true,
        minimoConhecida: 10,
        // Nao foram escritos depois de revisao nenhuma: so nunca entraram em
        // documento. "ESCRITO DEPOIS DA SUA REVISAO" aqui seria falso.
        marcarMudancas: false,
        descricao: 'Frases curtas e titulos (de 10 a 24 caracteres) dos temas que voce ja revisou. Ficaram '
            + 'fora dos documentos anteriores por um limite de tamanho do gerador — por isso "NUNCA sacuda o '
            + 'bebe." e "NAO use o elevador." nunca passaram por voce. O titulo cinza acima de cada grupo e o '
            + 'item do app onde a frase aparece, para dar contexto. Rotulos de uma palavra (nomes de estados, '
            + 'comodos, "OK") nao entram.',
        fontes: [],
    },
    // GS — grupos sensiveis (comentario do Agnaldo na RC: "Contextualizemos
    // criancas, idosos e pessoas com limitacoes cognitivas onde e quando
    // aplicavel ao longo do app"). `antes` e o mapa texto novo -> texto que
    // estava no app, gravado na aplicacao; vira a linha "ANTES" do documento.
    {
        nome: 'Grupos Sensiveis',
        sigla: 'GS',
        pendentes: ['m011'],
        marcarMudancas: false,
        antes: '_antes-GS.json',
        dataMudancas: '21/10/2026',
        descricao: 'Seu comentario na Revisao Complementar pedia contextualizar, ao longo do app, idosos, '
            + 'pessoas com limitacoes cognitivas e neurodivergentes, com leveza. Os textos abaixo ganharam '
            + 'esses grupos SO onde o risco tambem e deles: tropeco e queda (idosos, mobilidade reduzida, '
            + 'baixa visao), confundir remedio, pilha ou produto (limitacoes cognitivas), sair sem avisar '
            + '(demencia, neurodivergentes), sair de casa num incendio (mobilidade reduzida, pessoas surdas). '
            + '"Necessidades especiais" virou "pessoa com deficiencia", termo da Lei Brasileira de Inclusao '
            + '(13.146/2015). Abaixo de cada texto, a linha "ANTES" mostra como estava.',
        fontes: [],
    },
    // GR — 2a rodada do GS: os textos que estavam nos documentos em revisao
    // (RP, PN, TC, RS) so podiam mudar depois que voltassem (22/10/2026).
    {
        nome: 'Grupos Sensiveis 2a Rodada',
        sigla: 'GR',
        pendentes: ['m014'],
        marcarMudancas: false,
        antes: '_antes-GR.json',
        dataMudancas: '22/10/2026',
        descricao: 'Mesma passada do documento GS, nos textos que estavam com voce em revisao. Abaixo de '
            + 'cada texto alterado, a linha "ANTES" mostra como estava; texto que nao existia vem marcado "NOVO".',
        fontes: [],
    },
    // II — Intoxicacao e Incendio: primeiro documento de arquivos que NUNCA
    // passaram por revisao (D28, ordem combinada). `arquivos` restringe o
    // backlog a esses arquivos; `motivosSempre` traz junto os textos do Radar
    // redigidos a partir de comentario dele (m013), os unicos com versao
    // revisada para comparar (`marcarMotivos`).
    {
        nome: 'Intoxicacao e Incendio',
        sigla: 'II',
        pendentes: ['m006', 'm010', 'm013', 'm015'],
        arquivos: [
            'data/animais_ciatox.js', 'data/plantas_ciatox.js', 'data/classesIncendio.js',
            'data/pet_food_safety.js', 'data/pet_safety_content.js', 'data/pet_pregnancy_data.js',
            'data/pet_wellness_data.js', 'data/aves_seguras_data.js',
        ],
        motivosSempre: ['m013'],
        marcarMotivos: ['m013'],
        rotulos: {
            'data/animais_ciatox.js': 'Animais peconhentos',
            'data/plantas_ciatox.js': 'Plantas toxicas',
            'data/classesIncendio.js': 'Classes de incendio (por pais)',
            'data/pet_food_safety.js': 'Pets — alimentos perigosos',
            'data/pet_safety_content.js': 'Pets — seguranca em casa',
            'data/pet_pregnancy_data.js': 'Pets — gestacao',
            'data/pet_wellness_data.js': 'Pets — bem-estar',
            'data/aves_seguras_data.js': 'Aves',
            'data/radarSazonal/br.js': 'Radar Sazonal — redigidos a partir dos seus comentarios',
        },
        descricao: 'Textos que nunca passaram por revisao: animais peconhentos, plantas toxicas, classes de '
            + 'incendio e o conteudo de pets. Por ultimo, os quatro textos do Radar que escrevi a partir dos '
            + 'seus comentarios (dengue, cerol, ciclistas e autopropelidos, criancas de idades diferentes), '
            + 'com a versao que voce revisou logo abaixo. Trechos entre chaves duplas, como {{POISON_CONTROL}} '
            + 'ou {{FIRE_CLASS_ELECTRICAL}}, sao trocados no app pelo numero ou pela norma do pais do usuario '
            + '(no Brasil: CIATOX, classes da NBR).',
        fontes: [],
    },
    // CK, AV, IF — o resto do backlog (22/10/2026), em tres documentos. Ficam
    // de fora: Scanner/Info Rotulos (D26 vai mexer neles), texto juridico (D25)
    // e o que a trava pos em FORA_DO_ESCOPO (telas orfas, codigo morto).
    {
        nome: 'Checklist dos Ambientes',
        sigla: 'CK',
        pendentes: ['m006', 'm010', 'm015'],
        arquivos: ['data/mapeamento_dados.js'],
        marcarMudancas: false,
        titulosComoTexto: ['titulo'],
        rotulos: { 'data/mapeamento_dados.js': 'Checklist dos ambientes (vistoria)' },
        descricao: 'As perguntas e descricoes da vistoria de cada ambiente da casa. Nunca passaram por revisao. '
            + 'Aqui elas aparecem como estao hoje, em forma de pergunta — a reescrita para enunciados de risco '
            + '(Mapa de Riscos) e um trabalho a parte, que vira para voce depois.',
        fontes: [],
    },
    {
        nome: 'Textos Avulsos',
        sigla: 'AV',
        pendentes: ['m006', 'm010', 'm015'],
        excluirArquivos: ['data/mapeamento_dados.js', 'data/produtos_scanner.js', 'locales/pt-BR/common.json'],
        excluirPrefixos: ['data/legal/'],
        marcarMudancas: false,
        rotulos: {
            'data/ferramentas_seguranca.js': 'Ferramentas de trabalho',
            'data/epi_domestico.js': 'EPI domestico',
            'data/riscos_fisicos.js': 'Riscos fisicos',
            'data/opcoesPerfil.js': 'Cadastro de perfil (opcoes)',
            'data/onboarding_data.js': 'Boas-vindas (onboarding)',
            'data/categoriasRisco.js': 'Categorias de risco',
            'data/ocorrencia_regional.js': 'Ocorrencia por regiao',
            'data/telefones_ciatox.js': 'Telefones dos CIATOX',
            'data/emergencyNumbersByCountry.js': 'Numeros de emergencia por pais',
            'data/radarSazonal/index.js': 'Radar Sazonal — alertas oficiais',
            'data/radarSazonal/textos.js': 'Radar Sazonal — textos da tela',
            'data/radarSazonal/br.js': 'Radar Sazonal — Brasil',
            'data/radarSazonal/pt.js': 'Radar Sazonal — Portugal',
            'data/radarSazonal/es.js': 'Radar Sazonal — Espanha',
            'data/radarSazonal/gb.js': 'Radar Sazonal — Reino Unido',
            'data/radarSazonal/us.js': 'Radar Sazonal — EUA',
            'data/radarSazonal/mx.js': 'Radar Sazonal — Mexico',
        },
        descricao: 'O que sobrou fora de todos os documentos: ferramentas, EPI, riscos fisicos, cadastro de perfil, '
            + 'boas-vindas, categorias de risco, alertas por regiao e textos soltos de telas. Muitos sao frases '
            + 'curtas e titulos — da para passar o olho.',
        fontes: [],
    },
    {
        nome: 'Textos de Interface',
        sigla: 'IF',
        pendentes: ['m007'],
        marcarMudancas: false,
        rotulos: { 'locales/pt-BR/common.json': 'Textos de interface' },
        descricao: 'Os textos mais longos das telas (70 caracteres ou mais): explicacoes, avisos e mensagens. '
            + 'Rotulos de botao e titulos curtos nao entram. Cada grupo leva o nome tecnico da tela ou da '
            + 'funcao, para voce saber onde aparece.',
        fontes: [],
    },
    // TI — o que so existia nas telas orfas apagadas em 22/10/2026 e foi levado
    // para as telas no ar (aquecedor, grade de cama, CO, contraste, alerta
    // pessoal, altura, calhas) + vocabulario do checklist de visitas.
    {
        nome: 'Telas Integradas',
        sigla: 'TI',
        pendentes: ['m017'],
        rotulos: {
            'data/eletrodomesticos_reviews.js': 'Reviews — eletrodomesticos',
            'data/dispositivos_protecao.js': 'Acessorios de protecao',
            'data/visitChecklists.js': 'Checklist de visitas (grupos de visitante)',
            'data/locales/pt-BR/RiskCategories.js': 'Modo Preventivo — servicos em altura',
            'data/radarSazonal/br.js': 'Radar Sazonal — chuvas fortes e raios',
            'locales/pt-BR/common.json': 'Modo Preventivo — cartao novo',
        },
        descricao: 'Sete telas do app nao tinham nenhuma entrada (nenhum botao levava a elas). Antes de apaga-las, '
            + 'levei para as telas que estao no ar o que so elas tinham: aquecedor portatil, grade de protecao para '
            + 'cama, detector de monoxido de carbono, contraste para baixa visao, alerta pessoal para quem mora '
            + 'sozinho, "avise alguem antes de subir" e telhas e calhas antes das chuvas. No checklist de visitas, '
            + '"PCD / Mobilidade Reduzida" e "Criancas (Hiperativas/Arteiras)" mudaram de nome — a linha cinza mostra '
            + 'a versao que voce revisou.',
        fontes: [],
    },
    // CJ — vocabulos de cautela (pedido do Agnaldo, 22/10/2026): promessa de
    // eficacia, garantia, lei e prescricao clinica ganham cautela; instrucao de
    // seguranca e de emergencia continua firme.
    {
        nome: 'Cautela Juridica',
        sigla: 'CJ',
        pendentes: ['m018', 'm019'],
        marcarMudancas: false,
        antes: '_antes-CJ.json',
        dataMudancas: '22/10/2026',
        rotulos: {
            'data/legal/termos_uso.js': 'Termos de Uso (os 4 idiomas)',
            'data/legal/politica_privacidade.js': 'Politica de Privacidade (os 4 regimes)',
            'locales/pt-BR/common.json': 'Textos de interface',
            'data/dose_atrasada.js': 'Lembretes de remedio — Atrasou ou esqueceu uma dose? (tela nova)',
        },
        descricao: 'Ajustes de cautela juridica: o app continua informando e orientando com firmeza, mas sem prometer '
            + 'o que nao pode garantir. Promessas de eficacia de produto ("impede", "salva vidas", "100%") viraram '
            + '"dificulta", "reduz o risco", "pode salvar vidas"; norma tecnica deixou de ser chamada de lei; frases em tom '
            + 'de prescricao medica passaram a apontar para a equipe de saude; Termos e Politica dizem que o indice de '
            + 'seguranca e estimativa, nao laudo, e que o app nao envia dados de saude. Instrucoes de seguranca e de '
            + 'emergencia ("NUNCA deixe...", "Ligue para...") NAO foram suavizadas. A linha ANTES mostra como estava. '
            + 'No fim, a tela nova "Atrasou ou esqueceu uma dose?": aponta para a bula e para o medico ou profissional de '
            + 'saude responsavel, sem decidir pelo usuario.',
        fontes: [],
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
// Tambem a chave sozinha (`en`, `es`, `ptPT`): e assim em classesIncendio.js, e sem isto
// o ingles e o espanhol entravam no documento como se fossem pt-BR (22/10/2026).
const SUFIXO_IDIOMA = /(^|_)(en|es|ptpt|pt_pt|ptPT)$/i;

/** Nao e prosa: caminho de asset, URL, hex, token puro. */
// Tambem chave de traducao solta (home.homeNeedsAttention): e codigo, nao texto.
const NAO_E_PROSA = /^(https?:\/\/|\.{1,2}\/|@[a-z]|#[0-9a-fA-F]{3,8}$|[A-Z_]{3,}$|[a-z][A-Za-z0-9]*(\.[A-Za-z0-9_]+)+$)/;

/** Campos que sao prosa mesmo quando curtos (um passo de socorro e curto). */
const CHAVES_DE_PROSA = new Set([
    'texto', 'text', 'conteudo', 'content', 'descricao', 'description', 'desc',
    'detalhes', 'details', 'explicacao', 'resumo', 'summary', 'corpo', 'body',
    'dica', 'dicas', 'tip', 'porque', 'why', 'consequence', 'consequencia',
    'checkAction', 'acao', 'action', 'oQueFazer', 'oQueNaoFazer', 'comoEvitar',
    'prevencao', 'orientacoes', 'itens', 'items', 'passos', 'steps', 'label',
    'curto', 'medio', 'longo', 'sintomas', 'quandoChamarAjuda', 'observacao',
    // Acrescentadas em 15/10/2026, depois de o Agnaldo achar codigos sem
    // conteudo em EX-Explicativos: eram campos de prosa que o limiar de 70
    // caracteres cortava por nao estarem nesta lista.
    'short_desc', 'shortDesc', 'subtitulo', 'subtitle', 'introducao', 'intro',
    'keyPoints', 'regrasSeguranca', 'comoUsar', 'comoInstalar',
    'comoIdentificar', 'perguntas_sugeridas', 'orientacoes_finais',
    'riskDetails', 'importancia', 'definicao', 'expert_tip', 'primeirosSocorros',
    'alertas', 'caracteristicas', 'fatoresRisco', 'riscos', 'contexto',
    'estatisticas', 'quando_parar', 'ondeAndar', 'regras_passageiro',
    'mensagem', 'message',
]);

/** Titulos: viram cabecalho no documento e tambem sao revisaveis. */
const CHAVES_DE_TITULO = new Set(['titulo', 'title', 'nome', 'name', 'pergunta']);

const MIN_PROSA_GENERICA = 70;
// Era 25 ate 21/10/2026: frases curtas de socorro ("NUNCA sacuda o bebe.", 20)
// nunca entraram em documento. O Agnaldo prefere tudo, "mesmo que eu so precise
// passar o olho". Documentos ja entregues ficam preservados com o limiar antigo;
// os textos de 10 a 24 caracteres deles foram no TC.
const MIN_PROSA_CONHECIDA = 10;

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
    // Revisao Complementar (RC): campos dos reviews e das telas de lazer/viagem.
    oQueFazer: 'O QUE FAZER',
    riscos: 'RISCOS',
    'riscosPrincipais[]': 'RISCOS PRINCIPAIS',
    'emergencias[]': 'EM CASO DE EMERGENCIA',
    'dicasExtras[]': 'DICAS EXTRAS',
    'bullets[]': 'PONTOS DE ATENCAO',
    'exemplos[]': 'EXEMPLOS',
    estatistica: 'VOCE SABIA? (ESTATISTICA)',
    situacao: 'SITUACAO',
    // Intoxicacao e Incendio (II): animais peconhentos, plantas toxicas, pets.
    // fazer[] e naoFazer[] SEM rotulo sairiam como paragrafos iguais — o erro
    // que inverte a orientacao de socorro (ver o comentario no inicio do mapa).
    'fazer[]': 'O QUE FAZER',
    'naoFazer[]': 'O QUE NUNCA FAZER',
    'imediatos[]': 'SINTOMAS IMEDIATOS',
    'tardios[]': 'SINTOMAS TARDIOS',
    'graves[]': 'SINAIS DE GRAVIDADE',
    efeito: 'EFEITO DO VENENO',
    tipoVeneno: 'TIPO DE VENENO',
    periodoAtivo: 'QUANDO E MAIS ATIVO',
    tratamento: 'TRATAMENTO',
    gravidade: 'GRAVIDADE',
    nivelPerigo: 'NIVEL DE PERIGO',
    habitat: 'ONDE VIVE',
    comportamento: 'COMPORTAMENTO',
    'sintomasHumanos[]': 'SINTOMAS EM PESSOAS',
    'sintomasPets[]': 'SINTOMAS EM PETS',
    'partesToxicas[]': 'PARTES TOXICAS',
    ondeEncontrada: 'ONDE E ENCONTRADA',
    toxina: 'TOXINA',
    detalhe: 'DETALHE',
    risco: 'RISCO',
    'peconhentos[]': 'ESPECIES PECONHENTAS NO ESTADO',
    // CK: a pergunta da vistoria (campo `titulo` lido como texto)
    titulo: 'PERGUNTA DA VISTORIA',
    'naoPeconhentos[]': 'ESPECIES NAO PECONHENTAS NO ESTADO',
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
function tituloDoItem(caminho, titulosExtras = new Set(), comoTexto = new Set()) {
    let atual = caminho.findParent((x) => x.isObjectExpression());
    while (atual) {
        for (const prop of atual.node.properties) {
            if (prop.type !== 'ObjectProperty') continue;
            const k = prop.key && (prop.key.name || prop.key.value);
            if ((CHAVES_DE_TITULO.has(k) || titulosExtras.has(k)) && !comoTexto.has(k) && prop.value.type === 'StringLiteral') {
                return prop.value.value;
            }
        }
        atual = atual.parentPath.findParent((x) => x.isObjectExpression());
    }
    return null;
}

/**
 * @param relativo  caminho a partir da raiz do repo
 * @param opcoes    { chavesExtras, titulosExtras } — so do tema que pede
 * @param codigo    fonte ja lida (ex.: versao de um commit antigo); sem ela, le do disco
 */
function extrair(relativo, opcoes = {}, codigo = null) {
    const extras = new Set(opcoes.chavesExtras || []);
    const titulosExtras = new Set(opcoes.titulosExtras || []);
    // Chave de titulo lida como texto comum (CK: a pergunta da vistoria esta em
    // `titulo`; como titulo, o documento viraria 300 cabecalhos).
    const comoTexto = new Set(opcoes.titulosComoTexto || []);
    let fonte = codigo;
    if (fonte == null) {
        const abs = path.join(RAIZ, relativo);
        if (!fs.existsSync(abs)) return { ausente: true, blocos: [] };
        fonte = fs.readFileSync(abs, 'utf8');
    }

    const ast = parser.parse(fonte, {
        sourceType: 'module',
        plugins: ['jsx'],
    });

    // Preserva a ordem do arquivo: e a ordem em que o conteudo aparece no app.
    const achados = [];
    traverse(ast, {
        /**
         * Template literal (`...`) — o buraco que o Agnaldo encontrou.
         *
         * MOTIVO (15/10/2026): ele reportou que EX-0456 e EX-0457 apareciam no
         * documento sem conteudo nenhum. Eram os itens "Emergencias e
         * Sensorialidade" e "Pica e Ingestao de Perigos", que tem artigos
         * inteiros em markdown — escritos com backticks em vez de aspas. O
         * extrator so visitava `StringLiteral`, logo saiu o cabecalho e nao
         * saiu o texto.
         *
         * Alcance do que estava invisivel: 33 blocos, ~6.400 palavras, ~19
         * paginas, incluindo 18 artigos de `SafetyArticlesDB.js`. Era conteudo
         * educativo central que nunca chegou a revisao humana.
         *
         * Cada literal sai como UM codigo, com as quebras de linha
         * preservadas: e um artigo inteiro, e dividi-lo por linha daria dezenas
         * de codigos por artigo e tornaria a volta impossivel de remontar.
         */
        TemplateLiteral(caminho) {
            if (caminho.node.expressions.length) return;   // tem interpolacao: e codigo
            const texto = (caminho.node.quasis || [])
                .map((q) => (q.value.cooked !== undefined ? q.value.cooked : q.value.raw))
                .join('')
                .replace(/^\n+|\s+$/g, '');
            if (!texto || texto.length < (opcoes.minimoConhecida || MIN_PROSA_CONHECIDA)) return;
            if (!/[a-zA-ZÀ-ÿ]/.test(texto)) return;
            if (dentroDeBlocoTraduzido(caminho)) return;

            const prop = caminho.findParent((x) => x.isObjectProperty());
            const chave = prop && prop.node.key
                ? (prop.node.key.name || prop.node.key.value)
                : null;
            if (!chave || CHAVES_TECNICAS.has(chave) || SUFIXO_IDIOMA.test(chave)) return;

            achados.push({
                texto,
                chave,
                ehTitulo: false,
                item: tituloDoItem(caminho, titulosExtras, comoTexto),
                linha: caminho.node.loc ? caminho.node.loc.start.line : 0,
            });
        },

        StringLiteral(caminho) {
            const texto = caminho.node.value.trim();
            if (!texto || !/[a-zA-ZÀ-ÿ]/.test(texto)) return;
            if (NAO_E_PROSA.test(texto)) return;
            if (dentroDeBlocoTraduzido(caminho)) return;

            const { chave, emArray } = chaveDoTexto(caminho);
            if (!chave) return;
            if (CHAVES_TECNICAS.has(chave)) return;
            if (SUFIXO_IDIOMA.test(chave)) return;

            const ehTitulo = (CHAVES_DE_TITULO.has(chave) || titulosExtras.has(chave)) && !comoTexto.has(chave);
            const conhecida = CHAVES_DE_PROSA.has(chave) || extras.has(chave) || ehTitulo || comoTexto.has(chave);
            const minimo = conhecida ? (opcoes.minimoConhecida || MIN_PROSA_CONHECIDA) : MIN_PROSA_GENERICA;
            if (texto.length < minimo) return;
            // Campo desconhecido e curto: provavelmente rotulo de interface.
            if (!conhecida && texto.length < MIN_PROSA_GENERICA) return;

            achados.push({
                texto,
                chave: emArray ? `${chave}[]` : chave,
                ehTitulo,
                item: tituloDoItem(caminho, titulosExtras, comoTexto),
                linha: caminho.node.loc ? caminho.node.loc.start.line : 0,
            });
        },
    });

    achados.sort((a, b) => a.linha - b.linha);

    // Agrupa por item para o documento ter cabecalho de secao.
    const blocos = [];
    const vistos = new Set();
    for (const a of achados) {
        // mesmo texto repetido no arquivo — exceto quando o tema pede o bloco inteiro (PN)
        if (vistos.has(a.texto) && !opcoes.manterRepetidos) continue;
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

/**
 * Marca, nos blocos de agora, o que mudou desde `antes` (mesma extracao feita
 * sobre a versao de um commit anterior). Grava:
 *   texto.antes        — o texto que ocupava esse lugar (mesmo item, mesmo campo)
 *   texto.novo         — nao havia nada correspondente
 *   bloco.novoInteiro  — o item todo nao existia
 *   bloco.retirados[]  — textos do item que sairam sem substituto
 * e devolve os itens inteiros que sairam.
 *
 * Texto identico a qualquer texto antigo do arquivo conta como inalterado,
 * mesmo que tenha mudado de lugar.
 */
function anotarMudancas(blocosAntes, blocosAgora) {
    const textosAntes = new Set(blocosAntes.flatMap((b) => b.textos.map((t) => t.texto)));
    const textosAgora = new Set(blocosAgora.flatMap((b) => b.textos.map((t) => t.texto)));
    const usados = new Set();
    const blocoAntigoUsado = new Set();
    for (const bloco of blocosAgora) {
        const antigo = blocosAntes.find((b, i) => b.item === bloco.item && !blocoAntigoUsado.has(i));
        if (!antigo) {
            if (bloco.textos.some((t) => !textosAntes.has(t.texto))) bloco.novoInteiro = true;
            continue;
        }
        blocoAntigoUsado.add(blocosAntes.indexOf(antigo));
        const sobras = antigo.textos.filter((t) => !textosAgora.has(t.texto));
        for (const t of bloco.textos) {
            if (textosAntes.has(t.texto)) continue;
            const par = sobras.find((s) => s.chave === t.chave && !usados.has(s));
            if (par) { t.antes = par.texto; usados.add(par); } else { t.novo = true; }
        }
        bloco.retirados = sobras.filter((s) => !usados.has(s)).map((s) => s.texto);
    }
    return blocosAntes
        .filter((b, i) => !blocoAntigoUsado.has(i) && b.textos.some((t) => !textosAgora.has(t.texto)))
        .map((b) => ({ item: b.item, textos: b.textos.map((t) => t.texto).filter((x) => !textosAgora.has(x)) }));
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

/**
 * Linha de referencia da Revisao Complementar ("ANTES", "NOVO", "RETIRADO").
 * Cinza, italico, sem codigo. O importador reconhece estes prefixos como
 * andaime do gerador (MARCAS_DE_MUDANCA) e nao como texto do revisor.
 */
const MARCAS_DE_MUDANCA = [
    /^ANTES \(at[ée] \d{2}\/\d{2}\/\d{4}\):/i,
    /^NOVO EM \d{2}\/\d{2}\/\d{4}/i,
    /^RETIRADO EM \d{2}\/\d{2}\/\d{4}:/i,
    // Revisao de Pendencias (RP)
    /^VERS[ÃA]O QUE VOC[ÊE] REVISOU:/i,
    /^ESCRITO DEPOIS DA SUA REVIS[ÃA]O/i,
];
const linhaDeMudanca = (texto, cor = '8A6D00') => new Paragraph({
    spacing: { before: 0, after: 160 },
    indent: { left: 360 },
    children: [new TextRun({ text: texto, size: 18, italics: true, color: cor })],
});

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
            if (bloco.novoInteiro && tema.dataMudancas) {
                filhos.push(linhaDeMudanca(`NOVO EM ${tema.dataMudancas} — este item inteiro nao existia antes.`, VERDE));
            }
            let papelAnterior = null;
            for (const t of bloco.textos) {
                const papel = PAPEL_DO_CAMPO[t.chave] || null;
                if (papel && papel !== papelAnterior) filhos.push(rotuloDePapel(papel));
                papelAnterior = papel;
                const codigo = `${tema.sigla}-${String(++sequencia).padStart(4, '0')}`;
                filhos.push(paragrafoDeTexto(codigo, t.texto));
                if (t.versaoRevisada) {
                    filhos.push(linhaDeMudanca(`VERSAO QUE VOCE REVISOU: ${t.versaoRevisada.replace(/\n/g, ' / ')}`));
                } else if (t.escritoDepois) {
                    filhos.push(linhaDeMudanca('ESCRITO DEPOIS DA SUA REVISAO — voce ainda nao viu este texto.', VERDE));
                } else if (tema.dataMudancas && t.antes) {
                    filhos.push(linhaDeMudanca(`ANTES (até ${tema.dataMudancas}): ${t.antes.replace(/\n/g, ' / ')}`));
                } else if (tema.dataMudancas && t.novo && !bloco.novoInteiro) {
                    filhos.push(linhaDeMudanca(`NOVO EM ${tema.dataMudancas} — este texto nao existia.`, VERDE));
                }
                manifesto[codigo] = {
                    arquivo: fonte.arquivo,
                    rotulo: fonte.rotulo,
                    item: bloco.item,
                    chave: t.chave,
                    linha: t.linha,
                    original: t.texto,
                };
            }
            for (const r of bloco.retirados || []) {
                filhos.push(linhaDeMudanca(`RETIRADO EM ${tema.dataMudancas}: ${r.replace(/\n/g, ' / ')}`, 'B42318'));
            }
        }
        for (const ret of fonte.itensRetirados || []) {
            filhos.push(new Paragraph({
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 280, after: 120 },
                children: [new TextRun({ text: ret.item, size: 26, bold: true, color: 'B42318' })],
            }));
            for (const r of ret.textos) {
                filhos.push(linhaDeMudanca(`RETIRADO EM ${tema.dataMudancas}: ${r.replace(/\n/g, ' / ')}`, 'B42318'));
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
/**
 * Ficheiro que o git ve como modificado tem trabalho que nao esta em lugar
 * nenhum. Nem `--forcar` passa por cima dele.
 *
 * MOTIVO (08/10/2026): o Agnaldo fechou o PS para eu atualizar o tema do
 * desengasgo. Eu corri `git status && ... --forcar` encadeados; o git status
 * imprimiu "M docs/revisao-conteudo/PS-Primeiros-Socorros.docx" na linha de
 * cima e eu regerei em cima. A revisao que ele tinha em andamento foi
 * destruida — nao estava commitada, o AutoRecover do Word estava vazio, a
 * Protecao do Sistema do Windows esta desligada e sobrescrita nao passa pela
 * lixeira.
 *
 * "Fechei o documento para que vc pudesse atualizar este tema" nao e
 * autorizacao para regerar o documento inteiro. E a distincao que o
 * `--forcar` nao sabia fazer, e que agora e feita aqui: se o ficheiro diverge
 * do que esta commitado, ha trabalho nao guardado e o script para.
 *
 * Para ultrapassar e preciso `--descartar-modificacoes`, que tem de ser
 * escrito a mao e diz exactamente o que faz.
 */
const estaModificadoNoGit = (destino) => {
    try {
        const rel = path.relative(RAIZ, destino).split(path.sep).join('/');
        const saida = execFileSync('git', ['status', '--porcelain', '--', rel],
            { cwd: RAIZ, encoding: 'utf8' });
        return saida.trim().length > 0;
    } catch {
        return false;   // fora de um repo git: a copia de seguranca cobre
    }
};

const ehSeguroEscrever = (destino, forcar, descartar) => {
    if (!fs.existsSync(destino)) return true;
    if (!forcar) return false;
    if (estaModificadoNoGit(destino) && !descartar) return 'modificado';
    return true;
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

/**
 * Tema RP: o que entra vem do backlog da trava, nao de uma lista de arquivos.
 * Extrai com as chaves do RC — as mesmas da trava —, senao o texto pendente
 * nao e encontrado no arquivo.
 */
function selecaoDePendentes(tema) {
    const { avaliar } = require('./verify_revisao_conteudo');
    const motivos = new Set(tema.pendentes);
    const escolhidos = new Map();
    const arquivos = [];
    const { arquivosRevisados } = require('./verify_revisao_conteudo');
    const revisados = tema.somenteArquivosRevisados ? new Set(arquivosRevisados()) : null;
    const doJson = {};
    for (const t of avaliar().pendente) {
        if (!motivos.has(t.motivo)) continue;
        if (tema.arquivos && !tema.arquivos.includes(t.arquivo)
            && !(tema.motivosSempre || []).includes(t.motivo)) continue;
        if ((tema.excluirArquivos || []).includes(t.arquivo)) continue;
        if ((tema.excluirPrefixos || []).some((p) => t.arquivo.startsWith(p))) continue;
        if (t.arquivo.endsWith('.json')) (doJson[t.arquivo] = doJson[t.arquivo] || []).push(t);
        if (revisados && !revisados.has(t.arquivo)) continue;
        escolhidos.set(t.id, t.motivo);
        if (!arquivos.includes(t.arquivo)) arquivos.push(t.arquivo);
    }
    const conhecidas = TEMAS.flatMap((x) => x.fontes);
    const ordem = (a) => {
        const i = conhecidas.findIndex((c) => c.arquivo === a);
        return i < 0 ? Infinity : i;
    };
    const fontes = arquivos.sort((a, b) => ordem(a) - ordem(b)).map((arquivo) => {
        const conhecida = conhecidas.find((c) => c.arquivo === arquivo);
        const proprio = tema.rotulos && tema.rotulos[arquivo];
        return { arquivo, rotulo: proprio || (conhecida ? conhecida.rotulo : path.basename(arquivo, '.js')) };
    });
    // As MESMAS chaves da trava: o que ela registrou como pendente tem de ser achado aqui.
    const { OPCOES } = require('./verify_revisao_conteudo');
    return {
        escolhidos,
        fontes,
        doJson,
        blocosInteiros: Boolean(tema.blocosInteiros),
        marcarMudancas: tema.marcarMudancas !== false,
        marcarMotivos: tema.marcarMotivos || null,
        antes: tema.antes ? JSON.parse(fs.readFileSync(path.join(DESTINO, tema.antes), 'utf8')) : null,
        opcoes: {
            chavesExtras: [...OPCOES.chavesExtras, ...(tema.chavesExtras || [])],
            titulosExtras: OPCOES.titulosExtras,
            minimoConhecida: tema.minimoConhecida || OPCOES.minimoConhecida,
            titulosComoTexto: tema.titulosComoTexto,
            manterRepetidos: Boolean(tema.blocosInteiros),
        },
    };
}

/** Texto de common.json agrupado pelo primeiro nivel da chave (a tela ou a funcao). */
function blocosDoJson(textos) {
    const grupos = new Map();
    for (const t of textos) {
        const grupo = String(t.chave).split('.')[0];
        if (!grupos.has(grupo)) grupos.set(grupo, []);
        grupos.get(grupo).push({ texto: t.texto, chave: t.chave, linha: 0 });
    }
    return [...grupos].map(([item, lista]) => ({ item, textos: lista }));
}

/** Deixa so os textos escolhidos, cada um com a versao que o Agnaldo revisou (se houver). */
function filtrarPendentes(blocos, arquivo, selecao) {
    const { referenciaRevisada, impressao } = require('./verify_revisao_conteudo');
    const saida = [];
    for (const b of blocos) {
        const algum = b.textos.some((t) => selecao.escolhidos.has(impressao(t.texto)))
            || (b.chaveDoTitulo && selecao.escolhidos.has(impressao(b.item)));
        const textos = selecao.blocosInteiros && algum
            ? b.textos
            : b.textos.filter((t) => selecao.escolhidos.has(impressao(t.texto)));
        if (selecao.antes) {
            for (const t of textos) {
                const anterior = selecao.antes[impressao(t.texto)];
                if (anterior) t.antes = anterior;
                else t.novo = true;
            }
        }
        const marcar = (t) => (selecao.marcarMotivos
            ? selecao.marcarMotivos.includes(selecao.escolhidos.get(impressao(t.texto)))
            : selecao.marcarMudancas);
        for (const t of textos.filter(marcar)) {
            const versao = referenciaRevisada(arquivo, t.texto);
            if (versao) t.versaoRevisada = versao;
            else t.escritoDepois = true;
        }
        const tituloPendente = Boolean(b.chaveDoTitulo)
            && (selecao.escolhidos.has(impressao(b.item)) || (selecao.blocosInteiros && algum));
        if (!textos.length && !tituloPendente) continue;
        saida.push({ ...b, textos, chaveDoTitulo: tituloPendente ? b.chaveDoTitulo : undefined });
    }
    return saida;
}

const lerEstado = () => {
    try { return JSON.parse(fs.readFileSync(CAMINHO_ESTADO, 'utf8')); } catch { return {}; }
};

async function principal() {
    const forcar = process.argv.includes('--forcar');
    const descartar = process.argv.includes('--descartar-modificacoes');
    fs.mkdirSync(DESTINO, { recursive: true });
    const manifesto = {};
    const resumo = [];
    const preservados = [];
    const desatualizados = [];
    const copias = [];
    const bloqueados = [];
    const estadoAnterior = lerEstado();
    const estadoNovo = {};

    for (const tema of TEMAS) {
        const dados = [];
        const selecao = tema.pendentes ? selecaoDePendentes(tema) : null;
        const opcoes = selecao
            ? selecao.opcoes
            : { chavesExtras: tema.chavesExtras, titulosExtras: tema.titulosExtras };
        for (const fonte of selecao ? selecao.fontes : tema.fontes) {
            // common.json nao e codigo: o texto pendente vem pronto da trava, com a chave.
            const r = selecao && selecao.doJson[fonte.arquivo]
                ? { blocos: blocosDoJson(selecao.doJson[fonte.arquivo]) }
                : extrair(fonte.arquivo, opcoes);
            if (selecao) r.blocos = filtrarPendentes(r.blocos, fonte.arquivo, selecao);
            if (r.ausente) {
                console.warn(`  ! ausente: ${fonte.arquivo}`);
                continue;
            }
            const entrada = { ...fonte, blocos: r.blocos };
            if (tema.base) {
                let antigo = null;
                try {
                    antigo = execFileSync('git', ['show', `${tema.base}:${fonte.arquivo}`],
                        { cwd: RAIZ, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
                } catch { /* arquivo nao existia na base: tudo e novo */ }
                const antes = antigo ? extrair(fonte.arquivo, opcoes, antigo).blocos : [];
                entrada.itensRetirados = anotarMudancas(antes, r.blocos);
            }
            dados.push(entrada);
        }
        const doc = montarDocumento(tema, dados, manifesto);
        const nome = `${tema.sigla}-${tema.nome.replace(/\s+/g, '-')}.docx`;
        const destino = path.join(DESTINO, nome);
        const n = dados.reduce((s, f) => s + f.blocos.reduce((t, b) => t + b.textos.length, 0), 0);

        // O manifesto continua sendo gerado para todos os temas: ele reflete o
        // codigo de hoje e e a ancora do reimport. So o .docx e preservado.
        const digital = impressaoDigital(dados);

        const veredito = ehSeguroEscrever(destino, forcar, descartar);

        if (veredito === 'modificado') {
            bloqueados.push(nome);
            console.log(`  ${nome.padEnd(34)} ${String(n).padStart(4)} textos  (BLOQUEADO — modificado no git)`);
            continue;
        }

        if (!veredito) {
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

    // Documento PRESERVADO continua com os codigos que tem impressos. Regerar
    // o manifesto dele a partir do codigo de hoje desalinharia a volta.
    //
    // MOTIVO (19/10/2026): ao gerar o RC, o manifesto inteiro foi reescrito e
    // no AE nenhum codigo continuou apontando para o mesmo texto — o .docx do
    // Agnaldo e o manifesto passaram a falar de coisas diferentes.
    let manifestoAnterior = {};
    try { manifestoAnterior = JSON.parse(fs.readFileSync(path.join(DESTINO, '_manifesto.json'), 'utf8')); } catch { /* primeiro uso */ }
    const siglasPreservadas = TEMAS
        .filter((t) => preservados.includes(`${t.sigla}-${t.nome.replace(/\s+/g, '-')}.docx`))
        .map((t) => `${t.sigla}-`);
    for (const k of Object.keys(manifesto)) {
        if (siglasPreservadas.some((s) => k.startsWith(s))) delete manifesto[k];
    }
    for (const [k, v] of Object.entries(manifestoAnterior)) {
        if (siglasPreservadas.some((s) => k.startsWith(s))) manifesto[k] = v;
    }
    // Codigos de outros geradores (NV, RS) que este script nao conhece ficam.
    for (const [k, v] of Object.entries(manifestoAnterior)) {
        if (!TEMAS.some((t) => k.startsWith(`${t.sigla}-`)) && !(k in manifesto)) manifesto[k] = v;
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

    if (bloqueados.length) {
        console.log(`
  ${bloqueados.length} documento(s) BLOQUEADO(S) — o git ve modificacoes neles:`);
        bloqueados.forEach((n) => console.log(`    ${n}`));
        console.log('  Ha trabalho ai que nao esta guardado em lugar nenhum.');
        console.log('  Commite, ou confirme com quem revisou, antes de regerar.');
        console.log('  Para regerar mesmo assim, perdendo o que esta no ficheiro:');
        console.log('    node scripts/gerar_revisao_conteudo.js --forcar --descartar-modificacoes');
    }

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

    // TEMAS e uma lista feita a mao: nao ve arquivo novo nem prosa escrita numa
    // tela. A trava varre o app inteiro e diz o que ficou fora dos documentos.
    const { avaliar } = require('./verify_revisao_conteudo');
    const cobertura = avaliar();
    const fora = cobertura.pendente.length + cobertura.semRegistro.length;
    if (fora) {
        console.log(`\n  ATENCAO — ${fora} texto(s) de usuario fora de qualquer documento devolvido`
            + ` (${cobertura.semRegistro.length} sem registro nenhum).`);
        console.log('  Ver: node scripts/verify_revisao_conteudo.js --listar');
    }
}

// Exportado para o importador: `importar_revisao_conteudo.js` precisa saber
// quais paragrafos sao rotulo de papel deste gerador, e nao texto do revisor.
// Sem isto, "ITENS" e "DESCRICAO" entram como inclusao humana.
module.exports = { PAPEL_DO_CAMPO, MARCAS_DE_MUDANCA, TEMAS, extrair, montarDocumento };

// Só executa quando chamado direto — DEPOIS do module.exports: a trava
// (verify_revisao_conteudo) importa este arquivo de volta no fim de principal().
// O importador faz `require` deste ficheiro
// para ler PAPEL_DO_CAMPO; sem esta guarda, importar o gerador o RODAVA, e uma
// simples leitura de constante reescrevia o manifesto.
if (require.main === module) {
    principal().catch((e) => { console.error(e); process.exit(1); });
}
