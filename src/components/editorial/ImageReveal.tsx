import { cn } from "@/lib/utils";
import { MediaImage } from "@/components/editorial/MediaImage";

export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)} data-cursor-hover>
      <MediaImage
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes}
        className={cn(
          "scale-[1.02] transition-transform duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none group-hover:scale-[1.06] hover:scale-[1.06]",
          imgClassName,
        )}
      />
    </div>
  );
}
