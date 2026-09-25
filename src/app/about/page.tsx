import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Compass, HeartHandshake, Wrench } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactSection } from "@/components/shared/ContactSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { siteConfig } from "@/config/site";

const pageTitle = "About Us — Vehicles on Hire in Salooni";
const pageDescription =
  "Salooni Transport Hub provides cars, buses, pickups, trucks, tractors and JCB in Salooni, Chamba — with experienced drivers and operators, at fair local rates.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/about",
  },
};

const principles = [
  {
    icon: Compass,
    title: "The route decides the vehicle",
    description:
      "A car that is fine for a Chamba town run may not suit a Bhandal valley road or a long drive to Delhi. We suggest a vehicle based on where you are going.",
  },
  {
    icon: HeartHandshake,
    title: "A fair price, told upfront",
    description:
      "If a smaller vehicle does the job, we will tell you — we never push a bigger one to charge more. You know the full rate before you confirm.",
  },
  {
    icon: Wrench,
    title: "Vehicles that are ready to work",
    description:
      "A breakdown on a hill road wastes time and is not safe. Vehicles are checked before the trip, and every one comes with an experienced driver or operator.",
  },
];

const coverage = [
  "Weddings, functions and family trips",
  "Hospital and medical visits to Chamba",
  "Pathankot station and airport drops",
  "Goods transport and house shifting",
  "JCB and trucks for construction work",
  "Tractors for farm work",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Your Local Transport Team in Salooni"
        description={`${siteConfig.brand.name} provides vehicles with experienced drivers to people in Salooni and nearby areas — for a trip, a function, goods or work.`}
        image="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2000&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <span className="eyebrow">Why We Started</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
                Finding the right vehicle in Salooni should be easy
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-charcoal-700">
                <p>
                  In Salooni, most people find a vehicle by asking around. That
                  takes time, and it is hard when you need a car early in the
                  morning for a train at Pathankot, or a tempo on the day of a
                  house shift.
                </p>
                <p>
                  We are a local transport team in Salooni. You tell us what you
                  need on WhatsApp or phone, and we send the right vehicle with
                  an experienced driver, at a fair rate you know upfront. Trips
                  start from Salooni and nearby villages, and go outstation too.
                </p>
                <p>
                  Work vehicles matter too. A pickup that can climb a steep
                  village road, a truck that fits the road at both ends, a JCB
                  with an operator who knows hill sites — these small details
                  decide whether the job goes well.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <LinkButton href="/vehicles" variant="primary" size="lg">
                  Browse Vehicles
                </LinkButton>
                <LinkButton href="/contact#enquiry" variant="outline" size="lg">
                  Talk to Our Team
                </LinkButton>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=500&auto=format&fit=crop&q=60"
                  alt="A car on a snow-lined mountain road in the hills"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <SectionHeading
            eyebrow="How We Work"
            title="What Guides Our Recommendations"
            description="A few simple rules we follow for every booking."
          />

          <div className="mt-6 sm:mt-8 grid gap-5 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 70}>
                <article className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                    <principle.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-bold text-charcoal-900">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-600">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-white py-10 sm:py-12 lg:py-14">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1489595672898-26572ba975a3?w=500&auto=format&fit=crop&q=60"
                  alt="Passenger and goods vehicles on a busy hill-town street"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2" delay={100}>
              <span className="eyebrow">What We Cover</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
                One local team for many kinds of needs
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal-700">
                A family going to a wedding, a trader sending goods, a farmer
                who needs a tractor, a visitor going to Khajjiar — they all
                need the right vehicle on the right day, without running
                around.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {coverage.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-600"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-charcoal-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <ContactSection className="bg-white py-10 sm:py-12 lg:py-14" />
    </>
  );
}
