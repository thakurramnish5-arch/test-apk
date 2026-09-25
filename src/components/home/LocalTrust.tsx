import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const points = [
  "Car and bus drivers who know the bends, weather and village roads around Salooni and Chamba",
  "Pickup and truck drivers used to loaded runs on steep hill roads",
  "JCB and tractor operators who work on hill sites and terraced fields",
  "We suggest the vehicle your route needs — never a bigger one just to charge more",
];

export function LocalTrust() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">Experienced People</span>
            <h2 className="mt-4 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
              The Right Person Behind Every Wheel
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal-600 sm:text-base">
              A good vehicle is only half the job. The person driving it decides
              whether your family reaches safely, your goods arrive in one piece
              and your site work is done right — so every booking comes with an
              experienced local driver or operator.
            </p>

            <ul className="mt-4 space-y-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 text-forest-600"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-charcoal-700">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <LinkButton href="/about" variant="primary" size="lg">
                About Our Service
              </LinkButton>
              <LinkButton href="/vehicles" variant="outline" size="lg">
                Browse Vehicles
              </LinkButton>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={100}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1648728070446-5b881546728a?w=500&auto=format&fit=crop&q=60"
                alt="Snow-dusted mountain ridges and pine forest in the hills"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
