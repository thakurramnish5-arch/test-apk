import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  VehicleBrowser,
  VehicleBrowserView,
} from "@/components/vehicles/VehicleBrowser";
import { ContactSection } from "@/components/shared/ContactSection";
import { pageMetadata } from "@/lib/seo";

const pageTitle = "Vehicles on Hire in Salooni, Chamba";
const pageDescription =
  "Cars, buses, pickups, trucks, tractors and JCB on hire in Salooni, Chamba, with experienced drivers and operators. Send a free enquiry on WhatsApp or phone.";

export const metadata: Metadata = pageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/vehicles",
});

export default function VehiclesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vehicles We Provide"
        title="Find the Right Vehicle in Salooni"
        description="Local taxis for trips, pickups and trucks for goods, tractors and JCB for work — each with an experienced driver or operator. Pick one and send a simple enquiry."
        image="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Vehicles" }]}
      />

      <section className="bg-charcoal-50 py-6 sm:py-8">
        <div className="container-page">
          {/* useSearchParams in VehicleBrowser requires a Suspense boundary.
              The fallback is the full list, so it is in the static HTML. */}
          <Suspense fallback={<VehicleBrowserView />}>
            <VehicleBrowser />
          </Suspense>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />
    </>
  );
}
