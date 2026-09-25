import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { AvailabilityBadge, Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { categoryMap } from "@/data/categories";
import {
  getRelatedVehicles,
  getVehicleBySlug,
  vehicles,
} from "@/data/vehicles";
import { breadcrumbSchema } from "@/lib/seo";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every vehicle page at build time. */
export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

/** Place names that stay capitalised when a "suitable for" tag starts a phrase. */
const PROPER_NOUNS =
  /^(Salooni|Saluni|Kihar|Bhandal|Chamba|Dalhousie|Khajjiar|Banikhet|Bharmour|Manimahesh|Pathankot|Kangra|Gaggal|Dharamshala|Amritsar|Jammu|Chandigarh|Delhi|Manali|Shimla|JCB)\b/;

const toPhrase = (tag: string) =>
  PROPER_NOUNS.test(tag) ? tag : tag.charAt(0).toLowerCase() + tag.slice(1);

/**
 * Meta description built from the vehicle's own data and kept within the
 * 160-character search snippet: name and capacity, then the first sentence
 * of its description if it fits, otherwise as many "suitable for" tags as
 * fit, then how to book.
 */
function vehicleMetaDescription(vehicle: {
  name: string;
  capacity: string;
  description: string;
  suitableFor: string[];
}): string {
  const max = 160;
  const lead = `${vehicle.name} on hire in Salooni, Chamba (${vehicle.capacity}).`;
  const cta = "Enquire free on WhatsApp or phone.";

  const firstSentence = vehicle.description.split(/(?<=\.)\s/)[0];
  const withSentence = `${lead} ${firstSentence} ${cta}`;
  if (withSentence.length <= max) return withSentence;

  let best = `${lead} ${cta}`;
  const uses: string[] = [];
  for (const tag of vehicle.suitableFor) {
    uses.push(toPhrase(tag));
    const candidate = `${lead} Good for ${uses.join(", ")}. ${cta}`;
    if (candidate.length > max) break;
    best = candidate;
  }
  return best;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return { title: "Vehicle not found" };
  }

  const title = `${vehicle.name} on Hire in Salooni`;
  const description = vehicleMetaDescription(vehicle);

  return {
    title,
    description,
    alternates: { canonical: `/vehicles/${vehicle.slug}` },
    openGraph: {
      title,
      description,
      url: `/vehicles/${vehicle.slug}`,
      images: [{ url: vehicle.image, alt: vehicle.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [vehicle.image],
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) notFound();

  const category = categoryMap[vehicle.category];
  const related = getRelatedVehicles(vehicle);
  const whatsappContext = `the ${vehicle.name}`;

  return (
    <>
      {/* Breadcrumb bar */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-charcoal-200 bg-white"
      >
        <div className="container-page py-3">
          <ol className="flex flex-wrap items-center gap-1 text-[13px] text-charcoal-500">
            <li>
              <Link href="/" className="transition-colors hover:text-forest-700">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <Link
                href="/vehicles"
                className="transition-colors hover:text-forest-700"
              >
                Vehicles
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <Link
                href={`/vehicles?category=${vehicle.category}`}
                className="transition-colors hover:text-forest-700"
              >
                {category.pluralName}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-medium text-charcoal-800">
              {vehicle.name}
            </li>
          </ol>
        </div>
      </nav>

      <section className="bg-charcoal-50 py-6 sm:py-8">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
            {/* Main column */}
            <div>
              <VehicleGallery
                images={vehicle.gallery}
                vehicleName={vehicle.name}
              />

              {/* Title block */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="forest">{category.name}</Badge>
                  <AvailabilityBadge availability={vehicle.availability} />
                </div>

                <h1 className="mt-3 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
                  {vehicle.name}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="flex items-center gap-1.5 text-sm text-charcoal-600">
                    <Users
                      className="h-4 w-4 text-charcoal-400"
                      aria-hidden="true"
                    />
                    {vehicle.capacity}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-charcoal-600">
                    <MapPin
                      className="h-4 w-4 text-charcoal-400"
                      aria-hidden="true"
                    />
                    {vehicle.location}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-charcoal-700">
                  {vehicle.description}
                </p>
              </div>

              {/* Features */}
              <div className="mt-8 rounded-xl border border-charcoal-200 bg-white p-5 sm:p-6">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Vehicle Features
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {vehicle.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-600"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-charcoal-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suitable for */}
              <div className="mt-5 rounded-xl border border-charcoal-200 bg-white p-5 sm:p-6">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Suitable For
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {vehicle.suitableFor.map((use) => (
                    <li
                      key={use}
                      className="rounded-lg bg-forest-50 px-3 py-1.5 text-[13px] font-medium text-forest-800"
                    >
                      {use}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pickup & booking information */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl border border-charcoal-200 bg-white p-5 sm:p-6">
                  <h2 className="font-display text-base font-bold text-charcoal-900">
                    Pickup Information
                  </h2>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <div>
                      <dt className="text-charcoal-500">Base location</dt>
                      <dd className="font-semibold text-charcoal-800">
                        {vehicle.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-charcoal-500">Other pickups</dt>
                      <dd className="text-charcoal-700">
                        We pick up from Salooni and nearby villages. Share your
                        location in the enquiry.
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-xl border border-charcoal-200 bg-white p-5 sm:p-6">
                  <h2 className="font-display text-base font-bold text-charcoal-900">
                    Booking Information
                  </h2>
                  <dl className="mt-3 space-y-2.5 text-sm">
                    <div>
                      <dt className="text-charcoal-500">Pricing</dt>
                      <dd className="font-semibold text-charcoal-800">
                        Fair local rate, quoted upfront
                      </dd>
                    </div>
                    <div>
                      <dt className="text-charcoal-500">How it works</dt>
                      <dd className="text-charcoal-700">
                        Send an enquiry on WhatsApp or phone. We confirm
                        availability and share a quote. Asking is free.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Rate note */}
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-himalaya-200 bg-himalaya-50 px-4 py-3 text-[13px] leading-relaxed text-himalaya-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                The rate depends on the route, season and number of days, so
                we quote for your exact trip. You get the full figure before
                you confirm — no hidden charges added later.
              </p>
            </div>

            {/* Sidebar — enquiry form */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-charcoal-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Check Availability
                </h2>
                <p className="mt-1 text-[13px] text-charcoal-600">
                  Ask about the {vehicle.name} for your dates. Asking is free.
                </p>

                <div className="mt-4 flex flex-col gap-2.5">
                  <LinkButton
                    href={generalWhatsAppUrl(whatsappContext)}
                    variant="whatsapp"
                    fullWidth
                    external
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp Us
                  </LinkButton>
                  <LinkButton href={telHref} variant="outline" fullWidth>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call Now
                  </LinkButton>
                </div>

                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-charcoal-200" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-600">
                    or send details
                  </span>
                  <span className="h-px flex-1 bg-charcoal-200" />
                </div>

                <EnquiryForm
                  variant="compact"
                  bare
                  defaultVehicleType={category.name}
                  vehicleName={vehicle.name}
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related vehicles */}
      {related.length > 0 && (
        <section className="bg-white pb-2 pt-10 sm:py-12">
          <div className="container-page">
            <SectionHeading
              eyebrow="You May Also Consider"
              title="Similar Vehicles"
              description="Other vehicles that suit a similar need."
            />
            <div className="mt-6 sm:mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <VehicleCard key={item.id} vehicle={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Room for the vehicle sticky bar on phones */}
      <div className="h-16 lg:hidden" aria-hidden="true" />

      {/* Sticky mobile booking bar — sits above the global bottom bar */}
      <div className="vehicle-sticky-bar fixed inset-x-0 bottom-[calc(68px+env(safe-area-inset-bottom))] z-30 border-t border-charcoal-200 bg-white/95 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-bold text-charcoal-900">
              {vehicle.name}
            </p>
            <p className="truncate text-[11px] text-charcoal-500">
              Fair rate, quoted upfront
            </p>
          </div>
          <LinkButton
            href={generalWhatsAppUrl(whatsappContext)}
            variant="primary"
            size="sm"
            className="shrink-0 px-3"
            external
          >
            <CalendarCheck
              className="h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            {/* Shortened on the narrowest screens so the bar never overflows */}
            <span className="hidden xs:inline">Check Availability</span>
            <span className="xs:hidden">Enquire</span>
          </LinkButton>
        </div>
      </div>

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Vehicles", path: "/vehicles" },
              { name: vehicle.name, path: `/vehicles/${vehicle.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
