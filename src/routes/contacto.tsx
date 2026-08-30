import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { media } from "@/data/media";
import { PageHero } from "@/components/editorial/PageHero";
import { LocationMap } from "@/components/layout/LocationMap";
import { ContactForm } from "@/components/reservation/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { WhatsAppTextLink } from "@/components/layout/FloatingWhatsApp";
import { SectionHeading } from "@/components/editorial/Typography";

export const Route = createFileRoute("/contacto")({
  head: () =>
    pageHead({
      title: "Contacto | Exento — Sin Reglas",
      description:
        "Habla con Exento. Dirección en El Pital, Huila, redes sociales y formulario de contacto.",
      path: "/contacto",
    }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Escríbenos. La mesa se conversa."
        image={media.intro.src}
        imageAlt={media.intro.alt}
        compact
      />
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-12 md:px-14">
        <div className="md:col-span-5">
          <SectionHeading as="h2">Estamos en El Pital.</SectionHeading>
          <ul className="mt-8 space-y-5 text-sm text-muted-ink">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 text-gold" aria-hidden />
              <span>{siteConfig.address.line}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 text-gold" aria-hidden />
              <span>{siteConfig.openingHours.note}</span>
            </li>
            {siteConfig.contact.phone ? (
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 text-gold" aria-hidden />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-gold">
                  {siteConfig.contact.phone}
                </a>
              </li>
            ) : null}
            {siteConfig.contact.email ? (
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 text-gold" aria-hidden />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
            ) : (
              <li className="text-xs">Teléfono y correo oficiales por confirmar.</li>
            )}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppTextLink className="btn-gold" />
            <a
              href={siteConfig.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline"
            >
              Cómo llegar
            </a>
          </div>
          <SocialLinks className="mt-8" />
        </div>
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </section>
      <section className="px-6 pb-24 md:px-14">
        <LocationMap />
      </section>
    </>
  );
}
