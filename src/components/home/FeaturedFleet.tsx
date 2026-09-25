import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { featuredVehicles } from "@/data/vehicles";

export function FeaturedFleet() {
  return (
    <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Popular Vehicles"
          title="Frequently Booked Vehicles"
          description="Some of the vehicles people in Salooni ask for most."
        />

        <div className="mt-6 sm:mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVehicles.map((vehicle, index) => (
            <Reveal key={vehicle.id} delay={index * 60}>
              <VehicleCard vehicle={vehicle} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 sm:mt-9 flex justify-center">
          <LinkButton href="/vehicles" variant="primary" size="lg">
            View All Vehicles
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
