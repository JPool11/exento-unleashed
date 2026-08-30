import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { restaurantJsonLd } from "../lib/json-ld";
import { CutleryCursor } from "../components/CutleryCursor";
import { SiteChrome } from "../components/layout/SiteChrome";
import { ErrorPage, NotFoundPage } from "../components/layout/SystemPages";
import { TooltipProvider } from "../components/ui/tooltip";
import { siteConfig } from "../config/site";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <ErrorPage
      reset={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Exento — Gastrobar, Restaurante y Eventos en Neiva" },
      {
        name: "description",
        content:
          "Exento — Sin Reglas. Gastrobar, restaurante y espacio de eventos en El Pital, Huila.",
      },
      { name: "author", content: "Exento" },
      { name: "theme-color", content: "#2C2724" },
      { property: "og:title", content: "Exento — Sin Reglas" },
      {
        property: "og:description",
        content: "Gastrobar, restaurante y celebraciones. Sin reglas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteConfig.siteUrl },
      { property: "og:image", content: siteConfig.ogImage },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Exento — Sin Reglas" },
      { name: "twitter:image", content: siteConfig.ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "canonical", href: siteConfig.siteUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = JSON.stringify(restaurantJsonLd());

  return (
    <html lang="es">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <CutleryCursor />
        <SiteChrome>
          <Outlet />
        </SiteChrome>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
