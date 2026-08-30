import { media } from "@/data/media";

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  image?: string;
  category: string;
  featured?: boolean;
  available?: boolean;
  placeholder?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
}

export const menuCategories: MenuCategory[] = [
  { id: "entradas", name: "Entradas", description: "Para abrir mesa y conversación." },
  { id: "platos-fuertes", name: "Platos fuertes", description: "Cocina para quedarse." },
  { id: "parrilla", name: "Parrilla", description: "Fuego, tiempo y compartir." },
  { id: "hamburguesas", name: "Hamburguesas", description: "Una lectura más libre de la mesa." },
  { id: "postres", name: "Postres", description: "El cierre dulce de la noche." },
  { id: "cocteles", name: "Cócteles", description: "La barra, sin reglas rígidas." },
  { id: "licores", name: "Licores", description: "Selección para brindar." },
  { id: "cervezas", name: "Cervezas", description: "Acompañamiento de mesa y barra." },
  { id: "bebidas", name: "Bebidas", description: "Sin alcohol, con el mismo cuidado." },
];

/**
 * Carta provisional: estructura lista para CMS/API.
 * TODO: reemplazar con la carta oficial de Exento. No son platos confirmados.
 */
export const menuItems: MenuItem[] = [
  {
    id: "entrada-temporada",
    name: "Entrada de temporada",
    description: "Una apertura de mesa que cambia con el mercado. Detalle oficial por confirmar.",
    category: "entradas",
    featured: true,
    image: media.gastronomy.plate.src,
    available: true,
    placeholder: true,
  },
  {
    id: "para-compartir",
    name: "Para compartir",
    description: "Platos pensados para el centro de la mesa. Nombres y porciones se publicarán con la carta definitiva.",
    category: "entradas",
    available: true,
    placeholder: true,
  },
  {
    id: "cocina-autor",
    name: "Cocina de la casa",
    description: "Propuestas principales para almuerzo y cena. La receta oficial se anunciará con la apertura de carta.",
    category: "platos-fuertes",
    featured: true,
    image: media.gallery.food2,
    available: true,
    placeholder: true,
  },
  {
    id: "plato-firma",
    name: "Plato de autor",
    description: "El plato que definirá la cocina de Exento. En preparación.",
    category: "platos-fuertes",
    available: true,
    placeholder: true,
  },
  {
    id: "parrilla-corte",
    name: "Cortes a la parrilla",
    description: "Fuego y punto. Cortes y acompañamientos por confirmar.",
    category: "parrilla",
    featured: true,
    image: media.gastronomy.grill.src,
    available: true,
    placeholder: true,
  },
  {
    id: "parrilla-compartir",
    name: "Parrilla para la mesa",
    description: "Formato para compartir. Disponibilidad según temporada.",
    category: "parrilla",
    available: true,
    placeholder: true,
  },
  {
    id: "burger-casa",
    name: "Hamburguesa de la casa",
    description: "Una lectura de gastrobar. Receta y precio oficiales por publicar.",
    category: "hamburguesas",
    available: true,
    placeholder: true,
  },
  {
    id: "postre-casa",
    name: "Dulce de cierre",
    description: "Postres de casa. Carta dulce en preparación.",
    category: "postres",
    available: true,
    placeholder: true,
  },
  {
    id: "coctel-autor",
    name: "Cóctel de autor",
    description: "La barra de Exento, todavía en secreto. Pronto en carta.",
    category: "cocteles",
    featured: true,
    image: media.gastronomy.cocktail.src,
    available: true,
    placeholder: true,
  },
  {
    id: "coctel-clasicos",
    name: "Clásicos revisitados",
    description: "Una selección de clásicos con la lectura de la casa.",
    category: "cocteles",
    available: true,
    placeholder: true,
  },
  {
    id: "licores-seleccion",
    name: "Selección de licores",
    description: "Lista de destilados por confirmar.",
    category: "licores",
    available: true,
    placeholder: true,
  },
  {
    id: "cerveza-carta",
    name: "Cervezas de carta",
    description: "Referencias de barril y botella se publicarán con la carta de bebidas.",
    category: "cervezas",
    available: true,
    placeholder: true,
  },
  {
    id: "bebidas-casa",
    name: "Bebidas de la casa",
    description: "Opciones sin alcohol, jugos y refrescos de acompañamiento.",
    category: "bebidas",
    available: true,
    placeholder: true,
  },
];

export const featuredMenuItems = menuItems.filter((item) => item.featured);

export function getItemsByCategory(categoryId: string) {
  return menuItems.filter((item) => item.category === categoryId && item.available !== false);
}

export function formatPrice(price?: number) {
  if (price == null) return "Precio por confirmar";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
}
