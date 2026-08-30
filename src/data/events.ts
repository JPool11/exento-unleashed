import { media } from "@/data/media";
import { spaces } from "@/data/spaces";

export interface EventType {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  heroTitle: string;
  excerpt: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  configurations: string[];
  services: string[];
  quoteCategoryId: string;
}

export const eventTypes: EventType[] = [
  {
    id: "cumpleanos",
    slug: "cumpleanos",
    name: "Cumpleaños",
    shortName: "Cumpleaños",
    heroTitle: "Otra vuelta al sol, sin el guion de siempre.",
    excerpt: "Cumpleaños con mesa, brindis y una noche que se siente distinta.",
    description:
      "En Exento un cumpleaños puede ser una cena íntima o una celebración que ocupa el salón. Adaptamos el espacio, la gastronomía y el ritmo de la noche a quienes se sientan a la mesa.",
    image: media.events.cumpleanos.src,
    imageAlt: media.events.cumpleanos.alt,
    gallery: [
      { src: media.events.cumpleanos.src, alt: media.events.cumpleanos.alt },
      { src: media.gastronomy.table.src, alt: media.gastronomy.table.alt },
      { src: media.gastronomy.cocktail.src, alt: media.gastronomy.cocktail.alt },
    ],
    configurations: [
      "Cena íntima",
      "Mesa de celebración",
      "Formato cocktail",
    ],
    services: ["Gastronomía", "Coctelería", "Espacio privado según disponibilidad"],
    quoteCategoryId: "cumpleanos",
  },
  {
    id: "matrimonios",
    slug: "matrimonios",
    name: "Matrimonios",
    shortName: "Matrimonios",
    heroTitle: "Tu historia merece una celebración fuera de lo común.",
    excerpt: "Una boda con carácter: mesa, luz y una noche que no se parece a ninguna otra.",
    description:
      "Exento puede ser el escenario de una celebración nupcial con identidad propia. Trabajamos la atmósfera, la mesa y los espacios para que el día se sienta cercano, elegante y memorable.",
    image: media.events.matrimonios.src,
    imageAlt: media.events.matrimonios.alt,
    gallery: [
      { src: media.events.matrimonios.src, alt: media.events.matrimonios.alt },
      { src: media.spaces["espacio-02"].src, alt: media.spaces["espacio-02"].alt },
      { src: media.gallery.eventSetup, alt: "Montaje de celebración — imagen temporal" },
    ],
    configurations: ["Ceremonia y recepción según disponibilidad", "Cena formal", "Celebración nocturna"],
    services: ["Gastronomía", "Bebidas", "Personalización del espacio"],
    quoteCategoryId: "matrimonio",
  },
  {
    id: "15-anos",
    slug: "15-anos",
    name: "15 años",
    shortName: "15 años",
    heroTitle: "Una noche que se recuerda con nombre propio.",
    excerpt: "Quince años con presencia, mesa y una energía que no se siente prestada.",
    description:
      "Una celebración de 15 años en Exento busca equilibrio: solemnidad cuando hace falta, fiesta cuando la noche lo pide. El espacio se viste de la ocasión, no de una plantilla.",
    image: media.events["15-anos"].src,
    imageAlt: media.events["15-anos"].alt,
    gallery: [
      { src: media.events["15-anos"].src, alt: media.events["15-anos"].alt },
      { src: media.spaces["espacio-04"].src, alt: media.spaces["espacio-04"].alt },
      { src: media.gastronomy.cocktail.src, alt: media.gastronomy.cocktail.alt },
    ],
    configurations: ["Recepción", "Cena", "Celebración con música"],
    services: ["Gastronomía", "Coctelería", "Acompañamiento del evento"],
    quoteCategoryId: "15-anos",
  },
  {
    id: "grados",
    slug: "grados",
    name: "Grados",
    shortName: "Grados",
    heroTitle: "El logro se celebra mejor en buena mesa.",
    excerpt: "Grados con brindis, fotografía y una noche para quienes importan.",
    description:
      "Un grado merece más que un salón genérico. En Exento la celebración puede ir de una cena familiar a un evento con invitados, siempre con gastronomía y atmósfera.",
    image: media.events.grados.src,
    imageAlt: media.events.grados.alt,
    gallery: [
      { src: media.events.grados.src, alt: media.events.grados.alt },
      { src: media.gastronomy.table.src, alt: media.gastronomy.table.alt },
      { src: media.spaces["espacio-01"].src, alt: media.spaces["espacio-01"].alt },
    ],
    configurations: ["Cena familiar", "Recepción de invitados", "Brindis"],
    services: ["Menú de celebración", "Bebidas", "Espacios flexibles"],
    quoteCategoryId: "grado",
  },
  {
    id: "aniversarios",
    slug: "aniversarios",
    name: "Aniversarios",
    shortName: "Aniversarios",
    heroTitle: "Volver al mismo lugar, en otro tiempo.",
    excerpt: "Aniversarios íntimos o con mesa amplia, siempre con detalle.",
    description:
      "Un aniversario pide calma, luz y una mesa que acompañe. Puede ser una cita a dos o una reunión de quienes han estado ahí desde el principio.",
    image: media.events.aniversarios.src,
    imageAlt: media.events.aniversarios.alt,
    gallery: [
      { src: media.events.aniversarios.src, alt: media.events.aniversarios.alt },
      { src: media.gastronomy.plate.src, alt: media.gastronomy.plate.alt },
      { src: media.gastronomy.cocktail.src, alt: media.gastronomy.cocktail.alt },
    ],
    configurations: ["Cena para dos", "Mesa familiar", "Celebración privada"],
    services: ["Gastronomía", "Coctelería", "Atención de hospitalidad"],
    quoteCategoryId: "aniversario",
  },
  {
    id: "bautizos",
    slug: "bautizos",
    name: "Bautizos",
    shortName: "Bautizos",
    heroTitle: "Una mesa para la familia que se agranda.",
    excerpt: "Bautizos y celebraciones familiares con calidez, no con protocolo rígido.",
    description:
      "Las celebraciones familiares encuentran en Exento un espacio cercano: mesa, atención y un ritmo que permite estar presentes. Detalles de montaje y gastronomía se conversan en la cotización.",
    image: media.events.bautizos.src,
    imageAlt: media.events.bautizos.alt,
    gallery: [
      { src: media.events.bautizos.src, alt: media.events.bautizos.alt },
      { src: media.gastronomy.table.src, alt: media.gastronomy.table.alt },
      { src: media.spaces["espacio-02"].src, alt: media.spaces["espacio-02"].alt },
    ],
    configurations: ["Almuerzo o cena familiar", "Recepción", "Celebración íntima"],
    services: ["Gastronomía", "Bebidas", "Espacio familiar"],
    quoteCategoryId: "bautizo",
  },
  {
    id: "cena-familiar",
    slug: "cena-familiar",
    name: "Cena Familiar",
    shortName: "Cena Familiar",
    heroTitle: "La mesa grande, sin prisa.",
    excerpt: "Cenas familiares para reunir a los que importan, con cocina y tiempo.",
    description:
      "Una cena familiar en Exento es una mesa que se comparte: platos, copas y una atmósfera que invita a quedarse. Ideal cuando el motivo es simplemente estar juntos.",
    image: media.events["cena-familiar"].src,
    imageAlt: media.events["cena-familiar"].alt,
    gallery: [
      { src: media.events["cena-familiar"].src, alt: media.events["cena-familiar"].alt },
      { src: media.gastronomy.grill.src, alt: media.gastronomy.grill.alt },
      { src: media.spaces["espacio-01"].src, alt: media.spaces["espacio-01"].alt },
    ],
    configurations: ["Mesa larga", "Menú para compartir", "Horario de cena"],
    services: ["Gastronomía", "Bebidas", "Atención de mesa"],
    quoteCategoryId: "cena-familiar",
  },
];

export const featuredEventSlugs = [
  "cumpleanos",
  "matrimonios",
  "15-anos",
  "grados",
  "aniversarios",
] as const;

export function getEventBySlug(slug: string) {
  return eventTypes.find((event) => event.slug === slug);
}

export function getEventSpaces() {
  return spaces.map((space) => ({
    id: space.id,
    name: space.name,
    shortDescription: space.shortDescription,
    capacity: space.capacity,
  }));
}
