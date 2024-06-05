export const parseGenre = (genre: number) => {
  return {
    28: {
      name: "Ação",
    },
    12: {
      name: "Aventura",
    },
    16: {
      name: "Animação",
    },
    35: {
      name: "Comédia",
    },
    80: {
      name: "Crime",
    },
    99: {
      name: "Documentário",
    },
    18: {
      name: "Drama",
    },
    10751: {
      name: "Família",
    },
    14: {
      name: "Fantasia",
    },
    36: {
      name: "História",
    },
    27: {
      name: "Terror",
    },
    10402: {
      name: "Música",
    },
    9648: {
      name: "Mistério",
    },
    10749: {
      name: "Romance",
    },
    878: {
      name: "Ficção científica",
    },
    10770: {
      name: "Cinema TV",
    },
    53: {
      name: "Thriller",
    },
    10752: {
      name: "Guerra",
    },
    37: {
      name: "Faroeste",
    },
  }[genre];
};
