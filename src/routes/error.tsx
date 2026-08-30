import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { ErrorPage } from "@/components/layout/SystemPages";

export const Route = createFileRoute("/error")({
  head: () =>
    pageHead({
      title: "Error | Exento",
      description: "Algo no salió como esperábamos.",
      path: "/error",
      noIndex: true,
    }),
  component: PreviewErrorPage,
});

function PreviewErrorPage() {
  return <ErrorPage showRetry={false} />;
}
