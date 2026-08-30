import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { TableReservationForm } from "@/components/reservation/TableReservationForm";

export const Route = createFileRoute("/reservar/mesa")({
  head: () =>
    pageHead({
      title: "Reservar mesa | Exento",
      description:
        "Solicita una mesa en Exento. Revisamos disponibilidad y te confirmamos. Esta solicitud no es una reserva automática.",
      path: "/reservar/mesa",
    }),
  component: ReservarMesaPage,
});

function ReservarMesaPage() {
  return (
    <>
      <PageHero
        eyebrow="Mesa"
        title="Una mesa en Exento."
        description="Envíanos la solicitud. Confirmamos disponibilidad; todavía no es una reserva cerrada."
        image={media.gastronomy.table.src}
        imageAlt={media.gastronomy.table.alt}
        compact
      />
      <section className="mx-auto max-w-2xl px-6 py-16 md:px-14">
        <TableReservationForm />
      </section>
    </>
  );
}
