import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { VehicleBrowser } from "@/components/vehicles/VehicleBrowser";
import { ContactSection } from "@/components/shared/ContactSection";

const pageTitle = "Vehicles on Hire in Salooni";
const pageDescription =
  "Cars, buses, pickups, trucks, tractors and JCB on hire in Salooni, Chamba, with experienced drivers and operators. Send a free enquiry on WhatsApp or phone.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/vehicles",
  },
};

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
          {/* useSearchParams in VehicleBrowser requires a Suspense boundary */}
          <Suspense fallback={<BrowserSkeleton />}>
            <VehicleBrowser />
          </Suspense>
        </div>
      </section>

      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />
    </>
  );
}

/** Loading placeholder shown while the category tabs hydrate. */
function BrowserSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-10 animate-pulse rounded-full bg-white" />
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-[380px] animate-pulse rounded-card border border-charcoal-200 bg-white"
          />
        ))}
      </div>
    </div>
  );
}
