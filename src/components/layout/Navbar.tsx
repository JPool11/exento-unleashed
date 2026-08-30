import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { BrandMark, QuoteEventLink, ReserveTableLink } from "@/components/editorial/CtaLinks";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useReservationDialog } from "@/components/reservation/reservation-context";

function isActivePath(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openDialog } = useReservationDialog();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-gold-soft/20 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-gold focus:px-3 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 md:px-10">
        <Link to="/" aria-label={`${siteConfig.name} — inicio`} className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative font-sans text-[10px] uppercase tracking-[0.28em] transition-colors duration-300",
                isActivePath(pathname, item.to)
                  ? "text-gold"
                  : "text-ivory/80 hover:text-gold",
              )}
            >
              {item.label}
              {isActivePath(pathname, item.to) ? (
                <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" aria-hidden />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            className="btn-gold-outline h-9 px-4 text-[10px]"
            onClick={() => openDialog()}
          >
            Reservar
          </button>
          <ReserveTableLink className="h-9 px-4 text-[10px]" />
        </div>

        <button
          type="button"
          className="flex items-center gap-3 text-gold lg:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen(true)}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.32em]">Menú</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span className="h-px w-6 bg-gold" />
            <span className="h-px w-4 bg-gold-soft self-end" />
          </span>
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[min(100%,22rem)] border-l border-gold-soft/25 bg-background p-0 text-foreground [&>button.absolute]:hidden"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gold-soft/20 px-6 py-5">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <BrandMark className="h-12" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center text-gold"
                aria-label="Cerrar menú"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-6 py-8" aria-label="Móvil">
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "border-b border-gold-soft/10 py-3 font-display text-2xl text-ivory transition-colors hover:text-gold",
                    isActivePath(pathname, item.to) && "text-gold",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <ReserveTableLink />
              <QuoteEventLink />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
