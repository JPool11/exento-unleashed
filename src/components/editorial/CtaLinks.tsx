import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Utensils } from "lucide-react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function GoldButtonLink({
  to,
  children,
  onClick,
  className,
  event,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  event?: "click_reservar_mesa" | "click_cotizar_evento" | "click_carta";
}) {
  return (
    <Link
      to={to as never}
      onClick={() => {
        if (event) track(event);
        onClick?.();
      }}
      className={cn("btn-gold", className)}
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export function GoldOutlineLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link to={to as never} className={cn("btn-gold-outline", className)}>
      {children}
    </Link>
  );
}

export function ReserveTableLink({ className }: { className?: string }) {
  return (
    <GoldButtonLink to="/reservar/mesa" event="click_reservar_mesa" className={className}>
      Reservar mesa
    </GoldButtonLink>
  );
}

export function QuoteEventLink({ className }: { className?: string }) {
  return (
    <Link
      to={"/reservar/evento" as never}
      onClick={() => track("click_cotizar_evento")}
      className={cn("btn-gold-outline", className)}
    >
      <CalendarDays className="size-4" aria-hidden />
      Cotizar evento
    </Link>
  );
}

export function MenuLink({ className }: { className?: string }) {
  return (
    <Link
      to={"/carta" as never}
      onClick={() => track("click_carta")}
      className={cn(
        "inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:text-ivory",
        className,
      )}
    >
      <Utensils className="size-3.5" aria-hidden />
      Ver nuestra carta
    </Link>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src={siteConfig.logos.wordmarkLight}
      alt={siteConfig.name}
      className={cn("h-8 w-auto select-none md:h-9", className)}
      draggable={false}
    />
  );
}
