import Link from "next/link";
import { ArrowRight, Navigation } from "lucide-react";
import { taxiRoutePath, taxiRoutes } from "@/data/routes";
import { cn } from "@/lib/utils";

/**
 * Links to the taxi route pages (/routes/salooni-to-chamba-taxi…).
 * "cards" matches AreaLinks; "pills" is a compact row for inside a section.
 */
export function RouteLinks({
  variant = "cards",
  align = "center",
  className,
}: {
  variant?: "cards" | "pills";
  /** Pills only: centred in a section, or left-aligned in a text column. */
  align?: "center" | "start";
  className?: string;
}) {
  if (variant === "pills") {
    return (
      <ul className={cn(
          "flex flex-wrap gap-2.5",
          align === "center" ? "justify-center" : "justify-start",
          className,
        )}>
        {taxiRoutes.map((route) => (
          <li key={route.slug}>
            <Link
              href={taxiRoutePath(route.slug)}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-charcoal-300 bg-white px-4 text-sm font-semibold text-charcoal-700 transition-colors hover:border-forest-400 hover:text-forest-700"
            >
              <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
              Salooni to {route.to}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {taxiRoutes.map((route) => (
        <li key={route.slug}>
          <Link
            href={taxiRoutePath(route.slug)}
            className="card-surface group flex h-full items-start gap-3 p-4 hover:border-forest-300 hover:shadow-md"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
              <Navigation className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2 font-display text-base font-bold text-charcoal-900">
                {route.heading}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-charcoal-400 transition-colors group-hover:text-forest-700"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-charcoal-600">
                {route.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
