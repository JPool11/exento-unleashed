import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { GoldDivider } from "@/components/editorial/Typography";

export function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "w-full" : "mx-auto w-full max-w-4xl"}>
      <div className="mb-5 flex items-center justify-center gap-4 font-sans text-[10px] uppercase tracking-[0.5em] text-gold">
        <GoldDivider />
        Ubicación
        <GoldDivider />
      </div>
      <div className="group relative overflow-hidden rounded-md border border-gold-soft transition-colors duration-300 hover:border-gold">
        <iframe
          src={siteConfig.address.mapsEmbedUrl}
          className="pointer-events-none h-64 w-full border-0 md:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title="Ubicación de Exento en Google Maps"
          tabIndex={-1}
        />
        <a
          href={siteConfig.address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir ubicación de Exento en Google Maps"
          onClick={() => track("open_google_maps")}
          className="absolute inset-0 z-10"
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
        <div
          className="pointer-events-none absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-gold-soft px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.28em] text-gold transition-colors duration-300 group-hover:border-gold"
          style={{ backgroundColor: "oklch(0.18 0.012 40 / 0.9)" }}
        >
          <MapPin className="size-3.5" aria-hidden />
          Abrir en Google Maps
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a
          href={siteConfig.address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("open_google_maps")}
          className="btn-gold-outline"
        >
          <Navigation className="size-4" aria-hidden />
          Cómo llegar
        </a>
        <a
          href={siteConfig.address.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("open_google_maps")}
          className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.22em] text-muted-ink transition-colors hover:text-gold"
        >
          <ExternalLink className="size-3.5" aria-hidden />
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
}
