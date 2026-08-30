/**
 * Imágenes temporales de alta calidad.
 * TODO: reemplazar cada ruta con fotografía oficial de Exento.
 * Mantener las claves; solo cambiar `src` y `alt` cuando existan archivos definitivos.
 */

function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=72`;
}

export const media = {
  hero: {
    src: "/exento-hero.jpg",
    alt: "Fachada nocturna de Exento con letrero iluminado, entrada y jardín",
    // TODO: video cinematográfico oficial de Exento
    video: undefined as string | undefined,
  },
  intro: {
    src: unsplash("photo-1559339352-11d035aa65de", 1400),
    alt: "Mesa servida en un restaurante con luz baja — imagen temporal",
  },
  spaces: {
    "espacio-01": {
      src: unsplash("photo-1517248135467-4c7edcad34c4", 1400),
      alt: "Salón principal de restaurante — imagen temporal",
    },
    "espacio-02": {
      src: unsplash("photo-1555396273-367ea4eb4db5", 1400),
      alt: "Comedor contemporáneo — imagen temporal",
    },
    "espacio-03": {
      src: unsplash("photo-1470337458703-46ad1756a187", 1400),
      alt: "Barra de coctelería con iluminación íntima — imagen temporal",
    },
    "espacio-04": {
      src: unsplash("photo-1566417713940-fe7c737a9ef2", 1400),
      alt: "Espacio nocturno para celebraciones — imagen temporal",
    },
  },
  gastronomy: {
    plate: {
      src: unsplash("photo-1414235077428-338989a2e8c0", 1400),
      alt: "Plato de cocina contemporánea — imagen temporal",
    },
    grill: {
      src: unsplash("photo-1544025162-d76690232d66", 1400),
      alt: "Preparación a la parrilla — imagen temporal",
    },
    cocktail: {
      src: unsplash("photo-1514362545857-3bc16c4c7d1b", 1400),
      alt: "Cóctel servido en barra — imagen temporal",
    },
    bartender: {
      src: unsplash("photo-1572116469696-31de0f17cc34", 1400),
      alt: "Bartender preparando una bebida — imagen temporal",
    },
    table: {
      src: unsplash("photo-1424847651672-bf20a4b2726a", 1400),
      alt: "Mesa compartida en un restaurante — imagen temporal",
    },
  },
  events: {
    cumpleanos: {
      src: unsplash("photo-1464349095431-bbdf18b25aa2", 1400),
      alt: "Celebración de cumpleaños — imagen temporal",
    },
    matrimonios: {
      src: unsplash("photo-1519167758481-83f550bb49b3", 1400),
      alt: "Salón preparado para un matrimonio — imagen temporal",
    },
    "15-anos": {
      src: unsplash("photo-1519741497674-611481863552", 1400),
      alt: "Celebración formal — imagen temporal",
    },
    grados: {
      src: unsplash("photo-1523050854058-8df90110c9f1", 1400),
      alt: "Celebración de grado — imagen temporal",
    },
    aniversarios: {
      src: unsplash("photo-1522673607200-164e1b6ac4e1", 1400),
      alt: "Cena de aniversario — imagen temporal",
    },
    bautizos: {
      src: unsplash("photo-1511285560929-80b456fea0bc", 1400),
      alt: "Celebración familiar — imagen temporal",
    },
    "cena-familiar": {
      src: unsplash("photo-1414235077428-338989a2e8c0", 1400),
      alt: "Cena familiar en restaurante — imagen temporal",
    },
  },
  gallery: {
    food1: unsplash("photo-1551218808-94e220e084d2", 1200),
    food2: unsplash("photo-1504674900247-0877df9cc836", 1200),
    cocktail2: unsplash("photo-1551024709-8f23befc6f87", 1200),
    eventSetup: unsplash("photo-1464366400600-7168b8af9bc3", 1200),
  },
  about: {
    src: unsplash("photo-1559339352-11d035aa65de", 1600),
    alt: "Ambiente de hospitalidad — imagen temporal",
  },
  texture: {
    src: unsplash("photo-1566417713940-fe7c737a9ef2", 1400),
    alt: "",
  },
} as const;
