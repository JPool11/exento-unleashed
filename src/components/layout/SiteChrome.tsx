import { type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ReservationProvider } from "@/components/reservation/reservation-context";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CalendarDays, UtensilsCrossed } from "lucide-react";
import { Link } from "@tanstack/react-router";

const BARE_PATHS = new Set(["/mantenimiento"]);
const HIDE_MOBILE_DOCK = new Set(["/mantenimiento", "/404", "/error"]);

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = BARE_PATHS.has(pathname);

  return (
    <ReservationProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <AmbientBackground />
        {!bare ? <Navbar /> : null}
        <div id="contenido" className={cn("relative z-10", !bare && "pb-16 md:pb-0")}>
          {children}
        </div>
        {!bare ? <Footer /> : null}
        <FloatingActions />
        {!HIDE_MOBILE_DOCK.has(pathname) ? <MobileDock /> : null}
        <Toaster />
      </div>
    </ReservationProvider>
  );
}

function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold-soft/20 bg-background/90 px-4 py-2 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <Link to="/reservar/mesa" className="btn-gold h-11 text-[10px]">
          <UtensilsCrossed className="size-3.5" aria-hidden />
          Reservar
        </Link>
        <Link to="/reservar/evento" className="btn-gold-outline h-11 text-[10px]">
          <CalendarDays className="size-3.5" aria-hidden />
          Cotizar
        </Link>
      </div>
    </div>
  );
}
