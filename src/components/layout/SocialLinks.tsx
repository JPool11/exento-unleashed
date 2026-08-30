import { siteConfig } from "@/config/site";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/layout/SocialIcons";
import { cn } from "@/lib/utils";

const socials = [
  { name: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { name: "Facebook", href: siteConfig.social.facebook, icon: FacebookIcon },
  { name: "TikTok", href: siteConfig.social.tiktok, icon: TikTokIcon },
] as const;

export function SocialLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <nav className={cn("flex items-center gap-4", className)} aria-label="Redes sociales">
      {socials.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={cn(
            "flex items-center justify-center rounded-full border border-gold-soft text-gold transition-transform duration-300 hover:scale-110 hover:border-gold hover:bg-gold/10",
            size === "sm" ? "size-10" : "size-11",
          )}
        >
          <Icon className={size === "sm" ? "size-4" : "size-5"} />
        </a>
      ))}
    </nav>
  );
}
