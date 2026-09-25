"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { LinkButton } from "@/components/ui/Button";
import { ShareMenu } from "@/components/shared/ShareMenu";
import { InstallAppButton } from "@/components/shared/InstallAppButton";
import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/services", label: "Services" },
  { href: "/destinations", label: "Destinations" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Solid background once the user scrolls away from the top
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // A tap anywhere outside the header (page, bottom bar, chat) closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-charcoal-200 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-b border-transparent bg-white",
        )}
      >
        <nav
          className="container-page flex h-16 items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md"
            aria-label={`${siteConfig.brand.name} home`}
          >
            <Logo idPrefix="nav-logo" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
    {navLinks.map((link, index) => {
      const active = isActive(link.href);

      return (
        <li
          key={link.href}
          className="animate-nav-item"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <Link
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative rounded-md px-3 py-2 text-sm font-medium transition-all duration-300",
              active
                ? "text-forest-700"
                : "text-charcoal-600 hover:bg-charcoal-100 hover:text-charcoal-900",
            )}
          >
            {link.label}

            {/* Animated underline */}
            <span
              className={cn(
                "absolute bottom-0 left-3 right-3 h-0.5 origin-left rounded-full bg-forest-700 transition-transform duration-300",
                active
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </Link>
        </li>
      );
    })}
  </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={telHref}
              className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-charcoal-700 transition-colors hover:text-forest-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">
                {siteConfig.contact.phoneDisplay}
              </span>
              <span className="xl:hidden">Call</span>
            </a>
            <LinkButton href="/contact#enquiry" size="sm" variant="primary">
              Start an Enquiry
            </LinkButton>
            <ShareMenu />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <a
              href={telHref}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-charcoal-300 text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
              aria-label={`Call ${siteConfig.contact.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-charcoal-300 text-charcoal-800 transition-colors hover:border-forest-400"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
            <ShareMenu compact />
          </div>
        </nav>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          hidden={!menuOpen}
          className="border-t border-charcoal-200 bg-white lg:hidden"
        >
          <ul className="container-page flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-forest-50 text-forest-800"
                      : "text-charcoal-700 hover:bg-charcoal-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page flex flex-col gap-2 border-t border-charcoal-200 py-4">
            <LinkButton href="/contact#enquiry" fullWidth variant="primary">
              Start an Enquiry
            </LinkButton>
            <LinkButton href={telHref} fullWidth variant="outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {siteConfig.contact.phoneDisplay}
            </LinkButton>
            <InstallAppButton variant="menu" />
          </div>
        </div>
      </header>

      {/* Dims the page behind the open mobile menu; tapping it closes the menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal-950/40 animate-fade-in lg:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
