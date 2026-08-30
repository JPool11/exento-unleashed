import { Link } from "@tanstack/react-router";
import { MediaImage } from "@/components/editorial/MediaImage";
import { media } from "@/data/media";

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 opacity-40">
        <MediaImage src={media.texture.src} alt="" />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="relative z-10 max-w-2xl text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">
          Sin reglas, pero con dirección
        </p>
        <p className="mt-6 font-display text-[7rem] leading-none text-gold md:text-[9rem]">404</p>
        <h1 className="mt-4 font-display text-4xl font-light text-ivory md:text-5xl">
          Esta página no está en nuestra carta.
        </h1>
        <p className="mt-4 text-sm text-muted-ink">
          El enlace que buscas no existe o cambió de lugar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-gold">
            Volver a Exento
          </Link>
          <Link to="/carta" className="btn-gold-outline">
            Ver la carta
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ErrorPage({
  reset,
  showRetry = true,
}: {
  reset?: () => void;
  showRetry?: boolean;
}) {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Exento</p>
        <h1 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
          Algo no salió como esperábamos.
        </h1>
        <p className="mt-4 text-sm text-muted-ink">
          Intenta nuevamente o regresa a nuestra página principal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {showRetry && reset ? (
            <button type="button" className="btn-gold" onClick={reset}>
              Intentar nuevamente
            </button>
          ) : null}
          <Link to="/" className="btn-gold-outline">
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
