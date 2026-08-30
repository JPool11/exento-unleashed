import { media } from "@/data/media";

export type GalleryCategory = "espacios" | "gastronomia" | "cocteleria" | "eventos";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  span?: "default" | "wide" | "tall";
}

export const galleryFilters = [
  { id: "todos", label: "Todos" },
  { id: "espacios", label: "Espacios" },
  { id: "gastronomia", label: "Gastronomía" },
  { id: "cocteleria", label: "Coctelería" },
  { id: "eventos", label: "Eventos" },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: media.spaces["espacio-01"].src,
    alt: media.spaces["espacio-01"].alt,
    category: "espacios",
    span: "wide",
  },
  {
    id: "g2",
    src: media.gastronomy.plate.src,
    alt: media.gastronomy.plate.alt,
    category: "gastronomia",
    span: "tall",
  },
  {
    id: "g3",
    src: media.gastronomy.cocktail.src,
    alt: media.gastronomy.cocktail.alt,
    category: "cocteleria",
  },
  {
    id: "g4",
    src: media.events.matrimonios.src,
    alt: media.events.matrimonios.alt,
    category: "eventos",
    span: "wide",
  },
  {
    id: "g5",
    src: media.spaces["espacio-03"].src,
    alt: media.spaces["espacio-03"].alt,
    category: "espacios",
  },
  {
    id: "g6",
    src: media.gallery.food1,
    alt: "Cocina contemporánea — imagen temporal",
    category: "gastronomia",
  },
  {
    id: "g7",
    src: media.gastronomy.bartender.src,
    alt: media.gastronomy.bartender.alt,
    category: "cocteleria",
    span: "tall",
  },
  {
    id: "g8",
    src: media.gallery.eventSetup,
    alt: "Montaje de evento — imagen temporal",
    category: "eventos",
  },
  {
    id: "g9",
    src: media.gastronomy.grill.src,
    alt: media.gastronomy.grill.alt,
    category: "gastronomia",
    span: "wide",
  },
  {
    id: "g10",
    src: media.spaces["espacio-04"].src,
    alt: media.spaces["espacio-04"].alt,
    category: "espacios",
  },
  {
    id: "g11",
    src: media.gallery.cocktail2,
    alt: "Coctelería de autor — imagen temporal",
    category: "cocteleria",
  },
  {
    id: "g12",
    src: media.events.cumpleanos.src,
    alt: media.events.cumpleanos.alt,
    category: "eventos",
  },
  {
    id: "g13",
    src: media.gastronomy.table.src,
    alt: media.gastronomy.table.alt,
    category: "gastronomia",
  },
  {
    id: "g14",
    src: media.spaces["espacio-02"].src,
    alt: media.spaces["espacio-02"].alt,
    category: "espacios",
    span: "wide",
  },
  {
    id: "g15",
    src: media.hero.src,
    alt: media.hero.alt,
    category: "espacios",
    span: "tall",
  },
];

export const homeGalleryPreview = galleryItems.slice(0, 8);
