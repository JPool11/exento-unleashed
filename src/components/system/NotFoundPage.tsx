import { Link } from "@tanstack/react-router";
import { media } from "@/data/media";
import { MediaImage } from "@/components/editorial/MediaImage";

export function NotFoundPage() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0">
        <MediaImage src={media.texture.src} alt="" className="opacity-40" />
        <div className="absolute inset-0 bg-background/80" />
      </div>
      <div className="relative z-10 max-w-2xl text-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">
          Sin reglas, pero con dirección
        </p>
        <p className="mt-4 font-display text-[8rem] leading-none text-gold/80 md:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-4xl text-ivory md:text-5xl">
          Esta página no está en nuestra carta.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm text-muted-ink">
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
