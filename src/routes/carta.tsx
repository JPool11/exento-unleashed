import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { featuredMenuItems, formatPrice, getItemsByCategory, menuCategories } from "@/data/menu";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { ImageReveal } from "@/components/editorial/ImageReveal";
import { SectionHeading } from "@/components/editorial/Typography";
import { ReserveTableLink } from "@/components/editorial/CtaLinks";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/carta")({
  head: () =>
    pageHead({
      title: "Carta | Exento Gastrobar",
      description:
        "Carta de Exento. Entradas, platos, parrilla, cócteles y bebidas. La propuesta oficial se publicará con la apertura.",
      path: "/carta",
    }),
  component: CartaPage,
});

function CartaPage() {
  const [active, setActive] = useState(menuCategories[0].id);
  const items = useMemo(() => getItemsByCategory(active), [active]);
  const category = menuCategories.find((item) => item.id === active);

  return (
    <>
      <PageHero
        eyebrow="Carta"
        title="Una carta que todavía se está afinando."
        description="Esta vista adelanta la estructura. Nombres, precios y platos oficiales se publicarán con la carta definitiva."
        image={media.gastronomy.plate.src}
        imageAlt={media.gastronomy.plate.alt}
        compact
      />

      <div className="sticky top-[4.5rem] z-30 border-b border-gold-soft/20 bg-background/90 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 md:px-14"
          aria-label="Categorías de la carta"
        >
          {menuCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActive(item.id);
                document.getElementById("menu-seccion")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "shrink-0 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.28em] transition-colors",
                active === item.id ? "text-gold" : "text-muted-ink hover:text-gold",
              )}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-14">
        <p className="max-w-xl text-sm text-muted-ink">
          Destacados provisionales. Cada fotografía es temporal y será reemplazada por la cocina de Exento.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {featuredMenuItems.map((item) =>
            item.image ? (
              <article key={item.id} className="group">
                <ImageReveal src={item.image} alt={item.name} className="aspect-[16/10]" />
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl text-ivory">{item.name}</h2>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-ink">
                    {formatPrice(item.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-ink">{item.description}</p>
              </article>
            ) : null,
          )}
        </div>
      </section>

      <section id="menu-seccion" className="mx-auto max-w-3xl px-6 pb-24 md:px-14">
        <SectionHeading>{category?.name}</SectionHeading>
        <p className="mt-3 text-sm text-muted-ink">{category?.description}</p>
        <div className="mt-10 divide-y divide-gold-soft/20 border-y border-gold-soft/20">
          {items.map((item) => (
            <article key={item.id} className="flex items-start justify-between gap-6 py-6">
              <div>
                <h3 className="font-display text-2xl text-ivory">{item.name}</h3>
                {item.description ? (
                  <p className="mt-2 text-sm text-muted-ink">{item.description}</p>
                ) : null}
                {item.placeholder ? (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-gold/80">
                    Contenido provisional
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 pt-2 text-[10px] uppercase tracking-[0.18em] text-muted-ink">
                {formatPrice(item.price)}
              </span>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ReserveTableLink />
        </div>
      </section>
    </>
  );
}
