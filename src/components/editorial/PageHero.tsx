import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/editorial/MediaImage";
import { Eyebrow, SectionHeading } from "@/components/editorial/Typography";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  compact = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", compact ? "min-h-[58vh]" : "min-h-[72vh]")}>
      <div className="absolute inset-0">
        <MediaImage src={image} alt={imageAlt} priority className="h-full w-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.18 0.012 40 / 0.55) 0%, oklch(0.18 0.012 40 / 0.72) 45%, oklch(0.18 0.012 40 / 0.92) 100%)",
          }}
        />
      </div>
      <div
        className={cn(
          "relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center md:px-14",
          compact ? "pt-32 pb-16 md:pt-40" : "pt-36 pb-24 md:pt-44 md:pb-28",
        )}
      >
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <SectionHeading as="h1" className="max-w-4xl text-balance">
          {title}
        </SectionHeading>
        {description ? (
          <p className="mt-6 max-w-2xl font-display text-xl italic leading-relaxed text-ivory/90 md:text-2xl">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function CTASection({
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="px-6 py-24 md:px-14">
      <div className="mx-auto max-w-3xl border border-gold-soft/30 px-8 py-16 text-center md:px-16">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <h2 className="font-display text-4xl font-light text-ivory md:text-5xl">{title}</h2>
        {text ? <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-ink">{text}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to={primary.to as never} className="btn-gold">
            {primary.label}
          </Link>
          {secondary ? (
            <Link to={secondary.to as never} className="btn-gold-outline">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
