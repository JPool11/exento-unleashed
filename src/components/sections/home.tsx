import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { spaces } from "@/data/spaces";
import { eventTypes, featuredEventSlugs } from "@/data/events";
import { homeGalleryPreview } from "@/data/gallery";
import { featuredMenuItems, formatPrice } from "@/data/menu";
import { media } from "@/data/media";
import { MediaImage } from "@/components/editorial/MediaImage";
import { ImageReveal } from "@/components/editorial/ImageReveal";
import { Reveal } from "@/components/editorial/Reveal";
import { Eyebrow, SectionHeading, SectionLabel } from "@/components/editorial/Typography";
import { GoldOutlineLink, MenuLink, QuoteEventLink, ReserveTableLink } from "@/components/editorial/CtaLinks";
import { LocationMap } from "@/components/layout/LocationMap";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { cn } from "@/lib/utils";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {media.hero.video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={media.hero.src}
          >
            <source src={media.hero.video} type="video/mp4" />
          </video>
        ) : (
          <MediaImage src={media.hero.src} alt={media.hero.alt} priority />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.012 40 / 0.45) 0%, oklch(0.18 0.012 40 / 0.62) 40%, oklch(0.18 0.012 40 / 0.88) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-gold">
          {siteConfig.name} · {siteConfig.tagline}
        </p>
        <h1 className="mt-6 font-display text-6xl font-light tracking-wide text-ivory md:text-8xl">
          {siteConfig.name}
        </h1>
        <p className="mt-3 font-display text-2xl italic text-gold md:text-3xl">{siteConfig.tagline}</p>
        <p className="mt-8 max-w-xl font-display text-xl leading-relaxed text-ivory md:text-2xl">
          Gastronomía, coctelería y celebraciones sin reglas.
        </p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-ink">
          Un lugar para comer, brindar, celebrar y convertir cualquier momento en una experiencia.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ReserveTableLink />
          <QuoteEventLink />
        </div>
        <div className="mt-8">
          <MenuLink />
        </div>
        <a
          href="#introduccion"
          className="mt-16 inline-flex flex-col items-center gap-2 text-gold"
          aria-label="Desplazarse al contenido"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.42em]">Descubrir</span>
          <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
}

