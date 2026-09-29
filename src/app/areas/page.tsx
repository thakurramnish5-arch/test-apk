import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { AreaLinks } from "@/components/shared/AreaLinks";
import { ContactSection } from "@/components/shared/ContactSection";
import { LinkButton } from "@/components/ui/Button";
import { serviceAreas } from "@/data/serviceAreas";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

const areaNames = serviceAreas.map((area) => area.name).join(", ");

export const metadata: Metadata = pageMetadata({
  title: "Taxi & Vehicle Booking Across Salooni and Churah",
  description: `Taxi, car, bus, pickup, truck, tractor and JCB on hire in Salooni and nearby areas — ${areaNames}. Village pickups with experienced drivers.`,
  path: "/areas",
});

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Areas We Serve"
        title="Taxi & Vehicle Booking Across Salooni and Churah"
        description="Pickups from Salooni and the nearby areas below, with drivers who know the local hill roads. Choose your area to see the vehicles and trips people book from there."
        image="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Areas" }]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="/contact#enquiry" variant="accent" size="lg">
            Start an Enquiry
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl("a vehicle from my village")}
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
          <AreaLinks />

          <div className="mt-6 rounded-2xl border border-charcoal-200 bg-white p-6 text-center shadow-sm sm:mt-8 sm:p-8">
            <h2 className="font-display text-xl font-bold text-charcoal-900">
              Your village is not listed?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
              We pick up from Salooni and villages across the tehsil. Tell us
              your village and the road access, and we confirm a vehicle that
              can reach it.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
              <LinkButton href="/contact#enquiry" variant="primary">
                Share Your Village
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
