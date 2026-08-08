/**
 * RiscoService.js — Mapeamento ativo de riscos domésticos
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Responde a uma pergunta só: **de acordo com o que esta casa é e com quem
 * mora nela, quais são os pontos de atenção de cada ambiente?**
 *
 * ── O QUE MUDOU (e por quê) ────────────────────────────────────────────────
 *
 * A versão anterior deste serviço agregava `stats.failedItems` — ou seja,
 * pendências de checklist. Isso amarrava o mapa à vistoria: sem vistoria, mapa
 * vazio; e o que ele media era progresso de preenchimento, não risco.
 *
 * Aqui não se lê estado de vistoria em lugar nenhum. A matéria-prima é o que
 * o usuário já declarou no cadastro (moradia, moradores, ambientes mapeados).
 * O risco de uma escada com criança de 3 anos existe no instante em que os
 * dois são cadastrados — não quando alguém responde um questionário.
 *
 * Vistoria e mapa são momentos distintos e ambos continuam existindo:
 *   • Mapa    → diagnóstico. "Estes são os pontos de atenção da sua casa."
 *   • Vistoria→ verificação. "Vá conferir item a item."
 *
 * ── DE ONDE VEM A ANÁLISE ──────────────────────────────────────────────────
 *
 * Integralmente do `ProfileFilterEngine`, que já é a fonte única de "o que se
 * aplica a esta casa":
 *   • `isAreaRelevant`          → quais ambientes esta casa tem
 *   • `getRoomChecklistStructure`→ o conteúdo daquele ambiente
 *   • `isItemRelevant`          → quais pontos se aplicam a estes moradores
 *
 * ── ATRIBUIÇÃO DE CAUSA (o "pouquinho a mais") ─────────────────────────────
 *
 * Além de listar, o serviço diz POR QUE cada ponto se aplica, e a quem. A
 * derivação é feita perguntando ao próprio motor, sem reimplementar as regras
 * de tag (que mudariam junto e sairiam de sincronia):
 *
 *   isItemRelevant(item, [], moradia)   → true  ⇒ vale para a casa toda
 *   isItemRelevant(item, [pessoa], ...) → true  ⇒ esta pessoa ativa o ponto
 *
 * Assim, se o ProfileFilterEngine ganhar uma regra nova, a atribuição de causa
 * acompanha de graça.
 */

import { AMBIENTES } from '../data/mapeamento_dados';
import ProfileService from './ProfileService';
import {
    isAreaRelevant,
    isItemRelevant,
    getRoomChecklistStructure,
} from '../utils/ProfileFilterEngine';
import {
    ORDEM_CATEGORIAS,
    categoriasDoItem,
    severidadeDoItem,
    SEVERIDADES,
    auditarTaxonomia,
} from '../data/categoriasRisco';

class RiscoService {
    /**
     * Mapa completo da residência ativa.
     *
     * @returns {Promise<{
     *   residencia: {id, nome},
     *   perfilAtivo: {id, nome, primeiroNome, vulneravel}|null,
     *   ambientes: Array,
     *   categorias: Array,
     *   totais: object
     * }>}
     */
    async getMapaDeRiscos() {
        try {
            const residencia = await ProfileService.getActiveResidence();
            if (!residencia) return this._vazio();

            // getPerfis(): só quem mora NESTA casa.
            const perfis = await ProfileService.getPerfis();
            const mapping = Array.isArray(residencia.mapping) ? residencia.mapping : [];
            const perfilAtivo = await ProfileService.getPerfilAtivo();

            const ambientes = AMBIENTES
                .filter(area => isAreaRelevant(area, residencia, perfis, mapping) && !area.id.includes('kit'))
                .map(area => this._analisarAmbiente(area, residencia, perfis, mapping, perfilAtivo))
                .filter(Boolean);

            // Ordem de leitura. Primeiro o recorte da pessoa em foco (ambientes
            // que ela usa ou que existem por causa dela); dentro disso, o que
            // tem mais pontos de severidade alta.
            const ligadoAoAtivo = a => (a.ativoOcupa || a.doPerfilAtivo > 0) ? 1 : 0;
            ambientes.sort((a, b) => {
                const la = ligadoAoAtivo(a), lb = ligadoAoAtivo(b);
                if (la !== lb) return lb - la;
                if (b.severidadeAlta !== a.severidadeAlta) return b.severidadeAlta - a.severidadeAlta;
                return b.totalPontos - a.totalPontos;
            });

            if (__DEV__) auditarTaxonomia();

            return {
                residencia: { id: residencia.id, nome: residencia.nome || '' },
                perfilAtivo: perfilAtivo ? {
                    id: perfilAtivo.id,
                    nome: perfilAtivo.nome || '',
                    primeiroNome: (perfilAtivo.nome || '').split(' ')[0],
                    tipo: perfilAtivo.tipo,
                } : null,
                ambientes,
                categorias: this._consolidarCategorias(ambientes),
                totais: this._totais(ambientes),
            };
        } catch (error) {
            if (__DEV__) console.error('[RiscoService] getMapaDeRiscos:', error);
            return this._vazio();
        }
    }

