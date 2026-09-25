import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Availability } from "@/types";

type Tone = "forest" | "himalaya" | "accent" | "neutral" | "success" | "warning";

const tones: Record<Tone, string> = {
  forest: "bg-forest-50 text-forest-700 ring-forest-600/15",
  himalaya: "bg-himalaya-50 text-himalaya-700 ring-himalaya-600/15",
  accent: "bg-accent-50 text-accent-700 ring-accent-600/15",
  neutral: "bg-charcoal-100 text-charcoal-700 ring-charcoal-500/15",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  warning: "bg-amber-50 text-amber-800 ring-amber-600/20",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const availabilityConfig: Record<
  Availability,
  { label: string; tone: Tone; dot: string }
> = {
  /*
   * These are static labels describing how readily a vehicle type can
   * usually be arranged — the site has no live inventory, so they must not
   * read as a real-time stock check. Actual availability is confirmed on
   * enquiry.
   */
  available: {
    label: "Usually available",
    tone: "success",
    dot: "bg-emerald-500",
  },
  limited: {
    label: "Limited in peak season",
    tone: "warning",
    dot: "bg-amber-500",
  },
  "on-request": { label: "On request", tone: "neutral", dot: "bg-charcoal-400" },
};

export function AvailabilityBadge({
  availability,
  className,
}: {
  availability: Availability;
  className?: string;
}) {
  const config = availabilityConfig[availability];
  return (
    <Badge tone={config.tone} className={className}>
      <span
        className={cn("h-1.5 w-1.5 rounded-full", config.dot)}
        aria-hidden="true"
      />
      {config.label}
    </Badge>
  );
}
