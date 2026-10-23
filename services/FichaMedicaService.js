/**
 * FichaMedicaService.js — a ficha médica de emergência, em um lugar só.
 *
 * ── POR QUE ESTE ARQUIVO EXISTE ──────────────────────────────────────────
 * Havia DUAS fichas, construídas em telas diferentes e discordando entre si:
 *
 *   MinhaSaudeScreen.handleShare   → texto com asteriscos; lia
 *       `condicoesMedicas` (certo), mas não levava endereço nem localização.
 *   SOSEmergencyModeScreenNeo      → texto com emoji; levava endereço e GPS,
 *       mas lia `profile.condicoesEspeciais || profile.condicoes` e
 *       `profile.idade` — três campos que o formulário de perfil NUNCA grava.
 *
 * O efeito do segundo caso era grave: a ficha entregue ao socorrista saía SEM
 * as condições médicas e SEM a idade. Diabetes, hipertensão, epilepsia — nada
 * aparecia. O dado estava à mão o tempo todo, em `HealthService.
 * getHealthSummary().conditions`; a ficha é que lia a fonte errada.
 *
 * Agora é uma coleta só, e dela saem as duas formas de entregar:
 *   • `gerarPdf()`   — documento para o médico, para imprimir, para a bolsa;
 *   • `gerarTexto()` — para colar no WhatsApp do socorro. Em emergência, texto
 *     tem vantagem real sobre anexo: abre em qualquer lugar, cola em qualquer
 *     campo e não depende de leitor de PDF numa tela bloqueada.
 *
 * ── ENQUADRAMENTO LEGAL ──────────────────────────────────────────────────
 * O documento diz, nele mesmo, que o conteúdo é DECLARADO PELO USUÁRIO e não
 * é prontuário nem laudo. Isso protege a empresa e, mais importante, informa
 * quem recebe a ficha sem saber de onde ela veio. O app registra o que a
 * pessoa informou; ele não diagnostica e não prescreve.
 */
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Share } from 'react-native';

import ProfileService from './ProfileService';
import HealthService from './HealthService';
import { Storage } from '../utils/SecureStorage';
import { htmlDocument } from '../utils/pdfReport';
import i18n from '../i18n';
import { tx } from '../utils/txFixo';
import { rotuloOpcaoPerfil } from '../data/opcoesPerfil';

// A ficha sai no idioma do app (D20): é o idioma de quem a entrega e, quase
// sempre, do país onde o socorro acontece. Antes saía sempre em português.
const L = (chave, pt, vars) => tx(`fichaMedica.${chave}`, vars ? { ...vars, defaultValue: pt } : pt);
const dataHora = (d) => d.toLocaleString(i18n.language || 'pt-BR');

const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Normaliza string, array ou nulo numa lista limpa. */
const lista = (v) => {
    if (!v) return [];
    const arr = Array.isArray(v) ? v : String(v).split(/[,;\n]/);
    return arr.map((x) => String(x).trim()).filter(Boolean);
};

const avisoLegal = () => L('avisoLegal',
    'Informações declaradas pelo próprio usuário no aplicativo Vigilaro Care. '
    + 'Não constituem prontuário, laudo ou prescrição médica, e não foram verificadas por profissional de saúde.');

class FichaMedicaService {
    /**
     * Reúne tudo que a ficha precisa. FONTE ÚNICA — as duas saídas leem daqui,
     * então não há como uma mostrar um dado que a outra esconde.
     *
     * `perfil` é opcional e vem pronto quando a tela já o tem — Minha Saúde
     * permite ver a ficha de outro familiar, e quem escolheu foi ela. Sem
     * perfil informado, cai no ativo, que é o caso do SOS.
     *
     * @param {{coords?: {latitude:number, longitude:number}, perfil?: object}} opts
     */
    static async coletar({ coords = null, perfil = null } = {}) {
        const profile = perfil || await ProfileService.getPerfilAtivo();
        if (!profile) return null;

        // getHealthSummary já lê os campos CERTOS (condicoesMedicas,
        // medicamentosEmUso, necessidadesEspeciais) e normaliza os remédios.
        let saude = null;
        try { saude = await HealthService.getHealthSummary(profile.id); } catch (_) { /* opcional */ }

        let moradia = null;
        try { moradia = await ProfileService.getMoradia(); } catch (_) { /* opcional */ }

        let contatos = [];
        try {
            const bruto = await Storage.getItem('@emergency_contacts');
            const parsed = bruto ? JSON.parse(bruto) : [];
            contatos = (Array.isArray(parsed) ? parsed : [])
                .map((c) => ({ nome: c.nome || c.name || '', telefone: c.telefone || c.phone || '' }))
                .filter((c) => c.telefone);
        } catch (_) { /* opcional */ }

        // Idade vem de dataNascimento. A ficha antiga lia `profile.idade`, que
        // o formulário não grava — por isso saía sempre "—".
        let idade = null;
        if (profile.dataNascimento) {
            try { idade = ProfileService.calcularIdade(profile.dataNascimento); } catch (_) { idade = null; }
        }
        if (idade == null && Number.isFinite(Number(profile.idade))) idade = Number(profile.idade);

        const endereco = [];
        if (moradia?.endereco) endereco.push(moradia.endereco);
        if (moradia?.cidade) endereco.push(moradia.cidade);
        if (moradia?.estado) endereco.push(moradia.estado);
        if (moradia?.andar) endereco.push(L('andar', '{{andar}}º andar', { andar: moradia.andar }));

        // Condições, alergias e necessidades são gravadas em pt-BR ou por id
        // ('visual', 'chronic_pain'); rotuloOpcaoPerfil devolve o texto no
        // idioma do app. Antes as necessidades saíam como o id cru.
        return {
            nome: profile.nome || L('naoInformado', 'Não informado'),
            idade,
            tipoSanguineo: profile.tipoSanguineo || profile.saude?.tipoSanguineo || '',
            alergias: lista(profile.alergias ?? profile.saude?.alergias).map(rotuloOpcaoPerfil),
            condicoes: lista(saude?.conditions ?? profile.condicoesMedicas).map(rotuloOpcaoPerfil),
            medicamentos: (saude?.medications || []).map((m) => {
                const nome = m.nome || m.name || String(m);
                const dose = m.dosagem ? ` (${m.dosagem})` : '';
                const freq = m.frequencia ? `, ${m.frequencia}` : '';
                return `${nome}${dose}${freq}`;
            }),
            necessidades: lista(saude?.specialNeeds ?? profile.necessidadesEspeciais).map(rotuloOpcaoPerfil),
            // Texto livre do perfil: como a pessoa se comunica e o que a acalma.
            comunicacao: String(profile.comunicacaoEmergencia || '').trim(),
            endereco: endereco.join(', '),
            contatos,
            coords,
            geradoEm: new Date(),
        };
    }

