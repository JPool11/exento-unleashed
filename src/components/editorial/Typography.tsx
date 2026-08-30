import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-sans text-[10px] uppercase tracking-[0.42em] text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return <span className={cn("h-px w-10 bg-gold-soft", className)} aria-hidden />;
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-5 flex items-center gap-4 font-sans text-[10px] uppercase tracking-[0.5em] text-gold",
        className,
      )}
    >
      <GoldDivider />
      {children}
      <GoldDivider />
    </div>
  );
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-display text-4xl font-light leading-[1.1] text-ivory md:text-5xl lg:text-6xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
