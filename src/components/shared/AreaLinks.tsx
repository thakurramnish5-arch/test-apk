import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { serviceAreaPath, serviceAreas } from "@/data/serviceAreas";

/** One card per local area page, linking to /areas/<slug>. */
export function AreaLinks() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {serviceAreas.map((area) => (
        <li key={area.slug}>
          <Link
            href={serviceAreaPath(area.slug)}
            className="card-surface group flex h-full items-start gap-3 p-4 hover:border-forest-300 hover:shadow-md"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2 font-display text-base font-bold text-charcoal-900">
                Taxi in {area.name}
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-charcoal-400 transition-colors group-hover:text-forest-700"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-charcoal-600">
                {area.summary}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
