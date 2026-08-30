import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { eventTypes } from "@/data/events";
import { media } from "@/data/media";
import { PageHero, CTASection } from "@/components/editorial/PageHero";
import { MediaImage } from "@/components/editorial/MediaImage";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/eventos/")({
  head: () =>
    pageHead({
      title: "Eventos en Neiva | Exento — Sin Reglas",
      description:
        "Celebra sin reglas. Cumpleaños, matrimonios, 15 años, grados, aniversarios, bautizos y cenas familiares en Exento.",
      path: "/eventos",
    }),
  component: EventosPage,
});

function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventos"
        title="Celebra sin reglas."
        description="Exento se adapta a celebraciones privadas y eventos. El espacio cambia; la hospitalidad, no."
        image={media.events.matrimonios.src}
        imageAlt={media.events.matrimonios.alt}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-14">
        <div className="grid gap-8 md:grid-cols-2">
          {eventTypes.map((event, index) => (
            <article
              key={event.slug}
              className={index === 0 ? "md:col-span-2 grid gap-6 md:grid-cols-2 md:items-center" : ""}
            >
              <Link
                to="/eventos/$categoria"
                params={{ categoria: event.slug }}
                className="group block overflow-hidden"
              >
                <div className={index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}>
                  <MediaImage
                    src={event.image}
                    alt={event.imageAlt}
                    className="transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                </div>
              </Link>
              <div className={index === 0 ? "" : "mt-5"}>
                <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-4xl text-ivory">{event.name}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-ink">{event.excerpt}</p>
                <Link
                  to="/eventos/$categoria"
                  params={{ categoria: event.slug }}
                  className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-gold"
                >
                  Conocer más <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection
        eyebrow="Cotización"
        title="Cuéntanos la celebración."
        primary={{ label: "Cotizar evento", to: "/reservar/evento" }}
        secondary={{ label: "Ver espacios", to: "/espacios" }}
      />
    </>
  );
}
