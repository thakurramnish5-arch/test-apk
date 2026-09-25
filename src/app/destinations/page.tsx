import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { ContactSection } from "@/components/shared/ContactSection";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { destinations } from "@/data/destinations";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

const pageTitle = "Trips and Destinations From Salooni";
const pageDescription =
  "Book a vehicle from Salooni to Chamba, Dalhousie, Khajjiar, Bharmour, Pathankot station and airport, and outstation trips. Enquire on WhatsApp or by phone.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/destinations" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/destinations",
  },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where We Go"
        title="Trips Starting From Salooni"
        description="Trips start from Salooni and nearby villages. Going to Chamba, Dalhousie, Pathankot or further? Tell us where, and we will send a suitable vehicle with an experienced driver."
        image="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="/contact#enquiry" variant="accent" size="lg">
            Plan My Journey
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl("a trip from Salooni")}
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
              <Reveal key={destination.id} delay={index * 40}>
                <DestinationCard destination={destination} detailed />
              </Reveal>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 rounded-2xl border border-charcoal-200 bg-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="font-display text-xl font-bold text-charcoal-900">
              Going somewhere not listed here?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
              We also do outstation trips, like Manali, Shimla, Amritsar,
              Jammu, Chandigarh or Delhi. Share your route and we will suggest
              a vehicle that suits the roads.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
              <LinkButton href="/contact#enquiry" variant="primary">
                Share Your Route
              </LinkButton>
              <LinkButton href="/vehicles" variant="outline">
                Browse Vehicles
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />
    </>
  );
}