export function HomeIntro() {
  return (
    <section id="introduccion" className="px-6 py-24 md:px-14 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="justify-start">Exento · Sin reglas</Eyebrow>
          <SectionHeading>Hay noches que se olvidan. Otras se celebran en Exento.</SectionHeading>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-ink">
            Combinamos cocina, coctelería, ambiente y celebración en un mismo lugar. Un gastrobar
            para la mesa de todos los días y un espacio para las noches que merecen nombre propio.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <ImageReveal
            src={media.intro.src}
            alt={media.intro.alt}
            className="aspect-[4/3] w-full"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function HomeSpaces() {
  return (
    <section className="px-6 py-8 md:px-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Nuestros espacios</SectionLabel>
          <SectionHeading className="mt-4 max-w-3xl">Cuatro atmósferas. Una misma noche.</SectionHeading>
        </Reveal>
        <div className="mt-16 space-y-20">
          {spaces.map((space, index) => (
            <SpaceBlock key={space.id} space={space} reverse={index % 2 === 1} index={index} />
          ))}
        </div>
        <div className="mt-14">
          <GoldOutlineLink to="/espacios">
            Ver espacios
            <ArrowRight className="size-4" aria-hidden />
          </GoldOutlineLink>
        </div>
      </div>
    </section>
  );
}

export function SpaceBlock({
  space,
  reverse,
  index,
}: {
  space: (typeof spaces)[number];
  reverse?: boolean;
  index: number;
}) {
  return (
    <Reveal delay={index * 40}>
      <article
        className={cn(
          "grid items-center gap-8 lg:grid-cols-12 lg:gap-14",
          reverse && "lg:[&>div:first-child]:order-2",
        )}
      >
        <div className="lg:col-span-7">
          <ImageReveal
            src={space.images[0]}
            alt={space.imageAlts[0]}
            className={cn("w-full", index % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/5] max-h-[36rem]")}
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-4xl text-ivory md:text-5xl">{space.name}</h3>
          <p className="mt-2 font-display text-xl italic text-gold">{space.shortDescription}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-ink">{space.description}</p>
          {space.capacity ? (
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-gold">
              Capacidad: {space.capacity} personas
            </p>
          ) : (
            <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-ink">
              Capacidad por confirmar
            </p>
          )}
          <ul className="mt-5 space-y-1.5 text-sm text-ivory/90">
            {space.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="h-px w-4 bg-gold-soft" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-ink">
            Ideal para: {space.recommendedEvents.join(" · ")}
          </p>
          <Link
            to="/reservar/evento"
            search={{ espacio: space.id }}
            className="btn-gold mt-6"
          >
            Cotizar este espacio
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function HomeGastronomy() {
  const shots = [
    media.gastronomy.plate,
    media.gastronomy.grill,
    media.gastronomy.cocktail,
    media.gastronomy.bartender,
    media.gastronomy.table,
  ];

  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>Experiencia gastronómica</SectionLabel>
          <SectionHeading className="mt-4">Sabores que no necesitan reglas.</SectionHeading>
          <p className="mt-5 text-sm leading-relaxed text-muted-ink">
            Una propuesta pensada para compartir, descubrir y volver. Cocina y barra en el mismo
            pulso, sin recetas publicadas todavía: la carta oficial se revelará en su momento.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
          {shots.map((shot, index) => (
            <Reveal
              key={shot.src}
              delay={index * 60}
              className={cn(
                "overflow-hidden",
                index === 0 && "col-span-2 aspect-[4/5] md:col-span-3 md:row-span-2 md:aspect-auto md:min-h-[28rem]",
                index === 1 && "aspect-square md:col-span-3",
                index > 1 && "aspect-[4/3] md:col-span-2",
              )}
            >
              <ImageReveal src={shot.src} alt={shot.alt} className="h-full w-full" />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <GoldOutlineLink to="/carta">Descubrir la carta</GoldOutlineLink>
        </div>
      </div>
    </section>
  );
}

export function HomeMenuPreview() {
  return (
    <section className="px-6 py-16 md:px-14">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow className="justify-start">Carta</Eyebrow>
          <SectionHeading>Una mesa que todavía guarda secretos.</SectionHeading>
        </Reveal>
        <div className="mt-12 divide-y divide-gold-soft/20 border-y border-gold-soft/20">
          {featuredMenuItems.map((item) => (
            <div key={item.id} className="grid gap-6 py-8 md:grid-cols-12 md:items-center">
              {item.image ? (
                <div className="md:col-span-4">
                  <ImageReveal src={item.image} alt={item.name} className="aspect-[4/3]" />
                </div>
              ) : null}
              <div className={item.image ? "md:col-span-8" : "md:col-span-12"}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl text-ivory">{item.name}</h3>
                  <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-ink">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.description ? (
                  <p className="mt-3 max-w-xl text-sm text-muted-ink">{item.description}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <MenuLink />
        </div>
      </div>
    </section>
  );
}

export function HomeGallery() {
  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Galería</SectionLabel>
            <SectionHeading className="mt-4">La noche, en fotogramas.</SectionHeading>
          </div>
          <GoldOutlineLink to="/galeria">Ver galería</GoldOutlineLink>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {homeGalleryPreview.map((item, index) => (
            <Link
              key={item.id}
              to="/galeria"
              className={cn(
                "group overflow-hidden",
                index === 0 && "col-span-2 aspect-[16/10] md:col-span-2",
                index !== 0 && "aspect-square",
              )}
            >
              <MediaImage
                src={item.src}
                alt={item.alt}
                className="transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeEvents() {
  const featured = eventTypes.filter((event) =>
    featuredEventSlugs.includes(event.slug as (typeof featuredEventSlugs)[number]),
  );

  return (
    <section className="px-6 py-16 md:px-14">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow className="justify-start">Celebra en Exento</Eyebrow>
          <SectionHeading>Hay momentos que merecen algo más que una mesa.</SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {featured.map((event, index) => (
            <Link
              key={event.slug}
              to="/eventos/$categoria"
              params={{ categoria: event.slug }}
              className={cn(
                "group relative min-h-64 overflow-hidden",
                index === 0 && "md:col-span-2 md:min-h-80",
              )}
            >
              <MediaImage
                src={event.image}
                alt={event.imageAlt}
                className="transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-2xl text-ivory">{event.shortName}</p>
                <p className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] text-gold">
                  Conocer más <ChevronRight className="size-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <GoldOutlineLink to="/eventos">Ver todos los eventos</GoldOutlineLink>
          <QuoteEventLink />
        </div>
      </div>
    </section>
  );
}

export function HomeAbout() {
  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <ImageReveal src={media.about.src} alt={media.about.alt} className="aspect-[4/5]" />
        </Reveal>
        <Reveal delay={80}>
          <SectionLabel>Filosofía</SectionLabel>
          <SectionHeading className="mt-4">Exento nació para quienes prefieren vivir sin reglas.</SectionHeading>
          <p className="mt-6 text-sm leading-relaxed text-muted-ink">
            Sin reglas no significa sin cuidado. Significa hospitalidad atenta, cocina con pulso y
            una noche que no se siente prestada. La historia oficial de la casa se irá escribiendo
            con quienes se sienten a la mesa.
          </p>
          <GoldOutlineLink to="/nosotros" className="mt-8">
            Conocer más
          </GoldOutlineLink>
        </Reveal>
      </div>
    </section>
  );
}

export function HomeLocation() {
  return (
    <section className="px-6 py-16 md:px-14">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading>El Pital, Huila.</SectionHeading>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted-ink">
          {siteConfig.address.name}. Un punto en el mapa para comer, brindar y celebrar.
        </p>
      </div>
      <div className="mt-10">
        <LocationMap />
      </div>
    </section>
  );
}

export function HomeClose() {
  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow className="justify-center">Reservas y contacto</Eyebrow>
        <SectionHeading>La mesa, o la celebración.</SectionHeading>
        <p className="mx-auto mt-5 max-w-md text-sm text-muted-ink">
          Cuéntanos qué buscas. Confirmamos disponibilidad y detalles de forma directa.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ReserveTableLink />
          <QuoteEventLink />
        </div>
        <SocialLinks className="mt-10 justify-center" />
      </div>
    </section>
  );
}
