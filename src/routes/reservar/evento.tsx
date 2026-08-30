import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { EventQuoteForm } from "@/components/reservation/EventQuoteForm";

type EventSearch = {
  categoria?: string;
  espacio?: string;
};

export const Route = createFileRoute("/reservar/evento")({
  validateSearch: (search: Record<string, unknown>): EventSearch => ({
    categoria: typeof search.categoria === "string" ? search.categoria : undefined,
    espacio: typeof search.espacio === "string" ? search.espacio : undefined,
  }),
  head: () =>
    pageHead({
      title: "Cotizar evento | Exento",
      description:
        "Solicita una cotización para celebrar en Exento. Cumpleaños, matrimonios, 15 años, grados y más.",
      path: "/reservar/evento",
    }),
  component: ReservarEventoPage,
});

function ReservarEventoPage() {
  const { categoria, espacio } = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Evento"
        title="Cotiza la noche que estás imaginando."
        description="Cuéntanos la ocasión. Revisamos espacio, fecha y detalles. No es una reserva confirmada."
        image={media.events.matrimonios.src}
        imageAlt={media.events.matrimonios.alt}
        compact
      />
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-14">
        <EventQuoteForm defaultCategory={categoria} defaultSpace={espacio} />
      </section>
    </>
  );
}
