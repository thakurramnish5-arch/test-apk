"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy, Mail, Share2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/shared/SocialIcons";
import { hasSocialLink, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface ShareMenuProps {
  /** Renders the icon-only trigger used in the mobile header row. */
  compact?: boolean;
  className?: string;
}

const shareText = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}. Book cars, buses, goods and work vehicles from Salooni, Chamba.`;

/** Each network's share endpoint, built from the current page URL. */
function shareTargets(url: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(shareText);

  return [
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`,
      Icon: WhatsAppIcon,
      className: "bg-whatsapp-tint/15 text-whatsapp",
    },
    {
      key: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: FacebookIcon,
      className: "bg-[#1877F2]/12 text-[#1877F2]",
    },
    {
      key: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      Icon: XIcon,
      className: "bg-charcoal-900/10 text-charcoal-900",
    },
    {
      key: "telegram",
      label: "Telegram",
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      Icon: TelegramIcon,
      className: "bg-[#229ED9]/12 text-[#229ED9]",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: LinkedInIcon,
      className: "bg-[#0A66C2]/12 text-[#0A66C2]",
    },
    {
      key: "email",
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(siteConfig.brand.name)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`,
      Icon: Mail,
      className: "bg-charcoal-200/70 text-charcoal-700",
    },
  ];
}

/**
 * Share the current page to WhatsApp and the major social networks.
 * Instagram has no public web share endpoint, so it is offered as a
 * "copy link, then paste" step alongside a link to the profile.
 */
export function ShareMenu({ compact = false, className }: ShareMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Read the address off the browser so the link carries whatever host the
  // visitor is actually on, falling back to the configured site URL.
  useEffect(() => {
    setUrl(
      typeof window === "undefined"
        ? `${siteConfig.url}${pathname}`
        : window.location.href,
    );
  }, [pathname]);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      return;
    } catch {
      // The async clipboard is unavailable on insecure origins and blocked
      // by some in-app browsers — fall through to the legacy path.
    }

    const input = document.getElementById(
      "share-url-input",
    ) as HTMLInputElement | null;
    if (!input) return;

    input.select();
    input.setSelectionRange(0, url.length);
    try {
      // Deprecated, but still the only copy that works in those browsers.
      if (document.execCommand("copy")) {
        setCopied(true);
        return;
      }
    } catch {
      // Ignored — the link stays selected so it can be copied by hand.
    }
  };

  const handleTrigger = async () => {
    // Prefer the OS share sheet on phones — it lists every app the visitor
    // actually has. Falls back to our own dialog everywhere else.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: siteConfig.brand.name,
          text: shareText,
          url,
        });
        return;
      } catch {
        // Cancelled or unsupported — fall through to the dialog.
      }
    }
    setOpen(true);
  };

  const targets = shareTargets(url);

  return (
    <>
      <button
        type="button"
        onClick={handleTrigger}
        aria-label="Share this website"
        className={cn(
          // Matches the Button component's "secondary" variant so the header
          // actions read as one set.
          "inline-flex items-center justify-center gap-1.5 rounded-lg bg-himalaya-700 font-semibold text-white shadow-sm transition-all duration-200",
          "hover:bg-himalaya-800 hover:shadow-md active:translate-y-px",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-himalaya-700",
          compact ? "h-10 w-10" : "h-9 px-3.5 text-[13px]",
          className,
        )}
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        {!compact && <span className="hidden xl:inline">Share</span>}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Share this website"
        description={`Send ${siteConfig.brand.name} to friends, family or a group.`}
      >
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {targets.map(({ key, label, href, Icon, className: tone }) => (
            <li key={key}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 rounded-xl border border-charcoal-200 px-2 py-3 transition-colors hover:border-forest-300 hover:bg-forest-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    tone,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold text-charcoal-700">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <label
            htmlFor="share-url-input"
            className="field-label"
          >
            Page link
          </label>
          <div className="flex gap-2">
            <input
              id="share-url-input"
              type="text"
              readOnly
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              className="field-input flex-1 text-charcoal-600"
            />
            <button
              type="button"
              onClick={copyLink}
              className={cn(
                "inline-flex h-auto shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-600",
                copied
                  ? "border-forest-300 bg-forest-50 text-forest-700"
                  : "border-charcoal-300 text-charcoal-700 hover:border-forest-400 hover:bg-forest-50 hover:text-forest-700",
              )}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-charcoal-500">
            Instagram does not allow sharing a link directly from the web —
            copy the link above and paste it into your story or bio.
          </p>
        </div>

        {(hasSocialLink(siteConfig.social.instagram) ||
          hasSocialLink(siteConfig.social.facebook)) && (
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-charcoal-200 pt-4">
          <span className="text-xs font-medium text-charcoal-500">
            Follow us
          </span>
          {hasSocialLink(siteConfig.social.instagram) && (
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-forest-400 hover:text-forest-700"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          )}
          {hasSocialLink(siteConfig.social.facebook) && (
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-600 transition-colors hover:border-forest-400 hover:text-forest-700"
          >
            <FacebookIcon className="h-4 w-4" />
          </a>
          )}
        </div>
        )}
      </Modal>
    </>
  );
}
