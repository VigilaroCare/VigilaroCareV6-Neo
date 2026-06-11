var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// data/mapeamento_dados.js
var mapeamento_dados_exports = {};
__export(mapeamento_dados_exports, {
  AMBIENTES: () => AMBIENTES,
  CHECKLISTS: () => CHECKLISTS,
  hydrateChecklistItem: () => hydrateChecklistItem
});
var AMBIENTES, hydrateChecklistItem, CHECKLISTS;
var init_mapeamento_dados = __esm({
  "data/mapeamento_dados.js"() {
    AMBIENTES = [
      // FLUXO DE CAMINHADA PELA CASA (Internas -> Externas)
      {
        id: "hall_corredor",
        nome: "Corredores",
        nome_en: "Hallways",
        nome_es: "Pasillos",
        emoji: "\u{1F6B6}",
        iconName: "Door",
        cor: "#FFD54F",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Ilumina\xE7\xE3o noturna e passagens amplas.",
        descricao_en: "Night lighting and wide passageways.",
        descricao_es: "Iluminaci\xF3n nocturna y pasillos amplios.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "sala",
        nome: "Sala de Estar",
        nome_en: "Living Room",
        nome_es: "Sala de Estar",
        emoji: "\u{1F6CB}\uFE0F",
        iconName: "Monitor",
        cor: "#AA96DA",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Lazer sem trope\xE7os e com m\xF3veis est\xE1veis.",
        descricao_en: "Leisure without tripping and with stable furniture.",
        descricao_es: "Ocio sin tropiezos y con muebles estables.",
        condicional: "opcional",
        fase: 1
      },
      {
        id: "copa",
        nome: "Copa",
        nome_en: "Dining Area",
        nome_es: "Comedor",
        emoji: "\u{1F37D}\uFE0F",
        iconName: "Reserve",
        cor: "#F4A460",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Cuidado com toalhas compridas e l\xEDquidos quentes.",
        descricao_en: "Beware of long tablecloths and hot liquids.",
        descricao_es: "Cuidado con manteles largos y l\xEDquidos calientes.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "cozinha",
        nome: "Cozinha",
        nome_en: "Kitchen",
        nome_es: "Cocina",
        emoji: "\u{1F373}",
        iconName: "Kitchen",
        cor: "#FF6B6B",
        prioridade: "M\xE1xima",
        prioridade_en: "Maximum",
        prioridade_es: "M\xE1xima",
        descricao: "O local de maior risco (queimaduras e cortes). Aten\xE7\xE3o total!",
        descricao_en: "The highest risk area (burns and cuts). Full attention!",
        descricao_es: "El \xE1rea de mayor riesgo (quemaduras y cortes). \xA1Atenci\xF3n total!",
        condicional: "opcional",
        fase: 1
      },
      {
        id: "quarto_bebe",
        nome: "Quarto do Beb\xEA",
        nome_en: "Baby's Room",
        nome_es: "Habitaci\xF3n del Beb\xE9",
        emoji: "\u{1F476}",
        iconName: "BabyCrib",
        cor: "#95E1D3",
        prioridade: "M\xE1xima",
        prioridade_en: "Maximum",
        prioridade_es: "M\xE1xima",
        descricao: "Ninho seguro: Combate ao sufocamento e quedas.",
        descricao_en: "Safe nest: Prevention of suffocation and falls.",
        descricao_es: "Nido seguro: Prevenci\xF3n de asfixia y ca\xEDdas.",
        condicional: "bebe",
        fase: 1
      },
      {
        id: "quarto_crianca",
        nome: "Quarto da Crian\xE7a",
        nome_en: "Child's Room",
        nome_es: "Habitaci\xF3n del Ni\xF1o",
        emoji: "\u{1F467}",
        iconName: "BabyCrib",
        cor: "#FFB6C1",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Brinquedos seguros, janelas protegidas e m\xF3veis fixos.",
        descricao_en: "Safe toys, protected windows and fixed furniture.",
        descricao_es: "Juguetes seguros, ventanas protegidas y muebles fijos.",
        condicional: "crianca",
        fase: 2
      },
      {
        id: "quarto_adulto",
        nome: "Quarto de Adulto",
        nome_en: "Adult Bedroom",
        nome_es: "Dormitorio de Adulto",
        emoji: "\u{1F468}",
        iconName: "User",
        cor: "#B0C4DE",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Medicamentos trancados e ambiente relaxante.",
        descricao_en: "Locked medications and relaxing environment.",
        descricao_es: "Medicamentos bajo llave y ambiente relajante.",
        fase: 2
      },
      {
        id: "quarto_idoso",
        nome: "Quarto do Idoso",
        nome_en: "Elderly's Room",
        nome_es: "Habitaci\xF3n del Adulto Mayor",
        emoji: "\u{1F474}",
        iconName: "Elder",
        cor: "#F38181",
        prioridade: "M\xE1xima",
        prioridade_en: "Maximum",
        prioridade_es: "M\xE1xima",
        descricao: "Autonomia com zero barreiras. Preven\xE7\xE3o de quedas.",
        descricao_en: "Autonomy with zero barriers. Fall prevention.",
        descricao_es: "Autonom\xEDa sin barreras. Prevenci\xF3n de ca\xEDdas.",
        condicional: "idoso",
        fase: 1
      },
      {
        id: "banheiro",
        nome: "Banheiro",
        nome_en: "Bathroom",
        nome_es: "Ba\xF1o",
        emoji: "\u{1F6BF}",
        iconName: "Bathroom",
        cor: "#4ECDC4",
        prioridade: "M\xE1xima",
        prioridade_en: "Maximum",
        prioridade_es: "M\xE1xima",
        descricao: "Evite quedas e afogamentos. Um santu\xE1rio de seguran\xE7a.",
        descricao_en: "Prevent falls and drowning. A safety sanctuary.",
        descricao_es: "Evita ca\xEDdas y ahogamientos. Un santuario de seguridad.",
        condicional: "opcional",
        fase: 1
      },
      {
        id: "escadas",
        nome: "Escadas",
        nome_en: "Stairs",
        nome_es: "Escaleras",
        emoji: "\u{1FA9C}",
        iconName: "Stairs",
        cor: "#FF5252",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Degraus vis\xEDveis, corrim\xE3o firme e port\xF5es para prote\xE7\xE3o.",
        descricao_en: "Visible steps, firm handrails and safety gates.",
        descricao_es: "Escalones visibles, pasamanos firme y puertas de protecci\xF3n.",
        condicional: "opcional",
        fase: 1
      },
      {
        id: "area_servico",
        nome: "Lavanderia / \xC1rea de Servi\xE7o",
        nome_en: "Laundry / Utility Room",
        nome_es: "Lavander\xEDa / \xC1rea de Servicio",
        emoji: "\u{1F9FA}",
        iconName: "WashingMachine",
        cor: "#A8E6CF",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Qu\xEDmicos no alto e baldes vazios. \xC1rea t\xE9cnica segura.",
        descricao_en: "Chemicals stored high and empty buckets. Safe utility area.",
        descricao_es: "Qu\xEDmicos en alto y cubetas vac\xEDas. \xC1rea t\xE9cnica segura.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "despensa",
        nome: "Despensa",
        nome_en: "Pantry",
        nome_es: "Despensa",
        emoji: "\u{1F4E6}",
        iconName: "Box",
        cor: "#FFB300",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Organiza\xE7\xE3o evita quedas e contamina\xE7\xE3o por roedores.",
        descricao_en: "Organization prevents falls and rodent contamination.",
        descricao_es: "La organizaci\xF3n evita ca\xEDdas y contaminaci\xF3n por roedores.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "varanda",
        nome: "Varanda/Sacada",
        nome_en: "Balcony/Porch",
        nome_es: "Balc\xF3n/Terraza",
        emoji: "\u{1FAB4}",
        iconName: "Home2",
        cor: "#00B0FF",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Redes de prote\xE7\xE3o \xEDntegras e piso antiderrapante.",
        descricao_en: "Intact safety nets and non-slip flooring.",
        descricao_es: "Redes de protecci\xF3n \xEDntegras y piso antideslizante.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "garagem",
        nome: "Garagem",
        nome_en: "Garage",
        nome_es: "Garaje",
        emoji: "\u{1F697}",
        iconName: "Car",
        cor: "#778899",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Aten\xE7\xE3o a manobras, pontos cegos e mon\xF3xido de carbono.",
        descricao_en: "Watch for maneuvers, blind spots and carbon monoxide.",
        descricao_es: "Atenci\xF3n a maniobras, puntos ciegos y mon\xF3xido de carbono.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "quintal",
        nome: "Quintal",
        nome_en: "Backyard",
        nome_es: "Patio",
        emoji: "\u{1F333}",
        iconName: "Tree",
        cor: "#87CEEB",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Livre de entulhos e animais pe\xE7onhentos.",
        descricao_en: "Free from debris and venomous animals.",
        descricao_es: "Libre de escombros y animales venenosos.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "jardim_horta",
        nome: "Jardim e Jardinagem",
        nome_en: "Garden & Gardening",
        nome_es: "Jard\xEDn y Jardiner\xEDa",
        emoji: "\u{1F33B}",
        iconName: "Tree",
        cor: "#8BC34A",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Cuidado com plantas t\xF3xicas e ferramentas de poda.",
        descricao_en: "Beware of toxic plants and pruning tools.",
        descricao_es: "Cuidado con plantas t\xF3xicas y herramientas de poda.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "piscina",
        nome: "Piscina",
        nome_en: "Swimming Pool",
        nome_es: "Piscina",
        emoji: "\u{1F3CA}",
        iconName: "Pool",
        cor: "#00CED1",
        prioridade: "M\xE1xima",
        prioridade_en: "Maximum",
        prioridade_es: "M\xE1xima",
        descricao: "Barreiras f\xEDsicas e supervis\xE3o visual constante.",
        descricao_en: "Physical barriers and constant visual supervision.",
        descricao_es: "Barreras f\xEDsicas y supervisi\xF3n visual constante.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "parquinho",
        nome: "Parquinho / Playground",
        nome_en: "Playground",
        nome_es: "Parque Infantil",
        emoji: "\u{1F3A0}",
        iconName: "Shapes",
        cor: "#00E676",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Manuten\xE7\xE3o de brinquedos e supervis\xE3o atenta.",
        descricao_en: "Toy maintenance and attentive supervision.",
        descricao_es: "Mantenimiento de juguetes y supervisi\xF3n atenta.",
        condicional: "opcional",
        fase: 2
      },
      {
        id: "oficina",
        nome: "Oficina / Ateli\xEA",
        nome_en: "Workshop / Studio",
        nome_es: "Taller / Estudio",
        emoji: "\u{1F6E0}\uFE0F",
        iconName: "Setting2",
        cor: "#7E57C2",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Ferramentas afiadas longe de crian\xE7as. Ventila\xE7\xE3o adequada.",
        descricao_en: "Sharp tools away from children. Adequate ventilation.",
        descricao_es: "Herramientas afiladas lejos de los ni\xF1os. Ventilaci\xF3n adecuada.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "deposito",
        nome: "Dep\xF3sito / Bagun\xE7a",
        nome_en: "Storage / Clutter",
        nome_es: "Dep\xF3sito / Trastero",
        emoji: "\u{1F5C4}\uFE0F",
        iconName: "FolderOpen",
        cor: "#BC8F8F",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Organiza\xE7\xE3o anula abrigo para aranhas e escorpi\xF5es.",
        descricao_en: "Organization eliminates shelter for spiders and scorpions.",
        descricao_es: "La organizaci\xF3n elimina el refugio para ara\xF1as y escorpiones.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "sotao",
        nome: "S\xF3t\xE3o",
        nome_en: "Attic",
        nome_es: "\xC1tico",
        emoji: "\u{1FA9C}",
        iconName: "Building",
        cor: "#A1887F",
        // Brownish
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Aten\xE7\xE3o especial a goteiras, cupins e ventila\xE7\xE3o t\xE9rmica.",
        descricao_en: "Special attention to leaks, termites and thermal ventilation.",
        descricao_es: "Atenci\xF3n especial a goteras, termitas y ventilaci\xF3n t\xE9rmica.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "porao",
        nome: "Por\xE3o",
        nome_en: "Basement",
        nome_es: "S\xF3tano",
        emoji: "\u{1F526}",
        iconName: "Home2",
        cor: "#5D4037",
        // Dark Brown
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Risco alto de umidade, mofo e ac\xFAmulo de gases t\xF3xicos.",
        descricao_en: "High risk of moisture, mold and toxic gas accumulation.",
        descricao_es: "Alto riesgo de humedad, moho y acumulaci\xF3n de gases t\xF3xicos.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "canil",
        nome: "\xC1rea do Pet",
        nome_en: "Pet Area",
        nome_es: "\xC1rea de Mascotas",
        emoji: "\u{1F436}",
        iconName: "Pet",
        cor: "#FFB74D",
        prioridade: "M\xE9dia",
        prioridade_en: "Medium",
        prioridade_es: "Media",
        descricao: "Sem carrapaticidas expostos. Abrigo seguro.",
        descricao_en: "No exposed tick treatments. Safe shelter.",
        descricao_es: "Sin garrapaticidas expuestos. Refugio seguro.",
        condicional: "opcional",
        fase: 3
      },
      {
        id: "central_gas",
        nome: "Central de G\xE1s",
        nome_en: "Gas Central",
        nome_es: "Central de Gas",
        emoji: "\u{1F525}",
        iconName: "Danger",
        cor: "#FF9800",
        prioridade: "Alta",
        prioridade_en: "High",
        prioridade_es: "Alta",
        descricao: "Ventila\xE7\xE3o e validade. Preven\xE7\xE3o de explos\xF5es.",
        descricao_en: "Ventilation and expiration date. Explosion prevention.",
        descricao_es: "Ventilaci\xF3n y fecha de caducidad. Prevenci\xF3n de explosiones.",
        condicional: "opcional",
        // Para casas
        fase: 2
      }
    ];
    hydrateChecklistItem = (savedItem) => {
      if (!savedItem || !savedItem.titulo) return savedItem;
      if (savedItem.titulo_en || savedItem.titulo_es) return savedItem;
      for (const ambKey of Object.keys(CHECKLISTS)) {
        const amb = CHECKLISTS[ambKey];
        if (amb.categorias) {
          for (const cat of amb.categorias) {
            if (cat.itens) {
              const found = cat.itens.find((i) => i.titulo === savedItem.titulo);
              if (found) {
                return { ...savedItem, titulo_en: found.titulo_en, titulo_es: found.titulo_es };
              }
            }
          }
        }
      }
      return savedItem;
    };
    CHECKLISTS = {
      // === FASE 1 ===
      cozinha: {
        categorias: [
          {
            nome: "Preven\xE7\xE3o de Queimaduras e Equipamentos T\xE9rmicos",
            nome_en: "Burn Prevention and Thermal Equipment",
            nome_es: "Prevenci\xF3n de Quemaduras y Equipos T\xE9rmicos",
            emoji: "\u{1F525}",
            itens: [
              { titulo: "Cabos das panelas est\xE3o sempre virados para o interior do fog\xE3o?", titulo_en: "Are pot handles always turned towards the inside of the stove?", titulo_es: "\xBFLos mangos de las ollas est\xE1n siempre girados hacia el interior de la estufa?", tipo: "perigo", tags: ["queimadura", "b\xE1sico"] },
              { titulo: "Voc\xEA prioriza o uso das bocas traseiras do fog\xE3o durante o preparo?", titulo_en: "Do you prioritize using the back burners of the stove while cooking?", titulo_es: "\xBFPrioriza el uso de los quemadores traseros de la estufa durante la preparaci\xF3n?", tipo: "sugest\xE3o", tags: ["preven\xE7\xE3o"] },
              { titulo: "A porta do forno possui trava de seguran\xE7a funcional?", titulo_en: "Does the oven door have a functional safety lock?", titulo_es: "\xBFLa puerta del horno tiene un cierre de seguridad funcional?", tipo: "perigo", tags: ["crian\xE7as"] },
              { titulo: "Eletroport\xE1teis que geram calor extremo (AirFryer, Forno El\xE9trico, Torradeira) s\xE3o deixados para esfriar fora do alcance infantil antes de serem guardados?", titulo_en: "Are heat-generating appliances (AirFryer, Electric Oven, Toaster) left to cool out of children's reach before being stored?", titulo_es: "\xBFLos electrodom\xE9sticos que generan calor extremo (AirFryer, Horno El\xE9ctrico, Tostadora) se dejan enfriar fuera del alcance de los ni\xF1os antes de guardarlos?", tipo: "perigo", tags: ["queimadura", "crian\xE7as"] },
              { titulo: "Os cabos de Airfryers ou Fornos n\xE3o ficam soltos ou pendurados para fora da bancada durante o uso (evitando pux\xF5es)?", titulo_en: "Are cables of Airfryers or Ovens not left loose or hanging off the counter during use (avoiding pulls)?", titulo_es: "\xBFLos cables de las freidoras de aire o los hornos no quedan sueltos o colgando fuera de la encimera durante su uso (evitando tirones)?", tipo: "perigo", tags: ["queimadura", "crian\xE7as"] },
              { titulo: "As toalhas de mesa s\xE3o curtas (evitando pux\xF5es ou quedas de l\xEDquidos quentes)?", titulo_en: "Are tablecloths short (avoiding pulls or spills of hot liquids)?", titulo_es: "\xBFLos manteles son cortos (evitando tirones o derrames de l\xEDquidos calientes)?", tipo: "perigo", tags: ["queimadura", "crian\xE7as"] },
              { titulo: "Luvas t\xE9rmicas est\xE3o em local vis\xEDvel e de f\xE1cil acesso?", titulo_en: "Are oven mitts in a visible and easily accessible location?", titulo_es: "\xBFLos guantes t\xE9rmicos est\xE1n en un lugar visible y de f\xE1cil acceso?", tipo: "normal", tags: ["seguran\xE7a"] }
            ]
          },
          {
            nome: "G\xE1s e Preven\xE7\xE3o de Inc\xEAndio",
            nome_en: "Gas and Fire Prevention",
            nome_es: "Gas y Prevenci\xF3n de Incendios",
            emoji: "\u{1F9EF}",
            itens: [
              { titulo: "Mangueira e regulador de g\xE1s dentro da validade (5 anos)", titulo_en: "Gas hose and regulator within validity (5 years)", titulo_es: "Manguera y regulador de gas dentro de la validez (5 a\xF1os)", tipo: "perigo", tags: ["explos\xE3o", "g\xE1s"] },
              { titulo: "Mangueira de g\xE1s em perfeito estado, sem rachaduras", titulo_en: "Gas hose in perfect condition, no cracks", titulo_es: "Manguera de gas en perfecto estado, sin grietas", tipo: "perigo", tags: ["explos\xE3o", "vazamento"] },
              { titulo: "V\xE1lvula foi testada com espuma de sab\xE3o (nunca com fogo)", titulo_en: "Valve was tested with soap foam (never with fire)", titulo_es: "La v\xE1lvula fue probada con espuma de jab\xF3n (nunca con fuego)", tipo: "normal", tags: ["manuten\xE7\xE3o"] },
              { titulo: "Existe um extintor de inc\xEAndio (ABC) acess\xEDvel na casa", titulo_en: "There is a fire extinguisher (ABC) accessible in the house", titulo_es: "Hay un extintor de incendios (ABC) accesible en la casa", tipo: "sugest\xE3o", tags: ["inc\xEAndio", "expert"] },
              { titulo: "Registro de g\xE1s \xE9 fechado \xE0 noite ou ao sair", titulo_en: "Gas valve is closed at night or when leaving", titulo_es: "El registro de gas est\xE1 cerrado por la noche o al salir", tipo: "sugest\xE3o", tags: ["preven\xE7\xE3o"] }
            ]
          },
          {
            nome: "L\xE2minas, Vidros e Eletroport\xE1teis Rotativos",
            nome_en: "Blades, Glass, and Rotating Appliances",
            nome_es: "Cuchillas, Vidrio y Electrodom\xE9sticos Giratorios",
            emoji: "\u{1F52A}",
            itens: [
              { titulo: "Facas e tesouras guardadas em gavetas altas ou com travas magn\xE9ticas", titulo_en: "Knives and scissors stored in high drawers or with magnetic locks", titulo_es: "Cuchillos y tijeras guardados en cajones altos o con cerraduras magn\xE9ticas", tipo: "perigo", tags: ["corte", "crian\xE7as"] },
              { titulo: "Vidros e lou\xE7as quebradas descartados em caixas r\xEDgidas (ex: leite) antes do lixo", titulo_en: "Broken glass and dishes discarded in rigid boxes (e.g., milk cartons) before trashing", titulo_es: "Vidrios y vajillas rotas desechados en cajas r\xEDgidas (ej: leche) antes de tirarlos a la basura", tipo: "normal", tags: ["corte"] },
              { titulo: "Equipamentos perfurocortantes (l\xE2minas de liquidificador, processadores, facas el\xE9tricas) est\xE3o desmontados ou trancados fora do alcance infantil?", titulo_en: "Are sharp equipment (blender blades, processors, electric knives) disassembled or locked out of children's reach?", titulo_es: "\xBFEst\xE1n desarmados o bajo llave fuera del alcance de los ni\xF1os los equipos cortopunzantes (cuchillas de licuadora, procesadores, cuchillos el\xE9ctricos)?", tipo: "perigo", tags: ["corte", "crian\xE7as"] },
              { titulo: "Equipamentos rotativos pesados (batedeiras planet\xE1rias, mixers) est\xE3o guardados desligados da tomada e longe da beirada das pias?", titulo_en: "Are heavy rotating equipment (stand mixers, blenders) stored unplugged and away from the edge of sinks?", titulo_es: "\xBFLos equipos rotativos pesados (batidoras de pie, licuadoras) est\xE1n guardados desenchufados y lejos del borde de los fregaderos?", tipo: "perigo", tags: ["impacto", "crian\xE7as", "choque"] }
            ]
          },
          {
            nome: "Qu\xEDmicos",
            nome_en: "Chemicals",
            nome_es: "Qu\xEDmicos",
            emoji: "\u2620\uFE0F",
            itens: [
              { titulo: "Produtos de limpeza em arm\xE1rios altos ou com trava magn\xE9tica", titulo_en: "Cleaning products in high cabinets or with magnetic lock", titulo_es: "Productos de limpieza en gabinetes altos o con cerradura magn\xE9tica", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Qu\xEDmicos n\xE3o s\xE3o transferidos para embalagens de alimentos (garrafa pet, potes)", titulo_en: "Chemicals are not transferred to food packaging (PET bottles, jars)", titulo_es: "Los qu\xEDmicos no se transfieren a envases de alimentos (botellas PET, frascos)", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] }
            ]
          }
        ]
      },
      banheiro: {
        categorias: [
          {
            nome: "Preven\xE7\xE3o de Quedas",
            nome_en: "Fall Prevention",
            nome_es: "Prevenci\xF3n de Ca\xEDdas",
            emoji: "\u{1F463}",
            itens: [
              { titulo: "Piso do box possui tapete de borracha antiderrapante", titulo_en: "Shower floor has non-slip rubber mat", titulo_es: "El piso de la ducha tiene una alfombra de goma antideslizante", tipo: "perigo", tags: ["queda"] },
              { titulo: "Barras de apoio instaladas dentro do box e ao lado do vaso", titulo_en: "Grab bars installed inside the shower and next to the toilet", titulo_es: "Barras de apoyo instaladas dentro de la ducha y junto al inodoro", tipo: "sugest\xE3o", tags: ["idosos", "acessibilidade"] },
              { titulo: "Piso fora do box \xE9 mantido seco ap\xF3s o uso", titulo_en: "Floor outside the shower is kept dry after use", titulo_es: "El piso fuera de la ducha se mantiene seco despu\xE9s de su uso", tipo: "normal", tags: ["queda"] }
            ]
          },
          {
            nome: "Seguran\xE7a Geral",
            nome_en: "General Safety",
            nome_es: "Seguridad General",
            emoji: "\u{1F6E1}\uFE0F",
            itens: [
              { titulo: "Baldes e bacias s\xE3o guardados vazios e virados para baixo?", titulo_en: "Are buckets and basins stored empty and turned upside down?", titulo_es: "\xBFSe guardan los cubos y palanganas vac\xEDos y boca abajo?", tipo: "perigo", tags: ["afogamento"] },
              { titulo: "O box \xE9 de vidro temperado e possui pel\xEDcula de seguran\xE7a?", titulo_en: "Is the shower enclosure made of tempered glass and has a safety film?", titulo_es: "\xBFLa mampara es de vidrio templado y tiene una pel\xEDcula de seguridad?", tipo: "normal", tags: ["corte"] },
              { titulo: "Medicamentos e l\xE2minas est\xE3o trancados ou fora do alcance visual?", titulo_en: "Are medicines and razors locked or out of sight?", titulo_es: "\xBFLos medicamentos y las maquinillas de afeitar est\xE1n bajo llave o fuera de la vista?", tipo: "perigo", tags: ["intoxica\xE7\xE3o", "corte"] },
              { titulo: "Eletrodom\xE9sticos (secador/chapinha) s\xE3o retirados da tomada ap\xF3s o uso?", titulo_en: "Are appliances (hair dryer/straightener) unplugged after use?", titulo_es: "\xBFEst\xE1n desenchufados los electrodom\xE9sticos (secador/plancha) despu\xE9s de su uso?", tipo: "perigo", tags: ["choque"] },
              { titulo: "O sistema de aquecimento a g\xE1s est\xE1 instalado em local com ventila\xE7\xE3o adequada? A manuten\xE7\xE3o anual est\xE1 em dia?", titulo_en: "Is the gas heating system installed in a well-ventilated area? Is the annual maintenance up to date?", titulo_es: "\xBFEst\xE1 instalado el sistema de calefacci\xF3n a gas en un lugar con ventilaci\xF3n adecuada? \xBFEl mantenimiento anual est\xE1 al d\xEDa?", tipo: "perigo", tags: ["g\xE1s"] },
              { titulo: "A caixa de areia do pet (gato) est\xE1 em local de f\xE1cil acesso para pets idosos ou com mobilidade reduzida?", titulo_en: "Is the pet (cat) litter box in an easily accessible location for elderly or mobility-impaired pets?", titulo_es: "\xBFEst\xE1 la caja de arena para mascotas (gato) en un lugar de f\xE1cil acceso para mascotas mayores o con movilidad reducida?", tipo: "normal", tags: ["pet_idoso", "pet_mobilidade"] }
            ]
          }
        ]
      },
      sala: {
        categorias: [
          {
            nome: "M\xF3veis e Layout",
            nome_en: "Furniture and Layout",
            nome_es: "Muebles y Dise\xF1o",
            emoji: "\u{1F6CB}\uFE0F",
            itens: [
              { titulo: "TVs e estantes altas fixadas na parede (anti-tombamento)", titulo_en: "TVs and tall bookcases fixed to the wall (anti-tip)", titulo_es: "Televisores y estanter\xEDas altas fijadas a la pared (antivuelco)", tipo: "perigo", tags: ["tombamento"] },
              { titulo: "Quinas de mesas e pain\xE9is baixos possuem protetores de silicone", titulo_en: "Table corners and low panels have silicone protectors", titulo_es: "Las esquinas de mesas y paneles bajos tienen protectores de silicona", tipo: "normal", tags: ["impacto"] },
              { titulo: "Caminho de circula\xE7\xE3o est\xE1 totalmente livre de obst\xE1culos", titulo_en: "Circulation path is completely free of obstacles", titulo_es: "El camino de circulaci\xF3n est\xE1 totalmente libre de obst\xE1culos", tipo: "normal", tags: ["acessibilidade"] },
              { titulo: "Tapetes soltos removidos ou fixados com fita dupla face no ch\xE3o", titulo_en: "Loose rugs removed or fixed with double-sided tape to the floor", titulo_es: "Alfombras sueltas retiradas o fijadas con cinta de doble cara al suelo", tipo: "perigo", tags: ["queda"] },
              { titulo: "Existem rampas ou escadinhas para acesso aos m\xF3veis altos (sof\xE1) para o pet?", titulo_en: "Are there ramps or steps to access high furniture (sofa) for the pet?", titulo_es: "\xBFHay rampas o escalones para acceder a muebles altos (sof\xE1) para la mascota?", tipo: "sugest\xE3o", tags: ["pet_idoso", "pet_mobilidade"] },
              { titulo: "Os m\xF3veis mant\xEAm uma disposi\xE7\xE3o constante para facilitar a orienta\xE7\xE3o espacial do pet cego ou com d\xE9ficit cognitivo?", titulo_en: "Do furniture keep a constant arrangement to facilitate the spatial orientation of blind or cognitively impaired pets?", titulo_es: "\xBFLos muebles mantienen una disposici\xF3n constante para facilitar la orientaci\xF3n espacial de la mascota ciega o con d\xE9ficit cognitivo?", tipo: "normal", tags: ["pet_visao_reduzida", "disfuncao_cognitiva"] }
            ]
          },
          {
            nome: "El\xE9trica e Janelas",
            nome_en: "Electrical and Windows",
            nome_es: "El\xE9ctrico y Ventanas",
            emoji: "\u26A1",
            itens: [
              { titulo: "Fios el\xE9tricos organizados ou protegidos em canaletas", titulo_en: "Electrical wires organized or protected in conduits", titulo_es: "Cables el\xE9ctricos organizados o protegidos en canaletas", tipo: "normal", tags: ["trope\xE7o"] },
              { titulo: "Janelas e basculantes possuem redes de prote\xE7\xE3o garantida", titulo_en: "Windows and transoms have guaranteed safety nets", titulo_es: "Ventanas y tragaluces tienen redes de protecci\xF3n garantizadas", tipo: "perigo", tags: ["queda"] },
              { titulo: "Carregadores de celular fora da tomada se n\xE3o usados (risco bucal e de inc\xEAndio)", titulo_en: "Cell phone chargers unplugged if not used (mouth and fire risk)", titulo_es: "Cargadores de celular desenchufados si no se usan (riesgo bucal y de incendio)", tipo: "perigo", tags: ["choque"] }
            ]
          },
          {
            nome: "Objetos Perigosos",
            nome_en: "Dangerous Objects",
            nome_es: "Objetos Peligrosos",
            emoji: "\u{1F377}",
            itens: [
              { titulo: "Bebidas alco\xF3licas trancadas ou totalmente fora do alcance visual", titulo_en: "Alcoholic beverages locked or totally out of sight", titulo_es: "Bebidas alcoh\xF3licas bajo llave o totalmente fuera de la vista", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Controles remotos possuem o compartimento de pilha bot\xE3o parafusado", titulo_en: "Remote controls have the button battery compartment screwed shut", titulo_es: "Los controles remotos tienen el compartimento de la pila de bot\xF3n atornillado", tipo: "perigo", tags: ["ingest\xE3o"] }
            ]
          }
        ]
      },
      quarto_bebe: {
        categorias: [
          {
            nome: "Preven\xE7\xE3o de Sufocamento",
            nome_en: "Suffocation Prevention",
            nome_es: "Prevenci\xF3n de Asfixia",
            emoji: "\u{1F6CF}\uFE0F",
            itens: [
              { titulo: "Ber\xE7o livre de kits, pel\xFAcias, travesseiros e cobertores soltos", titulo_en: "Crib free of bumpers, stuffed animals, pillows, and loose blankets", titulo_es: "Cuna libre de protectores, peluches, almohadas y mantas sueltas", tipo: "perigo", tags: ["sufocamento"] },
              { titulo: "Colch\xE3o do ber\xE7o firme, sem folgas ou desn\xEDveis que permitam prender a crian\xE7a", titulo_en: "Firm crib mattress, without gaps or unevenness that could trap the child", titulo_es: "Colch\xF3n de cuna firme, sin espacios ni desniveles que puedan atrapar al ni\xF1o", tipo: "normal", tags: ["sufocamento"] },
              { titulo: "M\xF3biles retirados caso o beb\xEA j\xE1 consiga alcan\xE7\xE1-los", titulo_en: "Mobiles removed if the baby can already reach them", titulo_es: "M\xF3viles retirados si el beb\xE9 ya puede alcanzarlos", tipo: "normal", tags: ["estrangulamento"] }
            ]
          },
          {
            nome: "Estrutura Segura",
            nome_en: "Safe Structure",
            nome_es: "Estructura Segura",
            emoji: "\u{1F3D7}\uFE0F",
            itens: [
              { titulo: "Grades do ber\xE7o com espa\xE7amento seguro m\xE1ximo de 6cm", titulo_en: "Crib rails with a maximum safe spacing of 6cm", titulo_es: "Barandas de cuna con un espaciado seguro m\xE1ximo de 6 cm", tipo: "perigo", tags: ["aprisionamento"] },
              { titulo: "Ber\xE7o afastado de janelas, correntes e persianas de cortinas", titulo_en: "Crib placed away from windows, drafts, and curtain blinds", titulo_es: "Cuna alejada de ventanas, corrientes de aire y persianas de cortinas", tipo: "perigo", tags: ["queda", "estrangulamento"] },
              { titulo: "Bab\xE1 eletr\xF4nica instalada, testada e livre do contato do beb\xEA", titulo_en: "Baby monitor installed, tested, and out of the baby's reach", titulo_es: "Monitor de beb\xE9 instalado, probado y fuera del alcance del beb\xE9", tipo: "sugest\xE3o", tags: ["monitoramento"] }
            ]
          }
        ]
      },
      quarto_idoso: {
        categorias: [
          {
            nome: "Antiqueda & Conforto",
            nome_en: "Anti-fall & Comfort",
            nome_es: "Antica\xEDdas y Confort",
            emoji: "\u{1F475}",
            itens: [
              { titulo: "Tapetes soltos removidos do quarto", titulo_en: "Loose rugs removed from the bedroom", titulo_es: "Alfombras sueltas retiradas del dormitorio", tipo: "perigo", tags: ["queda"] },
              { titulo: "Luz noturna ou interruptor acess\xEDvel direto da cama", titulo_en: "Night light or switch accessible right from the bed", titulo_es: "Luz nocturna o interruptor accesible directamente desde la cama", tipo: "normal", tags: ["vis\xE3o"] },
              { titulo: "Altura da cama permite apoiar os p\xE9s no ch\xE3o ao sentar", titulo_en: "Bed height allows feet to rest on the floor when sitting", titulo_es: "La altura de la cama permite apoyar los pies en el suelo al sentarse", tipo: "sugest\xE3o", tags: ["mobilidade"] },
              { titulo: "Colch\xE3o firme, n\xE3o afunda excessivamente nas bordas", titulo_en: "Firm mattress, doesn't sink excessively on the edges", titulo_es: "Colch\xF3n firme, no se hunde excesivamente en los bordes", tipo: "normal", tags: ["estabilidade"] },
              { titulo: "Caminho at\xE9 o banheiro 100% livre de m\xF3veis ou objetos", titulo_en: "Path to the bathroom 100% free of furniture or objects", titulo_es: "Camino al ba\xF1o 100% libre de muebles u objetos", tipo: "perigo", tags: ["acessibilidade"] },
              { titulo: "Fios de abajures e eletr\xF4nicos escondidos, fora da passagem", titulo_en: "Lamp and electronic wires hidden, out of the way", titulo_es: "Cables de l\xE1mparas y electr\xF3nicos ocultos, fuera del paso", tipo: "normal", tags: ["trope\xE7o"] },
              { titulo: "M\xF3veis firmes o suficiente para servir de apoio ao caminhar", titulo_en: "Furniture firm enough to serve as support when walking", titulo_es: "Muebles lo suficientemente firmes para servir de apoyo al caminar", tipo: "sugest\xE3o", tags: ["apoio"] }
            ]
          }
        ]
      },
      escadas: {
        categorias: [
          {
            nome: "Estrutura",
            nome_en: "Structure",
            nome_es: "Estructura",
            emoji: "\u{1FA9C}",
            itens: [
              { titulo: "Port\xF5es de bloqueio (babygates) fixados no topo e na base", titulo_en: "Safety gates (baby gates) fixed at the top and bottom", titulo_es: "Puertas de seguridad (babygates) fijadas en la parte superior e inferior", tipo: "perigo", tags: ["queda", "crian\xE7as"] },
              { titulo: "O acesso \xE0s escadas est\xE1 bloqueado por port\xE3o de seguran\xE7a para evitar quedas do pet com mobilidade ou vis\xE3o reduzida?", titulo_en: "Is stairway access blocked by a safety gate to prevent falls for pets with reduced mobility or vision?", titulo_es: "\xBFEl acceso a las escaleras est\xE1 bloqueado por una puerta de seguridad para evitar ca\xEDdas de mascotas con movilidad o visi\xF3n reducida?", tipo: "perigo", tags: ["pet_pcd", "pet_visao_reduzida", "pet_mobilidade", "pet_idoso", "disfuncao_cognitiva"] },
              { titulo: "Corrim\xE3o instalado dos dois lados e totalmente firme", titulo_en: "Handrail installed on both sides and completely firm", titulo_es: "Pasamanos instalado a ambos lados y completamente firme", tipo: "normal", tags: ["apoio"] },
              { titulo: "Degraus possuem fita antiderrapante fixada", titulo_en: "Steps have anti-slip tape attached", titulo_es: "Los escalones tienen cinta antideslizante adherida", tipo: "normal", tags: ["queda"] },
              { titulo: "Ilumina\xE7\xE3o forte e cont\xEDnua iluminando todos os degraus", titulo_en: "Strong, continuous lighting illuminating all steps", titulo_es: "Iluminaci\xF3n fuerte y continua que ilumina todos los escalones", tipo: "perigo", tags: ["vis\xE3o"] }
            ]
          }
        ]
      },
      // === FASE 2 ===
      area_servico: {
        categorias: [
          {
            nome: "Produtos Qu\xEDmicos",
            nome_en: "Chemicals",
            nome_es: "Qu\xEDmicos",
            emoji: "\u2620\uFE0F",
            itens: [
              { titulo: "Produtos de limpeza estritamente no alto e trancados", titulo_en: "Cleaning products strictly high up and locked", titulo_es: "Productos de limpieza estrictamente en alto y bajo llave", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Produtos mantidos sempre na embalagem original (nada de garrafa PET)", titulo_en: "Products always kept in their original packaging (no PET bottles)", titulo_es: "Productos mantenidos siempre en el envase original (nada de botellas PET)", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Inseticidas e solventes isolados preventivamente de alimentos", titulo_en: "Insecticides and solvents preemptively isolated from food", titulo_es: "Insecticidas y disolventes aislados preventivamente de los alimentos", tipo: "normal", tags: ["contamina\xE7\xE3o"] }
            ]
          },
          {
            nome: "M\xE1quina e Afogamento",
            nome_en: "Washing Machine and Drowning",
            nome_es: "Lavadora y Ahogamiento",
            emoji: "\u{1F9FA}",
            itens: [
              { titulo: "Baldes e bacias mantidos vazios e virados para baixo", titulo_en: "Buckets and basins kept empty and turned upside down", titulo_es: "Cubos y palanganas mantenidos vac\xEDos y boca abajo", tipo: "perigo", tags: ["afogamento"] },
              { titulo: "Tanque mantido permanentemente vazio ap\xF3s o uso", titulo_en: "Laundry sink kept permanently empty after use", titulo_es: "Lavadero mantenido permanentemente vac\xEDo despu\xE9s de su uso", tipo: "normal", tags: ["afogamento"] },
              { titulo: "M\xE1quina de lavar desligada da tomada ap\xF3s o ciclo de uso", titulo_en: "Washing machine unplugged after the cycle", titulo_es: "Lavadora desenchufada despu\xE9s del ciclo de uso", tipo: "sugest\xE3o", tags: ["seguran\xE7a"] },
              { titulo: "Ferro de passar roupa \xE9 desligado e colocado em local alto e seguro para esfriar imediatamente ap\xF3s o uso?", titulo_en: "Is the iron unplugged and placed in a high, safe place to cool immediately after use?", titulo_es: "\xBFSe desenchufa la plancha y se coloca en un lugar alto y seguro para que se enfr\xEDe inmediatamente despu\xE9s de usarla?", tipo: "perigo", tags: ["queimadura", "crian\xE7as"] }
            ]
          }
        ]
      },
      quintal: {
        categorias: [
          {
            nome: "Limpeza e Fauna",
            nome_en: "Cleaning and Fauna",
            nome_es: "Limpieza y Fauna",
            emoji: "\u{1F982}",
            itens: [
              { titulo: "Quintal livre de entulhos, prevenindo abrigo para escorpi\xF5es e aranhas", titulo_en: "Yard free of debris, preventing shelter for scorpions and spiders", titulo_es: "Patio libre de escombros, previniendo refugio para escorpiones y ara\xF1as", tipo: "perigo", tags: ["animais_pe\xE7onhentos"] },
              { titulo: "Mato mantido baixo e sobrocado", titulo_en: "Weeds kept low and trimmed", titulo_es: "Maleza mantenida baja y recortada", tipo: "normal", tags: ["manuten\xE7\xE3o"] },
              { titulo: "Inspe\xE7\xE3o regular contra focos de \xE1gua parada (Dengue)", titulo_en: "Regular inspection against stagnant water sources (Dengue)", titulo_es: "Inspecci\xF3n regular contra focos de agua estancada (Dengue)", tipo: "perigo", tags: ["sa\xFAde"] }
            ]
          },
          {
            nome: "Estrutura",
            nome_en: "Structure",
            nome_es: "Estructura",
            emoji: "\u{1F9F1}",
            itens: [
              { titulo: "Piso plano, sem buracos ou desn\xEDveis perigosos disfar\xE7ados", titulo_en: "Flat floor, no hidden dangerous holes or unevenness", titulo_es: "Piso plano, sin agujeros ocultos ni desniveles peligrosos", tipo: "normal", tags: ["queda"] },
              { titulo: "Ilumina\xE7\xE3o adequada nos acessos com sensores de movimento", titulo_en: "Adequate lighting at access points with motion sensors", titulo_es: "Iluminaci\xF3n adecuada en los accesos con sensores de movimiento", tipo: "sugest\xE3o", tags: ["seguran\xE7a"] },
              { titulo: "Ralos possuem tampas rotativas (abre/fecha) contra insetos", titulo_en: "Drains have rotating (open/close) covers against insects", titulo_es: "Los desag\xFCes tienen tapas giratorias (abrir/cerrar) contra insectos", tipo: "sugest\xE3o", tags: ["pragas"] }
            ]
          }
        ]
      },
      parquinho: {
        categorias: [
          {
            nome: "Brinquedos e Estrutura",
            nome_en: "Toys and Structure",
            nome_es: "Juguetes y Estructura",
            emoji: "seesaw",
            itens: [
              { titulo: "Brinquedos livres de ferrugem, lascas de madeira ou pontas vivas", titulo_en: "Toys free of rust, wood splinters, or sharp edges", titulo_es: "Juguetes libres de \xF3xido, astillas de madera o bordes afilados", tipo: "perigo", tags: ["corte", "t\xE9tano"] },
              { titulo: "Assentos de balan\xE7os e correntes firmes e submetidos a revis\xF5es peri\xF3dicas", titulo_en: "Swing seats and chains firm and subjected to periodic checks", titulo_es: "Asientos de columpios y cadenas firmes y sujetos a revisiones peri\xF3dicas", tipo: "perigo", tags: ["queda"] },
              { titulo: "Piso com superf\xEDcie macia que absorve impacto (areia, grama grossa, borracha)", titulo_en: "Floor with a soft, impact-absorbing surface (sand, thick grass, rubber)", titulo_es: "Piso con superficie suave que absorbe impactos (arena, c\xE9sped grueso, goma)", tipo: "normal", tags: ["queda"] }
            ]
          },
          {
            nome: "Comportamento Seguro",
            nome_en: "Safe Behavior",
            nome_es: "Comportamiento Seguro",
            emoji: "\u{1F440}",
            itens: [
              { titulo: "Cord\xF5es, colares e cachec\xF3is s\xE3o removidos antes do uso (risco de enrosco e asfixia)", titulo_en: "Cords, necklaces, and scarves removed before use (entanglement and asphyxiation risk)", titulo_es: "Cordones, collares y bufandas removidos antes de usar (riesgo de enredo y asfixia)", tipo: "perigo", tags: ["asfixia", "estrangulamento"] },
              { titulo: "H\xE1 separa\xE7\xE3o em hor\xE1rios ou \xE1reas entre crian\xE7as grandes e beb\xEAs", titulo_en: "Are there separate times or areas between big kids and babies?", titulo_es: "\xBFHay separaci\xF3n de horarios o \xE1reas entre ni\xF1os grandes y beb\xE9s?", tipo: "sugest\xE3o", tags: ["choque"] },
              { titulo: "Supervis\xE3o visual constante, garantindo que as crian\xE7as nunca fiquem sozinhas", titulo_en: "Constant visual supervision, ensuring children are never left alone", titulo_es: "Supervisi\xF3n visual constante, asegurando que los ni\xF1os nunca se queden solos", tipo: "perigo", tags: ["supervis\xE3o"] }
            ]
          }
        ]
      },
      piscina: {
        categorias: [
          {
            nome: "Barreiras F\xEDsicas",
            nome_en: "Physical Barriers",
            nome_es: "Barreras F\xEDsicas",
            emoji: "\u{1F6A7}",
            itens: [
              { titulo: "Piscina \xE9 devidamente cercada (m\xEDnimo 1.20m) com port\xE3o e trava autom\xE1tica", titulo_en: "Pool is properly fenced (minimum 1.20m) with automatic gate and lock", titulo_es: "La piscina est\xE1 debidamente cercada (m\xEDnimo 1.20m) con puerta y cerradura autom\xE1tica", tipo: "perigo", tags: ["afogamento"] },
              { titulo: 'Uso de capa firme de seguran\xE7a que suporta peso (evitando criar bols\xE3o "envelope")', titulo_en: 'Use of a firm safety cover that supports weight (avoiding "envelope" pockets)', titulo_es: 'Uso de cubierta de seguridad firme que soporta peso (evitando crear bolsillos "sobre")', tipo: "perigo", tags: ["afogamento"] },
              { titulo: "Alarmes de detec\xE7\xE3o de movimento ativos instalados na superf\xEDcie da \xE1gua", titulo_en: "Active motion detection alarms installed on the water surface", titulo_es: "Alarmas activas de detecci\xF3n de movimiento instaladas en la superficie del agua", tipo: "sugest\xE3o", tags: ["tecnologia"] }
            ]
          },
          {
            nome: "Comportamento",
            nome_en: "Behavior",
            nome_es: "Comportamiento",
            emoji: "\u{1F440}",
            itens: [
              { titulo: "Supervis\xE3o visual direta e engajada (sem uso de celular) mantida durante uso", titulo_en: "Direct and engaged visual supervision (no phone use) maintained during use", titulo_es: "Supervisi\xF3n visual directa y comprometida (sin uso del celular) mantenida durante el uso", tipo: "perigo", tags: ["supervis\xE3o"] },
              { titulo: "Brinquedos removidos da piscina ap\xF3s uso (evitando atrativo para crian\xE7as)", titulo_en: "Toys removed from pool after use (avoiding attraction for children)", titulo_es: "Juguetes removidos de la piscina despu\xE9s del uso (evitando atracci\xF3n para ni\xF1os)", tipo: "normal", tags: ["preven\xE7\xE3o"] },
              { titulo: "Ralos modernos do modelo anti-aprisionamento de cabelos", titulo_en: "Modern drains with anti-hair entrapment models", titulo_es: "Desag\xFCes modernos del modelo anti-atrapamiento de cabello", tipo: "perigo", tags: ["seguran\xE7a"] },
              { titulo: "Piscina possui rampa ou escada interna para sa\xEDda aut\xF4noma de pets (Seguran\xE7a 3D)", titulo_en: "Pool has a ramp or internal stairs for autonomous pet exit (3D Safety)", titulo_es: "La piscina tiene rampa o escalera interna para la salida aut\xF3noma de mascotas (Seguridad 3D)", tipo: "perigo", tags: ["afogamento", "pets"] }
            ]
          }
        ]
      },
      central_gas: {
        categorias: [
          {
            nome: "Instala\xE7\xE3o",
            nome_en: "Installation",
            nome_es: "Instalaci\xF3n",
            emoji: "\u{1F525}",
            itens: [
              { titulo: "Botij\xF5es de g\xE1s armazenados em \xE1rea externa e bem ventilada", titulo_en: "Gas cylinders stored in an external, well-ventilated area", titulo_es: "Cilindros de gas almacenados en una zona externa y bien ventilada", tipo: "perigo", tags: ["explos\xE3o"] },
              { titulo: "Botij\xF5es protegidos de sol forte, chuva cont\xEDnua e longe de ralos (para o g\xE1s n\xE3o descer)", titulo_en: "Cylinders protected from strong sun, continuous rain, and away from drains (so gas doesn't sink)", titulo_es: "Cilindros protegidos del sol fuerte, lluvia continua y lejos de desag\xFCes (para que el gas no baje)", tipo: "normal", tags: ["manuten\xE7\xE3o"] },
              { titulo: "Mangueira e regulador est\xE3o devidamente dentro da validade", titulo_en: "Hose and regulator are strictly within validity", titulo_es: "La manguera y el regulador est\xE1n debidamente dentro de la validez", tipo: "perigo", tags: ["seguran\xE7a"] },
              { titulo: "Dist\xE2ncia segura mantida de instala\xE7\xF5es el\xE9tricas e tomadas pr\xF3ximas ao botij\xE3o", titulo_en: "Safe distance maintained from electrical installations and outlets near the cylinder", titulo_es: "Distancia segura mantenida de instalaciones el\xE9ctricas y enchufes cerca del cilindro", tipo: "perigo", tags: ["fogo"] }
            ]
          }
        ]
      },
      quarto_crianca: {
        categorias: [
          {
            nome: "Brinquedos Seguros",
            nome_en: "Safe Toys",
            nome_es: "Juguetes Seguros",
            emoji: "\u{1F9F8}",
            itens: [
              { titulo: "Brinquedos possuem o selo de certifica\xE7\xE3o do Inmetro", titulo_en: "Toys have the INMETRO certification seal", titulo_es: "Los juguetes tienen el sello de certificaci\xF3n de INMETRO", tipo: "normal", tags: ["qualidade"] },
              { titulo: 'Verificado pelo "Teste do Rolo de Papel" (pe\xE7as pequenas que passam no rolo de papel higi\xEAnico s\xE3o banidas)', titulo_en: 'Verified by the "Toilet Paper Roll Test" (small parts that pass through a toilet paper roll are banned)', titulo_es: 'Verificado por la "Prueba del rollo de papel" (piezas peque\xF1as que pasan por el rollo de papel higi\xE9nico est\xE1n prohibidas)', tipo: "sugest\xE3o", tags: ["asfixia"] },
              { titulo: "Brinquedos de pilha possuem o compartimento travado e parafusado", titulo_en: "Battery toys have the compartment locked and screwed shut", titulo_es: "Los juguetes a pilas tienen el compartimento cerrado con llave y atornillado", tipo: "perigo", tags: ["bateria"] },
              { titulo: "Bexigas/Bal\xF5es s\xE3o usados sob supervis\xE3o rigorosa (risco alto de asfixia em caso de estouro)", titulo_en: "Balloons are used under strict supervision (high risk of choking if popped)", titulo_es: "Los globos se usan bajo estricta supervisi\xF3n (alto riesgo de asfixia en caso de estallido)", tipo: "perigo", tags: ["asfixia"] }
            ]
          },
          {
            nome: "Cuidado no Banho (\xC1rea Molhada)",
            nome_en: "Bath Care (Wet Area)",
            nome_es: "Cuidado en el Ba\xF1o (\xC1rea H\xFAmeda)",
            emoji: "\u{1F6C1}",
            itens: [
              { titulo: "Tampa do vaso sanit\xE1rio possui trava f\xEDsica de engate antiafogamento", titulo_en: "Toilet lid has a physical anti-drowning catch lock", titulo_es: "La tapa del inodoro tiene un cierre f\xEDsico de enganche antiahogamiento", tipo: "perigo", tags: ["afogamento"] },
              { titulo: "Banheira \xE9 esvaziada instantaneamente ap\xF3s o t\xE9rmino do uso", titulo_en: "Bathtub is emptied instantly after use", titulo_es: "La ba\xF1era se vac\xEDa instant\xE1neamente despu\xE9s de su uso", tipo: "perigo", tags: ["afogamento"] },
              { titulo: "Crian\xE7a tem supervis\xE3o ininterrupta durante 100% do tempo do banho", titulo_en: "Child has uninterrupted supervision during 100% of bath time", titulo_es: "El ni\xF1o tiene supervisi\xF3n ininterrumpida durante el 100% del tiempo del ba\xF1o", tipo: "perigo", tags: ["supervis\xE3o"] }
            ]
          },
          {
            nome: "Ambiente",
            nome_en: "Environment",
            nome_es: "Ambiente",
            emoji: "\u{1F3E0}",
            itens: [
              { titulo: "Janelas do quarto possuem redes de prote\xE7\xE3o garantidas", titulo_en: "Bedroom windows have guaranteed safety nets", titulo_es: "Las ventanas del dormitorio tienen redes de protecci\xF3n garantizadas", tipo: "perigo", tags: ["queda"] },
              { titulo: "M\xF3veis inst\xE1veis, como c\xF4modas de gaveta, est\xE3o fixados na parede (anti tombamento)", titulo_en: "Unstable furniture, like drawer dressers, are fixed to the wall (anti-tip)", titulo_es: "Los muebles inestables, como las c\xF3modas, est\xE1n fijados a la pared (antivuelco)", tipo: "perigo", tags: ["tombamento"] },
              { titulo: "Todas as tomadas baixas t\xEAm protetores instalados", titulo_en: "All low outlets have installed protectors", titulo_es: "Todos los enchufes bajos tienen protectores instalados", tipo: "normal", tags: ["choque"] }
            ]
          }
        ]
      },
      garagem: {
        categorias: [
          {
            nome: "Prote\xE7\xE3o Ambiental e Gases",
            nome_en: "Environmental Protection and Gases",
            nome_es: "Protecci\xF3n Ambiental y Gases",
            emoji: "\u{1F697}",
            itens: [
              { titulo: "Voc\xEA verifica pontos cegos (embaixo e atr\xE1s) antes de ligar o ve\xEDculo?", titulo_en: "Do you check blind spots (under and behind) before starting the vehicle?", titulo_es: "\xBFRevisa los puntos ciegos (debajo y detr\xE1s) antes de encender el veh\xEDculo?", tipo: "perigo", tags: ["atropelamento"] },
              { titulo: "O carro \xE9 mantido desligado enquanto a garagem estiver fechada?", titulo_en: "Is the car kept off while the garage is closed?", titulo_es: "\xBFSe mantiene el autom\xF3vil apagado mientras el garaje est\xE1 cerrado?", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "A ilumina\xE7\xE3o \xE9 forte o suficiente para manobras seguras sem pontos de sombra?", titulo_en: "Is lighting strong enough for safe maneuvers without shadow spots?", titulo_es: "\xBFEs la iluminaci\xF3n lo suficientemente fuerte para maniobras seguras sin puntos de sombra?", tipo: "normal", tags: ["vis\xE3o"] }
            ]
          },
          {
            nome: "Armazenamento",
            nome_en: "Storage",
            nome_es: "Almacenamiento",
            emoji: "\u{1F4E6}",
            itens: [
              { titulo: "Inexistem materiais e flu\xEDdos inflam\xE1veis estocados nesta \xE1rea", titulo_en: "There are no flammable materials and fluids stored in this area", titulo_es: "No hay materiales y fluidos inflamables almacenados en esta \xE1rea", tipo: "perigo", tags: ["inc\xEAndio"] },
              { titulo: "Entulhos ausentes, garantindo livre circula\xE7\xE3o das portas do ve\xEDculo", titulo_en: "Absent debris, ensuring free circulation from vehicle doors", titulo_es: "Ausencia de escombros, garantizando la libre circulaci\xF3n de las puertas del veh\xEDculo", tipo: "normal", tags: ["acessibilidade"] }
            ]
          }
        ]
      },
      hall_corredor: {
        categorias: [
          {
            nome: "Acessibilidade",
            nome_en: "Accessibility",
            nome_es: "Accesibilidad",
            emoji: "\u{1F6B6}",
            itens: [
              { titulo: "O corredor tem largura livre (sem m\xF3veis pesados estreitando a passagem)", titulo_en: "The hallway has free width (no heavy furniture narrowing the passage)", titulo_es: "El pasillo tiene ancho libre (sin muebles pesados \u200B\u200Bque estrechen el paso)", tipo: "normal", tags: ["acessibilidade"] },
              { titulo: "Liga\xE7\xE3o da luz \xE9 autom\xE1tica (sensor) ou possui acendedor f\xE1cil ao alcance", titulo_en: "Light switch is automatic (sensor) or has an easy switch within reach", titulo_es: "El encendido es autom\xE1tico (sensor) o tiene un interruptor f\xE1cil al alcance", tipo: "sugest\xE3o", tags: ["conforto"] },
              { titulo: "Pisos s\xE3o completamente planos e sem tapetes soltos escorregadios", titulo_en: "Floors are completely flat and without slippery loose rugs", titulo_es: "Los pisos son completamente planos y sin alfombras sueltas resbaladizas", tipo: "perigo", tags: ["queda"] }
            ]
          },
          {
            nome: "Rota de Emerg\xEAncia",
            nome_en: "Emergency Route",
            nome_es: "Ruta de Emergencia",
            emoji: "\u{1F6AA}",
            itens: [
              { titulo: "Caminho at\xE9 a sa\xEDda principal est\xE1 100% livre de obst\xE1culos em qualquer hor\xE1rio", titulo_en: "Path to the main exit is 100% free of obstacles at all times", titulo_es: "El camino hacia la salida principal est\xE1 100% libre de obst\xE1culos en todo momento", tipo: "perigo", tags: ["evacua\xE7\xE3o"] },
              { titulo: "Existe luz de emerg\xEAncia ou lanterna acess\xEDvel no corredor para falta de energia", titulo_en: "Is there an emergency light or accessible flashlight in the hallway for power outages?", titulo_es: "\xBFHay una luz de emergencia o una linterna accesible en el pasillo en caso de cortes de energ\xEDa?", tipo: "sugest\xE3o", tags: ["energia"] },
              { titulo: "Fios el\xE9tricos embutidos ou protegidos por canaletas (sem fios soltos pelo ch\xE3o)", titulo_en: "Electrical wires embedded or protected by conduits (no loose wires on the floor)", titulo_es: "Cables el\xE9ctricos empotrados o protegidos por canaletas (sin cables sueltos en el suelo)", tipo: "normal", tags: ["trope\xE7o", "choque"] }
            ]
          }
        ]
      },
      jardim_horta: {
        categorias: [
          {
            nome: "Bot\xE2nica e Ambiente",
            nome_en: "Botany and Environment",
            nome_es: "Bot\xE1nica y Ambiente",
            emoji: "\u{1F33F}",
            itens: [
              { titulo: "Plantas sabidamente t\xF3xicas (ex: Comigo-ningu\xE9m-pode) foram mapeadas e removidas", titulo_en: "Known toxic plants (e.g., Dumbcane) mapped and removed", titulo_es: "Plantas conocidas por ser t\xF3xicas (ej: Dieffenbachia) mapeadas y removidas", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "O quintal est\xE1 livre de entulhos org\xE2nicos de adubo ou madeiras (abrigo para aranhas e escorpi\xF5es)", titulo_en: "The yard is free of organic debris like fertilizer or wood (shelter for spiders and scorpions)", titulo_es: "El patio est\xE1 libre de escombros org\xE1nicos de fertilizante o madera (refugio para ara\xF1as y escorpiones)", tipo: "normal", tags: ["animais_pe\xE7onhentos"] },
              { titulo: "Crian\xE7as e animais de estima\xE7\xE3o ficam afastados do operador durante o uso de m\xE1quinas/poda", titulo_en: "Children and pets stay away from the operator during machinery use/pruning", titulo_es: "Los ni\xF1os y las mascotas se mantienen alejados del operador durante el uso de m\xE1quinas/poda", tipo: "perigo", tags: ["seguran\xE7a"] }
            ]
          },
          {
            nome: "Ferramentas e Qu\xEDmicos",
            nome_en: "Tools and Chemicals",
            nome_es: "Herramientas y Qu\xEDmicos",
            emoji: "\u{1F6E0}\uFE0F",
            itens: [
              { titulo: "Fertilizantes e venenos ficam trancados rigorosamente na embalagem original", titulo_en: "Fertilizers and poisons are strictly locked in their original packaging", titulo_es: "Los fertilizantes y venenos est\xE1n estrictamente bajo llave en su envase original", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Tesouras de poda e serras est\xE3o travadas e guardadas fora de alcance", titulo_en: "Pruning shears and saws are locked and stored out of reach", titulo_es: "Tijeras de podar y sierras est\xE1n cerradas y guardadas fuera del alcance", tipo: "perigo", tags: ["corte"] },
              { titulo: "Ferramentas s\xE3o limpas ap\xF3s o uso (jamais largadas no ch\xE3o do jardim)", titulo_en: "Tools are cleaned after use (never left on the garden floor)", titulo_es: "Las herramientas se limpian despu\xE9s de su uso (nunca se dejan en el suelo del jard\xEDn)", tipo: "normal", tags: ["organiza\xE7\xE3o"] }
            ]
          },
          {
            nome: "Prote\xE7\xE3o Pessoal (EPI)",
            nome_en: "Personal Protection (PPE)",
            nome_es: "Protecci\xF3n Personal (EPI)",
            emoji: "\u{1F9E4}",
            itens: [
              { titulo: "Manuseio da terra vegetal ocorre com uso rotineiro de luvas e botas fechadas", titulo_en: "Potting soil handled with routine use of gloves and closed boots", titulo_es: "Manejo de la tierra con uso rutinario de guantes y botas cerradas", tipo: "normal", tags: ["biol\xF3gico"] },
              { titulo: "Uso padronizado de prote\xE7\xE3o ocular ao manipular qu\xEDmicos em spray ou galhos finos", titulo_en: "Standard use of eye protection when handling chemical sprays or thin branches", titulo_es: "Uso estandarizado de protecci\xF3n ocular al manipular aerosoles qu\xEDmicos o ramas finas", tipo: "sugest\xE3o", tags: ["epi"] }
            ]
          }
        ]
      },
      oficina: {
        categorias: [
          {
            nome: "Ferramentas",
            nome_en: "Tools",
            nome_es: "Herramientas",
            emoji: "\u{1F6E0}\uFE0F",
            itens: [
              { titulo: "Ferramentas mantidas guardadas em pain\xE9is ou caixas (nada solto ou espalhado)", titulo_en: "Tools kept stored on panels or in boxes (nothing loose or scattered)", titulo_es: "Herramientas guardadas en paneles o cajas (nada suelto o esparcido)", tipo: "normal", tags: ["organiza\xE7\xE3o"] },
              { titulo: "Serras e l\xE2minas de corte cortantes est\xE3o devidamente trancadas", titulo_en: "Saws and sharp cutting blades are properly locked", titulo_es: "Sierras y cuchillas de corte afiladas est\xE1n debidamente bloqueadas", tipo: "perigo", tags: ["corte"] },
              { titulo: "N\xEDvel de ventila\xE7\xE3o extra e ilumina\xE7\xE3o s\xE3o adequados ao ambiente", titulo_en: "Extra ventilation and lighting levels are adequate for the environment", titulo_es: "El nivel de ventilaci\xF3n extra y la iluminaci\xF3n son adecuados para el entorno", tipo: "normal", tags: ["sa\xFAde"] },
              { titulo: "Uso de equipamento de Prote\xE7\xE3o Individual (\xF3culos, luvas) sempre acess\xEDvel", titulo_en: "Use of Personal Protective Equipment (glasses, gloves) always accessible", titulo_es: "Uso de Equipo de Protecci\xF3n Personal (gafas, guantes) siempre accesible", tipo: "sugest\xE3o", tags: ["prote\xE7\xE3o"] }
            ]
          },
          {
            nome: "Seguran\xE7a El\xE9trica e Combust\xEDvel",
            nome_en: "Electrical and Fuel Safety",
            nome_es: "Seguridad El\xE9ctrica y de Combustibles",
            emoji: "\u26A1",
            itens: [
              { titulo: "Extintor de inc\xEAndio (tipo ABC) presente e com validade conferida", titulo_en: "Fire extinguisher (type ABC) present and validity checked", titulo_es: "Extintor de incendios (tipo ABC) presente y validez comprobada", tipo: "perigo", tags: ["inc\xEAndio"] },
              { titulo: 'Tomadas e extens\xF5es n\xE3o sobrecarregadas (sem "benjamin" em cascata)', titulo_en: 'Outlets and extensions not overloaded (no cascaded "power strips")', titulo_es: 'Enchufes y extensiones no sobrecargados (sin "regletas" en cascada)', tipo: "perigo", tags: ["choque", "inc\xEAndio"] },
              { titulo: "Porta da oficina trancada quando n\xE3o em uso (impedindo acesso infantil)", titulo_en: "Workshop door locked when not in use (preventing children's access)", titulo_es: "Puerta del taller cerrada con llave cuando no est\xE1 en uso (impidiendo el acceso de los ni\xF1os)", tipo: "perigo", tags: ["crian\xE7as", "seguran\xE7a"] }
            ]
          }
        ]
      },
      varanda: {
        categorias: [
          {
            nome: "Blindagem de Altura",
            nome_en: "Height Shielding",
            nome_es: "Blindaje de Altura",
            emoji: "\u{1F3D9}\uFE0F",
            itens: [
              { titulo: "Rede de prote\xE7\xE3o certificada instalada em toda a extens\xE3o do v\xE3o", titulo_en: "Certified safety net installed along the entire length of the span", titulo_es: "Red de protecci\xF3n certificada instalada en toda la longitud del espacio", tipo: "perigo", tags: ["queda"] },
              { titulo: 'Aus\xEAncia de m\xF3veis ou vasos pr\xF3ximos ao guarda-corpo (eliminando o "efeito escada")', titulo_en: 'Absence of furniture or pots near the guardrail (eliminating the "ladder effect")', titulo_es: 'Ausencia de muebles o macetas cerca de la barandilla (eliminando el "efecto escalera")', tipo: "perigo", tags: ["queda", "crian\xE7as"] },
              { titulo: "Piso \xE9 antiderrapante (mesmo sendo molhado com chuva)", titulo_en: "Floor is non-slip (even when wet with rain)", titulo_es: "El piso es antideslizante (incluso cuando est\xE1 mojado por la lluvia)", tipo: "normal", tags: ["queda"] }
            ]
          },
          {
            nome: "Seguran\xE7a Complementar",
            nome_en: "Complementary Safety",
            nome_es: "Seguridad Complementaria",
            emoji: "\u{1F6E1}\uFE0F",
            itens: [
              { titulo: "Vasos de plantas n\xE3o obstruem a passagem e est\xE3o fixados (sem risco de queda por vento)", titulo_en: "Plant pots do not obstruct the passage and are fixed (no risk of falling from wind)", titulo_es: "Las macetas no obstruyen el paso y est\xE1n fijas (sin riesgo de ca\xEDda por el viento)", tipo: "normal", tags: ["queda", "organiza\xE7\xE3o"] },
              { titulo: "Churrasqueira de varanda (se houver) possui ventila\xE7\xE3o adequada e extens\xE3o do g\xE1s conferida", titulo_en: "Balcony grill (if any) has proper ventilation and checked gas extension", titulo_es: "La parrilla del balc\xF3n (si la hay) tiene ventilaci\xF3n adecuada y extensi\xF3n de gas verificada", tipo: "perigo", tags: ["inc\xEAndio", "g\xE1s"] },
              { titulo: "Ilumina\xE7\xE3o noturna adequada para evitar trope\xE7os e quedas", titulo_en: "Adequate night lighting to avoid tripping and falling", titulo_es: "Iluminaci\xF3n nocturna adecuada para evitar tropiezos y ca\xEDdas", tipo: "sugest\xE3o", tags: ["vis\xE3o"] }
            ]
          }
        ]
      },
      despensa: {
        categorias: [
          {
            nome: "Seguran\xE7a Alimentar",
            nome_en: "Food Safety",
            nome_es: "Seguridad Alimentaria",
            emoji: "cans",
            itens: [
              { titulo: "Alimentos guardados longe de produtos de limpeza e qu\xEDmicos", titulo_en: "Food stored away from cleaning products and chemicals", titulo_es: "Alimentos almacenados lejos de productos de limpieza y qu\xEDmicos", tipo: "perigo", tags: ["contamina\xE7\xE3o"] },
              { titulo: "Escada segura dispon\xEDvel para alcan\xE7ar o alto (sem uso de banquinhos improvisados)", titulo_en: "Safe ladder available to reach high (no use of makeshift stools)", titulo_es: "Escalera segura disponible para alcanzar alturas (sin uso de taburetes improvisados)", tipo: "normal", tags: ["queda"] },
              { titulo: "Gr\xE3os crus (feij\xE3o, milho) ficam trancados em potes (risco de asfixia/nariz)", titulo_en: "Raw grains (beans, corn) are locked in jars (choking/nose risk)", titulo_es: "Los granos crudos (frijoles, ma\xEDz) est\xE1n encerrados en frascos (riesgo de asfixia/nariz)", tipo: "sugest\xE3o", tags: ["crian\xE7as"] }
            ]
          }
        ]
      },
      deposito: {
        categorias: [
          {
            nome: "Ordem e Progresso",
            nome_en: "Order and Progress",
            nome_es: "Orden y Progreso",
            emoji: "\u{1F4E6}",
            itens: [
              { titulo: "Ambiente se mant\xE9m limpo e ventilado (anulando atrativo para aranhas)", titulo_en: "Environment remains clean and ventilated (nullifying attraction for spiders)", titulo_es: "El entorno se mantiene limpio y ventilado (anulando la atracci\xF3n para las ara\xF1as)", tipo: "normal", tags: ["pragas"] },
              { titulo: "Itens pesados apoiados no ch\xE3o (nunca em prateleiras altas e inst\xE1veis)", titulo_en: "Heavy items supported on the floor (never on high, unstable shelves)", titulo_es: "Art\xEDculos pesados apoyados en el suelo (nunca en estantes altos e inestables)", tipo: "perigo", tags: ["esmagamento"] },
              { titulo: "Corredores internos de circula\xE7\xE3o se abrem totalmente livres", titulo_en: "Internal circulation corridors open up completely free", titulo_es: "Los pasillos de circulaci\xF3n interna se abren totalmente libres", tipo: "normal", tags: ["acessibilidade"] }
            ]
          },
          {
            nome: "Preven\xE7\xE3o de Riscos",
            nome_en: "Risk Prevention",
            nome_es: "Prevenci\xF3n de Riesgos",
            emoji: "\u26A0\uFE0F",
            itens: [
              { titulo: "Inexistem materiais inflam\xE1veis armazenados pr\xF3ximos a fontes de calor ou instala\xE7\xF5es el\xE9tricas", titulo_en: "There are no flammable materials stored near heat sources or electrical installations", titulo_es: "No hay materiales inflamables almacenados cerca de fuentes de calor o instalaciones el\xE9ctricas", tipo: "perigo", tags: ["inc\xEAndio"] },
              { titulo: "Inspe\xE7\xE3o peri\xF3dica de frestas e ralos contra escorpi\xF5es e aranhas-marrom", titulo_en: "Periodic inspection of cracks and drains against scorpions and brown spiders", titulo_es: "Inspecci\xF3n peri\xF3dica de grietas y desag\xFCes contra escorpiones y ara\xF1as pardas", tipo: "perigo", tags: ["animais_pe\xE7onhentos"] },
              { titulo: "Porta do dep\xF3sito possui trava que impede acesso de crian\xE7as sem supervis\xE3o", titulo_en: "Storage door has a lock that prevents unsupervised children's access", titulo_es: "La puerta de almacenamiento tiene una cerradura que impide el acceso de los ni\xF1os sin supervisi\xF3n", tipo: "sugest\xE3o", tags: ["crian\xE7as", "seguran\xE7a"] }
            ]
          }
        ]
      },
      copa: {
        categorias: [
          {
            nome: "Mesa Segura",
            nome_en: "Safe Table",
            nome_es: "Mesa Segura",
            emoji: "\u{1F37D}\uFE0F",
            itens: [
              { titulo: "As toalhas de mesa s\xE3o curtas ou presas (evitando pux\xF5es e quedas de objetos quentes ou cortantes)", titulo_en: "Tablecloths are short or secured (avoiding pulls and falls of hot or sharp objects)", titulo_es: "Los manteles son cortos o est\xE1n asegurados (evitando tirones y ca\xEDdas de objetos calientes o cortantes)", tipo: "perigo", tags: ["queimadura", "corte"] },
              { titulo: "Tapetes soltos embaixo da mesa ou no caminho at\xE9 l\xE1 foram eliminados", titulo_en: "Loose rugs under the table or on the way there have been eliminated", titulo_es: "Las alfombras sueltas debajo de la mesa o en el camino hacia ella se han eliminado", tipo: "normal", tags: ["queda"] },
              { titulo: "Objetos pesados ou de vidro ficam guardados nas partes seguras ou mais baixas da prateleira", titulo_en: "Heavy or glass objects are stored in the safe or lower parts of the shelf", titulo_es: "Los objetos pesados o de vidrio se guardan en las partes seguras o m\xE1s bajas del estante", tipo: "sugest\xE3o", tags: ["queda"] },
              { titulo: "As cadeiras s\xE3o est\xE1veis e niveladas, sem chance de virar para tr\xE1s sob peso normal", titulo_en: "Chairs are stable and level, with no chance of tipping backward under normal weight", titulo_es: "Las sillas son estables y niveladas, sin posibilidad de volcarse hacia atr\xE1s con peso normal", tipo: "normal", tags: ["acidente"] }
            ]
          }
        ]
      },
      sotao: {
        categorias: [
          {
            nome: "Estrutura e Acesso",
            emoji: "\u{1FA9C}",
            itens: [
              { titulo: "Escada de acesso (fixa ou retr\xE1til) \xE9 firme e suporta peso com seguran\xE7a", tipo: "perigo", tags: ["queda"] },
              { titulo: "Piso do s\xF3t\xE3o \xE9 forrado adequadamente (sem risco de pisar em falso no gesso/forro)", tipo: "perigo", tags: ["queda"] },
              { titulo: "Ilumina\xE7\xE3o \xE9 suficiente para inspecionar cantos escuros", tipo: "normal", tags: ["vis\xE3o"] }
            ]
          },
          {
            nome: "Clima e Pragas",
            emoji: "\u{1F987}",
            itens: [
              { titulo: "Telhado inspecionado periodicamente contra goteiras que afetem fia\xE7\xE3o el\xE9trica", tipo: "perigo", tags: ["choque", "inc\xEAndio"] },
              { titulo: "Ventila\xE7\xE3o adequada para evitar superaquecimento no ver\xE3o", tipo: "sugest\xE3o", tags: ["conforto"] },
              { titulo: "Livre de ninhos de p\xE1ssaros, morcegos, ratos ou cupins nas vigas", tipo: "perigo", tags: ["biol\xF3gico", "pragas"] }
            ]
          },
          {
            nome: "Armazenamento",
            emoji: "\u{1F4E6}",
            itens: [
              { titulo: "Caixas pesadas s\xE3o armazenadas nas bordas ou sobre vigas de sustenta\xE7\xE3o", tipo: "normal", tags: ["estrutura"] },
              { titulo: "Nenhum material inflam\xE1vel ou qu\xEDmico estocado pr\xF3ximo ao calor do telhado", tipo: "perigo", tags: ["inc\xEAndio"] }
            ]
          }
        ]
      },
      porao: {
        categorias: [
          {
            nome: "Qualidade do Ar e Umidade",
            emoji: "\u{1F4A7}",
            itens: [
              { titulo: "Ambiente livre de mofo negro e infiltra\xE7\xF5es severas nas paredes", tipo: "perigo", tags: ["respirat\xF3rio", "sa\xFAde"] },
              { titulo: "Ventila\xE7\xE3o mec\xE2nica ou natural presente para evitar ac\xFAmulo de gases (ex: rad\xF4nio, mon\xF3xido)", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Ralos possuem sistema de refluxo ou tampa para evitar alagamentos ou invas\xE3o de esgoto", tipo: "perigo", tags: ["higiene"] }
            ]
          },
          {
            nome: "Seguran\xE7a El\xE9trica e Estrutural",
            emoji: "\u26A1",
            itens: [
              { titulo: "Fia\xE7\xE3o el\xE9trica n\xE3o fica exposta \xE0 umidade do piso ou paredes", tipo: "perigo", tags: ["choque", "inc\xEAndio"] },
              { titulo: "Escada de descida possui corrim\xE3o extremamente firme e ilumina\xE7\xE3o dedicada", tipo: "perigo", tags: ["queda"] },
              { titulo: "Aus\xEAncia de rachaduras profundas nos pilares de funda\xE7\xE3o", tipo: "normal", tags: ["estrutura"] }
            ]
          },
          {
            nome: "Animais e Pragas",
            emoji: "\u{1F577}\uFE0F",
            itens: [
              { titulo: "Inspe\xE7\xE3o contra aranhas-marrom, escorpi\xF5es e roedores feita a cada 6 meses", tipo: "perigo", tags: ["animais_pe\xE7onhentos"] },
              { titulo: "Equipamentos e caixas armazenados elevados do ch\xE3o para evitar danos por umidade e abrigos", tipo: "normal", tags: ["organiza\xE7\xE3o"] }
            ]
          }
        ]
      },
      quarto_adulto: {
        categorias: [
          {
            nome: "Blindagem do Adulto",
            emoji: "\u{1F512}",
            itens: [
              { titulo: "Medicamentos e cosm\xE9ticos ficam totalmente fora do alcance ou trancados em gavetas", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Objetos cortantes (alicate de unha, tesoura) s\xE3o guardados de forma altamente segura e fechada", tipo: "normal", tags: ["corte"] },
              { titulo: "O carregador de celular fica desconectado e longe da cama na hora de dormir", tipo: "perigo", tags: ["choque", "inc\xEAndio"] },
              { titulo: "Cigarros e isqueiros mantidos inacess\xEDveis \xE0 curiosidade infantil", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: 'Aparelhos conectados diretamente na tomada ou sem sobrecarga com extens\xF5es ("benjamins")', tipo: "normal", tags: ["choque"] }
            ]
          }
        ]
      },
      canil: {
        categorias: [
          {
            nome: "Ambiente e Abrigo",
            emoji: "\u{1F3E0}",
            itens: [
              { titulo: "\xC1rea do pet possui abrigo protegido contra sol direto, chuva e vento forte", tipo: "normal", tags: ["conforto"] },
              { titulo: "Piso da \xE1rea \xE9 liso e f\xE1cil de higienizar (sem ac\xFAmulo de urina/fezes)", tipo: "normal", tags: ["sa\xFAde"] },
              { titulo: "Plantas t\xF3xicas para animais (comigo-ningu\xE9m-pode, l\xEDrio, espada-de-s\xE3o-jorge) foram removidas da \xE1rea de acesso", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Produtos carrapaticidas, venenos e qu\xEDmicos de limpeza ficam completamente inacess\xEDveis ao animal", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] }
            ]
          },
          {
            nome: "Seguran\xE7a e Preven\xE7\xE3o de Fugas",
            emoji: "\u{1F415}",
            itens: [
              { titulo: "Port\xF5es e cercas est\xE3o \xEDntegros e sem frestas por onde o animal possa escapar", tipo: "perigo", tags: ["fuga", "seguran\xE7a"] },
              { titulo: "Recipientes de \xE1gua e comida s\xE3o mantidos limpos e livres de insetos", tipo: "normal", tags: ["sa\xFAde"] },
              { titulo: "Fios el\xE9tricos e cabos est\xE3o protegidos ou fora do alcance do animal (risco de mastiga\xE7\xE3o)", tipo: "perigo", tags: ["choque"] },
              { titulo: "Lixeiras possuem tampas pesadas ou travas para evitar acesso a restos perigosos", tipo: "perigo", tags: ["intoxica\xE7\xE3o", "corte"] },
              { titulo: "Em caso de evacua\xE7\xE3o, coleira, guia e caixa de transporte est\xE3o acess\xEDveis rapidamente", tipo: "sugest\xE3o", tags: ["evacua\xE7\xE3o"] }
            ]
          }
        ]
      },
      kits_prontidao: {
        categorias: [
          {
            nome: "Equipamentos de Prote\xE7\xE3o (EPIs)",
            emoji: "\u{1FA96}",
            itens: [
              { titulo: "\xD3culos de prote\xE7\xE3o dispon\xEDveis para pequenas manuten\xE7\xF5es ou limpezas qu\xEDmicas", tipo: "perigo", tags: ["vis\xE3o"] },
              { titulo: "Luvas de raspa/couro presentes para jardinagem pesada e prote\xE7\xE3o contra animais pe\xE7onhentos", tipo: "perigo", tags: ["corte", "animais_pe\xE7onhentos"] },
              { titulo: "Cal\xE7ados fechados e antiderrapantes s\xE3o usados rotineiramente em limpeza e no jardim", tipo: "perigo", tags: ["queda", "animais_pe\xE7onhentos"] },
              { titulo: "Protetores auriculares (plugue ou concha) dispon\xEDveis para uso com ferramentas ruidosas", tipo: "normal", tags: ["audi\xE7\xE3o"] },
              { titulo: "Capacete de prote\xE7\xE3o (ou de ciclista) acess\xEDvel para manuten\xE7\xF5es em altura/telhados", tipo: "sugest\xE3o", tags: ["impacto"] }
            ]
          },
          {
            nome: "Caixa de Ferramentas",
            emoji: "\u{1F9F0}",
            itens: [
              { titulo: "Ferramentas de corte e perfura\xE7\xE3o s\xE3o estritamente isoladas do acesso infantil", tipo: "perigo", tags: ["corte"] },
              { titulo: "Fita isolante e chave de teste de tens\xE3o guardadas na caixa para emerg\xEAncias el\xE9tricas", tipo: "normal", tags: ["choque"] }
            ]
          },
          {
            nome: "Kits de Apoio e Emerg\xEAncia",
            emoji: "\u{1F392}",
            itens: [
              { titulo: "Lanterna resistente com pilhas extras ou luz de emerg\xEAncia mantidas funcionais", tipo: "perigo", tags: ["energia"] },
              { titulo: "Pilha extra de reserva (lacrada) para os equipamentos de ilumina\xE7\xE3o e emerg\xEAncia", tipo: "normal", tags: ["energia"] },
              { titulo: "Documentos de identidade e cartilhas de sa\xFAde (SUS/Plano) guardados em acesso priorit\xE1rio", tipo: "normal", tags: ["documentos"] },
              { titulo: "Lista impressa e atualizada de contatos de emerg\xEAncia e apoio afixada", tipo: "normal", tags: ["comunica\xE7\xE3o"] }
            ]
          },
          {
            nome: "Kit de Primeiros Socorros / Curativos",
            emoji: "\u{1FA79}",
            itens: [
              { titulo: "Estoque mantido de Antiss\xE9ptico (\xC1gua oxigenada 10v, Clorexidina ou similar)", tipo: "perigo", tags: ["primeiros_socorros"] },
              { titulo: "Dota\xE7\xE3o n\xE3o-vencida de compressas de gaze est\xE9ril, esparadrapo e curativos adesivos", tipo: "perigo", tags: ["primeiros_socorros"] },
              { titulo: "Soro Fisiol\xF3gico pronto para limpeza imediata de feridas abertas ou olhos", tipo: "normal", tags: ["primeiros_socorros"] },
              { titulo: "Tesoura sem ponta reservada no kit para corte de gazes ou vestimentas", tipo: "normal", tags: ["primeiros_socorros"] },
              { titulo: "Bolsa de gelo ou compressas frias instant\xE2neas para casos de picadas e contus\xF5es", tipo: "sugest\xE3o", tags: ["primeiros_socorros"] }
            ]
          },
          {
            nome: "Farm\xE1cia Caseira",
            emoji: "\u{1F48A}",
            itens: [
              { titulo: "Medicamentos estritamente isolados do alcance de crian\xE7as ou pets (alto e/ou trancado)", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Sais de Reidrata\xE7\xE3o Oral (SRO) dispon\xEDveis para emerg\xEAncias de desidrata\xE7\xE3o grave", tipo: "sugest\xE3o", tags: ["sa\xFAde"] },
              { titulo: "Medicamentos e insumos conferidos periodicamente, todos estritamente no prazo de validade", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] }
            ]
          },
          {
            nome: "Prontid\xE3o Pet",
            emoji: "\u{1F436}",
            itens: [
              { titulo: "C\xF3pia da via da Carteira de Vacina\xE7\xE3o guardada em formato f\xEDsico e \xE1gil (ou na Nuvem)", tipo: "normal", tags: ["documentos"] },
              { titulo: "Focinheira presente para uso como ferramenta de blindagem profil\xE1tica em momentos de estresse", tipo: "perigo", tags: ["seguran\xE7a"] },
              { titulo: "Caixa de transporte montada (ou bolsa de suporte) em padr\xE3o robusto, preparada para evacua\xE7\xE3o", tipo: "perigo", tags: ["fuga"] },
              { titulo: "\xC1gua e Ra\xE7\xE3o estocadas sob medida preventiva de seguran\xE7a em recipientes herm\xE9ticos de 3 dias", tipo: "sugest\xE3o", tags: ["sobreviv\xEAncia"] },
              { titulo: "Carv\xE3o Ativado em estoque (para emerg\xEAncias de intoxica\xE7\xE3o, sob guia veterin\xE1rio)", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] },
              { titulo: "Fotos impressas ou salvas offline do pet para identifica\xE7\xE3o r\xE1pida em caso de busca", tipo: "normal", tags: ["identifica\xE7\xE3o"] }
            ]
          }
        ]
      },
      // ==========================================
      // VISTORIAS INSTITUCIONAIS (NOVO)
      // ==========================================
      escola_segura: {
        categorias: [
          {
            nome: "Infraestrutura e Preven\xE7\xE3o de Quedas",
            emoji: "\u{1F3D7}\uFE0F",
            itens: [
              { titulo: "Pisos das \xE1reas de recrea\xE7\xE3o absorvem impacto (grama, areia ou emborrachados)", tipo: "perigo", tags: ["queda", "crian\xE7as"] },
              { titulo: "Escadas possuem corrim\xE3os em dupla altura (para adultos e crian\xE7as pequenas)", tipo: "perigo", tags: ["acessibilidade", "queda"] },
              { titulo: "Arestas e quinas vivas de balc\xF5es e pilares possuem prote\xE7\xE3o macia", tipo: "normal", tags: ["impacto"] },
              { titulo: "Janelas e basculantes nos andares superiores possuem redes de prote\xE7\xE3o", tipo: "perigo", tags: ["queda"] },
              { titulo: "Ralos dos p\xE1tios possuem telas para evitar ac\xFAmulo de sujeira e insetos", tipo: "normal", tags: ["limpeza"] }
            ]
          },
          {
            nome: "Inc\xEAndio e Evacua\xE7\xE3o",
            emoji: "\u{1F9EF}",
            itens: [
              { titulo: "Existe um Plano de Abandono Escolar documentado e testado em simulados", tipo: "perigo", tags: ["evacua\xE7\xE3o", "inc\xEAndio"] },
              { titulo: "Rotas de fuga est\xE3o sinalizadas (placas luminescentes) e desobstru\xEDdas", tipo: "perigo", tags: ["evacua\xE7\xE3o"] },
              { titulo: "Extintores de inc\xEAndio est\xE3o na validade e sem obstru\xE7\xF5es na frente", tipo: "perigo", tags: ["inc\xEAndio"] },
              { titulo: "Portas de \xE1reas de grande circula\xE7\xE3o abrem para fora (sentido da fuga)", tipo: "normal", tags: ["evacua\xE7\xE3o"] }
            ]
          },
          {
            nome: "Sa\xFAde e Primeiros Socorros (Lei Lucas)",
            emoji: "\u2695\uFE0F",
            itens: [
              { titulo: "Profissionais possuem curso atualizado de Primeiros Socorros (Lei 13.722/18)", tipo: "perigo", tags: ["sa\xFAde", "legisla\xE7\xE3o"] },
              { titulo: "Existe um Kit de Primeiros Socorros completo e rapidamente acess\xEDvel", tipo: "perigo", tags: ["sa\xFAde"] },
              { titulo: "A escola possui formul\xE1rio m\xE9dico dos alunos (alergias, tipo sangu\xEDneo)", tipo: "normal", tags: ["sa\xFAde"] },
              { titulo: "Medicamentos dos alunos ficam retidos e trancados na coordena\xE7\xE3o/enfermaria", tipo: "perigo", tags: ["intoxica\xE7\xE3o"] }
            ]
          },
          {
            nome: "Seguran\xE7a El\xE9trica e Acesso",
            emoji: "\u26A1",
            itens: [
              { titulo: "Tomadas acess\xEDveis \xE0s crian\xE7as possuem protetores firmes", tipo: "perigo", tags: ["choque", "crian\xE7as"] },
              { titulo: "Quadro de for\xE7a (disjuntores) fica trancado, sem acesso para alunos", tipo: "perigo", tags: ["choque"] },
              { titulo: "Controle de acesso rigoroso na portaria (s\xF3 autorizados retiram crian\xE7as)", tipo: "perigo", tags: ["seguran\xE7a"] }
            ]
          },
          {
            nome: "Corpo Docente e Preven\xE7\xE3o",
            emoji: "\u{1F465}",
            itens: [
              { titulo: "A escola possui canal de den\xFAncias ou ouvidoria ativa para pais e alunos relatarem abusos/bullying de forma confidencial", tipo: "perigo", tags: ["psicol\xF3gico", "preven\xE7\xE3o"] },
              { titulo: "Profissionais de apoio (portaria, merenda, auxiliares) possuem checagem pr\xE9via de antecedentes criminais pela dire\xE7\xE3o", tipo: "normal", tags: ["seguran\xE7a"] },
              { titulo: "Existe supervis\xE3o visual constante dos monitores mesmo durante o recreio e idas ao banheiro das crian\xE7as", tipo: "perigo", tags: ["supervis\xE3o"] }
            ]
          }
        ]
      },
      asilo_seguro: {
        categorias: [
          {
            nome: "Acessibilidade (Estatuto do Idoso/ABNT)",
            emoji: "\u{1F9BD}",
            itens: [
              { titulo: "Aus\xEAncia total de degraus isolados (uso de rampas adequadas com piso t\xE1til)", tipo: "perigo", tags: ["queda", "acessibilidade"] },
              { titulo: "Corredores largos e portas dimensionadas para cadeiras de rodas", tipo: "perigo", tags: ["acessibilidade"] },
              { titulo: "Corrim\xE3os cont\xEDnuos instalados em ambos os lados de rampas e corredores", tipo: "normal", tags: ["mobilidade"] },
              { titulo: "Ilumina\xE7\xE3o forte e cont\xEDnua, principalmente \xE0 noite (luzes de balizamento)", tipo: "perigo", tags: ["vis\xE3o", "queda"] },
              { titulo: "Pisos antiderrapantes (zero tapetes soltos em \xE1reas de circula\xE7\xE3o)", tipo: "perigo", tags: ["queda"] }
            ]
          },
          {
            nome: "Banheiros e Higiene (RDC Anvisa)",
            emoji: "\u{1F6BF}",
            itens: [
              { titulo: "Banheiros adaptados com barras de apoio fixadas no vaso e no box", tipo: "perigo", tags: ["queda", "acessibilidade"] },
              { titulo: "Portas dos banheiros abrem para fora (acesso r\xE1pido em caso de queda/desmaio)", tipo: "perigo", tags: ["emerg\xEAncia"] },
              { titulo: "Piso do box \xE9 totalmente nivelado (sem ressaltos de m\xE1rmore para trope\xE7o)", tipo: "normal", tags: ["queda"] },
              { titulo: "Assento do vaso sanit\xE1rio \xE9 elevado, facilitando o uso", tipo: "sugest\xE3o", tags: ["conforto"] }
            ]
          },
          {
            nome: "Emerg\xEAncia e Cuidados M\xE9dicos",
            emoji: "\u{1F6A8}",
            itens: [
              { titulo: "Quartos/banheiros possuem bot\xF5es de emerg\xEAncia ao alcance das m\xE3os e do ch\xE3o", tipo: "perigo", tags: ["sa\xFAde", "emerg\xEAncia"] },
              { titulo: "Medicamentos s\xE3o gerenciados e trancados exclusivamente pela enfermagem", tipo: "perigo", tags: ["intoxica\xE7\xE3o", "sa\xFAde"] },
              { titulo: "Camas possuem altura regul\xE1vel e grades retr\xE1teis para evitar quedas", tipo: "normal", tags: ["queda"] }
            ]
          },
          {
            nome: "Inc\xEAndio e Evacua\xE7\xE3o Adaptada",
            emoji: "\u{1F525}",
            itens: [
              { titulo: "Plano de emerg\xEAncia visa a retirada de pessoas acamadas/mobilidade reduzida", tipo: "perigo", tags: ["evacua\xE7\xE3o", "inc\xEAndio"] },
              { titulo: "Aus\xEAncia de cadeiras ou macas soltas nos corredores bloqueando a rota de fuga", tipo: "perigo", tags: ["evacua\xE7\xE3o"] },
              { titulo: "Sistema de detec\xE7\xE3o de fuma\xE7a e alarme sonoro ativo com brigadistas treinados", tipo: "perigo", tags: ["inc\xEAndio"] }
            ]
          },
          {
            nome: "Equipe e \xC9tica do Cuidado",
            emoji: "\u{1F91D}",
            itens: [
              { titulo: "Instala\xE7\xE3o de c\xE2meras de monitoramento nas \xE1reas comuns (corredores/salas) para auditoria comportamental", tipo: "perigo", tags: ["seguran\xE7a", "monitoramento"] },
              { titulo: "A institui\xE7\xE3o garante que cuidadores possuem qualifica\xE7\xE3o t\xE9cnica comprovada e antecedentes criminais checados", tipo: "perigo", tags: ["sa\xFAde", "profissionalismo"] },
              { titulo: "Os idosos se comunicam livremente ou existe canal confidencial direto entre a fam\xEDlia e a diretoria t\xE9cnica", tipo: "normal", tags: ["transpar\xEAncia"] }
            ]
          }
        ]
      }
    };
  }
});

// services/ProfileModels.js
var VIGILARO_DATA_KEY, getDefaultData, getDefaultProfile;
var init_ProfileModels = __esm({
  "services/ProfileModels.js"() {
    VIGILARO_DATA_KEY = "@vigilaro_data";
    getDefaultData = () => ({
      versao: 2,
      // Versão atualizada com novo modelo
      migrado: false,
      onboardingCompleto: false,
      // Metadados sobre a família/moradia
      meta: {
        totalMoradoresEsperados: 0,
        // Quantas pessoas moram na casa
        totalPetsEsperados: 0,
        // Quantos pets
        dataCriacao: (/* @__PURE__ */ new Date()).toISOString(),
        ultimaAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
      },
      moradia: {
        tipo: null,
        // 'casa' | 'casa_condominio' | 'sobrado' | 'apartamento' | 'conjunto_apartamento' | 'cobertura' | 'sitio' | 'casa_praia'
        andares: 1,
        regiao: null,
        // 'urbana' | 'rural' | 'litoranea'
        // Equipamentos e eletrodomésticos de risco
        equipamentos: [],
        // ['fogao_gas', 'piscina', 'ferramentas_pesadas', ...]
        // Estrutura física
        estrutura: {
          ambientes: [],
          // ['cozinha', 'sala', 'quarto_casal', ...]
          caracteristicas: [],
          // ['escadas', 'piscina', 'varanda', ...]
          utilidades: null,
          // 'gas_encanado' | 'botijao' | 'eletrico'
          completude: 0
          // 0-100%
        },
        // Riscos identificados
        riscos: {
          identificados: [],
          // ['escada_sem_portao', 'piscina_sem_cerca', ...]
          equipamentosSeguranca: [],
          // ['extintor', 'detector_fumaca', ...]
          completude: 0
          // 0-100%
        },
        // Inventário da casa
        inventario: {
          produtosQuimicos: { local: null, acessivel: null },
          medicamentos: { local: null, controlados: null },
          ferramentas: { local: null },
          armas: { possui: null, guardada: null },
          completude: 0
          // 0-100%
        },
        ultimaAtualizacao: null
      },
      // Multi-Home: residência padrão sempre presente
      residences: [{
        id: "default_home",
        nome: "Minha Casa Principal",
        moradia: { habitantes: [], frequentadores: [] },
        mapping: [],
        checklists: {},
        foto: null
      }],
      activeResidenceId: "default_home",
      perfis: [],
      // Completude calculada
      completude: {
        familia: 0,
        // % de perfis completos vs esperados
        estrutura: 0,
        // % moradia.estrutura completa
        riscos: 0,
        // % riscos identificados
        inventario: 0,
        // % inventário catalogado
        total: 0
        // Média ponderada
      },
      preferencias: {
        notificacoes: true,
        lembretesMedicacao: true,
        idioma: "pt-BR"
      },
      historicoChecklists: [],
      dataCriacao: (/* @__PURE__ */ new Date()).toISOString(),
      dataAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
    });
    getDefaultProfile = (tipo = "humano") => ({
      id: Date.now().toString(),
      tipo,
      // 'humano' | 'pet'
      ativo: false,
      // Perfil principal para alertas
      // Dados Básicos
      nome: "",
      foto: null,
      dataNascimento: "",
      // DD/MM/AAAA
      genero: "",
      // Dados de Emergência (conceito ICE)
      tipoSanguineo: "",
      condicoesMedicas: [],
      // diabetes, hipertensão...
      alergias: [],
      medicamentosEmUso: [],
      necessidadesEspeciais: [],
      // mobilidade reduzida, visual, auditivo
      // Contatos de Emergência (por pessoa)
      contatos: [],
      // [{ nome, telefone, relacao }]
      // ── Vínculo Morador↔Cômodo ──
      // Quais ambientes este perfil USA no dia a dia. Fundamento do
      // briefing vivo: alimenta o RiskInterpreter (D4) com contexto
      // de quem frequenta o quê. Ex: idosa Maria usa quarto_principal
      // → escada sem corrimão lá vira prioridade alta pra ela.
      // Array de IDs do mapping (mesmos IDs salvos por ProfileService.saveMapping).
      // [] significa "ainda não declarado" — será preenchido no wizard P3/P4
      // ou via migração (estratégia conservadora: todos os cômodos mapeados).
      comodosUsados: [],
      // Pet específico
      especie: "",
      // cachorro, gato, pássaro...
      raca: "",
      porte: "",
      // pequeno, medio, grande
      castrado: false,
      // Metadados
      schemaVersion: 2,
      // bumped quando adicionamos comodosUsados (migração automática)
      dataCriacao: (/* @__PURE__ */ new Date()).toISOString(),
      dataAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
});

// services/LegacyMigrationService.js
var import_async_storage, LEGACY_KEYS, LegacyMigrationService, LegacyMigrationService_default;
var init_LegacyMigrationService = __esm({
  "services/LegacyMigrationService.js"() {
    import_async_storage = __toESM(require("@react-native-async-storage/async-storage"));
    init_ProfileModels();
    LEGACY_KEYS = {
      perfis: "@perfis",
      userSecurityProfile: "@user_security_profile",
      briefingData: "@briefing_data",
      perfilUsuario: "perfil_usuario",
      vitalContacts: "@vital_contacts"
    };
    LegacyMigrationService = class {
      /**
       * Verifica se existem dados em chaves antigas
       */
      static async checkNeedsMigration() {
        try {
          for (const key of Object.values(LEGACY_KEYS)) {
            const value = await import_async_storage.default.getItem(key);
            if (value) return true;
          }
          return false;
        } catch (error) {
          return false;
        }
      }
      /**
       * Migra dados das chaves antigas para a nova estrutura
       */
      static async migrateFromLegacy() {
        console.log("\u{1F4E6} LegacyMigrationService: Iniciando migra\xE7\xE3o de dados antigos...");
        const newData = getDefaultData();
        try {
          const perfisJson = await import_async_storage.default.getItem(LEGACY_KEYS.perfis);
          if (perfisJson) {
            const perfisAntigos = JSON.parse(perfisJson);
            newData.perfis = perfisAntigos.map((p) => this.convertLegacyProfile(p));
            console.log(`\u2705 Migrados ${newData.perfis.length} perfis de @perfis`);
          }
          const securityJson = await import_async_storage.default.getItem(LEGACY_KEYS.userSecurityProfile);
          if (securityJson) {
            const security = JSON.parse(securityJson);
            if (security.propertyType) {
              newData.moradia.tipo = security.propertyType;
            }
            if (security.emergencyContacts && newData.perfis.length > 0) {
              const primeiroHumano = newData.perfis.find((p) => p.tipo === "humano");
              if (primeiroHumano) {
                primeiroHumano.contatos = security.emergencyContacts.map((c) => ({
                  nome: c.name,
                  telefone: c.phone,
                  relacao: c.relation || "Emerg\xEAncia"
                }));
              }
            }
            if (security.name) {
              const perfilAtivo = newData.perfis.find((p) => p.nome === security.name);
              if (perfilAtivo) perfilAtivo.ativo = true;
            }
            console.log("\u2705 Migrados dados de @user_security_profile");
          }
          const perfilUsuarioJson = await import_async_storage.default.getItem(LEGACY_KEYS.perfilUsuario);
          if (perfilUsuarioJson) {
            const perfilUsuario = JSON.parse(perfilUsuarioJson);
            if (perfilUsuario.ambiente) {
              Object.assign(newData.moradia, perfilUsuario.ambiente);
            }
            if (perfilUsuario.saude && newData.perfis.length > 0) {
              const primeiroHumano = newData.perfis.find((p) => p.tipo === "humano");
              if (primeiroHumano) {
                if (perfilUsuario.saude.doencas) {
                  primeiroHumano.condicoesMedicas = perfilUsuario.saude.doencas.split(",").map((s) => s.trim());
                }
                if (perfilUsuario.saude.medicacao) {
                  primeiroHumano.medicamentosEmUso = perfilUsuario.saude.medicacao.split(",").map((s) => s.trim());
                }
                if (perfilUsuario.saude.limitacoes) {
                  primeiroHumano.necessidadesEspeciais.push(perfilUsuario.saude.limitacoes);
                }
              }
            }
            console.log("\u2705 Migrados dados de perfil_usuario");
          }
          const contactsJson = await import_async_storage.default.getItem(LEGACY_KEYS.vitalContacts);
          if (contactsJson) {
            const contacts = JSON.parse(contactsJson);
            if (contacts.length > 0 && newData.perfis.length > 0) {
              const primeiroHumano = newData.perfis.find((p) => p.tipo === "humano");
              if (primeiroHumano) {
                contacts.forEach((c) => {
                  if (!primeiroHumano.contatos.find((existing) => existing.telefone === c.phone)) {
                    primeiroHumano.contatos.push({
                      nome: c.name,
                      telefone: c.phone,
                      relacao: c.relationship || c.role || "Contato"
                    });
                  }
                });
              }
            }
            console.log(`\u2705 Migrados ${contacts.length} contatos de @vital_contacts`);
          }
          newData.migrado = true;
          newData.onboardingCompleto = newData.perfis.length > 0 && newData.moradia.tipo !== null;
          await import_async_storage.default.setItem(VIGILARO_DATA_KEY, JSON.stringify(newData));
          console.log("\u2705 Migra\xE7\xE3o completa!");
          return newData;
        } catch (error) {
          if (__DEV__) {
            console.error("\u274C Erro na migra\xE7\xE3o:", error);
          }
          return newData;
        }
      }
      /**
       * Converte um perfil antigo para o novo formato
       */
      static convertLegacyProfile(oldProfile) {
        const newProfile = getDefaultProfile(oldProfile.tipo || "humano");
        newProfile.id = oldProfile.id || Date.now().toString();
        newProfile.nome = oldProfile.nome || oldProfile.name || "";
        newProfile.foto = oldProfile.foto || null;
        newProfile.dataNascimento = oldProfile.birthDate || oldProfile.dataNascimento || "";
        newProfile.genero = oldProfile.gender || oldProfile.genero || "";
        if (oldProfile.condicoesMedicas) {
          newProfile.condicoesMedicas = typeof oldProfile.condicoesMedicas === "string" ? oldProfile.condicoesMedicas.split(",").map((s) => s.trim()) : oldProfile.condicoesMedicas;
        }
        if (oldProfile.medicalConditions) {
          newProfile.condicoesMedicas = oldProfile.medicalConditions;
        }
        if (oldProfile.alergias || oldProfile.allergies) {
          newProfile.alergias = oldProfile.alergias || oldProfile.allergies || [];
        }
        newProfile.tipoSanguineo = oldProfile.tipoSanguineo || "";
        if (oldProfile.mobilidadeReduzida || oldProfile.accessibilityNeeds) {
          newProfile.necessidadesEspeciais = Array.isArray(oldProfile.accessibilityNeeds) ? oldProfile.accessibilityNeeds : oldProfile.mobilidadeReduzida ? ["Mobilidade reduzida"] : [];
        }
        if (oldProfile.contatoEmergencia) {
          newProfile.contatos.push({
            nome: "Contato de Emerg\xEAncia",
            telefone: oldProfile.contatoEmergencia,
            relacao: "Emerg\xEAncia"
          });
        }
        if (oldProfile.emergencyContacts) {
          newProfile.contatos = oldProfile.emergencyContacts.map((c) => ({
            nome: c.name,
            telefone: c.phone,
            relacao: c.relation || "Emerg\xEAncia"
          }));
        }
        if (oldProfile.tipo === "pet") {
          newProfile.especie = oldProfile.especie || oldProfile.species || "";
          newProfile.raca = oldProfile.raca || oldProfile.breed || "";
          newProfile.porte = oldProfile.porte || "";
          newProfile.castrado = oldProfile.castrado || false;
        }
        newProfile.dataCriacao = oldProfile.dataCriacao || oldProfile.createdAt || (/* @__PURE__ */ new Date()).toISOString();
        newProfile.dataAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
        return newProfile;
      }
      /**
       * Limpa chaves antigas após confirmar migração (usar com cuidado)
       */
      static async cleanupLegacyKeys() {
        try {
          for (const key of Object.values(LEGACY_KEYS)) {
            await import_async_storage.default.removeItem(key);
          }
          console.log("\u2705 Chaves antigas removidas");
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao limpar chaves antigas:", error);
          }
          return false;
        }
      }
    };
    LegacyMigrationService_default = LegacyMigrationService;
  }
});

// data/areas_internas.js
var init_areas_internas = __esm({
  "data/areas_internas.js"() {
  }
});

// data/areas_externas.js
var init_areas_externas = __esm({
  "data/areas_externas.js"() {
  }
});

// utils/ProfileFilterEngine.js
var ProfileFilterEngine_exports = {};
__export(ProfileFilterEngine_exports, {
  MAPPING_TRIGGERS: () => MAPPING_TRIGGERS,
  default: () => ProfileFilterEngine_default,
  getRelevantAreas: () => getRelevantAreas,
  isAreaRelevant: () => isAreaRelevant,
  isItemRelevant: () => isItemRelevant
});
function calcularIdade(dataNascimento) {
  if (!dataNascimento) return null;
  try {
    const nascimento = new Date(dataNascimento);
    const hoje = /* @__PURE__ */ new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || m === 0 && hoje.getDate() < nascimento.getDate()) idade--;
    return idade;
  } catch {
    return null;
  }
}
function isAreaRelevant(area, moradia, profiles, mapping) {
  const safeMapping = Array.isArray(mapping) ? mapping : [];
  const safeProfiles = Array.isArray(profiles) ? profiles : [];
  const safeMoradia = moradia || {};
  const { condicional } = area;
  if (!condicional) return true;
  const explicitTriggers = MAPPING_TRIGGERS[area.id] || [];
  const isExplicitlyMapped = explicitTriggers.some((t) => safeMapping.includes(t)) || safeMapping.includes(area.id);
  if (["bebe", "crianca", "idoso"].includes(condicional)) {
    if (safeMapping.length > 0) return isExplicitlyMapped;
    const hasResident = safeProfiles.some((p) => {
      if (p.tipo === condicional) return true;
      const idade = calcularIdade(p.dataNascimento);
      if (idade === null) return false;
      if (condicional === "bebe") return idade <= 1;
      if (condicional === "crianca") return idade >= 2 && idade <= 12;
      if (condicional === "idoso") return idade >= 60;
      return false;
    });
    return hasResident;
  }
  if (condicional === "opcional") {
    const basicAreas = ["cozinha", "sala", "banheiro", "area_servico", "hall_corredor"];
    if (safeMapping.length === 0 && basicAreas.includes(area.id)) {
      return true;
    }
    if (area.id === "escadas") {
      const hasManualEscada = isExplicitlyMapped;
      const andares = parseInt(safeMoradia.andares || 1, 10);
      const hasStructuralEscada = andares > 1 || safeMoradia.tipoConstrucao === "sobrado" || safeMoradia.tipoImovel === "sobrado";
      return hasManualEscada || hasStructuralEscada;
    }
    if (isExplicitlyMapped) return true;
    return false;
  }
  return true;
}
function isItemRelevant(item, profiles, moradia) {
  if (!item.tags || item.tags.length === 0) return true;
  const safeProfiles = Array.isArray(profiles) ? profiles : [];
  const safeMoradia = moradia || {};
  const hasBebe = safeProfiles.some((p) => p.tipo === "bebe" || p.tipo === "humano" && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) <= 1);
  const hasCrianca = safeProfiles.some((p) => p.tipo === "crianca" || p.tipo === "humano" && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) <= 12);
  const hasIdoso = safeProfiles.some((p) => p.tipo === "idoso" || p.tipo === "humano" && calcularIdade(p.dataNascimento) !== null && calcularIdade(p.dataNascimento) >= 60);
  const hasPetIdoso = safeProfiles.some((p) => {
    if (p.tipo !== "pet") return false;
    const idade = calcularIdade(p.dataNascimento);
    if (idade === null) return false;
    if (p.especie === "gato") return idade >= 10;
    return idade >= 7;
  });
  const hasPetPcd = safeProfiles.some((p) => p.tipo === "pet" && p.necessidadesEspeciais && p.necessidadesEspeciais.length > 0);
  const hasPetMobilidade = safeProfiles.some((p) => p.tipo === "pet" && p.necessidadesEspeciais && p.necessidadesEspeciais.includes("mobilidade_reduzida"));
  const hasPetVisao = safeProfiles.some((p) => p.tipo === "pet" && p.necessidadesEspeciais && p.necessidadesEspeciais.includes("visao_reduzida"));
  const hasDisfuncaoCognitiva = safeProfiles.some((p) => p.tipo === "pet" && p.necessidadesEspeciais && p.necessidadesEspeciais.includes("disfuncao_cognitiva"));
  if (item.tags.includes("crian\xE7as") || item.tags.includes("crianca")) {
    if (!hasCrianca && !hasBebe) return false;
  }
  if (item.tags.includes("bebe")) {
    if (!hasBebe) return false;
  }
  if (item.tags.includes("idoso") || item.tags.includes("idosos")) {
    if (!hasIdoso) return false;
  }
  if (item.tags.includes("pet_idoso")) {
    if (!hasPetIdoso) return false;
  }
  if (item.tags.includes("pet_pcd")) {
    if (!hasPetPcd) return false;
  }
  if (item.tags.includes("pet_mobilidade")) {
    if (!hasPetMobilidade) return false;
  }
  if (item.tags.includes("pet_visao_reduzida")) {
    if (!hasPetVisao) return false;
  }
  if (item.tags.includes("disfuncao_cognitiva")) {
    if (!hasDisfuncaoCognitiva) return false;
  }
  return true;
}
function getRelevantAreas(allAreas, moradia, profiles, mapping) {
  if (!allAreas) return [];
  return allAreas.filter((area) => isAreaRelevant(area, moradia, profiles, mapping));
}
var MAPPING_TRIGGERS, ProfileFilterEngine_default;
var init_ProfileFilterEngine = __esm({
  "utils/ProfileFilterEngine.js"() {
    MAPPING_TRIGGERS = {
      piscina: ["piscina", "piscina_coletiva"],
      parquinho: ["parquinho", "playground_coletivo"],
      escadas: ["escadas_internas", "escadas"],
      quintal: ["quintal", "quadra_esportiva", "frente"],
      jardim_horta: ["jardim", "horta", "jardinagem_ativa"],
      garagem: ["garagem"],
      deposito: ["deposito_oficina", "sotao_porao", "ferramentas"],
      oficina: ["deposito_oficina", "ferramentas"],
      sotao: ["sotao_porao"],
      porao: ["sotao_porao"],
      canil: ["area_pet"],
      central_gas: ["central_gas", "gas_encanado", "botijao"],
      despensa: ["despensa"],
      copa: ["copa"],
      // Separado da sala
      varanda: ["sacada", "varanda_externa", "varanda", "terraco"],
      hall_corredor: ["corredor", "hall", "elevador_hall"],
      quarto_adulto: ["quarto_casal", "quarto_solteiro", "quarto_hospedes", "quarto_adolescente", "escritorio", "quarto_pcd"],
      quarto_bebe: ["quarto_bebe"],
      quarto_crianca: ["quarto_infantil", "brinquedoteca"],
      quarto_idoso: ["quarto_idoso"],
      area_servico: ["lavanderia", "area_servico", "lavanderia_interna"],
      cozinha: ["cozinha", "cozinha_americana", "cozinha_tradicional"],
      sala: ["sala_estar", "sala_jantar", "sala"],
      banheiro: ["banheiro_social", "banheiro_suite", "lavabo", "banheiro"]
    };
    ProfileFilterEngine_default = { getRelevantAreas, isAreaRelevant, isItemRelevant, MAPPING_TRIGGERS };
  }
});

// services/TimelineService.js
var import_async_storage2, TIMELINE_KEY, TimelineService, TimelineService_default;
var init_TimelineService = __esm({
  "services/TimelineService.js"() {
    import_async_storage2 = __toESM(require("@react-native-async-storage/async-storage"));
    TIMELINE_KEY = "@vigilaro_historico";
    TimelineService = class {
      async logMelhoria(areaId, itemTitulo) {
        try {
          const dataStr = await import_async_storage2.default.getItem(TIMELINE_KEY);
          let history = dataStr ? JSON.parse(dataStr) : [];
          const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          const isDupe = history.some((h) => h.areaId === areaId && h.titulo === itemTitulo && h.data.startsWith(today));
          if (isDupe) return;
          history.unshift({
            id: Date.now().toString(),
            areaId: areaId || "geral",
            titulo: itemTitulo,
            data: (/* @__PURE__ */ new Date()).toISOString(),
            tipo: "melhoria"
            // Permitiria tipos futuros como 'alerta', etc.
          });
          if (history.length > 100) history = history.slice(0, 100);
          await import_async_storage2.default.setItem(TIMELINE_KEY, JSON.stringify(history));
        } catch (error) {
          if (__DEV__) {
            console.error("[TimelineService] Erro ao registrar hist\xF3rico:", error);
          }
        }
      }
      async getHistory() {
        try {
          const data = await import_async_storage2.default.getItem(TIMELINE_KEY);
          return data ? JSON.parse(data) : [];
        } catch (error) {
          if (__DEV__) {
            console.error("[TimelineService] Erro ao buscar hist\xF3rico:", error);
          }
          return [];
        }
      }
    };
    TimelineService_default = new TimelineService();
  }
});

// services/AchievementService.js
var import_async_storage3, ACHIEVEMENTS_KEY, XP_KEY, AchievementService, AchievementService_default;
var init_AchievementService = __esm({
  "services/AchievementService.js"() {
    import_async_storage3 = __toESM(require("@react-native-async-storage/async-storage"));
    ACHIEVEMENTS_KEY = "@vigilaro_achievements";
    XP_KEY = "@vigilaro_xp";
    AchievementService = class {
      constructor() {
        this.onShowToast = null;
        this.levels = [
          { minXp: 0, name: "Vizinho Atento" },
          { minXp: 100, name: "Protetor Iniciante" },
          { minXp: 300, name: "Guardi\xE3o da Fam\xEDlia" },
          { minXp: 600, name: "Mestre da Seguran\xE7a" },
          { minXp: 1e3, name: "Sentinela Imbat\xEDvel" }
        ];
      }
      /**
       * Registra o listener do App.js para exibir o componente AchievementToast
       */
      setToastCallback(callback) {
        this.onShowToast = callback;
      }
      async getXp() {
        const val = await import_async_storage3.default.getItem(XP_KEY);
        return val ? parseInt(val, 10) : 0;
      }
      /**
       * Adiciona XP e verifica se houve Level Up
       */
      async addXp(amount, label) {
        try {
          const currentXp = await this.getXp();
          const newXp = currentXp + amount;
          await import_async_storage3.default.setItem(XP_KEY, newXp.toString());
          const oldLevel = this.getLevel(currentXp);
          const newLevel = this.getLevel(newXp);
          if (newLevel.name !== oldLevel.name) {
            if (this.onShowToast) {
              this.onShowToast({
                levelUp: true,
                newLevel,
                actionLabel: label,
                xpGained: amount
              });
            }
          } else {
            if (this.onShowToast) {
              this.onShowToast({
                levelUp: false,
                xpGained: amount,
                actionLabel: label
              });
            }
          }
        } catch (error) {
          if (__DEV__) {
            console.error("[AchievementService] Erro ao adicionar XP:", error);
          }
        }
      }
      getLevel(xp) {
        let current = this.levels[0];
        for (const lvl of this.levels) {
          if (xp >= lvl.minXp) {
            current = lvl;
          } else {
            break;
          }
        }
        return current;
      }
      // --- Gatilhos de Conquistas ---
      async grantChecklistPoint() {
        await this.addXp(5, "Item de Seguran\xE7a Validado");
      }
      async grantFirstInspection() {
        const key = "achievement_first_inspection";
        if (!await this.hasAchievement(key)) {
          await this.addXp(50, "Primeira Vistoria Conclu\xEDda!");
          await this.markAchievement(key);
        }
      }
      async grantReportExport() {
        await this.addXp(25, "Relat\xF3rio de Seguran\xE7a Gerado");
      }
      async hasAchievement(key) {
        try {
          const data = await import_async_storage3.default.getItem(ACHIEVEMENTS_KEY);
          const achievements = data ? JSON.parse(data) : {};
          return !!achievements[key];
        } catch (e) {
          return false;
        }
      }
      async markAchievement(key) {
        try {
          const data = await import_async_storage3.default.getItem(ACHIEVEMENTS_KEY);
          const achievements = data ? JSON.parse(data) : {};
          achievements[key] = true;
          await import_async_storage3.default.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
        } catch (e) {
        }
      }
    };
    AchievementService_default = new AchievementService();
  }
});

// services/ChecklistService.js
var ChecklistService_exports = {};
__export(ChecklistService_exports, {
  ChecklistService: () => ChecklistService,
  default: () => ChecklistService_default
});
var import_async_storage4, STORAGE_KEY_PREFIX, stateCache, _FilterEngine, normalizeString, ChecklistService, ChecklistService_default;
var init_ChecklistService = __esm({
  "services/ChecklistService.js"() {
    import_async_storage4 = __toESM(require("@react-native-async-storage/async-storage"));
    init_ProfileFilterEngine();
    init_TimelineService();
    init_AchievementService();
    STORAGE_KEY_PREFIX = "@checklist_state_";
    stateCache = {};
    _FilterEngine = null;
    normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    ChecklistService = {
      /**
       * Retorna os perfis que declaram USAR um cômodo específico.
       * Fundamento do RiskInterpreter (D4) — permite priorizar riscos
       * por contexto humano (ex: idosa Maria usa quarto X com escada).
       *
       * IMPORTANTE: este helper depende do schema v2 (comodosUsados[]).
       * Perfis pré-migração têm comodosUsados preenchido pela
       * ProfileService.migrateProfilesV2 com todos os cômodos do mapping.
       *
       * @param {string} roomId - id do cômodo (ex: 'cozinha', 'quarto_idoso')
       * @returns {Promise<Array>} Lista de perfis que usam o cômodo
       */
      getResidentsOfRoom: async (roomId) => {
        if (!roomId) return [];
        const ProfileService2 = (init_ProfileService(), __toCommonJS(ProfileService_exports)).default;
        const perfis = await ProfileService2.getPerfis();
        return perfis.filter((p) => Array.isArray(p.comodosUsados) && p.comodosUsados.includes(roomId));
      },
      // Helper para obter todos os itens de um ambiente em uma lista plana
      getFlattenedItems: (roomId) => {
        const { CHECKLISTS: CHECKLISTS2 } = (init_mapeamento_dados(), __toCommonJS(mapeamento_dados_exports));
        const data = CHECKLISTS2[roomId];
        if (!data || !data.categorias) return [];
        let flat = [];
        data.categorias.forEach((cat) => {
          if (cat.itens) {
            cat.itens.forEach((item) => {
              flat.push({
                ...item,
                text: item.titulo,
                // Alias para compatibilidade
                category: cat.nome
              });
            });
          }
        });
        return flat;
      },
      // Helper para gerar chave baseada na residência
      getStorageKey: async (residenceId) => {
        const ProfileService2 = (init_ProfileService(), __toCommonJS(ProfileService_exports)).default;
        const id = residenceId || await ProfileService2.getActiveResidenceId();
        return `${STORAGE_KEY_PREFIX}${id}`;
      },
      // Limpa o cache em memória (usado para reset)
      clearCache: () => {
        stateCache = {};
        console.log("ChecklistService cache cleared.");
      },
      // Salva o estado de um item específico
      saveItemState: async (areaId, itemTitulo, isChecked, residenceId = null) => {
        try {
          const key = await ChecklistService.getStorageKey(residenceId);
          if (!stateCache[key]) {
            await ChecklistService.getAllState(residenceId);
          }
          const currentData = stateCache[key] || {};
          if (!currentData[areaId]) {
            currentData[areaId] = {};
          }
          currentData[areaId][itemTitulo] = isChecked;
          if (isChecked === true) {
            TimelineService_default.logMelhoria(areaId, itemTitulo);
            AchievementService_default.grantChecklistPoint();
            AchievementService_default.grantFirstInspection();
          }
          stateCache[key] = currentData;
          await import_async_storage4.default.setItem(key, JSON.stringify(currentData));
          await import_async_storage4.default.setItem("@vigilaro_last_check", (/* @__PURE__ */ new Date()).toISOString());
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("CRITICAL ERROR saveItemState:", error);
          }
          return false;
        }
      },
      // Retorna a data da última verificação feita pelo usuário
      getLastCheckDate: async () => {
        try {
          const iso = await import_async_storage4.default.getItem("@vigilaro_last_check");
          return iso ? new Date(iso) : null;
        } catch {
          return null;
        }
      },
      // Recupera todo o estado do checklist da residência ATIVA (ou da informada)
      getAllState: async (residenceId = null) => {
        try {
          const key = await ChecklistService.getStorageKey(residenceId);
          let json = await import_async_storage4.default.getItem(key);
          if (!json) {
            const legacyJson = await import_async_storage4.default.getItem("checklistItems");
            if (legacyJson) {
              console.log("[ChecklistService] Migrando dados legados para chave por resid\xEAncia:", key);
              await import_async_storage4.default.setItem(key, legacyJson);
              await import_async_storage4.default.removeItem("checklistItems");
              json = legacyJson;
            }
          }
          const data = json ? JSON.parse(json) : {};
          stateCache[key] = data;
          return data;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao ler checklist:", error);
          }
          return {};
        }
      },
      // Salva o array de itens de uma área (substitui a área inteira)
      saveRoomState: async (areaId, itemsArray, residenceId = null) => {
        try {
          const key = await ChecklistService.getStorageKey(residenceId);
          if (!stateCache[key]) {
            await ChecklistService.getAllState(residenceId);
          }
          const currentData = stateCache[key] || {};
          currentData[areaId] = itemsArray;
          stateCache[key] = currentData;
          await import_async_storage4.default.setItem(key, JSON.stringify(currentData));
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao salvar estado do ambiente:", error);
          }
          return false;
        }
      },
      // Apaga todos os dados de checklist de uma residência específica
      clearResidenceData: async (residenceId = null) => {
        try {
          const key = await ChecklistService.getStorageKey(residenceId);
          await import_async_storage4.default.removeItem(key);
          delete stateCache[key];
          console.log("[ChecklistService] Dados da resid\xEAncia apagados:", key);
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao apagar dados da resid\xEAncia:", error);
          }
          return false;
        }
      },
      // Retorna o estado de um ambiente específico
      getRoomState: async (areaId, residenceId = null) => {
        const allState = await ChecklistService.getAllState(residenceId);
        return allState[areaId] || {};
      },
      // Calcula o progresso de PREENCHIMENTO de uma área específica
      getAreaProgress: async (areaId, totalItems, residenceId = null) => {
        const allState = await ChecklistService.getAllState(residenceId);
        const areaData = allState[areaId];
        let answeredCount = 0;
        if (Array.isArray(areaData)) {
          answeredCount = areaData.filter(
            (i) => i.status === "conforme" || i.status === "risco" || i.status === "na" || i.checked === true
            // Legacy compat
          ).length;
        } else if (areaData && typeof areaData === "object") {
          answeredCount = Object.values(areaData).filter((val) => val !== null && val !== void 0).length;
        }
        const percentage = totalItems > 0 ? Math.round(answeredCount / totalItems * 100) : 0;
        return {
          checked: answeredCount,
          total: totalItems,
          percentage: Math.min(percentage, 100)
          // Cap at 100
        };
      },
      // Obter checklist filtrado pelo briefing
      getFilteredChecklist: (fullChecklist, briefing) => {
        if (!briefing) return fullChecklist;
        return fullChecklist.map((area) => {
          const filteredItems = area.itens.filter((item) => {
            if (!item.tags || item.tags.length === 0) return true;
            const hasMatchingFeature = item.tags.some(
              (tag) => briefing.caracteristicas.includes(tag) || briefing.tipo === tag
            );
            return hasMatchingFeature;
          });
          return { ...area, itens: filteredItems };
        }).filter((area) => area.itens.length > 0);
      },
      getAreaStats: (areaId, areaData = {}, structure = null, profiles = [], moradia = null) => {
        if (!_FilterEngine) _FilterEngine = (init_ProfileFilterEngine(), __toCommonJS(ProfileFilterEngine_exports));
        let stats = { checked: 0, na: 0, total: 0, warning: 0, critical: 0, failedItems: [] };
        let items = [];
        if (structure && structure.categorias) structure.categorias.forEach((cat) => {
          if (cat.itens) items = [...items, ...cat.itens];
        });
        else if (Array.isArray(areaData) && areaData.length > 0) items = areaData;
        else if (areaData && typeof areaData === "object" && !Array.isArray(areaData) && Object.keys(areaData).length > 0) {
          items = Object.keys(areaData).map((k) => ({ titulo: k, status: areaData[k] }));
        } else return stats;
        const areaDataMap = {};
        const isArrayData = Array.isArray(areaData);
        if (isArrayData) areaData.forEach((i) => {
          if (i.text || i.titulo) areaDataMap[normalizeString(i.text || i.titulo)] = i;
        });
        items.forEach((schemaItem) => {
          if (!_FilterEngine.isItemRelevant(schemaItem, profiles, moradia)) return;
          const itemKey = schemaItem.titulo || schemaItem.text;
          let found = isArrayData ? areaDataMap[normalizeString(itemKey)] : areaData[itemKey] !== void 0 ? { status: areaData[itemKey] === "na" ? "na" : areaData[itemKey] === true ? "conforme" : "pendente", checked: areaData[itemKey] === true } : null;
          let isChecked = found && (found.status === "conforme" || found.checked);
          let isNA = found && found.status === "na";
          if (isNA) {
            stats.na++;
            return;
          }
          stats.total++;
          if (isChecked) {
            stats.checked++;
          } else {
            const isCrit = schemaItem.tipo === "perigo";
            isCrit ? stats.critical++ : stats.warning++;
            stats.failedItems.push({ titulo: schemaItem.titulo || schemaItem.text, isCritical: isCrit, dica: schemaItem.dica_seguranca || "" });
          }
        });
        return stats;
      },
      // Calcula a pontuação global de segurança da casa
      // Retorna estatísticas detalhadas (Verde, Amarelo, Vermelho)
      // ACTUALIZADO: Aceita { moradia, profiles, mapping } ou (allAreasDefinition, residenceId, mapping) legado
      getGlobalSafetyBreakdown: async (allAreasDefinition, residenceId = null, mapping = [], moradia = null, profiles = []) => {
        const allState = await ChecklistService.getAllState(residenceId);
        const { CHECKLISTS: CHECKLISTS2 } = (init_mapeamento_dados(), __toCommonJS(mapeamento_dados_exports));
        const { isAreaRelevant: isAreaRelevant2 } = (init_ProfileFilterEngine(), __toCommonJS(ProfileFilterEngine_exports));
        let stats = {
          safe: 0,
          // Checked (Verde)
          warning: 0,
          // Unchecked Normal/Sugestão (Amarelo)
          critical: 0,
          // Unchecked Perigo (Vermelho)
          total: 0,
          percentage: 0
        };
        allAreasDefinition.forEach((area) => {
          const relevant = isAreaRelevant2(area, moradia, profiles, mapping);
          if (relevant) {
            const areaData = allState[area.id] || {};
            const structure = CHECKLISTS2[area.id];
            const areaStats = ChecklistService.getAreaStats(area.id, areaData, structure, profiles, moradia);
            stats.total += areaStats.total;
            stats.safe += areaStats.checked;
            stats.warning += areaStats.warning;
            stats.critical += areaStats.critical;
          }
        });
        stats.percentage = stats.total > 0 ? Math.round(stats.safe / stats.total * 100) : 0;
        return stats;
      },
      // Calcula a pontuação global de segurança da casa
      getGlobalSafetyScore: async (allAreasDefinition, residenceId = null, mapping = []) => {
        const stats = await ChecklistService.getGlobalSafetyBreakdown(allAreasDefinition, residenceId, mapping);
        return stats.percentage;
      },
      // Reseta todo o checklist (para nova auditoria)
      resetChecklist: async (residenceId = null) => {
        try {
          const key = await ChecklistService.getStorageKey(residenceId);
          await import_async_storage4.default.removeItem(key);
          delete stateCache[key];
          return true;
        } catch (error) {
          return false;
        }
      }
    };
    ChecklistService_default = ChecklistService;
  }
});

// services/GamificationService.js
var GamificationService_exports = {};
__export(GamificationService_exports, {
  default: () => GamificationService_default
});
var import_async_storage5, XP_KEY2, HISTORY_KEY, LEVELS, ACTIONS, MAX_HISTORY_ITEMS, GamificationService, GamificationService_default;
var init_GamificationService = __esm({
  "services/GamificationService.js"() {
    import_async_storage5 = __toESM(require("@react-native-async-storage/async-storage"));
    XP_KEY2 = "@vigilaro_xp";
    HISTORY_KEY = "@vigilaro_xp_history";
    LEVELS = [
      { level: 1, name: "Iniciante", minXP: 0, maxXP: 200 },
      { level: 2, name: "Atento", minXP: 201, maxXP: 500 },
      { level: 3, name: "Protetor", minXP: 501, maxXP: 1e3 },
      { level: 4, name: "Guardi\xE3o", minXP: 1001, maxXP: 2e3 },
      { level: 5, name: "Mestre da Seguran\xE7a", minXP: 2001, maxXP: 999999 }
    ];
    ACTIONS = {
      CHECKLIST_COMPLETE: { xp: 50, label: "Checklist Completo" },
      READ_GUIDE: { xp: 20, label: "Leitura de Guia" },
      USE_SCANNER: { xp: 30, label: "Scanner IA" },
      PROFILE_COMPLETE: { xp: 100, label: "Perfil Completo" },
      VACCINE_SCAN: { xp: 50, label: "Vacina Escaneada" }
    };
    MAX_HISTORY_ITEMS = 50;
    GamificationService = class {
      constructor() {
        this.listeners = [];
        this.currentXP = 0;
        this.history = [];
        this.toastListener = null;
        this.initPromise = this.init();
      }
      async init() {
        try {
          const [xp, history] = await Promise.all([
            import_async_storage5.default.getItem(XP_KEY2),
            import_async_storage5.default.getItem(HISTORY_KEY)
          ]);
          this.currentXP = xp ? parseInt(xp, 10) : 0;
          this.history = history ? JSON.parse(history) : [];
          this.notifyListeners();
        } catch (e) {
          if (__DEV__) {
            console.error("Error init Gamification:", e);
          }
        }
      }
      getLevel(xp = this.currentXP) {
        return LEVELS.find((l) => xp >= l.minXP && xp <= l.maxXP) || LEVELS[LEVELS.length - 1];
      }
      getNextLevel(xp = this.currentXP) {
        return LEVELS.find((l) => l.level === this.getLevel(xp).level + 1);
      }
      getProgress() {
        const cl = this.getLevel(), nl = this.getNextLevel();
        if (!nl) return 1;
        const range = cl.maxXP - cl.minXP;
        return range <= 0 ? 1 : Math.min(Math.max((this.currentXP - cl.minXP) / range, 0), 1);
      }
      setToastListener(l) {
        this.toastListener = l;
      }
      async addPoints(actionKey) {
        await this.initPromise;
        const action = ACTIONS[actionKey];
        if (!action) return null;
        const oldLevel = this.getLevel();
        this.currentXP += action.xp;
        const newLevel = this.getLevel();
        this.history.unshift({ id: Date.now().toString(), action: action.label, xp: action.xp, date: (/* @__PURE__ */ new Date()).toISOString() });
        if (this.history.length > MAX_HISTORY_ITEMS) this.history = this.history.slice(0, MAX_HISTORY_ITEMS);
        this.save();
        this.notifyListeners();
        const result = { xpGained: action.xp, newTotal: this.currentXP, levelUp: newLevel.level > oldLevel.level, newLevel, actionLabel: action.label };
        if (this.toastListener) this.toastListener(result);
        return result;
      }
      async save() {
        try {
          await Promise.all([
            import_async_storage5.default.setItem(XP_KEY2, this.currentXP.toString()),
            import_async_storage5.default.setItem(HISTORY_KEY, JSON.stringify(this.history))
          ]);
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving Gamification:", e);
          }
        }
      }
      subscribe(listener) {
        this.listeners.push(listener);
        listener({ xp: this.currentXP, level: this.getLevel() });
        return () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        };
      }
      notifyListeners() {
        const state = { xp: this.currentXP, level: this.getLevel(), history: this.history };
        this.listeners.forEach((l) => l(state));
      }
      getActions() {
        return ACTIONS;
      }
    };
    GamificationService_default = new GamificationService();
  }
});

// services/KitService.js
var KitService_exports = {};
__export(KitService_exports, {
  default: () => KitService_default
});
var import_async_storage6, KitService, KitService_default;
var init_KitService = __esm({
  "services/KitService.js"() {
    import_async_storage6 = __toESM(require("@react-native-async-storage/async-storage"));
    KitService = {
      /**
       * Carrega o estado dos itens marcados de um kit específico para uma residência.
       * @param {string} kitId - ID do kit (ex: 'remedios', 'socorros')
       * @param {string} residenceId - ID da residência do perfil ativo
       * @returns {Promise<Array<string>>} Array de IDs dos itens marcados
       */
      async loadKitState(kitId, residenceId) {
        try {
          const scope = residenceId || "global";
          const key = `@kit_state_${scope}_${kitId}`;
          const stored = await import_async_storage6.default.getItem(key);
          return stored ? JSON.parse(stored) : [];
        } catch (error) {
          if (__DEV__) {
            console.error(`Failed to load kit state for ${kitId}:`, error);
          }
          return [];
        }
      },
      /**
       * Salva o estado dos itens marcados.
       * @param {string} kitId 
       * @param {string} residenceId 
       * @param {Array<string>} items - Array de IDs marcados
       */
      async saveKitState(kitId, residenceId, items) {
        try {
          const scope = residenceId || "global";
          const key = `@kit_state_${scope}_${kitId}`;
          await import_async_storage6.default.setItem(key, JSON.stringify(items));
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error(`Failed to save kit state for ${kitId}:`, error);
          }
          return false;
        }
      },
      /**
       * Limpa o estado de um kit.
       */
      async clearKitState(kitId, residenceId) {
        try {
          const scope = residenceId || "global";
          const key = `@kit_state_${scope}_${kitId}`;
          await import_async_storage6.default.removeItem(key);
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error(error);
          }
          return false;
        }
      },
      /**
       * Calcula o progresso global dos kits (opcional/stub).
       * Como não temos a definição total dos kits aqui, retornamos 0 por enquanto
       * ou implementamos a lógica se tivermos os dados brutos.
       */
      async getGlobalKitsProgress(residenceId) {
        return 0;
      }
    };
    KitService_default = KitService;
  }
});

// services/ProfileService.js
var ProfileService_exports = {};
__export(ProfileService_exports, {
  default: () => ProfileService_default
});
var import_async_storage7, FileSystem, ProfileService, ProfileService_default;
var init_ProfileService = __esm({
  "services/ProfileService.js"() {
    import_async_storage7 = __toESM(require("@react-native-async-storage/async-storage"));
    FileSystem = __toESM(require("expo-file-system/legacy"));
    init_LegacyMigrationService();
    init_ProfileModels();
    init_areas_internas();
    init_areas_externas();
    ProfileService = class {
      /**
       * Carrega todos os dados do Vigilaro.
       * Se não existir, retorna estrutura padrão.
       * Se existir dados antigos, faz migração.
       */
      static async getData() {
        try {
          const dataJson = await import_async_storage7.default.getItem(VIGILARO_DATA_KEY);
          if (dataJson) {
            return JSON.parse(dataJson);
          }
          const needsMigration = await LegacyMigrationService_default.checkNeedsMigration();
          if (needsMigration) {
            return await LegacyMigrationService_default.migrateFromLegacy();
          }
          return getDefaultData();
        } catch (error) {
          if (__DEV__) {
            console.error("ProfileService.getData error:", error);
          }
          return getDefaultData();
        }
      }
      /**
       * Salva todos os dados do Vigilaro.
       */
      static async saveData(data) {
        try {
          data.dataAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
          await import_async_storage7.default.setItem(VIGILARO_DATA_KEY, JSON.stringify(data));
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("ProfileService.saveData error:", error);
          }
          return false;
        }
      }
      /**
       * Persiste uma imagem do cache temporário para o documentDirectory.
       * Retorna apenas o NOME do arquivo para persistência no AsyncStorage (caminho relativo).
       * @param {string} tempUri - URI temporária vinda do ImagePicker
       * @param {string} prefix - Prefixo para o nome do arquivo (ex: 'profile', 'med')
       */
      static async persistImage(tempUri, prefix = "img") {
        if (!tempUri) return null;
        if (!tempUri.includes("/") && !tempUri.includes("://")) {
          return tempUri;
        }
        if (tempUri.includes(FileSystem.documentDirectory)) {
          return tempUri.split("/").pop();
        }
        try {
          const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
          const ext = tempUri.split(".").pop()?.split("?")[0] || "jpg";
          const fileName = `${prefix}_${uniqueId}.${ext}`;
          const permanentUri = FileSystem.documentDirectory + fileName;
          await FileSystem.copyAsync({ from: tempUri, to: permanentUri });
          return fileName;
        } catch (error) {
          if (__DEV__) {
            console.error("ProfileService.persistImage error:", error);
          }
          return tempUri;
        }
      }
      /**
       * Resolve um nome de arquivo ou URI salva para uma URI completa utilizável pela UI.
       *
       * FIX #4: Adicionado tratamento para URIs com prefixo file://
       * FIX #5: Método é idempotente — se a URI já estiver resolvida (contém documentDirectory),
       *         retorna sem modificação, evitando duplicação de path.
       */
      static resolveImageUri(uri) {
        if (!uri) return null;
        if (uri.startsWith("http") || uri.startsWith("content://") || uri.startsWith("assets-library://")) {
          return uri;
        }
        if (uri.startsWith("file://")) {
          return uri;
        }
        if (uri.includes(FileSystem.documentDirectory)) {
          return uri;
        }
        if (uri.includes("DocumentPicker") || uri.includes("/Documents/")) {
          const fileName = uri.split("/").pop();
          return FileSystem.documentDirectory + fileName;
        }
        if (!uri.includes("/") && !uri.includes("://")) {
          return FileSystem.documentDirectory + uri;
        }
        return uri;
      }
      // ==========================================
      // GESTÃO DE RESIDÊNCIAS (Multi-Home)
      // ==========================================
      static async getResidences() {
        const data = await this.getData();
        if (!data.residences || data.residences.length === 0) {
          const initialResidence = {
            id: "default_home",
            nome: "Minha Casa Principal",
            moradia: data.moradia || {},
            mapping: [],
            checklists: {},
            foto: null
          };
          data.residences = [initialResidence];
          data.activeResidenceId = "default_home";
          await this.saveData(data);
        }
        return data.residences.map((r) => ({ ...r, foto: this.resolveImageUri(r.foto) }));
      }
      static async getActiveResidenceId() {
        const data = await this.getData();
        return data.activeResidenceId || "default_home";
      }
      /**
       * FIX #1: Retorna o objeto COMPLETO da residência ativa.
       * Usado por OndeProtegerScreen e NewHomeWizardScreenNeo para obter
       * mapping, moradia e outros dados em uma única chamada.
       */
      static async getActiveResidence() {
        const data = await this.getData();
        if (!data.residences || data.residences.length === 0) {
          await this.getResidences();
          return await this.getActiveResidence();
        }
        const activeId = data.activeResidenceId || "default_home";
        const activeRes = data.residences.find((r) => r.id === activeId) || data.residences[0];
        if (!activeRes) return null;
        return { ...activeRes, foto: this.resolveImageUri(activeRes.foto) };
      }
      static async getActiveResidenceName() {
        const data = await this.getData();
        const activeId = data.activeResidenceId || "default_home";
        const res = data.residences?.find((r) => r.id === activeId);
        return res ? res.nome : "Minha Casa";
      }
      static async setActiveResidence(residenceId) {
        const data = await this.getData();
        const exists = data.residences?.find((r) => r.id === residenceId);
        if (exists) {
          data.activeResidenceId = residenceId;
          await this.saveData(data);
          return true;
        }
        return false;
      }
      static async addResidence(nome) {
        const data = await this.getData();
        if (!data.residences) {
          data.residences = await this.getResidences();
        }
        const newId = Date.now().toString();
        const newResidence = {
          id: newId,
          nome,
          moradia: {},
          mapping: [],
          checklists: {},
          foto: null,
          dataCriacao: (/* @__PURE__ */ new Date()).toISOString()
        };
        data.residences.push(newResidence);
        data.activeResidenceId = newId;
        await this.saveData(data);
        return newResidence;
      }
      /**
       * Remove uma residência. Não permite remover se for a única.
       */
      static async removeResidence(residenceId) {
        const data = await this.getData();
        if (!data.residences || data.residences.length <= 1) return false;
        data.residences = data.residences.filter((r) => r.id !== residenceId);
        if (data.activeResidenceId === residenceId) {
          data.activeResidenceId = data.residences[0].id;
        }
        return await this.saveData(data);
      }
      /**
       * Atualiza o nome de uma residência.
       */
      static async updateResidenceName(residenceId, newName) {
        const data = await this.getData();
        if (!data.residences) return false;
        const index = data.residences.findIndex((r) => r.id === residenceId);
        if (index !== -1) {
          data.residences[index].nome = newName;
          data.residences[index].ultimaAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
          return await this.saveData(data);
        }
        return false;
      }
      /**
       * Atualiza a foto de uma residência.
       */
      static async updateResidencePhoto(residenceId, photoUri) {
        if (!photoUri) return false;
        const data = await this.getData();
        if (!data.residences) return false;
        const index = data.residences.findIndex((r) => r.id === residenceId);
        if (index !== -1) {
          try {
            const persistentName = await this.persistImage(photoUri, `home_${residenceId}`);
            data.residences[index].foto = persistentName;
            data.residences[index].ultimaAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
            return await this.saveData(data);
          } catch (e) {
            if (__DEV__) {
              console.error("updateResidencePhoto error:", e);
            }
            return false;
          }
        }
        return false;
      }
      // ==========================================
      // MÉTODOS DE ACESSO (Context-Aware)
      // ==========================================
      /**
       * Retorna a moradia da residência ATIVA.
       */
      static async getMoradia() {
        const data = await this.getData();
        if (!data.residences) {
          return data.moradia || {};
        }
        const activeId = data.activeResidenceId || "default_home";
        const activeRes = data.residences?.find((r) => r.id === activeId) || data.residences?.[0];
        return activeRes ? activeRes.moradia || {} : {};
      }
      /**
       * Salva dados da moradia na residência ATIVA.
       */
      static async saveMoradia(moradiaData) {
        const data = await this.getData();
        if (!data.residences) {
          data.residences = await this.getResidences();
        }
        const activeId = data.activeResidenceId || "default_home";
        const index = data.residences.findIndex((r) => r.id === activeId);
        if (index !== -1) {
          const currentMoradia = data.residences[index].moradia || {};
          let newEstrutura = currentMoradia.estrutura || {};
          if (moradiaData.estrutura) {
            newEstrutura = { ...newEstrutura, ...moradiaData.estrutura };
          }
          data.residences[index].moradia = {
            ...currentMoradia,
            ...moradiaData,
            estrutura: newEstrutura,
            ultimaAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
          };
          data.moradia = { ...data.moradia, ...moradiaData };
          return await this.saveData(data);
        }
        return false;
      }
      /**
       * Migração V2 — adiciona campo `comodosUsados` em perfis legados.
       *
       * Idempotente: roda só uma vez, marca flag `@vigilaro/schema_v2_migrated`.
       *
       * Estratégia conservadora: perfis sem o campo recebem `comodosUsados`
       * = todos os cômodos do mapping atual. Mantém o comportamento atual
       * (cômodos do mapping aparecem na vistoria pra todos), e o usuário
       * pode refinar depois via Hub "Seu mapa sensível" (D6).
       *
       * @returns {Promise<{migrated: number, skipped: boolean}>}
       */
      static async migrateProfilesV2() {
        const FLAG_KEY = "@vigilaro/schema_v2_migrated";
        try {
          const alreadyDone = await import_async_storage7.default.getItem(FLAG_KEY);
          if (alreadyDone === "1") {
            return { migrated: 0, skipped: true };
          }
          const data = await this.getData();
          if (!data.perfis || data.perfis.length === 0) {
            await import_async_storage7.default.setItem(FLAG_KEY, "1");
            return { migrated: 0, skipped: true };
          }
          const mapping = await this.getMapping();
          const allRoomIds = Array.isArray(mapping) ? mapping.map((m) => typeof m === "string" ? m : m?.id).filter(Boolean) : [];
          let migratedCount = 0;
          for (const p of data.perfis) {
            if (!Array.isArray(p.comodosUsados)) {
              p.comodosUsados = [...allRoomIds];
              p.schemaVersion = 2;
              p.dataAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
              migratedCount += 1;
            }
          }
          if (migratedCount > 0) {
            await this.saveData(data);
          }
          await import_async_storage7.default.setItem(FLAG_KEY, "1");
          if (__DEV__) {
            console.log(
              `[ProfileService] migrateProfilesV2: ${migratedCount} perfil(is) migrado(s) com ${allRoomIds.length} c\xF4modo(s) padr\xE3o.`
            );
          }
          return { migrated: migratedCount, skipped: false };
        } catch (error) {
          if (__DEV__) {
            console.error("[ProfileService.migrateProfilesV2] erro:", error);
          }
          return { migrated: 0, skipped: false, error: error?.message };
        }
      }
      /**
       * Retorna TODOS os perfis (global), sem resolução dupla de URI.
       *
       * FIX #5: resolveImageUri aplicado apenas aqui, uma única vez.
       * getPerfis() filtra a partir desta lista já resolvida.
       */
      static async getAllPerfis() {
        const data = await this.getData();
        const perfis = data.perfis || [];
        return perfis.map((p) => ({ ...p, foto: this.resolveImageUri(p.foto) }));
      }
      /**
       * Retorna os perfis da residência ATIVA.
       *
       * FIX #5: Usa getAllPerfis() como fonte (já com URI resolvida),
       * evitando dupla resolução de foto.
       */
      static async getPerfis() {
        const todos = await this.getAllPerfis();
        const data = await this.getData();
        const activeId = await this.getActiveResidenceId();
        const activeRes = data.residences?.find((r) => r.id === activeId);
        let result = [];
        if (activeRes) {
          const habitantes = activeRes.moradia?.habitantes || [];
          const frequentadores = activeRes.moradia?.frequentadores || [];
          if (habitantes.length > 0 || frequentadores.length > 0) {
            result = todos.filter((p) => habitantes.includes(p.id) || frequentadores.includes(p.id)).map((p) => ({
              ...p,
              isVisitante: frequentadores.includes(p.id) && !habitantes.includes(p.id)
            }));
          } else if (todos.length > 0 && activeId === "default_home" && (!data.residences || data.residences.length <= 1)) {
            const resIndex = data.residences.findIndex((r) => r.id === activeId);
            if (resIndex !== -1) {
              if (!data.residences[resIndex].moradia) {
                data.residences[resIndex].moradia = {};
              }
              data.residences[resIndex].moradia.habitantes = todos.map((p) => p.id);
              await this.saveData(data);
              if (__DEV__) console.log("[ProfileService] Auto-repair: vinculou", todos.length, "perfis \xF3rf\xE3os \xE0 casa ativa");
            }
            result = todos.map((p) => ({ ...p, isVisitante: false }));
          }
        } else {
          result = todos;
        }
        return result;
      }
      /**
       * Retorna apenas perfis humanos da casa ativa.
       */
      static async getPerfisHumanos() {
        const perfis = await this.getPerfis();
        return perfis.filter((p) => p.tipo === "humano");
      }
      /**
       * Retorna apenas pets da casa ativa.
       */
      static async getPets() {
        const perfis = await this.getPerfis();
        return perfis.filter((p) => p.tipo === "pet");
      }
      /**
       * Retorna o perfil ativo.
       */
      static async getPerfilAtivo() {
        const perfis = await this.getPerfis();
        return perfis.find((p) => p.ativo) || perfis[0] || null;
      }
      static async getPrimaryProfile() {
        return this.getPerfilAtivo();
      }
      /**
       * Retorna o próximo perfil pendente (criado pelo briefing mas não preenchido).
       */
      static async getNextPendingProfile() {
        const data = await this.getData();
        if (!data.perfis) return null;
        return data.perfis.find((p) => p.pendente === true) || null;
      }
      /**
       * Verifica se ainda há perfis pendentes.
       */
      static async hasPendingProfiles() {
        const pending = await this.getNextPendingProfile();
        return !!pending;
      }
      /**
       * Define o perfil ativo pelo ID.
       */
      static async setPerfilAtivo(perfilId) {
        const data = await this.getData();
        data.perfis = data.perfis.map((p) => ({ ...p, ativo: p.id === perfilId }));
        return await this.saveData(data);
      }
      /**
       * FIX #2: Alias de setPerfilAtivo para compatibilidade com NewHomeWizardScreenNeo
       * e outros locais que chamam setActivePerfil().
       */
      static async setActivePerfil(perfilId) {
        return this.setPerfilAtivo(perfilId);
      }
      static async addPerfil(perfilData, tipo = "humano") {
        const data = await this.getData();
        const novoPerfil = { ...getDefaultProfile(tipo), ...perfilData };
        if (!data.perfis) data.perfis = [];
        if (data.perfis.length === 0) {
          novoPerfil.ativo = true;
        }
        data.perfis.push(novoPerfil);
        if (!data.residences || data.residences.length === 0) {
          data.residences = [{
            id: "default_home",
            nome: "Minha Casa Principal",
            moradia: { habitantes: [], frequentadores: [] },
            mapping: [],
            checklists: {},
            foto: null
          }];
          data.activeResidenceId = "default_home";
        }
        const activeId = data.activeResidenceId || "default_home";
        const resIndex = data.residences.findIndex((r) => r.id === activeId);
        if (resIndex !== -1) {
          if (!data.residences[resIndex].moradia) {
            data.residences[resIndex].moradia = {};
          }
          const vinculo = perfilData.vinculo === "frequentador" ? "frequentadores" : "habitantes";
          if (!Array.isArray(data.residences[resIndex].moradia[vinculo])) {
            data.residences[resIndex].moradia[vinculo] = [];
          }
          if (!data.residences[resIndex].moradia[vinculo].includes(novoPerfil.id)) {
            data.residences[resIndex].moradia[vinculo].push(novoPerfil.id);
          }
        }
        await this.saveData(data);
        return novoPerfil;
      }
      /**
       * Vincula um perfil existente à casa ativa (se ainda não estiver).
       */
      static async linkProfileToActiveResidence(perfilId) {
        const data = await this.getData();
        const activeId = data.activeResidenceId || "default_home";
        const resIndex = (data.residences || []).findIndex((r) => r.id === activeId);
        if (resIndex !== -1) {
          if (!data.residences[resIndex].moradia) {
            data.residences[resIndex].moradia = {};
          }
          if (!Array.isArray(data.residences[resIndex].moradia["habitantes"])) {
            data.residences[resIndex].moradia["habitantes"] = [];
          }
          if (!data.residences[resIndex].moradia["habitantes"].includes(perfilId)) {
            data.residences[resIndex].moradia["habitantes"].push(perfilId);
            await this.saveData(data);
            return true;
          }
        }
        return false;
      }
      /**
       * Desvincula um perfil da residência ATIVA (remove de habitantes
       * E frequentadores) — sem deletar o perfil global. O perfil continua
       * existindo e pode estar vinculado a outras residências.
       *
       * Use quando o usuário diz: "fulano NÃO mora nesta casa".
       */
      static async unlinkProfileFromActiveResidence(perfilId) {
        const data = await this.getData();
        const activeId = data.activeResidenceId || "default_home";
        const resIndex = (data.residences || []).findIndex((r) => r.id === activeId);
        if (resIndex !== -1) {
          if (!data.residences[resIndex].moradia) return false;
          const m = data.residences[resIndex].moradia;
          const hadHabitante = Array.isArray(m.habitantes) && m.habitantes.includes(perfilId);
          const hadFrequentador = Array.isArray(m.frequentadores) && m.frequentadores.includes(perfilId);
          if (Array.isArray(m.habitantes)) {
            m.habitantes = m.habitantes.filter((id) => id !== perfilId);
          }
          if (Array.isArray(m.frequentadores)) {
            m.frequentadores = m.frequentadores.filter((id) => id !== perfilId);
          }
          if (hadHabitante || hadFrequentador) {
            await this.saveData(data);
            return true;
          }
        }
        return false;
      }
      /**
       * Verifica se um perfil está vinculado à residência ATIVA
       * (como habitante OU frequentador). Útil pra exibir checkbox
       * "fulano mora aqui?" em telas de gestão de residências.
       *
       * @returns {Promise<boolean>}
       */
      static async isProfileLinkedToActiveResidence(perfilId) {
        const data = await this.getData();
        const activeId = data.activeResidenceId || "default_home";
        const activeRes = (data.residences || []).find((r) => r.id === activeId);
        if (!activeRes?.moradia) return false;
        const m = activeRes.moradia;
        return Array.isArray(m.habitantes) && m.habitantes.includes(perfilId) || Array.isArray(m.frequentadores) && m.frequentadores.includes(perfilId);
      }
      /**
       * Atualiza um perfil existente pelo ID.
       */
      static async updatePerfil(perfilId, updates) {
        const data = await this.getData();
        const index = data.perfis.findIndex((p) => p.id === perfilId);
        if (index !== -1) {
          data.perfis[index] = {
            ...data.perfis[index],
            ...updates,
            dataAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
          };
          await this.saveData(data);
          return data.perfis[index];
        }
        return null;
      }
      /**
       * Remove um perfil e limpa seus vínculos de todas as residências.
       */
      static async removePerfil(perfilId) {
        const data = await this.getData();
        data.perfis = data.perfis.filter((p) => p.id !== perfilId);
        if (!data.perfis.find((p) => p.ativo) && data.perfis.length > 0) {
          data.perfis[0].ativo = true;
        }
        if (data.residences) {
          data.residences = data.residences.map((residence) => {
            if (residence.moradia) {
              if (Array.isArray(residence.moradia.habitantes)) {
                residence.moradia.habitantes = residence.moradia.habitantes.filter(
                  (id) => id !== perfilId
                );
              }
              if (Array.isArray(residence.moradia.frequentadores)) {
                residence.moradia.frequentadores = residence.moradia.frequentadores.filter(
                  (id) => id !== perfilId
                );
              }
            }
            return residence;
          });
        }
        return await this.saveData(data);
      }
      /**
       * Verifica se o onboarding foi completo.
       */
      static async isOnboardingCompleto() {
        const data = await this.getData();
        return data.onboardingCompleto;
      }
      /**
       * Marca onboarding como completo.
       */
      static async setOnboardingCompleto() {
        const data = await this.getData();
        data.onboardingCompleto = true;
        return await this.saveData(data);
      }
      /**
       * Calcula idade a partir da data de nascimento.
       * Aceita formato ISO (YYYY-MM-DD) e legado BR (DD/MM/YYYY).
       */
      static calcularIdade(dataNascimento) {
        if (!dataNascimento) return null;
        let birthDate;
        if (dataNascimento.includes("-")) {
          birthDate = new Date(dataNascimento);
        } else if (dataNascimento.includes("/")) {
          const parts = dataNascimento.split("/");
          if (parts.length !== 3) return null;
          birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
          return null;
        }
        if (isNaN(birthDate.getTime())) return null;
        const today = /* @__PURE__ */ new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
          age--;
        }
        return age;
      }
      /**
       * Determina faixa etária baseada na idade calculada.
       *
       * FIX #3: Retorna o ID (string) diretamente em vez de um objeto,
       * para compatibilidade com comparações como:
       *   ProfileService.getFaixaEtaria(p.dataNascimento) === 'baby'
       *
       * Mapa de IDs:
       *   0-2 anos   → 'baby'
       *   3-11 anos  → 'child'
       *   12-17 anos → 'teen'
       *   18-59 anos → 'adult'
       *   60+ anos   → 'elderly'
       *
       * Para obter label e risco completos, use getFaixaEtariaDetalhada().
       */
      static getFaixaEtaria(dataNascimento) {
        const idade = this.calcularIdade(dataNascimento);
        if (idade === null) return null;
        if (idade < 3) return "baby";
        if (idade < 12) return "child";
        if (idade < 18) return "teen";
        if (idade < 60) return "adult";
        return "elderly";
      }
      /**
       * Retorna faixa etária detalhada com label e nível de risco.
       * Use quando precisar do objeto completo (ex: UI, relatórios).
       */
      static getFaixaEtariaDetalhada(dataNascimento) {
        const idade = this.calcularIdade(dataNascimento);
        if (idade === null) return null;
        if (idade < 1) return { id: "baby", label: "Beb\xEA (0-1 ano)", risco: "alto" };
        if (idade < 3) return { id: "baby", label: "Beb\xEA (1-3 anos)", risco: "alto" };
        if (idade < 6) return { id: "child", label: "Crian\xE7a pequena (3-6 anos)", risco: "alto" };
        if (idade < 12) return { id: "child", label: "Crian\xE7a (6-12 anos)", risco: "medio" };
        if (idade < 18) return { id: "teen", label: "Adolescente (12-18 anos)", risco: "baixo" };
        if (idade < 60) return { id: "adult", label: "Adulto (18-60 anos)", risco: "baixo" };
        if (idade < 80) return { id: "elderly", label: "Idoso (60-80 anos)", risco: "medio" };
        return { id: "elderly", label: "Idoso (80+ anos)", risco: "alto" };
      }
      // ==========================================
      // PREVENÇÃO INTELIGENTE
      // ==========================================
      /**
       * Analisa riscos baseados na moradia e nos perfis da residência ativa.
       * FIX #3: Atualizado para usar getFaixaEtariaDetalhada() onde o objeto é necessário
       * e getFaixaEtaria() (string) nas comparações simples.
       */
      static async analisarRiscos() {
        const moradia = await this.getMoradia();
        const perfis = await this.getPerfis();
        const riscos = [];
        if (moradia.caracteristicas?.includes("piscina")) {
          const criancasPequenas = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade < 6;
          });
          if (criancasPequenas.length > 0) {
            riscos.push({
              nivel: "CRITICO",
              titulo: "Piscina + Crian\xE7as Pequenas",
              descricao: `${criancasPequenas.length} crian\xE7a(s) pequena(s) em casa com piscina`,
              recomendacao: "Verifique: grades de prote\xE7\xE3o, alarme de piscina, supervis\xE3o constante",
              perfisAfetados: criancasPequenas.map((p) => p.nome)
            });
          }
        }
        if (moradia.caracteristicas?.includes("escadas") || moradia.andares > 1) {
          const vulneraveis = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && (idade < 5 || idade > 65);
          });
          if (vulneraveis.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Escadas + Pessoas Vulner\xE1veis",
              descricao: "Risco de queda para crian\xE7as pequenas e idosos",
              recomendacao: "Verifique: port\xF5es de seguran\xE7a, corrim\xE3os, ilumina\xE7\xE3o",
              perfisAfetados: vulneraveis.map((p) => p.nome)
            });
          }
        }
        if (moradia.caracteristicas?.includes("jardim")) {
          const pets2 = perfis.filter((p) => p.tipo === "pet");
          if (pets2.length > 0) {
            riscos.push({
              nivel: "MEDIO",
              titulo: "Jardim + Pets",
              descricao: "Poss\xEDveis plantas t\xF3xicas para animais",
              recomendacao: "Verifique: plantas t\xF3xicas, cercamento, produtos qu\xEDmicos de jardinagem",
              perfisAfetados: pets2.map((p) => p.nome)
            });
          }
        }
        if (moradia.utilidades === "gas_encanado" || moradia.utilidades === "botijao") {
          const idosos = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade > 65;
          });
          if (idosos.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "G\xE1s + Idosos",
              descricao: "Risco de esquecimento de fog\xE3o ligado",
              recomendacao: "Considere: detector de g\xE1s, fog\xE3o com desligamento autom\xE1tico, timer",
              perfisAfetados: idosos.map((p) => p.nome)
            });
          }
        }
        if (moradia.caracteristicas?.includes("varanda")) {
          const criancas = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade < 12;
          });
          if (criancas.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Varanda/Sacada + Crian\xE7as",
              descricao: "Risco de queda de altura",
              recomendacao: "Verifique: redes de prote\xE7\xE3o, altura do guarda-corpo, m\xF3veis que permitam escalar",
              perfisAfetados: criancas.map((p) => p.nome),
              icon: "resize-outline"
            });
          }
        }
        if (moradia.caracteristicas?.includes("lareira") || moradia.caracteristicas?.includes("churrasqueira")) {
          const criancasPequenas = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade < 6;
          });
          if (criancasPequenas.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Fogo Aberto + Crian\xE7as",
              descricao: "Risco de queimaduras por lareira ou churrasqueira",
              recomendacao: "Mantenha supervis\xE3o, use grades de prote\xE7\xE3o, ensine sobre o perigo",
              perfisAfetados: criancasPequenas.map((p) => p.nome),
              icon: "flame-outline"
            });
          }
        }
        const bebes = perfis.filter((p) => {
          const idade = this.calcularIdade(p.dataNascimento);
          return p.tipo === "humano" && idade !== null && idade < 2;
        });
        if (bebes.length > 0) {
          riscos.push({
            nivel: "CRITICO",
            titulo: "Prote\xE7\xE3o para Beb\xEAs",
            descricao: "Beb\xEAs exploram tudo! Verifique tomadas e pe\xE7as pequenas no ch\xE3o AGORA.",
            recomendacao: "Use protetores de tomada e travas de gaveta.",
            perfisAfetados: bebes.map((p) => p.nome),
            icon: "happy",
            color: "#E91E63"
          });
        }
        const idososSozinhos = perfis.filter((p) => {
          const idade = this.calcularIdade(p.dataNascimento);
          return p.tipo === "humano" && idade !== null && idade > 70;
        });
        if (idososSozinhos.length > 0 && perfis.filter((p) => p.tipo === "humano").length === 1) {
          riscos.push({
            nivel: "ALTO",
            titulo: "Apoio ao Idoso",
            descricao: "Mora sozinho? Configure o Bot\xE3o de P\xE2nico e cheque os tapetes.",
            recomendacao: "Evite tapetes soltos e instale barras de apoio.",
            perfisAfetados: idososSozinhos.map((p) => p.nome),
            icon: "heart",
            color: "#D32F2F"
          });
        }
        const pets = perfis.filter((p) => p.tipo === "pet");
        if (pets.length > 0) {
          riscos.push({
            nivel: "INFO",
            titulo: "Seguran\xE7a Pet",
            descricao: "Cuidado com plantas t\xF3xicas e acesso \xE0 rua.",
            recomendacao: "Mantenha port\xF5es fechados e produtos de limpeza no alto.",
            perfisAfetados: pets.map((p) => p.nome),
            icon: "paw",
            color: "#FF9800"
          });
        }
        const mes = (/* @__PURE__ */ new Date()).getMonth();
        if (mes >= 11 || mes <= 2) {
          riscos.push({
            nivel: "INFO",
            titulo: "Ver\xE3o e Chuvas",
            descricao: "Risco de dengue e tempestades. Limpe calhas e vasos hoje!",
            recomendacao: "Verifique telhados e elimine \xE1gua parada.",
            icon: "thunderstorm",
            color: "#1976D2"
          });
        }
        if (mes >= 5 && mes <= 7) {
          riscos.push({
            nivel: "ALTO",
            titulo: "Inverno Seguro",
            descricao: "Vai ligar aquecedor? Aten\xE7\xE3o \xE0 ventila\xE7\xE3o para evitar CO.",
            recomendacao: "Nunca durma com aquecedor a g\xE1s em quarto fechado.",
            icon: "snow",
            color: "#0288D1"
          });
        }
        if (moradia.caracteristicas?.includes("oficina") || moradia.caracteristicas?.includes("garagem")) {
          const curiosos = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "pet" || p.tipo === "humano" && idade !== null && idade < 10;
          });
          if (curiosos.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Ferramentas e Qu\xEDmicos",
              descricao: "Garagem/Oficina cont\xE9m itens perigosos para crian\xE7as e pets.",
              recomendacao: "Mantenha ferramentas trancadas e produtos qu\xEDmicos no alto.",
              perfisAfetados: curiosos.map((p) => p.nome),
              icon: "construct",
              color: "#FF5722"
            });
          }
        }
        if (moradia.caracteristicas?.includes("quintal") || moradia.caracteristicas?.includes("deposito")) {
          riscos.push({
            nivel: "MEDIO",
            titulo: "Aten\xE7\xE3o ao Quintal/Dep\xF3sito",
            descricao: "\xC1reas de ac\xFAmulo podem atrair escorpi\xF5es e aranhas.",
            recomendacao: "Mantenha limpo, use telas nos ralos e evite entulhos.",
            perfisAfetados: perfis.map((p) => p.nome),
            icon: "bug",
            color: "#795548"
          });
        }
        if (moradia.caracteristicas?.includes("banheiro")) {
          const idososOuCriancas = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && (idade < 6 || idade > 65);
          });
          if (idososOuCriancas.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Seguran\xE7a no Banheiro",
              descricao: "Piso molhado \xE9 risco de queda grave.",
              recomendacao: "Use tapetes antiderrapantes e instale barras de apoio.",
              perfisAfetados: idososOuCriancas.map((p) => p.nome),
              icon: "water",
              color: "#00BCD4"
            });
          }
        }
        const equipamentos = moradia.equipamentos || [];
        if (equipamentos.includes("fogao_gas")) {
          const vulneraveis = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && (idade < 6 || idade > 65);
          });
          if (vulneraveis.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Fog\xE3o a G\xE1s + Vulner\xE1veis",
              descricao: "Risco de queimaduras e vazamento de g\xE1s com crian\xE7as ou idosos.",
              recomendacao: "Instale detector de g\xE1s, use travas nos bot\xF5es e supervisione o uso.",
              perfisAfetados: vulneraveis.map((p) => p.nome),
              icon: "flame-outline",
              color: "#FF5722"
            });
          }
        }
        if (equipamentos.includes("aquecedor_gas")) {
          riscos.push({
            nivel: "CRITICO",
            titulo: "Aquecedor a G\xE1s (Mon\xF3xido de Carbono)",
            descricao: "Nunca durma com aquecedor a g\xE1s ligado em ambiente fechado.",
            recomendacao: "Mantenha janela aberta, instale detector de CO. Risco fatal!",
            icon: "snow",
            color: "#D32F2F"
          });
        }
        if (equipamentos.includes("piscina") && !moradia.caracteristicas?.includes("piscina")) {
          const criancas = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade < 12;
          });
          if (criancas.length > 0) {
            riscos.push({
              nivel: "CRITICO",
              titulo: "Piscina + Crian\xE7as",
              descricao: `${criancas.length} crian\xE7a(s) em resid\xEAncia com piscina.`,
              recomendacao: "Grade de prote\xE7\xE3o obrigat\xF3ria, alarme de piscina, supervis\xE3o constante.",
              perfisAfetados: criancas.map((p) => p.nome),
              icon: "water",
              color: "#E91E63"
            });
          }
        }
        if (equipamentos.includes("armas_fogo")) {
          const menores = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade < 18;
          });
          riscos.push({
            nivel: "CRITICO",
            titulo: "Arma de Fogo na Resid\xEAncia",
            descricao: menores.length > 0 ? `Arma de fogo em resid\xEAncia com ${menores.length} menor(es) de idade.` : "Arma de fogo declarada. Guarda segura \xE9 obrigat\xF3ria.",
            recomendacao: "Cofre com chave/biometria, muni\xE7\xE3o separada, orienta\xE7\xE3o aos moradores.",
            perfisAfetados: menores.map((p) => p.nome),
            icon: "shield",
            color: "#B71C1C"
          });
        }
        if (equipamentos.includes("ferramentas_pesadas")) {
          const curiosos = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "pet" || p.tipo === "humano" && idade !== null && idade < 12;
          });
          if (curiosos.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Maquin\xE1rio/Ferramentas + Curiosos",
              descricao: "Ferramentas pesadas acess\xEDveis a crian\xE7as ou pets.",
              recomendacao: "Mantenha em \xE1rea trancada, use protetores e supervisione.",
              perfisAfetados: curiosos.map((p) => p.nome),
              icon: "construct",
              color: "#FF5722"
            });
          }
        }
        if (equipamentos.includes("escada_movel")) {
          const idosos = perfis.filter((p) => {
            const idade = this.calcularIdade(p.dataNascimento);
            return p.tipo === "humano" && idade !== null && idade > 60;
          });
          if (idosos.length > 0) {
            riscos.push({
              nivel: "ALTO",
              titulo: "Escada M\xF3vel + Idosos",
              descricao: "Risco de queda grave ao usar escada m\xF3vel.",
              recomendacao: "Sempre com acompanhante, prefira escada com barra lateral.",
              perfisAfetados: idosos.map((p) => p.nome),
              icon: "arrow-up",
              color: "#FF9800"
            });
          }
        }
        return riscos;
      }
      /**
       * Limpa chaves antigas após confirmar migração.
       */
      static async cleanupLegacyKeys() {
        return await LegacyMigrationService_default.cleanupLegacyKeys();
      }
      // =============================================
      // INVENTÁRIO DE RISCOS (MAPA DE ATIVOS)
      // =============================================
      /**
       * Retorna lista de IDs de itens que o usuário possui na residência ativa.
       */
      static async getInventory() {
        const data = await this.getData();
        const activeId = await this.getActiveResidenceId();
        const activeRes = data.residences?.find((r) => r.id === activeId);
        if (activeRes?.inventory) {
          return activeRes.inventory;
        }
        return data.inventory || [];
      }
      /**
       * Salva o inventário na residência ativa.
       * @param {string[]} inventoryIds - Array de IDs dos itens (ex: ['airfryer', 'escada'])
       */
      static async saveInventory(inventoryIds) {
        const data = await this.getData();
        const activeId = await this.getActiveResidenceId();
        const resIndex = data.residences?.findIndex((r) => r.id === activeId);
        if (resIndex !== -1 && data.residences) {
          data.residences[resIndex].inventory = inventoryIds;
          data.residences[resIndex].ultimaAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
          data.inventory = inventoryIds;
          return await this.saveData(data);
        }
        return false;
      }
      // =============================================
      // RESET GERAL (DANGER ZONE)
      // =============================================
      /**
       * Reseta TODO o app para o estado inicial.
       * Apaga perfis, moradia, riscos e tudo mais.
       */
      static async resetAllData() {
        try {
          if (__DEV__) {
            console.warn("\u26A0\uFE0F ProfileService: RESETANDO TUDO...");
          }
          const KEYS_TO_NUKE = [
            VIGILARO_DATA_KEY,
            "@home_mapping",
            "@medical_disclaimer_accepted",
            "@vigilaro_medical_disclaimer_v1",
            "@vigilaro_xp",
            "@vigilaro_xp_history",
            "@onboarding_complete",
            "@daily_tips_read"
          ];
          await import_async_storage7.default.multiRemove(KEYS_TO_NUKE);
          const allKeys = await import_async_storage7.default.getAllKeys();
          const checklistKeys = allKeys.filter((key) => key.startsWith("@checklist_state"));
          if (checklistKeys.length > 0) {
            await import_async_storage7.default.multiRemove(checklistKeys);
            if (__DEV__) {
              console.log("Chaves de checklist removidas:", checklistKeys);
            }
          }
          const { ChecklistService: ChecklistService2 } = (init_ChecklistService(), __toCommonJS(ChecklistService_exports));
          if (ChecklistService2?.clearCache) {
            ChecklistService2.clearCache();
          }
          try {
            const GamificationService2 = (init_GamificationService(), __toCommonJS(GamificationService_exports)).default;
            if (GamificationService2?.init) {
              GamificationService2.currentXP = 0;
              GamificationService2.history = [];
            }
          } catch (e) {
          }
          await LegacyMigrationService_default.cleanupLegacyKeys();
          const defaultData = getDefaultData();
          await this.saveData(defaultData);
          return true;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao resetar dados:", error);
          }
          return false;
        }
      }
      // =============================================
      // META E COMPLETUDE
      // =============================================
      /**
       * Retorna os metadados da família.
       */
      static async getMeta() {
        const data = await this.getData();
        return data.meta || { totalMoradoresEsperados: 0, totalPetsEsperados: 0 };
      }
      /**
       * Atualiza os metadados (quantos moradores/pets esperados).
       */
      static async setMeta(metaUpdates) {
        const data = await this.getData();
        data.meta = { ...data.meta, ...metaUpdates, ultimaAtualizacao: (/* @__PURE__ */ new Date()).toISOString() };
        await this.saveData(data);
        return data.meta;
      }
      /**
       * Garante que existam perfis (mesmo que pendentes) para cumprir a meta.
       * Gera "perfis fantasmas" para preenchimento posterior.
       */
      static async ensureGhostProfiles(meta) {
        const data = await this.getData();
        await this._fillGhosts(data, meta.composicao.bebes_0_6, "humano", "bebe_0_6", "Beb\xEA (0-6m)");
        await this._fillGhosts(data, meta.composicao.bebes_7_12, "humano", "bebe_7_12", "Beb\xEA (7-12m)");
        await this._fillGhosts(data, meta.composicao.criancas_1_3, "humano", "crianca_1_3", "Crian\xE7a (1-3a)");
        await this._fillGhosts(data, meta.composicao.criancas_3_5, "humano", "crianca_3_5", "Crian\xE7a (3-5a)");
        await this._fillGhosts(data, meta.composicao.criancas_6_14, "humano", "crianca_6_14", "Crian\xE7a (6-14a)");
        await this._fillGhosts(data, meta.composicao.adolescentes, "humano", "adolescente", "Adolescente");
        await this._fillGhosts(data, meta.composicao.pcd, "humano", "pcd", "Membro PcD");
        await this._fillGhosts(data, meta.composicao.adultos, "humano", "adulto", "Adulto");
        await this._fillGhosts(data, meta.composicao.idosos, "humano", "idoso", "Idoso");
        await this._fillGhosts(data, meta.composicao.pets, "pet", null, "Pet");
        await this.saveData(data);
      }
      static async _fillGhosts(data, metaCount, tipo, faixaEtaria, labelBase) {
        if (!metaCount || metaCount <= 0) return;
        const existentes = data.perfis.filter((p) => {
          if (p.tipo !== tipo) return false;
          if (tipo === "pet") return true;
          return p.metaCategory === labelBase;
        }).length;
        const faltam = metaCount - existentes;
        if (faltam <= 0) return;
        for (let i = 0; i < faltam; i++) {
          const novoId = Date.now().toString() + Math.random().toString().slice(2, 5);
          const numero = existentes + i + 1;
          const novoPerfil = {
            id: novoId,
            nome: `${labelBase} ${numero} (Pendente)`,
            tipo,
            ativo: false,
            pendente: true,
            metaCategory: labelBase,
            foto: null,
            dataAtualizacao: (/* @__PURE__ */ new Date()).toISOString()
          };
          if (tipo === "humano" && faixaEtaria) {
            novoPerfil.faixaEtariaHint = faixaEtaria;
          }
          data.perfis.push(novoPerfil);
        }
      }
      /**
       * Calcula completude de um perfil individual (0-100%).
       */
      static calcularCompletudePerfil(perfil) {
        if (!perfil) return 0;
        let pontos = 0;
        const total = 5;
        if (perfil.nome) pontos++;
        if (perfil.dataNascimento) pontos++;
        if (perfil.tipo) pontos++;
        if (perfil.condicoesEspeciais?.length > 0 || perfil.condicoesEspeciais === null) pontos++;
        if (perfil.alergias?.length > 0 || perfil.alergias === null) pontos++;
        return Math.round(pontos / total * 100);
      }
      /**
       * Calcula completude geral de todos os dados (família, estrutura, riscos, inventário, kits).
       */
      static async calcularCompletude() {
        const data = await this.getData();
        const moradia = data.moradia || {};
        const perfis = data.perfis || [];
        const meta = data.meta || { totalMoradoresEsperados: 0, totalPetsEsperados: 0 };
        const totalEsperado = (meta.totalMoradoresEsperados || 1) + (meta.totalPetsEsperados || 0);
        const totalCadastrado = perfis.length;
        const completudePorPerfil = perfis.map((p) => this.calcularCompletudePerfil(p));
        const mediaCompletudePerfis = completudePorPerfil.length > 0 ? completudePorPerfil.reduce((a, b) => a + b, 0) / completudePorPerfil.length : 0;
        const familia = totalEsperado > 0 ? Math.min(Math.round(totalCadastrado / totalEsperado * 50 + mediaCompletudePerfis * 0.5), 100) : perfis.length > 0 ? 50 : 0;
        let estrutura = 0;
        const est = moradia.estrutura || moradia;
        if (moradia.tipoImovel || moradia.tipo) estrutura += 30;
        if (moradia.andares) estrutura += 20;
        const hasMapping = (est.caracteristicas || moradia.caracteristicas)?.length > 0 || data.residences?.find((r) => r.id === data.activeResidenceId)?.mapping?.length > 0;
        if (hasMapping) estrutura += 50;
        let riscos = 0;
        let ChecklistService2 = null;
        try {
          const ChecklistModule = (init_ChecklistService(), __toCommonJS(ChecklistService_exports));
          ChecklistService2 = ChecklistModule.ChecklistService || ChecklistModule.default || ChecklistModule;
        } catch (e) {
          if (__DEV__) {
            console.error("[ScoreSync] Falha ao carregar ChecklistService:", e);
          }
        }
        const { AMBIENTES: AMBIENTES2 } = (init_mapeamento_dados(), __toCommonJS(mapeamento_dados_exports));
        let safetyStats = null;
        try {
          const activeResId = await this.getActiveResidenceId();
          const mapping = await this.getMapping();
          const rawDefs = AMBIENTES2 || [];
          const allPerfis = await this.getPerfis();
          const FilterEngineModule = (init_ProfileFilterEngine(), __toCommonJS(ProfileFilterEngine_exports));
          const FilterEngine = FilterEngineModule.default || FilterEngineModule;
          const allDefs = FilterEngine.getRelevantAreas(rawDefs, moradia, allPerfis, mapping);
          if (allDefs.length > 0 && ChecklistService2) {
            if (ChecklistService2.getGlobalSafetyBreakdown) {
              safetyStats = await ChecklistService2.getGlobalSafetyBreakdown(allDefs, activeResId, mapping, moradia, allPerfis);
              riscos = safetyStats.percentage;
            } else {
              riscos = await ChecklistService2.getGlobalSafetyScore(allDefs, activeResId, mapping);
            }
          }
        } catch (e) {
          if (__DEV__) {
            console.error("[ScoreSync] ERRO CR\xCDTICO no c\xE1lculo de score de riscos:", e);
          }
          const rsc = moradia.riscos || {};
          if ((rsc.identificados || moradia.riscosMapeados)?.length > 0) riscos += 20;
        }
        let inventario = 0;
        const inv = moradia.inventario || {};
        const camposInventario = ["produtosQuimicos", "medicamentos", "ferramentas", "armas"];
        const preenchidos = camposInventario.filter((c) => inv[c]?.local !== null).length;
        inventario = Math.round(preenchidos / camposInventario.length * 100);
        let kit = 0;
        try {
          const KitService2 = (init_KitService(), __toCommonJS(KitService_exports)).default;
          const activeResId = await this.getActiveResidenceId();
          kit = await KitService2.getGlobalKitsProgress(activeResId);
        } catch (e) {
          if (__DEV__) {
            console.warn("Erro ao calcular score de kits:", e);
          }
        }
        const total = Math.round(
          familia * 0.25 + estrutura * 0.2 + riscos * 0.25 + inventario * 0.15 + kit * 0.15
        );
        const completude = { familia, estrutura, riscos, inventario, kit, total, safetyStats };
        data.completude = completude;
        await this.saveData(data);
        return completude;
      }
      /**
       * Retorna completude atual sem recalcular.
       */
      static async getCompletude() {
        const data = await this.getData();
        return data.completude || { familia: 0, estrutura: 0, riscos: 0, inventario: 0, kit: 0, total: 0 };
      }
      /**
       * Retorna resumo de progresso para exibição no dashboard.
       */
      static async getProgressoResumo() {
        const completude = await this.calcularCompletude();
        return {
          geral: completude.total,
          categorias: {
            familia: completude.familia || 0,
            estrutura: completude.estrutura || 0,
            riscos: completude.riscos || 0,
            inventario: completude.inventario || 0,
            contatos: 0,
            // Placeholder — não calculado aqui
            kit: completude.kit || 0
          },
          safetyStats: completude.safetyStats || null
        };
      }
      /**
       * Salva o mapeamento de riscos na casa ativa e sincroniza com legado.
       *
       * FIX #6: moradia.caracteristicas agora é sincronizado atomicamente com mapping
       * na mesma operação de escrita, eliminando divergência entre os dois campos.
       */
      static async saveMapping(items) {
        const data = await this.getData();
        if (!data.residences) {
          data.residences = await this.getResidences();
        }
        const activeId = data.activeResidenceId || "default_home";
        const index = data.residences.findIndex((r) => r.id === activeId);
        if (index !== -1) {
          data.residences[index].mapping = items;
          data.residences[index].ultimaAtualizacao = (/* @__PURE__ */ new Date()).toISOString();
          if (!data.residences[index].moradia) {
            data.residences[index].moradia = {};
          }
          data.residences[index].moradia.caracteristicas = items;
          if (data.moradia) {
            data.moradia.caracteristicas = items;
          }
          try {
            await import_async_storage7.default.setItem("@home_mapping", JSON.stringify(items));
          } catch (e) {
            if (__DEV__) {
              console.log("Erro ao salvar chave de mapping legada:", e);
            }
          }
          return await this.saveData(data);
        }
        return false;
      }
      /**
       * Recupera o mapeamento.
       * Prioridade: residência ativa → moradia → chave legada.
       */
      static async getMapping() {
        const data = await this.getData();
        if (data.residences) {
          const activeId = data.activeResidenceId || "default_home";
          const activeRes = data.residences.find((r) => r.id === activeId);
          if (activeRes) {
            if (activeRes.mapping?.length > 0) return activeRes.mapping;
            if (activeRes.moradia?.caracteristicas?.length > 0) return activeRes.moradia.caracteristicas;
          }
        }
        if (data.moradia?.caracteristicas?.length > 0) return data.moradia.caracteristicas;
        try {
          const json = await import_async_storage7.default.getItem("@home_mapping");
          return json ? JSON.parse(json) : [];
        } catch (e) {
          return [];
        }
      }
      /**
       * Retorna os dados completos de uma residência específica pelo ID.
       */
      static async getResidenceData(residenceId) {
        const data = await this.getData();
        if (!data.residences) return null;
        return data.residences.find((r) => r.id === residenceId) || null;
      }
    };
    ProfileService_default = ProfileService;
  }
});

// services/HealthService.js
var HealthService_exports = {};
__export(HealthService_exports, {
  default: () => HealthService_default
});
var import_async_storage8, HealthService, HealthService_default;
var init_HealthService = __esm({
  "services/HealthService.js"() {
    import_async_storage8 = __toESM(require("@react-native-async-storage/async-storage"));
    HealthService = class {
      // ==================== MEDICATIONS (Existente - Migrado) ====================
      static async getMedications(profileId = null) {
        try {
          const data = await import_async_storage8.default.getItem("@vigilaro_medications_v1");
          const allMeds = data ? JSON.parse(data) : [];
          if (profileId) {
            return allMeds.filter((m) => m.profileId === profileId || !m.profileId);
          }
          return allMeds;
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting medications:", e);
          }
          return [];
        }
      }
      static async saveMedication(medication) {
        try {
          const meds = await this.getMedications();
          const newMed = {
            id: Date.now().toString(),
            ...medication,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          meds.push(newMed);
          await import_async_storage8.default.setItem("@vigilaro_medications_v1", JSON.stringify(meds));
          return newMed;
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving medication:", e);
          }
          throw e;
        }
      }
      static async updateMedication(medicationId, updates) {
        try {
          const meds = await this.getMedications();
          const index = meds.findIndex((m) => m.id === medicationId);
          if (index !== -1) {
            meds[index] = { ...meds[index], ...updates };
            await import_async_storage8.default.setItem("@vigilaro_medications_v1", JSON.stringify(meds));
            return meds[index];
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error updating medication:", e);
          }
          throw e;
        }
      }
      static async deleteMedication(medicationId) {
        try {
          const meds = await this.getMedications();
          const filtered = meds.filter((m) => m.id !== medicationId);
          await import_async_storage8.default.setItem("@vigilaro_medications_v1", JSON.stringify(filtered));
        } catch (e) {
          if (__DEV__) {
            console.error("Error deleting medication:", e);
          }
          throw e;
        }
      }
      static async getOverdueMeds() {
        try {
          const meds = await this.getMedications();
          const now = /* @__PURE__ */ new Date();
          return meds.filter((med) => {
            if (!med.schedule || !med.schedule.times) return false;
            const today = now.toISOString().split("T")[0];
            return med.schedule.times.some((time) => {
              const scheduledTime = /* @__PURE__ */ new Date(`${today}T${time}`);
              return scheduledTime < now;
            });
          });
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting overdue meds:", e);
          }
          return [];
        }
      }
      // ==================== TREATMENTS (Novo) ====================
      static async getTreatments(profileId = null) {
        try {
          const data = await import_async_storage8.default.getItem("@treatments");
          const allTreatments = data ? JSON.parse(data) : [];
          if (profileId) {
            return allTreatments.filter((t) => t.profileId === profileId || !t.profileId);
          }
          return allTreatments;
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting treatments:", e);
          }
          return [];
        }
      }
      static async saveTreatment(treatment) {
        try {
          const treatments = await this.getTreatments();
          const newTreatment = {
            id: Date.now().toString(),
            ...treatment,
            createdAt: (/* @__PURE__ */ new Date()).toISOString(),
            nextDate: this._calculateNextDate(treatment.startDate, treatment.interval)
          };
          treatments.push(newTreatment);
          await import_async_storage8.default.setItem("@treatments", JSON.stringify(treatments));
          return newTreatment;
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving treatment:", e);
          }
          throw e;
        }
      }
      static async updateTreatment(treatmentId, updates) {
        try {
          const treatments = await this.getTreatments();
          const index = treatments.findIndex((t) => t.id === treatmentId);
          if (index !== -1) {
            let updatedTreatment = { ...treatments[index], ...updates };
            if (updates.startDate || updates.interval) {
              updatedTreatment.nextDate = this._calculateNextDate(updatedTreatment.startDate, updatedTreatment.interval);
            }
            treatments[index] = updatedTreatment;
            await import_async_storage8.default.setItem("@treatments", JSON.stringify(treatments));
            return updatedTreatment;
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error updating treatment:", e);
          }
          throw e;
        }
      }
      static async markTreatmentDone(treatmentId) {
        try {
          const treatments = await this.getTreatments();
          const index = treatments.findIndex((t) => t.id === treatmentId);
          if (index !== -1) {
            const treatment = treatments[index];
            treatment.lastDone = (/* @__PURE__ */ new Date()).toISOString();
            treatment.nextDate = this._calculateNextDate(/* @__PURE__ */ new Date(), treatment.interval);
            await import_async_storage8.default.setItem("@treatments", JSON.stringify(treatments));
            return treatment;
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error marking treatment done:", e);
          }
          throw e;
        }
      }
      static async deleteTreatment(treatmentId) {
        try {
          const treatments = await this.getTreatments();
          const filtered = treatments.filter((t) => t.id !== treatmentId);
          await import_async_storage8.default.setItem("@treatments", JSON.stringify(filtered));
        } catch (e) {
          if (__DEV__) {
            console.error("Error deleting treatment:", e);
          }
          throw e;
        }
      }
      static _calculateNextDate(startDate, interval) {
        const date = new Date(startDate);
        const { value, unit } = interval;
        switch (unit) {
          case "days":
            date.setDate(date.getDate() + value);
            break;
          case "weeks":
            date.setDate(date.getDate() + value * 7);
            break;
          case "months":
            date.setMonth(date.getMonth() + value);
            break;
        }
        return date.toISOString();
      }
      static async getUpcomingTreatments(hoursAhead = 24) {
        try {
          const treatments = await this.getTreatments();
          const now = /* @__PURE__ */ new Date();
          const threshold = new Date(now.getTime() + hoursAhead * 60 * 60 * 1e3);
          return treatments.filter((t) => {
            const nextDate = new Date(t.nextDate);
            return nextDate <= threshold && nextDate >= now;
          });
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting upcoming treatments:", e);
          }
          return [];
        }
      }
      // ==================== APPOINTMENTS (Consultas) ====================
      static async getAppointments(profileId = null) {
        try {
          const data = await import_async_storage8.default.getItem("@appointments");
          const allAppointments = data ? JSON.parse(data) : [];
          if (profileId) {
            return allAppointments.filter((a) => a.profileId === profileId || !a.profileId);
          }
          return allAppointments;
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting appointments:", e);
          }
          return [];
        }
      }
      static async saveAppointment(appointment) {
        try {
          const appointments = await this.getAppointments();
          const newAppointment = {
            id: Date.now().toString(),
            ...appointment,
            status: appointment.status || "scheduled",
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          appointments.push(newAppointment);
          await import_async_storage8.default.setItem("@appointments", JSON.stringify(appointments));
          return newAppointment;
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving appointment:", e);
          }
          throw e;
        }
      }
      static async updateAppointment(appointmentId, updates) {
        try {
          const appointments = await this.getAppointments();
          const index = appointments.findIndex((a) => a.id === appointmentId);
          if (index !== -1) {
            appointments[index] = { ...appointments[index], ...updates };
            await import_async_storage8.default.setItem("@appointments", JSON.stringify(appointments));
            return appointments[index];
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error updating appointment:", e);
          }
          throw e;
        }
      }
      static async deleteAppointment(appointmentId) {
        try {
          const appointments = await this.getAppointments();
          const filtered = appointments.filter((a) => a.id !== appointmentId);
          await import_async_storage8.default.setItem("@appointments", JSON.stringify(filtered));
        } catch (e) {
          if (__DEV__) {
            console.error("Error deleting appointment:", e);
          }
          throw e;
        }
      }
      static async getUpcomingAppointments(daysAhead = 7) {
        try {
          const appointments = await this.getAppointments();
          const now = /* @__PURE__ */ new Date();
          const threshold = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1e3);
          return appointments.filter((a) => {
            if (a.status === "cancelled") return false;
            const appointmentDate = new Date(a.date);
            return appointmentDate >= now && appointmentDate <= threshold;
          }).sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting upcoming appointments:", e);
          }
          return [];
        }
      }
      // ==================== PROCEDURES (Procedimentos) ====================
      static async getProcedures(profileId = null) {
        try {
          const data = await import_async_storage8.default.getItem("@procedures");
          const allProcedures = data ? JSON.parse(data) : [];
          if (profileId) {
            return allProcedures.filter((p) => p.profileId === profileId || !p.profileId);
          }
          return allProcedures;
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting procedures:", e);
          }
          return [];
        }
      }
      static async saveProcedure(procedure) {
        try {
          const procedures = await this.getProcedures();
          const newProcedure = {
            id: Date.now().toString(),
            ...procedure,
            status: procedure.status || "scheduled",
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          procedures.push(newProcedure);
          await import_async_storage8.default.setItem("@procedures", JSON.stringify(procedures));
          return newProcedure;
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving procedure:", e);
          }
          throw e;
        }
      }
      static async updateProcedure(procedureId, updates) {
        try {
          const procedures = await this.getProcedures();
          const index = procedures.findIndex((p) => p.id === procedureId);
          if (index !== -1) {
            procedures[index] = { ...procedures[index], ...updates };
            await import_async_storage8.default.setItem("@procedures", JSON.stringify(procedures));
            return procedures[index];
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error updating procedure:", e);
          }
          throw e;
        }
      }
      static async deleteProcedure(procedureId) {
        try {
          const procedures = await this.getProcedures();
          const filtered = procedures.filter((p) => p.id !== procedureId);
          await import_async_storage8.default.setItem("@procedures", JSON.stringify(filtered));
        } catch (e) {
          if (__DEV__) {
            console.error("Error deleting procedure:", e);
          }
          throw e;
        }
      }
      static async getUpcomingProcedures(daysAhead = 30) {
        try {
          const procedures = await this.getProcedures();
          const now = /* @__PURE__ */ new Date();
          const threshold = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1e3);
          return procedures.filter((p) => {
            if (p.status === "completed") return false;
            const procedureDate = new Date(p.date);
            return procedureDate >= now && procedureDate <= threshold;
          }).sort((a, b) => new Date(a.date) - new Date(b.date));
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting upcoming procedures:", e);
          }
          return [];
        }
      }
      // ==================== MEDICAL HISTORY (Novo) ====================
      static async getMedicalHistory(profileId = null) {
        try {
          const data = await import_async_storage8.default.getItem("@medical_history");
          const allHistory = data ? JSON.parse(data) : [];
          if (profileId) {
            return allHistory.filter((h) => h.profileId === profileId || !h.profileId);
          }
          return allHistory;
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting medical history:", e);
          }
          return [];
        }
      }
      static async saveMedicalRecord(record) {
        try {
          const history = await this.getMedicalHistory();
          const newRecord = {
            id: Date.now().toString(),
            ...record,
            shareable: record.shareable !== void 0 ? record.shareable : true,
            createdAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          history.push(newRecord);
          await import_async_storage8.default.setItem("@medical_history", JSON.stringify(history));
          return newRecord;
        } catch (e) {
          if (__DEV__) {
            console.error("Error saving medical record:", e);
          }
          throw e;
        }
      }
      static async deleteMedicalRecord(recordId) {
        try {
          const history = await this.getMedicalHistory();
          const filtered = history.filter((h) => h.id !== recordId);
          await import_async_storage8.default.setItem("@medical_history", JSON.stringify(filtered));
        } catch (e) {
          if (__DEV__) {
            console.error("Error deleting medical record:", e);
          }
          throw e;
        }
      }
      static async toggleRecordShareable(recordId) {
        try {
          const history = await this.getMedicalHistory();
          const index = history.findIndex((h) => h.id === recordId);
          if (index !== -1) {
            history[index].shareable = !history[index].shareable;
            await import_async_storage8.default.setItem("@medical_history", JSON.stringify(history));
            return history[index];
          }
          return null;
        } catch (e) {
          if (__DEV__) {
            console.error("Error toggling shareable:", e);
          }
          throw e;
        }
      }
      // ==================== HEALTH SUMMARY (Novo) ====================
      static async getHealthSummary(profileId) {
        try {
          const [medications, treatments, appointments, procedures, history] = await Promise.all([
            this.getMedications(profileId),
            this.getTreatments(profileId),
            this.getAppointments(profileId),
            this.getProcedures(profileId),
            this.getMedicalHistory(profileId)
          ]);
          return {
            medications,
            treatments,
            appointments,
            procedures,
            history,
            stats: {
              totalMedications: medications.length,
              activeTreatments: treatments.length,
              upcomingAppointments: appointments.filter((a) => a.status === "scheduled").length,
              upcomingProcedures: procedures.filter((p) => p.status === "scheduled").length,
              recordsCount: history.length
            }
          };
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting health summary:", e);
          }
          return null;
        }
      }
      // ==================== EXPORT/SHARE (Novo) ====================
      static async generateHealthReport(profileId, options = {}) {
        try {
          const summary = await this.getHealthSummary(profileId);
          const profile = await this._getProfileData(profileId);
          const {
            includeMedications = true,
            includeTreatments = true,
            includeHistory = true,
            onlyShareable = true
          } = options;
          let report = `*FICHA M\xC9DICA - VIGILARO CARE*

`;
          report += `\u{1F464} *Nome:* ${profile?.nome || "N\xE3o informado"}
`;
          report += `\u{1F4C5} *Idade:* ${profile?.idade || "--"} anos
`;
          report += `\u23F1\uFE0F *Data:* ${(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR")}

`;
          if (includeMedications && summary.medications.length > 0) {
            report += `\u{1F48A} *MEDICAMENTOS ATUAIS*
`;
            summary.medications.forEach((med) => {
              report += `  \u25AB\uFE0F ${med.name} ${med.dosage || ""}
`;
              if (med.schedule) {
                report += `     ${med.schedule.frequency || ""}
`;
              }
            });
            report += `
`;
          }
          if (includeTreatments && summary.treatments.length > 0) {
            report += `\u{1FA7A} *TRATAMENTOS EM ANDAMENTO*
`;
            summary.treatments.forEach((t) => {
              report += `  \u25AB\uFE0F ${t.name} - A cada ${t.interval.value} ${this._translateUnit(t.interval.unit)}
`;
              if (t.nextDate) report += `     Pr\xF3xima: ${new Date(t.nextDate).toLocaleDateString("pt-BR")}
`;
            });
            report += `
`;
          }
          if (summary.appointments && summary.appointments.length > 0) {
            report += `\u{1F5D3}\uFE0F *CONSULTAS*
`;
            summary.appointments.forEach((a) => {
              const statusText = a.status === "completed" ? "\u2705" : "\u23F3";
              report += `  \u25AB\uFE0F ${a.name} com ${a.doctor || "Dr(a)"} ${statusText}
`;
              report += `     Data: ${new Date(a.date).toLocaleDateString("pt-BR")} \xE0s ${new Date(a.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
`;
              if (a.postNotes?.recommendations) report += `     Notas: ${a.postNotes.recommendations}
`;
            });
            report += `
`;
          }
          if (summary.procedures && summary.procedures.length > 0) {
            report += `\u{1F3E5} *PROCEDIMENTOS*
`;
            summary.procedures.forEach((p) => {
              const statusText = p.status === "completed" ? "\u2705" : "\u23F3";
              report += `  \u25AB\uFE0F ${p.name || p.type} ${statusText}
`;
              report += `     Data: ${new Date(p.date).toLocaleDateString("pt-BR")} \xE0s ${new Date(p.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
`;
            });
            report += `
`;
          }
          if (includeHistory && summary.history.length > 0) {
            const shareableHistory = onlyShareable ? summary.history.filter((h) => h.shareable) : summary.history;
            if (shareableHistory.length > 0) {
              report += `\u{1F5C2}\uFE0F *HIST\xD3RICO M\xC9DICO / DOSSI\xCA*
`;
              shareableHistory.forEach((h) => {
                report += `  \u25AB\uFE0F [${this._translateCategory(h.category)}] ${h.description}
`;
              });
              report += `
`;
            }
          }
          report += `_Gerado pelo app Vigilaro Care em: ${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}_
`;
          return report;
        } catch (e) {
          if (__DEV__) {
            console.error("Error generating health report:", e);
          }
          throw e;
        }
      }
      static _translateUnit(unit) {
        const map = {
          "days": "dias",
          "weeks": "semanas",
          "months": "meses"
        };
        return map[unit] || unit;
      }
      static _translateCategory(category) {
        const map = {
          "alergia": "Alergia",
          "cirurgia": "Cirurgia",
          "condicao_cronica": "Condi\xE7\xE3o Cr\xF4nica",
          "vacina": "Vacina",
          "exame": "Exame"
        };
        return map[category] || category;
      }
      static async _getProfileData(profileId) {
        try {
          const data = await import_async_storage8.default.getItem("@profiles_data");
          const profilesData = data ? JSON.parse(data) : { perfis: [] };
          return profilesData.perfis.find((p) => p.id === profileId);
        } catch (e) {
          if (__DEV__) {
            console.error("Error getting profile data:", e);
          }
          return null;
        }
      }
    };
    HealthService_default = HealthService;
  }
});

// services/SafetyKnowledgeService.js
var SafetyKnowledgeService_exports = {};
__export(SafetyKnowledgeService_exports, {
  SafetyKnowledgeService: () => SafetyKnowledgeService,
  default: () => SafetyKnowledgeService_default
});
var INTRO_TEXTS, ENVIRONMENT_TEXTS, STATS_AND_CURIOSITIES, SafetyKnowledgeService, SafetyKnowledgeService_default;
var init_SafetyKnowledgeService = __esm({
  "services/SafetyKnowledgeService.js"() {
    INTRO_TEXTS = {
      "baby": {
        title: "A Fase do Encanto e Cuidado",
        text: "Para os pais, esta \xE9 a fase do encanto, mas exige aten\xE7\xE3o redobrada. Os beb\xEAs devem dormir de barriga para cima e o ber\xE7o deve estar livre de objetos soltos. Lembre-se: um descuido de segundos pode ser fatal."
        // Ref: Pg 15, "Bebês de até 6 meses"
      },
      "toddler": {
        title: "Pequenos Exploradores (1 a 3 anos)",
        text: "Nesta idade, a curiosidade leva a escalar m\xF3veis e abrir gavetas. As quedas e cortes s\xE3o comuns. \xC9 crucial manter portas de acesso a escadas e \xE1reas de servi\xE7o sempre trancadas."
        // Ref: Pg 21, "Crianças de 1 a 3 anos"
      },
      "child": {
        title: "Energia e Descobertas (3 a 10 anos)",
        text: "Eles correm, escalam e buscam aventuras. A supervis\xE3o ainda \xE9 necess\xE1ria, especialmente com bicicletas, piscinas e janelas. Ensine sobre os perigos, mas mantenha a prote\xE7\xE3o ativa."
        // Ref: Pg 23, "Crianças de 3 a 5 anos"
      },
      "teen": {
        title: "Ousadia e Autonomia",
        text: "A busca pela supera\xE7\xE3o exp\xF5e os jovens a novos riscos. O di\xE1logo \xE9 sua melhor ferramenta de preven\xE7\xE3o. Alerte sobre os perigos da eletricidade e o uso respons\xE1vel de equipamentos."
        // Ref: Pg 30, "Adolescentes"
      },
      "adult": {
        title: "Rotina e Preven\xE7\xE3o",
        text: "Acidentes com adultos muitas vezes ocorrem por pressa ou improviso. Use ferramentas adequadas e mantenha a manuten\xE7\xE3o da casa em dia para evitar surpresas desagrad\xE1veis."
        // Ref: Pg 32, "Adultos"
      },
      "senior": {
        title: "Cuidado e Adapta\xE7\xE3o",
        text: "Com o tempo, a agilidade diminui. Quedas s\xE3o o maior risco. Ambientes organizados, bem iluminados e livres de tapetes soltos s\xE3o essenciais para garantir seguran\xE7a e autonomia."
        // Ref: Pg 35, "Idosos"
      },
      "pet": {
        title: "Nossos Fi\xE9is Companheiros",
        text: "Pets s\xE3o como crian\xE7as curiosas. Cuidado com plantas t\xF3xicas, fios el\xE9tricos expostos e acesso livre \xE0 rua. Mantenha produtos de limpeza fora do alcance das patinhas."
      }
    };
    ENVIRONMENT_TEXTS = {
      "kitchen": {
        title: "Cozinha",
        riskLevel: "Alto",
        // Padrão Humano
        text: "Considerada o local mais perigoso da casa (responde por c. 40% das queimaduras infantis). Aten\xE7\xE3o redobrada com cabos de panelas e produtos t\xF3xicos.",
        tip: "Crie uma barreira f\xEDsica e use as bocas de tr\xE1s do fog\xE3o.",
        // Variante Pet
        pet: {
          text: "Cuidado com alimentos t\xF3xicos caindo no ch\xE3o. Uvas, chocolate, cebola e alho podem ser fatais para c\xE3es e gatos. Al\xE9m disso, \xF3leo quente respingado causa queimaduras graves.",
          tip: "Mantenha o lixo fechado e evite oferecer 'agrados' da mesa sem conhecimento veterin\xE1rio.",
          riskLevel: "Alto"
        }
      },
      "bathroom": {
        title: "Banheiro",
        riskLevel: "M\xE9dio",
        text: "Principal cen\xE1rio de quedas em idosos e afogamentos em beb\xEAs (banheira). Um palmo de \xE1gua e 30 segundos s\xE3o suficientes para um acidente fatal.",
        tip: "Mantenha a tampa do vaso fechada e use tapetes antiderrapantes.",
        pet: {
          text: "Vasos sanit\xE1rios abertos s\xE3o risco de afogamento para filhotes e fonte de bact\xE9rias. Produtos de limpeza no ch\xE3o podem causar intoxica\xE7\xE3o por contato/lambedura.",
          tip: "Mantenha a tampa do vaso sempre fechada e produtos de limpeza em arm\xE1rios altos.",
          riskLevel: "M\xE9dio"
        }
      },
      "living_room": {
        title: "Sala de Estar",
        riskLevel: "Baixo",
        text: "Aparentemente inofensiva, mas esconde riscos de tombamento de m\xF3veis e choques el\xE9tricos em tomadas n\xE3o protegidas.",
        tip: "Fixe a TV e m\xF3veis inst\xE1veis na parede para evitar esmagamentos.",
        pet: {
          text: "Fios el\xE9tricos s\xE3o 'brinquedos' perigosos que causam choques e queimaduras na boca. Plantas ornamentais podem ser t\xF3xicas se ingeridas.",
          tip: "Esconda fios com organizadores e verifique se suas plantas s\xE3o 'Pet Friendly'.",
          riskLevel: "M\xE9dio"
        }
      },
      "bedroom": {
        title: "Quartos",
        riskLevel: "Baixo",
        text: "Janelas s\xE3o pontos de aten\xE7\xE3o cr\xEDtica contra quedas. Para beb\xEAs, o ambiente de sono seguro previne a sufoca\xE7\xE3o (morte s\xFAbita).",
        tip: "Instale redes de prote\xE7\xE3o em janelas e sacadas.",
        pet: {
          text: "Janelas e sacadas sem rede s\xE3o um convite para quedas fatais, especialmente para gatos (S\xEDndrome do Gato Voador).",
          tip: "Redes de prote\xE7\xE3o certificadas s\xE3o obrigat\xF3rias para apartamentos.",
          riskLevel: "Alto"
        }
      },
      "stairs": {
        title: "Escadas",
        riskLevel: "Cr\xEDtico",
        text: "Local frequente de quedas graves. O uso de port\xF5es de seguran\xE7a no topo e na base \xE9 indispens\xE1vel para crian\xE7as e pets.",
        tip: "Corrim\xE3o firme e ilumina\xE7\xE3o adequada s\xE3o obrigat\xF3rios.",
        pet: {
          text: "Escadas lisas provocam escorreg\xF5es que afetam a coluna de c\xE3es (especialmente os de coluna longa). Quedas de altura tamb\xE9m s\xE3o risco.",
          tip: "Use carpetes antiderrapantes nos degraus e bloqueie acesso de filhotes.",
          riskLevel: "M\xE9dio"
        }
      },
      "pool": {
        title: "Piscina",
        riskLevel: "Cr\xEDtico",
        text: "O afogamento \xE9 a 2\xAA maior causa de morte acidental de 0-14 anos no Brasil. A piscina deve ter cercas f\xEDsicas de isolamento e port\xE3o com trava autom\xE1tica.",
        tip: "Supervis\xE3o visual e ativa 100% do tempo. Boias n\xE3o substituem coletes.",
        pet: {
          text: "Muitos pets caem na piscina e n\xE3o conseguem sair pela escada, morrendo de exaust\xE3o, n\xE3o de nado ruim. Capas t\xE9rmicas d\xE3o falsa sensa\xE7\xE3o de ch\xE3o.",
          tip: "Tenha rampas de sa\xEDda para animais (plataformas flutuantes) e cerque a \xE1rea.",
          riskLevel: "Cr\xEDtico"
        }
      },
      "laundry": {
        title: "\xC1rea de Servi\xE7o",
        riskLevel: "M\xE9dio",
        text: "Produtos de limpeza s\xE3o frequentemente ingeridos por confus\xE3o com bebidas. Mantenha baldes vazios e virados para baixo.",
        tip: "Armazene produtos qu\xEDmicos no alto e em arm\xE1rio trancado.",
        pet: {
          text: "Produtos qu\xEDmicos e baldes com molho s\xE3o perigosos. Pets curiosos podem entrar em m\xE1quinas de lavar abertas para dormir.",
          tip: "Verifique o tambor da m\xE1quina antes de usar e tranque produtos t\xF3xicos.",
          riskLevel: "Alto"
        }
      },
      "garage": {
        title: "Garagem",
        riskLevel: "M\xE9dio",
        text: "Ve\xEDculos em movimento e ferramentas perigosas. Crian\xE7as pequenas n\xE3o devem transitar desacompanhadas.",
        tip: "Verifique embaixo do carro antes de sair.",
        pet: {
          text: "Anticongelantes (\xE1gua do radiador) t\xEAm cheiro doce mas s\xE3o letais. Pets costumam dormir sob o motor quente ou atr\xE1s das rodas.",
          tip: "Sempre olhe embaixo do carro e buzine antes de dar a partida.",
          riskLevel: "Cr\xEDtico"
        }
      },
      "garden": {
        // Quintal
        title: "Quintal e Jardim",
        riskLevel: "Baixo",
        text: "Verifique a exist\xEAncia de plantas t\xF3xicas (Comigo-Ningu\xE9m-Pode, Espada de S. Jorge). Aten\xE7\xE3o a insetos e animais pe\xE7onhentos.",
        tip: "Elimine focos de \xE1gua parada e mantenha a grama aparada.",
        pet: {
          text: "Al\xE9m de plantas t\xF3xicas, adubos e venenos para ratos/lesmas s\xE3o perigos\xEDssimos. Fugas por port\xF5es mal fechados s\xE3o causa comum de perda.",
          tip: "Use telas nos port\xF5es para evitar fugas e n\xE3o deixe iscas de veneno acess\xEDveis.",
          riskLevel: "Alto"
        }
      }
    };
    STATS_AND_CURIOSITIES = [
      {
        id: "falls",
        text: "Segundo o Minist\xE9rio da Sa\xFAde, quedas representam 70% dos acidentes com idosos. Ilumina\xE7\xE3o e piso seguro s\xE3o vitais.",
        target: ["senior"]
      },
      {
        id: "burns",
        text: "Queimaduras s\xE3o a 2\xAA maior causa de interna\xE7\xE3o infantil por causas externas. A cozinha e o ferro de passar s\xE3o os vil\xF5es.",
        target: ["baby", "toddler", "child"]
      },
      {
        id: "drowning",
        text: "Afogamento \xE9 a principal causa de mortalidade acidental em crian\xE7as de 1 a 4 anos. Acontece r\xE1pido e em sil\xEAncio.",
        target: ["baby", "toddler"]
      },
      {
        id: "poison",
        text: "Medicamentos s\xE3o respons\xE1veis por mais de 30% das intoxica\xE7\xF5es humanas. Guarde-os sempre no alto e trancados.",
        target: ["child", "teen", "adult", "senior"]
      },
      {
        id: "pet_poison",
        text: "Alimentos comuns como uva, chocolate e cebola causam fal\xEAncia renal/hep\xE1tica em c\xE3es. A cozinha \xE9 um campo minado para eles.",
        target: ["pet"]
      },
      {
        id: "pet_car",
        text: "Gatos e c\xE3es pequenos adoram dormir sob carros ou dentro do motor nos dias frios. Sempre verifique antes de ligar.",
        target: ["pet"]
      }
    ];
    SafetyKnowledgeService = {
      getIntro(profileType, age) {
        return INTRO_TEXTS[profileType] || INTRO_TEXTS["adult"];
      },
      /**
       * Retorna informações do ambiente e uma chave canônica para deduplicação.
       * Agora aceita profileType para retornar texto específico (ex: pet).
       */
      getEnvironmentInfo(envId, profileType = "humano") {
        const map = {
          // Mapping from NEW IDs (mapeamento_dados.js) to Service Keys
          "cozinha": "kitchen",
          "cozinha_americana": "kitchen",
          "banheiro": "bathroom",
          "sala": "living_room",
          "sala_jantar": "living_room",
          // Or dining if available
          "quarto_casal": "bedroom",
          // Legacy
          "quarto_adulto": "bedroom",
          // New Standard
          "quarto_bebe": "bedroom",
          // Special handling might be needed but basics apply
          "quarto_infantil": "bedroom",
          "quarto_hospedes": "bedroom",
          "escadas": "stairs",
          "piscina": "pool",
          "area_servico": "laundry",
          "garagem": "garage",
          "oficina": "garage",
          // Similar risks
          "quintal": "garden",
          "jardim": "garden",
          "jardim_quintal": "garden",
          // Combined ID
          "varanda": "living_room",
          // Fallback or new key?
          "sacada": "living_room",
          // English Fallbacks just in case
          "kitchen": "kitchen",
          "bathroom": "bathroom",
          "living_room": "living_room",
          "bedroom": "bedroom",
          "stairs": "stairs",
          "pool": "pool",
          "laundry": "laundry",
          "garage": "garage",
          "garden": "garden"
        };
        const canonicalKey = map[envId];
        const finalKey = canonicalKey || (ENVIRONMENT_TEXTS[envId] ? envId : null);
        if (!finalKey) return null;
        const info = ENVIRONMENT_TEXTS[finalKey];
        if (!info) return null;
        let finalData = { ...info };
        if (profileType === "pet" && info.pet) {
          finalData = {
            ...finalData,
            text: info.pet.text,
            tip: info.pet.tip,
            riskLevel: info.pet.riskLevel || finalData.riskLevel
          };
        }
        return { ...finalData, canonicalKey: finalKey };
      },
      /**
       * Calcula o risco dinamicamente com base em estatísticas oficiais (SBP/OMS)
       */
      getRiskLevel(envId, profileType) {
        const info = this.getEnvironmentInfo(envId);
        if (!info) return "Baixo";
        const key = info.canonicalKey;
        if (key === "pool" && ["baby", "toddler", "child"].includes(profileType)) return "Cr\xEDtico";
        if (key === "kitchen" && ["toddler", "child", "senior"].includes(profileType)) return "Cr\xEDtico";
        if (key === "stairs" && ["baby", "toddler", "senior"].includes(profileType)) return "Cr\xEDtico";
        if (key === "bathroom" && ["senior"].includes(profileType)) return "Cr\xEDtico";
        if (key === "bathroom" && ["baby", "toddler"].includes(profileType)) return "Alto";
        if (key === "laundry" && ["toddler"].includes(profileType)) return "Alto";
        if (key === "garden" && ["pet"].includes(profileType)) return "Alto";
        return info.riskLevel;
      },
      getCuriosity(profileType) {
        const relevant = STATS_AND_CURIOSITIES.filter((c) => c.target.includes(profileType));
        if (relevant.length > 0) {
          return relevant[Math.floor(Math.random() * relevant.length)];
        }
        return null;
      }
    };
    SafetyKnowledgeService_default = SafetyKnowledgeService;
  }
});

// utils/Config.js
var Config;
var init_Config = __esm({
  "utils/Config.js"() {
    Config = {
      // ---------------------------------------------------------------------------
      // VISÃO COMPUTACIONAL
      // Verdadeiro por padrão; falso apenas quando a variável de ambiente
      // explicitamente indicar "false" (string).
      // ---------------------------------------------------------------------------
      USE_MOCK_VISION: process.env.EXPO_PUBLIC_USE_MOCK_VISION === "true",
      // ---------------------------------------------------------------------------
      // BACKEND PROXY — Vigilaro
      // O fallback aponta para o IP local do seu computador rodando o server.js
      // ---------------------------------------------------------------------------
      VIGILARO_PROXY_URL: process.env.EXPO_PUBLIC_VIGILARO_PROXY_URL || "http://192.168.100.65:3000",
      VIGILARO_APP_SECRET: process.env.EXPO_PUBLIC_VIGILARO_APP_SECRET || "",
      // ---------------------------------------------------------------------------
      // REVENUECAT — Assinaturas
      // ---------------------------------------------------------------------------
      REVENUECAT_API_KEY_IOS: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_IOS || "",
      REVENUECAT_API_KEY_ANDROID: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY_ANDROID || "",
      // ---------------------------------------------------------------------------
      // ELEVENLABS — Voz Ultra Realista
      // O voice_id não é segredo; a API key fica exclusivamente no backend proxy.
      // ---------------------------------------------------------------------------
      ELEVENLABS_VOICE_ID: "cgSgspJ2msm6clMCkdW9"
      // Jessica (pt-br)
    };
  }
});

// locales/pt-BR/common.json
var common_default;
var init_common = __esm({
  "locales/pt-BR/common.json"() {
    common_default = {
      navigation: {
        home: "In\xEDcio",
        education: "Educa\xE7\xE3o",
        travel: "Viagem",
        menu: "Menu",
        sosLabel: "Bot\xE3o SOS de emerg\xEAncia",
        sosHint: "Toque para abrir emerg\xEAncia. Mantenha pressionado para r\xE1pida."
      },
      home: {
        mainHouse: "Casa Principal",
        myProfile: "Meu Perfil",
        overdueMeds: "{{count}} Rem\xE9dios Atrasados",
        activeMonitor: "MONITOR ATIVO",
        quickAccess: "ACESSO R\xC1PIDO",
        myHealth: "Minha Sa\xFAde",
        petHealth: "Sa\xFAde Pet",
        inspections: "Vistorias",
        infoLabels: "Info R\xF3tulos",
        infoLabelsSub: "Identifique toxicidade",
        tools: "Ferramentas IA",
        intelligenceCenter: "Central de Intelig\xEAncia",
        intelligenceSub: "Assistente IA, Scanner e Voz",
        vigilaroRadar: "Radar da Preven\xE7\xE3o",
        radarSub: "Aprenda com acidentes reais",
        eventualActivities: "Atividades Eventuais",
        eventualSub: "Modo Preventivo para eventos especiais",
        myLocations: "Minhas Resid\xEAncias",
        addNewLocation: "Adicionar nova resid\xEAncia",
        inspectedEnvironments: "Ambientes Vistoriados",
        homeSafe: "Sua casa est\xE1\nsegura",
        homeNeedsAttention: "Sua casa precisa\nde aten\xE7\xE3o",
        actImmediately: "Aja\nimediatamente",
        noInspectedEnvironment: "Voc\xEA ainda n\xE3o vistoriou nenhum ambiente.",
        criticalRisk: "\u26A0\uFE0F Risco Cr\xEDtico:",
        attentionPoint: "\u26A0\uFE0F Ponto de Aten\xE7\xE3o:",
        verifyItem: "Verifique: {{item}}",
        offlineAlert: "Offline. Apenas conte\xFAdos e SOS dispon\xEDveis.",
        batteryAlert: "Bateria cr\xEDtica. Carregue o dispositivo.",
        labelSafe: "Seguro: {{pct}}%",
        labelAttention: "Aten\xE7\xE3o: {{pct}}%",
        labelCritical: "Cr\xEDtico: {{pct}}%",
        residence: {
          alertMissingNameTitle: "Aten\xE7\xE3o",
          alertMissingNameBody: "D\xEA um nome para a nova moradia.",
          createdTitle: "Moradia criada",
          createdBody: "Voc\xEA pode configurar os ambientes e o contexto dessa casa agora, sem perder o fluxo.",
          later: "Depois",
          configureNow: "Configurar agora",
          myResidences: "Minhas resid\xEAncias",
          modalIntro: "Troque a moradia ativa ou cadastre uma nova casa sem sair deste contexto.",
          closeQuickForm: "Fechar cadastro r\xE1pido",
          addNewResidence: "Cadastrar nova moradia",
          newResidence: "Nova moradia",
          newResidencePlaceholder: "Ex.: Casa da praia",
          composerHint: "Depois de salvar, voc\xEA pode seguir direto para configurar ambientes e contexto.",
          cancel: "Cancelar",
          saveResidence: "Salvar moradia"
        },
        mappingSteps: {
          perfil: "Seu perfil",
          moradores: "Moradores",
          tipo_moradia: "Tipo de moradia",
          ambientes: "Ambientes",
          equipamentos: "Equipamentos de seguran\xE7a",
          kits: "Kits de emerg\xEAncia"
        },
        briefing: {
          peopleAndPets: "{{people}} pessoa(s) e {{pets}} pet(s)",
          peopleOnly: "{{people}} pessoa(s)",
          noResidents: "Moradores ainda n\xE3o definidos",
          statusActive: "Base viva ativa",
          statusInProgress: "Briefing em constru\xE7\xE3o",
          statusInitial: "Briefing inicial",
          bodyComplete: "O contexto da casa j\xE1 orienta prioridades, tarefas e recomenda\xE7\xF5es do dia a dia.",
          bodyInProgress: "Continue por etapas. O app j\xE1 usa o que foi informado para entregar orienta\xE7\xF5es proporcionais.",
          bodyInitial: "Comece pelo contexto da casa para que a Home passe a orientar prote\xE7\xE3o, monitoramento e tarefas com relev\xE2ncia real.",
          progressLabel: "briefing",
          titleComplete: "Contexto do lar em acompanhamento",
          titleTimeline: "Linha do tempo do mapeamento",
          updateBriefing: "Atualizar briefing",
          continueStep: "Continuar: {{step}}",
          startMapping: "Mapear minha casa",
          timelineHome: "Moradia ativa",
          timelinePeople: "Quem vive ou circula aqui",
          timelineRooms: "Ambientes mapeados",
          mappedRoomsCount: "{{count}} ambiente(s) no briefing",
          roomsPending: "Cozinha, banheiro, acessos e rotinas ainda pendentes",
          timelinePlan: "Plano de cuidado",
          pendingActionsCount: "{{count}} a\xE7\xE3o(\xF5es) para priorizar",
          planReady: "Pronto para acompanhamento di\xE1rio",
          planPending: "Ser\xE1 gerado com o contexto m\xEDnimo"
        },
        daily: {
          healthEyebrow: "Cuidado de hoje",
          healthTitle: "Confirme os cuidados de sa\xFAde pendentes",
          healthBody: "{{count}} cuidado(s) aguardam confirma\xE7\xE3o.",
          firstStepEyebrow: "Primeiro passo",
          firstStepTitle: "Comece pelo briefing da casa",
          firstStepBody: "Ambientes, moradores, pets e rotinas.",
          homePriorityEyebrow: "Prioridade do lar",
          homePriorityTitle: "Cuide primeiro das pend\xEAncias abertas",
          homePriorityBody: "{{count}} ponto(s) para priorizar no plano.",
          petEyebrow: "Rotina sens\xEDvel",
          petTitle: "Reveja produtos e rotas dos pets",
          petBody: "Produtos, plantas e acessos.",
          preventiveEyebrow: "Manuten\xE7\xE3o preventiva",
          preventiveTitle: "Mantenha o plano vivo",
          preventiveBody: "Registrar mudan\xE7a ou revisar o plano."
        },
        personalization: {
          defaultWho: "quem voc\xEA ama",
          toneDefault: "objetiva e cont\xEDnua",
          scannerDefault: "IA imediata para a sua casa",
          toneAccessible: "mais acess\xEDvel, clara e direta",
          scannerAccessible: "IA com leitura mais acess\xEDvel",
          toneChildren: "mais conservadora e imediata",
          scannerChildren: "IA mais conservadora para crian\xE7as",
          toneElderly: "mais est\xE1vel e cuidadosa",
          scannerElderly: "IA atenta a quedas e rotina",
          tonePets: "mais sens\xEDvel a produtos, rotas e objetos",
          scannerPets: "IA com contexto real para pets",
          priorityHealth: "{{count}} cuidado(s) de sa\xFAde hoje",
          priorityHome: "{{count}} ajuste(s) na casa",
          priorityMapping: "{{count}} ponto(s) em observa\xE7\xE3o",
          priorityDefault: "monitoramento preventivo ativo",
          supportVerbPlural: "contam",
          supportVerbSingular: "conta",
          titleWithName: "Para {{name}} e quem voc\xEA ama",
          titleDefault: "Para voc\xEA e quem voc\xEA ama",
          body: "{{who}} {{verb}} com uma preven\xE7\xE3o {{tone}} em {{house}}. A IA j\xE1 est\xE1 priorizando {{priority}}."
        },
        greeting: {
          morning: "Bom dia",
          afternoon: "Boa tarde",
          evening: "Boa noite"
        },
        signals: {
          who: "Quem",
          where: "Onde",
          what: "O qu\xEA",
          how: "Como",
          aiPrevention: "IA + Preven\xE7\xE3o 3D",
          localPrevention: "Modo local + Preven\xE7\xE3o 3D",
          status: "Status",
          briefing: "Briefing",
          pending: "Pend\xEAncias",
          open: "Em aberto",
          healthOpenShort: "{{count}} sa\xFAde",
          houseOpenShort: "{{count}} casa",
          pendingOpen: "{{count}} aberta(s)",
          upToDate: "Em dia",
          protected: "Protegidos"
        },
        hero: {
          localBadge: "Modo local",
          localTitle: "{{house}} segue protegida",
          localDescription: "Fun\xE7\xF5es essenciais ativas.",
          viewPriorities: "Ver prioridades",
          reviewProfiles: "Revisar perfis",
          batteryBadge: "Bateria cr\xEDtica",
          batteryTitle: "Vale recarregar o dispositivo principal",
          batteryDescription: "Recarregue para manter o monitoramento.",
          preventiveMode: "Modo preventivo",
          briefingBadge: "Briefing vivo",
          briefingTitle: "{{house}} ainda precisa do primeiro mapa",
          briefingDescription: "Mapeie o contexto inicial.",
          whoToProtect: "Quem proteger",
          mappingInProgressBadge: "Mapeamento em andamento",
          mappingInProgressTitle: "O briefing j\xE1 est\xE1 formando o plano da casa",
          mappingInProgressDescription: "Continue a pr\xF3xima etapa.",
          viewPlan: "Ver plano",
          stableBadge: "Opera\xE7\xE3o est\xE1vel",
          stableTitle: "{{house}} est\xE1 com prote\xE7\xE3o forte",
          stableDescription: "Manter rotina e fechar detalhes.",
          openReports: "Abrir relat\xF3rios",
          manageProfiles: "Gerenciar perfis",
          recommendedBadge: "Ajustes recomendados",
          recommendedTitle: "A prote\xE7\xE3o est\xE1 funcional, mas ainda pode subir",
          recommendedDescription: "{{count}} ponto(s) no plano.",
          viewPending: "Ver pend\xEAncias",
          priorityBadge: "A\xE7\xE3o priorit\xE1ria",
          priorityTitle: "As pend\xEAncias mais cr\xEDticas j\xE1 est\xE3o mapeadas",
          priorityDescription: "Comece pelos pontos cr\xEDticos.",
          actNow: "Agir agora",
          scoreLabel: "score"
        },
        quick: {
          briefing: "Briefing vivo",
          updateContext: "Atualizar contexto",
          carePlan: "Plano de cuidado",
          openPriorities: "{{count}} prioridade(s)",
          houseMonitoring: "Monitoramento ativo",
          eventualTask: "Tarefa eventual",
          eventualTaskValue: "Novo cuidado ou lembrete",
          contextScanner: "Scanner com contexto",
          contextScannerValue: "Ler r\xF3tulo ou produto"
        },
        tasks: {
          myHealthTitle: "Minha Sa\xFAde",
          myHealthDueBody: "{{count}} cuidado(s) hoje.",
          myHealthBody: "Medicamentos, hist\xF3rico e rotina.",
          healthBadge: "Sa\xFAde",
          petHealthTitle: "Sa\xFAde Pet",
          petHealthBody: "Cuidados, vacinas e rotina dos pets.",
          petHealthEmptyBody: "Cadastrar e acompanhar pets.",
          petBadge: "Pet",
          mappingTitle: "Briefing vivo",
          mappingBody: "Contexto da casa e ambientes.",
          planTitle: "Plano de a\xE7\xE3o",
          planBody: "{{count}} prioridade(s) no plano.",
          planReadyBody: "Relat\xF3rios e melhorias da casa.",
          planBadge: "Plano",
          healthTitle: "Confirmar cuidado de sa\xFAde",
          healthBody: "{{count}} lembrete(s) aguardam a\xE7\xE3o hoje.",
          todayBadge: "Hoje",
          eventualTitle: "Criar tarefa eventual",
          eventualBody: "Registrar cuidado avulso em sa\xFAde.",
          eventualBadge: "Avulsa"
        },
        sections: {
          quickEyebrow: "Acesso r\xE1pido",
          quickTitle: "Cuidado, IA e tarefas",
          quickDescription: "A\xE7\xF5es principais da Home sem tirar o foco do plano di\xE1rio.",
          briefingEyebrow: "Briefing vivo",
          briefingTitle: "Linha do tempo do lar",
          briefingDescription: "O mapeamento agora aparece como base viva do cuidado, n\xE3o como formul\xE1rio solto.",
          dailyEyebrow: "Orienta\xE7\xE3o di\xE1ria",
          dailyTitle: "O que fazer agora",
          tasksEyebrow: "Plano e tarefas",
          tasksTitle: "Cuidados essenciais",
          tasksDescription: "Pend\xEAncias, tarefas avulsas e cuidados eventuais ficam vis\xEDveis sem competir com o briefing.",
          monitorEyebrow: "Monitor da casa",
          monitorTitle: "Monitor ativo",
          aiEyebrow: "Ferramentas inteligentes",
          aiTitle: "IA e consultas r\xE1pidas",
          aiDescription: "A IA permanece acess\xEDvel para d\xFAvidas, leituras e decis\xF5es pontuais."
        },
        monitor: {
          summaryTitle: "Resumo da casa",
          healthOpen: "{{count}} cuidado(s)\nhoje",
          collapse: "Recolher",
          expand: "Expandir"
        },
        ai: {
          askEyebrow: "Perguntar",
          askTitle: "Vigilaro IA",
          askBody: "Chat com contexto da casa.",
          toolsEyebrow: "Ferramentas IA",
          toolsTitle: "Centro de IA",
          toolsBody: "Scanner, voz e hist\xF3rico."
        }
      },
      onboarding: {
        title1: "Blindagem 360\xBA",
        subtitle1: "Seu lar protegido contra os acidentes mais comuns.",
        title2: "Preven\xE7\xE3o Inteligente",
        subtitle2: "O Vigilaro analisa seus c\xF4modos e avisa antes do perigo acontecer.",
        title3: "Paz de Esp\xEDrito",
        subtitle3: "Para toda a fam\xEDlia e pets. A seguran\xE7a preventiva no seu bolso.",
        title4: "Sua M\xE3o, Sua Regra",
        subtitle4: "Otimize a interface para a sua m\xE3o dominante. Canhotos podem ativar o Modo Canhoto para bot\xF5es mais acess\xEDveis.",
        rightHanded: "Destro",
        leftHanded: "Canhoto",
        skip: "Pular",
        startNow: "Come\xE7ar Agora",
        next: "Pr\xF3ximo"
      },
      health: {
        title: "Minha Sa\xFAde",
        tabMeds: "Meus Rem\xE9dios",
        tabAgenda: "Agenda M\xE9dica",
        tabDossier: "Dossi\xEA",
        noMeds: "Voc\xEA ainda n\xE3o cadastrou rem\xE9dios",
        noMedsDesc: "Cadastre seus rem\xE9dios pra acompanhar hor\xE1rios e doses.",
        addMed: "Cadastrar rem\xE9dio",
        noEvents: "Agenda vazia",
        noEventsDesc: "Cadastre consultas, procedimentos ou tratamentos.",
        overdueMedsInfo: "{{count}} rem\xE9dio(s) pendente(s)",
        tapToView: "Toque para ver",
        deleteMedTitle: "Apagar rem\xE9dio",
        deleteMedDesc: "Apagar este rem\xE9dio da sua lista?",
        deleteEventTitle: "Apagar evento",
        deleteEventDesc: "Apagar este evento da agenda?",
        cancel: "Cancelar",
        delete: "Apagar",
        doseNotSpecified: "Dose n\xE3o especificada",
        everyXHours: "A cada {{hours}} horas",
        next: "Pr\xF3xima:",
        overdue: "ATRASADO:",
        stock: "Estoque: {{quantity}} {{unit}}",
        noTimeDefined: "Hor\xE1rio n\xE3o definido",
        nextTodayAt: "Pr\xF3xima: Hoje \xE0s {{time}}",
        baseTime: "Base: {{time}}",
        onDemand: "Uso sob demanda.",
        nextSession: "Pr\xF3xima sess\xE3o",
        date: "Data",
        markDone: "Marcar Feito",
        daysOverdue: "Atrasado",
        daysLeft: "{{count}} dia(s)"
      },
      checklists: {
        roomNotFound: "Ambiente n\xE3o encontrado",
        loading: "Carregando...",
        room: "Ambiente",
        category: "Categoria:",
        notApplicable: "N\xE3o\nAplica",
        verified: "verificados",
        areaCompleted: "\xC1rea conclu\xEDda!",
        areaCleanInfo: "\xC1rea limpa. Certifique-se de que todos os itens essenciais foram avaliados.",
        maxPriority: "PRIORIDADE M\xC1XIMA",
        advanceTo: "Avan\xE7ar p/",
        finishInspection: "Concluir Vistoria",
        naAlertTitle: "Ambiente N\xE3o Aplic\xE1vel",
        naAlertDesc: "Isso vai marcar todos os itens da lista como 'N\xE3o se Aplica' (NA). Tem certeza?",
        confirmNA: "Confirmar N/A"
      },
      ai_assistant: {
        listening: "Ouvindo...",
        tapToSend: "Toque para enviar",
        processing: "Processando...",
        transcribing: "Transcrevendo...",
        stop: "Parar",
        limitReached: "Limite Atingido",
        bePremium: "\u{1F48E} Seja Premium",
        later: "Depois",
        notUnderstood: "N\xE3o entendi. Tenta de novo.",
        networkError: "Desculpe, tive um problema. Tenta de novo.",
        micPermission: "Precisa liberar o microfone",
        micError: "N\xE3o deu pra acessar o microfone"
      },
      scanner: {
        introTitle: "Scanner Inteligente",
        introSub: "Use a IA pra identificar riscos na sua casa e nos produtos.",
        modeEnv: "Escanear Ambiente",
        modeEnvDesc: "Aponte pra cada c\xF4modo e veja onde h\xE1 risco de queda, objetos perigosos e barreiras.",
        modeLabel: "Analisar R\xF3tulo com IA",
        modeLabelDesc: "Tire foto das letras mi\xFAdas, ingredientes e instru\xE7\xF5es para a IA analisar a toxidade.",
        modeBarcode: "C\xF3digo de Barras",
        modeBarcodeDesc: "L\xEA o c\xF3digo de barras e cruza com bases mundiais (Open Food Facts, UPCitemdb) pra checar toxicidade.",
        hint: "Aponte a c\xE2mera e mantenha o celular est\xE1vel. A an\xE1lise leva alguns segundos.",
        permReq: "Permiss\xE3o de c\xE2mera necess\xE1ria",
        grant: "Conceder",
        guideLabel: "Aponte para o r\xF3tulo e tire a foto",
        guideBarcode: "Enquadre o c\xF3digo de barras",
        guideEnv: "Aponte para o ambiente",
        analyzing: "Analisando IA...",
        newScan: "Nova Leitura",
        resultAlerts: "\u26A0\uFE0F ALERTAS PARA SUA FAM\xCDLIA",
        resultIngredients: "\u{1F9FE} INGREDIENTES",
        resultRisks: "\u26A1 RISCOS PRINCIPAIS",
        resultGhs: "\u{1F9EA} CLASSIFICA\xC7\xC3O GHS",
        resultFirstAid: "\u{1FA79} PRIMEIROS SOCORROS",
        resultPrevention: "\u{1F6E1}\uFE0F PREVEN\xC7\xC3O",
        resultPrecaution: "\u{1F4CB} PRECAU\xC7\xD5ES (GHS)",
        resultEpa: "\u{1F4CA} DADOS EPA (TOXICOLOGIA AVAN\xC7ADA)",
        callCiatox: "LIGAR CIATOX",
        ciatoxNumber: "0800-722-6001 (Gratuito, 24h)",
        analyzeWithAi: "Analisar r\xF3tulo com IA",
        analyzeWithAiSub: "Tire uma foto para an\xE1lise complementar",
        newSearch: "Nova Consulta",
        loadingTox: "Buscando dados toxicol\xF3gicos...",
        loadingEpa: "Buscando dados toxicol\xF3gicos (PubChem / EPA)..."
      },
      settings: {
        accessibility: "Acessibilidade",
        adaptForYou: "Adapte para Voc\xEA",
        adaptForYouDesc: "O Vigilaro Care \xE9 pra todo mundo. Ajuste abaixo o que precisar pra usar do seu jeito.",
        visual: "Visual",
        largeText: "Texto Grande (140%)",
        largeTextDesc: "Aumenta o tamanho da letra em todas as telas pra facilitar a leitura.",
        highContrast: "Alto Contraste",
        highContrastDesc: "Muda o tema pra preto e amarelo, com contraste m\xE1ximo.",
        audioFeedback: "Auditivo & Feedback",
        reduceMotion: "Reduzir Movimento",
        reduceMotionDesc: "Diminui anima\xE7\xF5es e transi\xE7\xF5es de tela.",
        screenReader: "Leitor de Tela",
        screenReaderDesc: "Otimizado para TalkBack (Android) e VoiceOver (iOS).",
        native: "NATIVO",
        interaction: "Intera\xE7\xE3o",
        leftHanded: "Modo Canhoto",
        leftHandedDesc: "Espelha bot\xF5es, menus e controles pro lado esquerdo.",
        language: "Idioma / Language"
      },
      menu: {
        resetWarningTitle: "\u26A0\uFE0F Resetar Aplicativo",
        resetWarningDesc: "Isso apaga TODOS os seus perfis, mapeamentos e dados. O app volta ao estado inicial. Tem certeza?",
        resetConfirm: "Sim, Resetar Tudo",
        resetSuccess: "App resetado! Come\xE7ando do zero... \u{1F680}",
        resetError: "N\xE3o deu pra resetar os dados.",
        accountAndApp: "Minha Conta e Aplicativo",
        accessibility: "Acessibilidade",
        accessibilityDesc: "Tamanho de texto e contraste",
        premium: "Vigilaro Premium",
        premiumDesc: "Gerenciar Assinatura",
        about: "Sobre o App",
        aboutDesc: "Vers\xE3o, Termos e Privacidade",
        resetApp: "Resetar App",
        resetAppDesc: "Apagar tudo e reiniciar",
        support: "Suporte",
        supportDesc: "Fale conosco",
        terms: "Termos de Uso",
        termsDesc: "Leia nossos termos",
        privacy: "Privacidade",
        privacyDesc: "Pol\xEDtica de dados",
        menuSettings: "Menu & Ajustes",
        generalSettings: "Configura\xE7\xF5es gerais",
        fallSensitivity: "Sensibilidade de queda",
        mapaSensivel: "Seu mapa sens\xEDvel"
      },
      activityLog: {
        fallSosTitle: "SOS por queda enviado",
        fallSosDesc: "Queda detectada para {{nome}}. Alerta de SOS disparado para os contatos.",
        vitalSosTitle: "Check-in n\xE3o respondido",
        vitalSosDesc: "{{nome}} n\xE3o respondeu ao check-in. Alerta de SOS disparado para os contatos.",
        manualSosTitle: "SOS manual enviado",
        manualSosDesc: "Alerta de SOS disparado manualmente por {{nome}}."
      },
      recentActivity: {
        subtitle: "Hist\xF3rico de eventos do app",
        adjustSensitivity: "Vendo muitos eventos de queda? Ajuste a sensibilidade"
      },
      fallSensitivity: {
        title: "Sensibilidade de queda",
        subtitle: "Como o app reconhece uma queda real",
        hero: "Quanto mais sens\xEDvel, mais cedo o app reage \u2014 mas tamb\xE9m aumenta a chance de alerta sem motivo. Escolha o que faz sentido pra voc\xEA.",
        toggleLabel: "Detec\xE7\xE3o de queda",
        toggleOnDesc: "Ativa em segundo plano enquanto o app est\xE1 aberto.",
        toggleOffDesc: "Desligada. O app n\xE3o vai reagir a quedas.",
        levelSection: "N\xEDvel de sensibilidade",
        high: {
          title: "Alta",
          desc: "Reage a quedas leves. Pode disparar se o celular cair de uma mesa."
        },
        medium: {
          title: "M\xE9dia (recomendada)",
          desc: "Equil\xEDbrio entre alerta r\xE1pido e poucos falsos positivos. Boa escolha pra maioria."
        },
        low: {
          title: "Baixa",
          desc: "S\xF3 dispara em impactos fortes. Ideal pra quem \xE9 ativo ou anda em transporte p\xFAblico."
        },
        footnote: "O ajuste vale a partir de agora. Voc\xEA pode mudar quantas vezes quiser."
      },
      sos: {
        title: "EMERG\xCANCIAS",
        samuTitle: "SAMU 192",
        samuSub: "Urg\xEAncia",
        samuPhone: "192",
        fireTitle: "Bombeiros",
        fireSub: "193",
        firePhone: "193",
        policeTitle: "Pol\xEDcia",
        policeSub: "190",
        policePhone: "190",
        toxTitle: "CIATOX",
        toxSub: "0800 722 6001",
        toxPhone: "08007226001",
        firstAid: "PRIMEIROS SOCORROS",
        firstAidSub: "Toque para guia passo a passo",
        vetTitle: "Veterin\xE1rio",
        vetSub: "Buscar Pr\xF3ximo",
        sendSos: "Enviar SOS",
        holdButton: "Segure o bot\xE3o",
        medCard: "Ficha M\xE9d.",
        medCardSub: "Sa\xFAde/Meds",
        contacts: "Contatos",
        saved: "Salvos",
        exitSOS: "SAIR DO MODO EMERG\xCANCIA",
        noInternet: "SEM INTERNET.\nTente ligar direto. Contatos pessoais podem falhar.",
        generalTitle: "Emerg\xEAncia Geral",
        generalSub: "SAMU / Bombeiros / Pol\xEDcia",
        generalPhone: "192"
      },
      travel: {
        departureInspection: "Inspe\xE7\xE3o de Partida",
        departureSubtitle: "O que fazer antes de sair de casa",
        departureIntro: "Evite imprevistos e retornos desnecess\xE1rios. Repasse este checklist r\xE1pido nos minutos finais antes de fechar a porta de casa.",
        homeSecurity: "Seguran\xE7a da Casa",
        gasOff: "Registro de G\xE1s fechado",
        waterOff: "Registro de \xC1gua fechado (evita vazamentos)",
        electronicsOff: "Aparelhos fora da tomada (TV, Micro-ondas)",
        windowsLocked: "Todas as janelas e basculantes trancados",
        trashOut: "Lixo retirado (evita mau cheiro e insetos)",
        perishables: "Geladeira limpa de perec\xEDveis r\xE1pidos",
        logistics: "Log\xEDstica B\xE1sica",
        keysWithNeighbor: "Chaves da casa com vizinho/parente de confian\xE7a?",
        petFoodWater: "Comida/\xE1gua extra se pet ficar em casa?",
        plantsWatered: "Plantas regadas ou esquema de rega pronto?",
        carryOn: "Bagagem de M\xE3o",
        docsWithPhoto: "Documentos originais com foto (RG/Passaporte)",
        ticketsSavedOffline: "Passagens/Reservas salvas offline",
        vitalMedsInBag: "Rem\xE9dios vitais na bolsa (n\xE3o despachar)",
        chargerPowerbank: "Carregador de celular e powerbank",
        cardsMoneyKeys: "Cart\xF5es, dinheiro e chaves de casa/carro",
        completedOf: "de",
        completed: "conclu\xEDdos"
      },
      medications: {
        title: "Hora do Rem\xE9dio",
        morning: "Manh\xE3",
        afternoon: "Tarde",
        night: "Noite",
        errorNameTime: "Falta preencher o nome e o hor\xE1rio.",
        errorSelectProfile: "Escolha um perfil.",
        lowStockTitle: "Estoque baixo",
        deleteTitle: "Apagar",
        deleteMsg: "Apagar este rem\xE9dio?",
        no: "N\xE3o",
        yes: "Sim",
        noRoutine: "Nenhuma rotina ativa",
        noRoutineMsg: "Cadastre os rem\xE9dios e vitaminas da fam\xEDlia aqui. A gente avisa pra n\xE3o esquecer nenhuma dose.",
        manageRoutines: "Gerenciar rotinas",
        add: "Adicionar",
        edit: "Editar",
        delete: "Apagar",
        doseHistory: "Hist\xF3rico de doses",
        historyEmpty: "Sem registros de doses ainda.",
        editMed: "Editar rem\xE9dio",
        newMed: "Novo rem\xE9dio",
        medName: "Nome do rem\xE9dio",
        dose: "Dose (ex: 1 cp)",
        time: "Hor\xE1rio (ex: 14:00)",
        notification: "Notifica\xE7\xE3o",
        currentStock: "Estoque Atual",
        stockQty: "Qtd (opcional)",
        cancel: "Cancelar",
        save: "Salvar",
        stock: "Estoque",
        lowStock: "Estoque baixo! Restam {{count}} unidades de {{name}}.",
        eduBoxTitle: "\u{1F6E1}\uFE0F Preven\xE7\xE3o Inteligente: O Peso dos Atrasos",
        eduBoxText1: 'Medicamentos possuem "pesos" diferentes no seu organismo:',
        eduBoxText2: "\u2022 Alta Criticidade (ex: Antibi\xF3ticos, Cr\xF4nicos): Atrasos comprometem a efic\xE1cia do tratamento. Manter o ciclo original \xE9 fundamental.",
        eduBoxText3: "\u2022 Baixa Criticidade (ex: Analg\xE9sicos): O risco principal \xE9 a toxicidade se tomar doses muito pr\xF3ximas.",
        eduBoxText4: "*Em caso de atrasos significativos, informe sempre seu m\xE9dico ou cuidador.*",
        delayRuleQuestion: "Em caso de atraso, qual a orienta\xE7\xE3o m\xE9dica?",
        ruleRigid: "Manter Hor\xE1rios Fixos (Cr\xF4nicos / Antibi\xF3ticos)",
        ruleRigidSub: "A pr\xF3xima dose manter\xE1 o ciclo original, ignorando o atraso.",
        ruleFlexible: "Contar a partir da hora tomada (Sintom\xE1ticos)",
        ruleFlexibleSub: "O rel\xF3gio zera a partir do momento tomado, prevenindo superdosagem.",
        disposalTitle: "Descarte Seguro",
        disposalAlertMsg: "Voc\xEA est\xE1 apagando este rem\xE9dio.\n\n\u26A0\uFE0F Lembre-se: NUNCA jogue rem\xE9dios (mesmo sobras) no lixo comum ou no vaso sanit\xE1rio. Leve a uma farm\xE1cia ou posto de coleta \u2014 isso evita intoxica\xE7\xF5es e polui\xE7\xE3o.\n\nApagar mesmo?",
        guideTitle: "Guia de Descarte",
        guideBtn: "Descarte Seguro",
        guideP1: "Como descartar medicamentos?",
        guideP2: "A caixa de papel\xE3o e a bula podem ir para o lixo recicl\xE1vel (mas rasgue as partes que t\xEAm seu nome ou dados pessoais).",
        guideP3: "Cartelas vazias, frascos, p\xEDlulas vencidas ou sobras devem ser entregues em farm\xE1cias ou postos de sa\xFAde (Log\xEDstica Reversa). Nunca jogue no vaso sanit\xE1rio!",
        reminderTitle: "Hora do Rem\xE9dio: {{name}}",
        reminderBody: "Hora de tomar {{name}} ({{dosage}})."
      },
      knowledgeHub: {
        title: "Central de Aprendizado",
        subtitle: "Biblioteca de Guias e Manuais",
        essentialConcepts: "Conceitos Essenciais",
        lifeContext: "Contexto de Vida",
        safetyReviews: "An\xE1lises de Seguran\xE7a",
        emergencies: "Emerg\xEAncias",
        practicalGuides: "Guias Pr\xE1ticos",
        mobilityMaintenance: "Mobilidade e Manuten\xE7\xE3o",
        methodology: "Metodologia 3D",
        envPrevention: "Preven\xE7\xE3o por ambientes",
        protectPet: "Proteja seu Pet",
        ageCare: "Cuidados por faixa Et\xE1ria",
        pregnancyCare: "Cuidados na Gesta\xE7\xE3o",
        toyGuide: "Guia de Brinquedos",
        kitchenUtensils: "Utens\xEDlios Dom\xE9sticos",
        homeAppliances: "Eletrodom\xE9sticos",
        electronicDevices: "Dispositivos Eletr\xF4nicos",
        risksPrev: "Riscos e Preven\xE7\xE3o",
        firePrev: "Preven\xE7\xE3o de Inc\xEAndios",
        escapePlans: "Planos de Fuga",
        firstAid: "Primeiros Socorros",
        eduGuide: "Guia Educativo",
        kitsGuide: "Guia de Kits",
        humansPets: "Humanos e Pets",
        toxicPlants: "Plantas T\xF3xicas",
        venomousAnimals: "Animais Pe\xE7onhentos",
        hazardousProducts: "Produtos Qu\xEDmicos",
        electricalRisks: "Riscos El\xE9tricos",
        safeGardening: "Jardinagem Segura",
        kitCare: "Kit e Cuidados",
        condoSafety: "Seguran\xE7a em Condom\xEDnio",
        extinguishersExits: "Extintores e Sa\xEDdas",
        leisureTravel: "Lazer e Viagens",
        beachCamping: "Praia, Camping, E-Bikes",
        ppeTools: "EPIs & Ferramentas",
        dailySafety: "Seguran\xE7a no dia a dia",
        blogTitle: "Micro Blog",
        blogSub: "Prevenir em Casa",
        articles: "Artigos",
        realCases: "Casos Reais"
      },
      reports: {
        title: "O Qu\xEA e Como",
        subtitle: "Descubra os Riscos e Aja",
        personalReport: "Relat\xF3rio Pessoal",
        personalReportDesc: "An\xE1lise detalhada sobre o seu lar.",
        improvementHistory: "Hist\xF3rico de Melhorias",
        improvementHistoryDesc: "Veja sua evolu\xE7\xE3o na seguran\xE7a.",
        environmentInspection: "Vistoria dos Ambientes",
        specialInspections: "Vistorias Especiais",
        safeSchool: "Escola Segura",
        safeSchoolDesc: "Avalie o ambiente escolar.",
        safeNursingHome: "Asilo Seguro",
        safeNursingHomeDesc: "Vistoria s\xEAnior t\xE9cnica.",
        pendencies: "Pend\xEAncias",
        item: "item",
        items: "itens",
        safe: "Seguro",
        pending: "Pendente",
        attention: "Aten\xE7\xE3o",
        risk: "Risco",
        incompleteReg: "Cadastro Incompleto",
        resolve: "Resolver",
        verifyNow: "Verificar Agora",
        allSafe: "Tudo Seguro!",
        allSafeMsg: "Voc\xEA completou todas as verifica\xE7\xF5es.",
        savePDF: "Salvar Relat\xF3rio em PDF",
        statusSafe: "Seguro",
        statusPending: "Pendente",
        statusAttention: "Aten\xE7\xE3o",
        statusRisk: "Risco",
        pendenciesPercent: "Pend\xEAncias ({{pct}}%)",
        missingPeople: "Faltam {{count}} pessoas.",
        pendenciesCount: "{{count}} pend\xEAncias"
      },
      sosCountdown: {
        fallDetected: "QUEDA DETECTADA!",
        vitalCheck: "CHECK-IN N\xC3O RESPONDIDO",
        sendingSOS: "ENVIANDO SOS EM",
        locationMsg: "Sua localizacao sera enviada para seus contatos de emergencia.",
        cancelBtn: "CANCELAR (FALSO ALARME)",
        sendingAlert: "Enviando alerta...",
        confirmSend: "Abra seu aplicativo de mensagens para confirmar o envio.",
        closeBtn: "FECHAR",
        noContactsTitle: "Aten\xE7\xE3o",
        noContacts: "Voc\xEA ainda n\xE3o tem contatos de emerg\xEAncia. Monte sua rede de apoio antes que precise.",
        sosErrorTitle: "Erro",
        sosError: "N\xE3o deu pra enviar o SOS autom\xE1tico.",
        fallMsg: "ALERTA DE QUEDA! Houve um impacto forte e n\xE3o houve resposta.",
        vitalMsg: "ALERTA DE SEGURAN\xC7A! O check-in di\xE1rio n\xE3o foi respondido.",
        defaultMsg: "SOS! Preciso de ajuda urgente.",
        sensitivityPromptTitle: "Pareceu que n\xE3o foi uma queda?",
        sensitivityPromptDesc: "Se o alerta est\xE1 disparando \xE0 toa, d\xE1 pra reduzir a sensibilidade aqui mesmo.",
        sensitivityPromptAdjust: "Ajustar sensibilidade",
        sensitivityPromptDismiss: "Agora n\xE3o",
        alsoWhatsApp: "Enviar via WhatsApp tamb\xE9m",
        whatsappOpened: "WhatsApp aberto"
      },
      firstAid: {
        whatHappened: "O Que Aconteceu?",
        tacticalProtocol: "Protocolo Tatico R\xE1pido",
        people: "PESSOAS",
        pets: "PETS",
        immediateAction: "ACAO IMEDIATA REQUERIDA",
        criticalWarning: "AVISO CRITICO",
        callEmergency: "LIGAR 192 AGORA",
        findVet: "BUSCAR CLINICA 24H"
      },
      profiles: {
        title: "Quem e Onde",
        subtitle: "Gerencie perfis e lares",
        peopleTab: "Pessoas",
        petsTab: "Pets",
        homeXRay: "Raio X da Casa",
        homeXRayDesc: "Resumo da casa, dos moradores e dos c\xF4modos",
        peopleProfiles: "Perfis de Pessoas",
        myPets: "Meus Pets",
        newPet: "Novo Pet",
        newPerson: "Nova Pessoa",
        locations: "Locais (Moradias)",
        locationsHelp: "Toque no icone de lapis para renomear ou na lixeira para remover.",
        newLocation: "Novo Local",
        renameLocation: "Renomear Local",
        locationName: "Nome do local",
        cancel: "Cancelar",
        save: "Salvar",
        deleteConfirm: "Remover {{name}}?",
        deleteTitle: "Excluir?",
        yes: "Sim",
        petCareTitle: "Perfil de Cuidados",
        petCareMsg: "O Pet n\xE3o pode ser o usuario principal do aplicativo.",
        profileSelected: "Perfil Selecionado",
        monitoringFor: "Monitorando agora para: {{name}}",
        locationChanged: "Local Alterado",
        managingNow: "Agora gerenciando: {{name}}",
        removeLocationTitle: "Remover Local?",
        removeLocationMsg: "Apagar este local?",
        no: "N\xE3o",
        yesDelete: "Sim, Excluir",
        actionBlocked: "Acao Bloqueada",
        cannotDeleteMain: "O perfil principal n\xE3o pode ser excluido.",
        cannotDeleteActive: "N\xE3o e poss\xEDvel apagar a resid\xEAncia ativa.",
        finishGoHome: "Concluir e Ir para o Inicio"
      },
      addProfile: {
        editTitle: "Editar Perfil",
        newTitle: "Novo Perfil",
        person: "Pessoa",
        pet: "Pet",
        residenceLink: "V\xCDNCULO COM A RESID\xCANCIA",
        resident: "Morador Fixo",
        visitor: "Visitante Eventual",
        name: "NOME",
        petNamePH: "Nome do Pet",
        personNamePH: "Nome Completo",
        sex: "SEXO",
        gender: "G\xCANERO",
        birth: "NASCIMENTO",
        vetFile: "Ficha Veterin\xE1ria",
        health: "Sa\xFAde",
        bloodType: "TIPO SANGU\xCDNEO",
        breed: "RA\xC7A / MESTI\xC7O",
        breedPH: "Ex: Golden, SRD...",
        microchip: "MICROCHIP / RGA",
        optional: "Opcional",
        neutered: "CASTRADO(A)?",
        conditions: "CONDI\xC7\xD5ES & HIST\xD3RICO",
        notes: "OUTRAS OBSERVA\xC7\xD5ES / ALERGIAS",
        notesPH: "Descreva alergias, medicamentos recorrentes...",
        sosNetwork: "Rede de Apoio (SOS)",
        sosHelp: "Estes contatos ser\xE3o notificados ao acionar o SOS.",
        contactName: "Nome do Contato",
        contactPhone: "Whatsapp / Telefone",
        addContact: "ADD",
        fillBoth: "Preencha nome e telefone.",
        nameRequired: "Informe o nome.",
        dateIncomplete: "Data de nascimento incompleta.",
        success: "Sucesso",
        profileSaved: "Perfil salvo!",
        error: "Erro",
        saveFailed: "N\xE3o deu pra salvar.",
        saveChanges: "Salvar Altera\xE7\xF5es",
        createProfile: "Criar Perfil",
        galleryPerm: "Precisamos de acesso \xE0 galeria.",
        permRequired: "Permiss\xE3o necess\xE1ria"
      },
      wizard: {
        welcome: "Boas Vindas",
        propertyType: "Tipo de Imovel",
        structure: "Estrutura",
        residents: "Cadastro de Moradores",
        protections: "Prote\xE7\xF5es",
        priorities: "Prioridades",
        done: "Pronto!",
        letsSetup: "Vamos configurar {{name}}",
        quickSetup: "Um ajuste r\xE1pido para personalizar a seguran\xE7a para sua fam\xEDlia e pets.",
        whoLivesHere: "Quem mora aqui?",
        registerAll: "Cadastre todos os moradores. Toque nos cartoes para selecionar.",
        letsStart: "Vamos comecar?",
        addFamilyMsg: "Adicione voc\xEA, sua fam\xEDlia e seus pets.",
        firstResident: "Cadastrar Primeiro Morador",
        newLabel: "Novo",
        completeReg: "Completar Cadastro",
        removeProfile: "Remover?",
        removeConfirm: "Apagar este perfil?",
        no: "N\xE3o",
        yes: "Sim",
        propertyTypeQ: "Qual o tipo do imovel?",
        propertyTypeHelp: "Isso ajuda a calibrar riscos estruturais.",
        buildingDetails: "Detalhes da Edificacao Principal",
        buildingHow: "Como e a construcao onde moram?",
        singleStory: "Terrea",
        multiStory: "Sobrado / +1 Andar",
        structureRooms: "Estrutura e Ambientes",
        selectRooms: "Selecione todos os ambientes que sua fam\xEDlia acessa:",
        installedProtections: "Prote\xE7\xF5es Instaladas",
        whatProtects: "O que ja protege sua casa?",
        biggestConcerns: "Maiores Preocupacoes",
        prioritizeAlerts: "Priorizaremos alertas sobre:",
        setupComplete: "Configura\xE7\xE3o Concluida!",
        readyToMonitor: "Seu ambiente esta pronto para ser monitorado.",
        finish: "Finalizar",
        continue: "Continuar",
        houseConfigured: "Casa Configurada!",
        envReady: "Ambiente pronto para monitoramento.",
        accessHome: "Acessar Home",
        configError: "N\xE3o deu pra salvar as configura\xE7\xF5es."
      },
      checklistWizard: {
        shieldTitle: "Vamos blindar sua casa?",
        shieldDesc: "Mapear os riscos do seu ambiente e a essencia da Preven\xE7\xE3o 3D (Diaria, Dinamica e Duradoura).",
        safetyWarningTitle: "Aten\xE7\xE3o a Seguran\xE7a",
        safetyWarningDesc: "Sem o mapeamento completo, pontos cegos de risco permanecem ocultos. O Vigilaro Care precisa conhecer o seu ambiente para ativar os alertas de sa\xFAde e seguran\xE7a corretamente.",
        walkThrough: "Percorrer casa passo a passo",
        chooseRoom: "Escolher ambiente especifico",
        skipForNow: "Pular por enquanto (N\xE3o recomendado)",
        inspections: "Vistorias",
        riskMapping: "Mapeamento de Riscos",
        selectRoom: "Escolha o ambiente que vai vistoriar agora. Comece pelos c\xF4modos de maior circula\xE7\xE3o.",
        priority: "Prioridade",
        backToApp: "Voltar ao app (Finalizar depois)",
        routineInspection: "Vistoria de Rotina",
        routineInspectionDesc: "Fa\xE7a vistorias guiadas de tempos em tempos pra garantir que seus ambientes continuam t\xE3o seguros quanto no dia em que voc\xEA os configurou.",
        continuousAttention: "Aten\xE7\xE3o Cont\xEDnua",
        continuousAttentionDesc: "A seguran\xE7a \xE9 din\xE2mica. Confira de tempos em tempos se novos objetos ou mudan\xE7as nos m\xF3veis trouxeram novos riscos.",
        startFullAudit: "Iniciar Auditoria Completa",
        auditSpecificRoom: "Auditar C\xF4modo Espec\xEDfico",
        backToPanel: "Voltar para o Painel",
        specificAudit: "Auditoria Espec\xEDfica",
        selectRoomToAudit: "Escolha qual ambiente vai auditar agora:",
        backToHome: "Voltar para o In\xEDcio"
      },
      checklistReport: {
        generalAssessment: "Avaliacao Geral",
        safetyScore: "Score de Seguran\xE7a",
        compliant: "Conformes",
        nonCompliant: "N\xE3o Conformes",
        totalItems: "Total de itens avaliados:",
        improvementTitle: "Oportunidades de Melhoria",
        improvementFound: "Identificamos {{count}} ponto(s) que podem ser aprimorados.",
        partnerQuote: "N\xE3o somos policia, somos parceiros.",
        partnerMsg: "Nosso objetivo e informar e orientar. N\xE3o se preocupe se o score n\xE3o for 100% agora. O importante e saber onde atuar para proteger quem voc\xEA ama.",
        itemNeedsAttention: "Item {{title}} precisa de aten\xE7\xE3o",
        consultEducation: "Consulte a secao Educa\xE7\xE3o para dicas praticas.",
        savedHistory: "Salvo no Hist\xF3rico",
        savedHistoryMsg: "Esta avaliacao foi registrada automaticamente. Acompanhe sua evolucao ao longo do tempo!",
        shareReport: "Compartilhar Relat\xF3rio",
        sharePrivacy: "* Inclui aviso de privacidade ao compartilhar.",
        methodology3D: "Metodologia Preven\xE7\xE3o 3D",
        daily: "DIARIA:",
        dailyDesc: "Cuidado constante e habitual",
        dynamic: "DINAMICA:",
        dynamicDesc: "Adaptavel as mudancas da fam\xEDlia",
        durable: "DURADOURA:",
        durableDesc: "Preven\xE7\xE3o sustentavel e continua",
        newChecklist: "Novo Checklist",
        home: "Home",
        privacyTitle: "Privacidade e Seguran\xE7a",
        privacyMsg: "Voc\xEA esta prestes a compartilhar um relat\xF3rio detalhado contendo informa\xE7\xF5es sobre a seguran\xE7a da sua resid\xEAncia. Certifique-se de enviar este arquivo apenas para pessoas de sua extrema confian\xE7a.",
        cancel: "Cancelar",
        awareAndSend: "Estou Ciente e Quero Enviar",
        shareError: "N\xE3o deu pra compartilhar.",
        excellent: "Excelente!",
        excellentMsg: "Sua casa esta muito segura! Continue mantendo.",
        goodProgress: "Bom progresso!",
        goodProgressMsg: "Alguns ajustes necessarios. Priorize os itens n\xE3o conformes.",
        attentionNeeded: "Aten\xE7\xE3o necess\xE1ria",
        attentionNeededMsg: "Varios riscos identificados. Recomendamos acao urgente."
      },
      actionPlan: {
        title: "Plano de Acao",
        subtitle: "Vistoria de Correcao",
        critical: "Criticos",
        pending: "Pendentes",
        resolved: "Resolvidos",
        priorityItems: "Itens Prioritarios",
        allVerified: "Tudo Verificado!",
        risk: "RISCO",
        safeZone: "Zona segura confirmada. O ambiente n\xE3o possui vulnerabilidades ativas pendentes de resolucao.",
        backHome: "Voltar para Home",
        error: "Erro",
        loadError: "N\xE3o deu pra carregar o plano de a\xE7\xE3o.",
        noProfile: "Nenhum perfil ativo encontrado para gerar o relat\xF3rio.",
        generateReport: "Gerar Relat\xF3rio",
        generatePDFConfirm: "Gerar o relat\xF3rio em PDF com o plano de a\xE7\xE3o atual?",
        cancel: "Cancelar",
        generate: "Gerar",
        pdfError: "N\xE3o deu pra gerar o PDF: "
      },
      checklistCategoria: {
        tapToInspect: "Tocar para iniciar vistoria",
        roomsFound: "{{count}} ambiente(s) encontrados nesta categoria"
      },
      about: {
        title: "Sobre o App",
        subtitle: "Vigilaro Care V6 Neo.",
        version: "Versao",
        mission: "Nossa Missao",
        missionText: "Auxiliar fam\xEDlias para criar lares mais seguros e acolhedores. Acreditamos que a preven\xE7\xE3o e a maior forma de amor e cuidado. O Vigilaro une tecnologia e empatia para proteger quem voc\xEA mais ama.",
        legalInfo: "Informa\xE7\xF5es Legais",
        termsOfUse: "Termos de Uso",
        privacyPolicy: "Politica de Privacidade",
        contactSupport: "Contato & Suporte",
        contactUs: "Fale Conosco",
        visitSite: "Visite nosso site",
        advancedSettings: "Configuracoes Avancadas",
        resetApp: "Reiniciar Aplicativo (Reset)",
        resetTitle: "Reiniciar Aplicativo",
        resetMsg: "Tem certeza? Isso apaga TODOS os dados. O app volta ao estado inicial.",
        cancel: "Cancelar",
        yesDeleteAll: "Sim, Apagar Tudo",
        madeWith: "Feito com amor pela equipe Vigilaro",
        copyright: "2026 Vigilaro Inc. Todos os direitos reservados."
      },
      upgrade: {
        heroTitle: "Sua fam\xEDlia merece protecao sem limites",
        heroSub: "Acesso completo a tudo que o Vigilaro tem para proteger quem voc\xEA ama.",
        premium: "Premium",
        family: "Fam\xEDlia",
        mostComplete: "Mais completo",
        monthly: "Mensal",
        annual: "Anual",
        perMonth: "/mes",
        perYear: "/ano",
        loading: "Carregando...",
        loadingPlans: "Carregando planos...",
        subscribe: "Assinar",
        restorePurchases: "Restaurar Compras",
        alreadyProtected: "Voc\xEA ja esta protegido!",
        allFeatures: "Todos os recursos estao disponiveis para voc\xEA.",
        validUntil: "Valido ate:",
        back: "Voltar",
        offline: "Offline",
        offlineMsg: "Confira sua conex\xE3o pra fechar a compra.",
        errorLink: "N\xE3o deu pra abrir esse link.",
        invalidProduct: "Produto invalido ou indisponivel. Tente recarregar.",
        protectionActive: "Protecao ativada",
        understood: "Entendido",
        purchaseError: "Erro na compra",
        purchaseErrorFallback: "N\xE3o deu pra completar. Tenta de novo.",
        unexpectedError: "Deu erro no checkout. Tenta de novo.",
        subscriptionRestored: "Assinatura restaurada",
        restoredMsg: "Sua protecao esta ativa novamente!",
        noSubscription: "Nenhuma assinatura encontrada",
        noSubscriptionMsg: "Se voc\xEA comprou h\xE1 pouco tempo, espera alguns minutos e tenta de novo.",
        restoreError: "N\xE3o deu pra restaurar.",
        unexpectedRestore: "N\xE3o foi poss\xEDvel restaurar suas compras.",
        cannotLoad: "N\xE3o deu pra carregar os planos agora",
        checkConnection: "Confira sua conex\xE3o e tenta de novo \u2014 seus dados est\xE3o seguros.",
        tryAgain: "Tentar de novo",
        error: "Erro",
        save: "Economize",
        featFree1: "Checklists de seguran\xE7a dom\xE9stica",
        featFree2: "Botao SOS de emergencia",
        featFree3: "Scanner IA de riscos (5/mes)",
        featFree4: "Assistente de preven\xE7\xE3o por voz (10/mes)",
        featFree5: "Auditor em tempo real",
        featFree6: "Relat\xF3rio mensal de seguran\xE7a",
        featPrem1: "Tudo da protecao essencial",
        featPrem2: "Scanner IA ilimitado",
        featPrem3: "Assistente de preven\xE7\xE3o ilimitado",
        featPrem4: "Auditor ao vivo (15 min/mes)",
        featPrem5: "Relat\xF3rio mensal de seguran\xE7a",
        featPrem6: "Experiencia limpa, sem interrupcoes",
        featFam1: "Tudo do Premium, multiplicado pela fam\xEDlia",
        featFam2: "Auditor ao vivo \u2014 60 min/mes para a fam\xEDlia toda",
        featFam3: "Protecao para ate 5 membros",
        featFam4: "Saiba quando a fam\xEDlia chegou ou saiu de casa",
        featFam5: "Cuidado ativo para parentes idosos",
        featFam6: "Atendimento prioritario",
        termsFooter: "A assinatura e renovada automaticamente ao final de cada periodo pelo preco exibido acima, a menos que seja cancelada pelo menos 24 horas antes do termino do periodo vigente. Voc\xEA pode gerenciar e cancelar sua assinatura nas configuracoes da sua conta:\n\n- iOS: Ajustes > [Seu nome] > Assinaturas\n- Android: Google Play > Perfil > Pagamentos e assinaturas\n\nAo continuar, voc\xEA concorda com nossos Termos de Uso e Politica de Privacidade."
      },
      configMenu: {
        title: "Perfis e Configuracoes",
        familyProfiles: "Perfis Familiares",
        assistantVoice: "Voz do Assistente",
        securityDevices: "Dispositivos de Seguran\xE7a",
        aboutApp: "Sobre o Vigilaro Care"
      },
      common: {
        locale: "pt-BR"
      },
      welcome: {
        title: "Bem-vindo ao Vigilaro Care",
        subtitle: "Preven\xE7\xE3o Inteligente para Proteger Quem Voc\xEA Ama.",
        accessibility: "Acessibilidade",
        accessibilityLabel: "Configura\xE7\xF5es de Acessibilidade",
        lgpdConsent: "Li e concordo com os",
        termsOfUse: "Termos de Uso",
        lgpdAnd: "e",
        privacyPolicy: "Pol\xEDtica de Privacidade",
        startNow: "Come\xE7ar Agora"
      },
      animals: {
        title: "Animais",
        subtitle: "Guia de Identifica\xE7\xE3o",
        searchPlaceholder: "Buscar animal...",
        emergencyTitle: "Emerg\xEAncia Toxicol\xF3gica?",
        emergencyDesc: "Ligue para o CIATOX: 0800 722 6001",
        andMore: "e +{{count}}",
        noResults: "Nenhum animal com esse nome."
      },
      plants: {
        title: "Plantas",
        subtitle: "Guia de Identifica\xE7\xE3o",
        searchPlaceholder: "Buscar planta...",
        emergencyTitle: "Emerg\xEAncia Toxicol\xF3gica?",
        emergencyDesc: "Ligue para o CIATOX: 0800 722 6001",
        variedSymptoms: "Sintomas variados",
        andMore: "(+{{count}} mais)",
        noResults: "Nenhuma planta com esse nome."
      },
      detail: {
        toxicParts: "Partes T\xF3xicas",
        humanSymptoms: "Sintomas em Humanos",
        petSymptoms: "Sintomas em Pets",
        generalSymptoms: "Sintomas Gerais",
        whereFound: "\u{1F4CD} Onde \xE9 Encontrado",
        safeAlternatives: "\u{1F331} Alternativas Seguras",
        howToPrevent: "Como Evitar / Prevenir",
        practicalExamples: "Exemplos Pr\xE1ticos",
        identification: "Identifica\xE7\xE3o",
        firstAid: "Primeiros Socorros",
        whatToDo: "O que Fazer",
        whatNotToDo: "O que N\xC3O Fazer",
        curiosities: "Curiosidades",
        dataStats: "Dados & Estat\xEDsticas",
        importance: "Import\xE2ncia",
        definition: "Defini\xE7\xE3o",
        description: "Descri\xE7\xE3o",
        completeGuide: "Guia Completo",
        details: "Detalhes"
      },
      fasesVida: {
        title: "Fases da Vida",
        subtitle: "Guia de prote\xE7\xE3o por faixa et\xE1ria",
        relatedGuides: "Guias de Seguran\xE7a por Idade",
        tagBabies: "Beb\xEAs",
        tagChildren: "Crian\xE7as",
        tagElderly: "Idosos"
      },
      petsMenu: {
        headerTitle: "Seguran\xE7a Pet",
        headerSubtitle: "Prote\xE7\xE3o para seu melhor amigo",
        introText: "Nossos pets s\xE3o curiosos e dependem de n\xF3s para ficarem seguros. Escolha uma categoria abaixo.",
        prenhez: {
          titulo: "Prenhez e Ninhadas",
          subtitulo: "Gesta\xE7\xE3o e Parto",
          descricao: "Cuidados especiais para a mam\xE3e e os filhotes."
        },
        filhotes: {
          titulo: "Filhotes",
          subtitulo: "0 a 12 meses",
          descricao: "Seguran\xE7a e socializa\xE7\xE3o nos primeiros meses."
        },
        adultos: {
          titulo: "Pets Adultos",
          subtitulo: "Vida Adulta",
          descricao: "Preven\xE7\xE3o de acidentes na vida adulta."
        },
        aves: {
          titulo: "Aves",
          subtitulo: "P\xE1ssaros Ornamentais",
          descricao: "Teflon, vapores e correntes de ar."
        },
        wellness: {
          titulo: "Hub Bem-Estar",
          subtitulo: "Cuidados Di\xE1rios",
          descricao: "Dicas de rotina, hidrata\xE7\xE3o e enriquecimento."
        },
        pequenos: {
          titulo: "Pequenos Pets",
          subtitulo: "Roedores e outros",
          descricao: "Coelhos, Hamsters e porquinhos."
        },
        peixes: {
          titulo: "Peixes",
          subtitulo: "Aqu\xE1rios",
          descricao: "Peixes e R\xE9pteis aqu\xE1ticos."
        },
        alimentos: {
          titulo: "Alimentos Proibidos",
          subtitulo: "Seguran\xE7a Alimentar",
          descricao: "O que seu pet nunca deve comer."
        },
        socorros: {
          titulo: "Primeiros Socorros",
          subtitulo: "A\xE7\xF5es de Emerg\xEAncia",
          descricao: "O que fazer em engasgos, mordidas e quedas."
        },
        guia_socorros_pet: {
          titulo: "Guia de Socorros",
          subtitulo: "Aprendizado Preventivo",
          descricao: "Estude o passo a passo para agir com calma."
        },
        kit_pet_checklist: {
          titulo: "Kit de Emerg\xEAncia",
          subtitulo: "Checklist Pr\xE1tico",
          descricao: "Monte e verifique o kit de prontid\xE3o do seu pet."
        }
      },
      lazerMenu: {
        headerTitle: "Lazer & F\xE9rias",
        headerSubtitle: "Divers\xE3o com seguran\xE7a garantida.",
        lazer: {
          title: "Lazer & Divers\xE3o",
          subtitulo: "Praia, Piscina, Parques",
          desc: "Seguran\xE7a em momentos de lazer, camping e atividades ao ar livre."
        },
        ferias: {
          title: "F\xE9rias & Viagem",
          subtitulo: "Estrada, Hotel, Avi\xE3o",
          desc: "Cuidados na estrada, seguran\xE7a em hot\xE9is e documentos de viagem."
        },
        mobilidade: {
          title: "Mobilidade & E-Bikes",
          subtitulo: "Bikes el\xE9tricas, carros e mais",
          desc: "Regras de tr\xE2nsito, categorias do CTB e dicas de seguran\xE7a para ve\xEDculos de lazer e micromobilidade."
        }
      },
      riscosFisicos: {
        headerTitle: "Riscos F\xEDsicos",
        headerSubtitle: "Eletricidade, Quedas e mais."
      },
      ageGroup: {
        risksTitle: "Principais Riscos",
        howToPrevent: "Como Prevenir:"
      },
      petWellness: {
        title: "Hub de Bem-Estar",
        subtitle: "Cuidados di\xE1rios para uma vida longa e feliz",
        introText: "A preven\xE7\xE3o \xE9 a melhor forma de amor. Pequenos ajustes na rotina podem evitar grandes emerg\xEAncias no futuro."
      },
      petFood: {
        headerTitle: "Lista Negra",
        heroTitle: "Alimentos Proibidos",
        heroDesc: "Metabolismos diferentes tornam petiscos de humanos em venenos letais para c\xE3es e gatos. Memorize esta lista vermelha.",
        alertTitle: "Intoxica\xE7\xE3o Recente?",
        alertDesc: "Corra ao Veterin\xE1rio ou acione o CIATOX: 0800-722-6001",
        listTitle: "Mosaico de Riscos"
      },
      petPregnancy: {
        title: "Prenhez e Ninhadas",
        subtitle: "Guia completo para cuidar da mam\xE3e e filhotes",
        importantTitle: "Importante",
        importantText: "Este guia \xE9 informativo. Sempre consulte um veterin\xE1rio para acompanhamento adequado da gesta\xE7\xE3o e parto.",
        tipTitle: "Dica Importante",
        tipText: "A castra\xE7\xE3o \xE9 a forma mais eficaz de prevenir gesta\xE7\xF5es indesejadas e contribui para a sa\xFAde do seu pet. Converse com seu veterin\xE1rio sobre o melhor momento para realizar o procedimento."
      },
      avesSeguras: {
        headerTitle: "Aves Seguras",
        environmentTitle: "Ambiente Saud\xE1vel"
      },
      petPregnancyTracker: {
        title: "Gest\xE3o de Prenh\xEAz",
        subtitle: "Acompanhamento",
        selectPet: "Escolha o pet:",
        noPets: "Voc\xEA ainda n\xE3o cadastrou nenhum pet.",
        registerPet: "Cadastrar pet",
        startTracking: "Iniciar Acompanhamento",
        matingDate: "Data do Cruzamento (DD/MM/AAAA)",
        dueDate: "Previs\xE3o do Parto:",
        gestationDays: "(~{{days}} dias de gesta\xE7\xE3o)",
        confirmPregnancy: "Confirmar Prenh\xEAz",
        ongoingPregnancy: "Gesta\xE7\xE3o em Andamento",
        weekNumber: "{{week}}\xAA Semana",
        start: "In\xEDcio",
        birth: "Parto",
        mating: "Cruzamento",
        forecast: "Previs\xE3o",
        weeklyTips: "Dicas da Semana",
        tip1: "Nas primeiras semanas, a alimenta\xE7\xE3o pode continuar normal. Evite estresse excessivo.",
        tip2: "O apetite pode aumentar. Consulte o veterin\xE1rio sobre ra\xE7\xE3o para filhotes (mais rica em nutrientes).",
        tip3: "Prepare o 'ninho' em um local calmo. A barriga j\xE1 deve estar bem vis\xEDvel.",
        registerBirth: "Registrar Nascimento",
        litterCount: "Quantidade de Filhotes",
        finishPregnancy: "Finalizar Gesta\xE7\xE3o",
        breedNotInformed: "Ra\xE7a n\xE3o inf.",
        errorTitle: "Erro",
        errorMatingDate: "Informe a data do cruzamento corretamente (DD/MM/AAAA).",
        errorLitterCount: "Informe a quantidade de filhotes.",
        successTitle: "Sucesso",
        successPregnancy: "Gest\xE3o de prenh\xEAz iniciada!",
        congratsTitle: "Parab\xE9ns!",
        congratsBirth: "Nascimento de {{count}} filhotes registrado!",
        errorSave: "Falha ao salvar dados."
      },
      riscosMenu: {
        title: "Preven\xE7\xE3o em Casa",
        subtitle: "Guia Consultivo dos acidentes por c\xF4modo.",
        preventionTopics: "t\xF3picos de preven\xE7\xE3o"
      },
      envScreens: {
        title: "Riscos e Orienta\xE7\xF5es por Ambiente",
        preventionGuide: "Guia de preven\xE7\xE3o",
        living: "Conviv\xEAncia e Estar",
        rest: "\xC1rea de Descanso",
        services: "Servi\xE7os e Utilidades",
        leisure: "Lazer e Exterior",
        circulation: "Circula\xE7\xE3o e Acessos"
      },
      headersFirst: {
        electronicDevices: "Dispositivos Eletr\xF3nicos",
        homeAppliances: "Eletrodom\xE9sticos",
        householdUtensils: "Utens\xEDlios Dom\xE9sticos",
        toolsAndRepairs: "Ferramentas & Repara\xE7\xF5es",
        safetyAndMaintenance: "Seguran\xE7a e Manuten\xE7\xE3o.",
        gardening: "Jardinagem",
        chemicals: "Produtos Qu\xEDmicos",
        travelSafety: "Seguran\xE7a em Viagens e Lazer",
        sosPet: "S.O.S Pet",
        survivalProtocols: "Protocolos de Sobreviv\xEAncia",
        lifeThreateningCall: "Chamada de Risco de Vida",
        poisoning: "Envenenamento / T\xF3xicos",
        hemorrhage: "Hemorragia / Traumas",
        medicineKit: "Kit Rem\xE9dios",
        rescueKits: "Kits de Socorro",
        whyPrepare: "Porqu\xEA preparar-se?",
        firePlan: "Plano de Inc\xEAndio",
        critical: "CR\xCDTICO:",
        firstAid: "Primeiros Socorros",
        people: "Pessoas",
        pets: "Pets",
        arrivalInspection: "Inspe\xE7\xE3o de Chegada",
        comingSoon: "Em Breve",
        safeCheckout: "Checkout Seguro",
        travelKit: "Kit de Viagem",
        goingToTravel: "Vai Viajar?",
        destinationType: "Qual o tipo de destino?",
        travelPurpose: "Prop\xF3sito da Viagem",
        internationalDestination: "Destino Internacional?",
        whoIsGoing: "Quem vai junto?",
        itensIncluDos: "Itens inclu\xEDdos:",
        acessRios: "Acess\xF3rios",
        KitsRecomendados: "\u{1F381} Kits Recomendados",
        categorias: "Categorias",
        vigilaroAIChat: "Vigilaro AI \u2014 Chat",
        monitorDeUdio: "Monitor de \xC1udio",
        vIGILAROAI: "VIGILARO AI",
        checklistReforma: "Checklist: Reforma",
        ativarModoReforma: "Ativar Modo Reforma",
        checklistVisita: "Checklist: Visita",
        mapeamentoDeAtivos: "Mapeamento de Ativos",
        histRicoDeMelhorias: "Hist\xF3rico de Melhorias",
        mapeamentoDaCasa: "Mapeamento da Casa",
        kitsDeProntidO: "Kits de Prontid\xE3o",
        vistoriarAmbientes: "Vistoriar Ambientes",
        vigilaroVoice: "Vigilaro Voice",
        guiaDeKits: "Guia de Kits",
        novoEvento: "Novo Evento",
        novoExame: "Novo Exame",
        novoRegistro: "Novo Registro",
        semRemDios: "Sem rem\xE9dios",
        agendaVazia: "Agenda vazia",
        saDeDoPet: "Sa\xFAde do pet",
        nenhumPetCadastrado: "Voc\xEA ainda n\xE3o cadastrou nenhum pet",
        compartilhar: "Compartilhar",
        infoRTulos: "InfoR\xF3tulos",
        atividadesEventuais: "Atividades Eventuais",
        guiaDeSeguranA: "Guia de Seguran\xE7a",
        dicasDeOuro: "Dicas de Ouro:",
        excelente: "Excelente!",
        pontosDeAtenO: "Pontos de Aten\xE7\xE3o",
        polTicaDePrivacidade: "Pol\xEDtica de Privacidade",
        raioXDaMoradia: "Raio X da Moradia",
        seuRelatRioPersonalizado: "Seu Relat\xF3rio Personalizado",
        atividadeRecente: "Atividade Recente",
        nenhumaAtividadeRecente: "Nada por aqui ainda",
        relatRioCompleto: "Relat\xF3rio Completo",
        PontosDeAtenO: "\u26A0\uFE0F Pontos de Aten\xE7\xE3o",
        PerguntasParaFazerEscola: "\u{1F4AC} Perguntas para Fazer \xE0 Escola",
        dicaImportante: "Dica Importante",
        verRelatRioCompleto: "Ver Relat\xF3rio Completo",
        relatRioInstitucional: "Relat\xF3rio Institucional",
        RiscosCrTicosIdentificados: "\u{1F6A8} Riscos Cr\xEDticos Identificados",
        PerguntasParaAInstituiO: "\u{1F4AC} Perguntas para a Institui\xE7\xE3o",
        notaDeAuditoria: "Nota de Auditoria",
        gerarRelatRioTCnico: "Gerar Relat\xF3rio T\xE9cnico",
        anLiseDeSeguranA: "An\xE1lise de Seguran\xE7a",
        gestODeEventos: "Gest\xE3o de Eventos",
        termosDeUso: "Termos de Uso",
        ferramentasIA: "Ferramentas IA",
        histRicoAnalTico: "Hist\xF3rico Anal\xEDtico",
        fazendoAsMalas: "Fazendo as Malas",
        monitorDeVisO: "Monitor de Vis\xE3o",
        investimentoEstimado: "Investimento estimado:",
        ouvirDetalhes: "Ouvir Detalhes",
        proteOPersonalizadaParaCadaPerfil: "Prote\xE7\xE3o personalizada para cada perfil",
        estamosPreparandoOsAcessRiosParaEstePerf: "Estamos preparando os acess\xF3rios para este perfil.",
        aoInstalarAcessRiosDeSeguranASigaSempreA: "Ao instalar acess\xF3rios de seguran\xE7a, siga sempre as instru\xE7\xF5es do fabricante\n                            e verifique periodicamente se est\xE3o bem fixados.",
        olComoPossoAjudar: "Ol\xE1! Como posso ajudar?",
        tireDVidasSobreSeguranADomSticaPrevenODe: "Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o de acidentes e primeiros socorros.",
        respondendo: "Respondendo...",
        assistenteDeVoz: "Assistente de Voz",
        converseNaturalmenteComNossaIAEspecializ: "Converse naturalmente com nossa IA especializada. Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o e primeiros socorros.",
        tireDVidasEmTempoReal: "Tire d\xFAvidas em tempo real",
        suporteParaEmergNcias: "Suporte para Emerg\xEAncias",
        dicasDePrevenO: "Dicas de Preven\xE7\xE3o",
        falarComAIAElevenLabs: "Falar com a IA (ElevenLabs)",
        digitarTexto: "Digitar Texto",
        comoFunciona: "Como funciona?",
        deixeEsteCelularNoQuartoDoBebOuAmbienteM: "Deixe este celular no quarto do beb\xEA ou ambiente monitorado.\n                            Se houver choro ou barulho alto, ele emitir\xE1 um alerta visual.",
        vigilaroAI: "Vigilaro AI",
        vigilaroEstPensando: "Vigilaro est\xE1 pensando...",
        vERIFICAODESEGURANA: "VERIFICA\xC7\xC3O DE SEGURAN\xC7A",
        sIM: "SIM",
        nO: "N\xC3O",
        nA: "N/A",
        eVITE: "EVITE",
        aTENO: "ATEN\xC7\xC3O",
        ReasExternas: "\xC1reas Externas",
        quintalPiscinaELazer: "Quintal, Piscina e Lazer",
        prXimoAmbiente: "Pr\xF3ximo Ambiente",
        voltar: "Voltar",
        cRTICO: "CR\xCDTICO",
        salvar: "Salvar",
        marqueOQueVocPossuiEmCasaParaAtivarOsAle: "Marque o que voc\xEA possui em casa para ativar os alertas de prote\xE7\xE3o personalizados.",
        pareceQueVocAindaNOTemRegistros: "Parece que voc\xEA ainda n\xE3o tem registros.",
        realizeVistoriasEMarqueOsItensComoSeguro: "Realize vistorias e marque os itens como Seguros para construir seu hist\xF3rico.",
        marcadoComoSeguro: "Marcado como Seguro \u2713",
        indiqueOQueExisteNaSuaCasa: "Indique o que existe na sua casa",
        salvarMapeamento: "Salvar Mapeamento",
        selecioneUmaCategoria: "Selecione uma categoria",
        aCaixaDeFerramentasEstVaziaEstrutureSeus: "A caixa de ferramentas est\xE1 vazia. Estruture seus kits de emerg\xEAncia para uma resposta r\xE1pida.",
        paraProtegermosSuaFamLiaPrecisamosConhec: "Para protegermos sua fam\xEDlia, precisamos conhecer sua casa e quem mora nela.\n              Responda apenas uma vez!",
        ondeVocMora: "Onde voc\xEA mora?",
        quantosAndares: "Quantos andares?",
        ReasExternasLazer: "\xC1reas Externas & Lazer",
        estruturasRiscosInternos: "Estruturas & Riscos Internos",
        prioridadesDeSeguranA: "Prioridades de Seguran\xE7a \u{1F6A8}",
        oQueMaisTePreocupaHoje: "O que mais te preocupa hoje?",
        proteEsJInstaladas: "Prote\xE7\xF5es J\xE1 Instaladas \u2705",
        checklistsDeSeguranA: "Checklists de Seguran\xE7a",
        suaCasaAindaNOFoiMapeada: "Sua casa ainda n\xE3o foi mapeada",
        paraCriarChecklistPersonalizadosPrecisam: "Para criar checklist personalizados, precisamos saber o que existe na sua casa (Piscina? Escadas? Quintal?).",
        iniciarMapeamentoDaCasa: "Iniciar Mapeamento da Casa",
        oQueTenhoAtivos: "O Que Tenho (Ativos)",
        inventRioDeRisco: "Invent\xE1rio de Risco",
        mapeie25ItensPerigososAirFryerVidrosEsca: "Mapeie 25+ itens perigosos (Air Fryer, Vidros, Escadas...) para ativar a prote\xE7\xE3o inteligente.",
        mapear: "Mapear",
        ajustarAmbientesMapeados: "Ajustar Ambientes Mapeados",
        adicionarOutraResidNcia: "Adicionar Outra Resid\xEAncia",
        riscosPrevenOEOQueFazerEmCasoDeAcidente: "Riscos, preven\xE7\xE3o e o que fazer em caso de acidente",
        conteDoNOEncontrado: "Conte\xFAdo n\xE3o encontrado.",
        resumoOtimizadoRiscoAO: "Resumo Otimizado (Risco + A\xE7\xE3o)",
        lembreSeAPrevenOAtivaDependeDeVerificaOC: "Lembre-se: A preven\xE7\xE3o ativa depende de verifica\xE7\xE3o constante.",
        regrasDeOuro: "Regras de Ouro",
        risco: "Risco:",
        ePIs: "EPIs:",
        cuidado: "Cuidado:",
        estejaPreparadoQuandoPrecisar: "Esteja preparado quando precisar.",
        montarEsteKit: "Montar este Kit",
        cultivoSeguro: "Cultivo Seguro",
        APrTicaDaJardinagemEOCultivoDeHortasEmCa: '"A pr\xE1tica da jardinagem e o cultivo de hortas em casa s\xE3o atividades terap\xEAuticas. O equil\xEDbrio entre equipamento correto e seguran\xE7a \xE9 fundamental."',
        preparaODoSolo: "Prepara\xE7\xE3o do Solo",
        podaEManutenO: "Poda e Manuten\xE7\xE3o",
        regaELimpeza: "Rega e Limpeza",
        proteOObrigatRia: "Prote\xE7\xE3o \xE9 Obrigat\xF3ria!",
        Luvas: "\u2022 Luvas:",
        CalAdosFechados: "\u2022 Cal\xE7ados Fechados:",
        Roupas: "\u2022 Roupas:",
        ProteOSolar: "\u2022 Prote\xE7\xE3o Solar:",
        ProdutosQuMicos: "\u2623\uFE0F Produtos Qu\xEDmicos",
        embalagemOriginal: "embalagem original",
        PlantasTXicas: "\u{1F33F} Plantas T\xF3xicas",
        comigoNinguMPode: "Comigo-ningu\xE9m-pode",
        bicoDePapagaio: "Bico-de-papagaio",
        AnimaisPeOnhentos: "\u{1F577}\uFE0F Animais Pe\xE7onhentos",
        entulhosAtraemEscorpiEsEAranhasMantenhaO: "Entulhos atraem escorpi\xF5es e aranhas. Mantenha o quintal limpo e examine cal\xE7ados e luvas antes de usar.",
        PrevenirEmCasa: "\u{1F4F0} Prevenir em Casa",
        lerArtigoCompleto: "Ler artigo completo",
        compartilharEsteArtigo: "Compartilhar este artigo",
        iNTOXICAO: "INTOXICA\xC7\xC3O?",
        ligueImediatamente08007226001: "Ligue imediatamente: 0800 722 6001",
        DescriO: "\u{1F4CB} Descri\xE7\xE3o",
        PartesTXicas: "\u2623\uFE0F Partes T\xF3xicas",
        SintomasEmHumanos: "\u{1F464} Sintomas em Humanos",
        SintomasEmPetsCEsEGatos: "\u{1F43E} Sintomas em Pets (C\xE3es e Gatos)",
        PrimeirosSocorros: "\u{1FA79} Primeiros Socorros",
        OQUEFAZER: "\u2705 O QUE FAZER:",
        OQUENOFAZER: "\u274C O QUE N\xC3O FAZER:",
        ComoIdentificar: "\u{1F50D} Como Identificar",
        OndeEncontrada: "\u{1F4CD} Onde \xE9 Encontrada",
        AlternativasSeguras: "\u{1F331} Alternativas Seguras",
        considereSubstituirPorEstasPlantasNOTXic: "Considere substituir por estas plantas n\xE3o-t\xF3xicas:",
        ComoPrevenir: "\u{1F6E1}\uFE0F Como Prevenir",
        MantenhaAPlantaForaDoAlcanceDeCrianAsEPe: "\u2022 Mantenha a planta fora do alcance de crian\xE7as e pets",
        EnsineCrianAsANOTocarOuComerPlantas: "\u2022 Ensine crian\xE7as a n\xE3o tocar ou comer plantas",
        UseLuvasAoManusearAPlanta: "\u2022 Use luvas ao manusear a planta",
        ConsidereRemovLaSeHouverCrianAsPequenasO: "\u2022 Considere remov\xEA-la se houver crian\xE7as pequenas ou pets",
        MantenhaONMeroDoCentroDeIntoxicaOSalvo08: "\u2022 Mantenha o n\xFAmero do Centro de Intoxica\xE7\xE3o salvo: 0800 722 6001",
        lIGARPARACENTRODEINTOXICAO: "LIGAR PARA CENTRO DE INTOXICA\xC7\xC3O",
        riscosInvisVeisEmCasa: "Riscos invis\xEDveis em casa",
        sobre: "Sobre",
        frequNciaDeUso: "Frequ\xEAncia de uso",
        maisVulnerVeis: "Mais vulner\xE1veis",
        riscosIdentificados: "Riscos Identificados",
        comoPrevenir: "Como Prevenir",
        oQueFazerEmCasoDeAcidente: "O Que Fazer em Caso de Acidente",
        vocSabia: "Voc\xEA sabia?",
        teoriaDoFogo: "Teoria do Fogo",
        conceitosEssenciaisDePrevenO: "Conceitos essenciais de preven\xE7\xE3o.",
        FRiasEMomentosDeLazerExigemAtenORedobrad: '"F\xE9rias e momentos de lazer exigem aten\xE7\xE3o redobrada. Descubra como prevenir acidentes fora de casa."',
        cOMOPREVENIR: "COMO PREVENIR",
        pRIMEIROSSOCORROS: "PRIMEIROS SOCORROS",
        utensLiosDomSticos: "Utens\xEDlios Dom\xE9sticos",
        seguranANaCozinhaEReasDeServiO: "Seguran\xE7a na cozinha e \xE1reas de servi\xE7o.",
        requerTrava: "Requer Trava",
        RiscosPrincipais: "\u26A0\uFE0F Riscos Principais",
        PrevenO: "\u{1F6E1}\uFE0F Preven\xE7\xE3o",
        eletrodomesticos: "Eletrodomesticos",
        guiaDeSeguranAParaEquipamentosDomSticos: "Guia de seguran\xE7a para equipamentos dom\xE9sticos.",
        RedeDeApoio: "\u{1F4A1} Rede de Apoio",
        mantenhaEssaListaAtualizadaEmUmaEmergNci: "Mantenha essa lista atualizada. Em uma emerg\xEAncia, esses contatos aparecer\xE3o no topo.",
        nome: "Nome *",
        detalheRelacionamento: "Detalhe / Relacionamento",
        telefone: "Telefone *",
        tipo: "Tipo *",
        cancelar: "Cancelar",
        adicionarContato: "Adicionar Contato",
        SMS: "\u{1F4AC} SMS",
        nenhumContatoNestaLista: "Voc\xEA ainda n\xE3o tem contatos nesta lista",
        centralDeAOImediata: "Central de A\xE7\xE3o Imediata",
        guiasPassoAPassoRPidosParaEngasgoEnvenen: "Guias passo a passo r\xE1pidos para Engasgo, Envenenamento e Quedas.",
        cIATOXLIGUE08007226001: "CIATOX - LIGUE 0800 722 6001",
        buscarClNicas24hNaRegiO: "Buscar Cl\xEDnicas 24h na Regi\xE3o",
        protocolosDetectados: "Protocolos Detectados",
        atenOAveNaCasa: "Aten\xE7\xE3o: Ave na Casa",
        riscoRespiratRioCrTicoTeflonVapores: "Risco Respirat\xF3rio Cr\xEDtico (Teflon/Vapores)",
        carteirinhaDeVacinaO: "Carteirinha de Vacina\xE7\xE3o",
        histRicoParaApresentarAoVeterinRio: "Hist\xF3rico para apresentar ao Veterin\xE1rio.",
        fAAAGORA: "FA\xC7A AGORA:",
        sAMU192: "SAMU: 192",
        bOMBEIROS193: "BOMBEIROS 193",
        sAIR: "SAIR",
        oQUEACONTECEU: "O QUE ACONTECEU?",
        reviseOsItensAbaixoParaRestaurarASeguran: "Revise os itens abaixo para restaurar a seguran\xE7a do lar.",
        NdiceRestauradoEstimado: "\xCDndice restaurado estimado",
        concluirEVoltarAoDashboard: "Concluir e voltar ao Dashboard",
        kitParaEmergNcias: "Kit para Emerg\xEAncias",
        vitalParaSobrevivNciaEmCatStrofesNaturai: "Vital para sobreviv\xEAncia em cat\xE1strofes naturais como enchentes, deslizamentos e desmoronamentos, al\xE9m de inc\xEAndios. Deve garantir autonomia e seguran\xE7a por 72 horas.",
        checklistDoKit: "Checklist do Kit",
        verifiqueAValidadeDosAlimentosEGuaACada6: "Verifique a validade dos alimentos e \xE1gua a cada 6 meses.",
        kitPrimeirosSocorros: "Kit Primeiros Socorros",
        essencialParaOAtendimentoImediatoDeLesEs: "Essencial para o atendimento imediato de les\xF5es antes da chegada de ajuda profissional. Estar equipado permite limpar ferimentos, conter sangramentos e evitar infec\xE7\xF5es, fazendo a diferen\xE7a na recupera\xE7\xE3o.",
        conteDoRecomendado: "Conte\xFAdo Recomendado",
        mantenhaEsteKitEmLocalFrescoSecoEForaDoA: "Mantenha este kit em local fresco, seco e fora do alcance de crian\xE7as, mas de f\xE1cil acesso para adultos.",
        seuPortaRemDios: "Seu Porta Rem\xE9dios",
        umaFarmCiaDomSticaOrganizadaGaranteAcess: "Uma farm\xE1cia dom\xE9stica organizada garante acesso r\xE1pido a medicamentos. Mantenha controle rigoroso de validade e armazenamento para evitar intoxica\xE7\xF5es e garantir efic\xE1cia.",
        listaDeItensEssenciais: "Lista de Itens Essenciais",
        mantenhaRemDiosLongeDoAlcanceDeCrianAsEV: "Mantenha rem\xE9dios longe do alcance de crian\xE7as e verifique a validade regularmente.",
        terOsKitsCertosEProntosEMOTransformaOCao: "Ter os kits certos e prontos e \xE0 m\xE3o, transforma o caos em controle protegendo sua fam\xEDlia.",
        mantenhaSeusKitsSempreAtualizadosEVerifi: "Mantenha seus kits sempre atualizados e verifique a validade dos itens a cada 6 meses.",
        NdiceAtual: "\xCDndice atual",
        riscoTemporRioDetectadoSigaAsRecomendaEs: "Risco tempor\xE1rio detectado \u2014 siga as recomenda\xE7\xF5es",
        recomendaEsPrincipais: "Recomenda\xE7\xF5es principais",
        RecolhaFerramentasAoFinalDoDia: "\u2022 Recolha ferramentas ao final do dia.",
        EviteImprovisarConexEsElTricas: "\u2022 Evite improvisar conex\xF5es el\xE9tricas.",
        MantenhaReasDeCirculaOLivres: "\u2022 Mantenha \xE1reas de circula\xE7\xE3o livres.",
        MantenhaASupervisOConstante: "\u2022 Mantenha a supervis\xE3o constante.",
        VerifiqueTrancasEPortEsRegularmente: "\u2022 Verifique trancas e port\xF5es regularmente.",
        AtenORedobradaComPiscinaECozinha: "\u2022 Aten\xE7\xE3o redobrada com piscina e cozinha.",
        SigaOChecklistDeSeguranA: "\u2022 Siga o checklist de seguran\xE7a.",
        revisarChecklist: "Revisar checklist",
        encerrarSituaO: "Encerrar situa\xE7\xE3o",
        preparaOSalvaVidas: "Prepara\xE7\xE3o salva vidas",
        "3min": "3min",
        tempoParaEvacuar: "Tempo para evacuar",
        treinarPorAno: "Treinar por ano",
        monteSeuPlano: "Monte seu Plano:",
        prevenO3DAplicada: "Preven\xE7\xE3o 3D Aplicada",
        emCasoDeIncNdio: "Em Caso de Inc\xEAndio",
        lembreSe: "Lembre-se",
        aVidaVemPrimeiroObjetosPodemSerSubstituD: "A vida vem primeiro! Objetos podem ser substitu\xEDdos. NUNCA volte para uma casa em chamas.",
        respostaRPidaEmEmergNcias: "Resposta r\xE1pida em emerg\xEAncias",
        cOMOAGIR: "COMO AGIR",
        aTENOVETERINRIA: "ATEN\xC7\xC3O VETERIN\xC1RIA",
        oQUEFAZER: "O QUE FAZER",
        oQUENOFAZER: "O QUE N\xC3O FAZER",
        qUANDOCHAMARAJUDA: "QUANDO CHAMAR AJUDA",
        fichaMDica: "Ficha M\xE9dica",
        enviarPorWhatsApp: "Enviar por WhatsApp",
        copiarFicha: "Copiar Ficha",
        meusContatos: "Meus Contatos",
        redeDeApoioPerfil: "Rede de Apoio Perfil",
        aRedeDeApoioPrioritRiaEstVaziaCadastreCo: "A rede de apoio priorit\xE1ria est\xE1 vazia. Cadastre contatos t\xE1ticos essenciais.",
        AdicionarNovo: "+ Adicionar Novo",
        novoContato: "Novo Contato",
        caracterSticas: "Caracter\xEDsticas:",
        Dicas: "\u{1F4A1} Dicas:",
        OndeEncontrar: "\u{1F6D2} Onde encontrar:",
        ePIsDomSticos: "EPIs Dom\xE9sticos",
        proteOParaAtividadesDoDiaADia: "Prote\xE7\xE3o para atividades do dia a dia",
        categoriasDeProteO: "Categorias de Prote\xE7\xE3o",
        quandoUsar: "Quando Usar?",
        vejaQuaisEPIsSORecomendadosParaCadaAtivi: "Veja quais EPIs s\xE3o recomendados para cada atividade",
        mantenhaSeusEPIsOrganizadosEEmBomEstadoS: "Mantenha seus EPIs organizados e em bom estado. Substitua itens danificados imediatamente.",
        nenhumConteDoDisponVelNoMomento: "Sem conte\xFAdo por aqui ainda.",
        tPicoDeSeguranA: "T\xF3pico de Seguran\xE7a",
        eSPECIALIDADE: "ESPECIALIDADE",
        pARAQUEM: "PARA QUEM?",
        dATAEHORRIO: "DATA E HOR\xC1RIO",
        lOCALOPCIONAL: "LOCAL (OPCIONAL)",
        oBSERVAESOPCIONAL: "OBSERVA\xC7\xD5ES (OPCIONAL)",
        aNOTAESPSCONSULTA: "ANOTA\xC7\xD5ES P\xD3S-CONSULTA",
        rECOMENDAES: "RECOMENDA\xC7\xD5ES",
        rECEITAS: "RECEITAS",
        eNCAMINHAMENTOSGUIAS: "ENCAMINHAMENTOS/GUIAS",
        pRXIMORETORNO: "PR\xD3XIMO RETORNO",
        escolhaOTipoDeEventoQueDesejaAdicionar: "Escolha o tipo de evento que vai adicionar:",
        nOMEDOEXAME: "NOME DO EXAME",
        lOCAL: "LOCAL",
        aNOTAESPSEXAME: "ANOTA\xC7\xD5ES P\xD3S-EXAME",
        rESULTADO: "RESULTADO",
        rECEITURIO: "RECEITU\xC1RIO",
        rETORNO: "RETORNO",
        cONDUTASINSTRUES: "CONDUTAS/INSTRU\xC7\xD5ES",
        cATEGORIA: "CATEGORIA",
        dESCRIO: "DESCRI\xC7\xC3O",
        exAlergiaAPenicilinaCirurgiaDeApendicite: "Ex: Alergia a penicilina, Cirurgia de apendicite em 2020, etc.",
        sugestEsRPidas: "Sugest\xF5es R\xE1pidas:",
        dATA: "DATA",
        permitirCompartilhamento: "Permitir compartilhamento",
        esteRegistroPoderSerIncluDoNaFichaMDicaC: "Este registro poder\xE1 ser inclu\xEDdo na ficha m\xE9dica compartilh\xE1vel",
        tIPODEPROCEDIMENTO: "TIPO DE PROCEDIMENTO",
        nOMEDOPROCEDIMENTO: "NOME DO PROCEDIMENTO",
        aNOTAESPSPROCEDIMENTO: "ANOTA\xC7\xD5ES P\xD3S-PROCEDIMENTO",
        tIPODETRATAMENTO: "TIPO DE TRATAMENTO",
        nOMEDOTRATAMENTO: "NOME DO TRATAMENTO",
        fREQUNCIA: "FREQU\xCANCIA",
        dATADEINCIO: "DATA DE IN\xCDCIO",
        toqueParaConferir: "Toque para conferir",
        remDios: "Rem\xE9dios",
        veterinRios: "Veterin\xE1rios",
        dossiPet: "Dossi\xEA Pet",
        adicioneMedicaEsEVacinasDoSeuPetAqui: "Adicione medica\xE7\xF5es e vacinas do seu pet aqui.",
        tosaVacinasOuConsultasVeterinRiasAparece: "Tosa, vacinas ou consultas veterin\xE1rias aparecer\xE3o aqui.",
        cadastreUmPerfilDePetNoGerenciadorParaUs: "Cadastre um perfil de Pet no Gerenciador para usar este m\xF3dulo.",
        sobreOCompartilhamento: "Sobre o compartilhamento",
        selecioneQuaisInformaEsDesejaIncluirNaFi: "Escolha quais informa\xE7\xF5es quer incluir na ficha m\xE9dica. D\xE1 pra compartilhar por WhatsApp, email ou copiar o texto.",
        oQUEINCLUIR: "O QUE INCLUIR",
        medicamentosAtuais: "Medicamentos Atuais",
        tratamentosEmAndamento: "Tratamentos em Andamento",
        agendaMDica: "Agenda M\xE9dica",
        histRicoMDico: "Hist\xF3rico M\xE9dico",
        apenasRegistrosMarcadosComoCompartilhVei: "Apenas registros marcados como compartilh\xE1veis",
        pRVIA: "PR\xC9VIA",
        copiar: "Copiar",
        compartilharAgora: "Compartilhar Agora",
        histRicoDeAuditorias: "Hist\xF3rico de Auditorias",
        nenhumaAuditoriaRegistradaRealizeAPrimei: "Voc\xEA ainda n\xE3o fez nenhuma vistoria nesta resid\xEAncia. Fa\xE7a a primeira pra come\xE7ar o hist\xF3rico de seguran\xE7a.",
        lD50DoseLetalOral: "LD50 (dose letal oral)",
        carcinogenicidade: "Carcinogenicidade",
        genotoxicidade: "Genotoxicidade",
        toxicidadeReprodutiva: "Toxicidade Reprodutiva",
        fonteEPAComputationalToxicology: "Fonte: EPA Computational Toxicology",
        seguranAEmProdutosParaSuaFamLia: "Seguran\xE7a em produtos para sua fam\xEDlia",
        escanearCDigoDeBarras: "Escanear C\xF3digo de Barras",
        aponteACMeraParaIdentificarOProduto: "Aponte a c\xE2mera para identificar o produto",
        seuPerfilFamiliar: "Seu perfil familiar",
        alertasPersonalizadosSerOExibidosNosResu: "Alertas personalizados ser\xE3o exibidos nos resultados.",
        cONSULTASRECENTES: "CONSULTAS RECENTES",
        cIATOXEmergNciaToxicolGica: "CIATOX \u2014 Emerg\xEAncia Toxicol\xF3gica",
        "08007226001Gratuito24h": "0800 722 6001 (Gratuito, 24h)",
        metodologia3D: "Metodologia 3D",
        conceitosFundamentais: "Conceitos Fundamentais",
        gUIADEUSO: "GUIA DE USO",
        paraQueServe: "Para que serve:",
        importNcia: "Import\xE2ncia:",
        seNOTomar: "Se n\xE3o tomar:",
        verReceitaDigital: "Ver Receita Digital",
        editar: "Editar",
        remover: "Remover",
        nenhumMedicamentoComHorRioDefinidoConfig: "Nenhum rem\xE9dio com hor\xE1rio marcado. Cadastre os hor\xE1rios pra n\xE3o esquecer nenhuma dose.",
        adicionarRemDio: "Adicionar Rem\xE9dio",
        fotografarCaixaRemDio: "Fotografar Caixa/Rem\xE9dio",
        SeguranAVisual: "(Seguran\xE7a Visual)",
        analisandoRemDio: "Analisando rem\xE9dio...",
        anexarReceitaOpcional: "Anexar Receita (Opcional)",
        FotoDoDocumento: "(Foto do Documento)",
        nomeDoMedicamento: "Nome do Medicamento",
        dosagem: "Dosagem",
        quemVaiTomar: "Quem vai tomar?",
        frequNciaHoras: "Frequ\xEAncia (horas)",
        dataEHoraDoInCio: "Data e Hora do In\xEDcio",
        paraQueServeIndicaO: "Para que serve? (Indica\xE7\xE3o)",
        porQueImportanteOpcional: "Por que \xE9 importante? (Opcional)",
        oQueAconteceSeNOTomarOpcional: "O que acontece se n\xE3o tomar? (Opcional)",
        estoqueInicialOpcional: "Estoque Inicial (Opcional)",
        dicaParaGotasTenteEstimarQuantasDosesOuM: "Dica: Para gotas, tente estimar quantas doses ou ml restam.",
        agendarTratamento: "Agendar Tratamento",
        caixasEBulas: "Caixas e Bulas",
        pLulasEFrascos: "P\xEDlulas e Frascos",
        entendi: "Entendi",
        vigilaroCareV600NeoBuild2026: "Vigilaro Care v6.0.0 (Neo Build 2026)",
        mobilidade: "Mobilidade",
        trNsitoESeguranA: "Tr\xE2nsito e Seguran\xE7a.",
        OQueDRV: "\u{1F697} O que \xE9 DRV?",
        oBRIGATRIOPORLEI: "OBRIGAT\xD3RIO POR LEI",
        QualDispositivoMeuFilhoPrecisa: "\u{1F4CA} Qual dispositivo meu filho precisa?",
        selecioneAIdadeParaVerODispositivoRecome: "Selecione a idade para ver o dispositivo recomendado:",
        PosiONoVeCulo: "\u{1F4CD} Posi\xE7\xE3o no Ve\xEDculo",
        ComoInstalar: "\u{1F527} Como Instalar",
        ComoUsar: "\u{1F476} Como Usar",
        ErrosComunsEVITE: "\u274C Erros Comuns (EVITE!)",
        LegislaO: "\u2696\uFE0F Legisla\xE7\xE3o",
        OQueMobilidadeAtiva: "\u{1F6B4} O que \xE9 Mobilidade Ativa?",
        benefCios: "Benef\xEDcios:",
        idadeDeAutonomia: "Idade de Autonomia",
        porQu: "Por qu\xEA?",
        EquipamentosNecessRios: "\u{1F6E1}\uFE0F Equipamentos Necess\xE1rios",
        LocaisApropriados: "\u2705 Locais Apropriados",
        LocaisAEvitar: "\u274C Locais a Evitar",
        RegrasDeSeguranA: "\u26A0\uFE0F Regras de Seguran\xE7a",
        ManutenO: "\u{1F527} Manuten\xE7\xE3o",
        autonomiaDeMobilidade: "Autonomia de Mobilidade",
        RegrasGeraisDeSeguranA: "\u{1F4CB} Regras Gerais de Seguran\xE7a",
        EntendendoASinalizaO: "\u{1F6A6} Entendendo a Sinaliza\xE7\xE3o",
        FatoresDeRisco: "\u26A0\uFE0F Fatores de Risco",
        eviteViasCom: "Evite vias com:",
        SeguranANoite: "\u{1F319} Seguran\xE7a \xE0 Noite",
        CuidadosComCrianAs: "\u{1F476} Cuidados com Crian\xE7as",
        idadeMNima: "Idade M\xEDnima",
        RegrasParaPassageiro: "\u{1F464} Regras para Passageiro",
        RegrasParaPiloto: "\u{1F3CD}\uFE0F Regras para Piloto",
        RiscosEspecFicosDasMotos: "\u26A0\uFE0F Riscos Espec\xEDficos das Motos",
        EmCasoDeAcidente: "\u{1F6A8} Em caso de acidente",
        bombeiros193: "Bombeiros: 193",
        pRF191: "PRF: 191",
        MicromobilidadeElTrica: "\u26A1 Micromobilidade El\xE9trica",
        categoriasNoCTB: "Categorias no CTB",
        ondeAndar: "Onde andar:",
        eNasCalAdas: "E nas cal\xE7adas?",
        RiscosDeAcidentes: "\u26A0\uFE0F Riscos de Acidentes",
        monitoramentoPreventivoProtocolosParaOSe: "Monitoramento Preventivo: Protocolos para o seu lar",
        iniciarVerificaO: "Iniciar Verifica\xE7\xE3o",
        finalizarProtocolo: "Finalizar Protocolo",
        dISTRIBUIODECONFORMIDADE: "DISTRIBUI\xC7\xC3O DE CONFORMIDADE",
        nenhumaPendNciaIdentificadaOAmbienteEstS: "Nenhuma pend\xEAncia por aqui. Seu ambiente est\xE1 seguro.",
        fechar: "Fechar",
        toxina: "Toxina:",
        sintomas: "Sintomas:",
        "1CompromissoComSuaPrivacidade": "1. Compromisso com sua Privacidade",
        oVigilaroCareRespeitaProfundamenteSuaPri: "O Vigilaro Care respeita profundamente sua privacidade. Este documento explica como tratamos seus dados pessoais, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD - Lei n\xBA 13.709/2018).",
        "2ArmazenamentoLocalOffline": "2. Armazenamento Local (Offline)",
        seusDadosFicamComVoc: "Seus dados ficam com voc\xEA:",
        eXCLUSIVAMENTENAMEMRIADOSEUDISPOSITIVO: "EXCLUSIVAMENTE NA MEM\xD3RIA DO SEU DISPOSITIVO",
        nSNOTemosCPiaDeles: "n\xF3s n\xE3o temos c\xF3pia deles",
        "3ColetaDeDados": "3. Coleta de Dados",
        "4PermissEsDoDispositivo": "4. Permiss\xF5es do Dispositivo",
        cMera: "C\xE2mera:",
        galeria: "Galeria:",
        notificaEs: "Notifica\xE7\xF5es:",
        microfone: "Microfone:",
        "5ExclusODeDados": "5. Exclus\xE3o de Dados",
        comoOsDadosEstONoSeuAparelhoVocTemTotalC: 'Como os dados est\xE3o no seu aparelho, voc\xEA tem total controle. Para excluir tudo permanentemente, basta usar a op\xE7\xE3o "Resetar Aplicativo" no Menu ou desinstalar o app.',
        Voltar: "\u2190 Voltar",
        cDigoDeBarras: "C\xF3digo de Barras:",
        Componentes: "\u{1F9EA} Componentes",
        RiscosEPerigos: "\u26A0\uFE0F Riscos e Perigos",
        SeINGERIU: "\u{1F4A7} Se INGERIU:",
        ContatoComOLHOS: "\u{1F441}\uFE0F Contato com OLHOS:",
        ContatoComPELE: "\u270B Contato com PELE:",
        INALAO: "\u{1F4A8} INALA\xC7\xC3O:",
        ComoPrevenirAcidentes: "\u{1F6E1}\uFE0F Como Prevenir Acidentes",
        iMPORTANTE: "IMPORTANTE",
        emCasoDeAcidenteLigueIMEDIATAMENTEParaOC: "Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.\n            Tenha em m\xE3os a embalagem do produto para informar os componentes.",
        lIGARPARACIATOX: "LIGAR PARA CIATOX",
        vNCULOCOMARESIDNCIA: "V\xCDNCULO COM A RESID\xCANCIA",
        tIPOSANGUNEO: "TIPO SANGU\xCDNEO",
        rAAMESTIO: "RA\xC7A / MESTI\xC7O",
        cONDIESHISTRICO: "CONDI\xC7\xD5ES & HIST\xD3RICO",
        redeDeApoioSOS: "Rede de Apoio (SOS)",
        quemVamosProteger: "Quem vamos proteger?",
        baseadoNaMetodologiaPrevenO3DDigaQuantas: "Baseado na Metodologia Preven\xE7\xE3o 3D, diga quantas pessoas vivem na casa. Criaremos perfis para voc\xEA detalhar a seguir.",
        hUMANOS: "HUMANOS",
        aNIMAIS: "ANIMAIS",
        definirPerfis: "Definir Perfis",
        moradoresEPets: "Moradores e Pets",
        nenhumMoradorVinculado: "Voc\xEA ainda n\xE3o vinculou moradores.",
        ambientesMapeados: "Ambientes mapeados",
        nenhumAmbienteMapeado: "Voc\xEA ainda n\xE3o mapeou ambientes.",
        dNADeSeguranARiscosInerentes: "DNA de Seguran\xE7a (Riscos Inerentes)",
        atualizarMapeamentoEstrutural: "Atualizar Mapeamento Estrutural",
        resumoEstratGicoPorResidNcia: "Resumo estrat\xE9gico por resid\xEAncia",
        nenhumaResidNciaEncontrada: "Voc\xEA ainda n\xE3o cadastrou nenhuma resid\xEAncia.",
        carregandoPerfilPadronizado: "Carregando perfil padronizado...",
        ImplicaOSeNOResolvido: "\u26A0 Implica\xE7\xE3o se n\xE3o resolvido",
        vouResolver: "Vou resolver",
        reconheOORisco: "Reconhe\xE7o o risco",
        gerandoSeuRelatRioPersonalizado: "Gerando Seu Relat\xF3rio Personalizado...",
        cruzandoDadosDePerfilSaDeMoradiaEVistori: "Cruzando dados de perfil, sa\xFAde, moradia e vistoria.",
        riscoS: "risco(s)",
        oMorador: "O Morador",
        oAmbiente: "O Ambiente",
        planoDeAO: "Plano de A\xE7\xE3o",
        irregularidadesAtivas: "Irregularidades Ativas",
        requeremSuaAtenO: "Requerem sua aten\xE7\xE3o",
        reconhecidosPeloResponsVel: "Reconhecidos pelo Respons\xE1vel",
        registradoComDataENome: "Registrado com data e nome",
        nOVerificados: "N\xE3o Verificados",
        completeAVistoriaParaDiagnSticoPreciso: "Complete a vistoria para diagn\xF3stico preciso",
        outrosMoradores: "Outros moradores",
        pet: "Pet",
        carregandoAtividades: "Carregando atividades...",
        comeceAUsarOVigilaroParaVerSeuHistRicoAq: "Comece a usar o Vigilaro para ver seu hist\xF3rico aqui.",
        tipoDeReforma: "Tipo de Reforma",
        ondeAObraEstAcontecendo: "Onde a obra est\xE1 acontecendo?",
        nVELDESEGURANA: "N\xCDVEL DE SEGURAN\xC7A",
        tOTAL: "TOTAL",
        cRTICOS: "CR\xCDTICOS",
        nenhumaInstituiOAtingirPontuaOMXimaEmTod: "Nenhuma institui\xE7\xE3o atingir\xE1 pontua\xE7\xE3o m\xE1xima em todos os itens. Priorize as interven\xE7\xF5es nos quesitos classificados como cr\xEDticos.\n                        e questione como a escola pretende melhorar os pontos fracos identificados.",
        compartilharRelatRio: "Compartilhar Relat\xF3rio",
        continuarAvaliaO: "Continuar Avalia\xE7\xE3o",
        escolaSegura: "Escola Segura",
        checklistDeAvaliaO: "Checklist de Avalia\xE7\xE3o",
        pROGRESSOGERAL: "PROGRESSO GERAL",
        iTENSCRTICOS: "ITENS CR\xCDTICOS",
        voltarParaCategorias: "Voltar para Categorias",
        ITEMCRTICO: "\u26A0\uFE0F ITEM CR\xCDTICO",
        sTATUSDESEGURANA: "STATUS DE SEGURAN\xC7A",
        gERAL: "GERAL",
        esteRelatRioSubsidiRioENOSubstituiAVisto: "Este relat\xF3rio \xE9 subsidi\xE1rio e n\xE3o substitui a vistoria oficial do Corpo de Bombeiros ou Vigil\xE2ncia Sanit\xE1ria. \n                        Qualquer falha em itens **CR\xCDTICOS** deve ser tratada como prioridade m\xE1xima pela administra\xE7\xE3o da ILPI.",
        revisarRespostas: "Revisar Respostas",
        asiloSeguro: "Asilo Seguro",
        vistoriaTCnicoSNior: "Vistoria T\xE9cnico-S\xEAnior",
        cRTICOSEMCONFORMIDADE: "CR\xCDTICOS EM CONFORMIDADE",
        checklistDeVerificaO: "Checklist de Verifica\xE7\xE3o",
        verificarSeguranA: "Verificar Seguran\xE7a",
        pAREIMEDIATAMENTE: "PARE IMEDIATAMENTE",
        voltarECorrigir: "Voltar e Corrigir",
        estouCienteAssumirRisco: "Estou ciente (Assumir Risco)",
        aTIVIDADELIBERADA: "ATIVIDADE LIBERADA",
        sigaAsMedidasRecomendadas: "Siga as medidas recomendadas:",
        finalizar: "Finalizar",
        recomendaEs: "Recomenda\xE7\xF5es",
        emCasoDeExposiO: "Em Caso de Exposi\xE7\xE3o",
        fonteOrientaEsDeSeguranAEProtocolosDeEme: "Fonte: Orienta\xE7\xF5es de seguran\xE7a e protocolos de emerg\xEAncia (CIATOX/Fabricante).",
        detalhesDoProduto: "Detalhes do Produto",
        pROTOCOLOSOCULTOS: "PROTOCOLOS OCULTOS",
        confidencialLeiaApenasSeEstiverSozinho: "Confidencial - Leia apenas se estiver sozinho",
        mODOPNICODISCRETO: "MODO P\xC2NICO DISCRETO",
        emSituaEsDeCoaOOndeVocNOPodeRevelarQueEs: "Em situa\xE7\xF5es de coa\xE7\xE3o onde voc\xEA n\xE3o pode revelar que est\xE1 pedindo ajuda:",
        sOS: "SOS",
        "3Segundos": "3 segundos",
        estaTelaNOAparecerNovamenteParaSuaSegura: "Esta tela n\xE3o aparecer\xE1 novamente para sua seguran\xE7a.",
        mEMORIZAREDESTRUIRMENSAGEM: "MEMORIZAR E DESTRUIR MENSAGEM",
        rISCOS: "RISCOS",
        pREVENO: "PREVEN\xC7\xC3O",
        eMERGNCIA: "EMERG\xCANCIA",
        dICASEXTRAS: "DICAS EXTRAS",
        viagemSegura: "Viagem Segura",
        carroHotelAviOEDocumentos: "Carro, hotel, avi\xE3o e documentos.",
        lazerDiversO: "Lazer & Divers\xE3o",
        aproveiteOsMomentosDeLazerComSeguranA: "Aproveite os momentos de lazer com seguran\xE7a.",
        monitoreRiscosTemporRios: "Monitore riscos tempor\xE1rios",
        selecioneOEvento: "Selecione o Evento",
        ajustaremosAsRecomendaEsDeSeguranAComBas: "Ajustaremos as recomenda\xE7\xF5es de seguran\xE7a com base no cen\xE1rio escolhido.",
        vigilaroCare: "Vigilaro Care",
        "1NaturezaInformativa": "1. Natureza Informativa",
        oAplicativoVigilaroCareUmaFerramentaDeAu: "O aplicativo Vigilaro Care \xE9 uma ferramenta de aux\xEDlio e preven\xE7\xE3o. Todo o conte\xFAdo, incluindo checklists, guias de primeiros socorros e an\xE1lises de IA, tem car\xE1ter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.",
        "2NOSubstituiProfissionais": "2. N\xE3o Substitui Profissionais",
        asInformaEsAquiContidasNOSubstituemEmHip: "As informa\xE7\xF5es aqui contidas N\xC3O substituem, em hip\xF3tese alguma, o diagn\xF3stico, aconselhamento ou tratamento por profissionais de sa\xFAde (m\xE9dicos, enfermeiros, socorristas) ou especialistas em seguran\xE7a.",
        "3EmCasoDeEmergNcia": "3. Em Caso de Emerg\xEAncia",
        "4LimitaODeResponsabilidade": "4. Limita\xE7\xE3o de Responsabilidade",
        osDesenvolvedoresDoVigilaroCareNOSeRespo: "Os desenvolvedores do Vigilaro Care n\xE3o se responsabilizam por quaisquer danos, les\xF5es ou perdas resultantes do uso das informa\xE7\xF5es fornecidas pelo aplicativo. A seguran\xE7a final do ambiente e das pessoas \xE9 de responsabilidade do usu\xE1rio.",
        "5InteligNciaArtificial": "5. Intelig\xEAncia Artificial",
        oRecursoDeScannerIAUtilizaInteligNciaArt: 'O recurso de "Scanner IA" utiliza intelig\xEAncia artificial para identificar poss\xEDveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu pr\xF3prio julgamento.',
        "6Privacidade": "6. Privacidade",
        caniveteSuODeSeguranA: "Canivete su\xED\xE7o de seguran\xE7a",
        resultadosSalvos: "Resultados salvos",
        eMBREVE: "EM BREVE",
        boaViagemSeguranAEmPrimeiroLugar: "Boa viagem! Seguran\xE7a em primeiro lugar. \u{1F9F3}",
        seguranANoSeuDestino: "Seguran\xE7a no seu destino",
        aquiVocTerUmChecklistCompletoParaInspeci: "Aqui voc\xEA ter\xE1 um checklist completo para inspecionar a seguran\xE7a do local assim que chegar \u2014 janelas, tomadas, piscinas, escadas, sa\xEDdas de emerg\xEAncia e muito mais.",
        inspeODeRetornoFimDaViagem: "Inspe\xE7\xE3o de Retorno (Fim da Viagem)",
        aHoraDeIrEmboraQuandoOCansaOBateEOsPiore: "A hora de ir embora \xE9 quando o cansa\xE7o bate e os piores esquecimentos acontecem. Fa\xE7a esta varredura pente-fino antes de entregar a chave.",
        checklistEssencial: "Checklist essencial",
        monteSeuKitEssencialDeViagemComFocoEmSaD: "Monte seu kit essencial de viagem com foco em sa\xFAde, higiene e primeiros socorros. Toque em cada categoria para expandir.",
        adapteEsteKitAoSeuDestinoENecessidadesCo: "Adapte este kit ao seu destino e necessidades. Consulte seu m\xE9dico antes de viajar.",
        ativeOModoViagemParaChecklistsDeSeguranA: "Ative o Modo Viagem para checklists de seguran\xE7a espec\xEDficos.",
        Lazer: "\u{1F334} Lazer",
        Trabalho: "\u{1F4BC} Trabalho",
        Sim: "\u{1F30D} Sim",
        Nacional: "\u{1F1E7}\u{1F1F7} Nacional",
        crianAs: "Crian\xE7as",
        idosos: "Idosos",
        pCDs: "PCDs",
        ativarModoViagem: "Ativar Modo Viagem",
        modoViagem: "Modo Viagem",
        assistenteDeViagem: "Assistente de Viagem",
        faAIssoSempreQueForViajar: "Fa\xE7a isso sempre que for viajar",
        inspeODePartida: "Inspe\xE7\xE3o de Partida",
        inspeODeChegada: "Inspe\xE7\xE3o de Chegada",
        checkoutSeguro: "Checkout Seguro",
        dicasTelefonesTeisEMais: "Dicas, telefones \xFAteis e mais.",
        fiqueAtento: "Fique Atento!",
        encerrarModoViagem: "Encerrar Modo Viagem",
        toqueParaAtivarHUD: "Toque para ativar HUD",
        sCANNINGAREA: "SCANNING AREA...",
        lUZ: "LUZ",
        sIRENE: "SIRENE",
        oCULTAR: "OCULTAR",
        painelSentinelaIA: "Painel Sentinela (IA)",
        controleRemotoDeLanternaParaIluminarReas: "Controle remoto de Lanterna para iluminar \xE1reas escuras.",
        sireneDePNicoComEfeitoEstroboscPicoParaE: "Sirene de P\xE2nico com efeito estrobosc\xF3pico para emerg\xEAncias.",
        modoFurtivoTelaApagadaParaMonitoramentoD: "Modo Furtivo (Tela Apagada) para monitoramento discreto.",
        iNICIARVIGILNCIA: "INICIAR VIGIL\xC2NCIA",
        fatoresDeRisco: "Fatores de Risco",
        selecioneQuemEstarPresenteNestaVisita: "Selecione quem estar\xE1 presente nesta visita:",
        gerarChecklist: "Gerar Checklist",
        tipoDeVisita: "Tipo de Visita",
        vocEstRecebendoAlguMOuIndoVisitar: "Voc\xEA est\xE1 recebendo algu\xE9m ou indo visitar?",
        recebendoVisita: "Recebendo Visita",
        prepararMinhaCasaParaConvidados: "Preparar minha casa para convidados",
        indoVisitar: "Indo Visitar",
        cuidadosAoIrNaCasaDeOutros: "Cuidados ao ir na casa de outros"
      },
      microBlog: {
        title: "Micro Blog",
        subtitle: "Prevenir em Casa",
        all: "Todos",
        minRead: "min de leitura"
      },
      ferramentasIA: {
        headerTitle: "Ferramentas IA",
        headerSubtitle: "An\xE1lise visual, voz e dados",
        sectionAnaliseVisual: "An\xE1lise Visual",
        sectionAssistentes: "Assistentes",
        sectionEmBreve: "Chegando em breve",
        scannerAmbienteTitle: "Scanner Ambiente",
        scannerAmbienteSubtitle: "An\xE1lise Visual IA",
        scannerAmbienteDesc: "Aponte a c\xE2mera pra ver riscos de queda, objetos perigosos e como est\xE1 o ambiente.",
        voiceTitle: "Vigilaro Voice",
        voiceSubtitle: "Assistente de \xC1udio",
        voiceDesc: "Converse com a IA por voz pra tirar d\xFAvidas na hora.",
        chatTitle: "Vigilaro Chat",
        chatSubtitle: "D\xFAvidas e Orienta\xE7\xF5es",
        chatDesc: "Assistente por texto pra dicas r\xE1pidas de seguran\xE7a.",
        detectorTitle: "Detector Ambiente",
        detectorDesc: "Analisa ru\xEDdos (ex: choro, vidro quebrando) e n\xEDvel de seguran\xE7a luminosa do c\xF4modo.",
        heatmapTitle: "Mapa de calor de riscos",
        heatmapSub: "Riscos por c\xF4modo",
        heatmapDesc: "Visualiza\xE7\xE3o agregada dos riscos identificados nas vistorias, com cores por n\xEDvel de criticidade."
      },
      mapaCalor: {
        title: "Mapa de calor",
        subtitle: "Riscos por c\xF4modo",
        intro: "Cada c\xF4modo aparece colorido pelo n\xEDvel de risco identificado nas vistorias. Toque pra abrir o checklist.",
        emptyTitle: "Sem mapa pra mostrar ainda",
        emptyDesc: "Mapeie os c\xF4modos da sua resid\xEAncia e fa\xE7a pelo menos uma vistoria pra ver o mapa de calor.",
        emptyCta: "Ir pra Onde Proteger",
        critical: "Cr\xEDticos",
        attention: "Aten\xE7\xE3o",
        safe: "Seguros",
        roomsLabel: "C\xF4modos mapeados"
      }
    };
  }
});

// locales/pt-PT/common.json
var common_default2;
var init_common2 = __esm({
  "locales/pt-PT/common.json"() {
    common_default2 = {
      navigation: {
        home: "In\xEDcio",
        education: "Aprender",
        travel: "Viagem",
        menu: "Menu",
        sosLabel: "Bot\xE3o SOS de emerg\xEAncia",
        sosHint: "Toque para abrir emerg\xEAncia. Mantenha pressionado para r\xE1pida."
      },
      home: {
        mainHouse: "Casa Principal",
        myProfile: "O Meu Perfil",
        overdueMeds: "{{count}} Medicamentos em Atraso",
        activeMonitor: "MONITOR ATIVO",
        quickAccess: "ACESSO R\xC1PIDO",
        myHealth: "A Minha Sa\xFAde",
        petHealth: "Sa\xFAde Animal",
        inspections: "Vistorias",
        infoLabels: "Info R\xF3tulos",
        infoLabelsSub: "Identifique toxicidade",
        tools: "Ferramentas",
        intelligenceCenter: "Central de Intelig\xEAncia",
        intelligenceSub: "Assistente IA, Scanner e Voz",
        vigilaroRadar: "Vigilaro Radar",
        radarSub: "Monitoriza\xE7\xE3o cont\xEDnua da sua casa",
        eventualActivities: "Atividades Eventuais",
        eventualSub: "Modo Preventivo para eventos especiais",
        myLocations: "As Minhas Resid\xEAncias",
        addNewLocation: "Adicionar nova resid\xEAncia",
        inspectedEnvironments: "Ambientes Vistoriados",
        homeSafe: "A sua casa est\xE1\nsegura",
        homeNeedsAttention: "A sua casa precisa\nde aten\xE7\xE3o",
        actImmediately: "Aja\nimediatamente",
        noInspectedEnvironment: "Nenhum ambiente vistoriado.",
        criticalRisk: "\u26A0\uFE0F Risco Cr\xEDtico:",
        attentionPoint: "\u26A0\uFE0F Ponto de Aten\xE7\xE3o:",
        verifyItem: "Verifique: {{item}}",
        offlineAlert: "Offline. Apenas conte\xFAdos e SOS dispon\xEDveis.",
        batteryAlert: "Bateria cr\xEDtica. Carregue o dispositivo.",
        labelSafe: "Seguro: {{pct}}%",
        labelAttention: "Aten\xE7\xE3o: {{pct}}%",
        labelCritical: "Cr\xEDtico: {{pct}}%",
        residence: {
          alertMissingNameTitle: "Aten\xE7\xE3o",
          alertMissingNameBody: "D\xEA um nome \xE0 nova moradia.",
          createdTitle: "Moradia criada",
          createdBody: "Pode configurar os ambientes e o contexto desta casa agora, sem perder o fluxo.",
          later: "Depois",
          configureNow: "Configurar agora",
          myResidences: "As minhas resid\xEAncias",
          modalIntro: "Troque a moradia ativa ou cadastre uma nova casa sem sair deste contexto.",
          closeQuickForm: "Fechar registo r\xE1pido",
          addNewResidence: "Cadastrar nova moradia",
          newResidence: "Nova moradia",
          newResidencePlaceholder: "Ex.: Casa de praia",
          composerHint: "Depois de guardar, pode seguir diretamente para configurar ambientes e contexto.",
          cancel: "Cancelar",
          saveResidence: "Guardar moradia"
        },
        mappingSteps: {
          perfil: "O seu perfil",
          moradores: "Moradores",
          tipo_moradia: "Tipo de moradia",
          ambientes: "Ambientes",
          equipamentos: "Equipamentos de seguran\xE7a",
          kits: "Kits de emerg\xEAncia"
        },
        briefing: {
          peopleAndPets: "{{people}} pessoa(s) e {{pets}} animal(is)",
          peopleOnly: "{{people}} pessoa(s)",
          noResidents: "Moradores ainda n\xE3o definidos",
          statusActive: "Base viva ativa",
          statusInProgress: "Briefing em constru\xE7\xE3o",
          statusInitial: "Briefing inicial",
          bodyComplete: "O contexto da casa j\xE1 orienta prioridades, tarefas e recomenda\xE7\xF5es do dia a dia.",
          bodyInProgress: "Continue por etapas. A aplica\xE7\xE3o j\xE1 usa o que foi informado para entregar orienta\xE7\xF5es proporcionais.",
          bodyInitial: "Comece pelo contexto da casa para que a Home passe a orientar prote\xE7\xE3o, monitoriza\xE7\xE3o e tarefas com relev\xE2ncia real.",
          progressLabel: "briefing",
          titleComplete: "Contexto do lar em acompanhamento",
          titleTimeline: "Linha do tempo do mapeamento",
          updateBriefing: "Atualizar briefing",
          continueStep: "Continuar: {{step}}",
          startMapping: "Mapear a minha casa",
          timelineHome: "Moradia ativa",
          timelinePeople: "Quem vive ou circula aqui",
          timelineRooms: "Ambientes mapeados",
          mappedRoomsCount: "{{count}} ambiente(s) no briefing",
          roomsPending: "Cozinha, casa de banho, acessos e rotinas ainda pendentes",
          timelinePlan: "Plano de cuidado",
          pendingActionsCount: "{{count}} a\xE7\xE3o(\xF5es) para priorizar",
          planReady: "Pronto para acompanhamento di\xE1rio",
          planPending: "Ser\xE1 gerado com o contexto m\xEDnimo"
        },
        daily: {
          healthEyebrow: "Cuidado de hoje",
          healthTitle: "Confirme os cuidados de sa\xFAde pendentes",
          healthBody: "{{count}} cuidado(s) aguardam confirma\xE7\xE3o.",
          firstStepEyebrow: "Primeiro passo",
          firstStepTitle: "Comece pelo briefing da casa",
          firstStepBody: "Ambientes, moradores, animais e rotinas.",
          homePriorityEyebrow: "Prioridade do lar",
          homePriorityTitle: "Cuide primeiro das pend\xEAncias abertas",
          homePriorityBody: "{{count}} ponto(s) para priorizar no plano.",
          petEyebrow: "Rotina sens\xEDvel",
          petTitle: "Reveja produtos e rotas dos animais",
          petBody: "Produtos, plantas e acessos.",
          preventiveEyebrow: "Manuten\xE7\xE3o preventiva",
          preventiveTitle: "Mantenha o plano vivo",
          preventiveBody: "Registar mudan\xE7a ou rever o plano."
        },
        personalization: {
          defaultWho: "quem ama",
          toneDefault: "objetiva e cont\xEDnua",
          scannerDefault: "IA imediata para a sua casa",
          toneAccessible: "mais acess\xEDvel, clara e direta",
          scannerAccessible: "IA com leitura mais acess\xEDvel",
          toneChildren: "mais conservadora e imediata",
          scannerChildren: "IA mais conservadora para crian\xE7as",
          toneElderly: "mais est\xE1vel e cuidadosa",
          scannerElderly: "IA atenta a quedas e rotina",
          tonePets: "mais sens\xEDvel a produtos, rotas e objetos",
          scannerPets: "IA com contexto real para animais",
          priorityHealth: "{{count}} cuidado(s) de sa\xFAde hoje",
          priorityHome: "{{count}} ajuste(s) na casa",
          priorityMapping: "{{count}} ponto(s) em observa\xE7\xE3o",
          priorityDefault: "monitoriza\xE7\xE3o preventiva ativa",
          supportVerbPlural: "contam",
          supportVerbSingular: "conta",
          titleWithName: "Para {{name}} e quem ama",
          titleDefault: "Para si e quem ama",
          body: "{{who}} {{verb}} com uma preven\xE7\xE3o {{tone}} em {{house}}. A IA j\xE1 est\xE1 a priorizar {{priority}}."
        },
        greeting: {
          morning: "Bom dia",
          afternoon: "Boa tarde",
          evening: "Boa noite"
        },
        signals: {
          who: "Quem",
          where: "Onde",
          what: "O qu\xEA",
          how: "Como",
          aiPrevention: "IA + Preven\xE7\xE3o 3D",
          localPrevention: "Modo local + Preven\xE7\xE3o 3D",
          status: "Status",
          briefing: "Briefing",
          pending: "Pend\xEAncias",
          open: "Em aberto",
          healthOpenShort: "{{count}} sa\xFAde",
          houseOpenShort: "{{count}} casa",
          pendingOpen: "{{count}} aberta(s)",
          upToDate: "Em dia",
          protected: "Protegidos"
        },
        hero: {
          localBadge: "Modo local",
          localTitle: "{{house}} continua protegida",
          localDescription: "Fun\xE7\xF5es essenciais ativas.",
          viewPriorities: "Ver prioridades",
          reviewProfiles: "Rever perfis",
          batteryBadge: "Bateria cr\xEDtica",
          batteryTitle: "Vale a pena recarregar o dispositivo principal",
          batteryDescription: "Recarregue para manter a monitoriza\xE7\xE3o.",
          preventiveMode: "Modo preventivo",
          briefingBadge: "Briefing vivo",
          briefingTitle: "{{house}} ainda precisa do primeiro mapa",
          briefingDescription: "Mapeie o contexto inicial.",
          whoToProtect: "Quem proteger",
          mappingInProgressBadge: "Mapeamento em andamento",
          mappingInProgressTitle: "O briefing j\xE1 est\xE1 a formar o plano da casa",
          mappingInProgressDescription: "Continue a pr\xF3xima etapa.",
          viewPlan: "Ver plano",
          stableBadge: "Opera\xE7\xE3o est\xE1vel",
          stableTitle: "{{house}} est\xE1 com prote\xE7\xE3o forte",
          stableDescription: "Manter rotina e fechar detalhes.",
          openReports: "Abrir relat\xF3rios",
          manageProfiles: "Gerir perfis",
          recommendedBadge: "Ajustes recomendados",
          recommendedTitle: "A prote\xE7\xE3o est\xE1 funcional, mas ainda pode subir",
          recommendedDescription: "{{count}} ponto(s) no plano.",
          viewPending: "Ver pend\xEAncias",
          priorityBadge: "A\xE7\xE3o priorit\xE1ria",
          priorityTitle: "As pend\xEAncias mais cr\xEDticas j\xE1 est\xE3o mapeadas",
          priorityDescription: "Comece pelos pontos cr\xEDticos.",
          actNow: "Agir agora",
          scoreLabel: "score"
        },
        quick: {
          briefing: "Briefing vivo",
          updateContext: "Atualizar contexto",
          carePlan: "Plano de cuidado",
          openPriorities: "{{count}} prioridade(s)",
          houseMonitoring: "Monitoriza\xE7\xE3o ativa",
          eventualTask: "Tarefa eventual",
          eventualTaskValue: "Novo cuidado ou lembrete",
          contextScanner: "Scanner com contexto",
          contextScannerValue: "Ler r\xF3tulo ou produto"
        },
        tasks: {
          myHealthTitle: "A Minha Sa\xFAde",
          myHealthDueBody: "{{count}} cuidado(s) hoje.",
          myHealthBody: "Medica\xE7\xE3o, hist\xF3rico e rotina.",
          healthBadge: "Sa\xFAde",
          petHealthTitle: "Sa\xFAde Animal",
          petHealthBody: "Cuidados, vacinas e rotina dos animais.",
          petHealthEmptyBody: "Cadastrar e acompanhar animais.",
          petBadge: "Animal",
          mappingTitle: "Briefing vivo",
          mappingBody: "Contexto da casa e ambientes.",
          planTitle: "Plano de a\xE7\xE3o",
          planBody: "{{count}} prioridade(s) no plano.",
          planReadyBody: "Relat\xF3rios e melhorias da casa.",
          planBadge: "Plano",
          healthTitle: "Confirmar cuidado de sa\xFAde",
          healthBody: "{{count}} lembrete(s) aguardam a\xE7\xE3o hoje.",
          todayBadge: "Hoje",
          eventualTitle: "Criar tarefa eventual",
          eventualBody: "Registar cuidado avulso em sa\xFAde.",
          eventualBadge: "Avulsa"
        },
        sections: {
          quickEyebrow: "Acesso r\xE1pido",
          quickTitle: "Cuidado, IA e tarefas",
          quickDescription: "A\xE7\xF5es principais da Home sem tirar o foco do plano di\xE1rio.",
          briefingEyebrow: "Briefing vivo",
          briefingTitle: "Linha do tempo do lar",
          briefingDescription: "O mapeamento agora aparece como base viva do cuidado, n\xE3o como formul\xE1rio solto.",
          dailyEyebrow: "Orienta\xE7\xE3o di\xE1ria",
          dailyTitle: "O que fazer agora",
          tasksEyebrow: "Plano e tarefas",
          tasksTitle: "Cuidados essenciais",
          tasksDescription: "Pend\xEAncias, tarefas avulsas e cuidados eventuais ficam vis\xEDveis sem competir com o briefing.",
          monitorEyebrow: "Monitor da casa",
          monitorTitle: "Monitor ativo",
          aiEyebrow: "Ferramentas inteligentes",
          aiTitle: "IA e consultas r\xE1pidas",
          aiDescription: "A IA permanece acess\xEDvel para d\xFAvidas, leituras e decis\xF5es pontuais."
        },
        monitor: {
          summaryTitle: "Resumo da casa",
          healthOpen: "{{count}} cuidado(s)\nhoje",
          collapse: "Recolher",
          expand: "Expandir"
        },
        ai: {
          askEyebrow: "Perguntar",
          askTitle: "Vigilaro IA",
          askBody: "Chat com contexto da casa.",
          toolsEyebrow: "Ferramentas",
          toolsTitle: "Centro de IA",
          toolsBody: "Scanner, voz e hist\xF3rico."
        }
      },
      onboarding: {
        title1: "Blindagem 360\xBA",
        subtitle1: "O seu lar protegido contra os acidentes mais comuns.",
        title2: "Preven\xE7\xE3o Inteligente",
        subtitle2: "O Vigilaro analisa as suas divis\xF5es e avisa antes do perigo acontecer.",
        title3: "Paz de Esp\xEDrito",
        subtitle3: "Para toda a fam\xEDlia e animais. A seguran\xE7a preventiva no seu bolso.",
        title4: "A Sua M\xE3o, A Sua Regra",
        subtitle4: "Otimize a interface para a sua m\xE3o dominante. Esquerdinos podem ativar o Modo Esquerdino para bot\xF5es mais acess\xEDveis.",
        rightHanded: "Destro",
        leftHanded: "Esquerdino",
        skip: "Saltar",
        startNow: "Come\xE7ar Agora",
        next: "Pr\xF3ximo"
      },
      health: {
        title: "A Minha Sa\xFAde",
        tabMeds: "Os Meus Rem\xE9dios",
        tabAgenda: "Agenda M\xE9dica",
        tabDossier: "Dossi\xEA",
        noMeds: "Nenhum medicamento",
        noMedsDesc: "Adicione medicamentos para acompanhar hor\xE1rios e doses",
        addMed: "Adicionar Medicamento",
        noEvents: "Nenhum evento",
        noEventsDesc: "Adicione consultas, procedimentos ou tratamentos",
        overdueMedsInfo: "{{count}} medicamento(s) pendente(s)",
        tapToView: "Toque para visualizar",
        deleteMedTitle: "Eliminar Medicamento",
        deleteMedDesc: "Remover este medicamento da sua lista?",
        deleteEventTitle: "Eliminar Evento",
        deleteEventDesc: "Deseja realmente remover este evento do seu cronograma?",
        cancel: "Cancelar",
        delete: "Eliminar",
        doseNotSpecified: "Dose n\xE3o especificada",
        everyXHours: "A cada {{hours}} horas",
        next: "Pr\xF3xima:",
        overdue: "EM ATRASO:",
        stock: "Estoque: {{quantity}} {{unit}}",
        noTimeDefined: "Hor\xE1rio n\xE3o definido",
        nextTodayAt: "Pr\xF3xima: Hoje \xE0s {{time}}",
        baseTime: "Base: {{time}}",
        onDemand: "Uso sob demanda.",
        nextSession: "Pr\xF3xima sess\xE3o",
        date: "Data",
        markDone: "Marcar Feito",
        daysOverdue: "Em atraso",
        daysLeft: "{{count}} dia(s)"
      },
      checklists: {
        roomNotFound: "Divis\xE3o n\xE3o encontrada",
        loading: "A carregar...",
        room: "Divis\xE3o",
        category: "Categoria:",
        notApplicable: "N\xE3o\nAplica",
        verified: "verificados",
        areaCompleted: "\xC1rea conclu\xEDda!",
        areaCleanInfo: "\xC1rea limpa. Certifique-se de que todos os itens essenciais foram avaliados.",
        maxPriority: "PRIORIDADE M\xC1XIMA",
        advanceTo: "Avan\xE7ar p/",
        finishInspection: "Concluir Vistoria",
        naAlertTitle: "Divis\xE3o N\xE3o Aplic\xE1vel",
        naAlertDesc: "Isto ir\xE1 marcar todos os itens desta lista como 'N\xE3o se Aplica' (NA). Tem a certeza?",
        confirmNA: "Confirmar N/A"
      },
      ai_assistant: {
        listening: "A ouvir...",
        tapToSend: "Toque para enviar",
        processing: "A processar...",
        transcribing: "A transcrever...",
        stop: "Parar",
        limitReached: "Limite Atingido",
        bePremium: "\u{1F48E} Seja Premium",
        later: "Depois",
        notUnderstood: "N\xE3o percebi. Tente novamente.",
        networkError: "Desculpe, tive um problema. Tente novamente.",
        micPermission: "Permiss\xE3o de microfone necess\xE1ria",
        micError: "Erro ao aceder ao microfone"
      },
      scanner: {
        introTitle: "Scanner Inteligente",
        introSub: "Use a Intelig\xEAncia Artificial para identificar riscos na sua casa e produtos.",
        modeEnv: "Escanear Divis\xE3o",
        modeEnvDesc: "Verifique divis\xF5es inteiras em busca de riscos de queda, objetos perigosos e barreiras.",
        modeLabel: "Analisar R\xF3tulo com IA",
        modeLabelDesc: "Tire foto das letras miudinhas, ingredientes e instru\xE7\xF5es para a IA analisar a toxidade.",
        modeBarcode: "C\xF3digo de Barras",
        modeBarcodeDesc: "Busca r\xE1pida em bases mundiais (Open Food Facts, UPCitemdb) com an\xE1lise toxicol\xF3gica autom\xE1tica.",
        hint: "Aponte a c\xE2mara e mantenha o dispositivo est\xE1vel. A an\xE1lise demora alguns segundos.",
        permReq: "Permiss\xE3o de c\xE2mara necess\xE1ria",
        grant: "Permitir",
        guideLabel: "Aponte para o r\xF3tulo e tire a foto",
        guideBarcode: "Enquadre o c\xF3digo de barras",
        guideEnv: "Aponte para a divis\xE3o",
        analyzing: "A Analisar com IA...",
        newScan: "Nova Leitura",
        resultAlerts: "\u26A0\uFE0F ALERTAS PARA A SUA FAM\xCDLIA",
        resultIngredients: "\u{1F9FE} INGREDIENTES",
        resultRisks: "\u26A1 RISCOS PRINCIPAIS",
        resultGhs: "\u{1F9EA} CLASSIFICA\xC7\xC3O GHS",
        resultFirstAid: "\u{1FA79} PRIMEIROS SOCORROS",
        resultPrevention: "\u{1F6E1}\uFE0F PREVEN\xC7\xC3O",
        resultPrecaution: "\u{1F4CB} PRECAU\xC7\xD5ES (GHS)",
        resultEpa: "\u{1F4CA} DADOS EPA (TOXICOLOGIA AVAN\xC7ADA)",
        callCiatox: "LIGAR CIATOX",
        ciatoxNumber: "0800-722-6001 (Gratuito, 24h)",
        analyzeWithAi: "Analisar r\xF3tulo com IA",
        analyzeWithAiSub: "Tire uma foto para an\xE1lise complementar",
        newSearch: "Nova Consulta",
        loadingTox: "A procurar dados toxicol\xF3gicos...",
        loadingEpa: "A procurar dados toxicol\xF3gicos (PubChem / EPA)..."
      },
      settings: {
        accessibility: "Acessibilidade",
        adaptForYou: "Adapte para Si",
        adaptForYouDesc: "O Vigilaro Care \xE9 para todos. Ajuste as defini\xE7\xF5es abaixo para melhorar a sua experi\xEAncia de uso conforme a sua necessidade.",
        visual: "Visual",
        largeText: "Texto Grande (140%)",
        largeTextDesc: "Aumenta o tamanho da fonte em toda a aplica\xE7\xE3o para facilitar a leitura.",
        highContrast: "Alto Contraste",
        highContrastDesc: "Muda para o tema preto e amarelo para m\xE1xima visibilidade.",
        audioFeedback: "Auditivo & Feedback",
        reduceMotion: "Reduzir Movimento",
        reduceMotionDesc: "Diminui anima\xE7\xF5es e transi\xE7\xF5es de ecr\xE3.",
        screenReader: "Leitor de Ecr\xE3",
        screenReaderDesc: "Otimizado para TalkBack (Android) e VoiceOver (iOS).",
        native: "NATIVO",
        interaction: "Intera\xE7\xE3o",
        leftHanded: "Modo Canhoto",
        leftHandedDesc: "Espelha bot\xF5es flutuantes, menus e controlos para o lado esquerdo do ecr\xE3.",
        language: "Idioma / Language"
      },
      menu: {
        resetWarningTitle: "\u26A0\uFE0F Repor Aplica\xE7\xE3o",
        resetWarningDesc: "Isto apagar\xE1 TODOS os seus perfis, mapeamentos e dados. A aplica\xE7\xE3o voltar\xE1 ao estado inicial. Tem a certeza?",
        resetConfirm: "Sim, Repor Tudo",
        resetSuccess: "Aplica\xE7\xE3o reposta! A come\xE7ar do zero... \u{1F680}",
        resetError: "N\xE3o foi poss\xEDvel repor os dados.",
        accountAndApp: "A Minha Conta e Aplica\xE7\xE3o",
        accessibility: "Acessibilidade",
        accessibilityDesc: "Tamanho de texto e contraste",
        premium: "Vigilaro Premium",
        premiumDesc: "Gerir Assinatura",
        about: "Sobre a App",
        aboutDesc: "Vers\xE3o, Termos e Privacidade",
        resetApp: "Repor App",
        resetAppDesc: "Apagar tudo e reiniciar",
        support: "Suporte",
        supportDesc: "Fale connosco",
        terms: "Termos de Utiliza\xE7\xE3o",
        termsDesc: "Leia os nossos termos",
        privacy: "Privacidade",
        privacyDesc: "Pol\xEDtica de dados",
        menuSettings: "Menu & Defini\xE7\xF5es",
        generalSettings: "Defini\xE7\xF5es gerais"
      },
      sos: {
        title: "EMERG\xCANCIAS",
        generalTitle: "Emerg\xEAncia Geral",
        generalSub: "INEM / Bombeiros / Pol\xEDcia",
        generalPhone: "112",
        toxTitle: "CIAV",
        toxSub: "Intoxica\xE7\xE3o",
        toxPhone: "800250250",
        firstAid: "PRIMEIROS SOCORROS",
        firstAidSub: "Toque para guia passo a passo",
        vetTitle: "Veterin\xE1rio",
        vetSub: "Buscar Pr\xF3ximo",
        sendSos: "Enviar SOS",
        holdButton: "Segure o bot\xE3o",
        medCard: "Ficha M\xE9d.",
        medCardSub: "Sa\xFAde/Meds",
        contacts: "Contactos",
        saved: "Guardados",
        exitSOS: "SAIR DO MODO EMERG\xCANCIA",
        noInternet: "SEM INTERNET.\nTente ligar para o 112. Contactos pessoais podem falhar.",
        samuTitle: "INEM",
        samuSub: "Emerg\xEAncia M\xE9dica",
        samuPhone: "112",
        fireTitle: "Bombeiros",
        fireSub: "Inc\xEAndio e Resgates",
        firePhone: "112",
        policeTitle: "PSP / GNR",
        policeSub: "Pol\xEDcia",
        policePhone: "112"
      },
      travel: {
        departureInspection: "Inspe\xE7\xE3o de Partida",
        departureSubtitle: "O que fazer antes de sair de casa",
        departureIntro: "Evite imprevistos e regressos desnecess\xE1rios. Reveja esta checklist nos minutos finais antes de fechar a porta.",
        homeSecurity: "Seguran\xE7a da Casa",
        gasOff: "Registo de G\xE1s fechado",
        waterOff: "Registo de \xC1gua fechado (evita fugas)",
        electronicsOff: "Aparelhos fora da tomada",
        windowsLocked: "Todas as janelas trancadas",
        trashOut: "Lixo retirado",
        perishables: "Frigor\xEDfico limpo de perec\xEDveis",
        logistics: "Log\xEDstica B\xE1sica",
        keysWithNeighbor: "Chaves com vizinho/familiar de confian\xE7a?",
        petFoodWater: "Comida/\xE1gua extra se animal ficar em casa?",
        plantsWatered: "Plantas regadas ou esquema de rega pronto?",
        carryOn: "Bagagem de M\xE3o",
        docsWithPhoto: "Documentos com foto (CC/Passaporte)",
        ticketsSavedOffline: "Bilhetes/Reservas guardados offline",
        vitalMedsInBag: "Medicamentos vitais na mala (n\xE3o despachar)",
        chargerPowerbank: "Carregador de telem\xF3vel e powerbank",
        cardsMoneyKeys: "Cart\xF5es, dinheiro e chaves",
        completedOf: "de",
        completed: "conclu\xEDdos"
      },
      medications: {
        title: "Hora do Medicamento",
        morning: "Manh\xE3",
        afternoon: "Tarde",
        night: "Noite",
        errorNameTime: "Nome e Hor\xE1rio s\xE3o obrigat\xF3rios.",
        errorSelectProfile: "Selecione um perfil.",
        lowStockTitle: "Stock Baixo",
        deleteTitle: "Eliminar",
        deleteMsg: "Remover este medicamento?",
        no: "N\xE3o",
        yes: "Sim",
        noRoutine: "Nenhuma rotina ativa",
        noRoutineMsg: "Adicione os medicamentos e vitaminas da sua fam\xEDlia aqui.",
        manageRoutines: "Gerir Rotinas",
        add: "Incluir",
        edit: "Alterar",
        delete: "Eliminar",
        doseHistory: "Hist\xF3rico de Doses",
        historyEmpty: "Hist\xF3rico limpo. Nenhum registo encontrado.",
        editMed: "Editar Medicamento",
        newMed: "Novo Medicamento",
        medName: "Nome do Medicamento",
        dose: "Dose (ex: 1 cp)",
        time: "Hor\xE1rio (ex: 14:00)",
        notification: "Notifica\xE7\xE3o",
        currentStock: "Stock Atual",
        stockQty: "Qtd (opcional)",
        cancel: "Cancelar",
        save: "Guardar",
        stock: "Stock",
        lowStock: "Stock baixo! Restam {{count}} unidades de {{name}}.",
        reminderTitle: "Hora do Medicamento: {{name}}",
        reminderBody: "Hora de tomar {{name}} ({{dosage}}).",
        eduBoxTitle: "\u{1F6E1}\uFE0F Preven\xE7\xE3o Inteligente: O Peso dos Atrasos",
        eduBoxText1: 'Medicamentos possuem "pesos" diferentes no seu organismo:',
        eduBoxText2: "\u2022 Alta Criticidade (ex: Antibi\xF3ticos, Cr\xF3nicos): Atrasos comprometem a efic\xE1cia do tratamento. Manter o ciclo original \xE9 fundamental.",
        eduBoxText3: "\u2022 Baixa Criticidade (ex: Analg\xE9sicos): O risco principal \xE9 a toxicidade se tomar doses muito pr\xF3ximas.",
        eduBoxText4: "*Em caso de atrasos significativos, informe sempre o seu m\xE9dico ou cuidador.*",
        delayRuleQuestion: "Em caso de atraso, qual a orienta\xE7\xE3o m\xE9dica?",
        ruleRigid: "Manter Hor\xE1rios Fixos (Cr\xF3nicos / Antibi\xF3ticos)",
        ruleRigidSub: "A pr\xF3xima dose manter\xE1 o ciclo original, ignorando o atraso.",
        ruleFlexible: "Contar a partir da hora tomada (Sintom\xE1ticos)",
        ruleFlexibleSub: "O rel\xF3gio zera a partir do momento tomado, prevenindo sobredosagem.",
        disposalTitle: "Descarte Seguro",
        disposalAlertMsg: "Est\xE1 a excluir este medicamento.\n\n\u26A0\uFE0F Lembre-se: Nunca deite medicamentos no lixo comum ou sanita. Entregue-os numa farm\xE1cia para evitar intoxica\xE7\xF5es e polui\xE7\xE3o.\n\nDeseja confirmar a exclus\xE3o?",
        guideTitle: "Guia de Descarte",
        guideBtn: "Descarte Seguro",
        guideP1: "Como descartar medicamentos?",
        guideP2: "A caixa de cart\xE3o e o folheto podem ir para a reciclagem (rasgue os seus dados pessoais).",
        guideP3: "Blisters vazios, frascos ou sobras devem ser entregues nas farm\xE1cias (Valormed). Nunca deite na sanita!"
      },
      knowledgeHub: {
        title: "Central de Aprendizado",
        subtitle: "Biblioteca de Guias e Manuais",
        essentialConcepts: "Conceitos Essenciais",
        lifeContext: "Contexto de Vida",
        safetyReviews: "An\xE1lises de Seguran\xE7a",
        emergencies: "Emerg\xEAncias",
        practicalGuides: "Guias Pr\xE1ticos",
        mobilityMaintenance: "Mobilidade e Manuten\xE7\xE3o",
        methodology: "Metodologia 3D",
        envPrevention: "Preven\xE7\xE3o por ambientes",
        protectPet: "Proteja seu Pet",
        ageCare: "Cuidados por faixa Et\xE1ria",
        pregnancyCare: "Cuidados na Gesta\xE7\xE3o",
        toyGuide: "Guia de Brinquedos",
        kitchenUtensils: "Utens\xEDlios Dom\xE9sticos",
        homeAppliances: "Eletrodom\xE9sticos",
        electronicDevices: "Dispositivos Eletr\xF4nicos",
        risksPrev: "Riscos e Preven\xE7\xE3o",
        firePrev: "Preven\xE7\xE3o de Inc\xEAndios",
        escapePlans: "Planos de Fuga",
        firstAid: "Primeiros Socorros",
        eduGuide: "Guia Educativo",
        kitsGuide: "Guia de Kits",
        humansPets: "Humanos e Pets",
        toxicPlants: "Plantas T\xF3xicas",
        venomousAnimals: "Animais Pe\xE7onhentos",
        hazardousProducts: "Produtos Qu\xEDmicos",
        electricalRisks: "Riscos El\xE9tricos",
        safeGardening: "Jardinagem Segura",
        kitCare: "Kit e Cuidados",
        condoSafety: "Seguran\xE7a em Condom\xEDnio",
        extinguishersExits: "Extintores e Sa\xEDdas",
        leisureTravel: "Lazer e Viagens",
        beachCamping: "Praia, Camping, E-Bikes",
        ppeTools: "EPIs & Ferramentas",
        dailySafety: "Seguran\xE7a no dia a dia",
        blogTitle: "Micro Blog",
        blogSub: "Prevenir em Casa",
        articles: "Artigos",
        realCases: "Casos Reais"
      },
      reports: {
        title: "O Qu\xEA e Como",
        subtitle: "Descubra os Riscos e Aja",
        personalReport: "Relat\xF3rio Pessoal",
        personalReportDesc: "An\xE1lise detalhada sobre o seu lar.",
        improvementHistory: "Hist\xF3rico de Melhorias",
        improvementHistoryDesc: "Veja a sua evolu\xE7\xE3o na seguran\xE7a.",
        environmentInspection: "Vistoria dos Ambientes",
        specialInspections: "Vistorias Especiais",
        safeSchool: "Escola Segura",
        safeSchoolDesc: "Avalie o ambiente escolar.",
        safeNursingHome: "Lar Seguro",
        safeNursingHomeDesc: "Vistoria s\xE9nior t\xE9cnica.",
        pendencies: "Pend\xEAncias",
        item: "item",
        items: "itens",
        safe: "Seguro",
        pending: "Pendente",
        attention: "Aten\xE7\xE3o",
        risk: "Risco",
        incompleteReg: "Registo Incompleto",
        resolve: "Resolver",
        verifyNow: "Verificar Agora",
        allSafe: "Tudo Seguro!",
        allSafeMsg: "Completou todas as verifica\xE7\xF5es.",
        savePDF: "Guardar Relat\xF3rio em PDF",
        statusSafe: "Seguro",
        statusPending: "Pendente",
        statusAttention: "Aten\xE7\xE3o",
        statusRisk: "Risco",
        pendenciesPercent: "Pend\xEAncias ({{pct}}%)",
        missingPeople: "Faltam {{count}} pessoas.",
        pendenciesCount: "{{count}} pend\xEAncias"
      },
      sosCountdown: {
        fallDetected: "QUEDA DETETADA!",
        vitalCheck: "CHECK-IN SEM RESPOSTA",
        sendingSOS: "A ENVIAR SOS EM",
        locationMsg: "A sua localizacao sera enviada para os seus contactos de emergencia.",
        cancelBtn: "CANCELAR (FALSO ALARME)",
        sendingAlert: "A enviar alerta...",
        confirmSend: "Abra a sua aplicacao de mensagens para confirmar o envio.",
        closeBtn: "FECHAR",
        noContactsTitle: "Aten\xE7\xE3o",
        noContacts: "Nenhum contacto de emergencia encontrado. Configure a sua rede de apoio.",
        sosErrorTitle: "Erro",
        sosError: "N\xE3o foi poss\xEDvel enviar o SOS automatico.",
        fallMsg: "ALERTA DE QUEDA! Houve um impacto forte e n\xE3o houve resposta.",
        vitalMsg: "ALERTA DE SEGURAN\xC7A! O check-in di\xE1rio n\xE3o foi respondido.",
        defaultMsg: "SOS! Preciso de ajuda urgente."
      },
      firstAid: {
        whatHappened: "O Que Aconteceu?",
        tacticalProtocol: "Protocolo Tatico R\xE1pido",
        people: "PESSOAS",
        pets: "PETS",
        immediateAction: "ACAO IMEDIATA REQUERIDA",
        criticalWarning: "AVISO CRITICO",
        callEmergency: "LIGAR 112 AGORA",
        findVet: "PROCURAR CLINICA 24H"
      },
      profiles: {
        title: "Quem e Onde",
        subtitle: "Gira perfis e lares",
        peopleTab: "Pessoas",
        petsTab: "Pets",
        homeXRay: "Raio X da Casa",
        homeXRayDesc: "Resumo de edificacao, moradores e divisoes",
        peopleProfiles: "Perfis de Pessoas",
        myPets: "Os Meus Pets",
        newPet: "Novo Pet",
        newPerson: "Nova Pessoa",
        locations: "Locais (Moradias)",
        locationsHelp: "Toque no icone de lapis para renomear ou no caixote para remover.",
        newLocation: "Novo Local",
        renameLocation: "Renomear Local",
        locationName: "Nome do local",
        cancel: "Cancelar",
        save: "Guardar",
        deleteConfirm: "Remover {{name}}?",
        deleteTitle: "Eliminar?",
        yes: "Sim",
        petCareTitle: "Perfil de Cuidados",
        petCareMsg: "O Pet n\xE3o pode ser o utilizador principal da aplicacao.",
        profileSelected: "Perfil Selecionado",
        monitoringFor: "A monitorizar agora para: {{name}}",
        locationChanged: "Local Alterado",
        managingNow: "Agora a gerir: {{name}}",
        removeLocationTitle: "Remover Local?",
        removeLocationMsg: "Tem a certeza que deseja eliminar este local?",
        no: "N\xE3o",
        yesDelete: "Sim, Eliminar",
        actionBlocked: "Acao Bloqueada",
        cannotDeleteMain: "O perfil principal n\xE3o pode ser eliminado.",
        cannotDeleteActive: "N\xE3o e poss\xEDvel apagar a resid\xEAncia ativa.",
        finishGoHome: "Concluir e Ir para o Inicio"
      },
      addProfile: {
        editTitle: "Editar Perfil",
        newTitle: "Novo Perfil",
        person: "Pessoa",
        pet: "Pet",
        residenceLink: "VINCULO COM A RESID\xCANCIA",
        resident: "Morador Fixo",
        visitor: "Visitante",
        name: "NOME",
        petNamePH: "Nome do Pet",
        personNamePH: "Nome Completo",
        sex: "SEXO",
        gender: "GENERO",
        birth: "NASCIMENTO",
        vetFile: "Ficha Veterinaria",
        health: "Sa\xFAde",
        bloodType: "TIPO SANGUINEO",
        breed: "RACA / MESTICO",
        breedPH: "Ex: Golden, SRD...",
        microchip: "MICROCHIP / RGA",
        optional: "Opcional",
        neutered: "CASTRADO(A)?",
        conditions: "CONDICOES & HIST\xD3RICO",
        notes: "OUTRAS OBSERVACOES / ALERGIAS",
        notesPH: "Descreva alergias, medicamentos recorrentes...",
        sosNetwork: "Rede de Apoio (SOS)",
        sosHelp: "Estes contactos ser\xE3o notificados ao acionar o SOS.",
        contactName: "Nome do Contacto",
        contactPhone: "Whatsapp / Telefone",
        addContact: "ADD",
        fillBoth: "Preencha nome e telefone.",
        nameRequired: "Informe o nome.",
        dateIncomplete: "Data de nascimento incompleta.",
        success: "Sucesso",
        profileSaved: "Perfil guardado!",
        error: "Erro",
        saveFailed: "Falha ao guardar.",
        saveChanges: "Guardar Altera\xE7\xF5es",
        createProfile: "Criar Perfil",
        galleryPerm: "Precisamos de acesso a galeria.",
        permRequired: "Permiss\xE3o necess\xE1ria"
      },
      wizard: {
        welcome: "Boas Vindas",
        propertyType: "Tipo de Imovel",
        structure: "Estrutura",
        residents: "Registo de Moradores",
        protections: "Prote\xE7\xF5es",
        priorities: "Prioridades",
        done: "Pronto!",
        letsSetup: "Vamos configurar {{name}}",
        quickSetup: "Um ajuste r\xE1pido para personalizar a seguran\xE7a para a sua fam\xEDlia e animais.",
        whoLivesHere: "Quem mora aqui?",
        registerAll: "Registe todos os moradores. Toque nos cartoes para selecionar.",
        letsStart: "Vamos comecar?",
        addFamilyMsg: "Adicione-se a si, a sua fam\xEDlia e os seus animais.",
        firstResident: "Registar Primeiro Morador",
        newLabel: "Novo",
        completeReg: "Completar Registo",
        removeProfile: "Remover?",
        removeConfirm: "Deseja eliminar este perfil?",
        no: "N\xE3o",
        yes: "Sim",
        propertyTypeQ: "Qual o tipo do imovel?",
        propertyTypeHelp: "Isso ajuda a calibrar riscos estruturais.",
        buildingDetails: "Detalhes da Edificacao Principal",
        buildingHow: "Como e a construcao onde moram?",
        singleStory: "Terrea",
        multiStory: "Sobrado / +1 Andar",
        structureRooms: "Estrutura e Divisoes",
        selectRooms: "Selecione todas as divisoes que a sua fam\xEDlia acessa:",
        installedProtections: "Prote\xE7\xF5es Instaladas",
        whatProtects: "O que ja protege a sua casa?",
        biggestConcerns: "Maiores Preocupacoes",
        prioritizeAlerts: "Priorizaremos alertas sobre:",
        setupComplete: "Configura\xE7\xE3o Concluida!",
        readyToMonitor: "O seu ambiente esta pronto para ser monitorizado.",
        finish: "Finalizar",
        continue: "Continuar",
        houseConfigured: "Casa Configurada!",
        envReady: "Ambiente pronto para monitorizacao.",
        accessHome: "Aceder ao Inicio",
        configError: "Falha ao guardar configuracoes."
      },
      checklistWizard: {
        shieldTitle: "Vamos blindar a sua casa?",
        shieldDesc: "Mapear os riscos do seu ambiente e a essencia da Preven\xE7\xE3o 3D (Diaria, Dinamica e Duradoura).",
        safetyWarningTitle: "Aten\xE7\xE3o a Seguran\xE7a",
        safetyWarningDesc: "Sem o mapeamento completo, pontos cegos de risco permanecem ocultos. O Vigilaro Care precisa conhecer o seu ambiente para ativar os alertas de sa\xFAde e seguran\xE7a corretamente.",
        walkThrough: "Percorrer casa passo a passo",
        chooseRoom: "Escolher ambiente especifico",
        skipForNow: "Saltar por agora (N\xE3o recomendado)",
        inspections: "Vistorias",
        riskMapping: "Mapeamento de Riscos",
        selectRoom: "Selecione o ambiente que pretende vistoriar agora. Comece pelas divisoes de maior circulacao.",
        priority: "Prioridade",
        backToApp: "Voltar a aplicacao (Finalizar depois)",
        routineInspection: "Vistoria de Rotina",
        routineInspectionDesc: "Efetue vistorias guiadas peri\xF3dicas para garantir que os seus ambientes continuam t\xE3o seguros quanto o dia em que os configurou.",
        continuousAttention: "Aten\xE7\xE3o Cont\xEDnua",
        continuousAttentionDesc: "A seguran\xE7a \xE9 din\xE2mica. Verifique regularmente se novos objetos ou altera\xE7\xF5es na disposi\xE7\xE3o dos m\xF3veis introduziram novos riscos.",
        startFullAudit: "Iniciar Auditoria Completa",
        auditSpecificRoom: "Auditar Divis\xE3o Espec\xEDfica",
        backToPanel: "Voltar ao Painel",
        specificAudit: "Auditoria Espec\xEDfica",
        selectRoomToAudit: "Selecione qual divis\xE3o pretende auditar agora:",
        backToHome: "Voltar ao In\xEDcio"
      },
      checklistReport: {
        generalAssessment: "Avaliacao Geral",
        safetyScore: "Score de Seguran\xE7a",
        compliant: "Conformes",
        nonCompliant: "N\xE3o Conformes",
        totalItems: "Total de itens avaliados:",
        improvementTitle: "Oportunidades de Melhoria",
        improvementFound: "Identificamos {{count}} ponto(s) que podem ser melhorados.",
        partnerQuote: "N\xE3o somos policia, somos parceiros.",
        partnerMsg: "O nosso objetivo e informar e orientar. N\xE3o se preocupe se o score n\xE3o for 100% agora. O importante e saber onde atuar para proteger quem ama.",
        itemNeedsAttention: "Item {{title}} precisa de aten\xE7\xE3o",
        consultEducation: "Consulte a seccao Educa\xE7\xE3o para dicas praticas.",
        savedHistory: "Guardado no Hist\xF3rico",
        savedHistoryMsg: "Esta avaliacao foi registada automaticamente. Acompanhe a sua evolucao ao longo do tempo!",
        shareReport: "Partilhar Relat\xF3rio",
        sharePrivacy: "* Inclui aviso de privacidade ao partilhar.",
        methodology3D: "Metodologia Preven\xE7\xE3o 3D",
        daily: "DIARIA:",
        dailyDesc: "Cuidado constante e habitual",
        dynamic: "DINAMICA:",
        dynamicDesc: "Adaptavel as mudancas da fam\xEDlia",
        durable: "DURADOURA:",
        durableDesc: "Preven\xE7\xE3o sustentavel e continua",
        newChecklist: "Novo Checklist",
        home: "Inicio",
        privacyTitle: "Privacidade e Seguran\xE7a",
        privacyMsg: "Esta prestes a partilhar um relat\xF3rio detalhado contendo informa\xE7\xF5es sobre a seguran\xE7a da sua resid\xEAncia. Certifique-se de enviar este ficheiro apenas para pessoas da sua extrema confian\xE7a.",
        cancel: "Cancelar",
        awareAndSend: "Estou Ciente e Quero Enviar",
        shareError: "N\xE3o foi poss\xEDvel partilhar.",
        excellent: "Excelente!",
        excellentMsg: "A sua casa esta muito segura! Continue a manter.",
        goodProgress: "Bom progresso!",
        goodProgressMsg: "Alguns ajustes necessarios. Priorize os itens n\xE3o conformes.",
        attentionNeeded: "Aten\xE7\xE3o necess\xE1ria",
        attentionNeededMsg: "Varios riscos identificados. Recomendamos acao urgente."
      },
      actionPlan: {
        title: "Plano de Acao",
        subtitle: "Vistoria de Correcao",
        critical: "Criticos",
        pending: "Pendentes",
        resolved: "Resolvidos",
        priorityItems: "Itens Prioritarios",
        allVerified: "Tudo Verificado!",
        risk: "RISCO",
        safeZone: "Zona segura confirmada. O ambiente n\xE3o possui vulnerabilidades ativas pendentes de resolucao.",
        backHome: "Voltar ao Inicio",
        error: "Erro",
        loadError: "N\xE3o foi poss\xEDvel carregar o plano de acao.",
        noProfile: "Nenhum perfil ativo encontrado para gerar o relat\xF3rio.",
        generateReport: "Gerar Relat\xF3rio",
        generatePDFConfirm: "Deseja gerar o relat\xF3rio em PDF com o plano de acao atual?",
        cancel: "Cancelar",
        generate: "Gerar",
        pdfError: "Falha ao gerar PDF: "
      },
      checklistCategoria: {
        tapToInspect: "Tocar para iniciar vistoria",
        roomsFound: "{{count}} ambiente(s) encontrados nesta categoria"
      },
      about: {
        title: "Sobre a App",
        subtitle: "Vigilaro Care V6 Neo.",
        version: "Versao",
        mission: "A Nossa Missao",
        missionText: "Auxiliar fam\xEDlias para criar lares mais seguros e acolhedores. Acreditamos que a preven\xE7\xE3o e a maior forma de amor e cuidado. O Vigilaro une tecnologia e empatia para proteger quem mais ama.",
        legalInfo: "Informa\xE7\xF5es Legais",
        termsOfUse: "Termos de Utilizacao",
        privacyPolicy: "Politica de Privacidade",
        contactSupport: "Contacto & Suporte",
        contactUs: "Fale Connosco",
        visitSite: "Visite o nosso site",
        advancedSettings: "Configuracoes Avancadas",
        resetApp: "Reiniciar Aplicacao (Reset)",
        resetTitle: "Reiniciar Aplicacao",
        resetMsg: "Tem a certeza? Isso apagara TODOS os dados. A app voltara ao estado inicial.",
        cancel: "Cancelar",
        yesDeleteAll: "Sim, Apagar Tudo",
        madeWith: "Feito com amor pela equipa Vigilaro",
        copyright: "2026 Vigilaro Inc. Todos os direitos reservados."
      },
      upgrade: {
        heroTitle: "A sua fam\xEDlia merece protecao sem limites",
        heroSub: "Acesso completo a tudo o que o Vigilaro tem para proteger quem ama.",
        premium: "Premium",
        family: "Fam\xEDlia",
        mostComplete: "Mais completo",
        monthly: "Mensal",
        annual: "Anual",
        perMonth: "/mes",
        perYear: "/ano",
        loading: "A carregar...",
        loadingPlans: "A carregar planos...",
        subscribe: "Assinar",
        restorePurchases: "Restaurar Compras",
        alreadyProtected: "Ja esta protegido!",
        allFeatures: "Todos os recursos estao disponiveis para si.",
        validUntil: "Valido ate:",
        back: "Voltar",
        offline: "Offline",
        offlineMsg: "Verifique a sua conexao para realizar a compra.",
        errorLink: "N\xE3o foi poss\xEDvel abrir este link.",
        invalidProduct: "Produto invalido ou indisponivel. Tente recarregar.",
        protectionActive: "Protecao ativada",
        understood: "Entendido",
        purchaseError: "Erro na compra",
        purchaseErrorFallback: "Falha na transacao. Tente novamente.",
        unexpectedError: "Ocorreu um erro no checkout. Tente novamente.",
        subscriptionRestored: "Assinatura restaurada",
        restoredMsg: "A sua protecao esta ativa novamente!",
        noSubscription: "Nenhuma assinatura encontrada",
        noSubscriptionMsg: "Se realizou uma compra recente, aguarde alguns minutos e tente novamente.",
        restoreError: "Falha ao restaurar.",
        unexpectedRestore: "N\xE3o foi poss\xEDvel restaurar as compras.",
        cannotLoad: "N\xE3o conseguimos carregar os planos agora",
        checkConnection: "Verifique a sua conexao e tente novamente.",
        tryAgain: "Tentar de novo",
        error: "Erro",
        save: "Poupe",
        featFree1: "Checklists de seguran\xE7a dom\xE9stica",
        featFree2: "Botao SOS de emergencia",
        featFree3: "Scanner IA de riscos (5/mes)",
        featFree4: "Assistente de preven\xE7\xE3o por voz (10/mes)",
        featFree5: "Auditor em tempo real",
        featFree6: "Relat\xF3rio mensal de seguran\xE7a",
        featPrem1: "Tudo da protecao essencial",
        featPrem2: "Scanner IA ilimitado",
        featPrem3: "Assistente de preven\xE7\xE3o ilimitado",
        featPrem4: "Auditor ao vivo (15 min/mes)",
        featPrem5: "Relat\xF3rio mensal de seguran\xE7a",
        featPrem6: "Experiencia limpa, sem interrupcoes",
        featFam1: "Tudo do Premium, multiplicado pela fam\xEDlia",
        featFam2: "Auditor ao vivo \u2014 60 min/mes para toda a fam\xEDlia",
        featFam3: "Protecao para ate 5 membros",
        featFam4: "Saiba quando a fam\xEDlia chegou ou saiu de casa",
        featFam5: "Cuidado ativo para parentes idosos",
        featFam6: "Atendimento prioritario",
        termsFooter: "A assinatura e renovada automaticamente no final de cada periodo pelo preco exibido acima, a menos que seja cancelada pelo menos 24 horas antes do termino do periodo vigente. Pode gerir e cancelar a sua assinatura nas configuracoes da sua conta:\n\n- iOS: Definicoes > [O seu nome] > Assinaturas\n- Android: Google Play > Perfil > Pagamentos e assinaturas\n\nAo continuar, concorda com os nossos Termos de Utilizacao e Politica de Privacidade."
      },
      configMenu: {
        title: "Perfis e Configuracoes",
        familyProfiles: "Perfis Familiares",
        assistantVoice: "Voz do Assistente",
        securityDevices: "Dispositivos de Seguran\xE7a",
        aboutApp: "Sobre o Vigilaro Care"
      },
      common: {
        locale: "pt-PT"
      },
      welcome: {
        title: "Bem-vindo ao Vigilaro Care",
        subtitle: "Preven\xE7\xE3o Inteligente para Proteger Quem Voc\xEA Ama.",
        accessibility: "Acessibilidade",
        accessibilityLabel: "Configura\xE7\xF5es de Acessibilidade",
        lgpdConsent: "Li e concordo com os",
        termsOfUse: "Termos de Utiliza\xE7\xE3o",
        lgpdAnd: "e",
        privacyPolicy: "Pol\xEDtica de Privacidade",
        startNow: "Come\xE7ar Agora"
      },
      animals: {
        title: "Animais",
        subtitle: "Guia de Identifica\xE7\xE3o",
        searchPlaceholder: "Pesquisar animal...",
        emergencyTitle: "Emerg\xEAncia Toxicol\xF3gica?",
        emergencyDesc: "Ligue para o CIATOX: 0800 722 6001",
        andMore: "e +{{count}}",
        noResults: "Nenhum animal encontrado."
      },
      plants: {
        title: "Plantas",
        subtitle: "Guia de Identifica\xE7\xE3o",
        searchPlaceholder: "Buscar planta...",
        emergencyTitle: "Emerg\xEAncia Toxicol\xF3gica?",
        emergencyDesc: "Ligue para o CIATOX: 0800 722 6001",
        variedSymptoms: "Sintomas variados",
        andMore: "e +{{count}}",
        noResults: "Nenhuma planta encontrada."
      },
      detail: {
        toxicParts: "Partes T\xF3xicas",
        humanSymptoms: "Sintomas em Humanos",
        petSymptoms: "Sintomas em Pets",
        generalSymptoms: "Sintomas Gerais",
        whereFound: "\u{1F4CD} Onde \xE9 Encontrado",
        safeAlternatives: "\u{1F331} Alternativas Seguras",
        howToPrevent: "Como Evitar / Prevenir",
        practicalExamples: "Exemplos Pr\xE1ticos",
        identification: "Identifica\xE7\xE3o",
        firstAid: "Primeiros Socorros",
        whatToDo: "O que Fazer",
        whatNotToDo: "O que N\xC3O Fazer",
        curiosities: "Curiosidades",
        dataStats: "Dados & Estat\xEDsticas",
        importance: "Import\xE2ncia",
        definition: "Defini\xE7\xE3o",
        description: "Descri\xE7\xE3o",
        completeGuide: "Guia Completo",
        details: "Detalhes"
      },
      fasesVida: {
        title: "Fases da Vida",
        subtitle: "Guia de prote\xE7\xE3o por faixa et\xE1ria",
        relatedGuides: "Guias de Seguran\xE7a por Idade",
        tagBabies: "Beb\xEAs",
        tagChildren: "Crian\xE7as",
        tagElderly: "Idosos"
      },
      petsMenu: {
        headerTitle: "Seguran\xE7a Pet",
        headerSubtitle: "Prote\xE7\xE3o para seu melhor amigo",
        introText: "Nossos pets s\xE3o curiosos e dependem de n\xF3s para ficarem seguros. Escolha uma categoria abaixo.",
        prenhez: {
          titulo: "Prenhez e Ninhadas",
          subtitulo: "Gesta\xE7\xE3o e Parto",
          descricao: "Cuidados especiais para a mam\xE3e e os filhotes."
        },
        filhotes: {
          titulo: "Filhotes",
          subtitulo: "0 a 12 meses",
          descricao: "Seguran\xE7a e socializa\xE7\xE3o nos primeiros meses."
        },
        adultos: {
          titulo: "Pets Adultos",
          subtitulo: "Vida Adulta",
          descricao: "Preven\xE7\xE3o de acidentes na vida adulta."
        },
        aves: {
          titulo: "Aves",
          subtitulo: "P\xE1ssaros Ornamentais",
          descricao: "Teflon, vapores e correntes de ar."
        },
        wellness: {
          titulo: "Hub Bem-Estar",
          subtitulo: "Cuidados Di\xE1rios",
          descricao: "Dicas de rotina, hidrata\xE7\xE3o e enriquecimento."
        },
        pequenos: {
          titulo: "Pequenos Pets",
          subtitulo: "Roedores e outros",
          descricao: "Coelhos, Hamsters e porquinhos."
        },
        peixes: {
          titulo: "Peixes",
          subtitulo: "Aqu\xE1rios",
          descricao: "Peixes e R\xE9pteis aqu\xE1ticos."
        },
        alimentos: {
          titulo: "Alimentos Proibidos",
          subtitulo: "Seguran\xE7a Alimentar",
          descricao: "O que seu pet nunca deve comer."
        },
        socorros: {
          titulo: "Primeiros Socorros",
          subtitulo: "A\xE7\xF5es de Emerg\xEAncia",
          descricao: "O que fazer em engasgos, mordidas e quedas."
        },
        guia_socorros_pet: {
          titulo: "Guia de Socorros",
          subtitulo: "Aprendizado Preventivo",
          descricao: "Estude o passo a passo para agir com calma."
        },
        kit_pet_checklist: {
          titulo: "Kit de Emerg\xEAncia",
          subtitulo: "Checklist Pr\xE1tico",
          descricao: "Monte e verifique o kit de prontid\xE3o do seu pet."
        }
      },
      lazerMenu: {
        headerTitle: "Lazer & F\xE9rias",
        headerSubtitle: "Divers\xE3o com seguran\xE7a garantida.",
        lazer: {
          title: "Lazer & Divers\xE3o",
          subtitulo: "Praia, Piscina, Parques",
          desc: "Seguran\xE7a em momentos de lazer, camping e atividades ao ar livre."
        },
        ferias: {
          title: "F\xE9rias & Viagem",
          subtitulo: "Estrada, Hotel, Avi\xE3o",
          desc: "Cuidados na estrada, seguran\xE7a em hot\xE9is e documentos de viagem."
        },
        mobilidade: {
          title: "Mobilidade & E-Bikes",
          subtitulo: "Bikes el\xE9tricas, carros e mais",
          desc: "Regras de tr\xE2nsito, categorias do CTB e dicas de seguran\xE7a para ve\xEDculos de lazer e micromobilidade."
        }
      },
      riscosFisicos: {
        headerTitle: "Riscos F\xEDsicos",
        headerSubtitle: "Eletricidade, Quedas e mais."
      },
      ageGroup: {
        risksTitle: "Principais Riscos",
        howToPrevent: "Como Prevenir:"
      },
      petWellness: {
        title: "Hub de Bem-Estar",
        subtitle: "Cuidados di\xE1rios para uma vida longa e feliz",
        introText: "A preven\xE7\xE3o \xE9 a melhor forma de amor. Pequenos ajustes na rotina podem evitar grandes emerg\xEAncias no futuro."
      },
      petFood: {
        headerTitle: "Lista Negra",
        heroTitle: "Alimentos Proibidos",
        heroDesc: "Metabolismos diferentes tornam petiscos de humanos em venenos letais para c\xE3es e gatos. Memorize esta lista vermelha.",
        alertTitle: "Intoxica\xE7\xE3o Recente?",
        alertDesc: "Corra ao Veterin\xE1rio ou ligue para o CIATOX: 0800-722-6001",
        listTitle: "Mosaico de Riscos"
      },
      petPregnancy: {
        title: "Prenhez e Ninhadas",
        subtitle: "Guia completo para cuidar da m\xE3e e filhotes",
        importantTitle: "Importante",
        importantText: "Este guia \xE9 informativo. Consulte sempre um veterin\xE1rio para o acompanhamento adequado da gesta\xE7\xE3o e parto.",
        tipTitle: "Dica Importante",
        tipText: "A castra\xE7\xE3o \xE9 a forma mais eficaz de prevenir gesta\xE7\xF5es indesejadas e contribui para a sa\xFAde do seu animal de estima\xE7\xE3o. Converse com o seu veterin\xE1rio sobre o melhor momento para realizar o procedimento."
      },
      avesSeguras: {
        headerTitle: "Aves Seguras",
        environmentTitle: "Ambiente Saud\xE1vel"
      },
      petPregnancyTracker: {
        title: "Gest\xE3o de Prenhez",
        subtitle: "Acompanhamento",
        selectPet: "Selecione o Pet:",
        noPets: "Nenhum pet encontrado.",
        registerPet: "Registar Pet",
        startTracking: "Iniciar Acompanhamento",
        matingDate: "Data do Cruzamento (DD/MM/AAAA)",
        dueDate: "Previs\xE3o do Parto:",
        gestationDays: "(~{{days}} dias de gesta\xE7\xE3o)",
        confirmPregnancy: "Confirmar Prenhez",
        ongoingPregnancy: "Gesta\xE7\xE3o em Curso",
        weekNumber: "{{week}}\xAA Semana",
        start: "In\xEDcio",
        birth: "Parto",
        mating: "Cruzamento",
        forecast: "Previs\xE3o",
        weeklyTips: "Dicas da Semana",
        tip1: "Nas primeiras semanas, a alimenta\xE7\xE3o pode continuar normal. Evite stresse excessivo.",
        tip2: "O apetite pode aumentar. Consulte o veterin\xE1rio sobre ra\xE7\xE3o para cachorros (mais rica em nutrientes).",
        tip3: "Prepare o 'ninho' num local calmo. A barriga j\xE1 deve estar bem vis\xEDvel.",
        registerBirth: "Registar Nascimento",
        litterCount: "Quantidade de Crias",
        finishPregnancy: "Finalizar Gesta\xE7\xE3o",
        breedNotInformed: "Ra\xE7a n\xE3o inf.",
        errorTitle: "Erro",
        errorMatingDate: "Informe a data do cruzamento corretamente (DD/MM/AAAA).",
        errorLitterCount: "Informe a quantidade de crias.",
        successTitle: "Sucesso",
        successPregnancy: "Gest\xE3o de prenhez iniciada!",
        congratsTitle: "Parab\xE9ns!",
        congratsBirth: "Nascimento de {{count}} crias registado!",
        errorSave: "Falha ao guardar dados."
      },
      riscosMenu: {
        title: "Preven\xE7\xE3o em Casa",
        subtitle: "Guia Consultivo dos acidentes por divis\xE3o.",
        preventionTopics: "t\xF3picos de preven\xE7\xE3o"
      },
      envScreens: {
        title: "Riscos e Orienta\xE7\xF5es por Ambiente",
        preventionGuide: "Guia de preven\xE7\xE3o",
        living: "Conviv\xEAncia e Estar",
        rest: "\xC1rea de Descanso",
        services: "Servi\xE7os e Utilidades",
        leisure: "Lazer e Exterior",
        circulation: "Circula\xE7\xE3o e Acessos"
      },
      headersFirst: {
        electronicDevices: "Dispositivos Eletr\xF3nicos",
        homeAppliances: "Eletrodom\xE9sticos",
        householdUtensils: "Utens\xEDlios Dom\xE9sticos",
        toolsAndRepairs: "Ferramentas & Repara\xE7\xF5es",
        safetyAndMaintenance: "Seguran\xE7a e Manuten\xE7\xE3o.",
        gardening: "Jardinagem",
        chemicals: "Produtos Qu\xEDmicos",
        travelSafety: "Seguran\xE7a em Viagens e Lazer",
        sosPet: "S.O.S Pet",
        survivalProtocols: "Protocolos de Sobreviv\xEAncia",
        lifeThreateningCall: "Chamada de Risco de Vida",
        poisoning: "Envenenamento / T\xF3xicos",
        hemorrhage: "Hemorragia / Traumas",
        medicineKit: "Kit Rem\xE9dios",
        rescueKits: "Kits de Socorro",
        whyPrepare: "Porqu\xEA preparar-se?",
        firePlan: "Plano de Inc\xEAndio",
        critical: "CR\xCDTICO:",
        firstAid: "Primeiros Socorros",
        people: "Pessoas",
        pets: "Pets",
        arrivalInspection: "Inspe\xE7\xE3o de Chegada",
        comingSoon: "Em Breve",
        safeCheckout: "Checkout Seguro",
        travelKit: "Kit de Viagem",
        goingToTravel: "Vai Viajar?",
        destinationType: "Qual o tipo de destino?",
        travelPurpose: "Prop\xF3sito da Viagem",
        internationalDestination: "Destino Internacional?",
        whoIsGoing: "Quem vai junto?",
        itensIncluDos: "Itens inclu\xEDdos:",
        acessRios: "Acess\xF3rios",
        KitsRecomendados: "\u{1F381} Kits Recomendados",
        categorias: "Categorias",
        vigilaroAIChat: "Vigilaro AI \u2014 Chat",
        monitorDeUdio: "Monitor de \xC1udio",
        vIGILAROAI: "VIGILARO AI",
        checklistReforma: "Checklist: Reforma",
        ativarModoReforma: "Ativar Modo Reforma",
        checklistVisita: "Checklist: Visita",
        mapeamentoDeAtivos: "Mapeamento de Ativos",
        histRicoDeMelhorias: "Hist\xF3rico de Melhorias",
        mapeamentoDaCasa: "Mapeamento da Casa",
        kitsDeProntidO: "Kits de Prontid\xE3o",
        vistoriarAmbientes: "Vistoriar Ambientes",
        vigilaroVoice: "Vigilaro Voice",
        guiaDeKits: "Guia de Kits",
        novoEvento: "Novo Evento",
        novoExame: "Novo Exame",
        novoRegistro: "Novo Registro",
        semRemDios: "Sem rem\xE9dios",
        agendaVazia: "Agenda Vazia",
        saDeDoPet: "Sa\xFAde do Pet",
        nenhumPetCadastrado: "Nenhum Pet Cadastrado",
        compartilhar: "Compartilhar",
        infoRTulos: "InfoR\xF3tulos",
        atividadesEventuais: "Atividades Eventuais",
        guiaDeSeguranA: "Guia de Seguran\xE7a",
        dicasDeOuro: "Dicas de Ouro:",
        excelente: "Excelente!",
        pontosDeAtenO: "Pontos de Aten\xE7\xE3o",
        polTicaDePrivacidade: "Pol\xEDtica de Privacidade",
        raioXDaMoradia: "Raio X da Moradia",
        seuRelatRioPersonalizado: "Seu Relat\xF3rio Personalizado",
        atividadeRecente: "Atividade Recente",
        nenhumaAtividadeRecente: "Nenhuma atividade recente",
        relatRioCompleto: "Relat\xF3rio Completo",
        PontosDeAtenO: "\u26A0\uFE0F Pontos de Aten\xE7\xE3o",
        PerguntasParaFazerEscola: "\u{1F4AC} Perguntas para Fazer \xE0 Escola",
        dicaImportante: "Dica Importante",
        verRelatRioCompleto: "Ver Relat\xF3rio Completo",
        relatRioInstitucional: "Relat\xF3rio Institucional",
        RiscosCrTicosIdentificados: "\u{1F6A8} Riscos Cr\xEDticos Identificados",
        PerguntasParaAInstituiO: "\u{1F4AC} Perguntas para a Institui\xE7\xE3o",
        notaDeAuditoria: "Nota de Auditoria",
        gerarRelatRioTCnico: "Gerar Relat\xF3rio T\xE9cnico",
        anLiseDeSeguranA: "An\xE1lise de Seguran\xE7a",
        gestODeEventos: "Gest\xE3o de Eventos",
        termosDeUso: "Termos de Uso",
        ferramentasIA: "Ferramentas IA",
        histRicoAnalTico: "Hist\xF3rico Anal\xEDtico",
        fazendoAsMalas: "Fazendo as Malas",
        monitorDeVisO: "Monitor de Vis\xE3o",
        investimentoEstimado: "Investimento estimado:",
        ouvirDetalhes: "Ouvir Detalhes",
        proteOPersonalizadaParaCadaPerfil: "Prote\xE7\xE3o personalizada para cada perfil",
        estamosPreparandoOsAcessRiosParaEstePerf: "Estamos preparando os acess\xF3rios para este perfil.",
        aoInstalarAcessRiosDeSeguranASigaSempreA: "Ao instalar acess\xF3rios de seguran\xE7a, siga sempre as instru\xE7\xF5es do fabricante\n                            e verifique periodicamente se est\xE3o bem fixados.",
        olComoPossoAjudar: "Ol\xE1! Como posso ajudar?",
        tireDVidasSobreSeguranADomSticaPrevenODe: "Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o de acidentes e primeiros socorros.",
        respondendo: "Respondendo...",
        assistenteDeVoz: "Assistente de Voz",
        converseNaturalmenteComNossaIAEspecializ: "Converse naturalmente com nossa IA especializada. Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o e primeiros socorros.",
        tireDVidasEmTempoReal: "Tire d\xFAvidas em tempo real",
        suporteParaEmergNcias: "Suporte para Emerg\xEAncias",
        dicasDePrevenO: "Dicas de Preven\xE7\xE3o",
        falarComAIAElevenLabs: "Falar com a IA (ElevenLabs)",
        digitarTexto: "Digitar Texto",
        comoFunciona: "Como funciona?",
        deixeEsteCelularNoQuartoDoBebOuAmbienteM: "Deixe este celular no quarto do beb\xEA ou ambiente monitorado.\n                            Se houver choro ou barulho alto, ele emitir\xE1 um alerta visual.",
        vigilaroAI: "Vigilaro AI",
        vigilaroEstPensando: "Vigilaro est\xE1 pensando...",
        vERIFICAODESEGURANA: "VERIFICA\xC7\xC3O DE SEGURAN\xC7A",
        sIM: "SIM",
        nO: "N\xC3O",
        nA: "N/A",
        eVITE: "EVITE",
        aTENO: "ATEN\xC7\xC3O",
        ReasExternas: "\xC1reas Externas",
        quintalPiscinaELazer: "Quintal, Piscina e Lazer",
        prXimoAmbiente: "Pr\xF3ximo Ambiente",
        voltar: "Voltar",
        cRTICO: "CR\xCDTICO",
        salvar: "Salvar",
        marqueOQueVocPossuiEmCasaParaAtivarOsAle: "Marque o que voc\xEA possui em casa para ativar os alertas de prote\xE7\xE3o personalizados.",
        pareceQueVocAindaNOTemRegistros: "Parece que voc\xEA ainda n\xE3o tem registros.",
        realizeVistoriasEMarqueOsItensComoSeguro: "Realize vistorias e marque os itens como Seguros para construir seu hist\xF3rico.",
        marcadoComoSeguro: "Marcado como Seguro \u2713",
        indiqueOQueExisteNaSuaCasa: "Indique o que existe na sua casa",
        salvarMapeamento: "Salvar Mapeamento",
        selecioneUmaCategoria: "Selecione uma categoria",
        aCaixaDeFerramentasEstVaziaEstrutureSeus: "A caixa de ferramentas est\xE1 vazia. Estruture seus kits de emerg\xEAncia para uma resposta r\xE1pida.",
        paraProtegermosSuaFamLiaPrecisamosConhec: "Para protegermos sua fam\xEDlia, precisamos conhecer sua casa e quem mora nela.\n              Responda apenas uma vez!",
        ondeVocMora: "Onde voc\xEA mora?",
        quantosAndares: "Quantos andares?",
        ReasExternasLazer: "\xC1reas Externas & Lazer",
        estruturasRiscosInternos: "Estruturas & Riscos Internos",
        prioridadesDeSeguranA: "Prioridades de Seguran\xE7a \u{1F6A8}",
        oQueMaisTePreocupaHoje: "O que mais te preocupa hoje?",
        proteEsJInstaladas: "Prote\xE7\xF5es J\xE1 Instaladas \u2705",
        checklistsDeSeguranA: "Checklists de Seguran\xE7a",
        suaCasaAindaNOFoiMapeada: "Sua casa ainda n\xE3o foi mapeada",
        paraCriarChecklistPersonalizadosPrecisam: "Para criar checklist personalizados, precisamos saber o que existe na sua casa (Piscina? Escadas? Quintal?).",
        iniciarMapeamentoDaCasa: "Iniciar Mapeamento da Casa",
        oQueTenhoAtivos: "O Que Tenho (Ativos)",
        inventRioDeRisco: "Invent\xE1rio de Risco",
        mapeie25ItensPerigososAirFryerVidrosEsca: "Mapeie 25+ itens perigosos (Air Fryer, Vidros, Escadas...) para ativar a prote\xE7\xE3o inteligente.",
        mapear: "Mapear",
        ajustarAmbientesMapeados: "Ajustar Ambientes Mapeados",
        adicionarOutraResidNcia: "Adicionar Outra Resid\xEAncia",
        riscosPrevenOEOQueFazerEmCasoDeAcidente: "Riscos, preven\xE7\xE3o e o que fazer em caso de acidente",
        conteDoNOEncontrado: "Conte\xFAdo n\xE3o encontrado.",
        resumoOtimizadoRiscoAO: "Resumo Otimizado (Risco + A\xE7\xE3o)",
        lembreSeAPrevenOAtivaDependeDeVerificaOC: "Lembre-se: A preven\xE7\xE3o ativa depende de verifica\xE7\xE3o constante.",
        regrasDeOuro: "Regras de Ouro",
        risco: "Risco:",
        ePIs: "EPIs:",
        cuidado: "Cuidado:",
        estejaPreparadoQuandoPrecisar: "Esteja preparado quando precisar.",
        montarEsteKit: "Montar este Kit",
        cultivoSeguro: "Cultivo Seguro",
        APrTicaDaJardinagemEOCultivoDeHortasEmCa: '"A pr\xE1tica da jardinagem e o cultivo de hortas em casa s\xE3o atividades terap\xEAuticas. O equil\xEDbrio entre equipamento correto e seguran\xE7a \xE9 fundamental."',
        preparaODoSolo: "Prepara\xE7\xE3o do Solo",
        podaEManutenO: "Poda e Manuten\xE7\xE3o",
        regaELimpeza: "Rega e Limpeza",
        proteOObrigatRia: "Prote\xE7\xE3o \xE9 Obrigat\xF3ria!",
        Luvas: "\u2022 Luvas:",
        CalAdosFechados: "\u2022 Cal\xE7ados Fechados:",
        Roupas: "\u2022 Roupas:",
        ProteOSolar: "\u2022 Prote\xE7\xE3o Solar:",
        ProdutosQuMicos: "\u2623\uFE0F Produtos Qu\xEDmicos",
        embalagemOriginal: "embalagem original",
        PlantasTXicas: "\u{1F33F} Plantas T\xF3xicas",
        comigoNinguMPode: "Comigo-ningu\xE9m-pode",
        bicoDePapagaio: "Bico-de-papagaio",
        AnimaisPeOnhentos: "\u{1F577}\uFE0F Animais Pe\xE7onhentos",
        entulhosAtraemEscorpiEsEAranhasMantenhaO: "Entulhos atraem escorpi\xF5es e aranhas. Mantenha o quintal limpo e examine cal\xE7ados e luvas antes de usar.",
        PrevenirEmCasa: "\u{1F4F0} Prevenir em Casa",
        lerArtigoCompleto: "Ler artigo completo",
        compartilharEsteArtigo: "Compartilhar este artigo",
        iNTOXICAO: "INTOXICA\xC7\xC3O?",
        ligueImediatamente08007226001: "Ligue imediatamente: 0800 722 6001",
        DescriO: "\u{1F4CB} Descri\xE7\xE3o",
        PartesTXicas: "\u2623\uFE0F Partes T\xF3xicas",
        SintomasEmHumanos: "\u{1F464} Sintomas em Humanos",
        SintomasEmPetsCEsEGatos: "\u{1F43E} Sintomas em Pets (C\xE3es e Gatos)",
        PrimeirosSocorros: "\u{1FA79} Primeiros Socorros",
        OQUEFAZER: "\u2705 O QUE FAZER:",
        OQUENOFAZER: "\u274C O QUE N\xC3O FAZER:",
        ComoIdentificar: "\u{1F50D} Como Identificar",
        OndeEncontrada: "\u{1F4CD} Onde \xE9 Encontrada",
        AlternativasSeguras: "\u{1F331} Alternativas Seguras",
        considereSubstituirPorEstasPlantasNOTXic: "Considere substituir por estas plantas n\xE3o-t\xF3xicas:",
        ComoPrevenir: "\u{1F6E1}\uFE0F Como Prevenir",
        MantenhaAPlantaForaDoAlcanceDeCrianAsEPe: "\u2022 Mantenha a planta fora do alcance de crian\xE7as e pets",
        EnsineCrianAsANOTocarOuComerPlantas: "\u2022 Ensine crian\xE7as a n\xE3o tocar ou comer plantas",
        UseLuvasAoManusearAPlanta: "\u2022 Use luvas ao manusear a planta",
        ConsidereRemovLaSeHouverCrianAsPequenasO: "\u2022 Considere remov\xEA-la se houver crian\xE7as pequenas ou pets",
        MantenhaONMeroDoCentroDeIntoxicaOSalvo08: "\u2022 Mantenha o n\xFAmero do Centro de Intoxica\xE7\xE3o salvo: 0800 722 6001",
        lIGARPARACENTRODEINTOXICAO: "LIGAR PARA CENTRO DE INTOXICA\xC7\xC3O",
        riscosInvisVeisEmCasa: "Riscos invis\xEDveis em casa",
        sobre: "Sobre",
        frequNciaDeUso: "Frequ\xEAncia de uso",
        maisVulnerVeis: "Mais vulner\xE1veis",
        riscosIdentificados: "Riscos Identificados",
        comoPrevenir: "Como Prevenir",
        oQueFazerEmCasoDeAcidente: "O Que Fazer em Caso de Acidente",
        vocSabia: "Voc\xEA sabia?",
        teoriaDoFogo: "Teoria do Fogo",
        conceitosEssenciaisDePrevenO: "Conceitos essenciais de preven\xE7\xE3o.",
        FRiasEMomentosDeLazerExigemAtenORedobrad: '"F\xE9rias e momentos de lazer exigem aten\xE7\xE3o redobrada. Descubra como prevenir acidentes fora de casa."',
        cOMOPREVENIR: "COMO PREVENIR",
        pRIMEIROSSOCORROS: "PRIMEIROS SOCORROS",
        utensLiosDomSticos: "Utens\xEDlios Dom\xE9sticos",
        seguranANaCozinhaEReasDeServiO: "Seguran\xE7a na cozinha e \xE1reas de servi\xE7o.",
        requerTrava: "Requer Trava",
        RiscosPrincipais: "\u26A0\uFE0F Riscos Principais",
        PrevenO: "\u{1F6E1}\uFE0F Preven\xE7\xE3o",
        eletrodomesticos: "Eletrodomesticos",
        guiaDeSeguranAParaEquipamentosDomSticos: "Guia de seguran\xE7a para equipamentos dom\xE9sticos.",
        RedeDeApoio: "\u{1F4A1} Rede de Apoio",
        mantenhaEssaListaAtualizadaEmUmaEmergNci: "Mantenha essa lista atualizada. Em uma emerg\xEAncia, esses contatos aparecer\xE3o no topo.",
        nome: "Nome *",
        detalheRelacionamento: "Detalhe / Relacionamento",
        telefone: "Telefone *",
        tipo: "Tipo *",
        cancelar: "Cancelar",
        adicionarContato: "Adicionar Contato",
        SMS: "\u{1F4AC} SMS",
        nenhumContatoNestaLista: "Nenhum contato nesta lista",
        centralDeAOImediata: "Central de A\xE7\xE3o Imediata",
        guiasPassoAPassoRPidosParaEngasgoEnvenen: "Guias passo a passo r\xE1pidos para Engasgo, Envenenamento e Quedas.",
        cIATOXLIGUE08007226001: "CIATOX - LIGUE 0800 722 6001",
        buscarClNicas24hNaRegiO: "Buscar Cl\xEDnicas 24h na Regi\xE3o",
        protocolosDetectados: "Protocolos Detectados",
        atenOAveNaCasa: "Aten\xE7\xE3o: Ave na Casa",
        riscoRespiratRioCrTicoTeflonVapores: "Risco Respirat\xF3rio Cr\xEDtico (Teflon/Vapores)",
        carteirinhaDeVacinaO: "Carteirinha de Vacina\xE7\xE3o",
        histRicoParaApresentarAoVeterinRio: "Hist\xF3rico para apresentar ao Veterin\xE1rio.",
        fAAAGORA: "FA\xC7A AGORA:",
        sAMU192: "SAMU: 192",
        bOMBEIROS193: "BOMBEIROS 193",
        sAIR: "SAIR",
        oQUEACONTECEU: "O QUE ACONTECEU?",
        reviseOsItensAbaixoParaRestaurarASeguran: "Revise os itens abaixo para restaurar a seguran\xE7a do lar.",
        NdiceRestauradoEstimado: "\xCDndice restaurado estimado",
        concluirEVoltarAoDashboard: "Concluir e voltar ao Dashboard",
        kitParaEmergNcias: "Kit para Emerg\xEAncias",
        vitalParaSobrevivNciaEmCatStrofesNaturai: "Vital para sobreviv\xEAncia em cat\xE1strofes naturais como enchentes, deslizamentos e desmoronamentos, al\xE9m de inc\xEAndios. Deve garantir autonomia e seguran\xE7a por 72 horas.",
        checklistDoKit: "Checklist do Kit",
        verifiqueAValidadeDosAlimentosEGuaACada6: "Verifique a validade dos alimentos e \xE1gua a cada 6 meses.",
        kitPrimeirosSocorros: "Kit Primeiros Socorros",
        essencialParaOAtendimentoImediatoDeLesEs: "Essencial para o atendimento imediato de les\xF5es antes da chegada de ajuda profissional. Estar equipado permite limpar ferimentos, conter sangramentos e evitar infec\xE7\xF5es, fazendo a diferen\xE7a na recupera\xE7\xE3o.",
        conteDoRecomendado: "Conte\xFAdo Recomendado",
        mantenhaEsteKitEmLocalFrescoSecoEForaDoA: "Mantenha este kit em local fresco, seco e fora do alcance de crian\xE7as, mas de f\xE1cil acesso para adultos.",
        seuPortaRemDios: "Seu Porta Rem\xE9dios",
        umaFarmCiaDomSticaOrganizadaGaranteAcess: "Uma farm\xE1cia dom\xE9stica organizada garante acesso r\xE1pido a medicamentos. Mantenha controle rigoroso de validade e armazenamento para evitar intoxica\xE7\xF5es e garantir efic\xE1cia.",
        listaDeItensEssenciais: "Lista de Itens Essenciais",
        mantenhaRemDiosLongeDoAlcanceDeCrianAsEV: "Mantenha rem\xE9dios longe do alcance de crian\xE7as e verifique a validade regularmente.",
        terOsKitsCertosEProntosEMOTransformaOCao: "Ter os kits certos e prontos e \xE0 m\xE3o, transforma o caos em controle protegendo sua fam\xEDlia.",
        mantenhaSeusKitsSempreAtualizadosEVerifi: "Mantenha seus kits sempre atualizados e verifique a validade dos itens a cada 6 meses.",
        NdiceAtual: "\xCDndice atual",
        riscoTemporRioDetectadoSigaAsRecomendaEs: "Risco tempor\xE1rio detectado \u2014 siga as recomenda\xE7\xF5es",
        recomendaEsPrincipais: "Recomenda\xE7\xF5es principais",
        RecolhaFerramentasAoFinalDoDia: "\u2022 Recolha ferramentas ao final do dia.",
        EviteImprovisarConexEsElTricas: "\u2022 Evite improvisar conex\xF5es el\xE9tricas.",
        MantenhaReasDeCirculaOLivres: "\u2022 Mantenha \xE1reas de circula\xE7\xE3o livres.",
        MantenhaASupervisOConstante: "\u2022 Mantenha a supervis\xE3o constante.",
        VerifiqueTrancasEPortEsRegularmente: "\u2022 Verifique trancas e port\xF5es regularmente.",
        AtenORedobradaComPiscinaECozinha: "\u2022 Aten\xE7\xE3o redobrada com piscina e cozinha.",
        SigaOChecklistDeSeguranA: "\u2022 Siga o checklist de seguran\xE7a.",
        revisarChecklist: "Revisar checklist",
        encerrarSituaO: "Encerrar situa\xE7\xE3o",
        preparaOSalvaVidas: "Prepara\xE7\xE3o salva vidas",
        "3min": "3min",
        tempoParaEvacuar: "Tempo para evacuar",
        treinarPorAno: "Treinar por ano",
        monteSeuPlano: "Monte seu Plano:",
        prevenO3DAplicada: "Preven\xE7\xE3o 3D Aplicada",
        emCasoDeIncNdio: "Em Caso de Inc\xEAndio",
        lembreSe: "Lembre-se",
        aVidaVemPrimeiroObjetosPodemSerSubstituD: "A vida vem primeiro! Objetos podem ser substitu\xEDdos. NUNCA volte para uma casa em chamas.",
        respostaRPidaEmEmergNcias: "Resposta r\xE1pida em emerg\xEAncias",
        cOMOAGIR: "COMO AGIR",
        aTENOVETERINRIA: "ATEN\xC7\xC3O VETERIN\xC1RIA",
        oQUEFAZER: "O QUE FAZER",
        oQUENOFAZER: "O QUE N\xC3O FAZER",
        qUANDOCHAMARAJUDA: "QUANDO CHAMAR AJUDA",
        fichaMDica: "Ficha M\xE9dica",
        enviarPorWhatsApp: "Enviar por WhatsApp",
        copiarFicha: "Copiar Ficha",
        meusContatos: "Meus Contatos",
        redeDeApoioPerfil: "Rede de Apoio Perfil",
        aRedeDeApoioPrioritRiaEstVaziaCadastreCo: "A rede de apoio priorit\xE1ria est\xE1 vazia. Cadastre contatos t\xE1ticos essenciais.",
        AdicionarNovo: "+ Adicionar Novo",
        novoContato: "Novo Contato",
        caracterSticas: "Caracter\xEDsticas:",
        Dicas: "\u{1F4A1} Dicas:",
        OndeEncontrar: "\u{1F6D2} Onde encontrar:",
        ePIsDomSticos: "EPIs Dom\xE9sticos",
        proteOParaAtividadesDoDiaADia: "Prote\xE7\xE3o para atividades do dia a dia",
        categoriasDeProteO: "Categorias de Prote\xE7\xE3o",
        quandoUsar: "Quando Usar?",
        vejaQuaisEPIsSORecomendadosParaCadaAtivi: "Veja quais EPIs s\xE3o recomendados para cada atividade",
        mantenhaSeusEPIsOrganizadosEEmBomEstadoS: "Mantenha seus EPIs organizados e em bom estado. Substitua itens danificados imediatamente.",
        nenhumConteDoDisponVelNoMomento: "Nenhum conte\xFAdo dispon\xEDvel no momento.",
        tPicoDeSeguranA: "T\xF3pico de Seguran\xE7a",
        eSPECIALIDADE: "ESPECIALIDADE",
        pARAQUEM: "PARA QUEM?",
        dATAEHORRIO: "DATA E HOR\xC1RIO",
        lOCALOPCIONAL: "LOCAL (OPCIONAL)",
        oBSERVAESOPCIONAL: "OBSERVA\xC7\xD5ES (OPCIONAL)",
        aNOTAESPSCONSULTA: "ANOTA\xC7\xD5ES P\xD3S-CONSULTA",
        rECOMENDAES: "RECOMENDA\xC7\xD5ES",
        rECEITAS: "RECEITAS",
        eNCAMINHAMENTOSGUIAS: "ENCAMINHAMENTOS/GUIAS",
        pRXIMORETORNO: "PR\xD3XIMO RETORNO",
        escolhaOTipoDeEventoQueDesejaAdicionar: "Escolha o tipo de evento que deseja adicionar:",
        nOMEDOEXAME: "NOME DO EXAME",
        lOCAL: "LOCAL",
        aNOTAESPSEXAME: "ANOTA\xC7\xD5ES P\xD3S-EXAME",
        rESULTADO: "RESULTADO",
        rECEITURIO: "RECEITU\xC1RIO",
        rETORNO: "RETORNO",
        cONDUTASINSTRUES: "CONDUTAS/INSTRU\xC7\xD5ES",
        cATEGORIA: "CATEGORIA",
        dESCRIO: "DESCRI\xC7\xC3O",
        exAlergiaAPenicilinaCirurgiaDeApendicite: "Ex: Alergia a penicilina, Cirurgia de apendicite em 2020, etc.",
        sugestEsRPidas: "Sugest\xF5es R\xE1pidas:",
        dATA: "DATA",
        permitirCompartilhamento: "Permitir compartilhamento",
        esteRegistroPoderSerIncluDoNaFichaMDicaC: "Este registro poder\xE1 ser inclu\xEDdo na ficha m\xE9dica compartilh\xE1vel",
        tIPODEPROCEDIMENTO: "TIPO DE PROCEDIMENTO",
        nOMEDOPROCEDIMENTO: "NOME DO PROCEDIMENTO",
        aNOTAESPSPROCEDIMENTO: "ANOTA\xC7\xD5ES P\xD3S-PROCEDIMENTO",
        tIPODETRATAMENTO: "TIPO DE TRATAMENTO",
        nOMEDOTRATAMENTO: "NOME DO TRATAMENTO",
        fREQUNCIA: "FREQU\xCANCIA",
        dATADEINCIO: "DATA DE IN\xCDCIO",
        toqueParaConferir: "Toque para conferir",
        remDios: "Rem\xE9dios",
        veterinRios: "Veterin\xE1rios",
        dossiPet: "Dossi\xEA Pet",
        adicioneMedicaEsEVacinasDoSeuPetAqui: "Adicione medica\xE7\xF5es e vacinas do seu pet aqui.",
        tosaVacinasOuConsultasVeterinRiasAparece: "Tosa, vacinas ou consultas veterin\xE1rias aparecer\xE3o aqui.",
        cadastreUmPerfilDePetNoGerenciadorParaUs: "Cadastre um perfil de Pet no Gerenciador para usar este m\xF3dulo.",
        sobreOCompartilhamento: "Sobre o compartilhamento",
        selecioneQuaisInformaEsDesejaIncluirNaFi: "Selecione quais informa\xE7\xF5es deseja incluir na ficha m\xE9dica. Voc\xEA pode compartilhar via WhatsApp, email ou copiar o texto.",
        oQUEINCLUIR: "O QUE INCLUIR",
        medicamentosAtuais: "Medicamentos Atuais",
        tratamentosEmAndamento: "Tratamentos em Andamento",
        agendaMDica: "Agenda M\xE9dica",
        histRicoMDico: "Hist\xF3rico M\xE9dico",
        apenasRegistrosMarcadosComoCompartilhVei: "Apenas registros marcados como compartilh\xE1veis",
        pRVIA: "PR\xC9VIA",
        copiar: "Copiar",
        compartilharAgora: "Compartilhar Agora",
        histRicoDeAuditorias: "Hist\xF3rico de Auditorias",
        nenhumaAuditoriaRegistradaRealizeAPrimei: "Nenhuma auditoria registrada. Realize a primeira vistoria para criar o hist\xF3rico de seguran\xE7a desta resid\xEAncia.",
        lD50DoseLetalOral: "LD50 (dose letal oral)",
        carcinogenicidade: "Carcinogenicidade",
        genotoxicidade: "Genotoxicidade",
        toxicidadeReprodutiva: "Toxicidade Reprodutiva",
        fonteEPAComputationalToxicology: "Fonte: EPA Computational Toxicology",
        seguranAEmProdutosParaSuaFamLia: "Seguran\xE7a em produtos para sua fam\xEDlia",
        escanearCDigoDeBarras: "Escanear C\xF3digo de Barras",
        aponteACMeraParaIdentificarOProduto: "Aponte a c\xE2mera para identificar o produto",
        seuPerfilFamiliar: "Seu perfil familiar",
        alertasPersonalizadosSerOExibidosNosResu: "Alertas personalizados ser\xE3o exibidos nos resultados.",
        cONSULTASRECENTES: "CONSULTAS RECENTES",
        cIATOXEmergNciaToxicolGica: "CIATOX \u2014 Emerg\xEAncia Toxicol\xF3gica",
        "08007226001Gratuito24h": "0800 722 6001 (Gratuito, 24h)",
        metodologia3D: "Metodologia 3D",
        conceitosFundamentais: "Conceitos Fundamentais",
        gUIADEUSO: "GUIA DE USO",
        paraQueServe: "Para que serve:",
        importNcia: "Import\xE2ncia:",
        seNOTomar: "Se n\xE3o tomar:",
        verReceitaDigital: "Ver Receita Digital",
        editar: "Editar",
        remover: "Remover",
        nenhumMedicamentoComHorRioDefinidoConfig: "Nenhum medicamento com hor\xE1rio definido. Configure agendamentos para garantir ades\xE3o ao tratamento.",
        adicionarRemDio: "Adicionar Rem\xE9dio",
        fotografarCaixaRemDio: "Fotografar Caixa/Rem\xE9dio",
        SeguranAVisual: "(Seguran\xE7a Visual)",
        analisandoRemDio: "Analisando rem\xE9dio...",
        anexarReceitaOpcional: "Anexar Receita (Opcional)",
        FotoDoDocumento: "(Foto do Documento)",
        nomeDoMedicamento: "Nome do Medicamento",
        dosagem: "Dosagem",
        quemVaiTomar: "Quem vai tomar?",
        frequNciaHoras: "Frequ\xEAncia (horas)",
        dataEHoraDoInCio: "Data e Hora do In\xEDcio",
        paraQueServeIndicaO: "Para que serve? (Indica\xE7\xE3o)",
        porQueImportanteOpcional: "Por que \xE9 importante? (Opcional)",
        oQueAconteceSeNOTomarOpcional: "O que acontece se n\xE3o tomar? (Opcional)",
        estoqueInicialOpcional: "Estoque Inicial (Opcional)",
        dicaParaGotasTenteEstimarQuantasDosesOuM: "Dica: Para gotas, tente estimar quantas doses ou ml restam.",
        agendarTratamento: "Agendar Tratamento",
        caixasEBulas: "Caixas e Bulas",
        pLulasEFrascos: "P\xEDlulas e Frascos",
        entendi: "Entendi",
        vigilaroCareV600NeoBuild2026: "Vigilaro Care v6.0.0 (Neo Build 2026)",
        mobilidade: "Mobilidade",
        trNsitoESeguranA: "Tr\xE2nsito e Seguran\xE7a.",
        OQueDRV: "\u{1F697} O que \xE9 DRV?",
        oBRIGATRIOPORLEI: "OBRIGAT\xD3RIO POR LEI",
        QualDispositivoMeuFilhoPrecisa: "\u{1F4CA} Qual dispositivo meu filho precisa?",
        selecioneAIdadeParaVerODispositivoRecome: "Selecione a idade para ver o dispositivo recomendado:",
        PosiONoVeCulo: "\u{1F4CD} Posi\xE7\xE3o no Ve\xEDculo",
        ComoInstalar: "\u{1F527} Como Instalar",
        ComoUsar: "\u{1F476} Como Usar",
        ErrosComunsEVITE: "\u274C Erros Comuns (EVITE!)",
        LegislaO: "\u2696\uFE0F Legisla\xE7\xE3o",
        OQueMobilidadeAtiva: "\u{1F6B4} O que \xE9 Mobilidade Ativa?",
        benefCios: "Benef\xEDcios:",
        idadeDeAutonomia: "Idade de Autonomia",
        porQu: "Por qu\xEA?",
        EquipamentosNecessRios: "\u{1F6E1}\uFE0F Equipamentos Necess\xE1rios",
        LocaisApropriados: "\u2705 Locais Apropriados",
        LocaisAEvitar: "\u274C Locais a Evitar",
        RegrasDeSeguranA: "\u26A0\uFE0F Regras de Seguran\xE7a",
        ManutenO: "\u{1F527} Manuten\xE7\xE3o",
        autonomiaDeMobilidade: "Autonomia de Mobilidade",
        RegrasGeraisDeSeguranA: "\u{1F4CB} Regras Gerais de Seguran\xE7a",
        EntendendoASinalizaO: "\u{1F6A6} Entendendo a Sinaliza\xE7\xE3o",
        FatoresDeRisco: "\u26A0\uFE0F Fatores de Risco",
        eviteViasCom: "Evite vias com:",
        SeguranANoite: "\u{1F319} Seguran\xE7a \xE0 Noite",
        CuidadosComCrianAs: "\u{1F476} Cuidados com Crian\xE7as",
        idadeMNima: "Idade M\xEDnima",
        RegrasParaPassageiro: "\u{1F464} Regras para Passageiro",
        RegrasParaPiloto: "\u{1F3CD}\uFE0F Regras para Piloto",
        RiscosEspecFicosDasMotos: "\u26A0\uFE0F Riscos Espec\xEDficos das Motos",
        EmCasoDeAcidente: "\u{1F6A8} Em caso de acidente",
        bombeiros193: "Bombeiros: 193",
        pRF191: "PRF: 191",
        MicromobilidadeElTrica: "\u26A1 Micromobilidade El\xE9trica",
        categoriasNoCTB: "Categorias no CTB",
        ondeAndar: "Onde andar:",
        eNasCalAdas: "E nas cal\xE7adas?",
        RiscosDeAcidentes: "\u26A0\uFE0F Riscos de Acidentes",
        monitoramentoPreventivoProtocolosParaOSe: "Monitoramento Preventivo: Protocolos para o seu lar",
        iniciarVerificaO: "Iniciar Verifica\xE7\xE3o",
        finalizarProtocolo: "Finalizar Protocolo",
        dISTRIBUIODECONFORMIDADE: "DISTRIBUI\xC7\xC3O DE CONFORMIDADE",
        nenhumaPendNciaIdentificadaOAmbienteEstS: "Nenhuma pend\xEAncia identificada. O ambiente est\xE1 seguro.",
        fechar: "Fechar",
        toxina: "Toxina:",
        sintomas: "Sintomas:",
        "1CompromissoComSuaPrivacidade": "1. Compromisso com sua Privacidade",
        oVigilaroCareRespeitaProfundamenteSuaPri: "O Vigilaro Care respeita profundamente sua privacidade. Este documento explica como tratamos seus dados pessoais, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD - Lei n\xBA 13.709/2018).",
        "2ArmazenamentoLocalOffline": "2. Armazenamento Local (Offline)",
        seusDadosFicamComVoc: "Seus dados ficam com voc\xEA:",
        eXCLUSIVAMENTENAMEMRIADOSEUDISPOSITIVO: "EXCLUSIVAMENTE NA MEM\xD3RIA DO SEU DISPOSITIVO",
        nSNOTemosCPiaDeles: "n\xF3s n\xE3o temos c\xF3pia deles",
        "3ColetaDeDados": "3. Coleta de Dados",
        "4PermissEsDoDispositivo": "4. Permiss\xF5es do Dispositivo",
        cMera: "C\xE2mera:",
        galeria: "Galeria:",
        notificaEs: "Notifica\xE7\xF5es:",
        microfone: "Microfone:",
        "5ExclusODeDados": "5. Exclus\xE3o de Dados",
        comoOsDadosEstONoSeuAparelhoVocTemTotalC: 'Como os dados est\xE3o no seu aparelho, voc\xEA tem total controle. Para excluir tudo permanentemente, basta usar a op\xE7\xE3o "Resetar Aplicativo" no Menu ou desinstalar o app.',
        Voltar: "\u2190 Voltar",
        cDigoDeBarras: "C\xF3digo de Barras:",
        Componentes: "\u{1F9EA} Componentes",
        RiscosEPerigos: "\u26A0\uFE0F Riscos e Perigos",
        SeINGERIU: "\u{1F4A7} Se INGERIU:",
        ContatoComOLHOS: "\u{1F441}\uFE0F Contato com OLHOS:",
        ContatoComPELE: "\u270B Contato com PELE:",
        INALAO: "\u{1F4A8} INALA\xC7\xC3O:",
        ComoPrevenirAcidentes: "\u{1F6E1}\uFE0F Como Prevenir Acidentes",
        iMPORTANTE: "IMPORTANTE",
        emCasoDeAcidenteLigueIMEDIATAMENTEParaOC: "Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.\n            Tenha em m\xE3os a embalagem do produto para informar os componentes.",
        lIGARPARACIATOX: "LIGAR PARA CIATOX",
        vNCULOCOMARESIDNCIA: "V\xCDNCULO COM A RESID\xCANCIA",
        tIPOSANGUNEO: "TIPO SANGU\xCDNEO",
        rAAMESTIO: "RA\xC7A / MESTI\xC7O",
        cONDIESHISTRICO: "CONDI\xC7\xD5ES & HIST\xD3RICO",
        redeDeApoioSOS: "Rede de Apoio (SOS)",
        quemVamosProteger: "Quem vamos proteger?",
        baseadoNaMetodologiaPrevenO3DDigaQuantas: "Baseado na Metodologia Preven\xE7\xE3o 3D, diga quantas pessoas vivem na casa. Criaremos perfis para voc\xEA detalhar a seguir.",
        hUMANOS: "HUMANOS",
        aNIMAIS: "ANIMAIS",
        definirPerfis: "Definir Perfis",
        moradoresEPets: "Moradores e Pets",
        nenhumMoradorVinculado: "Nenhum morador vinculado.",
        ambientesMapeados: "Ambientes Mapeados",
        nenhumAmbienteMapeado: "Nenhum ambiente mapeado.",
        dNADeSeguranARiscosInerentes: "DNA de Seguran\xE7a (Riscos Inerentes)",
        atualizarMapeamentoEstrutural: "Atualizar Mapeamento Estrutural",
        resumoEstratGicoPorResidNcia: "Resumo estrat\xE9gico por resid\xEAncia",
        nenhumaResidNciaEncontrada: "Nenhuma resid\xEAncia encontrada.",
        carregandoPerfilPadronizado: "Carregando perfil padronizado...",
        ImplicaOSeNOResolvido: "\u26A0 Implica\xE7\xE3o se n\xE3o resolvido",
        vouResolver: "Vou resolver",
        reconheOORisco: "Reconhe\xE7o o risco",
        gerandoSeuRelatRioPersonalizado: "Gerando Seu Relat\xF3rio Personalizado...",
        cruzandoDadosDePerfilSaDeMoradiaEVistori: "Cruzando dados de perfil, sa\xFAde, moradia e vistoria.",
        riscoS: "risco(s)",
        oMorador: "O Morador",
        oAmbiente: "O Ambiente",
        planoDeAO: "Plano de A\xE7\xE3o",
        irregularidadesAtivas: "Irregularidades Ativas",
        requeremSuaAtenO: "Requerem sua aten\xE7\xE3o",
        reconhecidosPeloResponsVel: "Reconhecidos pelo Respons\xE1vel",
        registradoComDataENome: "Registrado com data e nome",
        nOVerificados: "N\xE3o Verificados",
        completeAVistoriaParaDiagnSticoPreciso: "Complete a vistoria para diagn\xF3stico preciso",
        outrosMoradores: "Outros moradores",
        pet: "Pet",
        carregandoAtividades: "Carregando atividades...",
        comeceAUsarOVigilaroParaVerSeuHistRicoAq: "Comece a usar o Vigilaro para ver seu hist\xF3rico aqui.",
        tipoDeReforma: "Tipo de Reforma",
        ondeAObraEstAcontecendo: "Onde a obra est\xE1 acontecendo?",
        nVELDESEGURANA: "N\xCDVEL DE SEGURAN\xC7A",
        tOTAL: "TOTAL",
        cRTICOS: "CR\xCDTICOS",
        nenhumaInstituiOAtingirPontuaOMXimaEmTod: "Nenhuma institui\xE7\xE3o atingir\xE1 pontua\xE7\xE3o m\xE1xima em todos os itens. Priorize as interven\xE7\xF5es nos quesitos classificados como cr\xEDticos.\n                        e questione como a escola pretende melhorar os pontos fracos identificados.",
        compartilharRelatRio: "Compartilhar Relat\xF3rio",
        continuarAvaliaO: "Continuar Avalia\xE7\xE3o",
        escolaSegura: "Escola Segura",
        checklistDeAvaliaO: "Checklist de Avalia\xE7\xE3o",
        pROGRESSOGERAL: "PROGRESSO GERAL",
        iTENSCRTICOS: "ITENS CR\xCDTICOS",
        voltarParaCategorias: "Voltar para Categorias",
        ITEMCRTICO: "\u26A0\uFE0F ITEM CR\xCDTICO",
        sTATUSDESEGURANA: "STATUS DE SEGURAN\xC7A",
        gERAL: "GERAL",
        esteRelatRioSubsidiRioENOSubstituiAVisto: "Este relat\xF3rio \xE9 subsidi\xE1rio e n\xE3o substitui a vistoria oficial do Corpo de Bombeiros ou Vigil\xE2ncia Sanit\xE1ria. \n                        Qualquer falha em itens **CR\xCDTICOS** deve ser tratada como prioridade m\xE1xima pela administra\xE7\xE3o da ILPI.",
        revisarRespostas: "Revisar Respostas",
        asiloSeguro: "Asilo Seguro",
        vistoriaTCnicoSNior: "Vistoria T\xE9cnico-S\xEAnior",
        cRTICOSEMCONFORMIDADE: "CR\xCDTICOS EM CONFORMIDADE",
        checklistDeVerificaO: "Checklist de Verifica\xE7\xE3o",
        verificarSeguranA: "Verificar Seguran\xE7a",
        pAREIMEDIATAMENTE: "PARE IMEDIATAMENTE",
        voltarECorrigir: "Voltar e Corrigir",
        estouCienteAssumirRisco: "Estou ciente (Assumir Risco)",
        aTIVIDADELIBERADA: "ATIVIDADE LIBERADA",
        sigaAsMedidasRecomendadas: "Siga as medidas recomendadas:",
        finalizar: "Finalizar",
        recomendaEs: "Recomenda\xE7\xF5es",
        emCasoDeExposiO: "Em Caso de Exposi\xE7\xE3o",
        fonteOrientaEsDeSeguranAEProtocolosDeEme: "Fonte: Orienta\xE7\xF5es de seguran\xE7a e protocolos de emerg\xEAncia (CIATOX/Fabricante).",
        detalhesDoProduto: "Detalhes do Produto",
        pROTOCOLOSOCULTOS: "PROTOCOLOS OCULTOS",
        confidencialLeiaApenasSeEstiverSozinho: "Confidencial - Leia apenas se estiver sozinho",
        mODOPNICODISCRETO: "MODO P\xC2NICO DISCRETO",
        emSituaEsDeCoaOOndeVocNOPodeRevelarQueEs: "Em situa\xE7\xF5es de coa\xE7\xE3o onde voc\xEA n\xE3o pode revelar que est\xE1 pedindo ajuda:",
        sOS: "SOS",
        "3Segundos": "3 segundos",
        estaTelaNOAparecerNovamenteParaSuaSegura: "Esta tela n\xE3o aparecer\xE1 novamente para sua seguran\xE7a.",
        mEMORIZAREDESTRUIRMENSAGEM: "MEMORIZAR E DESTRUIR MENSAGEM",
        rISCOS: "RISCOS",
        pREVENO: "PREVEN\xC7\xC3O",
        eMERGNCIA: "EMERG\xCANCIA",
        dICASEXTRAS: "DICAS EXTRAS",
        viagemSegura: "Viagem Segura",
        carroHotelAviOEDocumentos: "Carro, hotel, avi\xE3o e documentos.",
        lazerDiversO: "Lazer & Divers\xE3o",
        aproveiteOsMomentosDeLazerComSeguranA: "Aproveite os momentos de lazer com seguran\xE7a.",
        monitoreRiscosTemporRios: "Monitore riscos tempor\xE1rios",
        selecioneOEvento: "Selecione o Evento",
        ajustaremosAsRecomendaEsDeSeguranAComBas: "Ajustaremos as recomenda\xE7\xF5es de seguran\xE7a com base no cen\xE1rio escolhido.",
        vigilaroCare: "Vigilaro Care",
        "1NaturezaInformativa": "1. Natureza Informativa",
        oAplicativoVigilaroCareUmaFerramentaDeAu: "O aplicativo Vigilaro Care \xE9 uma ferramenta de aux\xEDlio e preven\xE7\xE3o. Todo o conte\xFAdo, incluindo checklists, guias de primeiros socorros e an\xE1lises de IA, tem car\xE1ter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.",
        "2NOSubstituiProfissionais": "2. N\xE3o Substitui Profissionais",
        asInformaEsAquiContidasNOSubstituemEmHip: "As informa\xE7\xF5es aqui contidas N\xC3O substituem, em hip\xF3tese alguma, o diagn\xF3stico, aconselhamento ou tratamento por profissionais de sa\xFAde (m\xE9dicos, enfermeiros, socorristas) ou especialistas em seguran\xE7a.",
        "3EmCasoDeEmergNcia": "3. Em Caso de Emerg\xEAncia",
        "4LimitaODeResponsabilidade": "4. Limita\xE7\xE3o de Responsabilidade",
        osDesenvolvedoresDoVigilaroCareNOSeRespo: "Os desenvolvedores do Vigilaro Care n\xE3o se responsabilizam por quaisquer danos, les\xF5es ou perdas resultantes do uso das informa\xE7\xF5es fornecidas pelo aplicativo. A seguran\xE7a final do ambiente e das pessoas \xE9 de responsabilidade do usu\xE1rio.",
        "5InteligNciaArtificial": "5. Intelig\xEAncia Artificial",
        oRecursoDeScannerIAUtilizaInteligNciaArt: 'O recurso de "Scanner IA" utiliza intelig\xEAncia artificial para identificar poss\xEDveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu pr\xF3prio julgamento.',
        "6Privacidade": "6. Privacidade",
        caniveteSuODeSeguranA: "Canivete su\xED\xE7o de seguran\xE7a",
        resultadosSalvos: "Resultados salvos",
        eMBREVE: "EM BREVE",
        boaViagemSeguranAEmPrimeiroLugar: "Boa viagem! Seguran\xE7a em primeiro lugar. \u{1F9F3}",
        seguranANoSeuDestino: "Seguran\xE7a no seu destino",
        aquiVocTerUmChecklistCompletoParaInspeci: "Aqui voc\xEA ter\xE1 um checklist completo para inspecionar a seguran\xE7a do local assim que chegar \u2014 janelas, tomadas, piscinas, escadas, sa\xEDdas de emerg\xEAncia e muito mais.",
        inspeODeRetornoFimDaViagem: "Inspe\xE7\xE3o de Retorno (Fim da Viagem)",
        aHoraDeIrEmboraQuandoOCansaOBateEOsPiore: "A hora de ir embora \xE9 quando o cansa\xE7o bate e os piores esquecimentos acontecem. Fa\xE7a esta varredura pente-fino antes de entregar a chave.",
        checklistEssencial: "Checklist essencial",
        monteSeuKitEssencialDeViagemComFocoEmSaD: "Monte seu kit essencial de viagem com foco em sa\xFAde, higiene e primeiros socorros. Toque em cada categoria para expandir.",
        adapteEsteKitAoSeuDestinoENecessidadesCo: "Adapte este kit ao seu destino e necessidades. Consulte seu m\xE9dico antes de viajar.",
        ativeOModoViagemParaChecklistsDeSeguranA: "Ative o Modo Viagem para checklists de seguran\xE7a espec\xEDficos.",
        Lazer: "\u{1F334} Lazer",
        Trabalho: "\u{1F4BC} Trabalho",
        Sim: "\u{1F30D} Sim",
        Nacional: "\u{1F1E7}\u{1F1F7} Nacional",
        crianAs: "Crian\xE7as",
        idosos: "Idosos",
        pCDs: "PCDs",
        ativarModoViagem: "Ativar Modo Viagem",
        modoViagem: "Modo Viagem",
        assistenteDeViagem: "Assistente de Viagem",
        faAIssoSempreQueForViajar: "Fa\xE7a isso sempre que for viajar",
        inspeODePartida: "Inspe\xE7\xE3o de Partida",
        inspeODeChegada: "Inspe\xE7\xE3o de Chegada",
        checkoutSeguro: "Checkout Seguro",
        dicasTelefonesTeisEMais: "Dicas, telefones \xFAteis e mais.",
        fiqueAtento: "Fique Atento!",
        encerrarModoViagem: "Encerrar Modo Viagem",
        toqueParaAtivarHUD: "Toque para ativar HUD",
        sCANNINGAREA: "SCANNING AREA...",
        lUZ: "LUZ",
        sIRENE: "SIRENE",
        oCULTAR: "OCULTAR",
        painelSentinelaIA: "Painel Sentinela (IA)",
        controleRemotoDeLanternaParaIluminarReas: "Controle remoto de Lanterna para iluminar \xE1reas escuras.",
        sireneDePNicoComEfeitoEstroboscPicoParaE: "Sirene de P\xE2nico com efeito estrobosc\xF3pico para emerg\xEAncias.",
        modoFurtivoTelaApagadaParaMonitoramentoD: "Modo Furtivo (Tela Apagada) para monitoramento discreto.",
        iNICIARVIGILNCIA: "INICIAR VIGIL\xC2NCIA",
        fatoresDeRisco: "Fatores de Risco",
        selecioneQuemEstarPresenteNestaVisita: "Selecione quem estar\xE1 presente nesta visita:",
        gerarChecklist: "Gerar Checklist",
        tipoDeVisita: "Tipo de Visita",
        vocEstRecebendoAlguMOuIndoVisitar: "Voc\xEA est\xE1 recebendo algu\xE9m ou indo visitar?",
        recebendoVisita: "Recebendo Visita",
        prepararMinhaCasaParaConvidados: "Preparar minha casa para convidados",
        indoVisitar: "Indo Visitar",
        cuidadosAoIrNaCasaDeOutros: "Cuidados ao ir na casa de outros"
      },
      microBlog: {
        title: "Micro Blog",
        subtitle: "Prevenir em Casa",
        all: "Todos",
        minRead: "min de leitura"
      },
      ferramentasIA: {
        sectionAnaliseVisual: "An\xE1lise Visual",
        sectionAssistentes: "Assistentes",
        sectionEmBreve: "Em breve",
        scannerAmbienteTitle: "Scanner de Ambiente",
        scannerAmbienteSubtitle: "An\xE1lise Visual IA",
        scannerAmbienteDesc: "Aponte a c\xE2mara para analisar riscos de queda, objetos perigosos e condi\xE7\xF5es do ambiente.",
        voiceTitle: "Vigilaro Voice",
        voiceSubtitle: "Assistente de \xC1udio",
        voiceDesc: "Converse por voz com a IA de seguran\xE7a para esclarecer d\xFAvidas imediatas.",
        chatTitle: "Vigilaro Chat",
        chatSubtitle: "D\xFAvidas e Orienta\xE7\xF5es",
        chatDesc: "Assistente textual r\xE1pido para dicas de seguran\xE7a e protocolos.",
        detectorTitle: "Detector de Ambiente",
        detectorDesc: "Analisa ru\xEDdos (ex: choro, vidro a partir) e o n\xEDvel de seguran\xE7a luminosa do compartimento.",
        heatmapTitle: "Mapa de Calor IA",
        heatmapDesc: "Mapeamento topogr\xE1fico 3D dos pontos cegos e \xE1reas de risco da sua casa."
      }
    };
  }
});

// locales/en/common.json
var common_default3;
var init_common3 = __esm({
  "locales/en/common.json"() {
    common_default3 = {
      navigation: {
        home: "Home",
        education: "Learn",
        travel: "Travel",
        menu: "Menu",
        sosLabel: "Emergency SOS button",
        sosHint: "Tap to open emergency. Long press for quick emergency."
      },
      home: {
        mainHouse: "Main House",
        myProfile: "My Profile",
        overdueMeds: "{{count}} Overdue Meds",
        activeMonitor: "ACTIVE MONITOR",
        quickAccess: "QUICK ACCESS",
        myHealth: "My Health",
        petHealth: "Pet Health",
        inspections: "Inspections",
        infoLabels: "Scan Labels",
        infoLabelsSub: "Identify toxicity",
        tools: "Tools",
        intelligenceCenter: "Intelligence Center",
        intelligenceSub: "AI Assistant, Scanner & Voice",
        vigilaroRadar: "Vigilaro Radar",
        radarSub: "Continuous monitoring of your home",
        eventualActivities: "Occasional Activities",
        eventualSub: "Preventive Mode for special events",
        myLocations: "My Locations",
        addNewLocation: "Add new location",
        inspectedEnvironments: "Inspected Environments",
        homeSafe: "Your home is\nsafe",
        homeNeedsAttention: "Your home needs\nattention",
        actImmediately: "Act\nimmediately",
        noInspectedEnvironment: "No inspected environments.",
        criticalRisk: "\u26A0\uFE0F Critical Risk:",
        attentionPoint: "\u26A0\uFE0F Attention Point:",
        verifyItem: "Check: {{item}}",
        offlineAlert: "Offline. Only local content and SOS available.",
        batteryAlert: "Critical battery. Charge your device.",
        labelSafe: "Safe: {{pct}}%",
        labelAttention: "Attention: {{pct}}%",
        labelCritical: "Critical: {{pct}}%",
        residence: {
          alertMissingNameTitle: "Attention",
          alertMissingNameBody: "Give the new home a name.",
          createdTitle: "Home created",
          createdBody: "You can configure this home\u2019s rooms and context now without losing your flow.",
          later: "Later",
          configureNow: "Configure now",
          myResidences: "My homes",
          modalIntro: "Switch the active home or add a new one without leaving this context.",
          closeQuickForm: "Close quick form",
          addNewResidence: "Add new home",
          newResidence: "New home",
          newResidencePlaceholder: "Ex.: Beach house",
          composerHint: "After saving, you can go straight to configuring rooms and context.",
          cancel: "Cancel",
          saveResidence: "Save home"
        },
        mappingSteps: {
          perfil: "Your profile",
          moradores: "Residents",
          tipo_moradia: "Home type",
          ambientes: "Rooms",
          equipamentos: "Safety equipment",
          kits: "Emergency kits"
        },
        briefing: {
          peopleAndPets: "{{people}} person(s) and {{pets}} pet(s)",
          peopleOnly: "{{people}} person(s)",
          noResidents: "Residents not defined yet",
          statusActive: "Living base active",
          statusInProgress: "Briefing in progress",
          statusInitial: "Initial briefing",
          bodyComplete: "The home context already guides priorities, tasks, and daily recommendations.",
          bodyInProgress: "Continue step by step. The app already uses what was provided to deliver proportional guidance.",
          bodyInitial: "Start with the home context so Home can guide protection, monitoring, and tasks with real relevance.",
          progressLabel: "briefing",
          titleComplete: "Home context under monitoring",
          titleTimeline: "Mapping timeline",
          updateBriefing: "Update briefing",
          continueStep: "Continue: {{step}}",
          startMapping: "Map my home",
          timelineHome: "Active home",
          timelinePeople: "Who lives or circulates here",
          timelineRooms: "Mapped rooms",
          mappedRoomsCount: "{{count}} room(s) in the briefing",
          roomsPending: "Kitchen, bathroom, access points, and routines still pending",
          timelinePlan: "Care plan",
          pendingActionsCount: "{{count}} action(s) to prioritize",
          planReady: "Ready for daily follow-up",
          planPending: "Will be generated with the minimum context"
        },
        daily: {
          healthEyebrow: "Today\u2019s care",
          healthTitle: "Confirm pending health care",
          healthBody: "{{count}} care item(s) awaiting confirmation.",
          firstStepEyebrow: "First step",
          firstStepTitle: "Start with the home briefing",
          firstStepBody: "Rooms, residents, pets, and routines.",
          homePriorityEyebrow: "Home priority",
          homePriorityTitle: "Start with open pending items",
          homePriorityBody: "{{count}} point(s) to prioritize in the plan.",
          petEyebrow: "Sensitive routine",
          petTitle: "Review pet products and routes",
          petBody: "Products, plants, and access points.",
          preventiveEyebrow: "Preventive maintenance",
          preventiveTitle: "Keep the plan alive",
          preventiveBody: "Record a change or review the plan."
        },
        personalization: {
          defaultWho: "the people you love",
          toneDefault: "objective and continuous",
          scannerDefault: "Immediate AI for your home",
          toneAccessible: "more accessible, clear, and direct",
          scannerAccessible: "AI with a more accessible reading",
          toneChildren: "more conservative and immediate",
          scannerChildren: "More conservative AI for children",
          toneElderly: "more stable and careful",
          scannerElderly: "AI attentive to falls and routine",
          tonePets: "more sensitive to products, routes, and objects",
          scannerPets: "AI with real context for pets",
          priorityHealth: "{{count}} health care item(s) today",
          priorityHome: "{{count}} home adjustment(s)",
          priorityMapping: "{{count}} point(s) under observation",
          priorityDefault: "active preventive monitoring",
          supportVerbPlural: "count",
          supportVerbSingular: "counts",
          titleWithName: "For {{name}} and the people you love",
          titleDefault: "For you and the people you love",
          body: "{{who}} {{verb}} on {{tone}} prevention in {{house}}. AI is already prioritizing {{priority}}."
        },
        greeting: {
          morning: "Good morning",
          afternoon: "Good afternoon",
          evening: "Good evening"
        },
        signals: {
          who: "Who",
          where: "Where",
          what: "What",
          how: "How",
          aiPrevention: "AI + 3D Prevention",
          localPrevention: "Local mode + 3D Prevention",
          status: "Status",
          briefing: "Briefing",
          pending: "Pending",
          open: "Open",
          healthOpenShort: "{{count}} health",
          houseOpenShort: "{{count}} home",
          pendingOpen: "{{count}} open",
          upToDate: "Up to date",
          protected: "Protected"
        },
        hero: {
          localBadge: "Local mode",
          localTitle: "{{house}} stays protected",
          localDescription: "Essential functions active.",
          viewPriorities: "View priorities",
          reviewProfiles: "Review profiles",
          batteryBadge: "Critical battery",
          batteryTitle: "Recharge the main device",
          batteryDescription: "Recharge to keep monitoring active.",
          preventiveMode: "Preventive mode",
          briefingBadge: "Living briefing",
          briefingTitle: "{{house}} still needs its first map",
          briefingDescription: "Map the initial context.",
          whoToProtect: "Who to protect",
          mappingInProgressBadge: "Mapping in progress",
          mappingInProgressTitle: "The briefing is already shaping the home plan",
          mappingInProgressDescription: "Continue the next step.",
          viewPlan: "View plan",
          stableBadge: "Stable operation",
          stableTitle: "{{house}} has strong protection",
          stableDescription: "Keep the routine and close details.",
          openReports: "Open reports",
          manageProfiles: "Manage profiles",
          recommendedBadge: "Recommended adjustments",
          recommendedTitle: "Protection is functional, but can still improve",
          recommendedDescription: "{{count}} point(s) in the plan.",
          viewPending: "View pending items",
          priorityBadge: "Priority action",
          priorityTitle: "The most critical pending items are already mapped",
          priorityDescription: "Start with the critical points.",
          actNow: "Act now",
          scoreLabel: "score"
        },
        quick: {
          briefing: "Living briefing",
          updateContext: "Update context",
          carePlan: "Care plan",
          openPriorities: "{{count}} priority item(s)",
          houseMonitoring: "Active monitoring",
          eventualTask: "Occasional task",
          eventualTaskValue: "New care item or reminder",
          contextScanner: "Context scanner",
          contextScannerValue: "Scan label or product"
        },
        tasks: {
          myHealthTitle: "My Health",
          myHealthDueBody: "{{count}} care item(s) today.",
          myHealthBody: "Medications, history, and routine.",
          healthBadge: "Health",
          petHealthTitle: "Pet Health",
          petHealthBody: "Care, vaccines, and pet routine.",
          petHealthEmptyBody: "Add and monitor pets.",
          petBadge: "Pet",
          mappingTitle: "Living briefing",
          mappingBody: "Home context and rooms.",
          planTitle: "Action plan",
          planBody: "{{count}} priority item(s) in the plan.",
          planReadyBody: "Reports and home improvements.",
          planBadge: "Plan",
          healthTitle: "Confirm health care",
          healthBody: "{{count}} reminder(s) awaiting action today.",
          todayBadge: "Today",
          eventualTitle: "Create occasional task",
          eventualBody: "Record a one-off health care item.",
          eventualBadge: "One-off"
        },
        sections: {
          quickEyebrow: "Quick access",
          quickTitle: "Care, AI, and tasks",
          quickDescription: "Main Home actions without taking focus away from the daily plan.",
          briefingEyebrow: "Living briefing",
          briefingTitle: "Home timeline",
          briefingDescription: "Mapping now appears as the living base of care, not as a loose form.",
          dailyEyebrow: "Daily guidance",
          dailyTitle: "What to do now",
          tasksEyebrow: "Plan and tasks",
          tasksTitle: "Essential care",
          tasksDescription: "Pending items, one-off tasks, and occasional care stay visible without competing with the briefing.",
          monitorEyebrow: "Home monitor",
          monitorTitle: "Active monitor",
          aiEyebrow: "Smart tools",
          aiTitle: "AI and quick consultations",
          aiDescription: "AI remains accessible for questions, readings, and one-off decisions."
        },
        monitor: {
          summaryTitle: "Home summary",
          healthOpen: "{{count}} care item(s)\ntoday",
          collapse: "Collapse",
          expand: "Expand"
        },
        ai: {
          askEyebrow: "Ask",
          askTitle: "Vigilaro AI",
          askBody: "Chat with home context.",
          toolsEyebrow: "Tools",
          toolsTitle: "AI Center",
          toolsBody: "Scanner, voice, and history."
        }
      },
      onboarding: {
        title1: "360\xBA Shielding",
        subtitle1: "Your home protected against the most common accidents.",
        title2: "Smart Prevention",
        subtitle2: "Vigilaro analyzes your rooms and warns you before danger happens.",
        title3: "Peace of Mind",
        subtitle3: "For the whole family and pets. Preventive safety in your pocket.",
        title4: "Your Hand, Your Rule",
        subtitle4: "Optimize the interface for your dominant hand. Lefties can activate Left-Handed Mode for more accessible buttons.",
        rightHanded: "Right-handed",
        leftHanded: "Left-handed",
        skip: "Skip",
        startNow: "Start Now",
        next: "Next"
      },
      health: {
        title: "My Health",
        tabMeds: "My Meds",
        tabAgenda: "Medical Agenda",
        tabDossier: "Records",
        noMeds: "No medications",
        noMedsDesc: "Add medications to track schedules and doses",
        addMed: "Add Medication",
        noEvents: "No events",
        noEventsDesc: "Add appointments, procedures, or treatments",
        overdueMedsInfo: "{{count}} pending medication(s)",
        tapToView: "Tap to view",
        deleteMedTitle: "Delete Medication",
        deleteMedDesc: "Remove this medication from your list?",
        deleteEventTitle: "Delete Event",
        deleteEventDesc: "Do you really want to remove this event from your schedule?",
        cancel: "Cancel",
        delete: "Delete",
        doseNotSpecified: "Dose not specified",
        everyXHours: "Every {{hours}} hours",
        next: "Next:",
        overdue: "OVERDUE:",
        stock: "Stock: {{quantity}} {{unit}}",
        noTimeDefined: "Time not defined",
        nextTodayAt: "Next: Today at {{time}}",
        baseTime: "Base: {{time}}",
        onDemand: "On demand use.",
        nextSession: "Next session",
        date: "Date",
        markDone: "Mark Done",
        daysOverdue: "Overdue",
        daysLeft: "{{count}} day(s)"
      },
      checklists: {
        roomNotFound: "Room not found",
        loading: "Loading...",
        room: "Room",
        category: "Category:",
        notApplicable: "Not\nApplicable",
        verified: "verified",
        areaCompleted: "Area completed!",
        areaCleanInfo: "Area clean. Make sure all essential items have been evaluated.",
        maxPriority: "MAX PRIORITY",
        advanceTo: "Advance to",
        finishInspection: "Finish Inspection",
        naAlertTitle: "Room Not Applicable",
        naAlertDesc: "This will mark all items in this list as 'Not Applicable' (NA). Are you sure?",
        confirmNA: "Confirm N/A"
      },
      ai_assistant: {
        listening: "Listening...",
        tapToSend: "Tap to send",
        processing: "Processing...",
        transcribing: "Transcribing...",
        stop: "Stop",
        limitReached: "Limit Reached",
        bePremium: "\u{1F48E} Go Premium",
        later: "Later",
        notUnderstood: "Didn't understand. Try again.",
        networkError: "Sorry, I had a problem. Try again.",
        micPermission: "Microphone permission required",
        micError: "Error accessing microphone"
      },
      scanner: {
        introTitle: "Smart Scanner",
        introSub: "Use Artificial Intelligence to identify risks in your home and products.",
        modeEnv: "Scan Environment",
        modeEnvDesc: "Check entire rooms for fall hazards, dangerous objects, and barriers.",
        modeLabel: "Analyze Label with AI",
        modeLabelDesc: "Take a picture of the fine print, ingredients, and instructions for AI toxicity analysis.",
        modeBarcode: "Barcode",
        modeBarcodeDesc: "Quick search in global databases (Open Food Facts, UPCitemdb) with automatic toxicological analysis.",
        hint: "Point the camera and hold steady. Analysis takes a few seconds.",
        permReq: "Camera permission required",
        grant: "Grant",
        guideLabel: "Point at the label and take a picture",
        guideBarcode: "Frame the barcode",
        guideEnv: "Point at the room",
        analyzing: "Analyzing with AI...",
        newScan: "New Scan",
        resultAlerts: "\u26A0\uFE0F ALERTS FOR YOUR FAMILY",
        resultIngredients: "\u{1F9FE} INGREDIENTS",
        resultRisks: "\u26A1 MAIN RISKS",
        resultGhs: "\u{1F9EA} GHS CLASSIFICATION",
        resultFirstAid: "\u{1FA79} FIRST AID",
        resultPrevention: "\u{1F6E1}\uFE0F PREVENTION",
        resultPrecaution: "\u{1F4CB} PRECAUTIONS (GHS)",
        resultEpa: "\u{1F4CA} EPA DATA (ADVANCED TOXICOLOGY)",
        callCiatox: "CALL POISON CONTROL",
        ciatoxNumber: "0800-722-6001 (Toll-Free, 24h)",
        analyzeWithAi: "Analyze label with AI",
        analyzeWithAiSub: "Take a picture for complementary analysis",
        newSearch: "New Search",
        loadingTox: "Fetching toxicological data...",
        loadingEpa: "Fetching toxicological data (PubChem / EPA)..."
      },
      settings: {
        accessibility: "Accessibility",
        adaptForYou: "Adapt for You",
        adaptForYouDesc: "Vigilaro Care is for everyone. Adjust the settings below to improve your experience according to your needs.",
        visual: "Visual",
        largeText: "Large Text (140%)",
        largeTextDesc: "Increases the font size throughout the application for easier reading.",
        highContrast: "High Contrast",
        highContrastDesc: "Switches to a black and yellow theme for maximum visibility.",
        audioFeedback: "Audio & Feedback",
        reduceMotion: "Reduce Motion",
        reduceMotionDesc: "Decreases animations and screen transitions.",
        screenReader: "Screen Reader",
        screenReaderDesc: "Optimized for TalkBack (Android) and VoiceOver (iOS).",
        native: "NATIVE",
        interaction: "Interaction",
        leftHanded: "Left-Handed Mode",
        leftHandedDesc: "Mirrors floating buttons, menus, and controls to the left side of the screen.",
        language: "Language"
      },
      menu: {
        resetWarningTitle: "\u26A0\uFE0F Reset Application",
        resetWarningDesc: "This will delete ALL your profiles, mappings, and data. The app will return to its initial state. Are you sure?",
        resetConfirm: "Yes, Reset Everything",
        resetSuccess: "App reset! Starting from scratch... \u{1F680}",
        resetError: "Could not reset data.",
        accountAndApp: "My Account and App",
        accessibility: "Accessibility",
        accessibilityDesc: "Text size and contrast",
        premium: "Vigilaro Premium",
        premiumDesc: "Manage Subscription",
        about: "About the App",
        aboutDesc: "Version, Terms and Privacy",
        resetApp: "Reset App",
        resetAppDesc: "Delete everything and restart",
        support: "Support",
        supportDesc: "Contact us",
        terms: "Terms of Use",
        termsDesc: "Read our terms",
        privacy: "Privacy",
        privacyDesc: "Data policy",
        menuSettings: "Menu & Settings",
        generalSettings: "General settings"
      },
      sos: {
        title: "EMERGENCIES",
        generalTitle: "General Emergency",
        generalSub: "Police / Fire / Ambulance",
        generalPhone: "911",
        toxTitle: "Poison Control",
        toxSub: "1-800-222-1222",
        toxPhone: "18002221222",
        firstAid: "FIRST AID",
        firstAidSub: "Tap for step-by-step guide",
        vetTitle: "Veterinarian",
        vetSub: "Find Nearby",
        sendSos: "Send SOS",
        holdButton: "Hold button",
        medCard: "Med Card",
        medCardSub: "Health/Meds",
        contacts: "Contacts",
        saved: "Saved",
        exitSOS: "EXIT EMERGENCY MODE",
        noInternet: "NO INTERNET.\nTry 911 directly. Personal contacts may fail.",
        samuTitle: "Ambulance",
        samuSub: "Medical Emergency",
        samuPhone: "911",
        fireTitle: "Fire Department",
        fireSub: "Fire & Rescue",
        firePhone: "911",
        policeTitle: "Police",
        policeSub: "Law Enforcement",
        policePhone: "911"
      },
      medications: {
        title: "Medication Time",
        morning: "Morning",
        afternoon: "Afternoon",
        night: "Night",
        errorNameTime: "Name and Time are required.",
        errorSelectProfile: "Select a profile.",
        reminderTitle: "Medication Time: {{name}}",
        reminderBody: "Time to take {{name}} ({{dosage}}).",
        lowStock: "Low stock! Only {{count}} units of {{name}} remaining.",
        lowStockTitle: "Low Stock",
        deleteTitle: "Delete",
        deleteMsg: "Remove this medication?",
        no: "No",
        yes: "Yes",
        noRoutine: "No active routine",
        noRoutineMsg: "Add your family medications and vitamins here. We make sure no vital dose is missed.",
        manageRoutines: "Manage Routines",
        add: "Add",
        edit: "Edit",
        delete: "Delete",
        doseHistory: "Dose History",
        historyEmpty: "History is clean. No administration records found for the selected period.",
        editMed: "Edit Medication",
        newMed: "New Medication",
        medName: "Medication Name",
        dose: "Dose (e.g. 1 tab)",
        time: "Time (e.g. 14:00)",
        notification: "Notification",
        currentStock: "Current Stock",
        stockQty: "Qty (optional)",
        cancel: "Cancel",
        save: "Save",
        stock: "Stock",
        eduBoxTitle: "\u{1F6E1}\uFE0F Smart Prevention: The Weight of Delays",
        eduBoxText1: 'Medications have different "weights" in your body:',
        eduBoxText2: "\u2022 High Criticality (e.g. Antibiotics, Chronic meds): Delays compromise treatment efficacy. Maintaining the original cycle is crucial.",
        eduBoxText3: "\u2022 Low Criticality (e.g. Painkillers): The main risk is toxicity from taking doses too close together.",
        eduBoxText4: "*In case of significant delays, always inform your doctor or caregiver.*",
        delayRuleQuestion: "In case of a delay, what is the medical advice?",
        ruleRigid: "Keep Fixed Schedule (Chronic / Antibiotics)",
        ruleRigidSub: "The next dose will keep the original cycle, ignoring the delay.",
        ruleFlexible: "Count from time taken (Symptomatics)",
        ruleFlexibleSub: "The clock resets from the moment taken, preventing overdose.",
        disposalTitle: "Safe Disposal",
        disposalAlertMsg: "You are deleting this medication.\n\n\u26A0\uFE0F Remember: Never throw meds in the regular trash or flush them down the toilet. Take them to a pharmacy or drop-off location to prevent poisoning and pollution.\n\nConfirm deletion?",
        guideTitle: "Disposal Guide",
        guideBtn: "Safe Disposal",
        guideP1: "How to dispose of medications?",
        guideP2: "The cardboard box and leaflet can go to recycling (scratch out your personal data first).",
        guideP3: "Empty blister packs, bottles, expired pills or leftovers should be returned to pharmacies or designated drop-off sites. Never flush them!"
      },
      travel: {
        departureInspection: "Departure Inspection",
        departureSubtitle: "What to do before leaving home",
        departureIntro: "Avoid unexpected issues and unnecessary returns. Run through this quick checklist before locking your door.",
        homeSecurity: "Home Security",
        gasOff: "Gas valve turned off",
        waterOff: "Water valve turned off (prevents leaks)",
        electronicsOff: "Appliances unplugged (TV, Microwave)",
        windowsLocked: "All windows and vents locked",
        trashOut: "Trash taken out (avoids smell and insects)",
        perishables: "Fridge cleared of quick perishables",
        logistics: "Basic Logistics",
        keysWithNeighbor: "House keys with trusted neighbor/relative?",
        petFoodWater: "Extra food/water if pet staying home?",
        plantsWatered: "Plants watered or watering plan ready?",
        carryOn: "Carry-On Bag",
        docsWithPhoto: "Original photo ID (ID/Passport)",
        ticketsSavedOffline: "Tickets/Reservations saved offline",
        vitalMedsInBag: "Vital medications in carry-on (do not check)",
        chargerPowerbank: "Phone charger and power bank",
        cardsMoneyKeys: "Cards, cash, and house/car keys",
        completedOf: "of",
        completed: "completed"
      },
      knowledgeHub: {
        title: "Learning Center",
        subtitle: "Guides and Manuals Library",
        essentialConcepts: "Essential Concepts",
        lifeContext: "Life Context",
        safetyReviews: "Safety Reviews",
        emergencies: "Emergencies",
        practicalGuides: "Practical Guides",
        mobilityMaintenance: "Mobility and Maintenance",
        methodology: "3D Methodology",
        envPrevention: "Prevention by Environments",
        protectPet: "Protect your Pet",
        ageCare: "Age Group Care",
        pregnancyCare: "Pregnancy Care",
        toyGuide: "Toy Guide",
        kitchenUtensils: "Kitchen Utensils",
        homeAppliances: "Home Appliances",
        electronicDevices: "Electronic Devices",
        risksPrev: "Risks and Prevention",
        firePrev: "Fire Prevention",
        escapePlans: "Escape Plans",
        firstAid: "First Aid",
        eduGuide: "Educational Guide",
        kitsGuide: "Kits Guide",
        humansPets: "Humans and Pets",
        toxicPlants: "Toxic Plants",
        venomousAnimals: "Venomous Animals",
        hazardousProducts: "Hazardous Products",
        electricalRisks: "Electrical Risks",
        safeGardening: "Safe Gardening",
        kitCare: "Kit and Care",
        condoSafety: "Condominium Safety",
        extinguishersExits: "Extinguishers and Exits",
        leisureTravel: "Leisure and Travel",
        beachCamping: "Beach, Camping, E-Bikes",
        ppeTools: "PPE & Tools",
        dailySafety: "Everyday Safety",
        blogTitle: "Micro Blog",
        blogSub: "Preventing at Home",
        articles: "Articles",
        realCases: "Real Cases"
      },
      reports: {
        title: "What and How",
        subtitle: "Discover Risks and Take Action",
        personalReport: "Personal Report",
        personalReportDesc: "Detailed analysis of your home.",
        improvementHistory: "Improvement History",
        improvementHistoryDesc: "See your safety evolution.",
        environmentInspection: "Environment Inspection",
        specialInspections: "Special Inspections",
        safeSchool: "Safe School",
        safeSchoolDesc: "Evaluate the school environment.",
        safeNursingHome: "Safe Nursing Home",
        safeNursingHomeDesc: "Senior technical inspection.",
        pendencies: "Pending Items",
        item: "item",
        items: "items",
        safe: "Safe",
        pending: "Pending",
        attention: "Attention",
        risk: "Risk",
        statusSafe: "Safe",
        statusPending: "Pending",
        statusAttention: "Attention",
        statusRisk: "Risk",
        pendenciesPercent: "Pendencies ({{pct}}%)",
        missingPeople: "Missing {{count}} people.",
        pendenciesCount: "{{count}} pendencies",
        incompleteReg: "Incomplete Registration",
        resolve: "Resolve",
        verifyNow: "Verify Now",
        allSafe: "All Safe!",
        allSafeMsg: "You have completed all verifications.",
        savePDF: "Save Report as PDF"
      },
      sosCountdown: {
        fallDetected: "FALL DETECTED!",
        vitalCheck: "CHECK-IN NOT ANSWERED",
        sendingSOS: "SENDING SOS IN",
        locationMsg: "Your location will be sent to your emergency contacts.",
        cancelBtn: "CANCEL (FALSE ALARM)",
        sendingAlert: "Sending alert...",
        confirmSend: "Open your messaging app to confirm sending.",
        closeBtn: "CLOSE",
        noContactsTitle: "Attention",
        noContacts: "No emergency contacts found. Set up your support network.",
        sosErrorTitle: "Error",
        sosError: "Could not send automatic SOS.",
        fallMsg: "FALL ALERT! Strong impact detected with no response.",
        vitalMsg: "SAFETY ALERT! Daily check-in was not answered.",
        defaultMsg: "SOS! I need urgent help."
      },
      firstAid: {
        whatHappened: "What Happened?",
        tacticalProtocol: "Rapid Tactical Protocol",
        people: "PEOPLE",
        pets: "PETS",
        immediateAction: "IMMEDIATE ACTION REQUIRED",
        criticalWarning: "CRITICAL WARNING",
        callEmergency: "CALL 911 NOW",
        findVet: "FIND 24H CLINIC"
      },
      profiles: {
        title: "Who and Where",
        subtitle: "Manage profiles and homes",
        peopleTab: "People",
        petsTab: "Pets",
        homeXRay: "Home X-Ray",
        homeXRayDesc: "Building, residents and rooms summary",
        peopleProfiles: "People Profiles",
        myPets: "My Pets",
        newPet: "New Pet",
        newPerson: "New Person",
        locations: "Locations (Residences)",
        locationsHelp: "Tap the pencil icon to rename or the trash to remove.",
        newLocation: "New Location",
        renameLocation: "Rename Location",
        locationName: "Location name",
        cancel: "Cancel",
        save: "Save",
        deleteConfirm: "Remove {{name}}?",
        deleteTitle: "Delete?",
        yes: "Yes",
        petCareTitle: "Care Profile",
        petCareMsg: "The Pet cannot be the main active user of the app.",
        profileSelected: "Profile Selected",
        monitoringFor: "Now monitoring for: {{name}}",
        locationChanged: "Location Changed",
        managingNow: "Now managing: {{name}}",
        removeLocationTitle: "Remove Location?",
        removeLocationMsg: "Are you sure you want to delete this location?",
        no: "No",
        yesDelete: "Yes, Delete",
        actionBlocked: "Action Blocked",
        cannotDeleteMain: "The main profile cannot be deleted.",
        cannotDeleteActive: "Cannot delete the active residence.",
        finishGoHome: "Finish and Go Home"
      },
      addProfile: {
        editTitle: "Edit Profile",
        newTitle: "New Profile",
        person: "Person",
        pet: "Pet",
        residenceLink: "RESIDENCE LINK",
        resident: "Permanent Resident",
        visitor: "Visitor",
        name: "NAME",
        petNamePH: "Pet Name",
        personNamePH: "Full Name",
        sex: "SEX",
        gender: "GENDER",
        birth: "BIRTH DATE",
        vetFile: "Veterinary File",
        health: "Health",
        bloodType: "BLOOD TYPE",
        breed: "BREED / MIX",
        breedPH: "E.g. Golden, Mixed...",
        microchip: "MICROCHIP / ID",
        optional: "Optional",
        neutered: "NEUTERED?",
        conditions: "CONDITIONS & HISTORY",
        notes: "OTHER NOTES / ALLERGIES",
        notesPH: "Describe allergies, recurring medications...",
        sosNetwork: "Support Network (SOS)",
        sosHelp: "These contacts will be notified when you trigger SOS.",
        contactName: "Contact Name",
        contactPhone: "Whatsapp / Phone",
        addContact: "ADD",
        fillBoth: "Fill in name and phone.",
        nameRequired: "Enter the name.",
        dateIncomplete: "Incomplete birth date.",
        success: "Success",
        profileSaved: "Profile saved!",
        error: "Error",
        saveFailed: "Failed to save.",
        saveChanges: "Save Changes",
        createProfile: "Create Profile",
        galleryPerm: "We need gallery access.",
        permRequired: "Permission required"
      },
      wizard: {
        welcome: "Welcome",
        propertyType: "Property Type",
        structure: "Structure",
        residents: "Register Residents",
        protections: "Protections",
        priorities: "Priorities",
        done: "Done!",
        letsSetup: "Let us set up {{name}}",
        quickSetup: "A quick adjustment to personalize safety for your family and pets.",
        whoLivesHere: "Who lives here?",
        registerAll: "Register all residents. Tap cards to select.",
        letsStart: "Let us start?",
        addFamilyMsg: "Add yourself, your family and your pets.",
        firstResident: "Register First Resident",
        newLabel: "New",
        completeReg: "Complete Registration",
        removeProfile: "Remove?",
        removeConfirm: "Do you want to delete this profile?",
        no: "No",
        yes: "Yes",
        propertyTypeQ: "What type of property?",
        propertyTypeHelp: "This helps calibrate structural risks.",
        buildingDetails: "Main Building Details",
        buildingHow: "How is the building constructed?",
        singleStory: "Single Story",
        multiStory: "Multi-Story",
        structureRooms: "Structure and Rooms",
        selectRooms: "Select all rooms your family accesses:",
        installedProtections: "Installed Protections",
        whatProtects: "What already protects your home?",
        biggestConcerns: "Biggest Concerns",
        prioritizeAlerts: "We will prioritize alerts about:",
        setupComplete: "Setup Complete!",
        readyToMonitor: "Your environment is ready to be monitored.",
        finish: "Finish",
        continue: "Continue",
        houseConfigured: "Home Configured!",
        envReady: "Environment ready for monitoring.",
        accessHome: "Go to Home",
        configError: "Failed to save settings."
      },
      checklistWizard: {
        shieldTitle: "Let us secure your home?",
        shieldDesc: "Mapping your environment risks is the essence of 3D Prevention (Daily, Dynamic and Durable).",
        safetyWarningTitle: "Safety Warning",
        safetyWarningDesc: "Without a complete mapping, blind spots of risk remain hidden. Vigilaro Care needs to know your environment to activate health and safety alerts correctly.",
        walkThrough: "Walk through house step by step",
        chooseRoom: "Choose specific room",
        skipForNow: "Skip for now (Not recommended)",
        inspections: "Inspections",
        riskMapping: "Risk Mapping",
        selectRoom: "Select the room you want to inspect now. Start with the most used rooms.",
        priority: "Priority",
        backToApp: "Back to app (Finish later)",
        routineInspection: "Routine Inspection",
        routineInspectionDesc: "Perform periodic guided inspections to ensure your environments remain as safe as the day you set them up.",
        continuousAttention: "Continuous Attention",
        continuousAttentionDesc: "Safety is dynamic. Regularly check if new objects or changes in furniture arrangement have introduced new risks.",
        startFullAudit: "Start Full Audit",
        auditSpecificRoom: "Audit Specific Room",
        backToPanel: "Back to Dashboard",
        specificAudit: "Specific Audit",
        selectRoomToAudit: "Select which room you want to audit now:",
        backToHome: "Back to Home"
      },
      checklistReport: {
        generalAssessment: "General Assessment",
        safetyScore: "Safety Score",
        compliant: "Compliant",
        nonCompliant: "Non-Compliant",
        totalItems: "Total items assessed:",
        improvementTitle: "Improvement Opportunities",
        improvementFound: "We identified {{count}} point(s) that can be improved.",
        partnerQuote: "We are not the police, we are partners.",
        partnerMsg: "Our goal is to inform and guide. Do not worry if the score is not 100% now. What matters is knowing where to act to protect your loved ones.",
        itemNeedsAttention: "Item {{title}} needs attention",
        consultEducation: "Check the Education section for practical tips.",
        savedHistory: "Saved to History",
        savedHistoryMsg: "This assessment was automatically recorded. Track your progress over time!",
        shareReport: "Share Report",
        sharePrivacy: "* Includes privacy notice when sharing.",
        methodology3D: "3D Prevention Methodology",
        daily: "DAILY:",
        dailyDesc: "Constant and habitual care",
        dynamic: "DYNAMIC:",
        dynamicDesc: "Adaptable to family changes",
        durable: "DURABLE:",
        durableDesc: "Sustainable and continuous prevention",
        newChecklist: "New Checklist",
        home: "Home",
        privacyTitle: "Privacy and Security",
        privacyMsg: "You are about to share a detailed report containing information about the security of your residence. Make sure to send this file only to people you absolutely trust.",
        cancel: "Cancel",
        awareAndSend: "I Understand and Want to Send",
        shareError: "Could not share.",
        excellent: "Excellent!",
        excellentMsg: "Your home is very safe! Keep it up.",
        goodProgress: "Good progress!",
        goodProgressMsg: "Some adjustments needed. Prioritize non-compliant items.",
        attentionNeeded: "Attention needed",
        attentionNeededMsg: "Several risks identified. We recommend urgent action."
      },
      actionPlan: {
        title: "Action Plan",
        subtitle: "Correction Inspection",
        critical: "Critical",
        pending: "Pending",
        resolved: "Resolved",
        priorityItems: "Priority Items",
        allVerified: "All Verified!",
        risk: "RISK",
        safeZone: "Safe zone confirmed. The environment has no active vulnerabilities pending resolution.",
        backHome: "Back to Home",
        error: "Error",
        loadError: "Could not load the action plan.",
        noProfile: "No active profile found to generate the report.",
        generateReport: "Generate Report",
        generatePDFConfirm: "Do you want to generate a PDF report with the current action plan?",
        cancel: "Cancel",
        generate: "Generate",
        pdfError: "Failed to generate PDF: "
      },
      checklistCategoria: {
        tapToInspect: "Tap to start inspection",
        roomsFound: "{{count}} room(s) found in this category"
      },
      about: {
        title: "About the App",
        subtitle: "Vigilaro Care V6 Neo.",
        version: "Version",
        mission: "Our Mission",
        missionText: "Helping families create safer and more welcoming homes. We believe prevention is the greatest form of love and care. Vigilaro combines technology and empathy to protect those you love most.",
        legalInfo: "Legal Information",
        termsOfUse: "Terms of Use",
        privacyPolicy: "Privacy Policy",
        contactSupport: "Contact & Support",
        contactUs: "Contact Us",
        visitSite: "Visit our website",
        advancedSettings: "Advanced Settings",
        resetApp: "Reset App",
        resetTitle: "Reset App",
        resetMsg: "Are you sure? This will delete ALL data. The app will return to its initial state.",
        cancel: "Cancel",
        yesDeleteAll: "Yes, Delete All",
        madeWith: "Made with love by the Vigilaro team",
        copyright: "2026 Vigilaro Inc. All rights reserved."
      },
      upgrade: {
        heroTitle: "Your family deserves unlimited protection",
        heroSub: "Complete access to everything Vigilaro has to protect your loved ones.",
        premium: "Premium",
        family: "Family",
        mostComplete: "Most complete",
        monthly: "Monthly",
        annual: "Annual",
        perMonth: "/month",
        perYear: "/year",
        loading: "Loading...",
        loadingPlans: "Loading plans...",
        subscribe: "Subscribe",
        restorePurchases: "Restore Purchases",
        alreadyProtected: "You are already protected!",
        allFeatures: "All features are available to you.",
        validUntil: "Valid until:",
        back: "Back",
        offline: "Offline",
        offlineMsg: "Check your connection to make a purchase.",
        errorLink: "Could not open this link.",
        invalidProduct: "Invalid or unavailable product. Try reloading.",
        protectionActive: "Protection activated",
        understood: "Got it",
        purchaseError: "Purchase error",
        purchaseErrorFallback: "Transaction failed. Try again.",
        unexpectedError: "An error occurred at checkout. Try again.",
        subscriptionRestored: "Subscription restored",
        restoredMsg: "Your protection is active again!",
        noSubscription: "No subscription found",
        noSubscriptionMsg: "If you made a recent purchase, wait a few minutes and try again.",
        restoreError: "Failed to restore.",
        unexpectedRestore: "Could not restore purchases.",
        cannotLoad: "We could not load plans right now",
        checkConnection: "Check your connection and try again - your data is safe.",
        tryAgain: "Try again",
        error: "Error",
        save: "Save",
        featFree1: "Home safety checklists",
        featFree2: "Emergency SOS button",
        featFree3: "AI Risk Scanner (5/month)",
        featFree4: "Voice prevention assistant (10/month)",
        featFree5: "Real-time auditor",
        featFree6: "Monthly safety report",
        featPrem1: "Everything from essential protection",
        featPrem2: "Unlimited AI Scanner",
        featPrem3: "Unlimited prevention assistant",
        featPrem4: "Live auditor (15 min/month)",
        featPrem5: "Monthly safety report",
        featPrem6: "Clean experience, no interruptions",
        featFam1: "Everything in Premium, multiplied for the family",
        featFam2: "Live auditor \u2014 60 min/month for the whole family",
        featFam3: "Protection for up to 5 members",
        featFam4: "Know when family arrived or left home",
        featFam5: "Active care for elderly relatives",
        featFam6: "Priority support",
        termsFooter: "The subscription is automatically renewed at the end of each period for the price displayed above, unless canceled at least 24 hours before the end of the current period. You can manage and cancel your subscription in your account settings:\n\n- iOS: Settings > [Your name] > Subscriptions\n- Android: Google Play > Profile > Payments and subscriptions\n\nBy continuing, you agree to our Terms of Use and Privacy Policy."
      },
      configMenu: {
        title: "Profiles and Settings",
        familyProfiles: "Family Profiles",
        assistantVoice: "Assistant Voice",
        securityDevices: "Security Devices",
        aboutApp: "About Vigilaro Care"
      },
      common: {
        locale: "en-US"
      },
      welcome: {
        title: "Welcome to Vigilaro Care",
        subtitle: "Smart Prevention to Protect Those You Love.",
        accessibility: "Accessibility",
        accessibilityLabel: "Accessibility Settings",
        lgpdConsent: "I have read and agree to the",
        termsOfUse: "Terms of Use",
        lgpdAnd: "and",
        privacyPolicy: "Privacy Policy",
        startNow: "Get Started"
      },
      animals: {
        title: "Animals",
        subtitle: "Identification Guide",
        searchPlaceholder: "Search animal...",
        emergencyTitle: "Toxicological Emergency?",
        emergencyDesc: "Call Poison Control: 0800 722 6001",
        andMore: "and +{{count}}",
        noResults: "No animals found."
      },
      plants: {
        title: "Plants",
        subtitle: "Identification Guide",
        searchPlaceholder: "Search plant...",
        emergencyTitle: "Toxicology Emergency?",
        emergencyDesc: "Call CIATOX: 0800 722 6001",
        variedSymptoms: "Varied symptoms",
        andMore: "(+{{count}} more)",
        noResults: "No plants found."
      },
      detail: {
        toxicParts: "Toxic Parts",
        humanSymptoms: "Symptoms in Humans",
        petSymptoms: "Symptoms in Pets",
        generalSymptoms: "General Symptoms",
        whereFound: "\u{1F4CD} Where it is Found",
        safeAlternatives: "\u{1F331} Safe Alternatives",
        howToPrevent: "How to Avoid / Prevent",
        practicalExamples: "Practical Examples",
        identification: "Identification",
        firstAid: "First Aid",
        whatToDo: "What to Do",
        whatNotToDo: "What NOT to Do",
        curiosities: "Curiosities",
        dataStats: "Data & Statistics",
        importance: "Importance",
        definition: "Definition",
        description: "Description",
        completeGuide: "Complete Guide",
        details: "Details"
      },
      fasesVida: {
        title: "Life Stages",
        subtitle: "Protection guide by age group",
        relatedGuides: "Safety Guides by Age",
        tagBabies: "Babies",
        tagChildren: "Children",
        tagElderly: "Elderly"
      },
      petsMenu: {
        headerTitle: "Pet Safety",
        headerSubtitle: "Protection for your best friend",
        introText: "Our pets are curious and depend on us to stay safe. Choose a category below.",
        prenhez: {
          titulo: "Pregnancy and Litters",
          subtitulo: "Gestation and Birth",
          descricao: "Special care for the mother and puppies."
        },
        filhotes: {
          titulo: "Puppies",
          subtitulo: "0 to 12 months",
          descricao: "Safety and socialization in the first months."
        },
        adultos: {
          titulo: "Adult Pets",
          subtitulo: "Adult Life",
          descricao: "Accident prevention in adult life."
        },
        aves: {
          titulo: "Birds",
          subtitulo: "Ornamental Birds",
          descricao: "Teflon, vapors, and drafts."
        },
        wellness: {
          titulo: "Wellness Hub",
          subtitulo: "Daily Care",
          descricao: "Routine tips, hydration, and enrichment."
        },
        pequenos: {
          titulo: "Small Pets",
          subtitulo: "Rodents and others",
          descricao: "Rabbits, Hamsters, and Guinea Pigs."
        },
        peixes: {
          titulo: "Fish",
          subtitulo: "Aquariums",
          descricao: "Fish and aquatic Reptiles."
        },
        alimentos: {
          titulo: "Forbidden Foods",
          subtitulo: "Food Safety",
          descricao: "What your pet should never eat."
        },
        socorros: {
          titulo: "First Aid",
          subtitulo: "Emergency Actions",
          descricao: "What to do in cases of choking, bites, and falls."
        },
        guia_socorros_pet: {
          titulo: "First Aid Guide",
          subtitulo: "Preventive Learning",
          descricao: "Study the step-by-step to act calmly."
        },
        kit_pet_checklist: {
          titulo: "Emergency Kit",
          subtitulo: "Practical Checklist",
          descricao: "Assemble and check your pet's readiness kit."
        }
      },
      lazerMenu: {
        headerTitle: "Leisure & Vacations",
        headerSubtitle: "Fun with guaranteed safety.",
        lazer: {
          title: "Leisure & Fun",
          subtitulo: "Beach, Pool, Parks",
          desc: "Safety during leisure moments, camping, and outdoor activities."
        },
        ferias: {
          title: "Vacations & Travel",
          subtitulo: "Road, Hotel, Plane",
          desc: "Care on the road, hotel safety, and travel documents."
        },
        mobilidade: {
          title: "Mobility & E-Bikes",
          subtitulo: "E-bikes, cars and more",
          desc: "Traffic rules, categories, and safety tips for leisure and micromobility vehicles."
        }
      },
      riscosFisicos: {
        headerTitle: "Physical Risks",
        headerSubtitle: "Electricity, Falls and more."
      },
      ageGroup: {
        risksTitle: "Main Risks",
        howToPrevent: "How to Prevent:"
      },
      petWellness: {
        title: "Wellness Hub",
        subtitle: "Daily care for a long and happy life",
        introText: "Prevention is the best form of love. Small adjustments in routine can prevent big emergencies in the future."
      },
      petFood: {
        headerTitle: "Blacklist",
        heroTitle: "Forbidden Foods",
        heroDesc: "Different metabolisms turn human treats into lethal poisons for dogs and cats. Memorize this red list.",
        alertTitle: "Recent Poisoning?",
        alertDesc: "Rush to the Vet or call Poison Control: 0800-722-6001",
        listTitle: "Risk Mosaic"
      },
      petPregnancy: {
        title: "Pregnancy and Litters",
        subtitle: "Complete guide to caring for mom and pups",
        importantTitle: "Important",
        importantText: "This guide is informational. Always consult a veterinarian for proper pregnancy and birth monitoring.",
        tipTitle: "Important Tip",
        tipText: "Spaying/neutering is the most effective way to prevent unwanted pregnancies and contributes to your pet's health. Talk to your vet about the best time to perform the procedure."
      },
      avesSeguras: {
        headerTitle: "Bird Safety",
        environmentTitle: "Healthy Environment"
      },
      petPregnancyTracker: {
        title: "Pregnancy Tracker",
        subtitle: "Monitoring",
        selectPet: "Select Pet:",
        noPets: "No pets found.",
        registerPet: "Register Pet",
        startTracking: "Start Tracking",
        matingDate: "Mating Date (DD/MM/YYYY)",
        dueDate: "Due Date:",
        gestationDays: "(~{{days}} days of gestation)",
        confirmPregnancy: "Confirm Pregnancy",
        ongoingPregnancy: "Pregnancy in Progress",
        weekNumber: "Week {{week}}",
        start: "Start",
        birth: "Birth",
        mating: "Mating",
        forecast: "Forecast",
        weeklyTips: "Weekly Tips",
        tip1: "In the first weeks, feeding can remain normal. Avoid excessive stress.",
        tip2: "Appetite may increase. Ask the vet about puppy food (richer in nutrients).",
        tip3: "Prepare the 'nest' in a calm place. The belly should be quite visible by now.",
        registerBirth: "Register Birth",
        litterCount: "Number of Puppies/Kittens",
        finishPregnancy: "Finalize Pregnancy",
        breedNotInformed: "Breed not informed",
        errorTitle: "Error",
        errorMatingDate: "Enter the mating date correctly (DD/MM/YYYY).",
        errorLitterCount: "Enter the number of puppies/kittens.",
        successTitle: "Success",
        successPregnancy: "Pregnancy tracking started!",
        congratsTitle: "Congratulations!",
        congratsBirth: "Birth of {{count}} puppies/kittens registered!",
        errorSave: "Failed to save data."
      },
      riscosMenu: {
        title: "Home Prevention",
        subtitle: "Advisory guide to accidents by room.",
        preventionTopics: "prevention topics"
      },
      envScreens: {
        title: "Risks and Guidelines by Room",
        preventionGuide: "Prevention guide",
        living: "Living and Social Areas",
        rest: "Rest Area",
        services: "Services and Utilities",
        leisure: "Leisure and Outdoors",
        circulation: "Circulation and Access"
      },
      headersFirst: {
        electronicDevices: "Electronic Devices",
        homeAppliances: "Home Appliances",
        householdUtensils: "Household Utensils",
        toolsAndRepairs: "Tools & Repairs",
        safetyAndMaintenance: "Safety and Maintenance.",
        gardening: "Gardening",
        chemicals: "Chemical Products",
        travelSafety: "Travel & Leisure Safety",
        sosPet: "S.O.S Pet",
        survivalProtocols: "Survival Protocols",
        lifeThreateningCall: "Life-Threatening Call",
        poisoning: "Poisoning / Toxins",
        hemorrhage: "Hemorrhage / Traumas",
        medicineKit: "Medicine Kit",
        rescueKits: "Rescue Kits",
        whyPrepare: "Why prepare?",
        firePlan: "Fire Plan",
        critical: "CRITICAL:",
        firstAid: "First Aid",
        people: "People",
        pets: "Pets",
        arrivalInspection: "Arrival Inspection",
        comingSoon: "Coming Soon",
        safeCheckout: "Safe Checkout",
        travelKit: "Travel Kit",
        goingToTravel: "Going to Travel?",
        destinationType: "What is the destination type?",
        travelPurpose: "Travel Purpose",
        internationalDestination: "International Destination?",
        whoIsGoing: "Who is going with you?",
        itensIncluDos: "Itens inclu\xEDdos:",
        acessRios: "Acess\xF3rios",
        KitsRecomendados: "\u{1F381} Kits Recomendados",
        categorias: "Categorias",
        vigilaroAIChat: "Vigilaro AI \u2014 Chat",
        monitorDeUdio: "Monitor de \xC1udio",
        vIGILAROAI: "VIGILARO AI",
        checklistReforma: "Checklist: Reforma",
        ativarModoReforma: "Ativar Modo Reforma",
        checklistVisita: "Checklist: Visita",
        mapeamentoDeAtivos: "Mapeamento de Ativos",
        histRicoDeMelhorias: "Hist\xF3rico de Melhorias",
        mapeamentoDaCasa: "Mapeamento da Casa",
        kitsDeProntidO: "Kits de Prontid\xE3o",
        vistoriarAmbientes: "Vistoriar Ambientes",
        vigilaroVoice: "Vigilaro Voice",
        guiaDeKits: "Guia de Kits",
        novoEvento: "Novo Evento",
        novoExame: "Novo Exame",
        novoRegistro: "Novo Registro",
        semRemDios: "Sem rem\xE9dios",
        agendaVazia: "Agenda Vazia",
        saDeDoPet: "Sa\xFAde do Pet",
        nenhumPetCadastrado: "Nenhum Pet Cadastrado",
        compartilhar: "Compartilhar",
        infoRTulos: "InfoR\xF3tulos",
        atividadesEventuais: "Eventual Activities",
        guiaDeSeguranA: "Safety Guide",
        dicasDeOuro: "Golden Tips:",
        excelente: "Excellent!",
        pontosDeAtenO: "Attention Points",
        polTicaDePrivacidade: "Pol\xEDtica de Privacidade",
        raioXDaMoradia: "Raio X da Moradia",
        seuRelatRioPersonalizado: "Seu Relat\xF3rio Personalizado",
        atividadeRecente: "Atividade Recente",
        nenhumaAtividadeRecente: "Nenhuma atividade recente",
        relatRioCompleto: "Relat\xF3rio Completo",
        PontosDeAtenO: "\u26A0\uFE0F Pontos de Aten\xE7\xE3o",
        PerguntasParaFazerEscola: "\u{1F4AC} Perguntas para Fazer \xE0 Escola",
        dicaImportante: "Dica Importante",
        verRelatRioCompleto: "Ver Relat\xF3rio Completo",
        relatRioInstitucional: "Relat\xF3rio Institucional",
        RiscosCrTicosIdentificados: "\u{1F6A8} Riscos Cr\xEDticos Identificados",
        PerguntasParaAInstituiO: "\u{1F4AC} Perguntas para a Institui\xE7\xE3o",
        notaDeAuditoria: "Nota de Auditoria",
        gerarRelatRioTCnico: "Gerar Relat\xF3rio T\xE9cnico",
        anLiseDeSeguranA: "An\xE1lise de Seguran\xE7a",
        gestODeEventos: "Gest\xE3o de Eventos",
        termosDeUso: "Termos de Uso",
        ferramentasIA: "Ferramentas IA",
        histRicoAnalTico: "Hist\xF3rico Anal\xEDtico",
        fazendoAsMalas: "Fazendo as Malas",
        monitorDeVisO: "Monitor de Vis\xE3o",
        investimentoEstimado: "Investimento estimado:",
        ouvirDetalhes: "Ouvir Detalhes",
        proteOPersonalizadaParaCadaPerfil: "Prote\xE7\xE3o personalizada para cada perfil",
        estamosPreparandoOsAcessRiosParaEstePerf: "Estamos preparando os acess\xF3rios para este perfil.",
        aoInstalarAcessRiosDeSeguranASigaSempreA: "Ao instalar acess\xF3rios de seguran\xE7a, siga sempre as instru\xE7\xF5es do fabricante\n                            e verifique periodicamente se est\xE3o bem fixados.",
        olComoPossoAjudar: "Ol\xE1! Como posso ajudar?",
        tireDVidasSobreSeguranADomSticaPrevenODe: "Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o de acidentes e primeiros socorros.",
        respondendo: "Respondendo...",
        assistenteDeVoz: "Assistente de Voz",
        converseNaturalmenteComNossaIAEspecializ: "Converse naturalmente com nossa IA especializada. Tire d\xFAvidas sobre seguran\xE7a dom\xE9stica, preven\xE7\xE3o e primeiros socorros.",
        tireDVidasEmTempoReal: "Tire d\xFAvidas em tempo real",
        suporteParaEmergNcias: "Suporte para Emerg\xEAncias",
        dicasDePrevenO: "Dicas de Preven\xE7\xE3o",
        falarComAIAElevenLabs: "Falar com a IA (ElevenLabs)",
        digitarTexto: "Digitar Texto",
        comoFunciona: "Como funciona?",
        deixeEsteCelularNoQuartoDoBebOuAmbienteM: "Deixe este celular no quarto do beb\xEA ou ambiente monitorado.\n                            Se houver choro ou barulho alto, ele emitir\xE1 um alerta visual.",
        vigilaroAI: "Vigilaro AI",
        vigilaroEstPensando: "Vigilaro est\xE1 pensando...",
        vERIFICAODESEGURANA: "VERIFICA\xC7\xC3O DE SEGURAN\xC7A",
        sIM: "SIM",
        nO: "N\xC3O",
        nA: "N/A",
        eVITE: "EVITE",
        aTENO: "ATEN\xC7\xC3O",
        ReasExternas: "External Areas",
        quintalPiscinaELazer: "Quintal, Piscina e Lazer",
        prXimoAmbiente: "Pr\xF3ximo Ambiente",
        voltar: "Voltar",
        cRTICO: "CR\xCDTICO",
        salvar: "Salvar",
        marqueOQueVocPossuiEmCasaParaAtivarOsAle: "Marque o que voc\xEA possui em casa para ativar os alertas de prote\xE7\xE3o personalizados.",
        pareceQueVocAindaNOTemRegistros: "Parece que voc\xEA ainda n\xE3o tem registros.",
        realizeVistoriasEMarqueOsItensComoSeguro: "Realize vistorias e marque os itens como Seguros para construir seu hist\xF3rico.",
        marcadoComoSeguro: "Marcado como Seguro \u2713",
        indiqueOQueExisteNaSuaCasa: "Indique o que existe na sua casa",
        salvarMapeamento: "Salvar Mapeamento",
        selecioneUmaCategoria: "Selecione uma categoria",
        aCaixaDeFerramentasEstVaziaEstrutureSeus: "A caixa de ferramentas est\xE1 vazia. Estruture seus kits de emerg\xEAncia para uma resposta r\xE1pida.",
        paraProtegermosSuaFamLiaPrecisamosConhec: "Para protegermos sua fam\xEDlia, precisamos conhecer sua casa e quem mora nela.\n              Responda apenas uma vez!",
        ondeVocMora: "Onde voc\xEA mora?",
        quantosAndares: "Quantos andares?",
        ReasExternasLazer: "\xC1reas Externas & Lazer",
        estruturasRiscosInternos: "Estruturas & Riscos Internos",
        prioridadesDeSeguranA: "Prioridades de Seguran\xE7a \u{1F6A8}",
        oQueMaisTePreocupaHoje: "O que mais te preocupa hoje?",
        proteEsJInstaladas: "Prote\xE7\xF5es J\xE1 Instaladas \u2705",
        checklistsDeSeguranA: "Checklists de Seguran\xE7a",
        suaCasaAindaNOFoiMapeada: "Sua casa ainda n\xE3o foi mapeada",
        paraCriarChecklistPersonalizadosPrecisam: "Para criar checklist personalizados, precisamos saber o que existe na sua casa (Piscina? Escadas? Quintal?).",
        iniciarMapeamentoDaCasa: "Iniciar Mapeamento da Casa",
        oQueTenhoAtivos: "O Que Tenho (Ativos)",
        inventRioDeRisco: "Invent\xE1rio de Risco",
        mapeie25ItensPerigososAirFryerVidrosEsca: "Mapeie 25+ itens perigosos (Air Fryer, Vidros, Escadas...) para ativar a prote\xE7\xE3o inteligente.",
        mapear: "Mapear",
        ajustarAmbientesMapeados: "Ajustar Ambientes Mapeados",
        adicionarOutraResidNcia: "Adicionar Outra Resid\xEAncia",
        riscosPrevenOEOQueFazerEmCasoDeAcidente: "Riscos, preven\xE7\xE3o e o que fazer em caso de acidente",
        conteDoNOEncontrado: "Conte\xFAdo n\xE3o encontrado.",
        resumoOtimizadoRiscoAO: "Resumo Otimizado (Risco + A\xE7\xE3o)",
        lembreSeAPrevenOAtivaDependeDeVerificaOC: "Lembre-se: A preven\xE7\xE3o ativa depende de verifica\xE7\xE3o constante.",
        regrasDeOuro: "Regras de Ouro",
        risco: "Risco:",
        ePIs: "EPIs:",
        cuidado: "Cuidado:",
        estejaPreparadoQuandoPrecisar: "Esteja preparado quando precisar.",
        montarEsteKit: "Montar este Kit",
        cultivoSeguro: "Cultivo Seguro",
        APrTicaDaJardinagemEOCultivoDeHortasEmCa: '"A pr\xE1tica da jardinagem e o cultivo de hortas em casa s\xE3o atividades terap\xEAuticas. O equil\xEDbrio entre equipamento correto e seguran\xE7a \xE9 fundamental."',
        preparaODoSolo: "Prepara\xE7\xE3o do Solo",
        podaEManutenO: "Poda e Manuten\xE7\xE3o",
        regaELimpeza: "Rega e Limpeza",
        proteOObrigatRia: "Prote\xE7\xE3o \xE9 Obrigat\xF3ria!",
        Luvas: "\u2022 Luvas:",
        CalAdosFechados: "\u2022 Cal\xE7ados Fechados:",
        Roupas: "\u2022 Roupas:",
        ProteOSolar: "\u2022 Prote\xE7\xE3o Solar:",
        ProdutosQuMicos: "\u2623\uFE0F Produtos Qu\xEDmicos",
        embalagemOriginal: "embalagem original",
        PlantasTXicas: "\u{1F33F} Plantas T\xF3xicas",
        comigoNinguMPode: "Comigo-ningu\xE9m-pode",
        bicoDePapagaio: "Bico-de-papagaio",
        AnimaisPeOnhentos: "\u{1F577}\uFE0F Animais Pe\xE7onhentos",
        entulhosAtraemEscorpiEsEAranhasMantenhaO: "Entulhos atraem escorpi\xF5es e aranhas. Mantenha o quintal limpo e examine cal\xE7ados e luvas antes de usar.",
        PrevenirEmCasa: "\u{1F4F0} Prevenir em Casa",
        lerArtigoCompleto: "Ler artigo completo",
        compartilharEsteArtigo: "Compartilhar este artigo",
        iNTOXICAO: "INTOXICA\xC7\xC3O?",
        ligueImediatamente08007226001: "Ligue imediatamente: 0800 722 6001",
        DescriO: "\u{1F4CB} Descri\xE7\xE3o",
        PartesTXicas: "\u2623\uFE0F Partes T\xF3xicas",
        SintomasEmHumanos: "\u{1F464} Sintomas em Humanos",
        SintomasEmPetsCEsEGatos: "\u{1F43E} Sintomas em Pets (C\xE3es e Gatos)",
        PrimeirosSocorros: "\u{1FA79} Primeiros Socorros",
        OQUEFAZER: "\u2705 O QUE FAZER:",
        OQUENOFAZER: "\u274C O QUE N\xC3O FAZER:",
        ComoIdentificar: "\u{1F50D} Como Identificar",
        OndeEncontrada: "\u{1F4CD} Onde \xE9 Encontrada",
        AlternativasSeguras: "\u{1F331} Alternativas Seguras",
        considereSubstituirPorEstasPlantasNOTXic: "Considere substituir por estas plantas n\xE3o-t\xF3xicas:",
        ComoPrevenir: "\u{1F6E1}\uFE0F Como Prevenir",
        MantenhaAPlantaForaDoAlcanceDeCrianAsEPe: "\u2022 Mantenha a planta fora do alcance de crian\xE7as e pets",
        EnsineCrianAsANOTocarOuComerPlantas: "\u2022 Ensine crian\xE7as a n\xE3o tocar ou comer plantas",
        UseLuvasAoManusearAPlanta: "\u2022 Use luvas ao manusear a planta",
        ConsidereRemovLaSeHouverCrianAsPequenasO: "\u2022 Considere remov\xEA-la se houver crian\xE7as pequenas ou pets",
        MantenhaONMeroDoCentroDeIntoxicaOSalvo08: "\u2022 Mantenha o n\xFAmero do Centro de Intoxica\xE7\xE3o salvo: 0800 722 6001",
        lIGARPARACENTRODEINTOXICAO: "LIGAR PARA CENTRO DE INTOXICA\xC7\xC3O",
        riscosInvisVeisEmCasa: "Riscos invis\xEDveis em casa",
        sobre: "Sobre",
        frequNciaDeUso: "Frequ\xEAncia de uso",
        maisVulnerVeis: "Mais vulner\xE1veis",
        riscosIdentificados: "Riscos Identificados",
        comoPrevenir: "Como Prevenir",
        oQueFazerEmCasoDeAcidente: "O Que Fazer em Caso de Acidente",
        vocSabia: "Voc\xEA sabia?",
        teoriaDoFogo: "Teoria do Fogo",
        conceitosEssenciaisDePrevenO: "Conceitos essenciais de preven\xE7\xE3o.",
        FRiasEMomentosDeLazerExigemAtenORedobrad: '"F\xE9rias e momentos de lazer exigem aten\xE7\xE3o redobrada. Descubra como prevenir acidentes fora de casa."',
        cOMOPREVENIR: "COMO PREVENIR",
        pRIMEIROSSOCORROS: "PRIMEIROS SOCORROS",
        utensLiosDomSticos: "Utens\xEDlios Dom\xE9sticos",
        seguranANaCozinhaEReasDeServiO: "Seguran\xE7a na cozinha e \xE1reas de servi\xE7o.",
        requerTrava: "Requer Trava",
        RiscosPrincipais: "\u26A0\uFE0F Riscos Principais",
        PrevenO: "\u{1F6E1}\uFE0F Preven\xE7\xE3o",
        eletrodomesticos: "Eletrodomesticos",
        guiaDeSeguranAParaEquipamentosDomSticos: "Guia de seguran\xE7a para equipamentos dom\xE9sticos.",
        RedeDeApoio: "\u{1F4A1} Rede de Apoio",
        mantenhaEssaListaAtualizadaEmUmaEmergNci: "Mantenha essa lista atualizada. Em uma emerg\xEAncia, esses contatos aparecer\xE3o no topo.",
        nome: "Nome *",
        detalheRelacionamento: "Detalhe / Relacionamento",
        telefone: "Telefone *",
        tipo: "Tipo *",
        cancelar: "Cancelar",
        adicionarContato: "Adicionar Contato",
        SMS: "\u{1F4AC} SMS",
        nenhumContatoNestaLista: "Nenhum contato nesta lista",
        centralDeAOImediata: "Central de A\xE7\xE3o Imediata",
        guiasPassoAPassoRPidosParaEngasgoEnvenen: "Guias passo a passo r\xE1pidos para Engasgo, Envenenamento e Quedas.",
        cIATOXLIGUE08007226001: "CIATOX - LIGUE 0800 722 6001",
        buscarClNicas24hNaRegiO: "Buscar Cl\xEDnicas 24h na Regi\xE3o",
        protocolosDetectados: "Protocolos Detectados",
        atenOAveNaCasa: "Aten\xE7\xE3o: Ave na Casa",
        riscoRespiratRioCrTicoTeflonVapores: "Risco Respirat\xF3rio Cr\xEDtico (Teflon/Vapores)",
        carteirinhaDeVacinaO: "Carteirinha de Vacina\xE7\xE3o",
        histRicoParaApresentarAoVeterinRio: "Hist\xF3rico para apresentar ao Veterin\xE1rio.",
        fAAAGORA: "FA\xC7A AGORA:",
        sAMU192: "SAMU: 192",
        bOMBEIROS193: "BOMBEIROS 193",
        sAIR: "SAIR",
        oQUEACONTECEU: "O QUE ACONTECEU?",
        reviseOsItensAbaixoParaRestaurarASeguran: "Revise os itens abaixo para restaurar a seguran\xE7a do lar.",
        NdiceRestauradoEstimado: "\xCDndice restaurado estimado",
        concluirEVoltarAoDashboard: "Concluir e voltar ao Dashboard",
        kitParaEmergNcias: "Kit para Emerg\xEAncias",
        vitalParaSobrevivNciaEmCatStrofesNaturai: "Vital para sobreviv\xEAncia em cat\xE1strofes naturais como enchentes, deslizamentos e desmoronamentos, al\xE9m de inc\xEAndios. Deve garantir autonomia e seguran\xE7a por 72 horas.",
        checklistDoKit: "Checklist do Kit",
        verifiqueAValidadeDosAlimentosEGuaACada6: "Verifique a validade dos alimentos e \xE1gua a cada 6 meses.",
        kitPrimeirosSocorros: "Kit Primeiros Socorros",
        essencialParaOAtendimentoImediatoDeLesEs: "Essencial para o atendimento imediato de les\xF5es antes da chegada de ajuda profissional. Estar equipado permite limpar ferimentos, conter sangramentos e evitar infec\xE7\xF5es, fazendo a diferen\xE7a na recupera\xE7\xE3o.",
        conteDoRecomendado: "Conte\xFAdo Recomendado",
        mantenhaEsteKitEmLocalFrescoSecoEForaDoA: "Mantenha este kit em local fresco, seco e fora do alcance de crian\xE7as, mas de f\xE1cil acesso para adultos.",
        seuPortaRemDios: "Seu Porta Rem\xE9dios",
        umaFarmCiaDomSticaOrganizadaGaranteAcess: "Uma farm\xE1cia dom\xE9stica organizada garante acesso r\xE1pido a medicamentos. Mantenha controle rigoroso de validade e armazenamento para evitar intoxica\xE7\xF5es e garantir efic\xE1cia.",
        listaDeItensEssenciais: "Lista de Itens Essenciais",
        mantenhaRemDiosLongeDoAlcanceDeCrianAsEV: "Mantenha rem\xE9dios longe do alcance de crian\xE7as e verifique a validade regularmente.",
        terOsKitsCertosEProntosEMOTransformaOCao: "Ter os kits certos e prontos e \xE0 m\xE3o, transforma o caos em controle protegendo sua familia.",
        mantenhaSeusKitsSempreAtualizadosEVerifi: "Mantenha seus kits sempre atualizados e verifique a validade dos itens a cada 6 meses.",
        NdiceAtual: "\xCDndice atual",
        riscoTemporRioDetectadoSigaAsRecomendaEs: "Risco tempor\xE1rio detectado \u2014 siga as recomenda\xE7\xF5es",
        recomendaEsPrincipais: "Recomenda\xE7\xF5es principais",
        RecolhaFerramentasAoFinalDoDia: "\u2022 Recolha ferramentas ao final do dia.",
        EviteImprovisarConexEsElTricas: "\u2022 Evite improvisar conex\xF5es el\xE9tricas.",
        MantenhaReasDeCirculaOLivres: "\u2022 Mantenha \xE1reas de circula\xE7\xE3o livres.",
        MantenhaASupervisOConstante: "\u2022 Mantenha a supervis\xE3o constante.",
        VerifiqueTrancasEPortEsRegularmente: "\u2022 Verifique trancas e port\xF5es regularmente.",
        AtenORedobradaComPiscinaECozinha: "\u2022 Aten\xE7\xE3o redobrada com piscina e cozinha.",
        SigaOChecklistDeSeguranA: "\u2022 Siga o checklist de seguran\xE7a.",
        revisarChecklist: "Revisar checklist",
        encerrarSituaO: "Encerrar situa\xE7\xE3o",
        preparaOSalvaVidas: "Prepara\xE7\xE3o salva vidas",
        "3min": "3min",
        tempoParaEvacuar: "Tempo para evacuar",
        treinarPorAno: "Treinar por ano",
        monteSeuPlano: "Monte seu Plano:",
        prevenO3DAplicada: "Preven\xE7\xE3o 3D Aplicada",
        emCasoDeIncNdio: "Em Caso de Inc\xEAndio",
        lembreSe: "Lembre-se",
        aVidaVemPrimeiroObjetosPodemSerSubstituD: "A vida vem primeiro! Objetos podem ser substitu\xEDdos. NUNCA volte para uma casa em chamas.",
        respostaRPidaEmEmergNcias: "Resposta r\xE1pida em emerg\xEAncias",
        cOMOAGIR: "COMO AGIR",
        aTENOVETERINRIA: "ATEN\xC7\xC3O VETERIN\xC1RIA",
        oQUEFAZER: "O QUE FAZER",
        oQUENOFAZER: "O QUE N\xC3O FAZER",
        qUANDOCHAMARAJUDA: "QUANDO CHAMAR AJUDA",
        fichaMDica: "Ficha M\xE9dica",
        enviarPorWhatsApp: "Enviar por WhatsApp",
        copiarFicha: "Copiar Ficha",
        meusContatos: "Meus Contatos",
        redeDeApoioPerfil: "Rede de Apoio Perfil",
        aRedeDeApoioPrioritRiaEstVaziaCadastreCo: "A rede de apoio priorit\xE1ria est\xE1 vazia. Cadastre contatos t\xE1ticos essenciais.",
        AdicionarNovo: "+ Adicionar Novo",
        novoContato: "Novo Contato",
        caracterSticas: "Caracter\xEDsticas:",
        Dicas: "\u{1F4A1} Dicas:",
        OndeEncontrar: "\u{1F6D2} Onde encontrar:",
        ePIsDomSticos: "EPIs Dom\xE9sticos",
        proteOParaAtividadesDoDiaADia: "Prote\xE7\xE3o para atividades do dia a dia",
        categoriasDeProteO: "Categorias de Prote\xE7\xE3o",
        quandoUsar: "Quando Usar?",
        vejaQuaisEPIsSORecomendadosParaCadaAtivi: "Veja quais EPIs s\xE3o recomendados para cada atividade",
        mantenhaSeusEPIsOrganizadosEEmBomEstadoS: "Mantenha seus EPIs organizados e em bom estado. Substitua itens danificados imediatamente.",
        nenhumConteDoDisponVelNoMomento: "Nenhum conte\xFAdo dispon\xEDvel no momento.",
        tPicoDeSeguranA: "T\xF3pico de Seguran\xE7a",
        eSPECIALIDADE: "ESPECIALIDADE",
        pARAQUEM: "PARA QUEM?",
        dATAEHORRIO: "DATA E HOR\xC1RIO",
        lOCALOPCIONAL: "LOCAL (OPCIONAL)",
        oBSERVAESOPCIONAL: "OBSERVA\xC7\xD5ES (OPCIONAL)",
        aNOTAESPSCONSULTA: "ANOTA\xC7\xD5ES P\xD3S-CONSULTA",
        rECOMENDAES: "RECOMENDA\xC7\xD5ES",
        rECEITAS: "RECEITAS",
        eNCAMINHAMENTOSGUIAS: "ENCAMINHAMENTOS/GUIAS",
        pRXIMORETORNO: "PR\xD3XIMO RETORNO",
        escolhaOTipoDeEventoQueDesejaAdicionar: "Escolha o tipo de evento que deseja adicionar:",
        nOMEDOEXAME: "NOME DO EXAME",
        lOCAL: "LOCAL",
        aNOTAESPSEXAME: "ANOTA\xC7\xD5ES P\xD3S-EXAME",
        rESULTADO: "RESULTADO",
        rECEITURIO: "RECEITU\xC1RIO",
        rETORNO: "RETORNO",
        cONDUTASINSTRUES: "CONDUTAS/INSTRU\xC7\xD5ES",
        cATEGORIA: "CATEGORIA",
        dESCRIO: "DESCRI\xC7\xC3O",
        exAlergiaAPenicilinaCirurgiaDeApendicite: "Ex: Alergia a penicilina, Cirurgia de apendicite em 2020, etc.",
        sugestEsRPidas: "Sugest\xF5es R\xE1pidas:",
        dATA: "DATA",
        permitirCompartilhamento: "Permitir compartilhamento",
        esteRegistroPoderSerIncluDoNaFichaMDicaC: "Este registro poder\xE1 ser inclu\xEDdo na ficha m\xE9dica compartilh\xE1vel",
        tIPODEPROCEDIMENTO: "TIPO DE PROCEDIMENTO",
        nOMEDOPROCEDIMENTO: "NOME DO PROCEDIMENTO",
        aNOTAESPSPROCEDIMENTO: "ANOTA\xC7\xD5ES P\xD3S-PROCEDIMENTO",
        tIPODETRATAMENTO: "TIPO DE TRATAMENTO",
        nOMEDOTRATAMENTO: "NOME DO TRATAMENTO",
        fREQUNCIA: "FREQU\xCANCIA",
        dATADEINCIO: "DATA DE IN\xCDCIO",
        toqueParaConferir: "Toque para conferir",
        remDios: "Rem\xE9dios",
        veterinRios: "Veterin\xE1rios",
        dossiPet: "Dossi\xEA Pet",
        adicioneMedicaEsEVacinasDoSeuPetAqui: "Adicione medica\xE7\xF5es e vacinas do seu pet aqui.",
        tosaVacinasOuConsultasVeterinRiasAparece: "Tosa, vacinas ou consultas veterin\xE1rias aparecer\xE3o aqui.",
        cadastreUmPerfilDePetNoGerenciadorParaUs: "Cadastre um perfil de Pet no Gerenciador para usar este m\xF3dulo.",
        sobreOCompartilhamento: "Sobre o compartilhamento",
        selecioneQuaisInformaEsDesejaIncluirNaFi: "Selecione quais informa\xE7\xF5es deseja incluir na ficha m\xE9dica. Voc\xEA pode compartilhar via WhatsApp, email ou copiar o texto.",
        oQUEINCLUIR: "O QUE INCLUIR",
        medicamentosAtuais: "Medicamentos Atuais",
        tratamentosEmAndamento: "Tratamentos em Andamento",
        agendaMDica: "Agenda M\xE9dica",
        histRicoMDico: "Hist\xF3rico M\xE9dico",
        apenasRegistrosMarcadosComoCompartilhVei: "Apenas registros marcados como compartilh\xE1veis",
        pRVIA: "PR\xC9VIA",
        copiar: "Copiar",
        compartilharAgora: "Compartilhar Agora",
        histRicoDeAuditorias: "Hist\xF3rico de Auditorias",
        nenhumaAuditoriaRegistradaRealizeAPrimei: "Nenhuma auditoria registrada. Realize a primeira vistoria para criar o hist\xF3rico de seguran\xE7a desta resid\xEAncia.",
        lD50DoseLetalOral: "LD50 (dose letal oral)",
        carcinogenicidade: "Carcinogenicidade",
        genotoxicidade: "Genotoxicidade",
        toxicidadeReprodutiva: "Toxicidade Reprodutiva",
        fonteEPAComputationalToxicology: "Fonte: EPA Computational Toxicology",
        seguranAEmProdutosParaSuaFamLia: "Seguran\xE7a em produtos para sua fam\xEDlia",
        escanearCDigoDeBarras: "Escanear C\xF3digo de Barras",
        aponteACMeraParaIdentificarOProduto: "Aponte a c\xE2mera para identificar o produto",
        seuPerfilFamiliar: "Seu perfil familiar",
        alertasPersonalizadosSerOExibidosNosResu: "Alertas personalizados ser\xE3o exibidos nos resultados.",
        cONSULTASRECENTES: "CONSULTAS RECENTES",
        cIATOXEmergNciaToxicolGica: "CIATOX \u2014 Emerg\xEAncia Toxicol\xF3gica",
        "08007226001Gratuito24h": "0800 722 6001 (Gratuito, 24h)",
        metodologia3D: "Metodologia 3D",
        conceitosFundamentais: "Conceitos Fundamentais",
        gUIADEUSO: "GUIA DE USO",
        paraQueServe: "Para que serve:",
        importNcia: "Import\xE2ncia:",
        seNOTomar: "Se n\xE3o tomar:",
        verReceitaDigital: "Ver Receita Digital",
        editar: "Editar",
        remover: "Remover",
        nenhumMedicamentoComHorRioDefinidoConfig: "Nenhum medicamento com hor\xE1rio definido. Configure agendamentos para garantir ades\xE3o ao tratamento.",
        adicionarRemDio: "Adicionar Rem\xE9dio",
        fotografarCaixaRemDio: "Fotografar Caixa/Rem\xE9dio",
        SeguranAVisual: "(Seguran\xE7a Visual)",
        analisandoRemDio: "Analisando rem\xE9dio...",
        anexarReceitaOpcional: "Anexar Receita (Opcional)",
        FotoDoDocumento: "(Foto do Documento)",
        nomeDoMedicamento: "Nome do Medicamento",
        dosagem: "Dosagem",
        quemVaiTomar: "Quem vai tomar?",
        frequNciaHoras: "Frequ\xEAncia (horas)",
        dataEHoraDoInCio: "Data e Hora do In\xEDcio",
        paraQueServeIndicaO: "Para que serve? (Indica\xE7\xE3o)",
        porQueImportanteOpcional: "Por que \xE9 importante? (Opcional)",
        oQueAconteceSeNOTomarOpcional: "O que acontece se n\xE3o tomar? (Opcional)",
        estoqueInicialOpcional: "Estoque Inicial (Opcional)",
        dicaParaGotasTenteEstimarQuantasDosesOuM: "Dica: Para gotas, tente estimar quantas doses ou ml restam.",
        agendarTratamento: "Agendar Tratamento",
        caixasEBulas: "Caixas e Bulas",
        pLulasEFrascos: "P\xEDlulas e Frascos",
        entendi: "Entendi",
        vigilaroCareV600NeoBuild2026: "Vigilaro Care v6.0.0 (Neo Build 2026)",
        mobilidade: "Mobilidade",
        trNsitoESeguranA: "Tr\xE2nsito e Seguran\xE7a.",
        OQueDRV: "\u{1F697} O que \xE9 DRV?",
        oBRIGATRIOPORLEI: "OBRIGAT\xD3RIO POR LEI",
        QualDispositivoMeuFilhoPrecisa: "\u{1F4CA} Qual dispositivo meu filho precisa?",
        selecioneAIdadeParaVerODispositivoRecome: "Selecione a idade para ver o dispositivo recomendado:",
        PosiONoVeCulo: "\u{1F4CD} Posi\xE7\xE3o no Ve\xEDculo",
        ComoInstalar: "\u{1F527} Como Instalar",
        ComoUsar: "\u{1F476} Como Usar",
        ErrosComunsEVITE: "\u274C Erros Comuns (EVITE!)",
        LegislaO: "\u2696\uFE0F Legisla\xE7\xE3o",
        OQueMobilidadeAtiva: "\u{1F6B4} O que \xE9 Mobilidade Ativa?",
        benefCios: "Benef\xEDcios:",
        idadeDeAutonomia: "Idade de Autonomia",
        porQu: "Por qu\xEA?",
        EquipamentosNecessRios: "\u{1F6E1}\uFE0F Equipamentos Necess\xE1rios",
        LocaisApropriados: "\u2705 Locais Apropriados",
        LocaisAEvitar: "\u274C Locais a Evitar",
        RegrasDeSeguranA: "\u26A0\uFE0F Regras de Seguran\xE7a",
        ManutenO: "\u{1F527} Manuten\xE7\xE3o",
        autonomiaDeMobilidade: "Autonomia de Mobilidade",
        RegrasGeraisDeSeguranA: "\u{1F4CB} Regras Gerais de Seguran\xE7a",
        EntendendoASinalizaO: "\u{1F6A6} Entendendo a Sinaliza\xE7\xE3o",
        FatoresDeRisco: "\u26A0\uFE0F Fatores de Risco",
        eviteViasCom: "Evite vias com:",
        SeguranANoite: "\u{1F319} Seguran\xE7a \xE0 Noite",
        CuidadosComCrianAs: "\u{1F476} Cuidados com Crian\xE7as",
        idadeMNima: "Idade M\xEDnima",
        RegrasParaPassageiro: "\u{1F464} Regras para Passageiro",
        RegrasParaPiloto: "\u{1F3CD}\uFE0F Regras para Piloto",
        RiscosEspecFicosDasMotos: "\u26A0\uFE0F Riscos Espec\xEDficos das Motos",
        EmCasoDeAcidente: "\u{1F6A8} Em caso de acidente",
        bombeiros193: "Bombeiros: 193",
        pRF191: "PRF: 191",
        MicromobilidadeElTrica: "\u26A1 Micromobilidade El\xE9trica",
        categoriasNoCTB: "Categorias no CTB",
        ondeAndar: "Onde andar:",
        eNasCalAdas: "E nas cal\xE7adas?",
        RiscosDeAcidentes: "\u26A0\uFE0F Riscos de Acidentes",
        monitoramentoPreventivoProtocolosParaOSe: "Preventive Monitoring: Protocols for your home",
        iniciarVerificaO: "Iniciar Verifica\xE7\xE3o",
        finalizarProtocolo: "Finalizar Protocolo",
        dISTRIBUIODECONFORMIDADE: "DISTRIBUI\xC7\xC3O DE CONFORMIDADE",
        nenhumaPendNciaIdentificadaOAmbienteEstS: "Nenhuma pend\xEAncia identificada. O ambiente est\xE1 seguro.",
        fechar: "Fechar",
        toxina: "Toxina:",
        sintomas: "Sintomas:",
        "1CompromissoComSuaPrivacidade": "1. Compromisso com sua Privacidade",
        oVigilaroCareRespeitaProfundamenteSuaPri: "O Vigilaro Care respeita profundamente sua privacidade. Este documento explica como tratamos seus dados pessoais, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD - Lei n\xBA 13.709/2018).",
        "2ArmazenamentoLocalOffline": "2. Armazenamento Local (Offline)",
        seusDadosFicamComVoc: "Seus dados ficam com voc\xEA:",
        eXCLUSIVAMENTENAMEMRIADOSEUDISPOSITIVO: "EXCLUSIVAMENTE NA MEM\xD3RIA DO SEU DISPOSITIVO",
        nSNOTemosCPiaDeles: "n\xF3s n\xE3o temos c\xF3pia deles",
        "3ColetaDeDados": "3. Coleta de Dados",
        "4PermissEsDoDispositivo": "4. Permiss\xF5es do Dispositivo",
        cMera: "C\xE2mera:",
        galeria: "Galeria:",
        notificaEs: "Notifica\xE7\xF5es:",
        microfone: "Microfone:",
        "5ExclusODeDados": "5. Exclus\xE3o de Dados",
        comoOsDadosEstONoSeuAparelhoVocTemTotalC: 'Como os dados est\xE3o no seu aparelho, voc\xEA tem total controle. Para excluir tudo permanentemente, basta usar a op\xE7\xE3o "Resetar Aplicativo" no Menu ou desinstalar o app.',
        Voltar: "\u2190 Voltar",
        cDigoDeBarras: "C\xF3digo de Barras:",
        Componentes: "\u{1F9EA} Componentes",
        RiscosEPerigos: "\u26A0\uFE0F Riscos e Perigos",
        SeINGERIU: "\u{1F4A7} Se INGERIU:",
        ContatoComOLHOS: "\u{1F441}\uFE0F Contato com OLHOS:",
        ContatoComPELE: "\u270B Contato com PELE:",
        INALAO: "\u{1F4A8} INALA\xC7\xC3O:",
        ComoPrevenirAcidentes: "\u{1F6E1}\uFE0F Como Prevenir Acidentes",
        iMPORTANTE: "IMPORTANTE",
        emCasoDeAcidenteLigueIMEDIATAMENTEParaOC: "Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.\n            Tenha em m\xE3os a embalagem do produto para informar os componentes.",
        lIGARPARACIATOX: "LIGAR PARA CIATOX",
        vNCULOCOMARESIDNCIA: "RESIDENCE LINK",
        tIPOSANGUNEO: "BLOOD TYPE",
        rAAMESTIO: "BREED / MIXED",
        cONDIESHISTRICO: "CONDITIONS & HISTORY",
        redeDeApoioSOS: "Rede de Apoio (SOS)",
        quemVamosProteger: "Quem vamos proteger?",
        baseadoNaMetodologiaPrevenO3DDigaQuantas: "Baseado na Metodologia Preven\xE7\xE3o 3D, diga quantas pessoas vivem na casa. Criaremos perfis para voc\xEA detalhar a seguir.",
        hUMANOS: "HUMANOS",
        aNIMAIS: "ANIMAIS",
        definirPerfis: "Definir Perfis",
        moradoresEPets: "Moradores e Pets",
        nenhumMoradorVinculado: "Nenhum morador vinculado.",
        ambientesMapeados: "Ambientes Mapeados",
        nenhumAmbienteMapeado: "Nenhum ambiente mapeado.",
        dNADeSeguranARiscosInerentes: "DNA de Seguran\xE7a (Riscos Inerentes)",
        atualizarMapeamentoEstrutural: "Atualizar Mapeamento Estrutural",
        resumoEstratGicoPorResidNcia: "Resumo estrat\xE9gico por resid\xEAncia",
        nenhumaResidNciaEncontrada: "Nenhuma resid\xEAncia encontrada.",
        carregandoPerfilPadronizado: "Carregando perfil padronizado...",
        ImplicaOSeNOResolvido: "\u26A0 Implica\xE7\xE3o se n\xE3o resolvido",
        vouResolver: "Vou resolver",
        reconheOORisco: "Reconhe\xE7o o risco",
        gerandoSeuRelatRioPersonalizado: "Gerando Seu Relat\xF3rio Personalizado...",
        cruzandoDadosDePerfilSaDeMoradiaEVistori: "Cruzando dados de perfil, sa\xFAde, moradia e vistoria.",
        riscoS: "risco(s)",
        oMorador: "O Morador",
        oAmbiente: "O Ambiente",
        planoDeAO: "Plano de A\xE7\xE3o",
        irregularidadesAtivas: "Irregularidades Ativas",
        requeremSuaAtenO: "Requerem sua aten\xE7\xE3o",
        reconhecidosPeloResponsVel: "Reconhecidos pelo Respons\xE1vel",
        registradoComDataENome: "Registrado com data e nome",
        nOVerificados: "N\xE3o Verificados",
        completeAVistoriaParaDiagnSticoPreciso: "Complete a vistoria para diagn\xF3stico preciso",
        outrosMoradores: "Outros moradores",
        pet: "Pet",
        carregandoAtividades: "Carregando atividades...",
        comeceAUsarOVigilaroParaVerSeuHistRicoAq: "Comece a usar o Vigilaro para ver seu hist\xF3rico aqui.",
        tipoDeReforma: "Tipo de Reforma",
        ondeAObraEstAcontecendo: "Onde a obra est\xE1 acontecendo?",
        nVELDESEGURANA: "N\xCDVEL DE SEGURAN\xC7A",
        tOTAL: "TOTAL",
        cRTICOS: "CR\xCDTICOS",
        nenhumaInstituiOAtingirPontuaOMXimaEmTod: "Nenhuma institui\xE7\xE3o atingir\xE1 pontua\xE7\xE3o m\xE1xima em todos os itens. Priorize as interven\xE7\xF5es nos quesitos classificados como cr\xEDticos.\n                        e questione como a escola pretende melhorar os pontos fracos identificados.",
        compartilharRelatRio: "Compartilhar Relat\xF3rio",
        continuarAvaliaO: "Continuar Avalia\xE7\xE3o",
        escolaSegura: "Escola Segura",
        checklistDeAvaliaO: "Checklist de Avalia\xE7\xE3o",
        pROGRESSOGERAL: "PROGRESSO GERAL",
        iTENSCRTICOS: "ITENS CR\xCDTICOS",
        voltarParaCategorias: "Voltar para Categorias",
        ITEMCRTICO: "\u26A0\uFE0F ITEM CR\xCDTICO",
        sTATUSDESEGURANA: "STATUS DE SEGURAN\xC7A",
        gERAL: "GERAL",
        esteRelatRioSubsidiRioENOSubstituiAVisto: "Este relat\xF3rio \xE9 subsidi\xE1rio e n\xE3o substitui a vistoria oficial do Corpo de Bombeiros ou Vigil\xE2ncia Sanit\xE1ria. \n                        Qualquer falha em itens **CR\xCDTICOS** deve ser tratada como prioridade m\xE1xima pela administra\xE7\xE3o da ILPI.",
        revisarRespostas: "Revisar Respostas",
        asiloSeguro: "Asilo Seguro",
        vistoriaTCnicoSNior: "Vistoria T\xE9cnico-S\xEAnior",
        cRTICOSEMCONFORMIDADE: "CR\xCDTICOS EM CONFORMIDADE",
        checklistDeVerificaO: "Checklist de Verifica\xE7\xE3o",
        verificarSeguranA: "Verificar Seguran\xE7a",
        pAREIMEDIATAMENTE: "PARE IMEDIATAMENTE",
        voltarECorrigir: "Voltar e Corrigir",
        estouCienteAssumirRisco: "Estou ciente (Assumir Risco)",
        aTIVIDADELIBERADA: "ATIVIDADE LIBERADA",
        sigaAsMedidasRecomendadas: "Siga as medidas recomendadas:",
        finalizar: "Finalizar",
        recomendaEs: "Recomenda\xE7\xF5es",
        emCasoDeExposiO: "Em Caso de Exposi\xE7\xE3o",
        fonteOrientaEsDeSeguranAEProtocolosDeEme: "Fonte: Orienta\xE7\xF5es de seguran\xE7a e protocolos de emerg\xEAncia (CIATOX/Fabricante).",
        detalhesDoProduto: "Detalhes do Produto",
        pROTOCOLOSOCULTOS: "PROTOCOLOS OCULTOS",
        confidencialLeiaApenasSeEstiverSozinho: "Confidencial - Leia apenas se estiver sozinho",
        mODOPNICODISCRETO: "MODO P\xC2NICO DISCRETO",
        emSituaEsDeCoaOOndeVocNOPodeRevelarQueEs: "Em situa\xE7\xF5es de coa\xE7\xE3o onde voc\xEA n\xE3o pode revelar que est\xE1 pedindo ajuda:",
        sOS: "SOS",
        "3Segundos": "3 segundos",
        estaTelaNOAparecerNovamenteParaSuaSegura: "Esta tela n\xE3o aparecer\xE1 novamente para sua seguran\xE7a.",
        mEMORIZAREDESTRUIRMENSAGEM: "MEMORIZAR E DESTRUIR MENSAGEM",
        rISCOS: "RISCOS",
        pREVENO: "PREVEN\xC7\xC3O",
        eMERGNCIA: "EMERG\xCANCIA",
        dICASEXTRAS: "DICAS EXTRAS",
        viagemSegura: "Viagem Segura",
        carroHotelAviOEDocumentos: "Carro, hotel, avi\xE3o e documentos.",
        lazerDiversO: "Lazer & Divers\xE3o",
        aproveiteOsMomentosDeLazerComSeguranA: "Aproveite os momentos de lazer com seguran\xE7a.",
        monitoreRiscosTemporRios: "Monitore riscos tempor\xE1rios",
        selecioneOEvento: "Selecione o Evento",
        ajustaremosAsRecomendaEsDeSeguranAComBas: "Ajustaremos as recomenda\xE7\xF5es de seguran\xE7a com base no cen\xE1rio escolhido.",
        vigilaroCare: "Vigilaro Care",
        "1NaturezaInformativa": "1. Natureza Informativa",
        oAplicativoVigilaroCareUmaFerramentaDeAu: "O aplicativo Vigilaro Care \xE9 uma ferramenta de aux\xEDlio e preven\xE7\xE3o. Todo o conte\xFAdo, incluindo checklists, guias de primeiros socorros e an\xE1lises de IA, tem car\xE1ter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.",
        "2NOSubstituiProfissionais": "2. N\xE3o Substitui Profissionais",
        asInformaEsAquiContidasNOSubstituemEmHip: "As informa\xE7\xF5es aqui contidas N\xC3O substituem, em hip\xF3tese alguma, o diagn\xF3stico, aconselhamento ou tratamento por profissionais de sa\xFAde (m\xE9dicos, enfermeiros, socorristas) ou especialistas em seguran\xE7a.",
        "3EmCasoDeEmergNcia": "3. Em Caso de Emerg\xEAncia",
        "4LimitaODeResponsabilidade": "4. Limita\xE7\xE3o de Responsabilidade",
        osDesenvolvedoresDoVigilaroCareNOSeRespo: "Os desenvolvedores do Vigilaro Care n\xE3o se responsabilizam por quaisquer danos, les\xF5es ou perdas resultantes do uso das informa\xE7\xF5es fornecidas pelo aplicativo. A seguran\xE7a final do ambiente e das pessoas \xE9 de responsabilidade do usu\xE1rio.",
        "5InteligNciaArtificial": "5. Intelig\xEAncia Artificial",
        oRecursoDeScannerIAUtilizaInteligNciaArt: 'O recurso de "Scanner IA" utiliza intelig\xEAncia artificial para identificar poss\xEDveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu pr\xF3prio julgamento.',
        "6Privacidade": "6. Privacidade",
        caniveteSuODeSeguranA: "Canivete su\xED\xE7o de seguran\xE7a",
        resultadosSalvos: "Resultados salvos",
        eMBREVE: "EM BREVE",
        boaViagemSeguranAEmPrimeiroLugar: "Boa viagem! Seguran\xE7a em primeiro lugar. \u{1F9F3}",
        seguranANoSeuDestino: "Seguran\xE7a no seu destino",
        aquiVocTerUmChecklistCompletoParaInspeci: "Aqui voc\xEA ter\xE1 um checklist completo para inspecionar a seguran\xE7a do local assim que chegar \u2014 janelas, tomadas, piscinas, escadas, sa\xEDdas de emerg\xEAncia e muito mais.",
        inspeODeRetornoFimDaViagem: "Inspe\xE7\xE3o de Retorno (Fim da Viagem)",
        aHoraDeIrEmboraQuandoOCansaOBateEOsPiore: "A hora de ir embora \xE9 quando o cansa\xE7o bate e os piores esquecimentos acontecem. Fa\xE7a esta varredura pente-fino antes de entregar a chave.",
        checklistEssencial: "Checklist essencial",
        monteSeuKitEssencialDeViagemComFocoEmSaD: "Monte seu kit essencial de viagem com foco em sa\xFAde, higiene e primeiros socorros. Toque em cada categoria para expandir.",
        adapteEsteKitAoSeuDestinoENecessidadesCo: "Adapte este kit ao seu destino e necessidades. Consulte seu m\xE9dico antes de viajar.",
        ativeOModoViagemParaChecklistsDeSeguranA: "Ative o Modo Viagem para checklists de seguran\xE7a espec\xEDficos.",
        Lazer: "\u{1F334} Lazer",
        Trabalho: "\u{1F4BC} Trabalho",
        Sim: "\u{1F30D} Sim",
        Nacional: "\u{1F1E7}\u{1F1F7} Nacional",
        crianAs: "Crian\xE7as",
        idosos: "Idosos",
        pCDs: "PCDs",
        ativarModoViagem: "Ativar Modo Viagem",
        modoViagem: "Modo Viagem",
        assistenteDeViagem: "Assistente de Viagem",
        faAIssoSempreQueForViajar: "Fa\xE7a isso sempre que for viajar",
        inspeODePartida: "Inspe\xE7\xE3o de Partida",
        inspeODeChegada: "Inspe\xE7\xE3o de Chegada",
        checkoutSeguro: "Checkout Seguro",
        dicasTelefonesTeisEMais: "Dicas, telefones \xFAteis e mais.",
        fiqueAtento: "Fique Atento!",
        encerrarModoViagem: "Encerrar Modo Viagem",
        toqueParaAtivarHUD: "Toque para ativar HUD",
        sCANNINGAREA: "SCANNING AREA...",
        lUZ: "LUZ",
        sIRENE: "SIRENE",
        oCULTAR: "OCULTAR",
        painelSentinelaIA: "Painel Sentinela (IA)",
        controleRemotoDeLanternaParaIluminarReas: "Controle remoto de Lanterna para iluminar \xE1reas escuras.",
        sireneDePNicoComEfeitoEstroboscPicoParaE: "Sirene de P\xE2nico com efeito estrobosc\xF3pico para emerg\xEAncias.",
        modoFurtivoTelaApagadaParaMonitoramentoD: "Modo Furtivo (Tela Apagada) para monitoramento discreto.",
        iNICIARVIGILNCIA: "INICIAR VIGIL\xC2NCIA",
        fatoresDeRisco: "Fatores de Risco",
        selecioneQuemEstarPresenteNestaVisita: "Selecione quem estar\xE1 presente nesta visita:",
        gerarChecklist: "Gerar Checklist",
        tipoDeVisita: "Tipo de Visita",
        vocEstRecebendoAlguMOuIndoVisitar: "Voc\xEA est\xE1 recebendo algu\xE9m ou indo visitar?",
        recebendoVisita: "Recebendo Visita",
        prepararMinhaCasaParaConvidados: "Preparar minha casa para convidados",
        indoVisitar: "Indo Visitar",
        cuidadosAoIrNaCasaDeOutros: "Cuidados ao ir na casa de outros"
      },
      microBlog: {
        title: "Micro Blog",
        subtitle: "Prevent at Home",
        all: "All",
        minRead: "min read"
      },
      ferramentasIA: {
        sectionAnaliseVisual: "Visual Analysis",
        sectionAssistentes: "Assistants",
        sectionEmBreve: "Coming soon",
        scannerAmbienteTitle: "Environment Scanner",
        scannerAmbienteSubtitle: "AI Visual Analysis",
        scannerAmbienteDesc: "Point the camera to analyze fall risks, hazardous objects, and room conditions.",
        voiceTitle: "Vigilaro Voice",
        voiceSubtitle: "Audio Assistant",
        voiceDesc: "Talk to the AI safety assistant by voice to get immediate answers.",
        chatTitle: "Vigilaro Chat",
        chatSubtitle: "Questions & Guidance",
        chatDesc: "Quick text assistant for safety tips and protocols.",
        detectorTitle: "Environment Detector",
        detectorDesc: "Analyzes sounds (e.g., crying, breaking glass) and the room's light safety level.",
        heatmapTitle: "AI Heat Map",
        heatmapDesc: "3D topographic mapping of blind spots and risk areas in your home."
      }
    };
  }
});

// locales/es/common.json
var common_default4;
var init_common4 = __esm({
  "locales/es/common.json"() {
    common_default4 = {
      navigation: {
        home: "Inicio",
        education: "Aprender",
        travel: "Viaje",
        menu: "Men\xFA",
        sosLabel: "Bot\xF3n SOS de emergencia",
        sosHint: "Toque para abrir emergencia. Mantenga presionado para r\xE1pida."
      },
      home: {
        mainHouse: "Casa Principal",
        myProfile: "Mi Perfil",
        overdueMeds: "{{count}} Medicamentos Atrasados",
        activeMonitor: "MONITOR ACTIVO",
        quickAccess: "ACCESO R\xC1PIDO",
        myHealth: "Mi Salud",
        petHealth: "Salud de Mascota",
        inspections: "Inspecciones",
        infoLabels: "Info Etiquetas",
        infoLabelsSub: "Identifica toxicidad",
        tools: "Herramientas",
        intelligenceCenter: "Central de Inteligencia",
        intelligenceSub: "Asistente IA, Esc\xE1ner y Voz",
        vigilaroRadar: "Vigilaro Radar",
        radarSub: "Monitoreo continuo de tu hogar",
        eventualActivities: "Actividades Eventuales",
        eventualSub: "Modo Preventivo para eventos especiales",
        myLocations: "Mis Residencias",
        addNewLocation: "Agregar nueva residencia",
        inspectedEnvironments: "Ambientes Inspeccionados",
        homeSafe: "Tu casa est\xE1\nsegura",
        homeNeedsAttention: "Tu casa necesita\natenci\xF3n",
        actImmediately: "Act\xFAa\ninmediatamente",
        noInspectedEnvironment: "Ning\xFAn ambiente inspeccionado.",
        criticalRisk: "\u26A0\uFE0F Riesgo Cr\xEDtico:",
        attentionPoint: "\u26A0\uFE0F Punto de Atenci\xF3n:",
        verifyItem: "Verifica: {{item}}",
        offlineAlert: "Sin conexi\xF3n. Solo contenidos locales y SOS disponibles.",
        batteryAlert: "Bater\xEDa cr\xEDtica. Carga tu dispositivo.",
        labelSafe: "Seguro: {{pct}}%",
        labelAttention: "Atenci\xF3n: {{pct}}%",
        labelCritical: "Cr\xEDtico: {{pct}}%",
        residence: {
          alertMissingNameTitle: "Atenci\xF3n",
          alertMissingNameBody: "Dale un nombre a la nueva vivienda.",
          createdTitle: "Vivienda creada",
          createdBody: "Puedes configurar los ambientes y el contexto de esta casa ahora, sin perder el flujo.",
          later: "Despu\xE9s",
          configureNow: "Configurar ahora",
          myResidences: "Mis residencias",
          modalIntro: "Cambia la vivienda activa o registra una nueva casa sin salir de este contexto.",
          closeQuickForm: "Cerrar registro r\xE1pido",
          addNewResidence: "Registrar nueva vivienda",
          newResidence: "Nueva vivienda",
          newResidencePlaceholder: "Ej.: Casa de playa",
          composerHint: "Despu\xE9s de guardar, puedes seguir directo para configurar ambientes y contexto.",
          cancel: "Cancelar",
          saveResidence: "Guardar vivienda"
        },
        mappingSteps: {
          perfil: "Tu perfil",
          moradores: "Residentes",
          tipo_moradia: "Tipo de vivienda",
          ambientes: "Ambientes",
          equipamentos: "Equipos de seguridad",
          kits: "Kits de emergencia"
        },
        briefing: {
          peopleAndPets: "{{people}} persona(s) y {{pets}} mascota(s)",
          peopleOnly: "{{people}} persona(s)",
          noResidents: "Residentes a\xFAn no definidos",
          statusActive: "Base viva activa",
          statusInProgress: "Briefing en construcci\xF3n",
          statusInitial: "Briefing inicial",
          bodyComplete: "El contexto de la casa ya orienta prioridades, tareas y recomendaciones del d\xEDa a d\xEDa.",
          bodyInProgress: "Contin\xFAa por etapas. La app ya usa lo informado para entregar orientaciones proporcionales.",
          bodyInitial: "Comienza por el contexto de la casa para que Home oriente protecci\xF3n, monitoreo y tareas con relevancia real.",
          progressLabel: "briefing",
          titleComplete: "Contexto del hogar en seguimiento",
          titleTimeline: "L\xEDnea de tiempo del mapeo",
          updateBriefing: "Actualizar briefing",
          continueStep: "Continuar: {{step}}",
          startMapping: "Mapear mi casa",
          timelineHome: "Vivienda activa",
          timelinePeople: "Qui\xE9n vive o circula aqu\xED",
          timelineRooms: "Ambientes mapeados",
          mappedRoomsCount: "{{count}} ambiente(s) en el briefing",
          roomsPending: "Cocina, ba\xF1o, accesos y rutinas a\xFAn pendientes",
          timelinePlan: "Plan de cuidado",
          pendingActionsCount: "{{count}} acci\xF3n(es) para priorizar",
          planReady: "Listo para seguimiento diario",
          planPending: "Se generar\xE1 con el contexto m\xEDnimo"
        },
        daily: {
          healthEyebrow: "Cuidado de hoy",
          healthTitle: "Confirma los cuidados de salud pendientes",
          healthBody: "{{count}} cuidado(s) esperan confirmaci\xF3n.",
          firstStepEyebrow: "Primer paso",
          firstStepTitle: "Empieza por el briefing de la casa",
          firstStepBody: "Ambientes, residentes, mascotas y rutinas.",
          homePriorityEyebrow: "Prioridad del hogar",
          homePriorityTitle: "Cuida primero las pendientes abiertas",
          homePriorityBody: "{{count}} punto(s) para priorizar en el plan.",
          petEyebrow: "Rutina sensible",
          petTitle: "Revisa productos y rutas de las mascotas",
          petBody: "Productos, plantas y accesos.",
          preventiveEyebrow: "Mantenimiento preventivo",
          preventiveTitle: "Mant\xE9n vivo el plan",
          preventiveBody: "Registrar cambio o revisar el plan."
        },
        personalization: {
          defaultWho: "quienes amas",
          toneDefault: "objetiva y continua",
          scannerDefault: "IA inmediata para tu casa",
          toneAccessible: "m\xE1s accesible, clara y directa",
          scannerAccessible: "IA con lectura m\xE1s accesible",
          toneChildren: "m\xE1s conservadora e inmediata",
          scannerChildren: "IA m\xE1s conservadora para ni\xF1os",
          toneElderly: "m\xE1s estable y cuidadosa",
          scannerElderly: "IA atenta a ca\xEDdas y rutina",
          tonePets: "m\xE1s sensible a productos, rutas y objetos",
          scannerPets: "IA con contexto real para mascotas",
          priorityHealth: "{{count}} cuidado(s) de salud hoy",
          priorityHome: "{{count}} ajuste(s) en la casa",
          priorityMapping: "{{count}} punto(s) en observaci\xF3n",
          priorityDefault: "monitoreo preventivo activo",
          supportVerbPlural: "cuentan",
          supportVerbSingular: "cuenta",
          titleWithName: "Para {{name}} y quienes amas",
          titleDefault: "Para ti y quienes amas",
          body: "{{who}} {{verb}} con una prevenci\xF3n {{tone}} en {{house}}. La IA ya est\xE1 priorizando {{priority}}."
        },
        greeting: {
          morning: "Buenos d\xEDas",
          afternoon: "Buenas tardes",
          evening: "Buenas noches"
        },
        signals: {
          who: "Qui\xE9n",
          where: "D\xF3nde",
          what: "Qu\xE9",
          how: "C\xF3mo",
          aiPrevention: "IA + Prevenci\xF3n 3D",
          localPrevention: "Modo local + Prevenci\xF3n 3D",
          status: "Estado",
          briefing: "Briefing",
          pending: "Pendientes",
          open: "Abierto",
          healthOpenShort: "{{count}} salud",
          houseOpenShort: "{{count}} casa",
          pendingOpen: "{{count}} abierta(s)",
          upToDate: "Al d\xEDa",
          protected: "Protegidos"
        },
        hero: {
          localBadge: "Modo local",
          localTitle: "{{house}} sigue protegida",
          localDescription: "Funciones esenciales activas.",
          viewPriorities: "Ver prioridades",
          reviewProfiles: "Revisar perfiles",
          batteryBadge: "Bater\xEDa cr\xEDtica",
          batteryTitle: "Conviene recargar el dispositivo principal",
          batteryDescription: "Recarga para mantener el monitoreo.",
          preventiveMode: "Modo preventivo",
          briefingBadge: "Briefing vivo",
          briefingTitle: "{{house}} a\xFAn necesita el primer mapa",
          briefingDescription: "Mapea el contexto inicial.",
          whoToProtect: "A qui\xE9n proteger",
          mappingInProgressBadge: "Mapeo en curso",
          mappingInProgressTitle: "El briefing ya est\xE1 formando el plan de la casa",
          mappingInProgressDescription: "Contin\xFAa la pr\xF3xima etapa.",
          viewPlan: "Ver plan",
          stableBadge: "Operaci\xF3n estable",
          stableTitle: "{{house}} tiene protecci\xF3n fuerte",
          stableDescription: "Mantener rutina y cerrar detalles.",
          openReports: "Abrir informes",
          manageProfiles: "Gestionar perfiles",
          recommendedBadge: "Ajustes recomendados",
          recommendedTitle: "La protecci\xF3n funciona, pero a\xFAn puede mejorar",
          recommendedDescription: "{{count}} punto(s) en el plan.",
          viewPending: "Ver pendientes",
          priorityBadge: "Acci\xF3n prioritaria",
          priorityTitle: "Las pendientes m\xE1s cr\xEDticas ya est\xE1n mapeadas",
          priorityDescription: "Empieza por los puntos cr\xEDticos.",
          actNow: "Actuar ahora",
          scoreLabel: "score"
        },
        quick: {
          briefing: "Briefing vivo",
          updateContext: "Actualizar contexto",
          carePlan: "Plan de cuidado",
          openPriorities: "{{count}} prioridad(es)",
          houseMonitoring: "Monitoreo activo",
          eventualTask: "Tarea eventual",
          eventualTaskValue: "Nuevo cuidado o recordatorio",
          contextScanner: "Esc\xE1ner con contexto",
          contextScannerValue: "Leer etiqueta o producto"
        },
        tasks: {
          myHealthTitle: "Mi Salud",
          myHealthDueBody: "{{count}} cuidado(s) hoy.",
          myHealthBody: "Medicamentos, historial y rutina.",
          healthBadge: "Salud",
          petHealthTitle: "Salud de Mascota",
          petHealthBody: "Cuidados, vacunas y rutina de mascotas.",
          petHealthEmptyBody: "Registrar y acompa\xF1ar mascotas.",
          petBadge: "Mascota",
          mappingTitle: "Briefing vivo",
          mappingBody: "Contexto de la casa y ambientes.",
          planTitle: "Plan de acci\xF3n",
          planBody: "{{count}} prioridad(es) en el plan.",
          planReadyBody: "Informes y mejoras de la casa.",
          planBadge: "Plan",
          healthTitle: "Confirmar cuidado de salud",
          healthBody: "{{count}} recordatorio(s) esperan acci\xF3n hoy.",
          todayBadge: "Hoy",
          eventualTitle: "Crear tarea eventual",
          eventualBody: "Registrar cuidado puntual de salud.",
          eventualBadge: "Puntual"
        },
        sections: {
          quickEyebrow: "Acceso r\xE1pido",
          quickTitle: "Cuidado, IA y tareas",
          quickDescription: "Acciones principales de Home sin quitar foco al plan diario.",
          briefingEyebrow: "Briefing vivo",
          briefingTitle: "L\xEDnea de tiempo del hogar",
          briefingDescription: "El mapeo ahora aparece como base viva del cuidado, no como formulario suelto.",
          dailyEyebrow: "Orientaci\xF3n diaria",
          dailyTitle: "Qu\xE9 hacer ahora",
          tasksEyebrow: "Plan y tareas",
          tasksTitle: "Cuidados esenciales",
          tasksDescription: "Pendientes, tareas puntuales y cuidados eventuales permanecen visibles sin competir con el briefing.",
          monitorEyebrow: "Monitor de la casa",
          monitorTitle: "Monitor activo",
          aiEyebrow: "Herramientas inteligentes",
          aiTitle: "IA y consultas r\xE1pidas",
          aiDescription: "La IA sigue accesible para dudas, lecturas y decisiones puntuales."
        },
        monitor: {
          summaryTitle: "Resumen de la casa",
          healthOpen: "{{count}} cuidado(s)\nhoy",
          collapse: "Contraer",
          expand: "Expandir"
        },
        ai: {
          askEyebrow: "Preguntar",
          askTitle: "Vigilaro IA",
          askBody: "Chat con contexto de la casa.",
          toolsEyebrow: "Herramientas",
          toolsTitle: "Centro de IA",
          toolsBody: "Esc\xE1ner, voz e historial."
        }
      },
      onboarding: {
        title1: "Blindaje 360\xBA",
        subtitle1: "Tu hogar protegido contra los accidentes m\xE1s comunes.",
        title2: "Prevenci\xF3n Inteligente",
        subtitle2: "Vigilaro analiza tus habitaciones y avisa antes de que ocurra el peligro.",
        title3: "Paz Mental",
        subtitle3: "Para toda la familia y mascotas. Seguridad preventiva en tu bolsillo.",
        title4: "Tu Mano, Tu Regla",
        subtitle4: "Optimiza la interfaz para tu mano dominante. Zurdos pueden activar el Modo Zurdo para botones m\xE1s accesibles.",
        rightHanded: "Diestro",
        leftHanded: "Zurdo",
        skip: "Omitir",
        startNow: "Empezar Ahora",
        next: "Siguiente"
      },
      health: {
        title: "Mi Salud",
        tabMeds: "Mis Medicamentos",
        tabAgenda: "Agenda M\xE9dica",
        tabDossier: "Historial",
        noMeds: "Sin medicamentos",
        noMedsDesc: "Agregue medicamentos para rastrear horarios y dosis",
        addMed: "Agregar Medicamento",
        noEvents: "Ning\xFAn evento",
        noEventsDesc: "A\xF1adir citas, procedimientos o tratamientos",
        overdueMedsInfo: "{{count}} medicamento(s) pendiente(s)",
        tapToView: "Toca para ver",
        deleteMedTitle: "Eliminar Medicamento",
        deleteMedDesc: "\xBFQuitar este medicamento de su lista?",
        deleteEventTitle: "Eliminar Evento",
        deleteEventDesc: "\xBFRealmente desea eliminar este evento de su cronograma?",
        cancel: "Cancelar",
        delete: "Eliminar",
        doseNotSpecified: "Dosis no especificada",
        everyXHours: "Cada {{hours}} horas",
        next: "Pr\xF3xima:",
        overdue: "ATRASADO:",
        stock: "Stock: {{quantity}} {{unit}}",
        noTimeDefined: "Horario no definido",
        nextTodayAt: "Pr\xF3xima: Hoy a las {{time}}",
        baseTime: "Base: {{time}}",
        onDemand: "Uso a demanda.",
        nextSession: "Pr\xF3xima sesi\xF3n",
        date: "Fecha",
        markDone: "Marcar Hecho",
        daysOverdue: "Atrasado",
        daysLeft: "{{count}} d\xEDa(s)"
      },
      checklists: {
        roomNotFound: "Habitaci\xF3n no encontrada",
        loading: "Cargando...",
        room: "Habitaci\xF3n",
        category: "Categor\xEDa:",
        notApplicable: "No\nAplica",
        verified: "verificados",
        areaCompleted: "\xA1\xC1rea completada!",
        areaCleanInfo: "\xC1rea limpia. Aseg\xFArese de que todos los elementos esenciales hayan sido evaluados.",
        maxPriority: "M\xC1XIMA PRIORIDAD",
        advanceTo: "Avanzar a",
        finishInspection: "Concluir Inspecci\xF3n",
        naAlertTitle: "Habitaci\xF3n No Aplicable",
        naAlertDesc: "Esto marcar\xE1 todos los elementos de esta lista como 'No Aplica' (NA). \xBFEst\xE1s seguro?",
        confirmNA: "Confirmar N/A"
      },
      ai_assistant: {
        listening: "Escuchando...",
        tapToSend: "Toca para enviar",
        processing: "Procesando...",
        transcribing: "Transcribiendo...",
        stop: "Detener",
        limitReached: "L\xEDmite Alcanzado",
        bePremium: "\u{1F48E} S\xE9 Premium",
        later: "Despu\xE9s",
        notUnderstood: "No entend\xED. Intenta nuevamente.",
        networkError: "Lo siento, tuve un problema. Intenta nuevamente.",
        micPermission: "Se requiere permiso de micr\xF3fono",
        micError: "Error al acceder al micr\xF3fono"
      },
      scanner: {
        introTitle: "Esc\xE1ner Inteligente",
        introSub: "Usa Inteligencia Artificial para identificar riesgos en tu hogar y productos.",
        modeEnv: "Escanear Entorno",
        modeEnvDesc: "Revisa habitaciones enteras en busca de riesgos de ca\xEDdas, objetos peligrosos y barreras.",
        modeLabel: "Analizar Etiqueta con IA",
        modeLabelDesc: "Toma una foto de la letra peque\xF1a, ingredientes e instrucciones para el an\xE1lisis de toxicidad con IA.",
        modeBarcode: "C\xF3digo de Barras",
        modeBarcodeDesc: "B\xFAsqueda r\xE1pida en bases mundiales (Open Food Facts, UPCitemdb) con an\xE1lisis toxicol\xF3gico autom\xE1tico.",
        hint: "Apunta la c\xE1mara y mant\xE9n firme. El an\xE1lisis toma unos segundos.",
        permReq: "Se requiere permiso de c\xE1mara",
        grant: "Conceder",
        guideLabel: "Apunta a la etiqueta y toma la foto",
        guideBarcode: "Encuadra el c\xF3digo de barras",
        guideEnv: "Apunta a la habitaci\xF3n",
        analyzing: "Analizando con IA...",
        newScan: "Nuevo Escaneo",
        resultAlerts: "\u26A0\uFE0F ALERTAS PARA TU FAMILIA",
        resultIngredients: "\u{1F9FE} INGREDIENTES",
        resultRisks: "\u26A1 RIESGOS PRINCIPALES",
        resultGhs: "\u{1F9EA} CLASIFICACI\xD3N GHS",
        resultFirstAid: "\u{1FA79} PRIMEROS AUXILIOS",
        resultPrevention: "\u{1F6E1}\uFE0F PREVENCI\xD3N",
        resultPrecaution: "\u{1F4CB} PRECAUCIONES (GHS)",
        resultEpa: "\u{1F4CA} DATOS EPA (TOXICOLOG\xCDA AVANZADA)",
        callCiatox: "LLAMAR CENTRO TOXICOL\xD3GICO",
        ciatoxNumber: "0800-722-6001 (Gratuito, 24h)",
        analyzeWithAi: "Analizar etiqueta con IA",
        analyzeWithAiSub: "Toma una foto para un an\xE1lisis complementario",
        newSearch: "Nueva B\xFAsqueda",
        loadingTox: "Buscando datos toxicol\xF3gicos...",
        loadingEpa: "Buscando datos toxicol\xF3gicos (PubChem / EPA)..."
      },
      settings: {
        accessibility: "Accesibilidad",
        adaptForYou: "Adapta para Ti",
        adaptForYouDesc: "Vigilaro Care es para todos. Ajusta la configuraci\xF3n a continuaci\xF3n para mejorar tu experiencia seg\xFAn tus necesidades.",
        visual: "Visual",
        largeText: "Texto Grande (140%)",
        largeTextDesc: "Aumenta el tama\xF1o de la fuente en toda la aplicaci\xF3n para facilitar la lectura.",
        highContrast: "Alto Contraste",
        highContrastDesc: "Cambia a un tema negro y amarillo para m\xE1xima visibilidad.",
        audioFeedback: "Audio y Feedback",
        reduceMotion: "Reducir Movimiento",
        reduceMotionDesc: "Disminuye las animaciones y transiciones de pantalla.",
        screenReader: "Lector de Pantalla",
        screenReaderDesc: "Optimizado para TalkBack (Android) y VoiceOver (iOS).",
        native: "NATIVO",
        interaction: "Interacci\xF3n",
        leftHanded: "Modo Zurdo",
        leftHandedDesc: "Refleja botones flotantes, men\xFAs y controles al lado izquierdo de la pantalla.",
        language: "Idioma / Language"
      },
      menu: {
        resetWarningTitle: "\u26A0\uFE0F Restablecer Aplicaci\xF3n",
        resetWarningDesc: "Esto borrar\xE1 TODOS tus perfiles, mapeos y datos. La aplicaci\xF3n volver\xE1 a su estado inicial. \xBFEst\xE1s seguro?",
        resetConfirm: "S\xED, Restablecer Todo",
        resetSuccess: "\xA1Aplicaci\xF3n restablecida! Empezando de cero... \u{1F680}",
        resetError: "No se pudieron restablecer los datos.",
        accountAndApp: "Mi Cuenta y Aplicaci\xF3n",
        accessibility: "Accesibilidad",
        accessibilityDesc: "Tama\xF1o de texto y contraste",
        premium: "Vigilaro Premium",
        premiumDesc: "Gestionar Suscripci\xF3n",
        about: "Sobre la App",
        aboutDesc: "Versi\xF3n, T\xE9rminos y Privacidad",
        resetApp: "Restablecer App",
        resetAppDesc: "Borrar todo y reiniciar",
        support: "Soporte",
        supportDesc: "Cont\xE1ctanos",
        terms: "T\xE9rminos de Uso",
        termsDesc: "Lee nuestros t\xE9rminos",
        privacy: "Privacidad",
        privacyDesc: "Pol\xEDtica de datos",
        menuSettings: "Men\xFA y Ajustes",
        generalSettings: "Ajustes generales"
      },
      sos: {
        title: "EMERGENCIAS",
        generalTitle: "Emergencia General",
        generalSub: "Polic\xEDa / Bomberos / Ambulancia",
        generalPhone: "112",
        toxTitle: "Toxicolog\xEDa",
        toxSub: "91 562 04 20",
        toxPhone: "915620420",
        firstAid: "PRIMEROS AUXILIOS",
        firstAidSub: "Toca para gu\xEDa paso a paso",
        vetTitle: "Veterinario",
        vetSub: "Buscar Cercano",
        sendSos: "Enviar SOS",
        holdButton: "Mant\xE9n presionado",
        medCard: "Ficha M\xE9d.",
        medCardSub: "Salud/Meds",
        contacts: "Contactos",
        saved: "Guardados",
        exitSOS: "SALIR DEL MODO EMERGENCIA",
        noInternet: "SIN INTERNET.\nIntenta el 112 directo. Contactos personales pueden fallar.",
        samuTitle: "Ambulancia",
        samuSub: "Emergencia M\xE9dica",
        samuPhone: "112",
        fireTitle: "Bomberos",
        fireSub: "Incendios y Rescates",
        firePhone: "112",
        policeTitle: "Polic\xEDa",
        policeSub: "Fuerzas del Orden",
        policePhone: "112"
      },
      travel: {
        departureInspection: "Inspecci\xF3n de Salida",
        departureSubtitle: "Qu\xE9 hacer antes de salir de casa",
        departureIntro: "Evita imprevistos y regresos innecesarios. Repasa esta lista r\xE1pida antes de cerrar la puerta de casa.",
        homeSecurity: "Seguridad del Hogar",
        gasOff: "Llave de gas cerrada",
        waterOff: "Llave de agua cerrada (evita fugas)",
        electronicsOff: "Aparatos desenchufados (TV, Microondas)",
        windowsLocked: "Todas las ventanas y tragaluces cerrados",
        trashOut: "Basura sacada (evita mal olor e insectos)",
        perishables: "Refrigerador limpio de perecederos r\xE1pidos",
        logistics: "Log\xEDstica B\xE1sica",
        keysWithNeighbor: "Llaves con vecino/familiar de confianza?",
        petFoodWater: "Comida/agua extra si mascota se queda?",
        plantsWatered: "Plantas regadas o plan de riego listo?",
        carryOn: "Equipaje de Mano",
        docsWithPhoto: "Documentos con foto (DNI/Pasaporte)",
        ticketsSavedOffline: "Billetes/Reservas guardados offline",
        vitalMedsInBag: "Medicamentos vitales en bolsa (no facturar)",
        chargerPowerbank: "Cargador de m\xF3vil y power bank",
        cardsMoneyKeys: "Tarjetas, dinero y llaves",
        completedOf: "de",
        completed: "completados"
      },
      medications: {
        title: "Hora del Medicamento",
        morning: "Ma\xF1ana",
        afternoon: "Tarde",
        night: "Noche",
        errorNameTime: "Nombre y Horario son obligatorios.",
        errorSelectProfile: "Seleccione un perfil.",
        lowStockTitle: "Stock Bajo",
        deleteTitle: "Eliminar",
        deleteMsg: "Eliminar este medicamento?",
        no: "No",
        yes: "S\xED",
        noRoutine: "Sin rutina activa",
        noRoutineMsg: "A\xF1ade los medicamentos y vitaminas de tu familia aqu\xED.",
        manageRoutines: "Gestionar Rutinas",
        add: "A\xF1adir",
        edit: "Editar",
        delete: "Eliminar",
        doseHistory: "Historial de Dosis",
        historyEmpty: "Historial limpio. Ning\xFAn registro encontrado.",
        editMed: "Editar Medicamento",
        newMed: "Nuevo Medicamento",
        medName: "Nombre del Medicamento",
        dose: "Dosis (ej: 1 comp)",
        time: "Horario (ej: 14:00)",
        notification: "Notificaci\xF3n",
        currentStock: "Stock Actual",
        stockQty: "Cant (opcional)",
        cancel: "Cancelar",
        save: "Guardar",
        stock: "Stock",
        lowStock: "Stock bajo! Quedan {{count}} unidades de {{name}}.",
        eduBoxTitle: "\u{1F6E1}\uFE0F Prevenci\xF3n Inteligente: El Peso de los Retrasos",
        eduBoxText1: 'Los medicamentos tienen diferentes "pesos" en su organismo:',
        eduBoxText2: "\u2022 Alta Criticidad (ej: Antibi\xF3ticos, Cr\xF3nicos): Los retrasos comprometen la eficacia del tratamiento. Mantener el ciclo original es fundamental.",
        eduBoxText3: "\u2022 Baja Criticidad (ej: Analg\xE9sicos): El riesgo principal es la toxicidad por tomar dosis muy juntas.",
        eduBoxText4: "*En caso de retrasos significativos, informe siempre a su m\xE9dico o cuidador.*",
        delayRuleQuestion: "En caso de retraso, \xBFcu\xE1l es la orientaci\xF3n m\xE9dica?",
        ruleRigid: "Mantener Horarios Fijos (Cr\xF3nicos / Antibi\xF3ticos)",
        ruleRigidSub: "La pr\xF3xima dosis mantendr\xE1 el ciclo original, ignorando el retraso.",
        ruleFlexible: "Contar desde la hora tomada (Sintom\xE1ticos)",
        ruleFlexibleSub: "El reloj se reinicia desde el momento en que se toma, previniendo sobredosis.",
        disposalTitle: "Desecho Seguro",
        disposalAlertMsg: "Est\xE1 eliminando este medicamento.\n\n\u26A0\uFE0F Recuerde: Nunca tire medicamentos a la basura com\xFAn ni al inodoro. Ll\xE9velos a una farmacia para evitar intoxicaciones y contaminaci\xF3n.\n\n\xBFConfirmar eliminaci\xF3n?",
        guideTitle: "Gu\xEDa de Desecho",
        guideBtn: "Desecho Seguro",
        guideP1: "\xBFC\xF3mo desechar medicamentos?",
        guideP2: "La caja de cart\xF3n y el prospecto pueden ir al reciclaje (destruya sus datos personales).",
        guideP3: "Los bl\xEDsters vac\xEDos, frascos o sobras deben entregarse en farmacias (Puntos SIGRE). \xA1Nunca los tire al inodoro!",
        reminderTitle: "Hora del Medicamento: {{name}}",
        reminderBody: "Es hora de tomar {{name}} ({{dosage}})."
      },
      knowledgeHub: {
        title: "Centro de Aprendizaje",
        subtitle: "Biblioteca de Gu\xEDas y Manuales",
        essentialConcepts: "Conceptos Esenciales",
        lifeContext: "Contexto de Vida",
        safetyReviews: "An\xE1lisis de Seguridad",
        emergencies: "Emergencias",
        practicalGuides: "Gu\xEDas Pr\xE1cticas",
        mobilityMaintenance: "Movilidad y Mantenimiento",
        methodology: "Metodolog\xEDa 3D",
        envPrevention: "Prevenci\xF3n por Ambientes",
        protectPet: "Protege a tu Mascota",
        ageCare: "Cuidados por Edad",
        pregnancyCare: "Cuidados en el Embarazo",
        toyGuide: "Gu\xEDa de Juguetes",
        kitchenUtensils: "Utensilios de Cocina",
        homeAppliances: "Electrodom\xE9sticos",
        electronicDevices: "Dispositivos Electr\xF3nicos",
        risksPrev: "Riesgos y Prevenci\xF3n",
        firePrev: "Prevenci\xF3n de Incendios",
        escapePlans: "Planes de Evacuaci\xF3n",
        firstAid: "Primeros Auxilios",
        eduGuide: "Gu\xEDa Educativa",
        kitsGuide: "Gu\xEDa de Kits",
        humansPets: "Humanos y Mascotas",
        toxicPlants: "Plantas T\xF3xicas",
        venomousAnimals: "Animales Venenosos",
        hazardousProducts: "Productos Peligrosos",
        electricalRisks: "Riesgos El\xE9ctricos",
        safeGardening: "Jardiner\xEDa Segura",
        kitCare: "Kit y Cuidados",
        condoSafety: "Seguridad en Condominio",
        extinguishersExits: "Extintores y Salidas",
        leisureTravel: "Ocio y Viajes",
        beachCamping: "Playa, Camping, E-Bikes",
        ppeTools: "EPP y Herramientas",
        dailySafety: "Seguridad Cotidiana",
        blogTitle: "Micro Blog",
        blogSub: "Prevenir en Casa",
        articles: "Art\xEDculos",
        realCases: "Casos Reales"
      },
      reports: {
        title: "Qu\xE9 y C\xF3mo",
        subtitle: "Descubra los Riesgos y Act\xFAe",
        personalReport: "Informe Personal",
        personalReportDesc: "An\xE1lisis detallado sobre tu hogar.",
        improvementHistory: "Historial de Mejoras",
        improvementHistoryDesc: "Ve tu evoluci\xF3n en seguridad.",
        environmentInspection: "Inspecci\xF3n de Ambientes",
        specialInspections: "Inspecciones Especiales",
        safeSchool: "Escuela Segura",
        safeSchoolDesc: "Eval\xFAa el ambiente escolar.",
        safeNursingHome: "Asilo Seguro",
        safeNursingHomeDesc: "Inspecci\xF3n senior t\xE9cnica.",
        pendencies: "Pendientes",
        item: "\xEDtem",
        items: "\xEDtems",
        safe: "Seguro",
        pending: "Pendiente",
        attention: "Atenci\xF3n",
        risk: "Riesgo",
        statusSafe: "Seguro",
        statusPending: "Pendiente",
        statusAttention: "Atenci\xF3n",
        statusRisk: "Riesgo",
        pendenciesPercent: "Pendientes ({{pct}}%)",
        missingPeople: "Faltan {{count}} personas.",
        pendenciesCount: "{{count}} pendientes",
        incompleteReg: "Registro Incompleto",
        resolve: "Resolver",
        verifyNow: "Verificar Ahora",
        allSafe: "Todo Seguro!",
        allSafeMsg: "Has completado todas las verificaciones.",
        savePDF: "Guardar Informe en PDF"
      },
      sosCountdown: {
        fallDetected: "CAIDA DETECTADA!",
        vitalCheck: "CHECK-IN SIN RESPUESTA",
        sendingSOS: "ENVIANDO SOS EN",
        locationMsg: "Tu ubicacion sera enviada a tus contactos de emergencia.",
        cancelBtn: "CANCELAR (FALSA ALARMA)",
        sendingAlert: "Enviando alerta...",
        confirmSend: "Abre tu app de mensajes para confirmar el envio.",
        closeBtn: "CERRAR",
        noContactsTitle: "Atencion",
        noContacts: "Ningun contacto de emergencia encontrado. Configura tu red de apoyo.",
        sosErrorTitle: "Error",
        sosError: "No fue posible enviar el SOS automatico.",
        fallMsg: "ALERTA DE CAIDA! Hubo un impacto fuerte y no hubo respuesta.",
        vitalMsg: "ALERTA DE SEGURIDAD! El check-in diario no fue respondido.",
        defaultMsg: "SOS! Necesito ayuda urgente."
      },
      firstAid: {
        whatHappened: "Que Paso?",
        tacticalProtocol: "Protocolo Tactico Rapido",
        people: "PERSONAS",
        pets: "MASCOTAS",
        immediateAction: "ACCION INMEDIATA REQUERIDA",
        criticalWarning: "AVISO CRITICO",
        callEmergency: "LLAMAR 112 AHORA",
        findVet: "BUSCAR CLINICA 24H"
      },
      profiles: {
        title: "Quien y Donde",
        subtitle: "Gestiona perfiles y hogares",
        peopleTab: "Personas",
        petsTab: "Mascotas",
        homeXRay: "Rayos X del Hogar",
        homeXRayDesc: "Resumen de edificacion, residentes y habitaciones",
        peopleProfiles: "Perfiles de Personas",
        myPets: "Mis Mascotas",
        newPet: "Nueva Mascota",
        newPerson: "Nueva Persona",
        locations: "Locales (Residencias)",
        locationsHelp: "Toca el icono de lapiz para renombrar o la papelera para eliminar.",
        newLocation: "Nuevo Local",
        renameLocation: "Renombrar Local",
        locationName: "Nombre del local",
        cancel: "Cancelar",
        save: "Guardar",
        deleteConfirm: "Eliminar {{name}}?",
        deleteTitle: "Eliminar?",
        yes: "Si",
        petCareTitle: "Perfil de Cuidados",
        petCareMsg: "La mascota no puede ser el usuario principal de la app.",
        profileSelected: "Perfil Seleccionado",
        monitoringFor: "Monitorizando ahora para: {{name}}",
        locationChanged: "Local Cambiado",
        managingNow: "Ahora gestionando: {{name}}",
        removeLocationTitle: "Eliminar Local?",
        removeLocationMsg: "Estas seguro de que deseas eliminar este local?",
        no: "No",
        yesDelete: "Si, Eliminar",
        actionBlocked: "Accion Bloqueada",
        cannotDeleteMain: "El perfil principal no puede ser eliminado.",
        cannotDeleteActive: "No es posible eliminar la residencia activa.",
        finishGoHome: "Finalizar e Ir al Inicio"
      },
      addProfile: {
        editTitle: "Editar Perfil",
        newTitle: "Nuevo Perfil",
        person: "Persona",
        pet: "Mascota",
        residenceLink: "VINCULO CON LA RESIDENCIA",
        resident: "Residente Fijo",
        visitor: "Visitante",
        name: "NOMBRE",
        petNamePH: "Nombre de la Mascota",
        personNamePH: "Nombre Completo",
        sex: "SEXO",
        gender: "GENERO",
        birth: "NACIMIENTO",
        vetFile: "Ficha Veterinaria",
        health: "Salud",
        bloodType: "TIPO SANGUINEO",
        breed: "RAZA / MESTIZO",
        breedPH: "Ej: Golden, Mestizo...",
        microchip: "MICROCHIP / ID",
        optional: "Opcional",
        neutered: "CASTRADO(A)?",
        conditions: "CONDICIONES E HISTORIAL",
        notes: "OTRAS OBSERVACIONES / ALERGIAS",
        notesPH: "Describa alergias, medicamentos recurrentes...",
        sosNetwork: "Red de Apoyo (SOS)",
        sosHelp: "Estos contactos seran notificados al activar el SOS.",
        contactName: "Nombre del Contacto",
        contactPhone: "Whatsapp / Telefono",
        addContact: "ADD",
        fillBoth: "Complete nombre y telefono.",
        nameRequired: "Ingrese el nombre.",
        dateIncomplete: "Fecha de nacimiento incompleta.",
        success: "Exito",
        profileSaved: "Perfil guardado!",
        error: "Error",
        saveFailed: "Error al guardar.",
        saveChanges: "Guardar Cambios",
        createProfile: "Crear Perfil",
        galleryPerm: "Necesitamos acceso a la galeria.",
        permRequired: "Permiso necesario"
      },
      wizard: {
        welcome: "Bienvenida",
        propertyType: "Tipo de Inmueble",
        structure: "Estructura",
        residents: "Registro de Residentes",
        protections: "Protecciones",
        priorities: "Prioridades",
        done: "Listo!",
        letsSetup: "Vamos a configurar {{name}}",
        quickSetup: "Un ajuste rapido para personalizar la seguridad para tu familia y mascotas.",
        whoLivesHere: "Quien vive aqui?",
        registerAll: "Registra a todos los residentes. Toca las tarjetas para seleccionar.",
        letsStart: "Empezamos?",
        addFamilyMsg: "Anadete a ti, tu familia y tus mascotas.",
        firstResident: "Registrar Primer Residente",
        newLabel: "Nuevo",
        completeReg: "Completar Registro",
        removeProfile: "Eliminar?",
        removeConfirm: "Deseas eliminar este perfil?",
        no: "No",
        yes: "Si",
        propertyTypeQ: "Cual es el tipo de inmueble?",
        propertyTypeHelp: "Esto ayuda a calibrar riesgos estructurales.",
        buildingDetails: "Detalles del Edificio Principal",
        buildingHow: "Como es la construccion donde viven?",
        singleStory: "Una Planta",
        multiStory: "Dos Plantas o mas",
        structureRooms: "Estructura y Ambientes",
        selectRooms: "Selecciona todos los ambientes que tu familia accede:",
        installedProtections: "Protecciones Instaladas",
        whatProtects: "Que ya protege tu casa?",
        biggestConcerns: "Mayores Preocupaciones",
        prioritizeAlerts: "Priorizaremos alertas sobre:",
        setupComplete: "Configuracion Completada!",
        readyToMonitor: "Tu ambiente esta listo para ser monitorizado.",
        finish: "Finalizar",
        continue: "Continuar",
        houseConfigured: "Casa Configurada!",
        envReady: "Ambiente listo para monitoreo.",
        accessHome: "Ir al Inicio",
        configError: "Error al guardar configuraciones."
      },
      checklistWizard: {
        shieldTitle: "Vamos a blindar tu casa?",
        shieldDesc: "Mapear los riesgos de tu ambiente es la esencia de la Prevencion 3D (Diaria, Dinamica y Duradera).",
        safetyWarningTitle: "Atencion a la Seguridad",
        safetyWarningDesc: "Sin el mapeo completo, puntos ciegos de riesgo permanecen ocultos. Vigilaro Care necesita conocer tu ambiente para activar las alertas de salud y seguridad correctamente.",
        walkThrough: "Recorrer casa paso a paso",
        chooseRoom: "Elegir ambiente especifico",
        skipForNow: "Saltar por ahora (No recomendado)",
        inspections: "Inspecciones",
        riskMapping: "Mapeo de Riesgos",
        selectRoom: "Selecciona el ambiente que deseas inspeccionar ahora. Comienza por las habitaciones de mayor circulacion.",
        priority: "Prioridad",
        backToApp: "Volver a la app (Finalizar despues)",
        routineInspection: "Inspecci\xF3n de Rutina",
        routineInspectionDesc: "Realiza inspecciones guiadas peri\xF3dicas para asegurar que tus ambientes siguen tan seguros como el d\xEDa en que los configuraste.",
        continuousAttention: "Atenci\xF3n Continua",
        continuousAttentionDesc: "La seguridad es din\xE1mica. Verifica regularmente si nuevos objetos o cambios en la disposici\xF3n de los muebles introdujeron nuevos riesgos.",
        startFullAudit: "Iniciar Auditor\xEDa Completa",
        auditSpecificRoom: "Auditar Habitaci\xF3n Espec\xEDfica",
        backToPanel: "Volver al Panel",
        specificAudit: "Auditor\xEDa Espec\xEDfica",
        selectRoomToAudit: "Selecciona qu\xE9 ambiente deseas auditar ahora:",
        backToHome: "Volver al Inicio"
      },
      checklistReport: {
        generalAssessment: "Evaluacion General",
        safetyScore: "Puntuacion de Seguridad",
        compliant: "Conformes",
        nonCompliant: "No Conformes",
        totalItems: "Total de items evaluados:",
        improvementTitle: "Oportunidades de Mejora",
        improvementFound: "Identificamos {{count}} punto(s) que pueden ser mejorados.",
        partnerQuote: "No somos policia, somos socios.",
        partnerMsg: "Nuestro objetivo es informar y orientar. No te preocupes si el puntaje no es 100% ahora. Lo importante es saber donde actuar para proteger a quienes amas.",
        itemNeedsAttention: "Item {{title}} necesita atencion",
        consultEducation: "Consulta la seccion Educacion para consejos practicos.",
        savedHistory: "Guardado en el Historial",
        savedHistoryMsg: "Esta evaluacion fue registrada automaticamente. Sigue tu evolucion a lo largo del tiempo!",
        shareReport: "Compartir Reporte",
        sharePrivacy: "* Incluye aviso de privacidad al compartir.",
        methodology3D: "Metodologia Prevencion 3D",
        daily: "DIARIA:",
        dailyDesc: "Cuidado constante y habitual",
        dynamic: "DINAMICA:",
        dynamicDesc: "Adaptable a los cambios de la familia",
        durable: "DURADERA:",
        durableDesc: "Prevencion sostenible y continua",
        newChecklist: "Nuevo Checklist",
        home: "Inicio",
        privacyTitle: "Privacidad y Seguridad",
        privacyMsg: "Estas a punto de compartir un reporte detallado con informacion sobre la seguridad de tu residencia. Asegurate de enviar este archivo solo a personas de tu extrema confianza.",
        cancel: "Cancelar",
        awareAndSend: "Estoy Consciente y Quiero Enviar",
        shareError: "No fue posible compartir.",
        excellent: "Excelente!",
        excellentMsg: "Tu casa esta muy segura! Sigue asi.",
        goodProgress: "Buen progreso!",
        goodProgressMsg: "Algunos ajustes necesarios. Prioriza los items no conformes.",
        attentionNeeded: "Atencion necesaria",
        attentionNeededMsg: "Varios riesgos identificados. Recomendamos accion urgente."
      },
      actionPlan: {
        title: "Plan de Accion",
        subtitle: "Inspeccion de Correccion",
        critical: "Criticos",
        pending: "Pendientes",
        resolved: "Resueltos",
        priorityItems: "Items Prioritarios",
        allVerified: "Todo Verificado!",
        risk: "RIESGO",
        safeZone: "Zona segura confirmada. El ambiente no posee vulnerabilidades activas pendientes de resolucion.",
        backHome: "Volver al Inicio",
        error: "Error",
        loadError: "No fue posible cargar el plan de accion.",
        noProfile: "Ningun perfil activo encontrado para generar el reporte.",
        generateReport: "Generar Reporte",
        generatePDFConfirm: "Deseas generar el reporte en PDF con el plan de accion actual?",
        cancel: "Cancelar",
        generate: "Generar",
        pdfError: "Error al generar PDF: "
      },
      checklistCategoria: {
        tapToInspect: "Tocar para iniciar inspeccion",
        roomsFound: "{{count}} ambiente(s) encontrados en esta categoria"
      },
      about: {
        title: "Sobre la App",
        subtitle: "Vigilaro Care V6 Neo.",
        version: "Version",
        mission: "Nuestra Mision",
        missionText: "Ayudar a familias a crear hogares mas seguros y acogedores. Creemos que la prevencion es la mayor forma de amor y cuidado. Vigilaro une tecnologia y empatia para proteger a quienes mas amas.",
        legalInfo: "Informacion Legal",
        termsOfUse: "Terminos de Uso",
        privacyPolicy: "Politica de Privacidad",
        contactSupport: "Contacto y Soporte",
        contactUs: "Contactenos",
        visitSite: "Visite nuestro sitio",
        advancedSettings: "Configuraciones Avanzadas",
        resetApp: "Reiniciar App (Reset)",
        resetTitle: "Reiniciar App",
        resetMsg: "Estas seguro? Esto borrara TODOS los datos. La app volvera a su estado inicial.",
        cancel: "Cancelar",
        yesDeleteAll: "Si, Borrar Todo",
        madeWith: "Hecho con amor por el equipo Vigilaro",
        copyright: "2026 Vigilaro Inc. Todos los derechos reservados."
      },
      upgrade: {
        heroTitle: "Tu familia merece proteccion sin limites",
        heroSub: "Acceso completo a todo lo que Vigilaro tiene para proteger a quienes amas.",
        premium: "Premium",
        family: "Familia",
        mostComplete: "Mas completo",
        monthly: "Mensual",
        annual: "Anual",
        perMonth: "/mes",
        perYear: "/ano",
        loading: "Cargando...",
        loadingPlans: "Cargando planes...",
        subscribe: "Suscribirse",
        restorePurchases: "Restaurar Compras",
        alreadyProtected: "Ya estas protegido!",
        allFeatures: "Todos los recursos estan disponibles para ti.",
        validUntil: "Valido hasta:",
        back: "Volver",
        offline: "Sin conexion",
        offlineMsg: "Verifica tu conexion para realizar la compra.",
        errorLink: "No fue posible abrir este enlace.",
        invalidProduct: "Producto invalido o no disponible. Intenta recargar.",
        protectionActive: "Proteccion activada",
        understood: "Entendido",
        purchaseError: "Error en la compra",
        purchaseErrorFallback: "Fallo en la transaccion. Intenta de nuevo.",
        unexpectedError: "Ocurrio un error en el checkout. Intenta de nuevo.",
        subscriptionRestored: "Suscripcion restaurada",
        restoredMsg: "Tu proteccion esta activa nuevamente!",
        noSubscription: "Ninguna suscripcion encontrada",
        noSubscriptionMsg: "Si realizaste una compra reciente, espera unos minutos e intenta nuevamente.",
        restoreError: "Error al restaurar.",
        unexpectedRestore: "No fue posible restaurar las compras.",
        cannotLoad: "No pudimos cargar los planes ahora",
        checkConnection: "Verifica tu conexion e intenta de nuevo.",
        tryAgain: "Intentar de nuevo",
        error: "Error",
        save: "Ahorra",
        featFree1: "Checklists de seguridad domestica",
        featFree2: "Boton SOS de emergencia",
        featFree3: "Escaner IA de riesgos (5/mes)",
        featFree4: "Asistente de prevencion por voz (10/mes)",
        featFree5: "Auditor en tiempo real",
        featFree6: "Reporte mensual de seguridad",
        featPrem1: "Todo de la proteccion esencial",
        featPrem2: "Escaner IA ilimitado",
        featPrem3: "Asistente de prevencion ilimitado",
        featPrem4: "Auditor en vivo (15 min/mes)",
        featPrem5: "Reporte mensual de seguridad",
        featPrem6: "Experiencia limpia, sin interrupciones",
        featFam1: "Todo de Premium, multiplicado por la familia",
        featFam2: "Auditor en vivo \u2014 60 min/mes para toda la familia",
        featFam3: "Proteccion para hasta 5 miembros",
        featFam4: "Sabe cuando la familia llego o salio de casa",
        featFam5: "Cuidado activo para parientes mayores",
        featFam6: "Soporte prioritario",
        termsFooter: "La suscripcion se renueva automaticamente al final de cada periodo por el precio mostrado arriba, a menos que se cancele al menos 24 horas antes del fin del periodo actual. Puedes administrar y cancelar tu suscripcion en la configuracion de tu cuenta:\n\n- iOS: Ajustes > [Tu nombre] > Suscripciones\n- Android: Google Play > Perfil > Pagos y suscripciones\n\nAl continuar, aceptas nuestros Terminos de Uso y Politica de Privacidad."
      },
      configMenu: {
        title: "Perfiles y Configuraciones",
        familyProfiles: "Perfiles Familiares",
        assistantVoice: "Voz del Asistente",
        securityDevices: "Dispositivos de Seguridad",
        aboutApp: "Sobre Vigilaro Care"
      },
      common: {
        locale: "es-ES"
      },
      welcome: {
        title: "Bienvenido a Vigilaro Care",
        subtitle: "Prevenci\xF3n Inteligente para Proteger a Quienes Amas.",
        accessibility: "Accesibilidad",
        accessibilityLabel: "Configuraci\xF3n de Accesibilidad",
        lgpdConsent: "He le\xEDdo y acepto los",
        termsOfUse: "T\xE9rminos de Uso",
        lgpdAnd: "y la",
        privacyPolicy: "Pol\xEDtica de Privacidad",
        startNow: "Comenzar Ahora"
      },
      animals: {
        title: "Animales",
        subtitle: "Gu\xEDa de Identificaci\xF3n",
        searchPlaceholder: "Buscar animal...",
        emergencyTitle: "\xBFEmergencia Toxicol\xF3gica?",
        emergencyDesc: "Llame al CIATOX: 0800 722 6001",
        andMore: "y +{{count}}",
        noResults: "Ning\xFAn animal encontrado."
      },
      plants: {
        title: "Plantas",
        subtitle: "Gu\xEDa de Identificaci\xF3n",
        searchPlaceholder: "Buscar planta...",
        emergencyTitle: "\xBFEmergencia toxicol\xF3gica?",
        emergencyDesc: "Llame a CIATOX: 0800 722 6001",
        variedSymptoms: "S\xEDntomas variados",
        andMore: "(+{{count}} m\xE1s)",
        noResults: "No se encontraron plantas."
      },
      detail: {
        toxicParts: "Partes T\xF3xicas",
        humanSymptoms: "S\xEDntomas en Humanos",
        petSymptoms: "S\xEDntomas en Mascotas",
        generalSymptoms: "S\xEDntomas Generales",
        whereFound: "\u{1F4CD} D\xF3nde se Encuentra",
        safeAlternatives: "\u{1F331} Alternativas Seguras",
        howToPrevent: "C\xF3mo Evitar / Prevenir",
        practicalExamples: "Ejemplos Pr\xE1cticos",
        identification: "Identificaci\xF3n",
        firstAid: "Primeros Auxilios",
        whatToDo: "Qu\xE9 Hacer",
        whatNotToDo: "Qu\xE9 NO Hacer",
        curiosities: "Curiosidades",
        dataStats: "Datos y Estad\xEDsticas",
        importance: "Importancia",
        definition: "Definici\xF3n",
        description: "Descripci\xF3n",
        completeGuide: "Gu\xEDa Completa",
        details: "Detalles"
      },
      fasesVida: {
        title: "Etapas de la Vida",
        subtitle: "Gu\xEDa de protecci\xF3n por edad",
        relatedGuides: "Gu\xEDas de Seguridad por Edad",
        tagBabies: "Beb\xE9s",
        tagChildren: "Ni\xF1os",
        tagElderly: "Ancianos"
      },
      petsMenu: {
        headerTitle: "Seguridad de Mascotas",
        headerSubtitle: "Protecci\xF3n para tu mejor amigo",
        introText: "Nuestras mascotas son curiosas y dependen de nosotros para estar seguras. Elige una categor\xEDa abajo.",
        prenhez: {
          titulo: "Pre\xF1ez y Camadas",
          subtitulo: "Gestaci\xF3n y Parto",
          descricao: "Cuidados especiales para la madre y los cachorros."
        },
        filhotes: {
          titulo: "Cachorros",
          subtitulo: "0 a 12 meses",
          descricao: "Seguridad y socializaci\xF3n en los primeros meses."
        },
        adultos: {
          titulo: "Mascotas Adultas",
          subtitulo: "Vida Adulta",
          descricao: "Prevenci\xF3n de accidentes en la vida adulta."
        },
        aves: {
          titulo: "Aves",
          subtitulo: "Aves Ornamentales",
          descricao: "Tefl\xF3n, vapores y corrientes de aire."
        },
        wellness: {
          titulo: "Hub de Bienestar",
          subtitulo: "Cuidados Diarios",
          descricao: "Consejos de rutina, hidrataci\xF3n y enriquecimiento."
        },
        pequenos: {
          titulo: "Peque\xF1as Mascotas",
          subtitulo: "Roedores y otros",
          descricao: "Conejos, H\xE1msters y Cobayas."
        },
        peixes: {
          titulo: "Peces",
          subtitulo: "Acuarios",
          descricao: "Peces y Reptiles acu\xE1ticos."
        },
        alimentos: {
          titulo: "Alimentos Prohibidos",
          subtitulo: "Seguridad Alimentaria",
          descricao: "Lo que tu mascota nunca debe comer."
        },
        socorros: {
          titulo: "Primeros Auxilios",
          subtitulo: "Acciones de Emergencia",
          descricao: "Qu\xE9 hacer en atragantamientos, mordeduras y ca\xEDdas."
        },
        guia_socorros_pet: {
          titulo: "Gu\xEDa de Primeros Auxilios",
          subtitulo: "Aprendizaje Preventivo",
          descricao: "Estudia el paso a paso para actuar con calma."
        },
        kit_pet_checklist: {
          titulo: "Kit de Emergencia",
          subtitulo: "Checklist Pr\xE1ctico",
          descricao: "Arma y verifica el kit de preparaci\xF3n de tu mascota."
        }
      },
      lazerMenu: {
        headerTitle: "Ocio y Vacaciones",
        headerSubtitle: "Diversi\xF3n con seguridad garantizada.",
        lazer: {
          title: "Ocio y Diversi\xF3n",
          subtitulo: "Playa, Piscina, Parques",
          desc: "Seguridad en momentos de ocio, camping y actividades al aire libre."
        },
        ferias: {
          title: "Vacaciones y Viajes",
          subtitulo: "Ruta, Hotel, Avi\xF3n",
          desc: "Cuidados en la ruta, seguridad en hoteles y documentos de viaje."
        },
        mobilidade: {
          title: "Movilidad y E-Bikes",
          subtitulo: "E-bikes, autos y m\xE1s",
          desc: "Reglas de tr\xE1nsito, categor\xEDas y consejos de seguridad para veh\xEDculos de ocio y micromovilidad."
        }
      },
      riscosFisicos: {
        headerTitle: "Riesgos F\xEDsicos",
        headerSubtitle: "Electricidad, Ca\xEDdas y m\xE1s."
      },
      ageGroup: {
        risksTitle: "Principales Riesgos",
        howToPrevent: "C\xF3mo Prevenir:"
      },
      petWellness: {
        title: "Hub de Bienestar",
        subtitle: "Cuidados diarios para una vida larga y feliz",
        introText: "La prevenci\xF3n es la mejor forma de amor. Peque\xF1os ajustes en la rutina pueden evitar grandes emergencias en el futuro."
      },
      petFood: {
        headerTitle: "Lista Negra",
        heroTitle: "Alimentos Prohibidos",
        heroDesc: "Metabolismos diferentes convierten golosinas humanas en venenos letales para perros y gatos. Memoriza esta lista roja.",
        alertTitle: "\xBFIntoxicaci\xF3n Reciente?",
        alertDesc: "Corra al Veterinario o llame al CIATOX: 0800-722-6001",
        listTitle: "Mosaico de Riesgos"
      },
      petPregnancy: {
        title: "Pre\xF1ez y Camadas",
        subtitle: "Gu\xEDa completa para cuidar de la madre y los cachorros",
        importantTitle: "Importante",
        importantText: "Esta gu\xEDa es informativa. Siempre consulte a un veterinario para el seguimiento adecuado del embarazo y parto.",
        tipTitle: "Consejo Importante",
        tipText: "La esterilizaci\xF3n es la forma m\xE1s eficaz de prevenir embarazos no deseados y contribuye a la salud de tu mascota. Habla con tu veterinario sobre el mejor momento para realizar el procedimiento."
      },
      avesSeguras: {
        headerTitle: "Seguridad de Aves",
        environmentTitle: "Ambiente Saludable"
      },
      petPregnancyTracker: {
        title: "Gesti\xF3n de Pre\xF1ez",
        subtitle: "Seguimiento",
        selectPet: "Seleccione la Mascota:",
        noPets: "Ninguna mascota encontrada.",
        registerPet: "Registrar Mascota",
        startTracking: "Iniciar Seguimiento",
        matingDate: "Fecha de Cruce (DD/MM/AAAA)",
        dueDate: "Fecha prevista del parto:",
        gestationDays: "(~{{days}} d\xEDas de gestaci\xF3n)",
        confirmPregnancy: "Confirmar Pre\xF1ez",
        ongoingPregnancy: "Gestaci\xF3n en Curso",
        weekNumber: "Semana {{week}}\xAA",
        start: "Inicio",
        birth: "Parto",
        mating: "Cruce",
        forecast: "Previsi\xF3n",
        weeklyTips: "Consejos de la Semana",
        tip1: "En las primeras semanas, la alimentaci\xF3n puede continuar normal. Evite el estr\xE9s excesivo.",
        tip2: "El apetito puede aumentar. Consulte al veterinario sobre comida para cachorros (m\xE1s rica en nutrientes).",
        tip3: "Prepare el 'nido' en un lugar tranquilo. La barriga ya deber\xEDa ser bastante visible.",
        registerBirth: "Registrar Nacimiento",
        litterCount: "Cantidad de Cachorros",
        finishPregnancy: "Finalizar Gestaci\xF3n",
        breedNotInformed: "Raza no informada",
        errorTitle: "Error",
        errorMatingDate: "Ingrese la fecha de cruce correctamente (DD/MM/AAAA).",
        errorLitterCount: "Ingrese la cantidad de cachorros.",
        successTitle: "\xC9xito",
        successPregnancy: "\xA1Seguimiento de pre\xF1ez iniciado!",
        congratsTitle: "\xA1Felicitaciones!",
        congratsBirth: "\xA1Nacimiento de {{count}} cachorros registrado!",
        errorSave: "Error al guardar datos."
      },
      riscosMenu: {
        title: "Prevenci\xF3n en Casa",
        subtitle: "Gu\xEDa consultiva de accidentes por habitaci\xF3n.",
        preventionTopics: "temas de prevenci\xF3n"
      },
      envScreens: {
        title: "Riesgos y Orientaciones por Ambiente",
        preventionGuide: "Gu\xEDa de prevenci\xF3n",
        living: "Convivencia y Estar",
        rest: "\xC1rea de Descanso",
        services: "Servicios y Utilidades",
        leisure: "Ocio y Exterior",
        circulation: "Circulaci\xF3n y Accesos"
      },
      headersFirst: {
        electronicDevices: "Dispositivos Electr\xF3nicos",
        homeAppliances: "Electrodom\xE9sticos",
        householdUtensils: "Utensilios Dom\xE9sticos",
        toolsAndRepairs: "Herramientas y Reparaciones",
        safetyAndMaintenance: "Seguridad y Mantenimiento.",
        gardening: "Jardiner\xEDa",
        chemicals: "Productos Qu\xEDmicos",
        travelSafety: "Seguridad en Viajes y Ocio",
        sosPet: "S.O.S Mascota",
        survivalProtocols: "Protocolos de Supervivencia",
        lifeThreateningCall: "Llamada de Riesgo de Vida",
        poisoning: "Envenenamiento / T\xF3xicos",
        hemorrhage: "Hemorragia / Traumas",
        medicineKit: "Kit de Medicinas",
        rescueKits: "Kits de Socorro",
        whyPrepare: "\xBFPor qu\xE9 prepararse?",
        firePlan: "Plan de Incendio",
        critical: "CR\xCDTICO:",
        firstAid: "Primeros Auxilios",
        people: "Personas",
        pets: "Mascotas",
        arrivalInspection: "Inspecci\xF3n de Llegada",
        comingSoon: "Pr\xF3ximamente",
        safeCheckout: "Checkout Seguro",
        travelKit: "Kit de Viaje",
        goingToTravel: "\xBFVas a viajar?",
        destinationType: "\xBFCu\xE1l es el tipo de destino?",
        travelPurpose: "Prop\xF3sito del Viaje",
        internationalDestination: "\xBFDestino Internacional?",
        whoIsGoing: "\xBFQui\xE9n va contigo?",
        itensIncluDos: "Art\xEDculos incluidos:",
        acessRios: "Accesorios",
        KitsRecomendados: "\u{1F381} Kits Recomendados",
        categorias: "Categor\xEDas",
        vigilaroAIChat: "Vigilaro AI \u2014 Chat",
        monitorDeUdio: "Monitor de Audio",
        vIGILAROAI: "VIGILARO AI",
        checklistReforma: "Checklist: Reforma",
        ativarModoReforma: "Activar Modo Reforma",
        checklistVisita: "Checklist: Visita",
        mapeamentoDeAtivos: "Mapeo de Activos",
        histRicoDeMelhorias: "Historial de Mejoras",
        mapeamentoDaCasa: "Mapeo del Hogar",
        kitsDeProntidO: "Kits de Preparaci\xF3n",
        vistoriarAmbientes: "Inspeccionar Ambientes",
        vigilaroVoice: "Vigilaro Voice",
        guiaDeKits: "Gu\xEDa de Kits",
        novoEvento: "Nuevo Evento",
        novoExame: "Nuevo Examen",
        novoRegistro: "Nuevo Registro",
        semRemDios: "Sin medicamentos",
        agendaVazia: "Agenda Vac\xEDa",
        saDeDoPet: "Salud de la Mascota",
        nenhumPetCadastrado: "Ninguna Mascota Registrada",
        compartilhar: "Compartir",
        infoRTulos: "InfoEtiquetas",
        atividadesEventuais: "Actividades Eventuales",
        guiaDeSeguranA: "Gu\xEDa de Seguridad",
        dicasDeOuro: "Consejos de Oro:",
        excelente: "\xA1Excelente!",
        pontosDeAtenO: "Puntos de Atenci\xF3n",
        polTicaDePrivacidade: "Pol\xEDtica de Privacidad",
        raioXDaMoradia: "Radiograf\xEDa del Hogar",
        seuRelatRioPersonalizado: "Su Informe Personalizado",
        atividadeRecente: "Actividad Reciente",
        nenhumaAtividadeRecente: "Sin actividad reciente",
        relatRioCompleto: "Informe Completo",
        PontosDeAtenO: "\u26A0\uFE0F Puntos de Atenci\xF3n",
        PerguntasParaFazerEscola: "\u{1F4AC} Preguntas para Hacer a la Escuela",
        dicaImportante: "Consejo Importante",
        verRelatRioCompleto: "Ver Informe Completo",
        relatRioInstitucional: "Informe Institucional",
        RiscosCrTicosIdentificados: "\u{1F6A8} Riesgos Cr\xEDticos Identificados",
        PerguntasParaAInstituiO: "\u{1F4AC} Preguntas para la Instituci\xF3n",
        notaDeAuditoria: "Nota de Auditor\xEDa",
        gerarRelatRioTCnico: "Generar Informe T\xE9cnico",
        anLiseDeSeguranA: "An\xE1lisis de Seguridad",
        gestODeEventos: "Gesti\xF3n de Eventos",
        termosDeUso: "T\xE9rminos de Uso",
        ferramentasIA: "Herramientas IA",
        histRicoAnalTico: "Historial Anal\xEDtico",
        fazendoAsMalas: "Haciendo las Maletas",
        monitorDeVisO: "Monitor de Visi\xF3n",
        investimentoEstimado: "Inversi\xF3n estimada:",
        ouvirDetalhes: "Escuchar Detalles",
        proteOPersonalizadaParaCadaPerfil: "Protecci\xF3n personalizada para cada perfil",
        estamosPreparandoOsAcessRiosParaEstePerf: "Estamos preparando los accesorios para este perfil.",
        aoInstalarAcessRiosDeSeguranASigaSempreA: "Al instalar accesorios de seguridad, siga siempre las instrucciones del fabricante\n                            y verifique peri\xF3dicamente que est\xE1n bien fijados.",
        olComoPossoAjudar: "\xA1Hola! \xBFC\xF3mo puedo ayudar?",
        tireDVidasSobreSeguranADomSticaPrevenODe: "Resuelva dudas sobre seguridad dom\xE9stica, prevenci\xF3n de accidentes y primeros auxilios.",
        respondendo: "Respondiendo...",
        assistenteDeVoz: "Asistente de Voz",
        converseNaturalmenteComNossaIAEspecializ: "Hable naturalmente con nuestra IA especializada. Resuelva dudas sobre seguridad dom\xE9stica, prevenci\xF3n y primeros auxilios.",
        tireDVidasEmTempoReal: "Resuelva dudas en tiempo real",
        suporteParaEmergNcias: "Soporte para Emergencias",
        dicasDePrevenO: "Consejos de Prevenci\xF3n",
        falarComAIAElevenLabs: "Hablar con la IA (ElevenLabs)",
        digitarTexto: "Escribir Texto",
        comoFunciona: "\xBFC\xF3mo funciona?",
        deixeEsteCelularNoQuartoDoBebOuAmbienteM: "Deje este tel\xE9fono en la habitaci\xF3n del beb\xE9 o en el ambiente monitoreado.\n                            Si hay llanto o ruido fuerte, emitir\xE1 una alerta visual.",
        vigilaroAI: "Vigilaro AI",
        vigilaroEstPensando: "Vigilaro est\xE1 pensando...",
        vERIFICAODESEGURANA: "VERIFICACI\xD3N DE SEGURIDAD",
        sIM: "S\xCD",
        nO: "NO",
        nA: "N/A",
        eVITE: "EVITE",
        aTENO: "ATENCI\xD3N",
        ReasExternas: "\xC1reas Externas",
        quintalPiscinaELazer: "Patio, Piscina y Ocio",
        prXimoAmbiente: "Siguiente Ambiente",
        voltar: "Volver",
        cRTICO: "CR\xCDTICO",
        salvar: "Guardar",
        marqueOQueVocPossuiEmCasaParaAtivarOsAle: "Marque lo que tiene en casa para activar las alertas de protecci\xF3n personalizadas.",
        pareceQueVocAindaNOTemRegistros: "Parece que a\xFAn no tiene registros.",
        realizeVistoriasEMarqueOsItensComoSeguro: "Realice inspecciones y marque los elementos como Seguros para construir su historial.",
        marcadoComoSeguro: "Marcado como Seguro \u2713",
        indiqueOQueExisteNaSuaCasa: "Indique qu\xE9 existe en su hogar",
        salvarMapeamento: "Guardar Mapeo",
        selecioneUmaCategoria: "Seleccione una categor\xEDa",
        aCaixaDeFerramentasEstVaziaEstrutureSeus: "La caja de herramientas est\xE1 vac\xEDa. Estructure sus kits de emergencia para una respuesta r\xE1pida.",
        paraProtegermosSuaFamLiaPrecisamosConhec: "Para proteger a su familia, necesitamos conocer su hogar y qui\xE9n vive en \xE9l.\n              \xA1Responda solo una vez!",
        ondeVocMora: "\xBFD\xF3nde vive?",
        quantosAndares: "\xBFCu\xE1ntos pisos?",
        ReasExternasLazer: "\xC1reas Externas y Ocio",
        estruturasRiscosInternos: "Estructuras y Riesgos Internos",
        prioridadesDeSeguranA: "Prioridades de Seguridad \u{1F6A8}",
        oQueMaisTePreocupaHoje: "\xBFQu\xE9 le preocupa m\xE1s hoy?",
        proteEsJInstaladas: "Protecciones Ya Instaladas \u2705",
        checklistsDeSeguranA: "Checklists de Seguridad",
        suaCasaAindaNOFoiMapeada: "Su hogar a\xFAn no ha sido mapeado",
        paraCriarChecklistPersonalizadosPrecisam: "Para crear checklists personalizados, necesitamos saber qu\xE9 existe en su hogar (\xBFPiscina? \xBFEscaleras? \xBFPatio?).",
        iniciarMapeamentoDaCasa: "Iniciar Mapeo del Hogar",
        oQueTenhoAtivos: "Lo que Tengo (Activos)",
        inventRioDeRisco: "Inventario de Riesgo",
        mapeie25ItensPerigososAirFryerVidrosEsca: "Mapee 25+ elementos peligrosos (Air Fryer, Vidrios, Escaleras...) para activar la protecci\xF3n inteligente.",
        mapear: "Mapear",
        ajustarAmbientesMapeados: "Ajustar Ambientes Mapeados",
        adicionarOutraResidNcia: "Agregar Otra Residencia",
        riscosPrevenOEOQueFazerEmCasoDeAcidente: "Riesgos, prevenci\xF3n y qu\xE9 hacer en caso de accidente",
        conteDoNOEncontrado: "Contenido no encontrado.",
        resumoOtimizadoRiscoAO: "Resumen Optimizado (Riesgo + Acci\xF3n)",
        lembreSeAPrevenOAtivaDependeDeVerificaOC: "Recuerde: La prevenci\xF3n activa depende de verificaci\xF3n constante.",
        regrasDeOuro: "Reglas de Oro",
        risco: "Riesgo:",
        ePIs: "EPPs:",
        cuidado: "Precauci\xF3n:",
        estejaPreparadoQuandoPrecisar: "Est\xE9 preparado cuando lo necesite.",
        montarEsteKit: "Armar este Kit",
        cultivoSeguro: "Cultivo Seguro",
        APrTicaDaJardinagemEOCultivoDeHortasEmCa: '"La pr\xE1ctica de la jardiner\xEDa y el cultivo de huertos en casa son actividades terap\xE9uticas. El equilibrio entre el equipo correcto y la seguridad es fundamental."',
        preparaODoSolo: "Preparaci\xF3n del Suelo",
        podaEManutenO: "Poda y Mantenimiento",
        regaELimpeza: "Riego y Limpieza",
        proteOObrigatRia: "\xA1La Protecci\xF3n es Obligatoria!",
        Luvas: "\u2022 Guantes:",
        CalAdosFechados: "\u2022 Calzado Cerrado:",
        Roupas: "\u2022 Ropa:",
        ProteOSolar: "\u2022 Protecci\xF3n Solar:",
        ProdutosQuMicos: "\u2623\uFE0F Productos Qu\xEDmicos",
        embalagemOriginal: "envase original",
        PlantasTXicas: "\u{1F33F} Plantas T\xF3xicas",
        comigoNinguMPode: "Diefenbaquia",
        bicoDePapagaio: "Nochebuena",
        AnimaisPeOnhentos: "\u{1F577}\uFE0F Animales Venenosos",
        entulhosAtraemEscorpiEsEAranhasMantenhaO: "Los escombros atraen escorpiones y ara\xF1as. Mantenga el patio limpio y revise el calzado y los guantes antes de usar.",
        PrevenirEmCasa: "\u{1F4F0} Prevenir en Casa",
        lerArtigoCompleto: "Leer art\xEDculo completo",
        compartilharEsteArtigo: "Compartir este art\xEDculo",
        iNTOXICAO: "\xBFINTOXICACI\xD3N?",
        ligueImediatamente08007226001: "Llame inmediatamente: 0800 722 6001",
        DescriO: "\u{1F4CB} Descripci\xF3n",
        PartesTXicas: "\u2623\uFE0F Partes T\xF3xicas",
        SintomasEmHumanos: "\u{1F464} S\xEDntomas en Humanos",
        SintomasEmPetsCEsEGatos: "\u{1F43E} S\xEDntomas en Mascotas (Perros y Gatos)",
        PrimeirosSocorros: "\u{1FA79} Primeros Auxilios",
        OQUEFAZER: "\u2705 QU\xC9 HACER:",
        OQUENOFAZER: "\u274C QU\xC9 NO HACER:",
        ComoIdentificar: "\u{1F50D} C\xF3mo Identificar",
        OndeEncontrada: "\u{1F4CD} D\xF3nde se Encuentra",
        AlternativasSeguras: "\u{1F331} Alternativas Seguras",
        considereSubstituirPorEstasPlantasNOTXic: "Considere reemplazarla por estas plantas no t\xF3xicas:",
        ComoPrevenir: "\u{1F6E1}\uFE0F C\xF3mo Prevenir",
        MantenhaAPlantaForaDoAlcanceDeCrianAsEPe: "\u2022 Mantenga la planta fuera del alcance de ni\xF1os y mascotas",
        EnsineCrianAsANOTocarOuComerPlantas: "\u2022 Ense\xF1e a los ni\xF1os a no tocar ni comer plantas",
        UseLuvasAoManusearAPlanta: "\u2022 Use guantes al manipular la planta",
        ConsidereRemovLaSeHouverCrianAsPequenasO: "\u2022 Considere retirarla si hay ni\xF1os peque\xF1os o mascotas",
        MantenhaONMeroDoCentroDeIntoxicaOSalvo08: "\u2022 Guarde el n\xFAmero del Centro de Intoxicaci\xF3n: 0800 722 6001",
        lIGARPARACENTRODEINTOXICAO: "LLAMAR AL CENTRO DE INTOXICACI\xD3N",
        riscosInvisVeisEmCasa: "Riesgos invisibles en el hogar",
        sobre: "Acerca de",
        frequNciaDeUso: "Frecuencia de uso",
        maisVulnerVeis: "M\xE1s vulnerables",
        riscosIdentificados: "Riesgos Identificados",
        comoPrevenir: "C\xF3mo Prevenir",
        oQueFazerEmCasoDeAcidente: "Qu\xE9 Hacer en Caso de Accidente",
        vocSabia: "\xBFSab\xEDa que?",
        teoriaDoFogo: "Teor\xEDa del Fuego",
        conceitosEssenciaisDePrevenO: "Conceptos esenciales de prevenci\xF3n.",
        FRiasEMomentosDeLazerExigemAtenORedobrad: '"Las vacaciones y momentos de ocio requieren atenci\xF3n adicional. Descubra c\xF3mo prevenir accidentes fuera del hogar."',
        cOMOPREVENIR: "C\xD3MO PREVENIR",
        pRIMEIROSSOCORROS: "PRIMEROS AUXILIOS",
        utensLiosDomSticos: "Utensilios Dom\xE9sticos",
        seguranANaCozinhaEReasDeServiO: "Seguridad en la cocina y \xE1reas de servicio.",
        requerTrava: "Requiere Seguro",
        RiscosPrincipais: "\u26A0\uFE0F Riesgos Principales",
        PrevenO: "\u{1F6E1}\uFE0F Prevenci\xF3n",
        eletrodomesticos: "Electrodom\xE9sticos",
        guiaDeSeguranAParaEquipamentosDomSticos: "Gu\xEDa de seguridad para equipos dom\xE9sticos.",
        RedeDeApoio: "\u{1F4A1} Red de Apoyo",
        mantenhaEssaListaAtualizadaEmUmaEmergNci: "Mantenga esta lista actualizada. En una emergencia, estos contactos aparecer\xE1n al inicio.",
        nome: "Nombre *",
        detalheRelacionamento: "Detalle / Relaci\xF3n",
        telefone: "Tel\xE9fono *",
        tipo: "Tipo *",
        cancelar: "Cancelar",
        adicionarContato: "Agregar Contacto",
        SMS: "\u{1F4AC} SMS",
        nenhumContatoNestaLista: "Ning\xFAn contacto en esta lista",
        centralDeAOImediata: "Central de Acci\xF3n Inmediata",
        guiasPassoAPassoRPidosParaEngasgoEnvenen: "Gu\xEDas paso a paso r\xE1pidas para Atragantamiento, Envenenamiento y Ca\xEDdas.",
        cIATOXLIGUE08007226001: "CIATOX - LLAME 0800 722 6001",
        buscarClNicas24hNaRegiO: "Buscar Cl\xEDnicas 24h en la Zona",
        protocolosDetectados: "Protocolos Detectados",
        atenOAveNaCasa: "Atenci\xF3n: Ave en Casa",
        riscoRespiratRioCrTicoTeflonVapores: "Riesgo Respiratorio Cr\xEDtico (Tefl\xF3n/Vapores)",
        carteirinhaDeVacinaO: "Carnet de Vacunaci\xF3n",
        histRicoParaApresentarAoVeterinRio: "Historial para presentar al Veterinario.",
        fAAAGORA: "HAGA ESTO AHORA:",
        sAMU192: "SAMU: 192",
        bOMBEIROS193: "BOMBEROS: 193",
        sAIR: "SALIR",
        oQUEACONTECEU: "\xBFQU\xC9 PAS\xD3?",
        reviseOsItensAbaixoParaRestaurarASeguran: "Revise los elementos a continuaci\xF3n para restaurar la seguridad del hogar.",
        NdiceRestauradoEstimado: "\xCDndice restaurado estimado",
        concluirEVoltarAoDashboard: "Finalizar y volver al Dashboard",
        kitParaEmergNcias: "Kit de Emergencias",
        vitalParaSobrevivNciaEmCatStrofesNaturai: "Vital para la supervivencia en cat\xE1strofes naturales como inundaciones, deslizamientos e incendios. Debe garantizar autonom\xEDa y seguridad por 72 horas.",
        checklistDoKit: "Checklist del Kit",
        verifiqueAValidadeDosAlimentosEGuaACada6: "Verifique la validez de los alimentos y el agua cada 6 meses.",
        kitPrimeirosSocorros: "Kit de Primeros Auxilios",
        essencialParaOAtendimentoImediatoDeLesEs: "Esencial para la atenci\xF3n inmediata de lesiones antes de la llegada de ayuda profesional.",
        conteDoRecomendado: "Contenido Recomendado",
        mantenhaEsteKitEmLocalFrescoSecoEForaDoA: "Mantenga este kit en un lugar fresco, seco y fuera del alcance de los ni\xF1os, pero de f\xE1cil acceso para adultos.",
        seuPortaRemDios: "Su Botiqu\xEDn",
        umaFarmCiaDomSticaOrganizadaGaranteAcess: "Una farmacia dom\xE9stica organizada garantiza el acceso r\xE1pido a los medicamentos.",
        listaDeItensEssenciais: "Lista de Art\xEDculos Esenciales",
        mantenhaRemDiosLongeDoAlcanceDeCrianAsEV: "Mantenga los medicamentos fuera del alcance de los ni\xF1os y verifique las fechas de vencimiento.",
        terOsKitsCertosEProntosEMOTransformaOCao: "Tener los kits correctos y listos a mano transforma el caos en control.",
        mantenhaSeusKitsSempreAtualizadosEVerifi: "Mantenga sus kits siempre actualizados y verifique la validez de los art\xEDculos cada 6 meses.",
        NdiceAtual: "\xCDndice actual",
        riscoTemporRioDetectadoSigaAsRecomendaEs: "Riesgo temporal detectado \u2014 siga las recomendaciones",
        recomendaEsPrincipais: "Recomendaciones principales",
        RecolhaFerramentasAoFinalDoDia: "\u2022 Recoja las herramientas al final del d\xEDa.",
        EviteImprovisarConexEsElTricas: "\u2022 Evite improvisar conexiones el\xE9ctricas.",
        MantenhaReasDeCirculaOLivres: "\u2022 Mantenga las \xE1reas de circulaci\xF3n despejadas.",
        MantenhaASupervisOConstante: "\u2022 Mantenga la supervisi\xF3n constante.",
        VerifiqueTrancasEPortEsRegularmente: "\u2022 Verifique cerraduras y portones regularmente.",
        AtenORedobradaComPiscinaECozinha: "\u2022 Mayor precauci\xF3n con piscina y cocina.",
        SigaOChecklistDeSeguranA: "\u2022 Siga el checklist de seguridad.",
        revisarChecklist: "Revisar checklist",
        encerrarSituaO: "Cerrar situaci\xF3n",
        preparaOSalvaVidas: "La preparaci\xF3n salva vidas",
        "3min": "3min",
        tempoParaEvacuar: "Tiempo para evacuar",
        treinarPorAno: "Entrenar por a\xF1o",
        monteSeuPlano: "Construya su Plan:",
        prevenO3DAplicada: "Prevenci\xF3n 3D Aplicada",
        emCasoDeIncNdio: "En Caso de Incendio",
        lembreSe: "Recuerde",
        aVidaVemPrimeiroObjetosPodemSerSubstituD: "\xA1La vida primero! Los objetos pueden reemplazarse. NUNCA vuelva a una casa en llamas.",
        respostaRPidaEmEmergNcias: "Respuesta r\xE1pida en emergencias",
        cOMOAGIR: "C\xD3MO ACTUAR",
        aTENOVETERINRIA: "ATENCI\xD3N VETERINARIA",
        oQUEFAZER: "QU\xC9 HACER",
        oQUENOFAZER: "QU\xC9 NO HACER",
        qUANDOCHAMARAJUDA: "CU\xC1NDO LLAMAR AYUDA",
        fichaMDica: "Ficha M\xE9dica",
        enviarPorWhatsApp: "Enviar por WhatsApp",
        copiarFicha: "Copiar Ficha",
        meusContatos: "Mis Contactos",
        redeDeApoioPerfil: "Red de Apoyo Perfil",
        aRedeDeApoioPrioritRiaEstVaziaCadastreCo: "La red de apoyo prioritaria est\xE1 vac\xEDa. Registre contactos t\xE1cticos esenciales.",
        AdicionarNovo: "+ Agregar Nuevo",
        novoContato: "Nuevo Contacto",
        caracterSticas: "Caracter\xEDsticas:",
        Dicas: "\u{1F4A1} Consejos:",
        OndeEncontrar: "\u{1F6D2} D\xF3nde encontrar:",
        ePIsDomSticos: "EPPs Dom\xE9sticos",
        proteOParaAtividadesDoDiaADia: "Protecci\xF3n para actividades cotidianas",
        categoriasDeProteO: "Categor\xEDas de Protecci\xF3n",
        quandoUsar: "\xBFCu\xE1ndo Usar?",
        vejaQuaisEPIsSORecomendadosParaCadaAtivi: "Vea qu\xE9 EPPs son recomendados para cada actividad",
        mantenhaSeusEPIsOrganizadosEEmBomEstadoS: "Mantenga sus EPPs organizados y en buen estado. Reemplace art\xEDculos da\xF1ados inmediatamente.",
        nenhumConteDoDisponVelNoMomento: "Ning\xFAn contenido disponible en este momento.",
        tPicoDeSeguranA: "Tema de Seguridad",
        eSPECIALIDADE: "ESPECIALIDADE",
        pARAQUEM: "PARA QUEM?",
        dATAEHORRIO: "DATA E HOR\xC1RIO",
        lOCALOPCIONAL: "LOCAL (OPCIONAL)",
        oBSERVAESOPCIONAL: "OBSERVA\xC7\xD5ES (OPCIONAL)",
        aNOTAESPSCONSULTA: "ANOTA\xC7\xD5ES P\xD3S-CONSULTA",
        rECOMENDAES: "RECOMENDA\xC7\xD5ES",
        rECEITAS: "RECEITAS",
        eNCAMINHAMENTOSGUIAS: "ENCAMINHAMENTOS/GUIAS",
        pRXIMORETORNO: "PR\xD3XIMO RETORNO",
        escolhaOTipoDeEventoQueDesejaAdicionar: "Escolha o tipo de evento que deseja adicionar:",
        nOMEDOEXAME: "NOME DO EXAME",
        lOCAL: "LOCAL",
        aNOTAESPSEXAME: "ANOTA\xC7\xD5ES P\xD3S-EXAME",
        rESULTADO: "RESULTADO",
        rECEITURIO: "RECEITU\xC1RIO",
        rETORNO: "RETORNO",
        cONDUTASINSTRUES: "CONDUTAS/INSTRU\xC7\xD5ES",
        cATEGORIA: "CATEGORIA",
        dESCRIO: "DESCRI\xC7\xC3O",
        exAlergiaAPenicilinaCirurgiaDeApendicite: "Ex: Alergia a penicilina, Cirurgia de apendicite em 2020, etc.",
        sugestEsRPidas: "Sugest\xF5es R\xE1pidas:",
        dATA: "DATA",
        permitirCompartilhamento: "Permitir compartilhamento",
        esteRegistroPoderSerIncluDoNaFichaMDicaC: "Este registro poder\xE1 ser inclu\xEDdo na ficha m\xE9dica compartilh\xE1vel",
        tIPODEPROCEDIMENTO: "TIPO DE PROCEDIMENTO",
        nOMEDOPROCEDIMENTO: "NOME DO PROCEDIMENTO",
        aNOTAESPSPROCEDIMENTO: "ANOTA\xC7\xD5ES P\xD3S-PROCEDIMENTO",
        tIPODETRATAMENTO: "TIPO DE TRATAMENTO",
        nOMEDOTRATAMENTO: "NOME DO TRATAMENTO",
        fREQUNCIA: "FREQU\xCANCIA",
        dATADEINCIO: "DATA DE IN\xCDCIO",
        toqueParaConferir: "Toque para conferir",
        remDios: "Rem\xE9dios",
        veterinRios: "Veterin\xE1rios",
        dossiPet: "Dossi\xEA Pet",
        adicioneMedicaEsEVacinasDoSeuPetAqui: "Adicione medica\xE7\xF5es e vacinas do seu pet aqui.",
        tosaVacinasOuConsultasVeterinRiasAparece: "Tosa, vacinas ou consultas veterin\xE1rias aparecer\xE3o aqui.",
        cadastreUmPerfilDePetNoGerenciadorParaUs: "Cadastre um perfil de Pet no Gerenciador para usar este m\xF3dulo.",
        sobreOCompartilhamento: "Sobre o compartilhamento",
        selecioneQuaisInformaEsDesejaIncluirNaFi: "Selecione quais informa\xE7\xF5es deseja incluir na ficha m\xE9dica. Voc\xEA pode compartilhar via WhatsApp, email ou copiar o texto.",
        oQUEINCLUIR: "O QUE INCLUIR",
        medicamentosAtuais: "Medicamentos Atuais",
        tratamentosEmAndamento: "Tratamentos em Andamento",
        agendaMDica: "Agenda M\xE9dica",
        histRicoMDico: "Hist\xF3rico M\xE9dico",
        apenasRegistrosMarcadosComoCompartilhVei: "Apenas registros marcados como compartilh\xE1veis",
        pRVIA: "PR\xC9VIA",
        copiar: "Copiar",
        compartilharAgora: "Compartilhar Agora",
        histRicoDeAuditorias: "Hist\xF3rico de Auditorias",
        nenhumaAuditoriaRegistradaRealizeAPrimei: "Nenhuma auditoria registrada. Realize a primeira vistoria para criar o hist\xF3rico de seguran\xE7a desta resid\xEAncia.",
        lD50DoseLetalOral: "LD50 (dose letal oral)",
        carcinogenicidade: "Carcinogenicidade",
        genotoxicidade: "Genotoxicidade",
        toxicidadeReprodutiva: "Toxicidade Reprodutiva",
        fonteEPAComputationalToxicology: "Fonte: EPA Computational Toxicology",
        seguranAEmProdutosParaSuaFamLia: "Seguran\xE7a em produtos para sua fam\xEDlia",
        escanearCDigoDeBarras: "Escanear C\xF3digo de Barras",
        aponteACMeraParaIdentificarOProduto: "Aponte a c\xE2mera para identificar o produto",
        seuPerfilFamiliar: "Seu perfil familiar",
        alertasPersonalizadosSerOExibidosNosResu: "Alertas personalizados ser\xE3o exibidos nos resultados.",
        cONSULTASRECENTES: "CONSULTAS RECENTES",
        cIATOXEmergNciaToxicolGica: "CIATOX \u2014 Emerg\xEAncia Toxicol\xF3gica",
        "08007226001Gratuito24h": "0800 722 6001 (Gratuito, 24h)",
        metodologia3D: "Metodologia 3D",
        conceitosFundamentais: "Conceitos Fundamentais",
        gUIADEUSO: "GUIA DE USO",
        paraQueServe: "Para que serve:",
        importNcia: "Import\xE2ncia:",
        seNOTomar: "Se n\xE3o tomar:",
        verReceitaDigital: "Ver Receita Digital",
        editar: "Editar",
        remover: "Remover",
        nenhumMedicamentoComHorRioDefinidoConfig: "Nenhum medicamento com hor\xE1rio definido. Configure agendamentos para garantir ades\xE3o ao tratamento.",
        adicionarRemDio: "Adicionar Rem\xE9dio",
        fotografarCaixaRemDio: "Fotografar Caixa/Rem\xE9dio",
        SeguranAVisual: "(Seguran\xE7a Visual)",
        analisandoRemDio: "Analisando rem\xE9dio...",
        anexarReceitaOpcional: "Anexar Receita (Opcional)",
        FotoDoDocumento: "(Foto do Documento)",
        nomeDoMedicamento: "Nome do Medicamento",
        dosagem: "Dosagem",
        quemVaiTomar: "Quem vai tomar?",
        frequNciaHoras: "Frequ\xEAncia (horas)",
        dataEHoraDoInCio: "Data e Hora do In\xEDcio",
        paraQueServeIndicaO: "Para que serve? (Indica\xE7\xE3o)",
        porQueImportanteOpcional: "Por que \xE9 importante? (Opcional)",
        oQueAconteceSeNOTomarOpcional: "O que acontece se n\xE3o tomar? (Opcional)",
        estoqueInicialOpcional: "Estoque Inicial (Opcional)",
        dicaParaGotasTenteEstimarQuantasDosesOuM: "Dica: Para gotas, tente estimar quantas doses ou ml restam.",
        agendarTratamento: "Agendar Tratamento",
        caixasEBulas: "Caixas e Bulas",
        pLulasEFrascos: "P\xEDlulas e Frascos",
        entendi: "Entendi",
        vigilaroCareV600NeoBuild2026: "Vigilaro Care v6.0.0 (Neo Build 2026)",
        mobilidade: "Mobilidade",
        trNsitoESeguranA: "Tr\xE2nsito e Seguran\xE7a.",
        OQueDRV: "\u{1F697} O que \xE9 DRV?",
        oBRIGATRIOPORLEI: "OBRIGAT\xD3RIO POR LEI",
        QualDispositivoMeuFilhoPrecisa: "\u{1F4CA} Qual dispositivo meu filho precisa?",
        selecioneAIdadeParaVerODispositivoRecome: "Selecione a idade para ver o dispositivo recomendado:",
        PosiONoVeCulo: "\u{1F4CD} Posi\xE7\xE3o no Ve\xEDculo",
        ComoInstalar: "\u{1F527} Como Instalar",
        ComoUsar: "\u{1F476} Como Usar",
        ErrosComunsEVITE: "\u274C Erros Comuns (EVITE!)",
        LegislaO: "\u2696\uFE0F Legisla\xE7\xE3o",
        OQueMobilidadeAtiva: "\u{1F6B4} O que \xE9 Mobilidade Ativa?",
        benefCios: "Benef\xEDcios:",
        idadeDeAutonomia: "Idade de Autonomia",
        porQu: "Por qu\xEA?",
        EquipamentosNecessRios: "\u{1F6E1}\uFE0F Equipamentos Necess\xE1rios",
        LocaisApropriados: "\u2705 Locais Apropriados",
        LocaisAEvitar: "\u274C Locais a Evitar",
        RegrasDeSeguranA: "\u26A0\uFE0F Regras de Seguran\xE7a",
        ManutenO: "\u{1F527} Manuten\xE7\xE3o",
        autonomiaDeMobilidade: "Autonomia de Mobilidade",
        RegrasGeraisDeSeguranA: "\u{1F4CB} Regras Gerais de Seguran\xE7a",
        EntendendoASinalizaO: "\u{1F6A6} Entendendo a Sinaliza\xE7\xE3o",
        FatoresDeRisco: "\u26A0\uFE0F Fatores de Risco",
        eviteViasCom: "Evite vias com:",
        SeguranANoite: "\u{1F319} Seguran\xE7a \xE0 Noite",
        CuidadosComCrianAs: "\u{1F476} Cuidados com Crian\xE7as",
        idadeMNima: "Idade M\xEDnima",
        RegrasParaPassageiro: "\u{1F464} Regras para Passageiro",
        RegrasParaPiloto: "\u{1F3CD}\uFE0F Regras para Piloto",
        RiscosEspecFicosDasMotos: "\u26A0\uFE0F Riscos Espec\xEDficos das Motos",
        EmCasoDeAcidente: "\u{1F6A8} Em caso de acidente",
        bombeiros193: "Bombeiros: 193",
        pRF191: "PRF: 191",
        MicromobilidadeElTrica: "\u26A1 Micromobilidade El\xE9trica",
        categoriasNoCTB: "Categorias no CTB",
        ondeAndar: "Onde andar:",
        eNasCalAdas: "E nas cal\xE7adas?",
        RiscosDeAcidentes: "\u26A0\uFE0F Riscos de Acidentes",
        monitoramentoPreventivoProtocolosParaOSe: "Monitoreo Preventivo: Protocolos para tu hogar",
        iniciarVerificaO: "Iniciar Verifica\xE7\xE3o",
        finalizarProtocolo: "Finalizar Protocolo",
        dISTRIBUIODECONFORMIDADE: "DISTRIBUI\xC7\xC3O DE CONFORMIDADE",
        nenhumaPendNciaIdentificadaOAmbienteEstS: "Nenhuma pend\xEAncia identificada. O ambiente est\xE1 seguro.",
        fechar: "Fechar",
        toxina: "Toxina:",
        sintomas: "Sintomas:",
        "1CompromissoComSuaPrivacidade": "1. Compromisso com sua Privacidade",
        oVigilaroCareRespeitaProfundamenteSuaPri: "O Vigilaro Care respeita profundamente sua privacidade. Este documento explica como tratamos seus dados pessoais, em conformidade com a Lei Geral de Prote\xE7\xE3o de Dados (LGPD - Lei n\xBA 13.709/2018).",
        "2ArmazenamentoLocalOffline": "2. Armazenamento Local (Offline)",
        seusDadosFicamComVoc: "Seus dados ficam com voc\xEA:",
        eXCLUSIVAMENTENAMEMRIADOSEUDISPOSITIVO: "EXCLUSIVAMENTE NA MEM\xD3RIA DO SEU DISPOSITIVO",
        nSNOTemosCPiaDeles: "n\xF3s n\xE3o temos c\xF3pia deles",
        "3ColetaDeDados": "3. Coleta de Dados",
        "4PermissEsDoDispositivo": "4. Permiss\xF5es do Dispositivo",
        cMera: "C\xE2mera:",
        galeria: "Galeria:",
        notificaEs: "Notifica\xE7\xF5es:",
        microfone: "Microfone:",
        "5ExclusODeDados": "5. Exclus\xE3o de Dados",
        comoOsDadosEstONoSeuAparelhoVocTemTotalC: 'Como os dados est\xE3o no seu aparelho, voc\xEA tem total controle. Para excluir tudo permanentemente, basta usar a op\xE7\xE3o "Resetar Aplicativo" no Menu ou desinstalar o app.',
        Voltar: "\u2190 Voltar",
        cDigoDeBarras: "C\xF3digo de Barras:",
        Componentes: "\u{1F9EA} Componentes",
        RiscosEPerigos: "\u26A0\uFE0F Riscos e Perigos",
        SeINGERIU: "\u{1F4A7} Se INGERIU:",
        ContatoComOLHOS: "\u{1F441}\uFE0F Contato com OLHOS:",
        ContatoComPELE: "\u270B Contato com PELE:",
        INALAO: "\u{1F4A8} INALA\xC7\xC3O:",
        ComoPrevenirAcidentes: "\u{1F6E1}\uFE0F Como Prevenir Acidentes",
        iMPORTANTE: "IMPORTANTE",
        emCasoDeAcidenteLigueIMEDIATAMENTEParaOC: "Em caso de acidente, ligue IMEDIATAMENTE para o CIATOX.\n            Tenha em m\xE3os a embalagem do produto para informar os componentes.",
        lIGARPARACIATOX: "LIGAR PARA CIATOX",
        vNCULOCOMARESIDNCIA: "V\xCDNCULO CON LA RESIDENCIA",
        tIPOSANGUNEO: "TIPO SANGU\xCDNEO",
        rAAMESTIO: "RAZA / MESTIZO",
        cONDIESHISTRICO: "CONDICIONES & HISTORIAL",
        redeDeApoioSOS: "Rede de Apoio (SOS)",
        quemVamosProteger: "Quem vamos proteger?",
        baseadoNaMetodologiaPrevenO3DDigaQuantas: "Baseado na Metodologia Preven\xE7\xE3o 3D, diga quantas pessoas vivem na casa. Criaremos perfis para voc\xEA detalhar a seguir.",
        hUMANOS: "HUMANOS",
        aNIMAIS: "ANIMAIS",
        definirPerfis: "Definir Perfis",
        moradoresEPets: "Moradores e Pets",
        nenhumMoradorVinculado: "Nenhum morador vinculado.",
        ambientesMapeados: "Ambientes Mapeados",
        nenhumAmbienteMapeado: "Nenhum ambiente mapeado.",
        dNADeSeguranARiscosInerentes: "DNA de Seguran\xE7a (Riscos Inerentes)",
        atualizarMapeamentoEstrutural: "Atualizar Mapeamento Estrutural",
        resumoEstratGicoPorResidNcia: "Resumo estrat\xE9gico por resid\xEAncia",
        nenhumaResidNciaEncontrada: "Nenhuma resid\xEAncia encontrada.",
        carregandoPerfilPadronizado: "Carregando perfil padronizado...",
        ImplicaOSeNOResolvido: "\u26A0 Implica\xE7\xE3o se n\xE3o resolvido",
        vouResolver: "Vou resolver",
        reconheOORisco: "Reconhe\xE7o o risco",
        gerandoSeuRelatRioPersonalizado: "Gerando Seu Relat\xF3rio Personalizado...",
        cruzandoDadosDePerfilSaDeMoradiaEVistori: "Cruzando dados de perfil, sa\xFAde, moradia e vistoria.",
        riscoS: "risco(s)",
        oMorador: "O Morador",
        oAmbiente: "O Ambiente",
        planoDeAO: "Plano de A\xE7\xE3o",
        irregularidadesAtivas: "Irregularidades Ativas",
        requeremSuaAtenO: "Requerem sua aten\xE7\xE3o",
        reconhecidosPeloResponsVel: "Reconhecidos pelo Respons\xE1vel",
        registradoComDataENome: "Registrado com data e nome",
        nOVerificados: "N\xE3o Verificados",
        completeAVistoriaParaDiagnSticoPreciso: "Complete a vistoria para diagn\xF3stico preciso",
        outrosMoradores: "Outros moradores",
        pet: "Pet",
        carregandoAtividades: "Carregando atividades...",
        comeceAUsarOVigilaroParaVerSeuHistRicoAq: "Comece a usar o Vigilaro para ver seu hist\xF3rico aqui.",
        tipoDeReforma: "Tipo de Reforma",
        ondeAObraEstAcontecendo: "Onde a obra est\xE1 acontecendo?",
        nVELDESEGURANA: "N\xCDVEL DE SEGURAN\xC7A",
        tOTAL: "TOTAL",
        cRTICOS: "CR\xCDTICOS",
        nenhumaInstituiOAtingirPontuaOMXimaEmTod: "Nenhuma institui\xE7\xE3o atingir\xE1 pontua\xE7\xE3o m\xE1xima em todos os itens. Priorize as interven\xE7\xF5es nos quesitos classificados como cr\xEDticos.\n                        e questione como a escola pretende melhorar os pontos fracos identificados.",
        compartilharRelatRio: "Compartilhar Relat\xF3rio",
        continuarAvaliaO: "Continuar Avalia\xE7\xE3o",
        escolaSegura: "Escola Segura",
        checklistDeAvaliaO: "Checklist de Avalia\xE7\xE3o",
        pROGRESSOGERAL: "PROGRESSO GERAL",
        iTENSCRTICOS: "ITENS CR\xCDTICOS",
        voltarParaCategorias: "Voltar para Categorias",
        ITEMCRTICO: "\u26A0\uFE0F ITEM CR\xCDTICO",
        sTATUSDESEGURANA: "STATUS DE SEGURAN\xC7A",
        gERAL: "GERAL",
        esteRelatRioSubsidiRioENOSubstituiAVisto: "Este relat\xF3rio \xE9 subsidi\xE1rio e n\xE3o substitui a vistoria oficial do Corpo de Bombeiros ou Vigil\xE2ncia Sanit\xE1ria. \n                        Qualquer falha em itens **CR\xCDTICOS** deve ser tratada como prioridade m\xE1xima pela administra\xE7\xE3o da ILPI.",
        revisarRespostas: "Revisar Respostas",
        asiloSeguro: "Asilo Seguro",
        vistoriaTCnicoSNior: "Vistoria T\xE9cnico-S\xEAnior",
        cRTICOSEMCONFORMIDADE: "CR\xCDTICOS EM CONFORMIDADE",
        checklistDeVerificaO: "Checklist de Verifica\xE7\xE3o",
        verificarSeguranA: "Verificar Seguran\xE7a",
        pAREIMEDIATAMENTE: "PARE IMEDIATAMENTE",
        voltarECorrigir: "Voltar e Corrigir",
        estouCienteAssumirRisco: "Estou ciente (Assumir Risco)",
        aTIVIDADELIBERADA: "ATIVIDADE LIBERADA",
        sigaAsMedidasRecomendadas: "Siga as medidas recomendadas:",
        finalizar: "Finalizar",
        recomendaEs: "Recomenda\xE7\xF5es",
        emCasoDeExposiO: "Em Caso de Exposi\xE7\xE3o",
        fonteOrientaEsDeSeguranAEProtocolosDeEme: "Fonte: Orienta\xE7\xF5es de seguran\xE7a e protocolos de emerg\xEAncia (CIATOX/Fabricante).",
        detalhesDoProduto: "Detalhes do Produto",
        pROTOCOLOSOCULTOS: "PROTOCOLOS OCULTOS",
        confidencialLeiaApenasSeEstiverSozinho: "Confidencial - Leia apenas se estiver sozinho",
        mODOPNICODISCRETO: "MODO P\xC2NICO DISCRETO",
        emSituaEsDeCoaOOndeVocNOPodeRevelarQueEs: "Em situa\xE7\xF5es de coa\xE7\xE3o onde voc\xEA n\xE3o pode revelar que est\xE1 pedindo ajuda:",
        sOS: "SOS",
        "3Segundos": "3 segundos",
        estaTelaNOAparecerNovamenteParaSuaSegura: "Esta tela n\xE3o aparecer\xE1 novamente para sua seguran\xE7a.",
        mEMORIZAREDESTRUIRMENSAGEM: "MEMORIZAR E DESTRUIR MENSAGEM",
        rISCOS: "RISCOS",
        pREVENO: "PREVEN\xC7\xC3O",
        eMERGNCIA: "EMERG\xCANCIA",
        dICASEXTRAS: "DICAS EXTRAS",
        viagemSegura: "Viagem Segura",
        carroHotelAviOEDocumentos: "Carro, hotel, avi\xE3o e documentos.",
        lazerDiversO: "Lazer & Divers\xE3o",
        aproveiteOsMomentosDeLazerComSeguranA: "Aproveite os momentos de lazer com seguran\xE7a.",
        monitoreRiscosTemporRios: "Monitore riscos tempor\xE1rios",
        selecioneOEvento: "Selecione o Evento",
        ajustaremosAsRecomendaEsDeSeguranAComBas: "Ajustaremos as recomenda\xE7\xF5es de seguran\xE7a com base no cen\xE1rio escolhido.",
        vigilaroCare: "Vigilaro Care",
        "1NaturezaInformativa": "1. Natureza Informativa",
        oAplicativoVigilaroCareUmaFerramentaDeAu: "O aplicativo Vigilaro Care \xE9 uma ferramenta de aux\xEDlio e preven\xE7\xE3o. Todo o conte\xFAdo, incluindo checklists, guias de primeiros socorros e an\xE1lises de IA, tem car\xE1ter EXCLUSIVAMENTE INFORMATIVO e EDUCACIONAL.",
        "2NOSubstituiProfissionais": "2. N\xE3o Substitui Profissionais",
        asInformaEsAquiContidasNOSubstituemEmHip: "As informa\xE7\xF5es aqui contidas N\xC3O substituem, em hip\xF3tese alguma, o diagn\xF3stico, aconselhamento ou tratamento por profissionais de sa\xFAde (m\xE9dicos, enfermeiros, socorristas) ou especialistas em seguran\xE7a.",
        "3EmCasoDeEmergNcia": "3. Em Caso de Emerg\xEAncia",
        "4LimitaODeResponsabilidade": "4. Limita\xE7\xE3o de Responsabilidade",
        osDesenvolvedoresDoVigilaroCareNOSeRespo: "Os desenvolvedores do Vigilaro Care n\xE3o se responsabilizam por quaisquer danos, les\xF5es ou perdas resultantes do uso das informa\xE7\xF5es fornecidas pelo aplicativo. A seguran\xE7a final do ambiente e das pessoas \xE9 de responsabilidade do usu\xE1rio.",
        "5InteligNciaArtificial": "5. Intelig\xEAncia Artificial",
        oRecursoDeScannerIAUtilizaInteligNciaArt: 'O recurso de "Scanner IA" utiliza intelig\xEAncia artificial para identificar poss\xEDveis riscos. Esta tecnologia pode falhar ou cometer erros. Sempre verifique visualmente o ambiente e use seu pr\xF3prio julgamento.',
        "6Privacidade": "6. Privacidade",
        caniveteSuODeSeguranA: "Canivete su\xED\xE7o de seguran\xE7a",
        resultadosSalvos: "Resultados salvos",
        eMBREVE: "EM BREVE",
        boaViagemSeguranAEmPrimeiroLugar: "Boa viagem! Seguran\xE7a em primeiro lugar. \u{1F9F3}",
        seguranANoSeuDestino: "Seguran\xE7a no seu destino",
        aquiVocTerUmChecklistCompletoParaInspeci: "Aqui voc\xEA ter\xE1 um checklist completo para inspecionar a seguran\xE7a do local assim que chegar \u2014 janelas, tomadas, piscinas, escadas, sa\xEDdas de emerg\xEAncia e muito mais.",
        inspeODeRetornoFimDaViagem: "Inspe\xE7\xE3o de Retorno (Fim da Viagem)",
        aHoraDeIrEmboraQuandoOCansaOBateEOsPiore: "A hora de ir embora \xE9 quando o cansa\xE7o bate e os piores esquecimentos acontecem. Fa\xE7a esta varredura pente-fino antes de entregar a chave.",
        checklistEssencial: "Checklist essencial",
        monteSeuKitEssencialDeViagemComFocoEmSaD: "Monte seu kit essencial de viagem com foco em sa\xFAde, higiene e primeiros socorros. Toque em cada categoria para expandir.",
        adapteEsteKitAoSeuDestinoENecessidadesCo: "Adapte este kit ao seu destino e necessidades. Consulte seu m\xE9dico antes de viajar.",
        ativeOModoViagemParaChecklistsDeSeguranA: "Ative o Modo Viagem para checklists de seguran\xE7a espec\xEDficos.",
        Lazer: "\u{1F334} Lazer",
        Trabalho: "\u{1F4BC} Trabalho",
        Sim: "\u{1F30D} Sim",
        Nacional: "\u{1F1E7}\u{1F1F7} Nacional",
        crianAs: "Crian\xE7as",
        idosos: "Idosos",
        pCDs: "PCDs",
        ativarModoViagem: "Ativar Modo Viagem",
        modoViagem: "Modo Viagem",
        assistenteDeViagem: "Assistente de Viagem",
        faAIssoSempreQueForViajar: "Fa\xE7a isso sempre que for viajar",
        inspeODePartida: "Inspe\xE7\xE3o de Partida",
        inspeODeChegada: "Inspe\xE7\xE3o de Chegada",
        checkoutSeguro: "Checkout Seguro",
        dicasTelefonesTeisEMais: "Dicas, telefones \xFAteis e mais.",
        fiqueAtento: "Fique Atento!",
        encerrarModoViagem: "Encerrar Modo Viagem",
        toqueParaAtivarHUD: "Toque para ativar HUD",
        sCANNINGAREA: "SCANNING AREA...",
        lUZ: "LUZ",
        sIRENE: "SIRENE",
        oCULTAR: "OCULTAR",
        painelSentinelaIA: "Painel Sentinela (IA)",
        controleRemotoDeLanternaParaIluminarReas: "Controle remoto de Lanterna para iluminar \xE1reas escuras.",
        sireneDePNicoComEfeitoEstroboscPicoParaE: "Sirene de P\xE2nico com efeito estrobosc\xF3pico para emerg\xEAncias.",
        modoFurtivoTelaApagadaParaMonitoramentoD: "Modo Furtivo (Tela Apagada) para monitoramento discreto.",
        iNICIARVIGILNCIA: "INICIAR VIGIL\xC2NCIA",
        fatoresDeRisco: "Fatores de Risco",
        selecioneQuemEstarPresenteNestaVisita: "Selecione quem estar\xE1 presente nesta visita:",
        gerarChecklist: "Gerar Checklist",
        tipoDeVisita: "Tipo de Visita",
        vocEstRecebendoAlguMOuIndoVisitar: "Voc\xEA est\xE1 recebendo algu\xE9m ou indo visitar?",
        recebendoVisita: "Recebendo Visita",
        prepararMinhaCasaParaConvidados: "Preparar minha casa para convidados",
        indoVisitar: "Indo Visitar",
        cuidadosAoIrNaCasaDeOutros: "Cuidados ao ir na casa de outros"
      },
      microBlog: {
        title: "Micro Blog",
        subtitle: "Prevenir en Casa",
        all: "Todos",
        minRead: "min de lectura"
      },
      ferramentasIA: {
        sectionAnaliseVisual: "An\xE1lisis Visual",
        sectionAssistentes: "Asistentes",
        sectionEmBreve: "Pr\xF3ximamente",
        scannerAmbienteTitle: "Esc\xE1ner de Ambiente",
        scannerAmbienteSubtitle: "An\xE1lisis Visual IA",
        scannerAmbienteDesc: "Apunta la c\xE1mara para analizar riesgos de ca\xEDda, objetos peligrosos y condiciones del ambiente.",
        voiceTitle: "Vigilaro Voice",
        voiceSubtitle: "Asistente de Audio",
        voiceDesc: "Habla con el asistente de IA de seguridad para resolver dudas de forma inmediata.",
        chatTitle: "Vigilaro Chat",
        chatSubtitle: "Dudas y Orientaciones",
        chatDesc: "Asistente de texto r\xE1pido para consejos de seguridad y protocolos.",
        detectorTitle: "Detector de Ambiente",
        detectorDesc: "Analiza ruidos (ej: llanto, vidrio rompi\xE9ndose) y el nivel de seguridad luminosa del cuarto.",
        heatmapTitle: "Mapa de Calor IA",
        heatmapDesc: "Mapeo topogr\xE1fico 3D de los puntos ciegos y \xE1reas de riesgo de tu hogar."
      }
    };
  }
});

// i18n.js
var import_i18next, import_react_i18next, Localization, resources, getDeviceLanguage, i18n_default;
var init_i18n = __esm({
  "i18n.js"() {
    import_i18next = __toESM(require("i18next"));
    import_react_i18next = require("react-i18next");
    Localization = __toESM(require("expo-localization"));
    init_common();
    init_common2();
    init_common3();
    init_common4();
    resources = {
      "pt-BR": { common: common_default },
      "pt-PT": { common: common_default2 },
      "en": { common: common_default3 },
      "es": { common: common_default4 }
    };
    getDeviceLanguage = () => {
      const locale = Localization.getLocales()[0]?.languageTag || "pt-BR";
      if (resources[locale]) {
        return locale;
      }
      if (locale.startsWith("pt")) {
        return locale === "pt-PT" ? "pt-PT" : "pt-BR";
      }
      if (locale.startsWith("es")) {
        return "es";
      }
      if (locale.startsWith("en")) {
        return "en";
      }
      return "pt-BR";
    };
    import_i18next.default.use(import_react_i18next.initReactI18next).init({
      resources,
      lng: getDeviceLanguage(),
      // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
      fallbackLng: "pt-BR",
      defaultNS: "common",
      interpolation: {
        escapeValue: false
        // react already safes from xss
      }
    });
    i18n_default = import_i18next.default;
  }
});

// services/OpenAIService.js
var OpenAIService_exports = {};
__export(OpenAIService_exports, {
  default: () => OpenAIService_default
});
var import_async_storage9, FileSystem2, PROXY_URL, APP_SECRET, CHAT_URL, TRANSCRIPTIONS_URL, SPEECH_URL, AVAILABLE_VOICES, VOICE_STORAGE_KEY, OpenAIService, OpenAIService_default;
var init_OpenAIService = __esm({
  "services/OpenAIService.js"() {
    import_async_storage9 = __toESM(require("@react-native-async-storage/async-storage"));
    FileSystem2 = __toESM(require("expo-file-system/legacy"));
    init_Config();
    init_i18n();
    PROXY_URL = Config.VIGILARO_PROXY_URL;
    APP_SECRET = Config.VIGILARO_APP_SECRET;
    CHAT_URL = `${PROXY_URL}/v1/chat/completions`;
    TRANSCRIPTIONS_URL = `${PROXY_URL}/v1/audio/transcriptions`;
    SPEECH_URL = `${PROXY_URL}/v1/audio/speech`;
    AVAILABLE_VOICES = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
    VOICE_STORAGE_KEY = "@vigilaro_voice_preference";
    OpenAIService = class {
      constructor() {
        this.context = null;
        this.selectedVoice = "nova";
      }
      // Obter voz selecionada do storage
      async getSelectedVoice() {
        try {
          const voice = await import_async_storage9.default.getItem(VOICE_STORAGE_KEY);
          if (voice && AVAILABLE_VOICES.includes(voice)) {
            this.selectedVoice = voice;
          }
          return this.selectedVoice;
        } catch (e) {
          return "nova";
        }
      }
      // Salvar preferência de voz
      async setVoice(voice) {
        if (AVAILABLE_VOICES.includes(voice)) {
          this.selectedVoice = voice;
          await import_async_storage9.default.setItem(VOICE_STORAGE_KEY, voice);
          return true;
        }
        return false;
      }
      // Lista de vozes disponíveis
      getAvailableVoices() {
        return AVAILABLE_VOICES.map((v) => ({
          id: v,
          name: v.charAt(0).toUpperCase() + v.slice(1),
          description: v === "nova" ? "Feminina (padr\xE3o)" : v === "shimmer" ? "Feminina suave" : v === "echo" ? "Masculina" : v === "onyx" ? "Masculina grave" : v === "fable" ? "Narrativa" : v === "alloy" ? "Neutra" : ""
        }));
      }
      async loadContext() {
        try {
          const vigilaroDataRaw = await import_async_storage9.default.getItem("@vigilaro_data");
          const vigilaroData = vigilaroDataRaw ? JSON.parse(vigilaroDataRaw) : {};
          const profiles = vigilaroData.perfis || [];
          const homeMapping = vigilaroData.moradia || (await import_async_storage9.default.getItem("@home_mapping") ? JSON.parse(await import_async_storage9.default.getItem("@home_mapping")) : null);
          const medicationsRaw = await import_async_storage9.default.getItem("@medications");
          const medications = medicationsRaw ? JSON.parse(medicationsRaw) : [];
          const emergencyContactsRaw = await import_async_storage9.default.getItem("@emergency_contacts");
          const emergencyContacts = emergencyContactsRaw ? JSON.parse(emergencyContactsRaw) : [];
          const checklistReforma = await import_async_storage9.default.getItem("@checklist_reforma_casa");
          const checklistSeguranca = await import_async_storage9.default.getItem("@checklist_completo");
          let contextStr = "DADOS DO USU\xC1RIO:\n\n";
          if (profiles.length > 0) {
            contextStr += "FAM\xCDLIA:\n";
            const processedNames = /* @__PURE__ */ new Set();
            profiles.forEach((p) => {
              if (!p.nome || p.nome.includes("(Pendente)") || p.nome === "Novo Perfil") return;
              if (processedNames.has(p.nome)) return;
              processedNames.add(p.nome);
              const tipo = p.tipo || "pessoa";
              let idadeStr = "idade n\xE3o informada";
              if (p.dataNascimento) {
                const birthDate = new Date(p.dataNascimento);
                if (!isNaN(birthDate)) {
                  const today = /* @__PURE__ */ new Date();
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const m = today.getMonth() - birthDate.getMonth();
                  if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
                    age--;
                  }
                  idadeStr = `${age} anos`;
                } else {
                  idadeStr = p.faixaEtaria || p.raca || "";
                }
              } else if (p.faixaEtaria) {
                idadeStr = p.faixaEtaria;
              }
              const condicoes = p.condicoesEspeciais ? ` (${p.condicoesEspeciais})` : "";
              contextStr += `- ${p.nome}: ${tipo}, ${idadeStr}${condicoes}
`;
            });
          } else {
            contextStr += "FAM\xCDLIA: Nenhum perfil cadastrado.\n";
          }
          if (homeMapping) {
            contextStr += `
RESID\xCANCIA:
`;
            contextStr += `- Tipo: ${homeMapping.tipoImovel || homeMapping.tipo || "n\xE3o informado (pergunte ao usu\xE1rio)"}
`;
            if (homeMapping.temPiscina || homeMapping.caracteristicas && homeMapping.caracteristicas.includes("piscina")) contextStr += "- TEM PISCINA\n";
            if (homeMapping.temEscada || homeMapping.caracteristicas && homeMapping.caracteristicas.includes("escadas")) contextStr += "- TEM ESCADAS\n";
            if (homeMapping.temChurrasqueira || homeMapping.caracteristicas && homeMapping.caracteristicas.includes("lareira")) contextStr += "- TEM FOGO/LAREIRA\n";
            if (homeMapping.temJardim || homeMapping.caracteristicas && homeMapping.caracteristicas.includes("quintal")) contextStr += "- TEM \xC1REA EXTERNA\n";
          }
          if (medications.length > 0) {
            contextStr += `
MEDICAMENTOS CADASTRADOS: ${medications.length}
`;
            medications.slice(0, 3).forEach((m) => {
              contextStr += `- ${m.nome} (${m.horario || "hor\xE1rio n\xE3o definido"})
`;
            });
          }
          if (emergencyContacts.length > 0) {
            contextStr += `
CONTATOS DE EMERG\xCANCIA: ${emergencyContacts.length} cadastrados
`;
          }
          let progressInfo = [];
          if (checklistReforma) {
            const data = JSON.parse(checklistReforma);
            const completed = Object.values(data).filter(Boolean).length;
            progressInfo.push(`Reforma: ${completed} itens`);
          }
          if (checklistSeguranca) {
            const data = JSON.parse(checklistSeguranca);
            const total = Object.keys(data).length;
            const completed = Object.values(data).filter((v) => v === true).length;
            progressInfo.push(`Seguran\xE7a: ${completed}/${total}`);
          }
          if (progressInfo.length > 0) {
            contextStr += `
CHECKLISTS: ${progressInfo.join(", ")}
`;
          }
          this.context = contextStr;
          if (__DEV__) {
            console.log("Contexto IA carregado:", contextStr);
          }
          return contextStr;
        } catch (e) {
          if (__DEV__) {
            console.error("Erro ao carregar contexto IA:", e);
          }
          return "Contexto n\xE3o dispon\xEDvel.";
        }
      }
      async sendMessage(userMessage, history = []) {
        if (!this.context) {
          await this.loadContext();
        }
        const systemPrompt = `
Voc\xEA \xE9 o VIGILARO, um Especialista em preven\xE7\xE3o de acidentes dom\xE9sticos e sa\xFAde no lar.
Objetivo: Proteger a fam\xEDlia e educar sobre riscos de forma CONVERSACIONAL e T\xC1TICA via \xC1UDIO.

REGRAS CR\xCDTICAS PARA VOZ:
1. Respostas CURTAS (m\xE1ximo 2 frases). N\xE3o fa\xE7a palestras. V\xE1 direto ao ponto.
2. NUNCA use Markdown (*, #, -). O rob\xF4 leitor l\xEA isso e fica horr\xEDvel.
3. NUNCA use Emojis.
4. Fale como um mestre de seguran\xE7a instruindo uma fam\xEDlia: firme, claro e focado nas melhores pr\xE1ticas, mas compreensivo com a rotina. Sem bajula\xE7\xF5es e sem condescend\xEAncia.
5. Se o usu\xE1rio disser "Obrigado", "Tchau" ou "Valeu", responda apenas: "Fico \xE0 disposi\xE7\xE3o. Conte comigo." (Isso sinalizar\xE1 o fim da conversa).

SUA PERSONALIDADE:
- NOME: Vigilaro
- TOM: Autoridade t\xE9cnica, objetivo e emp\xE1tico.
- ESTILO: Foco em resolu\xE7\xE3o e preven\xE7\xE3o. Fa\xE7a apenas verifica\xE7\xF5es t\xE1ticas.

IDIOMA:
- O usu\xE1rio utiliza o aplicativo no idioma "${i18n_default.language}". RESPONDA ESTRITAMENTE NESTE IDIOMA.

CONTEXTO ATUAL DA FAM\xCDLIA:
${this.context}`;
        const messages = [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: userMessage }
        ];
        try {
          const response = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-vigilaro-token": APP_SECRET
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages,
              temperature: 0.7,
              max_tokens: 500
            })
          });
          const data = await response.json();
          if (data.error) {
            if (__DEV__) {
              console.error("OpenAI Error:", data.error);
            }
            return "Desculpe, minha conex\xE3o com o c\xE9rebro central falhou. Verifique sua chave de API.";
          }
          return data.choices[0].message.content;
        } catch (error) {
          if (__DEV__) {
            console.error("Network Error:", error);
          }
          return "Estou tendo problemas para conectar \xE0 internet. Mas lembre-se: em caso de emerg\xEAncia, ligue 192 ou 193.";
        }
      }
      /**
       * Gera o Relatório Personalizado inteligente usando a metodologia "Quem, Onde, O Que, Como"
       * @param {Object} reportData - Dados cruzados (perfil, moradia, saude, riscos)
       */
      async generateConsultativeReport(reportData) {
        const { profile, typeLabel: typeLabel2, age, moradia, health, riskItems, pendingItems } = reportData;
        const isPet = typeLabel2?.toLowerCase() === "pet" || profile?.tipo?.toLowerCase() === "pet";
        let contextStr = `
DADOS DO ${isPet ? "ANIMAL (PET)" : "MORADOR"}:
`;
        contextStr += `- Nome: ${profile?.nome || "N\xE3o informado"}
`;
        contextStr += `- Perfil: ${typeLabel2} (${age ? age + " anos" : "Idade n\xE3o informada"})
`;
        if (profile?.condicoesEspeciais) {
          contextStr += `- Condi\xE7\xF5es/Aten\xE7\xF5es: ${profile.condicoesEspeciais}
`;
        }
        if (health?.hasMeds) {
          contextStr += `- Medicamentos Registrados: ${health.medNames}
`;
        }
        contextStr += `
DADOS DO AMBIENTE:
`;
        const mParts = [moradia?.tipo, moradia?.andar ? `${moradia.andar}\xBA andar` : null, moradia?.location].filter(Boolean);
        contextStr += `- Tipo: ${mParts.join(" \xB7 ") || "N\xE3o informado"}
`;
        if (moradia?.caracteristicas?.length > 0) {
          contextStr += `- Caracter\xEDsticas: ${moradia.caracteristicas.join(", ")}
`;
        }
        contextStr += `
IRREGULARIDADES ATIVAS (VISTORIA):
`;
        if (riskItems && riskItems.length > 0) {
          riskItems.forEach((r, idx) => {
            contextStr += `${idx + 1}. Ambiente: ${r.roomLabel} | Problema: ${r.titulo} | Risco: ${r.implication || "N\xE3o especificado"}
`;
          });
          contextStr += `Total de riscos ativos: ${riskItems.length}
`;
        } else {
          contextStr += `Nenhum risco ativo identificado no momento.
`;
        }
        if (pendingItems && pendingItems.length > 0) {
          contextStr += `
ITENS PENDENTES (Vistoria Incompleta): ${pendingItems.length} itens n\xE3o avaliados.
`;
        }
        let systemPrompt = `Voc\xEA \xE9 o Vigilaro, um consultor de seguran\xE7a residencial que cuida das fam\xEDlias com compet\xEAncia t\xE9cnica e genu\xEDna empatia.
`;
        systemPrompt += `Seu tom \xE9 acolhedor, mas firme quando a seguran\xE7a exige. Voc\xEA entende a rotina da casa e fala como algu\xE9m que se importa de verdade \u2014 nunca como um rob\xF4 ou um fiscal.
`;
        systemPrompt += `Nunca seja bajulador ou condescendente. N\xE3o use frases de autoajuda. Seja honesto, direto e humano.

`;
        if (isPet) {
          systemPrompt += `O usu\xE1rio est\xE1 solicitando o Relat\xF3rio Personalizado de Prote\xE7\xE3o focado em seu **Animal de Estima\xE7\xE3o (Pet)**.
`;
          systemPrompt += `Dirija-se ao usu\xE1rio como o "tutor" ou respons\xE1vel do ${profile?.nome || "pet"}, e N\xC3O como se o animal fosse ler o relat\xF3rio.
`;
        } else {
          systemPrompt += `O usu\xE1rio quer o Relat\xF3rio Personalizado de Prote\xE7\xE3o para a sua casa e para o perfil avaliado (que pode ser ele mesmo ou um familiar).
`;
        }
        systemPrompt += `
Baseie-se na metodologia "Quem, Onde, O Que, Como".
Analise o contexto fornecido e forne\xE7a o relat\xF3rio de forma objetiva no seguinte formato JSON OBRIGAT\xD3RIO:
{
  "quem": "Um relato acolhedor e direto de 1 par\xE1grafo identificando os cuidados espec\xEDficos para ${profile?.nome || "o morador"}, considerando idade, medicamentos e condi\xE7\xF5es. Comece usando o nome da pessoa de forma natural, como se estivesse conversando com ela (ex: 'Ana, com seus 72 anos...').",
  "onde": "Um relato claro de 1 par\xE1grafo sobre o que o tipo de resid\xEAncia e suas caracter\xEDsticas representam em termos de aten\xE7\xE3o. Contextualize de forma pr\xE1tica, n\xE3o alarmista.",
  "o_que": "Um resumo t\xE1tico de 1 ou 2 par\xE1grafos sobre as irregularidades encontradas na vistoria. Seja honesto sobre a gravidade, mas explique o porqu\xEA de forma compreens\xEDvel para leigos.",
  "como": "Instru\xE7\xF5es pr\xE1ticas e acess\xEDveis em 1 ou 2 par\xE1grafos. Explique como resolver os problemas de forma simples e realiz\xE1vel, priorizando o que \xE9 mais urgente. Incentive o usu\xE1rio a agir mostrando que cada pequena a\xE7\xE3o faz diferen\xE7a."
}

Regras de Tom e Estilo:
- Fale como um consultor de confian\xE7a: competente, humano e encorajador. Combine autoridade t\xE9cnica com calor humano.
- PROIBIDO usar introdu\xE7\xF5es rob\xF3ticas ou impessoais como "Como um adulto...", "Dado o perfil de idoso...", "Sendo uma crian\xE7a de X anos...". Use o nome da pessoa fluidamente e naturalmente.
- ${isPet ? "Lembre-se: O texto vai para o DONO do pet, instruindo-o objetivamente sobre a seguran\xE7a do animal com carinho." : "Fale diretamente com o usu\xE1rio que est\xE1 lendo, de forma clara, assertiva e acolhedora."}
- IMPORTANT: Se houver POUCOS ou NENHUM risco ativo, reconhe\xE7a o esfor\xE7o do usu\xE1rio de forma genu\xEDna (ex: "Seu ambiente est\xE1 bem cuidado, e isso mostra aten\xE7\xE3o com quem voc\xEA ama."), mas SEMPRE sugira pelo menos um ponto de aten\xE7\xE3o preventiva.
- Se as dicas cadastradas no contexto ('Problema: X | Risco: Y') forem vagas, use sua autoridade em seguran\xE7a para dar orienta\xE7\xF5es concretas e \xFAteis.
- Nunca use markdown ou emojis no JSON, apenas texto simples.
- Escreva de forma fluida e instrucional, sem listas de pontos (bullet points). Priorize clareza e acessibilidade na linguagem.
- IMPORTANTE: O usu\xE1rio fala "${i18n_default.language}". GERE TODO O CONTE\xDADO DO JSON ESTREITAMENTE NESTE IDIOMA.`;
        const messages = [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Aqui est\xE1 o panorama atual:
${contextStr}` }
        ];
        try {
          const response = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-vigilaro-token": APP_SECRET
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages,
              temperature: 0.7,
              response_format: { type: "json_object" }
            })
          });
          const data = await response.json();
          if (data.error) {
            if (__DEV__) {
              console.error("OpenAI Error:", data.error);
            }
            throw new Error(data.error.message);
          }
          const jsonResponse = JSON.parse(data.choices[0].message.content);
          return jsonResponse;
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao gerar Relat\xF3rio Personalizado:", error);
          }
          throw error;
        }
      }
      /**
       * Extrai dados de uma imagem da carteira de vacinação usando GPT-4o-mini (Vision)
       * @param {string} base64Image - Imagem em formato base64 JPEG ou PNG (sem cabeçalho scheme)
       * @returns {Promise<Array>} - Array de objetos: [{ title: 'Vacina', date: 'YYYY-MM-DD', description: 'Dose X' }]
       */
      async analyzeVaccineCard(base64Image) {
        let systemPrompt = `Voc\xEA \xE9 um OCR assistente m\xE9dico altamente treinado em ler caligrafias de cadernetas de vacina\xE7\xE3o e comprovantes do SUS.
`;
        systemPrompt += `Sua fun\xE7\xE3o \xE9 identificar os registros de vacinas leg\xEDveis na imagem fornecida.
`;
        systemPrompt += `Retorne estritamente um JSON no seguinte formato, e com formata\xE7\xE3o de data ISO (YYYY-MM-DD), ou vazio se for ileg\xEDvel:
`;
        systemPrompt += `{
  "vaccines": [
    { "title": "Nome da Vacina (ex: Febre Amarela)", "date": "2024-10-25", "description": "1\xAA Dose - Lote 1234" }
  ]
}
`;
        systemPrompt += `Seja resiliente com garrancho m\xE9dico. Se a data estiver incerta mas leg\xEDvel s\xF3 o ano, coloque "YYYY-01-01". Se descri\xE7\xE3o (lote/dose) n\xE3o for leg\xEDvel, retorne "1 Dose".
`;
        systemPrompt += `IMPORTANTE: Traduza o texto lido/t\xEDtulos das vacinas para o idioma "${i18n_default.language}" se aplic\xE1vel e mantenha a coes\xE3o neste idioma.`;
        const messages = [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: [
              { type: "text", text: "Leia esta carteira de vacina\xE7\xE3o e liste as vacinas encontradas em JSON." },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                  detail: "high"
                }
              }
            ]
          }
        ];
        try {
          const response = await fetch(CHAT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-vigilaro-token": APP_SECRET
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              // GPT-4o-Mini suporta vision nativamente
              messages,
              temperature: 0.1,
              // temperatura baixa para máxima precisão de transcrição
              response_format: { type: "json_object" },
              max_tokens: 1500
            })
          });
          const data = await response.json();
          if (data.error) {
            if (__DEV__) {
              console.error("OpenAI Vision Error:", data.error);
            }
            throw new Error(data.error.message);
          }
          const jsonResponse = JSON.parse(data.choices[0].message.content);
          return jsonResponse.vaccines || [];
        } catch (error) {
          if (__DEV__) {
            console.error("Erro ao ler caderneta com IA:", error);
          }
          throw error;
        }
      }
      /**
       * Transcreve áudio usando OpenAI Whisper
       * @param {string} audioUri - URI do arquivo de áudio local
       * @returns {Promise<string>} - Texto transcrito
       */
      async transcribeAudio(audioUri) {
        try {
          const formData = new FormData();
          const filename = audioUri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `audio/${match[1]}` : "audio/m4a";
          formData.append("file", {
            uri: audioUri,
            name: filename,
            type
          });
          formData.append("model", "whisper-1");
          formData.append("language", "pt");
          const response = await fetch(TRANSCRIPTIONS_URL, {
            method: "POST",
            headers: {
              "x-vigilaro-token": APP_SECRET,
              "Content-Type": "multipart/form-data"
            },
            body: formData
          });
          const data = await response.json();
          if (data.error) {
            if (__DEV__) {
              console.error("Whisper Error:", data.error);
            }
            throw new Error(data.error.message);
          }
          return data.text;
        } catch (error) {
          if (__DEV__) {
            console.error("Error transcribing audio:", error);
          }
          throw error;
        }
      }
      /**
       * Limpa texto de markdown e formatação para TTS
       * @param {string} text - Texto com possível markdown
       * @returns {string} - Texto limpo para falar
       */
      cleanTextForSpeech(text) {
        if (!text) return "";
        let cleaned = text.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/__([^_]+)__/g, "$1").replace(/_([^_]+)_/g, "$1").replace(/^#+\s*/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/^[\-\*]\s*/gm, "").replace(/^\d+\.\s*/gm, "").replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, "").replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/\s+/g, " ").trim();
        return cleaned;
      }
      /**
       * Gera áudio a partir de texto usando OpenAI TTS
       * @param {string} text - Texto para falar
       * @returns {Promise<string>} - fileUri local com o áudio AAC
       */
      async generateSpeech(text) {
        try {
          if (!this.selectedVoice) {
            await this.getSelectedVoice();
          }
          const response = await fetch(SPEECH_URL, {
            method: "POST",
            headers: {
              "x-vigilaro-token": APP_SECRET,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "tts-1",
              input: this.cleanTextForSpeech(text),
              // Limpa markdown antes de falar
              voice: this.selectedVoice,
              // Usa voz selecionada pelo usuário
              response_format: "aac"
            })
          });
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || "TTS Error");
          }
          const blob = await response.blob();
          const base64Audio = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          const cleanBase64 = base64Audio.includes("base64,") ? base64Audio.split("base64,")[1] : base64Audio;
          const fileUri = `${FileSystem2.cacheDirectory}vigilaro_tts_${Date.now()}.aac`;
          await FileSystem2.writeAsStringAsync(fileUri, cleanBase64, {
            encoding: FileSystem2.EncodingType.Base64
          });
          return fileUri;
        } catch (error) {
          if (__DEV__) {
            console.error("Error generating speech with OpenAI TTS:", error);
          }
          throw error;
        }
      }
    };
    OpenAIService_default = new OpenAIService();
  }
});

// services/SafetyReportService.js
var SafetyReportService_exports = {};
__export(SafetyReportService_exports, {
  default: () => SafetyReportService_default
});
module.exports = __toCommonJS(SafetyReportService_exports);
var import_async_storage10 = __toESM(require("@react-native-async-storage/async-storage"));
var Print = __toESM(require("expo-print"));
var Sharing = __toESM(require("expo-sharing"));
init_mapeamento_dados();
var RISK_IMPLICATIONS = {
  // POR TIPO DE RISCO (tags do checklist)
  queda: {
    baby: "Quedas s\xE3o a principal causa de trauma craniano em beb\xEAs. Em superf\xEDcies r\xEDgidas, uma queda de menos de 1 metro j\xE1 pode ser fatal. O tempo de rea\xE7\xE3o de cuidadores \xE9, em m\xE9dia, de 0,3 segundos \u2014 insuficiente para evitar o impacto.",
    toddler: "Entre 1 e 3 anos, quedas de m\xF3veis e escadas s\xE3o a principal causa de interna\xE7\xE3o por trauma. Crian\xE7as nessa faixa ainda n\xE3o t\xEAm no\xE7\xE3o de profundidade desenvolvida.",
    child: "Crian\xE7as entre 3 e 12 anos lideram as estat\xEDsticas de fraturas por quedas de altura no Brasil (DATASUS). Janelas sem prote\xE7\xE3o s\xE3o o principal vetor de acidente grave.",
    teen: "Adolescentes t\xEAm tend\xEAncia a subestimar riscos de altura. Quedas de sacadas e telhados representam uma das principais causas de trauma grave nessa faixa et\xE1ria.",
    adult: "Quedas em ambiente dom\xE9stico causam cerca de 30% dos afastamentos laborais por acidente. Escadas molhadas, tapetes soltos e aus\xEAncia de ilumina\xE7\xE3o s\xE3o os principais fatores.",
    senior: "Quedas s\xE3o a principal causa de morte acidental em idosos no Brasil (DATASUS, 2023), representando 35% das hospitaliza\xE7\xF5es acima de 60 anos. O uso de medicamentos psicoativos aumenta o risco de queda em at\xE9 60%. Com a osteoporose, uma simples queda pode resultar em fratura de quadril \u2014 com mortalidade p\xF3s-cir\xFArgica de at\xE9 30% em 1 ano.",
    pet: "Pets, especialmente filhotes, podem cair de alturas que parecem seguras para humanos. Gatos sofrem da 'S\xEDndrome do Gato Voador' \u2014 quedas de janelas abertas s\xE3o frequentes em apartamentos.",
    default: "Quedas dom\xE9sticas s\xE3o a 2\xAA maior causa de morte acidental no Brasil, com mais de 30 mil \xF3bitos por ano (IBGE). A preven\xE7\xE3o \xE9 totalmente poss\xEDvel com ajustes estruturais simples."
  },
  afogamento: {
    baby: "O afogamento \xE9 silencioso e ocorre em menos de 60 segundos em beb\xEAs. Um beb\xEA pode se afogar em apenas 5 cm de \xE1gua \u2014 em baldes, banheiras ou vasos sanit\xE1rios abertos.",
    toddler: "O afogamento \xE9 a 2\xAA causa de morte acidental em crian\xE7as de 1 a 4 anos no Brasil (MS/DATASUS). N\xE3o h\xE1 gritos \u2014 a crian\xE7a simplesmente afunda. A janela de resgate \xE9 de 2 a 4 minutos.",
    child: "Crian\xE7as de 5 a 14 anos representam 40% das mortes por afogamento no Brasil. Piscinas sem cerca f\xEDsica respondem pela maioria dos casos \u2014 coletes salva-vidas n\xE3o substituem barreiras f\xEDsicas.",
    pet: "Muitos pets caem em piscinas e morrem de exaust\xE3o porque n\xE3o conseguem acessar as escadas convencionais. Capas de piscina d\xE3o falsa sensa\xE7\xE3o de seguran\xE7a \u2014 animais ficam presos embaixo.",
    default: "O afogamento responde por mais de 3.500 mortes por ano no Brasil (Sociedade Brasileira de Salvamento Aqu\xE1tico). \xC9 silencioso, r\xE1pido e 100% evit\xE1vel com barreiras f\xEDsicas adequadas."
  },
  queimadura: {
    baby: "A pele do beb\xEA \xE9 15x mais fina que a de um adulto. \xC1gua a 60\xB0C causa queimadura de 2\xBA grau em 3 segundos. A cozinha responde por cerca de 40% das queimaduras infantis (DATASUS). O manequim de panela para tr\xE1s e a trava em forno s\xE3o medidas imediatas.",
    toddler: "Crian\xE7as pequenas t\xEAm reflexo de agarrar \u2014 e puxam cabos de panelas sem entender o perigo. O Hospital das Cl\xEDnicas registra alta incid\xEAncia de queimaduras em crian\xE7as de 1-3 anos por l\xEDquidos quentes.",
    child: "Crian\xE7as em idade escolar experimentam com f\xF3sforos e isqueiros. Queimaduras qu\xEDmicas com produtos de limpeza tamb\xE9m s\xE3o frequentes nessa faixa.",
    senior: "Idosos podem ter sensibilidade \xE0 temperatura reduzida (neuropatia), n\xE3o percebendo o perigo de superf\xEDcies quentes ou \xE1gua em temperatura elevada antes de se machucar gravemente.",
    pet: "Gatos e c\xE3es podem subir em fog\xF5es e encostar em superf\xEDcies quentes. \xD3leo quente espirrado causa queimaduras graves nas patas e no focinho.",
    default: "Queimaduras representam a 4\xAA maior causa de interna\xE7\xE3o por acidente no Brasil. 73% dos casos ocorrem em ambiente dom\xE9stico, sendo 60% na cozinha (DATASUS/MS)."
  },
  intoxicacao: {
    baby: "Beb\xEAs e crian\xE7as pequenas s\xE3o as principais v\xEDtimas de intoxica\xE7\xE3o dom\xE9stica. O SINAN registra que 35% das intoxica\xE7\xF5es acidentais acometem crian\xE7as < 5 anos, principalmente por produtos de limpeza coloridos e medicamentos.",
    toddler: "Crian\xE7as de 1 a 3 anos exploram com a boca. Produtos de limpeza com colora\xE7\xE3o atraente s\xE3o confundidos com suco ou balas. A intoxica\xE7\xE3o \xE9 a 3\xAA causa de morte acidental nessa faixa et\xE1ria no pa\xEDs.",
    pet: "Uva, cebola, alho, xilitol (em gomas e algumas manteigas de amendoim) e chocolate s\xE3o altamente t\xF3xicos para c\xE3es. Paracetamol e anti-inflamat\xF3rios comuns podem ser fatais para gatos. O CVT-SP registra milhares de chamadas/ano por intoxica\xE7\xE3o acidental de pets.",
    senior: "Idosos podem confundir medicamentos semelhantes ou tomar doses erradas. A polifarm\xE1cia (uso de 5 ou mais medicamentos) aumenta o risco de intera\xE7\xF5es e intoxica\xE7\xE3o acidental.",
    default: "O SINAN registra cerca de 200 mil notifica\xE7\xF5es de intoxica\xE7\xE3o por ano no Brasil. Produtos de uso domiciliar e medicamentos respondem por mais de 50% dos casos. Armazenamento correto previne quase 100% dos acidentes."
  },
  eletricidade: {
    baby: "Tomadas na altura do ch\xE3o s\xE3o acess\xEDveis para beb\xEAs que come\xE7am a se locomover. Choques el\xE9tricos causam parada card\xEDaca e queimaduras internas invis\xEDveis a olho nu.",
    child: "Crian\xE7as introduzem objetos met\xE1licos em tomadas por curiosidade. O choque el\xE9trico em crian\xE7as causa, al\xE9m de parada card\xEDaca, graves queimaduras internas que nem sempre s\xE3o vis\xEDveis externamente.",
    teen: "Adolescentes realizam reparos el\xE9tricos improvisados. Instala\xE7\xF5es inadequadas s\xE3o respons\xE1veis por 60% dos inc\xEAndios residenciais no Brasil (CBMERJ/CBPMESP).",
    adult: "Choques el\xE9tricos causam cerca de 1.200 mortes/ano no Brasil (ABRACOPEL). Instala\xE7\xF5es improvisadas, fios descascados e extens\xF5es sobrecarregadas s\xE3o os principais fatores.",
    pet: "Fios el\xE9tricos s\xE3o 'brinquedos' irresist\xEDveis para filhotes. Morder um fio energizado causa queimaduras na boca e parada card\xEDaca. C\xE3es e gatos jovens s\xE3o os mais afetados.",
    default: "Choques el\xE9tricos e inc\xEAndios de origem el\xE9trica causam mais de 1.200 mortes/ano no Brasil (ABRACOPEL). 60% dos casos t\xEAm origem em instala\xE7\xF5es improvisadas ou com sobrecarga."
  },
  gas: {
    default: "Explos\xF5es e intoxica\xE7\xF5es por GLP (g\xE1s de cozinha) causam aproximadamente 300 acidentes graves por ano no Brasil (Corpo de Bombeiros). S\xE3o 100% evit\xE1veis com manuten\xE7\xE3o preventiva do botij\xE3o, mangueiras e regulador. O g\xE1s natural, usado em aparelhos sem manuten\xE7\xE3o, pode acumular silenciosamente e causar explos\xE3o com a simples acender de uma luz."
  },
  corte: {
    baby: "Beb\xEAs n\xE3o t\xEAm controle motor para evitar objetos cortantes. L\xE2minas expostas em gavetas baix as causam ferimentos graves, incluindo cortes em art\xE9rias.",
    child: "Tesouras, facas e objetos pontiagudos acess\xEDveis causam ferimentos frequentes em crian\xE7as. O risco \xE9 maior em gavetas baixas e superf\xEDcies acess\xEDveis.",
    default: "Cortes e perfura\xE7\xF5es dom\xE9sticos respondem por grande parte dos atendimentos de emerg\xEAncia. Objetos cortantes guardados incorretamente s\xE3o a principal causa."
  },
  sufocacao: {
    baby: "A sufoca\xE7\xE3o \xE9 a 1\xAA causa de morte acidental em beb\xEAs < 1 ano no Brasil (MS). Travesseiros, len\xE7\xF3is soltos, objetos pequenos (< 4,5 cm) e grades de ber\xE7o espa\xE7adas s\xE3o os principais vetores. Beb\xEAs n\xE3o t\xEAm for\xE7a muscular para desobstruir as vias a\xE9reas.",
    toddler: "Crian\xE7as pequenas colocam objetos pequenos na boca por instinto explorat\xF3rio. Qualquer objeto que caiba em um tubo de papel toalha representa risco de sufoca\xE7\xE3o.",
    pet: "Sacos pl\xE1sticos e embalagens de snacks s\xE3o armadilhas para pets curiosos. Gatos e c\xE3es podem enfiar a cabe\xE7a e sufocarem sem conseguir se livrar.",
    default: "A sufoca\xE7\xE3o por corpos estranhos \xE9 uma das principais causas de morte acidental evit\xE1vel. Objetos menores que 4,5 cm de di\xE2metro devem ser mantidos fora do alcance de crian\xE7as."
  },
  iluminacao: {
    senior: "Idosos levantam \xE0 noite com maior frequ\xEAncia (noct\xFAria) e t\xEAm adapta\xE7\xE3o visual mais lenta ao escuro. Corredores e banheiros sem ilumina\xE7\xE3o noturna s\xE3o os principais cen\xE1rios de queda noturna, que ocorrem em ambiente de menor supervis\xE3o e com consequ\xEAncias muitas vezes fatais.",
    default: "A ilumina\xE7\xE3o insuficiente est\xE1 associada a 20% das quedas dom\xE9sticas, principalmente em escadas, corredores e banheiros. Ilumina\xE7\xE3o de presen\xE7a (sensor) \xE9 a solu\xE7\xE3o de menor custo e maior efic\xE1cia."
  },
  janela: {
    child: "Quedas de janelas e sacadas s\xE3o a principal causa de trauma craniano grave em crian\xE7as entre 1 e 5 anos em ambiente urbano. Redes de prote\xE7\xE3o certificadas pela ABNT NBR 16389 s\xE3o obrigat\xF3rias por lei em apartamentos em v\xE1rios estados.",
    pet: "Gatos s\xE3o atra\xEDdos por janelas abertas e p\xE1ssaros. A 'S\xEDndrome do Gato Voador' \xE9 documentada em centros veterin\xE1rios de todo o pa\xEDs \u2014 quedas de andares elevados causam fraturas m\xFAltiplas mas raramente s\xE3o fatais, por\xE9m geram custos veterin\xE1rios altos e sofrimento ao animal.",
    default: "Quedas de janelas e sacadas representam causa relevante de trauma grave. Prote\xE7\xF5es f\xEDsicas (grades ou redes) s\xE3o a \xFAnica medida efetiva de preven\xE7\xE3o."
  }
};
function getImplication(item, profileType) {
  const tags = item.tags || [];
  const titulo = (item.titulo || "").toLowerCase();
  for (const tag of tags) {
    const tagData = RISK_IMPLICATIONS[tag];
    if (tagData) {
      return tagData[profileType] || tagData.default || null;
    }
  }
  const keywords = Object.keys(RISK_IMPLICATIONS);
  for (const kw of keywords) {
    if (titulo.includes(kw)) {
      const tagData = RISK_IMPLICATIONS[kw];
      return tagData[profileType] || tagData.default || null;
    }
  }
  return null;
}
function getActionTip(item, knowledgeTip) {
  const tip = item.dica || item.orientacao || item.tip || "";
  return tip;
}
function getMedidaCorretiva(item, tip) {
  if (tip && tip.trim()) {
    return tip;
  }
  let title = item.titulo || "";
  if (title.endsWith("?")) {
    title = title.slice(0, -1);
  }
  title = title.replace(/^(os|as|o|a|você|existe|existem|há)\s+/i, "");
  return `Providenciar a adequa\xE7\xE3o do item: garantir que ${title.toLowerCase()}.`;
}
function getMedidaPreventiva(item, profileType) {
  const tags = item.tags || [];
  const title = (item.titulo || "").toLowerCase();
  const PREVENTIVE_ACTIONS = {
    queda: {
      baby: "Manter supervis\xE3o visual 100% ativa em locais elevados (trocador, cama, sof\xE1) e manter os port\xF5es de seguran\xE7a de escadas trancados.",
      toddler: "Bloquear o acesso a janelas com m\xF3veis pr\xF3ximos, usar port\xF5es nas escadas e ensinar a descer degraus engatinhando de costas.",
      child: "Orientar a n\xE3o subir em cadeiras, mesas ou peitoris de janelas para jogar ou brincar. Manter janelas travadas se n\xE3o tiverem redes de prote\xE7\xE3o.",
      senior: "Estabelecer uma rotina de exerc\xEDcios leves para fortalecimento muscular e de equil\xEDbrio. Retirar tapetes soltos e manter caminhos desobstru\xEDdos.",
      pet: "Evitar brincadeiras bruscas perto de v\xE3os de escadas ou varandas abertas. Bloquear passagem de pets filhotes por grades largas.",
      default: "Manter corredores e passagens livres de fios, cal\xE7ados e brinquedos. Fazer vistorias visuais de desordem nos caminhos comuns."
    },
    afogamento: {
      baby: "Esvaziar e virar para baixo baldes, bacias e banheiras imediatamente ap\xF3s o uso. Nunca deixar o beb\xEA sozinho no banho por nenhum segundo.",
      toddler: "Manter a porta do banheiro trancada por fora e a tampa do vaso sanit\xE1rio lacrada com trava de seguran\xE7a para crian\xE7as.",
      child: "Ensinar a crian\xE7a a nadar desde cedo e nunca deix\xE1-la brincar perto de corpos d'\xE1gua sem a presen\xE7a f\xEDsica direta de um adulto.",
      pet: "Manter port\xF5es da \xE1rea da piscina fechados e acostumar o pet a reconhecer a rampa ou escada de sa\xEDda de emerg\xEAncia.",
      default: "Instalar cercas ou barreiras ao redor de \xE1reas com \xE1gua acumulada. Tampar po\xE7os, cisternas e manter piscinas cobertas com capas r\xEDgidas."
    },
    queimadura: {
      baby: "Checar a temperatura da \xE1gua da banheira com o cotovelo antes de colocar o beb\xEA. N\xE3o segurar o beb\xEA no colo enquanto consome bebidas quentes.",
      toddler: "Adotar o h\xE1bito de usar as bocas traseiras do fog\xE3o e manter cabos de panelas virados para tr\xE1s. Criar uma 'zona proibida' de 1 metro ao redor do fog\xE3o.",
      child: "Ensinar sobre o perigo do fogo e manter f\xF3sforos, isqueiros e velas trancados em gavetas altas, longe do alcance visual.",
      senior: "Utilizar alarmes ou temporizadores visuais/sonoros no preparo de alimentos para evitar esquecimento de panelas ligadas.",
      pet: "Impedir o pet de subir em bancadas de cozinha e monitorar enquanto o forno estiver ligado para evitar encostar no vidro quente.",
      default: "Manipular panelas quentes com luvas apropriadas e nunca deixar \xF3leos ou gorduras sob aquecimento sem monitoramento constante."
    },
    intoxicacao: {
      baby: "Manter produtos de higiene e cosm\xE9ticos trancados. Nunca chamar medicamentos de 'docinho' ou 'bala' na frente da crian\xE7a.",
      toddler: "Guardar produtos de limpeza, inseticidas e medicamentos estritamente em arm\xE1rios altos ou gavetas com travas de seguran\xE7a.",
      child: "Ensinar a n\xE3o colocar subst\xE2ncias desconhecidas na boca. Manter produtos em seus recipientes originais (nunca usar garrafas de refrigerante).",
      senior: "Utilizar organizadores di\xE1rios/semanais de comprimidos e manter a receita m\xE9dica atualizada junto \xE0s caixas para evitar superdosagem.",
      pet: "Conhecer a lista de plantas e alimentos t\xF3xicos para animais. Guardar chocolate, uvas, medicamentos humanos e venenos de ratos sob chave.",
      default: "Armazenar produtos qu\xEDmicos residenciais isolados de alimentos e utens\xEDlios de cozinha. Manter as embalagens bem vedadas."
    },
    eletricidade: {
      baby: "Usar protetores pl\xE1sticos em todas as tomadas acess\xEDveis na altura do ch\xE3o e n\xE3o deixar carregadores de celular conectados sem uso.",
      toddler: "Esconder cabos el\xE9tricos atr\xE1s de m\xF3veis pesados e evitar o uso de extens\xF5es ou adaptadores el\xE9tricos tempor\xE1rios no ch\xE3o.",
      child: "Orientar a nunca tocar em tomadas ou ligar eletrodom\xE9sticos com as m\xE3os ou p\xE9s molhados. Explicar o perigo de fios soltos.",
      pet: "Proteger os cabos el\xE9tricos com condu\xEDtes ou organizadores r\xEDgidos para evitar que o animal morda ou roa os fios energizados.",
      default: "Evitar a sobrecarga de tomadas usando m\xFAltiplos benjamins. Desligar disjuntores antes de efetuar pequenas trocas de l\xE2mpadas ou reparos."
    },
    gas: {
      default: "Adotar o h\xE1bito de fechar o registro do botij\xE3o de g\xE1s ao deitar-se ou ao se ausentar da resid\xEAncia por longos per\xEDodos."
    },
    corte: {
      baby: "Evitar o uso de copos ou pratos de vidro perto de beb\xEAs. Guardar objetos cortantes de manicure/pedicure em estojos trancados.",
      child: "Disponibilizar tesouras de ponta redonda para atividades escolares e guardar facas de cozinha em suportes elevados ou gavetas com travas.",
      pet: "Evitar deixar cacos de vidro, pregos ou latas abertas em locais onde o pet possa transitar ou farejar.",
      default: "Manusear facas e ferramentas manuais sempre apontando a l\xE2mina para longe do corpo. Descartar vidros quebrados embrulhados em papel grosso."
    },
    sufocacao: {
      baby: "Colocar o beb\xEA para dormir de barriga para cima em colch\xE3o firme. Retirar bichos de pel\xFAcia, almofadas e protetores soltos do ber\xE7o.",
      toddler: "Evitar oferecer brinquedos com pe\xE7as muito pequenas (menores que 4 cm) e cortar alimentos (como uvas e salsichas) em peda\xE7os pequenos no sentido longitudinal.",
      pet: "Destruir ou recolher sacos pl\xE1sticos vazios de ra\xE7\xE3o ou de compras, pois c\xE3es e gatos podem prender a cabe\xE7a neles e sufocar.",
      default: "Evitar o uso de cord\xF5es de cortina ou persianas soltos que possam criar la\xE7os na altura de crian\xE7as ou pesco\xE7o de animais."
    },
    iluminacao: {
      senior: "Manter luzes de presen\xE7a (sensor ou tomadas piloto) permanentemente ligadas nas rotas noturnas entre o quarto e o banheiro.",
      default: "Substituir imediatamente l\xE2mpadas queimadas em \xE1reas comuns, corredores e degraus de acesso da resid\xEAncia."
    },
    janela: {
      child: "Manter camas, sof\xE1s e cadeiras afastados das janelas e sacadas para evitar que sirvam de degrau para escaladas de crian\xE7as.",
      pet: "Manter as janelas de apartamentos fechadas ou limitadas se n\xE3o possu\xEDrem telas de prote\xE7\xE3o resistentes a garras e mordidas de pets.",
      default: "Verificar a integridade f\xEDsica das redes de prote\xE7\xE3o anualmente e evitar debru\xE7ar-se ou colocar pesos excessivos nos peitoris."
    }
  };
  for (const tag of tags) {
    const data = PREVENTIVE_ACTIONS[tag];
    if (data) {
      return data[profileType] || data.default || null;
    }
  }
  const keywords = Object.keys(PREVENTIVE_ACTIONS);
  for (const kw of keywords) {
    if (title.includes(kw)) {
      const data = PREVENTIVE_ACTIONS[kw];
      return data[profileType] || data.default || null;
    }
  }
  return "Manter a aten\xE7\xE3o di\xE1ria nas condi\xE7\xF5es do ambiente e adotar h\xE1bitos de supervis\xE3o e organiza\xE7\xE3o para evitar situa\xE7\xF5es de perigo.";
}
function getMedidaMitigacao(item, profileType) {
  const tags = item.tags || [];
  const title = (item.titulo || "").toLowerCase();
  const MITIGATION_ACTIONS = {
    queda: {
      baby: "Instalar tapetes emborrachados macios ao redor do ber\xE7o e do trocador para amortecer eventuais impactos de quedas acidentais.",
      toddler: "Utilizar protetores de quinas arredondadas em mesas e m\xF3veis baixos para suavizar colis\xF5es e ferimentos durante quedas.",
      child: "Usar pisos emborrachados em \xE1reas de brinquedos e instalar limitadores de abertura nas janelas (abertura m\xE1xima de 10 cm).",
      senior: "Garantir o uso de cal\xE7ados antiderrapantes com solado de borracha firme dentro de casa e instalar barras de apoio no box e vaso sanit\xE1rio.",
      pet: "Manter pisos limpos e secos para evitar escorreg\xF5es que possam lesionar as articula\xE7\xF5es e patinhas dos animais.",
      default: "Manter um kit de primeiros socorros com gelo em gel reutiliz\xE1vel na geladeira e faixas para conter incha\xE7os de quedas leves."
    },
    afogamento: {
      baby: "Manter o telefone do SAMU (192) em discagem r\xE1pida e saber como realizar compress\xF5es tor\xE1cicas b\xE1sicas de emerg\xEAncia em lactentes.",
      toddler: "Conhecer a manobra de desobstru\xE7\xE3o das vias a\xE9reas e manter um colete salva-vidas de tamanho infantil sempre acess\xEDvel se houver piscina.",
      child: "Utilizar coletes salva-vidas homologados (n\xE3o boias de bra\xE7o) e manter um cabo ou boia circular r\xEDgida na borda da piscina.",
      pet: "Instalar uma plataforma flutuante ou rampa de escape para pets na piscina, permitindo que o animal saia sozinho se cair acidentalmente.",
      default: "Fazer curso de primeiros socorros focado em reanima\xE7\xE3o cardiorrespirat\xF3ria e manter o telefone de emerg\xEAncia em local vis\xEDvel."
    },
    queimadura: {
      baby: "Em caso de queimadura leve, resfriar a \xE1rea com \xE1gua corrente fria por 10 minutos (nunca aplicar pasta de dente ou manteiga) e buscar socorro m\xE9dico.",
      toddler: "Instalar barreiras de prote\xE7\xE3o f\xEDsicas ao redor do fog\xE3o (grades de fog\xE3o) e manter pomadas para queimadura no kit de primeiros socorros.",
      senior: "Substituir chaleiras convencionais por chaleiras el\xE9tricas com desligamento autom\xE1tico e prote\xE7\xE3o t\xE9rmica nas laterais.",
      pet: "Ter \xE0 m\xE3o gaze limpa e soro fisiol\xF3gico frio para resfriar a pele do animal em caso de queimaduras por \xF3leo quente ou vapor.",
      default: "Instalar um extintor de inc\xEAndio ABC na cozinha e manter uma manta corta-fogo para abafar princ\xEDpios de inc\xEAndio em frigideiras."
    },
    intoxicacao: {
      baby: "Deixar o n\xFAmero do Centro de Informa\xE7\xE3o Toxicol\xF3gica (0800-722-6001) salvo nos contatos. Nunca induzir o v\xF4mito em caso de ingest\xE3o qu\xEDmica.",
      toddler: "Saber identificar as embalagens ingeridas para informar \xE0 equipe m\xE9dica e nunca usar receitas caseiras para neutralizar venenos.",
      senior: "Manter um di\xE1rio de administra\xE7\xE3o de medicamentos vis\xEDvel para que param\xE9dicos possam checar os rem\xE9dios em caso de emerg\xEAncia.",
      pet: "Ter o contato do veterin\xE1rio plantonista 24h anotado e saber quais sintomas indicam envenenamento (saliva\xE7\xE3o excessiva, convuls\xF5es).",
      default: "Salvar o telefone do CIATox local no celular e manter carv\xE3o ativado no kit de primeiros socorros dom\xE9stico."
    },
    eletricidade: {
      baby: "Instalar o dispositivo Diferencial Residual (DR) no quadro el\xE9trico, que corta a energia instantaneamente ao menor sinal de fuga de corrente.",
      toddler: "Instalar canaletas r\xEDgidas de prote\xE7\xE3o de fios para que a crian\xE7a n\xE3o consiga puxar ou mastigar as fia\xE7\xF5es el\xE9tricas.",
      pet: "Aplicar sprays amargos apropriados para pets nos cabos el\xE9tricos da casa e usar tomadas blindadas ou protetores contra mordidas.",
      default: "Instalar disjuntores termomagn\xE9ticos adequados no quadro geral e manter um alicate de corte isolado em local de f\xE1cil acesso de emerg\xEAncia."
    },
    gas: {
      default: "Instalar um sensor eletr\xF4nico de vazamento de g\xE1s GLP/Natural com alarme sonoro na cozinha e saber onde fica a chave geral de corte do g\xE1s."
    },
    corte: {
      baby: "Manter gaze est\xE9ril, soro fisiol\xF3gico e antiss\xE9ptico para limpeza r\xE1pida de ferimentos no kit de primeiros socorros do beb\xEA.",
      child: "Ter curativos adesivos coloridos para incentivar a prote\xE7\xE3o do ferimento e saber aplicar press\xE3o direta sobre o corte para estancar sangramentos.",
      pet: "Manter pomada cicatrizante e ataduras para conter sangramentos nas patinhas causados por cortes com vidros ou arames.",
      default: "Usar luvas de prote\xE7\xE3o grossas ao manusear cacos de vidro quebrado ou metais e ter \xE0 m\xE3o compressas est\xE9reis e fita micropore."
    },
    sufocacao: {
      baby: "Aprender e treinar a Manobra de Heimlich para beb\xEAs menores de 1 ano (tapas nas costas e compress\xF5es no peito).",
      toddler: "Saber realizar a Manobra de Heimlich para crian\xE7as maiores e manter o telefone de emerg\xEAncia dos bombeiros (193) no discador r\xE1pido.",
      pet: "Conhecer a t\xE9cnica de desobstru\xE7\xE3o de vias a\xE9reas em pets e saber como agir se o animal engolir brinquedos ou peda\xE7os de ossos.",
      default: "Ter um dispositivo extrator de corpos estranhos por v\xE1cuo (se dispon\xEDvel) ou saber agir rapidamente ligando para o 193/192."
    },
    iluminacao: {
      senior: "Instalar fitas antiderrapantes fotoluminescentes nas bordas de todos os degraus de escada e manter uma lanterna recarreg\xE1vel ao lado da cama.",
      default: "Manter luzes de emerg\xEAncia autom\xE1ticas instaladas em pontos cr\xEDticos da casa para o caso de falta de energia \xE0 noite."
    },
    janela: {
      child: "Utilizar redes de prote\xE7\xE3o certificadas e instalar travas mec\xE2nicas nas janelas que restrinjam a abertura e resistam ao peso da crian\xE7a.",
      pet: "Instalar redes de prote\xE7\xE3o com malha de 3cm ou 5cm de alta resist\xEAncia e vistorias frequentes das fixa\xE7\xF5es para evitar rasgos.",
      default: "Manter trincos adicionais nas janelas e usar telas mosquiteiras resistentes que tamb\xE9m criem barreira visual."
    }
  };
  for (const tag of tags) {
    const data = MITIGATION_ACTIONS[tag];
    if (data) {
      return data[profileType] || data.default || null;
    }
  }
  const keywords = Object.keys(MITIGATION_ACTIONS);
  for (const kw of keywords) {
    if (title.includes(kw)) {
      const data = MITIGATION_ACTIONS[kw];
      return data[profileType] || data.default || null;
    }
  }
  return "Ter em m\xE3os os n\xFAmeros dos servi\xE7os de emerg\xEAncia (192 SAMU, 193 Bombeiros) e possuir um kit b\xE1sico de primeiros socorros montado na resid\xEAncia.";
}
function resolveProfileType(profile) {
  if (!profile) return "adult";
  const tipo = (profile.tipo || "").toLowerCase();
  if (tipo === "pet") return "pet";
  let age = parseInt(profile.idade, 10);
  if (isNaN(age) && profile.dataNascimento) {
    const birth = new Date(profile.dataNascimento);
    if (!isNaN(birth.getTime())) {
      const diff = Date.now() - birth.getTime();
      age = Math.floor(diff / (1e3 * 60 * 60 * 24 * 365.25));
    }
  }
  if (!isNaN(age)) {
    if (age < 1) return "baby";
    if (age <= 3) return "toddler";
    if (age <= 12) return "child";
    if (age <= 17) return "teen";
    if (age >= 80) return "senior";
    if (age >= 60) return "senior";
  }
  const map = {
    baby: "baby",
    toddler: "toddler",
    child: "child",
    crianca: "child",
    teen: "teen",
    adolescente: "teen",
    adult: "adult",
    adulto: "adult",
    senior: "senior",
    idoso: "senior"
  };
  return map[tipo] || "adult";
}
function formatLocation(moradia) {
  const parts = [];
  if (moradia.cidade) parts.push(moradia.cidade);
  if (moradia.estado) parts.push(moradia.estado);
  return parts.join("/") || null;
}
function typeLabel(type, age) {
  const labels = {
    baby: "Beb\xEA",
    toddler: "Crian\xE7a pequena",
    child: "Crian\xE7a",
    teen: "Adolescente",
    adult: "Adulto",
    senior: age >= 80 ? "Idoso(a) avan\xE7ado(a)" : "Idoso(a)",
    pet: "Pet"
  };
  return labels[type] || "Morador(a)";
}
var SafetyReportService = class {
  async getDeepDiveReport(profileId) {
    try {
      const ProfileService2 = (init_ProfileService(), __toCommonJS(ProfileService_exports)).default;
      const HealthService2 = (init_HealthService(), __toCommonJS(HealthService_exports)).default;
      const SafetyKnowledge = (init_SafetyKnowledgeService(), __toCommonJS(SafetyKnowledgeService_exports)).default;
      const CS = (init_ChecklistService(), __toCommonJS(ChecklistService_exports)).ChecklistService || (init_ChecklistService(), __toCommonJS(ChecklistService_exports)).default;
      const profiles = await ProfileService2.getAllPerfis();
      const profile = profiles.find((p) => p.id === profileId);
      if (!profile) return null;
      const type = resolveProfileType(profile);
      const age = parseInt(profile.idade, 10) || null;
      const firstName = (profile.nome || "").split(" ")[0] || "Morador";
      const moradia = await ProfileService2.getMoradia();
      const location = formatLocation(moradia);
      const residenceId = await ProfileService2.getActiveResidenceId();
      const nomeResidencia = await ProfileService2.getActiveResidenceName();
      const mapping = await ProfileService2.getMapping();
      const tipoMoradia = moradia.tipo || moradia.tipoMoradia || null;
      const andar = moradia.andar || null;
      const caract = moradia.caracteristicas || [];
      let medications = [], treatments = [], medicalHistory = [];
      try {
        [medications, treatments, medicalHistory] = await Promise.all([
          HealthService2.getMedications(profileId),
          HealthService2.getTreatments(profileId),
          HealthService2.getMedicalHistory ? HealthService2.getMedicalHistory(profileId) : Promise.resolve([])
        ]);
      } catch (_) {
      }
      const hasMeds = medications.length > 0;
      const medNames = medications.slice(0, 3).map((m) => m.nome || m.name || m).filter(Boolean).join(", ");
      const checklistState = await CS.getAllState(residenceId);
      const acknowledgments = await this.getAcknowledgments(profileId);
      const riskItems = [];
      const pendingItems = [];
      let answeredCount = 0;
      const isRelevant = (roomKey) => {
        const roomDef = AMBIENTES.find((a) => a.id === roomKey);
        if (!roomDef) return false;
        if (roomDef.condicional === "opcional") {
          const k = roomKey.toLowerCase();
          return (mapping || []).some((m) => (m || "").toLowerCase().includes(k) || k.includes((m || "").toLowerCase()));
        }
        if (roomDef.condicional === "bebe" && type !== "baby" && type !== "toddler") return false;
        if (roomDef.condicional === "idoso" && type !== "senior") return false;
        return true;
      };
      const roomKeys = Object.keys(CHECKLISTS);
      for (const roomKey of roomKeys) {
        if (!isRelevant(roomKey)) continue;
        const roomDef = AMBIENTES.find((a) => a.id === roomKey);
        const roomStructure = CHECKLISTS[roomKey];
        const roomAnswers = checklistState[roomKey] || {};
        const knowledge = SafetyKnowledge.getEnvironmentInfo(roomKey, type);
        const envLabel = roomDef ? roomDef.nome : roomKey;
        const envEmoji = roomDef ? roomDef.emoji : "\u{1F3E0}";
        const allItems = [];
        if (roomStructure?.categorias) {
          roomStructure.categorias.forEach((cat) => {
            if (cat.itens) allItems.push(...cat.itens);
          });
        }
        const normStr = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
        const getItemAnswer = (titulo) => {
          if (Array.isArray(roomAnswers)) {
            const found = roomAnswers.find(
              (i) => normStr(i.text) === normStr(titulo) || normStr(i.titulo) === normStr(titulo)
            );
            if (!found) return void 0;
            if (found.status === "conforme" || found.checked === true) return "sim";
            if (found.status === "risco") return "nao";
            if (found.status === "na") return "na";
            return void 0;
          } else {
            const v = roomAnswers[titulo];
            if (v === "sim" || v === true) return "sim";
            if (v === "nao" || v === false) return "nao";
            if (v === "na") return "na";
            return void 0;
          }
        };
        allItems.forEach((q) => {
          const answer = getItemAnswer(q.titulo);
          if (answer === "sim" || answer === "nao" || answer === "na") {
            answeredCount++;
          }
          const itemKey = `${roomKey}::${q.titulo}`;
          const implication = getImplication(q, type);
          const tip = getActionTip(q, knowledge?.tip);
          const base = {
            itemKey,
            roomKey,
            roomLabel: envLabel,
            roomEmoji: envEmoji,
            titulo: q.titulo || "",
            tags: q.tags || [],
            implication,
            tip,
            medidaCorretiva: getMedidaCorretiva(q, tip),
            medidaPreventiva: getMedidaPreventiva(q, type),
            medidaMitigacao: getMedidaMitigacao(q, type),
            acknowledged: acknowledgments[itemKey] || null
          };
          if (answer === "nao" || answer === false) {
            riskItems.push(base);
          } else if (answer !== "sim" && answer !== true) {
            pendingItems.push(base);
          }
        });
      }
      const critCount = riskItems.filter((r) => !r.acknowledged).length;
      const ackCount = riskItems.filter((r) => r.acknowledged).length;
      const pendingCount = pendingItems.length;
      let executiveSummary;
      const healthContext = hasMeds && type === "senior" ? ` Dado que voc\xEA faz uso de medicamentos como ${medNames}, o risco de quedas e desequil\xEDbrio merece aten\xE7\xE3o redobrada.` : hasMeds ? ` H\xE1 medicamentos registrados \u2014 certifique-se de que est\xE3o armazenados com seguran\xE7a.` : "";
      if (answeredCount === 0) {
        executiveSummary = `${firstName}, sua vistoria ainda n\xE3o foi iniciada. Mapeie e inspecione os ambientes para podermos gerar o diagn\xF3stico de seguran\xE7a da sua casa.`;
      } else if (critCount === 0 && pendingCount === 0) {
        executiveSummary = `${firstName}, sua vistoria est\xE1 completa e n\xE3o h\xE1 irregularidades ativas. Excelente! Continue revisando periodicamente para manter este n\xEDvel de prote\xE7\xE3o.${healthContext}`;
      } else if (critCount === 0 && pendingCount > 0) {
        executiveSummary = `${firstName}, n\xE3o h\xE1 riscos confirmados, mas ${pendingCount} item(ns) ainda n\xE3o foram verificados. Complete a vistoria para um diagn\xF3stico preciso.${healthContext}`;
      } else if (critCount === 1) {
        executiveSummary = `${firstName}, identificamos 1 irregularidade ativa na vistoria. Uma a\xE7\xE3o simples pode eliminar completamente esse risco.${healthContext}${ackCount > 0 ? ` Voc\xEA j\xE1 reconheceu ${ackCount} item(ns) anteriormente.` : ""}`;
      } else {
        executiveSummary = `${firstName}, a vistoria registrou ${critCount} irregularidade(s) ativa(s) distribu\xEDdas nos ambientes da sua resid\xEAncia. Abaixo est\xE3o as implica\xE7\xF5es de cada uma e as orienta\xE7\xF5es para resolu\xE7\xE3o.${healthContext}${ackCount > 0 ? ` ${ackCount} item(ns) foram reconhecidos por voc\xEA anteriormente.` : ""}`;
      }
      const intro = SafetyKnowledge.getIntro(type);
      const curiosity = SafetyKnowledge.getCuriosity(type);
      return {
        profile,
        reportType: type,
        typeLabel: typeLabel(type, age),
        age,
        moradia: {
          id: residenceId,
          nome: nomeResidencia,
          tipo: tipoMoradia,
          andar,
          caracteristicas: caract,
          location
        },
        health: {
          hasMeds,
          medNames,
          treatments,
          medicalHistory
        },
        executiveSummary,
        riskItems,
        // irregularidades ativas (apenas "nao")
        pendingItems,
        // não verificados
        intro,
        curiosity,
        otherProfiles: profiles.filter((p) => p.id !== profileId),
        stats: {
          total: riskItems.length + pendingItems.length,
          risks: riskItems.length,
          pending: pendingItems.length,
          acknowledged: ackCount,
          answeredCount
        },
        generatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      if (__DEV__) {
        console.error("SafetyReportService.getDeepDiveReport error:", error);
      }
      return null;
    }
  }
  /**
   * Salva o reconhecimento de risco pelo usuário.
   * O item NÃO some do relatório — apenas muda o estado visual.
   */
  async saveAcknowledgment(profileId, itemKey, responsibleName) {
    try {
      const storageKey = `@safety_acknowledgment_${profileId}`;
      const existing = await import_async_storage10.default.getItem(storageKey);
      const data = existing ? JSON.parse(existing) : {};
      data[itemKey] = {
        responsibleName,
        date: (/* @__PURE__ */ new Date()).toISOString()
      };
      await import_async_storage10.default.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      if (__DEV__) {
        console.error("saveAcknowledgment error:", e);
      }
      return false;
    }
  }
  /**
   * Retorna todos os reconhecimentos salvos para um perfil.
   */
  async getAcknowledgments(profileId) {
    try {
      const storageKey = `@safety_acknowledgment_${profileId}`;
      const data = await import_async_storage10.default.getItem(storageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }
  /**
   * Remove um reconhecimento (caso o usuário queira reabrir o item).
   */
  async removeAcknowledgment(profileId, itemKey) {
    try {
      const storageKey = `@safety_acknowledgment_${profileId}`;
      const existing = await import_async_storage10.default.getItem(storageKey);
      const data = existing ? JSON.parse(existing) : {};
      delete data[itemKey];
      await import_async_storage10.default.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }
  /**
   * Gera um hash simples dos dados relevantes para detectar mudanças.
   * Quando o hash muda, o relatório IA precisa ser regenerado.
   */
  async computeDataHash(profileId) {
    try {
      const ProfileService2 = (init_ProfileService(), __toCommonJS(ProfileService_exports)).default;
      const CS = (init_ChecklistService(), __toCommonJS(ChecklistService_exports)).ChecklistService || (init_ChecklistService(), __toCommonJS(ChecklistService_exports)).default;
      const profiles = await ProfileService2.getAllPerfis();
      const profile = profiles.find((p) => p.id === profileId);
      const moradia = await ProfileService2.getMoradia();
      const residenceId = await ProfileService2.getActiveResidenceId();
      const checklistState = await CS.getAllState(residenceId);
      const dataStr = JSON.stringify({
        nome: profile?.nome,
        tipo: profile?.tipo,
        idade: profile?.idade,
        dataNascimento: profile?.dataNascimento,
        condicoesEspeciais: profile?.condicoesEspeciais,
        tipoImovel: moradia?.tipoImovel || moradia?.tipo,
        caracteristicas: moradia?.caracteristicas,
        estrutura: moradia?.estrutura,
        checklists: checklistState
      });
      let hash = 0;
      for (let i = 0; i < dataStr.length; i++) {
        const chr = dataStr.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
      }
      return String(hash);
    } catch (e) {
      if (__DEV__) {
        console.error("computeDataHash error:", e);
      }
      return String(Date.now());
    }
  }
  /**
   * Retorna o Relatório Personalizado IA (Quem, Onde, O Que, Como) em formato estruturado (JSON).
   * Auto-detecta mudanças nos dados via hash e regenera automaticamente quando necessário.
   * @param {string} profileId - ID do morador.
   * @param {boolean} forceRefresh - Força re-geração na OpenAI ignorando o cache local.
   */
  async getAIAugmentedReport(profileId, forceRefresh = false) {
    try {
      const cacheKey = `@ai_report_${profileId}`;
      const currentHash = await this.computeDataHash(profileId);
      if (!forceRefresh) {
        const cached = await import_async_storage10.default.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.dataHash === currentHash) {
            return parsed;
          }
          console.log("\u{1F4CA} Dados alterados detectados \u2014 regenerando relat\xF3rio IA.");
        }
      }
      const reportData = await this.getDeepDiveReport(profileId);
      if (!reportData) return null;
      if (reportData.stats?.answeredCount === 0) {
        return null;
      }
      const OpenAIService2 = (init_OpenAIService(), __toCommonJS(OpenAIService_exports)).default;
      const aiResponseJSON = await OpenAIService2.generateConsultativeReport(reportData);
      if (aiResponseJSON && aiResponseJSON.quem) {
        const fullResponse = {
          ...aiResponseJSON,
          dataHash: currentHash,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        await import_async_storage10.default.setItem(cacheKey, JSON.stringify(fullResponse));
        return fullResponse;
      }
      return null;
    } catch (error) {
      if (__DEV__) {
        console.error("Erro getAIAugmentedReport:", error);
      }
      try {
        const cached = await import_async_storage10.default.getItem(`@ai_report_${profileId}`);
        if (cached) return JSON.parse(cached);
      } catch (_) {
      }
      return null;
    }
  }
  async resolveRisk(profileId, riskTitle) {
    try {
      const key = `@safety_resolution_${profileId}`;
      const json = await import_async_storage10.default.getItem(key);
      const data = json ? JSON.parse(json) : {};
      data[riskTitle] = { resolved: true, timestamp: (/* @__PURE__ */ new Date()).toISOString() };
      await import_async_storage10.default.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }
  async unresolveRisk(profileId, riskTitle) {
    try {
      const key = `@safety_resolution_${profileId}`;
      const json = await import_async_storage10.default.getItem(key);
      const data = json ? JSON.parse(json) : {};
      delete data[riskTitle];
      await import_async_storage10.default.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }
  async generatePDFReport(profileId) {
    try {
      const reportData = await this.getDeepDiveReport(profileId);
      if (!reportData) throw new Error("Dados do relat\xF3rio n\xE3o encontrados");
      const aiReport = await this.getAIAugmentedReport(profileId);
      const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Relat\xF3rio Vigilaro Care - ${reportData.profile.nome}</title>
                    <style>
                        body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; line-height: 1.6; }
                        h1 { color: #2C3E50; border-bottom: 2px solid #3498DB; padding-bottom: 10px; }
                        h2 { color: #2980B9; margin-top: 30px; }
                        .header { text-align: center; margin-bottom: 40px; }
                        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.9em; font-weight: bold; background: #E1F5FE; color: #01579B; }
                        .summary { background: #F8F9FA; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #3498DB; }
                        .risk-item { margin-bottom: 20px; padding: 15px; border: 1px solid #EEE; border-radius: 8px; }
                        .risk-title { font-weight: bold; color: #C0392B; display: flex; align-items: center; }
                        .room { font-size: 0.8em; color: #7F8C8D; text-transform: uppercase; margin-bottom: 5px; }
                        .tip { background: #E8F5E9; padding: 10px; margin-top: 10px; border-radius: 5px; font-size: 0.9em; }
                        .footer { margin-top: 50px; text-align: center; font-size: 0.8em; color: #95A5A6; border-top: 1px solid #EEE; padding-top: 10px; }
                        .pill { display: inline-block; padding: 2px 8px; background: #EEE; border-radius: 4px; margin-right: 5px; font-size: 0.75em; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Vigilaro Care Neo</h1>
                        <p>Relat\xF3rio de Seguran\xE7a e Preven\xE7\xE3o de Acidentes</p>
                    </div>

                    <div class="summary">
                        <h2>Sum\xE1rio para ${reportData.profile.nome}</h2>
                        <p><strong>Perfil:</strong> ${reportData.typeLabel} (${reportData.age} anos)</p>
                        <p><strong>Resid\xEAncia:</strong> ${reportData.moradia.tipo || "Casa"} - ${reportData.moradia.location || "Local n\xE3o informado"}</p>
                        <p>${reportData.executiveSummary}</p>
                    </div>

                    ${aiReport ? `
                    <div class="ai-insight">
                        <h2>An\xE1lise Estrat\xE9gica</h2>
                        <p><strong>Onde focar:</strong> ${aiReport.onde}</p>
                        <p><strong>O que fazer:</strong> ${aiReport.o_que}</p>
                    </div>
                    ` : ""}

                    <h2>Irregularidades Identificadas (${reportData.riskItems.length})</h2>
                    ${reportData.riskItems.length > 0 ? reportData.riskItems.map((item) => `
                        <div class="risk-item">
                            <div class="room">${item.roomEmoji} ${item.roomLabel}</div>
                            <div class="risk-title">${item.titulo}</div>
                            <p>${item.implication || "Risco iminente de acidente dom\xE9stico."}</p>
                            ${item.tip ? `<div class="tip"><strong>A\xE7\xE3o Recomendada:</strong> ${item.tip}</div>` : ""}
                            <div>${item.tags.map((t) => `<span class="pill">${t}</span>`).join("")}</div>
                        </div>
                    `).join("") : "<p>Parab\xE9ns! Nenhuma irregularidade ativa foi encontrada nos ambientes vistoriados.</p>"}

                    ${reportData.pendingItems.length > 0 ? `
                        <h2>Itens Pendentes de Vistoria (${reportData.pendingItems.length})</h2>
                        <p>Aten\xE7\xE3o: Os ambientes abaixo ainda possuem itens n\xE3o verificados, o que pode ocultar riscos reais.</p>
                        <ul>
                            ${Array.from(new Set(reportData.pendingItems.map((p) => p.roomLabel))).map((room) => `<li>${room}</li>`).join("")}
                        </ul>
                    ` : ""}

                    <div class="footer">
                        <p>Gerado em ${new Date(reportData.generatedAt).toLocaleDateString()} \xE0s ${new Date(reportData.generatedAt).toLocaleTimeString()}</p>
                        <p>Vigilaro Care - Intelig\xEAncia de Prote\xE7\xE3o Familiar</p>
                    </div>
                </body>
                </html>
            `;
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Relat\xF3rio Vigilaro Care",
          UTI: "com.adobe.pdf"
        });
      } else {
        return uri;
      }
      return true;
    } catch (error) {
      if (__DEV__) {
        console.error("generatePDFReport error:", error);
      }
      throw error;
    }
  }
};
var SafetyReportService_default = new SafetyReportService();
