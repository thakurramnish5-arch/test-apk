/**
 * CENTRAL BUSINESS CONFIGURATION
 * ------------------------------
 * This is the single source of truth for all business details.
 * Change values here and they update across the entire website.
 *
 *  - Brand name ................ siteConfig.brand.name
 *  - Social links .............. siteConfig.social
 *  - Statistics ................ siteConfig.stats
 *
 * Phone, WhatsApp, email and address come from environment variables
 * (NEXT_PUBLIC_* in .env), so they change in one place for the whole site.
 * .env is committed, so Vercel builds get the same values. The build fails
 * loudly if a required one is missing, rather than shipping a site with no
 * phone number.
 */

/**
 * NEXT_PUBLIC_* values are inlined at build time, so each one must be read
 * as a literal `process.env.NAME` — this helper only validates the value.
 */
function requireEnv(value: string | undefined, name: string): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error(
      `Missing environment variable ${name}. Add it to .env.`,
    );
  }
  return trimmed;
}

/** "+918219769045" -> "+91 82197 69045"; other formats are shown as given. */
function formatPhoneDisplay(phone: string): string {
  const match = phone.replace(/[\s-]/g, "").match(/^\+91(\d{5})(\d{5})$/);
  return match ? `+91 ${match[1]} ${match[2]}` : phone;
}

const phoneNumber = requireEnv(
  process.env.NEXT_PUBLIC_PHONE_NUMBER,
  "NEXT_PUBLIC_PHONE_NUMBER",
).replace(/[\s-]/g, "");

/** Defaults to the call number when WhatsApp runs on the same number. */
const whatsappNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || phoneNumber
).replace(/\D/g, "");

export const siteConfig = {
  brand: {
    name: "Salooni Transport Hub",
    shortName: "Salooni Transport",
    tagline: "Your local ride from Salooni, Chamba",
    /** Service area shown in headings, metadata and structured data. */
    serviceArea: "Salooni tehsil, Chamba district",
    /** Used in footer + about page */
    description:
      "Cars, buses, pickups, trucks, tractors and JCB on hire in Salooni, Chamba — with experienced drivers and operators, at fair local rates, for local runs, weddings, goods, farm and site work and outstation trips.",
    /**
     * Year the business started. Shown nowhere by default (the footer uses
     * the current year); set it correctly before using it anywhere.
     */
    foundedYear: 2026,
  },

  contact: {
    /** WhatsApp number in international format WITHOUT "+" or spaces. */
    whatsappNumber,
    /** Display version of the business number, e.g. "+91 82197 69045". */
    phoneDisplay: formatPhoneDisplay(phoneNumber),
    /** Used for tel: links. Keeps the leading "+". */
    phoneNumber,
    email: requireEnv(
      process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      "NEXT_PUBLIC_CONTACT_EMAIL",
    ),
    /** Shown in the contact section. Avoid claiming 24/7 unless true. */
    availabilityNote: "Quick booking assistance",
    /**
     * Set from NEXT_PUBLIC_ADDRESS_* in .env.
     * `postalCode` is published to Google in the LocalBusiness schema
     * (src/lib/seo.ts), and a wrong or invented address can get a Google
     * Business listing suspended — leave it empty rather than guessing.
     */
    address: {
      line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 || "Salooni Transport Hub",
      city: requireEnv(
        process.env.NEXT_PUBLIC_ADDRESS_CITY,
        "NEXT_PUBLIC_ADDRESS_CITY",
      ),
      district: process.env.NEXT_PUBLIC_ADDRESS_DISTRICT ?? "",
      state: requireEnv(
        process.env.NEXT_PUBLIC_ADDRESS_STATE,
        "NEXT_PUBLIC_ADDRESS_STATE",
      ),
      country: "India",
      postalCode: process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE ?? "",
    },
  },

  social: {
    // TODO: Replace "#" with the real Instagram profile URL when available.
    instagram: "#",
    // TODO: Replace "#" with the real Facebook page URL when available.
    facebook: "#",
  },

  /**
   * Homepage statistics band.
   *
   * IMPORTANT: only put figures here that you can actually back up if a
   * customer or a consumer forum asks. Invented counts ("10,000+ customers")
   * and availability promises ("24/7") are misleading advertising, so the
   * defaults below describe what the service does rather than inventing
   * numbers. Replace them with real figures once you have them.
   */
  stats: [
    { value: "Car to JCB", label: "Every Vehicle, One Call" },
    { value: "Experienced", label: "Drivers & Operators" },
    { value: "Fair Rates", label: "Quote Before You Book" },
    { value: "₹0", label: "To Enquire" },
  ],

  /** Used for canonical URLs, sitemap and Open Graph metadata. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://saloonitransport.in",
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * True only when a social URL has actually been filled in. The icons are
 * hidden while the value is still the "#" placeholder, so the site never
 * ships a link that opens a blank tab.
 */
export function hasSocialLink(url: string): boolean {
  return url.trim() !== "" && url.trim() !== "#";
}
