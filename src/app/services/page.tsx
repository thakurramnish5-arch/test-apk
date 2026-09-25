import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ContactSection } from "@/components/shared/ContactSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { services } from "@/data/services";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const pageTitle = "Vehicle Services in Salooni, Chamba";
const pageDescription =
  "Vehicles with experienced drivers from Salooni, Chamba for weddings, hospital visits, Pathankot drops, goods, house shifting, JCB, trucks and tractors. Fair rates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Vehicles for Travel, Goods and Work"
        description="From a family trip or a train at Pathankot to goods, house shifting or a construction site — we provide the right vehicle with an experienced driver, from Salooni."
        image="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="/contact#enquiry" variant="accent" size="lg">
            Start an Enquiry
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl("your services")}
            variant="light"
            size="lg"
            external
          >
            WhatsApp Us
          </LinkButton>
        </div>
      </PageHeader>

      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 40}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 rounded-2xl border border-dashed border-forest-300 bg-forest-50 p-6 text-center sm:p-8">
            <h2 className="font-display text-xl font-bold text-forest-900">
              Need something not listed here?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-forest-800/80">
              Tell us where you&rsquo;re going, what you&rsquo;re carrying or
              what the job is — we&rsquo;ll suggest the right vehicle and tell
              you the rate upfront.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
              <LinkButton href="/contact#enquiry" variant="primary">
                Send Your Requirement
              </LinkButton>
              <LinkButton href="/vehicles" variant="outline">
                Browse Vehicles
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <ContactSection className="bg-charcoal-50 py-10 sm:py-12 lg:py-14" />
    </>
  );
}
