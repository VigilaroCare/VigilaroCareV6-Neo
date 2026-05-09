/**
 * SafetyContent.js
 * Repositório central de conteúdo "atomizado" do Blog Prevenir em Casa.
 * Contém Guias, Checklists e Protocolos.
 */

import { Colors } from "../utils/Theme";

// =============================================================================
// 1. GUIAS DE APRENDIZADO (Leitura)
// =============================================================================
export const GUIDES = [
    {
        id: "panela_pressao",
        titulo: "Segredos da Panela de Pressão",
        descricao: "Ela é sua amiga na cozinha! Veja como usar com total segurança.",
        categoria: "Cozinha",
        icone: "restaurant-outline",
        cor: "#FF9800",
        conteudo: [
            { titulo: "A Válvula de Segurança", texto: "Nunca opere a panela se a válvula estiver suja ou entupida. Limpe-a com um agulha ou arame fino a cada uso.", tipo: "perigo" },
            { titulo: "A Borracha de Vedação", texto: "Se estiver ressecada ou quebradiça, troque imediatamente. Ela garante que a pressão não escape pelas laterais.", tipo: "dica" },
            { titulo: "Nível de Água", texto: "Nunca encha mais de 2/3 da panela. O vapor precisa de espaço para se formar.", tipo: "dica" },
            { titulo: "Resfriamento", texto: "Jamais force a abertura. Deixe esfriar naturalmente ou coloque sob água corrente fria (sem molhar a válvula).", tipo: "perigo" },
        ]
    },
    {
        id: "seguranca_idosos",
        titulo: "Casa Segura para Avós",
        descricao: "Pequenos ajustes que garantem liberdade e evitam quedas.",
        categoria: "Idosos",
        icone: "body-outline",
        cor: "#2196F3",
        conteudo: [
            { titulo: "Tapetes Soltos", texto: "São os maiores vilões. Remova-os ou use fitas dupla-face potentes para fixá-los.", tipo: "perigo" },
            { titulo: "Barras de Apoio", texto: "Instale no box e ao lado do vaso sanitário. A altura ideal é 75cm do chão.", tipo: "dica" },
            { titulo: "Iluminação", texto: "Instale luzes com sensor de movimento no trajeto quarto-banheiro para a noite.", tipo: "dica" },
            { titulo: "Calçados", texto: "Prefira sapatos fechados e com solado de borracha. Chinelos de dedo aumentam o risco de tropeço.", tipo: "dica" },
        ]
    },
    {
        id: "engasgo_bebe",
        titulo: "Bebê Engasgou: Calma e Ação",
        descricao: "Respire fundo. Aqui está exatamente o que você precisa fazer.",
        categoria: "Bebês",
        icone: "happy-outline",
        cor: "#E91E63",
        conteudo: [
            { titulo: "Sinais de Engasgo", texto: "Bebê roxo, sem conseguir chorar ou tossir. Se ele tossir, incentive a tosse.", tipo: "perigo" },
            { titulo: "Manobra de Heimlich (Bebês)", texto: "Coloque o bebê de bruços no seu antebraço e dê 5 tapas firmes nas costas.", tipo: "dica" },
            { titulo: "Leite Materno", texto: "Se engasgar mamando, pare, coloque em pé para arrotar e acalme. Não sacuda o bebê.", tipo: "dica" },
        ]
    },
    {
        id: "queimaduras",
        titulo: "Socorro em Queimaduras",
        descricao: "Aprenda o jeito certo (e simples) de aliviar a dor e proteger a pele.",
        categoria: "Geral",
        icone: "flame-outline",
        cor: "#F44336",
        conteudo: [
            { titulo: "O que fazer", texto: "Coloque a área queimada sob água corrente fria por 10 a 15 minutos.", tipo: "dica" },
            { titulo: "O que NÃO fazer", texto: "Nunca passe pasta de dente, manteiga ou pó de café. Isso infecta a ferida.", tipo: "perigo" },
            { titulo: "Bolhas", texto: "Nunca estoure as bolhas. Elas são um curativo natural do corpo.", tipo: "perigo" },
        ]
    },
    {
        id: "brinquedos_seguros",
        titulo: "Brincar sem Sustos",
        descricao: "Como escolher brinquedos que divertem e protegem.",
        categoria: "Crianças",
        icone: "cube-outline",
        cor: "#9C27B0",
        conteudo: [
            { titulo: "O Teste do Tubo", texto: "Para menores de 3 anos: Se o brinquedo passa por dentro de um rolo de papel higiênico, ele causa engasgo. Não ofereça!", tipo: "perigo" },
            { titulo: "Selo Inmetro", texto: "Obrigatório. Garante que o produto passou por testes químicos (tinta) e físicos (pontas/pequenas peças).", tipo: "dica" },
            { titulo: "Baterias Botão", texto: "Extremamente perigosas se engolidas (queimadura química interna). Verifique se o compartimento da pilha é parafusado.", tipo: "perigo" },
            { titulo: "Cordões e Fitas", texto: "Nunca pendure brinquedos com fios longos em berços (risco de estrangulamento).", tipo: "perigo" },
            { titulo: "Descarte Imediato", texto: "Embalagens plásticas podem asfixiar. Jogue fora assim que abrir o presente.", tipo: "dica" },
            { titulo: "Manutenção", texto: "Verifique periodicamente: costuras de pelúcias (arames?), olhos soltos, plástico trincado.", tipo: "verificacao" },
        ]
    },
    {
        id: "oficina_segura",
        titulo: "Oficina Criativa e Segura",
        descricao: "Sua criatividade precisa de um ambiente organizado.",
        categoria: "Geral",
        icone: "hammer-outline",
        cor: "#607D8B",
        conteudo: [
            { titulo: "Ferramentas Elétricas", texto: "Sempre desconecte da tomada ao trocar brocas ou lâminas. Guarde com fio enrolado.", tipo: "perigo" },
            { titulo: "EPIs", texto: "Use óculos de proteção ao lixar ou serrar. Lascas podem cegar.", tipo: "dica" },
            { titulo: "Químicos", texto: "Solventes e tintas liberam vapores tóxicos. Use apenas em local ventilado.", tipo: "perigo" },
            { titulo: "Organização", texto: "Bancada limpa evita acidentes. Ferramentas de corte devem ter lugar fixo e seguro.", tipo: "dica" },
        ]
    },
    {
        id: "despensa_segura",
        titulo: "Despensa Nota 10",
        descricao: "Organização que evita desperdício e protege sua família.",
        categoria: "Cozinha",
        icone: "nutrition-outline",
        cor: "#795548",
        conteudo: [
            { titulo: "Químicos x Alimentos", texto: "JAMAIS guarde produtos de limpeza na mesma prateleira de alimentos. O risco de vazamento e contaminação é alto.", tipo: "perigo" },
            { titulo: "Prazos de Validade", texto: "Organize com o sistema PVPS: Primeiro que Vence, Primeiro que Sai.", tipo: "dica" },
            { titulo: "Embalagens Abertas", texto: "Use potes herméticos para evitar baratas, formigas e ratos. Sacos abertos atraem pragas.", tipo: "verificacao" },
        ]
    },
];

