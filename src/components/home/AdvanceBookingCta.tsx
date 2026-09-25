import Image from "next/image";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

export function AdvanceBookingCta() {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950 py-10 sm:py-12 lg:py-14">
      <Image
        src="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?auto=format&fit=crop&w=2000&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/85 to-charcoal-950/70"
        aria-hidden="true"
      />

      <div className="container-page relative">
        <div className="max-w-2xl">
          <span className="eyebrow border-white/20 bg-white/10 text-white">
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Advance Booking
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.15]">
            Planning Ahead?
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            Book early for a wedding, a function, a train at Pathankot or a
            trip to Bharmour. Vehicles get busy during the wedding season and
            holidays.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <LinkButton href="/contact#enquiry" variant="accent" size="lg">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Advance Booking
            </LinkButton>
            <LinkButton
              href={generalWhatsAppUrl("an advance vehicle booking")}
              variant="whatsapp"
              size="lg"
              external
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Booking
            </LinkButton>
            <LinkButton href={telHref} variant="light" size="lg">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Booking Team
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
