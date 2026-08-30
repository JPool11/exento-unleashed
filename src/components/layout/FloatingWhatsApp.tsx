import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { WhatsAppIcon } from "@/components/layout/SocialIcons";

export function FloatingWhatsApp() {
  if (!hasWhatsApp()) return null;
  const href = getWhatsAppUrl();
  if (!href) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir a Exento por WhatsApp"
          onClick={() => track("click_whatsapp")}
          className="fixed bottom-20 right-5 z-40 flex size-12 items-center justify-center rounded-full border border-gold-soft/60 bg-background/90 text-[#c8e6c9] shadow-[0_8px_30px_oklch(0.14_0.01_40/0.45)] backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:border-gold md:bottom-8 md:right-8"
        >
          <WhatsAppIcon className="size-5 text-gold" />
          <span className="sr-only">WhatsApp</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="left" className="border border-gold-soft/30 bg-background text-ivory">
        Escríbenos por WhatsApp
      </TooltipContent>
    </Tooltip>
  );
}

export function WhatsAppTextLink({ className }: { className?: string }) {
  const href = getWhatsAppUrl();
  if (!href) {
    return (
      <a
        href={siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <MessageCircle className="size-4" aria-hidden />
        Instagram
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("click_whatsapp")}
      className={className}
    >
      <WhatsAppIcon className="size-4" />
      WhatsApp
    </a>
  );
}
