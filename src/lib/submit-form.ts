import { getWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";

export type FormStatus = "idle" | "validating" | "submitting" | "success" | "error";

export type LeadKind = "mesa" | "evento" | "contacto";

export interface LeadPayload {
  kind: LeadKind;
  fields: Record<string, string | string[] | number | undefined>;
}

const STORAGE_KEY = "exento:leads";

function persistLead(payload: LeadPayload) {
  if (typeof window === "undefined") return;
  try {
    const prev = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as LeadPayload[];
    prev.push({ ...payload, fields: { ...payload.fields, submittedAt: new Date().toISOString() } });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(prev.slice(-20)));
  } catch {
    // ignore storage errors
  }
}

function formatLeadMessage(payload: LeadPayload) {
  const title =
    payload.kind === "mesa"
      ? "Solicitud de reserva de mesa"
      : payload.kind === "evento"
        ? "Solicitud de cotización de evento"
        : "Mensaje desde la web de Exento";

  const lines = Object.entries(payload.fields)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      const printed = Array.isArray(value) ? value.join(", ") : String(value);
      return `${label}: ${printed}`;
    });

  return `Hola, vi la página de Exento y quisiera enviar esta solicitud.\n\n${title}\n${lines.join("\n")}`;
}

/**
 * Adaptador de envío. Sustituir por API/backend cuando exista.
 * Hoy: persiste en sesión y abre WhatsApp si hay número configurado.
 * Nunca confirma disponibilidad ni una reserva.
 */
export async function submitLead(payload: LeadPayload): Promise<{ channel: "whatsapp" | "stored" }> {
  persistLead(payload);

  if (hasWhatsApp()) {
    const url = getWhatsAppUrl(formatLeadMessage(payload));
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return { channel: "whatsapp" };
    }
  }

  return { channel: "stored" };
}

export const formCopy = {
  error: "Revisa los campos marcados antes de continuar.",
  success:
    "Recibimos tu solicitud. Nuestro equipo se pondrá en contacto contigo para revisar disponibilidad y detalles.",
  successNoChannel:
    "Guardamos tu solicitud. Mientras habilitamos el canal de reservas, escríbenos por Instagram o Facebook para confirmar disponibilidad.",
  notConfirmed: "Esta solicitud no es una reserva confirmada.",
};
