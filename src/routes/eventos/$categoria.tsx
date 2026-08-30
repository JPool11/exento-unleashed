import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { getEventBySlug, getEventSpaces } from "@/data/events";
import { PageHero } from "@/components/editorial/PageHero";
import { EventQuoteForm } from "@/components/reservation/EventQuoteForm";
import { ImageReveal } from "@/components/editorial/ImageReveal";
import { SectionHeading, SectionLabel } from "@/components/editorial/Typography";

export const Route = createFileRoute("/eventos/$categoria")({
  loader: ({ params }) => {
    const event = getEventBySlug(params.categoria);
    if (!event) throw notFound();
    return { event, spaces: getEventSpaces() };
  },
  head: ({ loaderData }) =>
    pageHead({
      title:
        loaderData?.event.slug === "matrimonios"
          ? "Matrimonios y Celebraciones en Neiva | Exento"
          : `${loaderData?.event.name ?? "Evento"} | Exento — Sin Reglas`,
      description: loaderData?.event.description ?? "Celebra en Exento.",
      path: `/eventos/${loaderData?.event.slug ?? ""}`,
    }),
  component: EventCategoryPage,
});

function EventCategoryPage() {
  const { event, spaces } = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow={event.name}
        title={event.heroTitle}
        description={event.excerpt}
        image={event.image}
        imageAlt={event.imageAlt}
      >
        <a href="#cotizar" className="btn-gold mt-8">
          Cotizar este evento
        </a>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12 md:px-14">
        <div className="md:col-span-7">
          <SectionLabel>La celebración</SectionLabel>
          <p className="mt-6 font-display text-2xl leading-relaxed text-ivory">{event.description}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {event.gallery.map((item) => (
              <ImageReveal key={item.src} src={item.src} alt={item.alt} className="aspect-[4/3]" />
            ))}
          </div>
        </div>
        <aside className="space-y-8 md:col-span-5">
          <div className="border border-gold-soft/30 p-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Configuraciones</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/90">
              {event.configurations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border border-gold-soft/30 p-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Servicios posibles</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/90">
              {event.services.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-ink">
              Gastronomía, bebidas, personalización y decoración se conversan en la cotización. Nada se da por incluido hasta confirmar.
            </p>
          </div>
          <div className="border border-gold-soft/30 p-6">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Espacios</p>
            <ul className="mt-4 space-y-3">
              {spaces.map((space) => (
                <li key={space.id}>
                  <p className="font-display text-xl text-ivory">{space.name}</p>
                  <p className="text-sm text-muted-ink">{space.shortDescription}</p>
                  <p className="text-xs text-muted-ink">
                    {space.capacity ? `Capacidad: ${space.capacity}` : "Capacidad por confirmar"}
                  </p>
                </li>
              ))}
            </ul>
            <Link to="/espacios" className="mt-4 inline-block text-[11px] uppercase tracking-[0.28em] text-gold">
              Ver espacios
            </Link>
          </div>
        </aside>
      </section>

      <section className="sticky bottom-20 z-30 px-6 md:bottom-8 md:px-14">
        <div className="mx-auto flex max-w-7xl justify-end">
          <a href="#cotizar" className="btn-gold shadow-lg">
            Cotizar este evento
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 md:px-14">
        <SectionHeading className="text-center">Cotizar {event.name.toLowerCase()}</SectionHeading>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-ink">
          Esta solicitud no confirma el evento. Revisamos disponibilidad y te escribimos.
        </p>
        <div className="mt-10">
          <EventQuoteForm defaultCategory={event.quoteCategoryId} />
        </div>
      </section>
    </>
  );
}
