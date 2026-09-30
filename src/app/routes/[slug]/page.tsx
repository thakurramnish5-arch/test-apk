import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { getTaxiRoute, taxiRoutePath, taxiRoutes } from "@/data/routes";
import { getVehicleBySlug } from "@/data/vehicles";
import { faqPageSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const linkClass =
  "font-semibold text-forest-700 underline-offset-2 hover:underline";

/** Only the routes in taxiRoutes exist; any other path is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return taxiRoutes.map((route) => ({ slug: route.slug }));
}

const destinationFor = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getTaxiRoute(slug);
  if (!route) return {};

  const destination = destinationFor(route.destinationSlug);
  return pageMetadata({
    title: route.title,
    description: route.description,
    path: taxiRoutePath(route.slug),
    image: destination
      ? { url: destination.image, alt: `View of ${destination.name}` }
      : undefined,
  });
}

export default async function TaxiRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = getTaxiRoute(slug);
  if (!route) notFound();

  const destination = destinationFor(route.destinationSlug);
  const routeVehicles = route.vehicleSlugs
    .map((s) => getVehicleBySlug(s))
    .filter((v) => v !== undefined);
  const relatedRoutes = route.related
    .map((s) => getTaxiRoute(s))
    .filter((r) => r !== undefined);
  const path = taxiRoutePath(route.slug);

  return (
    <>
      <PageHeader
        eyebrow={`Taxi · Salooni ⇄ ${route.to}`}
        title={route.heading}
        description={route.intro}
        image={destination?.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Routes", href: "/routes" },
          { label: `Salooni to ${route.to}` },
        ]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="#enquiry" variant="accent" size="lg">
            Check Availability
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl(`a taxi from Salooni to ${route.to}`)}
            variant="light"
            size="lg"
            external
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </LinkButton>
        </div>
      </PageHeader>

      {/* About the route + enquiry */}
      <section
        id="enquiry"
        className="scroll-mt-20 bg-white py-10 sm:py-12 lg:py-14"
      >
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
            <div className="space-y-7">
              {route.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
                    {section.body}
                  </p>
                </div>
              ))}

              <div>
                <h2 className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
                  {route.returnTrip.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
                  {route.returnTrip.body}
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
                  How booking works
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
                  Send your date, pickup village and the number of people on
                  WhatsApp, by phone or with the form. We confirm the car and
                  share the full rate before you confirm — it depends on the
                  vehicle, one way or return, and any waiting or night stay.
                  Asking is free. Every car comes with an experienced driver;
                  pickups are from Salooni and{" "}
                  <Link href="/areas" className={linkClass}>
                    nearby areas
                  </Link>
                  . See all{" "}
                  <Link href="/taxi-car-booking" className={linkClass}>
                    taxi and cab options in Salooni
                  </Link>
                  .
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-charcoal-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Book Salooni to {route.to}
                </h2>
                <p className="mt-1 text-[13px] text-charcoal-600">
                  Pickup and drop are filled in — change them if you need.
                </p>
                <div className="mt-4">
                  <EnquiryForm
                    variant="compact"
                    bare
                    passengerOnly
                    defaultPickupLocation="Salooni"
                    defaultDropLocation={route.to}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Cars that suit this road */}
      {routeVehicles.length > 0 && (
        <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
          <div className="container-page">
            <SectionHeading
              eyebrow="With Experienced Driver"
              title={`Cars for Salooni to ${route.to}`}
              description="The cars people usually book for this trip. Tell us the number of people and bags, and we suggest the one that suits."
            />
            <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {routeVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Questions for this route */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Before You Book"
            title={`Salooni to ${route.to} Taxi: Questions`}
          />
          <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
            <FaqAccordion items={route.faqs} />
            <div className="mt-6 flex justify-center">
              <LinkButton href="/faq" variant="outline">
                View All FAQs
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Related routes */}
      <section className="bg-charcoal-50 py-10 sm:py-12">
        <div className="container-page">
          <h2 className="text-center font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
            Other Taxi Routes From Salooni
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {relatedRoutes.map((other) => (
              <li key={other.slug}>
                <Link
                  href={taxiRoutePath(other.slug)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
                >
                  {other.heading}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/routes"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
              >
                All routes
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />

      {/* TaxiService + FAQ structured data — breadcrumbs come from PageHeader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: route.heading,
              serviceType: "Taxi service",
              description: route.description,
              path,
              type: "TaxiService",
            }),
            faqPageSchema(route.faqs),
          ]),
        }}
      />
    </>
  );
}
