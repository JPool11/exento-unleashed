import { type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ReservationProvider } from "@/components/reservation/reservation-context";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const BARE_PATHS = new Set(["/mantenimiento"]);

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = BARE_PATHS.has(pathname);

  return (
    <ReservationProvider>
      <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        <AmbientBackground />
        {!bare ? <Navbar /> : null}
        <div id="contenido" className="relative z-10">
          {children}
        </div>
        {!bare ? <Footer /> : null}
        <FloatingActions />
        <Toaster />
      </div>
    </ReservationProvider>
  );
}
