import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { RouteLinks } from "@/components/shared/RouteLinks";
import { ContactSection } from "@/components/shared/ContactSection";
import { LinkButton } from "@/components/ui/Button";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Taxi Routes From Salooni, Chamba",
  description:
    "Taxi and cab routes from Salooni, Chamba: Chamba, Pathankot station and airport, Dalhousie, Khajjiar, Dharamshala and Kangra airport, and Manimahesh yatra.",
  path: "/routes",
});

export default function RoutesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Taxi Routes"
        title="Taxi Routes From Salooni"
        description="The trips people book most from Salooni, one way or return. Pick a route to see the cars that suit the road, how pickup works and common questions."
        image="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Routes" }]}
      >
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <LinkButton href="/contact#enquiry" variant="accent" size="lg">
            Start an Enquiry
          </LinkButton>
          <LinkButton
            href={generalWhatsAppUrl("a taxi from Salooni")}
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
          <RouteLinks />

          <div className="mt-6 rounded-2xl border border-charcoal-200 bg-white p-6 text-center shadow-sm sm:mt-8 sm:p-8">
            <h2 className="font-display text-xl font-bold text-charcoal-900">
              Going somewhere else?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-charcoal-600">
              We also run outstation trips to places like Amritsar, Jammu,
              Chandigarh, Delhi, Manali and Shimla. Share your route and we
              suggest a vehicle that suits the roads.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">
              <LinkButton href="/destinations" variant="primary">
                All Destinations
              </LinkButton>
              <LinkButton href="/taxi-car-booking" variant="outline">
                Taxi &amp; Cab Booking
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />
    </>
  );
}
