import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/shared/SocialIcons";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasSocialLink, siteConfig } from "@/config/site";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

interface ContactSectionProps {
  /** Adds a top border when placed directly after another light section. */
  className?: string;
}

export function ContactSection({ className }: ContactSectionProps) {
  return (
    <section className={className} id="contact">
      <div className="container-page">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Ways to Reach Us"
          description="Call, WhatsApp or send the form to our team in Salooni — whatever is easiest for you."
        />

        <div className="mt-6 sm:mt-8 grid gap-5 lg:grid-cols-3">
          {/* Phone */}
          <div className="card-surface flex flex-col p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[15px] font-bold text-charcoal-900">
              Call Our Booking Team
            </h3>
            <p className="mt-1.5 text-[13px] text-charcoal-600">
              The quickest way to check if a vehicle is free, when you need one fast.
            </p>
            <a
              href={telHref}
              className="mt-3 text-lg font-bold text-forest-700 transition-colors hover:text-forest-800"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
            <div className="mt-auto pt-5">
              <LinkButton href={telHref} variant="primary" fullWidth>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </LinkButton>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="card-surface flex flex-col p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-whatsapp">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[15px] font-bold text-charcoal-900">
              Message Us on WhatsApp
            </h3>
            <p className="mt-1.5 text-[13px] text-charcoal-600">
              Send your route, date and what you need. We reply with a fair, upfront quote.
            </p>
            <p className="mt-3 text-lg font-bold text-charcoal-900">
              {siteConfig.contact.phoneDisplay}
            </p>
            <div className="mt-auto pt-5">
              <LinkButton
                href={generalWhatsAppUrl()}
                variant="whatsapp"
                fullWidth
                external
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </LinkButton>
            </div>
          </div>

          {/* Details */}
          <div className="card-surface flex flex-col p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-himalaya-50 text-himalaya-700">
              <MapPin className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[15px] font-bold text-charcoal-900">
              Find Us
            </h3>

            <dl className="mt-3 space-y-2.5 text-[13px]">
              <div className="flex items-start gap-2">
                <dt className="sr-only">Address</dt>
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400"
                  aria-hidden="true"
                />
                <dd className="text-charcoal-600">
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.state}
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="sr-only">Email</dt>
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400"
                  aria-hidden="true"
                />
                <dd>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-charcoal-600 transition-colors hover:text-forest-700"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-2">
                <dt className="sr-only">Availability</dt>
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400"
                  aria-hidden="true"
                />
                <dd className="font-medium text-charcoal-700">
                  {siteConfig.contact.availabilityNote}
                </dd>
              </div>
            </dl>

            {/* Shown only once real profile URLs are set in site.ts */}
            {(hasSocialLink(siteConfig.social.instagram) ||
              hasSocialLink(siteConfig.social.facebook)) && (
              <div className="mt-4 flex items-center gap-2">
                {hasSocialLink(siteConfig.social.instagram) && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-300 text-charcoal-600 transition-colors hover:border-forest-400 hover:text-forest-700"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
                {hasSocialLink(siteConfig.social.facebook) && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-300 text-charcoal-600 transition-colors hover:border-forest-400 hover:text-forest-700"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}

            <div className="mt-auto pt-5">
              <LinkButton href="/contact#enquiry" variant="outline" fullWidth>
                Start an Enquiry
              </LinkButton>
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-[13px] font-medium text-charcoal-600">
          <span
            className="h-2 w-2 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          Free to enquire. No payment needed to ask.
        </p>
      </div>
    </section>
  );
}
