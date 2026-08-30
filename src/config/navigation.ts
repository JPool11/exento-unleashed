export const mainNav = [
  { label: "Inicio", to: "/" },
  { label: "Espacios", to: "/espacios" },
  { label: "Galería", to: "/galeria" },
  { label: "Eventos", to: "/eventos" },
  { label: "Nosotros", to: "/nosotros" },
  { label: "Contacto", to: "/contacto" },
] as const;

export const footerNav = mainNav;

export const reservationNav = [
  { label: "Reservar mesa", to: "/reservar/mesa" },
  { label: "Cotizar evento", to: "/reservar/evento" },
] as const;
