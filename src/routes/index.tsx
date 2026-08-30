import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import {
  HomeAbout,
  HomeClose,
  HomeEvents,
  HomeGallery,
  HomeGastronomy,
  HomeHero,
  HomeIntro,
  HomeLocation,
  HomeMenuPreview,
  HomeSpaces,
} from "@/components/sections/home";
import { CTASection } from "@/components/editorial/PageHero";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Exento — Gastrobar, Restaurante y Eventos en Neiva",
      description:
        "Exento — Sin Reglas. Gastrobar, restaurante y espacio de eventos en El Pital, Huila. Gastronomía, coctelería y celebraciones.",
      path: "/",
    }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <HomeSpaces />
      <HomeGastronomy />
      <HomeMenuPreview />
      <HomeGallery />
      <HomeEvents />
      <CTASection
        eyebrow="Celebra sin reglas"
        title="Cotiza la noche que estás imaginando."
        text="Cumpleaños, matrimonios, grados y cenas familiares. Conversamos espacio, mesa y detalles."
        primary={{ label: "Cotizar evento", to: "/reservar/evento" }}
        secondary={{ label: "Ver espacios", to: "/espacios" }}
      />
      <HomeAbout />
      <HomeLocation />
      <HomeClose />
    </>
  );
}
