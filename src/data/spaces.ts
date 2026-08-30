import { media } from "@/data/media";

export interface Space {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  capacity?: number;
  images: string[];
  imageAlts: string[];
  features: string[];
  recommendedEvents: string[];
}

export const spaces: Space[] = [
  {
    id: "espacio-01",
    // TODO: reemplazar con el nombre oficial del espacio
    name: "Espacio 01",
    shortDescription: "El corazón social de Exento.",
    description:
      "Un salón pensado para la conversación, la mesa larga y las noches que se alargan. Ideal para cenas y celebraciones íntimas que piden atmósfera, no protocolo.",
    images: [media.spaces["espacio-01"].src, media.gastronomy.table.src],
    imageAlts: [media.spaces["espacio-01"].alt, media.gastronomy.table.alt],
    features: ["Ambiente social", "Iluminación íntima", "Pensado para compartir"],
    recommendedEvents: ["Cenas", "Cumpleaños", "Aniversarios"],
  },
  {
    id: "espacio-02",
    name: "Espacio 02",
    shortDescription: "Para reuniones que merecen escenario.",
    description:
      "Una sala con presencia: suficiente para reunir a los invitados, contenida para que la experiencia siga sintiéndose cercana. Un lugar para celebrar sin perder el detalle.",
    images: [media.spaces["espacio-02"].src, media.events.matrimonios.src],
    imageAlts: [media.spaces["espacio-02"].alt, media.events.matrimonios.alt],
    features: ["Composición abierta", "Apto para celebraciones", "Atención de hospitalidad"],
    recommendedEvents: ["Matrimonios", "Grados", "15 años"],
  },
  {
    id: "espacio-03",
    name: "Espacio 03",
    shortDescription: "Donde la coctelería toma el pulso de la noche.",
    description:
      "Un rincón más cercano a la barra: luz baja, copas y una energía que invita a quedarse. Pensado para after, brindis y noches con carácter.",
    images: [media.spaces["espacio-03"].src, media.gastronomy.cocktail.src],
    imageAlts: [media.spaces["espacio-03"].alt, media.gastronomy.cocktail.alt],
    features: ["Barra y coctelería", "Atmósfera nocturna", "Formato más íntimo"],
    recommendedEvents: ["Brindis", "Citas", "After"],
  },
  {
    id: "espacio-04",
    name: "Espacio 04",
    shortDescription: "El escenario para las grandes ocasiones.",
    description:
      "El espacio más flexible para eventos que necesitan presencia, música y una mesa que recuerde. Se adapta a la celebración, no al revés.",
    images: [media.spaces["espacio-04"].src, media.gallery.eventSetup],
    imageAlts: [media.spaces["espacio-04"].alt, "Montaje de evento — imagen temporal"],
    features: ["Formato evento", "Mayor versatilidad", "Celebraciones privadas"],
    recommendedEvents: ["Eventos privados", "Cenas familiares", "Celebraciones"],
  },
];

export function getSpaceById(id: string) {
  return spaces.find((space) => space.id === id);
}
