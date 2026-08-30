import { Link } from "@tanstack/react-router";
import { UtensilsCrossed } from "lucide-react";
import { getWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "@/components/layout/SocialIcons";
import { cn } from "@/lib/utils";

const fabClass =
  "flex h-12 items-center gap-2.5 rounded-full border border-gold-soft/60 bg-background/90 px-4 shadow-[0_8px_30px_oklch(0.14_0.01_40/0.45)] backdrop-blur-md transition-[transform,border-color] duration-300 hover:scale-[1.02] hover:border-gold";

const labelClass = "font-sans text-[10px] uppercase tracking-[0.22em] text-ivory";

export function FloatingActions() {
  const whatsappHref = hasWhatsApp() ? getWhatsAppUrl() : siteConfig.social.instagram;

  return (
    <div
      className="fixed bottom-20 right-5 z-40 flex flex-col-reverse items-end gap-3 md:bottom-8 md:right-8"
      aria-label="Acciones rápidas"
    >
      <a
        href={whatsappHref ?? siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir a Exento por WhatsApp"
        onClick={() => track("click_whatsapp")}
        className={cn(fabClass, "text-[#c8e6c9]")}
      >
        <WhatsAppIcon className="size-5 shrink-0 text-gold" />
        <span className={labelClass}>Escríbenos por WhatsApp</span>
      </a>

      <Link
        to="/carta"
        aria-label="Ver menú del día"
        onClick={() => track("click_carta")}
        className={cn(fabClass, "text-gold")}
      >
        <UtensilsCrossed className="size-5 shrink-0" aria-hidden />
        <span className={labelClass}>Menú del día</span>
      </Link>
    </div>
  );
}
