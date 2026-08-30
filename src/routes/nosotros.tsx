import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { Reveal } from "@/components/editorial/Reveal";
import { ImageReveal } from "@/components/editorial/ImageReveal";
import { SectionHeading, SectionLabel } from "@/components/editorial/Typography";
import { GoldOutlineLink, QuoteEventLink, ReserveTableLink } from "@/components/editorial/CtaLinks";

export const Route = createFileRoute("/nosotros")({
  head: () =>
    pageHead({
      title: "Nosotros | Exento — Sin Reglas",
      description:
        "Exento nació para quienes prefieren vivir sin reglas. Gastrobar, hospitalidad y celebración en El Pital, Huila.",
      path: "/nosotros",
    }),
  component: NosotrosPage,
});

function NosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nosotros"
        title="Exento nació para quienes prefieren vivir sin reglas."
        image={media.about.src}
        imageAlt={media.about.alt}
      />

      <section className="mx-auto max-w-3xl px-6 py-20 md:px-14">
        <SectionLabel>Historia</SectionLabel>
        <p className="mt-6 font-display text-2xl leading-relaxed text-ivory md:text-3xl">
          {/* TODO: completar historia oficial de Exento */}
          La historia de Exento se está escribiendo en El Pital, Huila. Una casa para la mesa, la
          copa y las celebraciones que no quieren sentirse genéricas.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-muted-ink">
          No inventamos fechas ni biografías. Cuando la familia de la casa quiera contar el origen
          con sus palabras, este espacio las recibirá. Mientras tanto, la promesa es clara:
          gastronomía, coctelería, ambiente y celebración, con hospitalidad de verdad.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 md:grid-cols-2 md:px-14">
        <Reveal>
          <ImageReveal src={media.gastronomy.plate.src} alt={media.gastronomy.plate.alt} className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={80} className="flex flex-col justify-center">
          <SectionLabel>Filosofía</SectionLabel>
          <SectionHeading className="mt-4">Cocina, barra, noche y gente.</SectionHeading>
          <p className="mt-5 text-sm leading-relaxed text-muted-ink">
            Exento no quiere parecer un restaurante de protocolo ni un salón de eventos de catálogo.
            Quiere sentirse como un lugar al que se vuelve: a comer, a brindar, a celebrar.
          </p>
        </Reveal>
      </section>

      <section className="px-6 py-8 md:px-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            {
              title: "Gastronomía",
              text: "Una cocina pensada para compartir. La carta oficial se publicará con calma, plato a plato.",
              image: media.gastronomy.grill,
            },
            {
              title: "Coctelería",
              text: "La barra como parte de la experiencia, no como un extra. Cócteles de autor, cuando la receta esté lista para mostrarse.",
              image: media.gastronomy.cocktail,
            },
            {
              title: "Celebración",
              text: "Espacios que se adaptan a la ocasión: cumpleaños, matrimonios, grados y cenas que importan.",
              image: media.events.matrimonios,
            },
          ].map((block) => (
            <article key={block.title}>
              <ImageReveal src={block.image.src} alt={block.image.alt} className="aspect-[4/3]" />
              <h2 className="mt-5 font-display text-3xl text-ivory">{block.title}</h2>
              <p className="mt-3 text-sm text-muted-ink">{block.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:px-14">
        <SectionLabel>Cuidado</SectionLabel>
        <SectionHeading className="mt-4">Sin reglas no significa sin cuidado.</SectionHeading>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-ink">
          Atención, calidad, hospitalidad y detalle. La libertad de la noche se sostiene en el
          oficio: una mesa bien puesta, una copa a tiempo, un salón que se siente preparado.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ReserveTableLink />
          <QuoteEventLink />
          <GoldOutlineLink to="/espacios">Ver espacios</GoldOutlineLink>
        </div>
      </section>
    </>
  );
}
