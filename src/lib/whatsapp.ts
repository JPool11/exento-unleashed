import { siteConfig } from "@/config/site";

export function getWhatsAppNumber() {
  return siteConfig.whatsapp.number.replace(/\D/g, "");
}

export function hasWhatsApp() {
  return getWhatsAppNumber().length >= 10;
}

export function getWhatsAppUrl(message: string = siteConfig.whatsapp.defaultMessage) {
  const number = getWhatsAppNumber();
  if (!number) return null;
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}
