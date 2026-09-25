import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center bg-charcoal-50 py-16">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50">
            <Compass className="h-8 w-8 text-forest-600" aria-hidden="true" />
          </span>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-forest-700">
            404 — Page not found
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-charcoal-900 sm:text-3xl">
            We could not find this page
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-charcoal-600">
            This page may have moved. You can browse our vehicles, or call or
            WhatsApp our team in Salooni with what you need.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <LinkButton href="/vehicles" variant="primary" size="lg">
              Browse Vehicles
            </LinkButton>
            <LinkButton href="/" variant="outline" size="lg">
              Back to Home
            </LinkButton>
          </div>

          <div className="mt-4 flex flex-col justify-center gap-2.5 sm:flex-row">
            <LinkButton href={generalWhatsAppUrl()} variant="whatsapp" external>
              WhatsApp Us
            </LinkButton>
            <LinkButton href={telHref} variant="outline">
              Call Now
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
