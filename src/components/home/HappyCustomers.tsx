import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

/** Statistics band. Values come from siteConfig.stats. */
export function HappyCustomers() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 py-10 sm:py-12 lg:py-14">
      <Image
        src="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-forest-950/90 to-forest-800/80"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
            One Local Team for Every Trip and Job.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            Weddings, hospital visits, train and airport drops, goods, house
            shifting or site work — tell us what you need and we send the
            right vehicle with an experienced driver, for local or outstation
            trips from Salooni.
          </p>
        </div>

        <ul className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {siteConfig.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80} as="li">
              <div className="h-full rounded-xl border border-white/15 bg-white/5 px-3 py-4 text-center backdrop-blur-sm sm:p-5">
                <span className="block break-words font-display text-lg font-bold leading-tight text-white sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[13px] font-medium text-white/80">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 sm:mt-9 flex flex-col justify-center gap-2.5 sm:flex-row">
          <LinkButton href="/vehicles" variant="accent" size="lg">
            Browse Vehicles
          </LinkButton>
          <LinkButton href={generalWhatsAppUrl()} variant="light" size="lg" external>
            Talk to Our Team
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
