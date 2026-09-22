/**
 * TravelReportService.js — Dossiê de Viagem em PDF compartilhável.
 *
 * Espelha o SafetyReportService: coleta cruzada -> IA opcional -> PDF -> share.
 * É um MAPA CONSULTIVO de orientação (não doc de emergência): COLHE o que o Modo
 * Viagem já sabe (briefing @active_trip + seções do Guia casadas por matchesTrip
 * + kits dinâmicos + fichas de saúde dos viajantes) e organiza num PDF.
 * Ver memória project-relatorio-viagem.
 *
 * Fonte ÚNICA do conteúdo: GUIDE_SECTIONS/matchesTrip e buildDynamicKits/
 * TRANSPORTE_AEREO são REUSADOS das telas via export (não duplicar regra
 * regulatória). [dívida: extrair esse conteúdo para data/ no futuro]
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { t_field, t_array } from '../utils/getLocalizedField';
import { htmlDocument } from '../utils/pdfReport';
import ProfileService from './ProfileService';

const TRIP_TYPE_LABELS = {
    rural: 'Área Rural', praia: 'Litoral', urbano: 'Área Urbana', resort: 'Resort e Lazer',
};

// Escapa conteúdo do usuário (nomes/condições) para não quebrar o HTML do PDF.
const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Campos médicos são arrays de string OU objeto — normaliza para texto.
const asList = (arr) => (Array.isArray(arr) ? arr : [])
    .map(it => (typeof it === 'string' ? it : (it?.nome || it?.label || it?.descricao || '')))
    .filter(Boolean);

class TravelReportService {

    async getTravelReportData() {
        try {
            const raw = await AsyncStorage.getItem('@active_trip');
            const trip = raw ? JSON.parse(raw) : null;
            if (!trip) return null;

            // Conteúdo compartilhado (exportado das telas — fonte única).
            const { GUIDE_SECTIONS, matchesTrip } = require('../screens/Education/TravelSafetyGuideScreen');
            const { buildDynamicKits, TRANSPORTE_AEREO } = require('../screens/Travel/FazendoAsMalasScreen');

            const sections = GUIDE_SECTIONS
                .filter(s => matchesTrip(s, trip))
                .sort((a, b) => a.prio - b.prio);

            const kits = buildDynamicKits(trip);

            // Viajantes do lar + fichas de saúde de apoio.
            let humanos = [], pets = [];
            try {
                humanos = await ProfileService.getPerfisHumanos();
                if (trip.config?.hasPets) pets = await ProfileService.getPets();
            } catch (_) { /* perfis opcionais */ }

            const travelers = (humanos || []).map(p => ({
                nome: p.nome || 'Viajante',
                idade: p.dataNascimento ? ProfileService.calcularIdade(p.dataNascimento) : null,
                tipoSanguineo: p.tipoSanguineo || '',
                condicoes: asList(p.condicoesMedicas),
                alergias: asList(p.alergias),
                medicamentos: asList(p.medicamentosEmUso),
                necessidades: asList(p.necessidadesEspeciais),
            }));

            const petList = (pets || []).map(p => ({
                nome: p.nome || 'Pet',
                especie: p.especie || '', raca: p.raca || '',
                condicoes: asList(p.condicoesMedicas),
                alergias: asList(p.alergias),
                medicamentos: asList(p.medicamentosEmUso),
            }));

            return {
                trip,
                tripLabel: TRIP_TYPE_LABELS[trip.type] || 'Viagem',
                isInternational: !!trip.config?.isInternational,
                sections,
                kits,
                transporteAereo: TRANSPORTE_AEREO,
                travelers,
                pets: petList,
                generatedAt: new Date().toISOString(),
            };
        } catch (e) {
            if (__DEV__) console.error('TravelReportService.getTravelReportData', e);
            return null;
        }
    }

    // IA é camada OPCIONAL — o dossiê funciona offline sem ela.
    async getAITravelBriefing(data) {
        try {
            const OpenAIService = require('./OpenAIService').default;
            if (typeof OpenAIService.generateTravelBriefing !== 'function') return null;
            return await OpenAIService.generateTravelBriefing(data);
        } catch (e) {
            // IA é OPCIONAL — falha esperada sem o proxy/chave configurados
            // (deploy Vercel pendente). O dossiê segue com o resumo curado
            // offline; não é erro de app, então logamos como info.
            if (__DEV__) console.log('[Dossiê] Briefing de IA indisponível — usando resumo offline:', e?.message);
            return null;
        }
    }

    buildHTML(data, ai, opts = {}) {
        // Dado sensível só entra no PDF exportado se o usuário consentir no export.
        const includeHealth = opts.includeHealth !== false;
        const { trip, tripLabel, isInternational, sections, kits, transporteAereo, travelers, pets } = data;

        const purpose = trip.purpose === 'trabalho' ? 'Trabalho' : 'Lazer';
        const companions = [];
        if (trip.config?.hasKids) companions.push('Crianças');
        if (trip.config?.hasElderly) companions.push('Idosos');
        if (trip.config?.hasPets) companions.push('Pets');
        if (trip.config?.hasPcd) companions.push('PCD');
        const chips = [tripLabel, purpose, isInternational ? 'Internacional' : 'Nacional', ...companions];

        // Mapa consultivo: IA quando há; senão, resumo curado (offline).
        let mapaHtml;
        if (ai && (ai.resumo || (Array.isArray(ai.prioridades) && ai.prioridades.length))) {
            // O dossiê é exportado e compartilhado. Trecho gerado por IA sai
            // identificado como tal — exigência de transparência e proteção de
            // quem recebe o PDF sem saber como ele foi montado.
            mapaHtml = `
                ${ai.resumo ? `<div class="lead">${esc(ai.resumo)}</div>` : ''}
                ${(Array.isArray(ai.prioridades) && ai.prioridades.length)
                    ? `<ul class="bullets">${ai.prioridades.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
                <p class="source">Resumo gerado por inteligência artificial a partir dos dados da sua viagem. Confira as fontes oficiais antes de decidir.</p>`;
        } else {
            const topicos = sections.slice(0, 4).map(s => esc(t_field(s, 'title'))).filter(Boolean);
            mapaHtml = `<div class="lead">Este dossiê reúne o que importa para a sua viagem de ${esc(tripLabel.toLowerCase())} (${esc(purpose.toLowerCase())}${isInternational ? ', internacional' : ''}).${topicos.length ? ' Pontos de atenção: ' + topicos.join(' · ') + '.' : ''}</div>`;
        }

        const orientacoesHtml = sections.length ? sections.map(s => `
            <div class="card">
                <h3>${esc(t_field(s, 'title'))}</h3>
                <div class="muted">${esc(t_field(s, 'content'))}</div>
                <ul class="bullets">${t_array(s, 'bullets').map(b => `<li>${esc(b)}</li>`).join('')}</ul>
                ${t_field(s, 'source') ? `<div class="source">${esc(t_field(s, 'source'))}</div>` : ''}
            </div>`).join('') : '<p class="muted">Sem orientações específicas para este briefing.</p>';

        const kitsHtml = kits.map(k => `
            <div class="card">
                <h3>${esc(k.title)}</h3>
                <ul class="bullets">${(k.items || []).map(i => `<li>${esc(i)}</li>`).join('')}</ul>
            </div>`).join('');

        const aereoHtml = transporteAereo ? `
            <div class="card">
                <h3>${esc(transporteAereo.title)}</h3>
                <div class="muted">${esc(transporteAereo.intro)}</div>
                <ul class="bullets">${(transporteAereo.blocos || []).map(b => `<li><strong>${esc(b.rotulo)}:</strong> ${esc(b.regra)}</li>`).join('')}</ul>
                <div class="source">Fonte: ${esc(transporteAereo.fonte)} · vigente em ${esc(transporteAereo.revisao)}. Confirme com a sua companhia.</div>
            </div>` : '';

        const fichaLinha = (label, arr) => arr.length ? `<div class="muted"><strong>${label}:</strong> ${esc(arr.join(', '))}</div>` : '';
        const travelersHtml = travelers.map(t => `
            <div class="card">
                <h3>${esc(t.nome)}${t.idade != null ? ` <span class="muted">· ${t.idade} anos</span>` : ''}${t.tipoSanguineo ? ` <span class="pill">${esc(t.tipoSanguineo)}</span>` : ''}</h3>
                ${fichaLinha('Condições', t.condicoes)}
                ${fichaLinha('Alergias', t.alergias)}
                ${fichaLinha('Medicamentos', t.medicamentos)}
                ${fichaLinha('Necessidades', t.necessidades)}
                ${(!t.condicoes.length && !t.alergias.length && !t.medicamentos.length && !t.necessidades.length) ? '<div class="muted">Sem registros de saúde.</div>' : ''}
            </div>`).join('');
        const petsHtml = pets.map(p => `
            <div class="card">
                <h3>${esc(p.nome)}${(p.especie || p.raca) ? ` <span class="muted">· ${esc([p.especie, p.raca].filter(Boolean).join(' '))}</span>` : ''}</h3>
                ${fichaLinha('Condições', p.condicoes)}
                ${fichaLinha('Alergias', p.alergias)}
                ${fichaLinha('Medicamentos', p.medicamentos)}
            </div>`).join('');

        const numbers = isInternational
            ? 'Europa: 112 · EUA/Canadá: 911 — confirme o número local do destino.'
            : 'SAMU: 192 · Bombeiros: 193 · Polícia: 190.';
        const emergHtml = `
            <div class="card">
                <ul class="bullets">
                    <li><strong>Emergência:</strong> ${numbers}</li>
                    <li><strong>Intoxicação (CIATOX):</strong> 0800 722 6001 (24h, Brasil).</li>
                    ${isInternational ? '<li><strong>Consulado brasileiro:</strong> anote o contato no destino e mantenha a apólice do seguro acessível offline.</li>' : ''}
                </ul>
            </div>`;

        const body = `
            <h2>Mapa consultivo</h2>
            <div>${chips.map(c => `<span class="pill">${esc(c)}</span>`).join('')}</div>
            ${mapaHtml}

            <h2>Orientações para esta viagem</h2>
            ${orientacoesHtml}

            <h2>Bagagem sugerida</h2>
            ${kitsHtml}

            ${aereoHtml ? `<h2>Bagagem aérea</h2>${aereoHtml}` : ''}

            ${(includeHealth && (travelersHtml || petsHtml)) ? `<h2>Fichas de saúde dos viajantes</h2>${travelersHtml}${petsHtml}` : ''}

            <h2>Contatos de emergência</h2>
            ${emergHtml}

            <div class="disclaimer">As regras de viagem e as exigências de cada destino mudam com frequência. Este dossiê é um guia de orientação — não substitui as fontes oficiais. Confirme com a companhia aérea, o consulado e os órgãos oficiais antes de viajar.</div>`;

        const when = new Date(data.generatedAt);
        return htmlDocument({
            title: `Dossiê de Viagem — ${tripLabel}`,
            headline: 'Dossiê de Viagem',
            subtitle: `${tripLabel} · ${purpose}${isInternational ? ' · Internacional' : ''}`,
            bodyHtml: body,
            footerNote: `Gerado em ${when.toLocaleDateString()} · Vigilaro Care — prevenção familiar.`,
        });
    }

    async generateTravelPDF({ withAI = true, includeHealth = true } = {}) {
        const data = await this.getTravelReportData();
        if (!data) throw new Error('Nenhuma viagem ativa para gerar o dossiê.');

        const ai = withAI ? await this.getAITravelBriefing(data) : null;
        const html = this.buildHTML(data, ai, { includeHealth });

        const { uri } = await Print.printToFileAsync({ html });
        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri, {
                mimeType: 'application/pdf',
                dialogTitle: 'Dossiê de Viagem — Vigilaro Care',
                UTI: 'com.adobe.pdf',
            });
            return true;
        }
        return uri;
    }
}

export default new TravelReportService();
