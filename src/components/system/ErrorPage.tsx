import { Link } from "@tanstack/react-router";

export function ErrorPage({
  reset,
  onRetry,
}: {
  reset?: () => void;
  onRetry?: () => void;
}) {
  return (
    <section className="flex min-h-[80svh] items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Exento</p>
        <h1 className="mt-5 font-display text-4xl text-ivory md:text-5xl">
          Algo no salió como esperábamos.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted-ink">
          Intenta nuevamente o regresa a nuestra página principal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="btn-gold"
            onClick={() => {
              onRetry?.();
              reset?.();
            }}
          >
            Intentar nuevamente
          </button>
          <Link to="/" className="btn-gold-outline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