    /**
     * Análise de UM ambiente. Usado tanto pelo mapa quanto pela tela de
     * detalhe — o detalhe não recalcula por conta própria.
     */
    async getAmbiente(areaId) {
        try {
            const residencia = await ProfileService.getActiveResidence();
            if (!residencia) return null;
            const area = AMBIENTES.find(a => a.id === areaId);
            if (!area) return null;

            const perfis = await ProfileService.getPerfis();
            const mapping = Array.isArray(residencia.mapping) ? residencia.mapping : [];
            const perfilAtivo = await ProfileService.getPerfilAtivo();

            return this._analisarAmbiente(area, residencia, perfis, mapping, perfilAtivo);
        } catch (error) {
            if (__DEV__) console.error('[RiscoService] getAmbiente:', error);
            return null;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Núcleo da análise
    // ═══════════════════════════════════════════════════════════════════════

    _analisarAmbiente(area, moradia, perfis, mapping, perfilAtivo) {
        const estrutura = getRoomChecklistStructure(area.id, perfis, moradia, mapping);
        if (!estrutura || !Array.isArray(estrutura.categorias)) return null;

        // Vínculo do AMBIENTE (distinto do vínculo de cada ponto). Um quarto de
        // idoso existe no mapa por causa da idosa da casa, mas seus itens não
        // carregam a tag 'idosos' — o cômodo inteiro já é condicional, então o
        // conteúdo não precisou marcar item a item. Sem isto, o ambiente mais
        // claramente ligado a uma pessoa aparecia como "sem envolvidos".
        const motivo = this._motivoDoAmbiente(area, perfis);
        const ocupantes = this._ocupantes(area.id, perfis);
        const ativoOcupa = !!perfilAtivo && ocupantes.some(p => p.id === perfilAtivo.id);

        const porCategoria = {};
        let totalPontos = 0;
        let severidadeAlta = 0;
        let doPerfilAtivo = 0;

        estrutura.categorias.forEach(cat => {
            (cat.itens || []).forEach(item => {
                // O ponto só existe se se aplica a esta casa e a estes moradores.
                if (!isItemRelevant(item, perfis, moradia)) return;

                const causa = this._atribuirCausa(item, moradia, perfis);
                const severidade = severidadeDoItem(item);
                const ativoEnvolvido = !!perfilAtivo
                    && causa.perfis.some(p => p.id === perfilAtivo.id);

                totalPontos++;
                if (severidade === 'alta') severidadeAlta++;
                if (ativoEnvolvido) doPerfilAtivo++;

                const ponto = {
                    // Guarda o item cru: o t_field da tela resolve titulo/_en/_es/_ptpt.
                    item,
                    secao: cat,
                    severidade,
                    causa,
                    ativoEnvolvido,
                };

                categoriasDoItem(item).forEach(catId => {
                    if (!porCategoria[catId]) {
                        porCategoria[catId] = { id: catId, pontos: [], severidadeAlta: 0, doPerfilAtivo: 0 };
                    }
                    const bucket = porCategoria[catId];
                    bucket.pontos.push(ponto);
                    if (severidade === 'alta') bucket.severidadeAlta++;
                    if (ativoEnvolvido) bucket.doPerfilAtivo++;
                });
            });
        });

        if (totalPontos === 0) return null;

        // Categorias de risco (ordem canônica) + preparação sempre por último.
        const categorias = ORDEM_CATEGORIAS
            .filter(id => porCategoria[id])
            .map(id => this._ordenarPontos(porCategoria[id]));
        const preparacao = porCategoria.preparacao
            ? this._ordenarPontos(porCategoria.preparacao)
            : null;

        return {
            id: area.id,
            ambiente: area,
            icone: area.icone || 'House',
            categorias,
            preparacao,
            totalPontos,
            severidadeAlta,
            // Pontos que existem POR CAUSA do perfil ativo (atribuição precisa).
            doPerfilAtivo,
            // O perfil ativo declarou usar este ambiente (exposição declarada).
            // Sinal distinto do acima: em `cozinha`, quem cozinha está exposto
            // a tudo, mas só alguns pontos existem por causa dele.
            ativoOcupa,
            motivo,
            ocupantes,
            // Moradores ligados a este ambiente: quem ativa algum ponto + quem
            // motiva o próprio cômodo existir.
            envolvidos: this._envolvidos(categorias, preparacao, motivo),
        };
    }

    /**
     * Por que este AMBIENTE está no mapa. Espelha a condicional que o
     * `isAreaRelevant` usa para decidir se o cômodo existe: quarto de bebê,
     * de criança e de idoso são gated por quem mora na casa; os demais vêm
     * do que foi declarado sobre a moradia.
     */
    _motivoDoAmbiente(area, perfis) {
        const cond = area?.condicional;
        if (!['bebe', 'crianca', 'idoso'].includes(cond)) {
            return { origem: 'moradia', perfis: [] };
        }
        const faixa = { bebe: ['baby'], crianca: ['child'], idoso: ['elderly'] }[cond];
        const correspondem = (perfis || []).filter(p =>
            p.tipo === cond || faixa.includes(ProfileService.getFaixaEtaria(p?.dataNascimento))
        ).map(p => this._resumoPerfil(p));

        return correspondem.length > 0
            ? { origem: 'morador', perfis: correspondem, condicional: cond }
            : { origem: 'moradia', perfis: [] };
    }

    /** Moradores que declararam usar este ambiente (`comodosUsados`). */
    _ocupantes(areaId, perfis) {
        return (perfis || [])
            .filter(p => Array.isArray(p?.comodosUsados) && p.comodosUsados.includes(areaId))
            .map(p => this._resumoPerfil(p));
    }

    _resumoPerfil(p) {
        return {
            id: p.id,
            nome: p.nome || '',
            primeiroNome: (p.nome || '').split(' ')[0],
            tipo: p.tipo,
        };
    }

    /**
     * Por que este ponto se aplica.
     *
     * Delegado ao ProfileFilterEngine, nunca reimplementado: se o item continua
     * relevante com ZERO moradores, ele vem da casa (estrutura, ambientes
     * declarados); se não, vêm dele as pessoas que sozinhas o tornam relevante.
     *
     * @returns {{origem:'moradia'|'morador', perfis:Array<{id,nome,primeiroNome,tipo}>}}
     */
    _atribuirCausa(item, moradia, perfis) {
        if (isItemRelevant(item, [], moradia)) {
            return { origem: 'moradia', perfis: [] };
        }
        const responsaveis = (perfis || [])
            .filter(p => isItemRelevant(item, [p], moradia))
            .map(p => this._resumoPerfil(p));
        // Sem responsável identificável (regra que depende de combinação de
        // moradores) o ponto ainda é real — atribui à casa em vez de sumir.
        return responsaveis.length > 0
            ? { origem: 'morador', perfis: responsaveis }
            : { origem: 'moradia', perfis: [] };
    }

    /** Severidade alta primeiro; dentro dela, os do perfil ativo à frente. */
    _ordenarPontos(bucket) {
        const pontos = [...bucket.pontos].sort((a, b) => {
            if (a.ativoEnvolvido !== b.ativoEnvolvido) return a.ativoEnvolvido ? -1 : 1;
            return SEVERIDADES[b.severidade].peso - SEVERIDADES[a.severidade].peso;
        });
        return { ...bucket, pontos, total: pontos.length };
    }

    _envolvidos(categorias, preparacao, motivo) {
        const mapa = new Map();
        const registrar = (perfil, incrementa) => {
            if (!mapa.has(perfil.id)) mapa.set(perfil.id, { ...perfil, pontos: 0 });
            if (incrementa) mapa.get(perfil.id).pontos++;
        };
        // Quem motiva o cômodo entra mesmo sem ativar item algum.
        (motivo?.perfis || []).forEach(p => registrar(p, false));
        [...categorias, ...(preparacao ? [preparacao] : [])].forEach(cat => {
            cat.pontos.forEach(p => p.causa.perfis.forEach(perfil => registrar(perfil, true)));
        });
        return [...mapa.values()].sort((a, b) => b.pontos - a.pontos);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Consolidação da casa
    // ═══════════════════════════════════════════════════════════════════════

    /** Categorias presentes na casa toda — alimenta a legenda e o filtro. */
    _consolidarCategorias(ambientes) {
        const acc = {};
        ambientes.forEach(amb => {
            amb.categorias.forEach(cat => {
                if (!acc[cat.id]) acc[cat.id] = { id: cat.id, pontos: 0, severidadeAlta: 0, ambientes: 0 };
                acc[cat.id].pontos += cat.total;
                acc[cat.id].severidadeAlta += cat.severidadeAlta;
                acc[cat.id].ambientes += 1;
            });
        });
        return ORDEM_CATEGORIAS
            .filter(id => acc[id])
            .map(id => acc[id])
            .sort((a, b) => b.severidadeAlta - a.severidadeAlta || b.pontos - a.pontos);
    }

    _totais(ambientes) {
        return ambientes.reduce((acc, a) => ({
            ambientes: acc.ambientes + 1,
            pontos: acc.pontos + a.totalPontos,
            severidadeAlta: acc.severidadeAlta + a.severidadeAlta,
            doPerfilAtivo: acc.doPerfilAtivo + a.doPerfilAtivo,
        }), { ambientes: 0, pontos: 0, severidadeAlta: 0, doPerfilAtivo: 0 });
    }

    _vazio() {
        return {
            residencia: { id: null, nome: '' },
            perfilAtivo: null,
            ambientes: [],
            categorias: [],
            totais: { ambientes: 0, pontos: 0, severidadeAlta: 0, doPerfilAtivo: 0 },
        };
    }
}

export default new RiscoService();
