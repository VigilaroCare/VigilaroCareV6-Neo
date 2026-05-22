// services/RiskInterpreterService.js
//
// "Coração de IA" do briefing vivo — fase INTERPRETAR do ciclo de 5
// fases (Compreender → Interpretar → Orientar → Acompanhar → Atualizar).
//
// Transforma { perfis (com comodosUsados), mapping, checklist state }
// em { prioridades por cômodo, contexto familiar, leitura narrativa }.
//
// Princípio: tom suave de orientação, NÃO alarmista. Output usado por
// SafetyActionPlanScreen, card "Seu mapa sensível" na Home, e demais
// telas que precisem ler o estado do briefing.
//
// ARQUITETURA: serviço puro, sem dependência de UI. Cache em memória
// reset a cada interpret() — fonte de verdade são os services de dados.

import { ChecklistService } from './ChecklistService';
import ProfileService from './ProfileService';
import { CHECKLISTS, AMBIENTES } from '../data/mapeamento_dados';
import { isAreaRelevant, isItemRelevant } from '../utils/ProfileFilterEngine';

// ---------------------------------------------------------------------------
// PESOS DE VULNERABILIDADE
// Valores aproximados — base para iteração via feedback real de usuários.
// ---------------------------------------------------------------------------
const VULNERABILITY_WEIGHTS = {
  bebe: 10,
  crianca_pequena: 8, // ≤ 6 anos
  crianca: 5,
  adolescente: 2,
  adulto: 1,
  idoso_avancado: 9, // ≥ 75 anos
  idoso: 6, // 60-74
  pcd: 7,
  gestante: 6,
  acamado: 9,
  pet_idoso: 5,
  pet_pcd: 6,
  pet_adulto: 1,
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  try {
    // Aceita "DD/MM/AAAA" ou ISO
    let nasc;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
      const [d, m, y] = dataNascimento.split('/');
      nasc = new Date(`${y}-${m}-${d}`);
    } else {
      nasc = new Date(dataNascimento);
    }
    if (Number.isNaN(nasc.getTime())) return null;
    const hoje = new Date();
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  } catch {
    return null;
  }
}

/**
 * Classifica um perfil em uma categoria de vulnerabilidade.
 * Retorna o nome da categoria + peso.
 */
function classifyProfile(profile) {
  if (!profile) return { categoria: 'adulto', peso: VULNERABILITY_WEIGHTS.adulto };

  const conditions = profile.necessidadesEspeciais || [];
  const idade = calcularIdade(profile.dataNascimento);

  // Pets
  if (profile.tipo === 'pet') {
    if (conditions.length > 0) return { categoria: 'pet_pcd', peso: VULNERABILITY_WEIGHTS.pet_pcd };
    const ageThreshold = profile.especie === 'gato' ? 10 : 7;
    if (idade !== null && idade >= ageThreshold) {
      return { categoria: 'pet_idoso', peso: VULNERABILITY_WEIGHTS.pet_idoso };
    }
    return { categoria: 'pet_adulto', peso: VULNERABILITY_WEIGHTS.pet_adulto };
  }

  // Condições específicas humanas (têm prioridade sobre faixa etária)
  if (conditions.includes('acamado')) return { categoria: 'acamado', peso: VULNERABILITY_WEIGHTS.acamado };
  if (conditions.includes('pcd')) return { categoria: 'pcd', peso: VULNERABILITY_WEIGHTS.pcd };
  if (conditions.includes('gestante')) return { categoria: 'gestante', peso: VULNERABILITY_WEIGHTS.gestante };

  // Faixa etária humana
  if (idade !== null) {
    if (idade <= 1) return { categoria: 'bebe', peso: VULNERABILITY_WEIGHTS.bebe };
    if (idade <= 6) return { categoria: 'crianca_pequena', peso: VULNERABILITY_WEIGHTS.crianca_pequena };
    if (idade <= 12) return { categoria: 'crianca', peso: VULNERABILITY_WEIGHTS.crianca };
    if (idade <= 17) return { categoria: 'adolescente', peso: VULNERABILITY_WEIGHTS.adolescente };
    if (idade >= 75) return { categoria: 'idoso_avancado', peso: VULNERABILITY_WEIGHTS.idoso_avancado };
    if (idade >= 60) return { categoria: 'idoso', peso: VULNERABILITY_WEIGHTS.idoso };
  }
  return { categoria: 'adulto', peso: VULNERABILITY_WEIGHTS.adulto };
}

