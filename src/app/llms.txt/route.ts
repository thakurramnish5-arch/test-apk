import { siteConfig } from "@/config/site";
import { categoryPages } from "@/data/categoryPages";
import { destinations } from "@/data/destinations";
import { serviceAreaPath, serviceAreas } from "@/data/serviceAreas";

/** Built once at deploy time, like the sitemap. */
export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text summary of the business for AI assistants
 * (see llmstxt.org). Built from the same data as the pages, so the phone
 * number, areas and services never drift from what the site says.
 */
export function GET() {
  const { brand, contact, url } = siteConfig;
  const link = (path: string) => `${url}${path}`;

  const body = [
    `# ${brand.name}`,
    "",
    `> ${brand.description}`,
    "",
    `Local vehicle booking based in ${contact.address.city}, ${contact.address.district}, ${contact.address.state}, India. Every vehicle comes with a driver or operator; self-drive is not offered. Rates are quoted per trip before booking.`,
    "",
    `- Phone: ${contact.phoneDisplay}`,
    `- Email: ${contact.email}`,
    `- Enquiry form: ${link("/contact")}`,
    "",
    "## Vehicles and services",
    "",
    ...categoryPages.map(
      (page) => `- [${page.heading}](${link(`/${page.slug}`)}): ${page.description}`,
    ),
    "",
    "## Areas served (pickup points)",
    "",
    `- [All areas](${link("/areas")}): Salooni tehsil and nearby areas of Chamba district`,
    ...serviceAreas.map((area) => {
      const aka = area.aka.length > 0 ? ` (also ${area.aka.join(", ")})` : "";
      return `- [${area.name}${aka}](${link(serviceAreaPath(area.slug))}): ${area.summary}`;
    }),
    "",
    "## Popular trips from Salooni",
    "",
    ...destinations.map(
      (d) => `- ${d.name} (${d.region}): ${d.description}`,
    ),
    "",
    "## More",
    "",
    `- [All vehicles](${link("/vehicles")})`,
    `- [FAQs](${link("/faq")})`,
    `- [About](${link("/about")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
