"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  BadgeIndianRupee,
  CalendarCheck,
  MapPin,
  Phone,
  Timer,
  UserCheck,
} from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { telHref } from "@/lib/whatsapp";

const trustIndicators = [
  { icon: UserCheck, label: "Experienced Drivers" },
  { icon: BadgeIndianRupee, label: "Fair, Upfront Rates" },
  { icon: MapPin, label: "Based in Salooni" },
  { icon: Timer, label: "Quick WhatsApp Reply" },
];

/**
 * Fixed snowflake layout — generated once at module level with a seeded
 * sequence so server and client render identical markup (no hydration diff).
 */
const seeded = (i: number, n: number) =>
  (((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1) + 1) % 1;
const round = (value: number, places = 2) =>
  Math.round(value * 10 ** places) / 10 ** places;

const snowflakes = Array.from({ length: 28 }, (_, i) => {
  const seed = (n: number) => seeded(i, n);
  return {
    left: Math.round(seed(1) * 1000) / 10,
    size: 2 + Math.round(seed(2) * 4),
    duration: 9 + Math.round(seed(3) * 10),
    delay: -Math.round(seed(4) * 18),
    opacity: Math.round((0.35 + seed(5) * 0.5) * 100) / 100,
  };
});

/** Glowing light orbs that float upward like fireflies / campfire embers. */
const orbs = Array.from({ length: 14 }, (_, i) => ({
  left: round(seeded(i, 11) * 100, 1),
  size: 6 + Math.round(seeded(i, 12) * 14),
  duration: 12 + Math.round(seeded(i, 13) * 12),
  delay: -Math.round(seeded(i, 14) * 20),
  hue: seeded(i, 15) > 0.5 ? "amber" : "white",
}));

/** Small flocks crossing the sky at different heights and speeds. */
const birds = [
  { top: "12%", scale: 1, duration: 26, delay: 0 },
  { top: "18%", scale: 0.7, duration: 26, delay: 0.6 },
  { top: "9%", scale: 0.55, duration: 26, delay: 1.1 },
  { top: "24%", scale: 0.8, duration: 34, delay: 12 },
  { top: "28%", scale: 0.6, duration: 34, delay: 12.7 },
];

/**
 * The hero heading types out, holds, erases and moves to the next line.
 * The first line is the real heading for search engines and screen readers.
 */
const headings = [
  "Taxi & Cab Service in Salooni, Chamba",
  "Experienced Drivers, Honest Rates",
  "Safe Journeys on Every Hill Road",
];
const TYPE_MS = 55;
const ERASE_MS = 25;
const HOLD_MS = 3000;

export function Hero() {
  const headingText = headings[0];
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // Motion-sensitive visitors get the first heading, still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(headingText);
      return;
    }

    let line = 0;
    let length = 0;
    let erasing = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const text = headings[line];
      if (!erasing) {
        length++;
        setDisplayText(text.slice(0, length));
        if (length === text.length) {
          erasing = true;
          timer = setTimeout(step, HOLD_MS);
          return;
        }
        timer = setTimeout(step, TYPE_MS);
      } else {
        length--;
        setDisplayText(text.slice(0, length));
        if (length === 0) {
          erasing = false;
          line = (line + 1) % headings.length;
        }
        timer = setTimeout(step, length === 0 ? 400 : ERASE_MS);
      }
    };

    timer = setTimeout(step, TYPE_MS);
    return () => clearTimeout(timer);
  }, [headingText]);

  return (
    <section className="relative isolate overflow-hidden bg-charcoal-950">
      {/* Background image — the wrapper drifts slowly (Ken Burns) while the
          image itself plays the one-off entrance, so the transforms never clash. */}
      <div className="absolute inset-0 animate-hero-kenburns" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1662944113366-123561a844e1?w=1920&auto=format&fit=crop&q=85"
          alt="Himalayan mountain landscape"
          fill
          priority
          sizes="100vw"
          className="animate-hero-image scale-[1.02] object-cover object-center blur-[0.9px]"
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 animate-hero-overlay bg-black/15"
        aria-hidden="true"
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30"
        aria-hidden="true"
      />

      {/* Sun rays sweeping from the top corner */}
      <div className="hero-rays" aria-hidden="true" />

      {/* Aurora glow — slow-moving colour washes over the sky */}
      <div className="hero-aurora hero-aurora-1" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-2" aria-hidden="true" />
      <div className="hero-aurora hero-aurora-3" aria-hidden="true" />

      {/* Drifting mountain mist */}
      <div className="hero-mist hero-mist-1" aria-hidden="true" />
      <div className="hero-mist hero-mist-2" aria-hidden="true" />

      {/* Birds gliding across the sky */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {birds.map((bird, i) => (
          <div
            key={i}
            className="hero-bird"
            style={{
              top: bird.top,
              animationDuration: `${bird.duration}s`,
              animationDelay: `${bird.delay}s`,
            }}
          >
            <svg
              viewBox="0 0 24 10"
              className="hero-bird-wings"
              style={{ width: 28 * bird.scale, height: 12 * bird.scale }}
            >
              <path
                d="M1 2 Q6 8 12 6 Q18 8 23 2"
                fill="none"
                stroke="rgb(20 25 30 / 0.75)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating light orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {orbs.map((orb, i) => (
          <span
            key={i}
            className={`hero-orb hero-orb-${orb.hue}`}
            style={{
              left: `${orb.left}%`,
              width: orb.size,
              height: orb.size,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Gentle snowfall */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {snowflakes.map((flake, i) => (
          <span
            key={i}
            className="hero-snowflake"
            style={{
              left: `${flake.left}%`,
              width: flake.size,
              height: flake.size,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
            }}
          />
        ))}
      </div>

      <div className="container-page relative py-4 sm:py-10 lg:py-12">
        {/* Phones: heading → form → actions. Desktop: copy and actions on the
            left, form spanning both rows on the right. */}
        <div className="grid items-center gap-5 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-x-12 lg:gap-y-0">

          {/* Heading + description */}
          <div className="max-w-2xl lg:col-start-1 lg:row-start-1 lg:self-end">

            {/* Badge */}
            {/* <div className="animate-fade-down">
              <span className="eyebrow border-white bg-white/10 text-white backdrop-blur-sm">
                <MapPin
                  className="h-3.5 w-3.5 animate-pulse"
                  aria-hidden="true"
                />
                Booking Available
              </span>
            </div> */}

            {/* Heading */}
            <h1 className="animate-fade-up mt-5 min-h-[4.4rem] font-display text-[2rem] font-bold leading-[1.1] text-white sm:min-h-[4.4rem] sm:text-4xl lg:min-h-[7rem] lg:text-[3.25rem]">
              {/* Full heading for search engines and screen readers — the
                  typed version starts empty on the server render. */}
              <span className="sr-only">{headingText}</span>
              <span aria-hidden="true">{displayText}</span>
              <span
                className="ml-1 inline-block animate-cursor font-light text-white/90"
                aria-hidden="true"
              >
                |
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up animation-delay-700 mt-4 max-w-xl text-[15px] leading-relaxed text-white sm:text-base">
              Cars, buses, pickups, trucks, tractors and JCB — all from one
              local team in Salooni. Every vehicle comes with an experienced
              driver or operator, at a fair rate you know before you book.
              Just WhatsApp or call us.
            </p>
          </div>

          {/* Booking widget */}
          <div
            id="booking-widget"
            className="animate-form relative scroll-mt-24 lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            {/* Animated glowing border behind the card */}
            <div className="hero-form-glow" aria-hidden="true" />
            <EnquiryForm variant="compact" className="relative" />
          </div>

          {/* Actions + trust indicators — below the form on phones */}
          <div className="max-w-2xl lg:col-start-1 lg:row-start-2 lg:self-start">
            {/* Primary actions */}
            <div className="mt-2 grid grid-cols-2 lg:mt-7 gap-2.5 sm:flex sm:flex-row sm:flex-wrap">
              <div className="animate-button animation-delay-900 col-span-2">
                <LinkButton
                  href="#booking-widget"
                  size="lg"
                  variant="accent"
                  className="w-full sm:w-auto"
                >
                  Start an Enquiry
                </LinkButton>
              </div>

              <div className="animate-button animation-delay-1000">
                <LinkButton
                  href="/contact#enquiry"
                  size="lg"
                  variant="light"
                  className="w-full px-3 sm:w-auto sm:px-6"
                >
                  <CalendarCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Advance Booking
                </LinkButton>
              </div>

              <div className="animate-button animation-delay-1100">
                <LinkButton
                  href={telHref}
                  size="lg"
                  variant="light"
                  className="w-full px-3 sm:w-auto sm:px-6"
                >
                  <Phone
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Direct Call
                </LinkButton>
              </div>
            </div>

            {/* Trust indicators */}
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-6">
              {trustIndicators.map(({ icon: Icon, label }, index) => (
                <li
                  key={label}
                  className="animate-trust flex items-center gap-2 text-[13px] font-medium text-white"
                  style={{
                    animationDelay: `${1200 + index * 150}ms`,
                  }}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-[#F6AC2F]"
                    aria-hidden="true"
                  />
                  {label}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}