/**
 * Frase humana descrevendo um residente para usar em "reasons".
 */
function nomeReadable(profile) {
  const nome = (profile.nome || '').split(' ')[0] || 'Sem nome';
  return nome;
}

const CATEGORIA_LABEL = {
  bebe: 'bebê',
  crianca_pequena: 'criança pequena',
  crianca: 'criança',
  adolescente: 'adolescente',
  adulto: 'adulto',
  idoso_avancado: 'idoso',
  idoso: 'idoso',
  pcd: 'pessoa com deficiência',
  gestante: 'gestante',
  acamado: 'pessoa acamada',
  pet_idoso: 'pet idoso',
  pet_pcd: 'pet com necessidades especiais',
  pet_adulto: 'pet',
};

// ---------------------------------------------------------------------------
// API PRINCIPAL
// ---------------------------------------------------------------------------

const RiskInterpreterService = {
  /**
   * Interpreta o estado completo e retorna prioridades + contexto + leitura.
   *
   * @returns {Promise<{
   *   prioridades: Array<{ roomId, label, score, criticalCount, warningCount, reasons[], residents[] }>,
   *   contexto: { totalPerfis, humanos, pets, vulneraveis, categorias },
   *   leitura: { resumo: string, recomendacao: string },
   *   meta: { calculatedAt: string, totalAmbientes: number }
   * }>}
   */
  async interpret() {
    try {
      // Carrega tudo de uma vez
      const [profiles, moradia, mapping] = await Promise.all([
        ProfileService.getPerfis(),
        ProfileService.getMoradia(),
        ProfileService.getMapping(),
      ]);

      const safeProfiles = Array.isArray(profiles) ? profiles : [];
      const safeMapping = Array.isArray(mapping) ? mapping : [];

      // Contexto familiar — classifica cada perfil
      const classified = safeProfiles.map((p) => ({
        ...p,
        _classificacao: classifyProfile(p),
      }));
      const humanos = classified.filter((p) => p.tipo !== 'pet');
      const pets = classified.filter((p) => p.tipo === 'pet');
      const vulneraveis = classified.filter((p) => p._classificacao.peso >= 5);
      const categorias = {};
      classified.forEach((p) => {
        const cat = p._classificacao.categoria;
        categorias[cat] = (categorias[cat] || 0) + 1;
      });

      // Para cada ambiente relevante, calcula score de prioridade
      const prioridades = [];
      const ambientesRelevantes = AMBIENTES.filter((a) =>
        isAreaRelevant(a, moradia, safeProfiles, safeMapping)
      );

      for (const area of ambientesRelevantes) {
        const structure = CHECKLISTS[area.id];
        if (!structure) continue;

        // Estado do checklist do cômodo
        const allState = await ChecklistService.getAllState();
        const areaState = allState[area.id] || {};

        // Conta itens críticos e warnings abertos (não-marcados)
        let criticalCount = 0;
        let warningCount = 0;
        const failedTitles = [];

        (structure.categorias || []).forEach((cat) => {
          (cat.itens || []).forEach((item) => {
            if (!isItemRelevant(item, safeProfiles, moradia)) return;
            const itemKey = item.titulo || item.text;
            const status = areaState[itemKey];
            const isChecked = status === true;
            if (!isChecked) {
              if (item.prioridade === 'maxima' || item.prioridade === 'critica') {
                criticalCount += 1;
                failedTitles.push(item.titulo || item.text);
              } else {
                warningCount += 1;
              }
            }
          });
        });

        // Residentes que usam este cômodo (consulta direta ao schema D1)
        const residents = classified.filter(
          (p) => Array.isArray(p.comodosUsados) && p.comodosUsados.includes(area.id)
        );
        const maxVulnerabilityWeight = residents.length > 0
          ? Math.max(...residents.map((r) => r._classificacao.peso))
          : 1; // adulto-equivalente quando ninguém declarou usar

        // Score: itens críticos × peso de vulnerabilidade + warnings (peso 1)
        const score = (criticalCount * maxVulnerabilityWeight) + (warningCount * 1);

        // Reasons em tom Agnaldo
        const reasons = [];
        if (criticalCount > 0) {
          reasons.push(
            `${criticalCount} ponto${criticalCount > 1 ? 's' : ''} de atenção urgente`
          );
        }
        if (warningCount > 0) {
          reasons.push(
            `${warningCount} item${warningCount > 1 ? 'ns' : ''} pendente${warningCount > 1 ? 's' : ''}`
          );
        }
        if (residents.length > 0) {
          const maxVuln = residents.reduce((acc, r) =>
            r._classificacao.peso > acc._classificacao.peso ? r : acc
          );
          if (maxVuln._classificacao.peso >= 6) {
            const cat = CATEGORIA_LABEL[maxVuln._classificacao.categoria] || 'pessoa';
            reasons.push(`${nomeReadable(maxVuln)} (${cat}) usa esse ambiente`);
          }
        }

        if (criticalCount > 0 || warningCount > 0) {
          prioridades.push({
            roomId: area.id,
            label: area.label || area.nome || area.id,
            score,
            criticalCount,
            warningCount,
            reasons,
            residents: residents.map((r) => ({
              id: r.id,
              nome: nomeReadable(r),
              categoria: r._classificacao.categoria,
            })),
            failedTitles,
          });
        }
      }

      // Ordena por score desc
      prioridades.sort((a, b) => b.score - a.score);

      // Leitura narrativa — tom suave Agnaldo
      const totalCritical = prioridades.reduce((s, p) => s + p.criticalCount, 0);
      const totalWarning = prioridades.reduce((s, p) => s + p.warningCount, 0);

      let resumo;
      let recomendacao;
      if (prioridades.length === 0) {
        resumo = 'Por enquanto, está tudo no eixo.';
        recomendacao = 'Continue conferindo os ambientes de vez em quando — pequenas mudanças aparecem.';
      } else if (totalCritical === 0) {
        resumo = `Há ${totalWarning} ponto${totalWarning > 1 ? 's' : ''} que merece${totalWarning > 1 ? 'm' : ''} atenção.`;
        recomendacao = 'Sem urgência — vamos cuidar disso por etapas.';
      } else if (totalCritical <= 2) {
        resumo = `${totalCritical} ponto${totalCritical > 1 ? 's' : ''} urgente${totalCritical > 1 ? 's' : ''} apareceu${totalCritical > 1 ? 'ram' : ''}.`;
        recomendacao = 'Vale começar por aí — é rápido e tira um peso.';
      } else {
        resumo = `${totalCritical} pontos urgentes precisam de atenção.`;
        recomendacao = 'Não precisa fazer tudo hoje. Comece pelo cômodo do topo da lista.';
      }

      return {
        prioridades,
        contexto: {
          totalPerfis: classified.length,
          humanos: humanos.length,
          pets: pets.length,
          vulneraveis: vulneraveis.length,
          categorias,
        },
        leitura: { resumo, recomendacao },
        meta: {
          calculatedAt: new Date().toISOString(),
          totalAmbientes: ambientesRelevantes.length,
        },
      };
    } catch (error) {
      if (__DEV__) console.error('[RiskInterpreterService.interpret] erro:', error);
      // Fallback seguro — não estoura na UI
      return {
        prioridades: [],
        contexto: { totalPerfis: 0, humanos: 0, pets: 0, vulneraveis: 0, categorias: {} },
        leitura: {
          resumo: 'Ainda estamos montando seu mapa sensível.',
          recomendacao: 'Conclua o briefing pra começarmos a cuidar junto.',
        },
        meta: { calculatedAt: new Date().toISOString(), totalAmbientes: 0, error: error?.message },
      };
    }
  },

  /**
   * Helper público — categoria + peso de um perfil.
   * Útil pra telas que precisem mostrar badge "idoso", "criança" etc.
   */
  classifyProfile,

  /**
   * Helper público — pesos de vulnerabilidade pra inspeção/debug.
   */
  VULNERABILITY_WEIGHTS,
};

export default RiskInterpreterService;
