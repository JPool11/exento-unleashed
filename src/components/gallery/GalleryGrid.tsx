import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { galleryFilters, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { MediaImage } from "@/components/editorial/MediaImage";
import { cn } from "@/lib/utils";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<"todos" | GalleryCategory>("todos");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "todos" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );

  const close = () => setActive(null);
  const next = useCallback(() => {
    setActive((current) => (current == null ? current : (current + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setActive((current) =>
      current == null ? current : (current - 1 + filtered.length) % filtered.length,
    );
  }, [filtered.length]);

  useEffect(() => {
    if (active == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, next, prev]);

  return (
    <div>
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filtrar galería">
        {galleryFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              "shrink-0 border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.28em] transition-colors duration-300",
              filter === item.id
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold-soft/30 text-muted-ink hover:border-gold hover:text-gold",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
        {filtered.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "group relative overflow-hidden",
              item.span === "wide" && "col-span-2 md:col-span-8",
              item.span === "tall" && "col-span-1 md:col-span-4 md:row-span-2",
              item.span === "default" || !item.span
                ? "col-span-1 md:col-span-4"
                : "",
              item.span === "tall" ? "aspect-[3/4] md:aspect-auto md:min-h-[28rem]" : "aspect-[4/5] md:aspect-[5/4]",
            )}
            aria-label={`Ver fotografía: ${item.alt}`}
          >
            <MediaImage
              src={item.src}
              alt={item.alt}
              className="transition-transform duration-700 group-hover:scale-[1.05] motion-reduce:transform-none"
            />
            <span className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/20" />
          </button>
        ))}
      </div>

      <Dialog open={active != null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-w-5xl border-gold-soft/20 bg-background p-0 sm:rounded-none [&>button]:hidden">
          <DialogTitle className="sr-only">Galería de Exento</DialogTitle>
          {active != null && filtered[active] ? (
            <Lightbox
              item={filtered[active]}
              onClose={close}
              onNext={next}
              onPrev={prev}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Lightbox({
  item,
  onClose,
  onNext,
  onPrev,
}: {
  item: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [touch, setTouch] = useState<number | null>(null);

  return (
    <div
      className="relative"
      onTouchStart={(event) => setTouch(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touch == null) return;
        const delta = event.changedTouches[0].clientX - touch;
        if (delta > 40) onPrev();
        if (delta < -40) onNext();
        setTouch(null);
      }}
    >
      <img src={item.src} alt={item.alt} className="max-h-[80vh] w-full object-contain" />
      <p className="px-5 py-4 text-center text-sm text-muted-ink">{item.alt}</p>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 flex size-10 items-center justify-center bg-background/70 text-gold"
        aria-label="Cerrar"
      >
        <X className="size-4" />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-background/70 text-gold"
        aria-label="Anterior"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center bg-background/70 text-gold"
        aria-label="Siguiente"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
