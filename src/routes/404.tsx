import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { NotFoundPage } from "@/components/layout/SystemPages";

export const Route = createFileRoute("/404")({
  head: () =>
    pageHead({
      title: "Página no encontrada | Exento",
      description: "Esta página no está en nuestra carta.",
      path: "/404",
      noIndex: true,
    }),
  component: NotFoundPage,
});