    // ── SAÍDA 1: texto, para colar ────────────────────────────────────────
    static gerarTexto(f) {
        if (!f) return '';
        const nenhuma = L('nenhuma', 'nenhuma');
        const bloco = (rotulo, itens) => `${rotulo}: ${itens.length ? itens.join(', ') : nenhuma}`;
        const linhas = [
            `${L('tituloTexto', 'FICHA MÉDICA DE EMERGÊNCIA')} — ${f.nome}`,
            '',
            // Os dois primeiros são o que muda a conduta do socorro. Vêm antes
            // de tudo, inclusive do nome do app.
            `${L('tipoSanguineoCaixaAlta', 'TIPO SANGUÍNEO')}: ${f.tipoSanguineo || L('naoInformadoMinusculo', 'não informado')}`,
            bloco(L('alergias', 'Alergias'), f.alergias).toUpperCase(),
            '',
            bloco(L('condicoesMedicas', 'Condições médicas'), f.condicoes),
            bloco(L('medicamentosEmUso', 'Medicamentos em uso'), f.medicamentos),
        ];
        if (f.necessidades.length) linhas.push(bloco(L('necessidadesEspeciais', 'Necessidades especiais'), f.necessidades));
        if (f.comunicacao) linhas.push(`${L('comunicacao', 'Comunicação e o que acalma')}: ${f.comunicacao}`);
        if (f.idade != null) linhas.push(`${L('idade', 'Idade')}: ${L('anos', '{{n}} anos', { n: f.idade })}`);
        if (f.endereco) linhas.push(`${L('endereco', 'Endereço')}: ${f.endereco}`);
        if (f.coords) linhas.push(`${L('localizacao', 'Localização')}: https://maps.google.com/?q=${f.coords.latitude},${f.coords.longitude}`);
        if (f.contatos.length) {
            linhas.push('', `${L('contatosEmergencia', 'Contatos de emergência')}:`);
            f.contatos.forEach((c) => linhas.push(`  ${c.nome || L('contato', 'Contato')}: ${c.telefone}`));
        }
        linhas.push('', avisoLegal(), `${L('geradaEm', 'Gerada em {{data}}', { data: dataHora(f.geradoEm) })} · Vigilaro Care`);
        return linhas.join('\n');
    }

