import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { ContactSection } from "@/components/shared/ContactSection";
import { LinkButton } from "@/components/ui/Button";
import { faqs } from "@/data/faqs";
import { faqSchema } from "@/lib/seo";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const pageTitle = "Vehicle Booking FAQs for Salooni";
const pageDescription =
  "Answers to common questions about booking a vehicle in Salooni, Chamba: pricing, drivers, pickups, outstation trips, goods, JCB and tractor hire.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help Centre"
        title="Frequently Asked Questions"
        description="Simple answers to what people in Salooni usually ask before booking a vehicle with us."
        image="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />

      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={faqs} />

            <div className="mt-8 rounded-2xl border border-dashed border-forest-300 bg-forest-50 p-6 text-center">
              <h2 className="font-display text-lg font-bold text-forest-900">
                Still have a question?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-forest-800/80">
                Call or WhatsApp our team in Salooni. We will answer
                questions about your route, dates or requirement.
              </p>
              <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
                <LinkButton href="/contact#enquiry" variant="primary">
                  Start an Enquiry
                </LinkButton>
                <LinkButton
                  href={generalWhatsAppUrl()}
                  variant="whatsapp"
                  external
                >
                  WhatsApp Us
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
