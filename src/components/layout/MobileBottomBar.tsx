"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, House, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { generalWhatsAppUrl, telHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Sticky bottom action bar shown on small screens only.
 * The matching bottom padding lives on the page wrapper in layout.tsx,
 * so this bar never covers page content.
 */
export function MobileBottomBar() {
  const onHome = usePathname() === "/";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-200 bg-white/95 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden">
      <nav
        className="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]"
        aria-label="Quick contact actions"
      >
        <Link
          href="/"
          aria-current={onHome ? "page" : undefined}
          className={cn(
            "flex flex-col items-center justify-center gap-1 border-r border-charcoal-200 py-2.5 transition-colors active:bg-charcoal-100",
            onHome ? "text-forest-700" : "text-charcoal-700",
          )}
        >
          <House className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Home</span>
        </Link>

        <a
          href={telHref}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-charcoal-700 transition-colors active:bg-charcoal-100"
          aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>

        <a
          href={generalWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 border-x border-charcoal-200 py-2.5 text-whatsapp-dark transition-colors active:bg-charcoal-100"
          aria-label="Message us on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        <Link
          href="/contact#enquiry"
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-forest-700 transition-colors active:bg-forest-50"
        >
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
          <span className="text-[11px] font-semibold">Enquire</span>
        </Link>
      </nav>
    </div>
  );
}