    // ── SAÍDA 2: PDF ──────────────────────────────────────────────────────
    static gerarHtml(f) {
        if (!f) return '';
        const chips = (itens, vazio) => (itens.length
            ? itens.map((i) => `<span class="pill">${esc(i)}</span>`).join('')
            : `<span class="muted">${vazio}</span>`);

        // Tipo sanguíneo e alergias ganham bloco próprio e alto contraste: são
        // os dois dados que mudam a conduta nos primeiros segundos.
        const critico = `
            <div class="critico">
                <div class="critico-item">
                    <span class="critico-rotulo">${esc(L('tipoSanguineo', 'Tipo sanguíneo'))}</span>
                    <span class="critico-valor">${esc(f.tipoSanguineo || '—')}</span>
                </div>
                <div class="critico-item">
                    <span class="critico-rotulo">${esc(L('alergias', 'Alergias'))}</span>
                    <span class="critico-valor ${f.alergias.length ? 'alerta' : ''}">${f.alergias.length ? esc(f.alergias.join(' · ')) : esc(L('nenhumaDeclarada', 'Nenhuma declarada'))}</span>
                </div>
            </div>`;

        const secao = (titulo, conteudo) => `<h2>${esc(titulo)}</h2>${conteudo}`;

        const identificacao = [
            f.idade != null ? L('anos', '{{n}} anos', { n: f.idade }) : null,
            f.endereco || null,
        ].filter(Boolean).join(' · ');

        const contatosHtml = f.contatos.length
            ? `<ul class="bullets">${f.contatos.map((c) => `<li><strong>${esc(c.nome || L('contato', 'Contato'))}</strong> — ${esc(c.telefone)}</li>`).join('')}</ul>`
            : `<p class="muted">${esc(L('nenhumContato', 'Nenhum contato de emergência cadastrado.'))}</p>`;

        const body = `
            ${critico}
            ${secao(L('condicoesMedicas', 'Condições médicas'), `<div>${chips(f.condicoes, esc(L('nenhumaDeclarada', 'Nenhuma declarada')))}</div>`)}
            ${secao(L('medicamentosEmUso', 'Medicamentos em uso'), f.medicamentos.length
                ? `<ul class="bullets">${f.medicamentos.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`
                : `<p class="muted">${esc(L('nenhumDeclarado', 'Nenhum declarado.'))}</p>`)}
            ${f.necessidades.length ? secao(L('necessidadesEspeciais', 'Necessidades especiais'), `<div>${chips(f.necessidades, '')}</div>`) : ''}
            ${f.comunicacao ? secao(L('comunicacao', 'Comunicação e o que acalma'), `<p>${esc(f.comunicacao)}</p>`) : ''}
            ${secao(L('contatosEmergencia', 'Contatos de emergência'), contatosHtml)}
            ${f.coords ? `<p class="muted">${esc(L('localizacaoNaGeracao', 'Localização no momento da geração'))}: ${f.coords.latitude}, ${f.coords.longitude}</p>` : ''}
            <div class="disclaimer">${esc(avisoLegal())}</div>`;

        // htmlDocument() interpola estes valores direto em <title>, <h1> e <p>
        // (ver utils/pdfReport.js): o escape é responsabilidade de quem chama.
        // Nome e endereço são texto livre do usuário — um '<' no endereço comia
        // o resto do campo numa ficha de emergência.
        return htmlDocument({
            title: `${esc(L('fichaMedica', 'Ficha médica'))} — ${esc(f.nome)}`,
            headline: esc(f.nome),
            subtitle: esc(identificacao) || esc(L('fichaMedicaEmergencia', 'Ficha médica de emergência')),
            bodyHtml: `<style>${FICHA_CSS}</style>${body}`,
            footerNote: `${L('geradaEm', 'Gerada em {{data}}', { data: dataHora(f.geradoEm) })} · Vigilaro Care`,
        });
    }

    /** Gera o PDF e abre a folha de compartilhamento. */
    static async compartilharPdf(opts = {}) {
        const f = await this.coletar(opts);
        if (!f) return { ok: false, motivo: 'sem-perfil' };
        try {
            const { uri } = await Print.printToFileAsync({ html: this.gerarHtml(f) });
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    mimeType: 'application/pdf',
                    dialogTitle: `${L('fichaMedica', 'Ficha médica')} — ${f.nome}`,
                    UTI: 'com.adobe.pdf',
                });
                return { ok: true, uri };
            }
            return { ok: false, motivo: 'sem-compartilhamento', uri };
        } catch (e) {
            if (__DEV__) console.error('[FichaMedica] pdf:', e);
            return { ok: false, motivo: 'falha-pdf' };
        }
    }

    /** Compartilha a versão em texto (colável em qualquer campo). */
    static async compartilharTexto(opts = {}) {
        const f = await this.coletar(opts);
        if (!f) return { ok: false, motivo: 'sem-perfil' };
        try {
            await Share.share({ message: this.gerarTexto(f), title: `${L('fichaMedica', 'Ficha médica')} — ${f.nome}` });
            return { ok: true };
        } catch (e) {
            if (__DEV__) console.error('[FichaMedica] texto:', e);
            return { ok: false, motivo: 'falha-share' };
        }
    }
}

// Estilo específico da ficha. O shell e a identidade vêm de utils/pdfReport.js
// — aqui só entra o que a ficha tem e os relatórios não: o bloco crítico.
// Tamanhos em px parecem grandes de propósito: o expo-print diagrama largo e
// encolhe para caber na página (ver nota em utils/pdfReport.js).
const FICHA_CSS = `
  .critico { display: flex; gap: 16px; margin: 4px 0 8px; }
  .critico-item { flex: 1; border: 2px solid #14342B; border-radius: 10px; padding: 16px 18px; }
  .critico-rotulo { display: block; font-size: 17px; letter-spacing: 1px; text-transform: uppercase; color: #6B7280; margin-bottom: 6px; }
  .critico-valor { display: block; font-size: 34px; font-weight: 800; color: #14342B; line-height: 1.2; }
  .critico-valor.alerta { color: #B3261E; }
`;

export default FichaMedicaService;
