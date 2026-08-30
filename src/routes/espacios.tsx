import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { spaces } from "@/data/spaces";
import { media } from "@/data/media";
import { PageHero, CTASection } from "@/components/editorial/PageHero";
import { SpaceBlock } from "@/components/sections/home";
import { ImageReveal } from "@/components/editorial/ImageReveal";

export const Route = createFileRoute("/espacios")({
  head: () =>
    pageHead({
      title: "Espacios | Exento — Sin Reglas",
      description:
        "Conoce los cuatro espacios de Exento en El Pital, Huila. Gastrobar, salón y escenarios para celebrar.",
      path: "/espacios",
    }),
  component: EspaciosPage,
});

function EspaciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Espacios"
        title="Cuatro maneras de habitar la noche."
        description="Cada espacio tiene su propio pulso. El nombre oficial se confirmará; la atmósfera, no."
        image={media.spaces["espacio-01"].src}
        imageAlt={media.spaces["espacio-01"].alt}
      />
      <section className="mx-auto max-w-7xl space-y-24 px-6 py-20 md:px-14">
        {spaces.map((space, index) => (
          <div key={space.id}>
            <SpaceBlock space={space} reverse={index % 2 === 1} index={index} />
            {space.images[1] ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <ImageReveal src={space.images[1]} alt={space.imageAlts[1]} className="aspect-[16/10]" />
                <ImageReveal src={space.images[0]} alt={space.imageAlts[0]} className="aspect-[16/10]" />
              </div>
            ) : null}
          </div>
        ))}
      </section>
      <CTASection
        eyebrow="Reservas"
        title="Cuéntanos qué espacio imaginas."
        primary={{ label: "Cotizar evento", to: "/reservar/evento" }}
        secondary={{ label: "Reservar mesa", to: "/reservar/mesa" }}
      />
    </>
  );
}
