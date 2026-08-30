import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, Utensils } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

type ReservationContextValue = {
  openDialog: () => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function useReservationDialog() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    return { openDialog: () => undefined };
  }
  return ctx;
}

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const value = useMemo<ReservationContextValue>(
    () => ({
      openDialog: () => {
        track("open_reservation_dialog");
        setOpen(true);
      },
    }),
    [],
  );

  return (
    <ReservationContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg border-gold-soft/30 bg-background text-foreground sm:rounded-md">
          <DialogHeader className="text-center sm:text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-gold">Reservar</p>
            <DialogTitle className="font-display text-3xl font-light text-ivory">
              ¿Qué quieres reservar?
            </DialogTitle>
            <DialogDescription className="text-muted-ink">
              Elige el camino. Luego conversamos disponibilidad y detalles.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <button
              type="button"
              className="group border border-gold-soft/30 p-5 text-left transition-colors duration-300 hover:border-gold"
              onClick={() => {
                setOpen(false);
                track("click_reservar_mesa");
                void navigate({ to: "/reservar/mesa" });
              }}
            >
              <Utensils className="size-5 text-gold" aria-hidden />
              <p className="mt-4 font-display text-2xl text-ivory">Una mesa</p>
              <p className="mt-2 text-sm text-muted-ink">Para disfrutar la experiencia Exento.</p>
            </button>
            <button
              type="button"
              className="group border border-gold-soft/30 p-5 text-left transition-colors duration-300 hover:border-gold"
              onClick={() => {
                setOpen(false);
                track("click_cotizar_evento");
                void navigate({ to: "/reservar/evento" });
              }}
            >
              <CalendarDays className="size-5 text-gold" aria-hidden />
              <p className="mt-4 font-display text-2xl text-ivory">Un evento</p>
              <p className="mt-2 text-sm text-muted-ink">
                Para cumpleaños, matrimonios y celebraciones.
              </p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </ReservationContext.Provider>
  );
}
