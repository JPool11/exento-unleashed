export const tableOccasions = [
  { id: "cena", label: "Cena" },
  { id: "cena-familiar", label: "Cena Familiar" },
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "aniversario", label: "Aniversario" },
  { id: "cita", label: "Cita" },
  { id: "reunion", label: "Reunión" },
  { id: "celebracion", label: "Celebración" },
  { id: "otro", label: "Otro" },
] as const;

export const eventCategories = [
  { id: "cumpleanos", label: "Cumpleaños" },
  { id: "matrimonio", label: "Matrimonio" },
  { id: "15-anos", label: "15 años" },
  { id: "grado", label: "Grado" },
  { id: "aniversario", label: "Aniversario" },
  { id: "bautizo", label: "Bautizo" },
  { id: "cena-familiar", label: "Cena Familiar" },
  { id: "otro", label: "Otro" },
] as const;

export const extraServices = [
  { id: "decoracion", label: "Decoración", enabled: true },
  { id: "torta", label: "Torta", enabled: true },
  { id: "musica", label: "Música", enabled: true },
  { id: "dj", label: "DJ", enabled: true },
  { id: "fotografia", label: "Fotografía", enabled: true },
  { id: "video", label: "Video", enabled: true },
  { id: "menu-especial", label: "Menú especial", enabled: true },
  { id: "cocteleria", label: "Coctelería", enabled: true },
  { id: "sonido", label: "Sonido", enabled: true },
  { id: "otro", label: "Otro", enabled: true },
] as const;

export const contactReasons = [
  { id: "informacion", label: "Información general" },
  { id: "reserva", label: "Reserva" },
  { id: "evento", label: "Evento" },
  { id: "carta", label: "Carta" },
  { id: "otro", label: "Otro" },
] as const;

export const reservationSettings = {
  // TODO: confirmar reglas oficiales de reserva
  minimumGuests: 1,
  maximumGuests: 12,
  defaultGuests: 2,
  provisionalHours: true,
  hoursNote: "Los horarios se confirmarán según disponibilidad.",
  openingHours: {
    // TODO: confirmar apertura oficial
    weekdays: { open: "18:00", close: "23:00" },
  },
  availableTimes: [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ],
  disabledDates: [] as string[],
};

export const enabledExtraServices = extraServices.filter((service) => service.enabled);
