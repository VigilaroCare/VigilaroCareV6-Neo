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

const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Normaliza string, array ou nulo numa lista limpa. */
const lista = (v) => {
    if (!v) return [];
    const arr = Array.isArray(v) ? v : String(v).split(/[,;\n]/);
    return arr.map((x) => String(x).trim()).filter(Boolean);
};

const AVISO_LEGAL =
    'Informações declaradas pelo próprio usuário no aplicativo Vigilaro Care. '
    + 'Não constituem prontuário, laudo ou prescrição médica, e não foram verificadas por profissional de saúde.';

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
        if (moradia?.andar) endereco.push(`${moradia.andar}º andar`);

        return {
            nome: profile.nome || 'Não informado',
            idade,
            tipoSanguineo: profile.tipoSanguineo || profile.saude?.tipoSanguineo || '',
            alergias: lista(profile.alergias ?? profile.saude?.alergias),
            condicoes: lista(saude?.conditions ?? profile.condicoesMedicas),
            medicamentos: (saude?.medications || []).map((m) => {
                const nome = m.nome || m.name || String(m);
                const dose = m.dosagem ? ` (${m.dosagem})` : '';
                const freq = m.frequencia ? `, ${m.frequencia}` : '';
                return `${nome}${dose}${freq}`;
            }),
            necessidades: lista(saude?.specialNeeds ?? profile.necessidadesEspeciais),
            endereco: endereco.join(', '),
            contatos,
            coords,
            geradoEm: new Date(),
        };
    }

    // ── SAÍDA 1: texto, para colar ────────────────────────────────────────
    static gerarTexto(f) {
        if (!f) return '';
        const bloco = (rotulo, itens) => `${rotulo}: ${itens.length ? itens.join(', ') : 'nenhuma'}`;
        const linhas = [
            `FICHA MÉDICA DE EMERGÊNCIA — ${f.nome}`,
            '',
            // Os dois primeiros são o que muda a conduta do socorro. Vêm antes
            // de tudo, inclusive do nome do app.
            `TIPO SANGUÍNEO: ${f.tipoSanguineo || 'não informado'}`,
            bloco('ALERGIAS', f.alergias).toUpperCase(),
            '',
            bloco('Condições médicas', f.condicoes),
            bloco('Medicamentos em uso', f.medicamentos),
        ];
        if (f.necessidades.length) linhas.push(bloco('Necessidades especiais', f.necessidades));
        if (f.idade != null) linhas.push(`Idade: ${f.idade} anos`);
        if (f.endereco) linhas.push(`Endereço: ${f.endereco}`);
        if (f.coords) linhas.push(`Localização: https://maps.google.com/?q=${f.coords.latitude},${f.coords.longitude}`);
        if (f.contatos.length) {
            linhas.push('', 'Contatos de emergência:');
            f.contatos.forEach((c) => linhas.push(`  ${c.nome || 'Contato'}: ${c.telefone}`));
        }
        linhas.push('', AVISO_LEGAL, `Gerada em ${f.geradoEm.toLocaleString('pt-BR')} · Vigilaro Care`);
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
                    <span class="critico-rotulo">Tipo sanguíneo</span>
                    <span class="critico-valor">${esc(f.tipoSanguineo || '—')}</span>
                </div>
                <div class="critico-item">
                    <span class="critico-rotulo">Alergias</span>
                    <span class="critico-valor ${f.alergias.length ? 'alerta' : ''}">${f.alergias.length ? esc(f.alergias.join(' · ')) : 'Nenhuma declarada'}</span>
                </div>
            </div>`;

        const secao = (titulo, conteudo) => `<h2>${esc(titulo)}</h2>${conteudo}`;

        const identificacao = [
            f.idade != null ? `${f.idade} anos` : null,
            f.endereco || null,
        ].filter(Boolean).join(' · ');

        const contatosHtml = f.contatos.length
            ? `<ul class="bullets">${f.contatos.map((c) => `<li><strong>${esc(c.nome || 'Contato')}</strong> — ${esc(c.telefone)}</li>`).join('')}</ul>`
            : '<p class="muted">Nenhum contato de emergência cadastrado.</p>';

        const body = `
            ${critico}
            ${secao('Condições médicas', `<div>${chips(f.condicoes, 'Nenhuma declarada')}</div>`)}
            ${secao('Medicamentos em uso', f.medicamentos.length
                ? `<ul class="bullets">${f.medicamentos.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>`
                : '<p class="muted">Nenhum declarado.</p>')}
            ${f.necessidades.length ? secao('Necessidades especiais', `<div>${chips(f.necessidades, '')}</div>`) : ''}
            ${secao('Contatos de emergência', contatosHtml)}
            ${f.coords ? `<p class="muted">Localização no momento da geração: ${f.coords.latitude}, ${f.coords.longitude}</p>` : ''}
            <div class="disclaimer">${esc(AVISO_LEGAL)}</div>`;

        return htmlDocument({
            title: `Ficha médica — ${f.nome}`,
            headline: f.nome,
            subtitle: identificacao || 'Ficha médica de emergência',
            bodyHtml: `<style>${FICHA_CSS}</style>${body}`,
            footerNote: `Gerada em ${f.geradoEm.toLocaleString('pt-BR')} · Vigilaro Care`,
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
                    dialogTitle: `Ficha médica — ${f.nome}`,
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
            await Share.share({ message: this.gerarTexto(f), title: `Ficha médica — ${f.nome}` });
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
