import { siteConfig } from "@/config/site";

export function restaurantJsonLd() {
  const sameAs = [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.tiktok,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness", "EventVenue"],
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}${siteConfig.logos.wordmarkLight}`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.department,
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.lat,
      longitude: siteConfig.address.lng,
    },
    hasMap: siteConfig.address.mapUrl,
    sameAs,
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };
}
