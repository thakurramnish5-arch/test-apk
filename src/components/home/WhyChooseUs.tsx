import {
  BadgeIndianRupee,
  CarFront,
  MapPinned,
  ShieldCheck,
  SlidersHorizontal,
  UserCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: UserCheck,
    title: "Experienced Drivers & Operators",
    description:
      "Every vehicle comes with a driver who knows the hill roads around Salooni and Chamba. JCB and tractors come with their operator.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Fair, Upfront Rates",
    description:
      "You get the full rate for your route and days before you confirm. Fair local pricing, with no hidden charges added later.",
  },
  {
    icon: CarFront,
    title: "Every Vehicle, One Call",
    description:
      "Car, bus, pickup, truck, tractor or JCB — one call or WhatsApp to the same team, whatever the job.",
  },
  {
    icon: ShieldCheck,
    title: "Road-Ready Vehicles",
    description:
      "A breakdown on a hill road is not safe. Vehicles are checked before the trip, so you are not left stuck on the way.",
  },
  {
    icon: MapPinned,
    title: "Local to Salooni",
    description:
      "We are from Salooni. Pickup from your village, and one person to talk to from your first message to the end of the trip.",
  },
  {
    icon: SlidersHorizontal,
    title: "Flexible Booking",
    description:
      "Half day, many days, one-way or round trip, today or months ahead — we plan around what you need.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-charcoal-50 py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Book With Us"
          description="The right vehicle, an experienced driver and a fair price — that is what we promise on every booking."
        />

        <div className="mobile-rail mobile-rail-narrow mt-6 sm:mt-8 sm:grid sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 50}>
              <div className="card-surface h-full p-5 hover:-translate-y-1 hover:border-forest-300 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                  <reason.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 text-[15px] font-bold text-charcoal-900">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-charcoal-600">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
