import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactSection } from "@/components/shared/ContactSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { faqs } from "@/data/faqs";
import { siteConfig } from "@/config/site";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { MessageCircle, Phone } from "lucide-react";

const pageTitle = "Contact & Book a Vehicle in Salooni";
const pageDescription =
  "Call or WhatsApp our team in Salooni, Chamba to check vehicle availability and get a fair, upfront quote. Enquiry is free — no payment is needed to ask.";

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a Vehicle From Salooni"
        description="Need a vehicle today, or planning ahead? Call or WhatsApp our team in Salooni. Asking is free."
        image="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href={telHref} variant="accent" size="lg">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {siteConfig.contact.phoneDisplay}
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl()}
            variant="light"
            size="lg"
            external
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp Us
          </LinkButton>
        </div>
      </PageHeader>

      {/* Enquiry form */}
      <section
        id="enquiry"
        className="scroll-mt-20 bg-charcoal-50 py-10 sm:py-12 lg:py-14"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="Booking Enquiry"
            title="Send Us Your Requirement"
            description="Tell us where you are going, when, and what you need. We will reply with availability and the full rate upfront. You pay nothing to ask."
          />

          <div className="mx-auto mt-6 sm:mt-8 max-w-3xl">
            <EnquiryForm variant="full" />
          </div>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />

      {/* FAQ */}
      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="Before You Book"
            title="Common Questions"
            description="Quick answers while you decide."
          />
          <div className="mx-auto mt-6 sm:mt-8 max-w-3xl">
            <FaqAccordion items={faqs.slice(0, 6)} />
            <div className="mt-6 flex justify-center">
              <LinkButton href="/faq" variant="outline">
                View All FAQs
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
