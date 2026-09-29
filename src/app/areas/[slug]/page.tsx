import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, MessageCircle, Navigation } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { categoryMap } from "@/data/categories";
import { categoryPagePath } from "@/data/categoryPages";
import {
  getServiceArea,
  serviceAreaPath,
  serviceAreas,
} from "@/data/serviceAreas";
import { faqPageSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Hill photo shared with the destinations page header. */
const headerImage =
  "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80";

/** Only the places in serviceAreas exist; any other path is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  return pageMetadata({
    title: area.title,
    description: area.description,
    path: serviceAreaPath(area.slug),
  });
}

export default async function ServiceAreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const nearbyAreas = area.nearby
    .map((s) => getServiceArea(s))
    .filter((a) => a !== undefined);
  const spelling =
    area.aka.length > 0 ? ` (also written ${area.aka.join(", ")})` : "";

  return (
    <>
      <PageHeader
        eyebrow={`Taxi & Vehicle Booking · ${area.name}`}
        title={area.title}
        description={area.intro}
        image={headerImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Areas", href: "/areas" },
          { label: area.name },
        ]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="#enquiry" variant="accent" size="lg">
            Check Availability
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl(`a vehicle from ${area.name}`)}
            variant="light"
            size="lg"
            external
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </LinkButton>
        </div>
      </PageHeader>

      {/* What people here book — each links to its vehicle page */}
      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Every Vehicle, One Call"
            title={`Vehicles on Hire in ${area.name}`}
            description={`Every vehicle comes with an experienced driver or operator, for pickups in ${area.name}${spelling} and nearby villages.`}
          />
          <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {area.popularCategories.map((id) => {
              const category = categoryMap[id];
              return (
                <li key={id}>
                  <Link
                    href={categoryPagePath[id]}
                    className="card-surface group flex h-full items-start justify-between gap-3 p-4 hover:border-forest-300 hover:shadow-md"
                  >
                    <span>
                      <span className="block font-display text-base font-bold text-charcoal-900">
                        {category.pluralName}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-charcoal-600">
                        {category.suitableUse}
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-charcoal-400 transition-colors group-hover:text-forest-700"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* About the area + enquiry */}
      <section
        id="enquiry"
        className="scroll-mt-20 bg-white py-10 sm:py-12 lg:py-14"
      >
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
            <div className="space-y-7">
              {area.sections.map((section) => (
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
                  Popular trips from {area.name}
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {area.trips.map((trip) => (
                    <li
                      key={trip.to}
                      className="flex items-start gap-3 rounded-xl border border-charcoal-200 bg-charcoal-50 p-3.5"
                    >
                      <Navigation
                        className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-charcoal-900">
                          {area.name} to {trip.to}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-charcoal-600">
                          {trip.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
                  How booking works
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
                  Send an enquiry on WhatsApp, by phone or with the form. We
                  confirm availability and share the full rate before you
                  confirm — it depends on the vehicle, the route and the number
                  of days. Asking is free. Going further? See{" "}
                  <Link
                    href="/destinations"
                    className="font-semibold text-forest-700 underline-offset-2 hover:underline"
                  >
                    trips from Salooni
                  </Link>
                  .
                </p>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-charcoal-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Book from {area.name}
                </h2>
                <p className="mt-1 text-[13px] text-charcoal-600">
                  Pickup is filled in — add your village if it is nearby.
                </p>
                <div className="mt-4">
                  <EnquiryForm
                    variant="compact"
                    bare
                    defaultPickupLocation={area.name}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Questions for this place */}
      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Before You Book"
            title={`Questions From ${area.name}`}
          />
          <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
            <FaqAccordion items={area.faqs} />
            <div className="mt-6 flex justify-center">
              <LinkButton href="/faq" variant="outline">
                View All FAQs
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Neighbouring places */}
      <section className="bg-white py-10 sm:py-12">
        <div className="container-page">
          <h2 className="text-center font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
            Also Serving Nearby
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {nearbyAreas.map((other) => (
              <li key={other.slug}>
                <Link
                  href={serviceAreaPath(other.slug)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
                >
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  Taxi in {other.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/areas"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
              >
                All areas
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <ContactSection className="bg-charcoal-50 py-10 sm:py-12 lg:py-14" />

      {/* Service + FAQ structured data — breadcrumbs come from PageHeader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: area.title,
              serviceType: "Taxi and vehicle hire",
              description: area.description,
              path: serviceAreaPath(area.slug),
              area: area.name,
            }),
            faqPageSchema(area.faqs),
          ]),
        }}
      />
    </>
  );
}
