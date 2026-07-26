import { createFileRoute } from "@tanstack/react-router";
import logoWhite from "@/assets/exento-logo-white.png.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 30%, oklch(0.32 0.05 60 / 0.55), transparent 70%), radial-gradient(50% 40% at 50% 100%, oklch(0.24 0.03 50 / 0.6), transparent 70%)",
        }}
      />
      {/* Subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 pt-8 md:px-14 md:pt-10">
          <span
            className="font-sans text-[10px] uppercase tracking-[0.42em]"
            style={{ color: "var(--gold)" }}
          >
            Est. 2026
          </span>
          <span
            className="font-sans text-[10px] uppercase tracking-[0.42em]"
            style={{ color: "var(--muted-ink)" }}
          >
            Gastrobar · Eventos
          </span>
        </header>

        {/* Center */}
        <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div
            className="mb-8 flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "var(--gold)" }}
          >
            <span className="h-px w-10" style={{ backgroundColor: "var(--gold-soft)" }} />
            Próximamente
            <span className="h-px w-10" style={{ backgroundColor: "var(--gold-soft)" }} />
          </div>

          <img
            src={logoWhite.url}
            alt="Exento"
            className="mx-auto w-[min(78vw,620px)] select-none"
            draggable={false}
          />

          <p
            className="mt-6 font-display text-lg italic md:text-xl"
            style={{ color: "var(--gold)" }}
          >
            — Próximamente —
          </p>

          <p
            className="mt-10 max-w-xl font-display text-xl leading-relaxed md:text-2xl"
            style={{ color: "var(--ivory)" }}
          >
            Una nueva experiencia gastronómica está por abrir sus puertas.
          </p>
          <p
            className="mt-3 max-w-md font-sans text-sm"
            style={{ color: "var(--muted-ink)" }}
          >
            Cocina de autor, coctelería y un espacio pensado para celebrar sin ataduras.
          </p>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-3 px-6 pb-10 md:pb-12">
          <div
            className="h-px w-16"
            style={{ backgroundColor: "var(--gold-soft)", opacity: 0.5 }}
          />
          <p
            className="font-sans text-[10px] uppercase tracking-[0.42em]"
            style={{ color: "var(--muted-ink)" }}
          >
            © Exento · Todos los derechos reservados
          </p>
        </footer>
      </div>
    </main>
  );
}
