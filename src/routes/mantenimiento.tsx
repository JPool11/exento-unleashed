import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { WhatsAppTextLink } from "@/components/layout/FloatingWhatsApp";
import { GoldDivider } from "@/components/editorial/Typography";

export const Route = createFileRoute("/mantenimiento")({
  head: () =>
    pageHead({
      title: "Mantenimiento | Exento",
      description: "El sitio de Exento se encuentra temporalmente en mantenimiento.",
      path: "/mantenimiento",
      noIndex: true,
    }),
  component: MantenimientoPage,
});

function MantenimientoPage() {
  return (
    <main className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        <div className="mb-8 flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.5em] text-gold">
          <GoldDivider />
          Volvemos pronto
          <GoldDivider />
        </div>
        <img
          src={siteConfig.logos.wordmarkLight}
          alt={siteConfig.name}
          className="w-[min(78vw,420px)] select-none"
          draggable={false}
        />
        <h1 className="mt-10 font-display text-4xl font-light text-ivory md:text-5xl">
          Estamos preparando algo especial.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-ink">
          Nuestro sitio se encuentra temporalmente en mantenimiento. Muy pronto estaremos nuevamente
          disponibles.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <WhatsAppTextLink className="btn-gold" />
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline"
          >
            Instagram
          </a>
          <a
            href={siteConfig.address.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-outline"
          >
            <MapPin className="size-4" aria-hidden />
            Cómo llegar
          </a>
        </div>
        <SocialLinks className="mt-10" />
      </div>
    </main>
  );
}
