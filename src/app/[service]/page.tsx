import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactSection } from "@/components/shared/ContactSection";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { RouteLinks } from "@/components/shared/RouteLinks";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { categoryMap } from "@/data/categories";
import { categoryPages, getCategoryPage } from "@/data/categoryPages";
import { faqs } from "@/data/faqs";
import { getVehiclesByCategory } from "@/data/vehicles";
import { pageMetadata, serviceSchema } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ service: string }>;
}

/** Only the landing pages in categoryPages exist; any other path is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return categoryPages.map((page) => ({ service: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service } = await params;
  const page = getCategoryPage(service);
  if (!page) return {};

  const category = categoryMap[page.category];
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    image: {
      url: category.image,
      alt: `${category.pluralName} on hire in Salooni, Chamba`,
    },
  });
}

export default async function CategoryLandingPage({ params }: PageProps) {
  const { service } = await params;
  const page = getCategoryPage(service);
  if (!page) notFound();

  const category = categoryMap[page.category];
  const categoryVehicles = getVehiclesByCategory(page.category);
  const pageFaqs = page.faqIds
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq) => faq !== undefined);
  const otherPages = categoryPages.filter((p) => p.slug !== page.slug);
  const whatsappContext = `booking a ${category.name.toLowerCase()}`;
  const isPassenger = page.category === "car" || page.category === "bus";

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.heading}
        description={page.intro}
        image={category.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Vehicles", href: "/vehicles" },
          { label: category.pluralName },
        ]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="#enquiry" variant="accent" size="lg">
            Check Availability
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl(whatsappContext)}
            variant="light"
            size="lg"
            external
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </LinkButton>
        </div>
      </PageHeader>

      {/* Vehicles in this category */}
      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow={category.capacityNote}
            title={`${category.pluralName} Available From Salooni`}
            description={`Suitable for: ${category.suitableUse}.`}
          />
          <div className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {categoryVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About the service + enquiry */}
      <section
        id="enquiry"
        className="scroll-mt-20 bg-white py-10 sm:py-12 lg:py-14"
      >
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-10">
            <div className="space-y-7">
              {page.sections.map((section) => (
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
                  How booking works
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
                  Send an enquiry on WhatsApp, by phone or with the form. We
                  confirm availability and share the full rate for your job
                  before you confirm — the rate depends on the route, the
                  load and the number of days. Asking is free.{" "}
                  {isPassenger && (
                    <>
                      For trip ideas, see{" "}
                      <Link
                        href="/destinations"
                        className="font-semibold text-forest-700 underline-offset-2 hover:underline"
                      >
                        trips from Salooni
                      </Link>
                      , or{" "}
                    </>
                  )}
                  {isPassenger ? "browse " : "See "}
                  <Link
                    href="/services"
                    className="font-semibold text-forest-700 underline-offset-2 hover:underline"
                  >
                    all our services
                  </Link>
                  .
                </p>
              </div>

              {page.category === "car" && (
                <div>
                  <h2 className="font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
                    Popular taxi routes from Salooni
                  </h2>
                  <RouteLinks variant="pills" align="start" className="mt-4" />
                </div>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-charcoal-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="font-display text-lg font-bold text-charcoal-900">
                  Book a {category.name === "JCB" ? "JCB" : category.name.toLowerCase()}
                </h2>
                <p className="mt-1 text-[13px] text-charcoal-600">
                  Share your dates and location. Asking is free.
                </p>
                <div className="mt-4">
                  <EnquiryForm
                    variant="compact"
                    bare
                    defaultVehicleType={category.name}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {pageFaqs.length > 0 && (
        <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
          <div className="container-page">
            <SectionHeading
              eyebrow="Before You Book"
              title="Common Questions"
            />
            <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
              <FaqAccordion items={pageFaqs} />
              <div className="mt-6 flex justify-center">
                <LinkButton href="/faq" variant="outline">
                  View All FAQs
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other vehicle types */}
      <section className="bg-white py-10 sm:py-12">
        <div className="container-page">
          <h2 className="text-center font-display text-xl font-bold text-charcoal-900 sm:text-2xl">
            Other Vehicles on Hire in Salooni
          </h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {otherPages.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${other.slug}`}
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
                >
                  {other.eyebrow}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactSection className="bg-charcoal-50 py-10 sm:py-12 lg:py-14" />

      {/* Service structured data — breadcrumbs come from PageHeader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({
              name: page.heading,
              serviceType: page.serviceType,
              description: page.description,
              path: `/${page.slug}`,
              ...(page.category === "car" ? { type: "TaxiService" as const } : {}),
            }),
          ),
        }}
      />
    </>
  );
}
