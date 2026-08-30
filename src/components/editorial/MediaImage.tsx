import { cn } from "@/lib/utils";

export function MediaImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "100vw",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
