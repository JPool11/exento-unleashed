import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Utensils } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";

export const Route = createFileRoute("/reservar/")({
  head: () =>
    pageHead({
      title: "Reservar | Exento",
      description: "Reserva una mesa o cotiza un evento en Exento — Sin Reglas.",
      path: "/reservar",
    }),
  component: ReservarPage,
});

function ReservarPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservar"
        title="¿Qué quieres reservar?"
        description="Una mesa para la experiencia Exento, o un evento para celebrar sin reglas."
        image={media.hero.src}
        imageAlt={media.hero.alt}
        compact
      />
      <section className="mx-auto grid max-w-4xl gap-6 px-6 py-20 sm:grid-cols-2 md:px-14">
        <Link
          to="/reservar/mesa"
          className="border border-gold-soft/30 p-8 transition-colors duration-300 hover:border-gold"
        >
          <Utensils className="size-6 text-gold" aria-hidden />
          <h2 className="mt-6 font-display text-3xl text-ivory">Una mesa</h2>
          <p className="mt-3 text-sm text-muted-ink">Para disfrutar la experiencia Exento.</p>
        </Link>
        <Link
          to="/reservar/evento"
          className="border border-gold-soft/30 p-8 transition-colors duration-300 hover:border-gold"
        >
          <CalendarDays className="size-6 text-gold" aria-hidden />
          <h2 className="mt-6 font-display text-3xl text-ivory">Un evento</h2>
          <p className="mt-3 text-sm text-muted-ink">
            Para cumpleaños, matrimonios y celebraciones.
          </p>
        </Link>
      </section>
    </>
  );
}
