import Link from "next/link";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/shared/SocialIcons";
import { Logo } from "@/components/shared/Logo";
import { InstallAppButton } from "@/components/shared/InstallAppButton";
import { hasSocialLink, siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { categoryPagePath } from "@/data/categoryPages";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQs" },
];

const destinationLinks = [
  { href: "/destinations#chamba", label: "Chamba" },
  { href: "/destinations#dalhousie", label: "Dalhousie" },
  { href: "/destinations#khajjiar", label: "Khajjiar" },
  { href: "/destinations#bharmour", label: "Bharmour" },
  { href: "/destinations#pathankot", label: "Pathankot" },
  { href: "/destinations#dharamshala", label: "Dharamshala" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 text-charcoal-300">
      <div className="container-page py-10 lg:py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5"
              aria-label={`${siteConfig.brand.name} home`}
            >
              <Logo tone="dark" idPrefix="footer-logo" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-charcoal-400">
              {siteConfig.brand.description}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={telHref}
                className="flex items-center gap-2.5 text-charcoal-300 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-forest-400" aria-hidden="true" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-charcoal-300 transition-colors hover:text-white"
              >
                <MessageCircle
                  className="h-4 w-4 text-forest-400"
                  aria-hidden="true"
                />
                WhatsApp enquiry
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-charcoal-300 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-forest-400" aria-hidden="true" />
                {siteConfig.contact.email}
              </a>
              <p className="flex items-start gap-2.5 text-charcoal-400">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-forest-400"
                  aria-hidden="true"
                />
                {siteConfig.contact.address.city},{" "}
                {siteConfig.contact.address.district},{" "}
                {siteConfig.contact.address.state}
              </p>
            </div>

            {/*
              Social links appear only once real URLs are set in
              src/config/site.ts — a "#" placeholder renders nothing.
            */}
            {(hasSocialLink(siteConfig.social.instagram) ||
              hasSocialLink(siteConfig.social.facebook)) && (
              <div className="mt-6 flex items-center gap-3">
                {hasSocialLink(siteConfig.social.instagram) && (
                  <a
                    href={siteConfig.social.instagram}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-800 text-charcoal-400 transition-colors hover:border-forest-500 hover:text-white"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
                {hasSocialLink(siteConfig.social.facebook) && (
                  <a
                    href={siteConfig.social.facebook}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-charcoal-800 text-charcoal-400 transition-colors hover:border-forest-500 hover:text-white"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Two columns on phones so the footer is not one long list;
              on large screens the wrapper dissolves into the parent grid. */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-1 lg:contents">
            <FooterColumn title="Company" links={companyLinks} />

            <FooterColumn
              title="Vehicles"
              links={categories.map((c) => ({
                href: categoryPagePath[c.id],
                label: c.pluralName,
              }))}
            />

            <div className="col-span-2 lg:col-span-1">
              <FooterColumn
                title="Trips from Salooni"
                links={destinationLinks}
              />
            </div>
          </div>
        </div>

        {/* Support row */}
        <div className="mt-6 sm:mt-8 border-t border-charcoal-800 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
            Support
          </h3>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href="/contact#enquiry"
                className="text-charcoal-400 transition-colors hover:text-white"
              >
                Start an Enquiry
              </Link>
            </li>
            <li>
              <Link
                href="/contact#enquiry"
                className="text-charcoal-400 transition-colors hover:text-white"
              >
                Advance Booking
              </Link>
            </li>
            <li>
              <a
                href={telHref}
                className="text-charcoal-400 transition-colors hover:text-white"
              >
                Call Us
              </a>
            </li>
            <li>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal-400 transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>

          {/* The app is for phones, so the download button is mobile only */}
          <div className="mt-6 flex justify-center lg:hidden">
            <InstallAppButton
              variant="footer"
              className="rounded-lg border border-charcoal-700 bg-charcoal-900 px-5 py-2.5 text-sm font-semibold text-white"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-charcoal-400 sm:flex-row">
          <p>
            © {year} {siteConfig.brand.name}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Vehicle availability and rates are confirmed at the time of enquiry.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-charcoal-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
