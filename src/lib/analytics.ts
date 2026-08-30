export type AnalyticsEvent =
  | "click_whatsapp"
  | "click_reservar_mesa"
  | "click_cotizar_evento"
  | "click_carta"
  | "submit_reserva"
  | "submit_cotizacion"
  | "submit_contacto"
  | "open_google_maps"
  | "open_reservation_dialog";

export function track(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("exento:analytics", { detail: { event, payload } }));

  // TODO: integrar Google Analytics y Meta Pixel cuando existan IDs oficiales
  const w = window as Window & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  w.gtag?.("event", event, payload);
  w.fbq?.("trackCustom", event, payload);

  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, payload ?? {});
  }
}
