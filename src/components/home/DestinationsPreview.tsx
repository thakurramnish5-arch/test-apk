import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { DestinationCard } from "@/components/shared/DestinationCard";
import { RouteLinks } from "@/components/shared/RouteLinks";
import { featuredDestinations } from "@/data/destinations";

export function DestinationsPreview() {
  return (
    <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Where We Go"
          title="Popular Trips From Salooni"
          description="Trips start from Salooni and nearby villages. Tell us where you are going and we will send the right vehicle."
        />

        <div className="mobile-rail mt-6 sm:mt-8 sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDestinations.map((destination, index) => (
            <Reveal key={destination.id} delay={index * 60}>
              <DestinationCard destination={destination} />
            </Reveal>
          ))}
        </div>

        <h3 className="mt-8 text-center font-display text-base font-bold text-charcoal-900 sm:mt-10">
          Taxi routes from Salooni
        </h3>
        <RouteLinks variant="pills" className="mt-3" />

        <div className="mt-6 sm:mt-9 flex flex-col justify-center gap-2.5 sm:flex-row">
          <LinkButton href="/contact#enquiry" variant="primary" size="lg">
            Plan My Journey
          </LinkButton>
          <LinkButton href="/destinations" variant="outline" size="lg">
            View All Destinations
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
