/**
 * data/visitChecklists.js
 * Checklists de Segurança para Visitas e Eventos Sociais — Vigilaro Care V6 Neo
 * Expandido com itens assertivos de prevenção por cenário e grupo de risco
 */

export const VISIT_TYPES = {
  RECEIVING: 'recebendo',
  VISITING: 'visitando',
};

export const RISK_GROUPS = [
  { id: 'idoso', label: 'Idosos', icon: 'body' },
  { id: 'pcd', label: 'PCD / Mobilidade Reduzida', icon: 'walk' },
  { id: 'bebe', label: 'Bebês (0-2 anos)', icon: 'happy' },
  { id: 'crianca_arteira', label: 'Crianças (Hiperativas/Arteiras)', icon: 'bicycle' },
  { id: 'enfermo', label: 'Enfermos / Convalescentes', icon: 'medkit' },
];

export const VISIT_CHECKLISTS = {

  // =============================================
  // RECEBENDO VISITA — Preparação da casa
  // =============================================
  [VISIT_TYPES.RECEIVING]: {
    base: [
      // Ambiente e Acesso
      { key: 'entry', label: 'Entrada desobstruída e bem iluminada' },
      { key: 'floor', label: 'Pisos secos e sem objetos no caminho' },
      { key: 'pets', label: 'Animais em local seguro ou com guia/coleira' },

      // Piscina e Áreas Externas
      { key: 'pool', label: 'Piscina cercada, coberta ou com alarme ativo' },
      { key: 'churrasqueira', label: 'Churrasqueira/fogueira com perímetro seguro delimitado' },
      { key: 'iluminacao_externa', label: 'Iluminação externa funcionando (quintal, escada, varanda)' },

      // Cozinha e Alimentação
      { key: 'alergias', label: 'Perguntou sobre alergias alimentares dos convidados' },
      { key: 'alcool', label: 'Bebidas alcoólicas fora do alcance de menores' },
      { key: 'faca_cozinha', label: 'Facas e utensílios cortantes guardados durante o evento' },

      // Elétrica e Geral
      { key: 'extensoes_festa', label: 'Extensões elétricas protegidas e longe de água/passagem' },
      { key: 'emergencia', label: 'Endereço e telefone de emergência à mão para convidados' },
      { key: 'supervisao_geral', label: 'Pessoa designada para supervisão de crianças e pets' },
    ],
    risks: {
      idoso: [
        { key: 'rugs', label: 'Retirar tapetes soltos e capachos escorregadios' },
        { key: 'stairs', label: 'Sinalizar degraus e desníveis com fita antiderrapante' },
        { key: 'bathroom', label: 'Disponibilizar cadeira ou barra de apoio no banheiro' },
        { key: 'assento', label: 'Cadeira confortável reservada em local acessível' },
        { key: 'medicamentos_idoso', label: 'Saber se o visitante toma medicação com horário fixo' },
      ],
      pcd: [
        { key: 'access', label: 'Verificar largura de portas para cadeira de rodas (mín. 80cm)' },
        { key: 'ramps', label: 'Instalar rampas provisórias em degraus de entrada' },
        { key: 'obstacles', label: 'Remover móveis, vasos e fios do caminho principal' },
        { key: 'banheiro_pcd', label: 'Banheiro acessível no mesmo nível da área social' },
        { key: 'estacionamento', label: 'Vaga de estacionamento próxima e acessível reservada' },
      ],
      bebe: [
        { key: 'small_objects', label: 'Retirar objetos pequenos engolíveis do alcance (moedas, peças)' },
        { key: 'outlets', label: 'Proteger tomadas baixas com protetores' },
        { key: 'cleaning', label: 'Produtos de limpeza trancados em armário alto' },
        { key: 'quinas', label: 'Proteger quinas de mesas baixas (centro, lateral, café)' },
        { key: 'escadas_bebe', label: 'Portão de segurança instalado em escadas' },
        { key: 'agua_bebe', label: 'Baldes, vasos e recipientes com água esvaziados ou cobertos' },
      ],
      crianca_arteira: [
        { key: 'windows', label: 'Travar janelas e portas de varanda/sacada' },
        { key: 'breakables', label: 'Guardar objetos quebráveis e valiosos em local alto' },
        { key: 'doors', label: 'Trancar portas de cômodos com riscos (oficina, lavanderia)' },
        { key: 'sharp', label: 'Facas, tesouras e ferramentas fora do alcance' },
        { key: 'supervisao_piscina', label: 'Adulto designado exclusivamente para vigiar a piscina' },
        { key: 'limites', label: 'Áreas proibidas comunicadas claramente aos pais' },
      ],
      enfermo: [
        { key: 'noise', label: 'Reduzir ruídos no cômodo de descanso' },
        { key: 'ventilation', label: 'Ventilação adequada e temperatura agradável no quarto' },
        { key: 'meds', label: 'Espaço organizado para medicamentos com horários visíveis' },
        { key: 'alimentacao_especial', label: 'Refeição compatível com restrições do enfermo' },
        { key: 'emergencia_enfermo', label: 'Telefone do médico responsável acessível' },
      ],
    },
  },

  // =============================================
  // VISITANDO — Cuidados ao ir a outro local
  // =============================================
  [VISIT_TYPES.VISITING]: {
    base: [
      // Documentos e Saúde
      { key: 'contact', label: 'Contato de emergência (ICE) salvo no celular' },
      { key: 'meds_personal', label: 'Medicamentos de uso contínuo na bolsa' },
      { key: 'allergies', label: 'Alergias informadas ao anfitrião (alimentos, pets, plantas)' },

      // Segurança no Local
      { key: 'endereco', label: 'Endereço completo compartilhado com familiar de confiança' },
      { key: 'saida_emergencia', label: 'Ao chegar, identificar saídas de emergência' },
      { key: 'transporte_volta', label: 'Retorno planejado (motorista, app, não dirigir alcoolizado)' },
    ],
    risks: {
      idoso: [
        { key: 'ask_stairs', label: 'Perguntar sobre escadas e desníveis no local' },
        { key: 'ask_bathroom', label: 'Verificar acessibilidade do banheiro antecipadamente' },
        { key: 'calcado_seguro', label: 'Usar calçado antiderrapante e confortável' },
        { key: 'fadiga', label: 'Planejar pausas para descanso durante a visita' },
      ],
      pcd: [
        { key: 'ask_access', label: 'Confirmar acessibilidade completa (elevador, rampas, banheiro)' },
        { key: 'transport', label: 'Transporte adaptado confirmado (ida e volta)' },
        { key: 'autonomia', label: 'Kit de autonomia pessoal na bolsa (bateria extra, acessórios)' },
      ],
      bebe: [
        { key: 'safe_sleep', label: 'Levar berço portátil ou verificar local seguro para sono' },
        { key: 'baby_proofing', label: 'Inspecionar o ambiente ao chegar (tomadas, escadas, objetos)' },
        { key: 'bolsa_bebe', label: 'Bolsa completa: fraldas, troca, alimentação, medicação' },
        { key: 'agua_piscina_bebe', label: 'Verificar imediatamente piscinas, lagos ou espelhos d\'água' },
      ],
      crianca_arteira: [
        { key: 'supervision', label: 'Definir responsável pela supervisão constante da criança' },
        { key: 'boundaries', label: 'Estabelecer limites do espaço permitido logo ao chegar' },
        { key: 'pool_check', label: 'Verificar acesso à piscina, rua e áreas perigosas' },
        { key: 'entretenimento', label: 'Levar brinquedos/tablet para manter a criança entretida' },
      ],
      enfermo: [
        { key: 'rest_area', label: 'Confirmar local disponível para repouso se necessário' },
        { key: 'schedule', label: 'Planejar visita com duração adequada à condição de saúde' },
        { key: 'kit_emergencia', label: 'Kit emergencial pessoal (medicação SOS, documentos médicos)' },
      ],
    },
  },
};
