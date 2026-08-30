import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { galleryItems } from "@/data/gallery";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const Route = createFileRoute("/galeria")({
  head: () =>
    pageHead({
      title: "Galería | Exento — Sin Reglas",
      description:
        "Espacios, gastronomía, coctelería y eventos. Una mirada editorial a la experiencia Exento.",
      path: "/galeria",
    }),
  component: GaleriaPage,
});

function GaleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galería"
        title="Fotogramas de una noche sin reglas."
        description="Imágenes temporales de alta calidad. Serán reemplazadas por la fotografía oficial de Exento."
        image={media.hero.src}
        imageAlt={media.hero.alt}
        compact
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-14">
        <GalleryGrid items={galleryItems} />
      </section>
    </>
  );
}
