import { siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";

/**
 * LocalBusiness structured data.
 *
 * Only verifiable business facts are included here. Aggregate ratings
 * are deliberately omitted: the site publishes no customer reviews, and
 * marking them up as real review data would be misleading to search
 * engines and to customers. Add an `aggregateRating` block only once
 * genuine, verifiable reviews are in place.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: siteConfig.brand.name,
  description: siteConfig.brand.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/icon-512.png`,
  image: `${siteConfig.url}/opengraph-image`,
  telephone: siteConfig.contact.phoneNumber,
  email: siteConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.state,
    // District is not a schema.org PostalAddress field; the locality line
    // carries the town, which is what local search matches on.
    // Omitted while unset — never publish a guessed PIN code to Google.
    ...(siteConfig.contact.address.postalCode
      ? { postalCode: siteConfig.contact.address.postalCode }
      : {}),
    addressCountry: "IN",
  },
  // Where customers are picked up. Outstation drops can go anywhere, but
  // the business is local to Salooni tehsil for now.
  areaServed: [
    { "@type": "City", name: "Salooni" },
    { "@type": "AdministrativeArea", name: "Chamba district, Himachal Pradesh" },
  ],
  knowsLanguage: ["en", "hi"],
};

/** FAQPage schema generated from the FAQ data file. */
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

/** Breadcrumb schema helper for inner pages. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
