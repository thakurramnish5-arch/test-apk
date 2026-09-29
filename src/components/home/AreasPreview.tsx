import { SectionHeading } from "@/components/ui/SectionHeading";
import { AreaLinks } from "@/components/shared/AreaLinks";

export function AreasPreview() {
  return (
    <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Areas We Serve"
          title="Taxi & Vehicles Near You"
          description="Pickups from Salooni and nearby areas. Choose yours to see the vehicles and trips people book from there."
        />
        <div className="mt-6 sm:mt-8">
          <AreaLinks />
        </div>
      </div>
    </section>
  );
}
