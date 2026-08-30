/**
 * Configuración central de Exento.
 * Completar campos vacíos con información oficial — no inventar datos.
 */

const addressCoords = { lat: 2.264519, lng: -75.7994543 } as const;

export const siteConfig = {
  name: "Exento",
  tagline: "Sin Reglas",
  slogan: "Sin Reglas",
  establishmentYear: 2026,
  siteUrl: "https://exento.com.co",
  domain: "exento.com.co",

  description:
    "Gastrobar, restaurante y espacio de eventos. Gastronomía, coctelería y celebraciones sin reglas.",

  contact: {
    // TODO: completar información oficial de Exento
    phone: "",
    whatsapp: "",
    email: "",
  },

  address: {
    // Ubicación confirmada por el mapa ya configurado en el proyecto.
    name: "Exento — Sin Reglas",
    line: "El Pital, Huila, Colombia",
    city: "El Pital",
    department: "Huila",
    country: "Colombia",
    // SEO comercial usa Neiva como referencia de mercado (ver títulos).
    seoCity: "Neiva",
    ...addressCoords,
    mapUrl:
      "https://www.google.com/maps/place/Exento+-+Sin+Reglas/@2.264519,-75.7994543,17z/data=!3m1!4b1!4m6!3m5!1s0x8e25293661fd2975:0x67d0d6d37dd179c7!8m2!3d2.264519!4d-75.7994543!16s%2Fg%2F11nvfdptr2?hl=es-419",
    mapsEmbedUrl: `https://maps.google.com/maps?q=${addressCoords.lat},${addressCoords.lng}&hl=es&z=17&output=embed`,
  },

  social: {
    instagram: "https://www.instagram.com/exento_sinreglas/",
    instagramHandle: "@exento_sinreglas",
    facebook: "https://www.facebook.com/profile.php?id=61593381956846",
    tiktok: "https://www.tiktok.com/@exento_sinreglas",
    tiktokHandle: "@exento_sinreglas",
  },

  whatsapp: {
    // TODO: completar número oficial (formato internacional, solo dígitos, ej. 57300...)
    number: "",
    defaultMessage: "Hola, vi la página de Exento y quisiera recibir información.",
  },

  openingHours: {
    // TODO: completar horarios oficiales de Exento
    note: "Horario por confirmar. Escríbenos para conocer disponibilidad.",
    schema: [] as { days: string; opens: string; closes: string }[],
    display: [{ label: "Horario", value: "Por confirmar" }],
  },

  logos: {
    wordmarkLight: "/exento-logo-white.png",
    wordmarkDark: "/exento-logo-dark.png",
    markLight: "/exento-e-white.png",
    markDark: "/exento-e-dark.png",
    favicon: "/favicon.png",
  },

  ogImage: "https://exento.com.co/exento-logo-white.png",

  credits: {
    developer: "JPool Tech.",
    developerUrl: "https://www.jpooltech.com/",
    authorName: "Jhan Pool Agudelo Triana",
    authorUrl: "https://www.linkedin.com/in/jhan-pool-agudelo-triana-29500a225/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
