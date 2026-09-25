import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/data/services";

/** Homepage preview — the first eight services. Full list lives at /services. */
export function ServicesPreview() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Services We Provide"
          description="Trips, goods, shifting and work vehicles — all from one local team in Salooni."
        />

        <div className="mobile-rail mobile-rail-narrow mt-6 sm:mt-8 sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 8).map((service, index) => (
            <Reveal key={service.id} delay={index * 50}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <div className="mt-6 sm:mt-9 flex justify-center">
          <LinkButton href="/services" variant="outline" size="lg">
            View All Services
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
