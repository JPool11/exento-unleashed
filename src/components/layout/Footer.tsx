import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNav, reservationNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { BrandMark } from "@/components/editorial/CtaLinks";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { GoldDivider } from "@/components/editorial/Typography";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gold-soft/20 px-6 pb-10 pt-16 md:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <BrandMark className="h-10" />
          <p className="mt-5 max-w-xs font-display text-lg italic leading-relaxed text-ivory/90">
            Gastrobar, restaurante y celebraciones. Sin reglas, con cuidado.
          </p>
          <SocialLinks className="mt-6" size="sm" />
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Explorar</p>
          <ul className="mt-5 space-y-2.5">
            {footerNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-ink transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Reservas</p>
          <ul className="mt-5 space-y-2.5">
            {reservationNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-ink transition-colors duration-300 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Contacto</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-ink">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 text-gold" aria-hidden />
              <span>{siteConfig.address.line}</span>
            </li>
            {siteConfig.contact.phone ? (
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-gold" aria-hidden />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-gold">
                  {siteConfig.contact.phone}
                </a>
              </li>
            ) : null}
            {siteConfig.contact.email ? (
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-gold" aria-hidden />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
            ) : (
              <li className="text-xs text-muted-ink/80">
                Teléfono y correo por confirmar.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center gap-3">
        <GoldDivider className="w-16 opacity-50" />
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-muted-ink">
          © {year} {siteConfig.name} · Todos los derechos reservados
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-muted-ink">
          Desarrollado por{" "}
          <a
            href={siteConfig.credits.developerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold transition-colors hover:text-ivory"
          >
            {siteConfig.credits.developer}
          </a>
        </p>
      </div>
    </footer>
  );
}
