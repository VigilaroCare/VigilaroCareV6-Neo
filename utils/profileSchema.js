// utils/profileSchema.js

export const createProfile = ({
  nome,
  tipo = "pessoa", // pessoa ou pet
  idade = null,
  especie = null, // usados se pet
  foto = null,
}) => {
  const categorizacao = idade !== null
    ? idade <= 2
      ? "bebê"
      : idade <= 12
      ? "criança"
      : idade <= 17
      ? "adolescente"
      : idade <= 59
      ? "adulto"
      : "idoso"
    : tipo === "pet"
    ? especie || "pet"
    : "não definido";

  return {
    id: Date.now().toString(),
    nome: nome.trim(),
    tipo, // pessoa ou pet
    idade,
    especie,
    categoria: categorizacao,
    emoji:
      tipo === "pet"
        ? "🐾"
        : idade <= 2
        ? "👶"
        : idade <= 12
        ? "👧"
        : idade <= 17
        ? "🧑"
        : idade <= 59
        ? "👨"
        : "🧓",
    foto, // futuramente URL
    criadoEm: new Date().toISOString(),
    preferencias: {
      notificacoes: true,
      alertasRisco: true,
      assistenteIA: true,
    },
    saude: {
      alergias: [],
      restricoes: [],
      medicamentos: [],
    },
    historico: [],
  };
};