// =============================================================================
// 2. CHECKLISTS (Ação)
// =============================================================================
// =============================================================================
// 2. CHECKLISTS (Ação) - Dinamicamente gerado a partir de areas_internas.js
// =============================================================================
import { areasInternas } from './areas_internas';

// Mapa de ícones e cores para os ambientes
const AREA_CONFIG = {
    cozinha: { icon: "restaurant-outline", color: "#FF9800" },
    sala: { icon: "tv-outline", color: "#4CAF50" },
    quarto: { icon: "bed-outline", color: "#9C27B0" },
    quarto_bebe: { icon: "happy-outline", color: "#E91E63" },
    quarto_idoso: { icon: "accessibility-outline", color: "#3F51B5" },
    quarto_pne: { icon: "body-outline", color: "#2196F3" },
    banheiro: { icon: "water-outline", color: "#03A9F4" },
    area_servico: { icon: "shirt-outline", color: "#00BCD4" },
    escadas: { icon: "footsteps-outline", color: "#FF5722" },
    garagem: { icon: "car-outline", color: "#607D8B" },
    varanda: { icon: "sunny-outline", color: "#FFC107" }, // Amber
    jardim_quintal: { icon: "leaf-outline", color: "#4CAF50" },
    piscina: { icon: "water", color: "#0288D1" },
    oficina_deposito: { icon: "hammer-outline", color: "#795548" },
    area_tecnica: { icon: "construct-outline", color: "#9E9E9E" },
};

export const CHECKLISTS = areasInternas.map(area => {
    const config = AREA_CONFIG[area.id] || { icon: "home-outline", color: "#888888" };

    return {
        id: area.id,
        titulo: area.titulo,
        grupo: "comodos", // Simplificação: tudo em cômodos por enquanto
        descricao: area.situacao || "Verifique este ambiente.",
        icone: config.icon,
        cor: config.color,
        // Campos Enriquecidos
        riscos: area.riscos,
        causas: area.causas,
        oQueNaoFazer: area.oQueNaoFazer,
        quandoChamarAjuda: area.quandoChamarAjuda,
        // Itens Mapeados
        itens: area.oQueFazer.map(itemTexto => ({
            titulo: itemTexto,
            tipo: "verificacao",
            tags: [] // Tags perdidas na conversão, mas aceitável
        }))
    };
});

// =============================================================================
// 3. PROTOCOLOS (Emergência)
// =============================================================================
export const PROTOCOLS = [
    {
        id: "engasgo",
        titulo: "Engasgo (Heimlich)",
        descricao: "Via aérea bloqueada.",
        passos: [
            { texto: "Avalie: A pessoa tosse? Se sim, incentive a tosse.", imagem: "tosse" },
            { texto: "Se não tosse/respira: Posicione-se atrás da pessoa.", imagem: "posicao" },
            { texto: "Feche uma mão e coloque a boca do estômago.", imagem: "mao" },
            { texto: "Com a outra mão, comprima para dentro e para cima (J).", imagem: "compressao" },
            { texto: "Repita até desengasgar ou perder a consciência.", imagem: "repetir" },
        ]
    },
    {
        id: "queimadura",
        titulo: "Queimadura Térmica",
        descricao: "Fogo ou objetos quentes: ação rápida alivia a dor.",
        passos: [
            { texto: "Afaste a vítima da fonte de calor.", imagem: "afastar" },
            { texto: "Resfrie com água corrente (temp. ambiente) por 15 min.", imagem: "agua" },
            { texto: "Remova anéis e pulseiras antes que inche.", imagem: "aneis" },
            { texto: "Cubra com pano limpo e úmido.", imagem: "cobrir" },
            { texto: "Procure hospital se for extensa ou no rosto/mãos.", imagem: "hospital" },
        ]
    },
    {
        id: "convulsao",
        titulo: "Convulsão",
        descricao: "Mantenha a calma e proteja a cabeça.",
        passos: [
            { texto: "Deite a pessoa no chão e proteja a cabeça.", imagem: "cabeca" },
            { texto: "Vire a pessoa de lado para não aspirar saliva.", imagem: "lado" },
            { texto: "NUNCA coloque nada na boca ou segure a língua.", imagem: "boca" },
            { texto: "Aguarde passar e acalme a pessoa ao acordar.", imagem: "aguardar" },
        ]
    }
];
